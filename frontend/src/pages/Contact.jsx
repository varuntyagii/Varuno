import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import contactLottie from "../assets/contactLottie.json";
import NewLetter from "../component/NewLetter";
import Title from "../component/Title";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-y-hidden overflow-x-hidden mb-10 md:mb-0 ">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto mt-25">
        <div className="w-full bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT : LOTTIE + INFO */}
          <div className="flex flex-col justify-between">
            {/* Lottie (same visual height as form) */}
            <div className="w-full h-[320px] md:h-full flex items-center justify-center">
              <Lottie
                animationData={contactLottie}
                loop
                className="w-full h-full"
              />
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-4 text-gray-300">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-indigo-500" />
                <span>support@varuno.qzz.io</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* RIGHT : FORM */}
          <form className="flex flex-col justify-between gap-5 h-full">
            <Title text1="CONTACT" text2="US" />

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Newsletter - Centered */}
      <div className="w-full max-w-4xl mx-auto mt-10 px-4">
        <NewLetter />
      </div>
      
      {/* Footer - Stays at bottom, perfect as-is */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
