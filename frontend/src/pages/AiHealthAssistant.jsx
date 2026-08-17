import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Mic, Volume2, Square, Copy, RefreshCw, Trash2, Download, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { chatWithAI } from '../services/api';
import { exportToPDF } from '../services/pdfGenerator';
import { ToolLanguageSelector } from '../components/common/ToolLanguageSelector';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';
import { ReportUploadCard } from '../components/common/ReportUploadCard';

export function AiHealthAssistant({ initialQuery = '' }) {
  const { currentLang, t } = useLanguage();
  const [toolLang, setToolLang] = useState(currentLang);
  const { isListening, isSpeaking, speakingId, startListening, stopListening, speakText, stopSpeaking } = useVoice();

  const [inputMessage, setInputMessage] = useState(initialQuery);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Hello! I am your RIZEN CARE AI Health Assistant. I am here to help you understand symptoms, provide medicine information, explain lab reports, and suggest wellness advice. How may I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'RIZEN Clinical AI'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setToolLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(textToSend.trim(), toolLang);
      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: response.text,
        disclaimer: response.disclaimer,
        provider: response.provider,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const errorMsg = {
        id: 'err-' + Date.now(),
        sender: 'ai',
        text: 'Sorry, I encountered an issue processing your query. Please try again or check your internet connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setInputMessage(transcript);
      }, toolLang);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (confirm('Clear entire conversation history?')) {
      stopSpeaking();
      setMessages([
        {
          id: 'msg-welcome-new',
          sender: 'ai',
          text: 'Conversation cleared. How can I assist you now?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleDownloadPDF = () => {
    const fullText = messages.map(m => `[${m.sender.toUpperCase()} - ${m.timestamp}]\n${m.text}\n`).join('\n---\n\n');
    exportToPDF({
      title: 'RIZEN CARE — AI Health Consultation Summary',
      category: 'AI Health Assistant Consultation',
      language: toolLang.toUpperCase(),
      content: fullText
    });
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t('nav.aiHealthAssistant', 'AI Health Assistant')}</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online 24x7
              </span>
            </h2>
            <p className="text-xs text-slate-400">Conversational clinical guidance with voice assistance</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ToolLanguageSelector selectedLang={toolLang} onSelectLang={setToolLang} />
          <button
            onClick={handleDownloadPDF}
            className="p-2 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            title="Download Consultation as PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <MedicalDisclaimerBadge text="This AI conversation provides general healthcare education and is not a substitute for formal diagnosis or a written medical prescription." />

      {/* Messages Scroll Area */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-4 md:p-6 min-h-[400px] max-h-[540px] overflow-y-auto space-y-4 custom-scrollbar shadow-inner">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          const isCurrentSpeaking = isSpeaking && speakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed space-y-2 ${
                  isAI
                    ? 'bg-[#121726] border border-[#20293F] text-slate-100 shadow-sm'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Actions Row for AI message */}
                {isAI && (
                  <div className="pt-2 border-t border-[#1C253B] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-[10px] text-slate-500">
                      {msg.provider || 'RIZEN AI'} • {msg.timestamp}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="p-1 rounded hover:bg-[#1C253B] text-slate-400 hover:text-cyan-300 transition-colors"
                        title="Copy message"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {copiedId === msg.id && (
                        <span className="text-[10px] text-cyan-400 font-medium">Copied!</span>
                      )}

                      <button
                        onClick={() => {
                          if (isCurrentSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.text, msg.id, toolLang);
                          }
                        }}
                        className={`px-2 py-0.5 rounded flex items-center gap-1 text-[10px] font-medium transition-colors ${
                          isCurrentSpeaking
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : 'hover:bg-[#1C253B] text-slate-400 hover:text-purple-300'
                        }`}
                        title={isCurrentSpeaking ? 'Stop speech' : 'Listen with voice'}
                      >
                        {isCurrentSpeaking ? (
                          <>
                            <Square className="w-3 h-3 text-red-400 fill-red-400" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Speak</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-1 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#121726] border border-[#20293F] rounded-2xl px-4 py-3 text-xs text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Analyzing clinical query & formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Control Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-center bg-[#0D111A] border border-[#252F48] focus-within:border-cyan-500 rounded-2xl p-2 shadow-lg transition-all">
        <input
          type="text"
          placeholder="Type your health questions, symptoms, or medication queries..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
        />

        <div className="flex items-center gap-2 shrink-0 pr-1">
          {/* Mic Button */}
          <button
            type="button"
            onClick={handleMic}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                : 'bg-[#141A28] border-[#1E2638] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
            }`}
            title="Speech to Text (Mic)"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </form>

      {/* Report Upload Option */}
      <ReportUploadCard toolName="AI Health Assistant" />
    </div>
  );
}
