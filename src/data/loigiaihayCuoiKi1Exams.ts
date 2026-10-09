import { ExamPaper } from './examData';

// =============================================================================
// ĐỀ KIỂM TRA CUỐI KÌ 1 – ĐỀ 1 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_CUOIKI1_EXAM_1: ExamPaper = {
  id: 'term1-exam1',
  category: 'term_1',
  categoryLabel: 'Cuối Học Kì 1',
  title: 'Đề Kiểm Tra Cuối Kì 1 – Đề 1 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe Nancy & bóng đá, Từ khác loại, Trắc nghiệm ngữ pháp, Hội thoại Nam & Mai, Đọc hiểu ảnh lớp Pedro',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 25,
  icon: '🏆',
  themeColor: 'from-amber-600 via-orange-600 to-red-600',
  questions: [
    // A. LISTENING (1 - 5)
    {
      id: 't1-e1-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and choose the correct answer (Nghe và chọn)',
      questionNumber: 1,
      questionPrompt: '1. Lắng nghe và chọn từ thích hợp: Nancy can _______ rope very well.',
      audioText: 'Nancy can skip rope very well.',
      audioTranscript: 'Speaker: Nancy can skip rope very well. (Nancy có thể nhảy dây rất giỏi.)',
      imageEmoji: '🪢',
      options: ['A. play', 'B. skip', 'C. skate', 'D. swing'],
      correctAnswer: 'B. skip',
      explanation: 'Trong bài nghe: "Nancy can skip rope very well." Cụm từ cố định: skip rope (nhảy dây).',
      grammarFocus: 'skip rope = nhảy dây (không dùng play rope).',
      vietnameseTranslation: 'Nancy có thể nhảy dây rất giỏi ➔ B. skip.',
      hint: 'Cụm từ "nhảy dây" trong tiếng Anh là "skip rope".'
    },
    {
      id: 't1-e1-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and choose the correct answer (Nghe và chọn)',
      questionNumber: 2,
      questionPrompt: '2. Lắng nghe và chọn từ thích hợp: Where is your _______?',
      audioText: 'Where is your house?',
      audioTranscript: 'Speaker: Where is your house? (Nhà của bạn ở đâu vậy?)',
      imageEmoji: '🏡',
      options: ['A. school', 'B. home', 'C. house', 'D. class'],
      correctAnswer: 'C. house',
      explanation: 'Trong bài nghe câu hỏi là: "Where is your house?" (Nhà của bạn ở đâu vậy?).',
      grammarFocus: 'Where is your house? (Hỏi vị trí ngôi nhà).',
      vietnameseTranslation: 'Nhà của bạn ở đâu vậy? ➔ C. house.',
      hint: 'Lắng nghe từ phát âm "house" /haʊs/.'
    },
    {
      id: 't1-e1-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and choose the correct answer (Nghe và chọn)',
      questionNumber: 3,
      questionPrompt: '3. Lắng nghe và chọn từ thích hợp: There are many _______ in the sky.',
      audioText: 'There are many clouds in the sky.',
      audioTranscript: 'Speaker: There are many clouds in the sky. (Có rất nhiều mây trên bầu trời.)',
      imageEmoji: '☁️',
      options: ['A. clouds', 'B. birds', 'C. kites', 'D. stars'],
      correctAnswer: 'A. clouds',
      explanation: 'Trong bài nghe: "There are many clouds in the sky." (Có rất nhiều đám mây trên trời).',
      grammarFocus: 'There are many clouds in the sky.',
      vietnameseTranslation: 'Có rất nhiều mây trên trời ➔ A. clouds.',
      hint: 'Lắng nghe từ "clouds" /klaʊdz/ (những đám mây).'
    },
    {
      id: 't1-e1-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and choose the correct answer (Nghe và chọn)',
      questionNumber: 4,
      questionPrompt: '4. Lắng nghe và chọn từ thích hợp: Let me take a look at my ______.',
      audioText: 'Let me take a look at my schedule.',
      audioTranscript: 'Speaker: Let me take a look at my schedule. (Để tôi xem lại lịch trình của mình đã.)',
      imageEmoji: '🗓️',
      options: ['A. schedule', 'B. timetable', 'C. book', 'D. phone'],
      correctAnswer: 'A. schedule',
      explanation: 'Trong bài nghe: "Let me take a look at my schedule." (Để tôi xem lịch trình của mình).',
      grammarFocus: 'schedule (n): lịch trình, thời gian biểu.',
      vietnameseTranslation: 'Để tôi xem lịch trình của mình đã ➔ A. schedule.',
      hint: 'Lắng nghe từ "schedule" /ˈskedʒ.uːl/.'
    },
    {
      id: 't1-e1-q5',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and choose the correct answer (Nghe và chọn)',
      questionNumber: 5,
      questionPrompt: '5. Lắng nghe và chọn từ thích hợp: The boys are playing _______ in the street.',
      audioText: 'The boys are playing football in the street.',
      audioTranscript: 'Speaker: The boys are playing football in the street. (Những cậu bé đang chơi đá bóng trên phố.)',
      imageEmoji: '⚽',
      options: ['A. basketball', 'B. football', 'C. tennis', 'D. baseball'],
      correctAnswer: 'B. football',
      explanation: 'Trong bài nghe: "The boys are playing football in the street." (Các cậu bé đang chơi bóng đá).',
      grammarFocus: 'play football = chơi bóng đá.',
      vietnameseTranslation: 'Các cậu bé đang chơi bóng đá trên phố ➔ B. football.',
      hint: 'Môn thể thao vua với quả bóng tròn: football.'
    },

    // B. VOCABULARY & GRAMMAR - I. Odd one out (6 - 10)
    {
      id: 't1-e1-q6',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 6,
      questionPrompt: '1. Chọn từ khác loại: morning, afternoon, evening, birthday:',
      options: ['birthday', 'morning', 'afternoon', 'evening'],
      correctAnswer: 'birthday',
      explanation: '"morning" (buổi sáng), "afternoon" (buổi chiều), "evening" (buổi tối) là các buổi trong ngày. "birthday" là ngày sinh nhật.',
      grammarFocus: 'birthday là ngày kỷ niệm, 3 từ còn lại là các buổi trong ngày.',
      hint: 'Từ nào không phải là buổi trong ngày?'
    },
    {
      id: 't1-e1-q7',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 7,
      questionPrompt: '2. Chọn từ khác loại: England, America, Vietnamese, Japan:',
      options: ['Vietnamese', 'England', 'America', 'Japan'],
      correctAnswer: 'Vietnamese',
      explanation: '"England" (nước Anh), "America" (nước Mỹ), "Japan" (nước Nhật) là tên các quốc gia. "Vietnamese" là quốc tịch hoặc ngôn ngữ (tiếng Việt).',
      grammarFocus: 'Vietnamese là quốc tịch/ngôn ngữ, các từ khác là tên nước.',
      hint: 'Từ nào chỉ quốc tịch hoặc ngôn ngữ?'
    },
    {
      id: 't1-e1-q8',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 8,
      questionPrompt: '3. Chọn từ khác loại: Science, English, subject, PE:',
      options: ['subject', 'Science', 'English', 'PE'],
      correctAnswer: 'subject',
      explanation: '"Science" (Khoa học), "English" (Tiếng Anh), "PE" (Thể dục) là tên các môn học cụ thể. "subject" là danh từ chung có nghĩa là môn học.',
      grammarFocus: 'subject là danh từ chung, các từ còn lại là tên môn học riêng.',
      hint: 'Từ nào có nghĩa chung là "môn học"?'
    },
    {
      id: 't1-e1-q9',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 9,
      questionPrompt: '4. Chọn từ khác loại: ride, tennis, dance, play:',
      options: ['tennis', 'ride', 'dance', 'play'],
      correctAnswer: 'tennis',
      explanation: '"ride" (lái/cưỡi), "dance" (khiêu vũ/nhảy), "play" (chơi) đều là động từ. "tennis" (quần vợt) là danh từ chỉ môn thể thao.',
      grammarFocus: 'tennis là danh từ môn thể thao, 3 từ còn lại là động từ hành động.',
      hint: 'Từ nào là danh từ chỉ môn thể thao?'
    },
    {
      id: 't1-e1-q10',
      type: 'odd_one_out',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Odd one out (Chọn từ khác loại)',
      questionNumber: 10,
      questionPrompt: '5. Chọn từ khác loại: Thursday, Monday, Friday, September:',
      options: ['September', 'Thursday', 'Monday', 'Friday'],
      correctAnswer: 'September',
      explanation: '"Thursday" (thứ Năm), "Monday" (thứ Hai), "Friday" (thứ Sáu) là các thứ trong tuần. "September" (tháng Chín) là tên tháng trong năm.',
      grammarFocus: 'September là tên tháng, các từ khác là các thứ trong tuần.',
      hint: 'Từ nào là tên tháng trong năm?'
    },

    // B. VOCABULARY & GRAMMAR - II. Choose the best answer (11 - 15)
    {
      id: 't1-e1-q11',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the best answer (Trắc nghiệm)',
      questionNumber: 11,
      questionPrompt: '1. _______ do you have PE? – I have it on Monday and Wednesday.',
      options: ['B. When', 'A. What', 'C. How', 'D. Where'],
      correctAnswer: 'B. When',
      explanation: 'Câu trả lời cung cấp thời gian "on Monday and Wednesday" nên câu hỏi phải dùng từ để hỏi thời gian "When" (Khi nào).',
      grammarFocus: 'When do you have + môn học? (Khi nào bạn có tiết...?)',
      vietnameseTranslation: 'Khi nào bạn có môn Thể dục? — Mình có vào thứ Hai và thứ Tư.',
      hint: 'Hỏi về thời gian dùng "When".'
    },
    {
      id: 't1-e1-q12',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the best answer (Trắc nghiệm)',
      questionNumber: 12,
      questionPrompt: '2. My hobby is _______ a film in my free time.',
      options: ['A. watching', 'B. watches', 'C. watch', 'D. to watch'],
      correctAnswer: 'A. watching',
      explanation: 'Sau cụm "My hobby is..." cần một danh động từ (V-ing) chỉ sở thích: watching a film.',
      grammarFocus: 'My hobby is + V-ing: My hobby is watching a film.',
      vietnameseTranslation: 'Sở thích của tôi là xem phim vào thời gian rảnh rỗi.',
      hint: 'Sau to be ở cấu trúc sở thích dùng động từ đuôi -ing.'
    },
    {
      id: 't1-e1-q13',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the best answer (Trắc nghiệm)',
      questionNumber: 13,
      questionPrompt: '3. What _______ does Mai have today? – She has Maths, Music, Science and English.',
      options: ['B. subjects', 'A. days', 'C. time', 'D. nationality'],
      correctAnswer: 'B. subjects',
      explanation: 'Câu trả lời liệt kê các môn học: "Maths, Music, Science and English", do đó câu hỏi phải là: "What subjects does Mai have today?".',
      grammarFocus: 'What subjects do/does + S + have today? (Hôm nay có những môn học gì?)',
      vietnameseTranslation: 'Hôm nay Mai có những môn học gì? — Bạn ấy có môn Toán, Âm nhạc, Khoa học và Tiếng Anh.',
      hint: 'Maths, Music, Science là các "subjects" (môn học).'
    },
    {
      id: 't1-e1-q14',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the best answer (Trắc nghiệm)',
      questionNumber: 14,
      questionPrompt: '4. What class is he _______?',
      options: ['A. in', 'B. at', 'C. on', 'D. with'],
      correctAnswer: 'A. in',
      explanation: 'Cấu trúc hỏi ai đó học lớp nào: "What class is he/she in?" (hoặc What class are you in?). Đi với giới từ "in".',
      grammarFocus: 'What class + to be + S + in? ➔ S + to be + in class...',
      vietnameseTranslation: 'Cậu ấy học lớp nào vậy?',
      hint: 'Học ở lớp nào ta dùng giới từ "in": in class 4A.'
    },
    {
      id: 't1-e1-q15',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Choose the best answer (Trắc nghiệm)',
      questionNumber: 15,
      questionPrompt: '5. How _______ cats do you have? – I have two.',
      options: ['D. many', 'A. do', 'B. old', 'C. much'],
      correctAnswer: 'D. many',
      explanation: '"cats" là danh từ đếm được số nhiều, hỏi về số lượng đếm được dùng "How many": How many cats do you have?',
      grammarFocus: 'How many + danh từ số nhiều + do/does + S + have?',
      vietnameseTranslation: 'Bạn có bao nhiêu con mèo? — Mình có hai con.',
      hint: 'Hỏi số lượng danh từ đếm được dùng "How many".'
    },

    // IV. Read and decide True or False (Pedro's Class Photo) (16 - 20)
    {
      id: 't1-e1-q16',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Đọc hiểu ảnh lớp Pedro)',
      questionNumber: 16,
      readingPassage:
        "Hello! My name is Pedro. I’ll tell you about my teacher and classmates. Let’s have a look at this photo of my class. Ms Anna is my form teacher. She teaches History. She is very funny and kind. This is Alberto. He is the monitor of our class. He loves Literature and Geography. Next to him is Paulo. Paulo is a good student. He loves all subjects and he is very good at English and French. The girl in a pink skirt is my best friend - Lisa. She is very beautiful and sweet. She loves Science and IT.\n\n(Tạm dịch: Xin chào! Tên mình là Pedro. Mình sẽ kể cho các bạn nghe về giáo viên và các bạn học của mình. Hãy xem bức ảnh này của lớp mình nhé. Cô Anna là giáo viên chủ nhiệm của mình. Cô ấy dạy môn Lịch sử. Cô ấy rất vui tính và tốt bụng. Đây là Alberto. Cậu ấy là lớp trưởng của lớp tụi mình. Cậu ấy yêu thích môn Văn học và Địa lý. Bên cạnh cậu ấy là Paulo. Paulo là một học sinh giỏi. Cậu ấy yêu thích tất cả các môn học và cậu ấy siêu giỏi tiếng Anh và tiếng Pháp. Cô gái mặc váy hồng là bạn thân nhất của mình - Lisa. Cô ấy rất xinh đẹp và ngọt ngào. Cô ấy yêu thích môn Khoa học và tin học.)",
      questionPrompt: '1. Ms Anna teaches History. (Cô Anna dạy môn Lịch sử.) ➔ Chọn Đúng hay Sai:',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài có câu: "Ms Anna is my form teacher. She teaches History." ➔ Đúng (True).',
      vietnameseTranslation: 'Cô Anna dạy môn Lịch sử ➔ True (T).',
      hint: 'Tìm câu có tên cô Anna và môn History.'
    },
    {
      id: 't1-e1-q17',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Đọc hiểu ảnh lớp Pedro)',
      questionNumber: 17,
      readingPassage:
        "Hello! My name is Pedro. I’ll tell you about my teacher and classmates. Let’s have a look at this photo of my class. Ms Anna is my form teacher. She teaches History. She is very funny and kind. This is Alberto. He is the monitor of our class. He loves Literature and Geography. Next to him is Paulo. Paulo is a good student. He loves all subjects and he is very good at English and French. The girl in a pink skirt is my best friend - Lisa. She is very beautiful and sweet. She loves Science and IT.",
      questionPrompt: '2. The monitor of Pedro’s class loves Literature and Math. (Lớp trưởng lớp Pedro thích Văn và Toán.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài: "Alberto. He is the monitor of our class. He loves Literature and Geography." (Văn học và Địa lý, không phải môn Toán) ➔ Sai (False).',
      vietnameseTranslation: 'Alberto yêu thích môn Văn và Địa lý, không phải môn Toán ➔ False (F).',
      hint: 'Alberto thích môn Geography, không phải Math.'
    },
    {
      id: 't1-e1-q18',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Đọc hiểu ảnh lớp Pedro)',
      questionNumber: 18,
      readingPassage:
        "Hello! My name is Pedro. I’ll tell you about my teacher and classmates. Let’s have a look at this photo of my class. Ms Anna is my form teacher. She teaches History. She is very funny and kind. This is Alberto. He is the monitor of our class. He loves Literature and Geography. Next to him is Paulo. Paulo is a good student. He loves all subjects and he is very good at English and French. The girl in a pink skirt is my best friend - Lisa. She is very beautiful and sweet. She loves Science and IT.",
      questionPrompt: '3. Paulo loves all subjects, except English. (Paulo thích tất cả môn học, trừ môn tiếng Anh.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài: "He loves all subjects and he is very good at English and French." (Paulo thích tất cả môn và còn rất giỏi tiếng Anh) ➔ Sai (False).',
      vietnameseTranslation: 'Paulo siêu giỏi tiếng Anh chứ không phải ghét tiếng Anh ➔ False (F).',
      hint: 'Paulo is very good at English and French.'
    },
    {
      id: 't1-e1-q19',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Đọc hiểu ảnh lớp Pedro)',
      questionNumber: 19,
      readingPassage:
        "Hello! My name is Pedro. I’ll tell you about my teacher and classmates. Let’s have a look at this photo of my class. Ms Anna is my form teacher. She teaches History. She is very funny and kind. This is Alberto. He is the monitor of our class. He loves Literature and Geography. Next to him is Paulo. Paulo is a good student. He loves all subjects and he is very good at English and French. The girl in a pink skirt is my best friend - Lisa. She is very beautiful and sweet. She loves Science and IT.",
      questionPrompt: '4. Paulo is Pedro’s best friend. (Paulo là bạn thân nhất của Pedro.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài viết rõ: "The girl in a pink skirt is my best friend - Lisa." (Bạn thân nhất là Lisa, không phải Paulo) ➔ Sai (False).',
      vietnameseTranslation: 'Bạn thân nhất của Pedro là bạn Lisa mặc váy hồng ➔ False (F).',
      hint: 'Tìm cụm từ "best friend - Lisa".'
    },
    {
      id: 't1-e1-q20',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Đọc hiểu ảnh lớp Pedro)',
      questionNumber: 20,
      readingPassage:
        "Hello! My name is Pedro. I’ll tell you about my teacher and classmates. Let’s have a look at this photo of my class. Ms Anna is my form teacher. She teaches History. She is very funny and kind. This is Alberto. He is the monitor of our class. He loves Literature and Geography. Next to him is Paulo. Paulo is a good student. He loves all subjects and he is very good at English and French. The girl in a pink skirt is my best friend - Lisa. She is very beautiful and sweet. She loves Science and IT.",
      questionPrompt: '5. Lisa’s favourite subjects are Science and IT. (Môn học yêu thích của Lisa là Khoa học và Tin học.) ➔ Chọn Đúng hay Sai:',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài có câu: "She loves Science and IT." (Cô ấy yêu thích môn Khoa học và Tin học) ➔ Đúng (True).',
      vietnameseTranslation: 'Lisa yêu thích môn Khoa học và Tin học ➔ True (T).',
      hint: 'Câu cuối bài: "She loves Science and IT".'
    },

    // V. Reorder the words to make correct sentences (21 - 25)
    {
      id: 't1-e1-q21',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 21,
      questionPrompt: '1. Sắp xếp các từ sau thành câu hỏi ngày tháng hoàn chỉnh: today / What / the / is / date / ?',
      scrambledWords: ['What', 'is', 'the', 'date', 'today', '?'],
      options: [
        'What is the date today?',
        'What the date is today?',
        'Is what the date today?',
        'What is today the date?'
      ],
      correctAnswer: 'What is the date today?',
      explanation: 'Cấu trúc hỏi ngày tháng hôm nay: "What is the date today?".',
      grammarFocus: 'What is the date today? = Hôm nay là ngày mấy?',
      vietnameseTranslation: 'Hôm nay là ngày mấy?',
      hint: 'Từ để hỏi "What" đứng đầu câu.'
    },
    {
      id: 't1-e1-q22',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 22,
      questionPrompt: '2. Sắp xếp các từ sau thành câu hỏi khả năng: you / Can / play / guitar / the / ?',
      scrambledWords: ['Can', 'you', 'play', 'the', 'guitar', '?'],
      options: [
        'Can you play the guitar?',
        'Can you the guitar play?',
        'You can play the guitar?',
        'Can play you the guitar?'
      ],
      correctAnswer: 'Can you play the guitar?',
      explanation: 'Cấu trúc câu hỏi Yes/No với Can: "Can + S + V + O?": Can you play the guitar?',
      grammarFocus: 'Can you play the guitar? = Bạn có biết chơi đàn ghi-ta không?',
      vietnameseTranslation: 'Bạn có thể chơi đàn ghi-ta không?',
      hint: 'Đảo trợ động từ "Can" lên đầu câu.'
    },
    {
      id: 't1-e1-q23',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 23,
      questionPrompt: '3. Sắp xếp các từ sau thành câu hỏi sinh nhật: is / birthday / When / your / ?',
      scrambledWords: ['When', 'is', 'your', 'birthday', '?'],
      options: [
        'When is your birthday?',
        'When your birthday is?',
        'Is when your birthday?',
        'When is birthday your?'
      ],
      correctAnswer: 'When is your birthday?',
      explanation: 'Cấu trúc hỏi ngày sinh nhật: "When is your birthday?".',
      grammarFocus: 'When is your birthday? = Sinh nhật của bạn khi nào?',
      vietnameseTranslation: 'Sinh nhật của bạn là khi nào?',
      hint: 'Bắt đầu bằng từ để hỏi "When is".'
    },
    {
      id: 't1-e1-q24',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 24,
      questionPrompt: '4. Sắp xếp các từ sau thành câu nói ngày sinh: December / is / birthday / second / on / the / of / My / .',
      scrambledWords: ['My', 'birthday', 'is', 'on', 'the', 'second', 'of', 'December', '.'],
      options: [
        'My birthday is on the second of December.',
        'My birthday is on second the of December.',
        'The second of December is on my birthday.',
        'My birthday is the second of on December.'
      ],
      correctAnswer: 'My birthday is on the second of December.',
      explanation: 'Cấu trúc trả lời ngày sinh: "My birthday is on the + số thứ tự + of + tháng": My birthday is on the second of December.',
      grammarFocus: 'on the + số thứ tự + of + tháng.',
      vietnameseTranslation: 'Sinh nhật của tôi vào ngày 2 tháng Mười Hai.',
      hint: 'Bắt đầu bằng chủ ngữ "My birthday is on...".'
    },
    {
      id: 't1-e1-q25',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 25,
      questionPrompt: '5. Sắp xếp các từ sau thành câu hỏi thời khóa biểu: does / have / and Math / When / English / she / ?',
      scrambledWords: ['When', 'does', 'she', 'have', 'English', 'and Math', '?'],
      options: [
        'When does she have English and Math?',
        'When does she have Math and English?',
        'When she does have English and Math?',
        'Does she when have English and Math?'
      ],
      correctAnswer: 'When does she have English and Math?',
      explanation: 'Cấu trúc hỏi lịch môn học: "When does she have English and Math?".',
      grammarFocus: 'When + does + she + have + môn học?',
      vietnameseTranslation: 'Khi nào cô ấy có môn tiếng Anh và môn Toán?',
      hint: 'Bắt đầu bằng "When does she have...".'
    }
  ]
};

