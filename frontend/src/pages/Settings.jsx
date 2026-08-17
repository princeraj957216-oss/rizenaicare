import React from 'react';
import { Settings as SettingsIcon, Globe, Sun, Moon, Volume2, ShieldCheck, Trash2, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useLocationContext } from '../context/LocationContext';

export function Settings() {
  const { currentLang, setLanguage, languagesList } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { location } = useLocationContext();

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all locally cached health sessions, preferences, and offline data?')) {
      localStorage.clear();
      alert('Local application data has been safely cleared.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Platform Settings & Privacy Controls</h2>
          <p className="text-xs text-slate-400">Configure language, theme, voice synthesizer, and data privacy</p>
        </div>
      </div>

      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 space-y-6">
        {/* Global Language */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1E2638]">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-cyan-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Global Interface Language</h4>
              <p className="text-[11px] text-slate-400">Controls navigation, buttons, and AI tool interface</p>
            </div>
          </div>

          <select
            value={currentLang}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#121622] border border-[#20283E] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {languagesList.map(l => (
              <option key={l.code} value={l.code}>{l.native} ({l.label})</option>
            ))}
          </select>
        </div>

        {/* Theme Preference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1E2638]">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-amber-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Display Theme</h4>
              <p className="text-[11px] text-slate-400">Dark futuristic obsidian or light mode</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                theme === 'dark' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#121622] border-[#1E2638] text-slate-400'
              }`}
            >
              Dark Theme
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                theme === 'light' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#121622] border-[#1E2638] text-slate-400'
              }`}
            >
              Light Theme
            </button>
          </div>
        </div>

        {/* Privacy & Data Deletion */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-xs font-bold text-white">Privacy & Local Health Data</h4>
              <p className="text-[11px] text-slate-400">Zero sensitive tracking. Clear all local storage safely.</p>
            </div>
          </div>

          <button
            onClick={handleClearData}
            className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Local Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
