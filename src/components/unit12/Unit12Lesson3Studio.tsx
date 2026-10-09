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
  Music,
  PenTool,
  Copy,
  Layers,
  Palette,
  Users
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit12Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit12Lesson3Studio: React.FC<Unit12Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 18) - PHONICS "ar" vs "ur"
  // =========================================================================
  const phonicsPairs = [
    {
      id: 'ar_sound',
      letters: 'ar',
      soundIpa: '/ɑː/',
      soundReading: 'âm a dài trầm (mở rộng miệng, hạ thấp quai hàm, phát âm sâu)',
      word: 'farmer',
      wordIpa: '/ˈfɑːmə/',
      wordReading: 'pha-mờ (kéo dài âm a)',
      wordMeaning: 'nông dân',
      sentence: 'My father is a farmer.',
      sentenceIpa: '/maɪ ˈfɑːðər ɪz ə ˈfɑːmə/',
      sentenceReading: 'Mai pha-đờ iz ơ pha-mờ.',
      sentenceMeaning: 'Bố tớ là một người nông dân.',
      icon: '🌾',
      badgeColor: 'bg-emerald-600',
      boxColor: 'border-emerald-300 bg-emerald-50/50'
    },
    {
      id: 'ur_sound',
      letters: 'ur',
      soundIpa: '/ɜː/',
      soundReading: 'âm ơ dài (miệng hơi hé, lưỡi đặt giữa, ngân dài âm ơ)',
      word: 'nurse',
      wordIpa: '/nɜːs/',
      wordReading: 'nơ-s (bật âm s nhẹ cuối)',
      wordMeaning: 'y tá, điều dưỡng',
      sentence: 'My mother is a nurse.',
      sentenceIpa: '/maɪ ˈmʌðər ɪz ə nɜːs/',
      sentenceReading: 'Mai ma-đờ iz ơ nơ-s.',
      sentenceMeaning: 'Mẹ tớ là một y tá.',
      icon: '👩‍⚕️',
      badgeColor: 'bg-rose-600',
      boxColor: 'border-rose-300 bg-rose-50/50'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 19)
  // =========================================================================
  interface CircleQuizItem {
    id: number;
    title: string;
    audioScript: string;
    ipa: string;
    reading: string;
    options: {
      key: 'a' | 'b' | 'c';
      text: string;
      highlight: string;
    }[];
    correctAnswer: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [circleQuizzes, setCircleQuizzes] = useState<CircleQuizItem[]>([
    {
      id: 1,
      title: 'Câu 1: His mother is a _______',
      audioScript: 'His mother is a nurse.',
      ipa: '/hɪz ˈmʌðər ɪz ə nɜːs/',
      reading: 'Hiz ma-đờ iz ơ nơ-s.',
      options: [
        { key: 'a', text: 'farmer', highlight: 'ar' },
        { key: 'b', text: 'nurse', highlight: 'ur' },
        { key: 'c', text: 'gardener', highlight: 'ar' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe đọc: "His mother is a nurse" với âm /ɜː/ trong từ "nurse" -> Đáp án đúng là b.'
    },
    {
      id: 2,
      title: 'Câu 2: Her father is a _______',
      audioScript: 'Her father is a farmer.',
      ipa: '/hɜː ˈfɑːðər ɪz ə ˈfɑːmə/',
      reading: 'Hơ pha-đờ iz ơ pha-mờ.',
      options: [
        { key: 'a', text: 'nurse', highlight: 'ur' },
        { key: 'b', text: 'gardener', highlight: 'ar' },
        { key: 'c', text: 'farmer', highlight: 'ar' }
      ],
      correctAnswer: 'c',
      userChoice: null,
      explanation: 'Bài nghe đọc: "Her father is a farmer" với âm /ɑː/ trong từ "farmer" -> Đáp án đúng là c.'
    }
  ]);
  const [circleSubmitted, setCircleSubmitted] = useState<boolean>(false);

  const handleSelectCircle = (id: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setCircleQuizzes(prev => prev.map(q => (q.id === id ? { ...q, userChoice: key } : q)));
  };

  const handleCheckCircle = () => {
    const allDone = circleQuizzes.every(q => q.userChoice !== null);
    if (!allDone) {
      alert('Em hãy khoanh tròn đáp án cho cả 2 câu hỏi trước nhé!');
      return;
    }
    const correctCount = circleQuizzes.filter(q => q.userChoice === q.correctAnswer).length;
    setCircleSubmitted(true);
    if (correctCount === 2) {
      sound.playVictory();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 20)
  // =========================================================================
  const chantStanzas = [
    {
      st: 1,
      speaker: '👧 Khổ 1: Gia đình bạn nữ',
      lines: [
        { en: 'My father is a farmer.', ipa: '/maɪ ˈfɑːðər ɪz ə ˈfɑːmə/', vi: 'Bố tớ là nông dân.' },
        { en: 'He works on a farm.', ipa: '/hiː wɜːks ɒn ə fɑːm/', vi: 'Bác ấy làm việc trên nông trại.' },
        { en: 'My mother is a nurse.', ipa: '/maɪ ˈmʌðər ɪz ə nɜːs/', vi: 'Mẹ tớ là một y tá.' },
        { en: 'She works at a nursing home.', ipa: '/ʃiː wɜːks æt ə ˈnɜːsɪŋ həʊm/', vi: 'Bác ấy làm việc tại viện dưỡng lão.' }
      ]
    },
    {
      st: 2,
      speaker: '👦 Khổ 2: Gia đình hai anh em',
      lines: [
        { en: 'Our father is a nurse.', ipa: '/ˈaʊə ˈfɑːðər ɪz ə nɜːs/', vi: 'Bố chúng tớ là một y tá.' },
        { en: 'He works at a nursing home.', ipa: '/hiː wɜːks æt ə ˈnɜːsɪŋ həʊm/', vi: 'Bác ấy làm việc tại viện dưỡng lão.' },
        { en: 'Our mother is a farmer.', ipa: '/ˈaʊə ˈmʌðər ɪz ə ˈfɑːmə/', vi: 'Mẹ chúng tớ là nông dân.' },
        { en: 'She works on a farm.', ipa: '/ʃiː wɜːks ɒn ə fɑːm/', vi: 'Bác ấy làm việc trên nông trại.' }
      ]
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE
  // =========================================================================
  const readingPassage = `Look at the photo of my family. This is my mother. She is a nurse. She works at a nursing home. This is my father. He is a worker. He works at a factory. This is me. I am a pupil. I study at a primary school.`;

  const [tableInputs, setTableInputs] = useState({
    motherJob: '',
    motherPlace: '',
    fatherJob: '',
    fatherPlace: ''
  });
  const [tableSubmitted, setTableSubmitted] = useState<boolean>(false);

  const handleCheckTable = () => {
    setTableSubmitted(true);
    sound.playVictory();
    onAddStar(5);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const [writePeopleCount, setWritePeopleCount] = useState<string>('four');
  const [writeMotherJob, setWriteMotherJob] = useState<string>('a nurse');
  const [writeMotherPlace, setWriteMotherPlace] = useState<string>('at a nursing home');
  const [writeFatherJob, setWriteFatherJob] = useState<string>('a worker');
  const [writeFatherPlace, setWriteFatherPlace] = useState<string>('at a factory');
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const generatedEssay = `There are ${writePeopleCount} people in my family. My mother is ${writeMotherJob}. She works ${writeMotherPlace}. My father is ${writeFatherJob}. He works ${writeFatherPlace}. My brother and I are pupils. We study at school.`;

  const handleCopyEssay = () => {
    navigator.clipboard.writeText(generatedEssay);
    sound.playVictory();
    setCopiedText(true);
    onAddStar(2);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Ngữ Âm Phonics &amp; Hoàn Thành Bảng Unit 12 · Tiết 3
          </span>
          <span className="text-xs text-emerald-100 font-bold">Trang 16 - 17 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Luyện Phát Âm &quot;ar&quot; (/ɑː/) và &quot;ur&quot; (/ɜː/) &amp; Dự Án Gia Đình Em
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              1. Âm &quot;ar&quot; /ɑː/ trong f<span className="underline">ar</span>mer, c<span className="underline">ar</span>, p<span className="underline">ar</span>k
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Hạ quai hàm, mở rộng khoang miệng, phát âm chữ &quot;a&quot; trầm sâu: /ˈfɑːmə/.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              2. Âm &quot;ur&quot; /ɜː/ trong n<span className="underline">ur</span>se, p<span className="underline">ur</span>ple
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Miệng hé vừa phải, kéo dài âm ơ nhẹ nhàng: /nɜːs/.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Phonics "ar" & "ur"', icon: '🗣️' },
          { id: 2, label: '2. Listen & circle', icon: '⭕' },
          { id: 3, label: "3. Let's chant", icon: '🎵' },
          { id: 4, label: '4. Read & complete table', icon: '📊' },
          { id: 5, label: "5. Let's write", icon: '✍️' },
          { id: 6, label: '6. Project: My family', icon: '🎨' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LISTEN AND REPEAT (TRACK 18) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 1 · Trang 16
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 18 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and repeat 🗣️ (Lắng nghe và nhắc lại chuẩn ngữ âm)
              </h3>
            </div>
            <button
              onClick={() => {
                speakWord('ar, farmer. My father is a farmer. ur, nurse. My mother is a nurse.', speechRate);
              }}
              className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" /> Nghe cả 2 âm
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border-2 ${item.boxColor} space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-slate-900">{item.letters}</span>
                    <span className="text-sm font-mono font-black text-rose-600 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {item.soundIpa}
                    </span>
                  </div>
                  <span className="text-3xl">{item.icon}</span>
                </div>

                <p className="text-xs text-slate-600 font-medium">{item.soundReading}</p>

                {/* Word */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900">{item.word}</span>
                    <button
                      onClick={() => speakWord(item.word, speechRate)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-mono font-bold text-emerald-700">🗣️ {item.wordIpa}</p>
                  <p className="text-xs text-indigo-700 font-semibold">📖 Gợi ý đọc: {item.wordReading}</p>
                  <p className="text-xs text-slate-500">Nghĩa: {item.wordMeaning}</p>
                </div>

                {/* Sentence */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      &quot;{item.sentence}&quot;
                    </span>
                    <button
                      onClick={() => speakWord(item.sentence, speechRate)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">
                    🗣️ {item.sentenceIpa}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 {item.sentenceReading}
                  </p>
                  <p className="text-xs text-slate-500 italic">{item.sentenceMeaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN AND CIRCLE (TRACK 19) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 2 · Trang 16
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 19 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and circle ⭕ (Lắng nghe và khoanh tròn từ đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckCircle}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra khoanh
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setCircleQuizzes(prev => prev.map(q => ({ ...q, userChoice: null })));
                  setCircleSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {circleQuizzes.map((quiz, idx) => {
              const isCorrect = quiz.userChoice === quiz.correctAnswer;
              return (
                <div
                  key={quiz.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    circleSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {quiz.title}
                    </span>
                    <button
                      onClick={() => speakWord(quiz.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" /> Nghe Audio Track 19
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {quiz.options.map(opt => {
                      const isSelected = quiz.userChoice === opt.key;
                      const isAnswer = quiz.correctAnswer === opt.key;

                      let style =
                        'border-slate-200 bg-white text-slate-800 hover:border-emerald-300';
                      if (isSelected && !circleSubmitted) {
                        style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';
                      }
                      if (circleSubmitted) {
                        if (isAnswer) {
                          style =
                            'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-400';
                        } else if (isSelected && !isAnswer) {
                          style = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(quiz.id, opt.key)}
                          className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition flex items-center gap-2 ${style}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-black">
                            {opt.key}
                          </span>
                          <div>
                            <span className="text-sm">{opt.text}</span>
                            <span className="text-[10px] text-emerald-700 font-mono ml-1.5">
                              ({opt.highlight})
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {circleSubmitted && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                      <p className="font-bold text-slate-800">{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LET'S CHANT (TRACK 20) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 3 · Trang 16
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 20 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s chant: My father is a farmer 🌾 👩‍⚕️
              </h3>
            </div>
            <button
              onClick={() => {
                const chant =
                  'My father is a farmer. He works on a farm. My mother is a nurse. She works at a nursing home. Our father is a nurse. He works at a nursing home. Our mother is a farmer. She works on a farm.';
                speakWord(chant, speechRate * 0.95);
                onAddStar(3);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Bật nhạc vè gõ phách
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chantStanzas.map(stanza => (
              <div
                key={stanza.st}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <h4 className="font-black text-slate-900 text-base">{stanza.speaker}</h4>
                <div className="space-y-2">
                  {stanza.lines.map((line, lIdx) => (
                    <div key={lIdx} className="hover:text-emerald-700 transition">
                      <p className="font-extrabold text-sm md:text-base text-slate-900">
                        {line.en}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-700 font-semibold">
                        {line.ipa}
                      </p>
                      <p className="text-xs text-slate-500 italic">{line.vi}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. READ AND COMPLETE TABLE */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 4 · Trang 17
                </span>
                <span className="text-xs font-semibold text-slate-500">Đọc &amp; Điền Bảng</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and complete 📊 (Đọc đoạn văn và hoàn thành bảng thông tin)
              </h3>
            </div>
            <button
              onClick={handleCheckTable}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition"
            >
              <Check className="w-4 h-4" /> Kiểm tra điền bảng
            </button>
          </div>

          {/* Reading passage */}
          <div className="p-6 rounded-2xl bg-sky-50/70 border-2 border-dashed border-sky-300 font-serif leading-relaxed text-slate-800 text-base md:text-lg">
            <p>&quot;{readingPassage}&quot;</p>
            <div className="mt-3 pt-3 border-t border-sky-200 flex items-center justify-between font-sans">
              <button
                onClick={() => speakWord(readingPassage, speechRate)}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe đọc cả đoạn văn
              </button>
              <span className="text-xs text-slate-500 italic">
                (Dịch: Nhìn vào bức ảnh gia đình tớ này. Đây là mẹ tớ. Mẹ là y tá...)
              </span>
            </div>
          </div>

          {/* Interactive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse rounded-2xl overflow-hidden border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider text-xs">
                <tr>
                  <th className="p-3.5 border-b border-slate-200">Thành viên</th>
                  <th className="p-3.5 border-b border-slate-200">Nghề nghiệp (What does he/she do?)</th>
                  <th className="p-3.5 border-b border-slate-200">Nơi làm việc (Where does he/she work?)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">👩 His mother (Mẹ)</td>
                  <td className="p-3.5">
                    <input
                      type="text"
                      value={tableInputs.motherJob}
                      onChange={e => setTableInputs(prev => ({ ...prev, motherJob: e.target.value }))}
                      placeholder="(1) a nurse"
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-800"
                    />
                    {tableSubmitted && (
                      <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Đáp án: a nurse</p>
                    )}
                  </td>
                  <td className="p-3.5">
                    <input
                      type="text"
                      value={tableInputs.motherPlace}
                      onChange={e => setTableInputs(prev => ({ ...prev, motherPlace: e.target.value }))}
                      placeholder="(2) at a nursing home"
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-800"
                    />
                    {tableSubmitted && (
                      <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Đáp án: at a nursing home</p>
                    )}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">👨 His father (Bố)</td>
                  <td className="p-3.5">
                    <input
                      type="text"
                      value={tableInputs.fatherJob}
                      onChange={e => setTableInputs(prev => ({ ...prev, fatherJob: e.target.value }))}
                      placeholder="(3) a worker"
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-800"
                    />
                    {tableSubmitted && (
                      <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Đáp án: a worker</p>
                    )}
                  </td>
                  <td className="p-3.5">
                    <input
                      type="text"
                      value={tableInputs.fatherPlace}
                      onChange={e => setTableInputs(prev => ({ ...prev, fatherPlace: e.target.value }))}
                      placeholder="(4) at a factory"
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-800"
                    />
                    {tableSubmitted && (
                      <p className="text-[11px] font-bold text-emerald-600 mt-0.5">Đáp án: at a factory</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. LET'S WRITE */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 5 · Trang 17
                </span>
                <span className="text-xs font-semibold text-slate-500">Writing Studio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s write ✍️ (Viết về các thành viên và nghề nghiệp trong gia đình em)
              </h3>
            </div>
            <button
              onClick={handleCopyEssay}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Copy className="w-4 h-4" />
              {copiedText ? 'Đã sao chép! ⭐️ +2 sao' : 'Sao chép bài viết'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Số người trong gia đình:
              </label>
              <input
                type="text"
                value={writePeopleCount}
                onChange={e => setWritePeopleCount(e.target.value)}
                placeholder="four / five"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Nghề nghiệp của mẹ:
              </label>
              <input
                type="text"
                value={writeMotherJob}
                onChange={e => setWriteMotherJob(e.target.value)}
                placeholder="a nurse / a teacher"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. Nơi mẹ làm việc:
              </label>
              <input
                type="text"
                value={writeMotherPlace}
                onChange={e => setWriteMotherPlace(e.target.value)}
                placeholder="at a nursing home / at a school"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. Nghề nghiệp của bố:
              </label>
              <input
                type="text"
                value={writeFatherJob}
                onChange={e => setWriteFatherJob(e.target.value)}
                placeholder="a worker / a farmer"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                5. Nơi bố làm việc:
              </label>
              <input
                type="text"
                value={writeFatherPlace}
                onChange={e => setWriteFatherPlace(e.target.value)}
                placeholder="at a factory / on a farm"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 font-serif text-slate-800 text-base leading-relaxed">
            <p>&quot;{generatedEssay}&quot;</p>
            <div className="mt-4 pt-3 border-t border-emerald-200 flex items-center gap-3 font-sans">
              <button
                onClick={() => speakWord(generatedEssay, speechRate)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe phát âm đoạn văn của em
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PROJECT: "MEMBERS OF MY FAMILY AND THEIR JOBS" */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 17
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Project: &quot;Members of my family and their jobs&quot; 🎨
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Em hãy dán hoặc vẽ bức ảnh gia đình mình, sau đó giơ lên và tự tin giới thiệu với các bạn trong lớp bằng tiếng Anh nhé!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50 border-2 border-blue-200 max-w-lg mx-auto space-y-4">
            <Users className="w-12 h-12 text-blue-600 mx-auto" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest">
                Mẫu thuyết trình trước lớp:
              </span>
              <h4 className="text-xl font-black text-blue-950">
                &quot;This is my father. He&apos;s a policeman. This is my mother. She&apos;s a teacher.&quot;
              </h4>
              <p className="text-xs font-mono font-bold text-blue-800">
                🗣️ /ðɪs ɪz maɪ ˈfɑːðə. hiːz ə pəˈliːsmən. ðɪs ɪz maɪ ˈmʌðə. ʃiːz ə ˈtiːtʃə/
              </p>
              <p className="text-xs text-indigo-700 font-semibold">
                📖 Đít-s iz mai pha-đờ. Hi-z ơ pơ-lít-s-mừn. Đít-s iz mai ma-đờ. Shi-z ơ tí-chờ.
              </p>
            </div>

            <button
              onClick={() => {
                speakWord('This is my father. He is a policeman. This is my mother. She is a teacher.', speechRate);
                onAddStar(3);
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Luyện phát âm bài thuyết trình
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
