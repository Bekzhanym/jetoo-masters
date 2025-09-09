import React, { useState } from 'react';
import UserForm from './UserForm';
import Logo from './Logo';
import './WelcomeScreen.css';

interface UserFormData {
  fullName: string;
  university: string;
  specialty: string;
  phoneNumber: string;
}

interface WelcomeScreenProps {
  onStart: (userData: UserFormData) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (userData: UserFormData) => {
    onStart(userData);
  };

  const handleStartClick = () => {
    setShowForm(true);
  };

  if (showForm) {
    return <UserForm onSubmit={handleFormSubmit} />;
  }

  return (
    <div className="welcome-screen">
      <Logo size="large" />
      <div className="welcome-container">
        <div className="welcome-content">
          <p className="welcome-subtitle">Магистратураға дайындық тесті</p>
          <p className="welcome-description">
            Тестті бастау үшін анкетаны толтырыңыз
          </p>
        </div>

        {/* Анимированная кнопка */}
        <div className="animated-button-container">
          <button 
            className="animated-button"
            onClick={handleStartClick}
          >
            <span className="button-text">Тестті</span>
            <span className="button-arrow">Бастау &gt;</span>
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