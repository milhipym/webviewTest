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
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 safe-top">
        <h1 className="text-lg font-semibold">성장 곡선</h1>
        <p className="text-xs text-muted-foreground">{baby.name}</p>
      </header>
      <div className="px-4 py-3">
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
          <p className="mt-4 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            아직 성장 기록이 없어요. 오른쪽 아래 + 버튼에서 "성장"을 눌러 기록하세요.
          </p>
        )}
      </div>
    </>
  );
}
