import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signedPhotoUrl } from "@/lib/storage";
import type { ItemRow } from "@/lib/types";
import { PhotoUploader } from "@/components/PhotoUploader";
import { DeleteItemForm, RecordPurchaseForm } from "./action-forms";
import { EditItemForm } from "./ui";

export default async function ItemDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: row, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !row) notFound();
  const item = row as ItemRow;
  const photoUrl = await signedPhotoUrl(supabase, item.photo_path);

  return (
    <div>
      <Link href="/items" className="text-sm text-green-700 underline">
        ← 一覧へ戻る
      </Link>

      {sp.error ? (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{sp.error}</p>
      ) : null}
      {sp.notice ? (
        <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-900">{sp.notice}</p>
      ) : null}

      <h1 className="mt-3 text-xl font-semibold text-green-900">{item.name} を編集（S2）</h1>
      <p className="mt-2 text-sm text-green-800/90">購入記録・写真は任意。目安の自動計算は容量÷日量が両方あるとき優先、なければ+14日。</p>

      <div className="mt-4 rounded-lg border border-lime-200 bg-lime-50 p-3 text-xs text-green-900">
        <strong>S2 で確認</strong>: 品目の特定／次回目安／購入日の記録／写真（任意）／保存・一覧へ／削除。
      </div>

      {photoUrl ? (
        <div className="relative mt-4 max-w-md overflow-hidden rounded-lg border border-green-200 bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt="購入写真" className="h-auto max-h-60 w-full object-contain" />
        </div>
      ) : null}

      <PhotoUploader itemId={item.id} userId={user.id} initialPath={item.photo_path} />

      <RecordPurchaseForm itemId={item.id} />

      <EditItemForm item={item} />

      <DeleteItemForm itemId={item.id} />
    </div>
  );
}
