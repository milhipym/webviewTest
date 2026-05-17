"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, ChipGroup } from "@/components/quick/forms/FormCommon";
import { getBrowserSupabase } from "@/lib/supabase/client";
import type { Baby, Gender } from "@/types/domain";

export function BabyForm({ initial, householdId }: { initial: Baby | null; householdId: string }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [birthdate, setBirthdate] = useState(initial?.birthdate ?? "");
  const [gender, setGender] = useState<Gender>(initial?.gender ?? "U");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name || !birthdate) {
      toast.error("이름과 생년월일을 입력하세요");
      return;
    }
    setSaving(true);
    const sb = getBrowserSupabase();
    try {
      if (initial) {
        const { error } = await sb
          .from("babies")
          .update({ name, birthdate, gender })
          .eq("id", initial.id);
        if (error) throw error;
      } else {
        const { error } = await sb
          .from("babies")
          .insert({ household_id: householdId, name, birthdate, gender });
        if (error) throw error;
      }
      toast.success("저장했습니다");
      router.push("/settings");
      router.refresh();
    } catch (e: unknown) {
      console.error(e);
      toast.error("저장 실패");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Field label="이름">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="아기 이름" />
      </Field>
      <Field label="생년월일">
        <Input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </Field>
      <Field label="성별">
        <ChipGroup
          options={[
            { value: "M", label: "남아" },
            { value: "F", label: "여아" },
            { value: "U", label: "미정" },
          ]}
          value={gender}
          onChange={setGender}
        />
      </Field>
      <Button size="lg" className="w-full" onClick={save} disabled={saving}>
        {saving ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
}
