import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentPhase: 1,
      unlockedPhases: [1],
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
    }),
    {
      name: 'f1-birthday-storage',
    }
  )
);
