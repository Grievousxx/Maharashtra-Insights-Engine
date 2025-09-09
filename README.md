# Maharashtra Insights Engine

## A Full-Stack, End-to-End RAG System for Maharashtra Policy & News

**Author:** Anshraj Bhargava (Grievousxx)  
**Live Demo:** [**maharashtra-insights-engine.vercel.app**](https://maharashtra-insights-engine.vercel.app/)  
**Live Backend API:** [Hugging Face Space](https://grievousxx-maharashtra-insights-engine.hf.space)  
**Fine-Tuned Model:** [Hugging Face Hub](https://huggingface.co/Grievousxx/maharashtra-insights-engine-v1)

---

## Project Overview

The Maharashtra Insights Engine is a sophisticated, full-stack AI application designed to provide accurate, source-backed answers to complex questions about government policies and current events in Maharashtra.

This project moves beyond a simple chatbot by implementing a **Retrieval-Augmented Generation (RAG)** pipeline. This advanced architecture addresses key LLM limitations like hallucination and knowledge cutoffs by grounding the model's responses in a curated set of real-world documents, ensuring factual accuracy and user trust.

## Key Features

- **Fine-Tuned Intelligence:** Utilizes a **Microsoft Phi-2** model, fine-tuned with **LoRA (Low-Rank Adaptation)** on a custom dataset of Maharashtra policy documents and news articles to specialize its knowledge.
- **Fact-Based Answers:** The RAG system uses a **FAISS vector index** and a `SentenceTransformer` model to perform high-speed semantic search, retrieving relevant context before generating an answer.
- **Full-Stack Application:** Features a beautiful, interactive **React frontend** that communicates with a live, **GPU-powered FastAPI backend**.
- **End-to-End MLOps:** The entire system is a showcase of a modern MLOps workflow, from a Kaggle development environment to a containerized **Docker deployment** on Hugging Face Spaces.

## Architecture

This project consists of three main, decoupled components that work in harmony:

1.  **The Fine-Tuned Model:** The core generative "brain." The fine-tuned adapter is permanently versioned and stored on the [Hugging Face Hub](https://huggingface.co/Grievousxx/maharashtra-insights-engine-v1).
2.  **The Backend API:** A Python application built with FastAPI that handles user requests, runs the RAG pipeline, and serves the model. This is containerized with Docker and deployed on a T4 GPU on [Hugging Face Spaces](https://grievousxx-maharashtra-insights-engine.hf.space).
3.  **The Frontend UI:** A modern, responsive user interface built with React and deployed on [Vercel](https://maharashtra-insights-engine.vercel.app/), allowing users to interact with the engine from any device.

## Repository Structure

This repository contains the source code for the entire application, organized as follows:

-   **/maharashtra-insight-flow-main:** The React frontend application.
-   **/maharashtra-engine-backend:** The Python FastAPI backend, including the `Dockerfile` for deployment.

---
