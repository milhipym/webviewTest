"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { insertRecord } from "@/lib/records/repository";
import {
  Field,
  FormShell,
  NoteField,
  StartedAtField,
  inputToIso,
  nowLocalInput,
} from "./FormCommon";

export function FeedingBottleForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [amount, setAmount] = useState("");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      disabled={!amount}
      onSubmit={async () => {
        const ml = Number(amount);
        if (!ml || ml <= 0) {
          toast.error("양을 입력하세요");
          return;
        }
        const iso = inputToIso(startedAt);
        try {
          await insertRecord({
            baby_id: babyId,
            type: "feeding_bottle",
            started_at: iso,
            ended_at: iso,
            data: { amount_ml: ml },
            note: note || null,
          });
          toast.success(`분유 ${ml}ml 기록`);
          onDone();
        } catch {
          toast.error("저장 실패");
        }
      }}
    >
      <Field label="분유량 (ml)">
        <Input
          type="number"
          inputMode="decimal"
          placeholder="예: 120"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {[60, 90, 120, 150, 180, 210].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(String(v))}
              className="h-9 rounded-full border border-border px-3 text-sm hover:bg-accent"
            >
              {v}ml
            </button>
          ))}
        </div>
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
