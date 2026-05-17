"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { insertRecord } from "@/lib/records/repository";
import { fmtDurationHMS } from "@/lib/time/format";
import { ChipGroup, NoteField } from "./FormCommon";
import type { BreastSide } from "@/types/domain";

export function FeedingBreastForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [side, setSide] = useState<BreastSide>("L");
  const [running, setRunning] = useState<"L" | "R" | null>(null);
  const [lSec, setLSec] = useState(0);
  const [rSec, setRSec] = useState(0);
  const [startedAt] = useState(() => new Date().toISOString());
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      if (running === "L") setLSec((n) => n + 1);
      else setRSec((n) => n + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  async function save() {
    if (lSec === 0 && rSec === 0) {
      toast.error("타이머를 시작하세요");
      return;
    }
    const finalSide: BreastSide = lSec > 0 && rSec > 0 ? "both" : lSec > 0 ? "L" : "R";
    await insertRecord({
      baby_id: babyId,
      type: "feeding_breast",
      started_at: startedAt,
      ended_at: new Date().toISOString(),
      data: { side: finalSide, duration_l_sec: lSec, duration_r_sec: rSec },
      note: note || null,
    });
    toast.success(`모유 수유 ${fmtDurationHMS(lSec + rSec)}`);
    onDone();
  }

  return (
    <div className="space-y-4">
      <ChipGroup
        options={[
          { value: "L", label: "왼쪽" },
          { value: "R", label: "오른쪽" },
          { value: "both", label: "양쪽" },
        ]}
        value={side}
        onChange={(v) => {
          setSide(v);
          if (v === "L" || v === "R") setRunning(v);
        }}
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-3 text-center">
          <p className="text-xs text-muted-foreground">왼쪽</p>
          <p className="font-mono text-2xl tabular-nums">{fmtDurationHMS(lSec)}</p>
          <Button
            type="button"
            variant={running === "L" ? "destructive" : "outline"}
            size="sm"
            className="mt-2 w-full"
            onClick={() => setRunning(running === "L" ? null : "L")}
          >
            {running === "L" ? "정지" : "시작"}
          </Button>
        </div>
        <div className="rounded-xl border border-border p-3 text-center">
          <p className="text-xs text-muted-foreground">오른쪽</p>
          <p className="font-mono text-2xl tabular-nums">{fmtDurationHMS(rSec)}</p>
          <Button
            type="button"
            variant={running === "R" ? "destructive" : "outline"}
            size="sm"
            className="mt-2 w-full"
            onClick={() => setRunning(running === "R" ? null : "R")}
          >
            {running === "R" ? "정지" : "시작"}
          </Button>
        </div>
      </div>
      <NoteField value={note} onChange={setNote} />
      <Button type="button" size="lg" className="w-full" onClick={save}>
        저장
      </Button>
    </div>
  );
}
