import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import VideoScreen from './components/VideoScreen';
import type { UserInfo } from './data/questions';
import { getLevel } from './data/questions';
import './App.css';

type Screen = 'welcome' | 'quiz' | 'result' | 'video';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userInfo] = useState<UserInfo>({
    goal: "ҰБТ-да таңдау пәнім",
    difficulty: "Грамматика үйрену керек",
    experience: "1 жылдан көп"
  });
  const [quizScore, setQuizScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [sectionScores, setSectionScores] = useState<{
    critical: number;
    analytical: number;
    english: number;
  }>({
    critical: 0,
    analytical: 0,
    english: 0
  });

  const handleWelcomeStart = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score: number, correct: number, sections?: { critical: number; analytical: number; english: number }) => {
    setQuizScore(score);
    setCorrectAnswers(correct);
    if (sections) {
      setSectionScores(sections);
    }
    const level = getLevel(score);
    setCurrentLevel(level);
    setCurrentScreen('result'); // Сразу показываем результаты, минуя форму
  };

  const handleGetBonus = () => {
    setCurrentScreen('video');
  };

  const handleBackFromVideo = () => {
    setCurrentScreen('result');
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
          sectionScores={sectionScores}
          onGetBonus={handleGetBonus}
        />
      )}
      
      {currentScreen === 'video' && (
        <VideoScreen
          level={currentLevel}
          onBack={handleBackFromVideo}
        />
      )}
    </div>
  );
}

export default App;
