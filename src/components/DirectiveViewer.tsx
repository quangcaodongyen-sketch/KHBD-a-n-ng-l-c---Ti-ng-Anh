import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Copy,
  Check,
  Download,
  Printer,
  Bookmark,
  BookmarkCheck,
  FileText,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface DirectiveViewerProps {
  content: string;
  title: string;
  onSaveToHistory: () => void;
  isSaved: boolean;
}

export const DirectiveViewer: React.FC<DirectiveViewerProps> = ({
  content,
  title,
  onSaveToHistory,
  isSaved,
}) => {
  const [copiedWord, setCopiedWord] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Helper to format HTML for Word export (Ensures metadata lines don't get paragraph indent)
  const formatHtmlForWord = (rawHtml: string) => {
    return rawHtml
      .replace(/<p>(\s*<strong>(Lớp|Unit|Lesson|Khối|Bộ sách|Chủ đề):)/gi, '<p style="text-indent: 0; margin-bottom: 3pt; font-size: 13pt;">$1')
      .replace(/<p>(\s*<em>(Lớp|Unit|Lesson|Khối|Bộ sách|Chủ đề):)/gi, '<p style="text-indent: 0; margin-bottom: 3pt; font-size: 13pt;">$1');
  };

  // Copy HTML for Microsoft Word paste (Chuẩn Nghị định 30/2020: Times New Roman 13pt, thụt lề 1.27cm, căn lề chuẩn)
  const handleCopyForWord = async () => {
    try {
      const container = document.getElementById('directive-markdown-content');
      if (!container) return;

      const formattedBody = formatHtmlForWord(container.innerHTML);

      const htmlContent = `
        <!DOCTYPE html>
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page Section1 {
              size: 210mm 297mm;
              margin: 20mm 15mm 20mm 30mm;
              mso-header-margin: 36pt;
              mso-footer-margin: 36pt;
            }
            div.Section1 { page: Section1; }
            body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.4; color: #000; }
            p { text-indent: 1.27cm; text-align: justify; margin-top: 0; margin-bottom: 6pt; line-height: 1.4; }
            h1 { font-size: 14pt; font-weight: bold; text-align: center; text-indent: 0; margin-top: 8pt; margin-bottom: 4pt; color: #000; text-transform: uppercase; }
            h2 { font-size: 13.5pt; font-weight: bold; text-indent: 0; margin-top: 10pt; margin-bottom: 5pt; color: #000; }
            h3 { font-size: 13pt; font-weight: bold; text-indent: 0; margin-top: 8pt; margin-bottom: 4pt; color: #000; }
            table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
            th, td { border: 1px solid #000; padding: 5pt 7pt; font-size: 13pt; text-align: left; vertical-align: top; line-height: 1.3; text-indent: 0; }
            th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
            td p, th p { text-indent: 0; margin: 0; }
            ul, ol { margin-top: 0; margin-bottom: 6pt; padding-left: 24pt; }
            li { text-indent: 0; line-height: 1.4; text-align: justify; margin-bottom: 3pt; }
            blockquote { color: #1e3a8a; font-weight: bold; background: #eff6ff; border-left: 3pt solid #1d4ed8; padding: 8pt 12pt; margin: 10pt 0; font-style: normal; }
            blockquote p { text-indent: 0; margin-bottom: 4pt; }
          </style>
        </head>
        <body>
          <div class="Section1">
            ${formattedBody}
          </div>
        </body>
        </html>
      `;

      const blobInput = new Blob([htmlContent], { type: 'text/html' });
      const textInput = new Blob([content], { type: 'text/plain' });

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blobInput,
          'text/plain': textInput,
        }),
      ]);

      setCopiedWord(true);
      setTimeout(() => setCopiedWord(false), 2500);
    } catch (err) {
      console.error('Clipboard error:', err);
      // Fallback
      await navigator.clipboard.writeText(content);
      setCopiedWord(true);
      setTimeout(() => setCopiedWord(false), 2500);
    }
  };

  const handleCopyRawText = async () => {
    await navigator.clipboard.writeText(content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleDownloadDoc = () => {
    const htmlHeader = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Giáo án Global Success</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page Section1 {
            size: 210mm 297mm;
            margin: 20mm 15mm 20mm 30mm;
            mso-header-margin: 36pt;
            mso-footer-margin: 36pt;
          }
          div.Section1 { page: Section1; }
          body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.4; color: #000; }
          p { text-indent: 1.27cm; text-align: justify; margin-top: 0; margin-bottom: 6pt; line-height: 1.4; }
          h1 { font-size: 14pt; font-weight: bold; text-align: center; text-indent: 0; margin-top: 8pt; margin-bottom: 4pt; color: #000; text-transform: uppercase; }
          h2 { font-size: 13.5pt; font-weight: bold; text-indent: 0; margin-top: 10pt; margin-bottom: 5pt; color: #000; }
          h3 { font-size: 13pt; font-weight: bold; text-indent: 0; margin-top: 8pt; margin-bottom: 4pt; color: #000; }
          table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
          th, td { border: 1px solid #000; padding: 5pt 7pt; font-size: 13pt; text-align: left; vertical-align: top; line-height: 1.3; text-indent: 0; }
          th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
          td p, th p { text-indent: 0; margin: 0; }
          ul, ol { margin-top: 0; margin-bottom: 6pt; padding-left: 24pt; }
          li { text-indent: 0; line-height: 1.4; text-align: justify; margin-bottom: 3pt; }
          blockquote { color: #1e3a8a; font-weight: bold; background: #eff6ff; border-left: 3pt solid #1d4ed8; padding: 8pt 12pt; margin: 10pt 0; font-style: normal; }
          blockquote p { text-indent: 0; margin-bottom: 4pt; }
        </style>
      </head>
      <body>
        <div class="Section1">
    `;
    const htmlFooter = "</div></body></html>";
    const container = document.getElementById('directive-markdown-content');
    if (!container) return;

    const formattedBody = formatHtmlForWord(container.innerHTML);
    const sourceHTML = htmlHeader + formattedBody + htmlFooter;
    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Dinh_Huong_KHBD.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Giao_An.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  // Convert HTML <br> tags to markdown newlines (two spaces + newline) to prevent ReactMarkdown from escaping them
  const processedContent = content.replace(/<br\s*\/?>/gi, '  \n');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Top Action Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-secondary-500/20 text-secondary-400 flex items-center justify-center border border-secondary-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white line-clamp-1">{title}</h2>
            <p className="text-[11px] text-slate-400">Đã tích hợp đủ 5 nguyên tắc tập huấn Hè 2026</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            onClick={handleCopyForWord}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
              copiedWord
                ? 'bg-secondary-600 text-white'
                : 'bg-primary-600 hover:bg-primary-500 text-white'
            }`}
            title="Sao chép dưới dạng bảng biểu và định dạng đẹp để dán trực tiếp vào Microsoft Word"
          >
            {copiedWord ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedWord ? 'Đã chép cho Word!' : 'Sao chép cho Word'}</span>
          </button>

          <button
            onClick={handleDownloadDoc}
            className="px-3 py-1.5 rounded-lg font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            title="Tải về định dạng Word (.doc)"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Tải về .DOC</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors hidden sm:flex"
            title="Tải về tệp dạng Markdown (.md)"
          >
            <FileCode className="w-4 h-4 text-purple-400" />
            <span>.MD</span>
          </button>

          <button
            onClick={onSaveToHistory}
            className={`px-3 py-1.5 rounded-lg font-medium border flex items-center space-x-1.5 transition-colors ${
              isSaved
                ? 'bg-secondary-500/20 text-secondary-300 border-secondary-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title={isSaved ? 'Đã lưu vào bộ nhớ' : 'Lưu vào lịch sử giáo án'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-secondary-400" />
            ) : (
              <Bookmark className="w-4 h-4 text-primary-400" />
            )}
            <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="In / Xuất PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Markdown Render Container */}
      <div className="p-6 sm:p-8 lg:p-10 bg-white dark:bg-slate-900 min-h-[500px]">
        <div
          id="directive-markdown-content"
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:text-primary-950 dark:prose-h1:text-primary-100 prose-h1:border-b prose-h1:pb-3 prose-h1:border-primary-100 dark:prose-h1:border-primary-900/50 prose-h2:text-lg prose-h2:text-primary-900 dark:prose-h2:text-primary-200 prose-h2:bg-primary-50/70 dark:prose-h2:bg-primary-900/20 prose-h2:p-3 prose-h2:rounded-xl prose-h2:border-l-4 prose-h2:border-primary-600 dark:prose-h2:border-primary-500 prose-h3:text-base prose-h3:text-slate-800 dark:prose-h3:text-slate-200 prose-table:border-collapse prose-table:w-full prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-th:text-slate-900 dark:prose-th:text-slate-100 prose-th:border prose-th:border-slate-300 dark:prose-th:border-slate-700 prose-td:p-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700 prose-td:text-slate-800 dark:prose-td:text-slate-300 prose-li:my-1 prose-ul:my-2 prose-blockquote:text-blue-900 prose-blockquote:font-bold prose-blockquote:bg-blue-50 prose-blockquote:border-l-4 prose-blockquote:border-blue-700 prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:my-4 dark:prose-blockquote:bg-blue-900/30 dark:prose-blockquote:text-blue-100 dark:prose-blockquote:border-blue-500"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{processedContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
