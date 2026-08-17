import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Bot, Stethoscope, Pill, UserCheck, AlertTriangle } from 'lucide-react';
import { navItems } from './Sidebar';
import { useLanguage } from '../../context/LanguageContext';

export function MobileNav({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* Top Mobile Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-[#07090E] border-b border-[#161D2B] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs">RC</span>
          </div>
          <div>
            <h1 className="font-bold text-sm text-white">RIZEN CARE</h1>
            <p className="text-[9px] text-cyan-400 font-semibold tracking-wider uppercase">AI HEALTH ASSISTANT</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-[#0D111A] border border-[#1E2638] text-slate-300"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 top-14 bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-300 hover:bg-[#121622]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span>{t(item.labelKey, item.defaultLabel)}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Quick Touch Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0D14]/95 backdrop-blur-lg border-t border-[#1E2638] px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActivePage('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activePage === 'dashboard' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActivePage('aiHealthAssistant')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activePage === 'aiHealthAssistant' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-4 h-4 mb-0.5" />
          <span>AI Chat</span>
        </button>
        <button
          onClick={() => setActivePage('symptomChecker')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activePage === 'symptomChecker' ? 'text-blue-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Stethoscope className="w-4 h-4 mb-0.5" />
          <span>Symptom</span>
        </button>
        <button
          onClick={() => setActivePage('problemMedicine')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activePage === 'problemMedicine' ? 'text-pink-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Pill className="w-4 h-4 mb-0.5" />
          <span>Medicine</span>
        </button>
        <button
          onClick={() => setActivePage('emergencyHelp')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activePage === 'emergencyHelp' ? 'text-red-400 font-bold' : 'text-slate-400'
          }`}
        >
          <AlertTriangle className="w-4 h-4 mb-0.5" />
          <span>SOS</span>
        </button>
      </div>
    </>
  );
}
