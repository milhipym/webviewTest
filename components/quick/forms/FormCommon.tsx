"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils/cn";

export interface FormShellProps {
  children: React.ReactNode;
  onSubmit: () => Promise<void> | void;
  submitLabel?: string;
  disabled?: boolean;
}

export function FormShell({ children, onSubmit, submitLabel = "저장", disabled }: FormShellProps) {
  const [saving, setSaving] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        try {
          await onSubmit();
          if (navigator.vibrate) navigator.vibrate(20);
        } finally {
          setSaving(false);
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-4">{children}</div>
      <Button type="submit" size="lg" className="w-full" disabled={saving || disabled}>
        {saving ? "저장 중..." : submitLabel}
      </Button>
    </form>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function NoteField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label="메모">
      <Textarea
        placeholder="(선택) 메모"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function StartedAtField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label="시간">
      <Input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function nowLocalInput(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function inputToIso(local: string): string {
  // local format: YYYY-MM-DDTHH:mm (no TZ) -- interpret as local time
  return new Date(local).toISOString();
}

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "h-11 rounded-full border px-4 text-sm",
            value === o.value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
