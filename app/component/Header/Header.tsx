"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HamburgerButton } from "../Custom Icons/hamburger-btn";
import LogoMark from "../Logo/LogoMark";
import { site } from "../../content/siteData";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => setShowMenu((value) => !value);
  const closeMenu = () => setShowMenu(false);
  const hasLogo = Boolean(site.logoUrl && site.logoUrl.trim().length > 0);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-4">
        <div className="cursor-pointer text-2xl font-bold tracking-[0.08em]">
          <Link
            href="/"
            data-glow
            className="ring-text inline-block cursor-pointer pointer-events-auto"
          >
            {hasLogo ? (
              <Image
                src={site.logoUrl}
                alt={`${site.name} logo`}
                width={160}
                height={48}
                unoptimized
                className="h-8 w-auto object-contain"
                priority
              />
            ) : (
              <LogoMark className="text-white" />
            )}
          </Link>
        </div>
        <HamburgerButton open={showMenu} onToggle={toggle} />
      </header>

      <section
        className={`fixed top-0 left-0 z-40 h-screen w-full bg-[#060606] text-white transition-all duration-1000 font-bebas ${
          showMenu
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!showMenu}
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <div className="w-full px-6 py-5 md:px-30 md:py-22">
            <div className="flex flex-col items-center justify-between text-center md:flex-row md:items-start md:text-left">
              <ul className="space-y-4 md:space-y-6">
                <li>
                  <Link
                    href="/design"
                    data-glow
                    onClick={closeMenu}
                    className="ring-text block cursor-pointer pointer-events-auto text-4xl font-light tracking-widest transition-all md:text-8xl"
                  >
                    DESIGN
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pr"
                    data-glow
                    onClick={closeMenu}
                    className="ring-text block cursor-pointer pointer-events-auto text-4xl font-light tracking-widest transition-all md:text-8xl"
                  >
                    PR
                  </Link>
                </li>
                <li>
                  <Link
                    href="/social-scroll"
                    data-glow
                    onClick={closeMenu}
                    className="ring-text block cursor-pointer pointer-events-auto text-4xl font-light tracking-widest transition-all md:text-8xl"
                  >
                    SOCIAL
                  </Link>
                </li>
              </ul>

              <ul className="mt-10 uppercase space-y-2 md:-mt-10">
                <li>
                  <Link
                    href="/about"
                    data-glow
                    onClick={closeMenu}
                    className="ring-text block cursor-pointer pointer-events-auto text-2xl font-light tracking-widest transition-all md:text-4xl"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    data-glow
                    onClick={closeMenu}
                    className="ring-text block cursor-pointer pointer-events-auto text-2xl font-light tracking-widest transition-all md:text-4xl"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="absolute bottom-10 uppercase flex flex-col text-center">
            {site.socialLinks.map((link) => (
              <a
                key={link.label}
                data-glow
                onClick={closeMenu}
                className="ring-text cursor-pointer pointer-events-auto transition-all"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
