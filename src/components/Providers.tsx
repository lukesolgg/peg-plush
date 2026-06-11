"use client";

import type { ReactNode } from "react";
import { WalletProvider } from "@/lib/wallet";
import { PriceProvider } from "@/lib/price";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PriceProvider>
      <WalletProvider>{children}</WalletProvider>
    </PriceProvider>
  );
}
