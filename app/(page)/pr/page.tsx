import Image from "next/image";
import { BrandCarousel } from "../../component/BrandCarousel/BrandCarousel";
import { pageContent } from "../../content/siteData";

const gridImages = Array.from({ length: 20 }, (_, index) => {
  const id = index + 1;
  return {
    src: `/PR-images/grid/${id}.jpeg`,
    alt: `Fashion ${id}`,
  };
});

const consultancyItems = [
  { src: "/PR-images/consultancy/1.jpeg", alt: "Creative consultancy 1" },
  { src: "/PR-images/consultancy/2.jpeg", alt: "Creative consultancy 2" },
  { src: "/PR-images/consultancy/3.jpeg", alt: "Creative consultancy 3" },
  { src: "/PR-images/consultancy/1.jpeg", alt: "Creative consultancy 4" },
  { src: "/PR-images/consultancy/2.jpeg", alt: "Creative consultancy 5" },
  { src: "/PR-images/consultancy/3.jpeg", alt: "Creative consultancy 6" },
];

const influencerItems = [
  { src: "/PR-images/influencers/1.jpeg", alt: "Influencer 1" },
  { src: "/PR-images/influencers/2.jpeg", alt: "Influencer 2" },
  { src: "/PR-images/influencers/3.jpeg", alt: "Influencer 3" },
  { src: "/PR-images/influencers/1.jpeg", alt: "Influencer 4" },
  { src: "/PR-images/influencers/2.jpeg", alt: "Influencer 5" },
  { src: "/PR-images/influencers/3.jpeg", alt: "Influencer 6" },
];

const stylistItems = [
  { src: "/PR-images/stylists/1.jpeg", alt: "Stylist 1" },
  { src: "/PR-images/stylists/2.jpeg", alt: "Stylist 2" },
  { src: "/PR-images/stylists/3.jpeg", alt: "Stylist 3" },
  { src: "/PR-images/stylists/1.jpeg", alt: "Stylist 4" },
  { src: "/PR-images/stylists/2.jpeg", alt: "Stylist 5" },
  { src: "/PR-images/stylists/3.jpeg", alt: "Stylist 6" },
];

