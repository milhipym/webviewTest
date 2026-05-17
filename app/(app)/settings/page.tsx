import Link from "next/link";
import { getBaby } from "@/lib/records/queries";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { LogoutButton } from "@/components/shell/LogoutButton";
import { ageLabel } from "@/lib/time/format";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const baby = await getBaby();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 safe-top">
        <h1 className="text-lg font-semibold">설정</h1>
      </header>
      <div className="space-y-6 px-4 py-4">
        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">아기 정보</h2>
          <div className="rounded-xl border border-border bg-card p-4">
            {baby ? (
              <div>
                <p className="text-base font-semibold">{baby.name}</p>
                <p className="text-sm text-muted-foreground">
                  생후 {ageLabel(baby.birthdate)} · {baby.birthdate} ·
                  {baby.gender === "M" ? " 남아" : baby.gender === "F" ? " 여아" : " 미정"}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link href="/settings/baby">아기 정보 편집</Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="w-full">
                <Link href="/settings/baby">아기 등록하기</Link>
              </Button>
            )}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">테마</h2>
          <ThemeToggle />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">데이터</h2>
          <Button asChild variant="outline" className="w-full">
            <a href="/api/export">전체 기록 CSV로 내보내기</a>
          </Button>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">계정</h2>
          <LogoutButton />
        </section>
      </div>
    </>
  );
}
