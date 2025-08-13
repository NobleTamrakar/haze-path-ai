export interface Topic {
  id: string;
  name: string;
  subject: 'Physics' | 'Chemistry' | 'Biology';
  difficulty: 'easy' | 'medium' | 'hard';
  units: string[];
  videoId: string;
}

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  targetExam: string;
  examDate: string;
  subjects: string[];
  syllabus: string[];
  learningStyle: 'video' | 'text' | 'mixed';
  dailyMinutes: number;
  peakTime: string;
  hasVR: boolean;
  targetScore: number;
  weakTopics: string[];
  confidence: Record<string, number>;
  vrEnabled: boolean;
  completedOnboarding: boolean;
}

export interface QuizSession {
  id: string;
  userId: string;
  topicId: string;
  questions: Question[];
  answers: number[];
  score: number;
  completedAt: string;
  mistakes: QuizMistake[];
}

export interface QuizMistake {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  concept: string;
}

export interface StudySession {
  id: string;
  userId: string;
  topicId: string;
  duration: number;
  type: 'video' | 'quiz' | 'flashcards';
  completedAt: string;
  xpEarned: number;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface GameStats {
  xp: number;
  streak: number;
  badges: string[];
  level: number;
  totalQuizzes: number;
  totalStudyTime: number;
  accuracy: number;
}