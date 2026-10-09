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
  Users,
  Table
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit13Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit13Lesson3Studio: React.FC<Unit13Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 28) - PHONICS "l" vs "r"
  // =========================================================================
  const phonicsPairs = [
    {
      id: 'l_sound',
      letter: 'l',
      soundIpa: '/l/',
      soundReading: 'đầu lưỡi chạm vào chân răng hàm trên rồi buông nhẹ (âm l)',
      word: 'long',
      wordIpa: '/lɒŋ/',
      wordReading: 'lon-g (ngân âm ng cuối)',
      wordMeaning: 'dài',
      sentence: 'My sister has long hair.',
      sentenceIpa: '/maɪ ˈsɪstə hæz lɒŋ heə/',
      sentenceReading: 'Mai xít-s-tờ hæ-z lon-g he-ơ.',
      sentenceMeaning: 'Chị tớ có mái tóc dài.',
      icon: '💇‍♀️',
      badgeColor: 'bg-emerald-600',
      boxColor: 'border-emerald-300 bg-emerald-50/50'
    },
    {
      id: 'r_sound',
      letter: 'r',
      soundIpa: '/r/',
      soundReading: 'cong lưỡi về phía sau, không để lưỡi chạm nóc họng, môi hơi tròn',
      word: 'round',
      wordIpa: '/raʊnd/',
      wordReading: 'raon-d (bật âm d nhẹ cuối)',
      wordMeaning: 'tròn',
      sentence: 'My brother has round eyes.',
      sentenceIpa: '/maɪ ˈbrʌðə hæz raʊnd aɪz/',
      sentenceReading: 'Mai bra-đờ hæ-z raon-d ai-z.',
      sentenceMeaning: 'Em trai tớ có đôi mắt tròn xoe.',
      icon: '👀',
      badgeColor: 'bg-indigo-600',
      boxColor: 'border-indigo-300 bg-indigo-50/50'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 29)
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
      letterHighlight: 'l' | 'r';
    }[];
    correctAnswer: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [circleQuizzes, setCircleQuizzes] = useState<CircleQuizItem[]>([
    {
      id: 1,
      title: 'Câu 1: My grandfather has _______',
      audioScript: 'My grandfather has a round face.',
      ipa: '/maɪ ˈɡrændˌfɑːðə hæz ə raʊnd feɪs/',
      reading: 'Mai græn-pha-đờ hæ-z ơ raon-d phây-s.',
      options: [
        { key: 'a', text: 'long hands', letterHighlight: 'l' },
        { key: 'b', text: 'a round face', letterHighlight: 'r' },
        { key: 'c', text: 'a long nose', letterHighlight: 'l' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe phát âm: "My grandfather has a round face" với âm /r/ trong từ "round" -> Đáp án đúng là b.'
    },
    {
      id: 2,
      title: 'Câu 2: My brother has _______',
      audioScript: 'My brother has round eyes.',
      ipa: '/maɪ ˈbrʌðə hæz raʊnd aɪz/',
      reading: 'Mai bra-đờ hæ-z raon-d ai-z.',
      options: [
        { key: 'a', text: 'long hands', letterHighlight: 'l' },
        { key: 'b', text: 'a round face', letterHighlight: 'r' },
        { key: 'c', text: 'round eyes', letterHighlight: 'r' }
      ],
      correctAnswer: 'c',
      userChoice: null,
      explanation: 'Bài nghe phát âm: "My brother has round eyes" -> Đáp án đúng là c.'
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
  // ACTIVITY 3: LET'S CHANT (TRACK 30) - WHO'S THAT?
  // =========================================================================
  const chantStanzas = [
    {
      st: 1,
      title: '🎸 Khổ 1: Về anh trai (He has long hair)',
      lines: [
        { en: "Who's that?", ipa: '/huːz ðæt/', vi: 'Ai thế kia?' },
        { en: "It's my brother.", ipa: '/ɪts maɪ ˈbrʌðə/', vi: 'Đó là anh trai tớ.' },
        { en: 'What does he look like?', ipa: '/wɒt dʌz hiː lʊk laɪk/', vi: 'Anh ấy trông thế nào?' },
        { en: 'He has long hair.', ipa: '/hiː hæz lɒŋ heə/', vi: 'Anh ấy có mái tóc dài lãng tử.' },
        { en: 'His hair is long.', ipa: '/hɪz heər ɪz lɒŋ/', vi: 'Mái tóc của anh ấy rất dài.' }
      ]
    },
    {
      st: 2,
      title: '🌸 Khổ 2: Về em gái (She has a round face)',
      lines: [
        { en: "Who's that?", ipa: '/huːz ðæt/', vi: 'Ai thế kia?' },
        { en: "It's my sister.", ipa: '/ɪts maɪ ˈsɪstə/', vi: 'Đó là em gái tớ.' },
        { en: 'What does she look like?', ipa: '/wɒt dʌz ʃiː lʊk laɪk/', vi: 'Em ấy trông thế nào?' },
        { en: 'She has a round face.', ipa: '/ʃiː hæz ə raʊnd feɪs/', vi: 'Em ấy có khuôn mặt tròn xoe.' },
        { en: 'Her face is round.', ipa: '/hɜː feɪs ɪz raʊnd/', vi: 'Gương mặt của em ấy tròn trịa đáng yêu.' }
      ]
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE
  // =========================================================================
  const readingText = `I have a big family: my grandfather, my grandmother, my father, my mother, my sister and me. My grandfather is big. My grandmother is big, too. My father is very tall. My mother is slim. She has long hair. My sister has a round face and big eyes.`;

  const [fillQ1, setFillQ1] = useState<string>('');
  const [fillQ2, setFillQ2] = useState<string>('');
  const [fillQ3, setFillQ3] = useState<string>('');
  const [fillQ4, setFillQ4] = useState<string>('');
  const [readChecked, setReadChecked] = useState<boolean>(false);

  const handleCheckRead = () => {
    setReadChecked(true);
    sound.playVictory();
    onAddStar(5);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const [writeCount, setWriteCount] = useState<string>('six');
  const [writeDadHeight, setWriteDadHeight] = useState<string>('very tall');
  const [writeDadHair, setWriteDadHair] = useState<string>('short hair');
  const [writeMomBody, setWriteMomBody] = useState<string>('slim');
  const [writeMomHair, setWriteMomHair] = useState<string>('long hair');
  const [writeSibDesc, setWriteSibDesc] = useState<string>('sister has a round face');
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const generatedEssay = `There are ${writeCount} people in my family. My father is ${writeDadHeight}. He has ${writeDadHair}. My mother is ${writeMomBody}. She has ${writeMomHair}. My ${writeSibDesc}. We love our family.`;

  const handleCopyEssay = () => {
    navigator.clipboard.writeText(generatedEssay);
    sound.playVictory();
    setCopiedText(true);
    onAddStar(2);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT: APPEARANCE OF MY FAMILY MEMBERS
  // =========================================================================
  const [projectTable, setProjectTable] = useState({
    father: { tall: true, short: false, big: false, slim: false, shortHair: true, longHair: false },
    mother: { tall: false, short: false, big: false, slim: true, shortHair: false, longHair: true },
    brother: { tall: true, short: false, big: true, slim: false, shortHair: true, longHair: false },
    sister: { tall: false, short: true, big: false, slim: true, shortHair: false, longHair: true }
  });

  const toggleCheck = (person: 'father' | 'mother' | 'brother' | 'sister', field: string) => {
    sound.playClick();
    setProjectTable(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: !prev[person][field as keyof typeof prev[typeof person]]
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Ngữ Âm Phonics &amp; Đọc Hoàn Thành Unit 13 · Tiết 3
          </span>
          <span className="text-xs text-indigo-100 font-bold">Trang 22 - 23 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Luyện Phát Âm &quot;l&quot; (/l/) và &quot;r&quot; (/r/) &amp; Dự Án Ngoại Hình Gia Đình
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              1. Âm &quot;l&quot; /l/ trong <span className="underline">l</span>ong, <span className="underline">l</span>ook, <span className="underline">l</span>ike
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Đầu lưỡi chạm vào chân răng trên rồi buông nhẹ nhàng: /lɒŋ/.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <span className="font-extrabold text-yellow-300 text-sm">
              2. Âm &quot;r&quot; /r/ trong <span className="underline">r</span>ound, <span className="underline">r</span>ead, <span className="underline">r</span>ed
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Uốn lưỡi về phía sau, không chạm vòm miệng, môi hơi khum tròn: /raʊnd/.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Phonics "l" & "r"', icon: '🗣️' },
          { id: 2, label: '2. Listen & circle', icon: '⭕' },
          { id: 3, label: "3. Let's chant", icon: '🎵' },
          { id: 4, label: '4. Read & complete', icon: '📖' },
          { id: 5, label: "5. Let's write", icon: '✍️' },
          { id: 6, label: '6. Project: Family table', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-indigo-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LISTEN AND REPEAT (TRACK 28) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 1 · Trang 22
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 28 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and repeat 🗣️ (Lắng nghe và nhắc lại chuẩn ngữ âm)
              </h3>
            </div>
            <button
              onClick={() => {
                speakWord('l, long. My sister has long hair. r, round. My brother has round eyes.', speechRate);
              }}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-indigo-700" /> Nghe cả 2 âm
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
                    <span className="text-3xl font-black text-slate-900">{item.letter}</span>
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
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
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
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
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
      {/* 2. LISTEN AND CIRCLE (TRACK 29) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 2 · Trang 22
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 29 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and circle ⭕ (Lắng nghe và khoanh tròn cụm từ đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckCircle}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
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
                      : 'border-slate-200 bg-slate-50/50 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {quiz.title}
                    </span>
                    <button
                      onClick={() => speakWord(quiz.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-700" /> Nghe Audio Track 29
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {quiz.options.map(opt => {
                      const isSelected = quiz.userChoice === opt.key;
                      const isAnswer = quiz.correctAnswer === opt.key;

                      let style =
                        'border-slate-200 bg-white text-slate-800 hover:border-indigo-300';
                      if (isSelected && !circleSubmitted) {
                        style = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold';
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
                            <span className="text-[10px] text-indigo-700 font-mono ml-1.5">
                              ({opt.letterHighlight})
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
      {/* 3. LET'S CHANT (TRACK 30) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 3 · Trang 22
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 30 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s chant: Who&apos;s that? 🎸 🌸
              </h3>
            </div>
            <button
              onClick={() => {
                const chant =
                  'Who is that? It is my brother. What does he look like? He has long hair. His hair is long. Who is that? It is my sister. What does she look like? She has a round face. Her face is round.';
                speakWord(chant, speechRate * 0.95);
                onAddStar(3);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
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
                <h4 className="font-black text-slate-900 text-base">{stanza.title}</h4>
                <div className="space-y-2">
                  {stanza.lines.map((line, lIdx) => (
                    <div key={lIdx} className="hover:text-indigo-700 transition">
                      <p className="font-extrabold text-sm md:text-base text-slate-900">
                        {line.en}
                      </p>
                      <p className="text-[11px] font-mono text-indigo-700 font-semibold">
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
      {/* 4. READ AND COMPLETE */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 4 · Trang 23
                </span>
                <span className="text-xs font-semibold text-slate-500">Đọc Hiểu Đoạn Văn</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and complete 📖 (Đọc đoạn văn và điền vào chỗ trống)
              </h3>
            </div>
            <button
              onClick={handleCheckRead}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition"
            >
              <Check className="w-4 h-4" /> Kiểm tra đáp án
            </button>
          </div>

          {/* Reading text */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 font-serif leading-relaxed text-slate-800 text-base md:text-lg">
            <p>&quot;{readingText}&quot;</p>
            <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-between font-sans">
              <button
                onClick={() => speakWord(readingText, speechRate)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe đọc cả đoạn văn
              </button>
              <span className="text-xs text-slate-500 italic">
                (Dịch: Gia đình tớ có 6 người: ông bà, bố mẹ, chị gái và tớ. Ông bà tớ to lớn...)
              </span>
            </div>
          </div>

          {/* 4 Fill Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p className="text-xs font-black text-slate-800">1. My grandfather and grandmother are _______.</p>
              <input
                type="text"
                value={fillQ1}
                onChange={e => setFillQ1(e.target.value)}
                placeholder="big"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
              />
              {readChecked && <p className="text-xs font-bold text-emerald-600">Đáp án: big</p>}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p className="text-xs font-black text-slate-800">2. My father is _______.</p>
              <input
                type="text"
                value={fillQ2}
                onChange={e => setFillQ2(e.target.value)}
                placeholder="very tall"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
              />
              {readChecked && <p className="text-xs font-bold text-emerald-600">Đáp án: very tall</p>}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p className="text-xs font-black text-slate-800">3. My mother has _______.</p>
              <input
                type="text"
                value={fillQ3}
                onChange={e => setFillQ3(e.target.value)}
                placeholder="long hair"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
              />
              {readChecked && <p className="text-xs font-bold text-emerald-600">Đáp án: long hair</p>}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <p className="text-xs font-black text-slate-800">4. My sister has _______.</p>
              <input
                type="text"
                value={fillQ4}
                onChange={e => setFillQ4(e.target.value)}
                placeholder="a round face and big eyes"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-sm"
              />
              {readChecked && <p className="text-xs font-bold text-emerald-600">Đáp án: a round face and big eyes</p>}
            </div>
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt Động 5 · Trang 23
                </span>
                <span className="text-xs font-semibold text-slate-500">Writing Studio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s write ✍️ (Viết về ngoại hình gia đình em)
              </h3>
            </div>
            <button
              onClick={handleCopyEssay}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
            >
              <Copy className="w-4 h-4" />
              {copiedText ? 'Đã sao chép! ⭐️ +2 sao' : 'Sao chép bài viết'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Số thành viên trong nhà:
              </label>
              <input
                type="text"
                value={writeCount}
                onChange={e => setWriteCount(e.target.value)}
                placeholder="four / five / six"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Vóc dáng của bố (My father is...):
              </label>
              <input
                type="text"
                value={writeDadHeight}
                onChange={e => setWriteDadHeight(e.target.value)}
                placeholder="very tall / big"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. Bố có đặc điểm gì (He has...):
              </label>
              <input
                type="text"
                value={writeDadHair}
                onChange={e => setWriteDadHair(e.target.value)}
                placeholder="short hair / a round face"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. Vóc dáng của mẹ (My mother is...):
              </label>
              <input
                type="text"
                value={writeMomBody}
                onChange={e => setWriteMomBody(e.target.value)}
                placeholder="slim / tall"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                5. Mẹ có đặc điểm gì (She has...):
              </label>
              <input
                type="text"
                value={writeMomHair}
                onChange={e => setWriteMomHair(e.target.value)}
                placeholder="long hair / big eyes"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                6. Đặc điểm anh/chị/em:
              </label>
              <input
                type="text"
                value={writeSibDesc}
                onChange={e => setWriteSibDesc(e.target.value)}
                placeholder="sister has a round face"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 font-serif text-slate-800 text-base leading-relaxed">
            <p>&quot;{generatedEssay}&quot;</p>
            <div className="mt-4 pt-3 border-t border-indigo-200 flex items-center gap-3 font-sans">
              <button
                onClick={() => speakWord(generatedEssay, speechRate)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe phát âm đoạn văn của em
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PROJECT: APPEARANCE OF MY FAMILY MEMBERS */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 23
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Project: &quot;Appearance of my family members&quot; 📊
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Em hãy tích chọn đặc điểm ngoại hình tương ứng của từng người trong gia đình rồi luyện nói trước lớp nhé!
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-w-2xl mx-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse rounded-2xl overflow-hidden border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-black text-xs uppercase">
                <tr>
                  <th className="p-3 border-b border-slate-200">Thành viên</th>
                  <th className="p-3 text-center border-b border-slate-200">tall</th>
                  <th className="p-3 text-center border-b border-slate-200">short</th>
                  <th className="p-3 text-center border-b border-slate-200">big</th>
                  <th className="p-3 text-center border-b border-slate-200">slim</th>
                  <th className="p-3 text-center border-b border-slate-200">short hair</th>
                  <th className="p-3 text-center border-b border-slate-200">long hair</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {(['father', 'mother', 'brother', 'sister'] as const).map(person => (
                  <tr key={person} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 capitalize">{person}</td>
                    {(['tall', 'short', 'big', 'slim', 'shortHair', 'longHair'] as const).map(field => {
                      const isChecked = projectTable[person][field];
                      return (
                        <td key={field} className="p-3 text-center">
                          <button
                            onClick={() => toggleCheck(person, field)}
                            className={`w-6 h-6 rounded-md border text-xs font-black transition ${
                              isChecked
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white border-slate-300 text-transparent'
                            }`}
                          >
                            ✓
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-200 max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest block">
              Mẫu câu thuyết trình bài tập:
            </span>
            <h4 className="text-xl font-black text-indigo-950">
              &quot;My father&apos;s tall. He has short hair. My mother&apos;s slim. She has long hair.&quot;
            </h4>
            <button
              onClick={() => {
                speakWord("My father is tall. He has short hair. My mother is slim. She has long hair.", speechRate);
                onAddStar(3);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Luyện phát âm bài thuyết trình
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
