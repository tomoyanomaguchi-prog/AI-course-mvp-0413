/** JST 相当の日付キー YYYY-MM-DD（ローカル日付） */
export function todayLocalDateString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysUntil(nextIsoDate: string): number {
  const today = new Date(todayLocalDateString() + "T12:00:00");
  const target = new Date(nextIsoDate + "T12:00:00");
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export type BadgeKind = "urgent" | "soon" | "ok";

export function badgeForNextPurchase(nextIsoDate: string): BadgeKind {
  const d = daysUntil(nextIsoDate);
  if (d < 0) return "urgent";
  if (d <= 3) return "soon";
  return "ok";
}

export function badgeLabel(kind: BadgeKind): string {
  switch (kind) {
    case "urgent":
      return "要確認";
    case "soon":
      return "そろそろ";
    default:
      return "余裕";
  }
}

/** 今日買ったあとの次回目安: 容量÷日量が取れるならその日数、なければ14日後 */
export function computeNextAfterPurchase(
  purchaseDate: string,
  totalCapacityMl: number | null,
  dailyUseMl: number | null
): string {
  if (
    totalCapacityMl != null &&
    dailyUseMl != null &&
    totalCapacityMl > 0 &&
    dailyUseMl > 0
  ) {
    const days = Math.max(1, Math.ceil(totalCapacityMl / dailyUseMl));
    return addDays(purchaseDate, days);
  }
  return addDays(purchaseDate, 14);
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate + "T12:00:00");
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
