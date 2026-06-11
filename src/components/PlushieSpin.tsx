"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/constants";

const FRAME_COUNT = 8;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => asset(`/spin/frame-${i}.png`));
/** Horizontal pixels of drag per frame step. */
const PX_PER_FRAME = 32;
/** Idle auto-spin speed. */
const AUTO_SPIN_MS = 650;
/** How long after the user lets go before auto-spin resumes. */
const RESUME_AFTER_MS = 4000;

export function PlushieSpin() {
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; frame: number } | null>(null);
  const lastInteraction = useRef(0);
  const interacted = useRef(false);

  // Idle auto-spin, paused while dragging and shortly after.
  useEffect(() => {
    const id = setInterval(() => {
      if (dragStart.current) return;
      if (Date.now() - lastInteraction.current < RESUME_AFTER_MS) return;
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, AUTO_SPIN_MS);
    return () => clearInterval(id);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragStart.current = { x: e.clientX, frame };
      interacted.current = true;
      setDragging(true);
    },
    [frame],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const steps = Math.round((e.clientX - dragStart.current.x) / PX_PER_FRAME);
    const next = (((dragStart.current.frame + steps) % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
    setFrame(next);
    lastInteraction.current = Date.now();
  }, []);

  const endDrag = useCallback(() => {
    dragStart.current = null;
    lastInteraction.current = Date.now();
    setDragging(false);
  }, []);

  return (
    <div
      className={`relative select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label="The $PEG plushie — drag to spin it around"
    >
      {/* all frames stacked; only the active one is visible (no swap flicker) */}
      <div className="relative mx-auto w-full max-w-[360px]">
        {FRAMES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- unoptimized export; next/image drops basePath
          <img
            key={src}
            src={src}
            alt=""
            width={845}
            height={1024}
            draggable={false}
            className={`w-full drop-shadow-[0_30px_50px_rgba(4,12,32,0.6)] ${
              i === frame ? "relative opacity-100" : "absolute inset-0 opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-sky-soft/60">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 15-6.7M21 12a9 9 0 0 1-15 6.7" strokeLinecap="round" />
          <path d="M18 2v4h-4M6 22v-4h4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        drag to spin the pig
      </div>
    </div>
  );
}
