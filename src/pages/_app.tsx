import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";  // Import SessionProvider from next-auth/react
import TopHeader from "@/components/TopHeader/topHeader";
import BottomHeader from "@/components/BottomHeader/bottomHeader";
import HamburgerMenu from "@/components/HamburgerMenu/hamburgerMenu"
import "@/styles/globals.css"; // Import global styles if needed
import "@/styles/styles.css"; // Import global styles if needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>  {/* Wrap your app with SessionProvider */}

      <div className="app-container">
        <TopHeader />
        <HamburgerMenu />
        <main className="app-content">
          <Component {...pageProps} />
        </main>
        <BottomHeader />
      </div>
      
    </SessionProvider>
  );
}
