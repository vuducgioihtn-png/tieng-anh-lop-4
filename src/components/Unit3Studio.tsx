import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  Sunrise,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit3Lesson1Studio } from './unit3/Unit3Lesson1Studio';
import { Unit3Lesson2Studio } from './unit3/Unit3Lesson2Studio';
import { Unit3Lesson3Studio } from './unit3/Unit3Lesson3Studio';

interface Unit3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit2?: () => void;
  onSwitchToUnit4?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit3Studio: React.FC<Unit3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit2,
  onSwitchToUnit4,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Các Ngày Trong Tuần',
      pages: 'Trang 22 - 23 SGK',
      badge: 'What day is it today?',
      icon: '📅',
      desc: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday & Vòng quay 7 ngày trong tuần'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hoạt Động Theo Ngày',
      pages: 'Trang 24 - 25 SGK',
      badge: 'What do you do on...?',
      icon: '🏫',
      desc: 'study at school, listen to music, watch TV, do housework... & Hỏi thói quen các thứ'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Dự Án Tuần',
      pages: 'Trang 26 - 27 SGK',
      badge: 'Phonics /l/ & /st/',
      icon: '🎯',
      desc: 'Phân biệt listen /l/ & study /st/, bài đọc hiểu bạn Linh và Thiết kế My Week Timeable'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 3 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700 text-lg font-black">
              📅
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 3: My week — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Chuẩn theo toàn bộ 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 22 đến 27)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToUnit2 && (
              <button
                onClick={onSwitchToUnit2}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                ⬅️ Sang Unit 2
              </button>
            )}
            {onSwitchToUnit4 && (
              <button
                onClick={onSwitchToUnit4}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                Tiếp sang Unit 4 ➔
              </button>
            )}
            {onSwitchToUnit1 && (
              <button
                onClick={onSwitchToUnit1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                Về Unit 1
              </button>
            )}
          </div>
        </div>

        {/* 3 Lesson Cards Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lessons.map(ls => {
            const isSelected = activeLesson === ls.id;
            return (
              <button
                key={ls.id}
                onClick={() => {
                  sound.playClick();
                  setActiveLesson(ls.id);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-500 shadow-md ring-2 ring-amber-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ls.icon}</span>
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {ls.pages}
                  </span>
                </div>

                <div>
                  <div className={`font-black text-sm ${isSelected ? 'text-amber-950' : 'text-slate-900'}`}>
                    {ls.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {ls.desc}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-bold">
                  <span className={`${isSelected ? 'text-amber-700 font-extrabold' : 'text-slate-400'}`}>
                    {ls.badge}
                  </span>
                  {isSelected && (
                    <span className="text-amber-600 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đang học
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ACTIVE LESSON VIEWPORT ================= */}
      {activeLesson === 1 && (
        <Unit3Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit3Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit3Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}
    </div>
  );
};
