import BottomHeader from "@/components/BottomHeader/bottomHeader";
import TopHeader from "@/components/TopHeader/topHeader";
import "@/styles/globals.css";
import '@/styles/styles.css'; // Import the CSS globally
import type { AppProps } from "next/app";
import TopHeader from "@/components/TopHeader/topHeader";
import BottomHeader from "@/components/BottomHeader/bottomHeader";
import "@/styles/globals.css"; // Import global styles if needed
import "@/styles/styles.css"; // Import global styles if needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <TopHeader />
    <Component {...pageProps} />;
    <BottomHeader />
    </>
  ); 
}
