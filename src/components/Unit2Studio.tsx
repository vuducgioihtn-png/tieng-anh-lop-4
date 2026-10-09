import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  Sunrise,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit2Lesson1Studio } from './unit2/Unit2Lesson1Studio';
import { Unit2Lesson2Studio } from './unit2/Unit2Lesson2Studio';
import { Unit2Lesson3Studio } from './unit2/Unit2Lesson3Studio';

interface Unit2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit1?: () => void;
  onSwitchToUnit3?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit2Studio: React.FC<Unit2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit1,
  onSwitchToUnit3,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Hỏi & Nói Giờ',
      pages: 'Trang 16 - 17 SGK',
      badge: 'What time is it?',
      icon: '⏰',
      desc: 'Giờ đúng (o\'clock), 15 phút (fifteen), 30 phút (thirty), 45 phút (forty-five)'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Thói Quen Hàng Ngày',
      pages: 'Trang 18 - 19 SGK',
      badge: 'What time do you...?',
      icon: '🌅',
      desc: 'get up (5:00), have breakfast (6:15), go to school (1:15), go to bed (9:00)'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Dự Án',
      pages: 'Trang 20 - 21 SGK',
      badge: 'Phonics /t/ & /d/',
      icon: '🎯',
      desc: 'Phân biệt get /t/ & bed /d/, đọc hiểu trường Hoa Lan & làm Bảng thời gian biểu'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 2 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700 text-lg font-black">
              ⏰
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 2: Time and daily routines — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Toàn bộ nội dung chuẩn theo 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 16 đến 21)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToUnit1 && (
              <button
                onClick={onSwitchToUnit1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                ⬅️ Về Unit 1
              </button>
            )}
            {onSwitchToUnit3 && (
              <button
                onClick={onSwitchToUnit3}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                Tiếp sang Unit 3 ➔
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
                    ? 'bg-gradient-to-br from-rose-50 to-amber-50 border-rose-500 shadow-md ring-2 ring-rose-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ls.icon}</span>
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {ls.pages}
                  </span>
                </div>

                <div>
                  <div className={`font-black text-sm ${isSelected ? 'text-rose-950' : 'text-slate-900'}`}>
                    {ls.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {ls.desc}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-bold">
                  <span className={`${isSelected ? 'text-rose-700' : 'text-slate-400'}`}>
                    {ls.badge}
                  </span>
                  {isSelected && (
                    <span className="text-rose-600 flex items-center gap-1 text-[11px]">
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
        <Unit2Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit2Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit2Lesson3Studio
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
