import React, { useState } from 'react';
import { getFormattedQuestions } from '../data/questions';
import type { UserInfo } from '../data/questions';
import Logo from './Logo';
import AudioPlayer from './AudioPlayer';
import './QuizScreen.css';

interface QuizScreenProps {
  userInfo: UserInfo;
  onComplete: (score: number, correctAnswers: number, sectionScores?: { critical: number; analytical: number; english: number }) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const questions = getFormattedQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sectionScores, setSectionScores] = useState({
    critical: 0,
    analytical: 0,
    english: 0
  });

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Предотвращаем повторный выбор после показа результата
    
    setSelectedAnswer(answerIndex);
    setShowNextButton(true);
    
    // Сразу показываем результат
    const currentQ = questions[currentQuestion];
    const correct = answerIndex === currentQ.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Обновляем счетчики секций
    const questionId = currentQ.id;
    let section = '';
    if (questionId >= 1 && questionId <= 15) {
      section = 'critical';
    } else if (questionId >= 16 && questionId <= 30) {
      section = 'analytical';
    } else if (questionId >= 31 && questionId <= 80) {
      section = 'english';
    }
    
    if (correct && section && section in sectionScores) {
      setSectionScores(prev => ({
        ...prev,
        [section]: prev[section as keyof typeof prev] + 1
      }));
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      // Обновляем общий счет
      const currentQ = questions[currentQuestion];
      if (selectedAnswer === currentQ.correctAnswerIndex) {
        setScore(score + currentQ.points);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowNextButton(false);
        setShowFeedback(false);
        setIsCorrect(false);
      } else {
        // Тест завершен - передаем результаты по секциям
        const correctAnswers = newAnswers.filter((answer, index) => 
          answer === questions[index].correctAnswerIndex
        ).length;
        
        // Передаем результаты по секциям
        onComplete(score + (selectedAnswer === currentQ.correctAnswerIndex ? currentQ.points : 0), correctAnswers, sectionScores);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowNextButton(answers[currentQuestion - 1] !== null);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-screen">
      <Logo size="medium" />
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-info">
              Сұрақ {currentQuestion + 1} / {questions.length}
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <div className="question-section">
            <h2 className="question-text">{currentQ.question}</h2>
            <p className="question-hint">Бір жауапты таңдаңыз</p>
            
            {currentQ.hasImage && currentQ.imageUrl && (
              <div className="question-image">
                <img 
                  src={currentQ.imageUrl} 
                  alt={`Изображение для вопроса ${currentQ.id}`}
                  className="question-image-content"
                />
              </div>
            )}
            
            {currentQ.hasAudio && currentQ.audioUrl && (
              <AudioPlayer
                audioUrl={currentQ.audioUrl}
                title={currentQ.audioTitle}
                duration={currentQ.audioDuration}
              />
            )}
          </div>

          <div className="answers-section">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correctAnswerIndex;
              const isWrongAnswer = isSelected && !isCorrectAnswer && showFeedback;
              
              return (
                <div
                  key={index}
                  className={`answer-option ${isSelected ? 'selected' : ''} ${
                    showFeedback ? (isCorrectAnswer ? 'correct' : isWrongAnswer ? 'wrong' : '') : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="answer-radio">
                    <div className={`radio-circle ${isSelected ? 'selected' : ''}`}></div>
                    {showFeedback && isCorrectAnswer && (
                      <div className="correct-icon">✓</div>
                    )}
                    {showFeedback && isWrongAnswer && (
                      <div className="wrong-icon">✗</div>
                    )}
                  </div>
                  <span className="answer-text">{option}</span>
                </div>
              );
            })}
          </div>
          
          {showFeedback && (
            <div className={`feedback-message ${isCorrect ? 'correct' : 'wrong'}`}>
              <div className="feedback-icon">
                {isCorrect ? '✓' : '✗'}
              </div>
              <div className="feedback-text">
                {isCorrect ? 'Дұрыс жауап!' : 'Қате жауап!'}
              </div>
              <div className="feedback-score">
                Балл: {isCorrect ? '1' : '0'} / 1
              </div>
            </div>
          )}
        </div>

        <div className="quiz-footer">
          <button 
            className="prev-button" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Алдыңғы
          </button>
          <button 
            className="next-button" 
            onClick={handleNext}
            disabled={!showNextButton}
          >
            {currentQuestion === questions.length - 1 ? 'Аяқтау' : 'Келесі'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen; 