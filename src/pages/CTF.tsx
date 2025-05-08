import Image from "next/image";
import styles from "./CTF.module.css"
import Button from "@/components/Button/button";


// import HamburgerMenu from "@/components/hamburgerMenu"; // Import the HamburgerMenu component

export default async function Home() {
    await fetch("http://localhost:1701/api/vm/create/tomsrtbt");
    return (
        <div className="container">
            <div className="topBox">

            </div>
            <div className="content">
                <div className={styles.title}>
                    Capture The Flag
                </div>
                <div className={styles.ctflisting}>
                    <Image
                        src="/CTFIcon.png"
                        alt="CTF Icon"
                        className={styles.ctficon}
                        width={100}
                        height={100}
                    />
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
                    <a href="/vm/vm.html?path=ws://localhost:5900&autoconnect=1" target="_blank" rel="noopener noreferrer">
                        <Button text="Launch Workspace" />
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
