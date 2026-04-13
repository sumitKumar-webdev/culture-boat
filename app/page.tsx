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
  },
  {
    src: "/PR-images/PR_top.jpeg",
    alt: "Cultural celebration scene",
  },
  {
    src: "/About/About-main.jpeg",
    alt: "Studio atmosphere",
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
  },
  {
    src: "/Design/Design-image3-1.jpeg",
    alt: "Fashion photography",
  },
  {
    src: "/Design/Design-image4-1.jpeg",
    alt: "Campaign still",
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
