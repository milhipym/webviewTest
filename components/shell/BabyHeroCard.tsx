import type { Baby, BabyRecord } from "@/types/domain";
import type { DailySummary } from "@/lib/records/summary";
import { ageLabel, fmtDuration, fmtDistanceShort } from "@/lib/time/format";

export function BabyHeroCard({
  baby,
  summary,
  lastFeeding,
}: {
  baby: Baby;
  summary: DailySummary;
  lastFeeding: BabyRecord | null;
}) {
  const emoji = baby.gender === "F" ? "👶🏻" : baby.gender === "M" ? "👶🏻" : "🐣";
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-warm p-5 shadow-soft">
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-4xl shadow-card backdrop-blur">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-rose-500/80">
            {ageLabel(baby.birthdate)}
          </p>
          <h1 className="truncate text-2xl font-extrabold tracking-tight text-rose-900/90">
            {baby.name}
          </h1>
          {lastFeeding && (
            <p className="mt-0.5 text-xs text-rose-900/60">
              💕 마지막 수유 {fmtDistanceShort(lastFeeding.started_at)} 전
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-4 gap-2">
        <Stat emoji="🍼" label="수유" value={`${summary.feedingCount}회`} />
        <Stat
          emoji="😴"
          label="수면"
          value={summary.sleepSeconds ? fmtDuration(summary.sleepSeconds) : "—"}
        />
        <Stat emoji="💧" label="기저귀" value={`${summary.diaperTotal}회`} />
        <Stat
          emoji="🥛"
          label="총량"
          value={summary.feedingMl ? `${summary.feedingMl}` : "—"}
          suffix={summary.feedingMl ? "ml" : undefined}
        />
      </div>
    </section>
  );
}

function Stat({
  emoji,
  label,
  value,
  suffix,
}: {
  emoji: string;
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/70 px-2 py-2.5 text-center backdrop-blur">
      <div className="text-lg leading-none">{emoji}</div>
      <div className="mt-1 text-[10px] font-medium text-rose-900/60">{label}</div>
      <div className="mt-0.5 text-sm font-extrabold tabular-nums text-rose-900">
        {value}
        {suffix && <span className="ml-0.5 text-[10px] font-medium">{suffix}</span>}
      </div>
    </div>
  );
}
