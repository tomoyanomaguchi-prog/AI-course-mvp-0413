import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "./actions";

export default async function ItemsLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-52 shrink-0 flex-col bg-green-800 p-3 text-green-100 md:flex">
        <p className="text-[11px] font-bold uppercase tracking-wide text-green-300">日用品</p>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          <Link className="rounded-md bg-green-500 px-2 py-2 font-semibold text-green-950" href="/items">
            一覧（S1）
          </Link>
          <Link className="rounded-md px-2 py-2 hover:bg-green-700" href="/items/new">
            品目を追加（S2）
          </Link>
        </nav>
        <p className="mt-auto pt-6 text-[11px] leading-relaxed text-green-300">
          静的モックの正: <code className="break-all">docs/mvp/STEP3_UI_MOCK.html</code>
        </p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-green-200 bg-white px-4 py-3">
          <span className="font-semibold text-green-900">日用品リマインダー</span>
          <div className="flex items-center gap-2">
            <Link
              href="/items/new"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 md:hidden"
            >
              ＋ 追加
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-md border border-green-200 bg-white px-3 py-2 text-sm text-green-900 hover:bg-green-50"
              >
                ログアウト
              </button>
            </form>
          </div>
        </header>
        <div className="flex-1 px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
