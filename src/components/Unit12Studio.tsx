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
  Briefcase,
  MapPin,
  Volume2
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit12Lesson1Studio } from './unit12/Unit12Lesson1Studio';
import { Unit12Lesson2Studio } from './unit12/Unit12Lesson2Studio';
import { Unit12Lesson3Studio } from './unit12/Unit12Lesson3Studio';

interface Unit12StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit13?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToUnit10?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit12Studio: React.FC<Unit12StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit13,
  onSwitchToUnit11,
  onSwitchToUnit10,
  onSwitchToReview2,
  onSwitchToWordlist,
  onSwitchToUnit1,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Nghề Nghiệp Của Ai Đó (What does he/she do?)',
      pages: 'Trang 12 - 13 SGK',
      badge: 'a vs an + Nghề nghiệp',
      icon: '👮‍♂️',
      desc: 'Hỏi và trả lời nghề nghiệp: a farmer, a policeman, an office worker, an actor & Bài hát "My lovely family".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Nơi Làm Việc (Where does he/she work?)',
      pages: 'Trang 14 - 15 SGK',
      badge: 'at vs on + Nơi làm việc',
      icon: '🏥',
      desc: 'Hỏi nơi làm việc: at a nursing home, at a factory, at a school, on a farm & Trò chơi Guessing game.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm "ar" & "ur", Điền Bảng & Dự Án',
      pages: 'Trang 16 - 17 SGK',
      badge: 'Phonics: farmer vs nurse',
      icon: '📊',
      desc: 'Phân biệt âm /ɑː/ (farmer) và /ɜː/ (nurse); bài đọc và hoàn thành bảng thông tin gia đình; dự án Members of my family.'
    }
  ];

  // Unit 12 Master Vocabulary with full IPA and Vietnamese reading guide
  const unit12Vocab = [
    {
      word: 'farmer',
      ipa: '/ˈfɑːmə/',
      reading: 'pha-mờ (kéo dài âm a, âm ph nhẹ)',
      vi: 'người nông dân',
      example: 'My father is a farmer. He works on a farm.',
      icon: '🌾'
    },
    {
      word: 'nurse',
      ipa: '/nɜːs/',
      reading: 'nơ-s (kéo dài âm ơ, bật âm s nhẹ)',
      vi: 'y tá, điều dưỡng viên',
      example: 'She is a nurse at a nursing home.',
      icon: '👩‍⚕️'
    },
    {
      word: 'policeman',
      ipa: '/pəˈliːsmən/',
      reading: 'pơ-lít-s-mừn (nhấn âm 2 lít)',
      vi: 'chú cảnh sát, công an',
      example: "He's a policeman.",
      icon: '👮‍♂️'
    },
    {
      word: 'office worker',
      ipa: '/ˈɒfɪs ˌwɜːkə/',
      reading: 'óp-phít uơ-kờ (chú ý dùng "an")',
      vi: 'nhân viên văn phòng',
      example: "She's an office worker.",
      icon: '💼'
    },
    {
      word: 'actor',
      ipa: '/ˈæktə/',
      reading: 'éc-tờ (chú ý dùng "an")',
      vi: 'diễn viên nam',
      example: "He's an actor.",
      icon: '🎭'
    },
    {
      word: 'worker',
      ipa: '/ˈwɜːkə/',
      reading: 'uơ-kờ (âm uơ dài nhẹ)',
      vi: 'công nhân',
      example: 'He works at a factory.',
      icon: '👷‍♂️'
    },
    {
      word: 'nursing home',
      ipa: '/ˈnɜːsɪŋ həʊm/',
      reading: 'nơ-sính hôm',
      vi: 'viện dưỡng lão',
      example: 'She works at a nursing home.',
      icon: '🏥'
    },
    {
      word: 'factory',
      ipa: '/ˈfæktəri/',
      reading: 'phéc-tơ-ri (nhấn âm 1 phéc)',
      vi: 'nhà máy, xí nghiệp',
      example: 'He works at a factory.',
      icon: '🏭'
    },
    {
      word: 'farm',
      ipa: '/fɑːm/',
      reading: 'pha-m (kéo dài âm a sâu)',
      vi: 'nông trại, trang trại',
      example: 'He works on a farm.',
      icon: '🚜'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 12 - 17
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Nghề Nghiệp &amp; Gia Đình
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit13 && (
                <button
                  onClick={onSwitchToUnit13}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>👤 Unit 13 ➡️</span>
                </button>
              )}
              {onSwitchToUnit11 && (
                <button
                  onClick={onSwitchToUnit11}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏡 ⬅️ Unit 11</span>
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
              UNIT 12: JOBS 👨‍💼 👩‍⚕️
            </h1>
            <p className="text-sky-100 text-sm md:text-base max-w-3xl mt-1">
              Khám phá thế giới nghề nghiệp phong phú của các thành viên trong gia đình: Tự tin hỏi đáp nghề nghiệp với mạo từ &quot;a&quot; và &quot;an&quot;, xác định chính xác nơi làm việc (at / on), làm chủ cặp âm &quot;ar&quot; (/ɑː/) và &quot;ur&quot; (/ɜː/)!
            </p>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">👮‍♂️ What does he/she do? - He&apos;s/She&apos;s a(n)...</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏥 Where does he/she work? - He/She works at/on...</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🌾 on a farm vs at a factory / school / nursing home</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗣️ Phonics: /ɑː/ (farmer) vs /ɜː/ (nurse)</span>
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
                  ? 'border-sky-500 bg-white shadow-lg ring-2 ring-sky-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[10px] font-extrabold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>{l.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Lesson Content */}
      {activeLesson === 1 && (
        <Unit12Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit12Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit12Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* ========================================================================= */}
      {/* MASTER GLOSSARY FOR UNIT 12 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-600 text-white">
                Bảng Tra Cứu Phát Âm
              </span>
              <span className="text-xs font-semibold text-slate-500">IPA &amp; Gợi Ý Đọc</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Toàn Bộ Phiên Âm IPA &amp; Gợi Ý Đọc Tiếng Việt Unit 12 📖
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Bấm vào loa để nghe giọng đọc chuẩn bản xứ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {unit12Vocab.map(item => (
            <div
              key={item.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-sky-300 hover:bg-sky-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(item.word, speechRate)}
                    className="p-1.5 text-sky-600 hover:bg-sky-100 rounded-lg transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base">{item.word}</h4>
                <p className="text-xs font-mono font-bold text-sky-700 mt-0.5">
                  🗣️ {item.ipa}
                </p>
                <p className="text-xs text-indigo-700 font-semibold mt-0.5">
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
