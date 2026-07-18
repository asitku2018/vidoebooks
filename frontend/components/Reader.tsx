'use client';

import { useState, useEffect } from 'react';

interface ReaderProps {
  title: string;
  content: string; 
}

const INDIAN_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'bn-IN', name: 'Bengali' },
  { code: 'ta-IN', name: 'Tamil' },
  { code: 'te-IN', name: 'Telugu' },
  { code: 'mr-IN', name: 'Marathi' },
  { code: 'gu-IN', name: 'Gujarati' },
  { code: 'en-IN', name: 'English (India)' },
];

export default function Reader({ title, content }: ReaderProps) {
  const [selectedLang, setSelectedLang] = useState<string>('en-IN');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [supportedVoices, setSupportedVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setSupportedVoices(voices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlayPause = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = selectedLang;
        
        const specificVoice = supportedVoices.find(v => v.lang === selectedLang);
        if (specificVoice) {
          utterance.voice = specificVoice;
        }

        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
      setIsSpeaking(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-8 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <select 
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              handleStop();
            }}
          >
            {INDIAN_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button 
            onClick={handlePlayPause}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {isSpeaking ? 'Pause' : 'Listen'}
          </button>
          
          <button 
            onClick={handleStop}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Stop
          </button>
        </div>
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed font-serif text-lg">
        {content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
