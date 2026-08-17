import React, { useState } from 'react';
import {
  Search,
  Bot,
  Stethoscope,
  Pill,
  UserCheck,
  CalendarCheck,
  ShoppingBag,
  FlaskConical,
  FolderHeart,
  Sparkles,
  Apple,
  Activity,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AllTools({ onNavigate }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toolsList = [
    {
      id: 'createTool',
      title: 'Create Custom AI Health Tool',
      desc: 'Build custom medical assessment calculators and upload reports for AI cross-analysis.',
      category: 'AI Builder',
      icon: Wrench,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      badge: 'New'
    },
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
      id: 'findDoctors',
      title: 'Find Doctors & Specialists',
      desc: 'Discover verified medical specialists filtered by location and ratings.',
      category: 'Appointments',
      icon: UserCheck,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/15',
      badge: null
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
      id: 'medicinesPharmacy',
      title: 'Medicines & Pharmacy',
      desc: 'Browse genuine OTC remedies, wellness supplements, and order online.',
      category: 'Pharmacy',
      icon: ShoppingBag,
      color: 'text-pink-400',
      bg: 'bg-pink-500/15',
      badge: null
    },
    {
      id: 'labTests',
      title: 'Lab Tests at Home',
      desc: 'Book full-body checkups and diagnostic panels with free home collection.',
      category: 'Diagnostics',
      icon: FlaskConical,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      badge: 'Home Visit'
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
      id: 'wellnessTracker',
      title: 'Wellness & Vitality Tracker',
      desc: 'Interactive 8-glass water logger, step tracker, sleep monitor & BMI calculator.',
      category: 'Wellness',
      icon: Activity,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/15',
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
      desc: 'Instant emergency hotlines (112, 102), 24/7 ER hospitals & first-aid guides.',
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

  const categories = ['All', 'AI Builder', 'AI Assistant', 'Clinical Triage', 'Pharmacy', 'Appointments', 'Diagnostics', 'Wellness', 'Emergency'];

  const filtered = toolsList.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(search.toLowerCase()) ||
                          tool.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-glow-purple flex items-center justify-center">
            <div className="w-full h-full bg-[#0D111A] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white">All AI Health Tools & Diagnostics</h2>
            <p className="text-xs text-slate-400">Explore and launch our comprehensive medical AI platform capabilities</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('createTool')}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-glow-purple flex items-center gap-1.5"
        >
          <Wrench className="w-4 h-4" />
          <span>+ Create Custom Tool</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by tool name, purpose, or health condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121622] border border-[#1E2638] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
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

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="relative bg-[#0D111A] hover:bg-[#131826] border border-[#1E2638] hover:border-cyan-500/40 rounded-3xl p-5 flex flex-col justify-between cursor-pointer transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              {tool.badge && (
                <span className="absolute top-3.5 right-3.5 px-2 py-0.5 text-[9px] font-bold rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase tracking-wider">
                  {tool.badge}
                </span>
              )}

              <div>
                <div className={`w-12 h-12 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1C2538] flex items-center justify-between text-xs text-purple-400 font-semibold group-hover:text-cyan-300 transition-colors">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
