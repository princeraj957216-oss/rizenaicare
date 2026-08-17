import React, { useState } from 'react';
import { UserCheck, Search, MapPin, Star, Calendar, Building, Phone, Filter } from 'lucide-react';
import { initialDoctors } from '../data/mockDoctors';
import { useLocationContext } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { AppointmentModal } from '../components/common/AppointmentModal';

export function FindDoctors({ onNavigate }) {
  const { specialization, setSpecialization, location, specializationsList } = useLocationContext();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialization || 'All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = initialDoctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpecialty === 'All' || doc.specialization.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{t('nav.findDoctors', 'Find Doctors & Specialists')}</h2>
            <p className="text-xs text-slate-400">Verified medical practitioners near <span className="text-cyan-300">{location}</span></p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search doctor by name, specialty, or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121622] border border-[#20283E] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="bg-[#121622] border border-[#20283E] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="All">All Specializations</option>
            {specializationsList.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0D111A] border border-[#1E2638] hover:border-cyan-500/40 rounded-3xl p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            <div className="flex items-start gap-4">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/40 shrink-0 shadow-md"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white truncate">{doc.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-purple-300 font-medium">{doc.specialization}</p>
                <p className="text-[11px] text-slate-400">{doc.qualification} • {doc.experience}</p>

                <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <p className="flex items-center gap-1.5 truncate">
                    <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{doc.hospital}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{doc.distanceKm} km away from your location</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1C2436] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500">Consultation Fee</span>
                <p className="text-sm font-bold text-emerald-400">{doc.fee}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-[0_0_12px_rgba(99,102,241,0.4)] transition-all"
                >
                  Book Appointment
                </button>
              </div>
            </div>
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
