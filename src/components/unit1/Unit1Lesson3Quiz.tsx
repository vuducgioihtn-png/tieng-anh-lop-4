import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Star,
  Volume2,
  Award,
  ArrowRight
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit1Lesson3QuizProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  speakAudio?: string;
  options: {
    key: string;
    text: string;
    flag?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  funFact: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Âm kết thúc của từ "America" phát âm chuẩn là gì?',
    subtitle: 'Nghe kỹ âm đuôi của từ Americ-a 🇺🇸',
    badge: 'Ngữ Âm Cốt Lõi',
    speakAudio: 'America',
    options: [
      { key: 'A', text: 'Âm /ə/ (đọc lướt là "kơ" nhẹ nhàng, không bè miệng)', isCorrect: true },
      { key: 'B', text: 'Âm /iə/ (đọc là "li-ơ")', isCorrect: false },
      { key: 'C', text: 'Âm /a/ (đọc to bè mồm thành "ca")', isCorrect: false }
    ],
    explanation: 'Chữ cái "a" ở cuối từ America tạo thành nguyên âm lướt /ə/ (Schwa). Môi thả lỏng, cằm hơi trễ xuống nhẹ nhàng như một hơi thở: Ờ-ME-ri-kơ.',
    funFact: '🗽 Nước Mỹ có tượng Nữ Thần Tự Do nổi tiếng thế giới!'
  },
  {
    id: 2,
    title: 'Âm kết thúc của từ "Australia" phát âm chuẩn là gì?',
    subtitle: 'Nghe kỹ âm đuôi của từ Austral-ia 🇦🇺',
    badge: 'Ngữ Âm Cốt Lõi',
    speakAudio: 'Australia',
    options: [
      { key: 'A', text: 'Âm /ə/ (kơ)', isCorrect: false },
      { key: 'B', text: 'Âm /iə/ (nguyên âm đôi trượt từ /i/ sang /ə/ tạo thành "li-ơ")', isCorrect: true },
      { key: 'C', text: 'Âm /e/ (le)', isCorrect: false }
    ],
    explanation: 'Chữ cái "ia" ở cuối tạo thành nguyên âm đôi /iə/. Hãy cười nhẹ tạo âm /i/ rồi trượt thả lỏng sang /ə/: O-STREI-li-ơ.',
    funFact: '🦘 Nước Úc là quê hương của loài chuột túi Kangaroo và gấu Koala siêu dễ thương!'
  },
  {
    id: 3,
    title: 'Trong bài đọc trang 15 SGK, bạn Tony đến từ nước nào?',
    subtitle: '"Tony is from _______."',
    badge: 'Đọc Hiểu SGK',
    speakAudio: 'Tony is from America.',
    options: [
      { key: 'A', text: 'America (Nước Mỹ)', flag: '🇺🇸', isCorrect: true },
      { key: 'B', text: 'Australia (Nước Úc)', flag: '🇦🇺', isCorrect: false },
      { key: 'C', text: 'Viet Nam (Việt Nam)', flag: '🇻🇳', isCorrect: false }
    ],
    explanation: 'Trong bài tự giới thiệu, bạn Minh nói: "Tony is from America." (Tony đến từ nước Mỹ).',
    funFact: '🤝 Minh có 2 người bạn quốc tế mới quen là Tony và Laura.'
  },
  {
    id: 4,
    title: 'Trong bài đọc, bạn Laura đến từ nước nào?',
    subtitle: '"Laura is from _______."',
    badge: 'Đọc Hiểu SGK',
    speakAudio: 'Laura is from Australia.',
    options: [
      { key: 'A', text: 'America (Nước Mỹ)', flag: '🇺🇸', isCorrect: false },
      { key: 'B', text: 'Australia (Nước Úc)', flag: '🇦🇺', isCorrect: true },
      { key: 'C', text: 'Britain (Nước Anh)', flag: '🇬🇧', isCorrect: false }
    ],
    explanation: 'Minh viết: "Laura is from Australia. They are friendly." (Laura đến từ nước Úc. Các bạn ấy rất thân thiện).',
    funFact: '⭐ Từ "friendly" nghĩa là thân thiện, cởi mở và tốt bụng!'
  },
  {
    id: 5,
    title: 'Trong Thẻ Học Sinh (Pupil Card) mẫu của bạn Minh, thông tin tuổi là bao nhiêu?',
    subtitle: 'Quan sát thẻ mẫu Hoạt Động 6 trang 15',
    badge: 'Thẻ Học Sinh Quốc Tế',
    speakAudio: 'I am nine years old. I am from Viet Nam.',
    options: [
      { key: 'A', text: 'Age: 8 (Tám tuổi)', isCorrect: false },
      { key: 'B', text: 'Age: 9 (Chín tuổi)', isCorrect: true },
      { key: 'C', text: 'Age: 10 (Mười tuổi)', isCorrect: false }
    ],
    explanation: 'Trên thẻ Pupil Card của Minh ghi rõ: Name: Minh - Age: 9 - Country: Viet Nam.',
    funFact: '🪪 Thẻ học sinh quốc tế giúp các bạn nhỏ kết nối vòng tay bè bạn khắp năm châu!'
  }
];

