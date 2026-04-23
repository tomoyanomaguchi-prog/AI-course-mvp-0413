"use client";

import { signOutAction } from "@/app/items/actions";
import { PendingSubmitButton } from "@/components/PendingSubmitButton";

export function SignOutForm() {
  return (
    <form action={signOutAction}>
      <PendingSubmitButton
        label="ログアウト"
        pendingLabel="ログアウト中…"
        variant="neutral"
        className="!min-h-0 !min-w-0 rounded-md px-3 py-2 text-sm font-medium"
      />
    </form>
  );
}
