"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoMark from "../Logo/LogoMark";

type PageLoaderProps = {
  mode?: "auto" | "always";
};

const START_VALUE = 8;
const FINISH_VALUE = 100;
const AUTO_HIDE_DELAY = 400;
const IMAGE_TIMEOUT = 2800;

export default function PageLoader({ mode = "auto" }: PageLoaderProps) {
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(START_VALUE);

  const progressRef = useRef(START_VALUE);
  const kickoffRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const stopTimers = () => {
    if (kickoffRef.current !== null) {
      cancelAnimationFrame(kickoffRef.current);
      kickoffRef.current = null;
    }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const setProgressValue = (value: number) => {
    progressRef.current = value;
    setProgress(value);
  };

  const animateProgress = (
    target: number,
    duration: number,
    fromOverride?: number
  ) => {
    const start = performance.now();
    const from = fromOverride ?? progressRef.current;

    return new Promise<void>((resolve) => {
      const tick = (now: number) => {
        const elapsed = Math.min(now - start, duration);
        const t = elapsed / duration;
        const eased = 1 - Math.pow(1 - t, 3);
        const nextValue = Math.round(from + (target - from) * eased);

        setProgressValue(nextValue);

        if (elapsed < duration) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    });
  };

  const waitForImages = async () => {
    const images = Array.from(document.images);
    const pending = images.filter((img) => !img.complete);

    if (!pending.length) return;

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

  const startLoading = async () => {
    stopTimers();
    setProgressValue(START_VALUE);
    setActive(true);

    void animateProgress(92, 1200, START_VALUE);

    await waitForImages();

    stopTimers();
    await animateProgress(FINISH_VALUE, 500);

    if (mode === "auto") {
      timeoutRef.current = window.setTimeout(() => {
        setActive(false);
      }, AUTO_HIDE_DELAY);
    }
  };

  useLayoutEffect(() => {
    kickoffRef.current = requestAnimationFrame(() => {
      kickoffRef.current = null;
      void startLoading();
    });

    return () => {
      stopTimers();
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mode]);

  useLayoutEffect(() => {
    if (mode !== "auto") return;

    const scrollbarWidth =
      typeof window !== "undefined"
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;

    if (active) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight =
        scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [active, mode]);

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          className="route-loader fixed inset-0 z-[100] bg-[#1c1917]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="route-loader__inner relative h-full w-full px-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LogoMark className="route-loader__logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute bottom-10 left-1/2 flex w-[min(260px,70vw)] -translate-x-1/2 flex-col items-center gap-3">
              <motion.div
                className="w-[4ch] text-center text-xs tabular-nums tracking-wide text-white/80"
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {clampedProgress}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}