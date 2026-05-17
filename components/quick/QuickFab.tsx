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
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95"
        aria-label="기록 추가"
      >
        <Plus className="h-6 w-6" />
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
