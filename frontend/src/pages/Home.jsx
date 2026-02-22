import VideoHero from "./VideoHero";
import StackCards from "../component/StackCards";
import Bg from "../component/Bg";
import VideoHero1 from "./VideoHero1";
import Product from "./Product";
import BestSeller from "../component/BestSeller";
import OurPolicy from "../component/OurPolicy";
import NewLetter from "../component/NewLetter";
import Footer from "./Footer";
import { DragCards } from "./DragCards";
import HeroSection from "./HeroSection";
import { RevealBento } from "./RevealBento";


const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-y-hidden overflow-x-hidden mb-20 md:mb-0 ">

      <HeroSection />
      <div>
        <Bg>
          <VideoHero1 />
          <VideoHero />
        </Bg>
      </div>
      <Product />
      <section className="min-h-screen">
        <section className="hero">
          <h1>Discover Your Style</h1>
          <p>Trendy outfits & accessories curated just for you — fast delivery & quality guaranteed.</p>
        </section>

        <StackCards />

        {/* <Page/> */}
        <OurPolicy />
        {/* <NewLetter /> */}
      </section>
      <RevealBento/>
      <DragCards />

      <Footer />
    </div>
  );
};

export default Home;
