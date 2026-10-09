import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Users,
  ChevronDown,
  Shield,
  UserPlus,
  LogIn,
  LogOut,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ALL_UNITS_SUMMARY, UnitData } from '../data/curriculum';
import { UserProfile } from '../types/auth';
import { sound } from '../utils/audio';

export type ActiveViewTab =
  | 'lesson1'
  | 'lesson2'
  | 'lesson3'
  | 'unit2'
  | 'unit3'
  | 'unit4'
  | 'unit5'
  | 'review1'
  | 'unit6'
  | 'unit7'
  | 'unit8'
  | 'unit9'
  | 'unit10'
  | 'unit11'
  | 'unit12'
  | 'unit13'
  | 'unit14'
  | 'unit15'
  | 'unit16'
  | 'unit17'
  | 'unit18'
  | 'unit19'
  | 'unit20'
  | 'review2'
  | 'review3'
  | 'review4'
  | 'wordlist'
  | 'exam'
  | 'vocab'
  | 'grammar'
  | 'phonics'
  | 'games'
  | 'parent';

interface HeaderNavProps {
  selectedUnitId: string;
  activeTab: ActiveViewTab;
  currentUnit: UnitData;
  speechRate: number;
  totalStars: number;
  pendingApprovalsCount: number;
  currentUser: UserProfile | null;
  onSelectUnit: (unitId: string) => void;
  onSelectTab: (tab: ActiveViewTab) => void;
  onOpenVoiceStudio: () => void;
  onChangeSpeechRate: (rate: number) => void;
  onOpenCharactersModal: () => void;
  onOpenAdminModal: () => void;
  onOpenAuthModal: (tab: 'register' | 'login') => void;
  onLogout: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  selectedUnitId,
  activeTab,
  currentUnit,
  speechRate,
  totalStars,
  pendingApprovalsCount,
  currentUser,
  onSelectUnit,
  onSelectTab,
  onOpenVoiceStudio,
  onChangeSpeechRate,
  onOpenCharactersModal,
  onOpenAdminModal,
  onOpenAuthModal,
  onLogout
}) => {
  const [showUnitMenu, setShowUnitMenu] = useState<boolean>(false);
  const [volumeFilter, setVolumeFilter] = useState<1 | 2>(currentUnit.volume || 1);

  const currentUnitSummary = ALL_UNITS_SUMMARY.find(u => u.id === selectedUnitId);
  const currentIcon = currentUnitSummary?.icon || '📚';

  // Check if current view is inside textbook lessons
  const isLessonActive = [
    'lesson1',
    'lesson2',
    'lesson3',
    'unit2',
    'unit3',
    'unit4',
    'unit5',
    'unit6',
    'unit7',
    'unit8',
    'unit9',
    'unit10',
    'unit11',
    'unit12',
    'unit13',
    'unit14',
    'unit15',
    'unit16',
    'unit17',
    'unit18',
    'unit19',
    'unit20',
    'review1',
    'review2',
    'review3',
    'review4'
  ].includes(activeTab);

  const handleOpenUnitLesson = () => {
    sound.playClick();
    if (selectedUnitId === 'unit-1') {
      if (activeTab === 'lesson1' || activeTab === 'lesson2' || activeTab === 'lesson3') return;
      onSelectTab('lesson1');
    } else {
      const tabKey = selectedUnitId.replace('-', '') as ActiveViewTab;
      onSelectTab(tabKey);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* MAIN TOP BAR (60px) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-[60px] flex items-center justify-between gap-2 sm:gap-4">
        {/* BRAND & UNIT PICKER */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onSelectUnit('unit-1')}
            className="flex items-center gap-2 text-left focus:outline-none group"
            title="Trang chủ Tiếng Anh 4 - Global Success"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm sm:text-base shadow-xs ring-2 ring-indigo-100 group-hover:scale-105 transition-transform shrink-0">
              4
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 leading-tight">
                  Tiếng Anh 4
                </span>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1 py-0.2 rounded border border-sky-200/60 hidden sm:inline">
                  Global Success
                </span>
              </div>
            </div>
          </button>

          {/* Clean Unit Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowUnitMenu(!showUnitMenu);
              }}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-2xs active:scale-95 whitespace-nowrap ${
                showUnitMenu
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-100'
                  : 'bg-slate-100 hover:bg-slate-200/70 border-slate-200 text-slate-800'
              }`}
              title="Chọn bài học Unit 1 - Unit 20"
            >
              <span className="text-xs">{currentIcon}</span>
              <span className="max-w-[100px] sm:max-w-[140px] truncate font-extrabold text-[11px] sm:text-xs">
                {selectedUnitId.startsWith('review')
                  ? selectedUnitId.replace('-', ' ').toUpperCase()
                  : `Unit ${currentUnit.unitNumber}: ${currentUnit.title}`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  showUnitMenu ? 'rotate-180 text-indigo-600' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUnitMenu && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Chọn bài học SGK
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                    <button
                      onClick={() => setVolumeFilter(1)}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors ${
                        volumeFilter === 1 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Tập 1 (1 - 10)
                    </button>
                    <button
                      onClick={() => setVolumeFilter(2)}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors ${
                        volumeFilter === 2 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Tập 2 (11 - 20)
                    </button>
                  </div>
                </div>

                <div className="mt-2.5 max-h-72 overflow-y-auto space-y-1 pr-1">
                  {ALL_UNITS_SUMMARY.filter(u => u.volume === volumeFilter).map(unit => {
                    const isSelected = selectedUnitId === unit.id;

                    return (
                      <button
                        key={unit.id}
                        onClick={() => {
                          onSelectUnit(unit.id);
                          setShowUnitMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{unit.icon}</span>
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

                        {unit.id.startsWith('unit') && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1 py-0.5 rounded">
                            Tập {unit.volume}
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

        {/* PRIMARY UNIFIED NAVIGATION TABS (DESKTOP) */}
        <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 text-xs font-bold">
          <button
            onClick={handleOpenUnitLesson}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              isLessonActive
                ? 'bg-white text-indigo-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bài Học SGK</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('vocab');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vocab'
                ? 'bg-white text-indigo-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🃏</span>
            <span>Từ Vựng</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('grammar');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'grammar'
                ? 'bg-white text-indigo-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>💬</span>
            <span>Ngữ Pháp</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('phonics');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'phonics'
                ? 'bg-white text-purple-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🗣️</span>
            <span>Phonics</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('exam');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'exam'
                ? 'bg-white text-rose-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>📝</span>
            <span>Đề Thi (13 Đề)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('wordlist');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'wordlist'
                ? 'bg-white text-blue-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>📑</span>
            <span>Wordlist</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('games');
            }}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'games'
                ? 'bg-white text-amber-700 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🎲</span>
            <span>Game</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('parent');
            }}
            className={`px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'parent'
                ? 'bg-rose-50 text-rose-700 shadow-xs font-black border border-rose-200'
                : 'text-rose-600 hover:text-rose-800 hover:bg-rose-50/50'
            }`}
          >
            <span>❤️</span>
            <span>Phụ Huynh</span>
          </button>
        </nav>

        {/* RIGHT CONTROLS: AUDIO, STARS, 10 NHÂN VẬT, USER */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Audio Voice Pill */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 shadow-2xs">
            <button
              onClick={() => {
                sound.playClick();
                onOpenVoiceStudio();
              }}
              title="Giọng Google US English chất lượng cao. Bấm để tinh chỉnh."
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-slate-700 hover:text-rose-700 hover:bg-white transition-all"
            >
              <span>🎙️</span>
              <span className="hidden 2xl:inline text-[11px]">Google US</span>
              <Volume2 className="w-3.5 h-3.5 text-rose-600" />
            </button>

            <div className="w-px h-3.5 bg-slate-200 mx-0.5" />

            <button
              onClick={() => {
                sound.playClick();
                onChangeSpeechRate(speechRate < 0.8 ? 0.88 : 0.72);
              }}
              title="Chỉnh tốc độ giọng đọc"
              className="px-1.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:bg-white transition-all font-mono"
            >
              {speechRate < 0.8 ? '0.7x' : '0.9x'}
            </button>
          </div>

          {/* Stars count */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-black text-xs tabular-nums shadow-xs">
            <span className="text-amber-500 text-xs">⭐</span>
            <span>{totalStars}</span>
          </div>

          {/* 10 Nhân Vật */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCharactersModal();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs border border-slate-200 transition"
            title="Xem 10 nhân vật trong SGK"
          >
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">10 Nhân Vật</span>
          </button>

          {/* Admin Approval Button */}
          {currentUser?.role === 'admin' ? (
            <button
              onClick={() => {
                sound.playClick();
                onOpenAdminModal();
              }}
              className="relative flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black text-xs shadow-xs hover:brightness-105 transition active:scale-95 whitespace-nowrap"
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

          {/* User Account / Profile Button */}
          {currentUser ? (
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  if (currentUser.role === 'admin') {
                    onOpenAdminModal();
                  } else {
                    onOpenAuthModal('login');
                  }
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-slate-800 hover:bg-white transition"
                title={`Tài khoản: ${currentUser.fullName}`}
              >
                <span className="text-sm">
                  {currentUser.avatarEmoji || (currentUser.role === 'admin' ? '👨‍🏫' : '👦')}
                </span>
                <span className="max-w-[70px] sm:max-w-[90px] truncate font-black hidden sm:inline text-xs">
                  {currentUser.fullName}
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onLogout();
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition"
                title="Đăng xuất"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onOpenAuthModal('register');
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black text-xs shadow-xs transition active:scale-95 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Ký</span>
            </button>
          )}
        </div>
      </div>

      {/* MOBILE & TABLET NAVIGATION BAR (WHEN < XL) - SINGLE CLEAN ROW, NO REDUNDANCY */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-3 py-1.5 bg-slate-50 border-t border-slate-200 text-xs font-bold no-scrollbar">
        <button
          onClick={handleOpenUnitLesson}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            isLessonActive ? 'bg-white text-indigo-700 shadow-xs font-black ring-1 ring-indigo-200' : 'text-slate-600'
          }`}
        >
          <span>📖</span>
          <span>Bài Học SGK</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('vocab');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'vocab' ? 'bg-white text-indigo-700 shadow-xs font-black ring-1 ring-indigo-200' : 'text-slate-600'
          }`}
        >
          <span>🃏</span>
          <span>Từ Vựng</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('grammar');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'grammar' ? 'bg-white text-indigo-700 shadow-xs font-black ring-1 ring-indigo-200' : 'text-slate-600'
          }`}
        >
          <span>💬</span>
          <span>Ngữ Pháp</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('phonics');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'phonics' ? 'bg-white text-purple-700 shadow-xs font-black ring-1 ring-purple-200' : 'text-slate-600'
          }`}
        >
          <span>🗣️</span>
          <span>Phonics</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('exam');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'exam' ? 'bg-white text-rose-700 shadow-xs font-black ring-1 ring-rose-200' : 'text-slate-600'
          }`}
        >
          <span>📝</span>
          <span>Đề Thi</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('wordlist');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'wordlist' ? 'bg-white text-blue-700 shadow-xs font-black ring-1 ring-blue-200' : 'text-slate-600'
          }`}
        >
          <span>📑</span>
          <span>Wordlist</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('games');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'games' ? 'bg-white text-amber-700 shadow-xs font-black ring-1 ring-amber-200' : 'text-slate-600'
          }`}
        >
          <span>🎲</span>
          <span>Game</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('parent');
          }}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'parent' ? 'bg-rose-50 text-rose-700 shadow-xs font-black border border-rose-200' : 'text-rose-600'
          }`}
        >
          <span>❤️</span>
          <span>Phụ Huynh</span>
        </button>
      </div>
    </header>
  );
};
