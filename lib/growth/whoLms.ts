// WHO Child Growth Standards: condensed LMS values for ages 0-24 months.
// Source: https://www.who.int/tools/child-growth-standards/standards (public domain)
// L, M, S parameters per age (month). For each metric, we ship monthly samples.
// Computation: value at z = M * (1 + L*S*z)^(1/L) (when L != 0).

export type Sex = "M" | "F";
export type Metric = "weight" | "height" | "head";

interface LMS {
  month: number;
  L: number;
  M: number;
  S: number;
}

// Boys weight-for-age (kg), 0–24 mo  (selected reference points)
const W_BOYS: LMS[] = [
  { month: 0, L: 0.3487, M: 3.3464, S: 0.14602 },
  { month: 1, L: 0.2297, M: 4.4709, S: 0.13395 },
  { month: 2, L: 0.197, M: 5.5675, S: 0.12385 },
  { month: 3, L: 0.1738, M: 6.3762, S: 0.11727 },
  { month: 4, L: 0.1553, M: 7.0023, S: 0.11316 },
  { month: 5, L: 0.1395, M: 7.5105, S: 0.11080 },
  { month: 6, L: 0.1257, M: 7.9340, S: 0.10958 },
  { month: 7, L: 0.1134, M: 8.297, S: 0.1092 },
  { month: 8, L: 0.1021, M: 8.617, S: 0.1093 },
  { month: 9, L: 0.0917, M: 8.905, S: 0.1097 },
  { month: 10, L: 0.082, M: 9.166, S: 0.1103 },
  { month: 11, L: 0.073, M: 9.408, S: 0.1111 },
  { month: 12, L: 0.0644, M: 9.6479, S: 0.11135 },
  { month: 15, L: 0.041, M: 10.297, S: 0.1124 },
  { month: 18, L: 0.018, M: 10.940, S: 0.1134 },
  { month: 21, L: -0.004, M: 11.522, S: 0.1145 },
  { month: 24, L: -0.0241, M: 12.1515, S: 0.11611 },
];

const W_GIRLS: LMS[] = [
  { month: 0, L: 0.3809, M: 3.2322, S: 0.14171 },
  { month: 1, L: 0.1714, M: 4.1873, S: 0.13724 },
  { month: 2, L: 0.0962, M: 5.1282, S: 0.13 },
  { month: 3, L: 0.0402, M: 5.8458, S: 0.124 },
  { month: 4, L: -0.005, M: 6.4237, S: 0.121 },
  { month: 5, L: -0.0430, M: 6.8985, S: 0.118 },
  { month: 6, L: -0.0756, M: 7.297, S: 0.117 },
  { month: 7, L: -0.1039, M: 7.640, S: 0.116 },
  { month: 8, L: -0.1288, M: 7.943, S: 0.115 },
  { month: 9, L: -0.1507, M: 8.218, S: 0.115 },
  { month: 10, L: -0.17, M: 8.471, S: 0.115 },
  { month: 11, L: -0.187, M: 8.708, S: 0.115 },
  { month: 12, L: -0.2024, M: 8.9481, S: 0.11628 },
  { month: 15, L: -0.241, M: 9.589, S: 0.1175 },
  { month: 18, L: -0.273, M: 10.225, S: 0.1185 },
  { month: 21, L: -0.301, M: 10.821, S: 0.1192 },
  { month: 24, L: -0.3275, M: 11.4775, S: 0.12027 },
];

// Boys length-for-age (cm), 0–24 mo
const H_BOYS: LMS[] = [
  { month: 0, L: 1, M: 49.8842, S: 0.03795 },
  { month: 1, L: 1, M: 54.7244, S: 0.03557 },
  { month: 2, L: 1, M: 58.4249, S: 0.03424 },
  { month: 3, L: 1, M: 61.4292, S: 0.03328 },
  { month: 4, L: 1, M: 63.886, S: 0.03257 },
  { month: 5, L: 1, M: 65.9026, S: 0.03204 },
  { month: 6, L: 1, M: 67.6236, S: 0.03165 },
  { month: 9, L: 1, M: 72.0, S: 0.0309 },
  { month: 12, L: 1, M: 75.7488, S: 0.03057 },
  { month: 18, L: 1, M: 82.258, S: 0.03035 },
  { month: 24, L: 1, M: 87.8161, S: 0.03139 },
];

