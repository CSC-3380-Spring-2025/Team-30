import Image from 'next/image'
import Link from 'next/link'
import {VT323} from "next/font/google";
import HamburgerMenu from "@/components/HamburgerMenu/hamburgerMenu"; // Import the HamburgerMenu component
import { IoLogoDiscord } from "react-icons/io5"; // Discord Logo
import { FaLinkedin  } from "react-icons/fa6"; // Linkedin Logo
import { GiTigerHead } from "react-icons/gi"; // Tiger Logo


const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div className="container">
      <div className="topBox">
        <a href="https://google.com"> 
          <Image 
          src="/ssl-logo.png" 
          width={75} 
          height={75} 
          className="logo"
          alt="Logo"
          />
          </a>
          <HamburgerMenu /> 
      </div>
      <div className="content">
        <Image 
          src="/homepage-picture.png" 
          width={500} 
          height={300} 
          
          className="homepagePicture"
          alt="Logo"
        />
      </div>
      <div className="bottomBox">
        <div className="socialLinks">
          <Link href="https://discord.gg/r6bJ8vrM" target="_blank" rel="noopener noreferrer">
            <IoLogoDiscord className="socialIcon" />
          </Link>
          <Link href="https://tigerlink.lsu.edu/ssl/home/" target="_blank" rel="noopener noreferrer">
            <GiTigerHead className="socialIcon" />
          </Link>
          <Link href="https://www.linkedin.com/company/security-society-at-lsu/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="socialIcon" />
          </Link>
        </div>
          <p className={`${vt323.className} bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}