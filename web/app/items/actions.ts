"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { computeNextAfterPurchase, todayLocalDateString } from "@/lib/dates";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOutAction(_formData?: FormData) {
  void _formData;
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export type ItemFormState = { error?: string };

function parseNum(v: FormDataEntryValue | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function createItemAction(
  _prev: ItemFormState | undefined,
  formData: FormData
): Promise<ItemFormState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "ログインが必要です。" };

  const name = String(formData.get("name") ?? "").trim();
  const next_purchase_on = String(formData.get("next_purchase_on") ?? "").trim();
  const last_purchased_on = String(formData.get("last_purchased_on") ?? "").trim() || null;
  const total_capacity_ml = parseNum(formData.get("total_capacity_ml"));
  const daily_use_ml = parseNum(formData.get("daily_use_ml"));

  if (!name) return { error: "品目名を入力してください。" };
  if (!next_purchase_on) return { error: "次回購入の目安日を入力してください。" };

  const { error } = await supabase.from("items").insert({
    user_id: user.id,
    name,
    next_purchase_on,
    last_purchased_on,
    total_capacity_ml,
    daily_use_ml,
  });

  if (error) return { error: error.message };
  revalidatePath("/items");
  redirect("/items?notice=" + encodeURIComponent("品目を追加しました。"));
}

export async function updateItemAction(
  itemId: string,
  _prev: ItemFormState | undefined,
  formData: FormData
): Promise<ItemFormState> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "ログインが必要です。" };

  const name = String(formData.get("name") ?? "").trim();
  const next_purchase_on = String(formData.get("next_purchase_on") ?? "").trim();
  const last_purchased_on = String(formData.get("last_purchased_on") ?? "").trim() || null;
  const total_capacity_ml = parseNum(formData.get("total_capacity_ml"));
  const daily_use_ml = parseNum(formData.get("daily_use_ml"));

  if (!name) return { error: "品目名を入力してください。" };
  if (!next_purchase_on) return { error: "次回購入の目安日を入力してください。" };

  const { error } = await supabase
    .from("items")
    .update({
      name,
      next_purchase_on,
      last_purchased_on,
      total_capacity_ml,
      daily_use_ml,
      updated_at: new Date().toISOString(),
    })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/items");
  revalidatePath(`/items/${itemId}`);
  redirect("/items?notice=" + encodeURIComponent("品目を更新しました。"));
}

export async function deleteItemFormAction(formData: FormData) {
  const itemId = String(formData.get("item_id") ?? "");
  if (!itemId) redirect("/items?error=" + encodeURIComponent("品目が不正です。"));

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: row } = await supabase
    .from("items")
    .select("photo_path")
    .eq("id", itemId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (row?.photo_path) {
    await supabase.storage.from("purchase-photos").remove([row.photo_path]);
  }

  const { error } = await supabase.from("items").delete().eq("id", itemId).eq("user_id", user.id);
  if (error) {
    redirect(`/items/${itemId}?error=` + encodeURIComponent(error.message));
  }
  revalidatePath("/items");
  redirect("/items?notice=" + encodeURIComponent("品目を削除しました。"));
}

export async function recordPurchaseTodayFormAction(formData: FormData) {
  const itemId = String(formData.get("item_id") ?? "");
  if (!itemId) redirect("/items?error=" + encodeURIComponent("品目が不正です。"));

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: item, error: fetchErr } = await supabase
    .from("items")
    .select("total_capacity_ml,daily_use_ml")
    .eq("id", itemId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchErr || !item) {
    redirect(`/items/${itemId}?error=` + encodeURIComponent(fetchErr?.message ?? "品目が見つかりません。"));
  }

  const today = todayLocalDateString();
  const next = computeNextAfterPurchase(
    today,
    item.total_capacity_ml != null ? Number(item.total_capacity_ml) : null,
    item.daily_use_ml != null ? Number(item.daily_use_ml) : null
  );

  const { error } = await supabase
    .from("items")
    .update({
      last_purchased_on: today,
      next_purchase_on: next,
      updated_at: new Date().toISOString(),
    })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) {
    redirect(`/items/${itemId}?error=` + encodeURIComponent(error.message));
  }
  revalidatePath("/items");
  revalidatePath(`/items/${itemId}`);
  redirect(`/items/${itemId}?notice=` + encodeURIComponent("購入日を記録しました。"));
}

export async function updatePhotoPathAction(itemId: string, photoPath: string | null) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "ログインが必要です。" };

  const { data: existing } = await supabase
    .from("items")
    .select("photo_path")
    .eq("id", itemId)
    .eq("user_id", user.id)
    .maybeSingle();

  const oldPath = existing?.photo_path as string | null | undefined;
  if (oldPath && oldPath !== photoPath) {
    await supabase.storage.from("purchase-photos").remove([oldPath]);
  }

  const { error } = await supabase
    .from("items")
    .update({ photo_path: photoPath, updated_at: new Date().toISOString() })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/items");
  revalidatePath(`/items/${itemId}`);
  return {};
}

export async function clearPhotoAction(itemId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "ログインが必要です。" };

  const { data: row } = await supabase
    .from("items")
    .select("photo_path")
    .eq("id", itemId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (row?.photo_path) {
    await supabase.storage.from("purchase-photos").remove([row.photo_path]);
  }

  const { error } = await supabase
    .from("items")
    .update({ photo_path: null, updated_at: new Date().toISOString() })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/items");
  revalidatePath(`/items/${itemId}`);
  return {};
}
