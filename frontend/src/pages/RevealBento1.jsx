import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaPinterest, FaInstagram } from "react-icons/fa";
import { FaDiscord, FaSnapchat } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

export const RevealBento1 = () => {
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
      Welcome to <span className="text-pink-300">Varuno</span>
      <br />
      <span className="text-zinc-400 text-3xl md:text-4xl">
        Minimal. Modern. Intentional.      </span>
    </h1>
    <a
      href="/collection"
      className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors font-medium"
    >
        Explore the Edit
         <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
  whileHover={{ rotate: "3deg", scale: 1.08 }}
  className="col-span-6 bg-indigo-600 md:col-span-3 flex items-center justify-center"
>
  <a
    href="https://discord.gg/your-invite-link"
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-full w-full place-content-center text-4xl text-white hover:opacity-80 transition-all"
  >
    <FaDiscord />
  </a>
</Block>

    {/* Snapchat */}
    <Block
      whileHover={{ rotate: "-3deg", scale: 1.08 }}
      className="col-span-6 bg-yellow-400 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://www.snapchat.com/add/varun_tyagii"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-black hover:opacity-80 transition-all"
      >
        <FaSnapchat />
      </a>
    </Block>

    {/* LinkedIn */}
    <Block
      whileHover={{ rotate: "3deg", scale: 1.08 }}
      className="col-span-6 bg-blue-700 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://www.linkedin.com/in/varuntyagi09/"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:opacity-80 transition-all"
      >
        <FaLinkedin />
      </a>
    </Block>

    {/* Pinterest */}
    <Block
      whileHover={{ rotate: "-3deg", scale: 1.08 }}
      className="col-span-6 bg-red-600 md:col-span-3 flex items-center justify-center"
    >
      <a
        href="https://www.pinterest.com/varun_tyagii"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full w-full place-content-center text-4xl text-white hover:opacity-80 transition-all"
      >
        <FaPinterest />
      </a>
    </Block>
  </>
);
const AboutBlock = () => (
  <Block className="col-span-12 text-2xl md:text-3xl leading-relaxed font-light">
    <p>
      At <span className="text-yellow-500 font-medium">Varuno</span>, we design with intention.
      <span className="text-zinc-400">
        {" "}
Clean silhouettes, refined fits, and premium fabrics built to last beyond seasons. This isn’t fast fashion — it’s considered style.      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 md:col-span-3 flex flex-col items-center justify-center gap-5 text-center">
    <FiMapPin className="text-5xl text-rose-400" />
    <p className="text-xl font-medium text-zinc-300">Designed in India
</p>
    <p className="text-sm text-zinc-500">Delivered Worldwide</p>
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
      <p className="mb-2 text-2xl font-medium text-white">Join the Varuno Inner Circle</p>
      <p className="mb-6 text-zinc-400">
    Early access to limited drops • Private previews • Members-only offers      </p>
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
          <FiMail /> {loading ? "Sending..." : "Join US"}
        </button>
      </form>
    </Block>
  );
};

export default EmailListBlock;

const Logo = () => {
  return (
    <div className="mx-auto mb-16 flex justify-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-300">
        V<span className="text-rose-200">A</span>RUNO
      </h1>
    </div>
  );
};

const Footer = () => {
  return (
  <footer className="mt-16 text-center text-zinc-500 text-sm">
  <p>
    © {new Date().getFullYear()} Varuno. All rights reserved. •{" "}
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