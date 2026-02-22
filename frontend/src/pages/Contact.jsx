import React, { useContext, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import contactLottie from "../assets/contactLottie.json";
import plan from "../assets/plan.json";
import NewLetter from "../component/NewLetter";
import Title from "../component/Title";
import Footer from "./Footer";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { RevealBento } from "./RevealBento";
import { RevealBento1 } from "./RevealBento1";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${serverUrl}/api/email-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndStartNew = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-indigo-950/20 to-gray-900 text-gray-100 mt-2 mb-15 md:mb-0">
      <div className="flex-1 flex items-start justify-center w-full max-w-6xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900/65 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden">
          
          {/* LEFT - Lottie ko aur upar kiya + details pehle jaise simple */}
          <div className="relative p-7 lg:p-10 bg-gradient-to-br from-indigo-950/30 to-transparent flex flex-col">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />

            {/* Lottie ko top se closer banaya */}
            <div className="relative z-10 flex items-start justify-center -mt-4 mb-10 lg:mb-12">
              <Lottie
                animationData={contactLottie}
                loop
                className="w-full max-w-[320px] lg:max-w-[360px] h-auto drop-shadow-2xl"
              />
            </div>

            {/* Details — pehle jaise compact, labels ke bina */}
            <div className="space-y-6 text-gray-300 z-10 mt-auto">
              <div className="flex items-center gap-4 hover:text-indigo-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-indigo-400 text-xl" />
                </div>
                <span>support@varuno.qzz.io</span>
              </div>

              <div className="flex items-center gap-4 hover:text-indigo-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt className="text-indigo-400 text-xl" />
                </div>
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-4 hover:text-indigo-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-indigo-400 text-xl" />
                </div>
                <span>Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* RIGHT - Form (size stable wala previous version) */}
          <div className="p-7 lg:p-10 flex flex-col relative">
            <Title text1="CONTACT" text2="US" className="mb-7 text-3xl" />

            <div className="relative flex-1">
              <form 
                onSubmit={handleSubmit} 
                className={`flex flex-col mt-8 gap-4.5 transition-opacity duration-300 ${isSubmitted ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
              >
                <input type="text" placeholder="Your Name *" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading || isSubmitted} className="w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none backdrop-blur-sm text-sm min-h-[44px]" required />
                
                <input type="email" placeholder="Your Email *" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading || isSubmitted} className="w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none backdrop-blur-sm text-sm min-h-[44px]" required />
                
                <input type="text" placeholder="Subject *" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isLoading || isSubmitted} className="w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none backdrop-blur-sm text-sm min-h-[44px]" required />
                
                <textarea rows={4} placeholder="Your Message *" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isLoading || isSubmitted} className="w-full px-4 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none resize-none backdrop-blur-sm text-sm min-h-[140px]" required />

                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`mt-4 w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 ${
                    isLoading
                      ? "bg-gray-600 cursor-wait"
                      : isSubmitted
                      ? "bg-green-700 cursor-default"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-indigo-500/40 hover:scale-[1.02]"
                  }`}
                >
                  {isLoading ? <>Sending…</> : isSubmitted ? <>Sent! <FaCheckCircle className="text-green-300" /></> : "Send Message"}
                </button>
              </form>

              {isSubmitted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/65 backdrop-blur-sm rounded-xl transition-opacity duration-300">
                  <div className="text-center px-6">
                    <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-green-300 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-8">Thank you! We'll get back to you soon.</p>
                    
                    <button
                      onClick={resetAndStartNew}
                      className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-indigo-500/40 transform hover:scale-105"
                    >
                      Send Another Message
                    </button>
                  </div>

                  <div className="mt-8 opacity-80">
                    <Lottie animationData={plan} loop className="w-28 h-28" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        <div>
          
        </div>
      

      <div className="mt-auto pt-12">
        <RevealBento1/>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;