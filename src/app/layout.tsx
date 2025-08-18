import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoProtecta - Proteção Veicular Completa e Confiável",
  description: "Proteja seu veículo sem sair de casa. Tranquilidade em cada quilômetro com a AutoProtecta. Cotação em 2 minutos, processo 100% digital.",
  keywords: "proteção veicular, seguro auto, cotação online, proteção de veículos, AutoProtecta",
  authors: [{ name: "AutoProtecta" }],
  creator: "AutoProtecta",
  publisher: "AutoProtecta",
  robots: "index, follow",
  openGraph: {
    title: "AutoProtecta - Proteção Veicular Completa e Confiável",
    description: "Proteja seu veículo sem sair de casa. Tranquilidade em cada quilômetro com a AutoProtecta.",
    type: "website",
    locale: "pt_BR",
    siteName: "AutoProtecta",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoProtecta - Proteção Veicular Completa e Confiável",
    description: "Proteja seu veículo sem sair de casa. Tranquilidade em cada quilômetro com a AutoProtecta.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#FB4516",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
