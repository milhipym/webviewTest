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

export function FeedingPumpedForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
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
        await insertRecord({
          baby_id: babyId,
          type: "feeding_pumped",
          started_at: iso,
          ended_at: iso,
          data: { amount_ml: ml },
          note: note || null,
        });
        toast.success(`유축 모유 ${ml}ml`);
        onDone();
      }}
    >
      <Field label="유축 모유량 (ml)">
        <Input
          type="number"
          inputMode="decimal"
          placeholder="예: 80"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
