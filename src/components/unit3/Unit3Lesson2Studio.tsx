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
  School,
  Headphones,
  Home,
  BookMarked,
  ArrowRight,
  Smile
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit3Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit3Lesson2Studio: React.FC<Unit3Lesson2StudioProps> = ({
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

  // Activity 1: Dialogue A & B (Track 29)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('MsHoa');
    await speakWord('What day is it today?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord("It's Thursday.", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('MsHoa');
    await speakWord('What do you do on Thursdays?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord('I study at school.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Ben');
    await speakWord('What do you do on Saturdays?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Classmate');
    await speakWord('I do housework.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  // Activity 2: 4 Routine Cards (Track 30)
  const routineCardsAct2 = [
    {
      key: 'a',
      dayPlural: 'Mondays',
      action: 'study at school',
      viAction: 'học tập ở trường',
      icon: '🏫',
      q: 'What do you do on Mondays?',
      a: 'I study at school.',
      ipa: '/aɪ ˈstʌdi ət skuːl/',
      readingVi: 'Ai XTÁ-đi ơt x-ku-l',
      tip: 'Mondays có đuôi "s" vì chỉ thói quen lặp lại vào mọi ngày thứ Hai!'
    },
    {
      key: 'b',
      dayPlural: 'Wednesdays',
      action: 'go to school',
      viAction: 'đến trường học',
      icon: '🎒',
      q: 'What do you do on Wednesdays?',
      a: 'I go to school.',
      ipa: '/aɪ ɡəʊ tuː skuːl/',
      readingVi: 'Ai gâu tu x-ku-l',
      tip: 'Wednesdays: chữ d câm, nhớ phát âm đuôi /z/ nhẹ ở cuối!'
    },
    {
      key: 'c',
      dayPlural: 'Saturdays',
      action: 'do housework',
      viAction: 'làm việc nhà, quét dọn',
      icon: '🧹',
      q: 'What do you do on Saturdays?',
      a: 'I do housework.',
      ipa: '/aɪ duː ˈhaʊswɜːk/',
      readingVi: 'Ai du HAU-x-uốc',
      tip: 'Housework là danh từ ghép giữa house (nhà) + work (việc).'
    },
    {
      key: 'd',
      dayPlural: 'Sundays',
      action: 'listen to music',
      viAction: 'nghe nhạc thư giãn',
      icon: '🎧',
      q: 'What do you do on Sundays?',
      a: 'I listen to music.',
      ipa: '/aɪ ˈlɪs.ən tuː ˈmjuː.zɪk/',
      readingVi: 'Ai LÍ-xừn tu MIU-zích',
      tip: 'Listen có chữ "t" câm! Đọc là LÍ-xừn, không đọc lít-xừn!'
    }
  ];

  // Activity 4: Listen and number (Track 31)
  const [act4Order, setAct4Order] = useState<{ [key: string]: number | null }>({
    a: null,
    b: null,
    c: null,
    d: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  // Script Track 31:
  // 1: Calendar Monday 12 -> c
  // 2: Calendar Friday 16 -> b
  // 3: Boy mopping floor (Saturdays) -> d
  // 4: Girl listening to music (Sundays) -> a
  const act4Data = [
    { key: 'a', title: 'Sundays: Nghe nhạc', icon: '🎧', correctNumber: 4, desc: 'Bé gái đeo tai nghe nghe nhạc (Sundays)' },
    { key: 'b', title: 'Friday 16', icon: '🗓️', correctNumber: 2, desc: 'Tờ lịch Thứ Sáu ngày 16' },
    { key: 'c', title: 'Monday 12', icon: '🗓️', correctNumber: 1, desc: 'Tờ lịch Thứ Hai ngày 12' },
    { key: 'd', title: 'Saturdays: Làm việc nhà', icon: '🧹', correctNumber: 3, desc: 'Cậu bé lau sàn nhà (Saturdays)' }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    const isCorrect =
      act4Order.c === 1 && act4Order.b === 2 && act4Order.d === 3 && act4Order.a === 4;
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
      imageNote: 'Lịch Tuesday 3',
      qText: 'A: What day is it today?',
      aText: 'B: It\'s _______.',
      correct: 'Tuesday',
      audio: 'What day is it today? - It\'s Tuesday.'
    },
    {
      q: 2,
      imageNote: 'Lịch Wednesday 4',
      qText: 'A: _______ is it today?',
      aText: 'B: It\'s _______.',
      correct: 'Wednesday',
      audio: 'What day is it today? - It\'s Wednesday.'
    },
    {
      q: 3,
      imageNote: 'Bé gái học bài',
      qText: 'A: What do you do on Thursdays?',
      aText: 'B: I _______.',
      correct: 'study at school',
      audio: 'What do you do on Thursdays? - I study at school.'
    },
    {
      q: 4,
      imageNote: 'Bé trai nghe nhạc',
      qText: 'A: _______ do you do on Sundays?',
      aText: 'B: I _______.',
      correct: 'listen to music',
      audio: 'What do you do on Sundays? - I listen to music.'
    }
  ];

  // Activity 6: Karaoke Song "What day is it today?" (Track 32)
  const [isSinging, setIsSinging] = useState<boolean>(false);
  const [activeSongLine, setActiveSongLine] = useState<number>(-1);

  const songStanzas = [
    {
      day: 'Monday',
      icon: '🏫',
      q1: 'What day is it today?',
      a1: "It's Monday. It's Monday.",
      q2: 'What do you do on Mondays?',
      a2: 'I study at school. I study at school.'
    },
    {
      day: 'Sunday',
      icon: '🎧',
      q1: 'What day is it today?',
      a1: "It's Sunday. It's Sunday.",
      q2: 'What do you do on Sundays?',
      a2: 'I listen to music. I listen to music.'
    }
  ];

  const playFullSong = async () => {
    sound.playClick();
    setIsSinging(true);
    // Stanza 1
    for (let i = 0; i < 4; i++) {
      setActiveSongLine(i);
      const lines = [
        songStanzas[0].q1,
        songStanzas[0].a1,
        songStanzas[0].q2,
        songStanzas[0].a2
      ];
      await speakWord(lines[i], speechRate * 0.95);
      await new Promise(r => setTimeout(r, 400));
    }
    // Stanza 2
    for (let i = 0; i < 4; i++) {
      setActiveSongLine(4 + i);
      const lines = [
        songStanzas[1].q1,
        songStanzas[1].a1,
        songStanzas[1].q2,
        songStanzas[1].a2
      ];
      await speakWord(lines[i], speechRate * 0.95);
      await new Promise(r => setTimeout(r, 400));
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
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 24 & 25 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-300 text-slate-950 rounded-full text-xs font-black shadow-sm">
              <span>🏫 Tiết 2: Hỏi Hoạt Động Theo Ngày — "What do you do on...?"</span>
            </span>
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 22)</span>
              </button>
            )}
            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Sang Tiết 3 (Trang 26) ➔</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 3: My week — Lesson 2
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed max-w-3xl">
            Khám phá cách hỏi thói quen sinh hoạt theo các thứ trong tuần: <strong>study at school 🏫</strong> (học ở trường), <strong>go to school 🎒</strong> (đến trường), <strong>do housework 🧹</strong> (làm việc nhà) và <strong>listen to music 🎧</strong> (nghe nhạc)!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🏫 Mondays: study at school</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎒 Wednesdays: go to school</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🧹 Saturdays: do housework</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎧 Sundays: listen to music</span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPhoneticDetails(!showPhoneticDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showPhoneticDetails
                  ? 'bg-amber-300 text-slate-950 font-extrabold'
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
            className="px-4 py-1.5 bg-white text-slate-900 hover:bg-amber-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang thói quen theo tuần'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🎒
        </div>
      </div>

      {/* ================= BÍ KÍP 3 GIÂY GHI NHỚ MẪU CÂU ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Cấu Trúc Não Phải Tiết 2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "What do you do on [Thứ thêm s]?" ➔ "I [Hành động]."</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Bí quyết nhớ nhanh: Luôn thêm <strong>"s"</strong> sau thứ (<em>on Mondays, on Sundays</em>) vì đây là thói quen diễn ra hàng tuần!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('What do you do on Thursdays? I study at school.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Cặp Câu SGK</span>
          </button>
        </div>

        {/* 4 Core Activity Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { day: 'Mondays', action: 'study at school', vi: 'học ở trường', icon: '🏫' },
            { day: 'Wednesdays', action: 'go to school', vi: 'đến trường', icon: '🎒' },
            { day: 'Saturdays', action: 'do housework', vi: 'làm việc nhà', icon: '🧹' },
            { day: 'Sundays', action: 'listen to music', vi: 'nghe nhạc', icon: '🎧' }
          ].map(item => (
            <div
              key={item.day}
              onClick={() => {
                sound.playClick();
                speakWord(`On ${item.day}, I ${item.action}.`, speechRate);
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400 cursor-pointer transition-all space-y-2 text-center"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xs font-bold text-amber-300 uppercase">On {item.day}</div>
              <div className="text-sm font-black text-white">{item.action}</div>
              <div className="text-[11px] text-slate-300">({item.vi})</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Phụ Huynh: Mẹo Giúp Con Giao Tiếp Tiếng Anh Hàng Ngày</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 text-sm">💡 1. Phân biệt "study at school" và "go to school"</div>
              <p>
                <strong>go to school</strong> nhấn mạnh vào việc di chuyển đến trường; <strong>study at school</strong> nhấn mạnh vào việc ngồi trong lớp học tập. Cả 2 đều rất phổ biến trong SGK lớp 4.
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-950 text-sm">💡 2. Cụm từ "do housework"</div>
              <p>
                Tiếng Anh dùng động từ <strong>do</strong> đi với housework: <em>I do housework</em> (quét nhà, lau bàn, dọn phòng). Nhắc con không dùng "make housework".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-amber-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 2 (Trang 24 - 25 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Look, listen & repeat', icon: '🗣️', tag: 'Track 29' },
            { id: 2, label: '2. Listen, point & say', icon: '🏫', tag: 'Track 30' },
            { id: 3, label: "3. Let's talk", icon: '💬', tag: 'Trang 24' },
            { id: 4, label: '4. Listen & number', icon: '🔢', tag: 'Track 31' },
            { id: 5, label: '5. Look, complete & read', icon: '📝', tag: 'Trang 25' },
            { id: 6, label: "6. Let's sing", icon: '🎵', tag: 'Track 32' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 29) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 24 SGK - Track 29)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Look, listen and repeat (Quan sát tranh, nghe và nhắc lại)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Lớp học của cô Hoa (Tranh a: Thứ Năm & học ở trường) và cuộc trò chuyện của Ben (Tranh b: Thứ Bảy & làm việc nhà).
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 29 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue a: Ms Hoa & Nam */}
            <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <span className="text-xl font-black text-amber-800">Tranh a: Lớp học cô Hoa (Thursday)</span>
                <button
                  onClick={playDialogA}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại a</span>
                </button>
              </div>

              <div className="space-y-2.5">
                <div
                  onClick={() => speakWord('What day is it today?', speechRate)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'MsHoa' ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-0.5">👩‍🏫 Cô Hoa:</div>
                  <div className="text-base font-extrabold text-slate-900">"What day is it today?"</div>
                </div>

                <div
                  onClick={() => speakWord("It's Thursday.", speechRate)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Nam' ? 'bg-emerald-100 border-emerald-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-0.5">👦 Nam:</div>
                  <div className="text-base font-extrabold text-slate-900">"It's Thursday."</div>
                </div>

                <div
                  onClick={() => speakWord('What do you do on Thursdays?', speechRate)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'MsHoa' ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-0.5">👩‍🏫 Cô Hoa:</div>
                  <div className="text-base font-extrabold text-slate-900">"What do you do on Thursdays?"</div>
                </div>

                <div
                  onClick={() => speakWord('I study at school.', speechRate)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Nam' ? 'bg-emerald-100 border-emerald-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-0.5">👦 Nam:</div>
                  <div className="text-base font-extrabold text-slate-900">"I study at school."</div>
                </div>
              </div>
            </div>

            {/* Dialogue b: Ben & classmate */}
            <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-teal-100 pb-3">
                <span className="text-xl font-black text-teal-800">Tranh b: Hành lang (Saturday)</span>
                <button
                  onClick={playDialogB}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại b</span>
                </button>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => speakWord('What do you do on Saturdays?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Ben' ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-1">🧑‍🦰 Ben hỏi:</div>
                  <div className="text-base font-extrabold text-slate-900">"What do you do on Saturdays?"</div>
                  <div className="text-xs text-slate-600 italic">Cậu làm gì vào các ngày Thứ Bảy?</div>
                </div>

                <div
                  onClick={() => speakWord('I do housework.', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Classmate' ? 'bg-teal-100 border-teal-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-1">👧 Bạn gái trả lời:</div>
                  <div className="text-base font-extrabold text-slate-900">"I do housework."</div>
                  <div className="text-xs text-slate-600 italic">Tớ làm việc nhà giúp bố mẹ.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 30) ================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 24 SGK - Track 30)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen, point and say (Lắng nghe, chỉ vào tranh và luyện nói)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Luyện mẫu câu: <strong>"What do you do on _______?" — "I _______."</strong>
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              4 Hoạt Động Chuẩn SGK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {routineCardsAct2.map(item => (
              <div
                key={item.key}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-400 p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-sm flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-3 text-center border border-amber-200">
                    <div className="text-sm font-black text-amber-900">
                      {item.dayPlural}
                    </div>
                    <div className="text-xs font-bold text-slate-700 mt-0.5">
                      {item.action}
                    </div>
                    <div className="text-[11px] text-slate-500">({item.viAction})</div>
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

                <button
                  onClick={async () => {
                    sound.playClick();
                    await speakWord(item.q, speechRate);
                    await new Promise(r => setTimeout(r, 400));
                    await speakWord(item.a, speechRate);
                    onAddStar(1);
                  }}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Luyện Nghe Hỏi & Đáp</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK (TRANG 24) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 24 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's talk (Hỏi đáp hoạt động ghế đá công viên)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào từng hình tròn để nghe hỏi đáp theo 3 ngày: Tuesdays, Thursdays, Fridays!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { day: 'Tuesdays', action: 'go to school', vi: 'đến trường học', icon: '🎒' },
              { day: 'Thursdays', action: 'listen to music', vi: 'nghe nhạc', icon: '🎧' },
              { day: 'Fridays', action: 'study at school', vi: 'học tập ở lớp', icon: '🏫' }
            ].map(item => (
              <div
                key={item.day}
                onClick={async () => {
                  sound.playClick();
                  await speakWord(`What do you do on ${item.day}?`, speechRate);
                  await new Promise(r => setTimeout(r, 450));
                  await speakWord(`I ${item.action}.`, speechRate);
                  onAddStar(2);
                }}
                className="p-6 rounded-3xl border-2 border-amber-200 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer transition-all space-y-3 text-center group"
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="text-base font-black text-amber-900 uppercase">
                  {item.day}
                </div>
                <div className="text-sm font-bold text-slate-800">
                  "I {item.action}."
                </div>
                <div className="text-xs text-slate-500">({item.vi})</div>
                <div className="text-xs font-bold text-amber-700 flex items-center justify-center gap-1 pt-1">
                  <Volume2 className="w-3.5 h-3.5" /> Bấm hỏi đáp mẫu
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND NUMBER (TRACK 31) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 25 SGK - Track 31)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Listen and number (Nghe và đánh số 1, 2, 3, 4 vào ô tròn)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm nghe từng câu (Track 31) và chọn số thứ tự đúng cho mỗi bức tranh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {act4Data.map(item => (
              <div key={item.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-700">
                    {item.desc}
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
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm scale-105'
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
                        <span className="text-rose-600">Đáp án đúng: Số {item.correctNumber}</span>
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
                await speakWord("One. What day is it today? - It's Monday.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Two. What day is it today? - It's Friday.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Three. What do you do on Saturdays? - I do housework.", speechRate);
                await new Promise(r => setTimeout(r, 400));
                await speakWord("Four. What do you do on Sundays? - I listen to music.", speechRate);
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Track 31</span>
            </button>

            <button
              onClick={handleCheckAct4}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
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

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ (TRANG 25) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 25 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Look, complete and read (Quan sát tranh, điền từ và đọc to)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy chọn chip từ gợi ý để hoàn thành 4 câu hỏi đáp nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Items.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Câu {item.q}</span>
                  <span className="text-xs text-slate-500 font-medium">{item.imageNote}</span>
                </div>

                <div className="space-y-1 text-sm font-bold text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>{item.qText}</div>
                  <div>{item.aText}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bấm điền:</span>
                  {[item.correct, 'Wednesday', 'study at school', 'do housework'].map(chip => (
                    <button
                      key={chip}
                      onClick={() => {
                        sound.playClick();
                        setAct5Answers(prev => ({ ...prev, [item.q]: chip }));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        act5Answers[item.q] === chip
                          ? 'bg-amber-500 text-slate-950 border-amber-500 font-black'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => speakWord(item.audio, speechRate)}
                  className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S SING (TRACK 32) ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Hoạt Động 6: Let's sing (Trang 25 SGK - Track 32)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎵 Bài Hát: "What day is it today?"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cùng bé hát theo giai điệu vui nhộn để ghi nhớ thói quen ngày Thứ Hai (học ở trường) và Chủ Nhật (nghe nhạc)!
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {songStanzas.map((stanza, sIdx) => (
              <div
                key={stanza.day}
                className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-black text-amber-300">Khổ {sIdx + 1}: Ngày {stanza.day}</span>
                  <span className="text-2xl">{stanza.icon}</span>
                </div>

                <div className="space-y-2 text-sm font-bold">
                  <div className={`p-2 rounded-lg transition-colors ${activeSongLine === sIdx * 4 ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-200'}`}>
                    "{stanza.q1}"
                  </div>
                  <div className={`p-2 rounded-lg transition-colors ${activeSongLine === sIdx * 4 + 1 ? 'bg-amber-400 text-slate-950 font-black' : 'text-amber-200'}`}>
                    "{stanza.a1}"
                  </div>
                  <div className={`p-2 rounded-lg transition-colors ${activeSongLine === sIdx * 4 + 2 ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-200'}`}>
                    "{stanza.q2}"
                  </div>
                  <div className={`p-2 rounded-lg transition-colors ${activeSongLine === sIdx * 4 + 3 ? 'bg-amber-400 text-slate-950 font-black' : 'text-amber-200'}`}>
                    "{stanza.a2}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
