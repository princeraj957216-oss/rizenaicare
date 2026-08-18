import React from 'react';
import { FileSpreadsheet, Download, Printer, Share2, Sparkles, CheckCircle } from 'lucide-react';
import { exportToPDF } from '../services/pdfGenerator';
import { ReportUploadCard } from '../components/common/ReportUploadCard';

export function Reports() {
  const reportsData = [
    {
      id: 'rep-1',
      title: 'Comprehensive Health & Wellness Summary',
      date: '17 August 2026',
      score: 82,
      highlights: [
        'Cardiovascular metric normal at 72 bpm resting.',
        'Hydration target met on 5 of 7 days.',
        'Blood sugar borderline, dietary moderation advised.'
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 bg-[#0D111A] border border-[#1E2638] rounded-2xl p-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <FileSpreadsheet className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Generated Clinical Health Reports</h2>
          <p className="text-xs text-slate-400">Download, print, or share your consolidated health summaries</p>
        </div>
      </div>

      <ReportUploadCard toolName="Clinical Health Report" />

      <div className="space-y-4">
        {reportsData.map(rep => (
          <div key={rep.id} className="bg-[#0D111A] border border-[#1E2638] rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap justify-between items-center pb-4 border-b border-[#1E2638]">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Health Score: {rep.score}/100</span>
                <h3 className="text-base font-bold text-white">{rep.title}</h3>
                <p className="text-xs text-slate-400">Generated on {rep.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportToPDF({ title: rep.title, category: 'Comprehensive Health Report', language: 'EN', content: rep.highlights.join('\n\n') })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow-blue"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Key Clinical Insights:</h4>
              <div className="space-y-2">
                {rep.highlights.map((hl, i) => (
                  <div key={i} className="bg-[#121622] rounded-xl p-3 text-xs text-slate-200 flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
