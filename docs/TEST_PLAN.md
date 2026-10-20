# UniversalQR — Test Plan

---

## 1. Testing Philosophy

- Unit tests for pure logic (service methods, utilities, validators).
- Integration tests for database interactions (using an isolated test database).
- E2E tests for HTTP API contracts (NestJS testing module + supertest).
- Component tests for UI (Vitest + React Testing Library — Phase 1).
- Type checking (`tsc --noEmit`) enforced in CI.

---

## 2. Backend Test Structure

```
apps/backend/src/
├── health/
│   └── health.controller.spec.ts    # Unit: GET /health, GET /health/ping
├── prisma/
│   └── prisma.service.spec.ts       # Unit: connection + cleanDatabase guard
├── auth/                            # (Phase 1)
│   ├── auth.service.spec.ts         # Unit: register, login, token logic
│   └── auth.controller.e2e-spec.ts  # E2E: POST /auth/register, /login, /me
├── workspaces/                      # (Phase 1)
│   └── workspaces.e2e-spec.ts
└── qr-codes/                        # (Phase 2)
    ├── qr.service.spec.ts
    └── qr.e2e-spec.ts
```

---

## 3. Phase 0 Test Cases

### 3.1 Health Endpoint

| Test ID | Description | Method | URL | Expected |
|---|---|---|---|---|
| H01 | Ping returns 200 | GET | /health/ping | `{status:"ok"}` |
| H02 | Full health with DB | GET | /health | `{status:"ok", info:{database:{status:"up"}}}` |
| H03 | Health when DB down | GET | /health | 503 with degraded status |

### 3.2 Root Endpoint

| Test ID | Description | Method | URL | Expected |
|---|---|---|---|---|
| R01 | Root returns service info | GET | / | `{name:"UniversalQR", docs:"/api/docs"}` |

### 3.3 Environment Validation

| Test ID | Description | Expected |
|---|---|---|
| E01 | Missing DATABASE_URL | Bootstrap throws on startup |
| E02 | Invalid BACKEND_PORT | Bootstrap throws on startup |

---

## 4. Phase 1 Test Cases (planned)

### 4.1 Authentication

| Test ID | Description | Method | URL | Expected |
|---|---|---|---|---|
| A01 | Register with valid data | POST | /api/v1/auth/register | 201, user + workspace created |
| A02 | Register with duplicate email | POST | /api/v1/auth/register | 409 Conflict |
| A03 | Register with invalid email | POST | /api/v1/auth/register | 400 Bad Request |
| A04 | Login with correct credentials | POST | /api/v1/auth/login | 200, access + refresh tokens |
| A05 | Login with wrong password | POST | /api/v1/auth/login | 401 Unauthorized |
| A06 | Get /me with valid token | GET | /api/v1/auth/me | 200, user object |
| A07 | Get /me without token | GET | /api/v1/auth/me | 401 Unauthorized |
| A08 | Refresh token rotation | POST | /api/v1/auth/refresh | 200, new access token |
| A09 | Logout invalidates refresh | POST | /api/v1/auth/logout | 200, token unusable |

### 4.2 Workspace Isolation

| Test ID | Description | Expected |
|---|---|---|
| W01 | User A cannot read Workspace B's QR codes | 403 Forbidden |
| W02 | Workspace member with VIEWER role cannot create QR | 403 Forbidden |

---

## 5. Phase 2 Test Cases (planned)

### 5.1 QR Code Creation

| Test ID | Description | Expected |
|---|---|---|
| Q01 | Create static URL QR | 201, PNG generated and stored |
| Q02 | Create dynamic QR | 201, short code assigned, target_url set |
| Q03 | Update dynamic destination | 200, new targetUrl saved |
| Q04 | Scan redirect (dynamic) | 302 to targetUrl, ScanEvent created |
| Q05 | Scan inactive QR | 404 or 410 |

---

## 6. Running Tests

```bash
# Backend unit + integration tests
cd apps/backend
npm test

# Backend test with coverage
npm run test:cov

# Frontend type check
cd apps/frontend
npm run type-check

# Root workspace: lint + type-check all
cd ../..
npm run lint
npm run type-check
```

---

## 7. CI Checks (Phase 5)

All of the following must pass on every pull request:

1. `npm run type-check --workspaces`
2. `npm run lint --workspaces`
3. `npm run test --workspace=apps/backend`
4. `npm run build --workspaces`
5. Database migration dry-run (`prisma migrate diff`)
