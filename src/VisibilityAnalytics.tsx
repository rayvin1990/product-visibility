"use client";

import { useEffect } from "react";

import { trackVisibilityEvent } from "./trackVisibilityEvent";

export function VisibilityAnalytics() {
  useEffect(() => {
    trackVisibilityEvent("page_view", {
      title: document.title,
    });

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const tracked = target.closest<HTMLElement>("[data-track]");
      if (!tracked) {
        return;
      }

      trackVisibilityEvent(tracked.dataset.track || "tracked_click", {
        label: tracked.textContent?.trim().slice(0, 120) || "",
        href: tracked instanceof HTMLAnchorElement ? tracked.href : "",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
