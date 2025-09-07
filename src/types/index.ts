export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface UserInfo {
  goal: string;
  difficulty: string;
  experience: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  level: string;
  userInfo: UserInfo;
}

export type Screen = 'start' | 'quiz' | 'result'; 