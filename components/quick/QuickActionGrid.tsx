"use client";

import {
  Baby,
  Milk,
  Droplet,
  Moon,
  Apple,
  Cookie,
  Pill,
  Thermometer,
  Stethoscope,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";
import type { RecordType } from "@/types/domain";

const items: { type: RecordType | "growth"; label: string; Icon: typeof Baby; color: string }[] = [
  { type: "feeding_breast", label: "모유", Icon: Baby, color: "bg-feeding/15 text-feeding" },
  { type: "feeding_bottle", label: "분유", Icon: Milk, color: "bg-feeding/15 text-feeding" },
  { type: "feeding_pumped", label: "유축", Icon: Milk, color: "bg-feeding/15 text-feeding" },
  { type: "diaper", label: "기저귀", Icon: Droplet, color: "bg-diaper/15 text-diaper" },
  { type: "sleep", label: "수면", Icon: Moon, color: "bg-sleep/15 text-sleep" },
  { type: "baby_food", label: "이유식", Icon: Apple, color: "bg-food/15 text-food" },
  { type: "snack", label: "간식", Icon: Cookie, color: "bg-food/15 text-food" },
  { type: "medicine", label: "약", Icon: Pill, color: "bg-medicine/15 text-medicine" },
  { type: "temperature", label: "체온", Icon: Thermometer, color: "bg-health/15 text-health" },
  { type: "health", label: "건강", Icon: Stethoscope, color: "bg-health/15 text-health" },
  { type: "growth", label: "성장", Icon: TrendingUp, color: "bg-growth/15 text-growth" },
  { type: "photo", label: "사진", Icon: ImageIcon, color: "bg-growth/15 text-growth" },
];

export function QuickActionGrid({ onPick }: { onPick: (t: RecordType | "growth") => void }) {
  return (
    <div className="grid grid-cols-4 gap-3 pb-2">
      {items.map(({ type, label, Icon, color }) => (
        <button
          key={type}
          onClick={() => onPick(type)}
          className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card active:scale-95"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
