export function formatUsd(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPegPrice(value: number): string {
  return `$${value.toFixed(7)}`;
}

export function formatPeg(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function compactNumber(value: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function shortAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function randomBase58(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += BASE58[Math.floor(Math.random() * BASE58.length)];
  }
  return out;
}
