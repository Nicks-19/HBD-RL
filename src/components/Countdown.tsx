"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { playLightBeep, playLightsOutTone, playEngineRev } from "@/utils/audio";

export default function Countdown() {
  const [count, setCount] = useState(5);
  const [lightsOut, setLightsOut] = useState(false);
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);

  useEffect(() => {
    // When count decrements to 4, 3, 2, 1, 0, a new light comes on. (Initial count is 5)
    if (count < 5 && count >= 0 && !lightsOut) {
      playLightBeep();
    }

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !lightsOut) {
      // 0 means all red lights are on
      const timer = setTimeout(() => {
        setLightsOut(true);
        playLightsOutTone();
        playEngineRev();
      }, 1500 + Math.random() * 1000); // Random delay before lights out (like real F1)
      return () => clearTimeout(timer);
    } else if (lightsOut) {
      // Transition to next phase after lights out (Skipping 3 and 4)
      const timer = setTimeout(() => setCurrentPhase(5), 2000);
      return () => clearTimeout(timer);
    }
  }, [count, lightsOut, setCurrentPhase]);

  // F1 start lights logic: 5 columns. They light up one by one as count goes down from 5 to 1.
  // When count == 5, 1 light is on.
  // When count == 4, 2 lights are on.
  // When count == 1, 5 lights are on.
  // When count == 0, 5 lights are on (waiting).
  // When lightsOut is true, 0 lights are on.
  const activeLightsCount = lightsOut ? 0 : 5 - count + 1;
  if (activeLightsCount > 5 && count !== 0) {
    // Initial state before countdown starts
  }

  const renderLightColumns = () => {
    return Array.from({ length: 5 }).map((_, colIndex) => {
      const isColActive = colIndex < (count === 0 ? 5 : 5 - count);
      return (
        <div key={colIndex} className="flex flex-col gap-4 p-4 bg-[var(--color-f1-carbon)] border-4 border-gray-800 rounded-xl shadow-2xl">
          {/* Top light */}
          <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-700 overflow-hidden relative">
             {isColActive && !lightsOut && (
                <div className="absolute inset-0 bg-[var(--color-f1-red)] shadow-[0_0_20px_#e10600] animate-pulse" />
             )}
          </div>
          {/* Bottom light */}
          <div className="w-16 h-16 rounded-full bg-gray-900 border-4 border-gray-700 overflow-hidden relative">
             {isColActive && !lightsOut && (
                <div className="absolute inset-0 bg-[var(--color-f1-red)] shadow-[0_0_20px_#e10600] animate-pulse" />
             )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Speed Lines (active on lights out) */}
      <AnimatePresence>
        {lightsOut && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#000_100%)] z-10" />
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[spin_10s_linear_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 text-center mb-16 text-gray-500 font-sans tracking-[0.5em] text-sm font-bold uppercase">
        {lightsOut ? "IT'S LIGHTS OUT AND AWAY WE GO!" : "RACE START SEQUENCE INITIATED"}
      </div>

      <div className="z-10 flex gap-4 md:gap-8">
        {renderLightColumns()}
      </div>

      {/* Screen shake effect on lights out */}
      <AnimatePresence>
        {lightsOut && (
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: [0, -10, 10, -10, 10, 0],
              y: [0, 10, -10, 10, -10, 0] 
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-[-1] bg-[var(--color-f1-red)]/10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
