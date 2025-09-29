# Multi-stage Dockerfile for Railway deployment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE $PORT

# Start command
CMD ["npm", "start"]