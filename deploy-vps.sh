#!/bin/bash
# Deploy to VPS with PM2

# Configuration
SERVER_URL="your-server.com"
SERVER_USER="ubuntu"
SERVER_PATH="/home/ubuntu/realtrust"
GITHUB_REPO="https://github.com/yourusername/yourrepo.git"

echo "🚀 Starting RealTrust Deployment..."

# Step 1: Connect to server and setup
echo "📦 Setting up on server..."
ssh $SERVER_USER@$SERVER_URL << 'EOF'

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
  echo "Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Install PM2 globally
sudo npm install -g pm2

# Create project directory
mkdir -p $SERVER_PATH
cd $SERVER_PATH

# Clone or pull latest code
if [ -d ".git" ]; then
  git pull origin main
else
  git clone $GITHUB_REPO .
fi

# Install dependencies
npm install
cd backend && npm install && cd ..

# Build frontend
npm run build

# Create .env file
cat > backend/.env << 'ENVFILE'
NODE_ENV=production
PORT=5000
DATABASE_PATH=./database.db
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
ENVFILE

# Start backend with PM2
cd backend
pm2 start server.js --name "realtrust-backend"
pm2 save
pm2 startup

echo "✅ Deployment complete!"
echo "Backend URL: https://yourdomain.com/api"

EOF

echo "✅ RealTrust deployed successfully!"
