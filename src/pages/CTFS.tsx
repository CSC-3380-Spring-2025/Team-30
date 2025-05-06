import { VT323 } from "next/font/google";
import styles from "./CTFS.module.css";
import Link from "next/link";
import Image from "next/image";

// import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

const vt323 = VT323({
    weight: '400',
    subsets: ['latin'],
});

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
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 0
                    </div>
                    <div className={styles.ctfname}>
                        Find the Flag
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An Idea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 1
                    </div>
                    <div className={styles.ctfname}>
                        Lost Flag
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An Idea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 2
                    </div>
                    <div className={styles.ctfname}>
                        Backup Fail
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An Idea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 3
                    </div>
                    <div className={styles.ctfname}>
                        Badly Lost Flag
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An Idea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 4
                    </div>
                    <div className={styles.ctfname}>
                        Ransomware
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User AnIdea Of What It’s About Before They Click The Icon That Will Then Take Them To The Individual CTF Page.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 5
                    </div>
                    <div className={styles.ctfname}>
                        Lost Key
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give The User An IdeaOfWhatIt’sAboutBeforeTheyClickTheIconThatWillThenTakeThemToTheIndividualCTFPage.
                        </div>
                    </div>
                </div>
                <div className={styles.ctflisting}>
                    <Link href="/CTF">
                        <Image
                            src="/CTFIcon.png"
                            alt="CTF Icon"
                            className={styles.ctficon}
                            width={64}
                            height={64}
                        />
                    </Link>
                    <div className={styles.ctfnumber}>
                        Task 6
                    </div>
                    <div className={styles.ctfname}>
                        ENIGMA
                    </div>
                    <div className={styles.desccontainer}>
                        <div className={styles.ctfdesc}>
                            Task Description Here For The Tasks, It Will Just Be A Brief Explanation To Give TheUserAnIdeaOfWhatIt’sAboutBeforeTheyClickTheIconThatWillThenTakeThemToTheIndividualCTFPage.
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottomBox">
                <p className={`${vt323.className} bottomText`}>©2025 Security Society at LSU</p>
            </div>
        </div>
    );
}