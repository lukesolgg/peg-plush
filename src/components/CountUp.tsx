"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface CountUpProps {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

/** Animates from 0 to `value` when scrolled into view, then tracks later changes to `value`. */
export function CountUp({ value, format = (n) => n.toLocaleString("en-US"), duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const started = useRef(false);
  const text = useTransform(mv, (latest) => format(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: started.current ? 0.8 : duration,
      ease: "easeOut",
    });
    started.current = true;
    return () => controls.stop();
  }, [inView, value, mv, duration]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}
