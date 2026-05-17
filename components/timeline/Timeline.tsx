"use client";

import { useEffect, useState } from "react";
import type { BabyRecord } from "@/types/domain";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { TimelineItem } from "./TimelineItem";
import { EmptyState } from "./EmptyState";

interface Props {
  babyId: string;
  dateIso: string; // yyyy-MM-dd in local TZ
  initial: BabyRecord[];
}

export function Timeline({ babyId, dateIso, initial }: Props) {
  const [records, setRecords] = useState<BabyRecord[]>(initial);

  useEffect(() => {
    setRecords(initial);
  }, [initial]);

  useEffect(() => {
    const sb = getBrowserSupabase();
    const dayStart = new Date(`${dateIso}T00:00:00`);
    const dayEnd = new Date(dayStart.getTime() + 86400000);

    const channel = sb
      .channel(`records-${babyId}-${dateIso}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "records",
          filter: `baby_id=eq.${babyId}`,
        },
        (payload) => {
          setRecords((prev) => {
            const next = [...prev];
            const inWindow = (r: BabyRecord) => {
              const t = new Date(r.started_at).getTime();
              return t >= dayStart.getTime() && t < dayEnd.getTime();
            };
            if (payload.eventType === "INSERT") {
              const row = payload.new as unknown as BabyRecord;
              if (inWindow(row) && !next.find((r) => r.id === row.id)) {
                next.unshift(row);
              }
            } else if (payload.eventType === "UPDATE") {
              const row = payload.new as unknown as BabyRecord;
              const idx = next.findIndex((r) => r.id === row.id);
              if (idx >= 0) next[idx] = row;
              else if (inWindow(row)) next.unshift(row);
            } else if (payload.eventType === "DELETE") {
              const row = payload.old as unknown as BabyRecord;
              return next.filter((r) => r.id !== row.id);
            }
            return next
              .filter((r, i, a) => a.findIndex((x) => x.id === r.id) === i)
              .sort(
                (a, b) =>
                  new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
              );
          });
        },
      )
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, [babyId, dateIso]);

  if (records.length === 0) {
    return <EmptyState />;
  }
  return (
    <ul className="divide-y divide-border">
      {records.map((r) => (
        <li key={r.id}>
          <TimelineItem record={r} />
        </li>
      ))}
    </ul>
  );
}
