import { useState, useEffect } from "react";
import PageIntro from "./PageIntro";
import Background from "../component/Backgroud";
import Hero from "../component/Hero";

const HeroSection = () => {
   const heroData = [
  {
    text: "30% Off Everything",
    text2: "Your next obsession awaits"
  },
  {
    text: "New In Today",
    text2: "Curated for you"
  },
  {
    text: "Signature Drop",
    text2: "Made to be noticed"
  },
  {
    text: "Season Reset Sale",
    text2: "Refresh your style"
  }
];

    const [heroCount, setHeroCount] = useState(0);
    const TOTAL = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroCount((prevCount) => (prevCount + 1) % TOTAL);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <PageIntro>
            <div className="absolute inset-0 flex flex-col justify-center pl-6 md:pl-20 ">
                <Background heroCount={heroCount} />
                <Hero
                    heroCount={heroCount}
                    setHeroCount={setHeroCount}
                    heroData={heroData[heroCount]}
                />
            </div>
        </PageIntro>
    );
};

export default HeroSection;
