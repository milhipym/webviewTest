import { redirect } from "next/navigation";
import { getBaby, getGrowth } from "@/lib/records/queries";
import { GrowthChart } from "@/components/growth/GrowthChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

export default async function GrowthPage() {
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");
  const measurements = await getGrowth(baby.id);

  return (
    <div className="min-h-dvh bg-mesh pb-28">
      <header className="sticky top-0 z-20 glass border-b border-border/50 safe-top">
        <div className="px-5 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">성장 곡선</h1>
          <p className="text-xs text-muted-foreground">📏 {baby.name}의 성장 기록</p>
        </div>
      </header>
      <div className="px-4 py-4">
        <Tabs defaultValue="weight">
          <TabsList>
            <TabsTrigger value="weight">몸무게</TabsTrigger>
            <TabsTrigger value="height">키</TabsTrigger>
            <TabsTrigger value="head">머리둘레</TabsTrigger>
          </TabsList>
          <TabsContent value="weight">
            <GrowthChart
              metric="weight"
              gender={baby.gender}
              birthdate={baby.birthdate}
              measurements={measurements}
            />
          </TabsContent>
          <TabsContent value="height">
            <GrowthChart
              metric="height"
              gender={baby.gender}
              birthdate={baby.birthdate}
              measurements={measurements}
            />
          </TabsContent>
          <TabsContent value="head">
            <GrowthChart
              metric="head"
              gender={baby.gender}
              birthdate={baby.birthdate}
              measurements={measurements}
            />
          </TabsContent>
        </Tabs>
        {measurements.length === 0 && (
          <div className="mt-4 rounded-2xl bg-card p-6 text-center shadow-card">
            <div className="text-4xl">🌱</div>
            <p className="mt-2 text-sm font-semibold">아직 성장 기록이 없어요</p>
            <p className="mt-1 text-xs text-muted-foreground">
              + 버튼에서 &quot;성장&quot;을 눌러 첫 기록을 남겨보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
