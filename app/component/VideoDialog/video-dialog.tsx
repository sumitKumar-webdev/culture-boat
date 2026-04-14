"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type VideoDialogProps = {
  thumbnailSrc: string;
  thumbnailAlt: string;
  iframeSrc: string;
  iframeTitle: string;
  className?: string;
};

export default function VideoDialog({
  thumbnailSrc,
  thumbnailAlt,
  iframeSrc,
  iframeTitle,
  className,
}: VideoDialogProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("disable-custom-cursor");
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("disable-custom-cursor");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const dialog = open ? (
    <div
      className="video-dialog-cursor fixed inset-0 z-9998 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label={iframeTitle}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm tracking-[0.2em] uppercase"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
        <iframe
          width="560"
          height="315"
          src={iframeSrc}
          title={iframeTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  ) : null;

  const canPortal = typeof window !== "undefined";

  return (
    <>
      <button
        type="button"
        className={`w-full focus:outline-none block relative ${className ?? ""}`}
        aria-label="Play video"
        onClick={() => setOpen(true)}
      >
        <Image
          unoptimized
          alt={thumbnailAlt}
          width={1040}
          height={674}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          src={thumbnailSrc}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </button>

      {canPortal && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
