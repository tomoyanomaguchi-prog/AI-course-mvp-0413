# MVP 定義〜実装のステップ（Step1 → Step4）

**狙い**: Step1 で **仮説と削り** → Step2 で **ストーリーと画面の確認内容** → Step3 で **外側モック** → Step4 で **本番実装とホスティング**。  
**Step2 ⇄ Step3** は、ストーリーと見た目が合うまで **繰り返してよい**。

| Step | 名前 | 主なアウトプット | ルーブリック／必達（目安） |
|------|------|------------------|----------------------------|
| **1** | 仮説・**削り** | `STEP1_MVP_HYPOTHESIS.md` | G1〜G3。**P1〜P5 は任意の参考**（型に必ず収めない） |
| **2** | ストーリー・制約・スコープ | `STEP2_STORY_SCENARIO.md` | G2 の具体化、除外の再確認、必達への道筋 |
| **3** | UI モック（外側） | `STEP3_UI_MOCK.html`（了承まで改善ループ） | **G4** |
| **4** | 実装・ホスティング | `STEP4_IMPLEMENTATION_PLAN.md` ＋ コード ＋ **公開 URL** | [`MVP_CHECKLIST.md`](../MVP_CHECKLIST.md) |

- **削ることの主戦場は Step1**。Step2 はその結果を **ストーリーに落とし、除外が紛れていないか確認**する。
- Step2 では **Next 実装をしない**。Step3 では **静的モックのみ**（`app/` に書かない）。
- Step4 では **`npm install` 等で依存を揃えてから**実装し、**Vercel まで**進める（Skill: `course-mvp-step4-implement-host`）。

**関連**

- [`STEP2_FEATURE_SCOPE_AND_MOCK.md`](STEP2_FEATURE_SCOPE_AND_MOCK.md)
- [`CURSOR_SKILLS_SETUP.md`](../CURSOR_SKILLS_SETUP.md)
