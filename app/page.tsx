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
    src: "/Design/Design-image1.jpeg",
    alt: "Editorial fashion portrait",
    tone: "bg-[linear-gradient(145deg,rgba(69,115,217,0.72),rgba(28,40,79,0.86))]",
  },
  {
    src: "/PR-images/PR_top.jpeg",
    alt: "Cultural celebration scene",
    tone: "bg-[linear-gradient(145deg,rgba(214,146,67,0.72),rgba(84,47,23,0.86))]",
  },
  {
    src: "/About/About-main.jpeg",
    alt: "Studio atmosphere",
    tone: "bg-[linear-gradient(145deg,rgba(173,82,104,0.74),rgba(81,30,49,0.9))]",
  },
  {
    src: "/Design/Design-image3-1.jpeg",
    alt: "Fashion styling detail",
  },
];

const rightImages: HomeClientImage[] = [
  {
    src: "/Design/Design-image2.jpeg",
    alt: "Product styling",
    tone: "bg-[linear-gradient(145deg,rgba(162,157,146,0.7),rgba(73,69,64,0.88))]",
  },
  {
    src: "/Design/Design-image3-1.jpeg",
    alt: "Fashion photography",
    tone: "bg-[linear-gradient(145deg,rgba(117,95,181,0.74),rgba(49,35,83,0.9))]",
  },
  {
    src: "/Design/Design-image4-1.jpeg",
    alt: "Campaign still",
    tone: "bg-[linear-gradient(145deg,rgba(73,151,144,0.74),rgba(20,62,60,0.9))]",
  },
  {
    src: "/Mailer/2.jpeg",
    alt: "Print layout detail",
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
