import type { DailySummary } from "@/lib/records/summary";
import { fmtDuration } from "@/lib/time/format";
import { Milk, Droplet, Moon, Baby } from "lucide-react";

export function DailySummaryCards({ summary }: { summary: DailySummary }) {
  const items = [
    {
      label: "수유",
      Icon: Milk,
      color: "text-feeding",
      value: `${summary.feedingCount}회`,
      sub: summary.feedingMl > 0 ? `${summary.feedingMl}ml` : null,
    },
    {
      label: "모유",
      Icon: Baby,
      color: "text-feeding",
      value: summary.breastMinutes > 0 ? `${summary.breastMinutes}분` : "—",
      sub: null,
    },
    {
      label: "수면",
      Icon: Moon,
      color: "text-sleep",
      value: summary.sleepSeconds > 0 ? fmtDuration(summary.sleepSeconds) : "—",
      sub: null,
    },
    {
      label: "기저귀",
      Icon: Droplet,
      color: "text-diaper",
      value: `${summary.diaperTotal}회`,
      sub: `소변 ${summary.diaperPee} · 대변 ${summary.diaperPoo}`,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <it.Icon className={`h-4 w-4 ${it.color}`} />
            {it.label}
          </div>
          <div className="mt-1 text-xl font-bold">{it.value}</div>
          {it.sub && <div className="mt-0.5 text-xs text-muted-foreground">{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}
