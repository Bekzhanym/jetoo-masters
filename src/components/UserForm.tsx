import React, { useState } from 'react';
import './UserForm.css';

interface UserFormData {
  fullName: string;
  university: string;
  specialty: string;
  phoneNumber: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
}

const universities = [
  'Әл-Фараби атындағы Қазақ ұлттық университеті (ҚазҰУ) – Алматы',
  'Л.Н. Гумилев атындағы Еуразия ұлттық университеті (ЕҰУ) – Астана',
  'Абай атындағы Қазақ ұлттық педагогикалық университеті – Алматы',
  'Сәтбаев университеті (ҚазҰТЗУ) – Алматы',
  'Қазақ ұлттық өнер университеті – Астана',
  'М. Әуезов атындағы Оңтүстік Қазақстан университеті – Шымкент',
  'Қазақ ұлттық аграрлық зерттеу университеті (ҚазҰАЗУ) – Алматы',
  'Қ. Жұбанов атындағы Ақтөбе өңірлік университеті – Ақтөбе',
  'Қарағанды техникалық университеті (КарТУ) – Қарағанды',
  'Көкшетау университеті (Ш.Уәлиханов атындағы) – Көкшетау'
];

const specialties = [
  { code: 'M001', name: 'Педагогика және психология' },
  { code: 'M002', name: 'Мектепке дейінгі оқыту және тәрбиелеу' },
  { code: 'M003', name: 'Пәндік мамандандырылмаған педагогтерді даярлау' },
  { code: 'M004', name: 'Бастапқы әскери дайындық педагогтерін даярлау' },
  { code: 'M005', name: 'Дене шынықтыру педагогтерін даярлау' },
  { code: 'M006', name: 'Музыка педагогтерін даярлау' },
  { code: 'M007', name: 'Көркем еңбек, графика және жобалау педагогтерін даярлау' },
  { code: 'M010', name: 'Математика педагогтерін даярлау' },
  { code: 'M011', name: 'Физика педагогтерін даярлау (қазақ, орыс, ағылшын тілі)' },
  { code: 'M012', name: 'Информатика педагогтерін даярлау (қазақ, орыс, ағылшын тілі)' },
  { code: 'M013', name: 'Химия педагогтерін даярлау (қазақ, орыс, ағылшын тілі)' },
  { code: 'M014', name: 'Биология педагогтерін даярлау (қазақ, орыс, ағылшын тілі)' },
  { code: 'M015', name: 'География педагогтерін даярлау' },
  { code: 'M016', name: 'Тарих педагогтерін даярлау' },
  { code: 'M017', name: 'Қазақ тілі мен әдебиеті педагогтерін даярлау' },
  { code: 'M018', name: 'Орыс тілі мен әдебиетінің педагогтерін даярлау' },
  { code: 'M019', name: 'Шет тілі педагогтерін даярлау' },
  { code: 'M020', name: 'Әлеуметтік педагогика бойынша кадрларды даярлау' },
  { code: 'M021', name: 'Арнайы педагогика' },
  { code: 'M028', name: 'Режиссура' },
  { code: 'M032', name: 'Аудиовизуалды құрылғылар және медиа өндіріс' },
  { code: 'M035', name: 'Сән, дизайн' },
  { code: 'M036', name: 'Полиграфия' },
  { code: 'M050', name: 'Философия және әдеп' },
  { code: 'M051', name: 'Дінтану және теология' },
  { code: 'M052', name: 'Исламтану' },
  { code: 'M053', name: 'Тарих' },
  { code: 'M153', name: 'Археология және этнология' },
  { code: 'M054', name: 'Түркітану' },
  { code: 'M055', name: 'Шығыстану' },
  { code: 'M056', name: 'Аударма ісі, ілеспе аударма' },
  { code: 'M057', name: 'Лингвистика' },
  { code: 'M058', name: 'Әдебиет' },
  { code: 'M059', name: 'Шетел филологиясы' },
  { code: 'M060', name: 'Филология' },
  { code: 'M061', name: 'Әлеуметтану' },
  { code: 'M062', name: 'Мәдениеттану' },
  { code: 'M063', name: 'Саясаттану және конфликтология' },
  { code: 'M064', name: 'Халықаралық қатынастар' },
  { code: 'M065', name: 'Аймақтану' },
  { code: 'M066', name: 'Психология' },
  { code: 'M067', name: 'Журналистика және репортер ісі' },
  { code: 'M068', name: 'Қоғаммен байланыс' },
  { code: 'M069', name: 'Кітапхана ісі, ақпаратты өңдеу және архив ісі' },
  { code: 'M070', name: 'Экономика' },
  { code: 'M071', name: 'Мемлекеттік және жергілікті басқару' },
  { code: 'M072', name: 'Менеджмент' },
  { code: 'M073', name: 'Аудит және салық салу' },
  { code: 'M173', name: 'Мемлекеттік аудит' },
  { code: 'M074', name: 'Қаржы, банктік және сақтандыру ісі' },
  { code: 'M075', name: 'Маркетинг және жарнама' },
  { code: 'M076', name: 'Еңбек дағдылары' },
  { code: 'M077', name: 'Бағалау' },
  { code: 'M078', name: 'Құқық' },
  { code: 'M079', name: 'Сот сараптамасы' },
  { code: 'M080', name: 'Биология' },
  { code: 'M081', name: 'Генетика' },
  { code: 'M082', name: 'Биотехнология' },
  { code: 'M083', name: 'Геоботаника' },
  { code: 'M084', name: 'География' },
  { code: 'M085', name: 'Гидрология' },
  { code: 'M086', name: 'Метеорология' },
  { code: 'M087', name: 'Қоршаған ортаны қорғау технологиясы' },
  { code: 'M088', name: 'Гидрогеология және инженерлік геология' },
  { code: 'M089', name: 'Химия' },
  { code: 'M090', name: 'Физика' },
  { code: 'M091', name: 'Сейсмология' },
  { code: 'M092', name: 'Математика және статистика' },
  { code: 'M093', name: 'Механика' },
  { code: 'M094', name: 'Ақпараттық технологиялар' },
  { code: 'M096', name: 'Коммуникация және коммуникациялық технологиялар' },
  { code: 'M095', name: 'Ақпараттық қауіпсіздік' },
  { code: 'M195', name: 'Криптология' },
  { code: 'M097', name: 'Химиялық инженерия және процесстер' },
  { code: 'M098', name: 'Жылу энергетикасы' },
  { code: 'M099', name: 'Энергетика және электр техникасы' },
  { code: 'M100', name: 'Автоматтандыру және басқару' },
  { code: 'M101', name: 'Материалтану және жаңа материалдар технологиясы' },
  { code: 'M102', name: 'Роботты техника және мехатроника' },
  { code: 'M103', name: 'Механика және металл өңдеу' },
  { code: 'M104', name: 'Көлік, көліктік техника және технология' },
  { code: 'M105', name: 'Авиациалық техника және технологиялар' },
  { code: 'M106', name: 'Ұшатын аппараттар мен қозғалтқыштарды ұшуда пайдалану' },
  { code: 'M107', name: 'Ғарыштық инженерия' },
  { code: 'M108', name: 'Наноматериалдар және нанотехнологиялар (қолдану саласы бойынша)' },
  { code: 'M109', name: 'Мұнай және кен геофизикасы' },
  { code: 'M110', name: 'Теңіз техникасы және технологиялары' },
  { code: 'M210', name: 'Магистральды желілер және инфрақұрылым' },
  { code: 'M310', name: 'Көлік құрылыстары' },
  { code: 'M111', name: 'Тамақ өнімдерін өндіру' },
  { code: 'M112', name: 'Ағаш өңдеу және ағаштан жасалған бұйымдар технологиясы (қолдану саласы бойынша)' },
  { code: 'M113', name: 'Материалдарды қысыммен өңдеу технологиясы' },
  { code: 'M114', name: 'Тоқыма: киім, аяқ-киім және былғары бұйымдар' },
  { code: 'M115', name: 'Мұнай инженериясы' },
  { code: 'M116', name: 'Тау-кен инженериясы' },
  { code: 'M117', name: 'Металлургиялық инженерия' },
  { code: 'M118', name: 'Пайдалы қазбалар байыту' },
  { code: 'M119', name: 'Фармацевтикалық өндіріс технологиясы' },
  { code: 'M120', name: 'Маркшейдерлік іс' },
  { code: 'M121', name: 'Геология' },
  { code: 'M122', name: 'Сәулет' },
  { code: 'M123', name: 'Геодезия' },
  { code: 'M124', name: 'Құрылыс' },
  { code: 'M125', name: 'Құрылыс материалдарын бұйымдары мен конструкцияларын өндіру' },
  { code: 'M126', name: 'Көлік құрылысы' },
  { code: 'M127', name: 'Инженерлік жүйелер мен желілер' },
  { code: 'M128', name: 'Жерге орналастыру' },
  { code: 'M129', name: 'Гидротехникалық құрылыс' },
  { code: 'M229', name: 'Гидромелиорация' },
  { code: 'M329', name: 'Сумен қамтамасыз ету және суды бұру' },
  { code: 'M429', name: 'Гидротехникалық құрылыс және су ресурстарын басқару' },
  { code: 'M130', name: 'Стандарттау, сертификаттау және метрология (сала бойынша)' },
  { code: 'M131', name: 'Өсімдік шаруашылығы' },
  { code: 'M132', name: 'Мал шаруашылығы' },
  { code: 'M133', name: 'Орман шаруашылығы' },
  { code: 'M134', name: 'Балық шаруашылығы' },
  { code: 'M137', name: 'Су ресурстары және суды пайдалану' },
  { code: 'M135', name: 'Ауыл шаруашылығын энергиямен қамтамасыз ету' },
  { code: 'M136', name: 'Аграрлық техника және технологиясы' },
  { code: 'M138', name: 'Ветеринария' },
  { code: 'M139', name: 'Денсаулық сақтаудағы менеджмент' },
  { code: 'M140', name: 'Қоғамдық денсаулық сақтау' },
  { code: 'M141', name: 'Мейіргер ісі' },
  { code: 'M142', name: 'Фармация' },
  { code: 'M143', name: 'Биомедицина' },
  { code: 'M144', name: 'Медицина' },
  { code: 'M145', name: 'Медициналық-профилактикалық іс' },
  { code: 'M146', name: 'Әлеуметтік жұмыс' },
  { code: 'M147', name: 'Туризм' },
  { code: 'M148', name: 'Тынығу' },
  { code: 'M149', name: 'Мейрамхана ісі және мейманхана бизнесі' },
  { code: 'M150', name: 'Санитарлық-профилактикалық іс-шаралар' },
  { code: 'M151', name: 'Көлік қызметтері' },
  { code: 'M152', name: 'Логистика (сала бойынша)' }
];

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    university: '',
    specialty: '',
    phoneNumber: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [specialtySearchTerm, setSpecialtySearchTerm] = useState('');
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const filteredUniversities = universities.filter(uni =>
    uni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpecialties = specialties.filter(spec =>
    spec.name.toLowerCase().includes(specialtySearchTerm.toLowerCase()) ||
    spec.code.toLowerCase().includes(specialtySearchTerm.toLowerCase())
  );

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleUniversitySelect = (university: string) => {
    setFormData(prev => ({ ...prev, university }));
    setSearchTerm(university);
    setShowDropdown(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowDropdown(true);
    if (value !== formData.university) {
      setFormData(prev => ({ ...prev, university: '' }));
    }
  };

  const handleSpecialtySelect = (specialty: { code: string; name: string }) => {
    setFormData(prev => ({ ...prev, specialty: `${specialty.code} - ${specialty.name}` }));
    setSpecialtySearchTerm(`${specialty.code} - ${specialty.name}`);
    setShowSpecialtyDropdown(false);
  };

  const handleSpecialtySearchChange = (value: string) => {
    setSpecialtySearchTerm(value);
    setShowSpecialtyDropdown(true);
    if (value !== formData.specialty) {
      setFormData(prev => ({ ...prev, specialty: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Толық аты-жөніңізді енгізіңіз';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'Университетті таңдаңыз';
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = 'Мамандықты енгізіңіз';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Телефон номерін енгізіңіз';
    } else if (!/^[+]?[0-9\s\-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Дұрыс телефон номерін енгізіңіз';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2 className="form-title">Анкета</h2>
        <p className="form-subtitle">Тестті бастау үшін анкетаны толтырыңыз</p>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              1. Толық аты-жөніңіз *
            </label>
            <input
              type="text"
              id="fullName"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Аты-жөніңізді енгізіңіз"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="university" className="form-label">
              2. Бакалаврдегі университетіңіз *
            </label>
            <div className="dropdown-container">
              <input
                type="text"
                id="university"
                className={`form-input ${errors.university ? 'error' : ''}`}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onClick={() => setShowDropdown(true)}
                onBlur={() => {
                  // Закрываем dropdown с задержкой, чтобы клик по элементу успел сработать
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                placeholder="Университетті іздеңіз немесе таңдаңыз"
                autoComplete="off"
              />
              {showDropdown && (
                <div className="dropdown">
                  {filteredUniversities.length > 0 ? (
                    filteredUniversities.map((uni, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleUniversitySelect(uni)}
                      >
                        {uni}
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-item no-results">
                      Университет табылмады
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.university && <span className="error-message">{errors.university}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="specialty" className="form-label">
              3. Магистратура тапсыратын мамандығыңыз *
            </label>
            <div className="dropdown-container">
              <input
                type="text"
                id="specialty"
                className={`form-input ${errors.specialty ? 'error' : ''}`}
                value={specialtySearchTerm}
                onChange={(e) => handleSpecialtySearchChange(e.target.value)}
                onFocus={() => setShowSpecialtyDropdown(true)}
                onClick={() => setShowSpecialtyDropdown(true)}
                onBlur={() => {
                  setTimeout(() => setShowSpecialtyDropdown(false), 200);
                }}
                placeholder="Мамандықты іздеңіз немесе таңдаңыз"
                autoComplete="off"
              />
              {showSpecialtyDropdown && (
                <div className="dropdown">
                  {filteredSpecialties.length > 0 ? (
                    filteredSpecialties.map((spec, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleSpecialtySelect(spec)}
                      >
                        <div className="specialty-code">{spec.code}</div>
                        <div className="specialty-name">{spec.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-item no-results">
                      Мамандық табылмады
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors.specialty && <span className="error-message">{errors.specialty}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              4. Телефон номері *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <button type="submit" className="submit-button">
            Тестті бастау
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;