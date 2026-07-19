# Internship Task Manager App 🚀

A full-stack Task Manager application built using the MERN stack and Docker.

---

## 🔧 Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- Containerization: Docker & Docker Compose

---

## 📦 Features
- User Signup & Login
- JWT Authentication
- Protected Routes
- User-specific Tasks
- Task Priority (Low / Medium / High)
- Task Time Selection
- Full CRUD API for tasks
- Dockerized Frontend, Backend & MongoDB

---

## 🛠 Backend CRUD API

The backend now exposes a task resource with the following endpoints:

- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

### Required environment variables
Copy the example file and update the values:

```bash
cp backend/.env.example backend/.env
```

Example values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=replace-with-a-strong-secret
```

### Run the backend locally
```bash
cd backend
npm install
npm run dev
```

### Sample requests
A ready-to-import Postman collection is available at [backend/postman-task-crud.json](backend/postman-task-crud.json).

---

## 🐳 Docker Setup

### Run the project using Docker:
```bash
docker compose up --build
