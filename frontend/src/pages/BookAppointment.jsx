import React, { useState } from 'react';
import { CalendarCheck, UserCheck, Clock, MapPin, Building, ShieldCheck, CheckCircle } from 'lucide-react';
import { initialDoctors } from '../data/mockDoctors';
import { useLocationContext } from '../context/LocationContext';
import { AppointmentModal } from '../components/common/AppointmentModal';

export function BookAppointment() {
  const { specialization, location } = useLocationContext();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <CalendarCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Book In-Person & Video Appointments</h2>
          <p className="text-xs text-slate-400">Direct booking with certified clinic and hospital doctors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialDoctors.map((doc) => (
          <div key={doc.id} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40" />
              <div>
                <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                <p className="text-xs text-purple-300">{doc.specialization}</p>
                <p className="text-[11px] text-slate-400">{doc.hospital}</p>
              </div>
            </div>

            <div className="bg-[#121622] rounded-xl p-3 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Available:</span>
                <span className="font-semibold text-cyan-300">{doc.availableTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Consultation Fee:</span>
                <span className="font-bold text-emerald-400">{doc.fee}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDoctor(doc)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold hover:opacity-90 shadow-glow-blue transition-all"
            >
              Select Slot & Book
            </button>
          </div>
        ))}
      </div>

      <AppointmentModal
        isOpen={!!selectedDoctor}
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
}
