import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Search,
  BookOpen,
  Sparkles,
  Star,
  CheckCircle2,
  Check,
  RotateCcw,
  Layers,
  HelpCircle,
  Award,
  Filter,
  ArrowRight,
  Flame,
  Grid,
  CreditCard,
  Gamepad2,
  Mic,
  Lightbulb,
  ExternalLink,
  Shuffle,
  Play,
  Pause,
  Puzzle,
  Compass,
  Trophy,
  Heart,
  PenTool,
  Type
} from 'lucide-react';
import { WORDLIST_SEMESTER_1, WordlistItem } from '../data/wordlistSemester1';
import { WORDLIST_SEMESTER_2, WordlistItemSemester2 } from '../data/wordlistSemester2';
import { sound, speakWord } from '../utils/audio';

// Unified item type for both semester 1 & 2
export interface UnifiedWordlistItem {
  id: string;
  word: string;
  phonetic: string;
  meaningVi: string;
  category: string;
  categoryLabelVi: string;
  volume: 1 | 2;
  page: number;
  icon: string;
  exampleEn: string;
  exampleVi: string;
  memoryTip?: string;
}

interface WordlistStudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToReview4?: () => void;
  onSwitchToUnit20?: () => void;
  onSwitchToUnit19?: () => void;
  onSwitchToUnit18?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToUnit1?: () => void;
  initialVolume?: 1 | 2 | 'all';
}

