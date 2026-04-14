import Image from "next/image";
import { BrandCarousel } from "../../component/BrandCarousel/BrandCarousel";
import PhotoDialog from "../../component/PhotoDialog/photo-dialog";
import VideoDialog from "../../component/VideoDialog/video-dialog";
import { brandLogos, pageContent } from "../../content/siteData";

export default function page() {
  const portfolioImages = [
    { src: "/Mailer/1.jpeg", alt: "Portfolio Item 1" },
    { src: "/Mailer/4.jpeg", alt: "Portfolio Item 4" },
    { src: "/Mailer/6.jpeg", alt: "Portfolio Item 6" },
    { src: "/Mailer/2.jpeg", alt: "Portfolio Item 2" },
    { src: "/Mailer/5.jpeg", alt: "Portfolio Item 5" },
    { src: "/Mailer/7.jpeg", alt: "Portfolio Item 7" },
    { src: "/Mailer/Group.jpeg", alt: "Portfolio Item 3" },
  ];

  return (
    <div
      id="design-content"
      className="min-h-screen text-white leading-relaxed"
      style={{ backgroundImage: "none" }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-4">
        <section className="relative mt-20 text-center z-10">
          <div className="flex flex-col lg:flex-row items-center min-h-100 lg:min-h-100 gap-5 lg:gap-10 md:mt-0">
            <div className="flex-1 px-6 md:px-8 lg:px-5 text-stable   text-center w-full mt-10 md:mt-0">
              <div className="lg:block lg:fixed lg:top-28 lg:left-0 lg:w-1/2 lg:pointer-events-none lg:-z-10">
                <p className="text-base md:text-xl tracking-[2px] uppercase md:my-2 text-white  px-4">
                  {pageContent.design.hero.kicker}
                </p>
                <h1
                  className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-thin tracking-tight mb-2 leading-none text-white   px-4"
                  style={{ fontWeight: 200 }}
                >
                  {pageContent.design.hero.title}
                </h1>
                <p
                  className="text-lg lg:text-2xl text-white mt-2 mb-1   px-4 font-light"
                  style={{ fontWeight: 300 }}
                >
                  {pageContent.design.hero.lines[0]}
                </p>
                <p
                  className="text-lg lg:text-2xl text-white  px-4 font-light"
                  style={{ fontWeight: 300 }}
                >
                  {pageContent.design.hero.lines[1]}
                </p>
              </div>
            </div>
            <div className="flex-1 bg-black/80 relative w-full max-w-full lg:max-w-2xl mx-auto lg:mx-0 z-10">
              <Image
                unoptimized
                alt="Traditional Fashion Design"
                width={892}
                height={578}
                className="w-full h-auto opacity-[1] object-cover"
                src="/Design/Design-image1.jpeg"
              />
            </div>
          </div>
        </section>
      </div>
    <div className="relative z-10 grid-bg">
      <div className="max-w-6xl mx-auto px-4 lg:px-4">
        <section className="mt-10 md:mt-0 text-center z-10">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-24 justify-center mb-2 mx-auto items-stretch">
            <div className="relative overflow-hidden w-full lg:w-162.5 md:mb-0 mx-auto lg:mx-0 z-10 flex items-stretch">
              <Image
                unoptimized
                alt="Gurorganic Campaign"
                width={892}
                height={578}
                className="w-full h-full object-cover"
                src="/Design/Design-image2.jpeg"
              />
            </div>
            <div className="relative overflow-hidden w-full lg:w-125 lg:mx-0 z-10 mt-10 md:mt-0 flex items-stretch">
              <Image
                unoptimized
                alt="Fashion Photography"
                width={737}
                height={554}
                className="w-full h-full object-cover"
                src="/Design/Design-image3-1.jpeg"
              />
            </div>
          </div>
        </section>

        <section className="text-center z-10 mt-10 md:mt-16 px-4 md:px-6">
          <div className="text-stable z-10 ">
            <h2 className="text-2xl lg:text-3xl font-light tracking-[2px] uppercase text-white   px-4 mb-0 leading-none">
              CREATIVE DIRECTION AND STRATEGY
            </h2>
            <p
              className="text-lg lg:text-2xl italic text-white   px-4 font-light mb-3 md:mb-4 mt-0 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Brand Positioning
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-40 justify-center items-stretch">
            <div className="relative overflow-hidden w-full lg:max-w-150 mx-auto lg:mx-0 z-10 flex items-stretch">
              <VideoDialog
                thumbnailSrc="/Design/Design-image4-1.jpeg"
                thumbnailAlt="Kalki Fashion"
                iframeSrc="https://www.youtube.com/embed/C-4C4VnyZco?si=jM7xCtCv4N92vYhh"
                iframeTitle="YouTube video player"
              />
            </div>
            <div className="relative overflow-hidden w-full lg:w-[50%] lg:max-w-87.5 mx-auto lg:mx-0 z-10 flex items-stretch mt-5 md:mt-0">
              <Image
                unoptimized
                alt="Product Photography"
                width={800}
                height={1200}
                className="w-full h-full object-cover"
                src="/Design/img28.jpeg"
              />
            </div>
          </div>
        </section>

        <section className="text-center  z-10 mt-10 md:mt-16 px-4 md:px-6">
          <div className="text-stable  ">
            <h2 className="text-2xl lg:text-3xl font-light tracking-[2px] uppercase text-white   px-4 mb-0 leading-none">
              VISUAL VOCABULARY
            </h2>
            <p
              className="text-lg lg:text-2xl italic text-white   px-4 font-light mb-3 md:mb-4 mt-0 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Exhibition Guidelines
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-24 justify-center lg:mx-4 mb-0 md:mb-9">
            <div className="relative overflow-hidden w-full lg:w-[70%] lg:max-w-100 mx-auto lg:mx-0 z-10">
              <Image
                unoptimized
                alt="Visual Vocabulary Design 1"
                width={600}
                height={899}
                className="w-full h-full object-cover"
                src="/Design/D_img1.jpeg"
              />
            </div>
            <div className="relative overflow-hidden w-full lg:w-[70%] lg:max-w-100 mx-auto lg:mx-0 z-10">
              <Image
                unoptimized
                alt="Visual Vocabulary Design 2"
                width={600}
                height={899}
                className="w-full h-full object-cover"
                src="/Design/D_img2.jpeg"
              />
            </div>
          </div>
        </section>

        <section className="text-center z-10 mt-10 md:mt-16 px-4 md:px-6">
          <div className="text-stable  ">
            <h2 className="text-2xl lg:text-3xl font-light tracking-[2px] uppercase text-white   px-4 mb-0 leading-none">
              PRINT AND DIGITAL DESIGN
            </h2>
            <p
              className="text-lg lg:text-2xl italic text-white   px-4 font-light mb-3 md:mb-4 mt-0 leading-tight"
              style={{ fontWeight: 300 }}
            >
              Collaterals
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-24 justify-center lg:mx-4 mb-5 items-start">
            <div className="relative w-full lg:w-auto lg:max-w-125 mx-auto lg:mx-0 z-10">
              <Image
                unoptimized
                alt="Print Design 1"
                width={500}
                height={700}
                className="w-full h-auto object-contain"
                src="/Design/print_1.jpeg"
              />
            </div>
            <div className="relative w-full lg:w-auto lg:max-w-125 mx-auto lg:mx-0 z-10">
              <Image
                unoptimized
                alt="Print Design 2"
                width={500}
                height={700}
                className="w-full h-auto object-contain"
                src="/Design/print_2.jpeg"
              />
            </div>
          </div>
        </section>

        <section className="text-center z-10">
          <div className="mb-6">
            <hr className="w-3/5 h-px bg-gray-600 border-none mx-auto mb-10 mt-10" />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-start justify-center lg:px-4">
            <div className="flex flex-col gap-4 w-full lg:max-w-xl mx-auto lg:mx-0 z-10">
              <PhotoDialog
                images={portfolioImages}
                startIndex={0}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/1.jpeg"
                thumbnailAlt="Portfolio Item 1"
                imageClassName="z-10"
              />
              <PhotoDialog
                images={portfolioImages}
                startIndex={1}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/4.jpeg"
                thumbnailAlt="Portfolio Item 4"
                imageClassName="z-10"
              />
              <PhotoDialog
                images={portfolioImages}
                startIndex={2}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/6.jpeg"
                thumbnailAlt="Portfolio Item 6"
                imageClassName="z-10"
              />
            </div>
            <div className="flex flex-col gap-4 w-full lg:max-w-xl mx-auto lg:mx-0 z-10">
              <PhotoDialog
                images={portfolioImages}
                startIndex={3}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/2.jpeg"
                thumbnailAlt="Portfolio Item 2"
                imageClassName="z-10"
              />
              <PhotoDialog
                images={portfolioImages}
                startIndex={4}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/5.jpeg"
                thumbnailAlt="Portfolio Item 5"
                imageClassName="z-10"
              />
              <PhotoDialog
                images={portfolioImages}
                startIndex={5}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/7.jpeg"
                thumbnailAlt="Portfolio Item 7"
                imageClassName="z-10"
              />
              <PhotoDialog
                images={portfolioImages}
                startIndex={6}
                title="AMIRAAH"
                thumbnailSrc="/Mailer/Group.jpeg"
                thumbnailAlt="Portfolio Item 3"
                imageClassName="z-10"
              />
            </div>
          </div>
        </section>

        <section className="z-10">
          <div className="relative w-full py-8">
            <BrandCarousel items={brandLogos} durationSeconds={220} />
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}

