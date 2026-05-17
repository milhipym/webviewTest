"use client";

import { createBrowserClient } from "@supabase/ssr";

let cached: ReturnType<typeof createBrowserClient> | null = null;

function readHidCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)BABY_HID=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getBrowserSupabase() {
  if (cached) return cached;
  const hid = readHidCookie();
  cached = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: hid ? { "x-household-id": hid } : {},
      },
    },
  );
  return cached;
}

export function getCurrentHouseholdId(): string | null {
  return readHidCookie();
}
