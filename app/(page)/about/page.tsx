import Image from "next/image";
import { pageContent, site } from "../../content/siteData";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full text-white leading-relaxed">
      <div className="relative w-full">
        <div className="w-full bg-transparent text-white min-h-screen p-6 md:p-16 overflow-x-hidden mt-20">
          <h5 className="text-[11px] sm:text-xs md:text-sm uppercase tracking-wider mb-6 md:mb-8 pl-0 md:pl-10">
            {pageContent.about.sectionTitle}
          </h5>

          <div className="flex flex-col md:flex-row mb-12 md:mb-16 relative pl-0 md:pl-20">
            <div className="md:w-1/2">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-5 md:mb-8 leading-tight md:leading-snug"
                style={{ filter: "url(#textWaterFilter)" }}
              >
                Everybody loves a <br className="hidden md:block" />
                good story and we <br className="hidden md:block" />
                love to build them.
              </h1>

              <div className="relative left-0 md:left-[7.5rem] p-4 space-y-2 text-xs sm:text-sm md:text-base text-gray-400">
                {site.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    className="hover:text-white transition block"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ filter: "url(#textWaterFilter)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 md:absolute md:-right-[10%] h-48 md:h-64 lg:h-80 mt-8 md:mt-0 md:pl-20 relative">
              <Image
                alt="Creative studio atmosphere"
                src="/About/About-main.jpeg"
                fill
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-cover opacity-90"
                style={{ filter: "url(#waterFilter)" }}
              />
              <div className="absolute top-1/2 -left-4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 opacity-70">
                <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-white" />
                <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-white" />
                <div className="absolute bottom-0 left-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-white" />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 mb-10 md:mb-10 max-w-full md:max-w-6xl pl-0 md:pl-44">
            <p
              className="text-base md:text-lg lg:text-xl text-gray-300 tracking-wide md:tracking-wider text-left md:text-justify"
            >
              We&apos;re a creative studio that specializes in brand strategy and
              <br className="hidden md:block" />
              digital creation, who enjoy a close working relationship with
              <br className="hidden md:block" />
              each of our clients and engaging in meaningful digital
              <br className="hidden md:block" />
              experiences.
            </p>
          </div>

          <div className="flex justify-center">
            <p
              className="text-base md:text-lg lg:text-xl text-gray-300 mt-8 md:mt-16 max-w-full md:max-w-5xl text-center md:text-right tracking-wide md:tracking-wider"
            >
              We&apos;re marketers, copywriters, thinkers, social media
              enthusiasts, visual designers and{" "}
              <span>most importantly, communicators.</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
