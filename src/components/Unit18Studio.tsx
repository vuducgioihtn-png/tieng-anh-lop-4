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
  ShoppingBag,
  Volume2,
  Tag,
  DollarSign,
  Store,
  Compass
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit18Lesson1Studio } from './unit18/Unit18Lesson1Studio';
import { Unit18Lesson2Studio } from './unit18/Unit18Lesson2Studio';
import { Unit18Lesson3Studio } from './unit18/Unit18Lesson3Studio';

interface Unit18StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit19?: () => void;
  onSwitchToUnit17?: () => void;
  onSwitchToUnit16?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToWordlist?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit18Studio: React.FC<Unit18StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit19,
  onSwitchToUnit17,
  onSwitchToUnit16,
  onSwitchToReview3,
  onSwitchToWordlist,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Vị Trí Cửa Hàng (Where’s the...?)',
      pages: 'Trang 52 - 53 SGK',
      badge: 'near · opposite · behind · between',
      icon: '🏬',
      desc: 'Hỏi và chỉ vị trí các gian hàng trong TTTM: bookshop, bakery, gift shop, shoe shop & Bài hát "Where’s the bookshop?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hỏi & Đáp Giá Tiền (How much is the...?)',
      pages: 'Trang 54 - 55 SGK',
      badge: 'It’s ... thousand dong',
      icon: '🏷️',
      desc: 'Hỏi giá tiền đồ vật bằng đơn vị thousand dong: T-shirt, skirt, pen, school bag & Trò chơi đoán giá "Guess the price!".'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Trọng Âm be- , Bài Vè & Dự Án Mua Sắm',
      pages: 'Trang 56 - 57 SGK',
      badge: 'Phonics be\'hind, be\'tween + Shopping List',
      icon: '🛍️',
      desc: 'Luyện trọng âm từ be\'hind và be\'tween, hát vè nhịp điệu, đọc hiểu bảng mua sắm của Mai & Linh, viết bài và thuyết trình danh sách đồ mua.'
    }
  ];

  // Unit 18 Core Vocabulary
  const unit18Vocab = [
    { word: 'near', ipa: '/nɪə/', reading: 'nia', meaning: 'ở gần (kề bên)', icon: '📍' },
    { word: 'opposite', ipa: '/ˈɒpəzɪt/', reading: 'óp-pơ-zịt', meaning: 'đối diện (qua lối đi)', icon: '↔️' },
    { word: 'behind', ipa: '/bɪˈhaɪnd/', reading: 'bi-hain-đ', meaning: 'ở phía sau / đằng sau', icon: '🔙' },
    { word: 'between', ipa: '/bɪˈtwiːn/', reading: 'bi-tuyn', meaning: 'ở giữa hai địa điểm', icon: '🥪' },
    { word: 'skirt', ipa: '/skɜːt/', reading: 's-cớt', meaning: 'chiếc chân váy', icon: '👗' },
    { word: 'T-shirt', ipa: '/ˈtiːʃɜːt/', reading: 'ti-shớt', meaning: 'áo thun, áo phông', icon: '👕' },
    { word: 'pen', ipa: '/pɛn/', reading: 'pen', meaning: 'cây bút', icon: '✒️' },
    { word: 'school bag', ipa: '/ˈskuːl bæɡ/', reading: 's-cu-l béc-g', meaning: 'cặp sách, ba lô', icon: '🎒' },
    { word: 'thousand', ipa: '/ˈθaʊzənd/', reading: 'thao-zừn-đ', meaning: 'nghìn (ngàn)', icon: '💵' },
    { word: 'gift shop', ipa: '/ˈɡɪft ʃɒp/', reading: 'gíp-ft shóp', meaning: 'tiệm quà lưu niệm', icon: '🎁' },
    { word: 'bakery', ipa: '/ˈbeɪkəri/', reading: 'bây-kơ-ri', meaning: 'tiệm bánh mì/bánh ngọt', icon: '🥐' },
    { word: 'shoe shop', ipa: '/ˈʃuː ʃɒp/', reading: 'shu shóp', meaning: 'tiệm bán giày dép', icon: '👟' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 52 - 57
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Chủ đề: Tại Trung Tâm Mua Sắm (At the shopping centre)
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit19 && (
                <button
                  onClick={onSwitchToUnit19}
                  className="px-3 py-1.5 rounded-xl bg-white/30 hover:bg-white/40 text-white font-bold text-xs transition flex items-center gap-1 shadow-xs ring-1 ring-white/50"
                >
                  <span>🦁 Unit 19 ➡️</span>
                </button>
              )}
              {onSwitchToUnit17 && (
                <button
                  onClick={onSwitchToUnit17}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🚦 ⬅️ Unit 17</span>
                </button>
              )}
              {onSwitchToUnit16 && (
                <button
                  onClick={onSwitchToUnit16}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>⛅ Unit 16</span>
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
              <span>Unit 18: At the shopping centre</span>
              <span className="text-3xl">🛍️</span>
            </h2>
            <p className="text-pink-100 text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
              Trở thành nhà mua sắm nhí thông thái: tự tin hỏi và chỉ vị trí các gian hàng (<em>Where’s the bookshop? - It’s near / opposite / behind / between...</em>), hỏi giá và thanh toán đồ vật bằng tiếng Anh (<em>How much is the...? - It’s ... thousand dong</em>), phát âm chuẩn trọng âm từ có tiền tố <strong>be-</strong> và lập bảng dự án giỏ hàng mua sắm!
            </p>
          </div>

          {/* Core Structure Pills */}
          <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-2 text-xs font-bold text-pink-100">
            <span className="text-yellow-300 font-black">Cấu trúc trọng tâm:</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: Where’s the bakery? - A: It’s near the gift shop / between the bookshop and the bakery.
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              Q: How much is the T-shirt? - A: It’s sixty thousand dong.
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
                  ? 'border-pink-600 bg-white shadow-lg ring-2 ring-pink-300 -translate-y-1'
                  : 'border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 bg-pink-50 rounded-2xl border border-pink-100">
                    {l.icon}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
                    {l.pages}
                  </span>
                </div>
                <h3 className="font-black text-slate-800 text-sm md:text-base leading-snug">
                  {l.title}
                </h3>
                <p className="text-xs text-pink-700 font-bold mt-1 line-clamp-1">{l.badge}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{l.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={isActive ? 'text-pink-600' : 'text-slate-400'}>
                  {isActive ? 'Đang học bài này' : 'Bấm để vào học'}
                </span>
                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-pink-600' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* LESSON CONTENT MOUNTING */}
      {activeLesson === 1 && (
        <Unit18Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit18Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit18Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* UNIT 18 VOCABULARY REFERENCE TABLE */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-600 text-white">
                Từ Vựng Chuẩn SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">12 Từ Trọng Tâm Unit 18</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-800 mt-1">
              Bảng Tra Cứu Từ Vựng &amp; Phát Âm Phiên Âm IPA 📖
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {unit18Vocab.map(v => (
            <div
              key={v.word}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-pink-300 hover:bg-white transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{v.icon}</span>
                  <button
                    onClick={() => speakWord(v.word, speechRate)}
                    className="p-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-black text-sm text-slate-800 mt-2">{v.word}</h4>
                <p className="text-[11px] font-mono text-slate-400">{v.ipa}</p>
                <p className="text-xs font-bold text-pink-800 bg-pink-50 px-1.5 py-0.5 rounded-md inline-block mt-1">
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
