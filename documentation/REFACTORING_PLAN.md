# Gamer Hub Refactoring Plan
*Session Date: 2025-09-19*

## Current Status Assessment

### Critical Security Vulnerabilities Found

**Frontend (High/Moderate):**
- Next.js: Cache confusion, content injection, SSRF vulnerabilities
- React Router: Pre-render spoofing, DoS via cache poisoning
- Brace-expansion: ReDoS vulnerability
- **Fix**: `npm audit fix` in frontend directory

**Backend (CRITICAL - Must Fix First):**
- **form-data**: Critical unsafe random boundary generation
- **axios**: High severity DoS vulnerability
- **on-headers**: HTTP header manipulation (affects express-session & morgan)
- **Fix**: `npm audit fix` in backend directory

### Database Seeding Performance Crisis

**Current Implementation Problems:**
- 999 sequential API calls to BoardGameGeek
- Sequential database inserts (await each individual insert)
- No batch operations, no parallelization
- No progress tracking or error recovery
- Takes ~2 hours to seed 20,000 games

**Code Location:** `backend/src/utils/dataDownLoader/dataDownloaderBgg.ts`

## Immediate Priority Action Plan

### Phase 1: Security & Stability (Next Session Start Here)
1. **Fix all npm security vulnerabilities**
   ```bash
   cd frontend && npm audit fix
   cd backend && npm audit fix
   ```

2. **Test basic functionality**
   - Start local environment: `docker compose up -d`
   - Test backend health endpoint
   - Test authentication endpoints

### Phase 2: Database Seeding Optimization
1. **Create optimized seeding strategy:**
   - Batch API requests (concurrent requests with rate limiting)
   - Batch database inserts (bulk INSERT statements)
   - Add progress tracking and resumability
   - Error recovery and retry logic

2. **Create minimal seed data for development:**
   - Small curated game dataset (~100 games)
   - Test user accounts
   - Sample meetups and messages

### Phase 3: Core Functionality Verification
1. **Authentication system testing**
2. **Frontend-backend integration testing**
3. **Data fetching optimization**

## Technical Debt Identified

### Backend Issues
- Multiple linting violations (ts-standard)
- Unused imports and spacing issues
- Environment variables in committed files (security risk)

### Frontend Issues
- No ESLint configuration active
- Build process needs verification
- Component architecture review needed

### Architecture Concerns
- Data fetching patterns likely inefficient
- No caching strategy implemented
- Error handling inconsistent

## Notes for Next Session

- Prioritize making core functionality work over code prettiness initially
- Focus on security vulnerabilities first (especially critical backend ones)
- Database seeding is a major blocker for testing the full application
- Authentication system appears complete but needs functional testing

## Repository Status
- **Remote**: https://github.com/thomas-tahk/gamer-hub.git
- **Deployed**: http://143.198.48.83 (production working but limited by database state)
- **Local Environment**: Docker Compose setup available