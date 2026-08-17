import React, { useState, useEffect } from 'react';
import { Pill, Sparkles, AlertCircle, ShieldAlert, CheckCircle, Download, Volume2, Square, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { getMedicineInfoAPI } from '../services/api';
import { exportToPDF } from '../services/pdfGenerator';
import { ToolLanguageSelector } from '../components/common/ToolLanguageSelector';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';
import { ReportUploadCard } from '../components/common/ReportUploadCard';

export function ProblemToMedicine({ initialQuery = '' }) {
  const { currentLang, t } = useLanguage();
  const [toolLang, setToolLang] = useState(currentLang);
  const { isListening, isSpeaking, speakingId, startListening, stopListening, speakText, stopSpeaking } = useVoice();

  const [problemInput, setProblemInput] = useState(initialQuery);
  const [medicineData, setMedicineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleFetchInfo(initialQuery);
    }
  }, [initialQuery]);

  const handleFetchInfo = async (query = null) => {
    const term = query || problemInput;
    if (!term || !term.trim()) return;

    setIsLoading(true);
    try {
      const result = await getMedicineInfoAPI(term.trim(), toolLang);
      setMedicineData(result);
    } catch (e) {
      alert('Failed to retrieve medicine info. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!medicineData) return;
    exportToPDF({
      title: `Medicine Information Guide: ${medicineData.problem}`,
      category: 'Pharmacological Education & Precautions',
      language: toolLang.toUpperCase(),
      content: medicineData
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t('nav.problemMedicine', 'Problem → Medicine Information')}</span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-pink-500 text-white uppercase">New</span>
            </h2>
            <p className="text-xs text-slate-400">Therapeutic classes, active mechanisms & safety precautions</p>
          </div>
        </div>

        <ToolLanguageSelector selectedLang={toolLang} onSelectLang={setToolLang} />
      </div>

      {/* Safety Notice */}
      <MedicalDisclaimerBadge text="This tool provides general medicine information and does NOT generate prescriptions. Never start, stop, or modify prescription dosages without consulting a licensed physician." />

      {/* Input Search Card */}
      <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-xl space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); handleFetchInfo(); }} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">
            Enter Health Problem, Symptom, or Condition
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              required
              placeholder="E.g. Headache, Fever, Cough, Acidity, Allergy, Back Pain..."
              value={problemInput}
              onChange={(e) => setProblemInput(e.target.value)}
              className="flex-1 bg-[#121622] border border-[#20283E] rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              disabled={isLoading || !problemInput.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Retrieving Info...' : 'Get Information'}</span>
            </button>
          </div>

          {/* Quick Problem Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
            <span className="text-[11px] text-slate-500">Quick Select:</span>
            {['Fever', 'Headache', 'Acidity & Gas', 'Dry Cough', 'Muscle Soreness'].map((prob) => (
              <button
                key={prob}
                type="button"
                onClick={() => { setProblemInput(prob); handleFetchInfo(prob); }}
                className="px-2.5 py-1 rounded-lg bg-[#141A28] hover:bg-[#1C253B] border border-[#1E2638] text-[11px] text-slate-300 hover:text-pink-300 transition-colors"
              >
                {prob}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Output Display Card */}
      {medicineData && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E2638]">
              <div>
                <span className="text-[10px] text-pink-400 font-semibold tracking-wider uppercase">Problem Analyzed</span>
                <h3 className="text-lg font-bold text-white">{medicineData.problem}</h3>
                <p className="text-xs text-purple-300 font-medium mt-0.5">{medicineData.category}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const speech = `${medicineData.problem}. ${medicineData.purpose}. Precautions: ${medicineData.precautions?.join('. ')}`;
                    speakText(speech, 'med-info', toolLang);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 text-xs font-medium flex items-center gap-1.5"
                >
                  {isSpeaking && speakingId === 'med-info' ? (
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

            {/* Common Therapeutic Classes */}
            {medicineData.commonClasses && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Commonly Utilized Medication Classes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {medicineData.commonClasses.map((cls, idx) => (
                    <div key={idx} className="bg-[#121622] border border-[#1E2638] rounded-xl p-3 text-xs font-medium text-slate-200 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{cls}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Purpose */}
            {medicineData.purpose && (
              <div className="bg-[#121622] border border-[#1E2638] rounded-2xl p-4 space-y-1">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">General Purpose of Treatment</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{medicineData.purpose}</p>
              </div>
            )}

            {/* Essential Precautions */}
            {medicineData.precautions && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Essential Precautions & Safety Guidelines</span>
                </h4>
                <div className="space-y-2">
                  {medicineData.precautions.map((prec, idx) => (
                    <div key={idx} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{prec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions to Ask Doctor / Pharmacist */}
            {medicineData.questionsForPharmacist && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Recommended Questions to Ask Your Pharmacist
                </h4>
                <div className="space-y-1.5">
                  {medicineData.questionsForPharmacist.map((q, idx) => (
                    <div key={idx} className="bg-[#121622] border border-[#1E2638] rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Report File Upload Option Added After Result Generation */}
          <ReportUploadCard contextProblem={medicineData.problem} toolName="Problem → Medicine" />
        </div>
      )}
    </div>
  );
}
