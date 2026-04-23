"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  pendingLabel?: string;
  className?: string;
  variant?: "primary" | "danger" | "neutral";
};

export function PendingSubmitButton({ label, pendingLabel = "処理中…", className = "", variant = "primary" }: Props) {
  const { pending } = useFormStatus();
  const base =
    "inline-flex min-h-[2.5rem] min-w-[6rem] touch-manipulation items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-opacity active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";
  const variantClass =
    variant === "danger"
      ? "border border-red-200 bg-white font-medium text-red-800 hover:bg-red-50"
      : variant === "neutral"
        ? "border border-green-200 bg-white font-medium text-green-900 hover:bg-green-50"
        : "bg-lime-500 font-semibold text-green-950 hover:bg-lime-400";

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${base} ${variantClass} ${className}`.trim()}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
