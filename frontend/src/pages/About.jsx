import React from "react";
import image from "../assets/varunoabout.png";
import { SocialMedia } from "./SocialMedia";
import Title from "../component/Title";
import NewLetter from "../component/NewLetter";
import Footer from "./Footer";
import { RevealBento } from "./RevealBento";
import { RevealBento1 } from "./RevealBento1";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <div className="w-full h-[350px] md:h-[520px] overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={image}
            alt="About Varuno"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <Title text1="ABOUT" text2="VARUNO" />

          <p className="text-gray-300 leading-relaxed">
            Varuno is a modern fashion brand built for individuals who value
            confidence, comfort, and refined simplicity. We create pieces that
            blend effortlessly into everyday life.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Every garment is crafted with precision — premium fabrics,
            structured fits, and durability that outlasts trends.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Our philosophy is simple — fashion should feel effortless. When you
            wear Varuno, confidence should come naturally.
          </p>

          <span className="text-sm tracking-[0.3em] text-blue-500 mt-4">
            MINIMAL • MODERN • TIMELESS
          </span>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-3xl p-8 text-center 
                          transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Minimal Design</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Clean silhouettes, no unnecessary trends. Just timeless pieces
              that remain relevant season after season.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-3xl p-8 text-center 
                          transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Carefully selected fabrics and attention to detail ensure
              comfort, durability, and a premium finish.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900/60 border border-gray-700 rounded-3xl p-8 text-center 
                          transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Built for Everyday</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Designed to integrate seamlessly into daily life — versatile,
              reliable, and easy to style.
            </p>
          </div>

        </div>
      </section>

      {/* SOCIAL + EXTRA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <SocialMedia />
       
      </section>
        {/* <RevealBento /> */}
      <NewLetter/>
      <Footer />
    </div>
  );
};

export default About;