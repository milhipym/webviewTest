import Link from "next/link";
import { getBaby } from "@/lib/records/queries";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { LogoutButton } from "@/components/shell/LogoutButton";
import { ageLabel } from "@/lib/time/format";
import { ChevronRight, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const baby = await getBaby();

  return (
    <div className="min-h-dvh bg-mesh pb-28">
      <header className="sticky top-0 z-20 glass border-b border-border/50 safe-top">
        <div className="px-5 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">설정</h1>
          <p className="text-xs text-muted-foreground">⚙️ 우리 가족 설정</p>
        </div>
      </header>

      <div className="space-y-5 px-4 py-5">
        {/* Baby card */}
        <section>
          <h2 className="mb-2 px-1 text-xs font-bold text-muted-foreground">아기 정보</h2>
          {baby ? (
            <Link
              href="/settings/baby"
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.98]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-warm text-3xl shadow-card">
                {baby.gender === "F" ? "👶🏻" : baby.gender === "M" ? "👶🏻" : "🐣"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-extrabold">{baby.name}</p>
                <p className="text-xs text-muted-foreground">
                  {ageLabel(baby.birthdate)} · {baby.birthdate}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ) : (
            <Button asChild className="w-full">
              <Link href="/settings/baby">아기 등록하기</Link>
            </Button>
          )}
        </section>

        {/* Theme */}
        <section>
          <h2 className="mb-2 px-1 text-xs font-bold text-muted-foreground">화면</h2>
          <div className="rounded-2xl bg-card p-3 shadow-card">
            <ThemeToggle />
          </div>
        </section>

        {/* Data */}
        <section>
          <h2 className="mb-2 px-1 text-xs font-bold text-muted-foreground">데이터</h2>
          <a
            href="/api/export"
            className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card transition active:scale-[0.98]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-100 text-mint-500">
              <Download className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">전체 기록 내보내기</p>
              <p className="text-xs text-muted-foreground">CSV 파일로 다운로드</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </a>
        </section>

        {/* Account */}
        <section>
          <h2 className="mb-2 px-1 text-xs font-bold text-muted-foreground">계정</h2>
          <LogoutButton />
        </section>

        <p className="pt-6 text-center text-[10px] text-muted-foreground">
          베이비로그 · 우리 가족만의 기록 💕
        </p>
      </div>
    </div>
  );
}
