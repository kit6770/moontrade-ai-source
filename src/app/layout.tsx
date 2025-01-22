import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MoonTrade AI",
  description: "MoonTrade AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} antialiased pb-[60px]`}
      >
        {children}
      </body>
    </html>
  );
}
