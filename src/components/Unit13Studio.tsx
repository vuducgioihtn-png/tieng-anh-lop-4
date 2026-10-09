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
  Smile,
  User,
  Volume2
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit13Lesson1Studio } from './unit13/Unit13Lesson1Studio';
import { Unit13Lesson2Studio } from './unit13/Unit13Lesson2Studio';
import { Unit13Lesson3Studio } from './unit13/Unit13Lesson3Studio';

interface Unit13StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit14?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToUnit10?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit13Studio: React.FC<Unit13StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit14,
  onSwitchToUnit12,
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
      title: 'Tiết 1: Vóc Dáng Toàn Thân (What does he/she look like?)',
      pages: 'Trang 18 - 19 SGK',
      badge: "He's / She's + tall / short / slim / big",
      icon: '🦒',
      desc: 'Hỏi và miêu tả vóc dáng bằng động từ To-be: tall, short, slim, big & Bài hát "What do your parents look like?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Khuôn Mặt & Mái Tóc (He/She has...)',
      pages: 'Trang 20 - 21 SGK',
      badge: 'He/She has + round face / long hair / big eyes',
      icon: '😊',
      desc: 'Miêu tả đặc điểm khuôn mặt và mái tóc dùng động từ HAS: a round face, long hair, short hair, big eyes & Game Cờ Caro Tic-Tac-Toe.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm "l" & "r", Đọc Hiểu & Dự Án Gia Đình',
      pages: 'Trang 22 - 23 SGK',
      badge: 'Phonics: long (/l/) vs round (/r/)',
      icon: '📊',
      desc: 'Luyện âm chuẩn /l/ (long) và /r/ (round); bài chant "Who\'s that?", đọc hiểu đoạn văn miêu tả gia đình và dự án sáng tạo.'
    }
  ];

  // Unit 13 Master Vocabulary with full IPA and Vietnamese reading guide
  const unit13Vocab = [
    {
      word: 'tall',
      ipa: '/tɔːl/',
      reading: 'thon (âm o sâu, uốn lưỡi chạm hàm trên âm l)',
      vi: 'cao ráo, cao lớn',
      example: "He's tall and slim.",
      icon: '🦒'
    },
    {
      word: 'short',
      ipa: '/ʃɔːt/',
      reading: 'sho-t (tròn môi âm sh, bật âm t dứt khoát)',
      vi: 'thấp, lùn hoặc ngắn (tóc ngắn)',
      example: "She's short. She has short hair.",
      icon: '🧒'
    },
    {
      word: 'slim',
      ipa: '/slɪm/',
      reading: 's-lim (âm s nhẹ đầu, lim gọn gàng)',
      vi: 'thon thả, mảnh mai, cân đối',
      example: 'My mother is slim.',
      icon: '💃'
    },
    {
      word: 'big',
      ipa: '/bɪɡ/',
      reading: 'bích-g (âm i ngắn, bật âm g nhẹ)',
      vi: 'to lớn, vạm vỡ hoặc mập',
      example: 'My dad is big and strong.',
      icon: '🏋️'
    },
    {
      word: 'round face',
      ipa: '/raʊnd feɪs/',
      reading: 'rao-n-đ phây-s (nhớ có "a round face")',
      vi: 'khuôn mặt tròn bầu bĩnh',
      example: 'She has a round face.',
      icon: '😊'
    },
    {
      word: 'long hair',
      ipa: '/lɒŋ heə/',
      reading: 'lon-g he-ơ (tóc không đếm được, KHÔNG có a)',
      vi: 'mái tóc dài mượt mà',
      example: 'My sister has long hair.',
      icon: '💇‍♀️'
    },
    {
      word: 'short hair',
      ipa: '/ʃɔːt heə/',
      reading: 'sho-t he-ơ (bật âm t nhẹ)',
      vi: 'mái tóc ngắn gọn gàng',
      example: 'He has short hair.',
      icon: '👦'
    },
    {
      word: 'big eyes',
      ipa: '/bɪɡ aɪz/',
      reading: 'bích-g ai-z (hai mắt nên có số nhiều -s)',
      vi: 'đôi mắt to tròn long lanh',
      example: 'The baby has big eyes.',
      icon: '👀'
    },
    {
      word: 'long',
      ipa: '/lɒŋ/',
      reading: 'lon-g (ngân âm ng cuối)',
      vi: 'dài',
      example: 'She has long hair.',
      icon: '📏'
    },
    {
      word: 'round',
      ipa: '/raʊnd/',
      reading: 'rao-n-đ (uốn lưỡi âm r, tròn môi)',
      vi: 'tròn, hình tròn',
      example: 'He has a round face.',
      icon: '⚪'
    },
    {
      word: 'old',
      ipa: '/əʊld/',
      reading: 'ô-l-đ (âm ô kéo dài, uốn lưỡi)',
      vi: 'già, lớn tuổi',
      example: 'My grandparents are old.',
      icon: '👴'
    },
    {
      word: 'young',
      ipa: '/jʌŋ/',
      reading: 'dăng (ngân âm ng cuối)',
      vi: 'trẻ trung, còn trẻ',
      example: 'My cousin is young.',
      icon: '👶'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 18 - 23
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Ngoại Hình (Appearance) & Gia Đình
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit14 && (
                <button
                  onClick={onSwitchToUnit14}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🧹 Unit 14 ➡️</span>
                </button>
              )}
              {onSwitchToUnit12 && (
                <button
                  onClick={onSwitchToUnit12}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>👨‍💼 ⬅️ Unit 12</span>
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
              UNIT 13: APPEARANCE 👤 👱‍♀️
            </h1>
            <p className="text-purple-100 text-sm md:text-base max-w-3xl mt-1">
              Khám phá cách miêu tả ngoại hình sinh động và đáng yêu: Phân biệt chính xác cách dùng động từ To-Be (He is tall/slim) cho vóc dáng và động từ Has (He has a round face/big eyes) cho khuôn mặt và mái tóc; làm chủ trọn vẹn ngữ âm chuẩn /l/ (long) và /r/ (round)!
            </p>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">🦒 What does he/she look like? - He&apos;s/She&apos;s tall / short / slim / big</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">😊 He/She has a round face / long hair / short hair / big eyes</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">💡 Mẹo nhớ: Dáng người dùng &quot;is&quot; · Bộ phận khuôn mặt dùng &quot;has&quot;</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗣️ Phonics: /l/ (long) vs /r/ (round)</span>
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
                  ? 'border-purple-500 bg-white shadow-lg ring-2 ring-purple-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[10px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>{l.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Lesson Content */}
      {activeLesson === 1 && (
        <Unit13Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit13Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit13Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* ========================================================================= */}
      {/* MASTER GLOSSARY FOR UNIT 13 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                Bảng Tra Cứu Phát Âm
              </span>
              <span className="text-xs font-semibold text-slate-500">IPA &amp; Gợi Ý Đọc</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Toàn Bộ Phiên Âm IPA &amp; Gợi Ý Đọc Tiếng Việt Unit 13 📖
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Bấm vào loa để nghe giọng đọc chuẩn bản xứ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {unit13Vocab.map(item => (
            <div
              key={item.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-purple-300 hover:bg-purple-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(item.word, speechRate)}
                    className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base">{item.word}</h4>
                <p className="text-xs font-mono font-bold text-purple-700 mt-0.5">
                  🗣️ {item.ipa}
                </p>
                <p className="text-xs text-fuchsia-700 font-semibold mt-0.5">
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
