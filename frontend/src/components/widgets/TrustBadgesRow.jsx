import React from 'react';
import { ShieldCheck, UserCheck2, Sparkles, Headphones } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function TrustBadgesRow() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-5 bg-[#0A0D14] border border-[#161D2B] rounded-2xl select-none">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-200">{t('trust.secure', '100% Secure & Private')}</h4>
          <p className="text-[10px] text-slate-400">{t('trust.secureDesc', 'Your data is encrypted and safe with us')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
          <UserCheck2 className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-200">{t('trust.verified', 'Verified Doctors & Hospitals')}</h4>
          <p className="text-[10px] text-slate-400">{t('trust.verifiedDesc', 'Trusted by thousands of patients')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-200">{t('trust.aiPowered', 'AI Powered Assistance')}</h4>
          <p className="text-[10px] text-slate-400">{t('trust.aiPoweredDesc', 'Smart technology for better healthcare')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
          <Headphones className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-200">{t('trust.support', '24x7 Support')}</h4>
          <p className="text-[10px] text-slate-400">{t('trust.supportDesc', 'We are always here to help you')}</p>
        </div>
      </div>
    </div>
  );
}
