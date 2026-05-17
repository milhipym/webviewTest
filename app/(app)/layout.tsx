import { redirect } from "next/navigation";
import { BottomNav } from "@/components/shell/BottomNav";
import { getBaby } from "@/lib/records/queries";
import { getSessionFromCookies } from "@/lib/auth/session";
import { BabyProvider } from "@/components/shell/BabyContext";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/login");
  const baby = await getBaby();

  return (
    <BabyProvider baby={baby}>
      <div className="mx-auto max-w-md">{children}</div>
      <BottomNav />
    </BabyProvider>
  );
}
