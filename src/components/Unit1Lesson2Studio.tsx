import React, { useState } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Music,
  HelpCircle,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  Compass,
  AlertTriangle,
  ArrowRight,
  Target
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';

interface Unit1Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit1Lesson2Studio: React.FC<Unit1Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // ---------- ACTIVITY 1: LOOK, LISTEN & REPEAT ----------
  const [dialogAPlaying, setDialogAPlaying] = useState<boolean>(false);
  const [dialogBPlaying, setDialogBPlaying] = useState<boolean>(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setDialogAPlaying(true);
    setActiveSpeaker('Mary');
    await speakWord("Who's that?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord("It's my new friend.", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Mary');
    await speakWord("Where's she from?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord("She's from Japan.", speechRate);

    setActiveSpeaker(null);
    setDialogAPlaying(false);
    sound.playStar();
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setDialogBPlaying(true);
    setActiveSpeaker('Minh');
    await speakWord("Who's that?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Ben');
    await speakWord("It's my new friend.", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Minh');
    await speakWord("Where's he from?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Ben');
    await speakWord("He's from Singapore.", speechRate);

    setActiveSpeaker(null);
    setDialogBPlaying(false);
    sound.playStar();
    onAddStar(2);
  };

  // ---------- ACTIVITY 2: LISTEN, POINT & SAY ----------
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('a');

  const lesson2Countries = [
    {
      key: 'a',
      name: 'Singapore',
      gender: 'he',
      genderLabel: 'Bạn nam (He)',
      ipa: '/ˌsɪŋəˈpɔː/',
      readingVi: 'Sing-gơ-PO',
      syllables: 'Sing - a - pore (Nhấn âm PO)',
      parentTip: 'Nhấn mạnh âm PO ngân dài (/pɔː/), chuẩn Anh - Anh không uốn cong lưỡi r.',
      nameVi: 'Nước Xin-ga-po',
      character: 'Ken',
      characterRole: 'Cậu bé khéo tay đang xây lâu đài cát tại bãi biển',
      flag: '🇸🇬',
      landmark: 'Công Viên Sư Tử Biển Merlion & Marina Bay',
      landmarkEmoji: '🦁',
      sampleQuestion: "Where's he from?",
      sampleQuestionIpa: '/weəz hiː frɒm/',
      sampleQuestionReading: 'We-ơ-z hi ph-rom?',
      sampleAnswer: "He's from Singapore.",
      sampleAnswerIpa: "/hiːz frəm ˌsɪŋəˈpɔː/",
      sampleAnswerReading: 'Hi-z ph-rơm Sing-gơ-PO.'
    },
    {
      key: 'b',
      name: 'Malaysia',
      gender: 'he',
      genderLabel: 'Bạn nam (He)',
      ipa: '/məˈleɪziə/',
      readingVi: 'Mờ-LEI-si-ơ',
      syllables: 'Ma - lay - si - a (Nhấn âm LEI)',
      parentTip: 'Trọng âm rơi vào vần LEI (/leɪ/), đuôi si-ơ đọc lướt nhẹ, dùng "He\'s" cho bạn nam.',
      nameVi: 'Nước Ma-lai-xi-a',
      character: 'Ahmad',
      characterRole: 'Cậu bạn năng động mặc áo vàng cầm cờ Malaysia',
      flag: '🇲🇾',
      landmark: 'Tháp Đôi Petronas Twin Towers (Kuala Lumpur)',
      landmarkEmoji: '🏙️',
      sampleQuestion: "Where's he from?",
      sampleQuestionIpa: '/weəz hiː frɒm/',
      sampleQuestionReading: 'We-ơ-z hi ph-rom?',
      sampleAnswer: "He's from Malaysia.",
      sampleAnswerIpa: "/hiːz frəm məˈleɪziə/",
      sampleAnswerReading: 'Hi-z ph-rơm Mờ-LEI-si-ơ.'
    },
    {
      key: 'c',
      name: 'Thailand',
      gender: 'she',
      genderLabel: 'Bạn nữ (She)',
      ipa: '/ˈtaɪlænd/',
      readingVi: 'TAI-lèn-đ',
      syllables: 'Thai - land (Nhấn âm TAI)',
      parentTip: 'Chữ Th đọc là /t/ bật hơi (như T tiếng Anh), đuôi có âm /d/ chạm đầu lưỡi, dùng "She\'s" cho bạn nữ.',
      nameVi: 'Nước Thái Lan',
      character: 'Mai',
      characterRole: 'Bạn gái tóc thắt bím hai bên giơ tay chữ V đáng yêu',
      flag: '🇹🇭',
      landmark: 'Chùa Vàng Grand Palace & Lễ Hội Loy Krathong',
      landmarkEmoji: '🛕',
      sampleQuestion: "Where's she from?",
      sampleQuestionIpa: '/weəz ʃiː frɒm/',
      sampleQuestionReading: 'We-ơ-z si ph-rom?',
      sampleAnswer: "She's from Thailand.",
      sampleAnswerIpa: "/ʃiːz frəm ˈtaɪlænd/",
      sampleAnswerReading: 'Si-z ph-rơm TAI-lèn-đ.'
    },
    {
      key: 'd',
      name: 'Japan',
      gender: 'she',
      genderLabel: 'Bạn nữ (She)',
      ipa: '/dʒəˈpæn/',
      readingVi: 'Giơ-PĂN',
      syllables: 'Ja - pan (Nhấn âm PĂN)',
      parentTip: 'Chữ J đọc như /dʒ/ bật hơi nhẹ, nhấn mạnh vần PĂN (/pæn/), dùng "She\'s" cho bạn nữ.',
      nameVi: 'Nước Nhật Bản',
      character: 'Akiko',
      characterRole: 'Bạn gái mặc áo Kimono truyền thống xách lồng đèn',
      flag: '🇯🇵',
      landmark: 'Núi Phú Sĩ Núi Tuyết & Hoa Anh Đào Sakura',
      landmarkEmoji: '🗻',
      sampleQuestion: "Where's she from?",
      sampleQuestionIpa: '/weəz ʃiː frɒm/',
      sampleQuestionReading: 'We-ơ-z si ph-rom?',
      sampleAnswer: "She's from Japan.",
      sampleAnswerIpa: "/ʃiːz frəm dʒəˈpæn/",
      sampleAnswerReading: 'Si-z ph-rơm Giơ-PĂN.'
    }
  ];

  const handlePointAndSay = async (country: typeof lesson2Countries[0]) => {
    sound.playClick();
    setSelectedCountryKey(country.key);
    await speakWord(country.sampleQuestion, speechRate);
    await new Promise(r => setTimeout(r, 400));
    await speakWord(country.sampleAnswer, speechRate);
    sound.playStar();
    onAddStar(1);
  };

  // ---------- ACTIVITY 4: LISTEN AND TICK (TRACK 12) ----------
  const [selectedTicks, setSelectedTicks] = useState<{ [qNum: number]: 'a' | 'b' | null }>({
    1: null,
    2: null
  });
  const [activity4Checked, setActivity4Checked] = useState<boolean>(false);
  const [activity4Score, setActivity4Score] = useState<number>(0);

  const track12Script = [
    {
      num: 1,
      text: "One. Where's he from? - He's from Singapore.",
      ipa: "/wʌn. weəz hiː frɒm? - hiːz frəm ˌsɪŋəˈpɔː/",
      readingVi: "Oăn. We-ơ-z hi ph-rom? - Hi-z ph-rơm Sing-gơ-PO.",
      meaningVi: "Câu 1: Cậu ấy đến từ đâu? - Cậu ấy đến từ Singapore.",
      correct: 'b' as const,
      optA: { label: 'Malaysia', flag: '🇲🇾', letter: 'a' as const },
      optB: { label: 'Singapore', flag: '🇸🇬', letter: 'b' as const },
      clue: 'Từ khóa bắt tai: "Where\'s he from?" (bạn nam) + "Singapore" (chọn tranh b cờ Singapore 🇸🇬)'
    },
    {
      num: 2,
      text: "Two. Where's she from? - She's from Thailand.",
      ipa: "/tuː. weəz ʃiː frɒm? - ʃiːz frəm ˈtaɪlænd/",
      readingVi: "Tu. We-ơ-z si ph-rom? - Si-z ph-rơm TAI-lèn-đ.",
      meaningVi: "Câu 2: Bạn gái ấy đến từ đâu? - Bạn ấy đến từ Thái Lan.",
      correct: 'a' as const,
      optA: { label: 'Thailand', flag: '🇹🇭', letter: 'a' as const },
      optB: { label: 'Japan', flag: '🇯🇵', letter: 'b' as const },
      clue: 'Từ khóa bắt tai: "Where\'s she from?" (bạn nữ) + "Thailand" (chọn tranh a cờ Thái Lan 🇹🇭)'
    }
  ];

  const playFullTrack12 = async () => {
    sound.playClick();
    for (const item of track12Script) {
      await speakWord(item.text, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 650));
    }
  };

  const handleCheckActivity4 = () => {
    sound.playClick();
    let score = 0;
    if (selectedTicks[1] === track12Script[0].correct) score++;
    if (selectedTicks[2] === track12Script[1].correct) score++;
    setActivity4Score(score);
    setActivity4Checked(true);

    if (score === 2) {
      sound.playVictory();
      onAddStar(5);
    } else {
      sound.playStar();
      onAddStar(score * 2);
    }
  };

  // ---------- ACTIVITY 5: LOOK, COMPLETE AND READ ----------
  const [fillAnswers, setFillAnswers] = useState<{ [qNum: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [activity5Checked, setActivity5Checked] = useState<boolean>(false);
  const [activity5Score, setActivity5Score] = useState<number>(0);

  const activity5Exercises = [
    {
      num: 1,
      charName: 'Akiko',
      flag: '🇯🇵',
      country: 'Japan',
      avatarEmoji: '👧👘',
      lineA: "A: Where's she from?",
      lineBQuestion: "B: She's from",
      correctFill: 'Japan',
      options: ['Japan', 'Thailand'],
      fullText: "Where's she from? - She's from Japan.",
      ipa: "/weəz ʃiː frɒm? - ʃiːz frəm dʒəˈpæn/",
      readingVi: "We-ơ-z si ph-rom? - Si-z ph-rơm Giơ-PĂN.",
      meaningVi: "A: Bạn ấy đến từ đâu? - B: Bạn ấy đến từ Nhật Bản."
    },
    {
      num: 2,
      charName: 'Ken',
      flag: '🇸🇬',
      country: 'Singapore',
      avatarEmoji: '👦🏖️',
      lineA: "A: Where's he from?",
      lineBQuestion: "B: He's",
      correctFill: 'from Singapore',
      options: ['from Singapore', 'from Malaysia'],
      fullText: "Where's he from? - He's from Singapore.",
      ipa: "/weəz hiː frɒm? - hiːz frəm ˌsɪŋəˈpɔː/",
      readingVi: "We-ơ-z hi ph-rom? - Hi-z ph-rơm Sing-gơ-PO.",
      meaningVi: "A: Cậu ấy đến từ đâu? - B: Cậu ấy đến từ Singapore."
    },
    {
      num: 3,
      charName: 'Mai',
      flag: '🇹🇭',
      country: 'Thailand',
      avatarEmoji: '👧🎀',
      lineA: "A: _______ she from?",
      lineBQuestion: "B: She's",
      correctFill: 'Where’s / from Thailand',
      fillPart1: "Where's",
      fillPart2: "from Thailand",
      options: ['Where’s ... from Thailand', 'Where ... from Malaysia'],
      fullText: "Where's she from? - She's from Thailand.",
      ipa: "/weəz ʃiː frɒm? - ʃiːz frəm ˈtaɪlænd/",
      readingVi: "We-ơ-z si ph-rom? - Si-z ph-rơm TAI-lèn-đ.",
      meaningVi: "A: Bạn ấy đến từ đâu? - B: Bạn ấy đến từ Thái Lan."
    },
    {
      num: 4,
      charName: 'Ahmad',
      flag: '🇲🇾',
      country: 'Malaysia',
      avatarEmoji: '👦🚩',
      lineA: "A: Where's _______?",
      lineBQuestion: "B: _______ Malaysia.",
      correctFill: 'he from / He’s from',
      fillPart1: "he from",
      fillPart2: "He's from",
      options: ['he from ... He’s from', 'she from ... She’s from'],
      fullText: "Where's he from? - He's from Malaysia.",
      ipa: "/weəz hiː frɒm? - hiːz frəm məˈleɪziə/",
      readingVi: "We-ơ-z hi ph-rom? - Hi-z ph-rơm Mờ-LEI-si-ơ.",
      meaningVi: "A: Cậu ấy đến từ đâu? - B: Cậu ấy đến từ Malaysia."
    }
  ];

  const handleCheckActivity5 = () => {
    sound.playClick();
    let score = 0;
    if (fillAnswers[1].toLowerCase().includes('japan')) score++;
    if (fillAnswers[2].toLowerCase().includes('singapore')) score++;
    if (fillAnswers[3].toLowerCase().includes('thailand') || fillAnswers[3].length > 0) score++;
    if (fillAnswers[4].toLowerCase().includes('he') || fillAnswers[4].length > 0) score++;

    setActivity5Score(score);
    setActivity5Checked(true);

    if (score === 4) {
      sound.playVictory();
      onAddStar(5);
    } else {
      sound.playStar();
      onAddStar(score);
    }
  };

  // ---------- ACTIVITY 6: LET'S PLAY - FIND SOMEONE WHO IS FROM... ----------
  const [targetMissionIndex, setTargetMissionIndex] = useState<number>(0);
  const [interviewedStudent, setInterviewedStudent] = useState<number | null>(null);

  const classmates = [
    { id: 1, name: 'Nam', flag: '🇻🇳', country: 'Viet Nam', card: 'Viet Nam', answer: "I'm from Viet Nam.", ipa: "/aɪm frəm ˌvjet ˈnæm/", reading: "Ai-m ph-rơm Vi-et NAM.", avatar: '👦🇻🇳' },
    { id: 2, name: 'Lucy', flag: '🇬🇧', country: 'Britain', card: 'Britain', answer: "I'm from Britain.", ipa: "/aɪm frəm ˈbrɪtn/", reading: "Ai-m ph-rơm BRIT-từn.", avatar: '👧🇬🇧' },
    { id: 3, name: 'Mary', flag: '🇺🇸', country: 'America', card: 'America', answer: "I'm from America.", ipa: "/aɪm frəm əˈmerɪkə/", reading: "Ai-m ph-rơm Ờ-ME-ri-kơ.", avatar: '👱‍♀️🇺🇸' },
    { id: 4, name: 'Ben', flag: '🇦🇺', country: 'Australia', card: 'Australia', answer: "I'm from Australia.", ipa: "/aɪm frəm ɒˈstreɪliə/", reading: "Ai-m ph-rơm O-STREI-li-ơ.", avatar: '🧑‍🦰🇦🇺' },
    { id: 5, name: 'Ken', flag: '🇸🇬', country: 'Singapore', card: 'Singapore', answer: "I'm from Singapore.", ipa: "/aɪm frəm ˌsɪŋəˈpɔː/", reading: "Ai-m ph-rơm Sing-gơ-PO.", avatar: '👦🇸🇬' },
    { id: 6, name: 'Ahmad', flag: '🇲🇾', country: 'Malaysia', card: 'Malaysia', answer: "I'm from Malaysia.", ipa: "/aɪm frəm məˈleɪziə/", reading: "Ai-m ph-rơm Mờ-LEI-si-ơ.", avatar: '👦🇲🇾' },
    { id: 7, name: 'Mai', flag: '🇹🇭', country: 'Thailand', card: 'Thailand', answer: "I'm from Thailand.", ipa: "/aɪm frəm ˈtaɪlænd/", reading: "Ai-m ph-rơm TAI-lèn-đ.", avatar: '👧🇹🇭' },
    { id: 8, name: 'Akiko', flag: '🇯🇵', country: 'Japan', card: 'Japan', answer: "I'm from Japan.", ipa: "/aɪm frəm dʒəˈpæn/", reading: "Ai-m ph-rơm Giơ-PĂN.", avatar: '👧🇯🇵' }
  ];

  const missionCountries = ['Japan', 'Malaysia', 'Singapore', 'Thailand', 'Britain', 'Viet Nam'];
  const currentTargetCountry = missionCountries[targetMissionIndex];

  const handleInterviewClassmate = async (student: typeof classmates[0]) => {
    sound.playClick();
    setInterviewedStudent(student.id);
    await speakWord("Where are you from?", speechRate);
    await new Promise(r => setTimeout(r, 450));
    await speakWord(student.answer, speechRate);

    if (student.country.toLowerCase() === currentTargetCountry.toLowerCase()) {
      sound.playVictory();
      onAddStar(3);
    } else {
      sound.playStar();
      onAddStar(1);
    }
  };

  const nextMission = () => {
    sound.playClick();
    setTargetMissionIndex((prev) => (prev + 1) % missionCountries.length);
    setInterviewedStudent(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= TOP SWITCHER BANNER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 border border-white/20">
                🚀 Tiết 2 · Trang 12 - 13 SGK Tiếng Anh 4
              </span>
              <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black shadow-sm">
                Track 10, 11, 12 Audio
              </span>
              <span className="px-3 py-1 bg-emerald-500/80 text-white rounded-full text-xs font-bold">
                British RP Phonetics (Anh - Anh)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Lesson 2: Where's he / she from? 🌏
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
              Khám phá cách hỏi quê hương của bạn nam <strong>(He's)</strong> và bạn nữ <strong>(She's)</strong>, làm quen với 4 quốc gia Đông Á & Đông Nam Á xinh đẹp: <strong>Singapore 🇸🇬, Malaysia 🇲🇾, Thailand 🇹🇭, Japan 🇯🇵</strong>.
            </p>
          </div>

          {/* Quick Actions: Switch back to Lesson 1 & Open Voice Studio */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 10 - 11)</span>
              </button>
            )}

            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="px-4 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <span>🎯 Sang Tiết 3 (Trang 14 - 15) ➔</span>
              </button>
            )}

            {onOpenVoiceStudio && (
              <button
                onClick={onOpenVoiceStudio}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-current text-amber-700" />
                <span>Phòng Thu Giọng Leda</span>
              </button>
            )}
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= 6 ACTIVITIES NAV STRIP ================= */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 1, label: '1. Look, listen and repeat', track: 'Track 10', icon: '👀' },
            { id: 2, label: '2. Listen, point and say', track: 'Track 11', icon: '👉' },
            { id: 3, label: "3. Let's talk (Lều Trại)", track: 'Phản xạ', icon: '⛺' },
            { id: 4, label: '4. Listen and tick', track: 'Track 12', icon: '🎧' },
            { id: 5, label: '5. Look, complete and read', track: 'Bài tập', icon: '✍️' },
            { id: 6, label: "6. Let's play (Tìm bạn)", track: 'Game', icon: '🎮' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                activeSection === act.id
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{act.icon}</span>
              <span>{act.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                activeSection === act.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {act.track}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= QUICK HANDBOOK & MEMORY SHORTCUTS ================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl">
              💡
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Bí Kíp Trọng Tâm Tiết 2: Phân Biệt "He" (Bạn Nam) & "She" (Bạn Nữ)
              </h3>
              <p className="text-xs text-slate-500">
                Hiểu bản chất bằng mẹo so sánh trực quan, phiên âm Anh - Anh và gợi ý phát âm tiếng Việt chuẩn xác.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFullHandbook(!showFullHandbook)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            {showFullHandbook ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showFullHandbook ? 'Thu gọn bảng tra cứu' : 'Mở rộng bảng tra cứu ngữ âm'}</span>
          </button>
        </div>

        {/* Visual He vs She Dual Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card He */}
          <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">👦</span>
              <span className="text-xs font-extrabold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-md">
                Dành cho BẠN NAM
              </span>
            </div>
            <div className="text-sm font-black text-slate-900">
              Where's he from? ➔ He's from [Tên nước].
            </div>
            <div className="text-xs font-mono text-sky-800 font-bold">
              /weəz hiː frɒm? ➔ hiːz frəm.../ (Anh - Anh)
            </div>
            <div className="text-xs font-bold text-amber-900 bg-white/90 p-2 rounded-lg border border-sky-200">
              🗣️ Gợi ý đọc: "We-ơ-z hi ph-rom? ➔ Hi-z ph-rơm [Tên nước]."
            </div>
            <p className="text-[11px] text-slate-600">
              💡 <em>He's</em> viết tắt của <em>He is</em>, đọc có âm gió /z/ nhẹ ở đuôi (Hi-z).
            </p>
          </div>

          {/* Card She */}
          <div className="p-4 rounded-2xl bg-pink-50 border-2 border-pink-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">👧</span>
              <span className="text-xs font-extrabold bg-pink-200 text-pink-900 px-2 py-0.5 rounded-md">
                Dành cho BẠN NỮ
              </span>
            </div>
            <div className="text-sm font-black text-slate-900">
              Where's she from? ➔ She's from [Tên nước].
            </div>
            <div className="text-xs font-mono text-pink-800 font-bold">
              /weəz ʃiː frɒm? ➔ ʃiːz frəm.../ (Anh - Anh)
            </div>
            <div className="text-xs font-bold text-amber-900 bg-white/90 p-2 rounded-lg border border-pink-200">
              🗣️ Gợi ý đọc: "We-ơ-z si ph-rom? ➔ Si-z ph-rơm [Tên nước]."
            </div>
            <p className="text-[11px] text-slate-600">
              💡 <em>She's</em> viết tắt của <em>She is</em>, âm /ʃ/ cong môi nhẹ (Si-z).
            </p>
          </div>
        </div>

        {/* Detailed 4 Countries Table (Collapsible) */}
        {showFullHandbook && (
          <div className="pt-3 border-t border-slate-100 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Quốc gia</th>
                  <th className="p-3">Phiên âm Anh - Anh</th>
                  <th className="p-3">Gợi ý đọc tiếng Việt</th>
                  <th className="p-3">Mẹo phát âm cho con</th>
                  <th className="p-3 text-center">Nghe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {lesson2Countries.map(c => (
                  <tr key={c.key} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <span>{c.name}</span>
                    </td>
                    <td className="p-3 font-mono text-indigo-700 font-bold">
                      {c.ipa}
                    </td>
                    <td className="p-3 font-bold text-amber-800 bg-amber-50/50">
                      {c.readingVi}
                    </td>
                    <td className="p-3 text-[11px] text-slate-600">
                      {c.parentTip}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => speakWord(c.name, speechRate)}
                        className="p-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 12 SGK - Track 10)
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Look, listen and repeat (Nhìn tranh, nghe và nhắc lại)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Bé hãy quan sát hai bức tranh a và b, bấm vào từng câu thoại để nghe giọng chuẩn hoặc bấm "Nghe toàn đoạn" để luyện tai nghe.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Picture a: Mary, Lucy & Japan friend (Kimono) */}
            <div className="rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center font-black text-xs">
                      a
                    </span>
                    <span>Bạn mới Akiko (Nhật Bản 🇯🇵 mặc Kimono)</span>
                  </div>

                  <button
                    onClick={playDialogA}
                    disabled={dialogAPlaying}
                    className="px-3 py-1 bg-white text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{dialogAPlaying ? 'Đang đọc...' : 'Nghe toàn đoạn a'}</span>
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Visual Scene Banner */}
                  <div className="flex items-center justify-around py-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-rose-100 text-3xl flex items-center justify-center mx-auto border-2 border-rose-300 shadow-sm">
                        👱‍♀️
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Mary</div>
                    </div>
                    <div className="text-xl text-slate-300 font-bold">➔</div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 text-3xl flex items-center justify-center mx-auto border-2 border-amber-300 shadow-sm">
                        👧
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Lucy</div>
                    </div>
                    <div className="text-xl text-slate-300 font-bold">➔</div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-red-100 text-3xl flex items-center justify-center mx-auto border-2 border-red-300 shadow-sm">
                        👘
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Akiko (🇯🇵)</div>
                    </div>
                  </div>

                  {/* Bubble 1: Mary */}
                  <div
                    onClick={() => speakWord("Who's that?", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50/50 border border-slate-200 hover:border-pink-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                      <span>👱‍♀️ Mary hỏi 1:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"Who's that?"</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/huːz ðæt/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Hu-z đát?"
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Ai thế kia?)</p>
                  </div>

                  {/* Bubble 2: Lucy */}
                  <div
                    onClick={() => speakWord("It's my new friend.", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                      <span>👧 Lucy đáp 1:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"It's my new friend."</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/ɪts maɪ njuː frend/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Ít-s mai niu ph-ren-đ."
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Đó là người bạn mới của tớ.)</p>
                  </div>

                  {/* Bubble 3: Mary */}
                  <div
                    onClick={() => speakWord("Where's she from?", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50/50 border border-slate-200 hover:border-pink-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                      <span>👱‍♀️ Mary hỏi 2:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"Where's she from?"</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/weəz ʃiː frɒm/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "We-ơ-z si ph-rom?"
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Bạn gái ấy đến từ đâu thế?)</p>
                  </div>

                  {/* Bubble 4: Lucy */}
                  <div
                    onClick={() => speakWord("She's from Japan.", speechRate)}
                    className="p-3.5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                      <span>👧 Lucy đáp 2:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">"She's from Japan."</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/ʃiːz frəm dʒəˈpæn/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Si-z ph-rơm Giơ-PĂN."
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Bạn ấy đến từ Nhật Bản.)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Picture b: Minh, Ben & Singapore friend (Beach) */}
            <div className="rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-white text-teal-700 flex items-center justify-center font-black text-xs">
                      b
                    </span>
                    <span>Bạn mới Ken (Singapore 🇸🇬 xây lâu đài cát)</span>
                  </div>

                  <button
                    onClick={playDialogB}
                    disabled={dialogBPlaying}
                    className="px-3 py-1 bg-white text-teal-700 hover:bg-teal-50 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{dialogBPlaying ? 'Đang đọc...' : 'Nghe toàn đoạn b'}</span>
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Visual Scene Banner */}
                  <div className="flex items-center justify-around py-3 bg-sky-50/50 rounded-2xl border border-sky-100">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-sky-100 text-3xl flex items-center justify-center mx-auto border-2 border-sky-300 shadow-sm">
                        👦
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Minh</div>
                    </div>
                    <div className="text-xl text-slate-300 font-bold">➔</div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-3xl flex items-center justify-center mx-auto border-2 border-indigo-300 shadow-sm">
                        🧑‍🦰
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Ben</div>
                    </div>
                    <div className="text-xl text-slate-300 font-bold">➔</div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-teal-100 text-3xl flex items-center justify-center mx-auto border-2 border-teal-300 shadow-sm">
                        🏖️
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">Ken (🇸🇬)</div>
                    </div>
                  </div>

                  {/* Bubble 1: Minh */}
                  <div
                    onClick={() => speakWord("Who's that?", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-sky-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-sky-700">
                      <span>👦 Minh hỏi 1:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"Who's that?"</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/huːz ðæt/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Hu-z đát?"
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Ai ở đằng kia thế?)</p>
                  </div>

                  {/* Bubble 2: Ben */}
                  <div
                    onClick={() => speakWord("It's my new friend.", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                      <span>🧑‍🦰 Ben đáp 1:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"It's my new friend."</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/ɪts maɪ njuː frend/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Ít-s mai niu ph-ren-đ."
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Đó là bạn mới của tớ.)</p>
                  </div>

                  {/* Bubble 3: Minh */}
                  <div
                    onClick={() => speakWord("Where's he from?", speechRate)}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-sky-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-sky-700">
                      <span>👦 Minh hỏi 2:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">"Where's he from?"</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/weəz hiː frɒm/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "We-ơ-z hi ph-rom?"
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Cậu ấy đến từ đâu thế?)</p>
                  </div>

                  {/* Bubble 4: Ben */}
                  <div
                    onClick={() => speakWord("He's from Singapore.", speechRate)}
                    className="p-3.5 rounded-2xl bg-teal-50/70 border-2 border-teal-200 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-teal-800">
                      <span>🧑‍🦰 Ben đáp 2:</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Volume2 className="w-3.5 h-3.5" /> Bấm nghe
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">"He's from Singapore."</p>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">/hiːz frəm ˌsɪŋəˈpɔː/ (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: "Hi-z ph-rơm Sing-gơ-PO."
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">(Nghĩa: Cậu ấy đến từ nước Singapore.)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Hoạt Động 2 (Trang 12 SGK - Track 11)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Listen, point and say (Nghe, chỉ vào tranh và nói)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bấm vào từng thẻ quốc gia a, b, c, d để nghe cả câu hỏi và câu trả lời tương ứng với giới tính của nhân vật.
            </p>
          </div>

          {/* Model Formula Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                Mẫu câu chuẩn cần ghi nhớ:
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-amber-300">
                Where's he / she from? ➔ He's / She's from _______.
              </div>
              <div className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
                <span>(We-ơ-z hi/si ph-rom? ➔ Hi-z/Si-z ph-rơm [Tên nước].)</span>
                <span className="text-sky-300">/weəz hiː / ʃiː frɒm? ➔ hiːz / ʃiːz frəm.../ (Anh - Anh)</span>
              </div>
            </div>

            <button
              onClick={() => speakWord("Where's he from? He's from Singapore. He's from Malaysia. Where's she from? She's from Thailand. She's from Japan.", speechRate)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe toàn bộ 4 mẫu câu</span>
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lesson2Countries.map(c => {
              const isSelected = selectedCountryKey === c.key;
              return (
                <div
                  key={c.key}
                  onClick={() => handlePointAndSay(c)}
                  className={`group rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top: Letter Badge + Flag */}
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors text-slate-800 font-extrabold text-sm flex items-center justify-center">
                        {c.key}
                      </span>
                      <span className="text-4xl filter drop-shadow">{c.flag}</span>
                    </div>

                    {/* Character & Country */}
                    <div>
                      <div className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded inline-block">
                        {c.genderLabel}
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                        {c.name}
                      </h3>
                      <div className="text-xs font-mono text-indigo-700 font-bold">
                        {c.ipa}
                      </div>
                      <div className="mt-1 inline-block bg-amber-100 text-amber-900 font-black px-2.5 py-1 rounded-lg text-xs">
                        🗣️ {c.readingVi}
                      </div>
                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {c.nameVi} ({c.character})
                      </p>
                    </div>

                    {/* Landmark & Syllables */}
                    <div className="p-2 bg-slate-100/80 rounded-xl text-[11px] text-slate-600 font-medium">
                      🎼 <strong>Tách âm:</strong> {c.syllables}
                    </div>

                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                      📍 {c.landmarkEmoji} {c.landmark}
                    </div>

                    {showParentGuides && (
                      <div className="p-2.5 bg-rose-50/80 rounded-xl border border-rose-100 text-[11px] text-rose-900 leading-snug">
                        💡 <strong>Mẹo phát âm:</strong> {c.parentTip}
                      </div>
                    )}
                  </div>

                  {/* Audio Button & Full Question + Answer with British IPA */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    {/* Question */}
                    <div className="text-xs text-slate-600">
                      <span className="font-bold text-slate-900">"{c.sampleQuestion}"</span>
                      <div className="text-[10px] font-mono text-indigo-700 font-bold">{c.sampleQuestionIpa}</div>
                      <div className="text-[10px] text-amber-800 font-bold">🗣️ {c.sampleQuestionReading}</div>
                    </div>

                    {/* Answer */}
                    <div className="pt-1 border-t border-dashed border-slate-200">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                        <span className="font-extrabold text-slate-900 text-sm">"{c.sampleAnswer}"</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWord(c.sampleAnswer, speechRate);
                          }}
                          title="Nghe câu đáp chuẩn Anh - Anh"
                          className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors shrink-0"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50/80 px-2 py-0.5 rounded-md mt-1">
                        {c.sampleAnswerIpa}
                      </div>
                      <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 mt-1">
                        🗣️ Gợi ý đọc: {c.sampleAnswerReading}
                      </div>
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
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 12 SGK)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Let's talk (Khu cắm trại kết bạn quốc tế)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Trong bức tranh trang 12 SGK, các bạn nhỏ đang cắm 4 lều trại cờ nước mình. Bố mẹ và bé hãy chọn một bạn nhỏ bất kỳ để cùng nhau hỏi - đáp phản xạ!
            </p>
          </div>

          {/* Dialogue Pattern Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🙋 Người hỏi (Bố / Mẹ hoặc Bé):</span>
              </div>
              <div className="text-base font-black text-slate-900">
                "Where's he / she from?"
              </div>
              <div className="text-xs font-mono text-purple-700 font-bold">
                /weəz hiː / ʃiː frɒm/ (Anh - Anh)
              </div>
              <div className="text-xs font-bold text-amber-800 bg-white/80 p-2 rounded-lg border border-purple-100">
                🗣️ Gợi ý đọc: "We-ơ-z hi / si ph-rom?" (chú ý âm /z/ và /frɒm/ tròn môi)
              </div>
              <p className="text-xs text-slate-600 italic">
                (Nghĩa: Cậu ấy / Cô ấy đến từ đâu?)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>🙋‍♂️ Người trả lời (Bé hoặc Bố / Mẹ):</span>
              </div>
              <div className="text-base font-black text-slate-900">
                "He's / She's from [Tên quốc gia]."
              </div>
              <div className="text-xs font-mono text-emerald-700 font-bold">
                /hiːz / ʃiːz frəm .../ (Anh - Anh)
              </div>
              <div className="text-xs font-bold text-amber-800 bg-white/80 p-2 rounded-lg border border-emerald-100">
                🗣️ Gợi ý đọc: "Hi-z / Si-z ph-rơm [Sing-gơ-PO / Mờ-LEI-si-ơ / TAI-lèn-đ / Giơ-PĂN]."
              </div>
              <p className="text-xs text-slate-600 italic">
                (Nghĩa: Cậu ấy / Cô ấy đến từ [Tên nước].)
              </p>
            </div>
          </div>

          {/* Camping Tents Simulator */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-sky-50 via-emerald-50 to-green-100 border border-emerald-200 text-center space-y-5">
            <div className="text-5xl">⛺ 🌳 🇲🇾 🇹🇭 🇸🇬 🇯🇵 🌲 🎒</div>
            <h3 className="text-lg font-bold text-slate-800">
              4 Lều Trại Quốc Tế Tại Bãi Cỏ Cắm Trại
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              Bé hãy bấm vào từng bạn đứng cạnh lều để nghe đoạn hội thoại mẫu hỏi - đáp tương ứng:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {lesson2Countries.map(c => (
                <button
                  key={c.key}
                  onClick={async () => {
                    sound.playClick();
                    await speakWord(c.sampleQuestion, speechRate);
                    await new Promise(r => setTimeout(r, 400));
                    await speakWord(c.sampleAnswer, speechRate);
                    onAddStar(2);
                  }}
                  className="p-4 bg-white hover:bg-emerald-600 hover:text-white text-slate-800 rounded-2xl shadow-sm border border-emerald-200 transition-all text-left flex flex-col justify-between space-y-2 group active:scale-95"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.flag}</span>
                    <Volume2 className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-700 group-hover:text-emerald-100">
                      Lều {c.name}
                    </div>
                    <div className="text-sm font-black text-slate-900 group-hover:text-white">
                      {c.character} ({c.genderLabel})
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 group-hover:text-emerald-100">
                    "{c.sampleAnswer}"
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND TICK ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Hoạt Động 4 (Trang 13 SGK - Track 12)
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Listen and tick (Nghe và đánh dấu ✓ vào ô đúng)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Bấm nghe toàn bộ bài nghe Track 12 hoặc từng câu, sau đó đánh dấu tick ✓ vào ô a hoặc b dưới mỗi tranh.
              </p>
            </div>

            <button
              onClick={playFullTrack12}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe toàn bộ Track 12</span>
            </button>
          </div>

          {/* Interactive 2 Questions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {track12Script.map(q => (
              <div
                key={q.num}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-xs">
                      #{q.num}
                    </span>
                    <span className="text-sm font-bold text-slate-800">Câu hỏi số {q.num}</span>
                  </div>

                  <button
                    onClick={() => speakWord(q.text, speechRate)}
                    className="p-1.5 bg-white text-orange-600 hover:bg-orange-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                    title={`Nghe câu ${q.num}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe câu {q.num}</span>
                  </button>
                </div>

                {/* 2 Options a and b */}
                <div className="grid grid-cols-2 gap-3">
                  {[q.optA, q.optB].map(opt => {
                    const isSelected = selectedTicks[q.num] === opt.letter;
                    const isCorrect = activity4Checked && opt.letter === q.correct;
                    const isWrong = activity4Checked && isSelected && opt.letter !== q.correct;

                    return (
                      <div
                        key={opt.letter}
                        onClick={() => {
                          sound.playClick();
                          setSelectedTicks(prev => ({ ...prev, [q.num]: opt.letter as 'a' | 'b' }));
                          setActivity4Checked(false);
                        }}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center space-y-2 ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-200'
                            : isWrong
                            ? 'border-rose-400 bg-rose-50 shadow-sm'
                            : isSelected
                            ? 'border-orange-500 bg-orange-50/60 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center">
                            {opt.letter}
                          </span>
                          <span className="text-3xl">{opt.flag}</span>
                        </div>

                        <div className="font-extrabold text-slate-900 text-sm">
                          {opt.label}
                        </div>

                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300 bg-slate-50'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Script & Clue Details with British IPA and Reading Guide */}
                {showPhoneticDetails && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-left">
                    <div className="text-xs font-bold text-slate-800">"{q.text}"</div>
                    <div className="text-[11px] font-mono text-indigo-700 font-bold">{q.ipa} (Anh - Anh)</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                      🗣️ Gợi ý đọc: {q.readingVi}
                    </div>
                    <p className="text-[11px] text-slate-500 italic">→ {q.meaningVi}</p>
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200 mt-1">
                      💡 {q.clue}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Check button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedTicks({ 1: null, 2: null });
                setActivity4Checked(false);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa chọn lại</span>
            </button>

            <div className="flex items-center gap-3">
              {activity4Checked && (
                <span className={`text-xs font-bold ${activity4Score === 2 ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {activity4Score === 2
                    ? '🎉 Xuất sắc! Bé đã nghe và chọn đúng cả 2/2 câu!'
                    : `Bé đúng ${activity4Score}/2 câu. Hãy nghe lại gợi ý nhé!`}
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
              Hoạt Động 5 (Trang 13 SGK)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Look, complete and read (Quan sát tranh, điền từ và đọc to)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bé hãy nhìn lá cờ và nhân vật trong từng tranh, chọn đáp án đúng để hoàn thành các câu đối thoại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activity5Exercises.map(ex => {
              const currentChoice = fillAnswers[ex.num];
              const isCorrect = activity5Checked && currentChoice.toLowerCase().includes(ex.options[0].split(' ')[0].toLowerCase());

              return (
                <div
                  key={ex.num}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                    isCorrect
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : activity5Checked && currentChoice
                      ? 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{ex.flag}</span>
                      <span className="text-xs font-black text-slate-800">
                        {ex.num}. {ex.charName} ({ex.country})
                      </span>
                    </div>

                    <button
                      onClick={() => speakWord(ex.fullText, speechRate)}
                      className="p-1.5 bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-slate-200 text-xs flex items-center gap-1"
                      title="Nghe câu mẫu"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe mẫu</span>
                    </button>
                  </div>

                  {/* Exercise Text Preview */}
                  <div className="text-sm font-bold text-slate-900 space-y-0.5">
                    <div>{ex.lineA}</div>
                    <div>
                      {ex.lineBQuestion}{' '}
                      <span className="text-blue-600 underline font-black">
                        {currentChoice || '_______'}
                      </span>
                    </div>
                  </div>

                  {/* British IPA & Reading Guide */}
                  {showPhoneticDetails && (
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono text-indigo-700 font-bold">
                        {ex.ipa} (Anh - Anh)
                      </div>
                      <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                        🗣️ Gợi ý đọc to: {ex.readingVi}
                      </div>
                      <p className="text-[11px] text-slate-500 italic">→ {ex.meaningVi}</p>
                    </div>
                  )}

                  {/* Choice Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ex.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => {
                          sound.playClick();
                          setFillAnswers(prev => ({ ...prev, [ex.num]: opt }));
                          setActivity5Checked(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          currentChoice === opt
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setFillAnswers({ 1: '', 2: '', 3: '', 4: '' });
                setActivity5Checked(false);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa làm lại</span>
            </button>

            <button
              onClick={handleCheckActivity5}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra kết quả</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S PLAY - FIND SOMEONE WHO IS FROM... ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-indigo-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Hoạt Động 6 (Trang 13 SGK)
              </div>
              <h2 className="text-2xl font-black text-amber-300 mt-0.5">
                Game: "Find someone who is from..." 🔎
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Trò chơi lớp học tương tác: Hãy đi phỏng vấn các bạn cầm thẻ tên quốc gia để tìm đúng bạn theo nhiệm vụ!
              </p>
            </div>

            <button
              onClick={nextMission}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Đổi nhiệm vụ khác</span>
            </button>
          </div>

          {/* Current Mission Target Banner */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              <div>
                <div className="text-xs font-bold uppercase text-amber-300 tracking-wider">
                  Nhiệm vụ của bé:
                </div>
                <div className="text-lg sm:text-xl font-black text-white">
                  Find someone who is from <span className="text-emerald-300 underline font-black">{currentTargetCountry}</span>!
                </div>
                <p className="text-xs text-slate-300">
                  Hãy bấm vào các bạn học sinh dưới đây để hỏi: <em>"Where are you from?"</em> và lắng nghe câu trả lời!
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-200 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-400/30">
              Mục tiêu: {currentTargetCountry}
            </div>
          </div>

          {/* 8 Classmates Interactive Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {classmates.map(st => {
              const isInterviewed = interviewedStudent === st.id;
              const isMatch = isInterviewed && st.country.toLowerCase() === currentTargetCountry.toLowerCase();

              return (
                <div
                  key={st.id}
                  onClick={() => handleInterviewClassmate(st)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 text-center ${
                    isMatch
                      ? 'bg-emerald-500/40 border-emerald-400 scale-105 shadow-xl ring-2 ring-emerald-300'
                      : isInterviewed
                      ? 'bg-white/15 border-white/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/50'
                  }`}
                >
                  <div className="text-3xl filter drop-shadow">{st.avatar}</div>
                  <div>
                    <div className="text-sm font-extrabold text-white">{st.name}</div>
                    <div className="text-[11px] text-amber-300 font-bold bg-white/10 px-2 py-0.5 rounded mt-1 inline-block">
                      Thẻ: {st.card} {st.flag}
                    </div>
                  </div>

                  {isInterviewed && (
                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                      <div className="text-xs font-black text-emerald-300">"{st.answer}"</div>
                      <div className="text-[10px] font-mono text-pink-200">{st.ipa}</div>
                      <div className="text-[10px] font-bold text-amber-200">🗣️ {st.reading}</div>
                    </div>
                  )}

                  <button className="w-full py-1.5 bg-white/10 hover:bg-emerald-500 hover:text-white rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 mt-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Hỏi bạn</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
