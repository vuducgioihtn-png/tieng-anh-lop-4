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
  Eye,
  Scissors,
  Circle,
  Gamepad2
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit13Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit13Lesson2Studio: React.FC<Unit13Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 25)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'How old is your father, Mai?',
      ipaA: '/haʊ əʊld ɪz jɔː ˈfɑːðə, maɪ/',
      readingA: 'Hao ô-l-đ iz do pha-đờ, Mai?',
      meaningA: 'Bố của bạn bao nhiêu tuổi rồi, Mai?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: "He's forty.",
      ipaB: '/hiːz ˈfɔːti/',
      readingB: 'Hi-z pho-ti.',
      meaningB: 'Bố tớ bốn mươi tuổi.',
      context: 'Ben và Mai ngồi trò chuyện trên thân cây trong buổi dã ngoại.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'What does he look like?',
      ipaA: '/wɒt dʌz hiː lʊk laɪk/',
      readingA: 'Oát đắt-z hi lúk lai-k?',
      meaningA: 'Bác ấy trông như thế nào?',
      speakerB: 'Mai',
      avatarB: '👧🏻',
      textB: 'He has a round face.',
      ipaB: '/hiː hæz ə raʊnd feɪs/',
      readingB: 'Hi hæ-z ơ raon-d phây-s.',
      meaningB: 'Bố tớ có khuôn mặt tròn.',
      context: 'Mai nhớ về khuôn mặt tròn phúc hậu, hiền từ của bố.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 26) - 4 FEATURES (HAS)
  // a: short hair, b: long hair, c: a round face, d: big eyes
  // =========================================================================
  const featureCards = [
    {
      id: 'feat_a',
      key: 'a',
      title: 'short hair',
      ipa: '/ʃɔːt heə/',
      reading: 'sho-t he-ơ',
      meaningVi: 'mái tóc ngắn gọn gàng',
      grammarNote: 'hair không đếm được -> KHÔNG dùng "a"',
      gender: 'she',
      pronoun: 'She has',
      question: 'What does she look like?',
      answer: 'She has short hair.',
      answerIpa: '/ʃiː hæz ʃɔːt heə/',
      answerReading: 'Shi hæ-z sho-t he-ơ.',
      icon: '💇‍♀️',
      badge: 'bg-emerald-600',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      desc: 'Mái tóc ngắn cá tính, năng động'
    },
    {
      id: 'feat_b',
      key: 'b',
      title: 'long hair',
      ipa: '/lɒŋ heə/',
      reading: 'lon-g he-ơ',
      meaningVi: 'mái tóc dài thướt tha',
      grammarNote: 'hair không đếm được -> KHÔNG dùng "a"',
      gender: 'she',
      pronoun: 'She has',
      question: 'What does she look like?',
      answer: 'She has long hair.',
      answerIpa: '/ʃiː hæz lɒŋ heə/',
      answerReading: 'Shi hæ-z lon-g he-ơ.',
      icon: '👧',
      badge: 'bg-pink-600',
      color: 'border-pink-300 bg-pink-50/50 text-pink-900',
      desc: 'Mái tóc dài óng ả tết bím hoặc xõa dài dịu dàng'
    },
    {
      id: 'feat_c',
      key: 'c',
      title: 'a round face',
      ipa: '/ə raʊnd feɪs/',
      reading: 'ơ raon-d phây-s',
      meaningVi: 'khuôn mặt tròn bầu bĩnh',
      grammarNote: 'face đếm được số ít -> BẮT BUỘC có "a"',
      gender: 'he',
      pronoun: 'He has',
      question: 'What does he look like?',
      answer: 'He has a round face.',
      answerIpa: '/hiː hæz ə raʊnd feɪs/',
      answerReading: 'Hi hæ-z ơ raon-d phây-s.',
      icon: '😊',
      badge: 'bg-amber-600',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      desc: 'Gương mặt tròn trịa, phúc hậu đáng yêu'
    },
    {
      id: 'feat_d',
      key: 'd',
      title: 'big eyes',
      ipa: '/bɪɡ aɪz/',
      reading: 'bích-g ai-z',
      meaningVi: 'đôi mắt to tròn long lanh',
      grammarNote: 'eyes số nhiều (2 mắt) -> có đuôi "s", không có "a"',
      gender: 'he',
      pronoun: 'He has',
      question: 'What does he look like?',
      answer: 'He has big eyes.',
      answerIpa: '/hiː hæz bɪɡ aɪz/',
      answerReading: 'Hi hæ-z bích-g ai-z.',
      icon: '👀',
      badge: 'bg-blue-600',
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      desc: 'Đôi mắt to tròn, sáng ngời thông minh'
    }
  ];

  const [activeFeatureId, setActiveFeatureId] = useState<string>('feat_a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND NUMBER (TRACK 27) - 4 CHARACTERS
  // a: short black hair (waving)
  // b: girl with big eyes
  // c: girl with long ponytail
  // d: girl in pink hat with round face
  // =========================================================================
  interface NumberItem {
    id: string;
    letter: 'a' | 'b' | 'c' | 'd';
    title: string;
    desc: string;
    correctOrder: number;
    userOrder: number | null;
    audio: string;
    icon: string;
  }

  const [numberItems, setNumberItems] = useState<NumberItem[]>([
    {
      id: 'item_a',
      letter: 'a',
      title: 'Cô gái tóc ngắn',
      desc: 'Mái tóc đen ngắn uốn nhẹ (short hair)',
      correctOrder: 1,
      userOrder: null,
      audio: 'Number 1: What does she look like? - She has short hair.',
      icon: '👩‍🦱'
    },
    {
      id: 'item_c',
      letter: 'c',
      title: 'Bạn gái tóc đuôi ngựa dài',
      desc: 'Mái tóc dài buộc cao (long hair)',
      correctOrder: 2,
      userOrder: null,
      audio: 'Number 2: What does she look like? - She has long hair.',
      icon: '👧'
    },
    {
      id: 'item_b',
      letter: 'b',
      title: 'Em bé mắt to tròn',
      desc: 'Đôi mắt to tròn long lanh (big eyes)',
      correctOrder: 3,
      userOrder: null,
      audio: 'Number 3: What does she look like? - She has big eyes.',
      icon: '👀'
    },
    {
      id: 'item_d',
      letter: 'd',
      title: 'Bé gái đội mũ hồng',
      desc: 'Khuôn mặt tròn xinh xắn (a round face)',
      correctOrder: 4,
      userOrder: null,
      audio: 'Number 4: What does she look like? - She has a round face.',
      icon: '👒'
    }
  ]);
  const [numberSubmitted, setNumberSubmitted] = useState<boolean>(false);

  const handleSelectOrder = (letter: 'a' | 'b' | 'c' | 'd', order: number) => {
    sound.playClick();
    setNumberItems(prev => prev.map(item => (item.letter === letter ? { ...item, userOrder: order } : item)));
  };

  const handleCheckNumber = () => {
    const allDone = numberItems.every(i => i.userOrder !== null);
    if (!allDone) {
      alert('Em hãy đánh số từ 1 đến 4 cho cả 4 bức tranh nhé!');
      return;
    }
    const correctCount = numberItems.filter(i => i.userOrder === i.correctOrder).length;
    setNumberSubmitted(true);
    if (correctCount === 4) {
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 6: TIC-TAC-TOE GAME (CỜ CARO TỪ VỰNG NGOẠI HÌNH)
  // =========================================================================
  const [ticTacToeGrid, setTicTacToeGrid] = useState<(string | null)[]>([
    null, null, null,
    null, null, null,
    null, null, null
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  const gridTerms = [
    'short hair', 'big eyes', 'long hair',
    'a round face', 'small eyes', 'tall',
    'short', 'slim', 'big'
  ];

  const handleCellClick = (idx: number) => {
    if (ticTacToeGrid[idx]) return;
    sound.playClick();
    const updated = [...ticTacToeGrid];
    updated[idx] = currentPlayer;
    setTicTacToeGrid(updated);
    speakWord(gridTerms[idx], speechRate);

    // Switch player
    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
  };

  const handleResetTicTacToe = () => {
    sound.playClick();
    setTicTacToeGrid(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cấu Trúc Trọng Tâm Unit 13 · Tiết 2
          </span>
          <span className="text-xs text-pink-100 font-bold">Trang 20 - 21 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Miêu Tả Đặc Điểm Tóc, Mắt, Khuôn Mặt (Dùng HAS)
        </h2>

        {/* Grammar Tip Box */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl space-y-2">
          <p className="text-base font-extrabold text-yellow-300">
            He / She has + [short hair / long hair / a round face / big eyes]
          </p>
          <div className="text-xs text-pink-100 leading-relaxed space-y-1">
            <p>
              💡 <strong>Quy tắc nhớ:</strong> Với bộ phận cơ thể thuộc sở hữu, ta dùng động từ <strong>HAS</strong> (chứ không dùng Is!).
            </p>
            <p className="font-semibold text-yellow-200">
              • Mặt tròn: <em>a round face</em> (có &quot;a&quot;) | • Mái tóc: <em>long hair / short hair</em> (không có &quot;a&quot;) | • Mắt: <em>big eyes</em> (có &quot;s&quot;)
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
          { id: 4, label: '4. Listen & number', icon: '🔢' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: '6. Tic-tac-toe game', icon: '🎮' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-rose-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 25) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                  Hoạt Động 1 · Trang 20
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 25 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát tranh và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Ben: How old is your father, Mai? Mai: He is forty. Ben: What does he look like? Mai: He has a round face.';
                speakWord(fullText, speechRate);
              }}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-rose-700" /> Nghe toàn bộ hội thoại
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-rose-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dialog.context}</span>
                </div>

                {/* Speaker A */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-blue-700 flex items-center gap-1">
                      <span>{dialog.avatarA}</span> {dialog.speakerA}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textA, speechRate)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {dialog.textA}
                  </p>
                  <p className="text-[11px] font-mono text-rose-700 font-bold">
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
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-rose-800 flex items-center gap-1">
                      <span>{dialog.avatarB}</span> {dialog.speakerB}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textB, speechRate)}
                      className="p-1 text-slate-400 hover:text-rose-700 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-rose-950 text-sm md:text-base leading-snug">
                    {dialog.textB}
                  </p>
                  <p className="text-[11px] font-mono text-rose-700 font-bold">
                    🗣️ {dialog.ipaB}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingB}&quot;
                  </p>
                  <p className="text-xs text-rose-800/80 italic pt-1 border-t border-rose-200">
                    {dialog.meaningB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 26) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                  Hoạt Động 2 · Trang 20
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 26 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Chỉ tranh và miêu tả tóc, mắt, mặt)
              </h3>
            </div>
            <div className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
              Cấu trúc: He / She has + [đặc điểm]
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map(item => {
              const isActive = activeFeatureId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveFeatureId(item.id);
                    speakWord(`${item.question} ${item.answer}`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-rose-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                        {item.key}
                      </span>
                      <span className="text-3xl">{item.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {item.title}
                    </h4>

                    {/* IPA + Reading */}
                    <p className="text-[11px] font-mono text-rose-700 font-bold mb-0.5">
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
                    <span className="text-[10px] text-slate-500 italic block">{item.grammarNote}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(`${item.question} ${item.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
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
              const cur = featureCards.find(c => c.id === activeFeatureId);
              if (!cur) return null;
              return (
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cặp câu hỏi và trả lời ({cur.key}):
                  </span>
                  <p className="text-base font-extrabold text-slate-800">
                    A: {cur.question} ➔ B:{' '}
                    <span className="text-rose-700 underline font-black">{cur.answer}</span>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Phát âm: &quot;Oát đắt-z {cur.gender} lúk lai-k?&quot; ➔ &quot;{cur.answerReading}&quot;)
                  </p>
                </div>
              );
            })()}
            <button
              onClick={() => {
                const cur = featureCards.find(c => c.id === activeFeatureId);
                if (cur) speakWord(`${cur.question} ${cur.answer}`, speechRate);
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <Volume2 className="w-4 h-4" /> Phát âm mẫu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND NUMBER (TRACK 27) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                  Hoạt Động 4 · Trang 21
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 27 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and number 🔢 (Nghe và đánh số thứ tự 1, 2, 3, 4)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckNumber}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra đáp án
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setNumberItems(prev => prev.map(i => ({ ...i, userOrder: null })));
                  setNumberSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {numberItems.map(item => {
              const isCorrect = item.userOrder === item.correctOrder;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 flex flex-col justify-between ${
                    numberSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-rose-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 font-black text-xs flex items-center justify-center">
                        {item.letter.toUpperCase()}
                      </span>
                      <span className="text-4xl">{item.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <button
                      onClick={() => speakWord(item.audio, speechRate)}
                      className="w-full py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe audio
                    </button>

                    {/* Order selector 1, 2, 3, 4 */}
                    <div className="flex items-center justify-between gap-1">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          onClick={() => handleSelectOrder(item.letter, num)}
                          className={`flex-1 py-1 rounded-lg text-xs font-black transition ${
                            item.userOrder === num
                              ? 'bg-rose-600 text-white shadow'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    {numberSubmitted && (
                      <p className="text-xs font-bold text-center pt-1 text-slate-700">
                        {isCorrect ? '✔️ Đúng!' : `❌ Sai (Đáp án: ${item.correctOrder})`}
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
      {/* 6. TIC-TAC-TOE GAME */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 21
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Tic-tac-toe Game 🎮 (Cờ Caro từ vựng ngoại hình)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Mỗi bạn chọn đặt câu (VD: &quot;My sister has short hair&quot;) rồi đánh dấu ô tương ứng. Bạn nào đạt 3 ô liên tiếp sẽ chiến thắng!
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-slate-100 p-2.5 rounded-xl">
              <span>
                Lượt đi hiện tại: <strong className="text-rose-600 font-black text-sm">{currentPlayer}</strong>
              </span>
              <button
                onClick={handleResetTicTacToe}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                Chơi lại ván mới 🔄
              </button>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-2.5 bg-amber-100 p-3 rounded-3xl border-4 border-amber-300 shadow-inner">
              {gridTerms.map((term, idx) => {
                const mark = ticTacToeGrid[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    className="aspect-square bg-white rounded-2xl border-2 border-amber-200 hover:border-rose-400 p-2 flex flex-col items-center justify-center transition shadow-xs relative"
                  >
                    <span className="text-xs font-extrabold text-slate-700 leading-tight">
                      {term}
                    </span>
                    {mark && (
                      <span
                        className={`absolute inset-0 flex items-center justify-center text-4xl font-black ${
                          mark === 'X' ? 'text-rose-600' : 'text-blue-600'
                        }`}
                      >
                        {mark}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
