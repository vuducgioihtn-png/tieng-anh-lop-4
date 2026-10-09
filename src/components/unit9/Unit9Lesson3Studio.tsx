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
  Calendar,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Music,
  Edit3,
  Download,
  Share2,
  Printer
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit9Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit9Lesson3Studio: React.FC<Unit9Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: letter 'y' (/i/ vs /aɪ/)
  const phonicsPairs = [
    {
      ending: 'y',
      ipa: '/i/',
      name: 'Chữ "y" phát âm là /i/ ngắn',
      desc: 'Phát âm là âm /i/ ngắn, dứt khoát, thường nằm ở cuối các từ nhiều âm tiết.',
      reading: 'I (ngắn, nhẹ)',
      color: 'emerald',
      examples: [
        {
          word: 'February',
          vi: 'Tháng 2',
          ipa: '/ˈfeb.ru.ər.i/',
          sentence: 'Our sports day is in February.',
          sentenceVi: 'Ngày hội thể thao trường tớ vào Tháng 2.'
        },
        {
          word: 'January',
          vi: 'Tháng 1',
          ipa: '/ˈdʒæn.ju.ə.ri/',
          sentence: 'It is in January.',
          sentenceVi: 'Nó diễn ra vào Tháng 1.'
        },
        {
          word: 'sunny',
          vi: 'nắng rực rỡ',
          ipa: '/ˈsʌn.i/',
          sentence: 'It is sunny today.',
          sentenceVi: 'Hôm nay trời nắng đẹp.'
        }
      ]
    },
    {
      ending: 'y',
      ipa: '/aɪ/',
      name: 'Chữ "y" phát âm là /aɪ/ đôi',
      desc: 'Phát âm là nguyên âm đôi /aɪ/ (kết hợp âm a mở rộng rồi lướt sang i).',
      reading: 'AI (ngân dài)',
      color: 'rose',
      examples: [
        {
          word: 'July',
          vi: 'Tháng 7',
          ipa: '/dʒuˈlaɪ/',
          sentence: 'My birthday is in July.',
          sentenceVi: 'Sinh nhật của tớ vào Tháng 7.'
        },
        {
          word: 'cycling',
          vi: 'đi xe đạp',
          ipa: '/ˈsaɪ.klɪŋ/',
          sentence: 'I like cycling.',
          sentenceVi: 'Tớ thích đi xe đạp.'
        },
        {
          word: 'fly',
          vi: 'bay / thả diều',
          ipa: '/flaɪ/',
          sentence: 'Birds can fly.',
          sentenceVi: 'Những chú chim có thể bay.'
        }
      ]
    }
  ];

  // Activity 2: Listen and Circle State
  const [selectedCircleAnswers, setSelectedCircleAnswers] = useState<{ [qId: number]: 'a' | 'b' | 'c' | null }>({
    1: null,
    2: null
  });
  const [circleChecked, setCircleChecked] = useState<boolean>(false);
  const correctCircle: { [qId: number]: 'a' | 'b' | 'c' } = {
    1: 'b', // February
    2: 'c'  // cycling
  };

  // Activity 3: Chant State
  const [activeChantVerse, setActiveChantVerse] = useState<number>(0);
  const [isChanting, setIsChanting] = useState<boolean>(false);

  const chantVerses = [
    {
      title: 'Khổ 1: January, February or May?',
      lines: [
        "When's your sports day?",
        'In January, February or May?',
        'In January, in January.',
        "It's in January."
      ],
      linesVi: [
        'Khi nào là ngày hội thể thao trường bạn?',
        'Vào Tháng 1, Tháng 2 hay Tháng 5?',
        'Vào Tháng 1, vào Tháng 1.',
        'Nó diễn ra vào Tháng 1.'
      ]
    },
    {
      title: 'Khổ 2: May, June or July?',
      lines: [
        "When's your sports day?",
        'In May, June or July?',
        'In July, in July.',
        "It's in July."
      ],
      linesVi: [
        'Khi nào là ngày hội thể thao trường bạn?',
        'Vào Tháng 5, Tháng 6 hay Tháng 7?',
        'Vào Tháng 7, vào Tháng 7.',
        'Nó diễn ra vào Tháng 7.'
      ]
    }
  ];

  const handlePlayChant = (verseIdx: number) => {
    setActiveChantVerse(verseIdx);
    setIsChanting(true);
    sound.playClick();
    const verse = chantVerses[verseIdx];
    speakWord(verse.lines.join('. '), speechRate);
    setTimeout(() => {
      setIsChanting(false);
      sound.playVictory();
      onAddStar(2);
    }, 4500);
  };

  // Activity 4: Read and tick True/False State
  const [tfAnswers, setTfAnswers] = useState<{ [qId: number]: 'True' | 'False' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [tfChecked, setTfChecked] = useState<boolean>(false);
  const correctTf: { [qId: number]: 'True' | 'False' } = {
    1: 'True',  // in November
    2: 'False', // in school gym (text says in school playground)
    3: 'True',  // boys play badminton
    4: 'False'  // girls play basketball (text says girls play football)
  };

  // Activity 5: Let's Write State
  const [writeMonth, setWriteMonth] = useState<string>('October');
  const [writeGirls, setWriteGirls] = useState<string>('play football');
  const [writeBoys, setWriteBoys] = useState<string>('play badminton');
  const [writeTeachers, setWriteTeachers] = useState<string>('play basketball');

  // Activity 6: Poster Project State
  const [posterMonth, setPosterMonth] = useState<string>('October');
  const [posterTheme, setPosterTheme] = useState<string>('orange');
  const [selectedStickers, setSelectedStickers] = useState<string[]>([
    '⚽', '🏆', '🏸', '🚴', '🏀'
  ]);
  const [posterSlogan, setPosterSlogan] = useState<string>('We all love our sports day!');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Trophy className="w-4 h-4 text-yellow-200" />
              <span>Unit 9: Our sports day • Lesson 3 (Trang 66 - 67 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 3: Ngữ Âm Chữ "Y" & Áp Phích Ngày Hội Thể Thao
            </h1>
            <p className="text-sm sm:text-base text-yellow-50 max-w-2xl font-medium">
              Luyện phát âm chuẩn hai âm của chữ "y" (/i/ trong February vs /aɪ/ trong July), đọc hiểu bài văn tả ngày hội và thiết kế poster thể thao của riêng em!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>Tiết 1</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>Tiết 2</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Phonics "y" (/i/ & /aɪ/)', icon: '🗣️' },
          { id: 2, label: '2. Listen and circle', icon: '⭕' },
          { id: 3, label: '3. Let’s chant', icon: '🎵' },
          { id: 4, label: '4. Read: True or False', icon: '📖' },
          { id: 5, label: '5. Let’s write', icon: '✍️' },
          { id: 6, label: '6. Poster Studio Project', icon: '🎨' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-red-600 text-white shadow-md scale-102 ring-2 ring-red-400/30'
                : 'bg-white text-slate-600 hover:bg-red-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: PHONICS LAB (TRACK 94) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                🗣️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Listen and repeat — Phonics Lab chữ "y" (Track 94 SGK Trang 66)
                </h3>
                <p className="text-xs text-slate-500">
                  Chữ "y" có thể phát âm là /i/ (ngắn) như trong <strong>February</strong>, hoặc /aɪ/ (đôi) như trong <strong>July</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phonicsPairs.map(p => (
              <div
                key={p.name}
                className={`p-5 rounded-3xl border-2 ${
                  p.color === 'emerald'
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                } space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl text-white ${
                      p.color === 'emerald' ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}>
                      y
                    </span>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{p.name}</h4>
                      <p className="text-xs text-slate-500">{p.ipa} • Đọc là "{p.reading}"</p>
                    </div>
                  </div>
                  <button
                    onClick={() => speakWord(p.examples[0].sentence, speechRate)}
                    className="p-2 bg-white rounded-xl shadow-2xs hover:bg-slate-50"
                  >
                    <Volume2 className="w-4 h-4 text-slate-700" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-black/5">
                  {p.desc}
                </p>

                <div className="space-y-2.5">
                  {p.examples.map(ex => (
                    <div
                      key={ex.word}
                      className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-orange-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base text-slate-900">{ex.word}</span>
                          <span className="text-xs text-slate-400 font-mono">{ex.ipa}</span>
                          <span className="text-xs font-bold text-slate-500">({ex.vi})</span>
                        </div>
                        <button
                          onClick={() => speakWord(ex.word, speechRate)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-slate-700">"{ex.sentence}"</p>
                      <p className="text-[11px] text-slate-500 italic">{ex.sentenceVi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN AND CIRCLE (TRACK 95) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                ⭕
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen and circle (Track 95 SGK Trang 66)
                </h3>
                <p className="text-xs text-slate-500">
                  Lắng nghe đoạn ghi âm và khoanh tròn đáp án đúng a, b hoặc c
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: Is your sports day in February? Number two: I like cycling.", speechRate);
              }}
              className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Track 95</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* Câu 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">1. Is your sports day in _______?</span>
                <button
                  onClick={() => speakWord("Is your sports day in February?", speechRate)}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Nghe câu 1</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'a' as const, label: 'a. July', ipa: '/dʒuˈlaɪ/' },
                  { key: 'b' as const, label: 'b. February', ipa: '/ˈfeb.ru.ər.i/' },
                  { key: 'c' as const, label: 'c. January', ipa: '/ˈdʒæn.ju.ə.ri/' }
                ].map(opt => {
                  const isSelected = selectedCircleAnswers[1] === opt.key;
                  const isCorrect = opt.key === correctCircle[1];
                  const showResult = circleChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCircleAnswers(prev => ({ ...prev, 1: opt.key }));
                      }}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black ring-2 ring-emerald-300'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-red-600 bg-red-50 text-red-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-black">{opt.label}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{opt.ipa}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Câu 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">2. I like _______.</span>
                <button
                  onClick={() => speakWord("I like cycling.", speechRate)}
                  className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Nghe câu 2</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'a' as const, label: 'a. July', ipa: '/dʒuˈlaɪ/' },
                  { key: 'b' as const, label: 'b. January', ipa: '/ˈdʒæn.ju.ə.ri/' },
                  { key: 'c' as const, label: 'c. cycling', ipa: '/ˈsaɪ.klɪŋ/' }
                ].map(opt => {
                  const isSelected = selectedCircleAnswers[2] === opt.key;
                  const isCorrect = opt.key === correctCircle[2];
                  const showResult = circleChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCircleAnswers(prev => ({ ...prev, 2: opt.key }));
                      }}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black ring-2 ring-emerald-300'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-red-600 bg-red-50 text-red-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-black">{opt.label}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{opt.ipa}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setCircleChecked(true);
                if (selectedCircleAnswers[1] === correctCircle[1] && selectedCircleAnswers[2] === correctCircle[2]) {
                  sound.playVictory();
                  confetti({ particleCount: 40 });
                  onAddStar(3);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án Khoanh</span>
            </button>

            <button
              onClick={() => {
                setSelectedCircleAnswers({ 1: null, 2: null });
                setCircleChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S CHANT (TRACK 96) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                🎵
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s chant — "When’s your sports day?" (Track 96 SGK Trang 66)
                </h3>
                <p className="text-xs text-slate-500">
                  Vỗ tay theo nhịp điệu bài vè sôi động kết hợp các môn thể thao (cầu lông, đạp xe, nhảy dây)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chantVerses.map((verse, vIdx) => (
              <div
                key={vIdx}
                className="bg-gradient-to-b from-orange-50/70 to-amber-50/50 p-5 rounded-2xl border-2 border-orange-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                    <span className="font-black text-sm text-orange-900">{verse.title}</span>
                    <button
                      onClick={() => handlePlayChant(vIdx)}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Hát Khổ Này</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {verse.lines.map((line, lIdx) => (
                      <div key={lIdx} className="bg-white/80 p-2.5 rounded-xl border border-orange-100 text-xs">
                        <p className="font-black text-slate-800 text-sm">{line}</p>
                        <p className="text-slate-500 italic mt-0.5">{verse.linesVi[lIdx]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-orange-200 text-xs font-bold text-orange-800 flex items-center justify-between">
                  <span>🏃 Thể thao: Cầu lông, Xe đạp, Nhảy dây</span>
                  <span>⭐ +2 Sao</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: READ AND TICK TRUE OR FALSE ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                📖
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Read and tick True or False (SGK Trang 67)
                </h3>
                <p className="text-xs text-slate-500">
                  Đọc đoạn văn miêu tả ngày hội thể thao trường em và chọn True (Đúng) hoặc False (Sai)
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Our sports day is in November. It is in the school playground. There are many pupils and teachers. We play different sports and games. The boys play badminton. The girls play football. The teachers play basketball. It is a lot of fun!", speechRate);
              }}
              className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Đoạn Văn</span>
            </button>
          </div>

          {/* Reading Passage Card */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-2xl border-2 border-red-200 space-y-2">
            <h4 className="text-xs font-black text-red-900 uppercase tracking-wide">
              Đoạn văn đọc hiểu (Reading Passage):
            </h4>
            <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white/90 p-4 rounded-xl border border-red-100 shadow-2xs">
              "Our sports day is in <strong>November</strong>. It is in the <strong>school playground</strong>. There are many pupils and teachers. We play different sports and games. <strong>The boys play badminton. The girls play football. The teachers play basketball.</strong> It is a lot of fun!"
            </p>
            <p className="text-xs text-slate-600 italic">
              (Dịch: Ngày hội thể thao của trường chúng tớ diễn ra vào Tháng 11 tại sân trường. Có rất nhiều học sinh và thầy cô tham gia. Chúng tớ chơi nhiều môn thể thao và trò chơi khác nhau. Các bạn nam chơi cầu lông. Các bạn nữ đá bóng. Các thầy cô chơi bóng rổ. Thật là vui nhộn!)
            </p>
          </div>

          {/* True / False Questions */}
          <div className="space-y-3">
            {[
              { id: 1, text: '1. The sports day is in November.', textVi: 'Ngày hội thể thao diễn ra vào Tháng 11.' },
              { id: 2, text: '2. The sports day is in the school gym.', textVi: 'Ngày hội thể thao diễn ra trong nhà thể chất (gym).' },
              { id: 3, text: '3. The boys play badminton.', textVi: 'Các bạn nam chơi cầu lông.' },
              { id: 4, text: '4. The girls play basketball.', textVi: 'Các bạn nữ chơi bóng rổ.' }
            ].map(q => {
              const currentChoice = tfAnswers[q.id];
              const isChecked = tfChecked;
              const isRight = currentChoice === correctTf[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-slate-900">{q.text}</p>
                    <p className="text-xs text-slate-500 italic">({q.textVi})</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {['True', 'False'].map(option => {
                      const isSelected = currentChoice === option;
                      return (
                        <button
                          key={option}
                          onClick={() => {
                            sound.playClick();
                            setTfAnswers(prev => ({ ...prev, [q.id]: option as 'True' | 'False' }));
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                            isChecked && isSelected && isRight
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : isChecked && isSelected && !isRight
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : isSelected
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setTfChecked(true);
                const allCorrect = Object.keys(correctTf).every(
                  id => tfAnswers[parseInt(id, 10)] === correctTf[parseInt(id, 10)]
                );
                if (allCorrect) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Đọc Hiểu</span>
            </button>

            <button
              onClick={() => {
                setTfAnswers({ 1: null, 2: null, 3: null, 4: null });
                setTfChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LET'S WRITE ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Let’s write (SGK Trang 67)
                </h3>
                <p className="text-xs text-slate-500">
                  Tập viết đoạn văn giới thiệu ngày hội thể thao của trường em
                </p>
              </div>
            </div>
          </div>

          {/* Form customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">1. Tháng tổ chức:</label>
              <select
                value={writeMonth}
                onChange={e => setWriteMonth(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                {['May', 'October', 'November', 'December', 'March', 'April', 'January'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">2. Các bạn nữ chơi:</label>
              <select
                value={writeGirls}
                onChange={e => setWriteGirls(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="play football">play football (đá bóng)</option>
                <option value="skip rope">skip rope (nhảy dây)</option>
                <option value="play badminton">play badminton (cầu lông)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">3. Các bạn nam chơi:</label>
              <select
                value={writeBoys}
                onChange={e => setWriteBoys(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="play badminton">play badminton (cầu lông)</option>
                <option value="play basketball">play basketball (bóng rổ)</option>
                <option value="ride bicycles">ride bicycles (đua xe đạp)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700">4. Các thầy cô chơi:</label>
              <select
                value={writeTeachers}
                onChange={e => setWriteTeachers(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="play basketball">play basketball (bóng rổ)</option>
                <option value="play table tennis">play table tennis (bóng bàn)</option>
                <option value="play tug of war">play tug of war (kéo co)</option>
              </select>
            </div>
          </div>

          {/* Generated Text Preview */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-red-900 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600" />
                Đoạn văn hoàn chỉnh của em:
              </span>
              <button
                onClick={() => {
                  const fullText = `Our school sports day is in ${writeMonth}. We play sports and games in the school playground. The girls ${writeGirls}. The boys ${writeBoys}. The teachers ${writeTeachers}. We all love our sports day.`;
                  speakWord(fullText, speechRate);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Đọc Đoạn Văn</span>
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-red-200 text-slate-800 text-sm sm:text-base leading-relaxed font-serif shadow-2xs">
              "Our school sports day is in <span className="font-black text-red-600 underline">{writeMonth}</span>. We play sports and games in the school playground. The girls <span className="font-black text-red-600 underline">{writeGirls}</span>. The boys <span className="font-black text-red-600 underline">{writeBoys}</span>. The teachers <span className="font-black text-red-600 underline">{writeTeachers}</span>. We all love our sports day."
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: PROJECT: OUR SPORTS DAY POSTER ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-red-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-red-100 text-red-700 rounded-2xl text-xl font-black">
                🎨
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Project — "Our sports day poster" (Áp Phích Ngày Hội Thể Thao · SGK Trang 67)
                </h3>
                <p className="text-xs text-slate-500">
                  Tự tay sáng tạo áp phích thể thao trường em với cúp vàng, quả bóng, xe đạp và khẩu hiệu cổ vũ!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customization Controls */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <span className="font-black text-xs text-slate-700 uppercase tracking-wide block">
                Công cụ thiết kế poster:
              </span>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Tháng tổ chức:</label>
                <select
                  value={posterMonth}
                  onChange={e => setPosterMonth(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                >
                  {['October', 'November', 'December', 'May', 'June', 'April'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Màu chủ đạo poster:</label>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'orange', bg: 'bg-orange-500' },
                    { id: 'red', bg: 'bg-red-500' },
                    { id: 'emerald', bg: 'bg-emerald-500' },
                    { id: 'sky', bg: 'bg-sky-500' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setPosterTheme(c.id)}
                      className={`w-7 h-7 rounded-full ${c.bg} transition-transform ${
                        posterTheme === c.id ? 'ring-4 ring-slate-400 scale-110' : ''
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Khẩu hiệu (Slogan):</label>
                <input
                  type="text"
                  value={posterSlogan}
                  onChange={e => setPosterSlogan(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Thêm nhãn dán thể thao:</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['⚽', '🏀', '🏸', '🚴', '🏓', '🏃', '🥇', '🏆', '👟', '🎯'].map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        sound.playClick();
                        if (selectedStickers.includes(st)) {
                          setSelectedStickers(selectedStickers.filter(s => s !== st));
                        } else {
                          setSelectedStickers([...selectedStickers, st]);
                        }
                      }}
                      className={`text-xl p-1.5 rounded-lg border ${
                        selectedStickers.includes(st)
                          ? 'bg-amber-100 border-amber-400 scale-110'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Poster Canvas Preview */}
            <div className="lg:col-span-2">
              <div
                className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-white space-y-6 text-center relative overflow-hidden ${
                  posterTheme === 'orange'
                    ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500'
                    : posterTheme === 'red'
                    ? 'bg-gradient-to-br from-red-600 via-rose-500 to-pink-500'
                    : posterTheme === 'emerald'
                    ? 'bg-gradient-to-br from-emerald-600 via-teal-500 to-green-500'
                    : 'bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-500'
                }`}
              >
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-widest uppercase">
                    ★ SCHOOL SPORTS DAY ★
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
                    OUR SPORTS DAY
                  </h2>
                  <div className="inline-block bg-white text-slate-900 font-black px-6 py-2 rounded-2xl shadow-lg text-lg sm:text-2xl mt-2 transform -rotate-1">
                    IS IN {posterMonth.toUpperCase()}!
                  </div>
                </div>

                {/* Sticker Badges */}
                <div className="flex items-center justify-center gap-4 flex-wrap py-4">
                  {selectedStickers.map((s, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md transform hover:scale-115 transition-transform"
                    >
                      {s}
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/30 pt-4 space-y-1">
                  <p className="text-base sm:text-lg font-black tracking-wide drop-shadow-xs">
                    "{posterSlogan}"
                  </p>
                  <p className="text-xs text-white/80">
                    Presented by 4th Grade Pupils • Tiếng Anh 4 Global Success
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    sound.playVictory();
                    confetti({ particleCount: 60 });
                    onAddStar(5);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Hoàn Thành Poster (+5 ⭐)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 rounded-3xl p-5 sm:p-6 border-2 border-red-200 space-y-4">
          <div className="flex items-center gap-2 text-red-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-red-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 3 (Lesson 3)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-red-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-red-700">1. Quy Tắc Ngữ Âm Chữ "Y":</span>
              <p>
                • Phát âm /i/: <strong>February</strong> (/ˈfeb.ru.ər.i/), <strong>January</strong>.
                <br />
                • Phát âm /aɪ/: <strong>July</strong> (/dʒuˈlaɪ/), <strong>cycling</strong> (/ˈsaɪ.klɪŋ/).
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-red-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-red-700">2. Đọc Hiểu Bắt Key:</span>
              <p>
                Khuyên con tìm từ khóa: <em>playground</em> (sân trường), <em>boys</em> - <em>badminton</em>, <em>girls</em> - <em>football</em>, <em>teachers</em> - <em>basketball</em>.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-red-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-red-700">3. Khen Ngợi & Đồng Hành:</span>
              <p>
                Khi con làm xong poster áp phích thể thao, bố mẹ hãy cùng con treo lên góc học tập để tạo động lực rèn luyện sức khỏe mỗi ngày!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
