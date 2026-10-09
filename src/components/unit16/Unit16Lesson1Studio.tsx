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
  CloudRain,
  Wind,
  Cloud,
  Music,
  MapPin,
  Calendar
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit16Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit16Lesson1Studio: React.FC<Unit16Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 52)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Cuối tuần trước bạn ở đâu?',
      speakerA: 'Lucy',
      avatarA: '👱‍♀️',
      textA: 'Hi, Minh. Where were you last weekend?',
      ipaA: '/haɪ, mɪn. weə wɜː juː lɑːst ˌwiːkˈɛnd/',
      readingA: 'Hai, Minh. We-ơ uơ ju lát-st uých-en-đ?',
      meaningA: 'Chào Minh. Cuối tuần trước bạn đã ở đâu vậy?',
      speakerB: 'Minh',
      avatarB: '👦🏻',
      textB: 'I was in Sa Pa.',
      ipaB: '/aɪ wɒz ɪn saː paː/',
      readingB: 'Ai uốt-z in Sa Pa.',
      meaningB: 'Tớ đã ở Sa Pa.',
      speakerExtra: 'Lucy',
      avatarExtra: '👱‍♀️',
      textExtra: 'Great! I like Sa Pa.',
      ipaExtra: '/ɡreɪt! aɪ laɪk saː paː/',
      readingExtra: 'Gờ-rây-t! Ai laik Sa Pa.',
      meaningExtra: 'Tuyệt quá! Tớ rất thích Sa Pa.',
      context: 'Lucy gọi điện hỏi thăm Minh về chuyến đi nghỉ cuối tuần ở Sa Pa.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Thời tiết ở đó như thế nào?',
      speakerA: 'Lucy',
      avatarA: '👱‍♀️',
      textA: 'What was the weather like in Sa Pa?',
      ipaA: '/wɒt wɒz ðə ˈwɛðə laɪk ɪn saː paː/',
      readingA: 'Oát uốt-z đờ ué-đờ laik in Sa Pa?',
      meaningA: 'Thời tiết ở Sa Pa lúc đó như thế nào?',
      speakerB: 'Minh',
      avatarB: '👦🏻',
      textB: 'It was sunny.',
      ipaB: '/ɪt wɒz ˈsʌni/',
      readingB: 'Ít uốt-z săn-ni.',
      meaningB: 'Trời có nắng đẹp.',
      context: 'Minh nhớ lại khung cảnh nhà thờ đá Sa Pa dưới bầu trời nắng vàng rực rỡ.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 53)
  // =========================================================================
  const vocabCards = [
    {
      id: 'rainy',
      word: 'rainy',
      ipa: '/ˈreɪni/',
      reading: 'rây-ni',
      meaningVi: 'có mưa / trời mưa',
      icon: '🌧️',
      color: 'from-blue-500 to-indigo-600',
      sampleQ: 'What was the weather like last weekend?',
      sampleA: 'It was rainy.',
      sampleVi: 'Thời tiết cuối tuần trước thế nào? - Trời có mưa.'
    },
    {
      id: 'windy',
      word: 'windy',
      ipa: '/ˈwɪndi/',
      reading: 'uyn-đi',
      meaningVi: 'có gió / nhiều gió',
      icon: '🍃',
      color: 'from-teal-500 to-cyan-600',
      sampleQ: 'What was the weather like last weekend?',
      sampleA: 'It was windy.',
      sampleVi: 'Thời tiết cuối tuần trước thế nào? - Trời nhiều gió thổi.'
    },
    {
      id: 'sunny',
      word: 'sunny',
      ipa: '/ˈsʌni/',
      reading: 'săn-ni',
      meaningVi: 'có nắng / trời nắng chan hoà',
      icon: '☀️',
      color: 'from-amber-400 to-orange-500',
      sampleQ: 'What was the weather like last weekend?',
      sampleA: 'It was sunny.',
      sampleVi: 'Thời tiết cuối tuần trước thế nào? - Trời có nắng đẹp.'
    },
    {
      id: 'cloudy',
      word: 'cloudy',
      ipa: '/ˈklaʊdi/',
      reading: 'clao-đi',
      meaningVi: 'nhiều mây / trời râm mát',
      icon: '☁️',
      color: 'from-sky-400 to-slate-500',
      sampleQ: 'What was the weather like last weekend?',
      sampleA: 'It was cloudy.',
      sampleVi: 'Thời tiết cuối tuần trước thế nào? - Trời nhiều mây.'
    }
  ];

  const [selectedVocab, setSelectedVocab] = useState(vocabCards[2]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const talkCities = [
    { city: 'Hai Phong', weather: 'cloudy', icon: '☁️', weatherVi: 'nhiều mây' },
    { city: 'Hoi An', weather: 'windy', icon: '🍃', weatherVi: 'nhiều gió' },
    { city: 'Nha Trang', weather: 'rainy', icon: '🌧️', weatherVi: 'có mưa' },
    { city: 'Can Tho', weather: 'sunny', icon: '☀️', weatherVi: 'nắng đẹp' }
  ];
  const [selectedTalkCity, setSelectedTalkCity] = useState(talkCities[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND NUMBER (TRACK 54)
  // =========================================================================
  interface NumberQuestion {
    id: string;
    letter: 'a' | 'b' | 'c' | 'd';
    title: string;
    icon: string;
    descVi: string;
    correctOrder: number;
    audioHint: string;
  }

  const numberItems: NumberQuestion[] = [
    {
      id: 'pic_a',
      letter: 'a',
      title: 'Trời mưa (Rainy)',
      icon: '🌧️',
      descVi: 'Mây đen xám xịt và những hạt mưa rơi',
      correctOrder: 4,
      audioHint: 'Where were you last weekend? - I was in Can Tho. What was the weather like? - It was rainy.'
    },
    {
      id: 'pic_b',
      letter: 'b',
      title: 'Trời nắng (Sunny)',
      icon: '☀️',
      descVi: 'Mặt trời chiếu những tia nắng vàng rực rỡ',
      correctOrder: 2,
      audioHint: 'Where were you last Sunday? - I was in Hue. What was the weather like? - It was sunny.'
    },
    {
      id: 'pic_c',
      letter: 'c',
      title: 'Nhiều mây (Cloudy)',
      icon: '☁️',
      descVi: 'Bầu trời xanh điểm xuyết những đám mây bồng bềnh',
      correctOrder: 3,
      audioHint: 'What was the weather like in Ha Noi yesterday? - It was cloudy.'
    },
    {
      id: 'pic_d',
      letter: 'd',
      title: 'Nhiều gió (Windy)',
      icon: '🍃',
      descVi: 'Gió cuốn theo những chiếc lá bay phấp phới',
      correctOrder: 1,
      audioHint: 'What was the weather like in Da Nang yesterday? - It was windy.'
    }
  ];

  const [userNumbers, setUserNumbers] = useState<Record<string, number | null>>({
    pic_a: null,
    pic_b: null,
    pic_c: null,
    pic_d: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectNumber = (picId: string, num: number) => {
    sound.playClick();
    setUserNumbers(prev => ({ ...prev, [picId]: num }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userNumbers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correctCount = 0;
    numberItems.forEach(item => {
      if (userNumbers[item.id] === item.correctOrder) {
        correctCount++;
      }
    });

    if (correctCount === 4) {
      sound.playComplete();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correctCount);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserNumbers({ pic_a: null, pic_b: null, pic_c: null, pic_d: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  interface FillSentence {
    id: number;
    place: string;
    landmark: string;
    icon: string;
    questionDisplay: string;
    answerDisplay: string;
    correctInputs: Record<string, string>;
    hintVi: string;
  }

  const fillSentences: FillSentence[] = [
    {
      id: 1,
      place: 'Sa Pa',
      landmark: 'Nhà thờ đá Sa Pa',
      icon: '☁️',
      questionDisplay: 'A: What was the weather like in Sa Pa last Sunday?',
      answerDisplay: 'B: It was [input1].',
      correctInputs: { input1: 'cloudy' },
      hintVi: 'Biểu tượng đám mây -> cloudy'
    },
    {
      id: 2,
      place: 'TP. Hồ Chí Minh',
      landmark: 'Chợ Bến Thành',
      icon: '🌧️',
      questionDisplay: 'A: What was the weather like in Ho Chi Minh City yesterday?',
      answerDisplay: 'B: It was [input1].',
      correctInputs: { input1: 'rainy' },
      hintVi: 'Biểu tượng mây mưa rơi -> rainy'
    },
    {
      id: 3,
      place: 'Đà Nẵng',
      landmark: 'Cầu Rồng Đà Nẵng',
      icon: '🍃',
      questionDisplay: 'A: [input1] the weather like in Da Nang yesterday?',
      answerDisplay: 'B: It [input2].',
      correctInputs: { input1: 'What was', input2: 'was windy' },
      hintVi: 'Hỏi: What was... / Trả lời: was windy'
    },
    {
      id: 4,
      place: 'Huế',
      landmark: 'Chùa Thiên Mụ',
      icon: '☀️',
      questionDisplay: 'A: What was the [input1] like in Hue last weekend?',
      answerDisplay: 'B: [input2].',
      correctInputs: { input1: 'weather', input2: 'It was sunny' },
      hintVi: 'Hỏi từ weather / Trả lời: It was sunny'
    }
  ];

  const [userInputs, setUserInputs] = useState<Record<string, string>>({
    '1_input1': '',
    '2_input1': '',
    '3_input1': '',
    '3_input2': '',
    '4_input1': '',
    '4_input2': ''
  });
  const [act5Submitted, setAct5Submitted] = useState<boolean>(false);

  const handleInputChange = (key: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let allRight = true;

    // Check sentence 1
    if (userInputs['1_input1'].trim().toLowerCase() !== 'cloudy') allRight = false;
    // Check sentence 2
    if (userInputs['2_input1'].trim().toLowerCase() !== 'rainy') allRight = false;
    // Check sentence 3
    if (!userInputs['3_input1'].trim().toLowerCase().includes('what was')) allRight = false;
    if (!userInputs['3_input2'].trim().toLowerCase().includes('was windy')) allRight = false;
    // Check sentence 4
    if (!userInputs['4_input1'].trim().toLowerCase().includes('weather')) allRight = false;
    if (!userInputs['4_input2'].trim().toLowerCase().includes('it was sunny')) allRight = false;

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
    setUserInputs({
      '1_input1': '',
      '2_input1': '',
      '3_input1': '',
      '3_input2': '',
      '4_input1': '',
      '4_input2': ''
    });
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 55)
  // =========================================================================
  const songVerses = [
    {
      title: 'Khổ 1 · Ngày Nắng Vàng ☀️',
      lines: [
        { en: 'Weather, weather.', vi: 'Thời tiết ơi, thời tiết à.' },
        { en: 'What was the weather like yesterday?', vi: 'Hôm qua thời tiết như thế nào vậy?' },
        { en: 'It was sunny. It was sunny.', vi: 'Trời có nắng. Trời ngập tràn ánh nắng.' },
        { en: 'It was a sunny day.', vi: 'Hôm qua là một ngày nắng thật đẹp.' }
      ],
      fullText: 'Weather, weather. What was the weather like yesterday? It was sunny. It was sunny. It was a sunny day.'
    },
    {
      title: 'Khổ 2 · Ngày Lộng Gió 🪁',
      lines: [
        { en: 'Weather, weather.', vi: 'Thời tiết ơi, thời tiết à.' },
        { en: 'What was the weather like yesterday?', vi: 'Hôm qua thời tiết như thế nào vậy?' },
        { en: 'It was windy. It was windy.', vi: 'Trời lộng gió. Gió thổi vi vu.' },
        { en: 'It was a windy day.', vi: 'Hôm qua là một ngày lộng gió thả diều thật vui.' }
      ],
      fullText: 'Weather, weather. What was the weather like yesterday? It was windy. It was windy. It was a windy day.'
    }
  ];

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
                  ? 'bg-amber-500 text-white shadow-xs'
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
              className="px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition flex items-center gap-1 border border-orange-200"
            >
              <span>Tiết 2: Rủ Bạn Đi Chơi ➡️</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                Trang 40 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 52</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-500" />
              1. Look, listen and repeat (Nhìn tranh, nghe và nhắc lại)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lucy gọi điện hỏi Minh về chuyến đi Sa Pa và thời tiết ở đó vào cuối tuần trước.
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                'Hi, Minh. Where were you last weekend? I was in Sa Pa. Great! I like Sa Pa. What was the weather like in Sa Pa? It was sunny.',
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-yellow-50/30 rounded-3xl p-5 md:p-6 border-2 border-amber-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-800">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-amber-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-amber-50 text-amber-600 transition"
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

              {/* Optional Extra Line */}
              {step.textExtra && (
                <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{step.avatarExtra}</span>
                      <span className="font-bold text-xs text-amber-700">{step.speakerExtra}:</span>
                    </div>
                    <button
                      onClick={() => speakWord(step.textExtra, speechRate)}
                      className="p-1 rounded-lg hover:bg-amber-50 text-amber-600 transition"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
              Trang 40 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 53</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500" />
            2. Listen, point and say (Lắng nghe, chỉ tranh và phát âm)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Mẫu câu hỏi thời tiết quá khứ: <strong>What was the weather like last weekend? - It was...</strong>
          </p>
        </div>

        {/* 4 Weather Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vocabCards.map(c => {
            const isSelected = selectedVocab.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedVocab(c);
                  speakWord(c.word, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/20'
                }`}
              >
                <span className="text-5xl my-2">{c.icon}</span>
                <span className="font-black text-lg text-slate-800">{c.word}</span>
                <span className="text-xs font-mono text-slate-400 mt-0.5">{c.ipa}</span>
                <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md mt-1">
                  {c.reading}
                </span>
                <span className="text-xs text-slate-500 mt-1">{c.meaningVi}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Sentence Practice Stage */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 border-2 border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl">{selectedVocab.icon}</span>
              <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                Thực hành mẫu câu với từ: &quot;{selectedVocab.word}&quot;
              </span>
            </div>
            <p className="font-extrabold text-base md:text-lg text-slate-800">
              Q: What was the weather like last weekend?
            </p>
            <p className="font-extrabold text-lg md:text-xl text-amber-700">
              A: It was {selectedVocab.word}.
            </p>
            <p className="text-xs text-slate-600 italic">💡 {selectedVocab.sampleVi}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`What was the weather like last weekend? It was ${selectedVocab.word}.`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu mẫu 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-amber-800 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition active:scale-95"
            >
              <span>Bé đã đọc to! (+1 ⭐)</span>
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
              Trang 40 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Luyện Nói</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-teal-600" />
            3. Let’s talk (Hỏi thời tiết ngày hôm qua tại các thành phố)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn thành phố để hỏi và trả lời: <em>What was the weather like yesterday? - It was...</em>
          </p>
        </div>

        {/* 4 Cities Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {talkCities.map(item => {
            const isCitySelected = selectedTalkCity.city === item.city;
            return (
              <button
                key={item.city}
                onClick={() => {
                  sound.playClick();
                  setSelectedTalkCity(item);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isCitySelected
                    ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <span className="text-4xl mb-1">{item.icon}</span>
                <span className="font-extrabold text-sm text-slate-800">{item.city}</span>
                <span className="text-xs font-bold text-teal-700 capitalize mt-0.5">
                  {item.weather}
                </span>
                <span className="text-[11px] text-slate-400">({item.weatherVi})</span>
              </button>
            );
          })}
        </div>

        {/* Speech Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-teal-700">
              Hội thoại tại {selectedTalkCity.city} {selectedTalkCity.icon}:
            </span>
            <p className="font-black text-base text-slate-800">
              Q: What was the weather like yesterday in {selectedTalkCity.city}?
            </p>
            <p className="font-black text-base text-teal-700">
              A: It was {selectedTalkCity.weather}.
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                `What was the weather like yesterday in ${selectedTalkCity.city}? It was ${selectedTalkCity.weather}.`,
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
      {/* ACTIVITY 4: LISTEN AND NUMBER (TRACK 54) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 41 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 54</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              4. Listen and number (Nghe và đánh số 1, 2, 3, 4 vào ô vuông)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Nghe từng câu thoại và chọn số thứ tự (1 - 4) cho mỗi bức tranh thời tiết dưới đây.
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

        {/* 4 Picture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {numberItems.map(item => {
            const userNum = userNumbers[item.id];
            const isCorrect = userNum === item.correctOrder;

            let cardStyle = 'border-slate-200 bg-white hover:border-indigo-300';
            if (act4Submitted) {
              cardStyle = isCorrect
                ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-300'
                : 'border-rose-400 bg-rose-50/30';
            }

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center uppercase">
                      {item.letter}
                    </span>
                    <button
                      onClick={() => speakWord(item.audioHint, speechRate)}
                      className="p-1 text-slate-500 hover:text-indigo-600 transition"
                      title="Nghe gợi ý âm thanh"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center my-3">
                    <span className="text-6xl">{item.icon}</span>
                    <h5 className="font-extrabold text-sm text-slate-800 mt-2">{item.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{item.descVi}</p>
                  </div>
                </div>

                {/* Number selector buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block text-center mb-1.5">
                    Chọn số thứ tự:
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => handleSelectNumber(item.id, n)}
                        disabled={act4Submitted}
                        className={`py-1.5 rounded-xl font-black text-xs transition ${
                          userNum === n
                            ? act4Submitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  {act4Submitted && (
                    <div className="mt-2 text-center text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700">✓ Đúng (Vị trí số {item.correctOrder})</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                Trang 41 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              5. Look, complete and read (Quan sát tranh và hoàn thành câu)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Quan sát danh lam thắng cảnh 4 thành phố và biểu tượng thời tiết để điền từ đúng vào chỗ trống.
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

        {/* 4 Exercise Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☁️</span>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-800">1. Sa Pa (Nhà thờ đá)</h5>
                  <span className="text-xs text-slate-500">Biểu tượng: mây</span>
                </div>
              </div>
              <button
                onClick={() =>
                  speakWord('What was the weather like in Sa Pa last Sunday? It was cloudy.', speechRate)
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              A: What was the weather like in Sa Pa last Sunday?
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It was</span>
              <input
                type="text"
                value={userInputs['1_input1']}
                onChange={e => handleInputChange('1_input1', e.target.value)}
                placeholder="cloudy..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                {userInputs['1_input1'].trim().toLowerCase() === 'cloudy' ? '✓ Chính xác!' : '✕ Đáp án: cloudy'}
              </p>
            )}
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌧️</span>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-800">2. TP. Hồ Chí Minh (Chợ Bến Thành)</h5>
                  <span className="text-xs text-slate-500">Biểu tượng: mưa rơi</span>
                </div>
              </div>
              <button
                onClick={() =>
                  speakWord(
                    'What was the weather like in Ho Chi Minh City yesterday? It was rainy.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              A: What was the weather like in Ho Chi Minh City yesterday?
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It was</span>
              <input
                type="text"
                value={userInputs['2_input1']}
                onChange={e => handleInputChange('2_input1', e.target.value)}
                placeholder="rainy..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                {userInputs['2_input1'].trim().toLowerCase() === 'rainy' ? '✓ Chính xác!' : '✕ Đáp án: rainy'}
              </p>
            )}
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍃</span>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-800">3. Đà Nẵng (Cầu Rồng)</h5>
                  <span className="text-xs text-slate-500">Biểu tượng: gió lộng</span>
                </div>
              </div>
              <button
                onClick={() =>
                  speakWord(
                    'What was the weather like in Da Nang yesterday? It was windy.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={userInputs['3_input1']}
                onChange={e => handleInputChange('3_input1', e.target.value)}
                placeholder="What was..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>the weather like in Da Nang yesterday?</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It</span>
              <input
                type="text"
                value={userInputs['3_input2']}
                onChange={e => handleInputChange('3_input2', e.target.value)}
                placeholder="was windy..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án chuẩn: &quot;What was&quot; / &quot;was windy&quot;
              </p>
            )}
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-800">4. Huế (Chùa Thiên Mụ)</h5>
                  <span className="text-xs text-slate-500">Biểu tượng: mặt trời nắng</span>
                </div>
              </div>
              <button
                onClick={() =>
                  speakWord(
                    'What was the weather like in Hue last weekend? It was sunny.',
                    speechRate
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: What was the</span>
              <input
                type="text"
                value={userInputs['4_input1']}
                onChange={e => handleInputChange('4_input1', e.target.value)}
                placeholder="weather..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>like in Hue last weekend?</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B:</span>
              <input
                type="text"
                value={userInputs['4_input2']}
                onChange={e => handleInputChange('4_input2', e.target.value)}
                placeholder="It was sunny..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-36 bg-white"
              />
              <span>.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án chuẩn: &quot;weather&quot; / &quot;It was sunny&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S SING (TRACK 55) */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Bài Hát SGK Trang 41 · Track 55
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <Music className="w-7 h-7" />
              What was the weather like yesterday? 🎶
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Hát vui nhộn cùng giai điệu tiếng Anh để ghi nhớ mãi mẫu câu hỏi thời tiết!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              speakWord(
                'Weather, weather. What was the weather like yesterday? It was sunny. It was sunny. It was a sunny day. Weather, weather. What was the weather like yesterday? It was windy. It was windy. It was a windy day.',
                speechRate
              )
            }}
            className="px-6 py-3 rounded-2xl bg-white text-amber-700 font-black text-sm hover:bg-amber-50 shadow-md transition active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Hát Toàn Bài 🎤</span>
          </button>
        </div>

        {/* 2 Verses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songVerses.map((verse, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <h4 className="font-black text-base">{verse.title}</h4>
                <button
                  onClick={() => speakWord(verse.fullText, speechRate)}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe khổ {idx + 1}
                </button>
              </div>

              <div className="space-y-2 text-sm leading-relaxed">
                {verse.lines.map((ln, lIdx) => (
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
