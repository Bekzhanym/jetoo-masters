import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import type { UserInfo } from './data/questions';
import './App.css';

type Screen = 'welcome' | 'quiz' | 'result';

interface UserFormData {
  fullName: string;
  university: string;
  specialty: string;
  phoneNumber: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userFormData, setUserFormData] = useState<UserFormData | null>(null);
  const [userInfo] = useState<UserInfo>({
    goal: "ҰБТ-да таңдау пәнім",
    difficulty: "Грамматика үйрену керек",
    experience: "1 жылдан көп"
  });
  const [quizScore, setQuizScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [sectionScores, setSectionScores] = useState<{
    critical: number;
    analytical: number;
    english: number;
  }>({
    critical: 0,
    analytical: 0,
    english: 0
  });

  const handleWelcomeStart = (userData: UserFormData) => {
    setUserFormData(userData);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score: number, correct: number, sections?: { critical: number; analytical: number; english: number }) => {
    setQuizScore(score);
    setCorrectAnswers(correct);
    if (sections) {
      setSectionScores(sections);
    }
    setCurrentScreen('result'); // Сразу показываем результаты, минуя форму
  };


  return (
    <div className="App">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleWelcomeStart} />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizScreen 
          userInfo={userInfo} 
          onComplete={handleQuizComplete} 
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen
          score={quizScore}
          correctAnswers={correctAnswers}
          totalQuestions={80}
          userData={userFormData}
          sectionScores={sectionScores}
        />
      )}
      
    </div>
  );
}

export default App;
