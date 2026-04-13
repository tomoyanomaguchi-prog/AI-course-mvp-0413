# G5 — Cursor 指示テンプレ（日用品リマインダー／再利用用）

**目的**: 同じ型で「一覧 → 詳細 → Supabase CRUD」の変更を依頼するときに、**目的・制約・受け入れ条件・手動テスト**を一度に渡す（ハーネス）。

---

## テンプレ（コピペして `{}` を埋める）

あなたは Next.js 15 App Router + Supabase の既存リポジトリ `web/` を編集する。

**背景**

- 標準スタックは [`docs/STACK_CHOICE.md`](../STACK_CHOICE.md)。逸脱しない。
- 必達は [`docs/MVP_CHECKLIST.md`](../MVP_CHECKLIST.md)。秘密情報をリポジトリに書かない。

**今回の依頼（1文）**

> {例: items 一覧に「カテゴリ」列を足し、DB に category 列を追加して RLS を維持する}

**変更してよい場所**

- `web/app/**`
- `web/lib/**`
- `web/components/**`
- `web/supabase/migrations/`（新規 SQL は番号を増やす）

**してはいけないこと**

- `.env` やサービスロール鍵のコミット
- 外部商品 API / プッシュ / 外部カレンダーなどスコープ外機能（[`docs/IDEATION_AND_SCOPE_LADDER.md`](../IDEATION_AND_SCOPE_LADDER.md)）
- 新規 npm パッケージを安易に増やす（増やすなら理由を1行）

**受け入れ条件（チェックリスト）**

1. `npm run build` が通る
2. 未ログインで保護ページに入れない（または `/login` に誘導）
3. RLS により **他ユーザーの行が読めない**
4. README か本ファイルに追記が必要なら **環境変数キー名だけ** 更新

**手動テスト手順**

1. `npm run dev` → ログイン → `/items`
2. {追加した操作を箇条書き}
3. ブラウザ更新後もデータが残る

**完了の定義**

- 上記チェックリストを満たし、差分にデバッグ出力や無関係なリファクタを含めない。

---

*版: 1.0 — 日用品 MVP 用（G5）*
