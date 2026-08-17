import React, { useState } from 'react';
import { Search, MapPin, Globe, Sun, Moon, Bell, ChevronDown, User, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocationContext } from '../../context/LocationContext';
import { LocationModal } from '../common/LocationModal';
import { NotificationsModal } from '../common/NotificationsModal';
import { GlobalSearchModal } from './GlobalSearchModal';

export function Header({ onNavigate }) {
  const { t, currentLang, setLanguage, languagesList } = useLanguage();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { location, detectLocation, isLocating } = useLocationContext();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#07090E]/90 backdrop-blur-md border-b border-[#161D2B] px-6 py-3.5 flex items-center justify-between gap-4 select-none">
      {/* Search Bar matching Reference UI with Ctrl + K */}
      <div className="flex-1 max-w-xl">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full bg-[#0D111A] hover:bg-[#121724] border border-[#1E2638] rounded-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 transition-colors shadow-inner"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{t('header.searchPlaceholder', 'Search symptoms, medicines, doctors, hospitals...')}</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-[#161D2B] text-slate-400 border border-[#252F48] shrink-0 font-mono">
            Ctrl + K
          </span>
        </button>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Location Dropdown Button */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-2 bg-[#0D111A] hover:bg-[#121724] border border-[#1E2638] hover:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-slate-200 transition-all shadow-sm group"
          title="Click to change location or enter PIN"
        >
          <MapPin className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-semibold max-w-[150px] truncate">{location}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Global Language Selector */}
        <div className="relative flex items-center bg-[#0D111A] border border-[#1E2638] rounded-xl px-3 py-2 text-xs text-slate-200">
          <Globe className="w-4 h-4 text-cyan-400 mr-1.5 shrink-0" />
          <select
            value={currentLang}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer pr-3"
          >
            {languagesList.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-[#0D111A] text-slate-200">
                {lang.native}
              </option>
            ))}
          </select>
        </div>

        {/* Day / Night Mode Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-[#0D111A] border border-[#1E2638] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all hover:scale-105 shadow-sm"
          title={`Currently in ${theme === 'dark' ? 'Dark' : 'Light'} Mode. Click to switch to ${theme === 'dark' ? 'Light (Day)' : 'Dark (Night)'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400" />
          )}
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-xl bg-[#0D111A] border border-[#1E2638] text-slate-300 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(236,72,153,0.7)]">
            3
          </span>
        </button>

        {/* User Profile Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-0.5 shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onNavigate('settings')}
          title="Settings & Profile"
        >
          <div className="w-full h-full bg-[#0D111A] rounded-full flex items-center justify-center text-slate-300 hover:text-white">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Modals */}
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={onNavigate} />
    </header>
  );
}
