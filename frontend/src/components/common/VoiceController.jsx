import React from 'react';
import { Mic, Volume2, Square, Loader2 } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

export function VoiceController({ textToSpeak, onSpeechResult, itemId = 'item', langCode = 'en', className = '' }) {
  const { isListening, isSpeaking, speakingId, startListening, stopListening, speakText, stopSpeaking } = useVoice();

  const isCurrentSpeaking = isSpeaking && speakingId === itemId;

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(onSpeechResult, langCode);
    }
  };

  const handleSpeakClick = () => {
    if (isCurrentSpeaking) {
      stopSpeaking();
    } else if (textToSpeak) {
      speakText(textToSpeak, itemId, langCode);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Speech-to-text Mic button */}
      {onSpeechResult && (
        <button
          type="button"
          onClick={handleMicClick}
          className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-medium ${
            isListening
              ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-pulse'
              : 'bg-[#141A28] border-[#1E2638] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
          }`}
          title={isListening ? 'Stop Listening' : 'Voice Input (Speak)'}
        >
          <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-red-400' : ''}`} />
          {isListening && <span>Listening...</span>}
        </button>
      )}

      {/* Text-to-speech Speak / Stop button */}
      {textToSpeak && (
        <button
          type="button"
          onClick={handleSpeakClick}
          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
            isCurrentSpeaking
              ? 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
              : 'bg-[#141A28] border-[#1E2638] text-slate-300 hover:text-purple-300 hover:border-purple-500/40'
          }`}
          title={isCurrentSpeaking ? 'Stop Audio' : 'Listen to Response'}
        >
          {isCurrentSpeaking ? (
            <>
              <Square className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Speak</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
