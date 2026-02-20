import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0f1f] text-gray-400 px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Section */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="text-white text-2xl font-semibold tracking-wider">
            V<span className="text-indigo-400">A</span>RUNO
          </h2>

          <p className="text-gray-400 text-sm">
            © 2026 Varuno, Inc. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 text-center md:text-left">
            All trademarks, logos, and brand names are the property of their
            respective owners.
          </p>

          <div className="flex gap-4 text-xs mt-2">
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
          </div>
        </div>

        {/* Right Section (Social Icons) */}
        <div className="flex gap-5 text-lg">
          <FaYoutube className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
          <FaXTwitter className="cursor-pointer hover:text-sky-400 transition-colors duration-200" />
          <FaInstagram className="cursor-pointer hover:text-pink-400 transition-colors duration-200" />
          <FaGithub className="cursor-pointer hover:text-gray-300 transition-colors duration-200" />
          <FaDribbble className="cursor-pointer hover:text-pink-300 transition-colors duration-200" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
