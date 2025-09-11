import React, { useState } from 'react';
import { getFormattedQuestions } from '../data/questions';
import type { UserInfo } from '../data/questions';
import Logo from './Logo';
import AudioPlayer from './AudioPlayer';
import Timer from './Timer';
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
  const [showNextButton, setShowNextButton] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowNextButton(true);
  };


  const handleTimeUp = () => {
    // Время истекло - автоматически завершаем тест
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }
    
    // Подсчитываем правильные ответы
    const correctAnswers = finalAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswerIndex
    ).length;
    
    // Подсчитываем общий балл
    let totalScore = 0;
    const finalSectionScores = {
      critical: 0,
      analytical: 0,
      english: 0
    };
    
    finalAnswers.forEach((answer, index) => {
      const question = questions[index];
      if (answer === question.correctAnswerIndex) {
        totalScore += question.points;
        
        // Обновляем счетчики секций
        const questionId = question.id;
        let section = '';
        if (questionId >= 1 && questionId <= 15) {
          section = 'critical';
        } else if (questionId >= 16 && questionId <= 30) {
          section = 'analytical';
        } else if (questionId >= 31 && questionId <= 80) {
          section = 'english';
        }
        
        if (section && section in finalSectionScores) {
          finalSectionScores[section as keyof typeof finalSectionScores]++;
        }
      }
    });
    
    // Передаем результаты
    onComplete(totalScore, correctAnswers, finalSectionScores);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        // Переходим к следующему вопросу
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowNextButton(false);
      } else {
        // Тест завершен - подсчитываем все результаты
        const finalAnswers = [...newAnswers];
        finalAnswers[currentQuestion] = selectedAnswer;
        
        // Подсчитываем правильные ответы
        const correctAnswers = finalAnswers.filter((answer, index) => 
          answer === questions[index].correctAnswerIndex
        ).length;
        
        // Подсчитываем общий балл
        let totalScore = 0;
        const finalSectionScores = {
          critical: 0,
          analytical: 0,
          english: 0
        };
        
        finalAnswers.forEach((answer, index) => {
          const question = questions[index];
          if (answer === question.correctAnswerIndex) {
            totalScore += question.points;
            
            // Обновляем счетчики секций
            const questionId = question.id;
            let section = '';
            if (questionId >= 1 && questionId <= 15) {
              section = 'critical';
            } else if (questionId >= 16 && questionId <= 30) {
              section = 'analytical';
            } else if (questionId >= 31 && questionId <= 80) {
              section = 'english';
            }
            
            if (section && section in finalSectionScores) {
              finalSectionScores[section as keyof typeof finalSectionScores]++;
            }
          }
        });
        
        // Передаем результаты
        onComplete(totalScore, correctAnswers, finalSectionScores);
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
      <Timer duration={110} onTimeUp={handleTimeUp} />
      <Logo size="large" />
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
            
            {currentQ.type === 'TEXT_QUESTION' && currentQ.textContent && (
              <div className="text-content">
                <div className="text-content-body">
                  {currentQ.textContent.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
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
              
              return (
                <div
                  key={index}
                  className={`answer-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="answer-radio">
                    <div className={`radio-circle ${isSelected ? 'selected' : ''}`}></div>
                  </div>
                  <span className="answer-text">{option}</span>
                </div>
              );
            })}
          </div>
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