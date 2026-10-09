import { ExamPaper } from './examData';

// =============================================================================
// ĐỀ KIỂM TRA GIỮA KÌ – ĐỀ 3 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_EXAM_3: ExamPaper = {
  id: 'midterm1-exam3',
  category: 'midterm_1',
  categoryLabel: 'Giữa Học Kì 1',
  title: 'Đề Kiểm Tra Giữa Kì 1 – Đề 3 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe Trái Đất/Lịch/Cô giáo, Nối câu nghe, Từ khác loại, Động từ chỉ hoạt động, Hội thoại Anna & Tom',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 33,
  icon: '🌍',
  themeColor: 'from-blue-600 via-sky-600 to-indigo-600',
  questions: [
    // A. LISTENING - I. Listen and number (1 - 6)
    {
      id: 'm1-e3-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 1,
      questionPrompt: 'Lắng nghe câu số 1 và chọn bức tranh tương ứng (A - F):',
      audioText: 'The Earth is round.',
      audioTranscript: 'Speaker: The Earth is round. (Trái Đất có hình cầu.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh E (Quả Địa Cầu Trái Đất)',
      explanation: 'Câu 1 trong bài nghe: "The Earth is round." (Trái Đất hình cầu) ➔ Tương ứng với Tranh E (hình quả Địa Cầu).',
      vietnameseTranslation: 'Trái Đất hình cầu ➔ Tranh E.',
      hint: 'Lắng nghe từ "The Earth" (Trái Đất).'
    },
    {
      id: 'm1-e3-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 2,
      questionPrompt: 'Lắng nghe câu số 2 và chọn bức tranh tương ứng (A - F):',
      audioText: 'Thank you very much.',
      audioTranscript: 'Speaker: Thank you very much. (Cảm ơn bạn rất nhiều.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh D (Bé gái cúi chào cảm ơn)',
      explanation: 'Câu 2 trong bài nghe: "Thank you very much." (Cảm ơn rất nhiều) ➔ Tương ứng với Tranh D (bé gái cúi đầu cảm ơn có bóng thoại "Thank you very much!").',
      vietnameseTranslation: 'Cảm ơn rất nhiều ➔ Tranh D.',
      hint: 'Lắng nghe lời cảm ơn "Thank you very much".'
    },
    {
      id: 'm1-e3-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 3,
      questionPrompt: 'Lắng nghe câu số 3 và chọn bức tranh tương ứng (A - F):',
      audioText: 'Miss Hoa is my teacher.',
      audioTranscript: 'Speaker: Miss Hoa is my teacher. (Cô Hoa là cô giáo của mình.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh C (Cô giáo đứng cạnh bảng)',
      explanation: 'Câu 3 trong bài nghe: "Miss Hoa is my teacher." (Cô Hoa là cô giáo của mình) ➔ Tương ứng với Tranh C (hình cô giáo đứng cạnh bảng lớp).',
      vietnameseTranslation: 'Cô Hoa là cô giáo của mình ➔ Tranh C.',
      hint: 'Lắng nghe từ "teacher" (giáo viên).'
    },
    {
      id: 'm1-e3-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 4,
      questionPrompt: 'Lắng nghe câu số 4 và chọn bức tranh tương ứng (A - F):',
      audioText: 'I come from China.',
      audioTranscript: 'Speaker: I come from China. (Tôi đến từ Trung Quốc.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh B (Bé trai cờ Trung Quốc)',
      explanation: 'Câu 4 trong bài nghe: "I come from China." (Tôi đến từ Trung Quốc) ➔ Tương ứng với Tranh B (bé trai cạnh lá cờ đỏ sao vàng của Trung Quốc).',
      vietnameseTranslation: 'Tôi đến từ Trung Quốc ➔ Tranh B.',
      hint: 'Lắng nghe từ "China" (Trung Quốc).'
    },
    {
      id: 'm1-e3-q5',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 5,
      questionPrompt: 'Lắng nghe câu số 5 và chọn bức tranh tương ứng (A - F):',
      audioText: 'It is the fourth of May today.',
      audioTranscript: 'Speaker: It is the fourth of May today. (Hôm nay là ngày 4 tháng Năm.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh F (Lịch May 4)',
      explanation: 'Câu 5 trong bài nghe: "It is the fourth of May today." (Hôm nay là ngày 4 tháng Năm) ➔ Tương ứng với Tranh F (tờ lịch MAY 4).',
      vietnameseTranslation: 'Hôm nay là ngày 4 tháng Năm ➔ Tranh F.',
      hint: 'Lắng nghe từ "fourth of May" (ngày 4 tháng 5).'
    },
    {
      id: 'm1-e3-q6',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 6,
      questionPrompt: 'Lắng nghe câu số 6 và chọn bức tranh tương ứng (A - F):',
      audioText: 'My birthday is on the first of March.',
      audioTranscript: 'Speaker: My birthday is on the first of March. (Sinh nhật của tôi là ngày 1 tháng Ba.)',
      visualCards: [
        { id: 'p3-a', label: 'A', title: '1', monthName: 'MARCH', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p3-b', label: 'B', title: 'Trung Quốc', emoji: '🇨🇳', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p3-c', label: 'C', title: 'Cô giáo Hoa', emoji: '👩‍🏫', cardType: 'picture', bgGradient: 'from-indigo-500 to-blue-600' },
        { id: 'p3-d', label: 'D', title: 'Thank you very much!', emoji: '🙇‍♀️', cardType: 'picture', bgGradient: 'from-emerald-500 to-teal-600' },
        { id: 'p3-e', label: 'E', title: 'Trái Đất (The Earth)', emoji: '🌍', cardType: 'picture', bgGradient: 'from-sky-500 to-blue-700' },
        { id: 'p3-f', label: 'F', title: '4', monthName: 'MAY', dayNumber: '4', cardType: 'calendar', bgGradient: 'from-teal-500 to-cyan-600' }
      ],
      options: ['Tranh A (Lịch March 1)', 'Tranh B (Bé trai cờ Trung Quốc)', 'Tranh C (Cô giáo đứng cạnh bảng)', 'Tranh D (Bé gái cúi chào cảm ơn)', 'Tranh E (Quả Địa Cầu Trái Đất)', 'Tranh F (Lịch May 4)'],
      correctAnswer: 'Tranh A (Lịch March 1)',
      explanation: 'Câu 6 trong bài nghe: "My birthday is on the first of March." (Sinh nhật của tôi vào ngày 1 tháng Ba) ➔ Tương ứng với Tranh A (tờ lịch MARCH 1).',
      vietnameseTranslation: 'Sinh nhật ngày 1 tháng Ba ➔ Tranh A.',
      hint: 'Lắng nghe từ "first of March" (ngày 1 tháng 3).'
    },

    // A. LISTENING - II. Listen and match (1 - 6)
    {
      id: 'm1-e3-q7',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 7,
      questionPrompt: '1. Lắng nghe và nối câu bắt đầu bằng "My name is ...":',
      audioText: 'My name is Jenny.',
      audioTranscript: 'Speaker: My name is Jenny. (Tên của tôi là Jenny.)',
      options: ['d. Jenny.', 'a. Nam.', 'b. miss Mai.', 'c. comes from Japan.', 'e. is my friend.', 'f. Viet Nam.'],
      correctAnswer: 'd. Jenny.',
      explanation: 'Trong bài nghe: "My name is Jenny." ➔ Nối 1 với d.',
      vietnameseTranslation: 'Tên của tôi là Jenny.',
      hint: 'Nghe tên bạn nữ là Jenny.'
    },
    {
      id: 'm1-e3-q8',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 8,
      questionPrompt: '2. Lắng nghe và nối câu bắt đầu bằng "Joe ...":',
      audioText: 'Joe is my friend.',
      audioTranscript: 'Speaker: Joe is my friend. (Joe là bạn của tôi.)',
      options: ['e. is my friend.', 'a. Nam.', 'b. miss Mai.', 'c. comes from Japan.', 'd. Jenny.', 'f. Viet Nam.'],
      correctAnswer: 'e. is my friend.',
      explanation: 'Trong bài nghe: "Joe is my friend." ➔ Nối 2 với e.',
      vietnameseTranslation: 'Joe là bạn của tôi.',
      hint: 'Nghe từ "my friend".'
    },
    {
      id: 'm1-e3-q9',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 9,
      questionPrompt: '3. Lắng nghe và nối câu bắt đầu bằng "I’m from ...":',
      audioText: 'I’m from Viet Nam.',
      audioTranscript: 'Speaker: I’m from Viet Nam. (Tôi đến từ Việt Nam.)',
      options: ['f. Viet Nam.', 'a. Nam.', 'b. miss Mai.', 'c. comes from Japan.', 'd. Jenny.', 'e. is my friend.'],
      correctAnswer: 'f. Viet Nam.',
      explanation: 'Trong bài nghe: "I’m from Viet Nam." ➔ Nối 3 với f.',
      vietnameseTranslation: 'Tôi đến từ Việt Nam.',
      hint: 'Nghe tên nước "Viet Nam".'
    },
    {
      id: 'm1-e3-q10',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 10,
      questionPrompt: '4. Lắng nghe và nối câu bắt đầu bằng "Good morning, ...":',
      audioText: 'Good morning, miss Mai.',
      audioTranscript: 'Speaker: Good morning, miss Mai. (Chào buổi sáng, cô Mai.)',
      options: ['b. miss Mai.', 'a. Nam.', 'c. comes from Japan.', 'd. Jenny.', 'e. is my friend.', 'f. Viet Nam.'],
      correctAnswer: 'b. miss Mai.',
      explanation: 'Trong bài nghe: "Good morning, miss Mai." ➔ Nối 4 với b.',
      vietnameseTranslation: 'Chào buổi sáng, cô Mai.',
      hint: 'Nghe lời chào cô giáo "miss Mai".'
    },
    {
      id: 'm1-e3-q11',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 11,
      questionPrompt: '5. Lắng nghe và nối câu bắt đầu bằng "Jane ...":',
      audioText: 'Jane comes from Japan.',
      audioTranscript: 'Speaker: Jane comes from Japan. (Jane đến từ Nhật Bản.)',
      options: ['c. comes from Japan.', 'a. Nam.', 'b. miss Mai.', 'd. Jenny.', 'e. is my friend.', 'f. Viet Nam.'],
      correctAnswer: 'c. comes from Japan.',
      explanation: 'Trong bài nghe: "Jane comes from Japan." ➔ Nối 5 với c.',
      vietnameseTranslation: 'Jane đến từ Nhật Bản.',
      hint: 'Nghe từ "comes from Japan".'
    },
    {
      id: 'm1-e3-q12',
      type: 'matching',
      exerciseTitle: 'A. LISTENING - II. Listen and match (Nghe và nối)',
      questionNumber: 12,
      questionPrompt: '6. Lắng nghe và nối câu bắt đầu bằng "Good evening, ...":',
      audioText: 'Good evening, Nam.',
      audioTranscript: 'Speaker: Good evening, Nam. (Chào buổi tối, Nam.)',
      options: ['a. Nam.', 'b. miss Mai.', 'c. comes from Japan.', 'd. Jenny.', 'e. is my friend.', 'f. Viet Nam.'],
      correctAnswer: 'a. Nam.',
      explanation: 'Trong bài nghe: "Good evening, Nam." ➔ Nối 6 với a.',
      vietnameseTranslation: 'Chào buổi tối, Nam.',
      hint: 'Nghe lời chào bạn Nam.'
    },

    // B. VOCABULARY & GRAMMAR - I. Odd one out
    {
      id: 'm1-e3-q13',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 13,
      questionPrompt: '1. Chọn từ khác loại: Science, Vietnam, English, Vietnamese:',
      options: ['Vietnam', 'Science', 'English', 'Vietnamese'],
      correctAnswer: 'Vietnam',
      explanation: 'Phương án A "Science" (môn Khoa học), C "English" (tiếng Anh) và D "Vietnamese" (tiếng Việt) đều là tên môn học/ngôn ngữ. Riêng "Vietnam" là tên quốc gia.',
      grammarFocus: 'Vietnam là tên quốc gia, các từ khác là môn học hoặc ngôn ngữ.',
      hint: 'Từ nào chỉ tên nước chứ không phải môn học?'
    },
    {
      id: 'm1-e3-q14',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 14,
      questionPrompt: '2. Chọn từ khác loại: Well, What, Who, Why:',
      options: ['Well', 'What', 'Who', 'Why'],
      correctAnswer: 'Well',
      explanation: '"What" (gì), "Who" (ai), "Why" (tại sao) là các từ để hỏi (Wh-questions); còn "Well" (tốt, khỏe) là phó từ/tính từ.',
      grammarFocus: 'Wh-words: What, Who, Why. Well là tính từ/trạng từ.',
      hint: 'Từ nào không dùng để đặt câu hỏi?'
    },
    {
      id: 'm1-e3-q15',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 15,
      questionPrompt: '3. Chọn từ khác loại: map, photo, poster, Australia:',
      options: ['Australia', 'map', 'photo', 'poster'],
      correctAnswer: 'Australia',
      explanation: '"map" (bản đồ), "photo" (bức ảnh), "poster" (áp phích) là các danh từ chung chỉ đồ vật; còn "Australia" (nước Úc) là danh từ riêng chỉ quốc gia.',
      grammarFocus: 'Australia là tên quốc gia riêng, các từ khác là đồ vật trong phòng học.',
      hint: 'Từ nào là tên một quốc gia?'
    },
    {
      id: 'm1-e3-q16',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 16,
      questionPrompt: '4. Chọn từ khác loại: cook, walk, go, does:',
      options: ['does', 'cook', 'walk', 'go'],
      correctAnswer: 'does',
      explanation: '"cook" (nấu), "walk" (đi bộ), "go" (đi) đều là động từ ở dạng nguyên mẫu (V-inf); riêng "does" là động từ đã chia ở ngôi thứ ba số ít (thêm -es).',
      grammarFocus: 'does là động từ chia ngôi 3 số ít, 3 từ còn lại ở dạng nguyên thể.',
      hint: 'Từ nào đã bị biến đổi đuôi -es?'
    },
    {
      id: 'm1-e3-q17',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 17,
      questionPrompt: '5. Chọn từ khác loại: today, Monday, Friday, Thursday:',
      options: ['today', 'Monday', 'Friday', 'Thursday'],
      correctAnswer: 'today',
      explanation: '"Monday" (thứ Hai), "Friday" (thứ Sáu), "Thursday" (thứ Năm) là tên các ngày cụ thể trong tuần; còn "today" (hôm nay) là từ chỉ thời gian chung.',
      grammarFocus: 'today không phải tên thứ cụ thể trong tuần.',
      hint: 'Từ nào không phải là thứ Hai, thứ Sáu hay thứ Năm?'
    },

    // B. VOCABULARY & GRAMMAR - II. Look at the pictures and write (Đoán từ hành động theo tranh)
    {
      id: 'm1-e3-q18',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 18,
      questionPrompt: '1. Quan sát tranh bạn nhỏ đang bơi lội dưới làn nước mát 🏊 và chọn từ tiếng Anh đúng:',
      imageEmoji: '🏊‍♂️',
      options: ['Swim', 'Dance', 'Cycle', 'Run'],
      correctAnswer: 'Swim',
      explanation: 'Tranh 1 miêu tả bạn nhỏ đang bơi dưới bể nước ➔ Swim (bơi lội).',
      vietnameseTranslation: 'Swim: bơi lội',
      hint: 'Động từ bơi dưới nước.'
    },
    {
      id: 'm1-e3-q19',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 19,
      questionPrompt: '2. Quan sát tranh hai bạn nhỏ đang múa hát nhịp nhàng 💃🕺 và chọn từ đúng:',
      imageEmoji: '💃',
      options: ['Dance', 'Swim', 'Jump', 'Skip'],
      correctAnswer: 'Dance',
      explanation: 'Tranh 2 miêu tả hai bạn đang múa nhảy ➔ Dance (nhảy, khiêu vũ).',
      vietnameseTranslation: 'Dance: nhảy, múa',
      hint: 'Động từ nhảy múa.'
    },
    {
      id: 'm1-e3-q20',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 20,
      questionPrompt: '3. Quan sát tranh bạn nhỏ đội mũ bảo hiểm đạp xe 🚴‍♂️ và chọn từ đúng:',
      imageEmoji: '🚴‍♂️',
      options: ['Cycle', 'Run', 'Jump', 'Walk'],
      correctAnswer: 'Cycle',
      explanation: 'Tranh 3 miêu tả bạn nhỏ đang đạp xe đạp ➔ Cycle (đạp xe đạp).',
      vietnameseTranslation: 'Cycle: đạp xe',
      hint: 'Đi xe đạp.'
    },
    {
      id: 'm1-e3-q21',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 21,
      questionPrompt: '4. Quan sát tranh bạn nhỏ bật nhảy trên đệm nhún lò xo 🤸 và chọn từ đúng:',
      imageEmoji: '🤸',
      options: ['Jump', 'Skip', 'Dance', 'Run'],
      correctAnswer: 'Jump',
      explanation: 'Tranh 4 miêu tả bạn nhỏ đang nhảy cao trên bạt nhún lò xo ➔ Jump (nhảy lên cao).',
      vietnameseTranslation: 'Jump: nhảy lên cao',
      hint: 'Động từ nhảy bật lên cao.'
    },
    {
      id: 'm1-e3-q22',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 22,
      questionPrompt: '5. Quan sát tranh hai bạn nhỏ đang thi chạy đuổi bắt 🏃‍♂️🏃‍♀️ và chọn từ đúng:',
      imageEmoji: '🏃‍♂️',
      options: ['Run', 'Cycle', 'Walk', 'Swim'],
      correctAnswer: 'Run',
      explanation: 'Tranh 5 miêu tả các bạn nhỏ đang chạy bộ nhanh ➔ Run (chạy).',
      vietnameseTranslation: 'Run: chạy',
      hint: 'Động từ chạy bộ.'
    },
    {
      id: 'm1-e3-q23',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and write (Nhìn tranh viết từ)',
      questionNumber: 23,
      questionPrompt: '6. Quan sát tranh bạn nhỏ cầm dây quất nhảy dây 🪢 và chọn từ đúng:',
      imageEmoji: '🪢',
      options: ['Skip', 'Jump', 'Dance', 'Cycle'],
      correctAnswer: 'Skip',
      explanation: 'Tranh 6 miêu tả bạn nhỏ đang chơi trò nhảy dây ➔ Skip (nhảy dây).',
      vietnameseTranslation: 'Skip: nhảy dây',
      hint: 'Trò chơi nhảy dây quen thuộc.'
    },

    // B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)
    {
      id: 'm1-e3-q24',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)',
      questionNumber: 24,
      questionPrompt: 'Anna: Hi. I’m Anna. What’s your (1) ___________? ➔ Điền từ thích hợp:',
      wordBank: ['name', 'meet', 'and', 'sing', 'do'],
      options: ['name', 'meet', 'and', 'do'],
      correctAnswer: 'name',
      explanation: 'Cấu trúc hỏi tên: "What’s your name?" (Bạn tên là gì?). Câu sau Tom đáp: "My name is Tom."',
      vietnameseTranslation: 'Bạn tên là gì? (What’s your name?)',
      hint: 'Từ hỏi tên gọi.'
    },
    {
      id: 'm1-e3-q25',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)',
      questionNumber: 25,
      questionPrompt: 'Tom: My name is Tom. Nice to meet you. ➔ Anna: Nice to (2) ________ you, too.',
      wordBank: ['name', 'meet', 'and', 'sing', 'do'],
      options: ['meet', 'name', 'and', 'sing'],
      correctAnswer: 'meet',
      explanation: 'Cụm từ chào hỏi lịch sự: "Nice to meet you, too." (Mình cũng rất vui được gặp bạn).',
      vietnameseTranslation: 'Rất vui được gặp bạn (Nice to meet you).',
      hint: 'Nice to meet you.'
    },
    {
      id: 'm1-e3-q26',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)',
      questionNumber: 26,
      questionPrompt: 'Tom: What is your nationality? ➔ Anna: I’m English. (3) ___________ you?',
      wordBank: ['name', 'meet', 'and', 'sing', 'do'],
      options: ['And', 'Do', 'Are', 'How'],
      correctAnswer: 'and',
      explanation: 'Cấu trúc hỏi lại người đối diện: "And you?" (Còn bạn thì sao?). Tom trả lời tiếp: "I’m American."',
      vietnameseTranslation: 'Còn bạn thì sao? (And you?)',
      hint: 'Liên từ "And".'
    },
    {
      id: 'm1-e3-q27',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)',
      questionNumber: 27,
      questionPrompt: 'Tom: I’m American. Can you (4) ________ any English songs?',
      wordBank: ['name', 'meet', 'and', 'sing', 'do'],
      options: ['sing', 'dance', 'do', 'play'],
      correctAnswer: 'sing',
      explanation: 'Sau "Can you..." đi với bài hát "English songs" là động từ "sing" (hát): "Can you sing any English songs?" (Bạn có thể hát bài hát tiếng Anh nào không?). Anna trả lời: "I can sing and dance."',
      vietnameseTranslation: 'Hát bài hát tiếng Anh (sing any English songs).',
      hint: 'Động từ hát đi với "songs".'
    },
    {
      id: 'm1-e3-q28',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Read and complete (Hội thoại Anna & Tom)',
      questionNumber: 28,
      questionPrompt: 'Anna: Do you like playing the piano, Tom? ➔ Tom: Yes, I (5) ___________, but I don’t know how to play it.',
      wordBank: ['name', 'meet', 'and', 'sing', 'do'],
      options: ['do', 'can', 'am', 'like'],
      correctAnswer: 'do',
      explanation: 'Câu hỏi bắt đầu bằng trợ động từ "Do you like...?", câu trả lời khẳng định là: "Yes, I do."',
      vietnameseTranslation: 'Vâng, tôi có thích (Yes, I do).',
      hint: 'Trả lời câu hỏi "Do you...?" là "Yes, I do".'
    },

    // B. VOCABULARY & GRAMMAR - IV. Look at the pictures and choose the correct answer
    {
      id: 'm1-e3-q29',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Look and choose (Nhìn tranh chọn đáp án)',
      questionNumber: 29,
      questionPrompt: '1. Can you swim? (Tranh bạn nhỏ đang bơi cười tươi rạng rỡ) ➔ Chọn câu trả lời đúng:',
      imageEmoji: '🏊‍♂️',
      options: ['B. Yes, I can.', 'A. No, I can’t.', 'C. It’s great.'],
      correctAnswer: 'B. Yes, I can.',
      explanation: 'Tranh miêu tả bạn nhỏ đang bơi lội rất thành thạo và vui vẻ ➔ "Yes, I can." (Có, mình biết bơi).',
      vietnameseTranslation: 'Bạn có biết bơi không? — Có, mình biết bơi (Yes, I can).',
      hint: 'Hỏi Can you swim? và tranh đang bơi tốt.'
    },
    {
      id: 'm1-e3-q30',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Look and choose (Nhìn tranh chọn đáp án)',
      questionNumber: 30,
      questionPrompt: '2. She can play the _______ very well (Tranh bạn nữ gảy đàn ghi-ta màu cam)',
      imageEmoji: '🎸',
      options: ['B. guitar', 'A. piano', 'C. music'],
      correctAnswer: 'B. guitar',
      explanation: 'Bức tranh vẽ bạn nữ đang gảy đàn ghi-ta ➔ "She can play the guitar very well." (Cô ấy có thể chơi đàn ghi-ta rất hay).',
      vietnameseTranslation: 'Cô ấy có thể chơi đàn ghi-ta rất giỏi.',
      hint: 'Đàn ghi-ta = guitar.'
    },
    {
      id: 'm1-e3-q31',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Look and choose (Nhìn tranh chọn đáp án)',
      questionNumber: 31,
      questionPrompt: '3. What is the date today? – It’s the ______ of September. (Tranh tờ lịch ghi SEPTEMBER 1)',
      imageEmoji: '🗓️',
      options: ['B. first', 'A. one', 'C. second'],
      correctAnswer: 'B. first',
      explanation: 'Nói ngày trong tháng dùng số thứ tự: ngày mùng 1 là "the first" ➔ "It\'s the first of September." (Ngày 1 tháng Chín).',
      vietnameseTranslation: 'Hôm nay là ngày 1 tháng Chín (the first of September).',
      hint: 'Số thứ tự của ngày 1 là "first".'
    },
    {
      id: 'm1-e3-q32',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Look and choose (Nhìn tranh chọn đáp án)',
      questionNumber: 32,
      questionPrompt: '4. What do you do in the evening? – I _________. (Tranh bạn gái đeo headphone nghe nhạc)',
      imageEmoji: '🎧',
      options: ['C. listen to music', 'A. do my homework', 'B. dance'],
      correctAnswer: 'C. listen to music',
      explanation: 'Bức tranh vẽ bạn gái đang đeo tai nghe thưởng thức âm nhạc ➔ "listen to music" (nghe nhạc).',
      vietnameseTranslation: 'Tôi nghe nhạc vào buổi tối (listen to music).',
      hint: 'Hành động đeo tai nghe nghe nhạc.'
    },
    {
      id: 'm1-e3-q33',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Look and choose (Nhìn tranh chọn đáp án)',
      questionNumber: 33,
      questionPrompt: '5. What is his nationality? – He’s ________. (Tranh lá cờ Vương quốc Anh - Union Jack)',
      imageEmoji: '🇬🇧',
      options: ['A. English', 'B. American', 'C. Chinese'],
      correctAnswer: 'A. English',
      explanation: 'Lá cờ chữ thập đỏ trên nền xanh là quốc kỳ nước Anh (UK) ➔ Quốc tịch là "English" (người Anh).',
      vietnameseTranslation: 'Cậu ấy là người Anh (English).',
      hint: 'Quốc kỳ Vương quốc Anh.'
    }
  ]
};

