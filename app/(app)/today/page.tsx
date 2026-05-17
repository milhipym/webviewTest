import { redirect } from "next/navigation";
import { DateHeader } from "@/components/shell/DateHeader";
import { Timeline } from "@/components/timeline/Timeline";
import { ActiveTimerBanner } from "@/components/timer/ActiveTimerBanner";
import { LastFeedingBadge } from "@/components/timeline/LastFeedingBadge";
import { QuickFab } from "@/components/quick/QuickFab";
import { getActiveRecords, getBaby, getLastFeeding, getRecordsByDay } from "@/lib/records/queries";
import { ageLabel } from "@/lib/time/format";
import { todayIso } from "@/lib/time/dayWindow";

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

  return (
    <>
      <DateHeader dateIso={dateIso} babyName={baby.name} babyAge={ageLabel(baby.birthdate)} />
      <ActiveTimerBanner babyId={baby.id} initial={active} />
      <div className="px-4 pt-3">
        <LastFeedingBadge lastFeeding={lastFeeding} />
      </div>
      <div className="mt-2">
        <Timeline babyId={baby.id} dateIso={dateIso} initial={records} />
      </div>
      <QuickFab babyId={baby.id} />
    </>
  );
}
