import React, { useState } from 'react';
import {
  Palmtree,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award,
  Sun,
  Globe
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Unit10Lesson1Studio } from './unit10/Unit10Lesson1Studio';
import { Unit10Lesson2Studio } from './unit10/Unit10Lesson2Studio';
import { Unit10Lesson3Studio } from './unit10/Unit10Lesson3Studio';

interface Unit10StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit9?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToUnit8?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit10Studio: React.FC<Unit10StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit9,
  onSwitchToReview2,
  onSwitchToUnit8,
  onSwitchToReview1,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Cuối Tuần Trước Bạn Ở Đâu?',
      pages: 'Trang 68 - 69 SGK',
      badge: 'Were you... last weekend?',
      icon: '🏖️',
      desc: 'at the zoo, on the beach, at the campsite, in the countryside & Mẫu câu hỏi quá khứ "Were you... - Yes, I was. / No, I wasn\'t.", Nghe tích và Hát Karaoke Trên Bãi Biển'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Mùa Hè Vừa Qua Bạn Ở Đâu?',
      pages: 'Trang 70 - 71 SGK',
      badge: 'Where were you last summer?',
      icon: '✈️',
      desc: 'London, Sydney, Tokyo, Bangkok & Cấu trúc hỏi điểm đến "Where were you last summer? - I was in...", Nghe nối 4 bạn nhỏ và Trò chơi Xếp thẻ ghép câu'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm "ere", Đọc Hiểu & Sơ Đồ Tư Duy',
      pages: 'Trang 72 - 73 SGK',
      badge: 'Phonics were /wɜːr/ & where /weər/',
      icon: '📊',
      desc: 'Phát âm chuẩn cặp từ "were" vs "where", Bài vè Chant sôi động, Đọc hiểu kỳ nghỉ hè của Mai & Tony, Xưởng thuyết trình Mindmap tổng kết Tập 1'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ================= UNIT 10 MASTER LESSON SWITCHER ================= */}
      <div className="bg-white rounded-3xl border-2 border-teal-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-700 text-lg font-black">
              🏖️
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Unit 10: Our summer holidays — Chọn Bài Học (Lesson 1, 2, 3)
                <span className="text-xs bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200 hidden md:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-500" /> Bài Học Cuối Tập 1 (Trang 68 - 73 SGK)
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Toàn bộ nội dung trực quan hóa 6 trang Sách Giáo Khoa Kết Nối Tri Thức
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onSwitchToUnit9 && (
              <button
                onClick={onSwitchToUnit9}
                className="text-xs font-bold text-slate-700 hover:text-orange-700 px-3 py-1.5 bg-slate-100 hover:bg-orange-100 rounded-xl transition-colors self-start sm:self-auto flex items-center gap-1 border border-slate-200"
              >
                <span>🏆 ⬅️ Về Unit 9</span>
              </button>
            )}
            {onSwitchToReview2 && (
              <button
                onClick={onSwitchToReview2}
                className="text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-105 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto flex items-center gap-1 shadow-sm"
              >
                <span>🏆 Review 2 ➡️</span>
              </button>
            )}
            {onSwitchToUnit8 && (
              <button
                onClick={onSwitchToUnit8}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
              >
                🎨 Về Unit 8
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
                    ? 'border-teal-500 bg-teal-50/60 shadow-md ring-2 ring-teal-400/20'
                    : 'border-slate-200 hover:border-teal-300 bg-white hover:bg-slate-50'
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

                  <div className="text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md inline-block">
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
                    {isActive ? '● Đang học tiết này' : 'Bấm để vào học'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isActive ? 'text-teal-600 translate-x-0.5' : 'text-slate-400'
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
        <Unit10Lesson1Studio
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
        <Unit10Lesson2Studio
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
        <Unit10Lesson3Studio
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
