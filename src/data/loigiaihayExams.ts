import { ExamPaper } from './examData';

export const LOIGIAIHAY_EXAM_1: ExamPaper = {
  id: 'midterm1-exam1',
  category: 'midterm_1',
  categoryLabel: 'Giữa Học Kì 1',
  title: 'Đề Kiểm Tra Giữa Kì 1 – Đề 1 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ phần Nghe Audio (Listening), Từ vựng - Ngữ pháp, Nhìn tranh điền từ, Đọc hiểu & Nối câu',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 37,
  icon: '📘',
  themeColor: 'from-blue-600 via-indigo-600 to-sky-600',
  questions: [
    // =========================================================================
    // A. LISTENING - I. Listen and number (Nghe và đánh số tờ lịch 1 - 4)
    // =========================================================================
    {
      id: 'm1-e1-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 4)',
      questionNumber: 1,
      questionPrompt: 'Lắng nghe đoạn hội thoại số 1 và chọn tờ lịch ngày sinh nhật tương ứng:',
      audioText: "Today is my birthday. Happy birthday! When's your birthday, Nam? It's on the second of April.",
      audioTranscript:
        "Nam: Today is my birthday. (Hôm nay là sinh nhật tớ đấy!) — Friend: Happy birthday! (Chúc mừng sinh nhật cậu.) When's your birthday, Nam? (Sinh nhật cậu là ngày nào, Nam?) — Nam: It's on the second of April. (Ngày 2 tháng Tư.)",
      visualCards: [
        { id: 'cal-a', label: 'Hình A', title: '15', monthName: 'JANUARY', dayNumber: '15', cardType: 'calendar', bgGradient: 'from-sky-500 to-blue-600' },
        { id: 'cal-b', label: 'Hình B', title: '02', monthName: 'APRIL', dayNumber: '02', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'cal-c', label: 'Hình C', title: '26', monthName: 'JULY', dayNumber: '26', cardType: 'calendar', bgGradient: 'from-amber-500 to-orange-600' },
        { id: 'cal-d', label: 'Hình D', title: '6', monthName: 'MARCH', dayNumber: '6', cardType: 'calendar', bgGradient: 'from-indigo-500 to-blue-700' }
      ],
      options: ['Hình A (January 15)', 'Hình B (April 02)', 'Hình C (July 26)', 'Hình D (March 6)'],
      correctAnswer: 'Hình B (April 02)',
      explanation: 'Trong đoạn 1, Nam nói: "It\'s on the second of April." (Ngày 2 tháng Tư). Do đó Hình B (tờ lịch APRIL 02) tương ứng với số 1.',
      vietnameseTranslation: 'Sinh nhật của Nam vào ngày 2 tháng Tư ➔ Hình B.',
      hint: 'Lắng nghe từ "second of April" (tháng 4).'
    },
    {
      id: 'm1-e1-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 4)',
      questionNumber: 2,
      questionPrompt: 'Lắng nghe đoạn hội thoại số 2 và chọn tờ lịch ngày sinh nhật tương ứng:',
      audioText: "When's your birthday, Hoa? It's on the sixth of March. Oh! That's my birthday, too. Really? Yes, it's on the sixth of March.",
      audioTranscript:
        "Friend: When's your birthday, Hoa? (Sinh nhật cậu là ngày nào, Hoa?) — Hoa: It's on the sixth of March. (Ngày 6 tháng Ba.) — Friend: Oh! That's my birthday, too. (Ồ, hôm đó cũng là sinh nhật tớ đấy.) — Really? (Vậy sao?) — Yes, it's on the sixth of March. (Ừ, ngày 6 tháng Ba.)",
      visualCards: [
        { id: 'cal-a', label: 'Hình A', title: '15', monthName: 'JANUARY', dayNumber: '15', cardType: 'calendar', bgGradient: 'from-sky-500 to-blue-600' },
        { id: 'cal-b', label: 'Hình B', title: '02', monthName: 'APRIL', dayNumber: '02', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'cal-c', label: 'Hình C', title: '26', monthName: 'JULY', dayNumber: '26', cardType: 'calendar', bgGradient: 'from-amber-500 to-orange-600' },
        { id: 'cal-d', label: 'Hình D', title: '6', monthName: 'MARCH', dayNumber: '6', cardType: 'calendar', bgGradient: 'from-indigo-500 to-blue-700' }
      ],
      options: ['Hình A (January 15)', 'Hình B (April 02)', 'Hình C (July 26)', 'Hình D (March 6)'],
      correctAnswer: 'Hình D (March 6)',
      explanation: 'Trong đoạn 2, Hoa nói: "It\'s on the sixth of March." (Ngày 6 tháng Ba). Do đó Hình D (tờ lịch MARCH 6) tương ứng với số 2.',
      vietnameseTranslation: 'Sinh nhật của Hoa vào ngày 6 tháng Ba ➔ Hình D.',
      hint: 'Lắng nghe từ "sixth of March" (tháng 3).'
    },
    {
      id: 'm1-e1-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 4)',
      questionNumber: 3,
      questionPrompt: 'Lắng nghe đoạn hội thoại số 3 và chọn tờ lịch ngày sinh nhật tương ứng:',
      audioText: "Hi, Tom. When's your birthday? It's on the fifteenth of January. Sorry? My birthday is on the fifteenth of January. I see.",
      audioTranscript:
        "Friend: Hi, Tom. When's your birthday? (Chào Tom. Sinh nhật cậu là ngày nào vậy?) — Tom: It's on the fifteenth of January. (Ngày 15 tháng Một.) — Friend: Sorry? (Gì cơ?) — Tom: My birthday is on the fifteenth of January. (Sinh nhật của tớ vào ngày 15 tháng Một.) — Friend: I see. (Tớ biết rồi.)",
      visualCards: [
        { id: 'cal-a', label: 'Hình A', title: '15', monthName: 'JANUARY', dayNumber: '15', cardType: 'calendar', bgGradient: 'from-sky-500 to-blue-600' },
        { id: 'cal-b', label: 'Hình B', title: '02', monthName: 'APRIL', dayNumber: '02', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'cal-c', label: 'Hình C', title: '26', monthName: 'JULY', dayNumber: '26', cardType: 'calendar', bgGradient: 'from-amber-500 to-orange-600' },
        { id: 'cal-d', label: 'Hình D', title: '6', monthName: 'MARCH', dayNumber: '6', cardType: 'calendar', bgGradient: 'from-indigo-500 to-blue-700' }
      ],
      options: ['Hình A (January 15)', 'Hình B (April 02)', 'Hình C (July 26)', 'Hình D (March 6)'],
      correctAnswer: 'Hình A (January 15)',
      explanation: 'Trong đoạn 3, Tom nói: "My birthday is on the fifteenth of January." (Ngày 15 tháng Một). Do đó Hình A (tờ lịch JANUARY 15) tương ứng với số 3.',
      vietnameseTranslation: 'Sinh nhật của Tom vào ngày 15 tháng Một ➔ Hình A.',
      hint: 'Lắng nghe từ "fifteenth of January" (tháng 1).'
    },
    {
      id: 'm1-e1-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 4)',
      questionNumber: 4,
      questionPrompt: 'Lắng nghe đoạn hội thoại số 4 và chọn tờ lịch ngày sinh nhật tương ứng:',
      audioText: "When's your birthday, Linda? It's on the twenty-sixth of July. Of June? Or July? It's on the twenty-sixth of July.",
      audioTranscript:
        "Friend: When's your birthday, Linda? (Sinh nhật của cậu là ngày nào, Linda?) — Linda: It's on the twenty-sixth of July. (Ngày 26 tháng Bảy.) — Friend: Of June? Or July? (Tháng Sáu á? Hay tháng Bảy?) — Linda: It's on the twenty-sixth of July. (Ngày 26 tháng Bảy.)",
      visualCards: [
        { id: 'cal-a', label: 'Hình A', title: '15', monthName: 'JANUARY', dayNumber: '15', cardType: 'calendar', bgGradient: 'from-sky-500 to-blue-600' },
        { id: 'cal-b', label: 'Hình B', title: '02', monthName: 'APRIL', dayNumber: '02', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'cal-c', label: 'Hình C', title: '26', monthName: 'JULY', dayNumber: '26', cardType: 'calendar', bgGradient: 'from-amber-500 to-orange-600' },
        { id: 'cal-d', label: 'Hình D', title: '6', monthName: 'MARCH', dayNumber: '6', cardType: 'calendar', bgGradient: 'from-indigo-500 to-blue-700' }
      ],
      options: ['Hình A (January 15)', 'Hình B (April 02)', 'Hình C (July 26)', 'Hình D (March 6)'],
      correctAnswer: 'Hình C (July 26)',
      explanation: 'Trong đoạn 4, Linda khẳng định: "It\'s on the twenty-sixth of July." (Ngày 26 tháng Bảy). Do đó Hình C (tờ lịch JULY 26) tương ứng với số 4.',
      vietnameseTranslation: 'Sinh nhật của Linda vào ngày 26 tháng Bảy ➔ Hình C.',
      hint: 'Lắng nghe từ "twenty-sixth of July" (tháng 7).'
    },

    // =========================================================================
    // A. LISTENING - II. Listen and complete (Hội thoại David & Susan)
    // =========================================================================
    {
      id: 'm1-e1-q5',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Hội thoại David & Susan)',
      questionNumber: 5,
      questionPrompt: 'David: What day is it, Susan? ➔ Susan: It’s (1) ________.',
      audioText:
        'David: What day is it, Susan? Susan: It’s Monday. David: What do you do on Monday? Susan: Well, I have four classes in the morning. David: How about the afternoon? Susan: I go swimming with my sister, Sandra. She loves swimming. David: What about Tuesday afternoon? Are you free? Susan: No. I go to the English club every Tuesday afternoon. But I am free on Wednesday afternoon. David: That is great. There is a football match on Wednesday afternoon. Do you want to go with me? Susan: Yes. That sounds great.',
      audioTranscript:
        'David: What day is it, Susan? (Hôm nay là thứ mấy, Susan?) — Susan: It’s Monday. (Là thứ Hai.)',
      wordBank: ['Monday', 'four', 'go swimming', 'English club', 'football'],
      options: ['Monday', 'Tuesday', 'Sunday', 'Wednesday'],
      correctAnswer: 'Monday',
      explanation: 'Trong băng nghe, David hỏi ngày thứ và Susan trả lời ngay: "It’s Monday." (Là thứ Hai).',
      vietnameseTranslation: 'Hôm nay là thứ Hai (Monday).',
      hint: 'Từ chỉ ngày thứ Hai trong tuần.'
    },
    {
      id: 'm1-e1-q6',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Hội thoại David & Susan)',
      questionNumber: 6,
      questionPrompt: 'David: What do you do on Monday? ➔ Susan: Well, I have (2) ________ classes in the morning.',
      audioText:
        'David: What day is it, Susan? Susan: It’s Monday. David: What do you do on Monday? Susan: Well, I have four classes in the morning. David: How about the afternoon? Susan: I go swimming with my sister, Sandra. She loves swimming. David: What about Tuesday afternoon? Are you free? Susan: No. I go to the English club every Tuesday afternoon. But I am free on Wednesday afternoon. David: That is great. There is a football match on Wednesday afternoon. Do you want to go with me? Susan: Yes. That sounds great.',
      audioTranscript:
        'David: What do you do on Monday? (Cậu làm gì vào thứ Hai?) — Susan: Well, I have four classes in the morning. (Ừm tớ có 4 tiết học vào buổi sáng.)',
      wordBank: ['Monday', 'four', 'go swimming', 'English club', 'football'],
      options: ['three', 'four', 'five', 'six'],
      correctAnswer: 'four',
      explanation: 'Susan nói: "I have four classes in the morning." (Tớ có 4 tiết học vào buổi sáng).',
      vietnameseTranslation: 'Susan có 4 tiết học (four classes) vào buổi sáng.',
      hint: 'Số 4 trong tiếng Anh là "four".'
    },
    {
      id: 'm1-e1-q7',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Hội thoại David & Susan)',
      questionNumber: 7,
      questionPrompt: 'David: How about the afternoon? ➔ Susan: I (3) ________ with my sister, Sandra. She loves swimming.',
      audioText:
        'David: How about the afternoon? Susan: I go swimming with my sister, Sandra. She loves swimming. David: What about Tuesday afternoon? Are you free? Susan: No. I go to the English club every Tuesday afternoon.',
      audioTranscript:
        'David: How about the afternoon? (Thế buổi chiều thì sao?) — Susan: I go swimming with my sister, Sandra. She loves swimming. (Tớ đi bơi cùng chị tớ, Sandra. Chị ấy rất thích bơi lội.)',
      wordBank: ['Monday', 'four', 'go swimming', 'English club', 'football'],
      options: ['play piano', 'go swimming', 'play badminton', 'cook dinner'],
      correctAnswer: 'go swimming',
      explanation: 'Susan trả lời: "I go swimming with my sister, Sandra." (Tớ đi bơi cùng chị tớ, Sandra).',
      vietnameseTranslation: 'Susan đi bơi (go swimming) cùng chị gái vào buổi chiều.',
      hint: 'Hoạt động thể thao dưới nước.'
    },
    {
      id: 'm1-e1-q8',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Hội thoại David & Susan)',
      questionNumber: 8,
      questionPrompt: 'David: What about Tuesday afternoon? Are you free? ➔ Susan: No. I go to the (4) ________ every Tuesday afternoon.',
      audioText:
        'David: What about Tuesday afternoon? Are you free? Susan: No. I go to the English club every Tuesday afternoon. But I am free on Wednesday afternoon.',
      audioTranscript:
        'David: What about Tuesday afternoon? Are you free? (Thế còn chiều thứ Ba thì sao? Cậu có rảnh không?) — Susan: No. I go to the English club every Tuesday afternoon. (Không đâu. Tớ đến câu lạc bộ tiếng Anh mỗi buổi chiều thứ Ba.)',
      wordBank: ['Monday', 'four', 'go swimming', 'English club', 'football'],
      options: ['music club', 'English club', 'sports club', 'library'],
      correctAnswer: 'English club',
      explanation: 'Susan nói: "I go to the English club every Tuesday afternoon." (Tớ đến câu lạc bộ tiếng Anh mỗi chiều thứ Ba).',
      vietnameseTranslation: 'Susan tham gia câu lạc bộ tiếng Anh (English club).',
      hint: 'Câu lạc bộ tiếng Anh.'
    },
    {
      id: 'm1-e1-q9',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Hội thoại David & Susan)',
      questionNumber: 9,
      questionPrompt: 'David: That’s great. There is a (5) ________ match on Wednesday afternoon. Do you want to go with me?',
      audioText:
        'David: That is great. There is a football match on Wednesday afternoon. Do you want to go with me? Susan: Yes. That sounds great.',
      audioTranscript:
        'David: That is great. There is a football match on Wednesday afternoon. Do you want to go with me? (Tuyệt. Có một trận bóng đá vào chiều thứ Tư này. Cậu có muốn đi xem cùng tớ không?) — Susan: Yes. That sounds great. (Được. Nghe thú vị ghê.)',
      wordBank: ['Monday', 'four', 'go swimming', 'English club', 'football'],
      options: ['basketball', 'tennis', 'football', 'volleyball'],
      correctAnswer: 'football',
      explanation: 'David rủ: "There is a football match on Wednesday afternoon." (Có một trận bóng đá vào chiều thứ Tư).',
      vietnameseTranslation: 'Trận thi đấu bóng đá (football match).',
      hint: 'Môn thể thao vua (bóng đá).'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)
    // =========================================================================
    {
      id: 'm1-e1-q10',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 10,
      questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
      options: ['work', 'morning', 'afternoon', 'evening'],
      correctAnswer: 'work',
      explanation: 'Phương án A "work" (làm việc) là động từ, còn "morning", "afternoon", "evening" đều là danh từ chỉ các buổi trong ngày.',
      grammarFocus: 'work là động từ (Verb), 3 từ còn lại là danh từ chỉ thời gian trong ngày.',
      hint: 'Tìm từ chỉ hành động.'
    },
    {
      id: 'm1-e1-q11',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 11,
      questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
      options: ['Monday', 'Tuesday', 'January', 'Friday'],
      correctAnswer: 'January',
      explanation: 'Phương án C "January" (tháng Một) là tên tháng, các phương án còn lại (Monday, Tuesday, Friday) đều là các ngày trong tuần.',
      grammarFocus: 'January là tháng (Month), các từ khác là thứ trong tuần (Days of the week).',
      hint: 'Từ nào là tên tháng trong năm?'
    },
    {
      id: 'm1-e1-q12',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 12,
      questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
      options: ['Where', 'What', 'When', "o'clock"],
      correctAnswer: "o'clock",
      explanation: 'Phương án D "o\'clock" (giờ đúng) dùng để nói giờ, các phương án còn lại (Where, What, When) đều là từ để hỏi (Question words).',
      grammarFocus: "o'clock dùng để chỉ giờ, 3 từ còn lại là từ để hỏi Wh-.",
      hint: 'Từ nào dùng để nói giờ chứ không dùng để hỏi?'
    },
    {
      id: 'm1-e1-q13',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 13,
      questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
      options: ['August', 'Match', 'May', 'November'],
      correctAnswer: 'Match',
      explanation: 'Phương án B "Match" (trận đấu) là danh từ chỉ trận đấu thể thao, các phương án còn lại (August, May, November) đều là tên các tháng trong năm.',
      grammarFocus: 'August (tháng 8), May (tháng 5), November (tháng 11) là các tháng trong năm.',
      hint: 'Từ nào không phải là tên tháng?'
    },
    {
      id: 'm1-e1-q14',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 14,
      questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
      options: ['seven', 'second', 'ten', 'sixteen'],
      correctAnswer: 'second',
      explanation: 'Phương án B "second" (thứ hai) là số thứ tự (Ordinal number), các phương án còn lại (seven, ten, sixteen) đều là số đếm (Cardinal numbers).',
      grammarFocus: 'second là số thứ tự, các từ còn lại là số đếm.',
      hint: 'Tìm từ chỉ thứ tự (thứ nhất, thứ hai,...).'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)
    // =========================================================================
    {
      id: 'm1-e1-q15',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)',
      questionNumber: 15,
      questionPrompt: '1. Quan sát bức tranh đêm trăng sao 🌃 và hoàn thành từ: N _ _ _ T',
      imageEmoji: '🌃',
      letterBlanks: { textBefore: 'N', blankLetters: 'IGH', textAfter: 'T', fullWord: 'NIGHT', meaning: 'buổi đêm, ban đêm' },
      options: ['NIGHT', 'LIGHT', 'EIGHT', 'RIGHT'],
      correctAnswer: 'NIGHT',
      explanation: 'Tranh minh họa bầu trời đêm với vầng trăng và các tòa nhà sáng đèn ➔ NIGHT (buổi đêm). Chữ cái còn thiếu là I-G-H.',
      vietnameseTranslation: 'NIGHT: buổi đêm',
      hint: 'Từ bắt đầu bằng N, kết thúc bằng T, nghĩa là ban đêm.'
    },
    {
      id: 'm1-e1-q16',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)',
      questionNumber: 16,
      questionPrompt: '2. Quan sát tranh các bạn học sinh đeo cặp đến trường 🎒 và hoàn thành từ: P _ P _ _',
      imageEmoji: '🎒',
      letterBlanks: { textBefore: 'P', blankLetters: 'U', textAfter: 'PIL', fullWord: 'PUPIL', meaning: 'học sinh tiểu học' },
      options: ['PUPIL', 'PAPER', 'PIANO', 'PARTY'],
      correctAnswer: 'PUPIL',
      explanation: 'Tranh các bạn học sinh tiểu học tung tăng cắp sách đến trường ➔ PUPIL (học sinh). Các chữ cái còn thiếu là U - I - L.',
      vietnameseTranslation: 'PUPIL: học sinh',
      hint: 'Từ tiếng Anh 5 chữ cái chỉ học sinh tiểu học.'
    },
    {
      id: 'm1-e1-q17',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)',
      questionNumber: 17,
      questionPrompt: '3. Quan sát lá cờ hình tròn đỏ ở giữa 🇯🇵 và hoàn thành tên quốc gia: J _ _ _ N',
      imageEmoji: '🇯🇵',
      letterBlanks: { textBefore: 'J', blankLetters: 'APA', textAfter: 'N', fullWord: 'JAPAN', meaning: 'nước Nhật Bản' },
      options: ['JAPAN', 'JORDAN', 'JERSEY', 'JAMAICA'],
      correctAnswer: 'JAPAN',
      explanation: 'Lá cờ nền trắng có hình tròn đỏ ở giữa là quốc kỳ Nhật Bản ➔ JAPAN (nước Nhật Bản). Chữ cái còn thiếu là A-P-A.',
      vietnameseTranslation: 'JAPAN: nước Nhật Bản',
      hint: 'Đất nước mặt trời mọc.'
    },
    {
      id: 'm1-e1-q18',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)',
      questionNumber: 18,
      questionPrompt: '4. Quan sát tranh tiệc sinh nhật, bánh kem và bóng bay 🎂 và hoàn thành từ: B _ _ T _ _ _ Y',
      imageEmoji: '🎂',
      letterBlanks: { textBefore: 'B', blankLetters: 'IRTHDA', textAfter: 'Y', fullWord: 'BIRTHDAY', meaning: 'ngày sinh nhật' },
      options: ['BIRTHDAY', 'BASKETBALL', 'BUTTERFLY', 'BOOKSHELF'],
      correctAnswer: 'BIRTHDAY',
      explanation: 'Tranh bạn nhỏ đội mũ sinh nhật, bóng bay và bánh kem ➔ BIRTHDAY (ngày sinh nhật).',
      vietnameseTranslation: 'BIRTHDAY: sinh nhật',
      hint: 'Ngày kỷ niệm sinh nhật.'
    },
    {
      id: 'm1-e1-q19',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Look and complete the words (Nhìn tranh điền từ)',
      questionNumber: 19,
      questionPrompt: '5. Quan sát tranh bạn nhỏ đang bơi dưới nước 🏊 và hoàn thành từ: S _ _ _',
      imageEmoji: '🏊',
      letterBlanks: { textBefore: 'S', blankLetters: 'WIM', textAfter: '', fullWord: 'SWIM', meaning: 'bơi lội' },
      options: ['SWIM', 'SING', 'STAY', 'SNOW'],
      correctAnswer: 'SWIM',
      explanation: 'Tranh bạn nhỏ đang bơi lội dưới làn nước xanh ➔ SWIM (bơi lội). Chữ cái còn thiếu là W-I-M.',
      vietnameseTranslation: 'SWIM: bơi lội',
      hint: 'Động từ chỉ hoạt động bơi lội dưới nước.'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)
    // =========================================================================
    {
      id: 'm1-e1-q20',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 20,
      questionPrompt: '1. What day is it today?',
      options: ['It’s in September.', 'It’s Monday.', 'It’s on Tuesday.'],
      correctAnswer: 'It’s Monday.',
      explanation: 'Cấu trúc hỏi thứ trong ngày: "What day is it today?" ➔ Trả lời: "It\'s + thứ" (Ví dụ: It\'s Monday). Chú ý không có giới từ "on" hay "in" khi trả lời câu này.',
      grammarFocus: 'What day is it today? ➔ It’s + thứ (It’s Monday).',
      vietnameseTranslation: 'Hôm nay là thứ mấy? ➔ Hôm nay là thứ Hai.',
      hint: 'Trả lời ngày thứ: "It’s Monday."'
    },
    {
      id: 'm1-e1-q21',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 21,
      questionPrompt: '2. Where are you from? - ……………………',
      options: ['I’m from China', 'I’m Chinese', 'I speak Chinese'],
      correctAnswer: 'I’m from China',
      explanation: 'Cấu trúc hỏi xuất thân/quê quán: "Where are you from?" ➔ Trả lời: "I\'m from + tên quốc gia" (Ví dụ: I\'m from China - Tôi đến từ Trung Quốc).',
      grammarFocus: 'Where are you from? ➔ I’m from + Tên quốc gia.',
      vietnameseTranslation: 'Bạn đến từ đâu? ➔ Tôi đến từ Trung Quốc (I’m from China).',
      hint: 'Cấu trúc có "from" thì câu trả lời cũng phải có "from".'
    },
    {
      id: 'm1-e1-q22',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 22,
      questionPrompt: '3. Are you Chinese? - No, I’m ……………………',
      options: ['Vietnam', 'cold', 'Australian'],
      correctAnswer: 'Australian',
      explanation: 'Câu hỏi hỏi về quốc tịch ("Are you Chinese?" - Bạn có phải người Trung Quốc không?), do đó vế trả lời phủ định cũng phải dùng từ chỉ quốc tịch: "Australian" (người Úc). "Vietnam" là tên nước, không phải quốc tịch (phải là Vietnamese).',
      grammarFocus: 'Hỏi quốc tịch ➔ Trả lời bằng tính từ chỉ quốc tịch (Australian, Vietnamese, English...).',
      vietnameseTranslation: 'Bạn là người Trung Quốc phải không? — Không, tôi là người Úc (Australian).',
      hint: 'Chọn từ chỉ quốc tịch (người Úc).'
    },
    {
      id: 'm1-e1-q23',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 23,
      questionPrompt: '4. Can you swim? – No, I ……………………',
      options: ['can’t', 'can', 'not'],
      correctAnswer: 'can’t',
      explanation: 'Cấu trúc câu hỏi khả năng với Can: "Can you + V?" ➔ Trả lời: "Yes, I can." hoặc "No, I can\'t." (viết tắt của cannot).',
      grammarFocus: 'Can you + V? ➔ No, I can’t.',
      vietnameseTranslation: 'Bạn có biết bơi không? — Không, tôi không biết bơi (No, I can’t).',
      hint: 'Sau "No, I..." phải là dạng phủ định "can\'t".'
    },
    {
      id: 'm1-e1-q24',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 24,
      questionPrompt: '5. When is your ……………………? - It’s on the first of October.',
      options: ['class', 'birthday', 'nationality'],
      correctAnswer: 'birthday',
      explanation: 'Câu trả lời đưa ra ngày tháng cụ thể ("It\'s on the first of October" - Vào ngày 1 tháng 10), do đó câu hỏi phù hợp nhất là: "When is your birthday?" (Sinh nhật của bạn là khi nào?).',
      grammarFocus: 'When is your birthday? ➔ It’s on the + số thứ tự + of + tháng.',
      vietnameseTranslation: 'Sinh nhật của bạn là khi nào? — Vào ngày 1 tháng Mười.',
      hint: 'Từ nào chỉ ngày sinh nhật?'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ vào đoạn văn)
    // =========================================================================
    {
      id: 'm1-e1-q25',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ)',
      questionNumber: 25,
      questionPrompt: 'Miss Hien: Good morning class. ➔ Class: Good (1) ________, Miss Hien. How are you?',
      wordBank: ['morning', 'fine', 'date', 'March', 'birthday'],
      options: ['morning', 'fine', 'date', 'March'],
      correctAnswer: 'morning',
      explanation: 'Khi cô Hiền chào: "Good morning class", cả lớp đáp lại: "Good morning, Miss Hien." (Chào buổi sáng cô Hiền ạ).',
      vietnameseTranslation: 'Chào buổi sáng cô Hiền ạ (Good morning, Miss Hien).',
      hint: 'Chào buổi sáng: Good morning.'
    },
    {
      id: 'm1-e1-q26',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ)',
      questionNumber: 26,
      questionPrompt: 'Class: How are you? ➔ Miss Hien: I’m (2) ________, thank you.',
      wordBank: ['morning', 'fine', 'date', 'March', 'birthday'],
      options: ['fine', 'morning', 'date', 'birthday'],
      correctAnswer: 'fine',
      explanation: 'Trả lời câu hỏi sức khỏe "How are you?": "I\'m fine, thank you." (Cô khỏe, cảm ơn các em).',
      vietnameseTranslation: 'Cô khỏe, cảm ơn các em (I’m fine, thank you).',
      hint: 'Từ chỉ tình trạng sức khỏe tốt/khỏe mạnh.'
    },
    {
      id: 'm1-e1-q27',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ)',
      questionNumber: 27,
      questionPrompt: 'Miss Hien: What is the (3) ________ today, Mai?',
      wordBank: ['morning', 'fine', 'date', 'March', 'birthday'],
      options: ['date', 'morning', 'fine', 'March'],
      correctAnswer: 'date',
      explanation: 'Cấu trúc hỏi ngày mấy tháng mấy: "What is the date today?" (Hôm nay là ngày bao nhiêu vậy Mai?). Câu trả lời tiếp theo đưa ra ngày 16.',
      vietnameseTranslation: 'Hôm nay là ngày bao nhiêu vậy, Mai? (What is the date today?).',
      hint: 'Từ "date" có nghĩa là ngày tháng trong năm.'
    },
    {
      id: 'm1-e1-q28',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ)',
      questionNumber: 28,
      questionPrompt: 'Mai: It’s the sixteenth of (4) ________.',
      wordBank: ['morning', 'fine', 'date', 'March', 'birthday'],
      options: ['March', 'morning', 'fine', 'date'],
      correctAnswer: 'March',
      explanation: 'Cấu trúc nói ngày tháng: the + số thứ tự + of + tháng. Ở đây trong ô từ vựng có "March" (tháng Ba) ➔ "It\'s the sixteenth of March" (Ngày 16 tháng Ba ạ).',
      vietnameseTranslation: 'Hôm nay là ngày 16 tháng Ba ạ (sixteenth of March).',
      hint: 'Từ chỉ tên tháng Ba.'
    },
    {
      id: 'm1-e1-q29',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Read and complete (Đọc và điền từ)',
      questionNumber: 29,
      questionPrompt: 'Miss Hien: Thank you. It’s Mr Loc’s (5) ________ tomorrow.',
      wordBank: ['morning', 'fine', 'date', 'March', 'birthday'],
      options: ['birthday', 'March', 'morning', 'date'],
      correctAnswer: 'birthday',
      explanation: 'Cô Hiền thông báo: "It\'s Mr Loc\'s birthday tomorrow." (Ngày mai là sinh nhật thầy Lộc đó).',
      vietnameseTranslation: 'Ngày mai là ngày sinh nhật của thầy Lộc (Mr Loc’s birthday).',
      hint: 'Từ chỉ sinh nhật.'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - V. Read and match (Đọc và nối câu)
    // =========================================================================
    {
      id: 'm1-e1-q30',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and match (Nối câu hỏi với câu trả lời)',
      questionNumber: 30,
      questionPrompt: '1. Nối câu hỏi: "What day is it today?" với câu trả lời đúng:',
      options: [
        'D. Today is Monday.',
        'A. I come from Thailand.',
        'B. My name is Linda.',
        'C. I can play football.',
        'E. I’m Vietnamese.'
      ],
      correctAnswer: 'D. Today is Monday.',
      explanation: '"What day is it today?" (Hôm nay là thứ mấy?) nối với "Today is Monday." (Hôm nay là thứ Hai) ➔ 1 nối với D.',
      vietnameseTranslation: 'Hôm nay là thứ mấy? ➔ Hôm nay là thứ Hai (D).',
      hint: 'Câu hỏi ngày thứ trong tuần.'
    },
    {
      id: 'm1-e1-q31',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and match (Nối câu hỏi với câu trả lời)',
      questionNumber: 31,
      questionPrompt: '2. Nối câu hỏi: "What nationality are you?" với câu trả lời đúng:',
      options: [
        'E. I’m Vietnamese.',
        'A. I come from Thailand.',
        'B. My name is Linda.',
        'C. I can play football.',
        'D. Today is Monday.'
      ],
      correctAnswer: 'E. I’m Vietnamese.',
      explanation: '"What nationality are you?" (Quốc tịch của bạn là gì?) nối với "I’m Vietnamese." (Tôi là người Việt Nam) ➔ 2 nối với E.',
      vietnameseTranslation: 'Quốc tịch của bạn là gì? ➔ Tôi là người Việt Nam (E).',
      hint: 'Hỏi về quốc tịch (nationality).'
    },
    {
      id: 'm1-e1-q32',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and match (Nối câu hỏi với câu trả lời)',
      questionNumber: 32,
      questionPrompt: '3. Nối câu hỏi: "Where do you come from?" với câu trả lời đúng:',
      options: [
        'A. I come from Thailand.',
        'B. My name is Linda.',
        'C. I can play football.',
        'D. Today is Monday.',
        'E. I’m Vietnamese.'
      ],
      correctAnswer: 'A. I come from Thailand.',
      explanation: '"Where do you come from?" (Bạn đến từ đâu?) nối với "I come from Thailand." (Tôi đến từ Thái Lan) ➔ 3 nối với A.',
      vietnameseTranslation: 'Bạn đến từ đâu? ➔ Tôi đến từ Thái Lan (A).',
      hint: 'Cấu trúc "come from" nối với câu trả lời có "come from".'
    },
    {
      id: 'm1-e1-q33',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and match (Nối câu hỏi với câu trả lời)',
      questionNumber: 33,
      questionPrompt: '4. Nối câu hỏi: "What’s your name?" với câu trả lời đúng:',
      options: [
        'B. My name is Linda.',
        'A. I come from Thailand.',
        'C. I can play football.',
        'D. Today is Monday.',
        'E. I’m Vietnamese.'
      ],
      correctAnswer: 'B. My name is Linda.',
      explanation: '"What’s your name?" (Bạn tên là gì?) nối với "My name is Linda." (Tên tôi là Linda) ➔ 4 nối với B.',
      vietnameseTranslation: 'Bạn tên là gì? ➔ Tên tôi là Linda (B).',
      hint: 'Hỏi tên (name).'
    },
    {
      id: 'm1-e1-q34',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and match (Nối câu hỏi với câu trả lời)',
      questionNumber: 34,
      questionPrompt: '5. Nối câu hỏi: "What can you do?" với câu trả lời đúng:',
      options: [
        'C. I can play football.',
        'A. I come from Thailand.',
        'B. My name is Linda.',
        'D. Today is Monday.',
        'E. I’m Vietnamese.'
      ],
      correctAnswer: 'C. I can play football.',
      explanation: '"What can you do?" (Bạn có thể làm gì?) nối với câu trả lời về khả năng: "I can play football." (Tôi có thể chơi bóng đá) ➔ 5 nối với C.',
      vietnameseTranslation: 'Bạn có thể làm gì? ➔ Tôi có thể chơi bóng đá (C).',
      hint: 'Hỏi về khả năng (can you do).'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - VI. Answer the questions about you (Trả lời về em)
    // =========================================================================
    {
      id: 'm1-e1-q35',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - VI. Answer the questions about you (Trả lời về bản thân)',
      questionNumber: 35,
      questionPrompt: '1. When’s your birthday? ➔ Chọn câu trả lời đúng ngữ pháp chuẩn Bộ GD&ĐT:',
      options: [
        'It’s on the twenty-fourth of July.',
        'It’s on twenty-four July.',
        'It’s in the twenty-fourth of July.',
        'It’s at July 24.'
      ],
      correctAnswer: 'It’s on the twenty-fourth of July.',
      explanation: 'Quy tắc ngữ pháp chuẩn: Nói về ngày tháng sinh nhật dùng giới từ "on" + "the" + số thứ tự + "of" + tên tháng: "It\'s on the twenty-fourth of July." (Vào ngày 24 tháng Bảy).',
      grammarFocus: 'It’s on the + số thứ tự (first, second, twenty-fourth...) + of + tên tháng.',
      vietnameseTranslation: 'Sinh nhật của em vào ngày 24 tháng Bảy.',
      hint: 'Cấu trúc "on the... of..."'
    },
    {
      id: 'm1-e1-q36',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - VI. Answer the questions about you (Trả lời về bản thân)',
      questionNumber: 36,
      questionPrompt: '2. What can you do? ➔ Chọn câu trả lời đúng ngữ pháp chuẩn:',
      options: ['I can swim.', 'I can swimming.', 'I can to swim.', 'I can swims.'],
      correctAnswer: 'I can swim.',
      explanation: 'Sau động từ khuyết thiếu "can", động từ theo sau luôn ở dạng nguyên mẫu không "to": S + can + V(nguyên mẫu). ➔ "I can swim." (Tôi có thể bơi).',
      grammarFocus: 'S + can + V(nguyên mẫu).',
      vietnameseTranslation: 'Tôi có thể bơi lội.',
      hint: 'Sau "can" động từ giữ nguyên mẫu.'
    },
    {
      id: 'm1-e1-q37',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - VI. Answer the questions about you (Trả lời về bản thân)',
      questionNumber: 37,
      questionPrompt: '3. Where do you come from? ➔ Chọn câu trả lời đúng ngữ pháp chuẩn:',
      options: [
        'I come from Viet Nam.',
        'I comes from Viet Nam.',
        'I come to Viet Nam.',
        'I am come from Viet Nam.'
      ],
      correctAnswer: 'I come from Viet Nam.',
      explanation: 'Chủ ngữ "I" ở thì hiện tại đơn đi với động từ nguyên mẫu "come": "I come from Viet Nam." (Tôi đến từ Việt Nam).',
      grammarFocus: 'I come from + Tên quốc gia.',
      vietnameseTranslation: 'Tôi đến từ Việt Nam.',
      hint: 'Chủ ngữ "I" thì động từ "come" không thêm "s".'
    }
  ]
};

