import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Dices, Check, RotateCcw, Volume2, Trophy, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { SentenceOrderGame, InteractiveQuizItem, BoardGameTile } from '../data/curriculum';
import { speakWord, sound } from '../utils/audio';

interface GamesSectionProps {
  sentenceGames: SentenceOrderGame[];
  quizzes: InteractiveQuizItem[];
  boardGameTiles: BoardGameTile[];
  speechRate: number;
  onAddStar: (count: number) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  sentenceGames,
  quizzes,
  boardGameTiles,
  speechRate,
  onAddStar
}) => {
  const [activeTab, setActiveTab] = useState<'boardgame' | 'sentence' | 'quiz'>('boardgame');

  // ---------- BOARD GAME STATE ----------
  const [playerPosition, setPlayerPosition] = useState<number>(1);
  const [diceNumber, setDiceNumber] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [gameMessage, setGameMessage] = useState<string>('Bấm "Tung xúc xắc" để bắt đầu chuyến phiêu lưu!');
  const [pendingQuestion, setPendingQuestion] = useState<BoardGameTile | null>(null);
  const [boardGameCompleted, setBoardGameCompleted] = useState<boolean>(false);

  const handleRollDice = () => {
    if (isRolling || pendingQuestion || boardGameCompleted) return;

    sound.playDice();
    setIsRolling(true);
    setGameMessage('Đang tung xúc xắc...');

    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalDice);
        setIsRolling(false);
        advancePlayer(finalDice);
      }
    }, 60);
  };

  const advancePlayer = (steps: number) => {
    let nextPos = playerPosition + steps;
    const maxPos = boardGameTiles.length;

    if (nextPos >= maxPos) {
      nextPos = maxPos;
      setPlayerPosition(maxPos);
      setBoardGameCompleted(true);
      setGameMessage('🎉 CHÚC MỪNG BÉ ĐÃ VỀ ĐÍCH THÀNH CÔNG! BÉ LÀ NHÀ VÔ ĐỊCH!');
      sound.playVictory();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onAddStar(15);
      return;
    }

    const targetTile = boardGameTiles.find(t => t.index === nextPos);
    setPlayerPosition(nextPos);

    if (targetTile) {
      if (targetTile.type === 'question' && targetTile.question) {
        setPendingQuestion(targetTile);
        setGameMessage(`Ô ${nextPos}: Trả lời câu hỏi tiếng Anh để nhận sao!`);
        sound.playStar();
      } else if (targetTile.type === 'forward' && targetTile.stepDelta) {
        sound.playCorrect();
        const jumpPos = Math.min(maxPos, nextPos + targetTile.stepDelta);
        setPlayerPosition(jumpPos);
        setGameMessage(`⭐ Ô may mắn: Tiến thêm ${targetTile.stepDelta} ô đến ô số ${jumpPos}!`);
        onAddStar(3);
      } else if (targetTile.type === 'back' && targetTile.stepDelta) {
        sound.playWrong();
        const backPos = Math.max(1, nextPos + targetTile.stepDelta);
        setPlayerPosition(backPos);
        setGameMessage(`↩️ Ô thử thách: Lùi ${Math.abs(targetTile.stepDelta)} ô về ô số ${backPos}!`);
      } else if (targetTile.type === 'skip') {
        sound.playWrong();
        setGameMessage(`🛑 Ô tạm nghỉ: Bé dừng chân uống nước nghỉ một nhịp nhé!`);
      } else {
        sound.playClick();
        setGameMessage(`Bé đã di chuyển đến ô ${nextPos}! Tiếp tục cố gắng nhé!`);
      }
    }
  };

  const handleAnswerBoardQuestion = (selectedOption: string) => {
    if (!pendingQuestion) return;

    if (selectedOption === pendingQuestion.correctAnswer) {
      sound.playCorrect();
      setGameMessage(`🎉 Chính xác tuyệt vời! Bé nhận thêm 5 sao!`);
      onAddStar(5);
      setPendingQuestion(null);
    } else {
      sound.playWrong();
      setGameMessage(`Chưa đúng rồi! Thử lại đáp án khác nhé bé yêu.`);
    }
  };

  const resetBoardGame = () => {
    sound.playClick();
    setPlayerPosition(1);
    setDiceNumber(1);
    setPendingQuestion(null);
    setBoardGameCompleted(false);
    setGameMessage('Bấm "Tung xúc xắc" để bắt đầu chuyến phiêu lưu!');
  };

  // ---------- SENTENCE BUILDER STATE ----------
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const currentSentenceGame = sentenceGames[currentSentenceIndex] || sentenceGames[0];
  const [selectedWordOrder, setSelectedWordOrder] = useState<string[]>([]);
  const [sentenceSuccess, setSentenceSuccess] = useState<boolean>(false);

  const handlePickWord = (word: string) => {
    sound.playClick();
    setSelectedWordOrder(prev => [...prev, word]);
  };

  const handleRemoveWord = (index: number) => {
    sound.playClick();
    setSelectedWordOrder(prev => prev.filter((_, i) => i !== index));
    setSentenceSuccess(false);
  };

  const handleCheckSentence = () => {
    if (!currentSentenceGame) return;
    const assembled = selectedWordOrder.join(' ').replace(/\s+([.,?!])/g, '$1');
    const target = currentSentenceGame.correctSentence;

    if (assembled.toLowerCase() === target.toLowerCase() || assembled.trim() === target.trim()) {
      sound.playCorrect();
      setSentenceSuccess(true);
      speakWord(target, speechRate);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  const resetSentence = () => {
    sound.playClick();
    setSelectedWordOrder([]);
    setSentenceSuccess(false);
  };

  // ---------- QUIZ STATE ----------
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelectQuiz = (qId: string, optIdx: number, correctIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    if (optIdx === correctIdx) {
      sound.playCorrect();
      onAddStar(3);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('boardgame');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'boardgame'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Dices className="w-4 h-4 text-amber-500" />
          <span>Bàn Cờ Xúc Xắc SGK (Trang 73 & 77)</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('sentence');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'sentence'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowRight className="w-4 h-4 text-emerald-500" />
          <span>Ghép Câu Thần Tốc</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('quiz');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-sky-500" />
          <span>Trắc Nghiệm SGK Nhanh</span>
        </button>
      </div>

      {/* ================= TAB 1: BOARD GAME ================= */}
      {activeTab === 'boardgame' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-900">Bàn Cờ Thử Thách Xúc Xắc</span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                  Board game tương tác
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tung xúc xắc để di chuyển bạn nhỏ trên 12 ô bản đồ. Vượt qua câu hỏi tiếng Anh và chướng ngại vật để về đích nhận cúp vàng!
              </p>
            </div>

            <button
              onClick={resetBoardGame}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi lại từ đầu</span>
            </button>
          </div>

          {/* Dice & Status Panel */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4 text-center md:text-left">
              {/* Animated 3D Dice Display */}
              <div
                className={`w-16 h-16 rounded-2xl bg-white text-slate-900 shadow-xl flex items-center justify-center text-3xl font-black border-4 border-amber-200 select-none ${
                  isRolling ? 'animate-spin' : ''
                }`}
              >
                {diceNumber}
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-amber-100">
                  Vị trí hiện tại: Ô số {playerPosition} / {boardGameTiles.length}
                </div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {gameMessage}
                </div>
              </div>
            </div>

            <button
              onClick={handleRollDice}
              disabled={isRolling || pendingQuestion !== null || boardGameCompleted}
              className="whitespace-nowrap px-6 py-3.5 bg-white text-amber-800 hover:bg-amber-50 text-sm font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <Dices className={`w-5 h-5 text-amber-600 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Đang tung...' : 'Tung Xúc Xắc! 🎲'}</span>
            </button>
          </div>

          {/* Question Overlay Modal if landed on question */}
          {pendingQuestion && (
            <div className="p-5 rounded-2xl bg-sky-50 border-2 border-sky-300 animate-in fade-in">
              <div className="flex items-center gap-2 text-sky-900 font-bold text-sm mb-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                <span>Thử Thách Tại Ô Số {pendingQuestion.index}:</span>
              </div>
              <p className="text-base font-bold text-slate-800 mb-3">
                {pendingQuestion.question}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {pendingQuestion.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerBoardQuestion(opt)}
                    className="px-5 py-2.5 bg-white hover:bg-sky-600 hover:text-white text-slate-800 font-bold text-sm rounded-xl border border-sky-200 shadow-sm transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 12-Tile Grid Board Game (Styled after Textbook pages 73 & 77) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {boardGameTiles.map((tile) => {
              const isCurrent = playerPosition === tile.index;
              return (
                <div
                  key={tile.index}
                  className={`relative min-h-[110px] rounded-2xl p-3 border-2 transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-100 shadow-md ring-4 ring-amber-300/40'
                      : tile.type === 'finish'
                      ? 'border-emerald-400 bg-emerald-50'
                      : tile.type === 'skip' || tile.type === 'back'
                      ? 'border-rose-200 bg-rose-50/50'
                      : tile.type === 'forward'
                      ? 'border-indigo-200 bg-indigo-50/50'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  {/* Tile Number badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-400">
                      #{tile.index}
                    </span>
                    <span className="text-xl">{tile.icon}</span>
                  </div>

                  <div className="my-1">
                    <p className="text-xs font-bold text-slate-800 line-clamp-2">
                      {tile.label}
                    </p>
                  </div>

                  {/* Player Token Indicator */}
                  {isCurrent && (
                    <div className="mt-1 bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center justify-center gap-1 animate-bounce">
                      <span>Bạn ở đây 🏃</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: SENTENCE BUILDER ================= */}
      {activeTab === 'sentence' && currentSentenceGame && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Ghép Từ Thành Câu Chuẩn SGK</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm vào các từ tiếng Anh bị xáo trộn để sắp xếp lại thành câu hoàn chỉnh và chính xác.
              </p>
            </div>

            {/* Sentence navigator */}
            <div className="flex items-center gap-1.5">
              {sentenceGames.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setCurrentSentenceIndex(idx);
                    setSelectedWordOrder([]);
                    setSentenceSuccess(false);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                    currentSentenceIndex === idx
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Meaning Prompt & Hint */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Nghĩa tiếng Việt cần ghép:
              </span>
              <span className="text-base font-bold text-slate-900">
                "{currentSentenceGame.vietnameseMeaning}"
              </span>
            </div>

            <div className="text-xs text-emerald-700 font-medium bg-white/80 px-3 py-1.5 rounded-xl border border-emerald-200">
              💡 Gợi ý: {currentSentenceGame.hint}
            </div>
          </div>

          {/* Assembled Sentence Box */}
          <div className="min-h-[70px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-wrap items-center gap-2">
            {selectedWordOrder.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Bấm vào các thẻ từ phía dưới để đưa vào câu...
              </span>
            ) : (
              selectedWordOrder.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(idx)}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 shadow-sm hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-colors"
                  title="Bấm để gỡ từ này"
                >
                  {w} ✕
                </button>
              ))
            )}
          </div>

          {/* Available Words Pool */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Kho từ xáo trộn:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {currentSentenceGame.scrambledWords.map((word, idx) => {
                // If this word has already been used as many times as it appears
                const usedCount = selectedWordOrder.filter(w => w === word).length;
                const totalInScramble = currentSentenceGame.scrambledWords.filter(w => w === word).length;
                const isExhausted = usedCount >= totalInScramble;

                return (
                  <button
                    key={idx}
                    disabled={isExhausted}
                    onClick={() => handlePickWord(word)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isExhausted
                        ? 'opacity-30 bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-900 border border-indigo-200 shadow-sm active:scale-95'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Success Banner or Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={resetSentence}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại câu này</span>
            </button>

            {sentenceSuccess ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Chuẩn xác tuyệt đối! +5 ⭐
                </span>
                <button
                  onClick={() => speakWord(currentSentenceGame.correctSentence, speechRate)}
                  className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl"
                  title="Nghe lại câu hoàn chỉnh"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleCheckSentence}
                disabled={selectedWordOrder.length === 0}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm tra kết quả</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: TEXTBOOK QUIZ ================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Bài Tập Trắc Nghiệm Trực Quan</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tuyển tập các dạng câu hỏi chọn tranh, chọn từ và chia động từ chuẩn đề cương ôn thi học kỳ lớp 4.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {quizzes.map((quiz, qIdx) => {
              const selectedIdx = quizAnswers[quiz.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === quiz.correctIndex;

              return (
                <div key={quiz.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {qIdx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {quiz.question}
                      </h4>
                    </div>

                    <button
                      onClick={() => speakWord(quiz.question, speechRate)}
                      className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 shrink-0"
                      title="Nghe câu hỏi"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {quiz.questionVi && (
                    <p className="text-xs text-slate-500 italic pl-8">
                      {quiz.questionVi}
                    </p>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-8">
                    {quiz.options.map((option, optIdx) => {
                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-300';
                      if (isAnswered) {
                        if (optIdx === quiz.correctIndex) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                        } else if (selectedIdx === optIdx) {
                          btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold';
                        } else {
                          btnStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuiz(quiz.id, optIdx, quiz.correctIndex)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{String.fromCharCode(65 + optIdx)}. {option}</span>
                          {isAnswered && optIdx === quiz.correctIndex && <Check className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Card */}
                  {showExplanation[quiz.id] && (
                    <div className={`p-3 rounded-xl text-xs pl-8 ${isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                      <div className="font-bold flex items-center gap-1 mb-0.5">
                        {isCorrect ? '🎉 Tuyệt vời! Bạn làm đúng rồi!' : '💡 Hướng dẫn chi tiết:'}
                      </div>
                      <p>{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
