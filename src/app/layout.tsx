import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Agrícola",
  description: "Sistema inteligente agrícola",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
