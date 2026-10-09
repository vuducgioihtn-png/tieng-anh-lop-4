import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit7Lesson1Studio } from './unit7/Unit7Lesson1Studio';
import { Unit7Lesson2Studio } from './unit7/Unit7Lesson2Studio';
import { Unit7Lesson3Studio } from './unit7/Unit7Lesson3Studio';

interface Unit7StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit6?: () => void;
  onSwitchToUnit8?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit7Studio: React.FC<Unit7StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit6,
  onSwitchToUnit8,
  onSwitchToReview1,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Môn Học Hôm Nay',
      pages: 'Trang 50 - 51 SGK',
      badge: 'What subjects do you have today?',
      icon: '📚',
      desc: 'Vietnamese, English, maths, science & Mẫu câu hỏi các môn học hôm nay, nghe tích tick/cross và Ô chữ Crossword'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hỏi Khi Nào Có Môn Học',
      pages: 'Trang 52 - 53 SGK',
      badge: 'When do you have...?',
      icon: '🗓️',
      desc: 'art, music, history and geography & Cấu trúc "I have it on...", Bảng Thời khóa biểu tuần T2-T6 và Hát Karaoke'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Dự Án My Timetable',
      pages: 'Trang 54 - 55 SGK',
      badge: 'Phonics "se" /z/ & "ce" /s/',
      icon: '📋',
      desc: 'Phát âm đuôi "se" (/z/) & "ce" (/s/), bài Chant nhộn nhịp, Đọc hiểu lịch học của Minh và Dự án Thuyết trình TKB'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 7 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700 text-lg font-black">
              🗓️
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 7: Our timetables — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Chuẩn theo toàn bộ 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 50 đến 55)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToUnit6 && (
              <button
                onClick={onSwitchToUnit6}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1"
              >
                <span>⬅️ Về Unit 6</span>
              </button>
            )}
            {onSwitchToUnit8 && (
              <button
                onClick={onSwitchToUnit8}
                className="text-xs font-black text-rose-700 hover:text-rose-900 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-rose-300"
              >
                <span>🎨 Sang Unit 8 ➔</span>
              </button>
            )}
            {onSwitchToReview1 && (
              <button
                onClick={onSwitchToReview1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🏆 Về Review 1
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
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{l.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {l.pages}
                    </span>
                  </div>

                  <div className="font-black text-sm text-slate-900">
                    {l.title}
                  </div>

                  <div className="text-[11px] font-bold text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-md inline-block">
                    {l.badge}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-black ${
                      isActive ? 'text-purple-700' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Đang học tiết này' : 'Bấm để vào học'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive ? 'text-purple-600 translate-x-0.5' : 'text-slate-400'
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
        <Unit7Lesson1Studio
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
        <Unit7Lesson2Studio
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
        <Unit7Lesson3Studio
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
