import { useState } from "react";
import styles from "./Hamburger.module.css";
import { vt323 } from "../../utils/fonts"; // Import the font 

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          <li><a href="/index">Home</a></li>
          <li><a href="#">CTFs</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="#">Forum</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;