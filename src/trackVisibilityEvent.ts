"use client";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

export function trackVisibilityEvent(eventName: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = JSON.stringify({
    eventName,
    properties,
    path: window.location.pathname,
    referrer: document.referrer || "",
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/visibility-event", blob);
    return;
  }

  void fetch("/api/visibility-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}
