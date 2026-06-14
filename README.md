# 🏥 Healthcare Appointment & Task Tracker

A full-stack web app for scheduling patient appointments and tracking follow-up tasks.

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite |
| Backend | Python 3.11, Flask |
| Database | MongoDB |
| CI | GitHub Actions |

## Project Structure

healthcare-tracker/

├── backend/

│   ├── app/

│   │   ├── models/       ← Document schemas

│   │   ├── routes/       ← REST API endpoints

│   │   └── tests/        ← Unit tests

│   └── run.py            ← Entry point

└── frontend/

└── src/

├── components/   ← Reusable UI pieces

├── hooks/        ← Data fetching logic

├── pages/        ← Full pages

└── utils/        ← API calls

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
python run.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Run Tests
```bash
cd backend
pytest app/tests/ -v
```