# 教材リポジトリ構成（Cursor / Git 運用）

プランに基づく**推奨ディレクトリ**。実体は `docs/` と `operations/` に初期成果物を配置済み。以降、教材本文を `curriculum/` へ増やしてよい。

```
AIコース/
├── README.md                 # 倉庫の入口（リポジトリ化する場合）
├── docs/                     # 運営・基準・企業向け
├── operations/               # スプレッドシート用CSV・出欠仕様
├── curriculum/
│   ├── README.md             # 本ファイル
│   ├── students/             # 受講生向け章立て（Markdown）
│   ├── staff/                # 講師・メンター向け（台本・裏設定）
│   └── assets/               # 画像・図（相対リンク）
├── .cursor/
│   └── rules/                # 任意: 用語統一ルール（下記）
└── CHANGELOG.md              # 版履歴（推奨）
```

## ブランチとレビュー

- **main**: 現行の正
- **教材ドラフト**: `feat/module-day1` 等。PR で差分レビュー後にマージ

## `.cursor/rules`（任意）

用語集・トーンを `curriculum-glossary.mdc` 等にまとめると、Cursor 上の執筆が揃いやすい。

---

*版: 1.0*
