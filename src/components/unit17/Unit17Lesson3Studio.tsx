import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Music,
  PenTool,
  Copy,
  MapPin,
  Compass,
  Navigation,
  FileText,
  Store,
  Film,
  ShoppingCart,
  Croissant,
  Tent,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit17Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit17Lesson3Studio: React.FC<Unit17Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 70) - COMPOUND NOUN WORD STRESS
  // =========================================================================
  const phonicsItems = [
    {
      word: "'bookshop",
      plainWord: 'bookshop',
      stressedSyllable: 'BOOK',
      unstressedSyllable: 'shop',
      ipa: "/ˈbʊk.ʃɒp/",
      reading: "BÚC-shóp",
      sentenceEn: "How can I get to the 'bookshop?",
      sentenceVi: "Làm thế nào để tớ đến hiệu sách?",
      icon: "📚",
      note: "Danh từ ghép (book + shop): Trọng âm rơi vào âm tiết đầu tiên 'BOOK'."
    },
    {
      word: "'campsite",
      plainWord: 'campsite',
      stressedSyllable: 'CAMP',
      unstressedSyllable: 'site',
      ipa: "/ˈkæmp.saɪt/",
      reading: "CAM-sait",
      sentenceEn: "How can I get to the 'campsite?",
      sentenceVi: "Làm thế nào để tớ đến khu cắm trại?",
      icon: "⛺",
      note: "Danh từ ghép (camp + site): Nhấn mạnh rõ ở âm 'CAMP'."
    },
    {
      word: "'bakery",
      plainWord: 'bakery',
      stressedSyllable: 'BAKE',
      unstressedSyllable: 'ry',
      ipa: "/ˈbeɪ.kər.i/",
      reading: "BÂY-kơ-ri",
      sentenceEn: "Turn right at the 'bakery.",
      sentenceVi: "Rẽ phải ở tiệm bánh mì nhé.",
      icon: "🥐",
      note: "Từ có 3 âm tiết kết thúc đuôi -y: Trọng âm nhấn ở âm đầu 'BAKE'."
    },
    {
      word: "'supermarket",
      plainWord: 'supermarket',
      stressedSyllable: 'SU',
      unstressedSyllable: 'permarket',
      ipa: "/ˈsuː.pəˌmɑː.kɪt/",
      reading: "SU-pơ-ma-kịt",
      sentenceEn: "Go straight to the 'supermarket.",
      sentenceVi: "Đi thẳng tới siêu thị nhé.",
      icon: "🛒",
      note: "Trọng âm chính nhấn rõ ở âm đầu 'SU' (ngân dài âm u:)."
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 71)
  // =========================================================================
  interface CircleQuestion {
    id: number;
    questionTitle: string;
    sentenceStart: string;
    sentenceEnd: string;
    options: { key: 'a' | 'b' | 'c'; text: string; icon: string }[];
    correctKey: 'a' | 'b' | 'c';
    audioScript: string;
    explanation: string;
  }

  const circleQuestions: CircleQuestion[] = [
    {
      id: 1,
      questionTitle: 'Câu 1 (SGK Trang 50)',
      sentenceStart: '1. How can I get to the',
      sentenceEnd: '?',
      options: [
        { key: 'a', text: 'campsite', icon: '⛺' },
        { key: 'b', text: 'bookshop', icon: '📚' },
        { key: 'c', text: 'bakery', icon: '🥐' }
      ],
      correctKey: 'b',
      audioScript: 'Excuse me. How can I get to the bookshop? - Go straight and turn left.',
      explanation: 'Trong băng nghe rõ: "How can I get to the bookshop?" -> Chọn đáp án b (bookshop).'
    },
    {
      id: 2,
      questionTitle: 'Câu 2 (SGK Trang 50)',
      sentenceStart: '2. Turn left at the',
      sentenceEnd: '.',
      options: [
        { key: 'a', text: 'campsite', icon: '⛺' },
        { key: 'b', text: 'supermarket', icon: '🛒' },
        { key: 'c', text: 'bakery', icon: '🥐' }
      ],
      correctKey: 'a',
      audioScript: 'How can I get to the campsite? - Turn left at the traffic lights and go straight.',
      explanation: 'Trong bài hội thoại hỏi đường đến campsite: "How can I get to the campsite?" -> Chọn a (campsite).'
    },
    {
      id: 3,
      questionTitle: 'Câu 3 (Mở rộng củng cố)',
      sentenceStart: '3. Go straight and turn right to the',
      sentenceEnd: '.',
      options: [
        { key: 'a', text: 'cinema', icon: '🎬' },
        { key: 'b', text: 'food stall', icon: '🍢' },
        { key: 'c', text: 'water park', icon: '🌊' }
      ],
      correctKey: 'a',
      audioScript: 'Excuse me, where is the cinema? - Go straight and turn right to the cinema.',
      explanation: 'Câu nói chỉ đường đến rạp chiếu phim (cinema) -> Chọn a (cinema).'
    }
  ];

  const [userCircles, setUserCircles] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null,
    3: null
  });
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleSelectCircle = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setUserCircles(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct2 = () => {
    const isCompleted = Object.values(userCircles).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct2Submitted(true);
    let correct = 0;
    circleQuestions.forEach(q => {
      if (userCircles[q.id] === q.correctKey) {
        correct++;
      }
    });

    if (correct === 3) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct2 = () => {
    sound.playClick();
    setUserCircles({ 1: null, 2: null, 3: null });
    setAct2Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 72)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1 · Đường Đến Hiệu Sách (\'Bookshop) 📚',
      lines: [
        'How can I get to the \'bookshop?',
        'Go straight and turn left!',
        'Turn left at the street!',
        'There is the \'bookshop!',
        'There is the \'bookshop!'
      ],
      meaningVi: 'Làm thế nào để tớ đến được hiệu sách? Hãy đi thẳng rồi rẽ trái! Rẽ trái ngay ở góc đường! Hiệu sách ở đằng kia rồi!'
    },
    {
      title: 'Khổ 2 · Đường Đến Khu Cắm Trại (\'Campsite) ⛺',
      lines: [
        'How can I get to the \'campsite?',
        'Go straight and turn right!',
        'Turn right at the bakery!',
        'There is the \'campsite!',
        'There is the \'campsite!'
      ],
      meaningVi: 'Làm thế nào để tớ đến được bãi cắm trại? Hãy đi thẳng rồi rẽ phải! Rẽ phải ở chỗ tiệm bánh! Bãi cắm trại ở đằng kia rồi!'
    }
  ];

  const [activeChantStanza, setActiveChantStanza] = useState<number>(0);
  const [chantSpeed, setChantSpeed] = useState<number>(1.0);

  // =========================================================================
  // ACTIVITY 4: READ AND TICK TRUE / FALSE (PAGE 51 SGK)
  // =========================================================================
  const readingPassage =
    'My name is Nam. I live in Da Nang city. On Sunday morning, my sister and I go around the city. We start from our house on Green Street. First, we go straight and turn left to go to the bookshop. We buy some storybooks. Next, we turn right and walk to the bakery. We buy delicious cakes. Then, we turn round and go to the cinema on Red Street to watch a cartoon. The city is big, but it is easy to find the way with the traffic signs. We love our city!';

  interface TrueFalseQuiz {
    id: number;
    statement: string;
    statementVi: string;
    correctAnswer: boolean; // true = True, false = False
    evidence: string;
  }

  const tfQuestions: TrueFalseQuiz[] = [
    {
      id: 1,
      statement: '1. Nam lives in Da Nang city.',
      statementVi: 'Nam sống ở thành phố Đà Nẵng.',
      correctAnswer: true,
      evidence: 'Đoạn đầu: "My name is Nam. I live in Da Nang city."'
    },
    {
      id: 2,
      statement: '2. First, they go straight and turn left to go to the bakery.',
      statementVi: 'Đầu tiên, họ đi thẳng rồi rẽ trái để tới tiệm bánh.',
      correctAnswer: false,
      evidence: 'Trong bài: "First, we go straight and turn left to go to the bookshop" (tới hiệu sách chứ không phải tiệm bánh).'
    },
    {
      id: 3,
      statement: '3. They turn right and walk to the bakery.',
      statementVi: 'Họ rẽ phải và đi bộ tới tiệm bánh mì.',
      correctAnswer: true,
      evidence: 'Trong bài: "Next, we turn right and walk to the bakery. We buy delicious cakes."'
    },
    {
      id: 4,
      statement: '4. The cinema is on Red Street.',
      statementVi: 'Rạp chiếu phim nằm trên đường Đỏ (Red Street).',
      correctAnswer: true,
      evidence: 'Trong bài: "...go to the cinema on Red Street to watch a cartoon."'
    },
    {
      id: 5,
      statement: '5. It is difficult to find the way in the city.',
      statementVi: 'Rất khó để tìm đường trong thành phố.',
      correctAnswer: false,
      evidence: 'Trong bài: "The city is big, but it is easy to find the way with the traffic signs" (Dễ tìm đường chứ không khó).'
    }
  ];

  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectTF = (id: number, answer: boolean) => {
    sound.playClick();
    setTfAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(tfAnswers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    tfQuestions.forEach(q => {
      if (tfAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    if (correct === 5) {
      sound.playComplete();
      onAddStar(6);
      confetti({ particleCount: 85, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setTfAnswers({ 1: null, 2: null, 3: null, 4: null, 5: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE (PAGE 51 SGK)
  // =========================================================================
  const sampleWriting =
    'Hello! My name is Linh. I live in a quiet street in Hanoi. From my house to the bookshop, you go straight and turn left. The bookshop is next to the bakery. To get to the supermarket, you turn right and walk across the street. Look at the traffic light: when it is red, please stop! When it is green, you can go. I love exploring my city safely!';

  const [writingContent, setWritingContent] = useState<string>('');
  const [writingCopied, setWritingCopied] = useState<boolean>(false);

  const wordBankItems = [
    'go straight',
    'turn left',
    'turn right',
    'turn round',
    'bookshop',
    'bakery',
    'supermarket',
    'cinema',
    'traffic light',
    'stop',
    'go'
  ];

  const handleInsertWord = (word: string) => {
    sound.playClick();
    setWritingContent(prev => (prev ? `${prev} ${word}` : word));
  };

  const handleAutoFillWriting = () => {
    sound.playClick();
    setWritingContent(sampleWriting);
  };

  const handleCopyWriting = () => {
    if (!writingContent) return;
    sound.playSuccess();
    navigator.clipboard.writeText(writingContent);
    setWritingCopied(true);
    setTimeout(() => setWritingCopied(false), 2000);
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT - "MY CITY MAP & NAVIGATOR"
  // =========================================================================
  type LocationId = 'home' | 'bookshop' | 'bakery' | 'cinema' | 'supermarket' | 'campsite';

  interface CityLocation {
    id: LocationId;
    nameEn: string;
    nameVi: string;
    icon: string;
    directionFromHome: string;
    directionVi: string;
  }

  const cityLocations: CityLocation[] = [
    {
      id: 'bookshop',
      nameEn: 'The Bookshop',
      nameVi: 'Hiệu sách',
      icon: '📚',
      directionFromHome: 'Go straight and turn left at Blue Street.',
      directionVi: 'Đi thẳng rồi rẽ trái tại phố Xanh.'
    },
    {
      id: 'bakery',
      nameEn: 'The Bakery',
      nameVi: 'Tiệm bánh mì',
      icon: '🥐',
      directionFromHome: 'Go straight and turn right at Yellow Street.',
      directionVi: 'Đi thẳng rồi rẽ phải tại phố Vàng.'
    },
    {
      id: 'cinema',
      nameEn: 'The Cinema',
      nameVi: 'Rạp chiếu phim',
      icon: '🎬',
      directionFromHome: 'Turn left, go straight and turn right.',
      directionVi: 'Rẽ trái, đi thẳng rồi rẽ phải.'
    },
    {
      id: 'supermarket',
      nameEn: 'The Supermarket',
      nameVi: 'Siêu thị lớn',
      icon: '🛒',
      directionFromHome: 'Go straight across the traffic light.',
      directionVi: 'Đi thẳng qua đèn giao thông xanh.'
    },
    {
      id: 'campsite',
      nameEn: 'The Campsite',
      nameVi: 'Khu cắm trại',
      icon: '⛺',
      directionFromHome: 'Go straight, turn right and turn round.',
      directionVi: 'Đi thẳng, rẽ phải rồi quay ngược lại.'
    }
  ];

  const [selectedDestination, setSelectedDestination] = useState<CityLocation>(cityLocations[0]);
  const [trafficSignal, setTrafficSignal] = useState<'red' | 'green'>('green');

  return (
    <div className="space-y-8">
      {/* Top Navigation Tabs */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-xs uppercase tracking-wider">
                Unit 17 · Lesson 3 (Trang 50 - 51)
              </span>
              <span className="text-xs text-slate-500 font-medium">Trọng âm từ & Đọc hiểu chỉ đường</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
              Phonics · Let’s Chant · Read & Write · City Navigator 🏙️
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-3 py-1.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-all flex items-center gap-1.5"
              >
                <span>⬅️ Tiết 1</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="px-3 py-1.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-sm font-semibold transition-all flex items-center gap-1.5"
              >
                <span>⬅️ Tiết 2</span>
              </button>
            )}
          </div>
        </div>

        {/* Lesson Sections Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100">
          {[
            { id: 1, label: '1. Phonics', icon: '🗣️' },
            { id: 2, label: '2. Listen & Circle', icon: '🎧' },
            { id: 3, label: '3. Let’s Chant', icon: '🎶' },
            { id: 4, label: '4. Read & Tick', icon: '📖' },
            { id: 5, label: '5. Let’s Write', icon: '✍️' },
            { id: 6, label: '6. City Map Project', icon: '🗺️' }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(sec.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeSection === sec.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 scale-102'
                  : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span>{sec.icon}</span>
              <span className="truncate">{sec.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LISTEN AND REPEAT (TRACK 70) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Hoạt động 1 · SGK Trang 50 (Track 70)
              </span>
              <h3 className="text-2xl font-extrabold mt-2">Listen and repeat · Trọng âm của danh từ ghép</h3>
              <p className="text-blue-100 text-sm mt-1 max-w-2xl">
                Quy tắc vàng: Với các danh từ ghép hai âm tiết như <strong>\'bookshop</strong> (book + shop) và <strong>\'campsite</strong> (camp + site),
                trọng âm luôn rơi vào <strong>âm tiết đầu tiên</strong>! Hãy nói to và nhấn giọng rõ ở âm đầu nhé!
              </p>
            </div>
            <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
              🗣️
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phonicsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-100 hover:border-blue-400 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-blue-50 rounded-2xl">{item.icon}</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-blue-800">
                          <span className="underline decoration-blue-500 decoration-4 text-blue-600">
                            '{item.stressedSyllable}
                          </span>
                          <span className="text-slate-600 font-bold">{item.unstressedSyllable}</span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{item.ipa}</span>
                      </div>
                      <span className="text-xs text-blue-600 font-semibold">Đọc: {item.reading}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.plainWord, speechRate);
                      onAddStar(1);
                    }}
                    className="p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-1.5 font-bold text-xs"
                    title="Nghe phát âm từ"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Nghe từ</span>
                  </button>
                </div>

                {/* Example sentence with stress mark */}
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/60 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-slate-800 font-bold text-base leading-snug">
                      "{item.sentenceEn}"
                    </p>
                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(item.sentenceEn.replace("'", ''), speechRate);
                        onAddStar(1);
                      }}
                      className="p-2 rounded-lg bg-white text-blue-600 hover:bg-blue-100 shadow-xs shrink-0"
                      title="Nghe cả câu"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">
                    👉 {item.sentenceVi}
                  </p>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Phonics Rule Card */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-900 flex items-start gap-4 shadow-xs">
            <span className="text-3xl">💡</span>
            <div className="space-y-1">
              <h4 className="font-bold text-base text-amber-900">Mẹo Nhớ Trọng Âm Của Bé:</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Khi gặp từ ghép chỉ địa điểm (như <strong>'bookshop</strong>, <strong>'campsite</strong>), bé chỉ cần nhớ:
                <em> "Nhấn mạnh từ thứ nhất, đọc nhẹ từ thứ hai"</em>: <strong>'BOOK-shop</strong>, <strong>'CAMP-site</strong>!
                Giọng bé nói to và vang ở âm tiết có dấu nháy nhé!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN AND CIRCLE (TRACK 71) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 2 · SGK Trang 50 (Track 71)
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Listen and circle · Lắng nghe và khoanh tròn đáp án đúng</h3>
            <p className="text-blue-100 text-sm mt-1">
              Bé hãy bấm loa nghe từng câu thoại, chú ý trọng âm của từ chỉ địa điểm rồi khoanh tròn vào đáp án chính xác nhé!
            </p>
          </div>

          <div className="space-y-5">
            {circleQuestions.map((q) => {
              const selected = userCircles[q.id];
              const isCorrect = selected === q.correctKey;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        {q.id}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base">{q.questionTitle}</h4>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.audioScript, speechRate);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe băng mẫu (Track 71)</span>
                    </button>
                  </div>

                  {/* Sentence with blank */}
                  <div className="p-4 bg-slate-50 rounded-xl text-lg font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                    <span>{q.sentenceStart}</span>
                    <span className="px-4 py-1 border-b-2 border-dashed border-blue-600 text-blue-700 font-extrabold bg-blue-50 rounded">
                      {selected ? q.options.find(o => o.key === selected)?.text : '.......'}
                    </span>
                    <span>{q.sentenceEnd}</span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt.key;
                      let btnStyle = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 bg-white';

                      if (isOptionSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-400';
                      }

                      if (act2Submitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400';
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(q.id, opt.key)}
                          className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between text-left ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs uppercase text-slate-700">
                              {opt.key}
                            </span>
                            <span className="text-xl">{opt.icon}</span>
                            <span className="font-bold text-sm text-slate-800">{opt.text}</span>
                          </div>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playClick();
                              speakWord(opt.text, speechRate);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600 rounded"
                          >
                            <Volume2 className="w-4 h-4" />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when submitted */}
                  {act2Submitted && (
                    <div
                      className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border border-rose-200 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold">{isCorrect ? 'Tuyệt vời!' : 'Chưa chính xác!'} </span>
                        <span>{q.explanation}</span>
                        <div className="mt-1 font-semibold text-slate-700 italic">
                          Lời thoại băng: "{q.audioScript}"
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetAct2}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
            <button
              onClick={handleCheckAct2}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra kết quả</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S CHANT (TRACK 72) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Hoạt động 3 · SGK Trang 50 (Track 72)
              </span>
              <h3 className="text-2xl font-extrabold mt-2">Let’s Chant · Bài vè nhịp điệu chỉ đường vui nhộn</h3>
              <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
                Cùng vỗ tay theo nhịp phách, ngân vang giai điệu vui tươi và luyện trọng âm từ <strong>\'bookshop</strong> và <strong>\'campsite</strong> nào!
              </p>
            </div>
            <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
              🎶
            </div>
          </div>

          {/* Chant Player Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playSuccess();
                  const fullText = chantStanzas[activeChantStanza].lines.join('. ');
                  speakWord(fullText, chantSpeed);
                  onAddStar(2);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Music className="w-4 h-4" />
                <span>Đọc vè cả khổ ({chantSpeed}x)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  confetti({ particleCount: 30, spread: 50 });
                  onAddStar(1);
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>👏 Vỗ tay theo nhịp</span>
              </button>
            </div>

            {/* Speed Switcher */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Tốc độ:</span>
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => {
                    sound.playClick();
                    setChantSpeed(speed);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    chantSpeed === speed
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Stanza Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chantStanzas.map((stanza, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveChantStanza(idx);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  activeChantStanza === idx
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-300'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <span className="font-bold text-sm text-purple-900 block">{stanza.title}</span>
                <span className="text-xs text-slate-500 mt-1 block">Bấm để chọn và tập đọc khổ thơ này</span>
              </button>
            ))}
          </div>

          {/* Active Stanza Display with interactive lines */}
          <div className="bg-gradient-to-br from-indigo-50/60 via-purple-50/60 to-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <h4 className="font-extrabold text-indigo-900 text-lg flex items-center gap-2">
                <span>🎤</span>
                <span>{chantStanzas[activeChantStanza].title}</span>
              </h4>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                Chạm vào từng câu để nghe và tập đọc
              </span>
            </div>

            <div className="space-y-3">
              {chantStanzas[activeChantStanza].lines.map((line, lIdx) => (
                <div
                  key={lIdx}
                  onClick={() => {
                    sound.playClick();
                    speakWord(line.replace("'", ''), chantSpeed);
                    onAddStar(1);
                  }}
                  className="p-3.5 bg-white rounded-2xl border border-indigo-100 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {lIdx + 1}
                    </span>
                    <span className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {line}
                    </span>
                  </div>

                  <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                    <Volume2 className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-indigo-100 text-xs text-slate-600 leading-relaxed italic">
              <strong>💡 Dịch nghĩa tiếng Việt:</strong> {chantStanzas[activeChantStanza].meaningVi}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: READ AND TICK TRUE / FALSE (PAGE 51 SGK) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 4 · SGK Trang 51
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Read and tick True or False · Đọc đoạn văn và chọn Đúng / Sai</h3>
            <p className="text-blue-100 text-sm mt-1">
              Đọc đoạn nhật ký khám phá thành phố của bạn Nam, sau đó bấm chọn <strong>True (Đúng)</strong> hoặc <strong>False (Sai)</strong> cho mỗi câu nhé!
            </p>
          </div>

          {/* Reading Passage Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏙️</span>
                <h4 className="font-bold text-slate-800 text-base">A Sunday in the City (Một ngày Chủ Nhật trong thành phố)</h4>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(readingPassage, speechRate);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc toàn bài</span>
              </button>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-medium bg-blue-50/40 p-4 rounded-xl border border-blue-100">
              {readingPassage}
            </p>

            <div className="text-xs text-slate-500 italic">
              * Gợi ý từ mới: <strong>start from</strong> (bắt đầu từ), <strong>storybooks</strong> (truyện tranh), <strong>traffic signs</strong> (biển báo giao thông).
            </div>
          </div>

          {/* True / False Questions */}
          <div className="space-y-3">
            {tfQuestions.map((q) => {
              const selected = tfAnswers[q.id];
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-800 text-base">{q.statement}</p>
                      <p className="text-xs text-slate-500 italic mt-0.5">{q.statementVi}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* True Button */}
                      <button
                        onClick={() => handleSelectTF(q.id, true)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                          selected === true
                            ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>True (Đúng)</span>
                      </button>

                      {/* False Button */}
                      <button
                        onClick={() => handleSelectTF(q.id, false)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                          selected === false
                            ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300'
                            : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                        }`}
                      >
                        <XSquare className="w-4 h-4" />
                        <span>False (Sai)</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback explanation */}
                  {act4Submitted && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border border-rose-200 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold">
                          Đáp án đúng: {q.correctAnswer ? 'True (Đúng)' : 'False (Sai)'}.{' '}
                        </span>
                        <span>Chứng cứ trong bài: {q.evidence}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetAct4}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
            <button
              onClick={handleCheckAct4}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Nộp bài & Kiểm tra</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LET'S WRITE (PAGE 51 SGK) */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-700 via-teal-700 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 5 · SGK Trang 51
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Let’s Write · Viết đoạn văn chỉ đường trong khu phố của em</h3>
            <p className="text-blue-100 text-sm mt-1">
              Hãy viết một đoạn văn ngắn hướng dẫn bạn đến các địa điểm yêu thích (hiệu sách, tiệm bánh, siêu thị) xuất phát từ ngôi nhà của em nhé!
            </p>
          </div>

          {/* Interactive Word Bank */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ngân Hàng Cụm Từ Gợi Ý (Chạm để chèn nhanh vào bài):
              </span>
              <button
                onClick={handleAutoFillWriting}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                + Điền mẫu bài viết chuẩn SGK
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {wordBankItems.map((word, wIdx) => (
                <button
                  key={wIdx}
                  onClick={() => handleInsertWord(word)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-all border border-blue-200/60 shadow-xs flex items-center gap-1"
                >
                  <span>+</span>
                  <span>{word}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Writing Textarea */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-blue-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">Góc Viết Của Bé:</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">
                  {writingContent.trim().split(/\s+/).filter(Boolean).length} từ
                </span>
                {writingContent && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(writingContent, speechRate);
                    }}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                    title="Nghe bài viết của mình"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleCopyWriting}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{writingCopied ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={writingContent}
              onChange={(e) => setWritingContent(e.target.value)}
              placeholder="Ví dụ: Hello! My name is Nam. From my house, you go straight and turn left to the bookshop..."
              rows={6}
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base leading-relaxed text-slate-800 placeholder:text-slate-400 font-sans resize-y"
            />

            {/* Model Sample Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">Bài Viết Mẫu Chuẩn Cho Bé Tham Khảo:</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(sampleWriting, speechRate);
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe bài mẫu</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{sampleWriting}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: PROJECT - "MY CITY MAP & NAVIGATOR" */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 6 · Project (SGK Trang 51)
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Project · Bản Đồ Thành Phố & Hoa Tiêu Nhí (City Navigator)</h3>
            <p className="text-blue-100 text-sm mt-1">
              Bé hãy chọn một địa điểm muốn đến trên bản đồ thành phố, lắng nghe hướng dẫn chỉ đường bằng tiếng Anh và kiểm tra tín hiệu đèn giao thông nhé!
            </p>
          </div>

          {/* Interactive City Grid */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
            {/* Traffic Signal Switcher */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center bg-slate-900 px-3 py-2 rounded-2xl gap-2 shadow-inner">
                  <div
                    className={`w-6 h-6 rounded-full transition-all ${
                      trafficSignal === 'red' ? 'bg-rose-500 shadow-md shadow-rose-500/80 scale-110' : 'bg-rose-950'
                    }`}
                  />
                  <div
                    className={`w-6 h-6 rounded-full transition-all ${
                      trafficSignal === 'green' ? 'bg-emerald-500 shadow-md shadow-emerald-500/80 scale-110' : 'bg-emerald-950'
                    }`}
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase">Đèn Giao Thông Thành Phố:</span>
                  <h4 className="font-black text-base text-slate-800">
                    {trafficSignal === 'red' ? 'Đèn Đỏ: It says "stop" 🛑' : 'Đèn Xanh: It says "go" 🟢'}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setTrafficSignal('red');
                    speakWord("The light is red. It says stop!", speechRate);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    trafficSignal === 'red'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  🛑 Đèn đỏ (Stop)
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTrafficSignal('green');
                    speakWord("The light is green. It says go!", speechRate);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    trafficSignal === 'green'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  🟢 Đèn xanh (Go)
                </button>
              </div>
            </div>

            {/* City Locations Selector */}
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span>Chọn Địa Điểm Muốn Đến:</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {cityLocations.map((loc) => {
                  const isSelected = selectedDestination.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedDestination(loc);
                        onAddStar(1);
                        speakWord(`How can I get to ${loc.nameEn}? ${loc.directionFromHome}`, speechRate);
                      }}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-300 scale-102'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <span className="text-3xl block mb-1">{loc.icon}</span>
                      <span className="font-bold text-sm text-slate-800 block truncate">{loc.nameEn}</span>
                      <span className="text-xs text-slate-500 block truncate">{loc.nameVi}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Destination Navigation Guidance */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 rounded-2xl p-5 border-2 border-blue-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 bg-white rounded-2xl shadow-xs">{selectedDestination.icon}</span>
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Hoa Tiêu Nhí Chỉ Đường Đến {selectedDestination.nameVi}:
                    </span>
                    <h4 className="text-xl font-black text-slate-900">{selectedDestination.nameEn}</h4>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(
                      `Excuse me. How can I get to ${selectedDestination.nameEn}? ${selectedDestination.directionFromHome}`,
                      speechRate
                    );
                    onAddStar(1);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe chỉ đường đầy đủ</span>
                </button>
              </div>

              {/* Step by step dialogue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-blue-100 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">Câu hỏi của bạn:</span>
                  <p className="text-base font-bold text-slate-800">
                    "Excuse me. How can I get to {selectedDestination.nameEn}?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    👉 Xin lỗi, làm thế nào để tôi đến được {selectedDestination.nameVi}?
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-blue-100 space-y-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase">Lời hướng dẫn chỉ đường:</span>
                  <p className="text-base font-bold text-emerald-900">
                    "{selectedDestination.directionFromHome}"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    👉 {selectedDestination.directionVi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
