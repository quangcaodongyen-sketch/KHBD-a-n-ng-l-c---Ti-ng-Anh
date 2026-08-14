import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize Gemini Client
function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY trong hệ thống và không có API Key do người dùng cung cấp.');
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

// System prompt grounding for Differentiated ELT Global Success Assistant
const SYSTEM_INSTRUCTION = `
Bạn là Chuyên gia Giáo dục và Phương pháp giảng dạy Tiếng Anh THCS tại Việt Nam.
Bạn am hiểu sâu sắc Chương trình GDPT 2018 và bộ sách giáo khoa Tiếng Anh Global Success (Lớp 6, 7, 8, 9).
Chuyên môn của bạn là thiết kế giáo án theo hướng DẠY HỌC PHÂN HÓA (ĐA NĂNG LỰC) - TẬP HUẤN HÈ 2026.

YÊU CẦU CỐT LÕI (BẮT BUỘC):
1. GIÁO ÁN THỰC CHIẾN, KHÔNG LÝ THUYẾT: Mọi hoạt động (Warm-up, Presentation, Practice, Production) phải ghi rõ BƯỚC ĐI CỤ THỂ, LỜI THOẠI (Script) tiếng Anh của Giáo viên (T) và dự kiến trả lời của Học sinh (Ss).
2. BÁM SÁT SÁCH GIÁO KHOA: Phải nhắc đích danh các bài tập (ví dụ: "Task 1, Page 12"), từ vựng và ngữ pháp trọng tâm của bài đó.
3. PHÂN HÓA 3 MỨC ĐỘ VỚI PHIẾU HỌC TẬP: Luôn cung cấp trực tiếp nội dung PHIẾU HỌC TẬP (Worksheet) hoặc bảng biểu để giáo viên có thể in ra dùng ngay. Phân rõ 3 mức: Mức 1 (Tối thiểu/Có giàn giáo), Mức 2 (Chuẩn), Mức 3 (Thách thức).
4. TRỰC QUAN HÓA: Dùng ký hiệu [Hình ảnh: ...] để gợi ý giáo viên chèn slide/tranh.

CẤU TRÚC ĐẦU RA BẮT BỘC (Dùng Markdown rõ ràng):
# 📘 BẢN ĐỊNH HƯỚNG GIÁO ÁN ĐA NĂNG LỰC GLOBAL SUCCESS
[Tên lớp / Unit / Lesson / Chủ đề]

## I. MỤC TIÊU BÀI HỌC (OBJECTIVES) & MA TRẬN PHÂN HÓA
- Trọng tâm Kiến thức (Từ vựng, Ngữ pháp, Kỹ năng)
- Bảng Ma trận phân hóa Input - Process - Output - Support cho 3 nhóm học sinh.

## II. TIẾN TRÌNH DẠY HỌC CHI TIẾT (LESSON PROCEDURE)
(Bắt buộc có lời thoại T & Ss, chỉ rõ Task nào trong SGK. Với mỗi giai đoạn: Warm-up -> Presentation -> Practice -> Production -> Consolidation)

**1. Giai đoạn: [Tên giai đoạn]**
- **Hình thức tổ chức:** (Cá nhân/Cặp/Nhóm)
- **Tài liệu/Học liệu:** (SGK trang..., [Hình ảnh: mô tả tranh])
- **Kịch bản lớp học (Script):**
  - **T:** "..." (Lời giáo viên)
  - **Ss:** "..." (Lời học sinh)
- **Hoạt động Phân hóa (3 Mức độ):**
  - **Mức 1 (Cốt lõi):** [Mô tả chi tiết cách hỗ trợ]
  - **Mức 2 (Chuẩn):** [Mô tả nhiệm vụ]
  - **Mức 3 (Thách thức):** [Mô tả nhiệm vụ nâng cao]

## III. PHIẾU HỌC TẬP (WORKSHEETS) DÙNG NGAY
Trình bày dưới dạng Markdown Table hoặc danh sách điền khuyết để giáo viên in ra. Chữ to, rõ ràng, chia 3 mức độ (Mức 1 có hình ảnh/từ khóa gợi ý; Mức 2 chuẩn; Mức 3 mở rộng).

## IV. CHIẾN LƯỢC QUẢN LÝ LỚP & ĐÁNH GIÁ (CLASS MANAGEMENT & ASSESSMENT)
- Vai trò cho HS yếu/giỏi (Peer Tutor).
- Thẻ nhiệm vụ cho nhóm hoàn thành sớm (Fast-Finishers).
- Bảng kiểm đánh giá nhanh (Formative Assessment Rubric).
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mode 2: Quick Selection Generation Endpoint
app.post('/api/generate-lesson', async (req, res) => {
  try {
    const { quickSelection, principlesConfig, customApiKey } = req.body;

    if (!quickSelection || !quickSelection.grade || !quickSelection.unitNumber || !quickSelection.lessonType) {
      return res.status(400).json({ error: 'Thiếu thông tin lớp, unit hoặc bài học.' });
    }

    const ai = getGeminiClient(customApiKey);

    const prompt = `
