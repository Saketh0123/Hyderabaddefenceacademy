import { assetUrl } from "./assetUrl";

export type HeroImage = {
  src: string;
  alt: string;
};

const heroImagePaths: HeroImage[] = [
  // 1) Paste image files into: public/hero-images/
  // 2) Add entries below using: /hero-images/<file-name>
  // Example:
  // { src: "/hero-images/hero-1.jpg", alt: "Luxury interior with warm lighting" },
  // { src: "/hero-images/hero-2.jpg", alt: "Premium lounge space with modern decor" },
  { src: "/hero-images/hero1.webp", alt: "Hyderabad Defence Academy hero image 1" },
  { src: "/hero-images/hero2.JPG", alt: "Hyderabad Defence Academy hero image 2" },
  { src: "/hero-images/hero3_11zon.jpg", alt: "Hyderabad Defence Academy hero image 3" },
  { src: "/hero-images/hero4_11zon.jpg", alt: "Hyderabad Defence Academy hero image 4" },
  { src: "/hero-images/hero5_11zon.jpg", alt: "Hyderabad Defence Academy hero image 5" },
  { src: "/hero-images/hero6_11zon.jpg", alt: "Hyderabad Defence Academy hero image 6" },
];

export const heroImages: HeroImage[] = heroImagePaths.map((image) => ({
  ...image,
  src: assetUrl(image.src),
}));
