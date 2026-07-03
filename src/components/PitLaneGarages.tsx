"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaLock, FaLockOpen, FaPlay } from "react-icons/fa";

const GARAGES = [
  { id: 1, type: "Memory 01", title: "OUR FIRST PRACTICAL", image: "/memory-riya-1.png" },
  { id: 2, type: "Memory 02", title: "Linkedin ke liye photo kichate huyee", image: "/memory-riya-2.png" },
  { id: 3, type: "Memory 03", title: "the best photo ever", image: "/memory-riya-3.jpg" },
];

export default function PitLaneGarages() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [openGarages, setOpenGarages] = useState<number[]>([]);

  const handleOpen = (id: number) => {
    if (!openGarages.includes(id)) {
      setOpenGarages((prev) => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-20 px-4 relative overflow-hidden">
      {/* Pit Lane Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-full h-1 bg-[var(--color-f1-red)] absolute top-40" />
        <div className="w-full h-1 bg-white absolute top-44" />
        <div className="w-full h-1 bg-[var(--color-f1-red)] absolute top-48" />
      </div>

      <div className="z-10 text-center mb-16">
        <h2 className="text-[var(--color-f1-red)] font-mono text-sm font-bold tracking-[0.3em] uppercase mb-2">
          Pit Lane Access
        </h2>
        <h1 className="text-4xl text-white font-sans font-bold uppercase tracking-wide">
          Memory Capsules
        </h1>
      </div>

      <div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {GARAGES.map((garage) => {
          const isOpen = openGarages.includes(garage.id);
          return (
            <div key={garage.id} className="relative h-[500px] bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden group">
              
              {/* The contents of the garage (Memory) */}
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-center">
                 <img src={garage.image} alt={garage.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                 
                 <div className="z-10 bg-black/60 p-4 rounded-lg backdrop-blur-md translate-y-32 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="text-[var(--color-f1-red)] text-sm font-mono font-bold uppercase mb-2">
                     {garage.type}
                   </div>
                   <h3 className="text-2xl font-bold font-sans text-white uppercase">
                     {garage.title}
                   </h3>
                 </div>
              </div>

              {/* The Garage Door */}
              <motion.div
                initial={false}
                animate={{ y: isOpen ? "-100%" : "0%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-carbon border-b-8 border-[var(--color-f1-red)] flex flex-col items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                onClick={() => handleOpen(garage.id)}
              >
                <div className="w-full px-8 opacity-30 flex flex-col gap-4 pointer-events-none">
                  {/* Corrugated door lines */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-full h-1 bg-black rounded-full" />
                  ))}
                </div>
                <div className="absolute flex flex-col items-center justify-center text-white">
                   <div className="text-5xl font-mono text-gray-500 mb-4 opacity-30">0{garage.id}</div>
                   {isOpen ? <FaLockOpen size={24} className="text-gray-500" /> : <FaLock size={24} className="text-[var(--color-f1-red)]" />}
                   <div className="mt-4 font-sans font-bold tracking-widest text-sm text-gray-400">
                     {isOpen ? "UNLOCKED" : "CLICK TO OPEN"}
                   </div>
                </div>
              </motion.div>

              {/* Smoke Effect Overlay on Open */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    animate={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-white pointer-events-none mix-blend-screen"
                  />
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* Button to proceed to next phase */}
      <AnimatePresence>
        {openGarages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-8 right-8 z-50"
          >
            <button
              onClick={() => setCurrentPhase(7)}
              className="flex items-center gap-3 bg-[var(--color-f1-red)] text-white px-6 py-3 font-sans font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(225,6,0,0.8)] rounded-full border-2 border-red-500"
            >
              Continue to Database <FaPlay />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
