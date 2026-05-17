import { redirect } from "next/navigation";
import { getBaby, getPhotos } from "@/lib/records/queries";
import { PhotoGrid } from "@/components/diary/PhotoGrid";

export const dynamic = "force-dynamic";

export default async function DiaryPage() {
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");
  const photos = await getPhotos(baby.id);

  return (
    <div className="min-h-dvh bg-mesh pb-28">
      <header className="sticky top-0 z-20 glass border-b border-border/50 safe-top">
        <div className="px-5 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">사진 일기</h1>
          <p className="text-xs text-muted-foreground">📸 {baby.name}의 순간들</p>
        </div>
      </header>
      <PhotoGrid photos={photos} />
    </div>
  );
}
