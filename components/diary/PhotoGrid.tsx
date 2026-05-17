"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import type { Photo } from "@/types/domain";
import { fmtDateKorean } from "@/lib/time/format";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const sb = getBrowserSupabase();
      const entries: Record<string, string> = {};
      await Promise.all(
        photos.map(async (p) => {
          const { data } = await sb.storage
            .from("baby-photos")
            .createSignedUrl(p.storage_path, 60 * 60);
          if (data?.signedUrl) entries[p.id] = data.signedUrl;
        }),
      );
      if (alive) setUrls(entries);
    })();
    return () => {
      alive = false;
    };
  }, [photos]);

  if (photos.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-sm text-muted-foreground">
        아직 사진이 없어요
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {photos.map((p) => (
        <Link
          key={p.id}
          href={`/diary/${p.id}`}
          className="relative aspect-square overflow-hidden bg-muted"
        >
          {urls[p.id] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urls[p.id]}
              alt={p.note ?? "사진"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-muted" />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1 py-0.5">
            <p className="text-[10px] text-white">{fmtDateKorean(p.taken_at)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
