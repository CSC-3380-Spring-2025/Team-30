// components/TopHeader.tsx
import Image from 'next/image';
import HamburgerMenu from '@/components/HamburgerMenu/hamburgerMenu';
import styles from './TopHeader.module.css';

const TopHeader = () => {
  return (
    <div className={styles.topBox}>
      <a href="https://google.com">
        <Image
          src="/ssl-logo.png"
          width={75}
          height={75}
          className={styles.logo}
          alt="Logo"
        />
      </a>
      <HamburgerMenu />
    </div>
  );
};

export default TopHeader;