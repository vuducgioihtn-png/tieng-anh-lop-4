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
  Briefcase,
  UserCheck,
  Music,
  Users,
  ShieldCheck,
  Wheat,
  Clapperboard,
  Building2
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit12Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit12Lesson1Studio: React.FC<Unit12Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 11)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Linh',
      avatarA: '👧🏻',
      textA: 'How many people are there in your family?',
      ipaA: '/haʊ ˈmeni ˈpiːpl ɑː ðeər ɪn jɔː ˈfæməli/',
      readingA: 'Hao me-ni pi-pồ a đe-ơ in do phe-mơ-li?',
      meaningA: 'Gia đình bạn có bao nhiêu người thế?',
      speakerB: 'Ben',
      avatarB: '🧑‍🦰',
      textB: 'There are four.',
      ipaB: '/ðeər ɑː fɔː/',
      readingB: 'Đe-ơ a pho.',
      meaningB: 'Có bốn người.',
      context: 'Linh và Ben đang trò chuyện trong phòng khách về gia đình.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'This is my father.',
      ipaA: '/ðɪs ɪz maɪ ˈfɑːðə/',
      readingA: 'Đít-s iz mai pha-đờ.',
      meaningA: 'Đây là bố của tớ.',
      speakerB: 'Linh',
      avatarB: '👧🏻',
      textB: 'What does he do?',
      ipaB: '/wɒt dʌz hiː duː/',
      readingB: 'Oát đắt-z hi đu?',
      meaningB: 'Bác ấy làm nghề gì vậy?',
      speakerC: 'Ben',
      avatarC: '🧑‍🦰',
      textC: "He's a policeman.",
      ipaC: '/hiːz ə pəˈliːsmən/',
      readingC: 'Hi-z ơ pơ-lít-s-mừn.',
      meaningC: 'Bố tớ là cảnh sát.',
      context: 'Ben chỉ vào khung ảnh bố mặc cảnh phục oai nghiêm.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 12) - 4 JOBS
  // a: a farmer, b: a policeman, c: an office worker, d: an actor
  // =========================================================================
  const jobCards = [
    {
      id: 'job_a',
      key: 'a',
      title: 'a farmer',
      jobName: 'farmer',
      article: 'a',
      ipa: '/ə ˈfɑːmə/',
      reading: 'ơ pha-mờ',
      meaningVi: 'người nông dân',
      gender: 'he',
      pronoun: "He's",
      question: 'What does he do?',
      answer: "He's a farmer.",
      answerIpa: '/hiːz ə ˈfɑːmə/',
      answerReading: 'Hi-z ơ pha-mờ.',
      icon: '🌾',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      desc: 'Làm việc trên đồng ruộng, thu hoạch lúa thơm mùa vàng'
    },
    {
      id: 'job_b',
      key: 'b',
      title: 'a policeman',
      jobName: 'policeman',
      article: 'a',
      ipa: '/ə pəˈliːsmən/',
      reading: 'ơ pơ-lít-s-mừn',
      meaningVi: 'chú cảnh sát',
      gender: 'he',
      pronoun: "He's",
      question: 'What does he do?',
      answer: "He's a policeman.",
      answerIpa: '/hiːz ə pəˈliːsmən/',
      answerReading: 'Hi-z ơ pơ-lít-s-mừn.',
      icon: '👮‍♂️',
      badge: 'bg-blue-600',
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      desc: 'Giữ gìn an ninh trật tự, điều khiển giao thông an toàn'
    },
    {
      id: 'job_c',
      key: 'c',
      title: 'an office worker',
      jobName: 'office worker',
      article: 'an',
      ipa: '/ən ˈɒfɪs ˌwɜːkə/',
      reading: 'ân óp-phít uơ-kờ',
      meaningVi: 'nhân viên văn phòng',
      gender: 'she',
      pronoun: "She's",
      question: 'What does she do?',
      answer: "She's an office worker.",
      answerIpa: '/ʃiːz ən ˈɒfɪs ˌwɜːkə/',
      answerReading: 'Shi-z ân óp-phít uơ-kờ.',
      icon: '💼',
      badge: 'bg-purple-600',
      color: 'border-purple-300 bg-purple-50/50 text-purple-900',
      desc: 'Làm việc với máy tính tại văn phòng hiện đại (chú ý dùng AN)'
    },
    {
      id: 'job_d',
      key: 'd',
      title: 'an actor',
      jobName: 'actor',
      article: 'an',
      ipa: '/ən ˈæktə/',
      reading: 'ân éc-tờ',
      meaningVi: 'diễn viên nam',
      gender: 'he',
      pronoun: "He's",
      question: 'What does he do?',
      answer: "He's an actor.",
      answerIpa: '/hiːz ən ˈæktə/',
      answerReading: 'Hi-z ân éc-tờ.',
      icon: '🎭',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      desc: 'Biểu diễn trên sân khấu kịch và phim ảnh (chú ý dùng AN)'
    }
  ];

  const [activeJobCard, setActiveJobCard] = useState<string>('job_a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK OR CROSS (TRACK 13) - 4 ITEMS
  // =========================================================================
  interface TickCrossJobItem {
    id: number;
    title: string;
    imageJob: string;
    audioScript: string;
    ipa: string;
    reading: string;
    correctAnswer: 'tick' | 'cross';
    userChoice: 'tick' | 'cross' | null;
    explanation: string;
  }

  const [tickCrossList, setTickCrossList] = useState<TickCrossJobItem[]>([
    {
      id: 1,
      title: 'Câu 1: Cô giáo (Teacher)',
      imageJob: 'Cô giáo đang giảng bài bên bảng trắng',
      audioScript: 'What does she do? - She’s a teacher.',
      ipa: '/wɒt dʌz ʃiː duː? - ʃiːz ə ˈtiːtʃə/',
      reading: 'Oát đắt-z shi đu? - Shi-z ơ tí-chờ.',
      correctAnswer: 'tick',
      userChoice: null,
      explanation: 'Băng đọc đúng: "She’s a teacher" khớp hoàn toàn với bức tranh cô giáo dạy học -> Chọn TICK ✔️.'
    },
    {
      id: 2,
      title: 'Câu 2: Cảnh sát (Policeman)',
      imageJob: 'Chú cảnh sát mặc quân phục bên xe cảnh sát',
      audioScript: 'What does he do? - He’s a worker.',
      ipa: '/wɒt dʌz hiː duː? - hiːz ə ˈwɜːkə/',
      reading: 'Oát đắt-z hi đu? - Hi-z ơ uơ-kờ.',
      correctAnswer: 'cross',
      userChoice: null,
      explanation: 'Băng đọc "He’s a worker" trong khi tranh vẽ chú cảnh sát ("policeman") -> Không khớp, chọn CROSS ❌.'
    },
    {
      id: 3,
      title: 'Câu 3: Nhân viên văn phòng (Office worker)',
      imageJob: 'Cô nhân viên ngồi làm việc trước máy tính',
      audioScript: 'What does she do? - She’s an office worker.',
      ipa: '/wɒt dʌz ʃiː duː? - ʃiːz ən ˈɒfɪs ˌwɜːkə/',
      reading: 'Oát đắt-z shi đu? - Shi-z ân óp-phít uơ-kờ.',
      correctAnswer: 'tick',
      userChoice: null,
      explanation: 'Băng đọc: "She’s an office worker" trùng khớp tranh nhân viên văn phòng -> Chọn TICK ✔️.'
    },
    {
      id: 4,
      title: 'Câu 4: Diễn viên (Actor)',
      imageJob: 'Người đàn ông biểu diễn kịch trên sân khấu',
      audioScript: 'What does he do? - He’s an actor.',
      ipa: '/wɒt dʌz hiː duː? - hiːz ən ˈæktə/',
      reading: 'Oát đắt-z hi đu? - Hi-z ân éc-tờ.',
      correctAnswer: 'tick',
      userChoice: null,
      explanation: 'Băng đọc: "He’s an actor" trùng khớp tranh nam diễn viên kịch -> Chọn TICK ✔️.'
    }
  ]);
  const [tickCrossSubmitted, setTickCrossSubmitted] = useState<boolean>(false);

  const handleSelectTickCross = (id: number, val: 'tick' | 'cross') => {
    sound.playClick();
    setTickCrossList(prev => prev.map(item => (item.id === id ? { ...item, userChoice: val } : item)));
  };

  const handleCheckTickCross = () => {
    const allDone = tickCrossList.every(i => i.userChoice !== null);
    if (!allDone) {
      alert('Em hãy chọn ✔️ hoặc ❌ cho cả 4 câu trước nhé!');
      return;
    }
    const correctCount = tickCrossList.filter(i => i.userChoice === i.correctAnswer).length;
    setTickCrossSubmitted(true);
    if (correctCount === 4) {
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      sound.playCorrect();
      onAddStar(correctCount);
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ (4 EXERCISES)
  // =========================================================================
  const [fillInputs, setFillInputs] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3_do: '',
    q3_job: '',
    q4_what: '',
    q4_ans: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  const handleCheckFill = () => {
    setFillChecked(true);
    sound.playVictory();
    onAddStar(5);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 14) - "MY LOVELY FAMILY"
  // =========================================================================
  const songVerses = [
    {
      title: 'Khổ 1: Gia đình bốn người của tớ',
      lines: [
        { en: 'There are four people in my family.', ipa: '/ðeər ɑː fɔː ˈpiːpl ɪn maɪ ˈfæməli/', vi: 'Có 4 người trong gia đình tớ.' },
        { en: 'My father is a farmer.', ipa: '/maɪ ˈfɑːðər ɪz ə ˈfɑːmə/', vi: 'Bố tớ là một người nông dân.' },
        { en: 'My mother is a teacher.', ipa: '/maɪ ˈmʌðər ɪz ə ˈtiːtʃə/', vi: 'Mẹ tớ là một cô giáo.' },
        { en: 'My brother and I are pupils.', ipa: '/maɪ ˈbrʌðər ænd aɪ ɑː ˈpjuːplz/', vi: 'Anh trai và tớ đều là học sinh.' }
      ]
    },
    {
      title: 'Khổ 2: Gia đình bốn người hạnh phúc',
      lines: [
        { en: 'There are four people in my family.', ipa: '/ðeər ɑː fɔː ˈpiːpl ɪn maɪ ˈfæməli/', vi: 'Có 4 người trong gia đình tớ.' },
        { en: 'My father is a worker.', ipa: '/maɪ ˈfɑːðər ɪz ə ˈwɜːkə/', vi: 'Bố tớ là một người công nhân.' },
        { en: 'My mother is a doctor.', ipa: '/maɪ ˈmʌðər ɪz ə ˈdɒktə/', vi: 'Mẹ tớ là một bác sĩ.' },
        { en: 'My sister and I are pupils.', ipa: '/maɪ ˈsɪstər ænd aɪ ɑː ˈpjuːplz/', vi: 'Chị gái và tớ đều là học sinh.' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Grammar Spotlight */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cấu Trúc Trọng Tâm Unit 12 · Tiết 1
          </span>
          <span className="text-xs text-sky-100 font-bold">Trang 12 - 13 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Hỏi Và Trả Lời Về Nghề Nghiệp (What does he / she do?)
        </h2>

        {/* Rule box for A vs AN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-xs font-black text-yellow-300 uppercase tracking-wider block mb-1">
              1. DÙNG MẠO TỪ &quot;AN&quot; (Trước 5 nguyên âm U-E-O-A-I)
            </span>
            <p className="text-sm font-bold">
              • an <span className="underline text-yellow-300">a</span>ctor (diễn viên nam)
            </p>
            <p className="text-sm font-bold">
              • an <span className="underline text-yellow-300">o</span>ffice worker (nhân viên văn phòng)
            </p>
            <p className="text-xs text-sky-200 mt-1 italic">
              💡 Mẹo nhớ: Nguyên âm &quot;Uể Oải&quot; (U-E-O-A-I) luôn cần mạo từ &quot;AN&quot;!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-xs font-black text-yellow-300 uppercase tracking-wider block mb-1">
              2. DÙNG MẠO TỪ &quot;A&quot; (Trước các phụ âm còn lại)
            </span>
            <p className="text-sm font-bold">• a farmer (nông dân)</p>
            <p className="text-sm font-bold">• a policeman (cảnh sát)</p>
            <p className="text-sm font-bold">• a teacher (giáo viên), a worker (công nhân)</p>
            <p className="text-xs text-sky-200 mt-1 italic">
              Cấu trúc: What does he/she do? - He&apos;s / She&apos;s a / an...
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧' },
          { id: 2, label: '2. Listen, point & say', icon: '🗣️' },
          { id: 3, label: "3. Let's talk", icon: '💬' },
          { id: 4, label: '4. Listen & tick/cross', icon: '✔️' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: "6. Let's sing", icon: '🎵' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-sky-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 11) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-600 text-white">
                  Hoạt Động 1 · Trang 12
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 11 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát tranh và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Linh: How many people are there in your family? Ben: There are four. Ben: This is my father. Linh: What does he do? Ben: He is a policeman.';
                speakWord(fullText, speechRate);
              }}
              className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-sky-700" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step A */}
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-sky-300 transition-all space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-black text-xs">
                  Tranh a
                </span>
                <span className="text-xs text-slate-500 font-medium">Hỏi số lượng thành viên</span>
              </div>

              {/* Speaker A */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-700 flex items-center gap-1">
                    <span>👧🏻</span> Linh:
                  </span>
                  <button
                    onClick={() => speakWord(dialogSteps[0].textA, speechRate)}
                    className="p-1 text-slate-400 hover:text-sky-600 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                  {dialogSteps[0].textA}
                </p>
                <p className="text-[11px] font-mono text-sky-700 font-bold">
                  🗣️ {dialogSteps[0].ipaA}
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold">
                  📖 Gợi ý đọc: &quot;{dialogSteps[0].readingA}&quot;
                </p>
                <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                  {dialogSteps[0].meaningA}
                </p>
              </div>

              {/* Speaker B */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-sky-800 flex items-center gap-1">
                    <span>🧑‍🦰</span> Ben:
                  </span>
                  <button
                    onClick={() => speakWord(dialogSteps[0].textB, speechRate)}
                    className="p-1 text-slate-400 hover:text-sky-700 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-bold text-sky-950 text-sm md:text-base leading-snug">
                  {dialogSteps[0].textB}
                </p>
                <p className="text-[11px] font-mono text-sky-700 font-bold">
                  🗣️ {dialogSteps[0].ipaB}
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold">
                  📖 Gợi ý đọc: &quot;{dialogSteps[0].readingB}&quot;
                </p>
                <p className="text-xs text-sky-800/80 italic pt-1 border-t border-sky-200">
                  {dialogSteps[0].meaningB}
                </p>
              </div>
            </div>

            {/* Step B */}
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-sky-300 transition-all space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-black text-xs">
                  Tranh b
                </span>
                <span className="text-xs text-slate-500 font-medium">Hỏi nghề nghiệp của bố</span>
              </div>

              {/* B1: This is my father */}
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
                <span className="font-extrabold text-xs text-sky-800">🧑‍🦰 Ben:</span>
                <p className="font-bold text-slate-900 text-sm">{dialogSteps[1].textA}</p>
                <p className="text-[11px] text-indigo-700 font-semibold">
                  📖 {dialogSteps[1].readingA}
                </p>
              </div>

              {/* B2: What does he do? */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-700">👧🏻 Linh:</span>
                  <button
                    onClick={() => speakWord(dialogSteps[1].textB, speechRate)}
                    className="p-1 text-slate-400 hover:text-sky-600 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-black text-slate-900 text-sm md:text-base">
                  &quot;{dialogSteps[1].textB}&quot;
                </p>
                <p className="text-[11px] font-mono text-sky-700 font-bold">
                  🗣️ {dialogSteps[1].ipaB}
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold">
                  📖 Gợi ý đọc: {dialogSteps[1].readingB}
                </p>
              </div>

              {/* B3: He's a policeman */}
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-blue-800">🧑‍🦰 Ben:</span>
                  <button
                    onClick={() => speakWord(dialogSteps[1].textC || "He's a policeman.", speechRate)}
                    className="p-1 text-slate-400 hover:text-blue-700 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-black text-blue-950 text-sm md:text-base">
                  &quot;{dialogSteps[1].textC}&quot;
                </p>
                <p className="text-[11px] font-mono text-blue-700 font-bold">
                  🗣️ {dialogSteps[1].ipaC}
                </p>
                <p className="text-[11px] text-indigo-700 font-semibold">
                  📖 Gợi ý đọc: {dialogSteps[1].readingC}
                </p>
                <p className="text-xs text-blue-800 italic pt-1 border-t border-blue-100">
                  {dialogSteps[1].meaningC}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 12) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-600 text-white">
                  Hoạt Động 2 · Trang 12
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 12 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Chỉ tranh và luyện nói nghề nghiệp)
              </h3>
            </div>
            <div className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
              Cấu trúc: What does he/she do? - He&apos;s / She&apos;s a / an...
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobCards.map(job => {
              const isActive = activeJobCard === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveJobCard(job.id);
                    speakWord(`${job.question} ${job.answer}`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-sky-500 bg-sky-50/60 shadow-md ring-2 ring-sky-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                        {job.key}
                      </span>
                      <span className="text-3xl">{job.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {job.title}
                    </h4>

                    {/* IPA + Reading */}
                    <p className="text-[11px] font-mono text-sky-700 font-bold mb-0.5">
                      🗣️ {job.ipa}
                    </p>
                    <p className="text-[11px] text-indigo-700 font-semibold mb-2">
                      📖 {job.reading}
                    </p>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {job.meaningVi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-500 italic block">{job.desc}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(`${job.question} ${job.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Luyện nói &amp; Nghe
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Roleplay Output */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            {(() => {
              const cur = jobCards.find(c => c.id === activeJobCard);
              if (!cur) return null;
              return (
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cặp câu hỏi và trả lời hoàn chỉnh ({cur.key}):
                  </span>
                  <p className="text-base font-extrabold text-slate-800">
                    A: {cur.question} ➔ B:{' '}
                    <span className="text-sky-700 underline font-black">{cur.answer}</span>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Phát âm: &quot;Oát đắt-z {cur.gender} đu?&quot; ➔ &quot;{cur.answerReading}&quot;)
                  </p>
                </div>
              );
            })()}
            <button
              onClick={() => {
                const cur = jobCards.find(c => c.id === activeJobCard);
                if (cur) speakWord(`${cur.question} ${cur.answer}`, speechRate);
              }}
              className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <Volume2 className="w-4 h-4" /> Phát âm mẫu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND TICK OR CROSS (TRACK 13) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-600 text-white">
                  Hoạt Động 4 · Trang 13
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 13 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick or cross ✔️ ❌ (Nghe và đánh dấu Đúng / Sai)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckTickCross}
                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra đáp án
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setTickCrossList(prev => prev.map(i => ({ ...i, userChoice: null })));
                  setTickCrossSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickCrossList.map(item => {
              const isCorrect = item.userChoice === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    tickCrossSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-800">{item.title}</span>
                    <button
                      onClick={() => speakWord(item.audioScript, speechRate)}
                      className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-700" /> Nghe audio
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 italic">Tranh: {item.imageJob}</p>

                  {/* Tick / Cross buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleSelectTickCross(item.id, 'tick')}
                      className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition ${
                        item.userChoice === 'tick'
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">✔️</span>
                      <span>Khớp (TICK)</span>
                    </button>

                    <button
                      onClick={() => handleSelectTickCross(item.id, 'cross')}
                      className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition ${
                        item.userChoice === 'cross'
                          ? 'border-rose-500 bg-rose-100 text-rose-950 font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">❌</span>
                      <span>Không khớp (CROSS)</span>
                    </button>
                  </div>

                  {tickCrossSubmitted && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-800">
                        Đáp án đúng: {item.correctAnswer === 'tick' ? '✔️ TICK' : '❌ CROSS'}
                      </p>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LET'S SING: "MY LOVELY FAMILY" (TRACK 14) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 13
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Let&apos;s sing: &quot;My lovely family&quot; 🎵 (Gia đình thân yêu của em)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Cùng hát vang bài hát về các nghề nghiệp: farmer, teacher, worker, doctor và học sinh pupils!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-2 border-sky-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">👨‍👩‍👧‍👦 🎶</div>

            {songVerses.map((verse, vIdx) => (
              <div key={vIdx} className="space-y-3 text-left bg-white/70 p-4 rounded-2xl border border-sky-100">
                <span className="text-xs font-black text-sky-700 uppercase tracking-wider block">
                  {verse.title}
                </span>
                {verse.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-sky-600 transition">
                    <p className="font-extrabold text-sm md:text-base text-slate-900">{line.en}</p>
                    <p className="text-[11px] font-mono text-sky-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-slate-500 italic">{line.vi}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => {
                const song =
                  'There are four people in my family. My father is a farmer. My mother is a teacher. My brother and I are pupils. There are four people in my family. My father is a worker. My mother is a doctor. My sister and I are pupils.';
                speakWord(song, speechRate * 0.95);
                onAddStar(3);
              }}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát Karaoke &quot;My lovely family&quot; 🎤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
