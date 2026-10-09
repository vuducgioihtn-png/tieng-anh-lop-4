import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award,
  Volume2,
  Play,
  RotateCcw,
  Check,
  HelpCircle,
  Lightbulb,
  Heart,
  Star,
  CloudSun,
  MapPin,
  ShoppingBag,
  Flame,
  Tent,
  PenTool,
  Dices,
  Eye,
  CheckSquare
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';

interface Review4StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit20?: () => void;
  onSwitchToUnit19?: () => void;
  onSwitchToUnit18?: () => void;
  onSwitchToUnit17?: () => void;
  onSwitchToUnit16?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToWordlist?: () => void;
  initialTab?: number;
}

export const Review4Studio: React.FC<Review4StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit20,
  onSwitchToUnit19,
  onSwitchToUnit18,
  onSwitchToUnit17,
  onSwitchToUnit16,
  onSwitchToReview3,
  onSwitchToWordlist,
  initialTab = 1
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialTab);

  const tabs = [
    {
      id: 1,
      title: '1. Nghe & Đánh Dấu (Trang 70)',
      subtitle: 'Track 102 · 5 Câu Nghe Trực Quan',
      icon: '🎧',
      color: 'from-amber-600 to-orange-600'
    },
    {
      id: 2,
      title: '2. Hỏi & Đáp Thực Hành (Trang 70)',
      subtitle: 'Ask & Answer · 4 Chủ Đề Trọng Tâm',
      icon: '🗣️',
      color: 'from-orange-600 to-rose-600'
    },
    {
      id: 3,
      title: '3. Đọc & Nối Câu (Trang 71)',
      subtitle: 'Read & Match · Tổng Hợp Units 16 - 20',
      icon: '🔗',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 4,
      title: '4. Đọc Hiểu Trại Hè (Trang 71)',
      subtitle: 'Read & Complete · Bài Văn Happy Camp',
      icon: '📖',
      color: 'from-teal-600 to-emerald-600'
    },
    {
      id: 5,
      title: '5. Phòng Viết (Trang 71)',
      subtitle: 'Let\'s Write · What are we doing?',
      icon: '✍️',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 6,
      title: '6. Cờ Trại Hè 5 Units',
      subtitle: 'Board Game Tổng Kết Học Kỳ 2',
      icon: '🎲',
      color: 'from-rose-600 to-pink-600'
    }
  ];

  // =========================================================================
  // TAB 1: LISTEN AND TICK (TRACK 102)
  // =========================================================================
  interface Track102Item {
    id: number;
    unitTheme: string;
    question: string;
    script: string;
    options: {
      key: 'a' | 'b' | 'c';
      label: string;
      icon: string;
      desc: string;
    }[];
    correctKey: 'a' | 'b' | 'c';
    explanation: string;
  }

  const track102Questions: Track102Item[] = [
    {
      id: 1,
      unitTheme: 'Unit 16: Thời Tiết (Weather)',
      question: '1. Thời tiết hôm qua thế nào?',
      script: '1. What was the weather like yesterday? - It was rainy.',
      options: [
        { key: 'a', label: 'Rainy', icon: '🌧️', desc: 'Trời có mưa' },
        { key: 'b', label: 'Sunny', icon: '☀️', desc: 'Trời nắng đẹp' },
        { key: 'c', label: 'Windy', icon: '🍃💨', desc: 'Trời nhiều gió' }
      ],
      correctKey: 'a',
      explanation: 'Băng âm thanh đọc: "It was rainy", đáp án đúng là a (Trời mưa 🌧️).'
    },
    {
      id: 2,
      unitTheme: 'Unit 17: Trong Thành Phố (In the city)',
      question: '2. Biển báo hoặc tín hiệu giao thông chỉ gì?',
      script: '2. What does it say? - It says \'Turn right\'.',
      options: [
        { key: 'a', label: 'Turn right', icon: '➡️', desc: 'Rẽ phải' },
        { key: 'b', label: 'Turn left', icon: '⬅️', desc: 'Rẽ trái' },
        { key: 'c', label: 'Traffic lights', icon: '🚦', desc: 'Đèn tín hiệu giao thông' }
      ],
      correctKey: 'a',
      explanation: 'Băng âm thanh đọc: "It says \'Turn right\'", đáp án đúng là a (Rẽ phải ➡️).'
    },
    {
      id: 3,
      unitTheme: 'Unit 18: Tại TTTM (At the shopping centre)',
      question: '3. Quyển vở này có giá bao nhiêu tiền?',
      script: '3. How much is this notebook? - It’s fifteen thousand dong.',
      options: [
        { key: 'a', label: '10,000d', icon: '📕', desc: 'Ten thousand dong' },
        { key: 'b', label: '15,000d', icon: '📗', desc: 'Fifteen thousand dong' },
        { key: 'c', label: '20,000d', icon: '📙', desc: 'Twenty thousand dong' }
      ],
      correctKey: 'b',
      explanation: 'Băng âm thanh đọc: "It’s fifteen thousand dong" (15.000đ), đáp án đúng là b.'
    },
    {
      id: 4,
      unitTheme: 'Unit 19: Thế Giới Động Vật (The animal world)',
      question: '4. Bạn ấy thích con vật nào ở sở thú?',
      script: '4. Why do you like lions? - Because they roar loudly.',
      options: [
        { key: 'a', label: 'Giraffes', icon: '🦒', desc: 'Hươu cao cổ' },
        { key: 'b', label: 'Lions', icon: '🦁', desc: 'Sư tử' },
        { key: 'c', label: 'Hippos', icon: '🦛', desc: 'Hà mã' }
      ],
      correctKey: 'b',
      explanation: 'Băng âm thanh nhắc đến: "lions" và "roar loudly", đáp án đúng là b (Sư tử 🦁).'
    },
    {
      id: 5,
      unitTheme: 'Unit 20: Ở Trại Hè (At summer camp)',
      question: '5. Bạn ấy đang làm gì ở khu cắm trại?',
      script: '5. What’s he doing at the campsite? - He’s putting up a tent.',
      options: [
        { key: 'a', label: 'Taking photos', icon: '📸', desc: 'Chụp ảnh' },
        { key: 'b', label: 'Putting up a tent', icon: '⛺', desc: 'Dựng lều cắm trại' },
        { key: 'c', label: 'Dancing around campfire', icon: '💃🔥', desc: 'Nhảy múa quanh lửa trại' }
      ],
      correctKey: 'b',
      explanation: 'Băng âm thanh đọc: "He’s putting up a tent", đáp án đúng là b (Dựng lều ⛺).'
    }
  ];

  const [tab1Answers, setTab1Answers] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });
  const [tab1Submitted, setTab1Submitted] = useState<boolean>(false);

  const handleSelectTab1 = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setTab1Answers(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckTab1 = () => {
    const isCompleted = Object.values(tab1Answers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setTab1Submitted(true);
    let correct = 0;
    track102Questions.forEach(q => {
      if (tab1Answers[q.id] === q.correctKey) correct++;
    });

    if (correct === 5) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetTab1 = () => {
    sound.playClick();
    setTab1Answers({ 1: null, 2: null, 3: null, 4: null, 5: null });
    setTab1Submitted(false);
  };

  // =========================================================================
  // TAB 2: ASK AND ANSWER (TRANG 70)
  // =========================================================================
  const askAnswerCards = [
    {
      id: 1,
      unit: 'Unit 17: Chỉ Đường (Directions)',
      question: 'How can I get to the cinema?',
      questionVi: 'Làm thế nào để tớ đến được rạp chiếu phim?',
      answer: 'Go straight and turn right.',
      answerVi: 'Đi thẳng rồi rẽ phải.',
      icon: '🎬',
      context: 'Xem bản đồ: Bạn nhỏ chỉ đường đi thẳng và rẽ phải tại ngã rẽ vào rạp chiếu phim.',
      tip: 'Mẫu câu chỉ đường: Go straight (Đi thẳng) / Turn right (Rẽ phải) / Turn left (Rẽ trái).'
    },
    {
      id: 2,
      unit: 'Unit 18: Vị Trí Cửa Hàng (Store Locations)',
      question: "Where's the bakery?",
      questionVi: 'Tiệm bánh mì ở đâu vậy bạn?',
      answer: "It's opposite the bookshop.",
      answerVi: 'Nó nằm đối diện với hiệu sách.',
      icon: '🥐',
      context: 'Tại trung tâm mua sắm: Gian hàng bánh mì Bakery nằm đối diện qua lối đi với hiệu sách Bookshop.',
      tip: 'Giới từ vị trí: opposite (đối diện), near (gần), behind (đằng sau), between (ở giữa).'
    },
    {
      id: 3,
      unit: 'Unit 19: Lý Do Yêu Thích (Animal Reasons)',
      question: 'Why do you like lions?',
      questionVi: 'Tại sao bạn lại thích sư tử?',
      answer: 'Because they roar loudly.',
      answerVi: 'Bởi vì chúng gầm vang thật to và dũng mãnh.',
      icon: '🦁',
      context: 'Bức tranh đàn sư tử dũng mãnh đang gầm vang oai vệ bên vách đá.',
      tip: 'Hỏi Why trả lời Because. Trạng từ tận cùng đuôi -ly: roar loudly, run quickly, dance beautifully.'
    },
    {
      id: 4,
      unit: 'Unit 20: Hoạt Động Trại Hè (Summer Camp Activities)',
      question: 'What are they doing?',
      questionVi: 'Họ đang làm gì vậy?',
      answer: "They're playing tug of war.",
      answerVi: 'Họ đang chơi trò kéo co cùng nhau.',
      icon: '🪢',
      context: 'Bức tranh các bạn nhỏ đang gồng mình thi đấu trò chơi kéo co sôi động tại trại hè.',
      tip: 'Hỏi số nhiều What are they doing? Trả lời: They\'re + V-ing (playing tug of war, singing songs...).'
    }
  ];

  const [selectedAskCard, setSelectedAskCard] = useState(askAnswerCards[0]);

  // =========================================================================
  // TAB 3: READ AND MATCH (TRANG 71)
  // =========================================================================
  interface MatchItem {
    id: number;
    unitNum: number;
    unitName: string;
    question: string;
    correctLetter: 'a' | 'b' | 'c' | 'd' | 'e';
    answerText: string;
  }

  const matchRows: MatchItem[] = [
    {
      id: 1,
      unitNum: 16,
      unitName: 'Unit 16 (Thời tiết)',
      question: '1. What was the weather like yesterday?',
      correctLetter: 'c',
      answerText: 'c. It was windy.'
    },
    {
      id: 2,
      unitNum: 17,
      unitName: 'Unit 17 (Chỉ đường)',
      question: '2. How can I get to the library?',
      correctLetter: 'a',
      answerText: 'a. Go straight and turn right.'
    },
    {
      id: 3,
      unitNum: 18,
      unitName: 'Unit 18 (Hỏi giá tiền)',
      question: '3. How much is this pencil case?',
      correctLetter: 'b',
      answerText: "b. It's 40,000 dong."
    },
    {
      id: 4,
      unitNum: 19,
      unitName: 'Unit 19 (Lý do thích thú)',
      question: '4. Why do you like giraffes?',
      correctLetter: 'e',
      answerText: 'e. Because they run quickly.'
    },
    {
      id: 5,
      unitNum: 20,
      unitName: 'Unit 20 (Hoạt động cắm trại)',
      question: "5. What's he doing at the campsite?",
      correctLetter: 'd',
      answerText: "d. He's playing tug of war."
    }
  ];

  const matchOptionsList = [
    { key: 'a' as const, text: 'a. Go straight and turn right.' },
    { key: 'b' as const, text: "b. It's 40,000 dong." },
    { key: 'c' as const, text: 'c. It was windy.' },
    { key: 'd' as const, text: "d. He's playing tug of war." },
    { key: 'e' as const, text: 'e. Because they run quickly.' }
  ];

  const [tab3UserAnswers, setTab3UserAnswers] = useState<Record<number, 'a' | 'b' | 'c' | 'd' | 'e' | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });
  const [tab3Submitted, setTab3Submitted] = useState<boolean>(false);

  const handleSelectTab3 = (qId: number, letter: 'a' | 'b' | 'c' | 'd' | 'e') => {
    sound.playClick();
    setTab3UserAnswers(prev => ({ ...prev, [qId]: letter }));
  };

  const handleCheckTab3 = () => {
    const isCompleted = Object.values(tab3UserAnswers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setTab3Submitted(true);
    let correct = 0;
    matchRows.forEach(r => {
      if (tab3UserAnswers[r.id] === r.correctLetter) correct++;
    });

    if (correct === 5) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetTab3 = () => {
    sound.playClick();
    setTab3UserAnswers({ 1: null, 2: null, 3: null, 4: null, 5: null });
    setTab3Submitted(false);
  };

  // =========================================================================
  // TAB 4: READ AND COMPLETE (TRANG 71) - HAPPY CAMP PASSAGE
  // =========================================================================
  const happyCampPassage = {
    title: 'Welcome to our Happy Camp (Chào mừng đến với Trại Hạnh Phúc)',
    text:
      "Welcome to our Happy Camp. It is sunny. We are doing a lot of activities now. Some boys are near the tree. They are playing tug of war. Some girls are at the tent. They are singing and dancing beautifully. The teacher is taking photos. We like our summer camp activities very much.",
    textVi:
      "Chào mừng các bạn đến với Trại Hạnh Phúc của chúng tớ. Trời đang có nắng đẹp. Chúng tớ đang tham gia rất nhiều hoạt động vào lúc này. Một số bạn nam đang ở gần gốc cây, các bạn ấy đang chơi kéo co. Một số bạn nữ đang ở cạnh lều trại, các bạn ấy đang hát và nhảy múa tuyệt đẹp. Cô giáo thì đang chụp ảnh lưu niệm. Chúng tớ vô cùng yêu thích các hoạt động trại hè của mình."
  };

  const [tab4_1, setTab4_1] = useState('');
  const [tab4_2, setTab4_2] = useState('');
  const [tab4_3, setTab4_3] = useState('');
  const [tab4_4, setTab4_4] = useState('');
  const [tab4Submitted, setTab4Submitted] = useState(false);

  const handleCheckTab4 = () => {
    setTab4Submitted(true);
    let score = 0;
    if (tab4_1.trim().toLowerCase() === 'sunny') score++;
    if (tab4_2.trim().toLowerCase() === 'playing') score++;
    if (tab4_3.trim().toLowerCase() === 'dancing') score++;
    if (tab4_4.trim().toLowerCase().includes('photo') || tab4_4.trim().toLowerCase() === 'photos') score++;

    if (score === 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(score);
    }
  };

  const handleResetTab4 = () => {
    sound.playClick();
    setTab4_1('');
    setTab4_2('');
    setTab4_3('');
    setTab4_4('');
    setTab4Submitted(false);
  };

  // =========================================================================
  // TAB 5: LET'S WRITE - WHAT ARE WE DOING? (TRANG 71)
  // =========================================================================
  const [userCampEssay, setUserCampEssay] = useState<string>(
    "Welcome to our summer camp. We are doing a lot of activities here. The boys are ... The girls are ... Our teacher is ... We are very happy!"
  );
  const [tab5Awarded, setTab5Awarded] = useState<boolean>(false);

  const campSampleArticles = [
    {
      id: 's1',
      title: 'Mẫu 1: Kéo co & Nhảy múa 🪢💃',
      content:
        "Welcome to our summer camp. We are doing a lot of activities here. Some boys are playing tug of war. Some girls are singing and dancing beautifully. Our teacher is taking photos. We are having a wonderful time!"
    },
    {
      id: 's2',
      title: 'Mẫu 2: Dựng lều & Nhóm lửa trại ⛺🔥',
      content:
        "Welcome to our summer camp. We are doing a lot of activities here. Nam and Bill are putting up a tent. Mai is building a campfire. Linh is telling a funny story. We love our summer camp activities very much!"
    },
    {
      id: 's3',
      title: 'Mẫu 3: Chơi thẻ bài & Ca hát 🃏🎶',
      content:
        "Welcome to our summer camp. We are doing a lot of activities here. Mary and Lucy are playing card games under the tree. Other friends are singing songs around the campfire. It is sunny and exciting!"
    }
  ];

  const handleApplySample = (text: string) => {
    sound.playClick();
    setUserCampEssay(text);
  };

  const handleEvaluateTab5 = () => {
    if (userCampEssay.length < 30) {
      sound.playWarning();
      return;
    }
    sound.playComplete();
    setTab5Awarded(true);
    onAddStar(5);
    confetti({ particleCount: 70, spread: 60 });
  };

  // =========================================================================
  // TAB 6: BOARD GAME TỔNG HỢP 5 UNITS (REVIEW 4 MEGA BOARD GAME)
  // =========================================================================
  const review4Tiles = [
    { index: 1, label: 'Start 🚀', type: 'start', icon: '🏁' },
    { index: 2, label: 'Unit 16', type: 'question', q: 'Hỏi thời tiết hôm qua: "What ___ the weather like yesterday?"', opts: ['was', 'is'], ans: 'was', icon: '⛅' },
    { index: 3, label: 'Tiến 2 ô ⏩', type: 'forward', delta: 2, icon: '⭐' },
    { index: 4, label: 'Unit 17', type: 'question', q: 'Rẽ phải trong tiếng Anh là: "Turn ___"', opts: ['right', 'left'], ans: 'right', icon: '🚦' },
    { index: 5, label: 'Mất lượt 🛑', type: 'skip', icon: '⏳' },
    { index: 6, label: 'Unit 18', type: 'question', q: '"Bốn mươi nghìn đồng" là: "forty ___ dong"', opts: ['thousand', 'hundred'], ans: 'thousand', icon: '🏷️' },
    { index: 7, label: 'Tiến 3 ô 🚀', type: 'forward', delta: 3, icon: '🚀' },
    { index: 8, label: 'Lùi 1 ô 🔙', type: 'back', delta: -1, icon: '↩️' },
    { index: 9, label: 'Unit 19', type: 'question', q: 'Sư tử gầm to là: "Lions roar ___"', opts: ['loudly', 'quietly'], ans: 'loudly', icon: '🦁' },
    { index: 10, label: 'Thưởng 1 bước ⏩', type: 'forward', delta: 1, icon: '🌟' },
    { index: 11, label: 'Unit 20', type: 'question', q: 'Dựng lều tiếng Anh là: "putting up a ___"', opts: ['tent', 'tree'], ans: 'tent', icon: '⛺' },
    { index: 12, label: 'Về Đích! 🏆', type: 'finish', icon: '🥇' }
  ];

  const [currentTileIndex, setCurrentTileIndex] = useState(1);
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [boardMessage, setBoardMessage] = useState<string>('Lắc xúc xắc để bắt đầu hành trình ôn tập 5 Units!');
  const [showTileQuestion, setShowTileQuestion] = useState<any | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRollDice = () => {
    if (isGameOver) return;
    sound.playClick();
    const roll = Math.floor(Math.random() * 3) + 1; // 1 to 3 steps
    setDiceNumber(roll);

    let next = currentTileIndex + roll;
    if (next >= 12) {
      next = 12;
      setCurrentTileIndex(12);
      setIsGameOver(true);
      sound.playFanfare();
      onAddStar(10);
      confetti({ particleCount: 100, spread: 80 });
      setBoardMessage('🎉 Chúc mừng bạn đã chinh phục thành công Review 4 & Toàn bộ Tập 2 Tiếng Anh 4!');
      return;
    }

    const tile = review4Tiles.find(t => t.index === next);
    setCurrentTileIndex(next);

    if (tile?.type === 'question') {
      setShowTileQuestion(tile);
      setBoardMessage(`Ô số ${next}: Trả lời câu hỏi để tiếp tục!`);
    } else if (tile?.type === 'forward') {
      sound.playSuccess();
      const bonusNext = Math.min(12, next + (tile.delta || 1));
      setTimeout(() => {
        setCurrentTileIndex(bonusNext);
        setBoardMessage(`May mắn! Bạn được tiến thêm ${tile.delta} ô lên ô số ${bonusNext}!`);
      }, 700);
    } else if (tile?.type === 'back') {
      sound.playWrong();
      const backNext = Math.max(1, next + (tile.delta || -1));
      setTimeout(() => {
        setCurrentTileIndex(backNext);
        setBoardMessage(`Ối! Bạn bị lùi lại ô số ${backNext}!`);
      }, 700);
    } else if (tile?.type === 'skip') {
      setBoardMessage(`Ô số ${next}: Mất lượt nghỉ ngơi 1 nhịp.`);
    }
  };

  const handleTileAnswer = (picked: string) => {
    if (!showTileQuestion) return;
    if (picked === showTileQuestion.ans) {
      sound.playSuccess();
      onAddStar(2);
      confetti({ particleCount: 40, spread: 50 });
      setBoardMessage('✅ Xuất sắc! Trả lời đúng nhận 2 sao!');
      setShowTileQuestion(null);
    } else {
      sound.playWrong();
      setBoardMessage('❌ Chưa đúng! Cố gắng ở lượt sau nhé!');
      setShowTileQuestion(null);
    }
  };

  const handleResetBoardGame = () => {
    sound.playClick();
    setCurrentTileIndex(1);
    setDiceNumber(null);
    setIsGameOver(false);
    setShowTileQuestion(null);
    setBoardMessage('Lắc xúc xắc để bắt đầu lại cuộc phiêu lưu!');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                <span>Review 4 · SGK Tiếng Anh 4 Tập 2</span>
              </span>
              <span className="text-xs bg-yellow-300 text-amber-950 font-black px-2.5 py-0.5 rounded-full shadow-xs">
                Trang 70 – 71 SGK
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit20 && (
                <button
                  onClick={onSwitchToUnit20}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>⛺ Unit 20</span>
                </button>
              )}
              {onSwitchToUnit19 && (
                <button
                  onClick={onSwitchToUnit19}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>🦁 Unit 19</span>
                </button>
              )}
              {onSwitchToUnit18 && (
                <button
                  onClick={onSwitchToUnit18}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>🛍️ Unit 18</span>
                </button>
              )}
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>⭐ Review 3</span>
                </button>
              )}
              {onSwitchToWordlist && (
                <button
                  onClick={onSwitchToWordlist}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>📖 Từ Điển</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
              <span>Review 4: Tổng Ôn Tập Học Kỳ 2 (Units 16 - 20)</span>
              <span className="text-3xl md:text-4xl">🏆⛅🚦🛍️🦁⛺</span>
            </h1>
            <p className="text-amber-100 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Hệ thống ôn tập đa giác quan trực quan, sinh động tổng kết 5 bài học cuối của chương trình lớp 4: 
              <strong>Thời tiết (Unit 16)</strong>, <strong>Chỉ đường (Unit 17)</strong>, <strong>Mua sắm giá tiền (Unit 18)</strong>, <strong>Thế giới động vật (Unit 19)</strong> và <strong>Trại hè sôi động (Unit 20)</strong>.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            {tabs.map(tb => {
              const isActive = activeTab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tb.id);
                  }}
                  className={`p-3 rounded-2xl text-left transition-all border backdrop-blur-md flex flex-col justify-between ${
                    isActive
                      ? 'bg-white text-amber-950 border-white shadow-xl scale-102 ring-4 ring-white/30 font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{tb.icon}</span>
                    <span className="text-[10px] font-mono opacity-80">#{tb.id}</span>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xs font-black line-clamp-1">{tb.title}</h4>
                    <p className={`text-[10px] line-clamp-1 ${isActive ? 'text-slate-600' : 'text-amber-100'}`}>
                      {tb.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: LISTEN AND TICK (TRANG 70)
      ===================================================================== */}
      {activeTab === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 102
                </span>
                <span className="text-xs text-slate-500">Trang 70 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and tick (Lắng nghe và đánh dấu tích vào bức tranh đúng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetTab1}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckTab1}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {track102Questions.map(q => {
              const currentPick = tab1Answers[q.id];
              const isSubmitted = tab1Submitted;
              const isCorrect = currentPick === q.correctKey;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-black uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                        {q.unitTheme}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-1">{q.question}</h4>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.script, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Băng Âm Thanh #{q.id}</span>
                    </button>
                  </div>

                  {/* 3 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    {q.options.map(opt => {
                      const isChosen = currentPick === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-orange-300';
                      if (isChosen) {
                        btnStyle = 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200 font-bold';
                      }
                      if (isSubmitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectTab1(q.id, opt.key)}
                          className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-black text-sm">{opt.key.toUpperCase()}.</span>
                            <span className="text-3xl">{opt.icon}</span>
                            <div>
                              <p className="font-bold text-xs">{opt.label}</p>
                              <p className="text-[11px] opacity-80">{opt.desc}</p>
                            </div>
                          </div>
                          {isChosen && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700">
                      <p className="font-bold">{isCorrect ? '✅ Rất chính xác!' : '❌ Chưa chính xác!'}</p>
                      <p className="text-slate-600 mt-0.5">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: ASK AND ANSWER (TRANG 70)
      ===================================================================== */}
      {activeTab === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Speaking
                </span>
                <span className="text-xs text-slate-500">Trang 70 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Ask and answer (Luyện hỏi và trả lời 4 cấu trúc trọng tâm)
              </h3>
            </div>

            <div className="text-xs text-slate-500 italic bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
              Nhấn vào từng chủ đề bên dưới để luyện phát âm và mẫu câu!
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {askAnswerCards.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedAskCard(c);
                }}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  selectedAskCard.id === c.id
                    ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-300 font-bold'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="text-xs font-black text-slate-900 line-clamp-1">{c.unit.split(':')[0]}</span>
                <span className="text-[11px] text-slate-500 line-clamp-1">{c.unit.split(':')[1]}</span>
              </button>
            ))}
          </div>

          {/* Interactive Card Stage */}
          <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-3xl p-6 border border-orange-200/80 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-orange-200">
              <span className="text-xs font-black text-orange-900 uppercase">
                {selectedAskCard.unit}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(`${selectedAskCard.question} ${selectedAskCard.answer}`, speechRate);
                }}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe Trọn Cặp Câu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-900 uppercase">Câu hỏi:</span>
                  <button
                    onClick={() => speakWord(selectedAskCard.question, speechRate)}
                    className="p-1.5 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900">{selectedAskCard.question}</p>
                <p className="text-xs text-slate-600 italic">👉 {selectedAskCard.questionVi}</p>
              </div>

              <div className="bg-orange-600 text-white p-4 rounded-2xl border border-orange-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-100 uppercase">Câu trả lời:</span>
                  <button
                    onClick={() => speakWord(selectedAskCard.answer, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black">{selectedAskCard.answer}</p>
                <p className="text-xs text-orange-100 italic">👉 {selectedAskCard.answerVi}</p>
              </div>
            </div>

            <div className="bg-white/80 p-3.5 rounded-xl border border-orange-200 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-orange-950 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-orange-600" />
                <span>Ngữ cảnh & Mẹo ghi nhớ:</span>
              </p>
              <p>{selectedAskCard.context}</p>
              <p className="text-orange-900 font-semibold">{selectedAskCard.tip}</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: READ AND MATCH (TRANG 71)
      ===================================================================== */}
      {activeTab === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-xs uppercase">
                  Hoạt Động 3 · Reading
                </span>
                <span className="text-xs text-slate-500">Trang 71 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Read and match (Đọc và nối 5 câu hỏi với 5 câu trả lời tương ứng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetTab3}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckTab3}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Kiểm tra đáp án
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {matchRows.map(r => {
              const currentChoice = tab3UserAnswers[r.id];
              const isSubmitted = tab3Submitted;
              const isCorrect = currentChoice === r.correctLetter;

              return (
                <div
                  key={r.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                    <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                      {r.unitName}
                    </span>
                    <span className="font-bold text-slate-900 text-sm md:text-base">{r.question}</span>
                  </div>

                  {/* 5 Options Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2.5">
                    {matchOptionsList.map(opt => {
                      const isChosen = currentChoice === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-purple-300';
                      if (isChosen) {
                        btnStyle = 'bg-purple-600 text-white border-purple-600 font-bold ring-2 ring-purple-200';
                      }
                      if (isSubmitted) {
                        if (opt.key === r.correctLetter) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold ring-2 ring-emerald-200';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectTab3(r.id, opt.key)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt.text}</span>
                          {isChosen && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-700">
                      <p className="font-bold">{isCorrect ? '✅ Nối rất chính xác!' : '❌ Chưa chính xác!'}</p>
                      <p className="text-slate-600 mt-0.5">👉 Đáp án đúng: <strong>{r.answerText}</strong></p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: READ AND COMPLETE (TRANG 71)
      ===================================================================== */}
      {activeTab === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Read & Complete
                </span>
                <span className="text-xs text-slate-500">Trang 71 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Đọc đoạn văn Happy Camp và điền từ thích hợp vào chỗ trống
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetTab4}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckTab4}
                className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          {/* Happy Camp Reading Passage */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-teal-900 text-base">{happyCampPassage.title}</h4>
              <button
                onClick={() => speakWord(happyCampPassage.text, speechRate)}
                className="px-3 py-1 rounded-xl bg-teal-200/80 text-teal-900 text-xs font-bold transition flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Đọc đoạn văn
              </button>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {happyCampPassage.text}
            </p>
            <p className="text-xs text-slate-600 italic bg-white/70 p-3 rounded-xl border border-teal-100">
              👉 Bản dịch: {happyCampPassage.textVi}
            </p>
          </div>

          {/* 4 Fill-in blanks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-700">1. Thời tiết ở Happy Camp ☀️</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>The weather is</span>
                <input
                  type="text"
                  value={tab4_1}
                  onChange={e => setTab4_1(e.target.value)}
                  placeholder="sunny"
                  className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>at Happy Camp.</span>
              </div>
              {tab4Submitted && (
                <p className="text-xs text-teal-800">👉 Đáp án đúng: <strong>sunny</strong></p>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-700">2. Hoạt động của các bạn nam 🪢</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>The boys are</span>
                <input
                  type="text"
                  value={tab4_2}
                  onChange={e => setTab4_2(e.target.value)}
                  placeholder="playing"
                  className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>tug of war.</span>
              </div>
              {tab4Submitted && (
                <p className="text-xs text-teal-800">👉 Đáp án đúng: <strong>playing</strong></p>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-700">3. Hoạt động của các bạn nữ 💃</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>Some girls are singing and</span>
                <input
                  type="text"
                  value={tab4_3}
                  onChange={e => setTab4_3(e.target.value)}
                  placeholder="dancing"
                  className="w-28 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>beautifully at the tent.</span>
              </div>
              {tab4Submitted && (
                <p className="text-xs text-teal-800">👉 Đáp án đúng: <strong>dancing</strong></p>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-700">4. Hoạt động của giáo viên 📸</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>The teacher is taking</span>
                <input
                  type="text"
                  value={tab4_4}
                  onChange={e => setTab4_4(e.target.value)}
                  placeholder="photos"
                  className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>.</span>
              </div>
              {tab4Submitted && (
                <p className="text-xs text-teal-800">👉 Đáp án đúng: <strong>photos</strong></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: LET'S WRITE - WHAT ARE WE DOING? (TRANG 71)
      ===================================================================== */}
      {activeTab === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Writing Studio
                </span>
                <span className="text-xs text-slate-500">Trang 71 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Tập viết đoạn văn: &quot;What are we doing?&quot; (Chúng tớ đang làm gì?)
              </h3>
            </div>

            <button
              onClick={handleEvaluateTab5}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Award className="w-3.5 h-3.5" /> Chấm bài & Nhận sao
            </button>
          </div>

          {/* Quick Apply Templates */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-slate-700 uppercase">Mẫu viết nhanh:</span>
            {campSampleArticles.map(s => (
              <button
                key={s.id}
                onClick={() => handleApplySample(s.content)}
                className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 hover:bg-blue-100"
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Writing Box */}
          <div className="space-y-2">
            <textarea
              rows={5}
              value={userCampEssay}
              onChange={e => setUserCampEssay(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-800 leading-relaxed"
              placeholder="Nhập bài viết của em ở đây..."
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Số ký tự: {userCampEssay.length}</span>
              <button
                onClick={() => speakWord(userCampEssay, speechRate)}
                className="text-blue-700 hover:underline flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe bài viết phát âm qua loa
              </button>
            </div>
          </div>

          {tab5Awarded && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1">
              <p className="font-black text-sm">🌟 Bài viết xuất sắc! Em đã hoàn thành trọn vẹn Review 4!</p>
              <p>Đoạn văn kết hợp nhuần nhuyễn thì Hiện Tại Tiếp Diễn với các hoạt động cắm trại phong phú.</p>
            </div>
          )}

          {/* Word Bank Reference */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 uppercase">Ngân hàng cụm từ gợi ý (Activities):</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'singing and dancing 💃🎶',
                'playing tug of war 🪢',
                'building a campfire 🔥',
                'playing card games 🃏',
                'telling a story 📖',
                'taking photos 📸'
              ].map((w, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-medium">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: BOARD GAME REVIEW 4 (MEGA GAME ÔN TẬP 5 UNITS)
      ===================================================================== */}
      {activeTab === 6 && (
        <div className="bg-gradient-to-r from-rose-700 via-orange-700 to-amber-700 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Trò Chơi Cờ Tỷ Phú · Review 4
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Cuộc Phiêu Lưu 12 Ô Chinh Phục Học Kỳ 2 🎲
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetBoardGame}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-yellow-300">
              📢 {boardMessage}
            </p>

            <button
              disabled={isGameOver || showTileQuestion !== null}
              onClick={handleRollDice}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs shadow-md transition flex items-center gap-2 ${
                isGameOver || showTileQuestion !== null
                  ? 'bg-white/30 text-white/50 cursor-not-allowed'
                  : 'bg-white text-orange-950 hover:bg-orange-100 active:scale-95'
              }`}
            >
              <Dices className="w-4 h-4 text-orange-600" />
              <span>{diceNumber ? `Đổ Được: ${diceNumber} Nút 🎲` : 'Lắc Xúc Xắc 🎲'}</span>
            </button>
          </div>

          {/* 12 Tiles Board Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {review4Tiles.map(tile => {
              const isCurrent = currentTileIndex === tile.index;
              return (
                <div
                  key={tile.index}
                  className={`p-3.5 rounded-2xl border text-center transition relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                    isCurrent
                      ? 'bg-yellow-400 text-orange-950 border-white ring-4 ring-white/50 font-black shadow-lg scale-105'
                      : 'bg-white/15 border-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono">#{tile.index}</span>
                    <span className="text-lg">{tile.icon}</span>
                  </div>
                  <p className="text-xs font-bold mt-1 line-clamp-2">{tile.label}</p>
                  {isCurrent && (
                    <span className="text-[10px] font-black uppercase text-red-700 bg-white px-1.5 py-0.5 rounded-full mt-1">
                      Bạn ở đây 📍
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Question Modal on Tile */}
          {showTileQuestion && (
            <div className="bg-white text-slate-900 rounded-2xl p-5 border-2 border-yellow-400 shadow-xl space-y-3">
              <span className="text-xs font-black uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                Thử Thách Ô Số {showTileQuestion.index} ({showTileQuestion.label})
              </span>
              <p className="text-base font-bold text-slate-900">{showTileQuestion.q}</p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {showTileQuestion.opts.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleTileAnswer(opt)}
                    className="p-3 rounded-xl border border-slate-300 hover:border-orange-500 hover:bg-orange-50 font-black text-sm text-slate-800 transition text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
