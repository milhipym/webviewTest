import { addDays, format, parse, startOfDay } from "date-fns";

// All times stored as UTC ISO; rendering done in local TZ (browser/Vercel: KST when deployed icn1).
// For day windows we use the local TZ of the runtime (Asia/Seoul in production).

export function parseDateParam(s: string): Date {
  return parse(s, "yyyy-MM-dd", new Date());
}

export function toIsoDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function dayBounds(date: Date): { start: Date; end: Date } {
  const start = startOfDay(date);
  const end = addDays(start, 1);
  return { start, end };
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function shiftDay(iso: string, delta: number): string {
  return toIsoDate(addDays(parseDateParam(iso), delta));
}
