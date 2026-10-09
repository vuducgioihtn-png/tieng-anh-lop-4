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
  Guitar,
  Flame,
  Palette,
  Shuffle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit5Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit5Lesson2Studio: React.FC<Unit5Lesson2StudioProps> = ({
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

  // 6 Core Talents in Lesson 2
  const coreTalents = [
    {
      id: 'guitar',
      name: 'play the guitar',
      subject: 'he',
      personName: 'Bill',
      vi: 'chơi đàn ghi-ta',
      ipa: '/pleɪ ðə ɡɪˈtɑːr/',
      reading: 'p-LÂY đơ ghi-TA',
      icon: '🎸',
      tip: 'Nhớ có mạo từ "the" trước tên nhạc cụ: play THE guitar. Trọng âm rơi vào "tar" (/tɑːr/).'
    },
    {
      id: 'roller_skate',
      name: 'roller skate',
      subject: 'she',
      personName: 'Mary',
      vi: 'trượt pa-tanh bánh xe',
      ipa: '/ˈroʊ.lɚ skeɪt/',
      reading: 'RÔU-lơ S-KÂY-t',
      icon: '🛼',
      tip: 'Chữ "skate" có âm đầu /sk/ lướt nhanh, âm đuôi /t/ bật nhẹ ở cuối lưỡi.'
    },
    {
      id: 'cook',
      name: 'cook',
      subject: 'he',
      personName: 'Nam',
      vi: 'nấu ăn / làm bếp',
      ipa: '/kʊk/',
      reading: 'CÚC-k',
      icon: '🍳',
      tip: 'Âm /ʊ/ là âm u ngắn, thả lỏng môi, âm cuối /k/ chặn nhẹ trong vòm họng.'
    },
    {
      id: 'draw',
      name: 'draw',
      subject: 'she',
      personName: 'Hoa',
      vi: 'vẽ tranh nghệ thuật',
      ipa: '/drɔː/',
      reading: 'Đ-RO',
      icon: '🎨',
      tip: 'Âm chùm /dr/ chu môi hơi cong lưỡi, nối liền âm tròn miệng /ɔː/.'
    },
    {
      id: 'sing',
      name: 'sing English songs',
      subject: 'she',
      personName: 'Mai',
      vi: 'hát các bài hát tiếng Anh',
      ipa: '/sɪŋ ˈɪŋ.ɡlɪʃ sɒŋz/',
      reading: 'XINH inh-g-lít-x xong-z',
      icon: '🎤',
      tip: 'Âm đuôi /ŋ/ ngân nhẹ qua khoang mũi, phát âm tự nhiên ngọt ngào.'
    },
    {
      id: 'skate',
      name: 'skate',
      subject: 'he',
      personName: 'Ben',
      vi: 'trượt ván / trượt băng',
      ipa: '/skeɪt/',
      reading: 'S-KÂY-t',
      icon: '🛹',
      tip: 'Khác với roller skate (pa-tanh bánh xe), skate thường chỉ trượt ván hoặc trượt băng.'
    }
  ];

  // Activity 1: Dialogue Look, Listen & Repeat (Track 49)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Nam & Mai hỏi về Bill đang cầm đàn ghi-ta',
      context: 'Nam và Mai nhìn thấy bạn Bill đang ngồi cầm cây đàn ghi-ta rất điệu nghệ trên sân khấu nhỏ.',
      badge: 'Track 49 - Part A',
      lines: [
        {
          speaker: 'Mai',
          avatar: '👧',
          en: 'Can he play the guitar, Nam?',
          vi: 'Bạn ấy có biết chơi đàn ghi-ta không hả Nam?',
          soundDesc: 'Mai tò mò hỏi Nam về tài năng của Bill',
          focus: 'Can he play the guitar?'
        },
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'Yes, he can. He plays it very well!',
          vi: 'Có, bạn ấy biết chơi đấy. Bạn ấy đánh đàn rất cừ luôn!',
          soundDesc: 'Nam tươi cười tự hào trả lời về bạn mình',
          focus: 'Yes, he can.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Mai & Nam hỏi về Mary đang tập trượt pa-tanh',
      context: 'Mai và Nam trông thấy Mary đang lảo đảo trên đôi giày pa-tanh và bám vào hàng rào.',
      badge: 'Track 49 - Part B',
      lines: [
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'Can she roller skate, Mai?',
          vi: 'Bạn ấy có biết trượt pa-tanh không hả Mai?',
          soundDesc: 'Nam hỏi Mai khi nhìn Mary đang chập chững',
          focus: 'Can she roller skate?'
        },
        {
          speaker: 'Mai',
          avatar: '👧',
          en: 'No, she can’t. But she is practicing!',
          vi: 'Không, bạn ấy chưa biết trượt. Nhưng bạn ấy đang chăm chỉ tập luyện!',
          soundDesc: 'Mai giải thích với tinh thần cổ vũ bạn bè',
          focus: 'No, she can’t.'
        }
      ]
    }
  };

  // Activity 2: Interactive Sentence Builder (Listen, point and say - Track 50)
  const [selectedPerson, setSelectedPerson] = useState<{
    subject: 'he' | 'she';
    genderVi: string;
    action: string;
    actionVi: string;
    icon: string;
    canDo: boolean;
  }>({
    subject: 'he',
    genderVi: 'bạn nam ấy',
    action: 'play the guitar',
    actionVi: 'chơi đàn ghi-ta',
    icon: '🎸',
    canDo: true
  });

  const [builderResultSpoken, setBuilderResultSpoken] = useState<boolean>(false);

  // Activity 3: Let's Talk Role-play Studio
  const [interviewSubject, setInterviewSubject] = useState<'he' | 'she'>('he');
  const [interviewAction, setInterviewAction] = useState<string>('cook');
  const [interviewAnswer, setInterviewAnswer] = useState<'yes' | 'no'>('yes');

  // Activity 4: Listening Quiz (Track 51 - Listen and number)
  interface ListenQuizItem {
    id: number;
    audioText: string;
    speaker: string;
    targetName: string;
    correctAnswer: string; // talent id
    icon: string;
    explanation: string;
    userChoice: number | null;
  }

  const [listenQuiz, setListenQuiz] = useState<ListenQuizItem[]>([
    {
      id: 1,
      audioText: 'Can he cook? - Yes, he can. He makes delicious soup!',
      speaker: '👦 Nam & Linh',
      targetName: 'Minh làm bếp nấu súp',
      correctAnswer: 'cook',
      icon: '🍳',
      explanation: 'Bài nghe hỏi "Can he cook?" và câu trả lời là "Yes, he can."',
      userChoice: null
    },
    {
      id: 2,
      audioText: 'Can she play the guitar? - No, she can’t. But she can sing.',
      speaker: '👧 Lucy & Mai',
      targetName: 'Hoa với cây đàn ghi-ta',
      correctAnswer: 'guitar',
      icon: '🎸',
      explanation: 'Bài nghe hỏi về chơi đàn ghi-ta "play the guitar" và trả lời "No, she can’t."',
      userChoice: null
    },
    {
      id: 3,
      audioText: 'Can she roller skate? - Yes, she can. Look at her!',
      speaker: '👦 Ben & Mary',
      targetName: 'Lan trượt pa-tanh lướt gió',
      correctAnswer: 'roller_skate',
      icon: '🛼',
      explanation: 'Bài nghe hỏi "Can she roller skate?" và trả lời hào hứng "Yes, she can."',
      userChoice: null
    },
    {
      id: 4,
      audioText: 'Can he draw a picture of a cat? - Yes, he can. He is an artist!',
      speaker: '👧 Mai & Nam',
      targetName: 'Huy vẽ bức tranh mèo con',
      correctAnswer: 'draw',
      icon: '🎨',
      explanation: 'Bài nghe hỏi "Can he draw...?" và câu trả lời là "Yes, he can."',
      userChoice: null
    }
  ]);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Mini Game "Talent Detective"
  const [mysteryFriend, setMysteryFriend] = useState<{
    name: string;
    gender: 'he' | 'she';
    talent: string;
    talentVi: string;
    canDo: boolean;
    icon: string;
    clue: string;
  }>({
    name: 'Khoa',
    gender: 'he',
    talent: 'cook',
    talentVi: 'nấu món ăn ngon',
    canDo: true,
    icon: '🍳',
    clue: 'Bạn ấy thường đeo tạp dề màu vàng, thích làm món trứng cuộn và canh rau củ.'
  });

  const [detectiveGuess, setDetectiveGuess] = useState<string | null>(null);
  const [detectiveFeedback, setDetectiveFeedback] = useState<string | null>(null);

  const friendsDatabase = [
    {
      name: 'Khoa',
      gender: 'he' as const,
      talent: 'cook',
      talentVi: 'nấu ăn',
      canDo: true,
      icon: '🍳',
      clue: 'Bạn ấy thường đeo tạp dề màu vàng, thích làm món trứng cuộn và canh rau củ.'
    },
    {
      name: 'Thu Hà',
      gender: 'she' as const,
      talent: 'draw',
      talentVi: 'vẽ tranh màu nước',
      canDo: true,
      icon: '🎨',
      clue: 'Cặp sách của bạn ấy luôn có hộp màu 24 sắc màu và cọ vẽ rất đẹp.'
    },
    {
      name: 'Bảo',
      gender: 'he' as const,
      talent: 'play the guitar',
      talentVi: 'chơi đàn ghi-ta',
      canDo: true,
      icon: '🎸',
      clue: 'Mỗi giờ ra chơi, bạn ấy thường gảy những giai điệu acoustic rộn ràng dưới bóng cây phượng.'
    },
    {
      name: 'Khánh Vy',
      gender: 'she' as const,
      talent: 'roller skate',
      talentVi: 'trượt pa-tanh',
      canDo: true,
      icon: '🛼',
      clue: 'Đôi giày màu hồng có 4 bánh xe phát sáng nhấp nháy mỗi khi bạn ấy lướt đi trong công viên.'
    }
  ];

  const handleStartNewMystery = () => {
    const randomFriend = friendsDatabase[Math.floor(Math.random() * friendsDatabase.length)];
    setMysteryFriend(randomFriend);
    setDetectiveGuess(null);
    setDetectiveFeedback(null);
    sound.playClick();
  };

  const handleCheckDetectiveGuess = (talentId: string) => {
    if (talentId === mysteryFriend.talent) {
      setDetectiveGuess(talentId);
      setDetectiveFeedback(`🎉 Chính xác tuyệt vời! Đúng là ${mysteryFriend.name} biết ${mysteryFriend.talentVi}! ("Yes, ${mysteryFriend.gender} can!")`);
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      onAddStar(3);
    } else {
      setDetectiveGuess(talentId);
      setDetectiveFeedback(`❌ Chưa đúng rồi! Gợi ý: Hãy đọc kĩ lại manh mối xem đồ vật của bạn ấy là gì nhé!`);
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 5: Things We Can Do • Tiết 2 (Lesson 2)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-teal-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi Khả Năng Của Người Khác</span>
              <span className="text-3xl">🎸</span>
            </h1>
            <p className="text-teal-100 text-sm md:text-base font-medium mt-1">
              Học cách hỏi và trả lời xem bạn nam ấy (he) hoặc bạn nữ ấy (she) có thể làm được gì: "Can he / she ...?" — "Yes, he/she can. / No, he/she can't."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 36 - 37</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Điểm Ngữ Pháp</span>
              <span className="text-sm font-black text-amber-300">Can he/she...?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Kỹ Năng</span>
              <span className="text-sm font-black text-white">Nói & Nghe hiểu</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-teal-200 block font-medium">Bí kíp</span>
              <span className="text-sm font-black text-green-300">He (nam) / She (nữ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Công Thức Vàng: Hỏi & Đáp Về Tài Năng Bạn Bè
              </h2>
              <p className="text-xs text-slate-500">
                Quy tắc bất biến: Dùng "Can" đứng đầu câu hỏi, câu trả lời giữ nguyên chủ ngữ!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Boy / He Box */}
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wide">
                👦 Bạn Nam / Cậu Bé (HE)
              </span>
              <span className="text-lg">⚽</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              Hỏi: <span className="text-blue-600 font-extrabold">Can he</span> + [hoạt động]?
            </div>
            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✅ Biết làm:</span>
                <span className="font-semibold text-slate-800">Yes, he can.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rose-600 font-bold">❌ Chưa biết làm:</span>
                <span className="font-semibold text-slate-800">No, he can’t.</span> (/kɑːnt/)
              </div>
            </div>
            <div className="pt-1 text-[11px] text-blue-600 italic">
              Ví dụ: "Can he play the guitar?" - "Yes, he can."
            </div>
          </div>

          {/* Girl / She Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-700 uppercase tracking-wide">
                👧 Bạn Nữ / Cô Bé (SHE)
              </span>
              <span className="text-lg">🎀</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              Hỏi: <span className="text-rose-600 font-extrabold">Can she</span> + [hoạt động]?
            </div>
            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✅ Biết làm:</span>
                <span className="font-semibold text-slate-800">Yes, she can.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-rose-600 font-bold">❌ Chưa biết làm:</span>
                <span className="font-semibold text-slate-800">No, she can’t.</span> (/kɑːnt/)
              </div>
            </div>
            <div className="pt-1 text-[11px] text-rose-600 italic">
              Ví dụ: "Can she roller skate?" - "No, she can’t."
            </div>
          </div>
        </div>

        {/* Parent Guide Expandable */}
        {showParentGuides && (
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Góc Hướng Dẫn Phụ Huynh & Thầy Cô (SGK Trang 36 - 37)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li>
                <strong>Phân biệt He / She:</strong> Trẻ lớp 4 thường dễ nhầm lẫn giữa <em>he</em> (bạn trai) và <em>she</em> (bạn gái). Hãy nhắc trẻ: <em>"She có chữ S mềm mại như mái tóc dài của bạn nữ"</em>.
              </li>
              <li>
                <strong>Nhạc cụ có "the":</strong> Chơi nhạc cụ luôn cần "the" (<em>play the guitar, play the piano</em>), còn thể thao thì không có "the" (<em>play football, swim</em>).
              </li>
              <li>
                <strong>Âm đuôi của "can't":</strong> Tránh đọc nuốt âm /t/. Nhắc con phát âm dứt khoát /kɑːnt/ hoặc /kænt/ có bật hơi nhẹ để người nghe phân biệt rõ với "can".
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 6 Activity Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Đối Thoại (Track 49)', icon: '💬' },
          { num: 2, label: '2. Ghép Câu & Nói (Track 50)', icon: '🎙️' },
          { num: 3, label: '3. Phỏng Vấn Let’s Talk', icon: '🎤' },
          { num: 4, label: '4. Nghe & Đánh Số (Track 51)', icon: '🎧' },
          { num: 5, label: '5. Hoàn Thiện Bài Đọc', icon: '✍️' },
          { num: 6, label: '6. Thám Tử Tài Năng', icon: '🕵️' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveSection(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === tab.num
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 49) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
                Phần 1 • SGK Trang 36
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Look, listen and repeat</span>
                <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 49
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát tranh tình huống thực tế, bấm vào từng lời thoại để nghe và nhắc lại theo giọng chuẩn.
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
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh A: Bill chơi đàn 🎸
              </button>
              <button
                onClick={() => {
                  setActiveDialogueTab('b');
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-white text-rose-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh B: Mary trượt pa-tanh 🛼
              </button>
            </div>
          </div>

          {/* Current Dialogue Scene Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
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
                      ? 'border-teal-500 bg-teal-50/70 shadow-sm scale-[1.01]'
                      : 'border-slate-200 bg-white hover:border-teal-300'
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
                      <span className="text-[11px] font-bold text-teal-600 flex items-center gap-1">
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
                    <div className="text-[11px] text-teal-700 pt-1 font-semibold flex items-center gap-1">
                      <span>🎯 Câu trọng tâm:</span>
                      <span className="bg-teal-100 px-2 py-0.5 rounded-md font-black">
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
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Nghe Toàn Bộ Đoạn Thoại</span>
              </button>

              <button
                onClick={onOpenVoiceStudio}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mở Phòng Thu Giọng AI Đoạn Này</span>
              </button>
            </div>
          </div>

          {/* Core Talents Mini Showcase */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>6 Tài Năng Bạn Bè Cần Nhớ (SGK Trang 36 - 37)</span>
              <span className="text-xs font-normal text-slate-500">Bấm thẻ để nghe phát âm</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {coreTalents.map(talent => (
                <div
                  key={talent.id}
                  onClick={() => {
                    speakWord(talent.name, speechRate);
                    sound.playClick();
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{talent.icon}</span>
                    <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                  </div>
                  <div className="text-sm font-black text-slate-900 group-hover:text-teal-700">
                    {talent.name}
                  </div>
                  <div className="text-xs text-slate-500">{talent.vi}</div>
                  <div className="text-[10px] text-teal-600 font-mono font-bold">
                    {talent.ipa}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 50) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
              Phần 2 • SGK Trang 36
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Listen, point and say</span>
              <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                Track 50
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn chủ ngữ (He / She) và hoạt động, hệ thống sẽ tự động ghép thành câu hỏi & câu trả lời chuẩn SGK.
            </p>
          </div>

          {/* Builder Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Choose Subject */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-700 block uppercase">
                Bước 1: Chọn đối tượng được hỏi
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedPerson(prev => ({
                      ...prev,
                      subject: 'he',
                      genderVi: 'bạn nam ấy'
                    }));
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedPerson.subject === 'he'
                      ? 'border-blue-500 bg-blue-100 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">👦</span>
                  <span>He (Bạn nam / Cậu bé)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPerson(prev => ({
                      ...prev,
                      subject: 'she',
                      genderVi: 'bạn nữ ấy'
                    }));
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedPerson.subject === 'she'
                      ? 'border-rose-500 bg-rose-100 text-rose-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">👧</span>
                  <span>She (Bạn nữ / Cô bé)</span>
                </button>
              </div>

              {/* Ability Toggle */}
              <div className="pt-2">
                <span className="text-xs font-black text-slate-700 block uppercase mb-1.5">
                  Khả năng của bạn ấy:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedPerson(prev => ({ ...prev, canDo: true }));
                      sound.playClick();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                      selectedPerson.canDo
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Có thể làm (Yes)</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPerson(prev => ({ ...prev, canDo: false }));
                      sound.playClick();
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                      !selectedPerson.canDo
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>❌</span>
                    <span>Chưa thể làm (No)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Talent/Action */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-700 block uppercase">
                Bước 2: Chọn tài năng muốn hỏi
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'play the guitar', vi: 'chơi ghi-ta', icon: '🎸' },
                  { name: 'roller skate', vi: 'trượt pa-tanh', icon: '🛼' },
                  { name: 'cook', vi: 'nấu ăn', icon: '🍳' },
                  { name: 'draw', vi: 'vẽ tranh', icon: '🎨' }
                ].map(act => (
                  <button
                    key={act.name}
                    onClick={() => {
                      setSelectedPerson(prev => ({
                        ...prev,
                        action: act.name,
                        actionVi: act.vi,
                        icon: act.icon
                      }));
                      sound.playClick();
                    }}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      selectedPerson.action === act.name
                        ? 'border-teal-500 bg-teal-100 text-teal-900 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-base">
                      <span>{act.icon}</span>
                      <span className="text-xs font-black capitalize">{act.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">{act.vi}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resulting Audio Dialogue Card */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border-2 border-teal-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Mẫu Câu Hoàn Chỉnh Vừa Được Ghép</span>
              </span>
              <span className="text-3xl">{selectedPerson.icon}</span>
            </div>

            {/* Question Line */}
            <div className="p-3.5 rounded-xl bg-white border border-teal-100 flex items-start gap-3">
              <span className="text-xl">❓</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Hỏi</span>
                <span className="text-base font-black text-slate-900">
                  "Can {selectedPerson.subject} {selectedPerson.action}?"
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  ({selectedPerson.genderVi} có biết {selectedPerson.actionVi} không?)
                </span>
              </div>
            </div>

            {/* Answer Line */}
            <div className="p-3.5 rounded-xl bg-white border border-teal-100 flex items-start gap-3">
              <span className="text-xl">{selectedPerson.canDo ? '✅' : '❌'}</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Trả Lời</span>
                <span className="text-base font-black text-teal-800">
                  {selectedPerson.canDo
                    ? `"Yes, ${selectedPerson.subject} can."`
                    : `"No, ${selectedPerson.subject} can’t."`}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {selectedPerson.canDo
                    ? `(Có, ${selectedPerson.genderVi} biết làm.)`
                    : `(Không, ${selectedPerson.genderVi} chưa biết làm.)`}
                </span>
              </div>
            </div>

            {/* Read Button */}
            <button
              onClick={() => {
                const qText = `Can ${selectedPerson.subject} ${selectedPerson.action}?`;
                const aText = selectedPerson.canDo
                  ? `Yes, ${selectedPerson.subject} can.`
                  : `No, ${selectedPerson.subject} can't.`;
                speakWord(`${qText} ${aText}`, speechRate);
                setBuilderResultSpoken(true);
                onAddStar(2);
              }}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Phát Âm Cả Cặp Câu Này</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S TALK ROLE-PLAY STUDIO */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
              Phần 3 • SGK Trang 36
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Let's talk • Phỏng vấn tài năng bạn bè</span>
              <span className="text-2xl">🎤</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Thực hành hỏi đáp tự do với bạn cùng lớp hoặc AI về những điều các bạn trong trường có thể hoặc chưa thể làm.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-blue-500/10 rounded-2xl p-6 border border-slate-200 space-y-5">
            <div className="text-xs font-bold text-slate-700 uppercase">
              Tùy biến nhân vật đang được phỏng vấn:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Subject */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-600">1. Đối tượng:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setInterviewSubject('he');
                      sound.playClick();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                      interviewSubject === 'he'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    👦 He (Nam)
                  </button>
                  <button
                    onClick={() => {
                      setInterviewSubject('she');
                      sound.playClick();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                      interviewSubject === 'she'
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    👧 She (Nữ)
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-600">2. Hoạt động:</span>
                <select
                  value={interviewAction}
                  onChange={e => setInterviewAction(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-800 focus:outline-teal-500"
                >
                  <option value="cook">cook (nấu ăn)</option>
                  <option value="play the guitar">play the guitar (đàn ghi-ta)</option>
                  <option value="roller skate">roller skate (pa-tanh)</option>
                  <option value="draw">draw (vẽ tranh)</option>
                  <option value="swim">swim (bơi lội)</option>
                  <option value="ride a bike">ride a bike (đi xe đạp)</option>
                </select>
              </div>

              {/* Answer */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-600">3. Kết quả:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setInterviewAnswer('yes');
                      sound.playClick();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                      interviewAnswer === 'yes'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    ✅ Yes, can
                  </button>
                  <button
                    onClick={() => {
                      setInterviewAnswer('no');
                      sound.playClick();
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                      interviewAnswer === 'no'
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    ❌ No, can’t
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation Flow Display */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-black text-lg">
                  🙋‍♂️
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn hỏi:</span>
                  <div className="text-lg font-black text-slate-900">
                    "Can {interviewSubject} {interviewAction}?"
                  </div>
                  <button
                    onClick={() => speakWord(`Can ${interviewSubject} ${interviewAction}?`, speechRate)}
                    className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện phát âm câu hỏi</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-black text-lg">
                  🤖
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn học / AI trả lời:</span>
                  <div className="text-lg font-black text-teal-800">
                    {interviewAnswer === 'yes'
                      ? `"Yes, ${interviewSubject} can."`
                      : `"No, ${interviewSubject} can’t."`}
                  </div>
                  <button
                    onClick={() =>
                      speakWord(
                        interviewAnswer === 'yes'
                          ? `Yes, ${interviewSubject} can.`
                          : `No, ${interviewSubject} can't.`,
                        speechRate
                      )
                    }
                    className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 mt-1"
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
      {/* SECTION 4: LISTEN AND NUMBER (TRACK 51) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
                Phần 4 • SGK Trang 37
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and number</span>
                <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 51
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm loa để nghe từng đoạn hội thoại, sau đó chọn số thứ tự từ 1 đến 4 tương ứng với tranh.
              </p>
            </div>

            <button
              onClick={() => {
                setListenQuiz(prev => prev.map(item => ({ ...item, userChoice: null })));
                setQuizSubmitted(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listenQuiz.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 relative hover:border-teal-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <button
                    onClick={() => {
                      speakWord(item.audioText, speechRate);
                      sound.playClick();
                    }}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Băng #{item.id}</span>
                  </button>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block">Tình huống:</span>
                  <span className="text-sm font-black text-slate-900">{item.targetName}</span>
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
                          setListenQuiz(prev =>
                            prev.map(q => (q.id === item.id ? { ...q, userChoice: num } : q))
                          );
                          sound.playClick();
                        }}
                        className={`w-10 h-10 rounded-xl font-black text-sm transition-all border ${
                          item.userChoice === num
                            ? 'bg-teal-600 text-white border-teal-700 shadow-sm scale-110'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback when submitted */}
                {quizSubmitted && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      item.userChoice === item.id
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.userChoice === item.id
                      ? `✅ Đúng rồi! Số thứ tự là ${item.id}.`
                      : `❌ Chưa chính xác. Đáp án đúng là số ${item.id}.`}
                    <div className="text-[11px] font-normal mt-0.5 opacity-90">
                      {item.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setQuizSubmitted(true);
                const correctCount = listenQuiz.filter(q => q.userChoice === q.id).length;
                if (correctCount === 4) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(4);
                } else {
                  sound.playClick();
                }
              }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Chấm Điểm Bài Nghe</span>
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
            <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
              Phần 5 • SGK Trang 37
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Look, complete and read</span>
              <span className="text-2xl">✍️</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quan sát tranh và hoàn thành 4 câu thoại. Bấm nút "Kiểm Tra" để xem giải thích chi tiết.
            </p>
          </div>

          <div className="space-y-4">
            {/* Question 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-700">Câu 1 • Nam cầm cây đàn ghi-ta</span>
                <span className="text-2xl">🎸</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-2 flex-wrap">
                <span>Can he</span>
                <input
                  type="text"
                  value={fillAnswers.q1}
                  onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                  placeholder="play the guitar"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-teal-700 w-44 focus:outline-teal-500 bg-white"
                />
                <span>? — Yes, he can.</span>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q1.trim().toLowerCase() === 'play the guitar'
                    ? '✅ Hoàn toàn chính xác!'
                    : '👉 Đáp án chuẩn: play the guitar'}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700">Câu 2 • Mary bám rào tập pa-tanh (chưa biết trượt)</span>
                <span className="text-2xl">🛼</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-2 flex-wrap">
                <span>Can she roller skate? — No,</span>
                <input
                  type="text"
                  value={fillAnswers.q2}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2: e.target.value })}
                  placeholder="she can't"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-teal-700 w-36 focus:outline-teal-500 bg-white"
                />
                <span>.</span>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q2.trim().toLowerCase().includes("she can't") ||
                  fillAnswers.q2.trim().toLowerCase().includes('she cannot')
                    ? '✅ Hoàn toàn chính xác!'
                    : "👉 Đáp án chuẩn: she can't (hoặc she cannot)"}
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-700">Câu 3 • Bếp trưởng nhí làm món súp thơm</span>
                <span className="text-2xl">🍳</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-2 flex-wrap">
                <span>Can</span>
                <input
                  type="text"
                  value={fillAnswers.q3}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3: e.target.value })}
                  placeholder="he cook"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-teal-700 w-32 focus:outline-teal-500 bg-white"
                />
                <span>? — Yes, he can.</span>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q3.trim().toLowerCase() === 'he cook'
                    ? '✅ Hoàn toàn chính xác!'
                    : '👉 Đáp án chuẩn: he cook'}
                </div>
              )}
            </div>

            {/* Question 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700">Câu 4 • Họa sĩ nhí vẽ tranh cảnh biển</span>
                <span className="text-2xl">🎨</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex items-center gap-2 flex-wrap">
                <span>Can she draw? —</span>
                <input
                  type="text"
                  value={fillAnswers.q4}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4: e.target.value })}
                  placeholder="Yes, she can"
                  className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-teal-700 w-40 focus:outline-teal-500 bg-white"
                />
                <span>.</span>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q4.trim().toLowerCase().includes('yes, she can') ||
                  fillAnswers.q4.trim().toLowerCase().includes('yes she can')
                    ? '✅ Hoàn toàn chính xác!'
                    : '👉 Đáp án chuẩn: Yes, she can'}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setFillChecked(true);
                sound.playCorrect();
                onAddStar(3);
              }}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
            >
              Kiểm Tra Kết Quả
            </button>
            <button
              onClick={() => {
                setFillAnswers({ q1: '', q2: '', q3: '', q4: '' });
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
      {/* SECTION 6: MINI GAME TALENT DETECTIVE */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-teal-600 uppercase tracking-wider block">
                Trò Chơi Tương Tác • Mini Game
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Talent Detective: Thám Tử Đoán Tài Năng</span>
                <span className="text-2xl">🕵️‍♂️</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Đọc manh mối đặc biệt của bạn học bí ẩn và đoán xem bạn ấy có tài năng gì nhé!
              </p>
            </div>

            <button
              onClick={handleStartNewMystery}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Shuffle className="w-4 h-4" />
              <span>Đổi Bạn Học Bí Ẩn Khác</span>
            </button>
          </div>

          {/* Mystery Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mysteryFriend.gender === 'he' ? '👦' : '👧'}</span>
                <div>
                  <div className="text-sm font-black text-white">
                    Hồ Sơ: Bạn {mysteryFriend.name} ({mysteryFriend.gender === 'he' ? 'Nam' : 'Nữ'})
                  </div>
                  <div className="text-[11px] text-teal-300 font-mono">
                    Mã điều tra: #{mysteryFriend.talent.toUpperCase()}-2026
                  </div>
                </div>
              </div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-amber-300 font-bold">
                Cấp độ: Thám tử nhí
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black text-teal-300 uppercase tracking-wide">
                🔍 Manh Mối Bắt Được Từ Hiện Trường:
              </span>
              <p className="text-sm md:text-base font-medium text-slate-100 bg-white/10 p-4 rounded-2xl border border-white/10 italic">
                "{mysteryFriend.clue}"
              </p>
            </div>

            {/* Detective Feedback */}
            {detectiveFeedback && (
              <div className="p-3.5 rounded-xl bg-white/15 border border-white/20 text-xs font-bold text-amber-200">
                {detectiveFeedback}
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black text-slate-300 block uppercase">
                Theo em, tài năng của bạn {mysteryFriend.name} là gì?
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'cook', name: 'cook', icon: '🍳' },
                  { id: 'draw', name: 'draw', icon: '🎨' },
                  { id: 'play the guitar', name: 'play the guitar', icon: '🎸' },
                  { id: 'roller skate', name: 'roller skate', icon: '🛼' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleCheckDetectiveGuess(opt.id)}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-teal-500 text-white font-bold text-xs transition-all border border-white/10 flex flex-col items-center justify-center gap-1.5 hover:scale-105"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="capitalize">{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
