import React, { createContext, useContext, useState, useRef } from 'react';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = (onResultCallback, langCode = 'en') => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or modern browsers.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        mr: 'mr-IN'
      };

      recognition.lang = langMap[langCode] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (typeof onResultCallback === 'function') {
          onResultCallback(transcript);
        }
      };

      recognition.onerror = (e) => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text, id = 'global', langCode = 'en') => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === id && isSpeaking) {
      stopSpeaking();
      return;
    }

    const cleanText = text.replace(/[*#_`>]/g, '').slice(0, 1000);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langMap = {
      en: 'en-US',
      hi: 'hi-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      mr: 'mr-IN'
    };

    utterance.lang = langMap[langCode] || 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingId(null);
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        isSpeaking,
        speakingId,
        startListening,
        stopListening,
        speakText,
        stopSpeaking
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export const useVoice = () => useContext(VoiceContext);
