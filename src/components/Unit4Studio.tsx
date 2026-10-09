import React, { useState } from 'react';
import {
  Cake,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit4Lesson1Studio } from './unit4/Unit4Lesson1Studio';
import { Unit4Lesson2Studio } from './unit4/Unit4Lesson2Studio';
import { Unit4Lesson3Studio } from './unit4/Unit4Lesson3Studio';

interface Unit4StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit3?: () => void;
  onSwitchToUnit5?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit4Studio: React.FC<Unit4StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit3,
  onSwitchToUnit5,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Tháng Sinh Nhật',
      pages: 'Trang 28 - 29 SGK',
      badge: "When's your birthday?",
      icon: '🎂',
      desc: 'January, February, March, April, May... & Cấu trúc hỏi ngày sinh với giới từ "in"'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Món Ăn & Thức Uống',
      pages: 'Trang 30 - 31 SGK',
      badge: 'What do you want to eat/drink?',
      icon: '🍟',
      desc: 'some chips, some grapes, some lemonade, some water & Trò chơi bảng Board race'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Thiệp Mời',
      pages: 'Trang 32 - 33 SGK',
      badge: 'Phonics /dʒ/ & /w/',
      icon: '💌',
      desc: 'Âm jam /dʒ/ & water /w/, thư bạn Bill và Thiết kế thiệp mời sinh nhật 3D'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 4 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700 text-lg font-black">
              🎂
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 4: My birthday party — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Chuẩn theo toàn bộ 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 28 đến 33)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToUnit3 && (
              <button
                onClick={onSwitchToUnit3}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                ⬅️ Về Unit 3
              </button>
            )}
            {onSwitchToUnit5 && (
              <button
                onClick={onSwitchToUnit5}
                className="text-xs font-black text-teal-700 bg-teal-100 hover:bg-teal-200 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 shadow-sm"
              >
                <span>Sang Unit 5</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                    ? 'bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border-rose-500 shadow-md ring-2 ring-rose-200'
                    : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ls.icon}</span>
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
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
                  <span className={`${isSelected ? 'text-rose-700 font-extrabold' : 'text-slate-400'}`}>
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
        <Unit4Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit4Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit4Lesson3Studio
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
