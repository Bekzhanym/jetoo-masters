import React, { useState, useEffect } from 'react';
import jetooLogoDesktop from '../assets/jetoo-desktop.jpg';
import jetooLogoMobile from '../assets/jetoo-mobile.jpg';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем при загрузке
    checkIsMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkIsMobile);

    // Очищаем слушатель при размонтировании
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className={`logo-container ${size} ${className}`}>
      <img 
        src={isMobile ? jetooLogoMobile : jetooLogoDesktop} 
        alt="JETOO ENGLISH" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo; 