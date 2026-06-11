"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { randomBase58 } from "@/lib/format";
import type { WalletName } from "@/lib/constants";

interface Balances {
  sol: number;
  usdc: number;
  peg: number;
}

interface WalletContextValue {
  connected: boolean;
  connecting: WalletName | null;
  walletName: WalletName | null;
  address: string | null;
  balances: Balances;
  connect: (name: WalletName) => Promise<void>;
  disconnect: () => void;
  /** Mock-spend from the connected wallet after a "purchase". */
  spend: (currency: "USDC" | "PEG", amount: number) => void;
}

const MOCK_BALANCES: Balances = {
  sol: 4.2069,
  usdc: 1280.55,
  peg: 18_500_000,
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState<WalletName | null>(null);
  const [walletName, setWalletName] = useState<WalletName | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<Balances>(MOCK_BALANCES);
  const connectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(async (name: WalletName) => {
    setConnecting(name);
    // Simulate the wallet-extension approval round trip.
    await new Promise<void>((resolve) => {
      connectTimer.current = setTimeout(resolve, 1100);
    });
    setAddress(randomBase58(44));
    setWalletName(name);
    setBalances(MOCK_BALANCES);
    setConnected(true);
    setConnecting(null);
  }, []);

  const disconnect = useCallback(() => {
    if (connectTimer.current) clearTimeout(connectTimer.current);
    setConnected(false);
    setConnecting(null);
    setWalletName(null);
    setAddress(null);
  }, []);

  const spend = useCallback((currency: "USDC" | "PEG", amount: number) => {
    setBalances((prev) =>
      currency === "USDC"
        ? { ...prev, usdc: Math.max(0, prev.usdc - amount) }
        : { ...prev, peg: Math.max(0, prev.peg - amount) },
    );
  }, []);

  const value = useMemo(
    () => ({ connected, connecting, walletName, address, balances, connect, disconnect, spend }),
    [connected, connecting, walletName, address, balances, connect, disconnect, spend],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
