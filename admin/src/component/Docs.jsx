import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Docs = () => {
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617] overflow-hidden text-white">
      
      {/* glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />

      <Nav />
      <Sidebar />

      <main className="flex items-center justify-center min-h-screen pt-16  relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Under Development</h1>
          <p className="text-sm text-white/60">
            This section is currently being built.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Docs;
