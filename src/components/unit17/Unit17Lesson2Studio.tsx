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
  ArrowUp,
  ArrowLeft,
  RotateCcw as RotateCcwIcon,
  Compass,
  MapPin,
  Store,
  Film,
  ShoppingCart,
  Croissant
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit17Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit17Lesson2Studio: React.FC<Unit17Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 66)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Hỏi địa điểm muốn đến',
      speakerA: 'Mary & Bill',
      avatarA: '👧👦',
      textA: 'We want to buy some books.',
      ipaA: '/wiː wɒnt tuː baɪ sʌm bʊks/',
      readingA: 'Uuy uon-t tu bai săm búc-s.',
      meaningA: 'Chúng cháu muốn mua một vài cuốn sách ạ.',
      speakerB: 'Friendly Man',
      avatarB: '👨',
      textB: 'There’s a bookshop in Hoa Binh Street.',
      ipaB: '/ðeəz ə ˈbʊkʃɒp ɪn hoə bɪn striːt/',
      readingB: 'Đe-ơ-z ờ búc-shóp in Hoà Bình s-trít.',
      meaningB: 'Có một hiệu sách ở trên đường Hoà Bình đó cháu.',
      context: 'Hai bạn nhỏ gặp một chú tốt bụng trên phố và hỏi nơi bán sách.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Hỏi và chỉ đường đi',
      speakerA: 'Mary & Bill',
      avatarA: '👧👦',
      textA: 'How can we get there?',
      ipaA: '/haʊ kæn wiː ɡɛt ðeə/',
      readingA: 'Hao can uuy gét đe-ơ?',
      meaningA: 'Làm thế nào để chúng cháu đến được đó ạ?',
      speakerB: 'Friendly Man',
      avatarB: '👨',
      textB: 'Go straight and turn left.',
      ipaB: '/ɡəʊ streɪt ænd tɜːn lɛft/',
      readingB: 'Gâu s-trây-t èn-đ tơn lép-ft.',
      meaningB: 'Các cháu hãy đi thẳng rồi rẽ trái nhé.',
      speakerExtra: 'Mary & Bill',
      avatarExtra: '👧👦',
      textExtra: 'Thank you.',
      ipaExtra: '/θæŋk juː/',
      readingExtra: 'Thanh-k ju.',
      meaningExtra: 'Chúng cháu cảm ơn chú ạ.',
      context: 'Chú chỉ tay về phía trước hướng dẫn đường đi cụ thể.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 67)
  // =========================================================================
  const directionCards = [
    {
      id: 'bookshop',
      destination: 'bookshop',
      ipaDest: '/ˈbʊkʃɒp/',
      readingDest: 'búc-shóp',
      meaningDest: 'hiệu sách',
      action: 'go straight',
      ipaAction: '/ɡəʊ streɪt/',
      readingAction: 'gâu s-trây-t',
      meaningAction: 'đi thẳng về phía trước',
      icon: '📚',
      actionIcon: '⬆️',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'supermarket',
      destination: 'supermarket',
      ipaDest: '/ˈsuːpəmɑːkɪt/',
      readingDest: 'su-pơ-ma-kịt',
      meaningDest: 'siêu thị',
      action: 'turn right',
      ipaAction: '/tɜːn raɪt/',
      readingAction: 'tơn rai-t',
      meaningAction: 'rẽ phải',
      icon: '🛒',
      actionIcon: '➡️',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'cinema',
      destination: 'cinema',
      ipaDest: '/ˈsɪnəmə/',
      readingDest: 'si-nơ-mờ',
      meaningDest: 'rạp chiếu phim',
      action: 'turn left',
      ipaAction: '/tɜːn lɛft/',
      readingAction: 'tơn lép-ft',
      meaningAction: 'rẽ trái',
      icon: '🎬',
      actionIcon: '⬅️',
      color: 'from-purple-500 to-fuchsia-600'
    },
    {
      id: 'bakery',
      destination: 'bakery',
      ipaDest: '/ˈbeɪkəri/',
      readingDest: 'bây-kơ-ri',
      meaningDest: 'tiệm bánh mì/bánh ngọt',
      action: 'turn round',
      ipaAction: '/tɜːn raʊnd/',
      readingAction: 'tơn rao-n-đ',
      meaningAction: 'quay đầu xe / quay ngược lại',
      icon: '🥐',
      actionIcon: '↩️',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const [selectedDirection, setSelectedDirection] = useState(directionCards[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const talkDestinations = [
    { name: 'bookshop', icon: '📚', instruction: 'Go straight and turn left.' },
    { name: 'cinema', icon: '🎬', instruction: 'Turn left at the corner.' },
    { name: 'bakery', icon: '🥐', instruction: 'Turn round and go straight.' },
    { name: 'supermarket', icon: '🛒', instruction: 'Go straight and turn right.' }
  ];
  const [selectedTalkDest, setSelectedTalkDest] = useState(talkDestinations[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 68)
  // =========================================================================
  interface Track68Item {
    id: number;
    title: string;
    targetPlace: string;
    icon: string;
    audioScript: string;
    options: {
      key: 'a' | 'b';
      label: string;
      desc: string;
    }[];
    correctKey: 'a' | 'b';
  }

  const track68Items: Track68Item[] = [
    {
      id: 1,
      title: 'Câu 1: Đi đến bể bơi / bãi biển',
      targetPlace: 'swimming pool',
      icon: '🏊',
      audioScript: 'How can I get to the swimming pool? - Turn round and go straight.',
      options: [
        { key: 'a', label: 'Rẽ trái rồi đi thẳng', desc: 'Mũi tên rẽ trái vào đường cạnh' },
        { key: 'b', label: 'Quay đầu lại rồi đi thẳng', desc: 'Mũi tên uốn lượn quay ngược chiều' }
      ],
      correctKey: 'b'
    },
    {
      id: 2,
      title: 'Câu 2: Đi đến tiệm bánh mì (Bakery)',
      targetPlace: 'bakery',
      icon: '🥐',
      audioScript: 'How can I get to the bakery? - Go straight.',
      options: [
        { key: 'a', label: 'Đi thẳng một đoạn', desc: 'Mũi tên hướng thẳng về phía tiệm bánh' },
        { key: 'b', label: 'Rẽ phải sang ngõ rẽ', desc: 'Mũi tên rẽ phải' }
      ],
      correctKey: 'a'
    }
  ];

  const [userTrack68, setUserTrack68] = useState<Record<number, 'a' | 'b' | null>>({
    1: null,
    2: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectTrack68 = (qId: number, key: 'a' | 'b') => {
    sound.playClick();
    setUserTrack68(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userTrack68).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    track68Items.forEach(item => {
      if (userTrack68[item.id] === item.correctKey) {
        correct++;
      }
    });

    if (correct === 2) {
      sound.playComplete();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct * 2);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserTrack68({ 1: null, 2: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [act5_1_1, setAct5_1_1] = useState('');
  const [act5_1_2, setAct5_1_2] = useState('');
  const [act5_2_1, setAct5_2_1] = useState('');
  const [act5_2_2, setAct5_2_2] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let allRight = true;

    if (!act5_1_1.trim().toLowerCase().includes('shopping centre') && !act5_1_1.trim().toLowerCase().includes('shopping center')) allRight = false;
    if (act5_1_2.trim().toLowerCase() !== 'right') allRight = false;
    if (act5_2_1.trim().toLowerCase() !== 'how') allRight = false;
    if (act5_2_2.trim().toLowerCase() !== 'right' && act5_2_2.trim().toLowerCase() !== 'left') allRight = false;

    if (allRight) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(2);
    }
  };

  const handleResetAct5 = () => {
    sound.playClick();
    setAct5_1_1('');
    setAct5_1_2('');
    setAct5_2_1('');
    setAct5_2_2('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S PLAY - "SHOW ME THE WAY" (GAME CHỈ ĐƯỜNG)
  // =========================================================================
  const waypoints = [
    { id: 'bakery', name: 'tiệm bánh mì (Bakery)', icon: '🥐', targetStep: 'Go straight and turn left.' },
    { id: 'cinema', name: 'rạp chiếu phim (Cinema)', icon: '🎬', targetStep: 'Go straight.' },
    { id: 'bookshop', name: 'hiệu sách (Bookshop)', icon: '📚', targetStep: 'Turn right.' },
    { id: 'food_stall', name: 'quầy ăn vặt (Food stall)', icon: '🍢', targetStep: 'Go straight and turn right.' }
  ];

  const [currentMission, setCurrentMission] = useState(waypoints[0]);
  const [userNavChoice, setUserNavChoice] = useState<string | null>(null);
  const [navScore, setNavScore] = useState(0);

  const navCommands = [
    { label: 'Go straight and turn left.', icon: '⬆️ ⬅️' },
    { label: 'Go straight.', icon: '⬆️' },
    { label: 'Turn right.', icon: '➡️' },
    { label: 'Go straight and turn right.', icon: '⬆️ ➡️' },
    { label: 'Turn round.', icon: '↩️' }
  ];

  const handleChooseNav = (cmd: string) => {
    sound.playClick();
    setUserNavChoice(cmd);
    if (cmd === currentMission.targetStep) {
      sound.playSuccess();
      setNavScore(prev => prev + 1);
      onAddStar(1);
      setTimeout(() => {
        const remaining = waypoints.filter(w => w.id !== currentMission.id);
        const nextW = remaining[Math.floor(Math.random() * remaining.length)];
        setCurrentMission(nextW);
        setUserNavChoice(null);
      }, 1200);
    } else {
      sound.playWarning();
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation Sub-bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          {[1, 2, 3, 4, 5, 6].map(sec => (
            <button
              key={sec}
              onClick={() => {
                sound.playClick();
                setActiveSection(sec);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                activeSection === sec
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>HĐ {sec}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onSwitchToLesson1 && (
            <button
              onClick={onSwitchToLesson1}
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition flex items-center gap-1 border border-teal-200"
            >
              <span>⬅️ Tiết 1: Biển Báo Giao Thông</span>
            </button>
          )}
          {onSwitchToLesson3 && (
            <button
              onClick={onSwitchToLesson3}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition flex items-center gap-1 border border-indigo-200"
            >
              <span>Tiết 3: Ngữ Âm &amp; Bài Viết ➡️</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 1: LOOK, LISTEN AND REPEAT */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                Trang 48 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 66</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              1. Look, listen and repeat (Hỏi đường đi đến hiệu sách)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Mary và Bill hỏi đường đi hiệu sách trên phố Hoà Bình: <em>How can we get there? - Go straight and turn left.</em>
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                "We want to buy some books. There's a bookshop in Hoa Binh Street. How can we get there? Go straight and turn left. Thank you.",
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe toàn bộ đoạn thoại 🔊</span>
          </button>
        </div>

        {/* Dialog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dialogSteps.map(step => (
            <div
              key={step.id}
              className="bg-gradient-to-br from-blue-50/40 via-sky-50/20 to-indigo-50/30 rounded-3xl p-5 md:p-6 border-2 border-blue-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-blue-800">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-blue-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-blue-900 font-medium bg-blue-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarB}</span>
                    <span className="font-bold text-xs text-emerald-700">{step.speakerB}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textB, speechRate)}
                    className="p-1 rounded-lg hover:bg-emerald-50 text-emerald-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textB}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaB}</p>
                <p className="text-xs text-emerald-900 font-medium bg-emerald-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingB}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningB}</p>
              </div>

              {/* Optional Extra */}
              {step.textExtra && (
                <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{step.avatarExtra}</span>
                      <span className="font-bold text-xs text-blue-700">{step.speakerExtra}:</span>
                    </div>
                    <button
                      onClick={() => speakWord(step.textExtra, speechRate)}
                      className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textExtra}</p>
                  <p className="text-xs text-slate-600 italic">Dịch: {step.meaningExtra}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 2: LISTEN, POINT AND SAY */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
              Trang 48 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 67</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600" />
            2. Listen, point and say (Hỏi &amp; Chỉ đường đến 4 địa điểm)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Cấu trúc hỏi: <strong>How can I get to the ______?</strong> ➡️ Chỉ đường: <strong>Go straight / Turn left / Turn right / Turn round.</strong>
          </p>
        </div>

        {/* 4 Directions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directionCards.map(c => {
            const isSelected = selectedDirection.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedDirection(c);
                  speakWord(`How can I get to the ${c.destination}? ${c.action}.`, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      {c.icon}
                    </span>
                    <span className="text-2xl p-2 bg-blue-50 rounded-2xl text-blue-700">
                      {c.actionIcon}
                    </span>
                  </div>

                  <h4 className="font-black text-base text-slate-800 mt-3 capitalize">
                    {c.destination}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">{c.ipaDest}</p>
                  <p className="text-xs text-slate-500 mt-0.5 italic">{c.meaningDest}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <p className="text-xs font-black text-blue-700 uppercase tracking-wide">
                    {c.action}
                  </p>
                  <p className="text-[11px] text-slate-400 italic">{c.meaningAction}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-2 border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-black uppercase text-blue-800 tracking-wider">
              Chỉ đường đến: &quot;{selectedDirection.destination}&quot; {selectedDirection.icon}
            </span>
            <p className="font-black text-lg text-slate-800">
              Q: How can I get to the {selectedDirection.destination}?
            </p>
            <p className="font-black text-lg text-blue-700 flex items-center gap-2 justify-center md:justify-start">
              <span>A: {selectedDirection.action}.</span>
              <span className="text-xl">{selectedDirection.actionIcon}</span>
            </p>
            <p className="text-xs text-slate-600 italic">
              💡 {selectedDirection.meaningDest} · {selectedDirection.meaningAction}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`How can I get to the ${selectedDirection.destination}? ${selectedDirection.action}.`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu thoại 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-blue-800 border border-blue-300 font-bold text-xs hover:bg-blue-100 transition active:scale-95"
            >
              <span>Đọc to nhận sao (+1 ⭐)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 3: LET'S TALK */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
              Trang 48 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Sơ Đồ Giao Lộ</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-teal-600" />
            3. Let’s talk (Hỏi đường trên bản đồ thị trấn)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn địa điểm để luyện phản xạ hỏi và chỉ dẫn hướng đi:
          </p>
        </div>

        {/* 4 Places */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {talkDestinations.map(d => {
            const isDActive = selectedTalkDest.name === d.name;
            return (
              <button
                key={d.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedTalkDest(d);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isDActive
                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <span className="text-4xl mb-1">{d.icon}</span>
                <span className="font-extrabold text-sm capitalize text-slate-800">{d.name}</span>
                <span className="text-xs text-teal-700 font-bold mt-1 text-center">{d.instruction}</span>
              </button>
            );
          })}
        </div>

        {/* Dialog Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-black text-base text-slate-800">
              Q: How can I get to the {selectedTalkDest.name}?
            </p>
            <p className="font-black text-base text-teal-700">
              A: {selectedTalkDest.instruction}
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                `How can I get to the ${selectedTalkDest.name}? ${selectedTalkDest.instruction}`,
                speechRate
              )
            }
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu phản xạ 🔊</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: LISTEN AND TICK (TRACK 68) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 49 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 68</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              4. Listen and tick (Nghe và đánh dấu vào hướng đi đúng)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lắng nghe câu hướng dẫn chỉ đường và chọn hình vẽ lộ trình đúng (Hình a hoặc Hình b).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct4}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+4 ⭐)
            </button>
          </div>
        </div>

        {/* 2 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {track68Items.map(item => {
            const userChoice = userTrack68[item.id];
            const isCorrect = userChoice === item.correctKey;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{item.icon}</span>
                    <h4 className="font-extrabold text-sm md:text-base text-slate-800">
                      {item.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => speakWord(item.audioScript, speechRate)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu {item.id} 🔊</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {item.options.map(opt => {
                    const isSelected = userChoice === opt.key;
                    let optStyle = 'border-slate-200 bg-white hover:border-indigo-300';

                    if (act4Submitted) {
                      if (opt.key === item.correctKey) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-400';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectTrack68(item.id, opt.key)}
                        disabled={act4Submitted}
                        className={`p-3.5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-1.5 ${optStyle}`}
                      >
                        <span className="font-black text-xs uppercase text-slate-500">
                          Hình {opt.key.toUpperCase()}
                        </span>
                        <span className="font-bold text-xs text-slate-800 leading-snug">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-slate-400">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {act4Submitted && (
                  <p className="text-xs font-bold text-center pt-1">
                    {isCorrect ? (
                      <span className="text-emerald-700">✓ Hoan hô! Hình {item.correctKey.toUpperCase()} là đáp án đúng!</span>
                    ) : (
                      <span className="text-rose-600">✕ Đáp án đúng là: Hình {item.correctKey.toUpperCase()}</span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 5: LOOK, COMPLETE AND READ */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                Trang 49 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ Đoạn Thoại</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              5. Look, complete and read (Quan sát tranh và hoàn thành câu)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Điền từ chỉ đường vào chỗ trống để hoàn thành 2 cuộc đối thoại dưới đây.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct5}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct5}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Nộp bài (+5 ⭐)
            </button>
          </div>
        </div>

        {/* 2 Dialog Exercises */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dialog 1 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-purple-800">
                1. Đi trung tâm mua sắm (Shopping centre) 🏬
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'Excuse me. How can I get to the shopping centre? The sports centre or the shopping centre? The shopping centre. Turn right at the bakery. Thank you very much.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: Excuse me. How can I get to the shopping centre?</p>
            <p className="text-xs text-slate-700 font-medium">B: The sports centre or the shopping centre?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={act5_1_1}
                onChange={e => setAct5_1_1(e.target.value)}
                placeholder="The shopping centre..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-36 bg-white"
              />
              <span>.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: Turn</span>
              <input
                type="text"
                value={act5_1_2}
                onChange={e => setAct5_1_2(e.target.value)}
                placeholder="right..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>at the bakery.</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: Thank you very much.</p>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;The shopping centre&quot; và &quot;right&quot;
              </p>
            )}
          </div>

          {/* Dialog 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-purple-800">
                2. Đi quầy ăn vặt phố Hoà Bình (Food stall) 🍢
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'Excuse me. Is there a food stall near here? There’s a food stall in Hoa Binh Street. How can I get there? Go straight and turn right. Thank you very much for your help.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: Excuse me. Is there a food stall near here?</p>
            <p className="text-xs text-slate-700 font-medium">B: There’s a food stall in Hoa Binh Street.</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={act5_2_1}
                onChange={e => setAct5_2_1(e.target.value)}
                placeholder="How..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>can I get there?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: Go straight and turn</span>
              <input
                type="text"
                value={act5_2_2}
                onChange={e => setAct5_2_2(e.target.value)}
                placeholder="right (or left)..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>.</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: Thank you very much for your help.</p>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;How&quot; và &quot;right&quot; (hoặc left)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S PLAY - "SHOW ME THE WAY" */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Trò Chơi Trang 49 SGK
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <span>Show me the way! 🗺️</span>
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Bạn đang ở vị trí &quot;You are here&quot;. Hãy chọn khẩu lệnh chỉ đường chuẩn nhất để dẫn bạn tới đích!
            </p>
          </div>

          <div className="px-4 py-2 bg-white/20 rounded-2xl text-center">
            <span className="text-xs font-bold block">Điểm chỉ đường:</span>
            <span className="text-2xl font-black text-yellow-300">{navScore} ⭐</span>
          </div>
        </div>

        {/* Current Destination Mission */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-white/20 rounded-2xl">{currentMission.icon}</span>
            <div>
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                Yêu cầu của bạn:
              </span>
              <h4 className="text-xl md:text-2xl font-black text-yellow-300">
                &ldquo;I want to go to the {currentMission.name}.&rdquo;
              </h4>
            </div>
          </div>

          <button
            onClick={() => speakWord(`I want to go to the ${currentMission.id}.`, speechRate)}
            className="px-4 py-2 rounded-xl bg-white text-blue-900 font-bold text-xs flex items-center gap-2 hover:bg-blue-50 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe yêu cầu 🔊</span>
          </button>
        </div>

        {/* Command Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {navCommands.map(cmd => {
            const isChosen = userNavChoice === cmd.label;
            const isTarget = cmd.label === currentMission.targetStep;

            return (
              <button
                key={cmd.label}
                onClick={() => handleChooseNav(cmd.label)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all active:scale-95 flex items-center justify-between ${
                  isChosen
                    ? isTarget
                      ? 'bg-emerald-500 text-white border-emerald-300 ring-2 ring-emerald-200'
                      : 'bg-rose-500 text-white border-rose-300'
                    : 'bg-white/20 hover:bg-white/30 border-white/30 text-white'
                }`}
              >
                <span>{cmd.label}</span>
                <span className="text-xl">{cmd.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