// =============================================================================
// ĐỀ KIỂM TRA CUỐI KÌ 1 – ĐỀ 2 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_CUOIKI1_EXAM_2: ExamPaper = {
  id: 'term1-exam2',
  category: 'term_1',
  categoryLabel: 'Cuối Học Kì 1',
  title: 'Đề Kiểm Tra Cuối Kì 1 – Đề 2 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe sở thích Andrea & Tom, Nhìn tranh đoán từ Geography/Beach/Library, Chia động từ, Đọc hiểu bạn Nam & Rebecca',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 28,
  icon: '🎖️',
  themeColor: 'from-emerald-600 via-teal-600 to-cyan-600',
  questions: [
    // A. LISTENING - Dialogue 1 (Frank & Andrea) & Dialogue 2 (Jane & Tom) (1 - 8)
    {
      id: 't1-e2-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 1: Frank & Andrea (Nghe điền từ 1 - 4)',
      questionNumber: 1,
      questionPrompt: '1. Frank: "Can you tell me about your (1) ______?" ➔ Nghe và chọn từ đúng:',
      audioText: "Frank: Hello, Andrea. Can you tell me about your hobby? Andrea: Sure. I'm painting a picture for my mum.",
      audioTranscript:
        "Frank: Hello, Andrea. Can you tell me about your hobby? (Chào Andrea, cậu có thể kể cho tớ về sở thích của cậu không?) — Andrea: Sure. I'm painting a picture for my mum. (Chắc chắn rồi. Tớ đang vẽ tranh cho mẹ.)",
      imageEmoji: '🎨',
      options: ['hobby', 'family', 'school', 'mother'],
      correctAnswer: 'hobby',
      explanation: 'Trong đoạn 1: Frank hỏi: "Can you tell me about your hobby?" (sở thích của bạn).',
      grammarFocus: 'hobby (n): sở thích.',
      vietnameseTranslation: 'Kể cho tớ về sở thích của cậu ➔ hobby.',
      hint: 'Lắng nghe từ "hobby" /ˈhɒb.i/.'
    },
    {
      id: 't1-e2-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 1: Frank & Andrea (Nghe điền từ 1 - 4)',
      questionNumber: 2,
      questionPrompt: '2. Andrea: "Yes, I do. I like playing the (2) ______." ➔ Nghe và chọn từ đúng:',
      audioText: 'Frank: Do you like music? Andrea: Yes, I do. I like playing the guitar.',
      audioTranscript:
        "Frank: Do you like music? (Cậu có thích âm nhạc không?) — Andrea: Yes, I do. I like playing the guitar. (Có chứ. Tớ thích chơi đàn ghi-ta.)",
      imageEmoji: '🎸',
      options: ['guitar', 'piano', 'violin', 'drum'],
      correctAnswer: 'guitar',
      explanation: 'Trong bài nghe: Andrea nói: "I like playing the guitar." (chơi đàn ghi-ta).',
      grammarFocus: 'play the guitar (chơi đàn ghi-ta).',
      vietnameseTranslation: 'Tớ thích chơi đàn ghi-ta ➔ guitar.',
      hint: 'Lắng nghe từ "guitar" /ɡɪˈtɑːr/.'
    },
    {
      id: 't1-e2-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 1: Frank & Andrea (Nghe điền từ 1 - 4)',
      questionNumber: 3,
      questionPrompt: '3. Andrea: "...and I don\'t like (3) ______." ➔ Nghe và chọn từ đúng:',
      audioText: "Andrea: No, I don't like sports. I don't play football or tennis and I don't like skating.",
      audioTranscript:
        "Andrea: No, I don't like sports. I don't play football or tennis and I don't like skating. (Không, tớ không chơi bóng đá hay quần vợt và tớ cũng không thích trượt băng.)",
      imageEmoji: '⛸️',
      options: ['skating', 'swimming', 'running', 'dancing'],
      correctAnswer: 'skating',
      explanation: 'Trong bài nghe: "I don\'t like skating." (tớ không thích trượt băng).',
      grammarFocus: 'skating (n): môn trượt băng.',
      vietnameseTranslation: 'Tớ không thích trượt băng ➔ skating.',
      hint: 'Lắng nghe từ "skating" /ˈskeɪ.tɪŋ/.'
    },
    {
      id: 't1-e2-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 1: Frank & Andrea (Nghe điền từ 1 - 4)',
      questionNumber: 4,
      questionPrompt: '4. Frank: "I see. I (4) _______ your mum likes the picture." ➔ Nghe và chọn từ đúng:',
      audioText: 'Frank: I see. I hope your mum likes the picture.',
      audioTranscript: 'Frank: I see. I hope your mum likes the picture. (Tớ hiểu rồi. Mong là mẹ cậu sẽ thích bức tranh nhé.)',
      imageEmoji: '🖼️',
      options: ['hope', 'think', 'know', 'wish'],
      correctAnswer: 'hope',
      explanation: 'Trong bài nghe: Frank nói: "I hope your mum likes the picture." (Tớ hy vọng mẹ cậu thích bức tranh).',
      grammarFocus: 'hope (v): hy vọng, mong rằng.',
      vietnameseTranslation: 'Mong là mẹ cậu thích bức tranh ➔ hope.',
      hint: 'Lắng nghe từ "hope" /həʊp/.'
    },
    {
      id: 't1-e2-q5',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 2: Jane & Tom (Nghe điền từ 5 - 8)',
      questionNumber: 5,
      questionPrompt: '5. Jane: "Hi, Tom. What (5) ______ do you have?" ➔ Nghe và chọn từ đúng:',
      audioText: 'Jane: Hi, Tom. What hobbies do you have? Tom: I have lots of hobbies. Basketball, surfing and skateboarding.',
      audioTranscript:
        "Jane: Hi, Tom. What hobbies do you have? (Chào Tom, cậu có những sở thích gì thế?) — Tom: I have lots of hobbies. Basketball, surfing and skateboarding. (Tớ có nhiều sở thích lắm: Bóng rổ, lướt sóng và trượt ván.)",
      imageEmoji: '🛹',
      options: ['hobbies', 'sports', 'games', 'books'],
      correctAnswer: 'hobbies',
      explanation: 'Trong bài nghe: Jane hỏi ở dạng số nhiều: "What hobbies do you have?".',
      grammarFocus: 'What hobbies do you have? (Bạn có những sở thích gì?)',
      vietnameseTranslation: 'Cậu có những sở thích gì ➔ hobbies.',
      hint: 'Số nhiều của hobby là "hobbies".'
    },
    {
      id: 't1-e2-q6',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 2: Jane & Tom (Nghe điền từ 5 - 8)',
      questionNumber: 6,
      questionPrompt: '6. Jane: "Are you good at (6) ______?" ➔ Nghe và chọn từ đúng:',
      audioText: 'Jane: Are you good at basketball? Tom: Yes, I think so. My trainer says I am.',
      audioTranscript:
        'Jane: Are you good at basketball? (Cậu có chơi giỏi bóng rổ không?) — Tom: Yes, I think so. My trainer says I am. (Có, huấn luyện viên bảo tớ chơi giỏi.)',
      imageEmoji: '🏀',
      options: ['basketball', 'football', 'swimming', 'volleyball'],
      correctAnswer: 'basketball',
      explanation: 'Trong bài nghe: Jane hỏi: "Are you good at basketball?" (Cậu chơi bóng rổ có giỏi không?).',
      grammarFocus: 'be good at + môn thể thao.',
      vietnameseTranslation: 'Cậu có giỏi chơi bóng rổ không ➔ basketball.',
      hint: 'Môn bóng ném vào rổ: basketball.'
    },
    {
      id: 't1-e2-q7',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 2: Jane & Tom (Nghe điền từ 5 - 8)',
      questionNumber: 7,
      questionPrompt: '7. Jane: "What about playing golf? Do you like playing (7) _______?" ➔ Nghe và chọn từ đúng:',
      audioText: "Jane: What about playing golf? Do you like playing golf? Tom: No, not really. I think it's boring.",
      audioTranscript:
        "Jane: What about playing golf? Do you like playing golf? (Còn chơi gôn thì sao? Cậu có thích đánh gôn không?) — Tom: No, not really. I think it's boring. (Không hẳn. Tớ thấy nó buồn chán.)",
      imageEmoji: '⛳',
      options: ['golf', 'tennis', 'badminton', 'chess'],
      correctAnswer: 'golf',
      explanation: 'Jane hỏi về môn đánh gôn: "Do you like playing golf?".',
      grammarFocus: 'play golf (chơi gôn).',
      vietnameseTranslation: 'Cậu có thích chơi gôn không ➔ golf.',
      hint: 'Môn thể thao đánh bóng vào lỗ nhỏ: golf.'
    },
    {
      id: 't1-e2-q8',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Conversation 2: Jane & Tom (Nghe điền từ 5 - 8)',
      questionNumber: 8,
      questionPrompt: '8. Tom: "No, not really. I think it\'s (8) ______." ➔ Nghe và chọn từ đúng:',
      audioText: "Tom: No, not really. I think it's boring.",
      audioTranscript: "Tom: No, not really. I think it's boring. (Không hẳn. Tớ thấy môn đó buồn chán lắm.)",
      imageEmoji: '🥱',
      options: ['boring', 'exciting', 'difficult', 'funny'],
      correctAnswer: 'boring',
      explanation: 'Tom nhận xét: "I think it\'s boring." (Tớ nghĩ nó buồn chán).',
      grammarFocus: 'boring (adj): buồn tẻ, nhàm chán.',
      vietnameseTranslation: 'Tớ thấy nó khá nhàm chán ➔ boring.',
      hint: 'Tính từ nhàm chán: boring.'
    },

    // B. VOCABULARY & GRAMMAR - I. Look and complete the word (9 - 13)
    {
      id: 't1-e2-q9',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and complete the word (Nhìn tranh đoán từ)',
      questionNumber: 9,
      questionPrompt: '1. Nhìn tranh quả địa cầu và sách môn Địa lí 🌍: G _ _ _ _ _ _ _ _ ➔ Điền từ hoàn chỉnh:',
      imageEmoji: '🌍',
      letterBlanks: {
        textBefore: 'G',
        blankLetters: 'EOGRAPHY',
        textAfter: '',
        fullWord: 'GEOGRAPHY',
        meaning: 'Môn Địa lí'
      },
      options: ['GEOGRAPHY', 'GEOMETRY', 'GRAMMAR', 'GERMAN'],
      correctAnswer: 'GEOGRAPHY',
      explanation: 'Tranh 1 miêu tả môn học Địa lý với quả địa cầu ➔ GEOGRAPHY (môn Địa lí).',
      grammarFocus: 'Geography = môn Địa lí.',
      vietnameseTranslation: 'Môn Địa lí ➔ GEOGRAPHY.',
      hint: 'Từ bắt đầu bằng G có 9 chữ cái: GEOGRAPHY.'
    },
    {
      id: 't1-e2-q10',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and complete the word (Nhìn tranh đoán từ)',
      questionNumber: 10,
      questionPrompt: '2. Nhìn tranh sân chơi trường học với cầu trượt và xích đu 🎠: P _ _ _ _ _ _ _ _ _ ➔ Điền từ hoàn chỉnh:',
      imageEmoji: '🛝',
      letterBlanks: {
        textBefore: 'P',
        blankLetters: 'LAYGROUND',
        textAfter: '',
        fullWord: 'PLAYGROUND',
        meaning: 'Sân chơi'
      },
      options: ['PLAYGROUND', 'PARKINGLOT', 'PAVEMENT', 'PLAYGROUP'],
      correctAnswer: 'PLAYGROUND',
      explanation: 'Tranh 2 là sân chơi của trường học ➔ PLAYGROUND (sân chơi).',
      grammarFocus: 'Playground = sân chơi.',
      vietnameseTranslation: 'Sân chơi ➔ PLAYGROUND.',
      hint: 'Từ ghép giữa "play" và "ground".'
    },
    {
      id: 't1-e2-q11',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and complete the word (Nhìn tranh đoán từ)',
      questionNumber: 11,
      questionPrompt: '3. Nhìn tranh bãi biển xanh cát trắng 🏖️: B _ _ _ _ ➔ Điền từ hoàn chỉnh:',
      imageEmoji: '🏖️',
      letterBlanks: {
        textBefore: 'B',
        blankLetters: 'EACH',
        textAfter: '',
        fullWord: 'BEACH',
        meaning: 'Bãi biển'
      },
      options: ['BEACH', 'BENCH', 'BOOTS', 'BROOK'],
      correctAnswer: 'BEACH',
      explanation: 'Tranh 3 là bờ biển mát lành ➔ BEACH (bãi biển).',
      grammarFocus: 'Beach = bãi biển.',
      vietnameseTranslation: 'Bãi biển ➔ BEACH.',
      hint: 'Từ có 5 chữ cái bắt đầu bằng B: BEACH.'
    },
    {
      id: 't1-e2-q12',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and complete the word (Nhìn tranh đoán từ)',
      questionNumber: 12,
      questionPrompt: '4. Nhìn tranh các kệ sách trong thư viện trường 📚: L _ _ _ _ _ _ ➔ Điền từ hoàn chỉnh:',
      imageEmoji: '📚',
      letterBlanks: {
        textBefore: 'L',
        blankLetters: 'IBRARY',
        textAfter: '',
        fullWord: 'LIBRARY',
        meaning: 'Thư viện'
      },
      options: ['LIBRARY', 'LABORATORY', 'LECTURE', 'LOUNGE'],
      correctAnswer: 'LIBRARY',
      explanation: 'Tranh 4 là thư viện với rất nhiều giá sách ➔ LIBRARY (thư viện).',
      grammarFocus: 'Library = thư viện.',
      vietnameseTranslation: 'Thư viện ➔ LIBRARY.',
      hint: 'Nơi mượn và đọc sách: LIBRARY.'
    },
    {
      id: 't1-e2-q13',
      type: 'fill_blank',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Look and complete the word (Nhìn tranh đoán từ)',
      questionNumber: 13,
      questionPrompt: '5. Nhìn tranh 2 cây vợt và quả cầu lông 🏸: B _ _ _ _ _ _ _ _ ➔ Điền từ hoàn chỉnh:',
      imageEmoji: '🏸',
      letterBlanks: {
        textBefore: 'B',
        blankLetters: 'ADMINTON',
        textAfter: '',
        fullWord: 'BADMINTON',
        meaning: 'Môn cầu lông'
      },
      options: ['BADMINTON', 'BASKETBALL', 'BASEBALL', 'BOWLING'],
      correctAnswer: 'BADMINTON',
      explanation: 'Tranh 5 là vợt và quả cầu lông ➔ BADMINTON (môn cầu lông).',
      grammarFocus: 'Badminton = môn cầu lông.',
      vietnameseTranslation: 'Môn cầu lông ➔ BADMINTON.',
      hint: 'Môn thể thao đánh quả cầu lông: BADMINTON.'
    },

    // B. VOCABULARY & GRAMMAR - II. Verb conjugation (14 - 18)
    {
      id: 't1-e2-q14',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Chia dạng đúng của động từ',
      questionNumber: 14,
      questionPrompt: '1. What nationality ________ (be) you?',
      options: ['are', 'is', 'am', 'was'],
      correctAnswer: 'are',
      explanation: 'Chủ ngữ trong câu là "you" nên động từ to be ở hiện tại đơn đi kèm là "are": What nationality are you?',
      grammarFocus: 'What nationality + are + you?',
      vietnameseTranslation: 'Quốc tịch của bạn là gì? ➔ are.',
      hint: 'Chủ ngữ "you" đi với to be "are".'
    },
    {
      id: 't1-e2-q15',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Chia dạng đúng của động từ',
      questionNumber: 15,
      questionPrompt: '2. She likes _______ (make) models in her free time.',
      options: ['making', 'makes', 'make', 'made'],
      correctAnswer: 'making',
      explanation: 'Sau động từ "like" diễn tả sở thích, ta dùng động từ thêm đuôi -ing (V-ing): like making models.',
      grammarFocus: 'like + V-ing: like making models.',
      vietnameseTranslation: 'Cô ấy thích làm mô hình vào thời gian rảnh ➔ making.',
      hint: 'Sau like dùng động từ đuôi -ing: making.'
    },
    {
      id: 't1-e2-q16',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Chia dạng đúng của động từ',
      questionNumber: 16,
      questionPrompt: '3. What subjects _______ Nam _______ (have) today?',
      options: ['does - have', 'do - have', 'is - having', 'does - has'],
      correctAnswer: 'does - have',
      explanation: 'Chủ ngữ "Nam" là ngôi thứ 3 số ít, câu hỏi ở hiện tại đơn mượn trợ động từ "does" và động từ chính giữ nguyên thể "have".',
      grammarFocus: 'What subjects + does + Nam + have today?',
      vietnameseTranslation: 'Hôm nay Nam có những môn học gì? ➔ does – have.',
      hint: 'Chủ ngữ Nam mượn trợ động từ "does".'
    },
    {
      id: 't1-e2-q17',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Chia dạng đúng của động từ',
      questionNumber: 17,
      questionPrompt: '4. They _______ (be) in Nha Trang last weekend.',
      options: ['were', 'was', 'are', 'is'],
      correctAnswer: 'were',
      explanation: '"last weekend" là dấu hiệu thì quá khứ đơn. Chủ ngữ số nhiều "They" đi với động từ to be ở quá khứ là "were".',
      grammarFocus: 'They + were (thì quá khứ đơn với to be).',
      vietnameseTranslation: 'Họ đã ở Nha Trang vào cuối tuần trước ➔ were.',
      hint: 'Chủ ngữ "They" trong quá khứ đi với "were".'
    },
    {
      id: 't1-e2-q18',
      type: 'multiple_choice',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - II. Chia dạng đúng của động từ',
      questionNumber: 18,
      questionPrompt: '5. Hagiwara can ________ (drive) car very well.',
      options: ['drive', 'drives', 'driving', 'drove'],
      correctAnswer: 'drive',
      explanation: 'Sau động từ khuyết thiếu "can" chỉ khả năng, động từ luôn ở dạng nguyên mẫu không "to" (V-inf): can drive.',
      grammarFocus: 'S + can + V-nguyên thể: can drive car.',
      vietnameseTranslation: 'Hagiwara có thể lái xe hơi rất giỏi ➔ drive.',
      hint: 'Sau can động từ giữ nguyên mẫu: drive.'
    },

    // IV. Read and answer questions (Nam & Rebecca) (19 - 23)
    {
      id: 't1-e2-q19',
      type: 'reading',
      exerciseTitle: 'IV. Read and answer questions (Đọc hiểu về Nam và Rebecca)',
      questionNumber: 19,
      readingPassage:
        "My name is Nam. I like playing sports. My favourite sport is tennis. I don't really like playing computer games because I find it boring. On the weekend, I often read books, watch TV and go to the gym. In the Sunday afternoon, I like going out with my friends but we don't often go to the city centre. We like eating pizza and watching the movies.\nMy friend Rebecca likes sports and she plays volleyball very well. She doesn't like reading or playing computer games. She likes going to the gym too and we often go there together. Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him.\n\n(Tạm dịch: Mình tên là Nam. Mình thích chơi thể thao. Môn thể thao yêu thích của tôi là quần vợt. Mình không thích chơi các trò chơi trên máy tính lắm vì mình thấy nó nhàm chán. Vào cuối tuần, mình thường đọc sách, xem TV và đi tập thể dục. Chiều chủ nhật, mình thích đi chơi với bạn bè nhưng chúng mình không thường xuyên đến trung tâm thành phố. Chúng mình thích ăn pizza và xem phim. Cô bạn Rebecca của mình thì thích thể thao và cô ấy chơi bóng chuyền rất giỏi. Cô ấy không thích đọc sách hay chơi trò chơi trên máy tính. Cô ấy cũng thích đến phòng tập thể dục và chúng mình thường hay đến đó cùng nhau. Sở thích của cô ấy là sưu tầm những bức ảnh của ca sĩ mà cô ấy yêu thích. Cô ấy đã có đến 100 bức ảnh về anh ấy rồi.)",
      questionPrompt: '1. What is Nam’s favourite sport?',
      options: [
        'His favourite sport is tennis.',
        'His favourite sport is volleyball.',
        'His favourite sport is basketball.',
        'His favourite sport is football.'
      ],
      correctAnswer: 'His favourite sport is tennis.',
      explanation: 'Thông tin trong bài: "My favourite sport is tennis." (Môn thể thao yêu thích của tôi là quần vợt).',
      vietnameseTranslation: 'Môn thể thao yêu thích của Nam là quần vợt.',
      hint: 'Tìm câu có từ "favourite sport is...".'
    },
    {
      id: 't1-e2-q20',
      type: 'reading',
      exerciseTitle: 'IV. Read and answer questions (Đọc hiểu về Nam và Rebecca)',
      questionNumber: 20,
      readingPassage:
        "My name is Nam. I like playing sports. My favourite sport is tennis. I don't really like playing computer games because I find it boring. On the weekend, I often read books, watch TV and go to the gym. In the Sunday afternoon, I like going out with my friends but we don't often go to the city centre. We like eating pizza and watching the movies.\nMy friend Rebecca likes sports and she plays volleyball very well. She doesn't like reading or playing computer games. She likes going to the gym too and we often go there together. Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him.",
      questionPrompt: '2. Why does Nam not like playing computer games?',
      options: [
        'Because he finds it boring.',
        'Because he has no computer.',
        'Because his mother doesn’t let him.',
        'Because it is too difficult.'
      ],
      correctAnswer: 'Because he finds it boring.',
      explanation: 'Thông tin trong bài: "I don\'t really like playing computer games because I find it boring." (Bởi vì cậu ấy thấy nó nhàm chán).',
      vietnameseTranslation: 'Bởi vì cậu ấy thấy nó nhàm chán.',
      hint: 'Tìm từ "boring" trong bài.'
    },
    {
      id: 't1-e2-q21',
      type: 'reading',
      exerciseTitle: 'IV. Read and answer questions (Đọc hiểu về Nam và Rebecca)',
      questionNumber: 21,
      readingPassage:
        "My name is Nam. I like playing sports. My favourite sport is tennis. I don't really like playing computer games because I find it boring. On the weekend, I often read books, watch TV and go to the gym. In the Sunday afternoon, I like going out with my friends but we don't often go to the city centre. We like eating pizza and watching the movies.\nMy friend Rebecca likes sports and she plays volleyball very well. She doesn't like reading or playing computer games. She likes going to the gym too and we often go there together. Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him.",
      questionPrompt: '3. What does Nam often do on the weekend?',
      options: [
        'He often reads books, watches TV and goes to the gym.',
        'He often plays computer games at home.',
        'He goes to the city centre alone.',
        'He plays volleyball all day.'
      ],
      correctAnswer: 'He often reads books, watches TV and goes to the gym.',
      explanation: 'Thông tin trong bài: "On the weekend, I often read books, watch TV and go to the gym."',
      vietnameseTranslation: 'Cậu ấy thường đọc sách, xem TV và đến phòng tập thể dục.',
      hint: 'Tìm câu bắt đầu bằng "On the weekend...".'
    },
    {
      id: 't1-e2-q22',
      type: 'reading',
      exerciseTitle: 'IV. Read and answer questions (Đọc hiểu về Nam và Rebecca)',
      questionNumber: 22,
      readingPassage:
        "My name is Nam. I like playing sports. My favourite sport is tennis. I don't really like playing computer games because I find it boring. On the weekend, I often read books, watch TV and go to the gym. In the Sunday afternoon, I like going out with my friends but we don't often go to the city centre. We like eating pizza and watching the movies.\nMy friend Rebecca likes sports and she plays volleyball very well. She doesn't like reading or playing computer games. She likes going to the gym too and we often go there together. Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him.",
      questionPrompt: '4. What sport does Rebecca play well?',
      options: [
        'She plays volleyball very well.',
        'She plays tennis very well.',
        'She plays badminton very well.',
        'She plays basketball very well.'
      ],
      correctAnswer: 'She plays volleyball very well.',
      explanation: 'Thông tin trong bài: "My friend Rebecca likes sports and she plays volleyball very well."',
      vietnameseTranslation: 'Cô ấy chơi môn bóng chuyền rất giỏi.',
      hint: 'Tìm tên bạn Rebecca và từ "plays... very well".'
    },
    {
      id: 't1-e2-q23',
      type: 'reading',
      exerciseTitle: 'IV. Read and answer questions (Đọc hiểu về Nam và Rebecca)',
      questionNumber: 23,
      readingPassage:
        "My name is Nam. I like playing sports. My favourite sport is tennis. I don't really like playing computer games because I find it boring. On the weekend, I often read books, watch TV and go to the gym. In the Sunday afternoon, I like going out with my friends but we don't often go to the city centre. We like eating pizza and watching the movies.\nMy friend Rebecca likes sports and she plays volleyball very well. She doesn't like reading or playing computer games. She likes going to the gym too and we often go there together. Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him.",
      questionPrompt: '5. What is her hobby?',
      options: [
        'Her hobby is collecting pictures of her favourite singer.',
        'Her hobby is playing computer games.',
        'Her hobby is reading books.',
        'Her hobby is making kites.'
      ],
      correctAnswer: 'Her hobby is collecting pictures of her favourite singer.',
      explanation: 'Thông tin trong bài: "Her hobby is collecting pictures of her favourite singer. She has got 100 pictures of him."',
      vietnameseTranslation: 'Sở thích của cô ấy là sưu tầm những bức ảnh của ca sĩ yêu thích.',
      hint: 'Câu áp chót: "Her hobby is collecting pictures...".'
    },

    // V. Look and complete sentences (24 - 28)
    {
      id: 't1-e2-q24',
      type: 'multiple_choice',
      exerciseTitle: 'V. Look and complete sentences (Nhìn tranh viết câu)',
      questionNumber: 24,
      questionPrompt: '1. Nhìn tranh 3 cuốn sách: Mỹ thuật, Toán 4, Khoa học 4: "I have _______ today."',
      imageEmoji: '📚',
      options: [
        'Art, Math and Science',
        'English, Music and PE',
        'History, Geography and IT',
        'Math, Music and Science'
      ],
      correctAnswer: 'Art, Math and Science',
      explanation: 'Bức tranh vẽ 3 cuốn sách giáo khoa: Mĩ thuật (Art), Toán 4 (Math) và Khoa học 4 (Science).',
      grammarFocus: 'I have Art, Math and Science today.',
      vietnameseTranslation: 'Hôm nay mình có môn Mỹ thuật, Toán và Khoa học.',
      hint: 'Nhìn tên các môn trên bìa sách.'
    },
    {
      id: 't1-e2-q25',
      type: 'multiple_choice',
      exerciseTitle: 'V. Look and complete sentences (Nhìn tranh viết câu)',
      questionNumber: 25,
      questionPrompt: '2. Nhìn tranh cô bé đang chăm chú xem TV hôm qua: "She _______ yesterday."',
      imageEmoji: '📺',
      options: [
        'watched TV',
        'watches TV',
        'watch TV',
        'is watching TV'
      ],
      correctAnswer: 'watched TV',
      explanation: 'Có trạng từ quá khứ "yesterday" nên động từ "watch" phải chia ở quá khứ đơn: watched TV.',
      grammarFocus: 'S + V-ed + yesterday: watched TV.',
      vietnameseTranslation: 'Cô ấy đã xem TV vào ngày hôm qua.',
      hint: 'Động từ thêm đuôi -ed vì có "yesterday".'
    },
    {
      id: 't1-e2-q26',
      type: 'multiple_choice',
      exerciseTitle: 'V. Look and complete sentences (Nhìn tranh viết câu)',
      questionNumber: 26,
      questionPrompt: '3. Nhìn tranh các bạn nhỏ đang dán và gấp diều: "They are _______."',
      imageEmoji: '🪁',
      options: [
        'making kites',
        'flying kites',
        'drawing kites',
        'buying kites'
      ],
      correctAnswer: 'making kites',
      explanation: 'Các bạn đang dùng giấy và que tre để làm diều ➔ making kites (đang làm những con diều).',
      grammarFocus: 'make kites = làm diều; fly kites = thả diều.',
      vietnameseTranslation: 'Họ đang làm những con diều.',
      hint: 'Hành động cắt dán làm diều: making kites.'
    },
    {
      id: 't1-e2-q27',
      type: 'multiple_choice',
      exerciseTitle: 'V. Look and complete sentences (Nhìn tranh viết câu)',
      questionNumber: 27,
      questionPrompt: '4. Nhìn tranh bé gái mặc kimono cầm cờ Nhật Bản: "- Where is she from? - _______."',
      imageEmoji: '👘',
      options: [
        'She is from Japan.',
        'She is from Vietnam.',
        'She is from England.',
        'She is from America.'
      ],
      correctAnswer: 'She is from Japan.',
      explanation: 'Tranh vẽ bạn gái mặc áo kimono truyền thống và cầm lá cờ Mặt Trời đỏ của Nhật Bản ➔ She is from Japan.',
      grammarFocus: 'She is from Japan = Cô ấy đến từ Nhật Bản.',
      vietnameseTranslation: 'Cô ấy đến từ Nhật Bản.',
      hint: 'Cờ trắng có chấm tròn đỏ là nước Nhật: Japan.'
    },
    {
      id: 't1-e2-q28',
      type: 'multiple_choice',
      exerciseTitle: 'V. Look and complete sentences (Nhìn tranh viết câu)',
      questionNumber: 28,
      questionPrompt: '5. Nhìn tờ lịch ghi: Thứ Tư - 04: "- What day is it today? - _______."',
      imageEmoji: '🗓️',
      options: [
        'It’s Wednesday.',
        'It’s Tuesday.',
        'It’s Thursday.',
        'It’s Monday.'
      ],
      correctAnswer: 'It’s Wednesday.',
      explanation: 'Tờ lịch ghi rõ "Thứ Tư" ➔ Thứ Tư trong tiếng Anh là Wednesday: It’s Wednesday.',
      grammarFocus: 'What day is it today? ➔ It’s Wednesday.',
      vietnameseTranslation: 'Hôm nay là thứ Tư.',
      hint: 'Thứ Tư trong tiếng Anh là Wednesday.'
    }
  ]
};

