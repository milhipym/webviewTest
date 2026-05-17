"use client";

import type { BabyRecord } from "@/types/domain";
import { RECORD_LABELS, DIAPER_LABELS, HEALTH_LABELS, TEMP_SITE_LABELS } from "@/types/domain";
import { fmtTime, fmtDuration } from "@/lib/time/format";
import { deleteRecord } from "@/lib/records/repository";
import { toast } from "sonner";
import {
  Baby,
  Milk,
  Droplet,
  Moon,
  Apple,
  Cookie,
  Pill,
  Thermometer,
  Stethoscope,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function iconFor(type: BabyRecord["type"]) {
  switch (type) {
    case "feeding_breast":
      return { Icon: Baby, color: "text-feeding" };
    case "feeding_bottle":
    case "feeding_pumped":
      return { Icon: Milk, color: "text-feeding" };
    case "diaper":
      return { Icon: Droplet, color: "text-diaper" };
    case "sleep":
      return { Icon: Moon, color: "text-sleep" };
    case "baby_food":
      return { Icon: Apple, color: "text-food" };
    case "snack":
      return { Icon: Cookie, color: "text-food" };
    case "medicine":
      return { Icon: Pill, color: "text-medicine" };
    case "temperature":
      return { Icon: Thermometer, color: "text-health" };
    case "health":
      return { Icon: Stethoscope, color: "text-health" };
    case "photo":
      return { Icon: ImageIcon, color: "text-growth" };
  }
}

function summary(record: BabyRecord): string {
  const d = record.data as Record<string, unknown>;
  switch (record.type) {
    case "feeding_breast": {
      const l = (d.duration_l_sec as number) ?? 0;
      const r = (d.duration_r_sec as number) ?? 0;
      const total = l + r;
      const sideTxt = d.side === "L" ? "왼쪽" : d.side === "R" ? "오른쪽" : "양쪽";
      return `${sideTxt} · ${fmtDuration(total)}`;
    }
    case "feeding_bottle":
      return `분유 ${d.amount_ml}ml`;
    case "feeding_pumped":
      return `유축 모유 ${d.amount_ml}ml`;
    case "diaper":
      return DIAPER_LABELS[d.kind as keyof typeof DIAPER_LABELS] ?? "기저귀";
    case "sleep": {
      if (!record.ended_at) return "수면 진행중...";
      const secs = (new Date(record.ended_at).getTime() - new Date(record.started_at).getTime()) / 1000;
      return `${fmtDuration(secs)}`;
    }
    case "baby_food":
      return `${d.food}${d.amount ? ` · ${d.amount}${d.unit ?? ""}` : ""}`;
    case "snack":
      return `${d.food}${d.amount ? ` · ${d.amount}${d.unit ?? ""}` : ""}`;
    case "medicine":
      return `${d.name}${d.dose ? ` · ${d.dose}` : ""}`;
    case "temperature": {
      const site = d.site ? ` (${TEMP_SITE_LABELS[d.site as keyof typeof TEMP_SITE_LABELS]})` : "";
      return `${d.temp_c}°C${site}`;
    }
    case "health":
      return HEALTH_LABELS[d.kind as keyof typeof HEALTH_LABELS] ?? "건강";
    case "photo":
      return "사진";
  }
}

export function TimelineItem({ record }: { record: BabyRecord }) {
  const { Icon, color } = iconFor(record.type);
  const [deleting, setDeleting] = useState(false);

  async function onDelete() {
    if (!confirm("이 기록을 삭제할까요?")) return;
    setDeleting(true);
    try {
      await deleteRecord(record.id);
      toast.success("삭제했습니다");
    } catch {
      toast.error("삭제 실패");
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="flex w-14 flex-col items-end">
        <time className="text-sm font-medium tabular-nums">{fmtTime(record.started_at)}</time>
        {record.ended_at && record.type === "sleep" && (
          <time className="text-xs text-muted-foreground tabular-nums">
            ~{fmtTime(record.ended_at)}
          </time>
        )}
      </div>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{RECORD_LABELS[record.type]}</p>
        <p className="text-sm text-muted-foreground">{summary(record)}</p>
        {record.note && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">📝 {record.note}</p>
        )}
      </div>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-destructive disabled:opacity-50"
        aria-label="삭제"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
