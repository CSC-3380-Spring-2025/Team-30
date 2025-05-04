import Image from "next/image";
import HamburgerMenu from "@/components/HamburgerMenu/hamburgerMenu";
import styles from "./TopHeader.module.css";
import Link from "next/link"; 

const TopHeader = () => {
  return (
    <div className={styles.topBox}>
      <Link href="/"> 
        <Image
          src="/ssl-logo.png"
          width={75}
          height={75}
          className={styles.logo}
          alt="Logo"
        />
      </Link>
      <HamburgerMenu />
      <div className={styles.buttonP}>
      <a href="/login">
        <button>Login/Register</button>
      </a>
      </div>
    </div>
  );
};

export default TopHeader;
