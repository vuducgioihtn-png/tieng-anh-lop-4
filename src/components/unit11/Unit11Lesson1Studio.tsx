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
  MapPin,
  Home,
  Navigation,
  Compass,
  Mic,
  MessageSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit11Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit11Lesson1Studio: React.FC<Unit11Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 1) - DIALOGUES
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a',
      speakerA: 'Lucy',
      avatarA: '👧🏼',
      textA: 'My birthday party is on Sunday. Can you come to my party?',
      ipaA: '/maɪ ˈbɜːθdeɪ ˈpɑːti ɪz ɒn ˈsʌndeɪ. kæn juː kʌm tuː maɪ ˈpɑːti/',
      readingA: 'Mai bớt-đây pa-ti iz on Xăn-đê. Kæn diu căm tu mai pa-ti?',
      meaningA: 'Tiệc sinh nhật của tớ vào Chủ nhật. Bạn có thể đến dự tiệc của tớ không?',
      speakerB: 'Nam',
      avatarB: '👦🏻',
      textB: 'Yes, I can.',
      ipaB: '/jes, aɪ kæn/',
      readingB: 'Dét, ai kæn.',
      meaningB: 'Có chứ, tớ có thể đến được.',
      context: 'Lucy đưa thiệp mời sinh nhật cho bạn Nam ở hành lang lớp học.'
    },
    {
      id: 'step_b',
      part: 'Tranh b',
      speakerA: 'Lucy',
      avatarA: '👧🏼',
      textA: 'Where do you live?',
      ipaA: '/weər duː juː lɪv/',
      readingA: 'Que-ơ đu diu lív?',
      meaningA: 'Bạn sống ở đâu vậy Nam?',
      speakerB: 'Nam',
      avatarB: '👦🏻',
      textB: 'I live in Tran Hung Dao Street.',
      ipaB: '/aɪ lɪv ɪn trɑːn hʊŋ daʊ striːt/',
      readingB: 'Ai lív in Trần Hưng Đạo s-trít.',
      meaningB: 'Tớ sống ở phố Trần Hưng Đạo.',
      context: 'Lucy hỏi địa chỉ để chuẩn bị gửi thiệp và qua đón Nam. Nam nhớ đến biển tên phố Trần Hưng Đạo.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 2) - 4 CARDS (IN vs AT)
  // =========================================================================
  const streetCards = [
    {
      id: 'card_a',
      label: 'a',
      title: 'in Tran Hung Dao Street',
      fullSentence: 'I live in Tran Hung Dao Street.',
      ipa: '/aɪ lɪv ɪn trɑːn hʊŋ daʊ striːt/',
      reading: 'Ai lív in Trần Hưng Đạo s-trít',
      meaningVi: 'Tớ sống ở phố Trần Hưng Đạo.',
      prep: 'in',
      prepNote: 'Chỉ tên đường phố (chưa có số nhà) -> Dùng giới từ "IN"',
      streetType: 'Street (Phố)',
      icon: '🛣️',
      color: 'border-blue-300 bg-blue-50/50 text-blue-900',
      badge: 'bg-blue-600'
    },
    {
      id: 'card_b',
      label: 'b',
      title: 'in Quang Trung Road',
      fullSentence: 'I live in Quang Trung Road.',
      ipa: '/aɪ lɪv ɪn kwɑːŋ trʊŋ rəʊd/',
      reading: 'Ai lív in Quang Trung râu-đ',
      meaningVi: 'Tớ sống ở đường Quang Trung.',
      prep: 'in',
      prepNote: 'Chỉ tuyến đường (chưa có số nhà) -> Dùng giới từ "IN"',
      streetType: 'Road (Đường)',
      icon: '🛤️',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-900',
      badge: 'bg-emerald-600'
    },
    {
      id: 'card_c',
      label: 'c',
      title: 'at 81 Tran Hung Dao Street',
      fullSentence: 'I live at 81 Tran Hung Dao Street.',
      ipa: '/aɪ lɪv æt ˈeɪti wʌn trɑːn hʊŋ daʊ striːt/',
      reading: 'Ai lív ét ê-ti uăn Trần Hưng Đạo s-trít',
      meaningVi: 'Tớ sống tại số 81 phố Trần Hưng Đạo.',
      prep: 'at',
      prepNote: 'Có số nhà 81 cụ thể (địa chỉ chính xác) -> Bắt buộc dùng "AT"',
      streetType: 'House 81 Street',
      icon: '🏡',
      color: 'border-amber-300 bg-amber-50/50 text-amber-900',
      badge: 'bg-amber-600'
    },
    {
      id: 'card_d',
      label: 'd',
      title: 'at 9 Quang Trung Road',
      fullSentence: 'I live at 9 Quang Trung Road.',
      ipa: '/aɪ lɪv æt naɪn kwɑːŋ trʊŋ rəʊd/',
      reading: 'Ai lív ét nai-n Quang Trung râu-đ',
      meaningVi: 'Tớ sống tại số 9 đường Quang Trung.',
      prep: 'at',
      prepNote: 'Có số nhà 9 cụ thể -> Bắt buộc dùng giới từ "AT"',
      streetType: 'House 9 Road',
      icon: '🏠',
      color: 'border-rose-300 bg-rose-50/50 text-rose-900',
      badge: 'bg-rose-600'
    }
  ];

  const [activeStreetCard, setActiveStreetCard] = useState<string>('card_a');

  // =========================================================================
  // ACTIVITY 3: LET'S TALK - MAP INTERACTIVE ADDRESS EXPLORER
  // =========================================================================
  const mapLocations = [
    {
      id: 'loc_chu_van_an',
      name: 'Chu Van An Street',
      number: null,
      fullAddress: 'in Chu Van An Street',
      ipa: '/aɪ lɪv ɪn tʃuː væn æn striːt/',
      reading: 'Ai lív in Chu Văn An s-trít',
      meaning: 'Tớ sống ở phố Chu Văn An.',
      desc: 'Dãy nhà phố mái ngói đỏ bên đường Chu Văn An',
      badge: 'Phố (Không có số nhà) -> Dùng IN'
    },
    {
      id: 'loc_tran_hung_dao_25',
      name: 'Tran Hung Dao Street',
      number: 25,
      fullAddress: 'at 25 Tran Hung Dao Street',
      ipa: '/aɪ lɪv æt ˈtwenti faɪv trɑːn hʊŋ daʊ striːt/',
      reading: 'Ai lív ét tuen-ti fai-v Trần Hưng Đạo s-trít',
      meaning: 'Tớ sống tại số 25 phố Trần Hưng Đạo.',
      desc: 'Căn nhà số 25 nổi bật với biển định vị màu đỏ',
      badge: 'Có số nhà 25 -> Dùng AT'
    },
    {
      id: 'loc_nguyen_hue_18',
      name: 'Nguyen Hue Road',
      number: 18,
      fullAddress: 'at 18 Nguyen Hue Road',
      ipa: '/aɪ lɪv æt ˌeɪˈtiːn ŋwiːən hweɪ rəʊd/',
      reading: 'Ai lív ét ê-tín Nguyễn Huệ râu-đ',
      meaning: 'Tớ sống tại số 18 đường Nguyễn Huệ.',
      desc: 'Căn nhà số 18 xanh mát cạnh vườn cây',
      badge: 'Có số nhà 18 -> Dùng AT'
    },
    {
      id: 'loc_hoa_binh',
      name: 'Hoa Binh Road',
      number: null,
      fullAddress: 'in Hoa Binh Road',
      ipa: '/aɪ lɪv ɪn hwɑː bɪŋ rəʊd/',
      reading: 'Ai lív in Hòa Bình râu-đ',
      meaning: 'Tớ sống ở đường Hòa Bình.',
      desc: 'Tuyến đường Hòa Bình trải dài thanh bình',
      badge: 'Tuyến đường (Không có số nhà) -> Dùng IN'
    }
  ];

  const [selectedMapLoc, setSelectedMapLoc] = useState<string>('loc_tran_hung_dao_25');

  // =========================================================================
  // ACTIVITY 4: LISTEN AND TICK OR CROSS (TRACK 3)
  // 1: Le Loi Street (house 12) -> Check if audio matches
  // 2: To Hieu Street
  // 3: Hoa Binh Road (house 15)
  // 4: Quang Trung Road
  // =========================================================================
  interface TickCrossItem {
    id: number;
    title: string;
    imagePrompt: string;
    audioScript: string;
    ipa: string;
    reading: string;
    meaningVi: string;
    correctAnswer: 'tick' | 'cross';
    userChoice: 'tick' | 'cross' | null;
    explanation: string;
  }

  const [tickCrossList, setTickCrossList] = useState<TickCrossItem[]>([
    {
      id: 1,
      title: 'Câu 1: Le Loi Street (Nhà số 12)',
      imagePrompt: 'Biển ghi LE LOI STREET kèm số nhà 12',
      audioScript: 'Where do you live? - I live at 12 Le Loi Street.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv æt twelv leɪ lɔɪ striːt/',
      reading: 'Que-ơ đu diu lív? - Ai lív ét tuen-v Lê Lợi s-trít.',
      meaningVi: 'Bạn sống ở đâu? - Tớ sống tại số 12 phố Lê Lợi.',
      correctAnswer: 'tick',
      userChoice: null,
      explanation: 'Băng đọc đúng: "at 12 Le Loi Street" trùng khớp hoàn toàn với số nhà 12 và biển phố Lê Lợi -> Đánh dấu TICK ✔️.'
    },
    {
      id: 2,
      title: 'Câu 2: To Hieu Street',
      imagePrompt: 'Biển ghi TO HIEU STREET',
      audioScript: 'Where do you live? - I live in Tran Phu Street.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv ɪn trɑːn fuː striːt/',
      reading: 'Que-ơ đu diu lív? - Ai lív in Trần Phú s-trít.',
      meaningVi: 'Bạn sống ở đâu? - Tớ sống ở phố Trần Phú.',
      correctAnswer: 'cross',
      userChoice: null,
      explanation: 'Băng đọc "Tran Phu Street" trong khi tranh vẽ biển "TO HIEU STREET" -> Không khớp, chọn CROSS ❌.'
    },
    {
      id: 3,
      title: 'Câu 3: Hoa Binh Road (Nhà số 15)',
      imagePrompt: 'Biển ghi HOA BINH ROAD kèm số nhà 15',
      audioScript: 'Where do you live? - I live at 15 Hoa Binh Road.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv æt ˌfɪfˈtiːn hwɑː bɪŋ rəʊd/',
      reading: 'Que-ơ đu diu lív? - Ai lív ét fíp-tín Hòa Bình râu-đ.',
      meaningVi: 'Bạn sống ở đâu? - Tớ sống tại số 15 đường Hòa Bình.',
      correctAnswer: 'tick',
      userChoice: null,
      explanation: 'Băng đọc: "at 15 Hoa Binh Road" trùng khớp số 15 và đường Hòa Bình -> Đánh dấu TICK ✔️.'
    },
    {
      id: 4,
      title: 'Câu 4: Quang Trung Road',
      imagePrompt: 'Biển ghi QUANG TRUNG ROAD',
      audioScript: 'Where do you live? - I live in Nguyen Trai Street.',
      ipa: '/weər duː juː lɪv? - aɪ lɪv ɪn ŋwiːən traɪ striːt/',
      reading: 'Que-ơ đu diu lív? - Ai lív in Nguyễn Trãi s-trít.',
      meaningVi: 'Bạn sống ở đâu? - Tớ sống ở phố Nguyễn Trãi.',
      correctAnswer: 'cross',
      userChoice: null,
      explanation: 'Băng đọc "Nguyen Trai Street" nhưng tranh vẽ "QUANG TRUNG ROAD" -> Không khớp, chọn CROSS ❌.'
    }
  ]);
  const [tickCrossSubmitted, setTickCrossSubmitted] = useState<boolean>(false);

  const handleSelectTickCross = (id: number, val: 'tick' | 'cross') => {
    sound.playClick();
    setTickCrossList(prev => prev.map(item => (item.id === id ? { ...item, userChoice: val } : item)));
  };

  const handleCheckTickCross = () => {
    const allDone = tickCrossList.every(i => i.userChoice !== null);
    if (!allDone) {
      alert('Em hãy chọn ✔️ hoặc ❌ cho cả 4 câu trước nhé!');
      return;
    }
    const correctCount = tickCrossList.filter(i => i.userChoice === i.correctAnswer).length;
    setTickCrossSubmitted(true);
    if (correctCount === 4) {
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else if (correctCount >= 2) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LOOK, COMPLETE AND READ (4 EXERCISES)
  // =========================================================================
  const [fillInputs, setFillInputs] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3_where: '',
    q3_addr: '',
    q4_live: '',
    q4_road: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  const handleCheckFill = () => {
    const isQ1Correct = fillInputs.q1.trim() === '35';
    const isQ2Correct = fillInputs.q2.trim().toLowerCase().includes('tran phu');
    const isQ3WhereCorrect = fillInputs.q3_where.trim().toLowerCase() === 'where';
    const isQ3AddrCorrect = fillInputs.q3_addr.trim().toLowerCase().includes('4 thai ha');
    const isQ4LiveCorrect = fillInputs.q4_live.trim().toLowerCase() === 'live';
    const isQ4RoadCorrect = fillInputs.q4_road.trim().toLowerCase().includes('in london road');

    setFillChecked(true);
    if (
      isQ1Correct &&
      isQ2Correct &&
      isQ3WhereCorrect &&
      isQ3AddrCorrect &&
      isQ4LiveCorrect &&
      isQ4RoadCorrect
    ) {
      sound.playVictory();
      onAddStar(6);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } else {
      sound.playCorrect();
      onAddStar(2);
    }
  };

  // =========================================================================
  // ACTIVITY 6: LET'S PLAY - WHISPERING GAME (TRUYỀN TIN THÌ THẦM)
  // =========================================================================
  const whisperSentences = [
    { text: 'I live at 54 Green Street.', ipa: '/aɪ lɪv æt ˈfɪfti fɔː ɡriːn striːt/', reading: 'Ai lív ét fíp-ti pho grin s-trít' },
    { text: 'I live in Tran Hung Dao Street.', ipa: '/aɪ lɪv ɪn trɑːn hʊŋ daʊ striːt/', reading: 'Ai lív in Trần Hưng Đạo s-trít' },
    { text: 'I live at 81 Quang Trung Road.', ipa: '/aɪ lɪv æt ˈeɪti wʌn kwɑːŋ trʊŋ rəʊd/', reading: 'Ai lív ét ê-ti uăn Quang Trung râu-đ' }
  ];
  const [activeWhisperIdx, setActiveWhisperIdx] = useState<number>(0);
  const [whisperGuessed, setWhisperGuessed] = useState<boolean>(false);

  return (
    <div className="space-y-8">
      {/* Top Grammar Rule Spotlight Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Quy Tắc Vàng Unit 11 · Tiết 1
            </span>
            <span className="text-xs text-emerald-100 font-bold">Trang 6 - 7 SGK</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black">
            Phân Biệt Giới Từ &quot;IN&quot; và &quot;AT&quot; Khi Hỏi Địa Chỉ Nhà
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-xs font-black text-yellow-300 uppercase tracking-wider block mb-1">
                1. DÙNG &quot;IN&quot; KHI CHỈ NÓI TÊN ĐƯỜNG / PHỐ (Chưa có số nhà)
              </span>
              <p className="text-sm font-bold">
                I live <span className="text-yellow-300 font-black underline">in</span> Tran Hung Dao Street.
              </p>
              <p className="text-xs text-emerald-100 italic mt-0.5">
                (Tớ sống ở phố Trần Hưng Đạo - phạm vi cả con đường dài)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-xs font-black text-yellow-300 uppercase tracking-wider block mb-1">
                2. DÙNG &quot;AT&quot; KHI CÓ SỐ NHÀ CỤ THỂ (Điểm chính xác)
              </span>
              <p className="text-sm font-bold">
                I live <span className="text-yellow-300 font-black underline">at 81</span> Tran Hung Dao Street.
              </p>
              <p className="text-xs text-emerald-100 italic mt-0.5">
                (Tớ sống tại số 81 phố Trần Hưng Đạo - điểm dừng chuẩn xác)
              </p>
            </div>
          </div>

          <p className="text-xs text-yellow-200 font-medium">
            💡 <strong>Mẹo thơ ghi nhớ:</strong> &quot;IN rộng thênh thang chỉ tên đường / AT đích số nhà chớ vấn vương!&quot;
          </p>
        </div>
      </div>

      {/* Activity Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🎧' },
          { id: 2, label: '2. Listen, point & say', icon: '🗣️' },
          { id: 3, label: "3. Let's talk (Map)", icon: '🗺️' },
          { id: 4, label: '4. Listen & tick/cross', icon: '✔️' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: "6. Whispering game", icon: '🎮' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-emerald-600 text-white shadow-md font-black'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. LOOK, LISTEN AND REPEAT (TRACK 1) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 1 · Trang 6
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 1 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, listen and repeat 🎧 (Quan sát, nghe và nhắc lại)
              </h3>
            </div>
            <button
              onClick={() => {
                const fullConversation =
                  'Lucy: My birthday party is on Sunday. Can you come to my party? Nam: Yes, I can. Lucy: Where do you live? Nam: I live in Tran Hung Dao Street.';
                speakWord(fullConversation, speechRate);
              }}
              className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" /> Nghe cả 2 bức tranh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(dialog => (
              <div
                key={dialog.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs">
                    {dialog.part}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{dialog.context}</span>
                </div>

                {/* Speaker A */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-rose-700 flex items-center gap-1">
                      <span>{dialog.avatarA}</span> {dialog.speakerA}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textA, speechRate)}
                      className="p-1 text-slate-400 hover:text-emerald-600 transition"
                      title="Nghe câu này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {dialog.textA}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">
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
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-emerald-800 flex items-center gap-1">
                      <span>{dialog.avatarB}</span> {dialog.speakerB}:
                    </span>
                    <button
                      onClick={() => speakWord(dialog.textB, speechRate)}
                      className="p-1 text-slate-400 hover:text-emerald-700 transition"
                      title="Nghe câu này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-bold text-emerald-950 text-sm md:text-base leading-snug">
                    {dialog.textB}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">
                    🗣️ {dialog.ipaB}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-semibold">
                    📖 Gợi ý đọc: &quot;{dialog.readingB}&quot;
                  </p>
                  <p className="text-xs text-emerald-800/80 italic pt-1 border-t border-emerald-200">
                    {dialog.meaningB}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LISTEN, POINT AND SAY (TRACK 2) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 2 · Trang 6
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 2 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen, point and say 🗣️ (Lắng nghe, chỉ tranh và tập nói)
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Cấu trúc: Where do you live? - I live...
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {streetCards.map(card => {
              const isActive = activeStreetCard === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveStreetCard(card.id);
                    speakWord(card.fullSentence, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-300 scale-102'
                      : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                        {card.label}
                      </span>
                      <span className="text-2xl">{card.icon}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {card.title}
                    </h4>

                    {/* IPA + Reading guide */}
                    <p className="text-[11px] font-mono text-emerald-700 font-bold mb-0.5">
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
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded block">
                      {card.prepNote}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        speakWord(card.fullSentence, speechRate);
                        onAddStar(1);
                      }}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Luyện nói &amp; Nghe
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Roleplay Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Mẫu hội thoại hoàn chỉnh:
              </span>
              <p className="text-sm md:text-base font-extrabold text-slate-800">
                A: Where do you live? - B:{' '}
                <span className="text-emerald-700 underline">
                  {streetCards.find(c => c.id === activeStreetCard)?.fullSentence}
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                const cur = streetCards.find(c => c.id === activeStreetCard);
                if (cur) {
                  speakWord(`Where do you live? ${cur.fullSentence}`, speechRate);
                }
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe cả câu hỏi &amp; đáp
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LET'S TALK (INTERACTIVE MAP) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 3 · Trang 6
                </span>
                <span className="text-xs font-semibold text-slate-500">Bản Đồ Khu Dân Cư</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Let&apos;s talk 🗺️ (Khám phá bản đồ &amp; hỏi đáp nơi ở)
              </h3>
            </div>
            <div className="text-xs text-slate-500 italic">
              Bấm vào từng vị trí trên bản đồ để nghe địa chỉ chính xác
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mapLocations.map(loc => {
              const isSelected = selectedMapLoc === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedMapLoc(loc.id);
                    speakWord(`Where do you live? I live ${loc.fullAddress}.`, speechRate);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-slate-50/50 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {loc.number ? `Nhà số ${loc.number}` : 'Tên đường phố'}
                      </span>
                      <span className="font-extrabold text-slate-800 text-sm">{loc.name}</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {loc.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{loc.desc}</p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <p className="font-extrabold text-sm text-slate-900">
                      &quot;I live {loc.fullAddress}.&quot;
                    </p>
                    <p className="text-[11px] font-mono text-emerald-700 font-bold">
                      🗣️ {loc.ipa}
                    </p>
                    <p className="text-[11px] text-indigo-700 font-semibold">
                      📖 {loc.reading}
                    </p>
                    <p className="text-xs text-slate-500 italic">{loc.meaning}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LISTEN AND TICK OR CROSS (TRACK 3) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 4 · Trang 7
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 3 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick or cross ✔️ ❌ (Nghe và đánh dấu Đúng / Sai)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckTickCross}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition text-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Kiểm tra đáp án
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setTickCrossList(prev => prev.map(i => ({ ...i, userChoice: null })));
                  setTickCrossSubmitted(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
                title="Làm lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickCrossList.map(item => {
              const isCorrect = item.userChoice === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    tickCrossSubmitted
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-800">{item.title}</span>
                    <button
                      onClick={() => speakWord(item.audioScript, speechRate)}
                      className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" /> Nghe audio
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 italic">Tranh: {item.imagePrompt}</p>

                  {/* Tick / Cross choices */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleSelectTickCross(item.id, 'tick')}
                      className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition ${
                        item.userChoice === 'tick'
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">✔️</span>
                      <span>Khớp (TICK)</span>
                    </button>

                    <button
                      onClick={() => handleSelectTickCross(item.id, 'cross')}
                      className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition ${
                        item.userChoice === 'cross'
                          ? 'border-rose-500 bg-rose-100 text-rose-950 font-black shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">❌</span>
                      <span>Không khớp (CROSS)</span>
                    </button>
                  </div>

                  {tickCrossSubmitted && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <p className="font-bold text-slate-800">
                        Đáp án đúng: {item.correctAnswer === 'tick' ? '✔️ TICK' : '❌ CROSS'}
                      </p>
                      <p className="text-slate-600">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. LOOK, COMPLETE AND READ */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 5 · Trang 7
                </span>
                <span className="text-xs font-semibold text-slate-500">Writing &amp; Reading</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Look, complete and read ✍️ (Quan sát tranh và hoàn thành câu)
              </h3>
            </div>
            <button
              onClick={handleCheckFill}
              className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 transition"
            >
              <Check className="w-4 h-4" /> Kiểm tra điền từ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q1: 35 GREEN STREET */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Tranh 1: Biển [35 GREEN STREET]
              </span>
              <p className="text-sm font-bold text-slate-800">A: Where do you live?</p>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>B: I live at</span>
                <input
                  type="text"
                  value={fillInputs.q1}
                  onChange={e => setFillInputs(prev => ({ ...prev, q1: e.target.value }))}
                  placeholder="e.g. 35"
                  className="w-20 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>Green Street.</span>
              </div>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: 35 (I live at 35 Green Street.)
                </p>
              )}
            </div>

            {/* Q2: TRAN PHU ROAD */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Tranh 2: Biển [TRAN PHU ROAD]
              </span>
              <p className="text-sm font-bold text-slate-800">A: Where do you live?</p>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>B: I live in</span>
                <input
                  type="text"
                  value={fillInputs.q2}
                  onChange={e => setFillInputs(prev => ({ ...prev, q2: e.target.value }))}
                  placeholder="e.g. Tran Phu Road"
                  className="w-40 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>.</span>
              </div>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: Tran Phu Road (I live in Tran Phu Road.)
                </p>
              )}
            </div>

            {/* Q3: 4 THAI HA STREET */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Tranh 3: Biển [4 THAI HA STREET]
              </span>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>A:</span>
                <input
                  type="text"
                  value={fillInputs.q3_where}
                  onChange={e => setFillInputs(prev => ({ ...prev, q3_where: e.target.value }))}
                  placeholder="Where"
                  className="w-24 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>do you live?</span>
              </div>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>B: I live at</span>
                <input
                  type="text"
                  value={fillInputs.q3_addr}
                  onChange={e => setFillInputs(prev => ({ ...prev, q3_addr: e.target.value }))}
                  placeholder="4 Thai Ha Street"
                  className="w-44 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>.</span>
              </div>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: Where / 4 Thai Ha Street
                </p>
              )}
            </div>

            {/* Q4: LONDON ROAD */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Tranh 4: Biển [LONDON ROAD]
              </span>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>A: Where do you</span>
                <input
                  type="text"
                  value={fillInputs.q4_live}
                  onChange={e => setFillInputs(prev => ({ ...prev, q4_live: e.target.value }))}
                  placeholder="live"
                  className="w-20 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>?</span>
              </div>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                <span>B: I live</span>
                <input
                  type="text"
                  value={fillInputs.q4_road}
                  onChange={e => setFillInputs(prev => ({ ...prev, q4_road: e.target.value }))}
                  placeholder="in London Road"
                  className="w-40 px-2 py-1 rounded-lg border border-slate-300 font-bold text-emerald-800 text-sm"
                />
                <span>.</span>
              </div>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: live / in London Road
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. LET'S PLAY - WHISPERING GAME */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white uppercase tracking-wider">
              Hoạt Động 6 · Trang 7
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Whispering Game 🤫 (Trò chơi truyền tin thì thầm)
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Cô giáo sẽ thì thầm một địa chỉ bí mật cho bạn đầu hàng. Hãy cùng luyện nghe và đoán xem câu thì thầm là gì nhé!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-200 max-w-lg mx-auto space-y-4">
            <span className="text-5xl block">🤫</span>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                Thông điệp bí mật (Thì thầm)
              </span>
              <h4 className="text-2xl font-black text-emerald-950">
                &quot;{whisperSentences[activeWhisperIdx].text}&quot;
              </h4>
              <p className="text-xs font-mono font-bold text-emerald-700">
                🗣️ {whisperSentences[activeWhisperIdx].ipa}
              </p>
              <p className="text-xs text-indigo-700 font-semibold">
                📖 {whisperSentences[activeWhisperIdx].reading}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() =>
                  speakWord(whisperSentences[activeWhisperIdx].text, speechRate * 0.8)
                }
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe thì thầm (Chậm)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveWhisperIdx(prev => (prev + 1) % whisperSentences.length);
                }}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition hover:bg-slate-50"
              >
                Đổi câu bí mật khác 🔄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
