"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { insertGrowth } from "@/lib/records/repository";
import {
  Field,
  FormShell,
  NoteField,
  StartedAtField,
  inputToIso,
  nowLocalInput,
} from "./FormCommon";

export function GrowthForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [head, setHead] = useState("");
  const [measuredAt, setMeasuredAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  const valid = !!(height || weight || head);
  return (
    <FormShell
      disabled={!valid}
      onSubmit={async () => {
        if (!valid) {
          toast.error("최소 한 항목은 입력하세요");
          return;
        }
        await insertGrowth({
          baby_id: babyId,
          measured_at: inputToIso(measuredAt),
          height_cm: height ? Number(height) : null,
          weight_kg: weight ? Number(weight) : null,
          head_cm: head ? Number(head) : null,
          note: note || null,
        });
        toast.success("성장 기록");
        onDone();
      }}
    >
      <Field label="키 (cm)">
        <Input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="예: 60.5"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Field>
      <Field label="몸무게 (kg)">
        <Input
          type="number"
          step="0.01"
          inputMode="decimal"
          placeholder="예: 6.20"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <Field label="머리둘레 (cm)">
        <Input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="예: 41.5"
          value={head}
          onChange={(e) => setHead(e.target.value)}
        />
      </Field>
      <StartedAtField value={measuredAt} onChange={setMeasuredAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
