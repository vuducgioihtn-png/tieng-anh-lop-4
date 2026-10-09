/**
 * Complete Curriculum Data for Tiếng Anh 4 - Global Success (Tập 1 & Tập 2)
 * Bộ Giáo Dục và Đào Tạo - Kết Nối Tri Thức Với Cuộc Sống
 */

export interface VocabItem {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  vietnamesePhonetic?: string; // Gợi ý đọc tiếng Việt gần gũi cho phụ huynh theo sát phiên âm Anh - Anh
  parentTip?: string;          // Mẹo phát âm khẩu hình bố mẹ nhắc con
  example: string;
  exampleIpa?: string;         // Phiên âm chuẩn Anh - Anh (RP) cho câu ví dụ
  exampleReading?: string;     // Gợi ý đọc câu ví dụ theo sát phiên âm Anh - Anh
  exampleMeaning: string;
  category?: string;
  iconEmoji: string;
}

export interface GrammarStructure {
  id: string;
  title: string;
  structure: string;
  structureIpa?: string;       // Phiên âm chuẩn Anh - Anh cho cấu trúc
  vietnameseFormula: string;
  meaning: string;
  parentReadingGuide?: string; // Phiên âm và gợi ý đọc câu cho phụ huynh
  parentNote?: string;
  dialog: {
    speakerA: string;
    textA: string;
    textAVi: string;
    textAIpa?: string;         // Phiên âm Anh - Anh câu A
    textAPhonetic?: string;    // Gợi ý đọc câu A theo sát phiên âm
    speakerB: string;
    textB: string;
    textBVi: string;
    textBIpa?: string;         // Phiên âm Anh - Anh câu B
    textBPhonetic?: string;    // Gợi ý đọc câu B theo sát phiên âm
  };
  deepExplanation: string; // Giúp học sinh hiểu sâu bản chất ngữ pháp
  memoryTrick: string; // Mẹo nhớ nhanh
  examples: string[];
}

export interface PhonicsItem {
  sound: string;
  words: {
    word: string;
    highlight: string;
    meaning: string;
    ipa?: string;              // Phiên âm chuẩn Anh - Anh
    reading?: string;          // Gợi ý đọc theo sát phiên âm
  }[];
  sentence: string;
  sentenceIpa?: string;        // Phiên âm chuẩn Anh - Anh cho câu
  sentenceReading?: string;    // Gợi ý đọc câu theo sát phiên âm
  sentenceMeaning: string;
  ruleExplanation: string;
}

export interface ParentGuide {
  overview: string;
  coreGoals: string[];
  familyRoleplays: {
    parentPrompt: string;
    parentPromptVi: string;
    parentPromptIpa?: string;
    parentPromptReading?: string;
    childResponse: string;
    childResponseVi: string;
    childResponseIpa?: string;
    childResponseReading?: string;
    coachingTip: string;
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
    why: string;
  }[];
  homeActivity: {
    name: string;
    timeNeeded: string;
    steps: string[];
    benefit: string;
  };
  praisePhrases: { en: string; vi: string; phonetic: string }[];
}

export interface InteractiveQuizItem {
  id: string;
  question: string;
  questionVi?: string;
  audioPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'choice' | 'listen' | 'fill';
}

export interface SentenceOrderGame {
  id: string;
  scrambledWords: string[];
  correctSentence: string;
  vietnameseMeaning: string;
  hint: string;
}

export interface BoardGameTile {
  index: number;
  label: string;
  type: 'question' | 'forward' | 'back' | 'skip' | 'start' | 'finish';
  stepDelta?: number;
  question?: string;
  questionVi?: string;
  correctAnswer?: string;
  options?: string[];
  icon: string;
}

export interface UnitData {
  id: string;
  volume: 1 | 2;
  unitNumber: number;
  title: string;
  vietnameseTitle: string;
  theme: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    badgeBg: string;
  };
  vocabList: VocabItem[];
  grammar: GrammarStructure[];
  phonics: PhonicsItem;
  parentGuide: ParentGuide;
  sentenceGames: SentenceOrderGame[];
  quizzes: InteractiveQuizItem[];
  boardGameTiles: BoardGameTile[];
}

