# Stage 1 - Build React frontend
FROM node:24-slim AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

# Stage 2 - Final image
FROM node:24-slim

# Install Nginx and Supervisord
RUN apt-get update && apt-get install -y nginx supervisor && rm -rf /var/lib/apt/lists/*

# Set up backend
WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

# Create data directory for SQLite
RUN mkdir -p /app/backend/data

# Copy built frontend from Stage 1
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy config files
COPY nginx.conf /etc/nginx/sites-available/default
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]