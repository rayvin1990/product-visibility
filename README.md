# Product Visibility Checklist

Product Visibility Checklist is a manual AI visibility snapshot for B2B SaaS, AI tools, DTC brands, and marketing teams. It checks whether AI answers understand, cite, and recommend a product, which competitors appear instead, and what source gaps should be repaired first.

**Live:** https://product-visibility.vercel.app/
**Guide:** https://product-visibility.vercel.app/blog/product-visibility-vs-seo-vs-geo

---

A clean landing page for collecting product URLs from teams that need AI recommendation, citation, and competitor visibility checks.

## What It Does

- Explains the AI visibility snapshot offer.
- Submits product visibility requests through a small API route.
- Tracks first-party page, CTA, form, and fallback events through `/api/visibility-event`.
- Sends an SMTP notification when email environment variables are configured.
- Sends leads and events to a configurable webhook when `VISIBILITY_DATA_WEBHOOK_URL` is configured.
- Exposes a token-protected read API for recent JSONL backup records when `VISIBILITY_ADMIN_TOKEN` is configured.
- Writes a JSONL backup locally or to `/tmp` on Vercel.
- Keeps email, Gmail, and copy fallbacks.
- Includes basic SEO/GEO structured data.

## Local Development

```bash
npm install
npm run dev
```

## Vercel Environment Variables

Minimum public fallback email:

```text
NEXT_PUBLIC_SUPPORT_EMAIL=your-email@example.com
```

This value is public in the frontend. Use a dedicated intake email when possible.

Optional SMTP notification variables:

```text
VISIBILITY_NOTIFY_TO=your-email@example.com
VISIBILITY_SMTP_HOST=smtp.example.com
VISIBILITY_SMTP_PORT=587
VISIBILITY_SMTP_USER=your-email@example.com
VISIBILITY_SMTP_PASS=app-password
VISIBILITY_NOTIFY_FROM=your-email@example.com
```

The API route also accepts common fallback names: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD`.

Optional durable data webhook:

```text
VISIBILITY_DATA_WEBHOOK_URL=https://example.com/webhook/product-visibility
VISIBILITY_DATA_WEBHOOK_SECRET=shared-secret
VISIBILITY_ADMIN_TOKEN=change-this-long-random-value
```

When configured, both lead records and anonymous behavior events are posted to the webhook as JSON. This is the simplest way to persist data into Google Sheets, Make, n8n, Zapier, Baserow, or a custom endpoint without adding a database dependency.

Local JSONL paths:

```text
VISIBILITY_LEADS_PATH=tmp/visibility-leads.jsonl
VISIBILITY_EVENTS_PATH=tmp/visibility-events.jsonl
```

On Vercel, JSONL backups default to `/tmp`, which is useful for function logs and debugging but not durable. Use `VISIBILITY_DATA_WEBHOOK_URL` for real operational data.

To inspect the recent JSONL backup records, configure `VISIBILITY_ADMIN_TOKEN` and request:

```bash
curl \
  -H "x-visibility-admin-token: $VISIBILITY_ADMIN_TOKEN" \
  "https://product-visibility.vercel.app/api/visibility-data?limit=25"
```

This endpoint is for quick diagnostics. Do not treat Vercel `/tmp` as the source of truth.

## Data Records

Lead webhook records use:

```json
{
  "type": "visibility_lead",
  "productUrl": "https://example.com",
  "category": "B2B analytics tool",
  "offerTier": "$199 readiness audit",
  "email": "buyer@example.com"
}
```

Event webhook records use:

```json
{
  "type": "visibility_event",
  "eventName": "lead_form_submit_attempt",
  "path": "/",
  "properties": {
    "offerTier": "$199 readiness audit"
  }
}
```

## Security Notes

This repository intentionally does not include:

- `.env` files
- auth files
- tokens
- private keys
- the original SaaSFly project history
