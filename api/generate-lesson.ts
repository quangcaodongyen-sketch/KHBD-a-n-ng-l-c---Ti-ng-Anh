import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function getGeminiClient(customApiKey?: string) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY. Vui lòng bấm vào biểu tượng chìa khóa ở góc phải trên cùng để nhập API Key của bạn.');
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

export const maxDuration = 60; // Set timeout limit to 60s for Vercel

export default async function handler(req: any, res: any) {
  // Handle CORS if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được hỗ trợ. Chỉ chấp nhận POST.' });
  }

  try {
    const { quickSelection, principlesConfig, customApiKey } = req.body || {};

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

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: principlesConfig?.temperature ?? 0.7,
        },
      });
    } catch (modelErr: any) {
      console.warn('Fallback to gemini-1.5-flash:', modelErr);
      response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: principlesConfig?.temperature ?? 0.7,
        },
      });
    }

    const outputText = response.text || 'Không nhận được phản hồi từ AI.';
    return res.status(200).json({ result: outputText });
  } catch (error: any) {
    console.error('Error generating lesson:', error);
    return res.status(500).json({ error: error?.message || 'Có lỗi xảy ra khi tạo giáo án.' });
  }
}
