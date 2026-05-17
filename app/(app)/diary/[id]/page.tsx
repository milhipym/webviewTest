import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Photo } from "@/types/domain";
import { fmtDateFull } from "@/lib/time/format";

export const dynamic = "force-dynamic";

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = await getServerSupabase();
  const { data: photo } = await sb
    .from("photos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!photo) notFound();
  const p = photo as Photo;

  const { data: signed } = await sb.storage
    .from("baby-photos")
    .createSignedUrl(p.storage_path, 60 * 60);
  if (!signed?.signedUrl) redirect("/diary");

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/95 px-3 py-3 safe-top">
        <Link href="/diary" className="rounded-md p-2 hover:bg-accent" aria-label="뒤로">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">{fmtDateFull(p.taken_at)}</h1>
      </header>
      <div className="bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={signed.signedUrl} alt={p.note ?? "사진"} className="w-full" />
      </div>
      {p.note && <p className="px-4 py-3 text-sm">{p.note}</p>}
    </>
  );
}
