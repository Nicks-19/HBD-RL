"use client";

import { useStore } from "@/store/useStore";
import IntroScreen from "@/components/IntroScreen";
import PaddockAccess from "@/components/PaddockAccess";
import Countdown from "@/components/Countdown";
import PitLaneGarages from "@/components/PitLaneGarages";
import FileExplorer from "@/components/FileExplorer";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import CameraCake from "@/components/CameraCake";
import Letters from "@/components/Letters";
import GrandFinale from "@/components/GrandFinale";
import Constellation from "@/components/Constellation";
import FinalLap from "@/components/FinalLap";
import Ceremony from "@/components/Ceremony";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const currentPhase = useStore((state) => state.currentPhase);

  return (
    <main className="w-full min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {currentPhase === 0 && (
          <motion.div
            key="phase0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PaddockAccess />
          </motion.div>
        )}

        {currentPhase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <IntroScreen />
          </motion.div>
        )}
        
        {currentPhase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Countdown />
          </motion.div>
        )}



        {currentPhase === 5 && (
          <motion.div
            key="phase5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <PitLaneGarages />
          </motion.div>
        )}



        {currentPhase === 7 && (
          <motion.div
            key="phase7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <FileExplorer />
          </motion.div>
        )}

        {currentPhase === 8 && (
          <motion.div
            key="phase8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <SlidingPuzzle />
          </motion.div>
        )}

        {currentPhase === 9 && (
          <motion.div
            key="phase9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <CameraCake />
          </motion.div>
        )}

        {currentPhase === 11 && (
          <motion.div
            key="phase11"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Letters />
          </motion.div>
        )}

        {currentPhase === 12 && (
          <motion.div
            key="phase12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Constellation />
          </motion.div>
        )}

        {currentPhase === 13 && (
          <motion.div
            key="phase13"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <FinalLap />
          </motion.div>
        )}

        {currentPhase === 14 && (
          <motion.div
            key="phase14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Ceremony />
          </motion.div>
        )}

        {currentPhase === 15 && (
          <motion.div
            key="phase15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <GrandFinale />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


