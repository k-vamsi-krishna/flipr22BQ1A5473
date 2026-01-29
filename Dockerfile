# Frontend Dockerfile - builds the Vite app and serves with nginx

FROM node:18-alpine AS build
WORKDIR /app

# copy package files and install dependencies (including dev deps needed for build)
COPY frontend/package.json frontend/package-lock.json* frontend/tsconfig.json frontend/vite.config.ts ./
COPY frontend/ .

RUN npm ci
RUN npm run build

# Production image with nginx
FROM nginx:stable-alpine

# Copy nginx config (we provide a config that proxies /api to backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
