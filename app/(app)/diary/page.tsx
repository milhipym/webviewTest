import { redirect } from "next/navigation";
import { getBaby, getPhotos } from "@/lib/records/queries";
import { PhotoGrid } from "@/components/diary/PhotoGrid";

export const dynamic = "force-dynamic";

export default async function DiaryPage() {
  const baby = await getBaby();
  if (!baby) redirect("/settings/baby");
  const photos = await getPhotos(baby.id);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 safe-top">
        <h1 className="text-lg font-semibold">사진 일기</h1>
        <p className="text-xs text-muted-foreground">{baby.name}</p>
      </header>
      <PhotoGrid photos={photos} />
    </>
  );
}
