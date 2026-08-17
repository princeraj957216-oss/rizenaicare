import React from 'react';
import { UploadCloud, BellRing, ShoppingBag, MapPinned, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function QuickActionsRow({ onNavigate }) {
  const { t } = useLanguage();

  const actions = [
    {
      id: 'uploadReports',
      title: t('quickActions.uploadReports', 'Upload Reports'),
      desc: t('quickActions.uploadReportsDesc', 'Get AI insights'),
      icon: UploadCloud,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/15',
      target: 'healthRecords'
    },
    {
      id: 'medicineReminder',
      title: t('quickActions.medicineReminder', 'Medicine Reminder'),
      desc: t('quickActions.medicineReminderDesc', 'Never miss a dose'),
      icon: BellRing,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
      target: 'wellnessTracker'
    },
    {
      id: 'orderMedicines',
      title: t('quickActions.orderMedicines', 'Order Medicines'),
      desc: t('quickActions.orderMedicinesDesc', 'Fast delivery'),
      icon: ShoppingBag,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/15',
      target: 'medicinesPharmacy'
    },
    {
      id: 'trackOrder',
      title: t('quickActions.trackOrder', 'Track Order'),
      desc: t('quickActions.trackOrderDesc', 'Track your orders'),
      icon: MapPinned,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/15',
      target: 'medicinesPharmacy'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            onClick={() => onNavigate(act.target)}
            className="bg-[#0D111A] hover:bg-[#121725] border border-[#1E2638] hover:border-[#2E3B56] rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${act.bgColor} ${act.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-slate-100 truncate">{act.title}</h4>
                <p className="text-[10px] text-slate-400 truncate">{act.desc}</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-1" />
          </button>
        );
      })}
    </div>
  );
}