// =============================================================================
// ĐỀ KIỂM TRA GIỮA KÌ – ĐỀ 4 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_EXAM_4: ExamPaper = {
  id: 'midterm1-exam4',
  category: 'midterm_1',
  categoryLabel: 'Giữa Học Kì 1',
  title: 'Đề Kiểm Tra Giữa Kì 1 – Đề 4 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe điền từ Julia & Jane, Nối tranh hoạt động, Tìm 5 lỗi sai ngữ pháp, Đọc hiểu bạn Rei Nhật Bản',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 32,
  icon: '🇯🇵',
  themeColor: 'from-purple-600 via-pink-600 to-rose-600',
  questions: [
    // A. LISTENING - Listen and complete (1 - 6)
    {
      id: 'm1-e4-q1',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 1: Nam & Julia)',
      questionNumber: 1,
      questionPrompt: 'Nam: What can you do, Julia? ➔ Julia: Well, I can draw and (1) ________ quite well.',
      audioText: "Nam: What can you do, Julia? Julia: Well, I can draw and sing quite well. I can also swim but I don't swim so well.",
      audioTranscript:
        "Nam: What can you do, Julia? (Cậu có thể làm gì vậy Julia?) — Julia: Well, I can draw and sing quite well. I can also swim but I don't swim so well. (À, tớ có thể vẽ và hát khá tốt. Tớ cũng có thể bơi nhưng bơi không giỏi lắm.)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['sing', 'dance', 'cook', 'draw'],
      correctAnswer: 'sing',
      explanation: 'Trong bài nghe, Julia nói: "I can draw and sing quite well." (Tớ có thể vẽ và hát khá hay).',
      vietnameseTranslation: 'Julia có thể vẽ và hát (sing) khá tốt.',
      hint: 'Lắng nghe từ "sing" (ca hát).'
    },
    {
      id: 'm1-e4-q2',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 1: Nam & Julia)',
      questionNumber: 2,
      questionPrompt: 'Julia: I can also (2) ________, but I don\'t swim so well.',
      audioText: "Nam: What can you do, Julia? Julia: Well, I can draw and sing quite well. I can also swim but I don't swim so well.",
      audioTranscript: "Julia: I can also swim but I don't swim so well. (Tớ cũng có thể bơi nhưng tớ bơi không giỏi lắm.)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['swim', 'skip', 'skate', 'cycle'],
      correctAnswer: 'swim',
      explanation: 'Julia nói tiếp: "I can also swim but I don\'t swim so well." (Tớ cũng có thể bơi lội).',
      vietnameseTranslation: 'Julia cũng biết bơi (swim).',
      hint: 'Lắng nghe từ "swim" (bơi lội).'
    },
    {
      id: 'm1-e4-q3',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 2: Dan & Jane)',
      questionNumber: 3,
      questionPrompt: 'Dan: Can you play any (3) ________, Jane? ➔ Jane: Yes, of course.',
      audioText: "Dan: Can you play any sports, Jane? Jane: Yes, of course. Dan: What sports can you play? Jane: A lot. Football, badminton, volleyball, and so on.",
      audioTranscript:
        "Dan: Can you play any sports, Jane? (Cậu có chơi môn thể thao nào không, Jane?) — Jane: Yes, of course. (Có chứ, dĩ nhiên rồi.)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['sports', 'games', 'instruments', 'songs'],
      correctAnswer: 'sports',
      explanation: 'Dan hỏi: "Can you play any sports, Jane?" (Cậu có chơi môn thể thao nào không Jane?).',
      vietnameseTranslation: 'Môn thể thao (sports).',
      hint: 'Lắng nghe từ "sports".'
    },
    {
      id: 'm1-e4-q4',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 2: Dan & Jane)',
      questionNumber: 4,
      questionPrompt: 'Dan: What sports can you play? ➔ Jane: A lot. Football, (4) ________, volleyball, and so on.',
      audioText: "Dan: What sports can you play? Jane: A lot. Football, badminton, volleyball, and so on.",
      audioTranscript: "Jane: A lot. Football, badminton, volleyball, and so on. (Nhiều lắm. Bóng đá, cầu lông, bóng chuyền,...)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['badminton', 'tennis', 'basketball', 'chess'],
      correctAnswer: 'badminton',
      explanation: 'Jane liệt kê: "Football, badminton, volleyball, and so on." (Bóng đá, cầu lông, bóng chuyền).',
      vietnameseTranslation: 'Môn cầu lông (badminton).',
      hint: 'Môn cầu lông trong tiếng Anh là badminton.'
    },
    {
      id: 'm1-e4-q5',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 3: Lũ trẻ ồn ào)',
      questionNumber: 5,
      questionPrompt: 'A: The kids are so noisy! ➔ B: You can play the (5) ________ or read some fairy tales.',
      audioText: "Oh, the kids are so noisy. What should we do with them? You can play the piano or read some fairy tales. Then they will listen to you and don't make noise any more.",
      audioTranscript:
        "B: You can play the piano or read some fairy tales. Then they will listen to you and don't make noise any more. (Cậu có thể chơi đàn piano hoặc đọc truyện cổ tích cho tụi nhỏ. Chúng sẽ lắng nghe cậu và không làm ồn nữa đâu.)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['piano', 'guitar', 'violin', 'drum'],
      correctAnswer: 'piano',
      explanation: 'Người nói khuyên: "You can play the piano..." (Cậu có thể chơi đàn piano).',
      vietnameseTranslation: 'Đàn piano (piano).',
      hint: 'Nhạc cụ phím đen trắng.'
    },
    {
      id: 'm1-e4-q6',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - Listen and complete (Bài nghe 3: Lũ trẻ ồn ào)',
      questionNumber: 6,
      questionPrompt: 'B: Then they will (6) ________ to you and don’t make noise any more.',
      audioText: "Then they will listen to you and don't make noise any more.",
      audioTranscript: "B: Then they will listen to you... (Rồi chúng sẽ lắng nghe cậu...)",
      wordBank: ['sing', 'swim', 'sports', 'badminton', 'piano', 'listen'],
      options: ['listen', 'talk', 'shout', 'sing'],
      correctAnswer: 'listen',
      explanation: 'B nói: "Then they will listen to you..." (Rồi chúng sẽ lắng nghe cậu).',
      vietnameseTranslation: 'Lắng nghe (listen).',
      hint: 'Động từ "listen to".'
    },

    // B. VOCABULARY & GRAMMAR - I. Look and match (Tranh 1 - 5)
    {
      id: 'm1-e4-q7',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and match (Nhìn tranh và nối)',
      questionNumber: 7,
      questionPrompt: '1. Quan sát Tranh 1 (hai bạn nhỏ ngồi trước màn hình tivi 📺) và chọn cụm từ đúng:',
      imageEmoji: '📺',
      visualCards: [
        { id: 'v4-1', label: '1', title: 'Xem TV', emoji: '📺', cardType: 'picture' },
        { id: 'v4-2', label: '2', title: 'Cờ Nhật', emoji: '🇯🇵', cardType: 'flag' },
        { id: 'v4-3', label: '3', title: 'Chơi Piano', emoji: '🎹', cardType: 'picture' },
        { id: 'v4-4', label: '4', title: 'Buổi đêm', emoji: '🌙', cardType: 'picture' },
        { id: 'v4-5', label: '5', title: 'Chơi Cầu Lông', emoji: '🏸', cardType: 'picture' }
      ],
      options: ['d. Watch TV', 'a. Play badminton', 'b. At night', 'c. Japan', 'f. Play piano'],
      correctAnswer: 'd. Watch TV',
      explanation: 'Tranh 1 vẽ cảnh hai bạn đang ngồi ghế sofa xem tivi ➔ 1 nối với d (Watch TV).',
      vietnameseTranslation: '1 – d. Watch TV: xem TV',
      hint: 'Hành động xem truyền hình.'
    },
    {
      id: 'm1-e4-q8',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and match (Nhìn tranh và nối)',
      questionNumber: 8,
      questionPrompt: '2. Quan sát Tranh 2 (lá cờ hình tròn đỏ của Nhật Bản 🇯🇵) và chọn từ đúng:',
      imageEmoji: '🇯🇵',
      options: ['c. Japan', 'a. Play badminton', 'b. At night', 'd. Watch TV', 'f. Play piano'],
      correctAnswer: 'c. Japan',
      explanation: 'Tranh 2 vẽ quốc kỳ Nhật Bản có hình mặt trời đỏ ở giữa ➔ 2 nối với c (Japan).',
      vietnameseTranslation: '2 – c. Japan: nước Nhật Bản',
      hint: 'Đất nước mặt trời mọc.'
    },
    {
      id: 'm1-e4-q9',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and match (Nhìn tranh và nối)',
      questionNumber: 9,
      questionPrompt: '3. Quan sát Tranh 3 (bé gái đang mỉm cười đàn cây dương cầm lớn 🎹) và chọn cụm từ đúng:',
      imageEmoji: '🎹',
      options: ['f. Play piano', 'a. Play badminton', 'b. At night', 'c. Japan', 'd. Watch TV'],
      correctAnswer: 'f. Play piano',
      explanation: 'Tranh 3 vẽ bạn nữ đang chơi đàn dương cầm ➔ 3 nối với f (Play piano).',
      vietnameseTranslation: '3 – f. Play piano: chơi đàn piano',
      hint: 'Chơi đàn piano.'
    },
    {
      id: 'm1-e4-q10',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and match (Nhìn tranh và nối)',
      questionNumber: 10,
      questionPrompt: '4. Quan sát Tranh 4 (bé gái nằm ngủ trong phòng, ngoài cửa sổ có trăng sao 🌙) và chọn cụm từ đúng:',
      imageEmoji: '🌙',
      options: ['b. At night', 'a. Play badminton', 'c. Japan', 'd. Watch TV', 'f. Play piano'],
      correctAnswer: 'b. At night',
      explanation: 'Tranh 4 vẽ khung cảnh ban đêm bé gái ngủ say trên giường ➔ 4 nối với b (At night).',
      vietnameseTranslation: '4 – b. At night: vào buổi đêm',
      hint: 'Vào ban đêm.'
    },
    {
      id: 'm1-e4-q11',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and match (Nhìn tranh và nối)',
      questionNumber: 11,
      questionPrompt: '5. Quan sát Tranh 5 (bé gái đang tung vợt đánh quả cầu lông 🏸) và chọn cụm từ đúng:',
      imageEmoji: '🏸',
      options: ['a. Play badminton', 'b. At night', 'c. Japan', 'd. Watch TV', 'f. Play piano'],
      correctAnswer: 'a. Play badminton',
      explanation: 'Tranh 5 vẽ bạn nữ đang vung vợt đánh cầu lông ➔ 5 nối với a (Play badminton).',
      vietnameseTranslation: '5 – a. Play badminton: chơi cầu lông',
      hint: 'Môn cầu lông.'
    },

    // B. VOCABULARY & GRAMMAR - II. Choose the correct answer
    {
      id: 'm1-e4-q12',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 12,
      questionPrompt: '1. ________ is the date today?',
      options: ['B. What', 'A. Where', 'C. When', 'D. How'],
      correctAnswer: 'B. What',
      explanation: 'Cấu trúc chuẩn hỏi ngày hôm nay là ngày bao nhiêu: "What is the date today?".',
      grammarFocus: 'What is the date today? (Hỏi ngày tháng hôm nay).',
      vietnameseTranslation: 'Hôm nay là ngày bao nhiêu? (What is the date today?)',
      hint: 'Từ để hỏi đi với "is the date today" là What.'
    },
    {
      id: 'm1-e4-q13',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 13,
      questionPrompt: '2. It’s the ______ of May.',
      options: ['C. fifth', 'A. five', 'B. today', 'D. fiveth'],
      correctAnswer: 'C. fifth',
      explanation: 'Nói về ngày trong tháng, sau mạo từ "the" bắt buộc dùng số thứ tự. Ngày mùng 5 là "fifth" (không viết là fiveth hay five).',
      grammarFocus: 'It’s the + số thứ tự (fifth) + of + tháng.',
      vietnameseTranslation: 'Hôm nay là ngày 5 tháng Năm (fifth of May).',
      hint: 'Số thứ tự của số 5 viết là fifth.'
    },
    {
      id: 'm1-e4-q14',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 14,
      questionPrompt: '3. Where are you from? - ______________.',
      options: ['A. I’m from Malaysia.', 'B. I’m Japanese.', 'C. I from Japan.', 'D. I Malaysian.'],
      correctAnswer: 'A. I’m from Malaysia.',
      explanation: 'Câu hỏi hỏi về xuất xứ quê hương "Where are you from?" ➔ Trả lời chuẩn cấu trúc: "I’m from + Tên quốc gia" (I’m from Malaysia - Tôi đến từ Ma-lai-xi-a). Phương án B trả lời quốc tịch, C thiếu to be "am", D thiếu to be.',
      grammarFocus: 'Where are you from? ➔ I’m from + Quốc gia.',
      vietnameseTranslation: 'Tôi đến từ Malaysia (I’m from Malaysia).',
      hint: 'Câu trả lời phải có "from + tên nước".'
    },
    {
      id: 'm1-e4-q15',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 15,
      questionPrompt: '4. ______ you sing? – ______, I can.',
      options: ['C. Can - Yes', 'A. Can - No', 'B. Can’t - Yes', 'D. Can’t - No'],
      correctAnswer: 'C. Can - Yes',
      explanation: 'Hỏi khả năng: "Can you sing?". Vế trả lời khẳng định kết thúc bằng "I can" nên vế trước phải là "Yes" ➔ "Can you sing? – Yes, I can."',
      grammarFocus: 'Can you + V? ➔ Yes, I can.',
      vietnameseTranslation: 'Bạn có biết hát không? — Có, mình có thể.',
      hint: 'Đi kèm với "I can" là "Yes".'
    },
    {
      id: 'm1-e4-q16',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 16,
      questionPrompt: '5. I have Math _______ Monday and Wednesday.',
      options: ['A. on', 'B. in', 'C. at', 'D. of'],
      correctAnswer: 'A. on',
      explanation: 'Trước các thứ trong tuần (Monday, Wednesday...), ta bắt buộc sử dụng giới từ "on": on Monday and Wednesday.',
      grammarFocus: 'on + các thứ trong tuần (on Monday).',
      vietnameseTranslation: 'Tôi có môn Toán vào thứ Hai và thứ Tư (on Monday and Wednesday).',
      hint: 'Giới từ đi trước thứ trong tuần là "on".'
    },

    // B. VOCABULARY & GRAMMAR - III. Find ONE mistake in each sentence then correct it
    {
      id: 'm1-e4-q17',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 17,
      questionPrompt: '1. Tìm lỗi sai trong câu: "Who is your birthday?"',
      options: ['Sửa "Who" thành "What"', 'Sửa "is" thành "are"', 'Sửa "your" thành "you"', 'Sửa "birthday" thành "birthdays"'],
      correctAnswer: 'Sửa "Who" thành "What"',
      explanation: 'Hỏi về ngày sinh nhật của ai đó ta dùng từ để hỏi "What" (hoặc When), không dùng "Who" (chỉ người) ➔ Sửa: Who -> What ("What is your birthday?").',
      grammarFocus: 'What is your birthday? (không dùng Who).',
      vietnameseTranslation: 'Sinh nhật của bạn là khi nào? (What is your birthday?)',
      hint: 'Không dùng "Who" để hỏi về ngày sinh.'
    },
    {
      id: 'm1-e4-q18',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 18,
      questionPrompt: '2. Tìm lỗi sai trong câu: "What is he name?"',
      options: ['Sửa "he" thành "his"', 'Sửa "What" thành "Who"', 'Sửa "is" thành "does"', 'Sửa "name" thành "names"'],
      correctAnswer: 'Sửa "he" thành "his"',
      explanation: 'Trước danh từ "name" ta phải dùng tính từ sở hữu "his" (của cậu ấy), không dùng đại từ nhân xưng chủ ngữ "he" ➔ Sửa: he -> his ("What is his name?").',
      grammarFocus: 'Tính từ sở hữu: his name (tên của cậu ấy).',
      vietnameseTranslation: 'Tên của cậu ấy là gì? (What is his name?)',
      hint: 'Trước danh từ phải dùng tính từ sở hữu "his".'
    },
    {
      id: 'm1-e4-q19',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 19,
      questionPrompt: '3. Tìm lỗi sai trong câu: "I go to school in Monday."',
      options: ['Sửa "in" thành "on"', 'Sửa "go" thành "goes"', 'Sửa "to" thành "at"', 'Sửa "Monday" thành "Mondays"'],
      correctAnswer: 'Sửa "in" thành "on"',
      explanation: 'Trước các thứ trong tuần chỉ dùng giới từ "on", không dùng "in" ➔ Sửa: in -> on ("I go to school on Monday.").',
      grammarFocus: 'on + thứ trong tuần (on Monday).',
      vietnameseTranslation: 'Tôi đến trường vào thứ Hai (on Monday).',
      hint: 'Đi với thứ trong tuần là giới từ "on".'
    },
    {
      id: 'm1-e4-q20',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 20,
      questionPrompt: '4. Tìm lỗi sai trong câu: "Linda have a birthday party today."',
      options: ['Sửa "have" thành "has"', 'Sửa "Linda" thành "Linda’s"', 'Sửa "a" thành "an"', 'Sửa "today" thành "on today"'],
      correctAnswer: 'Sửa "have" thành "has"',
      explanation: 'Chủ ngữ "Linda" là ngôi thứ 3 số ít, động từ "have" phải chia thành "has" ở thì hiện tại đơn ➔ Sửa: have -> has ("Linda has a birthday party today.").',
      grammarFocus: 'Chủ ngữ số ít đi với has: Linda has a birthday party.',
      vietnameseTranslation: 'Linda có một bữa tiệc sinh nhật vào hôm nay.',
      hint: 'Chủ ngữ Linda đi với "has".'
    },
    {
      id: 'm1-e4-q21',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 21,
      questionPrompt: '5. Tìm lỗi sai trong câu: "They are from English."',
      options: ['Sửa "English" thành "England"', 'Sửa "They" thành "Them"', 'Sửa "are" thành "is"', 'Sửa "from" thành "to"'],
      correctAnswer: 'Sửa "English" thành "England"',
      explanation: 'Sau giới từ "from" phải là danh từ chỉ tên quốc gia "England" (nước Anh), không dùng từ chỉ quốc tịch/ngôn ngữ "English" ➔ Sửa: English -> England ("They are from England.").',
      grammarFocus: 'from + Tên quốc gia (England).',
      vietnameseTranslation: 'Họ đến từ nước Anh (They are from England).',
      hint: 'Sau "from" là tên quốc gia England.'
    },

    // B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Rei từ Nhật Bản)
    // Task 1: True (T) or False (F)
    {
      id: 'm1-e4-q22',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Đọc hiểu bạn Rei)',
      questionNumber: 22,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.\n\n(Tạm dịch: Xin chào, tên tớ là Rei. Tớ là người Nhật Bản và tớ đến từ Nhật. Tớ có thể nói cả tiếng Nhật và tiếng Anh. Trường học của tớ là trường quốc tế. Tớ có rất nhiều bạn ở đây. Có 20 học sinh trong lớp học của tớ. Họ đến từ những đất nước khác nhau. Linda đến từ Anh quốc. Jake và Keith đến từ Mỹ. Hân đến từ Việt Nam. SeoAhn đến từ Hàn Quốc. Các bạn của tớ đều rất tốt bụng và thân thiện. Chúng tớ thường chơi cầu lông và trốn tìm cùng nhau vào giờ ra chơi.)",
      questionPrompt: '1. Rei is Vietnamese. (Rei là người Việt Nam.) ➔ Chọn Đúng (T) hay Sai (F):',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài Rei nói: "I’m Japanese and I come from Japan." (Tớ là người Nhật Bản) ➔ Câu này là False (F).',
      vietnameseTranslation: 'Rei là người Nhật Bản, không phải người Việt Nam ➔ F.',
      hint: 'Rei là người Nhật.'
    },
    {
      id: 'm1-e4-q23',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Đọc hiểu bạn Rei)',
      questionNumber: 23,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '2. He can speak Japanese and English. ➔ Chọn Đúng (T) hay Sai (F):',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài có câu: "I can speak Japanese and English." ➔ Chọn True (T).',
      vietnameseTranslation: 'Cậu ấy có thể nói cả tiếng Nhật và tiếng Anh ➔ T.',
      hint: 'Tìm câu "speak Japanese and English".'
    },
    {
      id: 'm1-e4-q24',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Đọc hiểu bạn Rei)',
      questionNumber: 24,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '3. He has many friends at school. ➔ Chọn Đúng (T) hay Sai (F):',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài: "I have got a lot of friends here." (a lot of = many) ➔ Chọn True (T).',
      vietnameseTranslation: 'Cậu ấy có nhiều bạn bè ở trường ➔ T.',
      hint: 'a lot of friends = many friends.'
    },
    {
      id: 'm1-e4-q25',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Đọc hiểu bạn Rei)',
      questionNumber: 25,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '4. All of his friends come from Viet Nam. ➔ Chọn Đúng (T) hay Sai (F):',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài: "They are from different countries." (Linda từ Anh, Jake & Keith từ Mỹ, SeoAhn từ Hàn Quốc, chỉ có Han từ Việt Nam) ➔ Câu này là False (F).',
      vietnameseTranslation: 'Các bạn của Rei đến từ nhiều quốc gia khác nhau ➔ F.',
      hint: 'Họ đến từ nhiều nước khác nhau.'
    },
    {
      id: 'm1-e4-q26',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Đọc hiểu bạn Rei)',
      questionNumber: 26,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '5. Rei plays badminton and hide-and-seek with his friends at break time. ➔ Chọn Đúng (T) hay Sai (F):',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Câu cuối bài: "We often play badminton and hide-and-seek together during break time together." ➔ Chọn True (T).',
      vietnameseTranslation: 'Chơi cầu lông và trốn tìm vào giờ ra chơi ➔ T.',
      hint: 'Xem câu cuối của đoạn văn.'
    },

    // Task 2: Answer the questions
    {
      id: 'm1-e4-q27',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Trả lời câu hỏi)',
      questionNumber: 27,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '1. What nationality is Rei?',
      options: ['He is Japanese.', 'He is Vietnamese.', 'He is English.', 'He is American.'],
      correctAnswer: 'He is Japanese.',
      explanation: 'Thông tin ở câu đầu: "I’m Japanese" ➔ He is Japanese (Cậu ấy là người Nhật Bản).',
      vietnameseTranslation: 'Cậu ấy là người Nhật Bản (He is Japanese).',
      hint: 'Tìm câu "I’m Japanese".'
    },
    {
      id: 'm1-e4-q28',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Trả lời câu hỏi)',
      questionNumber: 28,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '2. Can he speak English?',
      options: ['Yes, he can.', 'No, he can’t.', 'Yes, he does.', 'No, he doesn’t.'],
      correctAnswer: 'Yes, he can.',
      explanation: 'Thông tin: "I can speak Japanese and English." ➔ Yes, he can (Có, cậu ấy có thể nói tiếng Anh).',
      vietnameseTranslation: 'Có, cậu ấy có thể nói tiếng Anh (Yes, he can).',
      hint: 'Rei nói được tiếng Anh.'
    },
    {
      id: 'm1-e4-q29',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Trả lời câu hỏi)',
      questionNumber: 29,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '3. How many students are there in his class?',
      options: ['There are twenty students in his class.', 'There are twelve students.', 'There are thirty students.', 'There are twenty-two students.'],
      correctAnswer: 'There are twenty students in his class.',
      explanation: 'Thông tin: "There are twenty students in my class." (twenty = 20 học sinh) ➔ There are twenty students in his class.',
      vietnameseTranslation: 'Có 20 học sinh trong lớp (There are twenty students).',
      hint: 'Số 20 trong tiếng Anh là twenty.'
    },
    {
      id: 'm1-e4-q30',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Trả lời câu hỏi)',
      questionNumber: 30,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '4. Where are Jake and Keith from?',
      options: ['They are from the USA.', 'They are from England.', 'They are from Viet Nam.', 'They are from Korea.'],
      correctAnswer: 'They are from the USA.',
      explanation: 'Thông tin: "Jake and Keith come from the USA." ➔ They are from the USA (Họ đến từ nước Mỹ).',
      vietnameseTranslation: 'Họ đến từ nước Mỹ (They are from the USA).',
      hint: 'Tìm tên Jake and Keith.'
    },
    {
      id: 'm1-e4-q31',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and do tasks (Trả lời câu hỏi)',
      questionNumber: 31,
      readingPassage:
        "Hello, my name is Rei. I’m Japanese and I come from Japan. I can speak Japanese and English. My school is an international school. I have got a lot of friends here. There are twenty students in my class. They are from different countries. Linda is from England. Jake and Keith come from the USA. Han is from Viet Nam. SeoAhn comes from Korea. My friends are kind and friendly. We often play badminton and hide-and-seek together during break time together.",
      questionPrompt: '5. What do Rei and his friends play at the break time?',
      options: [
        'They play badminton, hide-and-seek together at the break time.',
        'They play football and basketball.',
        'They play chess and table tennis.',
        'They play the piano and guitar.'
      ],
      correctAnswer: 'They play badminton, hide-and-seek together at the break time.',
      explanation: 'Thông tin: "We often play badminton and hide-and-seek together during break time together." ➔ Họ chơi cầu lông và trốn tìm.',
      vietnameseTranslation: 'Họ chơi cầu lông và trốn tìm vào giờ ra chơi.',
      hint: 'Cầu lông (badminton) và trốn tìm (hide-and-seek).'
    },
    {
      id: 'm1-e4-q32',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Make sentences (Sắp xếp câu)',
      questionNumber: 32,
      questionPrompt: 'Sắp xếp lại câu nói về nguồn gốc của Rei: Japan / from / comes / He / .',
      scrambledWords: ['He', 'comes', 'from', 'Japan.'],
      correctAnswer: 'He comes from Japan.',
      explanation: 'Cấu trúc xuất thân: He comes from Japan. (Cậu ấy đến từ Nhật Bản).',
      vietnameseTranslation: 'Cậu ấy đến từ Nhật Bản.',
      hint: 'Bắt đầu bằng chủ ngữ "He".'
    }
  ]
};

