import { redirect, notFound } from "next/navigation";
import { DateHeader } from "@/components/shell/DateHeader";
import { Timeline } from "@/components/timeline/Timeline";
import { ActiveTimerBanner } from "@/components/timer/ActiveTimerBanner";
import { QuickFab } from "@/components/quick/QuickFab";
import { getActiveRecords, getBaby, getRecordsByDay } from "@/lib/records/queries";
import { ageLabel } from "@/lib/time/format";
import { parseDateParam } from "@/lib/time/dayWindow";

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

  return (
    <>
      <DateHeader dateIso={date} babyName={baby.name} babyAge={ageLabel(baby.birthdate, dateObj)} />
      <ActiveTimerBanner babyId={baby.id} initial={active} />
      <div className="mt-2">
        <Timeline babyId={baby.id} dateIso={date} initial={records} />
      </div>
      <QuickFab babyId={baby.id} />
    </>
  );
}
