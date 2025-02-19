"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { createAppKit, useAppKitAccount } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { solana, solanaDevnet, solanaTestnet } from "@reown/appkit/networks";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import GlobalContextProvider from "./app-context";
import { useEffect } from "react";

const sans = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

createAppKit({
  adapters: [
    new SolanaAdapter({
      wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    }),
  ],
  defaultNetwork: solana,
  networks: [solana, solanaTestnet, solanaDevnet],
  projectId: "b56e18d47c72ab683b10814fe9495694",
  features: {
    email: false,
    analytics: false,
    connectMethodsOrder: ["wallet"],
  },
  enableWalletConnect: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnected } = useAppKitAccount();

  // useEffect(() => {
  //   if (isConnected && address) {
  //     router.push('/');
  //   } else {
  //     router.push('/login');
  //   }
  // }, [isConnected])

  if (pathname === "/login") {
    return (
      <html lang="en">
        <body className={`${sans.className} antialiased`}>{children} </body>
      </html>
    );
  }

  console.log('layout', address, isConnected)

  return (
    <html lang="en">
      <body className={`${sans.className} antialiased`}>
        <GlobalContextProvider>
          <main className="h-screen overflow-hidden">
            <Header />
            <div className="bg-[#F2F3F7]">{children}</div>
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
