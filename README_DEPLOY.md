Deployment (Docker)

This repository includes Dockerfiles for the frontend and backend and a `docker-compose.yml` to run both services together.

Quick local deploy (PowerShell)

1. Build images:

```powershell
cd C:\Users\DELL\Downloads\Project
docker-compose build
```

2. Start services in background:

```powershell
docker-compose up -d
```

3. View logs:

```powershell
docker-compose logs -f
```

4. Open the app in your browser:

- Frontend: http://localhost:3000
- Backend API health: http://localhost:5000/api/health

Notes
- The `docker-compose.yml` maps `./backend/database.db` into the backend container to persist the SQLite database on the host.
- Nginx serves the frontend on port 3000 and proxies `/api` requests to the backend container.
- If you want to deploy to a cloud provider (Render, Railway, Fly, or a VPS), you can either use these Dockerfiles or deploy frontend and backend separately (frontend as static site, backend as Node service). If you want, I can provide provider-specific steps.
