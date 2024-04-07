import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Strive",
    template: `%s | Strive`,
  },
  description:
    "Maximize efficiency, project management, and productivity like never before. Whether in the offices, at home, or on the go, unlock projects true potential with Strive.",
  icons: [
    {
      url: "@/public/logo.svg",
      href: "@/public/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
