import React from 'react';
import { PrinciplesFocusConfig } from '../types';
import { TRAINING_PRINCIPLES } from '../data/trainingPrinciples';
import { Sliders, Layers, Zap, Users, CheckCircle2, Check } from 'lucide-react';

interface PrinciplesChecklistProps {
  config: PrinciplesFocusConfig;
  onChange: (newConfig: PrinciplesFocusConfig) => void;
  onOpenTrainingModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sliders: <Sliders className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4" />,
};

export const PrinciplesChecklist: React.FC<PrinciplesChecklistProps> = ({
  config,
  onChange,
  onOpenTrainingModal,
}) => {
  const keys: (keyof PrinciplesFocusConfig)[] = [
    'generalDifferentiation',
    'threeTieredTasks',
    'quickDiagnostics',
    'groupWorkAndFastFinishers',
    'processAssessment',
  ];

  const handleToggle = (key: keyof PrinciplesFocusConfig) => {
    onChange({
      ...config,
      [key]: !config[key],
    });
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
            <span>4 Nguyên Tắc Dạy Học Đa Năng Lực (Tập Huấn Hè 2026)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tất cả 4 nguyên tắc bắt buộc được tự động tích hợp vào bản định hướng
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={onOpenTrainingModal}
            className="text-xs text-primary-400 hover:text-primary-300 font-medium underline shrink-0"
          >
            Xem chi tiết
          </button>
          
          {/* Temperature Slider */}
          <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-300 font-medium">Độ sáng tạo:</span>
            <input 
              type="range" 
              min="0.1" max="1.0" step="0.1" 
              value={config.temperature ?? 0.7}
              onChange={(e) => onChange({...config, temperature: parseFloat(e.target.value)})}
              className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <span className="text-xs text-primary-400 font-bold w-6 text-right">
              {config.temperature ?? 0.7}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {TRAINING_PRINCIPLES.map((principle, index) => {
          const configKey = keys[index];
          const isActive = config[configKey];

          return (
            <div
              key={principle.id}
              onClick={() => handleToggle(configKey)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-primary-500/80 shadow-md ring-1 ring-primary-500/30'
                  : 'bg-slate-800/30 border-slate-800 opacity-60 hover:opacity-100 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-6 h-6 rounded-lg bg-primary-500/20 text-primary-300 font-bold text-xs flex items-center justify-center border border-primary-500/30">
                      {principle.code}
                    </span>
                    <span className="text-primary-400">
                      {ICON_MAP[principle.iconName]}
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center text-xs transition-colors ${
                      isActive ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {principle.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {principle.shortDesc}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-primary-400 font-medium">
                  {isActive ? 'Đã kích hoạt' : 'Chưa chọn'}
                </span>
                <span>Hè 2026</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
