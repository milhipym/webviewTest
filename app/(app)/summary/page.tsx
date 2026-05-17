import { redirect } from "next/navigation";
import { getBaby, getRecordsByDay, getWeeklyRecords } from "@/lib/records/queries";
import { computeDailySummary, computeWeeklySeries } from "@/lib/records/summary";
import { DailySummaryCards } from "@/components/summary/DailySummaryCards";
import {
  WeeklyDiaperChart,
  WeeklyFeedingChart,
  WeeklySleepChart,
} from "@/components/summary/WeeklyCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fmtDateKorean } from "@/lib/time/format";

export const dynamic = "force-dynamic";

export default async function SummaryPage() {
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const [todayRecords, weekRecords] = await Promise.all([
    getRecordsByDay(baby.id, today),
    getWeeklyRecords(baby.id, weekStart),
  ]);

  const summary = computeDailySummary(todayRecords);
  const weekly = computeWeeklySeries(weekRecords, weekStart);

  return (
    <div className="min-h-dvh bg-mesh pb-28">
      <header className="sticky top-0 z-20 glass border-b border-border/50 safe-top">
        <div className="px-5 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">요약</h1>
          <p className="text-xs text-muted-foreground">📅 {fmtDateKorean(today)}</p>
        </div>
      </header>
      <Tabs defaultValue="daily" className="px-4 pt-3">
        <TabsList>
          <TabsTrigger value="daily">일간</TabsTrigger>
          <TabsTrigger value="weekly">주간</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <div className="-mx-4">
            <DailySummaryCards summary={summary} />
          </div>
        </TabsContent>
        <TabsContent value="weekly">
          <div className="space-y-3">
            <WeeklyFeedingChart data={weekly} />
            <WeeklySleepChart data={weekly} />
            <WeeklyDiaperChart data={weekly} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
