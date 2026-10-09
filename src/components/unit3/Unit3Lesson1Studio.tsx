import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Calendar,
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
  Hand
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit3Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit3Lesson1Studio: React.FC<Unit3Lesson1StudioProps> = ({
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

  // 7 Days Interactive Calendar
  const weekDays = [
    { name: 'Monday', vi: 'Thứ Hai', ipa: '/ˈmʌndeɪ/', reading: 'MĂN-đây', color: 'from-rose-500 to-red-600', icon: '🔴', tip: 'Thứ Hai đầu tuần ăn uống đầy năng lượng' },
    { name: 'Tuesday', vi: 'Thứ Ba', ipa: '/ˈtjuːzdeɪ/', reading: 'TIU-z-đây', color: 'from-orange-500 to-amber-600', icon: '🟠', tip: 'Nhớ số 2 (two) ➔ Tuesday (Thứ 3)' },
    { name: 'Wednesday', vi: 'Thứ Tư', ipa: '/ˈwenzdeɪ/', reading: 'OEN-z-đây', color: 'from-amber-500 to-yellow-600', icon: '🟡', tip: 'Chữ d câm! Đọc là WENZ-day, không đọc oét-nét-đây' },
    { name: 'Thursday', vi: 'Thứ Năm', ipa: '/ˈθɜːzdeɪ/', reading: 'THƠ-z-đây', color: 'from-emerald-500 to-teal-600', icon: '🟢', tip: 'Đặt đầu lưỡi giữa 2 hàm răng thổi hơi nhẹ tạo âm /θ/' },
    { name: 'Friday', vi: 'Thứ Sáu', ipa: '/ˈfraɪdeɪ/', reading: 'PHRAI-đây', color: 'from-sky-500 to-blue-600', icon: '🔵', tip: 'Ngày thứ 6 bay nhảy tự do (Fly/Fri) sắp nghỉ ngơi' },
    { name: 'Saturday', vi: 'Thứ Bảy', ipa: '/ˈsætədeɪ/', reading: 'XA-tơ-đây', color: 'from-indigo-500 to-purple-600', icon: '🟣', tip: 'Cuối tuần thứ nhất ở nhà giúp bố mẹ' },
    { name: 'Sunday', vi: 'Chủ Nhật', ipa: '/ˈsʌndeɪ/', reading: 'XĂN-đây', color: 'from-pink-500 to-rose-600', icon: '☀️', tip: 'Ngày của ánh mặt trời (Sun) rực rỡ' }
  ];

  // Activity 1: Dialogue A & B (Track 26)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('MsHoa');
    await speakWord('Hi, class. What day is it today?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Class');
    await speakWord("It's Monday.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Ben');
    await speakWord('What day is it today?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Classmate');
    await speakWord("It's Friday.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  // Activity 2: Listen, point and say (Track 27)
  const sgkCalendarsAct2 = [
    { key: 'a', day: 'Monday', date: '5', ipa: '/ˈmʌndeɪ/', readingVi: 'MĂN-đây', meaning: 'Thứ Hai', sentence: "It's Monday." },
    { key: 'b', day: 'Tuesday', date: '6', ipa: '/ˈtjuːzdeɪ/', readingVi: 'TIU-z-đây', meaning: 'Thứ Ba', sentence: "It's Tuesday." },
    { key: 'c', day: 'Wednesday', date: '7', ipa: '/ˈwenzdeɪ/', readingVi: 'OEN-z-đây', meaning: 'Thứ Tư', sentence: "It's Wednesday." },
    { key: 'd', day: 'Thursday', date: '8', ipa: '/ˈθɜːzdeɪ/', readingVi: 'THƠ-z-đây', meaning: 'Thứ Năm', sentence: "It's Thursday." }
  ];

  // Activity 3: Let's talk
  const act3Calendars = [
    { day: 'Tuesday', date: '12', sentence: "It's Tuesday." },
    { day: 'Wednesday', date: '13', sentence: "It's Wednesday." },
    { day: 'Thursday', date: '14', sentence: "It's Thursday." },
    { day: 'Friday', date: '15', sentence: "It's Friday." }
  ];

  // Activity 4: Listen and tick (Track 28)
  const [act4Answers, setAct4Answers] = useState<{ [q: number]: 'a' | 'b' | null }>({ 1: null, 2: null });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  // Script Track 28:
  // 1: "What day is it today? - It's Wednesday." (Option b: Wednesday 13)
  // 2: "What day is it today? - It's Thursday." (Option a: Thursday 14)
  const act4Data = [
    {
      q: 1,
      audioText: "What day is it today? - It's Wednesday.",
      correct: 'b' as const,
      optA: { key: 'a' as const, day: 'Tuesday', date: '12', label: 'Tuesday 12' },
      optB: { key: 'b' as const, day: 'Wednesday', date: '13', label: 'Wednesday 13' },
      explanation: 'Âm thanh đọc rõ: "It\'s Wednesday" ➔ Đáp án đúng là b (Wednesday 13).'
    },
    {
      q: 2,
      audioText: "What day is it today? - It's Thursday.",
      correct: 'a' as const,
      optA: { key: 'a' as const, day: 'Thursday', date: '14', label: 'Thursday 14' },
      optB: { key: 'b' as const, day: 'Friday', date: '15', label: 'Friday 15' },
      explanation: 'Âm thanh đọc rõ: "It\'s Thursday" ➔ Đáp án đúng là a (Thursday 14).'
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

  const act5Items = [
    {
      q: 1,
      calendar: 'Monday 11',
      promptA: 'A: What day is it today?',
      promptB: "B: It's _______.",
      correct: 'Monday',
      fullSentence: "What day is it today? - It's Monday."
    },
    {
      q: 2,
      calendar: 'Friday 15',
      promptA: 'A: What day is it today?',
      promptB: "B: It's _______.",
      correct: 'Friday',
      fullSentence: "What day is it today? - It's Friday."
    },
    {
      q: 3,
      calendar: 'Tuesday 12',
      promptA: 'A: _______ is it today?',
      promptB: "B: _______ Tuesday.",
      correct: 'It\'s',
      fullSentence: "What day is it today? - It's Tuesday."
    },
    {
      q: 4,
      calendar: 'Thursday 14',
      promptA: 'A: What day is it _______?',
      promptB: "B: _______.",
      correct: 'It\'s Thursday',
      fullSentence: "What day is it today? - It's Thursday."
    }
  ];

  // Activity 6: Slap the board game
  const slapBoardWords = ['Friday', 'Tuesday', 'Thursday', 'Monday', 'Wednesday'];
  const [targetSlapWord, setTargetSlapWord] = useState<string>('Monday');
  const [slappedWord, setSlappedWord] = useState<string | null>(null);
  const [slapScore, setSlapScore] = useState<number>(0);

  const handleSlapWord = (word: string) => {
    sound.playClick();
    setSlappedWord(word);
    if (word === targetSlapWord) {
      sound.playVictory();
      setSlapScore(prev => prev + 1);
      onAddStar(3);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      sound.playWrong();
    }
  };

  const nextSlapRound = () => {
    sound.playClick();
    setSlappedWord(null);
    let next = slapBoardWords[Math.floor(Math.random() * slapBoardWords.length)];
    while (next === targetSlapWord) {
      next = slapBoardWords[Math.floor(Math.random() * slapBoardWords.length)];
    }
    setTargetSlapWord(next);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 22 & 23 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-300 text-slate-950 rounded-full text-xs font-black shadow-sm">
              <span>📅 Tiết 1: Hỏi & Nói Thứ Trong Tuần — "What day is it today?"</span>
            </span>
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Sang Tiết 2 (Trang 24) ➔</span>
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
            Unit 3: My week — Lesson 1
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed max-w-3xl">
            Làm quen với câu hỏi thứ <strong>"What day is it today?"</strong> và 7 ngày trong tuần từ <strong>Monday 🔴</strong> đến <strong>Sunday ☀️</strong>, rèn phản xạ nhận biết tờ lịch và thử thách trò chơi <strong>Slap the board (Đập bảng)</strong> sôi động!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗓️ Monday (Thứ 2)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗓️ Tuesday (Thứ 3)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗓️ Wednesday (Thứ 4)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗓️ Thursday (Thứ 5)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗓️ Friday (Thứ 6)</span>
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
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang 7 ngày trong tuần'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          📅
        </div>
      </div>

      {/* ================= BÍ KÍP NÃO PHẢI 7 NGÀY TRONG TUẦN ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Não Phải Ghi Nhớ 7 Thứ Siêu Dễ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "What day is it today?" ➔ "It's [Thứ]!"</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Điểm mấu chốt: <strong>Wednesday</strong> có chữ 'd' câm (đọc là <em>OEN-z-đây</em>), <strong>Thursday</strong> phải đưa lưỡi ra thổi hơi /θ/!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('What day is it today? It is Monday.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Câu Hỏi Mẫu</span>
          </button>
        </div>

        {/* 7 Days Interactive Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weekDays.map(d => (
            <div
              key={d.name}
              onClick={() => {
                sound.playClick();
                speakWord(`It's ${d.name}.`, speechRate);
              }}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400 cursor-pointer transition-all space-y-2 text-center group"
            >
              <div className="text-2xl">{d.icon}</div>
              <div className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                {d.name}
              </div>
              <div className="text-xs font-bold text-amber-300">({d.vi})</div>
              <div className="text-[10px] font-mono text-slate-300">{d.ipa}</div>
              <div className="text-[10px] bg-slate-950/60 text-slate-300 rounded py-0.5 px-1 font-medium">
                {d.reading}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Sửa 3 Lỗi Sai Thường Gặp Của Thứ</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 text-sm">💡 1. Lỗi đọc "Wednesday"</div>
              <p>
                Trẻ thường đọc từng chữ thành "Oét-nét-đây". Bố mẹ nhắc con: chữ <strong>d</strong> bị câm, chỉ đọc là <strong>/ˈwenzdeɪ/</strong> (OEN-z-đây) thật gọn gàng!
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-950 text-sm">💡 2. Phân biệt Tuesday & Thursday</div>
              <p>
                <strong>Tuesday</strong> bắt đầu bằng /tj/ đọc là <em>TIU-z-đây</em>. <strong>Thursday</strong> bắt đầu bằng âm thè lưỡi /θ/ đọc là <em>THƠ-z-đây</em>.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <div className="font-bold text-rose-950 text-sm">💡 3. Chữ cái đầu luôn viết hoa</div>
              <p>
                Trong tiếng Anh, tất cả 7 thứ trong tuần (Monday, Tuesday...) đều phải <strong>viết hoa chữ cái đầu tiên</strong> dù đứng ở bất kỳ vị trí nào trong câu!
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
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 1 (Trang 22 - 23 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Look, listen & repeat', icon: '🗣️', tag: 'Track 26' },
            { id: 2, label: '2. Listen, point & say', icon: '🗓️', tag: 'Track 27' },
            { id: 3, label: "3. Let's talk", icon: '💬', tag: 'Trang 22' },
            { id: 4, label: '4. Listen & tick', icon: '✏️', tag: 'Track 28' },
            { id: 5, label: '5. Look, complete & read', icon: '📝', tag: 'Trang 23' },
            { id: 6, label: "6. Slap the board", icon: '🎮', tag: 'Đập bảng' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 26) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 22 SGK - Track 26)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Look, listen and repeat (Quan sát tranh, nghe và nhắc lại)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Làm quen với câu hỏi thứ trong lớp học của cô Hoa (Tranh a: Monday) và hành lang của bạn Ben (Tranh b: Friday).
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 26 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue a: Ms Hoa in classroom */}
            <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="text-xl font-black text-rose-700">Tranh a: Lớp học cô Hoa (Monday)</span>
                <button
                  onClick={playDialogA}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại a</span>
                </button>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => speakWord('Hi, class. What day is it today?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'MsHoa' ? 'bg-rose-100 border-rose-400 ring-2 ring-rose-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👩‍🏫 Cô Hoa:</span>
                    <span className="text-rose-600 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"Hi, class. What day is it today?"</div>
                  <div className="text-xs text-slate-600 italic">Chào cả lớp. Hôm nay là thứ mấy thế các em?</div>
                </div>

                <div
                  onClick={() => speakWord("It's Monday.", speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Class' ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👦👧 Cả lớp:</span>
                    <span className="text-amber-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"It's Monday."</div>
                  <div className="text-xs text-slate-600 italic">Dạ thưa cô hôm nay là Thứ Hai ạ.</div>
                </div>
              </div>
            </div>

            {/* Dialogue b: Ben & classmate */}
            <div className="bg-white rounded-3xl border-2 border-sky-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <span className="text-xl font-black text-sky-700">Tranh b: Hành lang (Friday)</span>
                <button
                  onClick={playDialogB}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe Hội Thoại b</span>
                </button>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => speakWord('What day is it today?', speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Ben' ? 'bg-sky-100 border-sky-400 ring-2 ring-sky-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>🧑‍🦰 Ben:</span>
                    <span className="text-sky-600 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"What day is it today?"</div>
                  <div className="text-xs text-slate-600 italic">Hôm nay là thứ mấy vậy bạn?</div>
                </div>

                <div
                  onClick={() => speakWord("It's Friday.", speechRate)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    activeSpeaker === 'Classmate' ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                    <span>👧 Bạn gái:</span>
                    <span className="text-emerald-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Nghe</span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900">"It's Friday."</div>
                  <div className="text-xs text-slate-600 italic">Hôm nay là Thứ Sáu đó.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 27) ================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Hoạt Động 2 (Trang 22 SGK - Track 27)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen, point and say (Lắng nghe, chỉ vào tờ lịch và luyện nói)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Luyện mẫu câu hỏi đáp: <strong>"What day is it today?" — "It's [Day]."</strong>
              </p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full shrink-0">
              4 Tờ Lịch SGK Trang 22
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sgkCalendarsAct2.map(item => (
              <div
                key={item.key}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-400 p-5 shadow-sm space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-sm flex items-center justify-center">
                      {item.key}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{item.meaning}</span>
                  </div>

                  {/* Calendar Page Graphic */}
                  <div className="rounded-2xl border-2 border-red-300 bg-white shadow-md overflow-hidden text-center">
                    <div className="bg-red-500 text-white py-1.5 font-bold text-xs uppercase tracking-wider">
                      {item.day}
                    </div>
                    <div className="p-4 font-black font-mono text-4xl text-slate-900">
                      {item.date}
                    </div>
                  </div>

                  <div className="space-y-1 text-center">
                    <div className="text-base font-black text-slate-900">{item.sentence}</div>
                    <div className="text-xs font-mono text-indigo-700">{item.ipa}</div>
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 rounded py-0.5 px-1.5">
                      🗣️ {item.readingVi}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(`What day is it today? ${item.sentence}`, speechRate);
                    onAddStar(1);
                  }}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK (TRANG 22) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 3 (Trang 22 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's talk (Hỏi đáp thứ trong tuần tại nhà)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào từng tờ lịch treo tường để nghe cậu bé và mẹ đối thoại nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {act3Calendars.map((cal, idx) => (
              <div
                key={idx}
                onClick={async () => {
                  sound.playClick();
                  await speakWord('What day is it today?', speechRate);
                  await new Promise(r => setTimeout(r, 450));
                  await speakWord(cal.sentence, speechRate);
                  onAddStar(2);
                }}
                className="p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/60 cursor-pointer transition-all space-y-3 text-center group"
              >
                <div className="rounded-xl border border-red-300 bg-white overflow-hidden inline-block w-24 shadow-sm">
                  <div className="bg-red-500 text-white text-[10px] font-bold py-0.5 uppercase">
                    {cal.day}
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900 py-1">
                    {cal.date}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-amber-800">
                    "{cal.sentence}"
                  </div>
                  <div className="text-xs text-amber-700 font-bold flex items-center justify-center gap-1 pt-1">
                    <Volume2 className="w-3.5 h-3.5" /> Bấm hỏi đáp
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND TICK (TRACK 28) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 23 SGK - Track 28)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Listen and tick (Lắng nghe và tích chọn tờ lịch đúng)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé bấm nghe âm thanh câu 1 và câu 2, sau đó tích chọn tờ lịch `a` hoặc `b` tương ứng nhé.
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
                    <span>Nghe câu {item.q}</span>
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
                      btnStyle = 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-200 font-bold';
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
                        <div className="flex items-center gap-4">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs">
                            {opt.key}
                          </span>
                          <div className="w-20 rounded-xl border border-red-300 bg-white overflow-hidden text-center shadow-xs">
                            <div className="bg-red-500 text-white text-[10px] font-bold py-0.5 uppercase">
                              {opt.day}
                            </div>
                            <div className="text-xl font-mono font-black text-slate-900 py-0.5">
                              {opt.date}
                            </div>
                          </div>
                          <span className="font-bold text-sm text-slate-800">{opt.label}</span>
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
                    💡 <span className="font-bold text-amber-700">Giải thích: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3">
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

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ (TRANG 23) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 23 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Look, complete and read (Quan sát tờ lịch, điền từ và đọc to)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy bấm vào các chip từ gợi ý để hoàn thành 4 đoạn hội thoại hỏi thứ nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Items.map(item => (
              <div key={item.q} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">Câu {item.q}</span>
                  <span className="px-2.5 py-0.5 bg-red-100 text-red-700 font-bold text-xs rounded border border-red-200">
                    {item.calendar}
                  </span>
                </div>

                <div className="space-y-1 text-sm font-bold text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>{item.promptA}</div>
                  <div>{item.promptB}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium">Bấm điền:</span>
                  {[item.correct, 'Tuesday', 'Friday', 'What day'].map(chip => (
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
                  onClick={() => speakWord(item.fullSentence, speechRate)}
                  className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu hoàn chỉnh</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: SLAP THE BOARD GAME (TRANG 23) ================= */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Hand className="w-4 h-4" />
                <span>Hoạt Động 6: Let's play (Trang 23 SGK)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎮 Trò Chơi: Slap the board (Đập Bảng Thứ Trong Tuần)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cô giáo đọc câu: "It's [Thứ] today." Bé hãy nhanh tay bấm đập đúng từ trên bảng đen!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-1.5 bg-amber-400/20 border border-amber-400/40 rounded-xl text-amber-300 font-black text-xs">
                ⭐ Điểm: {slapScore}
              </div>
              <button
                onClick={nextSlapRound}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow transition-transform active:scale-95"
              >
                Vòng Tiếp Theo ➔
              </button>
            </div>
          </div>

          {/* Teacher's Voice Prompt */}
          <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase">👩‍🏫 Cô giáo đọc to:</span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                "It's {targetSlapWord} today."
              </div>
              <div className="text-xs text-slate-300">Mau bấm đập vào từ "{targetSlapWord}" trên bảng đen!</div>
            </div>

            <button
              onClick={() => speakWord(`It's ${targetSlapWord} today.`, speechRate)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Nghe Lại Lệnh Cô Đọc</span>
            </button>
          </div>

          {/* Blackboard with 5 Words */}
          <div className="p-8 rounded-3xl bg-emerald-950 border-4 border-amber-900 shadow-2xl relative overflow-hidden">
            <div className="text-center text-xs font-mono text-emerald-400 mb-6 uppercase tracking-wider font-bold">
              ★ CLASSROOM BLACKBOARD ★
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
              {slapBoardWords.map(word => {
                const isSelected = slappedWord === word;
                const isCorrect = word === targetSlapWord;

                let btnStyle = 'bg-white/10 hover:bg-white/25 text-white border-white/20 hover:scale-105';
                if (isSelected) {
                  if (isCorrect) {
                    btnStyle = 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-300 scale-110 font-black';
                  } else {
                    btnStyle = 'bg-rose-500 text-white border-rose-400 ring-4 ring-rose-300';
                  }
                }

                return (
                  <button
                    key={word}
                    onClick={() => handleSlapWord(word)}
                    className={`px-6 py-4 rounded-2xl border-2 text-lg sm:text-2xl font-black tracking-wide font-sans transition-all shadow-md active:scale-95 flex items-center gap-2 ${btnStyle}`}
                  >
                    <span>✋</span>
                    <span>{word}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
