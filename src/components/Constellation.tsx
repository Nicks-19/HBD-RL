"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

// Approximated star coordinates to spell "CHAMPION"
const CHAMPION_PATHS = [
  // C
  "M 150 100 Q 100 100 100 150 Q 100 200 150 200",
  // H
  "M 180 100 L 180 200 M 180 150 L 220 150 M 220 100 L 220 200",
  // A
  "M 250 200 L 270 100 L 290 200 M 260 160 L 280 160",
  // M
  "M 320 200 L 320 100 L 340 150 L 360 100 L 360 200",
  // P
  "M 390 200 L 390 100 Q 430 100 430 130 Q 430 160 390 160",
  // I
  "M 450 100 L 470 100 M 460 100 L 460 200 M 450 200 L 470 200",
  // O
  "M 520 150 Q 520 100 500 100 Q 480 100 480 150 Q 480 200 500 200 Q 520 200 520 150",
  // N
  "M 550 200 L 550 100 L 590 200 L 590 100"
];

export default function Constellation() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Wait for the SVG path animation, then show the text, then transition
    const timer1 = setTimeout(() => setShowText(true), 6000);
    const timer2 = setTimeout(() => setCurrentPhase(13), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [setCurrentPhase]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

      {/* SVG Constellation */}
      <div className="relative w-full max-w-4xl aspect-[2/1] flex items-center justify-center">
        <svg 
          viewBox="50 50 600 200" 
          className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        >
          {CHAMPION_PATHS.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
          
          {/* Add a few glowing "stars" at the vertices. For simplicity, just adding random dots */}
          {Array.from({ length: 20 }).map((_, i) => (
             <motion.circle
               key={`star-${i}`}
               cx={100 + Math.random() * 500}
               cy={100 + Math.random() * 100}
               r={Math.random() * 2 + 1}
               fill="#ffffff"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0.5, 1] }}
               transition={{ duration: 2, delay: 2 + Math.random() * 3, repeat: Infinity, repeatType: "mirror" }}
             />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
        transition={{ duration: 2 }}
        className="absolute bottom-32 text-center"
      >
        <h1 className="text-4xl md:text-6xl text-white font-sans font-bold uppercase tracking-[0.3em] mb-4 drop-shadow-[0_0_20px_rgba(225,6,0,0.8)]">
          Happy Birthday
        </h1>
        <p className="text-[var(--color-f1-red)] font-mono tracking-widest text-sm">
          RIYAAAAAAAAAAAAAAAAAAAAAAAA
        </p>
      </motion.div>
    </div>
  );
}
