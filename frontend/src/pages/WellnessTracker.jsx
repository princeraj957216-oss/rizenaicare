import React, { useState } from 'react';
import { Activity, Footprints, Moon, Droplets, HeartPulse, Plus, Minus, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function WellnessTracker() {
  const [waterGlasses, setWaterGlasses] = useState(5);
  const [steps, setSteps] = useState(6842);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [heartRate, setHeartRate] = useState(72);

  // BMI Calculator State
  const [weightKg, setWeightKg] = useState(68);
  const [heightCm, setHeightCm] = useState(172);

  const bmi = (weightKg / ((heightCm / 100) * (heightCm / 100))).toFixed(1);

  const addGlass = () => {
    const next = waterGlasses + 1;
    setWaterGlasses(next);
    if (next === 8) {
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Daily Wellness & Activity Tracker</h2>
          <p className="text-xs text-slate-400">Log hydration, sleep, steps, and general vital stats</p>
        </div>
      </div>

      {/* 4 Interactive Trackers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Water Logger */}
        <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Water Intake</h3>
            </div>
            <span className="text-xs font-bold text-cyan-400">{waterGlasses} / 8 Glasses</span>
          </div>

          <div className="flex gap-1.5 justify-center py-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                onClick={() => setWaterGlasses(i + 1)}
                className={`w-7 h-10 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
                  i < waterGlasses
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                    : 'bg-[#121622] border-[#1E2638] text-slate-600'
                }`}
              >
                💧
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setWaterGlasses(prev => Math.max(0, prev - 1))}
              className="px-3 py-1.5 bg-[#141A28] text-slate-300 rounded-xl text-xs"
            >
              - 1 Glass
            </button>
            <button
              onClick={addGlass}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-xs font-semibold shadow-glow-cyan"
            >
              + Add Glass
            </button>
          </div>
        </div>

        {/* Steps Tracker */}
        <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Footprints className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Daily Steps</h3>
            </div>
            <span className="text-xs font-bold text-blue-400">{steps.toLocaleString()} / 10,000</span>
          </div>

          <div className="w-full bg-[#121622] h-3 rounded-full overflow-hidden border border-[#1E2638]">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
              style={{ width: `${Math.min(100, (steps / 10000) * 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setSteps(prev => Math.max(0, prev - 500))}
              className="px-3 py-1.5 bg-[#141A28] text-slate-300 rounded-xl text-xs"
            >
              - 500
            </button>
            <button
              onClick={() => setSteps(prev => prev + 500)}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-glow-blue"
            >
              + 500 Steps
            </button>
          </div>
        </div>
      </div>

      {/* BMI Calculator Widget */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Body Mass Index (BMI) Reference Calculator</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Weight: {weightKg} kg</span>
            </div>
            <input
              type="range"
              min="30"
              max="140"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Height: {heightCm} cm</span>
            </div>
            <input
              type="range"
              min="100"
              max="220"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-purple-400"
            />
          </div>
        </div>

        <div className="bg-[#121622] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Your Calculated BMI</span>
            <div className="text-xl font-bold text-white">{bmi} kg/m²</div>
          </div>
          <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
            bmi >= 18.5 && bmi <= 24.9 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            {bmi >= 18.5 && bmi <= 24.9 ? 'Normal Healthy Weight' : 'Consider Consulting Dietitian'}
          </span>
        </div>
      </div>
    </div>
  );
}
