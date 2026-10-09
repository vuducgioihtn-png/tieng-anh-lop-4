import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Utensils,
  CupSoda,
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
  Gift,
  Clock,
  Shuffle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit4Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit4Lesson2Studio: React.FC<Unit4Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // 6 Core Party Food & Drinks
  const partyItems = [
    {
      id: 'chips',
      name: 'some chips',
      type: 'food' as const,
      vi: 'khoai tây chiên giòn',
      ipa: '/sʌm tʃɪps/',
      reading: 'xam CHÍP-x',
      icon: '🍟',
      tip: 'Âm đầu /tʃ/ chu môi bật hơi, âm đuôi /ps/ xì gió nhẹ.'
    },
    {
      id: 'grapes',
      name: 'some grapes',
      type: 'food' as const,
      vi: 'chùm nho tươi chín mọng',
      ipa: '/sʌm ɡreɪps/',
      reading: 'xam G-RÂY-p-x',
      icon: '🍇',
      tip: 'Nhớ có âm đuôi /ps/ ở cuối từ vì nho có nhiều quả.'
    },
    {
      id: 'jam',
      name: 'some jam',
      type: 'food' as const,
      vi: 'mứt dâu ngọt ngào',
      ipa: '/sʌm dʒæm/',
      reading: 'xam JĂM',
      icon: '🍓',
      tip: 'Âm đầu /dʒ/ bật rung mạnh đầu lưỡi.'
    },
    {
      id: 'lemonade',
      name: 'some lemonade',
      type: 'drink' as const,
      vi: 'nước chanh tươi mát',
      ipa: '/sʌm ˌlem.əˈneɪd/',
      reading: 'xam le-mơ-NÂY-đ',
      icon: '🍋',
      tip: 'Trọng âm rơi vào "nade" (/neɪd/), âm đuôi /d/ bật nhẹ.'
    },
    {
      id: 'water',
      name: 'some water',
      type: 'drink' as const,
      vi: 'nước lọc thanh khiết',
      ipa: '/sʌm ˈwɔː.tər/',
      reading: 'xam OÁ-tờ',
      icon: '💧',
      tip: 'Bắt đầu bằng âm /w/ chu tròn môi, không rung cổ họng.'
    },
    {
      id: 'juice',
      name: 'some juice',
      type: 'drink' as const,
      vi: 'nước ép trái cây',
      ipa: '/sʌm dʒuːs/',
      reading: 'xam JU-x',
      icon: '🧃',
      tip: 'Âm đuôi /s/ xì gió rõ ràng, không đọc là diu-sơ.'
    }
  ];

  // Activity 1: Dialogue A & B (Track 40)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  const playDialogA = async () => {
    sound.playClick();
    setActiveSpeaker('Nam');
    await speakWord('Happy birthday, Lucy!', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord('Thank you.', speechRate);
    setActiveSpeaker(null);
    onAddStar(2);
  };

  const playDialogB = async () => {
    sound.playClick();
    setActiveSpeaker('Lucy');
    await speakWord('What do you want to eat, Nam?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord('I want some jam.', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Lucy');
    await speakWord('What do you want to drink?', speechRate);
    await new Promise(r => setTimeout(r, 450));

    setActiveSpeaker('Nam');
    await speakWord('I want some juice.', speechRate);
    setActiveSpeaker(null);
    onAddStar(3);
  };

  // Activity 2: Listen, point and say (Track 41)
  const [selectedItem, setSelectedItem] = useState(partyItems[0]);

  const handleSelectItem = async (item: typeof partyItems[0]) => {
    sound.playClick();
    setSelectedItem(item);
    const action = item.type === 'food' ? 'eat' : 'drink';
    await speakWord(`What do you want to ${action}? I want ${item.name}.`, speechRate);
    onAddStar(1);
  };

  // Activity 3: Let's talk
  const [talkCategory, setTalkCategory] = useState<'eat' | 'drink'>('eat');
  const [talkChoice, setTalkChoice] = useState<string>('some chips');

  const handleTalkPractice = async () => {
    sound.playClick();
    await speakWord(`What do you want to ${talkCategory}? I want ${talkChoice}.`, speechRate * 0.9);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    onAddStar(2);
  };

  // Activity 4: Listen and tick (Track 42)
  // 1: What do you want to eat? - I want some chips. -> b (chips)
  // 2: What do you want to drink? - I want some water. -> b (some jam and water)
  const [act4Answers, setAct4Answers] = useState<{ [q: number]: 'a' | 'b' | null }>({
    1: null,
    2: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    if (act4Answers[1] === 'b' && act4Answers[2] === 'b') {
      sound.playCorrect();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Look, complete and read
  const [act5Answers, setAct5Answers] = useState<{
    q1Word1: string;
    q1Word2: string;
    q2Word1: string;
    q2Word2: string;
  }>({
    q1Word1: '',
    q1Word2: '',
    q2Word1: '',
    q2Word2: ''
  });
  const [act5Checked, setAct5Checked] = useState<boolean>(false);

  const handleCheckAct5 = () => {
    sound.playClick();
    setAct5Checked(true);
    const c1 = act5Answers.q1Word1.trim().toLowerCase() === 'what' && act5Answers.q1Word2.trim().toLowerCase().includes('grapes');
    const c2 = act5Answers.q2Word1.trim().toLowerCase() === 'drink' && act5Answers.q2Word2.trim().toLowerCase().includes('chips');

    if (c1 || c2) {
      sound.playCorrect();
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 6: Let's play — Board race (Sort Food vs Drinks)
  const [classifiedItems, setClassifiedItems] = useState<{
    food: string[];
    drinks: string[];
  }>({
    food: [],
    drinks: []
  });

  const availableRaceItems = [
    { name: 'jam', vi: 'mứt', category: 'food' as const, emoji: '🍓' },
    { name: 'chips', vi: 'khoai tây', category: 'food' as const, emoji: '🍟' },
    { name: 'grapes', vi: 'nho', category: 'food' as const, emoji: '🍇' },
    { name: 'cake', vi: 'bánh gato', category: 'food' as const, emoji: '🎂' },
    { name: 'water', vi: 'nước lọc', category: 'drinks' as const, emoji: '💧' },
    { name: 'lemonade', vi: 'nước chanh', category: 'drinks' as const, emoji: '🍋' },
    { name: 'juice', vi: 'nước ép', category: 'drinks' as const, emoji: '🧃' },
    { name: 'milk', vi: 'sữa tươi', category: 'drinks' as const, emoji: '🥛' }
  ];

  const handleSortItem = (item: typeof availableRaceItems[0], targetCat: 'food' | 'drinks') => {
    sound.playClick();
    if (item.category === targetCat) {
      sound.playCorrect();
      if (targetCat === 'food') {
        if (!classifiedItems.food.includes(item.name)) {
          setClassifiedItems(prev => ({
            ...prev,
            food: [...prev.food, item.name]
          }));
        }
      } else {
        if (!classifiedItems.drinks.includes(item.name)) {
          setClassifiedItems(prev => ({
            ...prev,
            drinks: [...prev.drinks, item.name]
          }));
        }
      }
      onAddStar(1);
    } else {
      sound.playWrong();
    }
  };

  const handleResetBoardRace = () => {
    sound.playClick();
    setClassifiedItems({ food: [], drinks: [] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO LESSON BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              <span>🎉</span>
              <span>Trang 30 - 31 SGK Kết Nối Tri Thức</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>⬅️ Tiết 1 (Trang 28)</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-amber-50 text-amber-900 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>Tiết 3 (Trang 32) ➔</span>
                </button>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 4: My birthday party — Lesson 2
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed max-w-3xl">
            Lễ hội ẩm thực sinh nhật với lời mời ngọt ngào: <strong>"What do you want to eat / drink?"</strong> (Bạn muốn ăn/uống gì?), câu trả lời với từ <strong>"some"</strong> (*some chips, some grapes, some lemonade, some water*) và trò chơi bảng <strong>Board race</strong>!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🍟 some chips (khoai tây chiên)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🍇 some grapes (chùm nho)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🍋 some lemonade (nước chanh)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">💧 some water (nước lọc)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🍓 some jam (mứt dâu)</span>
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
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
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
            className="px-4 py-1.5 bg-white text-slate-900 hover:bg-amber-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang ăn & uống'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          🍰
        </div>
      </div>

      {/* ================= BÍ KÍP PHÂN BIỆT EAT VÀ DRINK ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Não Phải: Phân Biệt EAT (Ăn) & DRINK (Uống)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 "What do you want to EAT/DRINK?" ➔ "I want some..."</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Đồ ăn nhai được dùng <strong>EAT</strong> (chips, grapes, jam). Đồ uống dạng lỏng dùng <strong>DRINK</strong> (water, lemonade, juice).
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('What do you want to eat? I want some chips.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-slate-950" />
            <span>Nghe Câu Mẫu</span>
          </button>
        </div>

        {/* 6 Party Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {partyItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                sound.playClick();
                speakWord(`I want ${item.name}.`, speechRate);
              }}
              className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400 cursor-pointer transition-all space-y-1.5 text-center group"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xs font-black text-amber-300 uppercase tracking-wider">
                {item.type === 'food' ? 'Đồ Ăn (Food)' : 'Đồ Uống (Drink)'}
              </div>
              <div className="text-sm font-black text-white group-hover:text-amber-300">
                {item.name}
              </div>
              <div className="text-[11px] text-slate-300">({item.vi})</div>
              <div className="text-[10px] bg-slate-950/60 text-amber-200 rounded py-0.5 px-1 font-bold">
                {item.reading}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Dạy Từ Vựng Tiệc Sinh Nhật</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 text-sm">💡 1. Ý nghĩa của từ "SOME"</div>
              <p>
                Từ <strong>some</strong> có nghĩa là "một ít / một chút / vài". Nó đứng trước cả danh từ đếm được số nhiều (*some chips, some grapes*) và danh từ không đếm được (*some water, some lemonade, some jam*).
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <div className="font-bold text-rose-950 text-sm">💡 2. Âm gió /s/ trong "grapes" và "chips"</div>
              <p>
                Khi nói <strong>some chips</strong> và <strong>some grapes</strong>, nhắc con bật âm gió /s/ ở cuối thật rõ ràng, tạo sự chuyên nghiệp và phát âm tự nhiên.
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-950 text-sm">💡 3. Trò chơi đóng vai tại bàn ăn</div>
              <p>
                Trong bữa cơm gia đình, bố mẹ có thể hỏi con: <em>"What do you want to eat/drink?"</em> để con reo to: <em>"I want some water, Mom!"</em>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITIES NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 30' },
          { id: 2, label: '2. Listen, point & say', icon: '🍟', desc: 'Trang 30' },
          { id: 3, label: "3. Let's talk", icon: '💬', desc: 'Trang 30' },
          { id: 4, label: '4. Listen & tick', icon: '✔️', desc: 'Trang 31' },
          { id: 5, label: '5. Look, complete & read', icon: '✍️', desc: 'Trang 31' },
          { id: 6, label: "6. Board race (Trò chơi)", icon: '🏁', desc: 'Trang 31' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border-2 ${
              activeSection === tab.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-md font-black'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
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
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 40 · Sách Giáo Khoa Trang 30</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 1: Look, listen and repeat (Quan sát, nghe và nhắc lại)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={playDialogA}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh A (Chúc mừng)</span>
              </button>
              <button
                onClick={playDialogB}
                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs rounded-xl border border-orange-200 transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Tranh B (Mời ăn & uống)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue A Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-600 text-white text-xs font-black rounded-full">
                  Tranh a: Tặng quà sinh nhật
                </span>
                <button
                  onClick={playDialogA}
                  className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-600 border border-slate-200"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Nam */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Happy birthday, Lucy!', speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-amber-700 font-black">👦 Nam (trao hộp quà):</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-amber-600">
                  "Happy birthday, Lucy!"
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /ˈhæp.i ˈbɜːθ.deɪ, ˈluː.si/ · HÁP-pi BƠTH-đây, LU-xi!
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Chúc mừng sinh nhật cậu nhé Lucy!
                </div>
              </div>

              {/* Lucy */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('Thank you.', speechRate);
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="text-pink-600 font-black">👧 Lucy:</span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600" />
                </div>
                <div className="text-base font-black text-slate-900 group-hover:text-pink-600">
                  "Thank you."
                </div>
                {showPhoneticDetails && (
                  <div className="text-xs font-mono text-slate-400">
                    /θæŋk juː/ · Thẻng-k iu.
                  </div>
                )}
                <div className="text-xs text-slate-600">
                  Cảm ơn cậu nhiều nhé.
                </div>
              </div>
            </div>

            {/* Dialogue B Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-orange-600 text-white text-xs font-black rounded-full">
                  Tranh b: Mời ăn mứt & uống nước ép
                </span>
                <button
                  onClick={playDialogB}
                  className="p-2 rounded-xl bg-white hover:bg-orange-100 text-orange-600 border border-slate-200"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Lucy: What do you want to eat, Nam? */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('What do you want to eat, Nam?', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-pink-600">👧 Lucy hỏi ăn:</div>
                <div className="text-sm font-black text-slate-900 group-hover:text-orange-600">
                  "What do you want to eat, Nam?"
                </div>
                <div className="text-[11px] text-slate-600">Cậu muốn ăn gì hả Nam?</div>
              </div>

              {/* Nam: I want some jam. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('I want some jam.', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-amber-700">👦 Nam đáp:</div>
                <div className="text-sm font-black text-amber-700">
                  "I want some jam." 🍓
                </div>
                <div className="text-[11px] text-slate-600">Tớ muốn một ít mứt.</div>
              </div>

              {/* Lucy: What do you want to drink? */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('What do you want to drink?', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-pink-600">👧 Lucy hỏi uống:</div>
                <div className="text-sm font-black text-slate-900 group-hover:text-orange-600">
                  "What do you want to drink?"
                </div>
                <div className="text-[11px] text-slate-600">Cậu muốn uống gì nào?</div>
              </div>

              {/* Nam: I want some juice. */}
              <div
                onClick={() => {
                  sound.playClick();
                  speakWord('I want some juice.', speechRate);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 cursor-pointer transition-all space-y-1 group"
              >
                <div className="text-xs font-black text-amber-700">👦 Nam đáp:</div>
                <div className="text-sm font-black text-orange-600">
                  "I want some juice." 🧃
                </div>
                <div className="text-[11px] text-slate-600">Tớ muốn một cốc nước ép hoa quả.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN, POINT AND SAY ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Track 41 · Sách Giáo Khoa Trang 30</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 2: Listen, point and say (Nghe, chỉ vào tranh và nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bấm vào 4 món ăn và đồ uống chuẩn trong SGK để nghe câu hỏi và câu trả lời mẫu:
            </p>
          </div>

          {/* Model Pattern Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800">Mẫu câu đang thực hành:</span>
              <div className="text-base sm:text-lg font-black text-slate-900">
                A: What do you want to {selectedItem.type === 'food' ? 'eat' : 'drink'}? ➔ B: I want{' '}
                <span className="text-amber-600 underline font-extrabold">{selectedItem.name}</span>.
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                const action = selectedItem.type === 'food' ? 'eat' : 'drink';
                speakWord(`What do you want to ${action}? I want ${selectedItem.name}.`, speechRate);
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát Âm Mẫu</span>
            </button>
          </div>

          {/* 4 SGK Items: a (chips), b (grapes), c (lemonade), d (water) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'a', item: partyItems[0] }, // chips
              { key: 'b', item: partyItems[1] }, // grapes
              { key: 'c', item: partyItems[3] }, // lemonade
              { key: 'd', item: partyItems[4] }  // water
            ].map(({ key, item }) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={key}
                  onClick={() => handleSelectItem(item)}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all space-y-3 relative text-center group ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 shadow-lg ring-2 ring-amber-200 scale-102'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white font-bold text-xs flex items-center justify-center border border-slate-200">
                    {key}
                  </span>

                  <div className="text-5xl pt-2">{item.icon}</div>

                  <div>
                    <span className="text-[11px] font-black uppercase text-amber-700">
                      {item.type === 'food' ? 'Món ăn (eat)' : 'Đồ uống (drink)'}
                    </span>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-amber-600">
                      {item.name}
                    </h4>
                    <div className="text-xs text-slate-500">{item.vi}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-center gap-1 text-xs text-amber-700 font-bold">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Bấm để luyện nói</span>
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
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Sách Giáo Khoa Trang 30</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 3: Let's talk (Chúng mình cùng luyện nói)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Đóng vai tại bàn tiệc sinh nhật: Chọn ăn (eat) hoặc uống (drink) và chọn món bạn muốn!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-amber-200 space-y-6">
            {/* Category Switcher: eat vs drink */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Bạn muốn hỏi về:</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setTalkCategory('eat');
                  setTalkChoice('some chips');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  talkCategory === 'eat'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Đồ Ăn (eat)</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setTalkCategory('drink');
                  setTalkChoice('some lemonade');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  talkCategory === 'drink'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <CupSoda className="w-3.5 h-3.5" />
                <span>Đồ Uống (drink)</span>
              </button>
            </div>

            {/* Food or Drinks Choices */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Chọn món bạn muốn:
              </label>
              <div className="flex flex-wrap gap-2">
                {partyItems
                  .filter(x => (talkCategory === 'eat' ? x.type === 'food' : x.type === 'drink'))
                  .map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        setTalkChoice(item.name);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                        talkChoice === item.name
                          ? 'bg-orange-600 text-white shadow-md ring-2 ring-orange-200 scale-105'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Realtime Conversation Bubble */}
            <div className="p-5 rounded-2xl bg-white border-2 border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-700 text-sm">👦 Nam hỏi:</span>
                <span className="font-bold text-base text-slate-900">
                  "What do you want to {talkCategory}?"
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(`What do you want to ${talkCategory}?`, speechRate);
                  }}
                  className="p-1 text-slate-400 hover:text-amber-600"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-black text-pink-600 text-sm">👧 Bạn đáp:</span>
                <span className="font-black text-lg text-orange-600">
                  "I want {talkChoice}."
                </span>
              </div>
            </div>

            <button
              onClick={handleTalkPractice}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 rounded-2xl font-black text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Thực Hành Luyện Nói & Nhận Sao ⭐</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: LISTEN AND TICK ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 42 · Sách Giáo Khoa Trang 31</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 4: Listen and tick (Nghe và đánh dấu tích vào phương án đúng)
              </h3>
            </div>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
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
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Câu hỏi 1: Nghe bạn nhỏ muốn ăn gì?</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord('1. What do you want to eat? - I want some chips.', speechRate);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-xs font-bold text-amber-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Băng Câu 1</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1a: grapes */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 1: 'a' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[1] === 'a'
                      ? 'border-amber-500 bg-amber-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">a.</span>
                    <span className="text-3xl">🍇</span>
                    <span className="font-bold text-sm">some grapes</span>
                  </div>
                  <input
                    type="radio"
                    name="act4-q1"
                    checked={act4Answers[1] === 'a'}
                    onChange={() => {}}
                    className="w-4 h-4 text-amber-600"
                  />
                </div>

                {/* 1b: chips (Correct) */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 1: 'b' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[1] === 'b'
                      ? 'border-amber-500 bg-amber-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">b.</span>
                    <span className="text-3xl">🍟</span>
                    <span className="font-bold text-sm">some chips</span>
                  </div>
                  <input
                    type="radio"
                    name="act4-q1"
                    checked={act4Answers[1] === 'b'}
                    onChange={() => {}}
                    className="w-4 h-4 text-amber-600"
                  />
                </div>
              </div>

              {act4Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act4Answers[1] === 'b' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (I want some chips.)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Chưa đúng. Băng đọc: "I want some chips" ➔ Đáp án là <strong>b</strong>.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Câu hỏi 2: Nghe bạn nhỏ muốn uống nước gì?</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord('2. What do you want to drink? - I want some water.', speechRate);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-xs font-bold text-amber-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Băng Câu 2</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 2a: jam and lemonade */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 2: 'a' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[2] === 'a'
                      ? 'border-amber-500 bg-amber-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">a.</span>
                    <span className="text-2xl">🍓 🍋</span>
                    <span className="font-bold text-sm">some jam & lemonade</span>
                  </div>
                  <input
                    type="radio"
                    name="act4-q2"
                    checked={act4Answers[2] === 'a'}
                    onChange={() => {}}
                    className="w-4 h-4 text-amber-600"
                  />
                </div>

                {/* 2b: jam and water (Correct) */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setAct4Answers({ ...act4Answers, 2: 'b' });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    act4Answers[2] === 'b'
                      ? 'border-amber-500 bg-amber-50/80 shadow-md font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm">b.</span>
                    <span className="text-2xl">🍓 💧</span>
                    <span className="font-bold text-sm">some jam & water</span>
                  </div>
                  <input
                    type="radio"
                    name="act4-q2"
                    checked={act4Answers[2] === 'b'}
                    onChange={() => {}}
                    className="w-4 h-4 text-amber-600"
                  />
                </div>
              </div>

              {act4Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act4Answers[2] === 'b' ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng rồi! (I want some water.)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Chưa đúng. Băng đọc: "I want some water" ➔ Đáp án là <strong>b</strong>.
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
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 31</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 5: Look, complete and read (Quan sát tranh và hoàn thành câu)
              </h3>
            </div>
            <button
              onClick={handleCheckAct5}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dialogue 1: Nam & Mary (Grapes) */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-600 text-white text-xs font-black rounded-full">
                  Đoạn 1: Mary muốn ăn nho 🍇
                </span>
                <span className="text-2xl">🎁</span>
              </div>

              <div className="space-y-3 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-amber-700">A:</span> Happy birthday, Nam!
                </div>
                <div>
                  <span className="font-bold text-pink-600">B:</span> Thank you.{' '}
                  <input
                    type="text"
                    placeholder="What"
                    value={act5Answers.q1Word1}
                    onChange={e =>
                      setAct5Answers({ ...act5Answers, q1Word1: e.target.value })
                    }
                    className="px-2 py-0.5 w-20 border-2 border-slate-300 rounded-lg font-bold text-amber-700"
                  />{' '}
                  do you want to eat, Mary?
                </div>
                <div>
                  <span className="font-bold text-amber-700">A:</span> I want some{' '}
                  <input
                    type="text"
                    placeholder="grapes"
                    value={act5Answers.q1Word2}
                    onChange={e =>
                      setAct5Answers({ ...act5Answers, q1Word2: e.target.value })
                    }
                    className="px-2 py-0.5 w-28 border-2 border-slate-300 rounded-lg font-bold text-amber-700"
                  />
                  .
                </div>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act5Answers.q1Word1.trim().toLowerCase() === 'what' &&
                  act5Answers.q1Word2.trim().toLowerCase().includes('grapes') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn hảo! (What ... some grapes)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Gợi ý điền: từ 1 là <strong>What</strong>, từ 2 là <strong>grapes</strong>.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Dialogue 2: Ben wants water & chips */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-orange-600 text-white text-xs font-black rounded-full">
                  Đoạn 2: Ben muốn uống nước & ăn khoai 🍟
                </span>
                <span className="text-2xl">💧</span>
              </div>

              <div className="space-y-3 text-sm text-slate-800">
                <div>
                  <span className="font-bold text-pink-600">A:</span> What do you want to{' '}
                  <input
                    type="text"
                    placeholder="drink"
                    value={act5Answers.q2Word1}
                    onChange={e =>
                      setAct5Answers({ ...act5Answers, q2Word1: e.target.value })
                    }
                    className="px-2 py-0.5 w-20 border-2 border-slate-300 rounded-lg font-bold text-orange-700"
                  />
                  , Ben?
                </div>
                <div>
                  <span className="font-bold text-amber-700">B:</span> I want some water.
                </div>
                <div>
                  <span className="font-bold text-pink-600">A:</span> What do you want to eat?
                </div>
                <div>
                  <span className="font-bold text-amber-700">B:</span> I want some{' '}
                  <input
                    type="text"
                    placeholder="chips"
                    value={act5Answers.q2Word2}
                    onChange={e =>
                      setAct5Answers({ ...act5Answers, q2Word2: e.target.value })
                    }
                    className="px-2 py-0.5 w-24 border-2 border-slate-300 rounded-lg font-bold text-orange-700"
                  />
                  .
                </div>
              </div>

              {act5Checked && (
                <div className="text-xs font-bold pt-2 border-t border-slate-200">
                  {act5Answers.q2Word1.trim().toLowerCase() === 'drink' &&
                  act5Answers.q2Word2.trim().toLowerCase().includes('chips') ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn hảo! (drink ... chips)
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      Gợi ý điền: từ 1 là <strong>drink</strong>, từ 2 là <strong>chips</strong>.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: LET'S PLAY - BOARD RACE ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 31</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Activity 6: Board race — Cuộc đua phân loại Đồ ăn & Đồ uống</span>
                <span className="text-2xl">🏁</span>
              </h3>
            </div>
            <button
              onClick={handleResetBoardRace}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi Lại Từ Đầu</span>
            </button>
          </div>

          <p className="text-xs text-slate-600">
            Giống trò chơi trên bảng lớp ở trang 31: Hãy bấm vào từng thẻ món bên dưới rồi chọn đưa vào cột <strong>Drinks</strong> hoặc <strong>Food</strong> cho đúng!
          </p>

          {/* Blackboard Mockup */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950 border-4 border-amber-900 shadow-2xl relative">
            <div className="text-center font-mono text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
              ★ CLASSROOM BLACKBOARD · BOARD RACE ★
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1: Drinks */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/20 space-y-3">
                <div className="text-center border-b border-white/20 pb-2">
                  <span className="text-lg font-black text-sky-300 uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>🥤 Drinks (Đồ uống)</span>
                  </span>
                </div>
                <div className="min-h-28 flex flex-wrap gap-2 items-center justify-center p-2">
                  {classifiedItems.drinks.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Chưa có đồ uống nào...
                    </span>
                  ) : (
                    classifiedItems.drinks.map(name => (
                      <span
                        key={name}
                        className="px-3 py-1.5 bg-sky-500 text-white rounded-xl text-xs font-black shadow flex items-center gap-1.5 animate-in zoom-in"
                      >
                        <span>✓</span>
                        <span>{name}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Column 2: Food */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/20 space-y-3">
                <div className="text-center border-b border-white/20 pb-2">
                  <span className="text-lg font-black text-amber-300 uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>🍔 Food (Đồ ăn)</span>
                  </span>
                </div>
                <div className="min-h-28 flex flex-wrap gap-2 items-center justify-center p-2">
                  {classifiedItems.food.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Chưa có món ăn nào...
                    </span>
                  ) : (
                    classifiedItems.food.map(name => (
                      <span
                        key={name}
                        className="px-3 py-1.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-black shadow flex items-center gap-1.5 animate-in zoom-in"
                      >
                        <span>✓</span>
                        <span>{name}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Available Items to Sort */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-black text-slate-700 block uppercase tracking-wider">
              Bấm phân loại vào bảng:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableRaceItems.map(item => {
                const isFoodDone = classifiedItems.food.includes(item.name);
                const isDrinkDone = classifiedItems.drinks.includes(item.name);
                const isDone = isFoodDone || isDrinkDone;

                return (
                  <div
                    key={item.name}
                    className={`p-3 rounded-2xl border-2 transition-all space-y-2 text-center ${
                      isDone
                        ? 'opacity-40 bg-slate-100 border-slate-200'
                        : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                    }`}
                  >
                    <div className="text-3xl">{item.emoji}</div>
                    <div className="text-xs font-black text-slate-800">
                      {item.name} ({item.vi})
                    </div>
                    {!isDone ? (
                      <div className="flex items-center justify-center gap-1 pt-1">
                        <button
                          onClick={() => handleSortItem(item, 'drinks')}
                          className="px-2 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 text-[10px] font-bold rounded-lg"
                        >
                          Uống
                        </button>
                        <button
                          onClick={() => handleSortItem(item, 'food')}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold rounded-lg"
                        >
                          Ăn
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 block pt-1">
                        Đã xếp xong ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
