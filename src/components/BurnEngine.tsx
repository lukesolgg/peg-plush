"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BURN_SHARE, MOCK_STATS, PLUSHIE_PRICE_USD } from "@/lib/constants";
import { usePegPrice } from "@/lib/price";
import { compactNumber, formatPeg, formatUsd } from "@/lib/format";
import { CountUp } from "@/components/CountUp";

function Flame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c1 4-3 5.5-3 9a3 3 0 0 0 6 0c0-1.5-.8-2.5-.8-2.5S17 10 17 13a5 5 0 0 1-10 0c0-5 4-6.5 5-11z"
        fill="url(#flameGrad)"
      />
      <defs>
        <linearGradient id="flameGrad" x1="12" y1="2" x2="12" y2="18">
          <stop stopColor="#ffc04d" />
          <stop offset="1" stopColor="#ff5c2e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BurnEngine() {
  const { pegPrice } = usePegPrice();
  // Live-feeling mock stats: a sale trickles in every few seconds.
  const [stats, setStats] = useState(MOCK_STATS);

  useEffect(() => {
    const id = setInterval(() => {
      setStats((prev) => {
        const sale = PLUSHIE_PRICE_USD;
        const toBurnUsd = sale * BURN_SHARE;
        const pool = prev.nextBurnPoolUsd + toBurnUsd;
        const burnEvent = pool >= prev.nextBurnTargetUsd;
        return {
          ...prev,
          plushiesSold: prev.plushiesSold + 1,
          revenueUsd: prev.revenueUsd + sale,
          buybackUsd: prev.buybackUsd + toBurnUsd,
          pegBurned: burnEvent ? prev.pegBurned + Math.round(pool / pegPrice) : prev.pegBurned,
          nextBurnPoolUsd: burnEvent ? 0 : pool,
        };
      });
    }, 6000);
    return () => clearInterval(id);
  }, [pegPrice]);

  const burnedPct = (stats.pegBurned / stats.totalSupply) * 100;
  const poolPct = Math.min(100, (stats.nextBurnPoolUsd / stats.nextBurnTargetUsd) * 100);

  return (
    <section id="burn" className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-burn/30 bg-burn/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-burn">
          <Flame className="h-4 w-4 animate-flicker" /> The Burn Engine
        </p>
        <h2 className="font-display text-glow text-4xl font-extrabold text-white sm:text-5xl">
          Every plushie makes <span className="text-burn">$PEG scarcer</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sky-pale/75">
          Half of every single sale is routed to market buybacks of $PEG, and every buyback is burned forever. Plushies
          on couches, supply in ashes. <span className="text-sky-soft/60">(Mock numbers below — live on-chain data in Phase 2.)</span>
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Plushies adopted",
            node: <CountUp value={stats.plushiesSold} className="font-display text-4xl font-extrabold text-white" />,
            sub: "and counting",
          },
          {
            label: "Total raised",
            node: (
              <CountUp
                value={stats.revenueUsd}
                format={(n) => formatUsd(n, 0)}
                className="font-display text-4xl font-extrabold text-white"
              />
            ),
            sub: "100% transparent",
          },
          {
            label: "Sent to buybacks",
            node: (
              <CountUp
                value={stats.buybackUsd}
                format={(n) => formatUsd(n, 0)}
                className="font-display text-4xl font-extrabold text-sky-soft"
              />
            ),
            sub: "50% of all revenue",
          },
          {
            label: "$PEG burned",
            node: (
              <CountUp
                value={stats.pegBurned}
                format={(n) => compactNumber(Math.round(n))}
                className="font-display text-4xl font-extrabold text-burn"
              />
            ),
            sub: `${burnedPct.toFixed(3)}% of supply, gone forever`,
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-3xl p-6 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-soft/60">{card.label}</p>
            {card.node}
            <p className="mt-1.5 text-xs text-sky-pale/55">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Flow diagram + next burn progress */}
      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="glass rounded-3xl p-7 lg:col-span-3"
        >
          <h3 className="font-display text-lg font-bold text-white">Where your {formatUsd(PLUSHIE_PRICE_USD, 0)} goes</h3>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div className="flex-1 rounded-2xl border border-sky-soft/20 bg-navy-900/50 p-4 text-center">
              <p className="font-display text-2xl font-extrabold text-white">{formatUsd(PLUSHIE_PRICE_USD / 2, 0)}</p>
              <p className="mt-1 text-xs text-sky-pale/65">Plushie production, packaging &amp; worldwide shipping</p>
            </div>
            <div className="flex items-center justify-center font-display text-2xl text-sky-soft/50">+</div>
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-burn/40 bg-burn/10 p-4 text-center">
              <div className="absolute -right-3 -top-3 opacity-20">
                <Flame className="h-16 w-16" />
              </div>
              <p className="font-display text-2xl font-extrabold text-burn">{formatUsd(PLUSHIE_PRICE_USD / 2, 0)}</p>
              <p className="mt-1 text-xs text-sky-pale/65">Buys $PEG on the open market → burned 🔥</p>
            </div>
          </div>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-navy-900/70">
            <div className="flex h-full">
              <div className="h-full w-1/2 bg-gradient-to-r from-royal-500 to-sky-soft" />
              <div className="h-full w-1/2 bg-gradient-to-r from-burn to-burn-deep" />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-sky-soft/60">
            <span>50% plush logistics</span>
            <span className="text-burn">50% buyback &amp; burn</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-3xl p-7 lg:col-span-2"
        >
          <div className="absolute -bottom-6 -right-6 opacity-[0.12]">
            <Flame className="h-44 w-44" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Next burn event</h3>
          <p className="mt-1 text-xs text-sky-pale/60">
            Buyback pool fires automatically at {formatUsd(stats.nextBurnTargetUsd, 0)}
          </p>
          <p className="mt-5 font-display text-3xl font-extrabold text-white">
            <CountUp value={stats.nextBurnPoolUsd} format={(n) => formatUsd(n, 0)} />
            <span className="text-lg font-semibold text-sky-soft/50"> / {formatUsd(stats.nextBurnTargetUsd, 0)}</span>
          </p>
          <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-navy-900/70">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-burn to-burn-deep"
              animate={{ width: `${poolPct}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            />
          </div>
          <p className="mt-3 text-xs text-sky-pale/60">
            ≈ <span className="font-mono text-burn">{formatPeg(stats.nextBurnPoolUsd / pegPrice)} PEG</span> queued for
            the furnace at the current price
          </p>
        </motion.div>
      </div>
    </section>
  );
}
