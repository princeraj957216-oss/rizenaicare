import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, Heart, Building2, Flame } from 'lucide-react';
import { emergencyHelplines, firstAidGuides } from '../data/emergencyDirectory';
import { initialHospitals } from '../data/mockHospitals';

export function EmergencyHelp() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Red Alert Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-red-900/50 to-[#1A0B14] border-2 border-red-500/50 rounded-3xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500 text-white flex items-center justify-center animate-bounce shadow-lg">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-white">Emergency Healthcare Assistance (SOS)</h2>
            <p className="text-xs text-red-200">If you or someone nearby is experiencing a life-threatening crisis, contact your local emergency medical service immediately.</p>
          </div>
        </div>
      </div>

      {/* Quick Helplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {emergencyHelplines.map((line, idx) => (
          <div
            key={idx}
            className="bg-[#0D111A] border border-red-500/30 hover:border-red-500 rounded-3xl p-4 flex flex-col justify-between space-y-3 transition-all"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">{line.type}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{line.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1">{line.desc}</p>
            </div>

            <a
              href={`tel:${line.number.replace(/\s+/g, '')}`}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {line.number}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Nearby 24/7 ER Hospitals */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>24/7 Emergency Rooms & Trauma Centers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {initialHospitals.map(hosp => (
            <div key={hosp.id} className="bg-[#121622] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">{hosp.name}</h4>
                <p className="text-[11px] text-slate-400">{hosp.address} • {hosp.distanceKm} km</p>
                <p className="text-[10px] text-emerald-400 mt-0.5">24x7 Emergency Dept Active</p>
              </div>
              <a
                href={`tel:${hosp.emergencyPhone}`}
                className="px-3 py-1.5 rounded-xl bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-bold flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call ER</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* First Aid Instructions */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Emergency First Aid Step-by-Step Guides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {firstAidGuides.map(guide => (
            <div key={guide.id} className="bg-[#121622] border border-[#1E2638] rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-purple-300">{guide.title}</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {guide.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">{i+1}.</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
