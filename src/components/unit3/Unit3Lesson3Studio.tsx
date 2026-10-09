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
  Calendar,
  Edit3,
  Copy,
  Tv,
  Home,
  School,
  ArrowRight,
  Smile
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit3Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit3Lesson3Studio: React.FC<Unit3Lesson3StudioProps> = ({
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

  // Activity 2: Listen and circle (Track 34)
  const [act2Answers, setAct2Answers] = useState<{ [q: number]: string | null }>({ 1: null, 2: null });
  const [act2Checked, setAct2Checked] = useState<boolean>(false);

  // Script Track 34:
  // 1: "I listen to music." -> a
  // 2: "I study at school." -> b
  const act2Questions = [
    {
      q: 1,
      audioText: "I listen to music.",
      correct: 'a',
      options: [
        { key: 'a', text: 'I listen to music.', highlight: 'u (/juː/)' },
        { key: 'b', text: 'I stay at home on Sundays.', highlight: 'u (/ʌ/)' },
        { key: 'c', text: 'I study at school.', highlight: 'u (/ʌ/)' }
      ],
      explanation: 'Âm thanh đọc rõ: "I listen to music" ➔ Chọn đáp án a.'
    },
    {
      q: 2,
      audioText: "I study at school.",
      correct: 'b',
      options: [
        { key: 'a', text: 'I listen to music.', highlight: 'u (/juː/)' },
        { key: 'b', text: 'I study at school.', highlight: 'u (/ʌ/)' },
        { key: 'c', text: 'I like music.', highlight: 'u (/juː/)' }
      ],
      explanation: 'Âm thanh đọc rõ: "I study at school" ➔ Chọn đáp án b.'
    }
  ];

  const handleCheckAct2 = () => {
    sound.playClick();
    setAct2Checked(true);
    if (act2Answers[1] === 'a' && act2Answers[2] === 'b') {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
      onAddStar(6);
    } else {
      sound.playWrong();
    }
  };

  // Activity 3: Let's chant (Track 35)
  const [isChanting, setIsChanting] = useState<boolean>(false);
  const [activeChantLine, setActiveChantLine] = useState<number>(-1);

  const chantLines = [
    { text: 'Music, music, music.', ipa: '/ˈmjuːzɪk, ˈmjuːzɪk, ˈmjuːzɪk/', vi: 'Âm nhạc, âm nhạc, âm nhạc.' },
    { text: 'I listen to music on Saturdays.', ipa: '/aɪ ˈlɪsn tu ˈmjuːzɪk ɒn ˈsætədeɪz/', vi: 'Tớ nghe nhạc vào các ngày Thứ Bảy.' },
    { text: 'I listen to music on Saturdays.', ipa: '/aɪ ˈlɪsn tu ˈmjuːzɪk ɒn ˈsætədeɪz/', vi: 'Tớ nghe nhạc vào các ngày Thứ Bảy.' },
    { text: 'Sundays, Sundays, Sundays.', ipa: '/ˈsʌndeɪz, ˈsʌndeɪz, ˈsʌndeɪz/', vi: 'Chủ Nhật, Chủ Nhật, Chủ Nhật.' },
    { text: 'What do you do on Sundays?', ipa: '/wɒt duː juː duː ɒn ˈsʌndeɪz/', vi: 'Cậu làm gì vào các ngày Chủ Nhật?' },
    { text: 'I do housework on Sundays.', ipa: '/aɪ duː ˈhaʊswɜːk ɒn ˈsʌndeɪz/', vi: 'Tớ làm việc nhà vào các ngày Chủ Nhật.' }
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

  // Activity 4: Read and complete (Trang 27)
  const [tableAnswers, setTableAnswers] = useState({
    tuesday: '',
    thursday: '',
    saturday: '',
    sunday: ''
  });
  const [tableChecked, setTableChecked] = useState<boolean>(false);
  const [activeClueIndex, setActiveClueIndex] = useState<number | null>(null);

  const handleCheckTable = () => {
    sound.playClick();
    setTableChecked(true);
    const c1 = tableAnswers.tuesday.toLowerCase().includes('school');
    const c2 = tableAnswers.thursday.toLowerCase().includes('school');
    const c3 = tableAnswers.saturday.toLowerCase().includes('housework');
    const c4 = tableAnswers.sunday.toLowerCase().includes('tv') || tableAnswers.sunday.toLowerCase().includes('watch');

    if (c1 && c2 && c3 && c4) {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 70 });
      onAddStar(8);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Let's write (Trang 27)
  const [writeForm, setWriteForm] = useState({
    name: 'An',
    schoolDays: 'on Mondays, Tuesdays, Wednesdays, Thursdays and Fridays',
    houseworkDay: 'Saturdays',
    sundayActivity: 'listen to music with my family'
  });
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const fullWrittenParagraph = `I am ${writeForm.name || 'An'}. I go to school ${writeForm.schoolDays}. I do housework on ${writeForm.houseworkDay}. On Sundays, I ${writeForm.sundayActivity}. What do you do at the weekend?`;

  const handleReadWritten = async () => {
    sound.playClick();
    await speakWord(fullWrittenParagraph, speechRate);
    onAddStar(4);
  };

  // Activity 6: Project: Weekend activities (Trang 27)
  const [projectData, setProjectData] = useState({
    saturdayActivity: 'play football with my classmates',
    sundayActivity: 'help my parents clean the house'
  });

  const handlePresentProject = async () => {
    sound.playClick();
    const speech = `Hello everyone! These are my weekend activities. On Saturdays, I ${projectData.saturdayActivity}. On Sundays, I ${projectData.sundayActivity}. Thank you for listening!`;
    await speakWord(speech, speechRate);
    sound.playVictory();
    confetti({ particleCount: 70, spread: 80 });
    onAddStar(7);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SGK Tiếng Anh 4 · Trang 26 & 27 (Tập 1)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-300 text-slate-950 rounded-full text-xs font-black shadow-sm">
              <span>🎯 Tiết 3: Phonics Chữ Cái 'u', Đọc Hiểu & Dự Án Cuối Tuần</span>
            </span>
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 1 (Trang 22)</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <span>⬅️ Tiết 2 (Trang 24)</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 3: My week — Lesson 3
          </h1>
          <p className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed max-w-3xl">
            Luyện chuẩn 2 cách phát âm của chữ cái <strong>'u'</strong>: âm <strong>/juː/ (trong music 🎧)</strong> và âm <strong>/ʌ/ (trong Sunday ☀️)</strong>, đọc hiểu thời gian biểu của Nam, viết nhật ký tuần và tự tin thuyết trình <strong>Dự Án Hoạt Động Cuối Tuần (Weekend activities)</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /juː/: m<strong className="text-amber-300">u</strong>sic</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🗣️ Âm /ʌ/: S<strong className="text-amber-300">u</strong>nday</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎵 Bài vè Let's chant</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">📋 Bảng Nam's week</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">⚽ Thuyết trình Weekend activities</span>
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
            className="px-4 py-1.5 bg-white text-rose-950 hover:bg-rose-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang ngữ âm chữ cái "u"'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          ⚽
        </div>
      </div>

      {/* ================= BÍ KÍP NÃO PHẢI: 2 ÂM CỦA CHỮ CÁI 'U' ================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Quyết Phân Biệt Ngữ Âm Chữ Cái 'u'</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 Bí Kíp 3 Giây: /juː/ (chúm môi huýt sáo) vs /ʌ/ (mở miệng ngắn gọn)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Trong <strong>music</strong> chữ 'u' đọc là <em>/juː/ (diu)</em>; trong <strong>Sunday</strong> chữ 'u' đọc là <em>/ʌ/ (ă/á ngắn)</em>!
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('music. I listen to music on Saturdays.', speechRate);
              await new Promise(r => setTimeout(r, 400));
              await speakWord('Sunday. I do housework on Sundays.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Đối Chiếu 2 Âm Của 'u'</span>
          </button>
        </div>

        {/* 2 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: u -> /juː/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-amber-400/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-amber-500/30 border border-amber-400/40 text-amber-300 font-black text-2xl flex items-center justify-center">
                u
              </span>
              <span className="text-xs font-mono font-bold bg-white/15 text-amber-300 px-3 py-1 rounded-full">
                Phát âm là: /juː/ (kéo dài môi)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-2">
                <span>m<strong className="text-amber-400 underline">u</strong>sic</span>
                <span className="text-xs font-mono text-indigo-300">/ˈmjuːzɪk/</span>
              </div>
              <div className="text-sm font-bold text-slate-200">
                "I listen to m<strong className="text-amber-400">u</strong>sic on Saturdays."
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <div className="font-bold text-amber-300">👄 Khẩu hình miệng:</div>
              <div className="text-slate-300 leading-relaxed">
                Môi tròn nhỏ chúm lại như huýt sáo, trượt từ âm /j/ sang /uː/ kéo dài: <em>MIU-zích</em>.
              </div>
            </div>
          </div>

          {/* Card 2: u -> /ʌ/ */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-rose-400/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-400/40 text-rose-300 font-black text-2xl flex items-center justify-center">
                u
              </span>
              <span className="text-xs font-mono font-bold bg-white/15 text-rose-300 px-3 py-1 rounded-full">
                Phát âm là: /ʌ/ (âm ngắn dứt khoát)
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white flex items-center gap-2">
                <span>S<strong className="text-rose-400 underline">u</strong>nday</span>
                <span className="text-xs font-mono text-indigo-300">/ˈsʌndeɪ/</span>
              </div>
              <div className="text-sm font-bold text-slate-200">
                "I do housework on S<strong className="text-rose-400">u</strong>ndays."
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <div className="font-bold text-rose-300">👄 Khẩu hình miệng:</div>
              <div className="text-slate-300 leading-relaxed">
                Miệng mở tự nhiên, lưỡi hạ thấp, phát âm dứt khoát như âm "ă/á": <em>XĂN-đây</em>, <em>XTÁ-đi (study)</em>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Phụ Huynh: Mẹo Dạy Ngữ Âm Chữ 'u' Cho Con</span>
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
              <div className="font-bold text-amber-950 text-sm">💡 1. Mẹo nhớ âm /juː/ trong music</div>
              <p>
                Nhắc con nhớ đến nốt nhạc du dương "mi-u": chữ 'u' ở đây đọc giống như chữ "you" trong tiếng Anh: <em>/ˈmjuːzɪk/</em>.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <div className="font-bold text-rose-950 text-sm">💡 2. Mẹo nhớ âm /ʌ/ trong Sunday & study</div>
              <p>
                Rất nhiều trẻ đọc nhầm "study" thành "x-tu-đi". Bố mẹ nhắc con: chữ 'u' ở đây đọc là âm /ʌ/ giống âm "á": <em>XTÁ-đi</em>, giống như <em>Sun (Mặt trời)</em> đọc là <em>Xăn</em>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITY STEPPER NAVIGATOR ================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="flex items-center gap-1.5 text-rose-700">
            <span>🎯</span>
            <span>Hành Trình Chinh Phục 6 Hoạt Động Tiết 3 (Trang 26 - 27 SGK)</span>
          </span>
          <span className="text-[11px] text-slate-400">Bấm để chọn hoạt động</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 1, label: '1. Listen and repeat', icon: '🗣️', tag: 'Track 33' },
            { id: 2, label: '2. Listen and circle', icon: '✏️', tag: 'Track 34' },
            { id: 3, label: "3. Let's chant", icon: '🎵', tag: 'Track 35' },
            { id: 4, label: '4. Read and complete', icon: '📖', tag: 'Trang 27' },
            { id: 5, label: "5. Let's write", icon: '✍️', tag: 'Tập viết' },
            { id: 6, label: '6. Weekend Project', icon: '⚽', tag: 'Dự án' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeSection === act.id
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 text-white shadow-md border-transparent scale-[1.02]'
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

      {/* ================= ACTIVITY 1: LISTEN AND REPEAT (TRACK 33) ================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Hoạt Động 1 (Trang 26 SGK - Track 33)
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Listen and repeat (Lắng nghe và nhắc lại chuẩn 2 âm của chữ cái 'u')
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Bé chú ý các chữ cái màu đỏ in đậm để so sánh phát âm của m<strong>u</strong>sic (/juː/) và S<strong>u</strong>nday (/ʌ/).
              </p>
            </div>
            <span className="text-xs bg-rose-100 text-rose-800 font-bold px-3 py-1.5 rounded-full shrink-0">
              Track 33 Audio Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: u -> music */}
            <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <span className="text-3xl font-black text-amber-600 font-mono">
                  u <span className="text-sm font-normal text-slate-500 font-sans">(/juː/)</span>
                </span>
                <span className="text-2xl">🎧 🎵</span>
              </div>

              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('music. I listen to music on Saturdays.', speechRate);
                }}
                className="p-4 bg-amber-50 rounded-2xl border border-amber-200 hover:bg-amber-100/60 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Từ trọng tâm:</span>
                  <span className="flex items-center gap-1 text-amber-600"><Volume2 className="w-3.5 h-3.5" /> Bấm nghe</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  m<span className="text-amber-600 underline">u</span>sic
                </div>
                <div className="text-xs font-mono text-indigo-700">/ˈmjuːzɪk/</div>
                <div className="text-xs font-bold text-slate-700 pt-1">
                  Câu SGK: "I listen to m<strong className="text-amber-600">u</strong>sic on Saturdays."
                </div>
              </div>
            </div>

            {/* Box 2: u -> Sunday */}
            <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="text-3xl font-black text-rose-600 font-mono">
                  u <span className="text-sm font-normal text-slate-500 font-sans">(/ʌ/)</span>
                </span>
                <span className="text-2xl">☀️ 🧹</span>
              </div>

              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Sunday. I do housework on Sundays.', speechRate);
                }}
                className="p-4 bg-rose-50 rounded-2xl border border-rose-200 hover:bg-rose-100/60 cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>Từ trọng tâm:</span>
                  <span className="flex items-center gap-1 text-rose-600"><Volume2 className="w-3.5 h-3.5" /> Bấm nghe</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  S<span className="text-rose-600 underline">u</span>nday
                </div>
                <div className="text-xs font-mono text-indigo-700">/ˈsʌndeɪ/</div>
                <div className="text-xs font-bold text-slate-700 pt-1">
                  Câu SGK: "I do housework on S<strong className="text-rose-600">u</strong>ndays."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN AND CIRCLE (TRACK 34) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Hoạt Động 2 (Trang 26 SGK - Track 34)
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.options.map(opt => {
                    const isSelected = act2Answers[item.q] === opt.key;
                    let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200';

                    if (act2Checked) {
                      if (opt.key === item.correct) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-black';
                      } else if (isSelected && opt.key !== item.correct) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200 font-bold';
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
                          <span>{opt.text}</span>
                        </div>
                        {act2Checked && opt.key === item.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {act2Checked && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    💡 <span className="font-bold text-rose-700">Giải thích: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCheckAct2}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
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

      {/* ================= ACTIVITY 3: LET'S CHANT (TRACK 35) ================= */}
      {activeSection === 3 && (
        <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Hoạt Động 3: Let's chant (Trang 26 SGK - Track 35)</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                🎵 Bài Vè: "Music on Saturdays" & "Housework on Sundays"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Cùng bé vỗ tay theo nhịp để rèn luyện ngữ điệu tự nhiên và phân biệt chuẩn 2 âm của chữ cái 'u'!
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
            {/* Stanza 1: Music on Saturdays */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-amber-300 text-sm">Khổ 1: Nghe nhạc Thứ Bảy 🎧</span>
                <span className="px-2 py-0.5 bg-slate-950 text-amber-300 font-mono font-bold text-xs rounded">Saturdays</span>
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

            {/* Stanza 2: Housework on Sundays */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-rose-300 text-sm">Khổ 2: Làm việc nhà Chủ Nhật 🧹</span>
                <span className="px-2 py-0.5 bg-slate-950 text-rose-300 font-mono font-bold text-xs rounded">Sundays</span>
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

      {/* ================= ACTIVITY 4: READ AND COMPLETE (TRANG 27) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Hoạt Động 4 (Trang 27 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Read and complete (Đọc đoạn văn của bạn Nam và điền bảng thời gian biểu)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy đọc kỹ đoạn văn của Nam, sau đó điền hoạt động tương ứng vào bảng <strong>Nam's week</strong> nhé!
            </p>
          </div>

          {/* Reading Passage with Clue Highlighter */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase">
                Đoạn văn tự giới thiệu của bạn Nam:
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'I am Nam. It is Monday today. It is a school day. I go to school on Mondays, Tuesdays, Wednesdays, Thursdays and Fridays. At the weekend, I stay at home. I do housework on Saturdays. I watch TV on Sundays. What do you do at the weekend?',
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
              "I am Nam. It is Monday today. It is a school day.{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeClueIndex === 1 ? 'bg-amber-300 ring-2 ring-amber-400 font-black' : ''}`}>
                I go to school on Mondays, Tuesdays, Wednesdays, Thursdays and Fridays.
              </span>{' '}
              At the weekend, I stay at home.{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeClueIndex === 2 ? 'bg-emerald-300 ring-2 ring-emerald-400 font-black' : ''}`}>
                I do housework on Saturdays.
              </span>{' '}
              <span className={`px-1.5 py-0.5 rounded ${activeClueIndex === 3 ? 'bg-sky-300 ring-2 ring-sky-400 font-black' : ''}`}>
                I watch TV on Sundays.
              </span>{' '}
              What do you do at the weekend?"
            </div>
          </div>

          {/* Nam's Week Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Bảng thời gian biểu: Nam's week
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveClueIndex(1)}
                  className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded"
                >
                  Soi thứ 2-6 💡
                </button>
                <button
                  onClick={() => setActiveClueIndex(2)}
                  className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded"
                >
                  Soi Thứ 7 💡
                </button>
                <button
                  onClick={() => setActiveClueIndex(3)}
                  className="text-xs bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded"
                >
                  Soi Chủ Nhật 💡
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-center text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white font-black">
                  <tr>
                    <th className="p-3">Monday</th>
                    <th className="p-3">Tuesday</th>
                    <th className="p-3">Wednesday</th>
                    <th className="p-3">Thursday</th>
                    <th className="p-3">Friday</th>
                    <th className="p-3 bg-amber-600">Saturday</th>
                    <th className="p-3 bg-rose-600">Sunday</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">go to school</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={tableAnswers.tuesday}
                        onChange={e => setTableAnswers(prev => ({ ...prev, tuesday: e.target.value }))}
                        placeholder="(1) ..."
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-bold"
                      />
                    </td>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">go to school</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={tableAnswers.thursday}
                        onChange={e => setTableAnswers(prev => ({ ...prev, thursday: e.target.value }))}
                        placeholder="(2) ..."
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-bold"
                      />
                    </td>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50">go to school</td>
                    <td className="p-3 bg-amber-50/50">
                      <input
                        type="text"
                        value={tableAnswers.saturday}
                        onChange={e => setTableAnswers(prev => ({ ...prev, saturday: e.target.value }))}
                        placeholder="(3) ..."
                        className="w-full px-2 py-1 bg-white border border-amber-300 rounded text-center text-xs font-bold"
                      />
                    </td>
                    <td className="p-3 bg-rose-50/50">
                      <input
                        type="text"
                        value={tableAnswers.sunday}
                        onChange={e => setTableAnswers(prev => ({ ...prev, sunday: e.target.value }))}
                        placeholder="(4) ..."
                        className="w-full px-2 py-1 bg-white border border-rose-300 rounded text-center text-xs font-bold"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Fill Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-500 font-bold">Gợi ý điền nhanh:</span>
              {[
                { label: '(1) & (2): go to school', fill: () => setTableAnswers(prev => ({ ...prev, tuesday: 'go to school', thursday: 'go to school' })) },
                { label: '(3): do housework', fill: () => setTableAnswers(prev => ({ ...prev, saturday: 'do housework' })) },
                { label: '(4): watch TV', fill: () => setTableAnswers(prev => ({ ...prev, sunday: 'watch TV' })) }
              ].map(chip => (
                <button
                  key={chip.label}
                  onClick={() => {
                    sound.playClick();
                    chip.fill();
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-800"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCheckTable}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra bảng Nam's week</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LET'S WRITE (TRANG 27) ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Hoạt Động 5 (Trang 27 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Let's write (Tập viết nhật ký tuần của bé)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy điền các hoạt động trong tuần của mình để hoàn thành bài văn nhé!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-black text-slate-700 uppercase">Điền thông tin của bé:</h3>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Tên của bé (I am...):</label>
                <input
                  type="text"
                  value={writeForm.name}
                  onChange={e => setWriteForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="An, Linh, Nam..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Những ngày đi học (I go to school...):</label>
                <input
                  type="text"
                  value={writeForm.schoolDays}
                  onChange={e => setWriteForm(prev => ({ ...prev, schoolDays: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="from Monday to Friday"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Ngày làm việc nhà (I do housework on...):</label>
                <input
                  type="text"
                  value={writeForm.houseworkDay}
                  onChange={e => setWriteForm(prev => ({ ...prev, houseworkDay: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="Saturdays"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Hoạt động Chủ Nhật (On Sundays, I...):</label>
                <input
                  type="text"
                  value={writeForm.sundayActivity}
                  onChange={e => setWriteForm(prev => ({ ...prev, sundayActivity: e.target.value }))}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                  placeholder="watch TV / play football / listen to music"
                />
              </div>
            </div>

            {/* Rendered Live Paragraph */}
            <div className="p-6 bg-rose-50/80 rounded-2xl border-2 border-rose-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-black text-rose-900 uppercase">Bài văn hoàn chỉnh của bé:</div>
                <div className="text-base font-bold text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-rose-100 shadow-2xs space-y-2">
                  <p>
                    I am <span className="text-rose-700 underline font-black">{writeForm.name || '_______'}</span>. I go to school <span className="text-rose-700 underline font-black">{writeForm.schoolDays}</span>.
                  </p>
                  <p>
                    I do housework on <span className="text-rose-700 underline font-black">{writeForm.houseworkDay}</span>. On Sundays, I <span className="text-rose-700 underline font-black">{writeForm.sundayActivity}</span>.
                  </p>
                  <p className="text-slate-600 italic">
                    What do you do at the weekend?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadWritten}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2"
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
                  className="px-4 py-3 bg-white text-rose-900 border border-rose-300 rounded-xl text-xs font-bold shadow-2xs"
                >
                  {hasCopied ? 'Đã chép!' : 'Sao chép'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: PROJECT (WEEKEND ACTIVITIES) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Hoạt Động 6: Project (Trang 27 SGK)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Project: Weekend activities (Thuyết Trình Hoạt Động Cuối Tuần)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bé hãy chuẩn bị bài thuyết trình trước lớp giống như bạn Nam trên bảng đen SGK nhé!
            </p>
          </div>

          {/* Blackboard Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-4 border-amber-900 shadow-2xl text-white space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚽ 🧑‍🏫</span>
                <span className="font-black text-amber-300 text-sm uppercase">Blackboard Presentation: Weekend Activities</span>
              </div>
              <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">Grade 4 Project</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-white/10 rounded-2xl border border-white/15 text-center space-y-3">
                <div className="text-4xl">⚽</div>
                <div className="text-base font-black text-amber-300">Saturdays (Thứ Bảy)</div>
                <input
                  type="text"
                  value={projectData.saturdayActivity}
                  onChange={e => setProjectData(prev => ({ ...prev, saturdayActivity: e.target.value }))}
                  className="w-full px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-bold text-center border border-white/20"
                />
                <div className="text-xs text-slate-300 italic">"On Saturdays, I {projectData.saturdayActivity}."</div>
              </div>

              <div className="p-5 bg-white/10 rounded-2xl border border-white/15 text-center space-y-3">
                <div className="text-4xl">📺</div>
                <div className="text-base font-black text-rose-300">Sundays (Chủ Nhật)</div>
                <input
                  type="text"
                  value={projectData.sundayActivity}
                  onChange={e => setProjectData(prev => ({ ...prev, sundayActivity: e.target.value }))}
                  className="w-full px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-bold text-center border border-white/20"
                />
                <div className="text-xs text-slate-300 italic">"On Sundays, I {projectData.sundayActivity}."</div>
              </div>
            </div>

            <button
              onClick={handlePresentProject}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Thuyết Trình Dự Án Cuối Tuần Bằng Tiếng Anh (Thưởng Sao ⭐)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
