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
  Smile,
  Music,
  PenTool,
  Copy,
  Layers,
  Palette
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit11Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit11Lesson3Studio: React.FC<Unit11Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 8) - PHONICS /ɪ/ vs /iː/
  // =========================================================================
  const phonicsPairs = [
    {
      id: 'i_short',
      letter: 'i',
      soundIpa: '/ɪ/',
      soundReading: 'âm i ngắn (đọc nhanh, dứt khoát, miệng thả lỏng)',
      word: 'big',
      wordIpa: '/bɪɡ/',
      wordReading: 'bích-g',
      wordMeaning: 'to lớn',
      sentence: 'They live in a big village.',
      sentenceIpa: '/ðeɪ lɪv ɪn ə bɪɡ ˈvɪlɪdʒ/',
      sentenceReading: 'Đêi lív in ơ bích-g vin-li-dzh.',
      sentenceMeaning: 'Họ sống ở một ngôi làng lớn.',
      icon: '🐘',
      badgeColor: 'bg-emerald-600',
      boxColor: 'border-emerald-300 bg-emerald-50/50'
    },
    {
      id: 'ee_long',
      letter: 'ee',
      soundIpa: '/iː/',
      soundReading: 'âm i dài (kéo dài, khóe miệng căng sang 2 bên như đang cười mỉm)',
      word: 'street',
      wordIpa: '/striːt/',
      wordReading: 's-trít (ngân dài âm i)',
      wordMeaning: 'con đường, phố',
      sentence: 'They live in Green Street.',
      sentenceIpa: '/ðeɪ lɪv ɪn ɡriːn striːt/',
      sentenceReading: 'Đêi lív in Grin s-trít.',
      sentenceMeaning: 'Họ sống ở phố Green.',
      icon: '🛣️',
      badgeColor: 'bg-indigo-600',
      boxColor: 'border-indigo-300 bg-indigo-50/50'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 9)
  // =========================================================================
  interface CircleQuizItem {
    id: number;
    title: string;
    audioScript: string;
    ipa: string;
    reading: string;
    options: {
      key: 'a' | 'b' | 'c';
      text: string;
      ipa: string;
    }[];
    correctAnswer: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [circleQuizzes, setCircleQuizzes] = useState<CircleQuizItem[]>([
    {
      id: 1,
      title: 'Câu 1: Listen and circle',
      audioScript: 'I am in a big town.',
      ipa: '/aɪ æm ɪn ə bɪɡ taʊn/',
      reading: 'Ai æm in ơ bích-g thao-n.',
      options: [
        { key: 'a', text: 'I am in a big town.', ipa: '/aɪ æm ɪn ə bɪɡ taʊn/' },
        { key: 'b', text: 'I am in a green town.', ipa: '/aɪ æm ɪn ə ɡriːn taʊn/' },
        { key: 'c', text: 'I am at Green Hotel.', ipa: '/aɪ æm æt ɡriːn həʊˈtel/' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Trong bài nghe: "I am in a big town" với âm /ɪ/ ngắn trong từ "big" -> Đáp án đúng là a.'
    },
    {
      id: 2,
      title: 'Câu 2: Listen and circle',
      audioScript: 'He is at Green Hotel.',
      ipa: '/hiː ɪz æt ɡriːn həʊˈtel/',
      reading: 'Hi iz ét Grin Hâu-ten.',
      options: [
        { key: 'a', text: 'He is in a big town.', ipa: '/hiː ɪz ɪn ə bɪɡ taʊn/' },
        { key: 'b', text: 'He is at Green Hotel.', ipa: '/hiː ɪz æt ɡriːn həʊˈtel/' },
        { key: 'c', text: 'He is in a big hotel.', ipa: '/hiː ɪz ɪn ə bɪɡ həʊˈtel/' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe phát âm rõ: "He is at Green Hotel" với âm /iː/ dài trong từ "Green" -> Đáp án đúng là b.'
    }
  ]);
  const [circleSubmitted, setCircleSubmitted] = useState<boolean>(false);

  const handleSelectCircle = (id: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setCircleQuizzes(prev => prev.map(q => (q.id === id ? { ...q, userChoice: key } : q)));
  };

  const handleCheckCircle = () => {
    const allDone = circleQuizzes.every(q => q.userChoice !== null);
    if (!allDone) {
      alert('Em hãy khoanh tròn đáp án cho cả 2 câu hỏi trước nhé!');
      return;
    }
    const correctCount = circleQuizzes.filter(q => q.userChoice === q.correctAnswer).length;
    setCircleSubmitted(true);
    if (correctCount === 2) {
      sound.playVictory();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 10) - "LITTLE BEE & LITTLE FISH"
  // =========================================================================
  const chantVerses = [
    {
      character: '🐝 Chú Ong Nhỏ (Little Bee)',
      lines: [
        { en: 'Little Bee, Little Bee', ipa: '/ˈlɪtl biː, ˈlɪtl biː/', reading: 'Lít-tồ Bi, Lít-tồ Bi' },
        { en: 'Where do you live?', ipa: '/weər duː juː lɪv/', reading: 'Que-ơ đu diu lív?' },
        { en: 'I live in Green Street.', ipa: '/aɪ lɪv ɪn ɡriːn striːt/', reading: 'Ai lív in Grin s-trít.' },
        { en: 'Green Street, Green Street.', ipa: '/ɡriːn striːt, ɡriːn striːt/', reading: 'Grin s-trít, Grin s-trít.' },
        { en: 'Here you are, Little Bee.', ipa: '/hɪər juː ɑː, ˈlɪtl biː/', reading: 'Hi-ơ diu a, Lít-tồ Bi.' }
      ]
    },
    {
      character: '🐟 Chú Cá Nhỏ (Little Fish)',
      lines: [
        { en: 'Little Fish, Little Fish', ipa: '/ˈlɪtl fɪʃ, ˈlɪtl fɪʃ/', reading: 'Lít-tồ Phít-sh, Lít-tồ Phít-sh' },
        { en: 'Where do you live?', ipa: '/weər duː juː lɪv/', reading: 'Que-ơ đu diu lív?' },
        { en: 'I live in a big village.', ipa: '/aɪ lɪv ɪn ə bɪɡ ˈvɪlɪdʒ/', reading: 'Ai lív in ơ bích-g vin-li-dzh.' },
        { en: 'A big village, a big village.', ipa: '/ə bɪɡ ˈvɪlɪdʒ, ə bɪɡ ˈvɪlɪdʒ/', reading: 'Ơ bích-g vin-li-dzh, ơ bích-g vin-li-dzh.' },
        { en: 'Here you are, Little Fish.', ipa: '/hɪər juː ɑː, ˈlɪtl fɪʃ/', reading: 'Hi-ơ diu a, Lít-tồ Phít-sh.' }
      ]
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND CIRCLE (4 READING QUESTIONS)
  // =========================================================================
  const readingPassage = `I live in a small flat with my parents. It is in Le Lai Street. The street is very busy. At the weekend, I visit my grandparents. They live in a big house with a beautiful garden in a village. The village is quiet and beautiful.`;

  interface ReadingQuestion {
    id: number;
    q: string;
    options: { key: 'a' | 'b'; text: string }[];
    correct: 'a' | 'b';
    userChoice: 'a' | 'b' | null;
    explanation: string;
  }

  const [readingQuestions, setReadingQuestions] = useState<ReadingQuestion[]>([
    {
      id: 1,
      q: '1. I live in a _______ flat.',
      options: [
        { key: 'a', text: 'big (lớn)' },
        { key: 'b', text: 'small (nhỏ)' }
      ],
      correct: 'b',
      userChoice: null,
      explanation: 'Trong bài viết: "I live in a small flat with my parents" -> Đáp án là b (small).'
    },
    {
      id: 2,
      q: '2. Le Lai Street is very _______.',
      options: [
        { key: 'a', text: 'busy (nhộn nhịp)' },
        { key: 'b', text: 'quiet (yên tĩnh)' }
      ],
      correct: 'a',
      userChoice: null,
      explanation: 'Trong bài viết: "The street is very busy" -> Đáp án là a (busy).'
    },
    {
      id: 3,
      q: '3. My grandparents live in a _______.',
      options: [
        { key: 'a', text: 'city (thành phố)' },
        { key: 'b', text: 'village (ngôi làng)' }
      ],
      correct: 'b',
      userChoice: null,
      explanation: 'Trong bài viết: "They live in a big house... in a village" -> Đáp án là b (village).'
    },
    {
      id: 4,
      q: '4. The village is _______.',
      options: [
        { key: 'a', text: 'quiet and beautiful (yên bình và tươi đẹp)' },
        { key: 'b', text: 'small and busy (nhỏ và bận rộn)' }
      ],
      correct: 'a',
      userChoice: null,
      explanation: 'Câu cuối bài viết nêu rõ: "The village is quiet and beautiful" -> Đáp án là a.'
    }
  ]);
  const [readingSubmitted, setReadingSubmitted] = useState<boolean>(false);

  const handleSelectReading = (id: number, key: 'a' | 'b') => {
    sound.playClick();
    setReadingQuestions(prev => prev.map(q => (q.id === id ? { ...q, userChoice: key } : q)));
  };

  const handleCheckReading = () => {
    const allDone = readingQuestions.every(q => q.userChoice !== null);
    if (!allDone) {
      alert('Em hãy chọn câu trả lời cho cả 4 câu đọc hiểu nhé!');
      return;
    }
    const correctCount = readingQuestions.filter(q => q.userChoice === q.correct).length;
    setReadingSubmitted(true);
    if (correctCount === 4) {
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      sound.playCorrect();
      onAddStar(correctCount);
    }
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const [writeHomeType, setWriteHomeType] = useState<string>('a small flat');
  const [writeWithWhom, setWriteWithWhom] = useState<string>('my parents');
  const [writeStreet, setWriteStreet] = useState<string>('Tran Hung Dao Street');
  const [writeStreetDesc, setWriteStreetDesc] = useState<string>('very busy and noisy');
  const [writeNotMany, setWriteNotMany] = useState<string>('trees');
  const [writeHasWhat, setWriteHasWhat] = useState<string>('a big supermarket');
  const [writeLoveWhat, setWriteLoveWhat] = useState<string>('my home');
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const generatedParagraph = `I live in ${writeHomeType} with ${writeWithWhom}. It is in ${writeStreet}. It is ${writeStreetDesc}. There are not many ${writeNotMany} there, but there is ${writeHasWhat}. I love ${writeLoveWhat}.`;

  const handleCopyParagraph = () => {
    navigator.clipboard.writeText(generatedParagraph);
    sound.playVictory();
    setCopiedText(true);
    onAddStar(2);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Ngữ Âm Phonics &amp; Đọc Viết Unit 11 · Tiết 3
          </span>
          <span className="text-xs text-indigo-100 font-bold">Trang 10 - 11 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Phân Biệt Ngữ Âm /ɪ/ (big) và /iː/ (street) &amp; Xưởng Viết Về Nơi Ở
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              1. Âm /ɪ/ ngắn (chữ &quot;i&quot; trong big)
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Phát âm nhanh, dứt khoát, miệng mở hờ thoải mái: <em>bɪɡ</em> (bích-g).
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              2. Âm /iː/ dài (chữ &quot;ee&quot; trong street, green, bee)
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Kéo dài âm, khóe miệng căng sang 2 bên như đang mỉm cười: <em>striːt</em> (s-trít).
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Phonics /ɪ/ & /iː/', icon: '🗣️' },
          { id: 2, label: '2. Listen & circle', icon: '⭕' },
          { id: 3, label: "3. Let's chant", icon: '🐝' },
          { id: 4, label: '4. Read & circle', icon: '📖' },
          { id: 5, label: "5. Let's write", icon: '✍️' },
          { id: 6, label: '6. Project: My home', icon: '🎨' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-indigo-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LISTEN AND REPEAT (TRACK 8) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 1 · Trang 10
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 8 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and repeat 🗣️ (Lắng nghe và nhắc lại chuẩn ngữ âm)
              </h3>
            </div>
            <button
              onClick={() => {
                speakWord('i, big. They live in a big village. ee, street. They live in Green Street.', speechRate);
              }}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-indigo-700" /> Nghe cả 2 âm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border-2 ${item.boxColor} space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-indigo-900">{item.letter}</span>
                    <span className="text-sm font-mono font-black text-rose-600 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {item.soundIpa}
                    </span>
                  </div>
                  <span className="text-3xl">{item.icon}</span>
                </div>

                <p className="text-xs text-slate-600 font-medium">{item.soundReading}</p>

                {/* Word */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900">{item.word}</span>
                    <button
                      onClick={() => speakWord(item.word, speechRate)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-mono font-bold text-emerald-700">🗣️ {item.wordIpa}</p>
                  <p className="text-xs text-indigo-700 font-semibold">📖 Gợi ý đọc: {item.wordReading}</p>
                  <p className="text-xs text-slate-500">Nghĩa: {item.wordMeaning}</p>
                </div>

                {/* Sentence */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      &quot;{item.sentence}&quot;
                    </span>
                    <button
                      onClick={() => speakWord(item.sentence, speechRate)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">
                    🗣️ {item.sentenceIpa}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 {item.sentenceReading}
                  </p>
                  <p className="text-xs text-slate-500 italic">{item.sentenceMeaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN AND CIRCLE (TRACK 9) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 2 · Trang 10
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 9 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and circle ⭕ (Lắng nghe và khoanh tròn câu đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckCircle}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra khoanh
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setCircleQuizzes(prev => prev.map(q => ({ ...q, userChoice: null })));
                  setCircleSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {circleQuizzes.map((quiz, idx) => {
              const isCorrect = quiz.userChoice === quiz.correctAnswer;
              return (
                <div
                  key={quiz.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    circleSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {quiz.title}
                    </span>
                    <button
                      onClick={() => speakWord(quiz.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-700" /> Nghe audio Track 9
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {quiz.options.map(opt => {
                      const isSelected = quiz.userChoice === opt.key;
                      const isAnswer = quiz.correctAnswer === opt.key;

                      let style =
                        'border-slate-200 bg-white text-slate-800 hover:border-indigo-300';
                      if (isSelected && !circleSubmitted) {
                        style = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold';
                      }
                      if (circleSubmitted) {
                        if (isAnswer) {
                          style =
                            'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-400';
                        } else if (isSelected && !isAnswer) {
                          style = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(quiz.id, opt.key)}
                          className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition flex items-start gap-2 ${style}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-black">
                            {opt.key}
                          </span>
                          <div>
                            <p>{opt.text}</p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5">{opt.ipa}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {circleSubmitted && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                      <p className="font-bold text-slate-800">{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LET'S CHANT (TRACK 10) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 3 · Trang 10
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 10 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s chant: Little Bee &amp; Little Fish 🐝 🐟
              </h3>
            </div>
            <button
              onClick={() => {
                const chant =
                  'Little Bee, Little Bee. Where do you live? I live in Green Street. Green Street, Green Street. Here you are, Little Bee. Little Fish, Little Fish. Where do you live? I live in a big village. A big village, a big village. Here you are, Little Fish.';
                speakWord(chant, speechRate * 0.95);
                onAddStar(3);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Bật nhạc đọc vè nhịp điệu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chantVerses.map((verse, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <h4 className="font-black text-slate-900 text-base">{verse.character}</h4>
                <div className="space-y-2">
                  {verse.lines.map((line, lIdx) => (
                    <div key={lIdx} className="hover:text-indigo-600 transition">
                      <p className="font-extrabold text-sm md:text-base text-slate-900">
                        {line.en}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-700 font-semibold">
                        {line.ipa}
                      </p>
                      <p className="text-[11px] text-indigo-700 font-medium">({line.reading})</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. READ AND CIRCLE */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 4 · Trang 11
                </span>
                <span className="text-xs font-semibold text-slate-500">Đọc Hiểu Đoạn Văn</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and circle 📖 (Đọc đoạn văn và khoanh tròn đáp án)
              </h3>
            </div>
            <button
              onClick={handleCheckReading}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition"
            >
              <Check className="w-4 h-4" /> Kiểm tra đáp án
            </button>
          </div>

          {/* Passage Card */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 font-serif leading-relaxed text-slate-800 text-base md:text-lg relative">
            <p>&quot;{readingPassage}&quot;</p>
            <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-between font-sans">
              <button
                onClick={() => speakWord(readingPassage, speechRate)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe đọc cả đoạn văn
              </button>
              <span className="text-xs text-slate-500 italic">
                (Dịch: Tớ sống trong một căn hộ nhỏ cùng bố mẹ ở phố Lê Lợi. Con phố rất nhộn nhịp...)
              </span>
            </div>
          </div>

          {/* 4 Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readingQuestions.map(q => {
              const isCorrect = q.userChoice === q.correct;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2.5 ${
                    readingSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <p className="font-extrabold text-sm text-slate-900">{q.q}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map(opt => {
                      const isSel = q.userChoice === opt.key;
                      let btnStyle = 'border-slate-200 bg-white text-slate-700';
                      if (isSel && !readingSubmitted) {
                        btnStyle = 'border-indigo-600 bg-indigo-100 text-indigo-950 font-black';
                      }
                      if (readingSubmitted) {
                        if (opt.key === q.correct) {
                          btnStyle = 'border-emerald-500 bg-emerald-200 text-emerald-950 font-black';
                        } else if (isSel && opt.key !== q.correct) {
                          btnStyle = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectReading(q.id, opt.key)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition ${btnStyle}`}
                        >
                          <span className="font-black mr-1">{opt.key.toUpperCase()}.</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {readingSubmitted && (
                    <p className="text-xs text-slate-600 font-medium pt-1">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. LET'S WRITE */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 5 · Trang 11
                </span>
                <span className="text-xs font-semibold text-slate-500">Writing Studio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s write ✍️ (Viết đoạn văn ngắn về ngôi nhà của em)
              </h3>
            </div>
            <button
              onClick={handleCopyParagraph}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Copy className="w-4 h-4" />
              {copiedText ? 'Đã sao chép! ⭐️ +2 sao' : 'Sao chép đoạn văn'}
            </button>
          </div>

          {/* Form customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Nơi ở (I live in...):
              </label>
              <input
                type="text"
                value={writeHomeType}
                onChange={e => setWriteHomeType(e.target.value)}
                placeholder="a small flat / a house"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Sống cùng ai (with my...):
              </label>
              <input
                type="text"
                value={writeWithWhom}
                onChange={e => setWriteWithWhom(e.target.value)}
                placeholder="my parents / my family"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. Tên đường / phố (It is in...):
              </label>
              <input
                type="text"
                value={writeStreet}
                onChange={e => setWriteStreet(e.target.value)}
                placeholder="Tran Hung Dao Street"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. Đặc điểm đường phố (It is...):
              </label>
              <input
                type="text"
                value={writeStreetDesc}
                onChange={e => setWriteStreetDesc(e.target.value)}
                placeholder="very busy / quiet"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                5. Không có nhiều thứ gì:
              </label>
              <input
                type="text"
                value={writeNotMany}
                onChange={e => setWriteNotMany(e.target.value)}
                placeholder="trees / cars"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                6. Nhưng lại có (but there is...):
              </label>
              <input
                type="text"
                value={writeHasWhat}
                onChange={e => setWriteHasWhat(e.target.value)}
                placeholder="a big supermarket"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>
          </div>

          {/* Generated preview */}
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 font-serif text-slate-800 text-base leading-relaxed">
            <p>&quot;{generatedParagraph}&quot;</p>
            <div className="mt-4 pt-3 border-t border-indigo-200 flex items-center gap-3 font-sans">
              <button
                onClick={() => speakWord(generatedParagraph, speechRate)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe phát âm đoạn văn của em
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PROJECT: "MY BEAUTIFUL HOME" */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-pink-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 11
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Project: &quot;My beautiful home&quot; 🎨 (Dự án vẽ tranh &amp; thuyết trình)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Em hãy vẽ một bức tranh về ngôi nhà và con phố xinh xắn của mình, sau đó giơ tranh lên và tự tin giới thiệu với cả lớp bằng tiếng Anh nhé!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-pink-50 border-2 border-pink-200 max-w-lg mx-auto space-y-4">
            <Palette className="w-12 h-12 text-pink-600 mx-auto" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-pink-800 uppercase tracking-widest">
                Mẫu thuyết trình:
              </span>
              <h4 className="text-xl font-black text-pink-950">
                &quot;I live in Thang Long Street. It&apos;s a busy street with many shops.&quot;
              </h4>
              <p className="text-xs font-mono font-bold text-pink-800">
                🗣️ /aɪ lɪv ɪn tʰɑːŋ lɒŋ striːt. ɪts ə ˈbɪzi striːt wɪð ˈmeni ʃɒps/
              </p>
              <p className="text-xs text-indigo-700 font-semibold">
                📖 Ai lív in Thăng Long s-trít. Ít-s ơ bít-zi s-trít uýt me-ni shop-s.
              </p>
            </div>

            <button
              onClick={() => {
                speakWord('I live in Thang Long Street. It is a busy street with many shops.', speechRate);
                onAddStar(3);
              }}
              className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Luyện phát âm bài thuyết trình
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
