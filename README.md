# UniversalQR

> **Free, multi-purpose dynamic QR code platform for businesses of every type.**

Restaurants, retail stores, clothing brands, hotels, events, agencies, and individuals — one platform, zero subscriptions.

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Docker Desktop (for local PostgreSQL)
- Git

### 1. Clone and install

```bash
git clone <repo-url> universalqr
cd universalqr
npm install
```

### 2. Configure environment

```bash
# Copy the root env template
cp .env.example .env

# Copy the backend env template
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env` and set `DATABASE_URL` (defaults work with Docker Compose).

### 3. Start the database

```bash
npm run db:up
```

Wait ~5 seconds for PostgreSQL to be ready, then apply the schema:

```bash
npm run db:migrate
# or, to just push without creating migration files:
cd apps/backend && npx prisma db push && cd ../..
```

### 4. Start the apps

```bash
npm run dev
```

| App | URL |
|---|---|
| Frontend (Next.js) | http://localhost:3000 |
| Backend (NestJS) | http://localhost:3001 |
| API health | http://localhost:3001/health/ping |
| Swagger / OpenAPI | http://localhost:3001/api/docs |
| Prisma Studio | `npm run db:studio` → http://localhost:5555 |

---

## Project Structure

```
universalqr/
├── apps/
│   ├── frontend/     # Next.js 14 — public site + dashboard
│   └── backend/      # NestJS 10 — REST API
├── packages/
│   ├── shared-types/ # TypeScript types shared by both apps
│   └── shared-config/# Constants and feature flags
├── docs/             # Architecture, database design, implementation plan, test plan
└── docker-compose.yml
```

## Useful Commands

```bash
npm run build          # Build all apps and packages
npm run lint           # Lint all workspaces
npm run type-check     # Type check all workspaces
npm run test           # Run all tests
npm run db:up          # Start local PostgreSQL via Docker
npm run db:down        # Stop PostgreSQL
npm run db:migrate     # Run Prisma migrations
npm run db:studio      # Open Prisma Studio
```

---

## Documentation

| Document | Path |
|---|---|
| Product specification | docs/PRODUCT_SPEC.md |
| Architecture | docs/ARCHITECTURE.md |
| Database design | docs/DATABASE_DESIGN.md |
| Implementation plan | docs/IMPLEMENTATION_PLAN.md |
| Test plan | docs/TEST_PLAN.md |

---

## Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** NestJS 10, TypeScript, Prisma ORM, PostgreSQL 16
- **Monorepo:** npm workspaces

## License

MIT — free to use, modify, and self-host.
