"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import LogoMark from "../Logo/LogoMark";

type PageLoaderProps = {
  mode?: "auto" | "always";
};

const START_VALUE = 8;
const FINISH_VALUE = 100;
const AUTO_HIDE_DELAY = 260;
const IMAGE_TIMEOUT = 2800;

export default function PageLoader({ mode = "auto" }: PageLoaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [active, setActive] = useState(mode === "always");
  const [progress, setProgress] = useState(START_VALUE);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const stopTimers = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const animateProgress = (target: number, duration: number, fromOverride?: number) => {
    const start = performance.now();
    const from = fromOverride ?? progress;

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, duration);
      const t = elapsed / duration;
      const eased = 1 - Math.pow(1 - t, 3);
      const nextValue = Math.round(from + (target - from) * eased);
      setProgress(nextValue);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const waitForImages = async () => {
    const images = Array.from(document.images);
    const pending = images.filter((img) => !img.complete);
    if (!pending.length) {
      return;
    }

    await new Promise<void>((resolve) => {
      let remaining = pending.length;
      const done = () => {
        remaining -= 1;
        if (remaining <= 0) resolve();
      };

      pending.forEach((img) => {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });

      timeoutRef.current = window.setTimeout(resolve, IMAGE_TIMEOUT);
    });
  };

  const startLoading = () => {
    stopTimers();
    setProgress(START_VALUE);
    setActive(true);
    animateProgress(92, 1200, START_VALUE);

    requestAnimationFrame(async () => {
      await waitForImages();
      stopTimers();
      setProgress(FINISH_VALUE);
      if (mode === "auto") {
        timeoutRef.current = window.setTimeout(() => {
          setActive(false);
        }, AUTO_HIDE_DELAY);
      }
    });
  };

  useEffect(() => {
    if (mode === "always") {
      startLoading();
      return () => stopTimers();
    }
    startLoading();
    return () => stopTimers();
  }, [pathname, searchKey, mode]);

  useEffect(() => {
    if (mode === "auto") {
      document.body.style.overflow = active ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [active, mode]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="route-loader fixed inset-0 z-[100] grid-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            className="route-loader__inner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LogoMark className="route-loader__logo" />
            <div className="route-loader__bar">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="route-loader__progress">{progress}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
