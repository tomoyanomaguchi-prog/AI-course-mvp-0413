---
name: course-mvp-step2-story-scope
description: >-
  After Step1, builds STEP2_STORY_SCENARIO.md: user story, what each screen verifies,
  constraints and exclusions (re-check Step1 cuts), scope tiers A–D, MVP_CHECKLIST.
  Step1 owns 削り; Step2 story-tells and aligns with Step3 mock iteratively.
  No HTML. Use for Step2, ストーリー, シナリオ, 誰が何を, Step3と行き来.
---

# AIコース — Step2（ストーリー・制約・スコープ）

## 目的

Step1 の成果を入力に、**1ドキュメント**（`docs/mvp/STEP2_STORY_SCENARIO.md`）にまとめる。

**位置づけ（削ること）**

- **主に「何を削るか」を決めるのは Step1**（機能一覧・診断・削り）。
- Step2 では **Step1 の削り後案をストーリーと画面に落とす**。**除外リストの再確認**（ストーリーに紛れ込んだ重い要素がないか）を行う。

**Step2 ⇄ Step3**

- **ストーリー（Step2）** と **モック（Step3）** は一致が取れるまで **何度でも行き来してよい**（モックを見てストーリーを直す、など）。

出力する内容:

1. 誰が何をするか（主役1人）
2. 画面ごとに **何が確認できるか**（S1/S2…、最低2画面）
3. 技術制約・**除外**（`STACK_CHOICE`、緑/黄）
4. スコープ段 A〜D・必達見立て
5. Step3 引き渡し

**やらないこと**: `STEP3_UI_MOCK.html` の作成、Next 実装。**それは Step3**。

## 先に読む

- `docs/mvp/STEP1_MVP_HYPOTHESIS.md` またはユーザー貼付
- `docs/mvp/STEPS_MVP_FLOW.md`
- `docs/milestone_rubrics.md`、`docs/MVP_CHECKLIST.md`
- `docs/IDEATION_AND_SCOPE_LADDER.md`（**P1〜P5 は参考**。ストーリーに合わせて無理に型に入れない）
- `docs/STACK_CHOICE.md`
- `docs/mvp/STEP2_FEATURE_SCOPE_AND_MOCK.md`

## 進め方（必須）

1. Step1 の G1〜G3・**削り後**主導線を要約。
2. **ストーリー**: トリガー→ステップ→ゴール。
3. **画面と確認できること**: S1/S2…、**確認できること**のみ（デザインは Step3）。
4. **除外の再確認**: Step1 にない重い要素がストーリーに入っていないか。あれば削るか除外に戻す。
5. **スコープ段** A〜D、推奨1案。
6. **必達表**。
7. **Step3 引き渡し**（画面ID、任意で視覚参考）。

## 出力フォーマット

`docs/mvp/STEP2_STORY_SCENARIO.md` の見出しに沿う。ユーザーが保存を依頼したときだけ作成・編集。

## やらないこと

- Step1 なしで新テーマをでっち上げない。
- Step3 の HTML を書かない。

## 追加リソース

- Step3: `course-mvp-step3-ui-mock`
- Step4: `course-mvp-step4-implement-host`
- `docs/mvp/STEPS_MVP_FLOW.md`
