"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export type LoginState = { ok?: boolean; error?: string };

/** IME などで紛れやすい全角 @・余白を直してから送る */
function normalizeEmailInput(raw: string): string {
  return raw
    .trim()
    .replace(/\u3000/g, "") // 和文スペース
    .replace(/\uFF20/g, "@") // ＠（全角 commercial at）
    .replace(/\u200B/g, "") // ゼロ幅スペース
    .replace(/\uFEFF/g, ""); // BOM
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = normalizeEmailInput(String(formData.get("email") ?? ""));
  if (!email) {
    return { error: "メールアドレスを入力してください。" };
  }
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basic.test(email)) {
    return {
      error:
        "メールの形式が正しくないようです。@ は半角、ドメインまで含めて入力してください（例: name@gmail.com）。",
    };
  }

  const headersList = await headers();
  const origin =
    headersList.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }
  return { ok: true };
}
