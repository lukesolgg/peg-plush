"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BURN_SHARE, MAX_QTY, PLUSHIE_PRICE_USD, WALLETS } from "@/lib/constants";
import { usePegPrice } from "@/lib/price";
import { useWallet } from "@/lib/wallet";
import { formatPeg, formatPegPrice, formatUsd, randomBase58, shortAddress } from "@/lib/format";

type Step = "connect" | "order" | "shipping" | "review" | "processing" | "success";
type Currency = "USDC" | "PEG";

interface Shipping {
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  postal: string;
  country: string;
}

const EMPTY_SHIPPING: Shipping = {
  name: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  postal: "",
  country: "",
};

const STEP_LABELS: { key: Step; label: string }[] = [
  { key: "order", label: "Order" },
  { key: "shipping", label: "Shipping" },
  { key: "review", label: "Confirm" },
];

const PROCESSING_STAGES = [
  "Waking up the pig…",
  "Building transaction…",
  "Awaiting wallet signature…",
  "Confirming on Solana…",
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-soft/60">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-navy-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-sky-soft/30 outline-none transition focus:border-sky-soft/60 ${
          error ? "border-pig-pink/60" : "border-sky-soft/15"
        }`}
      />
      {error && <span className="mt-1 block text-[11px] text-pig-pink">{error}</span>}
    </label>
  );
}

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { connected, connecting, connect, address, balances, spend } = useWallet();
  const { pegPrice } = usePegPrice();

  const [step, setStep] = useState<Step>("order");
  const [currency, setCurrency] = useState<Currency>("USDC");
  const [qty, setQty] = useState(1);
  const [shipping, setShipping] = useState<Shipping>(EMPTY_SHIPPING);
  const [errors, setErrors] = useState<Partial<Record<keyof Shipping, string>>>({});
  const [processingStage, setProcessingStage] = useState(0);
  const [receipt, setReceipt] = useState<{ tx: string; order: string; pegLocked: number } | null>(null);

  const totalUsd = qty * PLUSHIE_PRICE_USD;
  const totalPeg = totalUsd / pegPrice;
  const burnUsd = totalUsd * BURN_SHARE;
  const payAmount = currency === "USDC" ? totalUsd : totalPeg;
  const hasFunds = currency === "USDC" ? balances.usdc >= totalUsd : balances.peg >= totalPeg;

  const activeStep: Step = !connected ? "connect" : step;

  const stepIndex = useMemo(() => STEP_LABELS.findIndex((s) => s.key === activeStep), [activeStep]);

  const close = () => {
    onClose();
    // Reset after the exit animation so a reopened modal starts fresh.
    setTimeout(() => {
      setStep("order");
      setProcessingStage(0);
      setReceipt(null);
      setErrors({});
    }, 350);
  };

  const validateShipping = (): boolean => {
    const next: Partial<Record<keyof Shipping, string>> = {};
    if (!shipping.name.trim()) next.name = "Who do we ship the pig to?";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(shipping.email)) next.email = "Valid email needed for tracking";
    if (!shipping.address1.trim()) next.address1 = "Street address required";
    if (!shipping.city.trim()) next.city = "City required";
    if (!shipping.postal.trim()) next.postal = "Postal / ZIP required";
    if (!shipping.country.trim()) next.country = "Country required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const startPurchase = () => {
    setStep("processing");
    setProcessingStage(0);
    // Walk through fake tx stages, then mint the receipt.
    PROCESSING_STAGES.forEach((_, i) => {
      setTimeout(() => setProcessingStage(i), i * 900);
    });
    setTimeout(() => {
      spend(currency, payAmount);
      setReceipt({
        tx: randomBase58(88),
        order: `PEG-${randomBase58(6).toUpperCase()}`,
        pegLocked: Math.round(burnUsd / pegPrice),
      });
      setStep("success");
    }, PROCESSING_STAGES.length * 900 + 600);
  };

  const set = (key: keyof Shipping) => (v: string) => setShipping((p) => ({ ...p, [key]: v }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm"
            onClick={activeStep === "processing" ? undefined : close}
          />
          <motion.div
            className="glass-deep scrollbar-slim relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 shadow-2xl shadow-navy-950/60 sm:p-7"
            initial={{ scale: 0.92, y: 28 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 28 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-2xl font-extrabold text-white">
                {activeStep === "success" ? "Pig secured! 🎉" : "Adopt a $PEG plushie"}
              </h3>
              {activeStep !== "processing" && (
                <button
                  onClick={close}
                  className="rounded-full p-1.5 text-sky-soft/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close checkout"
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {/* Step indicator */}
            {stepIndex >= 0 && (
              <div className="mb-6 flex items-center gap-2">
                {STEP_LABELS.map((s, i) => (
                  <div key={s.key} className="flex flex-1 items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        i < stepIndex
                          ? "bg-mint text-navy-950"
                          : i === stepIndex
                            ? "bg-sky-soft text-navy-950"
                            : "bg-white/10 text-sky-soft/50"
                      }`}
                    >
                      {i < stepIndex ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold ${i === stepIndex ? "text-white" : "text-sky-soft/50"}`}
                    >
                      {s.label}
                    </span>
                    {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-sky-soft/20" />}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP: connect */}
              {activeStep === "connect" && (
                <motion.div
                  key="connect"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <p className="mb-5 text-sm text-sky-pale/75">
                    Connect a wallet to start checkout.{" "}
                    <span className="text-sky-soft/60">Mock mode — no real wallet is touched.</span>
                  </p>
                  <div className="flex flex-col gap-3">
                    {WALLETS.map((wallet) => (
                      <button
                        key={wallet.name}
                        disabled={connecting !== null}
                        onClick={() => connect(wallet.name)}
                        className="group flex items-center gap-4 rounded-2xl border border-sky-soft/15 bg-white/[0.04] p-3.5 text-left transition hover:border-sky-soft/40 hover:bg-white/[0.08] disabled:opacity-60"
                      >
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${wallet.gradient} font-display text-lg font-extrabold text-white shadow-lg`}
                        >
                          {wallet.emblem}
                        </span>
                        <span className="font-display font-semibold text-white">{wallet.name}</span>
                        {connecting === wallet.name ? (
                          <span className="ml-auto h-5 w-5 animate-spin rounded-full border-2 border-sky-soft/30 border-t-sky-soft" />
                        ) : (
                          <span className="ml-auto text-sky-soft/40 transition group-hover:translate-x-0.5 group-hover:text-sky-soft">
                            →
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: order — currency + quantity */}
              {activeStep === "order" && (
                <motion.div
                  key="order"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  {address && (
                    <p className="mb-4 flex items-center gap-2 text-xs text-sky-soft/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      Connected as <span className="font-mono text-sky-pale">{shortAddress(address)}</span>
                    </p>
                  )}

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-soft/60">Pay with</p>
                  <div className="mb-5 grid grid-cols-2 gap-3">
                    {(
                      [
                        { cur: "USDC" as Currency, amount: formatUsd(totalUsd, 2), bal: `${formatUsd(balances.usdc, 2)} available` },
                        { cur: "PEG" as Currency, amount: `${formatPeg(totalPeg)} PEG`, bal: `${formatPeg(balances.peg)} PEG available` },
                      ]
                    ).map((opt) => (
                      <button
                        key={opt.cur}
                        onClick={() => setCurrency(opt.cur)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          currency === opt.cur
                            ? "border-sky-soft/70 bg-sky-soft/10 shadow-lg shadow-royal-500/20"
                            : "border-sky-soft/15 bg-white/[0.03] hover:border-sky-soft/35"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="font-display font-bold text-white">{opt.cur}</span>
                          <span
                            className={`h-4 w-4 rounded-full border-2 ${
                              currency === opt.cur ? "border-sky-soft bg-sky-soft" : "border-sky-soft/30"
                            }`}
                          />
                        </span>
                        <span className="mt-2 block font-mono text-sm text-sky-pale">{opt.amount}</span>
                        <span className="mt-0.5 block text-[11px] text-sky-soft/50">{opt.bal}</span>
                      </button>
                    ))}
                  </div>

                  {currency === "PEG" && (
                    <p className="mb-5 rounded-xl border border-sky-soft/15 bg-navy-900/50 px-3.5 py-2.5 font-mono text-[11px] text-sky-soft/65">
                      Live rate {formatPegPrice(pegPrice)} / PEG — the exact amount locks when you confirm.
                    </p>
                  )}

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-soft/60">Quantity</p>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center rounded-2xl border border-sky-soft/20 bg-navy-900/50">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="px-4 py-2.5 font-display text-xl font-bold text-sky-soft transition hover:text-white disabled:opacity-30"
                        disabled={qty <= 1}
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-display text-xl font-extrabold text-white">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                        className="px-4 py-2.5 font-display text-xl font-bold text-sky-soft transition hover:text-white disabled:opacity-30"
                        disabled={qty >= MAX_QTY}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-sky-soft/55">
                      max {MAX_QTY} per wallet
                      <br />
                      free worldwide shipping
                    </p>
                  </div>

                  {!hasFunds && (
                    <p className="mb-4 rounded-xl border border-pig-pink/30 bg-pig-pink/10 px-3.5 py-2.5 text-xs text-pig-pink">
                      Not enough {currency} in this wallet for {qty} plushie{qty > 1 ? "s" : ""}.
                    </p>
                  )}

                  <button
                    onClick={() => setStep("shipping")}
                    disabled={!hasFunds}
                    className="w-full rounded-2xl bg-gradient-to-br from-sky-soft to-royal-400 px-6 py-3.5 font-display text-lg font-extrabold text-navy-950 shadow-xl shadow-royal-500/40 transition hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
                  >
                    Continue to shipping →
                  </button>
                </motion.div>
              )}

              {/* STEP: shipping */}
              {activeStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field label="Full name" value={shipping.name} onChange={set("name")} placeholder="Peg Holder" error={errors.name} />
                    <Field label="Email" type="email" value={shipping.email} onChange={set("email")} placeholder="you@peg.xyz" error={errors.email} />
                    <Field label="Address" value={shipping.address1} onChange={set("address1")} placeholder="123 Oink Street" error={errors.address1} className="sm:col-span-2" />
                    <Field label="Apt / unit (optional)" value={shipping.address2} onChange={set("address2")} placeholder="Sty 4B" className="sm:col-span-2" />
                    <Field label="City" value={shipping.city} onChange={set("city")} placeholder="Belfast" error={errors.city} />
                    <Field label="Postal / ZIP" value={shipping.postal} onChange={set("postal")} placeholder="BT1 1AA" error={errors.postal} />
                    <Field label="Country" value={shipping.country} onChange={set("country")} placeholder="United Kingdom" error={errors.country} className="sm:col-span-2" />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep("order")}
                      className="rounded-2xl border border-sky-soft/25 px-5 py-3.5 font-display font-bold text-sky-pale transition hover:bg-white/5"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (validateShipping()) setStep("review");
                      }}
                      className="flex-1 rounded-2xl bg-gradient-to-br from-sky-soft to-royal-400 px-6 py-3.5 font-display text-lg font-extrabold text-navy-950 shadow-xl shadow-royal-500/40 transition hover:brightness-110"
                    >
                      Review order →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP: review */}
              {activeStep === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="mb-4 rounded-2xl border border-sky-soft/15 bg-navy-900/50 p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-sky-pale/70">
                        $PEG plushie × {qty}
                      </span>
                      <span className="font-mono text-white">{formatUsd(totalUsd, 2)}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-sky-pale/70">Shipping (worldwide)</span>
                      <span className="font-mono text-mint">FREE</span>
                    </div>
                    <div className="my-3 h-px bg-sky-soft/15" />
                    <div className="flex justify-between">
                      <span className="font-display font-bold text-white">You pay</span>
                      <span className="text-right">
                        <span className="block font-mono font-bold text-white">
                          {currency === "USDC" ? formatUsd(totalUsd, 2) : `${formatPeg(totalPeg)} PEG`}
                        </span>
                        {currency === "PEG" && (
                          <span className="block font-mono text-[11px] text-sky-soft/50">
                            @ {formatPegPrice(pegPrice)}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 rounded-2xl border border-burn/30 bg-burn/[0.07] p-4 text-sm">
                    <p className="font-display font-bold text-burn">🔥 Your burn contribution</p>
                    <p className="mt-1 text-sky-pale/75">
                      {formatUsd(burnUsd, 2)} of this order buys back{" "}
                      <span className="font-mono text-burn">≈ {formatPeg(burnUsd / pegPrice)} PEG</span>{" "}and burns it
                      forever. You&apos;re literally cooking the supply.
                    </p>
                  </div>

                  <div className="mb-6 rounded-2xl border border-sky-soft/15 bg-navy-900/50 p-4 text-sm">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-soft/60">Ships to</p>
                    <p className="text-white">{shipping.name}</p>
                    <p className="text-sky-pale/70">
                      {shipping.address1}
                      {shipping.address2 ? `, ${shipping.address2}` : ""}, {shipping.city}, {shipping.postal},{" "}
                      {shipping.country}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("shipping")}
                      className="rounded-2xl border border-sky-soft/25 px-5 py-3.5 font-display font-bold text-sky-pale transition hover:bg-white/5"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={startPurchase}
                      className="flex-1 rounded-2xl bg-gradient-to-br from-sky-soft to-royal-400 px-6 py-3.5 font-display text-lg font-extrabold text-navy-950 shadow-xl shadow-royal-500/40 transition hover:brightness-110"
                    >
                      Confirm &amp; pay (mock)
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP: processing */}
              {activeStep === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    className="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-sky-soft/20 border-t-sky-soft"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="font-display text-xl font-bold text-white">{PROCESSING_STAGES[processingStage]}</p>
                  <p className="mt-2 text-sm text-sky-soft/60">Simulated — no funds are moving.</p>
                  <div className="mx-auto mt-6 flex max-w-[200px] gap-1.5">
                    {PROCESSING_STAGES.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= processingStage ? "bg-sky-soft" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP: success */}
              {activeStep === "success" && receipt && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {/* confetti burst */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute top-0 block h-2 w-2 rounded-sm"
                        style={{
                          left: `${(i * 41) % 100}%`,
                          background: ["#8fc0ff", "#f5a8bb", "#ff8a3d", "#4ade80", "#cfe2ff"][i % 5],
                        }}
                        initial={{ y: -16, opacity: 1, rotate: 0 }}
                        animate={{ y: 180, opacity: 0, rotate: 360 + (i % 4) * 90 }}
                        transition={{ duration: 1.6 + (i % 5) * 0.25, delay: (i % 7) * 0.1, ease: "easeIn" }}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-mint/15 ring-2 ring-mint/50"
                  >
                    <span className="text-4xl">🐷</span>
                  </motion.div>

                  <p className="font-display text-2xl font-extrabold text-white">
                    {qty} plushie{qty > 1 ? "s" : ""} incoming!
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-sky-pale/75">
                    Order <span className="font-mono text-sky-soft">{receipt.order}</span> confirmed. Your pig ships to{" "}
                    {shipping.city} — and <span className="font-mono text-burn">≈ {formatPeg(receipt.pegLocked)} PEG</span>{" "}
                    just got queued for the furnace. 🔥
                  </p>

                  <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-sky-soft/15 bg-navy-900/50 p-4 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-sky-soft/60">Mock transaction</p>
                    <p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-sky-pale/70">{receipt.tx}</p>
                  </div>

                  <button
                    onClick={close}
                    className="mt-6 w-full rounded-2xl bg-gradient-to-br from-sky-soft to-royal-400 px-6 py-3.5 font-display text-lg font-extrabold text-navy-950 shadow-xl shadow-royal-500/40 transition hover:brightness-110"
                  >
                    Oink. Done. 🐽
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
