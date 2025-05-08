import { useState } from "react";
import styles from "./Hamburger.module.css";
import { vt323 } from "../../utils/fonts"; // Import the font 
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); 
  };

  return (
    <div className={styles.hamburgerMenu}>
      <div
        className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={`${styles.menuContent} ${isOpen ? styles.active : ""}`}>
        <ul className={vt323.className}>
          <li><Link href="/" onClick={closeMenu}>Home</Link></li> 
          <li><Link href="/CTFS" onClick={closeMenu}>CTFs</Link></li> 
          <li><Link href="/events" onClick={closeMenu}>Events</Link></li>
          <li><Link href="/About" onClick={closeMenu}>About</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
