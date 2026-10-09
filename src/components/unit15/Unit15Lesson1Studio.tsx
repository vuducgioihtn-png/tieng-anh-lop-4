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
  Dumbbell,
  ShoppingBag,
  Film,
  Waves,
  Music,
  MapPin,
  CheckSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit15Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit15Lesson1Studio: React.FC<Unit15Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 41)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Lucy',
      avatarA: '👱‍♀️',
      textA: 'Where does your father go on Saturdays?',
      ipaA: '/weə dʌz jɔː ˈfɑːðə ɡəʊ ɒn ˈsætədeɪz/',
      readingA: 'We-ơ đắt-z do pha-đờ gâu on Sa-tơ-đây-z?',
      meaningA: 'Bố của bạn thường đi đâu vào các ngày thứ Bảy?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'He goes to the gym.',
      ipaB: '/hiː ɡəʊz tuː ðə dʒɪm/',
      readingB: 'Hi gâu-z tu đờ dim.',
      meaningB: 'Bố tớ đi tới phòng tập thể hình (phòng gym).',
      context: 'Lucy và Mai đang ngồi ghế đá ở trường trò chuyện về cuối tuần của gia đình.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Lucy',
      avatarA: '👱‍♀️',
      textA: 'What about your mother? Where does she go on Saturdays?',
      ipaA: '/wɒt əˈbaʊt jɔː ˈmʌðə? weə dʌz ʃiː ɡəʊ ɒn ˈsætədeɪz/',
      readingA: 'Oát ơ-bao-t do ma-đờ? We-ơ đắt-z shi gâu on Sa-tơ-đây-z?',
      meaningA: 'Còn mẹ bạn thì sao? Mẹ bạn đi đâu vào các ngày thứ Bảy?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'She goes to the shopping centre.',
      ipaB: '/ʃiː ɡəʊz tuː ðə ˈʃɒpɪŋ ˈsentə/',
      readingB: 'Shi gâu-z tu đờ sho-ping sen-tờ.',
      meaningB: 'Mẹ tớ đi tới trung tâm mua sắm (trung tâm thương mại).',
      context: 'Mai vui vẻ khoe mẹ thích đi mua sắm ở trung tâm thương mại vào thứ Bảy.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 42) - 4 PLACES
  // a: sports centre, b: shopping centre, c: swimming pool, d: cinema
  // =========================================================================
  const placesCards = [
    {
      id: 'pl_a',
      key: 'a',
      placeEn: 'sports centre',
      ipa: '/spɔːts ˈsentə/',
      reading: 's-po-t-s sen-tờ (nhấn sen)',
      meaningVi: 'trung tâm thể thao',
      personPronoun: 'He',
      question: 'Where does he go on Saturdays?',
      answer: 'He goes to the sports centre.',
      answerIpa: '/hiː ɡəʊz tuː ðə spɔːts ˈsentə/',
      answerReading: 'Hi gâu-z tu đờ s-po-t-s sen-tờ.',
      icon: '🏟️',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-950',
      desc: 'Nơi tập luyện thể thao, chơi bóng rổ, tennis, cầu lông'
    },
    {
      id: 'pl_b',
      key: 'b',
      placeEn: 'shopping centre',
      ipa: '/ˈʃɒpɪŋ ˈsentə/',
      reading: 'sho-ping sen-tờ',
      meaningVi: 'trung tâm mua sắm, siêu thị lớn',
      personPronoun: 'She',
      question: 'Where does she go on Saturdays?',
      answer: 'She goes to the shopping centre.',
      answerIpa: '/ʃiː ɡəʊz tuː ðə ˈʃɒpɪŋ ˈsentə/',
      answerReading: 'Shi gâu-z tu đờ sho-ping sen-tờ.',
      icon: '🏬',
      badge: 'bg-rose-600',
      color: 'border-rose-300 bg-rose-50/50 text-rose-950',
      desc: 'Nơi có nhiều cửa hàng quần áo, thang cuốn mua sắm tiện nghi'
    },
    {
      id: 'pl_c',
      key: 'c',
      placeEn: 'swimming pool',
      ipa: '/ˈswɪmɪŋ puːl/',
      reading: 's-uym-ming pul (kéo dài âm u)',
      meaningVi: 'bể bơi, hồ bơi',
      personPronoun: 'He',
      question: 'Where does he go on Saturdays?',
      answer: 'He goes to the swimming pool.',
      answerIpa: '/hiː ɡəʊz tuː ðə ˈswɪmɪŋ puːl/',
      answerReading: 'Hi gâu-z tu đờ s-uym-ming pul.',
      icon: '🏊‍♂️',
      badge: 'bg-cyan-600',
      color: 'border-cyan-300 bg-cyan-50/50 text-cyan-950',
      desc: 'Hồ bơi trong xanh để rèn luyện sức khỏe và bơi lội mát mẻ'
    },
    {
      id: 'pl_d',
      key: 'd',
      placeEn: 'cinema',
      ipa: '/ˈsɪnəmə/',
      reading: 'xi-nơ-mơ (nhấn xi)',
      meaningVi: 'rạp chiếu phim',
      personPronoun: 'She',
      question: 'Where does she go on Saturdays?',
      answer: 'She goes to the cinema.',
      answerIpa: '/ʃiː ɡəʊz tuː ðə ˈsɪnəmə/',
      answerReading: 'Shi gâu-z tu đờ xi-nơ-mơ.',
      icon: '🎬',
      badge: 'bg-purple-600',
      color: 'border-purple-300 bg-purple-50/50 text-purple-950',
      desc: 'Rạp chiếu phim màn hình lớn, đeo kính 3D xem phim bom tấn'
    }
  ];

  const [selectedPlaceKey, setSelectedPlaceKey] = useState<string>('a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 43)
  // 1: a (cinema) vs b (swimming pool) -> Audio: 1. She goes to the cinema. (a)
  // 2: a (shopping centre) vs b (gym) -> Audio: 2. She goes to the gym. (b)
  // =========================================================================
  const tickItems = [
    {
      id: 1,
      title: 'Câu 1 (Track 43)',
      audioText: 'Where does your sister go on Saturdays? - She goes to the cinema.',
      audioIpa: '/weə dʌz jɔː ˈsɪstə ɡəʊ ɒn ˈsætədeɪz? - ʃiː ɡəʊz tuː ðə ˈsɪnəmə/',
      reading: 'Chị bạn đi đâu vào thứ Bảy? - Chị ấy đi rạp chiếu phim.',
      options: [
        { key: 'a', label: 'a. Rạp chiếu phim (cinema)', icon: '🎬', isCorrect: true },
        { key: 'b', label: 'b. Bể bơi (swimming pool)', icon: '🏊‍♀️', isCorrect: false }
      ],
      correctKey: 'a',
      explanation: 'Audio đọc: "She goes to the cinema." -> Bức tranh đeo kính 3D xem phim là đáp án a.'
    },
    {
      id: 2,
      title: 'Câu 2 (Track 43)',
      audioText: 'Where does your mother go on Saturdays? - She goes to the gym.',
      audioIpa: '/weə dʌz jɔː ˈmʌðə ɡəʊ ɒn ˈsætədeɪz? - ʃiː ɡəʊz tuː ðə dʒɪm/',
      reading: 'Mẹ bạn đi đâu vào thứ Bảy? - Mẹ tớ đi tới phòng tập gym.',
      options: [
        { key: 'a', label: 'a. Trung tâm mua sắm (shopping centre)', icon: '🛍️', isCorrect: false },
        { key: 'b', label: 'b. Phòng tập gym (gym)', icon: '🏋️‍♀️', isCorrect: true }
      ],
      correctKey: 'b',
      explanation: 'Audio đọc: "She goes to the gym." -> Bức tranh tập tạ ở phòng gym là đáp án b.'
    }
  ];

  const [userTickAnswers, setUserTickAnswers] = useState<{ [key: number]: string | null }>({
    1: null,
    2: null
  });

  const handleSelectTick = (itemId: number, key: string) => {
    setUserTickAnswers(prev => ({ ...prev, [itemId]: key }));
    const item = tickItems.find(t => t.id === itemId);
    if (item && item.correctKey === key) {
      sound.playCorrect();
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const completeItems = [
    {
      id: 1,
      imageNote: 'Bé trai bơi ở bể bơi',
      pre: 'My brother goes to the',
      blank: 'swimming pool',
      post: 'on Saturdays.',
      full: 'My brother goes to the swimming pool on Saturdays.',
      ipa: '/maɪ ˈbrʌðə ɡəʊz tuː ðə ˈswɪmɪŋ puːl ɒn ˈsætədeɪz/',
      reading: 'Mai bra-đờ gâu-z tu đờ s-uym-ming pul on Sa-tơ-đây-z.',
      vi: 'Em trai tớ đi đến hồ bơi vào các ngày thứ Bảy.'
    },
    {
      id: 2,
      imageNote: 'Bé gái đeo kính 3D xem phim',
      pre: 'My sister goes to the',
      blank: 'cinema',
      post: 'on Saturdays.',
      full: 'My sister goes to the cinema on Saturdays.',
      ipa: '/maɪ ˈsɪstə ɡəʊz tuː ðə ˈsɪnəmə ɒn ˈsætədeɪz/',
      reading: 'Mai xít-stơ gâu-z tu đờ xi-nơ-mơ on Sa-tơ-đây-z.',
      vi: 'Chị gái tớ đi rạp chiếu phim vào các ngày thứ Bảy.'
    },
    {
      id: 3,
      imageNote: 'Bố chơi thể thao (cầu lông/tennis) ở trung tâm thể thao',
      q: 'Where does your father go on Saturdays?',
      pre: 'He',
      blank: 'goes to the sports centre',
      post: '.',
      full: 'He goes to the sports centre.',
      ipa: '/hiː ɡəʊz tuː ðə spɔːts ˈsentə/',
      reading: 'Hi gâu-z tu đờ s-po-t-s sen-tờ.',
      vi: 'Bố tớ đi tới trung tâm thể thao.'
    },
    {
      id: 4,
      imageNote: 'Mẹ xách túi mua sắm ở trung tâm mua sắm',
      qPre: '',
      qBlank: 'Where',
      qPost: 'does your mother go on Saturdays?',
      pre: 'She',
      blank: 'goes to the shopping centre',
      post: '.',
      full: 'Where does your mother go on Saturdays? She goes to the shopping centre.',
      ipa: '/weə dʌz jɔː ˈmʌðə ɡəʊ ɒn ˈsætədeɪz? ʃiː ɡəʊz tuː ðə ˈʃɒpɪŋ ˈsentə/',
      reading: 'We-ơ đắt-z do ma-đờ gâu on Sa-tơ-đây-z? Shi gâu-z tu đờ sho-ping sen-tờ.',
      vi: 'Mẹ bạn đi đâu vào thứ Bảy? Mẹ đi trung tâm mua sắm.'
    }
  ];

  const [revealedComplete, setRevealedComplete] = useState<{ [key: number]: boolean }>({});

  const toggleRevealComplete = (id: number) => {
    sound.playClick();
    setRevealedComplete(prev => {
      const next = !prev[id];
      if (next) onAddStar(1);
      return { ...prev, [id]: next };
    });
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 44)
  // "Where do they go on Saturdays?"
  // =========================================================================
  const songLyrics = [
    {
      title: 'Khổ 1: Bố & Mẹ đi đâu vào thứ Bảy? 🏟️ 🏬',
      lines: [
        { en: 'Where does your father go on Saturdays?', ipa: '/weə dʌz jɔː ˈfɑːðə ɡəʊ ɒn ˈsætədeɪz/', vi: 'Bố bạn đi đâu vào thứ Bảy?' },
        { en: 'He goes to the sports centre.', ipa: '/hiː ɡəʊz tuː ðə spɔːts ˈsentə/', vi: 'Bố đi tới trung tâm thể thao.' },
        { en: 'Where does your mother go on Saturdays?', ipa: '/weə dʌz jɔː ˈmʌðə ɡəʊ ɒn ˈsætədeɪz/', vi: 'Mẹ bạn đi đâu vào thứ Bảy?' },
        { en: 'She goes to the shopping centre.', ipa: '/ʃiː ɡəʊz tuː ðə ˈʃɒpɪŋ ˈsentə/', vi: 'Mẹ đi tới trung tâm mua sắm.' }
      ]
    },
    {
      title: 'Khổ 2: Anh trai & Chị gái đi đâu vào thứ Bảy? 🎬 🏊‍♀️',
      lines: [
        { en: 'Where does your brother go on Saturdays?', ipa: '/weə dʌz jɔː ˈbrʌðə ɡəʊ ɒn ˈsætədeɪz/', vi: 'Anh/em trai bạn đi đâu vào thứ Bảy?' },
        { en: 'He goes to the cinema.', ipa: '/hiː ɡəʊz tuː ðə ˈsɪnəmə/', vi: 'Anh ấy đi tới rạp chiếu phim.' },
        { en: 'Where does your sister go on Saturdays?', ipa: '/weə dʌz jɔː ˈsɪstə ɡəʊ ɒn ˈsætədeɪz/', vi: 'Chị/em gái bạn đi đâu vào thứ Bảy?' },
        { en: 'She goes to the swimming pool.', ipa: '/ʃiː ɡəʊz tuː ðə ˈswɪmɪŋ puːl/', vi: 'Chị ấy đi tới bể bơi.' }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-xl shadow-md">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-800">
                Tiết 1 · Trang 30 - 31 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 41 - Track 44
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Ai Đi Đâu Vào Thứ Bảy (Where does he/she go on Saturdays?)
            </h2>
          </div>
        </div>

        {/* Activities Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Hội Thoại' },
            { id: 2, label: '2. Địa Điểm' },
            { id: 3, label: '3. Luyện Nói' },
            { id: 4, label: '4. Tích Chọn' },
            { id: 5, label: '5. Hoàn Thành' },
            { id: 6, label: '6. Bài Hát' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeSection === act.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 41) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt động 1 · Track 41
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 30 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Nhìn, nghe và nhắc lại) 🎧
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Where does your father go on Saturdays? He goes to the gym. What about your mother? Where does she go on Saturdays? She goes to the shopping centre.';
                speakWord(fullText, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          {/* Grammar Callout Box */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs md:text-sm text-teal-950 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-teal-800">
              <Lightbulb className="w-4 h-4 text-teal-600" /> Ngữ pháp trọng tâm Tiết 1:
            </div>
            <p className="font-bold">
              • Câu hỏi:{' '}
              <span className="text-indigo-700 font-mono">
                Where does + he / she / your father / your mother + go on Saturdays?
              </span>
            </p>
            <p className="font-bold">
              • Câu trả lời:{' '}
              <span className="text-emerald-700 font-mono">
                He / She + goes to the + [địa điểm].
              </span>
            </p>
            <p className="text-teal-800 italic">
              ⚡ Lưu ý: Chủ ngữ ngôi thứ 3 số ít (he, she, my father), động từ &quot;go&quot; thêm đuôi &quot;-es&quot; thành{' '}
              <strong className="text-rose-600 font-mono font-bold">goes</strong> (/ɡəʊz/)!
            </p>
          </div>

          {/* Dialog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-teal-300 transition-all space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 font-black text-xs">
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
                  <div className="space-y-1 bg-teal-50/60 p-3.5 rounded-xl border border-teal-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-teal-800">
                        <span>{dialog.avatarB}</span>
                        <span>{dialog.speakerB}</span>
                      </div>
                      <button
                        onClick={() => speakWord(dialog.textB, speechRate)}
                        className="p-1 hover:bg-teal-100 rounded-lg text-teal-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-teal-950">{dialog.textB}</p>
                    <p className="text-xs font-mono font-bold text-emerald-700">🗣️ {dialog.ipaB}</p>
                    <p className="text-xs text-teal-800 font-medium">📖 {dialog.readingB}</p>
                    <p className="text-xs text-slate-600 italic">👉 {dialog.meaningB}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      speakWord(`${dialog.textA} ... ${dialog.textB}`, speechRate);
                      onAddStar(1);
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
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
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 42) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt động 2 · Track 42
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 30 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (4 địa điểm vui chơi cuối tuần) 🏟️ 🏬 🏊‍♂️ 🎬
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500 italic">
              Bấm vào từng thẻ địa điểm để nghe phát âm &amp; câu trả lời
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {placesCards.map(item => {
              const isSelected = selectedPlaceKey === item.key;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPlaceKey(item.key);
                    speakWord(item.placeEn, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/50 shadow-md ring-2 ring-teal-300 -translate-y-1'
                      : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center uppercase">
                        {item.key}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-base">{item.placeEn}</h4>
                    <p className="text-xs font-mono font-bold text-indigo-700 mt-0.5">🗣️ {item.ipa}</p>
                    <p className="text-xs text-teal-800 font-semibold mt-0.5">📖 {item.reading}</p>
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
            const activePlace = placesCards.find(p => p.key === selectedPlaceKey) || placesCards[0];
            return (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                    Thực Hành Mẫu Câu: {activePlace.placeEn} ({activePlace.meaningVi})
                  </span>
                  <span className="text-2xl">{activePlace.icon}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Question */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-200">Câu hỏi (Question):</span>
                      <button
                        onClick={() => speakWord(activePlace.question, speechRate)}
                        className="p-1 hover:bg-white/20 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black">{activePlace.question}</p>
                    <p className="text-xs text-teal-100 font-mono">/weə dʌz {activePlace.personPronoun.toLowerCase()} ɡəʊ ɒn ˈsætədeɪz/</p>
                    <p className="text-xs text-teal-200 italic">We-ơ đắt-z {activePlace.personPronoun.toLowerCase()} gâu on Sa-tơ-đây-z?</p>
                  </div>

                  {/* Answer */}
                  <div className="bg-white text-slate-900 p-4 rounded-2xl border border-white shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-700">Câu trả lời (Answer):</span>
                      <button
                        onClick={() => {
                          speakWord(activePlace.answer, speechRate);
                          onAddStar(1);
                        }}
                        className="p-1 hover:bg-teal-100 rounded-lg text-teal-700 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black text-teal-950">{activePlace.answer}</p>
                    <p className="text-xs text-indigo-700 font-mono font-bold">{activePlace.answerIpa}</p>
                    <p className="text-xs text-teal-800 font-bold">{activePlace.answerReading}</p>
                    <p className="text-xs text-slate-600 italic">
                      {activePlace.personPronoun === 'He' ? 'Anh/Bố ấy' : 'Cô/Mẹ ấy'} đi tới {activePlace.meaningVi}.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-teal-100">
                    💡 Nhớ đọc &quot;goes to the&quot; (/ɡəʊz tuː ðə/) mượt mà và tự nhiên!
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${activePlace.question} ... ${activePlace.answer}`, speechRate);
                      onAddStar(2);
                    }}
                    className="px-4 py-2 bg-white text-teal-800 hover:bg-teal-50 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt động 3 · Trang 30 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Phản Xạ Hỏi Đáp</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s talk (Luyện hỏi đáp địa điểm các thành viên trong gia đình) 🗣️
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: 'Bố (Father)', place: 'gym', placeVi: 'Phòng gym', icon: '🏋️‍♂️', sentence: 'He goes to the gym.' },
              { role: 'Anh trai (Brother)', place: 'cinema', placeVi: 'Rạp chiếu phim', icon: '🎬', sentence: 'He goes to the cinema.' },
              { role: 'Mẹ (Mother)', place: 'shopping centre', placeVi: 'Trung tâm mua sắm', icon: '🛍️', sentence: 'She goes to the shopping centre.' },
              { role: 'Chị gái (Sister)', place: 'swimming pool', placeVi: 'Hồ bơi', icon: '🏊‍♀️', sentence: 'She goes to the swimming pool.' }
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-md transition-all text-center space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl block mb-2">{card.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-black uppercase">
                    {card.role}
                  </span>
                  <h4 className="font-black text-slate-900 text-base mt-2">{card.placeVi}</h4>
                  <p className="text-xs text-slate-500 mt-1 italic">&quot;{card.sentence}&quot;</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      speakWord(`Where does he go on Saturdays? ${card.sentence}`, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Luyện nói mẫu câu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: LISTEN AND TICK (TRACK 43) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt động 4 · Track 43
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 31 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and tick (Nghe và tích chọn tranh đúng) 🎧✏️
              </h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm nút loa để nghe audio rồi tích chọn tranh a hoặc b
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tickItems.map(item => {
              const currentChoice = userTickAnswers[item.id];
              const isCorrect = currentChoice === item.correctKey;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-teal-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-base">{item.title}</span>
                    <button
                      onClick={() => speakWord(item.audioText, speechRate)}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe Audio {item.id}
                    </button>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {item.options.map(opt => {
                      const isSelected = currentChoice === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectTick(item.id, opt.key)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-2 ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
                          }`}
                        >
                          <span className="text-4xl">{opt.icon}</span>
                          <span className="text-xs font-black">{opt.label}</span>
                          {isSelected && (
                            <span className="text-xs font-extrabold">
                              {isCorrect ? '✓ Đúng!' : '✗ Thử lại'}
                            </span>
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
                        {isCorrect ? '🎉 Chính xác!' : '⚠️ Chưa đúng, cùng nghe lại nhé:'}
                      </p>
                      <p className="italic text-[11px]">{item.explanation}</p>
                      <p className="font-mono text-[11px] text-indigo-700">Audio: {item.audioText}</p>
                    </div>
                  )}
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt động 5 · Trang 31 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Hoàn Thành Câu</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, complete and read (Nhìn tranh và điền từ thích hợp) ✏️
              </h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm &quot;Xem đáp án &amp; Phát âm&quot; để đối chiếu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completeItems.map(item => {
              const isRevealed = revealedComplete[item.id];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-teal-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-black">
                      Câu {item.id}
                    </span>
                    <span className="text-xs text-slate-500 italic">{item.imageNote}</span>
                  </div>

                  <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    {item.q && (
                      <p className="text-xs font-bold text-slate-500">
                        A: {item.q}
                      </p>
                    )}
                    <p className="text-sm md:text-base font-extrabold text-slate-800">
                      {item.pre}{' '}
                      {isRevealed ? (
                        <span className="text-emerald-600 underline font-black decoration-2">
                          {item.blank}
                        </span>
                      ) : (
                        <span className="px-3 py-0.5 bg-teal-100 text-teal-800 rounded font-bold">
                          ______
                        </span>
                      )}{' '}
                      {item.post}
                    </p>
                    <p className="text-xs text-slate-500 italic">👉 {item.vi}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleRevealComplete(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isRevealed
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}
                    </button>

                    <button
                      onClick={() => {
                        speakWord(item.full, speechRate);
                        onAddStar(1);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe cả câu
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 animate-fadeIn">
                      <p className="font-mono text-emerald-700 font-bold">🗣️ {item.ipa}</p>
                      <p className="text-emerald-800 font-semibold">📖 {item.reading}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: LET'S SING (TRACK 44) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-800 inline-block">
              Hoạt động 6 · Track 44 · Trang 31 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Bài hát: &quot;Where do they go on Saturdays?&quot; 🎶
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Giai điệu rộn ràng giúp bé ghi nhớ các địa điểm cuối tuần: sports centre, shopping centre, cinema, swimming pool!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border-2 border-teal-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">👨‍👩‍👧‍👦 🏟️ 🏬 🎬 🏊‍♀️</div>

            {songLyrics.map((verse, vIdx) => (
              <div key={vIdx} className="space-y-3 text-left bg-white/80 p-4 rounded-2xl border border-teal-100 shadow-2xs">
                <span className="text-xs font-black text-teal-700 uppercase tracking-wider block">
                  {verse.title}
                </span>
                {verse.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-teal-600 transition">
                    <p className="font-extrabold text-sm md:text-base text-slate-900">{line.en}</p>
                    <p className="text-[11px] font-mono text-indigo-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-slate-500 italic">{line.vi}</p>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={() => {
                const song =
                  'Where does your father go on Saturdays? He goes to the sports centre. Where does your mother go on Saturdays? She goes to the shopping centre. Where does your brother go on Saturdays? He goes to the cinema. Where does your sister go on Saturdays? She goes to the swimming pool.';
                speakWord(song, speechRate * 0.95);
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-black inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát Karaoke &quot;Where do they go on Saturdays?&quot; 🎤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
