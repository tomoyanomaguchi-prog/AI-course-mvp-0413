import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LoginForm } from "./ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/items");

  const sp = await searchParams;
  const authErr = sp.error;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="text-xl font-semibold text-green-900">日用品リマインダー</h1>
      <p className="mt-2 text-sm text-green-800/90">
        メールアドレスにログイン用のリンク（マジックリンク）を送ります。
      </p>
      {authErr ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {authErr === "missing_code" ? (
            <>
              ログイン用リンクから <strong>必要なパラメータ</strong>が届きませんでした（
              <code>missing_code</code>）。
              <br />
              <span className="mt-1 block text-xs leading-relaxed">
                対処: メール内のリンクを<strong>1回だけ</strong>タップし、ログイン操作したのと同じブラウザで開いてください。
                それでも失敗する場合は Supabase の <strong>Redirect URLs</strong> に現在の公開 URL の{" "}
                <code className="break-all">/auth/callback</code> が入っているか確認してください。
              </span>
            </>
          ) : authErr === "exchange" ? (
            <>
              セッション作成に失敗しました（<code>exchange</code>）。リンク期限切れ、または同じリンクの再利用の可能性があります。新しいログインリンクを送ってください。
            </>
          ) : authErr === "verify" ? (
            <>
              リンクの検証に失敗しました（<code>verify</code>）。リンクの有効期限切れか、別のログインを試した可能性があります。新しいリンクを送ってください。
            </>
          ) : (
            <>
              ログインに失敗しました（コード: {authErr}）。もう一度お試しください。
            </>
          )}
        </p>
      ) : null}
      <LoginForm />
      <p className="mt-6 text-center text-xs text-green-800/70">
        <Link href="/" className="underline">
          トップへ
        </Link>
      </p>
    </main>
  );
}
