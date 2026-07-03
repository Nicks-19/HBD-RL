"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

export default function IntroScreen() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 pointer-events-none" />
      
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[var(--color-f1-red)] rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center max-w-2xl px-6"
      >
        <div className="text-[#84e0e5] font-mono tracking-[0.3em] text-xs font-bold mb-8 uppercase">
          13 June 2006 • 13 June 2026
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-sans font-light tracking-wide mb-2">
          Happy 20th Birthday,
        </h1>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold italic mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400" style={{ fontFamily: "'Playfair Display', serif" }}>
          RIYAAAA
        </h2>

        <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-md mx-auto mb-16">
          A celebration of twenty years of art, imagination, and the magic you bring to the world.
        </p>

        <motion.button
          onClick={() => setCurrentPhase(1)}
          className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase group-hover:text-white transition-colors">
            Start Engine to Explore
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.button>
      </motion.div>

      {/* Audio Player Widget */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 bg-gray-900/80 backdrop-blur-md px-4 py-3 rounded-full border border-gray-700 shadow-xl">
        <audio 
          ref={audioRef}
          src="/hbd-piano.mp3" 
          loop 
        />
        <div className="flex flex-col items-start mr-2">
          <div className="text-white text-xs font-bold font-sans">Happy Birthday</div>
          <div className="text-gray-400 text-[10px] font-sans">Piano Instrumental</div>
        </div>
        <button 
          onClick={toggleAudio}
          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          {isPlaying ? <FaPause className="text-white text-[10px]" /> : <FaPlay className="text-white text-[10px] ml-1" />}
        </button>
        <div className="w-16 h-1 bg-gray-800 rounded-full flex items-center relative">
           <div className="w-1/2 h-full bg-[#cda9ff] rounded-full" />
           <div className="absolute left-1/2 w-3 h-3 bg-[#cda9ff] rounded-full shadow-[0_0_10px_#cda9ff]" />
        </div>
      </div>
    </div>
  );
}
