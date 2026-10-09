import React, { useState } from 'react';
import {
  Bike,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit5Lesson1Studio } from './unit5/Unit5Lesson1Studio';
import { Unit5Lesson2Studio } from './unit5/Unit5Lesson2Studio';
import { Unit5Lesson3Studio } from './unit5/Unit5Lesson3Studio';

interface Unit5StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit4?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit6?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit5Studio: React.FC<Unit5StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit4,
  onSwitchToReview1,
  onSwitchToUnit6,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Khả Năng Bản Thân',
      pages: 'Trang 34 - 35 SGK',
      badge: 'Can you swim?',
      icon: '🏊',
      desc: 'swim, ride a bike, ride a horse, play the piano & Cấu trúc hỏi bản thân: "Can you...?" - "Yes, I can / No, I can’t"'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Khả Năng Bạn Bè',
      pages: 'Trang 36 - 37 SGK',
      badge: 'Can he/she play the guitar?',
      icon: '🎸',
      desc: 'play the guitar, roller skate, cook, draw & Phân biệt He / She: "Can he/she...?" - "Yes, he/she can"'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm & Hội Chợ Tài Năng',
      pages: 'Trang 38 - 39 SGK',
      badge: 'Phonics /dr/ & /sw/',
      icon: '🎨',
      desc: 'Âm draw /dr/ & swim /sw/, bài Chant rộn rã, thư của Lucy và Thiết kế Thẻ Tài Năng cá nhân'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 5 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-700 text-lg font-black">
              🚴
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Unit 5: Things we can do — Chọn Bài Học (Lesson 1, 2, 3)
              </h2>
              <p className="text-xs text-slate-500">
                Chuẩn theo toàn bộ 6 trang Sách Giáo Khoa Kết Nối Tri Thức (Trang 34 đến 39)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToUnit4 && (
              <button
                onClick={onSwitchToUnit4}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                ⬅️ Về Unit 4
              </button>
            )}
            {onSwitchToReview1 && (
              <button
                onClick={onSwitchToReview1}
                className="text-xs font-black text-amber-800 bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 shadow-sm"
              >
                <span>🏆 Sang Review 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onSwitchToUnit6 && (
              <button
                onClick={onSwitchToUnit6}
                className="text-xs font-black text-blue-800 bg-blue-200 hover:bg-blue-300 px-3 py-1.5 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 shadow-sm"
              >
                <span>🏫 Sang Unit 6</span>
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
                    ? 'border-teal-600 bg-teal-50/50 shadow-md ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{l.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {l.pages}
                    </span>
                  </div>

                  <div className="font-black text-sm text-slate-900">
                    {l.title}
                  </div>

                  <div className="text-[11px] font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-md inline-block">
                    {l.badge}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {l.desc}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span
                    className={`font-black ${
                      isActive ? 'text-teal-700' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Đang học tiết này' : 'Bấm để học ➔'}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= ACTIVE LESSON DISPLAY ================= */}
      {activeLesson === 1 && (
        <Unit5Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => {
            sound.playClick();
            setActiveLesson(2);
          }}
          onSwitchToLesson3={() => {
            sound.playClick();
            setActiveLesson(3);
          }}
        />
      )}

      {activeLesson === 2 && (
        <Unit5Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => {
            sound.playClick();
            setActiveLesson(1);
          }}
          onSwitchToLesson3={() => {
            sound.playClick();
            setActiveLesson(3);
          }}
        />
      )}

      {activeLesson === 3 && (
        <Unit5Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => {
            sound.playClick();
            setActiveLesson(1);
          }}
          onSwitchToLesson2={() => {
            sound.playClick();
            setActiveLesson(2);
          }}
        />
      )}
    </div>
  );
};
