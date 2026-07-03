"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import confetti from "canvas-confetti";

export default function FinalLap() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [stage, setStage] = useState<"racing" | "finish">("racing");

  useEffect(() => {
    // Stage 1: Racing -> Cross Finish Line
    const timer1 = setTimeout(() => {
      setStage("finish");
      
      // Fire massive confetti
      const duration = 5 * 1000;
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
          colors: ['#e10600', '#ffffff', '#c0c0c0', '#ffd700']
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#e10600', '#ffffff', '#c0c0c0', '#ffd700']
        });
      }, 250);

    }, 3000);

    // Stage 2: Finish Line -> Next Phase (skip podium)
    const timer2 = setTimeout(() => setCurrentPhase(14), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [setCurrentPhase]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      
      <AnimatePresence>
        {stage === "racing" && (
          <motion.div
            key="racing"
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Speed Lines */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-[spin_3s_linear_infinite]" />
            <h1 className="text-[var(--color-f1-red)] text-5xl md:text-8xl font-sans font-bold uppercase tracking-widest animate-pulse italic skew-x-[-15deg]">
              FINAL LAP
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "finish" && (
          <motion.div
            key="finish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            {/* Checkered Flag Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-conic-gradient(#fff_0_90deg,#000_0_180deg)] bg-[length:100px_100px] animate-[pulse_2s_infinite]" />
            
            {/* The Car zooming past */}
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: "100vw" }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="absolute top-1/2 w-64 h-16 bg-[var(--color-f1-red)] rounded-full blur-[2px]"
            />

            <h1 className="text-white text-4xl md:text-7xl font-sans font-bold uppercase tracking-widest z-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              CHAMPION OF THE WORLD!
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
