import { useRouter } from "next/router";
import Link from "next/link";
import challenges from "./challenges.json";

interface ChallengeEntry {
  sys: string;
}

export default function Home() {
  const { query } = useRouter();

  const challenge = Array.isArray(query.n) ? query.n[0] : query.n ?? "";

  const challengeData: Partial<Record<string, ChallengeEntry>> = challenges;

  const entry = challengeData[challenge];
  if (!entry) {
    return <p>This CTF does not exist</p>;
  }

  if (entry.sys === "vm-manager") {
    return <Link href="/vm/vnc.html">Launch VM Manager</Link>;
  }

  return <p>Something went wrong.</p>;
}