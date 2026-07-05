import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type VisibilityEventPayload = {
  eventName?: unknown;
  properties?: unknown;
  path?: unknown;
  referrer?: unknown;
};

function text(value: unknown, maxLength = 1000) {
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

function plainProperties(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, raw]) => [
      key.slice(0, 80),
      typeof raw === "string" ? raw.slice(0, 500) : raw,
    ]),
  );
}

async function saveEvent(event: Record<string, unknown>) {
  const fallbackDir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "tmp");
  const filePath = getEnv("VISIBILITY_EVENTS_PATH", "PRODUCT_VISIBILITY_EVENTS_PATH") || path.join(fallbackDir, "visibility-events.jsonl");

  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(event)}\n`, "utf8");
}

async function sendWebhook(record: Record<string, unknown>) {
  const url = getEnv("VISIBILITY_DATA_WEBHOOK_URL", "PRODUCT_VISIBILITY_DATA_WEBHOOK_URL");
  if (!url) {
    return false;
  }

  const secret = getEnv("VISIBILITY_DATA_WEBHOOK_SECRET", "PRODUCT_VISIBILITY_DATA_WEBHOOK_SECRET");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "x-visibility-secret": secret } : {}),
    },
    body: JSON.stringify(record),
  });

  return response.ok;
}

export async function POST(request: NextRequest) {
  let payload: VisibilityEventPayload;

  try {
    payload = (await request.json()) as VisibilityEventPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const eventName = text(payload.eventName, 120);
  if (!eventName) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const record = {
    type: "visibility_event",
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    eventName,
    path: text(payload.path, 500),
    referrer: text(payload.referrer, 1000),
    properties: plainProperties(payload.properties),
    userAgent: request.headers.get("user-agent") || "",
    requestReferrer: request.headers.get("referer") || "",
  };

  let localBackupSaved = false;
  let webhookSent = false;

  try {
    await saveEvent(record);
    localBackupSaved = true;
  } catch (error) {
    console.error("Failed to save visibility event", error);
  }

  try {
    webhookSent = await sendWebhook(record);
  } catch (error) {
    console.error("Failed to send visibility event webhook", error);
  }

  return NextResponse.json({ ok: true, localBackupSaved, webhookSent });
}
