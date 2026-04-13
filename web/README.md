# 日用品リマインダー（Web MVP）

Next.js（App Router）＋ Supabase（Auth + Postgres + Storage）の教材レーン実装です。UI の正はリポジトリ直下の [`docs/mvp/STEP3_UI_MOCK.html`](../docs/mvp/STEP3_UI_MOCK.html)。

## 必達との対応（[`docs/MVP_CHECKLIST.md`](../docs/MVP_CHECKLIST.md)）

| 必達 | 満たし方 |
|------|----------|
| 公開 URL | Vercel にデプロイし HTTPS URL を提出 |
| 核機能 1 本道 | `/items` 一覧 → `/items/[id]` で購入記録・保存 → 一覧へ |
| ログイン or DB | Supabase Auth（マジックリンク）＋ `items` テーブル |
| レスポンシブ最低限 | Tailwind で主要画面をモバイル幅でも崩れにくく |
| README | 本ファイル＋環境変数キー名・既知の制限 |
| 秘密情報 | **鍵は `.env.local` / Vercel のみ**。リポジトリにコミットしない |

## セットアップ

1. Node.js 20+ を用意する。
2. Supabase でプロジェクトを作成し、SQL エディタで [`supabase/migrations/001_init.sql`](./supabase/migrations/001_init.sql) を実行する（または `supabase db push`）。
3. Storage に **`purchase-photos`** バケットが無い場合はダッシュボードで **private** バケットとして作成する（SQL の `insert into storage.buckets` が失敗したとき）。
4. Authentication → URL configuration に **Site URL** と **Redirect URLs**（例: `http://localhost:3000/auth/callback` と本番 `https://YOUR_DOMAIN/auth/callback`）を追加する。
5. `cp .env.local.example .env.local` を編集する。
6. `npm install` → `npm run dev` → `http://localhost:3000` 。

## 環境変数（キー名のみ）

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`（マジックリンクの `emailRedirectTo` に使用）

## Vercel デプロイ（手順概要）

1. GitHub にプッシュし、Vercel でリポジトリを Import（**Root Directory を `web`** に設定）。
2. Environment Variables に上記 3 変数を設定（本番 URL を `NEXT_PUBLIC_SITE_URL` に）。
3. Supabase の Redirect URLs に `https://YOUR_APP.vercel.app/auth/callback` を追加。
4. Deploy → 表示された **HTTPS URL** を提出用に控える。

## 既知の制限・スコープ外

- 外部商品マスタ API、プッシュ通知、外部カレンダー連携は実装しない（[`docs/IDEATION_AND_SCOPE_LADDER.md`](../docs/IDEATION_AND_SCOPE_LADDER.md) の緑帯）。
- 写真は **私有バケット + 署名付き URL** で閲覧（一覧では「あり／—」テキスト）。

## 目安日ロジック（固定）

- 「今日買った」: `last_purchased_on = 今日`。`total_capacity_ml` と `daily_use_ml` がともに正なら `next_purchase_on = 今日 + ceil(容量/日量)` 日。そうでなければ **`今日 + 14 日`**。
- 手入力の `next_purchase_on` はフォーム保存で上書き可能（購入ボタンは上記ルールで更新）。

## スクリプト

- `npm run dev` — 開発
- `npm run build` / `npm run start` — 本番ビルド確認
