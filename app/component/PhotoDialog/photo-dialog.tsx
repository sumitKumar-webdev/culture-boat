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
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 py-6 md:px-6 md:py-10"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative z-10 w-full max-w-4xl h-[92vh] flex flex-col bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-3 md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-2 md:mb-4 relative">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide text-center">
            {title}
          </h2>
          <button
            type="button"
            ref={closeButtonRef}
            className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 hover:scale-110 backdrop-blur-md transition-all group"
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
            <div className="relative w-full h-full">
              <Image
                unoptimized
                alt={active?.alt ?? "Gallery image"}
                src={active?.src ?? thumbnailSrc}
                fill
                sizes="100vw"
                className="object-contain drop-shadow-2xl pointer-events-none"
              />
            </div>
          </div>

          <button
            type="button"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-xl flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 border border-white/20"
            onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-xl flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-20 border border-white/20"
            onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                className={`transition-all duration-300 rounded-full ${
                  idx === index
                    ? "w-8 md:w-10 h-2 md:h-2.5 bg-white"
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 text-center">
          <p className="text-white/80 text-sm md:text-base font-medium">
            <span className="text-white font-semibold">{index + 1}</span>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white/60">{images.length}</span>
          </p>
        </div>

        <div className="mt-2 md:mt-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 md:gap-3 pb-2 justify-center">
            {images.map((image, idx) => (
              <button
                key={`${image.src}-${idx}`}
                type="button"
                className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  idx === index
                    ? "ring-2 ring-white shadow-lg shadow-white/50 scale-110"
                    : "opacity-60 hover:opacity-100 ring-1 ring-white/20"
                }`}
                onClick={() => setIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
              >
                <Image
                  unoptimized
                  alt={image.alt}
                  src={image.src}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
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
