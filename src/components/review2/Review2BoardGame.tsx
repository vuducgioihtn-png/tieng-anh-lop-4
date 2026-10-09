import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  Trophy,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  FastForward,
  Pause,
  Award
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review2BoardGameProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface TileData {
  index: number;
  title: string;
  type: 'question' | 'forward' | 'back' | 'skip';
  icon: string;
  badge?: string;
  stepDelta?: number;
  question?: string;
  questionVi?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

export const Review2BoardGame: React.FC<Review2BoardGameProps> = ({
  speechRate,
  onAddStar
}) => {
  const tiles: TileData[] = [
    {
      index: 1,
      title: 'Trường Thành Phố',
      type: 'question',
      icon: '🏫',
      question: 'Where’s your school?',
      questionVi: 'Trường của bạn ở đâu vậy?',
      options: ['It’s in the city.', 'It’s on the mountain.', 'It’s in the zoo.'],
      correctAnswer: 'It’s in the city.',
      explanation: 'Trong tranh bạn nhỏ đứng trước ngôi trường lớn ở thành phố (It’s in the city).'
    },
    {
      index: 2,
      title: 'Đếm Số Toà Nhà',
      type: 'question',
      icon: '🏡',
      question: 'How many buildings are there in your school?',
      questionVi: 'Có bao nhiêu toà nhà trong trường?',
      options: ['There are two buildings.', 'There are five buildings.', 'There is one classroom.'],
      correctAnswer: 'There are two buildings.',
      explanation: 'Tranh ô số 2 có 2 toà nhà sơn màu xanh và tím (There are two buildings).'
    },
    {
      index: 3,
      title: 'Lùi 1 Bước 🔙',
      type: 'back',
      stepDelta: -1,
      icon: '↩️',
      badge: 'Go back one space'
    },
    {
      index: 4,
      title: 'Môn Học Hôm Nay',
      type: 'question',
      icon: '📚',
      question: 'What subjects do you have today?',
      questionVi: 'Hôm nay bạn học những môn gì?',
      options: [
        'I have Vietnamese and science.',
        'I have art and music.',
        'I have maths and English.'
      ],
      correctAnswer: 'I have Vietnamese and science.',
      explanation: 'Hình hai cuốn sách giáo khoa: Tiếng Việt 4 và Khoa học 4 (Vietnamese and science).'
    },
    {
      index: 5,
      title: 'Tiến 1 Bước ⏩',
      type: 'forward',
      stepDelta: 1,
      icon: '⏩',
      badge: 'Move ahead one space'
    },
    {
      index: 6,
      title: 'Thời Khóa Biểu',
      type: 'question',
      icon: '🗓️',
      question: 'When do you have music?',
      questionVi: 'Khi nào bạn có tiết Âm nhạc?',
      options: [
        'I have it on Wednesdays.',
        'I have it on Mondays.',
        'I have it on Fridays.'
      ],
      correctAnswer: 'I have it on Wednesdays.',
      explanation: 'Thời khóa biểu cho thấy cột Wednesday ghi chữ Music (I have it on Wednesdays).'
    },
    {
      index: 7,
      title: 'Mất Lượt 🛑',
      type: 'skip',
      icon: '⏳',
      badge: 'Miss a turn'
    },
    {
      index: 8,
      title: 'Lâu Đài Cát',
      type: 'question',
      icon: '🏖️',
      question: 'Where were you last summer?',
      questionVi: 'Mùa hè năm ngoái bạn đã ở đâu?',
      options: ['I was at the beach.', 'I was at the zoo.', 'I was in Tokyo.'],
      correctAnswer: 'I was at the beach.',
      explanation: 'Hình bạn nhỏ đang xây lâu đài cát bên bờ biển xanh (I was at the beach).'
    },
    {
      index: 9,
      title: 'Phóng Thẳng 3 Ô 🚀',
      type: 'forward',
      stepDelta: 3,
      icon: '🚀',
      badge: 'Move ahead three spaces'
    },
    {
      index: 10,
      title: 'Thủ Đô London',
      type: 'question',
      icon: '🇬🇧',
      question: 'Where were you last summer?',
      questionVi: 'Mùa hè năm ngoái bạn đã ở đâu?',
      options: ['I was in London.', 'I was in Sydney.', 'I was in Bangkok.'],
      correctAnswer: 'I was in London.',
      explanation: 'Hình ảnh tháp đồng hồ Big Ben nổi tiếng của thủ đô London nước Anh (I was in London).'
    },
    {
      index: 11,
      title: 'Lùi 1 Bước 🔙',
      type: 'back',
      stepDelta: -1,
      icon: '↩️',
      badge: 'Go back one space'
    },
    {
      index: 12,
      title: 'Hội Thao Tháng 10',
      type: 'question',
      icon: '🏆',
      question: 'When is your sports day?',
      questionVi: 'Khi nào là ngày hội thể thao của trường bạn?',
      options: ['It’s in October.', 'It’s in May.', 'It’s in December.'],
      correctAnswer: 'It’s in October.',
      explanation: 'Băng rôn School Sports Day kèm tờ lịch ghi tháng OCTOBER (It’s in October).'
    }
  ];

  // Game state
  const [playerPosition, setPlayerPosition] = useState<number>(0); // 0 = Start, 13 = Finish
  const [diceNumber, setDiceNumber] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [activeTileQuestion, setActiveTileQuestion] = useState<TileData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionFeedback, setQuestionFeedback] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [diceHistory, setDiceHistory] = useState<number[]>([]);

  // Roll dice
  const handleRollDice = () => {
    if (isRolling || gameWon) return;
    setIsRolling(true);
    sound.playClick();

    let rollCount = 0;
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(rand);
      rollCount++;
      if (rollCount > 8) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalDice);
        setDiceHistory(prev => [finalDice, ...prev.slice(0, 4)]);
        setIsRolling(false);
        sound.playPop();

        // Calculate new position
        const targetPos = playerPosition + finalDice;
        if (targetPos >= 13) {
          // Reached finish!
          setPlayerPosition(13);
          setGameWon(true);
          sound.playFanfare();
          onAddStar(10);
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        } else {
          setPlayerPosition(targetPos);
          handleLandOnTile(targetPos);
        }
      }
    }, 70);
  };

  const handleLandOnTile = (tileIndex: number) => {
    const tile = tiles.find(t => t.index === tileIndex);
    if (!tile) return;

    if (tile.type === 'question') {
      setActiveTileQuestion(tile);
      setSelectedAnswer(null);
      setQuestionFeedback(null);
      if (tile.question) {
        speakWord(tile.question, speechRate);
      }
    } else if (tile.type === 'forward' && tile.stepDelta) {
      sound.playCorrect();
      setTimeout(() => {
        const nextPos = Math.min(13, tileIndex + tile.stepDelta!);
        setPlayerPosition(nextPos);
        if (nextPos >= 13) {
          setGameWon(true);
          sound.playFanfare();
          onAddStar(10);
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        }
      }, 900);
    } else if (tile.type === 'back' && tile.stepDelta) {
      sound.playWrong();
      setTimeout(() => {
        const nextPos = Math.max(0, tileIndex + tile.stepDelta!);
        setPlayerPosition(nextPos);
      }, 900);
    } else if (tile.type === 'skip') {
      sound.playWrong();
    }
  };

  const handleAnswerQuestion = (ans: string) => {
    if (!activeTileQuestion) return;
    setSelectedAnswer(ans);
    if (ans === activeTileQuestion.correctAnswer) {
      sound.playCorrect();
      onAddStar(2);
      setQuestionFeedback('Chính xác! Bạn được cộng 2 sao ⭐️');
    } else {
      sound.playWrong();
      setQuestionFeedback(`Chưa đúng rồi. Đáp án đúng là: ${activeTileQuestion.correctAnswer}`);
    }
  };

  const handleResetGame = () => {
    sound.playClick();
    setPlayerPosition(0);
    setGameWon(false);
    setActiveTileQuestion(null);
    setSelectedAnswer(null);
    setQuestionFeedback(null);
    setDiceHistory([]);
  };

  return (
    <div className="space-y-8">
      {/* Header & Control Center */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner text-2xl">
              🎲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                  Hoạt Động 3 · Trang 77
                </span>
                <span className="text-xs font-semibold text-slate-500">Board Game Studio</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Board game: Roll a dice. Listen and answer 🏆
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetGame}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Bắt đầu lại
            </button>
          </div>
        </div>

        {/* Dice Rolling Station */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* 3D Dice Box */}
            <div
              className={`w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-slate-900 font-black text-4xl border-4 border-amber-200 select-none transform transition-transform ${
                isRolling ? 'rotate-180 scale-110' : 'hover:scale-105'
              }`}
            >
              {diceNumber === 1 && '⚀'}
              {diceNumber === 2 && '⚁'}
              {diceNumber === 3 && '⚂'}
              {diceNumber === 4 && '⚃'}
              {diceNumber === 5 && '⚄'}
              {diceNumber === 6 && '⚅'}
            </div>

            <div>
              <span className="text-xs font-bold text-amber-100 uppercase tracking-widest block">
                Điểm xúc xắc vừa lắc
              </span>
              <div className="text-2xl font-black flex items-center gap-2">
                <span>{diceNumber} bước</span>
                <span className="text-sm font-normal text-amber-100">
                  (Vị trí hiện tại: Ô {playerPosition === 0 ? 'Xuất Phát' : playerPosition === 13 ? 'Về Đích!' : playerPosition})
                </span>
              </div>
              {diceHistory.length > 0 && (
                <div className="text-xs text-amber-200 mt-1 flex items-center gap-1.5">
                  <span>Lịch sử lắc:</span>
                  {diceHistory.map((h, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-white/20 font-bold">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRollDice}
              disabled={isRolling || gameWon}
              className={`px-6 py-3.5 rounded-2xl font-black text-base shadow-xl flex items-center gap-2 transition active:scale-95 ${
                gameWon
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-white text-orange-600 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              {isRolling ? 'Đang lắc xúc xắc...' : gameWon ? 'Đã về đích!' : 'Lắc Xúc Xắc 🎲'}
            </button>
          </div>
        </div>

        {/* Victory Banner */}
        {gameWon && (
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-400 text-center space-y-2 mb-6 animate-bounce">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
            <h4 className="text-2xl font-black text-emerald-950">
              CHÚC MỪNG EM ĐÃ VỀ ĐÍCH THÀNH CÔNG! 🏆
            </h4>
            <p className="text-emerald-800 text-sm font-medium">
              Em đã hoàn thành xuất sắc toàn bộ chặng đường ôn tập Học kỳ 1 (Units 6 - 10)! Thưởng +10 sao vàng ⭐️
            </p>
          </div>
        )}

        {/* Board Tiles Map Grid (12 Tiles + Start + Finish) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 my-4">
          {/* Tile 0: Start */}
          <div
            className={`p-3 rounded-2xl border-2 text-center transition-all relative ${
              playerPosition === 0
                ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400 font-black'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            {playerPosition === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow animate-pulse">
                Bạn ở đây 🔴
              </span>
            )}
            <div className="text-2xl">🏁</div>
            <div className="text-xs font-black mt-1">Start</div>
            <div className="text-[10px] text-slate-500">Bắt đầu</div>
          </div>

          {/* 12 Tiles */}
          {tiles.map(tile => {
            const isCurrent = playerPosition === tile.index;
            let tileBg = 'bg-white border-slate-200';
            if (tile.type === 'forward') tileBg = 'bg-emerald-50/60 border-emerald-200';
            if (tile.type === 'back') tileBg = 'bg-rose-50/60 border-rose-200';
            if (tile.type === 'skip') tileBg = 'bg-slate-100 border-slate-300';

            return (
              <div
                key={tile.index}
                onClick={() => handleLandOnTile(tile.index)}
                className={`p-3 rounded-2xl border-2 text-center cursor-pointer transition-all relative flex flex-col justify-between ${tileBg} ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-100 shadow-lg ring-2 ring-amber-400 scale-105 z-10'
                    : 'hover:border-amber-300'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow animate-pulse">
                    Bạn ở đây 🔴
                  </span>
                )}
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-black">
                    {tile.index}
                  </span>
                  <span>{tile.icon}</span>
                </div>
                <div className="text-xs font-extrabold text-slate-800 my-1 truncate">
                  {tile.title}
                </div>
                {tile.badge && (
                  <div className="text-[10px] font-bold text-amber-700 truncate">{tile.badge}</div>
                )}
              </div>
            );
          })}

          {/* Tile 13: Finish */}
          <div
            className={`p-3 rounded-2xl border-2 text-center transition-all relative ${
              playerPosition >= 13
                ? 'border-emerald-500 bg-emerald-100 shadow-md ring-2 ring-emerald-400 font-black'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            {playerPosition >= 13 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                Chiến Thắng 🏆
              </span>
            )}
            <div className="text-2xl">🥇</div>
            <div className="text-xs font-black mt-1">Finish</div>
            <div className="text-[10px] text-emerald-700 font-bold">Về Đích</div>
          </div>
        </div>

        {/* Modal / Question Box for Landed Tile */}
        {activeTileQuestion && (
          <div className="my-6 p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-md animate-fadeIn">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow">
                  Ô {activeTileQuestion.index}
                </span>
                <div>
                  <h4 className="font-black text-slate-900 text-base md:text-lg">
                    {activeTileQuestion.question}
                  </h4>
                  <p className="text-xs text-slate-600 italic">
                    {activeTileQuestion.questionVi}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  activeTileQuestion.question &&
                  speakWord(activeTileQuestion.question, speechRate)
                }
                className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1 transition"
              >
                <Volume2 className="w-4 h-4" /> Nghe câu hỏi
              </button>
            </div>

            {/* Multiple choice options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
              {activeTileQuestion.options?.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === activeTileQuestion.correctAnswer;

                let btnStyle = 'border-slate-300 bg-white text-slate-800 hover:border-amber-400';
                if (isSelected) {
                  btnStyle = isCorrect
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black'
                    : 'border-rose-500 bg-rose-100 text-rose-950';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerQuestion(opt)}
                    className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition ${btnStyle}`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {questionFeedback && (
              <div className="mt-4 p-3 rounded-xl bg-white border border-amber-200 flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-800">{questionFeedback}</span>
                <button
                  onClick={() => setActiveTileQuestion(null)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition"
                >
                  Tiếp tục đi ➡️
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
