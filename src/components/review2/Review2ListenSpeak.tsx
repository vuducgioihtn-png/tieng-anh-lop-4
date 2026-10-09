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
  CheckCircle2
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review2ListenSpeakProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface ListenQuestion {
  id: number;
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

export const Review2ListenSpeak: React.FC<Review2ListenSpeakProps> = ({
  speechRate,
  onAddStar
}) => {
  // Activity 1: Listen and tick (Track 107)
  const [listenQuestions, setListenQuestions] = useState<ListenQuestion[]>([
    {
      id: 1,
      titleVi: 'Câu 1: Trường của bạn có bao nhiêu tòa nhà?',
      audioScript: 'How many buildings are there in your school? - There are three buildings.',
      options: [
        { key: 'a', label: 'Three buildings', sublabel: '3 toà nhà cao tầng hiện đại', icon: '🏫' },
        { key: 'b', label: 'Two buildings', sublabel: '2 toà nhà sơn vàng ở nông thôn', icon: '🏡' },
        { key: 'c', label: 'One building', sublabel: '1 toà nhà nhỏ bên cánh đồng lúa', icon: '🌾' }
      ],
      correctAnswer: 'a',
      userChoice: null,
      explanation: 'Trong bài nghe Track 107: "There are three buildings" (Có 3 toà nhà) -> Chọn hình a.'
    },
    {
      id: 2,
      titleVi: 'Câu 2: Bạn có tiết Âm nhạc (Music) vào thứ mấy?',
      audioScript: 'When do you have music? - I have it on Wednesdays.',
      options: [
        { key: 'a', label: 'Monday: Music', sublabel: 'Thứ Hai có môn Âm nhạc', icon: '📅' },
        { key: 'b', label: 'Wednesday: Music', sublabel: 'Thứ Tư có môn Âm nhạc', icon: '🎵' },
        { key: 'c', label: 'Thursday: Music', sublabel: 'Thứ Năm có môn Âm nhạc', icon: '🎶' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Bài nghe nêu rõ: "I have it on Wednesdays" (Tớ học môn Âm nhạc vào các ngày thứ Tư) -> Chọn hình b.'
    },
    {
      id: 3,
      titleVi: 'Câu 3: Môn học yêu thích của bạn là gì?',
      audioScript: 'What’s your favourite subject? - It’s art. I like drawing and painting.',
      options: [
        { key: 'a', label: 'Maths', sublabel: 'Môn Toán (410 + 12 trên bảng đen)', icon: '🔢' },
        { key: 'b', label: 'English', sublabel: 'Môn Tiếng Anh (sách Unit 8)', icon: '📘' },
        { key: 'c', label: 'Art', sublabel: 'Môn Mỹ thuật (vẽ tranh lọ hoa)', icon: '🎨' }
      ],
      correctAnswer: 'c',
      userChoice: null,
      explanation: 'Câu trả lời trong băng là: "It’s art" (Đó là môn Mỹ thuật) -> Chọn hình c bạn vẽ tranh.'
    },
    {
      id: 4,
      titleVi: 'Câu 4: Ngày hội thể thao (Sports day) diễn ra vào tháng mấy?',
      audioScript: 'When is your sports day? - It’s in March.',
      options: [
        { key: 'a', label: 'October', sublabel: 'Tháng 10 (mùa thu)', icon: '🍂' },
        { key: 'b', label: 'March', sublabel: 'Tháng 3 (mùa xuân)', icon: '🌸' },
        { key: 'c', label: 'May', sublabel: 'Tháng 5 (đầu hè)', icon: '☀️' }
      ],
      correctAnswer: 'b',
      userChoice: null,
      explanation: 'Băng phát âm chuẩn: "It’s in March" (Vào tháng Ba) -> Chọn tờ lịch b.'
    },
    {
      id: 5,
      titleVi: 'Câu 5: Mùa hè vừa rồi bạn đã ở đâu?',
      audioScript: 'Where were you last summer? - I was at the beach.',
      options: [
        { key: 'a', label: 'at the campsite', sublabel: 'Ở khu cắm trại trên núi', icon: '⛺' },
        { key: 'b', label: 'at the zoo', sublabel: 'Ở vườn bách thú xem voi', icon: '🐘' },
        { key: 'c', label: 'at the beach', sublabel: 'Ở bãi biển tắm biển & xây lâu đài cát', icon: '🏖️' }
      ],
      correctAnswer: 'c',
      userChoice: null,
      explanation: 'Bạn nhỏ trả lời: "I was at the beach" (Tớ đã ở bãi biển) -> Chọn hình c.'
    }
  ]);

  const [listenSubmitted, setListenSubmitted] = useState<boolean>(false);

  // Activity 2: Ask and answer (4 Scenarios)
  const askAnswerCards = [
    {
      id: 1,
      question: 'How many buildings are there in your school?',
      questionVi: 'Trường bạn có bao nhiêu tòa nhà?',
      answer: 'There are three.',
      answerFull: 'There are three buildings in my school.',
      answerVi: 'Có ba toà nhà trong trường của tớ.',
      cueIcon: '🏫',
      cueVi: 'Bong bóng gợi ý: Hình ảnh ngôi trường gồm 3 toà nhà khang trang'
    },
    {
      id: 2,
      question: 'What’s your favourite subject?',
      questionVi: 'Môn học yêu thích của bạn là môn gì?',
      answer: 'It’s English.',
      answerFull: 'My favourite subject is English.',
      answerVi: 'Đó là môn Tiếng Anh.',
      cueIcon: '📘',
      cueVi: 'Bong bóng gợi ý: Cuốn sách giáo khoa Tiếng Anh 4'
    },
    {
      id: 3,
      question: 'When is your sports day?',
      questionVi: 'Ngày hội thể thao của trường bạn vào khi nào?',
      answer: 'It’s in November.',
      answerFull: 'Our sports day is in November.',
      answerVi: 'Nó diễn ra vào tháng Mười Một.',
      cueIcon: '🗓️',
      cueVi: 'Bong bóng gợi ý: Tờ lịch tháng 11 (NOVEMBER)'
    },
    {
      id: 4,
      question: 'Where were you last summer?',
      questionVi: 'Mùa hè năm ngoái bạn đã ở đâu?',
      answer: 'I was at the beach.',
      answerFull: 'I was at the beach with my family.',
      answerVi: 'Tớ đã ở bãi biển.',
      cueIcon: '🏖️',
      cueVi: 'Bong bóng gợi ý: Bạn nhỏ vui đùa bên bờ biển sóng vỗ'
    }
  ];

  const [activeSpeechCard, setActiveSpeechCard] = useState<number | null>(null);

  const handleSelectOption = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setListenQuestions(prev =>
      prev.map(q => (q.id === qId ? { ...q, userChoice: key } : q))
    );
  };

  const handleCheckListening = () => {
    const allAnswered = listenQuestions.every(q => q.userChoice !== null);
    if (!allAnswered) {
      alert('Em hãy chọn đáp án cho tất cả 5 câu hỏi trước khi kiểm tra nhé!');
      return;
    }
    const correctCount = listenQuestions.filter(q => q.userChoice === q.correctAnswer).length;
    setListenSubmitted(true);
    if (correctCount === 5) {
      sound.playFanfare();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else if (correctCount >= 3) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  const handleResetListening = () => {
    sound.playClick();
    setListenQuestions(prev => prev.map(q => ({ ...q, userChoice: null })));
    setListenSubmitted(false);
  };

  return (
    <div className="space-y-8">
      {/* Activity 1 Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                  Hoạt Động 1 · Trang 74
                </span>
                <span className="text-xs font-semibold text-slate-500">Track 107 Audio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Listen and tick 🎧 (Nghe và đánh dấu chọn)
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckListening}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra đáp án
            </button>
            <button
              onClick={handleResetListening}
              className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
              title="Làm lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Questions */}
        <div className="space-y-6 mt-6">
          {listenQuestions.map((q, idx) => {
            const isCorrect = q.userChoice === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  listenSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-rose-300 bg-rose-50/40'
                    : 'border-slate-100 bg-slate-50/60 hover:border-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800 text-sm md:text-base">
                      {q.titleVi}
                    </span>
                  </div>
                  <button
                    onClick={() => speakWord(q.audioScript, speechRate)}
                    className="self-start sm:self-auto px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" /> Nghe audio Track 107
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {q.options.map(opt => {
                    const isSelected = q.userChoice === opt.key;
                    const isRightOption = q.correctAnswer === opt.key;

                    let cardStyle = 'border-slate-200 bg-white hover:border-amber-300 text-slate-700';
                    if (isSelected && !listenSubmitted) {
                      cardStyle = 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-md';
                    }
                    if (listenSubmitted) {
                      if (isRightOption) {
                        cardStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold ring-2 ring-emerald-400';
                      } else if (isSelected && !isRightOption) {
                        cardStyle = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${cardStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {opt.key.toUpperCase()}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{opt.icon}</span>
                            <span className="font-bold text-sm truncate">{opt.label}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{opt.sublabel}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {listenSubmitted && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-700">{q.explanation}</p>
                      <p className="text-slate-500 italic mt-0.5">
                        Lời thoại mẫu: &quot;{q.audioScript}&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity 2: Ask and answer */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-500 text-white">
                Hoạt Động 2 · Trang 74
              </span>
              <span className="text-xs font-semibold text-slate-500">Speaking Studio</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Ask and answer 🗣️ (Hỏi và trả lời theo tranh gợi ý)
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 mt-4">
          Bấm vào từng thẻ để nghe câu hỏi, xem bóng thoại gợi ý của SGK và tập trả lời chuẩn ngữ điệu tiếng Anh!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {askAnswerCards.map(item => {
            const isActive = activeSpeechCard === item.id;
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isActive
                    ? 'border-sky-500 bg-sky-50/50 shadow-md ring-2 ring-sky-200'
                    : 'border-slate-200 bg-white hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-black text-xs">
                    Tình huống {item.id}
                  </span>
                  <span className="text-2xl">{item.cueIcon}</span>
                </div>

                {/* Question */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm md:text-base">
                      {item.question}
                    </span>
                    <button
                      onClick={() => speakWord(item.question, speechRate)}
                      className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-lg transition"
                      title="Nghe câu hỏi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 italic">{item.questionVi}</p>
                </div>

                {/* Cue bubble */}
                <div className="my-3 p-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{item.cueVi}</span>
                </div>

                {/* Answer toggle */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveSpeechCard(isActive ? null : item.id);
                      }}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 transition flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {isActive ? 'Ẩn câu trả lời' : 'Xem câu trả lời mẫu'}
                    </button>
                    <button
                      onClick={() => {
                        speakWord(item.answerFull, speechRate);
                        onAddStar(1);
                      }}
                      className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Luyện nói &amp; Nghe
                    </button>
                  </div>

                  {isActive && (
                    <div className="p-3 rounded-xl bg-sky-100/70 border border-sky-200 animate-fadeIn space-y-1">
                      <p className="font-extrabold text-sky-950 text-sm">{item.answerFull}</p>
                      <p className="text-xs text-sky-800">{item.answerVi}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
