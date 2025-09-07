import React from 'react';
import { getLevel, getLevelDescription } from '../data/questions';
import './ResultScreen.css';

interface ResultScreenProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  sectionScores?: {
    critical: number;
    analytical: number;
    english: number;
  };
  onGetBonus: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  sectionScores,
  onGetBonus
}) => {
  const level = getLevel(score);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const levelDescription = getLevelDescription(level);

  // Функция для получения уровня по секциям
  const getSectionLevel = (sectionScore: number, totalQuestions: number): string => {
    const percentage = (sectionScore / totalQuestions) * 100;
    if (percentage >= 80) return "Жоғары";
    if (percentage >= 60) return "Орташа";
    if (percentage >= 40) return "Төмен";
    return "Әлсіз";
  };

  // Функция для получения цвета уровня
  const getSectionColor = (sectionScore: number, totalQuestions: number): string => {
    const percentage = (sectionScore / totalQuestions) * 100;
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    if (percentage >= 40) return "#FF5722";
    return "#f44336";
  };

  return (
    <div className="result-screen">
      <div className="result-container">
        <div className="result-header">
          <h1 className="result-title">Нәтижеңіз</h1>
        </div>

        <div className="result-content">
          <div className="score-section">
            <div className="score-circle">
              {score}
            </div>
            <div className="score-info">
              <h2 className="level-title">{level}</h2>
              <p className="level-description">{levelDescription}</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-label">Дұрыс жауаптар</div>
              <div className="stat-value">{correctAnswers}/{totalQuestions}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Пайыз</div>
              <div className="stat-value">{percentage}%</div>
            </div>
          </div>

          {sectionScores && (
            <div className="sections-results">
              <h3 className="sections-title">Секциялар бойынша нәтижелер</h3>
              <div className="sections-grid">
                <div className="section-card">
                  <div className="section-header">
                    <h4 className="section-name">Критикалық ойлау</h4>
                    <span className="section-range">1-15 сұрақ</span>
                  </div>
                  <div className="section-score">
                    <div className="section-number">{sectionScores.critical}/15</div>
                    <div 
                      className="section-level"
                      style={{ color: getSectionColor(sectionScores.critical, 15) }}
                    >
                      {getSectionLevel(sectionScores.critical, 15)}
                    </div>
                  </div>
                  <div className="section-progress">
                    <div 
                      className="section-progress-fill"
                      style={{ 
                        width: `${(sectionScores.critical / 15) * 100}%`,
                        backgroundColor: getSectionColor(sectionScores.critical, 15)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-header">
                    <h4 className="section-name">Аналитикалық ойлау</h4>
                    <span className="section-range">16-30 сұрақ</span>
                  </div>
                  <div className="section-score">
                    <div className="section-number">{sectionScores.analytical}/15</div>
                    <div 
                      className="section-level"
                      style={{ color: getSectionColor(sectionScores.analytical, 15) }}
                    >
                      {getSectionLevel(sectionScores.analytical, 15)}
                    </div>
                  </div>
                  <div className="section-progress">
                    <div 
                      className="section-progress-fill"
                      style={{ 
                        width: `${(sectionScores.analytical / 15) * 100}%`,
                        backgroundColor: getSectionColor(sectionScores.analytical, 15)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-header">
                    <h4 className="section-name">Ағылшын тілі</h4>
                    <span className="section-range">31-80 сұрақ</span>
                  </div>
                  <div className="section-score">
                    <div className="section-number">{sectionScores.english}/50</div>
                    <div 
                      className="section-level"
                      style={{ color: getSectionColor(sectionScores.english, 50) }}
                    >
                      {getSectionLevel(sectionScores.english, 50)}
                    </div>
                  </div>
                  <div className="section-progress">
                    <div 
                      className="section-progress-fill"
                      style={{ 
                        width: `${(sectionScores.english / 50) * 100}%`,
                        backgroundColor: getSectionColor(sectionScores.english, 50)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bonus-section">
            <p className="bonus-description">
            Деңгейіңе сай арнайы видеосабақты тегін ал!
            </p>
            <button className="bonus-button" onClick={onGetBonus}>
              <span className="bonus-icon">🎁</span>
              Бонусты алу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen; 