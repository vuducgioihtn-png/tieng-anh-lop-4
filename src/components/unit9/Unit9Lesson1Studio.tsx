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
  Activity,
  CheckCircle,
  XCircle,
  Music
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit9Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit9Lesson1Studio: React.FC<Unit9Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Practice Cards in Lesson 1 (Activity 2)
  const monthCards = [
    {
      id: 'may_yes',
      month: 'May',
      monthVi: 'Tháng 5',
      ipa: '/meɪ/',
      reading: 'MÂY',
      type: 'yes',
      question: 'Is your sports day in May?',
      questionVi: 'Ngày hội thể thao trường bạn vào Tháng 5 phải không?',
      answer: 'Yes, it is.',
      answerVi: 'Đúng rồi, đúng là vào Tháng 5.',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      badgeBg: 'bg-emerald-600',
      icon: '🌱',
      bannerDate: '25 MAY'
    },
    {
      id: 'june_yes',
      month: 'June',
      monthVi: 'Tháng 6',
      ipa: '/dʒuːn/',
      reading: 'JUN',
      type: 'yes',
      question: 'Is your sports day in June?',
      questionVi: 'Ngày hội thể thao trường bạn vào Tháng 6 phải không?',
      answer: 'Yes, it is.',
      answerVi: 'Đúng rồi, đúng là vào Tháng 6.',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      icon: '☀️',
      bannerDate: '15 JUNE'
    },
    {
      id: 'march_no_july',
      month: 'March',
      monthVi: 'Tháng 3',
      actualMonth: 'July',
      actualMonthVi: 'Tháng 7',
      ipa: '/mɑːtʃ/ ➔ /ˈdʒu.laɪ/',
      reading: 'MA-t-ch ➔ DU-LAI',
      type: 'no',
      question: 'Is your sports day in March?',
      questionVi: 'Ngày hội thể thao trường bạn vào Tháng 3 à?',
      answer: "No, it isn't. It's in July.",
      answerVi: 'Không phải. Nó diễn ra vào Tháng 7.',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      icon: '🌊',
      bannerDate: '20 JULY'
    },
    {
      id: 'april_no_august',
      month: 'April',
      monthVi: 'Tháng 4',
      actualMonth: 'August',
      actualMonthVi: 'Tháng 8',
      ipa: '/ˈeɪ.prəl/ ➔ /ˈɔː.ɡəst/',
      reading: 'Ê-prồ ➔ O-gớt-s-t',
      type: 'no',
      question: 'Is your sports day in April?',
      questionVi: 'Ngày hội thể thao trường bạn vào Tháng 4 à?',
      answer: "No, it isn't. It's in August.",
      answerVi: 'Không phải. Nó diễn ra vào Tháng 8.',
      color: 'bg-rose-50 border-rose-300 text-rose-800',
      badgeBg: 'bg-rose-600',
      icon: '🌻',
      bannerDate: '28 AUGUST'
    }
  ];

  // 12 Months Data for Calendar Talk
  const allMonths = [
    { num: 1, en: 'January', vi: 'Tháng 1', ipa: '/ˈdʒæn.ju.ə.ri/', season: 'Mùa xuân', icon: '❄️' },
    { num: 2, en: 'February', vi: 'Tháng 2', ipa: '/ˈfeb.ru.ər.i/', season: 'Mùa xuân', icon: '🌸' },
    { num: 3, en: 'March', vi: 'Tháng 3', ipa: '/mɑːtʃ/', season: 'Mùa xuân', icon: '🌱' },
    { num: 4, en: 'April', vi: 'Tháng 4', ipa: '/ˈeɪ.prəl/', season: 'Mùa xuân', icon: '🌧️' },
    { num: 5, en: 'May', vi: 'Tháng 5', ipa: '/meɪ/', season: 'Mùa hạ', icon: '☀️' },
    { num: 6, en: 'June', vi: 'Tháng 6', ipa: '/dʒuːn/', season: 'Mùa hạ', icon: '🏖️' },
    { num: 7, en: 'July', vi: 'Tháng 7', ipa: '/ˈdʒu.laɪ/', season: 'Mùa hạ', icon: '🍉' },
    { num: 8, en: 'August', vi: 'Tháng 8', ipa: '/ˈɔː.ɡəst/', season: 'Mùa hạ', icon: '🌻' },
    { num: 9, en: 'September', vi: 'Tháng 9', ipa: '/sepˈtem.bər/', season: 'Mùa thu', icon: '🎒' },
    { num: 10, en: 'October', vi: 'Tháng 10', ipa: '/ɒkˈtəʊ.bər/', season: 'Mùa thu', icon: '🎃' },
    { num: 11, en: 'November', vi: 'Tháng 11', ipa: '/nəʊˈvem.bər/', season: 'Mùa thu', icon: '🍂' },
    { num: 12, en: 'December', vi: 'Tháng 12', ipa: '/dɪˈsem.bər/', season: 'Mùa đông', icon: '🎄' }
  ];

  // Selected Month for Let's Talk
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState<string>('May');

  // Activity 4: Listen and Match State
  const [matchedPairs, setMatchedPairs] = useState<{ [personId: number]: string }>({});
  const [matchChecked, setMatchChecked] = useState<boolean>(false);
  const correctMatches: { [personId: number]: string } = {
    1: 'b', // Lucy ➔ June
    2: 'a', // Ben ➔ August
    3: 'c'  // Mary ➔ May
  };

  // Activity 5: Look, complete and read state
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3a: '',
    q3b: '',
    q4a: '',
    q4b: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Karaoke Song State
  const [karaokeLine, setKaraokeLine] = useState<number>(0);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);

  const songLyrics = [
    { en: 'Sports day, sports day.', vi: 'Ngày hội thể thao, ngày hội thể thao.' },
    { en: 'Is your sports day in May?', vi: 'Ngày hội thể thao trường bạn vào Tháng 5 phải không?' },
    { en: 'Yes, it is. Yes, it is.', vi: 'Đúng rồi, đúng vậy.' },
    { en: "It's in May.", vi: 'Nó diễn ra vào Tháng 5.' },
    { en: 'Sports day, sports day.', vi: 'Ngày hội thể thao, ngày hội thể thao.' },
    { en: 'Is your sports day in June?', vi: 'Ngày hội thể thao trường bạn vào Tháng 6 phải không?' },
    { en: "No, it isn't. No, it isn't.", vi: 'Không phải, không phải đâu.' },
    { en: "It's in July.", vi: 'Nó diễn ra vào Tháng 7 cơ.' }
  ];

  const handlePlaySong = () => {
    setIsPlayingSong(true);
    sound.playClick();
    let current = 0;
    const interval = setInterval(() => {
      if (current < songLyrics.length) {
        setKaraokeLine(current);
        speakWord(songLyrics[current].en, speechRate);
        current++;
      } else {
        clearInterval(interval);
        setIsPlayingSong(false);
        sound.playVictory();
        confetti({ particleCount: 50, spread: 60 });
        onAddStar(3);
      }
    }, 2800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Trophy className="w-4 h-4 text-yellow-200" />
              <span>Unit 9: Our sports day • Lesson 1 (Trang 62 - 63 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 1: Hỏi Ngày Hội Thể Thao Vào Tháng Nào?
            </h1>
            <p className="text-sm sm:text-base text-yellow-50 max-w-2xl font-medium">
              Luyện hỏi - đáp xem ngày hội thể thao có diễn ra vào tháng đó hay không: <br className="hidden sm:inline" />
              <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded-lg inline-block mt-1">
                "Is your sports day in May?" — "Yes, it is." / "No, it isn't. It's in April."
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 border border-white/30"
            >
              <Lightbulb className="w-4 h-4 text-yellow-200" />
              <span>{showParentGuides ? 'Ẩn Hướng Dẫn Bố Mẹ' : 'Hiện Hướng Dẫn Bố Mẹ'}</span>
            </button>
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="px-4 py-2.5 bg-white text-orange-700 hover:bg-orange-50 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Học Tiết 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '💬' },
          { id: 2, label: '2. Listen, point & say', icon: '👉' },
          { id: 3, label: '3. Let’s talk (12 Tháng)', icon: '🗓️' },
          { id: 4, label: '4. Listen & match', icon: '🎧' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: '6. Sing: Our sports day', icon: '🎤' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-orange-600 text-white shadow-md scale-102 ring-2 ring-orange-400/30'
                : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 87) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                💬
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Look, listen and repeat (Track 87 SGK Trang 62)
                </h3>
                <p className="text-xs text-slate-500">
                  Quan sát tranh, nghe hội thoại giữa hai bạn học sinh và bấm nghe từng câu
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Our sports day is in May. We play many sports and games. Great! I like sports. Is your sports day in May too? No, it isn't. It's in April.", speechRate);
                onAddStar(1);
              }}
              className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Đoạn Văn</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Picture a */}
            <div className="bg-gradient-to-b from-orange-50/60 to-white rounded-2xl border-2 border-orange-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-orange-600 text-white rounded-lg text-xs font-black">
                  Tranh a
                </span>
                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🏁 Băng rôn: SCHOOL SPORTS DAY - 25 MAY
                </span>
              </div>

              <div className="space-y-3">
                {/* Speaker A */}
                <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-orange-700">Bạn nữ (tóc cam):</span>
                    <button
                      onClick={() => speakWord('Our sports day is in May. We play many sports and games.', speechRate)}
                      className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Our sports day is in May. We play many sports and games."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Ngày hội thể thao của trường tớ diễn ra vào Tháng 5. Chúng tớ chơi rất nhiều môn thể thao và trò chơi.)
                  </p>
                  <p className="text-[11px] text-orange-600 font-mono">
                    🗣️ /aʊər spɔːts deɪ ɪz ɪn meɪ. wiː pleɪ ˈmen.i spɔːts ænd ɡeɪmz/
                  </p>
                </div>

                {/* Speaker B */}
                <div className="bg-white p-3.5 rounded-xl border border-orange-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700">Bạn nam (đeo khăn quàng):</span>
                    <button
                      onClick={() => speakWord('Great! I like sports.', speechRate)}
                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Great! I like sports."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Tuyệt thật! Tớ rất thích thể thao.)
                  </p>
                  <p className="text-[11px] text-amber-600 font-mono">
                    🗣️ /ɡreɪt! aɪ laɪk spɔːts/
                  </p>
                </div>
              </div>
            </div>

            {/* Picture b */}
            <div className="bg-gradient-to-b from-amber-50/60 to-white rounded-2xl border-2 border-amber-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-xs font-black">
                  Tranh b
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🏁 Băng rôn: SCHOOL SPORTS DAY - 20 APRIL
                </span>
              </div>

              <div className="space-y-3">
                {/* Question */}
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-orange-700">Bạn nữ hỏi:</span>
                    <button
                      onClick={() => speakWord('Is your sports day in May too?', speechRate)}
                      className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Is your sports day in May too?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Ngày hội thể thao trường bạn cũng vào Tháng 5 à?)
                  </p>
                  <p className="text-[11px] text-orange-600 font-mono">
                    🗣️ /ɪz jɔːr spɔːts deɪ ɪn meɪ tuː?/
                  </p>
                </div>

                {/* Answer */}
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700">Bạn nam đáp:</span>
                    <button
                      onClick={() => speakWord("No, it isn't. It's in April.", speechRate)}
                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "No, it isn't. It's in April."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Không phải. Ngày hội trường tớ diễn ra vào Tháng 4.)
                  </p>
                  <p className="text-[11px] text-amber-600 font-mono">
                    🗣️ /nəʊ, ɪt ˈɪz.ənt. ɪts ɪn ˈeɪ.prəl/
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Focus Pill */}
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-black text-orange-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-orange-600" /> Bí kíp ghi nhớ ngữ pháp
              </span>
              <p className="text-xs text-orange-950">
                • Hỏi: <strong>Is your sports day in [Tháng]?</strong> ➔ Trả lời Đúng: <strong>Yes, it is.</strong>
                <br />
                • Trả lời Không đúng: <strong>No, it isn't. It's in [Tháng thực tế].</strong>
                <br />
                • <em>Lưu ý:</em> Trước tháng luôn dùng giới từ <strong>"in"</strong> (in May, in April, in June).
              </p>
            </div>
            <button
              onClick={() => {
                sound.playVictory();
                onAddStar(2);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black shrink-0 self-start sm:self-auto shadow-sm"
            >
              ⭐ Nhận 2 Sao Ghi Nhớ
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT AND SAY (TRACK 88) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                👉
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen, point and say (Track 88 SGK Trang 62)
                </h3>
                <p className="text-xs text-slate-500">
                  Luyện tập 4 tình huống với 4 tháng trọng tâm: May, June, July, August
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monthCards.map(item => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border-2 ${item.color} space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`px-2.5 py-1 ${item.badgeBg} text-white rounded-lg text-xs font-black tracking-wide`}>
                      {item.bannerDate}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-black">{item.month} ({item.monthVi})</h4>
                    <p className="text-xs opacity-75 font-mono">{item.ipa} • Đọc là: "{item.reading}"</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-black/10 space-y-1.5 text-xs text-slate-800">
                    <div className="font-bold flex items-center justify-between">
                      <span>❓ {item.question}</span>
                      <button
                        onClick={() => speakWord(item.question, speechRate)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md"
                        title="Nghe câu hỏi"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                      </button>
                    </div>
                    <div className="font-black text-orange-700 flex items-center justify-between">
                      <span>💬 {item.answer}</span>
                      <button
                        onClick={() => speakWord(item.answer, speechRate)}
                        className="p-1 bg-orange-100 hover:bg-orange-200 rounded-md"
                        title="Nghe câu trả lời"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-orange-700" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      Dịch: {item.answerVi}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[11px]">
                    Kiểu đáp: {item.type === 'yes' ? '✅ Đồng ý (Yes, it is)' : '❌ Đính chính (No, it isn\'t)'}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${item.question} ${item.answer}`, speechRate);
                      onAddStar(1);
                    }}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg shadow-2xs border border-slate-200 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 text-orange-600" />
                    <span>Luyện Nghe Cặp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK (ALL 12 MONTHS CALENDAR) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                🗓️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s talk — Bảng 12 Tháng Trong Năm (SGK Trang 62)
                </h3>
                <p className="text-xs text-slate-500">
                  Bấm chọn bất kỳ tháng nào trong năm để đóng vai hỏi - đáp về ngày hội thể thao trường em
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 12 Month Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {allMonths.map(m => {
              const isSelected = selectedCalendarMonth === m.en;
              return (
                <button
                  key={m.num}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCalendarMonth(m.en);
                    speakWord(m.en, speechRate);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500 text-white shadow-md scale-102'
                      : 'border-slate-200 bg-white hover:bg-orange-50/60 hover:border-orange-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black opacity-80">T.{m.num}</span>
                    <span className="text-base">{m.icon}</span>
                  </div>
                  <div className="font-black text-sm">{m.en}</div>
                  <div className={`text-[11px] ${isSelected ? 'text-orange-100' : 'text-slate-500'}`}>
                    {m.vi}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Dialogue Box */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border-2 border-orange-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200 pb-3">
              <span className="text-xs font-black text-orange-900 uppercase tracking-wide flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-orange-600" />
                Đang thực hành với: <strong>{selectedCalendarMonth}</strong>
              </span>
              <button
                onClick={() => {
                  speakWord(`Is your sports day in ${selectedCalendarMonth}? Yes, it is. It's in ${selectedCalendarMonth}.`, speechRate);
                  onAddStar(1);
                }}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors self-start sm:self-auto flex items-center gap-1.5 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Mẫu Đối Thoại</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-2xs space-y-2">
                <span className="text-xs font-black text-orange-700">Mẫu 1 (Khẳng định - Đúng):</span>
                <p className="font-bold text-slate-900">
                  A: "Is your sports day in {selectedCalendarMonth}?"
                </p>
                <p className="font-black text-emerald-600">
                  B: "Yes, it is."
                </p>
                <p className="text-xs text-slate-500 italic">
                  (Ngày hội thể thao trường bạn vào {selectedCalendarMonth} phải không? - Đúng vậy!)
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-2xs space-y-2">
                <span className="text-xs font-black text-amber-700">Mẫu 2 (Phủ định - Đính chính):</span>
                <p className="font-bold text-slate-900">
                  A: "Is your sports day in {selectedCalendarMonth}?"
                </p>
                <p className="font-black text-rose-600">
                  B: "No, it isn't. It's in October."
                </p>
                <p className="text-xs text-slate-500 italic">
                  (Ngày hội thể thao trường bạn vào {selectedCalendarMonth} à? - Không, nó diễn ra vào Tháng 10 cơ.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND MATCH (TRACK 89) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                🎧
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Listen and match (Track 89 SGK Trang 63)
                </h3>
                <p className="text-xs text-slate-500">
                  Nghe đoạn ghi âm về ngày hội thể thao của 3 bạn: 1. Lucy, 2. Ben, 3. Mary và nối với tháng tương ứng
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: Is your sports day in June, Lucy? Yes, it is. Number two: Is your sports day in August, Ben? Yes, it is. Number three: Is your sports day in May, Mary? Yes, it is.", speechRate);
              }}
              className="px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Audio Track 89</span>
            </button>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, name: '1. Bạn Lucy (Tóc vàng xoăn)', audioText: 'Is your sports day in June, Lucy? - Yes, it is.' },
              { id: 2, name: '2. Bạn Ben (Đeo kính, tóc cam)', audioText: 'Is your sports day in August, Ben? - Yes, it is.' },
              { id: 3, name: '3. Bạn Mary (Tóc đỏ ngắn)', audioText: 'Is your sports day in May, Mary? - Yes, it is.' }
            ].map(person => (
              <div
                key={person.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speakWord(person.audioText, speechRate)}
                    className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl"
                    title="Bấm nghe đoạn của bạn này"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <div>
                    <span className="font-black text-slate-900 text-sm">{person.name}</span>
                    <p className="text-xs text-slate-500">Bấm loa nghe gợi ý</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { key: 'a', label: 'a. AUGUST (Tháng 8)' },
                    { key: 'b', label: 'b. JUNE (Tháng 6)' },
                    { key: 'c', label: 'c. MAY (Tháng 5)' }
                  ].map(opt => {
                    const isChosen = matchedPairs[person.id] === opt.key;
                    const isCorrect = isChosen && correctMatches[person.id] === opt.key;
                    const isWrong = isChosen && matchChecked && !isCorrect;

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          sound.playClick();
                          setMatchedPairs(prev => ({ ...prev, [person.id]: opt.key }));
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isWrong
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : isCorrect && matchChecked
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-black'
                            : isChosen
                            ? 'bg-orange-600 text-white border-orange-600 shadow-2xs font-black'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setMatchChecked(true);
                const isAllRight = Object.keys(correctMatches).every(
                  k => matchedPairs[parseInt(k, 10)] === correctMatches[parseInt(k, 10)]
                );
                if (isAllRight) {
                  sound.playVictory();
                  confetti({ particleCount: 40 });
                  onAddStar(3);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Kết Quả Nối</span>
            </button>

            <button
              onClick={() => {
                setMatchedPairs({});
                setMatchChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Look, complete and read (SGK Trang 63)
                </h3>
                <p className="text-xs text-slate-500">
                  Nhìn tờ lịch ở cột bên phải, điền từ còn thiếu vào chỗ trống rồi đọc to câu hoàn chỉnh
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Sentence 1 */}
            <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-800">Câu 1 (Lịch: JUNE)</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                  🗓️ Lịch JUNE
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                1. A: Is your sports day in June?
                <br />
                &nbsp;&nbsp;&nbsp;B: Yes,{' '}
                <input
                  type="text"
                  placeholder="Điền từ (it is)"
                  value={fillAnswers.q1}
                  onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-28 focus:outline-orange-500"
                />
                .
              </p>
              {fillChecked && (
                <p className={`text-xs font-bold ${fillAnswers.q1.trim().toLowerCase() === 'it is' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {fillAnswers.q1.trim().toLowerCase() === 'it is' ? '✅ Chính xác: "it is"' : '❌ Gợi ý: điền "it is"'}
                </p>
              )}
            </div>

            {/* Sentence 2 */}
            <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-800">Câu 2 (Lịch: AUGUST)</span>
                <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-bold">
                  🗓️ Lịch AUGUST
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                2. A: Is your sports day in{' '}
                <input
                  type="text"
                  placeholder="Điền tên tháng (August)"
                  value={fillAnswers.q2}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-28 focus:outline-orange-500"
                />
                ?
                <br />
                &nbsp;&nbsp;&nbsp;B: Yes, it is.
              </p>
              {fillChecked && (
                <p className={`text-xs font-bold ${fillAnswers.q2.trim().toLowerCase() === 'august' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {fillAnswers.q2.trim().toLowerCase() === 'august' ? '✅ Chính xác: "August"' : '❌ Gợi ý: điền "August"'}
                </p>
              )}
            </div>

            {/* Sentence 3 */}
            <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-800">Câu 3 (Hỏi February, Lịch: MAY)</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                  🗓️ Lịch MAY
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                3. A:{' '}
                <input
                  type="text"
                  placeholder="Từ hỏi (Is)"
                  value={fillAnswers.q3a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3a: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-20 focus:outline-orange-500"
                />{' '}
                your sports day in February?
                <br />
                &nbsp;&nbsp;&nbsp;B: No, it isn't. It's in{' '}
                <input
                  type="text"
                  placeholder="Tên tháng (May)"
                  value={fillAnswers.q3b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3b: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-24 focus:outline-orange-500"
                />
                .
              </p>
              {fillChecked && (
                <p className={`text-xs font-bold ${fillAnswers.q3a.trim().toLowerCase() === 'is' && fillAnswers.q3b.trim().toLowerCase() === 'may' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {fillAnswers.q3a.trim().toLowerCase() === 'is' && fillAnswers.q3b.trim().toLowerCase() === 'may' ? '✅ Chính xác: "Is" và "May"' : '❌ Gợi ý: điền "Is" vào ô 1 và "May" vào ô 2'}
                </p>
              )}
            </div>

            {/* Sentence 4 */}
            <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-800">Câu 4 (Hỏi July, Lịch: MARCH)</span>
                <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-bold">
                  🗓️ Lịch MARCH
                </span>
              </div>
              <p className="text-sm font-bold text-slate-800">
                4. A: Is your sports day{' '}
                <input
                  type="text"
                  placeholder="Giới từ (in)"
                  value={fillAnswers.q4a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4a: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-18 focus:outline-orange-500"
                />{' '}
                July?
                <br />
                &nbsp;&nbsp;&nbsp;B:{' '}
                <input
                  type="text"
                  placeholder="Phủ định (No, it isn't)"
                  value={fillAnswers.q4b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4b: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-32 focus:outline-orange-500"
                />
                . It's in March.
              </p>
              {fillChecked && (
                <p className={`text-xs font-bold ${fillAnswers.q4a.trim().toLowerCase() === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {fillAnswers.q4a.trim().toLowerCase() === 'in' ? '✅ Chính xác: "in" và "No, it isn\'t"' : '❌ Gợi ý: điền "in" và "No, it isn\'t"'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFillChecked(true);
                const q1Ok = fillAnswers.q1.trim().toLowerCase() === 'it is';
                const q2Ok = fillAnswers.q2.trim().toLowerCase() === 'august';
                const q3Ok = fillAnswers.q3a.trim().toLowerCase() === 'is' && fillAnswers.q3b.trim().toLowerCase() === 'may';
                const q4Ok = fillAnswers.q4a.trim().toLowerCase() === 'in';
                if (q1Ok && q2Ok && q3Ok && q4Ok) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Bài Viết</span>
            </button>

            <button
              onClick={() => {
                setFillAnswers({
                  q1: 'it is',
                  q2: 'August',
                  q3a: 'Is',
                  q3b: 'May',
                  q4a: 'in',
                  q4b: "No, it isn't"
                });
                setFillChecked(true);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-orange-600 hover:text-orange-800 font-bold"
            >
              Xem đáp án mẫu
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: LET'S SING (TRACK 90) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-orange-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl text-xl font-black">
                🎤
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Let’s sing — "Our sports day" (Track 90 SGK Trang 63)
                </h3>
                <p className="text-xs text-slate-500">
                  Hát theo giai điệu vui tươi, rộn ràng của ngày hội thể thao trường học
                </p>
              </div>
            </div>
            <button
              onClick={handlePlaySong}
              disabled={isPlayingSong}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                isPlayingSong
                  ? 'bg-slate-200 text-slate-500'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>{isPlayingSong ? 'Đang Hát Theo Nhịp...' : 'Bật Hát Karaoke'}</span>
            </button>
          </div>

          {/* Karaoke Display */}
          <div className="bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 space-y-4 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              {songLyrics.map((line, idx) => {
                const isCurrent = isPlayingSong && karaokeLine === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-orange-600 text-white shadow-md scale-103 font-black text-base sm:text-lg ring-4 ring-orange-300'
                        : 'text-slate-700 text-sm font-bold'
                    }`}
                  >
                    <p>{line.en}</p>
                    <p className={`text-xs ${isCurrent ? 'text-orange-100' : 'text-slate-400 font-normal italic'}`}>
                      {line.vi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-3xl p-5 sm:p-6 border-2 border-orange-200 space-y-4">
          <div className="flex items-center gap-2 text-orange-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-orange-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 1 (Lesson 1)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-orange-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-orange-700">1. Mẫu Câu Cần Luyện:</span>
              <p>
                Hỏi: <em>"Is your sports day in [Tháng]?"</em>
                <br />
                Đáp: <em>"Yes, it is."</em> hoặc <em>"No, it isn't. It's in [Tháng khác]."</em>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-orange-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-orange-700">2. Lỗi Con Dễ Mắc:</span>
              <p>
                • Quên giới từ <strong>"in"</strong> trước tháng (phải nói: in May, in June).
                <br />
                • Đọc nhầm "isn't" thành "is not" hoặc bỏ mất âm đuôi /t/.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-orange-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-orange-700">3. Trò Chơi Tại Nhà:</span>
              <p>
                Bố mẹ lấy tờ lịch gia đình, chỉ vào Tháng 5 hỏi: <em>"Is your sports day in May?"</em>, con trả lời theo lịch thực tế ở trường của con.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
