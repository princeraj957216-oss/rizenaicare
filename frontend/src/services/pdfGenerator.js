import jsPDF from 'jspdf';

export function exportToPDF({ title, category, language, content, metadata = {} }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header Banner
  doc.setFillColor(11, 14, 20); // Dark Navy #0B0E14
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Brand Name & Subtitle
  doc.setTextColor(0, 229, 255); // Cyan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('RIZEN CARE', 16, 18);

  doc.setTextColor(139, 92, 246); // Purple
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('AI HEALTH ASSISTANT — CLINICAL GUIDANCE SUMMARY', 16, 26);

  doc.setTextColor(160, 174, 192);
  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Language: ${language || 'EN'}`, 16, 34);

  // Document Title
  doc.setTextColor(20, 25, 35);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title || 'Health Analysis Report', 16, 54);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Category: ${category || 'General Health Guidance'}`, 16, 61);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(16, 65, pageWidth - 16, 65);

  // Body Content
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  let splitText;
  if (typeof content === 'string') {
    splitText = doc.splitTextToSize(content.replace(/[*#_`]/g, ''), pageWidth - 32);
  } else if (typeof content === 'object') {
    const formatted = JSON.stringify(content, null, 2);
    splitText = doc.splitTextToSize(formatted, pageWidth - 32);
  } else {
    splitText = ['No content provided.'];
  }

  let y = 74;
  for (let i = 0; i < splitText.length; i++) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.text(splitText[i], 16, y);
    y += 5.5;
  }

  // Disclaimer Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(248, 250, 252);
  doc.rect(0, pageHeight - 28, pageWidth, 28, 'F');
  
  doc.setDrawColor(203, 213, 225);
  doc.line(0, pageHeight - 28, pageWidth, pageHeight - 28);

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('HEALTHCARE DISCLAIMER:', 16, pageHeight - 20);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  const disclaimerText = 'This report is generated for informational and educational purposes only. It is NOT a medical prescription or clinical diagnosis. Always seek direct medical evaluation from a qualified physician.';
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 32);
  doc.text(splitDisclaimer, 16, pageHeight - 14);

  // Download PDF
  const safeFilename = (title || 'Rizen_Care_Report').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.pdf';
  doc.save(safeFilename);
}
