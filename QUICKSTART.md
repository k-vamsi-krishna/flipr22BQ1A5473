# Quick Start Guide - RealTrust Admin System

## What's Been Created

### ✅ Complete Backend System
- **Express.js** REST API server on port 5000
- **SQLite** database for persistent data storage
- Full CRUD operations for:
  - Contact form submissions
  - Projects (with image support)
  - Client testimonials
  - Newsletter subscribers

### ✅ Enhanced Admin Dashboard
- Real-time data display from backend
- Add/Delete projects with image cropping
- Manage client testimonials
- View and delete contact submissions
- Manage newsletter subscribers
- Live statistics dashboard

### ✅ Frontend Integration
- Frontend connects to backend API automatically
- Form submissions save to database
- Admin panel displays real database data
- Smooth scrolling navigation between sections

---

## How to Run

### Step 1: Start the Backend Server
```bash
cd backend
node server.js
```
You should see:
```
Server running on http://localhost:5000
Connected to SQLite database
```

### Step 2: Start the Frontend (New Terminal)
```bash
npm run dev
```
Frontend runs on: `http://localhost:3000`

---

## How to Use

### 🏠 **Landing Page**
1. Visit `http://localhost:3000`
2. Fill out "Get a Free Consultation" form → Data saves to database
3. Subscribe to newsletter in footer → Stored in subscribers table
4. Click navigation buttons to scroll to different sections

### 👨‍💼 **Admin Panel**
1. Click "Contact Us" in navbar
2. Login with:
   - Email: `admin@realtrust.com`
   - Password: `admin123`
3. Access different sections:
   - **Dashboard** - See real stats from database
   - **Projects** - Add/Delete projects with images
   - **Clients** - Manage testimonials
   - **Form Submissions** - View all contact forms submitted
   - **Subscribers** - Manage email subscribers

### 📊 **Database Operations**

#### View Contact Submissions
1. Go to Admin Panel → Form Submissions
2. See all submissions with Full Name, Email, Mobile, City, Date
3. Delete submissions with the trash icon

#### Add New Project
1. Go to Admin Panel → Projects
2. Click "Add New Project"
3. Fill in: Name, Location, Description
4. Upload and crop image
5. Click "Save Project"
6. Image saved to database, displayed on homepage

#### Manage Clients
1. Go to Admin Panel → Clients
2. Click "Add New Client"
3. Enter: Name, Designation, Feedback, Portrait image
4. Saved to database, shown in testimonials

#### View Subscribers
1. Go to Admin Panel → Subscribers
2. See all newsletter subscribers
3. Delete subscribers with trash icon

---

## Database Location

**File:** `backend/database.db`

This is your SQLite database file containing all data. If you need to reset everything:
```bash
# Delete the database file
del backend/database.db

# Restart the server - it will create a fresh database
node server.js
```

---

## API Testing

Use tools like Postman or curl to test:

```bash
# Submit a contact form
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","mobile":"1234567890","city":"New York"}'

# Get all contacts
curl http://localhost:5000/api/contacts

# Get all projects
curl http://localhost:5000/api/projects

# Get all subscribers
curl http://localhost:5000/api/subscribers
```

---

## File Locations

```
Project/
├── backend/
│   ├── server.js          ← Main backend server
│   ├── database.js        ← Database setup
│   ├── database.db        ← SQLite database file
│   ├── models/            ← Data models
│   ├── routes/            ← API endpoints
│   └── package.json
├── services/
│   └── mockApi.ts         ← API client (connects to backend)
├── pages/
│   ├── LandingPage.tsx    ← Public homepage
│   ├── AdminLogin.tsx     ← Login page
│   └── AdminDashboard.tsx ← Admin panel
└── BACKEND_SETUP.md       ← Full documentation
```

---

## Common Tasks

### Add a new project programmatically
```javascript
// From admin panel, click Add New Project, fill form, and save
```

### Check all database records
```bash
# You can inspect the database.db file with any SQLite viewer
# Or check the Admin Dashboard which displays all data live
```

### Submit a contact form from homepage
```javascript
// Fill the "Get a Free Consultation" form
// Data automatically saves to database
// View in Admin Panel → Form Submissions
```

---

## Verification Checklist

✅ Backend server running on port 5000  
✅ Frontend running on port 3000  
✅ Form submissions save to database  
✅ Admin panel shows real data from database  
✅ Projects can be added with images  
✅ Contact submissions display in admin panel  
✅ Subscribers can be managed  
✅ All CRUD operations working  

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Port 5000 already in use" | Kill the process or use a different port |
| "Cannot connect to backend" | Make sure backend is running: `node server.js` |
| "Database locked" | SQLite file locked - restart the server |
| "No data showing in admin" | Refresh the page or check browser console for errors |
| "Form not submitting" | Check that backend is running and CORS is enabled |

---

## Next Steps

1. ✅ Both servers running
2. ✅ Visit `http://localhost:3000`
3. ✅ Test the contact form
4. ✅ Login to admin panel
5. ✅ Add a test project
6. ✅ View submissions in admin

You're all set! 🚀
