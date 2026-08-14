# 🔑 SKILL: HỆ THỐNG QUẢN LÝ & GIAO DIỆN HƯỚNG DẪN NHẬP GEMINI API KEY (BYOK) CHO WEB APP

> **Tài liệu chuẩn hóa kiến trúc "Bring Your Own Key" (BYOK)** dành cho các ứng dụng Web AI (React / Next.js / Vite / Vercel). Giúp người dùng dễ dàng lấy key, lưu trữ an toàn trên trình duyệt và tự động điều hướng nhiều phiên bản Model Gemini thông minh.

---

## 🌟 I. TỔNG QUAN KIẾN TRÚC & TRẢI NGHIỆM NGƯỜI DÙNG

Hệ thống bao gồm 3 lớp hoàn chỉnh:
1. **Lớp Giao diện (UI/UX Onboarding & Settings)**:
   - **Màn hình chào mừng / Onboarding Modal**: Tự động hiển thị khi người dùng lần đầu truy cập và chưa có API Key.
   - **Hướng dẫn 3 bước trực quan**: Kèm nút bấm mở trực tiếp Google AI Studio (`https://aistudio.google.com/app/apikey`).
   - **Nút Cài đặt (Navbar)**: Biểu tượng Chìa khóa để xem lại hoặc thay đổi key bất cứ lúc nào.
2. **Lớp Lưu trữ Frontend (`localStorage`)**:
   - Tự động lưu trữ cục bộ, bảo mật riêng tư cho từng máy người dùng, không sợ lộ key.
3. **Lớp Xử lý Backend (Smart Multi-Model Fallback)**:
   - Hỗ trợ cả `customApiKey` từ client lẫn `process.env.GEMINI_API_KEY` từ server.
   - Tự động dò tìm các model Gemini khả dụng (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.5-pro`...) để không bao giờ bị lỗi 404 Model Not Found.

---

## 🎨 II. CODE GIAO DIỆN COMPONENT (REACT + TAILWIND CSS)

### 1. Component Modal Hướng Dẫn & Nhập API Key (`ApiKeyModal.tsx`)

Tạo file `src/components/ApiKeyModal.tsx`:

```tsx
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
  isFirstTime?: boolean; // Hiển thị chế độ chào mừng lần đầu
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
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Đóng
                </button>
              )}
              <button
                type="submit"
                disabled={!inputValue.trim() || isSavedSuccess}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-lg ${
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
```

---

## 🧭 III. GẮN VÀO THANH NAVBAR & TỰ ĐỘNG BẬT ONBOARDING TRONG `App.tsx`

### 1. Nút trên Navbar (`Navbar.tsx`)

```tsx
<button
  onClick={onOpenApiModal}
  className="p-2 rounded-xl text-slate-300 hover:text-primary-400 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700 flex items-center space-x-1.5"
  title="Cài đặt Google Gemini API Key"
>
  <Key className="w-4 h-4 text-primary-400" />
  <span className="text-xs font-medium hidden sm:inline">API Key</span>
</button>
```

### 2. Quản lý trạng thái & tự động kích hoạt lần đầu (`App.tsx`)

```tsx
import React, { useState, useEffect } from 'react';
import { ApiKeyModal } from './components/ApiKeyModal';

const API_KEY_STORAGE_KEY = 'app_gemini_api_key_v1';

export default function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  // 1. Đọc API Key khi khởi động app
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      } else {
        // Chưa có key -> Tự động bật Modal Onboarding chào mừng
        setIsFirstTime(true);
        setIsApiModalOpen(true);
      }
    } catch (e) {
      console.error('Lỗi khi đọc API Key từ localStorage', e);
    }
  }, []);

  // 2. Lưu API Key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    setIsFirstTime(false);
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
    } catch (e) {
      console.error('Lỗi khi lưu API Key', e);
    }
  };

  // 3. Gửi customApiKey kèm mỗi request fetch
  const handleCallAI = async (payload: any) => {
    if (!apiKey) {
      setIsApiModalOpen(true);
      return;
    }

    const res = await fetch('/api/your-ai-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        customApiKey: apiKey, // 👈 Truyền API key của người dùng
      }),
    });
    
    // ...
  };

  return (
    <div>
      {/* Giao diện chính */}
      
      {/* Modal API Key */}
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        currentApiKey={apiKey}
        onSave={handleSaveApiKey}
        isFirstTime={isFirstTime}
      />
    </div>
  );
}
```

---

## ⚡ IV. BACKEND ENGINE: SMART MULTI-MODEL FALLBACK (VERCEL / EXPRESS)

Dán đoạn code này vào file Serverless Endpoint (ví dụ `api/generate.ts` hoặc `server.ts`):

```typescript
import { GoogleGenAI } from '@google/genai';

