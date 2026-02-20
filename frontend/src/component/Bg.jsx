import React, { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import VideoHero from '../pages/VideoHero';

gsap.registerPlugin(ScrollTrigger);

const Bg = ({children}) => {
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".cinematic",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // smooth scroll
    },
  });

  // Top image: compress slightly + move background
  tl.to(".top", {
    scaleY: 0.85,
    transformOrigin: "bottom center",
    backgroundPositionY: "80%",
    ease: "power1.out",
  });

  // Bottom image: compress slightly + move background (same style as top)
  tl.to(
    ".bottom",
    {
      scaleY: 0.85,  // similar effect as top
      transformOrigin: "top center",
      backgroundPositionY: "60%", // subtle move
      ease: "power2.out",
    },
    "<" // start at same time
  );

  return () => tl.kill();

  
}, []);

  return (
    <div className="cinematic">
      <div className="half top"></div>
      <div className="half bottom"></div>

      <div className="video-overlay">
  {children[0]}
</div>

<div className="video-overlay-2">
  {children[1]}
</div>

    </div>
  );
}

export default Bg;
