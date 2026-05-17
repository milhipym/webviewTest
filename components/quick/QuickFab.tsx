"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { QuickActionGrid } from "./QuickActionGrid";
import { RecordSheet } from "./RecordSheet";
import type { RecordType } from "@/types/domain";

export function QuickFab({ babyId }: { babyId: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<RecordType | "growth" | null>(null);

  return (
    <>
      <button
        onClick={() => {
          setSelected(null);
          setOpen(true);
        }}
        className="fixed bottom-24 right-4 z-30 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-glow transition active:scale-90"
        aria-label="기록 추가"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent title={selected ? undefined : "기록 추가"}>
          {selected ? (
            <RecordSheet
              babyId={babyId}
              type={selected}
              onBack={() => setSelected(null)}
              onDone={() => setOpen(false)}
            />
          ) : (
            <QuickActionGrid onPick={setSelected} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
