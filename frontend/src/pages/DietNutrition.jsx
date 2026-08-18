import React, { useState } from 'react';
import { Apple, Sparkles, Utensils, Droplets, CheckCircle, Download } from 'lucide-react';
import { exportToPDF } from '../services/pdfGenerator';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';

export function DietNutrition() {
  const [goal, setGoal] = useState('Maintain Vitality & Energy');
  const [preference, setPreference] = useState('Vegetarian');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedPlan({
        title: `${preference} — ${goal} Nutrition Plan`,
        profile: `${age} years · ${weight} kg`,
        earlyMorning: 'Warm lemon water with 5 soaked almonds & 2 walnuts',
        breakfast: 'Vegetable oats upma or whole grain paneer toast with green tea and a small bowl of papaya',
        midMorning: 'Tender coconut water or buttermilk (chaas) with roasted seeds',
        lunch: '2 Multigrain rotis, thick bowl of mixed dal, stir-fried spinach/seasonal greens, and cucumber curd salad',
        eveningSnack: 'Roasted makhana (fox nuts) or fruit bowl (apple/guava) with green tea',
        dinner: 'Light dinner: Mixed vegetable lentil soup with grilled tofu/paneer and steamed broccoli',
        hydration: '2.5 to 3.0 Liters daily (sip consistently throughout the day)',
        guidelines: [
          'Chew mindfully and avoid consuming heavy meals within 2 hours of sleeping.',
          'Focus on rich color variety across vegetables for varied phytonutrients.',
          'Limit ultra-processed snacks and excessive refined sugars.',
          `Use your age (${age}) and weight (${weight} kg) as context, but seek a dietitian for medical conditions or a precise calorie target.`
        ]
      });
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Apple className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Diet & Balanced Nutrition Assistant</h2>
          <p className="text-xs text-slate-400">Nutritionally sound, non-restrictive daily wellness meal plans</p>
        </div>
      </div>

      <MedicalDisclaimerBadge text="Promotes healthy eating habits. We strictly avoid extreme restrictive dieting, starvation, or unsafe weight-loss practices." />

      {/* Plan Form */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-xl space-y-4">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label><input required min="1" max="120" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Years" className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500" /></div>
          <div><label className="block text-xs font-semibold text-slate-300 mb-1.5">Weight</label><input required min="2" max="500" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight in kg" className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500" /></div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Health & Wellness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Maintain Vitality & Energy">Maintain Vitality & Daily Energy</option>
              <option value="Heart Healthy & Cholesterol Balance">Heart Healthy & Low Sodium</option>
              <option value="Blood Sugar Stability (Prediabetes/Diabetes Friendly)">Blood Sugar Stability</option>
              <option value="Gut Health & Easy Digestion">Gut Health & High Fiber</option>
              <option value="Immunity & Micronutrient Boost">Immunity & Micronutrient Boost</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dietary Preference</label>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Vegetarian">Vegetarian (Indian Standard)</option>
              <option value="Non-Vegetarian">Non-Vegetarian (Lean Protein)</option>
              <option value="Vegan">Vegan (Plant-Based)</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Designing Nutrition Plan...' : 'Generate Balanced Meal Plan'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Meal Plan Display */}
      {generatedPlan && (
        <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-[#1E2638]">
            <div>
              <h3 className="text-base font-bold text-white">{generatedPlan.title}</h3>
              <p className="text-xs text-emerald-400">{generatedPlan.profile} · 💧 Daily Hydration Target: {generatedPlan.hydration}</p>
            </div>
            <button
              onClick={() => exportToPDF({ title: generatedPlan.title, category: 'Personalized Nutrition Plan', language: 'EN', content: generatedPlan })}
              className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Plan</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-[#121622] rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-amber-400">🌅 Early Morning:</span>
              <p className="text-slate-300 mt-0.5">{generatedPlan.earlyMorning}</p>
            </div>
            <div className="bg-[#121622] rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-cyan-400">🍳 Breakfast:</span>
              <p className="text-slate-300 mt-0.5">{generatedPlan.breakfast}</p>
            </div>
            <div className="bg-[#121622] rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-emerald-400">🥗 Lunch:</span>
              <p className="text-slate-300 mt-0.5">{generatedPlan.lunch}</p>
            </div>
            <div className="bg-[#121622] rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-purple-400">🍵 Evening Snack:</span>
              <p className="text-slate-300 mt-0.5">{generatedPlan.eveningSnack}</p>
            </div>
            <div className="bg-[#121622] rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-pink-400">🍲 Dinner:</span>
              <p className="text-slate-300 mt-0.5">{generatedPlan.dinner}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
