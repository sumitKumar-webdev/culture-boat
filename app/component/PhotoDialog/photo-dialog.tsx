"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type PhotoDialogImage = {
  src: string;
  alt: string;
};

type PhotoDialogProps = {
  images: PhotoDialogImage[];
  thumbnailSrc: string;
  thumbnailAlt: string;
  startIndex?: number;
  title?: string;
  buttonClassName?: string;
  thumbnailClassName?: string;
  imageClassName?: string;
};

export default function PhotoDialog({
  images,
  thumbnailSrc,
  thumbnailAlt,
  startIndex = 0,
  title = "Gallery",
  buttonClassName,
  thumbnailClassName,
  imageClassName,
}: PhotoDialogProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(startIndex);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, images.length]);

  const active = useMemo(() => images[index], [images, index]);
  const canPortal = typeof window !== "undefined";

  const dialog = open && images.length ? (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-6xl rounded-[28px] bg-[#0b0b0c] shadow-2xl ring-1 ring-white/10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-center border-b border-white/10 px-6 py-4">
          <div className="text-center text-lg tracking-[0.32em] uppercase text-white">
            {title}
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            className="absolute right-5 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
          >
            ×
          </button>
        </div>

        <div className="relative px-6 pb-4 pt-6">
          <div className="relative overflow-hidden rounded-2xl bg-black/40">
            <div className="relative mx-auto max-h-[62vh] w-full">
              <Image
                unoptimized
                alt={active?.alt ?? "Gallery image"}
                src={active?.src ?? thumbnailSrc}
                width={1800}
                height={1200}
                className="h-full w-full object-contain"
              />
            </div>

            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              onClick={() => setIndex((prev) => (prev + 1) % images.length)}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center text-sm text-white/70">
            {index + 1} / {images.length}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {images.map((image, idx) => (
              <button
                key={`${image.src}-${idx}`}
                type="button"
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                  idx === index ? "border-white" : "border-white/10 hover:border-white/40"
                }`}
                onClick={() => setIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              >
                <Image
                  unoptimized
                  alt={image.alt}
                  src={image.src}
                  width={160}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        className={`block w-full focus:outline-none ${buttonClassName ?? ""}`}
        aria-label="Open gallery"
        onClick={() => {
          setIndex(startIndex);
          setOpen(true);
        }}
      >
        <Image
          unoptimized
          alt={thumbnailAlt}
          width={1200}
          height={900}
          className={`w-full h-auto object-contain ${thumbnailClassName ?? ""} ${imageClassName ?? ""}`}
          src={thumbnailSrc}
        />
      </button>
      {canPortal && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
