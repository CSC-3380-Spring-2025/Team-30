import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component
import styles from './About.module.css'
import { useState } from "react";

export default function Home() {
  const [isMoving, setIsMoving] = useState(false);

  const handleHover = () => {
    if (!isMoving) {
      setIsMoving(true);
      setTimeout(() => {
        setIsMoving(false);
      }, 10000);
    }
  };

  return (
    <div className={styles.container}>
      <div className="topBox">
        <HamburgerMenu />
      </div>
      <div className="content">
        <div className={styles.title}>
          SSL Officers
        </div>
        <div className={styles.president}>
          <div className={styles.year}>2024-2025</div>
          <div className={styles.pic}>
            <img src="./images/SSLPresident.png" alt="SSL President" className={`${styles.picture} ${isMoving ? styles.animated : ''}`}
              onMouseEnter={handleHover} />
          </div>
          <p className={styles.name}>
            President: Cameron Shortt
          </p>
          <div className={styles.bioContainer}>
            <p className={styles.bio}>
              Hello, I am Cameron Shortt, a Louisiana State University (LSU) student. My major is computer science, and I have a strong passion for both compiler theory and music, particularly the trumpet. I am a dedicated and analytical thinker who enjoys tackling complex computational problems while also appreciating the artistry of music.
            </p>
            </div>
        </div>
      </div>
      <div className="bottomBox">
        <p className={`bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}