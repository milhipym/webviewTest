import type { DailySummary } from "@/lib/records/summary";
import { fmtDuration } from "@/lib/time/format";

export function DailySummaryCards({ summary }: { summary: DailySummary }) {
  const items = [
    {
      emoji: "🍼",
      label: "수유",
      bg: "bg-rose-100",
      value: `${summary.feedingCount}회`,
      sub: summary.feedingMl > 0 ? `${summary.feedingMl}ml` : null,
    },
    {
      emoji: "🤱",
      label: "모유",
      bg: "bg-rose-50",
      value: summary.breastMinutes > 0 ? `${summary.breastMinutes}분` : "—",
      sub: null,
    },
    {
      emoji: "😴",
      label: "수면",
      bg: "bg-lavender-100",
      value: summary.sleepSeconds > 0 ? fmtDuration(summary.sleepSeconds) : "—",
      sub: null,
    },
    {
      emoji: "💧",
      label: "기저귀",
      bg: "bg-butter-100",
      value: `${summary.diaperTotal}회`,
      sub: `소변 ${summary.diaperPee} · 대변 ${summary.diaperPoo}`,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${it.bg} text-xl`}>
              {it.emoji}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{it.label}</span>
          </div>
          <div className="mt-2 text-2xl font-extrabold tabular-nums">{it.value}</div>
          {it.sub && <div className="mt-0.5 text-[11px] text-muted-foreground">{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}
