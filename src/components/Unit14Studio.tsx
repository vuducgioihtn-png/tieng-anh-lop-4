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
  Clock,
  Home,
  Volume2,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit14Lesson1Studio } from './unit14/Unit14Lesson1Studio';
import { Unit14Lesson2Studio } from './unit14/Unit14Lesson2Studio';
import { Unit14Lesson3Studio } from './unit14/Unit14Lesson3Studio';

interface Unit14StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit15?: () => void;
  onSwitchToUnit13?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit14Studio: React.FC<Unit14StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit15,
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
      title: 'Tiết 1: Thời Điểm Trong Ngày (When do you...?)',
      pages: 'Trang 24 - 25 SGK',
      badge: 'in the morning/afternoon/evening vs at noon',
      icon: '🌅',
      desc: 'Hỏi và trả lời thời gian làm các hoạt động: in the morning, at noon, in the afternoon, in the evening & Bài hát "When do you watch TV and read books?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Việc Nhà Giúp Bố Mẹ (What do you do...?)',
      pages: 'Trang 26 - 27 SGK',
      badge: 'wash clothes, clean floor, help cooking, wash dishes',
      icon: '🧹',
      desc: 'Hỏi và diễn đạt các công việc nhà tự giác: wash the clothes, clean the floor, help with the cooking, wash the dishes & Trò chơi Miming Game.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm "tch" vs "sh", Đọc Hiểu & Dự Án',
      pages: 'Trang 28 - 29 SGK',
      badge: 'Phonics: watch (/tʃ/) vs wash (/ʃ/)',
      icon: '📊',
      desc: 'Phân biệt triệt để âm bật /tʃ/ (watch) và âm suỵt /ʃ/ (wash); bài chant nhịp điệu, bài đọc Chủ nhật và dự án My Sunday activities.'
    }
  ];

  // Unit 14 Master Vocabulary with full IPA and Vietnamese reading guide
  const unit14Vocab = [
    {
      word: 'in the morning',
      ipa: '/ɪn ðə ˈmɔːnɪŋ/',
      reading: 'in đờ mo-ninh (kéo dài âm o sâu)',
      vi: 'vào buổi sáng',
      example: 'I clean the floor in the morning.',
      icon: '🌅'
    },
    {
      word: 'at noon',
      ipa: '/æt nuːn/',
      reading: 'ét nun (nhớ dùng giới từ "at")',
      vi: 'vào buổi trưa',
      example: 'I watch TV at noon.',
      icon: '☀️'
    },
    {
      word: 'in the afternoon',
      ipa: '/ɪn ði ˌɑːftəˈnuːn/',
      reading: 'in đi áp-ph-tơ-nun (đọc "đi" trước nguyên âm a)',
      vi: 'vào buổi chiều',
      example: 'I help my mum with the cooking in the afternoon.',
      icon: '🌤️'
    },
    {
      word: 'in the evening',
      ipa: '/ɪn ði ˈiːvnɪŋ/',
      reading: 'in đi i-v-ninh (đọc "đi" trước nguyên âm e)',
      vi: 'vào buổi tối',
      example: 'I wash the dishes in the evening.',
      icon: '🌙'
    },
    {
      word: 'clean the floor',
      ipa: '/kliːn ðə flɔː/',
      reading: 'c-lin đờ phlo (kéo dài âm o)',
      vi: 'lau sàn nhà',
      example: 'I clean the floor on Sundays.',
      icon: '🧹'
    },
    {
      word: 'wash the clothes',
      ipa: '/wɒʃ ðə kləʊðz/',
      reading: 'oát-sh đờ clâu-z (âm sh tròn môi)',
      vi: 'giặt quần áo',
      example: 'I wash my clothes in the morning.',
      icon: '🧺'
    },
    {
      word: 'help with the cooking',
      ipa: '/help wɪð ðə ˈkʊkɪŋ/',
      reading: 'he-l-p uýt-đ đờ cúc-kinh',
      vi: 'phụ giúp nấu ăn',
      example: 'I help with the cooking in the afternoon.',
      icon: '🍳'
    },
    {
      word: 'wash the dishes',
      ipa: '/wɒʃ ðə ˈdɪʃɪz/',
      reading: 'oát-sh đờ đi-shịt-z (đuôi -es đọc -iz)',
      vi: 'rửa bát đĩa, chén đĩa',
      example: 'My dad and I wash the dishes.',
      icon: '🍽️'
    },
    {
      word: 'watch TV',
      ipa: '/wɒtʃ ˌtiːˈviː/',
      reading: 'oát-ch ti-vi (bật âm ch dứt khoát)',
      vi: 'xem tivi',
      example: 'When do you watch TV?',
      icon: '📺'
    },
    {
      word: 'do housework',
      ipa: '/duː ˈhaʊs.wɜːk/',
      reading: 'đu hao-s-uơ-k',
      vi: 'làm việc nhà',
      example: 'I do housework on Sundays.',
      icon: '🏡'
    },
    {
      word: 'read books',
      ipa: '/riːd bʊks/',
      reading: 'rít-đ búc-ks',
      vi: 'đọc sách',
      example: 'I read books in the evening.',
      icon: '📚'
    },
    {
      word: 'listen to music',
      ipa: '/ˈlɪs.ən tuː ˈmjuː.zɪk/',
      reading: 'lít-sừn tu miu-zịch',
      vi: 'nghe nhạc',
      example: 'I listen to music at noon.',
      icon: '🎧'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 24 - 29
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Hoạt Động Hàng Ngày (Daily Activities) & Việc Nhà
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit15 && (
                <button
                  onClick={onSwitchToUnit15}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🎾 Unit 15 ➡️</span>
                </button>
              )}
              {onSwitchToUnit13 && (
                <button
                  onClick={onSwitchToUnit13}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>👤 ⬅️ Unit 13</span>
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
              {onSwitchToUnit11 && (
                <button
                  onClick={onSwitchToUnit11}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏡 Unit 11</span>
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
              UNIT 14: DAILY ACTIVITIES 🧹 🧺 🍳
            </h1>
            <p className="text-amber-100 text-sm md:text-base max-w-3xl mt-1">
              Khám phá thời gian biểu và công việc nhà tự giác mỗi ngày: Nắm vững câu hỏi thời điểm &quot;When do you...?&quot; với cặp giới từ (in the morning/afternoon/evening vs at noon), tự tin diễn đạt 4 công việc nhà ý nghĩa, làm chủ sự khác biệt giữa hai âm &quot;tch&quot; (/tʃ/) trong watch và &quot;sh&quot; (/ʃ/) trong wash!
            </p>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">⏰ When do you watch TV? - I watch TV in the evening.</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">☀️ in the morning / at noon / in the afternoon / in the evening</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🧹 What do you do? - I clean the floor / wash the clothes / help with the cooking / wash the dishes</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗣️ Phonics: watch (/tʃ/) vs wash (/ʃ/)</span>
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
                  ? 'border-amber-500 bg-white shadow-lg ring-2 ring-amber-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                <span>{l.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Lesson Content */}
      {activeLesson === 1 && (
        <Unit14Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit14Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit14Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* ========================================================================= */}
      {/* MASTER GLOSSARY FOR UNIT 14 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-600 text-white">
                Bảng Tra Cứu Phát Âm
              </span>
              <span className="text-xs font-semibold text-slate-500">IPA &amp; Gợi Ý Đọc</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Toàn Bộ Phiên Âm IPA &amp; Gợi Ý Đọc Tiếng Việt Unit 14 📖
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Bấm vào loa để nghe giọng đọc chuẩn bản xứ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {unit14Vocab.map(item => (
            <div
              key={item.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-amber-300 hover:bg-amber-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(item.word, speechRate)}
                    className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base">{item.word}</h4>
                <p className="text-xs font-mono font-bold text-indigo-700 mt-0.5">
                  🗣️ {item.ipa}
                </p>
                <p className="text-xs text-amber-800 font-semibold mt-0.5">
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
