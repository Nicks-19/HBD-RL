import { useStore } from "@/store/useStore";

let audioCtx: AudioContext | null = null;

function ctx() {
  if (typeof window === "undefined") return null; // SSR safety
  if (!audioCtx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function beep(freq: number, dur: number, type: OscillatorType = "sine", vol: number = 0.12, delay: number = 0) {
  if (useStore.getState().isMuted) return;
  const c = ctx();
  if (!c) return;

  if (c.state === "suspended") {
    c.resume().catch(() => {});
  }

  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  
  osc.connect(gain).connect(c.destination);
  osc.start(t0); 
  osc.stop(t0 + dur + 0.05);
}

export function playTypingTick() {
  beep(1800 + Math.random() * 400, 0.02, "square", 0.02);
}

export function playErrorTone() {
  beep(160, 0.18, "sawtooth", 0.1);
  beep(110, 0.22, "sawtooth", 0.09, 0.08);
}

export function playSuccessTone() {
  beep(660, 0.12, "triangle", 0.12);
  beep(880, 0.15, "triangle", 0.12, 0.1);
  beep(1320, 0.2, "triangle", 0.12, 0.2);
}

export function playEngineRev() {
  if (useStore.getState().isMuted) return;
  const c = ctx();
  if (!c) return;
  
  if (c.state === "suspended") {
    c.resume().catch(() => {});
  }

  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(60, t0);
  osc.frequency.exponentialRampToValueAtTime(220, t0 + 1.1);
  osc.frequency.exponentialRampToValueAtTime(90, t0 + 1.6);
  
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.7);
  
  osc.connect(gain).connect(c.destination);
  osc.start(t0); 
  osc.stop(t0 + 1.8);
}

export function playLightBeep() {
  beep(520, 0.09, "sine", 0.14);
}

export function playLightsOutTone() {
  beep(180, 0.5, "sawtooth", 0.16);
  beep(90, 0.6, "sawtooth", 0.14, 0.05);
}
