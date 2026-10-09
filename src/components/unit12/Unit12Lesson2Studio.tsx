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
  Building,
  Factory,
  GraduationCap,
  Tractor,
  Hospital,
  Gamepad2
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit12Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit12Lesson2Studio: React.FC<Unit12Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 15)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'What does your mother do?',
      ipaA: '/wɒt dʌz jɔː ˈmʌðə duː/',
      readingA: 'Oát đắt-z do ma-đờ đu?',
      meaningA: 'Mẹ của bạn làm nghề gì thế?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: "She's a nurse.",
      ipaB: '/ʃiːz ə nɜːs/',
      readingB: 'Shi-z ơ nơ-s.',
      meaningB: 'Mẹ tớ là một y tá.',
      context: 'Ben và Mai đang ngồi xem cuốn album ảnh gia đình.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'Where does she work?',
      ipaA: '/weər dʌz ʃiː wɜːk/',
      readingA: 'Que-ơ đắt-z shi uơ-k?',
      meaningA: 'Bác ấy làm việc ở đâu?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'She works at a nursing home.',
      ipaB: '/ʃiː wɜːks æt ə ˈnɜːsɪŋ həʊm/',
      readingB: 'Shi uơ-ks ét ơ nơ-sính hôm.',
      meaningB: 'Mẹ tớ làm việc tại một viện dưỡng lão.',
      context: 'Mai chỉ vào bức tranh tòa nhà Viện dưỡng lão khang trang.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 16) - 4 WORKPLACES
  // a: at a nursing home, b: at a factory, c: at a school, d: on a farm
  // =========================================================================
  const workplaceCards = [
    {
      id: 'place_a',
      key: 'a',
      title: 'at a nursing home',
      ipa: '/æt ə ˈnɜːsɪŋ həʊm/',
      reading: 'ét ơ nơ-sính hôm',
      meaningVi: 'tại viện dưỡng lão (chăm sóc người cao tuổi)',
      prep: 'at',
      gender: 'she',
      jobName: 'a nurse',
      question: 'Where does she work?',
      answer: 'She works at a nursing home.',
      answerIpa: '/ʃiː wɜːks æt ə ˈnɜːsɪŋ həʊm/',
      answerReading: 'Shi uơ-ks ét ơ nơ-sính hôm.',
      icon: '🏥',
      badge: 'bg-rose-600',
      color: 'border-rose-300 bg-rose-50/50 text-rose-900',
      desc: 'Chăm sóc sức khỏe và trò chuyện cùng các cụ già'
    },
    {
      id: 'place_b',
      key: 'b',
      title: 'at a factory',
      ipa: '/æt ə ˈfæktəri/',
      reading: 'ét ơ phéc-tơ-ri',
      meaningVi: 'tại nhà máy, xí nghiệp sản xuất',
      prep: 'at',
      gender: 'he',
      jobName: 'a worker',
      question: 'Where does he work?',
      answer: 'He works at a factory.',
      answerIpa: '/hiː wɜːks æt ə ˈfæktəri/',
      answerReading: 'Hi uơ-ks ét ơ phéc-tơ-ri.',
      icon: '🏭',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      desc: 'Vận hành máy móc, chế tạo thiết bị hiện đại'
    },
    {
      id: 'place_c',
      key: 'c',
      title: 'at a school',
      ipa: '/æt ə skuːl/',
      reading: 'ét ơ x-cùn',
      meaningVi: 'tại trường học',
      prep: 'at',
      gender: 'she',
      jobName: 'a teacher',
      question: 'Where does she work?',
      answer: 'She works at a school.',
      answerIpa: '/ʃiː wɜːks æt ə skuːl/',
      answerReading: 'Shi uơ-ks ét ơ x-cùn.',
      icon: '🏫',
      badge: 'bg-blue-600',
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      desc: 'Giảng dạy kiến thức cho các em học sinh thân yêu'
    },
    {
      id: 'place_d',
      key: 'd',
      title: 'on a farm',
      ipa: '/ɒn ə fɑːm/',
      reading: 'on ơ pha-m',
      meaningVi: 'trên nông trại, trang trại',
      prep: 'on',
      prepNote: 'Đặc biệt: Nông trại dùng giới từ ON (on a farm)',
      gender: 'he',
      jobName: 'a farmer',
      question: 'Where does he work?',
      answer: 'He works on a farm.',
      answerIpa: '/hiː wɜːks ɒn ə fɑːm/',
      answerReading: 'Hi uơ-ks on ơ pha-m.',
      icon: '🌾',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      desc: 'Cánh đồng lúa mênh mông, máy gặt và gia súc gia cầm'
    }
  ];

  const [activeWorkplaceCard, setActiveWorkplaceCard] = useState<string>('place_a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 17) - 2 ITEMS
  // =========================================================================
  interface ListenTickWorkplaceItem {
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

  const [listenTickList, setListenTickList] = useState<ListenTickWorkplaceItem[]>([
    {
      id: 1,
      title: 'Câu 1: Where does she work?',
      audioScript: 'Where does she work? - She works at a nursing home.',
      ipa: '/weər dʌz ʃiː wɜːk? - ʃiː wɜːks æt ə ˈnɜːsɪŋ həʊm/',
      reading: 'Que-ơ đắt-z shi uơ-k? - Shi uơ-ks ét ơ nơ-sính hôm.',
      options: [
        { key: 'a', label: 'at a nursing home', desc: 'Viện dưỡng lão (chăm sóc người già)', icon: '🏥' },
        { key: 'b', label: 'at a hospital', desc: 'Bệnh viện (bệnh nhân nằm giường bệnh)', icon: '🩺' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Bài nghe nói: "She works at a nursing home" -> Đáp án đúng là tranh a.'
    },
    {
      id: 2,
      title: 'Câu 2: Where does he work?',
      audioScript: 'Where does he work? - He works at a factory.',
      ipa: '/weər dʌz hiː wɜːk? - hiː wɜːks æt ə ˈfæktəri/',
      reading: 'Que-ơ đắt-z hi đu? - Hi uơ-ks ét ơ phéc-tơ-ri.',
      options: [
        { key: 'a', label: 'on a farm', desc: 'Người nông dân đứng trên đồng lúa', icon: '🌾' },
        { key: 'b', label: 'at a factory', desc: 'Công nhân đội mũ bảo hộ trong nhà máy', icon: '🏭' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe nói: "He works at a factory" -> Đáp án đúng là tranh b.'
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
  // ACTIVITY 6: GUESSING GAME (TRÒ CHƠI ĐOÁN NGHỀ QUA NƠI LÀM VIỆC)
  // =========================================================================
  const guessingItems = [
    { clue: 'He works on a farm.', clueVi: 'Bác ấy làm việc trên một nông trại.', answer: 'a farmer', answerVi: 'Bác ấy là một người nông dân', icon: '🌾' },
    { clue: 'She works at a hospital.', clueVi: 'Cô ấy làm việc tại một bệnh viện.', answer: 'a doctor / a nurse', answerVi: 'Bác sĩ hoặc y tá', icon: '🩺' },
    { clue: 'He works at a factory.', clueVi: 'Chú ấy làm việc tại một nhà máy.', answer: 'a worker', answerVi: 'Chú ấy là một công nhân', icon: '🏭' },
    { clue: 'She works at a school.', clueVi: 'Cô ấy làm việc tại một trường học.', answer: 'a teacher', answerVi: 'Cô ấy là một giáo viên', icon: '🏫' }
  ];
  const [guessIndex, setGuessIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cấu Trúc Trọng Tâm Unit 12 · Tiết 2
          </span>
          <span className="text-xs text-blue-100 font-bold">Trang 14 - 15 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Hỏi Và Trả Lời Về Nơi Làm Việc (Where does he / she work?)
        </h2>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl space-y-2">
          <p className="text-base font-extrabold text-yellow-300">
            Where does he / she work? - He / She works at / on ...
          </p>
          <div className="text-xs text-blue-100 leading-relaxed space-y-1">
            <p>
              💡 <strong>Lưu ý ngữ pháp 1:</strong> Động từ &quot;work&quot; chia theo ngôi He / She phải thêm &quot;s&quot; ➔ <strong>works</strong>!
            </p>
            <p>
              💡 <strong>Lưu ý ngữ pháp 2:</strong> Riêng nông trại dùng giới từ <strong>&quot;ON&quot; (on a farm)</strong>, các địa điểm còn lại dùng <strong>&quot;AT&quot; (at a nursing home, at a factory, at a school, at a hospital)</strong>.
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
          { id: 6, label: '6. Guessing game', icon: '🎮' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 15) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                  Hoạt Động 1 · Trang 14
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 15 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát tranh và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Ben: What does your mother do? Mai: She is a nurse. Ben: Where does she work? Mai: She works at a nursing home.';
                speakWord(fullText, speechRate);
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-blue-700" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-blue-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dialog.context}</span>
                </div>

                {/* Speaker A */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-amber-700 flex items-center gap-1">
                      <span>{dialog.avatarA}</span> {dialog.speakerA}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textA, speechRate)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {dialog.textA}
                  </p>
                  <p className="text-[11px] font-mono text-blue-700 font-bold">
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
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-blue-800 flex items-center gap-1">
                      <span>{dialog.avatarB}</span> {dialog.speakerB}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textB, speechRate)}
                      className="p-1 text-slate-400 hover:text-blue-700 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-blue-950 text-sm md:text-base leading-snug">
                    {dialog.textB}
                  </p>
                  <p className="text-[11px] font-mono text-blue-700 font-bold">
                    🗣️ {dialog.ipaB}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingB}&quot;
                  </p>
                  <p className="text-xs text-blue-800/80 italic pt-1 border-t border-blue-200">
                    {dialog.meaningB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 16) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                  Hoạt Động 2 · Trang 14
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 16 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Chỉ tranh và luyện nói nơi làm việc)
              </h3>
            </div>
            <div className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
              Cấu trúc: Where does he/she work? - He/She works...
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workplaceCards.map(place => {
              const isActive = activeWorkplaceCard === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveWorkplaceCard(place.id);
                    speakWord(`${place.question} ${place.answer}`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-blue-500 bg-blue-50/60 shadow-md ring-2 ring-blue-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        {place.key}
                      </span>
                      <span className="text-3xl">{place.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {place.title}
                    </h4>

                    {/* IPA + Reading */}
                    <p className="text-[11px] font-mono text-blue-700 font-bold mb-0.5">
                      🗣️ {place.ipa}
                    </p>
                    <p className="text-[11px] text-indigo-700 font-semibold mb-2">
                      📖 {place.reading}
                    </p>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {place.meaningVi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-500 italic block">{place.desc}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(`${place.question} ${place.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
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
              const cur = workplaceCards.find(c => c.id === activeWorkplaceCard);
              if (!cur) return null;
              return (
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cặp câu hỏi và trả lời ({cur.key}):
                  </span>
                  <p className="text-base font-extrabold text-slate-800">
                    A: {cur.question} ➔ B:{' '}
                    <span className="text-blue-700 underline font-black">{cur.answer}</span>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Phát âm: &quot;Que-ơ đắt-z {cur.gender} uơ-k?&quot; ➔ &quot;{cur.answerReading}&quot;)
                  </p>
                </div>
              );
            })()}
            <button
              onClick={() => {
                const cur = workplaceCards.find(c => c.id === activeWorkplaceCard);
                if (cur) speakWord(`${cur.question} ${cur.answer}`, speechRate);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <Volume2 className="w-4 h-4" /> Phát âm mẫu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND TICK (TRACK 17) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                  Hoạt Động 4 · Trang 15
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 17 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick 🎧 (Nghe và chọn bức tranh đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckListenTick}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
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
                      : 'border-slate-200 bg-slate-50/50 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {item.title}
                    </span>
                    <button
                      onClick={() => speakWord(item.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-blue-700" /> Nghe Audio Track 17
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.options.map(opt => {
                      const isSelected = item.userChoice === opt.key;
                      const isAnswerKey = item.correctAnswer === opt.key;

                      let optStyle =
                        'border-slate-200 bg-white text-slate-800 hover:border-blue-300';
                      if (isSelected && !listenTickSubmitted) {
                        optStyle = 'border-blue-500 bg-blue-50 text-blue-950 font-bold shadow-xs';
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
                        Lời thoại mẫu: &quot;{item.audioScript}&quot;
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
      {/* 6. GUESSING GAME (TRÒ CHƠI ĐOÁN NGHỀ) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 15
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Guessing Game 🎮 (Đoán nghề nghiệp từ nơi làm việc)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Cô giáo sẽ gợi ý nơi làm việc (Ví dụ: &quot;He works on a farm&quot;), các bạn hãy đoán xem đó là nghề nghiệp gì nhé!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50 border-2 border-blue-200 max-w-lg mx-auto space-y-4">
            <span className="text-5xl block">{guessingItems[guessIndex].icon}</span>
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest">
                Gợi ý của cô giáo:
              </span>
              <h4 className="text-2xl font-black text-blue-950">
                &quot;{guessingItems[guessIndex].clue}&quot;
              </h4>
              <p className="text-xs text-slate-600 italic">({guessingItems[guessIndex].clueVi})</p>
            </div>

            {showAnswer ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 animate-fadeIn space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block">Đáp án chính xác:</span>
                <p className="text-xl font-black">{guessingItems[guessIndex].answer}</p>
                <p className="text-xs italic">{guessingItems[guessIndex].answerVi}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playVictory();
                  setShowAnswer(true);
                  onAddStar(2);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition"
              >
                Bấm để xem đáp án 💡
              </button>
            )}

            <div className="flex items-center justify-center gap-3 pt-3 border-t border-blue-200">
              <button
                onClick={() => speakWord(guessingItems[guessIndex].clue, speechRate)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 text-slate-700"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe gợi ý
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowAnswer(false);
                  setGuessIndex(prev => (prev + 1) % guessingItems.length);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Câu đố tiếp theo ➡️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
