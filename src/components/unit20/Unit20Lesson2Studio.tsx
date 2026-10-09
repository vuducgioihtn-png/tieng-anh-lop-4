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
  Users,
  Flame,
  CheckSquare,
  Sparkle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit20Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit20Lesson2Studio: React.FC<Unit20Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 95)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Bill hỏi thăm Mary và Lucy ở khu cắm trại',
      speakerA: 'Bill',
      avatarA: '👦🏼',
      textA: 'Hello, Bill. Are Mary and Lucy at the campsite?',
      ipaA: '/həˈləʊ bɪl ɑː ˈmeəri ænd ˈluːsi æt ðə ˈkæmpsaɪt/',
      readingA: 'Hơ-lâu, Bin. A Me-ri en-đ Lu-xi ét đờ cém-xai-t?',
      meaningA: 'Chào Bill. Mary và Lucy có ở khu cắm trại không vậy?',
      speakerB: 'Friend',
      avatarB: '👦',
      textB: 'Yes, they are.',
      ipaB: '/jɛs ðeɪ ɑː/',
      readingB: 'Dét-s, đê a.',
      meaningB: 'Có, các bạn ấy đang ở đây nè.',
      context: 'Bill gọi điện cho bạn mình đang đứng giữa khu cắm trại đông vui.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Bill hỏi các bạn đang làm gì cùng nhau',
      speakerA: 'Bill',
      avatarA: '👦🏼',
      textA: 'What are they doing?',
      ipaA: '/wɒt ɑː ðeɪ ˈduːɪŋ/',
      readingA: 'Oát a đê đu-in?',
      meaningA: 'Họ đang làm gì thế cậu?',
      speakerB: 'Friend',
      avatarB: '👦',
      textB: "They're playing card games.",
      ipaB: '/ðeə ˈpleɪɪŋ kɑːd ɡeɪmz/',
      readingB: 'Đe-ơ plây-in cát-đ gêm-z.',
      meaningB: 'Các bạn ấy đang chơi trò chơi thẻ bài với nhau.',
      context: 'Mary, Lucy và các bạn nhỏ ngồi quây quần trên thảm cỏ chơi thẻ bài vui vẻ.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 96)
  // =========================================================================
  const groupActivities = [
    {
      id: 'tug_of_war',
      label: 'a',
      actionEn: 'playing tug of war',
      ipa: '/ˈpleɪɪŋ tʌɡ əv wɔː/',
      reading: 'plây-in tắc-g ọp-v o-r',
      meaningVi: 'chơi trò kéo co sôi động',
      icon: '🪢',
      sentenceEn: "They're playing tug of war.",
      sentenceVi: 'Họ đang chơi trò kéo co cùng nhau.',
      color: 'from-orange-500 to-amber-600',
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-200'
    },
    {
      id: 'card_games',
      label: 'b',
      actionEn: 'playing card games',
      ipa: '/ˈpleɪɪŋ kɑːd ɡeɪmz/',
      reading: 'plây-in cát-đ gêm-z',
      meaningVi: 'chơi trò chơi thẻ bài (board game / bài Uno)',
      icon: '🃏',
      sentenceEn: "They're playing card games.",
      sentenceVi: 'Họ đang chơi trò chơi thẻ bài cùng nhau.',
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      id: 'dancing',
      label: 'c',
      actionEn: 'dancing around the campfire',
      ipa: '/ˈdɑːnsɪŋ əˈraʊnd ðə ˈkæmpfaɪə/',
      reading: 'đan-sin ơ-raon-đ đờ cém-phai-ơ',
      meaningVi: 'nhảy múa vòng quanh đống lửa trại',
      icon: '💃🔥',
      sentenceEn: "They're dancing around the campfire.",
      sentenceVi: 'Họ đang nhảy múa vòng quanh đống lửa trại.',
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      id: 'singing',
      label: 'd',
      actionEn: 'singing songs',
      ipa: '/ˈsɪŋɪŋ sɒŋz/',
      reading: 'xinh-in son-z',
      meaningVi: 'hát vang các bài ca trại hè',
      icon: '🎶',
      sentenceEn: "They're singing songs.",
      sentenceVi: 'Họ đang hát vang các bài hát.',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    }
  ];

  const [selectedGroupAct, setSelectedGroupAct] = useState(groupActivities[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const [talkScene, setTalkScene] = useState(groupActivities[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 97)
  // =========================================================================
  interface Track97Item {
    id: number;
    title: string;
    script: string;
    options: {
      key: 'a' | 'b';
      label: string;
      desc: string;
      icon: string;
    }[];
    correctKey: 'a' | 'b';
    explanation: string;
  }

  const track97Questions: Track97Item[] = [
    {
      id: 1,
      title: 'Câu 1: Mary và Lucy đang làm gì?',
      script: "1. What are Mary and Lucy doing? - They're dancing around the campfire.",
      options: [
        { key: 'a', label: 'Taking a photo / selfie', desc: 'Chụp ảnh kỷ niệm', icon: '📸' },
        { key: 'b', label: 'Dancing around the campfire', desc: 'Nhảy múa quanh lửa trại', icon: '💃🔥' }
      ],
      correctKey: 'b',
      explanation: 'Băng âm thanh nói: "They\'re dancing around the campfire", đáp án đúng là b!'
    },
    {
      id: 2,
      title: 'Câu 2: Nam và các bạn nam đang chơi gì?',
      script: "2. What are Nam and his friends doing? - They're playing tug of war.",
      options: [
        { key: 'a', label: 'Playing tug of war', desc: 'Chơi kéo co sôi động', icon: '🪢' },
        { key: 'b', label: 'Playing card games', desc: 'Chơi bài / thẻ bài', icon: '🃏' }
      ],
      correctKey: 'a',
      explanation: 'Băng âm thanh nói: "They\'re playing tug of war", đáp án đúng là a!'
    }
  ];

  const [act4Picks, setAct4Picks] = useState<Record<number, 'a' | 'b' | null>>({
    1: null,
    2: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectAct4 = (qId: number, key: 'a' | 'b') => {
    sound.playClick();
    setAct4Picks(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(act4Picks).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    track97Questions.forEach(q => {
      if (act4Picks[q.id] === q.correctKey) correct++;
    });

    if (correct === 2) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setAct4Picks({ 1: null, 2: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [act5_1_1, setAct5_1_1] = useState('');
  const [act5_1_2, setAct5_1_2] = useState('');
  const [act5_2_1, setAct5_2_1] = useState('');
  const [act5_2_2, setAct5_2_2] = useState('');
  const [act5_2_3, setAct5_2_3] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let score = 0;

    if (act5_1_1.trim().toLowerCase() === 'campsite') score++;
    if (act5_1_2.trim().toLowerCase() === 'doing') score++;
    if (act5_2_1.trim().toLowerCase() === 'where') score++;
    if (act5_2_2.trim().toLowerCase() === 'what') score++;
    if (act5_2_3.trim().toLowerCase().includes('tug of war') || act5_2_3.trim().toLowerCase() === 'playing tug of war') score++;

    if (score >= 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(score);
    }
  };

  const handleResetAct5 = () => {
    sound.playClick();
    setAct5_1_1('');
    setAct5_1_2('');
    setAct5_2_1('');
    setAct5_2_2('');
    setAct5_2_3('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 98) - WHAT ARE THEY DOING?
  // =========================================================================
  const songStanzas = [
    {
      title: 'Khổ 1: Nhóm Lửa Trại 🔥',
      lines: [
        { en: 'What are they doing?', vi: 'Họ đang làm gì vậy?' },
        { en: 'Building a campfire.', vi: 'Đang nhóm đống lửa trại.' },
        { en: 'Building a campfire.', vi: 'Đang nhóm đống lửa trại.' },
        { en: "They're building a campfire.", vi: 'Họ đang cùng nhau nhóm lửa trại.' }
      ],
      audioText: "What are they doing? Building a campfire. Building a campfire. They're building a campfire."
    },
    {
      title: 'Khổ 2: Chơi Trò Chơi Thẻ Bài 🃏',
      lines: [
        { en: 'What are they doing?', vi: 'Họ đang làm gì vậy?' },
        { en: 'Playing card games.', vi: 'Đang chơi trò chơi thẻ bài.' },
        { en: 'Playing card games.', vi: 'Đang chơi trò chơi thẻ bài.' },
        { en: "They're playing card games.", vi: 'Họ đang chơi trò chơi thẻ bài cùng nhau.' }
      ],
      audioText: "What are they doing? Playing card games. Playing card games. They're playing card games."
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <span>🏕️ Unit 20 · Lesson 2</span>
              <span>· Trang 66 - 67 SGK</span>
            </span>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>⬅️ Tiết 1</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Tiết 3 ➡️</span>
                </button>
              )}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>Hoạt Động Nhóm: &quot;What are they doing?&quot;</span>
            <span className="text-3xl">🪢🃏💃🎶</span>
          </h2>
          <p className="text-amber-100 text-sm md:text-base max-w-3xl leading-relaxed">
            Hỏi và miêu tả nhiều người đang làm gì cùng nhau ở trại hè: 
            <span className="underline decoration-yellow-300 font-bold ml-1">playing tug of war</span> (kéo co), 
            <span className="underline decoration-yellow-300 font-bold ml-1">playing card games</span> (chơi bài), 
            <span className="underline decoration-yellow-300 font-bold ml-1">dancing around the campfire</span> (múa quanh lửa trại), 
            <span className="underline decoration-yellow-300 font-bold ml-1">singing songs</span> (hát hò).
          </p>

          {/* Activity Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: '1. Hội Thoại Mẫu', icon: '🎧' },
              { id: 2, label: '2. 4 Trò Chơi Nhóm', icon: '🪢' },
              { id: 3, label: '3. Phỏng Vấn Nhóm', icon: '👥' },
              { id: 4, label: '4. Nghe & Đánh Dấu', icon: '✅' },
              { id: 5, label: '5. Nhìn & Điền Từ', icon: '✍️' },
              { id: 6, label: '6. Bài Hát Trại Hè', icon: '🎤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSection(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === tab.id
                    ? 'bg-white text-orange-950 shadow-md scale-105'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 95)
      ===================================================================== */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 95
                </span>
                <span className="text-xs text-slate-500">Trang 66 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Quan sát, nghe và nhắc lại)
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                speakWord(
                  "Hello, Bill. Are Mary and Lucy at the campsite? Yes, they are. What are they doing? They're playing card games.",
                  speechRate
                );
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-md hover:from-amber-700 hover:to-orange-700 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bài Mẫu (Track 95)</span>
            </button>
          </div>

          {/* Dialog Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(step => (
              <div
                key={step.id}
                className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/60 space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
                  <span className="text-xs font-black text-amber-900 uppercase">
                    {step.part}
                  </span>
                  <span className="text-xs bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    SGK Trang 66
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-amber-100">
                  💡 {step.context}
                </p>

                <div className="space-y-3">
                  {/* Speaker A */}
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarA}</span>
                        <span className="font-black text-xs text-amber-900">{step.speakerA}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textA, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textA}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaA}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingA}
                      </span>
                      <span className="text-xs text-slate-600 italic">
                        👉 {step.meaningA}
                      </span>
                    </div>
                  </div>

                  {/* Speaker B */}
                  <div className="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarB}</span>
                        <span className="font-black text-xs text-amber-900">{step.speakerB}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textB, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textB}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaB}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingB}
                      </span>
                      <span className="text-xs text-slate-700 italic font-medium">
                        👉 {step.meaningB}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grammar Spotlight */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-xs uppercase flex items-center gap-1 w-fit">
              <Lightbulb className="w-3.5 h-3.5" /> So Sánh Số Ít vs Số Nhiều:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-white border border-amber-200">
                <p className="font-black text-slate-900">1 Người (he/she):</p>
                <p className="text-amber-800 font-bold mt-0.5">What is he/she doing? - He&apos;s / She&apos;s + V-ing.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-amber-200">
                <p className="font-black text-slate-900">Nhiều Người (they):</p>
                <p className="text-orange-800 font-bold mt-0.5">What are they doing? - They&apos;re + V-ing.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: LISTEN, POINT AND SAY (TRACK 96)
      ===================================================================== */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Track 96
                </span>
                <span className="text-xs text-slate-500">Trang 66 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (Nghe, chỉ và nói hành động tập thể)
              </h3>
            </div>

            <div className="text-xs text-slate-500 italic bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              Nhấn vào từng thẻ để nghe câu hỏi và câu trả lời mẫu!
            </div>
          </div>

          {/* 4 Group Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groupActivities.map(item => {
              const isSelected = selectedGroupAct.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGroupAct(item);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all text-center space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-300 bg-orange-50/70 shadow-lg scale-102'
                      : 'border-slate-200 hover:border-orange-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-950 font-black text-xs flex items-center justify-center">
                      {item.label}
                    </span>
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-base text-slate-900">{item.actionEn}</h4>
                    <p className="text-[11px] font-mono text-slate-500">{item.ipa}</p>
                    <p className="text-xs text-amber-900 font-bold mt-0.5">🗣️ {item.reading}</p>
                    <p className="text-xs text-slate-600 italic mt-0.5">👉 {item.meaningVi}</p>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      sound.playClick();
                      speakWord(`What are they doing? ${item.sentenceEn}`, speechRate);
                    }}
                    className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện Nói</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Focus Stage */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-6 border border-amber-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedGroupAct.icon}</span>
                <span className="font-black text-slate-900 text-base">
                  Thực Hành Hoạt Động Nhóm: {selectedGroupAct.actionEn.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase">Hỏi Nhiều Người:</span>
                  <button
                    onClick={() => speakWord("What are they doing?", speechRate)}
                    className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900">What are they doing?</p>
                <p className="text-xs text-slate-600 italic">👉 Họ đang làm gì vậy?</p>
              </div>

              <div className="bg-orange-600 text-white p-4 rounded-2xl border border-orange-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-100 uppercase">Trả Lời:</span>
                  <button
                    onClick={() => speakWord(selectedGroupAct.sentenceEn, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black">{selectedGroupAct.sentenceEn}</p>
                <p className="text-xs text-orange-100 italic">👉 {selectedGroupAct.sentenceVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: LET'S TALK
      ===================================================================== */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 3 · Let&apos;s talk
                </span>
                <span className="text-xs text-slate-500">Trang 66 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Luyện Nói Hoạt Động Tập Thể: &quot;What are they doing?&quot;
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {groupActivities.map(act => (
              <button
                key={act.id}
                onClick={() => {
                  sound.playClick();
                  setTalkScene(act);
                }}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  talkScene.id === act.id
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <span className="text-3xl">{act.icon}</span>
                <span className="text-sm font-black text-slate-900 capitalize">{act.actionEn}</span>
                <span className="text-xs text-slate-500">{act.meaningVi}</span>
              </button>
            ))}
          </div>

          {/* Interactive Talk Bubble */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <span className="text-xs font-black text-amber-900 uppercase">
                Phòng Thu Đối Thoại Nhóm: {talkScene.actionEn}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(`What are they doing? ${talkScene.sentenceEn}`, speechRate);
                }}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe Cặp Câu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1">
                <span className="text-xs font-bold text-amber-800">Câu hỏi:</span>
                <p className="text-lg font-black text-slate-900">What are they doing?</p>
                <p className="text-xs text-slate-500 italic">(Họ đang làm gì thế?)</p>
              </div>

              <div className="bg-orange-600 text-white p-4 rounded-2xl border border-orange-700 space-y-1">
                <span className="text-xs font-bold text-orange-100">Câu trả lời:</span>
                <p className="text-lg font-black">{talkScene.sentenceEn}</p>
                <p className="text-xs text-orange-100 italic">({talkScene.sentenceVi})</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: LISTEN AND TICK (TRACK 97)
      ===================================================================== */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Track 97
                </span>
                <span className="text-xs text-slate-500">Trang 67 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and tick (Lắng nghe và đánh dấu tích vào bức tranh đúng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct4}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct4}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Kiểm tra đáp án
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {track97Questions.map(q => {
              const currentPick = act4Picks[q.id];
              const isSubmitted = act4Submitted;
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
                    <h4 className="font-bold text-slate-900 text-base">{q.title}</h4>
                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.script, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Băng #{q.id}</span>
                    </button>
                  </div>

                  {/* 2 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    {q.options.map(opt => {
                      const isChosen = currentPick === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-300';
                      if (isChosen) {
                        btnStyle = 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200 font-bold';
                      }
                      if (isSubmitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold ring-2 ring-emerald-200';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectAct4(q.id, opt.key)}
                          className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-black text-sm">{opt.key.toUpperCase()}.</span>
                            <span className="text-2xl">{opt.icon}</span>
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
                      <p className="font-bold">{isCorrect ? '✅ Đánh dấu rất chính xác!' : '❌ Chưa chính xác!'}</p>
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
          SECTION 5: LOOK, COMPLETE AND READ
      ===================================================================== */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Look, complete and read
                </span>
                <span className="text-xs text-slate-500">Trang 67 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Quan sát tranh và hoàn thành câu hỏi đáp
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct5}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct5}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Exercise 1 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">1. Ben đang gửi email cho mẹ 📱</span>
                <button
                  onClick={() => speakWord("Where's Ben? He's at the campsite. What's he doing? He's emailing his mother.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 text-sm font-semibold text-slate-800">
                <p>A: Where&apos;s Ben?</p>
                <div className="flex items-center gap-2">
                  <span>B: He&apos;s at the</span>
                  <input
                    type="text"
                    value={act5_1_1}
                    onChange={e => setAct5_1_1(e.target.value)}
                    placeholder="campsite"
                    className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                  />
                  <span>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>A: What&apos;s he</span>
                  <input
                    type="text"
                    value={act5_1_2}
                    onChange={e => setAct5_1_2(e.target.value)}
                    placeholder="doing"
                    className="w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                  />
                  <span>?</span>
                </div>
                <p>B: He&apos;s emailing his mother.</p>
              </div>

              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án chuẩn: <strong>campsite</strong> và <strong>doing</strong></p>
              )}
            </div>

            {/* Exercise 2 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">2. Nam và Mai đang chơi kéo co 🪢</span>
                <button
                  onClick={() => speakWord("Where are they? They're at the campsite. What are they doing? They're playing tug of war.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 text-sm font-semibold text-slate-800">
                <p>A: I want to see Nam and Mai.</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={act5_2_1}
                    onChange={e => setAct5_2_1(e.target.value)}
                    placeholder="Where"
                    className="w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                  />
                  <span>are they?</span>
                </div>
                <p>B: They&apos;re at the campsite.</p>
                <div className="flex items-center gap-2">
                  <span>A:</span>
                  <input
                    type="text"
                    value={act5_2_2}
                    onChange={e => setAct5_2_2(e.target.value)}
                    placeholder="What"
                    className="w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                  />
                  <span>are they doing?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>B: They&apos;re</span>
                  <input
                    type="text"
                    value={act5_2_3}
                    onChange={e => setAct5_2_3(e.target.value)}
                    placeholder="playing tug of war"
                    className="w-36 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                  />
                  <span>.</span>
                </div>
              </div>

              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án chuẩn: <strong>Where</strong>, <strong>What</strong>, và <strong>playing tug of war</strong></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: LET'S SING (TRACK 98)
      ===================================================================== */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-r from-orange-700 via-amber-700 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Hoạt Động 6 · Track 98
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Bài Hát Trại Hè: &quot;What are they doing?&quot; 🎤
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                speakWord(
                  "What are they doing? Building a campfire. Building a campfire. They're building a campfire. What are they doing? Playing card games. Playing card games. They're playing card games.",
                  speechRate
                );
              }}
              className="px-6 py-2.5 rounded-2xl bg-white text-orange-950 font-black text-xs hover:bg-orange-100 transition shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Hát Toàn Bộ Bài Ca</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songStanzas.map((st, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <h4 className="font-black text-lg text-yellow-300">{st.title}</h4>
                  <button
                    onClick={() => speakWord(st.audioText, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {st.lines.map((ln, lIdx) => (
                    <div key={lIdx}>
                      <p className="font-bold text-white text-sm">{ln.en}</p>
                      <p className="text-amber-100/80 italic">{ln.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
