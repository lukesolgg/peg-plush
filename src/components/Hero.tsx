"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PLUSHIE_PRICE_USD, TOKEN_CA } from "@/lib/constants";
import { usePegPrice } from "@/lib/price";
import { formatPeg, formatPegPrice, formatUsd } from "@/lib/format";
import { PlushieSpin } from "@/components/PlushieSpin";
import { FloatingCoins } from "@/components/FloatingCoins";
import { CheckoutModal } from "@/components/CheckoutModal";

export function Hero() {
  const { pegPrice, trend, change24h } = usePegPrice();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pegAmount = PLUSHIE_PRICE_USD / pegPrice;

  const copyCa = async () => {
    await navigator.clipboard.writeText(TOKEN_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="plushie" className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <FloatingCoins />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        {/* Copy + price card */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-soft/25 bg-navy-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-soft"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
            Limited first drop · ships worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-glow text-5xl font-extrabold leading-[1.04] text-white sm:text-7xl"
          >
            The <span className="text-sky-soft">$peg</span>
            <br />
            plushie is here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-md text-lg text-sky-pale/80"
          >
            A pig pegged to the dollar — now pegged to your couch.{" "}
            <span className="font-semibold text-white">50% of every sale buys back and burns $PEG.</span>{" "}
            You get the plush, the chart gets the pump.
          </motion.p>

          {/* Price card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="glass mt-8 max-w-md rounded-3xl p-5"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-soft/60">Price per plushie</p>
                <p className="font-display text-4xl font-extrabold text-white">
                  {formatUsd(PLUSHIE_PRICE_USD, 0)}
                  <span className="ml-1.5 text-base font-semibold text-sky-soft/70">USDC</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-soft/60">or pay in $PEG</p>
                <p
                  className={`font-mono text-lg font-bold transition-colors ${
                    trend === "up" ? "text-mint" : trend === "down" ? "text-pig-pink" : "text-sky-pale"
                  }`}
                >
                  ≈ {formatPeg(pegAmount)} PEG
                </p>
                <p className="font-mono text-[11px] text-sky-soft/50">
                  live {formatPegPrice(pegPrice)} · 24h{" "}
                  <span className={change24h >= 0 ? "text-mint" : "text-pig-pink"}>
                    {change24h >= 0 ? "+" : ""}
                    {change24h}%
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setCheckoutOpen(true)}
                className="flex-1 rounded-2xl bg-gradient-to-br from-sky-soft to-royal-400 px-6 py-3.5 font-display text-lg font-extrabold text-navy-950 shadow-xl shadow-royal-500/40 transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
              >
                Buy the plushie →
              </button>
              <a
                href="#burn"
                className="rounded-2xl border border-sky-soft/25 px-6 py-3.5 text-center font-display text-lg font-bold text-sky-pale transition hover:border-sky-soft/50 hover:bg-white/5"
              >
                See the burn
              </a>
            </div>

            <p className="mt-3 text-center text-[11px] text-sky-soft/45">
              Mock checkout — nothing on-chain happens yet. Phase 2 plugs in real Solana payments.
            </p>
          </motion.div>

          {/* CA pill */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            onClick={copyCa}
            className="mt-5 flex w-full max-w-md items-center gap-3 rounded-2xl border border-sky-soft/15 bg-navy-900/60 px-4 py-2.5 text-left transition hover:border-sky-soft/35"
            title="Copy contract address"
          >
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-sky-soft/60">CA</span>
            <span className="min-w-0 flex-1 truncate font-mono text-xs text-sky-pale/80">{TOKEN_CA}</span>
            <span className="ml-auto shrink-0 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-sky-pale">
              {copied ? "copied!" : "copy"}
            </span>
          </motion.button>
        </div>

        {/* Plushie showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-royal-500/40 blur-[90px]" />
          {/* halo ring */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-sky-soft/25" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <PlushieSpin />
          </motion.div>

          {/* floating spec chips */}
          <motion.div
            className="glass absolute -left-4 top-16 rounded-2xl px-4 py-2.5 sm:-left-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <p className="font-display text-sm font-bold text-white">30cm of pig</p>
            <p className="text-[11px] text-sky-soft/70">ultra-soft minky fabric</p>
          </motion.div>
          <motion.div
            className="glass absolute -right-2 bottom-24 rounded-2xl px-4 py-2.5 sm:-right-8"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          >
            <p className="font-display text-sm font-bold text-burn">🔥 50% → burn</p>
            <p className="text-[11px] text-sky-soft/70">every single sale</p>
          </motion.div>
        </motion.div>
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </section>
  );
}
