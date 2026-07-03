"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaPlay } from "react-icons/fa";

export default function Ceremony() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center py-32 px-4 relative">
      {/* Soft Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,6,0,0.05)_0%,_transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-full max-w-4xl text-center z-10"
      >
        <h2 className="text-[var(--color-f1-red)] font-mono text-sm font-bold tracking-[0.4em] uppercase mb-8">
          The End of the Season
        </h2>
        
        {/* Polaroids / Montage Placeholders */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {[1, 2, 3].map((i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, rotate: i % 2 === 0 ? 5 : -5 }}
               animate={{ opacity: 1, rotate: i % 2 === 0 ? 5 : -5 }}
               transition={{ delay: i * 0.5 + 1, duration: 1 }}
               className="w-48 h-64 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
             >
               {/* To add your own photos, just replace the files memory-1.png, memory-2.png, and memory-3.png in the public folder! */}
               <div 
                 className="w-full h-40 bg-gray-200 mb-4 bg-cover bg-center border border-gray-200" 
                 style={{ backgroundImage: `url('/memory-${i}.png')` }}
               />
               <div className="font-sans font-bold text-black text-xs text-center uppercase mt-auto">Memory {i}</div>
             </motion.div>
          ))}
        </div>

        {/* Heartfelt Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
          className="prose prose-invert max-w-2xl mx-auto font-sans"
        >
          <p className="text-2xl leading-relaxed text-gray-300 mb-8">
            "Two years ago, I never imagined we'd create so many incredible memories together.
            Thank you for every laugh, every adventure, every conversation, and every moment."
          </p>
          
          <h1 className="text-4xl md:text-6xl text-white font-bold uppercase tracking-widest mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Happy Birthday ❤️
          </h1>

          <p className="text-[var(--color-f1-red)] font-mono tracking-[0.2em] uppercase text-sm mb-16">
            Here's to many more races together.
          </p>
        </motion.div>


      </motion.div>
    </div>
  );
}
