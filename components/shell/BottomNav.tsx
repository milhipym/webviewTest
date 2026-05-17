"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, TrendingUp, Image as ImageIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { href: "/today", label: "오늘", Icon: Home, match: (p: string) => p === "/today" || p.startsWith("/day/") },
  { href: "/summary", label: "요약", Icon: BarChart3, match: (p: string) => p.startsWith("/summary") },
  { href: "/growth", label: "성장", Icon: TrendingUp, match: (p: string) => p.startsWith("/growth") },
  { href: "/diary", label: "일기", Icon: ImageIcon, match: (p: string) => p.startsWith("/diary") },
  { href: "/settings", label: "설정", Icon: Settings, match: (p: string) => p.startsWith("/settings") },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 safe-bottom">
      <div className="pointer-events-auto mx-auto mb-2 max-w-md px-3">
        <ul className="flex gap-0.5 rounded-full bg-card/85 p-1.5 shadow-soft backdrop-blur-xl">
          {tabs.map(({ href, label, Icon, match }) => {
            const active = match(pathname);
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 rounded-full py-1.5 transition",
                    active
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "drop-shadow")} />
                  <span className="text-[10px] font-semibold">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
