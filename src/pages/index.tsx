import {VT323} from "next/font/google";

import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className="container">
      <div className="topBox">
        <HamburgerMenu /> 
      </div>
      <div className="content">
      </div>
      <div className="bottomBox">
      <p className={`${vt323.className} bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}