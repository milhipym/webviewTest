"use client";

import { ChevronLeft } from "lucide-react";
import type { RecordType } from "@/types/domain";
import { FeedingBreastForm } from "./forms/FeedingBreastForm";
import { FeedingBottleForm } from "./forms/FeedingBottleForm";
import { FeedingPumpedForm } from "./forms/FeedingPumpedForm";
import { DiaperForm } from "./forms/DiaperForm";
import { SleepForm } from "./forms/SleepForm";
import { BabyFoodForm } from "./forms/BabyFoodForm";
import { SnackForm } from "./forms/SnackForm";
import { MedicineForm } from "./forms/MedicineForm";
import { TemperatureForm } from "./forms/TemperatureForm";
import { HealthForm } from "./forms/HealthForm";
import { GrowthForm } from "./forms/GrowthForm";
import { PhotoForm } from "./forms/PhotoForm";

interface Props {
  babyId: string;
  type: RecordType | "growth";
  onBack: () => void;
  onDone: () => void;
}

const titles: Record<RecordType | "growth", string> = {
  feeding_breast: "모유 수유",
  feeding_bottle: "분유",
  feeding_pumped: "유축 모유",
  diaper: "기저귀",
  sleep: "수면",
  baby_food: "이유식",
  snack: "간식",
  medicine: "약",
  temperature: "체온",
  health: "건강",
  photo: "사진",
  growth: "성장 기록",
};

export function RecordSheet({ babyId, type, onBack, onDone }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={onBack}
          className="rounded-md p-2 hover:bg-accent"
          aria-label="뒤로"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-base font-semibold">{titles[type]}</h2>
      </div>
      {type === "feeding_breast" && <FeedingBreastForm babyId={babyId} onDone={onDone} />}
      {type === "feeding_bottle" && <FeedingBottleForm babyId={babyId} onDone={onDone} />}
      {type === "feeding_pumped" && <FeedingPumpedForm babyId={babyId} onDone={onDone} />}
      {type === "diaper" && <DiaperForm babyId={babyId} onDone={onDone} />}
      {type === "sleep" && <SleepForm babyId={babyId} onDone={onDone} />}
      {type === "baby_food" && <BabyFoodForm babyId={babyId} onDone={onDone} />}
      {type === "snack" && <SnackForm babyId={babyId} onDone={onDone} />}
      {type === "medicine" && <MedicineForm babyId={babyId} onDone={onDone} />}
      {type === "temperature" && <TemperatureForm babyId={babyId} onDone={onDone} />}
      {type === "health" && <HealthForm babyId={babyId} onDone={onDone} />}
      {type === "growth" && <GrowthForm babyId={babyId} onDone={onDone} />}
      {type === "photo" && <PhotoForm babyId={babyId} onDone={onDone} />}
    </div>
  );
}
