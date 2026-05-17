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
import type { TempSite } from "@/types/domain";

export function TemperatureForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [temp, setTemp] = useState("");
  const [site, setSite] = useState<TempSite>("ear");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  return (
    <FormShell
      disabled={!temp}
      onSubmit={async () => {
        const t = Number(temp);
        if (!t) {
          toast.error("체온을 입력하세요");
          return;
        }
        const iso = inputToIso(startedAt);
        await insertRecord({
          baby_id: babyId,
          type: "temperature",
          started_at: iso,
          ended_at: iso,
          data: { temp_c: t, site },
          note: note || null,
        });
        toast.success(`${t}°C 기록`);
        onDone();
      }}
    >
      <Field label="체온 (°C)">
        <Input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="예: 36.8"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          autoFocus
        />
      </Field>
      <Field label="측정 부위">
        <ChipGroup
          options={[
            { value: "ear", label: "귀" },
            { value: "forehead", label: "이마" },
            { value: "armpit", label: "겨드랑이" },
            { value: "rectal", label: "직장" },
          ]}
          value={site}
          onChange={setSite}
        />
      </Field>
      <StartedAtField value={startedAt} onChange={setStartedAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
