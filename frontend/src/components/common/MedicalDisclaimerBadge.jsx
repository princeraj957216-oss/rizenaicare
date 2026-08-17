import React from 'react';
import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function MedicalDisclaimerBadge({ type = 'info', text = null }) {
  const { t } = useLanguage();

  const defaultText = text || 'General medicine information — not a prescription. Consult a doctor for proper diagnosis.';

  return (
    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs leading-relaxed">
      <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-amber-300">Medical Notice: </span>
        <span className="text-amber-200/90">{defaultText}</span>
      </div>
    </div>
  );
}
