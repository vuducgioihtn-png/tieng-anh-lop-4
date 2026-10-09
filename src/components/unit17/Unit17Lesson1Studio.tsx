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
  ArrowUp,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  ShieldAlert,
  Music,
  MapPin,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit17Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit17Lesson1Studio: React.FC<Unit17Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 62)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Tín hiệu đèn xanh (Go)',
      speakerA: 'Teacher',
      avatarA: '👨‍🏫',
      textA: 'What does it say?',
      ipaA: '/wɒt dʌz ɪt seɪ/',
      readingA: 'Oát đắt-z ít sây?',
      meaningA: 'Tín hiệu này có nghĩa là gì / báo điều gì?',
      speakerB: 'Boy',
      avatarB: '👦',
      textB: 'It says \'go\'.',
      ipaB: '/ɪt sɛz ɡəʊ/',
      readingB: 'Ít sét-z gâu.',
      meaningB: 'Tín hiệu báo là "được đi".',
      context: 'Thầy giáo chỉ vào hình đèn tín hiệu cho người đi bộ màu xanh có hình người đang bước đi.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Tín hiệu đèn đỏ (Stop)',
      speakerA: 'Teacher',
      avatarA: '👨‍🏫',
      textA: 'What does it say?',
      ipaA: '/wɒt dʌz ɪt seɪ/',
      readingA: 'Oát đắt-z ít sây?',
      meaningA: 'Còn tín hiệu này báo điều gì?',
      speakerB: 'Girl',
      avatarB: '👧',
      textB: 'It says \'stop\'.',
      ipaB: '/ɪt sɛz stɒp/',
      readingB: 'Ít sét-z s-tóp.',
      meaningB: 'Tín hiệu báo là "hãy dừng lại".',
      context: 'Thầy giáo chỉ vào hình đèn tín hiệu màu đỏ có hình người đứng yên.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 63)
  // =========================================================================
  const trafficSigns = [
    {
      id: 'stop',
      word: 'stop',
      ipa: '/stɒp/',
      reading: 's-tóp',
      meaningVi: 'dừng lại',
      icon: '🛑',
      shape: 'Đèn đỏ / Biển báo dừng',
      bgColor: 'from-rose-500 to-red-600',
      sampleQ: 'What does it say?',
      sampleA: "It says 'stop'.",
      sampleVi: 'Biển báo này nói gì? - Nó báo là "dừng lại".'
    },
    {
      id: 'go_straight',
      word: 'go straight',
      ipa: '/ɡəʊ streɪt/',
      reading: 'gâu s-trây-t',
      meaningVi: 'đi thẳng về phía trước',
      icon: '⬆️',
      shape: 'Biển tròn xanh mũi tên thẳng',
      bgColor: 'from-blue-500 to-indigo-600',
      sampleQ: 'What does it say?',
      sampleA: "It says 'go straight'.",
      sampleVi: 'Biển báo này nói gì? - Nó báo là "hãy đi thẳng".'
    },
    {
      id: 'turn_right',
      word: 'turn right',
      ipa: '/tɜːn raɪt/',
      reading: 'tơn rai-t',
      meaningVi: 'rẽ phải',
      icon: '➡️',
      shape: 'Biển tròn xanh mũi tên rẽ phải',
      bgColor: 'from-teal-500 to-emerald-600',
      sampleQ: 'What does it say?',
      sampleA: "It says 'turn right'.",
      sampleVi: 'Biển báo này nói gì? - Nó báo là "hãy rẽ phải".'
    },
    {
      id: 'turn_left',
      word: 'turn left',
      ipa: '/tɜːn lɛft/',
      reading: 'tơn lép-ft',
      meaningVi: 'rẽ trái',
      icon: '⬅️',
      shape: 'Biển tròn xanh mũi tên rẽ trái',
      bgColor: 'from-purple-500 to-fuchsia-600',
      sampleQ: 'What does it say?',
      sampleA: "It says 'turn left'.",
      sampleVi: 'Biển báo này nói gì? - Nó báo là "hãy rẽ trái".'
    }
  ];

  const [selectedSign, setSelectedSign] = useState(trafficSigns[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const schoolSigns = [
    { name: 'go straight', icon: '⬆️', desc: 'Biển đi thẳng trước cổng trường', answer: "It says 'go straight'." },
    { name: 'turn left', icon: '⬅️', desc: 'Biển rẽ trái vào ngõ trường', answer: "It says 'turn left'." },
    { name: 'turn right', icon: '➡️', desc: 'Biển rẽ phải qua đường lớn', answer: "It says 'turn right'." },
    { name: 'stop', icon: '🛑', desc: 'Cột đèn tín hiệu dừng xe', answer: "It says 'stop'." }
  ];
  const [activeSchoolSign, setActiveSchoolSign] = useState(schoolSigns[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK OR CROSS (TRACK 64)
  // =========================================================================
  interface SignQuizItem {
    id: number;
    title: string;
    signName: string;
    icon: string;
    audioText: string;
    isMatching: boolean; // true = tick ✓, false = cross ✕
    explanation: string;
  }

  const tickCrossItems: SignQuizItem[] = [
    {
      id: 1,
      title: 'Biển số 1',
      signName: 'Turn right (Mũi tên rẽ phải)',
      icon: '➡️',
      audioText: 'What does it say? - It says \'turn right\'.',
      isMatching: true,
      explanation: 'Trong băng nói: "It says \'turn right\'", khớp với hình mũi tên rẽ phải -> Chọn Tick ✓.'
    },
    {
      id: 2,
      title: 'Biển số 2',
      signName: 'Turn left (Mũi tên rẽ trái)',
      icon: '⬅️',
      audioText: 'What does it say? - It says \'turn right\'.',
      isMatching: false,
      explanation: 'Trong băng nói: "It says \'turn right\'", nhưng tranh là rẽ trái (turn left) -> Chọn Cross ✕.'
    },
    {
      id: 3,
      title: 'Biển số 3',
      signName: 'Go straight (Mũi tên đi thẳng)',
      icon: '⬆️',
      audioText: 'What does it say? - It says \'go straight\'.',
      isMatching: true,
      explanation: 'Trong băng nói: "It says \'go straight\'", khớp với hình đi thẳng -> Chọn Tick ✓.'
    },
    {
      id: 4,
      title: 'Biển số 4',
      signName: 'Traffic light (Đèn tín hiệu dừng)',
      icon: '🛑',
      audioText: 'What does it say? - It says \'go\'.',
      isMatching: false,
      explanation: 'Trong tranh là đèn đỏ dừng (stop), nhưng băng nói "It says \'go\'" -> Chọn Cross ✕.'
    }
  ];

  const [userTickCross, setUserTickCross] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectTickCross = (id: number, val: boolean) => {
    sound.playClick();
    setUserTickCross(prev => ({ ...prev, [id]: val }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userTickCross).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    tickCrossItems.forEach(item => {
      if (userTickCross[item.id] === item.isMatching) {
        correct++;
      }
    });

    if (correct === 4) {
      sound.playComplete();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserTickCross({ 1: null, 2: null, 3: null, 4: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ
  // =========================================================================
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3_1, setInput3_1] = useState('');
  const [input3_2, setInput3_2] = useState('');
  const [input4_1, setInput4_1] = useState('');
  const [input4_2, setInput4_2] = useState('');
  const [act5Submitted, setAct5Submitted] = useState(false);

  const handleCheckAct5 = () => {
    setAct5Submitted(true);
    let allRight = true;

    if (input1.trim().toLowerCase() !== 'stop') allRight = false;
    if (input2.trim().toLowerCase() !== 'go straight') allRight = false;
    if (input3_1.trim().toLowerCase() !== 'what' && input3_1.trim().toLowerCase() !== 'what does') allRight = false;
    if (!input3_2.trim().toLowerCase().includes('turn right')) allRight = false;
    if (input4_1.trim().toLowerCase() !== 'say') allRight = false;
    if (!input4_2.trim().toLowerCase().includes('turn left')) allRight = false;

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
    setInput1('');
    setInput2('');
    setInput3_1('');
    setInput3_2('');
    setInput4_1('');
    setInput4_2('');
    setAct5Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 6: LET'S SING (TRACK 65)
  // =========================================================================
  const songStanzas = [
    {
      title: 'Khổ 1 · Khi Đèn Đỏ Bật Sáng (The light is red) 🛑',
      lines: [
        { en: 'When I cross the road,', vi: 'Khi em bước qua đường,' },
        { en: 'I stop, look, listen and think.', vi: 'Em dừng lại, quan sát, lắng nghe và suy nghĩ.' },
        { en: 'The light is red. The light is red.', vi: 'Đèn đang màu đỏ. Đèn báo hiệu màu đỏ.' },
        { en: 'What does it say?', vi: 'Tín hiệu đó nói gì nào?' },
        { en: 'It says \'stop\', \'stop\', \'stop\'.', vi: 'Tín hiệu báo là: \'Dừng lại\', \'Dừng lại\', \'Dừng lại\'!' }
      ],
      fullText: 'When I cross the road, I stop, look, listen and think. The light is red. The light is red. What does it say? It says stop, stop, stop.'
    },
    {
      title: 'Khổ 2 · Khi Đèn Xanh Bật Sáng (The light is green) 🟢',
      lines: [
        { en: 'When I cross the road,', vi: 'Khi em bước qua đường,' },
        { en: 'I stop, look, listen and think.', vi: 'Em dừng lại, quan sát, lắng nghe và suy nghĩ.' },
        { en: 'The light is green. The light is green.', vi: 'Đèn đã chuyển màu xanh. Đèn màu xanh an toàn.' },
        { en: 'What does it say?', vi: 'Tín hiệu đó nói gì nào?' },
        { en: 'It says \'go\', \'go\', \'go\'.', vi: 'Tín hiệu báo là: \'Được đi\', \'Được đi\', \'Được đi\'!' }
      ],
      fullText: 'When I cross the road, I stop, look, listen and think. The light is green. The light is green. What does it say? It says go, go, go.'
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
                  ? 'bg-teal-600 text-white shadow-xs'
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
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition flex items-center gap-1 border border-teal-200"
            >
              <span>Tiết 2: Hỏi &amp; Chỉ Đường ➡️</span>
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
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                Trang 46 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 62</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-600" />
              1. Look, listen and repeat (Tín hiệu giao thông nói gì?)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Thầy giáo hướng dẫn học sinh đọc hiểu tín hiệu đèn giao thông người đi bộ (Đèn xanh: go / Đèn đỏ: stop).
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(
                "What does it say? It says 'go'. What does it say? It says 'stop'.",
                speechRate
              )
            }
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
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
              className="bg-gradient-to-br from-teal-50/40 via-cyan-50/20 to-emerald-50/30 rounded-3xl p-5 md:p-6 border-2 border-teal-200/80 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-teal-200/60">
                <span className="font-extrabold text-xs uppercase tracking-wider text-teal-800">
                  {step.part}
                </span>
                <span className="text-xs text-slate-500 italic">💡 {step.context}</span>
              </div>

              {/* Line 1 */}
              <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.avatarA}</span>
                    <span className="font-bold text-xs text-teal-700">{step.speakerA}:</span>
                  </div>
                  <button
                    onClick={() => speakWord(step.textA, speechRate)}
                    className="p-1 rounded-lg hover:bg-teal-50 text-teal-600 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-extrabold text-sm md:text-base text-slate-800">{step.textA}</p>
                <p className="text-[11px] font-mono text-slate-400">{step.ipaA}</p>
                <p className="text-xs text-teal-900 font-medium bg-teal-50/60 px-2 py-0.5 rounded-md inline-block">
                  🗣️ Đọc bồi: {step.readingA}
                </p>
                <p className="text-xs text-slate-600 italic">Dịch: {step.meaningA}</p>
              </div>

              {/* Line 2 */}
              <div className="bg-white p-3.5 rounded-2xl border border-teal-100 shadow-2xs space-y-1">
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
              Trang 46 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 63</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
            2. Listen, point and say (4 Biển báo &amp; Tín hiệu giao thông cơ bản)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Mẫu câu hỏi: <strong>What does it say?</strong> ➡️ Trả lời: <strong>It says &apos;______&apos;.</strong>
          </p>
        </div>

        {/* 4 Signs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trafficSigns.map(sign => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedSign(sign);
                  speakWord(sign.word, speechRate);
                }}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/40 ring-2 ring-teal-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/20'
                }`}
              >
                <span className="text-5xl my-2">{sign.icon}</span>
                <span className="font-black text-lg text-slate-800">{sign.word}</span>
                <span className="text-xs font-mono text-slate-400 mt-0.5">{sign.ipa}</span>
                <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md mt-1">
                  {sign.reading}
                </span>
                <span className="text-xs text-slate-500 mt-1">{sign.meaningVi}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">({sign.shape})</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Practice Stage */}
        <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl p-6 border-2 border-teal-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl">{selectedSign.icon}</span>
              <span className="text-xs font-black uppercase text-teal-800 tracking-wider">
                Thực hành mẫu câu với biển báo: &quot;{selectedSign.word}&quot;
              </span>
            </div>
            <p className="font-extrabold text-base md:text-lg text-slate-800">
              Q: What does it say?
            </p>
            <p className="font-extrabold text-lg md:text-xl text-teal-700">
              A: It says &apos;{selectedSign.word}&apos;.
            </p>
            <p className="text-xs text-slate-600 italic">💡 {selectedSign.sampleVi}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                speakWord(`What does it say? It says ${selectedSign.word}.`, speechRate)
              }
              className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe câu mẫu 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playSuccess();
                onAddStar(1);
              }}
              className="px-4 py-3 rounded-2xl bg-white text-teal-800 border border-teal-300 font-bold text-xs hover:bg-teal-100 transition active:scale-95"
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
              Trang 46 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Sa Bàn Cổng Trường</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-600" />
            3. Let’s talk (Quan sát biển báo quanh trường học)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm chọn biển báo trên đường để nghe câu hỏi và câu trả lời chỉ dẫn an toàn!
          </p>
        </div>

        {/* 4 School Signs Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {schoolSigns.map(item => {
            const isSignSelected = activeSchoolSign.name === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  sound.playClick();
                  setActiveSchoolSign(item);
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                  isSignSelected
                    ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                <span className="text-4xl mb-1">{item.icon}</span>
                <span className="font-extrabold text-sm text-slate-800 capitalize">{item.name}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 text-center">{item.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Speech Sandbox */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-indigo-700">
              Chỉ dẫn biển báo: {activeSchoolSign.icon} {activeSchoolSign.name}
            </span>
            <p className="font-black text-base text-slate-800">
              Q: What does it say?
            </p>
            <p className="font-black text-base text-indigo-700">
              A: {activeSchoolSign.answer}
            </p>
          </div>

          <button
            onClick={() =>
              speakWord(`What does it say? ${activeSchoolSign.answer}`, speechRate)
            }
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-sm shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe mẫu phản xạ 🔊</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: LISTEN AND TICK OR CROSS (TRACK 64) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                Trang 47 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Track 64</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              4. Listen and tick or cross (Nghe và đánh dấu ✓ hoặc ✕)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Nghe câu thoại trong băng xem có khớp với hình biển báo hiển thị không nhé!
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
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+4 ⭐)
            </button>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tickCrossItems.map(item => {
            const userChoice = userTickCross[item.id];
            const isCorrect = userChoice === item.isMatching;

            let cardStyle = 'border-slate-200 bg-white hover:border-blue-300';
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
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                      {item.id}
                    </span>
                    <button
                      onClick={() => speakWord(item.audioText, speechRate)}
                      className="p-1 text-slate-500 hover:text-blue-600 transition"
                      title="Nghe câu thoại"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center my-3">
                    <span className="text-6xl">{item.icon}</span>
                    <h5 className="font-extrabold text-sm text-slate-800 mt-2">{item.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{item.signName}</p>
                  </div>
                </div>

                {/* Tick or cross buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block text-center mb-1.5">
                    Khớp nội dung băng?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSelectTickCross(item.id, true)}
                      disabled={act4Submitted}
                      className={`py-2 rounded-xl font-black text-xs transition flex items-center justify-center gap-1 ${
                        userChoice === true
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                      }`}
                    >
                      <span>✓ Tick</span>
                    </button>
                    <button
                      onClick={() => handleSelectTickCross(item.id, false)}
                      disabled={act4Submitted}
                      className={`py-2 rounded-xl font-black text-xs transition flex items-center justify-center gap-1 ${
                        userChoice === false
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-rose-50'
                      }`}
                    >
                      <span>✕ Cross</span>
                    </button>
                  </div>

                  {act4Submitted && (
                    <div className="mt-2 text-center text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700">✓ Chính xác!</span>
                      ) : (
                        <span className="text-rose-600">✕ Đáp án đúng: {item.isMatching ? 'Tick ✓' : 'Cross ✕'}</span>
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
                Trang 47 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Điền Từ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              5. Look, complete and read (Quan sát biển báo và điền từ)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Quan sát 4 hình ảnh thực tế để hoàn thành các câu hỏi đáp chỉ dẫn giao thông.
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

        {/* 4 Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛑</span>
                <span className="font-extrabold text-sm text-slate-800">1. Đèn đỏ dừng trước đường ray</span>
              </div>
              <button
                onClick={() => speakWord("What does it say? It says 'stop'.", speechRate)}
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: What does it say?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It says &apos;</span>
              <input
                type="text"
                value={input1}
                onChange={e => setInput1(e.target.value)}
                placeholder="stop..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
              />
              <span>&apos;.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                {input1.trim().toLowerCase() === 'stop' ? '✓ Chính xác!' : "✕ Đáp án: 'stop'"}
              </p>
            )}
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⬆️</span>
                <span className="font-extrabold text-sm text-slate-800">2. Biển báo đi thẳng</span>
              </div>
              <button
                onClick={() => speakWord("What does it say? It says 'go straight'.", speechRate)}
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 font-medium">A: What does it say?</p>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span>B: It says &apos;</span>
              <input
                type="text"
                value={input2}
                onChange={e => setInput2(e.target.value)}
                placeholder="go straight..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>&apos;.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                {input2.trim().toLowerCase() === 'go straight' ? '✓ Chính xác!' : "✕ Đáp án: 'go straight'"}
              </p>
            )}
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">➡️</span>
                <span className="font-extrabold text-sm text-slate-800">3. Biển báo rẽ phải</span>
              </div>
              <button
                onClick={() => speakWord("What does it say? It says 'turn right'.", speechRate)}
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A:</span>
              <input
                type="text"
                value={input3_1}
                onChange={e => setInput3_1(e.target.value)}
                placeholder="What..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>does it say?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It says &apos;</span>
              <input
                type="text"
                value={input3_2}
                onChange={e => setInput3_2(e.target.value)}
                placeholder="turn right..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>&apos;.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;What&quot; / &quot;turn right&quot;
              </p>
            )}
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⬅️</span>
                <span className="font-extrabold text-sm text-slate-800">4. Biển báo rẽ trái</span>
              </div>
              <button
                onClick={() => speakWord("What does it say? It says 'turn left'.", speechRate)}
                className="p-1 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>A: What does it</span>
              <input
                type="text"
                value={input4_1}
                onChange={e => setInput4_1(e.target.value)}
                placeholder="say..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-20 bg-white"
              />
              <span>?</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span>B: It says &apos;</span>
              <input
                type="text"
                value={input4_2}
                onChange={e => setInput4_2(e.target.value)}
                placeholder="turn left..."
                className="px-2.5 py-1 rounded-xl border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
              />
              <span>&apos;.</span>
            </div>
            {act5Submitted && (
              <p className="text-xs font-bold text-emerald-700">
                Đáp án: &quot;say&quot; / &quot;turn left&quot;
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: LET'S SING (TRACK 65) */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Bài Hát Giao Thông · Track 65
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <Music className="w-7 h-7" />
              When I cross the road 🚦🎶
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Hát cùng cô chú cảnh sát giao thông để ghi nhớ kỹ năng sang đường an toàn!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              speakWord(
                "When I cross the road, I stop, look, listen and think. The light is red. The light is red. What does it say? It says stop, stop, stop. When I cross the road, I stop, look, listen and think. The light is green. The light is green. What does it say? It says go, go, go.",
                speechRate
              );
            }}
            className="px-6 py-3 rounded-2xl bg-white text-teal-800 font-black text-sm hover:bg-teal-50 shadow-md transition active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Hát Toàn Bài 🎤</span>
          </button>
        </div>

        {/* 2 Verses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {songStanzas.map((st, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <h4 className="font-black text-base">{st.title}</h4>
                <button
                  onClick={() => speakWord(st.fullText, speechRate)}
                  className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe khổ {idx + 1}
                </button>
              </div>

              <div className="space-y-1.5 text-sm leading-relaxed">
                {st.lines.map((ln, lIdx) => (
                  <div key={lIdx}>
                    <p className="font-bold text-white text-base">{ln.en}</p>
                    <p className="text-xs text-teal-100/80 italic">{ln.vi}</p>
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
