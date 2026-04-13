---
name: course-mvp-step4-implement-host
description: >-
  After Step3 mock approval: builds STEP4_IMPLEMENTATION_PLAN.md from STACK_CHOICE,
  story, mock, ER-style data plan; runs npm install first; implements Next+Supabase per
  course stack; deploys to Vercel and chases until HTTPS URL works. For beginners.
  Use when Step4, 実装, デプロイ, Vercel, npm, ホスティング, MVP 本番.
---

# AIコース — Step4（実装計画 → 実装 → ホスティングまで）

## 目的

Step3 で **モックが了承されたあと**、**静的 HTML をそのまま本番にしない**。`docs/STACK_CHOICE.md`（**Next.js + Vercel + Supabase**）と、`docs/mvp/STEP2_STORY_SCENARIO.md`・`docs/mvp/STEP3_UI_MOCK.html` を参照して **実装計画** を立て、**依存関係のインストール → 実装 → Vercel でホスティング**まで行う。

受講生が **初心者でも次の一手が分かる**ように、**チェックリストと短い説明**を会話に出し続ける。**公開 URL がブラウザで開き、必達の核が動くところまで**ついて、**成功したら Step4 終了**（無限追いはしないが、デプロイ成功まで **諦めずにトラブルシュート**する）。

## 先に読む（リポジトリにあるとき）

- `docs/mvp/STEP2_STORY_SCENARIO.md`（画面・除外）
- `docs/mvp/STEP3_UI_MOCK.html`（レイアウトの意図）
- `docs/mvp/STEP1_MVP_HYPOTHESIS.md`（G3）
- `docs/STACK_CHOICE.md`（**標準スタックの正**）
- `docs/MVP_CHECKLIST.md`（必達）
- `docs/milestone_rubrics.md`
- `docs/mvp/STEP4_IMPLEMENTATION_PLAN.md`（テンプレ）

## 前提

- **ワークスペース**: 受講生が **Next プロジェクトのルート**を開いていること（教材で配布したリポジトリ、または `create-next-app` で作成したフォルダ）。
- プロジェクトが **まだない**場合: `docs/STACK_CHOICE.md` に従い、**App Router の Next.js** を作成する手順を**1ステップずつ**案内してから進める。

## 全体フロー（必須順序）

1. **計画（ドキュメント）**: `docs/mvp/STEP4_IMPLEMENTATION_PLAN.md` を埋める — **ルート対応、ER イメージ（テーブル／カラム案）、環境変数キー名一覧**（値は書かない）。
2. **環境**: Node / npm（または pnpm）が使えるか確認。**プロジェクトルートで `npm install`（または教材指定のコマンド）を実行** — **パッケージが揃ってから**実装に入る。
3. **実装**: 計画に沿い、**主導線1本**を最優先。モックの見た目は **可能な範囲で**寄せる（ピクセル完全一致は不要）。
4. **ローカル確認**: `npm run dev` で動作。**エラーが出たらログを読み、直してから次へ**。
5. **ホスティング**: **Vercel** に接続（教材の手順に合わせる）。**環境変数**を Vercel 側に設定（`.env` の**キー名**は README に記載）。
6. **成功条件**: **HTTPS の公開 URL** を開き、**必達の核（主導線・ログイン or DB）**が確認できる。**成功を宣言**し、Step4 終了。

### ホスティングで止まったとき（必ず繰り返す）

- **ビルド失敗**: Vercel のログを読み、ローカルで `npm run build` を再現して直す。
- **本番だけ失敗**: 環境変数のキーが Vercel に入っているか、**名前の typo** を確認。
- **動くがデータが出ない**: Supabase の URL/キー・RLS・テーブル名を `STACK_CHOICE` と教材に照らす。
- 直したら **再デプロイ → 再度 URL 確認**。**公開が通るまで**手順を繰り返す（ユーザーが諦める場合はメンター相談を促す）。

## 計画に含めるもの（`STEP4_IMPLEMENTATION_PLAN.md`）

| ブロック | 内容 |
|----------|------|
| 画面→ルート | S1/S2… を `app/.../page.tsx` 等にどう対応するか |
| データ | **ER 図（Mermaid 可）または表**：テーブル名、主キー、外部キー、最低限のカラム |
| 認証・RLS | Supabase を使う場合の方針（教材に従う） |
| 環境変数 | `NEXT_PUBLIC_*` / Supabase URL / anon key 等の**キー名だけ** |

## 初心者向けの説明のしかた

- 各ステップで **「いま何をしているか」** を1文（例: 「いまはライブラリをダウンロードしています」）。
- **次に押すコマンド**を1つだけ明示（コピペ可能に）。
- エラー時は **ログの先頭のエラーメッセージ**を読み、**検索語**を1つ提案。
- **秘密情報**をチャットやコードに貼らないよう毎回注意（`MVP_CHECKLIST`）。

## やらないこと

- Step3 了承前に本番実装だけ進めない（モックとストーリーを正とする）。
- **Bolt 等の別リポジトリ**を本番の正にしない。
- `.env` の**値**を Skill の出力にそのまま載せない。

## 終了宣言（テンプレ）

成功時に一言:

> Step4 完了。公開 URL: （URL）。`STEP4_IMPLEMENTATION_PLAN.md` のチェックリストを満たしています。

## 追加リソース

- Step3: `course-mvp-step3-ui-mock`
- `docs/SETUP_CHECKLIST.md`
