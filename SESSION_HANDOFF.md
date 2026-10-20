# UniversalQR — Session Handoff

> **Quick start for the next session.** Read this file first. Do not assume anything works without running the verification steps below.

---

## Project Overview

**UniversalQR** is a free, multi-purpose dynamic QR code platform for businesses of any type — restaurants, retail stores, clothing brands, events, hotels, agencies, and personal use. It lets businesses create static and dynamic QR codes, customise their appearance, download PNG/SVG images, create QR-powered landing pages, update dynamic destinations without reprinting, and track scan analytics.

The platform is **completely free during initial development**. There are no paid plans, subscription tiers, billing modules, or payment gateways, and none should be added unless explicitly requested.

---

## Environment

| Item | Value |
|---|---|
| OS | Windows 11, PowerShell |
| Repository root | `C:\Users\ASUS\UniversalQR` |
| Node.js | v24.19.0 (reported) |
| npm | bundled with Node 24 |
| PostgreSQL | v18, installed locally as a Windows service (confirmed running) |
| Prisma Client | v5.22.0 (generated) |
| Docker | **Not available** — Docker Desktop/CLI is absent; use local PostgreSQL only |
| IDE | VS Code |

### Database

- Local PostgreSQL service (Windows), confirmed reachable at `localhost:5432`.
- Database name: `universalqr` (exact name as configured in `.env`).
- Managed via pgAdmin.
- **Do not reset, drop, or re-migrate the database without explicit approval.**
- The initial migration (`20261020193906_init`) has already been applied.

### Environment files

| File | Purpose |
|---|---|
| `apps/backend/.env` | Real secrets — never print or commit |
| `apps/backend/.env.example` | Template showing required variable names |

Required variables (from `.env.example`):
```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
BACKEND_PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=7d
```

---

## Current Project State

### What has been created

```
C:\Users\ASUS\UniversalQR\
├── apps/
│   ├── backend/              NestJS 10 API
│   │   ├── src/
│   │   │   ├── main.ts                    ✅ Bootstrap: port, CORS, helmet, Swagger, ValidationPipe
│   │   │   ├── app.module.ts              ✅ Root module (ConfigModule, PrismaModule, TerminusModule, HealthModule)
│   │   │   ├── app.service.ts             ✅ Returns root API info using shared-config constants
│   │   │   ├── app.controller.ts          ✅ GET / → AppService.getRoot()
│   │   │   ├── config/env.validation.ts   ✅ class-validator env schema
│   │   │   ├── health/                    ✅ GET /health endpoint (Terminus)
│   │   │   ├── prisma/                    ✅ PrismaModule + PrismaService
│   │   │   └── common/filters/            ✅ HttpExceptionFilter
│   │   ├── prisma/
│   │   │   ├── schema.prisma              ✅ Full schema (User, Workspace, QRCode, Campaign, ScanEvent)
│   │   │   └── migrations/20261020193906_init/  ✅ Applied to local DB
│   │   ├── dist/main.js                   ✅ Compiled (nest build ran successfully)
│   │   ├── tsconfig.json                  ✅ Fixed: rootDir="./src", paths → dist/
│   │   ├── nest-cli.json                  ✅ No webpack flag
│   │   └── package.json                   ✅ predev/prebuild hooks added
│   └── frontend/             Next.js 14 (App Router)
│       └── src/
│           ├── app/page.tsx               ✅ Public homepage (assembles section components)
│           ├── app/layout.tsx             ✅ Root layout
│           ├── components/home/           ✅ HeroSection, FeaturesSection, UseCasesSection,
│           │                                 StaticVsDynamicSection, AnalyticsPreview, CTASection
│           ├── components/layout/         ✅ Navbar, Footer
│           └── components/ui/button.tsx   ✅ shadcn/ui Button
├── packages/
│   ├── shared-types/src/index.ts          ✅ TypeScript interfaces (QRCode, User, Workspace, etc.)
│   └── shared-config/src/index.ts         ✅ Constants (APP_NAME, QR_CONFIG, API_ROUTES, FEATURES)
├── docs/                                  ✅ 5 documentation files
├── package.json (root)                    ✅ npm workspaces, build:packages, dev, build scripts
├── docker-compose.yml                     ✅ Postgres config (not used — local PG instead)
└── SESSION_HANDOFF.md                     ✅ This file
```

### What has been configured and verified

- ✅ npm workspaces monorepo structure
- ✅ Prisma schema validated (`npx prisma validate` passed)
- ✅ Initial migration applied to local database (`20261020193906_init`)
- ✅ Prisma Client generated (v5.22.0)
- ✅ `nest build` ran and produced `apps/backend/dist/main.js` (confirmed file exists)
- ✅ Backend `tsconfig.json` fixed — `rootDir: "./src"`, paths point to `dist/` not `src/`
- ✅ `predev`/`prebuild` hooks added to `apps/backend/package.json` — shared packages compile automatically

