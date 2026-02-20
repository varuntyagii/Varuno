// // // import "../App.css";
// // // import { useLayoutEffect, useRef } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // // gsap.registerPlugin(ScrollTrigger);

// // // export default function StackCards() {
// // //   const wrapperRef = useRef(null);

// // //   useLayoutEffect(() => {
// // //     const panels = gsap.utils.toArray(".panel");

// // //     panels.forEach((panel) => {
// // //       ScrollTrigger.create({
// // //         trigger: panel,
// // //         start: "top top",
// // //         end: "bottom top",   // pin duration = until the panel scrolls out
// // //         pin: true,           // pin this panel while in viewport
// // //         pinSpacing: false,   // remove extra spacing
// // //       });
// // //     });
// // //   }, []);

// // //   return (
// // //     <div ref={wrapperRef} className="wrapper">
// // //       <section className="panel first">First</section>
// // //       <section className="panel second">Second</section>
// // //       <section className="panel third">Third</section>
// // //       <section className="panel fourth">Fourth</section>
// // //       <section className="panel fifth">Fifth</section>
// // //     </div>
// // //   );
// // // }


// import "../App.css";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import f01 from '../assets/f01.jpg'
// import f1 from '../assets/f1.jpg'
// import f2 from '../assets/f2.jpg'
// import f3 from '../assets/f3.jpg'
// import f4 from '../assets/f4.jpg'
// import Lenis from '@studio-freight/lenis';
// import {project} from './data'
// gsap.registerPlugin(ScrollTrigger);

// export default function StackCards() {
//   const wrapperRef = useRef(null);

//     useLayoutEffect(() => {
//       const panels = gsap.utils.toArray(".panel");

//       panels.forEach((panel) => {
//         // Entry animation: card scales up and fades in, moving slightly up into position
//         gsap.from(panel, {
//           y: 80,          // Reduced vertical movement
//           scale: 0.9,     // Start slightly smaller
//           opacity: 0.5,
//           duration: 0.5,
//           ease: "power1.out",
//           scrollTrigger: {
//             trigger: panel,
//             start: "top 70%", // Start when entering viewport
//             end: "top 10%",   // Settle just before it sticks (sticky top is 10vh)
//             scrub: true,
//             toggleActions: "play none none reverse",
//             // markers: true // uncomment to debug triggers
//           },
//         }); 

//         // Removed the Pinning ScrollTrigger. CSS `position: sticky` handles the stopping at center.
//       });
// //lense for smooth scrolling 
 
//     }, []);
    
// //   useLayoutEffect(() => {
// //     const panels = gsap.utils.toArray(".panel");

// //     panels.forEach((panel, i) => {
// //       const pinOffset = 10 + i * 5; // 10%, 15%, 20%...

// //       // Ensure correct z-index layering so next card is always on top
// //       panel.style.zIndex = i;

// //       // Animate panel slide up (SOLID, no opacity fade)
// //       gsap.from(panel, {
// //         y: 80,
// //         // REMOVED opacity: 0 to specificially fix "one on top of another" ghosting issue
// //         duration: 0.5,
// //         ease: "power2.out",
// //         scrollTrigger: {
// //           trigger: panel,
// //           start: "top 80%",
// //           end: "top " + pinOffset + "%", // Sync with dynamic pin position
// //           scrub: true,
// //         },
// //       });

// //       // Pin panel to viewport center with offset
// //       ScrollTrigger.create({
// //         trigger: panel,
// //         start: "top " + pinOffset + "%",
// //         // Pin for a duration based on how many cards are left to scroll over this one
// //         end: () => "+=" + ((panels.length - i) * window.innerHeight),
// //         pin: true,
// //         pinSpacing: false,
// //       });
// //     });
// //   }, []);

//   return (
//     <div ref={wrapperRef} className="wrapper">
//   {project.map((item) => (
//     <section
//       key={item.id}
//       className="panel"
//       style={{ background: item.gradient }}
//     >
//       <div className="panel-content">
//         {/* TEXT */}
//         <div className="text">
//           <h2 style={{ color: item.accentColor }}>
//             {item.title}
//           </h2>
//           <p>{item.description}</p>
//           <a href={item.link} className="link">
//             See more →
//           </a>
//         </div>

//         {/* IMAGE */}
//         <div className="image">
//           <img src={item.img} alt={item.title} />
//         </div>
//       </div>
//     </section>
//   ))}
// </div>

//   );
// }

import "../App.css";
import { useRef } from "react";
import { project } from './data';

export default function StackCards() {
  const wrapperRef = useRef(null);

  return (
    <div ref={wrapperRef} className="wrapper">
      {project.map((item) => (
        <section
          key={item.id}
          className="panel"
          style={{ background: item.gradient }}
        >
          <div className="panel-content">
            {/* TEXT */}
            <div className="text">
              <h2 style={{ color: item.accentColor }}>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} className="link">
                See more →
              </a>
            </div>

            {/* IMAGE */}
            <div className="image">
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

