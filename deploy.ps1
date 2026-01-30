# RealTrust Deployment Script for Windows/PowerShell
# This script handles local and cloud deployments

Write-Host "🚀 RealTrust Deployment Script" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Menu
Write-Host "Select deployment option:" -ForegroundColor Yellow
Write-Host "1. Local development (npm run dev)" -ForegroundColor White
Write-Host "2. Build for production" -ForegroundColor White
Write-Host "3. Build Docker images" -ForegroundColor White
Write-Host "4. Start with Docker Compose" -ForegroundColor White
Write-Host "5. Deploy to Render (requires git push)" -ForegroundColor White
Write-Host "6. Production build + show next steps" -ForegroundColor White
Write-Host "0. Exit" -ForegroundColor White

$choice = Read-Host "`nEnter your choice (0-6)"

$projectRoot = Get-Location
$frontendDir = $projectRoot
$backendDir = Join-Path $projectRoot "backend"

switch($choice) {
  "1" {
    Write-Host "`n▶ Starting local development servers..." -ForegroundColor Green
    Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "Backend: http://localhost:5000`n" -ForegroundColor Cyan
    
    # Start backend in background
    Start-Process powershell -ArgumentList "cd '$backendDir'; npm run dev"
    Start-Sleep -Seconds 3
    
    # Start frontend
    Set-Location $frontendDir
    npm run dev
  }

  "2" {
    Write-Host "`n▶ Building for production..." -ForegroundColor Green
    Set-Location $frontendDir
    npm run build
    Write-Host "`n✅ Frontend built successfully!" -ForegroundColor Green
    Write-Host "Output: ./dist/" -ForegroundColor Cyan
  }

  "3" {
    Write-Host "`n▶ Building Docker images..." -ForegroundColor Green
    Write-Host "Make sure Docker is running!`n" -ForegroundColor Yellow
    
    Set-Location $projectRoot
    
    # Check if Docker is installed
    $docker = Get-Command docker -ErrorAction SilentlyContinue
    if (-not $docker) {
      Write-Host "❌ Docker not found. Install from https://www.docker.com/products/docker-desktop" -ForegroundColor Red
      exit 1
    }
    
    docker-compose build
    Write-Host "`n✅ Docker images built!" -ForegroundColor Green
    Write-Host "Run 'docker-compose up -d' to start services" -ForegroundColor Cyan
  }

  "4" {
    Write-Host "`n▶ Starting Docker Compose..." -ForegroundColor Green
    Set-Location $projectRoot
    
    docker-compose up -d
    
    Start-Sleep -Seconds 3
    
    Write-Host "`n✅ Services started!" -ForegroundColor Green
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
    Write-Host "Health: http://localhost:5000/api/health`n" -ForegroundColor Cyan
    
    Write-Host "View logs:" -ForegroundColor Yellow
    Write-Host "  docker-compose logs -f" -ForegroundColor Gray
    
    Write-Host "`nStop services:" -ForegroundColor Yellow
    Write-Host "  docker-compose down" -ForegroundColor Gray
  }

  "5" {
    Write-Host "`n▶ Preparing for Render deployment..." -ForegroundColor Green
    
    Set-Location $projectRoot
    
    # Check if git is clean
    $status = git status --porcelain
    if ($status) {
      Write-Host "`n📝 Uncommitted changes detected. Commit them first:" -ForegroundColor Yellow
      Write-Host "  git add ." -ForegroundColor Gray
      Write-Host "  git commit -m 'prepare for deployment'" -ForegroundColor Gray
      Write-Host "  git push origin main" -ForegroundColor Gray
      exit 1
    }
    
    Write-Host "`n✅ Git repository is clean`n" -ForegroundColor Green
    
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://render.com" -ForegroundColor White
    Write-Host "2. Sign up or log in with GitHub" -ForegroundColor White
    Write-Host "3. Create 'New Web Service' for backend" -ForegroundColor White
    Write-Host "   - Connect GitHub repo" -ForegroundColor White
    Write-Host "   - Branch: main" -ForegroundColor White
    Write-Host "   - Build: cd backend && npm install" -ForegroundColor White
    Write-Host "   - Start: cd backend && npm start" -ForegroundColor White
    Write-Host "4. Note backend URL (e.g., https://realtrust-backend.onrender.com)" -ForegroundColor White
    Write-Host "5. Create 'New Static Site' for frontend" -ForegroundColor White
    Write-Host "   - Connect GitHub repo" -ForegroundColor White
    Write-Host "   - Build: npm run build" -ForegroundColor White
    Write-Host "   - Publish: dist" -ForegroundColor White
    Write-Host "`nLearn more: https://render.com/docs" -ForegroundColor Gray
  }

  "6" {
    Write-Host "`n▶ Building production release..." -ForegroundColor Green
    
    Set-Location $frontendDir
    npm run build
    
    Set-Location $backendDir
    Write-Host "Backend dependencies up to date (no build step needed)" -ForegroundColor Cyan
    
    Write-Host "`n✅ Production build complete!" -ForegroundColor Green
    
    Write-Host "`n📦 Deployment Options:" -ForegroundColor Cyan
    Write-Host "`n1. DOCKER (Recommended for ease):" -ForegroundColor Yellow
    Write-Host "   docker-compose build" -ForegroundColor Gray
    Write-Host "   docker-compose up -d" -ForegroundColor Gray
    
    Write-Host "`n2. RENDER (Free tier, easiest):" -ForegroundColor Yellow
    Write-Host "   - Visit https://render.com" -ForegroundColor Gray
    Write-Host "   - Create web service for backend (/backend folder)" -ForegroundColor Gray
    Write-Host "   - Create static site for frontend (dist folder)" -ForegroundColor Gray
    
    Write-Host "`n3. VERCEL (Frontend only, very fast):" -ForegroundColor Yellow
    Write-Host "   - Visit https://vercel.com" -ForegroundColor Gray
    Write-Host "   - Import GitHub repo" -ForegroundColor Gray
    Write-Host "   - Build: npm run build, Dist: dist" -ForegroundColor Gray
    
    Write-Host "`n4. VPS (Full control, more setup):" -ForegroundColor Yellow
    Write-Host "   - Use deploy-vps.sh (configure for your server)" -ForegroundColor Gray
    Write-Host "   - Or follow DEPLOYMENT_GUIDE.md VPS section" -ForegroundColor Gray
    
    Write-Host "`n📖 Full guide available in: DEPLOYMENT_GUIDE.md" -ForegroundColor Green
  }

  "0" {
    Write-Host "Goodbye!" -ForegroundColor Cyan
    exit 0
  }

  default {
    Write-Host "Invalid option. Exiting." -ForegroundColor Red
    exit 1
  }
}

Write-Host "`n✅ Done!" -ForegroundColor Green
