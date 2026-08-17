import React from 'react';
import { Footprints, Moon, Droplets, HeartPulse, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function WellnessMetricsRow({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {/* 1. Steps Today */}
      <button
        onClick={() => onNavigate('wellnessTracker')}
        className="bg-[#0D111A] hover:bg-[#121725] border border-[#1E2638] hover:border-cyan-500/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">{t('metrics.steps', 'Steps Today')}</p>
            <h4 className="text-sm font-bold text-slate-100">6,842</h4>
            <p className="text-[9px] text-slate-500">{t('metrics.stepsGoal', '/ 10,000 Steps')}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
      </button>

      {/* 2. Sleep */}
      <button
        onClick={() => onNavigate('wellnessTracker')}
        className="bg-[#0D111A] hover:bg-[#121725] border border-[#1E2638] hover:border-purple-500/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">{t('metrics.sleep', 'Sleep')}</p>
            <h4 className="text-sm font-bold text-slate-100">7h 32m</h4>
            <p className="text-[9px] text-emerald-400 font-semibold">{t('metrics.good', 'Good')}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
      </button>

      {/* 3. Water Intake */}
      <button
        onClick={() => onNavigate('wellnessTracker')}
        className="bg-[#0D111A] hover:bg-[#121725] border border-[#1E2638] hover:border-cyan-500/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">{t('metrics.water', 'Water Intake')}</p>
            <h4 className="text-sm font-bold text-slate-100">5 / 8 <span className="text-[10px] font-normal text-slate-400">Glasses</span></h4>
            <p className="text-[9px] text-emerald-400 font-semibold">{t('metrics.good', 'Good')}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
      </button>

      {/* 4. Heart Rate */}
      <button
        onClick={() => onNavigate('wellnessTracker')}
        className="bg-[#0D111A] hover:bg-[#121725] border border-[#1E2638] hover:border-pink-500/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.2)]">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">{t('metrics.heartRate', 'Heart Rate')}</p>
            <h4 className="text-sm font-bold text-slate-100">72 <span className="text-[10px] font-normal text-slate-400">bpm</span></h4>
            <p className="text-[9px] text-emerald-400 font-semibold">{t('metrics.normal', 'Normal')}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
      </button>
    </div>
  );
}
