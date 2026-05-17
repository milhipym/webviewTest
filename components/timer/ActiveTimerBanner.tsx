"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fmtDurationHMS } from "@/lib/time/format";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { endActiveTimer } from "@/lib/records/repository";
import type { BabyRecord } from "@/types/domain";
import { toast } from "sonner";

export function ActiveTimerBanner({
  babyId,
  initial,
}: {
  babyId: string;
  initial: BabyRecord[];
}) {
  const [active, setActive] = useState<BabyRecord[]>(initial);
  const [, force] = useState(0);

  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const sb = getBrowserSupabase();
    const ch = sb
      .channel(`active-${babyId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "records", filter: `baby_id=eq.${babyId}` },
        (payload) => {
          setActive((prev) => {
            const next = [...prev];
            if (payload.eventType === "INSERT") {
              const row = payload.new as unknown as BabyRecord;
              if (!row.ended_at && (row.type === "sleep" || row.type === "feeding_breast")) {
                next.push(row);
              }
            } else if (payload.eventType === "UPDATE") {
              const row = payload.new as unknown as BabyRecord;
              const idx = next.findIndex((r) => r.id === row.id);
              if (row.ended_at) {
                if (idx >= 0) next.splice(idx, 1);
              } else if (idx >= 0) next[idx] = row;
              else if (row.type === "sleep" || row.type === "feeding_breast") {
                next.push(row);
              }
            } else if (payload.eventType === "DELETE") {
              const row = payload.old as unknown as BabyRecord;
              const idx = next.findIndex((r) => r.id === row.id);
              if (idx >= 0) next.splice(idx, 1);
            }
            return next;
          });
        },
      )
      .subscribe();
    return () => {
      sb.removeChannel(ch);
    };
  }, [babyId]);

  if (active.length === 0) return null;

  return (
    <div className="space-y-2 px-4 pt-2">
      {active.map((r) => {
        const elapsed = (Date.now() - new Date(r.started_at).getTime()) / 1000;
        const emoji = r.type === "sleep" ? "😴" : "🤱";
        const label = r.type === "sleep" ? "수면 진행중" : "모유 수유중";
        return (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-2xl bg-gradient-warm p-3 shadow-soft"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-2xl shadow-card">
              {emoji}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-rose-900/70">{label}</p>
              <p className="font-mono text-lg font-extrabold tabular-nums text-rose-900">
                {fmtDurationHMS(elapsed)}
              </p>
            </div>
            <Button
              size="sm"
              onClick={async () => {
                try {
                  await endActiveTimer(r.id);
                  toast.success("종료했어요");
                } catch {
                  toast.error("종료 실패");
                }
              }}
            >
              종료
            </Button>
          </div>
        );
      })}
    </div>
  );
}
