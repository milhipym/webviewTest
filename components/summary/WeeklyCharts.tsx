"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeeklyDayPoint } from "@/lib/records/summary";

function dayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
}

export function WeeklyFeedingChart({ data }: { data: WeeklyDayPoint[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <h3 className="mb-2 text-sm font-medium">주간 수유량 (ml)</h3>
      <div className="h-44">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="date" tickFormatter={dayLabel} fontSize={12} />
            <YAxis fontSize={12} width={32} />
            <Tooltip labelFormatter={(l) => dayLabel(l as string)} />
            <Bar dataKey="feedingMl" fill="hsl(340 82% 65%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WeeklySleepChart({ data }: { data: WeeklyDayPoint[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <h3 className="mb-2 text-sm font-medium">주간 수면 (시간)</h3>
      <div className="h-44">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="date" tickFormatter={dayLabel} fontSize={12} />
            <YAxis fontSize={12} width={32} />
            <Tooltip
              labelFormatter={(l) => dayLabel(l as string)}
              formatter={(v: number) => v.toFixed(1)}
            />
            <Line
              type="monotone"
              dataKey="sleepHours"
              stroke="hsl(220 70% 60%)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function WeeklyDiaperChart({ data }: { data: WeeklyDayPoint[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <h3 className="mb-2 text-sm font-medium">주간 기저귀 (회)</h3>
      <div className="h-44">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="date" tickFormatter={dayLabel} fontSize={12} />
            <YAxis fontSize={12} width={32} />
            <Tooltip labelFormatter={(l) => dayLabel(l as string)} />
            <Bar dataKey="diaperTotal" fill="hsl(45 95% 60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
