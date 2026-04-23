import { headers } from "next/headers";

/**
 * マジックリンクの emailRedirectTo などに使う公開オリジン。
 * Server Action では `Origin` が付かないことがあるため、Vercel の forwarded ヘッダと VERCEL_URL にフォールバックする。
 */
export async function resolveSiteOrigin(): Promise<string> {
  const h = await headers();

  const forwardedHost = h.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = h.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwardedHost) {
    const proto = forwardedProto && forwardedProto !== "" ? forwardedProto : "https";
    return `${proto}://${forwardedHost}`;
  }

  const host = h.get("host");
  if (host) {
    const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
    const proto = forwardedProto && forwardedProto !== "" ? forwardedProto : isLocal ? "http" : "https";
    return `${proto}://${host}`;
  }

  const origin = h.get("origin")?.replace(/\/$/, "");
  if (origin) return origin;

  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) return site;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
