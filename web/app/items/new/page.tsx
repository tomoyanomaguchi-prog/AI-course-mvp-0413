import Link from "next/link";
import { NewItemForm } from "./ui";

export default function NewItemPage() {
  return (
    <div>
      <Link href="/items" className="text-sm text-green-700 underline">
        ← 一覧へ戻る
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-green-900">日用品を追加（S2）</h1>
      <p className="mt-2 text-sm text-green-800/90">必須: 品目名・次回購入の目安。容量と日量は任意（購入記録時の自動目安に使用）。</p>
      <NewItemForm />
    </div>
  );
}
