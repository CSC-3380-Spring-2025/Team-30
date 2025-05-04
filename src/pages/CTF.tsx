import { VT323 } from "next/font/google";
import styles from "./CTF.module.css"
import Button from "@/components/Button/button";


// import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

const vt323 = VT323({
    weight: '400',
    subsets: ['latin'],
})

export default function Home() {
    return (
        <div className="container">
            <div className="topBox">

            </div>
            <div className="content">
                <div className={styles.title}>
                    Capture The Flag
                </div>
                <div className={styles.ctflisting}>
                    <img src="./CTFIcon.png" alt="CTF Icon" className={styles.ctficon} />
                    <div className={styles.ctfnumber}>
                        Task 0
                    </div>
                    <div className={styles.ctfname}>
                        Find the Flag
                    </div>
                    <div className={styles.desccontainer}>
                    <div className={styles.leftContent}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An Idea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                    <div className={styles.rightContent}>
                    <div className={styles.hintWrapper}>
                        <div className={styles.ctfhint}> Hint 1 </div>
                        <div className={styles.ctfhintHidden}>
                        Hint 1 Appears When User Hovers Over It. </div>
                        </div>
                        <div className={styles.terminalButtonWrapper}>
                    <a href="/vm/vnc.html" target="_blank" rel="noopener noreferrer">
                        <Button text="Launch Terminal" />
                    </a>
                    </div>
                    <div className={styles.submitButtonWrapper}>
                            <Button text="Submit" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}