import { redirect, notFound } from "next/navigation";
import { DateHeader } from "@/components/shell/DateHeader";
import { Timeline } from "@/components/timeline/Timeline";
import { ActiveTimerBanner } from "@/components/timer/ActiveTimerBanner";
import { QuickFab } from "@/components/quick/QuickFab";
import { BabyHeroCard } from "@/components/shell/BabyHeroCard";
import { getActiveRecords, getBaby, getRecordsByDay } from "@/lib/records/queries";
import { parseDateParam } from "@/lib/time/dayWindow";
import { computeDailySummary } from "@/lib/records/summary";

export const dynamic = "force-dynamic";

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");
  const dateObj = parseDateParam(date);
  const [records, active] = await Promise.all([
    getRecordsByDay(baby.id, dateObj),
    getActiveRecords(baby.id),
  ]);
  const summary = computeDailySummary(records);

  return (
    <div className="min-h-dvh bg-mesh">
      <DateHeader dateIso={date} />
      <ActiveTimerBanner babyId={baby.id} initial={active} />
      <div className="px-4 pt-2">
        <BabyHeroCard baby={baby} summary={summary} lastFeeding={null} />
      </div>
      <div className="mt-4 px-3">
        <div className="rounded-3xl bg-card/70 shadow-card backdrop-blur">
          <div className="border-b border-border/50 px-4 py-3">
            <h2 className="text-sm font-bold tracking-tight">기록</h2>
          </div>
          <Timeline babyId={baby.id} dateIso={date} initial={records} />
        </div>
      </div>
      <div className="h-24" />
      <QuickFab babyId={baby.id} />
    </div>
  );
}
