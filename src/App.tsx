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
import { HeaderNav } from './components/HeaderNav';
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
      <HeaderNav
        selectedUnitId={selectedUnitId}
        activeTab={activeTab}
        currentUnit={currentUnit}
        speechRate={speechRate}
        totalStars={totalStars}
        pendingApprovalsCount={pendingApprovalsCount}
        currentUser={currentUser}
        onSelectUnit={handleSelectUnit}
        onSelectTab={setActiveTab}
        onOpenVoiceStudio={() => setShowVoiceStudio(true)}
        onChangeSpeechRate={setSpeechRate}
        onOpenCharactersModal={() => setShowCharactersModal(true)}
        onOpenAdminModal={() => setShowAdminModal(true)}
        onOpenAuthModal={(tab) => {
          setAuthModalTab(tab);
          setShowAuthModal(true);
        }}
        onLogout={() => {
          authService.logout();
          setCurrentUser(null);
        }}
      />

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

      {/* ================= HERO UNIT BANNER (SHOWN DURING UNIT EXPLORATION) ================= */}
      {!['exam', 'wordlist', 'parent'].includes(activeTab) && (
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
              <div className="flex flex-wrap items-center gap-2">
                {selectedUnitId === 'unit-1' && ['lesson1', 'lesson2', 'lesson3'].includes(activeTab) && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('lesson1');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'lesson1'
                          ? 'bg-white text-sky-700 shadow-xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tiết 1 (Trang 10 - 11)
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('lesson2');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'lesson2'
                          ? 'bg-white text-emerald-700 shadow-xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tiết 2 (Trang 12 - 13)
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('lesson3');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeTab === 'lesson3'
                          ? 'bg-white text-teal-700 shadow-xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tiết 3 (Trang 14 - 15)
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setShowCharactersModal(true)}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/80 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span>10 Nhân Vật SGK</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('parent');
                  }}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1"
                >
                  <span>👨‍👩‍👧 Góc Phụ Huynh</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

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

        {activeTab === 'review1' && selectedUnitId === 'review-1' && (
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

        {activeTab === 'unit11' && selectedUnitId === 'unit-11' && (
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

        {activeTab === 'unit12' && selectedUnitId === 'unit-12' && (
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

        {activeTab === 'unit13' && selectedUnitId === 'unit-13' && (
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

        {activeTab === 'unit14' && selectedUnitId === 'unit-14' && (
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

        {activeTab === 'unit15' && selectedUnitId === 'unit-15' && (
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

        {activeTab === 'review3' && selectedUnitId === 'review-3' && (
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

        {activeTab === 'unit16' && selectedUnitId === 'unit-16' && (
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

        {activeTab === 'unit17' && selectedUnitId === 'unit-17' && (
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

        {activeTab === 'unit18' && selectedUnitId === 'unit-18' && (
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

        {activeTab === 'unit19' && selectedUnitId === 'unit-19' && (
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

        {activeTab === 'unit20' && selectedUnitId === 'unit-20' && (
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

        {activeTab === 'review4' && selectedUnitId === 'review-4' && (
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

        {activeTab === 'review2' && selectedUnitId === 'review-2' && (
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
