import React, { useState } from 'react';
import { MapPin, Navigation, Search, X, Check, Building2, Send, Loader2 } from 'lucide-react';
import { useLocationContext, popularCitiesList } from '../../context/LocationContext';

export function LocationModal({ isOpen, onClose }) {
  const { location, setLocation, detectLocation, lookupPinCode, isLocating, locationError } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isPinLoading, setIsPinLoading] = useState(false);

  if (!isOpen) return null;

  const filteredCities = popularCitiesList.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (city) => {
    setLocation(city);
    onClose();
  };

  const handleManualSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(searchQuery.trim());
      onClose();
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pinCode.trim().length >= 4) {
      setIsPinLoading(true);
      await lookupPinCode(pinCode.trim());
      setIsPinLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0D111A] text-slate-100 border border-[#1E2638] rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
          <div className="flex items-center gap-2 font-bold text-base text-white">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <span>Choose Your Location</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#161D2B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Location Display */}
        <div className="mt-3.5 px-3.5 py-2.5 bg-[#121622] border border-[#1E2638] rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current:</span>
            <span className="text-xs font-semibold text-cyan-300 truncate">{location}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* GPS Live Auto-Detect Button */}
        <div className="my-3.5">
          <button
            onClick={() => {
              detectLocation(() => onClose());
            }}
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] disabled:opacity-50"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Detecting GPS Location...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Use My Live Location (GPS Auto-Detect)</span>
              </>
            )}
          </button>
          {locationError && (
            <p className="mt-2 text-[11px] text-amber-400 leading-tight">{locationError}</p>
          )}
        </div>

        {/* Type Any Place Name / Search Form */}
        <form onSubmit={handleManualSearchSubmit} className="mb-3">
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Search or Type Any City / Place Name
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Type city (e.g. Delhi, Lucknow, Bengaluru)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121622] border border-[#1E2638] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            {searchQuery.trim() && (
              <button
                type="submit"
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Set
              </button>
            )}
          </div>
        </form>

        {/* PIN Code Lookup */}
        <form onSubmit={handlePinSubmit} className="mb-3.5">
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Or Enter 6-Digit PIN Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 211001 or 110001"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="flex-1 bg-[#121622] border border-[#1E2638] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={isPinLoading || pinCode.trim().length < 4}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)] shrink-0 flex items-center gap-1.5"
            >
              {isPinLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Apply PIN</span>}
            </button>
          </div>
        </form>

        {/* Popular Cities Quick Select List */}
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
            Popular Cities
          </span>
          <div className="max-h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleSelectCity(city)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                  location === city
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-[#151B2A] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{city}</span>
                </div>
                {location === city && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
