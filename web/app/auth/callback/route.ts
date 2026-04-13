import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const OTP_TYPES = new Set(["magiclink", "email", "signup", "recovery", "email_change", "invite"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const typeParam = url.searchParams.get("type");
  const next = url.searchParams.get("next") ?? "/items";
  const origin = url.origin;

  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.redirect(`${origin}/login?error=config`);
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });

  /** PKCE: メールリンクが ?code=... のとき */
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=exchange`);
    }
    return NextResponse.redirect(`${origin}${next}`);
  }

  /** 従来・テンプレ依存: ?token_hash=...&type=magiclink など */
  if (token_hash && typeParam && OTP_TYPES.has(typeParam)) {
    const { error } = await supabase.auth.verifyOtp({
      type: typeParam as
        | "magiclink"
        | "email"
        | "signup"
        | "recovery"
        | "email_change"
        | "invite",
      token_hash,
    });
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=verify`);
    }
    return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/login?error=missing_code`);
}