export const WordlistStudio: React.FC<WordlistStudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToReview4,
  onSwitchToUnit20,
  onSwitchToUnit19,
  onSwitchToUnit18,
  onSwitchToReview3,
  onSwitchToReview2,
  onSwitchToUnit1,
  initialVolume = 2 // Default to Volume 2 since students are studying semester 2 units
}) => {
  // Volume selection: 2 (Tập 2 · Trang 74-75), 1 (Tập 1 · Trang 78-80), 'all' (Cả năm học)
  const [selectedVolume, setSelectedVolume] = useState<1 | 2 | 'all'>(initialVolume);

  // View Mode: 'grid' (Tra cứu lưới), 'flashcard' (Lật thẻ 3D), 'quiz' (Đố vui thử thách), 'match' (Ghép cặp trí nhớ), 'dictation' (Nghe & viết lại)
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard' | 'quiz' | 'match' | 'dictation'>('grid');

  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlearned' | 'learned'>('all');

  // Learned words persistence
  const [learnedWords, setLearnedWords] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ta4_learned_wordlist_v2');
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

  // State: Flipped flashcards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Combine datasets
  const allWordsCombined = useMemo<UnifiedWordlistItem[]>(() => {
    const list1: UnifiedWordlistItem[] = WORDLIST_SEMESTER_1.map(w => ({
      ...w,
      volume: 1
    }));
    const list2: UnifiedWordlistItem[] = WORDLIST_SEMESTER_2.map(w => ({
      ...w,
      volume: 2
    }));
    return [...list1, ...list2];
  }, []);

  // Filter by selected volume
  const volumeWords = useMemo<UnifiedWordlistItem[]>(() => {
    if (selectedVolume === 1) {
      return allWordsCombined.filter(w => w.volume === 1);
    }
    if (selectedVolume === 2) {
      return allWordsCombined.filter(w => w.volume === 2);
    }
    return allWordsCombined;
  }, [allWordsCombined, selectedVolume]);

  // Alphabet list available in current volume dataset
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    volumeWords.forEach(w => {
      const firstChar = w.word.trim()[0];
      if (firstChar && firstChar.toUpperCase() >= 'A' && firstChar.toUpperCase() <= 'Z') {
        letters.add(firstChar.toUpperCase());
      }
    });
    return Array.from(letters).sort();
  }, [volumeWords]);

  // Available categories for current volume
  const availableCategories = useMemo(() => {
    const map = new Map<string, string>();
    volumeWords.forEach(w => {
      if (!map.has(w.category)) {
        map.set(w.category, w.categoryLabelVi);
      }
    });
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }, [volumeWords]);

  // Filtered words
  const filteredWords = useMemo(() => {
    return volumeWords.filter(item => {
      // Search
      const term = searchTerm.toLowerCase().trim();
      const matchSearch =
        !term ||
        item.word.toLowerCase().includes(term) ||
        item.meaningVi.toLowerCase().includes(term) ||
        item.phonetic.toLowerCase().includes(term);

      // Page
      const matchPage = selectedPage === 'all' || item.page === selectedPage;

      // Category
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Letter
      const firstChar = item.word.trim()[0]?.toUpperCase();
      const matchLetter = selectedLetter === 'all' || firstChar === selectedLetter;

      // Status
      const isLearned = !!learnedWords[item.id];
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'learned' && isLearned) ||
        (statusFilter === 'unlearned' && !isLearned);

      return matchSearch && matchPage && matchCategory && matchLetter && matchStatus;
    });
  }, [volumeWords, searchTerm, selectedPage, selectedCategory, selectedLetter, statusFilter, learnedWords]);

  // Reset page filter when volume changes
  useEffect(() => {
    setSelectedPage('all');
    setSelectedCategory('all');
    setSelectedLetter('all');
    setFlashcardIndex(0);
  }, [selectedVolume]);

  // Auto-play slideshow timer for flashcard
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && viewMode === 'flashcard' && filteredWords.length > 0) {
      timer = setInterval(() => {
        setFlashcardIndex(prev => (prev + 1) % filteredWords.length);
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, filteredWords.length]);

  // Toggle Learned
  const handleToggleLearned = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = { ...learnedWords, [id]: !learnedWords[id] };
    setLearnedWords(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ta4_learned_wordlist_v2', JSON.stringify(updated));
    }
    if (updated[id]) {
      sound.playStar();
      onAddStar(1);
    } else {
      sound.playClick();
    }
  };

  // Toggle Flip
  const handleToggleFlip = (id: string) => {
    sound.playClick();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Play audio
  const handleSpeak = (text: string, e?: React.MouseEvent, slow: boolean = false) => {
    if (e) e.stopPropagation();
    sound.playClick();
    // Clean string like "wash (the clothes / the dishes)" -> "wash the clothes"
    const cleanText = text.replace(/[()]/g, '').split('/')[0].trim();
    speakWord(cleanText, slow ? 0.7 : speechRate);
  };

  // =========================================================================
  // QUIZ MODE STATE
  // =========================================================================
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizSeed, setQuizSeed] = useState<number>(0);

  // Generate 10 random quiz questions from current filtered or volume list
  const quizPool = useMemo(() => {
    const source = filteredWords.length >= 4 ? filteredWords : volumeWords;
    const shuffled = [...source].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [filteredWords, volumeWords, quizSeed]);

  const currentQuizItem = quizPool[quizIndex];

  // Alternating question styles: 0 -> Guess English from Vietnamese, 1 -> Guess Vietnamese from English, 2 -> Guess from Icon
  const quizQuestionType = useMemo(() => {
    return quizIndex % 3;
  }, [quizIndex]);

  const quizOptions = useMemo(() => {
    if (!currentQuizItem) return [];
    const source = filteredWords.length >= 4 ? filteredWords : volumeWords;
    const others = source.filter(w => w.id !== currentQuizItem.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentQuizItem, ...shuffledOthers].sort(() => 0.5 - Math.random());
    return combined;
  }, [currentQuizItem, filteredWords, volumeWords]);

  const handleSelectQuiz = (opt: UnifiedWordlistItem) => {
    if (selectedQuizOption || !currentQuizItem) return;
    setSelectedQuizOption(opt.id);

    if (opt.id === currentQuizItem.id) {
      sound.playCorrect();
      setQuizScore(prev => prev + 1);
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < quizPool.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
    } else {
      setQuizCompleted(true);
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizSeed(prev => prev + 1);
  };

  // =========================================================================
  // MEMORY MATCH PAIRS GAME STATE
  // =========================================================================
  interface MatchCard {
    cardId: string;
    wordId: string;
    text: string;
    icon?: string;
    type: 'en' | 'vi';
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [selectedMatchFirst, setSelectedMatchFirst] = useState<MatchCard | null>(null);
  const [selectedMatchSecond, setSelectedMatchSecond] = useState<MatchCard | null>(null);
  const [matchFlipsCount, setMatchFlipsCount] = useState<number>(0);
  const [matchGameWon, setMatchGameWon] = useState<boolean>(false);
  const [matchTimer, setMatchTimer] = useState<number>(0);
  const [matchTimerActive, setMatchTimerActive] = useState<boolean>(false);

  const initMatchGame = () => {
    sound.playClick();
    const source = filteredWords.length >= 6 ? filteredWords : volumeWords;
    const shuffled = [...source].sort(() => 0.5 - Math.random()).slice(0, 6);

    const cards: MatchCard[] = [];
    shuffled.forEach(item => {
      // English card
      cards.push({
        cardId: `${item.id}-en`,
        wordId: item.id,
        text: item.word,
        icon: item.icon,
        type: 'en',
        isFlipped: false,
        isMatched: false
      });
      // Vietnamese card
      cards.push({
        cardId: `${item.id}-vi`,
        wordId: item.id,
        text: item.meaningVi,
        type: 'vi',
        isFlipped: false,
        isMatched: false
      });
    });

    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedMatchFirst(null);
    setSelectedMatchSecond(null);
    setMatchFlipsCount(0);
    setMatchGameWon(false);
    setMatchTimer(0);
    setMatchTimerActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (matchTimerActive && !matchGameWon) {
      interval = setInterval(() => {
        setMatchTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchTimerActive, matchGameWon]);

  // Init match game when switching to match mode
  useEffect(() => {
    if (viewMode === 'match' && matchCards.length === 0) {
      initMatchGame();
    }
  }, [viewMode]);

  const handleCardClick = (card: MatchCard) => {
    if (card.isMatched || card.isFlipped || selectedMatchSecond) return;

    sound.playClick();
    const newCards = matchCards.map(c =>
      c.cardId === card.cardId ? { ...c, isFlipped: true } : c
    );
    setMatchCards(newCards);

    if (!selectedMatchFirst) {
      setSelectedMatchFirst(card);
    } else {
      setSelectedMatchSecond(card);
      setMatchFlipsCount(prev => prev + 1);

      // Check match
      if (selectedMatchFirst.wordId === card.wordId && selectedMatchFirst.type !== card.type) {
        // Matched!
        setTimeout(() => {
          sound.playSuccess();
          const matchedCards = newCards.map(c =>
            c.wordId === card.wordId ? { ...c, isMatched: true, isFlipped: true } : c
          );
          setMatchCards(matchedCards);
          setSelectedMatchFirst(null);
          setSelectedMatchSecond(null);

          // Check if all matched
          if (matchedCards.every(c => c.isMatched)) {
            setMatchGameWon(true);
            setMatchTimerActive(false);
            sound.playVictory();
            onAddStar(5);
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          }
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          sound.playWrong();
          setMatchCards(prev =>
            prev.map(c =>
              c.cardId === selectedMatchFirst.cardId || c.cardId === card.cardId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedMatchFirst(null);
          setSelectedMatchSecond(null);
        }, 1000);
      }
    }
  };

  // =========================================================================
  // DICTATION / LISTEN & WRITE MODE STATE (WORDLIST LEVEL)
  // =========================================================================
  const [dictationTarget, setDictationTarget] = useState<'word' | 'sentence'>('word');
  const [dictationInputMethod, setDictationInputMethod] = useState<'tiles' | 'typing'>('tiles');
  const [dictationIndex, setDictationIndex] = useState<number>(0);
  const [typedDictation, setTypedDictation] = useState<string>('');
  const [selectedDictationTiles, setSelectedDictationTiles] = useState<number[]>([]);
  const [showDictationHint, setShowDictationHint] = useState<boolean>(false);
  const [isDictationChecked, setIsDictationChecked] = useState<boolean>(false);
  const [isDictationCorrect, setIsDictationCorrect] = useState<boolean>(false);
  const [dictationScore, setDictationScore] = useState<number>(0);
  const [dictationCompleted, setDictationCompleted] = useState<boolean>(false);

  // Pool of dictation words (using filtered or volume words)
  const dictationPool = useMemo(() => {
    const source = filteredWords.length >= 5 ? filteredWords : volumeWords;
    return source.slice(0, 20); // Practice on 20 words per set
  }, [filteredWords, volumeWords]);

  const currentDictationWord = dictationPool[dictationIndex] || dictationPool[0];

  const targetDictationText = useMemo(() => {
    if (!currentDictationWord) return '';
    if (dictationTarget === 'word') {
      return currentDictationWord.word.replace(/[()]/g, '').split('/')[0].trim();
    } else {
      return currentDictationWord.exampleEn.trim();
    }
  }, [currentDictationWord, dictationTarget]);

  const scrambledDictationTiles = useMemo<{ id: number; text: string }[]>(() => {
    if (!targetDictationText) return [];
    if (dictationTarget === 'word') {
      return targetDictationText.split('').map((char, idx) => ({ id: idx, text: char })).sort(() => 0.5 - Math.random());
    } else {
      return targetDictationText.split(/\s+/).map((word, idx) => ({ id: idx, text: word })).sort(() => 0.5 - Math.random());
    }
  }, [targetDictationText, dictationTarget, dictationIndex]);

  const assembledDictationText = useMemo(() => {
    if (dictationInputMethod === 'typing') {
      return typedDictation;
    }
    if (dictationTarget === 'word') {
      return selectedDictationTiles.map(idx => scrambledDictationTiles[idx]?.text || '').join('');
    } else {
      return selectedDictationTiles.map(idx => scrambledDictationTiles[idx]?.text || '').join(' ');
    }
  }, [dictationInputMethod, typedDictation, selectedDictationTiles, scrambledDictationTiles, dictationTarget]);

  const handleSelectDictationTile = (tileIndex: number) => {
    if (isDictationChecked) return;
    sound.playClick();
    setSelectedDictationTiles(prev => [...prev, tileIndex]);
  };

  const handleRemoveDictationTile = (indexInSelected: number) => {
    if (isDictationChecked) return;
    sound.playClick();
    setSelectedDictationTiles(prev => prev.filter((_, i) => i !== indexInSelected));
  };

  const handleResetCurrentDictation = () => {
    sound.playClick();
    setSelectedDictationTiles([]);
    setTypedDictation('');
    setIsDictationChecked(false);
    setIsDictationCorrect(false);
    setShowDictationHint(false);
  };

  const handleCheckDictationAnswer = () => {
    if (!targetDictationText) return;
    const cleanUser = assembledDictationText.trim().toLowerCase().replace(/[.,!?'"]/g, '');
    const cleanTarget = targetDictationText.trim().toLowerCase().replace(/[.,!?'"]/g, '');

    const correct = cleanUser === cleanTarget;
    setIsDictationChecked(true);
    setIsDictationCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setDictationScore(prev => prev + 1);
      onAddStar(dictationTarget === 'word' ? 2 : 3);
    } else {
      sound.playWrong();
    }
  };

  const handleNextDictation = () => {
    sound.playClick();
    if (dictationIndex + 1 < dictationPool.length) {
      setDictationIndex(prev => prev + 1);
      setSelectedDictationTiles([]);
      setTypedDictation('');
      setIsDictationChecked(false);
      setIsDictationCorrect(false);
      setShowDictationHint(false);
    } else {
      setDictationCompleted(true);
      sound.playVictory();
      onAddStar(5);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestartDictationStudio = () => {
    sound.playClick();
    setDictationIndex(0);
    setSelectedDictationTiles([]);
    setTypedDictation('');
    setIsDictationChecked(false);
    setIsDictationCorrect(false);
    setShowDictationHint(false);
    setDictationScore(0);
    setDictationCompleted(false);
  };

  // Progress stats
  const totalVolumeWordsCount = volumeWords.length;
  const learnedCount = volumeWords.filter(w => !!learnedWords[w.id]).length;
  const progressPercent = totalVolumeWordsCount > 0 ? Math.round((learnedCount / totalVolumeWordsCount) * 100) : 0;

  return (
    <div className="space-y-8 pb-20">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5 shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Global Success
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/90 text-amber-950 text-xs font-black flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedVolume === 2 ? 'Tập 2 · Trang 74 - 75' : selectedVolume === 1 ? 'Tập 1 · Trang 78 - 80' : 'Trọn Bộ Cả Năm Lớp 4'}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/30 text-white text-xs font-bold">
                {totalVolumeWordsCount} Từ Vựng Chuẩn IPA
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToReview4 && (
                <button
                  onClick={onSwitchToReview4}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1 backdrop-blur-sm"
                >
                  <span>🏆 Review 4</span>
                </button>
              )}
              {onSwitchToUnit20 && (
                <button
                  onClick={onSwitchToUnit20}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1 backdrop-blur-sm"
                >
                  <span>⛺ Unit 20</span>
                </button>
              )}
              {onSwitchToUnit19 && (
                <button
                  onClick={onSwitchToUnit19}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1 backdrop-blur-sm"
                >
                  <span>🦁 Unit 19</span>
                </button>
              )}
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1 backdrop-blur-sm"
                >
                  <span>🏆 Review 3</span>
                </button>
              )}
              {onOpenVoiceStudio && (
                <button
                  onClick={onOpenVoiceStudio}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs transition flex items-center gap-1 shadow-sm"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Studio</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-3">
              <span>WORDLIST TỪ VỰNG SGK</span>
              <span className="text-2xl md:text-4xl">📑✨</span>
            </h1>
            <p className="text-blue-100 text-sm md:text-base max-w-3xl mt-1.5 font-medium leading-relaxed">
              Từ điển hình ảnh tương tác chuẩn Quốc gia với phát âm giọng Anh-Mỹ bản xứ, phiên âm quốc tế IPA, ví dụ ngữ cảnh sinh động và mẹo siêu trí nhớ giúp học sinh nhớ lâu, hiểu sâu và tự tin giao tiếp!
            </p>
          </div>

          {/* Volume Tabs: Tập 2 (Mặc định) vs Tập 1 vs Cả 2 Tập */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-wider mr-1">
              Chọn Tập SGK:
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedVolume(2);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                selectedVolume === 2
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>📘</span>
              <span>TẬP 2 · HỌC KỲ 2 (Trang 74 - 75)</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-bold">
                100+ từ mới
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedVolume(1);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                selectedVolume === 1
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>📗</span>
              <span>TẬP 1 · HỌC KỲ 1 (Trang 78 - 80)</span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-bold">
                82 từ vựng
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedVolume('all');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-sm ${
                selectedVolume === 'all'
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>🌟</span>
              <span>TRỌN BỘ CẢ NĂM (Tập 1 + Tập 2)</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-xl">
            <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Tiến độ ghi nhớ: {learnedCount} / {totalVolumeWordsCount} từ ({progressPercent}%)
              </span>
              <span className="text-amber-300 font-black">
                {learnedCount === totalVolumeWordsCount && totalVolumeWordsCount > 0
                  ? 'Xuất sắc! Đã thuộc 100% 🏆'
                  : `Cố lên! Còn ${totalVolumeWordsCount - learnedCount} từ`}
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-green-300 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Station: 4 Learning Modes & Smart Filters */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200 space-y-4">
        {/* Row 1: Search & View Mode Selector */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm từ tiếng Anh, phiên âm hoặc nghĩa tiếng Việt..."
              className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/70"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* 4 Mode Switchers */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto justify-center flex-wrap">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-700 shadow-sm font-black ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>1. Tra Cứu Lưới ({filteredWords.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('flashcard');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'flashcard'
                  ? 'bg-white text-indigo-700 shadow-sm font-black ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>2. Lật Thẻ 3D</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('quiz');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'quiz'
                  ? 'bg-white text-emerald-700 shadow-sm font-black ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>3. Đố Vui 10 Câu</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('match');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'match'
                  ? 'bg-white text-purple-700 shadow-sm font-black ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>4. Ghép Cặp Trí Nhớ</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('dictation');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'dictation'
                  ? 'bg-white text-amber-800 shadow-sm font-black ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>5. Nghe &amp; Viết Lại</span>
            </button>
          </div>
        </div>

        {/* Row 2: Page & Category & Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Textbook Pages Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-blue-600" /> Trang SGK:
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedPage('all');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                selectedPage === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả các trang
            </button>

            {selectedVolume === 2 && (
              <>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedPage(74);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedPage === 74
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Trang 74 (A - F)
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedPage(75);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedPage === 75
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Trang 75 (G - Z)
                </button>
              </>
            )}

            {selectedVolume === 1 && (
              <>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedPage(78);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedPage === 78
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Trang 78 (A - I)
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedPage(79);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedPage === 79
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Trang 79 (I - S)
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedPage(80);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                    selectedPage === 80
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Trang 80 (S - Y)
                </button>
              </>
            )}
          </div>

          {/* Category Dropdown & Status Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status: Tất cả / Chưa thuộc / Đã thuộc */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('all');
                }}
                className={`px-2 py-1 rounded-lg transition ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('unlearned');
                }}
                className={`px-2 py-1 rounded-lg transition ${
                  statusFilter === 'unlearned'
                    ? 'bg-amber-100 text-amber-900 shadow-xs font-black'
                    : 'text-slate-600'
                }`}
              >
                Chưa thuộc
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStatusFilter('learned');
                }}
                className={`px-2 py-1 rounded-lg transition ${
                  statusFilter === 'learned'
                    ? 'bg-emerald-100 text-emerald-900 shadow-xs font-black'
                    : 'text-slate-600'
                }`}
              >
                Đã thuộc ⭐
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={e => {
                  sound.playClick();
                  setSelectedCategory(e.target.value);
                }}
                className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">-- Tất Cả Nhóm Chủ Đề --</option>
                {availableCategories.map(cat => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 3: A-Z Alphabet Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold shrink-0 mr-1">Chữ cái A-Z:</span>
          <button
            onClick={() => {
              sound.playClick();
              setSelectedLetter('all');
            }}
            className={`px-2 py-0.5 rounded-lg font-bold shrink-0 transition ${
              selectedLetter === 'all'
                ? 'bg-indigo-600 text-white font-black shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {alphabet.map(letter => {
            const isSel = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => {
                  sound.playClick();
                  setSelectedLetter(letter);
                }}
                className={`w-6 h-6 rounded-lg font-black shrink-0 transition flex items-center justify-center ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: GRID VIEW (TRA CỨU LƯỚI TRỰC QUAN) */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
            <span>
              Hiển thị <strong className="text-blue-600">{filteredWords.length}</strong> từ vựng phù hợp
            </span>
            <span className="hidden sm:inline">
              Bấm vào thẻ hoặc biểu tượng loa để nghe phát âm chuẩn IPA 🔊
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWords.map(item => {
              const isLearned = !!learnedWords[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => handleSpeak(item.word)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group relative ${
                    isLearned
                      ? 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-400 hover:shadow-md'
                      : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Badges + Learned Check */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-2xl filter drop-shadow-xs">{item.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          Tập {item.volume} · P.{item.page}
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {item.categoryLabelVi}
                        </span>
                      </div>
                      <button
                        onClick={e => handleToggleLearned(item.id, e)}
                        className={`p-1.5 rounded-xl transition ${
                          isLearned
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={isLearned ? 'Đã thuộc (Bấm để hủy)' : 'Đánh dấu đã thuộc (+1 sao)'}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Word + Phonetic */}
                    <div className="space-y-0.5">
                      <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                        <span>{item.word}</span>
                      </h3>
                      <p className="text-xs font-mono font-semibold text-blue-600 tracking-wide">
                        {item.phonetic}
                      </p>
                    </div>

                    {/* Meaning */}
                    <p className="text-xs font-bold text-slate-800 mt-2 line-clamp-2">
                      {item.meaningVi}
                    </p>

                    {/* Memory Tip */}
                    {item.memoryTip && (
                      <div className="mt-2 text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200/80 rounded-xl p-2 font-medium">
                        <span className="font-bold text-amber-900">✨ Mẹo nhớ:</span> {item.memoryTip}
                      </div>
                    )}
                  </div>

                  {/* Example & Audio Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="truncate mr-2">
                      <span className="text-slate-600 italic block truncate">
                        &quot;{item.exampleEn}&quot;
                      </span>
                      <span className="text-slate-400 text-[10px] block truncate">
                        {item.exampleVi}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={e => handleSpeak(item.word, e, true)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                        title="Nghe đọc chậm (0.7x)"
                      >
                        🐢
                      </button>
                      <button
                        onClick={e => handleSpeak(item.word, e)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        title="Nghe phát âm chuẩn"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredWords.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-700">Không tìm thấy từ vựng phù hợp</p>
              <p className="text-xs">Hãy thử đổi từ khóa tìm kiếm hoặc bỏ chọn các bộ lọc nhé!</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: FLASHCARD MODE (LẬT THẺ 3D) */}
      {/* ========================================================================= */}
      {viewMode === 'flashcard' && filteredWords.length > 0 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="w-full max-w-lg space-y-4">
            {/* Header controls for carousel */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <span>
                  Thẻ {flashcardIndex + 1} / {filteredWords.length}
                </span>
                <button
                  onClick={() => setIsAutoPlaying(prev => !prev)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                    isAutoPlaying
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoPlaying ? 'Tạm dừng chiếu' : 'Tự động chạy'}</span>
                </button>
              </div>

              <span>Bấm vào thẻ để lật mặt trước / sau 🔄</span>
            </div>

            {/* Flashcard container */}
            {(() => {
              const card = filteredWords[flashcardIndex];
              const isFlipped = !!flippedCards[card.id];
              const isLearned = !!learnedWords[card.id];

              return (
                <div
                  onClick={() => handleToggleFlip(card.id)}
                  className="w-full min-h-[360px] rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30 p-8 shadow-md cursor-pointer flex flex-col justify-between transition-all select-none hover:border-indigo-400 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">
                      Tập {card.volume} · P.{card.page} SGK
                    </span>
                    <button
                      onClick={e => handleToggleLearned(card.id, e)}
                      className={`p-1.5 rounded-xl transition ${
                        isLearned
                          ? 'bg-emerald-500 text-white shadow'
                          : 'bg-white border border-slate-200 text-slate-400'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  {!isFlipped ? (
                    // Front: English
                    <div className="my-auto text-center space-y-3">
                      <div className="text-6xl filter drop-shadow-sm">{card.icon}</div>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        {card.word}
                      </h3>
                      <p className="text-lg font-mono font-bold text-indigo-600">
                        {card.phonetic}
                      </p>
                      <div className="text-xs text-slate-500 font-semibold bg-indigo-50 px-3 py-1 rounded-full inline-block">
                        {card.categoryLabelVi}
                      </div>

                      <div className="pt-3 flex items-center justify-center gap-2">
                        <button
                          onClick={e => handleSpeak(card.word, e)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition"
                        >
                          <Volume2 className="w-4 h-4" /> Phát âm chuẩn
                        </button>
                        <button
                          onClick={e => handleSpeak(card.word, e, true)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold inline-flex items-center gap-1 transition"
                        >
                          🐢 Đọc chậm
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Back: Vietnamese & Example
                    <div className="my-auto text-center space-y-4">
                      <div className="text-3xl text-indigo-600">💡</div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Nghĩa tiếng Việt
                        </span>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">
                          {card.meaningVi}
                        </h3>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-left space-y-1">
                        <p className="font-bold text-indigo-950 flex items-center justify-between">
                          <span>&quot;{card.exampleEn}&quot;</span>
                          <button
                            onClick={e => handleSpeak(card.exampleEn, e)}
                            className="p-1 rounded bg-indigo-200 text-indigo-900 hover:bg-indigo-300"
                            title="Nghe câu ví dụ"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </p>
                        <p className="text-slate-600 italic">{card.exampleVi}</p>
                      </div>

                      {card.memoryTip && (
                        <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium text-left">
                          ✨ <strong>Mẹo ghi nhớ siêu trí nhớ:</strong> {card.memoryTip}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Footer hint */}
                  <div className="text-center text-xs text-slate-400 font-medium pt-4 border-t border-slate-100">
                    {isFlipped ? 'Bấm để quay lại mặt tiếng Anh' : 'Bấm để lật xem nghĩa & câu ví dụ'}
                  </div>
                </div>
              );
            })()}

            {/* Carousel navigation controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setFlashcardIndex(prev =>
                    prev > 0 ? prev - 1 : filteredWords.length - 1
                  );
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                ⬅️ Thẻ trước
              </button>

              <button
                onClick={() => {
                  const card = filteredWords[flashcardIndex];
                  handleSpeak(card.word);
                }}
                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" /> Đọc từ này
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setFlashcardIndex(prev =>
                    prev + 1 < filteredWords.length ? prev + 1 : 0
                  );
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow"
              >
                Thẻ tiếp theo ➡️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 3: QUIZ MODE (ĐỐ VUI 10 CÂU TỪ VỰNG) */}
      {/* ========================================================================= */}
      {viewMode === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto">
          {!quizCompleted ? (
            <div className="space-y-6">
              {/* Quiz progress */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
                  Câu hỏi {quizIndex + 1} / {quizPool.length}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  Điểm: <strong className="text-amber-500 font-black">{quizScore}</strong> điểm ⭐
                </span>
              </div>

              {/* Question Card */}
              <div className="text-center space-y-3 py-4">
                <div className="text-5xl filter drop-shadow-sm">{currentQuizItem?.icon}</div>

                {quizQuestionType === 0 && (
                  <>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Từ tiếng Anh tương ứng với nghĩa tiếng Việt:
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      &quot;{currentQuizItem?.meaningVi}&quot;
                    </h3>
                  </>
                )}

                {quizQuestionType === 1 && (
                  <>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Nghĩa tiếng Việt của từ tiếng Anh dưới đây:
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-indigo-700">
                      {currentQuizItem?.word}
                    </h3>
                    <p className="text-sm font-mono text-slate-500">{currentQuizItem?.phonetic}</p>
                  </>
                )}

                {quizQuestionType === 2 && (
                  <>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Hình ảnh minh họa cho từ vựng nào?
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {currentQuizItem?.meaningVi}
                    </h3>
                  </>
                )}

                <button
                  onClick={() => currentQuizItem && handleSpeak(currentQuizItem.word)}
                  className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm gợi ý
                </button>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map(opt => {
                  const isSelected = selectedQuizOption === opt.id;
                  const isRight = opt.id === currentQuizItem?.id;

                  let style = 'border-slate-200 bg-white hover:border-indigo-400 text-slate-800';
                  if (selectedQuizOption) {
                    if (isRight) {
                      style = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black shadow-sm';
                    } else if (isSelected && !isRight) {
                      style = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectQuiz(opt)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${style}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base font-extrabold truncate">
                          {quizQuestionType === 1 ? opt.meaningVi : opt.word}
                        </span>
                        <span className="text-lg">{opt.icon}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 block mt-0.5">
                        {opt.phonetic}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              {selectedQuizOption && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between animate-fadeIn">
                  <div className="text-xs">
                    {selectedQuizOption === currentQuizItem?.id ? (
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác! (+2 sao ⭐️)
                      </span>
                    ) : (
                      <span className="font-bold text-rose-600">
                        Chưa chính xác! Đáp án đúng là: <strong>{currentQuizItem?.word}</strong> ({currentQuizItem?.meaningVi})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-1.5"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Quiz Finish Screen
            <div className="text-center space-y-4 py-8">
              <Award className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-slate-900">
                HOÀN THÀNH THỬ THÁCH ĐỐ VUI! 🏆
              </h3>
              <p className="text-slate-600 text-sm">
                Em đã trả lời đúng{' '}
                <strong className="text-indigo-600 font-black text-lg">
                  {quizScore} / {quizPool.length}
                </strong>{' '}
                câu hỏi từ vựng SGK!
              </p>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:brightness-105 transition flex items-center gap-2 mx-auto text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Thử sức lại với bộ câu hỏi mới
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 4: MEMORY MATCH PAIRS GAME (GHÉP CẶP TRÍ NHỚ) */}
      {/* ========================================================================= */}
      {viewMode === 'match' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>Trò Chơi Ghép Cặp Từ Vựng</span>
                <span>🧩</span>
              </h3>
              <p className="text-xs text-slate-500">
                Lật thẻ tìm cặp Từ tiếng Anh & Nghĩa tiếng Việt tương ứng!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
                ⏱️ {matchTimer}s
              </span>
              <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl">
                Lượt lật: {matchFlipsCount}
              </span>
              <button
                onClick={initMatchGame}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Chơi lại</span>
              </button>
            </div>
          </div>

          {!matchGameWon ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {matchCards.map(card => {
                const isSelected =
                  selectedMatchFirst?.cardId === card.cardId ||
                  selectedMatchSecond?.cardId === card.cardId;

                return (
                  <div
                    key={card.cardId}
                    onClick={() => handleCardClick(card)}
                    className={`min-h-[110px] rounded-2xl p-3 border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none ${
                      card.isMatched
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-60 scale-95'
                        : card.isFlipped || isSelected
                        ? 'bg-purple-50 border-purple-500 shadow-md scale-100'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white hover:brightness-105'
                    }`}
                  >
                    {card.isFlipped || card.isMatched || isSelected ? (
                      <div className="space-y-1">
                        {card.icon && <div className="text-2xl">{card.icon}</div>}
                        <p
                          className={`font-black ${
                            card.type === 'en'
                              ? 'text-sm text-indigo-950'
                              : 'text-xs text-purple-950'
                          }`}
                        >
                          {card.text}
                        </p>
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">
                          {card.type === 'en' ? 'English' : 'Tiếng Việt'}
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl opacity-70">❓</div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Match Won Screen
            <div className="text-center space-y-4 py-8">
              <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-slate-900">
                CHÚC MỪNG EM ĐÃ THẮNG TRÒ CHƠI! 🎉
              </h3>
              <p className="text-slate-600 text-sm">
                Em đã ghép đúng 6 cặp từ vựng trong{' '}
                <strong className="text-indigo-600 font-black">{matchTimer} giây</strong> với{' '}
                <strong className="text-purple-600 font-black">{matchFlipsCount} lượt lật</strong>! (+5 ⭐)
              </p>
              <button
                onClick={initMatchGame}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:brightness-105 transition flex items-center gap-2 mx-auto text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Chơi ván mới
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 5: DICTATION / LISTEN & WRITE MODE (NGHE & VIẾT LẠI) */}
      {/* ========================================================================= */}
      {viewMode === 'dictation' && currentDictationWord && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 max-w-2xl mx-auto space-y-6">
          {!dictationCompleted ? (
            <div className="space-y-6">
              {/* Header: Progress & Target Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Câu {dictationIndex + 1} / {dictationPool.length}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    Điểm: <strong className="text-amber-500 font-black">{dictationScore}</strong> ⭐
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDictationTarget('word');
                      handleResetCurrentDictation();
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
                      handleResetCurrentDictation();
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
                  {currentDictationWord.icon}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Nghĩa Tiếng Việt Gợi Ý:
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                    {dictationTarget === 'word'
                      ? currentDictationWord.meaningVi
                      : currentDictationWord.exampleVi}
                  </h3>
                </div>

                {/* Big Audio Buttons */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleSpeak(targetDictationText, undefined, false)}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-md transition"
                  >
                    <Volume2 className="w-5 h-5 animate-bounce" />
                    <span>🔊 Bấm Nghe Phát Âm Chuẩn</span>
                  </button>

                  <button
                    onClick={() => handleSpeak(targetDictationText, undefined, true)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 transition"
                  >
                    <span>🐢 Nghe Chậm Từng Âm</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowDictationHint(prev => !prev);
                    }}
                    className="px-3.5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-2xl text-xs font-bold inline-flex items-center gap-1 border border-amber-200 transition"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{showDictationHint ? 'Ẩn gợi ý' : 'Gợi ý chữ cái đầu'}</span>
                  </button>
                </div>

                {showDictationHint && (
                  <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium inline-block animate-fadeIn">
                    💡 Chữ cái bắt đầu: <strong>&quot;{targetDictationText.slice(0, 2)}...&quot;</strong> · Độ dài: <strong>{targetDictationText.length}</strong> ký tự
                  </div>
                )}
              </div>

              {/* Input Method Switcher */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-indigo-600" />
                  Chọn cách làm bài:
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDictationInputMethod('tiles');
                    }}
                    className={`px-2.5 py-1 rounded-md transition ${
                      dictationInputMethod === 'tiles' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600'
                    }`}
                  >
                    🧩 Xếp Gạch Chữ Cái / Từ
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDictationInputMethod('typing');
                    }}
                    className={`px-2.5 py-1 rounded-md transition ${
                      dictationInputMethod === 'typing' ? 'bg-white text-indigo-700 shadow-xs font-black' : 'text-slate-600'
                    }`}
                  >
                    ⌨️ Gõ Bàn Phím
                  </button>
                </div>
              </div>

              {/* Method 1: Tiles Scramble */}
              {dictationInputMethod === 'tiles' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 min-h-[70px] flex flex-wrap items-center justify-center gap-1.5">
                    {selectedDictationTiles.length === 0 ? (
                      <span className="text-xs text-indigo-400 font-medium italic">
                        Chạm vào các ô chữ cái / từ bên dưới để ghép vào đây...
                      </span>
                    ) : (
                      selectedDictationTiles.map((tileIdx, idx) => {
                        const tile = scrambledDictationTiles[tileIdx];
                        return (
                          <button
                            key={idx}
                            onClick={() => handleRemoveDictationTile(idx)}
                            className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-xs hover:bg-rose-500 transition animate-scaleIn"
                            title="Bấm để bỏ chữ này ra"
                          >
                            {tile?.text}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                      Kho chữ cái xáo trộn:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {scrambledDictationTiles.map((tile, idx) => {
                        const isUsed = selectedDictationTiles.includes(idx);
                        return (
                          <button
                            key={idx}
                            disabled={isUsed || isDictationChecked}
                            onClick={() => handleSelectDictationTile(idx)}
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

              {/* Method 2: Typing */}
              {dictationInputMethod === 'typing' && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isDictationChecked}
                      value={typedDictation}
                      onChange={e => setTypedDictation(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && typedDictation.trim() && !isDictationChecked) {
                          handleCheckDictationAnswer();
                        }
                      }}
                      placeholder={`Gõ lại ${dictationTarget === 'word' ? 'từ vựng' : 'câu'} mà em vừa nghe được...`}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-200 text-base font-bold text-slate-800 focus:outline-none focus:border-indigo-500 bg-slate-50/70"
                    />
                    {typedDictation && !isDictationChecked && (
                      <button
                        onClick={() => setTypedDictation('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Gợi ý độ dài: {targetDictationText.length} ký tự</span>
                    <span>Nhấn Enter hoặc nút bên dưới để nộp bài</span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleResetCurrentDictation}
                  disabled={isDictationChecked && isDictationCorrect}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại câu này</span>
                </button>

                {!isDictationChecked ? (
                  <button
                    onClick={handleCheckDictationAnswer}
                    disabled={assembledDictationText.trim().length === 0}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition shadow-md flex items-center gap-1.5 ${
                      assembledDictationText.trim().length > 0
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>Kiểm Tra Đáp Án</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextDictation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition shadow-md flex items-center gap-1.5 animate-bounce"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Feedback */}
              {isDictationChecked && (
                <div
                  className={`p-4 rounded-2xl border-2 transition-all animate-fadeIn ${
                    isDictationCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{isDictationCorrect ? '🎉' : '💡'}</div>
                    <div className="space-y-1 text-xs">
                      {isDictationCorrect ? (
                        <>
                          <h4 className="font-black text-sm text-emerald-900">
                            Chính xác tuyệt đối! (+{dictationTarget === 'word' ? '2' : '3'} ⭐)
                          </h4>
                          <p className="font-semibold text-emerald-800">
                            Em đã nghe và viết rất chuẩn từ/câu: <strong>&quot;{targetDictationText}&quot;</strong>
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="font-black text-sm text-rose-900">
                            Chưa chính xác! Đừng nản lòng nhé!
                          </h4>
                          <p className="text-slate-700">
                            Đáp án đúng là: <strong className="text-indigo-700 font-black text-sm">&quot;{targetDictationText}&quot;</strong>
                          </p>
                          <p className="text-slate-500 italic">
                            Em đã viết: &quot;{assembledDictationText}&quot;
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4 py-8">
              <Award className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-slate-900">
                XUẤT SẮC! HOÀN THÀNH BÀI NGHE VIẾT! 🏆
              </h3>
              <p className="text-slate-600 text-sm">
                Em đã trả lời đúng{' '}
                <strong className="text-indigo-600 font-black text-lg">
                  {dictationScore} / {dictationPool.length}
                </strong>{' '}
                câu trong bài luyện chính tả âm thanh SGK! (+5 ⭐)
              </p>
              <button
                onClick={handleRestartDictationStudio}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:brightness-105 transition flex items-center gap-2 mx-auto text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Luyện tập lại từ đầu
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="bg-gradient-to-r from-slate-100 to-indigo-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <span className="font-semibold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Mẹo nhỏ: Học 5 từ mỗi ngày và nghe phát âm lặp lại để tạo phản xạ tự nhiên!
        </span>

        <div className="flex items-center gap-2">
          {onSwitchToReview4 && (
            <button
              onClick={onSwitchToReview4}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 transition"
            >
              🏆 Review 4
            </button>
          )}
          {onSwitchToUnit20 && (
            <button
              onClick={onSwitchToUnit20}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 transition"
            >
              ⛺ Unit 20
            </button>
          )}
          {onSwitchToReview2 && (
            <button
              onClick={onSwitchToReview2}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 transition"
            >
              🏆 Review 2
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
