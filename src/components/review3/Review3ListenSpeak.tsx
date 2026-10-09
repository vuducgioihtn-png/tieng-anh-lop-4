import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  Award,
  Headphones,
  Mic,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Home,
  Briefcase,
  User,
  Clock,
  Compass
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review3ListenSpeakProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface ListenQuestion {
  id: number;
  unitTag: string;
  unitIcon: string;
  titleVi: string;
  audioScript: string;
  options: {
    key: 'a' | 'b' | 'c';
    label: string;
    sublabel: string;
    icon: string;
  }[];
  correctAnswer: 'a' | 'b' | 'c';
  userChoice: 'a' | 'b' | 'c' | null;
  explanation: string;
}

export const Review3ListenSpeak: React.FC<Review3ListenSpeakProps> = ({
  speechRate,
  onAddStar
}) => {
  // =========================================================================
  // ACTIVITY 1: LISTEN AND TICK (TRANG 36 SGK)
  // =========================================================================
  const [listenQuestions, setListenQuestions] = useState<ListenQuestion[]>([
    {
      id: 1,
      unitTag: 'Unit 11 · My Home',
      unitIcon: '🏡',
      titleVi: 'Câu 1: Nam sống ở đâu và nơi đó như thế nào?',
      audioScript: 'Where do you live, Nam? - I live in Flat 12, Green Tower in the city. It is modern and quiet.',
      options: [
        { key: 'a', label: 'Flat 12, Green Tower', sublabel: 'Căn hộ tầng 12 chung cư xanh ở thành phố', icon: '🏢' },
        { key: 'b', label: 'A village house', sublabel: 'Ngôi nhà gỗ ở vùng quê đồi núi', icon: '🏡' },
        { key: 'c', label: 'A riverside cottage', sublabel: 'Căn nhà nhỏ yên bình ven sông', icon: '🌊' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Trong bài nghe: "I live in Flat 12, Green Tower in the city" -> Đáp án đúng là a.'
    },
    {
      id: 2,
      unitTag: 'Unit 12 · Jobs',
      unitIcon: '👨‍💼',
      titleVi: 'Câu 2: Bố của Lucy làm nghề gì và làm việc ở đâu?',
      audioScript: 'What does your father do, Lucy? - He is a factory worker. He works in a big car factory.',
      options: [
        { key: 'a', label: 'Doctor in hospital', sublabel: 'Bác sĩ chữa bệnh ở bệnh viện', icon: '👨‍⚕️' },
        { key: 'b', label: 'Factory worker', sublabel: 'Công nhân làm việc trong nhà máy ô tô', icon: '🏭' },
        { key: 'c', label: 'Farmer on a farm', sublabel: 'Bác nông dân chăm sóc nông trại', icon: '🌾' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Trong bài nghe: "He is a factory worker. He works in a big car factory" -> Đáp án đúng là b.'
    },
    {
      id: 3,
      unitTag: 'Unit 13 · Appearance',
      unitIcon: '👤',
      titleVi: 'Câu 3: Chị gái của bạn ấy trông như thế nào?',
      audioScript: 'What does your sister look like? - She is slim. She has a round face and long black hair.',
      options: [
        { key: 'a', label: 'Short hair & big eyes', sublabel: 'Tóc ngắn cá tính và mắt to tròn', icon: '👧' },
        { key: 'b', label: 'Slim, round face & long hair', sublabel: 'Mảnh mai, gương mặt tròn và mái tóc dài đen', icon: '👩' },
        { key: 'c', label: 'Tall & curly hair', sublabel: 'Dáng cao lớn và mái tóc xoăn ngắn', icon: '👱‍♀️' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Trong bài nghe: "She is slim. She has a round face and long black hair" -> Đáp án đúng là b.'
    },
    {
      id: 4,
      unitTag: 'Unit 14 · Daily Activities',
      unitIcon: '🧹',
      titleVi: 'Câu 4: Bạn Ben làm gì vào chiều Chủ nhật?',
      audioScript: 'What do you do on Sunday afternoon, Ben? - I wash the clothes and clean the floor with my brother.',
      options: [
        { key: 'a', label: 'Wash clothes & clean floor', sublabel: 'Giặt giũ quần áo và lau sạch sàn nhà', icon: '🧺' },
        { key: 'b', label: 'Watch TV & play games', sublabel: 'Xem ti vi hoạt hình và chơi trò chơi', icon: '📺' },
        { key: 'c', label: 'Cook dinner & wash dishes', sublabel: 'Nấu bữa tối và rửa chén đĩa', icon: '🍳' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Trong bài nghe: "I wash the clothes and clean the floor with my brother" -> Đáp án đúng là a.'
    },
    {
      id: 5,
      unitTag: 'Unit 15 · Weekends',
      unitIcon: '🎾',
      titleVi: 'Câu 5: Gia đình Mai đi đâu vào thứ Bảy?',
      audioScript: 'Where does your family go on Saturdays, Mai? - We go to the sports centre. My dad and I play tennis, and my mum swims.',
      options: [
        { key: 'a', label: 'Go to cinema', sublabel: 'Cả nhà đi xem phim hoạt hình ở rạp', icon: '🎬' },
        { key: 'b', label: 'Go to sports centre', sublabel: 'Đến trung tâm thể thao chơi tennis & bơi lội', icon: '🏟️' },
        { key: 'c', label: 'Go to water park', sublabel: 'Đi chơi công viên nước tắm mát', icon: '🌊' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Trong bài nghe: "We go to the sports centre... play tennis and swim" -> Đáp án đúng là b.'
    }
  ]);

  const [act1Checked, setAct1Checked] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const handleSelectChoice = (questionId: number, choiceKey: 'a' | 'b' | 'c') => {
    sound.playClick();
    setListenQuestions(prev =>
      prev.map(q => (q.id === questionId ? { ...q, userChoice: choiceKey } : q))
    );
  };

  const handleCheckAct1 = () => {
    const allAnswered = listenQuestions.every(q => q.userChoice !== null);
    if (!allAnswered) {
      sound.playWarning();
      return;
    }

    setAct1Checked(true);
    let correctCount = 0;
    listenQuestions.forEach(q => {
      if (q.userChoice === q.correctAnswer) {
        correctCount += 1;
      }
    });

    if (correctCount === listenQuestions.length) {
      sound.playComplete();
      onAddStar(5);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playSuccess();
      onAddStar(correctCount);
    }
  };

  const handleResetAct1 = () => {
    sound.playClick();
    setListenQuestions(prev => prev.map(q => ({ ...q, userChoice: null })));
    setAct1Checked(false);
  };

  // =========================================================================
  // ACTIVITY 2: ASK AND ANSWER (LUYỆN NÓI PHẢN XẠ 5 CHỦ ĐỀ)
  // =========================================================================
  const speakingCards = [
    {
      id: 1,
      unit: 'Unit 11 · My home',
      icon: '🏡',
      themeColor: 'emerald',
      qEn: 'Where do you live?',
      qVi: 'Bạn sống ở đâu vậy?',
      qIpa: '/weə duː juː lɪv/',
      aEn: 'I live in Flat 16, Sunflower Tower in the city.',
      aVi: 'Tớ sống ở căn hộ 16, toà nhà Hoa Hướng Dương ở thành phố.',
      aIpa: '/aɪ lɪv ɪn flæt sɪksˈtiːn...',
      followUpEn: 'What is your place like? - It is big and quiet.',
      followUpVi: 'Nơi đó như thế nào? - Nó rộng rãi và yên tĩnh.'
    },
    {
      id: 2,
      unit: 'Unit 12 · Jobs & Places',
      icon: '👨‍💼',
      themeColor: 'blue',
      qEn: 'What does your father do? Where does he work?',
      qVi: 'Bố của bạn làm nghề gì? Bác ấy làm việc ở đâu?',
      qIpa: '/wɒt dʌz jɔː ˈfɑːðə duː? weə dʌz hiː wɜːk/',
      aEn: 'He is a doctor. He works in a children’s hospital.',
      aVi: 'Bố tớ là bác sĩ. Bác ấy làm việc ở bệnh viện nhi.',
      aIpa: '/hiː ɪz ə ˈdɒktə. hiː wɜːks ɪn ə ˈhɒspɪtl/',
      followUpEn: 'What about your mother? - She is an English teacher at a school.',
      followUpVi: 'Thế còn mẹ bạn? - Mẹ tớ là giáo viên tiếng Anh ở trường.'
    },
    {
      id: 3,
      unit: 'Unit 13 · Appearance',
      icon: '👤',
      themeColor: 'purple',
      qEn: 'What does your best friend look like?',
      qVi: 'Bạn thân nhất của bạn trông như thế nào?',
      qIpa: '/wɒt dʌz jɔː bɛst frɛnd lʊk laɪk/',
      aEn: 'He is tall and slim. He has a round face and short hair.',
      aVi: 'Cậu ấy cao và thon thả. Cậu ấy có khuôn mặt tròn và tóc ngắn.',
      aIpa: '/hiː ɪz tɔːl ænd slɪm. hiː hæz ə raʊnd feɪs...',
      followUpEn: 'Does she have big eyes? - Yes, she has big brown eyes.',
      followUpVi: 'Bạn ấy có đôi mắt to không? - Có, bạn ấy có đôi mắt to màu nâu.'
    },
    {
      id: 4,
      unit: 'Unit 14 · Daily Activities',
      icon: '🧹',
      themeColor: 'amber',
      qEn: 'What do you do in the morning before school?',
      qVi: 'Bạn làm gì vào buổi sáng trước khi đến trường?',
      qIpa: '/wɒt duː juː duː ɪn ðə ˈmɔːnɪŋ/',
      aEn: 'I wash my face, do morning exercise and have breakfast.',
      aVi: 'Tớ rửa mặt, tập thể dục buổi sáng và ăn bữa sáng.',
      aIpa: '/aɪ wɒʃ maɪ feɪs, duː ˈmɔːnɪŋ ˈɛksəsaɪz ænd hæv ˈbrɛkfəst/',
      followUpEn: 'When do you do your homework? - I do it in the evening.',
      followUpVi: 'Khi nào bạn làm bài tập? - Tớ làm bài tập vào buổi tối.'
    },
    {
      id: 5,
      unit: 'Unit 15 · Family Weekends',
      icon: '🎾',
      themeColor: 'teal',
      qEn: 'Where does your family go on Sundays?',
      qVi: 'Gia đình bạn đi đâu vào các ngày Chủ nhật?',
      qIpa: '/weə dʌz jɔː ˈfæmɪli ɡəʊ ɒn ˈsʌndeɪz/',
      aEn: 'We go to the water park. We swim and play happily.',
      aVi: 'Cả nhà tớ đi công viên nước. Bọn tớ bơi lội và vui đùa thoả thích.',
      aIpa: '/wiː ɡəʊ tuː ðə ˈwɔːtə pɑːk. wiː swɪm ænd pleɪ/',
      followUpEn: 'What does your brother do? - He rides a bike in the park.',
      followUpVi: 'Anh trai bạn làm gì? - Anh ấy đạp xe trong công viên.'
    }
  ];

  const [activeSpeakingIdx, setActiveSpeakingIdx] = useState(0);
  const [speechRecorded, setSpeechRecorded] = useState(false);

  const currentSpeaking = speakingCards[activeSpeakingIdx];

  const handleSimulateRecord = () => {
    sound.playClick();
    setSpeechRecorded(true);
    setTimeout(() => {
      sound.playSuccess();
      onAddStar(1);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* ACTIVITY 1: LISTEN AND TICK */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 36 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Kỹ năng Nghe</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Headphones className="w-6 h-6 text-indigo-600" />
              1. Listen and Tick (Nghe và Đánh Dấu Đúng)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Bé hãy bấm nút loa 🔊 để nghe từng câu thoại, quan sát 3 bức tranh và chọn hình chính xác nhất nhé!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScript(!showScript)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {showScript ? 'Ẩn lời thoại (Script)' : 'Hiện lời thoại (Script)'}
            </button>
            <button
              onClick={handleResetAct1}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct1}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Kiểm tra kết quả
            </button>
          </div>
        </div>

        {/* 5 Questions */}
        <div className="space-y-6">
          {listenQuestions.map((q, idx) => {
            const isUserAnswered = q.userChoice !== null;
            const isCorrect = q.userChoice === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  act1Checked
                    ? isCorrect
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-rose-400 bg-rose-50/20'
                    : 'border-slate-200 bg-slate-50/40 hover:border-indigo-300'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-100 text-indigo-700">
                      {q.unitIcon} {q.unitTag}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base">
                      {q.titleVi}
                    </h4>
                  </div>

                  {/* Play Audio Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakWord(q.audioScript, speechRate)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 border border-indigo-200"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                      <span>Nghe câu {idx + 1} 🔊</span>
                    </button>
                    <button
                      onClick={() => speakWord(q.audioScript, 0.7)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs flex items-center gap-1 transition active:scale-95 border border-amber-200"
                      title="Nghe tốc độ chậm"
                    >
                      <span>🐢 Chậm 0.7x</span>
                    </button>
                  </div>
                </div>

                {/* Script peek */}
                {showScript && (
                  <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Lời thoại gốc Track Audio:</p>
                      <p className="italic font-medium">{q.audioScript}</p>
                    </div>
                  </div>
                )}

                {/* 3 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {q.options.map(opt => {
                    const isSelected = q.userChoice === opt.key;
                    let btnStyle = 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/20';

                    if (act1Checked) {
                      if (opt.key === q.correctAnswer) {
                        btnStyle = 'border-emerald-500 bg-emerald-100/50 text-emerald-900 ring-2 ring-emerald-400';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-100/50 text-rose-900';
                      } else {
                        btnStyle = 'border-slate-200 bg-slate-100/50 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-400 shadow-sm';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectChoice(q.id, opt.key)}
                        disabled={act1Checked}
                        className={`p-3.5 rounded-2xl border-2 text-left transition flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="text-3xl shrink-0 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
                          {opt.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-sm uppercase text-slate-700">
                              Hình {opt.key.toUpperCase()}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-slate-800 text-xs mt-0.5 leading-snug">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {opt.sublabel}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {act1Checked && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-100/60 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100/60 text-rose-900 border border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
                      />
                      <span>
                        <strong>Giải thích:</strong> {q.explanation}
                      </span>
                    </div>
                    {isCorrect && (
                      <span className="font-black text-emerald-700 flex items-center gap-1 shrink-0">
                        ⭐ +1 Sao!
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 2: ASK AND ANSWER (LUYỆN NÓI PHẢN XẠ) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
              Trang 36 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Kỹ năng Nói Phản Xạ</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-purple-600" />
            2. Ask and Answer (Luyện Hỏi &amp; Đáp Trực Quan 5 Chủ Đề)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Chọn chủ đề bên dưới, bấm loa nghe phát âm chuẩn và thực hành nói to rõ ràng cùng các bạn nhé!
          </p>
        </div>

        {/* 5 Topic Tabs */}
        <div className="flex flex-wrap gap-2">
          {speakingCards.map((card, idx) => {
            const isTabActive = activeSpeakingIdx === idx;
            return (
              <button
                key={card.id}
                onClick={() => {
                  sound.playClick();
                  setActiveSpeakingIdx(idx);
                  setSpeechRecorded(false);
                }}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all ${
                  isTabActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200 ring-2 ring-purple-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{card.icon}</span>
                <span>{card.unit}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Speaking Stage */}
        <div className="bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 rounded-3xl p-6 border-2 border-purple-200 space-y-6">
          {/* Question Box */}
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="text-3xl p-2 bg-purple-100 rounded-2xl shrink-0">❓</span>
              <div>
                <span className="text-xs font-black uppercase text-purple-600 tracking-wider">
                  Câu hỏi của bạn (Question):
                </span>
                <h4 className="text-lg md:text-xl font-black text-slate-800 mt-0.5">
                  &ldquo;{currentSpeaking.qEn}&rdquo;
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{currentSpeaking.qIpa}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium italic">
                  💡 Nghĩa tiếng Việt: {currentSpeaking.qVi}
                </p>
              </div>
            </div>

            <button
              onClick={() => speakWord(currentSpeaking.qEn, speechRate)}
              className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs flex items-center gap-2 transition active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 text-purple-700" />
              <span>Nghe câu hỏi 🔊</span>
            </button>
          </div>

          {/* Answer Box */}
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="text-3xl p-2 bg-emerald-100 rounded-2xl shrink-0">💬</span>
              <div>
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                  Câu trả lời mẫu (Sample Answer):
                </span>
                <h4 className="text-lg md:text-xl font-black text-slate-800 mt-0.5">
                  &ldquo;{currentSpeaking.aEn}&rdquo;
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{currentSpeaking.aIpa}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium italic">
                  💡 Nghĩa tiếng Việt: {currentSpeaking.aVi}
                </p>
              </div>
            </div>

            <button
              onClick={() => speakWord(currentSpeaking.aEn, speechRate)}
              className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-2 transition active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>Nghe câu trả lời 🔊</span>
            </button>
          </div>

          {/* Follow-up Bonus */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <span className="text-2xl shrink-0">🌟</span>
            <div className="text-xs text-amber-950">
              <p className="font-extrabold text-amber-800 mb-0.5">
                Mở rộng giao tiếp nâng cao (Follow-up conversation):
              </p>
              <p className="font-bold text-sm text-slate-800">{currentSpeaking.followUpEn}</p>
              <p className="italic text-slate-600 mt-0.5">{currentSpeaking.followUpVi}</p>
            </div>
            <button
              onClick={() => speakWord(currentSpeaking.followUpEn, speechRate)}
              className="ml-auto px-2.5 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 font-bold text-xs shrink-0 transition"
            >
              <Volume2 className="w-3.5 h-3.5 inline mr-1" /> Nghe
            </button>
          </div>

          {/* Practice Speaking Zone */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Mic className="w-4 h-4 text-purple-600" />
              <span>Bé hãy bấm &ldquo;Tôi Đã Nói To Rõ Ràng&rdquo; sau khi tự đọc to câu tiếng Anh nhé!</span>
            </div>

            <button
              onClick={handleSimulateRecord}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-md transition flex items-center gap-2 active:scale-95 ${
                speechRecorded
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-105'
              }`}
            >
              {speechRecorded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Đã hoàn thành! (+1 ⭐)</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-yellow-300" />
                  <span>Tôi Đã Nói To Rõ Ràng (Nhận 1 ⭐)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
