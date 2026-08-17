import React, { useState } from 'react';
import { FolderHeart, UploadCloud, FileText, Trash2, Download, Eye, CheckCircle, AlertTriangle, X, Sparkles } from 'lucide-react';
import { uploadReportAPI } from '../services/api';
import { exportToPDF } from '../services/pdfGenerator';
import { MedicalDisclaimerBadge } from '../components/common/MedicalDisclaimerBadge';

export function HealthRecords() {
  const [records, setRecords] = useState([
    {
      id: 'rec-1',
      name: 'Routine_Blood_Investigation.pdf',
      date: '15 May 2024',
      type: 'Complete Blood Count (CBC)',
      summary: 'Normal hemoglobin and white blood cell levels. Fasting glucose slightly elevated at 108 mg/dL.',
      status: 'Reviewed by AI'
    },
    {
      id: 'rec-2',
      name: 'Lipid_Cardio_Panel.pdf',
      date: '28 April 2024',
      type: 'Lipid Profile',
      summary: 'Optimal total cholesterol and triglyceride levels.',
      status: 'Normal'
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('report', selectedFile);

    try {
      const data = await uploadReportAPI(formData);
      const newRecord = {
        id: 'rec-' + Date.now(),
        name: selectedFile.name,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        type: 'Uploaded Lab Report',
        summary: data.aiInterpretation?.summary || 'AI analysis completed.',
        status: 'Reviewed by AI',
        analysisDetails: data
      };

      setRecords(prev => [newRecord, ...prev]);
      setActiveAnalysis(data);
      setSelectedFile(null);
    } catch (err) {
      alert('Failed to analyze report file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <FolderHeart className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Health Records & Medical Report Analyzer</h2>
          <p className="text-xs text-slate-400">Upload PDF / Image reports for structured extraction & plain-language AI explanation</p>
        </div>
      </div>

      <MedicalDisclaimerBadge text="Extracted parameters are distinct from AI interpretations. Always present your original laboratory reports to your doctor." />

      {/* Upload Box */}
      <div className="bg-[#0D111A] border-2 border-dashed border-[#20283E] hover:border-cyan-500/50 rounded-3xl p-6 text-center transition-all">
        <form onSubmit={handleFileUpload} className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Upload Medical Report or Prescription</h3>
            <p className="text-xs text-slate-400 mt-0.5">Supports PDF, JPG, JPEG, and PNG files up to 10MB</p>
          </div>

          <div className="max-w-xs mx-auto">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
            />
          </div>

          {selectedFile && (
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold shadow-glow-blue transition-all"
            >
              {isUploading ? 'Analyzing Document with AI...' : `Analyze ${selectedFile.name}`}
            </button>
          )}
        </form>
      </div>

      {/* Analysis Result View */}
      {activeAnalysis && (
        <div className="bg-[#0D111A] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex justify-between items-center pb-3 border-b border-[#1E2638]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">AI Clinical Interpretation: {activeAnalysis.documentName}</h3>
            </div>
            <button onClick={() => setActiveAnalysis(null)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Extracted Parameters Table */}
          {activeAnalysis.extractedData?.parameters && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {activeAnalysis.extractedData.patientNotice || 'Extracted Laboratory Values'}
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121622] text-slate-400 border-b border-[#1E2638]">
                    <tr>
                      <th className="p-2.5">Test Parameter</th>
                      <th className="p-2.5">Result</th>
                      <th className="p-2.5">Reference Range</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2638] text-slate-200">
                    {activeAnalysis.extractedData.parameters.map((param, i) => (
                      <tr key={i} className="hover:bg-[#131928]">
                        <td className="p-2.5 font-medium">{param.name}</td>
                        <td className="p-2.5 font-bold text-white">{param.value}</td>
                        <td className="p-2.5 text-slate-400">{param.reference}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            param.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {param.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Plain English AI Summary */}
          {activeAnalysis.aiInterpretation && (
            <div className="bg-[#121622] border border-[#20283E] rounded-2xl p-4 space-y-2 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">Plain-Language Medical Explanation</h4>
              <p>{activeAnalysis.aiInterpretation.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* Existing Records List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Your Saved Medical Records ({records.length})</h3>
        <div className="space-y-2.5">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="bg-[#0D111A] border border-[#1E2638] hover:border-[#2A3652] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{rec.name}</h4>
                  <p className="text-[11px] text-purple-300">{rec.type} • {rec.date}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{rec.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => exportToPDF({ title: rec.name, category: rec.type, language: 'EN', content: rec.summary })}
                  className="p-2 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-300 hover:text-cyan-300 text-xs flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(rec.id)}
                  className="p-2 rounded-xl bg-[#141A28] border border-[#1E2638] text-slate-400 hover:text-red-400"
                  title="Delete record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-[#1E2638] rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Delete Medical Record?</h3>
            <p className="text-xs text-slate-400">Are you sure you want to permanently delete this medical record? This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-[#141A28] text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
