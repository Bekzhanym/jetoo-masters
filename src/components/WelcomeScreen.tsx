import React from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">

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