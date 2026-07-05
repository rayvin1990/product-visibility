import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }

  return "";
}

function getDataPath(primary: string, legacy: string, fallbackName: string) {
  const fallbackDir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "tmp");
  return getEnv(primary, legacy) || path.join(fallbackDir, fallbackName);
}

async function readJsonl(filePath: string, limit: number) {
  try {
    const raw = await readFile(filePath, "utf8");
    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .map((line) => {
        try {
          return JSON.parse(line) as Record<string, unknown>;
        } catch {
          return { parseError: true, line };
        }
      });
  } catch {
    return [];
  }
}

function numberParam(value: string | null, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(1, Math.min(100, Math.floor(parsed)));
}

export async function GET(request: NextRequest) {
  const adminToken = getEnv("VISIBILITY_ADMIN_TOKEN", "PRODUCT_VISIBILITY_ADMIN_TOKEN");
  if (!adminToken) {
    return NextResponse.json({ ok: false, message: "Visibility data API is not configured." }, { status: 404 });
  }

  const token = request.headers.get("x-visibility-admin-token") || request.nextUrl.searchParams.get("token") || "";
  if (token !== adminToken) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const limit = numberParam(request.nextUrl.searchParams.get("limit"), 25);
  const leadsPath = getDataPath("VISIBILITY_LEADS_PATH", "PRODUCT_VISIBILITY_LEADS_PATH", "visibility-leads.jsonl");
  const eventsPath = getDataPath("VISIBILITY_EVENTS_PATH", "PRODUCT_VISIBILITY_EVENTS_PATH", "visibility-events.jsonl");
  const [leads, events] = await Promise.all([readJsonl(leadsPath, limit), readJsonl(eventsPath, limit)]);

  return NextResponse.json({
    ok: true,
    paths: {
      leads: leadsPath,
      events: eventsPath,
    },
    leads: {
      count: leads.length,
      recent: leads,
    },
    events: {
      count: events.length,
      recent: events,
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
