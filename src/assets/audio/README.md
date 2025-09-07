# Аудио файлы для вопросов

Эта папка содержит аудио файлы для вопросов викторины.

## Как добавить аудио файлы:

1. **Поместите аудио файлы** в эту папку (`src/assets/audio/`)
2. **Обновите файл** `src/data/audio.ts`:
   - Добавьте новый объект в `audioMap` с ID вопроса
   - Укажите правильный путь к файлу
   - Установите длительность в секундах
   - Добавьте заголовок

## Пример добавления аудио:

```typescript
// В файле src/data/audio.ts
export const getQuestionAudio = (questionId: number): AudioData | null => {
  const audioMap: Record<number, AudioData> = {
    // Существующие аудио...
    
    // Новое аудио для вопроса 5
    5: {
      audioUrl: '/src/assets/audio/question-5.mp3',
      duration: 30, // 30 секунд
      title: 'Аудио для вопроса 5'
    }
  };
  
  return audioMap[questionId] || null;
};
```

## Поддерживаемые форматы:
- MP3 (рекомендуется)
- WAV
- OGG
- M4A

## Рекомендации:
- Используйте короткие аудио файлы (до 2 минут)
- Оптимизируйте качество для веб-воспроизведения
- Используйте понятные имена файлов (например: `question-1.mp3`, `dialogue-office-tour.mp3`)

## Структура файлов:
```
src/assets/audio/
├── README.md
├── question-1.mp3
├── question-2.mp3
├── dialogue-office-tour.mp3
└── ...
```
