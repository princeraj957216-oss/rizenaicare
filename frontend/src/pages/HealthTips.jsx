import React, { useState } from 'react';
import { Sparkles, HeartPulse, Moon, Salad, Droplets, Activity, Brain } from 'lucide-react';
import { initialHealthTips } from '../data/healthTipsData';

export function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Nutrition', 'Sleep', 'Hydration', 'Heart Health', 'Mental Wellbeing'];

  const filteredTips = initialHealthTips.filter(tip =>
    selectedCategory === 'All' || tip.category === selectedCategory
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Preventive Healthcare & Daily Wellness Tips</h2>
          <p className="text-xs text-slate-400">Scientifically grounded healthy lifestyle practices</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'bg-[#0D111A] border border-[#1E2638] text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-5 space-y-2.5">
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
              {tip.category}
            </span>
            <h3 className="text-sm font-bold text-white">{tip.title}</h3>
            <p className="text-xs text-purple-300 font-medium">{tip.summary}</p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
