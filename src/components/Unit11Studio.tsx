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
  Home,
  MapPin,
  Volume2
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit11Lesson1Studio } from './unit11/Unit11Lesson1Studio';
import { Unit11Lesson2Studio } from './unit11/Unit11Lesson2Studio';
import { Unit11Lesson3Studio } from './unit11/Unit11Lesson3Studio';

interface Unit11StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit10?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit11Studio: React.FC<Unit11StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit12,
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
      title: 'Tiết 1: Bạn Sống Ở Đâu? (Where do you live?)',
      pages: 'Trang 6 - 7 SGK',
      badge: 'in vs at + Địa chỉ',
      icon: '🏡',
      desc: 'Hỏi và trả lời về địa chỉ sinh sống; phân biệt "in + tên đường" và "at + số nhà + tên đường"; trò chơi truyền tin Whispering game.'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Nơi Đó Như Thế Nào? (What’s the ... like?)',
      pages: 'Trang 8 - 9 SGK',
      badge: 'busy, quiet, noisy, big',
      icon: '🚗',
      desc: 'Miêu tả đặc điểm nơi ở: a busy street, a quiet village, a noisy road, a big city & Hát karaoke "My house".'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Ngữ Âm /ɪ/ & /iː/, Đọc Hiểu & Dự Án',
      pages: 'Trang 10 - 11 SGK',
      badge: 'Phonics: big vs street',
      icon: '✍️',
      desc: 'Phân biệt âm ngắn /ɪ/ (big) và âm dài /iː/ (street); vè Little Bee & Little Fish; bài đọc căn hộ Lê Lợi; xưởng viết và dự án My beautiful home.'
    }
  ];

  // Unit 11 Core Vocabulary with Full IPA and Pronunciation Guide (gợi ý đọc)
  const unit11Vocab = [
    {
      word: 'street',
      ipa: '/striːt/',
      reading: 's-trít (ngân dài âm i, khóe miệng cười mỉm)',
      vi: 'con đường, phố (trong đô thị)',
      example: 'I live in Tran Hung Dao Street.',
      icon: '🛣️'
    },
    {
      word: 'road',
      ipa: '/rəʊd/',
      reading: 'râu-đ (âm ou tròn môi, bật âm đ nhẹ)',
      vi: 'con đường, tuyến đường liên thông',
      example: 'I live in Quang Trung Road.',
      icon: '🛤️'
    },
    {
      word: 'busy',
      ipa: '/ˈbɪzi/',
      reading: 'bít-zi (nhấn âm 1)',
      vi: 'bận rộn, nhộn nhịp, tấp nập xe cộ',
      example: "It's a busy street.",
      icon: '🚗'
    },
    {
      word: 'quiet',
      ipa: '/ˈkwaɪət/',
      reading: 'khoai-ợt (2 âm tiết nhẹ nhàng)',
      vi: 'yên tĩnh, thanh bình, êm ả',
      example: "It's a quiet village.",
      icon: '🌾'
    },
    {
      word: 'noisy',
      ipa: '/ˈnɔɪzi/',
      reading: 'noi-zi (âm oi rõ ràng)',
      vi: 'ồn ào, huyên náo nhiều còi xe',
      example: 'The road is very noisy.',
      icon: '📢'
    },
    {
      word: 'flat',
      ipa: '/flæt/',
      reading: 'flét (âm e bẹt mở rộng miệng)',
      vi: 'căn hộ chung cư',
      example: 'I live in a small flat with my parents.',
      icon: '🏢'
    },
    {
      word: 'village',
      ipa: '/ˈvɪlɪdʒ/',
      reading: 'vin-li-dzh (bật âm dzh cuối câu)',
      vi: 'ngôi làng, miền quê',
      example: 'My grandparents live in a village.',
      icon: '🏡'
    },
    {
      word: 'town',
      ipa: '/taʊn/',
      reading: 'thao-n (âm ao khép môi)',
      vi: 'thị trấn',
      example: 'He lives in a big town.',
      icon: '🏘️'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 6 - 11
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Khởi đầu Học kỳ 2
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit12 && (
                <button
                  onClick={onSwitchToUnit12}
                  className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-white/90 font-black text-xs transition flex items-center gap-1 shadow-sm"
                >
                  <span>👨‍💼 Unit 12 ➡️</span>
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
                  <span>🏆 ⬅️ Review 2</span>
                </button>
              )}
              {onSwitchToUnit10 && (
                <button
                  onClick={onSwitchToUnit10}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏖️ Unit 10</span>
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
              UNIT 11: MY HOME 🏡
            </h1>
            <p className="text-emerald-100 text-sm md:text-base max-w-3xl mt-1">
              Khám phá bài học đầu tiên của Học kỳ 2: Tự tin giới thiệu địa chỉ nhà mình với giới từ &quot;in&quot; và &quot;at&quot;, miêu tả con phố quanh nhà với các tính từ sinh động, làm chủ cặp âm /ɪ/ (big) và /iː/ (street)!
            </p>
          </div>

          {/* Quick Pill Rule Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">🛣️ in Tran Hung Dao Street</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏡 at 81 Tran Hung Dao Street</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🚗 What’s the street like? - It’s a busy street.</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗣️ Phonics: /ɪ/ (big) vs /iː/ (street)</span>
          </div>
        </div>
      </div>

      {/* 3 Lesson Selector Cards */}
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
                  ? 'border-emerald-500 bg-white shadow-lg ring-2 ring-emerald-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{l.icon}</span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">{l.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{l.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Lesson Content */}
      {activeLesson === 1 && (
        <Unit11Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit11Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit11Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* ========================================================================= */}
      {/* VOCABULARY & PRONUNCIATION MASTER GLOSSARY FOR UNIT 11 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                Bảng Tra Cứu Phát Âm
              </span>
              <span className="text-xs font-semibold text-slate-500">IPA &amp; Gợi Ý Đọc</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Toàn Bộ Phiên Âm IPA &amp; Gợi Ý Đọc Tiếng Việt Unit 11 📖
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Bấm vào loa để nghe giọng đọc chuẩn bản xứ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {unit11Vocab.map(item => (
            <div
              key={item.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(item.word, speechRate)}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-black text-slate-900 text-base">{item.word}</h4>
                <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
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
