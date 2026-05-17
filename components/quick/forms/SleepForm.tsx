"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { insertRecord } from "@/lib/records/repository";
import {
  Field,
  FormShell,
  NoteField,
  StartedAtField,
  inputToIso,
  nowLocalInput,
} from "./FormCommon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SleepForm({ babyId, onDone }: { babyId: string; onDone: () => void }) {
  const [mode, setMode] = useState<"now" | "manual">("now");
  const [startedAt, setStartedAt] = useState(nowLocalInput());
  const [endedAt, setEndedAt] = useState("");
  const [note, setNote] = useState("");

  async function startNow() {
    await insertRecord({
      baby_id: babyId,
      type: "sleep",
      started_at: new Date().toISOString(),
      ended_at: null,
      data: {},
      note: note || null,
    });
    toast.success("수면 시작");
    onDone();
  }

  return (
    <Tabs value={mode} onValueChange={(v) => setMode(v as "now" | "manual")}>
      <TabsList>
        <TabsTrigger value="now">지금 시작</TabsTrigger>
        <TabsTrigger value="manual">시간 직접 입력</TabsTrigger>
      </TabsList>
      <TabsContent value="now">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            지금 수면을 시작하고, 깨면 상단 배너의 "종료" 버튼을 누르세요.
          </p>
          <NoteField value={note} onChange={setNote} />
          <Button type="button" size="lg" className="w-full" onClick={startNow}>
            수면 시작
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="manual">
        <FormShell
          disabled={!endedAt}
          onSubmit={async () => {
            const s = inputToIso(startedAt);
            const e = inputToIso(endedAt);
            if (new Date(e).getTime() <= new Date(s).getTime()) {
              toast.error("종료 시간이 시작보다 늦어야 합니다");
              return;
            }
            await insertRecord({
              baby_id: babyId,
              type: "sleep",
              started_at: s,
              ended_at: e,
              data: {},
              note: note || null,
            });
            toast.success("수면 기록");
            onDone();
          }}
        >
          <StartedAtField value={startedAt} onChange={setStartedAt} />
          <Field label="종료 시간">
            <input
              type="datetime-local"
              value={endedAt}
              onChange={(e) => setEndedAt(e.target.value)}
              className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base"
            />
          </Field>
          <NoteField value={note} onChange={setNote} />
        </FormShell>
      </TabsContent>
    </Tabs>
  );
}
