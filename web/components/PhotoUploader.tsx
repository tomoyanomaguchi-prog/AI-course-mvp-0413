"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { clearPhotoAction, updatePhotoPathAction } from "@/app/items/actions";

type Props = {
  itemId: string;
  userId: string;
  initialPath: string | null;
};

export function PhotoUploader({ itemId, userId, initialPath }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onFileChange(file: File | null) {
    setMessage(null);
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選んでください。");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const ext = file.name.split(".").pop()?.toLowerCase();
    const safeExt = ext && ext.length <= 5 ? ext : "jpg";
    const objectPath = `${userId}/${itemId}/${crypto.randomUUID()}.${safeExt}`;

    const { error: upErr } = await supabase.storage.from("purchase-photos").upload(objectPath, file, {
      upsert: true,
      contentType: file.type || "image/jpeg",
    });
    if (upErr) {
      setError(upErr.message);
      return;
    }

    startTransition(() => {
      void (async () => {
        const res = await updatePhotoPathAction(itemId, objectPath);
        if (res.error) {
          setError(res.error);
          return;
        }
        setMessage("写真を保存しました。");
        router.refresh();
      })();
    });
  }

  function onClear() {
    setMessage(null);
    setError(null);
    startTransition(() => {
      void (async () => {
        const res = await clearPhotoAction(itemId);
        if (res.error) {
          setError(res.error);
          return;
        }
        setMessage("写真を削除しました。");
        router.refresh();
      })();
    });
  }

  return (
    <div className="rounded-lg border border-dashed border-green-300 bg-lime-50/40 p-4">
      <p className="text-xs font-semibold text-green-900">購入した商品の写真（任意）</p>
      <p className="mt-1 text-xs text-green-800/80">
        レシートやパッケージ。モック同様、本番は Storage（私有バケット）＋本人のみ RLS。
      </p>
      <input
        type="file"
        accept="image/*"
        className="mt-3 block w-full touch-manipulation text-sm file:mr-3 file:rounded-md file:border-0 file:bg-green-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-green-700"
        disabled={pending}
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
      {pending ? (
        <p className="mt-2 text-xs font-medium text-green-800" aria-live="polite">
          処理中です。完了までそのままお待ちください…
        </p>
      ) : null}
      {initialPath ? (
        <button
          type="button"
          className="mt-3 touch-manipulation rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm text-red-800 hover:bg-red-50 active:opacity-90 disabled:opacity-60"
          disabled={pending}
          onClick={onClear}
        >
          {pending ? "処理中…" : "写真をクリア"}
        </button>
      ) : null}
      {message ? <p className="mt-2 text-sm text-green-800">{message}</p> : null}
      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
