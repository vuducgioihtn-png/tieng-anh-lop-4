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
  Presentation,
  CheckSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit14Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit14Lesson3Studio: React.FC<Unit14Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 38) - PHONICS "tch" /tʃ/ vs "sh" /ʃ/
  // =========================================================================
  const phonicsPairs = [
    {
      id: 'tch_sound',
      letters: 'tch',
      soundIpa: '/tʃ/',
      soundReading: 'bật đầu lưỡi dứt khoát như âm "ch" tiếng Việt nhưng giòn hơn',
      word: 'watch',
      wordIpa: '/wɒtʃ/',
      wordReading: 'oát-ch (bật âm ch cuối)',
      wordMeaning: 'xem (xem TV)',
      sentence: 'When do you watch TV?',
      sentenceIpa: '/wen duː juː wɒtʃ ˌtiːˈviː/',
      sentenceReading: 'Oen đu diu oát-ch Ti-vi?',
      sentenceMeaning: 'Khi nào bạn xem tivi?',
      icon: '📺',
      highlightColor: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-200'
    },
    {
      id: 'sh_sound',
      letters: 'sh',
      soundIpa: '/ʃ/',
      soundReading: 'tròn môi, đưa luồng hơi xì gió liên tục như khi làm động tác "suỵt"',
      word: 'wash',
      wordIpa: '/wɒʃ/',
      wordReading: 'oát-sh (xì gió âm s nặng cuối)',
      wordMeaning: 'giặt, rửa (giặt quần áo, rửa bát)',
      sentence: 'I wash my clothes in the evening.',
      sentenceIpa: '/aɪ wɒʃ maɪ kləʊðz ɪn ði ˈiːvnɪŋ/',
      sentenceReading: 'Ai oát-sh mai clâu-z in đi i-v-ninh.',
      sentenceMeaning: 'Tớ giặt quần áo của mình vào buổi tối.',
      icon: '🧺',
      highlightColor: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 39)
  // 1: When do you watch TV? (a)
  // 2: When does your sister wash the dishes? (a)
  // =========================================================================
  const circleQuestions = [
    {
      id: 1,
      prompt: '1. When do you ________?',
      audioText: 'When do you watch TV?',
      audioIpa: '/wen duː juː wɒtʃ ˌtiːˈviː/',
      options: [
        { key: 'a', text: 'watch TV', label: 'watch TV' },
        { key: 'b', text: 'wash the dishes', label: 'wash the dishes' },
        { key: 'c', text: 'wash your clothes', label: 'wash your clothes' }
      ],
      correctKey: 'a',
      explanation: 'Audio phát âm rõ từ "watch" (/wɒtʃ/) có âm bật "tch" -> Chọn a. watch TV.'
    },
    {
      id: 2,
      prompt: '2. When does your sister ________?',
      audioText: 'When does your sister wash the dishes?',
      audioIpa: '/wen dʌz jɔː ˈsɪstə wɒʃ ðə ˈdɪʃɪz/',
      options: [
        { key: 'a', text: 'wash the dishes', label: 'wash the dishes' },
        { key: 'b', text: 'watch TV', label: 'watch TV' },
        { key: 'c', text: 'wash her clothes', label: 'wash her clothes' }
      ],
      correctKey: 'a',
      explanation: 'Audio nói "wash the dishes" (/wɒʃ ðə ˈdɪʃɪz/) -> Chọn a. wash the dishes.'
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
  // ACTIVITY 3: LET'S CHANT (TRACK 40)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1: Watch TV 📺',
      lines: [
        { en: 'Watch TV, watch TV.', ipa: '/wɒtʃ ˌtiːˈviː, wɒtʃ ˌtiːˈviː/', vi: 'Xem tivi, xem tivi.' },
        { en: 'Do you watch TV?', ipa: '/duː juː wɒtʃ ˌtiːˈviː/', vi: 'Bạn có xem tivi không?' },
        { en: 'Yes, I do. Yes, I do.', ipa: '/jes, aɪ duː. jes, aɪ duː/', vi: 'Có chứ, tớ có.' },
        { en: 'When do you watch TV?', ipa: '/wen duː juː wɒtʃ ˌtiːˈviː/', vi: 'Khi nào bạn xem tivi?' },
        { en: 'In the evening. In the evening.', ipa: '/ɪn ði ˈiːvnɪŋ. ɪn ði ˈiːvnɪŋ/', vi: 'Vào buổi tối. Vào buổi tối.' }
      ]
    },
    {
      title: 'Khổ 2: Wash clothes 🧺',
      lines: [
        { en: 'Wash clothes, wash clothes.', ipa: '/wɒʃ kləʊðz, wɒʃ kləʊðz/', vi: 'Giặt quần áo, giặt quần áo.' },
        { en: 'Do you wash your clothes?', ipa: '/duː juː wɒʃ jɔː kləʊðz/', vi: 'Bạn có giặt quần áo không?' },
        { en: 'Yes, I do. Yes, I do.', ipa: '/jes, aɪ duː. jes, aɪ duː/', vi: 'Có chứ, tớ có.' },
        { en: 'When do you wash your clothes?', ipa: '/wen duː juː wɒʃ jɔː kləʊðz/', vi: 'Khi nào bạn giặt quần áo?' },
        { en: 'In the afternoon. In the afternoon.', ipa: '/ɪn ði ˌɑːftəˈnuːn. ɪn ði ˌɑːftəˈnuːn/', vi: 'Vào buổi chiều. Vào buổi chiều.' }
      ]
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND MATCH
  // Passage: "It is Sunday today. We are at home. I do housework with my parents on Sundays.
  // In the morning, I wash the clothes. In the afternoon, I help my mum with the cooking and clean the floor.
  // In the evening, my dad and I wash the dishes."
  // =========================================================================
  const passageText =
    'It is Sunday today. We are at home. I do housework with my parents on Sundays. In the morning, I wash the clothes. In the afternoon, I help my mum with the cooking and clean the floor. In the evening, my dad and I wash the dishes.';

  const matchingItems = [
    {
      id: 1,
      time: '1. in the morning',
      correctLetters: ['c'],
      matchedDesc: 'c. wash the clothes (Giặt quần áo)'
    },
    {
      id: 2,
      time: '2. in the afternoon',
      correctLetters: ['a', 'd'],
      matchedDesc: 'a. clean the floor & d. help with the cooking (Lau sàn & Giúp nấu ăn)'
    },
    {
      id: 3,
      time: '3. in the evening',
      correctLetters: ['b'],
      matchedDesc: 'b. wash the dishes (Rửa chén bát)'
    }
  ];

  const [revealedMatch, setRevealedMatch] = useState<boolean>(false);

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const [morningAction1, setMorningAction1] = useState('wash the clothes');
  const [morningAction2, setMorningAction2] = useState('clean the floor');
  const [afternoonAction1, setAfternoonAction1] = useState('help my mum with the cooking');
  const [afternoonAction2, setAfternoonAction2] = useState('read books');
  const [eveningAction, setEveningAction] = useState('watch TV');

  // =========================================================================
  // ACTIVITY 6: PROJECT: MY SUNDAY ACTIVITIES
  // =========================================================================
  const [projectChoreChecks, setProjectChoreChecks] = useState<{ [key: string]: boolean }>({
    morning_clothes: true,
    morning_floor: false,
    afternoon_cooking: true,
    afternoon_reading: false,
    evening_dishes: true,
    evening_tv: true
  });

  const toggleChore = (key: string) => {
    sound.playClick();
    setProjectChoreChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800">
                Tiết 3 · Trang 28 - 29 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 38 - Track 40
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Ngữ Âm &quot;tch&quot; vs &quot;sh&quot;, Đọc Hiểu &amp; Dự Án Chủ Nhật
            </h2>
          </div>
        </div>

        {/* Activities Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Phonics' },
            { id: 2, label: '2. Khoanh Tròn' },
            { id: 3, label: '3. Bài Chant' },
            { id: 4, label: '4. Đọc & Nối' },
            { id: 5, label: '5. Tập Viết' },
            { id: 6, label: '6. Dự Án' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeSection === act.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LISTEN AND REPEAT (TRACK 38) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt động 1 · Track 38
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 28 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Phân biệt âm bật &quot;tch&quot; (/tʃ/) và âm suỵt &quot;sh&quot; (/ʃ/) 🗣️
              </h3>
            </div>
            <button
              onClick={() => {
                const text =
                  'tch: watch. When do you watch TV? sh: wash. I wash my clothes in the evening.';
                speakWord(text, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ Track 38
            </button>
          </div>

          {/* Phonics Compare Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phonicsPairs.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border-2 ${item.bgColor} space-y-4 shadow-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono px-3 py-1 bg-white rounded-2xl shadow-xs border">
                      {item.letters}
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
                    <p className="text-xs font-mono font-bold text-indigo-700">🗣️ {item.wordIpa}</p>
                    <p className="text-xs font-semibold text-slate-700">📖 {item.wordReading}</p>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Câu ví dụ trong bài:
                    </span>
                    <p className="text-base font-black text-slate-900">{item.sentence}</p>
                    <p className="text-xs font-mono text-indigo-700 font-bold">{item.sentenceIpa}</p>
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

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 space-y-1">
            <span className="font-extrabold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" /> Mẹo phân biệt không bao giờ quên:
            </span>
            <p>
              • <strong>watch</strong> (/wɒtʃ/): Xem TV thì mắt mở to và miệng bật &quot;tch&quot; giòn tan!
            </p>
            <p>
              • <strong>wash</strong> (/wɒʃ/): Rửa bát, giặt quần áo có xà phòng sủi bọt suỵt suỵt &quot;sh&quot;!
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN AND CIRCLE (TRACK 39) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt động 2 · Track 39
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 28 SGK</span>
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
                  className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-indigo-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">{q.prompt}</span>
                    <button
                      onClick={() => speakWord(q.audioText, speechRate)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
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
                              : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40'
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
                      <p className="font-mono text-[11px] text-indigo-700">Audio: {q.audioText}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S CHANT (TRACK 40) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 inline-block">
              Hoạt động 3 · Track 40 · Trang 28 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Bài Chant: &quot;Watch TV &amp; Wash clothes&quot; 🥁
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Vỗ tay theo nhịp để rèn luyện sự khác biệt giữa hai âm /tʃ/ (watch) và /ʃ/ (wash)
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">📺 👏 🧺 👏</div>

            {chantStanzas.map((stanza, sIdx) => (
              <div key={sIdx} className="space-y-3 text-left bg-white/80 p-4 rounded-2xl border border-indigo-100 shadow-2xs">
                <span className="text-xs font-black text-indigo-700 uppercase tracking-wider block">
                  {stanza.title}
                </span>
                {stanza.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-indigo-600 transition">
                    <p className="font-extrabold text-sm md:text-base text-slate-900">{line.en}</p>
                    <p className="text-[11px] font-mono text-indigo-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-slate-500 italic">{line.vi}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => {
                const chant =
                  'Watch TV, watch TV. Do you watch TV? Yes, I do. Yes, I do. When do you watch TV? In the evening. In the evening. Wash clothes, wash clothes. Do you wash your clothes? Yes, I do. Yes, I do. When do you wash your clothes? In the afternoon. In the afternoon.';
                speakWord(chant, speechRate * 0.95);
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát theo bài Chant 🎤
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: READ AND MATCH */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt động 4 · Trang 29 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Đọc Hiểu Đoạn Văn</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Read and match (Đọc bài văn và nối các mốc thời gian với việc nhà) 📖
              </h3>
            </div>
            <button
              onClick={() => {
                speakWord(passageText, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe đọc cả bài văn
            </button>
          </div>

          {/* Reading Passage Card */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200 text-slate-800 space-y-3">
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" /> Bài đọc Chủ nhật ở nhà:
            </span>
            <p className="text-base md:text-lg font-bold leading-relaxed text-slate-900">
              &quot;It is Sunday today. We are at home. I do housework with my parents on Sundays.{' '}
              <span className="bg-amber-200/80 px-1 rounded">In the morning, I wash the clothes.</span>{' '}
              <span className="bg-orange-200/80 px-1 rounded">
                In the afternoon, I help my mum with the cooking and clean the floor.
              </span>{' '}
              <span className="bg-purple-200/80 px-1 rounded">
                In the evening, my dad and I wash the dishes.
              </span>
              &quot;
            </p>
            <p className="text-xs text-slate-600 italic">
              👉 Hôm nay là Chủ nhật. Chúng tớ ở nhà. Tớ làm việc nhà cùng bố mẹ vào các ngày Chủ nhật. Vào buổi sáng, tớ giặt quần áo. Vào buổi chiều, tớ giúp mẹ nấu ăn và lau sàn nhà. Vào buổi tối, bố và tớ cùng rửa bát.
            </p>
          </div>

          {/* Match rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-600 uppercase">
                Đối chiếu kết quả nối:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setRevealedMatch(!revealedMatch);
                  if (!revealedMatch) onAddStar(2);
                }}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {revealedMatch ? 'Ẩn đáp án' : 'Hiện đáp án nối chuẩn SGK'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchingItems.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-xs space-y-3"
                >
                  <h4 className="font-black text-base text-indigo-900 border-b pb-2">
                    {item.time}
                  </h4>

                  {revealedMatch ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 space-y-1 animate-fadeIn">
                      <p className="font-black text-sm">➡️ Nối với:</p>
                      <p>{item.matchedDesc}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      Bấm &quot;Hiện đáp án nối chuẩn&quot; ở trên để đối chiếu...
                    </p>
                  )}
                </div>
              ))}
            </div>
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Hoạt động 5 · Trang 29 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Tập Viết Về Chủ Nhật Của Em</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s write (Điền việc nhà em làm vào ngày Chủ nhật) ✏️
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 max-w-2xl mx-auto space-y-4">
            <p className="text-sm md:text-base font-extrabold text-slate-800 leading-relaxed">
              I do a lot of housework on Sundays.{' '}
              In the morning, I{' '}
              <input
                type="text"
                value={morningAction1}
                onChange={e => setMorningAction1(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-indigo-700 bg-white w-40 text-center"
              />{' '}
              and{' '}
              <input
                type="text"
                value={morningAction2}
                onChange={e => setMorningAction2(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-indigo-700 bg-white w-36 text-center"
              />
              .{' '}In the afternoon, I{' '}
              <input
                type="text"
                value={afternoonAction1}
                onChange={e => setAfternoonAction1(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-indigo-700 bg-white w-48 text-center"
              />{' '}
              and{' '}
              <input
                type="text"
                value={afternoonAction2}
                onChange={e => setAfternoonAction2(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-indigo-700 bg-white w-32 text-center"
              />
              .{' '}In the evening, I{' '}
              <input
                type="text"
                value={eveningAction}
                onChange={e => setEveningAction(e.target.value)}
                className="px-2 py-0.5 rounded-lg border-2 border-indigo-300 font-bold text-indigo-700 bg-white w-36 text-center"
              />{' '}
              with my family.
            </p>

            <div className="pt-3 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  const fullWriting = `I do a lot of housework on Sundays. In the morning, I ${morningAction1} and ${morningAction2}. In the afternoon, I ${afternoonAction1} and ${afternoonAction2}. In the evening, I ${eveningAction} with my family.`;
                  speakWord(fullWriting, speechRate);
                  onAddStar(2);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" /> Đọc to bài viết của em
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: PROJECT: MY SUNDAY ACTIVITIES */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 inline-block">
              Hoạt động 6 · Dự Án (Project) · Trang 29 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Project: &quot;My Sunday activities&quot; (Thuyết trình việc nhà ngày Chủ nhật) 🎨🎤
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Tích chọn những việc em phụ giúp bố mẹ rồi bấm nghe bài thuyết trình mẫu hoàn hảo!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            {[
              { key: 'morning_clothes', label: 'Morning: wash the clothes 🧺' },
              { key: 'morning_floor', label: 'Morning: clean the floor 🧹' },
              { key: 'afternoon_cooking', label: 'Afternoon: help with cooking 🍳' },
              { key: 'afternoon_reading', label: 'Afternoon: read books 📚' },
              { key: 'evening_dishes', label: 'Evening: wash the dishes 🍽️' },
              { key: 'evening_tv', label: 'Evening: watch TV together 📺' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => toggleChore(item.key)}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between text-xs font-black ${
                  projectChoreChecks[item.key]
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <CheckSquare
                  className={`w-4 h-4 ${
                    projectChoreChecks[item.key] ? 'text-indigo-600' : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-200 max-w-lg mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest block">
              Mẫu câu thuyết trình dự án của em:
            </span>
            <h4 className="text-lg md:text-xl font-black text-indigo-950">
              &quot;On Sundays, I do housework with my family. In the morning, I wash the clothes. In the afternoon, I clean the floor and help with the cooking. In the evening, I wash the dishes!&quot;
            </h4>
            <button
              onClick={() => {
                speakWord(
                  'On Sundays, I do housework with my family. In the morning, I wash the clothes. In the afternoon, I clean the floor and help with the cooking. In the evening, I wash the dishes!',
                  speechRate
                );
                onAddStar(3);
                confetti({ particleCount: 35, spread: 55 });
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
