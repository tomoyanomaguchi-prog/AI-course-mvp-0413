---
name: course-mvp-step1-hypothesis
description: >-
  Interview-first MVP hypothesis (G1–G3): probes 黄/赤 risk while the user answers,
  steers toward 緑-friendly scope, outputs STEP1_MVP_HYPOTHESIS.md. Does not force-fit
  IDEATION P1–P5 pattern IDs. Use for Step1, MVP仮説, 削り, 難易度, Day7 prep.
---

# AIコース — Step1（MVP仮説インタビュー）

## 目的

推測でテンプレを埋めず、**質問に答えていく過程**で内容を **`docs/milestone_rubrics.md` の G1〜G3** に載る形へ寄せ、**1ファイルのレビュー用アウトプット**（`docs/mvp/STEP1_MVP_HYPOTHESIS.md` と整合）を出す。

**`IDEATION_AND_SCOPE_LADDER.md` の P1〜P5 について**

- **必須ではない**。あくまで「緑の帯の**例**」。**無理にどれか1つに当てはめない**（近い例があれば §1.5 に1行でよい）。
- 正は **G1 一文・主導線1本・ログイン/DB・削り**。**型番号より、課題と行動が言えるか**を優先する。

**難易度の扱い**

- **ゴール**: **緑帯で現実的な主導線1本**が書ける状態（黄は「削定後」＋要素明示）。
- **インタビュー中**: 黄・赤に触れそうなら **確認1問**＋**緑寄りの言い換え**（`IDEATION` の黄の例を根拠にしてよい）。
- **過多**: メンター相当の直言と **削る優先順**。

## 先に読む

- `docs/milestone_rubrics.md`（G1〜G3）
- `docs/DAY1_MVP_TEMPLATE.md`
- `docs/IDEATION_AND_SCOPE_LADDER.md`（緑/黄/赤・**P1〜P5 は例**）
- `docs/STACK_CHOICE.md`、`.cursor/rules/curriculum-glossary.mdc`

## 進め方（必須）

1. **最初**: メモがあれば短く聞く。なければテーマだけ。
2. **インタビュー**（1テーマずつ）: 誰／状況／課題（行動に）／既存の代替／最小の成功。
3. **機能の洗い出し**: やりたいことを**全部**箇条書き。
4. **難易度ゲート（3.5）**: チャット／リアルタイム／複数権限／深い外部連携／常時通知／画面過多 などに触れたら **確認1問**＋**緑で足りる言い換え**（`docs/IDEATION_AND_SCOPE_LADDER.md` の黄の例を根拠にしてよい）。
5. **重さの目安**: 緑／黄（削定後）。**（任意）** P1〜P5 に**近い例**があれば1行。**無理に型に収めない**。
6. **過多チェック**: 画面過多・主導線分岐・重い要素 → 直言。**主導線1本**に落とす削り案。
7. **G2 / G3**: 削り後の主導線、ログイン or DB。

「まだ全部欲しい」→ 緑の最小1本と、削らないリスクを対比。**推奨は削る**。

## 出力フォーマット

`docs/mvp/STEP1_MVP_HYPOTHESIS.md` の見出しに沿う（**§1.5 は「重さの目安（任意）」**）。ユーザーが保存を依頼したときだけファイルを作成・編集。

## やらないこと

- テンプレだけ渡さない。
- **P1〜P5 のどれかに必ず分類させる**ことにしない。
- 秘密情報・本番鍵を前提にしない。

## 追加リソース

- `docs/milestone_rubrics.md`・`docs/MVP_CHECKLIST.md`
