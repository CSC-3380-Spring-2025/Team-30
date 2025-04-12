import type { AppProps } from "next/app";
import TopHeader from "@/components/TopHeader/topHeader";
import BottomHeader from "@/components/BottomHeader/bottomHeader";
import HamburgerMenu from "@/components/HamburgerMenu/hamburgerMenu"
import "@/styles/globals.css"; // Import global styles if needed
import "@/styles/styles.css"; // Import global styles if needed

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <TopHeader />
      <HamburgerMenu />
      <main className="app-content">
        <Component {...pageProps} />
      </main>
      <BottomHeader />
    </div>
  );
}
