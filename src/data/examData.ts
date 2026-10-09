export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface ExamQuestion {
  id: string;
  type:
    | 'multiple_choice'
    | 'odd_one_out'
    | 'pronunciation'
    | 'listening'
    | 'reading'
    | 'reorder'
    | 'matching'
    | 'error_correction'
    | 'fill_blank'
    | 'categorize'
    | 'unscramble_word';
  exerciseTitle: string;
  questionNumber: number;
  questionPrompt: string;
  imageEmoji?: string;
  readingPassage?: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
  scrambledWords?: string[]; // for sentence reorder
  wordToUnscramble?: string; // for word unscramble (e.g. APION -> PIANO)
  matchingPairs?: MatchingPair[]; // for matching column A & B
  wordBank?: string[]; // for fill_blank from a word box
  categorizeColumns?: { categoryName: string; correctItems: string[] }[];
}

export interface ExamPaper {
  id: string;
  category: 'midterm_1' | 'term_1' | 'midterm_2' | 'term_2';
  categoryLabel: string;
  title: string;
  subTitle: string;
  academicYear: string;
  durationMinutes: number;
  totalQuestions: number;
  icon: string;
  themeColor: string;
  questions: ExamQuestion[];
}

export const EXAM_PAPERS: ExamPaper[] = [
  // =========================================================================
  // 1. ĐỀ KIỂM TRA GIỮA KỲ I SỐ 1
  // =========================================================================
  {
    id: 'midterm1-exam1',
    category: 'midterm_1',
    categoryLabel: 'Giữa Học Kì 1',
    title: 'Đề Kiểm Tra Giữa Kỳ I - Số 1',
    subTitle: 'Nội dung chuẩn kiến thức Units 1 - 5 (Từ vựng, Ngữ pháp, Nối câu, Hội thoại)',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 33,
    icon: '📘',
    themeColor: 'from-blue-600 via-indigo-600 to-sky-600',
    questions: [
      // Ex 1: Odd one out
      {
        id: 'm1-e1-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 1,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Math', 'Name', 'English', 'Vietnamese'],
        correctAnswer: 'Name',
        explanation: '"Math", "English", "Vietnamese" đều là tên các môn học hoặc ngôn ngữ; còn "Name" là danh từ chỉ tên gọi.',
        hint: '3 từ còn lại đều là các môn học quen thuộc ở trường.'
      },
      {
        id: 'm1-e1-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Where', 'What', 'Why', 'Can'],
        correctAnswer: 'Can',
        explanation: '"Where", "What", "Why" là các từ để hỏi (Wh-questions), còn "Can" là trợ động từ khuyết thiếu chỉ khả năng.',
        hint: 'Từ nào dùng để hỏi về khả năng "có thể làm gì" thay vì từ để hỏi thông tin?'
      },
      {
        id: 'm1-e1-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 3,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Country', 'Singapore', 'China', 'Australia'],
        correctAnswer: 'Country',
        explanation: '"Singapore", "China", "Australia" là tên các quốc gia cụ thể, còn "Country" là danh từ chung có nghĩa là đất nước/quốc gia.',
        hint: 'Tìm từ chỉ khái niệm chung chứ không phải tên riêng của 1 đất nước.'
      },
      {
        id: 'm1-e1-q4',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 4,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Cook', 'Play', 'Go', 'Would'],
        correctAnswer: 'Would',
        explanation: '"Cook" (nấu ăn), "Play" (chơi), "Go" (đi) là động từ chỉ hành động thường; còn "Would" là trợ động từ dùng trong lời mời (Would you like...).',
        hint: '3 từ là hành động cụ thể hàng ngày.'
      },
      {
        id: 'm1-e1-q5',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 5,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Birthday', 'Monday', 'Friday', 'Thursday'],
        correctAnswer: 'Birthday',
        explanation: '"Monday", "Friday", "Thursday" là các thứ trong tuần; còn "Birthday" là ngày sinh nhật.',
        hint: '3 từ còn lại đều là các thứ trong tuần (từ thứ Hai đến thứ Sáu).'
      },
      {
        id: 'm1-e1-q6',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 6,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Was', 'Am', 'Is', 'Are'],
        correctAnswer: 'Was',
        explanation: '"Am", "Is", "Are" là to be ở thì hiện tại đơn; còn "Was" là to be ở thì quá khứ đơn.',
        hint: 'Từ nào chỉ thì quá khứ (ngày hôm qua)?'
      },
      {
        id: 'm1-e1-q7',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 7,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['On', 'To', 'Be', 'For'],
        correctAnswer: 'Be',
        explanation: '"On", "To", "For" là các giới từ; còn "Be" là động từ to be.',
        hint: 'Tìm từ đóng vai trò là động từ.'
      },
      {
        id: 'm1-e1-q8',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại (Odd one out)',
        questionNumber: 8,
        questionPrompt: 'Chọn từ khác loại với các từ còn lại:',
        options: ['Japanese', 'America', 'Cambodia', 'Malaysia'],
        correctAnswer: 'Japanese',
        explanation: '"America", "Cambodia", "Malaysia" là tên quốc gia; còn "Japanese" là từ chỉ quốc tịch (người Nhật) hoặc tiếng Nhật.',
        hint: 'Từ nào là quốc tịch chứ không phải tên nước?'
      },

      // Ex 2: Verb form
      {
        id: 'm1-e1-q9',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 9,
        questionPrompt: 'He can (climb) _________________ the trees.',
        options: ['climb', 'climbs', 'climbing', 'climbed'],
        correctAnswer: 'climb',
        explanation: 'Sau trợ động từ khuyết thiếu "can" (có thể), ta dùng động từ nguyên mẫu không chia: S + can + V(nguyên mẫu).',
        hint: 'Sau "can" động từ giữ nguyên mẫu nhé!'
      },
      {
        id: 'm1-e1-q10',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 10,
        questionPrompt: 'When (be) _________________ your birthday?',
        options: ['is', 'are', 'am', 'was'],
        correctAnswer: 'is',
        explanation: 'Chủ ngữ "your birthday" là danh từ số ít ở hiện tại nên động từ to be chia là "is" -> When is your birthday?',
        hint: '"your birthday" (sinh nhật của bạn) là danh từ số ít.'
      },
      {
        id: 'm1-e1-q11',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 11,
        questionPrompt: 'I (stay) _________________ at home yesterday.',
        options: ['stayed', 'stay', 'stays', 'staying'],
        correctAnswer: 'stayed',
        explanation: 'Trong câu có trạng từ thời gian quá khứ "yesterday" (hôm qua) nên động từ "stay" thêm đuôi -ed thành "stayed".',
        hint: '"yesterday" là dấu hiệu của thì quá khứ đơn.'
      },
      {
        id: 'm1-e1-q12',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 12,
        questionPrompt: 'What ______________ they (do) ______________ now?',
        options: ['are - doing', 'do - do', 'is - doing', 'did - do'],
        correctAnswer: 'are - doing',
        explanation: 'Dấu hiệu "now" (bây giờ) chỉ thì hiện tại tiếp diễn: What + are + they + V-ing? -> "What are they doing now?"',
        hint: '"now" là hiện tại tiếp diễn, chủ ngữ "they" đi với "are".'
      },
      {
        id: 'm1-e1-q13',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 13,
        questionPrompt: 'They (play) _________________ the piano now.',
        options: ['are playing', 'play', 'plays', 'played'],
        correctAnswer: 'are playing',
        explanation: 'Thì hiện tại tiếp diễn với "now": S + am/is/are + V-ing. "They" đi với "are playing".',
        hint: 'Họ đang chơi đàn ngay lúc này (now).'
      },
      {
        id: 'm1-e1-q14',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 14,
        questionPrompt: 'Today she (have) _________________ English and history.',
        options: ['has', 'have', 'having', 'had'],
        correctAnswer: 'has',
        explanation: 'Chủ ngữ ngôi thứ 3 số ít "she" đi với động từ "has" ở thì hiện tại đơn.',
        hint: 'Chủ ngữ là "she" thì have chuyển thành gì?'
      },
      {
        id: 'm1-e1-q15',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 15,
        questionPrompt: 'What day (be) _________________ it today?',
        options: ['is', 'are', 'was', 'be'],
        correctAnswer: 'is',
        explanation: 'Cấu trúc hỏi thứ trong ngày: What day is it today? (Chủ ngữ giả "it" đi với "is").',
        hint: 'Câu hỏi quen thuộc hỏi hôm nay là thứ mấy: What day... it today?'
      },
      {
        id: 'm1-e1-q16',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Cho dạng đúng của các động từ sau',
        questionNumber: 16,
        questionPrompt: 'Tommy and Vicky (be) _________________ from Korea.',
        options: ['are', 'is', 'am', 'was'],
        correctAnswer: 'are',
        explanation: '"Tommy and Vicky" là chủ ngữ số nhiều (2 người) nên động từ to be chia là "are".',
        hint: '2 người là chủ ngữ số nhiều nên dùng to be nào?'
      },

      // Ex 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B
      {
        id: 'm1-e1-q17',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 17,
        questionPrompt: '1. Cột A: "What is Mr. Long doing?" (Thầy Long đang làm gì?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'g, He is teaching a lesson. (Thầy đang dạy một tiết học.)',
          'a, Yes, he can.',
          'd, His birthday is in October.',
          'e, She is Japanese.'
        ],
        correctAnswer: 'g, He is teaching a lesson. (Thầy đang dạy một tiết học.)',
        explanation: 'Hỏi về việc thầy Long đang làm gì ở thì hiện tại tiếp diễn ("What is Mr. Long doing?") ➔ Cột B câu g: "He is teaching a lesson." (Thầy đang giảng bài).',
        hint: 'Tìm câu trả lời bắt đầu bằng "He is..." chỉ hành động giảng dạy.'
      },
      {
        id: 'm1-e1-q18',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 18,
        questionPrompt: '2. Cột A: "When is his birthday?" (Sinh nhật cậu ấy khi nào?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'd, His birthday is in October. (Sinh nhật cậu ấy vào tháng Mười.)',
          'b, I am from Vietnam.',
          'f, I was at home yesterday.',
          'h, They have Math and PE.'
        ],
        correctAnswer: 'd, His birthday is in October. (Sinh nhật cậu ấy vào tháng Mười.)',
        explanation: 'Hỏi ngày sinh nhật ("When is his birthday?") ➔ Cột B câu d: "His birthday is in October." (Sinh nhật của cậu ấy vào tháng Mười).',
        hint: 'Hỏi "When" ➔ câu trả lời chỉ thời gian/tháng trong năm.'
      },
      {
        id: 'm1-e1-q19',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 19,
        questionPrompt: '3. Cột A: "Where are you from?" (Bạn đến từ đâu?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'b, I am from Vietnam. (Tớ đến từ Việt Nam.)',
          'e, She is Japanese.',
          'c, I like dancing and singing.',
          'a, Yes, he can.'
        ],
        correctAnswer: 'b, I am from Vietnam. (Tớ đến từ Việt Nam.)',
        explanation: 'Hỏi quê quán, xuất thân ("Where are you from?") ➔ Cột B câu b: "I am from Vietnam." (Tớ đến từ Việt Nam).',
        hint: 'Hỏi "you" ➔ trả lời "I am from...".'
      },
      {
        id: 'm1-e1-q20',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 20,
        questionPrompt: '4. Cột A: "Where were you yesterday?" (Hôm qua bạn ở đâu?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'f, I was at home yesterday. (Hôm qua tớ ở nhà.)',
          'g, He is teaching a lesson.',
          'b, I am from Vietnam.',
          'd, His birthday is in October.'
        ],
        correctAnswer: 'f, I was at home yesterday. (Hôm qua tớ ở nhà.)',
        explanation: 'Hỏi ở quá khứ ("Where were you yesterday?") ➔ Cột B câu f: "I was at home yesterday." (Hôm qua tớ ở nhà).',
        hint: 'Thì quá khứ đơn có "yesterday" và "was".'
      },
      {
        id: 'm1-e1-q21',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 21,
        questionPrompt: '5. Cột A: "Can he cook?" (Cậu ấy có biết nấu ăn không?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'a, Yes, he can. (Có, cậu ấy có thể.)',
          'e, She is Japanese.',
          'c, I like dancing and singing.',
          'h, They have Math and PE.'
        ],
        correctAnswer: 'a, Yes, he can. (Có, cậu ấy có thể.)',
        explanation: 'Câu hỏi nghi vấn với "Can he...?" ➔ Cột B câu a: "Yes, he can." (Có, cậu ấy biết nấu ăn).',
        hint: 'Hỏi "Can he...?" ➔ trả lời "Yes, he can."'
      },
      {
        id: 'm1-e1-q22',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 22,
        questionPrompt: '6. Cột A: "What is Hanna’s nationality?" (Quốc tịch của bạn Hanna là gì?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'e, She is Japanese. (Bạn ấy là người Nhật Bản.)',
          'b, I am from Vietnam.',
          'a, Yes, he can.',
          'g, He is teaching a lesson.'
        ],
        correctAnswer: 'e, She is Japanese. (Bạn ấy là người Nhật Bản.)',
        explanation: 'Hỏi về quốc tịch của bạn nữ Hanna ("nationality") ➔ Cột B câu e: "She is Japanese." (Bạn ấy là người Nhật Bản).',
        hint: 'Hanna là con gái và "Japanese" là từ chỉ quốc tịch.'
      },
      {
        id: 'm1-e1-q23',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 23,
        questionPrompt: '7. Cột A: "What do they have on Wednesday?" (Họ có môn học gì vào thứ Tư?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'h, They have Math and PE. (Họ có môn Toán và Thể dục.)',
          'd, His birthday is in October.',
          'c, I like dancing and singing.',
          'f, I was at home yesterday.'
        ],
        correctAnswer: 'h, They have Math and PE. (Họ có môn Toán và Thể dục.)',
        explanation: 'Hỏi môn học vào thứ Tư ("What do they have on Wednesday?") ➔ Cột B câu h: "They have Math and PE." (Họ có môn Toán và môn Thể dục).',
        hint: 'Hỏi môn học ("have") của "they" ➔ "They have Math and PE".'
      },
      {
        id: 'm1-e1-q24',
        type: 'matching',
        exerciseTitle: 'Exercise 3: Nối câu hỏi ở cột A với câu trả lời thích hợp ở cột B',
        questionNumber: 24,
        questionPrompt: '8. Cột A: "What do you like doing?" (Bạn thích làm gì?) ➔ Nối với câu trả lời thích hợp ở cột B:',
        options: [
          'c, I like dancing and singing. (Tớ thích nhảy múa và ca hát.)',
          'g, He is teaching a lesson.',
          'a, Yes, he can.',
          'e, She is Japanese.'
        ],
        correctAnswer: 'c, I like dancing and singing. (Tớ thích nhảy múa và ca hát.)',
        explanation: 'Hỏi về sở thích hành động ("What do you like doing?") ➔ Cột B câu c: "I like dancing and singing." (Tớ thích nhảy múa và hát ca).',
        hint: 'Cấu trúc "I like + V-ing".'
      },

      // Ex 4: Dialogue Completion with Word Bank: do, name, What, an, too
      {
        id: 'm1-e1-q25',
        type: 'fill_blank',
        exerciseTitle: 'Exercise 4: Hoàn thành hội thoại dựa vào các từ cho trước [do, name, What, an, too]',
        questionNumber: 25,
        wordBank: ['do', 'name', 'What', 'an', 'too'],
        questionPrompt: 'Bob: "Hi. I’m Bob. What’s your (1) ___________?" ➔ Chọn từ thích hợp điền vào vị trí (1):',
        options: ['name', 'do', 'What', 'an', 'too'],
        correctAnswer: 'name',
        explanation: 'Cấu trúc hỏi tên lịch sự: "What\'s your name?" (Tên của bạn là gì?).',
        hint: 'Bob hỏi tên của bạn Clara.'
      },
      {
        id: 'm1-e1-q26',
        type: 'fill_blank',
        exerciseTitle: 'Exercise 4: Hoàn thành hội thoại dựa vào các từ cho trước [do, name, What, an, too]',
        questionNumber: 26,
        wordBank: ['do', 'name', 'What', 'an', 'too'],
        questionPrompt: 'Bob: "Nice to meet you, (2) ___________." ➔ Chọn từ thích hợp điền vào vị trí (2):',
        options: ['too', 'do', 'name', 'What', 'an'],
        correctAnswer: 'too',
        explanation: 'Đáp lại lời chào gặp mặt "Nice to meet you" bằng cách thêm từ "too" (cũng vậy): "Nice to meet you, too." (Rất vui được gặp bạn).',
        hint: 'Từ "too" có nghĩa là "cũng thế/cũng vậy".'
      },
      {
        id: 'm1-e1-q27',
        type: 'fill_blank',
        exerciseTitle: 'Exercise 4: Hoàn thành hội thoại dựa vào các từ cho trước [do, name, What, an, too]',
        questionNumber: 27,
        wordBank: ['do', 'name', 'What', 'an', 'too'],
        questionPrompt: 'Bob: "I’m American. (3) ___________ about you?" ➔ Chọn từ thích hợp điền vào vị trí (3):',
        options: ['What', 'do', 'name', 'an', 'too'],
        correctAnswer: 'What',
        explanation: 'Cụm từ hỏi ngược lại: "What about you?" (Còn bạn thì sao? Bạn mang quốc tịch gì?).',
        hint: 'Cụm từ quen thuộc: What about you?'
      },
      {
        id: 'm1-e1-q28',
        type: 'fill_blank',
        exerciseTitle: 'Exercise 4: Hoàn thành hội thoại dựa vào các từ cho trước [do, name, What, an, too]',
        questionNumber: 28,
        wordBank: ['do', 'name', 'What', 'an', 'too'],
        questionPrompt: 'Clara: "Can you sing (4) ___________ English song?" ➔ Chọn từ thích hợp điền vào vị trí (4):',
        options: ['an', 'do', 'name', 'What', 'too'],
        correctAnswer: 'an',
        explanation: 'Trước danh từ số ít bắt đầu bằng nguyên âm "English" (âm /ɪ/), ta dùng mạo từ "an" ➔ "an English song" (một bài hát tiếng Anh).',
        hint: 'Đứng trước từ bắt đầu bằng nguyên âm E ta dùng mạo từ "an".'
      },
      {
        id: 'm1-e1-q29',
        type: 'fill_blank',
        exerciseTitle: 'Exercise 4: Hoàn thành hội thoại dựa vào các từ cho trước [do, name, What, an, too]',
        questionNumber: 29,
        wordBank: ['do', 'name', 'What', 'an', 'too'],
        questionPrompt: 'Bob: "Do you like playing the guitar?" - Clara: "Yes, I (5) ___________." ➔ Chọn từ thích hợp điền vào vị trí (5):',
        options: ['do', 'name', 'What', 'an', 'too'],
        correctAnswer: 'do',
        explanation: 'Trả lời ngắn cho câu hỏi bắt đầu bằng "Do you...?" là "Yes, I do." (Có, tớ thích).',
        hint: 'Câu hỏi là "Do you...?", trả lời là "Yes, I do".'
      },

      // Ex 5: Reorder sentence (All 4 questions from page 2)
      {
        id: 'm1-e1-q30',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ để tạo thành câu hoàn chỉnh',
        questionNumber: 30,
        questionPrompt: '1. you/ subjects/ today/ What/ have/ do? ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['What', 'subjects', 'do', 'you', 'have', 'today'],
        correctAnswer: 'What subjects do you have today?',
        explanation: 'Cấu trúc câu hỏi thời khóa biểu: What subjects do you have today? (Hôm nay bạn có những môn học nào?).',
        hint: 'Bắt đầu bằng "What subjects do you have..."'
      },
      {
        id: 'm1-e1-q31',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ để tạo thành câu hoàn chỉnh',
        questionNumber: 31,
        questionPrompt: '2. Can/ football/ you/ play? ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['Can', 'you', 'play', 'football'],
        correctAnswer: 'Can you play football?',
        explanation: 'Cấu trúc câu hỏi khả năng với Can: Can you + V + danh từ thể thao? ➔ "Can you play football?" (Bạn có biết chơi bóng đá không?).',
        hint: 'Bắt đầu bằng "Can you play..."'
      },
      {
        id: 'm1-e1-q32',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ để tạo thành câu hoàn chỉnh',
        questionNumber: 32,
        questionPrompt: '3. email/ an/ I/ writing/ am. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['I', 'am', 'writing', 'an', 'email'],
        correctAnswer: 'I am writing an email.',
        explanation: 'Cấu trúc câu hiện tại tiếp diễn: S + am/is/are + V-ing + tân ngữ. ➔ "I am writing an email." (Tôi đang viết một bức thư điện tử).',
        hint: 'Bắt đầu bằng "I am writing an..."'
      },
      {
        id: 'm1-e1-q33',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ để tạo thành câu hoàn chỉnh',
        questionNumber: 33,
        questionPrompt: '4. She/ very/ cooking/ much/ likes. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['She', 'likes', 'cooking', 'very', 'much'],
        correctAnswer: 'She likes cooking very much.',
        explanation: 'Cấu trúc: S + likes + V-ing + very much. ➔ "She likes cooking very much." (Cô ấy rất thích việc nấu ăn).',
        hint: 'Bắt đầu bằng "She likes cooking..."'
      }
    ]
  },

  // =========================================================================
  // 2. ĐỀ KIỂM TRA GIỮA KỲ I SỐ 2
  // =========================================================================
  {
    id: 'midterm1-exam2',
    category: 'midterm_1',
    categoryLabel: 'Giữa Học Kì 1',
    title: 'Đề Kiểm Tra Giữa Kỳ I - Số 2',
    subTitle: 'Phát âm khác, Điền chữ cái, Sắp xếp hội thoại & Điền từ theo tranh',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 20,
    icon: '🎯',
    themeColor: 'from-emerald-600 via-teal-600 to-cyan-600',
    questions: [
      // Pronunciation
      {
        id: 'm1-e2-q1',
        type: 'pronunciation',
        exerciseTitle: 'Exercise 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 1,
        questionPrompt: 'Phát âm của nguyên âm "u": pupil, music, sun, student:',
        options: ['pupil (/juː/)', 'music (/juː/)', 'sun (/ʌ/)', 'student (/juː/)'],
        correctAnswer: 'sun (/ʌ/)',
        explanation: '"sun" có chữ u phát âm là âm ngắn /ʌ/, trong khi "pupil", "music", "student" phát âm là /juː/.',
        hint: '"sun" là âm á /ʌ/ (mặt trời).'
      },
      {
        id: 'm1-e2-q2',
        type: 'pronunciation',
        exerciseTitle: 'Exercise 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 2,
        questionPrompt: 'Phát âm của âm "oo": football, book, good, food:',
        options: ['football (/ʊ/)', 'book (/ʊ/)', 'good (/ʊ/)', 'food (/uː/)'],
        correctAnswer: 'food (/uː/)',
        explanation: '"food" có âm /uː/ kéo dài, trong khi "football", "book", "good" là âm /ʊ/ ngắn.',
        hint: '"food" có âm u dài /uː/.'
      },
      {
        id: 'm1-e2-q3',
        type: 'pronunciation',
        exerciseTitle: 'Exercise 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 3,
        questionPrompt: 'Phát âm của nguyên âm "o": Monday, come, from, some:',
        options: ['Monday (/ʌ/)', 'come (/ʌ/)', 'from (/ɒ/)', 'some (/ʌ/)'],
        correctAnswer: 'from (/ɒ/)',
        explanation: '"from" có âm /ɒ/ (âm o ngắn), trong khi "Monday", "come", "some" đều phát âm thành /ʌ/ (âm á).',
        hint: '"from" phát âm là âm o tròn môi.'
      },
      {
        id: 'm1-e2-q4',
        type: 'pronunciation',
        exerciseTitle: 'Exercise 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 4,
        questionPrompt: 'Phát âm của nguyên âm "a": skate, can, may, date:',
        options: ['skate (/eɪ/)', 'can (/æ/)', 'may (/eɪ/)', 'date (/eɪ/)'],
        correctAnswer: 'can (/æ/)',
        explanation: '"can" phát âm là âm /æ/ (e bẹt), còn "skate", "may", "date" đều phát âm là âm đôi /eɪ/.',
        hint: '"can" phát âm là /kæn/.'
      },

      // Fill in letters
      {
        id: 'm1-e2-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 5,
        questionPrompt: '1. Hoàn thành câu chào: "It’s n_ce t_ meet _ou."',
        options: ['i - o - y (nice to meet you)', 'e - o - y', 'i - u - y', 'a - o - u'],
        correctAnswer: 'i - o - y (nice to meet you)',
        explanation: 'Câu hoàn chỉnh là: "It\'s nice to meet you." (Rất vui được gặp bạn).',
        hint: 'Câu chào hỏi rất quen thuộc khi mới gặp nhau.'
      },
      {
        id: 'm1-e2-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 6,
        questionPrompt: '2. Hoàn thành từ chỉ học sinh: "I’m a p_p_ _."',
        options: ['u - i - l (pupil)', 'e - o - l', 'a - i - r', 'u - e - l'],
        correctAnswer: 'u - i - l (pupil)',
        explanation: 'Từ hoàn chỉnh là "pupil" (học sinh tiểu học) ➔ "I\'m a pupil."',
        hint: 'Từ tiếng Anh chỉ học sinh bắt đầu bằng chữ p.'
      },
      {
        id: 'm1-e2-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 7,
        questionPrompt: '3. Hoàn thành câu hỏi xuất thân: "W_ere a_ _ you f_om?"',
        options: ['h - re - r (Where are you from?)', 'e - re - r', 'h - re - n', 'h - ra - r'],
        correctAnswer: 'h - re - r (Where are you from?)',
        explanation: 'Câu hoàn chỉnh là: "Where are you from?" (Bạn đến từ đâu?).',
        hint: 'Cấu trúc hỏi quê quán quen thuộc.'
      },
      {
        id: 'm1-e2-q8',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 8,
        questionPrompt: '4. Hoàn thành câu: "T_ _ay is S_nd_y."',
        options: ['od - u - a (Today is Sunday)', 'ad - o - y', 'ed - u - a', 'id - a - y'],
        correctAnswer: 'od - u - a (Today is Sunday)',
        explanation: 'Từ hoàn chỉnh là: "Today is Sunday." (Hôm nay là Chủ Nhật).',
        hint: 'Hôm nay (Today) là Chủ Nhật (Sunday).'
      },
      {
        id: 'm1-e2-q9',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 9,
        questionPrompt: '5. Hoàn thành câu cảm ơn: "Tha_ _ you very _uch."',
        options: ['nk - m (Thank you very much)', 'ng - m', 'nt - w', 'nd - m'],
        correctAnswer: 'nk - m (Thank you very much)',
        explanation: 'Câu hoàn chỉnh là: "Thank you very much." (Cảm ơn bạn rất nhiều).',
        hint: 'Thank you very much.'
      },
      {
        id: 'm1-e2-q10',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền chữ cái thích hợp vào chỗ trống',
        questionNumber: 10,
        questionPrompt: '6. Hoàn thành câu ngày sinh nhật: "My b_thday is in Fe_ _uary."',
        options: ['ir - br (birthday - February)', 'er - br', 'ar - pr', 'ir - gr'],
        correctAnswer: 'ir - br (birthday - February)',
        explanation: 'Từ hoàn chỉnh là: "birthday" (sinh nhật) và "February" (tháng Hai) ➔ "My birthday is in February."',
        hint: 'Sinh nhật (birthday) vào tháng Hai (February).'
      },

      // Exercise 3: Sắp xếp các câu sau thành đoạn hội thoại hoàn chỉnh
      {
        id: 'm1-e2-q11',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 3: Sắp xếp các câu thành đoạn hội thoại hoàn chỉnh',
        questionNumber: 11,
        questionPrompt: 'Sắp xếp trật tự đúng của đoạn hội thoại làm quen giữa bạn Anna và Tom:',
        options: [
          '1. Hey, Anna. This is my friend, Tom. ➔ 2. Nice to meet you, Tom. Where are you from? ➔ 3. Hi. It’s nice to see you. I’m from England. But I live in Hanoi now. ➔ 4. Oh I’m in Hanoi, too. Are you a pupil? ➔ 5. Yes, I am. I love learning Vietnamese. ➔ 6. Wow! Can you speak Vietnamese? ➔ 7. No, I can’t speak it fluently.',
          '1. Nice to meet you, Tom. ➔ 2. Hey, Anna. ➔ 3. Yes, I am. ➔ 4. No, I can’t.',
          '1. Wow! Can you speak Vietnamese? ➔ 2. No, I can’t. ➔ 3. Hi Tom.',
          '1. Are you a pupil? ➔ 2. Yes, I am. ➔ 3. Hey Anna.'
        ],
        correctAnswer:
          '1. Hey, Anna. This is my friend, Tom. ➔ 2. Nice to meet you, Tom. Where are you from? ➔ 3. Hi. It’s nice to see you. I’m from England. But I live in Hanoi now. ➔ 4. Oh I’m in Hanoi, too. Are you a pupil? ➔ 5. Yes, I am. I love learning Vietnamese. ➔ 6. Wow! Can you speak Vietnamese? ➔ 7. No, I can’t speak it fluently.',
        explanation: 'Trật tự giao tiếp chuẩn: Giới thiệu bạn Tom ➔ Chào hỏi quê quán ➔ Tom trả lời quê ở Anh đang sống ở Hà Nội ➔ Hỏi bạn có phải học sinh không ➔ Tom xác nhận và thích học tiếng Việt ➔ Hỏi khả năng nói tiếng Việt ➔ Tom nói chưa lưu loát.',
        hint: 'Bắt đầu bằng lời giới thiệu: "Hey, Anna. This is my friend, Tom."'
      },

      // Picture visual questions
      {
        id: 'm1-e2-q12',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Dựa vào tranh và hoàn thành câu',
        questionNumber: 12,
        imageEmoji: '🇨🇳',
        questionPrompt: '1. Nhìn lá cờ và điền vào chỗ trống: "He comes from ______________." (Tranh: Lá cờ Trung Quốc màu đỏ 5 sao vàng)',
        options: ['China', 'Vietnam', 'Singapore', 'Australia'],
        correctAnswer: 'China',
        explanation: 'Lá cờ màu đỏ có các ngôi sao vàng là quốc kỳ của nước Trung Quốc (China) ➔ "He comes from China."',
        hint: 'Đất nước láng giềng phía Bắc của Việt Nam.'
      },
      {
        id: 'm1-e2-q13',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Dựa vào tranh và hoàn thành câu',
        questionNumber: 13,
        imageEmoji: '🏊‍♂️',
        questionPrompt: '2. Nhìn tranh và hoàn thành câu: "I cannot ____________." (Tranh: Người đang bơi dưới nước)',
        options: ['swim', 'cook', 'skate', 'dance'],
        correctAnswer: 'swim',
        explanation: 'Bức tranh mô tả hoạt động bơi lội (swim) ➔ "I cannot swim." (Tớ không biết bơi).',
        hint: 'Hoạt động dưới làn nước trong xanh.'
      },
      {
        id: 'm1-e2-q14',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Dựa vào tranh và hoàn thành câu',
        questionNumber: 14,
        imageEmoji: '📅',
        questionPrompt: '3. Nhìn lịch tờ tháng 3 và điền: "My birthday is ___________ March."',
        options: ['in', 'on', 'at', 'to'],
        correctAnswer: 'in',
        explanation: 'Đứng trước tên tháng (không có ngày cụ thể) ta dùng giới từ "in" ➔ "in March" (vào tháng Ba).',
        hint: 'Trước tháng ta dùng giới từ "in".'
      },
      {
        id: 'm1-e2-q15',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Dựa vào tranh và hoàn thành câu',
        questionNumber: 15,
        imageEmoji: '🏫',
        questionPrompt: '4. Nhìn tranh ngôi trường tiểu học: "I go to Quang Trung ____________ school."',
        options: ['primary', 'class', 'pupil', 'teacher'],
        correctAnswer: 'primary',
        explanation: 'Cụm từ "primary school" có nghĩa là trường tiểu học ➔ "Quang Trung primary school".',
        hint: 'Trường tiểu học trong tiếng Anh là gì?'
      },

      // Sentence Reorder
      {
        id: 'm1-e2-q16',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 16,
        questionPrompt: '1. you/ What/ nationality/ are? ➔ Sắp xếp thành câu hỏi quốc tịch đúng:',
        scrambledWords: ['What', 'nationality', 'are', 'you'],
        correctAnswer: 'What nationality are you?',
        explanation: 'Cấu trúc hỏi quốc tịch: What nationality are you? (Bạn mang quốc tịch nước nào?).',
        hint: 'Bắt đầu bằng "What nationality..."'
      },
      {
        id: 'm1-e2-q17',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 17,
        questionPrompt: '2. have/ They/ Tuesday/ Math/ on. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['They', 'have', 'Math', 'on', 'Tuesday'],
        correctAnswer: 'They have Math on Tuesday.',
        explanation: 'Cấu trúc: Chủ ngữ + have + môn học + on + thứ trong tuần. (Họ có môn Toán vào thứ Ba).',
        hint: 'Bắt đầu bằng "They have Math on..."'
      },
      {
        id: 'm1-e2-q18',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 18,
        questionPrompt: '3. play/ She/ cannot/ baseball. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['She', 'cannot', 'play', 'baseball'],
        correctAnswer: 'She cannot play baseball.',
        explanation: 'Cấu trúc phủ định với cannot: S + cannot + V + danh từ thể thao. (Cô ấy không thể chơi bóng chày).',
        hint: 'Bắt đầu bằng "She cannot play..."'
      },
      {
        id: 'm1-e2-q19',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 19,
        questionPrompt: '4. it/ day/ What/ today/ is/? ➔ Sắp xếp thành câu hỏi ngày thứ:',
        scrambledWords: ['What', 'day', 'is', 'it', 'today'],
        correctAnswer: 'What day is it today?',
        explanation: 'Cấu trúc câu hỏi hôm nay là thứ mấy: What day is it today?',
        hint: 'Hỏi hôm nay là thứ mấy.'
      }
    ]
  },

  // =========================================================================
  // 3. ĐỀ KIỂM TRA GIỮA KỲ I SỐ 3
  // =========================================================================
  {
    id: 'midterm1-exam3',
    category: 'midterm_1',
    categoryLabel: 'Giữa Học Kì 1',
    title: 'Đề Kiểm Tra Giữa Kỳ I - Số 3',
    subTitle: 'Thứ tự 12 tháng, Sửa lỗi sai, Trắc nghiệm & Hướng dẫn viết về bản thân',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 18,
    icon: '🗓️',
    themeColor: 'from-amber-600 via-orange-600 to-rose-600',
    questions: [
      // 12 months in order
      {
        id: 'm1-e3-q1',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 1: Thứ tự các tháng trong năm (Months of the year)',
        questionNumber: 1,
        questionPrompt: 'Tháng thứ 2 và tháng thứ 8 trong năm lần lượt là gì?',
        options: ['February và August', 'March và July', 'January và October', 'April và September'],
        correctAnswer: 'February và August',
        explanation: 'Thứ tự chuẩn 12 tháng: 1. January, 2. February, 3. March, 4. April, 5. May, 6. June, 7. July, 8. August, 9. September, 10. October, 11. November, 12. December.',
        hint: 'Tháng 2 có ngày lễ Valentine, tháng 8 mùa thu.'
      },

      // Odd one out
      {
        id: 'm1-e3-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 2: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại: ski, skip, school, skate:',
        options: ['ski', 'skip', 'school', 'skate'],
        correctAnswer: 'school',
        explanation: '"ski" (trượt tuyết), "skip" (nhảy dây), "skate" (trượt patin) đều là hoạt động thể thao/vận động; còn "school" là trường học.',
        hint: 'Từ nào chỉ địa điểm học tập thay vì môn thể thao?'
      },
      {
        id: 'm1-e3-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 2: Chọn từ khác loại',
        questionNumber: 3,
        questionPrompt: 'Chọn từ khác loại: he, her, you, they:',
        options: ['he', 'her', 'you', 'they'],
        correctAnswer: 'her',
        explanation: '"he", "you", "they" là các đại từ nhân xưng đóng vai trò chủ ngữ; còn "her" là tính từ sở hữu (của cô ấy) hoặc tân ngữ.',
        hint: 'Từ nào chỉ sự sở hữu (của cô ấy)?'
      },
      {
        id: 'm1-e3-q4',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 2: Chọn từ khác loại',
        questionNumber: 4,
        questionPrompt: 'Chọn từ khác loại: flag, Malaysia, Singapore, China:',
        options: ['flag', 'Malaysia', 'Singapore', 'China'],
        correctAnswer: 'flag',
        explanation: '"Malaysia", "Singapore", "China" là các quốc gia; còn "flag" là lá cờ.',
        hint: 'Từ nào là đồ vật chứ không phải quốc gia?'
      },
      {
        id: 'm1-e3-q5',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 2: Chọn từ khác loại',
        questionNumber: 5,
        questionPrompt: 'Chọn từ khác loại: nice, name, class, pupil:',
        options: ['nice', 'name', 'class', 'pupil'],
        correctAnswer: 'nice',
        explanation: '"nice" là tính từ (tốt, đẹp, tử tế); còn "name", "class", "pupil" đều là danh từ.',
        hint: 'Từ nào là tính từ miêu tả?'
      },

      // Error correction
      {
        id: 'm1-e3-q6',
        type: 'error_correction',
        exerciseTitle: 'Exercise 3: Gạch chân lỗi sai và sửa lại cho đúng',
        questionNumber: 6,
        questionPrompt: 'Câu sai: "What is your birthday?" ➔ Chọn phương án sửa đúng:',
        options: ['Sửa "What" thành "When"', 'Sửa "is" thành "are"', 'Sửa "your" thành "you"', 'Sửa "birthday" thành "birth"'],
        correctAnswer: 'Sửa "What" thành "When"',
        explanation: 'Hỏi về thời gian sinh nhật ta phải dùng từ để hỏi "When" (khi nào) chứ không dùng "What": ➔ "When is your birthday?".',
        hint: 'Hỏi về thời điểm, ngày tháng thì dùng từ để hỏi nào?'
      },
      {
        id: 'm1-e3-q7',
        type: 'error_correction',
        exerciseTitle: 'Exercise 3: Gạch chân lỗi sai và sửa lại cho đúng',
        questionNumber: 7,
        questionPrompt: 'Câu sai: "What is she name?" ➔ Chọn phương án sửa đúng:',
        options: ['Sửa "she" thành "her"', 'Sửa "is" thành "are"', 'Sửa "What" thành "Who"', 'Sửa "name" thành "names"'],
        correctAnswer: 'Sửa "she" thành "her"',
        explanation: 'Trước danh từ "name" phải dùng tính từ sở hữu "her" (của cô ấy), không dùng đại từ chủ ngữ "she": ➔ "What is her name?".',
        hint: 'Tên của cô ấy ➔ "her name".'
      },
      {
        id: 'm1-e3-q8',
        type: 'error_correction',
        exerciseTitle: 'Exercise 3: Gạch chân lỗi sai và sửa lại cho đúng',
        questionNumber: 8,
        questionPrompt: 'Câu sai: "I don’t go to school at Sunday." ➔ Chọn phương án sửa đúng:',
        options: ['Sửa "at" thành "on"', 'Sửa "don\'t" thành "doesn\'t"', 'Sửa "to" thành "in"', 'Sửa "Sunday" thành "Sundays"'],
        correctAnswer: 'Sửa "at" thành "on"',
        explanation: 'Quy tắc giới từ: Đi với thứ trong tuần ta phải dùng giới từ "on" (on Sunday), không dùng "at".',
        hint: 'Đi trước thứ trong tuần dùng "on".'
      },
      {
        id: 'm1-e3-q9',
        type: 'error_correction',
        exerciseTitle: 'Exercise 3: Gạch chân lỗi sai và sửa lại cho đúng',
        questionNumber: 9,
        questionPrompt: 'Câu sai: "Tom have an Art class today." ➔ Chọn phương án sửa đúng:',
        options: ['Sửa "have" thành "has"', 'Sửa "an" thành "a"', 'Sửa "class" thành "classes"', 'Sửa "today" thành "now"'],
        correctAnswer: 'Sửa "have" thành "has"',
        explanation: '"Tom" là chủ ngữ ngôi thứ 3 số ít, động từ "have" phải chia thành "has".',
        hint: 'Chủ ngữ là 1 người (Tom) thì động từ chia như thế nào?'
      },

      // Multiple Choice
      {
        id: 'm1-e3-q10',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Chọn đáp án đúng',
        questionNumber: 10,
        questionPrompt: 'Where are you from, Tom? – __________ from America.',
        options: ['I am', 'My name', 'You are', 'Her name'],
        correctAnswer: 'I am',
        explanation: 'Câu hỏi "Where are you from?" (Bạn đến từ đâu?) trả lời ngôi thứ nhất: "I am from America." (Tớ đến từ nước Mỹ).',
        hint: 'Người ta hỏi "you" thì mình trả lời là "I am...".'
      },
      {
        id: 'm1-e3-q11',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Chọn đáp án đúng',
        questionNumber: 11,
        questionPrompt: '________ is the date today? – It’s the 5th of October.',
        options: ['What', 'Where', 'When', 'How'],
        correctAnswer: 'What',
        explanation: 'Cấu trúc hỏi ngày tháng: "What is the date today?" (Hôm nay là ngày mấy tháng mấy?).',
        hint: 'Cấu trúc: What is the date today?'
      },
      {
        id: 'm1-e3-q12',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 4: Chọn đáp án đúng',
        questionNumber: 12,
        questionPrompt: 'My birthday is on the __________________ of October.',
        options: ['fifth', 'Thursday', 'two', 'ten'],
        correctAnswer: 'fifth',
        explanation: 'Đứng sau "on the ... of [tháng]" ta dùng số thứ tự chỉ ngày trong tháng: "the fifth of October" (ngày mùng năm tháng Mười).',
        hint: 'Chỉ ngày trong tháng ta dùng số thứ tự (fifth).'
      }
    ]
  },

  // =========================================================================
  // 4. ĐỀ KIỂM TRA GIỮA KỲ I SỐ 4
  // =========================================================================
  {
    id: 'midterm1-exam4',
    category: 'midterm_1',
    categoryLabel: 'Giữa Học Kì 1',
    title: 'Đề Kiểm Tra Giữa Kỳ I - Số 4',
    subTitle: 'Đọc hiểu bạn Akio (True/False 10 câu), Hội thoại thả diều & Sắp xếp',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 20,
    icon: '🚀',
    themeColor: 'from-purple-600 via-pink-600 to-rose-600',
    questions: [
      {
        id: 'm1-e4-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại',
        questionNumber: 1,
        questionPrompt: 'Chọn từ khác loại: fifth, eight, eleven, one:',
        options: ['fifth', 'eight', 'eleven', 'one'],
        correctAnswer: 'fifth',
        explanation: '"fifth" là số thứ tự (thứ năm / ngày mùng 5), trong khi "eight" (8), "eleven" (11), "one" (1) đều là số đếm.',
        hint: 'Từ nào có đuôi -th là số thứ tự?'
      },
      {
        id: 'm1-e4-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại: November, Sunday, Friday, Monday:',
        options: ['November', 'Sunday', 'Friday', 'Monday'],
        correctAnswer: 'November',
        explanation: '"November" là tháng 11; các từ còn lại là các thứ trong tuần (Chủ nhật, thứ Sáu, thứ Hai).',
        hint: 'Từ nào là tên tháng?'
      },
      {
        id: 'm1-e4-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại',
        questionNumber: 3,
        questionPrompt: 'Chọn từ khác loại: write, kite, fly, listen:',
        options: ['write', 'kite', 'fly', 'listen'],
        correctAnswer: 'kite',
        explanation: '"kite" là danh từ (con diều); còn "write" (viết), "fly" (bay/thả), "listen" (nghe) là động từ.',
        hint: 'Từ nào là đồ vật chứ không phải hành động?'
      },
      {
        id: 'm1-e4-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Chọn đáp án đúng',
        questionNumber: 4,
        questionPrompt: '– What can you do? – I can _____________.',
        options: ['skip', 'swimming', 'to play badminton', 'cooking'],
        correctAnswer: 'skip',
        explanation: 'Sau "can" dùng động từ nguyên mẫu không chia: "I can skip." (Tớ có thể nhảy dây).',
        hint: 'Sau "can" động từ giữ nguyên mẫu.'
      },
      {
        id: 'm1-e4-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Chọn đáp án đúng',
        questionNumber: 5,
        questionPrompt: '– What are they doing? – They _____________.',
        options: ['are writing a dictation', 'is writing a dictation', 'write a dictation', 'to write a dictation'],
        correctAnswer: 'are writing a dictation',
        explanation: 'Thì hiện tại tiếp diễn với chủ ngữ "They" đi với to be "are": "They are writing a dictation." (Họ đang viết bài chính tả).',
        hint: 'Chủ ngữ "They" đi với to be "are" và V-ing.'
      },
      {
        id: 'm1-e4-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Chọn đáp án đúng',
        questionNumber: 6,
        questionPrompt: '– Thank you so much. – ________________.',
        options: ['You’re welcome.', 'Not much.', 'No thanks.', 'Yes, please.'],
        correctAnswer: 'You’re welcome.',
        explanation: 'Đáp lại lời cảm ơn "Thank you so much" một cách lịch sự chuẩn mực là "You\'re welcome." (Không có gì đâu).',
        hint: 'Lời đáp lại lịch sự khi người khác cảm ơn mình.'
      },

      // Reading True/False: Akio passage
      {
        id: 'm1-e4-q7',
        type: 'reading',
        exerciseTitle: 'Exercise 4: Đọc đoạn văn và chọn True (Đúng) hoặc False (Sai)',
        questionNumber: 7,
        readingPassage:
          'Hello, my name is Akio. I am from Japan. I’m Japanese. I speak Japanese and English. My school is an international school. It is Rose International School. I have got a lot of friends. There are twenty students in my class. They are from different countries. Linda is from England. She is English. Jack and Jill are from the USA. They are American. Meimei is from Malaysia. She is Malaysian. Alex is from Australia. We often play badminton, play hide-and-seek together. It is a lot of fun.',
        questionPrompt: '1. She is Akio.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'True (Đúng)',
        explanation: 'Trong bài có câu: "Hello, my name is Akio." ➔ Đúng (True).',
        hint: 'Xem câu mở đầu của đoạn văn.'
      },
      {
        id: 'm1-e4-q8',
        type: 'reading',
        exerciseTitle: 'Exercise 4: Đọc đoạn văn và chọn True (Đúng) hoặc False (Sai)',
        questionNumber: 8,
        readingPassage:
          'Hello, my name is Akio. I am from Japan. I’m Japanese. I speak Japanese and English. My school is an international school. It is Rose International School. I have got a lot of friends. There are twenty students in my class. They are from different countries. Linda is from England. She is English. Jack and Jill are from the USA. They are American. Meimei is from Malaysia. She is Malaysian. Alex is from Australia. We often play badminton, play hide-and-seek together. It is a lot of fun.',
        questionPrompt: '2. She is Vietnamese.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'False (Sai)',
        explanation: 'Trong bài bạn nói: "I am from Japan. I\'m Japanese." ➔ Câu nói bạn là người Việt Nam là SAI (False).',
        hint: 'Bạn Akio đến từ Japan và là người Japanese.'
      },
      {
        id: 'm1-e4-q9',
        type: 'reading',
        exerciseTitle: 'Exercise 4: Đọc đoạn văn và chọn True (Đúng) hoặc False (Sai)',
        questionNumber: 9,
        readingPassage:
          'Hello, my name is Akio. I am from Japan. I’m Japanese. I speak Japanese and English. My school is an international school. It is Rose International School. I have got a lot of friends. There are twenty students in my class. They are from different countries. Linda is from England. She is English. Jack and Jill are from the USA. They are American. Meimei is from Malaysia. She is Malaysian. Alex is from Australia. We often play badminton, play hide-and-seek together. It is a lot of fun.',
        questionPrompt: '4. Her class has got twelve students.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'False (Sai)',
        explanation: 'Trong bài nói: "There are twenty students in my class." (Có 20 học sinh, không phải 12 (twelve)) ➔ SAI (False).',
        hint: 'Trong lớp có twenty (20) học sinh.'
      },
      {
        id: 'm1-e4-q10',
        type: 'reading',
        exerciseTitle: 'Exercise 4: Đọc đoạn văn và chọn True (Đúng) hoặc False (Sai)',
        questionNumber: 10,
        readingPassage:
          'Hello, my name is Akio. I am from Japan. I’m Japanese. I speak Japanese and English. My school is an international school. It is Rose International School. I have got a lot of friends. There are twenty students in my class. They are from different countries. Linda is from England. She is English. Jack and Jill are from the USA. They are American. Meimei is from Malaysia. She is Malaysian. Alex is from Australia. We often play badminton, play hide-and-seek together. It is a lot of fun.',
        questionPrompt: '6. Jack is from America.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'True (Đúng)',
        explanation: 'Trong bài có câu: "Jack and Jill are from the USA. They are American." ➔ ĐÚNG (True).',
        hint: 'Jack đến từ USA (America).'
      },

      // Reorder
      {
        id: 'm1-e4-q11',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 11,
        questionPrompt: 'Sắp xếp thành câu hỏi tuổi:',
        scrambledWords: ['How', 'old', 'is', 'she'],
        correctAnswer: 'How old is she?',
        explanation: 'Cấu trúc hỏi tuổi: How old + is/are + S? ➔ "How old is she?" (Cô ấy bao nhiêu tuổi?).',
        hint: 'Bắt đầu bằng "How old is..."'
      },
      {
        id: 'm1-e4-q12',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 12,
        questionPrompt: 'Sắp xếp thành câu đúng:',
        scrambledWords: ['There', 'are', '5 people', 'in my', 'family'],
        correctAnswer: 'There are 5 people in my family.',
        explanation: 'Cấu trúc: There are + số lượng người + in my family. (Có 5 người trong gia đình tớ).',
        hint: 'Bắt đầu bằng "There are 5 people..."'
      }
    ]
  },

  // =========================================================================
  // 5. ĐỀ THI HỌC KỲ I LỚP 4 SỐ 1
  // =========================================================================
  {
    id: 'term1-exam1',
    category: 'term_1',
    categoryLabel: 'Cuối Học Kì 1',
    title: 'Đề Thi Học Kỳ I Lớp 4 - Số 1',
    subTitle: 'Đề thi chính thức Học kì 1: Phát âm, Nối cột A-B, Đọc hiểu Mary & Sắp xếp câu',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 20,
    icon: '🏆',
    themeColor: 'from-blue-700 via-indigo-700 to-violet-800',
    questions: [
      {
        id: 't1-e1-q1',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 1,
        questionPrompt: 'Phát âm của đuôi "-ay": birthday, play, Japanese, today:',
        options: ['birthday (/eɪ/)', 'play (/eɪ/)', 'Japanese (/iː/)', 'today (/eɪ/)'],
        correctAnswer: 'Japanese (/iː/)',
        explanation: '"Japanese" có đuôi "-ese" phát âm là /iːz/, trong khi "birthday", "play", "today" có âm /eɪ/.',
        hint: 'Từ nào không chứa vần "ay" /eɪ/?'
      },
      {
        id: 't1-e1-q2',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 2,
        questionPrompt: 'Phát âm của nguyên âm "i": thin, slim, music, five:',
        options: ['thin (/ɪ/)', 'slim (/ɪ/)', 'music (/ɪ/)', 'five (/aɪ/)'],
        correctAnswer: 'five (/aɪ/)',
        explanation: '"five" có âm /aɪ/, còn "thin", "slim", "music" đều có âm /ɪ/ ngắn.',
        hint: '"five" phát âm là /faɪv/.'
      },
      {
        id: 't1-e1-q3',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 3,
        questionPrompt: 'What ___________ your nationality?',
        options: ['is', 'are', 'be', 'was'],
        correctAnswer: 'is',
        explanation: 'Danh từ số ít "your nationality" đi với to be "is": "What is your nationality?" (Quốc tịch của bạn là gì?).',
        hint: '"your nationality" là danh từ số ít.'
      },
      {
        id: 't1-e1-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 4,
        questionPrompt: '– ___________ his mother a dentist? – Yes, she is.',
        options: ['Is', 'Does', 'Will', 'Can'],
        correctAnswer: 'Is',
        explanation: 'Câu trả lời là "Yes, she is" với to be "is" nên câu hỏi phải bắt đầu bằng to be "Is": "Is his mother a dentist?".',
        hint: 'Nhìn vào câu trả lời "Yes, she is" để chọn từ hỏi.'
      },
      {
        id: 't1-e1-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 5,
        questionPrompt: 'What day is ___________ today?',
        options: ['it', 'they', 'he', 'you'],
        correctAnswer: 'it',
        explanation: 'Cấu trúc hỏi thứ trong ngày: What day is it today? (Hôm nay là thứ mấy?).',
        hint: 'Chủ ngữ giả "it" đi trong câu hỏi ngày giờ.'
      },
      {
        id: 't1-e1-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 6,
        questionPrompt: 'My school is ___________ Nguyen Hoang street.',
        options: ['in', 'to', 'with', 'of'],
        correctAnswer: 'in',
        explanation: 'Trước tên đường phố ta dùng giới từ "in" (in Nguyen Hoang street) trong chương trình SGK Tiếng Anh lớp 4.',
        hint: 'Ở trên đường phố nào ta dùng giới từ "in".'
      },

      // Reading Mary
      {
        id: 't1-e1-q7',
        type: 'reading',
        exerciseTitle: 'Question 4: Đọc đoạn văn và viết T (True) hoặc F (False)',
        questionNumber: 7,
        readingPassage:
          'Hi. My name is Mary. I’m twelve years old. I’m a pupil. I live in a beautiful area in a big city. Every morning I get up at 5:30 o’ clock. After that, I dress up at 6. I have breakfast in ten minutes and go to school at half past six. My school is near my house so I often go to school on foot. I love English so much. I can read English books and sing some English songs.',
        questionPrompt: '1. Mary is 12 years old.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'True (Đúng)',
        explanation: 'Trong bài có câu: "I’m twelve years old." (twelve = 12) ➔ ĐÚNG (True).',
        hint: 'twelve = 12 tuổi.'
      },
      {
        id: 't1-e1-q8',
        type: 'reading',
        exerciseTitle: 'Question 4: Đọc đoạn văn và viết T (True) hoặc F (False)',
        questionNumber: 8,
        readingPassage:
          'Hi. My name is Mary. I’m twelve years old. I’m a pupil. I live in a beautiful area in a big city. Every morning I get up at 5:30 o’ clock. After that, I dress up at 6. I have breakfast in ten minutes and go to school at half past six. My school is near my house so I often go to school on foot. I love English so much. I can read English books and sing some English songs.',
        questionPrompt: '2. She gets up at half past six.',
        options: ['True (Đúng)', 'False (Sai)'],
        correctAnswer: 'False (Sai)',
        explanation: 'Trong bài nói: "Every morning I get up at 5:30 o’ clock." (5:30, không phải 6:30) ➔ SAI (False).',
        hint: 'Mary thức dậy lúc 5:30 sáng.'
      },
      {
        id: 't1-e1-q9',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ thành câu hoàn chỉnh',
        questionNumber: 9,
        questionPrompt: 'Sắp xếp thành câu đúng:',
        scrambledWords: ['I', 'am', 'very', 'well', 'thank', 'you'],
        correctAnswer: 'I am very well thank you.',
        explanation: 'Câu trả lời sức khỏe: "I am very well, thank you." (Tớ rất khỏe, cảm ơn bạn).',
        hint: 'Bắt đầu bằng "I am very well..."'
      },
      {
        id: 't1-e1-q10',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ thành câu hoàn chỉnh',
        questionNumber: 10,
        questionPrompt: 'Sắp xếp thành câu đúng:',
        scrambledWords: ['Sandy', 'is', 'in', 'the', 'classroom', 'now'],
        correctAnswer: 'Sandy is in the classroom now.',
        explanation: 'Cấu trúc: Sandy is in the classroom now. (Sandy đang ở trong lớp học bây giờ).',
        hint: 'Bắt đầu bằng "Sandy is in the classroom..."'
      }
    ]
  },

  // =========================================================================
  // 6. ĐỀ THI HỌC KỲ I LỚP 4 SỐ 2
  // =========================================================================
  {
    id: 'term1-exam2',
    category: 'term_1',
    categoryLabel: 'Cuối Học Kì 1',
    title: 'Đề Thi Học Kỳ I Lớp 4 - Số 2',
    subTitle: 'Đọc hiểu Alex ở London (YES/NO), Đoán từ qua tranh đảo chữ (APION ➔ PIANO)',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 18,
    icon: '🎹',
    themeColor: 'from-teal-600 via-emerald-600 to-green-700',
    questions: [
      {
        id: 't1-e2-q1',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 1,
        questionPrompt: 'Phát âm của nguyên âm "i": Friday, fine, listen, light:',
        options: ['Friday (/aɪ/)', 'fine (/aɪ/)', 'listen (/ɪ/)', 'light (/aɪ/)'],
        correctAnswer: 'listen (/ɪ/)',
        explanation: '"listen" có âm /ɪ/ ngắn (chữ t câm), còn "Friday", "fine", "light" đều có âm /aɪ/.',
        hint: '"listen" phát âm là /ˈlɪs.ən/.'
      },
      {
        id: 't1-e2-q2',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 2,
        questionPrompt: 'Tony is from Australia. He is ....................................',
        options: ['Australian', 'Australia', 'Australias', 'Australist'],
        correctAnswer: 'Australian',
        explanation: 'Người đến từ Australia (nước Úc) mang quốc tịch Úc là "Australian".',
        hint: 'Quốc tịch Úc kết thúc bằng đuôi -an.'
      },
      {
        id: 't1-e2-q3',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 3,
        questionPrompt: 'Hakim is from Malaysia. .................................... nationality is Malaysian.',
        options: ['His', 'your', 'our', 'her'],
        correctAnswer: 'His',
        explanation: 'Hakim là bạn nam nên ta dùng tính từ sở hữu "His" (của cậu ấy) ➔ "His nationality is Malaysian."',
        hint: 'Hakim là bạn nam, dùng tính từ sở hữu nào?'
      },
      {
        id: 't1-e2-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 4,
        questionPrompt: 'What do you do ……….. Fridays? – I go to school in the morning.',
        options: ['on', 'in', 'at', 'from'],
        correctAnswer: 'on',
        explanation: 'Trước các thứ trong tuần ta dùng giới từ "on" ➔ "on Fridays" (vào các ngày thứ Sáu).',
        hint: 'Trước thứ trong tuần dùng giới từ gì?'
      },
      {
        id: 't1-e2-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 5,
        questionPrompt: 'Where ……….. you yesterday?',
        options: ['were', 'was', 'is', 'are'],
        correctAnswer: 'were',
        explanation: 'Thì quá khứ đơn với "yesterday", chủ ngữ "you" đi với to be "were" ➔ "Where were you yesterday?".',
        hint: '"you" ở quá khứ đi với to be 4 chữ.'
      },
      {
        id: 't1-e2-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 6,
        questionPrompt: 'I live ………………. Phu Quoc Island.',
        options: ['on', 'in', 'to', 'at'],
        correctAnswer: 'on',
        explanation: 'Trên đảo (Island) ta dùng giới từ "on" ➔ "on Phu Quoc Island" (ở trên đảo Phú Quốc).',
        hint: 'Ở trên một hòn đảo ta dùng giới từ "on".'
      },

      // Unscramble words by picture
      {
        id: 't1-e2-q7',
        type: 'unscramble_word',
        exerciseTitle: 'Question 5: Sắp xếp các chữ cái để tạo thành từ đúng dựa vào tranh',
        questionNumber: 7,
        imageEmoji: '🎹',
        wordToUnscramble: 'APION',
        questionPrompt: 'Nhìn tranh cây đàn dương cầm: Sắp xếp các chữ cái "APION" thành từ đúng:',
        options: ['PIANO', 'PAINO', 'POANI', 'PIONA'],
        correctAnswer: 'PIANO',
        explanation: 'Cây đàn dương cầm trong tiếng Anh là "PIANO" (P-I-A-N-O).',
        hint: 'Đàn pi-a-nô.'
      },
      {
        id: 't1-e2-q8',
        type: 'unscramble_word',
        exerciseTitle: 'Question 5: Sắp xếp các chữ cái để tạo thành từ đúng dựa vào tranh',
        questionNumber: 8,
        imageEmoji: '🌸',
        wordToUnscramble: 'WREFLO',
        questionPrompt: 'Nhìn tranh bông hoa xinh xắn: Sắp xếp các chữ cái "WREFLO" thành từ đúng:',
        options: ['FLOWER', 'FROWEL', 'FLOWRE', 'FOWLER'],
        correctAnswer: 'FLOWER',
        explanation: 'Bông hoa trong tiếng Anh là "FLOWER" (F-L-O-W-E-R).',
        hint: 'Bông hoa ngát hương.'
      },
      {
        id: 't1-e2-q9',
        type: 'unscramble_word',
        exerciseTitle: 'Question 5: Sắp xếp các chữ cái để tạo thành từ đúng dựa vào tranh',
        questionNumber: 9,
        imageEmoji: '🎵',
        wordToUnscramble: 'UMSCI',
        questionPrompt: 'Nhìn tranh quyển sách Âm nhạc lớp 4: Sắp xếp các chữ cái "UMSCI" thành từ đúng:',
        options: ['MUSIC', 'MUCIS', 'MUSCI', 'MCUIS'],
        correctAnswer: 'MUSIC',
        explanation: 'Môn Âm nhạc trong tiếng Anh là "MUSIC" (M-U-S-I-C).',
        hint: 'Môn Âm nhạc.'
      },
      {
        id: 't1-e2-q10',
        type: 'unscramble_word',
        exerciseTitle: 'Question 5: Sắp xếp các chữ cái để tạo thành từ đúng dựa vào tranh',
        questionNumber: 10,
        imageEmoji: '🎾',
        wordToUnscramble: 'NTENSI',
        questionPrompt: 'Nhìn tranh bạn nhỏ đang đánh quần vợt: Sắp xếp các chữ cái "NTENSI" thành từ đúng:',
        options: ['TENNIS', 'TENINS', 'TENSIN', 'TINNIS'],
        correctAnswer: 'TENNIS',
        explanation: 'Môn quần vợt trong tiếng Anh là "TENNIS" (T-E-N-N-I-S).',
        hint: 'Môn thể thao quần vợt có quả bóng màu xanh vàng.'
      }
    ]
  },
  // =========================================================================
  // ĐỀ THI HỌC KỲ I LỚP 4 SỐ 3 (Đề số 3 Cuối Kì 1)
  // =========================================================================
  {
    id: 'term1-exam3',
    category: 'term_1',
    categoryLabel: 'Cuối Học Kì 1',
    title: 'Đề Thi Học Kỳ I Lớp 4 - Số 3',
    subTitle: 'Phát âm (/ɪ/ vs /aɪ/), Đọc điền đoạn văn người mẹ, Tranh vẽ ngôi trường & cờ Mỹ',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 22,
    icon: '🏫',
    themeColor: 'from-blue-600 via-indigo-600 to-sky-700',
    questions: [
      // Question 1: Chọn từ có cách phát âm khác với các từ còn lại
      {
        id: 't1-e3-q1',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 1,
        questionPrompt: '1. Chọn từ có phần gạch chân phát âm khác: music, district, city, fire',
        options: ['music (/ɪ/)', 'district (/ɪ/)', 'city (/ɪ/)', 'fire (/aɪ/)'],
        correctAnswer: 'fire (/aɪ/)',
        explanation: 'Từ "fire" phát âm nguyên âm đôi là /aɪ/ (/faɪər/). Các từ "music", "district", "city" đều phát âm là nguyên âm ngắn /ɪ/.',
        hint: 'Chú ý chữ "i" trong từ "fire" phát âm là /aɪ/.'
      },
      {
        id: 't1-e3-q2',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 2,
        questionPrompt: '2. Chọn từ có phần gạch chân phát âm khác: walk, class, glasses, badminton',
        options: ['walk (/ɔː/)', 'class (/ɑː/)', 'glasses (/ɑː/)', 'badminton (/æ/)'],
        correctAnswer: 'walk (/ɔː/)',
        explanation: '"walk" phát âm là /wɔːk/ (âm /ɔː/ dài và chữ l câm). Các từ còn lại: "class" (/klɑːs/), "glasses" (/ˈɡlɑː.sɪz/).',
        hint: '"walk" có chữ l câm và phát âm là /wɔːk/.'
      },
      {
        id: 't1-e3-q3',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 3,
        questionPrompt: '3. Chọn từ có phần gạch chân phát âm khác: student, study, much, umbrella',
        options: ['student (/juː/)', 'study (/ʌ/)', 'much (/ʌ/)', 'umbrella (/ʌ/)'],
        correctAnswer: 'student (/juː/)',
        explanation: '"student" phát âm là /ˈstjuː.dənt/ (chữ u phát âm là /juː/). Trong khi "study" (/ˈstʌd.i/), "much" (/mʌtʃ/), "umbrella" (/ʌmˈbrel.ə/) đều phát âm là /ʌ/.',
        hint: '"student" có âm /juː/.'
      },
      {
        id: 't1-e3-q4',
        type: 'pronunciation',
        exerciseTitle: 'Question 1: Chọn từ có cách phát âm khác với các từ còn lại',
        questionNumber: 4,
        questionPrompt: '4. Chọn từ có phần gạch chân phát âm khác: name, same, game, lamp',
        options: ['name (/eɪ/)', 'same (/eɪ/)', 'game (/eɪ/)', 'lamp (/æ/)'],
        correctAnswer: 'lamp (/æ/)',
        explanation: '"lamp" phát âm là /læmp/ (nguyên âm /æ/). Các từ "name", "same", "game" đều có vần "ame" phát âm là /eɪm/.',
        hint: '"lamp" là cái đèn ngủ phát âm âm /æ/.'
      },

      // Question 2: Chọn đáp án đúng
      {
        id: 't1-e3-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 5,
        questionPrompt: '1. Sandra likes _________________ to music.',
        options: ['listening', 'listen', 'to listen', 'listens'],
        correctAnswer: 'listening',
        explanation: 'Cấu trúc diễn tả sở thích: like + V-ing ➔ "Sandra likes listening to music." (Sandra thích nghe nhạc).',
        hint: 'Sau động từ like dùng V-ing.'
      },
      {
        id: 't1-e3-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 6,
        questionPrompt: '2. He can play football _________________ he can’t play table tennis.',
        options: ['because', 'and', 'but', 'when'],
        correctAnswer: 'but',
        explanation: 'Hai vế câu mang ý nghĩa tương phản đối lập (biết đá bóng nhưng không biết chơi bóng bàn) nên dùng liên từ "but" (nhưng).',
        hint: 'Liên từ mang nghĩa "nhưng".'
      },
      {
        id: 't1-e3-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 7,
        questionPrompt: '3. Where is she _________________? – She’s from Japan.',
        options: ['in', 'from', 'at', 'on'],
        correctAnswer: 'from',
        explanation: 'Cấu trúc hỏi xuất thân, quê hương: "Where is she from?" (Cô ấy đến từ đâu?).',
        hint: 'Câu trả lời có "She\x27s from Japan".'
      },
      {
        id: 't1-e3-q8',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 8,
        questionPrompt: '4. Where _________________ you yesterday?',
        options: ['is', 'are', 'was', 'were'],
        correctAnswer: 'were',
        explanation: 'Trạng từ thời gian "yesterday" chỉ quá khứ. Chủ ngữ "you" đi với to be quá khứ là "were".',
        hint: '"you" đi với to be số nhiều ở quá khứ: were.'
      },
      {
        id: 't1-e3-q9',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 9,
        questionPrompt: '5. What _________________ does Mai have today? – She has Math, Music, Science and English.',
        options: ['class', 'subjects', 'time', 'nationality'],
        correctAnswer: 'subjects',
        explanation: 'Câu trả lời liệt kê các môn học (Math, Music, Science, English) ➔ Câu hỏi hỏi về môn học: "What subjects does Mai have today?".',
        hint: '"subjects" nghĩa là các môn học.'
      },
      {
        id: 't1-e3-q10',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Chọn đáp án đúng',
        questionNumber: 10,
        questionPrompt: '6. _________________ day is it today? – It’s Monday.',
        options: ['Why', 'What', 'When', 'How'],
        correctAnswer: 'What',
        explanation: 'Cấu trúc hỏi thứ trong tuần: "What day is it today?" (Hôm nay là thứ mấy?).',
        hint: 'Câu hỏi quen thuộc trong Unit 3 SGK Tiếng Anh 4.'
      },

      // Question 3: Đọc đoạn văn và chọn đáp án đúng điền vào chỗ trống
      {
        id: 't1-e3-q11',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và chọn đáp án đúng điền vào chỗ trống',
        questionNumber: 11,
        readingPassage: 'This is my mother. (1)_________ name is Hien. She is a teacher. She gets up at 5:30 in the morning. She has (2)_________ at 6 o’clock. She goes to work at 6:30. She works in a school from 7 o’clock a. m. (3)_________ 10:30 a.m. She arrives home at 11:00 a.m. She has lunch at 11:30. In the evening she has dinner and she (4)_________ to bed at 11 p.m.',
        questionPrompt: '1. Chọn từ thích hợp điền vào vị trí (1): "This is my mother. (1)_________ name is Hien."',
        options: ['his', 'your', 'her', 'their'],
        correctAnswer: 'her',
        explanation: 'Người mẹ là phái nữ (mother) nên tính từ sở hữu là "her" ➔ "Her name is Hien" (Tên của bà ấy là Hiền).',
        hint: 'Tính từ sở hữu chỉ người nữ là "her".'
      },
      {
        id: 't1-e3-q12',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và chọn đáp án đúng điền vào chỗ trống',
        questionNumber: 12,
        readingPassage: 'This is my mother. (1)_________ name is Hien. She is a teacher. She gets up at 5:30 in the morning. She has (2)_________ at 6 o’clock. She goes to work at 6:30. She works in a school from 7 o’clock a. m. (3)_________ 10:30 a.m. She arrives home at 11:00 a.m. She has lunch at 11:30. In the evening she has dinner and she (4)_________ to bed at 11 p.m.',
        questionPrompt: '2. Chọn từ thích hợp điền vào vị trí (2): "She has (2)_________ at 6 o’clock in the morning."',
        options: ['breakfast', 'class', 'dinner', 'lunch'],
        correctAnswer: 'breakfast',
        explanation: 'Vào lúc 6 giờ sáng sau khi thức dậy lúc 5:30, mẹ ăn bữa sáng ("has breakfast").',
        hint: 'Bữa sáng trong tiếng Anh là breakfast.'
      },
      {
        id: 't1-e3-q13',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và chọn đáp án đúng điền vào chỗ trống',
        questionNumber: 13,
        readingPassage: 'This is my mother. (1)_________ name is Hien. She is a teacher. She gets up at 5:30 in the morning. She has (2)_________ at 6 o’clock. She goes to work at 6:30. She works in a school from 7 o’clock a. m. (3)_________ 10:30 a.m. She arrives home at 11:00 a.m. She has lunch at 11:30. In the evening she has dinner and she (4)_________ to bed at 11 p.m.',
        questionPrompt: '3. Chọn từ thích hợp điền vào vị trí (3): "She works in a school from 7 o’clock a.m. (3)_________ 10:30 a.m."',
        options: ['at', 'of', 'with', 'to'],
        correctAnswer: 'to',
        explanation: 'Cấu trúc khoảng thời gian: "from ... to ..." (từ mấy giờ đến mấy giờ) ➔ "from 7 o\x27clock to 10:30 a.m".',
        hint: 'Đi kèm với "from" là giới từ "to".'
      },
      {
        id: 't1-e3-q14',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và chọn đáp án đúng điền vào chỗ trống',
        questionNumber: 14,
        readingPassage: 'This is my mother. (1)_________ name is Hien. She is a teacher. She gets up at 5:30 in the morning. She has (2)_________ at 6 o’clock. She goes to work at 6:30. She works in a school from 7 o’clock a. m. (3)_________ 10:30 a.m. She arrives home at 11:00 a.m. She has lunch at 11:30. In the evening she has dinner and she (4)_________ to bed at 11 p.m.',
        questionPrompt: '4. Chọn từ thích hợp điền vào vị trí (4): "In the evening she has dinner and she (4)_________ to bed at 11 p.m."',
        options: ['tells', 'plays', 'goes', 'looks'],
        correctAnswer: 'goes',
        explanation: 'Cụm từ đi ngủ: "go to bed". Chủ ngữ "she" số ít nên chia động từ là "goes" ➔ "goes to bed".',
        hint: 'Cụm từ đi ngủ là "goes to bed".'
      },

      // Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh
      {
        id: 't1-e3-q15',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 15,
        questionPrompt: '1. subjects / today? / do / have / What / you ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['What', 'subjects', 'do', 'you', 'have', 'today'],
        correctAnswer: 'What subjects do you have today?',
        explanation: 'Cấu trúc hỏi thời khóa biểu: What subjects do you have today? (Hôm nay bạn có những môn học gì?).',
        hint: 'Bắt đầu bằng cụm "What subjects..."'
      },
      {
        id: 't1-e3-q16',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 16,
        questionPrompt: '2. Nice / to / again. / you / see ➔ Sắp xếp thành câu chào đúng:',
        scrambledWords: ['Nice', 'to', 'see', 'you', 'again'],
        correctAnswer: 'Nice to see you again.',
        explanation: 'Cấu trúc câu chào gặp lại: Nice to see you again. (Rất vui được gặp lại bạn).',
        hint: 'Bắt đầu bằng từ "Nice to..."'
      },
      {
        id: 't1-e3-q17',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 17,
        questionPrompt: '3. class / in? / they / are / What ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['What', 'class', 'are', 'they', 'in'],
        correctAnswer: 'What class are they in?',
        explanation: 'Cấu trúc hỏi họ học lớp nào: What class are they in? (Họ học lớp nào?).',
        hint: 'Bắt đầu bằng "What class are..."'
      },
      {
        id: 't1-e3-q18',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 18,
        questionPrompt: '4. did / yesterday? / they / do / What ➔ Sắp xếp thành câu hỏi quá khứ đúng:',
        scrambledWords: ['What', 'did', 'they', 'do', 'yesterday'],
        correctAnswer: 'What did they do yesterday?',
        explanation: 'Cấu trúc hỏi quá khứ đơn: What did they do yesterday? (Hôm qua họ đã làm gì?).',
        hint: 'Bắt đầu bằng "What did they..."'
      },

      // Question 5: Dựa vào tranh hoàn thành các câu sau
      {
        id: 't1-e3-q19',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 19,
        imageEmoji: '🏫',
        questionPrompt: '1. Nhìn tranh tòa nhà trường học nhiều học sinh vui chơi: "This is my _________________. It’s big."',
        options: ['school', 'classroom', 'house', 'garden'],
        correctAnswer: 'school',
        explanation: 'Bức tranh vẽ toàn cảnh ngôi trường tiểu học khang trang với sân chơi ➔ "This is my school. It\x27s big." (Đây là trường học của tớ. Nó rất lớn).',
        hint: 'Ngôi trường học trong tiếng Anh là "school".'
      },
      {
        id: 't1-e3-q20',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 20,
        imageEmoji: '🎂',
        questionPrompt: '2. Nhìn tranh chiếc bánh sinh nhật cắm nến và bong bóng hỏi tuổi: "How _________________ is she? She is five years old."',
        options: ['old', 'many', 'much', 'about'],
        correctAnswer: 'old',
        explanation: 'Câu trả lời nói về số tuổi ("five years old") ➔ Câu hỏi về tuổi tác là "How old is she?" (Bé gái ấy bao nhiêu tuổi?).',
        hint: 'Hỏi tuổi dùng "How old".'
      },
      {
        id: 't1-e3-q21',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 21,
        imageEmoji: '🇺🇸',
        questionPrompt: '3. Nhìn tranh quốc kỳ nước Mỹ (cờ sọc đỏ trắng và 50 ngôi sao): "He comes from _________________."',
        options: ['America', 'England', 'Australia', 'Japan'],
        correctAnswer: 'America',
        explanation: 'Lá cờ sọc đỏ trắng và góc xanh ngôi sao là quốc kỳ của nước Mỹ (America / the USA) ➔ "He comes from America."',
        hint: 'Nước Mỹ là America.'
      },
      {
        id: 't1-e3-q22',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 22,
        imageEmoji: '🚴‍♀️',
        questionPrompt: '4. Nhìn tranh hai bạn nhỏ đang đạp xe đạp: "I like _________________ my bike."',
        options: ['riding', 'ride', 'rides', 'rode'],
        correctAnswer: 'riding',
        explanation: 'Cụm từ lái xe đạp là "ride my bike". Sau "like" chia V-ing bỏ e thêm ing ➔ "riding" ➔ "I like riding my bike." (Tớ thích đạp xe).',
        hint: 'Like + V-ing: riding.'
      }
    ]
  },

  // =========================================================================
  // ĐỀ THI HỌC KỲ I LỚP 4 SỐ 4 (Đề số 4 Cuối Kì 1)
  // =========================================================================
  {
    id: 'term1-exam4',
    category: 'term_1',
    categoryLabel: 'Cuối Học Kì 1',
    title: 'Đề Thi Học Kỳ I Lớp 4 - Số 4',
    subTitle: 'Từ khác loại, Hộp thoại Nam & Peter, Sửa lỗi sai, Sách Khoa học & Trang phục Hàn Quốc',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 20,
    icon: '📘',
    themeColor: 'from-purple-600 via-pink-600 to-rose-600',
    questions: [
      // Question 1: Chọn từ khác loại
      {
        id: 't1-e4-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 1,
        questionPrompt: '1. Chọn từ khác loại: yesterday, went, had, got',
        options: ['yesterday', 'went', 'had', 'got'],
        correctAnswer: 'yesterday',
        explanation: '"yesterday" là trạng từ chỉ thời gian (hôm qua). Các từ còn lại "went", "had", "got" đều là động từ chia ở thì quá khứ đơn.',
        hint: '"yesterday" không phải là một hành động/động từ.'
      },
      {
        id: 't1-e4-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: '2. Chọn từ khác loại: date, Monday, Tuesday, Thursday',
        options: ['date', 'Monday', 'Tuesday', 'Thursday'],
        correctAnswer: 'date',
        explanation: '"date" là danh từ chung có nghĩa là ngày tháng. Còn "Monday" (thứ Hai), "Tuesday" (thứ Ba), "Thursday" (thứ Năm) là các thứ cụ thể trong tuần.',
        hint: '"date" là từ chỉ chung, các từ khác là thứ trong tuần.'
      },
      {
        id: 't1-e4-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 3,
        questionPrompt: '3. Chọn từ khác loại: fly, plane, write, read',
        options: ['fly', 'plane', 'write', 'read'],
        correctAnswer: 'plane',
        explanation: '"plane" là danh từ chỉ chiếc máy bay. Các từ "fly" (bay), "write" (viết), "read" (đọc) đều là các động từ.',
        hint: '"plane" là đồ vật/phương tiện (danh từ).'
      },
      {
        id: 't1-e4-q4',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 4,
        questionPrompt: '4. Chọn từ khác loại: England, Japan, America, November',
        options: ['England', 'Japan', 'America', 'November'],
        correctAnswer: 'November',
        explanation: '"November" là tên tháng 11 trong năm. Các từ "England" (nước Anh), "Japan" (nước Nhật), "America" (nước Mỹ) đều là tên các quốc gia.',
        hint: '"November" là một tháng trong năm.'
      },

      // Question 2: Chọn từ thích hợp điền vào chỗ trống (Word Bank)
      {
        id: 't1-e4-q5',
        type: 'fill_blank',
        exerciseTitle: 'Question 2: Chọn từ thích hợp điền vào chỗ trống [English, favourite, today, in, Tuesday]',
        questionNumber: 5,
        wordBank: ['English', 'favourite', 'today', 'in', 'Tuesday'],
        questionPrompt: 'A: "What day is it (1)_____________________, Nam?" ➔ Chọn từ điền vào vị trí (1):',
        options: ['today', 'Tuesday', 'English', 'favourite', 'in'],
        correctAnswer: 'today',
        explanation: 'Cấu trúc hỏi thứ hôm nay: "What day is it today, Nam?" (Hôm nay là thứ mấy hả Nam?).',
        hint: 'Hỏi ngày hôm nay.'
      },
      {
        id: 't1-e4-q6',
        type: 'fill_blank',
        exerciseTitle: 'Question 2: Chọn từ thích hợp điền vào chỗ trống [English, favourite, today, in, Tuesday]',
        questionNumber: 6,
        wordBank: ['English', 'favourite', 'today', 'in', 'Tuesday'],
        questionPrompt: 'B: "It’s (2)_____________________." ➔ Chọn từ điền vào vị trí (2):',
        options: ['Tuesday', 'today', 'English', 'favourite', 'in'],
        correctAnswer: 'Tuesday',
        explanation: 'Trả lời cho câu hỏi "What day is it today?" bằng tên một thứ trong tuần: "It\x27s Tuesday." (Hôm nay là thứ Ba).',
        hint: 'Tên thứ Ba trong tiếng Anh.'
      },
      {
        id: 't1-e4-q7',
        type: 'fill_blank',
        exerciseTitle: 'Question 2: Chọn từ thích hợp điền vào chỗ trống [English, favourite, today, in, Tuesday]',
        questionNumber: 7,
        wordBank: ['English', 'favourite', 'today', 'in', 'Tuesday'],
        questionPrompt: 'B: "I have Maths, Science, Music and (3)_____________________." ➔ Chọn từ điền vào vị trí (3):',
        options: ['English', 'Tuesday', 'today', 'favourite', 'in'],
        correctAnswer: 'English',
        explanation: 'Liệt kê các môn học cùng với Maths (Toán), Science (Khoa học), Music (Âm nhạc) ➔ môn "English" (Tiếng Anh).',
        hint: 'Môn tiếng Anh.'
      },
      {
        id: 't1-e4-q8',
        type: 'fill_blank',
        exerciseTitle: 'Question 2: Chọn từ thích hợp điền vào chỗ trống [English, favourite, today, in, Tuesday]',
        questionNumber: 8,
        wordBank: ['English', 'favourite', 'today', 'in', 'Tuesday'],
        questionPrompt: 'A: "What is your (4)_____________________ subjects? - B: Maths and English." ➔ Chọn từ điền vào vị trí (4):',
        options: ['favourite', 'English', 'Tuesday', 'today', 'in'],
        correctAnswer: 'favourite',
        explanation: 'Cụm từ hỏi môn học yêu thích: "favourite subjects" (những môn học yêu thích nhất).',
        hint: '"favourite" nghĩa là ưa thích nhất.'
      },

      // Question 3: Đọc đoạn văn và trả lời câu hỏi
      {
        id: 't1-e4-q9',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi về bạn Peter',
        questionNumber: 9,
        readingPassage: 'This is my new friend. His name is Peter. He is from America. He is a pupil at Hanoi International School. His hobby is playing football and reading books. He can sing many Vietnamese songs. In his free time, he often goes to the music club. He is happy there.',
        questionPrompt: '1. Where is Peter from?',
        options: ['He is from America.', 'He is from England.', 'He is from Vietnam.', 'He is from Japan.'],
        correctAnswer: 'He is from America.',
        explanation: 'Trong đoạn văn ghi rõ ở câu thứ ba: "He is from America." (Cậu ấy đến từ nước Mỹ).',
        hint: 'Tìm câu bắt đầu bằng "He is from...".'
      },
      {
        id: 't1-e4-q10',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi về bạn Peter',
        questionNumber: 10,
        readingPassage: 'This is my new friend. His name is Peter. He is from America. He is a pupil at Hanoi International School. His hobby is playing football and reading books. He can sing many Vietnamese songs. In his free time, he often goes to the music club. He is happy there.',
        questionPrompt: '2. What is his hobby?',
        options: [
          'His hobby is playing football and reading books.',
          'His hobby is swimming and cooking.',
          'His hobby is riding a bike.',
          'His hobby is playing the piano.'
        ],
        correctAnswer: 'His hobby is playing football and reading books.',
        explanation: 'Đoạn văn viết: "His hobby is playing football and reading books." (Sở thích của cậu ấy là chơi đá bóng và đọc sách).',
        hint: 'Tìm câu có từ "hobby".'
      },
      {
        id: 't1-e4-q11',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi về bạn Peter',
        questionNumber: 11,
        readingPassage: 'This is my new friend. His name is Peter. He is from America. He is a pupil at Hanoi International School. His hobby is playing football and reading books. He can sing many Vietnamese songs. In his free time, he often goes to the music club. He is happy there.',
        questionPrompt: '3. Can he sing Vietnamese songs?',
        options: ['Yes, he can.', 'No, he can’t.', 'Yes, he does.', 'No, he doesn’t.'],
        correctAnswer: 'Yes, he can.',
        explanation: 'Đoạn văn viết: "He can sing many Vietnamese songs." (Cậu ấy có thể hát nhiều bài hát tiếng Việt) ➔ Trả lời là "Yes, he can."',
        hint: 'Câu hỏi bắt đầu bằng "Can he...", trả lời "Yes, he can".'
      },
      {
        id: 't1-e4-q12',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi về bạn Peter',
        questionNumber: 12,
        readingPassage: 'This is my new friend. His name is Peter. He is from America. He is a pupil at Hanoi International School. His hobby is playing football and reading books. He can sing many Vietnamese songs. In his free time, he often goes to the music club. He is happy there.',
        questionPrompt: '4. What does he do in his free time?',
        options: [
          'He often goes to the music club.',
          'He often goes swimming.',
          'He plays football at school.',
          'He stays at home and sleeps.'
        ],
        correctAnswer: 'He often goes to the music club.',
        explanation: 'Đoạn văn viết: "In his free time, he often goes to the music club." (Vào thời gian rảnh rỗi, cậu ấy thường đến câu lạc bộ âm nhạc).',
        hint: 'Tìm câu có cụm "free time".'
      },

      // Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng
      {
        id: 't1-e4-q13',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 13,
        questionPrompt: '1. Tìm từ bị sai trong câu: "What subject does you have today?"',
        options: ['does (sửa thành do)', 'subject', 'have', 'today'],
        correctAnswer: 'does (sửa thành do)',
        explanation: 'Chủ ngữ "you" là ngôi thứ hai nên trợ động từ ở thì hiện tại đơn phải là "do", không dùng "does" ➔ Sửa "does" thành "do": "What subjects do you have today?".',
        hint: '"you" đi với trợ động từ "do".'
      },
      {
        id: 't1-e4-q14',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 14,
        questionPrompt: '2. Tìm từ bị sai trong câu: "He are from Malaysia."',
        options: ['are (sửa thành is)', 'He', 'from', 'Malaysia'],
        correctAnswer: 'are (sửa thành is)',
        explanation: 'Chủ ngữ "He" là ngôi thứ ba số ít nên động từ to be phải là "is", không dùng "are" ➔ Sửa "are" thành "is": "He is from Malaysia."',
        hint: '"He" đi với to be "is".'
      },
      {
        id: 't1-e4-q15',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 15,
        questionPrompt: '3. Tìm từ bị sai trong câu: "I go from Quynh Hai primary school."',
        options: ['from (sửa thành to)', 'go', 'primary', 'school'],
        correctAnswer: 'from (sửa thành to)',
        explanation: 'Cụm từ đi học tại trường là "go to school" (đi đến trường). Dùng "from" là sai giới từ ➔ Sửa "from" thành "to": "I go to Quynh Hai primary school."',
        hint: 'Cụm từ "go to school" chỉ việc đến trường.'
      },
      {
        id: 't1-e4-q16',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 16,
        questionPrompt: '4. Tìm từ bị sai trong câu: "They have English yesterday."',
        options: ['have (sửa thành had)', 'They', 'English', 'yesterday'],
        correctAnswer: 'have (sửa thành had)',
        explanation: 'Có trạng từ quá khứ "yesterday" (hôm qua) nên động từ "have" phải chuyển sang dạng quá khứ là "had" ➔ Sửa "have" thành "had": "They had English yesterday."',
        hint: 'Quá khứ của have là had.'
      },

      // Question 5: Dựa vào tranh hoàn thành các câu sau
      {
        id: 't1-e4-q17',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 17,
        imageEmoji: '🔬',
        questionPrompt: '1. Nhìn tranh cuốn sách giáo khoa "KHOA HỌC 4": "I have _________________ on Tuesday."',
        options: ['Science', 'Maths', 'Music', 'Art'],
        correctAnswer: 'Science',
        explanation: 'Sách "Khoa học" trong tiếng Anh là môn "Science" ➔ "I have Science on Tuesday." (Tớ có môn Khoa học vào thứ Ba).',
        hint: 'Khoa học là Science.'
      },
      {
        id: 't1-e4-q18',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 18,
        imageEmoji: '📖',
        questionPrompt: '2. Nhìn tranh bé gái nằm đọc cuốn sách: "She is reading a _________________ now."',
        options: ['book', 'pen', 'bike', 'song'],
        correctAnswer: 'book',
        explanation: 'Bức tranh mô tả bạn nhỏ nằm đọc sách ➔ "She is reading a book now." (Bây giờ bạn ấy đang đọc một cuốn sách).',
        hint: 'Đọc một cuốn sách: reading a book.'
      },
      {
        id: 't1-e4-q19',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 19,
        imageEmoji: '📅',
        questionPrompt: '3. Nhìn tờ lịch ghi ngày 12 tháng 10 (October 12): "Today is the _________________ of October."',
        options: ['twelfth (12th)', 'twentieth (20th)', 'second (2nd)', 'twelve'],
        correctAnswer: 'twelfth (12th)',
        explanation: 'Ngày 12 viết dưới dạng số thứ tự là "twelfth" (viết tắt là 12th) ➔ "Today is the twelfth of October." (Hôm nay là ngày 12 tháng Mười).',
        hint: 'Số thứ tự của số 12 là twelfth.'
      },
      {
        id: 't1-e4-q20',
        type: 'multiple_choice',
        exerciseTitle: 'Question 5: Dựa vào tranh hoàn thành các câu sau',
        questionNumber: 20,
        imageEmoji: '🇰🇷',
        questionPrompt: '4. Nhìn bức tranh 2 bạn nhỏ mặc trang phục truyền thống Hanbok bên cạnh quốc kỳ Hàn Quốc: "They are _________________."',
        options: ['Korean', 'Korea', 'Japanese', 'American'],
        correctAnswer: 'Korean',
        explanation: 'Quốc kỳ và trang phục Hanbok đại diện cho đất nước Hàn Quốc. Từ chỉ quốc tịch người Hàn Quốc là "Korean" ➔ "They are Korean." (Họ là người Hàn Quốc).',
        hint: 'Quốc tịch Hàn Quốc kết thúc bằng đuôi -an: Korean.'
      }
    ]
  },

  // =========================================================================
  // ĐỀ THI HỌC KỲ I LỚP 4 SỐ 5 (Đề số 5 Cuối Kì 1)
  // =========================================================================
  {
    id: 'term1-exam5',
    category: 'term_1',
    categoryLabel: 'Cuối Học Kì 1',
    title: 'Đề Thi Học Kỳ I Lớp 4 - Số 5',
    subTitle: 'Từ khác loại, Ngày 8/3 & Viết chính tả, Hộp từ Linda, Tìm lỗi sai & Ghép 6 câu',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 24,
    icon: '🌸',
    themeColor: 'from-emerald-600 via-teal-600 to-cyan-700',
    questions: [
      // Question 1: Chọn từ khác loại
      {
        id: 't1-e5-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 1,
        questionPrompt: '1. Chọn từ khác loại: about, where, how, who',
        options: ['about', 'where', 'how', 'who'],
        correctAnswer: 'about',
        explanation: '"about" là giới từ (về điều gì). Trong khi "where" (ở đâu), "how" (như thế nào), "who" (ai) đều là các từ để hỏi (Wh- questions).',
        hint: '"about" là giới từ, còn lại là từ để hỏi.'
      },
      {
        id: 't1-e5-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: '2. Chọn từ khác loại: collect, read, do, like',
        options: ['like', 'collect', 'read', 'do'],
        correctAnswer: 'like',
        explanation: '"like" là động từ chỉ trạng thái/cảm xúc (yêu thích) và thường đi trước V-ing (like playing, like doing). Các từ "collect" (sưu tầm), "read" (đọc), "do" (làm) là các động từ hành động trực tiếp.',
        hint: '"like" chỉ cảm xúc yêu thích.'
      },
      {
        id: 't1-e5-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 3,
        questionPrompt: '3. Chọn từ khác loại: Art, Music, subject, History',
        options: ['subject', 'Art', 'Music', 'History'],
        correctAnswer: 'subject',
        explanation: '"subject" là danh từ chung có nghĩa là môn học. Các từ "Art" (Mỹ thuật), "Music" (Âm nhạc), "History" (Lịch sử) là các môn học cụ thể.',
        hint: '"subject" là từ khái quát chỉ môn học.'
      },
      {
        id: 't1-e5-q4',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 4,
        questionPrompt: '4. Chọn từ khác loại: blue, puppet, purple, red',
        options: ['puppet', 'blue', 'purple', 'red'],
        correctAnswer: 'puppet',
        explanation: '"puppet" là danh từ chỉ con rối/đồ chơi. Các từ "blue" (xanh dương), "purple" (tím), "red" (đỏ) đều là các tính từ chỉ màu sắc.',
        hint: '"puppet" là con rối, không phải màu sắc.'
      },

      // Question 2: Dựa vào tranh để hoàn thành các câu sau
      {
        id: 't1-e5-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Dựa vào tranh để hoàn thành các câu sau',
        questionNumber: 5,
        imageEmoji: '✍️',
        questionPrompt: '1. Nhìn tranh bé gái đang nắn nót viết bài: "She is _________________ a dictation."',
        options: ['writing', 'singing', 'reading', 'drawing'],
        correctAnswer: 'writing',
        explanation: 'Cụm từ "write a dictation" có nghĩa là viết bài chính tả. Ở thì hiện tại tiếp diễn là "writing a dictation" (đang viết chính tả).',
        hint: 'Viết chính tả dùng động từ "writing".'
      },
      {
        id: 't1-e5-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Dựa vào tranh để hoàn thành các câu sau',
        questionNumber: 6,
        imageEmoji: '💐',
        questionPrompt: '2. Nhìn tranh thiệp chúc mừng "Happy Women’s Day" (Ngày Quốc tế Phụ nữ 8/3): "Women’s Day is in _________________."',
        options: ['March', 'May', 'April', 'June'],
        correctAnswer: 'March',
        explanation: 'Ngày Quốc tế Phụ nữ (Women\x27s Day) diễn ra vào ngày 8 tháng Ba ➔ "in March" (vào tháng Ba).',
        hint: 'Tháng Ba trong tiếng Anh là March.'
      },
      {
        id: 't1-e5-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Dựa vào tranh để hoàn thành các câu sau',
        questionNumber: 7,
        imageEmoji: '📕',
        questionPrompt: '3. Nhìn tranh bìa sách "TIẾNG ANH 4": "I have _________________ today."',
        options: ['English', 'Vietnamese', 'Maths', 'Science'],
        correctAnswer: 'English',
        explanation: 'Bìa sách ghi rõ "TIẾNG ANH 4" ➔ "I have English today." (Hôm nay tớ có môn Tiếng Anh).',
        hint: 'Môn tiếng Anh là English.'
      },
      {
        id: 't1-e5-q8',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Dựa vào tranh để hoàn thành các câu sau',
        questionNumber: 8,
        imageEmoji: '🚶‍♂️',
        questionPrompt: '4. Nhìn tranh gia đình cùng nhau đi bộ dạo mát dưới ánh nắng có từ "yesterday": "They _________________ for a walk yesterday."',
        options: ['went', 'go', 'goes', 'going'],
        correctAnswer: 'went',
        explanation: 'Cụm từ đi dạo là "go for a walk". Vì có "yesterday" (hôm qua) nên chuyển "go" sang quá khứ đơn là "went" ➔ "They went for a walk yesterday."',
        hint: 'Quá khứ của go là went.'
      },

      // Question 3: Chọn từ thích hợp trong hộp thoại để điền vào chỗ trống
      {
        id: 't1-e5-q9',
        type: 'fill_blank',
        exerciseTitle: 'Question 3: Chọn từ thích hợp trong hộp thoại [happy, England, friend, dance, club]',
        questionNumber: 9,
        wordBank: ['happy', 'England', 'friend', 'dance', 'club'],
        questionPrompt: '"This is my new (1) _________________. Her name is Linda." ➔ Chọn từ điền vào vị trí (1):',
        options: ['friend', 'England', 'club', 'happy', 'dance'],
        correctAnswer: 'friend',
        explanation: 'Cụm từ giới thiệu bạn mới: "This is my new friend." (Đây là người bạn mới của tớ).',
        hint: 'Người bạn là friend.'
      },
      {
        id: 't1-e5-q10',
        type: 'fill_blank',
        exerciseTitle: 'Question 3: Chọn từ thích hợp trong hộp thoại [happy, England, friend, dance, club]',
        questionNumber: 10,
        wordBank: ['happy', 'England', 'friend', 'dance', 'club'],
        questionPrompt: '"She is from (2) _________________." ➔ Chọn từ điền vào vị trí (2):',
        options: ['England', 'friend', 'club', 'happy', 'dance'],
        correctAnswer: 'England',
        explanation: 'Sau "from" cần tên một quốc gia: "She is from England." (Bạn ấy đến từ nước Anh).',
        hint: 'Nước Anh là England.'
      },
      {
        id: 't1-e5-q11',
        type: 'fill_blank',
        exerciseTitle: 'Question 3: Chọn từ thích hợp trong hộp thoại [happy, England, friend, dance, club]',
        questionNumber: 11,
        wordBank: ['happy', 'England', 'friend', 'dance', 'club'],
        questionPrompt: '"In her free time, she goes to music (3) _________________." ➔ Chọn từ điền vào vị trí (3):',
        options: ['club', 'happy', 'friend', 'England', 'dance'],
        correctAnswer: 'club',
        explanation: 'Cụm từ câu lạc bộ âm nhạc là "music club" ➔ "she goes to music club" (bạn ấy đến câu lạc bộ âm nhạc).',
        hint: 'Câu lạc bộ là club.'
      },
      {
        id: 't1-e5-q12',
        type: 'fill_blank',
        exerciseTitle: 'Question 3: Chọn từ thích hợp trong hộp thoại [happy, England, friend, dance, club]',
        questionNumber: 12,
        wordBank: ['happy', 'England', 'friend', 'dance', 'club'],
        questionPrompt: '"She is (4) _________________ there." ➔ Chọn từ điền vào vị trí (4):',
        options: ['happy', 'club', 'friend', 'England', 'dance'],
        correctAnswer: 'happy',
        explanation: 'Tính từ chỉ tâm trạng vui vẻ: "She is happy there." (Bạn ấy cảm thấy rất vui vẻ hạnh phúc ở đó).',
        hint: 'Hạnh phúc/vui vẻ là happy.'
      },

      // Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng
      {
        id: 't1-e5-q13',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 13,
        questionPrompt: '1. Tìm từ bị sai trong câu: "She don’t like playing badminton."',
        options: ['don’t (sửa thành doesn’t)', 'playing', 'badminton', 'like'],
        correctAnswer: 'don’t (sửa thành doesn’t)',
        explanation: 'Chủ ngữ "She" là ngôi thứ ba số ít nên dạng phủ định phải dùng trợ động từ "doesn\x27t", không dùng "don\x27t" ➔ Sửa "don\x27t" thành "doesn\x27t".',
        hint: 'Ngôi She đi với doesn\x27t.'
      },
      {
        id: 't1-e5-q14',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 14,
        questionPrompt: '2. Tìm từ bị sai trong câu: "Sandy is an pupil at Hong Bang primary school."',
        options: ['an (sửa thành a)', 'pupil', 'primary', 'school'],
        correctAnswer: 'an (sửa thành a)',
        explanation: 'Từ "pupil" bắt đầu bằng phụ âm /p/ nên chỉ dùng mạo từ "a", không dùng "an" ➔ Sửa "an" thành "a": "Sandy is a pupil...".',
        hint: '"pupil" bắt đầu bằng phụ âm p nên dùng mạo từ "a".'
      },
      {
        id: 't1-e5-q15',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 15,
        questionPrompt: '3. Tìm từ bị sai trong câu: "We have English in Friday."',
        options: ['in (sửa thành on)', 'have', 'English', 'Friday'],
        correctAnswer: 'in (sửa thành on)',
        explanation: 'Trước các thứ trong tuần (Monday, Friday...), ta luôn dùng giới từ "on", không dùng "in" ➔ Sửa "in" thành "on": "on Friday".',
        hint: 'Trước thứ trong tuần dùng giới từ "on".'
      },
      {
        id: 't1-e5-q16',
        type: 'error_correction',
        exerciseTitle: 'Question 4: Tìm lỗi sai trong các câu sau và sửa lại cho đúng',
        questionNumber: 16,
        questionPrompt: '4. Tìm từ bị sai trong câu: "My birthday is on the twenty of December."',
        options: ['twenty (sửa thành twentieth)', 'birthday', 'on', 'December'],
        correctAnswer: 'twenty (sửa thành twentieth)',
        explanation: 'Ngày trong tháng phải dùng số thứ tự "twentieth" (ngày thứ 20), không dùng số đếm "twenty" (số 20) ➔ Sửa "twenty" thành "twentieth": "the twentieth of December".',
        hint: 'Ngày 20 dùng số thứ tự twentieth.'
      },

      // Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh
      {
        id: 't1-e5-q17',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 17,
        questionPrompt: '1. a/ fly/ want/ I/ to/ kite. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['I', 'want', 'to', 'fly', 'a', 'kite'],
        correctAnswer: 'I want to fly a kite.',
        explanation: 'Cấu trúc muốn làm gì: S + want to + V ➔ "I want to fly a kite." (Tớ muốn thả một cánh diều).',
        hint: 'Bắt đầu bằng "I want to..."'
      },
      {
        id: 't1-e5-q18',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 18,
        questionPrompt: '2. They/ school/ yesterday/ went/ to. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['They', 'went', 'to', 'school', 'yesterday'],
        correctAnswer: 'They went to school yesterday.',
        explanation: 'Cấu trúc quá khứ đơn: S + went to school + yesterday. (Hôm qua họ đã đến trường).',
        hint: 'Bắt đầu bằng "They went to..."'
      },
      {
        id: 't1-e5-q19',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 19,
        questionPrompt: '3. When/ birthday/ your/ is/? ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['When', 'is', 'your', 'birthday'],
        correctAnswer: 'When is your birthday?',
        explanation: 'Cấu trúc hỏi ngày sinh nhật: When is your birthday? (Sinh nhật của bạn là khi nào?).',
        hint: 'Bắt đầu bằng "When is your..."'
      },
      {
        id: 't1-e5-q20',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 20,
        questionPrompt: '4. can/ cannot/ jump high/ Tom/ but/ run fast/. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['Tom', 'can', 'run', 'fast', 'but', 'cannot', 'jump', 'high'],
        correctAnswer: 'Tom can run fast but cannot jump high.',
        explanation: 'Cấu trúc liên từ but chỉ sự đối lập: "Tom can run fast but cannot jump high." (Tom có thể chạy nhanh nhưng không thể nhảy cao).',
        hint: 'Tom can run fast but...'
      },
      {
        id: 't1-e5-q21',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 21,
        questionPrompt: '5. Monday/ has/ on/ Tom/ PE/. ➔ Sắp xếp thành câu đúng:',
        scrambledWords: ['Tom', 'has', 'PE', 'on', 'Monday'],
        correctAnswer: 'Tom has PE on Monday.',
        explanation: 'Cấu trúc thời khóa biểu: S + has + môn học + on + thứ ➔ "Tom has PE on Monday." (Tom có môn Thể dục vào thứ Hai).',
        hint: 'Tom has PE on...'
      },
      {
        id: 't1-e5-q22',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 22,
        questionPrompt: '6. doing/ What/ they/ are/? ➔ Sắp xếp thành câu hỏi đúng:',
        scrambledWords: ['What', 'are', 'they', 'doing'],
        correctAnswer: 'What are they doing?',
        explanation: 'Cấu trúc câu hỏi hiện tại tiếp diễn: What + are + they + doing? (Họ đang làm gì thế?).',
        hint: 'What are they doing?'
      }
    ]
  },


  // =========================================================================
  // 7. ĐỀ KIỂM TRA GIỮA KỲ II – SỐ 1
  // =========================================================================
  {
    id: 'midterm2-exam1',
    category: 'midterm_2',
    categoryLabel: 'Giữa Học Kì 2',
    title: 'Đề Kiểm Tra Giữa Kỳ II - Số 1',
    subTitle: 'Hỏi giờ & hoạt động trong ngày (What time do you...?), Từ để hỏi & Giá tiền',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 22,
    icon: '⏰',
    themeColor: 'from-amber-600 via-orange-600 to-yellow-600',
    questions: [
      {
        id: 'm2-e1-q1',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 1: Điền từ và thời gian tương ứng với đồng hồ',
        questionNumber: 1,
        imageEmoji: '⏰ 06:00',
        questionPrompt: 'What time do you get up? – I get up at ________ o’clock. (Đồng hồ chỉ đúng 6 giờ)',
        options: ['six', 'seven', 'five', 'eight'],
        correctAnswer: 'six',
        explanation: 'Đồng hồ chỉ 6 giờ đúng ➔ "at six o\'clock" (lúc 6 giờ).',
        hint: '6 giờ trong tiếng Anh là "six".'
      },
      {
        id: 'm2-e1-q2',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 1: Điền từ và thời gian tương ứng với đồng hồ',
        questionNumber: 2,
        imageEmoji: '🚿 06:30',
        questionPrompt: 'What time do you take a shower? – I take a shower at half past ________. (Đồng hồ chỉ 6 rưỡi)',
        options: ['six', 'seven', 'five', 'eight'],
        correctAnswer: 'six',
        explanation: '"half past six" có nghĩa là 6 rưỡi (6 giờ 30 phút).',
        hint: 'half past six = 6 giờ 30 phút.'
      },
      {
        id: 'm2-e1-q3',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền từ để hỏi thích hợp',
        questionNumber: 3,
        questionPrompt: '_____________ is Tet holiday? – It’s in February.',
        options: ['When', 'What', 'Where', 'How much'],
        correctAnswer: 'When',
        explanation: 'Hỏi về thời điểm diễn ra dịp Tết dùng từ để hỏi "When" (khi nào).',
        hint: 'Hỏi về thời gian, ngày tháng.'
      },
      {
        id: 'm2-e1-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền từ để hỏi thích hợp',
        questionNumber: 4,
        questionPrompt: '_____________ is this T-shirt? – It’s eighty thousand dong.',
        options: ['How much', 'What', 'Where', 'When'],
        correctAnswer: 'How much',
        explanation: 'Hỏi giá tiền của chiếc áo phông dùng cụm từ "How much": "How much is this T-shirt?".',
        hint: 'Hỏi giá tiền dùng "How much".'
      },
      {
        id: 'm2-e1-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền từ để hỏi thích hợp',
        questionNumber: 5,
        questionPrompt: '_____________ does your mother do? – She is a nurse.',
        options: ['What', 'Where', 'When', 'How much'],
        correctAnswer: 'What',
        explanation: 'Cấu trúc hỏi nghề nghiệp: What does your mother do? (Mẹ bạn làm nghề gì?).',
        hint: 'Hỏi nghề nghiệp dùng "What does... do?".'
      },
      {
        id: 'm2-e1-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 3: Chọn đáp án đúng',
        questionNumber: 6,
        questionPrompt: 'Let’s ___________ to the bookshop.',
        options: ['go', 'going', 'to go', 'went'],
        correctAnswer: 'go',
        explanation: 'Sau "Let\'s" (chúng ta hãy) luôn là động từ nguyên mẫu không "to": "Let\'s go to the bookshop."',
        hint: 'Sau "Let\'s" động từ giữ nguyên mẫu.'
      },
      {
        id: 'm2-e1-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 3: Chọn đáp án đúng',
        questionNumber: 7,
        questionPrompt: 'He is ___________ engineer.',
        options: ['an', 'a', 'the', 'X'],
        correctAnswer: 'an',
        explanation: '"engineer" (kỹ sư) bắt đầu bằng nguyên âm E nên ta dùng mạo từ "an" ➔ "an engineer".',
        hint: 'Bắt đầu bằng nguyên âm e.'
      },
      {
        id: 'm2-e1-q8',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 3: Chọn đáp án đúng',
        questionNumber: 8,
        questionPrompt: 'Would you like ___________ milk?',
        options: ['some', 'many', 'X', 'any'],
        correctAnswer: 'some',
        explanation: 'Trong lời mời lịch sự với "Would you like...", ta dùng "some" với danh từ không đếm được: "Would you like some milk?".',
        hint: 'Lời mời lịch sự dùng "some".'
      },
      {
        id: 'm2-e1-q9',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 9,
        questionPrompt: 'Sắp xếp thành câu hỏi sở thích con vật:',
        scrambledWords: ['What', 'animal', 'do', 'you', 'want', 'to', 'see'],
        correctAnswer: 'What animal do you want to see?',
        explanation: 'Cấu trúc: What animal do you want to see? (Bạn muốn xem con vật nào?).',
        hint: 'Bắt đầu bằng "What animal do you want..."'
      },
      {
        id: 'm2-e1-q10',
        type: 'reorder',
        exerciseTitle: 'Exercise 5: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 10,
        questionPrompt: 'Sắp xếp thành lời mời cà phê lịch sự:',
        scrambledWords: ['Would', 'you', 'like', 'some', 'coffee'],
        correctAnswer: 'Would you like some coffee?',
        explanation: 'Cấu trúc lời mời: Would you like some coffee? (Bạn có muốn uống chút cà phê không?).',
        hint: 'Bắt đầu bằng "Would you like some..."'
      }
    ]
  },

  // =========================================================================
  // 8. ĐỀ KIỂM TRA GIỮA KỲ II – SỐ 3
  // =========================================================================
  {
    id: 'midterm2-exam3',
    category: 'midterm_2',
    categoryLabel: 'Giữa Học Kì 2',
    title: 'Đề Kiểm Tra Giữa Kỳ II - Số 3',
    subTitle: 'Nối cột A-B, Từ vựng thức ăn đồ uống theo tranh & So sánh hơn',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 18,
    icon: '🍗',
    themeColor: 'from-rose-600 via-pink-600 to-amber-600',
    questions: [
      {
        id: 'm2-e3-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại',
        questionNumber: 1,
        questionPrompt: 'Chọn từ khác loại: clock, seven, ten, eight:',
        options: ['clock', 'seven', 'ten', 'eight'],
        correctAnswer: 'clock',
        explanation: '"seven" (7), "ten" (10), "eight" (8) là số đếm; còn "clock" là cái đồng hồ.',
        hint: 'Từ nào là đồ vật chứ không phải con số?'
      },
      {
        id: 'm2-e3-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Exercise 1: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại: writer, time, singer, student:',
        options: ['time', 'writer', 'singer', 'student'],
        correctAnswer: 'time',
        explanation: '"writer" (nhà văn), "singer" (ca sĩ), "student" (học sinh) là danh từ chỉ người/nghề nghiệp; còn "time" là thời gian.',
        hint: 'Từ nào không phải nghề nghiệp con người?'
      },
      {
        id: 'm2-e3-q3',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền vào chỗ trống',
        questionNumber: 3,
        questionPrompt: 'It’s time ____________ lunch.',
        options: ['for', 'at', 'on', 'with'],
        correctAnswer: 'for',
        explanation: 'Cụm từ "It\'s time for + danh từ": "It\'s time for lunch." (Đã đến giờ ăn trưa rồi).',
        hint: 'Đến giờ cho việc gì: It\'s time for...'
      },
      {
        id: 'm2-e3-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 2: Điền vào chỗ trống',
        questionNumber: 4,
        questionPrompt: 'She is cheerful ____________ athletic.',
        options: ['and', 'but', 'for', 'a'],
        correctAnswer: 'and',
        explanation: '"cheerful" (vui vẻ) và "athletic" (khỏe khoắn, thích thể thao) là 2 đặc điểm tích cực đi liền nhau nên dùng liên từ "and" (và).',
        hint: 'Nối 2 tính từ tốt đẹp với nhau bằng chữ "và".'
      },

      // Food and drinks pictures
      {
        id: 'm2-e3-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 5,
        imageEmoji: '🍗',
        questionPrompt: 'Nhìn đĩa gà quay thơm lừng: Chọn từ tiếng Anh đúng:',
        options: ['chicken', 'fish', 'beef', 'pork'],
        correctAnswer: 'chicken',
        explanation: 'Thịt gà / con gà trong tiếng Anh là "chicken".',
        hint: 'Món thịt gà quen thuộc.'
      },
      {
        id: 'm2-e3-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 6,
        imageEmoji: '🍚',
        questionPrompt: 'Nhìn bát cơm trắng nóng hổi với đôi đũa: Chọn từ tiếng Anh đúng:',
        options: ['rice', 'bread', 'noodles', 'pizza'],
        correctAnswer: 'rice',
        explanation: 'Cơm / gạo trong tiếng Anh là "rice".',
        hint: 'Bát cơm trắng hàng ngày.'
      },
      {
        id: 'm2-e3-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 7,
        imageEmoji: '🥗',
        questionPrompt: 'Nhìn đĩa rau củ quả tươi sạch (cà rốt, cà chua, cà tím, súp lơ): Chọn từ tiếng Anh đúng:',
        options: ['vegetables', 'fruit', 'meat', 'soup'],
        correctAnswer: 'vegetables',
        explanation: 'Rau củ quả trong tiếng Anh là "vegetables".',
        hint: 'Rau củ rất tốt cho sức khỏe.'
      },
      {
        id: 'm2-e3-q8',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 8,
        imageEmoji: '🍊🥤',
        questionPrompt: 'Nhìn ly nước cam ép vàng tươi có lát cam: Chọn từ tiếng Anh đúng:',
        options: ['orange juice', 'lemonade', 'water', 'milk'],
        correctAnswer: 'orange juice',
        explanation: 'Nước cam ép là "orange juice".',
        hint: 'Nước ép quả cam.'
      },
      {
        id: 'm2-e3-q9',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 9,
        imageEmoji: '🍔',
        questionPrompt: 'Nhìn chiếc bánh mì kẹp thịt hamburger: Chọn từ đúng:',
        options: ['hamburger', 'sandwich', 'bread', 'cake'],
        correctAnswer: 'hamburger',
        explanation: 'Bánh hamburger kẹp thịt là "hamburger".',
        hint: 'Bánh burger kẹp thịt.'
      },
      {
        id: 'm2-e3-q10',
        type: 'multiple_choice',
        exerciseTitle: 'Exercise 5: Điền từ thích hợp tương ứng với tranh',
        questionNumber: 10,
        imageEmoji: '🍜',
        questionPrompt: 'Nhìn bát mì thơm nghi ngút khói có đôi đũa: Chọn từ đúng:',
        options: ['noodles', 'soup', 'rice', 'chicken'],
        correctAnswer: 'noodles',
        explanation: 'Mì / bún / phở trong tiếng Anh là "noodles".',
        hint: 'Món mì sợi thơm ngon.'
      }
    ]
  },

  // =========================================================================
  // 9. ĐỀ THI HỌC KỲ II LỚP 4 SỐ 1
  // =========================================================================
  {
    id: 'term2-exam1',
    category: 'term_2',
    categoryLabel: 'Cuối Học Kì 2',
    title: 'Đề Thi Học Kỳ II Lớp 4 - Số 1',
    subTitle: 'Đọc hiểu kì nghỉ của Jack (YES/NO), Điền đoạn văn dã ngoại & Từ khác loại',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 18,
    icon: '🌊',
    themeColor: 'from-cyan-600 via-sky-600 to-blue-700',
    questions: [
      {
        id: 't2-e1-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Tìm từ khác loại',
        questionNumber: 1,
        questionPrompt: 'Chọn từ khác loại: chicken, noodle, camera, rice:',
        options: ['camera', 'chicken', 'noodle', 'rice'],
        correctAnswer: 'camera',
        explanation: '"chicken" (thịt gà), "noodle" (mì), "rice" (cơm) là các món ăn; còn "camera" là máy ảnh.',
        hint: 'Từ nào là thiết bị chụp ảnh thay vì đồ ăn?'
      },
      {
        id: 't2-e1-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Tìm từ khác loại',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại: family, shoes, skirt, jeans:',
        options: ['family', 'shoes', 'skirt', 'jeans'],
        correctAnswer: 'family',
        explanation: '"shoes" (giày), "skirt" (chân váy), "jeans" (quần bò) là trang phục; còn "family" là gia đình.',
        hint: 'Từ nào chỉ gia đình chứ không phải quần áo?'
      },
      {
        id: 't2-e1-q3',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Tìm từ khác loại',
        questionNumber: 3,
        questionPrompt: 'Chọn từ khác loại: bakery, school, hotel, breakfast:',
        options: ['breakfast', 'bakery', 'school', 'hotel'],
        correctAnswer: 'breakfast',
        explanation: '"bakery" (tiệm bánh), "school" (trường học), "hotel" (khách sạn) là các địa điểm; còn "breakfast" là bữa ăn sáng.',
        hint: 'Từ nào là bữa ăn chứ không phải tòa nhà/địa điểm?'
      },

      // Reading Jack YES/NO
      {
        id: 't2-e1-q4',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và điền YES hoặc NO',
        questionNumber: 4,
        readingPassage:
          'Dear Phong, I’m Jack. Yesterday was fun and relaxing. I got up late. In the morning, I cleaned my room. In the afternoon, I watered the flowers in the garden. Then I did my homework. In the evening, I chatted online with my friend Nam. We talked about our favorite films. What did you do yesterday?',
        questionPrompt: '1. Jack got up early. (Jack thức dậy sớm)',
        options: ['YES (Đúng)', 'NO (Sai)'],
        correctAnswer: 'NO (Sai)',
        explanation: 'Trong bài Jack viết: "I got up late." (Tớ thức dậy muộn) ➔ Câu "Jack got up early" là SAI ➔ Chọn NO.',
        hint: 'Jack thức dậy late (muộn) hay early (sớm)?'
      },
      {
        id: 't2-e1-q5',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và điền YES hoặc NO',
        questionNumber: 5,
        readingPassage:
          'Dear Phong, I’m Jack. Yesterday was fun and relaxing. I got up late. In the morning, I cleaned my room. In the afternoon, I watered the flowers in the garden. Then I did my homework. In the evening, I chatted online with my friend Nam. We talked about our favorite films. What did you do yesterday?',
        questionPrompt: '3. In the afternoon, he worked in the garden. (Buổi chiều cậu ấy làm việc trong vườn)',
        options: ['YES (Đúng)', 'NO (Sai)'],
        correctAnswer: 'YES (Đúng)',
        explanation: 'Trong bài viết: "In the afternoon, I watered the flowers in the garden." (tưới hoa trong vườn) ➔ Chọn YES.',
        hint: 'Buổi chiều Jack tưới hoa ở trong vườn.'
      },

      // Passage Fill-in
      {
        id: 't2-e1-q6',
        type: 'multiple_choice',
        exerciseTitle: 'Question 4: Điền từ vào đoạn văn',
        questionNumber: 6,
        questionPrompt: 'This is my father. He is a doctor. He works in a (1) ______________.',
        options: ['hospital', 'picnic', 'photos', 'swimming'],
        correctAnswer: 'hospital',
        explanation: 'Bác sĩ (doctor) làm việc ở bệnh viện (hospital) ➔ "works in a hospital".',
        hint: 'Bác sĩ làm việc ở đâu?'
      },
      {
        id: 't2-e1-q7',
        type: 'multiple_choice',
        exerciseTitle: 'Question 4: Điền từ vào đoạn văn',
        questionNumber: 7,
        questionPrompt: 'On the weekends, we often have a (2) ______________ in the park.',
        options: ['picnic', 'hospital', 'swimming', 'car'],
        correctAnswer: 'picnic',
        explanation: 'Cụm từ đi dã ngoại: "have a picnic in the park" (đi dã ngoại ở công viên).',
        hint: 'Buổi dã ngoại ngoài trời ở công viên.'
      },
      {
        id: 't2-e1-q8',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ thành câu hoàn chỉnh',
        questionNumber: 8,
        questionPrompt: 'Sắp xếp thành câu phủ định sở thích:',
        scrambledWords: ['I', 'don\'t', 'like', 'monkeys'],
        correctAnswer: "I don't like monkeys.",
        explanation: 'Cấu trúc phủ định: I don\'t like monkeys. (Tớ không thích những chú khỉ).',
        hint: 'Bắt đầu bằng "I don\'t like..."'
      },
      {
        id: 't2-e1-q9',
        type: 'reorder',
        exerciseTitle: 'Question 5: Sắp xếp các từ thành câu hoàn chỉnh',
        questionNumber: 9,
        questionPrompt: 'Sắp xếp thành thói quen vệ sinh răng miệng:',
        scrambledWords: ['I', 'brush', 'my', 'teeth', 'every day'],
        correctAnswer: 'I brush my teeth every day.',
        explanation: 'Cấu trúc: I brush my teeth every day. (Tớ đánh răng mỗi ngày).',
        hint: 'Bắt đầu bằng "I brush my teeth..."'
      }
    ]
  },

  // =========================================================================
  // 10. ĐỀ THI HỌC KỲ II LỚP 4 SỐ 5
  // =========================================================================
  {
    id: 'term2-exam5',
    category: 'term_2',
    categoryLabel: 'Cuối Học Kì 2',
    title: 'Đề Thi Học Kỳ II Lớp 4 - Số 5',
    subTitle: 'Đọc tranh chọn câu (Món ăn, Đi câu cá, Đi bơi) & Phong Mai đi 4 nơi',
    academicYear: 'Năm học 2024 - 2025',
    durationMinutes: 40,
    totalQuestions: 18,
    icon: '☀️',
    themeColor: 'from-amber-500 via-orange-600 to-red-600',
    questions: [
      {
        id: 't2-e5-q1',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 1,
        questionPrompt: 'Chọn từ khác loại: Go, Travel, Plane, Build:',
        options: ['Plane', 'Go', 'Travel', 'Build'],
        correctAnswer: 'Plane',
        explanation: '"Plane" là danh từ (máy bay); còn "Go" (đi), "Travel" (du lịch), "Build" (xây dựng) là động từ.',
        hint: 'Từ nào là phương tiện chứ không phải động từ hành động?'
      },
      {
        id: 't2-e5-q2',
        type: 'odd_one_out',
        exerciseTitle: 'Question 1: Chọn từ khác loại',
        questionNumber: 2,
        questionPrompt: 'Chọn từ khác loại: Holiday, Summer, Winter, Fall:',
        options: ['Holiday', 'Summer', 'Winter', 'Fall'],
        correctAnswer: 'Holiday',
        explanation: '"Summer" (mùa hè), "Winter" (mùa đông), "Fall" (mùa thu) là các mùa trong năm; còn "Holiday" là kỳ nghỉ.',
        hint: '3 từ còn lại là các mùa trong năm.'
      },

      // Visual choices
      {
        id: 't2-e5-q3',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Đọc và chọn tranh thích hợp',
        questionNumber: 3,
        imageEmoji: '🐟',
        questionPrompt: 'Câu miêu tả: "Her favourite food is fish." ➔ Tranh nào thể hiện đúng câu này?',
        options: ['Tranh đĩa cá nướng thơm ngon (Fish)', 'Tranh đĩa thịt bò (Beef)', 'Tranh đùi gà rán (Chicken)'],
        correctAnswer: 'Tranh đĩa cá nướng thơm ngon (Fish)',
        explanation: '"fish" là con cá / món cá ➔ Tranh đĩa cá nướng là đáp án chính xác.',
        hint: 'fish = món cá.'
      },
      {
        id: 't2-e5-q4',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Đọc và chọn tranh thích hợp',
        questionNumber: 4,
        imageEmoji: '🍞🥛',
        questionPrompt: 'Câu miêu tả: "I’d like some bread and milk." ➔ Tranh nào thể hiện đúng câu này?',
        options: ['Tranh ổ bánh mì và hộp sữa tươi', 'Tranh bát phở bò nóng', 'Tranh đĩa hoa quả thập cẩm'],
        correctAnswer: 'Tranh ổ bánh mì và hộp sữa tươi',
        explanation: '"bread" là bánh mì và "milk" là sữa tươi ➔ Tranh bánh mì và sữa.',
        hint: 'bread (bánh mì) and milk (sữa).'
      },
      {
        id: 't2-e5-q5',
        type: 'multiple_choice',
        exerciseTitle: 'Question 2: Đọc và chọn tranh thích hợp',
        questionNumber: 5,
        imageEmoji: '🎣',
        questionPrompt: 'Câu miêu tả: "We go fishing at weekends." ➔ Tranh nào thể hiện đúng?',
        options: ['Tranh các bạn nhỏ ngồi câu cá bên bờ sông', 'Tranh dựng lều trại', 'Tranh ăn tiệc picnic trên bãi cỏ'],
        correctAnswer: 'Tranh các bạn nhỏ ngồi câu cá bên bờ sông',
        explanation: '"go fishing" có nghĩa là đi câu cá.',
        hint: 'go fishing = đi câu cá.'
      },

      // Reading Phong & Mai 4 places
      {
        id: 't2-e5-q6',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi',
        questionNumber: 6,
        readingPassage:
          'It is Sunday today. Phong and Mai go to four places. First, they go to the bookshop because Mai wants to buy some books and pens. Then they go to the pharmacy because Phong wants to buy some medicine. After that, they go to the zoo because they want to see the animals. Finally, they go to the bakery. They want to buy something to eat because they are hungry.',
        questionPrompt: '1. How many places do Phong and Mai go?',
        options: ['Four places', 'Three places', 'Two places', 'Five places'],
        correctAnswer: 'Four places',
        explanation: 'Trong bài có câu: "Phong and Mai go to four places." (4 địa điểm: bookshop, pharmacy, zoo, bakery).',
        hint: 'Xem câu thứ 2 của bài đọc: "four places".'
      },
      {
        id: 't2-e5-q7',
        type: 'reading',
        exerciseTitle: 'Question 3: Đọc đoạn văn và trả lời câu hỏi',
        questionNumber: 7,
        readingPassage:
          'It is Sunday today. Phong and Mai go to four places. First, they go to the bookshop because Mai wants to buy some books and pens. Then they go to the pharmacy because Phong wants to buy some medicine. After that, they go to the zoo because they want to see the animals. Finally, they go to the bakery. They want to buy something to eat because they are hungry.',
        questionPrompt: '3. Do they go to the post office?',
        options: ['No, they don’t.', 'Yes, they do.', 'Yes, they are.', 'No, they aren\'t.'],
        correctAnswer: 'No, they don’t.',
        explanation: 'Họ chỉ đi 4 nơi: bookshop, pharmacy, zoo, bakery; không đi bưu điện (post office) ➔ "No, they don\'t."',
        hint: 'Họ không đi bưu điện.'
      },
      {
        id: 't2-e5-q8',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 8,
        questionPrompt: 'Sắp xếp thành câu hỏi kế hoạch mùa hè:',
        scrambledWords: ['Where', 'are', 'you', 'going', 'this', 'summer'],
        correctAnswer: 'Where are you going this summer?',
        explanation: 'Cấu trúc hỏi điểm đến kỳ nghỉ: Where are you going this summer? (Mùa hè này bạn dự định đi đâu?).',
        hint: 'Bắt đầu bằng "Where are you going..."'
      },
      {
        id: 't2-e5-q9',
        type: 'reorder',
        exerciseTitle: 'Question 4: Sắp xếp các từ sau thành câu hoàn chỉnh',
        questionNumber: 9,
        questionPrompt: 'Sắp xếp thành câu đúng:',
        scrambledWords: ['He', 'is', 'going', 'to', 'Ho Chi Minh', 'city'],
        correctAnswer: 'He is going to Ho Chi Minh city.',
        explanation: 'Cấu trúc: He is going to Ho Chi Minh city. (Cậu ấy sắp đi Thành phố Hồ Chí Minh).',
        hint: 'Bắt đầu bằng "He is going to..."'
      }
    ]
  }
];
