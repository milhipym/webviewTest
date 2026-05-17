import { getServerSupabase } from "@/lib/supabase/server";
import type { BabyRecord, Baby, GrowthMeasurement, Photo } from "@/types/domain";
import { dayBounds } from "@/lib/time/dayWindow";

export async function getBaby(): Promise<Baby | null> {
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("babies")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("getBaby error", error);
    return null;
  }
  return data as Baby | null;
}

export async function getRecordsByDay(babyId: string, date: Date): Promise<BabyRecord[]> {
  const sb = await getServerSupabase();
  const { start, end } = dayBounds(date);
  const { data, error } = await sb
    .from("records")
    .select("*")
    .eq("baby_id", babyId)
    .gte("started_at", start.toISOString())
    .lt("started_at", end.toISOString())
    .order("started_at", { ascending: false });
  if (error) {
    console.error("getRecordsByDay error", error);
    return [];
  }
  return (data ?? []) as unknown as BabyRecord[];
}

export async function getActiveRecords(babyId: string): Promise<BabyRecord[]> {
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("records")
    .select("*")
    .eq("baby_id", babyId)
    .is("ended_at", null)
    .in("type", ["sleep", "feeding_breast"]);
  if (error) {
    console.error("getActiveRecords error", error);
    return [];
  }
  return (data ?? []) as unknown as BabyRecord[];
}

export async function getLastFeeding(babyId: string): Promise<BabyRecord | null> {
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("records")
    .select("*")
    .eq("baby_id", babyId)
    .in("type", ["feeding_breast", "feeding_bottle", "feeding_pumped"])
    .not("ended_at", "is", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data as unknown as BabyRecord;
}

export async function getWeeklyRecords(
  babyId: string,
  weekStart: Date,
): Promise<BabyRecord[]> {
  const sb = await getServerSupabase();
  const end = new Date(weekStart.getTime() + 7 * 86400000);
  const { data, error } = await sb
    .from("records")
    .select("*")
    .eq("baby_id", babyId)
    .gte("started_at", weekStart.toISOString())
    .lt("started_at", end.toISOString())
    .order("started_at", { ascending: true });
  if (error) {
    console.error("getWeeklyRecords error", error);
    return [];
  }
  return (data ?? []) as unknown as BabyRecord[];
}

export async function getGrowth(babyId: string): Promise<GrowthMeasurement[]> {
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("growth_measurements")
    .select("*")
    .eq("baby_id", babyId)
    .order("measured_at", { ascending: true });
  if (error) return [];
  return (data ?? []) as GrowthMeasurement[];
}

export async function getPhotos(babyId: string, limit = 60): Promise<Photo[]> {
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("photos")
    .select("*")
    .eq("baby_id", babyId)
    .order("taken_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as Photo[];
}
