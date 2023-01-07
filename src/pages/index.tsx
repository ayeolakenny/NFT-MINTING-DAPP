import { useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Artworks } from "../components/Artworks";
import { Footer } from "../components/Footer";
import { Alert } from "../components/Alert";
import { Loading } from "../components/Loading";
import { isWalletConnected, loadNfts } from "../client-evm-interface";
import { useGlobalState } from "../store";

export default function Home() {
  const [nfts] = useGlobalState("nfts");
  useEffect(() => {
    const run = async () => {
      await isWalletConnected().then(() => {
        console.log("Blockchain Loaded");
      });
      await loadNfts();
    };

    run();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks artworks={nfts} />
      <Footer />
      <Alert />
      <Loading />
    </div>
  );
}
