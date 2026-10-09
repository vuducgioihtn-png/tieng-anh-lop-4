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
  Tent,
  Flame,
  Camera,
  Compass
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Unit20Lesson1Studio } from './unit20/Unit20Lesson1Studio';
import { Unit20Lesson2Studio } from './unit20/Unit20Lesson2Studio';
import { Unit20Lesson3Studio } from './unit20/Unit20Lesson3Studio';

interface Unit20StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToReview4?: () => void;
  onSwitchToUnit19?: () => void;
  onSwitchToUnit18?: () => void;
  onSwitchToReview3?: () => void;
  onSwitchToWordlist?: () => void;
  initialLesson?: 1 | 2 | 3;
}

export const Unit20Studio: React.FC<Unit20StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToReview4,
  onSwitchToUnit19,
  onSwitchToUnit18,
  onSwitchToReview3,
  onSwitchToWordlist,
  initialLesson = 1
}) => {
  const [activeLesson, setActiveLesson] = useState<1 | 2 | 3>(initialLesson);

  const lessons = [
    {
      id: 1 as const,
      title: 'Tiết 1: Hoạt Động Cá Nhân Ở Trại (What’s he / she doing?)',
      pages: 'Trang 64 - 65 SGK',
      badge: 'putting up a tent · building a campfire',
      icon: '⛺',
      desc: 'Hỏi và trả lời một người đang làm gì: He’s / She’s putting up a tent, building a campfire, telling a story, taking a photo & Game đoán hành động trại hè.'
    },
    {
      id: 2 as const,
      title: 'Tiết 2: Hoạt Động Nhóm Trại Hè (What are they doing?)',
      pages: 'Trang 66 - 67 SGK',
      badge: 'tug of war · card games · dancing',
      icon: '🪢',
      desc: 'Hỏi và miêu tả nhiều người cùng hoạt động: They’re playing tug of war, playing card games, dancing around the campfire, singing songs & Bài hát "What are they doing?".'
    },
    {
      id: 3 as const,
      title: 'Tiết 3: Trọng Âm Động Từ, Bài Vè & Dự Án Trại Hè',
      pages: 'Trang 68 - 69 SGK',
      badge: 'Phonics \'visit, \'email + Camp Project',
      icon: '🔥',
      desc: 'Luyện trọng âm từ hai âm tiết \'visit và \'email, hát vè nhịp điệu (Track 101), đọc hiểu ngày Chủ Nhật ở trại hè của Minh, viết nhật ký và thuyết trình tranh vẽ.'
    }
  ];

  // Unit 20 Core Vocabulary
  const unit20Vocab = [
    { word: 'campsite', ipa: '/ˈkæmpsaɪt/', reading: 'cém-xai-t', meaning: 'khu vực cắm trại', icon: '🏕️' },
    { word: 'putting up a tent', ipa: '/ˈpʊtɪŋ ʌp ə tɛnt/', reading: 'pút-tin áp ơ ten-t', meaning: 'dựng lều cắm trại', icon: '⛺' },
    { word: 'building a campfire', ipa: '/ˈbɪldɪŋ ə ˈkæmpfaɪə/', reading: 'bin-đin ơ cém-phai-ơ', meaning: 'nhóm đống lửa trại', icon: '🔥' },
    { word: 'telling a story', ipa: '/ˈtɛlɪŋ ə ˈstɔːri/', reading: 'ten-lin ơ s-to-ri', meaning: 'kể một câu chuyện', icon: '📖' },
    { word: 'taking a photo', ipa: '/ˈteɪkɪŋ ə ˈfəʊtəʊ/', reading: 'tây-kin ơ phâu-tâu', meaning: 'chụp một bức ảnh', icon: '📸' },
    { word: 'playing tug of war', ipa: '/ˈpleɪɪŋ tʌɡ əv wɔː/', reading: 'plây-in tắc-g ọp-v o-r', meaning: 'chơi trò kéo co', icon: '🪢' },
    { word: 'playing card games', ipa: '/ˈpleɪɪŋ kɑːd ɡeɪmz/', reading: 'plây-in cát-đ gêm-z', meaning: 'chơi trò chơi thẻ bài', icon: '🃏' },
    { word: 'dancing around the campfire', ipa: '/ˈdɑːnsɪŋ əˈraʊnd ðə ˈkæmpfaɪə/', reading: 'đan-sin ơ-raon-đ đờ cém-phai-ơ', meaning: 'nhảy múa quanh đống lửa', icon: '💃🔥' },
    { word: 'singing songs', ipa: '/ˈsɪŋɪŋ sɒŋz/', reading: 'xinh-in son-z', meaning: 'hát vang các bài ca', icon: '🎶' },
    { word: 'visit', ipa: '/ˈvɪzɪt/', reading: 'vít-zịt', meaning: 'thăm viếng, đến thăm', icon: '👵👴' },
    { word: 'email', ipa: '/ˈiːmeɪl/', reading: 'i-mêu', meaning: 'gửi thư điện tử', icon: '📧' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <span>⛺ Unit 20 · At summer camp</span>
              </span>
              <span className="text-xs bg-yellow-300 text-orange-950 font-black px-2.5 py-0.5 rounded-full shadow-xs">
                Trang 64 – 69 SGK Tập 2
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToReview4 && (
                <button
                  onClick={onSwitchToReview4}
                  className="px-3 py-1.5 rounded-xl bg-white/30 hover:bg-white/40 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs ring-1 ring-white/50"
                >
                  <span>🏆 Review 4 ➡️</span>
                </button>
              )}
              {onSwitchToUnit19 && (
                <button
                  onClick={onSwitchToUnit19}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <span>⬅️ 🦁 Unit 19</span>
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
              <span>Unit 20: At Summer Camp</span>
              <span className="text-3xl md:text-4xl">⛺🔥🪢🃏📸</span>
            </h1>
            <p className="text-orange-100 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
              Không gian học tập tương tác khép lại chương trình Tiếng Anh 4 Global Success Tập 2 với không khí trại hè tưng bừng! Làm chủ hoàn toàn thì Hiện Tại Tiếp Diễn với các câu hỏi: <strong>&quot;What&apos;s he/she doing?&quot;</strong> và <strong>&quot;What are they doing?&quot;</strong>.
            </p>
          </div>

          {/* 3 Lesson Selector Cards */}
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
                      ? 'bg-white text-orange-950 border-white shadow-xl scale-102 ring-4 ring-white/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-101'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{ls.icon}</span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-orange-100 text-orange-900' : 'bg-white/20 text-white'
                        }`}
                      >
                        {ls.pages}
                      </span>
                    </div>
                    <h3 className="font-black text-sm md:text-base">{ls.title}</h3>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isActive ? 'text-slate-600' : 'text-orange-100/90'
                      }`}
                    >
                      {ls.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isActive ? 'text-orange-800' : 'text-orange-200'
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
        <Unit20Lesson1Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson2={() => setActiveLesson(2)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 2 && (
        <Unit20Lesson2Studio
          speechRate={speechRate}
          onAddStar={onAddStar}
          onOpenVoiceStudio={onOpenVoiceStudio}
          onSwitchToLesson1={() => setActiveLesson(1)}
          onSwitchToLesson3={() => setActiveLesson(3)}
        />
      )}

      {activeLesson === 3 && (
        <Unit20Lesson3Studio
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
            <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-xs uppercase">
              Từ Vựng Cốt Lõi · Unit 20
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Thẻ Ghi Nhớ Từ Vựng Trại Hè Sôi Động ⛺🔥🪢
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              speakWord(
                "campsite. putting up a tent. building a campfire. telling a story. taking a photo. playing tug of war. playing card games. dancing around the campfire. singing songs. visit. email.",
                speechRate
              );
            }}
            className="px-4 py-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát Âm Toàn Bộ Bộ Từ</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {unit20Vocab.map((v, i) => (
            <div
              key={i}
              onClick={() => {
                sound.playClick();
                speakWord(v.word, speechRate);
              }}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition cursor-pointer text-center space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block">{v.icon}</span>
                <h4 className="font-black text-slate-900 text-sm mt-1">{v.word}</h4>
                <p className="text-[11px] font-mono text-slate-400">{v.ipa}</p>
                <p className="text-xs font-bold text-orange-800 bg-orange-100/70 px-1.5 py-0.5 rounded-md inline-block mt-1">
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
