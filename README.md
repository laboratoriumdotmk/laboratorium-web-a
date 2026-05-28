# Laboratorium — laboratorium.mk

Bilingual (Macedonian + English) website for Laboratorium, a free cultural-educational center in Skopje. Built with Payload CMS 3.x, Next.js 15, PostgreSQL, and Tailwind CSS.

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- pnpm 9+
- PostgreSQL 15+ (or Docker)

### 1. Start PostgreSQL

```bash
docker run -d --name laboratorium-db \
  -e POSTGRES_USER=laboratorium \
  -e POSTGRES_PASSWORD=laboratorium \
  -e POSTGRES_DB=laboratorium \
  -p 5434:5432 \
  postgres:16-alpine
```

### 2. Install and configure

```bash
pnpm install
cp .env.example .env
# Edit .env with your DATABASE_URI and PAYLOAD_SECRET
```

### 3. Seed content

```bash
pnpm seed
```

Creates: admin user (`admin@laboratorium.mk` / `laboratorium2024`), site settings, navigation, all spaces, sample events, projects, makers, and a news post.

### 4. Start dev server

```bash
pnpm dev
```

- **Site:** http://localhost:3100
- **Admin:** http://localhost:3100/admin

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | JWT encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public URL (e.g. `http://localhost:3100`) |
| `S3_ENDPOINT` | No | Cloudflare R2 / S3 endpoint |
| `S3_BUCKET` | No | S3 bucket name |
| `S3_ACCESS_KEY_ID` | No | S3 access key |
| `S3_SECRET_ACCESS_KEY` | No | S3 secret key |
| `S3_REGION` | No | S3 region (default: `auto`) |
| `RESEND_API_KEY` | No | Resend email API key |
| `CONTACT_EMAIL` | No | Contact form notification recipient |

If S3 vars are empty, media uploads go to local disk (`public/media/`).

## Deployment

### Railway (recommended)

1. Push to GitHub
2. Create a Railway project, add a PostgreSQL service
3. Add a service from your repo, set env vars
4. Deploy

### Docker / Coolify / VPS

```bash
docker compose up -d
```

This runs the app + PostgreSQL. Put Cloudflare in front for DNS/TLS/CDN.

## Content Management Guide

### Logging in
Go to `your-domain.com/admin` and sign in with your credentials.

### Adding an Event
1. Click **Events** in the sidebar
2. Click **Create New**
3. Fill in: title, type (workshop/concert/etc.), start date, space, summary
4. Add a featured image and partners if applicable
5. Click **Publish** when ready

### Adding a Maker (Lab Design Market)
1. Click **Makers** in the sidebar
2. Click **Create New**
3. Fill in: name, craft, bio, photo, social links
4. Click **Publish**

### Editing Pages (About, Get Involved)
1. Click **Pages** in the sidebar
2. Select the page to edit
3. Use the block-based editor: add Rich Text, Images, Galleries, CTAs, Pillars, or Badges blocks
4. Save and publish

### Uploading Photos
1. Click **Media** in the sidebar
2. Click **Create New**, drag/drop your image
3. Add alt text (required for accessibility)
4. The image is now available in any image field

### Switching Language
Content fields marked with a globe icon support both Macedonian and English. Use the locale selector in the admin panel to switch between languages when editing.

## Tech Stack

- **Payload CMS 3.x** (Next.js-native)
- **Next.js 15** (App Router, ISR)
- **PostgreSQL 16** via Drizzle
- **Tailwind CSS 4**
- **Framer Motion**
- **TypeScript** (strict)

## Remaining TODOs

- [ ] Replace placeholder images with real photography
- [ ] Native English copy review (currently draft-translated from MK)
- [ ] Verify exact opening hours
- [ ] Connect ticketing/RSVP system
- [ ] Future: e-commerce shop for Lab Design Market
- [ ] Google Maps embed with correct coordinates
- [ ] Branded OG image template
