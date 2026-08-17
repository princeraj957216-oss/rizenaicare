import React from 'react';
import {
  LayoutDashboard,
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
  Heart,
  Wrench,
  Grid
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const navItems = [
  { id: 'dashboard', labelKey: 'nav.dashboard', defaultLabel: 'Dashboard', icon: LayoutDashboard },
  { id: 'allTools', labelKey: 'nav.allTools', defaultLabel: 'All AI Tools', icon: Grid, badge: 'All' },
  { id: 'createTool', labelKey: 'nav.createTool', defaultLabel: 'Create a Tool', icon: Wrench, badge: 'New' },
  { id: 'aiHealthAssistant', labelKey: 'nav.aiHealthAssistant', defaultLabel: 'AI Health Assistant', icon: Bot },
  { id: 'symptomChecker', labelKey: 'nav.symptomChecker', defaultLabel: 'Symptom Checker', icon: Stethoscope },
  { id: 'problemMedicine', labelKey: 'nav.problemMedicine', defaultLabel: 'Problem → Medicine', icon: Pill, badge: 'New' },
  { id: 'findDoctors', labelKey: 'nav.findDoctors', defaultLabel: 'Find Doctors', icon: UserCheck },
  { id: 'bookAppointment', labelKey: 'nav.bookAppointment', defaultLabel: 'Book Appointment', icon: CalendarCheck },
  { id: 'medicinesPharmacy', labelKey: 'nav.medicinesPharmacy', defaultLabel: 'Medicines & Pharmacy', icon: ShoppingBag },
  { id: 'labTests', labelKey: 'nav.labTests', defaultLabel: 'Lab Tests', icon: FlaskConical },
  { id: 'healthRecords', labelKey: 'nav.healthRecords', defaultLabel: 'Health Records', icon: FolderHeart },
  { id: 'healthTips', labelKey: 'nav.healthTips', defaultLabel: 'Health Tips', icon: Sparkles },
  { id: 'dietNutrition', labelKey: 'nav.dietNutrition', defaultLabel: 'Diet & Nutrition', icon: Apple },
  { id: 'wellnessTracker', labelKey: 'nav.wellnessTracker', defaultLabel: 'Wellness Tracker', icon: Activity },
  { id: 'emergencyHelp', labelKey: 'nav.emergencyHelp', defaultLabel: 'Emergency Help', icon: AlertTriangle },
  { id: 'reports', labelKey: 'nav.reports', defaultLabel: 'Reports', icon: FileSpreadsheet },
  { id: 'settings', labelKey: 'nav.settings', defaultLabel: 'Settings', icon: Settings },
];

export function Sidebar({ activePage, setActivePage }) {
  const { t } = useLanguage();

  return (
    <aside className="w-64 bg-[#0A0D14] border-r border-[#161D2B] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none overflow-y-auto custom-scrollbar">
      {/* Brand Header */}
      <div>
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wider text-white font-sans">RIZEN CARE</h1>
            <p className="text-[10px] font-semibold text-cyan-400 tracking-widest uppercase">AI HEALTH ASSISTANT</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#121824]'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{t(item.labelKey, item.defaultLabel)}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-pink-500 text-white shadow-[0_0_8px_rgba(236,72,153,0.6)] uppercase tracking-wider shrink-0 ml-1">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Health Score Card Matching Reference UI */}
      <div className="p-4 mt-4">
        <div className="bg-gradient-to-b from-[#111624] to-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-semibold text-slate-300 mb-3">{t('healthScore.title', 'Health Score')}</div>
          
          <div className="flex items-center gap-3.5">
            {/* Radial Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400"
                  strokeDasharray="82, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="url(#scoreGrad)"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-bold text-white leading-none">82</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-emerald-400">{t('healthScore.good', 'Good')}</span>
                <span className="text-[11px] text-slate-400">{t('healthScore.outOf', '/100')}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight mt-1">
                {t('healthScore.subtitle', 'Keep tracking your health for a better tomorrow!')}
              </p>
            </div>
          </div>

          {/* Sparkline Wave */}
          <div className="mt-3 pt-2 border-t border-[#1C2436] flex items-center justify-between">
            <svg viewBox="0 0 100 20" className="w-full h-5 text-purple-400 overflow-visible">
              <path
                d="M0 15 Q 15 5, 30 12 T 60 8 T 85 4 T 100 10"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="100" cy="10" r="3" fill="#00E5FF" className="animate-ping" />
              <circle cx="100" cy="10" r="2" fill="#00E5FF" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
