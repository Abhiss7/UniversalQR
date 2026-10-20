# UniversalQR — Architecture

---

## 1. Repository Layout

```
universalqr/                     # npm workspaces monorepo
├── apps/
│   ├── frontend/                # Next.js 14 (App Router) — public site + dashboard
│   └── backend/                 # NestJS 10 — REST API + QR redirect
├── packages/
│   ├── shared-types/            # TypeScript interfaces shared by frontend + backend
│   └── shared-config/           # Constants, feature flags, route names
├── docs/                        # Design documents (this file is one of them)
├── scripts/                     # DB init SQL, helper scripts
├── docker-compose.yml           # Local Postgres
└── package.json                 # Workspace root
```

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | Next.js (App Router) | 14.x |
| Frontend UI library | React | 18.x |
| Frontend language | TypeScript | 5.x |
| Frontend styling | Tailwind CSS | 3.x |
| Frontend components | shadcn/ui (Radix UI) | latest |
| Backend framework | NestJS | 10.x |
| Backend language | TypeScript | 5.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL | 16.x |
| API style | REST (JSON) |  |
| API documentation | Swagger / OpenAPI 3 |  |
| Local container | Docker Compose |  |

---

## 3. System Diagram

```
Browser / Mobile Scanner
        │
        ├─── HTTPS ───► Next.js (port 3000)
        │                  │  App Router pages & components
        │                  │  Static assets (CDN in prod)
        │                  │
        │                  └── fetch() ──► NestJS API (port 3001)
        │                                      │
        │                                      ├── /api/v1/** — REST API
        │                                      ├── /health     — health check
        │                                      ├── /api/docs   — Swagger UI
        │                                      └── /s/:code    — QR redirect
        │                                              │
        │                                              └── PostgreSQL (port 5432)
        │
        └─── /s/:code ──► NestJS ──► 302 redirect to target URL
```

---

## 4. Module Structure (Backend)

```
src/
├── main.ts                      # Bootstrap: Swagger, pipes, helmet, CORS
├── app.module.ts                # Root module
├── config/
│   └── env.validation.ts        # class-validator env schema
├── prisma/
│   ├── prisma.module.ts         # Global Prisma provider
│   └── prisma.service.ts        # PrismaClient wrapper
├── health/
│   ├── health.module.ts
│   └── health.controller.ts     # GET /health, GET /health/ping
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── guards/                  # (Phase 1) JWT auth guard
│   ├── decorators/              # (Phase 1) CurrentUser, Workspace
│   └── interceptors/            # (Phase 1) Logging, response transform
├── auth/                        # (Phase 1) Register, login, refresh, me
├── workspaces/                  # (Phase 1) CRUD + member management
├── qr-codes/                    # (Phase 2) Generation, update, export
├── scan/                        # (Phase 2) Redirect + scan event ingestion
├── campaigns/                   # (Phase 2) Campaign CRUD
└── analytics/                   # (Phase 2) Aggregation queries
```

---

## 5. Frontend Structure (App Router)

```
src/
├── app/
│   ├── layout.tsx               # Root layout — font, metadata, global CSS
│   ├── page.tsx                 # Public homepage
│   ├── (auth)/                  # (Phase 1) Login, register, forgot-password
│   ├── (dashboard)/             # (Phase 1+) Authenticated dashboard
│   │   ├── layout.tsx           # Sidebar + top nav
│   │   ├── qr-codes/            # QR code list + create/edit
│   │   ├── campaigns/           # Campaign management
│   │   └── analytics/           # Analytics views
│   └── s/[code]/                # (Phase 2) Server-side QR redirect (or via backend)
├── components/
│   ├── ui/                      # shadcn/ui base components (Button, Badge, …)
│   ├── layout/                  # Navbar, Footer, Sidebar
│   └── home/                    # Homepage-specific sections
├── lib/
│   ├── utils.ts                 # cn() and shared helpers
│   └── api.ts                   # (Phase 1) API client wrapper
└── hooks/                       # (Phase 1+) useAuth, useWorkspace, …
```

---

## 6. Data Flow — QR Scan Redirect

1. User scans a dynamic QR code → browser follows the short URL `https://uqr.app/s/abc123`.
2. NestJS `ScanController` receives `GET /s/abc123`.
3. Controller looks up `QRCode` by `destination = 'abc123'` (indexed).
4. If active, inserts a `ScanEvent` row (async, fire-and-forget).
5. Controller responds `302 Found` → `targetUrl`.
6. User lands on the destination. Total latency target: < 50 ms p99.

---

## 7. Security

- All API routes (except `/health`, `/s/:code`, and `/auth/*`) require a valid JWT.
- Workspaces enforced at the service layer — every query includes `workspaceId` from the authenticated token.
- `helmet()` sets secure headers.
- CORS restricted to the configured frontend origin(s).
- `class-validator` + `ValidationPipe` with `whitelist: true` strips unknown fields.
- Passwords hashed with bcrypt (cost factor 12) — not yet implemented, planned for Phase 1.
- Refresh tokens stored hashed in the database; invalidated on logout.

---

## 8. Environment Configuration

All secrets and runtime values come from environment variables validated with `class-validator` on startup. See `.env.example` at the repo root and `apps/backend/.env.example` for required variables. Never commit `.env` files.
