"use client";

import { useState } from "react";
import { toast } from "sonner";
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
import type { DiaperKind } from "@/types/domain";

export function DiaperForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [kind, setKind] = useState<DiaperKind>("pee");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      onSubmit={async () => {
        const iso = inputToIso(startedAt);
        await insertRecord({
          baby_id: babyId,
          type: "diaper",
          started_at: iso,
          ended_at: iso,
          data: { kind },
          note: note || null,
        });
        toast.success("기저귀 기록");
        onDone();
      }}
    >
      <Field label="종류">
        <ChipGroup
          options={[
            { value: "pee", label: "소변" },
            { value: "poo", label: "대변" },
            { value: "mixed", label: "혼합" },
          ]}
          value={kind}
          onChange={setKind}
        />
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
