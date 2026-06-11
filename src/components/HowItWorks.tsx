"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    emoji: "👛",
    title: "Connect wallet",
    body: "Phantom, Solflare or Backpack. Your wallet is your account — no signups, no passwords.",
  },
  {
    emoji: "💵",
    title: "Pay in USDC or $PEG",
    body: "$40 flat. Pay in stables, or pay in $PEG at the live market rate and flex your bags.",
  },
  {
    emoji: "📦",
    title: "We ship the pig",
    body: "30cm of ultra-soft minky plush, dollar mark on the forehead, shipped worldwide for free.",
  },
  {
    emoji: "🔥",
    title: "50% gets burned",
    body: "Half of every sale market-buys $PEG and sends it to the incinerator. Verifiable on-chain in Phase 2.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="mb-3 inline-block rounded-full border border-sky-soft/25 bg-navy-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-soft">
          How it works
        </p>
        <h2 className="font-display text-glow text-4xl font-extrabold text-white sm:text-5xl">
          Four steps to <span className="text-sky-soft">peak pig</span>
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass group relative rounded-3xl p-6 transition hover:-translate-y-1"
          >
            <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/[0.06]">
              {i + 1}
            </span>
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-600 to-royal-700 text-2xl ring-1 ring-sky-soft/25 transition group-hover:scale-110">
              {step.emoji}
            </span>
            <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sky-pale/70">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
