import React from 'react';
import { Globe } from 'lucide-react';
import { languagesList } from '../../context/LanguageContext';

export function ToolLanguageSelector({ selectedLang, onSelectLang }) {
  return (
    <div className="flex items-center gap-1.5 bg-[#121622] border border-[#1E2638] rounded-lg px-2.5 py-1 text-xs text-slate-300">
      <Globe className="w-3.5 h-3.5 text-cyan-400" />
      <span className="text-slate-400 font-medium">Tool Language:</span>
      <select
        value={selectedLang}
        onChange={(e) => onSelectLang(e.target.value)}
        className="bg-transparent text-cyan-300 font-medium focus:outline-none cursor-pointer pr-1"
      >
        {languagesList.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-[#0D111A] text-slate-200">
            {lang.native} ({lang.label})
          </option>
        ))}
      </select>
    </div>
  );
}
