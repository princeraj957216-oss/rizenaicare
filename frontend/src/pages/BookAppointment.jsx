import React, { useState } from 'react';
import { CalendarCheck, MapPin, Search, Building2, Star } from 'lucide-react';
import { initialDoctors } from '../data/mockDoctors';
import { initialHospitals } from '../data/mockHospitals';
import { useLocationContext, specializationsList } from '../context/LocationContext';
import { AppointmentModal } from '../components/common/AppointmentModal';
import { resolveIndianPincode, searchHospitalsByLocation } from '../services/api';

export function BookAppointment() {
  const { specialization, location, setLocation, setSpecialization } = useLocationContext();
  const [searchLocation, setSearchLocation] = useState(location);
  const [searchSpecialization, setSearchSpecialization] = useState(specialization);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchedHospitals, setSearchedHospitals] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationError, setLocationError] = useState('');
  const matchesLocation = (value) => !searchLocation.trim() || value.toLowerCase().includes(searchLocation.trim().toLowerCase()) || searchLocation.trim().toLowerCase().includes(value.toLowerCase());
  const matchesSpecialization = (value) => !searchSpecialization || value.toLowerCase().includes(searchSpecialization.toLowerCase()) || searchSpecialization.toLowerCase().includes(value.toLowerCase());
  const doctors = hasSubmitted ? initialDoctors.filter((doc) => matchesLocation(`${doc.city} ${doc.hospital}`) && matchesSpecialization(doc.specialization)) : [];
  const localHospitals = hasSubmitted ? initialHospitals.filter((hospital) => matchesLocation(`${hospital.city} ${hospital.address}`) && (!searchSpecialization || hospital.specializations.some(matchesSpecialization))) : [];
  const shownDoctors = doctors;
  const shownHospitals = searchedHospitals;
  const displayedDoctorOptions = shownDoctors.length ? shownDoctors : shownHospitals.slice(0, 3).map((hospital) => ({
    id: `facility-${hospital.id}`,
    name: `${searchSpecialization || 'Medical'} appointment option`,
    specialization: searchSpecialization || 'All specializations',
    hospital: hospital.name,
    address: hospital.address,
    availableTime: 'Contact facility for availability',
    fee: 'Check with facility',
    avatar: null,
    isFacilityOption: true
  }));
  const handleSearch = async (event) => {
    event.preventDefault();
    const cleanLocation = searchLocation.trim();
    const digitsOnly = /^\d+$/.test(cleanLocation);
    if (digitsOnly && !/^[1-9]\d{5}$/.test(cleanLocation)) {
      setLocationError('Enter a valid 6-digit Indian PIN code, or an Indian city/address.');
      setHasSubmitted(false);
      setSearchedHospitals([]);
      return;
    }
    if (!cleanLocation) {
      setLocationError('Enter an Indian city, address, or PIN code.');
      return;
    }
    setLocationError('');
    setSpecialization(searchSpecialization);
    setHasSubmitted(true);
    setIsSearching(true);
    try {
      const pinDetails = await resolveIndianPincode(cleanLocation);
      if (digitsOnly && !pinDetails) throw new Error('That PIN code was not found in India.');
      const effectiveLocation = pinDetails?.label || cleanLocation;
      setSearchLocation(effectiveLocation);
      setLocation(effectiveLocation);
      const remote = await searchHospitalsByLocation(effectiveLocation, searchSpecialization);
      setSearchedHospitals(remote.length ? remote : localHospitals);
    } catch (error) {
      setSearchedHospitals(localHospitals);
      if (digitsOnly && error.message) setLocationError(error.message);
    }
    finally { setIsSearching(false); }
  };

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

      <form onSubmit={handleSearch} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
        <label><span className="field-label">Location / Pincode</span><div className="field-wrap"><MapPin /><input required value={searchLocation} onChange={(event) => { setSearchLocation(event.target.value); setLocationError(''); }} placeholder="Indian city, address, or PIN code" /></div>{locationError && <span className="mt-1 block text-[11px] text-rose-300">{locationError}</span>}</label>
        <label><span className="field-label">Medical Specialization</span><div className="field-wrap"><Search /><select value={searchSpecialization} onChange={(event) => setSearchSpecialization(event.target.value)}><option value="">All specializations</option>{specializationsList.map((item) => <option className="bg-[#0D111A] text-slate-200" key={item} value={item}>{item}</option>)}</select></div></label>
        <button disabled={isSearching} className="md:self-end h-[42px] px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold disabled:opacity-60">{isSearching ? 'Searching…' : 'Find Care'}</button>
      </form>

      {hasSubmitted && <>
      <p className="text-xs text-slate-400">Showing {displayedDoctorOptions.length} appointment options and {shownHospitals.length} hospitals near <span className="text-cyan-300">{searchLocation}</span>.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!displayedDoctorOptions.length && <p className="text-xs text-slate-400 md:col-span-2">No verified doctors or facilities found for this location and specialization.</p>}
        {displayedDoctorOptions.map((doc) => (
          <div key={doc.id} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              {doc.avatar ? <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-cyan-500/40" /> : <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">+</div>}
              <div>
                <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                <p className="text-xs text-purple-300">{doc.specialization}</p>
              </div>
            </div>

            <div className="bg-[#121622] rounded-xl p-3 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Available:</span>
                <span className="font-semibold text-cyan-300 text-right">{doc.availableTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Consultation Fee:</span>
                <span className="font-bold text-emerald-400">{doc.fee}</span>
              </div>
            </div>

            <button
              onClick={() => doc.isFacilityOption ? window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${doc.hospital} ${doc.address}`)}`, '_blank') : setSelectedDoctor(doc)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold hover:opacity-90 shadow-glow-blue transition-all"
            >
              {doc.isFacilityOption ? 'View Hospital Options' : 'Select Slot & Book'}
            </button>
          </div>
        ))}
      </div>
      <div className="space-y-3"><h3 className="text-sm font-bold text-white">Hospitals accepting appointments</h3>{!isSearching && !shownHospitals.length && <p className="text-xs text-slate-400">No facilities found in this selected location.</p>}<div className="grid grid-cols-1 md:grid-cols-2 gap-3">{shownHospitals.map((hospital) => <div key={hospital.id} className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Building2 className="w-8 h-8 text-cyan-400" /><div><h4 className="text-xs font-bold text-white">{hospital.name}</h4><p className="text-[11px] text-slate-400">{hospital.address}</p><span className="text-[10px] text-amber-300 flex items-center gap-1 mt-1">{hospital.rating ? <><Star className="w-3 h-3 fill-current" /> {hospital.rating}</> : hospital.source || 'Selected location'}</span></div></div><span className="text-[10px] text-cyan-300">Appointments</span></div>)}</div></div>
      </>}

      <AppointmentModal
        isOpen={!!selectedDoctor}
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
}
