import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RotateCcw,
  CheckCircle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Mic,
  MicOff,
  CreditCard,
  Grid,
  PenTool,
  Check,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Shuffle,
  Play,
  Pause,
  Award,
  Star,
  Flame,
  VolumeX,
  Type
} from 'lucide-react';
import { VocabItem } from '../data/curriculum';
import { speakWord, sound } from '../utils/audio';

interface VocabSectionProps {
  vocabList: VocabItem[];
  speechRate: number;
  onAddStar: (count: number) => void;
  unitTitle?: string;
}

export const VocabSection: React.FC<VocabSectionProps> = ({
  vocabList,
  speechRate,
  onAddStar,
  unitTitle
}) => {
  // Navigation submode: 'grid' (Lưới chi tiết), 'flashcard' (Lật thẻ 3D), 'dictation' (Nghe & Viết lại)
  const [activeMode, setActiveMode] = useState<'grid' | 'flashcard' | 'dictation'>('flashcard');

  // Learned words state (persisted in localStorage by word ID)
  const [learnedWords, setLearnedWords] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ta4_learned_unit_vocab');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  // Play word audio
  const handlePlayAudio = async (text: string, id?: string, slow: boolean = false, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (id) setActiveWordId(id);
    sound.playClick();
    await speakWord(text, slow ? 0.7 : speechRate);
    if (id) setActiveWordId(null);
  };

  const handleMarkLearned = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isNowLearned = !learnedWords[id];
    const updated = { ...learnedWords, [id]: isNowLearned };
    setLearnedWords(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ta4_learned_unit_vocab', JSON.stringify(updated));
    }
    if (isNowLearned) {
      sound.playStar();
      onAddStar(2);
    } else {
      sound.playClick();
    }
  };

  // =========================================================================
  // FLASHCARD 3D STUDIO STATE
  // =========================================================================
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [shuffledList, setShuffledList] = useState<VocabItem[]>(vocabList);

  useEffect(() => {
    setShuffledList(vocabList);
    setCardIndex(0);
    setIsFlipped(false);
  }, [vocabList]);

  // Auto-play slideshow timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && activeMode === 'flashcard' && shuffledList.length > 0) {
      timer = setInterval(() => {
        setIsFlipped(false);
        setCardIndex(prev => (prev + 1) % shuffledList.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeMode, shuffledList.length]);

  const handleFlipCard = () => {
    sound.playClick();
    setIsFlipped(prev => !prev);
  };

  const handlePrevCard = () => {
    sound.playClick();
    setIsFlipped(false);
    setCardIndex(prev => (prev > 0 ? prev - 1 : shuffledList.length - 1));
  };

  const handleNextCard = () => {
    sound.playClick();
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1 < shuffledList.length ? prev + 1 : 0));
  };

  const handleShuffleCards = () => {
    sound.playClick();
    const shuffled = [...shuffledList].sort(() => 0.5 - Math.random());
    setShuffledList(shuffled);
    setCardIndex(0);
    setIsFlipped(false);
  };

  const currentFlashcard = shuffledList[cardIndex] || vocabList[0];

  // =========================================================================
  // DICTATION / LISTEN & WRITE STUDIO STATE
  // =========================================================================
  // Dictation target type: 'word' (Từ vựng) | 'sentence' (Cả câu)
  const [dictationTarget, setDictationTarget] = useState<'word' | 'sentence'>('word');
  // Dictation input mode: 'tiles' (Xếp gạch chữ cái/từ) | 'typing' (Gõ bàn phím)
  const [inputMethod, setInputMethod] = useState<'tiles' | 'typing'>('tiles');
  const [dictationIndex, setDictationIndex] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]); // indexes of scrambled items clicked
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  const [dictationScore, setDictationScore] = useState<number>(0);
  const [dictationCompleted, setDictationCompleted] = useState<boolean>(false);

  const currentDictationItem = vocabList[dictationIndex] || vocabList[0];

  // Target text to write
  const targetText = useMemo(() => {
    if (!currentDictationItem) return '';
    if (dictationTarget === 'word') {
      return currentDictationItem.word.trim();
    } else {
      return currentDictationItem.example.trim();
    }
  }, [currentDictationItem, dictationTarget]);

  // Scrambled tiles for 'word': letters; for 'sentence': words
  const scrambledTiles = useMemo<{ id: number; text: string }[]>(() => {
    if (!targetText) return [];
    if (dictationTarget === 'word') {
      const letters = targetText.split('');
      return letters
        .map((letter, idx) => ({ id: idx, text: letter }))
        .sort(() => 0.5 - Math.random());
    } else {
      const words = targetText.split(/\s+/);
      return words
        .map((w, idx) => ({ id: idx, text: w }))
        .sort(() => 0.5 - Math.random());
    }
  }, [targetText, dictationTarget, dictationIndex]);

  // Current assembled text from tiles
  const assembledText = useMemo(() => {
    if (inputMethod === 'typing') {
      return typedInput;
    }
    if (dictationTarget === 'word') {
      return selectedTiles.map(idx => scrambledTiles[idx]?.text || '').join('');
    } else {
      return selectedTiles.map(idx => scrambledTiles[idx]?.text || '').join(' ');
    }
  }, [inputMethod, typedInput, selectedTiles, scrambledTiles, dictationTarget]);

  // Click on available tile to add to assembled text
  const handleSelectTile = (tileIndex: number) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedTiles(prev => [...prev, tileIndex]);
  };

  // Click on assembled tile to remove it back to available pool
  const handleRemoveTile = (indexInSelected: number) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedTiles(prev => prev.filter((_, i) => i !== indexInSelected));
  };

  // Reset current question attempt
  const handleResetCurrentQuestion = () => {
    sound.playClick();
    setSelectedTiles([]);
    setTypedInput('');
    setIsAnswerChecked(false);
    setIsCorrectAnswer(false);
    setShowHint(false);
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!targetText) return;
    const cleanUser = assembledText.trim().toLowerCase().replace(/[.,!?'"]/g, '');
    const cleanTarget = targetText.trim().toLowerCase().replace(/[.,!?'"]/g, '');

    const correct = cleanUser === cleanTarget;
    setIsAnswerChecked(true);
    setIsCorrectAnswer(correct);

    if (correct) {
      sound.playCorrect();
      setDictationScore(prev => prev + 1);
      onAddStar(dictationTarget === 'word' ? 2 : 3);
    } else {
      sound.playWrong();
    }
  };

  // Next dictation question
  const handleNextDictationQuestion = () => {
    sound.playClick();
    if (dictationIndex + 1 < vocabList.length) {
      setDictationIndex(prev => prev + 1);
      setSelectedTiles([]);
      setTypedInput('');
      setIsAnswerChecked(false);
      setIsCorrectAnswer(false);
      setShowHint(false);
    } else {
      setDictationCompleted(true);
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestartDictation = () => {
    sound.playClick();
    setDictationIndex(0);
    setSelectedTiles([]);
    setTypedInput('');
    setIsAnswerChecked(false);
    setIsCorrectAnswer(false);
    setShowHint(false);
    setDictationScore(0);
    setDictationCompleted(false);
  };

  // =========================================================================
  // MIC PRACTICE (GRID VIEW)
  // =========================================================================
  const [isListening, setIsListening] = useState<string | null>(null);
  const [speechResult, setSpeechResult] = useState<{ id: string; text: string; isCorrect: boolean } | null>(null);

  const handlePracticeMic = (word: VocabItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói trực tiếp. Hãy nghe và nhắc lại theo mẫu nhé!');
      speakWord(word.word, speechRate);
      return;
    }

    if (isListening === word.id) {
      setIsListening(null);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-GB';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(word.id);
      setSpeechResult(null);

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript.toLowerCase().trim();
        const target = word.word.toLowerCase().trim();
        const isMatch = spoken.includes(target) || target.includes(spoken);
        setSpeechResult({
          id: word.id,
          text: spoken,
          isCorrect: isMatch
        });
        if (isMatch) {
          sound.playCorrect();
          onAddStar(3);
        } else {
          sound.playWrong();
        }
        setIsListening(null);
      };

      recognition.onerror = () => {
        setIsListening(null);
      };

      recognition.onend = () => {
        setIsListening(null);
      };

      recognition.start();
    } catch {
      setIsListening(null);
    }
  };

  // Progress stats
  const totalWords = vocabList.length;
  const learnedCount = vocabList.filter(w => !!learnedWords[w.id]).length;
  const progressPercent = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Master Control Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
                {unitTitle || 'Từ Vựng SGK Tiếng Anh 4'}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-black">
                {vocabList.length} Từ Cốt Lõi
              </span>
            </div>

            {/* Listen All Button */}
            <button
              onClick={async () => {
                sound.playClick();
                for (const item of vocabList) {
                  setActiveWordId(item.id);
                  await speakWord(item.word, speechRate);
                  await new Promise(r => setTimeout(r, 450));
                }
                setActiveWordId(null);
                sound.playVictory();
                onAddStar(5);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>🔊 Nghe đồng thanh {vocabList.length} từ</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-2.5">
              <span>HỌC TỪ VỰNG SIÊU TRÍ NHỚ</span>
              <span className="text-2xl md:text-3xl">🃏✨</span>
            </h1>
            <p className="text-blue-100 text-xs md:text-sm max-w-2xl mt-1 font-medium">
              Phương pháp đa giác quan: Nhìn hình ảnh trực quan ➔ Nghe phát âm chuẩn IPA ➔ Lật thẻ 3D Spaced Repetition ➔ Nghe &amp; viết lại từ vựng / câu giúp nhớ sâu và không quên!
            </p>
          </div>

          {/* Mode Switcher Navigation */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('flashcard');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                activeMode === 'flashcard'
                  ? 'bg-amber-400 text-amber-950 scale-105 ring-2 ring-white'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>1. LẬT THẺ FLASHCARD 3D</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-bold">
                Trí nhớ siêu tốc
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('dictation');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                activeMode === 'dictation'
                  ? 'bg-amber-400 text-amber-950 scale-105 ring-2 ring-white'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>2. NGHE &amp; VIẾT LẠI TỪ / CÂU</span>
              <span className="text-[10px] bg-emerald-500/80 text-white px-2 py-0.5 rounded-full font-bold">
                Chính tả âm thanh
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveMode('grid');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                activeMode === 'grid'
                  ? 'bg-amber-400 text-amber-950 scale-105 ring-2 ring-white'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>3. BẢNG TỪ VỰNG CHI TIẾT</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-bold">
                Tra cứu &amp; Micro
              </span>
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="bg-black/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 max-w-lg">
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Đã làm chủ: {learnedCount} / {totalWords} từ ({progressPercent}%)
              </span>
              <span className="text-amber-300 font-black">
                {learnedCount === totalWords && totalWords > 0 ? 'Đạt chuẩn 100%! 🏆' : `Còn ${totalWords - learnedCount} từ`}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: FLASHCARD 3D STUDIO (LẬT THẺ 3D) */}
      {/* ========================================================================= */}
      {activeMode === 'flashcard' && currentFlashcard && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="w-full max-w-xl space-y-5">
            {/* Carousel status header */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-black">
                  Thẻ {cardIndex + 1} / {shuffledList.length}
                </span>
                <button
                  onClick={() => setIsAutoPlaying(prev => !prev)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                    isAutoPlaying
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoPlaying ? 'Tạm dừng chiếu' : 'Tự động chạy (5s)'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <span>Bấm vào thẻ để lật 🔄</span>
              </div>
            </div>

            {/* 3D Flashcard container with flip animation */}
            <div
              onClick={handleFlipCard}
              className={`w-full min-h-[360px] rounded-3xl border-2 transition-all duration-300 p-8 shadow-md cursor-pointer flex flex-col justify-between select-none relative overflow-hidden ${
                learnedWords[currentFlashcard.id]
                  ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30'
                  : 'border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 hover:border-indigo-400'
              }`}
            >
              {/* Top Bar inside card */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {isFlipped ? 'Mặt Sau · Nghĩa & Ngữ Cảnh' : 'Mặt Trước · Tiếng Anh & Phát Âm'}
                </span>

                <button
                  onClick={e => handleMarkLearned(currentFlashcard.id, e)}
                  className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-bold ${
                    learnedWords[currentFlashcard.id]
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-300'
                  }`}
                  title="Đánh dấu đã thuộc"
                >
                  <Check className="w-4 h-4" />
                  <span>{learnedWords[currentFlashcard.id] ? 'Đã thuộc ⭐' : 'Chưa thuộc'}</span>
                </button>
              </div>

              {!isFlipped ? (
                // Front Side
                <div className="my-auto text-center space-y-3.5 py-4">
                  <div className="text-7xl filter drop-shadow-sm animate-bounce">
                    {currentFlashcard.iconEmoji}
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                    {currentFlashcard.word}
                  </h3>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-base font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                      {currentFlashcard.ipa}
                    </span>
                    {currentFlashcard.vietnamesePhonetic && (
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
                        🗣️ Gợi ý đọc: {currentFlashcard.vietnamesePhonetic}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={e => handlePlayAudio(currentFlashcard.word, currentFlashcard.id, false, e)}
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition"
                    >
                      <Volume2 className="w-4 h-4" /> Phát âm chuẩn SGK
                    </button>
                    <button
                      onClick={e => handlePlayAudio(currentFlashcard.word, currentFlashcard.id, true, e)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                    >
                      🐢 Đọc chậm từng âm
                    </button>
                  </div>
                </div>
              ) : (
                // Back Side
                <div className="my-auto text-center space-y-4 py-3">
                  <div className="text-3xl">💡</div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Nghĩa Tiếng Việt
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                      {currentFlashcard.vietnamese}
                    </h3>
                  </div>

                  {/* Context sentence */}
                  <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-left space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-indigo-950">
                      <span className="text-sm font-black">&quot;{currentFlashcard.example}&quot;</span>
                      <button
                        onClick={e => handlePlayAudio(currentFlashcard.example, undefined, false, e)}
                        className="p-1.5 rounded-lg bg-indigo-200 hover:bg-indigo-300 text-indigo-900"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {currentFlashcard.exampleIpa && (
                      <p className="text-[11px] font-mono text-indigo-700">
                        {currentFlashcard.exampleIpa}
                      </p>
                    )}
                    <p className="text-slate-600 italic">
                      → {currentFlashcard.exampleMeaning}
                    </p>
                  </div>

                  {currentFlashcard.parentTip && (
                    <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium text-left">
                      ✨ <strong>Mẹo phát âm &amp; ghi nhớ:</strong> {currentFlashcard.parentTip}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom hint */}
              <div className="text-center text-xs text-slate-400 font-medium pt-3 border-t border-slate-100">
                {isFlipped ? 'Bấm để lật lại mặt tiếng Anh' : 'Bấm để xem nghĩa tiếng Việt & câu ví dụ'}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrevCard}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                ⬅️ Thẻ trước
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffleCards}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  title="Xáo trộn thứ tự thẻ"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xáo trộn</span>
                </button>

                <button
                  onClick={handleFlipCard}
                  className="px-4 py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Lật thẻ</span>
                </button>
              </div>

              <button
                onClick={handleNextCard}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Thẻ tiếp theo ➡️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DICTATION / LISTEN & WRITE STUDIO (NGHE & VIẾT LẠI) */}
      {/* ========================================================================= */}
      {activeMode === 'dictation' && currentDictationItem && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto space-y-6">
          {!dictationCompleted ? (
            <div className="space-y-6">
              {/* Header: Progress & Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Câu {dictationIndex + 1} / {vocabList.length}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    Điểm: <strong className="text-amber-500 font-black">{dictationScore}</strong> ⭐
                  </span>
                </div>

                {/* Switch Target: Word vs Sentence */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDictationTarget('word');
                      handleResetCurrentQuestion();
                    }}
                    className={`px-3 py-1 rounded-lg transition ${
                      dictationTarget === 'word'
                        ? 'bg-white text-indigo-700 shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔤 Viết Từ Vựng
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDictationTarget('sentence');
                      handleResetCurrentQuestion();
                    }}
                    className={`px-3 py-1 rounded-lg transition ${
                      dictationTarget === 'sentence'
                        ? 'bg-white text-indigo-700 shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📝 Viết Cả Câu
                  </button>
                </div>
              </div>

              {/* Audio Listen Station */}
              <div className="text-center space-y-4 py-2">
                <div className="text-6xl filter drop-shadow-sm animate-pulse">
                  {currentDictationItem.iconEmoji}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Nghĩa Tiếng Việt Gợi Ý:
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                    {dictationTarget === 'word'
                      ? currentDictationItem.vietnamese
                      : currentDictationItem.exampleMeaning}
                  </h3>
                </div>

                {/* Big Audio Buttons */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePlayAudio(targetText, undefined, false)}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition"
                  >
                    <Volume2 className="w-5 h-5 animate-bounce" />
                    <span>🔊 Bấm Nghe Phát Âm Chuẩn</span>
                  </button>

                  <button
                    onClick={() => handlePlayAudio(targetText, undefined, true)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                  >
                    <span>🐢 Nghe Chậm Từng Âm</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowHint(prev => !prev);
                    }}
                    className="px-3.5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-2xl text-xs font-bold inline-flex items-center gap-1 border border-amber-200 transition"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý chữ cái đầu'}</span>
                  </button>
                </div>

                {showHint && (
                  <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium inline-block animate-fadeIn">
                    💡 Chữ cái bắt đầu: <strong>&quot;{targetText.slice(0, 2)}...&quot;</strong> · Độ dài: <strong>{targetText.length}</strong> ký tự
                  </div>
                )}
              </div>

              {/* Input Method Switcher: Tiles (Xếp chữ) vs Typing (Gõ phím) */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-indigo-600" />
                  Chọn cách làm bài:
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setInputMethod('tiles');
                    }}
                    className={`px-2.5 py-1 rounded-md transition ${
                      inputMethod === 'tiles' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600'
                    }`}
                  >
                    🧩 Xếp Gạch Chữ Cái / Từ
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setInputMethod('typing');
                    }}
                    className={`px-2.5 py-1 rounded-md transition ${
                      inputMethod === 'typing' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600'
                    }`}
                  >
                    ⌨️ Gõ Bàn Phím
                  </button>
                </div>
              </div>

              {/* ================= METHOD 1: TILES SCRAMBLE ================= */}
              {inputMethod === 'tiles' && (
                <div className="space-y-4">
                  {/* Target drop / assembled zone */}
                  <div className="p-4 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 min-h-[70px] flex flex-wrap items-center justify-center gap-1.5">
                    {selectedTiles.length === 0 ? (
                      <span className="text-xs text-indigo-400 font-medium italic">
                        Chạm vào các ô chữ cái / từ bên dưới để ghép vào đây...
                      </span>
                    ) : (
                      selectedTiles.map((tileIdx, idx) => {
                        const tile = scrambledTiles[tileIdx];
                        return (
                          <button
                            key={idx}
                            onClick={() => handleRemoveTile(idx)}
                            className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-xs hover:bg-rose-500 transition animate-scaleIn"
                            title="Bấm để bỏ chữ này ra"
                          >
                            {tile?.text}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Scrambled source pool */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                      Kho chữ cái xáo trộn:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {scrambledTiles.map((tile, idx) => {
                        const isUsed = selectedTiles.includes(idx);
                        return (
                          <button
                            key={idx}
                            disabled={isUsed || isAnswerChecked}
                            onClick={() => handleSelectTile(idx)}
                            className={`px-4 py-2 rounded-xl text-sm font-black border-2 transition-all ${
                              isUsed
                                ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 scale-95'
                                : 'border-indigo-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 text-slate-800 shadow-sm active:scale-95'
                            }`}
                          >
                            {tile.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= METHOD 2: KEYBOARD TYPING ================= */}
              {inputMethod === 'typing' && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isAnswerChecked}
                      value={typedInput}
                      onChange={e => setTypedInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && typedInput.trim() && !isAnswerChecked) {
                          handleCheckAnswer();
                        }
                      }}
                      placeholder={`Gõ lại ${dictationTarget === 'word' ? 'từ vựng' : 'câu'} mà em vừa nghe được...`}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-200 text-base font-bold text-slate-800 focus:outline-none focus:border-indigo-500 bg-slate-50/70"
                    />
                    {typedInput && !isAnswerChecked && (
                      <button
                        onClick={() => setTypedInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Gợi ý độ dài: {targetText.length} ký tự</span>
                    <span>Nhấn Enter hoặc nút bên dưới để nộp bài</span>
                  </div>
                </div>
              )}

              {/* Action buttons: Check & Reset & Next */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleResetCurrentQuestion}
                  disabled={isAnswerChecked && isCorrectAnswer}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại câu này</span>
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={assembledText.trim().length === 0}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition shadow-md flex items-center gap-1.5 ${
                      assembledText.trim().length > 0
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Kiểm Tra Đáp Án</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextDictationQuestion}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition shadow-md flex items-center gap-1.5 animate-bounce"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Result Feedback Banner */}
              {isAnswerChecked && (
                <div
                  className={`p-4 rounded-2xl border-2 transition-all animate-fadeIn ${
                    isCorrectAnswer
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{isCorrectAnswer ? '🎉' : '💡'}</div>
                    <div className="space-y-1 text-xs">
                      {isCorrectAnswer ? (
                        <>
                          <h4 className="font-black text-sm text-emerald-900">
                            Chính xác tuyệt đối! (+{dictationTarget === 'word' ? '2' : '3'} ⭐)
                          </h4>
                          <p className="font-semibold text-emerald-800">
                            Em đã nghe và viết rất chuẩn từ/câu: <strong>&quot;{targetText}&quot;</strong>
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="font-black text-sm text-rose-900">
                            Chưa chính xác! Đừng nản lòng nhé!
                          </h4>
                          <p className="text-slate-700">
                            Đáp án đúng là: <strong className="text-indigo-700 font-black text-sm">&quot;{targetText}&quot;</strong>
                          </p>
                          <p className="text-slate-500 italic">
                            Em đã viết: &quot;{assembledText}&quot;
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Dictation Completed Celebration
            <div className="text-center space-y-4 py-8">
              <Award className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-slate-900">
                XUẤT SẮC! HOÀN THÀNH BÀI NGHE VIẾT! 🏆
              </h3>
              <p className="text-slate-600 text-sm">
                Em đã trả lời đúng{' '}
                <strong className="text-indigo-600 font-black text-lg">
                  {dictationScore} / {vocabList.length}
                </strong>{' '}
                câu trong bài luyện chính tả âm thanh! (+5 ⭐)
              </p>
              <button
                onClick={handleRestartDictation}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:brightness-105 transition flex items-center gap-2 mx-auto text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Luyện tập lại từ đầu
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: GRID VIEW & MIC PRACTICE (BẢNG TỪ VỰNG CHI TIẾT) */}
      {/* ========================================================================= */}
      {activeMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
            <span>Hiển thị toàn bộ {vocabList.length} từ vựng kèm ngữ âm &amp; ví dụ</span>
            <span className="hidden sm:inline">Bấm vào thẻ để lật xem ví dụ SGK</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vocabList.map(item => {
              const isLearned = !!learnedWords[item.id];
              const isSpeaking = activeWordId === item.id;
              const isMicActive = isListening === item.id;
              const result = speechResult?.id === item.id ? speechResult : null;

              return (
                <div
                  key={item.id}
                  className={`group relative min-h-[260px] bg-white rounded-2xl border-2 transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-md ${
                    isLearned
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-sky-300'
                  }`}
                >
                  {/* Top Row: Icon + Learned Toggle */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {item.iconEmoji}
                    </div>

                    <button
                      onClick={() => handleMarkLearned(item.id)}
                      className={`p-1.5 rounded-xl transition-colors ${
                        isLearned
                          ? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                      }`}
                      title={isLearned ? 'Đã nhớ từ này' : 'Đánh dấu đã thuộc'}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Word Content */}
                  <div className="my-2 space-y-1">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.word}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                        {item.ipa}
                      </span>
                      {item.vietnamesePhonetic && (
                        <span className="bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-md text-[11px]">
                          🗣️ {item.vietnamesePhonetic}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-800 pt-1">
                      {item.vietnamese}
                    </p>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mt-2">
                      <p className="font-semibold text-slate-900">&quot;{item.example}&quot;</p>
                      <p className="text-slate-500 italic mt-0.5">→ {item.exampleMeaning}</p>
                    </div>
                  </div>

                  {/* Speech Result */}
                  {result && (
                    <div className={`text-xs px-2.5 py-1 rounded-lg my-1 ${
                      result.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {result.isCorrect ? '🎉 Nói chuẩn: ' : '💪 Vừa nói: '}
                      <span className="font-semibold">&quot;{result.text}&quot;</span>
                    </div>
                  )}

                  {/* Audio & Mic practice controls */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePlayAudio(item.word, item.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs transition-colors ${
                        isSpeaking
                          ? 'bg-amber-400 text-slate-900 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isSpeaking ? 'Đang đọc...' : 'Nghe phát âm'}</span>
                    </button>

                    <button
                      onClick={e => handlePracticeMic(item, e)}
                      title="Luyện nói thử thách bằng Micro"
                      className={`p-2 rounded-xl text-xs font-medium transition-colors ${
                        isMicActive
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600'
                      }`}
                    >
                      {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
