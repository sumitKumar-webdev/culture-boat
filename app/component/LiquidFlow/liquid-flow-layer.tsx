"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

const FLOW_TILE_SIZE = 500000;

type LiquidFlowLayerProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  speed?: number;
  direction?: "vertical" | "horizontal";
};

export default function LiquidFlowLayer({
  children,
  className,
  strength = 12,
  speed = 34,
  direction = "vertical",
}: LiquidFlowLayerProps) {
  const filterId = useId().replace(/:/g, "");
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const offsetRef = useRef<SVGFEOffsetElement | null>(null);

  useEffect(() => {
    const turbulence = turbulenceRef.current;
    const offset = offsetRef.current;

    if (!turbulence || !offset || typeof window === "undefined") {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      return;
    }

    let rafId = 0;
    const startedAt = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp * 0.001;
      const drift =
        (((timestamp - startedAt) * 0.001 * speed) % FLOW_TILE_SIZE + FLOW_TILE_SIZE) %
        FLOW_TILE_SIZE;
      const baseX =
        direction === "vertical"
          ? 0.0022 + Math.sin(elapsed * 0.08) * 0.00018
          : 0.014 + Math.sin(elapsed * 0.08) * 0.0007;
      const baseY =
        direction === "vertical"
          ? 0.014 + Math.cos(elapsed * 0.06) * 0.0007
          : 0.0022 + Math.cos(elapsed * 0.06) * 0.00018;

      turbulence.setAttribute(
        "baseFrequency",
        `${baseX.toFixed(4)} ${baseY.toFixed(4)}`,
      );
      offset.setAttribute(
        "dx",
        direction === "horizontal" ? `${drift.toFixed(2)}` : "0",
      );
      offset.setAttribute(
        "dy",
        direction === "vertical" ? `${drift.toFixed(2)}` : "0",
      );

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [direction, speed]);

  return (
    <>
      <svg
        className="pointer-events-none absolute h-0 w-0"
        aria-hidden="true"
        focusable="false"
      >
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency={direction === "vertical" ? "0.0022 0.014" : "0.014 0.0022"}
            numOctaves="2"
            seed="7"
            stitchTiles="stitch"
            result="noise"
          />
          <feOffset
            ref={offsetRef}
            in="noise"
            dx="0"
            dy="0"
            result="flowNoise"
          />
          <feGaussianBlur in="flowNoise" stdDeviation="0.7" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={strength}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div
        className={`liquid-flow-layer ${className ?? ""}`.trim()}
        style={{ filter: `url("#${filterId}")` }}
      >
        {children}
      </div>
    </>
  );
}
