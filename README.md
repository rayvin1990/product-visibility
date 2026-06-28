# Product Visibility Checklist

A clean landing page for collecting product URLs from micro-SaaS and AI tool founders.

## What It Does

- Explains the launch visibility check offer.
- Submits product visibility requests through a small API route.
- Sends an SMTP notification when email environment variables are configured.
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

## Security Notes

This repository intentionally does not include:

- `.env` files
- auth files
- tokens
- private keys
- the original SaaSFly project history
