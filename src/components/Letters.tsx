"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaEnvelope } from "react-icons/fa";
import { playTypingTick } from "@/utils/audio";

const LETTER_CONTENT = `To the most beautiful ,chaotic and pagal soul I have ever met 
I am writing this to wish you happy bday obviously but also to tell you that you are really special buss thoda laziness kum ho jaye toh sone pe suhaga ho jaye .
May this year brings you prosperity abundance and many more happy moments you have never imagined.May all your wishes come true .May you get hell rich .May we travel world together and stay friends till eternity
 All I want to say is that I am always there for you , in your lows in your highs.
SO happy bday again .........haan kuch log hote hai joh dopeher ke 12 baje wish karte hein but mein tereko raat ke bara baje wish karungi 

lots of love 
HAPPY BDAY RIYA LADDDDDDDDDDDDDDDD
HAPPY BDAY LADLE`;

export default function Letters() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showText) {
      const totalTime = LETTER_CONTENT.length * 30; // 30ms per character
      let elapsed = 0;
      interval = setInterval(() => {
        playTypingTick();
        elapsed += 100;
        if (elapsed >= totalTime) {
          clearInterval(interval);
        }
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showText]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowText(true);
    }, 1500); // Wait for unfold animation
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,6,0,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="z-10 text-center mb-12">
        <h1 className="text-3xl text-white font-sans font-bold uppercase tracking-[0.2em] mb-2">
          Classified Documents
        </h1>
        <p className="text-gray-400 font-mono text-sm">
          LETTERS I NEVER SENT
        </p>
      </div>

      <div className="z-20 relative w-full max-w-2xl h-[600px] flex items-center justify-center">
        
        {/* The Envelope */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="cursor-pointer group flex flex-col items-center"
              onClick={handleOpen}
            >
              <div className="relative w-80 h-48 bg-gray-900 border-2 border-gray-700 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden transition-colors group-hover:border-[var(--color-f1-red)]">
                {/* Envelope Flap styling */}
                <div className="absolute top-0 w-full h-full border-t-[96px] border-l-[160px] border-r-[160px] border-t-gray-800 border-l-transparent border-r-transparent opacity-80" />
                
                {/* Wax Seal */}
                <div className="absolute w-12 h-12 bg-[var(--color-f1-red)] rounded-full shadow-lg flex items-center justify-center border-2 border-red-900 z-10 group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-red-900 text-xl" />
                </div>
              </div>
              <p className="mt-8 text-[var(--color-f1-red)] font-mono text-sm tracking-widest uppercase animate-pulse">
                Click to break seal
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Unfolded Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full h-full max-w-xl bg-[#f4f1ea] rounded-sm p-8 md:p-12 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-gray-900 font-sans overflow-y-scroll overflow-x-hidden flex flex-col letter-scroll"
              style={{ transformOrigin: "bottom center" }}
            >
               {/* Premium Letterhead */}
               <div className="border-b-2 border-[var(--color-f1-red)] pb-4 mb-8 flex justify-between items-end">
                 <div>
                   <div className="text-[var(--color-f1-red)] font-mono text-xs font-bold">CONFIDENTIAL</div>
                 </div>
                 <div className="font-mono text-xs text-gray-500 text-right">
                   DATE: {new Date().toLocaleDateString()}
                 </div>
               </div>

               {/* Typewriter Text */}
               <div className="flex-1 text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                 {showText && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 2 }}
                   >
                     {LETTER_CONTENT.split("").map((char, index) => (
                       <motion.span
                         key={index}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.05, delay: index * 0.03 }}
                       >
                         {char}
                       </motion.span>
                     ))}
                   </motion.div>
                 )}
               </div>

               {/* Button to proceed */}
               {showText && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 6 }}
                   className="mt-8 flex justify-center"
                 >
                   <button
                     onClick={() => setCurrentPhase(12)}
                     className="bg-black text-white px-8 py-3 font-sans font-bold uppercase tracking-widest hover:bg-[var(--color-f1-red)] transition-colors text-sm"
                   >
                     Look to the Stars
                   </button>
                 </motion.div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
