import type { BabyRecord } from "@/types/domain";

export interface DailySummary {
  feedingCount: number;
  feedingMl: number;
  breastMinutes: number;
  sleepSeconds: number;
  diaperPee: number;
  diaperPoo: number;
  diaperTotal: number;
}

export function computeDailySummary(records: BabyRecord[]): DailySummary {
  let feedingCount = 0;
  let feedingMl = 0;
  let breastMinutes = 0;
  let sleepSeconds = 0;
  let diaperPee = 0;
  let diaperPoo = 0;

  for (const r of records) {
    if (r.type === "feeding_bottle" || r.type === "feeding_pumped") {
      feedingCount++;
      const d = r.data as { amount_ml?: number };
      feedingMl += Number(d.amount_ml ?? 0);
    } else if (r.type === "feeding_breast") {
      feedingCount++;
      const d = r.data as { duration_l_sec?: number; duration_r_sec?: number };
      breastMinutes += Math.round(((d.duration_l_sec ?? 0) + (d.duration_r_sec ?? 0)) / 60);
    } else if (r.type === "sleep" && r.ended_at) {
      sleepSeconds += (new Date(r.ended_at).getTime() - new Date(r.started_at).getTime()) / 1000;
    } else if (r.type === "diaper") {
      const d = r.data as { kind?: string };
      if (d.kind === "pee") diaperPee++;
      else if (d.kind === "poo") diaperPoo++;
      else if (d.kind === "mixed") {
        diaperPee++;
        diaperPoo++;
      }
    }
  }
  return {
    feedingCount,
    feedingMl,
    breastMinutes,
    sleepSeconds,
    diaperPee,
    diaperPoo,
    diaperTotal: diaperPee + diaperPoo,
  };
}

export interface WeeklyDayPoint {
  date: string; // yyyy-MM-dd
  feedingMl: number;
  feedingCount: number;
  sleepHours: number;
  diaperTotal: number;
}

export function computeWeeklySeries(
  records: BabyRecord[],
  weekStart: Date,
): WeeklyDayPoint[] {
  const buckets = new Map<string, WeeklyDayPoint>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart.getTime() + i * 86400000);
    const key = d.toISOString().slice(0, 10);
    buckets.set(key, {
      date: key,
      feedingMl: 0,
      feedingCount: 0,
      sleepHours: 0,
      diaperTotal: 0,
    });
  }
  for (const r of records) {
    const key = new Date(r.started_at).toISOString().slice(0, 10);
    const b = buckets.get(key);
    if (!b) continue;
    if (r.type === "feeding_bottle" || r.type === "feeding_pumped") {
      b.feedingCount++;
      const d = r.data as { amount_ml?: number };
      b.feedingMl += Number(d.amount_ml ?? 0);
    } else if (r.type === "feeding_breast") {
      b.feedingCount++;
    } else if (r.type === "sleep" && r.ended_at) {
      b.sleepHours +=
        (new Date(r.ended_at).getTime() - new Date(r.started_at).getTime()) / 3600000;
    } else if (r.type === "diaper") {
      b.diaperTotal++;
    }
  }
  return Array.from(buckets.values());
}
