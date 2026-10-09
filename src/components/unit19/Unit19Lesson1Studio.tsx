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
  Smile,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit19Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit19Lesson1Studio: React.FC<Unit19Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 82)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Quan sát đàn hươu cao cổ',
      speakerA: 'Boy',
      avatarA: '👦',
      textA: 'Mum, what are these animals?',
      ipaA: '/mʌm wɒt ɑː ðiːz ˈænɪmlz/',
      readingA: 'Măm, oát a đi-z a-ni-mồ-l-z?',
      meaningA: 'Mẹ ơi, những con vật này là con gì thế ạ?',
      speakerB: 'Mum',
      avatarB: '👩',
      textB: 'They’re giraffes, dear.',
      ipaB: '/ðeə dʒɪˈrɑːfs dɪə/',
      readingB: 'Đe-ơ gi-ra-pht-s, đi-ơ.',
      meaningB: 'Chúng là những chú hươu cao cổ đấy con yêu à.',
      context: 'Hai mẹ con đứng ngắm chuồng hươu cao cổ đang vươn cổ dài ăn lá cây.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Quan sát đàn hà mã tắm dưới hồ',
      speakerA: 'Boy',
      avatarA: '👦',
      textA: 'And what are these animals?',
      ipaA: '/ænd wɒt ɑː ðiːz ˈænɪmlz/',
      readingA: 'En-đ oát a đi-z a-ni-mồ-l-z?',
      meaningA: 'Còn những con vật này là con gì thế mẹ?',
      speakerB: 'Mum',
      avatarB: '👩',
      textB: 'They’re hippos.',
      ipaB: '/ðeə ˈhɪpəʊz/',
      readingB: 'Đe-ơ híp-pô-z.',
      meaningB: 'Chúng là những chú hà mã bơi dưới nước đấy con.',
      context: 'Mẹ dắt tay bé đến bên hồ nước có những chú hà mã đang ngụp lặn.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 83)
  // =========================================================================
  const zooAnimals = [
    {
      id: 'giraffes',
      nameEn: 'giraffes',
      ipa: '/dʒɪˈrɑːfs/',
      reading: 'gi-ra-pht-s',
      meaningVi: 'những chú hươu cao cổ',
      icon: '🦒',
      feature: 'Cổ và chân rất dài, ăn lá cây trên ngọn cao',
      badgeColor: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'hippos',
      nameEn: 'hippos',
      ipa: '/ˈhɪpəʊz/',
      reading: 'híp-pô-z',
      meaningVi: 'những chú hà mã',
      icon: '🦛',
      feature: 'Thân hình mập mạp, chân ngắn, thích ngâm mình dưới nước',
      badgeColor: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'lions',
      nameEn: 'lions',
      ipa: '/ˈlaɪənz/',
      reading: 'lai-ừn-z',
      meaningVi: 'những con sư tử',
      icon: '🦁',
      feature: 'Chúa sơn lâm có bờm oai vệ, tiếng gầm vang dội',
      badgeColor: 'from-orange-500 to-red-600'
    },
    {
      id: 'crocodiles',
      nameEn: 'crocodiles',
      ipa: '/ˈkrɒkədaɪlz/',
      reading: 'cróp-cơ-đai-l-z',
      meaningVi: 'những con cá sấu',
      icon: '🐊',
      feature: 'Da sần sùi, hàm răng sắc nhọn, bơi giỏi dưới nước',
      badgeColor: 'from-emerald-500 to-teal-600'
    }
  ];

  const [selectedAnimal, setSelectedAnimal] = useState(zooAnimals[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const zooMapSpots = [
    { name: 'lions', icon: '🦁', desc: 'Khu chuồng sư tử' },
    { name: 'giraffes', icon: '🦒', desc: 'Bãi cỏ hươu cao cổ' },
    { name: 'hippos', icon: '🦛', desc: 'Hồ bơi của hà mã' },
    { name: 'crocodiles', icon: '🐊', desc: 'Đầm lầy cá sấu' }
  ];
  const [activeZooSpot, setActiveZooSpot] = useState(zooMapSpots[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND NUMBER (TRACK 84)
  // =========================================================================
  interface Track84Item {
    id: string; // 'a', 'b', 'c', 'd'
    title: string;
    animalName: string;
    icon: string;
    correctOrder: number; // 1, 2, 3, 4
    script: string;
  }

  const track84Items: Track84Item[] = [
    {
      id: 'a',
      title: 'Tranh a · Đàn hà mã (Hippos)',
      animalName: 'hippos',
      icon: '🦛',
      correctOrder: 3,
      script: '3. What are these animals? - They’re hippos.'
    },
    {
      id: 'b',
      title: 'Tranh b · Đàn sư tử (Lions)',
      animalName: 'lions',
      icon: '🦁',
      correctOrder: 1,
      script: '1. What are these animals? - They’re lions.'
    },
    {
      id: 'c',
      title: 'Tranh c · Đàn cá sấu (Crocodiles)',
      animalName: 'crocodiles',
      icon: '🐊',
      correctOrder: 4,
      script: '4. What are these animals? - They’re crocodiles.'
    },
    {
      id: 'd',
      title: 'Tranh d · Đàn hươu cao cổ (Giraffes)',
      animalName: 'giraffes',
      icon: '🦒',
      correctOrder: 2,
      script: '2. What are these animals? - They’re giraffes.'
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
    track84Items.forEach(item => {
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
  const [act5_1, setAct5_1] = useState('');
  const [act5_2, setAct5_2] = useState('');
  const [act5_3_1, setAct5_3_1] = useState('');
  const [act5_3_2, setAct5_3_2] = useState('');
  const [act5_4_1, setAct5_4_1] = useState('');
  const [act5_4_2, setAct5_4_2] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let score = 0;

    if (act5_1.trim().toLowerCase() === 'lions') score++;
    if (act5_2.trim().toLowerCase() === 'crocodiles') score++;
    if (
      act5_3_1.trim().toLowerCase() === 'what' &&
      (act5_3_2.trim().toLowerCase() === "they're" || act5_3_2.trim().toLowerCase() === 'they are')
    )
      score++;
    if (
      (act5_4_1.trim().toLowerCase() === 'are they' || act5_4_1.trim().toLowerCase() === 'are these animals') &&
      act5_4_2.trim().toLowerCase() === 'hippos'
    )
      score++;

    if (score >= 3) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(score);
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
  // ACTIVITY 6: LET'S SING (TRACK 85)
  // =========================================================================
  const songVerses = [
    {
      title: 'Khổ 1: Đàn Sư Tử Dũng Mãnh (Lions) 🦁',
      lines: [
        { en: 'Look! Look! Look!', vi: 'Nhìn kìa! Nhìn kìa! Nhìn xem kìa!' },
        { en: 'What are these animals?', vi: 'Những con vật này là con gì thế?' },
        { en: 'They are lions.', vi: 'Chúng là những con sư tử đấy.' },
        { en: 'They look brave.', vi: 'Trông chúng thật oai phong dũng mãnh.' }
      ],
      audioText: 'Look! Look! Look! What are these animals? They are lions. They look brave.'
    },
    {
      title: 'Khổ 2: Đàn Hà Mã Khoẻ Khoắn (Hippos) 🦛',
      lines: [
        { en: 'Look! Look! Look!', vi: 'Nhìn kìa! Nhìn kìa! Nhìn xem kìa!' },
        { en: 'What are these animals?', vi: 'Những con vật này là con gì thế?' },
        { en: 'They are hippos.', vi: 'Chúng là những chú hà mã béo tốt.' },
        { en: 'They look strong.', vi: 'Trông chúng thật là to khoẻ lực lưỡng.' }
      ],
      audioText: 'Look! Look! Look! What are these animals? They are hippos. They look strong.'
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
                  ? 'bg-amber-700 text-white shadow-xs'
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
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition flex items-center gap-1 border border-amber-200"
            >
              <span>Tiết 2: Lý Do Yêu Thích (Why do you like...?) ➡️</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-700 text-white">
                Trang 58 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 82</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-700" />
              1. Look, listen and repeat (Hỏi tên các con vật ở sở thú)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Hai mẹ con cùng ngắm muôn thú: <em>Mum, what are these animals? - They're giraffes / hippos.</em>
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                "Mum, what are these animals? They're giraffes, dear. And what are these animals? They're hippos.",
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-amber-50/40 via-yellow-50/20 to-orange-50/30 rounded-3xl p-5 md:p-6 border-2 border-amber-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-900">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-amber-800">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-amber-50 text-amber-700 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-amber-900 font-medium bg-amber-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1">
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-700 text-white">
              Trang 58 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 83</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Smile className="w-6 h-6 text-amber-700" />
            2. Listen, point and say (4 Loài Động Vật Sở Thú Số Nhiều)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Mẫu câu hỏi: <strong>What are these animals?</strong> ➡️ Trả lời:{' '}
            <strong>They’re giraffes / hippos / lions / crocodiles.</strong>
          </p>
        </div>

        {/* 4 Animal Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {zooAnimals.map(animal => {
            const isSelected = selectedAnimal.id === animal.id;
            return (
              <button
                key={animal.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedAnimal(animal);
                  speakWord(`What are these animals? They're ${animal.nameEn}.`, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-amber-300'
                }`}
              >
                <span className="text-5xl my-2">{animal.icon}</span>
                <span className="font-black text-lg text-slate-800 capitalize">{animal.nameEn}</span>
                <span className="text-xs font-mono text-slate-400 mt-0.5">{animal.ipa}</span>
                <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md mt-1">
                  {animal.reading}
                </span>
                <span className="text-xs text-slate-500 mt-1">{animal.meaningVi}</span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  {animal.feature}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Box */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 border-2 border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl">{selectedAnimal.icon}</span>
              <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                Thực hành mẫu câu nhận biết loài vật: &quot;{selectedAnimal.nameEn}&quot;
              </span>
            </div>
            <p className="font-extrabold text-base md:text-lg text-slate-800">
              Q: What are these animals?
            </p>
            <p className="font-extrabold text-lg md:text-xl text-amber-800">
              A: They’re {selectedAnimal.nameEn}.
            </p>
            <p className="text-xs text-slate-600 italic">💡 {selectedAnimal.meaningVi} · {selectedAnimal.feature}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`What are these animals? They're ${selectedAnimal.nameEn}.`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu mẫu 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-amber-900 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition active:scale-95"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
              Trang 58 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Bản Đồ Sở Thú (Zoo Map)</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            3. Let’s talk (Khám phá các khu vực chuồng thú)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn khu vực trên bản đồ sở thú để luyện mẫu câu hỏi đáp:
          </p>
        </div>

        {/* 4 Zoo Spots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {zooMapSpots.map(spot => {
            const isSpotSelected = activeZooSpot.name === spot.name;
            return (
              <button
                key={spot.name}
                onClick={() => {
                  sound.playClick();
                  setActiveZooSpot(spot);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isSpotSelected
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-orange-300'
                }`}
              >
                <span className="text-4xl mb-1">{spot.icon}</span>
                <span className="font-extrabold text-sm capitalize text-slate-800">{spot.name}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 text-center">{spot.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-black text-base text-slate-800">
              Q: What are these animals?
            </p>
            <p className="font-black text-base text-orange-700">
              A: They’re {activeZooSpot.name}. ({activeZooSpot.desc})
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(`What are these animals? They're ${activeZooSpot.name}.`, speechRate)
            }
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu phản xạ 🔊</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: LISTEN AND NUMBER (TRACK 84) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-700 text-white">
                Trang 59 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 84</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-700" />
              4. Listen and number (Nghe và đánh số thứ tự 1, 2, 3, 4)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lắng nghe câu hỏi đáp về các loài động vật và đánh số thứ tự phù hợp cho 4 bức tranh a, b, c, d.
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-amber-700 text-white hover:bg-amber-800 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+5 ⭐)
            </button>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {track84Items.map(item => {
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
                      className="p-1 text-slate-500 hover:text-amber-700 transition"
                      title="Nghe câu thoại"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center my-2">
                    <span className="text-5xl">{item.icon}</span>
                    <h5 className="font-extrabold text-sm text-slate-800 mt-2">{item.title}</h5>
                  </div>
                </div>

                {/* Number selector */}
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
                            ? 'bg-amber-700 text-white shadow-xs'
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-600 text-white">
                Trang 59 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-orange-600" />
              5. Look, complete and read (Quan sát hình ảnh và hoàn thành câu)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Quan sát hình vẽ các loài vật ở sở thú để điền từ đúng vào chỗ trống.
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition flex items-center gap-1.5 shadow-sm"
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
              <span className="font-extrabold text-sm text-slate-800">1. Đàn sư tử (Lions) 🦁</span>
              <button
                onClick={() => speakWord("What are these animals? They're lions.", speechRate)}
                className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: What are these animals?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: They’re</span>
              <input
                type="text"
                value={act5_1}
                onChange={e => setAct5_1(e.target.value)}
                placeholder="lions..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;lions&quot;
              </p>
            )}
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">2. Đàn cá sấu (Crocodiles) 🐊</span>
              <button
                onClick={() => speakWord("What are these animals? They're crocodiles.", speechRate)}
                className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: What are these animals?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: They’re</span>
              <input
                type="text"
                value={act5_2}
                onChange={e => setAct5_2(e.target.value)}
                placeholder="crocodiles..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;crocodiles&quot;
              </p>
            )}
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">3. Hươu cao cổ có cổ và chân dài 🦒</span>
              <button
                onClick={() =>
                  speakWord(
                    "These animals have long necks and legs. What are they? They're giraffes.",
                    speechRate
                  )
                }
                className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: These animals have long necks and legs.</span>
              <input
                type="text"
                value={act5_3_1}
                onChange={e => setAct5_3_1(e.target.value)}
                placeholder="What..."
                className="px-2 py-0.5 rounded-lg border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-16 bg-white"
              />
              <span>are they?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B:</span>
              <input
                type="text"
                value={act5_3_2}
                onChange={e => setAct5_3_2(e.target.value)}
                placeholder="They're..."
                className="px-2 py-0.5 rounded-lg border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>giraffes.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;What&quot; và &quot;They're&quot;
              </p>
            )}
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800">4. Đàn hà mã có chân ngắn 🦛</span>
              <button
                onClick={() =>
                  speakWord(
                    "These animals have short legs. What are they? They're hippos.",
                    speechRate
                  )
                }
                className="p-1 text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: These animals have short legs. What</span>
              <input
                type="text"
                value={act5_4_1}
                onChange={e => setAct5_4_1(e.target.value)}
                placeholder="are they..."
                className="px-2 py-0.5 rounded-lg border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: They’re</span>
              <input
                type="text"
                value={act5_4_2}
                onChange={e => setAct5_4_2(e.target.value)}
                placeholder="hippos..."
                className="px-2 py-0.5 rounded-lg border border-slate-300 focus:border-orange-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700 pt-1">
                Đáp án: &quot;are they&quot; và &quot;hippos&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S SING (TRACK 85) */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Bài Hát Sở Thú · Track 85
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <Music className="w-7 h-7" />
              What are these animals? 🦁🦛🎶
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Hát vang bài ca khám phá những chú sư tử dũng mãnh và đàn hà mã to khoẻ!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              speakWord(
                "Look! Look! Look! What are these animals? They are lions. They look brave. Look! Look! Look! What are these animals? They are hippos. They look strong.",
                speechRate
              );
            }}
            className="px-6 py-3 rounded-2xl bg-white text-amber-950 font-black text-sm hover:bg-amber-50 shadow-md transition active:scale-95 flex items-center gap-2 shrink-0"
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
                    <p className="text-xs text-amber-100/80 italic">{ln.vi}</p>
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
