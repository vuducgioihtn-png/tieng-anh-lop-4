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
  HelpCircle,
  Sun,
  Moon,
  Coffee,
  School,
  Bed,
  Sunrise,
  ArrowRight,
  Smile
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit2Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit2Lesson2Studio: React.FC<Unit2Lesson2StudioProps> = ({
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

  // Activity 1: Dialogue A & B (Track 19)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('Lucy');
    await speakWord('I get up at six o\'clock. And you? What time do you get up?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord('At five forty-five.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Lucy');
    await speakWord('What time do you have breakfast?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord('At six fifteen.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  // Activity 2: 4 Routines (Track 20)
  const routinesAct2 = [
    {
      key: 'a',
      time: '5:00 AM',
      action: 'get up',
      vietnamese: 'thức dậy',
      icon: '🌅',
      q: 'What time do you get up?',
      a: 'I get up at five o\'clock.',
      ipa: '/aɪ ɡet ʌp ət faɪv əˈklɒk/',
      readingVi: 'Ai get áp ơt phai-v ơ-klóc',
      tip: 'Nhớ có giới từ "at" trước mốc giờ (at five o\'clock)!'
    },
    {
      key: 'b',
      time: '6:15 AM',
      action: 'have breakfast',
      vietnamese: 'ăn bữa sáng',
      icon: '🥪',
      q: 'What time do you have breakfast?',
      a: 'I have breakfast at six fifteen.',
      ipa: '/aɪ hæv ˈbrekfəst ət sɪks ˌfɪfˈtiːn/',
      readingVi: 'Ai hæ-v b-rếch-phơ-st ơt sik-s phíp-tiin',
      tip: 'Breakfast đọc trọng âm rơi vào âm tiết đầu "brek".'
    },
    {
      key: 'c',
      time: '1:15 PM',
      action: 'go to school',
      vietnamese: 'đi học',
      icon: '🎒',
      q: 'What time do you go to school?',
      a: 'I go to school at one fifteen.',
      ipa: '/aɪ ɡəʊ tuː skuːl ət wʌn ˌfɪfˈtiːn/',
      readingVi: 'Ai gâu tu x-ku-l ơt oăn phíp-tiin',
      tip: 'School có nguyên âm kéo dài /uː/, uốn lưỡi chạm vòm miệng trên.'
    },
    {
      key: 'd',
      time: '9:00 PM',
      action: 'go to bed',
      vietnamese: 'đi ngủ',
      icon: '🛏️',
      q: 'What time do you go to bed?',
      a: 'I go to bed at nine o\'clock.',
      ipa: '/aɪ ɡəʊ tuː bed ət naɪn əˈklɒk/',
      readingVi: 'Ai gâu tu bét-đ ơt nai-n ơ-klóc',
      tip: 'Bed kết thúc bằng âm hữu thanh /d/ bật nhẹ ở cổ họng.'
    }
  ];

  // Activity 4: Listen and number (Track 21)
  const [act4Order, setAct4Order] = useState<{ [key: string]: number | null }>({
    a: null,
    b: null,
    c: null,
    d: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  // Script Track 21:
  // 1: Girl stretching at 5:45 -> a
  // 2: Boy having breakfast at 6:00 -> b
  // 3: Girl going to school at 6:30 -> c
  // 4: Girl sleeping at 9:15 PM -> d
  const act4Data = [
    { key: 'a', time: '5:45 AM', action: 'get up', correctNumber: 1, label: 'Bé gái thức dậy vươn vai (5:45 AM)' },
    { key: 'b', time: '6:00 AM', action: 'have breakfast', correctNumber: 2, label: 'Bạn trai ăn sáng với bánh mì (6:00 AM)' },
    { key: 'c', time: '6:30 AM', action: 'go to school', correctNumber: 3, label: 'Bé gái đeo cặp đi học (6:30 AM)' },
    { key: 'd', time: '9:15 PM', action: 'go to bed', correctNumber: 4, label: 'Bé gái ngủ say trong đêm (9:15 PM)' }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    const isCorrect =
      act4Order.a === 1 && act4Order.b === 2 && act4Order.c === 3 && act4Order.d === 4;
    if (isCorrect) {
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

  const act5Items = [
    {
      q: 1,
      time: '6:00 AM',
      qText: 'A: What time do you get up?',
      aText: 'B: I get up at _______ o\'clock.',
      correct: 'six',
      fullAudio: 'What time do you get up? - I get up at six o\'clock.'
    },
    {
      q: 2,
      time: '6:30 AM',
      qText: 'A: What time do you have breakfast?',
      aText: 'B: I have breakfast at _______ thirty.',
      correct: 'six',
      fullAudio: 'What time do you have breakfast? - I have breakfast at six thirty.'
    },
    {
      q: 3,
      time: '6:45 AM',
      qText: 'A: _______ do you go to school?',
      aText: 'B: I go to school at _______ forty-five.',
      correct: 'six',
      fullAudio: 'What time do you go to school? - I go to school at six forty-five.'
    },
    {
      q: 4,
      time: '9:15 PM',
      qText: 'A: What time do you _______?',
      aText: 'B: I _______ at nine fifteen.',
      correct: 'go to bed',
      fullAudio: 'What time do you go to bed? - I go to bed at nine fifteen.'
    }
  ];

  // Activity 6: Karaoke Song "What time do you go to school?" (Track 22)
  const [isSinging, setIsSinging] = useState<boolean>(false);
  const [activeSongLine, setActiveSongLine] = useState<number>(-1);

  const songStanzas = [
    { q: 'What time do you get up?', a: 'I get up at six o\'clock.', time: '6:00 AM', icon: '🌅' },
    { q: 'What time do you have breakfast?', a: 'I have breakfast at six fifteen.', time: '6:15 AM', icon: '🥪' },
    { q: 'What time do you go to school?', a: 'I go to school at six thirty.', time: '6:30 AM', icon: '🎒' },
    { q: 'What time do you go to bed?', a: 'I go to bed at nine forty-five.', time: '9:45 PM', icon: '🛏️' }
  ];

  const playFullSong = async () => {
    sound.playClick();
    setIsSinging(true);
    for (let i = 0; i < songStanzas.length; i++) {
      setActiveSongLine(i * 2);
      await speakWord(songStanzas[i].q, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 350));

      setActiveSongLine(i * 2 + 1);
      await speakWord(songStanzas[i].a, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 450));
    }
    setActiveSongLine(-1);
    setIsSinging(false);
    sound.playVictory();
    confetti({ particleCount: 60, spread: 70 });
    onAddStar(6);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 18 & 19 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black shadow-sm">
              <span>🌅 Tiết 2: Thói Quen Hàng Ngày — "What time do you...?"</span>
            </span>
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 16)</span>
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
            Unit 2: Time and daily routines — Lesson 2
          </h1>
          <p className="text-sm sm:text-base text-teal-100 font-medium leading-relaxed max-w-3xl">
            Học cách hỏi và chia sẻ thời gian biểu sinh hoạt hàng ngày: <strong>get up 🌅</strong> (thức dậy), <strong>have breakfast 🥪</strong> (ăn sáng), <strong>go to school 🎒</strong> (đi học) và <strong>go to bed 🛏️</strong> (đi ngủ)!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🌅 5:00: get up</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🥪 6:15: have breakfast</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎒 1:15: go to school</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🛏️ 9:00: go to bed</span>
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
            className="px-4 py-1.5 bg-white text-teal-950 hover:bg-teal-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang thói quen hàng ngày'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🌅
        </div>
      </div>

      {/* ================= BÍ KÍP 3 GIÂY GHI NHỚ MẪU CÂU THÓI QUEN ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-teal-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Cấu Trúc Cốt Lõi Não Phải</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "What time do you [hành động]?" ➔ "I [hành động] at [giờ]."</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Chìa khóa vàng: Luôn nhớ dùng giới từ <strong>"at"</strong> trước mốc thời gian: <em>at six o'clock, at six fifteen</em>!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('What time do you get up? I get up at six o\'clock.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Cặp Câu Tiêu Biểu</span>
          </button>
        </div>

        {/* 4 Daily Routine Flashcards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: 'get up', vi: 'thức dậy', time: '6:00 AM', icon: '🌅', color: 'from-amber-500/20 border-amber-400/30' },
            { action: 'have breakfast', vi: 'ăn sáng', time: '6:15 AM', icon: '🥪', color: 'from-emerald-500/20 border-emerald-400/30' },
            { action: 'go to school', vi: 'đi học', time: '6:30 AM', icon: '🎒', color: 'from-sky-500/20 border-sky-400/30' },
            { action: 'go to bed', vi: 'đi ngủ', time: '9:45 PM', icon: '🛏️', color: 'from-indigo-500/20 border-indigo-400/30' }
          ].map(r => (
            <div
              key={r.action}
              onClick={() => {
                sound.playClick();
                speakWord(`I ${r.action} at ${r.time.includes('6:00') ? "six o'clock" : r.time.includes('6:15') ? 'six fifteen' : r.time.includes('6:30') ? 'six thirty' : 'nine forty-five'}.`, speechRate);
              }}
              className={`p-4 rounded-2xl bg-gradient-to-b ${r.color} border backdrop-blur-md cursor-pointer hover:scale-102 transition-all space-y-2 text-center`}
            >
              <div className="text-3xl">{r.icon}</div>
              <div className="text-base font-black text-white">{r.action}</div>
              <div className="text-xs text-slate-300">({r.vi})</div>
              <div className="text-[11px] font-mono font-bold text-amber-300 bg-slate-950/60 py-0.5 rounded">
                at {r.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-teal-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Phụ Huynh: Cách Giúp Con Giao Tiếp Thời Gian Biểu</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-1">
              <div className="font-bold text-teal-900 text-sm">💡 1. Mẹo nhớ cụm từ "have breakfast"</div>
              <p>
                Người bản xứ dùng động từ <strong>have</strong> cho các bữa ăn: <em>have breakfast</em> (ăn sáng), <em>have lunch</em> (ăn trưa), <em>have dinner</em> (ăn tối). Không dùng "eat breakfast" trong các bài thi chuẩn SGK lớp 4.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 text-sm">💡 2. Giới từ "at" trước mốc giờ</div>
              <p>
                Nhắc con luôn đặt từ <strong>at</strong> trước bất kỳ giờ nào: <em>at 6:00</em>, <em>at 6:15</em>, <em>at 9:00</em>. Trong giao tiếp hàng ngày, con có thể trả lời ngắn gọn: <em>"At six fifteen."</em> giống như bạn Nam trong SGK!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-teal-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 2 (Trang 18 - 19 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Look, listen & repeat', icon: '🗣️', tag: 'Track 19' },
            { id: 2, label: '2. Listen, point & say', icon: '🌅', tag: 'Track 20' },
            { id: 3, label: "3. Let's talk", icon: '💬', tag: 'Trang 18' },
            { id: 4, label: '4. Listen & number', icon: '🔢', tag: 'Track 21' },
            { id: 5, label: '5. Look, complete & read', icon: '📝', tag: 'Trang 19' },
            { id: 6, label: "6. Let's sing", icon: '🎵', tag: 'Track 22' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 19) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 18 SGK - Track 19)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Look, listen and repeat (Quan sát tranh, nghe và nhắc lại)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Cuộc trò chuyện giữa Lucy và Nam về giờ thức dậy (Tranh a: 5:45 AM) và giờ ăn sáng (Tranh b: 6:15 AM).
              </p>
            </div>
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 19 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue a: Getting up */}
            <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-amber-800">Tranh a: Giờ thức dậy</span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-300 font-mono font-black text-xs rounded-md">
                    5:45 AM
                  </span>
                </div>
                <button
                  onClick={playDialogA}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại a</span>
                </button>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => speakWord("I get up at six o'clock. And you? What time do you get up?", speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Lucy' ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👧 Lucy:</span>
                    <span className="text-amber-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "I get up at six o'clock. And you? What time do you get up?"
                  </div>
                  <div className="text-xs text-slate-600 italic">Tớ thức dậy lúc 6 giờ đúng. Còn cậu? Cậu thức dậy lúc mấy giờ?</div>
                </div>

                <div
                  onClick={() => speakWord('At five forty-five.', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Nam' ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👦 Nam:</span>
                    <span className="text-emerald-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "At five forty-five."
                  </div>
                  <div className="text-xs text-slate-600 italic">Vào lúc 5 giờ 45 phút.</div>
                </div>
              </div>
            </div>

            {/* Dialogue b: Having breakfast */}
            <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-teal-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-teal-800">Tranh b: Giờ ăn sáng</span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-300 font-mono font-black text-xs rounded-md">
                    6:15 AM
                  </span>
                </div>
                <button
                  onClick={playDialogB}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại b</span>
                </button>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => speakWord('What time do you have breakfast?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Lucy' ? 'bg-teal-100 border-teal-400 ring-2 ring-teal-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👧 Lucy:</span>
                    <span className="text-teal-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "What time do you have breakfast?"
                  </div>
                  <div className="text-xs text-slate-600 italic">Cậu ăn sáng lúc mấy giờ?</div>
                </div>

                <div
                  onClick={() => speakWord('At six fifteen.', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Nam' ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👦 Nam:</span>
                    <span className="text-emerald-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">
                    "At six fifteen."
                  </div>
                  <div className="text-xs text-slate-600 italic">Vào lúc 6 giờ 15 phút.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 20) ================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 18 SGK - Track 20)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen, point and say (Lắng nghe, chỉ vào tranh và luyện nói)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Luyện mẫu câu: <strong>"What time do you ______?" — "I ______ at ______."</strong> với 4 thói quen sinh hoạt.
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 20 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {routinesAct2.map(item => (
              <div
                key={item.key}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-teal-400 p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <div className="bg-slate-950 text-white rounded-2xl p-3.5 text-center border-2 border-teal-400/40">
                    <div className="text-2xl font-black font-mono tracking-wider text-cyan-300">
                      {item.time}
                    </div>
                    <div className="text-xs font-extrabold text-amber-300 mt-0.5">
                      {item.action}
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <div className="text-xs font-bold text-slate-500">{item.q}</div>
                    <div className="text-sm font-black text-slate-900">"{item.a}"</div>
                    <div className="text-xs font-mono text-indigo-700">{item.ipa}</div>
                    <div className="text-[11px] font-bold text-amber-800 bg-amber-50 rounded py-0.5 px-1.5">
                      🗣️ {item.readingVi}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={async () => {
                      sound.playClick();
                      await speakWord(item.q, speechRate);
                      await new Promise(r => setTimeout(r, 400));
                      await speakWord(item.a, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện Nghe Hỏi & Đáp</span>
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

      {/* ================= ACTIVITY 3: LET'S TALK (TRANG 18) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 18 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's talk (Hỏi đáp thói quen hàng ngày tự do)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy chọn một hoạt động để cùng bạn hỏi đáp thời gian biểu thực tế của mình nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { action: 'get up', icon: '🌅', label: 'Thức dậy', defaultTime: '6:00 AM' },
              { action: 'have breakfast', icon: '🥪', label: 'Ăn sáng', defaultTime: '6:30 AM' },
              { action: 'go to school', icon: '🎒', label: 'Đi học', defaultTime: '7:00 AM' },
              { action: 'go to bed', icon: '🛏️', label: 'Đi ngủ', defaultTime: '9:30 PM' }
            ].map(item => (
              <div
                key={item.action}
                onClick={async () => {
                  sound.playClick();
                  await speakWord(`What time do you ${item.action}?`, speechRate);
                  await new Promise(r => setTimeout(r, 450));
                  await speakWord(`I ${item.action} at ${item.defaultTime.includes('6:00') ? "six o'clock" : item.defaultTime.includes('6:30') ? 'six thirty' : item.defaultTime.includes('7:00') ? "seven o'clock" : 'nine thirty'}.`, speechRate);
                  onAddStar(2);
                }}
                className="p-5 rounded-2xl border-2 border-teal-200 hover:border-teal-500 bg-teal-50/50 hover:bg-teal-100/60 cursor-pointer transition-all space-y-2 text-center group"
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="text-base font-black text-slate-900 group-hover:text-teal-700">
                  {item.action}
                </div>
                <div className="text-xs text-slate-500">({item.label})</div>
                <div className="text-xs font-bold text-teal-700 flex items-center justify-center gap-1 pt-1">
                  <Volume2 className="w-3.5 h-3.5" /> Bấm hỏi đáp mẫu
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND NUMBER (TRACK 21) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 19 SGK - Track 21)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Listen and number (Nghe và đánh số 1, 2, 3, 4 vào tranh)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm nghe từng câu (Track 21) và gán số thứ tự tương ứng từ 1 đến 4 vào mỗi bức tranh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {act4Data.map(item => (
              <div key={item.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-900 font-black text-xs flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-900 text-amber-300 font-mono font-bold text-xs rounded">
                      {item.time}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-700">
                    {item.label}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 justify-center">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          sound.playClick();
                          setAct4Order(prev => ({ ...prev, [item.key]: num }));
                        }}
                        className={`w-9 h-9 rounded-xl font-black text-sm transition-all border ${
                          act4Order[item.key] === num
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm scale-105'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {act4Checked && (
                    <div className="text-center text-xs font-bold pt-1">
                      {act4Order[item.key] === item.correctNumber ? (
                        <span className="text-emerald-600 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng (Số {item.correctNumber})
                        </span>
                      ) : (
                        <span className="text-rose-600">Đáp án đúng là: Số {item.correctNumber}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={async () => {
                sound.playClick();
                await speakWord("One. What time do you get up? - I get up at five forty-five.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Two. What time do you have breakfast? - I have breakfast at six o'clock.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Three. What time do you go to school? - I go to school at six thirty.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Four. What time do you go to bed? - I go to bed at nine fifteen.", speechRate);
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Track 21</span>
            </button>

            <button
              onClick={handleCheckAct4}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra đáp án</span>
            </button>

            {act4Checked && (
              <button
                onClick={() => {
                  sound.playClick();
                  setAct4Order({ a: null, b: null, c: null, d: null });
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
      )}

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ (TRANG 19) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 19 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Look, complete and read (Quan sát tranh, điền từ và đọc to)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy chọn chip từ gợi ý để hoàn thiện 4 câu hội thoại theo thời gian biểu!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Items.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800">Câu {item.q}</span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-amber-300 font-mono font-black text-xs rounded">
                    {item.time}
                  </span>
                </div>

                <div className="space-y-1 text-sm font-bold text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>{item.qText}</div>
                  <div>{item.aText}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bấm điền:</span>
                  {[item.correct, 'seven', 'six forty-five', 'go to school'].map(chip => (
                    <button
                      key={chip}
                      onClick={() => {
                        sound.playClick();
                        setAct5Answers(prev => ({ ...prev, [item.q]: chip }));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        act5Answers[item.q] === chip
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => speakWord(item.fullAudio, speechRate)}
                  className="w-full py-2 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S SING (TRACK 22) ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Hoạt Động 6: Let's sing (Trang 19 SGK - Track 22)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎵 Bài Hát: "What time do you go to school?"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cùng bé hát theo nhịp điệu bài hát vui nhộn để ghi nhớ trọn vẹn cả 4 thói quen sinh hoạt và mốc giờ!
              </p>
            </div>

            <button
              onClick={playFullSong}
              disabled={isSinging}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isSinging ? 'Đang hát theo nhịp...' : 'Bắt đầu bài hát'}</span>
            </button>
          </div>

          {/* Karaoke Lyrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songStanzas.map((stanza, idx) => {
              const isQActive = activeSongLine === idx * 2;
              const isAActive = activeSongLine === idx * 2 + 1;

              return (
                <div
                  key={idx}
                  onClick={() => speakWord(`${stanza.q} ${stanza.a}`, speechRate)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isQActive || isAActive
                      ? 'bg-amber-400/20 border-amber-400 ring-2 ring-amber-300/40 shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{stanza.icon}</span>
                    <span className="px-2 py-0.5 bg-slate-950/80 text-amber-300 font-mono font-bold text-xs rounded">
                      {stanza.time}
                    </span>
                  </div>

                  <div className={`text-base font-extrabold ${isQActive ? 'text-amber-300' : 'text-white'}`}>
                    "{stanza.q}"
                  </div>
                  <div className={`text-sm font-black ${isAActive ? 'text-amber-400' : 'text-teal-200'}`}>
                    "{stanza.a}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
