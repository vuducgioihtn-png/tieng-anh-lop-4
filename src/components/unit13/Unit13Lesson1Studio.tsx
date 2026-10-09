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
  User,
  Users,
  Activity
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit13Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit13Lesson1Studio: React.FC<Unit13Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 21)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Minh',
      avatarA: '👦🏻',
      textA: 'Do you have a brother, Lucy?',
      ipaA: '/duː juː hæv ə ˈbrʌðə, ˈluːsi/',
      readingA: 'Đu diu hæv ơ bra-đờ, Lu-si?',
      meaningA: 'Cậu có anh trai hoặc em trai không, Lucy?',
      speakerB: 'Lucy',
      avatarB: '👱‍♀️',
      textB: 'Yes, I do.',
      ipaB: '/jes, aɪ duː/',
      readingB: 'Dét, ai đu.',
      meaningB: 'Có chứ, tớ có.',
      context: 'Minh và Lucy đang đi dạo và trò chuyện trong công viên.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Minh',
      avatarA: '👦🏻',
      textA: 'What does he look like?',
      ipaA: '/wɒt dʌz hiː lʊk laɪk/',
      readingA: 'Oát đắt-z hi lúk lai-k?',
      meaningA: 'Anh ấy trông như thế nào?',
      speakerB: 'Lucy',
      avatarB: '👱‍♀️',
      textB: "He's tall.",
      ipaB: '/hiːz tɔːl/',
      readingB: 'Hi-z thon (cao ráo).',
      meaningB: 'Anh ấy cao ráo.',
      context: 'Lucy nhớ đến hình ảnh anh trai cao ráo đang đeo balo đi dạo.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 22) - 4 ADJECTIVES
  // a: tall, b: short, c: slim, d: big
  // =========================================================================
  const appearanceCards = [
    {
      id: 'app_a',
      key: 'a',
      title: 'tall',
      ipa: '/tɔːl/',
      reading: 'thon (âm o sâu, uốn lưỡi âm l)',
      meaningVi: 'cao ráo, cao lớn',
      gender: 'she',
      pronoun: "She's",
      question: 'What does she look like?',
      answer: "She's tall.",
      answerIpa: '/ʃiːz tɔːl/',
      answerReading: 'Shi-z thon.',
      icon: '🦒',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      desc: 'Dáng người cao ráo vượt trội so với bạn bè'
    },
    {
      id: 'app_b',
      key: 'b',
      title: 'short',
      ipa: '/ʃɔːt/',
      reading: 'sho-t (tròn môi âm sh, bật âm t)',
      meaningVi: 'thấp, nhỏ bé hoặc lùn',
      gender: 'he',
      pronoun: "He's",
      question: 'What does he look like?',
      answer: "He's short.",
      answerIpa: '/hiːz ʃɔːt/',
      answerReading: 'Hi-z sho-t.',
      icon: '🧒',
      badge: 'bg-blue-600',
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      desc: 'Vóc dáng nhỏ nhắn, chiều cao khiêm tốn dễ thương'
    },
    {
      id: 'app_c',
      key: 'c',
      title: 'slim',
      ipa: '/slɪm/',
      reading: 's-lim (âm s nhẹ, lim gọn gàng)',
      meaningVi: 'thon thả, mảnh mai, cân đối',
      gender: 'she',
      pronoun: "She's",
      question: 'What does she look like?',
      answer: "She's slim.",
      answerIpa: '/ʃiːz slɪm/',
      answerReading: 'Shi-z s-lim.',
      icon: '💃',
      badge: 'bg-purple-600',
      color: 'border-purple-300 bg-purple-50/50 text-purple-900',
      desc: 'Dáng người thon gọn, duyên dáng và thanh thoát'
    },
    {
      id: 'app_d',
      key: 'd',
      title: 'big',
      ipa: '/bɪɡ/',
      reading: 'bích-g (âm i ngắn, bật âm g nhẹ)',
      meaningVi: 'to lớn, vạm vỡ, mập mạp',
      gender: 'he',
      pronoun: "He's",
      question: 'What does he look like?',
      answer: "He's big.",
      answerIpa: '/hiːz bɪɡ/',
      answerReading: 'Hi-z bích-g.',
      icon: '🏋️',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      desc: 'Vóc dáng to lớn, mũm mĩm hoặc cơ bắp vạm vỡ'
    }
  ];

  const [activeCardId, setActiveCardId] = useState<string>('app_a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 23) - 2 ITEMS
  // =========================================================================
  interface ListenTickItem {
    id: number;
    title: string;
    audioScript: string;
    ipa: string;
    reading: string;
    options: {
      key: 'a' | 'b';
      label: string;
      desc: string;
      icon: string;
    }[];
    correctAnswer: 'a' | 'b';
    userChoice: 'a' | 'b' | null;
    explanation: string;
  }

  const [listenTickList, setListenTickList] = useState<ListenTickItem[]>([
    {
      id: 1,
      title: 'Câu 1: What does she look like?',
      audioScript: 'What does she look like? - She’s slim.',
      ipa: '/wɒt dʌz ʃiː lʊk laɪk? - ʃiːz slɪm/',
      reading: 'Oát đắt-z shi lúk lai-k? - Shi-z s-lim.',
      options: [
        { key: 'a', label: 'slim and tall', desc: 'Người phụ nữ thon thả, dáng cao', icon: '💃' },
        { key: 'b', label: 'short and big', desc: 'Người phụ nữ mập mạp, thấp bé', icon: '🙍‍♀️' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Bài nghe nói rõ: "She’s slim" (Cô ấy thon thả) -> Đáp án đúng là tranh a.'
    },
    {
      id: 2,
      title: 'Câu 2: What does he look like?',
      audioScript: 'What does he look like? - He’s tall.',
      ipa: '/wɒt dʌz hiː lʊk laɪk? - hiːz tɔːl/',
      reading: 'Oát đắt-z hi lúk lai-k? - Hi-z thon.',
      options: [
        { key: 'a', label: 'tall', desc: 'Cậu bé mặc áo thể thao dáng cao ráo', icon: '⚽' },
        { key: 'b', label: 'short', desc: 'Cậu bé mũm mĩm thấp bé ôm quả bóng', icon: '👦' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Bài nghe nói rõ: "He’s tall" (Cậu ấy cao) -> Đáp án đúng là tranh a.'
    }
  ]);
  const [listenTickSubmitted, setListenTickSubmitted] = useState<boolean>(false);

  const handleSelectListenTick = (id: number, key: 'a' | 'b') => {
    sound.playClick();
    setListenTickList(prev => prev.map(item => (item.id === id ? { ...item, userChoice: key } : item)));
  };

  const handleCheckListenTick = () => {
    const allDone = listenTickList.every(i => i.userChoice !== null);
    if (!allDone) {
      alert('Em hãy chọn đáp án cho cả 2 câu trước nhé!');
      return;
    }
    const correctCount = listenTickList.filter(i => i.userChoice === i.correctAnswer).length;
    setListenTickSubmitted(true);
    if (correctCount === 2) {
      sound.playVictory();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [fillInputs, setFillInputs] = useState({
    q1: '',
    q2: '',
    q3_look: '',
    q3_big: '',
    q4_what: '',
    q4_slim: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  const handleCheckFill = () => {
    setFillChecked(true);
    sound.playVictory();
    onAddStar(5);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING: "WHAT DO YOUR PARENTS LOOK LIKE?" (TRACK 24)
  // =========================================================================
  const songLyrics = [
    {
      title: 'Khổ 1: Về mẹ (Your mum)',
      lines: [
        { en: 'Your mum, your mum.', ipa: '/jɔː mʌm, jɔː mʌm/', vi: 'Mẹ của bạn, mẹ của bạn.' },
        { en: 'What does she look like?', ipa: '/wɒt dʌz ʃiː lʊk laɪk/', vi: 'Bác ấy trông như thế nào?' },
        { en: "She's slim.", ipa: '/ʃiːz slɪm/', vi: 'Bác ấy thon thả.' },
        { en: "She's tall.", ipa: '/ʃiːz tɔːl/', vi: 'Bác ấy cao ráo.' },
        { en: "She's slim and tall.", ipa: '/ʃiːz slɪm ænd tɔːl/', vi: 'Bác ấy vừa thon thả lại vừa cao ráo.' }
      ]
    },
    {
      title: 'Khổ 2: Về bố (Your dad)',
      lines: [
        { en: 'Your dad, your dad.', ipa: '/jɔː dæd, jɔː dæd/', vi: 'Bố của bạn, bố của bạn.' },
        { en: 'What does he look like?', ipa: '/wɒt dʌz hiː lʊk laɪk/', vi: 'Bác ấy trông như thế nào?' },
        { en: "He's big.", ipa: '/hiːz bɪɡ/', vi: 'Bác ấy to lớn.' },
        { en: "He's tall.", ipa: '/hiːz tɔːl/', vi: 'Bác ấy cao lớn.' },
        { en: "He's big and tall.", ipa: '/hiːz bɪɡ ænd tɔːl/', vi: 'Bác ấy vừa to lớn lại vừa cao.' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Grammar Spotlight */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cấu Trúc Trọng Tâm Unit 13 · Tiết 1
          </span>
          <span className="text-xs text-purple-100 font-bold">Trang 18 - 19 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Hỏi Và Miêu Tả Vóc Dáng (What does he / she look like?)
        </h2>

        {/* Grammar Tip Box */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl space-y-2">
          <p className="text-base font-extrabold text-yellow-300">
            What does he / she look like? - He&apos;s / She&apos;s + [tính từ vóc dáng]
          </p>
          <div className="text-xs text-purple-100 leading-relaxed space-y-1">
            <p>
              💡 <strong>Quy tắc quan trọng:</strong> Khi miêu tả <strong>vóc dáng toàn thân</strong> (cao, thấp, gầy, mập), ta dùng động từ to-be: <strong>He&apos;s / She&apos;s</strong> (He is / She is).
            </p>
            <p className="font-semibold text-yellow-200">
              Ví dụ: He&apos;s tall. / She&apos;s slim. / He&apos;s big. / She&apos;s short.
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
          { id: 4, label: '4. Listen & tick', icon: '✔️' },
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
                ? 'bg-purple-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 21) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                  Hoạt Động 1 · Trang 18
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 21 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát tranh và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Minh: Do you have a brother, Lucy? Lucy: Yes, I do. Minh: What does he look like? Lucy: He is tall.';
                speakWord(fullText, speechRate);
              }}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-purple-700" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-purple-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dialog.context}</span>
                </div>

                {/* Speaker A */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-purple-700 flex items-center gap-1">
                      <span>{dialog.avatarA}</span> {dialog.speakerA}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textA, speechRate)}
                      className="p-1 text-slate-400 hover:text-purple-600 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {dialog.textA}
                  </p>
                  <p className="text-[11px] font-mono text-purple-700 font-bold">
                    🗣️ {dialog.ipaA}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingA}&quot;
                  </p>
                  <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                    {dialog.meaningA}
                  </p>
                </div>

                {/* Speaker B */}
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-purple-900 flex items-center gap-1">
                      <span>{dialog.avatarB}</span> {dialog.speakerB}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textB, speechRate)}
                      className="p-1 text-slate-400 hover:text-purple-700 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-purple-950 text-sm md:text-base leading-snug">
                    {dialog.textB}
                  </p>
                  <p className="text-[11px] font-mono text-purple-700 font-bold">
                    🗣️ {dialog.ipaB}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingB}&quot;
                  </p>
                  <p className="text-xs text-purple-800/80 italic pt-1 border-t border-purple-200">
                    {dialog.meaningB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 22) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                  Hoạt Động 2 · Trang 18
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 22 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Chỉ tranh và luyện nói về vóc dáng)
              </h3>
            </div>
            <div className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              Cấu trúc: What does he/she look like? - He&apos;s / She&apos;s...
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {appearanceCards.map(item => {
              const isActive = activeCardId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveCardId(item.id);
                    speakWord(`${item.question} ${item.answer}`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-purple-500 bg-purple-50/60 shadow-md ring-2 ring-purple-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                        {item.key}
                      </span>
                      <span className="text-3xl">{item.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {item.title}
                    </h4>

                    {/* IPA + Reading */}
                    <p className="text-[11px] font-mono text-purple-700 font-bold mb-0.5">
                      🗣️ {item.ipa}
                    </p>
                    <p className="text-[11px] text-indigo-700 font-semibold mb-2">
                      📖 {item.reading}
                    </p>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {item.meaningVi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-500 italic block">{item.desc}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(`${item.question} ${item.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
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
              const cur = appearanceCards.find(c => c.id === activeCardId);
              if (!cur) return null;
              return (
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cặp câu hỏi và trả lời hoàn chỉnh ({cur.key}):
                  </span>
                  <p className="text-base font-extrabold text-slate-800">
                    A: {cur.question} ➔ B:{' '}
                    <span className="text-purple-700 underline font-black">{cur.answer}</span>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Phát âm: &quot;Oát đắt-z {cur.gender} lúk lai-k?&quot; ➔ &quot;{cur.answerReading}&quot;)
                  </p>
                </div>
              );
            })()}
            <button
              onClick={() => {
                const cur = appearanceCards.find(c => c.id === activeCardId);
                if (cur) speakWord(`${cur.question} ${cur.answer}`, speechRate);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <Volume2 className="w-4 h-4" /> Phát âm mẫu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND TICK (TRACK 23) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                  Hoạt Động 4 · Trang 19
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 23 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick 🎧 (Nghe và chọn bức tranh đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckListenTick}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra đáp án
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setListenTickList(prev => prev.map(i => ({ ...i, userChoice: null })));
                  setListenTickSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {listenTickList.map((item, idx) => {
              const isCorrect = item.userChoice === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-4 ${
                    listenTickSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {item.title}
                    </span>
                    <button
                      onClick={() => speakWord(item.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-700" /> Nghe Audio Track 23
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.options.map(opt => {
                      const isSelected = item.userChoice === opt.key;
                      const isAnswerKey = item.correctAnswer === opt.key;

                      let optStyle =
                        'border-slate-200 bg-white text-slate-800 hover:border-purple-300';
                      if (isSelected && !listenTickSubmitted) {
                        optStyle = 'border-purple-500 bg-purple-50 text-purple-950 font-bold shadow-xs';
                      }
                      if (listenTickSubmitted) {
                        if (isAnswerKey) {
                          optStyle =
                            'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-400';
                        } else if (isSelected && !isAnswerKey) {
                          optStyle = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectListenTick(item.id, opt.key)}
                          className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition ${optStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {opt.key.toUpperCase()}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 font-extrabold text-sm">
                              <span>{opt.icon}</span>
                              <span>{opt.label}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {listenTickSubmitted && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-800">{item.explanation}</p>
                      <p className="text-slate-500 italic">
                        Lời thoại: &quot;{item.audioScript}&quot;
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LET'S SING: "WHAT DO YOUR PARENTS LOOK LIKE?" (TRACK 24) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 19
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Let&apos;s sing: &quot;What do your parents look like?&quot; 🎵
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Cùng hát bài hát sôi động về vóc dáng của bố mẹ: slim, tall, big!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 border-2 border-purple-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">👨‍👩‍👧‍👦 🎶</div>

            {songLyrics.map((verse, vIdx) => (
              <div key={vIdx} className="space-y-3 text-left bg-white/70 p-4 rounded-2xl border border-purple-100">
                <span className="text-xs font-black text-purple-700 uppercase tracking-wider block">
                  {verse.title}
                </span>
                {verse.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-purple-600 transition">
                    <p className="font-extrabold text-sm md:text-base text-slate-900">{line.en}</p>
                    <p className="text-[11px] font-mono text-purple-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-slate-500 italic">{line.vi}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => {
                const song =
                  'Your mum, your mum. What does she look like? She is slim. She is tall. She is slim and tall. Your dad, your dad. What does he look like? He is big. He is tall. He is big and tall.';
                speakWord(song, speechRate * 0.95);
                onAddStar(3);
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát Karaoke &quot;What do your parents look like?&quot; 🎤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
