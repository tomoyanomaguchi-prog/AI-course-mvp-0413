import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { badgeForNextPurchase, badgeLabel } from "@/lib/dates";
import { signedPhotoUrl } from "@/lib/storage";
import type { ItemRow } from "@/lib/types";

export default async function ItemsListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: rows, error } = await supabase
    .from("items")
    .select("*")
    .order("next_purchase_on", { ascending: true });

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        一覧の取得に失敗しました: {error.message}
      </div>
    );
  }

  const items = (rows ?? []) as ItemRow[];
  const withUrls = await Promise.all(
    items.map(async (it) => ({
      ...it,
      photoSignedUrl: await signedPhotoUrl(supabase, it.photo_path),
    }))
  );

  return (
    <div>
      <div className="mb-4 rounded-lg border border-lime-200 bg-lime-50 p-3 text-sm text-green-900">
        <strong>主導線</strong>: 店に行く前に「次回購入目安が近い順」で確認 → 行を開いて購入記録・保存。
      </div>
      <div className="overflow-hidden rounded-xl border border-green-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-green-100 px-4 py-3">
          <h1 className="text-lg font-semibold text-green-900">日用品一覧（S1）</h1>
          <Link
            href="/items/new"
            className="hidden rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 md:inline-flex"
          >
            ＋ 日用品を追加
          </Link>
        </div>
        {withUrls.length === 0 ? (
          <p className="p-6 text-sm text-green-800">まだ品目がありません。「日用品を追加」から登録してください。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-green-100 bg-lime-50 text-xs font-semibold text-green-800">
                  <th className="px-4 py-3">品目</th>
                  <th className="px-4 py-3">次回購入の目安</th>
                  <th className="px-4 py-3">直近の購入写真</th>
                  <th className="px-4 py-3">状態</th>
                </tr>
              </thead>
              <tbody>
                {withUrls.map((it) => {
                  const kind = badgeForNextPurchase(it.next_purchase_on);
                  const badgeClass =
                    kind === "urgent"
                      ? "bg-red-100 text-red-900"
                      : kind === "soon"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-green-100 text-green-900";
                  return (
                    <tr key={it.id} className="border-b border-green-50 hover:bg-lime-50/60">
                      <td className="px-4 py-3">
                        <Link href={`/items/${it.id}`} className="font-medium text-green-900 underline">
                          {it.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-green-800">{it.next_purchase_on}</td>
                      <td className="px-4 py-3">
                        {it.photoSignedUrl ? (
                          <span className="font-semibold text-green-800">あり</span>
                        ) : (
                          <span className="text-green-700/70">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
                          {badgeLabel(kind)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="border-t border-dashed border-green-200 p-3 text-xs text-green-800/80">
          写真の「あり」は Storage の署名付き URL で確認可能（一覧ではテキストのみ）。
        </p>
      </div>
    </div>
  );
}
