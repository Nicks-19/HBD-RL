"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const WISDOM_SLIDES = [
  {
    id: 1,
    signature: "The Solulu",
    content: (
      <div className="flex flex-col items-center text-center space-y-2 font-sans">
        <div className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
          <p>Being delulu</p>
          <p>Is the only solulu</p>
          <p>And to make</p>
          <p>Your dreams</p>
          <p>Come trululu</p>
        </div>
        <div className="text-yellow-400 font-bold text-lg md:text-xl">
          <p>Stop caring about</p>
          <p>Chaar log kya bolulu</p>
        </div>
      </div>
    ),
  },
  // You can easily add more slides here in the future!
];

export default function Ceremony() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === WISDOM_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? WISDOM_SLIDES.length - 1 : prev - 1));
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center py-20 px-4 relative">
      {/* Soft Ambient Background matching the theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,6,0,0.05)_0%,_transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-3xl flex flex-col items-center z-10"
      >
        <h1 className="text-4xl md:text-5xl text-white font-serif mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          MERE ANMOL SHABD
        </h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#cda9ff] to-transparent mb-12" />
        
        {/* The Card */}
        <div className="w-full bg-[#0d0d16] border border-gray-800 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(205,169,255,0.05)] relative min-h-[400px] flex flex-col">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col"
            >
              {/* Signature Header */}
              <div className="flex items-center gap-3 mb-10">
                <span className="text-4xl italic text-[#5ce1e6]" style={{ fontFamily: "cursive" }}>J</span>
                <span className="text-[#cda9ff] text-xl font-sans tracking-wide">
                  {WISDOM_SLIDES[currentSlide].signature}
                </span>
              </div>

              {/* Slide Content */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {WISDOM_SLIDES[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6 mt-10">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <FaChevronLeft className="text-sm -ml-1" />
          </button>
          
          <div className="flex items-center gap-2">
            {WISDOM_SLIDES.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-[#cda9ff] shadow-[0_0_8px_#cda9ff]' : 'bg-gray-700'}`}
              />
            ))}
            {/* Hardcoded extra dots just to match the visual of the screenshot if there's only 1 slide */}
            {WISDOM_SLIDES.length === 1 && (
              <>
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-2 h-2 rounded-full bg-gray-700" />
              </>
            )}
          </div>

          <button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <FaChevronRight className="text-sm -mr-1" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
