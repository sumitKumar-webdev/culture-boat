"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ImageCard } from "../Cards/image-card";

export type HomeClientTextItem = {
  label: string;
  href: string;
};

export type HomeClientImage = {
  src: string;
  alt: string;
};

type HomeClientProps = {
  textItems: HomeClientTextItem[];
  leftImages: HomeClientImage[];
  rightImages: HomeClientImage[];
  footerText?: string;
};

export default function HomePageClient({
  textItems,
  leftImages,
  rightImages,
  footerText = "Scroll and Select",
}: HomeClientProps) {
  const baseOffset = 70;
  const phaseShift = 60;
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const textViewportRef = useRef<HTMLDivElement | null>(null);
  const leftImgRef = useRef<HTMLDivElement | null>(null);
  const rightImgRef = useRef<HTMLDivElement | null>(null);
  const boundsRef = useRef({ minX: 0, maxX: 0 });
  const targetScrollOffsetRef = useRef(0);
  const renderedScrollOffsetRef = useRef(0);
  const imageHeightRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const cursorPosRef = useRef({ x: -9999, y: -9999 });
  const initialisedRef = useRef(false);

  useLayoutEffect(() => {
    const container = textContainerRef.current;
    const viewport = textViewportRef.current;
    const leftImagesNode = leftImgRef.current;
    const rightImagesNode = rightImgRef.current;

    if (!container || !viewport || !leftImagesNode || !rightImagesNode) return;

    const textNodes = Array.from(container.children) as HTMLDivElement[];
    let glowNodes: HTMLElement[] = [];
    let settleTimer: number | null = null;

    const applyPosition = (offset: number) => {
      const imageHeight = imageHeightRef.current;
      const imageOffset = offset * 0.72;
      const { minX, maxX } = boundsRef.current;
      const progressRange = maxX - minX || 1;
      const ringProgress =
        ((maxX - offset) / progressRange) * (textItems.length - 1);

      const isMobile = window.innerWidth < 640;
      const isTablet = !isMobile && window.innerWidth < 768;

      const horizontalSpread = isMobile
        ? window.innerWidth * 0.62
        : isTablet
          ? window.innerWidth * 0.5
          : window.innerWidth * 0.54;

      const depthSpread = isMobile ? 420 : isTablet ? 300 : 380;
      const baseZ = isMobile ? 80 : 240;
      const maxAngle = isMobile ? 1.45 : isTablet ? 1.15 : 1.05;
      const angleStep = isMobile ? 1.45 : isTablet ? 0.9 : 0.8;
      const sizeScale = 0.62;

      textNodes.forEach((node, index) => {
        const distanceFromFront = index - ringProgress;
        const rawAngle = distanceFromFront * angleStep;
        const clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, rawAngle));
        const distanceMagnitude = Math.abs(clampedAngle) / maxAngle;
        const xOffset = Math.sin(clampedAngle) * horizontalSpread;
        const zOffset = baseZ + distanceMagnitude * depthSpread;
        const cosA = Math.cos(clampedAngle);
        const sinA = Math.sin(clampedAngle);

        const matrix = `matrix3d(${cosA.toFixed(6)},0,${sinA.toFixed(6)},0,0,1,0,0,${(-sinA).toFixed(6)},0,${cosA.toFixed(6)},0,${xOffset.toFixed(3)},0,${zOffset.toFixed(3)},1)`;

        const centerShrink = 0.94;
        const edgeShrink = 0.9;
        const sizeTaper =
          centerShrink - (centerShrink - edgeShrink) * distanceMagnitude;

        node.style.transform = `translate(-50%, -50%) scale(${sizeScale * sizeTaper}) ${matrix}`;
        node.style.filter = "none";
        node.style.zIndex = `${100 - Math.round(distanceMagnitude * 12)}`;
        node.style.pointerEvents = "none";
      });

      if (initialisedRef.current) {
        container.style.opacity = "1";
      }

      const leftOffset = imageOffset - baseOffset - phaseShift;
      const rightOffset = -imageOffset * 1.05 + baseOffset + phaseShift;

      leftImagesNode.style.transform = `translate3d(0, ${leftOffset}px, 0)`;
      rightImagesNode.style.transform = `translate3d(0, ${rightOffset}px, 0)`;
      leftImagesNode.style.maxHeight = `${imageHeight}px`;
      rightImagesNode.style.maxHeight = `${imageHeight}px`;
    };

    const applyGlow = (nodes: HTMLElement[]) => {
      const { x, y } = cursorPosRef.current;
      const maxDistance = 220;

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - centerX, y - centerY);
        const intensity = Math.max(0, 1 - distance / maxDistance);
        const glowSize = Math.round(40 * intensity);
        const glowOpacity = intensity.toFixed(3);

        node.style.setProperty("--glow", `${glowSize}`);
        node.style.setProperty("--glow-opacity", glowOpacity);
      });
    };

    const measure = () => {
      const items = Array.from(container.children) as HTMLDivElement[];
      if (!items.length) return;

      const step =
        window.innerWidth < 640 ? 380 : window.innerWidth < 768 ? 280 : 360;

      const maxX = 0;
      const minX = -step * (items.length - 1);

      boundsRef.current = { minX, maxX };
      imageHeightRef.current = leftImagesNode.scrollHeight;

      targetScrollOffsetRef.current = Math.max(
        minX,
        Math.min(
          maxX,
          initialisedRef.current ? targetScrollOffsetRef.current : maxX,
        ),
      );

      renderedScrollOffsetRef.current = Math.max(
        minX,
        Math.min(
          maxX,
          initialisedRef.current ? renderedScrollOffsetRef.current : maxX,
        ),
      );

      initialisedRef.current = true;

      applyPosition(renderedScrollOffsetRef.current);
      glowNodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-glow]"),
      );
    };

    const animate = () => {
      const { minX, maxX } = boundsRef.current;

      targetScrollOffsetRef.current = Math.max(
        minX,
        Math.min(maxX, targetScrollOffsetRef.current),
      );

      const delta =
        targetScrollOffsetRef.current - renderedScrollOffsetRef.current;

      renderedScrollOffsetRef.current += delta * 0.12;

      applyPosition(renderedScrollOffsetRef.current);

      if (!glowNodes.length) {
        glowNodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-glow]"),
        );
      }

      if (glowNodes.length) {
        applyGlow(glowNodes);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const updateFromDelta = (delta: number, multiplier = 1.35) => {
      targetScrollOffsetRef.current -= delta * multiplier;
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      updateFromDelta(event.deltaY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchX = event.touches[0]?.clientX ?? 0;
      const touchY = event.touches[0]?.clientY ?? 0;

      const deltaX = touchStartX - touchX;
      const deltaY = touchStartY - touchY;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      const isVertical = absY > absX;
      const dominantDelta = isVertical ? deltaY : deltaX;
      const multiplier = isVertical ? 1.1 : 1.35;

      event.preventDefault();
      updateFromDelta(dominantDelta, multiplier);

      touchStartX = touchX;
      touchStartY = touchY;
    };

    const handleResize = () => {
      measure();
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursorPosRef.current = { x: event.clientX, y: event.clientY };
    };

    measure();
    rafRef.current = requestAnimationFrame(animate);

    settleTimer = window.setTimeout(() => {
      measure();
    }, 160);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", handleResize);
      visualViewport.addEventListener("scroll", handleResize);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (settleTimer !== null) window.clearTimeout(settleTimer);

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      if (visualViewport) {
        visualViewport.removeEventListener("resize", handleResize);
        visualViewport.removeEventListener("scroll", handleResize);
      }

      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [textItems.length]);

  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden touch-none">
      <section className="relative z-20 flex h-full w-full items-center justify-center">
        <section className="relative z-20 flex h-full w-full items-center justify-center font-mono">
          <div
            ref={textViewportRef}
            className="flex h-56 w-screen items-center justify-center overflow-hidden perspective-[520px] max-[900px]:h-48 max-[640px]:h-36 max-[640px]:perspective-[360px]"
          >
            <div
              ref={textContainerRef}
              className="relative h-full w-full text-[clamp(2.6rem,6.5vw,4.2rem)] font-bold leading-none tracking-[0.08em] opacity-0 transform-3d will-change-transform max-[900px]:text-[clamp(2.2rem,9.5vw,3.9rem)] max-[640px]:text-[clamp(3.6rem,13.5vw,5rem)]"
            >
              {textItems.map((item) => (
                <div
                  key={item.label}
                  className="absolute left-1/2 top-1/2 w-fit whitespace-nowrap text-center backface-hidden transform-3d will-change-transform ring-text"
                >
                  <Link
                    href={item.href}
                    data-glow
                    className="ring-text pointer-events-auto inline-block cursor-none px-6 py-3"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="absolute inset-0 z-10 flex items-center justify-center gap-12 max-[900px]:gap-4 max-[640px]:gap-3">
          <div
            ref={leftImgRef}
            className="flex w-[48%] flex-col items-end justify-center gap-10 will-change-transform max-[900px]:gap-7 max-[640px]:w-[47%] max-[640px]:gap-5"
            style={{
              transform: `translate3d(0, ${-baseOffset - phaseShift}px, 0)`,
            }}
          >
            {leftImages.map((image) => (
              <ImageCard key={image.alt} src={image.src} alt={image.alt} />
            ))}
          </div>

          <div
            ref={rightImgRef}
            className="flex w-[48%] flex-col items-start justify-center gap-10 will-change-transform max-[900px]:gap-7 max-[640px]:w-[47%] max-[640px]:gap-5"
            style={{
              transform: `translate3d(0, ${baseOffset + phaseShift}px, 0)`,
            }}
          >
            {rightImages.map((image) => (
              <ImageCard key={image.alt} src={image.src} alt={image.alt} />
            ))}
          </div>
        </div>
      </section>

      <p className="absolute bottom-15 z-20 font-semibold tracking-[0.08em] text-white/80 max-[640px]:bottom-12 max-[640px]:text-[1rem]">
        <span
          data-glow
          className="ring-text inline-block cursor-none px-2 py-1"
        >
          {footerText}
        </span>
      </p>
    </div>
  );
}