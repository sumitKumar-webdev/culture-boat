"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const lerp = (from: number, to: number, ease: number) =>
  from + (to - from) * ease;

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(true);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const glowTargetRef = useRef<HTMLElement | null>(null);
  const targetPosRef = useRef<Point>({ x: -9999, y: -9999 });
  const ringPosRef = useRef<Point>({ x: -9999, y: -9999 });
  const ringScaleRef = useRef(1);
  const ringScaleTargetRef = useRef(1);
  const dotScaleRef = useRef(1);
  const dotScaleTargetRef = useRef(1);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateEnabled = () => {
      const nextEnabled = pointerQuery.matches && !mobileQuery.matches;
      setEnabled(nextEnabled);
      document.body.classList.toggle("disable-custom-cursor", !nextEnabled);
    };

    const addListener = (query: MediaQueryList, handler: () => void) => {
      if ("addEventListener" in query) {
        query.addEventListener("change", handler);
      } else {
        query.addListener(handler);
      }
    };

    const removeListener = (query: MediaQueryList, handler: () => void) => {
      if ("removeEventListener" in query) {
        query.removeEventListener("change", handler);
      } else {
        query.removeListener(handler);
      }
    };

    updateEnabled();
    addListener(pointerQuery, updateEnabled);
    addListener(mobileQuery, updateEnabled);

    return () => {
      removeListener(pointerQuery, updateEnabled);
      removeListener(mobileQuery, updateEnabled);
      document.body.classList.remove("disable-custom-cursor");
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) {
      return;
    }

    let rafId = 0;

    const applyRingStyle = (style: Partial<CSSStyleDeclaration>) => {
      Object.assign(ring.style, style);
    };

    const applyCursorStyle = (style: Partial<CSSStyleDeclaration>) => {
      Object.assign(cursor.style, style);
    };

    const applyIdleStyle = () => {
      ringScaleTargetRef.current = 1;
      dotScaleTargetRef.current = 0.8;
      applyRingStyle({
        backgroundColor: "transparent",
        opacity: "1",
        border: "2px solid #3b82f6",
        boxShadow: "0 0 24px rgba(59,130,246,0.18)",
      });
      applyCursorStyle({
        opacity: "1",
      });
    };

    const applyHoverStyle = () => {
      ringScaleTargetRef.current = 0.80;
      dotScaleTargetRef.current = 1.1;
      applyRingStyle({
        backgroundColor: "transparent",
        opacity: "1",
        border: "3px solid #3b82f6",
        boxShadow: "0 0 40px rgba(59,130,246,0.3)",
      });
      applyCursorStyle({
        opacity: "1",
      });
    };

    const applyDownStyle = () => {
      ringScaleTargetRef.current = 0.75;
      dotScaleTargetRef.current = 0.2;
      applyRingStyle({
        backgroundColor: "#2a48f5",
        opacity: "0.7",
        border: "none",
        boxShadow: "0 0 24px rgba(42,72,245,0.35)",
      });
      applyCursorStyle({
        opacity: "0",
      });
    };

    const update = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, targetPosRef.current.x, 0.08);
      ringPosRef.current.y = lerp(ringPosRef.current.y, targetPosRef.current.y, 0.08);
      ringScaleRef.current = lerp(ringScaleRef.current, ringScaleTargetRef.current, 0.18);
      dotScaleRef.current = lerp(dotScaleRef.current, dotScaleTargetRef.current, 0.25);

      ring.style.transform = `translate(-50%, -50%) translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) scale(${ringScaleRef.current})`;
      cursor.style.transform = `translate(-50%, -50%) translate3d(${targetPosRef.current.x}px, ${targetPosRef.current.y}px, 0) scale(${dotScaleRef.current})`;

      rafId = requestAnimationFrame(update);
    };

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return false;
      }
      return Boolean(
        target.closest(
          "a, button, [role='button'], input, select, textarea, label, summary, [tabindex]:not([tabindex='-1'])"
        )
      );
    };

    const updateGlowPosition = (event: MouseEvent, glowTarget: HTMLElement | null) => {
      if (!glowTarget) {
        return;
      }
      const rect = glowTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      glowTarget.style.setProperty("--glow-x", `${x}px`);
      glowTarget.style.setProperty("--glow-y", `${y}px`);
    };

    const setHoverState = (nextHover: boolean) => {
      if (nextHover === isHoveringRef.current) {
        return;
      }
      isHoveringRef.current = nextHover;
      if (isMouseDownRef.current) {
        return;
      }
      if (nextHover) {
        applyHoverStyle();
      } else {
        applyIdleStyle();
      }
    };

    const setGlowTarget = (nextGlowTarget: HTMLElement | null, event: MouseEvent) => {
      if (glowTargetRef.current === nextGlowTarget) {
        updateGlowPosition(event, nextGlowTarget);
        return;
      }
      if (glowTargetRef.current) {
        glowTargetRef.current.classList.remove("glow-active");
      }
      glowTargetRef.current = nextGlowTarget;
      if (nextGlowTarget) {
        nextGlowTarget.classList.add("glow-active");
        updateGlowPosition(event, nextGlowTarget);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetPosRef.current = { x: event.clientX, y: event.clientY };
      const elementUnderCursor = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      const nextGlowTarget =
        elementUnderCursor?.closest<HTMLElement>("[data-glow]") ?? null;
      setGlowTarget(nextGlowTarget, event);
      setHoverState(isInteractiveTarget(elementUnderCursor));

    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
      applyDownStyle();
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      if (isHoveringRef.current) {
        applyHoverStyle();
        return;
      }
      applyIdleStyle();
    };

    const handleMouseLeave = () => {
      setHoverState(false);
      if (glowTargetRef.current) {
        glowTargetRef.current.classList.remove("glow-active");
        glowTargetRef.current = null;
      }
    };

    applyIdleStyle();
    rafId = requestAnimationFrame(update);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-9999 customCursor h-3 w-3 rounded-full bg-white mix-blend-difference pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-9999 customCursor h-16 w-16 rounded-full border-2 border-blue-500 pointer-events-none shadow-[0_0_28px_rgba(59,130,246,0.2)]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};
