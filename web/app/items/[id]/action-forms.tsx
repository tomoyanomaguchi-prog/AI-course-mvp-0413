"use client";

import type { FormEvent } from "react";
import { deleteItemFormAction, recordPurchaseTodayFormAction } from "../actions";
import { PendingSubmitButton } from "@/components/PendingSubmitButton";

export function RecordPurchaseForm({ itemId }: { itemId: string }) {
  return (
    <form action={recordPurchaseTodayFormAction} className="mt-4">
      <input type="hidden" name="item_id" value={itemId} />
      <PendingSubmitButton label="今日買った（購入日を記録）" pendingLabel="記録中…" variant="primary" />
    </form>
  );
}

export function DeleteItemForm({ itemId }: { itemId: string }) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const ok = window.confirm("この品目を削除します。元に戻せません。よろしいですか？");
    if (!ok) e.preventDefault();
  }

  return (
    <form action={deleteItemFormAction} className="mt-6 border-t border-dashed border-green-200 pt-4" onSubmit={onSubmit}>
      <input type="hidden" name="item_id" value={itemId} />
      <PendingSubmitButton label="削除" pendingLabel="削除中…" variant="danger" />
    </form>
  );
}
