"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body.error ?? "코드가 올바르지 않습니다");
        return;
      }
      const to = params.get("from") ?? "/today";
      router.replace(to);
      router.refresh();
    } catch {
      toast.error("로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-mesh px-6 safe-top safe-bottom">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-rose-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-peach-200/60 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-lavender-100/60 blur-2xl" />

      <div className="relative z-10 w-full max-w-sm space-y-8">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-warm shadow-glow animate-float">
            <span className="text-5xl">🍼</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-balance">
            우리 아기 하루
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            함께 기록하는 따뜻한 시간들
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={onSubmit}
          className="space-y-3 rounded-3xl bg-card/80 p-5 shadow-soft backdrop-blur"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              가족 공유 코드
            </span>
            <Input
              type="password"
              placeholder="••••••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
              inputMode="text"
              autoComplete="current-password"
              className="h-14 rounded-2xl border-0 bg-secondary text-base"
            />
          </label>
          <Button
            type="submit"
            size="lg"
            className="h-14 w-full rounded-2xl bg-gradient-primary text-base font-semibold shadow-glow"
            disabled={loading || !code}
          >
            {loading ? "확인 중..." : "들어가기"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          공유 코드는 가족에게 받아 입력하세요 💕
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
