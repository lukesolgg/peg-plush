"use client";

import { AnimatePresence, motion } from "framer-motion";
import { WALLETS } from "@/lib/constants";
import { useWallet } from "@/lib/wallet";

export function WalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { connect, connecting } = useWallet();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="glass-deep relative w-full max-w-sm rounded-3xl p-6 shadow-2xl shadow-navy-950/60"
            initial={{ scale: 0.9, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-sky-pale">Connect wallet</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-sky-soft/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="mb-5 text-sm text-sky-soft/70">
              Mock mode — no real wallet is touched. We&apos;ll wire up the real adapters in Phase&nbsp;2.
            </p>

            <div className="flex flex-col gap-3">
              {WALLETS.map((wallet) => (
                <button
                  key={wallet.name}
                  disabled={connecting !== null}
                  onClick={async () => {
                    await connect(wallet.name);
                    onClose();
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-sky-soft/15 bg-white/[0.04] p-3.5 text-left transition hover:border-sky-soft/40 hover:bg-white/[0.08] disabled:opacity-60"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${wallet.gradient} font-display text-lg font-extrabold text-white shadow-lg`}
                  >
                    {wallet.emblem}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display font-semibold text-white">{wallet.name}</span>
                    <span className="block text-xs text-sky-soft/60">Solana wallet</span>
                  </span>
                  {connecting === wallet.name ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-soft/30 border-t-sky-soft" />
                  ) : (
                    <span className="text-sky-soft/40 transition group-hover:translate-x-0.5 group-hover:text-sky-soft">
                      →
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