export default function PrPage() {
  return (
    <main className="min-h-screen w-full text-white leading-relaxed">
      <div id="pr-content" className="w-full">
        <div className="max-w-6xl mx-auto px-4 lg:px-4">
          <section className="relative mt-20 text-center z-10">
            <div className="flex flex-col lg:flex-row items-center min-h-100 lg:min-h-100 gap-5 lg:gap-10 md:mt-0">
              <div className="flex-1 px-6 md:px-8 lg:px-5 text-stable text-center w-full mt-10 md:mt-0">
                <div className="lg:block lg:fixed lg:top-28 lg:left-0 lg:w-1/2 lg:pointer-events-none lg:-z-20">
                  <p className="text-base md:text-xl tracking-[2px] uppercase md:my-2 text-white px-4 no-water-effect">
                    {pageContent.pr.hero.kicker}
                  </p>
                  <h1
                    className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-thin tracking-tight mb-2 leading-none text-white px-4 no-water-effect"
                    style={{ fontWeight: 200 }}
                  >
                    {pageContent.pr.hero.title}
                  </h1>
                  <p
                    className="text-lg lg:text-2xl text-white mt-2 mb-1 px-4 font-light no-water-effect"
                    style={{ fontWeight: 300 }}
                  >
                    {pageContent.pr.hero.lines[0]}
                  </p>
                  <p
                    className="text-lg lg:text-2xl text-white px-4 font-light no-water-effect"
                    style={{ fontWeight: 300 }}
                  >
                    {pageContent.pr.hero.lines[1]}
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-black/80 relative w-full max-w-full lg:max-w-2xl mx-auto lg:mx-0 z-10">
                <Image
                  alt="Cultural celebration with people in traditional attire"
                  width={892}
                  height={578}
                  className="w-full h-auto object-cover"
                  src="/PR-images/PR_top.jpeg"
                  loading="eager"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="relative z-10 grid-bg">
          <section className="w-full bg-transparent text-white mt-6 md:mt-10 mb-3 md:mb-5 font-bellota-light">
            <div className="w-full flex flex-col md:flex-row justify-between px-6 md:px-20 mt-6 md:mt-10 gap-4 md:gap-12 md:h-[70vh]">
              <div className="w-full md:w-1/2 h-full flex justify-center md:justify-start">
                <div className="w-full h-[380px] md:h-[450px] relative max-w-[400px]">
                  <Image
                    alt="BuzzFeed news article screenshot"
                    src="/PR-images/PR-first.jpeg"
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end">
                <div className="w-full h-[380px] md:h-[450px] relative max-w-[800px]">
                  <Image
                    alt="Secondary news image"
                    src="/PR-images/PR_2.jpeg"
                    fill
                    sizes="(max-width: 768px) 90vw, 800px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="relative w-full bg-transparent h-auto overflow-hidden mb-3 md:mb-5 font-bellota-light">
            <div className="container mx-auto px-6 sm:px-8 md:px-20 relative z-10">
              <div className="flex justify-center mb-3 md:mb-5 mt-4 md:mt-6 text-stable no-water-effect">
                <h2 className="text-white text-2xl sm:text-3xl md:text-3xl text-center font-light tracking-[2px] uppercase no-water-effect px-4">
                  Concept & Direction
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                <div className="w-full md:w-1/2 h-[420px] md:h-[600px] relative overflow-hidden">
                  <Image
                    alt="Woman in red holding product"
                    src="/PR-images/PR-section2-img1.jpeg"
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
                <div className="w-full md:w-1/2 relative h-[420px] md:h-[600px] overflow-hidden">
                  <Image
                    alt="Woman in patterned outfit"
                    src="/PR-images/PR-section2-img2.jpeg"
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="object-cover"
                    loading="eager"
                  />
                  <div className="absolute bottom-4 right-4 md:top-44 md:-right-10 text-white text-right text-stable no-water-effect">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-light mb-1 tracking-tight no-water-effect"
                      style={{ fontWeight: 300 }}
                    >
                      Media & Stylists
                    </h3>
                    <p
                      className="text-base sm:text-lg md:text-xl italic no-water-effect font-light"
                      style={{ fontWeight: 300 }}
                    >
                      Coverage & Placements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-4 md:px-6 lg:px-10 mt-6 md:mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6">
              {gridImages.map((image, index) => (
                <div
                  key={image.src}
                  className="col-span-1 w-full flex justify-center"
                >
                  <Image
                    alt={image.alt}
                    src={image.src}
                    width={400}
                    height={400}
                    className="object-contain w-full h-auto"
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="no-water-effect no-cursor-distort">
            <div className="w-full font-bellota-light mt-6 md:mt-10">
              <div className="text-white py-0 md:py-0 text-center text-stable no-water-effect px-4 mb-3 md:mb-4">
                <h1 className="text-2xl md:text-3xl font-light tracking-[2px] uppercase text-white no-water-effect">
                  Creative Consultancy
                </h1>
                <p
                  className="text-lg md:text-2xl italic mt-1 text-white no-water-effect font-light"
                  style={{ fontWeight: 300 }}
                >
                  Impactful PR Approach
                </p>
              </div>
              <div className="relative w-full py-6">
                <BrandCarousel
                  items={consultancyItems}
                  durationSeconds={26}
                  direction="left"
                />
              </div>

              <div className="text-white py-2 md:py-3 text-center font-bellota-light text-stable no-water-effect mt-6 md:mt-8">
                <h1 className="text-2xl md:text-3xl font-light tracking-[2px] uppercase text-white no-water-effect px-4">
                  INFLUENCERS
                </h1>
              </div>
              <div className="relative w-full py-6">
                <BrandCarousel
                  items={influencerItems}
                  durationSeconds={22}
                  direction="right"
                />
              </div>

              <div className="text-white py-2 md:py-3 text-center mt-6 md:mt-8 mb-0 font-bellota-light text-stable no-water-effect">
                <h1 className="text-2xl md:text-3xl font-light tracking-[2px] uppercase text-white no-water-effect px-4">
                  STYLISTS
                </h1>
              </div>
              <div className="relative w-full py-6">
                <BrandCarousel
                  items={stylistItems}
                  durationSeconds={30}
                  direction="left"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
