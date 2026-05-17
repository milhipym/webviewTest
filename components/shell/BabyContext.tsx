"use client";

import { createContext, useContext } from "react";
import type { Baby } from "@/types/domain";

const Ctx = createContext<Baby | null>(null);

export function BabyProvider({ baby, children }: { baby: Baby | null; children: React.ReactNode }) {
  return <Ctx.Provider value={baby}>{children}</Ctx.Provider>;
}

export function useBaby(): Baby | null {
  return useContext(Ctx);
}

export function useBabyRequired(): Baby {
  const b = useContext(Ctx);
  if (!b) throw new Error("Baby not available in context");
  return b;
}
