# UniversalQR — Implementation Plan

Each phase produces working, tested, deployed functionality. No phase is "done" while any check is failing.

---

## Phase 0 — Foundation ✅ (current)

**Goal:** Empty directory → running frontend + backend + database.

| Task | Status |
|---|---|
| Inspect environment | ✅ |
| Create npm-workspaces monorepo | ✅ |
| Shared packages (types, config) | ✅ |
| NestJS backend scaffold | ✅ |
| Next.js frontend scaffold | ✅ |
| Docker Compose + PostgreSQL | ✅ |
| Prisma schema (initial) | ✅ |
| Public homepage (hero, features, use cases, static vs dynamic, analytics preview, CTA, footer) | ✅ |
| Backend health endpoint | ✅ |
| Swagger / OpenAPI setup | ✅ |
| Global exception filter | ✅ |
| Environment variable validation | ✅ |
| Documentation (this file + 4 others) | ✅ |

**Deliverables:**
- `npm run dev` starts both frontend (port 3000) and backend (port 3001).
- `docker compose up -d postgres` starts the database.
- `http://localhost:3000` shows the homepage.
- `http://localhost:3001/health` returns health status.
- `http://localhost:3001/api/docs` shows Swagger.

---

## Phase 1 — Authentication & Workspaces

**Goal:** Users can register, log in, create a workspace, and reach a dashboard.

| Task | Notes |
|---|---|
| `POST /auth/register` | Hash password (bcrypt 12), create user + workspace + member row |
| `POST /auth/login` | Return JWT access token + refresh token (HttpOnly cookie) |
| `POST /auth/refresh` | Rotate refresh token |
| `POST /auth/logout` | Invalidate refresh token |
| `GET /auth/me` | Return current user |
| `GET/POST /workspaces` | Create workspace, list user's workspaces |
| `POST /workspaces/:id/members` | Invite member by email |
| JWT auth guard + CurrentUser decorator |  |
| Workspace guard — enforce member role |  |
| Dashboard layout (sidebar, nav) |  |
| Login / register pages (Next.js) |  |
| Dashboard home page |  |

---

## Phase 2 — QR Code Engine

**Goal:** Users can generate, download, and manage QR codes.

| Task | Notes |
|---|---|
| `POST /qr-codes` | Create static or dynamic QR, store style, generate image |
| `GET /qr-codes` | List with pagination and filters |
| `GET /qr-codes/:id` | Single QR code detail |
| `PATCH /qr-codes/:id` | Update name, destination, style |
| `DELETE /qr-codes/:id` | Soft delete |
| `GET /qr-codes/:id/export?format=png|svg` | Download image |
| QR image generation (server-side, `qrcode` npm package) |  |
| PNG and SVG rendering |  |
| Dynamic QR redirect: `GET /s/:code` | 302, record scan event |
| QR code list UI |  |
| QR code create/edit form |  |
| QR code preview + download UI |  |

---

## Phase 3 — Landing Pages

**Goal:** Dynamic QR codes can point to hosted landing pages.

| Task | Notes |
|---|---|
| Landing page data model (blocks JSON) |  |
| `POST /landing-pages` | Create from template |
| `GET /p/:slug` | Public render (server-side, Next.js) |
| Templates: menu, event, product, vCard, social hub, PDF viewer |  |
| Landing page editor UI (block-based) |  |

---

## Phase 4 — Campaigns & Analytics

**Goal:** QR codes are grouped into campaigns; scan data is visualised.

| Task | Notes |
|---|---|
| `GET/POST /campaigns` | CRUD |
| `GET /analytics/qr-codes/:id` | Per-code analytics |
| `GET /analytics/workspaces/:id` | Workspace-level summary |
| Analytics dashboard page |  |
| Scan event enrichment (async, IP → geo) |  |
| Chart components (Recharts) |  |

---

## Phase 5 — Polish & Production Readiness

| Task | Notes |
|---|---|
| Email verification (Phase 2 auth extension) |  |
| Password reset flow |  |
| Rate limiting (API + redirect endpoint) |  |
| Structured logging (Winston / Pino) |  |
| Error monitoring (Sentry) |  |
| CI/CD pipeline (GitHub Actions) |  |
| Production Docker images |  |
| Deployment guide (Render / Railway / VPS) |  |
| Performance testing (k6) |  |
| Accessibility audit (axe-core) |  |

---

## Engineering Rules (all phases)

1. Every API endpoint has a corresponding E2E test before Phase is marked done.
2. No feature is marked complete when only a UI mock exists — the backend must persist and serve real data.
3. `npm run type-check` and `npm run lint` must pass with zero errors before any commit.
4. Migrations committed to version control; never run `db push` in production.
5. No secrets in code or committed `.env` files.
