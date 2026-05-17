"use client";

import { useEffect, useState } from "react";
import { Milk } from "lucide-react";
import { fmtDistanceShort } from "@/lib/time/format";
import type { BabyRecord } from "@/types/domain";

export function LastFeedingBadge({ lastFeeding }: { lastFeeding: BabyRecord | null }) {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!lastFeeding) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Milk className="h-3.5 w-3.5" />
        <span>오늘 첫 수유를 시작해보세요</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Milk className="h-3.5 w-3.5 text-feeding" />
      <span>마지막 수유 후 {fmtDistanceShort(lastFeeding.started_at)}</span>
    </div>
  );
}
