import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award,
  Calendar,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit9Lesson1Studio } from './unit9/Unit9Lesson1Studio';
import { Unit9Lesson2Studio } from './unit9/Unit9Lesson2Studio';
import { Unit9Lesson3Studio } from './unit9/Unit9Lesson3Studio';

interface Unit9StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit8?: () => void;
  onSwitchToUnit10?: () => void;
  onSwitchToUnit7?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit9Studio: React.FC<Unit9StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit8,
  onSwitchToUnit10,
  onSwitchToUnit7,
  onSwitchToReview1,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Hỏi Ngày Hội Thể Thao Vào Tháng Nào?',
      pages: 'Trang 62 - 63 SGK',
      badge: 'Is your sports day in...?',
      icon: '🏃',
      desc: 'May, June, July, August & Cấu trúc hỏi Yes/No: "Is your sports day in May? - Yes, it is. / No, it isn\'t. It\'s in April.", Nghe nối và Hát Karaoke Our sports day'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hỏi Khi Nào Có Ngày Hội Thể Thao?',
      pages: 'Trang 64 - 65 SGK',
      badge: 'When\'s your sports day? - It\'s in...',
      icon: '🗓️',
      desc: 'September, October, November, December & Cấu trúc hỏi thời gian "When\'s your sports day? - It\'s in October.", Nghe tích đáp án và Game Ai nhanh hơn'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm Chữ "Y" & Dự Án Áp Phích Thể Thao',
      pages: 'Trang 66 - 67 SGK',
      badge: 'Phonics letter "y" (/i/ & /aɪ/)',
      icon: '🎨',
      desc: 'Phát âm chữ "y" trong February (/i/) & July (/aɪ/), Bài vè Chant nhịp điệu, Đọc hiểu True/False ngày hội thể thao tháng 11, Xưởng thiết kế poster thể thao'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 9 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-700 text-lg font-black">
              🏆
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Unit 9: Our sports day — Chọn Bài Học (Lesson 1, 2, 3)
                <span className="text-xs bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded-full border border-orange-200 hidden md:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-500" /> Chuẩn SGK Kết Nối Tri Thức
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Toàn bộ nội dung trực quan hóa 6 trang Sách Giáo Khoa (Trang 62 đến 67)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSwitchToUnit8 && (
              <button
                onClick={onSwitchToUnit8}
                className="text-xs font-bold text-slate-700 hover:text-rose-700 px-3 py-1.5 bg-slate-100 hover:bg-rose-100 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-slate-200"
              >
                <span>🎨 ⬅️ Về Unit 8</span>
              </button>
            )}
            {onSwitchToUnit10 && (
              <button
                onClick={onSwitchToUnit10}
                className="text-xs font-black text-teal-700 hover:text-teal-900 px-3 py-1.5 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-teal-300"
              >
                <span>🏖️ Sang Unit 10 ➔</span>
              </button>
            )}
            {onSwitchToUnit7 && (
              <button
                onClick={onSwitchToUnit7}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🗓️ Về Unit 7
              </button>
            )}
            {onSwitchToReview1 && (
              <button
                onClick={onSwitchToReview1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🏆 Review 1
              </button>
            )}
            {onSwitchToUnit1 && (
              <button
                onClick={onSwitchToUnit1}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                Unit 1
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
                    ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-400/20'
                    : 'border-slate-200 hover:border-orange-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{l.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {l.pages}
                    </span>
                  </div>

                  <div className="font-black text-sm text-slate-900">
                    {l.title}
                  </div>

                  <div className="text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md inline-block">
                    {l.badge}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-black ${
                      isActive ? 'text-orange-700' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Đang học tiết này' : 'Bấm để vào học'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive ? 'text-orange-600 translate-x-0.5' : 'text-slate-400'
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
        <Unit9Lesson1Studio
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
        <Unit9Lesson2Studio
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
        <Unit9Lesson3Studio
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
