"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { playErrorTone, playSuccessTone, playEngineRev } from "@/utils/audio";

const ERROR_MESSAGES = [
  "ACCESS DENIED. ARE YOU SURE YOU'RE THE CHAMPION?",
  "INCORRECT. TRY AGAIN, ROOKIE.",
  "ENTER YOUR NAME IN CAPS",
  "NEGATIVE. PIT WALL SAYS NO.",
  "IS THAT A TRACTOR ENGINE PASSWORD?",
];

export default function PaddockAccess() {
  const [password, setPassword] = useState("");
  const [errorIndex, setErrorIndex] = useState(-1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === "RIYA") {
      setIsUnlocked(true);
      playSuccessTone();
      playEngineRev();
      // Play opening animation delay before moving to next phase
      setTimeout(() => {
        setCurrentPhase(2);
      }, 2500);
    } else {
      setPassword("");
      setErrorIndex(Math.floor(Math.random() * ERROR_MESSAGES.length));
      playErrorTone();
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center font-mono">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-f1-red)]/10 via-black to-black opacity-50" />

      {/* Garage Doors (Open on unlock) */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none flex"
        initial={{ gap: 0 }}
        animate={{ gap: isUnlocked ? "100%" : "0%" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        <div className="w-1/2 h-full bg-carbon border-r border-[var(--color-f1-grey)] shadow-[10px_0_30px_rgba(0,0,0,0.8)] flex items-center justify-end overflow-hidden">
          <div className="h-full w-2 bg-[var(--color-f1-red)]/20" />
        </div>
        <div className="w-1/2 h-full bg-carbon border-l border-[var(--color-f1-grey)] shadow-[-10px_0_30px_rgba(0,0,0,0.8)] flex items-center justify-start overflow-hidden">
          <div className="h-full w-2 bg-[var(--color-f1-red)]/20" />
        </div>
      </motion.div>

      {/* Terminal UI */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="z-20 w-full max-w-md p-8 backdrop-blur-md bg-black/40 border border-[var(--color-f1-grey)] rounded-lg shadow-2xl"
          >
            <div className="text-[var(--color-f1-red)] text-sm mb-4 tracking-widest font-bold">
              [ SYSTEM LOG // RESTRICTED ACCESS ]
            </div>
            
            <h1 className="text-3xl text-white font-sans font-bold uppercase tracking-wide mb-2">
              Welcome Driver.
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Only the Champion may enter. Please provide the secret access code to open the paddock.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER CODE..."
                className="bg-transparent border-b-2 border-gray-600 focus:border-[var(--color-f1-red)] text-white text-xl py-2 outline-none transition-colors uppercase tracking-widest"
                autoFocus
              />
              
              <div className="h-6">
                {errorIndex !== -1 && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={errorIndex} // Re-animate on new error
                    className="text-[var(--color-f1-red)] text-xs font-bold"
                  >
                    <span className={errorIndex === 2 ? "inline-block rotate-180" : ""}>
                      {ERROR_MESSAGES[errorIndex]}
                    </span>
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 bg-[var(--color-f1-red)] text-white font-sans font-bold py-3 uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Unlock
              </button>
            </form>

            {/* Upside down hint note */}
            <div className="absolute -bottom-10 -right-4 rotate-[175deg] font-sans text-[10px] tracking-widest text-white/30 bg-white/5 border border-dashed border-white/20 px-3 py-1 rounded-sm select-none pointer-events-none">
              WRITE YOUR NAME IN CAPS
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock visual effects */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0 bg-white"
            transition={{ duration: 0.1, delay: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
