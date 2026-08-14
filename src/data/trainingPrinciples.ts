import { PrincipleDetail } from '../types';

export const TRAINING_PRINCIPLES: PrincipleDetail[] = [
  {
    id: 'principle-a',
    code: 'A',
    title: 'Nguyên tắc Phân hóa chung',
    shortDesc: 'Giữ nguyên mục tiêu cốt lõi, điều chỉnh Đầu vào (Input), Quá trình (Process), Sản phẩm (Output) & Mức hỗ trợ (Support).',
    fullDesc:
      'Dạy học phân hóa không phải là hạ thấp yêu cầu hay tạo ra 3 bài học riêng biệt. Giáo viên giữ nguyên Yêu cầu cần đạt (Objectives) cốt lõi của bài học theo chuẩn chương trình, nhưng linh hoạt cung cấp các "đường chạy phù hợp" cho từng nhóm học sinh thông qua 4 yếu tố chính:',
    keyTechniques: [
      'Điều chỉnh Đầu vào (Input): Thay đổi độ dài/độ phức tạp của văn bản, cung cấp hình ảnh minh họa, sơ đồ tư duy, bảng từ vựng gợi ý (Word Banks).',
      'Điều chỉnh Quá trình (Process): Tăng/giảm thời gian hoàn thành, cung cấp các gợi ý từng bước (Step-by-step scaffolding), sử dụng kĩ thuật khăn phủ bàn hoặc làm việc nhóm đôi.',
      'Điều chỉnh Sản phẩm (Output): Cho phép lựa chọn hình thức thể hiện (viết 3 câu ngắn vs. viết đoạn văn 80 từ vs. quay video/thuyết trình slide).',
      'Mức độ hỗ trợ (Support): Hỗ trợ trực tiếp từ GV, phiếu trợ giúp (Prompt cards), hoặc hỗ trợ từ bạn cùng tiến (Peer tutoring).',
    ],
    examples: [
      'Ví dụ Đọc hiểu: Nhóm Cốt lõi đọc đoạn văn ngắn kèm từ điển tranh (Visual Glossary); Nhóm Chuẩn trả lời câu hỏi Đọc hiểu SGK; Nhóm Thách thức tìm từ đồng nghĩa/trái nghĩa và tóm tắt đoạn văn.',
      'Ví dụ Viết: Nhóm Cốt lõi dùng câu đục lỗ (Fill-in-the-blanks); Nhóm Chuẩn viết theo dàn ý (Outline); Nhóm Thách thức sáng tạo nội dung tự chọn kèm các từ nối nâng cao.',
    ],
    iconName: 'Sliders',
  },
  {
    id: 'principle-b',
    code: 'B',
    title: 'Thiết kế Nhiệm vụ 3 Mức độ',
    shortDesc: 'Nhiệm vụ Tối thiểu (Cốt lõi) - Mức Chuẩn - Mức Mở rộng (Thách thức).',
    fullDesc:
      'Mọi hoạt động luyện tập trong tiết học Tiếng Anh Global Success nên được thiết kế theo 3 tầng mức độ để đảm bảo học sinh yếu không bị bỏ lại phía sau và học sinh khá giỏi không cảm thấy chán nản:',
    keyTechniques: [
      'Mức 1: Mức Tối thiểu (Cốt lõi - Support Level): Dành cho học sinh còn yếu, cần giàn giáo (Scaffolding). Cung cấp thẻ từ vựng, hình ảnh, câu mẫu có sẵn (Sentence frames), bài tập nối hoặc điền từ có gợi ý sẵn.',
      'Mức 2: Mức Chuẩn (Standard Level): Dành cho đại đa số học sinh trong lớp. Thực hiện đầy đủ nhiệm vụ theo SGK Global Success mà không cần trợ giúp đặc biệt.',
      'Mức 3: Mức Mở rộng (Thách thức - Challenge Level): Dành cho học sinh khá/giỏi. Yêu cầu phân tích, sáng tạo, giải thích lý do, đóng vai tình huống nâng cao hoặc làm "trợ giảng nhí" (Peer Tutor) giúp đỡ các bạn nhóm 1.',
    ],
    examples: [
      'Mức Tối thiểu: Match words with pictures, Complete sentence with provided options.',
      'Mức Chuẩn: Make original sentences using new vocabulary, Answer Wh-questions.',
      'Mức Mở rộng: Create a dialogue/mindmap, Role-play as an expert, Peer-teach grammar rule to group.',
    ],
    iconName: 'Layers',
  },
  {
    id: 'principle-c',
    code: 'C',
    title: 'Khảo sát & Chẩn đoán nhanh đầu giờ',
    shortDesc: 'Áp dụng các kỹ thuật 3-phút để phân loại trình độ & sự sẵn sàng trước khi đi vào bài mới.',
    fullDesc:
      'Trước khi bắt đầu nội dung trọng tâm hoặc hoạt động luyện tập, GV cần 1-3 phút để đánh giá nhanh mức độ hiểu biết sẵn có (Prior knowledge) và độ sẵn sàng của học sinh để chia nhóm linh hoạt:',
    keyTechniques: [
      'Tín hiệu Ngôn ngữ Cơ thể (3-Finger Signal): 3 ngón = Tự tin làm ngay; 2 ngón = Biết từ nhưng chưa thạo cấu trúc; 1 ngón = Cần cô/bạn hỗ trợ.',
      'Thẻ Đáp án Nhanh (Response Cards A/B/C/D hoặc Thẻ Xanh/Đỏ/Vàng): HS giơ thẻ đồng loạt khi GV đưa ra câu hỏi kiểm tra từ vựng/ngữ pháp nhanh.',
      'Trò chơi Tương tác Ngắn (3-Min Games): Pictionology (đoán từ qua hình vẽ), Word Storm (bão từ vựng trên bảng), Quick Quizizz/Kahoot hoặc Flashcard Speedrun.',
      'Kỹ thuật Entrance Ticket (Vé vào lớp): Điền 1 từ mới hoặc 1 câu ngắn vào giấy nhỏ trước khi vào phần luyện tập.',
    ],
    examples: [
      'Kiểm tra Thì Hiện tại đơn: GV đọc 1 động từ, HS giơ thẻ chọn s/es hay V-bare. Nhóm giơ sai lập tức được ghép cặp cùng 1 bạn giơ đúng.',
    ],
    iconName: 'Zap',
  },
  {
    id: 'principle-d',
    code: 'D',
    title: 'Xử lý Tình huống Nhóm & Fast-Finishers',
    shortDesc: 'Giao việc cụ thể cho HS yếu, định hướng vai trò Leader cho HS giỏi & Nhiệm vụ cho nhóm hoàn thành sớm.',
    fullDesc:
      'Trong lớp học đa năng lực, hoạt động nhóm dễ gặp tình trạng học sinh giỏi làm hết còn học sinh yếu ngồi im, hoặc nhóm làm xong sớm ngồi gây mất trật tự. Cần xử lý bằng chiến lược rõ ràng:',
    keyTechniques: [
      'Học sinh yếu / rụt rè: Giao nhiệm vụ nhỏ, cụ thể vừa sức (ví dụ: Chép đáp án nhóm, đọc 1 từ chìa khóa, phụ trách đếm giờ hoặc làm Presenter câu đơn giản nhất).',
      'Học sinh giỏi / tích cực: Quy định vai trò rõ ràng (Leader/Guide). Hướng dẫn HS giỏi dùng đặt câu hỏi gợi mở ("Why do you think so?") chứ không làm thay bạn.',
      'Nhiệm vụ cho Nhóm làm xong sớm (Fast-Finisher Tasks): Cung cấp "Bonus Card" như: Đố từ vựng mở rộng, vẽ sơ đồ tư duy tóm tắt, chuẩn bị 2 câu hỏi thách thức nhóm khác, hoặc kiểm tra chéo (Peer-check).',
    ],
    examples: [
      'Fast-Finisher Task: "Finished early? Write 2 extension sentences using today\'s target grammar OR design a mini-quiz for your partner!"',
    ],
    iconName: 'Users',
  },
  {
    id: 'principle-e',
    code: 'E',
    title: 'Đánh giá Quá trình (Formative Evaluation)',
    shortDesc: 'Quan sát tốc độ, sự tiến bộ, số lần hỗ trợ, độ tự tin & khả năng hợp tác thay vì chỉ nhìn Đúng/Sai.',
    fullDesc:
      'Đánh giá trong dạy học phân hóa tập trung vào sự tăng trưởng của từng cá nhân (Growth Mindset) hơn là điểm số tuyệt đối. Giáo viên đánh giá quá trình thông qua quan sát và phản hồi kịp thời:',
    keyTechniques: [
      'Tiêu chí Quan sát Tích cực: Tốc độ hoàn thành so với mốc xuất phát, sự tự tin tăng lên, số lần cần xin trợ giúp giảm đi, sự chủ động hợp tác nhóm.',
      'Lời khen cụ thể & Định hướng (Actionable Feedback): Khuyến khích sự nỗ lực ("Cô thấy hôm nay em đã tự viết được 3 câu hoàn chỉnh không cần nhìn bảng!").',
      'Đánh giá chéo & Tự đánh giá (Self & Peer Assessment): Dùng Bảng kiểm 3 tiêu chí ngắn (Rubric 3 sao) để HS tự đánh giá mức độ hoàn thành nhiệm vụ của mình.',
    ],
    examples: [
      'Rubric tự đánh giá: ★ Tôi đọc được từ mới | ★★ Tôi dùng được từ trong câu | ★★★ Tôi giải thích được từ cho bạn.',
    ],
    iconName: 'CheckCircle2',
  },
];
