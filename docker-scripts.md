# Docker Multi-Environment Setup

This project supports three Docker environments: **Development**, **Production**, and **Basic**.

## Quick Start Commands

### Development Mode (Recommended for local development)
```bash
# Using the main docker-compose
docker-compose -f docker-compose.base.yml -f docker-compose.dev.yml up --build

# Or shorter with default
docker-compose up --build
```

### Production Mode (Optimized standalone build)
```bash
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up --build

# Or using multi-stage Dockerfile directly
docker build -f Dockerfile.multi --target production -t passiton-admin:prod .
docker run -p 3000:3000 --env-file .env passiton-admin:prod
```

### Basic Mode (Simple build without optimization)
```bash
docker-compose -f docker-compose.base.yml -f docker-compose.basic.yml up --build

# Or using multi-stage Dockerfile directly
docker build -f Dockerfile.multi --target basic -t passiton-admin:basic .
docker run -p 3000:3000 --env-file .env passiton-admin:basic
```

## Environment Files Required

Make sure you have a `.env` file in the project root with:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Environment Differences

| Feature | Development | Basic | Production |
|---------|------------|-------|------------|
| Hot Reload | ✅ | ❌ | ❌ |
| Volume Mounting | ✅ | ❌ | ❌ |
| Turbo Mode | ✅ | ❌ | ❌ |
| Standalone Build | ❌ | ❌ | ✅ |
| Optimized Build | ❌ | ✅ | ✅ |
| Container Size | Large | Medium | Small |
| Build Time | Fast | Medium | Slow |
| Runtime Performance | Good | Good | Best |

## Troubleshooting

### Port Already in Use
```bash
# Stop all containers
docker-compose down --remove-orphans

# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Environment Variables Not Loading
1. Ensure `.env` file exists in project root
2. Check docker-compose file includes `--env-file .env`
3. Verify environment variables are passed as build args

### Build Failures
1. Clear Docker cache: `docker system prune -a`
2. Remove node_modules volume: `docker volume prune`
3. Rebuild without cache: `docker-compose build --no-cache`

### Production Mode Issues
- Uses standalone output (smaller but less flexible)
- No hot reload or development features
- Optimized for performance, not debugging

## Local Development (Recommended)

For the best development experience, run locally:

```bash
npm install
npm run dev
```

This avoids Docker complexity and provides the fastest development cycle.

## Health Checks

Production mode includes health checks:
- Endpoint: `http://localhost:3000/api/health`
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3

Create `/app/api/health/route.ts` for health check endpoint if needed.