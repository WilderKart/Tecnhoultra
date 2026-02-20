import Hero from "@/components/sections/Hero";
import Authority from "@/components/sections/Authority";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import Manifesto from "@/components/sections/Manifesto";
import Contact from "@/components/sections/Contact";
import Architecture from "@/components/sections/Architecture";
import DramaticPause from "@/components/sections/DramaticPause";

export default function Home() {
  return (
    <>
      <Hero />
      <Authority />
      <Architecture />
      <DramaticPause />
      <Services />
      <Manifesto />
      <Methodology />
      <Contact />
    </>
  );
}
