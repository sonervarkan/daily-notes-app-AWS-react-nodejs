# Notes App – Full-Stack Application (React + Node.js + MySQL (optional) + AWS S3)

A full-stack notes application built with React, Node.js (Express), MySQL, JWT authentication, and AWS S3 storage for user notes.
Users can register, log in, create notes, edit notes, delete notes, and store their data securely in the cloud.

## Features
### Authentication

JWT-based login & registration

Password hashing with bcrypt

Protected routes using middleware

### Notes System

Create, list, update, delete notes

Notes saved as JSON inside AWS S3 bucket

Per-user directory in S3 (userId/notes.json)

### Frontend (React)

Login / Register pages

Notes dashboard

Edit & delete functionality

Global authentication state using Context API

Axios client with automatic JWT header injection

### Backend (Node.js / Express)

REST API following clean structure

Protected routes using JWT middleware

S3 read/write utilities

MySQL validation for users

## Project Structure
````
backend/
  src/
    config/
      db.js
      s3.js
    middleware/
      authMiddleware.js
    routes/
      auth.js
      notes.js
  server.js

frontend/
  src/
    api/
      authApi.js
      notesApi.js
    components/
      LoginForm.jsx
      RegisterForm.jsx
      Notes.jsx
    context/
      AuthContext.jsx
    App.jsx
    main.jsx
````
## Requirements

Node.js 18+

MySQL Server

AWS Account (S3 + IAM User)

Vite (for React frontend)

### Backend Setup
1️⃣ Install Dependencies
````
cd backend
npm install
````
2️⃣ Environment Variables

Create .env inside /backend:
````
AWS_ACCESS_KEY=YOUR_ACCESS_KEY
AWS_SECRET_KEY=YOUR_SECRET_KEY
S3_BUCKET=your-bucket-name
JWT_SECRET=your-jwt-secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_app
````
3️⃣ Start Backend
````
npm start
````

Backend runs at:

http://localhost:8080

### Frontend Setup (React + Vite)
1️⃣ Install Dependencies
````
cd frontend
npm install
````
2️⃣ Environment Variables

Create .env inside /frontend:

VITE_API_URL=http://localhost:8080

3️⃣ Start Frontend
npm run dev


Frontend runs at:

http://localhost:5173

## API Endpoints Overview
````
Auth
Method	Route	Description
POST	/auth/register	Register user
POST	/auth/login	Login user
POST	/auth/logout	Logout user
Notes (Protected)
Method	Route	Description
GET	/notes/list-notes	List notes
POST	/notes/add-note	Add note
PUT	/notes/update-note/:id	Update note
POST	/notes/delete-note/:id	Delete note
````
## AWS S3 Notes Storage

Each user gets a directory:
````
s3://your-bucket/
   └── <userId>/
         └── notes.json


Example stored data:

[
  {
    "id": 1700000000000,
    "title": "My first note",
    "content": "Hello cloud!",
    "createdAt": "2025-01-01T12:00:00Z"
  }
]
````
## Security Practices

Passwords hashed with bcrypt

JWT tokens protected by middleware

CORS configured for frontend

AWS SDK v3 for secure cloud operations

## Future Improvements

User profile page

File uploads (images, documents)

Pagination for notes

Dark mode UI

## License

This project currently has no license.

## Author
````
Soner Varkan
GitHub: https://github.com/sonervarkan
````




