# 🚀 Complete Terminal Commands Reference

## Current System Status

Both servers are **RUNNING RIGHT NOW**:
```
Frontend: http://localhost:3000  ✅
Backend:  http://localhost:5000  ✅
Database: backend/database.db    ✅
```

---

## Starting Fresh (If You Need to Restart)

### Terminal 1: Backend Server
```bash
cd c:\Users\DELL\Downloads\Project\backend
node server.js
```

Expected output:
```
Server running on http://localhost:5000
Connected to SQLite database
```

### Terminal 2: Frontend Server
```bash
cd c:\Users\DELL\Downloads\Project
npm run dev
```

Expected output:
```
VITE v6.4.1  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://10.229.63.1:3000/
```

---

## Access Your Application

### Public Website
```
http://localhost:3000
```

### Admin Login
```
URL: http://localhost:3000/admin/login

Credentials:
Email:    admin@realtrust.com
Password: admin123
```

---

## Testing the API with curl

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"Server is running"}
```

### Submit a Contact
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","mobile":"1234567890","city":"New York"}'
```

### Get All Contacts
```bash
curl http://localhost:5000/api/contacts
```

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Get All Clients
```bash
curl http://localhost:5000/api/clients
```

### Get All Subscribers
```bash
curl http://localhost:5000/api/subscribers
```

### Subscribe to Newsletter
```bash
curl -X POST http://localhost:5000/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@example.com"}'
```

### Add a Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Project","description":"A test project","category":"luxury"}'
```

---

## Database Operations

### Reset Database
```bash
# Delete the database file (it will be recreated on server start)
del c:\Users\DELL\Downloads\Project\backend\database.db

# Restart backend server
cd c:\Users\DELL\Downloads\Project\backend
node server.js
```

### View Database Content
Option 1: Use SQLite browser
```bash
# Install SQLite browser or use online tools
# File location: c:\Users\DELL\Downloads\Project\backend\database.db
```

Option 2: Check via API
```bash
# All data can be retrieved via API endpoints
curl http://localhost:5000/api/contacts
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/clients
curl http://localhost:5000/api/subscribers
```

---

## Frontend Commands

### Run Development Server
```bash
cd c:\Users\DELL\Downloads\Project
npm run dev
```

### Build for Production
```bash
cd c:\Users\DELL\Downloads\Project
npm run build
```

### Preview Production Build
```bash
cd c:\Users\DELL\Downloads\Project
npm run preview
```

---

## Backend Commands

### Run with Node
```bash
cd c:\Users\DELL\Downloads\Project\backend
node server.js
```

### Run with Auto-reload (Development)
```bash
cd c:\Users\DELL\Downloads\Project\backend
node --watch server.js
```

### Install Dependencies
```bash
cd c:\Users\DELL\Downloads\Project\backend
npm install
```

### Check Installed Packages
```bash
cd c:\Users\DELL\Downloads\Project\backend
npm list
```

---

## Common Development Tasks

### Clear Node Modules and Reinstall
```bash
# Frontend
cd c:\Users\DELL\Downloads\Project
rm -r node_modules
npm install
npm run dev

# Backend
cd c:\Users\DELL\Downloads\Project\backend
rm -r node_modules
npm install
node server.js
```

### Kill Process on Port (if needed)

For Windows PowerShell:
```bash
# Kill process on port 3000 (frontend)
Get-Process | Where-Object {$_.Id -match "3000"} | Stop-Process

# Kill process on port 5000 (backend)
Get-Process | Where-Object {$_.Id -match "5000"} | Stop-Process
```

Or find port usage:
```bash
netstat -ano | findstr "3000"
netstat -ano | findstr "5000"
```

---

## File Locations

### Important Directories
```
Frontend:
  c:\Users\DELL\Downloads\Project\src
  c:\Users\DELL\Downloads\Project\components
  c:\Users\DELL\Downloads\Project\pages
  c:\Users\DELL\Downloads\Project\services

Backend:
  c:\Users\DELL\Downloads\Project\backend\server.js
  c:\Users\DELL\Downloads\Project\backend\models
  c:\Users\DELL\Downloads\Project\backend\routes
  c:\Users\DELL\Downloads\Project\backend\database.js

