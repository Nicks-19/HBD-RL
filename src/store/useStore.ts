import { create } from 'zustand';

interface AppState {
  currentPhase: number;
  unlockedPhases: number[];
  isMuted: boolean;
  hasStarted: boolean;
  setCurrentPhase: (phase: number) => void;
  unlockPhase: (phase: number) => void;
  toggleMute: () => void;
  startExperience: () => void;
}

export const useStore = create<AppState>()((set) => ({
  currentPhase: 0,
  unlockedPhases: [0],
  isMuted: false,
  hasStarted: false,
  setCurrentPhase: (phase) => set({ currentPhase: phase }),
  unlockPhase: (phase) =>
    set((state) => ({
      unlockedPhases: state.unlockedPhases.includes(phase)
        ? state.unlockedPhases
        : [...state.unlockedPhases, phase],
    })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  startExperience: () => set({ hasStarted: true }),
}));
