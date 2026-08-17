import React, { useState } from 'react';
import { Pill, Sparkles, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function ProblemMedicineBanner({ onNavigate, onSearchProblem }) {
  const { t } = useLanguage();
  const [problemQuery, setProblemQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (problemQuery.trim()) {
      if (onSearchProblem) {
        onSearchProblem(problemQuery.trim());
      }
      if (onNavigate) {
        onNavigate('problemMedicine', { query: problemQuery.trim() });
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#111625] via-[#141A2E] to-[#1E1638] border border-[#222B42] rounded-3xl p-6 shadow-xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Form Content */}
        <div className="flex-1 space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-500 text-white uppercase tracking-wider shadow-[0_0_8px_rgba(236,72,153,0.6)]">
              {t('problemBanner.badge', 'New')}
            </span>
            <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
              {t('problemBanner.title', 'Problem → Medicine Information')}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {t('problemBanner.description', 'Enter your health problem or symptoms and get general medicine information, possible causes and precautions.')}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-lg">
            <input
              type="text"
              placeholder={t('problemBanner.placeholder', 'E.g. Headache, Fever, Cough, Acidity...')}
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              className="flex-1 bg-[#0D111A] border border-[#252F48] rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('problemBanner.button', 'Get Information')}</span>
            </button>
          </form>

          {/* 3 Medical Disclaimers Matching Reference UI */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{t('problemBanner.disclaimers.general', 'General info only')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>{t('problemBanner.disclaimers.notPrescription', 'Not a prescription')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              <span>{t('problemBanner.disclaimers.consult', 'Consult doctor for proper diagnosis')}</span>
            </div>
          </div>
        </div>

        {/* Right 3D Medical Illustration Matching Reference Artwork */}
        <div className="relative w-44 h-36 shrink-0 flex items-center justify-center pointer-events-none select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-blue-500/20 rounded-full blur-xl animate-pulse" />
          <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            <defs>
              <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
            </defs>

            {/* Medicine Box */}
            <rect x="70" y="30" width="55" height="55" rx="10" fill="url(#jarGrad)" opacity="0.9" />
            <rect x="78" y="38" width="39" height="39" rx="6" fill="#1E1B4B" opacity="0.6" />
            <path d="M97.5 45 L97.5 70 M85 57.5 L110 57.5" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" />

            {/* Medicine Bottle */}
            <rect x="25" y="45" width="34" height="48" rx="8" fill="#1E293B" stroke="#00E5FF" strokeWidth="1.5" />
            <rect x="30" y="36" width="24" height="9" rx="3" fill="#38BDF8" />
            <rect x="28" y="58" width="28" height="22" rx="4" fill="#F59E0B" opacity="0.85" />

            {/* Shield with Cross */}
            <path d="M125 65 Q 145 65 145 90 Q 145 115 125 125 Q 105 115 105 90 Q 105 65 125 65 Z" fill="url(#shieldGrad)" />
            <path d="M125 80 L125 105 M112.5 92.5 L137.5 92.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

            {/* Blister Pill Pack */}
            <rect x="80" y="85" width="45" height="32" rx="5" fill="#E2E8F0" opacity="0.95" />
            <circle cx="92" cy="95" r="4" fill="#3B82F6" />
            <circle cx="103" cy="95" r="4" fill="#3B82F6" />
            <circle cx="114" cy="95" r="4" fill="#3B82F6" />
            <circle cx="92" cy="107" r="4" fill="#8B5CF6" />
            <circle cx="103" cy="107" r="4" fill="#8B5CF6" />
            <circle cx="114" cy="107" r="4" fill="#8B5CF6" />

            {/* Floating Capsule */}
            <g transform="translate(30, 95) rotate(-25)">
              <rect x="0" y="0" width="16" height="30" rx="8" fill="url(#pillGrad)" />
              <rect x="0" y="15" width="16" height="15" rx="8" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
