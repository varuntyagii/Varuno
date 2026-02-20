import React from "react";
import image from "../assets/varunoabout.png";
import { SocialMedia } from "./SocialMedia";
import Title from "../component/Title";
import NewLetter from "../component/NewLetter";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-y-hidden overflow-x-hidden mb-10 md:mb-0 ">


      {/* ABOUT SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-30 ">

        {/* Left Image */}
        <div className="w-full h-[320px] md:h-[520px] overflow-hidden rounded-2xl">
          <img
            src={image}
            alt="About Varuno"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest">
            <Title text1={"ABOUT"} text2={"VARUNO"} />
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Varuno is a modern fashion brand created for individuals who
            appreciate clean design, comfort, and confidence. We focus on
            timeless silhouettes that fit seamlessly into everyday life.
          </p>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Every Varuno piece is crafted with attention to fabric quality,
            fit, and durability. We avoid unnecessary trends and focus on
            creating clothing that feels premium and lasts beyond seasons.
          </p>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Our philosophy is simple — fashion should feel effortless. When
            you wear Varuno, you should feel confident without trying too
            hard.
          </p>

          <div className="pt-4">
            <span className="inline-block text-sm tracking-widest text-[#4f8cff]">
              MINIMAL • MODERN • TIMELESS
            </span>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto mt-32">
        <h2 className="text-3xl md:text-4xl font-bold tracking-widest mb-12 text-center">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
          <div>
            <h3 className='bg-gray-900/60 border border-gray-700 rounded-2xl p-8 text-center 
                       transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl'>Minimal Design
            <p className="text-gray-400 text-sm leading-relaxed">
              We strip away excess and focus on clean silhouettes that never
              go out of style. No loud trends, just timeless design.
            </p>
            </h3>
          </div>

          <div>
            <h3 className='bg-gray-900/60 border border-gray-700 rounded-2xl p-8 text-center 
                       transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl'>Premium Quality
            <p className="text-gray-400 text-sm leading-relaxed">
              From fabric selection to stitching, every detail is carefully
              considered to deliver comfort, durability, and a premium feel.
            </p>
            </h3>
          </div>

          <div>
            <h3 className='bg-gray-900/60 border border-gray-700 rounded-2xl p-11 text-center 
                       transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl'>Built for Everyday
            <p className="text-gray-400 text-sm leading-relaxed">
              Our pieces are designed to fit effortlessly into daily life —
              versatile, reliable, and easy to style.
            </p>
            </h3>
          </div>
        </div>
      

      {/* SOCIAL MEDIA */}
      <div className="mt-24">
        <SocialMedia />

      </div>
      <NewLetter/>
    </div>
 <Footer/>
    </div>
    
  );
};

export default About;
