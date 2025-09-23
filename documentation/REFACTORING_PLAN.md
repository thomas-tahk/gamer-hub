# Gamer Hub Migration Plan: Docker/DO → Vercel + Railway
*Updated: 2025-09-22*
*Status: IN PROGRESS - Phase 2*

## Migration Decision Made

**Selected Approach:** Option 2 - Vercel Frontend + Railway Backend
- Complete platform migration from Docker/Digital Ocean
- Modern git-based deployment workflow
- Managed database and automated scaling

## Current Status Assessment

### ✅ Security Vulnerabilities FIXED

**Frontend & Backend:** All npm security vulnerabilities resolved via `npm audit fix`
- Updated dependencies to latest secure versions
- Zero vulnerabilities remaining as of 2025-09-22

### Database Seeding Performance Crisis

**Current Implementation Problems:**
- 999 sequential API calls to BoardGameGeek
- Sequential database inserts (await each individual insert)
- No batch operations, no parallelization
- No progress tracking or error recovery
- Takes ~2 hours to seed 20,000 games

**Code Location:** `backend/src/utils/dataDownLoader/dataDownloaderBgg.ts`

## Migration Execution Plan

### ✅ Phase 1: Security & Local Testing (COMPLETED)
1. **Fixed all npm security vulnerabilities** ✅
2. **Verified local environment functionality** ✅
   - Backend responding: API endpoints working
   - Frontend loading: React app with navigation
   - Docker compose environment stable

### 🚧 Phase 2: Railway Backend Setup (IN PROGRESS)
**Current Step:** Setting up parallel Railway deployment
**User Action Required:**
1. Create Railway account at https://railway.com
2. Connect GitHub account to Railway
3. Confirm ready to proceed

### Phase 3: Vercel Frontend Deployment (PENDING)
- Deploy frontend to Vercel
- Test with current DO backend first
- Switch to Railway backend after verification

### Phase 4: Database Migration (PENDING)
- Export data from DO PostgreSQL
- Import to Railway PostgreSQL
- Run parallel testing before switchover

### Phase 5: Final Switchover (PENDING)
- Update environment variables
- Test end-to-end functionality
- Decommission DO droplet

## Optimized Database Seeding Strategy

### New BGG Seeding Approach
**Current Problem:** 2-hour sequential API calls and database inserts
**Solution:** Batch processing with concurrency limits

```typescript
// Concurrent API requests with rate limiting
const BATCH_SIZE = 100
const CONCURRENT_BATCHES = 5

// Process 5 batches of 100 games simultaneously
// Bulk database inserts instead of one-by-one
// Time improvement: 2 hours → 15-30 minutes
```

### Integration Options
1. **Local seeding script** - Run from machine, connect to cloud DB
2. **Railway cron jobs** - Automated weekly updates
3. **Admin panel trigger** - Manual refresh via web interface

## Risk Mitigation Strategy

### Built-in Escape Hatches
- ✅ **Current DO setup remains live** during entire migration
- ✅ **DNS control** - Can switch back instantly
- ✅ **Database backup** - Full export before migration
- ✅ **Git rollback** - All changes version controlled
- ✅ **Parallel testing** - No downtime during transition

### What Prevents Getting Stuck
- Railway/Vercel are mainstream platforms with extensive documentation
- Large community support and standard practices
- Export capabilities prevent permanent lock-in
- Worst-case: Abandon migration, fix GitHub Actions instead

## Cost Analysis

**Current Setup:** ~$12/month Digital Ocean droplet
**New Setup:**
- Vercel: Free (Hobby tier)
- Railway: $5/month minimum usage
- **Total: $5/month** (58% cost reduction)

## Timeline Estimate

**Total Migration Time:** 2-4 hours spread across multiple sessions
- Phase 2 (Railway): 30-60 minutes
- Phase 3 (Vercel): 15-30 minutes
- Phase 4 (Database): 30-60 minutes
- Phase 5 (Switchover): 15-30 minutes

## Repository Status
- **Remote**: https://github.com/thomas-tahk/gamer-hub.git
- **Current Production**: http://143.198.48.83 (Digital Ocean - REMAINS LIVE)
- **Local Environment**: Docker Compose - ✅ VERIFIED WORKING
- **Migration Status**: Phase 2 in progress