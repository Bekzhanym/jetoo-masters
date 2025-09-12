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

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjerJdD9pdvv2r2rP9ranXeKctdpop0yUc17iB5Up69wxsYgZLI4ytrK1qUOKEBXL-/exec';
// Замените на URL вашего развернутого Google Apps Script для формы
const FORM_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDp6nujT5_4b2nJDOVPyCHBh4AXZliJglvSZTBOfxp4HHdutG5XtWbbWyVG8KV63k2Lw/exec';

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