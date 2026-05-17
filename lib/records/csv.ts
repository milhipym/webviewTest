import Papa from "papaparse";
import type { BabyRecord } from "@/types/domain";
import { RECORD_LABELS } from "@/types/domain";

export function recordsToCsv(records: BabyRecord[]): string {
  const rows = records.map((r) => ({
    id: r.id,
    유형: RECORD_LABELS[r.type] ?? r.type,
    시작: r.started_at,
    종료: r.ended_at ?? "",
    데이터: JSON.stringify(r.data),
    메모: r.note ?? "",
  }));
  const csv = Papa.unparse(rows, { header: true });
  return "﻿" + csv;
}
