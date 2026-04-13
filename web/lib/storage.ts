import type { SupabaseClient } from "@supabase/supabase-js";

export async function signedPhotoUrl(
  supabase: SupabaseClient,
  path: string | null,
  expiresIn = 3600
): Promise<string | null> {
  if (!path) return null;
  const { data, error } = await supabase.storage
    .from("purchase-photos")
    .createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}
