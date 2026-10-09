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
  DollarSign,
  Tag,
  ShoppingBag,
  CircleDollarSign,
  PenTool
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit18Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit18Lesson2Studio: React.FC<Unit18Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 76)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Mẹ hỏi giá áo phông',
      speakerA: 'Mum',
      avatarA: '👩',
      textA: 'How much is the T-shirt, Linh?',
      ipaA: '/haʊ mʌtʃ ɪz ðə ˈtiːʃɜːt lɪŋ/',
      readingA: 'Hao mát-ch ít-z đờ ti-shớt, Linh?',
      meaningA: 'Chiếc áo phông này giá bao nhiêu hả Linh?',
      speakerB: 'Linh',
      avatarB: '👧',
      textB: 'It’s sixty thousand dong.',
      ipaB: '/ɪts ˈsɪksti ˈθaʊzənd dɒŋ/',
      readingB: 'Ít-s xích-x-ti thao-zừn-đ đông.',
      meaningB: 'Dạ giá sáu mươi nghìn đồng (60.000đ) ạ mẹ.',
      priceTag: '60.000đ',
      context: 'Mẹ và Linh đang xem quầy áo quần, Linh nhìn vào mác giá 60.000đ trả lời mẹ.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Linh hỏi giá chân váy',
      speakerA: 'Linh',
      avatarA: '👧',
      textA: 'How much is the skirt, Mum?',
      ipaA: '/haʊ mʌtʃ ɪz ðə skɜːt mʌm/',
      readingA: 'Hao mát-ch ít-z đờ s-cớt, Măm?',
      meaningA: 'Thế còn chiếc chân váy này giá bao nhiêu hả mẹ?',
      speakerB: 'Mum',
      avatarB: '👩',
      textB: 'It’s seventy thousand dong.',
      ipaB: '/ɪts ˈsɛvnti ˈθaʊzənd dɒŋ/',
      readingB: 'Ít-s se-vừn-ti thao-zừn-đ đông.',
      meaningB: 'Nó giá bảy mươi nghìn đồng (70.000đ) con nhé.',
      priceTag: '70.000đ',
      context: 'Mẹ xem mác chiếc chân váy trên giá treo và trả lời cho Linh.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 77)
  // =========================================================================
  const priceItems = [
    {
      id: 'pen',
      item: 'pen',
      ipaItem: '/pɛn/',
      readingItem: 'pen',
      meaningItem: 'cây bút mực / bút bi',
      priceEn: 'twenty thousand dong',
      priceNumber: '20.000đ',
      ipaPrice: '/ˈtwɛnti ˈθaʊzənd dɒŋ/',
      readingPrice: 'tu-en-ti thao-zừn-đ đông',
      icon: '✒️',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'skirt',
      item: 'skirt',
      ipaItem: '/skɜːt/',
      readingItem: 's-cớt',
      meaningItem: 'chiếc chân váy xếp ly',
      priceEn: 'eighty thousand dong',
      priceNumber: '80.000đ',
      ipaPrice: '/ˈeɪti ˈθaʊzənd dɒŋ/',
      readingPrice: 'ây-ti thao-zừn-đ đông',
      icon: '👗',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'tshirt',
      item: 'T-shirt',
      ipaItem: '/ˈtiːʃɜːt/',
      readingItem: 'ti-shớt',
      meaningItem: 'áo thun / áo phông kẻ sọc',
      priceEn: 'fifty thousand dong',
      priceNumber: '50.000đ',
      ipaPrice: '/ˈfɪfti ˈθaʊzənd dɒŋ/',
      readingPrice: 'phíp-f-ti thao-zừn-đ đông',
      icon: '👕',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'schoolbag',
      item: 'school bag',
      ipaItem: '/ˈskuːl bæɡ/',
      readingItem: 's-cu-l béc-g',
      meaningItem: 'cặp sách / ba lô đi học',
      priceEn: 'ninety thousand dong',
      priceNumber: '90.000đ',
      ipaPrice: '/ˈnaɪnti ˈθaʊzənd dɒŋ/',
      readingPrice: 'nai-n-ti thao-zừn-đ đông',
      icon: '🎒',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const [selectedPriceItem, setSelectedPriceItem] = useState(priceItems[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const talkItems = [
    { name: 'T-shirt', icon: '👕', priceText: 'fifty thousand dong', tag: '50.000đ' },
    { name: 'skirt', icon: '👗', priceText: 'seventy thousand dong', tag: '70.000đ' },
    { name: 'pen', icon: '🖊️', priceText: 'ten thousand dong', tag: '10.000đ' },
    { name: 'school bag', icon: '🎒', priceText: 'eighty thousand dong', tag: '80.000đ' }
  ];
  const [selectedTalkItem, setSelectedTalkItem] = useState(talkItems[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND NUMBER (TRACK 78)
  // =========================================================================
  interface Track78Item {
    id: string; // 'a', 'b', 'c', 'd'
    title: string;
    itemDesc: string;
    price: string;
    icon: string;
    correctOrder: number; // 1, 2, 3, 4
    script: string;
  }

  const track78Items: Track78Item[] = [
    {
      id: 'a',
      title: 'Tranh a · Áo phông đỏ (Red T-shirt)',
      itemDesc: 'T-shirt (red)',
      price: '40.000đ',
      icon: '👕',
      correctOrder: 2,
      script: '2. How much is the red T-shirt? - It’s forty thousand dong.'
    },
    {
      id: 'b',
      title: 'Tranh b · Chân váy xanh (Green skirt)',
      itemDesc: 'Skirt (green)',
      price: '30.000đ',
      icon: '👗',
      correctOrder: 4,
      script: '4. How much is that green skirt? - It’s thirty thousand dong.'
    },
    {
      id: 'c',
      title: 'Tranh c · Ba lô xanh dương (Blue school bag)',
      itemDesc: 'School bag (blue)',
      price: '70.000đ',
      icon: '🎒',
      correctOrder: 1,
      script: '1. How much is the school bag? - It’s seventy thousand dong.'
    },
    {
      id: 'd',
      title: 'Tranh d · Mũ lưỡi trai vàng (Yellow cap)',
      itemDesc: 'Cap (yellow)',
      price: '20.000đ',
      icon: '🧢',
      correctOrder: 3,
      script: '3. How much is the cap? - It’s twenty thousand dong.'
    }
  ];

  const [userOrders, setUserOrders] = useState<Record<string, number | null>>({
    a: null,
    b: null,
    c: null,
    d: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectOrder = (itemId: string, num: number) => {
    sound.playClick();
    setUserOrders(prev => ({ ...prev, [itemId]: num }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userOrders).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    track78Items.forEach(item => {
      if (userOrders[item.id] === item.correctOrder) {
        correct++;
      }
    });

    if (correct === 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 75, spread: 65 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserOrders({ a: null, b: null, c: null, d: null });
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
    let score = 0;

    if (act5_1_1.trim().toLowerCase() === 'fifty' || act5_1_1.trim() === '50') score++;
    if (
      act5_1_2.trim().toLowerCase() === 'thousand dong' ||
      act5_1_2.trim().toLowerCase() === 'thousand'
    )
      score++;
    if (
      act5_2_1.trim().toLowerCase() === 'how much' ||
      act5_2_1.trim().toLowerCase() === 'how much is it'
    )
      score++;
    if (act5_2_2.trim().toLowerCase() === 'seventy' || act5_2_2.trim() === '70') score++;

    if (score >= 3) {
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
  // ACTIVITY 6: LET'S PLAY - "GUESS THE PRICE!"
  // =========================================================================
  interface GameGood {
    nameEn: string;
    nameVi: string;
    icon: string;
    minPrice: number;
    maxPrice: number;
    secretPrice: number;
  }

  const gameGoods: GameGood[] = [
    {
      nameEn: 'school bag',
      nameVi: 'ba lô đi học',
      icon: '🎒',
      minPrice: 50000,
      maxPrice: 60000,
      secretPrice: 55000
    },
    {
      nameEn: 'T-shirt',
      nameVi: 'áo thun xinh xắn',
      icon: '👕',
      minPrice: 40000,
      maxPrice: 50000,
      secretPrice: 45000
    },
    {
      nameEn: 'pen',
      nameVi: 'bút máy cao cấp',
      icon: '✒️',
      minPrice: 15000,
      maxPrice: 25000,
      secretPrice: 20000
    },
    {
      nameEn: 'skirt',
      nameVi: 'chân váy đỏ',
      icon: '👗',
      minPrice: 60000,
      maxPrice: 80000,
      secretPrice: 70000
    }
  ];

  const [currentGameGood, setCurrentGameGood] = useState<GameGood>(gameGoods[0]);
  const [guessInput, setGuessInput] = useState<string>('');
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);

  const handleGuessPrice = () => {
    const val = parseInt(guessInput.replace(/\D/g, ''), 10);
    if (!val || isNaN(val)) {
      sound.playWarning();
      setGuessFeedback('Bé hãy nhập số tiền dự đoán (ví dụ: 55000) nhé!');
      return;
    }

    if (val === currentGameGood.secretPrice) {
      sound.playComplete();
      confetti({ particleCount: 70, spread: 60 });
      setGuessFeedback(`🎉 BINGO! Chính xác là ${currentGameGood.secretPrice.toLocaleString('vi-VN')}đ! Bạn thật tài năng!`);
      setGameScore(prev => prev + 1);
      onAddStar(2);
      setTimeout(() => {
        const remaining = gameGoods.filter(g => g.nameEn !== currentGameGood.nameEn);
        const nextG = remaining[Math.floor(Math.random() * remaining.length)];
        setCurrentGameGood(nextG);
        setGuessInput('');
        setGuessFeedback(null);
      }, 2000);
    } else if (val < currentGameGood.secretPrice) {
      sound.playWarning();
      setGuessFeedback(`⬆️ Giá thực tế CAO HƠN con số ${val.toLocaleString('vi-VN')}đ một chút! Đoán thêm nào!`);
    } else {
      sound.playWarning();
      setGuessFeedback(`⬇️ Giá thực tế THẤP HƠN con số ${val.toLocaleString('vi-VN')}đ một chút! Đoán lại nào!`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Sub-bar */}
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
                  ? 'bg-rose-600 text-white shadow-xs'
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
              className="px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold text-xs transition flex items-center gap-1 border border-pink-200"
            >
              <span>⬅️ Tiết 1: Vị Trí Cửa Hàng</span>
            </button>
          )}
          {onSwitchToLesson3 && (
            <button
              onClick={onSwitchToLesson3}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs transition flex items-center gap-1 border border-purple-200"
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                Trang 54 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 76</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-rose-600" />
              1. Look, listen and repeat (Hỏi và đáp về giá tiền đồ vật)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Mẹ và bạn Linh hỏi giá áo thun và chân váy: <em>How much is the T-shirt? - It's sixty thousand dong.</em>
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                "How much is the T-shirt, Linh? It's sixty thousand dong. How much is the skirt, Mum? It's seventy thousand dong.",
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-rose-50/40 via-pink-50/20 to-orange-50/30 rounded-3xl p-5 md:p-6 border-2 border-rose-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-rose-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-rose-800">
                  {step.part}
                </span>
                <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-extrabold rounded-full text-xs">
                  Mác giá: {step.priceTag}
                </span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-rose-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-rose-50 text-rose-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-rose-900 font-medium bg-rose-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarB}</span>
                    <span className="font-bold text-xs text-orange-700">{step.speakerB}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textB, speechRate)}
                    className="p-1 rounded-lg hover:bg-orange-50 text-orange-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textB}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaB}</p>
                <p className="text-xs text-orange-900 font-medium bg-orange-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingB}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningB}</p>
              </div>
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
              Trang 54 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 77</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Tag className="w-6 h-6 text-orange-600" />
            2. Listen, point and say (Hỏi &amp; Đáp giá tiền 4 món đồ)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Mẫu câu: <strong>How much is the ______?</strong> ➡️ Trả lời:{' '}
            <strong>It’s ______ thousand dong.</strong>
          </p>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {priceItems.map(item => {
            const isSelected = selectedPriceItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPriceItem(item);
                  speakWord(`How much is the ${item.item}? It's ${item.priceEn}.`, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left relative ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      {item.icon}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-orange-100 text-orange-800 font-extrabold text-sm">
                      {item.priceNumber}
                    </span>
                  </div>

                  <h4 className="font-black text-base text-slate-800 mt-3 capitalize">
                    {item.item}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">{item.ipaItem}</p>
                  <p className="text-xs text-slate-500 mt-0.5 italic">{item.meaningItem}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <p className="text-xs font-black text-orange-700 capitalize">
                    {item.priceEn}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">{item.ipaPrice}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 border-2 border-orange-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-black uppercase text-orange-800 tracking-wider">
              Thực hành hỏi giá món hàng: &quot;{selectedPriceItem.item}&quot; {selectedPriceItem.icon}
            </span>
            <p className="font-black text-lg text-slate-800">
              Q: How much is the {selectedPriceItem.item}?
            </p>
            <p className="font-black text-lg text-orange-700 flex items-center gap-2 justify-center md:justify-start">
              <span>A: It’s {selectedPriceItem.priceEn}.</span>
              <span className="px-2 py-0.5 bg-white text-orange-800 font-extrabold rounded-md text-xs border border-orange-200">
                ({selectedPriceItem.priceNumber})
              </span>
            </p>
            <p className="text-xs text-slate-600 italic">
              💡 {selectedPriceItem.meaningItem} giá {selectedPriceItem.priceNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(
                  `How much is the ${selectedPriceItem.item}? It's ${selectedPriceItem.priceEn}.`,
                  speechRate
                )
              }
              className="px-5 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu thoại 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-orange-800 border border-orange-300 font-bold text-xs hover:bg-orange-100 transition active:scale-95"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
              Trang 54 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Gian Hàng Mua Sắm</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-rose-600" />
            3. Let’s talk (Hỏi giá các món đồ trên kệ hàng TTTM)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn từng món hàng để xem giá và luyện mẫu câu hỏi đáp:
          </p>
        </div>

        {/* 4 Talk Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {talkItems.map(item => {
            const isSelected = selectedTalkItem.name === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedTalkItem(item);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-rose-300'
                }`}
              >
                <span className="text-4xl mb-1">{item.icon}</span>
                <span className="font-extrabold text-sm capitalize text-slate-800">{item.name}</span>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-extrabold rounded-md text-xs mt-1">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-black text-base text-slate-800">
              Q: How much is the {selectedTalkItem.name}?
            </p>
            <p className="font-black text-base text-rose-700">
              A: It’s {selectedTalkItem.priceText}. ({selectedTalkItem.tag})
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                `How much is the ${selectedTalkItem.name}? It's ${selectedTalkItem.priceText}.`,
                speechRate
              )
            }
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu phản xạ 🔊</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: LISTEN AND NUMBER (TRACK 78) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                Trang 55 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 78</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              4. Listen and number (Nghe và đánh số thứ tự 1, 2, 3, 4)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lắng nghe từng đoạn thoại hỏi giá tiền và đánh số thứ tự phù hợp cho 4 bức tranh a, b, c, d.
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+5 ⭐)
            </button>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {track78Items.map(item => {
            const userChoice = userOrders[item.id];
            const isCorrect = userChoice === item.correctOrder;

            let cardStyle = 'border-slate-200 bg-white hover:border-amber-300';
            if (act4Submitted) {
              cardStyle = isCorrect
                ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-300'
                : 'border-rose-400 bg-rose-50/40';
            }

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center uppercase">
                      {item.id}
                    </span>
                    <button
                      onClick={() => speakWord(item.script, speechRate)}
                      className="p-1 text-slate-500 hover:text-amber-600 transition"
                      title="Nghe câu thoại"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center my-2">
                    <span className="text-5xl">{item.icon}</span>
                    <h5 className="font-extrabold text-sm text-slate-800 mt-2">{item.itemDesc}</h5>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold rounded-full text-xs mt-1 inline-block">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Number Selector (1, 2, 3, 4) */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block text-center mb-1.5">
                    Chọn số thứ tự:
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => handleSelectOrder(item.id, num)}
                        disabled={act4Submitted}
                        className={`py-1.5 rounded-xl font-black text-xs transition ${
                          userChoice === num
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-amber-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {act4Submitted && (
                    <div className="mt-2 text-center text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700">✓ Đúng (Thứ tự {item.correctOrder})</span>
                      ) : (
                        <span className="text-rose-600">✕ Đáp án đúng: {item.correctOrder}</span>
                      )}
                    </div>
                  )}
                </div>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                Trang 55 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-rose-600" />
              5. Look, complete and read (Quan sát mác giá và hoàn thành câu)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Quan sát giá tiền các món đồ trong 2 hình vẽ để điền từ thích hợp vào chỗ trống.
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition flex items-center gap-1.5 shadow-sm"
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
              <span className="font-extrabold text-sm text-rose-800">
                1. Mua áo phông (50.000đ) &amp; chân váy (60.000đ) 👕👗
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'Excuse me. How much is this T-shirt? It’s fifty thousand dong. And how much is that skirt? It’s sixty thousand dong.',
                    speechRate
                  )
                }
                className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: Excuse me. How much is this T-shirt?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_1_1}
                onChange={e => setAct5_1_1(e.target.value)}
                placeholder="fifty..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-rose-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>thousand dong.</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: And how much is that skirt?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It’s sixty</span>
              <input
                type="text"
                value={act5_1_2}
                onChange={e => setAct5_1_2(e.target.value)}
                placeholder="thousand dong..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-rose-500 outline-none text-xs font-bold w-32 bg-white"
              />
              <span>.</span>
            </div>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;fifty&quot; và &quot;thousand dong&quot;
              </p>
            )}
          </div>

          {/* Dialog 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-rose-800">
                2. Ba lô đi học mới (70.000đ) 🎒
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'Your school bag is so nice. Thank you. I like it very much. How much is it? It’s seventy thousand dong.',
                    speechRate
                  )
                }
                className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: Your school bag is so nice.</p>
            <p className="text-xs text-slate-700 font-medium">B: Thank you. I like it very much.</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={act5_2_1}
                onChange={e => setAct5_2_1(e.target.value)}
                placeholder="How much..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-rose-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>is it?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_2_2}
                onChange={e => setAct5_2_2(e.target.value)}
                placeholder="seventy..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-rose-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>thousand dong.</span>
            </div>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;How much&quot; và &quot;seventy&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S PLAY - "GUESS THE PRICE!" */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Trò Chơi Trang 55 SGK
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <span>Guess the price! 🏷️🎲</span>
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Thử tài nhà mua sắm thông thái: Đoán chính xác giá tiền của món hàng trong khoảng cho trước!
            </p>
          </div>

          <div className="px-4 py-2 bg-white/20 rounded-2xl text-center">
            <span className="text-xs font-bold block">Điểm đoán giá:</span>
            <span className="text-2xl font-black text-yellow-300">{gameScore} ⭐</span>
          </div>
        </div>

        {/* Current Good Box */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl p-3 bg-white/20 rounded-3xl">{currentGameGood.icon}</span>
            <div>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                Món hàng cần đoán giá:
              </span>
              <h4 className="text-2xl font-black text-white capitalize">
                {currentGameGood.nameEn} ({currentGameGood.nameVi})
              </h4>
              <p className="text-sm text-amber-100 font-bold mt-1">
                Khoảng giá gợi ý:{' '}
                <span className="underline decoration-yellow-400">
                  {currentGameGood.minPrice.toLocaleString('vi-VN')}đ -{' '}
                  {currentGameGood.maxPrice.toLocaleString('vi-VN')}đ
                </span>
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
            <input
              type="number"
              step={1000}
              value={guessInput}
              onChange={e => setGuessInput(e.target.value)}
              placeholder="Nhập giá dự đoán (đ)..."
              className="px-4 py-3 rounded-2xl bg-white text-slate-800 font-black text-sm outline-none w-full sm:w-56 shadow-inner"
            />
            <button
              onClick={handleGuessPrice}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-sm transition active:scale-95 shadow-md shrink-0"
            >
              Đoán ngay! 🎯
            </button>
          </div>
        </div>

        {/* Guess Feedback */}
        {guessFeedback && (
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center font-bold text-sm text-white animate-pulse">
            {guessFeedback}
          </div>
        )}
      </div>
    </div>
  );
};
