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
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur safe-bottom">
      <ul className="mx-auto flex max-w-md">
        {tabs.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
