import { useState, useEffect } from "react";
import Gsap from "./gsap";
import ShapeOverlay from "./ShapeOverlay";

const PageIntro = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const overlayTimer = setTimeout(() => {
      setShowOverlay(true);
    }, 5000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 6000);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {!showOverlay && <Gsap />}
      {showOverlay && <ShapeOverlay />}

      {showContent && children}
    </div>
  );
};

export default PageIntro;
