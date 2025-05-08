import Link from 'next/link';
import { IoLogoDiscord } from 'react-icons/io5'; // Discord Logo
import { FaLinkedin } from 'react-icons/fa6'; // Linkedin Logo
import { GiTigerHead } from 'react-icons/gi'; // Tiger Logo
import { VT323 } from 'next/font/google';
import styles from './BottomHeader.module.css';


const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
});

const BottomHeader = () => {
  return (
    <div className={styles.bottomBox}>
      <div className={styles.socialLinks}>
        <Link href="https://discord.gg/EACydvmfqH" target="_blank" rel="noopener noreferrer">
          <IoLogoDiscord className={styles.socialIcon} />
        </Link>
        <Link href="https://tigerlink.lsu.edu/ssl/home/" target="_blank" rel="noopener noreferrer">
          <GiTigerHead className={styles.socialIcon} />
        </Link>
        <Link href="https://www.linkedin.com/company/security-society-at-lsu/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className={styles.socialIcon} />
        </Link>
      </div>
      <p className={`${vt323.className} ${styles.bottomText}`}>©2025 Security Society at LSU</p>
    </div>
  );
};

export default BottomHeader;
