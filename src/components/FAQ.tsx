"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "Is this real right now?",
    a: "This is the full preview build — the design, flow and burn mechanics are final, but wallet connections and payments are mocked. Phase 2 wires in real Solana wallet adapters, USDC/PEG transfers and on-chain burn receipts.",
  },
  {
    q: "How does the 50% buyback & burn actually work?",
    a: "Half of every $40 sale goes into a buyback pool. When the pool hits $5,000, it market-buys $PEG and sends the tokens to the burn address — permanently removing them from supply. Every burn will be a public, verifiable transaction.",
  },
  {
    q: "Why pay in $PEG instead of USDC?",
    a: "Same price either way — $40 worth at the live market rate. Paying in $PEG means your tokens go straight into the ecosystem loop, and you get to say your plushie was bought with pig money.",
  },
  {
    q: "Where do you ship?",
    a: "Worldwide, free. Once you complete checkout we collect your shipping address and email you tracking when the pig leaves the farm.",
  },
  {
    q: "How big is the plushie?",
    a: "30cm (about 12 inches) of ultra-soft minky fabric, embroidered dollar-circle on the forehead, stitched $PEG fabric tag. It is objectively the best pig.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <p className="mb-3 inline-block rounded-full border border-sky-soft/25 bg-navy-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-soft">
          FAQ
        </p>
        <h2 className="font-display text-glow text-4xl font-extrabold text-white sm:text-5xl">
          Frequently asked <span className="text-sky-soft">oinks</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq, i) => {
          const open = openIdx === i;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-display font-bold text-white">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  className="shrink-0 font-display text-xl font-bold text-sky-soft"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-sky-pale/75">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
