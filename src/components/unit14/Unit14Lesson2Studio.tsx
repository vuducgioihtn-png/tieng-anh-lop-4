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
  Home,
  CheckSquare,
  Users,
  Gamepad2,
  Tv,
  Utensils,
  Shirt,
  Sparkle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit14Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit14Lesson2Studio: React.FC<Unit14Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 35)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: 'What do you do on Sundays, Linh?',
      ipaA: '/wɒt duː juː duː ɒn ˈsʌndeɪz, lɪŋ/',
      readingA: 'Oát đu diu đu on Săn-đây-z, Linh?',
      meaningA: 'Bạn thường làm gì vào các ngày Chủ nhật, Linh?',
      speakerB: 'Linh',
      avatarB: '👧🏻',
      textB: 'I do housework.',
      ipaB: '/aɪ duː ˈhaʊs.wɜːk/',
      readingB: 'Ai đu hao-s-uơ-k.',
      meaningB: 'Tớ làm việc nhà.',
      context: 'Ben và Linh vừa đi dạo ở trường vừa hỏi về kế hoạch ngày Chủ nhật.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: 'What do you do in the morning?',
      ipaA: '/wɒt duː juː duː ɪn ðə ˈmɔːnɪŋ/',
      readingA: 'Oát đu diu đu in đờ mo-ninh?',
      meaningA: 'Thế buổi sáng bạn làm gì?',
      speakerB: 'Linh',
      avatarB: '👧🏻',
      textB: 'I clean the floor.',
      ipaB: '/aɪ kliːn ðə flɔː/',
      readingB: 'Ai c-lin đờ phlo.',
      meaningB: 'Tớ lau sàn nhà.',
      context: 'Linh chia sẻ việc tự giác cầm cây lau nhà giúp đỡ bố mẹ lau sạch sàn.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 36) - 4 HOUSEWORK ACTIVITIES
  // a: wash the clothes, b: clean the floor, c: help with the cooking, d: wash the dishes
  // =========================================================================
  const houseworkCards = [
    {
      id: 'hw_a',
      key: 'a',
      actionEn: 'wash the clothes',
      ipa: '/wɒʃ ðə kləʊðz/',
      reading: 'oát-sh đờ clâu-z (âm sh tròn môi)',
      meaningVi: 'giặt quần áo',
      question: 'What do you do in the morning?',
      answer: 'I wash the clothes.',
      answerIpa: '/aɪ wɒʃ ðə kləʊðz/',
      answerReading: 'Ai oát-sh đờ clâu-z.',
      icon: '🧺',
      badge: 'bg-blue-600',
      color: 'border-blue-300 bg-blue-50/50 text-blue-950',
      desc: 'Bỏ quần áo vào máy giặt hoặc giặt sạch sẽ'
    },
    {
      id: 'hw_b',
      key: 'b',
      actionEn: 'clean the floor',
      ipa: '/kliːn ðə flɔː/',
      reading: 'c-lin đờ phlo (kéo dài âm o sâu)',
      meaningVi: 'lau sàn nhà, lau nhà',
      question: 'What do you do in the morning?',
      answer: 'I clean the floor.',
      answerIpa: '/aɪ kliːn ðə flɔː/',
      answerReading: 'Ai c-lin đờ phlo.',
      icon: '🧹',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-950',
      desc: 'Dùng cây lau nhà lau sàn sạch bong sáng bóng'
    },
    {
      id: 'hw_c',
      key: 'c',
      actionEn: 'help with the cooking',
      ipa: '/help wɪð ðə ˈkʊkɪŋ/',
      reading: 'he-l-p uýt-đ đờ cúc-kinh',
      meaningVi: 'phụ giúp nấu ăn (nhặt rau, chuẩn bị món)',
      question: 'What do you do in the afternoon?',
      answer: 'I help with the cooking.',
      answerIpa: '/aɪ help wɪð ðə ˈkʊkɪŋ/',
      answerReading: 'Ai he-l-p uýt-đ đờ cúc-kinh.',
      icon: '🍳',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-950',
      desc: 'Vào bếp cùng mẹ chuẩn bị bữa cơm ấm cúng'
    },
    {
      id: 'hw_d',
      key: 'd',
      actionEn: 'wash the dishes',
      ipa: '/wɒʃ ðə ˈdɪʃɪz/',
      reading: 'oát-sh đờ đi-shịt-z (đuôi -es đọc -iz)',
      meaningVi: 'rửa chén đĩa, rửa bát',
      question: 'What do you do in the evening?',
      answer: 'I wash the dishes.',
      answerIpa: '/aɪ wɒʃ ðə ˈdɪʃɪz/',
      answerReading: 'Ai oát-sh đờ đi-shịt-z.',
      icon: '🍽️',
      badge: 'bg-cyan-600',
      color: 'border-cyan-300 bg-cyan-50/50 text-cyan-950',
      desc: 'Rửa sạch bát đũa ở bồn rửa sau bữa ăn'
    }
  ];

  const [selectedHwKey, setSelectedHwKey] = useState<string>('a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND NUMBER (TRACK 37)
  // a: wash dishes, b: help with cooking, c: wash clothes, d: clean floor
  // Correct order in audio: 1-c (wash clothes), 2-d (clean floor), 3-b (help cooking), 4-a (wash dishes)
  // =========================================================================
  const numberCards = [
    {
      key: 'a',
      title: 'wash the dishes',
      icon: '🍽️',
      correctNum: 4,
      desc: 'Cậu bé rửa bát ở bồn rửa chén',
      audioText: 'What do you do in the evening? - I wash the dishes.'
    },
    {
      key: 'b',
      title: 'help with the cooking',
      icon: '🍳',
      correctNum: 3,
      desc: 'Bé gái giúp mẹ nấu ăn trong bếp',
      audioText: 'What do you do in the afternoon? - I help with the cooking.'
    },
    {
      key: 'c',
      title: 'wash the clothes',
      icon: '🧺',
      correctNum: 1,
      desc: 'Bé gái xếp đồ vào giỏ quần áo',
      audioText: 'What do you do in the morning? - I wash the clothes.'
    },
    {
      key: 'd',
      title: 'clean the floor',
      icon: '🧹',
      correctNum: 2,
      desc: 'Cậu bé lau sàn nhà gỗ',
      audioText: 'What do you do on Sundays? - I clean the floor.'
    }
  ];

  const [userNumbers, setUserNumbers] = useState<{ [key: string]: number | null }>({
    a: null,
    b: null,
    c: null,
    d: null
  });

  const handleSelectNumber = (key: string, num: number) => {
    setUserNumbers(prev => ({ ...prev, [key]: num }));
    const card = numberCards.find(c => c.key === key);
    if (card && card.correctNum === num) {
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
      part: 'Đoạn 1 (Buổi sáng & Buổi trưa)',
      clock1: '7:30 AM',
      clock2: '11:50 AM',
      dialogLines: [
        {
          speaker: 'A',
          text: 'What do you do in the morning?',
          ipa: '/wɒt duː juː duː ɪn ðə ˈmɔːnɪŋ/',
          vi: 'Bạn làm gì vào buổi sáng?'
        },
        {
          speaker: 'B',
          pre: 'I wash my',
          blank: 'clothes',
          post: '.',
          full: 'I wash my clothes.',
          ipa: '/aɪ wɒʃ maɪ kləʊðz/',
          vi: 'Tớ giặt quần áo của tớ.'
        },
        {
          speaker: 'A',
          pre: '',
          blank: 'What',
          post: 'do you do at noon?',
          full: 'What do you do at noon?',
          ipa: '/wɒt duː juː duː æt nuːn/',
          vi: 'Thế buổi trưa bạn làm gì?'
        },
        {
          speaker: 'B',
          text: 'I wash the dishes.',
          ipa: '/aɪ wɒʃ ðə ˈdɪʃɪz/',
          vi: 'Tớ rửa bát đĩa.'
        }
      ]
    },
    {
      id: 2,
      part: 'Đoạn 2 (Buổi chiều & Buổi tối)',
      clock1: '5:30 PM',
      clock2: '7:00 PM',
      dialogLines: [
        {
          speaker: 'A',
          pre: 'What do you do in the',
          blank: 'afternoon',
          post: '?',
          full: 'What do you do in the afternoon?',
          ipa: '/wɒt duː juː duː ɪn ði ˌɑːftəˈnuːn/',
          vi: 'Bạn làm gì vào buổi chiều?'
        },
        {
          speaker: 'B',
          text: 'I help my mum with the cooking.',
          ipa: '/aɪ help maɪ mʌm wɪð ðə ˈkʊkɪŋ/',
          vi: 'Tớ giúp mẹ nấu ăn.'
        },
        {
          speaker: 'A',
          pre: 'And in the',
          blank: 'evening',
          post: ', what do you do?',
          full: 'And in the evening, what do you do?',
          ipa: '/ænd ɪn ði ˈiːvnɪŋ, wɒt duː juː duː/',
          vi: 'Còn buổi tối bạn làm gì?'
        },
        {
          speaker: 'B',
          pre: 'We watch',
          blank: 'TV',
          post: 'together.',
          full: 'We watch TV together.',
          ipa: '/wiː wɒtʃ ˌtiːˈviː təˈɡeðə/',
          vi: 'Cả nhà tớ cùng xem tivi bên nhau.'
        }
      ]
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
  // ACTIVITY 6: MIMING GAME (KỊCH CÂM ĐOÁN VIỆC NHÀ)
  // =========================================================================
  const mimingQuestions = [
    {
      id: 1,
      mimeAction: '👐 Đưa tay vò quần áo, vắt nước và phơi đồ',
      options: ['wash the clothes', 'clean the floor', 'wash the dishes'],
      correct: 'wash the clothes',
      vi: 'Giặt quần áo',
      icon: '🧺'
    },
    {
      id: 2,
      mimeAction: '🧹 Hai tay cầm cán chổi đẩy qua đẩy lại trên sàn nhà',
      options: ['help with the cooking', 'clean the floor', 'watch TV'],
      correct: 'clean the floor',
      vi: 'Lau sàn nhà',
      icon: '🧹'
    },
    {
      id: 3,
      mimeAction: '🍳 Một tay cầm chảo, một tay cầm thìa đảo thức ăn thơm phức',
      options: ['help with the cooking', 'wash the dishes', 'wash the clothes'],
      correct: 'help with the cooking',
      vi: 'Giúp nấu ăn',
      icon: '🍳'
    },
    {
      id: 4,
      mimeAction: '🍽️ Tay cầm chiếc đĩa, tay kia xoa xà phòng rửa sạch dưới vòi nước',
      options: ['clean the floor', 'wash the dishes', 'listen to music'],
      correct: 'wash the dishes',
      vi: 'Rửa chén bát',
      icon: '🍽️'
    }
  ];

  const [currentMimeIndex, setCurrentMimeIndex] = useState<number>(0);
  const [selectedMimeAns, setSelectedMimeAns] = useState<string | null>(null);

  const handleAnswerMime = (ans: string) => {
    setSelectedMimeAns(ans);
    const q = mimingQuestions[currentMimeIndex];
    if (ans === q.correct) {
      sound.playCorrect();
      onAddStar(2);
      confetti({ particleCount: 30, spread: 50 });
    } else {
      sound.playWrong();
    }
  };

  const handleNextMime = () => {
    sound.playClick();
    setSelectedMimeAns(null);
    setCurrentMimeIndex(prev => (prev + 1) % mimingQuestions.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            2
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-100 text-orange-800">
                Tiết 2 · Trang 26 - 27 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 35 - Track 37
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Hỏi Về Việc Nhà Mình Làm (What do you do...?)
            </h2>
          </div>
        </div>

        {/* Activities Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Hội Thoại' },
            { id: 2, label: '2. Việc Nhà' },
            { id: 3, label: '3. Luyện Nói' },
            { id: 4, label: '4. Đánh Số' },
            { id: 5, label: '5. Hoàn Thành' },
            { id: 6, label: '6. Miming Game' }
          ].map(act => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setActiveSection(act.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeSection === act.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 35) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                  Hoạt động 1 · Track 35
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 26 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Nhìn, nghe và nhắc lại) 🎧
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'What do you do on Sundays, Linh? I do housework. What do you do in the morning? I clean the floor.';
                speakWord(fullText, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          {/* Grammar Callout Box */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs md:text-sm text-orange-950 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-orange-800">
              <Lightbulb className="w-4 h-4 text-orange-600" /> Cấu trúc trọng tâm Tiết 2:
            </div>
            <p className="font-bold">
              • Hỏi bạn làm gì vào một buổi:{' '}
              <span className="text-indigo-700 font-mono">
                What do you do in the morning / afternoon / evening?
              </span>
            </p>
            <p className="font-bold">
              • Trả lời (động từ nguyên mẫu):{' '}
              <span className="text-emerald-700 font-mono">
                I + [clean the floor / wash the clothes / help with the cooking / wash the dishes].
              </span>
            </p>
          </div>

          {/* Dialog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-orange-300 transition-all space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 font-black text-xs">
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
                  <div className="space-y-1 bg-orange-50/60 p-3.5 rounded-xl border border-orange-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-orange-800">
                        <span>{dialog.avatarB}</span>
                        <span>{dialog.speakerB}</span>
                      </div>
                      <button
                        onClick={() => speakWord(dialog.textB, speechRate)}
                        className="p-1 hover:bg-orange-100 rounded-lg text-orange-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-orange-950">{dialog.textB}</p>
                    <p className="text-xs font-mono font-bold text-emerald-700">🗣️ {dialog.ipaB}</p>
                    <p className="text-xs text-orange-800 font-medium">📖 {dialog.readingB}</p>
                    <p className="text-xs text-slate-600 italic">👉 {dialog.meaningB}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      speakWord(`${dialog.textA} ... ${dialog.textB}`, speechRate);
                      onAddStar(1);
                    }}
                    className="text-xs font-bold text-orange-700 hover:text-orange-800 flex items-center gap-1"
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
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 36) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                  Hoạt động 2 · Track 36
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 26 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (4 công việc nhà bổ ích) 🧺 🧹
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500 italic">
              Bấm vào từng thẻ để nghe phát âm &amp; câu trả lời
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {houseworkCards.map(item => {
              const isSelected = selectedHwKey === item.key;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedHwKey(item.key);
                    speakWord(item.actionEn, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-300 -translate-y-1'
                      : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50'
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
                    <p className="text-xs text-orange-800 font-semibold mt-0.5">📖 {item.reading}</p>
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

          {/* Interactive Question-Answer Board */}
          {(() => {
            const activeHw = houseworkCards.find(h => h.key === selectedHwKey) || houseworkCards[0];
            return (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                    Thực Hành Hỏi Đáp: {activeHw.actionEn} ({activeHw.meaningVi})
                  </span>
                  <span className="text-2xl">{activeHw.icon}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Question */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-200">Câu hỏi (Question):</span>
                      <button
                        onClick={() => speakWord(activeHw.question, speechRate)}
                        className="p-1 hover:bg-white/20 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black">{activeHw.question}</p>
                    <p className="text-xs text-orange-100 font-mono">/wɒt duː juː duː ɪn ðə ˈmɔːnɪŋ/</p>
                    <p className="text-xs text-orange-200 italic">Oát đu diu đu in đờ mo-ninh? (Bạn làm gì vào buổi sáng?)</p>
                  </div>

                  {/* Answer */}
                  <div className="bg-white text-slate-900 p-4 rounded-2xl border border-white shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-600">Câu trả lời (Answer):</span>
                      <button
                        onClick={() => {
                          speakWord(activeHw.answer, speechRate);
                          onAddStar(1);
                        }}
                        className="p-1 hover:bg-orange-100 rounded-lg text-orange-600 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black text-orange-950">{activeHw.answer}</p>
                    <p className="text-xs text-indigo-700 font-mono font-bold">{activeHw.answerIpa}</p>
                    <p className="text-xs text-orange-800 font-bold">{activeHw.answerReading}</p>
                    <p className="text-xs text-slate-600 italic">Tôi {activeHw.meaningVi}.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-orange-100">
                    💡 Động từ giữ nguyên mẫu khi đi sau chủ ngữ &quot;I&quot; (I wash, I clean, I help)
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${activeHw.question} ... ${activeHw.answer}`, speechRate);
                      onAddStar(2);
                    }}
                    className="px-4 py-2 bg-white text-orange-700 hover:bg-orange-50 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                  Hoạt động 3 · Trang 26 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Luyện Nói Tương Tác</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s talk (Khung cảnh gia đình cùng nhau làm việc nhà) 🏡
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs md:text-sm text-slate-700 space-y-1">
            <p className="font-bold text-orange-950">
              Mẫu câu đối thoại:{' '}
              <span className="text-indigo-700 font-mono">
                What do you do in the morning / afternoon / evening? - I [việc nhà]...
              </span>
            </p>
            <p className="text-slate-500 italic">
              Bấm vào từng vai trò dưới đây để thực hành phát âm và luyện phản xạ nói tự nhiên:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                time: 'in the morning',
                action: 'wash the clothes',
                timeVi: 'Buổi sáng',
                icon: '🧺',
                enSentence: 'In the morning, I wash the clothes with my mum.',
                viSentence: 'Vào buổi sáng, tớ giặt quần áo cùng mẹ.'
              },
              {
                time: 'in the morning',
                action: 'clean the floor',
                timeVi: 'Buổi sáng',
                icon: '🧹',
                enSentence: 'In the morning, I clean the floor with my dad.',
                viSentence: 'Vào buổi sáng, tớ lau sàn nhà cùng bố.'
              },
              {
                time: 'in the afternoon',
                action: 'help with the cooking',
                timeVi: 'Buổi chiều',
                icon: '🍳',
                enSentence: 'In the afternoon, I help my mum with the cooking.',
                viSentence: 'Vào buổi chiều, tớ giúp mẹ nấu bữa cơm tối.'
              },
              {
                time: 'in the evening',
                action: 'wash the dishes',
                timeVi: 'Buổi tối',
                icon: '🍽️',
                enSentence: 'In the evening, my dad and I wash the dishes.',
                viSentence: 'Vào buổi tối, bố và tớ cùng rửa bát.'
              }
            ].map((role, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-orange-400 hover:shadow-md transition-all text-center space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl block mb-2">{role.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-black uppercase">
                    {role.timeVi}
                  </span>
                  <h4 className="font-black text-slate-900 text-base mt-2">{role.action}</h4>
                  <p className="text-xs text-slate-600 mt-1 italic">{role.viSentence}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      speakWord(role.enSentence, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
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
      {/* SECTION 4: LISTEN AND NUMBER (TRACK 37) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                  Hoạt động 4 · Track 37
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 27 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and number (Nghe và đánh số từ 1 đến 4) 🎧✏️
              </h3>
            </div>
            <button
              onClick={() => {
                const fullScript =
                  '1. What do you do in the morning? I wash the clothes. 2. What do you do on Sundays? I clean the floor. 3. What do you do in the afternoon? I help with the cooking. 4. What do you do in the evening? I wash the dishes.';
                speakWord(fullScript, speechRate);
                onAddStar(2);
              }}
              className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Volume2 className="w-3.5 h-3.5" /> Nghe toàn bộ Track 37
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {numberCards.map(item => {
              const currentNum = userNumbers[item.key];
              const isCorrect = currentNum === item.correctNum;
              return (
                <div
                  key={item.key}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-orange-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center uppercase">
                        {item.key}
                      </span>
                      <button
                        onClick={() => speakWord(item.audioText, speechRate)}
                        className="p-1 hover:bg-orange-100 rounded-lg text-orange-600 transition"
                        title="Nghe đoạn audio này"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="text-4xl">{item.icon}</span>
                      <h4 className="font-black text-slate-900 text-sm mt-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 italic">{item.desc}</p>
                    </div>
                  </div>

                  {/* Choose number (1, 2, 3, 4) */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 block text-center">
                      Chọn số thứ tự nghe được:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          onClick={() => handleSelectNumber(item.key, num)}
                          className={`py-1.5 rounded-xl font-black text-xs transition border ${
                            currentNum === num
                              ? isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    {currentNum !== null && (
                      <p
                        className={`text-[11px] text-center font-bold mt-1 ${
                          isCorrect ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {isCorrect ? `✓ Số ${item.correctNum} chính xác!` : `✗ Chưa đúng, thử lại!`}
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                  Hoạt động 5 · Trang 27 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Hoàn Thành Đoạn Thoại</span>
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
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-orange-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-black">
                      {item.part}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-bold">
                      {item.clock1} &amp; {item.clock2}
                    </span>
                  </div>

                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    {item.dialogLines.map((line, lIdx) => (
                      <div key={lIdx} className="text-xs md:text-sm">
                        {line.text ? (
                          <p className="font-extrabold text-slate-800">
                            <span className="text-orange-600">{line.speaker}: </span>
                            {line.text}
                          </p>
                        ) : (
                          <p className="font-extrabold text-slate-800">
                            <span className="text-orange-600">{line.speaker}: </span>
                            {line.pre}
                            {isRevealed ? (
                              <span className="text-emerald-600 underline font-black decoration-2 mx-1">
                                {line.blank}
                              </span>
                            ) : (
                              <span className="px-3 py-0.5 bg-orange-100 text-orange-800 rounded font-bold mx-1">
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
                          : 'bg-orange-500 text-white hover:bg-orange-600 shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}
                    </button>

                    <button
                      onClick={() => {
                        const script = item.dialogLines.map(l => l.full || l.text).join(' ... ');
                        speakWord(script, speechRate);
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
      {/* SECTION 6: MIMING GAME (TRÒ CHƠI KỊCH CÂM) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-800 inline-block">
              Hoạt động 6 · Trang 27 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Miming Game (Kịch câm: Đoán việc nhà bằng tiếng Anh) 🎭
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Đọc hành động kịch câm và chọn từ tiếng Anh tương ứng để ghi điểm sao thưởng!
            </p>
          </div>

          {(() => {
            const currentQ = mimingQuestions[currentMimeIndex];
            const isAnswered = selectedMimeAns !== null;
            const isCorrect = selectedMimeAns === currentQ.correct;

            return (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 max-w-lg mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Câu hỏi {currentMimeIndex + 1} / {mimingQuestions.length}</span>
                  <span className="text-2xl">{currentQ.icon}</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-orange-200 shadow-sm space-y-2 text-center">
                  <span className="text-xs font-black text-orange-700 uppercase tracking-widest block">
                    Động tác bạn nhỏ đang diễn:
                  </span>
                  <p className="text-base md:text-lg font-black text-slate-900">
                    {currentQ.mimeAction}
                  </p>
                </div>

                {/* Option Buttons */}
                <div className="space-y-2.5">
                  {currentQ.options.map(opt => {
                    const isSelected = selectedMimeAns === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswerMime(opt)}
                        disabled={isAnswered}
                        className={`w-full py-3 px-4 rounded-2xl font-black text-sm transition-all flex items-center justify-between border-2 ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                              : 'bg-rose-500 text-white border-rose-600'
                            : isAnswered && opt === currentQ.correct
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-orange-400 hover:bg-orange-50/50'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <span>{isCorrect ? '✓ Chính xác!' : '✗ Sai rồi!'}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next button */}
                {isAnswered && (
                  <div className="pt-2 animate-fadeIn">
                    <button
                      onClick={handleNextMime}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-2 mx-auto"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
