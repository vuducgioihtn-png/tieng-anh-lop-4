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
  Award,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review3BoardGameProps {
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

export const Review3BoardGame: React.FC<Review3BoardGameProps> = ({
  speechRate,
  onAddStar
}) => {
  const tiles: TileData[] = [
    {
      index: 1,
      title: 'Căn Hộ Chung Cư',
      type: 'question',
      icon: '🏢',
      question: 'Where do you live? - I live in Flat 10, Green ___.',
      questionVi: 'Bạn sống ở đâu? - Tớ sống ở căn hộ 10, toà ___ Xanh.',
      options: ['Tower', 'Village', 'Field'],
      correctAnswer: 'Tower',
      explanation: 'Flat 10 (căn hộ số 10) nằm trong toà chung cư Green Tower (Toà tháp Xanh).'
    },
    {
      index: 2,
      title: 'Bác Sĩ Chữa Bệnh',
      type: 'question',
      icon: '👨‍⚕️',
      question: 'Where does a doctor work? - He works in a ___.',
      questionVi: 'Bác sĩ làm việc ở đâu? - Bác ấy làm việc ở ___.',
      options: ['hospital', 'factory', 'farm'],
      correctAnswer: 'hospital',
      explanation: 'Bác sĩ làm việc tại bệnh viện (hospital).'
    },
    {
      index: 3,
      title: 'Tiến 2 Bước Thần Tốc 🚀',
      type: 'forward',
      stepDelta: 2,
      icon: '🚀',
      badge: 'Move ahead two spaces'
    },
    {
      index: 4,
      title: 'Mái Tóc Đáng Yêu',
      type: 'question',
      icon: '👧',
      question: 'What does she look like? - She has ___ hair.',
      questionVi: 'Cô ấy trông như thế nào? - Cô ấy có mái tóc ___.',
      options: ['long', 'tall', 'slim'],
      correctAnswer: 'long',
      explanation: 'Miêu tả mái tóc ta dùng "long hair" (tóc dài). "tall" và "slim" dùng cho dáng vóc người.'
    },
    {
      index: 5,
      title: 'Rửa Chén Giúp Mẹ',
      type: 'question',
      icon: '🍽️',
      question: 'In the evening, I wash the ___.',
      questionVi: 'Vào buổi tối, em rửa ___ giúp mẹ.',
      options: ['dishes', 'clothes', 'exercise'],
      correctAnswer: 'dishes',
      explanation: '"wash the dishes" là cụm từ chuẩn chỉ hành động rửa chén bát.'
    },
    {
      index: 6,
      title: 'Nghỉ Chân 1 Lượt 🛑',
      type: 'skip',
      icon: '⏳',
      badge: 'Miss a turn'
    },
    {
      index: 7,
      title: 'Chơi Tennis Cuối Tuần',
      type: 'question',
      icon: '🎾',
      question: 'What does he do on Sundays? - He plays ___.',
      questionVi: 'Cậu ấy làm gì vào Chủ nhật? - Cậu ấy chơi ___.',
      options: ['tennis', 'cooking', 'shopping'],
      correctAnswer: 'tennis',
      explanation: 'Hành động chơi thể thao ta dùng động từ "plays tennis".'
    },
    {
      index: 8,
      title: 'Lùi 1 Bước 🔙',
      type: 'back',
      stepDelta: -1,
      icon: '↩️',
      badge: 'Go back one space'
    },
    {
      index: 9,
      title: 'Thành Phố Nhộn Nhịp',
      type: 'question',
      icon: '🏙️',
      question: 'What is your city like? - It is big and ___.',
      questionVi: 'Thành phố của bạn như thế nào? - Nó to lớn và ___.',
      options: ['busy', 'slim', 'round'],
      correctAnswer: 'busy',
      explanation: 'Thành phố đông đúc, tấp nập ta dùng từ "busy".'
    },
    {
      index: 10,
      title: 'Tiến 1 Bước May Mắn ⏩',
      type: 'forward',
      stepDelta: 1,
      icon: '🌟',
      badge: 'Move ahead one space'
    },
    {
      index: 11,
      title: 'Cô Đầu Bếp Tài Ba',
      type: 'question',
      icon: '👩‍🍳',
      question: 'What does she do? - She is a ___.',
      questionVi: 'Cô ấy làm nghề gì? - Cô ấy là một ___.',
      options: ['cook', 'driver', 'worker'],
      correctAnswer: 'cook',
      explanation: 'Hình ảnh mũ đầu bếp trắng và tạp dề -> "cook" (đầu bếp).'
    },
    {
      index: 12,
      title: 'Hồ Bơi Mát Lạnh',
      type: 'question',
      icon: '🏊',
      question: 'Where do they go on Saturdays? - They go to the ___.',
      questionVi: 'Họ đi đâu vào thứ Bảy? - Họ đi đến ___.',
      options: ['swimming pool', 'sports center', 'cinema'],
      correctAnswer: 'swimming pool',
      explanation: 'Hồ bơi trong tiếng Anh là "swimming pool".'
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
        } else {
          handleLandOnTile(nextPos);
        }
      }, 900);
    } else if (tile.type === 'back' && tile.stepDelta) {
      sound.playWarning();
      setTimeout(() => {
        const nextPos = Math.max(0, tileIndex + tile.stepDelta!);
        setPlayerPosition(nextPos);
        if (nextPos > 0) {
          handleLandOnTile(nextPos);
        }
      }, 900);
    } else if (tile.type === 'skip') {
      sound.playWarning();
    }
  };

  const handleAnswerQuestion = (opt: string) => {
    if (!activeTileQuestion || selectedAnswer) return;
    sound.playClick();
    setSelectedAnswer(opt);

    const isCorrect = opt === activeTileQuestion.correctAnswer;
    if (isCorrect) {
      sound.playSuccess();
      onAddStar(2);
      setQuestionFeedback('Chính xác! Bé được nhận thêm 2 ⭐.');
    } else {
      sound.playWarning();
      setQuestionFeedback(`Chưa đúng rồi! Đáp án chính xác là: "${activeTileQuestion.correctAnswer}".`);
    }
  };

  const handleCloseQuestionModal = () => {
    sound.playClick();
    setActiveTileQuestion(null);
    setSelectedAnswer(null);
    setQuestionFeedback(null);
  };

  const handleResetGame = () => {
    sound.playClick();
    setPlayerPosition(0);
    setDiceNumber(1);
    setGameWon(false);
    setActiveTileQuestion(null);
    setDiceHistory([]);
  };

  const renderDiceIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Dice1 className="w-12 h-12 text-rose-500" />;
      case 2:
        return <Dice2 className="w-12 h-12 text-indigo-500" />;
      case 3:
        return <Dice3 className="w-12 h-12 text-emerald-500" />;
      case 4:
        return <Dice4 className="w-12 h-12 text-amber-500" />;
      case 5:
        return <Dice5 className="w-12 h-12 text-purple-500" />;
      case 6:
        return <Dice6 className="w-12 h-12 text-rose-600" />;
      default:
        return <Dice1 className="w-12 h-12 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Game Header Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                Trang 39 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Board Game 12 Ô Tương Tác</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              4. Board Game: Cuộc Đua Về Đích Units 11 - 15 🎲
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Lắc xúc xắc để di chuyển quân cờ của bé. Trả lời đúng các câu đố để nhận thêm sao thưởng!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetGame}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Bắt đầu lại
            </button>
          </div>
        </div>

        {/* Dice Controller Bar */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-inner flex items-center justify-center">
              {renderDiceIcon(diceNumber)}
            </div>
            <div>
              <p className="text-xs uppercase font-black text-rose-200 tracking-wider">
                Xúc xắc 3D may mắn
              </p>
              <h4 className="text-2xl font-black">
                {isRolling ? 'Đang lắc xúc xắc...' : `Bé quay được ${diceNumber} nút!`}
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                Vị trí hiện tại: Ô {playerPosition === 0 ? 'Xuất phát (0)' : playerPosition === 13 ? 'Về đích (🏆)' : playerPosition}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRollDice}
              disabled={isRolling || gameWon}
              className={`px-6 py-3.5 rounded-2xl font-black text-base shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
                isRolling || gameWon
                  ? 'bg-white/40 text-white cursor-not-allowed'
                  : 'bg-white text-rose-600 hover:bg-rose-50 hover:shadow-xl ring-2 ring-white/60'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{isRolling ? 'Đang tung...' : 'Lắc Xúc Xắc 🎲'}</span>
            </button>
          </div>
        </div>

        {/* 12-Tile Interactive Board Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {/* Start Tile */}
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all relative flex flex-col justify-between min-h-[110px] ${
              playerPosition === 0
                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400 shadow-md'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div>
              <span className="text-2xl">🏁</span>
              <h5 className="font-extrabold text-xs text-slate-800 mt-1">Xuất Phát</h5>
              <p className="text-[10px] text-slate-500">Bắt đầu hành trình</p>
            </div>
            {playerPosition === 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] text-center animate-bounce">
                Bé ở đây 👦
              </span>
            )}
          </div>

          {/* Tiles 1 to 12 */}
          {tiles.map(tile => {
            const isPlayerHere = playerPosition === tile.index;
            let tileBorder = 'border-slate-200 bg-white hover:border-slate-300';

            if (isPlayerHere) {
              tileBorder = 'border-rose-500 bg-rose-50 ring-2 ring-rose-400 shadow-lg -translate-y-1';
            } else if (tile.type === 'forward') {
              tileBorder = 'border-amber-200 bg-amber-50/50';
            } else if (tile.type === 'back') {
              tileBorder = 'border-orange-200 bg-orange-50/50';
            } else if (tile.type === 'skip') {
              tileBorder = 'border-rose-200 bg-rose-50/40';
            }

            return (
              <div
                key={tile.index}
                className={`p-3.5 rounded-2xl border-2 transition-all relative flex flex-col justify-between min-h-[110px] ${tileBorder}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{tile.icon}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black flex items-center justify-center">
                    {tile.index}
                  </span>
                </div>

                <div className="my-1">
                  <h5 className="font-extrabold text-xs text-slate-800 leading-tight">
                    {tile.title}
                  </h5>
                  {tile.badge && (
                    <span className="text-[10px] font-bold text-rose-600 block mt-0.5">
                      {tile.badge}
                    </span>
                  )}
                </div>

                {isPlayerHere && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] text-center animate-bounce shadow-xs">
                    Bé ở đây 👦
                  </span>
                )}
              </div>
            );
          })}

          {/* Finish Tile */}
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all relative flex flex-col justify-between min-h-[110px] ${
              playerPosition === 13
                ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-400 shadow-lg'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div>
              <span className="text-2xl">🏆</span>
              <h5 className="font-extrabold text-xs text-slate-800 mt-1">Về Đích!</h5>
              <p className="text-[10px] text-slate-500">Nhận 10 ⭐</p>
            </div>
            {playerPosition === 13 && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-500 text-slate-900 font-black text-[10px] text-center animate-bounce">
                Quán Quân 🥇
              </span>
            )}
          </div>
        </div>

        {/* Win Banner */}
        {gameWon && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 bg-white/20 rounded-2xl">🥇</span>
              <div>
                <h4 className="text-xl font-black">CHÚC MỪNG QUÁN QUÂN BÀN CỜ!</h4>
                <p className="text-xs text-white/90">
                  Bé đã hoàn thành xuất sắc 12 thử thách của Review 3 và nhận trọn vẹn 10 ⭐ cúp vàng!
                </p>
              </div>
            </div>
            <button
              onClick={handleResetGame}
              className="px-5 py-2.5 rounded-xl bg-white text-amber-700 font-black text-xs shadow-md hover:bg-amber-50 transition active:scale-95"
            >
              Chơi Lại Vòng Mới 🔄
            </button>
          </div>
        )}
      </div>

      {/* Question Modal Popup */}
      {activeTileQuestion && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{activeTileQuestion.icon}</span>
                <div>
                  <span className="text-xs font-black uppercase text-rose-600">
                    Thử Thách Ô Số {activeTileQuestion.index}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-800">
                    {activeTileQuestion.title}
                  </h4>
                </div>
              </div>
              <button
                onClick={handleCloseQuestionModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-sm flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-black text-base text-slate-800">
                  {activeTileQuestion.question}
                </p>
                <button
                  onClick={() => speakWord(activeTileQuestion.question || '', speechRate)}
                  className="p-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 italic">
                💡 {activeTileQuestion.questionVi}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {activeTileQuestion.options?.map(opt => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === activeTileQuestion.correctAnswer;

                let optStyle = 'border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/20';
                if (selectedAnswer) {
                  if (isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswerQuestion(opt)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-sm transition flex items-center justify-between ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback and Continue */}
            {questionFeedback && (
              <div className="p-3 rounded-2xl bg-slate-100 text-xs text-slate-700 space-y-1">
                <p className="font-bold">{questionFeedback}</p>
                <p className="text-slate-500">{activeTileQuestion.explanation}</p>
              </div>
            )}

            {selectedAnswer && (
              <button
                onClick={handleCloseQuestionModal}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-md transition"
              >
                Tiếp tục cuộc đua 🎲
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
