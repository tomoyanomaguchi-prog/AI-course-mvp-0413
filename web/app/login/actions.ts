"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveSiteOrigin } from "@/lib/site-origin";

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

  const origin = await resolveSiteOrigin();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("rate limit") || msg.includes("too many requests")) {
      return {
        error:
          "メール送信の上限に達しています（短時間に何度も送った、またはプロジェクト全体の上限です）。しばらく待ってから再度お試しください。開発中は Supabase ダッシュボードの Authentication → Rate Limits で OTP の間隔・回数を緩めるか、カスタム SMTP を設定すると改善しやすいです。",
      };
    }
    return { error: error.message };
  }
  return { ok: true };
}
