---
name: course-mvp-step2-story-scope
description: >-
  After Step1, builds a user story: who does what, what is verifiable on each screen,
  technical constraints (STACK_CHOICE, 緑/黄), effort-based exclusions, scope tiers
  A–D, MVP_CHECKLIST mapping—without UI mock or Next code. Use when the user says
  Step2, ストーリー, シナリオ, 誰が何を, 画面で確認, 制約, 工数, Day7準備 before mock.
---

# AIコース — Step2（ストーリー・制約・スコープ）

## 目的

Step1 の成果を入力に、**いきなりモックに入らず**、次を **1ドキュメント**にまとめる。

1. **誰が何をするか**（主役は1人に寄せる）
2. **画面で何が確認できるか**（画面IDごと。最低2画面分の「確認できること」）
3. **技術制約**（`STACK_CHOICE.md`、ログイン/DB、P1〜P5、緑/黄）
4. **開発工数・難易度**で **除外する機能**（べらぼうに難しいものを明示的に落とす）
5. **スコープ段 A〜D** と **必達への見立て**

**やらないこと**: `STEP3_UI_MOCK.html` の作成、Next `app/` の実装、Bolt 本採用。**それは Step3**（`course-mvp-step3-ui-mock`）。

## 先に読む

- Step1: `docs/mvp/STEP1_MVP_HYPOTHESIS.md` またはユーザー貼付
- `docs/mvp/STEPS_MVP_FLOW.md`
- `docs/milestone_rubrics.md`（G2・G3 の前提）
- `docs/MVP_CHECKLIST.md`
- `docs/IDEATION_AND_SCOPE_LADDER.md`
- `docs/STACK_CHOICE.md`
- 個数・難易度: `docs/mvp/STEP2_FEATURE_SCOPE_AND_MOCK.md`

## 進め方（必須）

1. Step1 の G1〜G3・削り後主導線を要約する。
2. **ストーリー**: トリガー→ステップ→ゴールを表にする。曖昧ならインタビューで1ステップずつ埋める。
3. **画面と確認できること**: 各ステップを **どの画面（S1/S2…）で見せるか** に対応づけ、**ユーザーがその画面で確認できること**だけ箇条書き（デザインは書かない）。
4. **制約・除外**: 標準スタック外の要素、黄・赤に近い要素を列挙し、**このコースではやらない**と書く（理由1行）。
5. **スコープ段** A/B/C/D と **推奨1案**。
6. **必達表**（見立て）。
7. **Step3 引き渡し**ブロック: 採用スコープ段、**画面IDとストーリーの対応**。（任意）`docs/mvp/STEP2_MOCK_TYPE_EXAMPLES.md` がトーンの参考に近ければ一言。**型の強制はしない** — Step3 は画面定義に忠実でよい。

## 出力フォーマット

`docs/mvp/STEP2_STORY_SCENARIO.md` の見出しに **沿った Markdown** を出力する（ファイル中のテンプレを正とする）。ユーザーが保存を依頼したときだけファイルを作成・編集する。

## やらないこと

- Step1 未完了のまま新テーマをでっち上げない。
- 画面モック HTML をこの Step で書かない（Step3 へ）。
- 秘密情報を具体値で書かない。

## 追加リソース

- Step3（モック）: `course-mvp-step3-ui-mock`
- フロー一覧: `docs/mvp/STEPS_MVP_FLOW.md`
