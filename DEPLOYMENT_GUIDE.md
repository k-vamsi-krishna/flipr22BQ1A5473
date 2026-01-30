# RealTrust - Deployment Guide

This guide covers deploying your full-stack Real Estate & Consultation app.

---

## Current Project Structure

```
Project/
├── frontend files (at root: App.tsx, index.tsx, components/, pages/, services/, etc.)
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── database.db
├── dist/                 (production build of frontend - run `npm run build`)
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

---

## Deployment Options

### **Option 1: Local Deployment (Development)**

If you want to run both frontend and backend locally:

#### Start Backend
```powershell
cd C:\Users\DELL\Downloads\Project\backend
npm install
npm start
# Backend runs at http://localhost:5000
```

#### Start Frontend (in another terminal)
```powershell
cd C:\Users\DELL\Downloads\Project
npm install
npm run dev
# Frontend runs at http://localhost:3000 (or http://localhost:5173)
```

#### Build for Production
```powershell
cd C:\Users\DELL\Downloads\Project
npm run build
# Creates dist/ folder with optimized static files
```

---

### **Option 2: Docker Deployment (Local or Cloud)**

#### Prerequisites
- Install Docker Desktop from https://www.docker.com/products/docker-desktop

#### Local Docker Deployment
```powershell
cd C:\Users\DELL\Downloads\Project

# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

#### Push Docker Images to Registry

1. **Create Docker Hub account** (free at https://hub.docker.com)

2. **Build and tag images:**
   ```powershell
   docker build -t yourusername/realtrust-frontend:latest .
   docker build -t yourusername/realtrust-backend:latest ./backend
   ```

3. **Push to Docker Hub:**
   ```powershell
   docker push yourusername/realtrust-frontend:latest
   docker push yourusername/realtrust-backend:latest
   ```

---

### **Option 3: Deploy to Render (Easiest)**

Render is a modern cloud platform that makes deploying Node.js and static sites easy.

#### Deploy Backend
1. Go to https://render.com and sign up (free)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Choose branch: `main`
5. **Settings:**
   - **Name:** `realtrust-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Region:** Choose closest to your users
6. Click **Create Web Service**
7. Copy the deployed URL (e.g., `https://realtrust-backend.onrender.com`)

#### Deploy Frontend
1. Build for production locally:
   ```powershell
   npm run build
   ```
2. Go to https://render.com → **New +** → **Static Site**
3. Connect your GitHub repository
4. **Settings:**
   - **Name:** `realtrust-frontend`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**

#### Update Frontend API URL for Production
After deploying backend, update `services/mockApi.ts`:

```typescript
// Change from:
const API_BASE_URL = 'http://localhost:5000/api';

// To:
const API_BASE_URL = 'https://realtrust-backend.onrender.com/api';
```

Then rebuild and redeploy frontend:
```powershell
npm run build
git add .
git commit -m "Update API URL for production"
git push
```

---

### **Option 4: Deploy to Railway**

Railway (https://railway.app) is another simple option.

1. Sign up at https://railway.app
2. Create a new project
3. Add services from your GitHub repo:
   - **Backend service:** Points to `/backend` folder
   - **Frontend service:** Points to root, build with `npm run build`

---

### **Option 5: Deploy to Vercel (Frontend Only) + Render/Railway (Backend)**

Vercel is perfect for static React apps:

1. Push your code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Import your project
4. **Settings:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Update `API_BASE_URL` in `services/mockApi.ts` to point to your backend
6. Redeploy

---

### **Option 6: VPS Deployment (DigitalOcean, AWS EC2, Linode, etc.)**

#### On Your Server (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone your repo
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo

# Install dependencies
npm install
cd backend && npm install && cd ..

# Build frontend
npm run build

# Start backend with PM2
cd backend
pm2 start server.js --name "realtrust-backend"
pm2 save

# Configure Nginx (reverse proxy)
sudo apt-get install -y nginx

# Edit /etc/nginx/sites-available/default and add:
upstream backend {
  server localhost:5000;
}

server {
  listen 80 default_server;
  server_name yourdomain.com;

  root /path/to/project/dist;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location /api {
    proxy_pass http://backend;
    proxy_http_version 1.1;
  }
}

# Restart Nginx
sudo systemctl restart nginx

# Install SSL (Let's Encrypt)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
NODE_ENV=production
PORT=5000
DATABASE_PATH=./database.db
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

Update `backend/server.js` to use environment variables:

```javascript
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Database Persistence

- **Local:** SQLite file at `backend/database.db` (persists automatically)
- **Docker:** Volume mapping in `docker-compose.yml` keeps DB persistent
- **Cloud:** Most cloud platforms keep volumes persistent, but consider:
  - Render: Database not persisted by default (use their PostgreSQL add-on for $7/month)
  - Railway: Same (use their PostgreSQL add-on)
  - VPS: Full control—configure as needed

---

## SSL/HTTPS

All production deployments should use HTTPS:
- **Render:** Automatic SSL with free Let's Encrypt
- **Vercel:** Automatic SSL
- **VPS:** Use Certbot + Let's Encrypt (see VPS section above)

---

## Monitoring & Logs

### Docker
```powershell
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Render/Railway
- Built-in log viewer in dashboard

### VPS
```bash
pm2 logs realtrust-backend
pm2 monit
```

---

## Quick Checklist Before Deploying

- [ ] Frontend builds without errors: `npm run build`
- [ ] Backend starts without errors: `npm start` in `backend/` folder
- [ ] Database file exists: `backend/database.db`
- [ ] API URL in `services/mockApi.ts` points to correct backend
- [ ] Environment variables set (CORS origins, database path, etc.)
- [ ] Git repo is up to date and pushed to GitHub
- [ ] No sensitive keys/passwords in code (use `.env` files)
- [ ] Test contact form submission end-to-end before deploying

---

## Recommended Path for You

**For quickest deployment:**
1. Use **Render** (free tier available)
2. Backend: Deploy Node service from `/backend` folder
3. Frontend: Deploy static site with `npm run build`
4. Update API URL in frontend and redeploy

**Total time:** ~15 minutes, no credit card needed

---

## Troubleshooting

### Frontend shows "Failed to fetch"
- Check CORS origins in `backend/server.js` match your frontend URL
- Verify backend API URL in `services/mockApi.ts` is correct
- Test: `curl http://backend-url/api/health`

### Database queries fail
- Ensure `backend/database.db` file exists
- Check file permissions (cloud may need write permissions)
- Verify `backend/database.js` path is correct for deployment environment

### Port conflicts
- Change `PORT` in `backend/server.js` or via environment variable
- Frontend Vite port can be changed in `vite.config.ts`

---

**Questions?** Check the logs and share error output for specific debugging.
