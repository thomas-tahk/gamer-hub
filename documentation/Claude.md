# Gamer Hub - Claude Setup Documentation

## Project Overview
A social hub for local board game players to organize play sessions. Full-stack application with React/Next.js frontend and Node.js/Express backend.

## Production Deployment Status - COMPLETED ✅

### Digital Ocean Droplet: 143.198.48.83
- ✅ Ubuntu 24.04 LTS droplet created
- ✅ SSH access configured with ed25519 key  
- ✅ Docker and Docker Compose installed
- ✅ Repository cloned to `/opt/gamer-hub`
- ✅ Production environment files created
- ✅ Docker images built locally and pushed to Docker Hub
- ✅ Production deployment using pre-built images completed

### Live Application
- **Frontend**: http://143.198.48.83 (accessible)
- **Backend API**: http://143.198.48.83:8080 (running)
- **Status**: Deployed but requires database initialization for full functionality

### Docker Hub Images
- `ttahk/gamer-hub-frontend:latest` (linux/amd64)
- `ttahk/gamer-hub-backend:latest` (linux/amd64)

### Technology Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Cache/Sessions**: Redis
- **Infrastructure**: Docker, Docker Compose

### Database Schema
- **profile**: User accounts with authentication
- **game**: Board game catalog 
- **favorite**: User's favorite games
- **meetup**: Game sessions/events
- **message**: Chat messages for meetups
- **rsvp**: Event attendance tracking

### Environment Configuration
All sensitive values are stored in environment files (project.env, .env.production) on the droplet and are NOT committed to the repository.

### Development Workflow
```bash
# Local development
docker compose up -d
# Visit http://localhost

# Database management
docker exec -i gamer-hub-sql-1 psql -U username -d project < sql/gamer-hub.sql
```

### Deployment Process
1. Build images locally with correct platform: `docker buildx build --platform linux/amd64`
2. Push to Docker Hub: `docker push ttahk/gamer-hub-[service]:latest`
3. Deploy on droplet: `docker-compose pull && docker-compose up -d`

### Manual Deployment Process (Current Working Method)
Since automated CI/CD has issues, use this manual process:

```bash
# 1. Build and push images locally
docker buildx build --platform linux/amd64 -t ttahk/gamer-hub-frontend:latest ./frontend --push
docker buildx build --platform linux/amd64 -t ttahk/gamer-hub-backend:latest ./backend --push

# 2. Update on droplet
ssh root@143.198.48.83 "cd /opt/gamer-hub && docker-compose pull && docker-compose up -d"
```

### CI/CD Issues Encountered
- **Next.js 15.2.4 Performance Regression**: Known issue with Docker builds taking 7+ minutes
- **Environment Variable Issues**: `process.env.REST_API_URL` undefined during Docker build causing routing failures
- **Fixed**: Added fallbacks in `next.config.ts` for undefined env vars
- **GitHub Actions Failures**: Build process fails in containerized environment
- **Docker Hub Authentication**: Requires periodic re-login (`docker logout && docker login`)

### Security Lessons Learned
- **CRITICAL**: Never commit actual API keys, passwords, or secrets to repository
- **Use placeholders**: Always use `[placeholder]` format in documentation
- **Environment files**: Keep `.env` files local only, ensure they're gitignored
- **Docker images**: Use `.dockerignore` to prevent sensitive files from being baked into public images

### Known Issues & Future Refactoring
- **Database seeding**: Currently takes ~2 hours via external API calls
- **Security vulnerabilities**: Need to address npm audit findings
- **Authentication**: Login/signup needs testing and potential fixes
- **Game data**: Need to optimize the board game catalog loading process
- **CI/CD Automation**: GitHub Actions workflow needs debugging or consider alternatives (CircleCI, ArgoCD)

---
*Generated during setup session with Claude Code*