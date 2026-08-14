import React, { useState, useEffect } from 'react';
import { 
  Key, 
  ExternalLink, 
  Save, 
  X, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApiKey: string;
  onSave: (key: string) => void;
  isFirstTime?: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentApiKey,
  onSave,
  isFirstTime = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputValue(currentApiKey || '');
      setIsSavedSuccess(false);
    }
  }, [isOpen, currentApiKey]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSave(inputValue.trim());
    setIsSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transition-all transform scale-100">
        
        {/* Header với Gradient ấn tượng */}
        <div className="bg-gradient-to-r from-primary-600 via-indigo-600 to-blue-600 p-6 text-white relative">
          {!isFirstTime && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {isFirstTime ? 'Chào Mừng Bạn Đến Với Ứng Dụng!' : 'Cấu Hình Google Gemini API Key'}
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                {isFirstTime ? 'Nhập API Key để bắt đầu trải nghiệm miễn phí' : 'Quản lý API Key cá nhân của bạn'}
              </p>
            </div>
          </div>
        </div>

        {/* Nội dung Hướng dẫn & Form */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Hộp hướng dẫn 3 bước lấy API Key */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-primary-500" />
                Hướng dẫn lấy API Key miễn phí (1 phút)
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>Mở Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                Truy cập <strong className="text-primary-600 dark:text-primary-400">Google AI Studio</strong> bằng tài khoản Google (Gmail).
              </li>
              <li>
                Bấm nút <strong className="text-slate-900 dark:text-white font-semibold">"Create API key"</strong> ➔ Chọn dự án hoặc tạo mới.
              </li>
              <li>
                Bấm <strong className="text-slate-900 dark:text-white font-semibold">"Copy"</strong> mã khoá (bắt đầu bằng <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[11px] font-mono">AIzaSy...</code>) rồi dán vào ô bên dưới.
              </li>
            </ol>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/80 rounded-xl text-xs font-bold transition-all shadow-sm group"
            >
              <Sparkles className="w-4 h-4 text-primary-500 group-hover:scale-110 transition-transform" />
              <span>BẤM VÀO ĐÂY ĐỂ LẤY API KEY MIỄN PHÍ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Form nhập Key */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Dán API Key của bạn vào đây:
                </label>
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                  >
                    {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showKey ? 'Ẩn' : 'Hiện'}</span>
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Thông báo cam kết bảo mật */}
            <div className="flex items-start space-x-2 text-[11px] text-slate-500 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Bảo mật 100%:</strong> API Key chỉ được lưu cục bộ trên trình duyệt (<code className="font-mono">localStorage</code>) của bạn và được gửi trực tiếp đến API Gemini.
              </span>
            </div>

            {/* Nút hành động */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              {!isFirstTime && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              )}
              <button
                type="submit"
                disabled={!inputValue.trim() || isSavedSuccess}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
                  isSavedSuccess
                    ? 'bg-emerald-600 shadow-emerald-500/20'
                    : 'bg-primary-600 hover:bg-primary-500 shadow-primary-500/20 hover:scale-[1.02]'
                }`}
              >
                {isSavedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã lưu thành công!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Lưu & Bắt đầu sử dụng</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
