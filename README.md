📘 Flashcard Learning App
A modern single‑page flashcard learning platform built with React, Node.js, Express, and MongoDB, designed to help users study efficiently with personalised learning history, live search, and admin‑level management.

🚀 Overview
The Flashcard Learning App solves a simple problem:
students need a fast, clean, and personalised way to study flashcards without distractions.

This app provides:

Secure user authentication (JWT + bcrypt)

CRUD operations for flashcards

Real‑time live search

Study mode with automatic learning history tracking

Admin dashboard to view all users + their study history

Fully responsive, seamless SPA interface

🏗️ Tech Stack
Frontend: React (SPA), Context API, Protected Routes

Backend: Node.js, Express

Database: MongoDB

Auth: JWT, bcrypt

Styling: Custom CSS (premium palette)

Tools: Postman, MongoDB Compass

📂 Folder Structure
Backend
Code
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── flashcardController.js
│   └── historyController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── Flashcard.js
│   ├── StudyHistory.js
│   └── User.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── flashcardRoutes.js
│   └── historyRoutes.js
│
├── database/
│   └── flashcards_export.json
│
├── makeAdmin.js
├── server.js
├── package.json
└── .env (not included)
Frontend
Code
frontend/
│
├── public/
│   ├── index.html
│   ├── favicon.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── homescreen.jpg
│   │   ├── edit-mode.jpg
│   │   ├── studymode.jpg
│   │   ├── dark-mode.jpg
│   │   └── pen.png
│   │
│   ├── components/
│   │   ├── AddForm.js
│   │   ├── AdminRoute.jsx
│   │   └── Flashcard.js
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Flashcards.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudyHistory.jsx
│   │   └── StudyMode.jsx
│   │
│   ├── services/
│   │   ├── adminService.js
│   │   ├── authService.js
│   │   ├── flashcardService.js
│   │   └── historyService.js
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── theme.css
│   ├── flashcards.css
│   ├── navbar.css
│   ├── home.css
│   ├── auth.css
│   ├── study.css
│   └── history.css
│
├── package.json
└── .gitignore
🔐 Authentication
Users register and log in using email + password

Passwords hashed using bcrypt

JWT tokens protect private routes

Admin role has elevated permissions

ProtectedRoute + AdminRoute on frontend

🧠 Entities & CRUD Operations
1. User
Register

Login

Update profile

Admin: view all users

2. Flashcard
Create

Read

Update

Delete

Live search

3. Study History
Automatically recorded when user studies

Admin can view all users’ history

✔ Meets assignment requirement of 3 conceptual entities with CRUD.

🔎 Live Search
The flashcard list updates instantly as the user types.
No page reloads.
SPA behaviour maintained.

🎨 User Interface
Clean, responsive layout

Dark mode

Smooth animations

SPA navigation

Admin dashboard with tables + controls

▶️ How to Run the App
1. Backend
Code
cd backend
npm install
npm start
Backend runs on:
http://localhost:5000

2. Frontend
Code
cd frontend
npm install
npm start
Frontend runs on:
http://localhost:3000

3. Environment Variables
Create a .env file inside backend:

Code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🗄️ Database Export
Your database export is located in:

Code
/backend/database/flashcards_export.json
This includes sample flashcards for testing.

🛠️ Admin Account for Marking
Code
Email: admin@example.com
Password: admin123
Role: admin
👥 Workload Allocation
This assignment was completed individually.

All backend, frontend, UI, CRUD logic, authentication, admin dashboard, and documentation were completed by:

Alfred David Teaupa (Feleti)