import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Heart,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Award,
  Layers,
  Calendar,
  Home,
  Volume2,
  Film,
  Dumbbell
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit15Lesson1Studio } from './unit15/Unit15Lesson1Studio';
import { Unit15Lesson2Studio } from './unit15/Unit15Lesson2Studio';
import { Unit15Lesson3Studio } from './unit15/Unit15Lesson3Studio';

interface Unit15StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToUnit14?: () => void;
  onSwitchToUnit13?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit15Studio: React.FC<Unit15StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToReview3,
  onSwitchToUnit14,
  onSwitchToUnit13,
  onSwitchToUnit12,
  onSwitchToUnit11,
  onSwitchToReview2,
  onSwitchToWordlist,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Đi Đâu Vào Thứ Bảy (Where does he/she go on Saturdays?)',
      pages: 'Trang 30 - 31 SGK',
      badge: 'He/She goes to the gym / cinema / sports/shopping centre',
      icon: '🏟️',
      desc: 'Hỏi và trả lời nơi chốn: sports centre, shopping centre, swimming pool, cinema & Bài hát "Where do they go on Saturdays?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Làm Gì Vào Chủ Nhật (What does he/she do on Sundays?)',
      pages: 'Trang 32 - 33 SGK',
      badge: 'cooks meals, plays tennis, watches films, does yoga',
      icon: '🎾',
      desc: 'Hỏi và chia động từ cho hoạt động cuối tuần: cooks meals, plays tennis, watches films, does yoga & Matching Game.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm /ɡ/ vs /ʒ/, Đọc True/False & Dự Án Bảng',
      pages: 'Trang 34 - 35 SGK',
      badge: 'Phonics: go (/ɡ/) vs television (/ʒ/)',
      icon: '📊',
      desc: 'Luyện chuẩn âm /ɡ/ (go) và âm rung /ʒ/ (television); bài chant vui nhộn, đọc hiểu True/False và dự án My family\'s weekend activities.'
    }
  ];

  // Unit 15 Master Vocabulary with full IPA and Vietnamese reading guide
  const unit15Vocab = [
    {
      word: 'sports centre',
      ipa: '/spɔːts ˈsentə/',
      reading: 's-po-t-s sen-tờ (nhấn sen)',
      vi: 'trung tâm thể thao',
      example: 'He goes to the sports centre on Saturdays.',
      icon: '🏟️'
    },
    {
      word: 'shopping centre',
      ipa: '/ˈʃɒpɪŋ ˈsentə/',
      reading: 'sho-ping sen-tờ',
      vi: 'trung tâm mua sắm, siêu thị',
      example: 'She goes to the shopping centre.',
      icon: '🏬'
    },
    {
      word: 'swimming pool',
      ipa: '/ˈswɪmɪŋ puːl/',
      reading: 's-uym-ming pul (kéo dài âm u)',
      vi: 'hồ bơi, bể bơi',
      example: 'My sister goes to the swimming pool.',
      icon: '🏊‍♂️'
    },
    {
      word: 'cinema',
      ipa: '/ˈsɪnəmə/',
      reading: 'xi-nơ-mơ (nhấn xi)',
      vi: 'rạp chiếu phim',
      example: 'I go to the cinema on Saturdays.',
      icon: '🎬'
    },
    {
      word: 'gym',
      ipa: '/dʒɪm/',
      reading: 'dim (âm d-z bật nhẹ)',
      vi: 'phòng tập thể dục, phòng gym',
      example: 'He goes to the gym.',
      icon: '🏋️‍♂️'
    },
    {
      word: 'cook meals',
      ipa: '/kʊk miːlz/',
      reading: 'cúc miu-z (He/She cooks meals)',
      vi: 'nấu các bữa ăn',
      example: 'She cooks meals on Sundays.',
      icon: '🍳'
    },
    {
      word: 'play tennis',
      ipa: '/pleɪ ˈtenɪs/',
      reading: 'plây ten-nít-s (He/She plays tennis)',
      vi: 'chơi quần vợt (tennis)',
      example: 'He plays tennis with his friends.',
      icon: '🎾'
    },
    {
      word: 'watch films',
      ipa: '/wɒtʃ fɪlmz/',
      reading: 'oát-ch phim-z (He/She watches films)',
      vi: 'xem phim',
      example: 'He watches films at the cinema.',
      icon: '🍿'
    },
    {
      word: 'do yoga',
      ipa: '/duː ˈjəʊɡə/',
      reading: 'đu dâu-gơ (He/She does yoga: đắt-z dâu-gơ)',
      vi: 'tập yoga',
      example: 'My mother does yoga.',
      icon: '🧘‍♀️'
    },
    {
      word: 'television',
      ipa: '/ˈtelɪvɪʒn/',
      reading: 'te-li-vi-dần (chữ s đọc âm /ʒ/ rung)',
      vi: 'vô tuyến, tivi',
      example: 'We watch television on Sundays.',
      icon: '📺'
    },
    {
      word: 'on Saturdays',
      ipa: '/ɒn ˈsætədeɪz/',
      reading: 'on Sa-tơ-đây-z (mỗi thứ Bảy)',
      vi: 'vào các ngày thứ Bảy',
      example: 'Where do you go on Saturdays?',
      icon: '🗓️'
    },
    {
      word: 'on Sundays',
      ipa: '/ɒn ˈsʌndeɪz/',
      reading: 'on Săn-đây-z (mỗi Chủ nhật)',
      vi: 'vào các ngày Chủ nhật',
      example: 'What does he do on Sundays?',
      icon: '☀️'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 30 - 35
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Cuối Tuần Của Gia Đình (My Family&apos;s Weekends)
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3.5 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xs transition flex items-center gap-1 shadow-md"
                >
                  <span>🏆 ➡️ Review 3</span>
                </button>
              )}
              {onSwitchToUnit14 && (
                <button
                  onClick={onSwitchToUnit14}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🧹 ⬅️ Unit 14</span>
                </button>
              )}
              {onSwitchToUnit13 && (
                <button
                  onClick={onSwitchToUnit13}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>👤 Unit 13</span>
                </button>
              )}
              {onSwitchToUnit12 && (
                <button
                  onClick={onSwitchToUnit12}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>👨‍💼 Unit 12</span>
                </button>
              )}
              {onSwitchToWordlist && (
                <button
                  onClick={onSwitchToWordlist}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>📑 Wordlist SGK</span>
                </button>
              )}
              {onSwitchToReview2 && (
                <button
                  onClick={onSwitchToReview2}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏆 Review 2</span>
                </button>
              )}
              {onSwitchToUnit1 && (
                <button
                  onClick={onSwitchToUnit1}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>Unit 1</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              UNIT 15: MY FAMILY&apos;S WEEKENDS 🏟️ 🎾 🎬 🏊‍♀️
            </h1>
            <p className="text-teal-100 text-sm md:text-base max-w-3xl mt-1">
              Khám phá những điểm đến và hoạt động thư giãn cuối tuần sôi nổi của cả nhà: Tự tin hỏi đáp địa điểm &quot;Where does he/she go on Saturdays? - He/She goes to the...&quot;, chia động từ chuẩn xác cho hoạt động ngày Chủ nhật (cooks meals, plays tennis, watches films, does yoga), làm chủ ngữ âm /ɡ/ (go) và âm rung /ʒ/ (television)!
            </p>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">📍 Where does he/she go on Saturdays? - He/She goes to the...</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">⚡ sports centre / shopping centre / swimming pool / cinema / gym</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🎾 What does he/she do on Sundays? - cooks meals / plays tennis / watches films / does yoga</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗣️ Phonics: /ɡ/ (go) vs /ʒ/ (television)</span>
          </div>
        </div>
      </div>

      {/* 3 Lesson Cards */}
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
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-teal-500 bg-white shadow-lg ring-2 ring-teal-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>{l.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Lesson Content */}
      {activeLesson === 1 && (
        <Unit15Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit15Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit15Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* ========================================================================= */}
      {/* MASTER GLOSSARY FOR UNIT 15 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                Bảng Tra Cứu Phát Âm
              </span>
              <span className="text-xs font-semibold text-slate-500">IPA &amp; Gợi Ý Đọc</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Toàn Bộ Phiên Âm IPA &amp; Gợi Ý Đọc Tiếng Việt Unit 15 📖
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Bấm vào loa để nghe giọng đọc chuẩn bản xứ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {unit15Vocab.map(item => (
            <div
              key={item.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-teal-300 hover:bg-teal-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(item.word, speechRate)}
                    className="p-1.5 text-teal-600 hover:bg-teal-100 rounded-lg transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base">{item.word}</h4>
                <p className="text-xs font-mono font-bold text-indigo-700 mt-0.5">
                  🗣️ {item.ipa}
                </p>
                <p className="text-xs text-teal-800 font-semibold mt-0.5">
                  📖 {item.reading}
                </p>
                <p className="text-xs text-slate-600 font-medium mt-2">{item.vi}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic truncate">
                &quot;{item.example}&quot;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