export const LOIGIAIHAY_EXAM_2: ExamPaper = {
  id: 'midterm1-exam2',
  category: 'midterm_1',
  categoryLabel: 'Giữa Học Kì 1',
  title: 'Đề Kiểm Tra Giữa Kì 1 – Đề 2 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe Audio 6 Tranh, Nghe Điền Bạn Trang, Sắp Xếp Chữ Cái & Đọc Hiểu Bạn Quân',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 36,
  icon: '🎯',
  themeColor: 'from-emerald-600 via-teal-600 to-cyan-600',
  questions: [
    // =========================================================================
    // A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6 vào 6 bức tranh)
    // =========================================================================
    {
      id: 'm1-e2-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 1,
      questionPrompt: 'Lắng nghe câu số 1 và chọn bức tranh tương ứng:',
      audioText: 'My birthday is on the first of January.',
      audioTranscript: 'Speaker: My birthday is on the first of January. (Sinh nhật của tôi là ngày 1 tháng Một.)',
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh C (Lịch January 1)',
      explanation: 'Câu 1 trong bài nghe là: "My birthday is on the first of January." (Sinh nhật của tôi vào ngày 1 tháng Một) ➔ Tương ứng với Tranh C (tờ lịch JANUARY 1st).',
      vietnameseTranslation: 'Sinh nhật vào ngày 1 tháng Một ➔ Tranh C.',
      hint: 'Lắng nghe từ "first of January".'
    },
    {
      id: 'm1-e2-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 2,
      questionPrompt: 'Lắng nghe câu số 2 và chọn bức tranh tương ứng:',
      audioText: "When is your birthday?",
      audioTranscript: "Speaker: When is your birthday? (Sinh nhật của bạn vào ngày nào?)",
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh B (Bánh sinh nhật)',
      explanation: 'Câu 2 trong bài nghe là câu hỏi: "When is your birthday?" (Sinh nhật của bạn là khi nào?) ➔ Tương ứng với Tranh B (hình bánh sinh nhật và tiệc tùng).',
      vietnameseTranslation: 'Sinh nhật của bạn là khi nào? ➔ Tranh B (bánh sinh nhật).',
      hint: 'Hỏi về ngày sinh nhật.'
    },
    {
      id: 'm1-e2-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 3,
      questionPrompt: 'Lắng nghe câu số 3 và chọn bức tranh tương ứng:',
      audioText: "What's the day today? - It's Thursday.",
      audioTranscript: "Speaker: What's the day today? - It's Thursday. (Hôm nay là thứ mấy? – Thứ Năm.)",
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh E (Lịch Thursday)',
      explanation: 'Câu 3 trong bài nghe là: "What\'s the day today? - It\'s Thursday." (Hôm nay là thứ mấy? - Thứ Năm) ➔ Tương ứng với Tranh E (lịch để bàn có chữ THURSDAY).',
      vietnameseTranslation: 'Hôm nay là thứ Năm (Thursday) ➔ Tranh E.',
      hint: 'Lắng nghe từ "Thursday" (thứ Năm).'
    },
    {
      id: 'm1-e2-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 4,
      questionPrompt: 'Lắng nghe câu số 4 và chọn bức tranh tương ứng:',
      audioText: 'I want to be a nurse in the future.',
      audioTranscript: 'Speaker: I want to be a nurse in the future. (Tôi muốn trở thành một y tá trong tương lai.)',
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh F (Y tá)',
      explanation: 'Câu 4 trong bài nghe là: "I want to be a nurse in the future." (Tôi muốn trở thành một y tá trong tương lai) ➔ Tương ứng với Tranh F (hình cô y tá).',
      vietnameseTranslation: 'Tôi muốn làm y tá (nurse) ➔ Tranh F.',
      hint: 'Lắng nghe từ "nurse" (y tá).'
    },
    {
      id: 'm1-e2-q5',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 5,
      questionPrompt: 'Lắng nghe câu số 5 và chọn bức tranh tương ứng:',
      audioText: 'This is her book.',
      audioTranscript: 'Speaker: This is her book. (Đây là quyển sách của cô ấy.)',
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh D (Đọc sách)',
      explanation: 'Câu 5 trong bài nghe là: "This is her book." (Đây là quyển sách của cô ấy) ➔ Tương ứng với Tranh D (bạn gái đang đọc sách).',
      vietnameseTranslation: 'Quyển sách của cô ấy ➔ Tranh D.',
      hint: 'Lắng nghe từ "book" (quyển sách).'
    },
    {
      id: 'm1-e2-q6',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - I. Listen and number (Nghe và đánh số 1 - 6)',
      questionNumber: 6,
      questionPrompt: 'Lắng nghe câu số 6 và chọn bức tranh tương ứng:',
      audioText: 'I come from Germany.',
      audioTranscript: 'Speaker: I come from Germany. (Tôi đến từ nước Đức.)',
      visualCards: [
        { id: 'p-a', label: 'A', title: 'Nước Đức', emoji: '🇩🇪', cardType: 'flag', bgGradient: 'from-amber-500 to-red-600' },
        { id: 'p-b', label: 'B', title: 'Bánh sinh nhật', emoji: '🎂', cardType: 'picture', bgGradient: 'from-pink-500 to-rose-600' },
        { id: 'p-c', label: 'C', title: '1', monthName: 'JANUARY', dayNumber: '1', cardType: 'calendar', bgGradient: 'from-rose-500 to-red-600' },
        { id: 'p-d', label: 'D', title: 'Đọc sách', emoji: '📖', cardType: 'picture', bgGradient: 'from-blue-500 to-indigo-600' },
        { id: 'p-e', label: 'E', title: 'THURSDAY', emoji: '🗓️', cardType: 'picture', bgGradient: 'from-teal-500 to-emerald-600' },
        { id: 'p-f', label: 'F', title: 'Y tá', emoji: '👩‍⚕️', cardType: 'picture', bgGradient: 'from-purple-500 to-indigo-600' }
      ],
      options: ['Tranh A (Lá cờ Đức)', 'Tranh B (Bánh sinh nhật)', 'Tranh C (Lịch January 1)', 'Tranh D (Đọc sách)', 'Tranh E (Lịch Thursday)', 'Tranh F (Y tá)'],
      correctAnswer: 'Tranh A (Lá cờ Đức)',
      explanation: 'Câu 6 trong bài nghe là: "I come from Germany." (Tôi đến từ nước Đức) ➔ Tương ứng với Tranh A (lá cờ nước Đức ba màu đen - đỏ - vàng).',
      vietnameseTranslation: 'Tôi đến từ nước Đức ➔ Tranh A.',
      hint: 'Lắng nghe từ "Germany" (nước Đức).'
    },

    // =========================================================================
    // A. LISTENING - II. Listen and complete (Bài nghe giới thiệu của bạn Trang)
    // =========================================================================
    {
      id: 'm1-e2-q7',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Bài nghe của Trang)',
      questionNumber: 7,
      questionPrompt: 'Trang: "I am a (1) ________ at Sunshine Primary School."',
      audioText:
        "Good morning! My name is Trang. I come from Vietnam and now I live in Hanoi. I am a pupil at Sunshine Primary School. I'm in class 4A and I have lots of cute friends. This is a picture of them. This is Jamie. He comes from New York, USA. And this is Nga and this is Han. They are from Vietnam. Next to them are Linda and Harry. Linda comes from London, England and Harry is from Korea. They are all my good friends.",
      audioTranscript:
        'Trang: Good morning! My name is Trang. I come from Vietnam and now I live in Hanoi. I am a pupil at Sunshine Primary School. (Chào buổi sáng. Tên của tớ là Trang. Tớ đến từ Việt Nam và hiện tại tớ đang sống ở Hà Nội. Tớ là một học sinh của trường tiểu học Sunshine.)',
      wordBank: ['pupil', 'friends', 'USA', 'London', 'Korea'],
      options: ['pupil', 'teacher', 'nurse', 'doctor'],
      correctAnswer: 'pupil',
      explanation: 'Trong bài nghe, Trang tự giới thiệu: "I am a pupil at Sunshine Primary School." (Tớ là một học sinh tại trường tiểu học Sunshine).',
      vietnameseTranslation: 'Tớ là một học sinh (pupil).',
      hint: 'Từ chỉ học sinh tiểu học.'
    },
    {
      id: 'm1-e2-q8',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Bài nghe của Trang)',
      questionNumber: 8,
      questionPrompt: 'Trang: "I\'m in class 4A and I have lots of cute (2) ________."',
      audioText:
        "I'm in class 4A and I have lots of cute friends. This is a picture of them. This is Jamie. He comes from New York, USA.",
      audioTranscript:
        'Trang: I’m in class 4A and I have lots of cute friends. (Tớ học ở lớp 4A và tớ có rất nhiều người bạn đáng yêu.)',
      wordBank: ['pupil', 'friends', 'USA', 'London', 'Korea'],
      options: ['friends', 'teachers', 'cousins', 'pets'],
      correctAnswer: 'friends',
      explanation: 'Trang nói: "I have lots of cute friends." (Tớ có rất nhiều người bạn đáng yêu).',
      vietnameseTranslation: 'Rất nhiều người bạn đáng yêu (cute friends).',
      hint: 'Từ chỉ những người bạn (friends).'
    },
    {
      id: 'm1-e2-q9',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Bài nghe của Trang)',
      questionNumber: 9,
      questionPrompt: 'Trang: "This is Jamie. He comes from New York, (3) ________."',
      audioText:
        'This is Jamie. He comes from New York, USA. And this is Nga and this is Han. They are from Vietnam.',
      audioTranscript:
        'Trang: This is Jamie. He comes from New York, USA. (Đây là Jamie. Cậu ấy đến từ New York, Mỹ.)',
      wordBank: ['pupil', 'friends', 'USA', 'London', 'Korea'],
      options: ['USA', 'UK', 'Australia', 'Japan'],
      correctAnswer: 'USA',
      explanation: 'Trang giới thiệu: "Jamie comes from New York, USA." (Jamie đến từ New York, nước Mỹ).',
      vietnameseTranslation: 'Đến từ New York, nước Mỹ (USA).',
      hint: 'Tên viết tắt của nước Mỹ.'
    },
    {
      id: 'm1-e2-q10',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Bài nghe của Trang)',
      questionNumber: 10,
      questionPrompt: 'Trang: "Next to them are Linda and Harry. Linda comes from (4) ________, England."',
      audioText:
        'Next to them are Linda and Harry. Linda comes from London, England and Harry is from Korea.',
      audioTranscript:
        'Trang: Next to them are Linda and Harry. Linda comes from London, England... (Bên cạnh họ là Linda và Harry. Linda đến từ Luân Đôn, nước Anh...)',
      wordBank: ['pupil', 'friends', 'USA', 'London', 'Korea'],
      options: ['London', 'Sydney', 'Paris', 'Tokyo'],
      correctAnswer: 'London',
      explanation: 'Trang nói: "Linda comes from London, England" (Linda đến từ Luân Đôn, nước Anh).',
      vietnameseTranslation: 'Thủ đô Luân Đôn nước Anh (London).',
      hint: 'Thủ đô của nước Anh.'
    },
    {
      id: 'm1-e2-q11',
      type: 'fill_blank',
      exerciseTitle: 'A. LISTENING - II. Listen and complete (Bài nghe của Trang)',
      questionNumber: 11,
      questionPrompt: 'Trang: "...and Harry is from (5) ________. They are all my good friends."',
      audioText:
        'Linda comes from London, England and Harry is from Korea. They are all my good friends.',
      audioTranscript:
        'Trang: ...and Harry is from Korea. They are all my good friends. (...và Harry đến từ Hàn Quốc. Họ đều là những người bạn tốt của tớ.)',
      wordBank: ['pupil', 'friends', 'USA', 'London', 'Korea'],
      options: ['Korea', 'China', 'Singapore', 'Thailand'],
      correctAnswer: 'Korea',
      explanation: 'Trang nói: "Harry is from Korea." (Harry đến từ Hàn Quốc).',
      vietnameseTranslation: 'Harry đến từ Hàn Quốc (Korea).',
      hint: 'Tên đất nước Hàn Quốc trong tiếng Anh.'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)
    // =========================================================================
    {
      id: 'm1-e2-q12',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 12,
      questionPrompt: '1. Where does Tom come from? - He ______ from Paris.',
      options: ['does', 'comes', 'plays', 'goes'],
      correctAnswer: 'comes',
      explanation: 'Câu hỏi dùng cấu trúc "Where does + S + come from?" ➔ Câu trả lời ở thì hiện tại đơn với chủ ngữ số ít "He" phải thêm -s vào động từ: "He comes from Paris." (Cậu ấy đến từ Paris).',
      grammarFocus: 'He/She + comes from + địa điểm/quốc gia.',
      vietnameseTranslation: 'Tom đến từ đâu vậy? — Cậu ấy đến từ Paris (comes).',
      hint: 'Chủ ngữ "He" đi với động từ "comes from".'
    },
    {
      id: 'm1-e2-q13',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 13,
      questionPrompt: '2. ________ to meet you, too.',
      options: ['Nice', 'Fine', 'She', 'Nine'],
      correctAnswer: 'Nice',
      explanation: 'Cụm từ chào hỏi xã giao quen thuộc khi gặp ai đó: "Nice to meet you, too." (Mình cũng rất vui khi được gặp bạn).',
      grammarFocus: 'Nice to meet you (too).',
      vietnameseTranslation: 'Rất vui được gặp bạn (Nice to meet you, too).',
      hint: 'Cụm từ bắt đầu bằng "Nice".'
    },
    {
      id: 'm1-e2-q14',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 14,
      questionPrompt: '3. ______ nationality is he? - He is English.',
      options: ['How', 'Who', 'What', 'Where'],
      correctAnswer: 'What',
      explanation: 'Cấu trúc hỏi quốc tịch của một người: "What nationality is he/she?" (Anh ấy/cô ấy mang quốc tịch gì?). Trả lời: "He is English." (Anh ấy là người Anh).',
      grammarFocus: 'What nationality is he/she? ➔ He/She is + quốc tịch.',
      vietnameseTranslation: 'Quốc tịch của anh ấy là gì? (What nationality is he?).',
      hint: 'Từ để hỏi đi cùng "nationality" là "What".'
    },
    {
      id: 'm1-e2-q15',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 15,
      questionPrompt: '4. How old is Lisa? - She is ____ years old.',
      options: ['Nice', 'Fine', 'See', 'Nine'],
      correctAnswer: 'Nine',
      explanation: 'Câu hỏi hỏi về tuổi: "How old is Lisa?" (Lisa bao nhiêu tuổi?), do đó câu trả lời cần một từ chỉ số tuổi: "Nine" (9 tuổi) ➔ "She is nine years old."',
      grammarFocus: 'How old is S? ➔ S is + số tuổi + years old.',
      vietnameseTranslation: 'Lisa bao nhiêu tuổi? — Bạn ấy 9 tuổi (Nine).',
      hint: 'Từ chỉ số đếm (số 9).'
    },
    {
      id: 'm1-e2-q16',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Choose the correct answer (Trắc nghiệm)',
      questionNumber: 16,
      questionPrompt: '5. She has Math _____ English on Tuesday.',
      options: ['but', 'or', 'for', 'and'],
      correctAnswer: 'and',
      explanation: 'Liên từ "and" (và) được dùng để liên kết hai môn học cùng có vào thứ Ba: "She has Math and English on Tuesday." (Cô ấy có môn Toán và Tiếng Anh vào thứ Ba).',
      grammarFocus: 'Liên từ "and" nối 2 danh từ môn học.',
      vietnameseTranslation: 'Cô ấy có môn Toán và Tiếng Anh vào thứ Ba (and).',
      hint: 'Liên từ có nghĩa là "và".'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - II. Reorder these letters (Sắp xếp chữ cái theo tranh)
    // =========================================================================
    {
      id: 'm1-e2-q17',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Reorder letters (Sắp xếp chữ cái tạo từ đúng)',
      questionNumber: 17,
      questionPrompt: '1. Quan sát tranh bàn làm việc công sở 💼 và sắp xếp các chữ cái: K W O R',
      imageEmoji: '💼',
      wordToUnscramble: 'KWOR',
      options: ['WORK', 'KROW', 'ROKW', 'WROK'],
      correctAnswer: 'WORK',
      explanation: 'Sắp xếp các chữ cái K-W-O-R thành từ có nghĩa theo tranh bàn làm việc ➔ WORK (làm việc).',
      vietnameseTranslation: 'WORK: làm việc',
      hint: 'Động từ/danh từ chỉ công việc, làm việc.'
    },
    {
      id: 'm1-e2-q18',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Reorder letters (Sắp xếp chữ cái tạo từ đúng)',
      questionNumber: 18,
      questionPrompt: '2. Quan sát tranh bạn nhỏ thức dậy khi mặt trời mọc 🌅 và sắp xếp: R N M N O G I',
      imageEmoji: '🌅',
      wordToUnscramble: 'RNMNOGI',
      options: ['MORNING', 'NORMING', 'MINRING', 'MONRING'],
      correctAnswer: 'MORNING',
      explanation: 'Sắp xếp các chữ cái R-N-M-N-O-G-I theo tranh buổi sáng thức dậy ➔ MORNING (buổi sáng).',
      vietnameseTranslation: 'MORNING: buổi sáng',
      hint: 'Từ chỉ buổi sáng (Good morning).'
    },
    {
      id: 'm1-e2-q19',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Reorder letters (Sắp xếp chữ cái tạo từ đúng)',
      questionNumber: 19,
      questionPrompt: '3. Quan sát tranh thành phố với các tòa nhà cao ốc 🏙️ và sắp xếp: Y T C I',
      imageEmoji: '🏙️',
      wordToUnscramble: 'YTCI',
      options: ['CITY', 'TICY', 'ITYC', 'YICT'],
      correctAnswer: 'CITY',
      explanation: 'Sắp xếp các chữ cái Y-T-C-I theo tranh đô thị sầm uất ➔ CITY (thành phố).',
      vietnameseTranslation: 'CITY: thành phố',
      hint: 'Từ có nghĩa là thành phố.'
    },
    {
      id: 'm1-e2-q20',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Reorder letters (Sắp xếp chữ cái tạo từ đúng)',
      questionNumber: 20,
      questionPrompt: '4. Quan sát tranh cây đàn ghi-ta dây 🎸 và sắp xếp các chữ cái: I G A T U R',
      imageEmoji: '🎸',
      wordToUnscramble: 'IGATUR',
      options: ['GUITAR', 'GUTAIR', 'GIUTAR', 'GUITRA'],
      correctAnswer: 'GUITAR',
      explanation: 'Sắp xếp các chữ cái I-G-A-T-U-R theo tranh nhạc cụ ➔ GUITAR (đàn ghi-ta).',
      vietnameseTranslation: 'GUITAR: đàn ghi-ta',
      hint: 'Tên nhạc cụ dây rất phổ biến.'
    },
    {
      id: 'm1-e2-q21',
      type: 'unscramble_word',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Reorder letters (Sắp xếp chữ cái tạo từ đúng)',
      questionNumber: 21,
      questionPrompt: '5. Quan sát tranh lịch thứ Bảy & Chủ Nhật (SATURDAY - SUNDAY) 📅 và sắp xếp: D E K W E N E',
      imageEmoji: '📅',
      wordToUnscramble: 'DEKWENE',
      options: ['WEEKEND', 'WEEDKEN', 'WENKED', 'WEEKDEN'],
      correctAnswer: 'WEEKEND',
      explanation: 'Sắp xếp các chữ cái D-E-K-W-E-N-E theo tranh 2 ngày nghỉ cuối tuần (Saturday, Sunday) ➔ WEEKEND (cuối tuần).',
      vietnameseTranslation: 'WEEKEND: cuối tuần',
      hint: 'Từ chỉ ngày cuối tuần (thứ Bảy và Chủ Nhật).'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - III. Find ONE mistake in each sentence and correct it
    // =========================================================================
    {
      id: 'm1-e2-q22',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 22,
      questionPrompt: '1. Tìm lỗi sai trong câu: "Can she swim? - No, she can."',
      options: [
        'Sửa "she can" thành "she can’t"',
        'Sửa "Can" thành "Do"',
        'Sửa "swim" thành "swims"',
        'Sửa "she" thành "he"'
      ],
      correctAnswer: 'Sửa "she can" thành "she can’t"',
      explanation: 'Kiến thức: Hỏi về khả năng của ai đó: "Can + S + V(nguyên thể)?". Trả lời phủ định với No: "No, S + can\'t." Do đó sửa "she can" thành "she can\'t" (Không, cô ấy không thể).',
      grammarFocus: 'No, S + can’t (phủ định bắt buộc có can’t).',
      vietnameseTranslation: 'Cô ấy có biết bơi không? — Không, cô ấy không biết bơi (No, she can’t).',
      hint: 'Vế trả lời bắt đầu bằng "No" thì động từ phải ở dạng phủ định.'
    },
    {
      id: 'm1-e2-q23',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 23,
      questionPrompt: '2. Tìm lỗi sai trong câu: "When day is it today? - It’s Sunday."',
      options: [
        'Sửa "When" thành "What"',
        'Sửa "day" thành "date"',
        'Sửa "is it" thành "it is"',
        'Sửa "Sunday" thành "on Sunday"'
      ],
      correctAnswer: 'Sửa "When" thành "What"',
      explanation: 'Kiến thức: Cấu trúc hỏi hôm nay là thứ mấy trong tuần là "What day is it today?" chứ không dùng "When day". Sửa "When" thành "What".',
      grammarFocus: 'What day is it today? (Hỏi thứ trong tuần).',
      vietnameseTranslation: 'Hôm nay là thứ mấy? — Hôm nay là Chủ Nhật (What day is it today?).',
      hint: 'Cụm từ hỏi thứ trong tuần là "What day".'
    },
    {
      id: 'm1-e2-q24',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 24,
      questionPrompt: '3. Tìm lỗi sai trong câu: "His birthday is on the two of May."',
      options: [
        'Sửa "two" thành "second"',
        'Sửa "on" thành "in"',
        'Sửa "His" thành "He"',
        'Sửa "May" thành "the May"'
      ],
      correctAnswer: 'Sửa "two" thành "second"',
      explanation: 'Kiến thức: Nói về ngày sinh nhật: "My/His/Her birthday is on the + số thứ tự + of + tháng". Số ngày phải dùng số thứ tự "second" (ngày thứ 2), không dùng số đếm "two". Sửa "two" thành "second".',
      grammarFocus: 'on the + số thứ tự (first, second, third...) + of + tháng.',
      vietnameseTranslation: 'Sinh nhật của anh ấy vào ngày 2 tháng Năm (second of May).',
      hint: 'Sau "the" phải là số thứ tự.'
    },
    {
      id: 'm1-e2-q25',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 25,
      questionPrompt: '4. Tìm lỗi sai trong câu: "I go the English club in Monday."',
      options: [
        'Sửa "in" thành "on"',
        'Sửa "go" thành "goes"',
        'Sửa "the" thành "a"',
        'Sửa "Monday" thành "Mondays"'
      ],
      correctAnswer: 'Sửa "in" thành "on"',
      explanation: 'Kiến thức: Đi trước các thứ trong tuần ta bắt buộc phải dùng giới từ "on" (on Monday, on Tuesday...), không dùng "in". Sửa "in" thành "on".',
      grammarFocus: 'on + các thứ trong tuần (on Monday).',
      vietnameseTranslation: 'Tôi đến câu lạc bộ tiếng Anh vào thứ Hai (on Monday).',
      hint: 'Giới từ đi trước thứ trong tuần là "on".'
    },
    {
      id: 'm1-e2-q26',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 26,
      questionPrompt: '5. Tìm lỗi sai trong câu: "How can you do? - I can dance."',
      options: [
        'Sửa "How" thành "What"',
        'Sửa "can" thành "do"',
        'Sửa "you" thành "she"',
        'Sửa "dance" thành "dancing"'
      ],
      correctAnswer: 'Sửa "How" thành "What"',
      explanation: 'Kiến thức: Hỏi xem ai đó có khả năng làm được việc gì: "What can + S + do?". Câu trả lời là "I can dance." (Tôi có thể nhảy). Do đó từ để hỏi phải là "What", không dùng "How". Sửa "How" thành "What".',
      grammarFocus: 'What can + S + do? ➔ S + can + V.',
      vietnameseTranslation: 'Bạn có thể làm gì? — Tôi có thể nhảy múa (What can you do?).',
      hint: 'Hỏi làm cái gì dùng từ "What".'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - IV. Put the words in order (Sắp xếp từ thành câu)
    // =========================================================================
    {
      id: 'm1-e2-q27',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Put words in order (Sắp xếp câu)',
      questionNumber: 27,
      questionPrompt: '1. from / He / Japan / comes / . ➔ Sắp xếp thành câu đúng:',
      scrambledWords: ['He', 'comes', 'from', 'Japan.'],
      correctAnswer: 'He comes from Japan.',
      explanation: 'Cấu trúc câu khẳng định xuất thân: S + comes from + quốc gia. ➔ "He comes from Japan." (Anh ấy đến từ Nhật Bản).',
      vietnameseTranslation: 'Anh ấy đến từ Nhật Bản.',
      hint: 'Bắt đầu bằng chủ ngữ "He".'
    },
    {
      id: 'm1-e2-q28',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Put words in order (Sắp xếp câu)',
      questionNumber: 28,
      questionPrompt: '2. The / piano / can / she / play / . ➔ Sắp xếp thành câu đúng:',
      scrambledWords: ['She', 'can', 'play', 'the', 'piano.'],
      correctAnswer: 'She can play the piano.',
      explanation: 'Cấu trúc khả năng chơi nhạc cụ: S + can + play + the + tên nhạc cụ. ➔ "She can play the piano." (Cô ấy có thể chơi đàn piano).',
      vietnameseTranslation: 'Cô ấy có thể chơi đàn piano.',
      hint: 'Bắt đầu bằng "She can play the..."'
    },
    {
      id: 'm1-e2-q29',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Put words in order (Sắp xếp câu)',
      questionNumber: 29,
      questionPrompt: '3. Birthday / of / the / My / on / is / March / seventh / . ➔ Sắp xếp thành câu đúng:',
      scrambledWords: ['My', 'birthday', 'is', 'on', 'the', 'seventh', 'of', 'March.'],
      correctAnswer: 'My birthday is on the seventh of March.',
      explanation: 'Cấu trúc ngày sinh nhật: My birthday + is + on the + số thứ tự + of + tháng. ➔ "My birthday is on the seventh of March." (Sinh nhật của tôi vào ngày 7 tháng Ba).',
      vietnameseTranslation: 'Sinh nhật của tôi vào ngày 7 tháng Ba.',
      hint: 'Bắt đầu bằng "My birthday is on the..."'
    },
    {
      id: 'm1-e2-q30',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Put words in order (Sắp xếp câu)',
      questionNumber: 30,
      questionPrompt: '4. Date / today / is / the / What / ? ➔ Sắp xếp thành câu hỏi ngày tháng:',
      scrambledWords: ['What', 'is', 'the', 'date', 'today?'],
      correctAnswer: 'What is the date today?',
      explanation: 'Cấu trúc câu hỏi ngày bao nhiêu: What is the date today? (Hôm nay là ngày bao nhiêu vậy?).',
      vietnameseTranslation: 'Hôm nay là ngày bao nhiêu vậy?',
      hint: 'Bắt đầu bằng từ để hỏi "What".'
    },
    {
      id: 'm1-e2-q31',
      type: 'reorder',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - IV. Put words in order (Sắp xếp câu)',
      questionNumber: 31,
      questionPrompt: '5. are / nationality / What / you / ? ➔ Sắp xếp thành câu hỏi quốc tịch:',
      scrambledWords: ['What', 'nationality', 'are', 'you?'],
      correctAnswer: 'What nationality are you?',
      explanation: 'Cấu trúc câu hỏi quốc tịch: What nationality are you? (Quốc tịch của bạn là gì?).',
      vietnameseTranslation: 'Quốc tịch của bạn là gì?',
      hint: 'Bắt đầu bằng "What nationality..."'
    },

    // =========================================================================
    // B. VOCABULARY & GRAMMAR - V. Read and answer the questions (Đọc hiểu về bạn Quân)
    // =========================================================================
    {
      id: 'm1-e2-q32',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and answer (Đọc hiểu bạn Quân)',
      questionNumber: 32,
      questionPrompt: '1. When is Quan birthday?',
      readingPassage:
        "This is my new friend. His name is Quan. He is nine years old. His birthday is on the first of November. My new friend is from Vietnam. Quan likes playing sports. He can play volleyball but he can't play basketball. He goes to sports club on Friday afternoon.\n\n(Tạm dịch: Đây là người bạn mới của tôi. Tên cậu ấy là Quân. Cậu ấy 9 tuổi. Sinh nhật cậu ấy vào ngày 1 tháng Mười một. Người bạn mới của tôi đến từ Việt Nam. Quân thích chơi thể thao. Cậu ấy có thể chơi bóng chuyền nhưng không chơi được bóng rổ. Cậu ấy thường đến câu lạc bộ thể thao vào chiều thứ Sáu.)",
      options: [
        'His birthday is on the first of November.',
        'His birthday is on the first of October.',
        'His birthday is on the second of November.',
        'His birthday is on Friday afternoon.'
      ],
      correctAnswer: 'His birthday is on the first of November.',
      explanation: 'Thông tin trong đoạn 1: "His birthday is on the first of November." (Sinh nhật cậu ấy vào ngày 1 tháng Mười một).',
      vietnameseTranslation: 'Sinh nhật Quân vào ngày 1 tháng Mười một.',
      hint: 'Tìm câu có chứa cụm từ "birthday is on..."'
    },
    {
      id: 'm1-e2-q33',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and answer (Đọc hiểu bạn Quân)',
      questionNumber: 33,
      questionPrompt: '2. Where is he from?',
      readingPassage:
        "This is my new friend. His name is Quan. He is nine years old. His birthday is on the first of November. My new friend is from Vietnam. Quan likes playing sports. He can play volleyball but he can't play basketball. He goes to sports club on Friday afternoon.",
      options: ['He is from Vietnam.', 'He is from Japan.', 'He is from America.', 'He is from England.'],
      correctAnswer: 'He is from Vietnam.',
      explanation: 'Thông tin trong bài: "My new friend is from Vietnam." ➔ He is from Vietnam (Cậu ấy đến từ Việt Nam).',
      vietnameseTranslation: 'Cậu ấy đến từ Việt Nam (He is from Vietnam).',
      hint: 'Tìm câu có chứa "from Vietnam".'
    },
    {
      id: 'm1-e2-q34',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and answer (Đọc hiểu bạn Quân)',
      questionNumber: 34,
      questionPrompt: '3. What does he like?',
      readingPassage:
        "This is my new friend. His name is Quan. He is nine years old. His birthday is on the first of November. My new friend is from Vietnam. Quan likes playing sports. He can play volleyball but he can't play basketball. He goes to sports club on Friday afternoon.",
      options: [
        'He likes playing sports.',
        'He likes playing the guitar.',
        'He likes swimming in the pool.',
        'He likes cooking dinner.'
      ],
      correctAnswer: 'He likes playing sports.',
      explanation: 'Thông tin trong bài: "Quan likes playing sports." (Quân thích chơi thể thao).',
      vietnameseTranslation: 'Cậu ấy thích chơi thể thao (He likes playing sports).',
      hint: 'Tìm câu có chứa từ "likes".'
    },
    {
      id: 'm1-e2-q35',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and answer (Đọc hiểu bạn Quân)',
      questionNumber: 35,
      questionPrompt: '4. Can he play basketball?',
      readingPassage:
        "This is my new friend. His name is Quan. He is nine years old. His birthday is on the first of November. My new friend is from Vietnam. Quan likes playing sports. He can play volleyball but he can't play basketball. He goes to sports club on Friday afternoon.",
      options: ['No, he can’t.', 'Yes, he can.', 'Yes, he does.', 'No, he isn’t.'],
      correctAnswer: 'No, he can’t.',
      explanation: 'Thông tin trong bài: "...he can\'t play basketball." (cậu ấy không thể chơi bóng rổ) ➔ Câu trả lời: "No, he can’t."',
      vietnameseTranslation: 'Cậu ấy không thể chơi bóng rổ (No, he can’t).',
      hint: 'Tìm câu có chữ "can\'t play basketball".'
    },
    {
      id: 'm1-e2-q36',
      type: 'reading',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - V. Read and answer (Đọc hiểu bạn Quân)',
      questionNumber: 36,
      questionPrompt: '5. When does he go to sports club?',
      readingPassage:
        "This is my new friend. His name is Quan. He is nine years old. His birthday is on the first of November. My new friend is from Vietnam. Quan likes playing sports. He can play volleyball but he can't play basketball. He goes to sports club on Friday afternoon.",
      options: [
        'He goes to sports club on Friday afternoon.',
        'He goes to sports club on Monday morning.',
        'He goes to sports club on Sunday evening.',
        'He goes to sports club on Wednesday.'
      ],
      correctAnswer: 'He goes to sports club on Friday afternoon.',
      explanation: 'Thông tin trong câu cuối cùng: "He goes to sports club on Friday afternoon." (Cậu ấy thường đến câu lạc bộ thể thao vào chiều thứ Sáu).',
      vietnameseTranslation: 'Cậu ấy đến câu lạc bộ thể thao vào chiều thứ Sáu.',
      hint: 'Tìm câu cuối của đoạn văn.'
    }
  ]
};