export const Unit1Lesson3Quiz: React.FC<Unit1Lesson3QuizProps> = ({
  speechRate,
  onAddStar
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (key: string) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedKey(key);
    setIsAnswered(true);

    const isCorrect = currentQ.options.find(o => o.key === key)?.isCorrect;
    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
      onAddStar(2);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedKey(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
      sound.playVictory();
      confetti({ particleCount: 100, spread: 80 });
      onAddStar(5);
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
  };

  if (showSummary) {
    const isPerfect = score === QUIZ_QUESTIONS.length;
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-teal-400/40 text-center space-y-6">
        <div className="inline-flex p-4 rounded-3xl bg-teal-500/20 border border-teal-300/30 text-teal-300 shadow-inner">
          <Trophy className="w-16 h-16 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            {isPerfect ? '🌟 Xuất Sắc Tuyệt Đối!' : '🎉 Hoàn Thành Thử Thách!'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Tổng Kết Thử Thách Ngữ Âm & Đọc Hiểu Tiết 3
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Bé đã hoàn thành xuất sắc 5 câu hỏi trọng tâm bài học Unit 1 Lesson 3!
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[120px]">
            <div className="text-3xl font-black text-amber-400">{score} / {QUIZ_QUESTIONS.length}</div>
            <div className="text-xs text-slate-300 font-bold mt-1">Câu trả lời đúng</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[120px]">
            <div className="text-3xl font-black text-teal-300">+{score * 2 + 5} ⭐</div>
            <div className="text-xs text-slate-300 font-bold mt-1">Ngôi sao thưởng</div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Thử Thách</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/30 space-y-6">
      {/* Quiz Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
              {currentQ.badge}
            </span>
            <span className="text-xs text-slate-400">
              Câu {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            🎮 Siêu Đố Vui Ngữ Âm & Trí Nhớ Bài 3
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="w-32 sm:w-40 bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/20">
            <div
              className="bg-gradient-to-r from-amber-400 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-amber-400">
            ⭐ {score} đúng
          </span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-black text-white leading-snug">
              {currentQ.title}
            </h4>
            <p className="text-xs sm:text-sm text-teal-200 font-medium">
              {currentQ.subtitle}
            </p>
          </div>

          {currentQ.speakAudio && (
            <button
              onClick={() => speakWord(currentQ.speakAudio!, speechRate)}
              className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-slate-950" />
              <span>Nghe mẫu</span>
            </button>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ.options.map(opt => {
            const isSelected = selectedKey === opt.key;
            let btnStyle = 'bg-white/10 hover:bg-white/20 border-white/15 text-white';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 font-black';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'bg-rose-500/30 border-rose-400 text-rose-200 ring-2 ring-rose-400/50';
              } else {
                btnStyle = 'bg-white/5 border-white/5 text-slate-400 opacity-50';
              }
            } else if (isSelected) {
              btnStyle = 'bg-amber-400 text-slate-950 font-black border-amber-300';
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-black text-xs shrink-0">
                    {opt.key}
                  </span>
                  <span className="font-bold flex items-center gap-2">
                    {opt.flag && <span className="text-xl">{opt.flag}</span>}
                    <span>{opt.text}</span>
                  </span>
                </div>

                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Button */}
        {isAnswered && (
          <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-xs space-y-2">
              <div className="flex items-center gap-2 font-black text-teal-300">
                <Sparkles className="w-4 h-4" />
                <span>Giải Thích Bản Chất:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="text-amber-300 font-semibold pt-1 border-t border-white/5">
                💡 {currentQ.funFact}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả Tổng Kết'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
