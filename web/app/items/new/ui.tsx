"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createItemAction, type ItemFormState } from "../actions";

const initial: ItemFormState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "保存中…" : label}
    </button>
  );
}

export function NewItemForm() {
  const [state, formAction] = useFormState(createItemAction, initial);

  return (
    <form
      action={formAction}
      className="mt-6 max-w-lg space-y-4 rounded-xl border border-green-200 bg-white p-4 shadow-sm"
    >
      <div>
        <label className="text-xs font-semibold text-green-900" htmlFor="name">
          品目名
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
          placeholder="例: シャンプー"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-green-900" htmlFor="next_purchase_on">
            次回購入の目安
          </label>
          <input
            id="next_purchase_on"
            name="next_purchase_on"
            type="date"
            required
            className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-green-900" htmlFor="last_purchased_on">
            前回の購入日（任意）
          </label>
          <input
            id="last_purchased_on"
            name="last_purchased_on"
            type="date"
            className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-green-900" htmlFor="total_capacity_ml">
            全容量（ml・任意）
          </label>
          <input
            id="total_capacity_ml"
            name="total_capacity_ml"
            type="number"
            min={0}
            step="1"
            className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
            placeholder="500"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-green-900" htmlFor="daily_use_ml">
            1日使用量（ml・任意）
          </label>
          <input
            id="daily_use_ml"
            name="daily_use_ml"
            type="number"
            min={0}
            step="0.1"
            className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
            placeholder="5"
          />
        </div>
      </div>
      {state.error ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton label="保存" />
    </form>
  );
}
