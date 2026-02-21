import React, { useContext, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import contactLottie from "../assets/contactLottie.json";
import NewLetter from "../component/NewLetter";
import Title from "../component/Title";
import Footer from "./Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const mailtoLink = `mailto:support@varuno.qzz.io?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    try {
      // Open mail client in new tab/window without unmounting component
      window.open(mailtoLink, '_blank');
      
      // Show success state
      setIsSubmitted(true);
      
      // Clear form and reset after 2 seconds
      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setIsSubmitted(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to open email client:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-y-hidden overflow-x-hidden mb-15 md:mb-0">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto mt-25">
        <div className="w-full bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT : LOTTIE + INFO */}
          <div className="flex flex-col justify-between">
            {/* Lottie */}
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
          <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-5 flex-1">
            <Title text1="CONTACT" text2="US" />

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              required
              disabled={isSubmitted || isLoading}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              required
              disabled={isSubmitted || isLoading}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              required
              disabled={isSubmitted || isLoading}
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-600 text-white placeholder-gray-400 outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              required
              disabled={isSubmitted || isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className={`w-full font-medium py-3 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                isLoading || isSubmitted
                  ? 'bg-indigo-600 cursor-not-allowed shadow-xl'
                  : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-xl'
              } text-white`}
            >
              {isLoading ? (
                <>
                  📧 Opening...
                </>
              ) : isSubmitted ? (
                <>
                  ✅ Message Sent!
                </>
              ) : (
                'Send Message'
              )}
            </button>

            {isSubmitted && (
              <div className="text-green-400 text-sm mt-2 text-center animate-pulse">
                Your default email client has opened with the message pre-filled. 
                Please send it from there!
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Newsletter - Centered */}
      <div className="w-full max-w-4xl mx-auto mt-10 px-4">
        <NewLetter />
      </div>
      
      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
