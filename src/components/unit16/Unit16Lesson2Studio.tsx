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
  ShoppingBag,
  Store,
  Waves,
  UtensilsCrossed,
  MapPin,
  Smile,
  Frown
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit16Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit16Lesson2Studio: React.FC<Unit16Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 56)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Thời tiết hôm nay thế nào?',
      speakerA: 'Mum',
      avatarA: '👩‍🍳',
      textA: 'What’s the weather like today?',
      ipaA: '/wɒts ðə ˈwɛðə laɪk təˈdeɪ/',
      readingA: 'Oát-s đờ ué-đờ laik tu-đây?',
      meaningA: 'Thời tiết hôm nay như thế nào hả con?',
      speakerB: 'Boy',
      avatarB: '👦',
      textB: 'It’s sunny, Mum.',
      ipaB: '/ɪts ˈsʌni, mʌm/',
      readingB: 'Ít-s săn-ni, Măm.',
      meaningB: 'Hôm nay trời nắng đẹp mẹ ạ.',
      context: 'Mẹ đang nấu ăn trong bếp, ngó ra cửa sổ hỏi bạn nhỏ.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Rủ đi công viên nước!',
      speakerA: 'Mum',
      avatarA: '👩‍🍳',
      textA: 'Lovely! Do you want to go to the water park with me?',
      ipaA: '/ˈlʌvli! duː juː wɒnt tuː ɡəʊ tuː ðə ˈwɔːtə pɑːk wɪð miː/',
      readingA: 'Lớp-v-li! Đu ju uon-t tu gâu tu đờ oát-tờ pác uít-đ mi?',
      meaningA: 'Tuyệt vời quá! Con có muốn đi công viên nước cùng mẹ không?',
      speakerB: 'Boy',
      avatarB: '👦',
      textB: 'Great! Let’s go.',
      ipaB: '/ɡreɪt! lɛts ɡəʊ/',
      readingB: 'Gờ-rây-t! Lét-s gâu.',
      meaningB: 'Tuyệt quá ạ! Chúng ta đi thôi mẹ ơi!',
      context: 'Bạn nhỏ nhảy cẫng lên hào hứng đồng ý đi chơi công viên nước.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 57)
  // =========================================================================
  const invitationCards = [
    {
      id: 'food_stall',
      place: 'food stall',
      ipa: '/fuːd stɔːl/',
      reading: 'phu-đ sto-l',
      meaningVi: 'quầy bán đồ ăn đường phố',
      responseType: 'yes' as const,
      responseEn: 'Great! Let’s go.',
      responseVi: 'Tuyệt quá! Chúng mình đi thôi.',
      icon: '🍢',
      imageDesc: 'Quầy bán đồ ăn nướng thơm phức hấp dẫn'
    },
    {
      id: 'bookshop',
      place: 'bookshop',
      ipa: '/ˈbʊkʃɒp/',
      reading: 'búc-shóp',
      meaningVi: 'hiệu sách / nhà sách',
      responseType: 'no' as const,
      responseEn: 'Sorry, I can’t.',
      responseVi: 'Tiếc quá, mình không thể đi được rồi.',
      icon: '📚',
      imageDesc: 'Kệ sách nhiều tầng trưng bày sách truyện tranh'
    },
    {
      id: 'supermarket',
      place: 'supermarket',
      ipa: '/ˈsuːpəmɑːkɪt/',
      reading: 'su-pơ-ma-kịt',
      meaningVi: 'siêu thị',
      responseType: 'yes' as const,
      responseEn: 'Great! Let’s go.',
      responseVi: 'Tuyệt quá! Chúng mình đi thôi.',
      icon: '🛒',
      imageDesc: 'Gian hàng siêu thị đầy ắp rau củ, đồ hộp và xe đẩy'
    },
    {
      id: 'bakery',
      place: 'bakery',
      ipa: '/ˈbeɪkəri/',
      reading: 'bây-kơ-ri',
      meaningVi: 'tiệm bánh mì / tiệm bánh ngọt',
      responseType: 'no' as const,
      responseEn: 'Sorry, I can’t.',
      responseVi: 'Tiếc quá, mình không đi được rồi.',
      icon: '🥐',
      imageDesc: 'Tủ kính tiệm bánh mì thơm lừng vàng ươm'
    }
  ];

  const [selectedPlace, setSelectedPlace] = useState(invitationCards[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const mapPlaces = [
    { name: 'water park', vi: 'công viên nước', icon: '🌊', color: 'from-blue-500 to-cyan-500' },
    { name: 'supermarket', vi: 'siêu thị', icon: '🛒', color: 'from-amber-500 to-orange-500' },
    { name: 'bakery', vi: 'tiệm bánh mì', icon: '🥐', color: 'from-rose-500 to-pink-500' },
    { name: 'bookshop', vi: 'hiệu sách', icon: '📚', color: 'from-indigo-500 to-purple-500' },
    { name: 'food stall', vi: 'quầy ăn vặt', icon: '🍢', color: 'from-teal-500 to-emerald-500' }
  ];
  const [selectedMapPlace, setSelectedMapPlace] = useState(mapPlaces[0]);
  const [talkChoice, setTalkChoice] = useState<'yes' | 'no'>('yes');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND MATCH (TRACK 58)
  // =========================================================================
  interface MatchItem {
    id: number;
    character: string;
    avatar: string;
    desc: string;
    options: {
      key: 'a' | 'b';
      label: string;
      icon: string;
    }[];
    correctKey: 'a' | 'b';
    audioScript: string;
  }

  const matchItems: MatchItem[] = [
    {
      id: 1,
      character: 'Ben',
      avatar: '🧑‍🦰',
      desc: 'Cậu bạn tóc xoăn đeo kính',
      options: [
        { key: 'a', label: 'Xe bán đồ ăn (food stall)', icon: '🚚' },
        { key: 'b', label: 'Tiệm bánh mì (bakery)', icon: '🥐' }
      ],
      correctKey: 'a',
      audioScript: 'Do you want to go to the food stall with me, Ben? - Great! Let’s go.'
    },
    {
      id: 2,
      character: 'Lucy',
      avatar: '👱‍♀️',
      desc: 'Cô bạn năng động dễ thương',
      options: [
        { key: 'a', label: 'Hiệu sách (bookshop)', icon: '📚' },
        { key: 'b', label: 'Công viên nước (water park)', icon: '🌊' }
      ],
      correctKey: 'b',
      audioScript: 'Do you want to go to the water park with me, Lucy? - Great! Let’s go.'
    }
  ];

  const [userMatches, setUserMatches] = useState<Record<number, 'a' | 'b' | null>>({
    1: null,
    2: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectMatch = (charId: number, key: 'a' | 'b') => {
    sound.playClick();
    setUserMatches(prev => ({ ...prev, [charId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userMatches).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    matchItems.forEach(item => {
      if (userMatches[item.id] === item.correctKey) {
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
    setUserMatches({ 1: null, 2: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [dia1_input1, setDia1_input1] = useState('');
  const [dia1_input2, setDia1_input2] = useState('');
  const [dia2_input1, setDia2_input1] = useState('');
  const [dia2_input2, setDia2_input2] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let allRight = true;

    if (dia1_input1.trim().toLowerCase() !== 'sunny') allRight = false;
    if (dia1_input2.trim().toLowerCase() !== 'great') allRight = false;
    if (!dia2_input1.trim().toLowerCase().includes('water park')) allRight = false;
    if (!dia2_input2.trim().toLowerCase().includes("i can't") && !dia2_input2.trim().toLowerCase().includes("i cannot")) allRight = false;

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
    setDia1_input1('');
    setDia1_input2('');
    setDia2_input1('');
    setDia2_input2('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S PLAY - "SLAP THE BOARD AND SAY"
  // =========================================================================
  const slapTargets = [
    { id: 'bookshop', word: 'bookshop', icon: '📚', sentence: 'I want to go to the bookshop!' },
    { id: 'water_park', word: 'water park', icon: '🌊', sentence: 'I want to go to the water park!' },
    { id: 'supermarket', word: 'supermarket', icon: '🛒', sentence: 'I want to go to the supermarket!' },
    { id: 'bakery', word: 'bakery', icon: '🥐', sentence: 'I want to go to the bakery!' },
    { id: 'food_stall', word: 'food stall', icon: '🍢', sentence: 'I want to go to the food stall!' }
  ];

  const [currentSlapTarget, setCurrentSlapTarget] = useState(slapTargets[0]);
  const [slapScore, setSlapScore] = useState(0);
  const [slapFeedback, setSlapFeedback] = useState<string | null>(null);

  const handleSlap = (target: typeof slapTargets[0]) => {
    sound.playClick();
    if (target.id === currentSlapTarget.id) {
      sound.playSuccess();
      setSlapScore(prev => prev + 1);
      setSlapFeedback(`Đập bảng chuẩn xác! 👏 "${target.sentence}" (+1 ⭐)`);
      onAddStar(1);
      // Pick next random target
      const remaining = slapTargets.filter(t => t.id !== target.id);
      const nextOne = remaining[Math.floor(Math.random() * remaining.length)];
      setTimeout(() => {
        setCurrentSlapTarget(nextOne);
        setSlapFeedback(null);
      }, 1000);
    } else {
      sound.playWarning();
      setSlapFeedback(`Chưa đúng rồi! Thầy giáo đang yêu cầu: "${currentSlapTarget.word}".`);
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
                  ? 'bg-orange-500 text-white shadow-xs'
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
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs transition flex items-center gap-1 border border-amber-200"
            >
              <span>⬅️ Tiết 1: Thời Tiết Quá Khứ</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-500 text-white">
                Trang 42 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 56</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              1. Look, listen and repeat (Hỏi thời tiết hôm nay &amp; Rủ đi chơi)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Hôm nay trời nắng đẹp, mẹ rủ bạn nhỏ cùng đi công viên nước!
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                'What’s the weather like today? It’s sunny, Mum. Lovely! Do you want to go to the water park with me? Great! Let’s go.',
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-orange-50/40 via-amber-50/20 to-yellow-50/30 rounded-3xl p-5 md:p-6 border-2 border-orange-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-orange-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-orange-800">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-orange-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-orange-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-orange-50 text-orange-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-orange-900 font-medium bg-orange-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-orange-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarB}</span>
                    <span className="font-bold text-xs text-blue-700">{step.speakerB}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textB, speechRate)}
                    className="p-1 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textB}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaB}</p>
                <p className="text-xs text-blue-900 font-medium bg-blue-50/60 px-2 py-0.5 rounded-md inline-block">
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
              Trang 42 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 57</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Store className="w-6 h-6 text-blue-600" />
            2. Listen, point and say (Luyện rủ bạn đi các địa điểm)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Mẫu câu rủ bạn: <strong>Do you want to go to the ______?</strong> ➡️ Đồng ý: <strong>Great! Let’s go.</strong> / Từ chối: <strong>Sorry, I can’t.</strong>
          </p>
        </div>

        {/* 4 Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {invitationCards.map(c => {
            const isSelected = selectedPlace.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPlace(c);
                  speakWord(`Do you want to go to the ${c.place}? ${c.responseEn}`, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left relative ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      {c.icon}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                        c.responseType === 'yes'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {c.responseType === 'yes' ? '✓ Đồng ý' : '✕ Từ chối'}
                    </span>
                  </div>

                  <h4 className="font-black text-base text-slate-800 mt-3">{c.place}</h4>
                  <p className="text-xs font-mono text-slate-400">{c.ipa}</p>
                  <p className="text-xs text-slate-500 mt-0.5 italic">{c.meaningVi}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <p className="text-xs font-bold text-slate-700">
                    🗣️ Trả lời: <span className="text-orange-600">{c.responseEn}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic">{c.responseVi}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-black uppercase text-orange-800 tracking-wider">
              Thực hành lời mời tới: &quot;{selectedPlace.place}&quot; {selectedPlace.icon}
            </span>
            <p className="font-black text-lg text-slate-800">
              Q: Do you want to go to the {selectedPlace.place}?
            </p>
            <p className="font-black text-lg text-orange-600">
              A: {selectedPlace.responseEn}
            </p>
            <p className="text-xs text-slate-600 italic">
              💡 {selectedPlace.meaningVi} · {selectedPlace.responseVi}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`Do you want to go to the ${selectedPlace.place}? ${selectedPlace.responseEn}`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
              Trang 42 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Bản Đồ Thị Trấn</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-teal-600" />
            3. Let’s talk (Rủ bạn dạo chơi phố xá)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Chọn 1 địa điểm trên bản đồ và chọn đồng ý (Great!) hoặc từ chối (Sorry!) để luyện nói.
          </p>
        </div>

        {/* 5 Places Buttons */}
        <div className="flex flex-wrap gap-2.5">
          {mapPlaces.map(p => {
            const isPActive = selectedMapPlace.name === p.name;
            return (
              <button
                key={p.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedMapPlace(p);
                }}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all ${
                  isPActive
                    ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{p.icon}</span>
                <span className="capitalize">{p.name}</span>
                <span className="text-[11px] opacity-80">({p.vi})</span>
              </button>
            );
          })}
        </div>

        {/* Response Option Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-500 uppercase">Cách trả lời:</span>
          <button
            onClick={() => {
              sound.playClick();
              setTalkChoice('yes');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              talkChoice === 'yes'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Smile className="w-4 h-4" /> Đồng ý (Great! Let’s go.)
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setTalkChoice('no');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              talkChoice === 'no'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Frown className="w-4 h-4" /> Từ chối (Sorry, I can’t.)
          </button>
        </div>

        {/* Dialog Stage */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-black text-base text-slate-800">
              Q: Do you want to go to the {selectedMapPlace.name}?
            </p>
            <p className={`font-black text-base ${talkChoice === 'yes' ? 'text-emerald-700' : 'text-rose-600'}`}>
              A: {talkChoice === 'yes' ? 'Great! Let’s go.' : 'Sorry, I can’t.'}
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                `Do you want to go to the ${selectedMapPlace.name}? ${
                  talkChoice === 'yes' ? 'Great! Let’s go.' : 'Sorry, I can’t.'
                }`,
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
      {/* ACTIVITY 4: LISTEN AND MATCH (TRACK 58) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 43 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 58</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              4. Listen and match (Nghe và nối bạn với địa điểm)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lắng nghe xem Ben và Lucy được rủ đi đâu và chọn đáp án tranh tương ứng nhé!
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

        {/* 2 Match Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchItems.map(item => {
            const userChoice = userMatches[item.id];
            const isCorrect = userChoice === item.correctKey;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-white rounded-2xl shadow-2xs border border-slate-200">
                      {item.avatar}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-800">
                        {item.id}. {item.character}
                      </h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => speakWord(item.audioScript, speechRate)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu {item.id} 🔊</span>
                  </button>
                </div>

                {/* 2 Choices */}
                <div className="grid grid-cols-2 gap-3 pt-2">
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
                        onClick={() => handleSelectMatch(item.id, opt.key)}
                        disabled={act4Submitted}
                        className={`p-3.5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-1.5 ${optStyle}`}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-black text-xs uppercase text-slate-500">
                          Hình {opt.key.toUpperCase()}
                        </span>
                        <span className="font-bold text-xs text-slate-800 leading-snug">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {act4Submitted && (
                  <p className="text-xs font-bold text-center pt-1">
                    {isCorrect ? (
                      <span className="text-emerald-700">✓ Chính xác! Hình {item.correctKey.toUpperCase()}</span>
                    ) : (
                      <span className="text-rose-600">✕ Đáp án đúng: Hình {item.correctKey.toUpperCase()}</span>
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
                Trang 43 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Hoàn Thành Đoạn Thoại</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              5. Look, complete and read (Quan sát tranh và hoàn thành câu)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Điền các từ thích hợp để hoàn thiện 2 cuộc đối thoại dưới đây.
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
                1. Rủ bạn đi hiệu sách (Bookshop) 📚
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'What’s the weather like today? It’s sunny. Lovely! Do you want to go to the bookshop? Great! Let’s go.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: What’s the weather like today?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It’s</span>
              <input
                type="text"
                value={dia1_input1}
                onChange={e => setDia1_input1(e.target.value)}
                placeholder="sunny..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>.</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              A: Lovely! Do you want to go to the bookshop?
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B:</span>
              <input
                type="text"
                value={dia1_input2}
                onChange={e => setDia1_input2(e.target.value)}
                placeholder="Great..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>! Let’s go.</span>
            </div>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;sunny&quot; và &quot;Great&quot;
              </p>
            )}
          </div>

          {/* Dialog 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-purple-800">
                2. Rủ bạn đi công viên nước (Water park) 🌊
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'Look! It’s sunny today. Yes, it is. Do you want to go to the water park with me? Sorry, I can’t. I’m doing my homework.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">A: Look! It’s sunny today.</p>
            <p className="text-xs text-slate-700 font-medium">B: Yes, it is.</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: Do you want to go to the</span>
              <input
                type="text"
                value={dia2_input1}
                onChange={e => setDia2_input1(e.target.value)}
                placeholder="water park..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>with me?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: Sorry,</span>
              <input
                type="text"
                value={dia2_input2}
                onChange={e => setDia2_input2(e.target.value)}
                placeholder="I can't..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>. I’m doing my homework.</span>
            </div>

            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;water park&quot; và &quot;I can’t&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S PLAY - "SLAP THE BOARD AND SAY" */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Trò Chơi Trang 43 SGK
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <span>Slap the board and say! ✋</span>
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Thầy giáo gọi tên địa điểm nào, bé hãy nhanh tay bấm &quot;Đập Bảng&quot; vào đúng ô tranh đó nhé!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/20 rounded-2xl text-center">
              <span className="text-xs font-bold block">Điểm số:</span>
              <span className="text-2xl font-black text-yellow-300">{slapScore} ⭐</span>
            </div>
          </div>
        </div>

        {/* Current Call from Teacher */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-4xl p-2 bg-white/20 rounded-2xl">👨‍🏫</span>
            <div>
              <span className="text-xs font-bold text-teal-200 uppercase tracking-wider">
                Thầy giáo đang gọi:
              </span>
              <h4 className="text-2xl md:text-3xl font-black tracking-wide text-yellow-300">
                &ldquo;{currentSlapTarget.word}&rdquo;
              </h4>
            </div>
          </div>

          <button
            onClick={() => speakWord(currentSlapTarget.word, speechRate)}
            className="px-4 py-2 rounded-xl bg-white text-teal-800 font-bold text-xs flex items-center gap-2 hover:bg-teal-50 transition"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe lại từ thầy gọi 🔊</span>
          </button>
        </div>

        {slapFeedback && (
          <p className="text-sm font-bold text-center bg-white/20 py-2 rounded-xl animate-bounce">
            {slapFeedback}
          </p>
        )}

        {/* Slap Target Grid (Blackboard) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {slapTargets.map(target => (
            <button
              key={target.id}
              onClick={() => handleSlap(target)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-3xl border-2 border-white/30 hover:border-yellow-300 transition-all active:scale-95 flex flex-col items-center text-center group"
            >
              <span className="text-4xl mb-2 group-hover:scale-110 transition">{target.icon}</span>
              <span className="font-extrabold text-sm capitalize">{target.word}</span>
              <span className="mt-2 text-[10px] font-black uppercase px-2 py-0.5 bg-yellow-400 text-slate-900 rounded-full opacity-90 group-hover:opacity-100">
                Đập bảng! ✋
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
