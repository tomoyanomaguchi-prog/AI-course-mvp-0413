import Link from "next/link";

export default function EnvMissingPage() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (hasUrl && hasAnon) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-green-900">
        <h1 className="text-lg font-semibold">環境変数は検出されました</h1>
        <p className="mt-2 text-sm text-green-800/90">
          このページは Supabase 用の公開環境変数が無いときだけ表示されます。通常どおりアプリを使うにはトップへ進んでください。
        </p>
        <Link className="mt-6 inline-block text-sm font-medium text-green-700 underline" href="/">
          トップへ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-green-900">
      <h1 className="text-lg font-semibold">Supabase の環境変数が不足しています</h1>
      <p className="mt-3 text-sm leading-relaxed text-green-800/90">
        このデプロイ（特に <strong>Preview</strong>）に <code className="rounded bg-lime-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> と{" "}
        <code className="rounded bg-lime-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> が入っていない可能性が高いです。Vercel の Project
        Settings → Environment Variables で、対象環境に <strong>Production と Preview の両方</strong>（必要なら Development）へ同じ値を設定し、
        Redeploy してください。
      </p>
      <p className="mt-3 text-sm text-green-800/90">
        Root Directory が <code className="rounded bg-lime-100 px-1">web</code> のときは、そのアプリ用の変数として登録されているかも確認してください。
      </p>
    </div>
  );
}
