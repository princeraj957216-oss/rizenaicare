import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, X, MapPin, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AppointmentModal({ isOpen, doctor, onClose }) {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !doctor) return null;

  const slots = ['10:30 AM', '11:45 AM', '02:30 PM', '04:15 PM', '06:00 PM'];
  const dates = ['Tomorrow', '23 May 2024', '24 May 2024', '25 May 2024'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please fill in patient details');
      return;
    }

    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setPatientName('');
    setPatientPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0D111A] border border-[#1E2638] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 overflow-hidden">
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#161D2B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Appointment Confirmed!</h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">
              Your appointment with <span className="text-cyan-300 font-semibold">{doctor.name}</span> ({doctor.specialization}) at <span className="text-purple-300">{doctor.hospital}</span> has been confirmed.
            </p>
            <div className="bg-[#121622] border border-[#1E2638] rounded-xl p-3.5 text-xs text-slate-300 inline-block text-left space-y-1">
              <div>📅 <strong className="text-white">Date:</strong> {selectedDate}</div>
              <div>⏰ <strong className="text-white">Time Slot:</strong> {selectedSlot}</div>
              <div>👤 <strong className="text-white">Patient:</strong> {patientName}</div>
              <div>📞 <strong className="text-white">Contact:</strong> {patientPhone}</div>
            </div>
            <div>
              <button
                onClick={handleReset}
                className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 shadow-glow-blue transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-[#1E2638]">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
              />
              <div>
                <h3 className="font-semibold text-slate-100 text-base">{doctor.name}</h3>
                <p className="text-xs text-purple-300 font-medium">{doctor.specialization}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-cyan-400" />
                  <span>{doctor.hospital}</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Select Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                        selectedDate === d
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                          : 'bg-[#121622] border-[#1E2638] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Available Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 px-1 text-xs rounded-xl border text-center transition-all ${
                        selectedSlot === s
                          ? 'bg-purple-600/30 border-purple-400 text-purple-300 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                          : 'bg-[#121622] border-[#1E2638] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-[#121622] border border-[#1E2638] rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-[#121622] border border-[#1E2638] rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium text-sm hover:opacity-90 shadow-glow-blue transition-all"
                >
                  Confirm Appointment ({doctor.fee || '₹800'})
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
