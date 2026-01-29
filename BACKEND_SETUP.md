# RealTrust - Real Estate & Consultation Platform

## Project Overview

RealTrust is a full-stack real estate and consultation platform with an integrated admin dashboard for managing projects, clients, contact form submissions, and newsletter subscribers.

## Architecture

### Frontend (React + TypeScript + Vite)
- **Port:** 3000
- **Location:** Root directory
- Modern UI with Tailwind CSS
- React Router for navigation
- Real-time form handling

### Backend (Express + SQLite)
- **Port:** 5000
- **Location:** `/backend` directory
- RESTful API endpoints
- SQLite database for persistence
- CORS enabled for frontend communication

## Features

### 1. **Landing Page**
- Hero section with consultation form
- Services showcase
- Project portfolio
- Client testimonials
- Newsletter subscription
- Responsive navigation with smooth scrolling

### 2. **Admin Panel** (Protected Route)
- **Dashboard Overview:** Real-time statistics
- **Project Management:** Add, view, and delete projects with image cropping
- **Client Management:** Manage client testimonials with images
- **Form Submissions:** View and manage contact form submissions
- **Subscribers:** Manage newsletter subscribers with delete functionality

### 3. **Database Structure**

#### Tables:
1. **contacts** - Form submissions
   - id, fullName, email, mobile, city, createdAt

2. **projects** - Real estate projects
   - id, title, description, image, category, status, createdAt, updatedAt

3. **clients** - Client testimonials
   - id, name, email, phone, company, feedback, rating, image, status, createdAt, updatedAt

4. **subscribers** - Newsletter subscribers
   - id, email (UNIQUE), subscribedAt

5. **admin_users** - Admin authentication (reserved for future use)
   - id, username, password, email, createdAt

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start backend server:**
   ```bash
   node server.js
   ```
   Or use watch mode:
   ```bash
   node --watch server.js
   ```
   Runs on `http://localhost:5000`

## API Endpoints

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all submissions
- `GET /api/contacts/:id` - Get specific submission
- `DELETE /api/contacts/:id` - Delete submission

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `POST /api/clients` - Add client
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get specific client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Subscribers
- `POST /api/subscribers` - Subscribe to newsletter
- `GET /api/subscribers` - Get all subscribers
- `GET /api/subscribers/:id` - Get specific subscriber
- `DELETE /api/subscribers/:id` - Unsubscribe

### Health Check
- `GET /api/health` - Server status

## Admin Login

**Credentials (Mock):**
- Email: `admin@realtrust.com`
- Password: `admin123`

Navigate to `/admin/login` to access the admin panel.

## File Structure

```
Project/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectSection.tsx
│   │   ├── ClientSection.tsx
│   │   ├── Newsletter.tsx
│   │   ├── Footer.tsx
│   │   └── ImageCropper.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/
│   │   └── mockApi.ts (API client)
│   ├── types.ts
│   ├── App.tsx
│   └── index.tsx
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   ├── Client.js
│   │   └── Subscriber.js
│   ├── routes/
│   │   ├── contacts.js
│   │   ├── projects.js
│   │   ├── clients.js
│   │   └── subscribers.js
│   └── package.json
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Key Technologies

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM v7
- Lucide React (Icons)
- React Easy Crop

### Backend
- Express.js
- SQLite3
- UUID (ID generation)
- CORS
- Node.js

## Running Both Servers

### Terminal 1 (Frontend)
```bash
npm run dev
```

### Terminal 2 (Backend)
```bash
cd backend && node server.js
```

Visit `http://localhost:3000` to access the application.

## Features Implementation

### Form Submission Flow
1. User fills the "Get a Free Consultation" form on the homepage
2. Form data is sent to `POST /api/contacts`
3. Data is stored in SQLite database
4. Admin can view submissions in Admin Dashboard → Form Submissions

### Project Management
1. Admin adds projects via Admin Panel
2. Images are cropped to 450x350 pixels
3. Projects stored in database
4. Displayed on public portfolio section

### Client Testimonials
1. Admin manages client feedback in Admin Panel
2. Client portraits are stored with feedback
3. Testimonials appear on homepage

### Newsletter
1. Users subscribe via footer newsletter form
2. Subscriptions stored in database
3. Admin can view and manage subscribers

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Email notifications for new submissions
- [ ] Advanced search and filtering in admin panel
- [ ] Image upload to cloud storage (S3, Cloudinary)
- [ ] Email sending functionality
- [ ] Analytics dashboard
- [ ] Export data to CSV/PDF

## Troubleshooting

### Backend not connecting
- Ensure port 5000 is not in use
- Check if backend server is running
- Verify CORS is enabled

### Database issues
- Delete `backend/database.db` to reset
- Check file permissions

### Form submission failing
- Ensure all required fields are filled
- Check browser console for errors
- Verify backend is running

## License

Private Project - RealTrust

## Support

For issues or questions, contact the development team.
