"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { playSuccessTone, playEngineRev } from "@/utils/audio";
import confetti from "canvas-confetti";

export default function CameraCake() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micActive, setMicActive] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [celebrationStarted, setCelebrationStarted] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const reqRef = useRef<number>(0);
  const blowDurationRef = useRef(0);

  // Initialize Camera and Mic
  useEffect(() => {
    async function setupMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        setMicActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup Audio Analyser
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 512;
        sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStream);
        sourceRef.current.connect(analyserRef.current);

        // Start checking volume
        checkVolume();
      } catch (err) {
        console.error("Failed to access camera/mic:", err);
        setPermissionError(true);
      }
    }
    setupMedia();

    return () => {
      // Cleanup
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (audioContextRef.current?.state !== "closed") audioContextRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkVolume = () => {
    if (!analyserRef.current || candleBlown) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const average = sum / bufferLength;

    // Threshold for blowing (adjust if too sensitive/insensitive)
    if (average > 50) { 
      blowDurationRef.current += 1;
      // If loud noise sustained for a bit (approx 0.5s)
      if (blowDurationRef.current > 15 && !candleBlown) {
        handleBlowOut();
      }
    } else {
      // Decay if not blowing
      blowDurationRef.current = Math.max(0, blowDurationRef.current - 2);
    }

    reqRef.current = requestAnimationFrame(checkVolume);
  };

  const handleBlowOut = () => {
    setCandleBlown(true);
    playSuccessTone();

    // Trigger celebration after 1 second
    setTimeout(() => {
      setCelebrationStarted(true);
      playEngineRev();
      
      // Fire Massive Confetti
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e10600', '#ffffff', '#ffd700']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e10600', '#ffffff', '#ffd700']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // Move to next phase after celebration
      setTimeout(() => {
        setCurrentPhase(11);
      }, 6000);
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* Fallback error if no permissions */}
      {permissionError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black text-white p-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-f1-red)] mb-4">ACCESS DENIED</h2>
          <p className="mb-4">Please allow Camera and Microphone permissions to blow out the candles!</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[var(--color-f1-red)] font-bold tracking-widest uppercase"
          >
            Retry Permissions
          </button>
          
          {/* Fallback manual button just in case */}
          <button 
            onClick={handleBlowOut}
            className="mt-8 px-6 py-2 border border-gray-600 text-gray-500 hover:text-white"
          >
            Or skip (Simulate Blow)
          </button>
        </div>
      )}

      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-black">
         <video 
           ref={videoRef} 
           autoPlay 
           playsInline 
           muted 
           className="w-full h-full object-cover opacity-30 transform -scale-x-100" // scale-x-100 for mirror effect
         />
         {/* Vignette & Cinematic Overlay */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      <div className="z-10 text-center mb-8">
        <h1 className="text-4xl md:text-6xl text-white font-sans font-bold uppercase tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]">
          {candleBlown ? "HAPPY BIRTHDAY!" : "MAKE A WISH"}
        </h1>
        <p className="text-[var(--color-f1-red)] font-mono tracking-widest text-sm uppercase">
          {candleBlown ? "CHAMPIONSHIP SECURED" : (micActive ? "Blow into the microphone to extinguish!" : "Connecting sensors...")}
        </p>
      </div>

      {/* The Cake & Candle */}
      <div className="z-10 relative mt-10">
        <div 
          className="w-64 h-64 md:w-96 md:h-96 bg-contain bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/f1_cake.png')" }}
        >
          {/* Flame */}
          <AnimatePresence>
            {!candleBlown && (
              <motion.div 
                exit={{ opacity: 0, scale: 0, y: -20, filter: "blur(10px)" }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center"
              >
                {/* Glow */}
                <div className="absolute w-20 h-20 bg-yellow-500/30 rounded-full blur-xl animate-pulse" />
                {/* CSS Flame */}
                <div className="w-4 h-10 bg-yellow-400 rounded-full shadow-[0_0_20px_#fbbf24] animate-[flicker_0.2s_infinite]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke effect after blowing */}
          {candleBlown && !celebrationStarted && (
             <motion.div 
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 0.5, y: -50, filter: "blur(10px)" }}
                transition={{ duration: 1 }}
                className="absolute top-[5%] left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full"
             />
          )}
        </div>
      </div>

      {/* 3D Champagne Celebration */}
      <AnimatePresence>
        {celebrationStarted && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="absolute bottom-10 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="text-[150px] md:text-[200px] drop-shadow-[0_0_50px_rgba(255,215,0,0.8)] origin-bottom animate-bounce">
              🍾
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
