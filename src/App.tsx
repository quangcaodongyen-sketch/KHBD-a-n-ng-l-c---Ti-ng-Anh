import React, { useState, useEffect } from 'react';
import {
  GenerationMode,
  QuickSelectionPayload,
  UploadPayload,
  PrinciplesFocusConfig,
  SavedDirective,
} from './types';
import { Navbar } from './components/Navbar';
import { GlobalSuccessSelector } from './components/GlobalSuccessSelector';
import { LessonUploader } from './components/LessonUploader';
import { PrinciplesChecklist } from './components/PrinciplesChecklist';
import { DirectiveViewer } from './components/DirectiveViewer';
import { TrainingPrinciplesModal } from './components/TrainingPrinciplesModal';
import { SavedDirectivesModal } from './components/SavedDirectivesModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import {
  FileText,
  BookOpen,
  Sparkles,
  Sliders,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Flame,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'global_success_saved_directives_v1';
const API_KEY_STORAGE_KEY = 'global_success_api_key';

export default function App() {
  const [activeMode, setActiveMode] = useState<GenerationMode>('select');

  // Principles Focus Configuration
  const [principlesConfig, setPrinciplesConfig] = useState<PrinciplesFocusConfig>({
    generalDifferentiation: false,
    threeTieredTasks: false,
    quickDiagnostics: false,
    groupWorkAndFastFinishers: true,
    processAssessment: true,
    temperature: 0.7,
  });

  // State for AI Output
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [directiveTitle, setDirectiveTitle] = useState<string>('');
  const [currentPayload, setCurrentPayload] = useState<{
    grade: string;
    unit: string;
    lessonType: string;
  } | null>(null);

  // Modals state
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

  // API Key state
  const [apiKey, setApiKey] = useState<string>('');

  // Saved directives history in localStorage
  const [savedDirectives, setSavedDirectives] = useState<SavedDirective[]>([]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedDirectives(JSON.parse(stored));
      }
      const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
    } catch (e) {
      console.error('Failed to save API key to localStorage', e);
    }
  };

  const saveToLocalStorage = (list: SavedDirective[]) => {
    setSavedDirectives(list);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // Helper to safely parse JSON or extract text error
  const parseResponse = async (res: Response) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new Error(`Máy chủ gặp sự cố (Mã lỗi ${res.status}). Vui lòng kiểm tra lại API Key hoặc thử lại.`);
      }
      throw new Error('Phản hồi từ máy chủ không đúng định dạng JSON.');
    }
  };

  // Mode 2 Submit
  const handleQuickSelectSubmit = async (payload: QuickSelectionPayload) => {
    setIsLoading(true);
    setErrorMsg(null);
    const title = `${payload.grade} - Unit ${payload.unitNumber}: ${payload.unitTitle} - ${payload.lessonType}`;
    setDirectiveTitle(title);
    setCurrentPayload({
      grade: payload.grade,
      unit: `Unit ${payload.unitNumber}`,
      lessonType: payload.lessonType,
    });

    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quickSelection: payload,
          principlesConfig,
          customApiKey: apiKey,
        }),
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi khi kết nối với máy chủ AI.');
      }

      setGeneratedContent(data.result);
      // Scroll smoothly to output
      setTimeout(() => {
        document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Error generating lesson:', err);
      setErrorMsg(err.message || 'Không thể tạo bản định hướng. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mode 1 Submit
  const handleUploadSubmit = async (payload: UploadPayload) => {
    setIsLoading(true);
    setErrorMsg(null);
    const title = `Phân tích Giáo án: ${payload.lessonTitle || payload.fileName || payload.gradeLevel || 'Giáo án đã dán'}`;
    setDirectiveTitle(title);
    setCurrentPayload({
      grade: payload.gradeLevel || 'Lớp 6',
      unit: 'Giáo án tự chọn',
      lessonType: payload.lessonTitle || 'Phân tích & Tinh chỉnh',
    });

    try {
      const res = await fetch('/api/analyze-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploadData: payload,
          principlesConfig,
          customApiKey: apiKey,
        }),
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi khi kết nối với máy chủ AI.');
      }

      setGeneratedContent(data.result);
      setTimeout(() => {
        document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Error analyzing lesson:', err);
      setErrorMsg(err.message || 'Không thể phân tích giáo án. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save current directive
  const handleSaveCurrentDirective = () => {
    if (!generatedContent) return;

    const newDirective: SavedDirective = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      title: directiveTitle,
      grade: currentPayload?.grade || 'THCS',
      unit: currentPayload?.unit || '',
      lessonType: currentPayload?.lessonType || '',
      mode: activeMode,
      markdownContent: generatedContent,
      tags: ['Global Success', 'Hè 2026', currentPayload?.grade || 'THCS'],
    };

    const updatedList = [newDirective, ...savedDirectives];
    saveToLocalStorage(updatedList);
  };

  const isCurrentSaved = savedDirectives.some(
    (item) => item.markdownContent === generatedContent
  );

  const handleDeleteDirective = (id: string) => {
    const updated = savedDirectives.filter((item) => item.id !== id);
    saveToLocalStorage(updated);
  };

  const handleSelectFromHistory = (item: SavedDirective) => {
    setGeneratedContent(item.markdownContent);
    setDirectiveTitle(item.title);
    setCurrentPayload({
      grade: item.grade,
      unit: item.unit,
      lessonType: item.lessonType,
    });
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Quick Sample Presets
  const handleQuickSample1 = () => {
    setActiveMode('select');
    handleQuickSelectSubmit({
      grade: 'Grade 6',
      unitNumber: 1,
      unitTitle: 'My New School',
      lessonType: 'A Closer Look 1',
      customTopicDetails: 'Từ vựng đồ dùng học tập & Phát âm âm /ɑː/ và /ʌ/',
    });
  };

  const handleQuickSample2 = () => {
    setActiveMode('select');
    handleQuickSelectSubmit({
      grade: 'Grade 8',
      unitNumber: 3,
      unitTitle: 'Teenagers',
      lessonType: 'Skills 1',
      customTopicDetails: 'Đọc hiểu áp lực tuổi teen & Luyện nói đưa lời khuyên',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-200">
      {/* Top Header Navbar */}
      <Navbar
        onOpenTrainingModal={() => setIsTrainingModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        savedCount={savedDirectives.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Banner Section */}
        <section className="bg-gradient-to-br from-primary-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-primary-900/50 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary-500/20 text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-500/30 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-secondary-400" />
              <span>Chuyên sâu SGK Tiếng Anh Global Success (Lớp 6, 7, 8, 9)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Trợ Lý AI Phân Tích & Định Hướng Giáo Án Đa Năng Lực
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Giải pháp thiết kế giáo án phân hóa hiện đại theo tinh thần{' '}
              <strong className="text-primary-300">Tập huấn Chuyên môn Hè 2026</strong>.
              Cung cấp ma trận nhiệm vụ 3 mức độ (Cốt lõi - Chuẩn - Thách thức), chẩn đoán 3 phút đầu giờ,
              và chiến lược nhóm cho mọi lớp học Tiếng Anh THCS.
            </p>

            {/* Quick Sample Action Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-secondary-400" />
                <span>Thử nhanh bài mẫu:</span>
              </span>
              <button
                type="button"
                onClick={handleQuickSample1}
                className="bg-slate-800/80 hover:bg-primary-900/60 text-primary-200 border border-primary-700/50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Lớp 6: Unit 1 - A Closer Look 1
              </button>
              <button
                type="button"
                onClick={handleQuickSample2}
                className="bg-slate-800/80 hover:bg-primary-900/60 text-primary-200 border border-primary-700/50 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Lớp 8: Unit 3 - Skills 1
              </button>
            </div>
          </div>
        </section>

        {/* 5 Principles Configuration Bar */}
        <PrinciplesChecklist
          config={principlesConfig}
          onChange={setPrinciplesConfig}
          onOpenTrainingModal={() => setIsTrainingModalOpen(true)}
        />

        {/* Interaction Workflow Mode Selector Tabs */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Lựa Chọn Phương Thức Tương Tác (User Workflow)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tab 1: Quick Select */}
              <button
                type="button"
                onClick={() => setActiveMode('select')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start space-x-3 cursor-pointer ${
                  activeMode === 'select'
                    ? 'bg-primary-50/80 dark:bg-primary-900/20 border-primary-600 dark:border-primary-500 ring-2 ring-primary-500/20 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    activeMode === 'select'
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Cách 1: Chọn Bài Học SGK</span>
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Nhanh nhất
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Chọn Khối lớp (6-9), Unit & Tiết học cụ thể trong SGK Global Success để AI tự động xuất bản định hướng phân hóa.
                  </p>
                </div>
              </button>

              {/* Tab 2: Upload / Paste */}
              <button
                type="button"
                onClick={() => setActiveMode('upload')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start space-x-3 cursor-pointer ${
                  activeMode === 'upload'
                    ? 'bg-primary-50/80 dark:bg-primary-900/20 border-primary-600 dark:border-primary-500 ring-2 ring-primary-500/20 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    activeMode === 'upload'
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Cách 2: Tải / Dán Giáo Án Có Sẵn</span>
                    <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Phân tích & Tinh chỉnh
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Tải lên tệp Word (.docx) hoặc dán văn bản giáo án của bạn. AI sẽ phân tích ưu/nhược điểm và bổ sung các hoạt động đa năng lực.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Render Selected Input Form */}
          {activeMode === 'select' ? (
            <GlobalSuccessSelector
              onSelectSubmit={handleQuickSelectSubmit}
              isLoading={isLoading}
            />
          ) : (
            <LessonUploader
              onUploadSubmit={handleUploadSubmit}
              isLoading={isLoading}
            />
          )}
        </section>

        {/* Error Alert Display */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex items-start space-x-3">
            <div className="p-1 bg-rose-100 rounded-lg text-rose-600 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-rose-900">Không thể thực hiện yêu cầu</h3>
              <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Output Render Section */}
        {generatedContent && (
          <section id="output-section" className="space-y-4 pt-4">
            <DirectiveViewer
              content={generatedContent}
              title={directiveTitle}
              onSaveToHistory={handleSaveCurrentDirective}
              isSaved={isCurrentSaved}
            />
          </section>
        )}
      </main>

      {/* Modals */}
      <TrainingPrinciplesModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
      />

      <SavedDirectivesModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedDirectives={savedDirectives}
        onSelectDirective={handleSelectFromHistory}
        onDeleteDirective={handleDeleteDirective}
      />

      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        currentApiKey={apiKey}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}
