import {VT323} from "next/font/google";
import styles from "./CTFS.module.css"

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
        <div className={styles.title}>
          Capture The Flag
        </div>
        <div className={styles.ctflisting}>
        <img src="./CTFIcon.png" alt="CTF Icon" className={`${styles.ctficon}`} />
        <div className={styles.ctfnumber}>
             Task 0
            </div>
            <div className={styles.ctfname}>
             Find the Flag
            </div>
        </div>
      </div>
      <div className="bottomBox">
      <p className={`${vt323.className} bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}