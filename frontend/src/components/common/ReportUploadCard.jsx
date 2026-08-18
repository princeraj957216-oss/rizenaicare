import React, { useState } from 'react';
import { UploadCloud, FileText, Sparkles, CheckCircle, AlertCircle, X, Download, Volume2, Square, Loader2 } from 'lucide-react';
import { uploadReportAPI } from '../../services/api';
import { exportToPDF } from '../../services/pdfGenerator';
import { useVoice } from '../../context/VoiceContext';

export function ReportUploadCard({ contextProblem = '', toolName = 'Health Tool' }) {
  const { isSpeaking, speakingId, speakText, stopSpeaking } = useVoice();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const analyzeFile = async (uploadedFile) => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('report', uploadedFile);
    if (contextProblem) {
      formData.append('context', contextProblem);
    }

    try {
      const data = await uploadReportAPI(formData);
      setReportResult(data);
    } catch (err) {
      setUploadError(err.message || 'Only valid medical reports are supported.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    await analyzeFile(file);
  };

  const handleExportPDF = () => {
    if (!reportResult) return;
    exportToPDF({
      title: `Correlated Report Analysis: ${file ? file.name : 'Report'}`,
      category: `${toolName} Clinical Correlation`,
      language: 'EN',
      content: reportResult
    });
  };

  return (
    <div className="bg-[#0D111A] border-2 border-dashed border-[#252F48] hover:border-cyan-500/40 rounded-3xl p-5 md:p-6 shadow-xl transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-purple-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
              <span>Have a Lab Report or Prescription? Upload for AI Cross-Analysis</span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Optional
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Upload blood tests, prescription photos, or radiology reports (PDF, JPG, PNG) to correlate with your {toolName.toLowerCase()} results.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      {!reportResult && (
        <form onSubmit={handleFileUpload} className="space-y-3">
          {uploadError && <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200"><AlertCircle className="w-4 h-4 shrink-0 text-rose-300" /><span>{uploadError}</span></div>}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  if (selectedFile) analyzeFile(selectedFile);
                }}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer bg-[#121622] border border-[#1E2638] rounded-xl p-1"
              />
            </div>

            <button
              type="submit"
              disabled={!file || isAnalyzing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting & Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Uploaded Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Report Analysis Results Display */}
      {reportResult && (
        <div className="bg-[#121622] border border-cyan-500/40 rounded-2xl p-5 space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1E2638]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">Analysis Result: {reportResult.documentName}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const speech = `Uploaded report findings: ${reportResult.aiInterpretation?.summary || 'Analysis complete'}`;
                  speakText(speech, 'report-upload-result');
                }}
                className="px-2.5 py-1 bg-[#1A2234] border border-[#25324D] text-slate-300 text-[11px] rounded-lg flex items-center gap-1"
              >
                {isSpeaking && speakingId === 'report-upload-result' ? (
                  <>
                    <Square className="w-3 h-3 text-red-400 fill-red-400" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3 text-cyan-400" />
                    <span>Speak</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportPDF}
                className="px-2.5 py-1 bg-purple-600/30 border border-purple-500/40 text-purple-300 text-[11px] rounded-lg flex items-center gap-1 font-semibold"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>

              <button
                onClick={() => { setReportResult(null); setFile(null); }}
                className="p-1 text-slate-400 hover:text-white"
                title="Upload another document"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Parameters Table */}
          {reportResult.extractedData?.parameters && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D111A] text-slate-400 border-b border-[#1E2638]">
                  <tr>
                    <th className="p-2">Parameter</th>
                    <th className="p-2">Extracted Value</th>
                    <th className="p-2">Reference Range</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2638] text-slate-200">
                  {reportResult.extractedData.parameters.map((p, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{p.name}</td>
                      <td className="p-2 font-bold text-white">{p.value}</td>
                      <td className="p-2 text-slate-400">{p.reference}</td>
                      <td className="p-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {reportResult.extractedData?.rawSummary && (
            <div className="rounded-xl bg-[#0D111A] border border-[#1E2638] p-3 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Extracted report details</h4>
              <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-400">{reportResult.extractedData.rawSummary}</p>
            </div>
          )}

          {reportResult.extractedData?.medicines?.length > 0 && (
            <div className="rounded-xl bg-[#0D111A] border border-[#1E2638] p-3 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Medicines mentioned in document</h4>
              <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">{reportResult.extractedData.medicines.map((medicine, index) => <li key={index}>{medicine}</li>)}</ul>
            </div>
          )}

          {reportResult.extractedData?.observations?.length > 0 && (
            <div className="rounded-xl bg-[#0D111A] border border-[#1E2638] p-3 space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Observations from document</h4>
              <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">{reportResult.extractedData.observations.map((observation, index) => <li key={index}>{observation}</li>)}</ul>
            </div>
          )}

          {/* AI Clinical Interpretation */}
          {reportResult.aiInterpretation && (
            <div className="space-y-1 text-xs text-slate-300">
              <span className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">
                AI Analysis Result
              </span>
              <p className="leading-relaxed">{reportResult.aiInterpretation.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
