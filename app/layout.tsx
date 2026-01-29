import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebas = Oswald({ subsets: ["latin", "vietnamese"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Phan Viet Portfolio",
  description: "Netflix-style Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} antialiased no-scrollbar`}>{children}</body>
    </html>
  );
}
