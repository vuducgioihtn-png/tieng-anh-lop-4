import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  School,
  Building2,
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
  Trees,
  Mountain,
  MapPin,
  Compass,
  Shuffle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit6Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit6Lesson1Studio: React.FC<Unit6Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Locations in Lesson 1
  const schoolLocations = [
    {
      id: 'mountains',
      name: 'mountains',
      phrase: 'in the mountains',
      vi: 'ở vùng núi / trên đồi núi',
      ipa: '/ɪn ðə ˈmaʊn.tənz/',
      reading: 'in đơ MAO-tơn-z',
      icon: '⛰️',
      scenery: 'Đồi núi trập trùng, mây trắng bồng bềnh, không khí trong lành mát mẻ',
      tip: 'Từ "mountains" luôn ở số nhiều có đuôi -s (/z/) khi nói về vùng núi non.'
    },
    {
      id: 'village',
      name: 'village',
      phrase: 'in the village',
      vi: 'ở làng quê / vùng nông thôn',
      ipa: '/ɪn ðə ˈvɪl.ɪdʒ/',
      reading: 'in đơ VÍL-lịt-j',
      icon: '🌾',
      scenery: 'Lũy tre xanh, cánh đồng lúa chín vàng, con đường làng thanh bình',
      tip: 'Chữ cái "g" phát âm thành âm rung /dʒ/ ở cuối từ.'
    },
    {
      id: 'city',
      name: 'city',
      phrase: 'in the city',
      vi: 'ở thành phố lớn / đô thị',
      ipa: '/ɪn ðə ˈsɪt.i/',
      reading: 'in đơ XÍT-ti',
      icon: '🏙️',
      scenery: 'Tòa nhà cao tầng hiện đại, xe cộ nhộn nhịp, phố xá lung linh ánh đèn',
      tip: 'Chữ "c" đầu đọc thành âm gió /s/ nhẹ nhàng, không đọc là "ki-ti".'
    },
    {
      id: 'town',
      name: 'town',
      phrase: 'in the town',
      vi: 'ở thị trấn / khu phố huyện',
      ipa: '/ɪn ðə taʊn/',
      reading: 'in đơ THAO-n',
      icon: '🏘️',
      scenery: 'Khu dân cư đông vui, nhà cửa mái ngói khang trang, chợ thị trấn tấp nập',
      tip: 'Phát âm /t/ bật hơi dứt khoát kết hợp vần tròn môi /aʊn/.'
    }
  ];

  // Activity 1: Dialogue Look, Listen & Repeat (Track 57)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Nam hỏi trường của Lucy',
      context: 'Nam và Lucy đang đứng nói chuyện dưới tán cây sân trường. Lucy tưởng tượng về ngôi trường thành phố có nhà cao tầng của mình.',
      badge: 'Track 57 - Part A',
      lines: [
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'Where’s your school, Lucy?',
          vi: 'Trường của bạn ở đâu vậy Lucy?',
          soundDesc: 'Nam hỏi với giọng tò mò thân thiện',
          focus: 'Where’s your school?'
        },
        {
          speaker: 'Lucy',
          avatar: '👧',
          en: 'It’s in the city.',
          vi: 'Trường của mình ở thành phố.',
          soundDesc: 'Lucy tươi cười tự hào giới thiệu',
          focus: 'It’s in the city.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Lucy hỏi trường của Hùng',
      context: 'Lucy quay sang hỏi bạn Hùng. Hùng vui vẻ chỉ vào bức tranh trường tiểu học mái đỏ nằm bên sườn đồi núi xanh biếc.',
      badge: 'Track 57 - Part B',
      lines: [
        {
          speaker: 'Lucy',
          avatar: '👧',
          en: 'And where’s your school, Hung?',
          vi: 'Còn trường của bạn ở đâu hả Hùng?',
          soundDesc: 'Lucy hỏi tiếp bạn Hùng',
          focus: 'And where’s your school?'
        },
        {
          speaker: 'Hung',
          avatar: '👦',
          en: 'It’s in the mountains.',
          vi: 'Trường của mình ở vùng núi.',
          soundDesc: 'Hùng phấn khởi giới thiệu trường miền núi',
          focus: 'It’s in the mountains.'
        }
      ]
    }
  };

  // Activity 2: Listen, point and say (Track 58)
  const [selectedLocId, setSelectedLocId] = useState<string>('mountains');

  // Activity 3: Let's talk
  const [talkChoice, setTalkChoice] = useState<string>('city');

  // Activity 4: Listen and number (Track 59)
  interface ListenNumberItem {
    id: number;
    audioText: string;
    speaker: string;
    correctNumber: number;
    userNumber: number | null;
    locationName: string;
    icon: string;
    desc: string;
  }

  const [listenNumberList, setListenNumberList] = useState<ListenNumberItem[]>([
    {
      id: 1,
      audioText: 'Where is your school, Mai? - It is in the city. There are many tall buildings around it.',
      speaker: '👧 Mai & Nam',
      correctNumber: 1,
      userNumber: null,
      locationName: 'City (Thành phố nhà cao tầng)',
      icon: '🏙️',
      desc: 'Tranh A: Trường học thành phố với dãy nhà chọc trời'
    },
    {
      id: 2,
      audioText: 'Where is your school, Phong? - It is in the village. It has green trees and rice fields.',
      speaker: '👦 Phong & Linda',
      correctNumber: 2,
      userNumber: null,
      locationName: 'Village (Làng quê yên bình)',
      icon: '🌾',
      desc: 'Tranh B: Trường làng bên cạnh rặng tre và con đường làng'
    },
    {
      id: 3,
      audioText: 'Where is your school, Linh? - It is in the town. It is near the market.',
      speaker: '👧 Linh & Peter',
      correctNumber: 3,
      userNumber: null,
      locationName: 'Town (Thị trấn phố xá)',
      icon: '🏘️',
      desc: 'Tranh C: Ngôi trường nằm trong khu phố thị trấn khang trang'
    },
    {
      id: 4,
      audioText: 'Where is your school, Quan? - It is in the mountains. We see high hills every day.',
      speaker: '👦 Quân & Lucy',
      correctNumber: 4,
      userNumber: null,
      locationName: 'Mountains (Vùng núi non hùng vĩ)',
      icon: '⛰️',
      desc: 'Tranh D: Ngôi trường mái đỏ bên sườn núi và lá cờ Tổ quốc'
    }
  ]);
  const [numberQuizChecked, setNumberQuizChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3a: '',
    q3b: '',
    q4a: '',
    q4b: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Matching Pairs Memory Card Game
  interface MemoryCard {
    cardId: number;
    matchKey: string;
    type: 'word' | 'image';
    content: string;
    sub: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const initialMemoryCards: MemoryCard[] = [
    { cardId: 1, matchKey: 'mountains', type: 'word', content: 'mountains', sub: 'vùng núi ⛰️', isFlipped: false, isMatched: false },
    { cardId: 2, matchKey: 'mountains', type: 'image', content: '⛰️', sub: 'Trường vùng núi', isFlipped: false, isMatched: false },
    { cardId: 3, matchKey: 'village', type: 'word', content: 'village', sub: 'làng quê 🌾', isFlipped: false, isMatched: false },
    { cardId: 4, matchKey: 'village', type: 'image', content: '🌾', sub: 'Trường làng quê', isFlipped: false, isMatched: false },
    { cardId: 5, matchKey: 'city', type: 'word', content: 'city', sub: 'thành phố 🏙️', isFlipped: false, isMatched: false },
    { cardId: 6, matchKey: 'city', type: 'image', content: '🏙️', sub: 'Trường thành phố', isFlipped: false, isMatched: false },
    { cardId: 7, matchKey: 'town', type: 'word', content: 'town', sub: 'thị trấn 🏘️', isFlipped: false, isMatched: false },
    { cardId: 8, matchKey: 'town', type: 'image', content: '🏘️', sub: 'Trường thị trấn', isFlipped: false, isMatched: false }
  ];

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(() =>
    [...initialMemoryCards].sort(() => Math.random() - 0.5)
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleFlipCard = (cardId: number) => {
    if (selectedCards.length === 2) return;
    const card = memoryCards.find(c => c.cardId === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    sound.playClick();
    const newCards = memoryCards.map(c =>
      c.cardId === cardId ? { ...c, isFlipped: true } : c
    );
    setMemoryCards(newCards);

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const first = newCards.find(c => c.cardId === newSelected[0])!;
      const second = newCards.find(c => c.cardId === newSelected[1])!;

      if (first.matchKey === second.matchKey) {
        // Matched!
        setTimeout(() => {
          sound.playCorrect();
          setMemoryCards(prev =>
            prev.map(c =>
              c.matchKey === first.matchKey ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          onAddStar(2);
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          sound.playWrong();
          setMemoryCards(prev =>
            prev.map(c =>
              c.cardId === first.cardId || c.cardId === second.cardId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const handleResetMemory = () => {
    setMemoryCards([...initialMemoryCards].sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    sound.playClick();
  };

  const curLoc = schoolLocations.find(l => l.id === selectedLocId) || schoolLocations[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 6: Our School Facilities • Tiết 1 (Lesson 1)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-sky-100 hover:text-white"
                >
                  Sang Tiết 3
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi Vị Trí Ngôi Trường Của Bạn</span>
              <span className="text-3xl">🏫</span>
            </h1>
            <p className="text-sky-100 text-sm md:text-base font-medium mt-1">
              Khám phá cấu trúc hỏi và trả lời về địa điểm trường học: "Where’s your school?" — "It’s in the mountains / village / city / town."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 44 - 45</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Mẫu Câu</span>
              <span className="text-sm font-black text-amber-300">Where’s your school?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">4 Địa Điểm</span>
              <span className="text-sm font-black text-white">mountains, village, city, town</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Bí kíp</span>
              <span className="text-sm font-black text-emerald-300">Nhớ có "in the" 📍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Công Thức Vàng: Hỏi & Chỉ Vị Trí Trường Học
              </h2>
              <p className="text-xs text-slate-500">
                Quy tắc bất biến: Dùng "Where's" (ở đâu) và trả lời với cụm giới từ "It's in the + [nơi chốn]"!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question Box */}
          <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-700 uppercase tracking-wide">
                ❓ Câu Hỏi Địa Điểm Trường
              </span>
              <span className="text-lg">🏫</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-sky-600 font-extrabold">Where’s your school?</span>
            </div>
            <div className="text-xs text-slate-600">
              (Trường của bạn ở đâu vậy?)
            </div>
            <div className="pt-1 text-[11px] text-sky-700 italic">
              "Where’s" là viết tắt của "Where is". Đọc nối âm mượt mà: /weəz/.
            </div>
          </div>

          {/* Answer Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">
                👉 Câu Trả Lời Vị Trí
              </span>
              <span className="text-lg">📍</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-emerald-600 font-extrabold">It’s in the</span> + [mountains / village / city / town].
            </div>
            <div className="text-xs text-slate-600">
              (Trường của mình ở vùng núi / làng quê / thành phố / thị trấn.)
            </div>
            <div className="pt-1 text-[11px] text-emerald-700 italic">
              Luôn luôn có cụm <strong className="underline">in the</strong> trước tên khu vực!
            </div>
          </div>
        </div>

        {/* Parent Guide Expandable */}
        {showParentGuides && (
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Góc Hướng Dẫn Phụ Huynh & Thầy Cô (SGK Trang 44 - 45)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li>
                <strong>Phân biệt City và Town:</strong> <em>City</em> là thành phố lớn, đông dân cư, có nhà cao tầng (như Hà Nội, TP.HCM). <em>Town</em> là thị xã, thị trấn nhỏ hơn thành phố nhưng lớn hơn làng quê (village).
              </li>
              <li>
                <strong>Từ "mountains" có đuôi số nhiều:</strong> Nhắc bé luôn đọc âm đuôi /z/ ở từ <em>mountains</em> vì đồi núi thường trùng điệp thành dãy núi.
              </li>
              <li>
                <strong>Cụm từ "in the":</strong> Trẻ thường hay quên mạo từ <em>the</em> (nói nhầm thành "It's in city"). Hãy nhắc con: "Có <em>in the</em> thì câu trả lời mới trọn vẹn và lịch sự!".
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 6 Activity Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Đối Thoại (Track 57)', icon: '💬' },
          { num: 2, label: '2. Chỉ Tranh & Nói (Track 58)', icon: '🎙️' },
          { num: 3, label: '3. Phòng Tranh Let’s Talk', icon: '🎨' },
          { num: 4, label: '4. Nghe & Đánh Số (Track 59)', icon: '🎧' },
          { num: 5, label: '5. Hoàn Thiện Câu Hỏi', icon: '✍️' },
          { num: 6, label: '6. Trò Chơi Lật Thẻ Cặp', icon: '🃏' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveSection(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === tab.num
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 57) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
                Phần 1 • SGK Trang 44
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Look, listen and repeat</span>
                <span className="text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 57
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát các bức tranh hỏi vị trí trường học của bạn Lucy và bạn Hùng. Bấm vào từng lời thoại để nghe và phát âm theo.
              </p>
            </div>

            {/* Switch Situation A / B */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setActiveDialogueTab('a');
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'a'
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh A: Trường của Lucy (City 🏙️)
              </button>
              <button
                onClick={() => {
                  setActiveDialogueTab('b');
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh B: Trường của Hùng (Mountains ⛰️)
              </button>
            </div>
          </div>

          {/* Current Dialogue Scene Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
                <span>{dialogueScenes[activeDialogueTab].title}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {dialogueScenes[activeDialogueTab].badge}
              </span>
            </div>

            <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200">
              📌 {dialogueScenes[activeDialogueTab].context}
            </p>

            {/* Interactive Lines */}
            <div className="space-y-3 pt-2">
              {dialogueScenes[activeDialogueTab].lines.map((line, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setPlayingDialogueLine(idx);
                    speakWord(line.en, speechRate);
                    onAddStar(1);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    playingDialogueLine === idx
                      ? 'border-sky-500 bg-sky-50/70 shadow-sm scale-[1.01]'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <div className="text-3xl p-2 bg-slate-100 rounded-2xl flex-shrink-0">
                    {line.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">
                        {line.speaker}
                      </span>
                      <span className="text-[11px] font-bold text-sky-600 flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Bấm để nghe & đọc theo</span>
                      </span>
                    </div>
                    <div className="text-base font-black text-slate-800">
                      {line.en}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {line.vi}
                    </div>
                    <div className="text-[11px] text-sky-700 pt-1 font-semibold flex items-center gap-1">
                      <span>🎯 Câu trọng tâm:</span>
                      <span className="bg-sky-100 px-2 py-0.5 rounded-md font-black">
                        {line.focus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  const allText = dialogueScenes[activeDialogueTab].lines
                    .map(l => `${l.speaker} says: ${l.en}`)
                    .join('. ');
                  speakWord(allText, speechRate);
                  onAddStar(2);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Nghe Toàn Bộ Đoạn Thoại</span>
              </button>

              <button
                onClick={onOpenVoiceStudio}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Luyện Giọng AI Đoạn Này</span>
              </button>
            </div>
          </div>

          {/* 4 Locations Showcase */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>4 Địa Điểm Vị Trí Trường Học Cần Ghi Nhớ (SGK Trang 44)</span>
              <span className="text-xs font-normal text-slate-500">Bấm thẻ để nghe phát âm</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {schoolLocations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    speakWord(`in the ${loc.name}`, speechRate);
                    sound.playClick();
                  }}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-sky-400 transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{loc.icon}</span>
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                  <div className="text-base font-black text-slate-900 group-hover:text-sky-700">
                    {loc.name}
                  </div>
                  <div className="text-xs text-slate-500">{loc.vi}</div>
                  <div className="text-[11px] text-sky-600 font-mono font-bold">
                    {loc.ipa}
                  </div>
                  <div className="text-[10px] text-slate-400 italic pt-1 line-clamp-2">
                    {loc.scenery}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 58) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
              Phần 2 • SGK Trang 44
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Listen, point and say</span>
              <span className="text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold">
                Track 58
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bấm vào từng bức tranh địa điểm (a. mountains, b. village, c. city, d. town) để thực hành ghép thành cặp câu hỏi & trả lời hoàn chỉnh.
            </p>
          </div>

          {/* 4 Location Cards Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {schoolLocations.map(loc => {
              const isSelected = selectedLocId === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocId(loc.id);
                    sound.playClick();
                    speakWord(`Where's your school? It's in the ${loc.name}.`, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50 shadow-md ring-2 ring-sky-500/20 scale-[1.02]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{loc.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Tranh {loc.id === 'mountains' ? 'a' : loc.id === 'village' ? 'b' : loc.id === 'city' ? 'c' : 'd'}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-black text-slate-900 capitalize">
                      {loc.name}
                    </div>
                    <div className="text-xs text-slate-500">{loc.vi}</div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Result Card */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-6 border-2 border-sky-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Mẫu Câu Chuẩn SGK Được Ghép Cho Địa Điểm Này</span>
              </span>
              <span className="text-3xl">{curLoc.icon}</span>
            </div>

            {/* Question Line */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-100 flex items-start gap-3 shadow-xs">
              <span className="text-xl">❓</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Hỏi:</span>
                <span className="text-base font-black text-slate-900">
                  "Where’s your school?"
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  (Trường của bạn ở đâu vậy?)
                </span>
              </div>
            </div>

            {/* Answer Line */}
            <div className="p-3.5 rounded-xl bg-white border border-sky-100 flex items-start gap-3 shadow-xs">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Trả Lời:</span>
                <span className="text-base font-black text-sky-800">
                  "It’s in the <strong className="underline text-amber-700">{curLoc.name}</strong>."
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  ({curLoc.vi}.)
                </span>
              </div>
            </div>

            {/* Listen Button */}
            <button
              onClick={() => {
                speakWord(`Where's your school? It's in the ${curLoc.name}.`, speechRate);
                sound.playCorrect();
                onAddStar(2);
              }}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Phát Âm Cả Cặp Câu Này (Track 58)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S TALK (ART CLASS STUDIO) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
              Phần 3 • SGK Trang 44
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Let's talk • Phòng tranh ngôi trường của em</span>
              <span className="text-2xl">🎨</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Học sinh nhìn vào các giá vẽ tranh trường học và đóng vai phóng viên hỏi bạn học về vị trí trường.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-700 uppercase block">
              Chọn bức tranh trường học trên giá vẽ:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'city', name: 'Thành phố (city)', icon: '🏙️' },
                { id: 'mountains', name: 'Miền núi (mountains)', icon: '⛰️' },
                { id: 'village', name: 'Làng quê (village)', icon: '🌾' },
                { id: 'town', name: 'Thị trấn (town)', icon: '🏘️' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTalkChoice(opt.id);
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    talkChoice === opt.id
                      ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>

            {/* Conversation Flow */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-800 font-black text-lg">
                  🧑‍🎨
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn hỏi:</span>
                  <div className="text-lg font-black text-slate-900">
                    "Where’s your school?"
                  </div>
                  <button
                    onClick={() => speakWord("Where's your school?", speechRate)}
                    className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện phát âm câu hỏi</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-black text-lg">
                  👧
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn học trả lời:</span>
                  <div className="text-lg font-black text-sky-800">
                    "It’s in the {talkChoice}."
                  </div>
                  <button
                    onClick={() => speakWord(`It's in the ${talkChoice}.`, speechRate)}
                    className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện phát âm câu trả lời</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: LISTEN AND NUMBER (TRACK 59) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
                Phần 4 • SGK Trang 45
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and number</span>
                <span className="text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 59
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm nghe từng băng ghi âm, lắng nghe xem trường học ở thành phố, làng quê, thị trấn hay miền núi để điền số thứ tự từ 1 đến 4.
              </p>
            </div>

            <button
              onClick={() => {
                setListenNumberList(prev => prev.map(item => ({ ...item, userNumber: null })));
                setNumberQuizChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listenNumberList.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 relative hover:border-sky-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <button
                    onClick={() => {
                      speakWord(item.audioText, speechRate);
                      sound.playClick();
                    }}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Băng #{item.id}</span>
                  </button>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block">{item.desc}</span>
                  <span className="text-sm font-black text-slate-900">{item.locationName}</span>
                </div>

                {/* Choose Number 1 to 4 */}
                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-600 block mb-1">
                    Đoạn này xuất hiện ở vị trí số mấy?
                  </span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          setListenNumberList(prev =>
                            prev.map(q => (q.id === item.id ? { ...q, userNumber: num } : q))
                          );
                          sound.playClick();
                        }}
                        className={`w-10 h-10 rounded-xl font-black text-sm transition-all border ${
                          item.userNumber === num
                            ? 'bg-sky-600 text-white border-sky-700 shadow-sm scale-110'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback when checked */}
                {numberQuizChecked && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      item.userNumber === item.correctNumber
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.userNumber === item.correctNumber
                      ? `✅ Đúng rồi! Số thứ tự là ${item.correctNumber}.`
                      : `❌ Chưa chính xác. Đáp án đúng là số ${item.correctNumber}.`}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setNumberQuizChecked(true);
                const correctCount = listenNumberList.filter(
                  q => q.userNumber === q.correctNumber
                ).length;
                if (correctCount === 4) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(4);
                } else {
                  sound.playCorrect();
                  onAddStar(correctCount);
                }
              }}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Chấm Điểm Bài Nghe (Track 59)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LOOK, COMPLETE AND READ */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
              Phần 5 • SGK Trang 45
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Look, complete and read</span>
              <span className="text-2xl">✍️</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quan sát tranh và hoàn thành 4 cặp câu hỏi & trả lời. Bấm nút "Kiểm Tra" để xem đáp án chi tiết.
            </p>
          </div>

          <div className="space-y-4">
            {/* Question 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-700">Câu 1 • Trường làng bên lũy tre xanh</span>
                <span className="text-2xl">🌾</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1">
                <div>A: Where’s your school?</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: It’s in the</span>
                  <input
                    type="text"
                    value={fillAnswers.q1}
                    onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                    placeholder="village"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-36 focus:outline-sky-500 bg-white"
                  />
                  <span>.</span>
                </div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q1.trim().toLowerCase() === 'village'
                    ? '✅ Hoàn toàn chính xác: village'
                    : '👉 Đáp án chuẩn: village'}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-700">Câu 2 • Ngôi trường ở thị trấn</span>
                <span className="text-2xl">🏘️</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1">
                <div>A: Where’s your school?</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: It’s in</span>
                  <input
                    type="text"
                    value={fillAnswers.q2}
                    onChange={e => setFillAnswers({ ...fillAnswers, q2: e.target.value })}
                    placeholder="the town"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-36 focus:outline-sky-500 bg-white"
                  />
                  <span>.</span>
                </div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q2.trim().toLowerCase() === 'the town'
                    ? '✅ Hoàn toàn chính xác: the town'
                    : '👉 Đáp án chuẩn: the town'}
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-700">Câu 3 • Trường học ở thành phố lớn</span>
                <span className="text-2xl">🏙️</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>A: Where’s your</span>
                  <input
                    type="text"
                    value={fillAnswers.q3a}
                    onChange={e => setFillAnswers({ ...fillAnswers, q3a: e.target.value })}
                    placeholder="school"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-28 focus:outline-sky-500 bg-white"
                  />
                  <span>?</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: It’s in</span>
                  <input
                    type="text"
                    value={fillAnswers.q3b}
                    onChange={e => setFillAnswers({ ...fillAnswers, q3b: e.target.value })}
                    placeholder="the city"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-32 focus:outline-sky-500 bg-white"
                  />
                  <span>.</span>
                </div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q3a.trim().toLowerCase() === 'school' &&
                  fillAnswers.q3b.trim().toLowerCase() === 'the city'
                    ? '✅ Hoàn toàn chính xác: school & the city'
                    : '👉 Đáp án chuẩn: school / the city'}
                </div>
              )}
            </div>

            {/* Question 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-700">Câu 4 • Ngôi trường ở miền núi có cờ đỏ</span>
                <span className="text-2xl">⛰️</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>A:</span>
                  <input
                    type="text"
                    value={fillAnswers.q4a}
                    onChange={e => setFillAnswers({ ...fillAnswers, q4a: e.target.value })}
                    placeholder="Where's"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-28 focus:outline-sky-500 bg-white"
                  />
                  <span>your school?</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: It’s</span>
                  <input
                    type="text"
                    value={fillAnswers.q4b}
                    onChange={e => setFillAnswers({ ...fillAnswers, q4b: e.target.value })}
                    placeholder="in the mountains"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-sky-700 w-44 focus:outline-sky-500 bg-white"
                  />
                  <span>.</span>
                </div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {(fillAnswers.q4a.trim().toLowerCase().includes("where's") ||
                    fillAnswers.q4a.trim().toLowerCase().includes('where is')) &&
                  fillAnswers.q4b.trim().toLowerCase() === 'in the mountains'
                    ? '✅ Hoàn toàn chính xác!'
                    : "👉 Đáp án chuẩn: Where's (hoặc Where is) / in the mountains"}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setFillChecked(true);
                sound.playVictory();
                confetti({ particleCount: 40, spread: 60 });
                onAddStar(4);
              }}
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
            >
              Kiểm Tra Kết Quả
            </button>
            <button
              onClick={() => {
                setFillAnswers({ q1: '', q2: '', q3a: '', q3b: '', q4a: '', q4b: '' });
                setFillChecked(false);
                sound.playClick();
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              Điền Lại
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: MATCHING PAIRS MEMORY GAME */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
                Phần 6 • SGK Trang 45
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Matching pairs • Trò chơi lật thẻ cặp</span>
                <span className="text-2xl">🃏</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm vào các thẻ bài úp để tìm ra từng cặp tương ứng giữa chữ cái tiếng Anh và hình ảnh biểu tượng!
              </p>
            </div>

            <button
              onClick={handleResetMemory}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại Từ Đầu</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {memoryCards.map(card => {
              const isVisible = card.isFlipped || card.isMatched;
              return (
                <div
                  key={card.cardId}
                  onClick={() => handleFlipCard(card.cardId)}
                  className={`h-36 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-3 text-center select-none ${
                    card.isMatched
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 scale-95 opacity-90'
                      : isVisible
                      ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-md scale-105'
                      : 'border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 hover:border-sky-400 hover:bg-sky-50/50'
                  }`}
                >
                  {isVisible ? (
                    <div className="space-y-1 animate-in fade-in zoom-in-75 duration-200">
                      <span className="text-3xl block">{card.content}</span>
                      <span className="text-xs font-black block capitalize">{card.sub}</span>
                    </div>
                  ) : (
                    <div className="space-y-1 text-slate-400">
                      <School className="w-8 h-8 mx-auto opacity-50" />
                      <span className="text-[10px] font-bold block uppercase tracking-wider">
                        Lật thẻ
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {memoryCards.every(c => c.isMatched) && (
            <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 text-center font-black text-sm space-y-1">
              <div>🎉 Chúc mừng! Bạn đã tìm được tất cả các cặp thẻ xuất sắc!</div>
              <div className="text-xs font-normal opacity-90">
                Bạn đã ghi nhớ hoàn hảo: mountains ⛰️, village 🌾, city 🏙️, town 🏘️.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
