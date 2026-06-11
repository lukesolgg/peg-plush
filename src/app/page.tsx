import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BurnEngine } from "@/components/BurnEngine";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <BurnEngine />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
}
