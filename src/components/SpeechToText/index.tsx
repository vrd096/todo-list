import React, { useState, useEffect } from 'react';

interface SpeechToTextProps {
  onTextCapture: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTextCapture }) => {
  const [listening, setListening] = useState(false);
  const [capturedText, setCapturedText] = useState('');

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <div>Ваш браузер не поддерживает распознавание речи.</div>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'ru-RU';

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setCapturedText(transcript);
  };

  recognition.onerror = (event: any) => {
    console.error('Ошибка распознавания речи:', event);
    setListening(false);
  };

  const startListening = () => {
    if (!listening) {
      recognition.start();
    }
  };

  useEffect(() => {
    if (!listening && capturedText) {
      const timer = setTimeout(() => {
        onTextCapture(capturedText);
        setCapturedText('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [listening, capturedText, onTextCapture]);

  return (
    <div onClick={startListening} style={{ cursor: 'pointer' }}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill={listening ? 'red' : 'white'} // Измените цвет в зависимости от состояния
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1C13.1046 1 14 1.89543 14 3V11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11V3C10 1.89543 10.8954 1 12 1ZM18 11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11H3C3 15.4183 6.58172 19 11 19V21H7V23H17V21H13V19C17.4183 19 21 15.4183 21 11H18Z"
        />
      </svg>
    </div>
  );
};

export default SpeechToText;
