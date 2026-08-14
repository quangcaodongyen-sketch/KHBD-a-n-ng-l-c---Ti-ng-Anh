import React from 'react';
import { GraduationCap, BookOpen, Sparkles, History, HelpCircle, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  onOpenTrainingModal: () => void;
  onOpenHistoryModal: () => void;
  savedCount: number;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrainingModal,
  onOpenHistoryModal,
  savedCount,
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg tracking-tight text-slate-100">
                AI Giáo Án Đa Năng Lực
              </h1>
              <span className="bg-primary-500/20 text-primary-300 text-xs px-2 py-0.5 rounded-full font-medium border border-primary-500/30">
                Hè 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trợ lý Phân tích & Định hướng Giáo án Đa năng lực THCS
            </p>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenTrainingModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-primary-300 hover:text-primary-200 border border-slate-700 transition-colors"
            title="Xem Cẩm nang 5 Nguyên tắc Tập huấn Hè 2026"
          >
            <BookOpen className="w-4 h-4 text-primary-400" />
            <span className="hidden md:inline">Cẩm nang</span> 4 Nguyên tắc
          </button>

          <button
            onClick={onOpenHistoryModal}
            className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Lịch sử giáo án đã lưu"
          >
            <History className="w-4 h-4 text-secondary-400" />
            <span>Lịch sử</span>
            {savedCount > 0 && (
              <span className="bg-secondary-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
              title="Giao diện Sáng/Tối"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          <div className="hidden lg:flex items-center space-x-1 pl-2 border-l border-slate-800 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-secondary-400" />
            <span>Gemini 1.5 Pro</span>
          </div>
        </div>
      </div>
    </header>
  );
};