const H_GIRLS: LMS[] = [
  { month: 0, L: 1, M: 49.1477, S: 0.0379 },
  { month: 1, L: 1, M: 53.6872, S: 0.0364 },
  { month: 2, L: 1, M: 57.0673, S: 0.0353 },
  { month: 3, L: 1, M: 59.8029, S: 0.0344 },
  { month: 4, L: 1, M: 62.0899, S: 0.0337 },
  { month: 5, L: 1, M: 64.0301, S: 0.0331 },
  { month: 6, L: 1, M: 65.7311, S: 0.0327 },
  { month: 9, L: 1, M: 70.1, S: 0.032 },
  { month: 12, L: 1, M: 74.0149, S: 0.0316 },
  { month: 18, L: 1, M: 80.7039, S: 0.0316 },
  { month: 24, L: 1, M: 86.4093, S: 0.0327 },
];

// Boys head circumference (cm)
const HC_BOYS: LMS[] = [
  { month: 0, L: 1, M: 34.4618, S: 0.03686 },
  { month: 1, L: 1, M: 37.2759, S: 0.0314 },
  { month: 2, L: 1, M: 39.1285, S: 0.0292 },
  { month: 3, L: 1, M: 40.5135, S: 0.028 },
  { month: 6, L: 1, M: 43.2618, S: 0.0263 },
  { month: 12, L: 1, M: 45.7768, S: 0.0247 },
  { month: 18, L: 1, M: 47.0762, S: 0.024 },
  { month: 24, L: 1, M: 47.8678, S: 0.0237 },
];

const HC_GIRLS: LMS[] = [
  { month: 0, L: 1, M: 33.8787, S: 0.03496 },
  { month: 1, L: 1, M: 36.5463, S: 0.0316 },
  { month: 2, L: 1, M: 38.2521, S: 0.0298 },
  { month: 3, L: 1, M: 39.5328, S: 0.0286 },
  { month: 6, L: 1, M: 42.1131, S: 0.0271 },
  { month: 12, L: 1, M: 44.4521, S: 0.0257 },
  { month: 18, L: 1, M: 45.6651, S: 0.025 },
  { month: 24, L: 1, M: 46.3922, S: 0.0247 },
];

function lmsTable(metric: Metric, sex: Sex): LMS[] {
  if (metric === "weight") return sex === "M" ? W_BOYS : W_GIRLS;
  if (metric === "height") return sex === "M" ? H_BOYS : H_GIRLS;
  return sex === "M" ? HC_BOYS : HC_GIRLS;
}

function interpolate(table: LMS[], month: number): LMS {
  if (month <= table[0].month) return table[0];
  if (month >= table[table.length - 1].month) return table[table.length - 1];
  for (let i = 1; i < table.length; i++) {
    if (month <= table[i].month) {
      const a = table[i - 1];
      const b = table[i];
      const t = (month - a.month) / (b.month - a.month);
      return {
        month,
        L: a.L + (b.L - a.L) * t,
        M: a.M + (b.M - a.M) * t,
        S: a.S + (b.S - a.S) * t,
      };
    }
  }
  return table[table.length - 1];
}

function lmsValue(lms: LMS, z: number): number {
  if (Math.abs(lms.L) < 1e-6) return lms.M * Math.exp(lms.S * z);
  return lms.M * Math.pow(1 + lms.L * lms.S * z, 1 / lms.L);
}

export interface PercentileSeriesPoint {
  month: number;
  p3: number;
  p15: number;
  p50: number;
  p85: number;
  p97: number;
}

const Z = { p3: -1.881, p15: -1.036, p50: 0, p85: 1.036, p97: 1.881 };

export function percentileSeries(
  metric: Metric,
  sex: Sex,
  maxMonths = 24,
): PercentileSeriesPoint[] {
  const table = lmsTable(metric, sex);
  const out: PercentileSeriesPoint[] = [];
  for (let m = 0; m <= maxMonths; m++) {
    const lms = interpolate(table, m);
    out.push({
      month: m,
      p3: +lmsValue(lms, Z.p3).toFixed(2),
      p15: +lmsValue(lms, Z.p15).toFixed(2),
      p50: +lmsValue(lms, Z.p50).toFixed(2),
      p85: +lmsValue(lms, Z.p85).toFixed(2),
      p97: +lmsValue(lms, Z.p97).toFixed(2),
    });
  }
  return out;
}

export function metricKey(metric: Metric): "weight_kg" | "height_cm" | "head_cm" {
  if (metric === "weight") return "weight_kg";
  if (metric === "height") return "height_cm";
  return "head_cm";
}

export function metricLabel(metric: Metric): string {
  if (metric === "weight") return "몸무게 (kg)";
  if (metric === "height") return "키 (cm)";
  return "머리둘레 (cm)";
}
