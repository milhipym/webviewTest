"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { fmtDateKorean } from "@/lib/time/format";
import { shiftDay, todayIso } from "@/lib/time/dayWindow";
import { cn } from "@/lib/utils/cn";

export function DateHeader({ dateIso }: { dateIso: string }) {
  const prev = shiftDay(dateIso, -1);
  const next = shiftDay(dateIso, 1);
  const isToday = dateIso === todayIso();
  const isFutureNext = next > todayIso();

  return (
    <header className="sticky top-0 z-20 safe-top">
      <div className="glass border-b border-border/50">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-3 py-3">
          <Link
            href={`/day/${prev}`}
            aria-label="이전 날짜"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-foreground/70 transition active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-base font-bold tracking-tight">
              {isToday ? "오늘" : fmtDateKorean(dateIso)}
            </span>
            {!isToday && (
              <span className="text-xs text-muted-foreground">
                · {fmtDateKorean(dateIso).replace(/^.*\((.+)\).*$/, "$1")}
              </span>
            )}
          </div>
          <Link
            href={isFutureNext ? "#" : `/day/${next}`}
            aria-label="다음 날짜"
            aria-disabled={isFutureNext}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-foreground/70 transition active:scale-95",
              isFutureNext && "pointer-events-none opacity-30",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
