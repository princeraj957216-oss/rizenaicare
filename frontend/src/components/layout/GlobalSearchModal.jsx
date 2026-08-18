import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Stethoscope, Pill, UserCheck, Building2, ChevronRight, Activity } from 'lucide-react';
import { initialDoctors } from '../../data/mockDoctors';
import { initialHospitals } from '../../data/mockHospitals';

export function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const searchPanelRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle or open
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleOutsidePointer = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) onClose();
    };
    const handleOutsideClick = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) onClose();
    };
    document.addEventListener('pointerdown', handleOutsidePointer);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDoctors = q ? initialDoctors.filter(d => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q)) : [];
  const matchedHospitals = q ? initialHospitals.filter(h => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)) : [];

  const handleItemClick = (pageId) => {
    if (onNavigate) onNavigate(pageId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose} onMouseDown={onClose} onTouchStart={onClose}>
      <div ref={searchPanelRef} className="relative w-full max-w-2xl bg-[#0D111A] border border-[#1E2638] rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden" onClick={(event) => event.stopPropagation()} onMouseDown={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1E2638]">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search symptoms, medicines, doctors, hospitals, tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-0.5 rounded text-[11px] bg-[#161D2B] text-slate-400 border border-[#252F48]">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 custom-scrollbar">
          {!query ? (
            <div className="py-6 px-3 text-center">
              <p className="text-xs text-slate-400">Quick Navigation Shortcuts</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button onClick={() => handleItemClick('symptomChecker')} className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#1E2638] text-xs text-cyan-300 hover:border-cyan-500">
                  🩺 Symptom Checker
                </button>
                <button onClick={() => handleItemClick('problemMedicine')} className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#1E2638] text-xs text-purple-300 hover:border-purple-500">
                  💊 Problem → Medicine
                </button>
                <button onClick={() => handleItemClick('bookAppointment')} className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#1E2638] text-xs text-blue-300 hover:border-blue-500">
                  📅 Book Appointment
                </button>
                <button onClick={() => handleItemClick('emergencyHelp')} className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#1E2638] text-xs text-red-300 hover:border-red-500">
                  🚨 Emergency SOS
                </button>
              </div>
            </div>
          ) : (
            <>
              {matchedDoctors.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                    Doctors & Specialists
                  </h4>
                  {matchedDoctors.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => handleItemClick('bookAppointment')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#141A28] text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-xs font-medium text-slate-100">{doc.name}</p>
                          <p className="text-[11px] text-slate-400">{doc.specialization} • {doc.hospital}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}


              {matchedHospitals.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                    Hospitals
                  </h4>
                  {matchedHospitals.map(hosp => (
                    <button
                      key={hosp.id}
                      onClick={() => handleItemClick('dashboard')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#141A28] text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-xs font-medium text-slate-100">{hosp.name}</p>
                          <p className="text-[11px] text-slate-400">{hosp.address} • {hosp.distanceKm} km</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {matchedDoctors.length === 0 && matchedHospitals.length === 0 && (
                <div className="py-6 text-center">
                  <p className="text-xs text-slate-400">No results found for "{query}".</p>
                  <button
                    onClick={() => handleItemClick('aiHealthAssistant')}
                    className="mt-2 text-xs text-cyan-400 hover:underline"
                  >
                    Ask AI Health Assistant about this →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
