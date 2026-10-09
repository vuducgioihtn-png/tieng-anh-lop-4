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
  Clock,
  Edit3,
  Copy,
  Layers,
  Smile,
  ArrowRight
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit2Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit2Lesson3Studio: React.FC<Unit2Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // Activity 2: Listen and circle (Track 24)
  const [act2Answers, setAct2Answers] = useState<{ [q: number]: string | null }>({ 1: null, 2: null });
  const [act2Checked, setAct2Checked] = useState<boolean>(false);

  const act2Questions = [
    {
      q: 1,
      prompt: "1. I _______ at six thirty.",
      audioText: "I get up at six thirty.",
      correctKey: 'a',
      options: [
        { key: 'a', text: 'get up', highlight: 't', soundType: '/t/' },
        { key: 'b', text: 'chat with my friends', highlight: 't', soundType: '/t/' },
        { key: 'c', text: 'read a book', highlight: 'd', soundType: '/d/' }
      ],
      explanation: 'Âm thanh đọc rõ: "I get up at six thirty" ➔ Đáp án đúng là a. get up (kết thúc bằng âm /t/).'
    },
    {
      q: 2,
      prompt: "2. I _______ at five forty-five.",
      audioText: "I go to bed at five forty-five.",
      correctKey: 'c',
      options: [
        { key: 'a', text: 'go out', highlight: 't', soundType: '/t/' },
        { key: 'b', text: 'watch TV with my dad', highlight: 'd', soundType: '/d/' },
        { key: 'c', text: 'go to bed', highlight: 'd', soundType: '/d/' }
      ],
      explanation: 'Âm thanh đọc rõ: "I go to bed at five forty-five" ➔ Đáp án đúng là c. go to bed (kết thúc bằng âm /d/).'
    }
  ];

  const handleCheckAct2 = () => {
    sound.playClick();
    setAct2Checked(true);
    if (act2Answers[1] === 'a' && act2Answers[2] === 'c') {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
      onAddStar(6);
    } else {
      sound.playWrong();
    }
  };

  // Activity 3: Let's chant (Track 25)
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [activeChantLine, setActiveChantLine] = useState<number>(-1);

  const chantLines = [
    { text: 'Get up, get up.', ipa: '/ɡet ʌp, ɡet ʌp/', vi: 'Thức dậy, thức dậy nào.' },
    { text: "I get up at six o'clock.", ipa: "/aɪ ɡet ʌp ət sɪks əˈklɒk/", vi: 'Tớ thức dậy lúc 6 giờ đúng.' },
    { text: "I get up at six o'clock.", ipa: "/aɪ ɡet ʌp ət sɪks əˈklɒk/", vi: 'Tớ thức dậy lúc 6 giờ đúng.' },
    { text: 'Go to bed, go to bed.', ipa: '/ɡəʊ tuː bed, ɡəʊ tuː bed/', vi: 'Đi ngủ, đi ngủ thôi.' },
    { text: 'I go to bed at nine fifteen.', ipa: '/aɪ ɡəʊ tuː bed ət naɪn ˌfɪfˈtiːn/', vi: 'Tớ đi ngủ lúc 9 giờ 15 phút.' },
    { text: 'I go to bed at nine fifteen.', ipa: '/aɪ ɡəʊ tuː bed ət naɪn ˌfɪfˈtiːn/', vi: 'Tớ đi ngủ lúc 9 giờ 15 phút.' }
  ];

  const playFullChant = async () => {
    sound.playClick();
    setIsChanting(true);
    for (let i = 0; i < chantLines.length; i++) {
      setActiveChantLine(i);
      await speakWord(chantLines[i].text, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 450));
    }
    setActiveChantLine(-1);
    setIsChanting(false);
    sound.playStar();
    onAddStar(5);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Activity 4: Read and match (Trang 21)
  const [act4Matches, setAct4Matches] = useState<{ [q: number]: 'a' | 'b' | 'c' | 'd' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);
  const [activeHighlightClue, setActiveHighlightClue] = useState<number | null>(null);

  // Matching key:
  // 1: I get up -> d (6:00 AM)
  // 2: I go to school -> c (7:00 AM)
  // 3: I have dinner -> b (7:30 PM)
  // 4: I go to bed -> a (9:45 PM)
  const act4Items = [
    { q: 1, action: '1. I get up.', correct: 'd' as const, clue: 'I get up at six o\'clock.' },
    { q: 2, action: '2. I go to school.', correct: 'c' as const, clue: 'I go to school at seven o\'clock.' },
    { q: 3, action: '3. I have dinner.', correct: 'b' as const, clue: 'I have dinner at home at seven thirty.' },
    { q: 4, action: '4. I go to bed.', correct: 'a' as const, clue: 'I do my homework and go to bed at nine forty-five.' }
  ];

  const clockOptions = [
    { key: 'a' as const, time: '9:45 PM', label: 'Đồng hồ tím hồng (9:45 PM)' },
    { key: 'b' as const, time: '7:30 PM', label: 'Đồng hồ hồng đậm (7:30 PM)' },
    { key: 'c' as const, time: '7:00 AM', label: 'Đồng hồ xanh lá (7:00 AM)' },
    { key: 'd' as const, time: '6:00 AM', label: 'Đồng hồ đỏ xanh (6:00 AM)' }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    const allCorrect =
      act4Matches[1] === 'd' &&
      act4Matches[2] === 'c' &&
      act4Matches[3] === 'b' &&
      act4Matches[4] === 'a';
    if (allCorrect) {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 70 });
      onAddStar(8);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Let's write (Trang 21)
  const [writeTimes, setWriteTimes] = useState({
    getUp: '6:00',
    breakfast: '6:30',
    school: '7:00'
  });
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const fullWrittenParagraph = `I get up at ${writeTimes.getUp || 'six o\'clock'}. I have breakfast at ${writeTimes.breakfast || 'six thirty'}. I go to school at ${writeTimes.school || 'seven o\'clock'}. What about you? What time do you go to school?`;

  const handleReadWritten = async () => {
    sound.playClick();
    await speakWord(fullWrittenParagraph, speechRate);
    onAddStar(4);
  };

  // Activity 6: Project: My daily routine (Trang 21)
  const [projectData, setProjectData] = useState({
    studentName: 'Nguyen Van An',
    wakeTime: '6:15 AM',
    lunchTime: '11:45 AM',
    bedTime: '9:30 PM'
  });

  const handlePresentProject = async () => {
    sound.playClick();
    const speech = `Hello everyone! This is my daily routine. I get up at six fifteen. I have lunch at school at eleven forty-five. And I go to bed at nine thirty. Thank you for listening!`;
    await speakWord(speech, speechRate);
    sound.playVictory();
    confetti({ particleCount: 70, spread: 80 });
    onAddStar(7);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 20 & 21 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-black shadow-sm">
              <span>🎯 Tiết 3: Phonics /t/ & /d/, Đọc Hiểu & Dự Án Thời Gian Biểu</span>
            </span>
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 16)</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 2 (Trang 18)</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 2: Time and daily routines — Lesson 3
          </h1>
          <p className="text-sm sm:text-base text-purple-100 font-medium leading-relaxed max-w-3xl">
            Luyện chuẩn 2 âm đuôi cốt lõi <strong>/t/ (trong get 🌅)</strong> và <strong>/d/ (trong bed 🛏️)</strong>, đọc hiểu thời gian biểu của bạn nhỏ trường Hoa Lan, tập viết nhật ký ngày và tự tay làm <strong>Dự Án Thời Gian Biểu (Project: My Daily Routine)</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /t/: ge<strong className="text-amber-300">t</strong></span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /d/: be<strong className="text-amber-300">d</strong></span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎵 Bài vè Let's chant</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">📖 Đọc hiểu trường Hoa Lan</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">📋 Bảng thời gian biểu Project</span>
          </div>
        </div>

        {/* Global Controls */}
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
            <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang ngữ âm /t/ & /d/'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          📋
        </div>
      </div>

      {/* ================= BÍ KÍP 3 GIÂY PHÂN BIỆT ÂM /t/ & /d/ ================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-purple-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Quyết Phân Biệt Âm Vô Thanh & Hữu Thanh</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 Bí Kíp 3 Giây: /t/ (Thổi hơi không rung) vs /d/ (Rung cổ họng)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đặt tay lên cổ họng: phát âm <strong>/t/</strong> cổ họng đứng yên; phát âm <strong>/d/</strong> cổ họng rung mạnh!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('get. What time do you get up?', speechRate);
              await new Promise(r => setTimeout(r, 400));
              await speakWord('bed. What time do you go to bed?', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Đối Chiếu 2 Âm /t/ & /d/</span>
          </button>
        </div>

        {/* 2 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Letter t -> /t/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-sky-400/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-sky-500/30 border border-sky-400/40 text-sky-300 font-black text-2xl flex items-center justify-center">
                t
              </span>
              <span className="text-xs font-mono font-bold bg-white/15 text-sky-300 px-3 py-1 rounded-full">
                Âm vô thanh /t/ (Không rung cổ)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-2">
                <span>ge<strong className="text-sky-400 underline">t</strong></span>
                <span className="text-xs font-mono text-indigo-300">/ɡet/</span>
              </div>
              <div className="text-sm font-bold text-slate-200">
                "What time do you ge<strong className="text-sky-400">t</strong> up?"
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <div className="font-bold text-amber-300">👄 Khẩu hình miệng:</div>
              <div className="text-slate-300 leading-relaxed">
                Đầu lưỡi chạm chặt vào chân răng trên rồi bật hơi mạnh ra ngoài. <strong className="text-sky-300">Cổ họng hoàn toàn không rung</strong>.
              </div>
            </div>
          </div>

          {/* Card 2: Letter d -> /d/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-purple-400/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-purple-500/30 border border-purple-400/40 text-purple-300 font-black text-2xl flex items-center justify-center">
                d
              </span>
              <span className="text-xs font-mono font-bold bg-white/15 text-purple-300 px-3 py-1 rounded-full">
                Âm hữu thanh /d/ (Rung mạnh cổ)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-2">
                <span>be<strong className="text-purple-400 underline">d</strong></span>
                <span className="text-xs font-mono text-indigo-300">/bed/</span>
              </div>
              <div className="text-sm font-bold text-slate-200">
                "What time do you go to be<strong className="text-purple-400">d</strong>?"
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <div className="font-bold text-amber-300">👄 Khẩu hình miệng:</div>
              <div className="text-slate-300 leading-relaxed">
                Cùng vị trí lưỡi như âm /t/, nhưng thanh quản phát ra âm trầm và <strong className="text-purple-300">cổ họng rung mạnh</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Phát Âm Cho Phụ Huynh: Cách Sửa Lỗi Ngọng Âm Đuôi</span>
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
              <div className="font-bold text-sky-900 text-sm">💡 1. Lỗi nuốt âm /t/ ở cuối từ</div>
              <p>
                Trẻ em Việt thường nuốt mất âm /t/, đọc "get" thành "ghét". Hãy hướng dẫn con giữ đầu lưỡi ở hàm trên và bật hơi nhẹ "t" để tạo thành âm thanh tự nhiên như người bản xứ.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
              <div className="font-bold text-purple-900 text-sm">💡 2. Phân biệt "bed" và "bet"</div>
              <p>
                Từ "bed" có âm /d/ ở đuôi, nguyên âm /e/ được đọc kéo dài hơn một chút so với từ "bet". Nhắc con phát âm ấm và rung cổ họng nhé!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-purple-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 3 (Trang 20 - 21 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Listen and repeat', icon: '🗣️', tag: 'Track 23' },
            { id: 2, label: '2. Listen and circle', icon: '✏️', tag: 'Track 24' },
            { id: 3, label: "3. Let's chant", icon: '🎵', tag: 'Track 25' },
            { id: 4, label: '4. Read and match', icon: '📖', tag: 'Trang 21' },
            { id: 5, label: "5. Let's write", icon: '✍️', tag: 'Tập viết' },
            { id: 6, label: '6. Project: My daily routine', icon: '📋', tag: 'Dự án' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LISTEN AND REPEAT (TRACK 23) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 20 SGK - Track 23)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen and repeat (Lắng nghe và nhắc lại chuẩn 2 âm /t/ và /d/)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Bé chú ý các chữ cái màu đỏ in đậm để luyện bật âm đuôi chuẩn bản xứ nhé!
              </p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 23 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Sound t -> get */}
            <div className="bg-white rounded-3xl border-2 border-sky-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <span className="text-3xl font-black text-sky-600 font-mono">
                  t <span className="text-sm font-normal text-slate-500 font-sans">(/t/)</span>
                </span>
                <span className="text-2xl">🌅 ⏰</span>
              </div>

              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('get. What time do you get up?', speechRate);
                }}
                className="p-4 bg-sky-50 rounded-2xl border border-sky-200 hover:bg-sky-100/60 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold text-sky-800">
                  <span>Từ trọng tâm:</span>
                  <span className="flex items-center gap-1 text-sky-600"><Volume2 className="w-3.5 h-3.5" /> Bấm nghe</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  ge<span className="text-sky-600 underline">t</span>
                </div>
                <div className="text-xs font-mono text-indigo-700">/ɡet/</div>
                <div className="text-xs font-bold text-slate-700 pt-1">
                  Câu SGK: "What time do you ge<strong className="text-sky-600">t</strong> up?"
                </div>
              </div>
            </div>

            {/* Box 2: Sound d -> bed */}
            <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                <span className="text-3xl font-black text-purple-600 font-mono">
                  d <span className="text-sm font-normal text-slate-500 font-sans">(/d/)</span>
                </span>
                <span className="text-2xl">🛏️ 🌙</span>
              </div>

              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('bed. What time do you go to bed?', speechRate);
                }}
                className="p-4 bg-purple-50 rounded-2xl border border-purple-200 hover:bg-purple-100/60 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold text-purple-800">
                  <span>Từ trọng tâm:</span>
                  <span className="flex items-center gap-1 text-purple-600"><Volume2 className="w-3.5 h-3.5" /> Bấm nghe</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  be<span className="text-purple-600 underline">d</span>
                </div>
                <div className="text-xs font-mono text-indigo-700">/bed/</div>
                <div className="text-xs font-bold text-slate-700 pt-1">
                  Câu SGK: "What time do you go to be<strong className="text-purple-600">d</strong>?"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN AND CIRCLE (TRACK 24) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Hoạt Động 2 (Trang 20 SGK - Track 24)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Listen and circle (Nghe và khoanh tròn đáp án đúng)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm nghe âm thanh câu 1 và câu 2, sau đó chọn đáp án a, b hoặc c tương ứng.
            </p>
          </div>

          <div className="space-y-6">
            {act2Questions.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-base font-extrabold text-slate-900">
                    {item.prompt}
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.audioText, speechRate);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu {item.q}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.options.map(opt => {
                    const isSelected = act2Answers[item.q] === opt.key;
                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200';

                    if (act2Checked) {
                      if (opt.key === item.correctKey) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-black';
                      } else if (isSelected && opt.key !== item.correctKey) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-purple-50 border-purple-500 text-purple-900 ring-2 ring-purple-200 font-bold';
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
                            {opt.text}
                          </span>
                        </div>
                        {act2Checked && opt.key === item.correctKey && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {act2Checked && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    💡 <span className="font-bold text-purple-700">Giải thích: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCheckAct2}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra bài khoanh tròn</span>
              </button>

              {act2Checked && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setAct2Answers({ 1: null, 2: null });
                    setAct2Checked(false);
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

      {/* ================= ACTIVITY 3: LET'S CHANT (TRACK 25) ================= */}
      {activeSection === 3 && (
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Hoạt Động 3: Let's chant (Trang 20 SGK - Track 25)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎵 Bài Vè: "Get up, get up" & "Go to bed, go to bed"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Vỗ tay theo nhịp để rèn luyện ngữ điệu tự nhiên và phân biệt chuẩn 2 âm đuôi /t/ (get) và /d/ (bed)!
              </p>
            </div>

            <button
              onClick={playFullChant}
              disabled={isChanting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isChanting ? 'Đang đọc theo nhịp...' : 'Bắt đầu bài Chant'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stanza 1: Get up at 6:00 AM */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-amber-300 text-sm">Khổ 1: Thức dậy lúc 6:00 AM 🌅</span>
                <span className="px-2 py-0.5 bg-slate-950 text-amber-300 font-mono font-bold text-xs rounded">6:00 AM</span>
              </div>
              <div className="space-y-2">
                {chantLines.slice(0, 3).map((line, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakWord(line.text, speechRate)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border ${
                      activeChantLine === idx
                        ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-102'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                    }`}
                  >
                    <div className="text-base font-extrabold">"{line.text}"</div>
                    <div className="text-xs text-slate-300">→ {line.vi}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stanza 2: Go to bed at 9:15 PM */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-sky-300 text-sm">Khổ 2: Đi ngủ lúc 9:15 PM 🛏️</span>
                <span className="px-2 py-0.5 bg-slate-950 text-amber-300 font-mono font-bold text-xs rounded">9:15 PM</span>
              </div>
              <div className="space-y-2">
                {chantLines.slice(3, 6).map((line, idx) => {
                  const globalIdx = idx + 3;
                  return (
                    <div
                      key={globalIdx}
                      onClick={() => speakWord(line.text, speechRate)}
                      className={`p-3 rounded-xl transition-all cursor-pointer border ${
                        activeChantLine === globalIdx
                          ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-102'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                      }`}
                    >
                      <div className="text-base font-extrabold">"{line.text}"</div>
                      <div className="text-xs text-slate-300">→ {line.vi}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: READ AND MATCH (TRANG 21) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 21 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Read and match (Đọc bài văn trường Hoa Lan và nối đồng hồ tương ứng)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào từng câu nhận định để <strong>soi sáng bằng chứng</strong> trong bài đọc!
            </p>
          </div>

          {/* Reading Passage Box */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase">
                Bài văn bạn học sinh trường Tiểu học Hoa Lan:
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'I am a pupil at Hoa Lan Primary School. I get up at six o\'clock. I wash my face and clean my teeth. Then I have breakfast at six fifteen. I go to school at seven o\'clock. I have lunch at school. I have dinner at home at seven thirty. I do my homework and go to bed at nine forty-five.',
                    speechRate
                  )
                }
                className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold border border-amber-300 flex items-center gap-1 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe toàn bộ bài đọc</span>
              </button>
            </div>

            <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed bg-white p-4 rounded-2xl border border-amber-200">
              "I am a pupil at Hoa Lan Primary School.{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeHighlightClue === 1 ? 'bg-amber-300 ring-2 ring-amber-400 font-black' : ''}`}>
                I get up at six o'clock.
              </span>{' '}
              I wash my face and clean my teeth. Then I have breakfast at six fifteen.{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeHighlightClue === 2 ? 'bg-emerald-300 ring-2 ring-emerald-400 font-black' : ''}`}>
                I go to school at seven o'clock.
              </span>{' '}
              I have lunch at school.{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeHighlightClue === 3 ? 'bg-sky-300 ring-2 ring-sky-400 font-black' : ''}`}>
                I have dinner at home at seven thirty.
              </span>{' '}
              I do my homework and{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeHighlightClue === 4 ? 'bg-purple-300 ring-2 ring-purple-400 font-black' : ''}`}>
                go to bed at nine forty-five.
              </span>"
            </div>
          </div>

          {/* Matching Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Chọn đồng hồ đúng cho 4 hoạt động:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {act4Items.map(item => (
                <div
                  key={item.q}
                  onClick={() => setActiveHighlightClue(item.q)}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 cursor-pointer ${
                    activeHighlightClue === item.q ? 'bg-purple-50/70 border-purple-400' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm">{item.action}</span>
                    <span className="text-[11px] text-purple-700 font-bold">Soi dẫn chứng 💡</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {clockOptions.map(clk => (
                      <button
                        key={clk.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                          setAct4Matches(prev => ({ ...prev, [item.q]: clk.key }));
                        }}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          act4Matches[item.q] === clk.key
                            ? 'bg-purple-600 text-white border-purple-600 shadow-sm font-black'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                        }`}
                      >
                        <div className="text-xs">{clk.key}</div>
                        <div className="text-[10px] font-mono">{clk.time}</div>
                      </button>
                    ))}
                  </div>

                  {act4Checked && (
                    <div className="text-xs font-bold pt-1">
                      {act4Matches[item.q] === item.correct ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng ({item.correct})
                        </span>
                      ) : (
                        <span className="text-rose-600">Đáp án đúng: {item.correct}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCheckAct4}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra đáp án nối</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LET'S WRITE (TRANG 21) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 21 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's write (Tập viết thời gian biểu của bé)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy điền các mốc giờ sinh hoạt của mình để hoàn thành bài văn nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-black text-slate-700 uppercase">Điền các mốc giờ:</h3>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Giờ thức dậy (get up):</label>
                <input
                  type="text"
                  value={writeTimes.getUp}
                  onChange={e => setWriteTimes(prev => ({ ...prev, getUp: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="six o'clock / 6:00"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Giờ ăn sáng (have breakfast):</label>
                <input
                  type="text"
                  value={writeTimes.breakfast}
                  onChange={e => setWriteTimes(prev => ({ ...prev, breakfast: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="six thirty / 6:30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Giờ đi học (go to school):</label>
                <input
                  type="text"
                  value={writeTimes.school}
                  onChange={e => setWriteTimes(prev => ({ ...prev, school: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="seven o'clock / 7:00"
                />
              </div>
            </div>

            {/* Rendered Live Paragraph */}
            <div className="p-6 bg-purple-50/80 rounded-2xl border-2 border-purple-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black text-purple-900 uppercase">Bài văn hoàn chỉnh:</div>
                <div className="text-base font-bold text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-purple-100 shadow-2xs space-y-2">
                  <p>
                    I get up at <span className="text-purple-700 underline font-black">{writeTimes.getUp}</span>. I have breakfast at <span className="text-purple-700 underline font-black">{writeTimes.breakfast}</span>. I go to school at <span className="text-purple-700 underline font-black">{writeTimes.school}</span>.
                  </p>
                  <p className="text-slate-600 italic">
                    What about you? What time do you go to school?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadWritten}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe đọc to bài viết</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    navigator.clipboard?.writeText(fullWrittenParagraph);
                    setHasCopied(true);
                    setTimeout(() => setHasCopied(false), 2000);
                  }}
                  className="px-4 py-3 bg-white text-purple-900 border border-purple-300 rounded-xl text-xs font-bold shadow-2xs"
                >
                  {hasCopied ? 'Đã chép!' : 'Sao chép'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: PROJECT (MY DAILY ROUTINE) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Hoạt Động 6: Project (Trang 21 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Project: My daily routine (Bảng Thời Gian Biểu Của Bé)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy thiết kế bảng thời gian biểu lớp học giống nhóm bạn Ben thuyết trình trên bảng đen nhé!
            </p>
          </div>

          {/* Blackboard Display */}
          <div className="p-6 rounded-3xl bg-slate-900 border-4 border-amber-900 shadow-2xl text-white space-y-5">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋 🧑‍🏫</span>
                <span className="font-black text-amber-300 text-sm uppercase">Blackboard Presentation: My daily routine</span>
              </div>
              <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">Lớp 4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center space-y-2">
                <div className="text-3xl">🌅</div>
                <div className="text-sm font-black text-amber-300">Waking Up</div>
                <div className="text-xs text-slate-300 font-mono">"I get up at 6:15 AM."</div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center space-y-2">
                <div className="text-3xl">🍱</div>
                <div className="text-sm font-black text-emerald-300">Having Lunch</div>
                <div className="text-xs text-slate-300 font-mono">"I have lunch at 11:45 AM."</div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-center space-y-2">
                <div className="text-3xl">🛏️</div>
                <div className="text-sm font-black text-sky-300">Going to Bed</div>
                <div className="text-xs text-slate-300 font-mono">"I go to bed at 9:30 PM."</div>
              </div>
            </div>

            <button
              onClick={handlePresentProject}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Thuyết Trình Bảng Thời Gian Biểu Bằng Tiếng Anh (Có Thưởng Sao ⭐)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
