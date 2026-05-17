"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fmtDateKorean } from "@/lib/time/format";
import { shiftDay, todayIso } from "@/lib/time/dayWindow";
import { cn } from "@/lib/utils/cn";

export function DateHeader({ dateIso, babyName, babyAge }: { dateIso: string; babyName?: string; babyAge?: string }) {
  const prev = shiftDay(dateIso, -1);
  const next = shiftDay(dateIso, 1);
  const isToday = dateIso === todayIso();
  const isFutureNext = next > todayIso();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur safe-top">
      <div className="mx-auto flex max-w-md items-center justify-between px-3 py-3">
        <Link
          href={`/day/${prev}`}
          aria-label="이전 날짜"
          className="rounded-full p-2 hover:bg-accent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <Link
            href={isToday ? "/today" : `/day/${dateIso}`}
            className="block text-base font-semibold"
          >
            {fmtDateKorean(dateIso)}
          </Link>
          {babyName && (
            <p className="text-xs text-muted-foreground">
              {babyName}
              {babyAge ? ` · ${babyAge}` : ""}
            </p>
          )}
        </div>
        <Link
          href={isFutureNext ? "#" : `/day/${next}`}
          aria-label="다음 날짜"
          aria-disabled={isFutureNext}
          className={cn(
            "rounded-full p-2 hover:bg-accent",
            isFutureNext && "pointer-events-none opacity-30",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
