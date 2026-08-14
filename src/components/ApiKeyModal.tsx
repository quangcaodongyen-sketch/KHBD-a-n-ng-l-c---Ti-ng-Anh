import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Save } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey: string;
  onSave: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentApiKey,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(currentApiKey);

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentApiKey);
    }
  }, [isOpen, currentApiKey]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputValue.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Cài đặt API Key</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Gemini API Key của bạn
            </label>
            <input
              id="apiKey"
              type="password"
              placeholder="Nhập API key (bắt đầu bằng AIza...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 text-sm">
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Bạn chưa có API Key? Hãy lấy miễn phí từ Google AI Studio:
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <span>Lấy API Key tại đây</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mr-2 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu cấu hình</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
