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
  Music,
  PenTool,
  Copy,
  Table,
  Camera,
  Flame,
  Tent,
  Smile,
  CheckSquare,
  Sparkle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit20Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit20Lesson3Studio: React.FC<Unit20Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 99) - WORD STRESS ON VERBS
  // =========================================================================
  const phonicsItems = [
    {
      word: "'visit",
      plainWord: 'visit',
      stressedSyllable: 'VIS',
      unstressedSyllable: 'it',
      ipa: "/ˈvɪzɪt/",
      reading: "VÍT-zịt",
      sentenceEn: "They 'visit their grandparents in summer.",
      sentenceVi: "Họ đến thăm ông bà vào mùa hè.",
      icon: "👵👴",
      note: "Trọng âm rơi vào âm tiết đầu tiên: 'VIS. Âm 'it' đọc nhẹ lướt nhanh."
    },
    {
      word: "'email",
      plainWord: 'email',
      stressedSyllable: 'E',
      unstressedSyllable: 'mail',
      ipa: "/ˈiːmeɪl/",
      reading: "I-mêu",
      sentenceEn: "We 'email our friends at the weekend.",
      sentenceVi: "Chúng tớ gửi thư điện tử cho bạn bè vào dịp cuối tuần.",
      icon: "📧",
      note: "Trọng âm rơi vào âm tiết đầu tiên: 'E (ngân dài âm /iː/). Âm 'mail' hạ nhẹ giọng."
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 100)
  // =========================================================================
  interface CircleQuestion {
    id: number;
    sentenceStart: string;
    sentenceEnd: string;
    options: { key: 'a' | 'b' | 'c'; text: string; icon: string }[];
    correctKey: 'a' | 'b' | 'c';
    audioScript: string;
    explanation: string;
  }

  const circleQuestions: CircleQuestion[] = [
    {
      id: 1,
      sentenceStart: '1. We',
      sentenceEnd: 'our grandparents at the weekend.',
      options: [
        { key: 'a', text: 'visit', icon: '👵' },
        { key: 'b', text: 'email', icon: '📧' },
        { key: 'c', text: 'welcome', icon: '👋' }
      ],
      correctKey: 'a',
      audioScript: '1. We visit our grandparents at the weekend.',
      explanation: 'Băng âm thanh đọc: "We visit our grandparents at the weekend", chọn đáp án a: visit.'
    },
    {
      id: 2,
      sentenceStart: '2. Linh and Nam',
      sentenceEnd: 'their friends on Sundays.',
      options: [
        { key: 'a', text: 'email', icon: '📧' },
        { key: 'b', text: 'welcome', icon: '👋' },
        { key: 'c', text: 'visit', icon: '👵' }
      ],
      correctKey: 'a',
      audioScript: '2. Linh and Nam email their friends on Sundays.',
      explanation: 'Băng âm thanh đọc: "Linh and Nam email their friends on Sundays", chọn đáp án a: email.'
    }
  ];

  const [circlePicks, setCirclePicks] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null
  });
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleSelectCircle = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setCirclePicks(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct2 = () => {
    const isCompleted = Object.values(circlePicks).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct2Submitted(true);
    let correct = 0;
    circleQuestions.forEach(q => {
      if (circlePicks[q.id] === q.correctKey) correct++;
    });

    if (correct === 2) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct2 = () => {
    sound.playClick();
    setCirclePicks({ 1: null, 2: null });
    setAct2Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 101)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1: Thăm Ông Bà (Visit Grandparents) 👵👴',
      lines: [
        { en: 'Visit, visit, visit.', vi: 'Thăm viếng, thăm viếng, thăm viếng.' },
        { en: 'Grandparents, grandparents.', vi: 'Ông bà yêu quý, ông bà kính yêu.' },
        { en: "Let's visit our grandparents.", vi: 'Hãy cùng đến thăm ông bà nào.' },
        { en: "Let's visit our grandparents in the summer.", vi: 'Hãy đến thăm ông bà vào mùa hè nhé.' }
      ],
      audioText: "Visit, visit, visit. Grandparents, grandparents. Let's visit our grandparents. Let's visit our grandparents in the summer."
    },
    {
      title: 'Khổ 2: Gửi Email Bạn Bè (Email Friends) 📧',
      lines: [
        { en: 'Email, email, email.', vi: 'Gửi thư điện tử, gửi email.' },
        { en: 'Friends, friends, friends.', vi: 'Bạn bè thân yêu, bạn bè.' },
        { en: "Let's email our friends.", vi: 'Hãy gửi email cho bạn bè nào.' },
        { en: "Let's email our friends at the weekend.", vi: 'Hãy gửi email cho bạn bè vào cuối tuần nhé.' }
      ],
      audioText: "Email, email, email. Friends, friends, friends. Let's email our friends. Let's email our friends at the weekend."
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND TICK TRUE OR FALSE
  // =========================================================================
  const readingPassage = {
    title: 'A Fun Sunday at the Campsite (Chủ Nhật vui vẻ tại khu cắm trại)',
    content:
      "My name is Minh. Today is Sunday. My friends and I are at the campsite. Mai is telling a story. Ben and Bill are playing card games. Mary and Lucy are singing songs and dancing around the campfire. Some other friends are playing tug of war. I am taking a photo. We are having a lot of fun.",
    contentVi:
      "Tớ tên là Minh. Hôm nay là Chủ Nhật. Các bạn và tớ đang ở khu cắm trại. Mai đang kể một câu chuyện. Ben và Bill đang chơi trò chơi thẻ bài. Mary và Lucy đang hát các bài hát và nhảy múa quanh đống lửa trại. Một số bạn khác đang chơi trò kéo co. Tớ thì đang chụp ảnh kỷ niệm. Chúng tớ đang có khoảng thời gian vô cùng vui vẻ."
  };

  interface ReadingCheckQuestion {
    id: number;
    statement: string;
    statementVi: string;
    correctAnswer: 'True' | 'False';
    explanation: string;
  }

  const readingChecks: ReadingCheckQuestion[] = [
    {
      id: 1,
      statement: '1. Minh and his friends are at the campsite.',
      statementVi: 'Minh và bạn bè đang ở khu cắm trại.',
      correctAnswer: 'True',
      explanation: 'Đúng theo bài: "My friends and I are at the campsite."'
    },
    {
      id: 2,
      statement: '2. Mary and Lucy are playing card games.',
      statementVi: 'Mary và Lucy đang chơi trò chơi thẻ bài.',
      correctAnswer: 'False',
      explanation: 'Sai! Ben và Bill mới đang chơi thẻ bài ("Ben and Bill are playing card games"). Còn Mary và Lucy đang hát và múa quanh lửa trại!'
    },
    {
      id: 3,
      statement: '3. Some friends are playing tug of war.',
      statementVi: 'Một số bạn đang chơi kéo co.',
      correctAnswer: 'True',
      explanation: 'Đúng theo bài: "Some other friends are playing tug of war."'
    },
    {
      id: 4,
      statement: '4. Minh is taking a photo.',
      statementVi: 'Minh đang chụp ảnh.',
      correctAnswer: 'True',
      explanation: 'Đúng theo bài: "I am taking a photo."'
    }
  ];

  const [readingAnswers, setReadingAnswers] = useState<Record<number, 'True' | 'False' | null>>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [readingSubmitted, setReadingSubmitted] = useState<boolean>(false);

  const handleSelectReading = (qId: number, val: 'True' | 'False') => {
    sound.playClick();
    setReadingAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleCheckReading = () => {
    const isCompleted = Object.values(readingAnswers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setReadingSubmitted(true);
    let correct = 0;
    readingChecks.forEach(q => {
      if (readingAnswers[q.id] === q.correctAnswer) correct++;
    });

    if (correct === 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const sampleWriting = {
    title: 'At the campsite',
    content:
      "Today is Sunday. We are at the campsite. Our teacher is putting up a tent. The boys are playing tug of war and building a campfire. The girls are singing songs and dancing around the campfire. I am taking a photo. We are having a wonderful time!",
    contentVi:
      "Hôm nay là Chủ Nhật. Chúng em đang ở khu cắm trại. Thầy giáo đang dựng lều. Các bạn nam đang chơi kéo co và nhóm lửa trại. Các bạn nữ đang hát và nhảy múa quanh đống lửa. Em đang chụp ảnh kỷ niệm. Chúng em có khoảng thời gian thật tuyệt vời!"
  };

  const [userEssay, setUserEssay] = useState<string>(
    "Today is Sunday. We are at the campsite. Our teacher is ... The boys are ... The girls are ... I am ... We are very happy!"
  );
  const [essayAwarded, setEssayAwarded] = useState<boolean>(false);

  const handleApplyTemplate = (type: 'fun' | 'active' | 'musical') => {
    sound.playClick();
    if (type === 'fun') {
      setUserEssay(
        "Today is Sunday. We are at the campsite. Our teacher is putting up a tent. The boys are telling stories. The girls are building a campfire. I am taking photos. We are having a lot of fun!"
      );
    } else if (type === 'active') {
      setUserEssay(
        "Today is Sunday. We are at the campsite. Our teacher is preparing food. The boys are playing tug of war. The girls are playing card games. I am helping my friends. It is exciting!"
      );
    } else {
      setUserEssay(
        "Today is Sunday. We are at the campsite. Our teacher is telling a story. The boys and girls are singing songs and dancing around the campfire. I am recording a video. We love summer camp!"
      );
    }
  };

  const handleEvaluateEssay = () => {
    if (userEssay.length < 30) {
      sound.playWarning();
      return;
    }
    sound.playComplete();
    setEssayAwarded(true);
    onAddStar(5);
    confetti({ particleCount: 70, spread: 60 });
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT - OUR SUMMER CAMP ACTIVITIES
  // =========================================================================
  const projectItems = [
    {
      id: 'p1',
      title: 'Nhảy múa quanh lửa trại 🔥',
      sentence: "They're dancing around the campfire.",
      sentenceVi: 'Họ đang nhảy múa vòng quanh đống lửa trại.',
      icon: '💃🔥',
      bg: 'from-orange-600 to-rose-600'
    },
    {
      id: 'p2',
      title: 'Kéo co sôi nổi 🪢',
      sentence: "They're playing tug of war.",
      sentenceVi: 'Họ đang chơi kéo co rất hăng say.',
      icon: '🪢',
      bg: 'from-amber-600 to-orange-700'
    },
    {
      id: 'p3',
      title: 'Hát vang bài ca trại hè 🎶',
      sentence: "They're singing songs.",
      sentenceVi: 'Họ đang cùng nhau cất cao tiếng hát.',
      icon: '🎶',
      bg: 'from-teal-600 to-emerald-700'
    }
  ];

  const [activeProject, setActiveProject] = useState(projectItems[0]);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <span>🏕️ Unit 20 · Lesson 3</span>
              <span>· Trang 68 - 69 SGK</span>
            </span>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>⬅️ Tiết 1</span>
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>⬅️ Tiết 2</span>
                </button>
              )}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>Trọng Âm Động Từ, Bài Vè & Dự Án Trại Hè</span>
            <span className="text-3xl">⛺🔥📖🎨</span>
          </h2>
          <p className="text-rose-100 text-sm md:text-base max-w-3xl leading-relaxed">
            Luyện nhấn trọng âm chuẩn các động từ hai âm tiết <strong>&apos;visit</strong> và <strong>&apos;email</strong> (Track 99), 
            vỗ tay hát vè sôi động (Track 101), đọc hiểu ngày Chủ Nhật ở trại hè, viết nhật ký cắm trại và thuyết trình dự án trại hè.
          </p>

          {/* Activity Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: '1. Ngữ Âm & Trọng Âm', icon: '🎯' },
              { id: 2, label: '2. Nghe & Khoanh Tròn', icon: '📝' },
              { id: 3, label: '3. Bài Vè Vỗ Tay Chant', icon: '👏' },
              { id: 4, label: '4. Đọc Hiểu Trại Hè', icon: '📖' },
              { id: 5, label: '5. Viết Về Buổi Cắm Trại', icon: '✍️' },
              { id: 6, label: '6. Dự Án Poster Trại Hè', icon: '🎨' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSection(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === tab.id
                    ? 'bg-white text-orange-950 shadow-md scale-105'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: LISTEN AND REPEAT (TRACK 99)
      ===================================================================== */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 99
                </span>
                <span className="text-xs text-slate-500">Trang 68 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and repeat: Trọng âm rơi vào âm tiết thứ nhất của động từ hai âm tiết
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                speakWord(
                  "visit. They visit their grandparents in summer. email. We email our friends at the weekend.",
                  speechRate
                );
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold text-xs shadow-md hover:from-rose-700 hover:to-orange-700 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Âm Thanh Mẫu (Track 99)</span>
            </button>
          </div>

          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1">
            <span className="font-black flex items-center gap-1.5 text-rose-900">
              <Lightbulb className="w-4 h-4" /> Quy tắc nhấn trọng âm từ:
            </span>
            <p>
              Hai từ <strong>&apos;visit</strong> và <strong>&apos;email</strong> đều có trọng âm rơi vào <span className="font-bold underline text-rose-900">âm tiết thứ nhất</span>. Khi phát âm, ta đọc to, rõ, dứt khoát ở âm đầu và hạ nhẹ giọng ở âm sau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phonicsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 hover:border-rose-400 hover:shadow-md transition space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-3xl">{item.icon}</span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.plainWord, speechRate);
                    }}
                    className="p-2 rounded-xl bg-rose-100 text-rose-800 hover:bg-rose-200 transition"
                    title="Nghe từ này"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1 text-3xl font-black text-slate-900">
                    <span className="text-rose-700 underline decoration-rose-500 decoration-4">
                      &apos;{item.stressedSyllable}
                    </span>
                    <span className="text-slate-400 font-medium">-{item.unstressedSyllable}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">{item.ipa}</p>
                  <p className="text-xs text-rose-800 bg-rose-50 font-bold px-2 py-0.5 rounded-md inline-block">
                    🗣️ {item.reading}
                  </p>
                </div>

                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                  💡 {item.note}
                </p>

                <div className="bg-white p-3.5 rounded-xl border border-rose-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-rose-800 uppercase">Câu mẫu:</span>
                    <button
                      onClick={() => speakWord(item.sentenceEn, speechRate)}
                      className="p-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-black text-slate-900">{item.sentenceEn}</p>
                  <p className="text-xs text-slate-500 italic">{item.sentenceVi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: LISTEN AND CIRCLE (TRACK 100)
      ===================================================================== */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Track 100
                </span>
                <span className="text-xs text-slate-500">Trang 68 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and circle (Lắng nghe và khoanh tròn từ đúng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct2}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct2}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {circleQuestions.map(q => {
              const userPick = circlePicks[q.id];
              const isSubmitted = act2Submitted;
              const isCorrect = userPick === q.correctKey;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50/80 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                    <span className="font-black text-slate-900 text-base">
                      {q.sentenceStart} <span className="underline font-mono text-orange-700">______</span> {q.sentenceEnd}
                    </span>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.audioScript, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Câu #{q.id}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    {q.options.map(opt => {
                      const isChosen = userPick === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-orange-300';
                      if (isChosen) {
                        btnStyle = 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200 font-bold';
                      }
                      if (isSubmitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(q.id, opt.key)}
                          className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-black">{opt.key}.</span>
                            <span className="text-xl">{opt.icon}</span>
                            <span className="font-bold">{opt.text}</span>
                          </div>
                          {isChosen && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700">
                      <p className="font-bold">{isCorrect ? '✅ Rất chính xác!' : '❌ Chưa chính xác!'}</p>
                      <p className="text-slate-600 mt-0.5">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: LET'S CHANT (TRACK 101)
      ===================================================================== */}
      {activeSection === 3 && (
        <div className="bg-gradient-to-r from-orange-700 via-rose-700 to-amber-800 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Hoạt Động 3 · Track 101
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Let&apos;s Chant: Bài Vè Vỗ Tay Nhịp Điệu Mùa Hè 👏
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                speakWord(
                  "Visit, visit, visit. Grandparents, grandparents. Let's visit our grandparents. Let's visit our grandparents in the summer. Email, email, email. Friends, friends, friends. Let's email our friends. Let's email our friends at the weekend.",
                  speechRate
                );
              }}
              className="px-6 py-2.5 rounded-2xl bg-white text-orange-950 font-black text-xs hover:bg-orange-100 transition shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Hát Toàn Bài Vè</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chantStanzas.map((st, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <h4 className="font-black text-lg text-yellow-300">{st.title}</h4>
                  <button
                    onClick={() => speakWord(st.audioText, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {st.lines.map((ln, lIdx) => (
                    <div key={lIdx}>
                      <p className="font-bold text-white text-sm">{ln.en}</p>
                      <p className="text-orange-100/80 italic">{ln.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: READ AND TICK TRUE OR FALSE
      ===================================================================== */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Reading
                </span>
                <span className="text-xs text-slate-500">Trang 69 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Đọc đoạn văn của bạn Minh và chọn Đúng (True) / Sai (False)
              </h3>
            </div>

            <button
              onClick={handleCheckReading}
              className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Kiểm tra đáp án
            </button>
          </div>

          {/* Reading Paragraph */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-orange-950 text-base">{readingPassage.title}</h4>
              <button
                onClick={() => speakWord(readingPassage.content, speechRate)}
                className="px-3 py-1 rounded-xl bg-orange-200 text-orange-900 text-xs font-bold transition flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Đọc bài
              </button>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {readingPassage.content}
            </p>
            <p className="text-xs text-slate-600 italic bg-white/70 p-3 rounded-xl border border-orange-100">
              👉 Bản dịch: {readingPassage.contentVi}
            </p>
          </div>

          {/* 4 True/False Items */}
          <div className="space-y-3">
            {readingChecks.map(item => {
              const userAns = readingAnswers[item.id];
              const isSubmitted = readingSubmitted;
              const isCorrect = userAns === item.correctAnswer;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm text-slate-900">{item.statement}</p>
                      <p className="text-xs text-slate-500 italic">{item.statementVi}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectReading(item.id, 'True')}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                          userAns === 'True'
                            ? 'bg-orange-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                        }`}
                      >
                        True (Đúng)
                      </button>
                      <button
                        onClick={() => handleSelectReading(item.id, 'False')}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                          userAns === 'False'
                            ? 'bg-rose-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300'
                        }`}
                      >
                        False (Sai)
                      </button>
                    </div>
                  </div>

                  {isSubmitted && (
                    <div className="mt-2 pt-2 border-t border-slate-200 text-xs">
                      <p className="font-bold text-slate-700">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 5: LET'S WRITE
      ===================================================================== */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Writing Studio
                </span>
                <span className="text-xs text-slate-500">Trang 69 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Tập viết đoạn văn: &quot;At the campsite&quot; (Tại khu cắm trại)
              </h3>
            </div>

            <button
              onClick={handleEvaluateEssay}
              className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Award className="w-3.5 h-3.5" /> Chấm bài & Nhận sao
            </button>
          </div>

          {/* Quick Apply Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-slate-700 uppercase">Mẫu viết nhanh:</span>
            <button
              onClick={() => handleApplyTemplate('fun')}
              className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900 hover:bg-orange-100"
            >
              ⛺ Dựng lều & Kể chuyện
            </button>
            <button
              onClick={() => handleApplyTemplate('active')}
              className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 hover:bg-amber-100"
            >
              🪢 Kéo co & Chơi bài
            </button>
            <button
              onClick={() => handleApplyTemplate('musical')}
              className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-bold text-rose-900 hover:bg-rose-100"
            >
              💃🔥 Hát ca & Múa lửa trại
            </button>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <textarea
              rows={5}
              value={userEssay}
              onChange={e => setUserEssay(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm font-medium text-slate-800 leading-relaxed"
              placeholder="Nhập bài viết của em ở đây..."
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Số ký tự: {userEssay.length}</span>
              <button
                onClick={() => speakWord(userEssay, speechRate)}
                className="text-orange-700 hover:underline flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe bài viết phát âm qua loa
              </button>
            </div>
          </div>

          {essayAwarded && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1">
              <p className="font-black text-sm">🌟 Bài viết xuất sắc! Em đã nhận được 5 Ngôi Sao!</p>
              <p>Đoạn văn sử dụng chính xác thì Hiện Tại Tiếp Diễn (V-ing) và miêu tả sinh động các hoạt động cắm trại.</p>
            </div>
          )}

          {/* Sample */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 uppercase">Đoạn văn tham khảo chuẩn SGK:</span>
            <p className="text-xs text-slate-800 font-medium">{sampleWriting.content}</p>
            <p className="text-xs text-slate-500 italic">👉 {sampleWriting.contentVi}</p>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: PROJECT - OUR SUMMER CAMP ACTIVITIES
      ===================================================================== */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 font-black text-xs uppercase">
                  Hoạt Động 6 · Project
                </span>
                <span className="text-xs text-slate-500">Trang 69 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Dự Án: Tranh Vẽ & Thuyết Trình Hoạt Động Trại Hè Của Em 🎨
              </h3>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projectItems.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  setActiveProject(p);
                }}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  activeProject.id === p.id
                    ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50 font-bold'
                    : 'border-slate-200 hover:border-orange-300'
                }`}
              >
                <span className="text-3xl">{p.icon}</span>
                <span className="text-sm font-black text-slate-900">{p.title}</span>
              </button>
            ))}
          </div>

          {/* Presentation Display */}
          <div className={`bg-gradient-to-r ${activeProject.bg} text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-4 text-center`}>
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
              Bức Tranh Trại Hè Của Em
            </span>

            <h4 className="text-2xl md:text-3xl font-black">{activeProject.title}</h4>
            <p className="text-lg text-white/90 font-medium">
              &quot;{activeProject.sentence}&quot;
            </p>
            <p className="text-xs text-white/80 italic">({activeProject.sentenceVi})</p>

            <div className="pt-3">
              <button
                onClick={() => {
                  sound.playFanfare();
                  speakWord(`Look at our summer camp picture! ${activeProject.sentence}`, speechRate);
                }}
                className="px-6 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-2 mx-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Thuyết Trình Trước Lớp 🎙️</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
