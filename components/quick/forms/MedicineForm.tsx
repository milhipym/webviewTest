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

export function MedicineForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      disabled={!name}
      onSubmit={async () => {
        const iso = inputToIso(startedAt);
        await insertRecord({
          baby_id: babyId,
          type: "medicine",
          started_at: iso,
          ended_at: iso,
          data: { name, dose },
          note: note || null,
        });
        toast.success("약 기록");
        onDone();
      }}
    >
      <Field label="약 이름">
        <Input
          placeholder="예: 해열제"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </Field>
      <Field label="용량 (선택)">
        <Input
          placeholder="예: 1.5ml"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
        />
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
