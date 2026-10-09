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
  Gamepad2,
  Film,
  Utensils,
  Dumbbell,
  Sparkle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit15Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit15Lesson2Studio: React.FC<Unit15Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 45)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: 'Where does your father go on Sundays?',
      ipaA: '/weə dʌz jɔː ˈfɑːðə ɡəʊ ɒn ˈsʌndeɪz/',
      readingA: 'We-ơ đắt-z do pha-đờ gâu on Săn-đây-z?',
      meaningA: 'Bố bạn thường đi đâu vào các ngày Chủ nhật?',
      speakerB: 'Linh',
      avatarB: '👧🏻',
      textB: 'He goes to the sports centre.',
      ipaB: '/hiː ɡəʊz tuː ðə spɔːts ˈsentə/',
      readingB: 'Hi gâu-z tu đờ s-po-t-s sen-tờ.',
      meaningB: 'Bố tớ đi tới trung tâm thể thao.',
      context: 'Ben và Linh cùng nhau đi dạo và hỏi về nơi bố Linh hay đến vào Chủ nhật.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: 'What does he do there?',
      ipaA: '/wɒt dʌz hiː duː ðeə/',
      readingA: 'Oát đắt-z hi đu đe-ơ?',
      meaningA: 'Bác ấy làm gì ở đó?',
      speakerB: 'Linh',
      avatarB: '👧🏻',
      textB: 'He plays tennis.',
      ipaB: '/hiː pleɪz ˈtenɪs/',
      readingB: 'Hi plây-z ten-nít-s.',
      meaningB: 'Bố tớ chơi quần vợt (tennis).',
      context: 'Linh chia sẻ sở thích chơi tennis rèn luyện thể lực rất năng động của bố.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 46) - 4 ACTIVITIES
  // a: cooks meals, b: plays tennis, c: watches films, d: does yoga
  // =========================================================================
  const activityCards = [
    {
      id: 'act_a',
      key: 'a',
      actionEn: 'cooks meals',
      ipa: '/kʊks miːlz/',
      reading: 'cúc-ks miu-z (thêm -s sau cook)',
      meaningVi: 'nấu các bữa ăn ngon',
      pronoun: 'She',
      question: 'What does she do on Sundays?',
      answer: 'She cooks meals.',
      answerIpa: '/ʃiː kʊks miːlz/',
      answerReading: 'Shi cúc-ks miu-z.',
      icon: '🍳',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-950',
      desc: 'Nấu những món ăn dinh dưỡng thơm ngon cho cả nhà'
    },
    {
      id: 'act_b',
      key: 'b',
      actionEn: 'plays tennis',
      ipa: '/pleɪz ˈtenɪs/',
      reading: 'plây-z ten-nít-s (thêm -s sau play)',
      meaningVi: 'chơi quần vợt (tennis)',
      pronoun: 'He',
      question: 'What does he do on Sundays?',
      answer: 'He plays tennis.',
      answerIpa: '/hiː pleɪz ˈtenɪs/',
      answerReading: 'Hi plây-z ten-nít-s.',
      icon: '🎾',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-950',
      desc: 'Cầm vợt thi đấu tennis trên sân quần vợt sôi nổi'
    },
    {
      id: 'act_c',
      key: 'c',
      actionEn: 'watches films',
      ipa: '/ˈwɒtʃɪz fɪlmz/',
      reading: 'oát-chiz phim-z (đuôi -es đọc -iz)',
      meaningVi: 'xem phim giải trí',
      pronoun: 'He',
      question: 'What does he do on Sundays?',
      answer: 'He watches films.',
      answerIpa: '/hiː ˈwɒtʃɪz fɪlmz/',
      answerReading: 'Hi oát-chiz phim-z.',
      icon: '🎬',
      badge: 'bg-purple-600',
      color: 'border-purple-300 bg-purple-50/50 text-purple-950',
      desc: 'Ngồi ghế rạp chiếu phim xem những thước phim lôi cuốn'
    },
    {
      id: 'act_d',
      key: 'd',
      actionEn: 'does yoga',
      ipa: '/dʌz ˈjəʊɡə/',
      reading: 'đắt-z dâu-gơ (do biến thành does)',
      meaningVi: 'tập yoga dẻo dai',
      pronoun: 'She',
      question: 'What does she do on Sundays?',
      answer: 'She does yoga.',
      answerIpa: '/ʃiː dʌz ˈjəʊɡə/',
      answerReading: 'Shi đắt-z dâu-gơ.',
      icon: '🧘‍♀️',
      badge: 'bg-rose-600',
      color: 'border-rose-300 bg-rose-50/50 text-rose-950',
      desc: 'Trải thảm tập các động tác yoga thư giãn và khỏe khoắn'
    }
  ];

  const [selectedActKey, setSelectedActKey] = useState<string>('a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND MATCH (TRACK 47)
  // 1: brother -> a (watches films)
  // 2: sister -> b (does yoga)
  // 3: father -> c (plays tennis)
  // 4: mother -> d (cooks meals)
  // =========================================================================
  const matchPersons = [
    {
      id: 1,
      title: '1. Brother (Anh/Em trai)',
      correctActivityKey: 'a',
      correctActivityDesc: 'a. watches films 🎬 (Rạp chiếu phim)',
      audioText: 'Where does your brother go on Sundays? - He goes to the cinema. He watches films.'
    },
    {
      id: 2,
      title: '2. Sister (Chị/Em gái)',
      correctActivityKey: 'b',
      correctActivityDesc: 'b. does yoga 🧘‍♀️ (Tập yoga)',
      audioText: 'What does your sister do on Sundays? - She does yoga.'
    },
    {
      id: 3,
      title: '3. Father (Bố)',
      correctActivityKey: 'c',
      correctActivityDesc: 'c. plays tennis 🎾 (Chơi tennis)',
      audioText: 'Where does your father go on Sundays? - He goes to the sports centre. He plays tennis.'
    },
    {
      id: 4,
      title: '4. Mother (Mẹ)',
      correctActivityKey: 'd',
      correctActivityDesc: 'd. cooks meals 🍳 (Nấu ăn tại nhà)',
      audioText: 'What does your mother do on Sundays? - She cooks meals for the family.'
    }
  ];

  const [userMatchChoices, setUserMatchChoices] = useState<{ [key: number]: string | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const handleSelectPersonMatch = (personId: number, targetKey: string) => {
    setUserMatchChoices(prev => ({ ...prev, [personId]: targetKey }));
    const p = matchPersons.find(item => item.id === personId);
    if (p && p.correctActivityKey === targetKey) {
      sound.playCorrect();
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const act5Items = [
    {
      id: 1,
      part: 'Đoạn 1 (Anh trai chơi tennis)',
      dialog: [
        { speaker: 'A', text: 'Where does your brother go on Sundays?', vi: 'Anh bạn đi đâu vào các ngày Chủ nhật?' },
        { speaker: 'B', pre: 'He goes to the', blank: 'sports centre', post: '.', vi: 'Anh ấy đi tới trung tâm thể thao.' },
        { speaker: 'A', pre: 'What does he', blank: 'do', post: 'there?', vi: 'Anh ấy làm gì ở đó?' },
        { speaker: 'B', pre: 'He plays', blank: 'tennis', post: '.', vi: 'Anh ấy chơi quần vợt.' }
      ],
      fullScript:
        'Where does your brother go on Sundays? He goes to the sports centre. What does he do there? He plays tennis.'
    },
    {
      id: 2,
      part: 'Đoạn 2 (Mẹ nấu ăn ở nhà)',
      dialog: [
        { speaker: 'A', text: 'Where is your mother on Sundays?', vi: 'Mẹ bạn ở đâu vào ngày Chủ nhật?' },
        { speaker: 'B', pre: "She's at", blank: 'home', post: '.', vi: 'Mẹ tớ ở nhà.' },
        { speaker: 'A', pre: '', blank: 'What', post: 'does she do?', vi: 'Mẹ bạn làm gì?' },
        { speaker: 'B', pre: 'She', blank: 'cooks meals', post: '.', vi: 'Mẹ nấu các bữa ăn cho cả nhà.' }
      ],
      fullScript:
        "Where is your mother on Sundays? She's at home. What does she do? She cooks meals."
    }
  ];

  const [revealedAct5, setRevealedAct5] = useState<{ [key: number]: boolean }>({});

  const toggleRevealAct5 = (id: number) => {
    sound.playClick();
    setRevealedAct5(prev => {
      const next = !prev[id];
      if (next) onAddStar(1);
      return { ...prev, [id]: next };
    });
  };

  // =========================================================================
  // ACTIVITY 6: MATCHING GAME (TRÒ CHƠI GHÉP ĐÔI)
  // Pairs:
  // 1: sports centre <-> plays tennis
  // 2: cinema <-> watches films
  // 3: home / kitchen <-> cooks meals
  // 4: gym <-> does yoga
  // =========================================================================
  const matchingPairs = [
    { id: 1, place: 'sports centre 🏟️', action: 'plays tennis 🎾' },
    { id: 2, place: 'cinema 🎬', action: 'watches films 🍿' },
    { id: 3, place: 'kitchen at home 🏡', action: 'cooks meals 🍳' },
    { id: 4, place: 'gym 🏋️‍♂️', action: 'does yoga 🧘‍♀️' }
  ];

  const [revealedGameMatches, setRevealedGameMatches] = useState<boolean>(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                Tiết 2 · Trang 32 - 33 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 45 - Track 47
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Họ Làm Gì Vào Chủ Nhật (What does he/she do on Sundays?)
            </h2>
          </div>
        </div>

        {/* Activities Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Hội Thoại' },
            { id: 2, label: '2. Hoạt Động' },
            { id: 3, label: '3. Luyện Nói' },
            { id: 4, label: '4. Nối Hình' },
            { id: 5, label: '5. Hoàn Thành' },
            { id: 6, label: '6. Matching Game' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeSection === act.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 45) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt động 1 · Track 45
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 32 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Nhìn, nghe và nhắc lại) 🎧
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Where does your father go on Sundays? He goes to the sports centre. What does he do there? He plays tennis.';
                speakWord(fullText, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          {/* Grammar Callout Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-950 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
              <Lightbulb className="w-4 h-4 text-emerald-600" /> Ngữ pháp trọng tâm Tiết 2:
            </div>
            <p className="font-bold">
              • Hỏi làm gì ở đó:{' '}
              <span className="text-indigo-700 font-mono">
                What does he / she do there? (hoặc on Sundays?)
              </span>
            </p>
            <p className="font-bold">
              • Trả lời (động từ thêm -s / -es):{' '}
              <span className="text-teal-700 font-mono">
                He / She + [cooks meals / plays tennis / watches films / does yoga].
              </span>
            </p>
            <p className="text-emerald-800 italic">
              ⚡ Chú ý chia động từ: cook ➔ <strong className="font-mono text-rose-600 font-bold">cooks</strong>, play ➔ <strong className="font-mono text-rose-600 font-bold">plays</strong>, watch ➔ <strong className="font-mono text-rose-600 font-bold">watches</strong>, do ➔ <strong className="font-mono text-rose-600 font-bold">does</strong>!
            </p>
          </div>

          {/* Dialog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-emerald-300 transition-all space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 italic">{dialog.context}</span>
                </div>

                <div className="space-y-4">
                  {/* Speaker A */}
                  <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-700">
                        <span>{dialog.avatarA}</span>
                        <span>{dialog.speakerA}</span>
                      </div>
                      <button
                        onClick={() => speakWord(dialog.textA, speechRate)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{dialog.textA}</p>
                    <p className="text-xs font-mono font-bold text-indigo-600">🗣️ {dialog.ipaA}</p>
                    <p className="text-xs text-indigo-700 font-medium">📖 {dialog.readingA}</p>
                    <p className="text-xs text-slate-500 italic">👉 {dialog.meaningA}</p>
                  </div>

                  {/* Speaker B */}
                  <div className="space-y-1 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                        <span>{dialog.avatarB}</span>
                        <span>{dialog.speakerB}</span>
                      </div>
                      <button
                        onClick={() => speakWord(dialog.textB, speechRate)}
                        className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-emerald-950">{dialog.textB}</p>
                    <p className="text-xs font-mono font-bold text-teal-700">🗣️ {dialog.ipaB}</p>
                    <p className="text-xs text-emerald-800 font-medium">📖 {dialog.readingB}</p>
                    <p className="text-xs text-slate-600 italic">👉 {dialog.meaningB}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      speakWord(`${dialog.textA} ... ${dialog.textB}`, speechRate);
                      onAddStar(1);
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Luyện đọc cả tranh</span>
                    <Play className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 46) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt động 2 · Track 46
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 32 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (4 hoạt động cuối tuần của người thân) 🍳 🎾 🎬 🧘‍♀️
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500 italic">
              Bấm vào từng thẻ để nghe phát âm &amp; câu mẫu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityCards.map(item => {
              const isSelected = selectedActKey === item.key;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedActKey(item.key);
                    speakWord(item.actionEn, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-300 -translate-y-1'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center uppercase">
                        {item.key}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-base">{item.actionEn}</h4>
                    <p className="text-xs font-mono font-bold text-indigo-700 mt-0.5">🗣️ {item.ipa}</p>
                    <p className="text-xs text-emerald-800 font-semibold mt-0.5">📖 {item.reading}</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{item.meaningVi}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-500 italic line-clamp-1">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive QA Board */}
          {(() => {
            const activeAct = activityCards.find(a => a.key === selectedActKey) || activityCards[0];
            return (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                    Thực Hành Hỏi Đáp: {activeAct.actionEn} ({activeAct.meaningVi})
                  </span>
                  <span className="text-2xl">{activeAct.icon}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Question */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-200">Câu hỏi (Question):</span>
                      <button
                        onClick={() => speakWord(activeAct.question, speechRate)}
                        className="p-1 hover:bg-white/20 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black">{activeAct.question}</p>
                    <p className="text-xs text-emerald-100 font-mono">/wɒt dʌz {activeAct.pronoun.toLowerCase()} duː ɒn ˈsʌndeɪz/</p>
                    <p className="text-xs text-emerald-200 italic">Oát đắt-z {activeAct.pronoun.toLowerCase()} đu on Săn-đây-z?</p>
                  </div>

                  {/* Answer */}
                  <div className="bg-white text-slate-900 p-4 rounded-2xl border border-white shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700">Câu trả lời (Answer):</span>
                      <button
                        onClick={() => {
                          speakWord(activeAct.answer, speechRate);
                          onAddStar(1);
                        }}
                        className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black text-emerald-950">{activeAct.answer}</p>
                    <p className="text-xs text-indigo-700 font-mono font-bold">{activeAct.answerIpa}</p>
                    <p className="text-xs text-emerald-800 font-bold">{activeAct.answerReading}</p>
                    <p className="text-xs text-slate-600 italic">
                      {activeAct.pronoun === 'He' ? 'Anh ấy / Bố' : 'Cô ấy / Mẹ'} {activeAct.meaningVi}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-emerald-100">
                    💡 Động từ sau He/She phải chia ngôi: cooks, plays, watches, does!
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${activeAct.question} ... ${activeAct.answer}`, speechRate);
                      onAddStar(2);
                    }}
                    className="px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Nghe cả cặp câu</span>
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S TALK */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt động 3 · Trang 32 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Luyện Nói Thường Ngày</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s talk (Luyện hỏi đáp hoạt động của người thân vào Chủ nhật) 🗣️
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: 'Bố (Father)', action: 'cooks meals', icon: '👨‍🍳', sentence: 'He cooks meals at home.' },
              { role: 'Mẹ (Mother)', action: 'does yoga', icon: '🧘‍♀️', sentence: 'She does yoga.' },
              { role: 'Bé gái (Sister)', action: 'watches films', icon: '🍿', sentence: 'She watches films with 3D glasses.' },
              { role: 'Bố (Father)', action: 'plays tennis', icon: '🎾', sentence: 'He plays tennis at the sports centre.' }
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all text-center space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl block mb-2">{card.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase">
                    {card.role}
                  </span>
                  <h4 className="font-black text-slate-900 text-base mt-2">{card.action}</h4>
                  <p className="text-xs text-slate-500 mt-1 italic">&quot;{card.sentence}&quot;</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      speakWord(`What does he do on Sundays? ${card.sentence}`, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Luyện nói cả câu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: LISTEN AND MATCH (TRACK 47) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt động 4 · Track 47
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 33 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and match (Nghe và nối 4 người với hoạt động) 🎧✏️
              </h3>
            </div>
            <button
              onClick={() => {
                const script =
                  '1. What does your brother do on Sundays? He watches films. 2. What does your sister do on Sundays? She does yoga. 3. Where does your father go on Sundays? He goes to the sports centre. He plays tennis. 4. What does your mother do on Sundays? She cooks meals.';
                speakWord(script, speechRate);
                onAddStar(2);
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5" /> Nghe toàn bộ Track 47
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {matchPersons.map(person => {
              const currentChoice = userMatchChoices[person.id];
              const isCorrect = currentChoice === person.correctActivityKey;
              return (
                <div
                  key={person.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-slate-900 text-sm">{person.title}</span>
                      <button
                        onClick={() => speakWord(person.audioText, speechRate)}
                        className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-600"
                        title="Nghe đoạn này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="text-3xl block">
                        {person.id === 1 ? '👦' : person.id === 2 ? '👧' : person.id === 3 ? '👨' : '👩'}
                      </span>
                    </div>
                  </div>

                  {/* Choose a, b, c, d */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 block text-center">
                      Nối với hoạt động:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { key: 'a', icon: '🎬', label: 'a. films' },
                        { key: 'b', icon: '🧘‍♀️', label: 'b. yoga' },
                        { key: 'c', icon: '🎾', label: 'c. tennis' },
                        { key: 'd', icon: '🍳', label: 'd. meals' }
                      ].map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectPersonMatch(person.id, opt.key)}
                          className={`py-1.5 px-2 rounded-xl font-black text-xs transition border flex items-center justify-center gap-1 ${
                            currentChoice === opt.key
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                          }`}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    {currentChoice !== null && (
                      <p
                        className={`text-[11px] text-center font-bold mt-1 ${
                          isCorrect ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {isCorrect ? `✓ Đúng: ${person.correctActivityDesc}` : `✗ Chưa đúng, hãy nghe lại!`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LOOK, COMPLETE AND READ */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt động 5 · Trang 33 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Hoàn Thành Hội Thoại</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, complete and read (Nhìn tranh và điền từ thích hợp) ✏️
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {act5Items.map(item => {
              const isRevealed = revealedAct5[item.id];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-emerald-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-black">
                      {item.part}
                    </span>
                  </div>

                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    {item.dialog.map((line, lIdx) => (
                      <div key={lIdx} className="text-xs md:text-sm">
                        {line.text ? (
                          <p className="font-extrabold text-slate-800">
                            <span className="text-emerald-700">{line.speaker}: </span>
                            {line.text}
                          </p>
                        ) : (
                          <p className="font-extrabold text-slate-800">
                            <span className="text-emerald-700">{line.speaker}: </span>
                            {line.pre}
                            {isRevealed ? (
                              <span className="text-teal-600 underline font-black decoration-2 mx-1">
                                {line.blank}
                              </span>
                            ) : (
                              <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold mx-1">
                                ______
                              </span>
                            )}
                            {line.post}
                          </p>
                        )}
                        <p className="text-[11px] text-slate-500 italic mt-0.5">👉 {line.vi}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleRevealAct5(item.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isRevealed
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}
                    </button>

                    <button
                      onClick={() => {
                        speakWord(item.fullScript, speechRate);
                        onAddStar(1);
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe cả đoạn
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: MATCHING GAME (TRÒ CHƠI GHÉP ĐÔI) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 inline-block">
              Hoạt động 6 · Trang 33 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Matching Game (Trò chơi ghép cặp Địa Điểm &amp; Hoạt Động) 🎴
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Ví dụ: &quot;My father goes to the sports centre on Sundays. He plays tennis.&quot;
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-center">
              <button
                onClick={() => {
                  sound.playClick();
                  setRevealedGameMatches(!revealedGameMatches);
                  if (!revealedGameMatches) {
                    onAddStar(2);
                    confetti({ particleCount: 35, spread: 60 });
                  }
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-md transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {revealedGameMatches ? 'Ẩn cặp ghép' : 'Lật mở 4 cặp ghép hoàn hảo!'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {matchingPairs.map(pair => (
                <div
                  key={pair.id}
                  className="p-5 rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                      Cặp số {pair.id}
                    </span>
                    <button
                      onClick={() => {
                        speakWord(
                          `He goes to the ${pair.place.replace(/[^\w\s]/gi, '')} and ${pair.action.replace(/[^\w\s]/gi, '')}.`,
                          speechRate
                        );
                      }}
                      className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500">🏢 Địa điểm (Where):</p>
                    <p className="text-base font-black text-slate-900">{pair.place}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500">⚡ Hoạt động (What):</p>
                    <p className="text-base font-black text-emerald-900">{pair.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
