
import React from "react";
import { motion } from "framer-motion";
import Title from "../component/Title";

export const SocialMedia = () => {
  return (

    <div >
          <div className='text-center mb-10'>
        <Title text1="SOCIAL" text2="MEDIA" />
       
      </div>
          <section className="grid place-content-center gap-2 bg-green-300 px-8 py-24 text-black rounded-xl ">
      
       
        <FlipLink href="https://www.instagram.com/vaaruntyagi/">Instagram</FlipLink>
        <FlipLink href="https://www.linkedin.com/in/varuntyagi09">LinkedIn</FlipLink>
        <FlipLink href="https://twitter.com/varun_tyagi0">Twitter</FlipLink>
        <FlipLink href="https://www.github.com/varuntyagii">GitHub</FlipLink>

    </section>
    </div>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};