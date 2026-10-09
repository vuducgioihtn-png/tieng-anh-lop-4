import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle, Star } from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit1MiniGameProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface Question {
  id: number;
  type: 'listen_flag' | 'landmark' | 'fill' | 'friend';
  question: string;
  audioPrompt?: string;
  flag?: string;
  landmark?: string;
  options: { label: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export const Unit1MiniGame: React.FC<Unit1MiniGameProps> = ({ speechRate, onAddStar }) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: 1,
      type: 'listen_flag',
      question: 'Bấm nghe âm thanh và đoán xem bạn nhỏ đến từ quốc gia nào?',
      audioPrompt: "I'm from Britain.",
      options: [
        { label: 'A', text: '🇬🇧 Britain (Nước Anh)', isCorrect: true },
        { label: 'B', text: '🇺🇸 America (Nước Mỹ)', isCorrect: false },
        { label: 'C', text: '🇦🇺 Australia (Nước Úc)', isCorrect: false },
        { label: 'D', text: '🇻🇳 Viet Nam (Việt Nam)', isCorrect: false }
      ],
      explanation: 'Âm thanh đọc rõ: "I\'m from Britain" (/ˈbrɪtn/) ➔ Nước Anh cờ 🇬🇧.'
    },
    {
      id: 2,
      type: 'landmark',
      question: 'Tượng Nữ Thần Tự Do 🗽 và bạn Mary thân thiện đến từ đâu?',
      landmark: '🗽',
      options: [
        { label: 'A', text: '🇦🇺 Australia', isCorrect: false },
        { label: 'B', text: '🇺🇸 America', isCorrect: true },
        { label: 'C', text: '🇬🇧 Britain', isCorrect: false },
        { label: 'D', text: '🇻🇳 Viet Nam', isCorrect: false }
      ],
      explanation: 'Tượng Nữ Thần Tự Do ở New York, bạn Mary đến từ nước Mỹ (America 🇺🇸).'
    },
    {
      id: 3,
      type: 'fill',
      question: 'Để hỏi quê hương của bạn, ta dùng mẫu câu: "Where are you _____?"',
      options: [
        { label: 'A', text: 'from', isCorrect: true },
        { label: 'B', text: 'name', isCorrect: false },
        { label: 'C', text: 'this', isCorrect: false },
        { label: 'D', text: 'fine', isCorrect: false }
      ],
      explanation: 'Mẫu câu chuẩn sách giáo khoa: "Where are you from?" (Bạn đến từ đâu?)'
    },
    {
      id: 4,
      type: 'friend',
      question: 'Cậu bạn tóc xoăn Ben và chú chuột túi Kangaroo 🦘 đến từ quốc gia nào?',
      landmark: '🦘',
      options: [
        { label: 'A', text: '🇻🇳 Viet Nam', isCorrect: false },
        { label: 'B', text: '🇬🇧 Britain', isCorrect: false },
        { label: 'C', text: '🇦🇺 Australia', isCorrect: true },
        { label: 'D', text: '🇺🇸 America', isCorrect: false }
      ],
      explanation: 'Ben đến từ nước Úc (Australia 🇦🇺) — xứ sở của loài Kangaroo!'
    },
    {
      id: 5,
      type: 'listen_flag',
      question: 'Nghe câu đối thoại và chọn câu trả lời đúng của bạn Minh:',
      audioPrompt: "Hello, I'm Minh. I'm from Viet Nam.",
      options: [
        { label: 'A', text: "I'm from America.", isCorrect: false },
        { label: 'B', text: "I'm from Viet Nam.", isCorrect: true },
        { label: 'C', text: "I'm from Britain.", isCorrect: false },
        { label: 'D', text: "I'm from Australia.", isCorrect: false }
      ],
      explanation: 'Minh là học sinh Việt Nam 🇻🇳, câu chuẩn là: "I\'m from Viet Nam."'
    }
  ];

  const currentQ = questions[currentQIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    if (isCorrect) {
      sound.playCorrect();
      setScore(prev => prev + 1);
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      sound.playVictory();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onAddStar(5);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsGameOver(false);
  };

  const handlePlayAudio = () => {
    if (currentQ.audioPrompt) {
      sound.playClick();
      speakWord(currentQ.audioPrompt, speechRate);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-md space-y-6">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Mini-Game Ôn Tập Tương Tác</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            🎮 Siêu Thám Tử Hộ Chiếu (Passport Detective)
          </h3>
          <p className="text-xs text-slate-500">
            Trả lời đúng 5 câu hỏi để nhận Huân Chương Du Ngoạn Thế Giới và 15 sao thưởng!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-black text-amber-900">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Điểm: {score}/{questions.length}</span>
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            Câu {currentQIndex + 1}/{questions.length}
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-5 bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase">
                  Câu hỏi số {currentQIndex + 1}:
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {currentQ.landmark && (
                <span className="text-4xl filter drop-shadow-sm shrink-0">
                  {currentQ.landmark}
                </span>
              )}
            </div>

            {currentQ.audioPrompt && (
              <button
                onClick={handlePlayAudio}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bấm để nghe âm thanh gợi ý</span>
              </button>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300 font-black';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-700 shrink-0">
                      {opt.label}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next button */}
          {isAnswered && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="text-xs text-slate-700 space-y-0.5">
                <span className="font-bold text-indigo-700">💡 Giải thích chi tiết: </span>
                <span>{currentQ.explanation}</span>
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shrink-0 transition-transform active:scale-95"
              >
                {currentQIndex < questions.length - 1 ? 'Câu tiếp theo ➔' : 'Xem tổng kết 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Over Screen */
        <div className="text-center py-8 px-4 space-y-4 max-w-md mx-auto animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 text-4xl flex items-center justify-center mx-auto shadow-inner">
            🏆
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-900">
              Xuất Sắc! Bạn Đạt {score}/{questions.length} Điểm
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {score >= 4
                ? 'Tuyệt vời! Bé đã nắm vững 100% tên 4 quốc gia và mẫu câu hỏi quê hương trong Bài 1!'
                : 'Làm tốt lắm! Hãy cùng chơi lại một lần nữa để đạt điểm số tuyệt đối 5/5 nhé!'}
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại một lần nữa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
