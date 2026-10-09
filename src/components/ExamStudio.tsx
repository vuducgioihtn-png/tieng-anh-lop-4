import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Clock,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Headphones,
  Flag,
  Share2,
  Bookmark,
  Shuffle,
  Star,
  Flame,
  Check,
  Play,
  Pause,
  AlertCircle,
  Eye,
  Sliders,
  Filter,
  CheckSquare
} from 'lucide-react';
import { EXAM_PAPERS, ExamPaper, ExamQuestion } from '../data/examData';
import { sound, speakWord, getActiveVoicePersona } from '../utils/audio';

interface ExamStudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit?: (unitId: string) => void;
}

type StudioViewMode = 'hub' | 'take_exam' | 'drill' | 'mistakes' | 'results';
type ExamPlayMode = 'timed' | 'practice'; // timed: real exam countdown, practice: instant feedback & hints

interface ExamAttemptResult {
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  answers: Record<string, string>;
}

export const ExamStudio: React.FC<ExamStudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit
}) => {
  // Main Navigation State
  const [viewMode, setViewMode] = useState<StudioViewMode>('hub');
  const [selectedExamId, setSelectedExamId] = useState<string>('midterm1-exam1');
  const [playMode, setPlayMode] = useState<ExamPlayMode>('practice');
  const [semesterFilter, setSemesterFilter] = useState<'all' | 'midterm_1' | 'term_1' | 'midterm_2' | 'term_2'>('all');

  // Exam Taking State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(40 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [examStartTime, setExamStartTime] = useState<number>(Date.now());
  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Reorder Interactive State for current question
  const [reorderSelectedWords, setReorderSelectedWords] = useState<string[]>([]);
  const [availableScrambledWords, setAvailableScrambledWords] = useState<string[]>([]);

  // Unscramble Letters Interactive State for current question
  const [unscrambleSelectedLetters, setUnscrambleSelectedLetters] = useState<string[]>([]);
  const [unscrambleAvailableLetters, setUnscrambleAvailableLetters] = useState<string[]>([]);

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingAudioRate, setPlayingAudioRate] = useState<number>(0.9);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Drill View State (by category)
  const [drillCategory, setDrillCategory] = useState<string>('all');
  const [drillIndex, setDrillIndex] = useState<number>(0);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillChecked, setDrillChecked] = useState<Record<string, boolean>>({});

  // History & Mistake Notebook State (Persisted in localStorage)
  const [examHistory, setExamHistory] = useState<ExamAttemptResult[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ta4_exam_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [savedMistakes, setSavedMistakes] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ta4_exam_mistakes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [lastFinishedResult, setLastFinishedResult] = useState<ExamAttemptResult | null>(null);

  // Current Active Exam Paper
  const currentExam = useMemo<ExamPaper>(() => {
    return EXAM_PAPERS.find(e => e.id === selectedExamId) || EXAM_PAPERS[0];
  }, [selectedExamId]);

  const filteredExamPapers = useMemo(() => {
    if (semesterFilter === 'all') return EXAM_PAPERS;
    return EXAM_PAPERS.filter(e => e.category === semesterFilter);
  }, [semesterFilter]);

  const currentQuestion = useMemo<ExamQuestion | undefined>(() => {
    return currentExam.questions[currentQuestionIndex];
  }, [currentExam, currentQuestionIndex]);

  // Sync Reorder Scrambled Words when question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'reorder') {
      const existingAnswer = userAnswers[currentQuestion.id];
      if (existingAnswer) {
        // Words already chosen
        const chosenWords = existingAnswer.replace(/[.?!]$/, '').trim().split(/\s+/).filter(Boolean);
        setReorderSelectedWords(chosenWords);
        // Scrambled remainders
        const initialScrambled = [...(currentQuestion.scrambledWords || [])];
        for (const w of chosenWords) {
          const idx = initialScrambled.findIndex(item => item.toLowerCase() === w.toLowerCase());
          if (idx !== -1) {
            initialScrambled.splice(idx, 1);
          }
        }
        setAvailableScrambledWords(initialScrambled);
      } else {
        setReorderSelectedWords([]);
        setAvailableScrambledWords([...(currentQuestion.scrambledWords || [])]);
      }
    }
  }, [currentQuestion, userAnswers]);

  // Sync Unscramble Letters when question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'unscramble_word' && currentQuestion.wordToUnscramble) {
      const existingAnswer = userAnswers[currentQuestion.id];
      const initialLetters = currentQuestion.wordToUnscramble.split('');
      if (existingAnswer) {
        const chosenLetters = existingAnswer.toUpperCase().split('');
        setUnscrambleSelectedLetters(chosenLetters);
        const remainders = [...initialLetters];
        for (const ch of chosenLetters) {
          const idx = remainders.findIndex(l => l.toUpperCase() === ch);
          if (idx !== -1) {
            remainders.splice(idx, 1);
          }
        }
        setUnscrambleAvailableLetters(remainders);
      } else {
        setUnscrambleSelectedLetters([]);
        setUnscrambleAvailableLetters(initialLetters);
      }
    }
  }, [currentQuestion, userAnswers]);

  // Timer Effect for Timed Mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (viewMode === 'take_exam' && playMode === 'timed' && isTimerRunning) {
      interval = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleFinalSubmitExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [viewMode, playMode, isTimerRunning]);

  // Save history and mistakes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ta4_exam_history', JSON.stringify(examHistory));
    }
  }, [examHistory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ta4_exam_mistakes', JSON.stringify(savedMistakes));
    }
  }, [savedMistakes]);

  // Start Exam Handler
  const handleStartExam = (examId: string, mode: ExamPlayMode) => {
    sound.playClick();
    setSelectedExamId(examId);
    setPlayMode(mode);
    const targetExam = EXAM_PAPERS.find(e => e.id === examId) || EXAM_PAPERS[0];
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCheckedQuestions({});
    setTimeRemainingSeconds(targetExam.durationMinutes * 60);
    setIsTimerRunning(mode === 'timed');
    setExamStartTime(Date.now());
    setViewMode('take_exam');
  };

  // Select Option for Current Question
  const handleSelectOption = (answerValue: string) => {
    if (!currentQuestion) return;
    sound.playClick();
    const qId = currentQuestion.id;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: answerValue
    }));
  };

  // Reorder Interactive Word Pick
  const handlePickReorderWord = (word: string, index: number) => {
    if (!currentQuestion) return;
    sound.playClick();
    const newSelected = [...reorderSelectedWords, word];
    const newAvailable = [...availableScrambledWords];
    newAvailable.splice(index, 1);

    setReorderSelectedWords(newSelected);
    setAvailableScrambledWords(newAvailable);

    // Build sentence
    let assembled = newSelected.join(' ');
    // Auto capitalize first letter
    if (assembled.length > 0) {
      assembled = assembled.charAt(0).toUpperCase() + assembled.slice(1);
    }
    // Add period or question mark based on prompt
    if (currentQuestion.correctAnswer.toString().endsWith('?')) {
      if (newAvailable.length === 0) assembled += '?';
    } else {
      if (newAvailable.length === 0) assembled += '.';
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: assembled
    }));
  };

  const handleRemoveReorderWord = (word: string, index: number) => {
    if (!currentQuestion) return;
    sound.playClick();
    const newSelected = [...reorderSelectedWords];
    newSelected.splice(index, 1);
    const newAvailable = [...availableScrambledWords, word];

    setReorderSelectedWords(newSelected);
    setAvailableScrambledWords(newAvailable);

    let assembled = newSelected.join(' ');
    if (assembled.length > 0) {
      assembled = assembled.charAt(0).toUpperCase() + assembled.slice(1);
    }
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: assembled
    }));
  };

  const handleResetReorder = () => {
    if (!currentQuestion) return;
    sound.playClick();
    setReorderSelectedWords([]);
    setAvailableScrambledWords([...(currentQuestion.scrambledWords || [])]);
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Unscramble Interactive Letter Pick
  const handlePickUnscrambleLetter = (letter: string, index: number) => {
    if (!currentQuestion) return;
    sound.playClick();
    const newSelected = [...unscrambleSelectedLetters, letter];
    const newAvailable = [...unscrambleAvailableLetters];
    newAvailable.splice(index, 1);

    setUnscrambleSelectedLetters(newSelected);
    setUnscrambleAvailableLetters(newAvailable);

    const assembled = newSelected.join('').toUpperCase();
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: assembled
    }));
  };

  const handleRemoveUnscrambleLetter = (letter: string, index: number) => {
    if (!currentQuestion) return;
    sound.playClick();
    const newSelected = [...unscrambleSelectedLetters];
    newSelected.splice(index, 1);
    const newAvailable = [...unscrambleAvailableLetters, letter];

    setUnscrambleSelectedLetters(newSelected);
    setUnscrambleAvailableLetters(newAvailable);

    const assembled = newSelected.join('').toUpperCase();
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: assembled
    }));
  };

  const handleResetUnscramble = () => {
    if (!currentQuestion || !currentQuestion.wordToUnscramble) return;
    sound.playClick();
    setUnscrambleSelectedLetters([]);
    setUnscrambleAvailableLetters(currentQuestion.wordToUnscramble.split(''));
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Check Answer in Practice Mode
  const handleCheckPracticeAnswer = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    const userAnswer = userAnswers[qId];
    if (!userAnswer) return;

    setCheckedQuestions(prev => ({ ...prev, [qId]: true }));

    // Compare answer
    const cleanUser = userAnswer.trim().toLowerCase().replace(/[.?!]/g, '');
    const cleanCorrect = currentQuestion.correctAnswer.toString().trim().toLowerCase().replace(/[.?!]/g, '');

    const isCorrect = cleanUser === cleanCorrect;
    if (isCorrect) {
      sound.playCorrect();
      onAddStar(2);
      // Remove from mistakes if previously there
      setSavedMistakes(prev => prev.filter(id => id !== qId));
    } else {
      sound.playWrong();
      // Add to mistakes notebook
      setSavedMistakes(prev => (prev.includes(qId) ? prev : [...prev, qId]));
    }
  };

  // Flag Question for Review
  const toggleFlagQuestion = (qId: string) => {
    sound.playClick();
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Submit Exam
  const handleFinalSubmitExam = (autoSubmit: boolean = false) => {
    setIsTimerRunning(false);
    setShowSubmitConfirmModal(false);

    let correctCount = 0;
    const newMistakes: string[] = [];

    currentExam.questions.forEach(q => {
      const userAns = userAnswers[q.id];
      if (userAns) {
        const cleanUser = userAns.trim().toLowerCase().replace(/[.?!]/g, '');
        const cleanCorrect = q.correctAnswer.toString().trim().toLowerCase().replace(/[.?!]/g, '');
        if (cleanUser === cleanCorrect) {
          correctCount++;
        } else {
          newMistakes.push(q.id);
        }
      } else {
        newMistakes.push(q.id);
      }
    });

    const wrongCount = currentExam.questions.length - correctCount;
    const score = Math.round((correctCount / currentExam.questions.length) * 100) / 10;
    const timeSpentSeconds = Math.round((Date.now() - examStartTime) / 1000);

    const result: ExamAttemptResult = {
      examId: currentExam.id,
      examTitle: currentExam.title,
      score,
      totalQuestions: currentExam.questions.length,
      correctCount,
      wrongCount,
      timeSpentSeconds,
      completedAt: new Date().toLocaleString('vi-VN'),
      answers: { ...userAnswers }
    };

    setLastFinishedResult(result);
    setExamHistory(prev => [result, ...prev]);

    // Update mistake notebook
    setSavedMistakes(prev => {
      const combined = new Set([...prev, ...newMistakes]);
      return Array.from(combined);
    });

    // Sound and celebration
    if (score >= 8) {
      sound.playVictory();
      onAddStar(10);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else if (score >= 5) {
      sound.playCorrect();
      onAddStar(5);
    } else {
      sound.playWrong();
    }

    setViewMode('results');
  };

  // Audio Playback
  const handlePlayAudio = async (text: string, rate: number = 0.88) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    setPlayingAudioRate(rate);
    try {
      await speakWord(text, rate);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  // Format Seconds to MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Drill Questions Filtered
  const allQuestionsAcrossExams = useMemo(() => {
    const list: (ExamQuestion & { examTitle: string })[] = [];
    EXAM_PAPERS.forEach(ep => {
      ep.questions.forEach(q => {
        list.push({ ...q, examTitle: ep.title });
      });
    });
    return list;
  }, []);

  const drillQuestions = useMemo(() => {
    if (drillCategory === 'all') return allQuestionsAcrossExams;
    return allQuestionsAcrossExams.filter(q => q.type === drillCategory);
  }, [allQuestionsAcrossExams, drillCategory]);

  const currentDrillQuestion = drillQuestions[drillIndex];

  // Mistakes Questions List
  const mistakeQuestionsList = useMemo(() => {
    return allQuestionsAcrossExams.filter(q => savedMistakes.includes(q.id));
  }, [allQuestionsAcrossExams, savedMistakes]);

  // High score lookup for hub cards
  const getHighScoreForExam = (examId: string) => {
    const attempts = examHistory.filter(h => h.examId === examId);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map(a => a.score));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* ======================================================== */}
      {/* 1. TOP HEADER & NAVIGATION RIBBON */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                if (viewMode === 'take_exam') {
                  setShowExitConfirmModal(true);
                } else {
                  setViewMode('hub');
                }
              }}
              className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-600 hover:text-slate-900"
              title="Quay về danh sách đề thi"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <h1 className="text-base sm:text-lg font-black text-slate-900">
                  {viewMode === 'take_exam'
                    ? currentExam.title
                    : viewMode === 'drill'
                    ? '🎯 Ôn Luyện Theo Dạng Bài'
                    : viewMode === 'mistakes'
                    ? '❌ Sổ Tay Câu Sai & Ghi Nhớ'
                    : viewMode === 'results'
                    ? '🏆 Bảng Điểm & Lời Giải Chi Tiết'
                    : 'Bộ Đề Thi Tiếng Anh Lớp 4 Chuẩn SGK'}
                </h1>
                {viewMode === 'take_exam' && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      playMode === 'timed'
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {playMode === 'timed' ? '⏱️ Tính giờ' : '💡 Luyện tập'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Học kì 1 &amp; Học kì 2 · {EXAM_PAPERS.length} bộ đề thi chuẩn Bộ GD &amp; ĐT · Nghe chuẩn Audio · Giải thích sâu sắc dễ nhớ
              </p>
            </div>
          </div>

          {/* Quick Sub-navigation tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => {
                sound.playClick();
                if (viewMode === 'take_exam') {
                  setShowExitConfirmModal(true);
                } else {
                  setViewMode('hub');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'hub'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>📋</span>
              <span className="hidden sm:inline">Danh Sách</span> Đề Thi
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (viewMode === 'take_exam') {
                  setShowExitConfirmModal(true);
                } else {
                  setViewMode('drill');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'drill'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>🎯</span>
              <span>Luyện Dạng Bài</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (viewMode === 'take_exam') {
                  setShowExitConfirmModal(true);
                } else {
                  setViewMode('mistakes');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 relative ${
                viewMode === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>❌</span>
              <span>Sổ Câu Sai</span>
              {savedMistakes.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {savedMistakes.length}
                </span>
              )}
            </button>

            {examHistory.length > 0 && (
              <button
                onClick={() => {
                  sound.playClick();
                  if (lastFinishedResult) {
                    setViewMode('results');
                  } else {
                    setViewMode('hub');
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'results'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>🏆</span>
                <span>Bảng Điểm</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. VIEW 1: EXAM HUB (DANH SÁCH 4 ĐỀ THI) */}
      {/* ======================================================== */}
      {viewMode === 'hub' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl mb-8">
            <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-300 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kho Đề Thi Chuẩn Bộ Giáo Dục & Đào Tạo</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
                Chinh Phục Điểm 10 Tiếng Anh Lớp 4
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 font-medium mb-6 leading-relaxed">
                Hệ thống {EXAM_PAPERS.length} bộ đề thi Giữa Kì & Cuối Kì chính thức tuyển chọn cho cả 2 Học kì với đầy đủ dạng bài chuẩn Bộ Giáo Dục: Luyện nghe Audio giọng Anh - Anh, phát âm, từ khác loại, đoán từ qua tranh, đọc hiểu và sắp xếp câu kèm giải thích chi tiết dễ hiểu, siêu nhớ lâu!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black">{EXAM_PAPERS.length} Đề Thi</div>
                  <div className="text-[11px] text-indigo-200">Giữa Kì & Cuối Kì 1, 2</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black">{allQuestionsAcrossExams.length}+ Câu Hỏi</div>
                  <div className="text-[11px] text-indigo-200">Kèm giải thích & gợi ý</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black">🎧 100% Audio</div>
                  <div className="text-[11px] text-indigo-200">Giọng đọc chuẩn bản ngữ</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black">⏱️ 2 Chế Độ</div>
                  <div className="text-[11px] text-indigo-200">Tính giờ hoặc Thong thả</div>
                </div>
              </div>
            </div>
          </div>

          {/* List of Exam Cards with Semester Filter */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>📚</span>
                  <span>Kho Đề Thi Tiếng Anh Lớp 4 Chuẩn SGK</span>
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Chọn đề để bắt đầu thử sức và ghi nhớ kiến thức
                </span>
              </div>

              {/* Semester Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {[
                  { id: 'all', label: 'Tất Cả', icon: '🌟', count: EXAM_PAPERS.length },
                  { id: 'midterm_1', label: 'Giữa Kì 1', icon: '🍂', count: EXAM_PAPERS.filter(e => e.category === 'midterm_1').length },
                  { id: 'term_1', label: 'Cuối Kì 1', icon: '❄️', count: EXAM_PAPERS.filter(e => e.category === 'term_1').length },
                  { id: 'midterm_2', label: 'Giữa Kì 2', icon: '🌸', count: EXAM_PAPERS.filter(e => e.category === 'midterm_2').length },
                  { id: 'term_2', label: 'Cuối Kì 2', icon: '☀️', count: EXAM_PAPERS.filter(e => e.category === 'term_2').length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playClick();
                      setSemesterFilter(tab.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                      semesterFilter === tab.id
                        ? 'bg-white text-indigo-700 shadow-xs font-black'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-70">({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExamPapers.map((exam, idx) => {
                const highScore = getHighScoreForExam(exam.id);
                const attemptCount = examHistory.filter(h => h.examId === exam.id).length;

                return (
                  <div
                    key={exam.id}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
                  >
                    {/* Top gradient badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exam.themeColor} text-white flex items-center justify-center text-2xl shadow-sm`}
                        >
                          {exam.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                              Đề Số {idx + 1} · {exam.academicYear}
                            </span>
                            {(exam.id.startsWith('midterm1-exam') || exam.id.startsWith('term1-exam')) && !exam.id.includes('legacy') && (
                              <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-2 py-0.5 rounded-full shadow-2xs">
                                ⭐ Chuẩn Loigiaihay.com
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-black text-slate-900 leading-snug">
                            {exam.title}
                          </h4>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            {exam.subTitle}
                          </div>
                        </div>
                      </div>

                      {highScore !== null && (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black">
                            <Trophy className="w-3.5 h-3.5 text-amber-500" />
                            <span>{highScore} đ</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta info pills */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Thời Gian</span>
                        <span className="font-black text-slate-800 flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {exam.durationMinutes} phút
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Số Câu Hỏi</span>
                        <span className="font-black text-slate-800 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                          {exam.totalQuestions} câu
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Đã Thi</span>
                        <span className="font-black text-slate-800">
                          {attemptCount > 0 ? `${attemptCount} lần` : 'Chưa thi'}
                        </span>
                      </div>
                    </div>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 flex items-center gap-1">
                        <span>🎧</span> 100% Audio Nghe
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 flex items-center gap-1">
                        <span>🖼️</span> Tranh Vẽ & Lịch
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-100 flex items-center gap-1">
                        <span>💡</span> Lời Giải Chi Tiết
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => handleStartExam(exam.id, 'practice')}
                        className="w-full py-2.5 px-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black transition flex items-center justify-center gap-1.5 border border-indigo-200 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ôn Thong Thả (Có giải thích)</span>
                      </button>

                      <button
                        onClick={() => handleStartExam(exam.id, 'timed')}
                        className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Thi Tính Giờ (Phòng thi)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Drill & Mistakes Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => {
                sound.playClick();
                setViewMode('drill');
              }}
              className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-md cursor-pointer hover:shadow-lg transition flex items-center justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold mb-2">
                  Chuyên Đề
                </span>
                <h4 className="text-xl font-black mb-1">🎯 Luyện Từng Dạng Bài</h4>
                <p className="text-xs text-amber-100 max-w-sm">
                  Tập trung cày sâu dạng Nghe, Phát âm, Từ khác loại hoặc Sắp xếp câu để tăng tốc điểm số!
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-white/80" />
            </div>

            <div
              onClick={() => {
                sound.playClick();
                setViewMode('mistakes');
              }}
              className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-6 shadow-md cursor-pointer hover:shadow-lg transition flex items-center justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold mb-2">
                  Khắc Phục Lỗi
                </span>
                <h4 className="text-xl font-black mb-1">❌ Sổ Tay Câu Hay Sai</h4>
                <p className="text-xs text-rose-100 max-w-sm">
                  {savedMistakes.length > 0
                    ? `Hiện có ${savedMistakes.length} câu cần ôn lại. Làm lại đến khi nhuần nhuyễn 100%!`
                    : 'Tuyệt vời! Bạn chưa có câu nào bị sai. Hãy bắt đầu làm thử một đề nhé!'}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-white/80" />
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* 3. VIEW 2: TAKE EXAM (PHÒNG THI & ÔN LUYỆN) */}
      {/* ======================================================== */}
      {viewMode === 'take_exam' && currentQuestion && (
        <main className="max-w-5xl mx-auto px-4 py-6">
          {/* Status Bar: Question Progress, Timer, Flags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                Câu {currentQuestionIndex + 1} / {currentExam.questions.length}
              </span>
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                {currentQuestion.exerciseTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Timer for timed mode */}
              {playMode === 'timed' && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition ${
                    timeRemainingSeconds < 300
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(timeRemainingSeconds)}</span>
                </div>
              )}

              {/* Flag button */}
              <button
                onClick={() => toggleFlagQuestion(currentQuestion.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  flaggedQuestions[currentQuestion.id]
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Đánh dấu câu hỏi cần xem lại"
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Đánh dấu</span>
              </button>

              {/* Submit exam button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowSubmitConfirmModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-xs flex items-center gap-1"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Nộp Bài</span>
              </button>
            </div>
          </div>

          {/* Quick Question Matrix Navigation Strip */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs mb-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 min-w-max">
              {currentExam.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];
                const isChecked = !!checkedQuestions[q.id];

                let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isAnswered) {
                  bgClass = 'bg-indigo-100 text-indigo-700 font-bold';
                }
                if (isFlagged) {
                  bgClass = 'bg-amber-100 text-amber-800 font-bold ring-1 ring-amber-400';
                }
                if (isCurrent) {
                  bgClass = 'bg-indigo-600 text-white font-black shadow-sm ring-2 ring-indigo-300';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentQuestionIndex(idx);
                    }}
                    className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all ${bgClass}`}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
            {/* Section Tag */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-block px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                {currentQuestion.exerciseTitle}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Dạng: {currentQuestion.type}
              </span>
            </div>

            {/* Reading Passage Box if present */}
            {currentQuestion.readingPassage && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Đoạn văn đọc hiểu (Reading Passage):</span>
                  </span>
                  <button
                    onClick={() => handlePlayAudio(currentQuestion.readingPassage!, 0.85)}
                    className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe đọc cả bài</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                  {currentQuestion.readingPassage}
                </p>
              </div>
            )}

            {/* Enhanced Audio Listening Console if listening type */}
            {currentQuestion.audioText && (
              <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50/70 border-2 border-indigo-200/90 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xs transition-colors ${
                        isPlayingAudio ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600'
                      }`}
                    >
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                          Bài Nghe Audio (Listening)
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                          🎙️ Giọng {getActiveVoicePersona().name.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {isPlayingAudio ? '🔊 Đang phát âm thanh mẫu chuẩn...' : 'Bấm nghe thật kỹ để tìm đáp án chính xác'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handlePlayAudio(currentQuestion.audioText!, 0.88)}
                      disabled={isPlayingAudio}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe chuẩn</span>
                    </button>

                    <button
                      onClick={() => handlePlayAudio(currentQuestion.audioText!, 0.7)}
                      disabled={isPlayingAudio}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1 border border-indigo-200 shadow-2xs"
                      title="Nghe tốc độ chậm"
                    >
                      <span>🐢</span>
                      <span>Nghe chậm (0.7x)</span>
                    </button>

                    {currentQuestion.audioTranscript && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          setShowTranscript(!showTranscript);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 border shadow-2xs ${
                          showTranscript
                            ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-200'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                        title="Xem hoặc ẩn lời thoại bài nghe"
                      >
                        <span>📄</span>
                        <span>{showTranscript ? 'Ẩn lời thoại' : 'Lời thoại & Dịch'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated sound wave equalizer when playing */}
                {isPlayingAudio && (
                  <div className="flex items-center gap-1.5 justify-center py-2.5 bg-white/60 rounded-xl my-2">
                    <span className="text-[11px] font-bold text-indigo-700 mr-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                      Đang đọc giọng bản ngữ:
                    </span>
                    <div className="flex items-end gap-1 h-5">
                      {[35, 80, 100, 50, 90, 40, 75, 60, 95, 30].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1 bg-indigo-600 rounded-full animate-pulse inline-block"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable Transcript & Vietnamese Translation */}
                {showTranscript && currentQuestion.audioTranscript && (
                  <div className="mt-3 p-3.5 bg-white rounded-2xl border border-indigo-100 text-xs text-slate-700 space-y-1.5 animate-in fade-in shadow-2xs">
                    <div className="font-black text-indigo-900 flex items-center gap-1.5 text-xs">
                      <span>📝</span>
                      <span>Lời thoại bài nghe & Tạm dịch tiếng Việt:</span>
                    </div>
                    <p className="leading-relaxed font-serif text-slate-800 bg-slate-50/90 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm">
                      {currentQuestion.audioTranscript}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Question Prompt */}
            <div className="mb-6">
              {/* Visual Cards Display (Calendar Flip Cards & Picture Cards) */}
              {currentQuestion.visualCards && currentQuestion.visualCards.length > 0 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-slate-50/90 border border-slate-200/90 shadow-2xs">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>🖼️</span>
                      <span>Hình ảnh trực quan (Bấm trực tiếp vào thẻ để chọn):</span>
                    </span>
                    <span className="text-[11px] text-indigo-600 font-extrabold hidden sm:inline">
                      {currentQuestion.visualCards[0].cardType === 'calendar' ? '📅 Thẻ Lịch Ngày Tháng' : '🎨 Thẻ Tranh & Quốc Kỳ'}
                    </span>
                  </div>

                  {/* Visual Cards Adaptive Grid */}
                  {currentQuestion.visualCards.every(c => c.cardType === 'calendar') ? (
                    // 100% CALENDAR FLIP CARDS GRID (JAN 15, APR 02, JUL 26, MAR 6)
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {currentQuestion.visualCards.map((c) => {
                        const optionMatches = currentQuestion.options?.find(o => {
                          const norm = o.trim();
                          return (
                            norm.startsWith(c.label + '.') ||
                            norm.startsWith(c.label + ' ') ||
                            norm.startsWith('Hình ' + c.label) ||
                            norm.startsWith('Tranh ' + c.label) ||
                            norm.includes(`(${c.label})`) ||
                            norm.includes(`Hình ${c.label}`) ||
                            norm.includes(`Tranh ${c.label}`) ||
                            (c.dayNumber && norm.includes(c.dayNumber))
                          );
                        });
                        const isSelected = optionMatches && userAnswers[currentQuestion.id] === optionMatches;
                        const isChecked = checkedQuestions[currentQuestion.id];
                        const isCorrect = optionMatches && optionMatches.trim().toLowerCase() === currentQuestion.correctAnswer.toString().trim().toLowerCase();

                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              if (optionMatches) handleSelectOption(optionMatches);
                            }}
                            className={`group relative text-center rounded-2xl overflow-hidden transition-all duration-200 border-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1 ${
                              isChecked
                                ? isCorrect
                                  ? 'border-emerald-500 ring-4 ring-emerald-200 bg-white'
                                  : isSelected
                                  ? 'border-rose-400 ring-4 ring-rose-200 bg-white'
                                  : 'border-slate-200 bg-white opacity-70'
                                : isSelected
                                ? 'border-indigo-600 ring-4 ring-indigo-200 bg-white scale-102'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            {/* Ring binders simulation at top */}
                            <div className="bg-slate-800 h-3 flex justify-around px-3 items-center">
                              {[1, 2, 3, 4, 5].map(ring => (
                                <span key={ring} className="w-1.5 h-2 bg-slate-400 rounded-full -mt-1 block ring-1 ring-slate-900" />
                              ))}
                            </div>

                            {/* Red Month Header Ribbon */}
                            <div className={`py-1.5 px-2 bg-gradient-to-r ${c.bgGradient || 'from-rose-500 to-red-600'} text-white font-black text-xs uppercase tracking-wider`}>
                              {c.monthName || 'MONTH'}
                            </div>

                            {/* Calendar Day Face */}
                            <div className="py-4 px-2 bg-white relative">
                              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                {c.dayNumber || c.title}
                              </div>
                              {isChecked && isCorrect && (
                                <span className="absolute top-1 right-2 text-emerald-600 font-black text-sm">✓</span>
                              )}
                            </div>

                            {/* Label Pill (Hình A, Hình B, Hình C, Hình D) */}
                            <div className={`py-1 text-xs font-black border-t transition-colors ${
                              isChecked && isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-700'
                            }`}>
                              {c.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // MIXED / PICTURE & FLAG CARDS GRID (A - F)
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                      {currentQuestion.visualCards.map((c) => {
                        const optionMatches = currentQuestion.options?.find(o => {
                          const norm = o.trim();
                          return (
                            norm.startsWith(c.label + '.') ||
                            norm.startsWith(c.label + ' ') ||
                            norm.startsWith('Hình ' + c.label) ||
                            norm.startsWith('Tranh ' + c.label) ||
                            norm.includes(`(${c.label})`) ||
                            norm.includes(`Hình ${c.label}`) ||
                            norm.includes(`Tranh ${c.label}`) ||
                            (c.title && norm.toLowerCase().includes(c.title.toLowerCase()))
                          );
                        });
                        const isSelected = optionMatches && userAnswers[currentQuestion.id] === optionMatches;
                        const isChecked = checkedQuestions[currentQuestion.id];
                        const isCorrect = optionMatches && optionMatches.trim().toLowerCase() === currentQuestion.correctAnswer.toString().trim().toLowerCase();

                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              if (optionMatches) handleSelectOption(optionMatches);
                            }}
                            className={`p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5 relative overflow-hidden flex flex-col justify-between ${
                              isChecked
                                ? isCorrect
                                  ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-300'
                                  : isSelected
                                  ? 'border-rose-400 bg-rose-50/80 ring-2 ring-rose-200'
                                  : 'border-slate-200 bg-white opacity-70'
                                : isSelected
                                ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200 shadow-xs'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`w-5 h-5 rounded-md font-black text-xs inline-flex items-center justify-center shadow-2xs ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {c.label}
                              </span>
                              {isChecked && isCorrect && (
                                <span className="bg-emerald-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">✓</span>
                              )}
                            </div>

                            {/* Render based on cardType */}
                            {c.cardType === 'calendar' ? (
                              <div className="my-1 border rounded-xl overflow-hidden shadow-2xs bg-white">
                                <div className="bg-rose-500 text-white text-[9px] font-black uppercase py-0.5 px-1">
                                  {c.monthName || 'MONTH'}
                                </div>
                                <div className="text-xl font-black text-slate-900 py-1">
                                  {c.dayNumber || c.title}
                                </div>
                              </div>
                            ) : (
                              <div className="my-1.5 flex flex-col items-center">
                                <div className="text-3xl mb-1 drop-shadow-xs">{c.emoji || '🖼️'}</div>
                                <div className="text-[11px] font-black text-slate-800 line-clamp-2 leading-tight">
                                  {c.title}
                                </div>
                              </div>
                            )}

                            <span className="text-[10px] text-slate-400 font-bold block truncate mt-1">
                              {c.cardType === 'calendar' ? 'Tờ lịch' : c.cardType === 'flag' ? 'Quốc kỳ' : 'Tranh ảnh'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Look and complete letter puzzle strip */}
              {currentQuestion.letterBlanks && (
                <div className="mb-5 p-4 rounded-3xl bg-gradient-to-r from-amber-50 via-sky-50 to-indigo-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-3xl shrink-0">
                      {currentQuestion.imageEmoji || '🎨'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Nhìn tranh và điền chữ cái còn thiếu:
                      </div>
                      <div className="text-sm font-extrabold text-slate-800">
                        Nghĩa tiếng Việt: <span className="text-indigo-700 font-black">{currentQuestion.letterBlanks.meaning}</span>
                      </div>
                    </div>
                  </div>

                  {/* Letter tiles */}
                  <div className="flex items-center gap-1.5 self-center sm:self-auto bg-white/90 p-2 rounded-2xl border border-slate-200 shadow-xs">
                    {currentQuestion.letterBlanks.fullWord.split('').map((char, cIdx) => {
                      const isBlank = currentQuestion.letterBlanks!.blankLetters.includes(char);
                      return (
                        <div
                          key={cIdx}
                          className={`w-9 h-10 rounded-xl font-black text-base flex items-center justify-center uppercase transition-all shadow-2xs ${
                            isBlank
                              ? 'border-2 border-dashed border-amber-400 bg-amber-50 text-amber-900 animate-pulse'
                              : 'bg-indigo-600 text-white shadow-xs'
                          }`}
                        >
                          {checkedQuestions[currentQuestion.id] || userAnswers[currentQuestion.id] ? char : (isBlank ? '_' : char)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentQuestion.imageEmoji && !currentQuestion.letterBlanks && (
                <div className="mb-4 inline-flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 border border-amber-200 rounded-2xl shadow-xs">
                  <span className="text-3xl sm:text-4xl">{currentQuestion.imageEmoji}</span>
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">Hình ảnh gợi ý câu hỏi</span>
                    <span className="text-[11px] text-amber-700 font-medium">Quan sát kỹ bức tranh để chọn câu trả lời đúng</span>
                  </div>
                </div>
              )}

              {currentQuestion.type === 'unscramble_word' && currentQuestion.wordToUnscramble && (
                <div className="mb-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-900">Các chữ cái xáo trộn:</span>
                    <div className="flex items-center gap-1.5">
                      {currentQuestion.wordToUnscramble.split('').map((letter, lIdx) => (
                        <span
                          key={lIdx}
                          className="w-8 h-8 rounded-xl bg-white border border-indigo-300 shadow-xs font-black text-indigo-700 text-sm flex items-center justify-center uppercase"
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 font-medium">
                    👉 Hãy ghép thành từ tiếng Anh đúng có nghĩa
                  </span>
                </div>
              )}

              {/* Word Bank Box for Fill in Blanks */}
              {currentQuestion.wordBank && currentQuestion.wordBank.length > 0 && (
                <div className="mb-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span>📦</span>
                      <span>Ngân hàng từ vựng (Word Bank - Bấm trực tiếp để điền):</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
                      Chọn 1 từ thích hợp điền vào vị trí trống
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.wordBank.map((word, wbIdx) => {
                      const isChosen = userAnswers[currentQuestion.id]?.toLowerCase() === word.toLowerCase();
                      return (
                        <button
                          key={wbIdx}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            handleSelectOption(word);
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs ${
                            isChosen
                              ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300 font-black'
                              : 'bg-white hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          <span className={isChosen ? 'text-white' : 'text-emerald-500'}>✏️</span>
                          <span>{word}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONTEXTUAL EXAM BOARD 1: David & Susan Dialogue (Đề 1, Câu 5 - 9) */}
              {currentExam.id === 'midterm1-exam1' && currentQuestion.questionNumber >= 5 && currentQuestion.questionNumber <= 9 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-sky-50/50 to-white border-2 border-indigo-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100">
                    <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>💬</span>
                      <span>Hội thoại nghe gốc: David & Susan (Bài nghe II)</span>
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Đang làm vị trí ({currentQuestion.questionNumber - 4})
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">👦</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-blue-800">David:</span> What day is it, Susan?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">👧</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 5 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-pink-800">Susan:</span> It’s <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(1) ________</span>.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">👦</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-blue-800">David:</span> What do you do on Monday?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">👧</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 6 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-pink-800">Susan:</span> Well, I have <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(2) ________</span> classes in the morning.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">👦</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-blue-800">David:</span> How about the afternoon?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">👧</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 7 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-pink-800">Susan:</span> I <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(3) ________</span> with my sister, Sandra. She loves swimming.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">👦</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-blue-800">David:</span> What about Tuesday afternoon? Are you free?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">👧</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 8 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-pink-800">Susan:</span> No. I go to the <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(4) ________</span> every Tuesday afternoon. But I am free on Wednesday afternoon.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">👦</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-blue-800">David:</span> That is great. There is a <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(5) ________</span> match on Wednesday afternoon. Do you want to go with me?
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL EXAM BOARD 2: Miss Hien & Mai Classroom Dialogue (Đề 1, Câu 25 - 29) */}
              {currentExam.id === 'midterm1-exam1' && currentQuestion.questionNumber >= 25 && currentQuestion.questionNumber <= 29 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-2 border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/60">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🏫</span>
                      <span>Hội thoại trên lớp: Cô Hiền & Lớp 4A (Bài IV. Read and complete)</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Đang làm vị trí ({currentQuestion.questionNumber - 24})
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">👩‍🏫</span>
                      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 text-slate-800 shadow-2xs flex-1">
                        <span className="font-bold text-indigo-800">Miss Hien:</span> Good morning class.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">🎒</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 25 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-emerald-800">Class:</span> Good <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(1) ________</span>, Miss Hien. How are you?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">👩‍🏫</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 26 || currentQuestion.questionNumber === 27 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-indigo-800">Miss Hien:</span> I’m <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(2) ________</span>, thank you. What is the <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(3) ________</span> today, Mai?
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">👧</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 28 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-pink-800">Mai:</span> It’s the sixteenth of <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(4) ________</span>.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">👩‍🏫</span>
                      <div className={`p-2.5 rounded-2xl border shadow-2xs flex-1 ${currentQuestion.questionNumber === 29 ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 font-bold text-amber-950' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="font-bold text-indigo-800">Miss Hien:</span> Thank you. It’s Mr Loc’s <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black mx-1">(5) ________</span> tomorrow.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL EXAM BOARD 3: Matching Board Column A & B (Đề 1, Câu 30 - 34) */}
              {currentExam.id === 'midterm1-exam1' && currentQuestion.questionNumber >= 30 && currentQuestion.questionNumber <= 34 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-sky-50 via-indigo-50/50 to-white border-2 border-sky-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200/60">
                    <span className="text-xs font-black text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🔗</span>
                      <span>Bảng nối câu Cột A và Cột B (Bài V. Read and match)</span>
                    </span>
                    <span className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                      Đang làm câu số {currentQuestion.questionNumber - 29}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-indigo-900 pb-1 border-b border-slate-100 flex items-center gap-1.5 text-xs">
                        <span>🔵</span>
                        <span>CỘT A (Câu Hỏi)</span>
                      </div>
                      {[
                        { num: 1, text: 'What day is it today?' },
                        { num: 2, text: 'What nationality are you?' },
                        { num: 3, text: 'Where do you come from?' },
                        { num: 4, text: "What's your name?" },
                        { num: 5, text: 'What can you do?' }
                      ].map(row => (
                        <div
                          key={row.num}
                          className={`p-2 rounded-xl flex items-center gap-2 transition ${
                            currentQuestion.questionNumber - 29 === row.num
                              ? 'bg-indigo-100 border border-indigo-400 font-black text-indigo-950 ring-2 ring-indigo-200'
                              : 'text-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                            {row.num}
                          </span>
                          <span className="truncate">{row.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-emerald-900 pb-1 border-b border-slate-100 flex items-center gap-1.5 text-xs">
                        <span>🟢</span>
                        <span>CỘT B (Câu Trả Lời)</span>
                      </div>
                      {[
                        { letter: 'A', text: 'I come from Thailand.' },
                        { letter: 'B', text: 'My name is Linda.' },
                        { letter: 'C', text: 'I can play football.' },
                        { letter: 'D', text: 'Today is Monday.' },
                        { letter: 'E', text: 'I’m Vietnamese.' }
                      ].map(row => (
                        <div
                          key={row.letter}
                          className="p-2 rounded-xl flex items-center gap-2 text-slate-700 bg-slate-50 border border-slate-200"
                        >
                          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                            {row.letter}
                          </span>
                          <span className="truncate">{row.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL EXAM BOARD 4: Trang's Profile Board (Đề 2, Câu 7 - 11) */}
              {currentExam.id === 'midterm1-exam2' && currentQuestion.questionNumber >= 7 && currentQuestion.questionNumber <= 11 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/60">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🏫</span>
                      <span>Bài nghe giới thiệu của Trang (Đề 2 - Sunshine Primary School)</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Đang điền chỗ trống ({currentQuestion.questionNumber - 6})
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed shadow-2xs mb-3 font-serif">
                    <p>
                      "Good morning! My name is Trang. I come from Vietnam and now I live in Hanoi. I am a{' '}
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 7 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100 text-slate-800'}`}>(1) ________</span>{' '}
                      at Sunshine Primary School. I'm in class 4A and I have lots of cute{' '}
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 8 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100 text-slate-800'}`}>(2) ________</span>.
                    </p>
                    <p className="mt-2">
                      This is a picture of them. This is Jamie. He comes from New York,{' '}
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 9 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100 text-slate-800'}`}>(3) ________</span>.
                      And this is Nga and this is Han. They are from Vietnam. Next to them are Linda and Harry. Linda comes from{' '}
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 10 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100 text-slate-800'}`}>(4) ________</span>, England and Harry is from{' '}
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 11 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100 text-slate-800'}`}>(5) ________</span>.
                      They are all my good friends."
                    </p>
                  </div>
                  {/* Friends badges */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 flex items-center gap-1 shadow-2xs">
                      <span>👧 Trang</span> <span className="text-[10px] text-slate-400">(Hanoi, VN 🇻🇳)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 flex items-center gap-1 shadow-2xs">
                      <span>👦 Jamie</span> <span className="text-[10px] text-slate-400">(New York, USA 🇺🇸)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 flex items-center gap-1 shadow-2xs">
                      <span>👧 Nga & Han</span> <span className="text-[10px] text-slate-400">(Vietnam 🇻🇳)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 flex items-center gap-1 shadow-2xs">
                      <span>👧 Linda</span> <span className="text-[10px] text-slate-400">(London, UK 🇬🇧)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 flex items-center gap-1 shadow-2xs">
                      <span>👦 Harry</span> <span className="text-[10px] text-slate-400">(Korea 🇰🇷)</span>
                    </span>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL EXAM BOARD 5: Detective Inspector for Error Correction (Đề 2, Câu 22 - 26) */}
              {currentQuestion.type === 'error_correction' && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-white border-2 border-purple-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-purple-100">
                    <span className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🕵️‍♂️</span>
                      <span>Thám tử tìm lỗi sai: Đọc kỹ câu và chọn phương án sửa đúng</span>
                    </span>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      Mỗi câu có 1 lỗi duy nhất
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-purple-200 text-center shadow-2xs">
                    <span className="text-[11px] text-purple-600 font-bold uppercase block mb-1">Câu văn cần soi xét lỗi ngữ pháp:</span>
                    <span className="text-base sm:text-lg font-black text-purple-950 font-serif tracking-wide">
                      "{currentQuestion.questionPrompt.match(/"([^"]+)"/)?.[1] || currentQuestion.questionPrompt}"
                    </span>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 3 - Bảng nghe nối câu II (Câu 7 - 12) */}
              {currentExam.id === 'midterm1-exam3' && currentQuestion.questionNumber >= 7 && currentQuestion.questionNumber <= 12 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-blue-50 via-sky-50 to-white border-2 border-sky-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-sky-200/60">
                    <span className="text-xs font-black text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🎧</span>
                      <span>Bảng nối bài nghe II: Listen and match (Đề 3)</span>
                    </span>
                    <span className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                      Đang làm câu số {currentQuestion.questionNumber - 6}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-blue-900 pb-1 border-b border-slate-100 text-xs">VẾ ĐẦU (1 - 6)</div>
                      {[
                        { num: 1, text: 'My name is' },
                        { num: 2, text: 'Joe' },
                        { num: 3, text: 'I’m from' },
                        { num: 4, text: 'Good morning,' },
                        { num: 5, text: 'Jane' },
                        { num: 6, text: 'Good evening,' }
                      ].map(row => (
                        <div key={row.num} className={`p-2 rounded-xl flex items-center gap-2 ${currentQuestion.questionNumber - 6 === row.num ? 'bg-sky-100 text-sky-950 font-black ring-2 ring-sky-300' : 'text-slate-700'}`}>
                          <span className="w-5 h-5 rounded-md bg-sky-600 text-white font-bold flex items-center justify-center text-xs shrink-0">{row.num}</span>
                          <span>{row.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-emerald-900 pb-1 border-b border-slate-100 text-xs">VẾ NỐI (a - f)</div>
                      {[
                        { char: 'a', text: 'Nam.' },
                        { char: 'b', text: 'miss Mai.' },
                        { char: 'c', text: 'comes from Japan.' },
                        { char: 'd', text: 'Jenny.' },
                        { char: 'e', text: 'is my friend.' },
                        { char: 'f', text: 'Viet Nam.' }
                      ].map(row => (
                        <div key={row.char} className="p-2 rounded-xl flex items-center gap-2 text-slate-700 bg-slate-50 border border-slate-200">
                          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">{row.char}</span>
                          <span>{row.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 3 - Hội thoại Anna & Tom (Câu 24 - 28) */}
              {currentExam.id === 'midterm1-exam3' && currentQuestion.questionNumber >= 24 && currentQuestion.questionNumber <= 28 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-sky-50/40 to-white border-2 border-indigo-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100">
                    <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>💬</span>
                      <span>Hội thoại làm quen: Anna & Tom (Bài III. Read and complete)</span>
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Vị trí ({currentQuestion.questionNumber - 23})
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-pink-700">Anna:</span> Hi. I’m Anna. What’s your <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 24 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(1) ________</span>?
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-blue-700">Tom:</span> My name is Tom. Nice to meet you.
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-pink-700">Anna:</span> Nice to <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 25 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(2) ________</span> you, too.
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-blue-700">Tom:</span> What is your nationality?
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-pink-700">Anna:</span> I’m English. <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 26 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(3) ________</span> you?
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-blue-700">Tom:</span> I’m American. Can you <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 27 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(4) ________</span> any English songs?
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-pink-700">Anna:</span> Of course. I can sing and dance. Do you like playing the piano, Tom?
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800">
                      <span className="font-bold text-blue-700">Tom:</span> Yes, I <span className={`inline-block px-2 py-0.5 rounded-md font-bold mx-1 ${currentQuestion.questionNumber === 28 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(5) ________</span>, but I don’t know how to play it. I want to learn to play the piano.
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 4 - Bài nghe 3 đoạn hội thoại (Câu 1 - 6) */}
              {currentExam.id === 'midterm1-exam4' && currentQuestion.questionNumber >= 1 && currentQuestion.questionNumber <= 6 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50/50 to-white border-2 border-purple-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-200/60">
                    <span className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🎧</span>
                      <span>Bài nghe điền từ: Nam - Julia & Dan - Jane (Đề 4)</span>
                    </span>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      Câu hỏi số {currentQuestion.questionNumber}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[11px] font-bold text-purple-600 block mb-1">Đoạn 1: Nam & Julia (Câu 1 - 2)</span>
                      <div><span className="font-bold text-blue-700">Nam:</span> What can you do, Julia?</div>
                      <div><span className="font-bold text-pink-700">Julia:</span> Well, I can draw and <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 1 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(1) _______</span> quite well. I can also <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 2 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(2) _______</span>, but I don't swim so well.</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[11px] font-bold text-purple-600 block mb-1">Đoạn 2: Dan & Jane (Câu 3 - 4)</span>
                      <div><span className="font-bold text-blue-700">Dan:</span> Can you play any <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 3 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(3) _______</span>, Jane? — <span className="font-bold text-pink-700">Jane:</span> Yes, of course.</div>
                      <div><span className="font-bold text-blue-700">Dan:</span> What sports can you play? — <span className="font-bold text-pink-700">Jane:</span> A lot. Football, <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 4 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(4) _______</span>, volleyball, and so on.</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[11px] font-bold text-purple-600 block mb-1">Đoạn 3: Tiếng ồn của trẻ con (Câu 5 - 6)</span>
                      <div>You can play the <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 5 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(5) _______</span> or read some fairy tales. Then they will <span className={`inline-block px-1.5 py-0.5 rounded-md font-bold mx-0.5 ${currentQuestion.questionNumber === 6 ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-400 font-black' : 'bg-slate-100'}`}>(6) _______</span> to you and don't make noise any more.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 5 - Bảng nối hội thoại Cột A & B (Câu 11 - 15) */}
              {currentExam.id === 'midterm1-exam5' && currentQuestion.questionNumber >= 11 && currentQuestion.questionNumber <= 15 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-white border-2 border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/60">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🔗</span>
                      <span>Bảng nối hội thoại Cột A & Cột B (Đề 5 - Bài III)</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Đang làm câu số {currentQuestion.questionNumber - 10}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-amber-900 pb-1 border-b border-slate-100 text-xs">CỘT A (Câu 1 - 5)</div>
                      {[
                        { num: 1, text: 'Nice to see you again.' },
                        { num: 2, text: 'Can he play the piano?' },
                        { num: 3, text: 'Where is Peter from?' },
                        { num: 4, text: 'What day is it today?' },
                        { num: 5, text: "When is your mother's birthday party?" }
                      ].map(row => (
                        <div key={row.num} className={`p-2 rounded-xl flex items-center gap-2 ${currentQuestion.questionNumber - 10 === row.num ? 'bg-amber-100 text-amber-950 font-black ring-2 ring-amber-300' : 'text-slate-700'}`}>
                          <span className="w-5 h-5 rounded-md bg-amber-600 text-white font-bold flex items-center justify-center text-xs shrink-0">{row.num}</span>
                          <span>{row.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="font-black text-emerald-900 pb-1 border-b border-slate-100 text-xs">CỘT B (Đáp án a - e)</div>
                      {[
                        { char: 'a', text: 'He is from Canada.' },
                        { char: 'b', text: 'Next Monday.' },
                        { char: 'c', text: 'Nice to see you again, too.' },
                        { char: 'd', text: 'It is Wednesday.' },
                        { char: 'e', text: 'No, he can’t.' }
                      ].map(row => (
                        <div key={row.char} className="p-2 rounded-xl flex items-center gap-2 text-slate-700 bg-slate-50 border border-slate-200">
                          <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">{row.char}</span>
                          <span>{row.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 4 - Bảng Lớp Học Quốc Tế của Rei (Câu 22 - 26) */}
              {currentExam.id === 'midterm1-exam4' && currentQuestion.questionNumber >= 22 && currentQuestion.questionNumber <= 26 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-sky-50/50 to-white border-2 border-indigo-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100">
                    <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🏫</span>
                      <span>Lớp học quốc tế của Rei (Bài đọc hiểu IV - Đề 4)</span>
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Câu hỏi đọc hiểu ({currentQuestion.questionNumber - 21}/5)
                    </span>
                  </div>

                  {/* Class snapshot banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3 text-xs">
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 22 || currentQuestion.questionNumber === 25
                        ? 'bg-amber-100/90 border-amber-300 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">🇯🇵</span>
                        <span className="font-black text-slate-900">Rei</span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-bold">Bạn kể chuyện</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Quốc tịch: <span className="font-bold text-indigo-700">Japanese</span> (Japan)
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Nói được: <span className="font-bold text-indigo-700">Japanese & English</span>
                      </div>
                    </div>

                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 24
                        ? 'bg-amber-100/90 border-amber-300 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">🇺🇸</span>
                        <span className="font-black text-slate-900">Jake & Keith</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Đến từ: <span className="font-bold text-blue-700">The USA (Nước Mỹ)</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Không phải nước Anh (England)</div>
                    </div>

                    <div className="p-2.5 rounded-2xl border bg-white border-slate-200 text-slate-800 shadow-2xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">🇬🇧</span>
                        <span className="font-black text-slate-900">Linda</span>
                        <span className="text-base ml-2">🇻🇳</span>
                        <span className="font-black text-slate-900">Han</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Linda: <span className="font-bold text-indigo-700">England</span> · Han: <span className="font-bold text-emerald-700">Viet Nam</span>
                      </div>
                      <div className="text-[10px] text-slate-500">SeoAhn: 🇰🇷 Korea</div>
                    </div>
                  </div>

                  {/* Highlights banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-white border border-slate-200 text-xs">
                    <div className={`flex items-center gap-2 ${currentQuestion.questionNumber === 23 ? 'font-black text-indigo-950 bg-indigo-50 px-2 py-1 rounded-xl' : 'text-slate-700'}`}>
                      <span className="text-sm">🎒</span>
                      <span>Sĩ số lớp: <strong className="text-indigo-600">20 học sinh</strong> (Twenty students)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${currentQuestion.questionNumber === 26 ? 'font-black text-emerald-950 bg-emerald-50 px-2 py-1 rounded-xl' : 'text-slate-700'}`}>
                      <span className="text-sm">🏸</span>
                      <span>Giờ ra chơi: <strong className="text-emerald-700">Cầu lông & Trốn tìm</strong> (Badminton & hide-and-seek)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 5 - Sổ Tay Lịch Trình Tuần của Anna (Câu 21 - 25) */}
              {currentExam.id === 'midterm1-exam5' && currentQuestion.questionNumber >= 21 && currentQuestion.questionNumber <= 25 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-2 border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/60">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>📔</span>
                      <span>Nhật ký thời gian biểu của Anna (Đề 5 - Bài V)</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Hôm nay: Thứ Tư, 7 tháng 10 🇺🇸
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-2.5 text-xs">
                    {/* Mon - Fri */}
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 22
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="text-[10px] font-black uppercase text-amber-700 block mb-1">Thứ Hai - Thứ Sáu</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>🎒</span>
                        <span>Đi học ở trường</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Go to school (Mon to Fri)</span>
                    </div>

                    {/* Monday Afternoon */}
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 24
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="text-[10px] font-black uppercase text-indigo-700 block mb-1">Chiều Thứ Hai</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>🗣️</span>
                        <span>CLB Tiếng Anh</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Go to the English club</span>
                    </div>

                    {/* Wednesday Afternoon */}
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 23
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="text-[10px] font-black uppercase text-sky-700 block mb-1">Chiều Thứ Tư</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>🏊‍♀️</span>
                        <span>Đi bơi lội</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Go swimming</span>
                    </div>

                    {/* Weekend */}
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 25
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="text-[10px] font-black uppercase text-rose-700 block mb-1">Thứ Bảy & Chủ Nhật</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>👵👴</span>
                        <span>Thăm ông bà</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Visit grandparents (Weekend)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Đề 5 - Đối Thoại Hỏi & Đáp (Câu 26 - 30) */}
              {currentExam.id === 'midterm1-exam5' && currentQuestion.questionNumber >= 26 && currentQuestion.questionNumber <= 30 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-white border-2 border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/60">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>💬</span>
                      <span>Thử thách ghép câu hỏi đối thoại (Đề 5 - Bài VI)</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Dạng bài: Cho câu trả lời ➔ Tìm câu hỏi
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">👦</span>
                      <div>
                        <span className="text-[11px] text-blue-600 font-bold block">Bạn A hỏi:</span>
                        <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg inline-block border border-dashed border-slate-300">
                          ❓ [Chọn câu hỏi chính xác bên dưới]
                        </span>
                      </div>
                    </div>

                    <span className="text-slate-400 font-black text-sm hidden sm:inline">➔</span>

                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center shrink-0">👧</span>
                      <div>
                        <span className="text-[11px] text-emerald-700 font-bold block">Bạn B đã trả lời:</span>
                        <span className="font-black text-emerald-950 bg-emerald-100/90 px-3 py-1 rounded-lg inline-block border border-emerald-300 shadow-2xs">
                          "{currentQuestion.questionPrompt.match(/"([^"]+)"/)?.[1] || '...'}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Cuối Kì 1 - Đề 1: Ảnh Lớp Học Pedro (Câu 16 - 20) */}
              {currentExam.id === 'term1-exam1' && currentQuestion.questionNumber >= 16 && currentQuestion.questionNumber <= 20 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-2 border-amber-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/60">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>📸</span>
                      <span>Bức ảnh lớp học của bạn Pedro (Cuối Kì 1 - Đề 1)</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      Câu đọc hiểu ({currentQuestion.questionNumber - 15}/5)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2.5 text-xs">
                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 16
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">👩‍🏫</span>
                        <span className="font-black text-slate-900">Ms Anna</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        GVCN · Dạy: <strong className="text-amber-700">Lịch sử (History)</strong>
                      </div>
                      <div className="text-[10px] text-slate-400">Funny & kind</div>
                    </div>

                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 17
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">👦</span>
                        <span className="font-black text-slate-900">Alberto</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Lớp trưởng (Monitor)
                      </div>
                      <div className="text-[10px] text-indigo-600 font-bold">Văn & Địa lý (Literature & Geo)</div>
                    </div>

                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 18 || currentQuestion.questionNumber === 19
                        ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 font-black text-amber-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">👦</span>
                        <span className="font-black text-slate-900">Paulo</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Học sinh giỏi (Good student)
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">Thích mọi môn · Giỏi Tiếng Anh & Pháp</div>
                    </div>

                    <div className={`p-2.5 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 19 || currentQuestion.questionNumber === 20
                        ? 'bg-pink-100 border-pink-400 ring-2 ring-pink-300 font-black text-pink-950'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base">👧</span>
                        <span className="font-black text-slate-900">Lisa (Váy hồng)</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Bạn thân nhất (Best friend)
                      </div>
                      <div className="text-[10px] text-rose-600 font-bold">Khoa học & Tin học (Science & IT)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Cuối Kì 1 - Đề 2: Nghe Hội Thoại Sở Thích (Câu 1 - 8) */}
              {currentExam.id === 'term1-exam2' && currentQuestion.questionNumber >= 1 && currentQuestion.questionNumber <= 8 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-2 border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200/60">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🎧</span>
                      <span>Hội thoại nghe về sở thích: Frank-Andrea & Jane-Tom (Đề 2 Cuối Kì 1)</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Vị trí ({currentQuestion.questionNumber}/8)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {/* Đoạn 1: Frank & Andrea */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="text-[11px] font-black text-emerald-700 uppercase block mb-1">Đoạn 1: Frank & Andrea (Câu 1 - 4)</span>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-blue-700">Frank:</span> Can you tell me about your <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 1 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(1) hobby</span>?
                      </div>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-pink-700">Andrea:</span> I'm painting a picture for my mum. I like playing the <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 2 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(2) guitar</span>. I don't like <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 3 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(3) skating</span>.
                      </div>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-blue-700">Frank:</span> I <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 4 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(4) hope</span> your mum likes the picture.
                      </div>
                    </div>

                    {/* Đoạn 2: Jane & Tom */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="text-[11px] font-black text-indigo-700 uppercase block mb-1">Đoạn 2: Jane & Tom (Câu 5 - 8)</span>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-pink-700">Jane:</span> What <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 5 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(5) hobbies</span> do you have?
                      </div>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-blue-700">Tom:</span> Basketball, surfing, skateboarding.
                      </div>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-pink-700">Jane:</span> Are you good at <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 6 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(6) basketball</span>? Do you like playing <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 7 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(7) golf</span>?
                      </div>
                      <div className="text-slate-800 leading-relaxed">
                        <span className="font-bold text-blue-700">Tom:</span> No, not really. I think it's <span className={`px-1.5 py-0.5 rounded font-bold ${currentQuestion.questionNumber === 8 ? 'bg-amber-200 text-amber-950 font-black ring-1 ring-amber-400' : 'bg-slate-100'}`}>(8) boring</span>.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Cuối Kì 1 - Đề 2: Thể Thao Nam & Rebecca (Câu 19 - 23) */}
              {currentExam.id === 'term1-exam2' && currentQuestion.questionNumber >= 19 && currentQuestion.questionNumber <= 23 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-cyan-50 via-teal-50 to-white border-2 border-teal-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-teal-200/60">
                    <span className="text-xs font-black text-teal-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🎾</span>
                      <span>Hồ sơ thể thao: Nam & Rebecca (Đề 2 Cuối Kì 1)</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      Câu hỏi ({currentQuestion.questionNumber - 18}/5)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className={`p-3 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 19 || currentQuestion.questionNumber === 20 || currentQuestion.questionNumber === 21
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300 font-medium'
                        : 'bg-white border-slate-200'
                    }`}>
                      <div className="font-black text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>👦</span>
                        <span>Bạn Nam:</span>
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        <li>• Môn yêu thích: <strong className="text-indigo-700">Quần vợt (Tennis 🎾)</strong></li>
                        <li>• Không thích: Trò chơi máy tính vì <strong className="text-rose-600">nhàm chán (boring)</strong></li>
                        <li>• Cuối tuần: Đọc sách, xem TV & đi phòng gym 🏋️</li>
                        <li>• Chiều Chủ nhật: Ăn pizza 🍕 & xem phim cùng bạn bè</li>
                      </ul>
                    </div>

                    <div className={`p-3 rounded-2xl border transition shadow-2xs ${
                      currentQuestion.questionNumber === 22 || currentQuestion.questionNumber === 23
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-300 font-medium'
                        : 'bg-white border-slate-200'
                    }`}>
                      <div className="font-black text-slate-900 flex items-center gap-1.5 mb-1">
                        <span>👧</span>
                        <span>Bạn Rebecca:</span>
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        <li>• Chơi cực giỏi: <strong className="text-emerald-700">Bóng chuyền (Volleyball 🏐)</strong></li>
                        <li>• Cũng thích đến phòng tập thể dục (gym) cùng Nam</li>
                        <li>• Sở thích đặc biệt: <strong className="text-amber-700">Sưu tầm ảnh ca sĩ yêu thích 🎤</strong></li>
                        <li>• Đã sưu tầm được: <strong>100 bức ảnh</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Cuối Kì 1 - Đề 3: Giờ Giải Lao - Break Time (Câu 16 - 20) */}
              {currentExam.id === 'term1-exam3' && currentQuestion.questionNumber >= 16 && currentQuestion.questionNumber <= 20 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-sky-50/50 to-white border-2 border-indigo-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-100">
                    <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>⏰</span>
                      <span>Bản đồ hoạt động: Giờ giải lao (Break Time - Đề 3)</span>
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                      Câu đọc hiểu ({currentQuestion.questionNumber - 15}/5)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-black uppercase text-pink-600 block mb-1">Vẽ tranh & Đồ giấy</span>
                      <div className="text-slate-800 font-medium">Trang & Nhung: <strong>Vẽ lọ hoa 🏺</strong></div>
                      <div className="text-slate-800 font-medium mt-1">Mai, Hoàng, Nam: <strong>Máy bay, nhà & thuyền giấy ✈️🏠⛵</strong></div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-black uppercase text-blue-600 block mb-1">Rối, Sách & Chính tả</span>
                      <div className="text-slate-800 font-medium">Nga: <strong>Làm con rối 🎭</strong></div>
                      <div className="text-slate-800 font-medium mt-1">Ninh: <strong>Đọc sách 📖</strong> · Hoa: <strong>Viết chính tả ✍️</strong></div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-black uppercase text-emerald-600 block mb-1">Video thú cưng & Sân trường</span>
                      <div className="text-slate-800 font-medium">Hân: <strong>Xem video hài về thú cưng 🐶🐱</strong></div>
                      <div className="text-slate-800 font-medium mt-1">Sân trường: <strong>Chơi cầu lông 🏸</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEXTUAL BOARD: Cuối Kì 1 - Đề 5: Trường Quốc Tế Hà Nội (Câu 23 - 27) */}
              {currentExam.id === 'term1-exam5' && currentQuestion.questionNumber >= 23 && currentQuestion.questionNumber <= 27 && (
                <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-blue-50 via-teal-50/50 to-white border-2 border-blue-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-200/60">
                    <span className="text-xs font-black text-blue-950 flex items-center gap-1.5 uppercase tracking-wide">
                      <span>🏫</span>
                      <span>Trường Quốc tế Hà Nội: Julia & các bạn (Đề 5 Cuối Kì 1)</span>
                    </span>
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      Địa chỉ: 53 Nguyễn Du, Hà Nội · Lớp 4E
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="font-black text-slate-900 flex items-center gap-1 mb-1">
                        <span>🇬🇧</span> <span>Julia</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">Đến từ nước Anh</div>
                      <div className="text-blue-700 font-bold text-[10px]">Lớp 4E · Rất nhiều bạn</div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="font-black text-slate-900 flex items-center gap-1 mb-1">
                        <span>🇻🇳</span> <span>Nhung</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">Người Việt Nam</div>
                      <div className="text-emerald-700 font-bold text-[10px]">Vẽ tranh rất giỏi 🎨</div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="font-black text-slate-900 flex items-center gap-1 mb-1">
                        <span>🇬🇧</span> <span>Harry</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">Người Anh (English)</div>
                      <div className="text-indigo-700 font-bold text-[10px]">Bơi lội 🏊 & Chơi ghi-ta 🎸</div>
                    </div>

                    <div className="p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="font-black text-slate-900 flex items-center gap-1 mb-1">
                        <span>🇯🇵</span> <span>Maori</span>
                      </div>
                      <div className="text-slate-600 text-[11px]">Bạn gái Nhật Bản</div>
                      <div className="text-pink-700 font-bold text-[10px]">Khiêu vũ 💃 & Đá bóng ⚽</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Matching hint banner */}
              {currentQuestion.type === 'matching' && (
                <div className="mb-4 p-3 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-2 text-xs text-sky-800 font-medium">
                  <span>🔗</span>
                  <span>Dạng bài Nối câu: Đọc câu hỏi ở Cột A và chọn đáp án ở Cột B sao cho logic và chuẩn ngữ pháp.</span>
                </div>
              )}

              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                <span className="text-indigo-600 mr-2">Câu {currentQuestion.questionNumber}:</span>
                {currentQuestion.questionPrompt}
              </h3>
            </div>

            {/* ======================================================== */}
            {/* INTERACTIVE QUESTION BODY BY TYPE */}
            {/* ======================================================== */}

            {/* 1.5. Interactive Letter Tile Builder for Unscramble Word */}
            {currentQuestion.type === 'unscramble_word' && currentQuestion.wordToUnscramble && (
              <div className="mb-6 space-y-4 p-4.5 rounded-3xl bg-indigo-50/60 border-2 border-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                    <span>🔤</span>
                    <span>Bấm từng chữ cái để ghép từ (hoặc chọn đáp án trắc nghiệm):</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleResetUnscramble}
                    className="text-xs text-indigo-600 hover:text-indigo-900 font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Ghép lại từ đầu</span>
                  </button>
                </div>

                {/* Target Word Assemble Slots */}
                <div className="p-3.5 rounded-2xl bg-white border-2 border-dashed border-indigo-300 min-h-16 flex items-center justify-center gap-2 flex-wrap shadow-2xs">
                  {unscrambleSelectedLetters.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      👉 Bấm các chữ cái bên dưới để xếp vào đây...
                    </span>
                  ) : (
                    unscrambleSelectedLetters.map((letter, lIdx) => (
                      <button
                        key={lIdx}
                        type="button"
                        onClick={() => handleRemoveUnscrambleLetter(letter, lIdx)}
                        className="w-10 h-11 rounded-xl bg-indigo-600 hover:bg-rose-600 text-white font-black text-lg flex items-center justify-center shadow-xs transition group cursor-pointer"
                        title="Bấm để gỡ chữ này"
                      >
                        <span className="group-hover:hidden">{letter}</span>
                        <span className="hidden group-hover:inline text-xs">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available Shuffled Letters */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 mb-2">
                    Các chữ cái khả dụng ({unscrambleAvailableLetters.length}):
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {unscrambleAvailableLetters.map((letter, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => handlePickUnscrambleLetter(letter, aIdx)}
                        className="w-10 h-11 rounded-xl bg-white hover:bg-indigo-100 border-2 border-indigo-300 hover:border-indigo-500 font-black text-indigo-800 text-lg flex items-center justify-center shadow-xs transition active:scale-90 cursor-pointer"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Listen to constructed word */}
                {userAnswers[currentQuestion.id] && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(userAnswers[currentQuestion.id], 0.88)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold flex items-center gap-1 border border-indigo-200 shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm từ: "{userAnswers[currentQuestion.id]}"</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 1. Multiple Choice / Odd One Out / Pronunciation / Reading / Error Correction */}
            {currentQuestion.options && currentQuestion.type !== 'reorder' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected =
                    userAnswers[currentQuestion.id] === option ||
                    (currentQuestion.type === 'unscramble_word' &&
                      userAnswers[currentQuestion.id]?.toLowerCase() === option.toLowerCase());
                  const isChecked = checkedQuestions[currentQuestion.id];
                  const isCorrect =
                    option.trim().toLowerCase() ===
                    currentQuestion.correctAnswer.toString().trim().toLowerCase();

                  let btnStyle =
                    'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

                  if (isSelected) {
                    btnStyle =
                      'bg-indigo-50 text-indigo-900 border-indigo-500 font-black shadow-xs ring-2 ring-indigo-200';
                  }

                  // If in practice mode and checked
                  if (isChecked) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-black';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 text-rose-900 border-rose-400 font-bold';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${btnStyle}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer focus:outline-none"
                      >
                        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shrink-0 shadow-xs">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm font-semibold truncate sm:whitespace-normal">{option}</span>
                      </button>

                      {/* Listen button for option pronunciation */}
                      {option && !option.startsWith('Sửa ') && !option.startsWith('Tranh ') && !option.startsWith('Hình ') && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const cleanText = option.split('(')[0].replace(/[/_\\*]/g, '').trim();
                            if (cleanText) handlePlayAudio(cleanText, 0.88);
                          }}
                          className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition shrink-0 border border-transparent hover:border-slate-200"
                          title="Nghe phát âm phương án này"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Reorder Interactive Words Builder */}
            {currentQuestion.type === 'reorder' && (
              <div className="mb-6 space-y-4">
                {/* Result sentence assemble line */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 border-2 border-dashed border-indigo-300 min-h-16 flex flex-wrap items-center gap-2">
                  {reorderSelectedWords.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      👉 Bấm vào các thẻ từ bên dưới để ghép thành câu hoàn chỉnh...
                    </span>
                  ) : (
                    reorderSelectedWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleRemoveReorderWord(word, wIdx)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-xs hover:bg-rose-600 transition flex items-center gap-1 group"
                        title="Bấm để bỏ từ này"
                      >
                        <span>{word}</span>
                        <span className="text-[10px] opacity-70 group-hover:opacity-100">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available scrambled words */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">
                      Chọn từ còn lại ({availableScrambledWords.length}):
                    </span>
                    <button
                      onClick={handleResetReorder}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Xếp lại từ đầu</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableScrambledWords.map((word, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handlePickReorderWord(word, aIdx)}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 text-xs font-black text-slate-800 transition active:scale-95 shadow-xs"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Listen to constructed sentence if finished */}
                {userAnswers[currentQuestion.id] && (
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handlePlayAudio(userAnswers[currentQuestion.id], 0.88)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe thử câu của bạn</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Practice Mode: Check Button & Explanation Box */}
            {playMode === 'practice' && (
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCheckPracticeAnswer}
                    disabled={!userAnswers[currentQuestion.id]}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kiểm tra đáp án</span>
                  </button>

                  {currentQuestion.hint && !checkedQuestions[currentQuestion.id] && (
                    <div className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Gợi ý: {currentQuestion.hint}</span>
                    </div>
                  )}
                </div>

                {/* Detailed Explanation upon checking */}
                {checkedQuestions[currentQuestion.id] && (
                  <div
                    className={`p-4 rounded-2xl border ${
                      userAnswers[currentQuestion.id]
                        ?.trim()
                        .toLowerCase()
                        .replace(/[.?!]/g, '') ===
                      currentQuestion.correctAnswer
                        .toString()
                        .trim()
                        .toLowerCase()
                        .replace(/[.?!]/g, '')
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {userAnswers[currentQuestion.id]
                        ?.trim()
                        .toLowerCase()
                        .replace(/[.?!]/g, '') ===
                      currentQuestion.correctAnswer
                        .toString()
                        .trim()
                        .toLowerCase()
                        .replace(/[.?!]/g, '') ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác tuyệt vời! (+2 sao ⭐)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Chưa chính xác! Hãy đọc lời giải bên dưới để nhớ lâu nhé.</span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-800 font-medium mb-2 pb-2 border-b border-slate-200/60 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">🎯 Đáp án chính xác: </span>
                        <span className="text-indigo-700 font-black text-sm">
                          {currentQuestion.correctAnswer}
                        </span>
                      </div>
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                        Loigiaihay.com
                      </span>
                    </div>

                    {currentQuestion.grammarFocus && (
                      <div className="text-xs text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mb-2 font-medium">
                        <span className="font-bold text-amber-800">🧠 Kiến thức trọng tâm: </span>
                        <span>{currentQuestion.grammarFocus}</span>
                      </div>
                    )}

                    <div className="text-xs text-slate-700 leading-relaxed mb-2">
                      <span className="font-bold text-slate-900">💡 Giải thích chi tiết: </span>
                      {currentQuestion.explanation}
                    </div>

                    {currentQuestion.vietnameseTranslation && (
                      <div className="text-xs text-emerald-950 bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200">
                        <span className="font-bold text-emerald-800">📖 Dịch nghĩa tiếng Việt: </span>
                        <span>{currentQuestion.vietnameseTranslation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 text-xs font-bold text-slate-700 transition flex items-center gap-1.5 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <span className="text-xs font-medium text-slate-500">
              Đã làm {Object.keys(userAnswers).length} / {currentExam.questions.length} câu
            </span>

            {currentQuestionIndex < currentExam.questions.length - 1 ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentQuestionIndex(prev => prev + 1);
                }}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setShowSubmitConfirmModal(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-md"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Hoàn Thành &amp; Nộp Bài</span>
              </button>
            )}
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* 4. VIEW 3: RESULTS SUMMARY & DETAILED REVIEW */}
      {/* ======================================================== */}
      {viewMode === 'results' && lastFinishedResult && (
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg text-center mb-8 relative overflow-hidden">
            {/* Confetti icon badge */}
            <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-4xl mb-4 shadow-sm">
              {lastFinishedResult.score >= 8 ? '🏆' : lastFinishedResult.score >= 5 ? '🌟' : '💪'}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              {lastFinishedResult.score >= 9
                ? 'Xuất Sắc! Điểm Tuyệt Đối!'
                : lastFinishedResult.score >= 8
                ? 'Chúc Mừng Bạn Đạt Điểm Giỏi!'
                : lastFinishedResult.score >= 5
                ? 'Làm Tốt Lắm! Cố Gắng Thêm Chút Nữa!'
                : 'Đừng Nản Lòng, Hãy Ôn Lại Câu Sai Nhé!'}
            </h2>
            <p className="text-sm text-slate-500 font-medium mb-6">
              {lastFinishedResult.examTitle} · Hoàn thành lúc {lastFinishedResult.completedAt}
            </p>

            {/* Score Big Display */}
            <div className="inline-flex items-baseline gap-2 bg-slate-50 px-8 py-4 rounded-3xl border border-slate-200 mb-8">
              <span className="text-5xl sm:text-6xl font-black text-indigo-600">
                {lastFinishedResult.score}
              </span>
              <span className="text-2xl font-bold text-slate-400">/ 10</span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100">
                <span className="text-xs text-emerald-700 font-bold block">Câu Đúng</span>
                <span className="text-xl font-black text-emerald-800">
                  {lastFinishedResult.correctCount} câu
                </span>
              </div>
              <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100">
                <span className="text-xs text-rose-700 font-bold block">Câu Sai / Bỏ qua</span>
                <span className="text-xl font-black text-rose-800">
                  {lastFinishedResult.wrongCount} câu
                </span>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-100">
                <span className="text-xs text-indigo-700 font-bold block">Thời Gian</span>
                <span className="text-xl font-black text-indigo-800">
                  {Math.floor(lastFinishedResult.timeSpentSeconds / 60)}p{' '}
                  {lastFinishedResult.timeSpentSeconds % 60}s
                </span>
              </div>
              <div className="bg-amber-50 rounded-2xl p-3 border border-amber-100">
                <span className="text-xs text-amber-700 font-bold block">Thưởng Sao</span>
                <span className="text-xl font-black text-amber-800">
                  +{lastFinishedResult.score >= 8 ? 10 : 5} ⭐
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  handleStartExam(lastFinishedResult.examId, 'practice');
                }}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm Lại Đề Này</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('mistakes');
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black transition flex items-center gap-2"
              >
                <span>❌</span>
                <span>Ôn Các Câu Làm Sai</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode('hub');
                }}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition flex items-center gap-2"
              >
                <span>📋</span>
                <span>Về Danh Sách Đề</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <span>📖</span>
              <span>Chi Tiết Từng Câu Hỏi &amp; Lời Giải Thích</span>
            </h3>

            <div className="space-y-4">
              {currentExam.questions.map((q, idx) => {
                const userAns = lastFinishedResult.answers[q.id];
                const isCorrect =
                  userAns &&
                  userAns.trim().toLowerCase().replace(/[.?!]/g, '') ===
                    q.correctAnswer.toString().trim().toLowerCase().replace(/[.?!]/g, '');

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl border p-5 transition ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          {q.exerciseTitle}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          Câu {idx + 1}: {q.questionPrompt}
                        </h4>
                      </div>

                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Đúng</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Sai</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Answer comparison */}
                    <div className="text-xs space-y-1 mb-3 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-500">Đáp án của bạn: </span>
                        <span
                          className={`font-black ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {userAns || '(Chưa làm / Bỏ trống)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Đáp án chính xác: </span>
                        <span className="font-black text-indigo-700">{q.correctAnswer}</span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-200">
                      <span className="font-bold text-slate-900">💡 Giải thích: </span>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* 5. VIEW 4: DRILL (ÔN LUYỆN THEO DẠNG BÀI) */}
      {/* ======================================================== */}
      {viewMode === 'drill' && (
        <main className="max-w-4xl mx-auto px-4 py-6">
          {/* Category Filter Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>🎯</span>
                <span>Lọc Dạng Bài Tập</span>
              </h3>
              <span className="text-xs text-slate-500">
                Tổng cộng {drillQuestions.length} câu hỏi
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Tất Cả Dạng', icon: '🌟' },
                { id: 'listening', label: 'Luyện Nghe Audio', icon: '🎧' },
                { id: 'pronunciation', label: 'Phát Âm', icon: '🗣️' },
                { id: 'odd_one_out', label: 'Từ Khác Loại', icon: '🔍' },
                { id: 'matching', label: 'Nối Cột A - B', icon: '🔗' },
                { id: 'fill_blank', label: 'Điền Chỗ Trống', icon: '📝' },
                { id: 'reorder', label: 'Sắp Xếp Câu', icon: '🧩' },
                { id: 'unscramble_word', label: 'Ghép Chữ Tranh', icon: '🎹' },
                { id: 'error_correction', label: 'Sửa Lỗi Sai', icon: '✏️' },
                { id: 'reading', label: 'Đọc Hiểu', icon: '📖' },
                { id: 'multiple_choice', label: 'Trắc Nghiệm', icon: '✍️' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setDrillCategory(cat.id);
                    setDrillIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    drillCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drill Question Display */}
          {currentDrillQuestion ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
                  {currentDrillQuestion.examTitle} · Câu {drillIndex + 1} / {drillQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {currentDrillQuestion.exerciseTitle}
                </span>
              </div>

              {/* Reading passage if any */}
              {currentDrillQuestion.readingPassage && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <p className="text-sm text-slate-800 leading-relaxed font-serif">
                    {currentDrillQuestion.readingPassage}
                  </p>
                </div>
              )}

              {/* Audio if any */}
              {currentDrillQuestion.audioText && (
                <div className="mb-6 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                    <Headphones className="w-4 h-4 text-indigo-600" />
                    <span>Bài nghe Audio:</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(currentDrillQuestion.audioText!, 0.88)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe</span>
                  </button>
                </div>
              )}

              {/* Unscramble Word Letters */}
              {currentDrillQuestion.type === 'unscramble_word' && currentDrillQuestion.wordToUnscramble && (
                <div className="mb-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-900">Các chữ cái xáo trộn:</span>
                    <div className="flex items-center gap-1.5">
                      {currentDrillQuestion.wordToUnscramble.split('').map((letter, lIdx) => (
                        <span
                          key={lIdx}
                          className="w-8 h-8 rounded-xl bg-white border border-indigo-300 shadow-xs font-black text-indigo-700 text-sm flex items-center justify-center uppercase"
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 font-medium">
                    👉 Ghép thành từ đúng
                  </span>
                </div>
              )}

              {/* Word Bank Box for Fill in Blanks */}
              {currentDrillQuestion.wordBank && currentDrillQuestion.wordBank.length > 0 && (
                <div className="mb-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span>📦</span>
                      <span>Ngân hàng từ vựng (Word Bank):</span>
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Chọn 1 từ thích hợp điền vào vị trí trống
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentDrillQuestion.wordBank.map((word, wbIdx) => (
                      <span
                        key={wbIdx}
                        className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 shadow-xs font-bold text-emerald-800 text-xs flex items-center gap-1"
                      >
                        <span className="text-emerald-500">✏️</span>
                        <span>{word}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching hint banner */}
              {currentDrillQuestion.type === 'matching' && (
                <div className="mb-4 p-3 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-2 text-xs text-sky-800 font-medium">
                  <span>🔗</span>
                  <span>Dạng bài Nối câu: Chọn câu trả lời ở Cột B tương ứng khớp nghĩa và logic với Cột A.</span>
                </div>
              )}

              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-6">
                {currentDrillQuestion.questionPrompt}
              </h3>

              {/* Options */}
              {currentDrillQuestion.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentDrillQuestion.options.map((opt, idx) => {
                    const isSelected = drillAnswers[currentDrillQuestion.id] === opt;
                    const isChecked = drillChecked[currentDrillQuestion.id];
                    const isCorrect =
                      opt.trim().toLowerCase() ===
                      currentDrillQuestion.correctAnswer.toString().trim().toLowerCase();

                    let style = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                    if (isSelected) style = 'bg-indigo-50 text-indigo-900 border-indigo-500 font-black';
                    if (isChecked) {
                      if (isCorrect) style = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-black';
                      else if (isSelected && !isCorrect)
                        style = 'bg-rose-50 text-rose-900 border-rose-400 font-bold';
                    }

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-2 ${style}`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setDrillAnswers(prev => ({
                              ...prev,
                              [currentDrillQuestion.id]: opt
                            }));
                          }}
                          className="flex-1 text-left cursor-pointer focus:outline-none"
                        >
                          <span className="text-sm font-semibold">{opt}</span>
                        </button>

                        {(currentDrillQuestion.type === 'pronunciation' ||
                          currentDrillQuestion.type === 'odd_one_out') && (
                          <button
                            type="button"
                            onClick={() => {
                              const cleanText = opt.split('(')[0].replace(/[/_\\*]/g, '').trim();
                              handlePlayAudio(cleanText, 0.88);
                            }}
                            className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-700 transition shrink-0"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Check and explanation */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const userAns = drillAnswers[currentDrillQuestion.id];
                      if (!userAns) return;
                      setDrillChecked(prev => ({ ...prev, [currentDrillQuestion.id]: true }));
                      const isCorrect =
                        userAns.trim().toLowerCase().replace(/[.?!]/g, '') ===
                        currentDrillQuestion.correctAnswer.toString().trim().toLowerCase().replace(/[.?!]/g, '');
                      if (isCorrect) {
                        sound.playCorrect();
                        onAddStar(2);
                      } else {
                        sound.playWrong();
                      }
                    }}
                    disabled={!drillAnswers[currentDrillQuestion.id]}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kiểm tra đáp án</span>
                  </button>

                  {currentDrillQuestion.hint && !drillChecked[currentDrillQuestion.id] && (
                    <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                      💡 {currentDrillQuestion.hint}
                    </span>
                  )}
                </div>

                {drillChecked[currentDrillQuestion.id] && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-slate-800">
                    <div className="font-bold text-slate-900 mb-1">
                      Đáp án đúng: <span className="text-indigo-700">{currentDrillQuestion.correctAnswer}</span>
                    </div>
                    <div>
                      <span className="font-bold">Giải thích: </span>
                      {currentDrillQuestion.explanation}
                    </div>
                  </div>
                )}
              </div>

              {/* Drill Next / Prev */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    sound.playClick();
                    setDrillIndex(prev => Math.max(0, prev - 1));
                  }}
                  disabled={drillIndex === 0}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold text-slate-700 transition"
                >
                  Câu trước
                </button>

                <span className="text-xs text-slate-400">
                  {drillIndex + 1} / {drillQuestions.length}
                </span>

                <button
                  onClick={() => {
                    sound.playClick();
                    setDrillIndex(prev => Math.min(drillQuestions.length - 1, prev + 1));
                  }}
                  disabled={drillIndex === drillQuestions.length - 1}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition"
                >
                  Câu tiếp theo
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
              Không có câu hỏi nào thuộc thể loại này.
            </div>
          )}
        </main>
      )}

      {/* ======================================================== */}
      {/* 6. VIEW 5: MISTAKES NOTEBOOK (SỔ TAY CÂU SAI) */}
      {/* ======================================================== */}
      {viewMode === 'mistakes' && (
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>❌</span>
                  <span>Sổ Tay Câu Sai &amp; Ôn Lại Đến Khi Thuộc</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Tập hợp các câu bạn từng làm sai trong các lần làm bài thi. Luyện lại tại đây để nhớ sâu bản chất!
                </p>
              </div>

              {savedMistakes.length > 0 && (
                <button
                  onClick={() => {
                    sound.playClick();
                    if (confirm('Bạn có chắc muốn xóa tất cả câu trong sổ tay câu sai?')) {
                      setSavedMistakes([]);
                    }
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-rose-600 transition"
                >
                  Xóa sạch sổ tay
                </button>
              )}
            </div>

            {mistakeQuestionsList.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl mb-3">
                  ✨
                </div>
                <h4 className="text-base font-black text-slate-900 mb-1">
                  Sổ tay của bạn đang trống!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Không có câu hỏi nào bị sai hoặc bạn đã sửa đúng hết tất cả. Thật tuyệt vời!
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setViewMode('hub');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
                >
                  Vào Làm Đề Thi Ngay
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {mistakeQuestionsList.map(q => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 hover:border-rose-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                          {q.examTitle} · {q.exerciseTitle}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          {q.questionPrompt}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setSavedMistakes(prev => prev.filter(id => id !== q.id));
                        }}
                        className="text-xs text-slate-400 hover:text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 shrink-0"
                        title="Đánh dấu đã hiểu và xóa khỏi sổ câu sai"
                      >
                        ✓ Đã thuộc
                      </button>
                    </div>

                    <div className="text-xs mb-2">
                      <span className="font-bold text-slate-700">Đáp án chính xác: </span>
                      <span className="text-indigo-700 font-black">{q.correctAnswer}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white text-xs text-slate-700 leading-relaxed border border-slate-200">
                      <span className="font-bold text-slate-900">💡 Giải thích: </span>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ======================================================== */}
      {/* 7. EXIT CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-2xl mb-3">
              ⚠️
            </div>
            <h4 className="text-base font-black text-slate-900 mb-1">
              Rời Khỏi Bài Thi?
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Bạn đang làm bài thi. Nếu rời khỏi bây giờ, bài thi hiện tại sẽ không được lưu điểm.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  setViewMode('hub');
                }}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
              >
                Rời khỏi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. SUBMIT CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-2xl mb-3">
              📝
            </div>
            <h4 className="text-base font-black text-slate-900 mb-1">
              Nộp Bài Thi Ngay?
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Bạn đã hoàn thành{' '}
              <span className="font-bold text-slate-900">
                {Object.keys(userAnswers).length}
              </span>{' '}
              trên tổng số{' '}
              <span className="font-bold text-slate-900">
                {currentExam.questions.length}
              </span>{' '}
              câu hỏi.
              {Object.keys(userAnswers).length < currentExam.questions.length && (
                <span className="text-rose-600 font-bold block mt-1">
                  (Còn {currentExam.questions.length - Object.keys(userAnswers).length} câu chưa làm!)
                </span>
              )}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                Kiểm tra lại
              </button>
              <button
                onClick={() => handleFinalSubmitExam(false)}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-xs"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
