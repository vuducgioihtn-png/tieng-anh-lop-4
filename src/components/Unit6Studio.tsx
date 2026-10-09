import React, { useState } from 'react';
import {
  School,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit6Lesson1Studio } from './unit6/Unit6Lesson1Studio';
import { Unit6Lesson2Studio } from './unit6/Unit6Lesson2Studio';
import { Unit6Lesson3Studio } from './unit6/Unit6Lesson3Studio';

interface Unit6StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit5?: () => void;
  onSwitchToUnit7?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit6Studio: React.FC<Unit6StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToReview1,
  onSwitchToUnit5,
  onSwitchToUnit7,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Vị Trí Ngôi Trường',
      pages: 'Trang 44 - 45 SGK',
      badge: 'Where’s your school?',
      icon: '🏫',
      desc: 'in the mountains, in the village, in the city, in the town & Hội thoại Nam, Lucy, Hùng và Game lật thẻ ghi nhớ'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Cơ Sở Vật Chất Trường Học',
      pages: 'Trang 46 - 47 SGK',
      badge: 'How many... are there?',
      icon: '💻',
      desc: 'buildings, playgrounds, computer rooms, gardens & Quy tắc số ít/số nhiều (There is one / There are two...)'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Trường Học Mơ Ước',
      pages: 'Trang 48 - 49 SGK',
      badge: 'Phonics /z/ vs /ɪz/',
      icon: '🎨',
      desc: 'Phát âm đuôi -s (/z/) & -es (/ɪz/), bài Chant rộn rã, Thư của Linh và Studio Thiết kế Dream School cá nhân'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 6 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700 text-lg font-black">
              🏫
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 6: Our school — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Chuẩn theo toàn bộ 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 44 đến 49)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToReview1 && (
              <button
                onClick={onSwitchToReview1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1"
              >
                <span>⬅️ Về Review 1</span>
              </button>
            )}
            {onSwitchToUnit5 && (
              <button
                onClick={onSwitchToUnit5}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🚴 Về Unit 5
              </button>
            )}
            {onSwitchToUnit7 && (
              <button
                onClick={onSwitchToUnit7}
                className="text-xs font-black text-purple-800 bg-purple-200 hover:bg-purple-300 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 shadow-sm"
              >
                <span>🗓️ Sang Unit 7</span>
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
          {lessons.map(l => {
            const isActive = activeLesson === l.id;
            return (
              <button
                key={l.id}
                onClick={() => {
                  sound.playClick();
                  setActiveLesson(l.id);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all border-2 relative flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{l.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {l.pages}
                    </span>
                  </div>

                  <div className="font-black text-sm text-slate-900">
                    {l.title}
                  </div>

                  <div className="text-[11px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-md inline-block">
                    {l.badge}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-black ${
                      isActive ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Đang học tiết này' : 'Bấm để vào học'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ACTIVE LESSON VIEWPORT ================= */}
      {activeLesson === 1 && (
        <Unit6Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => {
            sound.playClick();
            setActiveLesson(2);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onSwitchToLesson3={() => {
            sound.playClick();
            setActiveLesson(3);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
        />
      )}

      {activeLesson === 2 && (
        <Unit6Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => {
            sound.playClick();
            setActiveLesson(1);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onSwitchToLesson3={() => {
            sound.playClick();
            setActiveLesson(3);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
        />
      )}

      {activeLesson === 3 && (
        <Unit6Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => {
            sound.playClick();
            setActiveLesson(1);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onSwitchToLesson2={() => {
            sound.playClick();
            setActiveLesson(2);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};
