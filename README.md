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

The **Maharashtra Insights Engine** is a **full-stack AI application** designed to answer complex questions about Maharashtra’s **government policies and current events**.  

Unlike a standard chatbot, it uses a **Retrieval-Augmented Generation (RAG)** pipeline, combining **document retrieval** with **language generation**. This ensures responses are **factually grounded, trustworthy, and free from hallucinations**.  

---

## ✨ Key Features

- 🔹 **Fine-Tuned Intelligence** – Built on **Microsoft Phi-2**, adapted with **LoRA** on a curated Maharashtra-specific dataset.  
- 🔹 **Fact-Based Answers** – Uses **FAISS vector search** + **SentenceTransformer** for context retrieval.  
- 🔹 **Full-Stack Application** – Beautiful **React frontend** + **FastAPI backend** running on GPU.  
- 🔹 **End-to-End MLOps** – From **Kaggle prototyping → Docker containerization → Cloud deployment** (Hugging Face Spaces & Vercel).  

---

## 🏗️ System Components

1. **Fine-Tuned Model**  
   - Microsoft Phi-2 base model  
   - LoRA fine-tuned for Maharashtra policies & news  
   - Hosted on Hugging Face Hub  

2. **Backend API (FastAPI)**  
   - Handles RAG workflow: query → retrieval → generation  
   - Dockerized, GPU-enabled, deployed on Hugging Face Spaces  

3. **Frontend UI (React)**  
   - Modern, responsive, accessible on any device  
   - Deployed on Vercel, directly connects to backend API  

---

## 📂 Repository Structure
1./maharashtra-insight-flow-main → React frontend (TypeScript, CSS)
2./maharashtra-engine-backend → FastAPI backend (Python) + Dockerfile

##  Documentation

---

## ⚙️ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/Grievousxx/Maharashtra-Insights-Engine.git
```
### 2.Backend Setup
```bash
cd maharashtra-engine-backend
docker build -t mah-eng-backend .
docker run --gpus all -p 8000:8000 mah-eng-backend
```
### 3.Frontend Setup
```bash
cd maharashtra-insight-flow-main
npm install
npm start
```

