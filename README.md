# Project Setup Guide

This repository contains both the **Frontend** and **Backend** code for the project.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

> This will install all necessary npm packages.

---

##  Backend Setup

```bash
cd backend
```

### Create a Virtual Environment

```bash
python -m venv env
```

> Activate the virtual environment:
- On **Windows**: `env\Scripts\activate`
- On **macOS/Linux**: `source env/bin/activate`

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Start the Backend Server

```bash
python manage.py runserver
```

---

## Project is Now Ready!

- Frontend runs on: `http://localhost:3000/`
- Backend runs on: `http://localhost:8000/`

---
