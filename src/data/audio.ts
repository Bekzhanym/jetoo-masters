// Аудио данные для вопросов
// Добавьте сюда аудио файлы в папку src/assets/audio/

export interface AudioData {
  audioUrl: string;
  duration: number;
  title: string;
}

// Функция для получения аудио данных по ID вопроса
export const getQuestionAudio = (questionId: number): AudioData | null => {
  const audioMap: Record<number, AudioData> = {
    // Примеры аудио файлов - замените на ваши реальные файлы
    1: {
      audioUrl: '/src/assets/audio/question-1.mp3',
      duration: 45, // секунды
      title: 'Аудио для вопроса 1'
    },
    2: {
      audioUrl: '/src/assets/audio/question-2.mp3',
      duration: 38,
      title: 'Аудио для вопроса 2'
    },
    3: {
      audioUrl: '/src/assets/audio/question-3.mp3',
      duration: 52,
      title: 'Аудио для вопроса 3'
    },
    // Добавьте больше аудио файлов по мере необходимости
    31: {
      audioUrl: '/src/assets/audio/question-31.mp3',
      duration: 28,
      title: 'Английский вопрос 31'
    },
    32: {
      audioUrl: '/src/assets/audio/question-32.mp3',
      duration: 35,
      title: 'Английский вопрос 32'
    },
    33: {
      audioUrl: '/src/assets/audio/question-33.mp3',
      duration: 42,
      title: 'Английский вопрос 33'
    },
    // Примеры для вопросов с аудио диалогами
    65: {
      audioUrl: '/src/assets/audio/office-tour.mp3',
      duration: 88, // 1:28
      title: 'Office Tour Dialogue'
    },
    73: {
      audioUrl: '/src/assets/audio/reschedule-meeting.mp3',
      duration: 95, // 1:35
      title: 'Reschedule Meeting Dialogue'
    },
    79: {
      audioUrl: '/src/assets/audio/meeting-notification.mp3',
      duration: 88, // 1:28
      title: 'Meeting Notification'
    }
  };

  return audioMap[questionId] || null;
};

// Функция для получения всех вопросов с аудио
export const getQuestionsWithAudio = (): number[] => {
  return Object.keys(getQuestionAudio).map(Number);
};
