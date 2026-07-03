"use client";

import { useStore } from "@/store/useStore";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function MuteButton() {
  const isMuted = useStore((state) => state.isMuted);
  const toggleMute = useStore((state) => state.toggleMute);

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
      title={isMuted ? "Unmute" : "Mute"}
      className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/5 border border-white/15 text-[var(--color-f1-silver)] flex items-center justify-center cursor-pointer text-lg transition-all duration-250 backdrop-blur-md hover:border-[var(--color-f1-red)] hover:text-white"
    >
      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
}
