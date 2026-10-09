import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Clock,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Sliders,
  Sun,
  Moon,
  Coffee,
  School,
  ArrowRight,
  Smile
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit2Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

// Interactive SVG Analog Clock Component
const AnalogClock: React.FC<{
  hour: number;
  minute: number;
  size?: number;
}> = ({ hour, minute, size = 150 }) => {
  const center = size / 2;
  const radius = size * 0.44;
  const minuteAngle = minute * 6;
  const hourAngle = ((hour % 12) + minute / 60) * 30;

  return (
    <svg width={size} height={size} className="drop-shadow-md select-none">
      <circle
        cx={center}
        cy={center}
        r={radius}
        className="fill-white stroke-slate-800"
        strokeWidth={size * 0.04}
      />
      <circle
        cx={center}
        cy={center}
        r={radius * 0.94}
        className="fill-amber-50/40 stroke-amber-200"
        strokeWidth={1}
      />

      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => {
        const angle = (num * 30 - 90) * (Math.PI / 180);
        const numRadius = radius * 0.72;
        const x = center + numRadius * Math.cos(angle);
        const y = center + numRadius * Math.sin(angle);
        return (
          <text
            key={num}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[11px] font-extrabold fill-slate-700 font-mono"
          >
            {num}
          </text>
        );
      })}

      {/* Hour Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + radius * 0.48 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={center - radius * 0.48 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="#1e293b"
        strokeWidth={size * 0.045}
        strokeLinecap="round"
      />

      {/* Minute Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + radius * 0.72 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={center - radius * 0.72 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="#ef4444"
        strokeWidth={size * 0.03}
        strokeLinecap="round"
      />

      {/* Center Pin */}
      <circle cx={center} cy={center} r={size * 0.04} className="fill-amber-500 stroke-slate-900" strokeWidth={1.5} />
    </svg>
  );
};

