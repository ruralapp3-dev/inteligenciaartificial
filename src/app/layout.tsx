import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Aurora Agro",
  description: "IA estratégica para o campo",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0B0F0D] text-white">
        {children}
      </body>
    </html>
  );
}
