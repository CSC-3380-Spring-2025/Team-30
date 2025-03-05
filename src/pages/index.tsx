import Image from "next/image";
import { Geist, Geist_Mono, VT323} from "next/font/google";

import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="container">
      <div className="topBox">
        <HamburgerMenu /> {/* Add the HamburgerMenu here */}
      </div>
      <div className="content">
        {/* Your content goes here */}
      </div>
      <div className="bottomBox"></div>
    </div>
  );
}