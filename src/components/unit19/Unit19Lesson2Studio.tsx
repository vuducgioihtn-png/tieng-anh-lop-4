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
  Zap,
  Music,
  Eye,
  CheckSquare,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit19Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit19Lesson2Studio: React.FC<Unit19Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 85)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Mai & Ben đứng trước chuồng chim công',
      speakerA: 'Mai',
      avatarA: '👧',
      textA: 'Do you like the zoo, Ben?',
      ipaA: '/duː juː laɪk ðə zuː bɛn/',
      readingA: 'Đu diu lai-k đờ zu, Ben?',
      meaningA: 'Cậu có thích sở thú không hả Ben?',
      speakerB: 'Ben',
      avatarB: '👦',
      textB: 'Yes, I do. I love peacocks!',
      ipaB: '/jɛs aɪ duː aɪ lʌv ˈpiːkɒks/',
      readingB: 'Dét-s, ai đu. Ai lóp-v pi-cóc-ks!',
      meaningB: 'Có chứ, tớ thích lắm. Tớ yêu những chú chim công!',
      subDialog: {
        speakerA: 'Mai',
        avatarA: '👧',
        textA: 'Why do you like peacocks?',
        ipaA: '/waɪ duː juː laɪk ˈpiːkɒks/',
        readingA: 'Oai đu diu lai-k pi-cóc-ks?',
        meaningA: 'Tại sao cậu lại thích chim công thế?',
        speakerB: 'Ben',
        avatarB: '👦',
        textB: 'Because they dance beautifully.',
        ipaB: '/bɪˈkɒz ðeɪ dɑːns ˈbjuːtəfʊli/',
        readingB: 'Bi-cót-z đê đan-s biu-tơ-phu-li.',
        meaningB: 'Bởi vì chúng xoè đuôi nhảy múa rất là đẹp mắt.'
      },
      context: 'Ben chỉ vào những chú chim công đang xoè bộ lông đuôi rực rỡ sắc màu múa lượn.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Ben hỏi Mai về đàn hươu cao cổ',
      speakerA: 'Ben',
      avatarA: '👦',
      textA: 'Why do you like giraffes, Mai?',
      ipaA: '/waɪ duː juː laɪk dʒɪˈrɑːfs maɪ/',
      readingA: 'Oai đu diu lai-k gi-ra-pht-s, Mai?',
      meaningA: 'Thế tại sao cậu lại thích hươu cao cổ hả Mai?',
      speakerB: 'Mai',
      avatarB: '👧',
      textB: 'Because they run quickly.',
      ipaB: '/bɪˈkɒz ðeɪ rʌn ˈkwɪkli/',
      readingB: 'Bi-cót-z đê răn cuých-cli.',
      meaningB: 'Bởi vì chúng sải chân chạy rất nhanh và thoăn thoắt.',
      context: 'Mai thích thú ngắm đàn hươu cao cổ chạy đua rộn ràng trên thảo nguyên xanh.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 86)
  // =========================================================================
  const animalActions = [
    {
      id: 'lions',
      animal: 'lions',
      animalVi: 'đàn sư tử',
      action: 'roar loudly',
      actionVi: 'gầm to, vang rền',
      icon: '🦁',
      actionIcon: '📢',
      ipaAction: '/rɔː ˈlaʊdli/',
      readingAction: 'ro-r lau-đ-li',
      question: 'Why do you like lions?',
      answer: 'Because they roar loudly.',
      soundEffectDesc: 'Tiếng gầm oai dũng chấn động rừng xanh!',
      color: 'from-amber-600 to-orange-700',
      tagBg: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'giraffes',
      animal: 'giraffes',
      animalVi: 'đàn hươu cao cổ',
      action: 'run quickly',
      actionVi: 'chạy nhanh thoăn thoắt',
      icon: '🦒',
      actionIcon: '🏃',
      ipaAction: '/rʌn ˈkwɪkli/',
      readingAction: 'răn cuých-cli',
      question: 'Why do you like giraffes?',
      answer: 'Because they run quickly.',
      soundEffectDesc: 'Bước chân dài thoăn thoắt lướt qua bãi cỏ!',
      color: 'from-yellow-500 to-amber-600',
      tagBg: 'bg-yellow-100 text-yellow-900 border-yellow-300'
    },
    {
      id: 'peacocks',
      animal: 'peacocks',
      animalVi: 'những chú chim công',
      action: 'dance beautifully',
      actionVi: 'múa đuôi tuyệt đẹp',
      icon: '🦚',
      actionIcon: '💃',
      ipaAction: '/dɑːns ˈbjuːtəfʊli/',
      readingAction: 'đan-s biu-tơ-phu-li',
      question: 'Why do you like peacocks?',
      answer: 'Because they dance beautifully.',
      soundEffectDesc: 'Bộ lông óng ánh xoè rộng múa theo nhịp gió!',
      color: 'from-teal-600 to-emerald-700',
      tagBg: 'bg-teal-100 text-teal-900 border-teal-300'
    },
    {
      id: 'hippos',
      animal: 'hippos',
      animalVi: 'những chú hà mã',
      action: 'swim slowly',
      actionVi: 'bơi lội thong thả',
      icon: '🦛',
      actionIcon: '🏊',
      ipaAction: '/swɪm ˈsləʊli/',
      readingAction: 's-uym slâu-li',
      question: 'Why do you like hippos?',
      answer: 'Because they swim slowly.',
      soundEffectDesc: 'Ngâm mình mát rượi dưới làn nước trong!',
      color: 'from-blue-600 to-indigo-700',
      tagBg: 'bg-blue-100 text-blue-900 border-blue-300'
    }
  ];

  const [selectedAction, setSelectedAction] = useState(animalActions[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const [talkAnimal, setTalkAnimal] = useState(animalActions[0]);
  const [talkSpeaker, setTalkSpeaker] = useState<'A' | 'B'>('A');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND CIRCLE (TRACK 87)
  // =========================================================================
  interface Track87Quiz {
    id: number;
    question: string;
    audioPrompt: string;
    options: {
      key: 'A' | 'B';
      label: string;
      icon: string;
      reason: string;
    }[];
    correctKey: 'A' | 'B';
    explanation: string;
  }

  const track87Questions: Track87Quiz[] = [
    {
      id: 1,
      question: 'Câu 1: Mai và Ben đang nói về loài vật nào?',
      audioPrompt: '1. Why do you like peacocks, Ben? - Because they dance beautifully.',
      options: [
        { key: 'A', label: 'Peacocks (dance beautifully)', icon: '🦚', reason: 'Chim công múa đẹp' },
        { key: 'B', label: 'Lions (roar loudly)', icon: '🦁', reason: 'Sư tử gầm to' }
      ],
      correctKey: 'A',
      explanation: 'Ben trả lời: "Because they dance beautifully", đó là chim công (peacocks)!'
    },
    {
      id: 2,
      question: 'Câu 2: Tại sao bạn học sinh lại yêu thích loài vật này?',
      audioPrompt: '2. Why do you like lions? - Because they roar loudly.',
      options: [
        { key: 'A', label: 'Because they run quickly', icon: '🦒', reason: 'Chạy nhanh' },
        { key: 'B', label: 'Because they roar loudly', icon: '🦁', reason: 'Gầm vang oai phong' }
      ],
      correctKey: 'B',
      explanation: 'Bạn ấy trả lời: "Because they roar loudly" (Bởi vì chúng gầm to)!'
    },
    {
      id: 3,
      question: 'Câu 3: Con vật nào chạy rất nhanh trong bài nghe?',
      audioPrompt: '3. Why do you like giraffes? - Because they run quickly.',
      options: [
        { key: 'A', label: 'Giraffes (run quickly)', icon: '🦒', reason: 'Hươu cao cổ chạy nhanh' },
        { key: 'B', label: 'Hippos (swim slowly)', icon: '🦛', reason: 'Hà mã bơi chậm' }
      ],
      correctKey: 'A',
      explanation: 'Bài nghe nhắc đến "giraffes" và lý do "they run quickly"!'
    }
  ];

  const [act4Answers, setAct4Answers] = useState<Record<number, 'A' | 'B' | null>>({
    1: null,
    2: null,
    3: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectAct4 = (qId: number, key: 'A' | 'B') => {
    sound.playClick();
    setAct4Answers(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(act4Answers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correctCount = 0;
    track87Questions.forEach(q => {
      if (act4Answers[q.id] === q.correctKey) {
        correctCount++;
      }
    });

    if (correctCount === 3) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correctCount);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setAct4Answers({ 1: null, 2: null, 3: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [act5_1, setAct5_1] = useState('');
  const [act5_2, setAct5_2] = useState('');
  const [act5_3, setAct5_3] = useState('');
  const [act5_4, setAct5_4] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let score = 0;
    if (act5_1.trim().toLowerCase() === 'beautifully') score++;
    if (act5_2.trim().toLowerCase() === 'roar') score++;
    if (act5_3.trim().toLowerCase() === 'why') score++;
    if (act5_4.trim().toLowerCase() === 'because') score++;

    if (score === 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(score);
    }
  };

  const handleResetAct5 = () => {
    sound.playClick();
    setAct5_1('');
    setAct5_2('');
    setAct5_3('');
    setAct5_4('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S PLAY - ANIMAL MIMING & REASON SPEED GAME
  // =========================================================================
  const gameChallenges = [
    {
      id: 1,
      targetAnimal: 'Lions 🦁',
      clue: 'Vua sư tử bờm vàng gầm vang cả khu rừng!',
      actionMime: 'Gầm to: Roar loudly! 📢',
      options: ['Because they roar loudly', 'Because they dance beautifully', 'Because they swim slowly'],
      correctIdx: 0
    },
    {
      id: 2,
      targetAnimal: 'Peacocks 🦚',
      clue: 'Bộ lông đuôi xanh lục xoè ra như chiếc quạt hoa!',
      actionMime: 'Múa lượn duyên dáng: Dance beautifully! 💃',
      options: ['Because they run quickly', 'Because they dance beautifully', 'Because they climb trees'],
      correctIdx: 1
    },
    {
      id: 3,
      targetAnimal: 'Giraffes 🦒',
      clue: 'Cặp chân dài thoăn thoắt sải bước thật mau!',
      actionMime: 'Chạy thần tốc: Run quickly! 🏃',
      options: ['Because they roar loudly', 'Because they run quickly', 'Because they jump high'],
      correctIdx: 1
    }
  ];

  const [gameStep, setGameStep] = useState(0);
  const [selectedGameChoice, setSelectedGameChoice] = useState<number | null>(null);
  const [gameIsCorrect, setGameIsCorrect] = useState<boolean | null>(null);

  const handleGameAnswer = (index: number) => {
    setSelectedGameChoice(index);
    if (index === gameChallenges[gameStep].correctIdx) {
      sound.playSuccess();
      setGameIsCorrect(true);
      onAddStar(2);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      sound.playWrong();
      setGameIsCorrect(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <span>🦒 Unit 19 · Lesson 2</span>
              <span>· Trang 60 - 61 SGK</span>
            </span>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>⬅️ Tiết 1</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Tiết 3 ➡️</span>
                </button>
              )}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>Hỏi & Giải Thích Lý Do Yêu Thích Động Vật</span>
            <span className="text-3xl">🦁🦚</span>
          </h2>
          <p className="text-amber-100 text-sm md:text-base max-w-3xl leading-relaxed">
            Học mẫu câu <strong>&quot;Why do you like ...? - Because they ...&quot;</strong> và các trạng từ chỉ cách thức đặc sắc: 
            <span className="underline decoration-yellow-300 font-bold ml-1">roar loudly</span> (gầm to), 
            <span className="underline decoration-yellow-300 font-bold ml-1">run quickly</span> (chạy nhanh), 
            <span className="underline decoration-yellow-300 font-bold ml-1">dance beautifully</span> (múa đẹp).
          </p>

          {/* Activity Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: '1. Hội Thoại Mẫu', icon: '🎧' },
              { id: 2, label: '2. Luyện Nói & Trạng Từ', icon: '🗣️' },
              { id: 3, label: '3. Phỏng Vấn Thú Cưng', icon: '🎤' },
              { id: 4, label: '4. Nghe & Khoanh Tròn', icon: '📝' },
              { id: 5, label: '5. Nhìn & Điền Từ', icon: '✍️' },
              { id: 6, label: '6. Trò Chơi Đoán Lý Do', icon: '🎮' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSection(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === tab.id
                    ? 'bg-white text-amber-900 shadow-md scale-105'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 85)
      ===================================================================== */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 85
                </span>
                <span className="text-xs text-slate-500">Trang 60 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Quan sát, nghe và nhắc lại)
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                speakWord(
                  "Do you like the zoo, Ben? Yes, I do. Why do you like peacocks? Because they dance beautifully. Why do you like giraffes, Mai? Because they run quickly.",
                  speechRate
                );
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-md hover:from-amber-700 hover:to-orange-700 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Bài Mẫu (Track 85)</span>
            </button>
          </div>

          {/* Dialog Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(step => (
              <div
                key={step.id}
                className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/60 space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
                  <span className="text-xs font-black text-amber-900 uppercase">
                    {step.part}
                  </span>
                  <span className="text-xs bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    SGK Trang 60
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-amber-100">
                  💡 {step.context}
                </p>

                {/* Lines */}
                <div className="space-y-3">
                  {/* Speaker A */}
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarA}</span>
                        <span className="font-black text-xs text-amber-900">{step.speakerA}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textA, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textA}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaA}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingA}
                      </span>
                      <span className="text-xs text-slate-600 italic">
                        👉 {step.meaningA}
                      </span>
                    </div>
                  </div>

                  {/* Speaker B */}
                  <div className="bg-amber-100/60 p-3.5 rounded-xl border border-amber-300 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarB}</span>
                        <span className="font-black text-xs text-amber-900">{step.speakerB}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textB, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 transition"
                        title="Nghe câu này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textB}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaB}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingB}
                      </span>
                      <span className="text-xs text-slate-700 italic font-medium">
                        👉 {step.meaningB}
                      </span>
                    </div>
                  </div>

                  {/* SubDialog if exists (for step a) */}
                  {step.subDialog && (
                    <div className="mt-2 pt-2 border-t border-amber-200/80 space-y-2">
                      <div className="bg-white p-3 rounded-xl border border-amber-200/80 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-amber-900">
                            {step.subDialog.speakerA} (Hỏi lý do):
                          </span>
                          <button
                            onClick={() => speakWord(step.subDialog!.textA, speechRate)}
                            className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-slate-900">{step.subDialog.textA}</p>
                        <p className="text-xs text-slate-600 italic">👉 {step.subDialog.meaningA}</p>
                      </div>

                      <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-amber-900">
                            {step.subDialog.speakerB} (Trả lời):
                          </span>
                          <button
                            onClick={() => speakWord(step.subDialog!.textB, speechRate)}
                            className="p-1.5 rounded-lg bg-amber-200 text-amber-900 hover:bg-amber-300 transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-slate-900">{step.subDialog.textB}</p>
                        <p className="text-xs text-slate-700 italic">👉 {step.subDialog.meaningB}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Grammar Rule Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-xs uppercase flex items-center gap-1 w-fit">
                <Lightbulb className="w-3.5 h-3.5" /> Bí Kíp Ghi Nhớ Ngữ Pháp
              </span>
              <p className="font-black text-slate-900 text-sm md:text-base">
                Hỏi lý do dùng <code className="text-amber-800 bg-white px-2 py-0.5 rounded font-bold">Why do you like [loài vật]?</code>
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                👉 Trả lời bắt đầu bằng <code className="text-amber-800 bg-white px-2 py-0.5 rounded font-bold">Because they + [hành động]</code> (Bởi vì chúng...). Đuôi <code className="text-red-700 bg-white px-1.5 py-0.5 rounded font-bold">-LY</code> biến tính từ thành trạng từ chỉ cách thức hành động!
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveSection(2);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
            >
              <span>Luyện 4 Hành Động (Tiết 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: LISTEN, POINT AND SAY (TRACK 86)
      ===================================================================== */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Track 86
                </span>
                <span className="text-xs text-slate-500">Trang 60 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (Nghe, chỉ và nói hành động của thú cưng)
              </h3>
            </div>

            <div className="text-xs text-slate-500 italic bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              Nhấn vào từng thẻ để nghe câu hỏi & câu trả lời mẫu!
            </div>
          </div>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {animalActions.map(item => {
              const isSelected = selectedAction.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedAction(item);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all text-center space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/70 shadow-lg scale-102'
                      : 'border-slate-200 hover:border-amber-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-2xl">{item.actionIcon}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-lg text-slate-900 capitalize">{item.animal}</h4>
                    <p className="text-xs text-slate-500">{item.animalVi}</p>
                  </div>

                  <div className={`p-2.5 rounded-xl border font-bold text-xs ${item.tagBg}`}>
                    <p className="text-sm font-black text-slate-900">{item.action}</p>
                    <p className="text-[11px] font-mono text-slate-600">{item.ipaAction}</p>
                    <p className="text-[11px] text-amber-900 mt-0.5">🗣️ {item.readingAction}</p>
                    <p className="text-[11px] text-slate-600 italic mt-0.5">👉 {item.actionVi}</p>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      sound.playClick();
                      speakWord(`${item.question} ${item.answer}`, speechRate);
                    }}
                    className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện Nói</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Action Studio Stage */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-6 border border-amber-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedAction.icon}</span>
                <span className="font-black text-slate-900 text-base">
                  Mẫu Câu Thực Hành: {selectedAction.animal.toUpperCase()} + {selectedAction.action.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
                {selectedAction.soundEffectDesc}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase">Hỏi Lý Do:</span>
                  <button
                    onClick={() => speakWord(selectedAction.question, speechRate)}
                    className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900">{selectedAction.question}</p>
                <p className="text-xs text-slate-600 italic">
                  👉 Tại sao bạn lại yêu thích {selectedAction.animalVi}?
                </p>
              </div>

              {/* Answer */}
              <div className="bg-amber-600 text-white p-4 rounded-2xl border border-amber-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-100 uppercase">Trả Lời (Lý Do):</span>
                  <button
                    onClick={() => speakWord(selectedAction.answer, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black">{selectedAction.answer}</p>
                <p className="text-xs text-amber-100 italic">
                  👉 Bởi vì chúng {selectedAction.actionVi}.
                </p>
              </div>
            </div>

            {/* Adverbs Spotlight */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-amber-200 space-y-2">
              <h5 className="font-black text-xs text-slate-900 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Bảng Trạng Từ Chỉ Cách Thức (Adverbs of Manner kết thúc bằng -ly):</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="font-bold text-slate-900">loud (to) ➡️ <span className="text-amber-800 font-black">loudly</span></p>
                  <p className="text-[11px] text-slate-500">Lions roar loudly (Gầm to vang rền)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="font-bold text-slate-900">quick (nhanh) ➡️ <span className="text-amber-800 font-black">quickly</span></p>
                  <p className="text-[11px] text-slate-500">Giraffes run quickly (Chạy nhanh)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="font-bold text-slate-900">beautiful (đẹp) ➡️ <span className="text-amber-800 font-black">beautifully</span></p>
                  <p className="text-[11px] text-slate-500">Peacocks dance beautifully (Múa đẹp)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: LET'S TALK
      ===================================================================== */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 3 · Let&apos;s talk
                </span>
                <span className="text-xs text-slate-500">Trang 60 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Luyện Nói Phỏng Vấn: &quot;Why do you like ...?&quot;
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTalkSpeaker('A')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  talkSpeaker === 'A'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Vai Người Hỏi (Speaker A)
              </button>
              <button
                onClick={() => setTalkSpeaker('B')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  talkSpeaker === 'B'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Vai Người Đáp (Speaker B)
              </button>
            </div>
          </div>

          {/* Quick Animal Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {animalActions.map(an => (
              <button
                key={an.id}
                onClick={() => {
                  sound.playClick();
                  setTalkAnimal(an);
                }}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                  talkAnimal.id === an.id
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 font-bold'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <span className="text-3xl">{an.icon}</span>
                <span className="text-xs font-black text-slate-900 capitalize">{an.animal}</span>
                <span className="text-[11px] text-slate-500">{an.action}</span>
              </button>
            ))}
          </div>

          {/* Roleplay Stage */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/80">
              <span className="text-xs font-black text-amber-900 uppercase">
                Phòng Thu Đối Thoại Trực Quan: {talkAnimal.animalVi} ({talkAnimal.icon})
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(
                    `Why do you like ${talkAnimal.animal}? Because they ${talkAnimal.action}.`,
                    speechRate
                  );
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe Trọn Vẹn Cả 2 Câu</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Speaker A Bubble */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  talkSpeaker === 'A'
                    ? 'bg-white border-amber-500 ring-2 ring-amber-200 shadow-sm'
                    : 'bg-white/70 border-slate-200 opacity-90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👦</span>
                    <span className="font-black text-xs text-amber-900">Người hỏi:</span>
                  </div>
                  <button
                    onClick={() => speakWord(`Why do you like ${talkAnimal.animal}?`, speechRate)}
                    className="p-1.5 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900 mt-1">
                  Why do you like <span className="text-amber-700 underline">{talkAnimal.animal}</span>?
                </p>
                <p className="text-xs text-slate-500 italic">
                  (Tại sao bạn lại thích {talkAnimal.animalVi}?)
                </p>
              </div>

              {/* Speaker B Bubble */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  talkSpeaker === 'B'
                    ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-300 shadow-sm'
                    : 'bg-amber-100/70 border-amber-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👧</span>
                    <span className="font-black text-xs uppercase">Người trả lời:</span>
                  </div>
                  <button
                    onClick={() => speakWord(`Because they ${talkAnimal.action}.`, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-current transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black mt-1">
                  Because they <span className="underline font-black">{talkAnimal.action}</span>.
                </p>
                <p className="text-xs italic opacity-90">
                  (Bởi vì chúng {talkAnimal.actionVi}.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: LISTEN AND CIRCLE (TRACK 87)
      ===================================================================== */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Track 87
                </span>
                <span className="text-xs text-slate-500">Trang 61 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and circle (Lắng nghe và khoanh tròn đáp án đúng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct4}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct4}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Kiểm tra bài
              </button>
            </div>
          </div>

          {/* Quiz Cards */}
          <div className="space-y-4">
            {track87Questions.map(q => {
              const userPick = act4Answers[q.id];
              const isSubmitted = act4Submitted;
              const isCorrect = userPick === q.correctKey;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50/80 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center">
                        {q.id}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{q.question}</h4>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.audioPrompt, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Băng Âm Thanh #{q.id}</span>
                    </button>
                  </div>

                  {/* 2 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    {q.options.map(opt => {
                      const isChosen = userPick === opt.key;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-300';
                      if (isChosen) {
                        btnStyle = 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-200 font-bold';
                      }
                      if (isSubmitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectAct4(q.id, opt.key)}
                          className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-black text-sm">{opt.key}.</span>
                            <span className="text-2xl">{opt.icon}</span>
                            <div>
                              <p className="font-bold text-xs">{opt.label}</p>
                              <p className="text-[11px] opacity-80">{opt.reason}</p>
                            </div>
                          </div>
                          {isChosen && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-700">
                      <p className="font-bold">
                        {isCorrect ? '✅ Rất chính xác!' : '❌ Chưa chính xác!'}
                      </p>
                      <p className="text-slate-600 mt-0.5">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 5: LOOK, COMPLETE AND READ
      ===================================================================== */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Look, complete and read
                </span>
                <span className="text-xs text-slate-500">Trang 61 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Quan sát tranh, điền từ còn thiếu vào chỗ trống và đọc to
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct5}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct5}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          {/* Word Bank Suggestions */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-amber-900 uppercase">Gợi ý từ vựng cần điền:</span>
            {['beautifully', 'roar', 'Why', 'Because'].map(w => (
              <span
                key={w}
                className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-mono font-bold text-amber-900"
              >
                {w}
              </span>
            ))}
          </div>

          {/* 4 Fill-in Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">1. Đàn chim công múa 🦚</span>
                <button
                  onClick={() => speakWord("Why do you like peacocks? Because they dance beautifully.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">A: Why do you like peacocks?</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: Because they dance</span>
                <input
                  type="text"
                  value={act5_1}
                  onChange={e => setAct5_1(e.target.value)}
                  placeholder="điền từ..."
                  className={`w-32 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border focus:outline-hidden ${
                    act5Submitted
                      ? act5_1.trim().toLowerCase() === 'beautifully'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                <span>.</span>
              </div>
              {act5Submitted && act5_1.trim().toLowerCase() !== 'beautifully' && (
                <p className="text-xs text-rose-600">👉 Đáp án đúng: <strong>beautifully</strong></p>
              )}
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">2. Đàn sư tử gầm to 🦁</span>
                <button
                  onClick={() => speakWord("Why do you like lions? Because they roar loudly.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">A: Why do you like lions?</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: Because they</span>
                <input
                  type="text"
                  value={act5_2}
                  onChange={e => setAct5_2(e.target.value)}
                  placeholder="điền từ..."
                  className={`w-24 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border focus:outline-hidden ${
                    act5Submitted
                      ? act5_2.trim().toLowerCase() === 'roar'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                <span>loudly.</span>
              </div>
              {act5Submitted && act5_2.trim().toLowerCase() !== 'roar' && (
                <p className="text-xs text-rose-600">👉 Đáp án đúng: <strong>roar</strong></p>
              )}
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">3. Đàn hươu chạy nhanh 🦒</span>
                <button
                  onClick={() => speakWord("Why do you like giraffes? Because they run quickly.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>A:</span>
                <input
                  type="text"
                  value={act5_3}
                  onChange={e => setAct5_3(e.target.value)}
                  placeholder="điền từ..."
                  className={`w-24 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border focus:outline-hidden ${
                    act5Submitted
                      ? act5_3.trim().toLowerCase() === 'why'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                <span>do you like giraffes?</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">B: Because they run quickly.</p>
              {act5Submitted && act5_3.trim().toLowerCase() !== 'why' && (
                <p className="text-xs text-rose-600">👉 Đáp án đúng: <strong>Why</strong></p>
              )}
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">4. Đàn hà mã tắm nước 🦛</span>
                <button
                  onClick={() => speakWord("Why do you like hippos? Because they swim slowly.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">A: Why do you like hippos?</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B:</span>
                <input
                  type="text"
                  value={act5_4}
                  onChange={e => setAct5_4(e.target.value)}
                  placeholder="điền từ..."
                  className={`w-28 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border focus:outline-hidden ${
                    act5Submitted
                      ? act5_4.trim().toLowerCase() === 'because'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                <span>they swim slowly.</span>
              </div>
              {act5Submitted && act5_4.trim().toLowerCase() !== 'because' && (
                <p className="text-xs text-rose-600">👉 Đáp án đúng: <strong>Because</strong></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: LET'S PLAY - ANIMAL REASONS SPEED CHALLENGE
      ===================================================================== */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Hoạt Động 6 · Let&apos;s Play
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Trò Chơi Thử Thách: Động Tác Bí Ẩn & Lý Do Yêu Thích 🎮
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-xl font-bold">
                Thử thách {gameStep + 1} / {gameChallenges.length}
              </span>
            </div>
          </div>

          {/* Current Game Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4 max-w-2xl mx-auto text-center">
            <span className="text-4xl block">
              {gameChallenges[gameStep].targetAnimal.split(' ')[1]}
            </span>
            <h4 className="text-2xl font-black">{gameChallenges[gameStep].targetAnimal}</h4>
            <p className="text-sm text-amber-100">{gameChallenges[gameStep].clue}</p>
            <div className="inline-block px-4 py-2 rounded-xl bg-white/20 font-bold text-sm">
              🎭 Động tác mô phỏng: {gameChallenges[gameStep].actionMime}
            </div>

            {/* Choices */}
            <div className="space-y-2.5 pt-3">
              {gameChallenges[gameStep].options.map((opt, idx) => {
                const isChosen = selectedGameChoice === idx;
                let btnStyle = 'bg-white/20 hover:bg-white/30 text-white';
                if (isChosen) {
                  btnStyle = gameIsCorrect
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                    : 'bg-rose-500 text-white';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleGameAnswer(idx)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isChosen && gameIsCorrect && <span>🌟 Chuẩn xác!</span>}
                  </button>
                );
              })}
            </div>

            {/* Next step button */}
            {gameIsCorrect && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedGameChoice(null);
                    setGameIsCorrect(null);
                    if (gameStep < gameChallenges.length - 1) {
                      setGameStep(prev => prev + 1);
                    } else {
                      setGameStep(0);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white text-amber-900 font-black text-xs hover:bg-amber-100 transition shadow-md"
                >
                  {gameStep < gameChallenges.length - 1 ? 'Qua Thử Thách Kế Tiếp ➡️' : 'Chơi Lại Từ Đầu 🔄'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
