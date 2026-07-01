import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type VisibilityRequestPayload = {
  productName?: unknown;
  productUrl?: unknown;
  category?: unknown;
  email?: unknown;
  notes?: unknown;
  website?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimits = new Map<string, RateLimitEntry>();

function text(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }

  return "";
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `${ip}:${userAgent}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt < now) {
    rateLimits.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function parseProductUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function saveLead(lead: Record<string, unknown>) {
  const fallbackDir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "tmp");
  const filePath = getEnv("VISIBILITY_LEADS_PATH", "PRODUCT_VISIBILITY_LEADS_PATH") || path.join(fallbackDir, "visibility-leads.jsonl");

  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");

  return filePath;
}

async function sendNotification(lead: Record<string, string>) {
  const host = getEnv("VISIBILITY_SMTP_HOST", "SMTP_HOST");
  const user = getEnv("VISIBILITY_SMTP_USER", "SMTP_USER", "GMAIL_USER");
  const pass = getEnv("VISIBILITY_SMTP_PASS", "SMTP_PASS", "GMAIL_APP_PASSWORD");

  if (!host || !user || !pass) {
    return false;
  }

  const port = Number(getEnv("VISIBILITY_SMTP_PORT", "SMTP_PORT") || "587");
  const notifyTo = getEnv("VISIBILITY_NOTIFY_TO", "PRODUCT_VISIBILITY_NOTIFY_TO", "NEXT_PUBLIC_SUPPORT_EMAIL");
  const from = getEnv("VISIBILITY_NOTIFY_FROM", "PRODUCT_VISIBILITY_NOTIFY_FROM") || user;

  if (!notifyTo) {
    return false;
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  await transport.sendMail({
    to: notifyTo,
    from,
    replyTo: lead.email,
    subject: `Product visibility request: ${lead.productName || lead.productUrl}`,
    text: [
      "New product visibility request",
      "",
      `Product name: ${lead.productName || "(not provided)"}`,
      `Product URL: ${lead.productUrl}`,
      `Category / buyer: ${lead.category || "(not provided)"}`,
      `Contact email: ${lead.email}`,
      "",
      "Notes:",
      lead.notes || "(not provided)",
    ].join("\n"),
  });

  return true;
}

export async function POST(request: NextRequest) {
  let payload: VisibilityRequestPayload;

  try {
    payload = (await request.json()) as VisibilityRequestPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  if (text(payload.website)) {
    return NextResponse.json({ ok: true, message: "Thanks. I will review the product URL." });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const productUrl = parseProductUrl(text(payload.productUrl, 500));
  const email = text(payload.email, 320);

  if (!productUrl) {
    return NextResponse.json({ ok: false, message: "Please enter a valid product URL." }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    productName: text(payload.productName, 200),
    productUrl,
    category: text(payload.category, 300),
    email,
    notes: text(payload.notes, 2000),
    userAgent: request.headers.get("user-agent") || "",
    referrer: request.headers.get("referer") || "",
  };

  let localBackupSaved = false;
  let notificationSent = false;

  try {
    await saveLead(lead);
    localBackupSaved = true;
  } catch (error) {
    console.error("Failed to save visibility request", error);
  }

  try {
    notificationSent = await sendNotification(lead);
  } catch (error) {
    console.error("Failed to send visibility request notification", error);
  }

  if (process.env.VERCEL && !notificationSent) {
    return NextResponse.json(
      {
        ok: false,
        id: lead.id,
        localBackupSaved,
        notificationSent,
        message: "Direct submission is not fully configured yet. Please use the email or copy fallback.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: lead.id,
    localBackupSaved,
    notificationSent,
    message: notificationSent
      ? "Thanks. I received the request and will review your product URL."
      : "Thanks. I saved the request. Email notification is not configured yet.",
  });
}
