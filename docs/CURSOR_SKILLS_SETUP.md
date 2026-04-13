# Cursor でプロジェクト Skill を使う（クローン後のつまずき）

リポジトリの Skill は **`.cursor/skills/<名前>/SKILL.md`** にある。**ワークスペースのルート**がこのフォルダ（`.cursor` がある階層）になっている必要がある。

## よくある原因

### 1. フォルダを開く場所が違う（いちばん多い）

Cursor は **いま開いているフォルダをワークスペースの正**とする。

- **NG**: `docs` だけ開く、`curriculum` だけ開く、親の `Obsidian Vault` だけ開く  
- **OK**: `git clone` した **`AI-`（リポジトリのルート）** を **File → Open Folder** で開く

確認: エクスプローラー／サイドバー直下に **`.cursor`** フォルダが見えるか（隠しフォルダの設定で表示する）。

### 2. Cursor のバージョン

**Agent Skills** は Cursor のバージョンによって挙動が違う。可能なら **最新の安定版**に更新する。

### 3. 「選択」UI が見つからない

Skill は **チャット入力の `@` メニューに常に並ぶ**とは限らない。次を試す。

- **エージェント（Agent）モード**でチャットする  
- プロンプトに **Skill の目的が書いてある語**を含める（例: `Step1` `MVP仮説` `Step2` `ストーリー` `Step3` `モック`）— `SKILL.md` の `description` がマッチしやすい  
- または **Skill 名をそのまま書く**（例: `course-mvp-step1-hypothesis`）

### 4. 反映待ち

clone 直後は **ウィンドウの再読み込み**（Command Palette → `Reload Window`）や Cursor の再起動で直ることがある。

---

## 確実に近づける代替：ユーザー Skill にコピー

プロジェクトを開かず／検索されないときの回避。

```bash
# 例: course-mvp-step1-hypothesis だけ使う（macOS / Linux）
mkdir -p ~/.cursor/skills
cp -R /path/to/AI-/.cursor/skills/course-mvp-step1-hypothesis ~/.cursor/skills/
```

Windows は `~` を `%USERPROFILE%` に読み替え。コピー後、Cursor を再起動する。

---

## このリポジトリの MVP Skill（3つ）

| フォルダ名 | 用途の目安 |
|------------|------------|
| `course-mvp-step1-hypothesis` | Step1 仮説・削り |
| `course-mvp-step2-story-scope` | Step2 ストーリー・制約 |
| `course-mvp-step3-ui-mock` | Step3 HTML モック＋改善ループ |

参照ドキュメント: [`mvp/STEPS_MVP_FLOW.md`](mvp/STEPS_MVP_FLOW.md)
