import EmblaCarousel from "@/components/EmblaCarousel/emblaCarousel";
import { vt323 } from "@/utils/fonts"; // Import the font
import CybersecurityNews from "@/components/CybersecurityNews/CybersecurityNews"; // Import the CybersecurityNews component

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
      
    <div className="cybersecurity-news">
      <CybersecurityNews />
    </div>

    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "2rem",
        color: "white",
    }}
    >
    <h2 className="text-4xl font-bold underline mb-4">About SSL</h2>
    <p className="text-xl leading-relaxed">
      <br></br><strong>The Student Security League (SSL) is LSU's premier student organization dedicated to hands-on cybersecurity education and exploration.</strong>
      &nbsp;We provide students of all experience levels with the tools, resources, and collaborative environment needed to build real-world security skills through practical learning.
      Whether you're a beginner curious about the field or a seasoned hacker looking to deepen your knowledge, SSL offers a dynamic space to grow through workshops, competitions,
      guest lectures, and Capture The Flag (CTF) challenges.
    </p>
    <p className="text-xl leading-relaxed mt-6">
      <br></br>Our mission is to empower the next generation of cybersecurity professionals by emphasizing learning through doing—because the best way to understand security is to break,
      build, and defend systems yourself. At SSL, you'll find a passionate community ready to support your journey in cyber, from the fundamentals to advanced topics like network
      exploitation, reverse engineering, and digital forensics.
    </p>
    </div>
      <img
        src="/join-now-image.png"
        alt="Join Now Image"
        width={300}
        height={200}
        className="join-image"
      />
      <a href="https://discord.gg/EACydvmfqH" className="join-link">
        <p className={`${vt323.className} join-text`}>Join Now</p>
      </a>
    </div>
  );
}
