"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PEG_BASE_PRICE } from "@/lib/constants";

interface PriceContextValue {
  /** Mock live PEG/USD price (random walk around the base price). */
  pegPrice: number;
  /** Direction of the last tick, for up/down styling. */
  trend: "up" | "down" | "flat";
  /** Mock 24h change percentage. */
  change24h: number;
}

const PriceContext = createContext<PriceContextValue>({
  pegPrice: PEG_BASE_PRICE,
  trend: "flat",
  change24h: 12.4,
});

export function PriceProvider({ children }: { children: ReactNode }) {
  const [pegPrice, setPegPrice] = useState(PEG_BASE_PRICE);
  const [trend, setTrend] = useState<"up" | "down" | "flat">("flat");
  const [change24h, setChange24h] = useState(12.4);

  useEffect(() => {
    const id = setInterval(() => {
      setPegPrice((prev) => {
        // Random walk, mean-reverting toward the base price so it never drifts away.
        const pull = (PEG_BASE_PRICE - prev) * 0.05;
        const noise = prev * (Math.random() - 0.485) * 0.012;
        const next = Math.max(PEG_BASE_PRICE * 0.5, prev + pull + noise);
        setTrend(next > prev ? "up" : next < prev ? "down" : "flat");
        return next;
      });
      setChange24h((prev) => +(prev + (Math.random() - 0.48) * 0.3).toFixed(2));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const value = useMemo(() => ({ pegPrice, trend, change24h }), [pegPrice, trend, change24h]);

  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
}

export function usePegPrice(): PriceContextValue {
  return useContext(PriceContext);
}
