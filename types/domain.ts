export type Gender = "M" | "F" | "U";

export type RecordType =
  | "feeding_breast"
  | "feeding_bottle"
  | "feeding_pumped"
  | "diaper"
  | "sleep"
  | "baby_food"
  | "snack"
  | "medicine"
  | "temperature"
  | "health"
  | "photo";

export const FEEDING_TYPES: RecordType[] = [
  "feeding_breast",
  "feeding_bottle",
  "feeding_pumped",
];

export type DiaperKind = "pee" | "poo" | "mixed";
export type BreastSide = "L" | "R" | "both";
export type TempSite = "ear" | "forehead" | "armpit" | "rectal";
export type HealthKind = "vomit" | "rash" | "cough" | "hospital" | "other";

export type FeedingBreastData = {
  side: BreastSide;
  duration_l_sec?: number;
  duration_r_sec?: number;
};
export type FeedingBottleData = { amount_ml: number };
export type FeedingPumpedData = { amount_ml: number };
export type DiaperData = { kind: DiaperKind };
export type SleepData = Record<string, never>;
export type BabyFoodData = { food: string; amount?: number; unit?: "g" | "ml" };
export type SnackData = { food: string; amount?: number; unit?: "g" | "ml" };
export type MedicineData = { name: string; dose?: string };
export type TemperatureData = { temp_c: number; site?: TempSite };
export type HealthData = { kind: HealthKind };
export type PhotoData = { storage_path?: string; photo_id?: string };

export type RecordData =
  | FeedingBreastData
  | FeedingBottleData
  | FeedingPumpedData
  | DiaperData
  | SleepData
  | BabyFoodData
  | SnackData
  | MedicineData
  | TemperatureData
  | HealthData
  | PhotoData;

export interface BabyRecord {
  id: string;
  baby_id: string;
  household_id: string;
  type: RecordType;
  started_at: string;
  ended_at: string | null;
  data: RecordData;
  note: string | null;
  created_by_device: string | null;
  created_at: string;
  updated_at: string;
}

export interface Baby {
  id: string;
  household_id: string;
  name: string;
  birthdate: string;
  gender: Gender;
  photo_url: string | null;
  created_at: string;
}

export interface Household {
  id: string;
  display_name: string | null;
  created_at: string;
}

export interface GrowthMeasurement {
  id: string;
  baby_id: string;
  household_id: string;
  measured_at: string;
  height_cm: number | null;
  weight_kg: number | null;
  head_cm: number | null;
  note: string | null;
  created_at: string;
}

export interface Photo {
  id: string;
  baby_id: string;
  household_id: string;
  taken_at: string;
  storage_path: string;
  note: string | null;
  created_at: string;
}

export const RECORD_LABELS: Record<RecordType, string> = {
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
};

export const DIAPER_LABELS: Record<DiaperKind, string> = {
  pee: "소변",
  poo: "대변",
  mixed: "혼합",
};

export const HEALTH_LABELS: Record<HealthKind, string> = {
  vomit: "구토",
  rash: "발진",
  cough: "기침",
  hospital: "병원",
  other: "기타",
};

export const TEMP_SITE_LABELS: Record<TempSite, string> = {
  ear: "귀",
  forehead: "이마",
  armpit: "겨드랑이",
  rectal: "직장",
};
