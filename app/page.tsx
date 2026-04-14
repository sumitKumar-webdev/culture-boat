import HomePageClient, {
  type HomeClientImage,
  type HomeClientTextItem,
} from "./component/Home Client/home-client";

const textItems: HomeClientTextItem[] = [
  { label: "Design", href: "/design" },
  { label: "PR", href: "/pr" },
  { label: "Social", href: "/social-scroll" },
];

const leftImages: HomeClientImage[] = [
  {
    src: "/home/home-01.jpeg",
    alt: "Model in embroidered lehenga under warm spotlight",
  },
  {
    src: "/home/home-02.jpeg",
    alt: "Outdoor menswear portrait in patterned shirt",
  },
  {
    src: "/home/home-03.jpeg",
    alt: "Casual menswear by rocky lakeside",
  },
  {
    src: "/home/home-04.jpeg",
    alt: "Chocolate cake styled on a pedestal",
  },
];

const rightImages: HomeClientImage[] = [
  {
    src: "/home/home-05.jpeg",
    alt: "Bride-inspired lehenga on train platform",
  },
  {
    src: "/home/home-06.jpeg",
    alt: "Portrait in ornate purple attire",
  },
  {
    src: "/home/home-07.jpeg",
    alt: "Seated model framed by carved stone arch",
  },
  {
    src: "/home/home-02.jpeg",
    alt: "Outdoor menswear portrait in patterned shirt",
  },
];

export default function Home() {
  return (
    <HomePageClient
      textItems={textItems}
      leftImages={leftImages}
      rightImages={rightImages}
      footerText="Scroll and Select"
    />
  );
}
