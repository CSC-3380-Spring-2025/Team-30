<<<<<<< HEAD
import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

export default function Home() {
  return (
    <div className="container">
      <div className="topBox">
        <HamburgerMenu /> 
      </div>
      <div className="content">
      </div>
      <div className="bottomBox">
      <p className={`bottomText`}>©2025 Security Society at LSU</p>
      </div>
=======
import EmblaCarousel from "@/components/EmblaCarousel/emblaCarousel";
import { vt323 } from "@/utils/fonts"; // Import the font

// Array of images for the carousel
const homePageImages = [
  "/home-image-1.png",
  "/home-image-2.png",
  "/home-image-3.png",
  "/home-image-4.png",
  "/home-image-5.png",
  "/home-image-6.png",
];

export default function Home() {
  return (
    <div className="content">
      <EmblaCarousel slides={homePageImages} />
      <img
        src="/join-now-image.png"
        alt="Join Now Image"
        width={300}
        height={200}
        className="join-image"
      />
      <a href="https://discord.gg/r6bJ8vrM" className="join-link">
        <p className={`${vt323.className} join-text`}>Join Now</p>
      </a>
>>>>>>> origin/dev
    </div>
  );
}
