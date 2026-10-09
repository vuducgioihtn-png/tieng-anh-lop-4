/**
 * Tiếng Anh Lớp 4 - Global Success (Tập 1 & Tập 2)
 * Ứng Dụng Học Tương Tác & Cẩm Nang Đồng Hành Cùng Con
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Award,
  Users,
  ChevronDown,
  Layers,
  Settings,
  Compass,
  CheckCircle2,
  Flame,
  MessageSquare,
  Shield,
  UserPlus,
  LogIn,
  LogOut,
  Clock,
  UserCheck,
  User
} from 'lucide-react';
import { CURRICULUM_UNITS, ALL_UNITS_SUMMARY, CHARACTERS, UnitData } from './data/curriculum';
import { VocabSection } from './components/VocabSection';
import { GrammarSection } from './components/GrammarSection';
import { PhonicsSection } from './components/PhonicsSection';
import { GamesSection } from './components/GamesSection';
import { ParentGuideSection } from './components/ParentGuideSection';
import { Unit1Lesson1Studio } from './components/Unit1Lesson1Studio';
import { Unit1Lesson2Studio } from './components/Unit1Lesson2Studio';
import { Unit1Lesson3Studio } from './components/Unit1Lesson3Studio';
import { Unit2Studio } from './components/Unit2Studio';
import { Unit3Studio } from './components/Unit3Studio';
import { Unit4Studio } from './components/Unit4Studio';
import { Unit5Studio } from './components/Unit5Studio';
import { Unit6Studio } from './components/Unit6Studio';
import { Unit7Studio } from './components/Unit7Studio';
import { Unit8Studio } from './components/Unit8Studio';
import { Unit9Studio } from './components/Unit9Studio';
import { Unit10Studio } from './components/Unit10Studio';
import { Unit11Studio } from './components/Unit11Studio';
import { Unit12Studio } from './components/Unit12Studio';
import { Unit13Studio } from './components/Unit13Studio';
import { Unit14Studio } from './components/Unit14Studio';
import { Unit15Studio } from './components/Unit15Studio';
import { Unit16Studio } from './components/Unit16Studio';
import { Unit17Studio } from './components/Unit17Studio';
import { Unit18Studio } from './components/Unit18Studio';
import { Unit19Studio } from './components/Unit19Studio';
import { Unit20Studio } from './components/Unit20Studio';
import { Review1Studio } from './components/Review1Studio';
import { Review2Studio } from './components/Review2Studio';
import { Review3Studio } from './components/Review3Studio';
import { Review4Studio } from './components/Review4Studio';
import { WordlistStudio } from './components/WordlistStudio';
import { ExamStudio } from './components/ExamStudio';
import { VoiceStudioModal } from './components/VoiceStudioModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboardModal } from './components/auth/AdminDashboardModal';
import { authService } from './services/authService';
import { UserProfile } from './types/auth';
import { sound, speakWord } from './utils/audio';

type ActiveViewTab = 'lesson1' | 'lesson2' | 'lesson3' | 'unit2' | 'unit3' | 'unit4' | 'unit5' | 'review1' | 'unit6' | 'unit7' | 'unit8' | 'unit9' | 'unit10' | 'unit11' | 'unit12' | 'unit13' | 'unit14' | 'unit15' | 'unit16' | 'unit17' | 'unit18' | 'unit19' | 'unit20' | 'review2' | 'review3' | 'review4' | 'wordlist' | 'exam' | 'vocab' | 'grammar' | 'phonics' | 'games' | 'parent';

export default function App() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('lesson1');
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [volumeFilter, setVolumeFilter] = useState<1 | 2>(1);
  const [showUnitMenu, setShowUnitMenu] = useState<boolean>(false);
  const [showCharactersModal, setShowCharactersModal] = useState<boolean>(false);
  const [showVoiceStudio, setShowVoiceStudio] = useState<boolean>(false);

  // User Authentication & Admin Approval State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'register' | 'login'>('register');
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState<number>(() => {
    return authService.getAllUsers().filter(u => u.status === 'pending').length;
  });

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setPendingApprovalsCount(authService.getAllUsers().filter(u => u.status === 'pending').length);
  };

  const handleUserApproved = () => {
    setCurrentUser(authService.getCurrentUser());
    setPendingApprovalsCount(authService.getAllUsers().filter(u => u.status === 'pending').length);
  };

  // Gamification state (stored in localStorage)
  const [totalStars, setTotalStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ta4_stars');
      return saved ? parseInt(saved, 10) : 25;
    }
    return 25;
  });

  const [streakDays] = useState<number>(3);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ta4_stars', totalStars.toString());
    }
  }, [totalStars]);

  const addStar = (count: number) => {
    setTotalStars(prev => prev + count);
  };

  // Current active unit data
  const currentUnit: UnitData =
    CURRICULUM_UNITS.find(u => u.id === selectedUnitId) || CURRICULUM_UNITS[0];

  const currentUnitSummary = ALL_UNITS_SUMMARY.find(u => u.id === selectedUnitId);
  const currentIcon = currentUnitSummary?.icon || '📚';

  // Change unit handler
  const handleSelectUnit = (unitId: string) => {
    sound.playClick();
    setSelectedUnitId(unitId);
    if (unitId === 'unit-1') {
      setActiveTab('lesson1');
    } else if (unitId === 'unit-2') {
      setActiveTab('unit2');
    } else if (unitId === 'unit-3') {
      setActiveTab('unit3');
    } else if (unitId === 'unit-4') {
      setActiveTab('unit4');
    } else if (unitId === 'unit-5') {
      setActiveTab('unit5');
    } else if (unitId === 'review-1') {
      setActiveTab('review1');
    } else if (unitId === 'unit-6') {
      setActiveTab('unit6');
    } else if (unitId === 'unit-7') {
      setActiveTab('unit7');
    } else if (unitId === 'unit-8') {
      setActiveTab('unit8');
    } else if (unitId === 'unit-9') {
      setActiveTab('unit9');
    } else if (unitId === 'unit-10') {
      setActiveTab('unit10');
    } else if (unitId === 'unit-11') {
      setActiveTab('unit11');
    } else if (unitId === 'unit-12') {
      setActiveTab('unit12');
    } else if (unitId === 'unit-13') {
      setActiveTab('unit13');
    } else if (unitId === 'unit-14') {
      setActiveTab('unit14');
    } else if (unitId === 'unit-15') {
      setActiveTab('unit15');
    } else if (unitId === 'unit-16') {
      setActiveTab('unit16');
    } else if (unitId === 'unit-17') {
      setActiveTab('unit17');
    } else if (unitId === 'unit-18') {
      setActiveTab('unit18');
    } else if (unitId === 'unit-19') {
      setActiveTab('unit19');
    } else if (unitId === 'unit-20') {
      setActiveTab('unit20');
    } else if (unitId === 'review-4') {
      setActiveTab('review4');
    } else if (unitId === 'review-3') {
      setActiveTab('review3');
    } else if (unitId === 'review-2') {
      setActiveTab('review2');
    } else if (unitId === 'wordlist-1' || unitId === 'wordlist-2' || unitId === 'wordlist') {
      setActiveTab('wordlist');
    } else if (unitId === 'exam-hub' || unitId === 'exam') {
      setActiveTab('exam');
    } else if (activeTab === 'lesson1' || activeTab === 'lesson2' || activeTab === 'lesson3' || activeTab === 'unit2' || activeTab === 'unit3' || activeTab === 'unit4' || activeTab === 'unit5' || activeTab === 'review1' || activeTab === 'unit6' || activeTab === 'unit7' || activeTab === 'unit8' || activeTab === 'unit9' || activeTab === 'unit10' || activeTab === 'unit11' || activeTab === 'unit12' || activeTab === 'unit13' || activeTab === 'unit14' || activeTab === 'unit15' || activeTab === 'unit16' || activeTab === 'unit17' || activeTab === 'unit18' || activeTab === 'unit19' || activeTab === 'unit20' || activeTab === 'review2' || activeTab === 'review3' || activeTab === 'review4' || activeTab === 'wordlist' || activeTab === 'exam') {
      setActiveTab('vocab');
    }
    setShowUnitMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* ================= ZONE 1: TOP BAR CONTRACT ================= */}
      {/* [Brand title, one line] — [4–6 nav links] — [1–2 primary actions] */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleSelectUnit('unit-1')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              title="Quay về bài học Unit 1"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-sm ring-2 ring-indigo-100 group-hover:scale-105 transition-transform">
                4
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                    Tiếng Anh 4
                  </span>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
                    Global Success
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium block">
                  Kết Nối Tri Thức Với Cuộc Sống
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Refined Segmented Navigation Tabs (Desktop XL) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/60">
            {selectedUnitId === 'unit-1' && (
              <>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('lesson1');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'lesson1'
                      ? 'bg-white text-sky-700 shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>🌟</span>
                  <span>Tiết 1 (Trang 10 - 11)</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('lesson2');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'lesson2'
                      ? 'bg-white text-emerald-700 shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>🚀</span>
                  <span>Tiết 2 (Trang 12 - 13)</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('lesson3');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'lesson3'
                      ? 'bg-white text-teal-700 shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>🎯</span>
                  <span>Tiết 3 (Trang 14 - 15)</span>
                </button>
              </>
            )}

            {selectedUnitId === 'unit-2' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit2');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit2'
                    ? 'bg-white text-rose-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>⏰</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 16 - 21)</span>
              </button>
            )}

            {selectedUnitId === 'unit-3' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit3');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit3'
                    ? 'bg-white text-amber-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>📅</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 22 - 27)</span>
              </button>
            )}

            {selectedUnitId === 'unit-4' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit4');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit4'
                    ? 'bg-white text-rose-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🎂</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 28 - 33)</span>
              </button>
            )}

            {selectedUnitId === 'unit-5' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit5');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit5'
                    ? 'bg-white text-teal-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🚴</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 34 - 39)</span>
              </button>
            )}

            {selectedUnitId === 'review-1' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('review1');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'review1'
                    ? 'bg-white text-amber-800 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏆</span>
                <span>Review 1 & Mở Rộng (Trang 40 - 43)</span>
              </button>
            )}

            {selectedUnitId === 'unit-6' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit6');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit6'
                    ? 'bg-white text-blue-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏫</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 44 - 49)</span>
              </button>
            )}

            {selectedUnitId === 'unit-7' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit7');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit7'
                    ? 'bg-white text-purple-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🗓️</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 50 - 55)</span>
              </button>
            )}

            {selectedUnitId === 'unit-8' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit8');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit8'
                    ? 'bg-white text-rose-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🎨</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 56 - 61)</span>
              </button>
            )}

            {selectedUnitId === 'unit-9' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit9');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit9'
                    ? 'bg-white text-orange-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏆</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 62 - 67)</span>
              </button>
            )}

            {selectedUnitId === 'unit-10' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit10');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit10'
                    ? 'bg-white text-teal-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏖️</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 68 - 73)</span>
              </button>
            )}

            {selectedUnitId === 'unit-11' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit11');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit11'
                    ? 'bg-white text-emerald-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏡</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 6 - 11)</span>
              </button>
            )}

            {selectedUnitId === 'unit-12' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit12');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit12'
                    ? 'bg-white text-sky-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>👨‍💼</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 12 - 17)</span>
              </button>
            )}

            {selectedUnitId === 'unit-13' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit13');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit13'
                    ? 'bg-white text-purple-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>👤</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 18 - 23)</span>
              </button>
            )}

            {selectedUnitId === 'unit-14' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit14');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit14'
                    ? 'bg-white text-amber-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🧹</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 24 - 29)</span>
              </button>
            )}

            {selectedUnitId === 'unit-15' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit15');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit15'
                    ? 'bg-white text-teal-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🎾</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 30 - 35)</span>
              </button>
            )}

            {selectedUnitId === 'unit-16' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit16');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit16'
                    ? 'bg-white text-sky-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>⛅</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 40 - 45)</span>
              </button>
            )}

            {selectedUnitId === 'unit-17' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit17');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit17'
                    ? 'bg-white text-blue-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🚦</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 46 - 51)</span>
              </button>
            )}

            {selectedUnitId === 'unit-18' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit18');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit18'
                    ? 'bg-white text-pink-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🛍️</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 52 - 57)</span>
              </button>
            )}

            {selectedUnitId === 'unit-19' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit19');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit19'
                    ? 'bg-white text-amber-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🦁</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 58 - 63)</span>
              </button>
            )}

            {selectedUnitId === 'unit-20' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('unit20');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'unit20'
                    ? 'bg-white text-orange-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>⛺</span>
                <span>Bài Học SGK (Tiết 1, 2, 3 · Trang 64 - 69)</span>
              </button>
            )}

            {selectedUnitId === 'review-4' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('review4');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'review4'
                    ? 'bg-white text-rose-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏆</span>
                <span>Bài Học SGK (Review 4 · Trang 70 - 71)</span>
              </button>
            )}

            {selectedUnitId === 'review-3' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('review3');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'review3'
                    ? 'bg-white text-indigo-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏆</span>
                <span>Bài Học SGK (Review 3 · Trang 36 - 39)</span>
              </button>
            )}

            {selectedUnitId === 'review-2' && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('review2');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'review2'
                    ? 'bg-white text-amber-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>🏆</span>
                <span>Review 2 &amp; Extension (Trang 74 - 77)</span>
              </button>
            )}

            {(selectedUnitId === 'wordlist-1' || selectedUnitId === 'wordlist-2') && (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('wordlist');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'wordlist'
                    ? 'bg-white text-blue-700 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>📑</span>
                <span>{selectedUnitId === 'wordlist-2' ? 'Wordlist Tập 2 (Trang 74 - 75)' : 'Wordlist Tập 1 (Trang 78 - 80)'}</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('exam');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'exam'
                  ? 'bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 text-white shadow-sm font-black ring-2 ring-indigo-300'
                  : 'bg-rose-50 text-rose-700 hover:text-rose-900 hover:bg-rose-100 font-bold border border-rose-200'
              }`}
            >
              <span>📝</span>
              <span>Đề Thi Học Kì</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                  activeTab === 'exam' ? 'bg-white text-indigo-700' : 'bg-rose-600 text-white'
                }`}
              >
                13 Đề
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('wordlist');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'wordlist'
                  ? 'bg-white text-blue-700 shadow-sm font-black ring-1 ring-blue-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>📑</span>
              <span>Wordlist SGK</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('vocab');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-white text-indigo-700 shadow-sm font-black ring-1 ring-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🃏</span>
              <span>Từ Vựng · Flashcard · Nghe Viết</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('grammar');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-white text-indigo-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>💬</span>
              <span>Ngữ Pháp</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('phonics');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'phonics'
                  ? 'bg-white text-purple-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🗣️</span>
              <span>Phonics</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('games');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'games'
                  ? 'bg-white text-amber-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🎲</span>
              <span>Luyện Tập</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('parent');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'parent'
                  ? 'bg-rose-50 text-rose-700 shadow-sm font-black border border-rose-200'
                  : 'text-rose-600 hover:text-rose-800 hover:bg-rose-50/50'
              }`}
            >
              <span>❤️</span>
              <span>Phụ Huynh</span>
            </button>
          </nav>

          {/* Zone 3: Control Dock (Audio, Stars, Unit Picker) */}
          <div className="flex items-center gap-2.5">
            {/* Audio Voice & Speed Control Pill */}
            <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shadow-2xs">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowVoiceStudio(true);
                }}
                title="Giọng Google US English (Anh - Anh) chất lượng cao. Bấm để tinh chỉnh độ vang và tốc độ."
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-700 hover:text-rose-700 hover:bg-white transition-all"
              >
                <span>🎙️</span>
                <span className="hidden sm:inline">Google US English (Anh - Anh)</span>
                <Volume2 className="w-3.5 h-3.5 text-rose-600" />
              </button>

              <div className="w-px h-4 bg-slate-200 mx-0.5" />

              <button
                onClick={() => {
                  sound.playClick();
                  setSpeechRate(prev => (prev === 0.88 ? 0.72 : 0.88));
                }}
                title="Chỉnh tốc độ giọng đọc"
                className="px-2 py-1 rounded-xl text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:bg-white transition-all font-mono"
              >
                {speechRate < 0.8 ? '0.7x' : '0.9x'}
              </button>
            </div>

            {/* Stars count */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl text-amber-900 font-black text-xs tabular-nums shadow-xs">
              <span className="text-amber-500">⭐</span>
              <span>{totalStars}</span>
            </div>

            {/* Admin Approval Dashboard Button */}
            {currentUser?.role === 'admin' ? (
              <button
                onClick={() => {
                  sound.playClick();
                  setShowAdminModal(true);
                }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-xs shadow-xs hover:brightness-105 transition active:scale-95 whitespace-nowrap"
                title="Phê duyệt học sinh vào học"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Duyệt Học Sinh</span>
                {pendingApprovalsCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full text-[10px] font-black animate-pulse">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            ) : null}

            {/* User Account / Profile / Register Button */}
            {currentUser ? (
              <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1 border border-slate-200">
                <button
                  onClick={() => {
                    sound.playClick();
                    if (currentUser.role === 'admin') {
                      setShowAdminModal(true);
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-white transition"
                  title={`Tài khoản: ${currentUser.fullName} (${currentUser.role === 'admin' ? 'Quản Trị Viên' : currentUser.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'})`}
                >
                  <span className="text-sm">{currentUser.avatarEmoji || (currentUser.role === 'admin' ? '👨‍🏫' : '👦')}</span>
                  <span className="max-w-[70px] sm:max-w-[110px] truncate font-black hidden sm:inline">
                    {currentUser.fullName}
                  </span>
                  {currentUser.status === 'pending' ? (
                    <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded-full animate-pulse">
                      Chờ duyệt ⏳
                    </span>
                  ) : currentUser.role === 'admin' ? (
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-black px-1.5 py-0.2 rounded-full">
                      Admin
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded-full">
                      {currentUser.schoolClass || 'Đã duyệt'} ✓
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    authService.logout();
                    setCurrentUser(null);
                  }}
                  className="p-1 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-white transition"
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    sound.playClick();
                    setAuthModalTab('register');
                    setShowAuthModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black text-xs shadow-xs transition active:scale-95 whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Đăng Ký Vào Học</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setAuthModalTab('login');
                    setShowAuthModal(true);
                  }}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Đăng nhập</span>
                </button>
              </div>
            )}

            {/* Unit Picker button */}
            <div className="relative">
              <button
                onClick={() => setShowUnitMenu(!showUnitMenu)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span className="text-sm">{currentIcon}</span>
                <span>{selectedUnitId === 'review-1' ? 'Review 1' : `Unit ${currentUnit.unitNumber}`}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    showUnitMenu ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {/* Unit Dropdown / Navigation Sheet */}
              {showUnitMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Chọn bài học trong SGK
                    </span>
                    {/* Volume filter tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setVolumeFilter(1)}
                        className={`px-2 py-0.5 text-xs font-bold rounded ${
                          volumeFilter === 1 ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        Tập 1
                      </button>
                      <button
                        onClick={() => setVolumeFilter(2)}
                        className={`px-2 py-0.5 text-xs font-bold rounded ${
                          volumeFilter === 2 ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        Tập 2
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 max-h-80 overflow-y-auto space-y-1.5 pr-1">
                    {ALL_UNITS_SUMMARY.filter(u => u.volume === volumeFilter).map(unit => {
                      const isSelected = selectedUnitId === unit.id;
                      const hasDetailedContent = CURRICULUM_UNITS.some(cu => cu.id === unit.id);

                      return (
                        <button
                          key={unit.id}
                          onClick={() => handleSelectUnit(unit.id)}
                          className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-sky-50 text-sky-900 font-bold border border-sky-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{unit.icon}</span>
                            <div>
                              <div className="text-xs font-bold">
                                {unit.id.startsWith('review') || unit.id.startsWith('wordlist') || unit.id === 'exam-hub'
                                  ? unit.title
                                  : `Unit ${unit.unitNumber}: ${unit.title}`}
                              </div>
                              <div className="text-[11px] text-slate-500 font-normal">
                                {unit.vietnameseTitle} · {unit.pageTextbook}
                              </div>
                            </div>
                          </div>

                          {(hasDetailedContent || unit.id === 'review-1') && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              {unit.id === 'review-1' ? 'Chuẩn SGK' : 'Đủ 5 phần'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View Tabs Strip */}
        <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-slate-100/90 border-t border-slate-200 text-xs font-bold no-scrollbar">
          {selectedUnitId === 'unit-1' && (
            <>
              <button
                onClick={() => setActiveTab('lesson1')}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeTab === 'lesson1' ? 'bg-white text-sky-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
                }`}
              >
                <span>🌟</span>
                <span>Tiết 1</span>
              </button>

              <button
                onClick={() => setActiveTab('lesson2')}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeTab === 'lesson2' ? 'bg-white text-emerald-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
                }`}
              >
                <span>🚀</span>
                <span>Tiết 2</span>
              </button>

              <button
                onClick={() => setActiveTab('lesson3')}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeTab === 'lesson3' ? 'bg-white text-teal-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
                }`}
              >
                <span>🎯</span>
                <span>Tiết 3</span>
              </button>
            </>
          )}
          {selectedUnitId === 'unit-2' && (
            <button
              onClick={() => setActiveTab('unit2')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit2' ? 'bg-white text-rose-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>⏰</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-3' && (
            <button
              onClick={() => setActiveTab('unit3')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit3' ? 'bg-white text-amber-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>📅</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-4' && (
            <button
              onClick={() => setActiveTab('unit4')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit4' ? 'bg-white text-rose-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🎂</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-5' && (
            <button
              onClick={() => setActiveTab('unit5')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit5' ? 'bg-white text-teal-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🚴</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'review-1' && (
            <button
              onClick={() => setActiveTab('review1')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'review1' ? 'bg-white text-amber-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏆</span>
              <span>Review 1 SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-6' && (
            <button
              onClick={() => setActiveTab('unit6')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit6' ? 'bg-white text-blue-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏫</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-7' && (
            <button
              onClick={() => setActiveTab('unit7')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit7' ? 'bg-white text-purple-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🗓️</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-8' && (
            <button
              onClick={() => setActiveTab('unit8')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit8' ? 'bg-white text-rose-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🎨</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-9' && (
            <button
              onClick={() => setActiveTab('unit9')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit9' ? 'bg-white text-orange-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏆</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-10' && (
            <button
              onClick={() => setActiveTab('unit10')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit10' ? 'bg-white text-teal-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏖️</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-11' && (
            <button
              onClick={() => setActiveTab('unit11')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit11' ? 'bg-white text-emerald-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏡</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-12' && (
            <button
              onClick={() => setActiveTab('unit12')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit12' ? 'bg-white text-sky-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>👨‍💼</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-13' && (
            <button
              onClick={() => setActiveTab('unit13')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit13' ? 'bg-white text-purple-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>👤</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-14' && (
            <button
              onClick={() => setActiveTab('unit14')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit14' ? 'bg-white text-amber-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🧹</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-15' && (
            <button
              onClick={() => setActiveTab('unit15')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit15' ? 'bg-white text-teal-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🎾</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-16' && (
            <button
              onClick={() => setActiveTab('unit16')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit16' ? 'bg-white text-sky-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>⛅</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-17' && (
            <button
              onClick={() => setActiveTab('unit17')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit17' ? 'bg-white text-blue-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🚦</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-18' && (
            <button
              onClick={() => setActiveTab('unit18')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit18' ? 'bg-white text-pink-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🛍️</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-19' && (
            <button
              onClick={() => setActiveTab('unit19')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit19' ? 'bg-white text-amber-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🦁</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'unit-20' && (
            <button
              onClick={() => setActiveTab('unit20')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'unit20' ? 'bg-white text-orange-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>⛺</span>
              <span>Bài Học SGK</span>
            </button>
          )}
          {selectedUnitId === 'review-4' && (
            <button
              onClick={() => setActiveTab('review4')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'review4' ? 'bg-white text-rose-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏆</span>
              <span>Review 4</span>
            </button>
          )}
          {selectedUnitId === 'review-3' && (
            <button
              onClick={() => setActiveTab('review3')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'review3' ? 'bg-white text-indigo-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏆</span>
              <span>Review 3</span>
            </button>
          )}
          {selectedUnitId === 'review-2' && (
            <button
              onClick={() => setActiveTab('review2')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'review2' ? 'bg-white text-amber-800 shadow-xs font-black border border-slate-200' : 'text-slate-600'
              }`}
            >
              <span>🏆</span>
              <span>Review 2</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'exam'
                ? 'bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 text-white shadow-xs font-black'
                : 'text-rose-700 bg-rose-50 border border-rose-200'
            }`}
          >
            <span>📝</span>
            <span>Đề Thi (13 Đề)</span>
          </button>
          <button
            onClick={() => setActiveTab('wordlist')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'wordlist' ? 'bg-white text-blue-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
            }`}
          >
            <span>📑</span>
            <span>Wordlist SGK</span>
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'vocab' ? 'bg-white text-indigo-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
            }`}
          >
            <span>🃏</span>
            <span>Flashcard &amp; Nghe Viết</span>
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'grammar' ? 'bg-white text-indigo-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
            }`}
          >
            <span>💬</span>
            <span>Ngữ Pháp</span>
          </button>
          <button
            onClick={() => setActiveTab('phonics')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'phonics' ? 'bg-white text-purple-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
            }`}
          >
            <span>🗣️</span>
            <span>Phonics</span>
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'games' ? 'bg-white text-amber-700 shadow-xs font-black border border-slate-200' : 'text-slate-600'
            }`}
          >
            <span>🎲</span>
            <span>Luyện Tập</span>
          </button>
          <button
            onClick={() => setActiveTab('parent')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === 'parent' ? 'bg-rose-50 text-rose-700 shadow-xs font-black border border-rose-200' : 'text-rose-600'
            }`}
          >
            <span>❤️</span>
            <span>Phụ Huynh</span>
          </button>
        </div>
      </header>

      {/* ================= PENDING APPROVAL NOTIFICATION BANNER ================= */}
      {currentUser?.status === 'pending' && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-amber-950 border-b border-amber-500 px-4 py-3 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">⏳</span>
              <div>
                <span className="font-black text-sm">
                  Chào em {currentUser.fullName} ({currentUser.schoolClass})! Hồ sơ xin vào học đang chờ Thầy/Cô phê duyệt.
                </span>
                <p className="text-[11px] text-amber-900 mt-0.5 font-medium">
                  Em đang ở chế độ học thử. Sau khi Thầy/Cô duyệt tài khoản, em sẽ mở khóa 100% tất cả 20 Unit, bài thi và ôn tập!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  authService.switchUser('user-admin-1');
                  setCurrentUser(authService.getCurrentUser());
                  setShowAdminModal(true);
                }}
                className="px-3.5 py-1.5 bg-amber-950 hover:bg-black text-amber-100 rounded-xl font-black text-xs transition shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Chuyển Sang Admin Duyệt Thử Ngay ⚡</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO UNIT BANNER ================= */}
      <section className="bg-gradient-to-b from-white via-white to-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5">
              {/* Clean typographic breadcrumb metadata without pills */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Sách Giáo Khoa Lớp 4 (Tập {currentUnit.volume})</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span>Chủ điểm: {currentUnit.theme}</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span className="text-indigo-700 font-bold">Unit {currentUnit.unitNumber}</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  {currentIcon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Unit {currentUnit.unitNumber}: {currentUnit.title}
                    </h1>
                    <button
                      onClick={() => speakWord(currentUnit.title, speechRate)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      title="Nghe phát âm tiêu đề bài học"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    {currentUnit.vietnameseTitle} — Giúp học sinh hiểu sâu bản chất, ghi nhớ nhanh qua hình ảnh và bố mẹ dễ dàng đồng hành.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowCharactersModal(true)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-indigo-600" />
                <span>10 Nhân Vật SGK</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('parent');
                }}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <span>👨‍👩‍👧 Góc Phụ Huynh</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'lesson1' && selectedUnitId === 'unit-1' && (
          <Unit1Lesson1Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToLesson2={() => setActiveTab('lesson2')}
            onSwitchToLesson3={() => setActiveTab('lesson3')}
          />
        )}

        {activeTab === 'lesson2' && selectedUnitId === 'unit-1' && (
          <Unit1Lesson2Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToLesson1={() => setActiveTab('lesson1')}
            onSwitchToLesson3={() => setActiveTab('lesson3')}
          />
        )}

        {activeTab === 'lesson3' && selectedUnitId === 'unit-1' && (
          <Unit1Lesson3Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToLesson1={() => setActiveTab('lesson1')}
            onSwitchToLesson2={() => setActiveTab('lesson2')}
          />
        )}

        {activeTab === 'unit2' && selectedUnitId === 'unit-2' && (
          <Unit2Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
            onSwitchToUnit3={() => handleSelectUnit('unit-3')}
          />
        )}

        {activeTab === 'unit3' && selectedUnitId === 'unit-3' && (
          <Unit3Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit2={() => handleSelectUnit('unit-2')}
            onSwitchToUnit4={() => handleSelectUnit('unit-4')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit4' && selectedUnitId === 'unit-4' && (
          <Unit4Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit3={() => handleSelectUnit('unit-3')}
            onSwitchToUnit5={() => handleSelectUnit('unit-5')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit5' && selectedUnitId === 'unit-5' && (
          <Unit5Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit4={() => handleSelectUnit('unit-4')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit6={() => handleSelectUnit('unit-6')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'review1' || selectedUnitId === 'review-1') && (
          <Review1Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
            onSwitchToUnit5={() => handleSelectUnit('unit-5')}
            onSwitchToUnit6={() => handleSelectUnit('unit-6')}
          />
        )}

        {activeTab === 'unit6' && selectedUnitId === 'unit-6' && (
          <Unit6Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit5={() => handleSelectUnit('unit-5')}
            onSwitchToUnit7={() => handleSelectUnit('unit-7')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit7' && selectedUnitId === 'unit-7' && (
          <Unit7Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit6={() => handleSelectUnit('unit-6')}
            onSwitchToUnit8={() => handleSelectUnit('unit-8')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit8' && selectedUnitId === 'unit-8' && (
          <Unit8Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit7={() => handleSelectUnit('unit-7')}
            onSwitchToUnit9={() => handleSelectUnit('unit-9')}
            onSwitchToUnit6={() => handleSelectUnit('unit-6')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit9' && selectedUnitId === 'unit-9' && (
          <Unit9Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit8={() => handleSelectUnit('unit-8')}
            onSwitchToUnit10={() => handleSelectUnit('unit-10')}
            onSwitchToUnit7={() => handleSelectUnit('unit-7')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {activeTab === 'unit10' && selectedUnitId === 'unit-10' && (
          <Unit10Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit9={() => handleSelectUnit('unit-9')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToUnit8={() => handleSelectUnit('unit-8')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit11' || selectedUnitId === 'unit-11') && (
          <Unit11Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit10={() => handleSelectUnit('unit-10')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit12' || selectedUnitId === 'unit-12') && (
          <Unit12Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit13={() => handleSelectUnit('unit-13')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToUnit10={() => handleSelectUnit('unit-10')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit13' || selectedUnitId === 'unit-13') && (
          <Unit13Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit14={() => handleSelectUnit('unit-14')}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToUnit10={() => handleSelectUnit('unit-10')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit14' || selectedUnitId === 'unit-14') && (
          <Unit14Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit15={() => handleSelectUnit('unit-15')}
            onSwitchToUnit13={() => handleSelectUnit('unit-13')}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit15' || selectedUnitId === 'unit-15') && (
          <Unit15Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToUnit14={() => handleSelectUnit('unit-14')}
            onSwitchToUnit13={() => handleSelectUnit('unit-13')}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'review3' || selectedUnitId === 'review-3') && (
          <Review3Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit16={() => handleSelectUnit('unit-16')}
            onSwitchToUnit15={() => handleSelectUnit('unit-15')}
            onSwitchToUnit14={() => handleSelectUnit('unit-14')}
            onSwitchToUnit13={() => handleSelectUnit('unit-13')}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit16' || selectedUnitId === 'unit-16') && (
          <Unit16Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit17={() => handleSelectUnit('unit-17')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToUnit15={() => handleSelectUnit('unit-15')}
            onSwitchToUnit14={() => handleSelectUnit('unit-14')}
            onSwitchToUnit13={() => handleSelectUnit('unit-13')}
            onSwitchToUnit12={() => handleSelectUnit('unit-12')}
            onSwitchToUnit11={() => handleSelectUnit('unit-11')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'unit17' || selectedUnitId === 'unit-17') && (
          <Unit17Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit18={() => handleSelectUnit('unit-18')}
            onSwitchToUnit16={() => handleSelectUnit('unit-16')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToUnit15={() => handleSelectUnit('unit-15')}
            onSwitchToUnit14={() => handleSelectUnit('unit-14')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
          />
        )}

        {(activeTab === 'unit18' || selectedUnitId === 'unit-18') && (
          <Unit18Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit19={() => handleSelectUnit('unit-19')}
            onSwitchToUnit17={() => handleSelectUnit('unit-17')}
            onSwitchToUnit16={() => handleSelectUnit('unit-16')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
          />
        )}

        {(activeTab === 'unit19' || selectedUnitId === 'unit-19') && (
          <Unit19Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit20={() => handleSelectUnit('unit-20')}
            onSwitchToUnit18={() => handleSelectUnit('unit-18')}
            onSwitchToUnit17={() => handleSelectUnit('unit-17')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
          />
        )}

        {(activeTab === 'unit20' || selectedUnitId === 'unit-20') && (
          <Unit20Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToReview4={() => handleSelectUnit('review-4')}
            onSwitchToUnit19={() => handleSelectUnit('unit-19')}
            onSwitchToUnit18={() => handleSelectUnit('unit-18')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-2')}
          />
        )}

        {(activeTab === 'review4' || selectedUnitId === 'review-4') && (
          <Review4Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit20={() => handleSelectUnit('unit-20')}
            onSwitchToUnit19={() => handleSelectUnit('unit-19')}
            onSwitchToUnit18={() => handleSelectUnit('unit-18')}
            onSwitchToUnit17={() => handleSelectUnit('unit-17')}
            onSwitchToUnit16={() => handleSelectUnit('unit-16')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-2')}
          />
        )}

        {(activeTab === 'review2' || selectedUnitId === 'review-2') && (
          <Review2Studio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit10={() => handleSelectUnit('unit-10')}
            onSwitchToWordlist={() => handleSelectUnit('wordlist-1')}
            onSwitchToUnit9={() => handleSelectUnit('unit-9')}
            onSwitchToReview1={() => handleSelectUnit('review-1')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
          />
        )}

        {(activeTab === 'wordlist' || selectedUnitId === 'wordlist-1' || selectedUnitId === 'wordlist-2') && (
          <WordlistStudio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToReview4={() => handleSelectUnit('review-4')}
            onSwitchToUnit20={() => handleSelectUnit('unit-20')}
            onSwitchToUnit19={() => handleSelectUnit('unit-19')}
            onSwitchToUnit18={() => handleSelectUnit('unit-18')}
            onSwitchToReview3={() => handleSelectUnit('review-3')}
            onSwitchToReview2={() => handleSelectUnit('review-2')}
            onSwitchToUnit1={() => handleSelectUnit('unit-1')}
            initialVolume={selectedUnitId === 'wordlist-1' ? 1 : 2}
          />
        )}

        {(activeTab === 'exam' || selectedUnitId === 'exam-hub') && (
          <ExamStudio
            speechRate={speechRate}
            onAddStar={addStar}
            onOpenVoiceStudio={() => setShowVoiceStudio(true)}
            onSwitchToUnit={(uId) => handleSelectUnit(uId)}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabSection
            vocabList={currentUnit.vocabList}
            speechRate={speechRate}
            onAddStar={addStar}
            unitTitle={`${currentUnit.vietnameseTitle} (${currentUnit.title})`}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarSection
            grammarList={currentUnit.grammar}
            speechRate={speechRate}
            onAddStar={addStar}
          />
        )}

        {activeTab === 'phonics' && (
          <PhonicsSection
            phonics={currentUnit.phonics}
            speechRate={speechRate}
            onAddStar={addStar}
          />
        )}

        {activeTab === 'games' && (
          <GamesSection
            sentenceGames={currentUnit.sentenceGames}
            quizzes={currentUnit.quizzes}
            boardGameTiles={currentUnit.boardGameTiles}
            speechRate={speechRate}
            onAddStar={addStar}
          />
        )}

        {activeTab === 'parent' && (
          <ParentGuideSection
            guide={currentUnit.parentGuide}
            unitTitle={`Unit ${currentUnit.unitNumber} - ${currentUnit.title} (${currentUnit.vietnameseTitle})`}
            speechRate={speechRate}
          />
        )}
      </main>

      {/* ================= CHARACTERS MODAL ================= */}
      {showCharactersModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Các Nhân Vật Đồng Hành Trong Tiếng Anh 4 (Trang 5 & 8 SGK)
                </h3>
              </div>
              <button
                onClick={() => setShowCharactersModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {CHARACTERS.map((char, i) => (
                <div
                  key={i}
                  onClick={() => speakWord(`Hello! I'm ${char.name}.`, speechRate)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all text-center group"
                >
                  <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                    {char.avatar}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 group-hover:text-sky-700">
                    {char.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {char.desc}
                  </div>
                  <div className="mt-2 text-[10px] text-sky-600 font-semibold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Volume2 className="w-3 h-3" /> Chào bạn
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setShowCharactersModal(false)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VOICE STUDIO MODAL ================= */}
      <VoiceStudioModal
        isOpen={showVoiceStudio}
        onClose={() => setShowVoiceStudio(false)}
        currentSpeechRate={speechRate}
        onUpdateSpeechRate={setSpeechRate}
      />

      {/* ================= AUTH MODAL (ĐĂNG KÝ & ĐĂNG NHẬP) ================= */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        onAuthSuccess={handleAuthSuccess}
        onOpenAdminDashboard={() => setShowAdminModal(true)}
      />

      {/* ================= ADMIN APPROVAL DASHBOARD ================= */}
      <AdminDashboardModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        currentUser={currentUser}
        onUserApproved={handleUserApproved}
      />

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Tiếng Anh 4 - Global Success</span> · Nhà xuất bản Giáo dục Việt Nam & Macmillan Education.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span>Dành cho học sinh & cha mẹ Việt Nam</span>
            <span>·</span>
            <span>Âm thanh phát âm bản ngữ chuẩn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
