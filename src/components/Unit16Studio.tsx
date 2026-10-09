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
  Sun,
  CloudRain,
  Wind,
  Cloud,
  Volume2,
  Calendar,
  Store,
  Music,
  BarChart3
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit16Lesson1Studio } from './unit16/Unit16Lesson1Studio';
import { Unit16Lesson2Studio } from './unit16/Unit16Lesson2Studio';
import { Unit16Lesson3Studio } from './unit16/Unit16Lesson3Studio';

interface Unit16StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit17?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToUnit15?: () => void;
  onSwitchToUnit14?: () => void;
  onSwitchToUnit13?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit16Studio: React.FC<Unit16StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit17,
  onSwitchToReview3,
  onSwitchToUnit15,
  onSwitchToUnit14,
  onSwitchToUnit13,
  onSwitchToUnit12,
  onSwitchToUnit11,
  onSwitchToWordlist,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Hỏi Thời Tiết Quá Khứ (What was the weather like...?)',
      pages: 'Trang 40 - 41 SGK',
      badge: 'It was sunny / rainy / windy / cloudy',
      icon: '⛅',
      desc: 'Hỏi và trả lời về thời tiết cuối tuần trước & ngày hôm qua tại Sa Pa, Đà Nẵng, Huế, TP.HCM & Bài hát "What was the weather like yesterday?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Rủ Bạn Đi Chơi (Do you want to go to the...?)',
      pages: 'Trang 42 - 43 SGK',
      badge: 'Great! Let’s go. / Sorry, I can’t.',
      icon: '🏪',
      desc: 'Rủ bạn đi các địa điểm: food stall, bookshop, supermarket, bakery, water park & Trò chơi đập bảng "Slap the board and say".'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Trọng Âm Từ, Bài Vè & Dự Án Bảng Thời Tiết',
      pages: 'Trang 44 - 45 SGK',
      badge: 'Phonics \'sunny, \'rainy + Chant + Weather Chart',
      icon: '📊',
      desc: 'Luyện trọng âm từ 2 âm tiết đuôi -y, bài vè thời tiết sôi động, đọc hiểu chuyến đi mua sắm & lập bảng dự án My Weather Chart.'
    }
  ];

  // Unit 16 Core Vocabulary
  const unit16Vocab = [
    { word: 'weather', ipa: '/ˈwɛðə/', reading: 'ué-đờ', meaning: 'thời tiết', icon: '⛅' },
    { word: 'sunny', ipa: '/ˈsʌni/', reading: 'săn-ni', meaning: 'có nắng, trời nắng', icon: '☀️' },
    { word: 'rainy', ipa: '/ˈreɪni/', reading: 'rây-ni', meaning: 'có mưa, trời mưa', icon: '🌧️' },
    { word: 'windy', ipa: '/ˈwɪndi/', reading: 'uyn-đi', meaning: 'có gió, lộng gió', icon: '🍃' },
    { word: 'cloudy', ipa: '/ˈklaʊdi/', reading: 'clao-đi', meaning: 'nhiều mây, râm mát', icon: '☁️' },
    { word: 'water park', ipa: '/ˈwɔːtə pɑːk/', reading: 'oát-tờ pác', meaning: 'công viên nước', icon: '🌊' },
    { word: 'food stall', ipa: '/fuːd stɔːl/', reading: 'phu-đ sto-l', meaning: 'quầy bán đồ ăn', icon: '🍢' },
    { word: 'bookshop', ipa: '/ˈbʊkʃɒp/', reading: 'búc-shóp', meaning: 'hiệu sách, nhà sách', icon: '📚' },
    { word: 'supermarket', ipa: '/ˈsuːpəmɑːkɪt/', reading: 'su-pơ-ma-kịt', meaning: 'siêu thị', icon: '🛒' },
    { word: 'bakery', ipa: '/ˈbeɪkəri/', reading: 'bây-kơ-ri', meaning: 'tiệm bánh mì/bánh ngọt', icon: '🥐' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 40 - 45
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Thời Tiết (Weather)
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit17 && (
                <button
                  onClick={onSwitchToUnit17}
                  className="px-3 py-1.5 rounded-xl bg-white/30 hover:bg-white/40 text-white font-bold text-xs transition flex items-center gap-1 shadow-xs"
                >
                  <span>🚦 Unit 17 ➡️</span>
                </button>
              )}
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏆 ⬅️ Review 3</span>
                </button>
              )}
              {onSwitchToUnit15 && (
                <button
                  onClick={onSwitchToUnit15}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🎾 Unit 15</span>
                </button>
              )}
              {onSwitchToUnit14 && (
                <button
                  onClick={onSwitchToUnit14}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🧹 Unit 14</span>
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
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Unit 16: Weather (Thời Tiết)</span>
              <span className="text-3xl">⛅</span>
            </h2>
            <p className="text-sky-100 text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
              Khám phá thế giới thời tiết muôn màu: hỏi đáp về thời tiết quá khứ (<em>What was the weather like...?</em>), rủ bạn đi các địa điểm thú vị trong thị trấn (<em>Do you want to go to the...?</em>), phát âm chuẩn trọng âm từ đuôi <strong>-y</strong>, hát vè và làm phóng viên thời tiết!
            </p>
          </div>

          {/* Core Structure Pills */}
          <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-2 text-xs font-bold text-sky-100">
            <span className="text-yellow-300 font-black">Cấu trúc trọng tâm:</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: What was the weather like last weekend? - A: It was sunny / rainy / windy / cloudy.
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: Do you want to go to the bookshop? - A: Great! Let’s go. / Sorry, I can’t.
            </span>
          </div>
        </div>
      </div>

      {/* Lesson Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lessons.map(l => {
          const isActive = activeLesson === l.id;
          return (
            <button
              key={l.id}
              onClick={() => {
                sound.playClick();
                setActiveLesson(l.id);
              }}
              className={`p-5 rounded-3xl border-2 text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'border-sky-500 bg-white shadow-lg ring-2 ring-sky-300 -translate-y-1'
                  : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 bg-sky-50 rounded-2xl border border-sky-100">
                    {l.icon}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-800 text-sm md:text-base leading-snug">
                  {l.title}
                </h3>
                <p className="text-xs text-sky-700 font-bold mt-1 line-clamp-1">{l.badge}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>
                  {isActive ? 'Đang học bài này' : 'Bấm để vào học'}
                </span>
                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* LESSON CONTENT MOUNTING */}
      {activeLesson === 1 && (
        <Unit16Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit16Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit16Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* UNIT 16 VOCABULARY REFERENCE TABLE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-600 text-white">
                Từ Vựng Chuẩn SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">10 Từ Trọng Tâm Unit 16</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-800 mt-1">
              Bảng Tra Cứu Từ Vựng &amp; Phát Âm Phiên Âm IPA 📖
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {unit16Vocab.map(v => (
            <div
              key={v.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-white transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{v.icon}</span>
                  <button
                    onClick={() => speakWord(v.word, speechRate)}
                    className="p-1 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-black text-sm text-slate-800 mt-2">{v.word}</h4>
                <p className="text-[11px] font-mono text-slate-400">{v.ipa}</p>
                <p className="text-xs font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded-md inline-block mt-1">
                  🗣️ {v.reading}
                </p>
              </div>
              <p className="text-xs text-slate-600 italic mt-2 pt-2 border-t border-slate-200/60">
                {v.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
