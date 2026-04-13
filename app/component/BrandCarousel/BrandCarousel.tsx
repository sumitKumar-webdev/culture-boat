"use client";

import { useEffect, useRef } from "react";
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
};

export function BrandCarousel({
  items,
  durationSeconds = 40,
  direction = "left",
}: BrandCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const halfWidthRef = useRef(0);
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const updateWidth = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(track);

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      const halfWidth = halfWidthRef.current;
      if (halfWidth > 0 && !pausedRef.current) {
        const speed = halfWidth / durationSeconds;
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
  }, [durationSeconds, items.length, direction]);

  return (
    <div
      className="brand-marquee relative overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div ref={trackRef} className="brand-marquee__track flex">
        {doubled.map((logo, index) => {
          const content = (
            <div className="flex items-center justify-center px-0 no-water-effect">
              <div className="w-[170px] h-[150px] flex items-center justify-center p-3 hover:shadow-2xl transition-all duration-300">
                <Image
                  alt={logo.alt}
                  width={2200}
                  height={2240}
                  unoptimized
                  className="w-[170px] h-[150px] object-contain no-water-effect"
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
