import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, OnboardingStep, GameStats } from '@/types';

interface UserState {
  user: User | null;
  onboardingStep: number;
  onboardingSteps: OnboardingStep[];
  gameStats: GameStats;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setOnboardingStep: (step: number) => void;
  completeOnboardingStep: (step: number) => void;
  updateGameStats: (stats: Partial<GameStats>) => void;
  addXP: (amount: number) => void;
  logout: () => void;
}

const initialOnboardingSteps: OnboardingStep[] = [
  { id: 1, title: "Welcome & Exam", description: "Basic info and target exam", completed: false },
  { id: 2, title: "Subjects & Syllabus", description: "Choose subjects and units", completed: false },
  { id: 3, title: "Baseline Quiz", description: "Quick assessment", completed: false },
  { id: 4, title: "Learning Style", description: "Preferences and constraints", completed: false },
  { id: 5, title: "Goals & Confidence", description: "Target score and weak areas", completed: false },
  { id: 6, title: "Schedule Generator", description: "Create study plan", completed: false },
  { id: 7, title: "Review & Confirm", description: "Final review", completed: false },
  { id: 8, title: "Finish", description: "Welcome to your journey!", completed: false }
];

const initialGameStats: GameStats = {
  xp: 0,
  streak: 0,
  badges: [],
  level: 1,
  totalQuizzes: 0,
  totalStudyTime: 0,
  accuracy: 0
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingStep: 1,
      onboardingSteps: initialOnboardingSteps,
      gameStats: initialGameStats,
      isAuthenticated: false,

      setUser: (user) => 
        set({ user, isAuthenticated: true }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      setOnboardingStep: (step) =>
        set({ onboardingStep: step }),

      completeOnboardingStep: (step) =>
        set((state) => ({
          onboardingSteps: state.onboardingSteps.map(s =>
            s.id === step ? { ...s, completed: true } : s
          )
        })),

      updateGameStats: (stats) =>
        set((state) => ({
          gameStats: { ...state.gameStats, ...stats }
        })),

      addXP: (amount) =>
        set((state) => {
          const newXP = state.gameStats.xp + amount;
          const newLevel = Math.floor(newXP / 1000) + 1;
          return {
            gameStats: {
              ...state.gameStats,
              xp: newXP,
              level: newLevel
            }
          };
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: 1,
          onboardingSteps: initialOnboardingSteps,
          gameStats: initialGameStats
        })
    }),
    {
      name: 'neet-tutor-user'
    }
  )
);