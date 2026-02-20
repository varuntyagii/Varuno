import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ShapeOverlay() {
  const overlayRef = useRef(null);
  const pathsRef = useRef([]);

  // ===== YOUR VARIABLES =====
  const numPoints = 10;
  const delayPointsMax = 0.3;
  const delayPerPath = 0.25;
  const duration = 0.9;
  const numPaths = 3;

  let isOpened = false;
  let pointsDelay = [];
  let allPoints = [];

  // ===== RENDER FUNCTION (MUST BE BEFORE TIMELINE) =====
function render() {
  if (!pathsRef.current) return;

  for (let i = 0; i < numPaths; i++) {
    const path = pathsRef.current[i];
    if (!path) continue; // 🔥 THIS LINE PREVENTS THE CRASH

    const points = allPoints[i];
    if (!points) continue;

    let d = "";
    d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;

    for (let j = 0; j < numPoints - 1; j++) {
      const p = ((j + 1) / (numPoints - 1)) * 100;
      const cp = p - (100 / (numPoints - 1)) / 2;
      d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
    }

    d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
    path.setAttribute("d", d);
  }
}


useEffect(() => {
  const overlay = overlayRef.current;

  for (let i = 0; i < numPaths; i++) {
    let points = [];
    allPoints.push(points);
    for (let j = 0; j < numPoints; j++) points.push(100);
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut", duration },
    onUpdate: render,
    onComplete: () => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    },
  });

  function toggle() {
    tl.clear().progress(0);

    for (let i = 0; i < numPoints; i++) {
      pointsDelay[i] = Math.random() * delayPointsMax;
    }

    for (let i = 0; i < numPaths; i++) {
      const points = allPoints[i];
      const pathDelay = delayPerPath * (isOpened ? i : numPaths - i - 1);

      for (let j = 0; j < numPoints; j++) {
        tl.to(points, { [j]: 0 }, pointsDelay[j] + pathDelay);
      }
    }
  }

  toggle(); // 👈 auto-play

}, []);


  return (
    <svg
      ref={overlayRef}
      className="shape-overlays"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00c99b" />
          <stop offset="100%" stopColor="#ff0ea1" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd392" />
          <stop offset="100%" stopColor="#ff3898" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#110046" />
          <stop offset="100%" stopColor="#32004a" />
        </linearGradient>
      </defs>

      {[0, 1, 2].map((i) => (
        <path
          key={i}
          ref={(el) => (pathsRef.current[i] = el)}
          className="shape-overlays__path"
          fill={`url(#gradient${i + 1})`}
        />
      ))}
    </svg>
  );
}
