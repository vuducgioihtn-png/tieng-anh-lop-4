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
  MapPin,
  Volume2,
  Calendar,
  Compass,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit17Lesson1Studio } from './unit17/Unit17Lesson1Studio';
import { Unit17Lesson2Studio } from './unit17/Unit17Lesson2Studio';
import { Unit17Lesson3Studio } from './unit17/Unit17Lesson3Studio';

interface Unit17StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit18?: () => void;
  onSwitchToUnit16?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToUnit15?: () => void;
  onSwitchToUnit14?: () => void;
  onSwitchToWordlist?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit17Studio: React.FC<Unit17StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit18,
  onSwitchToUnit16,
  onSwitchToReview3,
  onSwitchToUnit15,
  onSwitchToUnit14,
  onSwitchToWordlist,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Đèn Giao Thông & Biển Báo (What does it say?)',
      pages: 'Trang 46 - 47 SGK',
      badge: 'It says \'stop\' / \'go\' / \'turn left\'',
      icon: '🚦',
      desc: 'Học nhận biết và nói về luật đèn giao thông, biển báo: stop, go, turn left, turn right & trò chơi Red Light Green Light.'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hỏi & Chỉ Đường (How can I get to the...?)',
      pages: 'Trang 48 - 49 SGK',
      badge: 'Go straight and turn left / right / round',
      icon: '🧭',
      desc: 'Cách hỏi đường lịch sự bắt đầu bằng "Excuse me" và chỉ đường đến: bookshop, bakery, supermarket, cinema, campsite.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Trọng Âm Danh Từ Ghép, Bài Vè & Dự Án Bản Đồ',
      pages: 'Trang 50 - 51 SGK',
      badge: 'Phonics \'bookshop, \'campsite + Map Project',
      icon: '🗺️',
      desc: 'Luyện trọng âm từ ghép \'bookshop và \'campsite, hát vè nhịp điệu chỉ đường, đọc hiểu ngày chủ nhật ở Đà Nẵng & Bản đồ hoa tiêu nhí.'
    }
  ];

  // Unit 17 Core Vocabulary
  const unit17Vocab = [
    { word: 'stop', ipa: '/stɒp/', reading: 'xtóp', meaning: 'dừng lại (đèn đỏ)', icon: '🛑' },
    { word: 'go', ipa: '/ɡəʊ/', reading: 'gâu', meaning: 'đi tiếp (đèn xanh)', icon: '🟢' },
    { word: 'go straight', ipa: '/ɡəʊ streɪt/', reading: 'gâu strây-t', meaning: 'đi thẳng về phía trước', icon: '⬆️' },
    { word: 'turn left', ipa: '/tɜːn lɛft/', reading: 'tơn lép-t', meaning: 'rẽ sang bên trái', icon: '⬅️' },
    { word: 'turn right', ipa: '/tɜːn raɪt/', reading: 'tơn rai-t', meaning: 'rẽ sang bên phải', icon: '➡️' },
    { word: 'turn round', ipa: '/tɜːn raʊnd/', reading: 'tơn raon-đ', meaning: 'quay đầu lại / đi vòng lại', icon: '🔄' },
    { word: 'bookshop', ipa: '/ˈbʊkʃɒp/', reading: 'búc-shóp', meaning: 'hiệu sách, nhà sách', icon: '📚' },
    { word: 'bakery', ipa: '/ˈbeɪkəri/', reading: 'bây-kơ-ri', meaning: 'tiệm bánh mì, bánh ngọt', icon: '🥐' },
    { word: 'supermarket', ipa: '/ˈsuːpəmɑːkɪt/', reading: 'su-pơ-ma-kịt', meaning: 'siêu thị lớn', icon: '🛒' },
    { word: 'cinema', ipa: '/ˈsɪnəmə/', reading: 'xi-nơ-mơ', meaning: 'rạp chiếu phim', icon: '🎬' },
    { word: 'campsite', ipa: '/ˈkæmpsaɪt/', reading: 'cam-sait', meaning: 'khu cắm trại, bãi cắm trại', icon: '⛺' },
    { word: 'traffic light', ipa: '/ˈtræfɪk laɪt/', reading: 'tra-phích lai-t', meaning: 'cột đèn giao thông', icon: '🚦' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 46 - 51
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Trong Thành Phố (In the city)
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit18 && (
                <button
                  onClick={onSwitchToUnit18}
                  className="px-3 py-1.5 rounded-xl bg-white/30 hover:bg-white/40 text-white font-bold text-xs transition flex items-center gap-1 shadow-xs"
                >
                  <span>🛍️ Unit 18 ➡️</span>
                </button>
              )}
              {onSwitchToUnit16 && (
                <button
                  onClick={onSwitchToUnit16}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>⛅ ⬅️ Unit 16</span>
                </button>
              )}
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏆 Review 3</span>
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
              <span>Unit 17: In the city (Trong thành phố)</span>
              <span className="text-3xl">🏙️</span>
            </h2>
            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
              Trở thành hoa tiêu nhí và công dân nhí gương mẫu: nắm vững luật đèn tín hiệu giao thông (<em>What does it say? - It says 'stop' / 'go'</em>), tự tin hỏi đường lịch sự và chỉ đường khắp thành phố (<em>How can I get to the...? - Go straight and turn left / right</em>), phát âm chuẩn trọng âm từ ghép và thiết kế bản đồ thị trấn mơ ước!
            </p>
          </div>

          {/* Core Structure Pills */}
          <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-2 text-xs font-bold text-blue-100">
            <span className="text-yellow-300 font-black">Cấu trúc trọng tâm:</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: What does it say? - A: It says 'stop' / 'go' / 'turn left'.
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: Excuse me. How can I get to the bookshop? - A: Go straight and turn left / right.
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
                  ? 'border-blue-600 bg-white shadow-lg ring-2 ring-blue-300 -translate-y-1'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 bg-blue-50 rounded-2xl border border-blue-100">
                    {l.icon}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-800 text-sm md:text-base leading-snug">
                  {l.title}
                </h3>
                <p className="text-xs text-blue-700 font-bold mt-1 line-clamp-1">{l.badge}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                  {isActive ? 'Đang học bài này' : 'Bấm để vào học'}
                </span>
                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* LESSON CONTENT MOUNTING */}
      {activeLesson === 1 && (
        <Unit17Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit17Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit17Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* UNIT 17 VOCABULARY REFERENCE TABLE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                Từ Vựng Chuẩn SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">12 Từ Trọng Tâm Unit 17</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-800 mt-1">
              Bảng Tra Cứu Từ Vựng &amp; Phát Âm Phiên Âm IPA 📖
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {unit17Vocab.map(v => (
            <div
              key={v.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-white transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{v.icon}</span>
                  <button
                    onClick={() => speakWord(v.word, speechRate)}
                    className="p-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-black text-sm text-slate-800 mt-2">{v.word}</h4>
                <p className="text-[11px] font-mono text-slate-400">{v.ipa}</p>
                <p className="text-xs font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded-md inline-block mt-1">
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
