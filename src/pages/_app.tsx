import BottomHeader from "@/components/BottomHeader/bottomHeader";
import TopHeader from "@/components/TopHeader/topHeader";
import "@/styles/globals.css";
import '@/styles/styles.css'; // Import the CSS globally

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <TopHeader />
    <Component {...pageProps} />;
    <BottomHeader />
    </>
  ); 
  
}
