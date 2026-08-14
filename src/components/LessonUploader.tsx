import React, { useState, useRef } from 'react';
import { UploadPayload } from '../types';
import { FileUp, FileText, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';
import mammoth from 'mammoth';

interface LessonUploaderProps {
  onUploadSubmit: (payload: UploadPayload) => void;
  isLoading: boolean;
}

export const LessonUploader: React.FC<LessonUploaderProps> = ({
  onUploadSubmit,
  isLoading,
}) => {
  const [rawText, setRawText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [gradeLevel, setGradeLevel] = useState<string>('Lớp 6');
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParseError(null);
    setIsParsing(true);
    setFileName(file.name);

    try {
      if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setRawText(result.value || '');
      } else if (file.name.endsWith('.txt')) {
        const text = await file.text();
        setRawText(text);
      } else {
        setParseError('Hiện tại hỗ trợ tốt nhất tệp tin định dạng .docx hoặc .txt.');
      }
    } catch (err: any) {
      console.error('File parse error:', err);
      setParseError('Không thể đọc nội dung tệp tin. Bạn có thể dán trực tiếp đoạn văn bản giáo án vào ô bên dưới.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleClearFile = () => {
    setFileName('');
    setRawText('');
    setParseError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) {
      setParseError('Vui lòng tải lên hoặc dán nội dung giáo án trước khi gửi.');
      return;
    }

    onUploadSubmit({
      fileName: fileName || undefined,
      rawContent: rawText.trim(),
      gradeLevel,
      lessonTitle: lessonTitle.trim() || undefined,
      userNotes: userNotes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* File Drag and Drop Box */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          1. Tải Lên Tệp Giáo Án (.DOCX, .TXT)
        </label>
        
        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-primary-50/30 dark:hover:bg-primary-900/20 rounded-2xl p-6 text-center transition-all cursor-pointer group">
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.txt"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileUp className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-slate-700">
              Nhấp để chọn tệp hoặc kéo thả tệp giáo án vào đây
            </div>
            <p className="text-xs text-slate-400">
              Hỗ trợ định dạng Microsoft Word (.docx) và Plain Text (.txt)
            </p>
          </div>
        </div>

        {/* File Parse Status */}
        {isParsing && (
          <div className="mt-2 text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center space-x-2">
            <div className="w-full h-8 bg-primary-100 dark:bg-primary-900/50 rounded-lg animate-pulse flex items-center px-3">
              <span className="opacity-70">Đang đọc nội dung tệp {fileName}...</span>
            </div>
          </div>
        )}

        {fileName && !isParsing && (
          <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center space-x-2 truncate">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium truncate">Đã đọc tệp: {fileName} ({rawText.length} ký tự)</span>
            </div>
            <button
              type="button"
              onClick={handleClearFile}
              className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors"
              title="Xóa tệp"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {parseError && (
          <div className="mt-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{parseError}</span>
          </div>
        )}
      </div>

      {/* Raw Content Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            2. Hoặc Dán Trực Tiếp Nội Dung Giáo Án
          </label>
          <span className="text-xs text-slate-400">{rawText.length} ký tự</span>
        </div>
        <textarea
          rows={8}
          value={rawText}
          onChange={(e) => {
            setRawText(e.target.value);
            setParseError(null);
          }}
          placeholder="Dán nội dung giáo án môn Tiếng Anh hiện tại của bạn vào đây (bao gồm mục tiêu, hoạt động Warm-up, Presentation, Practice, Production...)..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono leading-relaxed"
        />
      </div>

      {/* Grade & Title Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block font-medium text-slate-700 mb-1">Khối lớp:</label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-slate-200"
          >
            <option value="Lớp 6">Lớp 6</option>
            <option value="Lớp 7">Lớp 7</option>
            <option value="Lớp 8">Lớp 8</option>
            <option value="Lớp 9">Lớp 9</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-slate-700 mb-1">Tên bài học (Tùy chọn):</label>
          <input
            type="text"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            placeholder="Ví dụ: Unit 3: Friends - Lesson 2: A Closer Look 1"
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-slate-200"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-medium text-slate-700 mb-1">
            Ghi chú / Yêu cầu chỉnh sửa riêng (Tùy chọn):
          </label>
          <input
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Ví dụ: Cần bổ sung hoạt động trò chơi chẩn đoán đầu giờ, tăng cường hỗ trợ cho học sinh yếu ở phần Nghe..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !rawText.trim()}
        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer
          ${isLoading 
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed animate-pulse'
            : 'bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-lg shadow-primary-600/25 disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" />
            <span>Đang đọc, phân tích & xuất bản tinh chỉnh giáo án...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Phân Tích Giáo Án & Xuất Bản Định Hướng Phân Hóa</span>
          </>
        )}
      </button>
    </form>
  );
};
