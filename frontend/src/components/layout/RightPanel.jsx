import React, { useState } from 'react';
import { MapPin, Crosshair, ChevronDown, CheckCircle2, Star, Navigation, ArrowRight, Heart } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import { initialDoctors } from '../../data/mockDoctors';
import { initialHospitals } from '../../data/mockHospitals';
import { AppointmentModal } from '../common/AppointmentModal';
import { LocationModal } from '../common/LocationModal';

export function RightPanel({ onNavigate }) {
  const { location, specialization, setSpecialization, detectLocation, isLocating, specializationsList } = useLocationContext();
  const { t } = useLanguage();

  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Filter doctors & hospitals dynamically based on selected specialization
  const filteredDoctors = initialDoctors.filter(d => 
    d.specialization.toLowerCase().includes(specialization.toLowerCase()) ||
    specialization.toLowerCase().includes(d.specialization.toLowerCase())
  ).slice(0, 3);

  const displayDoctors = filteredDoctors.length > 0 ? filteredDoctors : initialDoctors.slice(0, 3);

  const filteredHospitals = initialHospitals.filter(h =>
    h.specializations.some(s => s.toLowerCase().includes(specialization.toLowerCase()))
  ).slice(0, 3);

  const displayHospitals = filteredHospitals.length > 0 ? filteredHospitals : initialHospitals.slice(0, 3);

  return (
    <aside className="w-80 bg-[#07090E] border-l border-[#161D2B] p-4 space-y-4 select-none overflow-y-auto custom-scrollbar h-screen sticky top-0 shrink-0">
      {/* 1. Your Location & Preference Card */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-slate-100">{t('rightPanel.locationPref', 'Your Location & Preference')}</h3>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline"
          >
            {t('rightPanel.edit', 'Edit')}
          </button>
        </div>

        {/* Location Row */}
        <div className="flex items-center justify-between bg-[#121622] border border-[#1E2638] rounded-xl px-3 py-2 mb-2.5">
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-xs text-slate-200 truncate">{location}</span>
          </div>
          <button
            onClick={detectLocation}
            disabled={isLocating}
            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Auto-detect Location (GPS)"
          >
            <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

        {/* Specialization Selector */}
        <div className="relative flex items-center bg-[#121622] border border-[#1E2638] rounded-xl px-3 py-2">
          <Heart className="w-3.5 h-3.5 text-pink-400 mr-2 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Specialization</p>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none cursor-pointer"
            >
              {specializationsList.map((spec) => (
                <option key={spec} value={spec} className="bg-[#0D111A] text-slate-200">
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 2. Upcoming Appointments Card */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-semibold text-slate-100">{t('rightPanel.upcomingAppointments', 'Upcoming Appointments')}</h3>
          <button
            onClick={() => onNavigate('bookAppointment')}
            className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline"
          >
            {t('rightPanel.viewAll', 'View All')}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mb-3">
          Based on your location & specialization (<span className="text-cyan-400">{specialization}</span>)
        </p>

        {/* Appointments List */}
        <div className="space-y-2.5">
          {displayDoctors.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between bg-[#121622] border border-[#1E2638] hover:border-cyan-500/30 rounded-xl p-2.5 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-9 h-9 rounded-full object-cover border border-cyan-500/40 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-slate-100 truncate">{doc.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{doc.specialization}</p>
                  <p className="text-[9px] text-slate-500 truncate">{doc.hospital}</p>
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <div className="text-[10px] font-medium text-slate-300">{doc.availableTime.split(' ')[0]}</div>
                <div className="text-[9px] text-slate-500 mb-1">{doc.availableTime.split(' ').slice(1).join(' ')}</div>
                <button
                  onClick={() => setSelectedDoctorForBooking(doc)}
                  className="px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-[10px] font-semibold transition-all shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                >
                  {t('rightPanel.book', 'Book')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Showing available badge */}
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('rightPanel.showingAvailable', 'Showing available appointments near you')}</span>
        </div>
      </div>

      {/* 3. Nearby Hospitals Card */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-semibold text-slate-100">{t('rightPanel.nearbyHospitals', 'Nearby Hospitals')}</h3>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline"
          >
            {t('rightPanel.viewAll', 'View All')}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mb-3">
          Based on your location & specialization (<span className="text-cyan-400">{specialization}</span>)
        </p>

        {/* Hospital List */}
        <div className="space-y-2.5">
          {displayHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="flex items-center justify-between bg-[#121622] border border-[#1E2638] rounded-xl p-2.5 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={hosp.image}
                  alt={hosp.name}
                  className="w-10 h-10 rounded-lg object-cover border border-[#252F48] shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-slate-100 truncate">{hosp.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{hosp.address}</p>
                  <p className="text-[9px] text-slate-500">{hosp.distanceKm} km away</p>
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <div className="flex items-center justify-end gap-1 text-[10px] font-semibold text-amber-400 mb-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{hosp.rating}</span>
                </div>
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ' ' + hosp.address)}`, '_blank')}
                  className="px-2.5 py-1 rounded-lg bg-[#192133] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-medium transition-colors"
                >
                  {t('rightPanel.directions', 'Directions')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See more hospitals link */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-3 w-full text-center text-[11px] text-purple-400 hover:text-purple-300 font-medium flex items-center justify-center gap-1 hover:underline"
        >
          <span>{t('rightPanel.seeMore', 'See more hospitals near you')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modals */}
      <AppointmentModal
        isOpen={!!selectedDoctorForBooking}
        doctor={selectedDoctorForBooking}
        onClose={() => setSelectedDoctorForBooking(null)}
      />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
    </aside>
  );
}