Hãy soạn GIÁO ÁN PHÂN HÓA ĐA NĂNG LỰC "THỰC CHIẾN" cho bài học sau, CÓ ĐẦY ĐỦ KỊCH BẢN (SCRIPT) VÀ PHIẾU HỌC TẬP:
- Bộ sách: Tiếng Anh Global Success (THCS)
- Lớp: ${quickSelection.grade}
- Unit: Unit ${quickSelection.unitNumber} - ${quickSelection.unitTitle}
- Bài học (Lesson): ${quickSelection.lessonType}
${quickSelection.keyGrammarAndVocab ? `- Trọng tâm Ngữ pháp/Từ vựng từ SGK: ${quickSelection.keyGrammarAndVocab}` : ''}
${quickSelection.customTopicDetails ? `- Ghi chú chủ đề/mục tiêu riêng: ${quickSelection.customTopicDetails}` : ''}
${
  quickSelection.classProfile
    ? `- Đặc điểm lớp học: Tổng số ${quickSelection.classProfile.totalStudents || 40} HS (Nhóm cần hỗ trợ: ${quickSelection.classProfile.supportGroupPct || 25}%, Nhóm khá giỏi: ${quickSelection.classProfile.challengeGroupPct || 25}%). Ghi chú: ${quickSelection.classProfile.specialNotes || 'Lớp có trình độ không đồng đều'}`
    : ''
}

LƯU Ý CỰC KỲ QUAN TRỌNG: 
1. KHÔNG VIẾT LÝ THUYẾT DÀI DÒNG. Hãy viết kịch bản chi tiết như bạn đang đứng lớp (Giáo viên nói câu tiếng Anh gì, học sinh làm gì).
2. Liệt kê ĐÚNG các Task/Bài tập theo cấu trúc chuẩn của bài ${quickSelection.lessonType} trong sách Global Success.
3. BẮT BUỘC cung cấp nội dung PHIẾU HỌC TẬP (Worksheet) phân hóa thành 3 mức độ dưới dạng Bảng (Markdown Table) để giáo viên có thể in ra ngay.
4. Bố trí chỗ [Hình ảnh: ...] để giáo viên biết khi nào chiếu slide/hình gì.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: principlesConfig?.temperature ?? 0.7,
      },
    });

    const outputText = response.text || 'Không nhận được phản hồi từ AI.';
    res.json({ result: outputText });
  } catch (error: any) {
    console.error('Error generating lesson:', error);
    res.status(500).json({ error: error?.message || 'Có lỗi xảy ra khi tạo giáo án.' });
  }
});

// Mode 1: Upload / Paste Lesson Analysis Endpoint
app.post('/api/analyze-lesson', async (req, res) => {
  try {
    const { uploadData, principlesConfig, customApiKey } = req.body;

    if (!uploadData || !uploadData.rawContent || uploadData.rawContent.trim().length === 0) {
      return res.status(400).json({ error: 'Nội dung giáo án tải lên hoặc dán bị trống.' });
    }

    const ai = getGeminiClient(customApiKey);

    const prompt = `
Người dùng đã tải lên/dán một GIÁO ÁN HIỆN CÓ như sau:

--- THÔNG TIN BỔ SUNG ---
- Tên tệp/Nguồn: ${uploadData.fileName || 'Nội dung dán trực tiếp'}
- Khối lớp: ${uploadData.gradeLevel || 'Chưa chỉ định'}
- Bài học: ${uploadData.lessonTitle || 'Chưa chỉ định'}
- Ghi chú từ giáo viên: ${uploadData.userNotes || 'Không có'}

--- NỘI DUNG GIÁO ÁN GỐC ---
${uploadData.rawContent}

--- NHIỆM VỤ CỦA BẠN (CỰC KỲ NGHIÊM NGẶT) ---
1. BẮT BUỘC BẮT ĐẦU BẰNG VIỆC SAO CHÉP Y NGUYÊN BẢN GỐC: Viết lại 100% cấu trúc, tiêu đề và nội dung của giáo án gốc. KHÔNG được thay đổi trật tự, KHÔNG tự ý xóa bớt nội dung của người dùng.
2. CHÈN THÊM NỘI DUNG ĐA NĂNG LỰC: Tại các vị trí thích hợp (ví dụ: Practice, Production, củng cố cuối bài), hãy bổ sung các nội dung theo tinh thần Đa năng lực: Phiếu học tập 3 mức độ, chiến lược nhóm, phân công Peer Tutor.
3. QUY TẮC ĐÁNH DẤU MÀU XANH (QUAN TRỌNG NHẤT):
   - MỌI NỘI DUNG MÀ BẠN CHÈN THÊM (từ 1 câu, 1 đoạn, đến 1 cái bảng Worksheet) ĐỀU PHẢI ĐƯỢC ĐẶT TRONG THẺ BLOCKQUOTE của Markdown (bắt đầu bằng dấu "> ").
   - Ví dụ:
     > **[BỔ SUNG ĐA NĂNG LỰC]**
     > Nội dung bạn viết thêm ở đây...
     > Học sinh yếu làm gì, giỏi làm gì...
4. KHÔNG XUẤT RA BẤT KỲ ĐOẠN NHẬN XÉT HAY LỜI MỞ ĐẦU NÀO KHÁC. Chỉ cần xuất trực tiếp giáo án.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: principlesConfig?.temperature ?? 0.7,
      },
    });

    const outputText = response.text || 'Không nhận được phản hồi từ AI.';
    res.json({ result: outputText });
  } catch (error: any) {
    console.error('Error analyzing lesson:', error);
    res.status(500).json({ error: error?.message || 'Có lỗi xảy ra khi phân tích giáo án.' });
  }
});

// Vite & Static Production Server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Only start the server if not running on Vercel
if (!process.env.VERCEL) {
  startServer();
}

export default app;
