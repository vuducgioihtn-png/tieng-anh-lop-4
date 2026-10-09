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
  Tv,
  Film,
  Table,
  CheckSquare,
  X
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit15Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit15Lesson3Studio: React.FC<Unit15Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 48) - PHONICS "g" /ɡ/ vs "s" /ʒ/
  // =========================================================================
  const phonicsPairs = [
    {
      id: 'g_sound',
      letter: 'g',
      soundIpa: '/ɡ/',
      soundReading: 'bật nhẹ ở cuống họng, thanh quản hơi rung',
      word: 'go',
      wordIpa: '/ɡəʊ/',
      wordReading: 'gâu (âm g bật nhẹ)',
      wordMeaning: 'đi, di chuyển',
      sentence: 'I go to the cinema on Saturdays.',
      sentenceIpa: '/aɪ ɡəʊ tuː ðə ˈsɪnəmə ɒn ˈsætədeɪz/',
      sentenceReading: 'Ai gâu tu đờ xi-nơ-mơ on Sa-tơ-đây-z.',
      sentenceMeaning: 'Tớ đi rạp chiếu phim vào các ngày thứ Bảy.',
      icon: '🎬',
      bgColor: 'bg-emerald-50 border-emerald-200'
    },
    {
      id: 's_sound',
      letter: 's',
      soundIpa: '/ʒ/',
      soundReading: 'rung mạnh dây thanh quản, môi hơi chu nhẹ như âm "gi" tiếng Pháp',
      word: 'television',
      wordIpa: '/ˈtelɪvɪʒn/',
      wordReading: 'te-li-vi-dần (chữ s đọc là /ʒ/ rung)',
      wordMeaning: 'vô tuyến, tivi',
      sentence: 'We watch television on Sundays.',
      sentenceIpa: '/wiː wɒtʃ ˈtelɪvɪʒn ɒn ˈsʌndeɪz/',
      sentenceReading: 'Ui oát-ch te-li-vi-dần on Săn-đây-z.',
      sentenceMeaning: 'Chúng tớ xem tivi vào các ngày Chủ nhật.',
      icon: '📺',
      bgColor: 'bg-teal-50 border-teal-200'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 49)
  // 1. I go to the cinema on Saturdays. (b)
  // 2. They watch television on Sundays. (b)
  // =========================================================================
  const circleQuestions = [
    {
      id: 1,
      prompt: '1. I ________ on Saturdays.',
      audioText: 'I go to the cinema on Saturdays.',
      audioIpa: '/aɪ ɡəʊ tuː ðə ˈsɪnəmə ɒn ˈsætədeɪz/',
      options: [
        { key: 'a', text: 'watch television' },
        { key: 'b', text: 'go to the cinema' },
        { key: 'c', text: 'go to the shopping centre' }
      ],
      correctKey: 'b',
      explanation: 'Audio phát âm: "I go to the cinema on Saturdays." -> Chọn b. go to the cinema.'
    },
    {
      id: 2,
      prompt: '2. They ________ on Sundays.',
      audioText: 'They watch television on Sundays.',
      audioIpa: '/ðeɪ wɒtʃ ˈtelɪvɪʒn ɒn ˈsʌndeɪz/',
      options: [
        { key: 'a', text: 'go to the sports centre' },
        { key: 'b', text: 'watch television' },
        { key: 'c', text: 'watch films on television' }
      ],
      correctKey: 'b',
      explanation: 'Audio phát âm: "They watch television on Sundays." -> Chọn b. watch television.'
    }
  ];

  const [selectedCircleAnswers, setSelectedCircleAnswers] = useState<{ [key: number]: string | null }>({
    1: null,
    2: null
  });

  const handleSelectCircle = (qId: number, key: string) => {
    setSelectedCircleAnswers(prev => ({ ...prev, [qId]: key }));
    const q = circleQuestions.find(item => item.id === qId);
    if (q && q.correctKey === key) {
      sound.playCorrect();
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 50)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1: Thứ Bảy đi xem phim & chơi thể thao 🎬 🏟️',
      lines: [
        { en: 'Where do you go on Saturdays?', ipa: '/weə duː juː ɡəʊ ɒn ˈsætədeɪz/', vi: 'Bạn đi đâu vào thứ Bảy?' },
        { en: 'I go to the cinema.', ipa: '/aɪ ɡəʊ tuː ðə ˈsɪnəmə/', vi: 'Tớ đi tới rạp chiếu phim.' },
        { en: 'Where does your father go on Saturdays?', ipa: '/weə dʌz jɔː ˈfɑːðə ɡəʊ ɒn ˈsætədeɪz/', vi: 'Bố bạn đi đâu vào thứ Bảy?' },
        { en: 'He goes to the sports centre.', ipa: '/hiː ɡəʊz tuː ðə spɔːts ˈsentə/', vi: 'Bố đi tới trung tâm thể thao.' }
      ]
    },
    {
      title: 'Khổ 2: Chủ Nhật xem tivi ở nhà & đi mua sắm 📺 🛍️',
      lines: [
        { en: 'What do you do on Sundays?', ipa: '/wɒt duː juː duː ɒn ˈsʌndeɪz/', vi: 'Bạn làm gì vào ngày Chủ nhật?' },
        { en: 'I watch television at home.', ipa: '/aɪ wɒtʃ ˈtelɪvɪʒn æt həʊm/', vi: 'Tớ xem tivi tại nhà.' },
        { en: 'What does your mother do on Sundays?', ipa: '/wɒt dʌz jɔː ˈmʌðə duː ɒn ˈsʌndeɪz/', vi: 'Mẹ bạn làm gì vào ngày Chủ nhật?' },
        { en: 'She goes shopping with my sister.', ipa: '/ʃiː ɡəʊz ˈʃɒpɪŋ wɪð maɪ ˈsɪstə/', vi: 'Mẹ đi mua sắm cùng chị tớ.' }
      ]
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND TICK TRUE OR FALSE
  // Passage: "Today is Sunday. Ben and his family do a lot of things on Sundays.
  // His father goes to the sports centre. He plays tennis.
  // His mother goes to the shopping centre.
  // His sister goes to the cinema.
  // Ben stays at home. He watches TV.
  // In the evening, they have a nice meal together."
  // =========================================================================
  const readingPassage =
    'Today is Sunday. Ben and his family do a lot of things on Sundays. His father goes to the sports centre. He plays tennis. His mother goes to the shopping centre. His sister goes to the cinema. Ben stays at home. He watches TV. In the evening, they have a nice meal together.';

  const trueFalseQuestions = [
    {
      id: 1,
      statement: '1. Ben and his family do a lot of things.',
      statementVi: 'Ben và gia đình làm rất nhiều việc vào Chủ nhật.',
      target: 'true',
      explanation: 'Trong bài viết: "Ben and his family do a lot of things on Sundays." -> Đúng (True).'
    },
    {
      id: 2,
      statement: '2. His father plays table tennis.',
      statementVi: 'Bố của bạn ấy chơi bóng bàn.',
      target: 'false',
      explanation: 'Trong bài viết: "He plays tennis." (quần vợt), KHÔNG PHẢI table tennis (bóng bàn) -> Sai (False).'
    },
    {
      id: 3,
      statement: '3. His mother goes shopping.',
      statementVi: 'Mẹ của bạn ấy đi mua sắm.',
      target: 'true',
      explanation: 'Trong bài viết: "His mother goes to the shopping centre." -> Đúng (True).'
    },
    {
      id: 4,
      statement: '4. His sister watches a film at the cinema.',
      statementVi: 'Chị của bạn ấy xem phim ở rạp chiếu phim.',
      target: 'true',
      explanation: 'Trong bài viết: "His sister goes to the cinema." -> Đúng (True).'
    }
  ];

  const [userTFAnswers, setUserTFAnswers] = useState<{ [key: number]: 'true' | 'false' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const handleSelectTF = (qId: number, val: 'true' | 'false') => {
    setUserTFAnswers(prev => ({ ...prev, [qId]: val }));
    const q = trueFalseQuestions.find(item => item.id === qId);
    if (q && q.target === val) {
      sound.playCorrect();
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const [fatherAction, setFatherAction] = useState('goes to the sports centre');
  const [motherAction, setMotherAction] = useState('goes to the shopping centre');
  const [brotherAction, setBrotherAction] = useState('goes to the swimming pool');
  const [maiAction, setMaiAction] = useState('watches television at home');
  const [sundayAction, setSundayAction] = useState('have a nice meal');

  // =========================================================================
  // ACTIVITY 6: PROJECT: MY FAMILY'S WEEKEND ACTIVITIES
  // =========================================================================
  const [tableData, setTableData] = useState({
    fatherWhere: 'sports centre',
    fatherWhat: 'plays tennis',
    motherWhere: 'shopping centre',
    motherWhat: 'goes shopping',
    siblingWhere: 'swimming pool',
    siblingWhat: 'swims',
    iWhere: 'home',
    iWhat: 'watches TV'
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-700 text-white flex items-center justify-center font-black text-xl shadow-md">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-100 text-cyan-800">
                Tiết 3 · Trang 34 - 35 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 48 - Track 50
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Ngữ Âm /ɡ/ vs /ʒ/, Đọc True/False &amp; Bảng Kế Hoạch Cuối Tuần
            </h2>
          </div>
        </div>

        {/* Activities Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Phonics' },
            { id: 2, label: '2. Khoanh Tròn' },
            { id: 3, label: '3. Bài Chant' },
            { id: 4, label: '4. True / False' },
            { id: 5, label: '5. Tập Viết' },
            { id: 6, label: '6. Dự Án Bảng' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeSection === act.id
                  ? 'bg-cyan-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LISTEN AND REPEAT (TRACK 48) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-700 text-white">
                  Hoạt động 1 · Track 48
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 34 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Phân biệt âm /ɡ/ (go) và âm rung /ʒ/ (television) 🗣️
              </h3>
            </div>
            <button
              onClick={() => {
                const text =
                  'g: go. I go to the cinema on Saturdays. s: television. We watch television on Sundays.';
                speakWord(text, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ Track 48
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phonicsPairs.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border-2 ${item.bgColor} space-y-4 shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono px-3 py-1 bg-white rounded-2xl shadow-xs border">
                      {item.letter}
                    </span>
                    <button
                      onClick={() => speakWord(`${item.word}. ${item.sentence}`, speechRate)}
                      className="p-2 bg-white rounded-xl hover:bg-slate-100 text-slate-700 shadow-xs transition"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Cách phát âm âm {item.soundIpa}:
                    </span>
                    <p className="text-xs text-slate-700 italic">👉 {item.soundReading}</p>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-black text-slate-900">
                        {item.word}{' '}
                        <span className="text-sm font-normal text-slate-500">({item.wordMeaning})</span>
                      </h4>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-teal-700">🗣️ {item.wordIpa}</p>
                    <p className="text-xs font-semibold text-slate-700">📖 {item.wordReading}</p>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Câu ví dụ trong bài:
                    </span>
                    <p className="text-base font-black text-slate-900">{item.sentence}</p>
                    <p className="text-xs font-mono text-teal-700 font-bold">{item.sentenceIpa}</p>
                    <p className="text-xs text-slate-600 font-medium">📖 {item.sentenceReading}</p>
                    <p className="text-xs text-slate-500 italic">👉 {item.sentenceMeaning}</p>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      speakWord(item.sentence, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Luyện đọc mẫu câu này
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs md:text-sm text-cyan-950 space-y-1">
            <span className="font-extrabold flex items-center gap-1.5 text-cyan-800">
              <Lightbulb className="w-4 h-4 text-cyan-600" /> Điểm mấu chốt:
            </span>
            <p>
              Chữ &quot;s&quot; trong <strong>television</strong> phát âm là <strong className="font-mono text-rose-600">/ʒ/</strong> (âm rung dây thanh quản), tương tự như trong từ <em>decision, measure, vision</em>!
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN AND CIRCLE (TRACK 49) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-700 text-white">
                  Hoạt động 2 · Track 49
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 34 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and circle (Nghe và khoanh tròn đáp án đúng) 🎧✏️
              </h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm loa để nghe audio rồi chọn đáp án a, b, hoặc c
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {circleQuestions.map(q => {
              const currentChoice = selectedCircleAnswers[q.id];
              const isCorrect = currentChoice === q.correctKey;
              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-cyan-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">{q.prompt}</span>
                    <button
                      onClick={() => speakWord(q.audioText, speechRate)}
                      className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe Câu {q.id}
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map(opt => {
                      const isSelected = currentChoice === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(q.id, opt.key)}
                          className={`w-full p-3 rounded-2xl font-black text-xs md:text-sm transition-all flex items-center justify-between border-2 ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center uppercase">
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isSelected && (
                            <span>{isCorrect ? '✓ Đúng' : '✗ Thử lại'}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {currentChoice && (
                    <div
                      className={`p-3 rounded-2xl text-xs space-y-1 ${
                        isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                      }`}
                    >
                      <p className="font-bold">
                        {isCorrect ? '🎉 Chính xác!' : '⚠️ Chưa đúng, cùng xem giải thích:'}
                      </p>
                      <p className="italic text-[11px]">{q.explanation}</p>
                      <p className="font-mono text-[11px] text-teal-700">Audio: {q.audioText}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S CHANT (TRACK 50) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-800 inline-block">
              Hoạt động 3 · Track 50 · Trang 34 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Bài Chant: &quot;Where do you go on Saturdays?&quot; 🥁
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Vỗ tay nhịp nhàng để ôn tập trọn vẹn cả câu hỏi địa điểm và hoạt động cuối tuần!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border-2 border-cyan-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">🎬 🏟️ 📺 🛍️ 🎵</div>

            {chantStanzas.map((stanza, sIdx) => (
              <div key={sIdx} className="space-y-3 text-left bg-white/80 p-4 rounded-2xl border border-cyan-100 shadow-2xs">
                <span className="text-xs font-black text-cyan-800 uppercase tracking-wider block">
                  {stanza.title}
                </span>
                {stanza.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-cyan-700 transition">
                    <p className="font-extrabold text-sm md:text-base text-slate-900">{line.en}</p>
                    <p className="text-[11px] font-mono text-teal-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-slate-500 italic">{line.vi}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => {
                const chant =
                  'Where do you go on Saturdays? I go to the cinema. Where does your father go on Saturdays? He goes to the sports centre. What do you do on Sundays? I watch television at home. What does your mother do on Sundays? She goes shopping with my sister.';
                speakWord(chant, speechRate * 0.95);
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-2xl text-xs font-black inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát theo bài Chant 🎤
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: READ AND TICK TRUE OR FALSE */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-700 text-white">
                  Hoạt động 4 · Trang 35 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Đọc Hiểu Đúng / Sai</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Read and tick True or False (Đọc và đánh dấu Đúng hay Sai) 📖
              </h3>
            </div>
            <button
              onClick={() => {
                speakWord(readingPassage, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe đọc cả bài văn
            </button>
          </div>

          {/* Reading Passage */}
          <div className="p-6 rounded-3xl bg-cyan-50/70 border-2 border-cyan-200 text-slate-800 space-y-3">
            <span className="text-xs font-black uppercase text-cyan-800 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-700" /> Bài đọc Chủ nhật của gia đình Ben:
            </span>
            <p className="text-base md:text-lg font-bold leading-relaxed text-slate-900">
              &quot;Today is Sunday. Ben and his family do a lot of things on Sundays.{' '}
              <span className="bg-emerald-200/80 px-1 rounded">His father goes to the sports centre. He plays tennis.</span>{' '}
              <span className="bg-pink-200/80 px-1 rounded">His mother goes to the shopping centre.</span>{' '}
              <span className="bg-purple-200/80 px-1 rounded">His sister goes to the cinema.</span>{' '}
              <span className="bg-amber-200/80 px-1 rounded">Ben stays at home. He watches TV.</span>{' '}
              In the evening, they have a nice meal together.&quot;
            </p>
            <p className="text-xs text-slate-600 italic">
              👉 Hôm nay là Chủ nhật. Ben và gia đình làm rất nhiều điều vào Chủ nhật. Bố bạn ấy đi trung tâm thể thao và chơi tennis. Mẹ đi trung tâm mua sắm. Chị gái đi xem phim. Ben ở nhà và xem tivi. Buổi tối cả nhà cùng ăn bữa cơm đầm ấm bên nhau.
            </p>
          </div>

          {/* 4 True/False questions */}
          <div className="space-y-4">
            {trueFalseQuestions.map(q => {
              const currentChoice = userTFAnswers[q.id];
              const isCorrect = currentChoice === q.target;
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-white hover:border-cyan-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-base text-slate-900">{q.statement}</p>
                      <p className="text-xs text-slate-500 italic mt-0.5">👉 {q.statementVi}</p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => handleSelectTF(q.id, 'true')}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition border flex items-center gap-1.5 ${
                          currentChoice === 'true'
                            ? q.target === 'true'
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                              : 'bg-rose-500 text-white border-rose-600'
                            : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> True (Đúng)
                      </button>

                      <button
                        onClick={() => handleSelectTF(q.id, 'false')}
                        className={`px-4 py-2 rounded-xl font-black text-xs transition border flex items-center gap-1.5 ${
                          currentChoice === 'false'
                            ? q.target === 'false'
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                              : 'bg-rose-500 text-white border-rose-600'
                            : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                        }`}
                      >
                        <X className="w-3.5 h-3.5 stroke-[3]" /> False (Sai)
                      </button>
                    </div>
                  </div>

                  {currentChoice && (
                    <div
                      className={`p-3 rounded-2xl text-xs space-y-1 ${
                        isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                      }`}
                    >
                      <p className="font-bold">
                        {isCorrect ? '✓ Đáp án chính xác!' : '✗ Chưa chính xác:'}
                      </p>
                      <p className="italic text-[11px]">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LET'S WRITE */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-700 text-white">
                  Hoạt động 5 · Trang 35 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Tập Viết Đoạn Văn</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s write (Điền hoạt động cuối tuần của gia đình Mai) ✏️
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 max-w-2xl mx-auto space-y-4">
            <p className="text-sm md:text-base font-extrabold text-slate-800 leading-relaxed">
              Mai and her family do a lot of things at the weekend.{' '}
              On Saturdays, her father{' '}
              <input
                type="text"
                value={fatherAction}
                onChange={e => setFatherAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-cyan-400 font-bold text-cyan-800 bg-white w-48 text-center"
              />
              . Her mother{' '}
              <input
                type="text"
                value={motherAction}
                onChange={e => setMotherAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-cyan-400 font-bold text-cyan-800 bg-white w-52 text-center"
              />
              . Her brother{' '}
              <input
                type="text"
                value={brotherAction}
                onChange={e => setBrotherAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-cyan-400 font-bold text-cyan-800 bg-white w-52 text-center"
              />
              . Mai{' '}
              <input
                type="text"
                value={maiAction}
                onChange={e => setMaiAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-cyan-400 font-bold text-cyan-800 bg-white w-52 text-center"
              />
              .{' '}On Sundays, her family{' '}
              <input
                type="text"
                value={sundayAction}
                onChange={e => setSundayAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-cyan-400 font-bold text-cyan-800 bg-white w-36 text-center"
              />{' '}
              together.
            </p>

            <div className="pt-3 flex justify-center">
              <button
                onClick={() => {
                  const fullWriting = `Mai and her family do a lot of things at the weekend. On Saturdays, her father ${fatherAction}. Her mother ${motherAction}. Her brother ${brotherAction}. Mai ${maiAction}. On Sundays, her family ${sundayAction} together.`;
                  speakWord(fullWriting, speechRate);
                  onAddStar(2);
                }}
                className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" /> Đọc to bài viết của em
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: PROJECT: MY FAMILY'S WEEKEND ACTIVITIES */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-800 inline-block">
              Hoạt động 6 · Dự Án (Project) · Trang 35 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Project: &quot;My family&apos;s weekend activities&quot; (Bảng dự án cuối tuần) 📊🎤
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Điền địa điểm &amp; hoạt động của từng thành viên trong gia đình rồi luyện thuyết trình!
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-w-2xl mx-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse rounded-2xl overflow-hidden border border-slate-200">
              <thead className="bg-cyan-800 text-white font-black text-xs uppercase">
                <tr>
                  <th className="p-3">Member (Thành viên)</th>
                  <th className="p-3">Where? (Đi đâu?)</th>
                  <th className="p-3">What? (Làm gì?)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold bg-slate-50">
                <tr>
                  <td className="p-3 text-slate-900">My father</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.fatherWhere}
                      onChange={e => setTableData({ ...tableData, fatherWhere: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.fatherWhat}
                      onChange={e => setTableData({ ...tableData, fatherWhat: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-900">My mother</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.motherWhere}
                      onChange={e => setTableData({ ...tableData, motherWhere: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.motherWhat}
                      onChange={e => setTableData({ ...tableData, motherWhat: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-900">My sister / brother</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.siblingWhere}
                      onChange={e => setTableData({ ...tableData, siblingWhere: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.siblingWhat}
                      onChange={e => setTableData({ ...tableData, siblingWhat: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-900">I (Bản thân em)</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.iWhere}
                      onChange={e => setTableData({ ...tableData, iWhere: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={tableData.iWhat}
                      onChange={e => setTableData({ ...tableData, iWhat: e.target.value })}
                      className="px-2 py-1 rounded-lg border border-slate-300 w-full bg-white font-bold text-teal-800"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-3xl bg-cyan-50 border-2 border-cyan-200 max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-800 uppercase tracking-widest block">
              Mẫu câu thuyết trình của em trước lớp:
            </span>
            <h4 className="text-lg md:text-xl font-black text-cyan-950">
              &quot;On Sundays, my father goes to the {tableData.fatherWhere}. He {tableData.fatherWhat}. My mother goes to the {tableData.motherWhere}. She {tableData.motherWhat}.&quot;
            </h4>
            <button
              onClick={() => {
                const speech = `On Sundays, my father goes to the ${tableData.fatherWhere}. He ${tableData.fatherWhat}. My mother goes to the ${tableData.motherWhere}. She ${tableData.motherWhat}.`;
                speakWord(speech, speechRate);
                onAddStar(3);
                confetti({ particleCount: 35, spread: 55 });
              }}
              className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow transition"
            >
              <Volume2 className="w-4 h-4" /> Luyện phát âm bài thuyết trình
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
