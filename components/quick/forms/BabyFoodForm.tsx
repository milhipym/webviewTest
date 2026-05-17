"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { insertRecord } from "@/lib/records/repository";
import {
  ChipGroup,
  Field,
  FormShell,
  NoteField,
  StartedAtField,
  inputToIso,
  nowLocalInput,
} from "./FormCommon";

export function BabyFoodForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"g" | "ml">("g");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      disabled={!food}
      onSubmit={async () => {
        const iso = inputToIso(startedAt);
        await insertRecord({
          baby_id: babyId,
          type: "baby_food",
          started_at: iso,
          ended_at: iso,
          data: { food, amount: amount ? Number(amount) : undefined, unit },
          note: note || null,
        });
        toast.success("이유식 기록");
        onDone();
      }}
    >
      <Field label="음식">
        <Input
          placeholder="예: 미음, 고구마"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          autoFocus
        />
      </Field>
      <Field label="양">
        <div className="flex gap-2">
          <Input
            type="number"
            inputMode="decimal"
            placeholder="(선택)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
          />
          <ChipGroup
            options={[
              { value: "g", label: "g" },
              { value: "ml", label: "ml" },
            ]}
            value={unit}
            onChange={setUnit}
          />
        </div>
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
