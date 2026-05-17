"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label = theme === "light" ? "라이트" : theme === "dark" ? "다크" : "자동";
  return (
    <Button variant="outline" onClick={() => setTheme(next)} className="gap-2">
      <Icon className="h-4 w-4" />
      <span>테마: {label}</span>
    </Button>
  );
}
