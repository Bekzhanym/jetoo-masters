export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  type?: 'SINGLE_ANSWER_OPTIONS' | 'TEXT_QUESTION';
  textContent?: string; // Для текстовых вопросов
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