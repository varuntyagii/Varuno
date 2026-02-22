import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

export const RevealBento = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("unsubscribed") === "true") {
      toast.info("You have been unsubscribed. We're sad to see you go! 😔");
      // Remove the param from URL without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.06,
        }}
        className="mx-auto grid max-w-5xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: { scale: 0.5, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-sm",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/9.x/avataaars/svg?seed=VarunoFashion&style=circle&backgroundColor=1e293b&clothingColor=262626&hairColor=262626"
      alt="Varuno Avatar"
      className="mb-6 size-20 rounded-2xl border-2 border-zinc-700 shadow-lg"
    />
    <h1 className="mb-10 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
      Welcome to <span className="text-rose-400">Varuno</span>
      <br />
      <span className="text-zinc-400 text-3xl md:text-4xl">
        Where style meets soul.
      </span>
    </h1>
    <a
      href="/collection"
      className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors font-medium"
    >
      Discover your style <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{ rotate: "3deg", scale: 1.08 }}
      className="col-span-6 bg-rose-600/80 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://www.youtube.com/@creative_0900"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:text-rose-200 transition-colors"
      >
        <FaYoutube />
      </a>
    </Block>

    <Block
      whileHover={{ rotate: "-3deg", scale: 1.08 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://x.com/varun_tyagi0"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:text-sky-400 transition-colors"
      >
        <FaXTwitter />
      </a>
    </Block>

    <Block
      whileHover={{ rotate: "3deg", scale: 1.08 }}
      className="col-span-6 bg-gradient-to-br from-pink-600 to-rose-500 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://www.instagram.com/vaaruntyagi"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:text-pink-200 transition-colors"
      >
        <FaInstagram />
      </a>
    </Block>

    <Block
      whileHover={{ rotate: "-3deg", scale: 1.08 }}
      className="col-span-6 bg-zinc-800 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://github.com/varuntyagii" // ← update this
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:text-gray-300 transition-colors"
      >
        <FaGithub />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-2xl md:text-3xl leading-relaxed font-light">
    <p>
      At <span className="text-rose-400 font-medium">Varuno</span>, we curate fashion that speaks to your personality.
      <span className="text-zinc-400">
        {" "}
        From timeless classics to bold trends — every piece is chosen with care, quality, and style in mind. We're more than clothing; we're your statement.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 md:col-span-3 flex flex-col items-center justify-center gap-5 text-center">
    <FiMapPin className="text-5xl text-rose-400" />
    <p className="text-xl font-medium text-zinc-300">Uttar Pradesh, India</p>
    <p className="text-sm text-zinc-500">Shipping worldwide</p>
  </Block>
);

const EmailListBlock = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // optional if you want name
  const [loading, setLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name) return alert("Please enter your name and email");

    setLoading(true);

    try {
      const res = await fetch(`${serverUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name, // sending name as well even if backend doesn't use it yet
          subject: "Newsletter Signup",
          message: "User wants to join the inner circle"
        }),
      });

      const data = await res.json();
      toast.success("New joiner has been added! 🎉");

      setEmail("");
      setName("");
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block className="col-span-12 md:col-span-9">
      <p className="mb-2 text-2xl font-medium text-white">Level Up Your Wardrobe</p>
      <p className="mb-6 text-zinc-400">
        Early access to hyped drops • Exclusive style guides • Secret sales alerts
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
           disabled={loading}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/60 px-5 py-3.5 text-zinc-100 placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 outline-none transition-all disabled:cursor-not-allowed"
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
           disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/60 px-5 py-3.5 text-zinc-100 placeholder-zinc-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 outline-none transition-all disabled:cursor-not-allowed"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-rose-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-rose-500 transition-colors shadow-md hover:shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiMail /> {loading ? "Sending..." : "Join the Inner Circle"}
        </button>
      </form>
    </Block>
  );
};

export default EmailListBlock;

const Logo = () => {
  return (
    <div className="mx-auto mb-16 flex justify-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
        V<span className="text-rose-400">A</span>RUNO
      </h1>
    </div>
  );
};

const Footer = () => {
  return (
   
    <footer className="mt-16 text-center text-zinc-500 text-sm">
  <p>
        Crafted with passion for fashion •{" "}
    <a
      href="mailto:varuno.ecommerce@gmail.com"
      className="text-rose-400 hover:text-rose-300 transition-colors"
    >
      varuno.ecommerce@gmail.com
    </a>
  </p>
</footer>
  );
};