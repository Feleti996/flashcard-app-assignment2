📘 Flashcard Learning App — FullStack SPA with Authentication, Admin Dashboard & Study History

The Flashcard Learning App is a thorough learning app designed to give students a fast, clean, and personalised way to learn with digital cards. It works as a proper Single Page Application (SPA), making sure all actions happen without reloading the page, including logging in, managing flashcards, switching learning modes, and tracking history. The system combines a React frontend with a Node.js and Express backend, supported by a MongoDB database, and includes JWT security, access control, and a full admin dashboard. The app provides responsive interactions, lots of themes, top-notch animations, and a structured learning process that keeps track of user progress.

The platform is built around three main elements: Users, Flashcards, and Study History. Users can sign up, log in, and access private training programmes, while administrators have higher access to all users, flashcards, and training records. The flashcards support the full range of CRUD activities and include direct search for a positive test. Learning History is created automatically during Study Mode, letting users track their learning progress and allowing administrators to review activities in the system. These three companies fully meet the requirements for the various think tanks that use CRUD.

The programme includes a variety of features designed to boost the learning experience. You can create, edit and delete flashcards, which include a question, answer and options. The interface supports a 3D flip animation for regular viewing and Study Mode, where cards are shown in a random order and removed from the active deck once seen. The system stops cards from being repeated in a single session and automatically saves everything in the database. There's also a theme system with light, dark and high contrast options, making it easy to use comfortably in different environments. The admin dashboard lets you see users, flashcards and learning history, giving full control over the platform.

The project is built using a full set of modern JavaScript. The frontend uses React and the Context API to manage authentication, secure paths to control access, and Axios to talk to the API. The backend uses Express to handle RESTful routes, bcrypt to hash passwords, JWT for authentication, and Mongoose to work with MongoDB schemas. This setup makes for a modular, scalable, and easy-to-manage system where the frontend and backend work together smoothly, and the backend reliably handles data storage.


## 📂 Folder Structure

```text
flashcard-app/
│
├── backend/
│   ├── config/
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── flashcardController.js
│   │   └── historyController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── Flashcard.js
│   │   ├── StudyHistory.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── flashcardRoutes.js
│   │   └── historyRoutes.js
│   │
│   ├── scripts/
│   │   └── cleanupHistory.js
│   │
│   ├── .env.example
│   ├── makeAdmin.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   └── flashcards_export.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── pen.png
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── pen.png
│   │   │
│   │   ├── components/
│   │   │   ├── AddForm.js
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Flashcard.js
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Flashcards.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudyHistory.jsx
│   │   │   └── StudyMode.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── flashcardService.js
│   │   │   └── historyService.js
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── App.test.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── theme.css
│   │   ├── flashcards.css
│   │   ├── navbar.css
│   │   ├── home.css
│   │   ├── auth.css
│   │   ├── study.css
│   │   ├── history.css
│   │   ├── setupTests.js
│   │   └── reportWebVitals.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package-lock.json
└── README.md
```


🖼 Screenshots

Admin Dashboard, Flashcard Creation and Editing screens, Study Mode (front and back views), Theme Previews, MongoDB Compass view and the backend server console. These screenshots show the structure of the story, the content process, the learning process and the admin tools. Swap out each placeholder

🔐 Authentication

The system has two types of accounts: a regular user account for accessing the user and events dashboard, and an admin account that opens the Admin Dashboard with higher permissions. The authentication system uses JWT and bcrypt to keep user access secure. Users sign up with an email and password, which is hashed before being saved. When logging in, a JWT token is issued and used to access protected routes. The frontend uses the Context API to keep track of authentication status and uses the ProtectedRoute and AdminRoute components to control access to sensitive pages. Admins get increased access to all users, flashcards, and school history.

**Tutor Testing Note:** Instructors can set up a new account and make it an admin using the provided makeAdmin.js script or by automatically changing the user's role in MongoDB Compass. This lets you fully test the user and admin dashboards without needing pre-set login details.

🧩 Overcoming Challenges

Make sure the app is stable and responsive. Careful schema design and checking were needed to fully manage the CRUD and Mongoose projects. The async communication between React and Express caused timing and state issues, which were sorted out with structured API functions and CORS updates. CORS problems were fixed by setting up the backend to respond to requests from the frontend dev server. It was important to use React standards, SPA-level rendering, and route protection. Other challenges included creating smooth animations, fixing UI bugs during editing and deletion, and centralising the API definition for easier maintenance.

🌐 Deployment Overview

The system currently runs locally using the React development server on port 3000 and the Express backend on port 5000, with MongoDB running locally on MongoDB Atlas. For future deployments, it's suggested to use Vercel or Netlify for the frontend, Render or Railway for the backend, and MongoDB Atlas for the cloud. This setup supports a fully scalable and ready-to-build environment.

🗄️ Database Export

A sample of the dataset is included in the backend directory in database/flashcards_export.json. This export gives a set of flashcards to try out and show off.

## ▶️ How to Run the App

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**MongoDB Note:** Instructors can run the backend using their MongoDB connection by creating a .env file in the backend folder. The system doesn't need access to the developer's personal MongoDB account. Instructors can use a local MongoDB setup or their MongoDB Atlas cluster. This lets them create users for testing and give the admin an account to try out the Admin Dashboard.

🔮 Future Enhancements

Future improvements could include using a spaced repetition algorithm to boost learning success, adding shuffle and progress tracking, creating user-specific decks and categories, expanding Study Mode with timers and scores, moving the database to the cloud to improve scalability, and adding more advanced search and analysis. These updates will make the learning experience even better and make the platform more functional.

👥 Workload Allocation

This assignment was done individually. Alfred David Teaupa handled all the backend development, frontend setup, UI design, CRUD setup, verification system, admin dashboard, and documentation.

👤 Developer

Developed by Alfred David Teaupa — Student ID 11502770,  
University of Technology Sydney,  
for Assignment 2: Advanced Website Based on Modern Frontend Libraries.

