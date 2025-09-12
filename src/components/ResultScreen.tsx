import React, { useEffect, useState } from 'react';
import './ResultScreen.css';
import { sendTestResultToGoogleSheets } from '../utils/sheetsApi';

interface UserFormData {
  fullName: string;
  university: string;
  specialty: string;
  phoneNumber: string;
}

interface ResultScreenProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  userData?: UserFormData | null;
  sectionScores?: {
    critical: number;
    analytical: number;
    english: number;
  };
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  correctAnswers,
  totalQuestions,
  userData,
  sectionScores
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const [isSendingResults, setIsSendingResults] = useState(false);
  const [resultsSent, setResultsSent] = useState(false);

  // Отправка результатов в Google Sheets при загрузке компонента
  useEffect(() => {
    const sendResults = async () => {
      if (userData && sectionScores && !resultsSent) {
        setIsSendingResults(true);
        
        try {
          const testResultData = {
            name: userData.fullName,
            university: userData.university,
            specialty: userData.specialty,
            phone: userData.phoneNumber,
            score: score,
            correctAnswers: correctAnswers,
            criticalScore: sectionScores.critical,
            analyticalScore: sectionScores.analytical,
            englishScore: sectionScores.english
          };
          
          const success = await sendTestResultToGoogleSheets(testResultData);
          
          if (success) {
            setResultsSent(true);
          }
        } catch (error) {
          console.error('Ошибка при отправке результатов теста:', error);
        } finally {
          setIsSendingResults(false);
        }
      }
    };

    sendResults();
  }, [userData, sectionScores, score, correctAnswers, totalQuestions, percentage, resultsSent]);

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
          {isSendingResults && (
            <div className="sending-indicator">
              <span>Нәтижелер жіберілуде...</span>
            </div>
          )}
          {resultsSent && !isSendingResults && (
            <div className="sent-indicator">
              <span>✅ Нәтижелер сәтті жіберілді</span>
            </div>
          )}
          {userData && (
            <div className="user-info">
              <div className="user-info-item">
                <span className="user-info-label">Аты-жөні:</span>
                <span className="user-info-value">{userData.fullName}</span>
              </div>
              <div className="user-info-item">
                <span className="user-info-label">Университет:</span>
                <span className="user-info-value">{userData.university}</span>
              </div>
              <div className="user-info-item">
                <span className="user-info-label">Мамандық:</span>
                <span className="user-info-value">{userData.specialty}</span>
              </div>
            </div>
          )}
        </div>

        <div className="result-content">
          <div className="score-section">
            <div className="score-circle">
              {score}
            </div>
            <div className="score-info">
              <h2 className="level-title">Нәтиже</h2>
              <p className="level-description">Тест аяқталды</p>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-label">Дұрыс жауаптар</div>
              <div className="stat-value">{correctAnswers}</div>
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
                    <h4 className="section-name">Ағылшын</h4>
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

        </div>
      </div>
    </div>
  );
};

export default ResultScreen; 