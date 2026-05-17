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
import type { HealthKind } from "@/types/domain";

export function HealthForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [kind, setKind] = useState<HealthKind>("vomit");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      onSubmit={async () => {
        const iso = inputToIso(startedAt);
        await insertRecord({
          baby_id: babyId,
          type: "health",
          started_at: iso,
          ended_at: iso,
          data: { kind },
          note: note || null,
        });
        toast.success("건강 기록");
        onDone();
      }}
    >
      <Field label="항목">
        <ChipGroup
          options={[
            { value: "vomit", label: "구토" },
            { value: "rash", label: "발진" },
            { value: "cough", label: "기침" },
            { value: "hospital", label: "병원" },
            { value: "other", label: "기타" },
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
