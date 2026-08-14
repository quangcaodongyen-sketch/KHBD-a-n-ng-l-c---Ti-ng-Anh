import React, { useState } from 'react';
import { TRAINING_PRINCIPLES } from '../data/trainingPrinciples';
import { X, Sliders, Layers, Zap, Users, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

interface TrainingPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sliders: <Sliders className="w-5 h-5 text-indigo-600" />,
  Layers: <Layers className="w-5 h-5 text-blue-600" />,
  Zap: <Zap className="w-5 h-5 text-amber-600" />,
  Users: <Users className="w-5 h-5 text-purple-600" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
};

export const TrainingPrinciplesModal: React.FC<TrainingPrinciplesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>(TRAINING_PRINCIPLES[0].id);

  if (!isOpen) return null;

  const activePrinciple = TRAINING_PRINCIPLES.find((p) => p.id === activeTab) || TRAINING_PRINCIPLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">
                Cẩm Nang 5 Nguyên Tắc Dạy Học Phân Hóa Đa Năng Lực
              </h2>
              <p className="text-xs text-indigo-300">
                Tài liệu chuẩn Tập huấn Chuyên môn Hè 2026 - SGK Tiếng Anh Global Success
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Left Principles List */}
          <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-3 space-y-2">
            {TRAINING_PRINCIPLES.map((principle) => {
              const isSelected = activeTab === principle.id;
              return (
                <button
                  key={principle.id}
                  onClick={() => setActiveTab(principle.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                      : 'border-transparent hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {principle.code}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs text-slate-900 truncate">
                      {principle.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {principle.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Content */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[600px] space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="p-3 bg-slate-100 rounded-xl">
                {ICON_MAP[activePrinciple.iconName]}
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                  Nguyên tắc {activePrinciple.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {activePrinciple.title}
                </h3>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Mô tả chi tiết & Tinh thần cốt lõi
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {activePrinciple.fullDesc}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Các Kỹ thuật Sư phạm & Phương pháp Áp dụng
              </h4>
              <ul className="space-y-2">
                {activePrinciple.keyTechniques.map((tech, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Ví dụ Thực tế Minh họa (Global Success)
              </h4>
              <div className="space-y-2">
                {activePrinciple.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 font-medium"
                  >
                    💡 {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors"
          >
            Đóng Cẩm nang
          </button>
        </div>
      </div>
    </div>
  );
};
