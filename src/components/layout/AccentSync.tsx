"use client";

import { useEffect } from "react";
import { getScent } from "@/content/scents";
import { useSelection } from "@/store/selection";

/** Mirrors the selected scent's accent color into the global --accent variable. */
export function AccentSync() {
  const scentId = useSelection((s) => s.scentId);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", getScent(scentId).accent);
  }, [scentId]);

  return null;
}
