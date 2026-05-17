"use client";

import type { RecordType } from "@/types/domain";

interface Item {
  type: RecordType | "growth";
  label: string;
  emoji: string;
  bg: string;
}

const items: Item[] = [
  { type: "feeding_breast", label: "모유", emoji: "🤱", bg: "bg-rose-100" },
  { type: "feeding_bottle", label: "분유", emoji: "🍼", bg: "bg-rose-100" },
  { type: "feeding_pumped", label: "유축", emoji: "🥛", bg: "bg-rose-100" },
  { type: "diaper", label: "기저귀", emoji: "💧", bg: "bg-butter-100" },
  { type: "sleep", label: "수면", emoji: "😴", bg: "bg-lavender-100" },
  { type: "baby_food", label: "이유식", emoji: "🥣", bg: "bg-peach-100" },
  { type: "snack", label: "간식", emoji: "🍪", bg: "bg-peach-100" },
  { type: "medicine", label: "약", emoji: "💊", bg: "bg-lavender-50" },
  { type: "temperature", label: "체온", emoji: "🌡️", bg: "bg-rose-50" },
  { type: "health", label: "건강", emoji: "🏥", bg: "bg-rose-50" },
  { type: "growth", label: "성장", emoji: "📏", bg: "bg-mint-100" },
  { type: "photo", label: "사진", emoji: "📸", bg: "bg-lavender-100" },
];

export function QuickActionGrid({ onPick }: { onPick: (t: RecordType | "growth") => void }) {
  return (
    <div>
      <p className="mb-3 text-center text-xs text-muted-foreground">
        무엇을 기록할까요? ✨
      </p>
      <div className="grid grid-cols-4 gap-2.5 pb-2">
        {items.map(({ type, label, emoji, bg }) => (
          <button
            key={type}
            onClick={() => onPick(type)}
            className="group flex flex-col items-center gap-1.5 rounded-2xl bg-card p-2 shadow-card transition active:scale-95"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} text-3xl shadow-card transition group-hover:scale-105`}>
              {emoji}
            </div>
            <span className="text-xs font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
