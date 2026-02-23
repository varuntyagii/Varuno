import React, { useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";

const VideoHero1 = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const videoUrl = import.meta.env.VITE_VIDEO1_URL;

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div
      className="w-full aspect-video flex justify-center items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full max-h-[60vh]">
        <video
            ref={videoRef}
          src={videoUrl}  // ✅ Yahan use karo
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover rounded-xl shadow-lg mb-4"
        >
         
        </video>

        {/* Right Mute/Unmute */}
        {hovered && (
          <div className="absolute right-4 bottom-4 bg-black/50 px-3 py-1 rounded-lg text-white text-xl">
            <button onClick={toggleMute}>
              {isMuted ? <GoUnmute /> : <GoMute />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHero1;
