interface TestResult {
  name: string;
  whatsapp: string;
  age: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  level: string;
  percentage: number;
  timestamp: string;
}

interface FormData {
  name: string;
  university: string;
  specialty: string;
  phone: string;
}

interface TestResultData {
  name: string;
  university: string;
  specialty: string;
  phone: string;
  score: number;
  correctAnswers: number;
  criticalScore: number;
  analyticalScore: number;
  englishScore: number;
}

// URL вашего развернутого Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzARZbSb5hj5TDGgYmUel1fZfAsEeBn1VjqeOwPAL8gSlORVuS6AfV45pDe_L6zp3tQ9g/exec';
const FORM_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzARZbSb5hj5TDGgYmUel1fZfAsEeBn1VjqeOwPAL8gSlORVuS6AfV45pDe_L6zp3tQ9g/exec';

export const sendToGoogleSheets = async (data: TestResult): Promise<boolean> => {
  try {
    const params = new URLSearchParams({
      name: data.name,
      whatsapp: data.whatsapp,
      age: data.age,
      level: data.level,
      score: data.score.toString(),
      correctAnswers: data.correctAnswers.toString(),
      totalQuestions: data.totalQuestions.toString(),
      timestamp: data.timestamp
    });
    
    const url = `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        return result.success === true;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (corsError) {
      // Если CORS не работает, используем no-cors
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      return true; // Предполагаем успех в no-cors режиме
    }
    
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    return false;
  }
};

export const sendFormToGoogleSheets = async (data: FormData): Promise<boolean> => {
  try {
    const params = new URLSearchParams({
      name: data.name,
      university: data.university,
      specialty: data.specialty,
      phone: data.phone
    });
    
    const url = `${FORM_SCRIPT_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });

      if (response.ok) {
        const result = await response.json();
        return result.success === true;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (corsError) {
      // Если CORS не работает, используем no-cors
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      return true; // Предполагаем успех в no-cors режиме
    }
    
  } catch (error) {
    console.error('Ошибка при отправке данных формы:', error);
    return false;
  }
};

export const sendTestResultToGoogleSheets = async (data: TestResultData): Promise<boolean> => {
  try {
    const params = new URLSearchParams({
      name: data.name,
      university: data.university,
      specialty: data.specialty,
      phone: data.phone,
      score: data.score.toString(),
      correctAnswers: data.correctAnswers.toString(),
      criticalScore: data.criticalScore.toString(),
      analyticalScore: data.analyticalScore.toString(),
      englishScore: data.englishScore.toString()
    });
    
    const url = `${FORM_SCRIPT_URL}?${params.toString()}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.success === true;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (corsError) {
      // Если CORS не работает, используем no-cors
      await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      return true; // Предполагаем успех в no-cors режиме
    }
    
  } catch (error) {
    console.error('Ошибка при отправке результатов теста:', error);
    return false;
  }
};

export const prepareTestData = (
  formData: { name: string; whatsapp: string; age: string },
  score: number,
  correctAnswers: number,
  totalQuestions: number,
  level: string
): TestResult => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return {
    name: formData.name,
    whatsapp: formData.whatsapp,
    age: formData.age,
    score,
    correctAnswers,
    totalQuestions,
    level,
    percentage,
    timestamp: new Date().toISOString(),
  };
}; 