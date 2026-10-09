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
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Music,
  Clock,
  Tv,
  X
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit14Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit14Lesson1Studio: React.FC<Unit14Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 31)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: "What's your hobby, Mai?",
      ipaA: "/wɒts jɔː ˈhɒbi, maɪ/",
      readingA: 'Oát-s do ho-bi, Mai?',
      meaningA: 'Sở thích của bạn là gì thế, Mai?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'I like watching TV.',
      ipaB: '/aɪ laɪk ˈwɒtʃɪŋ ˌtiːˈviː/',
      readingB: 'Ai laik oát-chinh Ti-vi.',
      meaningB: 'Tớ thích xem tivi.',
      context: 'Ben và Mai đang trò chuyện ở sân trường về sở thích lúc rảnh rỗi.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '👦🏻',
      textA: 'When do you watch TV?',
      ipaA: '/wen duː juː wɒtʃ ˌtiːˈviː/',
      readingA: 'Oen đu diu oát-ch Ti-vi?',
      meaningA: 'Cậu thường xem tivi vào lúc nào?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'I watch TV in the evening.',
      ipaB: '/aɪ wɒtʃ ˌtiːˈviː ɪn ði ˈiːvnɪŋ/',
      readingB: 'Ai oát-ch Ti-vi in đi i-v-ninh.',
      meaningB: 'Tớ xem tivi vào buổi tối (lúc 7 giờ 30 tối).',
      context: 'Mai chia sẻ thói quen xem tivi cùng gia đình vào buổi tối lúc 7:30 PM.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 32) - 4 TIME OF DAY PHRASES
  // a: in the morning, b: at noon, c: in the afternoon, d: in the evening
  // =========================================================================
  const timeCards = [
    {
      id: 'time_a',
      key: 'a',
      timeLabel: 'in the morning',
      clock: '6:00 AM',
      ipa: '/ɪn ðə ˈmɔːnɪŋ/',
      reading: 'in đờ mo-ninh (âm o sâu)',
      meaningVi: 'vào buổi sáng (sớm)',
      prepNote: 'Dùng giới từ "IN THE"',
      question: 'When do you watch TV?',
      answer: 'I watch TV in the morning.',
      answerIpa: '/aɪ wɒtʃ ˌtiːˈviː ɪn ðə ˈmɔːnɪŋ/',
      answerReading: 'Ai oát-ch Ti-vi in đờ mo-ninh.',
      icon: '🌅',
      badge: 'bg-amber-500',
      color: 'border-amber-300 bg-amber-50/50 text-amber-950',
      desc: 'Khoảng thời gian bắt đầu ngày mới từ 6:00 sáng'
    },
    {
      id: 'time_b',
      key: 'b',
      timeLabel: 'at noon',
      clock: '11:50 AM',
      ipa: '/æt nuːn/',
      reading: 'ét nun (kéo dài âm u)',
      meaningVi: 'vào buổi trưa (giữa ngày)',
      prepNote: 'CHÚ Ý ĐẶC BIỆT: Dùng giới từ "AT" (không dùng in the)',
      question: 'When do you watch TV?',
      answer: 'I watch TV at noon.',
      answerIpa: '/aɪ wɒtʃ ˌtiːˈviː æt nuːn/',
      answerReading: 'Ai oát-ch Ti-vi ét nun.',
      icon: '☀️',
      badge: 'bg-orange-500',
      color: 'border-orange-300 bg-orange-50/50 text-orange-950',
      desc: 'Giữa trưa lúc mặt trời đứng bóng (11:50 - 12:00)'
    },
    {
      id: 'time_c',
      key: 'c',
      timeLabel: 'in the afternoon',
      clock: '5:00 PM',
      ipa: '/ɪn ði ˌɑːftəˈnuːn/',
      reading: 'in đi áp-ph-tơ-nun (đọc "đi" trước nguyên âm a)',
      meaningVi: 'vào buổi chiều',
      prepNote: 'Dùng giới từ "IN THE" (đọc nối in-the -> in đi)',
      question: 'When do you watch TV?',
      answer: 'I watch TV in the afternoon.',
      answerIpa: '/aɪ wɒtʃ ˌtiːˈviː ɪn ði ˌɑːftəˈnuːn/',
      answerReading: 'Ai oát-ch Ti-vi in đi áp-ph-tơ-nun.',
      icon: '🌤️',
      badge: 'bg-sky-500',
      color: 'border-sky-300 bg-sky-50/50 text-sky-950',
      desc: 'Khoảng thời gian sau giờ học từ 1:00 đến 5:00 chiều'
    },
    {
      id: 'time_d',
      key: 'd',
      timeLabel: 'in the evening',
      clock: '7:30 PM',
      ipa: '/ɪn ði ˈiːvnɪŋ/',
      reading: 'in đi i-v-ninh (đọc "đi" trước nguyên âm e)',
      meaningVi: 'vào buổi tối (có trăng sao)',
      prepNote: 'Dùng giới từ "IN THE" (đọc nối in-the -> in đi)',
      question: 'When do you watch TV?',
      answer: 'I watch TV in the evening.',
      answerIpa: '/aɪ wɒtʃ ˌtiːˈviː ɪn ði ˈiːvnɪŋ/',
      answerReading: 'Ai oát-ch Ti-vi in đi i-v-ninh.',
      icon: '🌙',
      badge: 'bg-indigo-600',
      color: 'border-indigo-300 bg-indigo-50/50 text-indigo-950',
      desc: 'Khoảng thời gian sum họp gia đình lúc 7:30 tối'
    }
  ];

  const [selectedTimeKey, setSelectedTimeKey] = useState<string>('a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK OR CROSS (TRACK 33)
  // =========================================================================
  const tickCrossItems = [
    {
      id: 1,
      clock: '7:00 AM',
      activity: 'watch TV in the morning',
      icon: '📺',
      target: 'tick', // True
      audioText: 'When do you watch TV? - I watch TV in the morning. At 7:00 am.',
      audioIpa: '/wen duː juː wɒtʃ ˌtiːˈviː/ - /aɪ wɒtʃ ˌtiːˈviː ɪn ðə ˈmɔːnɪŋ æt ˈsev.ən eɪ ˈem/',
      reading: 'Cậu xem TV khi nào? - Tớ xem TV vào buổi sáng, lúc 7 giờ sáng.',
      explanation: 'Hình 1 đồng hồ chỉ 7:00 AM và cậu bé đang xem TV. Khớp hoàn toàn với audio -> Đánh dấu Tick (✓).'
    },
    {
      id: 2,
      clock: '5:00 PM',
      activity: 'read books in the afternoon',
      icon: '📖',
      target: 'tick', // True
      audioText: 'When do you read books? - I read books in the afternoon. At 5:00 pm.',
      audioIpa: '/wen duː juː riːd bʊks/ - /aɪ riːd bʊks ɪn ði ˌɑːftəˈnuːn æt faɪv piː ˈem/',
      reading: 'Cậu đọc sách khi nào? - Tớ đọc sách vào buổi chiều, lúc 5 giờ chiều.',
      explanation: 'Hình 2 đồng hồ 5:00 PM, cậu bé ngồi đọc sách bên cửa sổ. Khớp với nội dung -> Đánh dấu Tick (✓).'
    },
    {
      id: 3,
      clock: '2:15 PM',
      activity: 'watch TV in the afternoon',
      icon: '📺',
      target: 'cross', // False (prompt asks about listening to music)
      audioText: 'When do you listen to music? - I listen to music at noon.',
      audioIpa: '/wen duː juː ˈlɪs.ən tuː ˈmjuː.zɪk/ - /aɪ ˈlɪs.ən tuː ˈmjuː.zɪk æt nuːn/',
      reading: 'Cậu nghe nhạc khi nào? - Tớ nghe nhạc vào buổi trưa.',
      explanation: 'Hình 3 vẽ bé gái xem tivi lúc 2:15 PM, nhưng audio lại nói về nghe nhạc vào buổi trưa -> Đánh dấu Cross (✗).'
    },
    {
      id: 4,
      clock: 'Night / Evening',
      activity: 'do homework / study in the evening',
      icon: '📝',
      target: 'tick', // True
      audioText: 'When do you do your homework? - I do my homework in the evening.',
      audioIpa: '/wen duː juː duː jɔː ˈhəʊm.wɜːk/ - /aɪ duː maɪ ˈhəʊm.wɜːk ɪn ði ˈiːvnɪŋ/',
      reading: 'Cậu làm bài tập khi nào? - Tớ làm bài tập vào buổi tối.',
      explanation: 'Hình 4 có đèn bàn và bầu trời đêm, bạn nữ đang ngồi học bài -> Khớp với audio -> Đánh dấu Tick (✓).'
    }
  ];

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: 'tick' | 'cross' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const handleSelectTickCross = (id: number, val: 'tick' | 'cross') => {
    setUserAnswers(prev => ({ ...prev, [id]: val }));
    const item = tickCrossItems.find(t => t.id === id);
    if (item && item.target === val) {
      sound.playCorrect();
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const completeExercises = [
    {
      id: 1,
      imageNote: 'Xem TV buổi tối (trăng sao, 7:30 PM)',
      qEn: 'When do you watch TV?',
      qIpa: '/wen duː juː wɒtʃ ˌtiːˈviː/',
      qVi: 'Bạn xem TV vào lúc nào?',
      answerPre: 'In the',
      correctWord: 'evening',
      fullSentence: 'In the evening.',
      fullIpa: '/ɪn ði ˈiːvnɪŋ/',
      fullReading: 'In đi i-v-ninh.',
      fullVi: 'Vào buổi tối.'
    },
    {
      id: 2,
      imageNote: 'Lau dọn bàn ghế lúc 5:00 PM (buổi chiều)',
      qEn: 'When do you do housework?',
      qIpa: '/wen duː juː duː ˈhaʊs.wɜːk/',
      qVi: 'Bạn làm việc nhà vào lúc nào?',
      answerPre: 'In the',
      correctWord: 'afternoon',
      fullSentence: 'In the afternoon.',
      fullIpa: '/ɪn ði ˌɑːftəˈnuːn/',
      fullReading: 'In đi áp-ph-tơ-nun.',
      fullVi: 'Vào buổi chiều.'
    },
    {
      id: 3,
      imageNote: 'Nghe nhạc có tai nghe lúc 11:50 AM (buổi trưa)',
      qEn: 'When do you listen to music?',
      qIpa: '/wen duː juː ˈlɪs.ən tuː ˈmjuː.zɪk/',
      qVi: 'Bạn nghe nhạc khi nào?',
      answerPre: 'At',
      correctWord: 'noon',
      fullSentence: 'At noon.',
      fullIpa: '/æt nuːn/',
      fullReading: 'Ét nun (nhớ dùng "at noon").',
      fullVi: 'Vào buổi trưa.'
    },
    {
      id: 4,
      imageNote: 'Đọc sách dưới nắng sớm lúc 7:00 AM (buổi sáng)',
      qEn: 'When do you read books?',
      qIpa: '/wen duː juː riːd bʊks/',
      qVi: 'Khi nào bạn đọc sách?',
      answerPre: 'In the',
      correctWord: 'morning',
      fullSentence: 'In the morning.',
      fullIpa: '/ɪn ðə ˈmɔːnɪŋ/',
      fullReading: 'In đờ mo-ninh.',
      fullVi: 'Vào buổi sáng.'
    }
  ];

  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: number]: boolean }>({});

  const toggleReveal = (id: number) => {
    sound.playClick();
    setRevealedAnswers(prev => {
      const next = !prev[id];
      if (next) onAddStar(1);
      return { ...prev, [id]: next };
    });
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 34)
  // "When do you watch TV and read books?"
  // =========================================================================
  const songLyrics = [
    {
      title: 'Khổ 1: Chiều xem TV & Tối đọc sách 🌤️ 🌙',
      lines: [
        { en: 'When do you watch TV?', ipa: '/wen duː juː wɒtʃ ˌtiːˈviː/', vi: 'Khi nào bạn xem tivi?' },
        { en: 'I watch TV in the afternoon.', ipa: '/aɪ wɒtʃ ˌtiːˈviː ɪn ði ˌɑːftəˈnuːn/', vi: 'Tớ xem tivi vào buổi chiều.' },
        { en: 'When do you read books?', ipa: '/wen duː juː riːd bʊks/', vi: 'Khi nào bạn đọc sách?' },
        { en: 'I read books in the evening.', ipa: '/aɪ riːd bʊks ɪn ði ˈiːvnɪŋ/', vi: 'Tớ đọc sách vào buổi tối.' }
      ]
    },
    {
      title: 'Khổ 2: Trưa xem TV & Sáng sớm đọc sách ☀️ 🌅',
      lines: [
        { en: 'When do you watch TV?', ipa: '/wen duː juː wɒtʃ ˌtiːˈviː/', vi: 'Khi nào bạn xem tivi?' },
        { en: 'I watch TV at noon.', ipa: '/aɪ wɒtʃ ˌtiːˈviː æt nuːn/', vi: 'Tớ xem tivi vào buổi trưa.' },
        { en: 'When do you read books?', ipa: '/wen duː juː riːd bʊks/', vi: 'Khi nào bạn đọc sách?' },
        { en: 'I read books in the morning.', ipa: '/aɪ riːd bʊks ɪn ðə ˈmɔːnɪŋ/', vi: 'Tớ đọc sách vào buổi sáng.' }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Lesson Header Navigation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                Tiết 1 · Trang 24 - 25 SGK
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Track 31 - Track 34
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Thời Gian Làm Hoạt Động (When do you...?)
            </h2>
          </div>
        </div>

        {/* Lesson activities pill selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {[
            { id: 1, label: '1. Hội Thoại' },
            { id: 2, label: '2. Thời Điểm' },
            { id: 3, label: '3. Luyện Nói' },
            { id: 4, label: '4. Tick / Cross' },
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
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 31) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                  Hoạt động 1 · Track 31
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 24 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Nhìn, nghe và nhắc lại) 🎧
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  "What's your hobby, Mai? I like watching TV. When do you watch TV? I watch TV in the evening.";
                speakWord(fullText, speechRate);
                onAddStar(2);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          {/* Grammar Callout Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" /> Cấu trúc trọng tâm Tiết 1:
            </div>
            <p className="font-bold">
              • Hỏi khi nào làm việc gì:{' '}
              <span className="text-indigo-700 font-mono">When do you + [hành động]?</span>
            </p>
            <p className="font-bold">
              • Trả lời:{' '}
              <span className="text-emerald-700 font-mono">
                I + [hành động] + in the morning / at noon / in the afternoon / in the evening.
              </span>
            </p>
            <p className="text-amber-800 italic">
              ⚡ Bí kíp: Sáng, chiều, tối dùng <strong className="text-rose-600">IN THE</strong>, riêng buổi trưa dùng{' '}
              <strong className="text-rose-600">AT NOON</strong>!
            </p>
          </div>

          {/* Dialog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:border-amber-300 transition-all space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-black text-xs">
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
                  <div className="space-y-1 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                        <span>{dialog.avatarB}</span>
                        <span>{dialog.speakerB}</span>
                      </div>
                      <button
                        onClick={() => speakWord(dialog.textB, speechRate)}
                        className="p-1 hover:bg-amber-100 rounded-lg text-amber-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-amber-950">{dialog.textB}</p>
                    <p className="text-xs font-mono font-bold text-emerald-700">🗣️ {dialog.ipaB}</p>
                    <p className="text-xs text-amber-800 font-medium">📖 {dialog.readingB}</p>
                    <p className="text-xs text-slate-600 italic">👉 {dialog.meaningB}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      speakWord(`${dialog.textA} ... ${dialog.textB}`, speechRate);
                      onAddStar(1);
                    }}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
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
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 32) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                  Hoạt động 2 · Track 32
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 24 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (Nghe, chỉ và nói 4 buổi trong ngày) 🗣️
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-500 italic">
              Bấm vào từng khung giờ để luyện hỏi đáp
            </span>
          </div>

          {/* 4 Time Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeCards.map(item => {
              const isSelected = selectedTimeKey === item.key;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTimeKey(item.key);
                    speakWord(item.timeLabel, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-300 -translate-y-1'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-slate-900 text-white font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.clock}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs font-black flex items-center justify-center uppercase">
                        {item.key}
                      </span>
                      <h4 className="font-black text-slate-900 text-base">{item.timeLabel}</h4>
                    </div>

                    <p className="text-xs font-mono font-bold text-indigo-700">🗣️ {item.ipa}</p>
                    <p className="text-xs text-amber-800 font-semibold mt-0.5">📖 {item.reading}</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{item.meaningVi}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md block truncate">
                      {item.prepNote}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Question-Answer Board */}
          {(() => {
            const activeTime = timeCards.find(t => t.key === selectedTimeKey) || timeCards[0];
            return (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                    Thực Hành Hỏi Đáp Tương Tác: Khung Giờ {activeTime.clock}
                  </span>
                  <span className="text-2xl">{activeTime.icon}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Question */}
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-200">Câu hỏi (Question):</span>
                      <button
                        onClick={() => speakWord(activeTime.question, speechRate)}
                        className="p-1 hover:bg-white/20 rounded-lg transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black">{activeTime.question}</p>
                    <p className="text-xs text-amber-100 font-mono">/wen duː juː wɒtʃ ˌtiːˈviː/</p>
                    <p className="text-xs text-amber-200 italic">Oen đu diu oát-ch Ti-vi? (Khi nào bạn xem tivi?)</p>
                  </div>

                  {/* Answer */}
                  <div className="bg-white text-slate-900 p-4 rounded-2xl border border-white shadow-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">Câu trả lời (Answer):</span>
                      <button
                        onClick={() => {
                          speakWord(activeTime.answer, speechRate);
                          onAddStar(1);
                        }}
                        className="p-1 hover:bg-amber-100 rounded-lg text-amber-600 transition"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg md:text-xl font-black text-amber-950">{activeTime.answer}</p>
                    <p className="text-xs text-indigo-700 font-mono font-bold">{activeTime.answerIpa}</p>
                    <p className="text-xs text-amber-800 font-bold">{activeTime.answerReading}</p>
                    <p className="text-xs text-slate-600 italic">Tôi xem tivi {activeTime.meaningVi}.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-amber-100">
                    💡 Chú ý giới từ: {activeTime.timeLabel === 'at noon' ? 'Buổi trưa chỉ dùng AT NOON' : 'Dùng IN THE'}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${activeTime.question} ... ${activeTime.answer}`, speechRate);
                      onAddStar(2);
                    }}
                    className="px-4 py-2 bg-white text-amber-700 hover:bg-amber-50 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5"
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                  Hoạt động 3 · Trang 24 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Phản Xạ Hỏi Đáp</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Let&apos;s talk (Luyện nói tự nhiên với 4 mốc thời gian) 🗣️
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs md:text-sm text-slate-700">
            Học sinh nhìn vào từng hình đồng hồ trong SGK, bấm vào để nghe và luyện trả lời to rõ ràng:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { clock: '7:00 AM', timeEn: 'in the morning', vi: 'Buổi sáng (7:00 AM)', icon: '🌅', color: 'from-amber-400 to-orange-400' },
              { clock: '11:50 AM', timeEn: 'at noon', vi: 'Buổi trưa (11:50 AM)', icon: '☀️', color: 'from-orange-400 to-red-400' },
              { clock: '5:00 PM', timeEn: 'in the afternoon', vi: 'Buổi chiều (5:00 PM)', icon: '🌤️', color: 'from-sky-400 to-blue-500' },
              { clock: '7:00 PM', timeEn: 'in the evening', vi: 'Buổi tối (7:00 PM)', icon: '🌙', color: 'from-indigo-500 to-purple-600' }
            ].map(slot => (
              <div
                key={slot.clock}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:shadow-lg transition-all text-center space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr ${slot.color} text-white flex items-center justify-center text-2xl shadow-md`}>
                    {slot.icon}
                  </div>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-xs font-black">
                    {slot.clock}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-2">{slot.timeEn}</h4>
                  <p className="text-xs text-slate-500">{slot.vi}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      speakWord(`When do you watch TV? I watch TV ${slot.timeEn}.`, speechRate);
                      onAddStar(1);
                    }}
                    className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5"
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
      {/* SECTION 4: LISTEN AND TICK OR CROSS (TRACK 33) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                  Hoạt động 4 · Track 33
                </span>
                <span className="text-xs font-semibold text-slate-500">Trang 25 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and tick (✓) or cross (✗) 🎧✏️
              </h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm loa để nghe audio rồi chọn Tick (✓) nếu đúng, Cross (✗) nếu sai
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tickCrossItems.map(item => {
              const currentChoice = userAnswers[item.id];
              const isCorrect = currentChoice === item.target;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/40 hover:border-amber-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-slate-700">Hình {item.id} ({item.clock})</span>
                    </div>

                    <button
                      onClick={() => speakWord(item.audioText, speechRate)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe Audio {item.id}
                    </button>
                  </div>

                  {/* Visual card */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-extrabold text-sm text-slate-800">{item.activity}</p>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 rounded-md font-mono text-xs font-bold text-slate-600">
                      Đồng hồ chỉ: {item.clock}
                    </span>
                  </div>

                  {/* Tick or Cross Buttons */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <button
                      onClick={() => handleSelectTickCross(item.id, 'tick')}
                      className={`flex-1 py-2.5 rounded-xl font-black text-sm transition flex items-center justify-center gap-2 border-2 ${
                        currentChoice === 'tick'
                          ? item.target === 'tick'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" /> Tick (✓ Đúng)
                    </button>

                    <button
                      onClick={() => handleSelectTickCross(item.id, 'cross')}
                      className={`flex-1 py-2.5 rounded-xl font-black text-sm transition flex items-center justify-center gap-2 border-2 ${
                        currentChoice === 'cross'
                          ? item.target === 'cross'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                      }`}
                    >
                      <X className="w-4 h-4 stroke-[3]" /> Cross (✗ Sai)
                    </button>
                  </div>

                  {/* Reveal explanation after choice */}
                  {currentChoice && (
                    <div
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1">
                        {isCorrect ? '🎉 Bạn trả lời chính xác!' : '⚠️ Chưa đúng rồi, cùng xem lại nhé:'}
                      </div>
                      <p className="italic text-[11px]">{item.explanation}</p>
                      <p className="font-mono text-[11px] text-indigo-700">{item.audioText}</p>
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                  Hoạt động 5 · Trang 25 SGK
                </span>
                <span className="text-xs font-semibold text-slate-500">Điền Từ Vào Chỗ Trống</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, complete and read (Nhìn tranh, hoàn thành câu và đọc to) ✏️
              </h3>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm &quot;Xem đáp án &amp; Phát âm&quot; để đối chiếu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completeExercises.map(item => {
              const isRevealed = revealedAnswers[item.id];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 hover:border-amber-300 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-black">
                      Câu {item.id}
                    </span>
                    <span className="text-xs text-slate-500 italic">{item.imageNote}</span>
                  </div>

                  <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    {/* A question */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-indigo-900">
                        A: {item.qEn}
                      </p>
                      <button
                        onClick={() => speakWord(item.qEn, speechRate)}
                        className="p-1 hover:bg-slate-100 rounded-md text-slate-500"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">👉 {item.qVi}</p>

                    {/* B answer with blank */}
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-base font-extrabold text-slate-800">
                        B: {item.answerPre}{' '}
                        {isRevealed ? (
                          <span className="text-emerald-600 underline font-black decoration-2">
                            {item.correctWord}
                          </span>
                        ) : (
                          <span className="px-4 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">
                            ______
                          </span>
                        )}
                        .
                      </p>
                    </div>
                  </div>

                  {/* Reveal / Audio Buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleReveal(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isRevealed
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-500 text-white hover:bg-amber-600 shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}
                    </button>

                    <button
                      onClick={() => {
                        speakWord(`${item.qEn} ... ${item.fullSentence}`, speechRate);
                        onAddStar(1);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe cả câu
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 animate-fadeIn">
                      <p className="font-black text-emerald-900">
                        Đầy đủ: &quot;{item.fullSentence}&quot; ({item.fullVi})
                      </p>
                      <p className="font-mono text-emerald-700 font-bold">🗣️ {item.fullIpa}</p>
                      <p className="text-emerald-800 font-semibold">📖 {item.fullReading}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: LET'S SING (TRACK 34) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 inline-block">
              Hoạt động 6 · Track 34 · Trang 25 SGK
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Bài hát: &quot;When do you watch TV and read books?&quot; 🎶
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Giai điệu vui tươi giúp bé ghi nhớ giới từ các buổi: in the afternoon, in the evening, at noon, in the morning!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 max-w-lg mx-auto space-y-6">
            <div className="text-4xl">📺 📚 🎵</div>

            {songLyrics.map((verse, vIdx) => (
              <div key={vIdx} className="space-y-3 text-left bg-white/80 p-4 rounded-2xl border border-amber-100 shadow-2xs">
                <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">
                  {verse.title}
                </span>
                {verse.lines.map((line, lIdx) => (
                  <div key={lIdx} className="hover:text-amber-600 transition">
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
                  'When do you watch TV? I watch TV in the afternoon. When do you read books? I read books in the evening. When do you watch TV? I watch TV at noon. When do you read books? I read books in the morning.';
                speakWord(song, speechRate * 0.95);
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-black inline-flex items-center gap-2 shadow-md transition"
            >
              <Music className="w-4 h-4" /> Bật nhạc hát Karaoke &quot;When do you watch TV?&quot; 🎤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
