import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Plus,
  Send,
  FileText,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Volume2,
  Square,
  Copy,
  Download,
  Bot,
  Stethoscope,
  Pill,
  Activity,
  Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { chatWithAI } from '../services/api';
import { exportToPDF } from '../services/pdfGenerator';
import { ToolLanguageSelector } from '../components/common/ToolLanguageSelector';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';
import { ReportUploadCard } from '../components/common/ReportUploadCard';

export function CreateTool() {
  const { currentLang, t } = useLanguage();
  const [toolLang, setToolLang] = useState(currentLang);
  const { isSpeaking, speakingId, speakText, stopSpeaking } = useVoice();

  const [toolName, setToolName] = useState('Pediatric Fever & Symptom Calculator');
  const [category, setCategory] = useState('Pediatrics');
  const [patientAge, setPatientAge] = useState('4 years');
  const [primarySymptoms, setPrimarySymptoms] = useState('Fever 101.5°F for 2 days with mild cough');
  const [currentMeds, setCurrentMeds] = useState('Paracetamol syrup given 4 hours ago');
  const [additionalNotes, setAdditionalNotes] = useState('Child is active and drinking water');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedToolResult, setGeneratedToolResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const presetToolTemplates = [
    {
      name: 'Pediatric Fever & Symptom Calculator',
      category: 'Pediatrics',
      symptoms: 'Fever 101.5°F for 2 days with mild cough',
      meds: 'Paracetamol syrup given 4 hours ago',
      notes: 'Child is active and drinking fluids'
    },
    {
      name: 'Post-Surgery Recovery Assessor',
      category: 'Surgical Recovery',
      symptoms: 'Mild pain around surgical incision site, low energy',
      meds: 'Prescribed antibiotics and pain relievers',
      notes: 'Surgery was 4 days ago, dressing is clean'
    },
    {
      name: 'Cardiovascular Risk & Vitals Evaluator',
      category: 'Cardiology',
      symptoms: 'Occasional palpitations after climbing stairs',
      meds: 'Amlodipine 5mg once daily',
      notes: 'BP 135/85 mmHg, resting pulse 78 bpm'
    },
    {
      name: 'Diabetic Foot & Neuropathy Checker',
      category: 'Endocrinology',
      symptoms: 'Mild tingling sensation in feet and dry heels',
      meds: 'Metformin 500mg twice daily',
      notes: 'Fasting glucose 130 mg/dL'
    },
    {
      name: 'Medicine Allergy & Interaction Checker',
      category: 'Pharmacology',
      symptoms: 'Mild itching after starting new antibiotic',
      meds: 'Amoxicillin 500mg, Cetirizine 10mg',
      notes: 'History of penicillin sensitivity in childhood'
    }
  ];

  const handleApplyTemplate = (tmpl) => {
    setToolName(tmpl.name);
    setCategory(tmpl.category);
    setPrimarySymptoms(tmpl.symptoms);
    setCurrentMeds(tmpl.meds);
    setAdditionalNotes(tmpl.notes);
  };

  const handleGenerateTool = async (e) => {
    e.preventDefault();
    if (!toolName.trim() || !primarySymptoms.trim()) return;

    setIsGenerating(true);
    const prompt = `Act as a specialized clinical tool: "${toolName}" (${category}).
Patient Profile:
- Age: ${patientAge}
- Primary Symptoms / Problem: ${primarySymptoms}
- Current Medications / Treatments: ${currentMeds}
- Clinical Notes / Vitals: ${additionalNotes}

Generate a comprehensive, structured clinical education result:
1. Tool Assessment Summary
2. Clinical Observations & Parameter Triage
3. General Care & Actionable Guidance
4. Medication Safety & Interaction Notes
5. Warning Signs (Red Flags) Requiring Immediate Physician Attention
6. Key Questions for Doctor / Specialist`;

    try {
      const response = await chatWithAI(prompt, toolLang);
      setGeneratedToolResult({
        toolName,
        category,
        content: response.text,
        disclaimer: response.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      alert('Failed to generate tool output. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedToolResult) return;
    navigator.clipboard.writeText(generatedToolResult.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!generatedToolResult) return;
    exportToPDF({
      title: `${generatedToolResult.toolName} — Clinical Report`,
      category: `Custom Tool (${generatedToolResult.category})`,
      language: toolLang.toUpperCase(),
      content: generatedToolResult.content
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Create a Custom AI Health Tool</span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                AI Builder
              </span>
            </h2>
            <p className="text-xs text-slate-400">Design custom medical calculators, triage tools & upload reports for cross-analysis</p>
          </div>
        </div>

        <ToolLanguageSelector selectedLang={toolLang} onSelectLang={setToolLang} />
      </div>

      <MedicalDisclaimerBadge text="Custom AI tools generate clinical educational guidance. They do not replace formal diagnosis or in-person consultation." />

      {/* Preset Templates */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-4 space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Quick Preset Tool Templates
        </span>
        <div className="flex flex-wrap gap-2">
          {presetToolTemplates.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyTemplate(tmpl)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                toolName === tmpl.name
                  ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                  : 'bg-[#121622] border-[#1E2638] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Builder Form */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-xl space-y-4">
        <form onSubmit={handleGenerateTool} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tool Name / Diagnostic Purpose <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="E.g. Pediatric Fever Calculator, Post-Surgery Recovery Assessor..."
                className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Medical Specialty Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="General Medicine">General Medicine</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Surgical Recovery">Surgical Recovery</option>
                <option value="Pharmacology">Pharmacology & Interactions</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gastroenterology">Gastroenterology</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Patient Age / Demographics
              </label>
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="E.g. 4 years, 35M, 62F..."
                className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current Medications / Treatments
              </label>
              <input
                type="text"
                value={currentMeds}
                onChange={(e) => setCurrentMeds(e.target.value)}
                placeholder="E.g. Paracetamol syrup, Metformin 500mg, none..."
                className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Primary Symptoms / Parameters to Assess <span className="text-pink-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={primarySymptoms}
              onChange={(e) => setPrimarySymptoms(e.target.value)}
              placeholder="Describe symptoms, temperature, duration, severity, or surgical details..."
              className="w-full bg-[#121622] border border-[#20283E] rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Additional Notes / Vitals (Optional)
            </label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="E.g. Blood pressure reading, activity level, fluid intake..."
              className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || !toolName.trim() || !primarySymptoms.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Custom AI Assessment...' : 'Run Tool & Generate Result'}</span>
          </button>
        </form>
      </div>

      {/* Generated Tool Output Display */}
      {generatedToolResult && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-[#0D111A] border border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E2638]">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Custom AI Tool Result ({generatedToolResult.category})
                </span>
                <h3 className="text-base font-bold text-white">{generatedToolResult.toolName}</h3>
                <span className="text-[10px] text-slate-400">Generated at {generatedToolResult.timestamp}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isSpeaking && speakingId === 'custom-tool') {
                      stopSpeaking();
                    } else {
                      speakText(generatedToolResult.content, 'custom-tool', toolLang);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  {isSpeaking && speakingId === 'custom-tool' ? (
                    <>
                      <Square className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Speak</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 text-xs"
                  title="Copy Result"
                >
                  <Copy className="w-4 h-4" />
                </button>

                {copied && <span className="text-xs text-cyan-400 font-bold">Copied!</span>}

                <button
                  onClick={handleExportPDF}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-glow-purple"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Formatted Content */}
            <div className="bg-[#121622] rounded-2xl p-5 text-xs md:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap">
              {generatedToolResult.content}
            </div>
          </div>

          {/* CRITICAL REQUIREMENT: REPORT FILE UPLOAD OPTION AFTER RESULT IS GENERATED */}
          <ReportUploadCard
            contextProblem={`${generatedToolResult.toolName}: ${primarySymptoms}`}
            toolName={generatedToolResult.toolName}
          />
        </div>
      )}
    </div>
  );
}
