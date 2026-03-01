import "./globals.css";

export const metadata = {
  title: "Rural App",
  description: "Aurora Agro IA",
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
