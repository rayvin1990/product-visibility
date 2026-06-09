# Product Visibility Checklist

A clean, pure-frontend landing page for collecting product URLs from micro-SaaS and AI tool founders.

## What It Does

- Explains the launch visibility check offer.
- Lets visitors open an email or Gmail draft with their product details.
- Provides a copy fallback if email links do not work.
- Includes basic SEO/GEO structured data.

## Local Development

```bash
npm install
npm run dev
```

## Vercel Environment Variable

Set this in Vercel:

```text
NEXT_PUBLIC_SUPPORT_EMAIL=your-email@example.com
```

This value is public in the frontend. Use a dedicated intake email when possible.

## Security Notes

This repository intentionally does not include:

- `.env` files
- auth files
- tokens
- private keys
- the original SaaSFly project history
