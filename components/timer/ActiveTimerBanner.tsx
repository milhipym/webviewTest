"use client";

import { useEffect, useState } from "react";
import { Moon, Baby as BabyIcon } from "lucide-react";
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
    <div className="space-y-2 px-4 pt-3">
      {active.map((r) => {
        const elapsed = (Date.now() - new Date(r.started_at).getTime()) / 1000;
        const Icon = r.type === "sleep" ? Moon : BabyIcon;
        const label = r.type === "sleep" ? "수면 진행중" : "모유 수유중";
        return (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2"
          >
            <Icon className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {fmtDurationHMS(elapsed)}
              </p>
            </div>
            <Button
              size="sm"
              onClick={async () => {
                try {
                  await endActiveTimer(r.id);
                  toast.success("종료했습니다");
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
