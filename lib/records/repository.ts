"use client";

import { getBrowserSupabase, getCurrentHouseholdId } from "@/lib/supabase/client";
import type { BabyRecord, RecordData, RecordType } from "@/types/domain";

function deviceId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}

export interface InsertRecordInput {
  baby_id: string;
  type: RecordType;
  started_at: string;
  ended_at?: string | null;
  data: RecordData;
  note?: string | null;
}

export async function insertRecord(input: InsertRecordInput): Promise<BabyRecord> {
  const sb = getBrowserSupabase();
  const hid = getCurrentHouseholdId();
  if (!hid) throw new Error("no household id");
  const { data, error } = await sb
    .from("records")
    .insert({
      baby_id: input.baby_id,
      household_id: hid,
      type: input.type,
      started_at: input.started_at,
      ended_at: input.ended_at ?? null,
      data: input.data,
      note: input.note ?? null,
      created_by_device: deviceId(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as unknown as BabyRecord;
}

export async function updateRecord(
  id: string,
  patch: Partial<Omit<BabyRecord, "id">>,
): Promise<void> {
  const sb = getBrowserSupabase();
  const { error } = await sb.from("records").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteRecord(id: string): Promise<void> {
  const sb = getBrowserSupabase();
  const { error } = await sb.from("records").delete().eq("id", id);
  if (error) throw error;
}

export async function endActiveTimer(id: string, endedAt = new Date()): Promise<void> {
  await updateRecord(id, { ended_at: endedAt.toISOString() });
}

export async function insertGrowth(input: {
  baby_id: string;
  measured_at: string;
  height_cm?: number | null;
  weight_kg?: number | null;
  head_cm?: number | null;
  note?: string | null;
}): Promise<void> {
  const sb = getBrowserSupabase();
  const hid = getCurrentHouseholdId();
  if (!hid) throw new Error("no household id");
  const { error } = await sb.from("growth_measurements").insert({
    baby_id: input.baby_id,
    household_id: hid,
    measured_at: input.measured_at,
    height_cm: input.height_cm ?? null,
    weight_kg: input.weight_kg ?? null,
    head_cm: input.head_cm ?? null,
    note: input.note ?? null,
  });
  if (error) throw error;
}

export async function insertPhoto(input: {
  baby_id: string;
  taken_at: string;
  storage_path: string;
  note?: string | null;
}): Promise<void> {
  const sb = getBrowserSupabase();
  const hid = getCurrentHouseholdId();
  if (!hid) throw new Error("no household id");
  const { error } = await sb.from("photos").insert({
    baby_id: input.baby_id,
    household_id: hid,
    taken_at: input.taken_at,
    storage_path: input.storage_path,
    note: input.note ?? null,
  });
  if (error) throw error;
}
