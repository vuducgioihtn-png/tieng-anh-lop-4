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
  Music,
  MapPin,
  Building,
  TreePine,
  Car,
  VolumeX,
  Volume1
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit11Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit11Lesson2Studio: React.FC<Unit11Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 4)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: 'Where do you live?',
      ipaA: '/weər duː juː lɪv/',
      readingA: 'Que-ơ đu diu lív?',
      meaningA: 'Cậu sống ở đâu thế?',
      speakerB: 'Minh',
      avatarB: '👦🏻',
      textB: 'I live in Hai Ba Trung Street.',
      ipaB: '/aɪ lɪv ɪn haɪ bɑː trʊŋ striːt/',
      readingB: 'Ai lív in Hai Bà Trưng s-trít.',
      meaningB: 'Tớ sống ở phố Hai Bà Trưng.',
      context: 'Ben và Minh đang ngồi trò chuyện trong lớp học.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Ben',
      avatarA: '🧑‍🦰',
      textA: "What's the street like?",
      ipaA: '/wɒts ðə striːt laɪk/',
      readingA: 'Oát-s đờ s-trít lai-k?',
      meaningA: 'Con phố ấy trông như thế nào?',
      speakerB: 'Minh',
      avatarB: '👦🏻',
      textB: "It's a busy street.",
      ipaB: '/ɪts ə ˈbɪzi striːt/',
      readingB: 'Ít-s ơ bít-zi s-trít.',
      meaningB: 'Đó là một con phố rất tấp nập, nhộn nhịp xe cộ.',
      context: 'Minh nhớ đến cảnh xe máy, ô tô, xe buýt đi lại đông đúc trên phố.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 5) - 4 ADJECTIVES
  // =========================================================================
  const featureCards = [
    {
      id: 'card_a',
      key: 'a',
      word: 'a busy street',
      ipa: '/ə ˈbɪzi striːt/',
      reading: 'ơ bít-zi s-trít',
      meaningVi: 'một con phố tấp nập, nhộn nhịp',
      placeType: 'street',
      question: "What's the street like?",
      questionIpa: '/wɒts ðə striːt laɪk/',
      questionReading: 'Oát-s đờ s-trít lai-k?',
      answer: "It's a busy street.",
      answerIpa: '/ɪts ə ˈbɪzi striːt/',
      answerReading: 'Ít-s ơ bít-zi s-trít.',
      icon: '🚗',
      color: 'border-orange-300 bg-orange-50/50 text-orange-900',
      badge: 'bg-orange-600',
      desc: 'Nhiều xe cộ qua lại, người đi bộ tấp nập'
    },
    {
      id: 'card_b',
      key: 'b',
      word: 'a quiet village',
      ipa: '/ə ˈkwaɪət ˈvɪlɪdʒ/',
      reading: 'ơ khoai-ợt vin-li-dzh',
      meaningVi: 'một ngôi làng yên tĩnh, thanh bình',
      placeType: 'village',
      question: "What's the village like?",
      questionIpa: '/wɒts ðə ˈvɪlɪdʒ laɪk/',
      questionReading: 'Oát-s đờ vin-li-dzh lai-k?',
      answer: "It's a quiet village.",
      answerIpa: '/ɪts ə ˈkwaɪət ˈvɪlɪdʒ/',
      answerReading: 'Ít-s ơ khoai-ợt vin-li-dzh.',
      icon: '🌾',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      badge: 'bg-emerald-600',
      desc: 'Cây cối trong lành, tiếng chim hót, không gian êm ả'
    },
    {
      id: 'card_c',
      key: 'c',
      word: 'a noisy road',
      ipa: '/ə ˈnɔɪzi rəʊd/',
      reading: 'ơ noi-zi râu-đ',
      meaningVi: 'một con đường ồn ào nhiều tiếng còi xe',
      placeType: 'road',
      question: "What's the road like?",
      questionIpa: '/wɒts ðə rəʊd laɪk/',
      questionReading: 'Oát-s đờ râu-đ lai-k?',
      answer: "It's a noisy road.",
      answerIpa: '/ɪts ə ˈnɔɪzi rəʊd/',
      answerReading: 'Ít-s ơ noi-zi râu-đ.',
      icon: '📢',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      badge: 'bg-amber-600',
      desc: 'Đèn xe rực sáng ban đêm, tiếng động cơ rộn rã'
    },
    {
      id: 'card_d',
      key: 'd',
      word: 'a big city',
      ipa: '/ə bɪɡ ˈsɪti/',
      reading: 'ơ bích-g sít-ti',
      meaningVi: 'một thành phố lớn và hiện đại',
      placeType: 'city',
      question: "What's the city like?",
      questionIpa: '/wɒts ðə ˈsɪti laɪk/',
      questionReading: 'Oát-s đờ sít-ti lai-k?',
      answer: "It's a big city.",
      answerIpa: '/ɪts ə bɪɡ ˈsɪti/',
      answerReading: 'Ít-s ơ bích-g sít-ti.',
      icon: '🏙️',
      color: 'border-sky-300 bg-sky-50/50 text-sky-900',
      badge: 'bg-sky-600',
      desc: 'Nhiều toà nhà chọc trời, trung tâm thương mại lộng lẫy'
    }
  ];

  const [activeFeatureCard, setActiveFeatureCard] = useState<string>('card_a');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK (TRACK 6) - 2 ITEMS
  // 1: a (quiet village) vs b (busy city)
  // 2: a (quiet street) vs b (noisy busy road)
  // =========================================================================
  interface ListenTickItem {
    id: number;
    title: string;
    audioScript: string;
    ipa: string;
    reading: string;
    options: {
      key: 'a' | 'b';
      label: string;
      desc: string;
      icon: string;
    }[];
    correctAnswer: 'a' | 'b';
    userChoice: 'a' | 'b' | null;
    explanation: string;
  }

  const [listenTickList, setListenTickList] = useState<ListenTickItem[]>([
    {
      id: 1,
      title: 'Câu 1: Where do you live? - What’s it like?',
      audioScript: 'Where do you live? - I live in a village. - What’s the village like? - It’s a quiet village.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv ɪn ə ˈvɪlɪdʒ. - wɒts ðə ˈvɪlɪdʒ laɪk? - ɪts ə ˈkwaɪət ˈvɪlɪdʒ/',
      reading: 'Que-ơ đu diu lív? - Ai lív in ơ vin-li-dzh. - Oát-s đờ vin-li-dzh lai-k? - Ít-s ơ khoai-ợt vin-li-dzh.',
      options: [
        { key: 'a', label: 'a quiet village', desc: 'Ngôi làng nhỏ yên bình, vắng bóng xe cộ', icon: '🌾' },
        { key: 'b', label: 'a big city', desc: 'Thành phố đông đúc xe taxi vàng và nhà cao tầng', icon: '🏙️' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Trong bài nghe: "It’s a quiet village" (Đó là một ngôi làng yên tĩnh) -> Chọn tranh a.'
    },
    {
      id: 2,
      title: 'Câu 2: What’s the street like?',
      audioScript: 'Where do you live? - I live in Hai Ba Trung Street. - What’s the street like? - It’s a busy street.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv ɪn haɪ bɑː trʊŋ striːt. - wɒts ðə striːt laɪk? - ɪts ə ˈbɪzi striːt/',
      reading: 'Que-ơ đu diu lív? - Ai lív in Hai Bà Trưng s-trít. - Oát-s đờ s-trít lai-k? - Ít-s ơ bít-zi s-trít.',
      options: [
        { key: 'a', label: 'a quiet street', desc: 'Con ngõ nhỏ thanh tịnh trồng nhiều cây xanh', icon: '🏡' },
        { key: 'b', label: 'a busy street', desc: 'Con phố tấp nập xe hơi và người qua lại', icon: '🚗' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe nói rõ: "It’s a busy street" (Đó là một con phố tấp nập) -> Chọn tranh b.'
    }
  ]);
  const [listenTickSubmitted, setListenTickSubmitted] = useState<boolean>(false);

  const handleSelectListenTick = (id: number, key: 'a' | 'b') => {
    sound.playClick();
    setListenTickList(prev => prev.map(item => (item.id === id ? { ...item, userChoice: key } : item)));
  };

  const handleCheckListenTick = () => {
    const allDone = listenTickList.every(i => i.userChoice !== null);
    if (!allDone) {
      alert('Em hãy chọn đáp án cho cả 2 câu hỏi nhé!');
      return;
    }
    const correctCount = listenTickList.filter(i => i.userChoice === i.correctAnswer).length;
    setListenTickSubmitted(true);
    if (correctCount === 2) {
      sound.playVictory();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [completeAnswers, setCompleteAnswers] = useState<{ [key: string]: string }>({
    q1_addr: '',
    q1_desc: '',
    q2_live: '',
    q2_village: '',
    q2_whats: '',
    q2_like: ''
  });
  const [completeChecked, setCompleteChecked] = useState<boolean>(false);

  const handleCheckComplete = () => {
    setCompleteChecked(true);
    sound.playVictory();
    onAddStar(5);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 7) - "MY HOUSE"
  // =========================================================================
  const songLyrics = [
    { text: 'I live in a house.', ipa: '/aɪ lɪv ɪn ə haʊs/', reading: 'Ai lív in ơ hao-s' },
    { text: "It's a small house", ipa: '/ɪts ə smɔːl haʊs/', reading: 'Ít-s ơ x-mòl hao-s' },
    { text: 'In a quiet street', ipa: '/ɪn ə ˈkwaɪət striːt/', reading: 'In ơ khoai-ợt s-trít' },
    { text: 'In a big town.', ipa: '/ɪn ə bɪɡ taʊn/', reading: 'In ơ bích-g thao-n' },
    { text: '---', ipa: '', reading: '' },
    { text: 'I live in a house.', ipa: '/aɪ lɪv ɪn ə haʊs/', reading: 'Ai lív in ơ hao-s' },
    { text: "It's a small house", ipa: '/ɪts ə smɔːl haʊs/', reading: 'Ít-s ơ x-mòl hao-s' },
    { text: 'In a busy street', ipa: '/ɪn ə ˈbɪzi striːt/', reading: 'In ơ bít-zi s-trít' },
    { text: 'In a big city.', ipa: '/ɪn ə bɪɡ ˈsɪti/', reading: 'In ơ bích-g sít-ti' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 rounded-3xl p-6 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Cấu Trúc Trọng Tâm Unit 11 · Tiết 2
          </span>
          <span className="text-xs text-teal-100 font-bold">Trang 8 - 9 SGK</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black">
          Hỏi Và Miêu Tả Đặc Điểm Nơi Mình Sinh Sống
        </h2>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl">
          <p className="text-base font-extrabold text-yellow-300">
            What&apos;s the ... like? - It&apos;s ...
          </p>
          <p className="text-xs text-teal-100 mt-1 leading-relaxed">
            💡 <strong>Lưu ý quan trọng:</strong> Từ &quot;like&quot; ở đây mang nghĩa là &quot;trông như thế nào / có đặc điểm ra sao&quot;, <strong>KHÔNG PHẢI</strong> là động từ &quot;thích&quot;!
          </p>
          <div className="flex flex-wrap gap-2 mt-2 text-xs font-bold text-white">
            <span className="bg-black/20 px-2.5 py-1 rounded-lg">a busy street 🚗</span>
            <span className="bg-black/20 px-2.5 py-1 rounded-lg">a quiet village 🌾</span>
            <span className="bg-black/20 px-2.5 py-1 rounded-lg">a noisy road 📢</span>
            <span className="bg-black/20 px-2.5 py-1 rounded-lg">a big city 🏙️</span>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧' },
          { id: 2, label: '2. Listen, point & say', icon: '🗣️' },
          { id: 3, label: "3. Let's talk", icon: '💬' },
          { id: 4, label: '4. Listen & tick', icon: '✔️' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: "6. Let's sing: My house", icon: '🎵' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-teal-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 4) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt Động 1 · Trang 8
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 4 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát tranh và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullText =
                  'Ben: Where do you live? Minh: I live in Hai Ba Trung Street. Ben: What’s the street like? Minh: It’s a busy street.';
                speakWord(fullText, speechRate);
              }}
              className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-teal-700" /> Nghe cả 2 bức tranh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-teal-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dialog.context}</span>
                </div>

                {/* Speaker A */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-orange-700 flex items-center gap-1">
                      <span>{dialog.avatarA}</span> {dialog.speakerA}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textA, speechRate)}
                      className="p-1 text-slate-400 hover:text-teal-600 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {dialog.textA}
                  </p>
                  <p className="text-[11px] font-mono text-teal-700 font-bold">
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
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-teal-800 flex items-center gap-1">
                      <span>{dialog.avatarB}</span> {dialog.speakerB}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textB, speechRate)}
                      className="p-1 text-slate-400 hover:text-teal-700 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-teal-950 text-sm md:text-base leading-snug">
                    {dialog.textB}
                  </p>
                  <p className="text-[11px] font-mono text-teal-700 font-bold">
                    🗣️ {dialog.ipaB}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingB}&quot;
                  </p>
                  <p className="text-xs text-teal-800/80 italic pt-1 border-t border-teal-200">
                    {dialog.meaningB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 5) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt Động 2 · Trang 8
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 5 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Chỉ tranh và miêu tả đặc điểm)
              </h3>
            </div>
            <div className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
              Mẫu câu: What&apos;s the ... like? - It&apos;s ...
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map(card => {
              const isActive = activeFeatureCard === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveFeatureCard(card.id);
                    speakWord(`${card.question} ${card.answer}`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-teal-500 bg-teal-50/60 shadow-md ring-2 ring-teal-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-black text-xs flex items-center justify-center">
                        {card.key}
                      </span>
                      <span className="text-3xl">{card.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {card.word}
                    </h4>

                    {/* IPA + Reading */}
                    <p className="text-[11px] font-mono text-teal-700 font-bold mb-0.5">
                      🗣️ {card.ipa}
                    </p>
                    <p className="text-[11px] text-indigo-700 font-semibold mb-2">
                      📖 {card.reading}
                    </p>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {card.meaningVi}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] text-slate-500 italic block">{card.desc}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(`${card.question} ${card.answer}`, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
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
              const cur = featureCards.find(c => c.id === activeFeatureCard);
              if (!cur) return null;
              return (
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Cặp câu hỏi đáp hoàn chỉnh ({cur.key}):
                  </span>
                  <p className="text-base font-extrabold text-slate-800">
                    A: {cur.question} ➔ B:{' '}
                    <span className="text-teal-700 underline font-black">{cur.answer}</span>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Phát âm: &quot;{cur.questionReading}&quot; ➔ &quot;{cur.answerReading}&quot;)
                  </p>
                </div>
              );
            })()}
            <button
              onClick={() => {
                const cur = featureCards.find(c => c.id === activeFeatureCard);
                if (cur) speakWord(`${cur.question} ${cur.answer}`, speechRate);
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0"
            >
              <Volume2 className="w-4 h-4" /> Phát âm mẫu
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND TICK (TRACK 6) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt Động 4 · Trang 9
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 6 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick 🎧 (Nghe và đánh dấu chọn bức tranh đúng)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckListenTick}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra đáp án
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setListenTickList(prev => prev.map(i => ({ ...i, userChoice: null })));
                  setListenTickSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {listenTickList.map((item, idx) => {
              const isCorrect = item.userChoice === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-4 ${
                    listenTickSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-teal-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm md:text-base text-slate-800">
                      {idx + 1}. {item.title}
                    </span>
                    <button
                      onClick={() => speakWord(item.audioScript, speechRate)}
                      className="px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-teal-700" /> Nghe Audio Track 6
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.options.map(opt => {
                      const isSelected = item.userChoice === opt.key;
                      const isAnswerKey = item.correctAnswer === opt.key;

                      let optStyle =
                        'border-slate-200 bg-white text-slate-800 hover:border-teal-300';
                      if (isSelected && !listenTickSubmitted) {
                        optStyle = 'border-teal-500 bg-teal-50 text-teal-950 font-bold shadow-xs';
                      }
                      if (listenTickSubmitted) {
                        if (isAnswerKey) {
                          optStyle =
                            'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-400';
                        } else if (isSelected && !isAnswerKey) {
                          optStyle = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectListenTick(item.id, opt.key)}
                          className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition ${optStyle}`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {opt.key.toUpperCase()}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 font-extrabold text-sm">
                              <span>{opt.icon}</span>
                              <span>{opt.label}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {listenTickSubmitted && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-800">{item.explanation}</p>
                      <p className="text-slate-500 italic">
                        Lời thoại mẫu: &quot;{item.audioScript}&quot;
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LET'S SING: "MY HOUSE" (TRACK 7) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 9
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Let&apos;s sing: &quot;My house&quot; 🎵 (Hát vui cùng giai điệu)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Bài hát luyện tập các tính từ miêu tả: small house, quiet street, big town, busy street, big city!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 border-2 border-teal-200 max-w-lg mx-auto space-y-4">
            <div className="text-4xl">🏡 ✨</div>
            <div className="space-y-2 text-slate-800 font-medium leading-relaxed">
              {songLyrics.map((line, idx) => {
                if (line.text === '---') {
                  return <hr key={idx} className="my-3 border-teal-200" />;
                }
                return (
                  <div key={idx} className="group hover:text-teal-700 transition">
                    <p className="font-extrabold text-base md:text-lg">{line.text}</p>
                    <p className="text-xs font-mono text-teal-700 font-semibold">{line.ipa}</p>
                    <p className="text-xs text-indigo-700 font-medium">({line.reading})</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-teal-200">
              <button
                onClick={() => {
                  const song =
                    'I live in a house. It is a small house. In a quiet street. In a big town. I live in a house. It is a small house. In a busy street. In a big city.';
                  speakWord(song, speechRate * 0.95);
                  onAddStar(3);
                }}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition"
              >
                <Music className="w-4 h-4" /> Bật nhạc hát Karaoke &quot;My house&quot; 🎤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