Database:
  c:\Users\DELL\Downloads\Project\backend\database.db
```

### Configuration Files
```
Frontend:
  package.json
  vite.config.ts
  tsconfig.json

Backend:
  backend/package.json
```

---

## Editing Files

### Edit Frontend
```bash
# Use VS Code or any text editor
code c:\Users\DELL\Downloads\Project\services\mockApi.ts
code c:\Users\DELL\Downloads\Project\pages\AdminDashboard.tsx
```

### Edit Backend
```bash
# Use VS Code or any text editor
code c:\Users\DELL\Downloads\Project\backend\server.js
code c:\Users\DELL\Downloads\Project\backend\database.js
```

---

## Debugging

### View Frontend Console
```
Browser DevTools (F12) → Console
```

### View Backend Logs
```
Check terminal running backend server
```

### Enable Backend Watch Mode
```bash
cd c:\Users\DELL\Downloads\Project\backend
node --watch server.js
# Server will auto-restart on file changes
```

---

## Environment Check

### Check Node Version
```bash
node --version
```
Should be v16 or higher

### Check npm Version
```bash
npm --version
```

### Check Installed Packages (Frontend)
```bash
cd c:\Users\DELL\Downloads\Project
npm list --depth=0
```

### Check Installed Packages (Backend)
```bash
cd c:\Users\DELL\Downloads\Project\backend
npm list --depth=0
```

---

## URLs Quick Reference

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ✅ |
| Admin Login | http://localhost:3000/admin/login | ✅ |
| Admin Dashboard | http://localhost:3000/admin | ✅ |
| Backend API | http://localhost:5000 | ✅ |
| API Health | http://localhost:5000/api/health | ✅ |

---

## Ports Used

```
3000  - Frontend (Vite Dev Server)
5000  - Backend (Express Server)
```

Make sure these ports are available!

---

## Quick Troubleshooting Commands

### Check if Backend is Running
```bash
curl http://localhost:5000/api/health
```

### Check if Frontend is Running
```bash
# Open browser and go to http://localhost:3000
```

### Check Database File Exists
```bash
dir c:\Users\DELL\Downloads\Project\backend\database.db
```

### See All Database Tables
```bash
# Via Admin Dashboard → check all sections have data
```

### Clear Browser Cache
```
Ctrl + Shift + Delete (in any browser)
Then clear Cookies and Cache
```

---

## Performance Tips

### Frontend
- Hot Module Replacement (HMR) is enabled
- Changes auto-reload without full refresh
- Dev server runs on port 3000

### Backend
- Use `node --watch` for auto-restart
- No need to rebuild for code changes
- Changes apply immediately

### Database
- SQLite is file-based
- No server setup needed
- Automatic table creation

---

## Script Reference

### Frontend npm Scripts
```json
{
  "dev": "vite",           // Start dev server
  "build": "vite build",   // Build for production
  "preview": "vite preview" // Preview production build
}
```

### Backend npm Scripts
```json
{
  "start": "node server.js",     // Run server
  "dev": "node --watch server.js" // Run with auto-reload
}
```

---

## Quick Copy-Paste Commands

### Start Both Servers (Paste in PowerShell)
```bash
# Terminal 1 - Backend
cd c:\Users\DELL\Downloads\Project\backend; node server.js

# Terminal 2 - Frontend (after backend starts)
cd c:\Users\DELL\Downloads\Project; npm run dev
```

### Access Application
```
Frontend: http://localhost:3000
Admin: http://localhost:3000/admin
Login: admin@realtrust.com / admin123
API: http://localhost:5000
```

### Test API
```bash
# All endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/api/contacts
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/clients
curl http://localhost:5000/api/subscribers
```

---

## System is Ready!

**✅ All servers are running**
**✅ Database is initialized**
**✅ API is responding**
**✅ Admin panel is accessible**

Keep these terminals open:
- Terminal 1: Backend
- Terminal 2: Frontend

Then start developing! 🚀
