"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

const SocialScrollPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeTitle, setActiveTitle] = useState("Social Gallery");

  const items = useMemo(
    () => [
      "AMAYRA by Bagrecha Gems",
      "Amiraah",
      "Blister Hand",
      "BUTA",
      "Dayal Opticals",
      "Devans coffee",
      "dhartii",
      "DIVIYA KAPOOR",
      "EBISU",
      "EVEREST BASE CAMP",
      "gaon restaurants",
      "GAZAL GUPTA",
      "GUR ORGANICS",
      "INTIKI",
      "Kalista Studio",
      "Kelby Huston",
      "kritika Dawar",
      "LIZ PAUL",
      "Luxury Ampersand Frolics Group",
      "MASALA SYNERGY",
      "nidhika shekhar",
      "ODDCAT",
      "Pernia's Pop-Up Shop",
      "PICTURE TIME",
      "Rasaiem Luxuury",
      "SEWTABLE CLOTHING",
      "SHAADI KA LADOO",
      "Shakuntlam Xclusif",
      "SUPRIA MUNJAL",
      "TANIA ISRANI",
      "TARINI VIJ",
      "the box boutique",
      "the monk",
      "VASANSI JAIPUR",
      "WABY SABY",
      "Zevar by geeta",
    ],
    [],
  );

  const images = useMemo(
    () => [
      { src: "/social-scroll/social-01.jpeg", alt: "Social gallery image 1" },
      { src: "/social-scroll/social-02.jpeg", alt: "Social gallery image 2" },
      { src: "/social-scroll/social-03.jpeg", alt: "Social gallery image 3" },
      { src: "/social-scroll/social-04.jpeg", alt: "Social gallery image 4" },
      { src: "/social-scroll/social-05.jpeg", alt: "Social gallery image 5" },
    ],
    [],
  );

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      container.style.setProperty("--glow-x", `${x}px`);
      container.style.setProperty("--glow-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMove);
    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateDot = () => {
      const maxScroll = list.scrollHeight - list.clientHeight;
      const progress = maxScroll > 0 ? list.scrollTop / maxScroll : 0;
      if (dotRef.current) {
        dotRef.current.style.top = `${progress * 100}%`;
      }
    };

    updateDot();
    list.addEventListener("scroll", updateDot, { passive: true });

    return () => {
      list.removeEventListener("scroll", updateDot);
    };
  }, []);

  const activeImage = images[index];
  const canPortal = typeof window !== "undefined";

  return (
    <div className="opacity-100">
      <div
        ref={containerRef}
        className="social-scroll grid-bg relative w-full h-screen overflow-x-hidden overflow-y-hidden text-white"
      >
        <div
          ref={listRef}
          className="font-bellota-light relative z-10 flex flex-col items-center uppercase justify-start gap-5 py-8 sm:py-20 h-full overflow-y-auto overflow-x-hidden no-scrollbar list-container"
          style={{
            scrollBehavior: "smooth",
            perspective: "1000px",
            paddingBottom: "22vh",
          }}
        >
          {items.map((item, index) => {
            return (
              <button
                key={`${item}-${index}`}
                type="button"
                onClick={() => {
                  setActiveTitle(item);
                  setIndex(0);
                  setOpen(true);
                }}
                className="group relative text-white/70 text-[clamp(1.35rem,3vw,3.4rem)] sm:text-[clamp(1.6rem,3.4vw,4rem)] lg:text-[clamp(3rem,4.8vw,5.6rem)] font-light tracking-[2px] py-4 text-center transition-all duration-500 ease-out cursor-pointer will-change-transform max-w-[90vw] w-full hover:text-white hover:scale-105 hover:tracking-wider"
              >
                <span className="relative z-10 block uppercase ring-text">{item}</span>
                <div
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)",
                    transform: "skewX(-15deg)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 h-px bg-linear-to-r from-transparent via-white to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ transformOrigin: "left center" }}
                />
              </button>
            );
          })}
        </div>

        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent relative">
            <div
              ref={dotRef}
              className="absolute w-2 h-2 bg-white rounded-full left-1/2 transform -translate-x-1/2 transition-all duration-300"
              style={{
                top: 0,
                boxShadow: "rgba(255, 255, 255, 0.5) 0px 0px 10px",
              }}
            />
          </div>
        </div>
      </div>

      {canPortal && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 py-6 md:px-6 md:py-10"
              role="dialog"
              aria-modal="true"
              aria-label={activeTitle}
              onClick={() => setOpen(false)}
            >
              <div
                className="relative z-10 w-full max-w-7xl h-[85vh] flex flex-col bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-3 md:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex justify-center items-center mb-2 md:mb-4 relative">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide text-center">
                    {activeTitle}
                  </h2>
                  <button
                    type="button"
                    ref={closeButtonRef}
                    className="absolute -top-14 -right-3 text-white/80 hover:text-white text-sm tracking-[0.2em] uppercase"
                    onClick={() => setOpen(false)}
                    aria-label="Close gallery"
                  >
                    Close
                  </button>
                </div>

                <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                    <div className="relative w-full h-full">
                      <Image
                        unoptimized
                        alt={activeImage?.alt ?? "Gallery image"}
                        src={activeImage?.src ?? images[0]?.src}
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
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default SocialScrollPage;
