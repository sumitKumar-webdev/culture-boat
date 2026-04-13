import Image from "next/image";

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <span className={`inline-flex items-center gap-4 ${className ?? ""}`}>
      <Image
        src="/logo/vector-4.png"
        alt="Anchor icon"
        width={30}
        height={30}
        unoptimized
        className="h-8 w-auto"
        priority
      />
      <Image
        src="/logo/group-2.png"
        alt="Bubbles icon"
        width={38}
        height={30}
        unoptimized
        className="h-7 w-auto"
        priority
      />
      <Image
        src="/logo/vector-3.png"
        alt="Lighthouse icon"
        width={30}
        height={30}
        unoptimized
        className="h-8 w-auto"
        priority
      />
    </span>
  );
}
