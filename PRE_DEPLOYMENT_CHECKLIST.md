# Pre-Deployment Checklist

Complete this checklist before deploying to production.

## Code Quality
- [ ] Frontend builds without errors: `npm run build`
- [ ] No console errors or warnings in dev: `npm run dev`
- [ ] Backend starts without errors: `npm start` (in backend/)
- [ ] All git changes committed and pushed: `git status` shows clean
- [ ] No `.env` or credentials in git history
- [ ] README.md and documentation up to date

## Functionality Testing
- [ ] Contact form submits successfully
- [ ] Phone number validation works (rejects <10 digits)
- [ ] Admin login works (admin@realtrust.com / admin123)
- [ ] Admin dashboard displays all contacts
- [ ] Admin can delete contacts
- [ ] Newsletter subscription works
- [ ] All navigation links work correctly
- [ ] Responsive design looks good on mobile/tablet/desktop

## Backend/API
- [ ] Health check endpoint works: `curl http://localhost:5000/api/health`
- [ ] Database file exists and is readable: `backend/database.db`
- [ ] All routes tested (contacts, projects, clients, subscribers)
- [ ] CORS is properly configured for your domain
- [ ] Error handling is in place (validation, database errors)
- [ ] Database backups are configured (if applicable)

## Frontend Configuration
- [ ] API URL in `services/mockApi.ts` is correct for production
- [ ] API URL will be updated before deployment to cloud
- [ ] No hardcoded localhost URLs in code
- [ ] Build optimization working (dist/ is small as possible)
- [ ] Service workers configured (or disabled if not needed)

## Security
- [ ] No sensitive keys/passwords in code
- [ ] `.env` files created and added to `.gitignore`
- [ ] CORS origins restricted to your domain
- [ ] HTTPS enabled on production domain
- [ ] Email validation implemented on backend
- [ ] Phone validation implemented on backend
- [ ] SQL injection protection (use parameterized queries)
- [ ] Rate limiting configured (optional but recommended)

## Deployment Readiness
- [ ] Docker images build without errors (if using Docker)
- [ ] docker-compose.yml configured correctly
- [ ] Environment variables template created (`.env.example`)
- [ ] Deployment platform account created (Render, Vercel, etc.)
- [ ] Domain name ready or assigned
- [ ] SSL certificate configured (automatic on most platforms)
- [ ] Database persistence strategy decided (SQLite file vs hosted DB)
- [ ] Monitoring/logging configured

## Post-Deployment
- [ ] Test API endpoints from deployed backend
- [ ] Test frontend and verify it connects to backend
- [ ] Check browser console for errors
- [ ] Test contact form end-to-end on production
- [ ] Verify database persists across restarts
- [ ] Monitor logs for any errors
- [ ] Set up automated backups (if applicable)
- [ ] Enable monitoring/alerts (if applicable)

## DNS & Domain
- [ ] Domain DNS records point to deployment server
- [ ] SSL certificate is valid and auto-renews
- [ ] Both www and non-www versions work (or one is redirected)
- [ ] Email notifications configured (if applicable)

---

## Quick Commands Reference

### Build & Test Locally
```powershell
# Test frontend
npm run build
npm run preview

# Test backend
cd backend
npm install
npm start
# Test: curl http://localhost:5000/api/health
```

### Docker (Local Test)
```powershell
docker-compose build
docker-compose up -d
# Access: http://localhost:3000 and http://localhost:5000
docker-compose down
```

### Before Git Push (Final Check)
```powershell
git status                          # No uncommitted changes
git log --oneline | head -5         # Recent commits visible
npm run build                       # Frontend builds
cd backend; npm install; cd ..      # Backend deps installed
```

### Deploy to Render
1. Push to GitHub: `git push origin main`
2. Go to https://render.com
3. Create services from dashboard (see DEPLOYMENT_GUIDE.md for details)
4. Monitor deployment in Render dashboard

---

**✅ Ready to deploy?** Start with the deployment script:
```powershell
.\deploy.ps1
```

Choose option 6 for guided next steps!
