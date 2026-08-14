import { GradeLevel, LessonType, UnitInfo } from '../types';

export const GLOBAL_SUCCESS_GRADES: GradeLevel[] = [
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
];

export const LESSON_TYPES: { type: LessonType; label: string; desc: string }[] = [
  {
    type: 'Getting Started',
    label: 'Getting Started',
    desc: 'Khởi động, giới thiệu chủ đề Unit qua hội thoại mẫu & từ vựng mở đầu.',
  },
  {
    type: 'A Closer Look 1',
    label: 'A Closer Look 1',
    desc: 'Tập trung Từ vựng (Vocabulary) và Phát âm (Pronunciation).',
  },
  {
    type: 'A Closer Look 2',
    label: 'A Closer Look 2',
    desc: 'Tập trung Ngữ pháp trọng tâm (Grammar) và bài tập ứng dụng.',
  },
  {
    type: 'Communication',
    label: 'Communication',
    desc: 'Ngôn ngữ giao tiếp hàng ngày (Everyday English) & văn hóa.',
  },
  {
    type: 'Skills 1',
    label: 'Skills 1',
    desc: 'Rèn luyện Kỹ năng Đọc (Reading) và Nói (Speaking).',
  },
  {
    type: 'Skills 2',
    label: 'Skills 2',
    desc: 'Rèn luyện Kỹ năng Nghe (Listening) và Viết (Writing).',
  },
  {
    type: 'Looking Back & Project',
    label: 'Looking Back & Project',
    desc: 'Ôn tập tổng hợp từ vựng/ngữ pháp và Dự án sáng tạo nhóm.',
  },
];

