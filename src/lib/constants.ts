export const TOKEN_CA = "3GDrBbgzMfokcYChDqBZijXS3ppwhEEmosFQbgbPpump";

/**
 * Must match basePath in next.config.ts (same env var, inlined at build time).
 * Plain <img> tags don't get the basePath prefix automatically, so public
 * assets are referenced through this helper instead.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const PLUSHIE_PRICE_USD = 40;
export const MAX_QTY = 5;

/** Baseline mock PEG/USD price the random walk starts from. */
export const PEG_BASE_PRICE = 0.0042069;

/** Share of every sale routed to buyback & burn. */
export const BURN_SHARE = 0.5;

/** Mock launch stats the burn engine counts up from. */
export const MOCK_STATS = {
  plushiesSold: 1287,
  revenueUsd: 1287 * PLUSHIE_PRICE_USD,
  buybackUsd: (1287 * PLUSHIE_PRICE_USD) * BURN_SHARE,
  pegBurned: 6_942_000,
  totalSupply: 1_000_000_000,
  /** Buyback pool accrued toward the next on-chain burn event. */
  nextBurnPoolUsd: 340,
  nextBurnTargetUsd: 500,
};

export const LINKS = {
  website: "https://pegcoinsol.xyz",
  community: "https://x.com/PEGCoinSol",
  telegram: "https://t.me/PEGCoinSol",
  pumpfun: `https://pump.fun/coin/${TOKEN_CA}`,
};

export type WalletName = "Phantom" | "Solflare" | "Backpack";

export const WALLETS: { name: WalletName; gradient: string; emblem: string }[] = [
  { name: "Phantom", gradient: "from-[#534bb1] to-[#8a7ff0]", emblem: "P" },
  { name: "Solflare", gradient: "from-[#fc7227] to-[#ffc04d]", emblem: "S" },
  { name: "Backpack", gradient: "from-[#e33e3f] to-[#ff7a59]", emblem: "B" },
];
