# backend.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import faiss
import pickle
from sentence_transformers import SentenceTransformer
import os

# --- 1. Load the Maharashtra Insights Engine at Startup ---
print("Server is starting up...")
print("Loading the fine-tuned model and retriever components...")

# Automatically detect if a GPU is available and use it
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
if DEVICE == "cpu":
    print("WARNING: GPU not found. The model will run on the CPU, which will be very slow.")

# --- !!! THIS IS THE ONLY LINE YOU NEED TO DOUBLE-CHECK !!! ---
# Make sure this matches the model name you created on the Hugging Face Hub.
HUB_MODEL_ID = "Grievousxx/maharashtra-insights-engine-v1"

# Load the base model and tokenizer
# torch_dtype="auto" and device_map="auto" are crucial for GPU usage
base_model = AutoModelForCausalLM.from_pretrained(
    "microsoft/phi-2",
    trust_remote_code=True,
    torch_dtype="auto",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-2", trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

# Load your fine-tuned adapter on top of the base model
model = PeftModel.from_pretrained(base_model, HUB_MODEL_ID)
print(f"Successfully loaded model: {HUB_MODEL_ID}")

# Load the RAG retriever files
index = faiss.read_index("full_faiss_index.bin")
with open("full_rag_corpus.pkl", "rb") as f:
    corpus = pickle.load(f)
embed_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device=DEVICE)
print("Retriever components loaded successfully.")


# --- 2. Define the API Server Logic ---
app = FastAPI()

# This allows your React frontend to send requests to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines the expected input format for a request
class Query(BaseModel):
    query: str

# This is the function that finds relevant documents
def retrieve(query, top_k=3):
    query_embedding = embed_model.encode([query])
    distances, indices = index.search(query_embedding, top_k)
    return [corpus[i] for i in indices[0]]

# This is the main API endpoint that your frontend will call
@app.post("/api/generate")
async def generate_answer(query: Query):
    user_query = query.query
    
    # Step 1: Retrieve relevant context
    context_docs = retrieve(user_query)
    context_text = "\n\n".join(context_docs)

    # Step 2: Create a detailed prompt for the model
    prompt = f"""### Instruction:
Use the following context to answer the question.
Context:
{context_text}
Question: {user_query}
### Response:"""

    # Step 3: Generate the answer using the model
    inputs = tokenizer(prompt, return_tensors="pt", max_length=1500, truncation=True).to(DEVICE)
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=256,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
    
    full_response = tokenizer.decode(output[0], skip_special_tokens=True)
    final_answer = full_response.split("### Response:")[-1].strip()

    # Step 4: Send the answer and sources back to the frontend
    return {"answer": final_answer, "sources": context_docs}

print("\n🚀 Maharashtra Insights Engine is running and ready for requests!")