// =============================================================================
// ĐỀ KIỂM TRA CUỐI KÌ 1 – ĐỀ 3 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_CUOIKI1_EXAM_3: ExamPaper = {
  id: 'term1-exam3',
  category: 'term_1',
  categoryLabel: 'Cuối Học Kì 1',
  title: 'Đề Kiểm Tra Cuối Kì 1 – Đề 3 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nghe đánh số 6 tranh (Máy bay/Vườn hoa/Cờ VN/Bãi biển), Nối câu hỏi đáp, Thám tử tìm lỗi sai, Đọc hiểu Giờ giải lao (Break Time)',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 26,
  icon: '🪁',
  themeColor: 'from-sky-600 via-indigo-600 to-purple-600',
  questions: [
    // A. LISTENING - Listen and number 6 pictures (1 - 6)
    {
      id: 't1-e3-q1',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 1,
      questionPrompt: 'Lắng nghe câu số 1 và chọn bức tranh tương ứng (A - F):',
      audioText: 'The planes are flying.',
      audioTranscript: 'Speaker: The planes are flying. (Những chiếc máy bay đang bay lượn trên trời.)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh C (Những chiếc máy bay)', 'Tranh D (Vườn hoa)', 'Tranh B (Bé trai chơi yo-yo)', 'Tranh E (Gấp máy bay giấy)', 'Tranh F (Cờ Việt Nam)', 'Tranh A (Bãi biển mùa hè)'],
      correctAnswer: 'Tranh C (Những chiếc máy bay)',
      explanation: 'Câu 1 trong bài nghe: "The planes are flying." (Những chiếc máy bay đang bay lượn) ➔ Tranh C.',
      vietnameseTranslation: 'Những chiếc máy bay đang bay ➔ Tranh C.',
      hint: 'Lắng nghe từ "planes are flying".'
    },
    {
      id: 't1-e3-q2',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 2,
      questionPrompt: 'Lắng nghe câu số 2 và chọn bức tranh tương ứng (A - F):',
      audioText: 'There are many flowers in the garden.',
      audioTranscript: 'Speaker: There are many flowers in the garden. (Có rất nhiều hoa rực rỡ trong vườn.)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh D (Vườn hoa)', 'Tranh C (Những chiếc máy bay)', 'Tranh B (Bé trai chơi yo-yo)', 'Tranh E (Gấp máy bay giấy)', 'Tranh F (Cờ Việt Nam)', 'Tranh A (Bãi biển mùa hè)'],
      correctAnswer: 'Tranh D (Vườn hoa)',
      explanation: 'Câu 2 trong bài nghe: "There are many flowers in the garden." (Có nhiều hoa trong vườn) ➔ Tranh D.',
      vietnameseTranslation: 'Có rất nhiều hoa trong vườn ➔ Tranh D.',
      hint: 'Lắng nghe từ "flowers in the garden".'
    },
    {
      id: 't1-e3-q3',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 3,
      questionPrompt: 'Lắng nghe câu số 3 và chọn bức tranh tương ứng (A - F):',
      audioText: 'My brother is playing with a yo-yo.',
      audioTranscript: 'Speaker: My brother is playing with a yo-yo. (Em trai tôi đang chơi với một cái yo-yo.)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh B (Bé trai chơi yo-yo)', 'Tranh C (Những chiếc máy bay)', 'Tranh D (Vườn hoa)', 'Tranh E (Gấp máy bay giấy)', 'Tranh F (Cờ Việt Nam)', 'Tranh A (Bãi biển mùa hè)'],
      correctAnswer: 'Tranh B (Bé trai chơi yo-yo)',
      explanation: 'Câu 3 trong bài nghe: "My brother is playing with a yo-yo." (Em trai chơi yo-yo) ➔ Tranh B.',
      vietnameseTranslation: 'Em trai tôi đang chơi yo-yo ➔ Tranh B.',
      hint: 'Lắng nghe từ "playing with a yo-yo".'
    },
    {
      id: 't1-e3-q4',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 4,
      questionPrompt: 'Lắng nghe câu số 4 và chọn bức tranh tương ứng (A - F):',
      audioText: 'She is making a paper plane.',
      audioTranscript: 'Speaker: She is making a paper plane. (Cô ấy đang gấp một chiếc máy bay giấy.)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh E (Gấp máy bay giấy)', 'Tranh C (Những chiếc máy bay)', 'Tranh D (Vườn hoa)', 'Tranh B (Bé trai chơi yo-yo)', 'Tranh F (Cờ Việt Nam)', 'Tranh A (Bãi biển mùa hè)'],
      correctAnswer: 'Tranh E (Gấp máy bay giấy)',
      explanation: 'Câu 4 trong bài nghe: "She is making a paper plane." (Cô bé gấp máy bay giấy) ➔ Tranh E.',
      vietnameseTranslation: 'Cô ấy đang làm máy bay giấy ➔ Tranh E.',
      hint: 'Lắng nghe từ "paper plane".'
    },
    {
      id: 't1-e3-q5',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 5,
      questionPrompt: 'Lắng nghe câu số 5 và chọn bức tranh tương ứng (A - F):',
      audioText: 'The flag of Việt Nam has two colors: red and yellow.',
      audioTranscript: 'Speaker: The flag of Việt Nam has two colors: red and yellow. (Lá cờ của Việt Nam có hai màu: đỏ và vàng.)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh F (Cờ Việt Nam)', 'Tranh C (Những chiếc máy bay)', 'Tranh D (Vườn hoa)', 'Tranh B (Bé trai chơi yo-yo)', 'Tranh E (Gấp máy bay giấy)', 'Tranh A (Bãi biển mùa hè)'],
      correctAnswer: 'Tranh F (Cờ Việt Nam)',
      explanation: 'Câu 5 trong bài nghe: "The flag of Việt Nam has two colors: red and yellow." (Cờ Việt Nam) ➔ Tranh F.',
      vietnameseTranslation: 'Cờ Việt Nam có màu đỏ và vàng ➔ Tranh F.',
      hint: 'Lắng nghe từ "flag of Việt Nam".'
    },
    {
      id: 't1-e3-q6',
      type: 'listening',
      exerciseTitle: 'A. LISTENING - Listen and number 6 pictures (Nghe và đánh số 1 - 6)',
      questionNumber: 6,
      questionPrompt: 'Lắng nghe câu số 6 và chọn bức tranh tương ứng (A - F):',
      audioText: 'Do you have any plans for your summer holiday?',
      audioTranscript: 'Speaker: Do you have any plans for your summer holiday? (Bạn đã có kế hoạch gì cho kì nghỉ hè chưa?)',
      visualCards: [
        { id: 'c3-a', label: 'A', title: 'Kì nghỉ hè (Summer holiday)', emoji: '🏖️', cardType: 'picture', bgGradient: 'from-amber-400 to-orange-500' },
        { id: 'c3-b', label: 'B', title: 'Chơi Yo-yo (Play with yo-yo)', emoji: '🪀', cardType: 'picture', bgGradient: 'from-blue-400 to-indigo-600' },
        { id: 'c3-c', label: 'C', title: 'Máy bay bay (Planes are flying)', emoji: '✈️', cardType: 'picture', bgGradient: 'from-sky-400 to-blue-600' },
        { id: 'c3-d', label: 'D', title: 'Vườn hoa (Flowers in the garden)', emoji: '🌸', cardType: 'picture', bgGradient: 'from-rose-400 to-pink-600' },
        { id: 'c3-e', label: 'E', title: 'Gấp máy bay giấy (Paper plane)', emoji: '📄', cardType: 'picture', bgGradient: 'from-teal-400 to-emerald-600' },
        { id: 'c3-f', label: 'F', title: 'Cờ Việt Nam (Flag of Viet Nam)', emoji: '🇻🇳', cardType: 'flag', bgGradient: 'from-red-500 to-yellow-500' }
      ],
      options: ['Tranh A (Bãi biển mùa hè)', 'Tranh C (Những chiếc máy bay)', 'Tranh D (Vườn hoa)', 'Tranh B (Bé trai chơi yo-yo)', 'Tranh E (Gấp máy bay giấy)', 'Tranh F (Cờ Việt Nam)'],
      correctAnswer: 'Tranh A (Bãi biển mùa hè)',
      explanation: 'Câu 6 trong bài nghe: "Do you have any plans for your summer holiday?" (Bãi biển du lịch hè) ➔ Tranh A.',
      vietnameseTranslation: 'Kế hoạch cho kì nghỉ hè ➔ Tranh A.',
      hint: 'Lắng nghe từ "summer holiday".'
    },

    // B. VOCABULARY & GRAMMAR - I. Read and match (7 - 11)
    {
      id: 't1-e3-q7',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 7,
      questionPrompt: '1. Nối câu hỏi: "Are you doing your homework?" với câu trả lời thích hợp:',
      options: ['E. Yes, I am.', 'A. I\'m in class 4A.', 'B. She can dance very well.', 'C. Playing piano and swimming.', 'D. It’s 29th of October.'],
      correctAnswer: 'E. Yes, I am.',
      explanation: 'Câu hỏi bắt đầu bằng "Are you...?" trả lời là: "Yes, I am." (hoặc No, I\'m not).',
      grammarFocus: 'Are you + V-ing? ➔ Yes, I am.',
      vietnameseTranslation: 'Bạn đang làm bài tập về nhà đúng không? — Đúng vậy.',
      hint: 'Hỏi Are you... trả lời Yes, I am.'
    },
    {
      id: 't1-e3-q8',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 8,
      questionPrompt: '2. Nối câu hỏi: "What class are you in?" với câu trả lời thích hợp:',
      options: ['A. I\'m in class 4A.', 'E. Yes, I am.', 'B. She can dance very well.', 'C. Playing piano and swimming.', 'D. It’s 29th of October.'],
      correctAnswer: 'A. I\'m in class 4A.',
      explanation: '"What class are you in?" (Bạn học lớp nào?) trả lời bằng: "I\'m in class 4A." (Mình học lớp 4A).',
      grammarFocus: 'What class are you in? ➔ I’m in class + Tên lớp.',
      vietnameseTranslation: 'Cậu học lớp nào? — Mình học ở lớp 4A.',
      hint: 'Trả lời lớp học: in class 4A.'
    },
    {
      id: 't1-e3-q9',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 9,
      questionPrompt: '3. Nối câu hỏi: "What\'s the date today?" với câu trả lời thích hợp:',
      options: ['D. It’s 29th of October.', 'A. I\'m in class 4A.', 'B. She can dance very well.', 'C. Playing piano and swimming.', 'E. Yes, I am.'],
      correctAnswer: 'D. It’s 29th of October.',
      explanation: '"What\'s the date today?" hỏi ngày tháng hôm nay, trả lời là: "It’s 29th of October." (Ngày 29 tháng 10).',
      grammarFocus: 'What’s the date today? ➔ It’s + ngày + of + tháng.',
      vietnameseTranslation: 'Hôm nay là ngày mấy? — Ngày 29 tháng 10.',
      hint: 'Câu trả lời có ngày và tháng: 29th of October.'
    },
    {
      id: 't1-e3-q10',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 10,
      questionPrompt: '4. Nối câu hỏi: "What can she do?" với câu trả lời thích hợp:',
      options: ['B. She can dance very well.', 'A. I\'m in class 4A.', 'C. Playing piano and swimming.', 'D. It’s 29th of October.', 'E. Yes, I am.'],
      correctAnswer: 'B. She can dance very well.',
      explanation: '"What can she do?" hỏi khả năng của cô ấy làm được gì ➔ trả lời: "She can dance very well." (Cô ấy có thể nhảy rất giỏi).',
      grammarFocus: 'What can she do? ➔ She can + V.',
      vietnameseTranslation: 'Cô ấy có thể làm gì? — Cô ấy có thể nhảy rất giỏi.',
      hint: 'Câu trả lời có "She can...".'
    },
    {
      id: 't1-e3-q11',
      type: 'matching',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 11,
      questionPrompt: '5. Nối câu hỏi: "What does she like doing?" với câu trả lời thích hợp:',
      options: ['C. Playing piano and swimming.', 'A. I\'m in class 4A.', 'B. She can dance very well.', 'D. It’s 29th of October.', 'E. Yes, I am.'],
      correctAnswer: 'C. Playing piano and swimming.',
      explanation: '"What does she like doing?" hỏi sở thích thích làm gì ➔ trả lời dạng V-ing: "Playing piano and swimming." (Chơi đàn dương cầm và bơi lội).',
      grammarFocus: 'like doing ➔ V-ing (Playing... and swimming).',
      vietnameseTranslation: 'Cô ấy thích làm gì? — Chơi đàn dương cầm và bơi lội.',
      hint: 'Câu trả lời ở dạng V-ing liệt kê sở thích.'
    },

    // B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (12 - 15)
    {
      id: 't1-e3-q12',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 12,
      questionPrompt: '1. Tìm lỗi sai trong câu: "I and my family often watch TV on the evening."',
      options: ['Sửa "on" thành "in"', 'Sửa "watch" thành "watches"', 'Sửa "often" thành "always"', 'Sửa "my family" thành "family me"'],
      correctAnswer: 'Sửa "on" thành "in"',
      explanation: 'Giới từ đi với các buổi trong ngày (morning, afternoon, evening) là "in": in the evening, không dùng "on" ➔ Sửa: on -> in.',
      grammarFocus: 'in the evening (vào buổi tối).',
      vietnameseTranslation: 'Gia đình tôi thường xem TV vào buổi tối ➔ in the evening.',
      hint: 'Đi trước "the evening" phải là giới từ "in".'
    },
    {
      id: 't1-e3-q13',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 13,
      questionPrompt: '2. Tìm lỗi sai trong câu: "My hobbies are playing badminton and listen to music."',
      options: ['Sửa "listen" thành "listening"', 'Sửa "are" thành "is"', 'Sửa "playing" thành "play"', 'Sửa "hobbies" thành "hobby"'],
      correctAnswer: 'Sửa "listen" thành "listening"',
      explanation: 'Trong câu liệt kê sở thích sau "are", các động từ phải cùng dạng danh động từ (V-ing): "playing badminton and listening to music" ➔ Sửa: listen -> listening.',
      grammarFocus: 'Cấu trúc song song: playing... and listening...',
      vietnameseTranslation: 'Sở thích của tôi là chơi cầu lông và nghe nhạc ➔ listening.',
      hint: 'Động từ "listen" phải thêm đuôi -ing để tương xứng với "playing".'
    },
    {
      id: 't1-e3-q14',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 14,
      questionPrompt: '3. Tìm lỗi sai trong câu: "Her birthday is on the twice of December."',
      options: ['Sửa "twice" thành "second"', 'Sửa "is" thành "are"', 'Sửa "on" thành "in"', 'Sửa "December" thành "Decembers"'],
      correctAnswer: 'Sửa "twice" thành "second"',
      explanation: 'Khi nói ngày trong tháng, ta phải dùng số thứ tự (second, third, fourth...), không dùng số lần (twice = 2 lần) ➔ Sửa: twice -> second (the second of December).',
      grammarFocus: 'the + số thứ tự (second) + of + tháng.',
      vietnameseTranslation: 'Sinh nhật cô ấy vào ngày 2 tháng 12 ➔ second.',
      hint: 'Ngày 2 dùng số thứ tự "second", không dùng "twice".'
    },
    {
      id: 't1-e3-q15',
      type: 'error_correction',
      exerciseTitle: 'B. VOCABULARY & GRAMMAR - III. Find ONE mistake and correct it (Tìm lỗi sai)',
      questionNumber: 15,
      questionPrompt: '4. Tìm lỗi sai trong câu: "What is your school? – It’s in Cau Giay street."',
      options: ['Sửa "What" thành "Where"', 'Sửa "is" thành "are"', 'Sửa "in" thành "at"', 'Sửa "your" thành "you"'],
      correctAnswer: 'Sửa "What" thành "Where"',
      explanation: 'Câu trả lời nêu địa điểm: "It’s in Cau Giay street." nên câu hỏi phải dùng từ để hỏi nơi chốn là "Where" (Ở đâu), không dùng "What" ➔ Sửa: What -> Where ("Where is your school?").',
      grammarFocus: 'Where is your school? (Trường bạn ở đâu?)',
      vietnameseTranslation: 'Trường của bạn ở đâu? — Ở đường Cầu Giấy ➔ Where.',
      hint: 'Hỏi về địa chỉ trường học dùng "Where".'
    },

    // IV. Read and decide True or False (BREAK TIME) (16 - 20)
    {
      id: 't1-e3-q16',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Giờ giải lao - Break Time)',
      questionNumber: 16,
      readingPassage:
        "BREAK TIME\nI am Han. It's a school day today and we are at break time. There are many pupils inside the classroom. Look! Trang and Nhung are drawing a picture of a flower vase. Mai, Hoang and Nam are making paper things. They are making paper planes, paper houses and paper boats. There are two pupils over there - Ninh and Nga. Nga is making a puppet and Ninh is reading a book. And here, my best friend – Hoa, is writing a dictation and I am watching a funny video about pets. They are so cute. In the school yard, some boys are playing badminton. We have a lot of fun at the break time.\n\n(Tạm dịch: GIỜ GIẢI LAO\nTôi là Hân. Hôm nay là ngày đi học và chúng tôi đang ở trong giờ giải lao. Có rất nhiều học sinh trong lớp học. Nhìn kia! Trang và Nhung đang vẽ bức tranh một chiếc lọ hoa. Mai, Hoàng và Nam đang làm những đồ vật bằng giấy. Họ đang làm máy bay giấy, nhà giấy và thuyền giấy. Có hai bạn ở đằng kia - Ninh và Nga. Nga đang làm một con rối và Ninh đang đọc sách. Và đây, bạn thân của tôi – Hoa, đang viết chính tả và tôi thì đang xem một đoạn băng hài hước về thú cưng. Chúng thật là dễ thương. Trong sân trường, có một số bạn nam đang chơi cầu lông. Chúng tôi chơi rất vui trong giờ giải lao.)",
      questionPrompt: '1. All the students are in the school yard. (Tất cả học sinh đều ở ngoài sân trường.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài có câu: "There are many pupils inside the classroom." (Có nhiều học sinh ở trong lớp), chỉ có "some boys" ở sân trường ➔ Sai (False).',
      vietnameseTranslation: 'Không phải tất cả học sinh đều ở sân trường ➔ False (F).',
      hint: 'Nhiều học sinh đang ở trong lớp học: inside the classroom.'
    },
    {
      id: 't1-e3-q17',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Giờ giải lao - Break Time)',
      questionNumber: 17,
      readingPassage:
        "BREAK TIME\nI am Han. It's a school day today and we are at break time. There are many pupils inside the classroom. Look! Trang and Nhung are drawing a picture of a flower vase. Mai, Hoang and Nam are making paper things. They are making paper planes, paper houses and paper boats. There are two pupils over there - Ninh and Nga. Nga is making a puppet and Ninh is reading a book. And here, my best friend – Hoa, is writing a dictation and I am watching a funny video about pets. They are so cute. In the school yard, some boys are playing badminton. We have a lot of fun at the break time.",
      questionPrompt: '2. Trang and Nhung are drawing. (Trang và Nhung đang vẽ tranh.) ➔ Chọn Đúng hay Sai:',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài: "Trang and Nhung are drawing a picture of a flower vase." (đang vẽ lọ hoa) ➔ Đúng (True).',
      vietnameseTranslation: 'Trang và Nhung đang vẽ tranh ➔ True (T).',
      hint: 'Tìm câu có tên "Trang and Nhung are drawing...".'
    },
    {
      id: 't1-e3-q18',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Giờ giải lao - Break Time)',
      questionNumber: 18,
      readingPassage:
        "BREAK TIME\nI am Han. It's a school day today and we are at break time. There are many pupils inside the classroom. Look! Trang and Nhung are drawing a picture of a flower vase. Mai, Hoang and Nam are making paper things. They are making paper planes, paper houses and paper boats. There are two pupils over there - Ninh and Nga. Nga is making a puppet and Ninh is reading a book. And here, my best friend – Hoa, is writing a dictation and I am watching a funny video about pets. They are so cute. In the school yard, some boys are playing badminton. We have a lot of fun at the break time.",
      questionPrompt: '3. Mai, Hoang and Nam are making paper planes, paper houses and paper boats. ➔ Chọn Đúng hay Sai:',
      options: ['True (T)', 'False (F)'],
      correctAnswer: 'True (T)',
      explanation: 'Trong bài có câu: "They are making paper planes, paper houses and paper boats." ➔ Đúng (True).',
      vietnameseTranslation: 'Mai, Hoàng và Nam đang gấp máy bay, nhà và thuyền giấy ➔ True (T).',
      hint: 'Xem câu thứ 4 của đoạn văn.'
    },
    {
      id: 't1-e3-q19',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Giờ giải lao - Break Time)',
      questionNumber: 19,
      readingPassage:
        "BREAK TIME\nI am Han. It's a school day today and we are at break time. There are many pupils inside the classroom. Look! Trang and Nhung are drawing a picture of a flower vase. Mai, Hoang and Nam are making paper things. They are making paper planes, paper houses and paper boats. There are two pupils over there - Ninh and Nga. Nga is making a puppet and Ninh is reading a book. And here, my best friend – Hoa, is writing a dictation and I am watching a funny video about pets. They are so cute. In the school yard, some boys are playing badminton. We have a lot of fun at the break time.",
      questionPrompt: '4. Ninh is making a puppet. (Ninh đang làm một con rối.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài viết: "Nga is making a puppet and Ninh is reading a book." (Nga làm con rối, còn Ninh đọc sách) ➔ Sai (False).',
      vietnameseTranslation: 'Nga mới là người làm con rối, Ninh đang đọc sách ➔ False (F).',
      hint: 'Nga làm con rối, Ninh đọc sách.'
    },
    {
      id: 't1-e3-q20',
      type: 'reading',
      exerciseTitle: 'IV. Read and decide True (T) or False (F) (Giờ giải lao - Break Time)',
      questionNumber: 20,
      readingPassage:
        "BREAK TIME\nI am Han. It's a school day today and we are at break time. There are many pupils inside the classroom. Look! Trang and Nhung are drawing a picture of a flower vase. Mai, Hoang and Nam are making paper things. They are making paper planes, paper houses and paper boats. There are two pupils over there - Ninh and Nga. Nga is making a puppet and Ninh is reading a book. And here, my best friend – Hoa, is writing a dictation and I am watching a funny video about pets. They are so cute. In the school yard, some boys are playing badminton. We have a lot of fun at the break time.",
      questionPrompt: '5. Han is watching a funny video about a baby. (Hân đang xem video về một em bé.) ➔ Chọn Đúng hay Sai:',
      options: ['False (F)', 'True (T)'],
      correctAnswer: 'False (F)',
      explanation: 'Trong bài: "I am watching a funny video about pets." (Hân xem video về thú cưng, không phải về em bé) ➔ Sai (False).',
      vietnameseTranslation: 'Hân đang xem video về thú cưng (pets), không phải em bé ➔ False (F).',
      hint: 'Tìm từ "funny video about pets".'
    },

    // V. Reorder words to make correct sentences (21 - 25)
    {
      id: 't1-e3-q21',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 21,
      questionPrompt: '1. Sắp xếp câu: at/ I/ home/ was/ morning/ yesterday/',
      scrambledWords: ['I', 'was', 'at', 'home', 'yesterday', 'morning', '.'],
      options: [
        'I was at home yesterday morning.',
        'I was home at yesterday morning.',
        'Yesterday morning I at home was.',
        'At home I was yesterday morning.'
      ],
      correctAnswer: 'I was at home yesterday morning.',
      explanation: 'Cấu trúc câu quá khứ: "S + was + at home + thời gian": I was at home yesterday morning.',
      grammarFocus: 'I was at home yesterday morning = Sáng hôm qua tôi ở nhà.',
      vietnameseTranslation: 'Tôi đã ở nhà vào sáng hôm qua.',
      hint: 'Bắt đầu bằng chủ ngữ "I was at home...".'
    },
    {
      id: 't1-e3-q22',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 22,
      questionPrompt: '2. Sắp xếp câu hỏi: does/ Science/ Julia/ When/ have / ?',
      scrambledWords: ['When', 'does', 'Julia', 'have', 'Science', '?'],
      options: [
        'When does Julia have Science?',
        'When Julia does have Science?',
        'Does Julia have when Science?',
        'When does have Julia Science?'
      ],
      correctAnswer: 'When does Julia have Science?',
      explanation: 'Cấu trúc câu hỏi thời khóa biểu: "When does + Tên riêng + have + môn học?".',
      grammarFocus: 'When does Julia have Science?',
      vietnameseTranslation: 'Khi nào Julia có môn Khoa học?',
      hint: 'Từ để hỏi "When does Julia have...".'
    },
    {
      id: 't1-e3-q23',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 23,
      questionPrompt: '3. Sắp xếp câu: subjects/ and P.E/ My/ are/ Geography/ favourite',
      scrambledWords: ['My', 'favourite', 'subjects', 'are', 'Geography', 'and P.E', '.'],
      options: [
        'My favourite subjects are Geography and P.E.',
        'My favourite subjects are P.E and Geography.',
        'Geography and P.E are my favourite subjects.',
        'My subjects favourite are Geography and P.E.'
      ],
      correctAnswer: 'My favourite subjects are Geography and P.E.',
      explanation: 'Cấu trúc nói về các môn học yêu thích: "My favourite subjects are + môn 1 and môn 2".',
      grammarFocus: 'My favourite subjects are...',
      vietnameseTranslation: 'Những môn học yêu thích của mình là môn Địa lí và Thể dục.',
      hint: 'Chủ ngữ "My favourite subjects are...".'
    },
    {
      id: 't1-e3-q24',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 24,
      questionPrompt: '4. Sắp xếp câu: making/ is/ paper boat/ now/ She/ a',
      scrambledWords: ['She', 'is', 'making', 'a', 'paper boat', 'now', '.'],
      options: [
        'She is making a paper boat now.',
        'She is a paper boat making now.',
        'She now is making a paper boat.',
        'Making is she a paper boat now.'
      ],
      correctAnswer: 'She is making a paper boat now.',
      explanation: 'Thì hiện tại tiếp diễn với trạng từ "now": "S + is + V-ing + O + now": She is making a paper boat now.',
      grammarFocus: 'She is making a paper boat now.',
      vietnameseTranslation: 'Bây giờ cô ấy đang làm một chiếc thuyền giấy.',
      hint: 'Bắt đầu bằng "She is making...".'
    },
    {
      id: 't1-e3-q25',
      type: 'reorder',
      exerciseTitle: 'V. Reorder words to make correct sentences (Sắp xếp câu hoàn chỉnh)',
      questionNumber: 25,
      questionPrompt: '5. Sắp xếp câu hỏi: yesterday/ Were/ the/ school library/ you / in / ?',
      scrambledWords: ['Were', 'you', 'in', 'the', 'school library', 'yesterday', '?'],
      options: [
        'Were you in the school library yesterday?',
        'Were you yesterday in the school library?',
        'You were in the school library yesterday?',
        'In the school library were you yesterday?'
      ],
      correctAnswer: 'Were you in the school library yesterday?',
      explanation: 'Câu hỏi Yes/No quá khứ với to be: "Were you in + địa điểm + yesterday?": Were you in the school library yesterday?',
      grammarFocus: 'Were you in the school library yesterday?',
      vietnameseTranslation: 'Hôm qua bạn có ở thư viện trường không?',
      hint: 'Bắt đầu bằng động từ to be "Were you in...".'
    }
  ]
};

