import React, { useState } from 'react';
import {
  X,
  Search,
  Stethoscope,
  Pill,
  Bot,
  UserCheck,
  FlaskConical,
  FolderHeart,
  Sparkles,
  Apple,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  CalendarCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function AllToolsModal({ isOpen, onClose, onNavigate }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  if (!isOpen) return null;

  const allToolsList = [
    {
      id: 'aiHealthAssistant',
      title: 'AI Health Assistant',
      desc: '24x7 Conversational AI with Voice STT/TTS & multi-lingual medical chat.',
      category: 'AI Assistant',
      icon: Bot,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      badge: 'Popular'
    },
    {
      id: 'symptomChecker',
      title: 'Symptom Checker',
      desc: 'Structured symptom triage, severity rating, and educational next steps.',
      category: 'Clinical Triage',
      icon: Stethoscope,
      color: 'text-blue-400',
      bg: 'bg-blue-500/15',
      badge: 'AI Powered'
    },
    {
      id: 'problemMedicine',
      title: 'Problem → Medicine Info',
      desc: 'Find general therapeutic classes, mechanisms, and safety precautions.',
      category: 'Pharmacy',
      icon: Pill,
      color: 'text-pink-400',
      bg: 'bg-pink-500/15',
      badge: 'New'
    },
    {
      id: 'bookAppointment',
      title: 'Book Appointment',
      desc: 'Schedule in-person or video consultations with verified clinic doctors.',
      category: 'Appointments',
      icon: CalendarCheck,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/15',
      badge: null
    },
    {
      id: 'healthRecords',
      title: 'Health Records & Report OCR',
      desc: 'Upload PDF/image medical reports for laboratory extraction and AI summary.',
      category: 'Diagnostics',
      icon: FolderHeart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/15',
      badge: 'OCR'
    },
    {
      id: 'dietNutrition',
      title: 'Diet & Nutrition Planner',
      desc: 'Generate balanced, non-restrictive daily wellness nutrition and meal schedules.',
      category: 'Wellness',
      icon: Apple,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      badge: null
    },
    {
      id: 'healthTips',
      title: 'Health Tips Library',
      desc: 'Scientifically validated preventive wellness articles and healthy habits.',
      category: 'Wellness',
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      badge: null
    },
    {
      id: 'emergencyHelp',
      title: 'Emergency Help (SOS)',
      desc: 'Emergency ambulance support, 24/7 ER hospitals, and first-aid guides.',
      category: 'Emergency',
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/15',
      badge: 'SOS'
    },
    {
      id: 'reports',
      title: 'Clinical Reports & Summaries',
      desc: 'Consolidated health score overview and branded PDF report exporter.',
      category: 'Diagnostics',
      icon: FileSpreadsheet,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/15',
      badge: null
    },
    {
      id: 'settings',
      title: 'Settings & Privacy',
      desc: 'Configure languages, day/night theme, voice controls, and data deletion.',
      category: 'Preferences',
      icon: Settings,
      color: 'text-slate-400',
      bg: 'bg-slate-500/15',
      badge: null
    }
  ];

  const categories = ['All', 'AI Assistant', 'Clinical Triage', 'Pharmacy', 'Appointments', 'Diagnostics', 'Wellness', 'Emergency'];

  const filtered = allToolsList.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(search.toLowerCase()) ||
                          tool.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleLaunch = (toolId) => {
    if (onNavigate) onNavigate(toolId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0D111A] text-slate-100 border border-[#1E2638] rounded-3xl shadow-[0_10px_60px_rgba(0,0,0,0.95)] p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2638] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-glow-purple flex items-center justify-center">
              <div className="w-full h-full bg-[#0D111A] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">All RIZEN CARE AI Health Tools</h2>
              <p className="text-xs text-slate-400">Complete suite of AI healthcare, clinical diagnostic, and wellness modules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#161D2B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="py-4 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by tool name, purpose, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#121622] border border-[#1E2638] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                    : 'bg-[#121622] border border-[#1E2638] text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filtered.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleLaunch(tool.id)}
                  className="relative bg-[#121622] hover:bg-[#161D2E] border border-[#1E2638] hover:border-cyan-500/40 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                >
                  {tool.badge && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-bold rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}

                  <div>
                    <div className={`w-10 h-10 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#1C2538] flex items-center justify-between text-[11px] text-purple-400 font-semibold group-hover:text-cyan-300 transition-colors">
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No tools matching "{search}". Try searching for symptoms, medicine, diet, or emergency.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
