import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award,
  Heart,
  Star
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit8Lesson1Studio } from './unit8/Unit8Lesson1Studio';
import { Unit8Lesson2Studio } from './unit8/Unit8Lesson2Studio';
import { Unit8Lesson3Studio } from './unit8/Unit8Lesson3Studio';

interface Unit8StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit7?: () => void;
  onSwitchToUnit9?: () => void;
  onSwitchToUnit6?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit8Studio: React.FC<Unit8StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit7,
  onSwitchToUnit9,
  onSwitchToUnit6,
  onSwitchToReview1,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Môn Học Yêu Thích Của Bạn',
      pages: 'Trang 56 - 57 SGK',
      badge: "What's your favourite subject?",
      icon: '🎨',
      desc: 'art, music, PE, IT & Mẫu câu "What\'s your favourite subject? - It\'s...", Luyện nghe tick/cross, Game nối môn học với đồ dùng học tập'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Lý Do Yêu Thích & Ước Mơ Nghề Nghiệp',
      pages: 'Trang 58 - 59 SGK',
      badge: 'Why do you like...? - Because...',
      icon: '🌟',
      desc: 'English teacher, singer, painter, IT teacher & Cấu trúc hỏi lý do "Why...?", Game bánh xe ước mơ, nghe chọn đáp án và Hát Karaoke'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Dự Án Khảo Sát Lớp Học',
      pages: 'Trang 60 - 61 SGK',
      badge: "Phonics 'ke' /k/ & 'te' /t/",
      icon: '📊',
      desc: 'Phát âm đuôi "ke" (/k/ - like) & "te" (/t/ - write), Bài Chant nhịp điệu vui tươi, Đọc hiểu sở thích của Ben & Mai, Dự án Thống kê phỏng vấn cả lớp'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 8 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-rose-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700 text-lg font-black">
              🎨
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Unit 8: My favourite subjects — Chọn Bài Học (Lesson 1, 2, 3)
                <span className="text-xs bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full border border-rose-200 hidden md:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-rose-500" /> Chuẩn SGK Kết Nối Tri Thức
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Toàn bộ nội dung trực quan hóa 6 trang Sách Giáo Khoa (Trang 56 đến 61)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSwitchToUnit7 && (
              <button
                onClick={onSwitchToUnit7}
                className="text-xs font-bold text-slate-700 hover:text-purple-700 px-3 py-1.5 bg-slate-100 hover:bg-purple-100 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-slate-200"
              >
                <span>🗓️ ⬅️ Về Unit 7</span>
              </button>
            )}
            {onSwitchToUnit9 && (
              <button
                onClick={onSwitchToUnit9}
                className="text-xs font-black text-orange-700 hover:text-orange-900 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-orange-300"
              >
                <span>🏆 Sang Unit 9 ➔</span>
              </button>
            )}
            {onSwitchToUnit6 && (
              <button
                onClick={onSwitchToUnit6}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🏫 Về Unit 6
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
                    ? 'border-rose-500 bg-rose-50/60 shadow-md ring-2 ring-rose-400/20'
                    : 'border-slate-200 hover:border-rose-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{l.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {l.pages}
                    </span>
                  </div>

                  <div className="font-black text-sm text-slate-900">
                    {l.title}
                  </div>

                  <div className="text-[11px] font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md inline-block">
                    {l.badge}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-black ${
                      isActive ? 'text-rose-700' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Đang học tiết này' : 'Bấm để vào học'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive ? 'text-rose-600 translate-x-0.5' : 'text-slate-400'
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
        <Unit8Lesson1Studio
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
        <Unit8Lesson2Studio
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
        <Unit8Lesson3Studio
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
