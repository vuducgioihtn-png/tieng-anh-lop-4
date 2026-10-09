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
  Layers,
  Smile,
  Zap,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit19Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit19Lesson3Studio: React.FC<Unit19Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 88) - WORD STRESS ON ADVERBS
  // =========================================================================
  const phonicsItems = [
    {
      word: "'loudly",
      plainWord: 'loudly',
      stressedSyllable: 'LOUD',
      unstressedSyllable: 'ly',
      ipa: "/ˈlaʊdli/",
      reading: "LAU-đ-li",
      sentenceEn: "The lions roar 'loudly.",
      sentenceVi: "Những con sư tử gầm vang thật to và dũng mãnh.",
      icon: "🦁",
      note: "Trọng âm rơi vào âm tiết đầu tiên: 'LOUD. Đuôi '-ly' đọc nhẹ lướt nhanh."
    },
    {
      word: "'quickly",
      plainWord: 'quickly',
      stressedSyllable: 'QUICK',
      unstressedSyllable: 'ly',
      ipa: "/ˈkwɪkli/",
      reading: "CUÝCH-c-li",
      sentenceEn: "The giraffes run 'quickly.",
      sentenceVi: "Những chú hươu cao cổ sải chân chạy thoăn thoắt.",
      icon: "🦒",
      note: "Trọng âm rơi vào âm tiết đầu tiên: 'QUICK. Đuôi '-ly' đọc nhẹ hạ giọng."
    },
    {
      word: "'beautifully",
      plainWord: 'beautifully',
      stressedSyllable: 'BEAU',
      unstressedSyllable: 'ti-ful-ly',
      ipa: "/ˈbjuːtəfʊli/",
      reading: "BIU-tơ-phu-li",
      sentenceEn: "The peacocks dance 'beautifully.",
      sentenceVi: "Những con chim công xoè đuôi nhảy múa thật đẹp mắt.",
      icon: "🦚",
      note: "Trọng âm rơi vào âm tiết đầu tiên: 'BEAU. Các âm sau đọc êm ái, nhịp nhàng."
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 89)
  // =========================================================================
  interface CircleQuestion {
    id: number;
    sentenceStart: string;
    sentenceEnd: string;
    options: { key: 'a' | 'b'; text: string; icon: string }[];
    correctKey: 'a' | 'b';
    audioScript: string;
    explanation: string;
  }

  const circleQuestions: CircleQuestion[] = [
    {
      id: 1,
      sentenceStart: '1. The lions roar',
      sentenceEnd: '.',
      options: [
        { key: 'a', text: 'loudly', icon: '📢' },
        { key: 'b', text: 'slowly', icon: '🐢' }
      ],
      correctKey: 'a',
      audioScript: '1. The lions roar loudly.',
      explanation: 'Băng âm thanh đọc: "The lions roar loudly", ta chọn đáp án a: loudly.'
    },
    {
      id: 2,
      sentenceStart: '2. The giraffes run',
      sentenceEnd: '.',
      options: [
        { key: 'a', text: 'beautifully', icon: '💃' },
        { key: 'b', text: 'quickly', icon: '🏃' }
      ],
      correctKey: 'b',
      audioScript: '2. The giraffes run quickly.',
      explanation: 'Băng âm thanh đọc: "The giraffes run quickly", ta chọn đáp án b: quickly.'
    }
  ];

  const [circlePicks, setCirclePicks] = useState<Record<number, 'a' | 'b' | null>>({
    1: null,
    2: null
  });
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleSelectCircle = (qId: number, key: 'a' | 'b') => {
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
      if (circlePicks[q.id] === q.correctKey) {
        correct++;
      }
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
  // ACTIVITY 3: LET'S CHANT (TRACK 90)
  // =========================================================================
  const chantStanzas = [
    {
      animal: 'Lions 🦁',
      lines: [
        { en: 'Lions, lions.', vi: 'Những con sư tử, những con sư tử.' },
        { en: 'Why do you like lions?', vi: 'Tại sao bạn lại thích sư tử?' },
        { en: 'Because they roar \'loudly.', vi: 'Bởi vì chúng gầm vang thật to.' },
        { en: 'Because they roar \'loudly!', vi: 'Bởi vì chúng gầm vang oai phong!' }
      ],
      audioText: "Lions, lions. Why do you like lions? Because they roar loudly. Because they roar loudly!"
    },
    {
      animal: 'Giraffes 🦒',
      lines: [
        { en: 'Giraffes, giraffes.', vi: 'Những chú hươu cao cổ, hươu cao cổ.' },
        { en: 'Why do you like giraffes?', vi: 'Tại sao bạn lại thích hươu cao cổ?' },
        { en: 'Because they run \'quickly.', vi: 'Bởi vì chúng chạy thoăn thoắt.' },
        { en: 'Because they run \'quickly!', vi: 'Bởi vì chúng chạy thật nhanh!' }
      ],
      audioText: "Giraffes, giraffes. Why do you like giraffes? Because they run quickly. Because they run quickly!"
    },
    {
      animal: 'Peacocks 🦚',
      lines: [
        { en: 'Peacocks, peacocks.', vi: 'Những chú chim công, chim công.' },
        { en: 'Why do you like peacocks?', vi: 'Tại sao bạn lại thích chim công?' },
        { en: 'Because they dance \'beautifully.', vi: 'Bởi vì chúng múa đuôi tuyệt đẹp.' },
        { en: 'Because they dance \'beautifully!', vi: 'Bởi vì chúng xoè cánh múa thật xinh!' }
      ],
      audioText: "Peacocks, peacocks. Why do you like peacocks? Because they dance beautifully. Because they dance beautifully!"
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE / READ AND TICK
  // =========================================================================
  const readingPassage = {
    title: 'A Wonderful Day at the Zoo (Một ngày tuyệt vời ở sở thú)',
    paragraph:
      "Today, Nam, Linh and Ben are visiting the zoo. There are many animals there. Nam likes lions because they roar loudly and look very brave. Linh likes giraffes because they have long necks and run quickly. Ben loves peacocks because they dance beautifully with colourful feathers. The children are very happy at the zoo.",
    paragraphVi:
      "Hôm nay, Nam, Linh và Ben đang đi thăm sở thú. Có rất nhiều loài động vật ở đó. Nam thích sư tử vì chúng gầm to và trông rất dũng cảm. Linh thích hươu cao cổ vì chúng có cổ dài và chạy rất nhanh. Ben yêu thích chim công vì chúng múa rất đẹp mắt với bộ lông sặc sỡ. Các bạn nhỏ đều vô cùng hạnh phúc tại sở thú."
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
      statement: '1. Nam likes lions because they roar loudly.',
      statementVi: 'Nam thích sư tử bởi vì chúng gầm to.',
      correctAnswer: 'True',
      explanation: 'Đúng theo bài đọc: "Nam likes lions because they roar loudly."'
    },
    {
      id: 2,
      statement: '2. Linh likes giraffes because they swim slowly.',
      statementVi: 'Linh thích hươu cao cổ vì chúng bơi chậm.',
      correctAnswer: 'False',
      explanation: 'Sai! Trong bài: "Linh likes giraffes because they run quickly."'
    },
    {
      id: 3,
      statement: '3. Peacocks dance beautifully with colourful feathers.',
      statementVi: 'Chim công nhảy múa rất đẹp với bộ lông rực rỡ.',
      correctAnswer: 'True',
      explanation: 'Đúng theo bài đọc: "Ben loves peacocks because they dance beautifully with colourful feathers."'
    }
  ];

  const [readingAnswers, setReadingAnswers] = useState<Record<number, 'True' | 'False' | null>>({
    1: null,
    2: null,
    3: null
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

    if (correct === 3) {
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
    title: 'My Favourite Animals at the Zoo',
    content:
      "I love going to the zoo at weekends. My favourite animals are peacocks and giraffes. I like peacocks because they dance beautifully with bright feathers. I also like giraffes because they run quickly and have tall necks. The animal world is amazing!",
    contentVi:
      "Tôi rất thích đi sở thú vào cuối tuần. Những con vật yêu thích của tôi là chim công và hươu cao cổ. Tôi thích chim công vì chúng múa rất đẹp với bộ lông rực rỡ. Tôi cũng thích hươu cao cổ vì chúng chạy nhanh và có chiếc cổ cao. Thế giới động vật thật kỳ diệu!"
  };

  const [userEssay, setUserEssay] = useState<string>(
    "I like going to the zoo. My favourite animals are ... I like them because they ... They are very ..."
  );
  const [essayStarsAwarded, setEssayStarsAwarded] = useState<boolean>(false);

  const handleApplyTemplate = (animalChoice: 'lions' | 'giraffes' | 'peacocks') => {
    sound.playClick();
    if (animalChoice === 'lions') {
      setUserEssay(
        "I like going to the zoo. My favourite animals are lions. I like them because they roar loudly and look brave. They are very strong and awesome!"
      );
    } else if (animalChoice === 'giraffes') {
      setUserEssay(
        "I like going to the zoo. My favourite animals are giraffes. I like them because they run quickly and have long necks. They are very friendly and tall!"
      );
    } else {
      setUserEssay(
        "I like going to the zoo. My favourite animals are peacocks. I like them because they dance beautifully. They have colourful feathers and look wonderful!"
      );
    }
  };

  const handleEvaluateEssay = () => {
    if (userEssay.length < 25) {
      sound.playWarning();
      return;
    }
    sound.playComplete();
    setEssayStarsAwarded(true);
    onAddStar(5);
    confetti({ particleCount: 70, spread: 60 });
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT - ANIMAL WORLD EXHIBITION POSTER
  // =========================================================================
  const posterTemplates = [
    {
      id: 'p1',
      animalName: 'LIONS 🦁',
      badge: 'King of the Jungle',
      motto: 'They roar loudly and protect their family!',
      features: ['Long golden mane', 'Brave eyes', 'Powerful roar'],
      bgColor: 'from-amber-600 via-orange-600 to-amber-800'
    },
    {
      id: 'p2',
      animalName: 'GIRAFFES 🦒',
      badge: 'Gentle Giants',
      motto: 'They run quickly and reach the highest green leaves!',
      features: ['Tall spots pattern', 'Long graceful neck', 'Fast runners'],
      bgColor: 'from-yellow-500 via-amber-600 to-yellow-700'
    },
    {
      id: 'p3',
      animalName: 'PEACOCKS 🦚',
      badge: 'Dancers of Nature',
      motto: 'They dance beautifully with sparkling feathers!',
      features: ['Emerald tail fan', 'Graceful movements', 'Sweet chirping'],
      bgColor: 'from-teal-600 via-emerald-600 to-teal-800'
    }
  ];

  const [selectedPoster, setSelectedPoster] = useState(posterTemplates[0]);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <span>🦚 Unit 19 · Lesson 3</span>
              <span>· Trang 62 - 63 SGK</span>
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
            <span>Trọng Âm Trạng Từ, Bài Vè & Dự Án Triển Lãm Động Vật</span>
            <span className="text-3xl">🦁🦒🦚</span>
          </h2>
          <p className="text-teal-100 text-sm md:text-base max-w-3xl leading-relaxed">
            Luyện phát âm chuẩn trọng âm từ <strong>&apos;loudly</strong> và <strong>&apos;quickly</strong> (Track 88), 
            hát vè sôi động nhịp nhàng (Track 90), đọc hiểu chuyến thăm sở thú, viết đoạn văn và làm poster triển lãm thế giới động vật hoang dã.
          </p>

          {/* Activity Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: '1. Ngữ Âm & Trọng Âm', icon: '🎯' },
              { id: 2, label: '2. Nghe & Khoanh Tròn', icon: '📝' },
              { id: 3, label: '3. Bài Vè Vỗ Tay Chant', icon: '👏' },
              { id: 4, label: '4. Đọc Hiểu Sở Thú', icon: '📖' },
              { id: 5, label: '5. Tập Viết Đoạn Văn', icon: '✍️' },
              { id: 6, label: '6. Dự Án Poster Triển Lãm', icon: '🎨' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSection(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === tab.id
                    ? 'bg-white text-teal-900 shadow-md scale-105'
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
          SECTION 1: LISTEN AND REPEAT (TRACK 88)
      ===================================================================== */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 88
                </span>
                <span className="text-xs text-slate-500">Trang 62 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and repeat: Trọng âm trạng từ hai âm tiết kết thúc bằng &apos;-ly&apos;
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                speakWord(
                  "loudly. The lions roar loudly. quickly. The giraffes run quickly.",
                  speechRate
                );
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-md hover:from-teal-700 hover:to-emerald-700 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Âm Thanh Mẫu (Track 88)</span>
            </button>
          </div>

          {/* Explanation Box */}
          <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-1">
            <span className="font-black flex items-center gap-1.5 text-teal-900">
              <Lightbulb className="w-4 h-4" /> Quy tắc nhấn trọng âm trạng từ đuôi -ly:
            </span>
            <p>
              Các trạng từ hai âm tiết có tận cùng là <span className="font-bold underline">-ly</span> (như <strong>&apos;loudly</strong>, <strong>&apos;quickly</strong>) thì 
              trọng âm luôn rơi vào <span className="font-bold text-teal-900">âm tiết thứ nhất</span>. Ta đọc to, rõ, nhấn mạnh âm đầu và hạ nhẹ giọng ở âm đuôi &apos;-ly&apos;.
            </p>
          </div>

          {/* Phonics Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {phonicsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-3xl">{item.icon}</span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.plainWord, speechRate);
                    }}
                    className="p-2 rounded-xl bg-teal-100 text-teal-800 hover:bg-teal-200 transition"
                    title="Nghe từ này"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1 text-2xl font-black text-slate-900">
                    <span className="text-teal-700 underline decoration-teal-500 decoration-3">
                      &apos;{item.stressedSyllable}
                    </span>
                    <span className="text-slate-400 font-medium">-{item.unstressedSyllable}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">{item.ipa}</p>
                  <p className="text-xs text-teal-800 bg-teal-50 font-bold px-2 py-0.5 rounded-md inline-block">
                    🗣️ {item.reading}
                  </p>
                </div>

                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                  💡 {item.note}
                </p>

                {/* Sentence Example */}
                <div className="bg-white p-3.5 rounded-xl border border-teal-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-teal-800 uppercase">Câu mẫu:</span>
                    <button
                      onClick={() => speakWord(item.sentenceEn, speechRate)}
                      className="p-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100"
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
          SECTION 2: LISTEN AND CIRCLE (TRACK 89)
      ===================================================================== */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Track 89
                </span>
                <span className="text-xs text-slate-500">Trang 62 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and circle (Lắng nghe và khoanh tròn từ có trọng âm đúng)
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
                className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
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
                      : 'bg-slate-50/80 border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                    <span className="font-black text-slate-900 text-base">
                      {q.sentenceStart} <span className="underline font-mono text-teal-700">______</span> {q.sentenceEnd}
                    </span>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.audioScript, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Câu #{q.id}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    {q.options.map(opt => {
                      const isChosen = userPick === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-teal-300';
                      if (isChosen) {
                        btnStyle = 'bg-teal-600 text-white border-teal-600 ring-2 ring-teal-200 font-bold';
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
                          className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
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
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-700">
                      <p className="font-bold">{isCorrect ? '✅ Hoàn hảo!' : '❌ Chưa chính xác!'}</p>
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
          SECTION 3: LET'S CHANT (TRACK 90)
      ===================================================================== */}
      {activeSection === 3 && (
        <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-emerald-800 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Hoạt Động 3 · Track 90
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Let&apos;s Chant: Bài Vè Nhịp Điệu Vỗ Tay Khám Phá Muôn Loài 👏
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playFanfare();
                speakWord(
                  "Lions, lions. Why do you like lions? Because they roar loudly! Giraffes, giraffes. Why do you like giraffes? Because they run quickly! Peacocks, peacocks. Why do you like peacocks? Because they dance beautifully!",
                  speechRate
                );
              }}
              className="px-6 py-2.5 rounded-2xl bg-white text-teal-950 font-black text-xs hover:bg-teal-50 transition shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Hát Toàn Bộ Bài Vè</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {chantStanzas.map((st, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <h4 className="font-black text-lg text-yellow-300">{st.animal}</h4>
                  <button
                    onClick={() => speakWord(st.audioText, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                    title="Nghe khổ này"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {st.lines.map((ln, lIdx) => (
                    <div key={lIdx}>
                      <p className="font-bold text-white text-sm">{ln.en}</p>
                      <p className="text-teal-100/80 italic">{ln.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: READ AND TICK / TRUE OR FALSE
      ===================================================================== */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Reading
                </span>
                <span className="text-xs text-slate-500">Trang 63 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Đọc hiểu đoạn văn chuyến thăm sở thú và chọn Đúng (True) / Sai (False)
              </h3>
            </div>

            <button
              onClick={handleCheckReading}
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Kiểm tra đáp án
            </button>
          </div>

          {/* Reading Passage Box */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-teal-900 text-base">{readingPassage.title}</h4>
              <button
                onClick={() => speakWord(readingPassage.paragraph, speechRate)}
                className="px-3 py-1 rounded-xl bg-teal-200/80 text-teal-900 text-xs font-bold transition flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Đọc đoạn văn
              </button>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {readingPassage.paragraph}
            </p>
            <p className="text-xs text-slate-600 italic bg-white/60 p-3 rounded-xl border border-teal-100">
              👉 Bản dịch: {readingPassage.paragraphVi}
            </p>
          </div>

          {/* Questions */}
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
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
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
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs">
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
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Writing Studio
                </span>
                <span className="text-xs text-slate-500">Trang 63 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Tập viết về loài động vật yêu thích của em tại sở thú
              </h3>
            </div>

            <button
              onClick={handleEvaluateEssay}
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Award className="w-3.5 h-3.5" /> Chấm bài & Nhận sao
            </button>
          </div>

          {/* Quick Apply Templates */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-slate-700 uppercase">Mẫu viết nhanh:</span>
            <button
              onClick={() => handleApplyTemplate('peacocks')}
              className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-xs font-bold text-teal-900 hover:bg-teal-100"
            >
              🦚 Viết về Chim Công
            </button>
            <button
              onClick={() => handleApplyTemplate('giraffes')}
              className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 hover:bg-amber-100"
            >
              🦒 Viết về Hươu Cao Cổ
            </button>
            <button
              onClick={() => handleApplyTemplate('lions')}
              className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900 hover:bg-orange-100"
            >
              🦁 Viết về Sư Tử
            </button>
          </div>

          {/* Writing Textarea */}
          <div className="space-y-2">
            <textarea
              rows={5}
              value={userEssay}
              onChange={e => setUserEssay(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm font-medium text-slate-800 leading-relaxed"
              placeholder="Nhập bài viết của em ở đây..."
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Số ký tự: {userEssay.length}</span>
              <button
                onClick={() => speakWord(userEssay, speechRate)}
                className="text-teal-700 hover:underline flex items-center gap-1 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm bài viết của em
              </button>
            </div>
          </div>

          {essayStarsAwarded && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1">
              <p className="font-black text-sm">🌟 Bài viết xuất sắc! Em đã nhận được 5 Ngôi Sao!</p>
              <p>Đoạn văn mô tả rõ ràng loài thú yêu thích và lý do với trạng từ chuẩn ngữ pháp.</p>
            </div>
          )}

          {/* Reference Sample */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 uppercase">Bài viết tham khảo chuẩn:</span>
            <p className="text-xs text-slate-800 font-medium">{sampleWriting.content}</p>
            <p className="text-xs text-slate-500 italic">👉 {sampleWriting.contentVi}</p>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: PROJECT - ANIMAL WORLD EXHIBITION
      ===================================================================== */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-black text-xs uppercase">
                  Hoạt Động 6 · Project
                </span>
                <span className="text-xs text-slate-500">Trang 63 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Dự Án: Thiết Kế Poster & Thuyết Trình Triển Lãm Động Vật 🎨
              </h3>
            </div>
          </div>

          {/* Poster Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {posterTemplates.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPoster(p);
                }}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  selectedPoster.id === p.id
                    ? 'border-teal-500 ring-2 ring-teal-200 bg-teal-50/60 font-bold'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <span className="text-3xl">{p.animalName.split(' ')[1]}</span>
                <span className="text-sm font-black text-slate-900">{p.animalName}</span>
                <span className="text-xs text-slate-500">{p.badge}</span>
              </button>
            ))}
          </div>

          {/* Exhibition Poster Display Card */}
          <div className={`bg-gradient-to-r ${selectedPoster.bgColor} text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-5 text-center`}>
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
              {selectedPoster.badge}
            </span>

            <h4 className="text-3xl font-black">{selectedPoster.animalName}</h4>
            <p className="text-base text-white/90 max-w-lg mx-auto font-medium">
              &quot;{selectedPoster.motto}&quot;
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {selectedPoster.features.map((f, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-white/20 text-xs font-bold">
                  ✨ {f}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  sound.playFanfare();
                  speakWord(
                    `This is my favourite animal: ${selectedPoster.animalName}. ${selectedPoster.motto}`,
                    speechRate
                  );
                }}
                className="px-6 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs hover:bg-slate-100 transition shadow-md flex items-center gap-2 mx-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Thuyết Trình Poster Này 🎙️</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
