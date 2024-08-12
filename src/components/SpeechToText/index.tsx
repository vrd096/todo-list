import React, { useState, useEffect, useRef } from 'react';

interface SpeechToTextProps {
  onTextCapture: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTextCapture }) => {
  const [listening, setListening] = useState(false);
  const capturedTextRef = useRef(''); // Используем useRef для текущего текста
  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <div>Ваш браузер не поддерживает распознавание речи.</div>;
  }

  useEffect(() => {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
      processCapturedText(); // Обрабатываем текст после завершения
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as SpeechRecognitionResultList)
        .map((result) => (result as SpeechRecognitionResult)[0].transcript)
        .join('');

      // Обновляем текстовое значение
      capturedTextRef.current += transcript;

      // Сбрасываем таймер при каждом новом результате
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        recognition.stop(); // Останавливаем распознавание после паузы
      }, 3000);
    };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания речи:', event);
      setListening(false);
      processCapturedText(); // Попытка обработать текст при ошибке
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startListening = () => {
    if (!listening && recognitionRef.current) {
      recognitionRef.current.start();
      capturedTextRef.current = ''; // Сброс предыдущего текста
    }
  };

  const processCapturedText = () => {
    if (capturedTextRef.current) {
      onTextCapture(capturedTextRef.current);
      capturedTextRef.current = ''; // Сбрасываем текст после передачи
    }
  };

  return (
    <div onClick={startListening} style={{ cursor: 'pointer' }}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={listening ? 'red' : '#78bafd'}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1C13.1046 1 14 1.89543 14 3V11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11V3C10 1.89543 10.8954 1 12 1ZM18 11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11H3C3 15.4183 6.58172 19 11 19V21H7V23H17V21H13V19C17.4183 19 21 15.4183 21 11H18Z"
        />
      </svg>
    </div>
  );
};

export default SpeechToText;
