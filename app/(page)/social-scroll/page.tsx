"use client";

import { useEffect, useMemo, useRef } from "react";

const SocialScrollPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

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
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"
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
    </div>
  );
};

export default SocialScrollPage;
