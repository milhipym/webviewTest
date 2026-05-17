import { redirect } from "next/navigation";
import { DateHeader } from "@/components/shell/DateHeader";
import { Timeline } from "@/components/timeline/Timeline";
import { ActiveTimerBanner } from "@/components/timer/ActiveTimerBanner";
import { LastFeedingBadge } from "@/components/timeline/LastFeedingBadge";
import { QuickFab } from "@/components/quick/QuickFab";
import { BabyHeroCard } from "@/components/shell/BabyHeroCard";
import { getActiveRecords, getBaby, getLastFeeding, getRecordsByDay } from "@/lib/records/queries";
import { todayIso } from "@/lib/time/dayWindow";
import { computeDailySummary } from "@/lib/records/summary";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");
  const date = new Date();
  const dateIso = todayIso();
  const [records, active, lastFeeding] = await Promise.all([
    getRecordsByDay(baby.id, date),
    getActiveRecords(baby.id),
    getLastFeeding(baby.id),
  ]);
  const summary = computeDailySummary(records);

  return (
    <div className="min-h-dvh bg-mesh">
      <DateHeader dateIso={dateIso} />
      <ActiveTimerBanner babyId={baby.id} initial={active} />
      <div className="px-4 pt-2">
        <BabyHeroCard baby={baby} summary={summary} lastFeeding={lastFeeding} />
      </div>
      <div className="mt-4 px-3">
        <div className="rounded-3xl bg-card/70 shadow-card backdrop-blur">
          <div className="border-b border-border/50 px-4 py-3">
            <h2 className="text-sm font-bold tracking-tight">오늘의 기록</h2>
            <LastFeedingBadge lastFeeding={lastFeeding} />
          </div>
          <Timeline babyId={baby.id} dateIso={dateIso} initial={records} />
        </div>
      </div>
      <div className="h-24" />
      <QuickFab babyId={baby.id} />
    </div>
  );
}
