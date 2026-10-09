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
  Volume2,
  Compass
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit19Lesson1Studio } from './unit19/Unit19Lesson1Studio';
import { Unit19Lesson2Studio } from './unit19/Unit19Lesson2Studio';
import { Unit19Lesson3Studio } from './unit19/Unit19Lesson3Studio';

interface Unit19StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit20?: () => void;
  onSwitchToUnit18?: () => void;
  onSwitchToUnit17?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToWordlist?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit19Studio: React.FC<Unit19StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit20,
  onSwitchToUnit18,
  onSwitchToUnit17,
  onSwitchToReview3,
  onSwitchToWordlist,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Nhận Biết Động Vật (What are these animals?)',
      pages: 'Trang 58 - 59 SGK',
      badge: 'giraffes · hippos · lions · crocodiles',
      icon: '🦒',
      desc: 'Hỏi và trả lời tên các con vật ở số nhiều trong sở thú: They’re giraffes / lions / hippos / crocodiles & Bài hát "Look, look! What are these animals?".'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Nêu Lý Do Yêu Thích (Why do you like...?)',
      pages: 'Trang 60 - 61 SGK',
      badge: 'roar loudly · run quickly · dance beautifully',
      icon: '🦁',
      desc: 'Hỏi và giải thích lý do yêu thích các loài vật với trạng từ chỉ cách thức (-ly): roar loudly, run quickly, dance beautifully & Trò chơi giải đố động tác thú cưng.'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Trọng Âm Trạng Từ, Bài Vè & Triển Lãm Poster',
      pages: 'Trang 62 - 63 SGK',
      badge: 'Phonics \'loudly, \'quickly + Animal Exhibition',
      icon: '🦚',
      desc: 'Luyện trọng âm từ hai âm tiết \'loudly và \'quickly, hát vè nhịp điệu (Track 90), đọc hiểu chuyến thăm sở thú, viết đoạn văn và làm Poster triển lãm.'
    }
  ];

  // Unit 19 Core Vocabulary
  const unit19Vocab = [
    { word: 'giraffes', ipa: '/dʒɪˈrɑːfs/', reading: 'gi-ra-pht-s', meaning: 'những chú hươu cao cổ', icon: '🦒' },
    { word: 'hippos', ipa: '/ˈhɪpəʊz/', reading: 'híp-pô-z', meaning: 'những chú hà mã', icon: '🦛' },
    { word: 'lions', ipa: '/ˈlaɪənz/', reading: 'lai-ừn-z', meaning: 'đàn sư tử dũng mãnh', icon: '🦁' },
    { word: 'crocodiles', ipa: '/ˈkrɒkədaɪlz/', reading: 'cróp-cơ-đai-l-z', meaning: 'những con cá sấu', icon: '🐊' },
    { word: 'peacocks', ipa: '/ˈpiːkɒks/', reading: 'pi-cóc-ks', meaning: 'những chú chim công', icon: '🦚' },
    { word: 'roar loudly', ipa: '/rɔː ˈlaʊdli/', reading: 'ro-r lau-đ-li', meaning: 'gầm to, vang rền chấn động', icon: '📢' },
    { word: 'run quickly', ipa: '/rʌn ˈkwɪkli/', reading: 'răn cuých-c-li', meaning: 'chạy nhanh thoăn thoắt', icon: '🏃' },
    { word: 'dance beautifully', ipa: '/dɑːns ˈbjuːtəfʊli/', reading: 'đan-s biu-tơ-phu-li', meaning: 'múa đuôi rất đẹp mắt', icon: '💃' },
    { word: 'animals', ipa: '/ˈænɪmlz/', reading: 'a-ni-mồ-l-z', meaning: 'các loài động vật', icon: '🐾' },
    { word: 'zoo', ipa: '/zuː/', reading: 'zu', meaning: 'sở thú, thảo cầm viên', icon: '🏞️' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <span>🦁 Unit 19 · The animal world</span>
              </span>
              <span className="text-xs bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full shadow-xs">
                Trang 58 – 63 SGK Tập 2
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit20 && (
                <button
                  onClick={onSwitchToUnit20}
                  className="px-3 py-1.5 rounded-xl bg-white/30 hover:bg-white/40 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs ring-1 ring-white/50"
                >
                  <span>⛺ Unit 20 ➡️</span>
                </button>
              )}
              {onSwitchToUnit18 && (
                <button
                  onClick={onSwitchToUnit18}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>⬅️ Unit 18</span>
                </button>
              )}
              {onSwitchToReview3 && (
                <button
                  onClick={onSwitchToReview3}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>⭐ Review 3</span>
                </button>
              )}
              {onSwitchToWordlist && (
                <button
                  onClick={onSwitchToWordlist}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>📖 Từ Điển</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
              <span>Unit 19: The Animal World</span>
              <span className="text-3xl md:text-4xl">🦒🦛🦁🐊🦚</span>
            </h1>
            <p className="text-amber-100 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Không gian học tập đa giác quan theo chuẩn Sách Giáo Khoa Tiếng Anh 4 Global Success Tập 2. Khám phá thế giới động vật kỳ thú, hỏi đáp tên gọi số nhiều và giải thích lý do yêu thích với trạng từ thể cách <strong>-ly</strong>!
            </p>
          </div>

          {/* 3 Lesson Switcher Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {lessons.map(ls => {
              const isActive = activeLesson === ls.id;
              return (
                <button
                  key={ls.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveLesson(ls.id);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border backdrop-blur-md relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'bg-white text-amber-950 border-white shadow-xl scale-102 ring-4 ring-white/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-101'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{ls.icon}</span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-amber-100 text-amber-900' : 'bg-white/20 text-white'
                        }`}
                      >
                        {ls.pages}
                      </span>
                    </div>
                    <h3 className="font-black text-sm md:text-base">{ls.title}</h3>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isActive ? 'text-slate-600' : 'text-amber-100/90'
                      }`}
                    >
                      {ls.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isActive ? 'text-amber-800' : 'text-amber-200'
                      }`}
                    >
                      {ls.badge}
                    </span>
                    <span className="text-xs font-black">
                      {isActive ? 'Đang học ✏️' : 'Mở bài ➡️'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Active Lesson Studio */}
      {activeLesson === 1 && (
        <Unit19Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit19Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit19Lesson3Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson2={() => setActiveLesson(2)}
        />
      )}

      {/* Flashcard Dictionary Deck */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-xs uppercase">
              Từ Vựng Cốt Lõi · Unit 19
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Thẻ Ghi Nhớ Từ Vựng Thế Giới Động Vật 🦁🦒🦚
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              speakWord(
                "giraffes. hippos. lions. crocodiles. peacocks. roar loudly. run quickly. dance beautifully.",
                speechRate
              );
            }}
            className="px-4 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát Âm Toàn Bộ Bộ Từ</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {unit19Vocab.map((v, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playClick();
                speakWord(v.word, speechRate);
              }}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50 hover:border-amber-300 hover:shadow-md transition cursor-pointer text-center space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block">{v.icon}</span>
                <h4 className="font-black text-slate-900 text-sm mt-1">{v.word}</h4>
                <p className="text-[11px] font-mono text-slate-400">{v.ipa}</p>
                <p className="text-xs font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded-md inline-block mt-1">
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
