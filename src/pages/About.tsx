// import HamburgerMenu from "@/components/hamburgerMenu"; // Uncomment if you're using this
import styles from './About.module.css';
import { useEffect, useState } from 'react';

interface Officer {
  role: string;
  name: string;
  image: string;
  bio: string;
}

export default function Home() {
  const [officers, setOfficers] = useState<Officer[]>([]);

<<<<<<< HEAD
=======
  useEffect(() => {
    fetch('/officers.json') 
      .then((res) => res.json())
      .then((data: Officer[]) => setOfficers(data))
      .catch((err) => console.error("Failed to load officers data", err));
  }, []);
>>>>>>> origin/dev

  return (
    <div className={styles.container}>
      <div className="topBox">
      </div>

      <div className="content">
        <div className={styles.title}>SSL Officers</div>
        <div className={styles.year}>2024-2025</div>
<<<<<<< HEAD
        <div className={styles.president}>
          <div className={styles.pic}>
            <img src="./images/SSLPresident.png" alt="SSL President" className={`${styles.picture} ${isMoving ? styles.animated : ''}`} />
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
            <img src="./images/SSLVicePresident.png" alt="SSL Vice President" className={`${styles.picture} ${isMoving ? styles.animated : ''}`} />
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
            <img src="./images/SSLSecratary.png" alt="SSL Secratary" className={`${styles.picture} ${isMoving ? styles.animated : ''}`} />
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
            <img src="./images/SSLTreasurer.png" alt="SSL Secratary" className={`${styles.picture} ${isMoving ? styles.animated : ''}`} />
          </div>
          <p className={styles.name}>
            Treasurer: Landon Truong
          </p>
          <div className={styles.bioContainer}>
            <p className={styles.bio}>
            Hello, I am Landon Truong, a Louisiana State University (LSU) student. My major is computer science, and I am deeply interested in malware prevention and cybersecurity. I am passionate about analyzing and mitigating cyber threats to create safer digital environments. Beyond the world of security, I enjoy the physical and mental challenges of rock climbing.            </p>
            </div>
        </div>
=======

        {officers.map((officer, index) => (
          <div key={index}>
            <div className={styles.pic}>
              <img
                src={officer.image}
                alt={`SSL ${officer.role}`}
                className={`${styles.picture}`}
              />
            </div>
            <div className={styles[getRoleClassName(officer.role)]}>
              <h2 className={styles.name}>
                <span>{officer.role}: {officer.name}</span>
              </h2>
              <div className={styles.bioContainer}>
                <p className={styles.bio}>
                  <span>{officer.bio}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
>>>>>>> origin/dev
      </div>
    </div>
  );
}

function getRoleClassName(role: string): string {
  return role.toLowerCase().replace(/\s/g, '');
}
