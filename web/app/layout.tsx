import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "日用品リマインダー",
  description: "次回購入目安の一覧と購入記録（教材 MVP）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
