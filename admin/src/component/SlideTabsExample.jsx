// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export const SlideTabsExample = () => {
//   return (
//     <div className=" py-10">
//       <SlideTabs />
//     </div>
//   );
// };


//  const SlideTabs = () => {
//   const navigate = useNavigate(); // navigation hook
//   const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
//   const [activeTab, setActiveTab] = useState("Home");


//   return (
//     <ul
//       onMouseLeave={() => {
//         setPosition((pv) => ({
//           ...pv,
//           opacity: 0,
//         }));
//       }}
//       className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
//     >
//       <Tab setPosition={setPosition}>Home</Tab>
//       <Tab setPosition={setPosition}>Pricing</Tab>
//       <Tab setPosition={setPosition}>Features</Tab>
//       <Tab setPosition={setPosition}>Docs</Tab>
//       {/* <Tab setPosition={setPosition}>Blog</Tab> */}

//       <Cursor position={position} />
//     </ul>
//   );
// };

// const Tab = ({ children, setPosition }) => {
//   const ref = useRef(null);

//   return (
//     <li
//       ref={ref}
//       onMouseEnter={() => {
//         if (!ref?.current) return;

//         const { width } = ref.current.getBoundingClientRect();

//         setPosition({
//           left: ref.current.offsetLeft,
//           width,
//           opacity: 1,
//         });
//       }}
//       className="relative z-10 block cursor-pointer px-3 py-1 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-1 md:text-base"
//     >
//       {children}
//     </li>
//   );
// };

// const Cursor = ({ position }) => {
//   return (
//     <motion.li
//       animate={{
//         ...position,
//       }}
//       className="absolute z-0 h-6 rounded-full bg-black md:h-8"
//     />
//   );
// };

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Pricing", path: "/pricing" },
  { label: "Features", path: "/features" },
  
];

const SlideTabsExample = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      onMouseLeave={() => setPos(p => ({ ...p, opacity: 0 }))}
  className="
    relative flex items-center
    overflow-x-auto scrollbar-hide
    whitespace-nowrap
    rounded-full border border-black
    bg-white p-1
    max-w-full
    -ml-4
    
  "
    >
      {tabs.map(tab => (
        <Tab
          key={tab.label}
          label={tab.label}
          onClick={() => navigate(tab.path)}
          setPos={setPos}
        />
      ))}
      <Cursor pos={pos} />
    </ul>
  );
};

const Tab = ({ label, onClick, setPos }) => {
  const ref = useRef(null);

  const updateCursor = () => {
    const { width } = ref.current.getBoundingClientRect();
    setPos({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  return (
    <li
      ref={ref}
      onClick={() => {
        updateCursor();
        onClick();
      }}
      onMouseEnter={updateCursor}
      className="
        relative z-10 cursor-pointer
        px-4 md:px-20 py-2
        
        text-xs sm:text-sm md:text-base
        uppercase
        text-white mix-blend-difference
        transition-all duration-200
        flex-shrink-0
      "
    >
      {label}
    </li>
  );
};

const Cursor = ({ pos }) => (
  <motion.li
    animate={pos}
    className="absolute h-8 rounded-full bg-black w-40"
  />
);

export default SlideTabsExample;
