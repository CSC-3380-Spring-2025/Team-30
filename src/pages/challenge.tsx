import { VT323 } from "next/font/google";
import { useRouter } from "next/router";
import styles from "./CTFS.module.css";
import Script from "next/script"
import Link from "next/link"


const vt323 = VT323({
    weight: '400',
    subsets: ['latin'],
});

export default function Home() {
    const router = useRouter();
    const { query } = router;

    const challenge = query.n;
    const challengeData = require("./challenges.json");

    if (! challengeData[challenge]) {
	    return (
		    <p>This CTF does not exist</p>
	    );
    }

    if (challengeData[challenge].sys === "vm-manager") {
        return (
		<Link href="/vm/vnc.html" />
        );
    }

    return (
	    <p>Something went wrong.</p>
    );
}
