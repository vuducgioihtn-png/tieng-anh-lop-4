import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Bike,
  Music,
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
  ShieldAlert,
  Wind
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit5Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit5Lesson1Studio: React.FC<Unit5Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // 6 Core Abilities in Lesson 1
  const coreAbilities = [
    {
      id: 'bike',
      name: 'ride a bike',
      vi: 'đi xe đạp',
      ipa: '/raɪd ə baɪk/',
      reading: 'RAI-đ ơ BAI-k',
      icon: '🚲',
      tip: 'Nhớ có từ "a" (ride a bike). Động từ "ride" dùng cho xe hai bánh.'
    },
    {
      id: 'horse',
      name: 'ride a horse',
      vi: 'cưỡi ngựa',
      ipa: '/raɪd ə hɔːs/',
      reading: 'RAI-đ ơ HÓ-x',
      icon: '🐎',
      tip: 'Động từ "ride" dùng cưỡi động vật. Âm đuôi /s/ trong "horse" cần xì rõ.'
    },
    {
      id: 'piano',
      name: 'play the piano',
      vi: 'chơi đàn dương cầm (piano)',
      ipa: '/pleɪ ðə piˈæn.əʊ/',
      reading: 'P-LÂY đơ pi-AN-ôu',
      icon: '🎹',
      tip: 'QUY TẮC VÀNG: Chơi nhạc cụ BẮT BUỘC có mạo từ "THE" (play the piano).'
    },
    {
      id: 'guitar',
      name: 'play the guitar',
      vi: 'chơi đàn ghi ta',
      ipa: '/pleɪ ðə ɡɪˈtɑːr/',
      reading: 'P-LÂY đơ ghi-TAA',
      icon: '🎸',
      tip: 'Cũng có mạo từ "THE". Trọng âm rơi vào vần "tar" (/tɑːr/).'
    },
    {
      id: 'kite',
      name: 'fly a kite',
      vi: 'thả diều',
      ipa: '/flaɪ ə kaɪt/',
      reading: 'PH-LAI ơ KAI-t',
      icon: '🪁',
      tip: 'Âm đuôi /t/ trong từ "kite" bật dứt khoát.'
    },
    {
      id: 'skip',
      name: 'skip',
      vi: 'nhảy dây',
      ipa: '/skɪp/',
      reading: 'X-KÍP',
      icon: '🪢',
      tip: 'Âm chùm /sk/ lướt nhẹ không đọc xì-kíp.'
    }
  ];

  // Activity 1: Dialogue A & B (Track 46)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('Lucy');
    await speakWord('I can fly a kite.', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Mai');
    await speakWord('I can skip.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Bill');
    await speakWord('Can you ride a bike?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord('Yes, I can.', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Mai');
    await speakWord("No, I can't.", speechRate);
    setActiveSpeaker(null);
    onAddStar(3);
  };

  // Activity 2: Listen, point and say (Track 47)
  const [selectedAbility, setSelectedAbility] = useState(coreAbilities[0]);
  const [expectedAnswer, setExpectedAnswer] = useState<'yes' | 'no'>('yes');

  const handleSelectAbility = async (ability: typeof coreAbilities[0], ans: 'yes' | 'no') => {
    sound.playClick();
    setSelectedAbility(ability);
    setExpectedAnswer(ans);
    const answerText = ans === 'yes' ? 'Yes, I can.' : "No, I can't.";
    await speakWord(`Can you ${ability.name}? ${answerText}`, speechRate);
    onAddStar(1);
  };

  // Activity 3: Let's talk
  const [talkAction, setTalkAction] = useState<string>('ride a bike');
  const [talkResponse, setTalkResponse] = useState<'yes' | 'no'>('yes');

  const handleTalkPractice = async () => {
    sound.playClick();
    const ans = talkResponse === 'yes' ? 'Yes, I can.' : "No, I can't.";
    await speakWord(`Can you ${talkAction}? ${ans}`, speechRate * 0.9);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    onAddStar(2);
  };

  // Activity 4: Listen and tick (Track 48)
  // Track 48:
  // 1: "Can you play the piano? - Yes, I can." -> a (piano)
  // 2: "Can you ride a bike? - Yes, I can." -> a (bike)
  const [act4Answers, setAct4Answers] = useState<{ [q: number]: 'a' | 'b' | null }>({
    1: null,
    2: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    if (act4Answers[1] === 'a' && act4Answers[2] === 'a') {
      sound.playCorrect();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Look, complete and read
  const [act5Answers, setAct5Answers] = useState<{ [q: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [act5Checked, setAct5Checked] = useState<boolean>(false);

  const act5Questions = [
    {
      q: 1,
      ask: 'Can you play the piano?',
      scene: 'Bé gái chơi đàn piano vui vẻ 🎹',
      correct: 'Yes, I can.',
      hint: 'Yes, I can.'
    },
    {
      q: 2,
      ask: 'Can you ride a bike?',
      scene: 'Bé trai bị ngã xe đạp xụ mặt 🚲',
      correct: "No, I can't.",
      hint: "No, I can't."
    },
    {
      q: 3,
      askStart: 'Can you',
      askEnd: '?',
      correctAsk: 'ride a horse',
      scene: 'Bé trai cưỡi ngựa dũng mãnh 🐎',
      correct: 'Yes',
      fullB: 'Yes, I can.'
    },
    {
      q: 4,
      askStart: 'Can you',
      askEnd: '?',
      correctAsk: 'play the guitar',
      scene: 'Bé trai buồn rầu bên cây đàn ghi ta 🎸',
      correct: 'No',
      fullB: "No, I can't."
    }
  ];

  const handleCheckAct5 = () => {
    sound.playClick();
    setAct5Checked(true);
    let correctCount = 0;
    if (act5Answers[1]?.trim().toLowerCase().includes('yes')) correctCount++;
    if (act5Answers[2]?.trim().toLowerCase().includes('no')) correctCount++;
    if (act5Answers[3]?.trim().toLowerCase().includes('yes')) correctCount++;
    if (act5Answers[4]?.trim().toLowerCase().includes('no')) correctCount++;

    if (correctCount >= 3) {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 6: Let's play — Card Guessing Game: "Can you ...?"
  const [hiddenCardIndex, setHiddenCardIndex] = useState<number>(0);
  const [isCardRevealed, setIsCardRevealed] = useState<boolean>(false);
  const [teacherAnswer, setTeacherAnswer] = useState<string>('');

  const cardDeck = [
    { name: 'ride a bike', vi: 'đi xe đạp', icon: '🚲', ans: 'Yes, I can.' },
    { name: 'play the guitar', vi: 'chơi ghi ta', icon: '🎸', ans: "No, I can't." },
    { name: 'ride a horse', vi: 'cưỡi ngựa', icon: '🐎', ans: "No, I can't." },
    { name: 'play the piano', vi: 'chơi piano', icon: '🎹', ans: 'Yes, I can.' }
  ];

  const handlePickRandomCard = () => {
    sound.playClick();
    const nextIdx = (hiddenCardIndex + 1) % cardDeck.length;
    setHiddenCardIndex(nextIdx);
    setIsCardRevealed(false);
    setTeacherAnswer('');
  };

  const handleGuessAbility = async (guessedName: string) => {
    sound.playClick();
    const currentCard = cardDeck[hiddenCardIndex];
    setIsCardRevealed(true);
    if (guessedName === currentCard.name) {
      setTeacherAnswer(`Yes, I can! You guessed right! I can ${currentCard.name}.`);
      sound.playCorrect();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      onAddStar(3);
    } else {
      setTeacherAnswer(`No! The secret card is: ${currentCard.name}.`);
      sound.playWrong();
    }
    await speakWord(`Can you ${guessedName}? ${currentCard.ans}`, speechRate);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO LESSON BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              <span>🚴</span>
              <span>Trang 34 - 35 SGK Kết Nối Tri Thức</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-blue-50 text-blue-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Tiết 2 (Trang 36) ➔</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Tiết 3 (Trang 38) ➔</span>
                </button>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 5: Things we can do — Lesson 1
          </h1>
          <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed max-w-3xl">
            Khám phá tài năng của chính bạn với câu hỏi khả năng: <strong>"Can you _______?"</strong> (Bạn có thể làm được không?), trả lời tự tin <strong>"Yes, I can." / "No, I can't."</strong> cùng các hoạt động <em>ride a bike, ride a horse, play the piano, play the guitar</em>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🚲 ride a bike (đi xe đạp)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🐎 ride a horse (cưỡi ngựa)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎹 play the piano (chơi piano)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎸 play the guitar (chơi ghi ta)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🪁 fly a kite (thả diều)</span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPhoneticDetails(!showPhoneticDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showPhoneticDetails
                  ? 'bg-amber-300 text-slate-950 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🇬🇧 Phiên âm Anh - Anh (RP)</span>
              <span>{showPhoneticDetails ? 'Đang bật' : 'Tắt'}</span>
            </button>

            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showParentGuides
                  ? 'bg-teal-300 text-slate-950 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Mẹo phụ huynh kèm con</span>
              <span>{showParentGuides ? 'Đang bật' : 'Tắt'}</span>
            </button>
          </div>

          <button
            onClick={() => setShowFullHandbook(!showFullHandbook)}
            className="px-4 py-1.5 bg-white text-slate-900 hover:bg-blue-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang khả năng & mạo từ THE'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🚴
        </div>
      </div>

      {/* ================= BÍ KÍP NÃO PHẢI: MẠO TỪ THE VÀ CẶP CAN / CAN'T ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-blue-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Não Phải Ghi Nhớ Cấu Trúc Khả Năng</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "Can you _______?" ➔ "Yes, I can." / "No, I can't."</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Quy tắc vàng 1: Nhạc cụ luôn có <strong>THE</strong> (*play the piano, play the guitar*). Quy tắc vàng 2: Cưỡi/lái xe hai bánh dùng <strong>RIDE A</strong> (*ride a bike, ride a horse*).
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('Can you ride a bike? Yes, I can. No, I cannot.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Cặp Câu Mẫu</span>
          </button>
        </div>

        {/* 6 Abilities Interactive Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {coreAbilities.map(item => (
            <div
              key={item.id}
              onClick={() => {
                sound.playClick();
                speakWord(`I can ${item.name}.`, speechRate);
              }}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400 cursor-pointer transition-all space-y-1.5 text-center group"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xs font-black text-white group-hover:text-amber-300">
                {item.name}
              </div>
              <div className="text-[11px] text-blue-200">({item.vi})</div>
              <div className="text-[10px] bg-slate-950/60 text-amber-200 rounded py-0.5 px-1 font-bold">
                {item.reading}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Nhớ Ngữ Pháp & Sửa Lỗi Thường Gặp</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
              <div className="font-bold text-blue-950 text-sm">💡 1. Mạo từ THE với nhạc cụ</div>
              <p>
                Rất nhiều trẻ quên chữ <strong>the</strong> khi nói về chơi đàn. Bố mẹ nhắc con thần chú: <em>"Thể thao không the (play football), nhạc cụ có the (play the piano, play the guitar)!"</em>
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 text-sm">💡 2. Phát âm Can và Can't</div>
              <p>
                Trong tiếng Anh chuẩn Anh (RP), <strong>can</strong> đọc nhẹ là <em>/kən/</em> hoặc <em>/kæn/</em>, còn <strong>can't</strong> đọc mở vòm miệng dài là <em>/kɑːnt/</em> có âm /t/ dứt khoát.
              </p>
            </div>
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-1">
              <div className="font-bold text-teal-950 text-sm">💡 3. Trò chơi hỏi đáp tại nhà</div>
              <p>
                Khi con đang chơi đồ chơi hoặc đạp xe, bố mẹ hỏi ngay: <em>"Can you ride a bike?"</em> để con reo to: <em>"Yes, I can!"</em> giúp tạo phản xạ tiếng Anh tự nhiên.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITIES NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 34' },
          { id: 2, label: '2. Listen, point & say', icon: '🚲', desc: 'Trang 34' },
          { id: 3, label: "3. Let's talk", icon: '💬', desc: 'Trang 34' },
          { id: 4, label: '4. Listen & tick', icon: '✔️', desc: 'Trang 35' },
          { id: 5, label: '5. Look, complete & read', icon: '✍️', desc: 'Trang 35' },
          { id: 6, label: "6. Can you...? (Trò chơi)", icon: '🃏', desc: 'Trang 35' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border-2 ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md font-black'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= ACTIVITY 1: LOOK, LISTEN AND REPEAT ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 46 · Sách Giáo Khoa Trang 34</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 1: Look, listen and repeat (Quan sát tranh, nghe và nhắc lại)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={playDialogA}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh A (Khoe tài)</span>
              </button>
              <button
                onClick={playDialogB}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh B (Hỏi đi xe đạp)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue A Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-black rounded-full">
                  Tranh a: Thả diều & Nhảy dây
                </span>
                <button
                  onClick={playDialogA}
                  className="p-2 rounded-xl bg-white hover:bg-blue-100 text-blue-600 border border-slate-200"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Lucy: I can fly a kite. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('I can fly a kite.', speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-blue-600 font-black">👧 Lucy (cầm diều):</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-blue-600">
                  "I can fly a kite." 🪁
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /aɪ kæn flaɪ ə kaɪt/ · Ai kæn phlai ơ kai-t.
                  </div>
                )}
                <div className="text-xs text-slate-600">Tớ có thể thả diều.</div>
              </div>

              {/* Mai: I can skip. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('I can skip.', speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-teal-600 font-black">👧 Mai (cầm dây nhảy):</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-teal-600">
                  "I can skip." 🪢
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /aɪ kæn skɪp/ · Ai kæn x-kíp.
                  </div>
                )}
                <div className="text-xs text-slate-600">Tớ có thể nhảy dây.</div>
              </div>
            </div>

            {/* Dialogue B Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-teal-600 text-white text-xs font-black rounded-full">
                  Tranh b: Bạn có biết đi xe đạp không?
                </span>
                <button
                  onClick={playDialogB}
                  className="p-2 rounded-xl bg-white hover:bg-teal-100 text-teal-600 border border-slate-200"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Bill asks */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Can you ride a bike?', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-blue-700">👦 Cậu bạn dắt xe hỏi:</div>
                <div className="text-sm font-black text-slate-900 group-hover:text-blue-600">
                  "Can you ride a bike?" 🚲
                </div>
                <div className="text-[11px] text-slate-600">Các cậu có biết đi xe đạp không?</div>
              </div>

              {/* Lucy: Yes, I can. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Yes, I can.', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-emerald-600">👧 Lucy đáp:</div>
                <div className="text-sm font-black text-emerald-700">
                  "Yes, I can." (Tớ có, tớ biết đi.)
                </div>
              </div>

              {/* Mai: No, I can't. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord("No, I can't.", speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-rose-600">👧 Mai đáp:</div>
                <div className="text-sm font-black text-rose-700">
                  "No, I can't." (Tớ không, tớ chưa biết đi.)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Track 47 · Sách Giáo Khoa Trang 34</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 2: Listen, point and say (Nghe, chỉ vào tranh và nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bấm vào 4 hoạt động chuẩn SGK bên dưới để nghe câu hỏi và câu trả lời mẫu (Yes/No):
            </p>
          </div>

          {/* Model Pattern Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-800">Mẫu câu đang thực hành:</span>
              <div className="text-base sm:text-lg font-black text-slate-900">
                A: Can you {selectedAbility.name}? ➔ B:{' '}
                <span className={expectedAnswer === 'yes' ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                  {expectedAnswer === 'yes' ? 'Yes, I can.' : "No, I can't."}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                const ans = expectedAnswer === 'yes' ? 'Yes, I can.' : "No, I can't.";
                speakWord(`Can you ${selectedAbility.name}? ${ans}`, speechRate);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát Âm Mẫu</span>
            </button>
          </div>

          {/* 4 SGK Items: a (ride a bike), b (ride a horse), c (play the piano), d (play the guitar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'a', ability: coreAbilities[0], ans: 'yes' as const, label: 'ride a bike / yes' },
              { key: 'b', ability: coreAbilities[1], ans: 'no' as const, label: 'ride a horse / no' },
              { key: 'c', ability: coreAbilities[2], ans: 'yes' as const, label: 'play the piano / yes' },
              { key: 'd', ability: coreAbilities[3], ans: 'no' as const, label: 'play the guitar / no' }
            ].map(({ key, ability, ans, label }) => {
              const isSelected = selectedAbility.id === ability.id;
              return (
                <div
                  key={key}
                  onClick={() => handleSelectAbility(ability, ans)}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all space-y-3 relative text-center group ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/70 shadow-lg ring-2 ring-blue-200 scale-102'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300'
                  }`}
                >
                  <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white font-bold text-xs flex items-center justify-center border border-slate-200">
                    {key}
                  </span>

                  <div className="text-5xl pt-2">{ability.icon}</div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600">
                      {ability.name}
                    </h4>
                    <div className="text-xs text-slate-500">{ability.vi}</div>
                  </div>

                  <div className="pt-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                        ans === 'yes'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ans === 'yes' ? '✓ Có thể (yes)' : '✕ Không thể (no)'}
                    </span>
                  </div>

                  <div className="pt-1 text-xs text-blue-600 font-bold flex items-center justify-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện nói</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Sách Giáo Khoa Trang 34</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 3: Let's talk (Chúng mình cùng luyện nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Khung cảnh công viên rực rỡ với xe đạp, đàn ghi ta, ngựa và đàn piano: Chọn hoạt động và câu trả lời của bạn!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 space-y-6">
            {/* Pick Action */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                1. Chọn hoạt động muốn hỏi:
              </label>
              <div className="flex flex-wrap gap-2">
                {coreAbilities.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setTalkAction(item.name);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      talkAction === item.name
                        ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200 scale-105'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pick Yes or No Response */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                2. Bạn có làm được không?
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setTalkResponse('yes');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    talkResponse === 'yes'
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-200'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>✓</span>
                  <span>Yes, I can. (Tớ biết làm)</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTalkResponse('no');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    talkResponse === 'no'
                      ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-200'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>✕</span>
                  <span>No, I can't. (Tớ chưa biết làm)</span>
                </button>
              </div>
            </div>

            {/* Conversation Box */}
            <div className="p-5 rounded-2xl bg-white border-2 border-blue-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-black text-blue-700 text-sm">A:</span>
                <span className="font-bold text-base text-slate-900">
                  "Can you {talkAction}?"
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(`Can you ${talkAction}?`, speechRate);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-600"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-black text-teal-600 text-sm">B:</span>
                <span className={`font-black text-lg ${talkResponse === 'yes' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  "{talkResponse === 'yes' ? 'Yes, I can.' : "No, I can't."}"
                </span>
              </div>
            </div>

            <button
              onClick={handleTalkPractice}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 text-white rounded-2xl font-black text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 fill-white" />
              <span>Nói To Đoạn Hội Thoại & Nhận Sao ⭐</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND TICK ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 48 · Sách Giáo Khoa Trang 35</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 4: Listen and tick (Nghe và đánh dấu tích vào bức tranh đúng)
              </h3>
            </div>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Câu hỏi 1: Bạn nhỏ có khả năng gì?</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord('1. Can you play the piano? - Yes, I can.', speechRate);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-xs font-bold text-blue-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Băng Câu 1</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1a: piano (Correct) */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 1: 'a' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[1] === 'a'
                      ? 'border-blue-600 bg-blue-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">a.</span>
                    <span className="text-3xl">🎹</span>
                    <div>
                      <div className="font-bold text-sm">play the piano</div>
                      <div className="text-xs text-slate-500">chơi đàn piano</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="act4-q1"
                    checked={act4Answers[1] === 'a'}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>

                {/* 1b: ride a horse */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 1: 'b' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[1] === 'b'
                      ? 'border-blue-600 bg-blue-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">b.</span>
                    <span className="text-3xl">🐎</span>
                    <div>
                      <div className="font-bold text-sm">ride a horse</div>
                      <div className="text-xs text-slate-500">cưỡi ngựa</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="act4-q1"
                    checked={act4Answers[1] === 'b'}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
              </div>

              {act4Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act4Answers[1] === 'a' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (Can you play the piano? - Yes, I can.)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Chưa đúng. Băng đọc: "Can you play the piano? - Yes, I can." ➔ Đáp án là <strong>a</strong>.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Câu hỏi 2: Bạn nhỏ có khả năng gì?</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord('2. Can you ride a bike? - Yes, I can.', speechRate);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-xs font-bold text-blue-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Băng Câu 2</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 2a: bike (Correct) */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 2: 'a' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[2] === 'a'
                      ? 'border-blue-600 bg-blue-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">a.</span>
                    <span className="text-3xl">🚲</span>
                    <div>
                      <div className="font-bold text-sm">ride a bike</div>
                      <div className="text-xs text-slate-500">đi xe đạp</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="act4-q2"
                    checked={act4Answers[2] === 'a'}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>

                {/* 2b: guitar */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 2: 'b' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[2] === 'b'
                      ? 'border-blue-600 bg-blue-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">b.</span>
                    <span className="text-3xl">🎸</span>
                    <div>
                      <div className="font-bold text-sm">play the guitar</div>
                      <div className="text-xs text-slate-500">chơi ghi ta</div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="act4-q2"
                    checked={act4Answers[2] === 'b'}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
              </div>

              {act4Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act4Answers[2] === 'a' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (Can you ride a bike? - Yes, I can.)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Chưa đúng. Băng đọc: "Can you ride a bike? - Yes, I can." ➔ Đáp án là <strong>a</strong>.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 35</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 5: Look, complete and read (Quan sát tranh và hoàn thành câu)
              </h3>
            </div>
            <button
              onClick={handleCheckAct5}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item 1 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-black rounded-lg">
                  Câu 1: Bé gái chơi piano thành thạo 🎹
                </span>
                <span className="text-2xl">😊</span>
              </div>

              <div className="space-y-2 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-blue-700">A:</span> Can you play the piano?
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-teal-600">B:</span>
                  <input
                    type="text"
                    placeholder="Yes, I can."
                    value={act5Answers[1]}
                    onChange={e => setAct5Answers({ ...act5Answers, 1: e.target.value })}
                    className="px-3 py-1 border-2 border-slate-300 rounded-xl font-bold text-sm text-emerald-700 bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setAct5Answers({ ...act5Answers, 1: 'Yes, I can.' })}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-emerald-700 rounded-lg"
                >
                  Chọn: Yes, I can.
                </button>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-1 border-t border-slate-200">
                  {act5Answers[1]?.trim().toLowerCase().includes('yes') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (Yes, I can.)
                    </span>
                  ) : (
                    <span className="text-rose-600">Đáp án là: Yes, I can.</span>
                  )}
                </div>
              )}
            </div>

            {/* Item 2 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-black rounded-lg">
                  Câu 2: Bé trai ngã xe đạp xụ mặt 🚲
                </span>
                <span className="text-2xl">😢</span>
              </div>

              <div className="space-y-2 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-blue-700">A:</span> Can you ride a bike?
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-teal-600">B:</span>
                  <input
                    type="text"
                    placeholder="No, I can't."
                    value={act5Answers[2]}
                    onChange={e => setAct5Answers({ ...act5Answers, 2: e.target.value })}
                    className="px-3 py-1 border-2 border-slate-300 rounded-xl font-bold text-sm text-rose-700 bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setAct5Answers({ ...act5Answers, 2: "No, I can't." })}
                  className="px-2.5 py-1 bg-white hover:bg-rose-50 border border-slate-200 text-xs font-bold text-rose-700 rounded-lg"
                >
                  Chọn: No, I can't.
                </button>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-1 border-t border-slate-200">
                  {act5Answers[2]?.trim().toLowerCase().includes('no') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (No, I can't.)
                    </span>
                  ) : (
                    <span className="text-rose-600">Đáp án là: No, I can't.</span>
                  )}
                </div>
              )}
            </div>

            {/* Item 3 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-black rounded-lg">
                  Câu 3: Bé trai cưỡi ngựa dũng mãnh 🐎
                </span>
                <span className="text-2xl">🤠</span>
              </div>

              <div className="space-y-2 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-blue-700">A:</span> Can you ride a horse?
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-teal-600">B:</span>
                  <input
                    type="text"
                    placeholder="Yes"
                    value={act5Answers[3]}
                    onChange={e => setAct5Answers({ ...act5Answers, 3: e.target.value })}
                    className="px-2.5 py-1 w-20 border-2 border-slate-300 rounded-xl font-bold text-sm text-emerald-700 bg-white"
                  />
                  <span>, I can.</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setAct5Answers({ ...act5Answers, 3: 'Yes' })}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-emerald-700 rounded-lg"
                >
                  Chọn: Yes
                </button>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-1 border-t border-slate-200">
                  {act5Answers[3]?.trim().toLowerCase().includes('yes') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (Yes, I can.)
                    </span>
                  ) : (
                    <span className="text-rose-600">Đáp án là: Yes</span>
                  )}
                </div>
              )}
            </div>

            {/* Item 4 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-black rounded-lg">
                  Câu 4: Bé trai buồn bên cây đàn ghi ta 🎸
                </span>
                <span className="text-2xl">😔</span>
              </div>

              <div className="space-y-2 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-blue-700">A:</span> Can you play the guitar?
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-teal-600">B:</span>
                  <input
                    type="text"
                    placeholder="No"
                    value={act5Answers[4]}
                    onChange={e => setAct5Answers({ ...act5Answers, 4: e.target.value })}
                    className="px-2.5 py-1 w-20 border-2 border-slate-300 rounded-xl font-bold text-sm text-rose-700 bg-white"
                  />
                  <span>, I can't.</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setAct5Answers({ ...act5Answers, 4: 'No' })}
                  className="px-2.5 py-1 bg-white hover:bg-rose-50 border border-slate-200 text-xs font-bold text-rose-700 rounded-lg"
                >
                  Chọn: No
                </button>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-1 border-t border-slate-200">
                  {act5Answers[4]?.trim().toLowerCase().includes('no') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (No, I can't.)
                    </span>
                  ) : (
                    <span className="text-rose-600">Đáp án là: No</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S PLAY - CAN YOU ...? ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 35</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Activity 6: Trò chơi đoán thẻ — "Can you ...?"</span>
                <span className="text-2xl">🃏</span>
              </h3>
            </div>
            <button
              onClick={handlePickRandomCard}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rút Thẻ Bí Mật Khác</span>
            </button>
          </div>

          <p className="text-xs text-slate-600">
            Mô phỏng trò chơi trên lớp ở trang 35: Cô giáo giấu một bức tranh sau lưng. Cả lớp hãy đoán xem cô đang giấu tranh gì bằng câu hỏi <strong>"Can you _______?"</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Secret Card Mockup */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white border-4 border-indigo-400/40 shadow-2xl flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest font-bold">
                ★ TEACHER'S SECRET CARD ★
              </span>

              <div className="w-32 h-44 rounded-2xl bg-white/10 border-2 border-white/20 flex flex-col items-center justify-center p-4 transition-transform hover:scale-105">
                {isCardRevealed ? (
                  <div className="space-y-2 animate-in zoom-in">
                    <div className="text-6xl">{cardDeck[hiddenCardIndex].icon}</div>
                    <div className="text-sm font-black text-amber-300">
                      {cardDeck[hiddenCardIndex].name}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-5xl">❓</div>
                    <div className="text-xs font-bold text-slate-300">Thẻ đang úp</div>
                  </div>
                )}
              </div>

              {teacherAnswer && (
                <div className="p-3 bg-white/15 rounded-xl border border-white/20 text-xs font-bold text-amber-200">
                  {teacherAnswer}
                </div>
              )}
            </div>

            {/* Students Guessing Buttons */}
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                Bạn đoán cô giáo đang giấu thẻ nào? Bấm vào để hỏi cô:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cardDeck.map(card => (
                  <button
                    key={card.name}
                    onClick={() => handleGuessAbility(card.name)}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-white text-left transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{card.icon}</span>
                      <span className="text-[11px] font-bold text-blue-600 group-hover:underline">
                        Đoán thẻ này ➔
                      </span>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      "Can you {card.name}?"
                    </div>
                    <div className="text-xs text-slate-500">{card.vi}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
