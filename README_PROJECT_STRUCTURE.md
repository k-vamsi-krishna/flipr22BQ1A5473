# RealTrust - Real Estate & Consultation Platform

## Project Structure

After reorganization, the project is now split into two main folders:

```
Project/
├── frontend/              # React + TypeScript frontend (Vite)
│   ├── src/
│   ├── components/        # React components (Navbar, Hero, ProjectSection, etc.)
│   ├── pages/             # Page components (LandingPage, AdminLogin, AdminDashboard)
│   ├── services/          # API client (mockApi.ts)
│   ├── types.ts           # TypeScript interfaces
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/               # Node.js + Express backend (SQLite)
│   ├── models/            # CRUD models (Project, Client, Contact, Subscriber)
│   ├── routes/            # REST API routes (/api/projects, /api/clients, etc.)
│   ├── database.js        # SQLite database initialization
│   ├── server.js          # Express app entry point
│   ├── package.json
│   ├── database.db        # SQLite database file
│   └── Dockerfile
│
├── Dockerfile             # Frontend Dockerfile (multi-stage build with nginx)
├── docker-compose.yml     # Docker Compose config for both services
├── nginx.conf             # Nginx config (proxies /api to backend)
└── README.md              # This file
```

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- Backend runs on port 5000
- Frontend runs on port 3000

### Start Backend

```bash
cd backend
npm install
node server.js
```

Backend will start at `http://localhost:5000`  
API routes available under `/api/...`  
Database: `./database.db` (SQLite)

### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at `http://localhost:3000`  
Open in browser: `http://localhost:3000`

### Access Admin Panel

Navigate to: `http://localhost:3000/#/admin/login`  
**Mock Credentials:**
- Email: `admin@realtrust.com`
- Password: `admin123`

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

After running, access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Admin: http://localhost:3000/#/admin/login

## API Endpoints

All endpoints are under `/api`:

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Contact Submissions
- `GET /api/contacts` - List all submissions
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete submission

### Newsletter
- `GET /api/subscribers` - List subscribers
- `POST /api/subscribers` - Add subscriber
- `DELETE /api/subscribers/:id` - Remove subscriber

### Health Check
- `GET /api/health` - Backend status

## Database

SQLite database file: `backend/database.db`

### Tables
1. **projects** - Project listings (id, name, description, image, location)
2. **clients** - Testimonials (id, name, designation, description, image)
3. **contacts** - Form submissions (id, fullName, email, mobile, city, createdAt)
4. **subscribers** - Newsletter (id, email, subscribedAt)
5. **admin_users** - Admin accounts (id, email, password_hash)

To inspect database:
```bash
cd backend
npm install -g sqlite3
sqlite3 database.db ".tables"  # List tables
sqlite3 database.db "SELECT COUNT(*) FROM contacts;"  # Count rows
```

Or use: `node queryDb.js` (helper script in backend/)

## Frontend Features

- **Landing Page** - Hero section with lead form, projects showcase, testimonials, newsletter
- **Admin Dashboard** - Full CRUD management for projects, clients, contacts, subscribers
- **Image Cropping** - Built-in image tool (450x350 for projects, circular for clients)
- **Responsive Design** - Mobile-first, Tailwind CSS
- **API Integration** - Real backend calls via `mockApi.ts`

## Backend Stack

- **Node.js** (ESM)
- **Express.js** - REST API framework
- **SQLite3** - Database
- **UUID** - ID generation
- **CORS** - Cross-origin requests

## Build & Deploy

### Build Frontend
```bash
cd frontend
npm run build
```
Output: `frontend/dist/` (static files ready for nginx/CDN)

### Environment
- Frontend looks for backend at `http://localhost:5000/api` (hardcoded in `services/mockApi.ts`)
- For production, update `API_BASE_URL` in `frontend/services/mockApi.ts`

## Next Steps (Optional Enhancements)

1. **JWT Authentication** - Replace mock auth with real JWT tokens
2. **Password Hashing** - Implement bcryptjs for admin passwords
3. **Email Notifications** - Send confirmation emails on contact/subscription
4. **Cloud Storage** - Migrate image storage from base64 to S3/Cloudinary
5. **Deployment** - Deploy to Render, Railway, Vercel, or your VPS

## File Locations

| File | Purpose |
|------|---------|
| `frontend/App.tsx` | Main React app with routing |
| `frontend/services/mockApi.ts` | API client calling backend |
| `backend/server.js` | Express server entry point |
| `backend/database.js` | SQLite setup and utilities |
| `backend/routes/*` | REST endpoint handlers |
| `docker-compose.yml` | Multi-container orchestration |
| `nginx.conf` | Reverse proxy config |

---

Built with React, TypeScript, Express, and SQLite. Fully containerized with Docker.
