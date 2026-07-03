"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useStore } from "@/store/useStore";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function EasterEggs() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      setInputSequence((prev) => {
        const newSequence = [...prev, key];
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if Konami code matched
        if (newSequence.join(",") === KONAMI_CODE.join(",")) {
          triggerEasterEgg();
          return []; // Reset after trigger
        }
        
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    // Fire special confetti
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.1 },
      colors: ['#ff00ff', '#00ffff', '#ffff00']
    });

    setShowToast(true);
    
    // Auto hide toast after 5s
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          className="fixed bottom-8 left-1/2 z-[100] bg-black border-2 border-[#ff00ff] p-4 shadow-[0_0_20px_rgba(255,0,255,0.5)] flex items-center gap-4"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-[#ff00ff] text-black font-bold font-mono">
             !
          </div>
          <div>
            <h4 className="text-white font-sans font-bold uppercase text-sm">Cheat Code Activated</h4>
            <p className="text-gray-400 font-mono text-xs">DEVELOPER MODE UNLOCKED // GOD SPEED</p>
          </div>
          <button 
            onClick={() => {
              setShowToast(false);
              setCurrentPhase(14); // Jump to end for dev testing
            }}
            className="ml-4 bg-white text-black px-4 py-2 font-bold text-xs uppercase hover:bg-gray-200"
          >
            Jump to End
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
