# UniversalQR — Database Design

PostgreSQL 16 · Prisma ORM · Schema: `public`

---

## 1. Entity–Relationship Overview

```
User ────< WorkspaceMember >──── Workspace ────< QRCode ────< ScanEvent
                                     │
                                     └────< Campaign >──── QRCode
```

---

## 2. Tables

### `users`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | `uuid-ossp` default |
| email | TEXT UNIQUE | lowercase, validated |
| password_hash | TEXT | bcrypt, cost 12 |
| name | TEXT |  |
| avatar_url | TEXT? |  |
| is_verified | BOOLEAN | Phase 2: email verification |
| created_at | TIMESTAMPTZ | server default NOW() |
| updated_at | TIMESTAMPTZ | Prisma `@updatedAt` |

### `user_sessions`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| user_id | UUID FK → users.id | CASCADE delete |
| refresh_token | TEXT UNIQUE | stored hashed |
| expires_at | TIMESTAMPTZ |  |
| created_at | TIMESTAMPTZ |  |

### `workspaces`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| name | TEXT |  |
| slug | TEXT UNIQUE | URL-safe, e.g. `my-cafe` |
| logo_url | TEXT? |  |
| primary_color | TEXT? | hex, e.g. `#6366f1` |
| created_at | TIMESTAMPTZ |  |
| updated_at | TIMESTAMPTZ |  |

### `workspace_members`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| workspace_id | UUID FK → workspaces.id | CASCADE |
| user_id | UUID FK → users.id | CASCADE |
| role | ENUM(OWNER,ADMIN,EDITOR,VIEWER) |  |
| joined_at | TIMESTAMPTZ |  |

Unique constraint: `(workspace_id, user_id)`.

### `qr_codes`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| workspace_id | UUID FK → workspaces.id | CASCADE |
| campaign_id | UUID FK? → campaigns.id | nullable |
| name | TEXT |  |
| description | TEXT? |  |
| kind | ENUM(STATIC, DYNAMIC) |  |
| type | ENUM(URL, TEXT, EMAIL, PHONE, SMS, WIFI, VCARD, PDF, SOCIAL, LANDING_PAGE) |  |
| destination | TEXT | For static: encoded content. For dynamic: short code (e.g. `abc123`) |
| target_url | TEXT? | For dynamic: current redirect destination |
| style | JSONB | `{foregroundColor, backgroundColor, errorCorrectionLevel, margin, logoUrl?, ...}` |
| image_url | TEXT? | Path to stored PNG/SVG |
| scan_count | INT | Denormalised counter, incremented on scan |
| is_active | BOOLEAN |  |
| created_at | TIMESTAMPTZ |  |
| updated_at | TIMESTAMPTZ |  |

Indexes: `workspace_id`, `destination` (for redirect lookup).

### `campaigns`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| workspace_id | UUID FK → workspaces.id | CASCADE |
| name | TEXT |  |
| description | TEXT? |  |
| starts_at | TIMESTAMPTZ? |  |
| ends_at | TIMESTAMPTZ? |  |
| created_at | TIMESTAMPTZ |  |
| updated_at | TIMESTAMPTZ |  |

### `scan_events`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK |  |
| qr_code_id | UUID FK → qr_codes.id | CASCADE |
| scanned_at | TIMESTAMPTZ | server default NOW() |
| ip_address | TEXT? | Used for geo; not stored in prod |
| user_agent | TEXT? |  |
| country | TEXT? | Populated by async enrichment |
| city | TEXT? |  |
| device | TEXT? | mobile / desktop / tablet |
| browser | TEXT? |  |
| os | TEXT? |  |
| referrer | TEXT? |  |

Indexes: `qr_code_id`, `scanned_at`.

---

## 3. Design Decisions

**UUID primary keys** — avoids sequential ID guessing, works across shards if needed in future.

**Denormalised `scan_count` on `qr_codes`** — counting millions of `scan_events` rows per request is slow. An incremented counter gives O(1) display without a `COUNT(*)`. Both are kept in sync via a transaction on the redirect path.

**JSONB `style` column** — QR style options will evolve over time. Using JSONB avoids frequent migrations while still allowing `style->'foregroundColor'` queries.

**`destination` vs `target_url`** — `destination` is the permanent, printed value (the short code for dynamic, or the encoded content for static). `target_url` is the mutable redirect target for dynamic codes only.

**Workspace isolation** — no shared tables cross workspace boundaries at the application layer. Every query in the service layer receives `workspaceId` from the JWT and applies it as a filter.

---

## 4. Migrations

Managed by Prisma Migrate.

```bash
# Apply all pending migrations (dev)
npm run db:migrate --workspace=apps/backend

# Push schema without creating migration file (prototype only)
cd apps/backend && npx prisma db push
```

Migration files live in `apps/backend/prisma/migrations/` and are committed to version control.
