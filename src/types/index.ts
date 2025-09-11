export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  hasAudio?: boolean;
  audioUrl?: string;
  audioDuration?: number;
  audioTitle?: string;
  hasImage?: boolean;
  imageUrl?: string;
  hasText?: boolean;
  textContent?: string;
  questionType?: 'SINGLE_ANSWER_OPTIONS' | 'FILL_BLANK' | 'TEXT_BASED' | 'COMPLETE_PHRASE' | 'FIND_SYNONYM' | 'TEXT_ANALYSIS';
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