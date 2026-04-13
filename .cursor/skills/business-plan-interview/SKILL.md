---
name: business-plan-interview
description: >-
  Facilitates an interview-first workflow to produce a business plan or decision
  memo: dependency-ordered issues, breakthrough sequence, and a one-page
  summary. Use when the user starts a business plan, 事業プラン, ビジネスプラン,
  論点整理, GAPS/decision order, wants interview-style facilitation, or mentions
  this skill or the BUSINESS_PLAN_INTERVIEW prompt.
disable-model-invocation: true
---

# 事業プラン・インタビュー（論点整理型）

## 目的

ユーザーが**毎回長い指示を書かなくても**、対話だけで「論点の地図 → 突破順 → 1枚サマリー」まで揃うようにする。推測で埋めず、**聞いてから**文章化する。

## 進め方（必須）

1. **最初の1問**: 対象は何か（事業・プロダクト・施策の名前／領域／いまの前提）だけを短く確認する。
2. **インタビュー**: 原則 **1テーマずつ**。回答が曖昧なら掘る。長文はユーザーに任せ、エージェントは質問と要約に徹する。
3. **依存関係を先に**: 「全部同時に決める」と詰まる論点は、**ブロック関係**を説明して順序を提案する（下の「論点の並べ方」をデフォルトにする）。
4. **この Vault 内のとき**（`docs/GAPS_AND_DECISION_ORDER.md` 等がある場合）: 同じトーンでよいので、表・見出し・「いまの感覚」1行を尊重する。無理にファイルを編集しない。**ユーザーが成果物をファイルにしたいと言ったら**そのときに案を出す。

## 論点の並べ方（デフォルト順）

新規事業でも既存事業でも、次の**型**を基本とする（前が曖昧だと後ろが無意味になる順）。

| 順 | テーマ | 聞くことの例 |
|----|--------|----------------|
| 1 | 目的と誰のため | 誰のどんな課題・成果指標 |
| 2 | 制約 | 期限・予算・法務・ブランド・やらないこと |
| 3 | 規模と非機能 | 人数・提供形態・品質ライン |
| 4 | 人とリソース | コア人員・外注・ボトルネック |
| 5 | オペ・継続 | 離脱・サポート・運用の回し方 |
| 6 | ツールとコスト | 誰が何にいくらまで |
| 7 | スケジュール | **最後**でマイルストン（前の決定を入力にする） |

必要に応じて mermaid の `flowchart` で「何が何をブロックするか」を1枚にする。

## 出力フォーマット（インタビュー後または区切りごと）

ユーザーが求めたら、またはセッション終了時に、次を **Markdown** で出す。

```markdown
## いまの感覚（1行）

## 論点マップ（依存の矢印）

## 突破順（番号付き）

## 決めたこと / まだ決めていないこと

## 1枚サマリー（概要・対象・方針・次の一手）
```

トーンは既存の「1ペーパー」「論点整理」ドキュメントに合わせ、嘲笑しない。用語は `.cursor/rules/curriculum-glossary.mdc` があるプロジェクトではそれに沿う。

## やらないこと

- ユーザーの確認なしに大量の財務予測をでっち上げない。
- インタビューを飛ばしてテンプレだけ渡さない（短時間なら「最小の3問」に圧縮は可）。

## 追加リソース

- 本プロジェクトの参照例: `docs/GAPS_AND_DECISION_ORDER.md`、`docs/course_overview_1pager.md`
