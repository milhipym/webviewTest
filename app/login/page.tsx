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
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 safe-top safe-bottom">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-2 text-5xl">🍼</div>
          <h1 className="text-2xl font-bold">베이비로그</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            우리 가족 육아 기록
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            type="password"
            placeholder="가족 공유 코드"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
            inputMode="text"
            autoComplete="current-password"
          />
          <Button type="submit" size="lg" className="w-full" disabled={loading || !code}>
            {loading ? "확인 중..." : "들어가기"}
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground">
          공유 코드는 가족에게 받아 입력하세요
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
