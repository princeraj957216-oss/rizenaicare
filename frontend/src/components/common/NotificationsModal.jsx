import React from 'react';
import { Bell, CheckCheck, Clock, Heart, AlertCircle, X } from 'lucide-react';

export function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Medicine Reminder: Vitamin D3',
      desc: 'Scheduled daily dose after breakfast at 09:30 AM.',
      time: '15 mins ago',
      type: 'reminder',
      unread: true
    },
    {
      id: 'n2',
      title: 'Upcoming Appointment Alert',
      desc: 'Consultation with Dr. Ananya Sharma (Cardiologist) scheduled for Tomorrow 10:30 AM.',
      time: '2 hours ago',
      type: 'appointment',
      unread: true
    },
    {
      id: 'n3',
      title: 'Report Analysis Completed',
      desc: 'Your routine blood checkup report has been successfully analyzed with AI insights.',
      time: 'Yesterday',
      type: 'report',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0D111A] border border-[#1E2638] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-base">
            <Bell className="w-5 h-5 text-purple-400" />
            <span>Notification Center</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#161D2B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 divide-y divide-[#1E2638] max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {notifications.map((n) => (
            <div key={n.id} className="py-3 px-1 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-100">{n.title}</h4>
                  <span className="text-[10px] text-slate-500">{n.time}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
