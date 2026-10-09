import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  Check,
  RotateCcw,
  Sparkles,
  Music,
  MapPin,
  Award,
  Heart,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit1MemoryBooster } from './unit1/Unit1MemoryBooster';
import { Unit1MiniGame } from './unit1/Unit1MiniGame';

interface Unit1Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit1Lesson1Studio: React.FC<Unit1Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullParentHandbook, setShowFullParentHandbook] = useState<boolean>(false);

  // ---------- ACTIVITY 1: LOOK, LISTEN & REPEAT ----------
  const [dialogAPlaying, setDialogAPlaying] = useState<boolean>(false);
  const [dialogBPlaying, setDialogBPlaying] = useState<boolean>(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setDialogAPlaying(true);
    setActiveSpeaker('Minh');
    await speakWord("Hello. I'm Minh. I'm from Viet Nam. Where are you from?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Mary');
    await speakWord("Hello, Minh. I'm Mary. I'm from America.", speechRate);

    setActiveSpeaker(null);
    setDialogAPlaying(false);
    sound.playStar();
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setDialogBPlaying(true);
    setActiveSpeaker('Lucy');
    await speakWord("Hi. I'm Lucy. I'm from Britain. Where are you from?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Ben');
    await speakWord("Hi, Lucy. I'm Ben. I'm from Australia.", speechRate);

    setActiveSpeaker(null);
    setDialogBPlaying(false);
    sound.playStar();
    onAddStar(2);
  };

  // ---------- ACTIVITY 2: LISTEN, POINT & SAY ----------
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('a');
  const [isPointSpeaking, setIsPointSpeaking] = useState<boolean>(false);

  const countries = [
    {
      key: 'a',
      name: 'Britain',
      ipa: '/ˈbrɪtn/',
      readingVi: 'BRIT-từn',
      syllables: 'Brit - ain (Nhấn âm BRIT)',
      parentTip: 'Nhấn mạnh âm BRIT, đuôi đọc từn nhẹ (/tn/). Tuyệt đối không đọc bờ-ri-tanh hay bơ-ri-tơn.',
      nameVi: 'Nước Anh (Vương quốc Anh)',
      character: 'Lucy',
      characterRole: 'Cô bé tóc vàng đáng yêu đến từ London',
      flag: '🇬🇧',
      landmark: 'Tháp Đồng Hồ Big Ben (London)',
      landmarkEmoji: '🕰️',
      sampleQuestion: 'Where are you from?',
      sampleQuestionIpa: '/weər ɑː juː frɒm/',
      sampleQuestionReading: 'We-ơ r-a iu ph-rom?',
      sampleAnswer: "I'm from Britain.",
      sampleAnswerIpa: "/aɪm frəm ˈbrɪtn/",
      sampleAnswerReading: 'Ai-m ph-rơm BRIT-từn.'
    },
    {
      key: 'b',
      name: 'Viet Nam',
      ipa: '/ˌvjet ˈnæm/',
      readingVi: 'Vi-et NAM',
      syllables: 'Viet - Nam (Nhấn âm NAM)',
      parentTip: 'Đọc tự nhiên, âm Nam khép môi /m/ nhẹ nhàng, nhắc con có "I\'m" (/aɪm/) đầy đủ.',
      nameVi: 'Việt Nam',
      character: 'Minh',
      characterRole: 'Cậu bạn học sinh năng động đến từ Hà Nội',
      flag: '🇻🇳',
      landmark: 'Khuê Văn Các & Tháp Rùa (Hà Nội)',
      landmarkEmoji: '🏛️',
      sampleQuestion: 'Where are you from?',
      sampleQuestionIpa: '/weər ɑː juː frɒm/',
      sampleQuestionReading: 'We-ơ r-a iu ph-rom?',
      sampleAnswer: "I'm from Viet Nam.",
      sampleAnswerIpa: "/aɪm frəm ˌvjet ˈnæm/",
      sampleAnswerReading: 'Ai-m ph-rơm Vi-et NAM.'
    },
    {
      key: 'c',
      name: 'America',
      ipa: '/əˈmerɪkə/',
      readingVi: 'Ờ-ME-ri-kơ',
      syllables: 'A - mer - i - ca (Nhấn âm ME)',
      parentTip: 'Trọng âm rơi vào chữ "ME" (đọc cao và rõ: Ờ-ME-ri-kơ). Không đọc đều đều là a-me-ri-ca theo tiếng Việt.',
      nameVi: 'Nước Mỹ (Hoa Kỳ)',
      character: 'Mary',
      characterRole: 'Bạn gái thân thiện đến từ nước Mỹ',
      flag: '🇺🇸',
      landmark: 'Tượng Nữ Thần Tự Do (New York)',
      landmarkEmoji: '🗽',
      sampleQuestion: 'Where are you from?',
      sampleQuestionIpa: '/weər ɑː juː frɒm/',
      sampleQuestionReading: 'We-ơ r-a iu ph-rom?',
      sampleAnswer: "I'm from America.",
      sampleAnswerIpa: "/aɪm frəm əˈmerɪkə/",
      sampleAnswerReading: 'Ai-m ph-rơm Ờ-ME-ri-kơ.'
    },
    {
      key: 'd',
      name: 'Australia',
      ipa: '/ɒˈstreɪliə/',
      readingVi: 'O-STREI-li-ơ',
      syllables: 'Aus - tra - li - a (Nhấn âm STREI)',
      parentTip: 'Âm đầu là /ɒ/ tròn môi ("O"), nhấn mạnh vào vần "STREI", chữ lia lướt thành li-ơ nhẹ nhàng. Không đọc ô-xtrây-li-a.',
      nameVi: 'Nước Úc (Ô-xtrây-li-a)',
      character: 'Ben',
      characterRole: 'Cậu bạn tóc xoăn thông thái đến từ Sydney',
      flag: '🇦🇺',
      landmark: 'Nhà Hát Con Sò Sydney Opera House',
      landmarkEmoji: '🎭',
      sampleQuestion: 'Where are you from?',
      sampleQuestionIpa: '/weər ɑː juː frɒm/',
      sampleQuestionReading: 'We-ơ r-a iu ph-rom?',
      sampleAnswer: "I'm from Australia.",
      sampleAnswerIpa: "/aɪm frəm ɒˈstreɪliə/",
      sampleAnswerReading: 'Ai-m ph-rơm O-STREI-li-ơ.'
    }
  ];

  const handlePointAndSay = async (country: typeof countries[0]) => {
    sound.playClick();
    setSelectedCountryKey(country.key);
    setIsPointSpeaking(true);

    // Speak Question
    await speakWord('Where are you from?', speechRate);
    await new Promise(r => setTimeout(r, 400));

    // Speak Answer
    await speakWord(country.sampleAnswer, speechRate);
    setIsPointSpeaking(false);
    onAddStar(1);
  };

  // ---------- ACTIVITY 4: LISTEN AND NUMBER ----------
  const [listenOrder, setListenOrder] = useState<{ [char: string]: number | null }>({
    minh: null,
    ben: null,
    mary: null,
    lucy: null
  });
  const [activity4Checked, setActivity4Checked] = useState<boolean>(false);
  const [activity4Score, setActivity4Score] = useState<number>(0);

  // Official Track 8 Audio Simulation script
  const track8Script = [
    {
      num: 1,
      text: "One. Hi, I'm Lucy. I'm from Britain.",
      ipa: "/wʌn. haɪ, aɪm ˈluːsi. aɪm frəm ˈbrɪtn/",
      readingVi: "Oăn. Hai, ai-m Lu-xi. Ai-m ph-rơm BRIT-từn.",
      meaningVi: "Số 1: Chào cậu, tớ là Lucy. Tớ đến từ nước Anh.",
      charKey: 'lucy',
      country: 'Britain',
      flag: '🇬🇧',
      clue: 'Từ khóa bắt tai: "Lucy" + "Britain" (Hình bạn Lucy cờ Anh d)'
    },
    {
      num: 2,
      text: "Two. Hello, I'm Minh. I'm from Viet Nam.",
      ipa: "/tuː. həˈləʊ, aɪm mɪŋ. aɪm frəm ˌvjet ˈnæm/",
      readingVi: "Tu. Hơ-LÂU, ai-m Minh. Ai-m ph-rơm Vi-et NAM.",
      meaningVi: "Số 2: Xin chào, tớ là Minh. Tớ đến từ Việt Nam.",
      charKey: 'minh',
      country: 'Viet Nam',
      flag: '🇻🇳',
      clue: 'Từ khóa bắt tai: "Minh" + "Viet Nam" (Hình bạn Minh cờ Việt Nam a)'
    },
    {
      num: 3,
      text: "Three. Hi, I'm Ben. I'm from Australia.",
      ipa: "/θriː. haɪ, aɪm ben. aɪm frəm ɒˈstreɪliə/",
      readingVi: "Th-ri. Hai, ai-m Ben. Ai-m ph-rơm O-STREI-li-ơ.",
      meaningVi: "Số 3: Chào cậu, tớ là Ben. Tớ đến từ nước Úc.",
      charKey: 'ben',
      country: 'Australia',
      flag: '🇦🇺',
      clue: 'Từ khóa bắt tai: "Ben" + "Australia" (Hình bạn Ben cờ Úc b)'
    },
    {
      num: 4,
      text: "Four. Hello, I'm Mary. I'm from America.",
      ipa: "/fɔː. həˈləʊ, aɪm ˈmeəri. aɪm frəm əˈmerɪkə/",
      readingVi: "Pho. Hơ-LÂU, ai-m Me-ri. Ai-m ph-rơm Ờ-ME-ri-kơ.",
      meaningVi: "Số 4: Xin chào, tớ là Mary. Tớ đến từ nước Mỹ.",
      charKey: 'mary',
      country: 'America',
      flag: '🇺🇸',
      clue: 'Từ khóa bắt tai: "Mary" + "America" (Hình bạn Mary cờ Mỹ c)'
    }
  ];

  const playFullTrack8 = async () => {
    sound.playClick();
    for (const item of track8Script) {
      await speakWord(item.text, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 650));
    }
  };

  const playSingleTrack = async (text: string) => {
    sound.playClick();
    await speakWord(text, speechRate);
  };

  const handleCheckActivity4 = () => {
    // Correct order: 1: Lucy (d), 2: Minh (a), 3: Ben (b), 4: Mary (c)
    const correctMap: Record<string, number> = {
      lucy: 1,
      minh: 2,
      ben: 3,
      mary: 4
    };

    let score = 0;
    Object.keys(correctMap).forEach(k => {
      if (listenOrder[k] === correctMap[k]) score++;
    });

    setActivity4Score(score);
    setActivity4Checked(true);

    if (score === 4) {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      onAddStar(8);
    } else {
      sound.playWrong();
    }
  };

  // ---------- ACTIVITY 5: LOOK, COMPLETE AND READ ----------
  const [fillAnswers, setFillAnswers] = useState<{ [q: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  const fillCorrectAnswers: Record<number, string> = {
    1: 'Viet Nam',
    2: 'from America',
    3: 'Britain',
    4: 'from Australia'
  };

  const handleCheckFill = () => {
    const isAllCorrect = Object.keys(fillCorrectAnswers).every(
      k => fillAnswers[Number(k)]?.toLowerCase().trim() === fillCorrectAnswers[Number(k)].toLowerCase()
    );

    setFillChecked(true);
    if (isAllCorrect) {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
      onAddStar(8);
    } else {
      sound.playWrong();
    }
  };

  // ---------- ACTIVITY 6: LET'S SING ----------
  const [isSinging, setIsSinging] = useState<boolean>(false);
  const [currentSongLine, setCurrentSongLine] = useState<number>(-1);

  const songLyrics = [
    {
      en: "Hello. I'm Minh.",
      ipa: "/həˈləʊ. aɪm mɪŋ/",
      readingVi: "Hơ-LÂU. Ai-m Minh.",
      vi: "Xin chào, tớ là Minh."
    },
    {
      en: "I'm from Viet Nam.",
      ipa: "/aɪm frəm ˌvjet ˈnæm/",
      readingVi: "Ai-m ph-rơm Vi-et NAM.",
      vi: "Tớ đến từ Việt Nam."
    },
    {
      en: "Hello, Lucy. Where are you from?",
      ipa: "/həˈləʊ, ˈluːsi. weər ɑː juː frɒm/",
      readingVi: "Hơ-LÂU, Lu-xi. We-ơ r-a iu ph-rom?",
      vi: "Chào Lucy, cậu đến từ đâu?"
    },
    {
      en: "I'm from Britain.",
      ipa: "/aɪm frəm ˈbrɪtn/",
      readingVi: "Ai-m ph-rơm BRIT-từn.",
      vi: "Tớ đến từ nước Anh."
    },
    {
      en: "Hello, Mary. Where are you from?",
      ipa: "/həˈləʊ, ˈmeəri. weər ɑː juː frɒm/",
      readingVi: "Hơ-LÂU, Me-ri. We-ơ r-a iu ph-rom?",
      vi: "Chào Mary, cậu đến từ đâu?"
    },
    {
      en: "I'm from America.",
      ipa: "/aɪm frəm əˈmerɪkə/",
      readingVi: "Ai-m ph-rơm Ờ-ME-ri-kơ.",
      vi: "Tớ đến từ nước Mỹ."
    },
    {
      en: "Hello, Ben. Where are you from?",
      ipa: "/həˈləʊ, ben. weər ɑː juː frɒm/",
      readingVi: "Hơ-LÂU, Ben. We-ơ r-a iu ph-rom?",
      vi: "Chào Ben, cậu đến từ đâu?"
    },
    {
      en: "I'm from Australia.",
      ipa: "/aɪm frəm ɒˈstreɪliə/",
      readingVi: "Ai-m ph-rơm O-STREI-li-ơ.",
      vi: "Tớ đến từ nước Úc."
    }
  ];

  const playSong = async () => {
    if (isSinging) return;
    sound.playClick();
    setIsSinging(true);

    for (let i = 0; i < songLyrics.length; i++) {
      setCurrentSongLine(i);
      await speakWord(songLyrics[i].en, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 380));
    }

    setCurrentSongLine(-1);
    setIsSinging(false);
    sound.playVictory();
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    onAddStar(10);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 10 & 11 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500/80 backdrop-blur-md rounded-full text-xs font-black shadow-sm">
              <span>👩‍🏫 Giọng Nữ Cô Leda (Vang Sáng · Mặc Định ⭐)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-500/70 backdrop-blur-md rounded-full text-xs font-bold">
              <span>🇬🇧 Phiên Âm Anh - Anh (RP)</span>
            </span>
            {onOpenVoiceStudio && (
              <button
                onClick={onOpenVoiceStudio}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-indigo-900 hover:bg-sky-50 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                <Sliders className="w-3 h-3 text-pink-600" />
                <span>Tùy chỉnh độ vang</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400 hover:bg-emerald-300 text-slate-900 rounded-full text-xs font-black transition-all shadow-md active:scale-95"
              >
                <span>🚀 Tiết 2 (Trang 12 - 13) ➔</span>
              </button>
            )}
            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-400 hover:bg-teal-300 text-slate-900 rounded-full text-xs font-black transition-all shadow-md active:scale-95"
              >
                <span>🎯 Tiết 3 (Trang 14 - 15) ➔</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 1: My Friends — Lesson 1
          </h1>
          <p className="text-sm sm:text-base text-sky-100 mt-2 font-medium">
            Học chuẩn 6 hoạt động sách giáo khoa với <strong>phiên âm quốc tế IPA</strong>, <strong>gợi ý phát âm tiếng Việt</strong> và <strong>mẹo vàng cho cha mẹ hướng dẫn con</strong> nói tiếng Anh tự tin tại nhà.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🇻🇳 Viet Nam</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🇬🇧 Britain</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🇺🇸 America</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🇦🇺 Australia</span>
          </div>
        </div>

        {/* Global Controls inside Banner */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle IPA & Reading hints */}
            <button
              onClick={() => setShowPhoneticDetails(!showPhoneticDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showPhoneticDetails
                  ? 'bg-amber-400 text-slate-900 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🇬🇧 Phiên âm Anh - Anh (BrE)</span>
              <span>{showPhoneticDetails ? 'Đang bật' : 'Tắt'}</span>
            </button>

            {/* Toggle Parent Tips */}
            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showParentGuides
                  ? 'bg-rose-500 text-white font-extrabold ring-2 ring-white/50'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Mẹo phụ huynh dạy con</span>
              <span>{showParentGuides ? 'Đang bật' : 'Tắt'}</span>
            </button>
          </div>

          <button
            onClick={() => setShowFullParentHandbook(!showFullParentHandbook)}
            className="px-4 py-1.5 bg-white text-indigo-900 hover:bg-amber-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showFullParentHandbook ? 'Ẩn Cẩm nang tra cứu' : '📖 Mở Cẩm nang phát âm cho Bố Mẹ'}</span>
            {showFullParentHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🌏
        </div>
      </div>

      {/* ================= VISUAL MEMORY BOOSTER (BÍ KÍP 3 GIÂY GHI NHỚ) ================= */}
      <Unit1MemoryBooster speechRate={speechRate} onAddStar={onAddStar} />

      {/* ================= COMPREHENSIVE PARENT PRONUNCIATION HANDBOOK MODAL / ACCORDION ================= */}
      {showFullParentHandbook && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 sm:p-8 shadow-xl space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-4 border-b border-indigo-100">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl text-2xl">
                👨‍👩‍👧‍👦
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Cẩm Nang Phát Âm & Đồng Hành Dành Cho Phụ Huynh (Bài 1)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Giúp bố mẹ dù không giỏi tiếng Anh vẫn tự tin hướng dẫn con phát âm chuẩn bản xứ, không nói ngọng và sửa ngay lỗi nuốt âm.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFullParentHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Thu gọn ✕
            </button>
          </div>

          {/* Quick Lookup Table: 4 Countries & Key Words */}
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>1. Bảng Tra Cứu Phiên Âm & Khẩu Hình Miệng Chuẩn Sách Giáo Khoa</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-indigo-50/80 text-indigo-950 font-bold border-b border-indigo-100">
                  <tr>
                    <th className="p-3">Từ / Mẫu câu</th>
                    <th className="p-3">Phiên âm IPA</th>
                    <th className="p-3">Gợi ý đọc cho bố mẹ</th>
                    <th className="p-3">Khẩu hình & Mẹo chỉ cho con</th>
                    <th className="p-3 text-center">Nghe mẫu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      🇬🇧 Britain
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /ˈbrɪtn/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      BRIT-từn
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      Nhấn mạnh vần <strong>Brit</strong>. Đuôi đọc nhẹ "từn" hoặc ngậm âm n. <strong className="text-rose-600">Tuyệt đối không đọc bờ-ri-tanh hay bơ-ri-tơn.</strong>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord('Britain', speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      🇺🇸 America
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /əˈmerɪkə/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      Ờ-ME-ri-kơ
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      Trọng âm rơi vào <strong>me</strong>. Hướng dẫn con đọc rõ vần me: <em>"Ờ-ME-ri-kơ"</em>. Không đọc đều đều "A-me-ri-ca".
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord('America', speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      🇦🇺 Australia
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /ɒˈstreɪliə/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      O-STREI-li-ơ
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      Nhấn mạnh vào <strong>strei</strong>. Âm đầu /ɒ/ tròn môi, đuôi đọc lướt "li-ơ". Không đọc thành "ô-xtrây-li-a".
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord('Australia', speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      🇻🇳 Viet Nam
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /ˌvjet ˈnæm/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      Vi-et NAM
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      Đọc tự nhiên, âm "Nam" ngân nhẹ, khép môi ở âm /m/ cuối từ, không nuốt âm to-be.
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord('Viet Nam', speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      Where are you from?
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /weər ɑː juː frɒm/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      We-ơ r-a iu ph-rom?
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      <strong>Chuẩn Anh - Anh (RP):</strong> Từ <em>Where</em> mở môi tròn "We-ơ" (không đọc "que"). Nối âm sang <em>are</em> đọc thành <em>"We-ơ r-a iu"</em> (âm /juː/ của you). Từ <em>from</em> ở cuối câu nhận trọng âm mạnh có nguyên âm /ɒ/ tròn môi ngắn, đọc là <strong>/frɒm/</strong> ("ph-rom").
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord('Where are you from?', speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      I'm from...
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      /aɪm frəm/
                    </td>
                    <td className="p-3 font-bold text-amber-700 bg-amber-50/40">
                      Ai-m ph-rơm...
                    </td>
                    <td className="p-3 text-[11px] leading-relaxed">
                      <strong className="text-rose-600">Lỗi kinh điển:</strong> Con hay đọc thiếu 'm thành "I from...". Bố mẹ nhắc con khép môi ở chữ "I'm" (/aɪm/), trong câu nói đọc lướt nhẹ là "Ai-m ph-rơm...".
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord("I'm from Viet Nam", speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Golden Pitfalls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Bẫy 1: Quên To-be / 'm</span>
              </div>
              <p className="text-xs text-slate-700">
                Học sinh hay nói: <span className="line-through text-rose-600 font-bold">I from Viet Nam</span>.<br />
                Bố mẹ nhắc: Phải có <strong>I'm</strong> (viết tắt của <em>I am</em>): <strong>I'm from Viet Nam.</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Bẫy 2: Viết hoa tên quốc gia</span>
              </div>
              <p className="text-xs text-slate-700">
                Tất cả tên nước: <strong>Viet Nam, America, Britain, Australia</strong> bắt buộc viết hoa chữ cái đầu. Sai viết hoa sẽ bị trừ điểm bài viết!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Khen ngợi động viên con</span>
              </div>
              <p className="text-xs text-slate-700">
                Khi con phát âm đúng, bố mẹ khen ngay: <br />
                <strong>"Well done! /ˈwel dʌn/"</strong> (Oel đăn - Giỏi quá!) hoặc <strong>"Great job! /ɡreɪt dʒɒb/"</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7 Activity Navigator Quest Stepper */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-indigo-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Bài 1 (Trang 10 - 11 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Chọn chặng để học</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Look, listen & repeat', icon: '🎬', tag: 'Hội thoại' },
            { id: 2, label: '2. Listen, point & say', icon: '🗺️', tag: '4 Quốc gia' },
            { id: 3, label: "3. Let's talk", icon: '💬', tag: 'Hỏi đáp' },
            { id: 4, label: '4. Listen & number', icon: '🎧', tag: 'Track 8' },
            { id: 5, label: '5. Complete & read', icon: '✍️', tag: 'Điền từ' },
            { id: 6, label: "6. Let's sing", icon: '🎤', tag: 'Bài hát' },
            { id: 7, label: "7. Mini-Game Thám Tử", icon: '🎮', tag: 'Thử thách ⭐' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 text-white shadow-md border-transparent scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{act.icon}</span>
              <span>{act.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  activeSection === act.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {act.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 10 SGK - Track 6)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Look, listen and repeat (Quan sát, nghe và nhắc lại)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Bé quan sát cử chỉ hai bạn nhỏ quốc tế, nghe từng câu đối thoại kèm phiên âm tiếng Việt để bố mẹ dễ dàng sửa khẩu hình cho con.
              </p>
            </div>
            <span className="text-xs bg-sky-100 text-sky-800 font-semibold px-3 py-1.5 rounded-full shrink-0">
              Track 6 chuẩn Bộ GD&ĐT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Picture a: Minh & Mary */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-red-500 to-amber-500 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center font-extrabold text-xs">
                      a
                    </span>
                    <span>Minh (Việt Nam 🇻🇳) & Mary (Nước Mỹ 🇺🇸)</span>
                  </div>
                  <button
                    onClick={playDialogA}
                    disabled={dialogAPlaying}
                    className="px-3 py-1 bg-white text-red-700 hover:bg-red-50 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{dialogAPlaying ? 'Đang đọc...' : 'Nghe toàn đoạn a'}</span>
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Visual Avatar Row */}
                  <div className="flex items-center justify-around py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className={`text-center transition-transform ${activeSpeaker === 'Minh' ? 'scale-110' : ''}`}>
                      <div className="w-16 h-16 rounded-2xl bg-red-100 text-3xl flex items-center justify-center mx-auto border-2 border-red-300 shadow-sm">
                        👦
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Minh</div>
                      <div className="text-[11px] text-red-600 font-semibold">Viet Nam 🇻🇳</div>
                    </div>

                    <div className="text-2xl text-slate-300 font-bold">⇌</div>

                    <div className={`text-center transition-transform ${activeSpeaker === 'Mary' ? 'scale-110' : ''}`}>
                      <div className="w-16 h-16 rounded-2xl bg-blue-100 text-3xl flex items-center justify-center mx-auto border-2 border-blue-300 shadow-sm">
                        👱‍♀️
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Mary</div>
                      <div className="text-[11px] text-blue-600 font-semibold">America 🇺🇸</div>
                    </div>
                  </div>

                  {/* Speech Bubble 1: Minh */}
                  <div
                    onClick={() => speakWord("Hello. I'm Minh. I'm from Viet Nam. Where are you from?", speechRate)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeSpeaker === 'Minh'
                        ? 'bg-red-50 border-red-300 shadow-sm ring-2 ring-red-200'
                        : 'bg-slate-50 border-slate-200 hover:border-red-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-red-700">
                      <span className="flex items-center gap-1.5">
                        <span>👦 Bạn Minh nói:</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm để nghe
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      "Hello. I'm Minh. I'm from Viet Nam. Where are you from?"
                    </p>

                    {showPhoneticDetails && (
                      <div className="mt-2 pt-2 border-t border-red-100/80 space-y-1">
                        <div className="text-[11px] font-mono text-indigo-700">
                          /həˈləʊ. aɪm mɪŋ. aɪm frəm ˌvjet ˈnæm. weər ɑː juː frɒm/
                        </div>
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                          🗣️ Gợi ý đọc: "Hơ-LÂU. Ai-m Minh. Ai-m ph-rơm Vi-et NAM. We-ơ r-a iu ph-rom?"
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-1.5 italic">
                      (Nghĩa: Xin chào. Tớ là Minh. Tớ đến từ Việt Nam. Bạn đến từ đâu?)
                    </p>

                    {showParentGuides && (
                      <div className="mt-2.5 p-2.5 bg-white/90 rounded-xl border border-red-200 text-[11px] text-slate-700 leading-relaxed">
                        💡 <strong>Mẹo cho phụ huynh:</strong> Nhắc con khép môi nhẹ khi phát âm âm đuôi chữ <em>I'm</em> (/aɪm/). Cụm <em>Where are you from</em> mở môi tròn mượt mà đọc là <em>"We-ơ r-a iu ph-rom"</em> (/weər ɑː juː frɒm/).
                      </div>
                    )}
                  </div>

                  {/* Speech Bubble 2: Mary */}
                  <div
                    onClick={() => speakWord("Hello, Minh. I'm Mary. I'm from America.", speechRate)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeSpeaker === 'Mary'
                        ? 'bg-blue-50 border-blue-300 shadow-sm ring-2 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>👱‍♀️ Bạn Mary đáp:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm để nghe
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      "Hello, Minh. I'm Mary. I'm from America."
                    </p>

                    {showPhoneticDetails && (
                      <div className="mt-2 pt-2 border-t border-blue-100/80 space-y-1">
                        <div className="text-[11px] font-mono text-indigo-700">
                          /həˈləʊ mɪŋ. aɪm ˈmeəri. aɪm frəm əˈmerɪkə/
                        </div>
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                          🗣️ Gợi ý đọc: "Hơ-LÂU, Minh. Ai-m Me-ri. Ai-m ph-rơm Ờ-ME-ri-kơ."
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-1.5 italic">
                      (Nghĩa: Chào Minh. Tớ là Mary. Tớ đến từ nước Mỹ.)
                    </p>

                    {showParentGuides && (
                      <div className="mt-2.5 p-2.5 bg-white/90 rounded-xl border border-blue-200 text-[11px] text-slate-700 leading-relaxed">
                        💡 <strong>Mẹo cho phụ huynh:</strong> Trọng âm của từ <em>America</em> rơi vào âm thứ hai <strong>me</strong>. Nhắc con đọc rõ vần me: <em>Ờ-me-ri-kơ</em>, tránh đọc đều đều a-me-ri-ca theo chữ cái tiếng Việt.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Picture b: Lucy & Ben */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-white text-indigo-700 flex items-center justify-center font-extrabold text-xs">
                      b
                    </span>
                    <span>Lucy (Nước Anh 🇬🇧) & Ben (Nước Úc 🇦🇺)</span>
                  </div>
                  <button
                    onClick={playDialogB}
                    disabled={dialogBPlaying}
                    className="px-3 py-1 bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{dialogBPlaying ? 'Đang đọc...' : 'Nghe toàn đoạn b'}</span>
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Visual Avatar Row */}
                  <div className="flex items-center justify-around py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className={`text-center transition-transform ${activeSpeaker === 'Lucy' ? 'scale-110' : ''}`}>
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-3xl flex items-center justify-center mx-auto border-2 border-indigo-300 shadow-sm">
                        👧
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Lucy</div>
                      <div className="text-[11px] text-indigo-600 font-semibold">Britain 🇬🇧</div>
                    </div>

                    <div className="text-2xl text-slate-300 font-bold">⇌</div>

                    <div className={`text-center transition-transform ${activeSpeaker === 'Ben' ? 'scale-110' : ''}`}>
                      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-3xl flex items-center justify-center mx-auto border-2 border-amber-300 shadow-sm">
                        🧑‍🦰
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Ben</div>
                      <div className="text-[11px] text-amber-600 font-semibold">Australia 🇦🇺</div>
                    </div>
                  </div>

                  {/* Speech Bubble 1: Lucy */}
                  <div
                    onClick={() => speakWord("Hi. I'm Lucy. I'm from Britain. Where are you from?", speechRate)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeSpeaker === 'Lucy'
                        ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-2 ring-indigo-200'
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                      <span>👧 Bạn Lucy nói:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm để nghe
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      "Hi. I'm Lucy. I'm from Britain. Where are you from?"
                    </p>

                    {showPhoneticDetails && (
                      <div className="mt-2 pt-2 border-t border-indigo-100/80 space-y-1">
                        <div className="text-[11px] font-mono text-indigo-700">
                          /haɪ. aɪm ˈluːsi. aɪm frəm ˈbrɪtn. weər ɑː juː frɒm/
                        </div>
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                          🗣️ Gợi ý đọc: "Hai. Ai-m Lu-xi. Ai-m ph-rơm BRIT-từn. We-ơ r-a iu ph-rom?"
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1.5 italic">
                      (Nghĩa: Chào cậu. Tớ là Lucy. Tớ đến từ nước Anh. Cậu đến từ đâu?)
                    </p>

                    {showParentGuides && (
                      <div className="mt-2.5 p-2.5 bg-white/90 rounded-xl border border-indigo-200 text-[11px] text-slate-700 leading-relaxed">
                        💡 <strong>Mẹo cho phụ huynh:</strong> Từ <em>Britain</em> nhấn vào âm đầu <strong>BRIT</strong>, đuôi "-tain" đọc lướt thành "từn" nhẹ (/tn/). Nhắc con không đọc là bờ-ri-tanh.
                      </div>
                    )}
                  </div>

                  {/* Speech Bubble 2: Ben */}
                  <div
                    onClick={() => speakWord("Hi, Lucy. I'm Ben. I'm from Australia.", speechRate)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      activeSpeaker === 'Ben'
                        ? 'bg-amber-50 border-amber-300 shadow-sm ring-2 ring-amber-200'
                        : 'bg-slate-50 border-slate-200 hover:border-amber-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                      <span>🧑‍🦰 Bạn Ben đáp:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm để nghe
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 mt-1">
                      "Hi, Lucy. I'm Ben. I'm from Australia."
                    </p>

                    {showPhoneticDetails && (
                      <div className="mt-2 pt-2 border-t border-amber-100/80 space-y-1">
                        <div className="text-[11px] font-mono text-indigo-700">
                          /haɪ ˈluːsi. aɪm ben. aɪm frəm ɒˈstreɪliə/
                        </div>
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                          🗣️ Gợi ý đọc: "Hai, Lu-xi. Ai-m Ben. Ai-m ph-rơm O-STREI-li-ơ."
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-1.5 italic">
                      (Nghĩa: Chào Lucy. Tớ là Ben. Tớ đến từ nước Úc.)
                    </p>

                    {showParentGuides && (
                      <div className="mt-2.5 p-2.5 bg-white/90 rounded-xl border border-amber-200 text-[11px] text-slate-700 leading-relaxed">
                        💡 <strong>Mẹo cho phụ huynh:</strong> Cụm <em>Australia</em> có âm "str" hơi chu môi đọc nhanh "s-tr" rồi nhấn mạnh vào <strong>strây</strong>: <em>Ót-strây-li-ơ</em>.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY ================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 10 SGK - Track 7)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen, point and say (Nghe, chỉ tranh và tập nói)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Bấm vào từng lá cờ / kỳ quan để nghe câu hỏi và câu trả lời hoàn chỉnh kèm gợi ý đọc to.
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1.5 rounded-full shrink-0">
              4 Quốc Gia Mục Tiêu
            </span>
          </div>

          {/* Model Formula Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase text-sky-400 tracking-wider">
                Mẫu câu chuẩn cần ghi nhớ:
              </div>
              <div className="text-lg font-mono font-bold text-amber-300 mt-1">
                Where are you from? → I'm from ________.
              </div>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                <span>(We-ơ r-a iu ph-rom? → Ai-m ph-rơm [Tên quốc gia].)</span>
                <span className="text-sky-300">/weər ɑː juː frɒm? → aɪm frəm.../ (Chuẩn Anh - Anh BrE)</span>
              </div>
            </div>

            <button
              onClick={() => speakWord("Where are you from? I'm from Viet Nam. I'm from Britain. I'm from America. I'm from Australia.", speechRate)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe toàn bộ 4 mẫu câu</span>
            </button>
          </div>

          {/* 4 Country Cards Grid with prominent Reading Hints & Parent Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries.map(c => {
              const isSelected = selectedCountryKey === c.key;
              return (
                <div
                  key={c.key}
                  onClick={() => handlePointAndSay(c)}
                  className={`group rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/50 shadow-md ring-2 ring-sky-200'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top: Letter Badge + Flag */}
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-colors text-slate-800 font-extrabold text-sm flex items-center justify-center">
                        {c.key}
                      </span>
                      <span className="text-4xl filter drop-shadow">{c.flag}</span>
                    </div>

                    {/* Landmark & Character */}
                    <div>
                      <div className="text-2xl">{c.landmarkEmoji}</div>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                        {c.name}
                      </h3>
                      <div className="text-xs font-mono text-indigo-700 font-bold">
                        {c.ipa}
                      </div>

                      {/* Prominent Vietnamese Reading Hint */}
                      <div className="mt-1.5 inline-block bg-amber-100 text-amber-900 font-black px-2.5 py-1 rounded-lg text-xs">
                        🗣️ {c.readingVi}
                      </div>

                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {c.nameVi} ({c.character})
                      </p>
                    </div>

                    {/* Syllable Breakdown */}
                    <div className="p-2 bg-slate-100/70 rounded-xl text-[11px] text-slate-600 font-medium">
                      🎼 <strong>Tách âm:</strong> {c.syllables}
                    </div>

                    {/* Famous Landmark Note */}
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                      📍 {c.landmark}
                    </div>

                    {/* Parent Tip inside Card */}
                    {showParentGuides && (
                      <div className="p-2.5 bg-rose-50/80 rounded-xl border border-rose-100 text-[11px] text-rose-900 leading-snug">
                        💡 <strong>Mẹo bố mẹ:</strong> {c.parentTip}
                      </div>
                    )}
                  </div>

                  {/* Audio Button & Full Sentence with British IPA and Reading Guide */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-sky-700">
                      <span className="font-extrabold text-slate-900 text-sm">"{c.sampleAnswer}"</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakWord(c.sampleAnswer, speechRate);
                        }}
                        title="Nghe phát âm chuẩn Anh - Anh"
                        className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-600 hover:text-white text-sky-700 transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* British English IPA */}
                    <div className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50/80 px-2 py-0.5 rounded-md">
                      {c.sampleAnswerIpa}
                    </div>

                    {/* Clean Reading Guide */}
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                      🗣️ Gợi ý đọc: {c.sampleAnswerReading}
                    </div>

                    <div className="text-[11px] text-slate-500 italic">
                      (Nghĩa: Tớ đến từ {c.nameVi})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 10 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's talk (Cùng nhau trò chuyện & Nhập vai cùng con)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bé hãy chọn một người bạn quốc tế hoặc bố mẹ cùng con thực hành hỏi - đáp tại bàn học theo kịch bản gợi ý dưới đây.
            </p>
          </div>

          {/* Dialogue Pattern Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🙋 Người hỏi (Bố / Mẹ hoặc Bé):</span>
              </div>
              <div className="text-base font-black text-slate-900">
                "Where are you from?"
              </div>
              <div className="text-xs font-mono text-purple-700">
                /weər ɑː juː frɒm/ (Anh - Anh)
              </div>
              <div className="text-xs font-bold text-amber-800 bg-white/80 p-2 rounded-lg border border-purple-100">
                🗣️ Gợi ý đọc: "We-ơ r-a iu ph-rom?" (âm tròn môi, đuôi -rom /frɒm/)
              </div>
              <p className="text-xs text-slate-600 italic">
                (Nghĩa: Bạn đến từ đâu?)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🙋‍♂️ Người trả lời (Bé hoặc Bố / Mẹ):</span>
              </div>
              <div className="text-base font-black text-slate-900">
                "I'm from [Tên quốc gia]."
              </div>
              <div className="text-xs font-mono text-emerald-700">
                /aɪm frəm .../ (Anh - Anh)
              </div>
              <div className="text-xs font-bold text-amber-800 bg-white/80 p-2 rounded-lg border border-emerald-100">
                🗣️ Gợi ý đọc: "Ai-m ph-rơm [Vi-et NAM / BRIT-từn / Ờ-ME-ri-kơ / O-STREI-li-ơ]."
              </div>
              <p className="text-xs text-slate-600 italic">
                (Nghĩa: Tớ đến từ [Tên quốc gia].)
              </p>
            </div>
          </div>

          {/* Interactive Camping Scene Simulator */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-green-100 border border-emerald-200 text-center space-y-4">
            <div className="text-5xl">⛺ 🌳 👧 👦 🌲 🎒</div>
            <h3 className="text-lg font-bold text-slate-800">
              Buổi Cắm Trại Kết Bạn Quốc Tế (Camping Party)
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              Các bạn học sinh đang cầm cờ đất nước mình và hào hứng hỏi thăm nhau. Bé hãy bấm vào bạn nhỏ bất kỳ để nghe đối thoại mẫu:
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {countries.map(c => (
                <button
                  key={c.key}
                  onClick={async () => {
                    sound.playClick();
                    await speakWord(`Where are you from, ${c.character}?`, speechRate);
                    await new Promise(r => setTimeout(r, 400));
                    await speakWord(c.sampleAnswer, speechRate);
                    onAddStar(2);
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs sm:text-sm rounded-2xl shadow-sm border border-emerald-200 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>{c.flag}</span>
                  <span>Hỏi bạn {c.character} ({c.name})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Parent-Child 3-Minute Home Challenge */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏱️</span>
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Thử Thách 3 Phút Tại Bàn Học Cùng Con
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  Mẹ cầm điện thoại giơ một lá cờ (🇻🇳/🇬🇧/🇺🇸/🇦🇺), hỏi: <em>"Where are you from?"</em> và đợi con phản xạ thật nhanh câu <em>"I'm from..."</em> nhé!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playVictory();
                onAddStar(5);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow shrink-0"
            >
              ⭐ Hoàn thành thử thách (+5 sao)
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND NUMBER ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Hoạt Động 4 (Trang 11 SGK - Track 8)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen and number (Nghe và đánh số thứ tự từ 1 đến 4)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Bấm nghe toàn bộ bài nghe hoặc từng câu riêng lẻ, sau đó bấm chọn số 1, 2, 3, 4 vào ô tương ứng dưới mỗi bạn.
              </p>
            </div>

            <button
              onClick={playFullTrack8}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe toàn bộ Track 8</span>
            </button>
          </div>

          {/* 4 Clue Sound Buttons with Audio Script Preview */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Bấm nghe từng câu riêng biệt:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {track8Script.map(item => (
                <div
                  key={item.num}
                  className="p-3 bg-slate-50 hover:bg-orange-50/50 rounded-xl border border-slate-200 transition-colors flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-[11px] font-black">
                        #{item.num}
                      </span>
                      <span>"{item.text}"</span>
                    </div>
                    {showPhoneticDetails && (
                      <div className="space-y-0.5 mt-1">
                        <div className="text-[11px] font-mono text-indigo-700 font-bold">
                          {item.ipa}
                        </div>
                        <div className="text-[11px] text-amber-800 font-bold">
                          🗣️ Gợi ý đọc: {item.readingVi}
                        </div>
                        <div className="text-[10px] text-slate-500 italic">
                          → {item.meaningVi}
                        </div>
                      </div>
                    )}
                    {showParentGuides && (
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        💡 {item.clue}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => playSingleTrack(item.text)}
                    className="p-2 bg-white hover:bg-orange-500 hover:text-white text-orange-600 rounded-lg shadow-sm border border-slate-200 transition-colors shrink-0"
                    title={`Nghe câu ${item.num}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Cards to Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'minh', letter: 'a', name: 'Minh', flag: '🇻🇳', country: 'Viet Nam', correct: 2 },
              { key: 'ben', letter: 'b', name: 'Ben', flag: '🇦🇺', country: 'Australia', correct: 3 },
              { key: 'mary', letter: 'c', name: 'Mary', flag: '🇺🇸', country: 'America', correct: 4 },
              { key: 'lucy', letter: 'd', name: 'Lucy', flag: '🇬🇧', country: 'Britain', correct: 1 }
            ].map(item => {
              const chosen = listenOrder[item.key];
              const isCorrect = activity4Checked && chosen === item.correct;
              const isWrong = activity4Checked && chosen !== null && chosen !== item.correct;

              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                    isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : isWrong
                      ? 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center">
                      {item.letter}
                    </span>
                    <span className="text-3xl">{item.flag}</span>
                  </div>

                  <div className="text-center py-2">
                    <div className="text-base font-black text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.country}</div>
                    {activity4Checked && (
                      <div className="mt-1 text-xs font-bold text-orange-600">
                        Đáp án đúng: #{item.correct}
                      </div>
                    )}
                  </div>

                  {/* Number Selection 1-4 */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider mb-1.5">
                      Chọn số thứ tự:
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          onClick={() => {
                            sound.playClick();
                            setListenOrder(prev => ({ ...prev, [item.key]: num }));
                            setActivity4Checked(false);
                          }}
                          className={`py-2 rounded-lg font-black text-xs transition-colors ${
                            chosen === num
                              ? 'bg-orange-500 text-white shadow'
                              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Check button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setListenOrder({ minh: null, ben: null, mary: null, lucy: null });
                setActivity4Checked(false);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa làm lại</span>
            </button>

            <div className="flex items-center gap-3">
              {activity4Checked && (
                <span className={`text-xs font-bold ${activity4Score === 4 ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {activity4Score === 4
                    ? '🎉 Xuất sắc! Con đã điền đúng cả 4/4 bạn!'
                    : `Bé đúng ${activity4Score}/4 câu. Hãy nghe lại các câu sai nhé!`}
                </span>
              )}

              <button
                onClick={handleCheckActivity4}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra đáp án</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 11 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Look, complete and read (Nhìn tranh, hoàn thành câu và đọc to)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bé bấm vào ô chữ gợi ý để điền nhanh vào chỗ trống. Sau khi điền đúng, hãy cùng bố mẹ đọc to câu hoàn chỉnh nhé!
            </p>
          </div>

          {/* 4 Exercises with Pronunciation & Reading guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Minh */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇻🇳</span>
                  <span className="text-xs font-extrabold text-slate-700">1. Minh & Tháp Rùa Hà Nội</span>
                </div>
                <button
                  onClick={() => speakWord("I'm Minh. I'm from Viet Nam.", speechRate)}
                  className="p-1.5 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900">
                I'm Minh. I'm from <span className="text-blue-600 underline font-extrabold">{fillAnswers[1] || '_______'}</span>.
              </div>

              {showPhoneticDetails && (
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-indigo-700">
                    /aɪm mɪŋ. aɪm frəm ˌvjet ˈnæm/
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg">
                    🗣️ Gợi ý đọc to: "Ai-m Minh. Ai-m ph-rơm Vi-et NAM."
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {['Viet Nam', 'America'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      sound.playClick();
                      setFillAnswers(prev => ({ ...prev, 1: opt }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      fillAnswers[1] === opt ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Mary */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="text-xs font-extrabold text-slate-700">2. Mary & Cầu Cổng Vàng</span>
                </div>
                <button
                  onClick={() => speakWord("I'm Mary. I'm from America.", speechRate)}
                  className="p-1.5 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900">
                I'm Mary. I'm <span className="text-blue-600 underline font-extrabold">{fillAnswers[2] || '_______'}</span>.
              </div>

              {showPhoneticDetails && (
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-indigo-700">
                    /aɪm ˈmeəri. aɪm frəm əˈmerɪkə/
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg">
                    🗣️ Gợi ý đọc to: "Ai-m Me-ri. Ai-m ph-rơm Ờ-ME-ri-kơ."
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {['from America', 'from Britain'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      sound.playClick();
                      setFillAnswers(prev => ({ ...prev, 2: opt }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      fillAnswers[2] === opt ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Lucy */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span>
                  <span className="text-xs font-extrabold text-slate-700">3. Lucy & Tháp Big Ben</span>
                </div>
                <button
                  onClick={() => speakWord("Where are you from? I'm from Britain.", speechRate)}
                  className="p-1.5 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900">
                A: Where are you from? <br />
                B: I'm from <span className="text-blue-600 underline font-extrabold">{fillAnswers[3] || '_______'}</span>.
              </div>

              {showPhoneticDetails && (
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-indigo-700">
                    /weər ɑː juː frɒm? - aɪm frəm ˈbrɪtn/
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg">
                    🗣️ Gợi ý đọc to: "We-ơ r-a iu ph-rom? - Ai-m ph-rơm BRIT-từn."
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {['Britain', 'Australia'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      sound.playClick();
                      setFillAnswers(prev => ({ ...prev, 3: opt }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      fillAnswers[3] === opt ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ben */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇦🇺</span>
                  <span className="text-xs font-extrabold text-slate-700">4. Ben & Nhà Hát Con Sò</span>
                </div>
                <button
                  onClick={() => speakWord("Where are you from? I'm from Australia.", speechRate)}
                  className="p-1.5 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              <div className="text-sm font-bold text-slate-900">
                A: Where are you from? <br />
                B: I'm <span className="text-blue-600 underline font-extrabold">{fillAnswers[4] || '_______'}</span>.
              </div>

              {showPhoneticDetails && (
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-indigo-700">
                    /weər ɑː juː frɒm? - aɪm frəm ɒˈstreɪliə/
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg">
                    🗣️ Gợi ý đọc to: "We-ơ r-a iu ph-rom? - Ai-m ph-rơm O-STREI-li-ơ."
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {['from Australia', 'from Viet Nam'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      sound.playClick();
                      setFillAnswers(prev => ({ ...prev, 4: opt }));
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      fillAnswers[4] === opt ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleCheckFill}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra kết quả</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S SING ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Hoạt Động 6 (Trang 11 SGK - Track 9)
              </div>
              <h2 className="text-2xl font-black text-amber-300 mt-0.5">
                Song: "Where are you from?" 🎶
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Cùng nhau hát vang giai điệu bài hát kèm phiên âm nhịp điệu để nhớ mãi mẫu câu chào hỏi quốc tế!
              </p>
            </div>

            <button
              onClick={playSong}
              disabled={isSinging}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Music className={`w-4 h-4 ${isSinging ? 'animate-bounce' : ''}`} />
              <span>{isSinging ? 'Đang hát theo nhạc...' : 'Bắt đầu hát Karaoke!'}</span>
            </button>
          </div>

          {/* Karaoke Lyrics Display with IPA & Vietnamese reading guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {songLyrics.map((line, idx) => {
              const isHighlight = currentSongLine === idx;
              return (
                <div
                  key={idx}
                  onClick={() => speakWord(line.en, speechRate)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isHighlight
                      ? 'bg-pink-500/30 border-pink-400 scale-[1.02] shadow-lg ring-2 ring-pink-300'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-pink-300 font-mono">0{idx + 1}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </div>
                  <div className={`text-base font-extrabold mt-1 ${isHighlight ? 'text-amber-300' : 'text-white'}`}>
                    "{line.en}"
                  </div>
                  <div className="text-[11px] font-mono text-pink-200 mt-0.5">
                    {line.ipa}
                  </div>
                  <div className="text-xs font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded mt-1 inline-block">
                    🗣️ {line.readingVi}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    → {line.vi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 7: MINI-GAME SIÊU THÁM TỬ ================= */}
      {activeSection === 7 && (
        <Unit1MiniGame speechRate={speechRate} onAddStar={onAddStar} />
      )}
    </div>
  );
};
