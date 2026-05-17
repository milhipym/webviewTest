"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getBrowserSupabase, getCurrentHouseholdId } from "@/lib/supabase/client";
import { insertPhoto, insertRecord } from "@/lib/records/repository";
import {
  Field,
  FormShell,
  NoteField,
  StartedAtField,
  inputToIso,
  nowLocalInput,
} from "./FormCommon";

export function PhotoForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [takenAt, setTakenAt] = useState(nowLocalInput());
  const [note, setNote] = useState("");

  async function upload(file: File): Promise<string> {
    const hid = getCurrentHouseholdId();
    if (!hid) throw new Error("no household id");
    const sb = getBrowserSupabase();
    const now = new Date();
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const path = `${hid}/${babyId}/${now.getFullYear()}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb.storage.from("baby-photos").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    return path;
  }

  return (
    <FormShell
      disabled={!file}
      submitLabel="업로드"
      onSubmit={async () => {
        if (!file) return;
        try {
          const path = await upload(file);
          const iso = inputToIso(takenAt);
          await insertPhoto({
            baby_id: babyId,
            taken_at: iso,
            storage_path: path,
            note: note || null,
          });
          await insertRecord({
            baby_id: babyId,
            type: "photo",
            started_at: iso,
            ended_at: iso,
            data: { storage_path: path },
            note: note || null,
          });
          toast.success("사진 저장");
          onDone();
        } catch (e) {
          console.error(e);
          toast.error("업로드 실패");
        }
      }}
    >
      <Field label="사진">
        <Input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </Field>
      <StartedAtField value={takenAt} onChange={setTakenAt} />
      <NoteField value={note} onChange={setNote} />
    </FormShell>
  );
}
