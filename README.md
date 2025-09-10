# 🚀 Maharashtra Insights Engine

![Made with React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Backend FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal?logo=fastapi)
![Model HuggingFace](https://img.shields.io/badge/Model-HuggingFace-yellow?logo=huggingface)
![Dockerized](https://img.shields.io/badge/Deployment-Docker-blue?logo=docker)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

## A Full-Stack, End-to-End RAG System for Maharashtra Policy & News

**Author:** Anshraj Bhargava (Grievousxx)  
**Live Demo:** [maharashtra-insights-engine.vercel.app](https://maharashtra-insights-engine.vercel.app/)  
**Backend API:** [Hugging Face Space](https://grievousxx-maharashtra-insights-engine.hf.space)  
**Fine-Tuned Model:** [Hugging Face Hub](https://huggingface.co/Grievousxx/maharashtra-insights-engine-v1)

---

## 📖 Project Overview

The **Maharashtra Insights Engine** is a **full-stack AI application** that delivers **accurate, source-grounded answers** to questions about Maharashtra’s **government policies and current events**.  

Unlike a simple chatbot, this system implements a **Retrieval-Augmented Generation (RAG)** pipeline. By combining retrieval and generation, it overcomes typical LLM limitations like **hallucination** and **knowledge cutoffs**, ensuring answers are **factual, trustworthy, and explainable**.  

---

## ✨ Key Features

- 🔹 **Fine-Tuned Intelligence** – Built on **Microsoft Phi-2**, adapted with **LoRA** on a curated dataset of Maharashtra policy and news.  
- 🔹 **Fact-Based Answers** – Uses **FAISS vector search** + **SentenceTransformer** to retrieve documents before generating answers.  
- 🔹 **Full-Stack Application** – Modern **React frontend** + **FastAPI backend** running on GPU.  
- 🔹 **End-to-End MLOps** – From **Kaggle prototyping → Docker containerization → Cloud deployment** on Hugging Face Spaces & Vercel.  

---

## 🏗️ Architecture

This project has **three main components**:

1. **Fine-Tuned Model**  
   - Base: Microsoft Phi-2  
   - Adapted with LoRA for Maharashtra-specific knowledge  
   - Permanently stored on [Hugging Face Hub](https://huggingface.co/Grievousxx/maharashtra-insights-engine-v1)

2. **Backend API (FastAPI)**  
   - Orchestrates the **RAG pipeline** (query parsing → vector search → model inference)  
   - Containerized with **Docker**, deployed on a **T4 GPU** in Hugging Face Spaces  

3. **Frontend UI (React)**  
   - Modern, responsive interface  
   - Deployed on [Vercel](https://maharashtra-insights-engine.vercel.app/)  
   - Connects seamlessly to the backend API  

---

## 📊 Architecture Diagram

```mermaid
flowchart LR
    User([User]) -->|Query| Frontend[React UI]
    Frontend --> Backend[FastAPI Backend]
    Backend -->|Vector Search| FAISS[(FAISS + SentenceTransformer)]
    FAISS --> Backend
    Backend --> Model[Phi-2 Fine-Tuned Model]
    Model --> Backend
    Backend -->|Response| Frontend
    Frontend -->|Answer| User

Repository Structure
/maharashtra-insight-flow-main   → React frontend (TypeScript, CSS)
/maharashtra-engine-backend      → FastAPI backend (Python) + Dockerfile
README.md                        → Documentation

⚙️ Getting Started

1. Clone Repository
git clone https://github.com/Grievousxx/Maharashtra-Insights-Engine.git

2. Backend Setup
cd maharashtra-engine-backend
docker build -t mah-eng-backend .
docker run --gpus all -p 8000:8000 mah-eng-backend

3. Frontend Setup
cd maharashtra-insight-flow-main
npm install
npm start
