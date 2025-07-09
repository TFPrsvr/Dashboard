# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package definition files
COPY package.json package-lock.json* yarn.lock* ./

# Install deps
RUN npm install

# Copy all source
COPY . .

# Build Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start in development mode (hot-reload)
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
