-- Household reminder MVP: items + RLS + Storage policies
-- Apply in Supabase SQL Editor or via supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  next_purchase_on date not null,
  last_purchased_on date,
  total_capacity_ml numeric,
  daily_use_ml numeric,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists items_user_next_idx on public.items (user_id, next_purchase_on);

alter table public.items enable row level security;

create policy "items_select_own"
  on public.items for select
  using (auth.uid() = user_id);

create policy "items_insert_own"
  on public.items for insert
  with check (auth.uid() = user_id);

create policy "items_update_own"
  on public.items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "items_delete_own"
  on public.items for delete
  using (auth.uid() = user_id);

-- Storage bucket (create bucket named purchase-photos in Dashboard if insert fails)
insert into storage.buckets (id, name, public)
values ('purchase-photos', 'purchase-photos', false)
on conflict (id) do nothing;

create policy "purchase_photos_select_own"
  on storage.objects for select
  using (
    bucket_id = 'purchase-photos'
    and split_part(name, '/', 1) = auth.uid()::text
  );

create policy "purchase_photos_insert_own"
  on storage.objects for insert
  with check (
    bucket_id = 'purchase-photos'
    and split_part(name, '/', 1) = auth.uid()::text
  );

create policy "purchase_photos_update_own"
  on storage.objects for update
  using (
    bucket_id = 'purchase-photos'
    and split_part(name, '/', 1) = auth.uid()::text
  );

create policy "purchase_photos_delete_own"
  on storage.objects for delete
  using (
    bucket_id = 'purchase-photos'
    and split_part(name, '/', 1) = auth.uid()::text
  );
