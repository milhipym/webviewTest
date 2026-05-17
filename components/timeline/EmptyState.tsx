export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center text-muted-foreground">
      <div className="mb-3 text-4xl">📝</div>
      <p className="text-sm">아직 기록이 없어요</p>
      <p className="mt-1 text-xs">오른쪽 아래 + 버튼으로 기록해보세요</p>
    </div>
  );
}
