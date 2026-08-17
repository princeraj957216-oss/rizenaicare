import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, CheckCircle, ShieldAlert, Download, Volume2, Square, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { analyzeSymptomsAPI } from '../services/api';
import { exportToPDF } from '../services/pdfGenerator';
import { ToolLanguageSelector } from '../components/common/ToolLanguageSelector';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';
import { ReportUploadCard } from '../components/common/ReportUploadCard';

export function SymptomChecker() {
  const { currentLang, t } = useLanguage();
  const [toolLang, setToolLang] = useState(currentLang);
  const { isListening, isSpeaking, speakingId, startListening, stopListening, speakText, stopSpeaking } = useVoice();

  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('2-3 days');
  const [severity, setSeverity] = useState('5');
  const [context, setContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    try {
      const data = await analyzeSymptomsAPI(
        { symptoms, duration, severity, context },
        toolLang
      );
      setAnalysisResult(data);
    } catch (err) {
      alert('Error analyzing symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!analysisResult) return;
    exportToPDF({
      title: `Symptom Analysis Report: ${symptoms}`,
      category: 'Symptom Triage & Clinical Education',
      language: toolLang.toUpperCase(),
      content: analysisResult
    });
  };

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'CRITICAL') {
      return { bg: 'bg-red-500/20 border-red-500/40 text-red-400', label: 'CRITICAL / EMERGENCY' };
    }
    if (urgency === 'HIGH') {
      return { bg: 'bg-amber-500/20 border-amber-500/40 text-amber-400', label: 'HIGH URGENCY' };
    }
    if (urgency === 'LOW') {
      return { bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400', label: 'LOW URGENCY / HOME CARE' };
    }
    return { bg: 'bg-blue-500/20 border-blue-500/40 text-cyan-300', label: 'MODERATE URGENCY' };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{t('nav.symptomChecker', 'Symptom Checker')}</h2>
            <p className="text-xs text-slate-400">Structured clinical triage and educational next steps</p>
          </div>
        </div>

        <ToolLanguageSelector selectedLang={toolLang} onSelectLang={setToolLang} />
      </div>

      <MedicalDisclaimerBadge text="Never ignore worsening symptoms or delay in-person clinical consultation. This tool is for general health guidance." />

      {/* Symptom Input Form */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-xl space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Describe your symptoms in detail <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <textarea
                required
                rows={3}
                placeholder="E.g., Throbbing frontal headache accompanied by mild nausea and sensitivity to light..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full bg-[#121622] border border-[#20283E] rounded-2xl p-3.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (isListening) stopListening();
                  else startListening((text) => setSymptoms(prev => prev ? prev + ' ' + text : text), toolLang);
                }}
                className={`absolute right-3 bottom-3 p-2 rounded-xl border transition-all ${
                  isListening ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-[#192133] border-[#2A3652] text-slate-400 hover:text-cyan-300'
                }`}
                title="Voice Input"
              >
                <Stethoscope className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Just started today">Just started today</option>
                <option value="2-3 days">2-3 days</option>
                <option value="1 week">About 1 week</option>
                <option value="More than 2 weeks">More than 2 weeks (Chronic)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Severity Level (1-10)</label>
                <span className="text-xs font-bold text-cyan-400">{severity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Additional Context / Medical History (Optional)
            </label>
            <input
              type="text"
              placeholder="E.g., High blood pressure history, seasonal allergy, desk job..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-[#121622] border border-[#20283E] rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !symptoms.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Analyzing Clinical Indicators...' : 'Check & Analyze Symptoms'}</span>
          </button>
        </form>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-2xl space-y-5">
            {/* Urgency Badge & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E2638]">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-xl border text-xs font-bold ${getUrgencyBadge(analysisResult.urgency).bg}`}>
                  {getUrgencyBadge(analysisResult.urgency).label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const speechText = `${analysisResult.urgencyLabel}. Recommended steps: ${analysisResult.recommendations?.join('. ')}`;
                    speakText(speechText, 'symptom-res', toolLang);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 text-xs font-medium flex items-center gap-1.5"
                >
                  {isSpeaking && speakingId === 'symptom-res' ? (
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
                  onClick={handleDownloadPDF}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-medium flex items-center gap-1.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Possible Related Health Conditions */}
            {analysisResult.possibleCauses && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Commonly Related Conditions (For General Education)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.possibleCauses.map((cause, idx) => (
                    <div key={idx} className="bg-[#121622] border border-[#1E2638] rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supportive Recommendations */}
            {analysisResult.recommendations && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Supportive Care & Next Steps
                </h4>
                <div className="space-y-1.5">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-[#121622] border border-[#1E2638] rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Red Flag Warning Signs */}
            {analysisResult.redFlags && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Critical Red Flags — Seek Immediate Emergency Care If Observed:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.redFlags.map((flag, idx) => (
                    <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Report File Upload Option Added After Result Generation */}
          <ReportUploadCard contextProblem={symptoms} toolName="Symptom Checker" />
        </div>
      )}
    </div>
  );
}
