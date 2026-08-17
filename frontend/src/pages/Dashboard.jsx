import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  Stethoscope,
  Pill,
  Bot,
  UserCheck,
  FlaskConical,
  FolderHeart,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { HologramAnatomy } from '../components/common/HologramAnatomy';
import { ProblemMedicineBanner } from '../components/widgets/ProblemMedicineBanner';
import { WellnessMetricsRow } from '../components/widgets/WellnessMetricsRow';
import { QuickActionsRow } from '../components/widgets/QuickActionsRow';
import { TrustBadgesRow } from '../components/widgets/TrustBadgesRow';
import { AllToolsModal } from '../components/common/AllToolsModal';

export function Dashboard({ onNavigate }) {
  const { t, currentLang } = useLanguage();
  const { isListening, startListening, stopListening } = useVoice();
  const [heroPrompt, setHeroPrompt] = useState('');
  const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      onNavigate('aiHealthAssistant', { initialQuery: heroPrompt.trim() });
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        setHeroPrompt(text);
      }, currentLang);
    }
  };

  const handleQuickTagClick = (tagKey, queryText) => {
    if (tagKey === 'checkSymptoms') {
      onNavigate('symptomChecker');
    } else if (tagKey === 'suggestDiet') {
      onNavigate('dietNutrition');
    } else if (tagKey === 'medicineInteractions') {
      onNavigate('problemMedicine');
    } else if (tagKey === 'healthTips') {
      onNavigate('healthTips');
    } else {
      onNavigate('aiHealthAssistant', { initialQuery: queryText });
    }
  };

  const toolCards = [
    {
      id: 'symptomChecker',
      title: t('tools.symptomChecker', 'Symptom Checker'),
      desc: t('tools.symptomDesc', 'Analyze your symptoms'),
      icon: Stethoscope,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/15',
      badge: null,
      target: 'symptomChecker'
    },
    {
      id: 'problemMedicine',
      title: t('tools.problemMedicine', 'Problem → Medicine'),
      desc: t('tools.problemDesc', 'Get medicine info, causes & precautions'),
      icon: Pill,
      iconColor: 'text-pink-400',
      iconBg: 'bg-pink-500/15',
      badge: 'New',
      target: 'problemMedicine'
    },
    {
      id: 'aiDoctor',
      title: t('tools.aiDoctor', 'AI Doctor Consultation'),
      desc: t('tools.aiDoctorDesc', 'Talk to AI Doctor 24x7'),
      icon: Bot,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/15',
      badge: null,
      target: 'aiHealthAssistant'
    },
    {
      id: 'findDoctors',
      title: t('tools.findDoctors', 'Find Doctors'),
      desc: t('tools.findDoctorsDesc', 'Find specialists near you'),
      icon: UserCheck,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15',
      badge: null,
      target: 'findDoctors'
    },
    {
      id: 'labTests',
      title: t('tools.labTests', 'Lab Tests at Home'),
      desc: t('tools.labTestsDesc', 'Book tests at home'),
      icon: FlaskConical,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
      badge: null,
      target: 'labTests'
    },
    {
      id: 'healthRecords',
      title: t('tools.healthRecords', 'Health Records'),
      desc: t('tools.healthRecordsDesc', 'Access your medical records'),
      icon: FolderHeart,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15',
      badge: null,
      target: 'healthRecords'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Large Hero Card Matching Reference UI */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0D121F] via-[#101628] to-[#151228] border border-[#1E2638] rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-4 max-w-xl">
            <div className="space-y-1">
              <span className="text-sm font-medium text-purple-400 tracking-wide">
                {t('hero.greeting', 'Hello! 👋')}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {t('hero.title', 'How can I help you today?')}
              </h2>
              <p className="text-xs md:text-sm text-slate-300">
                {t('hero.subtitle', 'Your AI Health Assistant is here for you.')}
              </p>
            </div>

            {/* AI Health Assistant Input Bar */}
            <form onSubmit={handleHeroSubmit} className="relative flex items-center bg-[#07090E]/90 border border-[#252F48] focus-within:border-cyan-500 rounded-2xl p-1.5 shadow-lg transition-all">
              <input
                type="text"
                placeholder={t('hero.inputPlaceholder', 'Ask anything about your health...')}
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />

              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                {/* Voice Mic Button */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isListening
                      ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                      : 'bg-[#121622] border-[#1E2638] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40'
                  }`}
                  title="Voice Input (Mic)"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Ask AI Button */}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('hero.askButton', 'Ask AI')}</span>
                </button>
              </div>
            </form>

            {/* Quick Action Tags / Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickTagClick('checkSymptoms', 'I want to check my symptoms')}
                className="px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#182032] border border-[#1E2638] hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>🔍</span>
                <span>{t('hero.quickTags.checkSymptoms', 'Check Symptoms')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickTagClick('suggestDiet', 'Suggest a healthy balanced diet plan')}
                className="px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#182032] border border-[#1E2638] hover:border-purple-500/40 text-[11px] text-slate-300 hover:text-purple-300 transition-all flex items-center gap-1.5"
              >
                <span>🥗</span>
                <span>{t('hero.quickTags.suggestDiet', 'Suggest Diet Plan')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickTagClick('medicineInteractions', 'Tell me about medicine interactions')}
                className="px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#182032] border border-[#1E2638] hover:border-pink-500/40 text-[11px] text-slate-300 hover:text-pink-300 transition-all flex items-center gap-1.5"
              >
                <span>💊</span>
                <span>{t('hero.quickTags.medicineInteractions', 'Medicine Interactions')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickTagClick('healthTips', 'Give me important health and wellness tips')}
                className="px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#182032] border border-[#1E2638] hover:border-emerald-500/40 text-[11px] text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-1.5"
              >
                <span>✨</span>
                <span>{t('hero.quickTags.healthTips', 'Health Tips')}</span>
              </button>
            </div>
          </div>

          {/* Right Hologram Anatomy Artwork */}
          <div className="shrink-0 flex items-center justify-center">
            <HologramAnatomy />
          </div>
        </div>
      </section>

      {/* 2. AI Health Tools Grid Matching Reference UI */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide">
              {t('tools.title', 'AI Health Tools')}
            </h3>
          </div>
          <button
            onClick={() => setIsAllToolsOpen(true)}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1"
          >
            <span>{t('tools.viewAll', 'View All Tools')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Interactive Tool Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {toolCards.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.target)}
                className="relative bg-[#0D111A] hover:bg-[#131926] border border-[#1E2638] hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col items-center text-center transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              >
                {tool.badge && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.6)] uppercase">
                    {tool.badge}
                  </span>
                )}

                <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
                  {tool.title}
                </h4>

                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pagination Dots indicator */}
        <div className="flex justify-center items-center gap-1.5 pt-1 cursor-pointer" onClick={() => setIsAllToolsOpen(true)}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.8)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-500" />
        </div>
      </section>

      {/* 3. Featured Problem -> Medicine Information Banner */}
      <section>
        <ProblemMedicineBanner onNavigate={onNavigate} />
      </section>

      {/* 4. Quick Stats / Wellness Metrics (4 cards row) */}
      <section>
        <WellnessMetricsRow onNavigate={onNavigate} />
      </section>

      {/* 5. Quick Actions Row */}
      <section>
        <QuickActionsRow onNavigate={onNavigate} />
      </section>

      {/* 6. Trust & Security Badges Row */}
      <section>
        <TrustBadgesRow />
      </section>

      {/* All Tools Modal */}
      <AllToolsModal
        isOpen={isAllToolsOpen}
        onClose={() => setIsAllToolsOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
