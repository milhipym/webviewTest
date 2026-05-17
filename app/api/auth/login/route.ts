import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase/service";
import { HID_COOKIE, SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/auth/session";

const attempts = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 15;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 0, firstAt: now });
    return false;
  }
  return entry.count >= MAX_FAILS;
}

function recordFail(ip: string) {
  const entry = attempts.get(ip);
  if (entry) entry.count++;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "너무 많은 시도, 잠시 후 다시 시도하세요" },
      { status: 429 },
    );
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  const code = (body.code ?? "").trim();
  if (!code) {
    return NextResponse.json({ error: "코드를 입력하세요" }, { status: 400 });
  }

  const sb = getServiceSupabase();
  const { data: hid, error } = await sb.rpc("verify_share_code", { p_code: code } as never);
  if (error || !hid) {
    recordFail(ip);
    return NextResponse.json({ error: "코드가 올바르지 않습니다" }, { status: 401 });
  }

  const token = await signSession({ hid });
  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  res.cookies.set(HID_COOKIE, hid, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
