import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Music,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Edit3,
  CreditCard,
  User,
  Flag,
  Share2,
  ArrowRight,
  Layers,
  Search,
  Copy,
  Sliders,
  Smile
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit1Lesson3Quiz } from './unit1/Unit1Lesson3Quiz';

interface Unit1Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit1Lesson3Studio: React.FC<Unit1Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // Speed factor inside studio
  const [localSpeed, setLocalSpeed] = useState<number>(speechRate);

  // ---------- ACTIVITY 1: LISTEN AND REPEAT (TRACK 13) ----------
  const [activePhonicsSound, setActivePhonicsSound] = useState<string | null>(null);

  // ---------- ACTIVITY 2: LISTEN AND CIRCLE (TRACK 14) ----------
  const [act2Answers, setAct2Answers] = useState<{ [q: number]: string | null }>({
    1: null,
    2: null
  });
  const [act2Checked, setAct2Checked] = useState<boolean>(false);

  const act2Questions = [
    {
      q: 1,
      prompt: "1. I'm from _____.",
      audioText: "I'm from America.",
      options: [
        { key: 'a', label: 'America', isCorrect: true, highlight: 'a' },
        { key: 'b', label: 'Australia', isCorrect: false, highlight: 'ia' },
        { key: 'c', label: 'Malaysia', isCorrect: false, highlight: 'ia' }
      ],
      explanation: 'Âm thanh đọc rõ: "I\'m from America" ➔ Kết thúc bằng âm /ə/ (chữ cái a) ➔ Đáp án đúng là a. America.'
    },
    {
      q: 2,
      prompt: "2. He's from _____.",
      audioText: "He's from Australia.",
      options: [
        { key: 'a', label: 'Canada', isCorrect: false, highlight: 'a' },
        { key: 'b', label: 'Australia', isCorrect: true, highlight: 'ia' },
        { key: 'c', label: 'America', isCorrect: false, highlight: 'a' }
      ],
      explanation: 'Âm thanh đọc rõ: "He\'s from Australia" ➔ Kết thúc bằng âm /iə/ (chữ cái ia) ➔ Đáp án đúng là b. Australia.'
    }
  ];

  const handleCheckAct2 = () => {
    sound.playClick();
    setAct2Checked(true);
    const q1Correct = act2Answers[1] === 'a';
    const q2Correct = act2Answers[2] === 'b';
    if (q1Correct && q2Correct) {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
      onAddStar(6);
    } else {
      sound.playWrong();
    }
  };

  const handleResetAct2 = () => {
    sound.playClick();
    setAct2Answers({ 1: null, 2: null });
    setAct2Checked(false);
  };

  // ---------- ACTIVITY 3: LET'S CHANT (TRACK 15) ----------
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [activeChantLine, setActiveChantLine] = useState<number>(-1);
  const [chantBeatSpeed, setChantBeatSpeed] = useState<'normal' | 'fast'>('normal');

  const chantLines = [
    { text: 'America, America.', ipa: '/əˈmerɪkə, əˈmerɪkə/', vi: 'Nước Mỹ, nước Mỹ.' },
    { text: "Mary's from America.", ipa: "/ˈmeəriz frəm əˈmerɪkə/", vi: 'Mary đến từ nước Mỹ.' },
    { text: "She's from America.", ipa: "/ʃiːz frəm əˈmerɪkə/", vi: 'Bạn ấy đến từ nước Mỹ.' },
    { text: 'Australia, Australia.', ipa: '/ɒˈstreɪliə, ɒˈstreɪliə/', vi: 'Nước Úc, nước Úc.' },
    { text: "Ben's from Australia.", ipa: "/benz frəm ɒˈstreɪliə/", vi: 'Ben đến từ nước Úc.' },
    { text: "He's from Australia.", ipa: "/hiːz frəm ɒˈstreɪliə/", vi: 'Cậu ấy đến từ nước Úc.' }
  ];

  const playFullChant = async () => {
    sound.playClick();
    setIsChanting(true);
    const rateMultiplier = chantBeatSpeed === 'fast' ? 1.05 : 0.92;
    for (let i = 0; i < chantLines.length; i++) {
      setActiveChantLine(i);
      await speakWord(chantLines[i].text, localSpeed * rateMultiplier);
      await new Promise(r => setTimeout(r, chantBeatSpeed === 'fast' ? 320 : 450));
    }
    setActiveChantLine(-1);
    setIsChanting(false);
    sound.playStar();
    onAddStar(5);
    confetti({ particleCount: 50, spread: 60 });
  };

  // ---------- ACTIVITY 4: READ AND TICK TRUE / FALSE (TRANG 15) ----------
  const [tfAnswers, setTfAnswers] = useState<{ [q: number]: boolean | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [tfChecked, setTfChecked] = useState<boolean>(false);
  const [activeClueIndex, setActiveClueIndex] = useState<number | null>(null);

  const tfStatements = [
    {
      q: 1,
      statement: '1. Minh is nine years old.',
      correct: true,
      clueKey: 'clue1',
      evidence: 'Đoạn văn có câu: "I am nine years old." ➔ Minh 9 tuổi là Đúng (True).'
    },
    {
      q: 2,
      statement: '2. Minh is from Viet Nam.',
      correct: true,
      clueKey: 'clue2',
      evidence: 'Đoạn văn có câu: "I am from Viet Nam." ➔ Minh đến từ Việt Nam là Đúng (True).'
    },
    {
      q: 3,
      statement: '3. Tony is from Australia.',
      correct: false,
      clueKey: 'clue3',
      evidence: 'Đoạn văn ghi rõ: "Tony is from America." (Tony đến từ Mỹ, KHÔNG PHẢI Úc!) ➔ Câu này là Sai (False).'
    },
    {
      q: 4,
      statement: '4. Laura is from America.',
      correct: false,
      clueKey: 'clue4',
      evidence: 'Đoạn văn ghi rõ: "Laura is from Australia." (Laura đến từ Úc, KHÔNG PHẢI Mỹ!) ➔ Câu này là Sai (False).'
    }
  ];

  const handleCheckTf = () => {
    sound.playClick();
    setTfChecked(true);
    let correctCount = 0;
    tfStatements.forEach(item => {
      if (tfAnswers[item.q] === item.correct) {
        correctCount++;
      }
    });

    if (correctCount === 4) {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 70 });
      onAddStar(8);
    } else {
      sound.playWrong();
    }
  };

  const handleResetTf = () => {
    sound.playClick();
    setTfAnswers({ 1: null, 2: null, 3: null, 4: null });
    setTfChecked(false);
    setActiveClueIndex(null);
  };

  // ---------- ACTIVITY 5: LET'S WRITE (TRANG 15) ----------
  const [writeForm, setWriteForm] = useState({
    name: 'An',
    age: '9',
    friend1Name: 'Tony',
    friend1Gender: 'He',
    friend1Country: 'America',
    friend2Name: 'Laura',
    friend2Gender: 'She',
    friend2Country: 'Australia'
  });
  const [hasCopiedParagraph, setHasCopiedParagraph] = useState<boolean>(false);

  const fullWrittenText = `Hi. My name is ${writeForm.name || 'An'}. I am ${writeForm.age || '9'} years old. I am from Viet Nam. This is my friend, ${writeForm.friend1Name || 'Tony'}. ${writeForm.friend1Gender} is from ${writeForm.friend1Country || 'America'}. And this is ${writeForm.friend2Name || 'Laura'}. ${writeForm.friend2Gender} is from ${writeForm.friend2Country || 'Australia'}.`;

  const handleReadWrittenParagraph = async () => {
    sound.playClick();
    await speakWord(fullWrittenText, localSpeed);
    onAddStar(5);
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleCopyParagraph = () => {
    sound.playClick();
    navigator.clipboard?.writeText(fullWrittenText);
    setHasCopiedParagraph(true);
    setTimeout(() => setHasCopiedParagraph(false), 2500);
  };

  // ---------- ACTIVITY 6: PUPIL CARDS PROJECT (TRANG 15) ----------
  const [pupilCard, setPupilCard] = useState({
    name: 'Nguyen Van An',
    age: '9',
    country: 'Viet Nam',
    flag: '🇻🇳',
    avatar: '👦',
    school: 'Tieu Hoc Kim Dong',
    hobby: 'Reading comic books',
    motto: 'Always smile and be kind!'
  });
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const handleReadPupilCardSpeech = async () => {
    sound.playClick();
    const speech = `Hello everyone! My name is ${pupilCard.name}. I am ${pupilCard.age} years old. I am from ${pupilCard.country}. Here is my international pupil card. Nice to meet you!`;
    await speakWord(speech, localSpeed);
    sound.playVictory();
    confetti({ particleCount: 60, spread: 70 });
    onAddStar(6);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 14 & 15 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black shadow-sm">
              <span>🎯 Tiết 3: Phonics, Chanting & Thẻ Học Sinh Quốc Tế</span>
            </span>
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 10 - 11)</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 2 (Trang 12 - 13)</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 1: My Friends — Lesson 3
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed max-w-3xl">
            Luyện chuẩn 2 âm đuôi cốt lõi <strong>/ə/ (trong America 🇺🇸)</strong> và <strong>/iə/ (trong Australia 🇦🇺)</strong>, cùng rapper nhí hát vè sôi động, giải mã bài đọc hiểu của bạn Minh và tự tay tạo <strong>Thẻ Học Sinh Toàn Cầu (Pupil Card)</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /ə/: Americ<strong className="text-amber-300">a</strong></span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /iə/: Austral<strong className="text-amber-300">ia</strong></span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎵 Bài vè Let's chant</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🪪 Thẻ học sinh quốc tế 🇻🇳 🇺🇸 🇦🇺</span>
            <span className="bg-amber-400/30 text-amber-200 border border-amber-300/40 px-3 py-1 rounded-lg font-bold">🎮 Siêu đố vui có thưởng</span>
          </div>
        </div>

        {/* Global Controls inside Banner */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPhoneticDetails(!showPhoneticDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showPhoneticDetails
                  ? 'bg-amber-400 text-slate-900 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🇬🇧 Phiên âm Anh - Anh (RP)</span>
              <span>{showPhoneticDetails ? 'Đang bật' : 'Tắt'}</span>
            </button>

            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showParentGuides
                  ? 'bg-rose-500 text-white font-extrabold ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Mẹo phụ huynh kèm con</span>
              <span>{showParentGuides ? 'Đang bật' : 'Tắt'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullHandbook(!showFullHandbook)}
              className="px-4 py-1.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang ngữ âm Tiết 3'}</span>
              {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🗽
        </div>
      </div>

      {/* ================= SECTION 0: BÍ KÍP 3 GIÂY NHỚ CHUẨN NGỮ ÂM (VISUAL BRAIN BOOSTER) ================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-teal-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Quyết Não Phải Phân Biệt Âm Đuôi SGK Lớp 4</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 Bí Kíp 3 Giây Nhớ Chuẩn 2 Âm Đuôi: "a" & "ia"</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Nguyên tắc vàng: <strong>Môi thả lỏng, cằm hơi trễ xuống nhẹ nhàng như một hơi thở, không gồng miệng!</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                sound.playClick();
                await speakWord('America. I am from America.', localSpeed * 0.9);
                await new Promise(r => setTimeout(r, 400));
                await speakWord('Australia. She is from Australia.', localSpeed * 0.9);
                onAddStar(2);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Nghe Đối Chiếu 2 Âm Cốt Lõi</span>
            </button>
          </div>
        </div>

        {/* 2 Core Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Letter a -> /ə/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-rose-400/30 space-y-4 hover:border-rose-400/60 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-400/50 text-rose-300 font-black text-2xl flex items-center justify-center shadow-inner">
                  a
                </span>
                <div>
                  <div className="text-xs font-mono font-bold text-rose-300 uppercase">Âm đơn /ə/ (Schwa)</div>
                  <div className="text-xs text-slate-300">Nguyên âm lướt nhẹ nhất</div>
                </div>
              </div>
              <span className="text-2xl">🇺🇸 🗽</span>
            </div>

            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Từ ví dụ trọng tâm:</span>
                <button
                  onClick={() => speakWord('America', localSpeed)}
                  className="text-xs text-rose-300 hover:text-white flex items-center gap-1 font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe từ
                </button>
              </div>
              <div className="text-2xl font-black text-white">
                Americ<span className="text-rose-400 underline decoration-2">a</span>
              </div>
              <div className="text-xs font-mono text-indigo-300">/əˈmerɪkə/</div>
              <div className="text-xs font-bold text-amber-200">
                🗣️ Mẹo đọc: Ờ-ME-ri-kơ (vần "kơ" lướt nhẹ, KHÔNG đọc "ca")
              </div>
            </div>

            <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-400/20 text-xs text-slate-200 space-y-1">
              <div className="font-bold text-rose-300 flex items-center gap-1.5">
                <span>👄 Khẩu hình miệng 3 giây:</span>
              </div>
              <p className="leading-relaxed">
                Mở miệng tự nhiên, thả lỏng cơ mặt, cằm hơi trễ xuống nhẹ nhàng. Phát ra một âm thanh ngắn, lướt như hơi thở.
              </p>
              <div className="text-[11px] text-amber-300 pt-1 font-medium">
                💡 Các từ tương tự: Canad<strong className="underline">a</strong> 🇨🇦, Chin<strong className="underline">a</strong> 🇨🇳, banan<strong className="underline">a</strong> 🍌
              </div>
            </div>
          </div>

          {/* Card 2: Letter ia -> /iə/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-amber-400/30 space-y-4 hover:border-amber-400/60 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-amber-500/30 border border-amber-400/50 text-amber-300 font-black text-2xl flex items-center justify-center shadow-inner">
                  ia
                </span>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase">Nguyên âm đôi /iə/</div>
                  <div className="text-xs text-slate-300">Trượt mượt mà từ /i/ sang /ə/</div>
                </div>
              </div>
              <span className="text-2xl">🇦🇺 🦘</span>
            </div>

            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Từ ví dụ trọng tâm:</span>
                <button
                  onClick={() => speakWord('Australia', localSpeed)}
                  className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe từ
                </button>
              </div>
              <div className="text-2xl font-black text-white">
                Austral<span className="text-amber-400 underline decoration-2">ia</span>
              </div>
              <div className="text-xs font-mono text-indigo-300">/ɒˈstreɪliə/</div>
              <div className="text-xs font-bold text-amber-200">
                🗣️ Mẹo đọc: O-STREI-li-ơ (nguyên âm đôi "li-ơ", KHÔNG đọc ngắt "li-a")
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-400/20 text-xs text-slate-200 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>👄 Khẩu hình miệng 3 giây:</span>
              </div>
              <p className="leading-relaxed">
                Miệng cười mỉm nhẹ để phát âm /i/, sau đó lướt thả lỏng sang /ə/ tạo thành chuỗi âm liên kết mượt mà.
              </p>
              <div className="text-[11px] text-amber-300 pt-1 font-medium">
                💡 Các từ tương tự: Malays<strong className="underline">ia</strong> 🇲🇾, Ind<strong className="underline">ia</strong> 🇮🇳, Kore<strong className="underline">a</strong> 🇰🇷
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK (COLLAPSIBLE) ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 sm:p-8 shadow-xl space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl text-2xl shadow-sm">
                👨‍👩‍👧‍👦
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Cẩm Nang Hướng Dẫn Phát Âm Cho Phụ Huynh & Thầy Cô (Tiết 3)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bí quyết giúp bố mẹ sửa lỗi phát âm âm đuôi cho con chỉ trong 2 phút tại nhà.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Thu gọn ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <span>💡 1. Bẫy âm đuôi "a" trong America</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Học sinh Việt Nam thường có phản xạ đọc chữ 'a' cuối từ theo tiếng Việt là âm /a/ (như "Ơ-me-ri-ca"). Hãy nhắc con thả lỏng môi, cằm hơi trễ xuống nhẹ nhàng và phát âm thành âm <strong>/ə/</strong> (giống âm "ơ" thật ngắn): <em>"Ơ-ME-ri-kơ"</em>.
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                <span>💡 2. Bẫy âm đuôi "ia" trong Australia</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Chữ 'ia' ở cuối tạo thành nguyên âm đôi <strong>/iə/</strong>. Mẹo cho bố mẹ: bảo con cười nhẹ để tạo âm /i/ rồi thả lỏng lướt sang /ə/ tạo thành âm "li-ơ". Tuyệt đối không đọc giật cục thành "li-a".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-teal-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động SGK + Siêu Đố Vui (Trang 14 - 15)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Listen and repeat', icon: '🗣️', tag: 'Track 13' },
            { id: 2, label: '2. Listen and circle', icon: '✏️', tag: 'Track 14' },
            { id: 3, label: "3. Let's chant", icon: '🎵', tag: 'Track 15' },
            { id: 4, label: '4. Read and tick T/F', icon: '📖', tag: 'Trang 15' },
            { id: 5, label: "5. Let's write", icon: '✍️', tag: 'Tập viết' },
            { id: 6, label: '6. Pupil cards Project', icon: '🪪', tag: 'Dự án thẻ' },
            { id: 7, label: '7. Siêu Đố Vui Mini-Game', icon: '🎮', tag: 'Đố vui' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{act.icon}</span>
              <span>{act.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  activeSection === act.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {act.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= ACTIVITY 1: LISTEN AND REPEAT (TRACK 13) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 14 SGK - Track 13)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen and repeat (Lắng nghe và nhắc lại chuẩn ngữ âm)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Bé chú ý các chữ cái màu đỏ in đậm ở cuối từ và câu để bắt chước chuẩn khẩu hình bản xứ!
              </p>
            </div>
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 13 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: a -> America */}
            <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 shadow-sm space-y-4 hover:border-rose-400 transition-all">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="text-3xl font-black text-rose-600 font-mono">
                  a <span className="text-sm font-normal text-slate-500 font-sans">(/ə/)</span>
                </span>
                <span className="text-2xl">🇺🇸 🗽</span>
              </div>

              {/* Word America */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('America', localSpeed);
                }}
                className="p-4 bg-rose-50 rounded-2xl border border-rose-200 hover:bg-rose-100/60 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>Từ vựng trọng tâm:</span>
                  <span className="flex items-center gap-1 text-[11px] text-rose-600">
                    <Volume2 className="w-3.5 h-3.5" /> Bấm nghe từ
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  Americ<span className="text-rose-600 underline">a</span>
                </div>
                <div className="text-xs font-mono text-indigo-700">/əˈmerɪkə/</div>
                <div className="text-xs font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded inline-block">
                  🗣️ Đọc: Ờ-ME-ri-kơ
                </div>
              </div>

              {/* Sentence */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("I'm from America.", localSpeed);
                  onAddStar(1);
                }}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Câu hoàn chỉnh:</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Volume2 className="w-3.5 h-3.5" /> Bấm nghe câu
                  </span>
                </div>
                <div className="text-lg font-black text-slate-900">
                  "I'm from Americ<span className="text-rose-600 font-extrabold underline">a</span>."
                </div>
                <div className="text-xs font-mono text-indigo-700">/aɪm frəm əˈmerɪkə/</div>
                <div className="text-xs text-slate-500 italic">
                  (Nghĩa: Tớ đến từ nước Mỹ.)
                </div>
              </div>
            </div>

            {/* Box 2: ia -> Australia */}
            <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-4 hover:border-amber-400 transition-all">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <span className="text-3xl font-black text-amber-600 font-mono">
                  ia <span className="text-sm font-normal text-slate-500 font-sans">(/iə/)</span>
                </span>
                <span className="text-2xl">🇦🇺 🦘</span>
              </div>

              {/* Word Australia */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Australia', localSpeed);
                }}
                className="p-4 bg-amber-50 rounded-2xl border border-amber-200 hover:bg-amber-100/60 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Từ vựng trọng tâm:</span>
                  <span className="flex items-center gap-1 text-[11px] text-amber-600">
                    <Volume2 className="w-3.5 h-3.5" /> Bấm nghe từ
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  Austral<span className="text-amber-600 underline">ia</span>
                </div>
                <div className="text-xs font-mono text-indigo-700">/ɒˈstreɪliə/</div>
                <div className="text-xs font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded inline-block">
                  🗣️ Đọc: O-STREI-li-ơ
                </div>
              </div>

              {/* Sentence */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("She's from Australia.", localSpeed);
                  onAddStar(1);
                }}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-white cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Câu hoàn chỉnh:</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Volume2 className="w-3.5 h-3.5" /> Bấm nghe câu
                  </span>
                </div>
                <div className="text-lg font-black text-slate-900">
                  "She's from Austral<span className="text-amber-600 font-extrabold underline">ia</span>."
                </div>
                <div className="text-xs font-mono text-indigo-700">/ʃiːz frəm ɒˈstreɪliə/</div>
                <div className="text-xs text-slate-500 italic">
                  (Nghĩa: Bạn ấy đến từ nước Úc.)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN AND CIRCLE (TRACK 14) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 14 SGK - Track 14)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen and circle (Nghe và khoanh tròn đáp án đúng)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Bé bấm nghe âm thanh câu 1 và câu 2, sau đó chọn đáp án a, b hoặc c tương ứng.
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              Phân biệt âm đuôi a & ia
            </span>
          </div>

          <div className="space-y-6">
            {act2Questions.map(item => (
              <div
                key={item.q}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-base font-extrabold text-slate-900">
                    {item.prompt}
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.audioText, localSpeed);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Bấm để nghe câu {item.q}</span>
                  </button>
                </div>

                {/* 3 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.options.map(opt => {
                    const isSelected = act2Answers[item.q] === opt.key;
                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200';

                    if (act2Checked) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-black';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          sound.playClick();
                          setAct2Answers(prev => ({ ...prev, [item.q]: opt.key }));
                        }}
                        className={`p-3.5 rounded-xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-700">
                            {opt.key}
                          </span>
                          <span>
                            {opt.label.slice(0, -opt.highlight.length)}
                            <span className="text-rose-600 font-black underline">
                              {opt.highlight}
                            </span>
                          </span>
                        </div>
                        {act2Checked && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {act2Checked && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    💡 <span className="font-bold text-indigo-700">Giải thích: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCheckAct2}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra bài khoanh tròn</span>
              </button>

              {act2Checked && (
                <button
                  onClick={handleResetAct2}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S CHANT (TRACK 15) ================= */}
      {activeSection === 3 && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Hoạt Động 3 (Trang 14 SGK - Track 15)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎵 Let's Chant (Hát Vè Theo Nhịp Rapper Sôi Động)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cùng bé vỗ tay theo nhịp để rèn luyện ngữ điệu tự nhiên và nhớ sâu tên hai quốc gia America 🇺🇸 & Australia 🇦🇺!
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setChantBeatSpeed(chantBeatSpeed === 'normal' ? 'fast' : 'normal')}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Nhịp: {chantBeatSpeed === 'normal' ? 'Chuẩn SGK' : '⚡ Nhanh vui'}</span>
              </button>

              <button
                onClick={playFullChant}
                disabled={isChanting}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isChanting ? 'Đang đọc theo nhịp...' : 'Bắt đầu bài Chant'}</span>
              </button>
            </div>
          </div>

          {/* Visual Chant Display with Illustrated Characters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stanza 1: America & Mary */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗽</span>
                  <span className="font-extrabold text-amber-300 text-sm">Khổ 1: Bạn Mary & Nước Mỹ</span>
                </div>
                <span className="text-2xl">🇺🇸</span>
              </div>

              <div className="space-y-2">
                {chantLines.slice(0, 3).map((line, idx) => {
                  const isHighlighted = activeChantLine === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => speakWord(line.text, localSpeed)}
                      className={`p-3 rounded-xl transition-all cursor-pointer border ${
                        isHighlighted
                          ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-102'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                      }`}
                    >
                      <div className="text-base font-extrabold">"{line.text}"</div>
                      <div className={`text-xs font-mono ${isHighlighted ? 'text-slate-800' : 'text-indigo-300'}`}>
                        {line.ipa}
                      </div>
                      <div className={`text-xs ${isHighlighted ? 'text-slate-900' : 'text-slate-300'}`}>
                        → {line.vi}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stanza 2: Australia & Ben */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦘</span>
                  <span className="font-extrabold text-sky-300 text-sm">Khổ 2: Bạn Ben & Nước Úc</span>
                </div>
                <span className="text-2xl">🇦🇺</span>
              </div>

              <div className="space-y-2">
                {chantLines.slice(3, 6).map((line, idx) => {
                  const globalIdx = idx + 3;
                  const isHighlighted = activeChantLine === globalIdx;
                  return (
                    <div
                      key={globalIdx}
                      onClick={() => speakWord(line.text, localSpeed)}
                      className={`p-3 rounded-xl transition-all cursor-pointer border ${
                        isHighlighted
                          ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-102'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                      }`}
                    >
                      <div className="text-base font-extrabold">"{line.text}"</div>
                      <div className={`text-xs font-mono ${isHighlighted ? 'text-slate-800' : 'text-indigo-300'}`}>
                        {line.ipa}
                      </div>
                      <div className={`text-xs ${isHighlighted ? 'text-slate-900' : 'text-slate-300'}`}>
                        → {line.vi}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: READ AND TICK TRUE OR FALSE (TRANG 15) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 15 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Read and tick True or False (Đọc đoạn văn và tích Đúng hay Sai)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào từng câu nhận định bên dưới để <strong>bật đèn soi bằng chứng</strong> trực tiếp trong bức thư của bạn Minh!
            </p>
          </div>

          {/* Reading Passage Box (Minh's Postcard) */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 flex flex-col md:flex-row items-start gap-5 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-3xl shadow-sm shrink-0">
              👦
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase">
                  Bức thư của bạn Minh (9 tuổi - Việt Nam 🇻🇳):
                </span>
                <button
                  onClick={() =>
                    speakWord(
                      'Hello. I am Minh. I am nine years old. I am from Viet Nam. I have two new friends, Tony and Laura. Tony is from America. Laura is from Australia. They are friendly.',
                      localSpeed
                    )
                  }
                  className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold border border-amber-300 flex items-center gap-1 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe toàn bộ bài đọc</span>
                </button>
              </div>

              {/* Interactive Paragraph with Interactive Clue Highlighting */}
              <div className="text-base font-bold text-slate-900 leading-relaxed bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                <p>
                  "Hello. I am Minh.{' '}
                  <span
                    className={`transition-all px-1.5 py-0.5 rounded-md ${
                      activeClueIndex === 1
                        ? 'bg-amber-300 text-slate-950 ring-2 ring-amber-400 font-black'
                        : ''
                    }`}
                  >
                    I am nine years old.
                  </span>{' '}
                  <span
                    className={`transition-all px-1.5 py-0.5 rounded-md ${
                      activeClueIndex === 2
                        ? 'bg-emerald-300 text-slate-950 ring-2 ring-emerald-400 font-black'
                        : ''
                    }`}
                  >
                    I am from Viet Nam.
                  </span>{' '}
                  I have two new friends, Tony and Laura.{' '}
                  <span
                    className={`transition-all px-1.5 py-0.5 rounded-md ${
                      activeClueIndex === 3
                        ? 'bg-sky-300 text-slate-950 ring-2 ring-sky-400 font-black'
                        : ''
                    }`}
                  >
                    Tony is from America.
                  </span>{' '}
                  <span
                    className={`transition-all px-1.5 py-0.5 rounded-md ${
                      activeClueIndex === 4
                        ? 'bg-purple-300 text-slate-950 ring-2 ring-purple-400 font-black'
                        : ''
                    }`}
                  >
                    Laura is from Australia.
                  </span>{' '}
                  They are friendly."
                </p>
              </div>

              <p className="text-xs text-slate-600 italic">
                (Dịch nghĩa: Xin chào. Tớ là Minh. Tớ 9 tuổi. Tớ đến từ Việt Nam. Tớ có hai người bạn mới là Tony và Laura. Tony đến từ nước Mỹ. Laura đến từ nước Úc. Các bạn ấy rất thân thiện.)
              </p>
            </div>
          </div>

          {/* True / False Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Câu nhận định (Bấm vào để soi bằng chứng)</th>
                  <th className="p-3.5 text-center w-24">True (Đúng)</th>
                  <th className="p-3.5 text-center w-24">False (Sai)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {tfStatements.map(item => {
                  const chosen = tfAnswers[item.q];
                  const isCorrect = tfChecked && chosen === item.correct;
                  const isWrong = tfChecked && chosen !== null && chosen !== item.correct;
                  const isFocused = activeClueIndex === item.q;

                  return (
                    <tr
                      key={item.q}
                      onClick={() => setActiveClueIndex(item.q)}
                      className={`cursor-pointer transition-colors ${
                        isFocused ? 'bg-amber-50/70' : isCorrect ? 'bg-emerald-50/40' : isWrong ? 'bg-rose-50/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.statement}</span>
                          {isFocused && (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                              Đang soi bằng chứng
                            </span>
                          )}
                        </div>
                        {tfChecked && (
                          <div className="text-[11px] text-slate-600 mt-1">
                            💡 <span className="font-bold text-teal-700">Dẫn chứng:</span> {item.evidence}
                          </div>
                        )}
                      </td>

                      {/* True Button */}
                      <td className="p-3.5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            setTfAnswers(prev => ({ ...prev, [item.q]: true }));
                          }}
                          className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                            chosen === true
                              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          T
                        </button>
                      </td>

                      {/* False Button */}
                      <td className="p-3.5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            setTfAnswers(prev => ({ ...prev, [item.q]: false }));
                          }}
                          className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                            chosen === false
                              ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          F
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCheckTf}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra đáp án True / False</span>
            </button>

            {tfChecked && (
              <button
                onClick={handleResetTf}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LET'S WRITE (TRANG 15) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 15 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's write (Tập viết đoạn văn giới thiệu bản thân & 2 người bạn)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy điền các thông tin của mình vào ô trống. Hệ thống sẽ ghép thành bài văn mẫu hoàn chỉnh và phát âm chuẩn bản xứ!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-teal-600" />
                <span>Nhập thông tin của bé:</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Tên của bé:</label>
                  <input
                    type="text"
                    value={writeForm.name}
                    onChange={e => setWriteForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-teal-500"
                    placeholder="Ví dụ: An, Linh, Nam..."
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Số tuổi:</label>
                  <input
                    type="text"
                    value={writeForm.age}
                    onChange={e => setWriteForm(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-teal-500"
                    placeholder="9"
                  />
                </div>
              </div>

              {/* Friend 1 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-indigo-700 block">Bạn thứ nhất:</span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={writeForm.friend1Name}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend1Name: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                    placeholder="Tên bạn 1"
                  />
                  <select
                    value={writeForm.friend1Gender}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend1Gender: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  >
                    <option value="He">He (Cậu ấy)</option>
                    <option value="She">She (Cô ấy)</option>
                  </select>
                  <select
                    value={writeForm.friend1Country}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend1Country: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  >
                    <option value="America">America 🇺🇸</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Britain">Britain 🇬🇧</option>
                    <option value="Japan">Japan 🇯🇵</option>
                  </select>
                </div>
              </div>

              {/* Friend 2 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-indigo-700 block">Bạn thứ hai:</span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={writeForm.friend2Name}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend2Name: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                    placeholder="Tên bạn 2"
                  />
                  <select
                    value={writeForm.friend2Gender}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend2Gender: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  >
                    <option value="She">She (Cô ấy)</option>
                    <option value="He">He (Cậu ấy)</option>
                  </select>
                  <select
                    value={writeForm.friend2Country}
                    onChange={e => setWriteForm(prev => ({ ...prev, friend2Country: e.target.value }))}
                    className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold"
                  >
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="America">America 🇺🇸</option>
                    <option value="Britain">Britain 🇬🇧</option>
                    <option value="Singapore">Singapore 🇸🇬</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Rendered Paragraph Card */}
            <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl border-2 border-teal-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                  <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wide">
                    Bài viết hoàn chỉnh của bé:
                  </span>
                  <span className="text-2xl">📝 ✨</span>
                </div>

                <div className="text-base font-bold text-slate-800 leading-relaxed space-y-2 bg-white p-4 rounded-xl border border-teal-100 shadow-2xs">
                  <p>
                    Hi. My name is <span className="text-teal-700 underline font-black">{writeForm.name || '_______'}</span>. I am <span className="text-teal-700 underline font-black">{writeForm.age || '___'}</span> years old. I am from Viet Nam.
                  </p>
                  <p>
                    This is my friend, <span className="text-teal-700 underline font-black">{writeForm.friend1Name || '_______'}</span>. {writeForm.friend1Gender} is from <span className="text-teal-700 underline font-black">{writeForm.friend1Country}</span>.
                  </p>
                  <p>
                    And this is <span className="text-teal-700 underline font-black">{writeForm.friend2Name || '_______'}</span>. {writeForm.friend2Gender} is from <span className="text-teal-700 underline font-black">{writeForm.friend2Country}</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleReadWrittenParagraph}
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Bấm để nghe đọc to bài văn</span>
                </button>

                <button
                  onClick={handleCopyParagraph}
                  className="px-4 py-3 bg-white hover:bg-slate-100 text-teal-900 border border-teal-300 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors"
                  title="Sao chép đoạn văn"
                >
                  <Copy className="w-4 h-4" />
                  <span>{hasCopiedParagraph ? 'Đã chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: PUPIL CARDS PROJECT (TRANG 15) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 6 (Trang 15 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Project: Pupil Cards (Dự Án: Thiết Kế Thẻ Học Sinh Toàn Cầu)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy tự tay thiết kế một tấm Thẻ Học Sinh Quốc Tế có hình ảnh, quốc kỳ và thông tin của mình. Bé có thể bấm <strong>"Lật mặt thẻ"</strong> để xem sở thích tiếng Anh nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Sample Model (Bạn Minh trong SGK) */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-600 uppercase">
                  Thẻ mẫu trong SGK: Bạn Minh
                </span>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                  PUPIL CARD
                </span>
              </div>

              {/* Minh's Card Frame */}
              <div className="rounded-2xl border-2 border-blue-400 bg-white shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white p-2.5 text-center text-xs font-black tracking-wider uppercase">
                  International Student Card
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="text-center space-y-1">
                    <div className="w-16 h-16 rounded-xl bg-red-100 text-3xl flex items-center justify-center border-2 border-red-300 mx-auto">
                      👦
                    </div>
                    <span className="text-2xl filter drop-shadow">🇻🇳</span>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm font-bold text-slate-800">
                    <div>
                      <span className="text-slate-500 font-normal">Name: </span> Minh
                    </div>
                    <div>
                      <span className="text-slate-500 font-normal">Age: </span> 9
                    </div>
                    <div>
                      <span className="text-slate-500 font-normal">Country: </span> Viet Nam
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Pupil Card Maker for the student */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-black text-amber-900 uppercase">
                  Thẻ học sinh của bé ({isCardFlipped ? 'Mặt sau: Sở thích' : 'Mặt trước'}):
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsCardFlipped(!isCardFlipped);
                  }}
                  className="text-xs font-bold text-amber-900 hover:text-amber-950 px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isCardFlipped ? 'Xem mặt trước' : 'Lật mặt sau'}</span>
                </button>
              </div>

              {/* Student's Custom Card */}
              <div className="rounded-2xl border-2 border-amber-400 bg-white shadow-lg overflow-hidden transition-all duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2.5 text-center text-xs font-black tracking-wider uppercase">
                  Global Success Pupil Card
                </div>

                {!isCardFlipped ? (
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-center space-y-1">
                      <div className="w-16 h-16 rounded-xl bg-amber-100 text-3xl flex items-center justify-center border-2 border-amber-300 mx-auto">
                        {pupilCard.avatar}
                      </div>
                      <span className="text-2xl filter drop-shadow">{pupilCard.flag}</span>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-800 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-normal text-xs w-12">Name:</span>
                        <input
                          type="text"
                          value={pupilCard.name}
                          onChange={e => setPupilCard(prev => ({ ...prev, name: e.target.value }))}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900 w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-normal text-xs w-12">Age:</span>
                        <input
                          type="text"
                          value={pupilCard.age}
                          onChange={e => setPupilCard(prev => ({ ...prev, age: e.target.value }))}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900 w-16"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-normal text-xs w-12">Country:</span>
                        <select
                          value={pupilCard.country}
                          onChange={e => {
                            const val = e.target.value;
                            const flag = val === 'Viet Nam' ? '🇻🇳' : val === 'America' ? '🇺🇸' : val === 'Australia' ? '🇦🇺' : val === 'Britain' ? '🇬🇧' : '🇯🇵';
                            setPupilCard(prev => ({ ...prev, country: val, flag }));
                          }}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900"
                        >
                          <option value="Viet Nam">Viet Nam 🇻🇳</option>
                          <option value="America">America 🇺🇸</option>
                          <option value="Australia">Australia 🇦🇺</option>
                          <option value="Britain">Britain 🇬🇧</option>
                          <option value="Japan">Japan 🇯🇵</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-2 text-xs font-bold text-slate-800">
                    <div>
                      <span className="text-slate-500 font-normal">Hobby (Sở thích): </span>
                      <input
                        type="text"
                        value={pupilCard.hobby}
                        onChange={e => setPupilCard(prev => ({ ...prev, hobby: e.target.value }))}
                        className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900 w-full mt-1"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500 font-normal">Motto (Châm ngôn kết bạn): </span>
                      <input
                        type="text"
                        value={pupilCard.motto}
                        onChange={e => setPupilCard(prev => ({ ...prev, motto: e.target.value }))}
                        className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900 w-full mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar Selector */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-600">Chọn Avatar:</span>
                {['👦', '👧', '🧑‍🎓', '👩‍🦰', '🧒', '🦸', '🧙'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => {
                      sound.playClick();
                      setPupilCard(prev => ({ ...prev, avatar: emoji }));
                    }}
                    className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center border transition-all ${
                      pupilCard.avatar === emoji ? 'bg-amber-200 border-amber-500 scale-110' : 'bg-white border-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Read Aloud Pupil Card Button */}
              <button
                onClick={handleReadPupilCardSpeech}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4 fill-slate-950" />
                <span>Trình Bày Thẻ Bằng Tiếng Anh (Có Thưởng Sao ⭐)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 7: SIÊU ĐỐ VUI (MINI-GAME) ================= */}
      {activeSection === 7 && (
        <Unit1Lesson3Quiz speechRate={localSpeed} onAddStar={onAddStar} />
      )}
    </div>
  );
};
