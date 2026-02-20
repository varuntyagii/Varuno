import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-blue-100">
      {text1}{" "}
      <span className="bg-gradient-to-r from-[#a5faf7] to-[#38bdf8] bg-clip-text text-transparent">
        {text2}
      </span>
    </h1>
  );
};

export default Title;
