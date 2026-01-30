# Full Stack Web Application 

## 📌 Project Overview
This project is a **full-stack web application**.  
The application consists of a **public landing page** and a **secure admin panel** that allows management of projects, clients, contact form submissions, and newsletter subscriptions.

The goal of the project is to demonstrate practical full-stack development skills including frontend UI development, backend API design, database integration, and deployment.

---

## 🧠 Approach

- Built the project using a **client–server architecture** with clear separation between frontend and backend.
- The **landing page** dynamically fetches data (projects and clients) from the backend.
- The **admin panel** allows controlled management of all data through protected routes.
- RESTful APIs are used for communication between frontend and backend.
- Image upload functionality includes **image cropping** to maintain consistent UI design.
- Environment variables are used to keep configuration secure and deployment-ready.

---

## 🛠️ Technologies Used

### Frontend
- React (Vite)
- TypeScript
- HTML5
- CSS3
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- SQLite (database)
- JWT (authentication)

### Tools & Platforms
- Git & GitHub (version control)
- Render (backend deployment)
- VS Code (development environment)

---

## ✨ Features

### Landing Page
- Hero section
- Our Projects section (data fetched from backend)
- Happy Clients section (data fetched from backend)
- Contact form (stores user submissions)
- Newsletter subscription

### Admin Panel
- Secure admin login
- Add and manage projects
- Add and manage clients
- View contact form submissions
- View subscribed email addresses
- Image upload with cropping support

---

## ⚙️ Steps to Run the Project Locally
 Backend Setup
cd backend
npm install
Create a .env file inside the backend directory:
PORT=5000
JWT_SECRET=your_secret_key
Start the backend server:
npm run dev
The backend will run on:
http://localhost:5000
Frontend Setup
npm install
npm run dev
The frontend will run on:
http://localhost:5173

Authentication

Admin routes are protected using JWT-based authentication.

Only authorized users can access the admin panel and perform management operations.
Conclusion

This project demonstrates practical full-stack development skills, including frontend–backend integration, secure authentication, database handling, and deployment preparation.
It adheres closely to the Flipr assignment requirements and is suitable for evaluation and demonstration purposes.
