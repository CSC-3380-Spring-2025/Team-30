import styles from './About.module.css';
import { useState } from 'react';

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const officers = [
    {
      name: 'President: Cameron Shortt',
      img: './images/SSLPresident.png',
      bio: 'Hello, I am Cameron Shortt, a Louisiana State University (LSU) student. My major is computer science, and I have a strong passion for both compiler theory and music, particularly the trumpet...',
    },
    {
      name: 'Vice President: Ronald Gibson',
      img: './images/SSLVicePresident.png',
      bio: 'Hello, I am Ronald Gibson, III, a Louisiana State University (LSU) student. My major is computer science with a concentration in cyber operations...',
    },
    {
      name: 'Secretary: Tai Tran',
      img: './images/SSLSecratary.png',
      bio: 'Hello, I am Tai Tran, a Louisiana State University (LSU) student. My major is computer science, and my interests lie in IoT security and piano...',
    },
    {
      name: 'Treasurer: Landon Truong',
      img: './images/SSLTreasurer.png',
      bio: 'Hello, I am Landon Truong, a Louisiana State University (LSU) student. My major is computer science, and I am deeply interested in malware prevention and cybersecurity...',
    },
  ];

  return (
    <div className={styles.container}>
      <div className="topBox" />
      <div className={styles.content}>
        <div className={styles.title}>SSL Officers</div>
        <div className={styles.year}>2024-2025</div>

        <div className={styles.officerGrid}>
          {officers.map((officer, index) => (
            <div
              className={styles.officer}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.picWrapper}>
              <div className={styles.roleLabel}>{officer.name.split(":")[0]}</div>
              <img
                src={officer.img}
                alt={officer.name}
                className={`${styles.picture} ${hoveredIndex === index ? styles.slide : ''}`}
              />
              <div className={styles.bioOverlay}>
                <p className={styles.name}>{officer.name}</p>
                <p className={styles.bio}>{officer.bio}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
