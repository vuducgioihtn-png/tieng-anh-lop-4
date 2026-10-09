import { LOIGIAIHAY_EXAM_1, LOIGIAIHAY_EXAM_2 } from './loigiaihayExams';
import { LOIGIAIHAY_EXAM_3, LOIGIAIHAY_EXAM_4, LOIGIAIHAY_EXAM_5 } from './loigiaihayExams345';
import {
  LOIGIAIHAY_CUOIKI1_EXAM_1,
  LOIGIAIHAY_CUOIKI1_EXAM_2,
  LOIGIAIHAY_CUOIKI1_EXAM_3,
  LOIGIAIHAY_CUOIKI1_EXAM_5
} from './loigiaihayCuoiKi1Exams';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface VisualCardItem {
  id: string;
  label: string; // e.g. "A", "B", "C", "D", "E", "F"
  title: string; // e.g. "JANUARY 15"
  subTitle?: string;
  emoji?: string;
  cardType?: 'calendar' | 'flag' | 'picture' | 'letter';
  dayNumber?: string;
  monthName?: string;
  bgGradient?: string;
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
  audioTranscript?: string; // Full transcript of dialogue with Vietnamese translation
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  grammarFocus?: string; // Important grammar rule
  vietnameseTranslation?: string; // Tạm dịch tiếng Việt
  hint?: string;
  scrambledWords?: string[]; // for sentence reorder
  wordToUnscramble?: string; // for word unscramble (e.g. APION -> PIANO)
  letterBlanks?: { textBefore: string; blankLetters: string; textAfter: string; fullWord: string; meaning: string };
  visualCards?: VisualCardItem[];
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


  // =========================================================================
  // ĐỀ THI HỌC KỲ I LỚP 4 SỐ 4 (Đề số 4 Cuối Kì 1)
  // =========================================================================
export const TERM1_EXAM_4: ExamPaper = {
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
};

  // 7. ĐỀ KIỂM TRA GIỮA KỲ II – SỐ 1
  // =========================================================================
export const MIDTERM2_EXAM_1: ExamPaper = {
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
};

  // 8. ĐỀ KIỂM TRA GIỮA KỲ II – SỐ 3
  // =========================================================================
export const MIDTERM2_EXAM_3: ExamPaper = {
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
};

  // 9. ĐỀ THI HỌC KỲ II LỚP 4 SỐ 1
  // =========================================================================
export const TERM2_EXAM_1: ExamPaper = {
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
};

  // 10. ĐỀ THI HỌC KỲ II LỚP 4 SỐ 5
  // =========================================================================
export const TERM2_EXAM_5: ExamPaper = {
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
};


// =============================================================================
// TỔNG HỢP DANH SÁCH TẤT CẢ 14 BỘ ĐỀ THI LỚP 4 CHUẨN SGK & LOIGIAIHAY.COM
// =============================================================================
export const EXAM_PAPERS: ExamPaper[] = [
  // 1. GIỮA HỌC KÌ 1 (5 Đề Chuẩn Loigiaihay.com)
  LOIGIAIHAY_EXAM_1,
  LOIGIAIHAY_EXAM_2,
  LOIGIAIHAY_EXAM_3,
  LOIGIAIHAY_EXAM_4,
  LOIGIAIHAY_EXAM_5,

  // 2. CUỐI HỌC KÌ 1 (5 Đề: Đề 1, 2, 3, 5 chuẩn Loigiaihay.com + Đề 4)
  LOIGIAIHAY_CUOIKI1_EXAM_1,
  LOIGIAIHAY_CUOIKI1_EXAM_2,
  LOIGIAIHAY_CUOIKI1_EXAM_3,
  TERM1_EXAM_4,
  LOIGIAIHAY_CUOIKI1_EXAM_5,

  // 3. GIỮA HỌC KÌ 2 (2 Đề)
  MIDTERM2_EXAM_1,
  MIDTERM2_EXAM_3,

  // 4. CUỐI HỌC KÌ 2 (2 Đề)
  TERM2_EXAM_1,
  TERM2_EXAM_5,
];
