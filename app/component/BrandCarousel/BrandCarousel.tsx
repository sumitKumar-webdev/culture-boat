"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";

type BrandLogo = {
  src: string;
  alt: string;
  href?: string;
};

type BrandCarouselProps = {
  items: BrandLogo[];
  durationSeconds?: number;
  direction?: "left" | "right";
  className?: string;
  itemSizeClassName?: string;
  itemFrameClassName?: string;
  imageClassName?: string;
  minItems?: number;
};

export function BrandCarousel({
  items,
  durationSeconds = 40,
  direction = "left",
  className,
  itemSizeClassName = "w-[170px] h-[150px]",
  itemFrameClassName,
  imageClassName,
  minItems = 24,
}: BrandCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const halfWidthRef = useRef(0);
  const speedFactorRef = useRef(1);
  const speedTargetRef = useRef(1);

  const baseCount = items.length;
  const repeatMultiplier = baseCount
    ? Math.max(6, Math.ceil(minItems / baseCount))
    : 1;

  const sequenceItems = useMemo(() => {
    if (!baseCount) return [];
    return Array.from(
      { length: baseCount * repeatMultiplier },
      (_, index) => items[index % baseCount],
    );
  }, [items, baseCount, repeatMultiplier]);

  const doubled = [...sequenceItems, ...sequenceItems];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const updateWidths = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };

    updateWidths();

    const resizeObserver = new ResizeObserver(updateWidths);
    resizeObserver.observe(track);

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      const halfWidth = halfWidthRef.current;
      if (halfWidth > 0) {
        speedFactorRef.current +=
          (speedTargetRef.current - speedFactorRef.current) * 0.12;
        const speed = (halfWidth / durationSeconds) * speedFactorRef.current;
        const directionMultiplier = direction === "right" ? 1 : -1;
        offsetRef.current += speed * delta * directionMultiplier;
        if (Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current += offsetRef.current > 0 ? -halfWidth : halfWidth;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [durationSeconds, sequenceItems.length, direction]);

  return (
    <div
      className={`brand-marquee relative overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => {
        speedTargetRef.current = 0;
      }}
      onMouseLeave={() => {
        speedTargetRef.current = 1;
      }}
    >
      <div ref={trackRef} className="brand-marquee__track flex">
        {doubled.map((logo, index) => {
          const content = (
            <div className="flex items-center justify-center px-0 no-water-effect">
              <div
                className={`${itemSizeClassName} flex items-center justify-center p-3 transition-all duration-300 ${itemFrameClassName ?? ""}`}
              >
                <Image
                  alt={logo.alt}
                  width={2200}
                  height={2240}
                  unoptimized
                  className={`${itemSizeClassName} object-contain no-water-effect ${imageClassName ?? ""}`}
                  src={logo.src}
                />
              </div>
            </div>
          );

          if (logo.href) {
            return (
              <a
                key={`${logo.src}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 no-water-effect"
              >
                {content}
              </a>
            );
          }

          return (
            <div key={`${logo.src}-${index}`} className="flex-shrink-0 no-water-effect">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
