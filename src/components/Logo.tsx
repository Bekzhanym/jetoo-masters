import React from 'react';
import jetooLogo from '../assets/jetoo.png';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`logo-container ${size} ${className}`}>
      <img 
        src={jetooLogo} 
        alt="JETOO ENGLISH" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo; 