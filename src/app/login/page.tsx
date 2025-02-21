"use client";

import { VerticalLogo } from "@/lib/icons";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitWallet, Wallet } from "@reown/appkit-wallet-button/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingIcon } from "@/components/Loader";
import { BASE_PATH } from "@/lib/constants";

type WalletItem = { name: string; icon: string; adapter: Wallet };

const baseWallets: WalletItem[] = [
  {
    name: "MetaMask",
    icon: BASE_PATH + "/image/wallet_metamask.png",
    adapter: "metamask",
  },
  {
    name: "Phantom",
    icon: BASE_PATH + "/image/wallet_phantom.png",
    adapter: "phantom",
  },
  {
    name: "Bitget",
    icon: BASE_PATH + "/image/wallet_bitget.png",
    adapter: "bitget",
  },
];
const extraWallets: WalletItem[] = [
  {
    name: "OKX Wallet",
    icon: BASE_PATH + "/image/wallet_okx.png",
    adapter: "okx",
  },
  {
    name: "TokenPocket",
    icon: BASE_PATH + "/image/wallet_tokenpocket.png",
    adapter: "tokenpocket",
  },
  {
    name: "Backpack",
    icon: BASE_PATH + "/image/wallet_backpack.png",
    adapter: "backpack",
  },
  {
    name: "Solflare",
    icon: BASE_PATH + "/image/wallet_solfare.png",
    adapter: "solflare",
  },
];

export default function Login() {
  const router = useRouter();

  const [showExtra, setShowExtra] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const { address, isConnected } = useAppKitAccount();

  useEffect(() => {
    if (isConnected && address) {
      router.push("/");
    }
  }, [isConnected]);

  console.log("login", address);

  return (
    <main className='h-screen overflow-hidden bg-[#F2F3F7] bg-[url(BASE_PATH + "/image/login_bg.png")] flex items-center justify-center'>
      <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
        <VerticalLogo />
        <div className="text-[24px] text-[#000]">
          Trending Tokens Powered By AI
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[380px] rounded-[24px] p-[40px] bg-white flex flex-col gap-[24px]">
          <div className="text-[20px] font-bold text-[#000]">
            Connect a wallet on Solana to continue
          </div>
          {!isConnected ? (
            <div className="flex flex-col gap-[16px]">
              {baseWallets?.map((item) => (
                <WalletConnectItem
                  key={item?.name}
                  {...item}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                />
              ))}
              {!showExtra ? (
                <button
                  className="h-[45px] rounded-[12px] bg-[#FCFCFC] text-[14px] text-[#666] flex items-center justify-center hover:border-[1px] hover:border-[#C8FF00]"
                  onClick={() => setShowExtra(true)}
                >
                  More Wallets
                </button>
              ) : (
                <>
                  {extraWallets?.map((item) => (
                    <WalletConnectItem
                      key={item?.name}
                      {...item}
                      selectedWallet={selectedWallet}
                      setSelectedWallet={setSelectedWallet}
                    />
                  ))}
                </>
              )}
            </div>
          ) : (
            <div>{address}</div>
          )}
        </div>
      </div>
    </main>
  );
}

const WalletConnectItem = (
  props: WalletItem & {
    selectedWallet: string | undefined;
    setSelectedWallet: (name: string) => void;
  }
) => {
  const { isReady, isPending, connect } = useAppKitWallet({
    onSuccess() {},
    onError() {},
  });

  return (
    <button
      className="h-[45px] rounded-[12px] bg-[#FCFCFC] text-[15px] font-bold text-[#666] flex items-center justify-between px-[24px] border-[1px] border-[#E0DEDE] hover:border-[#C8FF00]"
      onClick={() => {
        props?.setSelectedWallet(props?.name);
        connect(props?.adapter);
      }}
      disabled={!isReady && isPending}
    >
      <div className="flex items-center gap-[6px]">
        {isPending && props?.selectedWallet === props?.name && <LoadingIcon />}
        {props?.name}
      </div>
      <img src={props?.icon} alt={props?.name} width={28} height={28} />
    </button>
  );
};