// =============================================================================
// ĐỀ KIỂM TRA CUỐI KÌ 1 – ĐỀ 5 (LOIGIAIHAY.COM)
// =============================================================================
export const LOIGIAIHAY_CUOIKI1_EXAM_5: ExamPaper = {
  id: 'term1-exam5',
  category: 'term_1',
  categoryLabel: 'Cuối Học Kì 1',
  title: 'Đề Kiểm Tra Cuối Kì 1 – Đề 5 (Chuẩn Loigiaihay.com)',
  subTitle: 'Đầy đủ Nối câu hỏi đáp, Điền từ vựng History/Penfriend/Hobby, Thám tử tìm từ thừa, Trắc nghiệm ngữ pháp & Đọc hiểu bạn Julia (53 Nguyễn Du)',
  academicYear: 'Năm học 2024 - 2025 · Ban Chuyên Môn Loigiaihay.com',
  durationMinutes: 40,
  totalQuestions: 28,
  icon: '🥇',
  themeColor: 'from-blue-600 via-indigo-600 to-teal-600',
  questions: [
    // I. Read and match (1 - 5)
    {
      id: 't1-e5-q1',
      type: 'matching',
      exerciseTitle: 'I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 1,
      questionPrompt: '1. Nối câu hỏi: "Can you play any sports?" với câu trả lời thích hợp:',
      options: [
        'd. I don’t like playing sports.',
        'a. I was at my friend’s house.',
        'b. It’s in Tran Thai Tong street.',
        'c. Not really.',
        'e. I am in class 4A.'
      ],
      correctAnswer: 'd. I don’t like playing sports.',
      explanation: '"Can you play any sports?" (Bạn có chơi môn thể thao nào không?) ➔ Trả lời: "I don’t like playing sports." (Mình không thích chơi thể thao lắm).',
      grammarFocus: 'Hỏi về thể thao: Can you play any sports?',
      vietnameseTranslation: 'Cậu có chơi môn thể thao nào không? — Mình không thích chơi thể thao lắm.',
      hint: 'Câu trả lời có nhắc đến "sports".'
    },
    {
      id: 't1-e5-q2',
      type: 'matching',
      exerciseTitle: 'I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 2,
      questionPrompt: '2. Nối câu hỏi: "Where is your school?" với câu trả lời thích hợp:',
      options: [
        'b. It’s in Tran Thai Tong street.',
        'a. I was at my friend’s house.',
        'c. Not really.',
        'd. I don’t like playing sports.',
        'e. I am in class 4A.'
      ],
      correctAnswer: 'b. It’s in Tran Thai Tong street.',
      explanation: '"Where is your school?" hỏi địa chỉ trường học ➔ Trả lời vị trí đường: "It’s in Tran Thai Tong street." (Nó ở đường Trần Thái Tông).',
      grammarFocus: 'Where is your school? ➔ It’s in + tên đường.',
      vietnameseTranslation: 'Trường của bạn ở đâu? — Ở đường Trần Thái Tông.',
      hint: 'Tìm câu trả lời có tên đường phố "street".'
    },
    {
      id: 't1-e5-q3',
      type: 'matching',
      exerciseTitle: 'I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 3,
      questionPrompt: '3. Nối câu hỏi: "What class are you in?" với câu trả lời thích hợp:',
      options: [
        'e. I am in class 4A.',
        'a. I was at my friend’s house.',
        'b. It’s in Tran Thai Tong street.',
        'c. Not really.',
        'd. I don’t like playing sports.'
      ],
      correctAnswer: 'e. I am in class 4A.',
      explanation: '"What class are you in?" hỏi lớp học ➔ Trả lời: "I am in class 4A." (Mình học ở lớp 4A).',
      grammarFocus: 'What class are you in? ➔ I am in class 4A.',
      vietnameseTranslation: 'Bạn học ở lớp nào? — Mình ở lớp 4A.',
      hint: 'Tìm câu trả lời có tên lớp: class 4A.'
    },
    {
      id: 't1-e5-q4',
      type: 'matching',
      exerciseTitle: 'I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 4,
      questionPrompt: '4. Nối câu hỏi: "Do you like playing the guitar?" với câu trả lời thích hợp:',
      options: [
        'c. Not really.',
        'a. I was at my friend’s house.',
        'b. It’s in Tran Thai Tong street.',
        'd. I don’t like playing sports.',
        'e. I am in class 4A.'
      ],
      correctAnswer: 'c. Not really.',
      explanation: '"Do you like playing the guitar?" (Bạn có thích chơi đàn ghi-ta không?) ➔ Trả lời tự nhiên: "Not really." (Không hẳn).',
      grammarFocus: 'Not really = không hẳn, không thích lắm.',
      vietnameseTranslation: 'Bạn có thích chơi đàn ghi-ta không? — Không hẳn.',
      hint: 'Câu trả lời ngắn diễn tả sự ngập ngừng: Not really.'
    },
    {
      id: 't1-e5-q5',
      type: 'matching',
      exerciseTitle: 'I. Read and match (Đọc và nối câu 1 - 5)',
      questionNumber: 5,
      questionPrompt: '5. Nối câu hỏi: "Where were you yesterday?" với câu trả lời thích hợp:',
      options: [
        'a. I was at my friend’s house.',
        'b. It’s in Tran Thai Tong street.',
        'c. Not really.',
        'd. I don’t like playing sports.',
        'e. I am in class 4A.'
      ],
      correctAnswer: 'a. I was at my friend’s house.',
      explanation: '"Where were you yesterday?" hỏi bạn đã ở đâu ngày hôm qua ➔ Trả lời quá khứ: "I was at my friend’s house." (Hôm qua mình ở nhà bạn).',
      grammarFocus: 'Where were you yesterday? ➔ I was at...',
      vietnameseTranslation: 'Hôm qua bạn ở đâu? — Mình ở nhà bạn mình.',
      hint: 'Câu trả lời ở thì quá khứ "I was at...".'
    },

    // II. Complete the sentences with available words (6 - 10)
    {
      id: 't1-e5-q6',
      type: 'fill_blank',
      exerciseTitle: 'II. Complete sentences with available words (Điền từ vào chỗ trống)',
      questionNumber: 6,
      questionPrompt: '1. She likes studying English a lot. English is her ______ subject.',
      wordBank: ['favourite', 'History', 'teacher', 'hobby', 'penfriend'],
      options: ['favourite', 'History', 'teacher', 'hobby'],
      correctAnswer: 'favourite',
      explanation: 'Cô ấy rất thích học tiếng Anh, nên tiếng Anh là môn học yêu thích của cô ấy (favourite subject).',
      grammarFocus: 'favourite subject = môn học yêu thích.',
      vietnameseTranslation: 'Tiếng Anh là môn học yêu thích của cô ấy ➔ favourite.',
      hint: 'Tính từ mang nghĩa yêu thích: favourite.'
    },
    {
      id: 't1-e5-q7',
      type: 'fill_blank',
      exerciseTitle: 'II. Complete sentences with available words (Điền từ vào chỗ trống)',
      questionNumber: 7,
      questionPrompt: '2. You’ll learn about events in the past in the _______ lesson.',
      wordBank: ['History', 'favourite', 'teacher', 'hobby', 'penfriend'],
      options: ['History', 'favourite', 'teacher', 'hobby'],
      correctAnswer: 'History',
      explanation: 'Học về các sự kiện trong quá khứ (events in the past) là trong tiết học Lịch sử (History lesson).',
      grammarFocus: 'History lesson = tiết học Lịch sử.',
      vietnameseTranslation: 'Học về quá khứ trong tiết Lịch sử ➔ History.',
      hint: 'Môn học về các sự kiện trong quá khứ: History.'
    },
    {
      id: 't1-e5-q8',
      type: 'fill_blank',
      exerciseTitle: 'II. Complete sentences with available words (Điền từ vào chỗ trống)',
      questionNumber: 8,
      questionPrompt: '3. ______ is the person who teaches us at the school.',
      wordBank: ['teacher', 'History', 'favourite', 'hobby', 'penfriend'],
      options: ['Teacher', 'Doctor', 'Nurse', 'Singer'],
      correctAnswer: 'Teacher',
      explanation: 'Người dạy học cho chúng ta ở trường (the person who teaches us) là Giáo viên (Teacher).',
      grammarFocus: 'Teacher = giáo viên, thầy cô giáo.',
      vietnameseTranslation: 'Giáo viên là người dạy chúng ta ở trường ➔ Teacher.',
      hint: 'Người dạy học ở trường: Teacher.'
    },
    {
      id: 't1-e5-q9',
      type: 'fill_blank',
      exerciseTitle: 'II. Complete sentences with available words (Điền từ vào chỗ trống)',
      questionNumber: 9,
      questionPrompt: '4. ______ is something that you enjoy doing in your free time.',
      wordBank: ['Hobby', 'History', 'teacher', 'favourite', 'penfriend'],
      options: ['Hobby', 'Homework', 'Job', 'Class'],
      correctAnswer: 'Hobby',
      explanation: 'Điều mà bạn thích làm vào thời gian rảnh rỗi (enjoy doing in your free time) chính là Sở thích (Hobby).',
      grammarFocus: 'Hobby = sở thích.',
      vietnameseTranslation: 'Sở thích là điều bạn thích làm khi rảnh ➔ Hobby.',
      hint: 'Khái niệm sở thích cá nhân: Hobby.'
    },
    {
      id: 't1-e5-q10',
      type: 'fill_blank',
      exerciseTitle: 'II. Complete sentences with available words (Điền từ vào chỗ trống)',
      questionNumber: 10,
      questionPrompt: '5. You often write letters for your _______.',
      wordBank: ['penfriend', 'History', 'teacher', 'hobby', 'favourite'],
      options: ['penfriend', 'teacher', 'hobby', 'history'],
      correctAnswer: 'penfriend',
      explanation: 'Viết thư (write letters) cho bạn qua thư (penfriend).',
      grammarFocus: 'penfriend = bạn qua thư.',
      vietnameseTranslation: 'Bạn thường viết thư cho bạn qua thư của mình ➔ penfriend.',
      hint: 'Người bạn liên lạc qua thư từ: penfriend.'
    },

    // III. Find ONE redundant word (11 - 15)
    {
      id: 't1-e5-q11',
      type: 'multiple_choice',
      exerciseTitle: 'III. Find ONE redundant word (Thám tử tìm từ thừa trong câu)',
      questionNumber: 11,
      questionPrompt: '1. Tìm một từ thừa trong câu: "Are Linda and her friend are making a paper boat?"',
      options: ['Từ "are" thứ hai', 'Từ "Linda"', 'Từ "making"', 'Từ "paper"'],
      correctAnswer: 'Từ "are" thứ hai',
      explanation: 'Câu hỏi hiện tại tiếp diễn đã đảo "Are" lên đầu câu ("Are Linda and her friend..."), nên từ "are" thứ hai bị thừa ➔ Sửa: Bỏ từ "are" thứ hai.',
      grammarFocus: 'To be + S + V-ing? (Không lặp lại to be hai lần).',
      vietnameseTranslation: 'Bỏ từ "are" thứ hai để câu chính xác.',
      hint: 'Đã có "Are" ở đầu câu thì không cần thêm "are" nữa.'
    },
    {
      id: 't1-e5-q12',
      type: 'multiple_choice',
      exerciseTitle: 'III. Find ONE redundant word (Thám tử tìm từ thừa trong câu)',
      questionNumber: 12,
      questionPrompt: '2. Tìm một từ thừa trong câu: "Nam was usually late for his school."',
      options: ['Từ "his"', 'Từ "was"', 'Từ "usually"', 'Từ "late"'],
      correctAnswer: 'Từ "his"',
      explanation: 'Cụm từ cố định trong tiếng Anh là "late for school" (đi học muộn), không có tính từ sở hữu "his" ➔ Sửa: Bỏ từ "his".',
      grammarFocus: 'late for school = đi học muộn.',
      vietnameseTranslation: 'Bỏ từ "his" vì cụm đúng là "late for school".',
      hint: 'Cụm thành ngữ "late for school".'
    },
    {
      id: 't1-e5-q13',
      type: 'multiple_choice',
      exerciseTitle: 'III. Find ONE redundant word (Thám tử tìm từ thừa trong câu)',
      questionNumber: 13,
      questionPrompt: '3. Tìm một từ thừa trong câu: "What subjects do you have it on Monday?"',
      options: ['Từ "it"', 'Từ "subjects"', 'Từ "have"', 'Từ "on"'],
      correctAnswer: 'Từ "it"',
      explanation: 'Cấu trúc hỏi môn học: "What subjects do you have on Monday?", từ "it" bị thừa vì tân ngữ chính là "What subjects" ở đầu câu ➔ Sửa: Bỏ từ "it".',
      grammarFocus: 'What subjects + do/does + S + have + on + thứ?',
      vietnameseTranslation: 'Bỏ từ "it" để câu ngữ pháp chuẩn xác.',
      hint: 'Đã có "What subjects" làm tân ngữ nên không cần "it".'
    },
    {
      id: 't1-e5-q14',
      type: 'multiple_choice',
      exerciseTitle: 'III. Find ONE redundant word (Thám tử tìm từ thừa trong câu)',
      questionNumber: 14,
      questionPrompt: '4. Tìm một từ thừa trong câu: "What does she like to doing in her free time?"',
      options: ['Từ "to"', 'Từ "does"', 'Từ "doing"', 'Từ "her"'],
      correctAnswer: 'Từ "to"',
      explanation: 'Sau "like" dùng danh động từ "doing" trực tiếp: "like doing something", hoặc "like to do", không dùng "to doing" ➔ Sửa: Bỏ từ "to".',
      grammarFocus: 'like + V-ing: like doing.',
      vietnameseTranslation: 'Bỏ từ "to" để thành cụm "like doing".',
      hint: 'Không dùng "to" trước động từ đuôi -ing sau "like".'
    },
    {
      id: 't1-e5-q15',
      type: 'multiple_choice',
      exerciseTitle: 'III. Find ONE redundant word (Thám tử tìm từ thừa trong câu)',
      questionNumber: 15,
      questionPrompt: '5. Tìm một từ thừa trong câu: "What’s is the name of their school?"',
      options: ['Từ "is"', 'Từ "name"', 'Từ "of"', 'Từ "their"'],
      correctAnswer: 'Từ "is"',
      explanation: '"What\'s" đã là dạng viết tắt của "What is", do đó từ "is" đứng sau bị thừa lặp lại động từ to be ➔ Sửa: Bỏ từ "is".',
      grammarFocus: 'What’s = What is (đã có to be is).',
      vietnameseTranslation: 'Bỏ từ "is" vì trong "What\'s" đã có "is" rồi.',
      hint: 'Dấu phẩy s trong "What\'s" đã là "is".'
    },

    // IV. Choose the best answer (16 - 22)
    {
      id: 't1-e5-q16',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 16,
      questionPrompt: '1. Where are you ________? – I am from Korea.',
      options: ['A. from', 'B. on', 'C. in', 'D. do'],
      correctAnswer: 'A. from',
      explanation: 'Cấu trúc hỏi xuất xứ/quê quán: "Where are you from?" (Bạn đến từ đâu?).',
      grammarFocus: 'Where are you from? ➔ I am from + Tên nước.',
      vietnameseTranslation: 'Bạn đến từ đâu? — Tôi đến từ Hàn Quốc ➔ from.',
      hint: 'Đi kèm với Where are you... là giới từ "from".'
    },
    {
      id: 't1-e5-q17',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 17,
      questionPrompt: '2. What do you do on Sundays? - I ________.',
      options: ['B. go swimming', 'A. visits my friends', 'C. plays football', 'D. baking some cakes'],
      correctAnswer: 'B. go swimming',
      explanation: 'Chủ ngữ "I" ở thì hiện tại đơn đi với động từ nguyên mẫu: "go swimming" (các phương án visits hay plays đều chia số ít sai).',
      grammarFocus: 'I + V nguyên mẫu: I go swimming.',
      vietnameseTranslation: 'Bạn làm gì vào các ngày Chủ Nhật? — Mình đi bơi.',
      hint: 'Chủ ngữ "I" đi với động từ nguyên mẫu "go swimming".'
    },
    {
      id: 't1-e5-q18',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 18,
      questionPrompt: '3. How many ________ are there on the table?',
      options: ['C. boxes', 'A. book', 'B. boxs', 'D. pen'],
      correctAnswer: 'C. boxes',
      explanation: 'Sau "How many" luôn là danh từ đếm được số nhiều. Danh từ "box" tận cùng là "x" nên thêm đuôi "-es" thành "boxes".',
      grammarFocus: 'How many + danh từ số nhiều (boxes).',
      vietnameseTranslation: 'Có bao nhiêu chiếc hộp trên bàn? ➔ boxes.',
      hint: 'Danh từ tận cùng là x thêm -es thành boxes.'
    },
    {
      id: 't1-e5-q19',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 19,
      questionPrompt: '4. Do you have English today? - Yes, I _______.',
      options: ['C. do', 'A. have', 'B. has', 'D. am'],
      correctAnswer: 'C. do',
      explanation: 'Câu hỏi Yes/No với trợ động từ "Do you...?" trả lời khẳng định là: "Yes, I do."',
      grammarFocus: 'Do you...? ➔ Yes, I do.',
      vietnameseTranslation: 'Hôm nay bạn có môn tiếng Anh không? — Có, mình có ➔ do.',
      hint: 'Hỏi bằng "Do" thì trả lời bằng "do".'
    },
    {
      id: 't1-e5-q20',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 20,
      questionPrompt: '5. I didn’t go to school yesterday ______ I was sick.',
      options: ['C. because', 'A. but', 'B. and', 'D. so'],
      correctAnswer: 'C. because',
      explanation: 'Vế sau "I was sick" (tôi bị ốm) là nguyên nhân cho hành động không đi học ở vế trước, do đó dùng liên từ chỉ nguyên nhân "because" (bởi vì).',
      grammarFocus: 'because + mệnh đề chỉ nguyên nhân.',
      vietnameseTranslation: 'Tôi không đi học hôm qua bởi vì tôi bị ốm ➔ because.',
      hint: 'Liên từ chỉ lý do: because (bởi vì).'
    },
    {
      id: 't1-e5-q21',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 21,
      questionPrompt: '6. Does Jane ______ cycling in the afternoon?',
      options: ['D. like', 'A. likes', 'B. to like', 'C. liking'],
      correctAnswer: 'D. like',
      explanation: 'Trong câu hỏi đã có trợ động từ "Does", động từ chính phải ở dạng nguyên mẫu không chia: "like".',
      grammarFocus: 'Does + S + V nguyên mẫu: Does Jane like...?',
      vietnameseTranslation: 'Jane có thích đạp xe vào buổi chiều không? ➔ like.',
      hint: 'Sau trợ động từ "Does", động từ trở về nguyên mẫu.'
    },
    {
      id: 't1-e5-q22',
      type: 'multiple_choice',
      exerciseTitle: 'IV. Choose the best answer (Trắc nghiệm)',
      questionNumber: 22,
      questionPrompt: '7. Is Rei ______ out with his friends now?',
      options: ['B. going', 'A. making', 'C. doing', 'D. playing'],
      correctAnswer: 'B. going',
      explanation: 'Cụm từ "go out with somebody" có nghĩa là đi chơi ra ngoài cùng ai đó. Ở hiện tại tiếp diễn: Is Rei going out...?',
      grammarFocus: 'go out with = đi ra ngoài chơi cùng ai.',
      vietnameseTranslation: 'Bây giờ Rei đang đi chơi cùng bạn bè đúng không? ➔ going.',
      hint: 'Cụm từ đi ra ngoài: going out.'
    },

    // V. Read and answer questions (Julia at International Primary school) (23 - 27)
    {
      id: 't1-e5-q23',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu bạn Julia - Trường Quốc Tế Hà Nội)',
      questionNumber: 23,
      readingPassage:
        "Hello everyone. My name is Julia. I come from England and I'm studying at International Primary school in Ha Noi. I'm in class 4E. My school is at 53 Nguyen Du Street. At school, I have lots of friends. Here is a picture of them. This is Nhung. She is Vietnamese and she can draw very well. We often draw together. Next to her is Harry. Harry is English. He can swim and play the guitar. And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well.\n\n(Tạm dịch: Xin chào mọi người. Tên mình là Julia. Mình đến từ Anh và Mình đang học tại trường tiểu học quốc tế ở Hà Nội. Mình học lớp 4E. Trường của mình ở số 53 đường Nguyễn Du. Ở trường, mình có rất nhiều bạn bè. Đây là một hình ảnh của họ. Đây là Nhung. Bạn ấy là người Việt Nam và bạn ấy có thể vẽ rất đẹp. Chúng mình thường hay vẽ cùng nhau. Bên cạnh cô ấy là Harry. Harry là người Anh. Cậu ấy có thể bơi và chơi ghi-ta. Và đây là Maori. Maori là một cô gái người Nhật Bản. Cô ấy có thể nhảy và chơi bóng đá rất giỏi.)",
      questionPrompt: '1. Where is Julia’s school?',
      options: [
        'It’s at 53 Nguyen Du Street.',
        'It’s at 53 Tran Phu Street.',
        'It’s in Cau Giay Street.',
        'It’s in London, England.'
      ],
      correctAnswer: 'It’s at 53 Nguyen Du Street.',
      explanation: 'Thông tin trong bài: "My school is at 53 Nguyen Du Street."',
      vietnameseTranslation: 'Trường của Julia ở số 53 đường Nguyễn Du.',
      hint: 'Tìm câu có số nhà "53 Nguyen Du Street".'
    },
    {
      id: 't1-e5-q24',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu bạn Julia - Trường Quốc Tế Hà Nội)',
      questionNumber: 24,
      readingPassage:
        "Hello everyone. My name is Julia. I come from England and I'm studying at International Primary school in Ha Noi. I'm in class 4E. My school is at 53 Nguyen Du Street. At school, I have lots of friends. Here is a picture of them. This is Nhung. She is Vietnamese and she can draw very well. We often draw together. Next to her is Harry. Harry is English. He can swim and play the guitar. And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well.",
      questionPrompt: '2. Does she have many friends at school?',
      options: [
        'Yes, she does.',
        'No, she doesn’t.',
        'Yes, she has.',
        'No, she hasn’t.'
      ],
      correctAnswer: 'Yes, she does.',
      explanation: 'Thông tin trong bài: "At school, I have lots of friends." (lots of = many) ➔ Trả lời: Yes, she does.',
      vietnameseTranslation: 'Cô ấy có nhiều bạn bè ở trường không? — Có, cô ấy có.',
      hint: '"lots of friends" có nghĩa là nhiều bạn bè.'
    },
    {
      id: 't1-e5-q25',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu bạn Julia - Trường Quốc Tế Hà Nội)',
      questionNumber: 25,
      readingPassage:
        "Hello everyone. My name is Julia. I come from England and I'm studying at International Primary school in Ha Noi. I'm in class 4E. My school is at 53 Nguyen Du Street. At school, I have lots of friends. Here is a picture of them. This is Nhung. She is Vietnamese and she can draw very well. We often draw together. Next to her is Harry. Harry is English. He can swim and play the guitar. And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well.",
      questionPrompt: '3. What can Nhung do?',
      options: [
        'She can draw very well.',
        'She can play soccer.',
        'She can play the guitar.',
        'She can swim.'
      ],
      correctAnswer: 'She can draw very well.',
      explanation: 'Thông tin trong bài: "This is Nhung. She is Vietnamese and she can draw very well."',
      vietnameseTranslation: 'Nhung có thể vẽ tranh rất giỏi.',
      hint: 'Tìm câu có tên Nhung và từ "draw very well".'
    },
    {
      id: 't1-e5-q26',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu bạn Julia - Trường Quốc Tế Hà Nội)',
      questionNumber: 26,
      readingPassage:
        "Hello everyone. My name is Julia. I come from England and I'm studying at International Primary school in Ha Noi. I'm in class 4E. My school is at 53 Nguyen Du Street. At school, I have lots of friends. Here is a picture of them. This is Nhung. She is Vietnamese and she can draw very well. We often draw together. Next to her is Harry. Harry is English. He can swim and play the guitar. And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well.",
      questionPrompt: '4. Where is Harry from?',
      options: [
        'He is from England.',
        'He is from Japan.',
        'He is from Vietnam.',
        'He is from America.'
      ],
      correctAnswer: 'He is from England.',
      explanation: 'Thông tin trong bài: "Harry is English." (Harry là người Anh) ➔ He is from England (Cậu ấy đến từ nước Anh).',
      vietnameseTranslation: 'Harry đến từ nước Anh (England).',
      hint: 'Harry is English ➔ He is from England.'
    },
    {
      id: 't1-e5-q27',
      type: 'reading',
      exerciseTitle: 'V. Read and answer questions (Đọc hiểu bạn Julia - Trường Quốc Tế Hà Nội)',
      questionNumber: 27,
      readingPassage:
        "Hello everyone. My name is Julia. I come from England and I'm studying at International Primary school in Ha Noi. I'm in class 4E. My school is at 53 Nguyen Du Street. At school, I have lots of friends. Here is a picture of them. This is Nhung. She is Vietnamese and she can draw very well. We often draw together. Next to her is Harry. Harry is English. He can swim and play the guitar. And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well.",
      questionPrompt: '5. What can Maori do?',
      options: [
        'She can dance and play soccer very well.',
        'She can draw and swim.',
        'She can play the guitar and sing.',
        'She can make paper boats.'
      ],
      correctAnswer: 'She can dance and play soccer very well.',
      explanation: 'Thông tin câu cuối cùng: "And here is Maori. Maori is a Japanese girl. She can dance and play soccer very well."',
      vietnameseTranslation: 'Maori có thể khiêu vũ và chơi bóng đá rất giỏi.',
      hint: 'Tìm câu cuối: "dance and play soccer".'
    }
  ]
};
