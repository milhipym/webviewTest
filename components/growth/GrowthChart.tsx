"use client";

import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { percentileSeries, metricKey, metricLabel, type Metric, type Sex } from "@/lib/growth/whoLms";
import type { GrowthMeasurement, Gender } from "@/types/domain";
import { parseISO } from "date-fns";

function monthsBetween(birthIso: string, atIso: string): number {
  const a = parseISO(birthIso);
  const b = parseISO(atIso);
  return (b.getTime() - a.getTime()) / (30.4375 * 86400000);
}

export function GrowthChart({
  metric,
  gender,
  birthdate,
  measurements,
}: {
  metric: Metric;
  gender: Gender;
  birthdate: string;
  measurements: GrowthMeasurement[];
}) {
  const sex: Sex = gender === "F" ? "F" : "M"; // 'U' falls back to boys reference
  const ref = useMemo(() => percentileSeries(metric, sex, 24), [metric, sex]);
  const key = metricKey(metric);
  const points = useMemo(
    () =>
      measurements
        .filter((m) => m[key] != null)
        .map((m) => ({
          month: +monthsBetween(birthdate, m.measured_at).toFixed(2),
          value: Number(m[key]),
        }))
        .filter((p) => p.month >= 0 && p.month <= 24),
    [measurements, key, birthdate],
  );

  const merged = ref.map((r) => ({
    ...r,
    band_low: r.p3,
    band_mid: r.p15,
    band_top: r.p85,
    band_hi: r.p97,
  }));

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <h3 className="mb-2 text-sm font-medium">{metricLabel(metric)} · 0~24개월</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <ComposedChart data={merged}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" fontSize={11} tick={{ fontSize: 11 }} label={{ value: "개월", position: "insideBottom", offset: -2, fontSize: 11 }} />
            <YAxis fontSize={11} width={36} />
            <Tooltip />
            <Area dataKey="p97" stroke="none" fill="hsl(340 82% 65% / 0.06)" />
            <Area dataKey="p85" stroke="none" fill="hsl(340 82% 65% / 0.1)" />
            <Area dataKey="p50" stroke="hsl(340 82% 65% / 0.5)" strokeWidth={1.5} fill="none" />
            <Area dataKey="p15" stroke="none" fill="transparent" />
            <Area dataKey="p3" stroke="hsl(340 82% 65% / 0.3)" strokeDasharray="3 3" fill="none" />
            <Line
              data={points}
              dataKey="value"
              type="monotone"
              stroke="hsl(160 70% 40%)"
              strokeWidth={2.5}
              dot={{ r: 5, fill: "hsl(160 70% 40%)" }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">
        분홍 영역: WHO 백분위 (P3 / P50 / P97), 초록 선: 측정값
      </p>
    </div>
  );
}
