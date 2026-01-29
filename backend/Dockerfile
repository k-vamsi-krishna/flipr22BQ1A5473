# Backend Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy package manifest and install production deps
COPY package.json package-lock.json* ./
RUN npm ci --production || npm install --production

# Copy backend source
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
