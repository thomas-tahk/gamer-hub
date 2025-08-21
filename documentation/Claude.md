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

### Known Issues & Future Refactoring
- **Database seeding**: Currently takes ~2 hours via external API calls
- **Security vulnerabilities**: Need to address npm audit findings
- **Authentication**: Login/signup needs testing and potential fixes
- **Game data**: Need to optimize the board game catalog loading process

---
*Generated during setup session with Claude Code*