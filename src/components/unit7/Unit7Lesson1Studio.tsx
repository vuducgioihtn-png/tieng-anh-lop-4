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
  Clock,
  Calendar,
  Grid,
  Edit3,
  Bookmark
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit7Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit7Lesson1Studio: React.FC<Unit7Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Subjects in Lesson 1
  const coreSubjects = [
    {
      id: 'vietnamese',
      name: 'Vietnamese',
      vi: 'Môn Tiếng Việt',
      bookName: 'Tiếng Việt 4',
      ipa: '/ˌvjet.nəˈmiːz/',
      reading: 'việt-nơ-MI-z',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      badgeBg: 'bg-emerald-600',
      icon: '📘',
      desc: 'Học đọc, viết văn, cảm thụ văn học và gìn giữ sự trong sáng của tiếng Việt.',
      tip: 'Đuôi "se" trong Vietnamese phát âm là âm rung nhẹ /z/, trọng âm rơi vào âm tiết cuối (-ese).'
    },
    {
      id: 'english',
      name: 'English',
      vi: 'Môn Tiếng Anh',
      bookName: 'Tiếng Anh 4',
      ipa: '/ˈɪŋ.ɡlɪʃ/',
      reading: 'ÍNH-glish',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      icon: '📕',
      desc: 'Khám phá thế giới, giao tiếp tự tin cùng bạn bè năm châu với cô Hoa và thầy Long.',
      tip: 'Chữ cái "sh" ở đuôi đọc thành âm gió chu môi dài /ʃ/ (như khi ta suỵt khẽ).'
    },
    {
      id: 'maths',
      name: 'maths',
      vi: 'Môn Toán',
      bookName: 'Toán 4',
      ipa: '/mæθs/',
      reading: 'MÁT-th-s',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      icon: '📐',
      desc: 'Rèn luyện tư duy logic qua những con số, hình học và bài toán thực tế thú vị.',
      tip: 'Chữ "th" kẹp đầu lưỡi giữa 2 hàm răng thổi gió /θ/, sau đó bật nhẹ âm /s/.'
    },
    {
      id: 'science',
      name: 'science',
      vi: 'Môn Khoa học',
      bookName: 'Khoa học 4',
      ipa: '/ˈsaɪ.əns/',
      reading: 'XAI-ừn-s',
      color: 'bg-teal-50 border-teal-300 text-teal-800',
      badgeBg: 'bg-teal-600',
      icon: '🔬',
      desc: 'Tìm hiểu về thiên nhiên, các thí nghiệm sinh động, con người và thế giới quanh ta.',
      tip: 'Đuôi "ce" phát âm là âm xì gió /s/, không đọc nhầm thành "sci-en-tít".'
    }
  ];

  // Activity 1: Dialogue Look, Listen & Repeat (Track 67)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Mẹ hỏi Minh giờ vào lớp',
      context: 'Buổi sáng tại phòng của Minh. Minh đang xếp đồ dùng thì mẹ mở cửa phòng vào hỏi giờ học.',
      badge: 'Track 67 - Part A (Đồng hồ 8:00)',
      clockDisplay: '08:00',
      lines: [
        {
          speaker: 'Mum',
          avatar: '👩',
          en: 'What time do you have class today, Minh?',
          vi: 'Hôm nay con vào lớp lúc mấy giờ hả Minh?',
          soundDesc: 'Mẹ ân cần hỏi giờ học buổi sáng',
          focus: 'What time do you have class today...?'
        },
        {
          speaker: 'Minh',
          avatar: '👦',
          en: 'At eight, Mum.',
          vi: 'Dạ lúc 8 giờ mẹ ạ.',
          soundDesc: 'Minh ngoan ngoãn thưa với mẹ',
          focus: 'At eight, Mum.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Mẹ hỏi các môn học hôm nay',
      context: 'Mẹ chỉ vào chồng sách giáo khoa trên bàn và hỏi Minh về các môn học theo thời khóa biểu.',
      badge: 'Track 67 - Part B (English & maths)',
      clockDisplay: '08:15',
      lines: [
        {
          speaker: 'Mum',
          avatar: '👩',
          en: 'What subjects do you have today?',
          vi: 'Hôm nay con có những môn học nào?',
          soundDesc: 'Mẹ hỏi về các môn học trong ngày',
          focus: 'What subjects do you have today?'
        },
        {
          speaker: 'Minh',
          avatar: '👦',
          en: 'I have English and maths.',
          vi: 'Con có môn Tiếng Anh và môn Toán ạ.',
          soundDesc: 'Minh tự tin cầm sách Tiếng Anh và Toán lên',
          focus: 'I have English and maths.'
        }
      ]
    }
  };

  // Activity 2: Listen, point and say (Track 68)
  const [selectedSubId, setSelectedSubId] = useState<string>('vietnamese');

  // Activity 3: Let's talk
  const [talkSubject1, setTalkSubject1] = useState<string>('English');
  const [talkSubject2, setTalkSubject2] = useState<string>('maths');

  // Activity 4: Listen and tick or cross (Track 69)
  interface ListenTickCrossItem {
    id: number;
    subjectName: string;
    bookTitle: string;
    audioText: string;
    speaker: string;
    correctAnswer: 'tick' | 'cross';
    userAnswer: 'tick' | 'cross' | null;
    icon: string;
    desc: string;
  }

  const [tickCrossList, setTickCrossList] = useState<ListenTickCrossItem[]>([
    {
      id: 1,
      subjectName: 'Vietnamese',
      bookTitle: 'Sách Tiếng Việt 4',
      audioText: 'What subjects do you have today? - I have Vietnamese and science.',
      speaker: '👧 Mai & Nam',
      correctAnswer: 'tick',
      userAnswer: null,
      icon: '📘',
      desc: 'Hình 1: Có môn Tiếng Việt ➔ ĐÚNG (Tick ✓)'
    },
    {
      id: 2,
      subjectName: 'English',
      bookTitle: 'Sách Tiếng Anh 4',
      audioText: 'What subjects do you have today? - I have maths and art. I do not have English.',
      speaker: '👦 Phong & Linda',
      correctAnswer: 'cross',
      userAnswer: null,
      icon: '📕',
      desc: 'Hình 2: Bạn ấy không có Tiếng Anh ➔ SAI (Cross ✗)'
    },
    {
      id: 3,
      subjectName: 'maths',
      bookTitle: 'Sách Toán 4',
      audioText: 'What subjects do you have today? - I have maths and history.',
      speaker: '👧 Linh & Peter',
      correctAnswer: 'tick',
      userAnswer: null,
      icon: '📐',
      desc: 'Hình 3: Bạn ấy có môn Toán ➔ ĐÚNG (Tick ✓)'
    },
    {
      id: 4,
      subjectName: 'science',
      bookTitle: 'Sách Khoa học 4',
      audioText: 'What subjects do you have today? - I have English and music. No science today.',
      speaker: '👦 Quân & Lucy',
      correctAnswer: 'cross',
      userAnswer: null,
      icon: '🔬',
      desc: 'Hình 4: Bạn ấy không có môn Khoa học ➔ SAI (Cross ✗)'
    }
  ]);
  const [tickCrossChecked, setTickCrossChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3a: '',
    q3b: '',
    q4a: '',
    q4b: '',
    q4c: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Crossword Puzzle (Official SGK Crossword)
  // Vertical clue: S-U-B-J-E-C-T-S
  // Horizontal 1: s-c-i-e-n-c-e (crosses at 's')
  // Horizontal 2: V-i-e-t-n-a-m-e-s-e (crosses at 'e')
  // Horizontal 3: m-a-t-h-s (crosses at 't')
  // Vertical 4: E-n-g-l-i-s-h (down, intersecting horizontal 1 'n' & horizontal 2 's')
  const [crosswordInputs, setCrosswordInputs] = useState<{ [key: string]: string }>({
    // 1 across: science
    h1_0: 's', h1_1: '', h1_2: '', h1_3: '', h1_4: '', h1_5: '', h1_6: '',
    // 2 across: Vietnamese
    h2_0: '', h2_1: '', h2_2: '', h2_3: '', h2_4: '', h2_5: '', h2_6: '', h2_7: '', h2_8: '', h2_9: '',
    // 3 across: maths
    h3_0: '', h3_1: '', h3_2: '', h3_3: '', h3_4: '',
    // 4 down: English
    v4_0: '', v4_1: '', v4_2: '', v4_3: '', v4_4: '', v4_5: '', v4_6: ''
  });
  const [crosswordChecked, setCrosswordChecked] = useState<boolean>(false);

  const curSub = coreSubjects.find(s => s.id === selectedSubId) || coreSubjects[0];

  const handleFillCorrectCrossword = () => {
    sound.playCorrect();
    setCrosswordInputs({
      h1_0: 's', h1_1: 'c', h1_2: 'i', h1_3: 'e', h1_4: 'n', h1_5: 'c', h1_6: 'e',
      h2_0: 'V', h2_1: 'i', h2_2: 'e', h2_3: 't', h2_4: 'n', h2_5: 'a', h2_6: 'm', h2_7: 'e', h2_8: 's', h2_9: 'e',
      h3_0: 'm', h3_1: 'a', h3_2: 't', h3_3: 'h', h3_4: 's',
      v4_0: 'E', v4_1: 'n', v4_2: 'g', v4_3: 'l', v4_4: 'i', v4_5: 's', v4_6: 'h'
    });
    setCrosswordChecked(true);
    onAddStar(3);
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 7: Our timetables • Tiết 1 (Lesson 1)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-teal-100 hover:text-white"
                >
                  Sang Tiết 3
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi & Nói Về Các Môn Học Hôm Nay</span>
              <span className="text-3xl">📚</span>
            </h1>
            <p className="text-teal-100 text-sm md:text-base font-medium mt-1">
              Làm quen với các môn học thân thuộc: Vietnamese, English, maths, science và mẫu câu hỏi thời khóa biểu: "What subjects do you have today?" — "I have..."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 50 - 51</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Mẫu Câu</span>
              <span className="text-sm font-black text-amber-300">What subjects do you have?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Từ Vựng Tiết 1</span>
              <span className="text-sm font-black text-white">4 Môn Học Cốt Lõi</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Game Trọng Tâm</span>
              <span className="text-sm font-black text-yellow-300">Ô Chữ Crossword 🧩</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Bí Kíp Ngữ Pháp: Hỏi Thời Khóa Biểu Trong Ngày
              </h2>
              <p className="text-xs text-slate-500">
                Hỏi hôm nay bạn học những môn gì: "What subjects do you have today?"
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-teal-50 border-2 border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wide">
                ❓ Câu Hỏi (Question)
              </span>
              <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                subjects (số nhiều)
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              What <span className="text-teal-700">subjects</span> do you have today?
            </div>
            <div className="text-xs text-slate-600">
              Nghĩa: <em>Hôm nay bạn có những môn học nào?</em>
            </div>
            <div className="text-[11px] text-teal-700 bg-white/80 p-2 rounded-xl border border-teal-100">
              🧠 <strong>Mẹo nhớ:</strong> Vì trường thường có nhiều môn học trong ngày, từ <strong>subjects</strong> luôn có đuôi <strong>-s</strong>!
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-800 uppercase tracking-wide">
                💬 Câu Trả Lời (Answer)
              </span>
              <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                I have + tên môn
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-indigo-700">I have</span> [English and maths].
            </div>
            <div className="text-xs text-slate-600">
              Nghĩa: <em>Tớ có môn Tiếng Anh và môn Toán.</em>
            </div>
            <div className="text-[11px] text-indigo-700 bg-white/80 p-2 rounded-xl border border-indigo-100">
              ⭐ Nối các môn học bằng từ <strong>and</strong> (và). Ví dụ: <em>I have Vietnamese, science and English.</em>
            </div>
          </div>
        </div>

        {showParentGuides && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs text-amber-900 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Cẩm Nang Đồng Hành Cùng Con Dành Cho Phụ Huynh:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Phát âm từ "maths":</strong> Âm /θ/ đặt lưỡi giữa 2 hàm răng và thổi luồng gió nhẹ, sau đó phát âm đuôi /s/. Không đọc thành "mát" cụt lủn.</li>
              <li><strong>Phát âm từ "science":</strong> Trọng âm rơi vào "sci-" (/saɪ/), đuôi "-ence" đọc là /əns/ với âm gió s nhẹ nhàng.</li>
              <li><strong>Phản xạ thực tế:</strong> Mỗi sáng trước khi con đi học, ba mẹ có thể hỏi con: <em>"What subjects do you have today?"</em> để con nhìn thời khóa biểu và đáp lại bằng tiếng Anh.</li>
            </ul>
          </div>
        )}
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 50 - 51) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 50 - Track 67' },
          { num: 2, label: '2. Listen, point & say', icon: '📖', desc: 'Trang 50 - Track 68' },
          { num: 3, label: '3. Let’s talk', icon: '🗣️', desc: 'Trang 50 - Thực hành' },
          { num: 4, label: '4. Listen & tick / cross', icon: '✍️', desc: 'Trang 51 - Track 69' },
          { num: 5, label: '5. Look, complete & read', icon: '📝', desc: 'Trang 51 - Điền từ' },
          { num: 6, label: '6. Crossword Puzzle', icon: '🧩', desc: 'Trang 51 - Ô chữ vui' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.num);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeSection === tab.num
                ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <div className="text-left">
              <div>{tab.label}</div>
              <div className={`text-[10px] ${activeSection === tab.num ? 'text-teal-200' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN & REPEAT (TRACK 67) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 text-xs font-black">
                  Hoạt động 1 • Trang 50 SGK
                </span>
                <span className="text-xs text-slate-500 font-bold">Track 67 (Audio chuẩn)</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, listen and repeat • Nhìn tranh, nghe và nhắc lại
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('a');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'a'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh A (Hỏi Giờ Vào Lớp)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('b');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh B (Hỏi Các Môn Học)
              </button>
            </div>
          </div>

          {/* Active Dialogue Scene */}
          {(() => {
            const scene = dialogueScenes[activeDialogueTab];
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-teal-800 uppercase tracking-wide">
                      {scene.badge}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{scene.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{scene.context}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white border border-teal-200 rounded-xl text-xs font-black text-teal-700 flex items-center gap-1 shadow-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{scene.clockDisplay}</span>
                    </span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        scene.lines.forEach((l, i) => {
                          setTimeout(() => {
                            setPlayingDialogueLine(i);
                            speakWord(l.en, speechRate);
                          }, i * 2600);
                        });
                        setTimeout(() => setPlayingDialogueLine(null), scene.lines.length * 2600 + 500);
                      }}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Nghe Toàn Bộ Đoạn</span>
                    </button>
                  </div>
                </div>

                {/* Dialog Cards */}
                <div className="space-y-3">
                  {scene.lines.map((line, idx) => {
                    const isPlaying = playingDialogueLine === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPlaying
                            ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-300/30'
                            : 'bg-white border-slate-200 hover:border-teal-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl p-1 bg-slate-100 rounded-2xl shadow-xs">
                            {line.avatar}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900">
                                {line.speaker}
                              </span>
                              <span className="text-[11px] text-slate-400 italic">
                                {line.soundDesc}
                              </span>
                            </div>
                            <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                              {line.en}
                            </div>
                            <div className="text-xs font-medium text-teal-700 mt-0.5">
                              {line.vi}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              sound.playClick();
                              setPlayingDialogueLine(idx);
                              speakWord(line.en, speechRate * 0.75);
                              setTimeout(() => setPlayingDialogueLine(null), 2500);
                            }}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                            title="Nghe tốc độ chậm"
                          >
                            🐢 Chậm
                          </button>
                          <button
                            onClick={() => {
                              sound.playClick();
                              setPlayingDialogueLine(idx);
                              speakWord(line.en, speechRate);
                              onAddStar(1);
                              setTimeout(() => setPlayingDialogueLine(null), 2000);
                            }}
                            className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Nghe Chuẩn</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT & SAY (TRACK 68) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 text-xs font-black">
              Hoạt động 2 • Trang 50 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen, point and say • Nghe, chỉ tranh và phát âm chuẩn
            </h3>
            <p className="text-xs text-slate-500">
              Bấm vào từng bìa sách môn học bên dưới để nghe cách phát âm từng môn và thực hành mẫu câu tương tác:
            </p>
          </div>

          {/* 4 Subject Book Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreSubjects.map(sub => {
              const isSelected = selectedSubId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSubId(sub.id);
                    speakWord(sub.name, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-md ring-2 ring-teal-500/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{sub.icon}</span>
                      <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-full ${sub.badgeBg}`}>
                        {sub.bookName}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg font-black text-slate-900">
                        {sub.name}
                      </div>
                      <div className="text-xs font-bold text-teal-700">
                        {sub.vi}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {sub.ipa} • <span className="font-sans text-amber-700 font-bold">{sub.reading}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {sub.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-700">
                      {isSelected ? '● Đang chọn' : 'Bấm chọn'}
                    </span>
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Live Sentence Builder Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-indigo-50 border-2 border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wide">
                🗣️ Thực Hành Mẫu Câu Với Môn Đang Chọn:
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-xl font-bold text-slate-700 border border-slate-200 shadow-xs">
                Môn: {curSub.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Câu hỏi (Question):</span>
                  <span className="text-base font-black text-slate-900">
                    What subjects do you have today?
                  </span>
                  <span className="text-xs text-teal-700 block">Hôm nay bạn có những môn học nào?</span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord('What subjects do you have today?', speechRate);
                  }}
                  className="p-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-xl"
                  title="Nghe câu hỏi"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border-2 border-teal-300 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-teal-600 block">Câu trả lời (Answer):</span>
                  <span className="text-base font-black text-teal-900">
                    I have <span className="underline decoration-teal-500 decoration-2">{curSub.name}</span>.
                  </span>
                  <span className="text-xs text-slate-600 block">Tớ có môn {curSub.vi}.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(`I have ${curSub.name}`, speechRate * 0.75);
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    🐢
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(`I have ${curSub.name}`, speechRate);
                      onAddStar(1);
                    }}
                    className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Đọc Mẫu</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Mẹo phát âm:</strong> {curSub.tip}</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 text-xs font-black">
              Hoạt động 3 • Trang 50 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s talk • Luyện nói phản xạ: Xếp sách vào cặp & hỏi đáp
            </h3>
            <p className="text-xs text-slate-500">
              Chọn 2 môn học mà bạn muốn mang đi học hôm nay, sau đó nghe và đóng vai hội thoại:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject Selector 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="text-xs font-black text-slate-700 block">
                1️⃣ Chọn Môn Học Thứ Nhất:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {coreSubjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick();
                      setTalkSubject1(s.name);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                      talkSubject1 === s.name
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="text-xs font-black text-slate-700 block">
                2️⃣ Chọn Môn Học Thứ Hai:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {coreSubjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick();
                      setTalkSubject2(s.name);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                      talkSubject2 === s.name
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Roleplay Dialogue Display */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                🎭 Đoạn Đối Thoại Của Hai Bạn Nhỏ:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord('What subjects do you have today?', speechRate);
                  setTimeout(() => {
                    speakWord(`I have ${talkSubject1} and ${talkSubject2}.`, speechRate);
                  }, 2200);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-1 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-slate-900" />
                <span>Nghe Mẫu Cả Đoạn</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Bạn A hỏi:</span>
                  <span className="text-base font-black text-slate-900">
                    What subjects do you have today?
                  </span>
                  <span className="text-xs text-amber-700 block">Hôm nay bạn học những môn nào?</span>
                </div>
                <button
                  onClick={() => speakWord('What subjects do you have today?', speechRate)}
                  className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Bạn B trả lời:</span>
                  <span className="text-base font-black text-teal-800">
                    I have <span className="text-teal-600 underline">{talkSubject1}</span> and{' '}
                    <span className="text-indigo-600 underline">{talkSubject2}</span>.
                  </span>
                  <span className="text-xs text-slate-600 block">
                    Tớ có môn {talkSubject1} và môn {talkSubject2}.
                  </span>
                </div>
                <button
                  onClick={() => speakWord(`I have ${talkSubject1} and ${talkSubject2}`, speechRate)}
                  className="p-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND TICK OR CROSS (TRACK 69) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 text-xs font-black">
                Hoạt động 4 • Trang 51 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 69 (Nghe & Điền ✓ hoặc ✗)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and tick or cross • Nghe và tích dấu ✓ hoặc đánh dấu ✗
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setTickCrossList(prev => prev.map(item => ({ ...item, userAnswer: null })));
                setTickCrossChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>

          {/* 4 Quiz Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tickCrossList.map(item => {
              const isAnswered = item.userAnswer !== null;
              const isCorrect = item.userAnswer === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                    tickCrossChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                        {item.id}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-black text-sm text-slate-800">
                          {item.bookTitle}
                        </div>
                        <div className="text-xs text-slate-500">{item.speaker}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(item.audioText, speechRate);
                      }}
                      className="px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Câu {item.id}</span>
                    </button>
                  </div>

                  {/* Choice Buttons: Tick (✓) or Cross (✗) */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      disabled={tickCrossChecked}
                      onClick={() => {
                        sound.playClick();
                        setTickCrossList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userAnswer: 'tick' } : i))
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all border ${
                        item.userAnswer === 'tick'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 border-slate-200'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Tick (✓)</span>
                    </button>

                    <button
                      disabled={tickCrossChecked}
                      onClick={() => {
                        sound.playClick();
                        setTickCrossList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userAnswer: 'cross' } : i))
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all border ${
                        item.userAnswer === 'cross'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200'
                      }`}
                    >
                      <span>✗</span>
                      <span>Cross (✗)</span>
                    </button>
                  </div>

                  {tickCrossChecked && (
                    <div
                      className={`text-xs p-2 rounded-xl font-medium ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Check Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              * Nghe kỹ bạn nhỏ có nhắc tới môn học tương ứng trong tranh không để chọn ✓ hoặc ✗.
            </div>

            <button
              onClick={() => {
                setTickCrossChecked(true);
                const correctCount = tickCrossList.filter(
                  i => i.userAnswer === i.correctAnswer
                ).length;
                if (correctCount === 4) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(4);
                } else if (correctCount > 0) {
                  sound.playCorrect();
                  onAddStar(correctCount);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm shadow-md transition-all self-end"
            >
              Kiểm Tra Kết Quả
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-teal-100 text-teal-800 text-xs font-black">
                Hoạt động 5 • Trang 51 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, complete and read • Quan sát tranh và hoàn thành câu
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setFillAnswers({ q1: '', q2: '', q3a: '', q3b: '', q4a: '', q4b: '', q4c: '' });
                setFillChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa Hết</span>
            </button>
          </div>

          {/* 4 Fill Questions */}
          <div className="space-y-4">
            {/* Question 1: Sách Tiếng Việt 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">
                  Câu 1 (Hình: Sách Tiếng Việt 4 📘)
                </span>
                <button
                  onClick={() => speakWord('What subjects do you have today? I have Vietnamese.', speechRate)}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
              <div className="text-sm font-black text-slate-800">
                A: What subjects do you have today?
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I have</span>
                <input
                  type="text"
                  placeholder="điền tên môn..."
                  value={fillAnswers.q1}
                  onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600"
                />
                <span>.</span>
                {fillChecked && (
                  <span className={`text-xs font-bold ${fillAnswers.q1.trim().toLowerCase() === 'vietnamese' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {fillAnswers.q1.trim().toLowerCase() === 'vietnamese' ? '✓ Chính xác (Vietnamese)' : '✗ Đáp án: Vietnamese'}
                  </span>
                )}
              </div>
            </div>

            {/* Question 2: Sách Toán 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">
                  Câu 2 (Hình: Sách Toán 4 📐)
                </span>
                <button
                  onClick={() => speakWord('What subjects do you have today? I have maths.', speechRate)}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
              <div className="text-sm font-black text-slate-800">
                A: What subjects do you have today?
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I</span>
                <input
                  type="text"
                  placeholder="điền động từ & môn..."
                  value={fillAnswers.q2}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600 min-w-[160px]"
                />
                <span>.</span>
                {fillChecked && (
                  <span className={`text-xs font-bold ${fillAnswers.q2.trim().toLowerCase() === 'have maths' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {fillAnswers.q2.trim().toLowerCase() === 'have maths' ? '✓ Chính xác (have maths)' : '✗ Đáp án: have maths'}
                  </span>
                )}
              </div>
            </div>

            {/* Question 3: Tiếng Anh 4 & Khoa học 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">
                  Câu 3 (Hình: Sách Tiếng Anh 4 & Khoa học 4 📕🔬)
                </span>
                <button
                  onClick={() => speakWord('What subjects do you have today? I have English and science.', speechRate)}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A:</span>
                <input
                  type="text"
                  placeholder="từ để hỏi..."
                  value={fillAnswers.q3a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600 min-w-[140px]"
                />
                <span>do you have today?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I have English and</span>
                <input
                  type="text"
                  placeholder="tên môn..."
                  value={fillAnswers.q3b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600"
                />
                <span>.</span>
                {fillChecked && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: What subjects / science
                  </span>
                )}
              </div>
            </div>

            {/* Question 4: Tiếng Anh 4 & Toán 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">
                  Câu 4 (Hình: Sách Tiếng Anh 4 & Toán 4 📕📐)
                </span>
                <button
                  onClick={() => speakWord('What subjects do you have today? I have English and maths.', speechRate)}
                  className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A: What subjects</span>
                <input
                  type="text"
                  placeholder="trợ từ & chủ ngữ..."
                  value={fillAnswers.q4a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600 min-w-[140px]"
                />
                <span>today?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I have</span>
                <input
                  type="text"
                  placeholder="môn 1..."
                  value={fillAnswers.q4b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4b: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600 w-28"
                />
                <span>and</span>
                <input
                  type="text"
                  placeholder="môn 2..."
                  value={fillAnswers.q4c}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4c: e.target.value })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-teal-800 focus:outline-teal-600 w-28"
                />
                <span>.</span>
                {fillChecked && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: do you have / English and maths
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setFillChecked(true);
                sound.playCorrect();
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra & Nhận Sao
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: CROSSWORD PUZZLE ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                Hoạt động 6 • Trang 51 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Do the crossword puzzle • Giải ô chữ thông minh
              </h3>
              <p className="text-xs text-slate-500">
                Tìm các từ vựng chỉ môn học tương ứng với 4 bức tranh SGK (Vertical: <strong>SUBJECTS</strong>):
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFillCorrectCrossword}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-xs"
              >
                Gợi Ý Toàn Bộ Đáp Án ✨
              </button>
            </div>
          </div>

          {/* Visual Clue Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl text-center">
              <span className="text-2xl block">🔬</span>
              <span className="text-xs font-black text-teal-800 block mt-1">1 Ngang: science</span>
              <span className="text-[10px] text-teal-600">Sách Khoa học 4</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <span className="text-2xl block">📘</span>
              <span className="text-xs font-black text-emerald-800 block mt-1">2 Ngang: Vietnamese</span>
              <span className="text-[10px] text-emerald-600">Sách Tiếng Việt 4</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center">
              <span className="text-2xl block">📐</span>
              <span className="text-xs font-black text-amber-800 block mt-1">3 Ngang: maths</span>
              <span className="text-[10px] text-amber-600">Sách Toán 4</span>
            </div>
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-center">
              <span className="text-2xl block">📕</span>
              <span className="text-xs font-black text-sky-800 block mt-1">4 Dọc: English</span>
              <span className="text-[10px] text-sky-600">Sách Tiếng Anh 4</span>
            </div>
          </div>

          {/* Crossword Interactive Canvas */}
          <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span>Bảng Ô Chữ Chính Xác Từng Ô (Nhập chữ cái tiếng Anh):</span>
              <span className="font-mono text-amber-300">Cột dọc trung tâm: S-U-B-J-E-C-T-S</span>
            </div>

            {/* Row 1: science */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-300">1. Hàng ngang: (7 chữ cái)</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['s', 'c', 'i', 'e', 'n', 'c', 'e'].map((letter, idx) => (
                  <input
                    key={`h1_${idx}`}
                    maxLength={1}
                    value={crosswordInputs[`h1_${idx}`] || ''}
                    onChange={e =>
                      setCrosswordInputs({
                        ...crosswordInputs,
                        [`h1_${idx}`]: e.target.value.toLowerCase()
                      })
                    }
                    className={`w-9 h-9 sm:w-10 sm:h-10 text-center font-mono font-black text-base sm:text-lg rounded-xl uppercase border-2 focus:outline-none transition-all ${
                      idx === 0
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-white border-slate-700 focus:border-teal-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Vietnamese */}
            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-emerald-300">2. Hàng ngang: (10 chữ cái)</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['v', 'i', 'e', 't', 'n', 'a', 'm', 'e', 's', 'e'].map((letter, idx) => (
                  <input
                    key={`h2_${idx}`}
                    maxLength={1}
                    value={crosswordInputs[`h2_${idx}`] || ''}
                    onChange={e =>
                      setCrosswordInputs({
                        ...crosswordInputs,
                        [`h2_${idx}`]: e.target.value.toLowerCase()
                      })
                    }
                    className={`w-9 h-9 sm:w-10 sm:h-10 text-center font-mono font-black text-base sm:text-lg rounded-xl uppercase border-2 focus:outline-none transition-all ${
                      idx === 7
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-white border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Row 3: maths */}
            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-amber-300">3. Hàng ngang: (5 chữ cái)</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['m', 'a', 't', 'h', 's'].map((letter, idx) => (
                  <input
                    key={`h3_${idx}`}
                    maxLength={1}
                    value={crosswordInputs[`h3_${idx}`] || ''}
                    onChange={e =>
                      setCrosswordInputs({
                        ...crosswordInputs,
                        [`h3_${idx}`]: e.target.value.toLowerCase()
                      })
                    }
                    className={`w-9 h-9 sm:w-10 sm:h-10 text-center font-mono font-black text-base sm:text-lg rounded-xl uppercase border-2 focus:outline-none transition-all ${
                      idx === 2
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 text-white border-slate-700 focus:border-amber-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Down 4: English */}
            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-sky-300">4. Hàng dọc: English (7 chữ cái)</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['e', 'n', 'g', 'l', 'i', 's', 'h'].map((letter, idx) => (
                  <input
                    key={`v4_${idx}`}
                    maxLength={1}
                    value={crosswordInputs[`v4_${idx}`] || ''}
                    onChange={e =>
                      setCrosswordInputs({
                        ...crosswordInputs,
                        [`v4_${idx}`]: e.target.value.toLowerCase()
                      })
                    }
                    className="w-9 h-9 sm:w-10 sm:h-10 text-center font-mono font-black text-base sm:text-lg rounded-xl uppercase border-2 bg-slate-800 text-white border-slate-700 focus:border-sky-400 focus:outline-none transition-all"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
