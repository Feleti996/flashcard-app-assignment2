📘 Flashcard Learning App — FullStack SPA with Authentication, Admin Dashboard & Study History

The Flashcard Learning App is a fullstack learning platform designed to provide students with a fast, clean and personalised way to study digital flashcards. It operates as a true SinglePage Application (SPA), ensuring that all interactions occur without page reloads, including authentication, flashcard management, study mode transitions and history tracking. The system integrates a React frontend with a Node.js and Express backend, supported by a MongoDB database, and includes secure JWT authentication, rolebased access control, and a complete admin dashboard. The application offers a responsive interface, multiple themes, smooth animations and a structured study workflow that automatically records user progress.

The platform is built around three core entities: Users, Flashcards and Study History. Users can register, log in and access personalised study features, while administrators have elevated permissions to view all users, flashcards and study records. Flashcards support full CRUD operations and include live search functionality for efficient filtering. Study History is automatically generated during Study Mode, allowing users to review their learning progress and enabling administrators to monitor activity across the system. These three entities fully satisfy the assignment requirement for multiple conceptual entities with CRUD operations.

The application includes a wide range of features designed to enhance the learning experience. Users can create, edit and delete flashcards, each of which includes a question, answer and optional category. The interface supports a 3D flip animation for both normal viewing and Study Mode, where cards are presented in random order and removed from the active deck once viewed. The system prevents repeated cards within a single session and automatically stores each study event in the database. The interface also includes a theme system with light, dark and highcontrast modes, ensuring accessibility and visual comfort across different environments. The admin dashboard provides a centralised view of users, flashcards and study history, enabling full platform oversight.

The project is developed using a modern JavaScript fullstack architecture. The frontend uses React with Context API for authentication state management, protected routes for access control and Axios for API communication. The backend uses Express to define RESTful routes, bcrypt for password hashing, JWT for secure authentication and Mongoose for schemabased interaction with MongoDB. This combination ensures a modular, scalable and maintainable system where the frontend communicates cleanly with the backend, and the backend reliably manages persistent data storage.

📂 Folder Structure

(One of the two sections intentionally kept in nonparagraph format)

**Code**

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

└── package.json

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

│   ├── components/

│   ├── context/

│   ├── pages/

│   ├── services/

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

└── package.json

Code

🖼 Screenshots

The application includes a range of interface views such as the Home Page, Admin Dashboard, Flashcard Creation and Editing screens, Study Mode (front and back views), Theme Previews, MongoDB Compass view and the backend server console. These screenshots demonstrate the responsive layout, theme system, study workflow and administrative tools. Replace each placeholder with the appropriate image path when adding screenshots to the repository.

🔐 Authentication

The system uses two separate account types: a normal user account that accesses the user dashboard and study features, and an adminonly account that unlocks the Admin Dashboard with elevated permissions. The authentication system is built using JWT and bcrypt to ensure secure user access. Users register with an email and password, which is hashed before storage. Upon login, a JWT token is issued and used to authenticate protected routes. The frontend uses Context API to store authentication state and applies ProtectedRoute and AdminRoute components to restrict access to sensitive pages. Administrators have elevated permissions that allow them to view all users, flashcards and study history.

**Tutor Testing Note:** Tutors can register a new account and optionally promote it to admin using the provided makeAdmin.js script or by updating the user’s role directly in MongoDB Compass. This allows full testing of both the user dashboard and the adminonly dashboard without requiring preset login credentials.

🧩 Overcoming Challenges

Throughout development, several technical challenges were addressed to ensure a stable and responsive application. Managing full CRUD operations with MongoDB and Mongoose required careful schema design and validation. Asynchronous communication between React and Express introduced timing and statemanagement issues that were resolved through structured API services and controlled component updates. CORS conflicts were resolved by configuring the backend to accept requests from the frontend development server. Maintaining SPA behaviour required thoughtful use of React state, conditional rendering and route protection. Additional challenges included implementing smooth animations, preventing UI glitches during editing and deletion, and centralising API logic to improve maintainability.

🌐 Deployment Overview

The application currently runs locally using the React development server on port 3000 and the Express backend on port 5000, with MongoDB running either locally or through MongoDB Atlas. For future deployment, recommended hosting platforms include Vercel or Netlify for the frontend, Render or Railway for the backend and MongoDB Atlas for cloudbased database hosting. This deployment stack supports a fully scalable and productionready environment.

🗄️ Database Export

A sample dataset is included in the backend directory under database/flashcards_export.json. This export provides a consistent set of flashcards for testing and demonstration purposes.

▶️ How to Run the App

(Second section intentionally kept in nonparagraph format)

**Backend**

cd backend

npm install

npm start

Code

**Frontend**

cd frontend

npm install

npm start

Code

**Environment Variables**

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Code

**MongoDB Note:** Tutors can run the backend using their own MongoDB connection string by creating a .env file inside the backend folder. The application does not require access to the developer’s personal MongoDB account. Tutors may use either a local MongoDB instance or their own MongoDB Atlas cluster. This allows them to create test users and optionally promote an account to admin for testing the Admin Dashboard.

🔮 Future Enhancements

Future improvements may include implementing a spacedrepetition algorithm to optimise learning efficiency, adding shuffle and progresstracking features, introducing userspecific decks and categories, expanding Study Mode with timers and scoring, deploying the database to the cloud for improved scalability and adding advanced search and filtering capabilities. These enhancements would further strengthen the learning experience and extend the platform’s functionality.

👥 Workload Allocation

This assignment was completed individually. All backend development, frontend implementation, UI design, CRUD logic, authentication system, admin dashboard and documentation were completed by Alfred David Teaupa.

👤 Developer

Developed by Alfred David Teaupa — Student ID 11502770,  
University of Technology Sydney,  
for Assignment 2: Advanced Website Based on Modern Frontend Libraries.