### What has NOT yet been verified

- ⚠️ **Backend dev server not confirmed running** — `nest start --watch` has not been observed successfully completing startup after the tsconfig fix
- ⚠️ `GET /health` endpoint not confirmed reachable in this session
- ⚠️ `GET /api/docs` Swagger UI not confirmed reachable
- ⚠️ Frontend dev server not confirmed running
- ⚠️ Frontend homepage not confirmed rendering in browser
- ⚠️ Shared packages (`dist/`) may not exist on disk yet if `npm run dev` or `npm run build:packages` has not been run since the `paths` fix

### Known issues and risks

| Issue | Severity | Notes |
|---|---|---|
| Shared package `dist/` may not exist | High | Run `npm run build:packages` from root before starting dev |
| `apps/backend/apps/` directory exists | Low | Likely a stale scaffold artifact; verify it is empty, then delete if so |
| DEP0190 deprecation warning (Node 24) | Low | Observed warning, not a confirmed failure; do not downgrade Node to silence it |
| Docker not available | Info | Use local PostgreSQL; ignore `npm run db:up` |

---

## Exact Next Steps

Run these in order from `C:\Users\ASUS\UniversalQR` (the monorepo root) using PowerShell unless noted otherwise.

1. **Build shared packages** (required before anything else can compile):
   ```powershell
   npm run build:packages
   ```
   Expected: Two TypeScript compilations succeed, `packages/shared-types/dist/` and `packages/shared-config/dist/` are created.

2. **Clean the backend dist** (removes any stale output from before the tsconfig fix):
   ```powershell
   Remove-Item -Recurse -Force apps\backend\dist -ErrorAction SilentlyContinue
   ```

3. **Start the backend** (from the monorepo root):
   ```powershell
   npm run dev --workspace=apps/backend
   ```
   Or from inside `apps/backend`:
   ```powershell
   npm run dev
   ```
   The `predev` hook will rebuild shared packages first. Expected output:
   ```
   [HH:MM:SS] Starting compilation in watch mode...
   [HH:MM:SS] Found 0 errors. Watching for file changes.
   [Nest] LOG [NestFactory] Starting Nest application...
   [Nest] LOG UniversalQR API running on http://localhost:3001
   ```

4. **Verify the backend** (in a second terminal):
   ```powershell
   Invoke-WebRequest http://localhost:3001/health
   ```
   Expected: JSON with `{ "status": "ok" }` or similar.
   
   Also open: `http://localhost:3001/api/docs` — Swagger UI should load.

5. **Start the frontend** (in a third terminal, from the monorepo root):
   ```powershell
   npm run dev --workspace=apps/frontend
   ```
   Expected: Next.js compiles and reports `ready on http://localhost:3000`.

6. **Verify the frontend**:
   Open `http://localhost:3000` in a browser. The public homepage with Navbar, Hero, Features, Use Cases, Static vs Dynamic, Analytics Preview, CTA, and Footer sections should render.

7. **Run checks**:
   ```powershell
   npm run type-check
   npm run lint
   ```

8. **Check `apps/backend/apps/`** — if this directory exists and is empty (likely a scaffold artifact), delete it:
   ```powershell
   Remove-Item -Recurse -Force apps\backend\apps -ErrorAction SilentlyContinue
   ```

9. **After both servers are confirmed running**: Update this file and proceed to Phase 1 (Authentication & Workspaces). See `docs/IMPLEMENTATION_PLAN.md` for the task list.

---

## Development Commands Reference

All commands run from the monorepo root (`C:\Users\ASUS\UniversalQR`) unless stated:

| Command | Purpose |
|---|---|
| `npm run build:packages` | Compile shared-types and shared-config to dist/ |
| `npm run dev` | Build packages, then start frontend + backend concurrently |
| `npm run dev --workspace=apps/backend` | Start backend only (with predev hook) |
| `npm run dev --workspace=apps/frontend` | Start frontend only |
| `npm run build` | Full production build (packages → frontend → backend) |
| `npm run type-check` | TypeScript checks across all workspaces |
| `npm run lint` | ESLint across all workspaces |
| `npm run test` | Jest tests across all workspaces |
| `npm run db:migrate` | Run pending Prisma migrations (local PG must be running) |
| `npm run db:studio` | Open Prisma Studio |

**Do not run `npm run db:up`** — it requires Docker, which is not available.

---

## Important Working Rules

- The product is **free**. No paid plans, subscriptions, billing, or payment integration.
- Inspect source files before modifying them.
- Make small, targeted changes; verify each one before moving on.
- Do not reset the database or delete migrations without explicit approval.
- Do not commit `.env` files or print secrets.
- Do not mark a feature complete when only its UI exists — backend must persist and serve real data.
- Do not change dependency versions to silence warnings.
- Ask before making major architectural decisions.
- Update this file at the end of each work session.

---

*Last updated: 2026-10-21. Next session should start at Step 1 above.*
