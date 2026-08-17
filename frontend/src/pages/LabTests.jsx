import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, ShieldCheck, Calendar, Clock, Home } from 'lucide-react';
import { initialLabTests } from '../data/mockLabTests';
import confetti from 'canvas-confetti';

export function LabTests() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookTest = (test) => {
    setSelectedTest(test);
    setIsBooked(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Lab Tests at Home & Health Checkups</h2>
          <p className="text-xs text-slate-400">NABL certified labs with free home sample collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialLabTests.map((test) => (
          <div key={test.id} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {test.category}
                </span>
                <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
                  {test.discount}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{test.name}</h3>

              <div className="mt-3 space-y-1.5">
                <p className="text-[11px] text-slate-400">Includes:</p>
                <div className="flex flex-wrap gap-1">
                  {test.includes.map((inc, i) => (
                    <span key={i} className="text-[10px] bg-[#121622] border border-[#1E2638] text-slate-300 px-2 py-0.5 rounded-md">
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400 space-y-1">
                <p>🧪 Sample: <span className="text-slate-200">{test.sampleType}</span></p>
                <p>⏰ Report Delivery: <span className="text-cyan-300 font-medium">{test.reportTime}</span></p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1C2436] flex items-center justify-between">
              <div>
                <span className="text-xs line-through text-slate-500 mr-2">₹{test.originalPrice}</span>
                <span className="text-base font-bold text-emerald-400">₹{test.price}</span>
              </div>

              <button
                onClick={() => handleBookTest(test)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white text-xs font-semibold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                Book Home Sample
              </button>
            </div>
          </div>
        ))}
      </div>

      {isBooked && selectedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 max-w-sm w-full text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Sample Collection Booked!</h3>
            <p className="text-xs text-slate-300">
              A certified phlebotomist will arrive tomorrow morning between 07:00 AM - 08:30 AM for <span className="text-cyan-300 font-semibold">{selectedTest.name}</span>.
            </p>
            <button
              onClick={() => setIsBooked(false)}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
