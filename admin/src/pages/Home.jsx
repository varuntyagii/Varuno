import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { DivOrigami } from './DivOrigami'
import { motion } from "framer-motion";
import Meditate from '../assets/Meditate'
import Lottie from 'lottie-react';
const Home = () => {
  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617] overflow-hidden">
  
  {/* subtle glow */}
  <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
  <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />
     

  <Nav />

  <Sidebar/>
  <div className=''>
      <HomeOverlay />
     {/* <DivOrigami/> */}
  </div>
<div className="relative overflow-hidden">
      
    </div>
</div>

  )
}
const HomeOverlay = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:px-20 px-6 py-20 md:py-32 text-yellow-50 gap-10 ml-10">

      {/* Left Side Text */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl leading-snug">
          Welcome to Admin{" "}
          <span className="relative inline-block">
            Dashboard
            <svg
              viewBox="0 0 286 73"
              fill="none"
              className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{
                  duration: 1.25,
                  ease: "easeInOut",
                }}
                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                stroke="#FACC15"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          with Simple AI Tools
        </h1>
      </div>

      {/* Right Side Lottie */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-sm md:max-w-md">
          <Lottie animationData={Meditate} loop />
        </div>
      </div>

    </div>
  );
};



export default Home
