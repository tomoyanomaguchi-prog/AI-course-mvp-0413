"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-4 w-full touch-manipulation rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 active:opacity-90 disabled:opacity-60"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? "送信中…" : "ログインリンクを送る"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initial);

  if (state.ok) {
    return (
      <div
        className="mt-6 rounded-lg border border-green-200 bg-white p-4 text-sm text-green-900"
        role="status"
      >
        メールを確認し、届いたリンクからログインしてください。
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 rounded-lg border border-green-200 bg-white p-4 shadow-sm">
      <label htmlFor="email" className="text-xs font-semibold text-green-900">
        メールアドレス
      </label>
      <p className="mt-1 text-[11px] text-green-800/80">
        @ は<strong>半角</strong>にしてください（IME で「＠」になっていると「無効」と出ることがあります）。
      </p>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="mt-2 w-full rounded-md border border-green-200 px-3 py-2 text-sm outline-none ring-green-500 focus:ring-2"
        placeholder="you@example.com"
      />
      {state.error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
