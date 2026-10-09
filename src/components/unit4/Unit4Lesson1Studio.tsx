import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Cake,
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
  Gift,
  Music
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit4Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit4Lesson1Studio: React.FC<Unit4Lesson1StudioProps> = ({
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

  // 5 Key Months in Lesson 1
  const keyMonths = [
    {
      name: 'January',
      vi: 'Tháng 1',
      ipa: '/ˈdʒæn.ju.ə.ri/',
      reading: 'JAN-yu-a-ri',
      color: 'from-sky-500 to-blue-600',
      icon: '❄️',
      tip: 'Mở đầu năm mới, âm đầu là /dʒ/ bật mạnh khoang miệng!'
    },
    {
      name: 'February',
      vi: 'Tháng 2',
      ipa: '/ˈfeb.ru.ə.ri/',
      reading: 'PHEB-ru-a-ri',
      color: 'from-pink-500 to-rose-600',
      icon: '🧧',
      tip: 'Tháng ngắn nhất trong năm và thường đón Tết Nguyên Đán rộn ràng.'
    },
    {
      name: 'March',
      vi: 'Tháng 3',
      ipa: '/mɑːtʃ/',
      reading: 'MAAT-ch',
      color: 'from-emerald-500 to-teal-600',
      icon: '🌱',
      tip: 'Âm đuôi /tʃ/ chu môi bật hơi như "ch", không đọc là mác!'
    },
    {
      name: 'April',
      vi: 'Tháng 4',
      ipa: '/ˈeɪ.prəl/',
      reading: 'EI-prồl',
      color: 'from-amber-500 to-yellow-600',
      icon: '🌸',
      tip: 'Bắt đầu bằng nguyên âm đôi /eɪ/, nhớ ngày Cá Tháng Tư (April Fools).'
    },
    {
      name: 'May',
      vi: 'Tháng 5 (Sinh nhật Lucy)',
      ipa: '/meɪ/',
      reading: 'MÂY',
      color: 'from-purple-500 to-indigo-600',
      icon: '🎂',
      tip: 'Ngắn nhất, dễ nhớ nhất, đọc giống như "mây trời" bay!'
    }
  ];

  // Activity 1: Dialogue A & B (Track 36)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('Ben');
    await speakWord('Hi, Lucy. What are you doing?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord("I'm making a hat for my birthday party.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Ben');
    await speakWord("When's your birthday?", speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord("It's in May.", speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  // Activity 2: Listen, point and say (Track 37)
  const [selectedMonth, setSelectedMonth] = useState<string>('January');
  const [act2AnswerMode, setAct2AnswerMode] = useState<boolean>(false);

  const handlePointMonth = async (monthName: string) => {
    sound.playClick();
    setSelectedMonth(monthName);
    setAct2AnswerMode(true);
    await speakWord(`When's your birthday? It's in ${monthName}.`, speechRate);
    onAddStar(1);
  };

  // Activity 3: Let's talk
  const [myBirthdayMonth, setMyBirthdayMonth] = useState<string>('March');
  const [talkRecorded, setTalkRecorded] = useState<boolean>(false);

  const handleTalkPractice = async () => {
    sound.playClick();
    setTalkRecorded(true);
    await speakWord(`When's your birthday? It's in ${myBirthdayMonth}.`, speechRate * 0.9);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    onAddStar(3);
  };

  // Activity 4: Listen and number (Track 38)
  // Track 38 audio scripts standard:
  // 1: When's your birthday? - It's in January. (c)
  // 2: When's your birthday? - It's in April. (b)
  // 3: When's your birthday? - It's in February. (a)
  // 4: When's your birthday? - It's in March. (d)
  const [act4Inputs, setAct4Inputs] = useState<{ [key: string]: string }>({
    a: '',
    b: '',
    c: '',
    d: ''
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  const act4Audios = [
    { track: 1, text: "1. When's your birthday? - It's in January.", month: 'January', correctKey: 'c' },
    { track: 2, text: "2. When's your birthday? - It's in April.", month: 'April', correctKey: 'b' },
    { track: 3, text: "3. When's your birthday? - It's in February.", month: 'February', correctKey: 'a' },
    { track: 4, text: "4. When's your birthday? - It's in March.", month: 'March', correctKey: 'd' }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    // Correct mapping: a: 3, b: 2, c: 1, d: 4
    const isCorrect =
      act4Inputs.a === '3' &&
      act4Inputs.b === '2' &&
      act4Inputs.c === '1' &&
      act4Inputs.d === '4';

    if (isCorrect) {
      sound.playCorrect();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setAct4Inputs({ a: '', b: '', c: '', d: '' });
    setAct4Checked(false);
  };

  // Activity 5: Look, complete and read
  const [act5Answers, setAct5Answers] = useState<{ [q: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [act5Checked, setAct5Checked] = useState<boolean>(false);

  const act5Questions = [
    {
      q: 1,
      cakeDate: '5 March',
      promptA: "When's your birthday?",
      promptB: "It's in",
      correct: 'March',
      vietnamese: 'Sinh nhật bạn vào khi nào? - Vào Tháng Ba.'
    },
    {
      q: 2,
      cakeDate: '10 May',
      promptA: "When's your birthday?",
      promptB: "It's in",
      correct: 'May',
      vietnamese: 'Sinh nhật bạn vào khi nào? - Vào Tháng Năm.'
    },
    {
      q: 3,
      cakeDate: '20 February',
      promptA: "When's your",
      promptAEnd: '?',
      promptB: "It's in",
      correct: 'February',
      correctA: 'birthday',
      correctB: 'February',
      vietnamese: 'Sinh nhật bạn vào khi nào? - Vào Tháng Hai.'
    },
    {
      q: 4,
      cakeDate: '15 April',
      promptAStart: "When's",
      promptAEnd: 'your birthday?',
      promptB: "It's in",
      correct: 'April',
      correctB: 'April',
      vietnamese: 'Sinh nhật bạn vào khi nào? - Vào Tháng Tư.'
    }
  ];

  const handleCheckAct5 = () => {
    sound.playClick();
    setAct5Checked(true);
    let correctCount = 0;
    if (act5Answers[1]?.trim().toLowerCase() === 'march') correctCount++;
    if (act5Answers[2]?.trim().toLowerCase() === 'may') correctCount++;
    if (act5Answers[3]?.trim().toLowerCase() === 'february') correctCount++;
    if (act5Answers[4]?.trim().toLowerCase() === 'april') correctCount++;

    if (correctCount >= 3) {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 6: Let's sing (Track 39)
  const [activeSongLine, setActiveSongLine] = useState<number | null>(null);
  const [isSinging, setIsSinging] = useState<boolean>(false);

  const songLyrics = [
    { text: "When's your birthday?", vi: 'Sinh nhật bạn vào khi nào?', note: 'Hỏi ngày sinh' },
    { text: "When's your birthday?", vi: 'Sinh nhật bạn vào khi nào?', note: 'Hỏi lần 2 nhấn nhịp' },
    { text: "It's in January.", vi: 'Nó vào Tháng Một.', note: 'Câu trả lời tháng 1' },
    { text: "My birthday's in January.", vi: 'Sinh nhật của tớ vào Tháng Một.', note: 'Khẳng định đầy đủ' },
    { text: "When's your birthday?", vi: 'Sinh nhật bạn vào khi nào?', note: 'Khổ 2' },
    { text: "When's your birthday?", vi: 'Sinh nhật bạn vào khi nào?', note: 'Hỏi lần 2 khổ 2' },
    { text: "It's in February.", vi: 'Nó vào Tháng Hai.', note: 'Câu trả lời tháng 2' },
    { text: "My birthday's in February.", vi: 'Sinh nhật của tớ vào Tháng Hai.', note: 'Khẳng định đầy đủ' }
  ];

  const playSong = async () => {
    sound.playClick();
    setIsSinging(true);
    for (let i = 0; i < songLyrics.length; i++) {
      setActiveSongLine(i);
      await speakWord(songLyrics[i].text, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 400));
    }
    setActiveSongLine(null);
    setIsSinging(false);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    onAddStar(3);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO LESSON BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              <span>🎂</span>
              <span>Trang 28 - 29 SGK Kết Nối Tri Thức</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-rose-50 text-rose-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Tiết 2 (Trang 30) ➔</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Tiết 3 (Trang 32) ➔</span>
                </button>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <span>Unit 4: My birthday party — Lesson 1</span>
          </h1>
          <p className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed max-w-3xl">
            Làm quen với câu hỏi ngày sinh <strong>"When's your birthday?"</strong>, mẫu câu trả lời với tháng <strong>"It's in [Month]"</strong> (January, February, March, April, May) và dự tiệc sinh nhật của bạn Lucy!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">❄️ January (Tháng 1)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🧧 February (Tháng 2)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🌱 March (Tháng 3)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🌸 April (Tháng 4)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎂 May (Tháng 5)</span>
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
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
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
            className="px-4 py-1.5 bg-white text-slate-900 hover:bg-rose-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang tháng sinh nhật'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🎂
        </div>
      </div>

      {/* ================= BÍ KÍP NÃO PHẢI 5 THÁNG ĐẦU NĂM ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Não Phải Ghi Nhớ Tháng Sinh Nhật</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "When's your birthday?" ➔ "It's in [Tháng]!"</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Quy tắc vàng: <strong>Đứng trước tháng luôn dùng giới từ IN</strong> (in January, in February, in May). Nhấn vào từng tháng để nghe phát âm chuẩn!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord("When's your birthday? It's in May.", speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 text-white rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-white" />
            <span>Nghe Câu Mẫu Lucy</span>
          </button>
        </div>

        {/* 5 Months Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {keyMonths.map(m => (
            <div
              key={m.name}
              onClick={() => {
                sound.playClick();
                speakWord(`It's in ${m.name}.`, speechRate);
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400 cursor-pointer transition-all space-y-2 text-center group"
            >
              <div className="text-3xl">{m.icon}</div>
              <div className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                {m.name}
              </div>
              <div className="text-xs font-bold text-rose-300">({m.vi})</div>
              <div className="text-[10px] font-mono text-slate-300">{m.ipa}</div>
              <div className="text-[10px] bg-slate-950/60 text-amber-200 rounded py-0.5 px-1 font-bold">
                {m.reading}
              </div>
              <div className="text-[10px] text-slate-300 leading-tight pt-1">
                {m.tip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Nhớ Tháng & Sửa Lỗi Giới Từ</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <div className="font-bold text-rose-950 text-sm">💡 1. Phân biệt IN và ON</div>
              <p>
                Chỉ có <strong>THÁNG</strong> đứng một mình ➔ Dùng <strong>IN</strong> (*It's in May, in January*). Khi có thêm <strong>NGÀY</strong> cụ thể ➔ Dùng <strong>ON</strong> (*on 20 May*). Ở Lesson 1, con chỉ cần nắm vững <strong>IN + Tháng</strong>!
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 text-sm">💡 2. Viết hoa chữ cái đầu</div>
              <p>
                Tên tháng trong tiếng Anh luôn luôn viết hoa chữ cái đầu tiên: <strong>January, February, March, April, May</strong>. Nhắc con không viết thường chữ cái đầu!
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-950 text-sm">💡 3. Âm đuôi của từ "March"</div>
              <p>
                Từ <strong>March</strong> kết thúc bằng âm /tʃ/. Hướng dẫn con chu môi bật hơi như tiếng "ch" dứt khoát, không đọc là mác hay mát.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITIES NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 28' },
          { id: 2, label: '2. Listen, point & say', icon: '🗓️', desc: 'Trang 28' },
          { id: 3, label: "3. Let's talk", icon: '💬', desc: 'Trang 28' },
          { id: 4, label: '4. Listen & number', icon: '🔢', desc: 'Trang 29' },
          { id: 5, label: '5. Look, complete & read', icon: '✍️', desc: 'Trang 29' },
          { id: 6, label: "6. Let's sing", icon: '🎤', desc: 'Trang 29' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border-2 ${
              activeSection === tab.id
                ? 'bg-rose-600 text-white border-rose-600 shadow-md font-black'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 36 · Sách Giáo Khoa Trang 28</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 1: Look, listen and repeat (Quan sát, nghe và nhắc lại)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={playDialogA}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh A</span>
              </button>
              <button
                onClick={playDialogB}
                className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-xl border border-pink-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh B</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue A Card */}
            <div
              className={`p-6 rounded-3xl border-2 transition-all space-y-5 ${
                activeSpeaker === 'Ben' || activeSpeaker === 'Lucy'
                  ? 'bg-rose-50/50 border-rose-400 shadow-md ring-2 ring-rose-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-full">
                  Tranh a: Ben & Lucy chuẩn bị sinh nhật
                </span>
                <button
                  onClick={playDialogA}
                  className="p-2 rounded-xl bg-white hover:bg-rose-100 text-rose-600 border border-slate-200 shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Ben line */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Hi, Lucy. What are you doing?', speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-rose-600 font-black flex items-center gap-1">
                    👦 Ben:
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-rose-600">
                  "Hi, Lucy. What are you doing?"
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /haɪ ˈluː.si. wɒt ɑː juː ˈduː.ɪŋ/ · Hai, LU-xi. Oát a du ĐU-inh?
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Chào Lucy. Cậu đang làm gì đấy?
                </div>
              </div>

              {/* Lucy line */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("I'm making a hat for my birthday party.", speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-pink-600 font-black flex items-center gap-1">
                    👧 Lucy (cầm nón sinh nhật):
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-pink-600">
                  "I'm making a hat for my birthday party."
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /aɪm ˈmeɪ.kɪŋ ə hæt fɔː maɪ ˈbɜːθ.deɪ ˈpɑː.ti/ · Aim MÂY-kinh ơ HÁT pho mai BƠTH-đây PAA-ti.
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Tớ đang làm một chiếc mũ cho bữa tiệc sinh nhật của tớ.
                </div>
              </div>
            </div>

            {/* Dialogue B Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-pink-600 text-white text-xs font-black rounded-full">
                  Tranh b: Hỏi ngày sinh nhật
                </span>
                <button
                  onClick={playDialogB}
                  className="p-2 rounded-xl bg-white hover:bg-pink-100 text-pink-600 border border-slate-200 shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Ben asks */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("When's your birthday?", speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-rose-600 font-black">👦 Ben hỏi:</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-rose-600">
                  "When's your birthday?"
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /wenz jɔː ˈbɜːθ.deɪ/ · Oen-z yo BƠTH-đây?
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Khi nào là sinh nhật của cậu?
                </div>
              </div>

              {/* Lucy answers */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("It's in May.", speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-amber-600 font-black">👧 Lucy trả lời:</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                </div>
                <div className="text-base font-black text-amber-600 group-hover:text-amber-700">
                  "It's in May."
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /ɪts ɪn meɪ/ · It-x in MÂY.
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Nó vào Tháng Năm.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Track 37 · Sách Giáo Khoa Trang 28</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 2: Listen, point and say (Nghe, chỉ vào tranh và nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bấm vào từng tờ lịch tháng bên dưới để nghe câu hỏi và câu trả lời mẫu tương ứng:
            </p>
          </div>

          {/* Model Pattern Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-700">Mẫu câu hỏi & trả lời:</span>
              <div className="text-base sm:text-lg font-black text-slate-900">
                A: When's your birthday? ➔ B: It's in{' '}
                <span className="text-rose-600 underline font-extrabold">{selectedMonth}</span>.
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                speakWord(`When's your birthday? It's in ${selectedMonth}.`, speechRate);
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát Âm Mẫu</span>
            </button>
          </div>

          {/* 4 SGK Calendars a, b, c, d */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'a', name: 'January', vi: 'Tháng 1', days: 31, color: 'border-sky-300 bg-sky-50/50' },
              { key: 'b', name: 'February', vi: 'Tháng 2', days: 28, color: 'border-pink-300 bg-pink-50/50' },
              { key: 'c', name: 'March', vi: 'Tháng 3', days: 31, color: 'border-emerald-300 bg-emerald-50/50' },
              { key: 'd', name: 'April', vi: 'Tháng 4', days: 30, color: 'border-amber-300 bg-amber-50/50' }
            ].map(item => {
              const isSelected = selectedMonth === item.name;
              return (
                <div
                  key={item.key}
                  onClick={() => handlePointMonth(item.name)}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all space-y-3 relative text-center group ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 shadow-lg ring-2 ring-rose-200 scale-102'
                      : `${item.color} hover:shadow-md`
                  }`}
                >
                  <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white font-bold text-xs flex items-center justify-center border border-slate-200">
                    {item.key}
                  </span>

                  {/* Calendar Mockup */}
                  <div className="pt-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white border-2 border-slate-200 flex flex-col overflow-hidden shadow-xs">
                      <div className="bg-rose-500 text-white text-[10px] font-black uppercase py-0.5">
                        {item.name.substring(0, 3)}
                      </div>
                      <div className="flex-1 flex items-center justify-center text-lg font-black text-slate-800">
                        {item.days}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors uppercase">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-slate-500">
                      {item.vi}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-xs text-rose-600 font-bold">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Bấm để luyện nói</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Sách Giáo Khoa Trang 28</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 3: Let's talk (Chúng mình cùng luyện nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Thực hành như cô giáo và các bạn trong lớp: Chọn tháng sinh nhật của bạn để tạo câu trả lời hoàn chỉnh!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-amber-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👩‍🏫</span>
                <div>
                  <div className="text-xs font-black text-amber-900 uppercase">
                    Cô giáo hỏi cả lớp:
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    "When's your birthday?"
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  speakWord("When's your birthday?", speechRate);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Cô Giáo Hỏi</span>
              </button>
            </div>

            {/* Choose Month Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Chọn tháng sinh nhật của bạn:
              </label>
              <div className="flex flex-wrap gap-2">
                {['January', 'February', 'March', 'April', 'May'].map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      sound.playClick();
                      setMyBirthdayMonth(m);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      myBirthdayMonth === m
                        ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-200 scale-105'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-50'
                    }`}
                  >
                    🗓️ {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Response Card */}
            <div className="p-5 rounded-2xl bg-white border-2 border-rose-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-rose-600">
                  Câu trả lời của bạn:
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  "It's in <span className="text-rose-600 underline">{myBirthdayMonth}</span>."
                </div>
                <div className="text-xs text-slate-500">
                  (Sinh nhật của tớ vào {keyMonths.find(x => x.name === myBirthdayMonth)?.vi})
                </div>
              </div>

              <button
                onClick={handleTalkPractice}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 text-white rounded-2xl font-black text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4 fill-white" />
                <span>Nói To & Nhận Sao ⭐</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND NUMBER ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 38 · Sách Giáo Khoa Trang 29</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 4: Listen and number (Nghe và đánh số từ 1 đến 4)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct4}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
              <button
                onClick={handleCheckAct4}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm Tra Đáp Án</span>
              </button>
            </div>
          </div>

          {/* 4 Tracks Audio Player Buttons */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 block">
              🎧 Bấm nghe từng câu của băng Track 38:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {act4Audios.map(item => (
                <button
                  key={item.track}
                  onClick={() => {
                    sound.playClick();
                    speakWord(item.text, speechRate);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-400 text-slate-800 text-xs font-bold transition-all flex items-center justify-between"
                >
                  <span>Băng số {item.track}</span>
                  <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                </button>
              ))}
            </div>
          </div>

          {/* 4 Calendars Cards: a (Feb), b (Apr), c (Jan), d (Mar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'a', month: 'FEBRUARY', vi: 'Tháng 2', correctNum: '3' },
              { key: 'b', month: 'APRIL', vi: 'Tháng 4', correctNum: '2' },
              { key: 'c', month: 'JANUARY', vi: 'Tháng 1', correctNum: '1' },
              { key: 'd', month: 'MARCH', vi: 'Tháng 3', correctNum: '4' }
            ].map(item => {
              const currentVal = act4Inputs[item.key] || '';
              const isCorrect = currentVal === item.correctNum;

              let cardStyle = 'border-slate-200 bg-slate-50';
              if (act4Checked) {
                cardStyle = isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50';
              }

              return (
                <div
                  key={item.key}
                  className={`p-5 rounded-3xl border-2 transition-all space-y-4 text-center ${cardStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-white font-black text-xs flex items-center justify-center border border-slate-200">
                      {item.key}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{item.vi}</span>
                  </div>

                  {/* Calendar Art */}
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white border-2 border-slate-300 shadow-xs flex flex-col overflow-hidden">
                    <div className="bg-rose-600 text-white text-[10px] font-black uppercase py-0.5">
                      {item.month}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-xl font-black text-slate-800">
                      🗓️
                    </div>
                  </div>

                  <div className="font-black text-sm text-slate-800 uppercase">
                    {item.month}
                  </div>

                  {/* Number Input / Select */}
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Thứ tự:</span>
                    <select
                      value={currentVal}
                      onChange={e =>
                        setAct4Inputs({
                          ...act4Inputs,
                          [item.key]: e.target.value
                        })
                      }
                      className="px-3 py-1.5 rounded-xl border-2 border-slate-300 font-black text-sm text-slate-800 bg-white focus:border-rose-500 focus:outline-none"
                    >
                      <option value="">--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  {act4Checked && (
                    <div className="text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng ({item.correctNum})
                        </span>
                      ) : (
                        <span className="text-rose-600">
                          Đáp án đúng là: {item.correctNum}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 29</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 5: Look, complete and read (Quan sát bánh sinh nhật, điền và đọc)
              </h3>
            </div>
            <button
              onClick={handleCheckAct5}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Questions.map(item => (
              <div
                key={item.q}
                className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-black rounded-lg">
                    Câu {item.q}
                  </span>
                  {/* Birthday Cake Badge */}
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-xl flex items-center gap-1">
                    🎂 Bánh ghi: <strong>{item.cakeDate}</strong>
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-800 font-medium">
                  {/* Dialogue A */}
                  <div className="flex items-center gap-2">
                    <span className="font-black text-rose-600">A:</span>
                    <span>When's your birthday?</span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord("When's your birthday?", speechRate);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dialogue B */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-amber-600">B:</span>
                    <span>It's in</span>
                    <input
                      type="text"
                      placeholder="tháng..."
                      value={act5Answers[item.q] || ''}
                      onChange={e =>
                        setAct5Answers({
                          ...act5Answers,
                          [item.q]: e.target.value
                        })
                      }
                      className="px-3 py-1 w-32 rounded-xl border-2 border-slate-300 font-bold text-sm text-rose-700 bg-white focus:border-rose-500 focus:outline-none"
                    />
                    <span>.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-slate-500">Gợi ý chọn nhanh:</span>
                  {['March', 'May', 'February', 'April'].map(monthName => (
                    <button
                      key={monthName}
                      onClick={() => {
                        sound.playClick();
                        setAct5Answers({
                          ...act5Answers,
                          [item.q]: monthName
                        })
                      }}
                      className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-xs font-bold text-slate-700"
                    >
                      {monthName}
                    </button>
                  ))}
                </div>

                {act5Checked && (
                  <div className="pt-2 text-xs font-bold border-t border-slate-200">
                    {act5Answers[item.q]?.trim().toLowerCase() === item.correct.toLowerCase() ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Chính xác! (It's in {item.correct}.)
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        Đáp án đúng là: <strong>{item.correct}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S SING ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 39 · Sách Giáo Khoa Trang 29</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Activity 6: Let's sing — "When's your birthday?"</span>
                <Music className="w-5 h-5 text-rose-500" />
              </h3>
            </div>
            <button
              onClick={playSong}
              disabled={isSinging}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 text-white rounded-2xl font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isSinging ? 'Đang Hát Theo Nhạc...' : 'Hát Toàn Bộ Bài Hát 🎵'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lyrics Player List */}
            <div className="space-y-2">
              {songLyrics.map((line, idx) => {
                const isActive = activeSongLine === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveSongLine(idx);
                      speakWord(line.text, speechRate);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-rose-500 text-white border-rose-600 shadow-md font-black scale-102'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800 font-bold'
                    }`}
                  >
                    <div>
                      <div className="text-sm sm:text-base">{line.text}</div>
                      <div className={`text-xs ${isActive ? 'text-rose-100' : 'text-slate-500'}`}>
                        {line.vi}
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                );
              })}
            </div>

            {/* Visual Birthday Stage */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 border-2 border-rose-200 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-7xl animate-bounce">🎂</div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">
                  🎉 Birthday Party Sing-Along Stage!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm">
                  Hai bạn nhỏ trong bài: Một bạn sinh vào <strong>January 8</strong> (Tháng 1), một bạn sinh vào <strong>February 24</strong> (Tháng 2).
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 bg-white rounded-2xl border border-rose-200 shadow-xs text-center space-y-1">
                  <div className="text-2xl">👧</div>
                  <div className="text-xs font-black text-rose-700">January 8</div>
                  <div className="text-[10px] text-slate-500">Cô bé tóc vàng</div>
                </div>
                <div className="text-2xl font-black text-rose-400">♥</div>
                <div className="p-3 bg-white rounded-2xl border border-rose-200 shadow-xs text-center space-y-1">
                  <div className="text-2xl">👦</div>
                  <div className="text-xs font-black text-pink-700">February 24</div>
                  <div className="text-[10px] text-slate-500">Cậu bé tóc nâu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
