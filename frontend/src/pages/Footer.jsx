import React from "react";
import { FaYoutube, FaInstagram, FaGithub, FaDribbble, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0f0f0f] to-[#111111] text-gray-300 z-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Brand + Copyright */}
          <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-white">
              V<span className="text-[#60a5fa]">A</span>RUNO
            </h2>
            
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Varuno, Inc.<br />
              All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/terms" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                Terms
              </a>
              <a href="/privacy" className="hover:text-white transition-colors underline-offset-4 hover:underline">
                Privacy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#60a5fa] text-lg" />
                <span>+91 6397011309</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#60a5fa] text-lg" />
                <a 
                  href="mailto:support@varuno.qzz.io"
                  className="hover:text-[#60a5fa] transition-colors"
                >
                  support@varuno.qzz.io
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-400 italic">
              Open for collaborations & ideas
            </p>
          </div>

          {/* Socials */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            
            <div className="flex gap-5 text-2xl">
              {[
                { icon: FaYoutube, href: "https://www.youtube.com/@creative_0900", color: "hover:text-red-500" },
                { icon: FaXTwitter, href: "https://x.com/varun_tyagi0", color: "hover:text-sky-400" },
                { icon: FaInstagram, href: "https://www.instagram.com/vaaruntyagi", color: "hover:text-pink-400" },
                { icon: FaGithub, href: "#", color: "hover:text-gray-200" },        // ← update real link
                { icon: FaDribbble, href: "#", color: "hover:text-pink-300" },     // ← update real link
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`transition-transform hover:scale-110 ${item.color}`}
                  aria-label={item.icon.name}
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Optional subtle divider + extra line */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          Made with passion in India • <span className="text-gray-400">support@varuno.qzz.io</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;