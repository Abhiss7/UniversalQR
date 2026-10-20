# UniversalQR — Product Specification

> **Free, multi-purpose dynamic QR code platform for businesses of every type.**

---

## 1. Vision

UniversalQR is a single platform that lets restaurants, retail stores, clothing brands, hotels, events, agencies, and individuals create, manage, and track QR codes — without ever paying a subscription or hitting an artificial limit.

The product replaces expensive or feature-limited SaaS tools with a fully open, self-hostable, and customisable alternative that covers the entire QR code workflow from creation to analytics.

---

## 2. Pricing Policy

- **Free forever.** No paid plans, no subscription tiers, no payment gateways, no billing module.
- All features are available to all users.
- The architecture supports adding commercial features in the future without breaking the free foundation.

---

## 3. Target Personas

| Persona | Primary Need | Key QR Use |
|---|---|---|
| Restaurant owner | Live digital menu without reprinting | Dynamic URL → menu page |
| Retail manager | Product info + promotions | Dynamic URL → product page |
| Event organiser | Schedule, map, updates | Dynamic URL → event page |
| Hotel concierge | Room guide, services | Static + dynamic mix |
| Agency / freelancer | Multi-client QR management | Workspaces + campaigns |
| Individual / freelancer | Digital business card | vCard QR + social links hub |

---

## 4. Core Features

### 4.1 QR Code Generation

- **Static QR**: encodes content (URL, text, WiFi, vCard, SMS, phone, email) directly. No redirect, no analytics.
- **Dynamic QR**: encodes a short permanent URL. Destination is editable from the dashboard at any time without reprinting.
- Content types: URL, plain text, email, phone, SMS, WiFi credentials, vCard (contact), PDF download, social links hub, custom landing page.
- Export: PNG (any resolution) and SVG (vector, print-ready).

### 4.2 QR Styling

- Foreground and background colour pickers.
- Optional embedded logo (upload, resize, position).
- Dot styles: square, rounded, dots.
- Corner finder styles.
- Error correction level: L / M / Q / H.
- Live preview.

### 4.3 Dynamic Destination Management

- Change the target URL/page of a dynamic QR at any time.
- Redirect happens server-side at `/s/:code`.
- Redirect history is preserved for audit purposes.

### 4.4 Landing Pages

- Reusable templates: menu, product, event, hotel, vCard, social hub, PDF viewer, redirect.
- Block-based editor (future): text, image, button, divider, map, social links.
- Each landing page is hosted at a public URL and served by the backend.

### 4.5 Scan Analytics

Tracked per scan event:
- Timestamp.
- IP address (never stored in plain text; used for geo lookup only).
- Country and city (from IP).
- Device type (mobile / desktop / tablet).
- Browser and OS (from User-Agent).
- Referrer.

Aggregations available in the dashboard:
- Scans by day / week / month.
- Top countries.
- Top devices and browsers.
- QR-level and campaign-level totals.

### 4.6 Workspaces (Multi-tenant)

- Each user can belong to one or more workspaces.
- Workspace data is fully isolated at the database level.
- Roles: owner, admin, editor, viewer.
- Workspace-level branding: name, logo, primary colour.

### 4.7 Campaigns

- Group QR codes into campaigns.
- Optional start and end dates.
- Campaign-level aggregate scan count.
- Campaign-level analytics view.

### 4.8 Authentication

- Email + password registration and login.
- JWT-based access tokens (short-lived) with refresh tokens (long-lived, stored server-side).
- Email verification (Phase 2).
- Password reset via email (Phase 2).

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load (homepage) | < 2 s LCP |
| API response (QR list) | < 200 ms p95 |
| Redirect latency (/s/:code) | < 50 ms p99 |
| Availability | 99.5% |
| Data isolation | Workspace-level row-level filtering on all queries |
| Input validation | Server-side on all endpoints (class-validator) |
| Authentication | JWT with HttpOnly refresh cookie or bearer token |

---

## 6. Out of Scope (Phase 0 / Phase 1)

- Payment gateways, subscription billing, plan limits.
- Email sending (Phase 2).
- OAuth / social login (Phase 2).
- AI-generated QR content suggestions (future).
- White-label SaaS / reseller mode (future).
- Native mobile apps (future).
