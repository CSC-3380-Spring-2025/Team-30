// import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component
import styles from './About.module.css'
import { useState } from "react";

export default function Home() {
  const [isMoving, setIsMoving] = useState(false);
//theres definetly wayyy better ways to do this but this is the best I can come up with rn with the research i've done
//gonna have to figure out how to make the text appear as the picture slides
//its not actively registering that the cursor is still over the proximity of the image so it just slides back before i move the cursor

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

      </div>
      <div className="content">
        <div className={styles.title}>
          SSL Officers
        </div>
        <div className={styles.year}>2024-2025</div>
        <div className={styles.president}>
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
        <div className={styles.vicepresident}>
          <div className={styles.pic}>
            <img src="./images/SSLVicePresident.png" alt="SSL Vice President" className={`${styles.picture} ${isMoving ? styles.animated : ''}`}
              onMouseEnter={handleHover} />
          </div>
          <p className={styles.name}>
            Vice President: Ronald Gibson
          </p>
          <div className={styles.bioContainer}>
            <p className={styles.bio}>
            Hello, I am Ronald Gibson, III, a Louisiana State University (LSU) student. My major is computer science with a concentration in cyber operations. I am a skilled and ambitious self-starter who always strives for high performance and is willing to take on the most challenging tasks.             
            </p>
            </div>
        </div>
        <div className={styles.secratary}>
          <div className={styles.pic}>
            <img src="./images/SSLSecratary.png" alt="SSL Secratary" className={`${styles.picture} ${isMoving ? styles.animated : ''}`}
              onMouseEnter={handleHover} />
          </div>
          <p className={styles.name}>
            Secratary: Tai Tran
          </p>
          <div className={styles.bioContainer}>
            <p className={styles.bio}>
            Hello, I am Tai Tran, a Louisiana State University (LSU) student. My major is computer science, and my interests lie in IoT security and piano. I am passionate about exploring the vulnerabilities of connected devices and developing secure solutions to protect them. Outside of cybersecurity, I find creativity and discipline in playing the piano.            
            </p>
            </div>
        </div>
        <div className={styles.treasurer}>
          <div className={styles.pic}>
            <img src="./images/SSLTreasurer.png" alt="SSL Secratary" className={`${styles.picture} ${isMoving ? styles.animated : ''}`}
              onMouseEnter={handleHover} />
          </div>
          <p className={styles.name}>
            Treasurer: Landon Truong
          </p>
          <div className={styles.bioContainer}>
            <p className={styles.bio}>
            Hello, I am Landon Truong, a Louisiana State University (LSU) student. My major is computer science, and I am deeply interested in malware prevention and cybersecurity. I am passionate about analyzing and mitigating cyber threats to create safer digital environments. Beyond the world of security, I enjoy the physical and mental challenges of rock climbing.            </p>
            </div>
        </div>
      </div>
      <div className="bottomBox">
        <p className={`bottomText`}>©2025 Security Society at LSU</p>
      </div>
    </div>
  );
}