export const Unit2Lesson1Studio: React.FC<Unit2Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // Live Clock Lab
  const [customHour, setCustomHour] = useState<number>(8);
  const [customMinute, setCustomMinute] = useState<number>(30);

  // Activity 1: Dialogue A & B
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('StudentA');
    await speakWord('What time is it?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('MsHoa');
    await speakWord("It's eight thirty. Let's have a break.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Ben');
    await speakWord('What time is it?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Classmate');
    await speakWord("It's three fifteen. Let's go into the classroom.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  // Activity 2: 4 Digital Clocks SGK
  const sgkClocksAct2 = [
    {
      key: 'a',
      timeStr: '6:00 AM',
      hour: 6,
      minute: 0,
      en: "six o'clock",
      fullSentence: "It's six o'clock.",
      ipa: "/ɪts sɪks əˈklɒk/",
      readingVi: "It-x SIK-s ơ-KLÓC",
      meaningVi: 'Bây giờ là 6 giờ đúng.',
      tip: "Giờ đúng chẵn phút: Số giờ + o'clock. Nhấn mạnh vào âm klóc!"
    },
    {
      key: 'b',
      timeStr: '6:15 AM',
      hour: 6,
      minute: 15,
      en: 'six fifteen',
      fullSentence: "It's six fifteen.",
      ipa: "/ɪts sɪks ˌfɪfˈtiːn/",
      readingVi: "It-x SIK-s phíp-TIIN",
      meaningVi: 'Bây giờ là 6 giờ 15 phút.',
      tip: 'Đọc số giờ (six) trước, số phút (fifteen) sau. Không có o\'clock!'
    },
    {
      key: 'c',
      timeStr: '6:30 PM',
      hour: 6,
      minute: 30,
      en: 'six thirty',
      fullSentence: "It's six thirty.",
      ipa: "/ɪts sɪks ˈθɜːti/",
      readingVi: "It-x SIK-s THƠ-ti",
      meaningVi: 'Bây giờ là 6 giờ 30 phút (6 rưỡi).',
      tip: 'Âm "th" trong thirty đặt nhẹ đầu lưỡi giữa 2 hàm răng và thổi hơi.'
    },
    {
      key: 'd',
      timeStr: '6:45 PM',
      hour: 6,
      minute: 45,
      en: 'six forty-five',
      fullSentence: "It's six forty-five.",
      ipa: "/ɪts sɪks ˌfɔːti ˈfaɪv/",
      readingVi: "It-x SIK-s PHO-ti PHAI-v",
      meaningVi: 'Bây giờ là 6 giờ 45 phút.',
      tip: 'Forty-five kết thúc bằng âm bật nhẹ /v/, không đọc là pho-ti-phai.'
    }
  ];

  // Activity 3: Let's talk Clocks
  const act3Clocks = [
    { timeStr: '7:00 AM', hour: 7, minute: 0, answer: "It's seven o'clock.", ipa: "/ɪts ˈsev.ən əˈklɒk/" },
    { timeStr: '8:15 AM', hour: 8, minute: 15, answer: "It's eight fifteen.", ipa: "/ɪts eɪt ˌfɪfˈtiːn/" },
    { timeStr: '2:30 PM', hour: 2, minute: 30, answer: "It's two thirty.", ipa: "/ɪts tuː ˈθɜːti/" },
    { timeStr: '4:45 PM', hour: 4, minute: 45, answer: "It's four forty-five.", ipa: "/ɪts fɔː ˌfɔːti ˈfaɪv/" }
  ];

  // Activity 4: Listen and tick (Track 18)
  const [act4Answers, setAct4Answers] = useState<{ [q: number]: 'a' | 'b' | null }>({ 1: null, 2: null });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  const act4Data = [
    {
      q: 1,
      audioText: "What time is it? - It's nine fifteen.",
      correct: 'b' as const,
      optA: { key: 'a' as const, time: '9:00 AM', label: "nine o'clock", desc: 'Đồng hồ tai nghe' },
      optB: { key: 'b' as const, time: '9:15 AM', label: 'nine fifteen', desc: 'Đồng hồ hươu vàng' },
      explanation: 'Âm thanh đọc rõ: "It\'s nine fifteen" (9 giờ 15 phút) ➔ Chọn đáp án b (9:15 AM).'
    },
    {
      q: 2,
      audioText: "What time is it? - It's four o'clock.",
      correct: 'a' as const,
      optA: { key: 'a' as const, time: '4:00 PM', label: "four o'clock", desc: 'Đồng hồ tivi táo xanh' },
      optB: { key: 'b' as const, time: '4:30 PM', label: 'four thirty', desc: 'Đồng hồ thỏ hồng' },
      explanation: 'Âm thanh đọc rõ: "It\'s four o\'clock" (4 giờ đúng) ➔ Chọn đáp án a (4:00 PM).'
    }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    if (act4Answers[1] === act4Data[0].correct && act4Answers[2] === act4Data[1].correct) {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
      onAddStar(6);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Look, complete and read
  const [act5Answers, setAct5Answers] = useState<{ [q: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [act5Checked, setAct5Checked] = useState<boolean>(false);

  const act5Items = [
    {
      q: 1,
      shape: 'Đồng hồ đám mây ☁️',
      time: '10:00 AM',
      promptA: 'A: What time is it?',
      promptB: "B: It's _______ o'clock.",
      correctWord: 'ten',
      fullSentence: "It's ten o'clock."
    },
    {
      q: 2,
      shape: 'Đồng hồ chú mèo 🐱',
      time: '1:15 PM',
      promptA: 'A: What time _______?',
      promptB: "B: It's one fifteen.",
      correctWord: 'is it',
      fullSentence: 'What time is it? - It\'s one fifteen.'
    },
    {
      q: 3,
      shape: 'Đồng hồ radio đỏ 📻',
      time: '3:30 PM',
      promptA: 'A: _______ is it?',
      promptB: "B: It's three _______.",
      correctWord: 'thirty',
      fullSentence: "What time is it? - It's three thirty."
    },
    {
      q: 4,
      shape: 'Đồng hồ tivi tím 📺',
      time: '4:45 PM',
      promptA: 'A: _______ is it?',
      promptB: "B: It's _______.",
      correctWord: 'four forty-five',
      fullSentence: "What time is it? - It's four forty-five."
    }
  ];

  // Activity 6: Which clock says ...? Game
  const gameClocks = [
    { letter: 'A', time: '6:00 AM', read: 'six o\'clock' },
    { letter: 'B', time: '8:00 AM', read: 'eight o\'clock' },
    { letter: 'C', time: '12:00 AM', read: 'twelve o\'clock' },
    { letter: 'D', time: '1:15 PM', read: 'one fifteen' },
    { letter: 'E', time: '3:15 PM', read: 'three fifteen' },
    { letter: 'F', time: '5:15 PM', read: 'five fifteen' },
    { letter: 'G', time: '7:30 AM', read: 'seven thirty' },
    { letter: 'H', time: '9:30 AM', read: 'nine thirty' },
    { letter: 'I', time: '11:30 AM', read: 'eleven thirty' },
    { letter: 'J', time: '2:45 PM', read: 'two forty-five' },
    { letter: 'K', time: '4:45 PM', read: 'four forty-five' },
    { letter: 'L', time: '8:45 PM', read: 'eight forty-five' }
  ];

  const [targetClockIndex, setTargetClockIndex] = useState<number>(5); // Clock F (5:15 PM) default
  const [selectedGameClock, setSelectedGameClock] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  const currentTargetClock = gameClocks[targetClockIndex];

  const handlePickGameClock = (letter: string) => {
    sound.playClick();
    setSelectedGameClock(letter);
    if (letter === currentTargetClock.letter) {
      sound.playVictory();
      setGameScore(prev => prev + 1);
      onAddStar(3);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      sound.playWrong();
    }
  };

  const nextGameRound = () => {
    sound.playClick();
    setSelectedGameClock(null);
    let nextIdx = Math.floor(Math.random() * gameClocks.length);
    while (nextIdx === targetClockIndex) {
      nextIdx = Math.floor(Math.random() * gameClocks.length);
    }
    setTargetClockIndex(nextIdx);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 16 & 17 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black shadow-sm">
              <span>⏰ Tiết 1: Hỏi & Nói Giờ — "What time is it?"</span>
            </span>
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Sang Tiết 2 (Trang 18) ➔</span>
              </button>
            )}
            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Sang Tiết 3 (Trang 20) ➔</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 2: Time and daily routines — Lesson 1
          </h1>
          <p className="text-sm sm:text-base text-sky-100 font-medium leading-relaxed max-w-3xl">
            Làm quen với cách hỏi giờ <strong>"What time is it?"</strong> và cách đọc 4 mốc thời gian căn bản trong tiếng Anh: <strong>giờ đúng (o'clock)</strong>, <strong>giờ 15 phút (fifteen)</strong>, <strong>giờ 30 phút (thirty)</strong> và <strong>giờ 45 phút (forty-five)</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">⏰ 6:00: six o'clock</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🕒 6:15: six fifteen</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🕡 6:30: six thirty</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🕖 6:45: six forty-five</span>
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

          <button
            onClick={() => setShowFullHandbook(!showFullHandbook)}
            className="px-4 py-1.5 bg-white text-indigo-950 hover:bg-indigo-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang đọc giờ chuẩn SGK'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          ⏰
        </div>
      </div>

      {/* ================= BÍ KÍP 3 GIÂY & ĐỒNG HỒ TƯƠNG TÁC ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-sky-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Não Phải Ghi Nhớ 4 Mốc Thời Gian</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 Công Thức Đọc Giờ Siêu Dễ: "Số Giờ + Số Phút"</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Chỉ dùng <strong>o'clock</strong> khi đúng giờ chẵn. Còn lại đọc thẳng: <em>seven fifteen (7:15)</em>, <em>eight thirty (8:30)</em>!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              speakWord(`It's ${customHour} ${customMinute === 0 ? "o'clock" : customMinute}.`, speechRate);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Giờ Đồng Hồ Tự Chỉnh</span>
          </button>
        </div>

        {/* Live Interactive Clock Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10">
            <AnalogClock hour={customHour} minute={customMinute} size={150} />
            <div className="text-2xl font-black font-mono mt-3 text-amber-400">
              {customHour < 10 ? `0${customHour}` : customHour}:{customMinute < 10 ? `0${customMinute}` : customMinute}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-2">
              <div className="text-xs font-bold text-amber-300 uppercase">Câu trả lời tương ứng:</div>
              <div className="text-2xl font-black text-white">
                "It's {customHour} {customMinute === 0 ? "o'clock" : customMinute === 15 ? 'fifteen' : customMinute === 30 ? 'thirty' : customMinute === 45 ? 'forty-five' : customMinute}."
              </div>
              <div className="text-xs text-slate-300 italic">
                (Bây giờ là {customHour} giờ {customMinute === 0 ? 'đúng' : `${customMinute} phút`}.)
              </div>
            </div>

            {/* Quick Time Preset Buttons */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400">Chọn nhanh các mốc giờ SGK:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { h: 6, m: 0, label: "6:00 (six o'clock)" },
                  { h: 6, m: 15, label: '6:15 (six fifteen)' },
                  { h: 6, m: 30, label: '6:30 (six thirty)' },
                  { h: 6, m: 45, label: '6:45 (six forty-five)' },
                  { h: 8, m: 30, label: '8:30 (eight thirty)' },
                  { h: 3, m: 15, label: '3:15 (three fifteen)' }
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => {
                      sound.playClick();
                      setCustomHour(item.h);
                      setCustomMinute(item.m);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      customHour === item.h && customMinute === item.m
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-black'
                        : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Dạy Con Nói Giờ Trong 2 Phút</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-900 text-sm">💡 1. Không dùng o'clock cho giờ lẻ</div>
              <p>
                Rất nhiều học sinh nói nhầm thành: <em>"It's six fifteen o'clock"</em> (SAI). Hãy nhắc con: từ <strong>o'clock</strong> (viết tắt của "of the clock") chỉ xuất hiện khi kim dài chỉ đúng số 12 (00 phút)!
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 text-sm">💡 2. Quy tắc đọc số giờ trước, số phút sau</div>
              <p>
                Tiếng Anh lớp 4 Global Success dạy cách đọc giờ tự nhiên nhất: Đọc số giờ rồi đọc số phút ngay sau: <strong>6:15 ➔ six fifteen</strong>, <strong>6:30 ➔ six thirty</strong>. Cực kỳ dễ nhớ!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-sky-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 1 (Trang 16 - 17 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Look, listen & repeat', icon: '🗣️', tag: 'Track 16' },
            { id: 2, label: '2. Listen, point & say', icon: '🕒', tag: 'Track 17' },
            { id: 3, label: "3. Let's talk", icon: '💬', tag: 'Trang 16' },
            { id: 4, label: '4. Listen & tick', icon: '✏️', tag: 'Track 18' },
            { id: 5, label: '5. Look, complete & read', icon: '📝', tag: 'Trang 17' },
            { id: 6, label: "6. Which clock says ...?", icon: '🎮', tag: 'Trò chơi' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 16) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 16 SGK - Track 16)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Look, listen and repeat (Quan sát tranh, nghe và nhắc lại)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Làm quen với câu hỏi giờ trong lớp học của cô Hoa (Tranh a: 8:30 AM) và ngoài sân trường của Ben (Tranh b: 3:15 PM).
              </p>
            </div>
            <span className="text-xs bg-sky-100 text-sky-800 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 16 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue a: Ms Hoa & Students in class */}
            <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-indigo-700">Tranh a: Trong lớp học</span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-400 font-mono font-black text-xs rounded-md">
                    8:30 AM
                  </span>
                </div>
                <button
                  onClick={playDialogA}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại a</span>
                </button>
              </div>

              {/* Speech Lines */}
              <div className="space-y-3">
                <div
                  onClick={() => speakWord('What time is it?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'StudentA'
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👦 Học sinh hỏi:</span>
                    <span className="flex items-center gap-1 text-indigo-600"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"What time is it?"</div>
                  <div className="text-xs font-mono text-indigo-700">/wɒt taɪm ɪz ɪt/</div>
                  <div className="text-xs text-slate-600 italic">Mấy giờ rồi ạ?</div>
                </div>

                <div
                  onClick={() => speakWord("It's eight thirty. Let's have a break.", speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'MsHoa'
                      ? 'bg-sky-100 border-sky-400 ring-2 ring-sky-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👩‍🏫 Cô Hoa trả lời:</span>
                    <span className="flex items-center gap-1 text-indigo-600"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "It's eight thirty. Let's have a break."
                  </div>
                  <div className="text-xs font-mono text-indigo-700">/ɪts eɪt ˈθɜːti. lets hæv ə breɪk/</div>
                  <div className="text-xs text-slate-600 italic">8 giờ 30 rồi. Cả lớp nghỉ giải lao nhé.</div>
                </div>
              </div>
            </div>

            {/* Dialogue b: Ben & Classmate in playground */}
            <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-emerald-700">Tranh b: Sân trường</span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-400 font-mono font-black text-xs rounded-md">
                    3:15 PM
                  </span>
                </div>
                <button
                  onClick={playDialogB}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại b</span>
                </button>
              </div>

              {/* Speech Lines */}
              <div className="space-y-3">
                <div
                  onClick={() => speakWord('What time is it?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Ben'
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>🧑‍🦰 Ben hỏi:</span>
                    <span className="flex items-center gap-1 text-emerald-600"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"What time is it?"</div>
                  <div className="text-xs font-mono text-indigo-700">/wɒt taɪm ɪz ɪt/</div>
                  <div className="text-xs text-slate-600 italic">Mấy giờ rồi bạn?</div>
                </div>

                <div
                  onClick={() => speakWord("It's three fifteen. Let's go into the classroom.", speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Classmate'
                      ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👧 Bạn gái trả lời:</span>
                    <span className="flex items-center gap-1 text-emerald-600"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "It's three fifteen. Let's go into the classroom."
                  </div>
                  <div className="text-xs font-mono text-indigo-700">/ɪts θriː ˌfɪfˈtiːn. lets ɡəʊ ˈɪntuː ðə ˈklɑːs.ruːm/</div>
                  <div className="text-xs text-slate-600 italic">3 giờ 15 rồi. Chúng mình vào lớp thôi.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 17) ================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 16 SGK - Track 17)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen, point and say (Lắng nghe, chỉ vào tranh và luyện nói)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Luyện mẫu câu cốt lõi: <strong>"What time is it?" — "It's [time]."</strong> với 4 chiếc đồng hồ điện tử chuẩn SGK.
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              4 Mốc Giờ SGK Trang 16
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sgkClocksAct2.map(item => (
              <div
                key={item.key}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-sky-400 p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-black text-sm flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">{item.timeStr.includes('AM') ? 'Sáng ☀️' : 'Chiều 🌙'}</span>
                  </div>

                  {/* Digital Clock Visual Box */}
                  <div className="bg-slate-950 text-white rounded-2xl p-4 text-center border-2 border-sky-400/40 shadow-inner">
                    <div className="text-3xl font-black font-mono tracking-wider text-cyan-300">
                      {item.timeStr.split(' ')[0]}
                      <span className="text-xs text-amber-400 ml-1.5">{item.timeStr.split(' ')[1]}</span>
                    </div>
                    <div className="text-xs font-extrabold text-amber-300 mt-1">
                      {item.en}
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <div className="text-sm font-black text-slate-900">{item.fullSentence}</div>
                    <div className="text-xs font-mono text-indigo-700">{item.ipa}</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 rounded py-0.5 px-1.5">
                      🗣️ {item.readingVi}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.fullSentence, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe câu mẫu</span>
                  </button>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    💡 {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK (TRANG 16) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 16 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's talk (Thực hành hỏi đáp giờ tự do)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào từng chiếc đồng hồ để nghe bạn Ben và bạn gái thực hành đối thoại theo ngữ cảnh bàn học!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {act3Clocks.map((clock, idx) => (
              <div
                key={idx}
                onClick={async () => {
                  sound.playClick();
                  await speakWord('What time is it?', speechRate);
                  await new Promise(r => setTimeout(r, 450));
                  await speakWord(clock.answer, speechRate);
                  onAddStar(2);
                }}
                className="p-5 rounded-2xl border-2 border-sky-200 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-100/60 cursor-pointer transition-all space-y-3 group text-center"
              >
                <div className="px-3 py-2 bg-slate-950 rounded-xl text-cyan-300 font-mono font-black text-xl shadow-inner inline-block">
                  {clock.timeStr}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                    "{clock.answer}"
                  </div>
                  <div className="text-xs font-mono text-indigo-700 mt-0.5">{clock.ipa}</div>
                </div>
                <div className="text-xs text-sky-700 font-bold flex items-center justify-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" /> Bấm để hỏi đáp
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND TICK (TRACK 18) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 17 SGK - Track 18)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Listen and tick (Lắng nghe và tích chọn đồng hồ đúng)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm nghe từng câu hỏi và tích vào đồng hồ `a` hoặc `b` tương ứng với giờ được đọc nhé!
            </p>
          </div>

          <div className="space-y-6">
            {act4Data.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-extrabold text-slate-900 text-base">Câu {item.q}:</span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.audioText, speechRate);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe âm thanh câu {item.q}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[item.optA, item.optB].map(opt => {
                    const isSelected = act4Answers[item.q] === opt.key;
                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200';

                    if (act4Checked) {
                      if (opt.key === item.correct) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-black';
                      } else if (isSelected && opt.key !== item.correct) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          sound.playClick();
                          setAct4Answers(prev => ({ ...prev, [item.q]: opt.key }));
                        }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs">
                            {opt.key}
                          </span>
                          <div>
                            <div className="text-xl font-mono font-black text-cyan-700 bg-slate-900 px-2.5 py-0.5 rounded-lg text-center text-cyan-300 inline-block mb-1">
                              {opt.time}
                            </div>
                            <div className="text-xs text-slate-500">{opt.desc} ({opt.label})</div>
                          </div>
                        </div>
                        {act4Checked && opt.key === item.correct && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {act4Checked && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    💡 <span className="font-bold text-sky-700">Giải thích: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCheckAct4}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra đáp án</span>
              </button>

              {act4Checked && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ 1: null, 2: null });
                    setAct4Checked(false);
                  }}
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

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ (TRANG 17) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 17 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Look, complete and read (Quan sát hình đồng hồ, điền từ và đọc to)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào các chip từ gợi ý để hoàn thành câu hỏi và câu trả lời nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Items.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 uppercase">
                    {item.shape}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-300 font-mono font-black text-xs rounded">
                    {item.time}
                  </span>
                </div>

                <div className="space-y-1.5 text-sm font-bold text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>{item.promptA}</div>
                  <div>{item.promptB}</div>
                </div>

                {/* Quick Fill Suggestion Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bấm điền:</span>
                  {[item.correctWord, 'five', 'seven thirty', 'what time'].map(chip => (
                    <button
                      key={chip}
                      onClick={() => {
                        sound.playClick();
                        setAct5Answers(prev => ({ ...prev, [item.q]: chip }));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        act5Answers[item.q] === chip
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => speakWord(item.fullSentence, speechRate)}
                  className="w-full py-2 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu hoàn chỉnh</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: WHICH CLOCK SAYS ...? GAME (TRANG 17) ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Hoạt Động 6: Let's play (Trang 17 SGK)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎮 Trò Chơi: Which clock says ...? (Đồng hồ nào chỉ giờ này?)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Nghe câu đọc giờ của bạn nam, sau đó bấm chọn đúng chiếc đồng hồ điện tử từ A đến L!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-1.5 bg-amber-400/20 border border-amber-400/40 rounded-xl text-amber-300 font-black text-xs">
                ⭐ Điểm: {gameScore}
              </div>
              <button
                onClick={nextGameRound}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow transition-transform active:scale-95"
              >
                Vòng Tiếp Theo ➔
              </button>
            </div>
          </div>

          {/* Current Audio Prompt Banner */}
          <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase">Bạn nam đố:</span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                "It's {currentTargetClock.read}."
              </div>
              <div className="text-xs text-slate-300">Đồng hồ nào chỉ giờ trên?</div>
            </div>

            <button
              onClick={() => speakWord(`It's ${currentTargetClock.read}.`, speechRate)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Bấm Nghe Lại Câu Đố</span>
            </button>
          </div>

          {/* 12 Clocks Grid (A - L) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gameClocks.map(clk => {
              const isSelected = selectedGameClock === clk.letter;
              const isCorrect = clk.letter === currentTargetClock.letter;
              let style = 'bg-white/10 hover:bg-white/20 border-white/15 text-white';

              if (isSelected) {
                if (isCorrect) {
                  style = 'bg-emerald-500/40 border-emerald-400 text-emerald-200 ring-2 ring-emerald-300 scale-105 font-black';
                } else {
                  style = 'bg-rose-500/40 border-rose-400 text-rose-200 ring-2 ring-rose-300';
                }
              }

              return (
                <button
                  key={clk.letter}
                  onClick={() => handlePickGameClock(clk.letter)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${style}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-black text-xs">
                    {clk.letter}
                  </span>
                  <div className="font-mono font-black text-sm text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded w-full text-center">
                    {clk.time}
                  </div>
                  {isSelected && isCorrect && (
                    <span className="text-[10px] text-emerald-300 font-bold">Chính xác! 🎉</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
