"use client";

import type { BabyRecord } from "@/types/domain";
import { DIAPER_LABELS, HEALTH_LABELS, TEMP_SITE_LABELS } from "@/types/domain";
import { fmtTime, fmtDuration } from "@/lib/time/format";
import { deleteRecord } from "@/lib/records/repository";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Style {
  emoji: string;
  label: string;
  bg: string;
  ring: string;
  text: string;
}

function styleFor(type: BabyRecord["type"]): Style {
  switch (type) {
    case "feeding_breast":
      return { emoji: "🤱", label: "모유 수유", bg: "bg-rose-100", ring: "ring-rose-200", text: "text-rose-700" };
    case "feeding_bottle":
      return { emoji: "🍼", label: "분유", bg: "bg-rose-100", ring: "ring-rose-200", text: "text-rose-700" };
    case "feeding_pumped":
      return { emoji: "🥛", label: "유축 모유", bg: "bg-rose-100", ring: "ring-rose-200", text: "text-rose-700" };
    case "diaper":
      return { emoji: "💧", label: "기저귀", bg: "bg-butter-100", ring: "ring-butter-200", text: "text-amber-700" };
    case "sleep":
      return { emoji: "😴", label: "수면", bg: "bg-lavender-100", ring: "ring-lavender-200", text: "text-violet-700" };
    case "baby_food":
      return { emoji: "🥣", label: "이유식", bg: "bg-peach-100", ring: "ring-peach-200", text: "text-orange-700" };
    case "snack":
      return { emoji: "🍪", label: "간식", bg: "bg-peach-100", ring: "ring-peach-200", text: "text-orange-700" };
    case "medicine":
      return { emoji: "💊", label: "약", bg: "bg-lavender-50", ring: "ring-lavender-100", text: "text-purple-700" };
    case "temperature":
      return { emoji: "🌡️", label: "체온", bg: "bg-rose-50", ring: "ring-rose-100", text: "text-rose-700" };
    case "health":
      return { emoji: "🏥", label: "건강", bg: "bg-rose-50", ring: "ring-rose-100", text: "text-rose-700" };
    case "photo":
      return { emoji: "📸", label: "사진", bg: "bg-lavender-100", ring: "ring-lavender-200", text: "text-violet-700" };
  }
}

function summary(record: BabyRecord): string {
  const d = record.data as Record<string, unknown>;
  switch (record.type) {
    case "feeding_breast": {
      const l = (d.duration_l_sec as number) ?? 0;
      const r = (d.duration_r_sec as number) ?? 0;
      const sideTxt = d.side === "L" ? "왼쪽" : d.side === "R" ? "오른쪽" : "양쪽";
      return `${sideTxt} · ${fmtDuration(l + r)}`;
    }
    case "feeding_bottle":
      return `${d.amount_ml}ml`;
    case "feeding_pumped":
      return `${d.amount_ml}ml`;
    case "diaper":
      return DIAPER_LABELS[d.kind as keyof typeof DIAPER_LABELS] ?? "기저귀";
    case "sleep": {
      if (!record.ended_at) return "진행중...";
      const secs = (new Date(record.ended_at).getTime() - new Date(record.started_at).getTime()) / 1000;
      return fmtDuration(secs);
    }
    case "baby_food":
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
      return "사진 기록";
  }
}

export function TimelineItem({ record }: { record: BabyRecord }) {
  const s = styleFor(record.type);
  const [deleting, setDeleting] = useState(false);

  async function onDelete() {
    if (!confirm("이 기록을 삭제할까요?")) return;
    setDeleting(true);
    try {
      await deleteRecord(record.id);
      toast.success("삭제했어요");
    } catch {
      toast.error("삭제 실패");
      setDeleting(false);
    }
  }

  return (
    <div className="group flex items-center gap-3 px-3 py-2.5">
      <time className="w-12 shrink-0 text-right text-xs font-bold tabular-nums text-muted-foreground">
        {fmtTime(record.started_at)}
      </time>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${s.bg} ring-1 ${s.ring} text-2xl shadow-card`}>
        {s.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-semibold ${s.text}`}>{s.label}</p>
        <p className="truncate text-sm font-medium text-foreground">{summary(record)}</p>
        {record.note && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">📝 {record.note}</p>
        )}
      </div>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="rounded-full p-2 text-muted-foreground/0 transition group-hover:text-muted-foreground hover:bg-rose-50 hover:text-destructive disabled:opacity-50"
        aria-label="삭제"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