// =============================================================================
// ĐỀ KIỂM TRA GIỮA KÌ – ĐỀ 5 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_EXAM_5: ExamPaper = {
  id: 'midterm1-exam5',
  category: 'midterm_1',
  categoryLabel: 'Giữa Học Kì 1',
  title: 'Đề Kiểm Tra Giữa Kì 1 – Đề 5 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Từ khác loại, Nối tranh Hàn Quốc/Chạy bộ/Môn Toán, Nối hội thoại, Đọc hiểu Anna & Đặt câu hỏi',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 30,
  icon: '🇰🇷',
  themeColor: 'from-amber-600 via-orange-600 to-red-600',
  questions: [
    // I. Odd one out (1 - 5)
    {
      id: 'm1-e5-q1',
      type: 'odd_one_out',
      exerciseTitle: 'I. Odd one out (Chọn từ khác loại)',
      questionNumber: 1,
      questionPrompt: '1. Chọn từ khác loại: morning, evening, afternoon, birthday:',
      options: ['birthday', 'morning', 'evening', 'afternoon'],
      correctAnswer: 'birthday',
      explanation: '"morning" (buổi sáng), "evening" (buổi tối), "afternoon" (buổi chiều) là các buổi trong ngày; còn "birthday" (sinh nhật) là ngày kỷ niệm.',
      grammarFocus: 'birthday không phải là một buổi trong ngày.',
      hint: 'Từ nào là ngày kỷ niệm chứ không phải buổi sáng/chiều/tối?'
    },
    {
      id: 'm1-e5-q2',
      type: 'odd_one_out',
      exerciseTitle: 'I. Odd one out (Chọn từ khác loại)',
      questionNumber: 2,
      questionPrompt: '2. Chọn từ khác loại: Japan, American, English, Vietnamese:',
      options: ['Japan', 'American', 'English', 'Vietnamese'],
      correctAnswer: 'Japan',
      explanation: '"American" (người Mỹ), "English" (người Anh), "Vietnamese" (người Việt) là các từ chỉ quốc tịch; riêng "Japan" (nước Nhật Bản) là tên quốc gia.',
      grammarFocus: 'Japan là tên nước, các từ còn lại là quốc tịch.',
      hint: 'Từ nào là tên đất nước?'
    },
    {
      id: 'm1-e5-q3',
      type: 'odd_one_out',
      exerciseTitle: 'I. Odd one out (Chọn từ khác loại)',
      questionNumber: 3,
      questionPrompt: '3. Chọn từ khác loại: Monday, September, Friday, Tuesday:',
      options: ['September', 'Monday', 'Friday', 'Tuesday'],
      correctAnswer: 'September',
      explanation: '"Monday" (thứ Hai), "Friday" (thứ Sáu), "Tuesday" (thứ Ba) là các thứ trong tuần; còn "September" (tháng Chín) là tên tháng trong năm.',
      grammarFocus: 'September là tên tháng, các từ khác là thứ trong tuần.',
      hint: 'Từ nào chỉ tên tháng?'
    },
    {
      id: 'm1-e5-q4',
      type: 'odd_one_out',
      exerciseTitle: 'I. Odd one out (Chọn từ khác loại)',
      questionNumber: 4,
      questionPrompt: '4. Chọn từ khác loại: second, third, five, fifth:',
      options: ['five', 'second', 'third', 'fifth'],
      correctAnswer: 'five',
      explanation: '"second" (thứ hai), "third" (thứ ba), "fifth" (thứ năm) đều là số thứ tự (Ordinal numbers); riêng "five" (số 5) là số đếm (Cardinal number).',
      grammarFocus: 'five là số đếm, các từ còn lại là số thứ tự.',
      hint: 'Từ nào là số đếm thông thường?'
    },
    {
      id: 'm1-e5-q5',
      type: 'odd_one_out',
      exerciseTitle: 'I. Odd one out (Chọn từ khác loại)',
      questionNumber: 5,
      questionPrompt: '5. Chọn từ khác loại: piano, badminton, football, volleyball:',
      options: ['piano', 'badminton', 'football', 'volleyball'],
      correctAnswer: 'piano',
      explanation: '"badminton" (cầu lông), "football" (bóng đá), "volleyball" (bóng chuyền) đều là các môn thể thao; còn "piano" (đàn dương cầm) là nhạc cụ.',
      grammarFocus: 'piano là nhạc cụ, các từ khác là môn thể thao.',
      hint: 'Từ nào là dụng cụ âm nhạc?'
    },

    // II. Look and match (Tranh 1 - 5)
    {
      id: 'm1-e5-q6',
      type: 'matching',
      exerciseTitle: 'II. Look and match (Nhìn tranh và nối)',
      questionNumber: 6,
      questionPrompt: '1. Quan sát Tranh 1 (lá cờ hình tròn âm dương của Hàn Quốc 🇰🇷) và chọn từ đúng:',
      imageEmoji: '🇰🇷',
      visualCards: [
        { id: 'v5-1', label: '1', title: 'Hàn Quốc', emoji: '🇰🇷', cardType: 'flag' },
        { id: 'v5-2', label: '2', title: 'Xem TV', emoji: '📺', cardType: 'picture' },
        { id: 'v5-3', label: '3', title: 'Cầu Lông', emoji: '🏸', cardType: 'picture' },
        { id: 'v5-4', label: '4', title: 'Chạy Bộ', emoji: '🏃‍♀️', cardType: 'picture' },
        { id: 'v5-5', label: '5', title: 'Môn Toán', emoji: '📐', cardType: 'picture' }
      ],
      options: ['e. Korea', 'a. Watch TV', 'b. Math', 'c. Go jogging', 'd. Play badminton'],
      correctAnswer: 'e. Korea',
      explanation: 'Tranh 1 vẽ quốc kỳ Hàn Quốc ➔ 1 nối với e (Korea: Hàn Quốc).',
      vietnameseTranslation: '1 – e. Korea: Hàn Quốc',
      hint: 'Quốc kỳ Hàn Quốc.'
    },
    {
      id: 'm1-e5-q7',
      type: 'matching',
      exerciseTitle: 'II. Look and match (Nhìn tranh và nối)',
      questionNumber: 7,
      questionPrompt: '2. Quan sát Tranh 2 (hai người ngồi xem màn hình tivi 📺) và chọn từ đúng:',
      imageEmoji: '📺',
      options: ['a. Watch TV', 'b. Math', 'c. Go jogging', 'd. Play badminton', 'e. Korea'],
      correctAnswer: 'a. Watch TV',
      explanation: 'Tranh 2 vẽ cảnh xem tivi ➔ 2 nối với a (Watch TV: xem TV).',
      vietnameseTranslation: '2 – a. Watch TV: xem TV',
      hint: 'Xem truyền hình.'
    },
    {
      id: 'm1-e5-q8',
      type: 'matching',
      exerciseTitle: 'II. Look and match (Nhìn tranh và nối)',
      questionNumber: 8,
      questionPrompt: '3. Quan sát Tranh 3 (bé gái đang vung vợt đánh cầu lông 🏸) và chọn từ đúng:',
      imageEmoji: '🏸',
      options: ['d. Play badminton', 'a. Watch TV', 'b. Math', 'c. Go jogging', 'e. Korea'],
      correctAnswer: 'd. Play badminton',
      explanation: 'Tranh 3 vẽ bạn nhỏ chơi cầu lông ➔ 3 nối với d (Play badminton: chơi cầu lông).',
      vietnameseTranslation: '3 – d. Play badminton: chơi cầu lông',
      hint: 'Chơi cầu lông.'
    },
    {
      id: 'm1-e5-q9',
      type: 'matching',
      exerciseTitle: 'II. Look and match (Nhìn tranh và nối)',
      questionNumber: 9,
      questionPrompt: '4. Quan sát Tranh 4 (cô gái mặc đồ thể thao đang chạy bộ 🏃‍♀️) và chọn từ đúng:',
      imageEmoji: '🏃‍♀️',
      options: ['c. Go jogging', 'a. Watch TV', 'b. Math', 'd. Play badminton', 'e. Korea'],
      correctAnswer: 'c. Go jogging',
      explanation: 'Tranh 4 vẽ cô gái đang chạy bộ rèn luyện sức khỏe ➔ 4 nối với c (Go jogging: chạy bộ).',
      vietnameseTranslation: '4 – c. Go jogging: chạy bộ',
      hint: 'Chạy bộ thể dục.'
    },
    {
      id: 'm1-e5-q10',
      type: 'matching',
      exerciseTitle: 'II. Look and match (Nhìn tranh và nối)',
      questionNumber: 10,
      questionPrompt: '5. Quan sát Tranh 5 (thước kẻ ê-ke, máy tính bỏ túi và ký hiệu toán học 📐) và chọn từ đúng:',
      imageEmoji: '📐',
      options: ['b. Math', 'a. Watch TV', 'c. Go jogging', 'd. Play badminton', 'e. Korea'],
      correctAnswer: 'b. Math',
      explanation: 'Tranh 5 vẽ dụng cụ học tập môn Toán (thước kẻ, máy tính, com-pa) ➔ 5 nối với b (Math: môn toán).',
      vietnameseTranslation: '5 – b. Math: môn toán',
      hint: 'Môn toán học.'
    },

    // III. Read and match (Hội thoại A - B)
    {
      id: 'm1-e5-q11',
      type: 'matching',
      exerciseTitle: 'III. Read and match (Đọc và nối hội thoại)',
      questionNumber: 11,
      questionPrompt: '1. Nối câu chào: "Nice to see you again." với câu đáp lại đúng:',
      options: ['c. Nice to see you again, too.', 'a. He is from Canada.', 'b. Next Monday.', 'd. It is Wednesday.', 'e. No, he can’t.'],
      correctAnswer: 'c. Nice to see you again, too.',
      explanation: 'Khi ai đó chào "Nice to see you again" (Rất vui được gặp lại bạn), câu đáp chuẩn là "Nice to see you again, too." ➔ 1 nối với c.',
      vietnameseTranslation: 'Rất vui được gặp lại bạn — Tớ cũng rất vui khi gặp lại bạn.',
      hint: 'Đáp lại câu chào "Nice to see you again".'
    },
    {
      id: 'm1-e5-q12',
      type: 'matching',
      exerciseTitle: 'III. Read and match (Đọc và nối hội thoại)',
      questionNumber: 12,
      questionPrompt: '2. Nối câu hỏi khả năng: "Can he play the piano?" với câu trả lời đúng:',
      options: ['e. No, he can’t.', 'a. He is from Canada.', 'b. Next Monday.', 'c. Nice to see you again, too.', 'd. It is Wednesday.'],
      correctAnswer: 'e. No, he can’t.',
      explanation: 'Hỏi "Can he + V?" ➔ Trả lời: "No, he can’t." (hoặc Yes, he can) ➔ 2 nối với e.',
      vietnameseTranslation: 'Anh ấy có biết chơi đàn piano không? — Không, anh ấy không biết.',
      hint: 'Hỏi Can he...? trả lời No, he can’t.'
    },
    {
      id: 'm1-e5-q13',
      type: 'matching',
      exerciseTitle: 'III. Read and match (Đọc và nối hội thoại)',
      questionNumber: 13,
      questionPrompt: '3. Nối câu hỏi xuất thân: "Where is Peter from?" với câu trả lời đúng:',
      options: ['a. He is from Canada.', 'b. Next Monday.', 'c. Nice to see you again, too.', 'd. It is Wednesday.', 'e. No, he can’t.'],
      correctAnswer: 'a. He is from Canada.',
      explanation: 'Hỏi Peter từ đâu đến: "Where is Peter from?" ➔ Trả lời: "He is from Canada." (Cậu ấy đến từ Canada) ➔ 3 nối với a.',
      vietnameseTranslation: 'Peter đến từ đâu? — Cậu ấy đến từ Canada.',
      hint: 'Tìm câu trả lời có "He is from...".'
    },
    {
      id: 'm1-e5-q14',
      type: 'matching',
      exerciseTitle: 'III. Read and match (Đọc và nối hội thoại)',
      questionNumber: 14,
      questionPrompt: '4. Nối câu hỏi thứ: "What day is it today?" với câu trả lời đúng:',
      options: ['d. It is Wednesday.', 'a. He is from Canada.', 'b. Next Monday.', 'c. Nice to see you again, too.', 'e. No, he can’t.'],
      correctAnswer: 'd. It is Wednesday.',
      explanation: 'Hỏi hôm nay là thứ mấy: "What day is it today?" ➔ Trả lời: "It is Wednesday." (Hôm nay là thứ Tư) ➔ 4 nối với d.',
      vietnameseTranslation: 'Hôm nay là thứ mấy? — Là thứ Tư.',
      hint: 'Trả lời ngày thứ trong tuần (Wednesday).'
    },
    {
      id: 'm1-e5-q15',
      type: 'matching',
      exerciseTitle: 'III. Read and match (Đọc và nối hội thoại)',
      questionNumber: 15,
      questionPrompt: '5. Nối câu hỏi thời gian: "When is your mother\'s birthday party?" với câu trả lời đúng:',
      options: ['b. Next Monday.', 'a. He is from Canada.', 'c. Nice to see you again, too.', 'd. It is Wednesday.', 'e. No, he can’t.'],
      correctAnswer: 'b. Next Monday.',
      explanation: 'Hỏi sinh nhật mẹ diễn ra khi nào: "When is your mother\'s birthday party?" ➔ Trả lời: "Next Monday." (Thứ Hai tuần tới) ➔ 5 nối với b.',
      vietnameseTranslation: 'Bữa tiệc sinh nhật của mẹ bạn khi nào diễn ra? — Vào thứ Hai tuần sau.',
      hint: 'Chỉ thời điểm trong tương lai: Next Monday.'
    },

    // IV. Choose the correct answer (1 - 5)
    {
      id: 'm1-e5-q16',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 16,
      questionPrompt: '1. I have a _____ of friends at school.',
      options: ['A. lot', 'B. lots', 'C. many', 'D. much'],
      correctAnswer: 'A. lot',
      explanation: 'Cụm từ chỉ số lượng nhiều: "a lot of + danh từ số nhiều" ➔ "I have a lot of friends at school." (Tôi có rất nhiều bạn bè ở trường).',
      grammarFocus: 'Cụm từ: a lot of + N số nhiều.',
      vietnameseTranslation: 'Tôi có rất nhiều bạn bè ở trường (a lot of friends).',
      hint: 'Đi sau mạo từ "a" là "lot of".'
    },
    {
      id: 'm1-e5-q17',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 17,
      questionPrompt: '2. What nationality is Linda? - ____________.',
      options: ['A. She is English.', 'B. She is from England.', 'C. She is nine.', 'D. She has Math on Monday.'],
      correctAnswer: 'A. She is English.',
      explanation: 'Câu hỏi hỏi về quốc tịch: "What nationality is Linda?" ➔ Trả lời bằng tính từ chỉ quốc tịch: "She is English." (Cô ấy là người Anh). Phương án B nói về xuất thân tên nước (phải hỏi Where is Linda from).',
      grammarFocus: 'What nationality + is + S? ➔ S + is + quốc tịch (English).',
      vietnameseTranslation: 'Linda có quốc tịch gì? — Cô ấy là người Anh (She is English).',
      hint: 'Trả lời bằng từ chỉ quốc tịch: English.'
    },
    {
      id: 'm1-e5-q18',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 18,
      questionPrompt: '3. This is my new friend. Her _______ is Yukiko.',
      options: ['C. name', 'A. age', 'B. friend', 'D. she'],
      correctAnswer: 'C. name',
      explanation: 'Cấu trúc giới thiệu tên: "Her name is + Tên riêng" (Tên cô ấy là Yukiko) ➔ chọn "name".',
      grammarFocus: 'Her name is + Tên người.',
      vietnameseTranslation: 'Đây là bạn mới của mình. Tên của bạn ấy là Yukiko.',
      hint: 'Từ chỉ tên gọi là "name".'
    },
    {
      id: 'm1-e5-q19',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 19,
      questionPrompt: '4. I go to the library _______ Saturday.',
      options: ['D. on', 'A. of', 'B. at', 'C. in'],
      correctAnswer: 'D. on',
      explanation: 'Trước các thứ trong tuần (Saturday: thứ Bảy), ta luôn dùng giới từ "on": on Saturday.',
      grammarFocus: 'on + thứ trong tuần (on Saturday).',
      vietnameseTranslation: 'Tôi đến thư viện vào ngày thứ Bảy (on Saturday).',
      hint: 'Giới từ đi trước thứ trong tuần là "on".'
    },
    {
      id: 'm1-e5-q20',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 20,
      questionPrompt: '5. What _________ she do? – She can sing very well.',
      options: ['A. can', 'B. can’t', 'C. do', 'D. is'],
      correctAnswer: 'A. can',
      explanation: 'Câu trả lời chứa trợ động từ khuyết thiếu "She can sing..." ➔ Câu hỏi phải dùng "can": "What can she do?" (Cô ấy có thể làm được gì?).',
      grammarFocus: 'What can + S + do? ➔ S + can + V.',
      vietnameseTranslation: 'Cô ấy có thể làm gì? — Cô ấy có thể hát rất hay.',
      hint: 'Câu trả lời có "can" thì câu hỏi cũng có "can".'
    },

    // V. Read and answer questions (Đoạn văn bạn Anna)
    {
      id: 'm1-e5-q21',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu về bạn Anna)',
      questionNumber: 21,
      readingPassage:
        "Hi. I am Anna. I am from America. I am American. Today is Wednesday, the seventh of October. It's a school day. I go to school from Monday to Friday. And I do not go to school at the weekend. On Monday afternoon, I go to the English club. I go to school library on Tuesday with my best friend, Linda. I go swimming on Wednesday afternoon. I visit my grandparents on Saturday and Sunday.\n\n(Tạm dịch: Xin chào. Tôi là Anna. Tôi đến từ Mỹ. Tôi là người Mỹ. Hôm nay là thứ Tư, ngày 7 tháng Mười. Đó là một ngày đi học. Tôi đến trường từ thứ Hai đến thứ Sáu. Tôi không đi học vào cuối tuần. Vào chiều thứ Hai, tôi đến câu lạc bộ Tiếng Anh. Tôi đến thư viện vào thứ Ba với người bạn thân của mình, Linda. Tôi đi bơi vào chiều thứ Tư. Tôi đến thăm ông bà của tôi vào thứ Bảy và Chủ Nhật.)",
      questionPrompt: '1. What is her name?',
      options: ['Her name is Anna.', 'Her name is Linda.', 'Her name is Yukiko.', 'Her name is Jane.'],
      correctAnswer: 'Her name is Anna.',
      explanation: 'Câu mở đầu đoạn văn: "Hi. I am Anna." ➔ Tên của cô ấy là Anna (Her name is Anna).',
      vietnameseTranslation: 'Tên của cô ấy là Anna.',
      hint: 'Xem câu đầu tiên của bài đọc.'
    },
    {
      id: 'm1-e5-q22',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu về bạn Anna)',
      questionNumber: 22,
      readingPassage:
        "Hi. I am Anna. I am from America. I am American. Today is Wednesday, the seventh of October. It's a school day. I go to school from Monday to Friday. And I do not go to school at the weekend. On Monday afternoon, I go to the English club. I go to school library on Tuesday with my best friend, Linda. I go swimming on Wednesday afternoon. I visit my grandparents on Saturday and Sunday.",
      questionPrompt: '2. When does she go to school?',
      options: ['She goes to school from Monday to Friday.', 'She goes to school on Saturday and Sunday.', 'She goes to school on Tuesday only.', 'She goes to school at the weekend.'],
      correctAnswer: 'She goes to school from Monday to Friday.',
      explanation: 'Thông tin trong bài: "I go to school from Monday to Friday." ➔ Cô ấy đến trường từ thứ Hai đến thứ Sáu.',
      vietnameseTranslation: 'Cô ấy đi học từ thứ Hai đến thứ Sáu.',
      hint: 'Tìm câu "from Monday to Friday".'
    },
    {
      id: 'm1-e5-q23',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu về bạn Anna)',
      questionNumber: 23,
      readingPassage:
        "Hi. I am Anna. I am from America. I am American. Today is Wednesday, the seventh of October. It's a school day. I go to school from Monday to Friday. And I do not go to school at the weekend. On Monday afternoon, I go to the English club. I go to school library on Tuesday with my best friend, Linda. I go swimming on Wednesday afternoon. I visit my grandparents on Saturday and Sunday.",
      questionPrompt: '3. When does she go swimming?',
      options: ['She goes swimming on Wednesday afternoon.', 'She goes swimming on Monday afternoon.', 'She goes swimming on Tuesday morning.', 'She goes swimming on Saturday.'],
      correctAnswer: 'She goes swimming on Wednesday afternoon.',
      explanation: 'Thông tin trong bài: "I go swimming on Wednesday afternoon." ➔ Cô ấy đi bơi vào chiều thứ Tư.',
      vietnameseTranslation: 'Cô ấy đi bơi vào chiều thứ Tư.',
      hint: 'Tìm câu chứa từ "swimming".'
    },
    {
      id: 'm1-e5-q24',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu về bạn Anna)',
      questionNumber: 24,
      readingPassage:
        "Hi. I am Anna. I am from America. I am American. Today is Wednesday, the seventh of October. It's a school day. I go to school from Monday to Friday. And I do not go to school at the weekend. On Monday afternoon, I go to the English club. I go to school library on Tuesday with my best friend, Linda. I go swimming on Wednesday afternoon. I visit my grandparents on Saturday and Sunday.",
      questionPrompt: '4. What does she do on Monday afternoon?',
      options: ['She goes to the English club.', 'She goes to the school library.', 'She goes swimming in the pool.', 'She visits her grandparents.'],
      correctAnswer: 'She goes to the English club.',
      explanation: 'Thông tin trong bài: "On Monday afternoon, I go to the English club." ➔ Cô ấy đến câu lạc bộ tiếng Anh.',
      vietnameseTranslation: 'Cô ấy đến câu lạc bộ tiếng Anh vào chiều thứ Hai.',
      hint: 'Tìm cụm "Monday afternoon".'
    },
    {
      id: 'm1-e5-q25',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu về bạn Anna)',
      questionNumber: 25,
      readingPassage:
        "Hi. I am Anna. I am from America. I am American. Today is Wednesday, the seventh of October. It's a school day. I go to school from Monday to Friday. And I do not go to school at the weekend. On Monday afternoon, I go to the English club. I go to school library on Tuesday with my best friend, Linda. I go swimming on Wednesday afternoon. I visit my grandparents on Saturday and Sunday.",
      questionPrompt: '5. What does she do on Saturday and Sunday?',
      options: ['She visits her grandparents.', 'She goes to school.', 'She stays at home and watches TV.', 'She goes swimming with Linda.'],
      correctAnswer: 'She visits her grandparents.',
      explanation: 'Câu cuối cùng trong bài: "I visit my grandparents on Saturday and Sunday." ➔ Cô ấy đến thăm ông bà vào thứ Bảy và Chủ Nhật.',
      vietnameseTranslation: 'Cô ấy đi thăm ông bà vào thứ Bảy và Chủ Nhật.',
      hint: 'Xem câu cuối của đoạn văn.'
    },

    // VI. Write the question for each answer below (Đặt câu hỏi cho câu trả lời)
    {
      id: 'm1-e5-q26',
      type: 'multiple_choice',
      exerciseTitle: 'VI. Write the question for each answer (Đặt câu hỏi tương ứng)',
      questionNumber: 26,
      questionPrompt: '1. Câu trả lời: "I’m very well, thanks." ➔ Chọn câu hỏi phù hợp nhất:',
      options: ['How are you?', 'Where are you from?', 'What day is it today?', 'How old are you?'],
      correctAnswer: 'How are you?',
      explanation: '"I’m very well, thanks." (Tớ rất khỏe, cảm ơn cậu) là câu trả lời cho câu hỏi thăm sức khỏe: "How are you?" (Bạn có khỏe không?).',
      grammarFocus: 'How are you? ➔ I’m very well, thanks.',
      vietnameseTranslation: 'Bạn có khỏe không? — Tớ rất khỏe, cảm ơn.',
      hint: 'Câu hỏi thăm sức khỏe quen thuộc.'
    },
    {
      id: 'm1-e5-q27',
      type: 'multiple_choice',
      exerciseTitle: 'VI. Write the question for each answer (Đặt câu hỏi tương ứng)',
      questionNumber: 27,
      questionPrompt: '2. Câu trả lời: "I’m from Australia." ➔ Chọn câu hỏi phù hợp nhất:',
      options: ['Where are you from?', 'What nationality are you?', 'Where do you go?', 'What is your country?'],
      correctAnswer: 'Where are you from?',
      explanation: '"I’m from Australia." (Tớ đến từ nước Úc) trả lời cho câu hỏi về xuất xứ/nơi đến: "Where are you from?" (Bạn đến từ đâu?).',
      grammarFocus: 'Where are you from? ➔ I’m from + Tên nước.',
      vietnameseTranslation: 'Bạn đến từ đâu? — Tôi đến từ nước Úc.',
      hint: 'Câu hỏi có "Where" và "from".'
    },
    {
      id: 'm1-e5-q28',
      type: 'multiple_choice',
      exerciseTitle: 'VI. Write the question for each answer (Đặt câu hỏi tương ứng)',
      questionNumber: 28,
      questionPrompt: '3. Câu trả lời: "I’m Malaysian." ➔ Chọn câu hỏi phù hợp nhất:',
      options: ['What nationality are you?', 'Where are you from?', 'What country are you in?', 'Who are you?'],
      correctAnswer: 'What nationality are you?',
      explanation: '"I’m Malaysian." (Tớ là người Ma-lai-xi-a) trả lời cho câu hỏi về quốc tịch: "What nationality are you?" (Quốc tịch của bạn là gì?).',
      grammarFocus: 'What nationality are you? ➔ I’m + quốc tịch (Malaysian).',
      vietnameseTranslation: 'Quốc tịch của bạn là gì? — Tôi là người Malaysia.',
      hint: 'Câu hỏi về quốc tịch (nationality).'
    },
    {
      id: 'm1-e5-q29',
      type: 'multiple_choice',
      exerciseTitle: 'VI. Write the question for each answer (Đặt câu hỏi tương ứng)',
      questionNumber: 29,
      questionPrompt: '4. Câu trả lời: "It’s Thursday." ➔ Chọn câu hỏi phù hợp nhất:',
      options: ['What day is it today?', 'What is the date today?', 'When is Thursday?', 'What time is it?'],
      correctAnswer: 'What day is it today?',
      explanation: '"It’s Thursday." (Hôm nay là thứ Năm) trả lời cho câu hỏi thứ trong tuần: "What day is it today?".',
      grammarFocus: 'What day is it today? ➔ It’s + thứ (Thursday).',
      vietnameseTranslation: 'Hôm nay là thứ mấy? — Là thứ Năm.',
      hint: 'Hỏi thứ trong tuần: What day is it today?'
    },
    {
      id: 'm1-e5-q30',
      type: 'multiple_choice',
      exerciseTitle: 'VI. Write the question for each answer (Đặt câu hỏi tương ứng)',
      questionNumber: 30,
      questionPrompt: '5. Câu trả lời: "I can cook and dance." ➔ Chọn câu hỏi phù hợp nhất:',
      options: ['What can you do?', 'Can you cook?', 'Can you dance?', 'What do you do?'],
      correctAnswer: 'What can you do?',
      explanation: '"I can cook and dance." (Tớ có thể nấu ăn và khiêu vũ) trả lời cho câu hỏi về khả năng có thể làm gì: "What can you do?".',
      grammarFocus: 'What can you do? ➔ I can + V.',
      vietnameseTranslation: 'Bạn có thể làm được gì? — Tôi có thể nấu ăn và nhảy.',
      hint: 'Hỏi về khả năng: What can you do?'
    }
  ]
};
