"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import confetti from "canvas-confetti";
import { FaHeart } from "react-icons/fa";

export default function GrandFinale() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);

  useEffect(() => {
    // Fire continuous confetti for the grand finale
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#cda9ff', '#ffffff', '#ffd700', '#ffb6c1']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#cda9ff', '#ffffff', '#ffd700', '#ffb6c1']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(205,169,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Stars/Sparkles */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-[spin_100s_linear_infinite] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <FaHeart className="text-[#cda9ff] text-5xl mb-8 animate-pulse shadow-[0_0_20px_#cda9ff] rounded-full" />
        
        <h1 className="text-5xl md:text-7xl text-white font-serif font-bold mb-6 tracking-wide drop-shadow-[0_0_30px_rgba(205,169,255,0.8)]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Happy 20th Birthday
        </h1>
        <h2 className="text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffdf00] to-[#ffd700] font-sans font-bold uppercase tracking-[0.2em] mb-12 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
          RIYA
        </h2>

        <p className="text-gray-300 text-xl md:text-2xl max-w-2xl font-sans leading-relaxed tracking-wide mb-16">
          May your journey ahead be filled with as much beauty, joy, and success as you bring to everyone around you. Keep shining like the absolute star you are!
        </p>

        <button 
          onClick={() => setCurrentPhase(0)}
          className="px-8 py-4 bg-transparent border border-[#cda9ff] text-[#cda9ff] rounded-full uppercase tracking-widest font-sans font-bold hover:bg-[#cda9ff] hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(205,169,255,0.4)]"
        >
          Relive the Magic
        </button>
      </motion.div>
    </div>
  );
}
