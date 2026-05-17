import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";
import { recordsToCsv } from "@/lib/records/csv";
import type { BabyRecord } from "@/types/domain";
import { getBaby } from "@/lib/records/queries";

export async function GET() {
  const baby = await getBaby();
  if (!baby) return NextResponse.json({ error: "no baby" }, { status: 404 });
  const sb = await getServerSupabase();
  const { data, error } = await sb
    .from("records")
    .select("*")
    .eq("baby_id", baby.id)
    .order("started_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const csv = recordsToCsv((data ?? []) as unknown as BabyRecord[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="baby-log-${baby.name}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