export const CURRICULUM_UNITS: UnitData[] = [
  // ================= TẬP 2: UNIT 11 =================
  {
    id: 'unit-11',
    volume: 2,
    unitNumber: 11,
    title: 'My home',
    vietnameseTitle: 'Ngôi nhà của em',
    theme: 'Me and My Family',
    colorScheme: {
      primary: 'text-emerald-700',
      secondary: 'bg-emerald-50 border-emerald-200',
      accent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-800'
    },
    vocabList: [
      { id: 'v11-1', word: 'street', ipa: '/striːt/', vietnamese: 'con đường, phố (thường trong thành phố)', example: 'I live in Tran Hung Dao Street.', exampleMeaning: 'Tớ sống ở phố Trần Hưng Đạo.', iconEmoji: '🛣️' },
      { id: 'v11-2', word: 'road', ipa: '/rəʊd/', vietnamese: 'đường xá, tuyến đường', example: 'I live in Quang Trung Road.', exampleMeaning: 'Tớ sống ở đường Quang Trung.', iconEmoji: '🛤️' },
      { id: 'v11-3', word: 'busy', ipa: '/ˈbɪzi/', vietnamese: 'bận rộn, nhộn nhịp, tấp nập', example: "It's a busy street.", exampleMeaning: 'Đó là một con phố tấp nập xe cộ.', iconEmoji: '🚗' },
      { id: 'v11-4', word: 'quiet', ipa: '/ˈkwaɪət/', vietnamese: 'yên tĩnh, thanh bình', example: "It's a quiet village.", exampleMeaning: 'Đó là một ngôi làng thanh bình.', iconEmoji: '🏡' },
      { id: 'v11-5', word: 'noisy', ipa: '/ˈnɔɪzi/', vietnamese: 'ồn ào, huyên náo', example: 'The road is very noisy.', exampleMeaning: 'Con đường rất ồn ào.', iconEmoji: '📢' },
      { id: 'v11-6', word: 'flat', ipa: '/flæt/', vietnamese: 'căn hộ chung cư', example: 'I live in a small flat.', exampleMeaning: 'Tớ sống trong một căn hộ nhỏ.', iconEmoji: '🏢' },
      { id: 'v11-7', word: 'village', ipa: '/ˈvɪlɪdʒ/', vietnamese: 'ngôi làng, vùng quê', example: 'My grandparents live in a village.', exampleMeaning: 'Ông bà tớ sống ở một ngôi làng.', iconEmoji: '🌾' },
      { id: 'v11-8', word: 'town', ipa: '/taʊn/', vietnamese: 'thị trấn', example: 'He lives in a big town.', exampleMeaning: 'Cậu ấy sống ở một thị trấn lớn.', iconEmoji: '🏘️' }
    ],
    grammar: [
      {
        id: 'g11-1',
        title: 'Hỏi và trả lời về địa chỉ sinh sống',
        structure: 'Where do you live? - I live in / at + [địa chỉ]',
        vietnameseFormula: 'Where do you live? - I live in + [tên đường] / I live at + [số nhà + tên đường]',
        meaning: 'Bạn sống ở đâu? - Tớ sống ở...',
        dialog: {
          speakerA: 'Mary',
          textA: 'Where do you live, Nam?',
          textAVi: 'Cậu sống ở đâu thế Nam?',
          speakerB: 'Nam',
          textB: 'I live in Tran Hung Dao Street. / I live at 81 Tran Hung Dao Street.',
          textBVi: 'Tớ sống ở phố Trần Hưng Đạo. / Tớ sống tại số 81 phố Trần Hưng Đạo.'
        },
        deepExplanation: 'Quy tắc vàng: Nếu chỉ nói TÊN ĐƯỜNG (không có số nhà cụ thể), dùng giới từ "IN" (In Tran Hung Dao Street). Khi có SỐ NHÀ CỤ THỂ (điểm dừng chính xác), dùng giới từ "AT" (At 81 Tran Hung Dao Street).',
        memoryTrick: '"In" rộng thênh thang chỉ tên đường / "At" đích số nhà chớ vấn vương!',
        examples: [
          'Where do you live? - I live in Green Street.',
          'Where do you live? - I live at 54 Green Street.',
          'Where does she live? - She lives in a quiet village.'
        ]
      },
      {
        id: 'g11-2',
        title: 'Hỏi và miêu tả đặc điểm nơi ở',
        structure: "What's the ... like? - It's ...",
        vietnameseFormula: "What's the + [địa điểm/con đường] + like? - It's + [tính từ miêu tả: busy, quiet, noisy, big...]",
        meaning: 'Nơi đó như thế nào? - Nó rất...',
        dialog: {
          speakerA: 'Ben',
          textA: "What's the street like?",
          textAVi: 'Con phố ấy trông như thế nào?',
          speakerB: 'Linh',
          textB: "It's a busy street.",
          textBVi: 'Đó là một con phố rất nhộn nhịp, đông vui.'
        },
        deepExplanation: 'Từ "like" ở đây là giới từ mang nghĩa "giống như thế nào / trông ra sao", chứ KHÔNG PHẢI động từ "thích". Câu này dùng để hỏi về tính chất, bầu không khí xung quanh.',
        memoryTrick: '"What is... like?" không hỏi thích, mà hỏi tính chất nơi mình sinh sống!',
        examples: [
          "What's the village like? - It's a quiet village.",
          "What's the road like? - It's a noisy road.",
          "What's your flat like? - It's a small flat."
        ]
      }
    ],
    phonics: {
      sound: 'Phân biệt âm ngắn /ɪ/ và âm dài /iː/',
      words: [
        { word: 'big', highlight: 'i', meaning: 'to lớn (/bɪɡ/ - đọc dứt khoát)' },
        { word: 'street', highlight: 'ee', meaning: 'đường phố (/striːt/ - kéo dài khóe môi cười)' }
      ],
      sentence: 'They live in a big village. They live in Green Street.',
      sentenceMeaning: 'Họ sống ở một ngôi làng lớn. Họ sống ở phố Green.',
      ruleExplanation: 'Âm /ɪ/ trong "big" phát âm ngắn, mở hờ miệng. Âm /iː/ trong "street" căng miệng sang hai bên như đang mỉm cười.'
    },
    parentGuide: {
      overview: 'Unit 11 giúp con biết cách giới thiệu địa chỉ nhà mình bằng tiếng Anh và miêu tả con phố quanh nhà.',
      coreGoals: [
        'Con tự tin nói được địa chỉ nhà mình với giới từ "in" hoặc "at" chính xác.',
        'Con biết dùng 4 tính từ: busy (nhộn nhịp), quiet (yên tĩnh), noisy (ồn ào), big (lớn).',
        'Con phân biệt được âm /ɪ/ trong "big" và /iː/ trong "street".'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Where do you live, honey?',
          parentPromptVi: 'Con sống ở đâu nào?',
          childResponse: 'I live in [Tên phố của gia đình]! / I live at [Số nhà + Tên phố]!',
          childResponseVi: 'Con sống ở đường... / số nhà... ạ!',
          coachingTip: 'Bố mẹ nhắc nhẹ: Nếu con chỉ nói tên đường thì dùng "in", khi đọc cả số nhà thì dùng "at" nhé.'
        },
        {
          parentPrompt: "What's our street like?",
          parentPromptVi: 'Con phố nhà mình trông thế nào con nhỉ?',
          childResponse: "It's a busy street! (hoặc It's quiet)",
          childResponseVi: 'Đó là một con phố tấp nập / yên tĩnh ạ!',
          coachingTip: 'Chỉ tay ra ngoài cửa sổ để con liên hệ thực tế, con sẽ nhớ từ rất lâu.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'I live at Green Street.',
          correction: 'I live in Green Street.',
          why: 'Không có số nhà cụ thể thì bắt buộc dùng "in". Chỉ dùng "at" khi có số nhà: "at 54 Green Street".'
        },
        {
          mistake: "What does the street like?",
          correction: "What's the street like? (viết tắt của What is the street like?)",
          why: 'Hỏi tính chất dùng động từ to-be (is), không dùng trợ động từ "does".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Tấm danh thiếp tí hon"',
        timeNeeded: '5 phút',
        steps: [
          'Chuẩn bị một mẩu giấy nhỏ làm "Thẻ cư dân nhí".',
          'Bảo con viết tên và địa chỉ tiếng Anh của mình: Name: ..., Address: I live at...',
          'Bố mẹ đóng vai người đưa thư hỏi: "Where do you live?", con đưa thẻ và đọc to câu trả lời.'
        ],
        benefit: 'Kích thích phản xạ nói tự nhiên, con ghi nhớ địa chỉ nhà mình bằng tiếng Anh.'
      },
      praisePhrases: [
        { en: 'Well done! Super clear address!', vi: 'Giỏi lắm! Địa chỉ phát âm chuẩn rõ ràng!', phonetic: 'Wɛl dʌn! ˈsupər klɪr əˈdrɛs!' },
        { en: 'You are so smart, sweetie!', vi: 'Con yêu của bố mẹ thông minh quá!', phonetic: 'ju ɑr soʊ smɑrt, ˈswiti!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg11-1',
        scrambledWords: ['live', 'I', '81', 'at', 'Street.', 'Tran', 'Dao', 'Hung'],
        correctSentence: 'I live at 81 Tran Hung Dao Street.',
        vietnameseMeaning: 'Tớ sống ở số 81 phố Trần Hưng Đạo.',
        hint: 'Nhớ có số nhà 81 thì đứng trước số nhà phải là từ "at".'
      },
      {
        id: 'sg11-2',
        scrambledWords: ['street', 'busy', 'a', "It's", '.'],
        correctSentence: "It's a busy street.",
        vietnameseMeaning: 'Đó là một con phố nhộn nhịp.',
        hint: 'Bắt đầu bằng cụm từ "It\'s a..." rồi đến tính từ và danh từ.'
      },
      {
        id: 'sg11-3',
        scrambledWords: ['do', 'Where', 'live?', 'you'],
        correctSentence: 'Where do you live?',
        vietnameseMeaning: 'Bạn sống ở đâu?',
        hint: 'Từ để hỏi nơi chốn đứng đầu câu.'
      }
    ],
    quizzes: [
      {
        id: 'q11-1',
        question: 'Chọn từ đúng: "I live ___ 54 Green Street."',
        questionVi: 'Điền giới từ thích hợp vào chỗ trống có số nhà:',
        options: ['in', 'at', 'on', 'to'],
        correctIndex: 1,
        explanation: 'Có số nhà cụ thể (54) ta bắt buộc dùng giới từ "at".',
        type: 'choice'
      },
      {
        id: 'q11-2',
        question: 'Chọn câu trả lời đúng cho câu hỏi: "What\'s the village like?"',
        questionVi: 'Ngôi làng trông như thế nào?',
        options: ["It's a quiet village.", 'I live in a village.', 'Yes, I do.', "He's tall."],
        correctIndex: 0,
        explanation: 'Câu hỏi "What\'s ... like?" dùng để hỏi đặc điểm tính chất, câu trả lời là "It\'s a quiet village."',
        type: 'choice'
      },
      {
        id: 'q11-3',
        question: 'Từ nào có nghĩa là "yên tĩnh, thanh bình"?',
        questionVi: 'Chọn từ tiếng Anh phù hợp:',
        options: ['busy', 'noisy', 'quiet', 'street'],
        correctIndex: 2,
        explanation: 'quiet /ˈkwaɪət/ có nghĩa là yên tĩnh.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Where do you live?', type: 'question', question: 'Where do you live? (Hoàn thành: I live ___ Green Street)', options: ['in', 'at'], correctAnswer: 'in', icon: '🛣️' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⚡' },
      { index: 4, label: 'What is it like?', type: 'question', question: 'Con phố đông đúc xe cộ nói là: "It\'s a ___ street."', options: ['busy', 'quiet'], correctAnswer: 'busy', icon: '🚗' },
      { index: 5, label: 'Trúng thưởng ⭐', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 6, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 7, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 8, label: 'Phonics Big/Street', type: 'question', question: 'Từ nào chứa âm kéo dài /iː/?', options: ['street', 'big'], correctAnswer: 'street', icon: '🗣️' },
      { index: 9, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 10, label: 'Số nhà 81', type: 'question', question: 'Điền từ: "I live ___ 81 Tran Phu Road."', options: ['at', 'in'], correctAnswer: 'at', icon: '🏠' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 12 =================
  {
    id: 'unit-12',
    volume: 2,
    unitNumber: 12,
    title: 'Jobs',
    vietnameseTitle: 'Nghề nghiệp',
    theme: 'Me and My Family',
    colorScheme: {
      primary: 'text-sky-700',
      secondary: 'bg-sky-50 border-sky-200',
      accent: 'bg-sky-600 hover:bg-sky-700 text-white',
      badgeBg: 'bg-sky-100 text-sky-800'
    },
    vocabList: [
      { id: 'v12-1', word: 'farmer', ipa: '/ˈfɑːmə/', vietnamese: 'nông dân', example: 'My father is a farmer.', exampleMeaning: 'Bố tớ là một người nông dân.', iconEmoji: '🌾' },
      { id: 'v12-2', word: 'nurse', ipa: '/nɜːs/', vietnamese: 'y tá, điều dưỡng', example: "She's a nurse.", exampleMeaning: 'Cô ấy là một y tá.', iconEmoji: '👩‍⚕️' },
      { id: 'v12-3', word: 'policeman', ipa: '/pəˈliːsmən/', vietnamese: 'cảnh sát, công an', example: "He's a policeman.", exampleMeaning: 'Chú ấy là cảnh sát.', iconEmoji: '👮‍♂️' },
      { id: 'v12-4', word: 'actor', ipa: '/ˈæktə/', vietnamese: 'diễn viên nam', example: "He's an actor.", exampleMeaning: 'Chú ấy là một diễn viên.', iconEmoji: '🎭' },
      { id: 'v12-5', word: 'office worker', ipa: '/ˈɒfɪs ˈwɜːkə/', vietnamese: 'nhân viên văn phòng', example: "She's an office worker.", exampleMeaning: 'Mẹ tớ là nhân viên văn phòng.', iconEmoji: '💼' },
      { id: 'v12-6', word: 'farm', ipa: '/fɑːm/', vietnamese: 'nông trại, trang trại', example: 'He works on a farm.', exampleMeaning: 'Bác ấy làm việc ở nông trại.', iconEmoji: '🚜' },
      { id: 'v12-7', word: 'factory', ipa: '/ˈfæktri/', vietnamese: 'nhà máy, xí nghiệp', example: 'She works at a factory.', exampleMeaning: 'Cô ấy làm việc tại nhà máy.', iconEmoji: '🏭' },
      { id: 'v12-8', word: 'nursing home', ipa: '/ˈnɜːsɪŋ həʊm/', vietnamese: 'viện dưỡng lão', example: 'She works at a nursing home.', exampleMeaning: 'Cô ấy làm việc ở viện dưỡng lão.', iconEmoji: '🏥' }
    ],
    grammar: [
      {
        id: 'g12-1',
        title: 'Hỏi và trả lời về nghề nghiệp của ai đó',
        structure: 'What does he / she do? - He / She is a / an + [nghề nghiệp]',
        vietnameseFormula: 'What does he/she do? - He/She is a/an + [tên nghề nghiệp]',
        meaning: 'Anh ấy / Cô ấy làm nghề gì? - Anh ấy / Cô ấy là...',
        dialog: {
          speakerA: 'Ben',
          textA: 'What does your father do, Nam?',
          textAVi: 'Bố của cậu làm nghề gì thế Nam?',
          speakerB: 'Nam',
          textB: "He's a policeman. And what does your mother do? - She's an actor.",
          textBVi: 'Bố tớ là cảnh sát. Còn mẹ cậu làm nghề gì? - Mẹ tớ là diễn viên.'
        },
        deepExplanation: 'Dùng mạo từ "an" trước các danh từ bắt đầu bằng nguyên âm (u, e, o, a, i): "an actor", "an office worker". Các từ còn lại dùng mạo từ "a": "a farmer", "a policeman", "a nurse".',
        memoryTrick: 'Nguyên âm "U-E-O-A-I" (Uể Oải) thì phải dùng "AN" chở che!',
        examples: [
          "What does your brother do? - He's an office worker.",
          "What does she do? - She's a nurse.",
          "What does he do? - He's a farmer."
        ]
      },
      {
        id: 'g12-2',
        title: 'Hỏi và trả lời về nơi làm việc',
        structure: 'Where does he / she work? - He / She works at / on ...',
        vietnameseFormula: 'Where does he/she work? - He/She works on a farm / at a factory / at a hospital...',
        meaning: 'Anh ấy / Cô ấy làm việc ở đâu? - Anh ấy / Cô ấy làm việc ở...',
        dialog: {
          speakerA: 'Lucy',
          textA: 'Where does she work?',
          textAVi: 'Cô ấy làm việc ở đâu?',
          speakerB: 'Minh',
          textB: 'She works at a nursing home.',
          textBVi: 'Cô ấy làm việc tại một viện dưỡng lão.'
        },
        deepExplanation: 'Chú ý thêm đuôi "s" vào sau động từ: "He works", "She works" (chia thì hiện tại đơn với ngôi thứ 3 số ít). Riêng với nông trại thì dùng "on a farm", các nơi còn lại thường dùng "at a hospital / factory / school".',
        memoryTrick: 'Chủ ngữ He/She đi với động từ thêm "S" (works) liền tay!',
        examples: [
          'Where does your father work? - He works on a farm.',
          'Where does your mother work? - She works at a hospital.',
          'Where does he work? - He works at a factory.'
        ]
      }
    ],
    phonics: {
      sound: 'Ngữ âm "ar" /ɑː/ và "ur" /ɜː/',
      words: [
        { word: 'farmer', highlight: 'ar', meaning: 'nông dân (/ˈfɑːmə/ - mở rộng miệng chữ a sâu)' },
        { word: 'nurse', highlight: 'ur', meaning: 'y tá (/nɜːs/ - miệng khép vừa, âm ơ dài)' }
      ],
      sentence: 'My father is a farmer. My mother is a nurse.',
      sentenceMeaning: 'Bố tớ là nông dân. Mẹ tớ là y tá.',
      ruleExplanation: 'Nhóm chữ "ar" thường tạo âm /ɑː/ trầm và rộng. Nhóm chữ "ur" tạo âm /ɜː/ cong lưỡi nhẹ.'
    },
    parentGuide: {
      overview: 'Unit 12 giúp học sinh trò chuyện về nghề nghiệp của các thành viên trong gia đình và nơi làm việc tương ứng.',
      coreGoals: [
        'Con hỏi và trả lời trôi chảy nghề nghiệp của bố, mẹ, anh chị.',
        'Con phân biệt được "a" và "an" (a farmer vs an actor).',
        'Con biết ghép đúng cặp nghề nghiệp và nơi làm việc (farmer - on a farm, nurse - at a hospital/nursing home).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'What do I do? (Bố/Mẹ đố con bố/mẹ làm nghề gì)',
          parentPromptVi: 'Bố/mẹ làm nghề gì đố con biết nào?',
          childResponse: "You're a teacher! / You're an engineer!",
          childResponseVi: 'Bố/mẹ là giáo viên / kỹ sư ạ!',
          coachingTip: 'Sau đó bố mẹ hỏi tiếp: "Where do I work?" để con trả lời: "You work at a school / company!"'
        }
      ],
      commonMistakes: [
        {
          mistake: "He's a actor.",
          correction: "He's an actor.",
          why: '"actor" bắt đầu bằng chữ cái "a" (nguyên âm), nên bắt buộc dùng "an".'
        },
        {
          mistake: "She work at a factory.",
          correction: "She works at a factory.",
          why: 'Với He/She, động từ work phải thêm "s" thành "works".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Diễn xuất đoán nghề nghiệp" (Miming Game)',
        timeNeeded: '5 phút',
        steps: [
          'Bố mẹ làm động tác: cầm ống nghe khám bệnh, hoặc lái máy cày, hoặc gõ bàn phím.',
          'Con đoán bằng tiếng Anh: "You are a nurse!" hoặc "You are a farmer!"',
          'Đổi vai để con biểu diễn và bố mẹ đoán bằng tiếng Anh.'
        ],
        benefit: 'Tạo không khí rộn rã tiếng cười, con nhớ sâu từ vựng qua hành động cơ thể.'
      },
      praisePhrases: [
        { en: 'Awesome job! Excellent pronunciation!', vi: 'Xuất sắc! Con phát âm chuẩn quá!', phonetic: 'ˈɔsəm dʒɑb! ˈɛksələnt prəˌnʌnsiˈeɪʃən!' },
        { en: 'High five! You got it right!', vi: 'Đập tay nào! Con trả lời đúng tinh tươm!', phonetic: 'haɪ faɪv! ju ɡɑt ɪt raɪt!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg12-1',
        scrambledWords: ['does', 'do?', 'father', 'What', 'your'],
        correctSentence: 'What does your father do?',
        vietnameseMeaning: 'Bố của bạn làm nghề gì?',
        hint: 'Câu hỏi nghề nghiệp bắt đầu bằng "What does..."'
      },
      {
        id: 'sg12-2',
        scrambledWords: ['works', 'He', 'a', 'on', 'farm.'],
        correctSentence: 'He works on a farm.',
        vietnameseMeaning: 'Bác ấy làm việc ở một trang trại.',
        hint: 'Nông trại đi kèm giới từ "on".'
      },
      {
        id: 'sg12-3',
        scrambledWords: ['is', 'nurse.', 'She', 'a'] ,
        correctSentence: 'She is a nurse.',
        vietnameseMeaning: 'Cô ấy là một y tá.',
        hint: 'Chủ ngữ She đi với to-be "is".'
      }
    ],
    quizzes: [
      {
        id: 'q12-1',
        question: 'Chọn từ điền vào chỗ trống: "My uncle is ___ actor."',
        questionVi: 'Chọn mạo từ đúng trước từ "actor":',
        options: ['a', 'an', 'the', 'some'],
        correctIndex: 1,
        explanation: '"actor" bắt đầu bằng nguyên âm "a" nên dùng "an".',
        type: 'choice'
      },
      {
        id: 'q12-2',
        question: 'A farmer works on a ___.',
        questionVi: 'Người nông dân làm việc ở đâu?',
        options: ['factory', 'farm', 'hospital', 'nursing home'],
        correctIndex: 1,
        explanation: 'Người nông dân (farmer) làm việc ở trang trại (farm).',
        type: 'choice'
      },
      {
        id: 'q12-3',
        question: 'Where does she work? - She ___ at a school.',
        questionVi: 'Chọn dạng đúng của động từ:',
        options: ['work', 'works', 'working', 'worked'],
        correctIndex: 1,
        explanation: 'Chủ ngữ "She" ngôi thứ 3 số ít nên động từ thêm "s" -> "works".',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Nghề gì đây?', type: 'question', question: 'Người chăm sóc bệnh nhân gọi là gì?', options: ['nurse', 'farmer'], correctAnswer: 'nurse', icon: '👩‍⚕️' },
      { index: 3, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '⭐' },
      { index: 4, label: 'Nơi làm việc', type: 'question', question: 'Điền từ: "She works ___ a hospital."', options: ['at', 'on'], correctAnswer: 'at', icon: '🏥' },
      { index: 5, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '🚀' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'A hay An?', type: 'question', question: 'Chọn cụm đúng: ___ office worker', options: ['an', 'a'], correctAnswer: 'an', icon: '💼' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Phonics ar/ur', type: 'question', question: 'Từ "farmer" chứa cặp chữ cái nào?', options: ['ar', 'ur'], correctAnswer: 'ar', icon: '🌾' },
      { index: 10, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 13 =================
  {
    id: 'unit-13',
    volume: 2,
    unitNumber: 13,
    title: 'Appearance',
    vietnameseTitle: 'Ngoại hình',
    theme: 'Me and My Family',
    colorScheme: {
      primary: 'text-purple-700',
      secondary: 'bg-purple-50 border-purple-200',
      accent: 'bg-purple-600 hover:bg-purple-700 text-white',
      badgeBg: 'bg-purple-100 text-purple-800'
    },
    vocabList: [
      { id: 'v13-1', word: 'tall', ipa: '/tɔːl/', vietnamese: 'cao ráo', example: "He's tall.", exampleMeaning: 'Anh ấy cao.', iconEmoji: '🦒' },
      { id: 'v13-2', word: 'short', ipa: '/ʃɔːt/', vietnamese: 'thấp, lùn hoặc ngắn', example: "She's short. She has short hair.", exampleMeaning: 'Cô ấy thấp. Cô ấy có mái tóc ngắn.', iconEmoji: '🧒' },
      { id: 'v13-3', word: 'slim', ipa: '/slɪm/', vietnamese: 'thon thả, mảnh mai', example: "My mother is slim.", exampleMeaning: 'Mẹ tớ thon thả.', iconEmoji: '💃' },
      { id: 'v13-4', word: 'big', ipa: '/bɪɡ/', vietnamese: 'to lớn, vạm vỡ', example: "My dad is big.", exampleMeaning: 'Bố tớ rất to cao vạm vỡ.', iconEmoji: '🏋️' },
      { id: 'v13-5', word: 'round face', ipa: '/raʊnd feɪs/', vietnamese: 'khuôn mặt tròn', example: 'She has a round face.', exampleMeaning: 'Cô ấy có khuôn mặt tròn bầu bĩnh.', iconEmoji: '😊' },
      { id: 'v13-6', word: 'long hair', ipa: '/lɒŋ heə/', vietnamese: 'mái tóc dài', example: 'My sister has long hair.', exampleMeaning: 'Chị tớ có mái tóc dài.', iconEmoji: '💇‍♀️' },
      { id: 'v13-7', word: 'big eyes', ipa: '/bɪɡ aɪz/', vietnamese: 'đôi mắt to', example: 'The baby has big eyes.', exampleMeaning: 'Em bé có đôi mắt to tròn.', iconEmoji: '👀' }
    ],
    grammar: [
      {
        id: 'g13-1',
        title: 'Hỏi và miêu tả vóc dáng (dùng To-be)',
        structure: 'What does he / she look like? - He / She is + [tall / short / slim / big]',
        vietnameseFormula: 'What does he/she look like? - He/She is + [tính từ vóc dáng]',
        meaning: 'Anh ấy / Cô ấy trông như thế nào? - Anh/Cô ấy cao / gầy / thon thả...',
        dialog: {
          speakerA: 'Minh',
          textA: 'Do you have a brother, Lucy? What does he look like?',
          textAVi: 'Cậu có anh trai không Lucy? Anh ấy trông như thế nào?',
          speakerB: 'Lucy',
          textB: "Yes, I do. He's tall and slim.",
          textBVi: 'Có chứ. Anh ấy cao và thon thả.'
        },
        deepExplanation: 'Phân biệt cực kỳ quan trọng: Miêu tả VÓC DÁNG TOÀN THÂN dùng động từ TO-BE: "He is tall" (Anh ấy cao). Miêu tả BỘ PHẬN CƠ THỂ dùng động từ HAS: "He has big eyes" (Anh ấy CÓ đôi mắt to).',
        memoryTrick: 'Dáng người dùng "IS" (He is tall) / Bộ phận sở hữu dùng "HAS" (He has big eyes)!',
        examples: [
          "What does your mother look like? - She's slim.",
          "What does he look like? - He's tall.",
          "What do they look like? - They are big."
        ]
      },
      {
        id: 'g13-2',
        title: 'Miêu tả đặc điểm khuôn mặt, tóc, mắt (dùng Has)',
        structure: 'He / She has + [a round face / short hair / big eyes]',
        vietnameseFormula: 'He/She has + [tính từ + danh từ bộ phận]',
        meaning: 'Anh ấy / Cô ấy có...',
        dialog: {
          speakerA: 'Bill',
          textA: 'What does your father look like?',
          textAVi: 'Bố cậu trông thế nào?',
          speakerB: 'Mai',
          textB: 'He has short hair and a round face.',
          textBVi: 'Bố tớ có mái tóc ngắn và khuôn mặt tròn.'
        },
        deepExplanation: 'Với "round face" là danh từ đếm được số ít nên có "a": "a round face". Với "hair" là danh từ không đếm được nên KHÔNG dùng "a": "long hair" (chứ không nói a long hair). Với "eyes" là số nhiều nên có "s": "big eyes".',
        memoryTrick: 'Mặt tròn có "A round face" / Mái tóc "Long hair" chẳng cần chữ A!',
        examples: [
          'She has long hair.',
          'He has a round face.',
          'My sister has big eyes.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm đầu "l" /l/ và "r" /r/',
      words: [
        { word: 'long', highlight: 'l', meaning: 'dài (/lɒŋ/ - đầu lưỡi chạm chân răng trên)' },
        { word: 'round', highlight: 'r', meaning: 'tròn (/raʊnd/ - uốn lưỡi, môi tròn)' }
      ],
      sentence: 'My sister has long hair. My brother has round eyes.',
      sentenceMeaning: 'Chị tớ có tóc dài. Em trai tớ có đôi mắt tròn xoe.',
      ruleExplanation: 'Âm /l/ đầu lưỡi chạm vào nướu răng trên rồi thả ra. Âm /r/ cuộn lưỡi vào trong mà không chạm nóc miệng.'
    },
    parentGuide: {
      overview: 'Bài học giúp con biết cách nhận xét, miêu tả vẻ ngoài đáng yêu của các thành viên trong gia đình.',
      coreGoals: [
        'Con tự tin dùng câu hỏi: "What does he/she look like?"',
        'Con phân biệt rõ ràng khi nào dùng "is" (vóc dáng) và khi nào dùng "has" (tóc, mắt, mặt).',
        'Con phát âm chuẩn hai âm /l/ (long) và /r/ (round).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Look at mum in the mirror! What does mum look like?',
          parentPromptVi: 'Nhìn mẹ trong gương xem! Trông mẹ thế nào nào?',
          childResponse: "Mum is slim! Mum has long hair and a round face!",
          childResponseVi: 'Mẹ thon thả! Mẹ có mái tóc dài và khuôn mặt tròn xinh đẹp!',
          coachingTip: 'Bố mẹ có thể khen ngợi con bằng tiếng Anh: "Thank you, you have sweet eyes!"'
        }
      ],
      commonMistakes: [
        {
          mistake: "She is long hair.",
          correction: "She has long hair. (hoặc Her hair is long.)",
          why: 'Không được nói "Cô ấy LÀ tóc dài", mà phải nói "Cô ấy CÓ tóc dài" (She has long hair).'
        },
        {
          mistake: "She has a long hair.",
          correction: "She has long hair.",
          why: 'Tóc (hair) là danh từ không đếm được, không dùng "a".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Họa sĩ nhí vẽ chân dung"',
        timeNeeded: '5 phút',
        steps: [
          'Cho con một tờ giấy trắng để vẽ bố hoặc mẹ.',
          'Vừa vẽ con vừa thuyết minh bằng tiếng Anh: "This is my dad. He has big eyes. He has short hair."',
          'Treo tranh lên góc học tập để con tự hào về thành quả của mình.'
        ],
        benefit: 'Kết hợp mỹ thuật và ngôn ngữ, con khắc sâu mẫu câu tự nhiên nhất.'
      },
      praisePhrases: [
        { en: 'Brilliant description!', vi: 'Miêu tả tuyệt vời ông mặt trời!', phonetic: 'ˈbrɪljənt dɪˈskrɪpʃən!' },
        { en: 'You have such a sharp eye!', vi: 'Mắt con quan sát tinh tế quá!', phonetic: 'ju hæv sʌtʃ ə ʃɑrp aɪ!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg13-1',
        scrambledWords: ['look', 'does', 'like?', 'What', 'he'],
        correctSentence: 'What does he look like?',
        vietnameseMeaning: 'Anh ấy trông như thế nào?',
        hint: 'Mẫu câu hỏi ngoại hình: What does + S + look like?'
      },
      {
        id: 'sg13-2',
        scrambledWords: ['has', 'a', 'face.', 'round', 'She'],
        correctSentence: 'She has a round face.',
        vietnameseMeaning: 'Cô ấy có khuôn mặt tròn.',
        hint: 'Bắt đầu bằng She has...'
      },
      {
        id: 'sg13-3',
        scrambledWords: ['is', 'tall', 'father', 'slim.', 'My', 'and'],
        correctSentence: 'My father is tall and slim.',
        vietnameseMeaning: 'Bố của tớ cao và thon thả.',
        hint: 'My father is...'
      }
    ],
    quizzes: [
      {
        id: 'q13-1',
        question: 'Chọn từ đúng: "My mother has ___ hair."',
        questionVi: 'Điền từ miêu tả mái tóc:',
        options: ['tall', 'long', 'slim', 'round'],
        correctIndex: 1,
        explanation: 'Mái tóc miêu tả bằng từ "long" (dài) hoặc "short" (ngắn).',
        type: 'choice'
      },
      {
        id: 'q13-2',
        question: 'Điền động từ: "He ___ tall and strong."',
        questionVi: 'Chọn dạng đúng:',
        options: ['is', 'has', 'have', 'does'],
        correctIndex: 0,
        explanation: 'Miêu tả vóc dáng toàn thân (tall and strong) ta dùng động từ to-be "is".',
        type: 'choice'
      },
      {
        id: 'q13-3',
        question: 'Câu nào sau đây viết ĐÚNG ngữ pháp?',
        questionVi: 'Chọn câu chính xác:',
        options: ['She has a round face.', 'She is a round face.', 'She has a long hair.', 'She has round face.'],
        correctIndex: 0,
        explanation: '"She has a round face." là câu đúng hoàn chỉnh.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Trông như thế nào?', type: 'question', question: 'Hỏi ngoại hình: "What does she ___ like?"', options: ['look', 'do'], correctAnswer: 'look', icon: '👀' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⚡' },
      { index: 4, label: 'Tóc dài', type: 'question', question: 'Mái tóc dài trong tiếng Anh là gì?', options: ['long hair', 'round hair'], correctAnswer: 'long hair', icon: '💇‍♀️' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Is hay Has?', type: 'question', question: 'Điền từ: "He ___ tall."', options: ['is', 'has'], correctAnswer: 'is', icon: '🦒' },
      { index: 7, label: 'Thưởng 2 bước ⏩', type: 'forward', stepDelta: 2, icon: '🌟' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Phonics L vs R', type: 'question', question: 'Từ nào bắt đầu bằng âm /r/?', options: ['round', 'long'], correctAnswer: 'round', icon: '⭕' },
      { index: 10, label: 'Khuôn mặt tròn', type: 'question', question: 'Hoàn thành: "She has a round ___"', options: ['face', 'hair'], correctAnswer: 'face', icon: '😊' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 14 =================
  {
    id: 'unit-14',
    volume: 2,
    unitNumber: 14,
    title: 'Daily activities',
    vietnameseTitle: 'Các hoạt động hàng ngày',
    theme: 'Me and My Family',
    colorScheme: {
      primary: 'text-amber-700',
      secondary: 'bg-amber-50 border-amber-200',
      accent: 'bg-amber-600 hover:bg-amber-700 text-white',
      badgeBg: 'bg-amber-100 text-amber-800'
    },
    vocabList: [
      { id: 'v14-1', word: 'in the morning', ipa: '/ɪn ðə ˈmɔːnɪŋ/', vietnamese: 'vào buổi sáng', example: 'I wash the dishes in the morning.', exampleMeaning: 'Tớ rửa bát vào buổi sáng.', iconEmoji: '🌅' },
      { id: 'v14-2', word: 'at noon', ipa: '/æt nuːn/', vietnamese: 'vào buổi trưa', example: 'I have lunch at noon.', exampleMeaning: 'Tớ ăn trưa vào buổi trưa.', iconEmoji: '☀️' },
      { id: 'v14-3', word: 'in the afternoon', ipa: '/ɪn ði ˌɑːftəˈnuːn/', vietnamese: 'vào buổi chiều', example: 'I clean the floor in the afternoon.', exampleMeaning: 'Tớ lau nhà vào buổi chiều.', iconEmoji: '🌤️' },
      { id: 'v14-4', word: 'in the evening', ipa: '/ɪn ði ˈiːvnɪŋ/', vietnamese: 'vào buổi tối', example: 'I watch TV in the evening.', exampleMeaning: 'Tớ xem tivi vào buổi tối.', iconEmoji: '🌙' },
      { id: 'v14-5', word: 'clean the floor', ipa: '/kliːn ðə flɔː/', vietnamese: 'lau sàn nhà', example: 'I clean the floor on Sundays.', exampleMeaning: 'Tớ lau sàn nhà vào ngày Chủ nhật.', iconEmoji: '🧹' },
      { id: 'v14-6', word: 'wash the clothes', ipa: '/wɒʃ ðə kləʊðz/', vietnamese: 'giặt quần áo', example: 'I help my mum wash the clothes.', exampleMeaning: 'Tớ giúp mẹ giặt quần áo.', iconEmoji: '🧺' },
      { id: 'v14-7', word: 'help with the cooking', ipa: '/hɛlp wɪð ðə ˈkʊkɪŋ/', vietnamese: 'giúp đỡ nấu ăn', example: 'I help with the cooking in the afternoon.', exampleMeaning: 'Tớ giúp việc nấu nướng vào buổi chiều.', iconEmoji: '🍳' },
      { id: 'v14-8', word: 'wash the dishes', ipa: '/wɒʃ ðə ˈdɪʃɪz/', vietnamese: 'rửa bát đĩa', example: 'We wash the dishes together.', exampleMeaning: 'Cả nhà cùng nhau rửa bát.', iconEmoji: '🍽️' }
    ],
    grammar: [
      {
        id: 'g14-1',
        title: 'Hỏi và trả lời về thời điểm làm một hoạt động',
        structure: 'When do you ...? - I ... in the morning / at noon / in the evening',
        vietnameseFormula: 'When do you + [hoạt động]? - I + [hoạt động] + in the morning/afternoon/evening / at noon',
        meaning: 'Khi nào bạn làm việc đó? - Tớ làm vào...',
        dialog: {
          speakerA: 'Ben',
          textA: 'When do you watch TV, Mai?',
          textAVi: 'Cậu xem tivi vào lúc nào thế Mai?',
          speakerB: 'Mai',
          textB: 'I watch TV in the evening. At 7:30 pm.',
          textBVi: 'Tớ xem tivi vào buổi tối. Lúc 7 giờ 30 tối.'
        },
        deepExplanation: 'Quy tắc giới từ thời gian: Buổi sáng, chiều, tối dùng giới từ "IN THE" (in the morning, in the afternoon, in the evening). Riêng buổi trưa dùng giới từ "AT" (at noon).',
        memoryTrick: 'Sáng, chiều, tối dùng "IN THE" / Riêng buổi trưa nhớ dùng "AT NOON" tức thì!',
        examples: [
          'When do you clean the floor? - I clean the floor in the morning.',
          'When do you do housework? - I do housework at noon.',
          'When do you wash the clothes? - In the afternoon.'
        ]
      },
      {
        id: 'g14-2',
        title: 'Hỏi và trả lời về việc mình làm vào buổi nào trong ngày',
        structure: 'What do you do in the ...? - I + [hành động]',
        vietnameseFormula: 'What do you do in the morning / afternoon / evening? - I + [clean the floor / wash the dishes...]',
        meaning: 'Bạn làm gì vào buổi sáng / chiều / tối? - Tớ...',
        dialog: {
          speakerA: 'Minh',
          textA: 'What do you do in the morning?',
          textAVi: 'Bạn làm gì vào buổi sáng?',
          speakerB: 'Linh',
          textB: 'I wash the dishes and help with the cooking.',
          textBVi: 'Tớ rửa bát và giúp mẹ nấu ăn.'
        },
        deepExplanation: 'Khi kể về thói quen hàng ngày, động từ giữ nguyên mẫu (I wash, I clean, I help) vì đây là thì Hiện Tại Đơn với chủ ngữ "I".',
        memoryTrick: 'Chủ ngữ "I" làm việc nhà, động từ nguyên thể thật là dễ thương!',
        examples: [
          'What do you do in the afternoon? - I clean the floor.',
          'What do you do on Sundays? - I do housework.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm "tch" /tʃ/ và "sh" /ʃ/',
      words: [
        { word: 'watch', highlight: 'tch', meaning: 'xem (/wɒtʃ/ - bật môi như âm ch)' },
        { word: 'wash', highlight: 'sh', meaning: 'rửa, giặt (/wɒʃ/ - suỵt môi tròn như âm s nặng)' }
      ],
      sentence: 'When do you watch TV? I wash my clothes in the evening.',
      sentenceMeaning: 'Khi nào bạn xem TV? Tớ giặt quần áo vào buổi tối.',
      ruleExplanation: 'Âm "tch" trong "watch" có âm bật bật lưỡi dứt khoát. Âm "sh" trong "wash" là âm xì gió liên tục như khi làm động tác "suỵt khẽ".'
    },
    parentGuide: {
      overview: 'Bài học khuyến khích tinh thần con biết giúp đỡ gia đình làm việc nhà, đồng thời rèn luyện cách diễn đạt thời gian trong ngày.',
      coreGoals: [
        'Con nói được các công việc nhà con làm: rửa bát (wash the dishes), lau sàn (clean the floor), giúp nấu ăn (help with cooking).',
        'Con dùng đúng giới từ: in the morning/afternoon/evening và at noon.',
        'Con phân biệt được hai từ dễ nhầm lẫn nhất: watch (xem) và wash (rửa/giặt).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'What do you do in the afternoon, my helper?',
          parentPromptVi: 'Buổi chiều con giúp bố mẹ làm gì nào?',
          childResponse: 'I wash the dishes! And I clean the floor!',
          childResponseVi: 'Con rửa bát và lau sàn nhà ạ!',
          coachingTip: 'Hãy cho con thực hành rửa chiếc cốc hoặc quét nhà ngay sau đó để con cảm thấy tiếng Anh gắn liền với việc tốt mỗi ngày.'
        }
      ],
      commonMistakes: [
        {
          mistake: "I watch the dishes.",
          correction: "I wash the dishes.",
          why: 'Rất nhiều học sinh nhầm giữa "watch" (xem) và "wash" (rửa). Cần nhắc con: "wash" có chữ s như xà phòng rửa sạch!'
        },
        {
          mistake: "in noon",
          correction: "at noon",
          why: 'Buổi trưa (noon) đi với giới từ "at".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Lịch việc nhà yêu thương"',
        timeNeeded: '5 phút',
        steps: [
          'Vẽ 4 ô trên giấy: Morning, Noon, Afternoon, Evening.',
          'Hỏi con: "What do you do in the morning?" để con dán sticker hoặc vẽ hình việc con muốn làm (e.g. clean the floor).',
          'Tích sao điểm thưởng khi con hoàn thành việc nhà kèm nói tiếng Anh.'
        ],
        benefit: 'Hình thành thói quen tự lập và khả năng phản xạ ngôn ngữ thực tế.'
      },
      praisePhrases: [
        { en: 'You are my wonderful helper!', vi: 'Con là người trợ thủ tuyệt vời của bố mẹ!', phonetic: 'ju ɑr maɪ ˈwʌndərfəl ˈhɛlpər!' },
        { en: 'Great pronunciation of watch and wash!', vi: 'Con phát âm watch và wash phân biệt chuẩn lắm!', phonetic: 'ɡreɪt prəˌnʌnsiˈeɪʃən!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg14-1',
        scrambledWords: ['watch', 'When', 'TV?', 'do', 'you'],
        correctSentence: 'When do you watch TV?',
        vietnameseMeaning: 'Khi nào bạn xem tivi?',
        hint: 'Bắt đầu bằng từ để hỏi When...'
      },
      {
        id: 'sg14-2',
        scrambledWords: ['floor', 'clean', 'the', 'I', 'morning.', 'in', 'the'],
        correctSentence: 'I clean the floor in the morning.',
        vietnameseMeaning: 'Tớ lau sàn nhà vào buổi sáng.',
        hint: 'Hành động "clean the floor" rồi đến thời gian.'
      },
      {
        id: 'sg14-3',
        scrambledWords: ['wash', 'dishes', 'the', 'at', 'I', 'noon.'],
        correctSentence: 'I wash the dishes at noon.',
        vietnameseMeaning: 'Tớ rửa bát vào buổi trưa.',
        hint: 'Buổi trưa dùng at noon.'
      }
    ],
    quizzes: [
      {
        id: 'q14-1',
        question: 'Điền giới từ thích hợp: "I have lunch ___ noon."',
        questionVi: 'Chọn giới từ đúng trước từ "noon":',
        options: ['in', 'at', 'on', 'with'],
        correctIndex: 1,
        explanation: 'Trước từ "noon" (buổi trưa) ta dùng giới từ "at".',
        type: 'choice'
      },
      {
        id: 'q14-2',
        question: 'Từ nào có nghĩa là "rửa bát đĩa"?',
        questionVi: 'Chọn cụm từ đúng:',
        options: ['clean the floor', 'wash the dishes', 'watch TV', 'wash the clothes'],
        correctIndex: 1,
        explanation: '"wash the dishes" có nghĩa là rửa bát đĩa.',
        type: 'choice'
      },
      {
        id: 'q14-3',
        question: 'Phân biệt âm: Từ nào phát âm kết thúc bằng âm /tʃ/?',
        questionVi: 'Chọn từ có âm đuôi /tʃ/:',
        options: ['watch', 'wash', 'fish', 'dish'],
        correctIndex: 0,
        explanation: 'Từ "watch" kết thúc bằng âm /tʃ/, còn wash, fish, dish kết thúc bằng âm /ʃ/.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Buổi trưa', type: 'question', question: 'Điền từ: "I wash the dishes ___ noon."', options: ['at', 'in'], correctAnswer: 'at', icon: '☀️' },
      { index: 3, label: 'Tiến 1 ô ⏩', type: 'forward', stepDelta: 1, icon: '⭐' },
      { index: 4, label: 'Lau nhà', type: 'question', question: 'Cụm từ "lau sàn nhà" là gì?', options: ['clean the floor', 'wash the floor'], correctAnswer: 'clean the floor', icon: '🧹' },
      { index: 5, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 6, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 7, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 8, label: 'Watch hay Wash?', type: 'question', question: 'Xem tivi ta dùng từ nào: "___ TV"?', options: ['watch', 'wash'], correctAnswer: 'watch', icon: '📺' },
      { index: 9, label: 'Thưởng 2 bước ⏩', type: 'forward', stepDelta: 2, icon: '🌟' },
      { index: 10, label: 'Buổi chiều', type: 'question', question: 'Điền cụm từ: "___ the afternoon"', options: ['in', 'at'], correctAnswer: 'in', icon: '🌤️' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 1 =================
  {
    id: 'unit-1',
    volume: 1,
    unitNumber: 1,
    title: 'My friends',
    vietnameseTitle: 'Những người bạn của em',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-indigo-700',
      secondary: 'bg-indigo-50 border-indigo-200',
      accent: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      badgeBg: 'bg-indigo-100 text-indigo-800'
    },
    vocabList: [
      { id: 'v1-1', word: 'Viet Nam', ipa: '/ˌvjet ˈnæm/', vietnamese: 'Việt Nam', vietnamesePhonetic: 'Vi-et NAM', parentTip: 'Trọng âm chính rơi vào chữ "Nam" với nguyên âm /æ/, khép môi /m/ nhẹ nhàng, không quên "I\'m".', example: "I'm from Viet Nam.", exampleIpa: "/aɪm frəm ˌvjet ˈnæm/", exampleReading: "Ai-m ph-rơm Vi-et NAM.", exampleMeaning: 'Tớ đến từ Việt Nam.', iconEmoji: '🇻🇳' },
      { id: 'v1-2', word: 'America', ipa: '/əˈmerɪkə/', vietnamese: 'nước Mỹ (Hoa Kỳ)', vietnamesePhonetic: 'Ờ-ME-ri-kơ', parentTip: 'Trọng âm rơi vào vần "me" (/ˈmer/). Đọc rõ: Ờ-ME-ri-kơ. Tuyệt đối không đọc đều đều a-me-ri-ca.', example: "Mary is from America.", exampleIpa: "/ˈmeəri ɪz frəm əˈmerɪkə/", exampleReading: "Me-ri iz ph-rơm Ờ-ME-ri-kơ.", exampleMeaning: 'Mary đến từ nước Mỹ.', iconEmoji: '🇺🇸' },
      { id: 'v1-3', word: 'Britain', ipa: '/ˈbrɪtn/', vietnamese: 'nước Anh (Vương quốc Anh)', vietnamesePhonetic: 'BRIT-từn', parentTip: 'Nhấn mạnh âm BRIT, đuôi đọc là "từn" nhẹ (/tn/). Tuyệt đối không đọc bờ-ri-tanh hay bơ-ri-tơn.', example: "Lucy is from Britain.", exampleIpa: "/ˈluːsi ɪz frəm ˈbrɪtn/", exampleReading: "Lu-xi iz ph-rơm BRIT-từn.", exampleMeaning: 'Lucy đến từ nước Anh.', iconEmoji: '🇬🇧' },
      { id: 'v1-4', word: 'Australia', ipa: '/ɒˈstreɪliə/', vietnamese: 'nước Úc (Ô-xtrây-li-a)', vietnamesePhonetic: 'O-STREI-li-ơ', parentTip: 'Âm đầu là /ɒ/ tròn môi ("O"), nhấn mạnh vào vần "STREI", đuôi "lia" đọc lướt thành "li-ơ" nhẹ nhàng.', example: "Ben is from Australia.", exampleIpa: "/ben ɪz frəm ɒˈstreɪliə/", exampleReading: "Ben iz ph-rơm O-STREI-li-ơ.", exampleMeaning: 'Ben đến từ nước Úc.', iconEmoji: '🇦🇺' },
      { id: 'v1-5', word: 'Japan', ipa: '/dʒəˈpæn/', vietnamese: 'nước Nhật Bản', vietnamesePhonetic: 'Giơ-PĂN', parentTip: 'Chữ J đọc như âm /dʒ/ bật hơi nhẹ, nhấn mạnh vần PĂN (/pæn/).', example: "She's from Japan.", exampleIpa: "/ʃiːz frəm dʒəˈpæn/", exampleReading: "Si-z ph-rơm Giơ-PĂN.", exampleMeaning: 'Cô ấy đến từ Nhật Bản.', iconEmoji: '🇯🇵' },
      { id: 'v1-6', word: 'Singapore', ipa: '/ˌsɪŋəˈpɔː/', vietnamese: 'nước Xin-ga-po', vietnamesePhonetic: 'Sing-gơ-PO', parentTip: 'Nhấn trọng âm vào âm PO ngân dài cuối cùng (/pɔː/), chuẩn Anh - Anh không uốn lưỡi "r".', example: "He's from Singapore.", exampleIpa: "/hiːz frəm ˌsɪŋəˈpɔː/", exampleReading: "Hi-z ph-rơm Sing-gơ-PO.", exampleMeaning: 'Cậu ấy đến từ Xin-ga-po.', iconEmoji: '🇸🇬' },
      { id: 'v1-7', word: 'Malaysia', ipa: '/məˈleɪziə/', vietnamese: 'nước Ma-lai-xi-a', vietnamesePhonetic: 'Mờ-LEI-si-ơ', parentTip: 'Trọng âm rơi vào vần LEI (/leɪ/), đuôi si-ơ đọc lướt nhẹ.', example: "They're from Malaysia.", exampleIpa: "/ðeə frəm məˈleɪziə/", exampleReading: "Đe-ơ ph-rơm Mờ-LEI-si-ơ.", exampleMeaning: 'Họ đến từ Ma-lai-xi-a.', iconEmoji: '🇲🇾' },
      { id: 'v1-8', word: 'Thailand', ipa: '/ˈtaɪlænd/', vietnamese: 'nước Thái Lan', vietnamesePhonetic: 'TAI-lèn-đ', parentTip: 'Chữ Th đọc là /t/ bật hơi (như chữ T tiếng Anh, không đọc Th thờ), đuôi có âm /d/ chạm nhẹ đầu lưỡi.', example: "She's from Thailand.", exampleIpa: "/ʃiːz frəm ˈtaɪlænd/", exampleReading: "Si-z ph-rơm TAI-lèn-đ.", exampleMeaning: 'Cô ấy đến từ Thái Lan.', iconEmoji: '🇹🇭' }
    ],
    grammar: [
      {
        id: 'g1-1',
        title: 'Hỏi và trả lời về quốc gia xuất thân (Bạn từ đâu đến?)',
        structure: "Where are you from? - I'm from + [Tên quốc gia]",
        structureIpa: "/weər ɑː juː frɒm? - aɪm frəm.../",
        vietnameseFormula: "Where are you from? - I'm from + [Tên đất nước]",
        meaning: 'Bạn đến từ đâu? - Tớ đến từ...',
        parentReadingGuide: 'Hỏi: "We-ơ r-a iu ph-rom?" · Đáp: "Ai-m ph-rơm [Tên nước]"',
        parentNote: 'Bố mẹ dặn con: "Where are you from" đọc nối âm "We-ơ r-a iu", "from" cuối câu hỏi đọc là "ph-rom" (/frɒm/). Khi trả lời "I\'m from...", khép môi lại ở chữ \'m (Ai-m), đọc mượt "Ai-m ph-rơm".',
        dialog: {
          speakerA: 'Minh',
          textA: 'Hello. I’m Minh. Where are you from?',
          textAVi: 'Xin chào, tớ là Minh. Cậu đến từ đâu thế?',
          textAIpa: '/həˈləʊ. aɪm mɪŋ. weər ɑː juː frɒm/',
          textAPhonetic: 'Hơ-LÂU. Ai-m Minh. We-ơ r-a iu ph-rom?',
          speakerB: 'Mary',
          textB: 'Hello, Minh. I’m Mary. I’m from America.',
          textBVi: 'Chào Minh. Tớ là Mary. Tớ đến từ nước Mỹ.',
          textBIpa: '/həˈləʊ, mɪŋ. aɪm ˈmeəri. aɪm frəm əˈmerɪkə/',
          textBPhonetic: 'Hơ-LÂU, Minh. Ai-m Me-ri. Ai-m ph-rơm Ờ-ME-ri-kơ.'
        },
        deepExplanation: 'Cụm từ "from" có nghĩa là "từ nơi nào". Chú ý tên quốc gia luôn phải VIẾT HOA chữ cái đầu tiên (Viet Nam, America, Britain, Australia).',
        memoryTrick: '"Where are you from?" - Bạn từ đâu đến? - Nhớ thêm "I\'m from" trước quê hương mình!',
        examples: [
          "Where are you from? - I'm from Viet Nam.",
          "Where are you from? - I'm from Australia."
        ]
      },
      {
        id: 'g1-2',
        title: 'Hỏi về bạn nam hoặc bạn nữ khác đến từ đâu',
        structure: "Where is he / she from? - He's / She's from + [Tên quốc gia]",
        structureIpa: "/weər ɪz hiː / ʃiː frɒm? - hiːz / ʃiːz frəm.../",
        vietnameseFormula: "Where is he/she from? - He's/She's from + [Tên đất nước]",
        meaning: 'Cậu ấy / Cô ấy đến từ đâu? - Cậu/Cô ấy đến từ...',
        parentReadingGuide: 'Hỏi: "We-r-iz hi / si ph-rom?" · Đáp: "Hi-z / Si-z ph-rơm [Tên nước]"',
        parentNote: 'Bố mẹ nhắc con: Chữ He\'s đọc có âm gió s nhẹ (Hi-z), She\'s đọc cong môi (Si-z). Cuối câu hỏi "from" có âm om tròn môi (ph-rom).',
        dialog: {
          speakerA: 'Linh',
          textA: "Who's that? Where's she from?",
          textAVi: 'Ai thế kia? Bạn ấy đến từ đâu?',
          textAIpa: "/huːz ðæt? weəz ʃiː frɒm/",
          textAPhonetic: 'Hu-z đát? We-ơ-z si ph-rom?',
          speakerB: 'Lucy',
          textB: "It's my new friend. She's from Japan.",
          textBVi: 'Đó là bạn mới của tớ. Bạn ấy đến từ Nhật Bản.',
          textBIpa: "/ɪts maɪ njuː frend. ʃiːz frəm dʒəˈpæn/",
          textBPhonetic: 'Ít-s mai niu ph-ren-đ. Si-z ph-rơm Giơ-PĂN.'
        },
        deepExplanation: 'Với bạn nam dùng "he" (viết tắt He is -> He\'s). Với bạn nữ dùng "she" (viết tắt She is -> She\'s).',
        memoryTrick: 'Bạn trai gọi "He" - bạn gái gọi "She"!',
        examples: [
          "Where is he from? - He's from Singapore.",
          "Where is she from? - She's from Thailand."
        ]
      }
    ],
    phonics: {
      sound: 'Ngữ âm chữ cái "a" và "ia"',
      words: [
        { word: 'America', highlight: 'a', ipa: '/əˈmerɪkə/', reading: 'Ờ-ME-ri-kơ', meaning: 'nước Mỹ (/əˈmerɪkə/ - Ờ-ME-ri-kơ)' },
        { word: 'Australia', highlight: 'ia', ipa: '/ɒˈstreɪliə/', reading: 'O-STREI-li-ơ', meaning: 'nước Úc (/ɒˈstreɪliə/ - O-STREI-li-ơ)' }
      ],
      sentence: "I'm from America. She's from Australia.",
      sentenceIpa: "/aɪm frəm əˈmerɪkə. ʃiːz frəm ɒˈstreɪliə/",
      sentenceReading: "Ai-m ph-rơm Ờ-ME-ri-kơ. Si-z ph-rơm O-STREI-li-ơ.",
      sentenceMeaning: 'Tớ đến từ nước Mỹ. Cô ấy đến từ nước Úc.',
      ruleExplanation: 'Chữ cái "a" ở đầu từ America đọc là /ə/ nhẹ, còn đuôi "ia" trong Australia đọc liền như /iə/.'
    },
    parentGuide: {
      overview: 'Unit 1 mở đầu năm học lớp 4, giúp các con làm quen với bạn bè quốc tế qua tên các quốc gia và cờ các nước.',
      coreGoals: [
        'Con tự tin giới thiệu tên và quốc tịch của mình bằng tiếng Anh.',
        'Con nhận diện được quốc kỳ và tên của 8 nước trong sách: Việt Nam, Mỹ, Anh, Úc, Nhật, Singapore, Malaysia, Thái Lan.',
        'Con biết hỏi thăm lịch sự nơi xuất xứ của người bạn mới.'
      ],
      familyRoleplays: [
        {
          parentPrompt: "Hello! What's your name and where are you from?",
          parentPromptVi: 'Xin chào! Tên con là gì và con đến từ đâu nhỉ?',
          parentPromptIpa: "/həˈləʊ! wɒts jɔː neɪm ænd weər ɑː juː frɒm?/",
          parentPromptReading: "Hơ-LÂU! Oát-s jɔː neim en We-ơ r-a iu ph-rom?",
          childResponse: "Hello! My name is [Tên con]. I'm from Viet Nam!",
          childResponseVi: 'Xin chào! Con tên là... Con đến từ Việt Nam ạ!',
          childResponseIpa: "/həˈləʊ! maɪ neɪm ɪz... aɪm frəm ˌvjet ˈnæm!/",
          childResponseReading: "Hơ-LÂU! Mai neim iz... Ai-m ph-rơm Vi-et NAM!",
          coachingTip: 'Bố mẹ cầm cờ Việt Nam 🇻🇳 hỏi con và nhắc con nói đầy đủ "I\'m from Viet Nam", không nói cộc lốc.'
        },
        {
          parentPrompt: "Where is Mary from?",
          parentPromptVi: 'Bạn Mary đến từ đâu thế con?',
          parentPromptIpa: "/weər ɪz ˈmeəri frɒm?/",
          parentPromptReading: "We-r-iz Me-ri ph-rom?",
          childResponse: "She's from America!",
          childResponseVi: 'Bạn ấy đến từ nước Mỹ ạ!',
          childResponseIpa: "/ʃiːz frəm əˈmerɪkə!/",
          childResponseReading: "Si-z ph-rơm Ờ-ME-ri-kơ!",
          coachingTip: 'Nhắc con nhớ bạn Mary là con gái nên dùng "She\'s", và nhấn rõ vần me: Ờ-ME-ri-kơ.'
        }
      ],
      commonMistakes: [
        {
          mistake: "I from Viet Nam.",
          correction: "I am from Viet Nam. (hoặc I'm from Viet Nam.)",
          why: 'Rất nhiều bé quên động từ to-be "am" (viết tắt là \'m).'
        },
        {
          mistake: "Where is you from?",
          correction: "Where are you from?",
          why: 'Với chủ ngữ "you" luôn phải dùng "are", không được dùng "is".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Hộ chiếu du lịch toàn cầu"',
        timeNeeded: '5 phút',
        steps: [
          'Vẽ lá cờ một nước (ví dụ cờ đỏ sao vàng Việt Nam hoặc cờ Nhật mặt trời đỏ).',
          'Bố mẹ đóng vai nhân viên hải quan sân bay hỏi: "Where are you from?"',
          'Con giơ cờ và trả lời dõng dạc: "I\'m from Japan!"'
        ],
        benefit: 'Tạo cảm giác như đi du lịch quốc tế, kích thích niềm say mê khám phá.'
      },
      praisePhrases: [
        { en: 'Super world traveler!', vi: 'Nhà du hành nhí siêu đẳng!', phonetic: 'ˈsupər wɜrld ˈtrævələr!' },
        { en: 'Your English sounds so natural!', vi: 'Tiếng Anh của con nghe tự nhiên lắm!', phonetic: 'jʊr ˈɪŋɡlɪʃ saʊndz soʊ ˈnætʃərəl!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg1-1',
        scrambledWords: ['from', 'Where', 'you', 'are', '?'],
        correctSentence: 'Where are you from?',
        vietnameseMeaning: 'Bạn đến từ đâu?',
        hint: 'Câu hỏi có Where...'
      },
      {
        id: 'sg1-2',
        scrambledWords: ['from', 'Viet', "I'm", 'Nam.'],
        correctSentence: "I'm from Viet Nam.",
        vietnameseMeaning: 'Tớ đến từ Việt Nam.',
        hint: 'Bắt đầu bằng I\'m from...'
      },
      {
        id: 'sg1-3',
        scrambledWords: ['from', 'is', 'Where', 'he', '?'],
        correctSentence: 'Where is he from?',
        vietnameseMeaning: 'Cậu ấy đến từ đâu?',
        hint: 'Where is he from?'
      }
    ],
    quizzes: [
      {
        id: 'q1-1',
        question: 'Điền từ còn thiếu: "Where ___ you from?"',
        questionVi: 'Chọn trợ động từ thích hợp:',
        options: ['is', 'are', 'am', 'do'],
        correctIndex: 1,
        explanation: 'Đi với chủ ngữ "you" là động từ to-be "are".',
        type: 'choice'
      },
      {
        id: 'q1-2',
        question: 'Quốc kỳ nền trắng có hình tròn đỏ ở giữa là của nước nào?',
        questionVi: 'Nhận biết quốc kỳ:',
        options: ['Japan', 'Britain', 'America', 'Australia'],
        correctIndex: 0,
        explanation: 'Đó là cờ của Nhật Bản (Japan).',
        type: 'choice'
      },
      {
        id: 'q1-3',
        question: 'Chọn câu viết đúng:',
        questionVi: 'Chọn câu đúng ngữ pháp:',
        options: ["He's from Singapore.", "He from Singapore.", "He is come from Singapore.", "He are from Singapore."],
        correctIndex: 0,
        explanation: '"He\'s from Singapore." là câu chuẩn ngữ pháp.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Việt Nam', type: 'question', question: 'Nói "Tớ đến từ Việt Nam" bằng tiếng Anh:', options: ["I'm from Viet Nam.", 'I from Viet Nam.'], correctAnswer: "I'm from Viet Nam.", icon: '🇻🇳' },
      { index: 3, label: 'Thưởng 2 bước ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Nước Úc', type: 'question', question: 'Tên nước Úc trong tiếng Anh là gì?', options: ['Australia', 'America'], correctAnswer: 'Australia', icon: '🇦🇺' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'He hay She?', type: 'question', question: 'Mary là bạn nữ, hỏi về bạn ấy dùng từ nào?', options: ['she', 'he'], correctAnswer: 'she', icon: '👧' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Thủ đô Tokyo', type: 'question', question: 'Tokyo là thủ đô của nước nào?', options: ['Japan', 'Thailand'], correctAnswer: 'Japan', icon: '🇯🇵' },
      { index: 10, label: 'Tiến 1 ô ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 2 =================
  {
    id: 'unit-2',
    volume: 1,
    unitNumber: 2,
    title: 'Time and daily routines',
    vietnameseTitle: 'Thời gian và thói quen hàng ngày',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-rose-700',
      secondary: 'bg-rose-50 border-rose-200',
      accent: 'bg-rose-600 hover:bg-rose-700 text-white',
      badgeBg: 'bg-rose-100 text-rose-800'
    },
    vocabList: [
      {
        id: 'v2-1',
        word: "o'clock",
        ipa: "/əˈklɒk/",
        vietnamese: 'giờ đúng, giờ chẵn',
        vietnamesePhonetic: 'ơ-KLÓC',
        parentTip: 'Nhấn mạnh vào vần "klóc" với âm /k/ bật dứt khoát. CHỈ dùng cho giờ chẵn tròn phút, tuyệt đối không dùng khi có phút lẻ.',
        example: "It's six o'clock.",
        exampleIpa: "/ɪts sɪks əˈklɒk/",
        exampleReading: "It-x xích-x ơ-KLÓC.",
        exampleMeaning: 'Bây giờ là 6 giờ đúng.',
        iconEmoji: '⏰'
      },
      {
        id: 'v2-2',
        word: 'fifteen',
        ipa: '/ˌfɪfˈtiːn/',
        vietnamese: 'số 15 (15 phút)',
        vietnamesePhonetic: 'phíp-TIIN',
        parentTip: 'Trọng âm rơi vào vần "teen" (/tiːn/), kéo dài khóe môi cười. Nhắc con tránh nhầm với fifty (50).',
        example: "It's six fifteen.",
        exampleIpa: "/ɪts sɪks ˌfɪfˈtiːn/",
        exampleReading: "It-x xích-x phíp-TIIN.",
        exampleMeaning: 'Bây giờ là 6 giờ 15 phút.',
        iconEmoji: '🕒'
      },
      {
        id: 'v2-3',
        word: 'thirty',
        ipa: '/ˈθɜː.ti/',
        vietnamese: 'số 30 (30 phút / rưỡi)',
        vietnamesePhonetic: 'THƠ-ti',
        parentTip: 'Âm /θ/ đặt đầu lưỡi giữa hai hàm răng thổi luồng gió nhẹ, đọc là "thơ-ti". Không đọc thờ-ty.',
        example: "It's six thirty.",
        exampleIpa: "/ɪts sɪks ˈθɜː.ti/",
        exampleReading: "It-x xích-x THƠ-ti.",
        exampleMeaning: 'Bây giờ là 6 giờ 30 phút (6 rưỡi).',
        iconEmoji: '🕧'
      },
      {
        id: 'v2-4',
        word: 'forty-five',
        ipa: '/ˌfɔː.ti ˈfaɪv/',
        vietnamese: 'số 45 (45 phút / kém 15)',
        vietnamesePhonetic: 'PHO-ti Phai-v',
        parentTip: 'Nhấn vào "pho" (/fɔː/), chữ "five" răng trên cắn nhẹ môi dưới phát âm /v/ nhẹ nhàng.',
        example: "It's six forty-five.",
        exampleIpa: "/ɪts sɪks ˌfɔː.ti ˈfaɪv/",
        exampleReading: "It-x xích-x PHO-ti Phai-v.",
        exampleMeaning: 'Bây giờ là 6 giờ 45 phút.',
        iconEmoji: '🕘'
      },
      {
        id: 'v2-5',
        word: 'get up',
        ipa: '/ɡet ʌp/',
        vietnamese: 'thức dậy, rời giường',
        vietnamesePhonetic: 'get ÁP',
        parentTip: 'Nối âm tự nhiên /t/ sang /ʌ/ đọc là "ge-tắp". Bật nhẹ âm /p/ ở môi khi kết thúc.',
        example: "I get up at six o'clock.",
        exampleIpa: "/aɪ ɡet ʌp ət sɪks əˈklɒk/",
        exampleReading: "Ai get áp ơt xích-x ơ-KLÓC.",
        exampleMeaning: 'Tớ thức dậy lúc 6 giờ đúng.',
        iconEmoji: '🛌'
      },
      {
        id: 'v2-6',
        word: 'have breakfast',
        ipa: '/hæv ˈbrek.fəst/',
        vietnamese: 'ăn bữa sáng',
        vietnamesePhonetic: 'hæv BREK-phơst',
        parentTip: 'Nhấn mạnh vần "brek", đuôi "fəst" đọc lướt nhẹ. Nhắc con khép răng môi ở chữ have (/hæv/).',
        example: 'I have breakfast at six fifteen.',
        exampleIpa: "/aɪ hæv ˈbrek.fəst ət sɪks ˌfɪfˈtiːn/",
        exampleReading: "Ai hæv BREK-phơst ơt xích-x phíp-TIIN.",
        exampleMeaning: 'Tớ ăn sáng lúc 6 giờ 15 phút.',
        iconEmoji: '🥣'
      },
      {
        id: 'v2-7',
        word: 'go to school',
        ipa: '/ɡəʊ tuː skuːl/',
        vietnamese: 'đi đến trường, đi học',
        vietnamesePhonetic: 'gâu tu XCUU',
        parentTip: 'Từ "go" có nguyên âm đôi /əʊ/ tròn môi ("gâu"), từ "school" phát âm /skuːl/ kéo dài khóe môi nhẹ.',
        example: "I go to school at seven o'clock.",
        exampleIpa: "/aɪ ɡəʊ tuː skuːl ət ˈsev.ən əˈklɒk/",
        exampleReading: "Ai gâu tu XCUU ơt SE-vừn ơ-KLÓC.",
        exampleMeaning: 'Tớ đi học lúc 7 giờ đúng.',
        iconEmoji: '🎒'
      },
      {
        id: 'v2-8',
        word: 'go to bed',
        ipa: '/ɡəʊ tuː bed/',
        vietnamese: 'đi ngủ',
        vietnamesePhonetic: 'gâu tu BET',
        parentTip: 'Âm /d/ ở cuối từ "bed" là âm hữu thanh rung nhẹ thanh quản ở cổ, tránh đọc thành bét cộc lốc.',
        example: 'I go to bed at nine forty-five.',
        exampleIpa: "/aɪ ɡəʊ tuː bed ət naɪn ˌfɔː.ti ˈfaɪv/",
        exampleReading: "Ai gâu tu BET ơt nai-n PHO-ti Phai-v.",
        exampleMeaning: 'Tớ đi ngủ lúc 9 giờ 45 tối.',
        iconEmoji: '😴'
      }
    ],
    grammar: [
      {
        id: 'g2-1',
        title: 'Hỏi và trả lời về giờ giấc',
        structure: "What time is it? - It's + [giờ] + [phút]",
        structureIpa: "/wɒt taɪm ɪz ɪt? - ɪts.../",
        vietnameseFormula: "What time is it? - It's + [số giờ] + [số phút] (hoặc o'clock khi giờ đúng)",
        meaning: 'Mấy giờ rồi? - Bây giờ là... giờ... phút',
        dialog: {
          speakerA: 'Ms Hoa',
          textA: 'What time is it, class?',
          textAIpa: '/wɒt taɪm ɪz ɪt, klɑːs/',
          textAPhonetic: 'Oát tai-m iz it, klaax?',
          textAVi: 'Mấy giờ rồi cả lớp?',
          speakerB: 'Class',
          textB: "It's eight thirty. Let's have a break!",
          textBIpa: "/ɪts eɪt ˈθɜː.ti. lets hæv ə breɪk/",
          textBPhonetic: "It-x eit THƠ-ti. Lét-x hæv ơ breik!",
          textBVi: 'Dạ 8 giờ 30 phút rồi ạ. Chúng ta nghỉ giải lao thôi!'
        },
        deepExplanation: 'Cách đọc giờ đơn giản và chuẩn xác nhất cho học sinh lớp 4: Đọc SỐ GIỜ trước, rồi đọc SỐ PHÚT sau: 6:15 -> six fifteen; 6:30 -> six thirty; 6:45 -> six forty-five. Chỉ dùng "o\'clock" khi số phút bằng 0 (giờ chẵn).',
        memoryTrick: 'Đọc giờ trước, đọc phút sau / Giờ chẵn "O\'clock" nhớ mau vào đầu!',
        examples: [
          "What time is it? - It's 7:00 (seven o'clock).",
          "What time is it? - It's 8:15 (eight fifteen).",
          "What time is it? - It's 9:45 (nine forty-five)."
        ]
      },
      {
        id: 'g2-2',
        title: 'Hỏi và trả lời về thời gian làm các hoạt động hàng ngày',
        structure: 'What time do you ...? - I ... at + [thời gian]',
        structureIpa: '/wɒt taɪm duː juː... - aɪ... ət.../',
        vietnameseFormula: 'What time do you + [get up / have breakfast / go to school / go to bed]? - I ... at + [giờ cụ thể]',
        meaning: 'Bạn... vào lúc mấy giờ? - Tớ... lúc...',
        dialog: {
          speakerA: 'Ben',
          textA: 'What time do you get up?',
          textAIpa: '/wɒt taɪm duː juː ɡet ʌp/',
          textAPhonetic: 'Oát tai-m du iu get áp?',
          textAVi: 'Cậu thức dậy lúc mấy giờ?',
          speakerB: 'Mary',
          textB: "I get up at six o'clock. And you? - At five forty-five.",
          textBIpa: "/aɪ ɡet ʌp ət sɪks əˈklɒk. ənd juː? - ət faɪv ˌfɔː.ti ˈfaɪv/",
          textBPhonetic: "Ai get áp ơt xích-x ơ-KLÓC. En iu? - Ơt phai-v PHO-ti Phai-v.",
          textBVi: 'Tớ thức dậy lúc 6 giờ. Còn cậu? - Lúc 5 giờ 45.'
        },
        deepExplanation: 'Trước mốc giờ cụ thể bắt buộc dùng giới từ "AT" (at 6:00, at 7:15). Tuyệt đối không dùng "in" hay "on".',
        memoryTrick: 'Đứng trước mốc giờ kim đồng hồ: luôn luôn dùng "AT"!',
        examples: [
          'What time do you have breakfast? - I have breakfast at six fifteen.',
          'What time do you go to bed? - I go to bed at nine thirty.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm kết thúc "t" /t/ và "d" /d/',
      words: [
        { word: 'get', highlight: 't', meaning: 'thức dậy (/ɡɛt/ - bật hơi gió không rung thanh quản)' },
        { word: 'bed', highlight: 'd', meaning: 'giường ngủ (/bɛd/ - rung dây thanh quản ở cổ)' }
      ],
      sentence: 'What time do you get up? What time do you go to bed?',
      sentenceMeaning: 'Mấy giờ bạn thức dậy? Mấy giờ bạn đi ngủ?',
      ruleExplanation: 'Âm /t/ là âm vô thanh (chỉ có luồng gió bật nhẹ từ răng). Âm /d/ là âm hữu thanh (đặt tay vào cổ sẽ thấy rung nhẹ).'
    },
    parentGuide: {
      overview: 'Bài học giúp con rèn luyện thói quen sinh hoạt điều độ, biết xem đồng hồ và nói giờ chuẩn xác bằng tiếng Anh.',
      coreGoals: [
        'Con đọc được giờ chẵn, giờ 15 phút, giờ 30 phút và 45 phút.',
        'Con kể được thời gian biểu 4 mốc quan trọng: thức dậy, ăn sáng, đi học, đi ngủ.',
        'Con thuộc lòng quy tắc dùng giới từ "at" trước mốc giờ.'
      ],
      familyRoleplays: [
        {
          parentPrompt: "Sweetheart, what time do you go to school tomorrow?",
          parentPromptVi: 'Con yêu ơi, mai con đi học lúc mấy giờ nhỉ?',
          childResponse: "I go to school at seven o'clock!",
          childResponseVi: 'Con đi học lúc 7 giờ đúng ạ!',
          coachingTip: 'Chỉ vào đồng hồ treo tường trong phòng khách và đố con: "What time is it right now?"'
        }
      ],
      commonMistakes: [
        {
          mistake: "It's six fifteen o'clock.",
          correction: "It's six fifteen.",
          why: 'Từ "o\'clock" CHỈ dùng khi giờ chẵn (6:00), không dùng khi đã có số phút lẻ (6:15).'
        },
        {
          mistake: "I go to bed on nine o'clock.",
          correction: "I go to bed at nine o'clock.",
          why: 'Trước giờ giấc luôn dùng "at", không dùng "on".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Chiếc đồng hồ biết nói"',
        timeNeeded: '5 phút',
        steps: [
          'Vẽ một mặt đồng hồ to lên bảng con hoặc giấy, dùng hai chiếc bút chì làm kim ngắn kim dài.',
          'Bố mẹ xoay kim chỉ vào các mốc: 6:00, 6:15, 6:30, 6:45.',
          'Hỏi con: "What time is it?" để con reo to đáp án!'
        ],
        benefit: 'Rèn luyện khả năng quan sát số học kết hợp tiếng Anh sinh động.'
      },
      praisePhrases: [
        { en: 'Right on time! Perfect!', vi: 'Đúng giờ chuẩn xác! Hoàn hảo!', phonetic: 'raɪt ɑn taɪm! ˈpɜrfɪkt!' },
        { en: 'You are a master of time!', vi: 'Con đúng là bậc thầy quản lý thời gian!', phonetic: 'ju ɑr ə ˈmæstər ʌv taɪm!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg2-1',
        scrambledWords: ['time', 'is', 'What', 'it', '?'],
        correctSentence: 'What time is it?',
        vietnameseMeaning: 'Mấy giờ rồi?',
        hint: 'Câu hỏi giờ kinh điển: What time...'
      },
      {
        id: 'sg2-2',
        scrambledWords: ['up', 'get', 'at', 'I', "o'clock.", 'six'],
        correctSentence: "I get up at six o'clock.",
        vietnameseMeaning: 'Tớ thức dậy lúc 6 giờ đúng.',
        hint: 'I get up at...'
      },
      {
        id: 'sg2-3',
        scrambledWords: ['go', 'bed', 'at', 'to', 'nine', 'I', 'thirty.'],
        correctSentence: 'I go to bed at nine thirty.',
        vietnameseMeaning: 'Tớ đi ngủ lúc 9 giờ 30.',
        hint: 'I go to bed at...'
      }
    ],
    quizzes: [
      {
        id: 'q2-1',
        question: 'Đồng hồ chỉ 6:15, ta nói như thế nào trong tiếng Anh?',
        questionVi: 'Chọn cách đọc giờ 6:15:',
        options: ["It's six fifteen.", "It's six forty-five.", "It's six thirty.", "It's six o'clock."],
        correctIndex: 0,
        explanation: '6:15 đọc số giờ (six) rồi đến số phút (fifteen) -> "It\'s six fifteen."',
        type: 'choice'
      },
      {
        id: 'q2-2',
        question: 'Điền giới từ: "I have breakfast ___ six thirty."',
        questionVi: 'Chọn giới từ đứng trước mốc giờ:',
        options: ['in', 'at', 'on', 'to'],
        correctIndex: 1,
        explanation: 'Trước mốc giờ cụ thể luôn luôn dùng giới từ "at".',
        type: 'choice'
      },
      {
        id: 'q2-3',
        question: 'Từ "o\'clock" chỉ dùng khi nào?',
        questionVi: 'Quy tắc dùng o\'clock:',
        options: ['Giờ chẵn không có phút lẻ (như 6:00)', 'Bất kỳ giờ nào', 'Chỉ dùng buổi sáng', 'Chỉ dùng buổi tối'],
        correctIndex: 0,
        explanation: 'Từ "o\'clock" chỉ dùng cho giờ chẵn đúng số (như six o\'clock, seven o\'clock).',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Hỏi giờ', type: 'question', question: 'Mấy giờ rồi? Nói là: "What ___ is it?"', options: ['time', 'clock'], correctAnswer: 'time', icon: '⏰' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Giờ chẵn', type: 'question', question: '7:00 đọc là: "Seven ___"', options: ["o'clock", 'fifteen'], correctAnswer: "o'clock", icon: '🕒' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Đi ngủ', type: 'question', question: 'Cụm từ "đi ngủ" là gì?', options: ['go to bed', 'get up'], correctAnswer: 'go to bed', icon: '😴' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Thức dậy', type: 'question', question: 'Điền từ: "I get ___ at six."', options: ['up', 'down'], correctAnswer: 'up', icon: '🛌' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 3 =================
  {
    id: 'unit-3',
    volume: 1,
    unitNumber: 3,
    title: 'My week',
    vietnameseTitle: 'Tuần lễ của em',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-amber-700',
      secondary: 'bg-amber-50 border-amber-200',
      accent: 'bg-amber-600 hover:bg-amber-700 text-white',
      badgeBg: 'bg-amber-100 text-amber-800'
    },
    vocabList: [
      {
        id: 'v3-1',
        word: 'Monday',
        ipa: '/ˈmʌn.deɪ/',
        vietnamese: 'Thứ Hai',
        vietnamesePhonetic: 'MĂN-đây',
        parentTip: 'Trọng âm rơi vào "MĂN". Nhắc con thứ Hai là ngày đầu tuần khởi động tràn đầy năng lượng.',
        example: "It's Monday today.",
        exampleIpa: "/ɪts ˈmʌn.deɪ təˈdeɪ/",
        exampleReading: 'It-x MĂN-đây tơ-ĐÂY.',
        exampleMeaning: 'Hôm nay là Thứ Hai.',
        iconEmoji: '🔴'
      },
      {
        id: 'v3-2',
        word: 'Tuesday',
        ipa: '/ˈtjuːz.deɪ/',
        vietnamese: 'Thứ Ba',
        vietnamesePhonetic: 'TIU-z-đây',
        parentTip: 'Nhớ có âm gió nhẹ /z/ ở giữa: "TIU-z-đây". Nhắc con liên tưởng số 2 (two) nhưng là Thứ 3.',
        example: "What day is it? - It's Tuesday.",
        exampleIpa: "/wɒt deɪ ɪz ɪt? ɪts ˈtjuːz.deɪ/",
        exampleReading: 'Oát đây iz it? It-x TIU-z-đây.',
        exampleMeaning: 'Hôm nay là thứ mấy? - Là Thứ Ba.',
        iconEmoji: '🟠'
      },
      {
        id: 'v3-3',
        word: 'Wednesday',
        ipa: '/ˈwenz.deɪ/',
        vietnamese: 'Thứ Tư',
        vietnamesePhonetic: 'OEN-z-đây',
        parentTip: 'CỰC KỲ QUAN TRỌNG: Chữ "d" câm hoàn toàn! Phát âm chuẩn là /ˈwenzdeɪ/ (Oen-z-đây), tuyệt đối không đọc oét-nét-đây.',
        example: "I study at school on Wednesdays.",
        exampleIpa: "/aɪ ˈstʌd.i æt skuːl ɒn ˈwenz.deɪz/",
        exampleReading: 'Ai X-TA-đi ét xcuu on OEN-z-đây-z.',
        exampleMeaning: 'Tớ học ở trường vào các ngày Thứ Tư.',
        iconEmoji: '🟡'
      },
      {
        id: 'v3-4',
        word: 'Thursday',
        ipa: '/ˈθɜːz.deɪ/',
        vietnamese: 'Thứ Năm',
        vietnamesePhonetic: 'THƠ-z-đây',
        parentTip: 'Âm /θ/ đặt đầu lưỡi giữa hai hàm răng thổi hơi nhẹ, sau đó có âm /z/: "THƠ-z-đây".',
        example: "What do you do on Thursdays?",
        exampleIpa: "/wɒt duː juː duː ɒn ˈθɜːz.deɪz/",
        exampleReading: 'Oát đu du đu on THƠ-z-đây-z?',
        exampleMeaning: 'Bạn làm gì vào các ngày Thứ Năm?',
        iconEmoji: '🟢'
      },
      {
        id: 'v3-5',
        word: 'Friday',
        ipa: '/ˈfraɪ.deɪ/',
        vietnamese: 'Thứ Sáu',
        vietnamesePhonetic: 'PHRAI-đây',
        parentTip: 'Bật nhẹ âm /fr/ mượt mà. Thứ Sáu là ngày học cuối của tuần lễ chuẩn bị bước vào cuối tuần vui chơi.',
        example: "It's Friday. Let's sing a song!",
        exampleIpa: "/ɪts ˈfraɪ.deɪ. lets sɪŋ ə sɒŋ/",
        exampleReading: 'It-x PHRAI-đây. Lét-x xinh ơ xoong!',
        exampleMeaning: 'Hôm nay là Thứ Sáu. Chúng mình cùng hát nào!',
        iconEmoji: '🔵'
      },
      {
        id: 'v3-6',
        word: 'Saturday',
        ipa: '/ˈsæt.ə.deɪ/',
        vietnamese: 'Thứ Bảy',
        vietnamesePhonetic: 'XA-tơ-đây',
        parentTip: 'Trọng âm rơi vào "XA". Là ngày cuối tuần (weekend), cả nhà cùng nhau thư giãn.',
        example: "I listen to music on Saturdays.",
        exampleIpa: "/aɪ ˈlɪs.n tuː ˈmjuː.zɪk ɒn ˈsæt.ə.deɪz/",
        exampleReading: 'Ai LÍT-xừn tu MIU-zích on XA-tơ-đây-z.',
        exampleMeaning: 'Tớ nghe nhạc vào các ngày Thứ Bảy.',
        iconEmoji: '🟣'
      },
      {
        id: 'v3-7',
        word: 'Sunday',
        ipa: '/ˈsʌn.deɪ/',
        vietnamese: 'Chủ Nhật',
        vietnamesePhonetic: 'XĂN-đây',
        parentTip: 'Chữ "Sun" nghĩa là mặt trời rực rỡ, ngày Chủ Nhật nghỉ ngơi tái tạo năng lượng.',
        example: "I help my parents on Sundays.",
        exampleIpa: "/aɪ help maɪ ˈpeə.rənts ɒn ˈsʌn.deɪz/",
        exampleReading: 'Ai hép mai PÈ-rừnt-x on XĂN-đây-z.',
        exampleMeaning: 'Tớ giúp đỡ bố mẹ vào các ngày Chủ Nhật.',
        iconEmoji: '☀️'
      },
      {
        id: 'v3-8',
        word: 'study at school',
        ipa: '/ˌstʌd.i æt ˈskuːl/',
        vietnamese: 'học tập ở trường',
        vietnamesePhonetic: 'X-TA-đi ét XCUU',
        parentTip: 'Âm /st/ lướt nhẹ không thêm "xì-ta". "School" phát âm âm /uː/ dài và âm /l/ nâng cuống họng.',
        example: 'I study at school from Monday to Friday.',
        exampleIpa: '/aɪ ˈstʌd.i æt skuːl frɒm ˈmʌn.deɪ tuː ˈfraɪ.deɪ/',
        exampleReading: 'Ai X-TA-đi ét xcuu phrom MĂN-đây tu PHRAI-đây.',
        exampleMeaning: 'Tớ học ở trường từ Thứ Hai đến Thứ Sáu.',
        iconEmoji: '🏫'
      },
      {
        id: 'v3-9',
        word: 'listen to music',
        ipa: '/ˈlɪs.n tuː ˈmjuː.zɪk/',
        vietnamese: 'nghe nhạc',
        vietnamesePhonetic: 'LÍT-xừn tu MIU-zích',
        parentTip: 'Chữ "t" trong listen là âm câm! Đọc là /ˈlɪs.n/, không đọc lít-từn.',
        example: 'Do you listen to music at the weekend?',
        exampleIpa: '/duː juː ˈlɪs.n tuː ˈmjuː.zɪk æt ðə ˌwiːkˈend/',
        exampleReading: 'Đu du LÍT-xừn tu MIU-zích ét đơ guých-EN?',
        exampleMeaning: 'Bạn có nghe nhạc vào dịp cuối tuần không?',
        iconEmoji: '🎧'
      },
      {
        id: 'v3-10',
        word: 'watch TV',
        ipa: '/wɒtʃ ˌtiːˈviː/',
        vietnamese: 'xem truyền hình, xem ti vi',
        vietnamesePhonetic: 'OÁT-ch TII-VII',
        parentTip: 'Âm đuôi /tʃ/ chu môi bật hơi dứt khoát như "ch".',
        example: 'I watch TV with my brother on Sundays.',
        exampleIpa: '/aɪ wɒtʃ ˌtiːˈviː wɪð maɪ ˈbrʌð.ər ɒn ˈsʌn.deɪz/',
        exampleReading: 'Ai oát-ch TII-VII guý-đ mai BRÁ-đờ on XĂN-đây-z.',
        exampleMeaning: 'Tớ xem ti vi cùng anh trai vào các ngày Chủ Nhật.',
        iconEmoji: '📺'
      }
    ],
    grammar: [
      {
        id: 'g3-1',
        title: 'Hỏi và trả lời hôm nay là thứ mấy',
        structure: 'What day is it today? - It’s + [Thứ].',
        structureIpa: '/wɒt deɪ ɪz ɪt təˈdeɪ? - ɪts.../',
        vietnameseFormula: 'What day is it today? - It’s + [Monday / Tuesday / Wednesday / Thursday / Friday / Saturday / Sunday].',
        meaning: 'Hỏi hôm nay là thứ mấy và trả lời thứ tương ứng trong tuần.',
        parentReadingGuide: 'Bố mẹ hỏi: "What day is it today?" (Oát đây iz it tơ-ĐÂY?). Con đáp: "It\'s Friday." (It-x PHRAI-đây).',
        parentNote: 'Luôn viết hoa chữ cái đầu của các thứ trong tuần (Monday, Tuesday...).',
        dialog: {
          speakerA: 'Teacher',
          textA: 'What day is it today, Class?',
          textAVi: 'Hôm nay là thứ mấy cả lớp?',
          textAIpa: '/wɒt deɪ ɪz ɪt təˈdeɪ, klɑːs?/',
          textAPhonetic: 'Oát đây iz it tơ-ĐÂY, cla-x?',
          speakerB: 'Students',
          textB: "It's Monday.",
          textBVi: 'Thưa cô, hôm nay là Thứ Hai ạ.',
          textBIpa: "/ɪts ˈmʌn.deɪ/",
          textBPhonetic: 'It-x MĂN-đây.'
        },
        deepExplanation: 'Từ "day" nghĩa là "ngày/thứ". "Today" là "hôm nay". Cấu trúc này dùng thì hiện tại đơn với động từ to be "is".',
        memoryTrick: 'Nhớ câu thần chú: "Hỏi thứ dùng What day - Trả lời It\'s ngay thêm tên thứ vào!"',
        examples: [
          "What day is it today? - It's Wednesday.",
          "What day is it today? - It's Sunday."
        ]
      },
      {
        id: 'g3-2',
        title: 'Hỏi bạn làm gì vào các ngày trong tuần',
        structure: 'What do you do on + [Thứ + s]? - I + [hành động].',
        structureIpa: '/wɒt duː juː duː ɒn... - aɪ.../',
        vietnameseFormula: 'What do you do on + [Mondays / Tuesdays / ...]? - I + [study at school / listen to music / ...].',
        meaning: 'Hỏi về thói quen lặp đi lặp lại vào một ngày cố định trong tuần.',
        parentReadingGuide: 'Bố mẹ hỏi: "What do you do on Fridays?" - Con đáp: "I listen to music."',
        parentNote: 'CHÚ Ý QUAN TRỌNG: Khi nói "vào các ngày thứ...", tên thứ phải có chữ "s" ở cuối (on Mondays = vào các ngày thứ Hai hàng tuần). Trước thứ luôn dùng giới từ "on".',
        dialog: {
          speakerA: 'Nam',
          textA: 'What do you do on Saturdays?',
          textAVi: 'Cậu thường làm gì vào các ngày Thứ Bảy?',
          textAIpa: '/wɒt duː juː duː ɒn ˈsæt.ə.deɪz?/',
          textAPhonetic: 'Oát đu du đu on XA-tơ-đây-z?',
          speakerB: 'Mai',
          textB: 'I listen to music and help my parents.',
          textBVi: 'Tớ nghe nhạc và giúp đỡ bố mẹ.',
          textBIpa: '/aɪ ˈlɪs.n tuː ˈmjuː.zɪk ænd help maɪ ˈpeə.rənts/',
          textBPhonetic: 'Ai LÍT-xừn tu MIU-zích en hép mai PÈ-rừnt-x.'
        },
        deepExplanation: 'Giới từ "on" luôn đi với ngày trong tuần. Khi thêm "s" vào sau tên thứ (on Saturdays), nó thể hiện thói quen thường xuyên lặp lại hàng tuần.',
        memoryTrick: 'Trước thứ dùng ON - Thêm S chỉ thói quen tuần nào cũng làm!',
        examples: [
          'What do you do on Sundays? - I watch TV.',
          'What do you do on Tuesdays? - I study at school.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm đầu "l" /l/ và âm chùm "st" /st/',
      words: [
        { word: 'listen', highlight: 'l', meaning: 'nghe (/ˈlɪs.n/ - chữ t câm, nâng đầu lưỡi nhẹ)', ipa: '/ˈlɪs.n/', reading: 'LÍT-xừn' },
        { word: 'study', highlight: 'st', meaning: 'học tập (/ˈstʌd.i/ - xì nhẹ /s/ rồi bật /t/ dứt khoát)', ipa: '/ˈstʌd.i/', reading: 'X-TA-đi' }
      ],
      sentence: 'I listen to music. I study at school.',
      sentenceIpa: '/aɪ ˈlɪs.n tuː ˈmjuː.zɪk. aɪ ˈstʌd.i æt skuːl/',
      sentenceReading: 'Ai LÍT-xừn tu MIU-zích. Ai X-TA-đi ét xcuu.',
      sentenceMeaning: 'Tớ nghe nhạc. Tớ học tập ở trường.',
      ruleExplanation: 'Âm /l/ đưa đầu lưỡi chạm chân răng trên hạ xuống. Âm /st/ lướt nhẹ không tách thành 2 âm riêng biệt.'
    },
    parentGuide: {
      overview: 'Bài học Unit 3 giúp con nhận biết và gọi tên 7 ngày trong tuần, hỏi đáp về hôm nay là thứ mấy và chia sẻ các hoạt động thường làm vào các ngày.',
      coreGoals: [
        'Con đọc và viết chính xác 7 ngày trong tuần (Monday ➔ Sunday).',
        'Con phản xạ trôi chảy câu hỏi "What day is it today? - It\'s..."',
        'Con biết dùng giới từ "on" trước các thứ và thêm "s" khi nói về thói quen lặp lại hàng tuần.'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'What day is it today, my dear?',
          parentPromptVi: 'Hôm nay là thứ mấy con yêu nhỉ?',
          parentPromptIpa: '/wɒt deɪ ɪz ɪt təˈdeɪ, maɪ dɪər?/',
          parentPromptReading: 'Oát đây iz it tơ-ĐÂY, mai đia?',
          childResponse: "It's Monday today!",
          childResponseVi: 'Hôm nay là Thứ Hai ạ!',
          childResponseIpa: "/ɪts ˈmʌn.deɪ təˈdeɪ/",
          childResponseReading: 'It-x MĂN-đây tơ-ĐÂY!',
          coachingTip: 'Mỗi buổi sáng lúc thức dậy, bố mẹ cùng con xé lịch hoặc nhìn đồng hồ lịch để đố nhanh câu này.'
        }
      ],
      commonMistakes: [
        {
          mistake: "It's monday. (chữ m viết thường)",
          correction: "It's Monday. (chữ M luôn viết hoa)",
          why: 'Tất cả các thứ trong tuần trong tiếng Anh đều là danh từ riêng, bắt buộc phải viết hoa chữ cái đầu.'
        },
        {
          mistake: 'Phát âm Wednesday thành "oét-nét-đây"',
          correction: 'Phát âm chuẩn là /ˈwenzdeɪ/ (Oen-z-đây)',
          why: 'Chữ "d" trong từ Wednesday là âm câm hoàn toàn.'
        }
      ],
      homeActivity: {
        name: 'Vòng quay ngày trong tuần (Spin the Week Wheel)',
        timeNeeded: '5 phút',
        steps: [
          'Vẽ 7 ngày từ Monday đến Sunday thành hình tròn trên bìa giấy.',
          'Dùng một chiếc bút chì quay trúng ngày nào thì người quay phải hô to tên thứ bằng tiếng Anh.',
          'Hỏi tiếp: "What do you do on [tên thứ]?" để con kể hoạt động yêu thích.'
        ],
        benefit: 'Giúp con phản xạ tên 7 ngày trong tuần siêu nhanh và tự tin nói câu dài.'
      },
      praisePhrases: [
        { en: 'Wonderful! You know your week so well!', vi: 'Tuyệt vời! Con nắm rất vững tuần lễ của mình!', phonetic: 'ˈwʌndərfəl! ju noʊ jʊr wik soʊ wɛl!' },
        { en: 'Super smart and organized!', vi: 'Rất thông minh và ngăn nắp!', phonetic: 'ˈsupər smɑrt ænd ˈɔrɡəˌnaɪzd!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg3-1',
        scrambledWords: ['day', 'What', 'today', 'is', 'it', '?'],
        correctSentence: 'What day is it today?',
        vietnameseMeaning: 'Hôm nay là thứ mấy?',
        hint: 'What day...'
      },
      {
        id: 'sg3-2',
        scrambledWords: ['Monday.', 'is', 'It', 'today'],
        correctSentence: "It is Monday today.",
        vietnameseMeaning: 'Hôm nay là Thứ Hai.',
        hint: 'It is Monday...'
      },
      {
        id: 'sg3-3',
        scrambledWords: ['school', 'at', 'I', 'on', 'study', 'Fridays.'],
        correctSentence: 'I study at school on Fridays.',
        vietnameseMeaning: 'Tớ học ở trường vào các ngày Thứ Sáu.',
        hint: 'I study at school...'
      }
    ],
    quizzes: [
      {
        id: 'q3-1',
        question: 'Từ chỉ "Thứ Tư" trong tiếng Anh được viết như thế nào?',
        questionVi: 'Chọn cách viết đúng của Thứ Tư:',
        options: ['Wednesday', 'Wensday', 'Wenesday', 'Wednesdai'],
        correctIndex: 0,
        explanation: 'Thứ Tư viết là "Wednesday", chú ý có chữ "d" câm không đọc.',
        type: 'choice'
      },
      {
        id: 'q3-2',
        question: 'Điền giới từ thích hợp: "I listen to music ___ Saturdays."',
        questionVi: 'Chọn giới từ đứng trước các thứ trong tuần:',
        options: ['at', 'on', 'in', 'to'],
        correctIndex: 1,
        explanation: 'Trước các thứ trong tuần luôn dùng giới từ "on" (on Saturdays, on Mondays).',
        type: 'choice'
      },
      {
        id: 'q3-3',
        question: 'Âm đầu trong từ "listen" là gì?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['/l/', '/st/', '/t/', '/d/'],
        correctIndex: 0,
        explanation: '"listen" bắt đầu bằng phụ âm /l/, chữ "t" là âm câm.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Hỏi thứ', type: 'question', question: 'Hôm nay là thứ mấy? Nói là: "What ___ is it today?"', options: ['day', 'time'], correctAnswer: 'day', icon: '📅' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Thứ Tư', type: 'question', question: 'Chữ nào bị câm trong từ "Wednesday"?', options: ['Chữ d', 'Chữ w'], correctAnswer: 'Chữ d', icon: '🟡' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Giới từ', type: 'question', question: 'Điền giới từ: "___ Sundays, I watch TV."', options: ['On', 'At'], correctAnswer: 'On', icon: '☀️' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Nghe nhạc', type: 'question', question: 'Cụm từ "nghe nhạc" là gì?', options: ['listen to music', 'study at school'], correctAnswer: 'listen to music', icon: '🎧' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 4 =================
  {
    id: 'unit-4',
    volume: 1,
    unitNumber: 4,
    title: 'My birthday party',
    vietnameseTitle: 'Tiệc sinh nhật của em',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-rose-700',
      secondary: 'bg-rose-50 border-rose-200',
      accent: 'bg-rose-600 hover:bg-rose-700 text-white',
      badgeBg: 'bg-rose-100 text-rose-800'
    },
    vocabList: [
      {
        id: 'v4-1',
        word: 'January',
        ipa: '/ˈdʒæn.ju.ə.ri/',
        vietnamese: 'Tháng 1 (Tháng Giêng)',
        vietnamesePhonetic: 'JAN-yu-a-ri',
        parentTip: 'Bắt đầu bằng âm /dʒ/ bật rung mạnh. Tháng 1 là tháng mở đầu một năm mới rực rỡ.',
        example: "My birthday is in January.",
        exampleIpa: "/maɪ ˈbɜːθ.deɪ ɪz ɪn ˈdʒæn.ju.ə.ri/",
        exampleReading: 'Mai BƠTH-đây iz in JAN-yu-a-ri.',
        exampleMeaning: 'Sinh nhật của tớ vào Tháng Một.',
        iconEmoji: '❄️'
      },
      {
        id: 'v4-2',
        word: 'February',
        ipa: '/ˈfeb.ru.ə.ri/',
        vietnamese: 'Tháng 2',
        vietnamesePhonetic: 'PHEB-ru-a-ri',
        parentTip: 'Trọng âm rơi vào "FEB". Tháng ngắn nhất trong năm và có ngày lễ Tết.',
        example: "It's in February.",
        exampleIpa: "/ɪts ɪn ˈfeb.ru.ə.ri/",
        exampleReading: 'It-x in PHEB-ru-a-ri.',
        exampleMeaning: 'Nó vào Tháng Hai.',
        iconEmoji: '🧧'
      },
      {
        id: 'v4-3',
        word: 'March',
        ipa: '/mɑːtʃ/',
        vietnamese: 'Tháng 3',
        vietnamesePhonetic: 'MAAT-ch',
        parentTip: 'CỰC KỲ QUAN TRỌNG: Âm đuôi /tʃ/ chu môi bật hơi như tiếng "ch", tuyệt đối không đọc là mác hay mát.',
        example: "His birthday is in March.",
        exampleIpa: "/hɪz ˈbɜːθ.deɪ ɪz ɪn mɑːtʃ/",
        exampleReading: 'Hiz BƠTH-đây iz in MAAT-ch.',
        exampleMeaning: 'Sinh nhật của cậu ấy vào Tháng Ba.',
        iconEmoji: '🌱'
      },
      {
        id: 'v4-4',
        word: 'April',
        ipa: '/ˈeɪ.prəl/',
        vietnamese: 'Tháng 4',
        vietnamesePhonetic: 'EI-prồl',
        parentTip: 'Bắt đầu bằng nguyên âm đôi /eɪ/, âm cuối nâng cuống lưỡi nhẹ /l/.',
        example: "When's your birthday? - It's in April.",
        exampleIpa: "/wenz jɔː ˈbɜːθ.deɪ? ɪts ɪn ˈeɪ.prəl/",
        exampleReading: 'Oen-z yo BƠTH-đây? It-x in EI-prồl.',
        exampleMeaning: 'Khi nào là sinh nhật bạn? - Nó vào Tháng Tư.',
        iconEmoji: '🌸'
      },
      {
        id: 'v4-5',
        word: 'May',
        ipa: '/meɪ/',
        vietnamese: 'Tháng 5',
        vietnamesePhonetic: 'MÂY',
        parentTip: 'Tháng ngắn gọn, đọc giống như "mây trời". Tháng sinh nhật của bạn Lucy trong bài học.',
        example: "It's in May.",
        exampleIpa: "/ɪts ɪn meɪ/",
        exampleReading: 'It-x in MÂY.',
        exampleMeaning: 'Nó vào Tháng Năm.',
        iconEmoji: '🎂'
      },
      {
        id: 'v4-6',
        word: 'chips',
        ipa: '/tʃɪps/',
        vietnamese: 'khoai tây chiên',
        vietnamesePhonetic: 'CHÍP-x',
        parentTip: 'Âm đầu /tʃ/ và âm đuôi /ps/ xì gió nhẹ. Luôn dùng dạng số nhiều vì một đĩa có nhiều miếng khoai.',
        example: 'I want some chips.',
        exampleIpa: '/aɪ wɒnt sʌm tʃɪps/',
        exampleReading: 'Ai oát xam CHÍP-x.',
        exampleMeaning: 'Tớ muốn một ít khoai tây chiên.',
        iconEmoji: '🍟'
      },
      {
        id: 'v4-7',
        word: 'grapes',
        ipa: '/ɡreɪps/',
        vietnamese: 'chùm nho, quả nho',
        vietnamesePhonetic: 'G-RÂY-p-x',
        parentTip: 'Âm đuôi /ps/ bật nhẹ và xì gió. Danh từ đếm được số nhiều chỉ chùm nho.',
        example: 'I want some grapes, please.',
        exampleIpa: '/aɪ wɒnt sʌm ɡreɪps pliːz/',
        exampleReading: 'Ai oát xam G-RÂY-p-x pliiz.',
        exampleMeaning: 'Tớ muốn một ít nho tươi.',
        iconEmoji: '🍇'
      },
      {
        id: 'v4-8',
        word: 'jam',
        ipa: '/dʒæm/',
        vietnamese: 'mứt (hoa quả, dâu)',
        vietnamesePhonetic: 'JĂM',
        parentTip: 'Âm đầu /dʒ/ bật rung đầu lưỡi mạnh. Danh từ không đếm được dùng với "some".',
        example: 'I like jam.',
        exampleIpa: '/aɪ laɪk dʒæm/',
        exampleReading: 'Ai lai-k JĂM.',
        exampleMeaning: 'Tớ thích ăn mứt.',
        iconEmoji: '🍓'
      },
      {
        id: 'v4-9',
        word: 'lemonade',
        ipa: '/ˌlem.əˈneɪd/',
        vietnamese: 'nước chanh',
        vietnamesePhonetic: 'le-mơ-NÂY-đ',
        parentTip: 'Trọng âm rơi vào "nade" (/neɪd/), âm đuôi /d/ bật dứt khoát.',
        example: 'I want some lemonade.',
        exampleIpa: '/aɪ wɒnt sʌm ˌlem.əˈneɪd/',
        exampleReading: 'Ai oát xam le-mơ-NÂY-đ.',
        exampleMeaning: 'Tớ muốn một cốc nước chanh.',
        iconEmoji: '🍋'
      },
      {
        id: 'v4-10',
        word: 'water',
        ipa: '/ˈwɔː.tər/',
        vietnamese: 'nước lọc, nước uống',
        vietnamesePhonetic: 'OÁ-tờ',
        parentTip: 'Bắt đầu bằng âm /w/ chu tròn môi, không rung cổ họng.',
        example: 'There is some water on the table.',
        exampleIpa: '/ðeər ɪz sʌm ˈwɔː.tər ɒn ðə ˈteɪ.bəl/',
        exampleReading: 'Đe iz xam OÁ-tờ on đơ TÂY-bồ.',
        exampleMeaning: 'Có một ít nước ở trên bàn.',
        iconEmoji: '💧'
      },
      {
        id: 'v4-11',
        word: 'juice',
        ipa: '/dʒuːs/',
        vietnamese: 'nước ép trái cây',
        vietnamesePhonetic: 'JU-x',
        parentTip: 'Âm đầu /dʒ/ và âm đuôi /s/ xì gió nhẹ nhàng.',
        example: 'I want some juice.',
        exampleIpa: '/aɪ wɒnt sʌm dʒuːs/',
        exampleReading: 'Ai oát xam JU-x.',
        exampleMeaning: 'Tớ muốn một ly nước ép.',
        iconEmoji: '🧃'
      }
    ],
    grammar: [
      {
        id: 'g4-1',
        title: 'Hỏi và trả lời ngày sinh nhật',
        structure: "When's your birthday? - It’s in + [Tháng].",
        structureIpa: "/wenz jɔː ˈbɜːθ.deɪ? - ɪts ɪn.../",
        vietnameseFormula: "When's your birthday? - It's in + [January / February / March / April / May...].",
        meaning: 'Hỏi khi nào là sinh nhật của bạn và trả lời vào tháng nào trong năm.',
        parentReadingGuide: "Bố mẹ hỏi: \"When's your birthday?\" (Oen-z yo BƠTH-đây?). Con đáp: \"It's in May.\" (It-x in MÂY).",
        parentNote: 'Trước tháng đứng một mình luôn dùng giới từ "in". Tên tháng luôn viết hoa chữ cái đầu.',
        dialog: {
          speakerA: 'Ben',
          textA: "When's your birthday?",
          textAVi: 'Khi nào là sinh nhật của bạn vậy Lucy?',
          textAIpa: "/wenz jɔː ˈbɜːθ.deɪ?/",
          textAPhonetic: 'Oen-z yo BƠTH-đây?',
          speakerB: 'Lucy',
          textB: "It's in May.",
          textBVi: 'Sinh nhật của tớ vào Tháng Năm.',
          textBIpa: "/ɪts ɪn meɪ/",
          textBPhonetic: 'It-x in MÂY.'
        },
        deepExplanation: '"When\'s" là viết tắt của "When is" (Khi nào). "Birthday" là ngày sinh nhật. Giới từ "in" dùng cho tháng, năm, mùa.',
        memoryTrick: 'Sinh nhật vào THÁNG dùng IN - Chữ cái đầu THÁNG viết hoa đàng hoàng!',
        examples: [
          "When's your birthday? - It's in January.",
          "When's your birthday? - It's in March."
        ]
      },
      {
        id: 'g4-2',
        title: 'Hỏi ai đó muốn ăn hoặc uống gì trong bữa tiệc',
        structure: 'What do you want to eat / drink? - I want some + [món].',
        structureIpa: '/wɒt duː juː wɒnt tuː iːt / drɪŋk? - aɪ wɒnt sʌm.../',
        vietnameseFormula: 'What do you want to eat / drink? - I want some + [chips / grapes / jam / lemonade / water / juice].',
        meaning: 'Hỏi bạn muốn ăn gì (eat) hoặc uống gì (drink) và trả lời món muốn dùng kèm từ "some".',
        parentReadingGuide: 'Bố mẹ hỏi: "What do you want to eat?" - Con đáp: "I want some chips."',
        parentNote: 'Đồ ăn nhai được dùng "eat". Đồ uống dạng lỏng dùng "drink". Từ "some" có nghĩa là một ít, một chút.',
        dialog: {
          speakerA: 'Lucy',
          textA: 'What do you want to eat, Nam?',
          textAVi: 'Cậu muốn ăn món gì hả Nam?',
          textAIpa: '/wɒt duː juː wɒnt tuː iːt, næm?/',
          textAPhonetic: 'Oát đu du oát tu iit, Nam?',
          speakerB: 'Nam',
          textB: 'I want some jam and some chips.',
          textBVi: 'Tớ muốn một ít mứt và một đĩa khoai tây chiên.',
          textBIpa: '/aɪ wɒnt sʌm dʒæm ænd sʌm tʃɪps/',
          textBPhonetic: 'Ai oát xam JĂM en xam CHÍP-x.'
        },
        deepExplanation: '"Want to" + động từ nguyên thể (want to eat, want to drink). "Some" dùng trong câu khẳng định chỉ số lượng không xác định.',
        memoryTrick: 'Muốn ăn dùng EAT - Muốn uống dùng DRINK - Trả lời thêm SOME cho thật lịch sự!',
        examples: [
          'What do you want to drink? - I want some lemonade.',
          'What do you want to eat? - I want some grapes.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm đầu "j" /dʒ/ và "w" /w/',
      words: [
        { word: 'jam', highlight: 'j', meaning: 'mứt dâu (/dʒæm/ - bật rung mạnh khoang miệng)', ipa: '/dʒæm/', reading: 'JĂM' },
        { word: 'water', highlight: 'w', meaning: 'nước uống (/ˈwɔː.tər/ - chu tròn môi như huýt sáo)', ipa: '/ˈwɔː.tər/', reading: 'OÁ-tờ' }
      ],
      sentence: 'I like jam. I want some water.',
      sentenceIpa: '/aɪ laɪk dʒæm. aɪ wɒnt sʌm ˈwɔː.tər/',
      sentenceReading: 'Ai lai-k JĂM. Ai oát xam OÁ-tờ.',
      sentenceMeaning: 'Tớ thích mứt. Tớ muốn một ít nước.',
      ruleExplanation: 'Âm /dʒ/ là phụ âm rung đầu lưỡi chạm chân răng trên. Âm /w/ là bán nguyên âm tròn môi lướt nhẹ.'
    },
    parentGuide: {
      overview: 'Unit 4 giúp con làm quen với các tháng trong năm (đặc biệt là 5 tháng đầu năm), biết cách hỏi đáp về ngày sinh nhật và tự tin mời bạn bè ăn uống trong các buổi tiệc.',
      coreGoals: [
        'Con phát âm và nhận diện được các tháng: January, February, March, April, May.',
        'Con hỏi và đáp lưu loát: "When\'s your birthday? - It\'s in [Month]."',
        'Con phân biệt được hành động "eat" (ăn) và "drink" (uống) cùng các món đồ ăn, thức uống quen thuộc.'
      ],
      familyRoleplays: [
        {
          parentPrompt: "Sweetheart, when's your birthday?",
          parentPromptVi: 'Con yêu ơi, sinh nhật con vào tháng mấy nhỉ?',
          parentPromptIpa: "/ˈswiːt.hɑːt, wenz jɔː ˈbɜːθ.deɪ?/",
          parentPromptReading: 'X-guýt-hạt, oen-z yo BƠTH-đây?',
          childResponse: "It's in May, Mom!",
          childResponseVi: 'Sinh nhật con vào Tháng Năm mẹ ơi!',
          childResponseIpa: "/ɪts ɪn meɪ, mɒm!/",
          childResponseReading: 'It-x in MÂY, mom!',
          coachingTip: 'Chỉ vào tờ lịch trên tường và hỏi sinh nhật của từng thành viên trong gia đình: bố, mẹ, anh chị em.'
        }
      ],
      commonMistakes: [
        {
          mistake: "It's on May.",
          correction: "It's in May.",
          why: 'Trước tháng đứng một mình luôn dùng giới từ "in". Giới từ "on" chỉ dùng khi có cả ngày và tháng (ví dụ: on 20 May).'
        },
        {
          mistake: 'Phát âm March thành "mác" hay "mát"',
          correction: 'Phát âm chuẩn là /mɑːtʃ/ (chu môi bật hơi "ch")',
          why: 'Âm đuôi /tʃ/ cần bật gió dứt khoát.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Bàn tiệc sinh nhật trong mơ"',
        timeNeeded: '5 phút',
        steps: [
          'Bày các món ăn nhẹ hoặc tranh vẽ lên bàn (nho, khoai tây chiên, nước chanh, nước lọc).',
          'Bố mẹ đóng vai khách mời đến dự sinh nhật con: "Happy birthday!"',
          'Con đóng vai chủ tiệc hỏi bố mẹ: "What do you want to eat/drink?" để bố mẹ gọi món.'
        ],
        benefit: 'Tạo phản xạ giao tiếp tự nhiên và rèn luyện kỹ năng mến khách cho trẻ.'
      },
      praisePhrases: [
        { en: 'Happy birthday to our little star!', vi: 'Chúc mừng sinh nhật ngôi sao nhỏ của gia đình!', phonetic: 'ˈhæpi ˈbɜrθˌdeɪ tu aʊər ˈlɪtəl stɑr!' },
        { en: 'Brilliant English pronunciation!', vi: 'Phát âm tiếng Anh thật xuất sắc!', phonetic: 'ˈbrɪljənt ˈɪŋɡlɪʃ prəˌnʌnsiˈeɪʃən!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg4-1',
        scrambledWords: ['birthday', 'When', 'your', 'is', '?'],
        correctSentence: "When is your birthday?",
        vietnameseMeaning: 'Khi nào là sinh nhật của bạn?',
        hint: 'When is your...'
      },
      {
        id: 'sg4-2',
        scrambledWords: ['is', 'in', 'May.', 'It'],
        correctSentence: "It is in May.",
        vietnameseMeaning: 'Nó vào Tháng Năm.',
        hint: 'It is in...'
      },
      {
        id: 'sg4-3',
        scrambledWords: ['want', 'some', 'chips.', 'I'],
        correctSentence: 'I want some chips.',
        vietnameseMeaning: 'Tớ muốn một ít khoai tây chiên.',
        hint: 'I want some...'
      }
    ],
    quizzes: [
      {
        id: 'q4-1',
        question: 'Điền giới từ: "My birthday is ___ March."',
        questionVi: 'Chọn giới từ đứng trước tháng sinh nhật:',
        options: ['in', 'on', 'at', 'to'],
        correctIndex: 0,
        explanation: 'Trước các tháng trong năm luôn dùng giới từ "in" (in March, in May).',
        type: 'choice'
      },
      {
        id: 'q4-2',
        question: 'Từ nào sau đây là đồ uống (drink)?',
        questionVi: 'Phân biệt đồ ăn và đồ uống:',
        options: ['lemonade', 'chips', 'grapes', 'jam'],
        correctIndex: 0,
        explanation: '"lemonade" là nước chanh (đồ uống), các từ còn lại là đồ ăn (food).',
        type: 'choice'
      },
      {
        id: 'q4-3',
        question: 'Âm đầu trong từ "water" là gì?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['/w/', '/dʒ/', '/l/', '/st/'],
        correctIndex: 0,
        explanation: '"water" bắt đầu bằng âm bán nguyên âm /w/.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Hỏi sinh nhật', type: 'question', question: 'Khi nào là sinh nhật bạn? "___ is your birthday?"', options: ['When', 'What'], correctAnswer: 'When', icon: '🎂' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Giới từ tháng', type: 'question', question: 'Điền từ: "It\'s ___ May."', options: ['in', 'at'], correctAnswer: 'in', icon: '🌸' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Đồ uống', type: 'question', question: 'Từ "lemonade" nghĩa là gì?', options: ['nước chanh', 'khoai tây'], correctAnswer: 'nước chanh', icon: '🍋' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Ăn hay uống', type: 'question', question: 'Món "chips" đi với động từ nào?', options: ['eat', 'drink'], correctAnswer: 'eat', icon: '🍟' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 5 =================
  {
    id: 'unit-5',
    volume: 1,
    unitNumber: 5,
    title: 'Things we can do',
    vietnameseTitle: 'Những điều em có thể làm',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-teal-700',
      secondary: 'bg-teal-50 border-teal-200',
      accent: 'bg-teal-600 hover:bg-teal-700 text-white',
      badgeBg: 'bg-teal-100 text-teal-800'
    },
    vocabList: [
      {
        id: 'v5-1',
        word: 'swim',
        ipa: '/swɪm/',
        vietnamese: 'bơi lội',
        example: 'Can you swim? - Yes, I can.',
        exampleMeaning: 'Bạn biết bơi không? - Có, tớ biết bơi.',
        iconEmoji: '🏊'
      },
      {
        id: 'v5-2',
        word: 'ride a bike',
        ipa: '/raɪd ə baɪk/',
        vietnamese: 'đi xe đạp',
        example: 'I can ride a bike to school.',
        exampleMeaning: 'Tớ có thể đi xe đạp đến trường.',
        iconEmoji: '🚲'
      },
      {
        id: 'v5-3',
        word: 'ride a horse',
        ipa: '/raɪd ə hɔːs/',
        vietnamese: 'cưỡi ngựa',
        example: 'Can you ride a horse? - No, I can’t.',
        exampleMeaning: 'Bạn biết cưỡi ngựa không? - Không, tớ không biết.',
        iconEmoji: '🐎'
      },
      {
        id: 'v5-4',
        word: 'play the piano',
        ipa: '/pleɪ ðə piˈæn.oʊ/',
        vietnamese: 'chơi đàn pi-a-nô',
        example: 'She can play the piano very well.',
        exampleMeaning: 'Bạn ấy chơi đàn pi-a-nô rất hay.',
        iconEmoji: '🎹'
      },
      {
        id: 'v5-5',
        word: 'play the guitar',
        ipa: '/pleɪ ðə ɡɪˈtɑːr/',
        vietnamese: 'chơi đàn ghi-ta',
        example: 'Can he play the guitar? - Yes, he can.',
        exampleMeaning: 'Bạn ấy có biết chơi đàn ghi-ta không? - Có, bạn ấy biết.',
        iconEmoji: '🎸'
      },
      {
        id: 'v5-6',
        word: 'roller skate',
        ipa: '/ˈroʊ.lɚ skeɪt/',
        vietnamese: 'trượt pa-tanh bánh xe',
        example: 'Can she roller skate? - No, she can’t.',
        exampleMeaning: 'Bạn ấy biết trượt pa-tanh không? - Không, bạn ấy chưa biết.',
        iconEmoji: '🛼'
      },
      {
        id: 'v5-7',
        word: 'cook',
        ipa: '/kʊk/',
        vietnamese: 'nấu ăn / làm bếp',
        example: 'Can he cook? - Yes, he can make soup.',
        exampleMeaning: 'Bạn ấy có biết nấu ăn không? - Có, bạn ấy biết nấu món súp.',
        iconEmoji: '🍳'
      },
      {
        id: 'v5-8',
        word: 'draw',
        ipa: '/drɔː/',
        vietnamese: 'vẽ tranh nghệ thuật',
        example: 'I can draw a cute cat.',
        exampleMeaning: 'Tớ có thể vẽ một chú mèo con đáng yêu.',
        iconEmoji: '🎨'
      },
      {
        id: 'v5-9',
        word: 'skate',
        ipa: '/skeɪt/',
        vietnamese: 'trượt ván / trượt băng',
        example: 'They can skate in the park.',
        exampleMeaning: 'Họ có thể trượt ván ở công viên.',
        iconEmoji: '🛹'
      },
      {
        id: 'v5-10',
        word: 'sing',
        ipa: '/sɪŋ/',
        vietnamese: 'hát ca',
        example: 'Lucy can sing English songs.',
        exampleMeaning: 'Lucy có thể hát các bài hát tiếng Anh.',
        iconEmoji: '🎤'
      }
    ],
    grammar: [
      {
        id: 'g5-1',
        title: 'Hỏi và trả lời về khả năng của bản thân',
        structure: 'Can you + [động từ]? - Yes, I can. / No, I can’t.',
        structureIpa: '/kæn juː ...? - jes, aɪ kæn / nəʊ, aɪ kɑːnt/',
        vietnameseFormula: 'Can you + [swim / ride a bike / ride a horse / play the piano]? - Yes, I can / No, I can’t.',
        meaning: 'Hỏi ai đó có thể làm được một việc gì không và cách trả lời.',
        parentReadingGuide: 'Bố mẹ hỏi: "Can you swim?" (Ken du x-uým?). Con đáp: "Yes, I can." (Dét, ai ken) hoặc "No, I can’t." (Nâu, ai kát-t).',
        parentNote: 'Sau "can" luôn là động từ nguyên thể. Chơi nhạc cụ có "the": play the piano, play the guitar.',
        dialog: {
          speakerA: 'Mai',
          textA: 'Can you swim, Minh?',
          textAVi: 'Bạn có biết bơi không hả Minh?',
          textAIpa: '/kæn juː swɪm, mɪn?/',
          textAPhonetic: 'Ken du x-uým, Minh?',
          speakerB: 'Minh',
          textB: 'Yes, I can.',
          textBVi: 'Có, tớ biết bơi.',
          textBIpa: '/jes, aɪ kæn/',
          textBPhonetic: 'Dét, ai ken.'
        },
        deepExplanation: '"Can" là động từ khuyết thiếu chỉ năng lực. Đảo "Can" lên đầu câu để hỏi. Trả lời Yes/No kết hợp chủ ngữ và can/can’t.',
        memoryTrick: 'Biết làm: Yes, I CAN - Chưa biết làm: No, I CAN’T bật hơi đuôi T!',
        examples: [
          'Can you ride a bike? - Yes, I can.',
          'Can you ride a horse? - No, I can’t.'
        ]
      },
      {
        id: 'g5-2',
        title: 'Hỏi và trả lời về khả năng của người khác (He / She)',
        structure: 'Can he/she + [động từ]? - Yes, he/she can. / No, he/she can’t.',
        structureIpa: '/kæn hiː/ʃiː ...? - jes, hiː/ʃiː kæn / nəʊ, hiː/ʃiː kɑːnt/',
        vietnameseFormula: 'Can he/she + [play the guitar / roller skate / cook / draw]? - Yes, he/she can / No, he/she can’t.',
        meaning: 'Hỏi bạn nam ấy (he) hoặc bạn nữ ấy (she) có biết làm việc gì không.',
        parentReadingGuide: 'Bố mẹ hỏi: "Can he play the guitar?" - Con đáp: "Yes, he can."',
        parentNote: 'He dùng cho bạn trai/nam. She dùng cho bạn gái/nữ. Nhạc cụ guitar có "the": play the guitar.',
        dialog: {
          speakerA: 'Mai',
          textA: 'Can he play the guitar, Nam?',
          textAVi: 'Bạn ấy có biết chơi đàn ghi-ta không hả Nam?',
          textAIpa: '/kæn hiː pleɪ ðə ɡɪˈtɑːr, næm?/',
          textAPhonetic: 'Ken hi p-lây đơ ghi-ta, Nam?',
          speakerB: 'Nam',
          textB: 'Yes, he can.',
          textBVi: 'Có, bạn ấy biết chơi.',
          textBIpa: '/jes, hiː kæn/',
          textBPhonetic: 'Dét, hi ken.'
        },
        deepExplanation: 'Chủ ngữ trong câu hỏi và câu trả lời phải đồng nhất: hỏi "he" trả lời "he", hỏi "she" trả lời "she".',
        memoryTrick: 'Bạn trai là HE - Bạn gái là SHE - Luôn giữ nguyên chủ ngữ khi trả lời!',
        examples: [
          'Can she roller skate? - No, she can’t.',
          'Can he cook? - Yes, he can.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm chùm "dr" /dr/ và "sw" /sw/',
      words: [
        { word: 'draw', highlight: 'dr', meaning: 'vẽ tranh (/drɔː/)', ipa: '/drɔː/', reading: 'Đ-RO' },
        { word: 'drink', highlight: 'dr', meaning: 'uống (/drɪŋk/)', ipa: '/drɪŋk/', reading: 'Đ-RINH-k' },
        { word: 'swim', highlight: 'sw', meaning: 'bơi lội (/swɪm/)', ipa: '/swɪm/', reading: 'X-UÝM' },
        { word: 'sweet', highlight: 'sw', meaning: 'ngọt ngào (/swiːt/)', ipa: '/swiːt/', reading: 'X-UÝT-t' }
      ],
      sentence: 'I can draw a cat. Can you swim?',
      sentenceIpa: '/aɪ kæn drɔː ə kæt. kæn juː swɪm?/',
      sentenceReading: 'Ai ken đ-ro ơ két. Ken du x-uým?',
      sentenceMeaning: 'Tớ có thể vẽ một chú mèo con. Bạn có biết bơi không?',
      ruleExplanation: 'Âm /dr/ kết hợp đầu lưỡi chữ d trượt sang r chu môi. Âm /sw/ xì nhẹ gió s rồi chu tròn môi phát âm w.'
    },
    parentGuide: {
      overview: 'Unit 5 giúp con tự tin nói về sở trường và năng khiếu của bản thân cùng bạn bè thông qua cấu trúc "Can you...?", "Can he/she...?", đồng thời phát âm chuẩn 2 âm chùm phụ âm /dr/ và /sw/.',
      coreGoals: [
        'Con hỏi và đáp lưu loát về khả năng: "Can you swim? - Yes, I can / No, I can’t."',
        'Con phân biệt và sử dụng đúng He (nam) và She (nữ) khi hỏi về người khác.',
        'Con phát âm chuẩn hai âm chùm /dr/ (draw, drink) và /sw/ (swim, sweet).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Can you ride a bike, sweetheart?',
          parentPromptVi: 'Con yêu có biết đi xe đạp không nào?',
          parentPromptIpa: '/kæn juː raɪd ə baɪk, ˈswiːt.hɑːt?/',
          parentPromptReading: 'Ken du rai-đ ơ bai-k, x-guýt-hạt?',
          childResponse: 'Yes, I can! I can ride a bike very well.',
          childResponseVi: 'Có ạ! Con đi xe đạp rất cừ luôn.',
          childResponseIpa: '/jes, aɪ kæn! aɪ kæn raɪd ə baɪk ˈver.i wel/',
          childResponseReading: 'Dét, ai ken! Ai ken rai-đ ơ bai-k ve-ri oel.',
          coachingTip: 'Cùng con thực hành hỏi đáp kết hợp diễn tả động tác đi xe đạp, bơi lội hoặc đàn hát.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Quên mạo từ "the": nói "play guitar", "play piano".',
          correction: 'Nói chuẩn: "play the guitar", "play the piano".',
          why: 'Trong tiếng Anh, trước tên nhạc cụ khi chơi luôn phải có mạo từ xác định "the".'
        },
        {
          mistake: 'Nhầm lẫn He và She: "Can he cook? - Yes, she can."',
          correction: 'Sửa lại: "Can he cook? - Yes, he can."',
          why: 'Chủ ngữ trong câu hỏi và câu trả lời phải đồng nhất cùng một người.'
        },
        {
          mistake: 'Thêm "to" sau can: "I can to swim."',
          correction: 'Sửa lại: "I can swim."',
          why: 'Sau động từ khuyết thiếu can luôn là động từ nguyên thể không có to.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Phỏng vấn tài năng gia đình"',
        timeNeeded: '5 phút',
        steps: [
          'Con cầm một chiếc thìa hoặc bút giả làm micro làm phóng viên nhí.',
          'Con lần lượt phỏng vấn bố mẹ: "Can you cook, Mom?", "Can you play the guitar, Dad?"',
          'Bố mẹ trả lời: "Yes, I can" hoặc "No, I can’t" và khen ngợi con.'
        ],
        benefit: 'Giúp trẻ phản xạ nói tiếng Anh tự nhiên không sợ sai, gắn kết tình cảm gia đình.'
      },
      praisePhrases: [
        { en: 'You are so talented!', vi: 'Con thật là tài năng!', phonetic: 'Du a xô te-lừn-tịt!' },
        { en: 'Excellent job!', vi: 'Làm xuất sắc lắm!', phonetic: 'Éch-xơ-lừn jóp!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg5-1',
        scrambledWords: ['swim?', 'you', 'Can'],
        correctSentence: 'Can you swim?',
        vietnameseMeaning: 'Bạn có biết bơi không?',
        hint: 'Can you...'
      },
      {
        id: 'sg5-2',
        scrambledWords: ['can', 'the', 'He', 'guitar.', 'play'],
        correctSentence: 'He can play the guitar.',
        vietnameseMeaning: 'Cậu ấy có thể chơi đàn ghi-ta.',
        hint: 'He can play...'
      },
      {
        id: 'sg5-3',
        scrambledWords: ['she', 'skate?', 'roller', 'Can'],
        correctSentence: 'Can she roller skate?',
        vietnameseMeaning: 'Cô ấy có biết trượt pa-tanh không?',
        hint: 'Can she...'
      }
    ],
    quizzes: [
      {
        id: 'q5-1',
        question: 'Chọn câu trả lời đúng: "Can you swim?" - "Yes, ___."',
        questionVi: 'Điền chủ ngữ và trợ động từ:',
        options: ['I can', 'he can', 'she can’t', 'I do'],
        correctIndex: 0,
        explanation: 'Hỏi "you" thì trả lời bằng "I": Yes, I can.',
        type: 'choice'
      },
      {
        id: 'q5-2',
        question: 'Cụm từ nào dùng ĐÚNG mạo từ?',
        questionVi: 'Chọn cụm từ chuẩn ngữ pháp:',
        options: ['play the guitar', 'play guitar', 'play a guitar', 'play with guitar'],
        correctIndex: 0,
        explanation: 'Trước tên nhạc cụ khi chơi luôn phải có "the": play the guitar, play the piano.',
        type: 'choice'
      },
      {
        id: 'q5-3',
        question: 'Từ nào bắt đầu bằng âm chùm /dr/?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['draw', 'swim', 'sweet', 'sing'],
        correctIndex: 0,
        explanation: '"draw" bắt đầu bằng âm chùm phụ âm /dr/.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Khả năng bơi', type: 'question', question: 'Bạn biết bơi không? "Can you ___?"', options: ['swim', 'swimming'], correctAnswer: 'swim', icon: '🏊' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Nhạc cụ', type: 'question', question: 'Điền mạo từ: "He can play ___ piano."', options: ['the', 'a'], correctAnswer: 'the', icon: '🎹' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Trượt pa-tanh', type: 'question', question: 'Từ "roller skate" nghĩa là gì?', options: ['trượt pa-tanh', 'đi xe đạp'], correctAnswer: 'trượt pa-tanh', icon: '🛼' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Phủ định', type: 'question', question: 'Không thể làm: "No, she ___."', options: ['can’t', 'can'], correctAnswer: 'can’t', icon: '❌' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 6 =================
  {
    id: 'unit-6',
    volume: 1,
    unitNumber: 6,
    title: 'Our school',
    vietnameseTitle: 'Trường học của chúng em',
    theme: 'Me and My School',
    colorScheme: {
      primary: 'text-blue-700',
      secondary: 'bg-blue-50 border-blue-200',
      accent: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-100 text-blue-800'
    },
    vocabList: [
      { id: 'v6-1', word: 'school', ipa: '/skuːl/', vietnamese: 'ngôi trường', example: 'This is my beloved school.', exampleMeaning: 'Đây là ngôi trường yêu dấu của tớ.', iconEmoji: '🏫' },
      { id: 'v6-2', word: 'mountains', ipa: '/ˈmaʊn.tənz/', vietnamese: 'vùng núi / đồi núi', example: 'My school is in the mountains.', exampleMeaning: 'Trường của tớ ở vùng núi.', iconEmoji: '⛰️' },
      { id: 'v6-3', word: 'village', ipa: '/ˈvɪl.ɪdʒ/', vietnamese: 'làng quê / nông thôn', example: 'His school is in the village.', exampleMeaning: 'Trường của cậu ấy ở làng quê.', iconEmoji: '🌾' },
      { id: 'v6-4', word: 'city', ipa: '/ˈsɪt.i/', vietnamese: 'thành phố lớn', example: 'Lucy’s school is in the city.', exampleMeaning: 'Trường của Lucy ở thành phố.', iconEmoji: '🏙️' },
      { id: 'v6-5', word: 'town', ipa: '/taʊn/', vietnamese: 'thị trấn / khu phố huyện', example: 'Our school is in the town.', exampleMeaning: 'Trường của chúng mình ở thị trấn.', iconEmoji: '🏘️' },
      { id: 'v6-6', word: 'building', ipa: '/ˈbɪl.dɪŋ/', vietnamese: 'tòa nhà / dãy phòng', example: 'There are three buildings at our school.', exampleMeaning: 'Có 3 dãy nhà ở trường chúng tớ.', iconEmoji: '🏢' },
      { id: 'v6-7', word: 'playground', ipa: '/ˈpleɪ.ɡraʊnd/', vietnamese: 'sân chơi trường học', example: 'There is one big playground.', exampleMeaning: 'Có một sân chơi lớn.', iconEmoji: '🛝' },
      { id: 'v6-8', word: 'computer room', ipa: '/kəmˈpjuː.tər ruːm/', vietnamese: 'phòng tin học / máy tính', example: 'There are two computer rooms.', exampleMeaning: 'Có 2 phòng máy tính.', iconEmoji: '💻' },
      { id: 'v6-9', word: 'garden', ipa: '/ˈɡɑː.dən/', vietnamese: 'khu vườn trường', example: 'There is one flower garden.', exampleMeaning: 'Có một khu vườn hoa.', iconEmoji: '🌷' },
      { id: 'v6-10', word: 'classroom', ipa: '/ˈklɑːs.ruːm/', vietnamese: 'phòng học', example: 'There are twenty classrooms.', exampleMeaning: 'Có hai mươi phòng học.', iconEmoji: '🚪' }
    ],
    grammar: [
      {
        id: 'g6-1',
        title: 'Hỏi và trả lời về vị trí của trường học',
        structure: 'Where’s your school? - It’s in the [mountains / village / city / town].',
        structureIpa: '/weəz jɔː skuːl? - ɪts ɪn ðə .../',
        vietnameseFormula: 'Where’s your school? - It’s in the [mountains / village / city / town].',
        meaning: 'Hỏi trường học của bạn ở đâu và cách trả lời bằng cụm từ chỉ địa điểm.',
        parentReadingGuide: 'Bố mẹ hỏi: "Where’s your school?" (Ue-z dơ x-cu-l?). Con đáp: "It’s in the city." (Ít-s in đơ xít-ti) hoặc "It’s in the mountains." (Ít-s in đơ mao-tơn-z).',
        parentNote: '"Where’s" là viết tắt của "Where is". Cụm địa điểm luôn có "in the": in the mountains, in the village, in the city, in the town.',
        dialog: {
          speakerA: 'Nam',
          textA: 'Where’s your school, Lucy?',
          textAVi: 'Trường của bạn ở đâu vậy Lucy?',
          textAIpa: '/weəz jɔː skuːl, ˈluː.si?/',
          textAPhonetic: 'Ue-z dơ x-cu-l, Lu-xi?',
          speakerB: 'Lucy',
          textB: 'It’s in the city.',
          textBVi: 'Trường của mình ở thành phố.',
          textBIpa: '/ɪts ɪn ðə ˈsɪt.i/',
          textBPhonetic: 'Ít-s in đơ xít-ti.'
        },
        deepExplanation: 'Từ để hỏi "Where" hỏi về nơi chốn, vị trí. "Where’s" nối âm với "your school". Đuôi "mountains" phát âm âm /z/.',
        memoryTrick: 'Hỏi nơi chốn dùng WHERE - Trả lời nhớ cụm IN THE kèm địa điểm!',
        examples: [
          'Where’s your school? - It’s in the mountains.',
          'Where’s your school? - It’s in the village.'
        ]
      },
      {
        id: 'g6-2',
        title: 'Hỏi và trả lời về số lượng cơ sở vật chất trường học',
        structure: 'How many [danh từ số nhiều] are there at your school? - There is one. / There are [số lượng].',
        structureIpa: '/haʊ ˈmen.i ... ɑː ðeər æt jɔː skuːl? - ðeər ɪz wʌn / ðeər ɑː .../',
        vietnameseFormula: 'How many [playgrounds / computer rooms / gardens / buildings] are there at your school? - There is one / There are two...',
        meaning: 'Hỏi trường học có bao nhiêu phòng, sân chơi hay dãy nhà và trả lời theo số lượng 1 hay nhiều.',
        parentReadingGuide: 'Bố mẹ hỏi: "How many computer rooms are there at your school?" Con đáp: "There are two."',
        parentNote: 'Sau "How many" danh từ luôn luôn ở số nhiều có -s hoặc -es. Có 1 dùng "There is one", từ 2 trở lên dùng "There are [two/three...]".',
        dialog: {
          speakerA: 'Mai',
          textA: 'How many computer rooms are there at your school?',
          textAVi: 'Có bao nhiêu phòng tin học ở trường bạn?',
          textAIpa: '/haʊ ˈmen.i kəmˈpjuː.tər ruːmz ɑː ðeər æt jɔː skuːl?/',
          textAPhonetic: 'Hao men-ni cơm-piu-tờ rum-z a đe-ơ ét dơ x-cu-l?',
          speakerB: 'Nam',
          textB: 'There are two.',
          textBVi: 'Có hai phòng.',
          textBIpa: '/ðeər ɑː tuː/',
          textBPhonetic: 'Đe-ơ a tu.'
        },
        deepExplanation: 'Cấu trúc "How many + plural noun + are there...?" kiểm tra sự hòa hợp số ít / số nhiều. Chỉ 1 phòng thì dùng "There is one", nhiều phòng dùng "There are".',
        memoryTrick: '1 phòng: THERE IS ONE • 2 phòng trở lên: THERE ARE TWO / THREE!',
        examples: [
          'How many playgrounds are there at your school? - There is one.',
          'How many buildings are there at your school? - There are three.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm đuôi "s" /z/ và "es" /ɪz/',
      words: [
        { word: 'mountains', highlight: 's', meaning: 'vùng đồi núi (/ˈmaʊn.tənz/)', ipa: '/ˈmaʊn.tənz/', reading: 'MAO-tơn-z' },
        { word: 'gardens', highlight: 's', meaning: 'các khu vườn (/ˈɡɑː.dənz/)', ipa: '/ˈɡɑː.dənz/', reading: 'GA-dừn-z' },
        { word: 'villages', highlight: 'es', meaning: 'các ngôi làng (/ˈvɪl.ɪ.dʒɪz/)', ipa: '/ˈvɪl.ɪ.dʒɪz/', reading: 'VÍL-lịt-j-iz' },
        { word: 'houses', highlight: 'es', meaning: 'các ngôi nhà (/ˈhaʊ.zɪz/)', ipa: '/ˈhaʊ.zɪz/', reading: 'HAO-ziz' }
      ],
      sentence: 'My school is in the mountains. There are two gardens.',
      sentenceIpa: '/maɪ skuːl ɪz ɪn ðə ˈmaʊn.tənz. ðeər ɑː tuː ˈɡɑː.dənz./',
      sentenceReading: 'Mai x-cu-l iz in đơ MAO-tơn-z. Đe-ơ a tu GA-dừn-z.',
      sentenceMeaning: 'Trường của tớ ở vùng núi. Có hai khu vườn.',
      ruleExplanation: 'Đuôi -s sau các phụ âm hữu thanh rung nhẹ như tiếng ong /z/. Đuôi -es sau các âm gió đọc thành âm đôi nhẹ /ɪz/.'
    },
    parentGuide: {
      overview: 'Unit 6 giúp con tự tin giới thiệu về vị trí trường học (núi non, làng quê, thành phố, thị trấn) và số lượng phòng ốc, sân chơi, khu vườn bằng tiếng Anh một cách lưu loát và tự hào.',
      coreGoals: [
        'Con hỏi và trả lời trôi chảy: "Where’s your school? - It’s in the..."',
        'Con biết hỏi số lượng với "How many...?" và phân biệt chính xác "There is one" (1 phòng) và "There are two/three..." (từ 2 phòng).',
        'Con phát âm chuẩn hai âm đuôi danh từ số nhiều: /z/ (mountains, gardens) và /ɪz/ (villages, houses).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Where’s your school, my dear?',
          parentPromptVi: 'Trường học của con ở đâu thế con yêu?',
          parentPromptIpa: '/weəz jɔː skuːl, maɪ dɪər?/',
          parentPromptReading: 'Ue-z dơ x-cu-l, mai đi-ơ?',
          childResponse: 'It’s in the city! There are three buildings and a big playground.',
          childResponseVi: 'Trường con ở thành phố ạ! Trường có 3 dãy nhà và một sân chơi rất to.',
          childResponseIpa: '/ɪts ɪn ðə ˈsɪt.i! ðeər ɑː θriː ˈbɪl.dɪŋz ænd ə bɪɡ ˈpleɪ.ɡraʊnd./',
          childResponseReading: 'Ít-s in đơ xít-ti! Đe-ơ a th-ri biu-đinh-z en ơ bíc p-lây-grao-n.',
          coachingTip: 'Khuyến khích con vừa kể vừa giơ ngón tay đếm các phòng học hoặc vẽ sơ đồ trường học của mình.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Quên dạng số nhiều sau How many: "How many computer room are there?"',
          correction: 'Sửa lại: "How many computer rooms are there?"',
          why: 'Danh từ sau How many bắt buộc phải ở số nhiều thêm -s hoặc -es.'
        },
        {
          mistake: 'Dùng nhầm There is cho số nhiều: "There is two computer rooms."',
          correction: 'Sửa lại: "There are two computer rooms."',
          why: 'Chỉ có 1 mới dùng "There is". Từ 2 trở lên phải dùng "There are".'
        },
        {
          mistake: 'Phát âm "city" thành "kiti" hoặc "mountains" thiếu âm đuôi /z/.',
          correction: 'Phát âm đúng: "city" là /ˈsɪt.i/ với âm gió /s/, "mountains" đọc là /ˈmaʊn.tənz/.',
          why: 'Chữ C đầu từ "city" là âm /s/ nhẹ nhàng, không phát âm như chữ C tiếng Việt.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Kiến trúc sư nhí vẽ trường mơ ước"',
        timeNeeded: '10 phút',
        steps: [
          'Bố mẹ chuẩn bị một tờ giấy trắng và hộp bút màu.',
          'Bố mẹ hỏi: "Where is your dream school?" - Con đáp: "It’s in the mountains / city..."',
          'Bố mẹ hỏi tiếp: "How many playgrounds are there?" - Con vừa vẽ vừa trả lời: "There is one playground!"',
          'Cả nhà cùng dán bức tranh lên góc học tập để con khoe thành quả.'
        ],
        benefit: 'Kích thích trí tưởng tượng phong phú, biến từ vựng tiếng Anh thành hình ảnh sinh động dễ nhớ lâu.'
      },
      praisePhrases: [
        { en: 'Your school sounds wonderful!', vi: 'Trường của con nghe thật tuyệt vời!', phonetic: 'Do x-cu-l sao-n-z oăn-đơ-phun!' },
        { en: 'Brilliant English speaking!', vi: 'Con nói tiếng Anh quá siêu!', phonetic: 'B-rít-li-ừn Ính-glish x-pích-king!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg6-1',
        scrambledWords: ['your', 'school?', 'Where', 'is'],
        correctSentence: 'Where is your school?',
        vietnameseMeaning: 'Trường của bạn ở đâu?',
        hint: 'Where is...'
      },
      {
        id: 'sg6-2',
        scrambledWords: ['the', 'It', 'mountains.', 'in', 'is'],
        correctSentence: 'It is in the mountains.',
        vietnameseMeaning: 'Trường ở vùng núi.',
        hint: 'It is in...'
      },
      {
        id: 'sg6-3',
        scrambledWords: ['many', 'are', 'computer', 'rooms', 'there?', 'How'],
        correctSentence: 'How many computer rooms are there?',
        vietnameseMeaning: 'Có bao nhiêu phòng máy tính?',
        hint: 'How many computer rooms...'
      },
      {
        id: 'sg6-4',
        scrambledWords: ['two', 'are', 'computer', 'rooms.', 'There'],
        correctSentence: 'There are two computer rooms.',
        vietnameseMeaning: 'Có hai phòng máy tính.',
        hint: 'There are two...'
      }
    ],
    quizzes: [
      {
        id: 'q6-1',
        question: 'Chọn từ điền vào chỗ trống: "Where’s your school?" - "It’s ___ the city."',
        questionVi: 'Chọn giới từ thích hợp:',
        options: ['in', 'at', 'on', 'of'],
        correctIndex: 0,
        explanation: 'Địa điểm vùng núi, thành phố, thị trấn, làng quê dùng giới từ "in the": in the city.',
        type: 'choice'
      },
      {
        id: 'q6-2',
        question: 'Cấu trúc hỏi số lượng nào sau đây là CHÍNH XÁC?',
        questionVi: 'Nhận biết ngữ pháp số nhiều:',
        options: [
          'How many computer rooms are there?',
          'How many computer room are there?',
          'How many computer rooms is there?',
          'How much computer rooms are there?'
        ],
        correctIndex: 0,
        explanation: 'Sau "How many" danh từ đếm được luôn ở số nhiều (computer rooms) đi với động từ to be "are there".',
        type: 'choice'
      },
      {
        id: 'q6-3',
        question: 'Khi trường chỉ có duy nhất 1 sân chơi, câu trả lời đúng là:',
        questionVi: 'Chọn dạng số ít đúng:',
        options: ['There is one.', 'There are one.', 'There is two.', 'There have one.'],
        correctIndex: 0,
        explanation: 'Số lượng là 1 (số ít) dùng "There is one".',
        type: 'choice'
      },
      {
        id: 'q6-4',
        question: 'Từ nào sau đây có phần đuôi phát âm là âm /ɪz/?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['villages', 'mountains', 'gardens', 'towns'],
        correctIndex: 0,
        explanation: '"villages" kết thúc bằng đuôi -es phát âm là /ɪz/.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Vị trí vùng núi', type: 'question', question: 'Điền từ: "It’s in the ___ (vùng núi)."', options: ['mountains', 'mountain'], correctAnswer: 'mountains', icon: '⛰️' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Số lượng phòng', type: 'question', question: 'Hỏi số lượng: "How ___ buildings are there?"', options: ['many', 'much'], correctAnswer: 'many', icon: '🏢' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Phòng máy tính', type: 'question', question: 'Số lượng 2 phòng: "There ___ two computer rooms."', options: ['are', 'is'], correctAnswer: 'are', icon: '💻' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Khu vườn', type: 'question', question: 'Chỉ có 1 khu vườn: "There is ___."', options: ['one', 'two'], correctAnswer: 'one', icon: '🌷' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 7 =================
  {
    id: 'unit-7',
    volume: 1,
    unitNumber: 7,
    title: 'Our timetables',
    vietnameseTitle: 'Thời khóa biểu của em',
    theme: 'Me and My School',
    colorScheme: {
      primary: 'text-purple-700',
      secondary: 'bg-purple-50 border-purple-200',
      accent: 'bg-purple-600 hover:bg-purple-700 text-white',
      badgeBg: 'bg-purple-100 text-purple-800'
    },
    vocabList: [
      { id: 'v7-1', word: 'timetable', ipa: '/ˈtaɪmˌteɪ.bəl/', vietnamese: 'thời khóa biểu', example: 'This is our weekly timetable.', exampleMeaning: 'Đây là thời khóa biểu tuần của chúng tớ.', iconEmoji: '🗓️' },
      { id: 'v7-2', word: 'subject', ipa: '/ˈsʌb.dʒekt/', vietnamese: 'môn học', example: 'What is your favourite subject?', exampleMeaning: 'Môn học yêu thích của bạn là gì?', iconEmoji: '📚' },
      { id: 'v7-3', word: 'Vietnamese', ipa: '/ˌvjet.nəˈmiːz/', vietnamese: 'môn Tiếng Việt', example: 'I have Vietnamese every school day.', exampleMeaning: 'Tớ có môn Tiếng Việt vào mọi ngày đi học.', iconEmoji: '📘' },
      { id: 'v7-4', word: 'English', ipa: '/ˈɪŋ.ɡlɪʃ/', vietnamese: 'môn Tiếng Anh', example: 'We have English on Mondays and Fridays.', exampleMeaning: 'Chúng mình có môn Tiếng Anh vào Thứ Hai và Thứ Sáu.', iconEmoji: '📕' },
      { id: 'v7-5', word: 'maths', ipa: '/mæθs/', vietnamese: 'môn Toán', example: 'I have maths today.', exampleMeaning: 'Hôm nay tớ có môn Toán.', iconEmoji: '📐' },
      { id: 'v7-6', word: 'science', ipa: '/ˈsaɪ.əns/', vietnamese: 'môn Khoa học', example: 'We have science on Wednesdays.', exampleMeaning: 'Chúng mình có môn Khoa học vào các ngày Thứ Tư.', iconEmoji: '🔬' },
      { id: 'v7-7', word: 'art', ipa: '/ɑːt/', vietnamese: 'môn Mĩ thuật', example: 'They have art on Thursdays.', exampleMeaning: 'Các bạn ấy có môn Mĩ thuật vào Thứ Năm.', iconEmoji: '🎨' },
      { id: 'v7-8', word: 'music', ipa: '/ˈmjuː.zɪk/', vietnamese: 'môn Âm nhạc', example: 'She has music on Tuesdays.', exampleMeaning: 'Bạn ấy có môn Âm nhạc vào Thứ Ba.', iconEmoji: '🎵' },
      { id: 'v7-9', word: 'history and geography', ipa: '/ˈhɪs.tər.i ænd dʒiˈɒɡ.rə.fi/', vietnamese: 'môn Lịch sử và Địa lí', example: 'I have history and geography on Fridays.', exampleMeaning: 'Tớ có môn Lịch sử và Địa lí vào Thứ Sáu.', iconEmoji: '🏛️' },
      { id: 'v7-10', word: 'school day', ipa: '/ˈskuːl ˌdeɪ/', vietnamese: 'ngày đi học', example: 'I go to school every school day.', exampleMeaning: 'Tớ đến trường vào mọi ngày đi học.', iconEmoji: '🎒' }
    ],
    grammar: [
      {
        id: 'g7-1',
        title: 'Hỏi và trả lời về các môn học trong ngày hôm nay',
        structure: 'What subjects do you have today? - I have [Vietnamese, English, maths, science...].',
        structureIpa: '/wɒt ˈsʌb.dʒekts duː juː hæv təˈdeɪ? - aɪ hæv .../',
        vietnameseFormula: 'What subjects do you have today? - I have [môn 1 and môn 2...].',
        meaning: 'Hỏi hôm nay bạn học những môn gì và trả lời liệt kê các môn học.',
        parentReadingGuide: 'Bố mẹ hỏi: "What subjects do you have today?" (Oát xắp-dịch-s đu du he-v tờ-đây?). Con đáp: "I have English and maths." (Ai he-v Ính-glish en mát-th-s).',
        parentNote: 'Từ "subjects" luôn ở số nhiều vì thường có nhiều hơn 1 môn học trong ngày. Nối các môn học bằng từ "and".',
        dialog: {
          speakerA: 'Mum',
          textA: 'What subjects do you have today, Minh?',
          textAVi: 'Hôm nay con có những môn học nào hả Minh?',
          textAIpa: '/wɒt ˈsʌb.dʒekts duː juː hæv təˈdeɪ, mɪn?/',
          textAPhonetic: 'Oát xắp-dịch-s đu du he-v tờ-đây, Minh?',
          speakerB: 'Minh',
          textB: 'I have English and maths.',
          textBVi: 'Con có môn Tiếng Anh và môn Toán ạ.',
          textBIpa: '/aɪ hæv ˈɪŋ.ɡlɪʃ ænd mæθs/',
          textBPhonetic: 'Ai he-v Ính-glish en mát-th-s.'
        },
        deepExplanation: 'Từ "What" kết hợp với danh từ số nhiều "subjects" tạo thành cụm từ để hỏi: "Những môn học nào". Trợ động từ "do" đi với chủ ngữ "you".',
        memoryTrick: 'Nhiều môn: SUBJECTS có S • Trả lời: I HAVE kèm tên môn học!',
        examples: [
          'What subjects do you have today? - I have Vietnamese and science.',
          'What subjects do you have today? - I have maths and art.'
        ]
      },
      {
        id: 'g7-2',
        title: 'Hỏi và trả lời khi nào có môn học cụ thể',
        structure: 'When do you have [tên môn học]? - I have it on [thứ trong tuần].',
        structureIpa: '/wen duː juː hæv ...? - aɪ hæv ɪt ɒn .../',
        vietnameseFormula: 'When do you have [maths / art / music]? - I have it on [Mondays / Wednesdays...].',
        meaning: 'Hỏi bạn có một môn học nào đó vào những ngày nào trong tuần.',
        parentReadingGuide: 'Bố mẹ hỏi: "When do you have maths?" Con đáp: "I have it on Mondays and Fridays."',
        parentNote: 'Trước các thứ trong tuần BẮT BUỘC dùng giới từ "on". Thứ thêm đuôi "-s" biểu thị lịch học lặp lại hàng tuần.',
        dialog: {
          speakerA: 'Mary',
          textA: 'When do you have maths?',
          textAVi: 'Khi nào bạn có môn Toán?',
          textAIpa: '/wen duː juː hæv mæθs?/',
          textAPhonetic: 'Oen đu du he-v mát-th-s?',
          speakerB: 'Nam',
          textB: 'I have it on Mondays and Fridays.',
          textBVi: 'Mình có môn Toán vào các ngày Thứ Hai và Thứ Sáu.',
          textBIpa: '/aɪ hæv ɪt ɒn ˈmʌn.deɪz ænd ˈfraɪ.deɪz/',
          textBPhonetic: 'Ai he-v ít on Măn-đê-z en Ph-rai-đê-z.'
        },
        deepExplanation: 'Từ "When" hỏi về thời điểm, ngày tháng. "I have it on..." dùng đại từ "it" thay thế cho môn học đã được đề cập ở câu hỏi.',
        memoryTrick: 'Hỏi ngày dùng WHEN • Trả lời nhớ cụm I HAVE IT ON + Thứ!',
        examples: [
          'When do you have art? - I have it on Mondays.',
          'When do you have music? - I have it on Wednesdays.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm đuôi "se" /z/ và "ce" /s/',
      words: [
        { word: 'Vietnamese', highlight: 'se', meaning: 'môn Tiếng Việt (/ˌvjet.nəˈmiːz/)', ipa: '/ˌvjet.nəˈmiːz/', reading: 'việt-nơ-MI-z' },
        { word: 'science', highlight: 'ce', meaning: 'môn Khoa học (/ˈsaɪ.əns/)', ipa: '/ˈsaɪ.əns/', reading: 'XAI-ừn-s' },
        { word: 'Japanese', highlight: 'se', meaning: 'tiếng Nhật (/ˌdʒæp.ənˈiːz/)', ipa: '/ˌdʒæp.ənˈiːz/', reading: 'dja-pơ-NI-z' },
        { word: 'nice', highlight: 'ce', meaning: 'tốt bụng / đẹp (/naɪs/)', ipa: '/naɪs/', reading: 'NAI-s' }
      ],
      sentence: 'When do you have Vietnamese? We have science today.',
      sentenceIpa: '/wen duː juː hæv ˌvjet.nəˈmiːz? wiː hæv ˈsaɪ.əns təˈdeɪ./',
      sentenceReading: 'Oen đu du he-v việt-nơ-MI-z? Ui he-v XAI-ừn-s tờ-đây.',
      sentenceMeaning: 'Khi nào bạn có môn Tiếng Việt? Hôm nay chúng mình có môn Khoa học.',
      ruleExplanation: 'Đuôi "se" trong Vietnamese là âm hữu thanh rung nhẹ /z/. Đuôi "ce" trong science là âm xì gió vô thanh nhẹ nhàng /s/.'
    },
    parentGuide: {
      overview: 'Unit 7 trang bị cho con vốn từ vựng về các môn học quen thuộc (Tiếng Việt, Tiếng Anh, Toán, Khoa học, Mĩ thuật, Âm nhạc, Lịch sử - Địa lí) và khả năng trao đổi tự tin về thời khóa biểu tuần học bằng tiếng Anh.',
      coreGoals: [
        'Con hỏi và đáp trôi chảy về môn học hôm nay: "What subjects do you have today? - I have..."',
        'Con biết hỏi và chỉ rõ ngày học trong tuần: "When do you have...? - I have it on..."',
        'Con phân biệt chuẩn xác âm đuôi "se" (/z/) và "ce" (/s/) trong các từ Vietnamese và science.'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'What subjects do you have today, sweetie?',
          parentPromptVi: 'Hôm nay con yêu học những môn gì thế?',
          parentPromptIpa: '/wɒt ˈsʌb.dʒekts duː juː hæv təˈdeɪ, ˈswiː.ti?/',
          parentPromptReading: 'Oát xắp-dịch-s đu du he-v tờ-đây, x-guýt-ti?',
          childResponse: 'I have English, maths and science today!',
          childResponseVi: 'Hôm nay con có môn Tiếng Anh, Toán và Khoa học ạ!',
          childResponseIpa: '/aɪ hæv ˈɪŋ.ɡlɪʃ, mæθs ænd ˈsaɪ.əns təˈdeɪ!/',
          childResponseReading: 'Ai he-v Ính-glish, mát-th-s en xai-ừn-s tờ-đây!',
          coachingTip: 'Cùng con mở thời khóa biểu dán ở góc học tập và cùng chỉ tay đọc to tên các môn học bằng tiếng Anh.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Dùng sai giới từ: nói "in Mondays" hoặc "at Mondays".',
          correction: 'Sửa lại: "on Mondays".',
          why: 'Trước các thứ trong tuần luôn luôn đi cùng giới từ "on".'
        },
        {
          mistake: 'Quên âm /θ/ trong "maths" hoặc đọc thành "mát" cụt lủn.',
          correction: 'Đặt đầu lưỡi kẹp nhẹ giữa 2 hàm răng thổi gió rồi khẽ phát âm s: /mæθs/.',
          why: 'Tổ hợp âm /θs/ cần sự phối hợp nhịp nhàng của lưỡi và luồng hơi.'
        },
        {
          mistake: 'Quên đuôi số nhiều của subject: "What subject do you have today?"',
          correction: 'Sửa lại: "What subjects do you have today?"',
          why: 'Một ngày học thường có nhiều môn, nên danh từ "subjects" cần ở dạng số nhiều.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Thử tài Thư Ký Xếp Thời Khóa Biểu"',
        timeNeeded: '8 phút',
        steps: [
          'Bố mẹ chuẩn bị một tờ giấy kẻ 5 cột từ Thứ Hai đến Thứ Sáu.',
          'Bố mẹ hỏi: "When do you have art?" - Con tìm vị trí và đáp: "I have it on Thursdays!" rồi viết chữ ART vào ô tương ứng.',
          'Sau khi hoàn thành cả tuần, con dán bảng thời khóa biểu tiếng Anh lên bàn học.'
        ],
        benefit: 'Giúp con ghi nhớ sâu tên các môn học, gắn liền kiến thức với nề nếp học tập hàng ngày.'
      },
      praisePhrases: [
        { en: 'You know your timetable so well!', vi: 'Con nhớ thời khóa biểu siêu quá!', phonetic: 'Du nâu do taim-tây-bồ xô oel!' },
        { en: 'Wonderful English speaking!', vi: 'Con nói tiếng Anh rất tuyệt vời!', phonetic: 'Oăn-đơ-phun Ính-glish x-pích-king!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg7-1',
        scrambledWords: ['subjects', 'What', 'today?', 'you', 'have', 'do'],
        correctSentence: 'What subjects do you have today?',
        vietnameseMeaning: 'Hôm nay bạn có những môn học nào?',
        hint: 'What subjects...'
      },
      {
        id: 'sg7-2',
        scrambledWords: ['maths.', 'English', 'I', 'and', 'have'],
        correctSentence: 'I have English and maths.',
        vietnameseMeaning: 'Tớ có môn Tiếng Anh và môn Toán.',
        hint: 'I have...'
      },
      {
        id: 'sg7-3',
        scrambledWords: ['you', 'science?', 'do', 'When', 'have'],
        correctSentence: 'When do you have science?',
        vietnameseMeaning: 'Khi nào bạn có môn Khoa học?',
        hint: 'When do you...'
      },
      {
        id: 'sg7-4',
        scrambledWords: ['it', 'I', 'Mondays.', 'on', 'have'],
        correctSentence: 'I have it on Mondays.',
        vietnameseMeaning: 'Tớ có môn đó vào các ngày Thứ Hai.',
        hint: 'I have it on...'
      }
    ],
    quizzes: [
      {
        id: 'q7-1',
        question: 'Chọn từ đúng: "What ___ do you have today?" - "I have English and maths."',
        questionVi: 'Chọn danh từ số nhiều:',
        options: ['subjects', 'subject', 'subjectes', 'subjets'],
        correctIndex: 0,
        explanation: 'Cấu trúc hỏi thời khóa biểu dùng danh từ số nhiều "subjects".',
        type: 'choice'
      },
      {
        id: 'q7-2',
        question: 'Chọn giới từ thích hợp: "I have music ___ Wednesdays."',
        questionVi: 'Chọn giới từ chỉ thời gian:',
        options: ['on', 'in', 'at', 'to'],
        correctIndex: 0,
        explanation: 'Trước các thứ trong tuần luôn luôn đi cùng giới từ "on": on Wednesdays.',
        type: 'choice'
      },
      {
        id: 'q7-3',
        question: 'Từ nào sau đây kết thúc bằng âm xì gió nhẹ /s/?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['science', 'Vietnamese', 'Japanese', 'mountains'],
        correctIndex: 0,
        explanation: '"science" kết thúc bằng đuôi -ce phát âm là /s/.',
        type: 'choice'
      },
      {
        id: 'q7-4',
        question: 'Cụm từ "every school day" có nghĩa là gì?',
        questionVi: 'Hiểu nghĩa từ vựng:',
        options: ['mọi ngày đi học', 'chỉ ngày cuối tuần', 'chỉ ngày thứ hai', 'một ngày nghỉ'],
        correctIndex: 0,
        explanation: '"every school day" nghĩa là mọi ngày trong tuần đi học (từ Thứ Hai đến Thứ Sáu).',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Môn Tiếng Việt', type: 'question', question: 'Tên tiếng Anh môn Tiếng Việt là?', options: ['Vietnamese', 'English'], correctAnswer: 'Vietnamese', icon: '📘' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Giới từ ngày', type: 'question', question: 'Điền giới từ: "I have it ___ Mondays."', options: ['on', 'in'], correctAnswer: 'on', icon: '📅' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Môn Khoa học', type: 'question', question: 'Từ "science" nghĩa là gì?', options: ['Khoa học', 'Mĩ thuật'], correctAnswer: 'Khoa học', icon: '🔬' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Môn Toán', type: 'question', question: 'Tên tiếng Anh môn Toán là?', options: ['maths', 'music'], correctAnswer: 'maths', icon: '📐' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 8 =================
  {
    id: 'unit-8',
    volume: 1,
    unitNumber: 8,
    title: 'My favourite subjects',
    vietnameseTitle: 'Môn học yêu thích của em',
    theme: 'Me and My School',
    colorScheme: {
      primary: 'text-rose-700',
      secondary: 'bg-rose-50 border-rose-200',
      accent: 'bg-rose-600 hover:bg-rose-700 text-white',
      badgeBg: 'bg-rose-100 text-rose-800'
    },
    vocabList: [
      { id: 'v8-1', word: 'favourite', ipa: '/ˈfeɪ.vər.ɪt/', vietnamese: 'được yêu thích nhất', example: 'Art is my favourite subject.', exampleMeaning: 'Mĩ thuật là môn học yêu thích nhất của tớ.', iconEmoji: '❤️' },
      { id: 'v8-2', word: 'art', ipa: '/ɑːt/', vietnamese: 'môn Mĩ thuật', example: 'What’s your favourite subject? - It’s art.', exampleMeaning: 'Môn học yêu thích của bạn là gì? - Đó là môn Mĩ thuật.', iconEmoji: '🎨' },
      { id: 'v8-3', word: 'music', ipa: '/ˈmjuː.zɪk/', vietnamese: 'môn Âm nhạc', example: 'I like music very much.', exampleMeaning: 'Tớ rất thích môn Âm nhạc.', iconEmoji: '🎵' },
      { id: 'v8-4', word: 'PE', ipa: '/ˌpiː ˈiː/', vietnamese: 'môn Thể dục (Giáo dục thể chất)', example: 'We play basketball in PE class.', exampleMeaning: 'Chúng mình chơi bóng rổ trong giờ Thể dục.', iconEmoji: '🏃' },
      { id: 'v8-5', word: 'IT', ipa: '/ˌaɪ ˈtiː/', vietnamese: 'môn Tin học (Công nghệ thông tin)', example: 'We study computers in IT lessons.', exampleMeaning: 'Chúng mình học máy tính trong các tiết Tin học.', iconEmoji: '💻' },
      { id: 'v8-6', word: 'why', ipa: '/waɪ/', vietnamese: 'tại sao / vì sao', example: 'Why do you like English?', exampleMeaning: 'Tại sao bạn lại thích môn Tiếng Anh?', iconEmoji: '❓' },
      { id: 'v8-7', word: 'because', ipa: '/bɪˈkɒz/', vietnamese: 'bởi vì / vì', example: 'Because I want to be a singer.', exampleMeaning: 'Bởi vì tớ muốn trở thành một ca sĩ.', iconEmoji: '💡' },
      { id: 'v8-8', word: 'English teacher', ipa: '/ˈɪŋ.ɡlɪʃ ˈtiː.tʃər/', vietnamese: 'giáo viên tiếng Anh', example: 'I want to be an English teacher.', exampleMeaning: 'Tớ muốn trở thành một giáo viên dạy tiếng Anh.', iconEmoji: '🧑‍🏫' },
      { id: 'v8-9', word: 'singer', ipa: '/ˈsɪŋ.ər/', vietnamese: 'ca sĩ', example: 'She wants to be a famous singer.', exampleMeaning: 'Cô ấy muốn trở thành một ca sĩ nổi tiếng.', iconEmoji: '🎤' },
      { id: 'v8-10', word: 'painter', ipa: '/ˈpeɪn.tər/', vietnamese: 'họa sĩ', example: 'Nam wants to be a talented painter.', exampleMeaning: 'Nam muốn trở thành một họa sĩ tài năng.', iconEmoji: '🖌️' },
      { id: 'v8-11', word: 'IT teacher', ipa: '/ˌaɪ ˈtiː ˈtiː.tʃər/', vietnamese: 'giáo viên tin học', example: 'He wants to be an IT teacher.', exampleMeaning: 'Cậu ấy muốn trở thành giáo viên tin học.', iconEmoji: '👨‍💻' }
    ],
    grammar: [
      {
        id: 'g8-1',
        title: 'Hỏi và trả lời về môn học yêu thích',
        structure: 'What’s your favourite subject? - It’s [art / music / PE / IT...].',
        structureIpa: '/wɒts jɔː ˈfeɪ.vər.ɪt ˈsʌb.dʒekt? - ɪts .../',
        vietnameseFormula: 'What’s your favourite subject? - It’s [tên môn học].',
        meaning: 'Hỏi xem đối phương thích nhất môn học nào và trả lời.',
        parentReadingGuide: 'Bố mẹ hỏi: "What’s your favourite subject?" (Oát-s do phây-vơ-rịt xắp-dịch?). Con đáp: "It’s art." (Ít-s a-t).',
        parentNote: 'Cụm "What’s" là viết tắt của "What is". "It’s" là viết tắt của "It is". Sau "It’s" là tên môn học không cần mạo từ "a/an".',
        dialog: {
          speakerA: 'Lucy',
          textA: 'What’s your favourite subject, Linh?',
          textAVi: 'Môn học yêu thích nhất của bạn là gì hả Linh?',
          textAIpa: '/wɒts jɔː ˈfeɪ.vər.ɪt ˈsʌb.dʒekt, lɪn?/',
          textAPhonetic: 'Oát-s do phây-vơ-rịt xắp-dịch, Linh?',
          speakerB: 'Linh',
          textB: 'It’s art. I love drawing.',
          textBVi: 'Đó là môn Mĩ thuật. Tớ rất mê vẽ tranh.',
          textBIpa: '/ɪts ɑːt. aɪ lʌv ˈdrɔː.ɪŋ/',
          textBPhonetic: 'Ít-s a-t. Ai lăv ro-ing.'
        },
        deepExplanation: 'Từ "favourite" mang nghĩa ưa thích nhất. "subject" là danh từ số ít chỉ môn học. Câu trả lời dùng đại từ nhân xưng "It" thay thế cho môn học đó.',
        memoryTrick: 'Hỏi môn thích: WHAT’S YOUR FAVOURITE SUBJECT? • Đáp gọn: IT’S + Môn học!',
        examples: [
          'What’s your favourite subject? - It’s PE.',
          'What’s your favourite subject? - It’s IT.',
          'What’s your favourite subject? - It’s music.'
        ]
      },
      {
        id: 'g8-2',
        title: 'Hỏi và trả lời lý do thích môn học (Ước mơ nghề nghiệp)',
        structure: 'Why do you like [tên môn]? - Because I want to be [a / an + nghề nghiệp].',
        structureIpa: '/waɪ duː juː laɪk ...? - bɪˈkɒz aɪ wɒnt tuː biː .../',
        vietnameseFormula: 'Why do you like [English / music / art / IT]? - Because I want to be [a / an + nghề nghiệp].',
        meaning: 'Hỏi lý do vì sao thích một môn học và giải thích bằng ước mơ nghề nghiệp tương lai.',
        parentReadingGuide: 'Bố mẹ hỏi: "Why do you like English?" Con đáp: "Because I want to be an English teacher."',
        parentNote: 'Lưu ý mạo từ "an" đi trước danh từ bắt đầu bằng nguyên âm: an English teacher, an IT teacher. Dùng "a" trước phụ âm: a singer, a painter.',
        dialog: {
          speakerA: 'Ben',
          textA: 'Why do you like English?',
          textAVi: 'Tại sao bạn lại thích môn Tiếng Anh?',
          textAIpa: '/waɪ duː juː laɪk ˈɪŋ.ɡlɪʃ?/',
          textAPhonetic: 'Oai đu du lai-k Ính-glish?',
          speakerB: 'Mai',
          textB: 'Because I want to be an English teacher.',
          textBVi: 'Bởi vì tớ muốn trở thành một cô giáo dạy tiếng Anh.',
          textBIpa: '/bɪˈkɒz aɪ wɒnt tuː biː ən ˈɪŋ.ɡlɪʃ ˈtiː.tʃər/',
          textBPhonetic: 'Bi-kơ-z ai oăn-t tu bi ơn Ính-glish ti-chờ.'
        },
        deepExplanation: 'Cặp từ hỏi-đáp kinh điển "Why...?" (Tại sao...?) luôn đi cùng câu trả lời bắt đầu bằng "Because..." (Bởi vì...). Cụm "want to be" nghĩa là muốn trở thành.',
        memoryTrick: 'Hỏi WHY (Vì sao) ➔ Trả lời BECAUSE (Bởi vì) • Chớ quên mạo từ A / AN trước nghề!',
        examples: [
          'Why do you like music? - Because I want to be a singer.',
          'Why do you like art? - Because I want to be a painter.',
          'Why do you like IT? - Because I want to be an IT teacher.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm kết thúc "ke" /k/ và "te" /t/',
      words: [
        { word: 'like', highlight: 'ke', meaning: 'thích / yêu thích (/laɪk/)', ipa: '/laɪk/', reading: 'LAI-k' },
        { word: 'write', highlight: 'te', meaning: 'viết (/raɪt/)', ipa: '/raɪt/', reading: 'RAI-t' },
        { word: 'make', highlight: 'ke', meaning: 'làm / tạo nên (/meɪk/)', ipa: '/meɪk/', reading: 'MÂY-k' },
        { word: 'white', highlight: 'te', meaning: 'màu trắng (/waɪt/)', ipa: '/waɪt/', reading: 'OAI-t' }
      ],
      sentence: 'I like English. I write English words.',
      sentenceIpa: '/aɪ laɪk ˈɪŋ.ɡlɪʃ. aɪ raɪt ˈɪŋ.ɡlɪʃ wɜːdz./',
      sentenceReading: 'Ai lai-k Ính-glish. Ai rai-t Ính-glish oớt-d.',
      sentenceMeaning: 'Tớ thích môn Tiếng Anh. Tớ tập viết các từ tiếng Anh.',
      ruleExplanation: 'Đuôi "ke" phát âm là /k/ (bật hơi nhẹ ở cuống họng, vô thanh). Đuôi "te" phát âm là /t/ (đầu lưỡi chạm nướu trên rồi bật hơi dứt khoát).'
    },
    parentGuide: {
      overview: 'Unit 8 mở ra thế giới đam mê học tập của con qua 4 môn học trực quan (Art, Music, PE, IT) và chắp cánh ước mơ nghề nghiệp tương lai (giáo viên, họa sĩ, ca sĩ, chuyên gia tin học).',
      coreGoals: [
        'Con hỏi và nói trôi chảy môn học yêu thích: "What’s your favourite subject? - It’s..."',
        'Con giải thích được lý do và ước mơ của mình: "Why do you like...? - Because I want to be a/an..."',
        'Con phân biệt và bật chuẩn hai âm cuối quan trọng: âm /k/ trong "like" và âm /t/ trong "write".'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'What’s your favourite subject, my dear?',
          parentPromptVi: 'Môn học yêu thích nhất của con yêu là gì?',
          parentPromptIpa: '/wɒts jɔː ˈfeɪ.vər.ɪt ˈsʌb.dʒekt, maɪ dɪər?/',
          parentPromptReading: 'Oát-s do phây-vơ-rịt xắp-dịch, mai đi-ơ?',
          childResponse: 'It’s art! Because I want to be a painter.',
          childResponseVi: 'Là môn Mĩ thuật ạ! Vì con muốn trở thành họa sĩ.',
          childResponseIpa: '/ɪts ɑːt! bɪˈkɒz aɪ wɒnt tuː biː ə ˈpeɪn.tər./',
          childResponseReading: 'Ít-s a-t! Bi-kơ-z ai oăn-t tu bi ờ pên-tờ.',
          coachingTip: 'Khích lệ con tự do vẽ một bức tranh về ước mơ của mình và dán chữ tiếng Anh chỉ nghề nghiệp tương lai.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Dùng sai mạo từ: "a English teacher" hoặc "an singer".',
          correction: 'Quy tắc: "an English teacher", "an IT teacher" (nguyên âm E, I); "a singer", "a painter" (phụ âm S, P).',
          why: 'Trước các từ bắt đầu bằng nguyên âm phát âm u, e, o, a, i, ta bắt buộc dùng mạo từ "an".'
        },
        {
          mistake: 'Quên cụm từ "to be": "Because I want a singer."',
          correction: 'Sửa lại: "Because I want to be a singer."',
          why: 'Động từ "want" cần đi với "to be" để mang nghĩa "muốn trở thành / làm ai đó".'
        },
        {
          mistake: 'Quên phát âm âm đuôi /k/ trong "like" làm câu nghe bị cụt.',
          correction: 'Bật hơi khẽ đuôi /k/: "I like /laɪk/ English."',
          why: 'Tiếng Anh là ngôn ngữ có âm đuôi (ending sounds), bật chuẩn giúp người bản xứ hiểu ngay lập tức.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Cây Cọ Thần Kỳ & Ước Mơ Của Em"',
        timeNeeded: '10 phút',
        steps: [
          'Bố mẹ chuẩn bị 4 mảnh giấy ghi tên: Art, Music, PE, IT.',
          'Con bốc thăm 1 môn và đóng vai biểu diễn động tác (ví dụ PE: nhảy dây; Music: cầm mic hát).',
          'Bố mẹ đoán: "Is your favourite subject PE?" - Con trả lời: "Yes! And I want to be a PE teacher / football player!"'
        ],
        benefit: 'Tạo không khí cười vui trong gia đình, giúp con tự tin nói tiếng Anh và khám phá đam mê bản thân.'
      },
      praisePhrases: [
        { en: 'Your dream is so beautiful!', vi: 'Ước mơ của con thật tuyệt đẹp!', phonetic: 'Do drim iz xô biu-ti-phun!' },
        { en: 'Great job speaking English!', vi: 'Con nói tiếng Anh rất siêu!', phonetic: 'Grết dóp x-pích-king Ính-glish!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg8-1',
        scrambledWords: ['favourite', 'What’s', 'subject?', 'your'],
        correctSentence: 'What’s your favourite subject?',
        vietnameseMeaning: 'Môn học yêu thích nhất của bạn là gì?',
        hint: 'What’s your...'
      },
      {
        id: 'sg8-2',
        scrambledWords: ['art.', 'It’s', 'favourite', 'My', 'is', 'subject'],
        correctSentence: 'It’s art.',
        vietnameseMeaning: 'Đó là môn Mĩ thuật.',
        hint: 'It’s...'
      },
      {
        id: 'sg8-3',
        scrambledWords: ['like', 'Why', 'you', 'music?', 'do'],
        correctSentence: 'Why do you like music?',
        vietnameseMeaning: 'Tại sao bạn lại thích môn Âm nhạc?',
        hint: 'Why do you...'
      },
      {
        id: 'sg8-4',
        scrambledWords: ['be', 'Because', 'to', 'want', 'I', 'a', 'singer.'],
        correctSentence: 'Because I want to be a singer.',
        vietnameseMeaning: 'Bởi vì tớ muốn trở thành một ca sĩ.',
        hint: 'Because I want...'
      }
    ],
    quizzes: [
      {
        id: 'q8-1',
        question: 'Chọn từ điền vào chỗ trống: "Why do you like English?" - "___ I want to be an English teacher."',
        questionVi: 'Chọn từ trả lời cho câu hỏi Why:',
        options: ['Because', 'When', 'What', 'Where'],
        correctIndex: 0,
        explanation: 'Câu hỏi "Why...?" (Tại sao) luôn trả lời bắt đầu bằng "Because..." (Bởi vì).',
        type: 'choice'
      },
      {
        id: 'q8-2',
        question: 'Chọn mạo từ đúng: "Because I want to be ___ English teacher."',
        questionVi: 'Điền mạo từ a hay an:',
        options: ['an', 'a', 'the', 'two'],
        correctIndex: 0,
        explanation: '"English" bắt đầu bằng nguyên âm E nên bắt buộc dùng mạo từ "an": an English teacher.',
        type: 'choice'
      },
      {
        id: 'q8-3',
        question: 'Môn học nào viết tắt là "PE"?',
        questionVi: 'Nhận biết từ viết tắt môn học:',
        options: ['Physical Education (Thể dục)', 'Information Technology (Tin học)', 'Physics (Vật lí)', 'Painting (Vẽ tranh)'],
        correctIndex: 0,
        explanation: 'PE là viết tắt của "Physical Education" (Môn Giáo dục thể chất / Thể dục).',
        type: 'choice'
      },
      {
        id: 'q8-4',
        question: 'Từ "like" kết thúc bằng âm nào?',
        questionVi: 'Nhận biết ngữ âm âm đuôi:',
        options: ['/k/ (bật hơi nhẹ)', '/t/ (bật đầu lưỡi)', '/s/ (xì gió)', '/z/ (rung thanh quản)'],
        correctIndex: 0,
        explanation: '"like" có đuôi "ke" phát âm là /laɪk/, kết thúc bằng âm /k/.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Môn Mĩ thuật', type: 'question', question: 'Tên tiếng Anh của môn Mĩ thuật là gì?', options: ['art', 'music'], correctAnswer: 'art', icon: '🎨' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Hỏi lý do', type: 'question', question: 'Từ để hỏi "Tại sao" là gì?', options: ['Why', 'When'], correctAnswer: 'Why', icon: '❓' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Mạo từ an', type: 'question', question: 'Chọn cụm đúng: "a English teacher" hay "an English teacher"?', options: ['an English teacher', 'a English teacher'], correctAnswer: 'an English teacher', icon: '🧑‍🏫' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Môn Tin học', type: 'question', question: 'Tên viết tắt của môn Tin học là gì?', options: ['IT', 'PE'], correctAnswer: 'IT', icon: '💻' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 9 =================
  {
    id: 'unit-9',
    volume: 1,
    unitNumber: 9,
    title: 'Our sports day',
    vietnameseTitle: 'Ngày hội thể thao của trường em',
    theme: 'Me and My School',
    colorScheme: {
      primary: 'text-orange-700',
      secondary: 'bg-orange-50 border-orange-200',
      accent: 'bg-orange-600 hover:bg-orange-700 text-white',
      badgeBg: 'bg-orange-100 text-orange-800'
    },
    vocabList: [
      { id: 'v9-1', word: 'sports day', ipa: '/ˈspɔːts ˌdeɪ/', vietnamese: 'ngày hội thể thao', example: 'Our sports day is in May.', exampleMeaning: 'Ngày hội thể thao trường tớ vào Tháng 5.', iconEmoji: '🏃' },
      { id: 'v9-2', word: 'May', ipa: '/meɪ/', vietnamese: 'Tháng 5', example: 'Is your sports day in May? - Yes, it is.', exampleMeaning: 'Ngày hội thể thao trường bạn vào Tháng 5 phải không? - Đúng vậy.', iconEmoji: '☀️' },
      { id: 'v9-3', word: 'June', ipa: '/dʒuːn/', vietnamese: 'Tháng 6', example: 'Our sports day is in June.', exampleMeaning: 'Ngày hội thể thao trường tớ diễn ra vào Tháng 6.', iconEmoji: '🏖️' },
      { id: 'v9-4', word: 'July', ipa: '/dʒuˈlaɪ/', vietnamese: 'Tháng 7', example: 'My birthday is in July.', exampleMeaning: 'Sinh nhật của tớ vào Tháng 7.', iconEmoji: '🍉' },
      { id: 'v9-5', word: 'August', ipa: '/ˈɔː.ɡəst/', vietnamese: 'Tháng 8', example: 'The sports day is in August.', exampleMeaning: 'Ngày hội thể thao diễn ra vào Tháng 8.', iconEmoji: '🌻' },
      { id: 'v9-6', word: 'September', ipa: '/sepˈtem.bər/', vietnamese: 'Tháng 9', example: 'We go back to school in September.', exampleMeaning: 'Chúng mình tựu trường vào Tháng 9.', iconEmoji: '🎒' },
      { id: 'v9-7', word: 'October', ipa: '/ɒkˈtəʊ.bər/', vietnamese: 'Tháng 10', example: 'When’s your sports day? - It’s in October.', exampleMeaning: 'Khi nào là ngày hội thể thao trường bạn? - Vào Tháng 10.', iconEmoji: '🎃' },
      { id: 'v9-8', word: 'November', ipa: '/nəʊˈvem.bər/', vietnamese: 'Tháng 11', example: 'Our sports day is in November.', exampleMeaning: 'Ngày hội thể thao trường tớ vào Tháng 11.', iconEmoji: '🍂' },
      { id: 'v9-9', word: 'December', ipa: '/dɪˈsem.bər/', vietnamese: 'Tháng 12', example: 'Christmas is in December.', exampleMeaning: 'Lễ Giáng sinh diễn ra vào Tháng 12.', iconEmoji: '🎄' },
      { id: 'v9-10', word: 'playground', ipa: '/ˈpleɪ.ɡraʊnd/', vietnamese: 'sân trường / sân chơi', example: 'We play in the school playground.', exampleMeaning: 'Chúng mình vui chơi ở sân trường.', iconEmoji: '🏟️' },
      { id: 'v9-11', word: 'badminton', ipa: '/ˈbæd.mɪn.tən/', vietnamese: 'môn cầu lông', example: 'The boys play badminton.', exampleMeaning: 'Các bạn nam chơi cầu lông.', iconEmoji: '🏸' },
      { id: 'v9-12', word: 'basketball', ipa: '/ˈbɑː.skɪt.bɔːl/', vietnamese: 'môn bóng rổ', example: 'The teachers play basketball.', exampleMeaning: 'Các thầy cô chơi bóng rổ.', iconEmoji: '🏀' }
    ],
    grammar: [
      {
        id: 'g9-1',
        title: 'Hỏi và trả lời ngày hội thể thao có vào một tháng cụ thể không',
        structure: 'Is your sports day in [tên tháng]? - Yes, it is. / No, it isn’t. It’s in [tháng].',
        structureIpa: '/ɪz jɔːr spɔːts deɪ ɪn ...? - jes, ɪt ɪz. / nəʊ, ɪt ˈɪz.ənt. ɪts ɪn .../',
        vietnameseFormula: 'Is your sports day in [May / June / October]? - Yes, it is. / No, it isn’t. It’s in [tháng thực tế].',
        meaning: 'Hỏi xác nhận ngày hội thể thao có diễn ra vào tháng đó hay không và cách trả lời khẳng định hoặc đính chính.',
        parentReadingGuide: 'Bố mẹ hỏi: "Is your sports day in May?" (Iz do x-po-t-s đây in Mây?). Con đáp: "Yes, it is." (Dét, ít iz) hoặc "No, it isn’t. It’s in April." (Nâu, ít i-zừn-t. Ít-s in Ê-prồ).',
        parentNote: 'Trước các tháng trong năm luôn luôn dùng giới từ "in" (in May, in October). "isn’t" là viết tắt của "is not".',
        dialog: {
          speakerA: 'Girl',
          textA: 'Is your sports day in May too?',
          textAVi: 'Ngày hội thể thao trường bạn cũng vào Tháng 5 à?',
          textAIpa: '/ɪz jɔːr spɔːts deɪ ɪn meɪ tuː?/',
          textAPhonetic: 'Iz do x-po-t-s đây in Mây tu?',
          speakerB: 'Boy',
          textB: 'No, it isn’t. It’s in April.',
          textBVi: 'Không phải. Trường tớ tổ chức vào Tháng 4.',
          textBIpa: '/nəʊ, ɪt ˈɪz.ənt. ɪts ɪn ˈeɪ.prəl/',
          textBPhonetic: 'Nâu, ít i-zừn-t. Ít-s in Ê-prồ.'
        },
        deepExplanation: 'Câu hỏi Yes/No bắt đầu bằng trợ động từ To be "Is", theo sau là cụm chủ ngữ số ít "your sports day" và trạng ngữ chỉ thời gian "in + [month]".',
        memoryTrick: 'Hỏi IS ➔ Đáp YES, IT IS • Nếu sai ➔ NO, IT ISN’T kèm tháng đúng!',
        examples: [
          'Is your sports day in June? - Yes, it is.',
          'Is your sports day in March? - No, it isn’t. It’s in July.',
          'Is your sports day in August? - Yes, it is.'
        ]
      },
      {
        id: 'g9-2',
        title: 'Hỏi và trả lời trực tiếp về thời gian ngày hội thể thao',
        structure: 'When’s your sports day? - It’s in [tên tháng].',
        structureIpa: '/wenz jɔːr spɔːts deɪ? - ɪts ɪn .../',
        vietnameseFormula: 'When’s your sports day? - It’s in [September / October / November / December].',
        meaning: 'Hỏi khi nào là ngày hội thể thao của trường bạn và trả lời mốc tháng diễn ra sự kiện.',
        parentReadingGuide: 'Bố mẹ hỏi: "When’s your sports day?" (Oen-z do x-po-t-s đây?). Con đáp: "It’s in October." (Ít-s in Óc-tâu-bờ).',
        parentNote: '"When’s" là viết tắt của "When is". Câu trả lời bắt buộc dùng cụm "It’s in + [tháng]".',
        dialog: {
          speakerA: 'Nam',
          textA: 'When’s your sports day?',
          textAVi: 'Khi nào là ngày hội thể thao của trường bạn?',
          textAIpa: '/wenz jɔːr spɔːts deɪ?/',
          textAPhonetic: 'Oen-z do x-po-t-s đây?',
          speakerB: 'Mai',
          textB: 'It’s in October.',
          textBVi: 'Nó diễn ra vào Tháng 10.',
          textBIpa: '/ɪts ɪn ɒkˈtəʊ.bər/',
          textBPhonetic: 'Ít-s in Óc-tâu-bờ.'
        },
        deepExplanation: 'Từ để hỏi "When" mang nghĩa "khi nào / bao giờ". Đại từ "It" thay thế cho "sports day" trong câu trả lời.',
        memoryTrick: 'Hỏi thời gian: WHEN’S YOUR SPORTS DAY? ➔ Đáp nhanh: IT’S IN + Tháng!',
        examples: [
          'When’s your sports day? - It’s in September.',
          'When’s your sports day? - It’s in November.',
          'When’s your sports day? - It’s in December.'
        ]
      }
    ],
    phonics: {
      sound: 'Chữ cái "y" phát âm là /i/ và /aɪ/',
      words: [
        { word: 'February', highlight: 'y', meaning: 'Tháng 2 (/ˈfeb.ru.ər.i/)', ipa: '/ˈfeb.ru.ər.i/', reading: 'phe-bru-ờ-ri' },
        { word: 'July', highlight: 'y', meaning: 'Tháng 7 (/dʒuˈlaɪ/)', ipa: '/dʒuˈlaɪ/', reading: 'du-LAI' },
        { word: 'January', highlight: 'y', meaning: 'Tháng 1 (/ˈdʒæn.ju.ə.ri/)', ipa: '/ˈdʒæn.ju.ə.ri/', reading: 'gien-nu-ờ-ri' },
        { word: 'cycling', highlight: 'y', meaning: 'đi xe đạp (/ˈsaɪ.klɪŋ/)', ipa: '/ˈsaɪ.klɪŋ/', reading: 'XAI-kling' }
      ],
      sentence: 'Our sports day is in February. My birthday is in July.',
      sentenceIpa: '/aʊər spɔːts deɪ ɪz ɪn ˈfeb.ru.ər.i. maɪ ˈbɜːθ.deɪ ɪz ɪn dʒuˈlaɪ./',
      sentenceReading: 'Au-ờ x-po-t-s đây iz in phe-bru-ờ-ri. Mai bớt-th-đây iz in du-lai.',
      sentenceMeaning: 'Ngày hội thể thao trường tớ vào Tháng 2. Sinh nhật của tớ vào Tháng 7.',
      ruleExplanation: 'Chữ cái "y" ở cuối từ nhiều âm tiết như February, January thường phát âm là /i/ ngắn. Ở các từ như July, cycling, "y" phát âm là nguyên âm đôi /aɪ/.'
    },
    parentGuide: {
      overview: 'Unit 9 giúp con làm chủ tên 12 tháng trong năm, cách hỏi đáp mốc thời gian sự kiện học đường (Ngày hội thể thao) và rèn luyện kỹ năng đọc hiểu - thuyết trình áp phích.',
      coreGoals: [
        'Con hỏi và đáp câu hỏi Yes/No: "Is your sports day in...? - Yes, it is. / No, it isn’t. It’s in..."',
        'Con hỏi thời điểm sự kiện: "When’s your sports day? - It’s in..."',
        'Con phân biệt chuẩn hai cách phát âm của chữ "y": âm /i/ (February) và âm /aɪ/ (July).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'When’s your sports day at school, my child?',
          parentPromptVi: 'Khi nào là ngày hội thể thao ở trường của con yêu?',
          parentPromptIpa: '/wenz jɔːr spɔːts deɪ æt skuːl, maɪ tʃaɪld?/',
          parentPromptReading: 'Oen-z do x-po-t-s đây ét x-kun, mai chai-l-đ?',
          childResponse: 'It’s in November! We play badminton and football.',
          childResponseVi: 'Vào Tháng 11 ạ! Chúng con chơi cầu lông và bóng đá.',
          childResponseIpa: '/ɪts ɪn nəʊˈvem.bər! wiː pleɪ ˈbæd.mɪn.tən ænd ˈfʊt.bɔːl./',
          childResponseReading: 'Ít-s in nâu-vem-bờ! Ui plei bát-min-tơn en phút-bo-l.',
          coachingTip: 'Cùng con mở lịch treo tường chỉ vào tháng trường con tổ chức giải thể thao hoặc ngày chạy việt dã.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Dùng sai giới từ: nói "on May" hoặc "at May".',
          correction: 'Sửa lại: "in May".',
          why: 'Trước tháng và năm trong tiếng Anh luôn luôn đi với giới từ "in". Giới từ "on" chỉ dùng trước ngày và thứ.'
        },
        {
          mistake: 'Phát âm nhầm chữ "y" trong July thành /i/ (đọc thành du-li).',
          correction: 'Sửa lại: /dʒuˈlaɪ/ (du-lai), nhấn mạnh vào âm thứ hai.',
          why: 'Từ July có trọng âm rơi vào âm tiết thứ hai với nguyên âm đôi /aɪ/.'
        },
        {
          mistake: 'Quên chữ "s" trong cụm từ "sports day".',
          correction: 'Phát âm rõ âm /s/: "sports day" /ˈspɔːts ˌdeɪ/.',
          why: 'Sports day là cụm danh từ ghép chỉ ngày hội thể thao, luôn có âm s giữa hai từ.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Vòng Quanh 12 Tháng Thể Thao"',
        timeNeeded: '10 phút',
        steps: [
          'Bố mẹ chuẩn bị lịch bàn hoặc lịch treo tường.',
          'Bố mẹ chỉ vào 1 tháng bất kỳ và hỏi: "Is your sports day in October?"',
          'Con quan sát và đóng vai trả lời: "Yes, it is!" hoặc "No, it isn’t. It’s in May!"'
        ],
        benefit: 'Giúp con phản xạ tiếng Anh tự nhiên, ghi nhớ sâu tên gọi các tháng trong năm.'
      },
      praisePhrases: [
        { en: 'You know all 12 months so well!', vi: 'Con nhớ cả 12 tháng siêu quá!', phonetic: 'Du nâu ô-l tu-oen-v măn-th-s xô oel!' },
        { en: 'Fantastic pronunciation!', vi: 'Phát âm của con rất tuyệt vời!', phonetic: 'Phèn-tét-x-tích prờ-năn-xi-ây-sần!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg9-1',
        scrambledWords: ['sports', 'in', 'your', 'Is', 'day', 'May?'],
        correctSentence: 'Is your sports day in May?',
        vietnameseMeaning: 'Ngày hội thể thao trường bạn vào Tháng 5 phải không?',
        hint: 'Is your sports...'
      },
      {
        id: 'sg9-2',
        scrambledWords: ['isn’t.', 'it', 'No,', 'April.', 'in', 'It’s'],
        correctSentence: 'No, it isn’t. It’s in April.',
        vietnameseMeaning: 'Không phải. Nó diễn ra vào Tháng 4.',
        hint: 'No, it isn’t...'
      },
      {
        id: 'sg9-3',
        scrambledWords: ['day?', 'your', 'sports', 'When’s'],
        correctSentence: 'When’s your sports day?',
        vietnameseMeaning: 'Khi nào là ngày hội thể thao trường bạn?',
        hint: 'When’s your...'
      },
      {
        id: 'sg9-4',
        scrambledWords: ['October.', 'in', 'It’s'],
        correctSentence: 'It’s in October.',
        vietnameseMeaning: 'Nó diễn ra vào Tháng 10.',
        hint: 'It’s in...'
      }
    ],
    quizzes: [
      {
        id: 'q9-1',
        question: 'Chọn giới từ điền vào chỗ trống: "Is your sports day ___ May?"',
        questionVi: 'Chọn giới từ đứng trước tháng:',
        options: ['in', 'on', 'at', 'to'],
        correctIndex: 0,
        explanation: 'Trước các tháng trong năm luôn đi cùng giới từ "in" (in May, in June).',
        type: 'choice'
      },
      {
        id: 'q9-2',
        question: 'Chọn câu trả lời đúng: "When’s your sports day?" - "___ in October."',
        questionVi: 'Chọn đại từ và động từ to be viết tắt:',
        options: ['It’s', 'They’re', 'I’m', 'We’re'],
        correctIndex: 0,
        explanation: '"sports day" là danh từ số ít nên dùng "It’s in..." (It is in...).',
        type: 'choice'
      },
      {
        id: 'q9-3',
        question: 'Từ nào sau đây có chữ "y" phát âm là /aɪ/?',
        questionVi: 'Nhận biết ngữ âm:',
        options: ['July', 'February', 'January', 'sunny'],
        correctIndex: 0,
        explanation: '"July" có chữ y phát âm là /aɪ/ (/dʒuˈlaɪ/). Ba từ còn lại phát âm là /i/.',
        type: 'choice'
      },
      {
        id: 'q9-4',
        question: 'Trong bài đọc Lesson 3, các bạn nam chơi môn thể thao gì?',
        questionVi: 'Đọc hiểu thông tin:',
        options: ['badminton (cầu lông)', 'football (bóng đá)', 'basketball (bóng rổ)', 'cycling (đạp xe)'],
        correctIndex: 0,
        explanation: 'Bài đọc viết: "The boys play badminton. The girls play football."',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Tháng 5', type: 'question', question: 'Tên tiếng Anh của Tháng 5 là gì?', options: ['May', 'March'], correctAnswer: 'May', icon: '☀️' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Giới từ tháng', type: 'question', question: 'Điền từ: "It is ___ October."', options: ['in', 'on'], correctAnswer: 'in', icon: '📅' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Phát âm July', type: 'question', question: 'Chữ "y" trong July phát âm là gì?', options: ['/aɪ/', '/i/'], correctAnswer: '/aɪ/', icon: '🗣️' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'Môn cầu lông', type: 'question', question: 'Tên tiếng Anh môn cầu lông là gì?', options: ['badminton', 'basketball'], correctAnswer: 'badminton', icon: '🏸' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 1: UNIT 10 =================
  {
    id: 'unit-10',
    volume: 1,
    unitNumber: 10,
    title: 'Our summer holidays',
    vietnameseTitle: 'Kỳ nghỉ hè của chúng em',
    theme: 'Me and My Friends',
    colorScheme: {
      primary: 'text-teal-700',
      secondary: 'bg-teal-50 border-teal-200',
      accent: 'bg-teal-600 hover:bg-teal-700 text-white',
      badgeBg: 'bg-teal-100 text-teal-800'
    },
    vocabList: [
      { id: 'v10-1', word: 'summer holiday', ipa: '/ˈsʌm.ər ˈhɒl.ə.deɪ/', vietnamese: 'kỳ nghỉ hè', example: 'We had a wonderful summer holiday.', exampleMeaning: 'Chúng mình đã có một kỳ nghỉ hè thật tuyệt vời.', iconEmoji: '🏖️' },
      { id: 'v10-2', word: 'countryside', ipa: '/ˈkʌn.tri.saɪd/', vietnamese: 'miền quê / vùng nông thôn', example: 'I was in the countryside last weekend.', exampleMeaning: 'Cuối tuần trước tớ đã ở miền quê.', iconEmoji: '🌾' },
      { id: 'v10-3', word: 'mountains', ipa: '/ˈmaʊn.tɪnz/', vietnamese: 'vùng núi', example: 'She was in the mountains.', exampleMeaning: 'Bạn ấy đã ở trên vùng núi.', iconEmoji: '🏔️' },
      { id: 'v10-4', word: 'beach', ipa: '/biːtʃ/', vietnamese: 'bãi biển', example: 'Were you on the beach yesterday?', exampleMeaning: 'Hôm qua bạn có ở bãi biển không?', iconEmoji: '🏖️' },
      { id: 'v10-5', word: 'campsite', ipa: '/ˈkæmp.saɪt/', vietnamese: 'khu cắm trại', example: 'We were at the campsite.', exampleMeaning: 'Chúng tớ đã ở khu cắm trại.', iconEmoji: '⛺' },
      { id: 'v10-6', word: 'zoo', ipa: '/zuː/', vietnamese: 'vườn thú / sở thú', example: 'I was at the zoo with my brother.', exampleMeaning: 'Tớ đã đi sở thú cùng anh trai.', iconEmoji: '🦁' },
      { id: 'v10-7', word: 'London', ipa: '/ˈlʌn.dən/', vietnamese: 'Thủ đô Luân Đôn (Vương quốc Anh)', example: 'I was in London last summer.', exampleMeaning: 'Mùa hè năm ngoái tớ đã ở Luân Đôn.', iconEmoji: '🇬🇧' },
      { id: 'v10-8', word: 'Sydney', ipa: '/ˈsɪd.ni/', vietnamese: 'Thành phố Xít-ni (Nước Úc)', example: 'Sydney is famous for the Opera House.', exampleMeaning: 'Xít-ni nổi tiếng với Nhà hát Con Sò.', iconEmoji: '🇦🇺' },
      { id: 'v10-9', word: 'Tokyo', ipa: '/ˈtəʊ.kjoʊ/', vietnamese: 'Thủ đô Tô-ki-ô (Nhật Bản)', example: 'Where were you? - I was in Tokyo.', exampleMeaning: 'Bạn đã ở đâu? - Tớ đã ở Tokyo.', iconEmoji: '🇯🇵' },
      { id: 'v10-10', word: 'Bangkok', ipa: '/bæŋˈkɒk/', vietnamese: 'Thủ đô Băng Cốc (Thái Lan)', example: 'Bangkok has beautiful temples.', exampleMeaning: 'Băng Cốc có những ngôi đền tuyệt đẹp.', iconEmoji: '🇹🇭' },
      { id: 'v10-11', word: 'busy', ipa: '/ˈbɪz.i/', vietnamese: 'nhộn nhịp / sầm uất', example: 'The city was busy.', exampleMeaning: 'Thành phố rất nhộn nhịp đông vui.', iconEmoji: '🏙️' },
      { id: 'v10-12', word: 'helpful', ipa: '/ˈhelp.fəl/', vietnamese: 'tận tình / hay giúp đỡ', example: 'The people were very helpful.', exampleMeaning: 'Người dân ở đó rất nhiệt tình giúp đỡ.', iconEmoji: '🤝' }
    ],
    grammar: [
      {
        id: 'g10-1',
        title: 'Hỏi và trả lời xem ai đó có ở một nơi chốn nào trong quá khứ không',
        structure: 'Were you [at / on / in + nơi chốn] last weekend / yesterday? - Yes, I was. / No, I wasn’t.',
        structureIpa: '/wɜːr juː ... lɑːst ˌwiːkˈend? - jes, aɪ wɒz. / nəʊ, aɪ ˈwɒz.ənt./',
        vietnameseFormula: 'Were you [at the zoo / on the beach / in the countryside] last weekend? - Yes, I was. / No, I wasn’t.',
        meaning: 'Hỏi xác nhận ai đó có ở một địa điểm nào vào cuối tuần trước hay hôm qua hay không.',
        parentReadingGuide: 'Bố mẹ hỏi: "Were you in the countryside last weekend?" Con đáp: "Yes, I was." hoặc "No, I wasn’t. I was in the mountains."',
        parentNote: 'Động từ "to be" ở quá khứ: đi với "you" dùng "were", đi với "I" dùng "was". "wasn’t" = "was not".',
        dialog: {
          speakerA: 'Boy',
          textA: 'Were you in the countryside last weekend?',
          textAVi: 'Cuối tuần trước bạn có ở miền quê không?',
          textAIpa: '/wɜːr juː ɪn ðə ˈkʌn.tri.saɪd lɑːst ˌwiːkˈend?/',
          textAPhonetic: 'Uơ du in đờ căn-tri-xai-đ lát-s-t uých-en-đ?',
          speakerB: 'Girl',
          textB: 'No, I wasn’t. I was in the mountains.',
          textBVi: 'Không, tớ không ở đó. Tớ đã ở trên vùng núi cao.',
          textBIpa: '/nəʊ, aɪ ˈwɒz.ənt. aɪ wɒz ɪn ðə ˈmaʊn.tɪnz/',
          textBPhonetic: 'Nâu, ai oát-zừn-t. Ai oát-z in đờ mao-từn-z.'
        },
        deepExplanation: 'Thì quá khứ đơn (Past Simple) diễn tả sự việc đã kết thúc trong quá khứ với các dấu hiệu nhận biết: yesterday (hôm qua), last weekend (cuối tuần trước), last summer (mùa hè năm ngoái).',
        memoryTrick: 'Hỏi WERE YOU ➔ Trả lời YES, I WAS hoặc NO, I WASN’T!',
        examples: [
          'Were you at the zoo yesterday? - Yes, I was.',
          'Were you on the beach last weekend? - No, I wasn’t.',
          'Were you at the campsite last weekend? - Yes, I was.'
        ]
      },
      {
        id: 'g10-2',
        title: 'Hỏi và trả lời ai đó đã ở đâu vào mùa hè năm ngoái',
        structure: 'Where were you last summer? - I was in [Tên thành phố / địa danh].',
        structureIpa: '/weər wɜːr juː lɑːst ˈsʌm.ər? - aɪ wɒz ɪn .../',
        vietnameseFormula: 'Where were you last summer? - I was in [London / Sydney / Tokyo / Bangkok / Ha Long Bay].',
        meaning: 'Hỏi bạn đã đi du lịch ở đâu vào mùa hè năm trước và trả lời điểm đến cụ thể.',
        parentReadingGuide: 'Bố mẹ hỏi: "Where were you last summer?" Con đáp: "I was in Tokyo."',
        parentNote: '"Where" có âm /eə/ (mở rộng miệng), khác với "were" có âm /ɜː/ (trầm và cong lưỡi).',
        dialog: {
          speakerA: 'Nam',
          textA: 'Where were you last summer?',
          textAVi: 'Mùa hè năm ngoái bạn đã ở đâu thế?',
          textAIpa: '/weər wɜːr juː lɑːst ˈsʌm.ər?/',
          textAPhonetic: 'Ue-ơ uơ du lát-s-t xăm-mờ?',
          speakerB: 'Mary',
          textB: 'I was in Tokyo.',
          textBVi: 'Tớ đã đi du lịch ở Tokyo, Nhật Bản.',
          textBIpa: '/aɪ wɒz ɪn ˈtəʊ.kjoʊ/',
          textBPhonetic: 'Ai oát-z in Tâu-ki-ô.'
        },
        deepExplanation: 'Cấu trúc câu hỏi đặc biệt với từ để hỏi "Where" (Ở đâu). Đảo trợ từ "were" lên trước chủ ngữ "you". Trả lời dùng chủ ngữ "I" + "was" + giới từ "in" trước tên thành phố.',
        memoryTrick: 'Hỏi WHERE: ĐI ĐÂU ➔ Trả lời: I WAS IN + Thành phố tuyệt đẹp!',
        examples: [
          'Where were you last summer? - I was in London.',
          'Where were you last summer? - I was in Sydney.',
          'Where were you last summer? - I was in Bangkok.'
        ]
      }
    ],
    phonics: {
      sound: 'Phân biệt "were" (/wɜːr/) và "where" (/weər/)',
      words: [
        { word: 'were', highlight: 'ere', meaning: 'ở / thì (quá khứ của are)', ipa: '/wɜːr/', reading: 'u-ơ' },
        { word: 'where', highlight: 'ere', meaning: 'ở đâu (từ hỏi nơi chốn)', ipa: '/weər/', reading: 'ue-ơ' },
        { word: 'there', highlight: 'ere', meaning: 'ở đằng kia', ipa: '/ðeər/', reading: 'đe-ơ' },
        { word: 'here', highlight: 'ere', meaning: 'ở đây', ipa: '/hɪər/', reading: 'hi-ơ' }
      ],
      sentence: 'Were you on the beach last summer? Where were you last weekend?',
      sentenceIpa: '/wɜːr juː ɒn ðə biːtʃ lɑːst ˈsʌm.ər? weər wɜːr juː lɑːst ˌwiːkˈend?/',
      sentenceReading: 'Uơ du on đờ bít-ch lát-s-t xăm-mờ? Ue-ơ uơ du lát-s-t uých-en-đ?',
      sentenceMeaning: 'Mùa hè năm ngoái bạn có ở bãi biển không? Cuối tuần trước bạn đã ở đâu?',
      ruleExplanation: '"were" phát âm là /wɜːr/ (âm dài, khép khẩu hình). "where" có chữ "h" phát âm là /weər/ (nguyên âm đôi mở rộng miệng).'
    },
    parentGuide: {
      overview: 'Unit 10 là bài học cuối cùng của Tập 1 SGK Tiếng Anh 4, tổng kết vốn từ vựng địa danh thế giới, thì quá khứ đơn với To Be và kỹ năng thuyết trình sơ đồ tư duy kỳ nghỉ hè.',
      coreGoals: [
        'Con hỏi và đáp thành thạo mẫu câu: "Were you... last weekend? - Yes, I was. / No, I wasn’t."',
        'Con tự tin chia sẻ về chuyến đi mùa hè: "Where were you last summer? - I was in..."',
        'Con phân biệt chuẩn hai từ dễ nhầm "were" (/wɜːr/) và "where" (/weər/).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Where were you last summer, my little explorer?',
          parentPromptVi: 'Mùa hè năm ngoái nhà mình đã đi du lịch ở đâu con nhỉ?',
          parentPromptIpa: '/weər wɜːr juː lɑːst ˈsʌm.ər, maɪ ˈlɪt.əl ɪkˈsplɔː.rər?/',
          parentPromptReading: 'Ue-ơ uơ du lát-s-t xăm-mờ, mai lít-tồ ích-x-plo-rờ?',
          childResponse: 'I was in Nha Trang! The beach was beautiful and the food was delicious.',
          childResponseVi: 'Con đã ở Nha Trang ạ! Bãi biển rất đẹp và đồ ăn rất ngon.',
          childResponseIpa: '/aɪ wɒz ɪn Nha Trang! ðə biːtʃ wɒz ˈbjuː.tɪ.fəl ænd ðə fuːd wɒz dɪˈlɪʃ.əs./',
          childResponseReading: 'Ai oát-z in Nha Trang! Đờ bít-ch oát-z biu-ti-phun en đờ phu-đ oát-z đi-li-xơ-s.',
          coachingTip: 'Mở lại album ảnh kỳ nghỉ hè của gia đình để con chỉ vào từng tấm ảnh và nói tiếng Anh.'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Nhầm lẫn giữa "was" và "were": nói "I were in London" hoặc "You was at the zoo".',
          correction: 'Quy tắc: I was, he was, she was, it was. You were, we were, they were.',
          why: 'Chủ ngữ số ít đi với was, chủ ngữ you/số nhiều đi với were.'
        },
        {
          mistake: 'Phát âm giống hệt nhau hai từ "where" và "were".',
          correction: 'Luyện tập: "where" mở miệng phát âm "ue-ơ", còn "were" đọc gọn "u-ơ".',
          why: 'Đây là hai từ đồng âm khác nghĩa phổ biến nhất trong tiếng Anh tiểu học.'
        },
        {
          mistake: 'Dùng sai giới từ địa điểm: "in the beach" thay vì "on the beach".',
          correction: 'Bãi biển luôn dùng: "on the beach".',
          why: 'Bãi biển là bề mặt trải dài nên dùng giới từ tiếp xúc "on".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Tấm Thẻ Hành Trình Mùa Hè"',
        timeNeeded: '10 phút',
        steps: [
          'Bố mẹ và con cùng vẽ sơ đồ tư duy 3 nhánh: Nơi đến (Destination), Cảnh đẹp (Scenery), Món ăn (Food).',
          'Con tập đóng vai hướng dẫn viên du lịch tí hon thuyết trình trước cả nhà: "Last summer, I was on holiday in..."'
        ],
        benefit: 'Rèn luyện khả năng nói lưu loát, tư duy logic và sự tự tin trước đám đông cho con.'
      },
      praisePhrases: [
        { en: 'Congratulations on finishing Volume 1!', vi: 'Chúc mừng con đã xuất sắc hoàn thành Tập 1 Tiếng Anh 4!', phonetic: 'Cơn-grát-chu-lây-sần-z on phi-ni-xinh Vo-lium Oăn!' },
        { en: 'You are an amazing English speaker!', vi: 'Con nói tiếng Anh quá cừ khôi!', phonetic: 'Du a ừn ơ-mây-zing Ính-glish x-pích-kờ!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg10-1',
        scrambledWords: ['countryside', 'the', 'in', 'Were', 'weekend?', 'last', 'you'],
        correctSentence: 'Were you in the countryside last weekend?',
        vietnameseMeaning: 'Cuối tuần trước bạn có ở miền quê không?',
        hint: 'Were you in the...'
      },
      {
        id: 'sg10-2',
        scrambledWords: ['wasn’t.', 'I', 'No,', 'the', 'was', 'I', 'in', 'mountains.'],
        correctSentence: 'No, I wasn’t. I was in the mountains.',
        vietnameseMeaning: 'Không, tớ không ở đó. Tớ đã ở trên vùng núi.',
        hint: 'No, I wasn’t...'
      },
      {
        id: 'sg10-3',
        scrambledWords: ['summer?', 'you', 'were', 'Where', 'last'],
        correctSentence: 'Where were you last summer?',
        vietnameseMeaning: 'Mùa hè năm ngoái bạn ở đâu?',
        hint: 'Where were you...'
      },
      {
        id: 'sg10-4',
        scrambledWords: ['Tokyo.', 'in', 'was', 'I'],
        correctSentence: 'I was in Tokyo.',
        vietnameseMeaning: 'Tớ đã ở Tokyo.',
        hint: 'I was in...'
      }
    ],
    quizzes: [
      {
        id: 'q10-1',
        question: 'Chọn động từ to be quá khứ phù hợp: "Where ___ you last summer?"',
        questionVi: 'Chọn dạng quá khứ của To be đi với you:',
        options: ['were', 'was', 'are', 'is'],
        correctIndex: 0,
        explanation: 'Chủ ngữ "you" trong thì quá khứ luôn đi cùng "were".',
        type: 'choice'
      },
      {
        id: 'q10-2',
        question: 'Chọn câu trả lời đúng: "Were you on the beach yesterday?" - "No, I ___."',
        questionVi: 'Chọn dạng phủ định của was:',
        options: ['wasn’t', 'weren’t', 'am not', 'isn’t'],
        correctIndex: 0,
        explanation: 'Chủ ngữ "I" đi với "was", dạng phủ định là "wasn’t" (was not).',
        type: 'choice'
      },
      {
        id: 'q10-3',
        question: 'Thành phố nào nổi tiếng với Nhà hát Con Sò (Opera House)?',
        questionVi: 'Kiến thức địa danh thế giới:',
        options: ['Sydney (Úc)', 'London (Anh)', 'Tokyo (Nhật Bản)', 'Bangkok (Thái Lan)'],
        correctIndex: 0,
        explanation: 'Sydney (Úc) nổi tiếng thế giới với Nhà hát Con Sò (Sydney Opera House).',
        type: 'choice'
      },
      {
        id: 'q10-4',
        question: 'Từ nào sau đây mang nghĩa "ở đâu" và có chứa chữ "h"?',
        questionVi: 'Phân biệt từ vựng:',
        options: ['Where (/weər/)', 'Were (/wɜːr/)', 'When (/wen/)', 'Why (/waɪ/)'],
        correctIndex: 0,
        explanation: '"Where" (/weər/) là từ để hỏi nơi chốn "ở đâu".',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Miền quê', type: 'question', question: 'Tên tiếng Anh của miền quê là gì?', options: ['countryside', 'city'], correctAnswer: 'countryside', icon: '🌾' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Bãi biển', type: 'question', question: 'Điền giới từ: "on the beach" hay "in the beach"?', options: ['on the beach', 'in the beach'], correctAnswer: 'on the beach', icon: '🏖️' },
      { index: 5, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 6, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 7, label: 'Thủ đô Tokyo', type: 'question', question: 'Tokyo là thủ đô của đất nước nào?', options: ['Nhật Bản', 'Nước Anh'], correctAnswer: 'Nhật Bản', icon: '🇯🇵' },
      { index: 8, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 9, label: 'To Be Quá khứ', type: 'question', question: 'Chủ ngữ "I" đi với "was" hay "were"?', options: ['was', 'were'], correctAnswer: 'was', icon: '📝' },
      { index: 10, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 11, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 12, label: 'Về Đích Tập 1! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 15 =================
  {
    id: 'unit-15',
    volume: 2,
    unitNumber: 15,
    title: "My family's weekends",
    vietnameseTitle: 'Cuối tuần của gia đình em',
    theme: 'Me and My Family',
    colorScheme: {
      primary: 'text-teal-700',
      secondary: 'bg-teal-50 border-teal-200',
      accent: 'bg-teal-600 hover:bg-teal-700 text-white',
      badgeBg: 'bg-teal-100 text-teal-800'
    },
    vocabList: [
      { id: 'v15-1', word: 'cinema', ipa: '/ˈsɪnəmə/', vietnamese: 'rạp chiếu phim', example: 'I go to the cinema on Saturdays.', exampleMeaning: 'Tớ đi xem phim vào thứ Bảy.', iconEmoji: '🎬' },
      { id: 'v15-2', word: 'shopping centre', ipa: '/ˈʃɒpɪŋ ˈsɛntə/', vietnamese: 'trung tâm mua sắm', example: 'She goes to the shopping centre.', exampleMeaning: 'Mẹ đi trung tâm thương mại.', iconEmoji: '🏬' },
      { id: 'v15-3', word: 'sports centre', ipa: '/spɔːts ˈsɛntə/', vietnamese: 'trung tâm thể thao', example: 'He goes to the sports centre.', exampleMeaning: 'Bố đi trung tâm thể thao.', iconEmoji: '🏟️' },
      { id: 'v15-4', word: 'swimming pool', ipa: '/ˈswɪmɪŋ puːl/', vietnamese: 'bể bơi, hồ bơi', example: 'My sister goes to the swimming pool.', exampleMeaning: 'Chị tớ đi bể bơi.', iconEmoji: '🏊' },
      { id: 'v15-5', word: 'cook meals', ipa: '/kʊk miːlz/', vietnamese: 'nấu các bữa ăn', example: 'He cooks meals on Sundays.', exampleMeaning: 'Bố nấu ăn vào các ngày Chủ nhật.', iconEmoji: '🍳' },
      { id: 'v15-6', word: 'do yoga', ipa: '/duː ˈjəʊɡə/', vietnamese: 'tập yoga', example: 'My mother does yoga.', exampleMeaning: 'Mẹ tớ tập yoga rèn luyện sức khỏe.', iconEmoji: '🧘‍♀️' },
      { id: 'v15-7', word: 'play tennis', ipa: '/pleɪ ˈtɛnɪs/', vietnamese: 'chơi quần vợt (tennis)', example: 'He plays tennis with his friends.', exampleMeaning: 'Bố chơi tennis cùng bạn.', iconEmoji: '🎾' },
      { id: 'v15-8', word: 'watch films', ipa: '/wɒtʃ fɪlmz/', vietnamese: 'xem phim', example: 'We watch films together.', exampleMeaning: 'Cả nhà cùng xem phim vui vẻ.', iconEmoji: '🍿' }
    ],
    grammar: [
      {
        id: 'g15-1',
        title: 'Hỏi và trả lời ai đó đi đâu vào thứ Bảy / Chủ nhật',
        structure: 'Where does he / she go on Saturdays? - He / She goes to the ...',
        vietnameseFormula: 'Where does he/she go on Saturdays? - He/She goes to the + [cinema / sports centre / swimming pool]',
        meaning: 'Anh ấy / Cô ấy đi đâu vào thứ Bảy? - Anh ấy / Cô ấy đi đến...',
        dialog: {
          speakerA: 'Mary',
          textA: 'Where does your father go on Saturdays?',
          textAVi: 'Bố cậu đi đâu vào thứ Bảy thế?',
          speakerB: 'Mai',
          textB: 'He goes to the sports centre. He plays tennis.',
          textBVi: 'Bố tớ đi tới trung tâm thể thao. Bố chơi tennis.'
        },
        deepExplanation: 'Với chủ ngữ ngôi thứ ba số ít (he, she, my father), động từ "go" biến đổi thành "goes" (/ɡəʊz/). Ngày trong tuần có thêm "s" (on Saturdays, on Sundays) nghĩa là lặp đi lặp lại vào MỖI thứ Bảy / Chủ nhật hàng tuần.',
        memoryTrick: 'On Saturdays có chữ "S" = mỗi thứ Bảy / He/She đi với "goes" chớ quên!',
        examples: [
          'Where does she go on Saturdays? - She goes to the swimming pool.',
          'Where does he go on Sundays? - He goes to the cinema.'
        ]
      }
    ],
    phonics: {
      sound: 'Âm "g" /ɡ/ và âm "s" /ʒ/',
      words: [
        { word: 'go', highlight: 'g', meaning: 'đi (/ɡəʊ/)' },
        { word: 'television', highlight: 's', meaning: 'vô tuyến, tivi (/ˈtɛlɪˌvɪʒən/ - âm gi mềm rung môi)' }
      ],
      sentence: 'I go to the cinema on Saturdays. We watch television on Sundays.',
      sentenceMeaning: 'Tớ đi xem phim vào thứ Bảy. Chúng tớ xem tivi vào Chủ nhật.',
      ruleExplanation: 'Chữ "s" trong television phát âm là /ʒ/ (giống âm s trong pleasure, vision).'
    },
    parentGuide: {
      overview: 'Giúp con chia sẻ về những sở thích cuối tuần của gia đình và biết dùng thì hiện tại đơn với các ngày có số nhiều.',
      coreGoals: [
        'Con nói trôi chảy câu "He goes to..." / "She goes to..."',
        'Con biết các địa điểm giải trí: cinema, sports centre, shopping centre, swimming pool.',
        'Con luyện phát âm chuẩn từ khó "television" (/ˈtɛlɪˌvɪʒən/).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Where do we go on Sundays, dear?',
          parentPromptVi: 'Chủ nhật gia đình mình thường đi đâu con nhỉ?',
          childResponse: 'We go to the swimming pool! / We go to the cinema!',
          childResponseVi: 'Cả nhà mình đi bể bơi / đi xem phim ạ!',
          coachingTip: 'Hỏi con: "What do you like to do on weekends?" để con tự do sáng tạo câu trả lời.'
        }
      ],
      commonMistakes: [
        {
          mistake: "He go to the cinema.",
          correction: "He goes to the cinema.",
          why: 'Chủ ngữ "He" thì "go" phải chia thành "goes".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Kế hoạch cuối tuần vui nhộn"',
        timeNeeded: '5 phút',
        steps: [
          'Bố mẹ và con cùng liệt kê 3 việc muốn làm vào cuối tuần này.',
          'Con đọc to bằng tiếng Anh: "On Saturday, I go to the cinema. On Sunday, I play tennis."',
          'Thực hiện một trong các hoạt động để con thấy vui sướng!'
        ],
        benefit: 'Gắn kết tình cảm gia đình và ứng dụng tiếng Anh thực tế.'
      },
      praisePhrases: [
        { en: 'Fantastic! Weekend champion!', vi: 'Quá đỉnh! Nhà vô địch cuối tuần!', phonetic: 'fænˈtæstɪk! ˈwikˌɛnd ˈtʃæmpiən!' },
        { en: 'Your English accent is amazing!', vi: 'Giọng tiếng Anh của con hay quá đi!', phonetic: 'jʊr ˈɪŋɡlɪʃ ˈæksɛnt ɪz əˈmeɪzɪŋ!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg15-1',
        scrambledWords: ['goes', 'He', 'to', 'centre.', 'sports', 'the'],
        correctSentence: 'He goes to the sports centre.',
        vietnameseMeaning: 'Bác ấy đi tới trung tâm thể thao.',
        hint: 'He goes to the...'
      },
      {
        id: 'sg15-2',
        scrambledWords: ['does', 'she', 'What', 'on', 'Sundays?', 'do'],
        correctSentence: 'What does she do on Sundays?',
        vietnameseMeaning: 'Cô ấy làm gì vào các ngày Chủ nhật?',
        hint: 'What does she do on Sundays?'
      }
    ],
    quizzes: [
      {
        id: 'q15-1',
        question: 'Chọn dạng đúng: "Where does he ___ on Saturdays?"',
        questionVi: 'Sau trợ động từ "does", động từ chính ở dạng nào?',
        options: ['go', 'goes', 'going', 'went'],
        correctIndex: 0,
        explanation: 'Trong câu hỏi có trợ động từ "does" thì động từ chính giữ nguyên mẫu là "go".',
        type: 'choice'
      },
      {
        id: 'q15-2',
        question: 'He plays tennis at the ___.',
        questionVi: 'Anh ấy chơi quần vợt ở đâu?',
        options: ['sports centre', 'cinema', 'bakery', 'kitchen'],
        correctIndex: 0,
        explanation: 'Chơi thể thao ở trung tâm thể thao (sports centre).',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Rạp chiếu phim', type: 'question', question: 'Rạp chiếu phim tiếng Anh là gì?', options: ['cinema', 'sports centre'], correctAnswer: 'cinema', icon: '🎬' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Go hay Goes?', type: 'question', question: 'Điền từ: "She ___ to the swimming pool."', options: ['goes', 'go'], correctAnswer: 'goes', icon: '🏊' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Tập yoga', type: 'question', question: 'Tập yoga tiếng Anh nói là: "___ yoga"', options: ['do', 'play'], correctAnswer: 'do', icon: '🧘‍♀️' },
      { index: 7, label: 'Thưởng 2 bước ⏩', type: 'forward', stepDelta: 2, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Phonics Television', type: 'question', question: 'Chữ "s" trong television phát âm là gì?', options: ['/ʒ/', '/s/'], correctAnswer: '/ʒ/', icon: '📺' },
      { index: 10, label: 'Tiến 1 ô ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 16 =================
  {
    id: 'unit-16',
    volume: 2,
    unitNumber: 16,
    title: 'Weather',
    vietnameseTitle: 'Thời tiết',
    theme: 'Me and the World Around',
    colorScheme: {
      primary: 'text-amber-700',
      secondary: 'bg-amber-50 border-amber-200',
      accent: 'bg-amber-600 hover:bg-amber-700 text-white',
      badgeBg: 'bg-amber-100 text-amber-800'
    },
    vocabList: [
      { id: 'v16-1', word: 'sunny', ipa: '/ˈsʌni/', vietnamese: 'có nắng, trời nắng đẹp', example: 'It was sunny yesterday.', exampleMeaning: 'Hôm qua trời nắng đẹp.', iconEmoji: '☀️' },
      { id: 'v16-2', word: 'rainy', ipa: '/ˈreɪni/', vietnamese: 'có mưa, trời mưa', example: 'I don’t like rainy weather.', exampleMeaning: 'Tớ không thích thời tiết mưa gió.', iconEmoji: '🌧️' },
      { id: 'v16-3', word: 'cloudy', ipa: '/ˈklaʊdi/', vietnamese: 'nhiều mây, râm mát', example: 'It was cloudy in Sa Pa.', exampleMeaning: 'Ở Sa Pa trời nhiều mây.', iconEmoji: '☁️' },
      { id: 'v16-4', word: 'windy', ipa: '/ˈwɪndi/', vietnamese: 'có gió, lộng gió', example: 'It was windy yesterday.', exampleMeaning: 'Hôm qua trời lộng gió thả diều rất thích.', iconEmoji: '💨' },
      { id: 'v16-5', word: 'water park', ipa: '/ˈwɔːtə pɑːk/', vietnamese: 'công viên nước', example: 'Do you want to go to the water park?', exampleMeaning: 'Bạn có muốn đi công viên nước không?', iconEmoji: '🌊' },
      { id: 'v16-6', word: 'bakery', ipa: '/ˈbeɪkəri/', vietnamese: 'hiệu bánh mì', example: 'I want to go to the bakery.', exampleMeaning: 'Tớ muốn đi tiệm bánh mì thơm ngon.', iconEmoji: '🥖' },
      { id: 'v16-7', word: 'bookshop', ipa: '/ˈbʊkʃɒp/', vietnamese: 'hiệu sách', example: 'Let’s go to the bookshop.', exampleMeaning: 'Chúng mình cùng đi hiệu sách nhé.', iconEmoji: '📚' },
      { id: 'v16-8', word: 'food stall', ipa: '/fuːd stɔːl/', vietnamese: 'quầy bán đồ ăn', example: 'There is a food stall near here.', exampleMeaning: 'Có một quầy ẩm thực ở gần đây.', iconEmoji: '🍢' }
    ],
    grammar: [
      {
        id: 'g16-1',
        title: 'Hỏi và trả lời về thời tiết trong quá khứ',
        structure: 'What was the weather like yesterday / last weekend? - It was ...',
        vietnameseFormula: 'What was the weather like last weekend? - It was + [sunny / rainy / cloudy / windy]',
        meaning: 'Thời tiết cuối tuần trước / hôm qua như thế nào? - Trời đã...',
        dialog: {
          speakerA: 'Lucy',
          textA: 'Where were you last weekend, Minh? What was the weather like in Sa Pa?',
          textAVi: 'Cuối tuần trước cậu ở đâu thế Minh? Thời tiết ở Sa Pa thế nào?',
          speakerB: 'Minh',
          textB: 'I was in Sa Pa. It was sunny and cool.',
          textBVi: 'Tớ ở Sa Pa. Trời nắng đẹp và mát mẻ.'
        },
        deepExplanation: 'Hỏi về thời tiết ĐÃ QUA trong quá khứ dùng "was": "What was the weather like?" và trả lời "It was...". Nếu hỏi thời tiết HÔM NAY ta dùng "is": "What is the weather like today? - It is sunny."',
        memoryTrick: 'Thời tiết hôm nay dùng "IS" / Thời tiết hôm qua quá khứ dùng "WAS" ngay!',
        examples: [
          'What was the weather like yesterday? - It was rainy.',
          'What was the weather like in Da Nang? - It was windy.'
        ]
      },
      {
        id: 'g16-2',
        title: 'Mời hoặc rủ ai đó cùng đi đâu',
        structure: 'Do you want to go to the ...? - Great! Let’s go. / Sorry, I can’t.',
        vietnameseFormula: 'Do you want to go to the + [địa điểm]? - Great! Let’s go. / Sorry, I can’t.',
        meaning: 'Bạn có muốn đi đến... không? - Tuyệt quá, đi thôi! / Tiếc quá, mình không thể.',
        dialog: {
          speakerA: 'Mum',
          textA: 'Do you want to go to the water park with me?',
          textAVi: 'Con có muốn đi công viên nước cùng mẹ không?',
          speakerB: 'Child',
          textB: 'Great! Let’s go.',
          textBVi: 'Tuyệt vời quá ạ! Đi thôi mẹ ơi!'
        },
        deepExplanation: 'Mẫu câu rủ rê lịch sự: Đồng ý thì hào hứng nói "Great! Let\'s go.", nếu bận thì từ chối lịch sự bằng "Sorry, I can\'t. I\'m doing my homework."',
        memoryTrick: 'Đồng ý: "Great! Let\'s go" / Từ chối nhẹ nhàng: "Sorry, I can\'t"!',
        examples: [
          'Do you want to go to the bookshop? - Great! Let’s go.',
          'Do you want to go to the supermarket? - Sorry, I can’t.'
        ]
      }
    ],
    phonics: {
      sound: 'Trọng âm từ rơi vào âm tiết đầu: \'sunny / \'rainy',
      words: [
        { word: "'sunny", highlight: 'sun', meaning: 'nắng (\'sunny - nhấn mạnh âm đầu SUN-ny)' },
        { word: "'rainy", highlight: 'rain', meaning: 'mưa (\'rainy - nhấn mạnh âm đầu RAIN-y)' }
      ],
      sentence: "It's 'sunny today. I don't like 'rainy weather.",
      sentenceMeaning: 'Hôm nay trời nắng. Tớ không thích thời tiết mưa gió.',
      ruleExplanation: 'Dấu trọng âm (\') đặt trước âm tiết được đọc to hơn, cao hơn và ngân dài hơn.'
    },
    parentGuide: {
      overview: 'Unit 16 giúp con biết cách hỏi han thời tiết các vùng miền và đưa ra lời mời rủ bạn bè, cha mẹ đi chơi.',
      coreGoals: [
        'Con phân biệt được thời tiết quá khứ (It was...) và hiện tại (It is...).',
        'Con biết 4 kiểu thời tiết: sunny, rainy, cloudy, windy.',
        'Con thực hành rủ bố mẹ đi chơi: "Do you want to go to the bakery?"'
      ],
      familyRoleplays: [
        {
          parentPrompt: "Look out the window! What was the weather like yesterday?",
          parentPromptVi: 'Nhìn ra ngoài trời xem! Hôm qua thời tiết thế nào con nhỉ?',
          childResponse: "It was rainy yesterday! But today it is sunny!",
          childResponseVi: 'Hôm qua trời mưa ạ! Nhưng hôm nay trời nắng đẹp rồi!',
          coachingTip: 'Sau đó gợi ý con rủ bố mẹ: "Do you want to go to the park with me?"'
        }
      ],
      commonMistakes: [
        {
          mistake: "What was the weather like today?",
          correction: "What is the weather like today?",
          why: 'Hôm nay (today) là hiện tại phải dùng "is", còn yesterday/last weekend mới dùng "was".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Dự báo thời tiết nhí"',
        timeNeeded: '5 phút',
        steps: [
          'Vẽ biểu tượng mặt trời (sunny), đám mây (cloudy), giọt mưa (rainy), ngọn gió (windy) lên giấy.',
          'Con cầm một chiếc thước làm micro đóng vai MC thời tiết:',
          'Nói to: "Welcome! In Ha Noi, it is sunny. In Da Nang, it is windy!"'
        ],
        benefit: 'Tự tin thuyết trình trước đám đông, kích thích khả năng giao tiếp phong phú.'
      },
      praisePhrases: [
        { en: 'Brilliant weather reporter!', vi: 'Người dẫn chương trình thời tiết xuất sắc!', phonetic: 'ˈbrɪljənt ˈwɛðər rɪˈpɔrtər!' },
        { en: 'Your voice is so clear and bright!', vi: 'Giọng con vang và trong trẻo tuyệt vời!', phonetic: 'jʊr vɔɪs ɪz soʊ klɪr ænd braɪt!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg16-1',
        scrambledWords: ['was', 'the', 'like', 'What', 'weather', 'yesterday?'],
        correctSentence: 'What was the weather like yesterday?',
        vietnameseMeaning: 'Thời tiết hôm qua như thế nào?',
        hint: 'What was the weather like...'
      },
      {
        id: 'sg16-2',
        scrambledWords: ['want', 'to', 'Do', 'go', 'the', 'you', 'bookshop?', 'to'],
        correctSentence: 'Do you want to go to the bookshop?',
        vietnameseMeaning: 'Bạn có muốn đi đến hiệu sách không?',
        hint: 'Do you want to go to...'
      }
    ],
    quizzes: [
      {
        id: 'q16-1',
        question: 'Hôm qua trời mưa, ta nói câu nào sau đây?',
        questionVi: 'Chọn câu miêu tả thời tiết hôm qua:',
        options: ['It was rainy yesterday.', 'It is rainy yesterday.', 'It was sunny yesterday.', 'It will rainy.'],
        correctIndex: 0,
        explanation: 'Thời điểm quá khứ (yesterday) đi với "was" -> "It was rainy yesterday."',
        type: 'choice'
      },
      {
        id: 'q16-2',
        question: 'Do you want to go to the water park? - ___. Let\'s go!',
        questionVi: 'Chọn từ đồng ý lời rủ:',
        options: ['Great', 'Sorry', 'No', 'Bad'],
        correctIndex: 0,
        explanation: 'Khi hào hứng đồng ý đi chơi, ta nói "Great! Let\'s go."',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Trời nắng', type: 'question', question: 'Trời nắng đẹp tiếng Anh là gì?', options: ['sunny', 'cloudy'], correctAnswer: 'sunny', icon: '☀️' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Was hay Is?', type: 'question', question: 'Điền từ: "It ___ windy yesterday."', options: ['was', 'is'], correctAnswer: 'was', icon: '💨' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Công viên nước', type: 'question', question: 'Công viên nước gọi là gì?', options: ['water park', 'supermarket'], correctAnswer: 'water park', icon: '🌊' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Rủ đi chơi', type: 'question', question: 'Điền từ: "Do you ___ to go to the bakery?"', options: ['want', 'have'], correctAnswer: 'want', icon: '🥖' },
      { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 17 =================
  {
    id: 'unit-17',
    volume: 2,
    unitNumber: 17,
    title: 'In the city',
    vietnameseTitle: 'Trong thành phố',
    theme: 'Me and the World Around',
    colorScheme: {
      primary: 'text-blue-700',
      secondary: 'bg-blue-50 border-blue-200',
      accent: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-100 text-blue-800'
    },
    vocabList: [
      { id: 'v17-1', word: 'stop', ipa: '/stɒp/', vietnamese: 'dừng lại (đèn đỏ)', example: 'It says \'stop\'.', exampleMeaning: 'Biển báo hiệu dừng lại.', iconEmoji: '🛑' },
      { id: 'v17-2', word: 'go', ipa: '/ɡəʊ/', vietnamese: 'đi (đèn xanh)', example: 'It says \'go\'.', exampleMeaning: 'Đèn xanh báo hiệu được đi.', iconEmoji: '🟢' },
      { id: 'v17-3', word: 'go straight', ipa: '/ɡəʊ streɪt/', vietnamese: 'đi thẳng', example: 'Go straight and turn left.', exampleMeaning: 'Đi thẳng rồi rẽ trái.', iconEmoji: '⬆️' },
      { id: 'v17-4', word: 'turn left', ipa: '/tɜːn lɛft/', vietnamese: 'rẽ bên trái', example: 'Turn left at the bookshop.', exampleMeaning: 'Rẽ trái ở chỗ hiệu sách.', iconEmoji: '⬅️' },
      { id: 'v17-5', word: 'turn right', ipa: '/tɜːn raɪt/', vietnamese: 'rẽ bên phải', example: 'Turn right at the bakery.', exampleMeaning: 'Rẽ phải ở chỗ tiệm bánh.', iconEmoji: '➡️' },
      { id: 'v17-6', word: 'turn round', ipa: '/tɜːn raʊnd/', vietnamese: 'quay ngược lại / quay đầu xe', example: 'Turn round at the supermarket.', exampleMeaning: 'Quay đầu lại ở siêu thị.', iconEmoji: '🔄' }
    ],
    grammar: [
      {
        id: 'g17-1',
        title: 'Hỏi và trả lời về biển báo giao thông',
        structure: "What does it say? - It says 'stop' / 'go' / 'turn left'",
        vietnameseFormula: "What does it say? - It says '...'",
        meaning: 'Biển báo này nói gì? - Nó báo hiệu...',
        dialog: {
          speakerA: 'Teacher',
          textA: 'Look at the traffic light. What does it say?',
          textAVi: 'Nhìn đèn giao thông xem, nó báo hiệu điều gì?',
          speakerB: 'Ben',
          textB: "The light is red. It says 'stop'!",
          textBVi: 'Đèn đỏ ạ. Nó báo hiệu "Dừng lại"!'
        },
        deepExplanation: 'Chủ ngữ "it" (biển báo/đèn giao thông) là ngôi thứ 3 số ít nên động từ "say" thêm "s" đọc là /sɛz/.',
        memoryTrick: 'Đèn đỏ "stop" dừng lại ngay / Đèn xanh "go" tiến thẳng bay về nhà!',
        examples: [
          "What does the red light say? - It says 'stop'.",
          "What does the green light say? - It says 'go'."
        ]
      },
      {
        id: 'g17-2',
        title: 'Hỏi và chỉ đường trong thành phố',
        structure: 'How can I get to the ...? - Go straight and turn left / right.',
        vietnameseFormula: 'How can I get to the + [địa điểm]? - Go straight and turn left / right.',
        meaning: 'Làm thế nào để tớ đến được...? - Hãy đi thẳng rồi rẽ trái / phải.',
        dialog: {
          speakerA: 'Mary',
          textA: 'Excuse me. How can I get to the bookshop?',
          textAVi: 'Xin lỗi, làm sao để tớ đến được hiệu sách ạ?',
          speakerB: 'Man',
          textB: 'Go straight and turn left at Hoa Binh Street.',
          textBVi: 'Cháu cứ đi thẳng rồi rẽ trái ở đường Hòa Bình nhé.'
        },
        deepExplanation: 'Dùng cụm mở đầu lịch sự "Excuse me" (Xin lỗi cho cháu hỏi). Động từ chỉ đường dùng câu mệnh lệnh nguyên mẫu: Go straight, Turn left, Turn right.',
        memoryTrick: 'Left tay trái, Right tay phải / Go straight thẳng tiến không ngại ngần chi!',
        examples: [
          'How can I get to the cinema? - Go straight and turn right.',
          'How can I get to the food stall? - Turn left at the corner.'
        ]
      }
    ],
    phonics: {
      sound: 'Trọng âm từ hai âm tiết: \'bookshop và \'campsite',
      words: [
        { word: "'bookshop", highlight: 'book', meaning: 'hiệu sách (\'bookshop)' },
        { word: "'campsite", highlight: 'camp', meaning: 'địa điểm cắm trại (\'campsite)' }
      ],
      sentence: "How can I get to the 'bookshop? How can I get to the 'campsite?",
      sentenceMeaning: 'Làm thế nào để tớ đến hiệu sách? Làm thế nào để đến chỗ cắm trại?',
      ruleExplanation: 'Các danh từ ghép như book+shop, camp+site thường nhấn trọng âm vào âm tiết đầu tiên.'
    },
    parentGuide: {
      overview: 'Bài học trang bị kỹ năng an toàn giao thông và định hướng phương hướng đường phố cho con.',
      coreGoals: [
        'Con hiểu luật đèn giao thông bằng tiếng Anh: red = stop, green = go.',
        'Con thuộc các khẩu lệnh chỉ đường: go straight, turn left, turn right, turn round.',
        'Con biết hỏi đường lịch sự bắt đầu bằng "Excuse me".'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Excuse me little police officer! How can I get to the bakery?',
          parentPromptVi: 'Xin lỗi chú cảnh sát nhí! Làm sao để bác đến được tiệm bánh?',
          childResponse: 'Go straight and turn right! The bakery is on the right!',
          childResponseVi: 'Bác đi thẳng rồi rẽ phải ạ! Tiệm bánh ở bên tay phải!',
          coachingTip: 'Khi chở con đi trên đường, bố mẹ chỉ vào các biển báo thực tế và đố con: "What does it say?"'
        }
      ],
      commonMistakes: [
        {
          mistake: "Turn to left.",
          correction: "Turn left.",
          why: 'Không cần giới từ "to", chỉ cần nói "turn left" hoặc "turn right".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Dẫn đường bịt mắt (Blindfold Navigator)"',
        timeNeeded: '5 phút',
        steps: [
          'Bố mẹ nhắm mắt lại (hoặc che mắt nhẹ).',
          'Con đứng bên cạnh làm người hoa tiêu ra lệnh bằng tiếng Anh:',
          '"Go straight! Stop! Turn left! Turn right!" để bố mẹ đi tới chiếc ghế an toàn.'
        ],
        benefit: 'Cực kỳ vui nhộn, con ghi nhớ phản xạ phương hướng tức thì.'
      },
      praisePhrases: [
        { en: 'Best navigator in town!', vi: 'Người chỉ đường cừ khôi nhất phố!', phonetic: 'bɛst ˈnævəˌɡeɪtər ɪn taʊn!' },
        { en: 'Safe and smart!', vi: 'An toàn và thông minh tuyệt đỉnh!', phonetic: 'seɪf ænd smɑrt!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg17-1',
        scrambledWords: ['get', 'can', 'How', 'to', 'I', 'the', 'cinema?'],
        correctSentence: 'How can I get to the cinema?',
        vietnameseMeaning: 'Làm thế nào để tớ đến rạp chiếu phim?',
        hint: 'How can I get to...'
      },
      {
        id: 'sg17-2',
        scrambledWords: ['straight', 'left.', 'Go', 'and', 'turn'],
        correctSentence: 'Go straight and turn left.',
        vietnameseMeaning: 'Hãy đi thẳng rồi rẽ trái.',
        hint: 'Go straight and...'
      }
    ],
    quizzes: [
      {
        id: 'q17-1',
        question: 'Mũi tên chỉ thẳng về phía trước nghĩa là gì?',
        questionVi: 'Chọn cụm từ chỉ hướng đi thẳng:',
        options: ['go straight', 'turn left', 'turn right', 'turn round'],
        correctIndex: 0,
        explanation: '"go straight" có nghĩa là đi thẳng.',
        type: 'choice'
      },
      {
        id: 'q17-2',
        question: 'Khi đèn giao thông chuyển sang màu đỏ, nó báo hiệu điều gì?',
        questionVi: 'Chọn hiệu lệnh:',
        options: ["It says 'stop'.", "It says 'go'.", "It says 'turn left'.", "It says 'run'."],
        correctIndex: 0,
        explanation: 'Đèn đỏ báo hiệu dừng lại: "It says \'stop\'."',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Đèn đỏ', type: 'question', question: 'Đèn đỏ báo hiệu gì?', options: ['stop', 'go'], correctAnswer: 'stop', icon: '🛑' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Rẽ trái', type: 'question', question: 'Rẽ trái tiếng Anh là:', options: ['turn left', 'turn right'], correctAnswer: 'turn left', icon: '⬅️' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Đi thẳng', type: 'question', question: 'Đi thẳng tiếng Anh là:', options: ['go straight', 'go back'], correctAnswer: 'go straight', icon: '⬆️' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Hỏi đường', type: 'question', question: 'Bắt đầu lời hỏi đường lịch sự bằng từ gì?', options: ['Excuse me', 'Goodbye'], correctAnswer: 'Excuse me', icon: '🗣️' },
      { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 18 =================
  {
    id: 'unit-18',
    volume: 2,
    unitNumber: 18,
    title: 'At the shopping centre',
    vietnameseTitle: 'Tại trung tâm mua sắm',
    theme: 'Me and the World Around',
    colorScheme: {
      primary: 'text-pink-700',
      secondary: 'bg-pink-50 border-pink-200',
      accent: 'bg-pink-600 hover:bg-pink-700 text-white',
      badgeBg: 'bg-pink-100 text-pink-800'
    },
    vocabList: [
      { id: 'v18-1', word: 'near', ipa: '/nɪə/', vietnamese: 'ở gần', example: 'It’s near the gift shop.', exampleMeaning: 'Nó ở gần cửa hàng lưu niệm.', iconEmoji: '📍' },
      { id: 'v18-2', word: 'opposite', ipa: '/ˈɒpəzɪt/', vietnamese: 'đối diện', example: 'The bookshop is opposite the shoe shop.', exampleMeaning: 'Hiệu sách đối diện tiệm giày.', iconEmoji: '↔️' },
      { id: 'v18-3', word: 'behind', ipa: '/bɪˈhaɪnd/', vietnamese: 'ở phía đằng sau', example: 'The bakery is behind the bookshop.', exampleMeaning: 'Tiệm bánh ở phía sau hiệu sách.', iconEmoji: '🔙' },
      { id: 'v18-4', word: 'between', ipa: '/bɪˈtwiːn/', vietnamese: 'ở giữa (hai địa điểm)', example: 'It’s between the bookshop and the bakery.', exampleMeaning: 'Nó nằm ở giữa hiệu sách và tiệm bánh.', iconEmoji: '🥪' },
      { id: 'v18-5', word: 'skirt', ipa: '/skɜːt/', vietnamese: 'chiếc chân váy', example: 'How much is the skirt?', exampleMeaning: 'Chiếc váy này giá bao nhiêu tiền?', iconEmoji: '👗' },
      { id: 'v18-6', word: 'T-shirt', ipa: '/ˈtiːʃɜːt/', vietnamese: 'áo phông, áo thun', example: "It's fifty thousand dong.", exampleMeaning: 'Chiếc áo phông giá 50.000 đồng.', iconEmoji: '👕' },
      { id: 'v18-7', word: 'thousand', ipa: '/ˈθaʊzənd/', vietnamese: 'nghìn (ngàn)', example: 'eighty thousand dong', exampleMeaning: 'tám mươi nghìn đồng (80.000đ)', iconEmoji: '💵' }
    ],
    grammar: [
      {
        id: 'g18-1',
        title: 'Hỏi và chỉ vị trí tương quan của cửa hàng',
        structure: 'Where’s the ...? - It’s near / opposite / behind / between ...',
        vietnameseFormula: 'Where’s the [tên cửa hàng]? - It’s + [near / opposite / behind / between] + [địa điểm]',
        meaning: 'Cửa hàng... ở đâu? - Nó ở gần / đối diện / phía sau / ở giữa...',
        dialog: {
          speakerA: 'Ben',
          textA: 'Where’s the bakery, please?',
          textAVi: 'Làm ơn cho hỏi hiệu bánh mì ở đâu ạ?',
          speakerB: 'Linh',
          textB: 'It’s near the gift shop. Between the bookshop and the toy shop.',
          textBVi: 'Nó ở gần tiệm quà tặng. Nằm ở giữa hiệu sách và cửa hàng đồ chơi.'
        },
        deepExplanation: 'Từ "between" luôn đi cùng cấu trúc: "between A and B" (ở giữa A và B). "Opposite" nghĩa là đối diện bên kia lối đi.',
        memoryTrick: 'Near là gần / Behind phía sau / Opposite đối diện / Between ở giữa hai đầu!',
        examples: [
          'Where’s the shoe shop? - It’s opposite the gift shop.',
          'Where’s the toy shop? - It’s behind the bakery.'
        ]
      },
      {
        id: 'g18-2',
        title: 'Hỏi và trả lời về giá tiền đồ vật',
        structure: 'How much is the ...? - It’s ... thousand dong.',
        vietnameseFormula: 'How much is the + [đồ vật]? - It’s + [số đếm] + thousand dong.',
        meaning: 'Cái này giá bao nhiêu tiền? - Giá của nó là... nghìn đồng.',
        dialog: {
          speakerA: 'Linh',
          textA: 'How much is the T-shirt, Mum?',
          textAVi: 'Chiếc áo thun này giá bao nhiêu mẹ ơi?',
          speakerB: 'Mum',
          textB: 'It’s sixty thousand dong. And the skirt is seventy thousand dong.',
          textBVi: 'Áo 60.000 đồng con ạ. Còn chân váy là 70.000 đồng.'
        },
        deepExplanation: 'Hỏi giá tiền một món đồ số ít dùng "How much is the...?", câu trả lời số tiền tính bằng đơn vị "thousand dong" (nghìn đồng).',
        memoryTrick: 'Hỏi giá: "How much is the..." / Trả lời số tiền cộng thêm "thousand dong"!',
        examples: [
          'How much is the pen? - It’s twenty thousand dong.',
          'How much is the school bag? - It’s ninety thousand dong.'
        ]
      }
    ],
    phonics: {
      sound: 'Trọng âm từ hai âm tiết rơi vào âm thứ hai: be\'hind và be\'tween',
      words: [
        { word: "be'hind", highlight: 'hind', meaning: 'phía sau (be\'hind - nhấn mạnh âm tiết 2)' },
        { word: "be'tween", highlight: 'tween', meaning: 'ở giữa (be\'tween - nhấn mạnh âm tiết 2)' }
      ],
      sentence: "The bakery is be'hind the bookshop. It is be'tween the bookshop and the sports shop.",
      sentenceMeaning: 'Tiệm bánh ở sau hiệu sách. Nó ở giữa hiệu sách và tiệm thể thao.',
      ruleExplanation: 'Tiền tố "be-" không nhận trọng âm, trọng âm rơi vào vần chính đứng sau.'
    },
    parentGuide: {
      overview: 'Bài học ứng dụng trực tiếp khi đưa con đi siêu thị, mua sắm đồ dùng học tập và rèn tư duy tài chính.',
      coreGoals: [
        'Con biết hỏi giá tiền: "How much is the...?"',
        'Con đọc được các mệnh giá tiền Việt Nam bằng tiếng Anh (20.000đ, 50.000đ, 70.000đ, 90.000đ).',
        'Con nắm chắc 4 vị trí: near (gần), behind (sau), between (ở giữa), opposite (đối diện).'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Look at your pencil case! How much is it?',
          parentPromptVi: 'Nhìn chiếc hộp bút của con kìa! Nó giá bao nhiêu thế?',
          childResponse: 'It’s thirty thousand dong!',
          childResponseVi: 'Dạ giá ba mươi nghìn đồng ạ!',
          coachingTip: 'Mỗi khi mua đồ cho con, bố mẹ hãy cho con xem mác giá và hỏi con đọc bằng tiếng Anh.'
        }
      ],
      commonMistakes: [
        {
          mistake: "It's fifty thousands dong.",
          correction: "It's fifty thousand dong.",
          why: 'Từ "thousand" khi đứng sau số lượng cụ thể (fifty) KHÔNG thêm "s".'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Cửa hàng đồ chơi tại gia (Family Mini-Mart)"',
        timeNeeded: '5 phút',
        steps: [
          'Bày vài món đồ chơi hoặc sách của con lên bàn, dán mác giá: 10.000đ, 20.000đ, 50.000đ.',
          'Bố mẹ đóng vai khách hàng hỏi: "How much is this book?"',
          'Con làm nhân viên bán hàng trả lời: "It’s twenty thousand dong, thank you!"'
        ],
        benefit: 'Kích thích niềm vui tính toán và phản xạ giao tiếp tự tin.'
      },
      praisePhrases: [
        { en: 'Super cashier! Very smart!', vi: 'Thu ngân nhí siêu đỉnh! Rất nhanh nhạy!', phonetic: 'ˈsupər kæˈʃɪr! ˈvɛri smɑrt!' },
        { en: 'You know your numbers so well!', vi: 'Con nắm số đếm và giá tiền chuẩn quá!', phonetic: 'ju noʊ jʊr ˈnʌmbərz soʊ wɛl!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg18-1',
        scrambledWords: ['much', 'the', 'How', 'is', 'T-shirt?'],
        correctSentence: 'How much is the T-shirt?',
        vietnameseMeaning: 'Chiếc áo phông giá bao nhiêu?',
        hint: 'How much is the...'
      },
      {
        id: 'sg18-2',
        scrambledWords: ['thousand', 'It’s', 'dong.', 'fifty'],
        correctSentence: 'It’s fifty thousand dong.',
        vietnameseMeaning: 'Nó có giá 50.000 đồng.',
        hint: 'It’s fifty thousand dong.'
      }
    ],
    quizzes: [
      {
        id: 'q18-1',
        question: 'Muốn hỏi giá của chiếc chân váy, ta dùng câu nào?',
        questionVi: 'Chọn câu hỏi giá đúng:',
        options: ['How much is the skirt?', 'What is the skirt?', 'Where is the skirt?', 'How is the skirt?'],
        correctIndex: 0,
        explanation: 'Hỏi giá tiền dùng cấu trúc: "How much is the + danh từ?".',
        type: 'choice'
      },
      {
        id: 'q18-2',
        question: 'Vị trí "ở giữa hiệu sách và tiệm bánh" dùng từ nào?',
        questionVi: 'Chọn giới từ vị trí:',
        options: ['between', 'opposite', 'behind', 'near'],
        correctIndex: 0,
        explanation: '"between A and B" có nghĩa là ở giữa A và B.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Hỏi giá', type: 'question', question: 'Hỏi giá tiền: "___ much is the pen?"', options: ['How', 'What'], correctAnswer: 'How', icon: '💰' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Đối diện', type: 'question', question: 'Từ "đối diện" tiếng Anh là gì?', options: ['opposite', 'between'], correctAnswer: 'opposite', icon: '↔️' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: '50.000đ', type: 'question', question: '50.000 đồng đọc là: "Fifty ___ dong"', options: ['thousand', 'thousands'], correctAnswer: 'thousand', icon: '💵' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Ở phía sau', type: 'question', question: 'Từ "phía sau" là gì?', options: ['behind', 'near'], correctAnswer: 'behind', icon: '🔙' },
      { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 19 =================
  {
    id: 'unit-19',
    volume: 2,
    unitNumber: 19,
    title: 'The animal world',
    vietnameseTitle: 'Thế giới động vật',
    theme: 'Me and the World Around',
    colorScheme: {
      primary: 'text-amber-800',
      secondary: 'bg-amber-50 border-amber-200',
      accent: 'bg-amber-700 hover:bg-amber-800 text-white',
      badgeBg: 'bg-amber-100 text-amber-900'
    },
    vocabList: [
      { id: 'v19-1', word: 'giraffes', ipa: '/dʒɪˈrɑːfs/', vietnamese: 'hươu cao cổ (số nhiều)', example: 'They’re giraffes. They have long necks.', exampleMeaning: 'Đó là những chú hươu cao cổ có cổ dài.', iconEmoji: '🦒' },
      { id: 'v19-2', word: 'hippos', ipa: '/ˈhɪpəʊz/', vietnamese: 'hà mã', example: 'They’re hippos. They look strong.', exampleMeaning: 'Đó là những chú hà mã trông rất khỏe.', iconEmoji: '🦛' },
      { id: 'v19-3', word: 'lions', ipa: '/ˈlaɪənz/', vietnamese: 'những con sư tử', example: 'They’re lions. They look brave.', exampleMeaning: 'Đó là đàn sư tử trông thật dũng mãnh.', iconEmoji: '🦁' },
      { id: 'v19-4', word: 'crocodiles', ipa: '/ˈkrɒkədaɪlz/', vietnamese: 'cá sấu', example: 'They’re crocodiles.', exampleMeaning: 'Đó là những con cá sấu.', iconEmoji: '🐊' },
      { id: 'v19-5', word: 'peacocks', ipa: '/ˈpiːkɒks/', vietnamese: 'những con chim công', example: 'Peacocks dance beautifully.', exampleMeaning: 'Chim công múa đuôi rất đẹp.', iconEmoji: '🦚' },
      { id: 'v19-6', word: 'roar loudly', ipa: '/rɔː ˈlaʊdli/', vietnamese: 'gầm to, rống vang', example: 'Lions roar loudly.', exampleMeaning: 'Sư tử gầm vang rền.', iconEmoji: '📢' },
      { id: 'v19-7', word: 'run quickly', ipa: '/rʌn ˈkwɪkli/', vietnamese: 'chạy rất nhanh', example: 'Giraffes run quickly.', exampleMeaning: 'Hươu cao cổ sải chân chạy rất nhanh.', iconEmoji: '🏃' },
      { id: 'v19-8', word: 'dance beautifully', ipa: '/dɑːns ˈbjuːtəfʊli/', vietnamese: 'nhảy múa uyển chuyển, xinh đẹp', example: 'They dance beautifully.', exampleMeaning: 'Chúng múa thật là đẹp.', iconEmoji: '💃' }
    ],
    grammar: [
      {
        id: 'g19-1',
        title: 'Hỏi và nhận biết các con vật (số nhiều)',
        structure: 'What are these animals? - They’re ...',
        vietnameseFormula: 'What are these animals? - They’re + [giraffes / hippos / lions / crocodiles]',
        meaning: 'Những con vật này là con gì? - Chúng là...',
        dialog: {
          speakerA: 'Ben',
          textA: 'Mum, what are these animals?',
          textAVi: 'Mẹ ơi, những con vật này là con gì thế ạ?',
          speakerB: 'Mum',
          textB: 'They’re giraffes, dear. They have long necks and legs.',
          textBVi: 'Đó là những chú hươu cao cổ con yêu ạ. Chúng có cổ và chân rất dài.'
        },
        deepExplanation: 'Khi chỉ vào NHIỀU con vật ở gần, ta dùng "these animals". Câu trả lời dùng đại từ số nhiều "They\'re" (= They are) và tên các con vật đều ở dạng SỐ NHIỀU (thêm s: giraffes, lions, hippos).',
        memoryTrick: 'Nhiều con vật hỏi "these animals" / Trả lời "They\'re" có chữ S đuôi!',
        examples: [
          'What are these animals? - They’re lions.',
          'What are these animals? - They’re hippos.'
        ]
      },
      {
        id: 'g19-2',
        title: 'Hỏi và giải thích lý do yêu thích loài vật',
        structure: 'Why do you like ...? - Because they ...',
        vietnameseFormula: 'Why do you like [loài vật]? - Because they + [động từ + trạng từ: roar loudly / run quickly / dance beautifully]',
        meaning: 'Tại sao bạn thích...? - Bởi vì chúng...',
        dialog: {
          speakerA: 'Nam',
          textA: 'Why do you like peacocks?',
          textAVi: 'Tại sao cậu lại thích chim công?',
          speakerB: 'Mai',
          textB: 'Because they dance beautifully.',
          textBVi: 'Bởi vì chúng múa đuôi rất đẹp mắt.'
        },
        deepExplanation: 'Hỏi lý do dùng "Why", trả lời bắt đầu bằng "Because" (Bởi vì). Trong bài này xuất hiện TRẠNG TỪ chỉ cách thức (tính từ + ly): loud -> loudly (ầm ĩ), quick -> quickly (nhanh nhẹn), beautiful -> beautifully (xinh đẹp).',
        memoryTrick: 'Hỏi "Why" (Tại sao) trả lời "Because" (Bởi vì) / Thêm đuôi "-LY" diễn tả hành động!',
        examples: [
          'Why do you like lions? - Because they roar loudly.',
          'Why do you like giraffes? - Because they run quickly.'
        ]
      }
    ],
    phonics: {
      sound: 'Trọng âm từ trạng từ đuôi -ly: \'loudly và \'quickly',
      words: [
        { word: "'loudly", highlight: 'loud', meaning: 'to, ầm ĩ (\'loudly - nhấn âm đầu LOUD)' },
        { word: "'quickly", highlight: 'quick', meaning: 'nhanh chóng (\'quickly - nhấn âm đầu QUICK)' }
      ],
      sentence: "These animals are roaring 'loudly. Those animals are running 'quickly.",
      sentenceMeaning: 'Những con vật này đang gầm vang ầm ĩ. Những con vật kia đang chạy thoăn thoắt.',
      ruleExplanation: 'Hầu hết các trạng từ hai âm tiết kết thúc bằng đuôi "-ly" có trọng âm rơi vào âm tiết thứ nhất.'
    },
    parentGuide: {
      overview: 'Chủ đề thế giới động vật giúp con mở rộng vốn từ về thiên nhiên hoang dã và biết cách nêu lý do yêu thích.',
      coreGoals: [
        'Con đọc đúng tên số nhiều của các loài thú: giraffes, lions, hippos, peacocks, crocodiles.',
        'Con dùng được cặp từ hỏi - đáp: Why...? - Because...',
        'Con hiểu cách dùng trạng từ đuôi -ly: loudly, quickly, beautifully.'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Why do you like lions, my little tiger?',
          parentPromptVi: 'Sao con lại thích sư tử thế hổ con của bố mẹ?',
          childResponse: 'Because they roar loudly and look brave!',
          childResponseVi: 'Bởi vì chúng gầm to và trông thật dũng cảm ạ!',
          coachingTip: 'Cùng con bắt chước tiếng kêu của các con vật để buổi học tràn ngập tiếng cười.'
        }
      ],
      commonMistakes: [
        {
          mistake: "Because they roar loud.",
          correction: "Because they roar loudly.",
          why: 'Bổ nghĩa cho động từ "roar" cần dùng trạng từ "loudly" (thêm -ly).'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Vườn thú vui nhộn tại nhà"',
        timeNeeded: '5 phút',
        steps: [
          'Con làm động tác con chim công múa hoặc chú hươu cổ dài vươn cao.',
          'Bố mẹ hỏi: "What are these animals? Why do you like them?"',
          'Con vừa làm vừa nói: "Because they dance beautifully!"'
        ],
        benefit: 'Học tiếng Anh qua vận động cơ thể (TPR), giúp não bộ nhớ từ vựng sâu gấp 3 lần.'
      },
      praisePhrases: [
        { en: 'Roar! You are as brave as a lion!', vi: 'Gầm vang nào! Con dũng cảm như chú sư tử!', phonetic: 'rɔr! ju ɑr æz breɪv æz ə ˈlaɪən!' },
        { en: 'Wonderful storytelling, my explorer!', vi: 'Kể chuyện tuyệt đỉnh, nhà thám hiểm nhí của mẹ!', phonetic: 'ˈwʌndərfəl ˈstɔritɛlɪŋ!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg19-1',
        scrambledWords: ['animals?', 'are', 'What', 'these'],
        correctSentence: 'What are these animals?',
        vietnameseMeaning: 'Những con vật này là con gì?',
        hint: 'What are these...'
      },
      {
        id: 'sg19-2',
        scrambledWords: ['they', 'Because', 'loudly.', 'roar'],
        correctSentence: 'Because they roar loudly.',
        vietnameseMeaning: 'Bởi vì chúng gầm vang rất to.',
        hint: 'Because they roar...'
      }
    ],
    quizzes: [
      {
        id: 'q19-1',
        question: 'Loài vật nào có cổ và chân rất dài?',
        questionVi: 'Nhận diện loài vật:',
        options: ['giraffes', 'hippos', 'lions', 'crocodiles'],
        correctIndex: 0,
        explanation: 'Hươu cao cổ (giraffes) có cổ và chân dài.',
        type: 'choice'
      },
      {
        id: 'q19-2',
        question: 'Why do you like peacocks? - ___ they dance beautifully.',
        questionVi: 'Chọn từ mở đầu câu trả lời lý do:',
        options: ['Because', 'So', 'And', 'But'],
        correctIndex: 0,
        explanation: 'Trả lời câu hỏi "Why" bắt đầu bằng "Because" (Bởi vì).',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Hươu cao cổ', type: 'question', question: 'Tên hươu cao cổ trong tiếng Anh:', options: ['giraffes', 'lions'], correctAnswer: 'giraffes', icon: '🦒' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Why và Because', type: 'question', question: 'Câu hỏi bắt đầu bằng "Why", trả lời bắt đầu bằng từ gì?', options: ['Because', 'Yes'], correctAnswer: 'Because', icon: '❓' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Chạy nhanh', type: 'question', question: 'Chạy nhanh là: "run ___"', options: ['quickly', 'loudly'], correctAnswer: 'quickly', icon: '🏃' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Sư tử gầm', type: 'question', question: 'Sư tử gầm to nói là: "Lions roar ___"', options: ['loudly', 'quietly'], correctAnswer: 'loudly', icon: '🦁' },
      { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  },

  // ================= TẬP 2: UNIT 20 =================
  {
    id: 'unit-20',
    volume: 2,
    unitNumber: 20,
    title: 'At summer camp',
    vietnameseTitle: 'Ở trại hè sôi động',
    theme: 'Me and the World Around',
    colorScheme: {
      primary: 'text-orange-700',
      secondary: 'bg-orange-50 border-orange-200',
      accent: 'bg-orange-600 hover:bg-orange-700 text-white',
      badgeBg: 'bg-orange-100 text-orange-800'
    },
    vocabList: [
      { id: 'v20-1', word: 'putting up a tent', ipa: '/ˈpʊtɪŋ ʌp ə tɛnt/', vietnamese: 'dựng lều trại', example: 'He’s putting up a tent.', exampleMeaning: 'Cậu ấy đang dựng một chiếc lều.', iconEmoji: '⛺' },
      { id: 'v20-2', word: 'building a campfire', ipa: '/ˈbɪldɪŋ ə ˈkæmpfaɪə/', vietnamese: 'đốt / dựng lửa trại', example: 'They’re building a campfire.', exampleMeaning: 'Họ đang nhóm lửa trại ấm cúng.', iconEmoji: '🔥' },
      { id: 'v20-3', word: 'telling a story', ipa: '/ˈtɛlɪŋ ə ˈstɔːri/', vietnamese: 'kể câu chuyện', example: 'She’s telling an exciting story.', exampleMeaning: 'Cô bé đang kể một câu chuyện ly kỳ.', iconEmoji: '📖' },
      { id: 'v20-4', word: 'taking a photo', ipa: '/ˈteɪkɪŋ ə ˈfəʊtəʊ/', vietnamese: 'chụp một bức ảnh', example: 'I am taking a photo.', exampleMeaning: 'Tớ đang chụp một bức ảnh kỷ niệm.', iconEmoji: '📷' },
      { id: 'v20-5', word: 'playing card games', ipa: '/ˈpleɪɪŋ kɑːd ɡeɪmz/', vietnamese: 'chơi các trò chơi bài', example: 'They’re playing card games.', exampleMeaning: 'Các bạn đang chơi bài vui nhộn.', iconEmoji: '🃏' },
      { id: 'v20-6', word: 'playing tug of war', ipa: '/ˈpleɪɪŋ tʌɡ ɒv wɔː/', vietnamese: 'chơi kéo co', example: 'Some friends are playing tug of war.', exampleMeaning: 'Các bạn đang hào hứng chơi kéo co.', iconEmoji: '🪢' },
      { id: 'v20-7', word: 'dancing around the campfire', ipa: '/ˈdɑːnsɪŋ əˈraʊnd ðə ˈkæmpfaɪə/', vietnamese: 'nhảy múa quanh đống lửa trại', example: 'They are dancing around the campfire.', exampleMeaning: 'Các bạn nhỏ đang nhảy múa quanh lửa trại.', iconEmoji: '💃' },
      { id: 'v20-8', word: 'singing songs', ipa: '/ˈsɪŋɪŋ sɒŋz/', vietnamese: 'hát các bài hát', example: 'Mary and Lucy are singing songs.', exampleMeaning: 'Mary và Lucy đang cùng nhau cất tiếng hát.', iconEmoji: '🎵' }
    ],
    grammar: [
      {
        id: 'g20-1',
        title: 'Hỏi và trả lời ai đó ĐANG LÀM GÌ ở trại hè (Thì Hiện Tại Tiếp Diễn)',
        structure: 'What’s he / she doing? - He’s / She’s + V-ing',
        vietnameseFormula: 'What’s he/she doing? - He’s/She’s + [building a campfire / putting up a tent...]',
        meaning: 'Cậu ấy / Cô ấy đang làm gì? - Cậu/Cô ấy đang...',
        dialog: {
          speakerA: 'Lucy',
          textA: 'Is Nam at the campsite? What’s he doing?',
          textAVi: 'Nam có ở khu cắm trại không? Cậu ấy đang làm gì thế?',
          speakerB: 'Mai',
          textB: 'Yes, he is. He’s building a campfire with Minh.',
          textBVi: 'Có chứ. Cậu ấy đang nhóm lửa trại cùng Minh.'
        },
        deepExplanation: 'Thì Hiện Tại Tiếp Diễn (Present Continuous) diễn tả hành động ĐANG DIỄN RA ngay lúc nói: S + am/is/are + V-ing. Chú ý: "What\'s" là viết tắt của "What is".',
        memoryTrick: 'Đang diễn ra ngay trước mắt: To-be đi liền Động từ thêm ING!',
        examples: [
          'What’s she doing? - She’s telling a story.',
          'What’s he doing? - He’s taking a photo.'
        ]
      },
      {
        id: 'g20-2',
        title: 'Hỏi nhiều người ĐANG LÀM GÌ (Họ đang làm gì?)',
        structure: 'What are they doing? - They’re + V-ing',
        vietnameseFormula: 'What are they doing? - They’re + [playing card games / playing tug of war...]',
        meaning: 'Họ đang làm gì thế? - Họ đang...',
        dialog: {
          speakerA: 'Bill',
          textA: 'Are Mary and Lucy there? What are they doing?',
          textAVi: 'Mary và Lucy có ở đó không? Các bạn ấy đang làm gì?',
          speakerB: 'Minh',
          textB: 'They’re dancing around the campfire and singing songs.',
          textBVi: 'Các bạn ấy đang nhảy múa quanh lửa trại và ca hát.'
        },
        deepExplanation: 'Hỏi số nhiều dùng "What ARE they doing?" và câu trả lời là "THEY\'RE + V-ing".',
        memoryTrick: 'Nhiều người "They\'re", một bạn nam "He\'s", một bạn nữ "She\'s"!',
        examples: [
          'What are they doing? - They’re playing tug of war.',
          'What are they doing? - They’re playing card games.'
        ]
      }
    ],
    phonics: {
      sound: 'Trọng âm từ hai âm tiết: \'visit và \'email',
      words: [
        { word: "'visit", highlight: 'vis', meaning: 'thăm viếng (\'visit - nhấn âm 1)' },
        { word: "'email", highlight: 'e', meaning: 'gửi thư điện tử (\'email - nhấn âm 1)' }
      ],
      sentence: "They 'visit their grandparents in summer. We 'email our friends at the weekend.",
      sentenceMeaning: 'Họ đến thăm ông bà vào mùa hè. Chúng tớ gửi email cho bạn bè vào cuối tuần.',
      ruleExplanation: 'Các động từ hai âm tiết đặc biệt này nhấn trọng âm vào âm tiết thứ nhất.'
    },
    parentGuide: {
      overview: 'Unit 20 khép lại chương trình lớp 4 với không khí trại hè sôi động, giúp con làm chủ thì Hiện Tại Tiếp Diễn (V-ing).',
      coreGoals: [
        'Con thành thạo hỏi đáp hành động đang diễn ra: What’s he/she doing? - He’s/She’s...',
        'Con phân biệt rõ hỏi một người (What is...) và hỏi nhiều người (What are they doing?).',
        'Con miêu tả được các hoạt động trại hè phong phú: dựng lều, kéo co, nhóm lửa trại.'
      ],
      familyRoleplays: [
        {
          parentPrompt: 'Look at the picture of summer camp! What are they doing?',
          parentPromptVi: 'Nhìn bức tranh trại hè này xem! Các bạn đang làm gì thế con?',
          childResponse: 'They’re singing songs and dancing around the campfire!',
          childResponseVi: 'Các bạn đang hát và nhảy múa quanh lửa trại ạ!',
          coachingTip: 'Chụp một tấm ảnh con đang học bài và hỏi con: "What are you doing?" để con trả lời: "I am studying English!"'
        }
      ],
      commonMistakes: [
        {
          mistake: "He building a campfire.",
          correction: "He is building a campfire. (hoặc He's building...)",
          why: 'Rất nhiều học sinh quên động từ to-be "is" trước V-ing.'
        }
      ],
      homeActivity: {
        name: 'Trò chơi "Dựng lều cắm trại tại phòng khách"',
        timeNeeded: '5 phút',
        steps: [
          'Dùng một tấm chăn mỏng vắt qua hai chiếc ghế làm "chiếc lều trại dã chiến".',
          'Con và bố mẹ cùng chui vào lều giả vờ ăn bánh và kể chuyện:',
          'Bố mẹ hỏi: "What are we doing?", con reo to: "We’re camping and telling stories!"'
        ],
        benefit: 'Kỷ niệm tuổi thơ khó quên, con gắn liền tiếng Anh với niềm vui bất tận.'
      },
      praisePhrases: [
        { en: 'Super camper! Full of energy!', vi: 'Nhà cắm trại cừ khôi! Tràn đầy năng lượng!', phonetic: 'ˈsupər ˈkæmpər! fʊl ʌv ˈɛnərdʒi!' },
        { en: 'Congratulations! You completed English 4!', vi: 'Chúc mừng con yêu đã chinh phục xong Tiếng Anh lớp 4!', phonetic: 'kənˌɡrætʃəˈleɪʃənz!' }
      ]
    },
    sentenceGames: [
      {
        id: 'sg20-1',
        scrambledWords: ['is', 'What', 'he', 'doing?'],
        correctSentence: 'What is he doing?',
        vietnameseMeaning: 'Cậu ấy đang làm gì?',
        hint: 'What is he doing?'
      },
      {
        id: 'sg20-2',
        scrambledWords: ['campfire.', 'a', 'building', 'He’s'],
        correctSentence: 'He’s building a campfire.',
        vietnameseMeaning: 'Cậu ấy đang dựng lửa trại.',
        hint: 'He’s building a campfire.'
      },
      {
        id: 'sg20-3',
        scrambledWords: ['playing', 'war.', 'They’re', 'of', 'tug'],
        correctSentence: 'They’re playing tug of war.',
        vietnameseMeaning: 'Họ đang chơi kéo co.',
        hint: 'They’re playing tug of war.'
      }
    ],
    quizzes: [
      {
        id: 'q20-1',
        question: 'Điền từ còn thiếu: "What ___ they doing at the campsite?"',
        questionVi: 'Chọn trợ động từ to-be đi với "they":',
        options: ['are', 'is', 'do', 'does'],
        correctIndex: 0,
        explanation: 'Với chủ ngữ số nhiều "they" trong thì tiếp diễn ta dùng "are".',
        type: 'choice'
      },
      {
        id: 'q20-2',
        question: 'Trò chơi "kéo co" trong tiếng Anh là gì?',
        questionVi: 'Nhận biết trò chơi:',
        options: ['tug of war', 'card games', 'football', 'badminton'],
        correctIndex: 0,
        explanation: '"tug of war" là trò chơi kéo co.',
        type: 'choice'
      }
    ],
    boardGameTiles: [
      { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
      { index: 2, label: 'Dựng lều', type: 'question', question: 'Dựng lều tiếng Anh là: "putting up a ___"', options: ['tent', 'campfire'], correctAnswer: 'tent', icon: '⛺' },
      { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', stepDelta: 2, icon: '⭐' },
      { index: 4, label: 'Đang làm gì?', type: 'question', question: 'Điền từ: "What ___ he doing?"', options: ['is', 'are'], correctAnswer: 'is', icon: '❓' },
      { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
      { index: 6, label: 'Kéo co', type: 'question', question: 'Kéo co gọi là: "tug of ___"', options: ['war', 'peace'], correctAnswer: 'war', icon: '🪢' },
      { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', stepDelta: 3, icon: '🚀' },
      { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '↩️' },
      { index: 9, label: 'Chụp ảnh', type: 'question', question: 'Chụp ảnh là: "___ a photo"', options: ['taking', 'playing'], correctAnswer: 'taking', icon: '📷' },
      { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', stepDelta: 1, icon: '🌟' },
      { index: 11, label: 'Lùi 1 ô 🔙', type: 'back', stepDelta: -1, icon: '⬅️' },
      { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
    ]
  }
];

// Map of all 20 units overview for quick switcher & curriculum map
export interface UnitSummary {
  id: string;
  volume: 1 | 2;
  unitNumber: number;
  title: string;
  vietnameseTitle: string;
  pageTextbook: string;
  keyStructure: string;
  icon: string;
}

export const ALL_UNITS_SUMMARY: UnitSummary[] = [
  // Tập 1
  { id: 'unit-1', volume: 1, unitNumber: 1, title: 'My friends', vietnameseTitle: 'Bạn bè của em', pageTextbook: 'Trang 10', keyStructure: 'Where are you from? - I’m from...', icon: '🤝' },
  { id: 'unit-2', volume: 1, unitNumber: 2, title: 'Time and daily routines', vietnameseTitle: 'Thời gian & thói quen', pageTextbook: 'Trang 16 - 21', keyStructure: 'What time is it? / What time do you...?', icon: '⏰' },
  { id: 'unit-3', volume: 1, unitNumber: 3, title: 'My week', vietnameseTitle: 'Tuần lễ của em', pageTextbook: 'Trang 22 - 27', keyStructure: 'What day is it today? / What do you do on...?', icon: '📅' },
  { id: 'unit-4', volume: 1, unitNumber: 4, title: 'My birthday party', vietnameseTitle: 'Tiệc sinh nhật của em', pageTextbook: 'Trang 28 - 33', keyStructure: 'When’s your birthday? / What do you want to eat/drink?', icon: '🎂' },
  { id: 'unit-5', volume: 1, unitNumber: 5, title: 'Things we can do', vietnameseTitle: 'Những điều em có thể làm', pageTextbook: 'Trang 34 - 39', keyStructure: 'Can you...? / Can he/she...?', icon: '🚴' },
  { id: 'review-1', volume: 1, unitNumber: 0, title: 'Review 1 & Extension', vietnameseTitle: 'Ôn tập 1 & Mở rộng', pageTextbook: 'Trang 40 - 43', keyStructure: 'Review Units 1 - 5 & Extension World Activities', icon: '🏆' },
  { id: 'unit-6', volume: 1, unitNumber: 6, title: 'Our school', vietnameseTitle: 'Trường học của chúng em', pageTextbook: 'Trang 44 - 49', keyStructure: 'Where’s your school? / How many ... are there?', icon: '🏫' },
  { id: 'unit-7', volume: 1, unitNumber: 7, title: 'Our timetables', vietnameseTitle: 'Thời khóa biểu của em', pageTextbook: 'Trang 50 - 55', keyStructure: 'What subjects do you have today? / When do you have...?', icon: '🗓️' },
  { id: 'unit-8', volume: 1, unitNumber: 8, title: 'My favourite subjects', vietnameseTitle: 'Môn học yêu thích của em', pageTextbook: 'Trang 56 - 61', keyStructure: 'What’s your favourite subject? / Why do you like...?', icon: '🎨' },
  { id: 'unit-9', volume: 1, unitNumber: 9, title: 'Our sports day', vietnameseTitle: 'Ngày hội thể thao của trường em', pageTextbook: 'Trang 62 - 67', keyStructure: 'Is your sports day in...? / When’s your sports day?', icon: '🏆' },
  { id: 'unit-10', volume: 1, unitNumber: 10, title: 'Our summer holidays', vietnameseTitle: 'Kỳ nghỉ hè của chúng em', pageTextbook: 'Trang 68 - 73', keyStructure: 'Were you in...? / Where were you...?', icon: '🏖️' },
  { id: 'review-2', volume: 1, unitNumber: 0, title: 'Review 2 & Extension', vietnameseTitle: 'Ôn tập 2 & Mở rộng', pageTextbook: 'Trang 74 - 77', keyStructure: 'Review Units 6 - 10 & Board Game', icon: '🏆' },
  { id: 'wordlist-1', volume: 1, unitNumber: 0, title: 'Wordlist SGK Tập 1', vietnameseTitle: 'Danh mục từ vựng Tập 1', pageTextbook: 'Trang 78 - 80', keyStructure: 'Bảng tra cứu 82 từ vựng chuẩn phiên âm IPA', icon: '📑' },

  // Tập 2
  { id: 'unit-11', volume: 2, unitNumber: 11, title: 'My home', vietnameseTitle: 'Ngôi nhà của em', pageTextbook: 'Trang 6', keyStructure: 'Where do you live? - I live in / at... / What’s the... like?', icon: '🏡' },
  { id: 'unit-12', volume: 2, unitNumber: 12, title: 'Jobs', vietnameseTitle: 'Nghề nghiệp', pageTextbook: 'Trang 12', keyStructure: 'What does he/she do? / Where does he/she work?', icon: '👨‍💼' },
  { id: 'unit-13', volume: 2, unitNumber: 13, title: 'Appearance', vietnameseTitle: 'Ngoại hình', pageTextbook: 'Trang 18', keyStructure: 'What does he look like? - He’s tall / He has a round face', icon: '👤' },
  { id: 'unit-14', volume: 2, unitNumber: 14, title: 'Daily activities', vietnameseTitle: 'Hoạt động hàng ngày', pageTextbook: 'Trang 24', keyStructure: 'When do you watch TV? / What do you do in the morning?', icon: '🧹' },
  { id: 'unit-15', volume: 2, unitNumber: 15, title: 'My family’s weekends', vietnameseTitle: 'Cuối tuần của gia đình', pageTextbook: 'Trang 30', keyStructure: 'Where does he go on Saturdays? / What does he do on Sundays?', icon: '🎾' },
  { id: 'review-3', volume: 2, unitNumber: 0, title: 'Review 3 & Extension', vietnameseTitle: 'Ôn tập 3 & Mở rộng', pageTextbook: 'Trang 36 - 39', keyStructure: 'Review Units 11 - 15 (My home, Jobs, Appearance, Daily activities, Weekends)', icon: '🏆' },
  { id: 'unit-16', volume: 2, unitNumber: 16, title: 'Weather', vietnameseTitle: 'Thời tiết', pageTextbook: 'Trang 40', keyStructure: 'What was the weather like? - It was sunny / rainy / windy', icon: '⛅' },
  { id: 'unit-17', volume: 2, unitNumber: 17, title: 'In the city', vietnameseTitle: 'Trong thành phố', pageTextbook: 'Trang 46', keyStructure: 'What does it say? - It says \'stop\' / How can I get to the...?', icon: '🚦' },
  { id: 'unit-18', volume: 2, unitNumber: 18, title: 'At the shopping centre', vietnameseTitle: 'Tại trung tâm mua sắm', pageTextbook: 'Trang 52', keyStructure: 'Where’s the bookshop? / How much is the skirt?', icon: '🛍️' },
  { id: 'unit-19', volume: 2, unitNumber: 19, title: 'The animal world', vietnameseTitle: 'Thế giới động vật', pageTextbook: 'Trang 58', keyStructure: 'What are these animals? / Why do you like...? - Because they roar loudly', icon: '🦁' },
  { id: 'unit-20', volume: 2, unitNumber: 20, title: 'At summer camp', vietnameseTitle: 'Ở trại hè', pageTextbook: 'Trang 64', keyStructure: 'What’s he doing? - He’s building a campfire / What are they doing?', icon: '⛺' },
  { id: 'review-4', volume: 2, unitNumber: 0, title: 'Review 4 & Extension', vietnameseTitle: 'Ôn tập 4 & Tổng kết Tập 2', pageTextbook: 'Trang 70 - 71', keyStructure: 'Review Units 16 - 20 (Weather, City, Shopping, Animals, Summer camp)', icon: '🏆' },
  { id: 'wordlist-2', volume: 2, unitNumber: 0, title: 'Wordlist SGK Tập 2', vietnameseTitle: 'Danh mục từ vựng Tập 2', pageTextbook: 'Trang 74 - 75', keyStructure: 'Bảng tra cứu 100+ từ vựng Tập 2 chuẩn phiên âm IPA', icon: '📑' },
  { id: 'exam-hub', volume: 1, unitNumber: 0, title: 'Kho Đề Thi Học Kì (14 Đề)', vietnameseTitle: 'Đề Thi Tuyển Chọn Lớp 4', pageTextbook: '14 Đề Chuẩn Có Audio', keyStructure: 'Trắc nghiệm, Nghe Audio, Đọc hiểu, Đặt câu hỏi, Sắp xếp câu & Tính giờ', icon: '📝' }
];

export const CHARACTERS = [
  { name: 'Minh', avatar: '👦', desc: 'Cậu bạn học sinh chăm chỉ đến từ Việt Nam' },
  { name: 'Mai', avatar: '👧', desc: 'Cô bạn Việt Nam thông minh, nói tiếng Anh rất hay' },
  { name: 'Lucy', avatar: '👱‍♀️', desc: 'Bạn gái năng động đến từ nước Anh (Britain)' },
  { name: 'Ben', avatar: '🧑‍🦰', desc: 'Cậu bạn tóc xoăn hài hước đến từ nước Úc (Australia)' },
  { name: 'Mary', avatar: '👩‍🦱', desc: 'Cô bạn tóc vàng đáng yêu đến từ nước Mỹ (America)' },
  { name: 'Bill', avatar: '👦🏼', desc: 'Bạn nhỏ thích khám phá khoa học và dã ngoại' },
  { name: 'Linh', avatar: '👧🏻', desc: 'Bạn nhỏ chu đáo, thích giúp mẹ việc nhà' },
  { name: 'Nam', avatar: '👦🏾', desc: 'Bạn nam thể thao nhanh nhẹn' },
  { name: 'Ms Hoa', avatar: '👩‍🏫', desc: 'Cô giáo dạy tiếng Anh tận tụy, giọng ấm áp' },
  { name: 'Mr Long', avatar: '👨‍🏫', desc: 'Thầy giáo thân thiện, luôn khích lệ học sinh' }
];
