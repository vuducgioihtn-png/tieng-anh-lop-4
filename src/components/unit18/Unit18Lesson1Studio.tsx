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
  Music,
  MapPin,
  Store,
  ShoppingCart,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit18Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit18Lesson1Studio: React.FC<Unit18Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 72)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Lời chào & hỏi thăm lịch sự',
      speakerA: 'Ben',
      avatarA: '👦',
      textA: 'Excuse me!',
      ipaA: '/ɪkˈskjuːz miː/',
      readingA: 'Ích-x-kiu-z mi!',
      meaningA: 'Xin lỗi, làm ơn cho cháu hỏi với ạ!',
      speakerB: 'Shop Staff',
      avatarB: '👩‍💼',
      textB: 'Yes?',
      ipaB: '/jɛs/',
      readingB: 'Dét-s?',
      meaningB: 'Có chuyện gì thế cháu? / Bác có thể giúp gì cho cháu?',
      context: 'Bạn Ben muốn tìm một cửa hàng và lịch sự bắt đầu bằng "Excuse me!" với nhân viên trung tâm mua sắm.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Hỏi và chỉ vị trí tiệm bánh',
      speakerA: 'Ben',
      avatarA: '👦',
      textA: 'Where’s the bakery, please?',
      ipaA: '/weəz ðə ˈbeɪkəri pliːz/',
      readingA: 'Ue-ơ-z đờ bây-kơ-ri, p-li-z?',
      meaningA: 'Làm ơn cho cháu hỏi tiệm bánh mì ở đâu ạ?',
      speakerB: 'Shop Staff',
      avatarB: '👩‍💼',
      textB: 'It’s near the gift shop.',
      ipaB: '/ɪts nɪə ðə ɡɪft ʃɒp/',
      readingB: 'Ít-s nia đờ gíp-ft shóp.',
      meaningB: 'Nó ở ngay gần cửa hàng quà tặng lưu niệm đó cháu.',
      context: 'Cô nhân viên tươi cười chỉ tay về phía cửa hàng bánh mì cạnh tiệm quà tặng.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 73)
  // =========================================================================
  const locationPrepositions = [
    {
      id: 'near',
      word: 'near',
      ipa: '/nɪə/',
      reading: 'nia',
      meaningVi: 'ở gần',
      icon: '📍',
      examplePlace: 'the bakery',
      questionText: 'Where’s the bookshop?',
      answerText: 'It’s near the bakery.',
      meaningFull: 'Hiệu sách ở đâu? - Nó ở gần tiệm bánh mì.',
      badgeColor: 'from-blue-500 to-indigo-600',
      description: 'Hai cửa hàng nằm sát nhau hoặc cách nhau rất gần trên cùng một dãy.'
    },
    {
      id: 'opposite',
      word: 'opposite',
      ipa: '/ˈɒpəzɪt/',
      reading: 'óp-pơ-zịt',
      meaningVi: 'đối diện',
      icon: '↔️',
      examplePlace: 'the sports shop',
      questionText: 'Where’s the bookshop?',
      answerText: 'It’s opposite the sports shop.',
      meaningFull: 'Hiệu sách ở đâu? - Nó đối diện với cửa hàng đồ thể thao.',
      badgeColor: 'from-amber-500 to-orange-600',
      description: 'Hai cửa hàng nhìn thẳng mặt nhau qua lối đi ở giữa hành lang.'
    },
    {
      id: 'behind',
      word: 'behind',
      ipa: '/bɪˈhaɪnd/',
      reading: 'bi-hain-đ',
      meaningVi: 'ở phía sau / đằng sau',
      icon: '🔙',
      examplePlace: 'the bakery',
      questionText: 'Where’s the bookshop?',
      answerText: 'It’s behind the bakery.',
      meaningFull: 'Hiệu sách ở đâu? - Nó ở phía sau tiệm bánh mì.',
      badgeColor: 'from-emerald-500 to-teal-600',
      description: 'Cửa hàng nằm ở dãy nhà hoặc gian phòng phía sau.'
    },
    {
      id: 'between',
      word: 'between',
      ipa: '/bɪˈtwiːn/',
      reading: 'bi-tuyn',
      meaningVi: 'ở giữa (hai nơi)',
      icon: '🥪',
      examplePlace: 'the gift shop and the bakery',
      questionText: 'Where’s the bookshop?',
      answerText: 'It’s between the gift shop and the bakery.',
      meaningFull: 'Hiệu sách ở đâu? - Nó nằm ở giữa tiệm quà tặng và tiệm bánh.',
      badgeColor: 'from-purple-500 to-pink-600',
      description: 'Cửa hàng kẹp ở giữa hai cửa hàng khác: between A and B.'
    }
  ];

  const [selectedPrep, setSelectedPrep] = useState(locationPrepositions[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const mallShops = [
    { name: 'bookshop', icon: '📚', desc: 'Hiệu sách', pos: 'near the bakery' },
    { name: 'bakery', icon: '🥐', desc: 'Tiệm bánh mì', pos: 'between the bookshop and the shoe shop' },
    { name: 'shoe shop', icon: '👟', desc: 'Tiệm bán giày', pos: 'opposite the gift shop' },
    { name: 'gift shop', icon: '🎁', desc: 'Tiệm quà lưu niệm', pos: 'near the bookshop' }
  ];
  const [activeTalkShop, setActiveTalkShop] = useState(mallShops[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 74)
  // =========================================================================
  interface Track74Item {
    id: number;
    title: string;
    audioScript: string;
    options: {
      key: 'a' | 'b';
      label: string;
      desc: string;
      icon: string;
    }[];
    correctKey: 'a' | 'b';
    explanation: string;
  }

  const track74Items: Track74Item[] = [
    {
      id: 1,
      title: 'Câu 1: Vị trí hiệu sách (Bookshop) và tiệm quà (Gift shop)',
      audioScript: 'Where’s the bookshop? - It’s opposite the gift shop.',
      options: [
        {
          key: 'a',
          label: 'Đối diện (opposite)',
          desc: 'Gift shop đối diện Bookshop qua hành lang',
          icon: '↔️'
        },
        {
          key: 'b',
          label: 'Ở gần / Kề cạnh (near)',
          desc: 'Gift shop và Bookshop nằm cạnh nhau cùng một bên',
          icon: '📍'
        }
      ],
      correctKey: 'a',
      explanation: 'Trong băng nghe rõ: "It’s opposite the gift shop" (đối diện) -> Chọn đáp án a.'
    },
    {
      id: 2,
      title: 'Câu 2: Vị trí tiệm bánh mì (Bakery)',
      audioScript: 'Where’s the bakery? - It’s between the sports shop and the shoe shop.',
      options: [
        {
          key: 'a',
          label: 'Đối diện cửa hàng thể thao',
          desc: 'Bakery đối diện Sports shop',
          icon: '↔️'
        },
        {
          key: 'b',
          label: 'Ở giữa hai cửa hàng',
          desc: 'Bakery nằm ở giữa Sports shop và Shoe shop',
          icon: '🥪'
        }
      ],
      correctKey: 'b',
      explanation: 'Trong băng nghe rõ: "It’s between the sports shop and the shoe shop" -> Chọn đáp án b.'
    }
  ];

  const [userTrack74, setUserTrack74] = useState<Record<number, 'a' | 'b' | null>>({
    1: null,
    2: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectTrack74 = (qId: number, key: 'a' | 'b') => {
    sound.playClick();
    setUserTrack74(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userTrack74).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    track74Items.forEach(item => {
      if (userTrack74[item.id] === item.correctKey) {
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
    setUserTrack74({ 1: null, 2: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [act5_1, setAct5_1] = useState('');
  const [act5_2, setAct5_2] = useState('');
  const [act5_3_1, setAct5_3_1] = useState('');
  const [act5_3_2, setAct5_3_2] = useState('');
  const [act5_4_1, setAct5_4_1] = useState('');
  const [act5_4_2, setAct5_4_2] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let count = 0;

    if (act5_1.trim().toLowerCase() === 'near' || act5_1.trim().toLowerCase() === 'behind') count++;
    if (act5_2.trim().toLowerCase() === 'between') count++;
    if (act5_3_1.trim().toLowerCase() === 'bookshop' && act5_3_2.trim().toLowerCase() === 'opposite') count++;
    if (
      (act5_4_1.trim().toLowerCase() === "where's" || act5_4_1.trim().toLowerCase() === 'where is') &&
      (act5_4_2.trim().toLowerCase() === 'near' || act5_4_2.trim().toLowerCase() === 'behind')
    )
      count++;

    if (count >= 3) {
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
    setAct5_1('');
    setAct5_2('');
    setAct5_3_1('');
    setAct5_3_2('');
    setAct5_4_1('');
    setAct5_4_2('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 75)
  // =========================================================================
  const songVerses = [
    {
      title: 'Khổ 1: Where’s the bookshop? 📚',
      lines: [
        { en: 'Excuse me, where’s the bookshop?', vi: 'Xin lỗi, làm ơn cho tôi hỏi hiệu sách ở đâu?' },
        { en: 'It’s over there. It’s over there.', vi: 'Nó ở đằng kia. Nó ở ngay đằng kia kìa.' },
        { en: 'It’s near the bakery.', vi: 'Nó nằm ở gần tiệm bánh mì nhé.' }
      ],
      audioText: "Excuse me, where's the bookshop? It's over there. It's over there. It's near the bakery."
    },
    {
      title: 'Khổ 2: Where’s the shoe shop? 👟',
      lines: [
        { en: 'Excuse me, where’s the shoe shop?', vi: 'Xin lỗi, làm ơn cho tôi hỏi tiệm bán giày ở đâu?' },
        { en: 'It’s over there. It’s over there.', vi: 'Nó ở đằng kia. Nó ở ngay đằng kia kìa.' },
        { en: 'It’s opposite the gift shop.', vi: 'Nó ở đối diện cửa hàng quà tặng lưu niệm nhé.' }
      ],
      audioText: "Excuse me, where's the shoe shop? It's over there. It's over there. It's opposite the gift shop."
    }
  ];

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
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>HĐ {sec}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onSwitchToLesson2 && (
            <button
              onClick={onSwitchToLesson2}
              className="px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold text-xs transition flex items-center gap-1 border border-pink-200"
            >
              <span>Tiết 2: Hỏi Giá Tiền (How much is...?) ➡️</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-600 text-white">
                Trang 52 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 72</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-pink-600" />
              1. Look, listen and repeat (Hỏi vị trí cửa hàng tại TTTM)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Bạn nhỏ hỏi nhân viên lịch sự: <em>Where's the bakery, please? - It's near the gift shop.</em>
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                "Excuse me! Yes? Where's the bakery, please? It's near the gift shop.",
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-pink-50/40 via-rose-50/20 to-purple-50/30 rounded-3xl p-5 md:p-6 border-2 border-pink-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-pink-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-pink-800">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-pink-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-pink-50 text-pink-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-pink-900 font-medium bg-pink-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarB}</span>
                    <span className="font-bold text-xs text-purple-700">{step.speakerB}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textB, speechRate)}
                    className="p-1 rounded-lg hover:bg-purple-50 text-purple-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textB}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaB}</p>
                <p className="text-xs text-purple-900 font-medium bg-purple-50/60 px-2 py-0.5 rounded-md inline-block">
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-600 text-white">
              Trang 52 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 73</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-pink-600" />
            2. Listen, point and say (4 Giới từ vị trí cửa hàng)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Cấu trúc hỏi: <strong>Where’s the ______?</strong> ➡️ Trả lời:{' '}
            <strong>It’s near / opposite / behind / between ______.</strong>
          </p>
        </div>

        {/* 4 Preposition Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locationPrepositions.map(prep => {
            const isSelected = selectedPrep.id === prep.id;
            return (
              <button
                key={prep.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPrep(prep);
                  speakWord(prep.answerText, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/20'
                }`}
              >
                <span className="text-5xl my-2">{prep.icon}</span>
                <span className="font-black text-lg text-slate-800">{prep.word}</span>
                <span className="text-xs font-mono text-slate-400 mt-0.5">{prep.ipa}</span>
                <span className="text-xs font-bold text-pink-800 bg-pink-100/70 px-2 py-0.5 rounded-md mt-1">
                  {prep.reading}
                </span>
                <span className="text-xs text-slate-500 mt-1">{prep.meaningVi}</span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  {prep.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Box */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 rounded-3xl p-6 border-2 border-pink-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl">{selectedPrep.icon}</span>
              <span className="text-xs font-black uppercase text-pink-800 tracking-wider">
                Thực hành mẫu câu với giới từ: &quot;{selectedPrep.word}&quot;
              </span>
            </div>
            <p className="font-extrabold text-base md:text-lg text-slate-800">
              Q: {selectedPrep.questionText}
            </p>
            <p className="font-extrabold text-lg md:text-xl text-pink-700">
              A: {selectedPrep.answerText}
            </p>
            <p className="text-xs text-slate-600 italic">💡 {selectedPrep.meaningFull}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`${selectedPrep.questionText} ${selectedPrep.answerText}`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu mẫu 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-pink-800 border border-pink-300 font-bold text-xs hover:bg-pink-100 transition active:scale-95"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
              Trang 52 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Sơ Đồ Gian Hàng TTTM</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Store className="w-6 h-6 text-purple-600" />
            3. Let’s talk (Hỏi và đáp về vị trí các gian hàng)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn cửa hàng trên sơ đồ để hỏi và nghe câu chỉ đường chính xác:
          </p>
        </div>

        {/* 4 Mall Shops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {mallShops.map(shop => {
            const isShopSelected = activeTalkShop.name === shop.name;
            return (
              <button
                key={shop.name}
                onClick={() => {
                  sound.playClick();
                  setActiveTalkShop(shop);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isShopSelected
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <span className="text-4xl mb-1">{shop.icon}</span>
                <span className="font-extrabold text-sm text-slate-800 capitalize">{shop.name}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 text-center">{shop.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Speech Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-purple-700">
              Vị trí gian hàng: {activeTalkShop.icon} {activeTalkShop.name}
            </span>
            <p className="font-black text-base text-slate-800">
              Q: Where’s the {activeTalkShop.name}?
            </p>
            <p className="font-black text-base text-purple-700">
              A: It’s {activeTalkShop.pos}.
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                `Where's the ${activeTalkShop.name}? It's ${activeTalkShop.pos}.`,
                speechRate
              )
            }
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu phản xạ 🔊</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: LISTEN AND TICK (TRACK 74) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-600 text-white">
                Trang 53 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 74</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-pink-600" />
              4. Listen and tick (Lắng nghe và đánh dấu tranh đúng)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Nghe câu thoại trong băng và chọn vị trí cửa hàng chính xác (Tranh a hay Tranh b).
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+4 ⭐)
            </button>
          </div>
        </div>

        {/* 2 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {track74Items.map(item => {
            const userChoice = userTrack74[item.id];
            const isCorrect = userChoice === item.correctKey;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm md:text-base text-slate-800">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => speakWord(item.audioScript, speechRate)}
                    className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu {item.id} 🔊</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {item.options.map(opt => {
                    const isSelected = userChoice === opt.key;
                    let optStyle = 'border-slate-200 bg-white hover:border-pink-300';

                    if (act4Submitted) {
                      if (opt.key === item.correctKey) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-pink-600 bg-pink-50 text-pink-950 ring-2 ring-pink-400';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectTrack74(item.id, opt.key)}
                        disabled={act4Submitted}
                        className={`p-3.5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-1.5 ${optStyle}`}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-black text-xs uppercase text-slate-500">
                          Tranh {opt.key.toUpperCase()}
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
                      <span className="text-emerald-700">✓ Hoan hô! Tranh {item.correctKey.toUpperCase()} là đáp án đúng!</span>
                    ) : (
                      <span className="text-rose-600">✕ {item.explanation}</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-600 text-white">
                Trang 53 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ Hoàn Thành</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-pink-600" />
              5. Look, complete and read (Quan sát hình và điền từ thích hợp)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Quan sát 4 hình ảnh bố trí gian hàng để hoàn thành các câu hỏi đáp vị trí.
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Nộp bài (+5 ⭐)
            </button>
          </div>
        </div>

        {/* 4 Exercises */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">
                1. Hiệu sách bên cạnh tiệm bánh (Bakery &amp; Bookshop) 🥐📚
              </span>
              <button
                onClick={() => speakWord("Where's the bookshop? It's near the bakery.", speechRate)}
                className="p-1 text-pink-600 hover:bg-pink-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: Where’s the bookshop?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_1}
                onChange={e => setAct5_1(e.target.value)}
                placeholder="near / behind..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>the bakery.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;near&quot; (hoặc &quot;behind&quot;)
              </p>
            )}
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">
                2. Gian thực phẩm ở giữa (Food shop) 🥪
              </span>
              <button
                onClick={() =>
                  speakWord(
                    "Where's the food shop? It's between the sports shop and the bookshop.",
                    speechRate
                  )
                }
                className="p-1 text-pink-600 hover:bg-pink-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: Where’s the food shop?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_2}
                onChange={e => setAct5_2(e.target.value)}
                placeholder="between..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>the sports shop and the bookshop.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;between&quot;
              </p>
            )}
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">
                3. Hiệu sách đối diện cửa hàng thể thao ↔️
              </span>
              <button
                onClick={() =>
                  speakWord("Where's the bookshop? It's opposite the sports shop.", speechRate)
                }
                className="p-1 text-pink-600 hover:bg-pink-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: Where’s the</span>
              <input
                type="text"
                value={act5_3_1}
                onChange={e => setAct5_3_1(e.target.value)}
                placeholder="bookshop..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_3_2}
                onChange={e => setAct5_3_2(e.target.value)}
                placeholder="opposite..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>the sports shop.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;bookshop&quot; và &quot;opposite&quot;
              </p>
            )}
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">
                4. Tiệm bánh mì ở gần hiệu sách 🥐
              </span>
              <button
                onClick={() => speakWord("Where's the bakery? It's near the bookshop.", speechRate)}
                className="p-1 text-pink-600 hover:bg-pink-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={act5_4_1}
                onChange={e => setAct5_4_1(e.target.value)}
                placeholder="Where's..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>the bakery?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={act5_4_2}
                onChange={e => setAct5_4_2(e.target.value)}
                placeholder="near..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-pink-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>the bookshop.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;Where's&quot; và &quot;near&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S SING (TRACK 75) */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Bài Hát Vui Nhộn · Track 75
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <Music className="w-7 h-7" />
              Where’s the bookshop? 🎶
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Cùng hát vang giai điệu vui tươi hỏi vị trí hiệu sách và tiệm giày nào!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              speakWord(
                "Excuse me, where's the bookshop? It's over there. It's over there. It's near the bakery. Excuse me, where's the shoe shop? It's over there. It's over there. It's opposite the gift shop.",
                speechRate
              );
            }}
            className="px-6 py-3 rounded-2xl bg-white text-pink-800 font-black text-sm hover:bg-pink-50 shadow-md transition active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Hát Toàn Bài 🎤</span>
          </button>
        </div>

        {/* 2 Verses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songVerses.map((st, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <h4 className="font-black text-base">{st.title}</h4>
                <button
                  onClick={() => speakWord(st.audioText, speechRate)}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe khổ {idx + 1}
                </button>
              </div>

              <div className="space-y-1.5 text-sm leading-relaxed">
                {st.lines.map((ln, lIdx) => (
                  <div key={lIdx}>
                    <p className="font-bold text-white text-base">{ln.en}</p>
                    <p className="text-xs text-pink-100/80 italic">{ln.vi}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
