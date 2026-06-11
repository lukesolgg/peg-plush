"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/lib/wallet";
import { usePegPrice } from "@/lib/price";
import { formatPegPrice, shortAddress } from "@/lib/format";
import { WalletModal } from "@/components/WalletModal";

const NAV_LINKS = [
  { label: "Plushie", href: "#plushie" },
  { label: "Burn Engine", href: "#burn" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { connected, address, walletName, disconnect } = useWallet();
  const { pegPrice, trend } = usePegPrice();
  const [walletOpen, setWalletOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-4 z-40 px-4"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <nav className="glass-deep mx-auto flex max-w-6xl items-center gap-4 rounded-full py-2.5 pl-4 pr-2.5 shadow-xl shadow-navy-950/40">
          {/* Brand */}
          <a href="#plushie" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 ring-1 ring-sky-soft/40">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <circle cx="12" cy="12" r="9" fill="none" stroke="#cfe2ff" strokeWidth="2" />
                <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#cfe2ff">
                  $
                </text>
              </svg>
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              peg<span className="text-sky-soft">plush</span>
            </span>
          </a>

          {/* Links */}
          <div className="ml-2 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-sky-pale/80 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2.5">
            {/* Live mock price chip */}
            <div className="hidden items-center gap-1.5 rounded-full border border-sky-soft/20 bg-navy-900/60 px-3 py-1.5 font-mono text-xs sm:flex">
              <span className="text-sky-soft/60">$PEG</span>
              <span className={trend === "up" ? "text-mint" : trend === "down" ? "text-pig-pink" : "text-sky-pale"}>
                {formatPegPrice(pegPrice)}
              </span>
              <span className={`text-[10px] ${trend === "up" ? "text-mint" : "text-pig-pink"}`}>
                {trend === "down" ? "▼" : "▲"}
              </span>
            </div>

            {connected && address ? (
              <button
                onClick={disconnect}
                className="group flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 py-2 pl-3 pr-4 text-sm font-semibold text-mint transition hover:border-pig-pink/40 hover:bg-pig-pink/10 hover:text-pig-pink"
                title={`Connected with ${walletName} — click to disconnect`}
              >
                <span className="h-2 w-2 rounded-full bg-mint group-hover:bg-pig-pink" />
                <span className="font-mono text-xs">{shortAddress(address)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletOpen(true)}
                className="rounded-full bg-gradient-to-br from-sky-soft to-royal-400 px-5 py-2 font-display text-sm font-bold text-navy-950 shadow-lg shadow-royal-500/30 transition hover:brightness-110"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="rounded-full p-2 text-sky-pale md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" /> : <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="glass-deep mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl p-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 font-medium text-sky-pale/90 transition hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </motion.header>

      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
