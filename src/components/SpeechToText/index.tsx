import React, { useState, useEffect, useRef } from 'react';

interface SpeechToTextProps {
  onTextCapture: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTextCapture }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSessionTextRef = useRef('');
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const lastProcessingIndexRef = useRef(0); // Добавлено для хранения последнего обработанного индекса

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.onstart = () => setListening(true);

    recognition.onend = () => {
      setListening(false);
      onTextCapture(currentSessionTextRef.current);
      currentSessionTextRef.current = '';
      lastProcessingIndexRef.current = 0; // Сбрасываем последний обработанный индекс при завершении
    };

    recognition.onresult = (event: any) => {
      let newTranscript = '';

      for (let i = lastProcessingIndexRef.current; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }

      currentSessionTextRef.current += newTranscript;
      lastProcessingIndexRef.current = event.results.length; // Обновляем последний обработанный индекс

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        recognition.stop();
      }, 1000);
    };

    recognition.onerror = (event: any) => {
      console.error('Ошибка распознавания речи:', event);
      setListening(false);
      currentSessionTextRef.current = ''; // очистим на всякий случай
      lastProcessingIndexRef.current = 0; // Сбрасываем последний обработанный индекс при ошибке
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onTextCapture]);

  const startListening = () => {
    if (!listening && recognitionRef.current) {
      recognitionRef.current.start();
      currentSessionTextRef.current = '';
    }
  };
  return (
    <div onClick={startListening} style={{ cursor: 'pointer' }}>
      {!SpeechRecognition ? (
        <svg
          width="24px"
          height="24px"
          // viewBox="0 0 24 24"
          fill="#78bafd"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
          />
        </svg>
      ) : (
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
      )}
    </div>
  );
};

export default SpeechToText;

// import React, { useState, useEffect, useRef } from 'react';

// interface SpeechToTextProps {
//   onTextCapture: (text: string) => void;
// }

// const SpeechToText: React.FC<SpeechToTextProps> = ({ onTextCapture }) => {
//   const [listening, setListening] = useState(false);
//   const capturedTextRef = useRef(''); // Используем useRef для текущего текста
//   const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const SpeechRecognition =
//     (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//   useEffect(() => {
//     if (!SpeechRecognition) {
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = 'ru-RU';

//     recognition.onstart = () => {
//       setListening(true);
//     };

//     recognition.onend = () => {
//       setListening(false);
//       processCapturedText();
//     };

//     recognition.onresult = (event: any) => {
//       const transcript = Array.from(event.results as SpeechRecognitionResultList)
//         .map((result) => (result as SpeechRecognitionResult)[0].transcript)
//         .join('');

//       capturedTextRef.current += transcript;

//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = setTimeout(() => {
//         recognition.stop();
//       }, 3000);
//     };

//     recognition.onerror = (event: any) => {
//       console.error('Ошибка распознавания речи:', event);
//       setListening(false);
//       processCapturedText();
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       recognition.stop();
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [SpeechRecognition]);

//   const startListening = () => {
//     if (!listening && recognitionRef.current) {
//       recognitionRef.current.start();
//       capturedTextRef.current = ''; // Сброс предыдущего текста
//     }
//   };

//   const processCapturedText = () => {
//     if (capturedTextRef.current) {
//       onTextCapture(capturedTextRef.current);
//       capturedTextRef.current = ''; // Сбрасываем текст после передачи
//     }
//   };

//   return (
//     <div onClick={startListening} style={{ cursor: 'pointer' }}>
//       {!SpeechRecognition ? (
//         <svg
//           width="24px"
//           height="24px"
//           // viewBox="0 0 24 24"
//           fill="#78bafd"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
//           />
//         </svg>
//       ) : (
//         <svg
//           width="24px"
//           height="24px"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             fill={listening ? 'red' : '#78bafd'}
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M12 1C13.1046 1 14 1.89543 14 3V11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11V3C10 1.89543 10.8954 1 12 1ZM18 11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11H3C3 15.4183 6.58172 19 11 19V21H7V23H17V21H13V19C17.4183 19 21 15.4183 21 11H18Z"
//           />
//         </svg>
//       )}
//     </div>
//   );
// };

// export default SpeechToText;
