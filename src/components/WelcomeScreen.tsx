import React from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">JETOO ENGLISH</h1>
          <p className="welcome-subtitle">Тест на знание английского языка</p>
          <p className="welcome-description">
            Проверьте свой уровень английского языка с помощью нашего интерактивного теста
          </p>
        </div>
        
        {/* Анимированная кнопка */}
        <div className="animated-button-container">
          <button 
            className="animated-button"
            onClick={onStart}
          >
            <span className="button-text">START</span>
            <span className="button-arrow">GO &gt;</span>
            <div className="pulse-ring"></div>
            <div className="pulse-ring pulse-ring-2"></div>
            <div className="pulse-ring pulse-ring-3"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 