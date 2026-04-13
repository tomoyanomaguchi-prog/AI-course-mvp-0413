# MVP 定義のステップ（Step1 → Step2 → Step3）

**狙い**: Step1 の仮説から **いきなりモックに入らず**、先に **利用ストーリーと画面で確認できること** を言語化する。そこに **技術制約・工数・緑/黄** を埋め込み、難しすぎるものを除外してから **Step3 で外側の UI モック**（静的 HTML 等）に進む。

| Step | 名前 | 主なアウトプット | ルーブリックとの対応（目安） |
|------|------|------------------|------------------------------|
| **1** | 仮説・削り | `STEP1_MVP_HYPOTHESIS.md` | G1〜G3、緑/黄 |
| **2** | **ストーリー・制約・スコープ** | `STEP2_STORY_SCENARIO.md` | G2 の精緻化、G3 の前提、**除外リスト**、必達への道筋 |
| **3** | **UI モック（外側）** | `STEP3_UI_MOCK.html`（＋任意で発表たたき） | **G4**（画面が説明できる） |

- Step2 の段階では **Next の `app/` 実装も、本番向けモックのコーディングも必須にしない**（ストーリーと合意が先）。
- Step3 は **Step2 の画面IDと「確認できること」** に沿ってモックを作る。**型 A〜D**（[`STEP2_MOCK_TYPE_EXAMPLES.md`](STEP2_MOCK_TYPE_EXAMPLES.md)）は **任意の視覚参考**で、必須ではない。
- Step3 は **初回モック作成で終わりにしない**。**改善点インタビュー → チャットで HTML を更新 → 再インタビュー**を繰り、ユーザーが了承するまで続ける（Skill: `course-mvp-step3-ui-mock`）。

**関連**: [`STEP2_STORY_SCENARIO.md`](STEP2_STORY_SCENARIO.md)（Step2 テンプレ）・[`STEP2_FEATURE_SCOPE_AND_MOCK.md`](STEP2_FEATURE_SCOPE_AND_MOCK.md)（個数・難易度・モックの線引き）
