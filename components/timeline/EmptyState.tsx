export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-3 text-5xl">🌸</div>
      <p className="text-sm font-semibold">아직 기록이 없어요</p>
      <p className="mt-1 text-xs text-muted-foreground">
        오른쪽 아래 + 버튼을 눌러 첫 기록을 시작해보세요
      </p>
    </div>
  );
}
