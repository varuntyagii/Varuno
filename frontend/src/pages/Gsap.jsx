import { useContext, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { userDataContext } from "../context/UserContext";
import VideoHero from "./VideoHero";

const Gsap = ({onComplete}) => {
  const comp = useRef(null);
  const welcomeRef = useRef(null);
  const { userData } = useContext(userDataContext);

  useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    const tl = gsap.timeline();
    


    tl.from("#intro-slider", {
      xPercent: 100,
      duration: 0.7,
      ease: "power4.out",
    })
      .from(["#t1", "#t2", "#t3", "#t4"], {
        opacity: 0,
        y: 30,
        stagger: 0.3,
      })
      .to(["#t1", "#t2", "#t3", "#t4"], {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        delay: 0.3,
      })
      .to("#intro-slider", {
        xPercent: -100,
        duration: 0.7,
        ease: "power4.in",
      });

  }, comp);

  return () => ctx.revert();
}, []);

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="min-h-screen p-5 sm:p-10 text-black bg-gray-50 absolute top-0 left-0 z-10 w-full flex flex-col items-center justify-center gap-6"
      >
        <h1 id="t1" className="text-4xl md:text-7xl lg:text-6xl text-center">
          For those who move forward.
        </h1>
        <h1 id="t2" className="text-4xl md:text-7xl lg:text-7xl text-center">
          Make your mark.
        </h1>
        <h1 id="t3" className="text-4xl md:text-7xl lg:text-8xl text-center">
          Less noise. Better style.
        </h1>
        <h1 id="t4" className="text-4xl md:text-7xl lg:text-9xl text-center">
          Define your own path.
        </h1>
      </div>

      <div className="relative h-screen bg-gray-950 flex items-center justify-center">
        {userData && (
          <h1
            ref={welcomeRef}
            className="absolute text-5xl md:text-8xl lg:text-7xl font-bold text-gray-100 text-center"
          >
            Welcome, {userData.name}
          </h1>


        )}



      </div>
    </div>
  );
};

export default Gsap;
