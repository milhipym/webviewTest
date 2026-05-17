import { redirect } from "next/navigation";
import { BabyForm } from "@/components/shell/BabyForm";
import { getBaby } from "@/lib/records/queries";
import { getHouseholdId } from "@/lib/auth/session";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BabySettingsPage() {
  const hid = await getHouseholdId();
  if (!hid) redirect("/login");
  const baby = await getBaby();
  return (
    <>
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/95 px-3 py-3 safe-top">
        <Link href="/settings" className="rounded-md p-2 hover:bg-accent">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">아기 정보</h1>
      </header>
      <div className="px-4 py-4">
        <BabyForm initial={baby} householdId={hid} />
      </div>
    </>
  );
}
