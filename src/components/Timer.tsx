import React, { useState, useEffect } from 'react';
import './Timer.css';

interface TimerProps {
  duration: number; // в минутах
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // конвертируем в секунды
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  };

  const isWarning = timeLeft <= 10 * 60; // предупреждение за 10 минут
  const isCritical = timeLeft <= 5 * 60; // критическое время за 5 минут

  return (
    <div className={`timer-container ${isExpired ? 'expired' : ''} ${isCritical ? 'critical' : isWarning ? 'warning' : ''}`}>
      <div className="timer-header">
        <div className="timer-icon">⏰</div>
        <span className="timer-label">Қалған уақыт</span>
      </div>
      
      <div className="timer-display">
        <span className="timer-time">{formatTime(timeLeft)}</span>
      </div>
      
      <div className="timer-progress">
        <div 
          className="timer-progress-fill" 
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      {isExpired && (
        <div className="timer-expired">
          Уақыт аяқталды!
        </div>
      )}
    </div>
  );
};

export default Timer;