// 1. Khởi tạo client linh hoạt (Ưu tiên Key người dùng ➔ rồi đến Key hệ thống .env)
function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chưa cấu hình API Key. Vui lòng bấm vào biểu tượng chìa khóa ở góc trên để nhập API Key của bạn.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 2. Danh sách model ưu tiên từ mới đến cũ
const CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-pro',
  'gemini-2.0-pro-exp-02-05',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

// 3. Hàm gọi AI tự động chuyển đổi Model thông minh
export async function generateWithFallback(
  ai: GoogleGenAI, 
  prompt: string, 
  systemInstruction?: string, 
  temperature: number = 0.7
) {
  let lastErr: any = null;

  // Thử lần lượt các model phổ biến
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction,
          temperature,
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Thử model ${modelName} thất bại, đang chuyển model khác...`, err?.message || err);
      lastErr = err;
    }
  }

  // Nếu các tên cố định đều không được, tự động truy vấn danh sách model có sẵn trong tài khoản
  try {
    const list = await ai.models.list();
    for await (const m of list) {
      const modelId = m.name?.replace(/^models\//, '') || '';
      if (modelId && !CANDIDATE_MODELS.includes(modelId)) {
        try {
          const response = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
              systemInstruction,
              temperature,
            },
          });
          if (response && response.text) {
            return response.text;
          }
        } catch (inner) {
          console.warn(`Thử dynamic model ${modelId} thất bại:`, inner);
        }
      }
    }
  } catch (listError) {
    console.warn('Không thể lấy danh sách model:', listError);
  }

  throw lastErr || new Error('Không thể kết nối với các model Gemini hiện hành.');
}
```

---

## 📄 V. MÃ CSS CHUẨN XUẤT FILE WORD (NGHỊ ĐỊNH 30/2020/NĐ-CP)

Dùng đoạn HTML Header này khi xuất file `.doc` hoặc copy vào Microsoft Word để đúng chuẩn văn thư Việt Nam (Font **Times New Roman 13pt**, **thụt đầu dòng 1.27cm**, lề trên/dưới **20mm**, lề trái **30mm**, lề phải **15mm**):

```html
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Tài liệu xuất bản</title>
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
    h1 { font-size: 15pt; font-weight: bold; text-align: center; text-indent: 0; margin-top: 12pt; margin-bottom: 8pt; color: #000; }
    h2 { font-size: 14pt; font-weight: bold; text-indent: 0; margin-top: 10pt; margin-bottom: 6pt; color: #000; }
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
    <!-- Nội dung chèn tại đây -->
  </div>
</body>
</html>
```

---

## 📋 VI. CHECKLIST TÍCH HỢP NHANH CHO DỰ ÁN MỚI (TRONG 3 BƯỚC)

- [ ] **Bước 1**: Copy file `ApiKeyModal.tsx` vào thư mục `src/components/`.
- [ ] **Bước 2**: Trong `App.tsx`, thêm state `apiKey`, gọi `localStorage` và nhúng `ApiKeyModal`.
- [ ] **Bước 3**: Trong Backend API (`api/*.ts` hoặc `server.ts`), sử dụng hàm `getGeminiClient(customApiKey)` và `generateWithFallback` để không bao giờ bị lỗi model.
