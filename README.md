# 🏥 Healthcare Appointment & Task Tracker

A full-stack web application to schedule patient appointments and track follow-up tasks — built with React, Flask, and MongoDB.

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📸 Preview

> Dashboard showing appointment stats, upcoming visits, and task tracking — all in one place.

---

## ✨ Features

- 📅 **Book Appointments** — Schedule patient visits with doctor, date, time, and reason
- ✅ **Track Tasks** — Create follow-up tasks linked to appointments with priority levels
- 📊 **Dashboard** — See stats at a glance — scheduled appointments, open tasks, high priority items
- 🔄 **Status Updates** — Update appointment and task status in real time
- 🗑️ **Delete Records** — Remove appointments and tasks easily
- 🔍 **Filter Tasks** — Filter by status: pending, in-progress, done

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | User interface |
| Backend | Python + Flask | REST API server |
| Database | MongoDB | Store patients, appointments, tasks |
| Styling | CSS Variables | Clean, responsive design |
| Testing | Pytest | Automated backend tests |
| CI/CD | GitHub Actions | Auto-test on every push |

---

## 📁 Project Structure

```
healthcare-tracker/
│
├── backend/                        # Flask REST API
│   ├── app/
│   │   ├── __init__.py             # App factory
│   │   ├── config.py               # Dev & test configs
│   │   ├── database.py             # MongoDB connection
│   │   ├── models/                 # Document schemas
│   │   │   ├── appointment.py
│   │   │   ├── task.py
│   │   │   └── patient.py
│   │   ├── routes/                 # API endpoints
│   │   │   ├── appointments.py     # /api/appointments
│   │   │   ├── tasks.py            # /api/tasks
│   │   │   └── patients.py        # /api/patients
│   │   └── tests/
│   │       └── test_appointments.py
│   ├── run.py                      # Entry point
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Environment variables template
│
├── frontend/                       # React App
│   ├── src/
│   │   ├── App.jsx                 # Root component + navigation
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   ├── components/
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentCard.jsx
│   │   │   │   └── AppointmentForm.jsx
│   │   │   └── tasks/
│   │   │       └── TaskCard.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AppointmentsPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── hooks/
│   │   │   ├── useAppointments.js  # Appointments data logic
│   │   │   └── useTasks.js         # Tasks data logic
│   │   └── utils/
│   │       └── api.js              # All API calls in one place
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 20+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)
- [Git](https://git-scm.com/)

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Soumyaa1911/healthcare-tracker.git
cd healthcare-tracker
```

---

### 2️⃣ Set up the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Start the server
python run.py
```

✅ Backend runs at **http://localhost:5000**

---

### 3️⃣ Set up the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs at **http://localhost:3000**

---

### 4️⃣ Open the app

👉 Go to **http://localhost:3000** in your browser

---

## 🔌 API Reference

### Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/patients/` | Get all patients |
| `POST` | `/api/patients/` | Create a patient |
| `GET` | `/api/patients/:id` | Get one patient |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/appointments/` | Get all appointments |
| `GET` | `/api/appointments/?patient_id=` | Filter by patient |
| `POST` | `/api/appointments/` | Book an appointment |
| `PUT` | `/api/appointments/:id` | Update appointment |
| `DELETE` | `/api/appointments/:id` | Delete appointment |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks/` | Get all tasks |
| `GET` | `/api/tasks/?status=pending` | Filter by status |
| `POST` | `/api/tasks/` | Create a task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

---

## 🧪 Running Tests

```bash
cd backend
pytest app/tests/ -v
```

---

## 🔄 CI/CD Pipeline

Every push to `main` or `develop` automatically:

1. Spins up a MongoDB instance
2. Runs all backend tests with Pytest
3. Builds the React frontend with Vite

Powered by **GitHub Actions** — check the **Actions** tab to see it run!

---

## 🗺️ Roadmap

- [ ] User authentication (JWT login/signup)
- [ ] Patient detail page with appointment history
- [ ] Email/SMS reminders via SendGrid or Twilio
- [ ] Search and filter patients
- [ ] Deploy backend to AWS / Railway
- [ ] Deploy frontend to Vercel / Netlify

---

## 👨‍💻 Author

**Soumyaa** — [@Soumyaa1911](https://github.com/Soumyaa1911)

---

## 📄 License

This project is licensed under the MIT License.