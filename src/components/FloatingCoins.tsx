"use client";

/** Decorative $-coins drifting in the background. Positions are fixed so SSR and client render identically. */
const COINS = [
  { left: "6%", top: "14%", size: 52, delay: "0s", duration: "8s", opacity: 0.35 },
  { left: "88%", top: "10%", size: 64, delay: "1.2s", duration: "10s", opacity: 0.4 },
  { left: "78%", top: "46%", size: 40, delay: "0.6s", duration: "7s", opacity: 0.3 },
  { left: "12%", top: "62%", size: 46, delay: "2s", duration: "9s", opacity: 0.32 },
  { left: "45%", top: "8%", size: 34, delay: "0.3s", duration: "8.5s", opacity: 0.25 },
  { left: "93%", top: "74%", size: 56, delay: "1.6s", duration: "11s", opacity: 0.35 },
  { left: "30%", top: "82%", size: 38, delay: "0.9s", duration: "7.5s", opacity: 0.28 },
  { left: "60%", top: "68%", size: 30, delay: "2.4s", duration: "9.5s", opacity: 0.22 },
];

export function FloatingCoins() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {COINS.map((coin, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: coin.left,
            top: coin.top,
            width: coin.size,
            height: coin.size,
            opacity: coin.opacity,
            animation: `float ${coin.duration} ease-in-out ${coin.delay} infinite`,
          }}
        >
          <svg viewBox="0 0 48 48" className="h-full w-full">
            <circle cx="24" cy="24" r="22" fill="#1c49a4" stroke="#8fc0ff" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="16" fill="none" stroke="#8fc0ff" strokeWidth="1.5" opacity="0.6" />
            <text
              x="24"
              y="32"
              textAnchor="middle"
              fontSize="22"
              fontWeight="800"
              fill="#cfe2ff"
              fontFamily="var(--font-baloo), sans-serif"
            >
              $
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
}
