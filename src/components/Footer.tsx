"use client";

import { LINKS, TOKEN_CA } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-sky-soft/10 bg-navy-950/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 ring-1 ring-sky-soft/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <circle cx="12" cy="12" r="9" fill="none" stroke="#cfe2ff" strokeWidth="2" />
              <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#cfe2ff">
                $
              </text>
            </svg>
          </span>
          <span className="font-display text-xl font-extrabold text-white">
            peg<span className="text-sky-soft">plush</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-sky-pale/80">
          <a href={LINKS.website} target="_blank" rel="noreferrer" className="rounded-full border border-sky-soft/20 px-4 py-1.5 transition hover:border-sky-soft/50 hover:text-white">
            pegcoinsol.xyz
          </a>
          <a href={LINKS.community} target="_blank" rel="noreferrer" className="rounded-full border border-sky-soft/20 px-4 py-1.5 transition hover:border-sky-soft/50 hover:text-white">
            𝕏 Community
          </a>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="rounded-full border border-sky-soft/20 px-4 py-1.5 transition hover:border-sky-soft/50 hover:text-white">
            Telegram
          </a>
          <a href={LINKS.pumpfun} target="_blank" rel="noreferrer" className="rounded-full border border-sky-soft/20 px-4 py-1.5 transition hover:border-sky-soft/50 hover:text-white">
            pump.fun
          </a>
        </div>

        <p className="max-w-md break-all font-mono text-[11px] text-sky-soft/40">CA: {TOKEN_CA}</p>

        <p className="max-w-lg text-xs leading-relaxed text-sky-pale/45">
          $PEG is a memecoin with no intrinsic value or expectation of financial return. The plushie, however, has
          intrinsic softness. Preview build — purchases are simulated and nothing happens on-chain.
        </p>
      </div>
    </footer>
  );
}
