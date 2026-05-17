"use client";

import { useEffect, useState } from "react";
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
      <p className="mt-0.5 text-xs text-muted-foreground">
        💝 오늘 첫 수유를 시작해보세요
      </p>
    );
  }
  return (
    <p className="mt-0.5 text-xs text-muted-foreground">
      🍼 마지막 수유 <span className="font-bold text-foreground">{fmtDistanceShort(lastFeeding.started_at)}</span> 전
    </p>
  );
}