export const CURRICULUM_DATA: Record<GradeLevel, UnitInfo[]> = {
  'Grade 6': [
    { number: 1, title: 'My New School', topic: 'Trường học mới & các môn học', keyGrammarAndVocab: 'Present Simple, Adverbs of frequency, School subjects & items' },
    { number: 2, title: 'My House', topic: 'Ngôi nhà & các phòng', keyGrammarAndVocab: 'Possessive case, Prepositions of place, Types of house & rooms' },
    { number: 3, title: 'My Friends', topic: 'Mô tả ngoại hình & tính cách bạn bè', keyGrammarAndVocab: 'Present Continuous for present & future, Personality adjectives' },
    { number: 4, title: 'My Neighbourhood', topic: 'Khu phố & chỉ đường', keyGrammarAndVocab: 'Comparative adjectives, Places in neighbourhood & directions' },
    { number: 5, title: 'Natural Wonders of Viet Nam', topic: 'Kỳ quan thiên nhiên Việt Nam', keyGrammarAndVocab: 'Countable / Uncountable nouns, Must / Mustn\'t, Travel items' },
    { number: 6, title: 'Our Tet Holiday', topic: 'Ngày Tết cổ truyền & phong tục', keyGrammarAndVocab: 'Should / Shouldn\'t, Will for intentions, Tet activities & wishes' },
    { number: 7, title: 'Television', topic: 'Truyền hình & các chương trình TV', keyGrammarAndVocab: 'Wh-questions, Conjunctions (and, but, so, because), TV programmes' },
    { number: 8, title: 'Sports and Games', topic: 'Thể thao & trò chơi', keyGrammarAndVocab: 'Past Simple, Imperatives, Sports equipment & rules' },
    { number: 9, title: 'Cities of the World', topic: 'Các thành phố nổi tiếng thế giới', keyGrammarAndVocab: 'Superlative adjectives, Possessive pronouns, Landmarks & geography' },
    { number: 10, title: 'Our Houses in the Future', topic: 'Ngôi nhà & thiết bị tương lai', keyGrammarAndVocab: 'Future Simple (Will), Might for possibility, Smart appliances' },
    { number: 11, title: 'Our Greener World', topic: 'Bảo vệ môi trường & 3Rs', keyGrammarAndVocab: 'Conditional Sentence Type 1, The 3Rs (Reduce, Reuse, Recycle)' },
    { number: 12, title: 'Robots', topic: 'Robot & khả năng trong đời sống', keyGrammarAndVocab: 'Superlative of long adjectives, Could for past ability, Robot abilities' },
  ],
  'Grade 7': [
    { number: 1, title: 'Hobbies', topic: 'Sở thích cá nhân & thời gian rảnh', keyGrammarAndVocab: 'Present Simple, Verbs of liking + V-ing, Hobby activities' },
    { number: 2, title: 'Healthy Living', topic: 'Lối sống lành mạnh & sức khỏe', keyGrammarAndVocab: 'Simple sentences, Imperatives with More/Less, Health problems & tips' },
    { number: 3, title: 'Community Service', topic: 'Hoạt động cộng đồng & tình nguyện', keyGrammarAndVocab: 'Past Simple & Present Perfect contrast, Volunteer activities' },
    { number: 4, title: 'Music and Arts', topic: 'Âm nhạc & Nghệ thuật', keyGrammarAndVocab: 'Comparisons: (not) as...as, like, different from, Musical instruments & arts' },
    { number: 5, title: 'Food and Drink', topic: 'Ẩm thực & Món ăn yêu thích', keyGrammarAndVocab: 'Nouns of quantity (a bottle of, etc.), How much / How many, Recipes' },
    { number: 6, title: 'A Visit to School', topic: 'Trường Quốc Tử Giám & Lịch sử', keyGrammarAndVocab: 'Prepositions of time/place, Past Simple passive, Historical sites' },
    { number: 7, title: 'Traffic', topic: 'Giao thông & Luật giao thông', keyGrammarAndVocab: 'It indicating distance, Used to, Road signs & safety' },
    { number: 8, title: 'Films', topic: 'Phim ảnh & cảm nhận phim', keyGrammarAndVocab: '-ed and -ing adjectives, Connectors: Although / However, Film types' },
    { number: 9, title: 'Festivals Around the World', topic: 'Lễ hội trên thế giới', keyGrammarAndVocab: 'Adverbial phrases, Yes/No & Wh-questions in Past Simple, Festival activities' },
    { number: 10, title: 'Energy Sources', topic: 'Các nguồn năng lượng', keyGrammarAndVocab: 'Present Continuous for future, Types of energy (renewable/non-renewable)' },
    { number: 11, title: 'Travelling in the Future', topic: 'Phương tiện giao thông tương lai', keyGrammarAndVocab: 'Future Continuous, Possessive pronouns, Future transport' },
    { number: 12, title: 'English-Speaking Countries', topic: 'Các nước nói tiếng Anh', keyGrammarAndVocab: 'Articles (a/an/the/zero), Cultural facts & geography' },
  ],
  'Grade 8': [
    { number: 1, title: 'Life in the Countryside', topic: 'Cuộc sống ở nông thôn', keyGrammarAndVocab: 'Comparative adverbs, Countryside activities & peace' },
    { number: 2, title: 'Life in the Countryside & City', topic: 'So sánh nông thôn & thành thị', keyGrammarAndVocab: 'Comparative forms of adverbs, Lifestyle contrast' },
    { number: 3, title: 'Teenagers', topic: 'Đời sống tuổi teen, áp lực & Mạng xã hội', keyGrammarAndVocab: 'Simple & compound sentences, Modal verbs for advice, Teen stress' },
    { number: 4, title: 'Ethnic Groups of Viet Nam', topic: 'Các dân tộc thiểu số Việt Nam', keyGrammarAndVocab: 'Yes/No & Wh-questions, Countable/Uncountable nouns, Traditions' },
    { number: 5, title: 'Our Customs and Traditions', topic: 'Phong tục & Truyền thống', keyGrammarAndVocab: 'Should/Shouldn\'t for obligation, Have to, Table manners & customs' },
    { number: 6, title: 'Lifestyles', topic: 'Phong cách sống xưa & nay', keyGrammarAndVocab: 'Future continuous, Tribal/modern lifestyles & habits' },
    { number: 7, title: 'Environmental Protection', topic: 'Bảo vệ môi trường & Hệ sinh thái', keyGrammarAndVocab: 'Complex sentences with adverbial clauses of time, Pollution & Wildlife' },
    { number: 8, title: 'Shopping', topic: 'Mua sắm & Tiêu dùng', keyGrammarAndVocab: 'Adverbs of frequency, Present Simple for timetables, Online/Store shopping' },
    { number: 9, title: 'Natural Disasters', topic: 'Thiên tai & Phòng chống', keyGrammarAndVocab: 'Past Continuous, Passive voice, Emergency preparedness' },
    { number: 10, title: 'Communication in the Future', topic: 'Giao tiếp công nghệ tương lai', keyGrammarAndVocab: 'Prepositions of time/place, Holograms, Telepathy, Video calls' },
    { number: 11, title: 'Science and Technology', topic: 'Khoa học & Công nghệ', keyGrammarAndVocab: 'Reported speech (statements), Inventions & scientific achievements' },
    { number: 12, title: 'Life on Other Planets', topic: 'Sự sống ngoài Trái Đất', keyGrammarAndVocab: 'Reported speech (questions), Modals: May / Might, Aliens & Space' },
  ],
  'Grade 9': [
    { number: 1, title: 'Local Community', topic: 'Cộng đồng địa phương & Làng nghề', keyGrammarAndVocab: 'Question words before to-infinitives, Phrasal verbs, Artisans & crafts' },
    { number: 2, title: 'City Life', topic: 'Cuộc sống đô thị & Thách thức', keyGrammarAndVocab: 'Double comparatives, Phrasal verbs for city life, Urban amenities' },
    { number: 3, title: 'Healthy Living for Teens', topic: 'Sức khỏe thể chất & Tinh thần cho Teen', keyGrammarAndVocab: 'Modal verbs in reported speech, Managing stress & time' },
    { number: 4, title: 'Remembering the Past', topic: 'Hoài niệm quá khứ & Ký ức Việt Nam', keyGrammarAndVocab: 'Structure: Used to / Wish + Past Simple, Traditional games & memories' },
    { number: 5, title: 'Our Experiences', topic: 'Trải nghiệm cá nhân & Bài học', keyGrammarAndVocab: 'Present Perfect with already/yet/just/ever, Personal milestones' },
    { number: 6, title: 'Vietnamese Lifestyles Then and Now', topic: 'Lối sống Việt xưa và nay', keyGrammarAndVocab: 'Past Continuous & Past Simple with when/while, Family structure' },
    { number: 7, title: 'Natural Wonders of the World', topic: 'Kỳ quan thế giới & Du lịch bền vững', keyGrammarAndVocab: 'Passive voice with modal verbs, Ecotourism & preservation' },
    { number: 8, title: 'Tourism', topic: 'Ngành du lịch & Hành trình', keyGrammarAndVocab: 'Compound nouns, Relative clauses (Defining), Travel itinerary' },
    { number: 9, title: 'World Englishes', topic: 'Tiếng Anh trên thế giới & Đa dạng', keyGrammarAndVocab: 'Relative clauses (Non-defining), Accents, Vocabulary varieties' },
    { number: 10, title: 'Planet Earth', topic: 'Trái đất & Biến đổi khí hậu', keyGrammarAndVocab: 'Conditional Type 2, Environmental conservation & flora/fauna' },
    { number: 11, title: 'Electronic Devices', topic: 'Thiết bị điện tử & Học tập số', keyGrammarAndVocab: 'Relative pronouns (who, which, that), E-learning & Gadgets' },
    { number: 12, title: 'Careers in the Future', topic: 'Nghề nghiệp tương lai & Kỹ năng', keyGrammarAndVocab: 'Despite / In spite of, Although, Career paths & digital skills' },
  ],
};
