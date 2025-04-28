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

  useEffect(() => {
    fetch('/officers.json') 
      .then((res) => res.json())
      .then((data: Officer[]) => setOfficers(data))
      .catch((err) => console.error("Failed to load officers data", err));
  }, []);

  return (
    <div className={styles.container}>
      <div className="topBox">
      </div>

      <div className="content">
        <div className={styles.title}>SSL Officers</div>
        <div className={styles.year}>2024-2025</div>

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
      </div>
    </div>
  );
}

function getRoleClassName(role: string): string {
  return role.toLowerCase().replace(/\s/g, '');
}
