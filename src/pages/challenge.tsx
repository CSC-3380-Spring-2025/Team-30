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
    const vm = entry.type ? entry.type : "default";
    const response = await fetch("http://localhost:1701/api/vm/create/" + vm);
    const data = await response.json();

    return <Link href="/vm/vnc.html?port={data.Port}">Launch Workspace</Link>;
  }

  return <p>Something went wrong.</p>;
}
