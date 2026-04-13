import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Supabase の Site URL がルートだけのとき、メールリンクが `/?code=` や `/?token_hash=`
 * で戻ることがある。セッション確立は `/auth/callback` に任せる。
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const code = typeof sp.code === "string" ? sp.code : undefined;
  const token_hash = typeof sp.token_hash === "string" ? sp.token_hash : undefined;
  const type = typeof sp.type === "string" ? sp.type : undefined;

  if (code) {
    redirect(`/auth/callback?code=${encodeURIComponent(code)}`);
  }
  if (token_hash && type) {
    redirect(
      `/auth/callback?token_hash=${encodeURIComponent(token_hash)}&type=${encodeURIComponent(type)}`
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  redirect("/items");
}
