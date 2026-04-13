import Image from "next/image";

export function ImageCard({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="flex w-full sm:w-[25rem] md:w-[26rem] lg:w-[28rem] items-center justify-center">
      <div className="relative w-full aspect-3/7 sm:aspect-2/4 md:aspect-3/4 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 360px, (max-width: 900px) 420px, 560px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
