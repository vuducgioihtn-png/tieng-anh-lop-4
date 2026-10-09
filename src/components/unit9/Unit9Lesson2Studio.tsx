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
  Image as ImageIcon
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit9Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit9Lesson2Studio: React.FC<Unit9Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Autumn/Winter Months in Lesson 2
  const lesson2Months = [
    {
      id: 'september',
      month: 'September',
      monthVi: 'Tháng 9',
      ipa: '/sepˈtem.bər/',
      reading: 'Xép-tem-bờ',
      season: 'Đầu Thu • Khai Giảng',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      badgeBg: 'bg-emerald-600',
      icon: '🎒',
      sentence: "When's your sports day? - It's in September.",
      hint: 'Tháng khai trường rộn rã cờ hoa'
    },
    {
      id: 'october',
      month: 'October',
      monthVi: 'Tháng 10',
      ipa: '/ɒkˈtəʊ.bər/',
      reading: 'Óc-tâu-bờ',
      season: 'Giữa Thu • Mát Mẻ',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      icon: '🎃',
      sentence: "When's your sports day? - It's in October.",
      hint: 'Mùa thu thời tiết lý tưởng để chạy đua'
    },
    {
      id: 'november',
      month: 'November',
      monthVi: 'Tháng 11',
      ipa: '/nəʊˈvem.bər/',
      reading: 'Nâu-vem-bờ',
      season: 'Cuối Thu • Chớm Lạnh',
      color: 'bg-orange-50 border-orange-300 text-orange-800',
      badgeBg: 'bg-orange-600',
      icon: '🍂',
      sentence: "When's your sports day? - It's in November.",
      hint: 'Tháng tri ân thầy cô và thi đấu thể thao'
    },
    {
      id: 'december',
      month: 'December',
      monthVi: 'Tháng 12',
      ipa: '/dɪˈsem.bər/',
      reading: 'Đi-xem-bờ',
      season: 'Đầu Đông • Giáng Sinh',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      icon: '🎄',
      sentence: "When's your sports day? - It's in December.",
      hint: 'Tháng cuối cùng của năm với không khí lễ hội'
    }
  ];

  // Selected Month for Let's Talk Section 3
  const [selectedMonthTalk, setSelectedMonthTalk] = useState<string>('October');

  // Activity 4: Listen and Tick State
  const [tickedOptions, setTickedOptions] = useState<{ [qId: number]: 'a' | 'b' | null }>({
    1: null,
    2: null
  });
  const [tickChecked, setTickChecked] = useState<boolean>(false);
  const correctTicks: { [qId: number]: 'a' | 'b' } = {
    1: 'b', // October
    2: 'b'  // November
  };

  // Activity 5: Look, complete and read state
  const [fillAnswers2, setFillAnswers2] = useState<{
    d1_a: string;
    d1_b: string;
    d2_a: string;
    d2_b: string;
    d2_c: string;
  }>({
    d1_a: '',
    d1_b: '',
    d2_a: '',
    d2_b: '',
    d2_c: ''
  });
  const [fillChecked2, setFillChecked2] = useState<boolean>(false);

  // Activity 6: Fast Team Game "Who's faster?" State
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameRound, setGameRound] = useState<number>(0);
  const gameChallenges = [
    { target: 'January', options: ['January', 'June', 'July'], correct: 'January' },
    { target: 'March', options: ['May', 'March', 'August'], correct: 'March' },
    { target: 'October', options: ['October', 'November', 'December'], correct: 'October' },
    { target: 'August', options: ['April', 'August', 'September'], correct: 'August' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Trophy className="w-4 h-4 text-amber-200" />
              <span>Unit 9: Our sports day • Lesson 2 (Trang 64 - 65 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 2: Hỏi Khi Nào Có Ngày Hội Thể Thao?
            </h1>
            <p className="text-sm sm:text-base text-amber-50 max-w-2xl font-medium">
              Làm quen với câu hỏi mở "When's your sports day?" và khám phá 4 tháng thu đông đặc sắc: <br className="hidden sm:inline" />
              <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded-lg inline-block mt-1">
                "When's your sports day?" — "It's in October / November / December..."
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>⬅️ Quay Lại Tiết 1</span>
              </button>
            )}
            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="px-4 py-2.5 bg-white text-amber-800 hover:bg-amber-50 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Sang Tiết 3 (Phonics)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🖼️' },
          { id: 2, label: '2. Listen, point & say', icon: '🍂' },
          { id: 3, label: '3. Let’s talk (12 Tháng)', icon: '💬' },
          { id: 4, label: '4. Listen & tick', icon: '🎧' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: '6. Game: Who\'s faster?', icon: '⚡' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-amber-600 text-white shadow-md scale-102 ring-2 ring-amber-400/30'
                : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 91) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                🖼️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Look, listen and repeat (Track 91 SGK Trang 64)
                </h3>
                <p className="text-xs text-slate-500">
                  Quan sát bức tranh treo trên tường và lắng nghe cuộc đối thoại tìm hiểu về thời gian tổ chức
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("What's that? It's a picture of our sports day. When's your sports day? It's in October.", speechRate);
                onAddStar(1);
              }}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Cả Đoạn</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tranh a */}
            <div className="bg-gradient-to-b from-amber-50/60 to-white rounded-2xl border-2 border-amber-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-xs font-black">
                  Tranh a
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🖼️ Bức ảnh: Chạy điền kinh ngày hội thể thao
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700">Bạn nam (áo kẻ xanh lá):</span>
                    <button
                      onClick={() => speakWord("What's that?", speechRate)}
                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "What's that?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Đó là cái gì thế?)
                  </p>
                  <p className="text-[11px] text-amber-600 font-mono">
                    🗣️ /wɒts ðæt/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-orange-700">Bạn nữ (áo hoa):</span>
                    <button
                      onClick={() => speakWord("It's a picture of our sports day.", speechRate)}
                      className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "It's a picture of our sports day."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Đó là bức ảnh chụp ngày hội thể thao trường tớ đấy.)
                  </p>
                  <p className="text-[11px] text-orange-600 font-mono">
                    🗣️ /ɪts ə ˈpɪk.tʃər əv aʊər spɔːts deɪ/
                  </p>
                </div>
              </div>
            </div>

            {/* Tranh b */}
            <div className="bg-gradient-to-b from-orange-50/60 to-white rounded-2xl border-2 border-orange-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-orange-600 text-white rounded-lg text-xs font-black">
                  Tranh b
                </span>
                <span className="text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🗓️ Mốc thời gian: Tháng 10
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700">Bạn nam hỏi:</span>
                    <button
                      onClick={() => speakWord("When's your sports day?", speechRate)}
                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "When's your sports day?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Khi nào thì đến ngày hội thể thao trường bạn?)
                  </p>
                  <p className="text-[11px] text-amber-600 font-mono">
                    🗣️ /wenz jɔːr spɔːts deɪ/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-orange-700">Bạn nữ đáp:</span>
                    <button
                      onClick={() => speakWord("It's in October.", speechRate)}
                      className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "It's in October."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Nó diễn ra vào Tháng 10.)
                  </p>
                  <p className="text-[11px] text-orange-600 font-mono">
                    🗣️ /ɪts ɪn ɒkˈtəʊ.bər/
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT AND SAY (TRACK 92) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                🍂
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen, point and say (Track 92 SGK Trang 64)
                </h3>
                <p className="text-xs text-slate-500">
                  Luyện tập 4 tháng cuối năm có đuôi "-ber" độc đáo: September, October, November, December
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson2Months.map(item => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border-2 ${item.color} space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`px-2.5 py-1 ${item.badgeBg} text-white rounded-lg text-xs font-black tracking-wide`}>
                      {item.season}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black">{item.month} ({item.monthVi})</h4>
                    <p className="text-xs opacity-75 font-mono">{item.ipa} • Đọc: "{item.reading}"</p>
                    <p className="text-[11px] text-slate-500 mt-1">{item.hint}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-black/10 space-y-2 text-xs text-slate-800">
                    <div className="font-bold flex items-center justify-between">
                      <span>❓ When's your sports day?</span>
                      <button
                        onClick={() => speakWord("When's your sports day?", speechRate)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                      </button>
                    </div>
                    <div className="font-black text-amber-700 flex items-center justify-between">
                      <span>💬 It's in {item.month}.</span>
                      <button
                        onClick={() => speakWord(`It's in ${item.month}.`, speechRate)}
                        className="p-1 bg-amber-100 hover:bg-amber-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[11px] text-slate-500">
                    Đuôi: <strong>-ber</strong> (/bər/)
                  </span>
                  <button
                    onClick={() => {
                      speakWord(item.sentence, speechRate);
                      onAddStar(1);
                    }}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg shadow-2xs border border-slate-200 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 text-amber-600" />
                    <span>Luyện Đọc Cả Câu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                💬
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s talk (SGK Trang 64)
                </h3>
                <p className="text-xs text-slate-500">
                  Hỏi và trả lời câu hỏi "When's your sports day? - It's in [Tháng]."
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {lesson2Months.map(m => {
              const isSelected = selectedMonthTalk === m.month;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedMonthTalk(m.month);
                    speakWord(m.month, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-500 text-white shadow-md scale-103 font-black'
                      : 'border-slate-200 bg-white hover:bg-amber-50 text-slate-800'
                  }`}
                >
                  <span className="text-2xl block mb-1">{m.icon}</span>
                  <div className="font-black text-base">{m.month}</div>
                  <div className={`text-xs ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>{m.monthVi}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 uppercase">Đối Thoại Thực Hành:</span>
              <button
                onClick={() => {
                  speakWord(`When's your sports day? It's in ${selectedMonthTalk}.`, speechRate);
                  onAddStar(1);
                }}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Mẫu Với {selectedMonthTalk}</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200 text-sm space-y-2">
              <p className="font-bold text-slate-800">
                A: "When's your sports day?"
              </p>
              <p className="font-black text-amber-700">
                B: "It's in {selectedMonthTalk}."
              </p>
              <p className="text-xs text-slate-500 italic">
                (Khi nào là ngày hội thể thao trường bạn? - Vào Tháng {selectedMonthTalk === 'September' ? '9' : selectedMonthTalk === 'October' ? '10' : selectedMonthTalk === 'November' ? '11' : '12'}.)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND TICK (TRACK 93) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                🎧
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Listen and tick (Track 93 SGK Trang 65)
                </h3>
                <p className="text-xs text-slate-500">
                  Lắng nghe đoạn băng Track 93 và tích chọn đáp án a hoặc b tương ứng
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: When's your sports day? It's in October. Number two: When's your sports day? It's in November.", speechRate);
              }}
              className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Track 93</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Question 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 1:</span>
                <button
                  onClick={() => speakWord("When's your sports day? It's in October.", speechRate)}
                  className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 1</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'a' as const, label: 'a. DECEMBER', icon: '🎄' },
                  { key: 'b' as const, label: 'b. OCTOBER', icon: '🎃' }
                ].map(opt => {
                  const isSelected = tickedOptions[1] === opt.key;
                  const isCorrect = opt.key === correctTicks[1];
                  const showResult = tickChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setTickedOptions(prev => ({ ...prev, 1: opt.key }));
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-black shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{opt.icon}</span>
                      <span className="text-xs font-black">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 2:</span>
                <button
                  onClick={() => speakWord("When's your sports day? It's in November.", speechRate)}
                  className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 2</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'a' as const, label: 'a. SEPTEMBER', icon: '🎒' },
                  { key: 'b' as const, label: 'b. NOVEMBER', icon: '🍂' }
                ].map(opt => {
                  const isSelected = tickedOptions[2] === opt.key;
                  const isCorrect = opt.key === correctTicks[2];
                  const showResult = tickChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setTickedOptions(prev => ({ ...prev, 2: opt.key }));
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-black shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{opt.icon}</span>
                      <span className="text-xs font-black">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setTickChecked(true);
                if (tickedOptions[1] === correctTicks[1] && tickedOptions[2] === correctTicks[2]) {
                  sound.playVictory();
                  confetti({ particleCount: 40 });
                  onAddStar(3);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án Nghe</span>
            </button>

            <button
              onClick={() => {
                setTickedOptions({ 1: null, 2: null });
                setTickChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Look, complete and read (SGK Trang 65)
                </h3>
                <p className="text-xs text-slate-500">
                  Nhìn bong bóng suy nghĩ của các bạn nhỏ và điền từ vào chỗ trống
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Dialogue 1 */}
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-black text-amber-900">Đoạn 1 (Bạn nam: September • Bạn nữ: November)</span>
              </div>
              <div className="text-sm font-bold text-slate-800 space-y-2">
                <p>
                  1. A: Is your sports day in September?
                  <br />
                  &nbsp;&nbsp;&nbsp;B:{' '}
                  <input
                    type="text"
                    placeholder="Yes"
                    value={fillAnswers2.d1_a}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d1_a: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-16"
                  />
                  , it is. When's your sports day?
                  <br />
                  &nbsp;&nbsp;&nbsp;A: It's in{' '}
                  <input
                    type="text"
                    placeholder="November"
                    value={fillAnswers2.d1_b}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d1_b: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-24"
                  />
                  .
                </p>
              </div>
              {fillChecked2 && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án chuẩn: Ô 1 điền <strong>"Yes"</strong> • Ô 2 điền <strong>"November"</strong>
                </p>
              )}
            </div>

            {/* Dialogue 2 */}
            <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-200 space-y-3">
              <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                <span className="text-xs font-black text-orange-900">Đoạn 2 (Bạn nữ: October • Bạn nam: December)</span>
              </div>
              <div className="text-sm font-bold text-slate-800 space-y-2">
                <p>
                  2. A: Our sports day is in October.{' '}
                  <input
                    type="text"
                    placeholder="Is"
                    value={fillAnswers2.d2_a}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_a: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-14"
                  />{' '}
                  your sports day in October too?
                  <br />
                  &nbsp;&nbsp;&nbsp;B: No, it isn't.
                  <br />
                  &nbsp;&nbsp;&nbsp;A:{' '}
                  <input
                    type="text"
                    placeholder="When's"
                    value={fillAnswers2.d2_b}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_b: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-20"
                  />{' '}
                  your sports day?
                  <br />
                  &nbsp;&nbsp;&nbsp;B: It's in{' '}
                  <input
                    type="text"
                    placeholder="December"
                    value={fillAnswers2.d2_c}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_c: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-24"
                  />
                  .
                </p>
              </div>
              {fillChecked2 && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án chuẩn: Ô 1: <strong>"Is"</strong> • Ô 2: <strong>"When's"</strong> • Ô 3: <strong>"December"</strong>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFillChecked2(true);
                const d1_aOk = fillAnswers2.d1_a.trim().toLowerCase() === 'yes';
                const d1_bOk = fillAnswers2.d1_b.trim().toLowerCase() === 'november';
                const d2_aOk = fillAnswers2.d2_a.trim().toLowerCase() === 'is';
                const d2_bOk = fillAnswers2.d2_b.trim().toLowerCase().includes('when');
                const d2_cOk = fillAnswers2.d2_c.trim().toLowerCase() === 'december';
                if (d1_aOk && d1_bOk && d2_aOk && d2_bOk && d2_cOk) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Bài Tập</span>
            </button>

            <button
              onClick={() => {
                setFillAnswers2({
                  d1_a: 'Yes',
                  d1_b: 'November',
                  d2_a: 'Is',
                  d2_b: "When's",
                  d2_c: 'December'
                });
                setFillChecked2(true);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-amber-700 hover:text-amber-900 font-bold"
            >
              Xem đáp án mẫu
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: GAME "WHO'S FASTER?" ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl text-xl font-black">
                ⚡
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Let’s play — "Who’s faster?" (Ai nhanh hơn? · SGK Trang 65)
                </h3>
                <p className="text-xs text-slate-500">
                  Thử tài phản xạ nhanh: Nghe câu lệnh và bấm chọn đúng tháng thi đấu thể thao
                </p>
              </div>
            </div>
            <div className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl">
              🏆 Điểm: {gameScore}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 text-center space-y-5">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">
              Mục tiêu vòng {gameRound + 1} / {gameChallenges.length}
            </span>

            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                "Our sports day is in {gameChallenges[gameRound].target}."
              </h4>
              <p className="text-xs text-slate-500">Hãy chọn đúng tấm thẻ tháng này nhanh nhất:</p>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {gameChallenges[gameRound].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    if (opt === gameChallenges[gameRound].correct) {
                      sound.playCorrect();
                      setGameScore(prev => prev + 10);
                      onAddStar(1);
                      if (gameRound < gameChallenges.length - 1) {
                        setGameRound(prev => prev + 1);
                      } else {
                        sound.playVictory();
                        confetti({ particleCount: 50 });
                        onAddStar(5);
                      }
                    } else {
                      sound.playWrong();
                    }
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-amber-600 hover:text-white text-slate-800 font-black rounded-2xl border-2 border-amber-200 shadow-sm transition-all hover:scale-105"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={() => speakWord(`Our sports day is in ${gameChallenges[gameRound].target}.`, speechRate)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-amber-700 rounded-xl text-xs font-bold border border-amber-200"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe lại câu lệnh</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-5 sm:p-6 border-2 border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 2 (Lesson 2)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-amber-700">1. So Sánh Mẫu Câu:</span>
              <p>
                • Tiết 1: Hỏi Có/Không ➔ <em>"Is your sports day in May?"</em>
                <br />
                • Tiết 2: Hỏi trực tiếp thời gian ➔ <em>"When's your sports day?"</em>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-amber-700">2. Quy Tắc Đuôi "-ber":</span>
              <p>
                4 tháng cuối năm đều kết thúc bằng <strong>"-ber"</strong> (/bər/): September, October, November, December. Bố mẹ khuyên con phát âm nhẹ âm /bər/ ở cuối.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-amber-700">3. Bật Mí Cho Con:</span>
              <p>
                Cụm <strong>"When's"</strong> là viết tắt của <strong>"When is"</strong>. Trả lời luôn bắt đầu bằng <strong>"It's in..."</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
