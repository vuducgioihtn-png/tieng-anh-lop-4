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
  Flame,
  Tent,
  Camera,
  BookMarked,
  PhoneCall,
  CheckSquare,
  Sparkle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit20Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit20Lesson1Studio: React.FC<Unit20Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LOOK, LISTEN AND REPEAT (TRACK 92)
  // =========================================================================
  const dialogSteps = [
    {
      id: 'step_a',
      part: 'Tranh a · Bill gọi điện thoại hỏi thăm Mai',
      speakerA: 'Bill',
      avatarA: '👦🏼',
      textA: 'Hi, Mai. Is Nam there?',
      ipaA: '/haɪ maɪ ɪz næm ðeə/',
      readingA: 'Hai, Mai. Ít-z Nam đe-ơ?',
      meaningA: 'Chào Mai. Nam có ở đó không cậu?',
      speakerB: 'Mai',
      avatarB: '👧',
      textB: 'Yes, he is.',
      ipaB: '/jɛs hiː ɪz/',
      readingB: 'Dét-s, hi ít-z.',
      meaningB: 'Có, cậu ấy có ở đây nè.',
      context: 'Bill đeo kính gọi điện thoại từ xa, Mai đang ở khu cắm trại nhìn thấy Nam.'
    },
    {
      id: 'step_b',
      part: 'Tranh b · Bill hỏi Nam đang làm gì',
      speakerA: 'Bill',
      avatarA: '👦🏼',
      textA: "What's he doing?",
      ipaA: '/wɒts hiː ˈduːɪŋ/',
      readingA: 'Oát-s hi đu-in?',
      meaningA: 'Cậu ấy đang làm gì thế Mai?',
      speakerB: 'Mai',
      avatarB: '👧',
      textB: "He's building a campfire.",
      ipaB: '/hiːz ˈbɪldɪŋ ə ˈkæmpfaɪə/',
      readingB: 'Hi-z bin-đin ơ cém-phai-ơ.',
      meaningB: 'Cậu ấy đang nhóm lửa trại đó.',
      context: 'Mai nhìn thấy Nam đang ngồi xếp củi khô chuẩn bị nhóm đống lửa trại bên lều.'
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN, POINT AND SAY (TRACK 93)
  // =========================================================================
  const campActivities = [
    {
      id: 'tent',
      label: 'a',
      actionEn: 'putting up a tent',
      ipa: '/ˈpʊtɪŋ ʌp ə tɛnt/',
      reading: 'pút-tin áp ơ ten-t',
      meaningVi: 'dựng lều cắm trại',
      icon: '⛺',
      gender: 'he',
      subjectWord: 'He',
      character: 'cậu bé',
      fullSentence: "He's putting up a tent.",
      fullSentenceVi: 'Cậu ấy đang dựng lều cắm trại.',
      badgeColor: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'campfire',
      label: 'b',
      actionEn: 'building a campfire',
      ipa: '/ˈbɪldɪŋ ə ˈkæmpfaɪə/',
      reading: 'bin-đin ơ cém-phai-ơ',
      meaningVi: 'nhóm đống lửa trại',
      icon: '🔥',
      gender: 'she',
      subjectWord: 'She',
      character: 'cô bé tóc đỏ',
      fullSentence: "She's building a campfire.",
      fullSentenceVi: 'Cô ấy đang nhóm đống lửa trại.',
      badgeColor: 'from-amber-600 to-orange-700'
    },
    {
      id: 'story',
      label: 'c',
      actionEn: 'telling a story',
      ipa: '/ˈtɛlɪŋ ə ˈstɔːri/',
      reading: 'ten-lin ơ s-to-ri',
      meaningVi: 'kể một câu chuyện',
      icon: '📖',
      gender: 'he',
      subjectWord: 'He',
      character: 'Bill kể chuyện cho các bạn',
      fullSentence: "He's telling a story.",
      fullSentenceVi: 'Cậu ấy đang kể một câu chuyện.',
      badgeColor: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'photo',
      label: 'd',
      actionEn: 'taking a photo',
      ipa: '/ˈteɪkɪŋ ə ˈfəʊtəʊ/',
      reading: 'tây-kin ơ phâu-tâu',
      meaningVi: 'chụp một bức ảnh',
      icon: '📸',
      gender: 'she',
      subjectWord: 'She',
      character: 'cô bé cầm máy ảnh',
      fullSentence: "She's taking a photo.",
      fullSentenceVi: 'Cô ấy đang chụp ảnh.',
      badgeColor: 'from-rose-600 to-pink-700'
    }
  ];

  const [selectedActivity, setSelectedActivity] = useState(campActivities[0]);

  // =========================================================================
  // ACTIVITY 3: LET'S TALK
  // =========================================================================
  const campsiteMapCharacters = [
    {
      id: 'nam',
      name: 'Nam 👦',
      gender: 'he',
      action: 'putting up a tent',
      actionVi: 'đang dựng lều',
      icon: '⛺',
      dialogEn: "What's he doing? - He's putting up a tent."
    },
    {
      id: 'lucy',
      name: 'Lucy 👧',
      gender: 'she',
      action: 'building a campfire',
      actionVi: 'đang nhóm lửa trại',
      icon: '🔥',
      dialogEn: "What's she doing? - She's building a campfire."
    },
    {
      id: 'bill',
      name: 'Bill 👦🏼',
      gender: 'he',
      action: 'telling a story',
      actionVi: 'đang kể chuyện',
      icon: '📖',
      dialogEn: "What's he doing? - He's telling a story."
    },
    {
      id: 'mai',
      name: 'Mai 👧',
      gender: 'she',
      action: 'taking a photo',
      actionVi: 'đang chụp ảnh',
      icon: '📸',
      dialogEn: "What's she doing? - She's taking a photo."
    }
  ];

  const [selectedCampCharacter, setSelectedCampCharacter] = useState(campsiteMapCharacters[0]);

  // =========================================================================
  // ACTIVITY 4: LISTEN AND MATCH (TRACK 94)
  // =========================================================================
  interface MatchQuestion {
    id: number;
    charName: string;
    avatar: string;
    correctLetter: 'a' | 'b' | 'c' | 'd';
    correctDesc: string;
    script: string;
  }

  const matchQuestions: MatchQuestion[] = [
    {
      id: 1,
      charName: '1. Mai 👧',
      avatar: '👧',
      correctLetter: 'a',
      correctDesc: 'taking a photo 📸',
      script: "1. What's Mai doing? - She's taking a photo."
    },
    {
      id: 2,
      charName: '2. Bill 👦🏼',
      avatar: '👦🏼',
      correctLetter: 'c',
      correctDesc: 'telling a story 📖',
      script: "2. What's Bill doing? - He's telling a story."
    },
    {
      id: 3,
      charName: '3. Lucy 👧',
      avatar: '👧🏼',
      correctLetter: 'b',
      correctDesc: 'building a campfire 🔥',
      script: "3. What's Lucy doing? - She's building a campfire."
    },
    {
      id: 4,
      charName: '4. Nam 👦',
      avatar: '👦',
      correctLetter: 'd',
      correctDesc: 'putting up a tent ⛺',
      script: "4. What's Nam doing? - He's putting up a tent."
    }
  ];

  const matchOptions = [
    { letter: 'a' as const, label: 'a. Chụp ảnh (taking a photo)', icon: '📸' },
    { letter: 'b' as const, label: 'b. Nhóm lửa trại (building a campfire)', icon: '🔥' },
    { letter: 'c' as const, label: 'c. Kể chuyện bên lều (telling a story)', icon: '📖' },
    { letter: 'd' as const, label: 'd. Dựng lều cắm trại (putting up a tent)', icon: '⛺' }
  ];

  const [userMatches, setUserMatches] = useState<Record<number, 'a' | 'b' | 'c' | 'd' | null>>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectMatch = (qId: number, letter: 'a' | 'b' | 'c' | 'd') => {
    sound.playClick();
    setUserMatches(prev => ({ ...prev, [qId]: letter }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userMatches).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    matchQuestions.forEach(q => {
      if (userMatches[q.id] === q.correctLetter) correct++;
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
    setUserMatches({ 1: null, 2: null, 3: null, 4: null });
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

    if (act5_1.trim().toLowerCase().includes('a story') || act5_1.trim().toLowerCase() === 'story') score++;
    if (act5_2.trim().toLowerCase().includes('a campfire') || act5_2.trim().toLowerCase() === 'campfire') score++;
    if (act5_3_1.trim().toLowerCase() === 'doing' && (act5_3_2.trim().toLowerCase().includes('a tent') || act5_3_2.trim().toLowerCase() === 'tent')) score++;
    if (act5_4_1.trim().toLowerCase().includes('the campsite') || act5_4_1.trim().toLowerCase() === 'campsite') {
      if (act5_4_2.trim().toLowerCase().includes('taking a photo') || act5_4_2.trim().toLowerCase() === 'taking a photo') score++;
    }

    if (score >= 3) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 70, spread: 60 });
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
  // ACTIVITY 6: LET'S PLAY - GUESS WHAT THEY ARE DOING
  // =========================================================================
  const guessCards = [
    {
      id: 1,
      imageDesc: 'Cô bé đang cầm micro hát vang bên đống lửa trại 🎤',
      targetSentence: "She's singing.",
      options: ["She's singing.", "She's putting up a tent.", "She's taking a photo."],
      correctIdx: 0,
      char: 'Mai'
    },
    {
      id: 2,
      imageDesc: 'Các bạn nhỏ đang nắm tay nhau nhảy múa quanh lửa trại 💃🔥',
      targetSentence: "They're dancing around the campfire.",
      options: ["They're building a campfire.", "They're dancing around the campfire.", "They're telling a story."],
      correctIdx: 1,
      char: 'Mary & Lucy'
    },
    {
      id: 3,
      imageDesc: 'Cậu bé đang giơ máy ảnh ngắm và chụp bạn bè 📸',
      targetSentence: "He's taking a photo.",
      options: ["He's telling a story.", "He's taking a photo.", "He's singing songs."],
      correctIdx: 1,
      char: 'Minh'
    }
  ];

  const [guessStep, setGuessStep] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState<number | null>(null);
  const [guessCorrect, setGuessCorrect] = useState<boolean | null>(null);

  const handleGuessChoice = (idx: number) => {
    setSelectedGuess(idx);
    if (idx === guessCards[guessStep].correctIdx) {
      sound.playSuccess();
      setGuessCorrect(true);
      onAddStar(2);
      confetti({ particleCount: 45, spread: 55 });
    } else {
      sound.playWrong();
      setGuessCorrect(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
              <span>🏕️ Unit 20 · Lesson 1</span>
              <span>· Trang 64 - 65 SGK</span>
            </span>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Tiết 2 ➡️</span>
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Tiết 3 ➡️</span>
                </button>
              )}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <span>Hoạt Động Trại Hè: &quot;What&apos;s he / she doing?&quot;</span>
            <span className="text-3xl">⛺🔥📖📸</span>
          </h2>
          <p className="text-orange-100 text-sm md:text-base max-w-3xl leading-relaxed">
            Học cách hỏi và trả lời một người đang làm gì ở khu cắm trại: 
            <span className="underline decoration-yellow-300 font-bold ml-1">putting up a tent</span> (dựng lều), 
            <span className="underline decoration-yellow-300 font-bold ml-1">building a campfire</span> (nhóm lửa trại), 
            <span className="underline decoration-yellow-300 font-bold ml-1">telling a story</span> (kể chuyện), 
            <span className="underline decoration-yellow-300 font-bold ml-1">taking a photo</span> (chụp ảnh).
          </p>

          {/* Activity Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
            {[
              { id: 1, label: '1. Hội Thoại Mẫu', icon: '📞' },
              { id: 2, label: '2. Luyện 4 Hoạt Động', icon: '⛺' },
              { id: 3, label: '3. Phỏng Vấn Khu Trại', icon: '🗣️' },
              { id: 4, label: '4. Nghe & Nối Tranh', icon: '🔗' },
              { id: 5, label: '5. Nhìn & Điền Từ', icon: '✍️' },
              { id: 6, label: '6. Game Đoán Hành Động', icon: '🎯' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSection(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === tab.id
                    ? 'bg-white text-orange-950 shadow-md scale-105'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 92)
      ===================================================================== */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 1 · Track 92
                </span>
                <span className="text-xs text-slate-500">Trang 64 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Look, listen and repeat (Quan sát, lắng nghe và nhắc lại)
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playSuccess();
                speakWord(
                  "Hi, Mai. Is Nam there? Yes, he is. What's he doing? He's building a campfire.",
                  speechRate
                );
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-md hover:from-orange-700 hover:to-amber-700 transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Bài Mẫu (Track 92)</span>
            </button>
          </div>

          {/* Dialog Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dialogSteps.map(step => (
              <div
                key={step.id}
                className="bg-orange-50/50 rounded-2xl p-5 border border-orange-200/60 space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between pb-2 border-b border-orange-200/60">
                  <span className="text-xs font-black text-orange-900 uppercase">
                    {step.part}
                  </span>
                  <span className="text-xs bg-orange-200/60 text-orange-900 px-2 py-0.5 rounded-full font-bold">
                    SGK Trang 64
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-orange-100">
                  💡 {step.context}
                </p>

                <div className="space-y-3">
                  {/* Speaker A */}
                  <div className="bg-white p-3.5 rounded-xl border border-orange-200/80 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarA}</span>
                        <span className="font-black text-xs text-orange-900">{step.speakerA}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textA, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textA}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaA}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingA}
                      </span>
                      <span className="text-xs text-slate-600 italic">
                        👉 {step.meaningA}
                      </span>
                    </div>
                  </div>

                  {/* Speaker B */}
                  <div className="bg-orange-100/70 p-3.5 rounded-xl border border-orange-300 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{step.avatarB}</span>
                        <span className="font-black text-xs text-orange-900">{step.speakerB}:</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(step.textB, speechRate);
                        }}
                        className="p-1.5 rounded-lg bg-orange-200 text-orange-900 hover:bg-orange-300 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-base font-black text-slate-900">{step.textB}</p>
                    <p className="text-xs font-mono text-slate-500">{step.ipaB}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-orange-900 bg-orange-200/70 px-2 py-0.5 rounded-md font-semibold">
                        🗣️ {step.readingB}
                      </span>
                      <span className="text-xs text-slate-700 italic font-medium">
                        👉 {step.meaningB}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grammar Tip Box */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-md bg-orange-200 text-orange-900 font-bold text-xs uppercase flex items-center gap-1 w-fit">
                <Lightbulb className="w-3.5 h-3.5" /> Bí Kíp Thì Hiện Tại Tiếp Diễn (Đang diễn ra)
              </span>
              <p className="font-black text-slate-900 text-sm md:text-base">
                Hỏi: <code className="text-orange-800 bg-white px-2 py-0.5 rounded font-bold">What&apos;s he / she doing?</code> (Anh ấy / Cô ấy đang làm gì?)
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                👉 Đáp: <code className="text-orange-800 bg-white px-2 py-0.5 rounded font-bold">He&apos;s / She&apos;s + V-ing</code> (Ví dụ: <em>He&apos;s building a campfire</em>, <em>She&apos;s taking a photo</em>).
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveSection(2);
              }}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 shrink-0"
            >
              <span>Xem 4 Hoạt Động (Tiết 1)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: LISTEN, POINT AND SAY (TRACK 93)
      ===================================================================== */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 2 · Track 93
                </span>
                <span className="text-xs text-slate-500">Trang 64 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen, point and say (Nghe, chỉ và nói hành động cắm trại)
              </h3>
            </div>

            <div className="text-xs text-slate-500 italic bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
              Nhấn vào từng thẻ để luyện câu hỏi và câu trả lời mẫu!
            </div>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {campActivities.map(item => {
              const isSelected = selectedActivity.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedActivity(item);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all text-center space-y-3 relative overflow-hidden ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-300 bg-orange-50/70 shadow-lg scale-102'
                      : 'border-slate-200 hover:border-orange-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-950 font-black text-xs flex items-center justify-center">
                      {item.label}
                    </span>
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <div>
                    <h4 className="font-black text-base text-slate-900">{item.actionEn}</h4>
                    <p className="text-[11px] font-mono text-slate-500">{item.ipa}</p>
                    <p className="text-xs text-orange-800 font-bold mt-0.5">🗣️ {item.reading}</p>
                    <p className="text-xs text-slate-600 italic mt-0.5">👉 {item.meaningVi}</p>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      sound.playClick();
                      speakWord(`What's ${item.gender} doing? ${item.fullSentence}`, speechRate);
                    }}
                    className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện Nói</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Focused Practice Stage */}
          <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 rounded-3xl p-6 border border-orange-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedActivity.icon}</span>
                <span className="font-black text-slate-900 text-base">
                  Thực Hành Hoạt Động: {selectedActivity.actionEn.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-bold text-orange-900 bg-orange-200/80 px-2.5 py-1 rounded-full">
                Nhân vật: {selectedActivity.character}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question */}
              <div className="bg-white p-4 rounded-2xl border border-orange-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-900 uppercase">Hỏi Hành Động:</span>
                  <button
                    onClick={() => speakWord(`What's ${selectedActivity.gender} doing?`, speechRate)}
                    className="p-1.5 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900">
                  What&apos;s {selectedActivity.gender} doing?
                </p>
                <p className="text-xs text-slate-600 italic">
                  👉 {selectedActivity.gender === 'he' ? 'Cậu ấy' : 'Cô ấy'} đang làm gì?
                </p>
              </div>

              {/* Answer */}
              <div className="bg-orange-600 text-white p-4 rounded-2xl border border-orange-700 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-100 uppercase">Trả Lời:</span>
                  <button
                    onClick={() => speakWord(selectedActivity.fullSentence, speechRate)}
                    className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-lg font-black">{selectedActivity.fullSentence}</p>
                <p className="text-xs text-orange-100 italic">
                  👉 {selectedActivity.fullSentenceVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: LET'S TALK
      ===================================================================== */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 3 · Let&apos;s talk
                </span>
                <span className="text-xs text-slate-500">Trang 64 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Toàn Cảnh Khu Cắm Trại: &quot;What&apos;s he / she doing?&quot;
              </h3>
            </div>
          </div>

          {/* Interactive Characters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {campsiteMapCharacters.map(char => (
              <button
                key={char.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCampCharacter(char);
                }}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  selectedCampCharacter.id === char.id
                    ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-300 font-bold'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                <span className="text-3xl">{char.icon}</span>
                <span className="text-sm font-black text-slate-900">{char.name}</span>
                <span className="text-xs text-slate-500">{char.actionVi}</span>
              </button>
            ))}
          </div>

          {/* Talk Stage */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-orange-200/80">
              <span className="text-xs font-black text-orange-900 uppercase">
                Phòng Thu Đối Thoại Trại Hè: {selectedCampCharacter.name}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(selectedCampCharacter.dialogEn, speechRate);
                }}
                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe Trọn Vẹn Cặp Câu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-orange-200 space-y-1">
                <span className="text-xs font-bold text-orange-800">Câu hỏi:</span>
                <p className="text-base font-black text-slate-900">
                  What&apos;s {selectedCampCharacter.gender} doing?
                </p>
                <p className="text-xs text-slate-500 italic">
                  (Cậu ấy / Cô ấy đang làm gì?)
                </p>
              </div>

              <div className="bg-orange-600 text-white p-4 rounded-2xl border border-orange-700 space-y-1">
                <span className="text-xs font-bold text-orange-100">Câu trả lời:</span>
                <p className="text-base font-black">
                  {selectedCampCharacter.gender === 'he' ? "He's" : "She's"} {selectedCampCharacter.action}.
                </p>
                <p className="text-xs text-orange-100 italic">
                  (Đang {selectedCampCharacter.actionVi}.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: LISTEN AND MATCH (TRACK 94)
      ===================================================================== */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 4 · Track 94
                </span>
                <span className="text-xs text-slate-500">Trang 65 SGK Tiếng Anh 4 Tập 2</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Listen and match (Nghe và nối bạn học với hành động tương ứng)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct4}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct4}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Kiểm tra đáp án
              </button>
            </div>
          </div>

          {/* Matching Grid */}
          <div className="space-y-4">
            {matchQuestions.map(q => {
              const currentPick = userMatches[q.id];
              const isSubmitted = act4Submitted;
              const isCorrect = currentPick === q.correctLetter;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{q.avatar}</span>
                      <span className="font-black text-slate-900 text-base">{q.charName}</span>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.script, speechRate);
                      }}
                      className="px-3 py-1 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Băng #{q.id}</span>
                    </button>
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
                    {matchOptions.map(opt => {
                      const isChosen = currentPick === opt.letter;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-orange-300';
                      if (isChosen) {
                        btnStyle = 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200 font-bold';
                      }
                      if (isSubmitted) {
                        if (opt.letter === q.correctLetter) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold ring-2 ring-emerald-200';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleSelectMatch(q.id, opt.letter)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{opt.icon}</span>
                            <span className="font-semibold">{opt.letter.toUpperCase()}</span>
                          </div>
                          {isChosen && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-700">
                      <p className="font-bold">
                        {isCorrect ? '✅ Nối rất chuẩn xác!' : '❌ Chưa đúng!'}
                      </p>
                      <p className="text-slate-600 mt-0.5">
                        👉 Đáp án chuẩn: {q.charName} nối với <strong>{q.correctLetter.toUpperCase()} ({q.correctDesc})</strong>.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 5: LOOK, COMPLETE AND READ
      ===================================================================== */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
                  Hoạt Động 5 · Look, complete and read
                </span>
                <span className="text-xs text-slate-500">Trang 65 SGK</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Quan sát tranh, điền từ còn thiếu vào chỗ trống và đọc to
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetAct5}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
              <button
                onClick={handleCheckAct5}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" /> Chấm điểm
              </button>
            </div>
          </div>

          {/* Word Bank Suggestions */}
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-orange-900 uppercase">Gợi ý từ cần điền:</span>
            {['a story', 'a campfire', 'doing', 'a tent', 'the campsite', 'taking a photo'].map(w => (
              <span
                key={w}
                className="px-2.5 py-1 rounded-lg bg-white border border-orange-300 text-xs font-mono font-bold text-orange-900"
              >
                {w}
              </span>
            ))}
          </div>

          {/* 4 Exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">1. Kể chuyện bên lều 📖</span>
                <button
                  onClick={() => speakWord("What's he doing at the campsite? He's telling a story.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">A: What&apos;s he doing at the campsite?</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: He&apos;s telling</span>
                <input
                  type="text"
                  value={act5_1}
                  onChange={e => setAct5_1(e.target.value)}
                  placeholder="điền từ..."
                  className="w-28 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>.</span>
              </div>
              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án: <strong>a story</strong></p>
              )}
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">2. Nhóm lửa trại 🔥</span>
                <button
                  onClick={() => speakWord("What's she doing at the campsite? She's building a campfire.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800">A: What&apos;s she doing at the campsite?</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: She&apos;s building</span>
                <input
                  type="text"
                  value={act5_2}
                  onChange={e => setAct5_2(e.target.value)}
                  placeholder="điền từ..."
                  className="w-32 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>.</span>
              </div>
              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án: <strong>a campfire</strong></p>
              )}
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">3. Dựng lều cắm trại ⛺</span>
                <button
                  onClick={() => speakWord("What's he doing at the campsite? He's putting up a tent.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>A: What&apos;s he</span>
                <input
                  type="text"
                  value={act5_3_1}
                  onChange={e => setAct5_3_1(e.target.value)}
                  placeholder="điền..."
                  className="w-20 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>at the campsite?</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: He&apos;s putting up</span>
                <input
                  type="text"
                  value={act5_3_2}
                  onChange={e => setAct5_3_2(e.target.value)}
                  placeholder="điền từ..."
                  className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>.</span>
              </div>
              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án: <strong>doing</strong> và <strong>a tent</strong></p>
              )}
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">4. Chụp ảnh 📸</span>
                <button
                  onClick={() => speakWord("What's she doing at the campsite? She's taking a photo.", speechRate)}
                  className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>A: What&apos;s she doing at</span>
                <input
                  type="text"
                  value={act5_4_1}
                  onChange={e => setAct5_4_1(e.target.value)}
                  placeholder="điền từ..."
                  className="w-28 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>?</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <span>B: She&apos;s</span>
                <input
                  type="text"
                  value={act5_4_2}
                  onChange={e => setAct5_4_2(e.target.value)}
                  placeholder="điền từ..."
                  className="w-32 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-300 bg-white"
                />
                <span>.</span>
              </div>
              {act5Submitted && (
                <p className="text-xs text-orange-700">👉 Đáp án: <strong>the campsite</strong> và <strong>taking a photo</strong></p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: LET'S PLAY - GUESS WHAT THEY ARE DOING
      ===================================================================== */}
      {activeSection === 6 && (
        <div className="bg-gradient-to-r from-orange-700 via-amber-700 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/20">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
                Hoạt Động 6 · Let&apos;s Play
              </span>
              <h3 className="text-xl md:text-2xl font-black mt-1">
                Trò Chơi Đoán Hành Động Trại Hè: &quot;Guess what they are doing&quot; 🎯
              </h3>
            </div>

            <span className="text-xs bg-white/20 px-3 py-1 rounded-xl font-bold">
              Câu đố {guessStep + 1} / {guessCards.length}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4 max-w-2xl mx-auto text-center">
            <span className="text-xs font-bold text-yellow-300 uppercase">
              Bức tranh bí mật trên bảng: {guessCards[guessStep].char}
            </span>
            <p className="text-lg font-black text-white">{guessCards[guessStep].imageDesc}</p>

            <div className="space-y-2.5 pt-3">
              {guessCards[guessStep].options.map((opt, idx) => {
                const isChosen = selectedGuess === idx;
                let btnStyle = 'bg-white/20 hover:bg-white/30 text-white';
                if (isChosen) {
                  btnStyle = guessCorrect
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                    : 'bg-rose-500 text-white';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleGuessChoice(idx)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isChosen && guessCorrect && <span>🌟 Chính xác!</span>}
                  </button>
                );
              })}
            </div>

            {guessCorrect && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedGuess(null);
                    setGuessCorrect(null);
                    if (guessStep < guessCards.length - 1) {
                      setGuessStep(prev => prev + 1);
                    } else {
                      setGuessStep(0);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white text-orange-950 font-black text-xs hover:bg-orange-100 transition shadow-md"
                >
                  {guessStep < guessCards.length - 1 ? 'Câu Đố Tiếp Theo ➡️' : 'Chơi Lại Từ Đầu 🔄'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
