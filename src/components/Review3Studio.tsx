import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Award,
  Calendar,
  Compass,
  Headphones,
  PenTool,
  HelpCircle,
  Lightbulb,
  Heart,
  Star,
  Home,
  Briefcase,
  User,
  Clock,
  Film
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Review3ListenSpeak } from './review3/Review3ListenSpeak';
import { Review3ReadWrite } from './review3/Review3ReadWrite';
import { Review3Extension } from './review3/Review3Extension';
import { Review3BoardGame } from './review3/Review3BoardGame';

interface Review3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit16?: () => void;
  onSwitchToUnit15?: () => void;
  onSwitchToUnit14?: () => void;
  onSwitchToUnit13?: () => void;
  onSwitchToUnit12?: () => void;
  onSwitchToUnit11?: () => void;
  onSwitchToReview2?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit1?: () => void;
  initialTab?: number;
}

export const Review3Studio: React.FC<Review3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit16,
  onSwitchToUnit15,
  onSwitchToUnit14,
  onSwitchToUnit13,
  onSwitchToUnit12,
  onSwitchToUnit11,
  onSwitchToReview2,
  onSwitchToWordlist,
  onSwitchToUnit1,
  initialTab = 1
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialTab);

  const tabs = [
    {
      id: 1,
      title: 'Trang 36: Nghe & Nói',
      subtitle: 'Listen & Tick + 5 Chủ Đề Luyện Nói',
      icon: '🎧',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Trang 37: Đọc & Viết',
      subtitle: 'Read & Match + Bài Văn Điền Từ + Viết',
      icon: '✍️',
      color: 'from-purple-600 to-fuchsia-600'
    },
    {
      id: 3,
      title: 'Trang 38: Mở Rộng',
      subtitle: 'World Families + Phân Loại 15 Từ Vựng',
      icon: '🌍',
      color: 'from-teal-600 to-emerald-600'
    },
    {
      id: 4,
      title: 'Trang 39: Cờ Tỷ Phú',
      subtitle: 'Board Game 12 Ô Lắc Xúc Xắc 3D',
      icon: '🎲',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 5,
      title: 'Đại Thử Thách Ôn Tập',
      subtitle: '10 Câu Trắc Nghiệm Tổng Hợp Units 11 - 15',
      icon: '🏆',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 6,
      title: 'Góc Phụ Huynh',
      subtitle: 'Bản Đồ Ngữ Pháp & Hướng Dẫn Đồng Hành',
      icon: '❤️',
      color: 'from-sky-500 to-blue-600'
    }
  ];

  // TAB 5: GRAND CHALLENGE QUESTIONS (UNITS 11 - 15)
  interface GrandQuestion {
    id: number;
    unit: string;
    q: string;
    qVi: string;
    options: string[];
    answer: string;
    exp: string;
  }

  const grandQuestions: GrandQuestion[] = [
    {
      id: 1,
      unit: 'Unit 11 · My home',
      q: 'Where do you live? - I live ___ Flat 12, Lotus Tower.',
      qVi: 'Bạn sống ở đâu? - Tớ sống ở căn hộ 12, toà nhà Lotus Tower.',
      options: ['in', 'at', 'on'],
      answer: 'in',
      exp: 'Sống trong một căn hộ ta dùng giới từ "in Flat 12".'
    },
    {
      id: 2,
      unit: 'Unit 11 · My home',
      q: 'What is your street like? - It is big and ___.',
      qVi: 'Con phố của bạn như thế nào? - Nó rộng lớn và ___.',
      options: ['busy', 'slim', 'tall'],
      answer: 'busy',
      exp: 'Miêu tả đường phố tấp nập, nhộn nhịp ta dùng tính từ "busy".'
    },
    {
      id: 3,
      unit: 'Unit 12 · Jobs',
      q: 'What does your mother do? - She is a ___. She works at a hospital.',
      qVi: 'Mẹ bạn làm nghề gì? - Mẹ tớ là ___. Mẹ làm việc ở bệnh viện.',
      options: ['nurse', 'farmer', 'worker'],
      answer: 'nurse',
      exp: 'Làm việc tại bệnh viện (hospital) là bác sĩ hoặc y tá (nurse).'
    },
    {
      id: 4,
      unit: 'Unit 12 · Jobs',
      q: 'Where does a worker work? - He works in a ___.',
      qVi: 'Một công nhân làm việc ở đâu? - Bác ấy làm việc trong một ___.',
      options: ['factory', 'school', 'farm'],
      answer: 'factory',
      exp: 'Công nhân làm việc trong nhà máy (factory).'
    },
    {
      id: 5,
      unit: 'Unit 13 · Appearance',
      q: 'What does he look like? - He is tall and has a ___ face.',
      qVi: 'Cậu ấy trông như thế nào? - Cậu ấy cao và có khuôn mặt ___.',
      options: ['round', 'short', 'quiet'],
      answer: 'round',
      exp: '"round face" nghĩa là khuôn mặt tròn.'
    },
    {
      id: 6,
      unit: 'Unit 13 · Appearance',
      q: 'She has long black ___.',
      qVi: 'Cô ấy có mái tóc đen dài.',
      options: ['hair', 'eyes', 'ears'],
      answer: 'hair',
      exp: 'Mái tóc đen dài là "long black hair".'
    },
    {
      id: 7,
      unit: 'Unit 14 · Daily Activities',
      q: 'What do you do in the morning? - I ___ my face and have breakfast.',
      qVi: 'Bạn làm gì vào buổi sáng? - Tớ ___ mặt và ăn sáng.',
      options: ['wash', 'watch', 'cook'],
      answer: 'wash',
      exp: '"wash my face" là rửa mặt.'
    },
    {
      id: 8,
      unit: 'Unit 14 · Daily Activities',
      q: 'When do you cook dinner? - I cook dinner in the ___.',
      qVi: 'Khi nào bạn nấu bữa tối? - Tớ nấu bữa tối vào ___.',
      options: ['evening', 'morning', 'afternoon'],
      answer: 'evening',
      exp: 'Bữa tối (dinner) diễn ra vào buổi tối (evening).'
    },
    {
      id: 9,
      unit: 'Unit 15 · Family Weekends',
      q: 'Where does he go on Saturdays? - He goes to the ___ to watch a film.',
      qVi: 'Cậu ấy đi đâu vào thứ Bảy? - Cậu ấy đến ___ để xem phim.',
      options: ['cinema', 'swimming pool', 'sports centre'],
      answer: 'cinema',
      exp: 'Xem phim (watch a film) thì đi rạp chiếu phim (cinema).'
    },
    {
      id: 10,
      unit: 'Unit 15 · Family Weekends',
      q: 'What does your brother do on Sundays? - He ___ tennis.',
      qVi: 'Anh trai bạn làm gì vào Chủ nhật? - Anh ấy ___ tennis.',
      options: ['plays', 'goes', 'does'],
      answer: 'plays',
      exp: 'Chơi thể thao với bóng và vợt ta dùng "plays tennis".'
    }
  ];

  const [grandAnswers, setGrandAnswers] = useState<Record<number, string>>({});
  const [grandSubmitted, setGrandSubmitted] = useState<boolean>(false);

  const handleSelectGrand = (qId: number, val: string) => {
    if (grandSubmitted) return;
    sound.playClick();
    setGrandAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleCheckGrand = () => {
    const answeredCount = Object.keys(grandAnswers).length;
    if (answeredCount < grandQuestions.length) {
      sound.playWarning();
      return;
    }

    setGrandSubmitted(true);
    let correct = 0;
    grandQuestions.forEach(q => {
      if (grandAnswers[q.id] === q.answer) {
        correct++;
      }
    });

    if (correct === 10) {
      sound.playComplete();
      onAddStar(10);
      confetti({ particleCount: 120, spread: 90 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetGrand = () => {
    sound.playClick();
    setGrandAnswers({});
    setGrandSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                SGK Tiếng Anh 4 Tập 2 · Trang 36 - 39
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                ÔN TẬP 3 &amp; MỞ RỘNG (Review 3 &amp; Extension)
              </span>
            </div>

            {/* Quick Switchers */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit16 && (
                <button
                  onClick={onSwitchToUnit16}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-900 font-black text-xs transition flex items-center gap-1 shadow-md"
                >
                  <span>⛅ ➡️ Unit 16</span>
                </button>
              )}
              {onSwitchToUnit15 && (
                <button
                  onClick={onSwitchToUnit15}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🎾 ⬅️ Unit 15</span>
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
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Review 3: Trạm Dừng Chân Units 11 - 15</span>
              <span className="text-3xl">🏆</span>
            </h2>
            <p className="text-indigo-100 text-sm md:text-base mt-1 max-w-3xl leading-relaxed">
              Tổng hợp tinh hoa 5 bài học Tập 2: <strong>Ngôi nhà &amp; Nơi ở</strong> (Unit 11) ·{' '}
              <strong>Nghề nghiệp &amp; Nơi làm việc</strong> (Unit 12) ·{' '}
              <strong>Ngoại hình &amp; Đặc điểm</strong> (Unit 13) ·{' '}
              <strong>Hoạt động &amp; Việc nhà hàng ngày</strong> (Unit 14) ·{' '}
              <strong>Cuối tuần vui vẻ của gia đình</strong> (Unit 15).
            </p>
          </div>

          {/* Key Structures Quick Pill Bar */}
          <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-100">
            <span className="text-yellow-300 font-black">5 Mẫu câu vàng:</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏡 Where do you live? - I live in / at...</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">👨‍💼 What does he do? Where does he work?</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">👤 What does she look like? - She’s slim / has long hair</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🧹 What do you do in the evening? - I wash the dishes</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🎾 Where does he go on Saturdays? - To the cinema</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'border-indigo-600 bg-white shadow-lg ring-2 ring-indigo-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
              }`}
            >
              <div>
                <span className="text-2xl block mb-1">{tab.icon}</span>
                <h4 className="font-extrabold text-slate-800 text-xs md:text-sm leading-snug">
                  {tab.title}
                </h4>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{tab.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT RENDERING */}
      {activeTab === 1 && (
        <Review3ListenSpeak speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 2 && (
        <Review3ReadWrite speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 3 && (
        <Review3Extension speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 4 && (
        <Review3BoardGame speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {/* TAB 5: GRAND CHALLENGE */}
      {activeTab === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white">
                  Đại Thử Thách
                </span>
                <span className="text-xs font-semibold text-slate-500">10 Câu Trắc Nghiệm Units 11 - 15</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1">
                Grand Review Quiz (Units 11, 12, 13, 14, 15) 🥇
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kiểm tra toàn diện kiến thức học kỳ 2: Nơi ở, Nghề nghiệp, Ngoại hình, Thói quen &amp; Cuối tuần.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetGrand}
                className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                Làm lại
              </button>
              <button
                onClick={handleCheckGrand}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-xs md:text-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> Nộp bài &amp; Nhận cúp vàng
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {grandQuestions.map((q, idx) => {
              const currentAnswer = grandAnswers[q.id];
              const isCorrect = currentAnswer === q.answer;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    grandSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-lg">
                      {q.unit}
                    </span>
                    <button
                      onClick={() => speakWord(q.q, speechRate)}
                      className="p-1 text-slate-500 hover:text-slate-800 transition"
                      title="Nghe câu hỏi"
                    >
                      <Headphones className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base mb-1">
                    Câu {idx + 1}: {q.q}
                  </h4>
                  <p className="text-xs text-slate-500 italic mb-3">💡 {q.qVi}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, i) => {
                      const isSelected = currentAnswer === opt;
                      let optStyle = 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300';
                      if (isSelected && !grandSubmitted) {
                        optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-400';
                      }
                      if (grandSubmitted) {
                        if (opt === q.answer) {
                          optStyle = 'border-emerald-500 bg-emerald-200 text-emerald-950 font-black';
                        } else if (isSelected && opt !== q.answer) {
                          optStyle = 'border-rose-500 bg-rose-100 text-rose-950 line-through';
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectGrand(q.id, opt)}
                          disabled={grandSubmitted}
                          className={`p-3 rounded-xl border-2 text-left text-xs transition ${optStyle}`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {grandSubmitted && (
                    <p className="mt-2.5 text-xs text-slate-600 font-medium">
                      💡 <strong>Giải thích:</strong> {q.exp}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: PARENT GUIDE */}
      {activeTab === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-sky-600 tracking-wider">
                Góc Dành Riêng Cho Phụ Huynh &amp; Giáo Viên
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-800">
                Cẩm Nang Ôn Tập Review 3 (Units 11 - 15 SGK Tiếng Anh 4)
              </h3>
            </div>
          </div>

          {/* 5 Units Grammar Mindmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏡</span>
                <h4 className="font-bold text-sm text-emerald-900">Unit 11: My home</h4>
              </div>
              <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                <li>Hỏi nơi ở: <em>Where do you live? - I live in / at...</em></li>
                <li>Hỏi đặc điểm: <em>What is the street like? - It’s busy.</em></li>
                <li>Phát âm: Âm <strong>/s/</strong> (city) và <strong>/v/</strong> (village).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👨‍💼</span>
                <h4 className="font-bold text-sm text-blue-900">Unit 12: Jobs</h4>
              </div>
              <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                <li>Hỏi nghề: <em>What does he/she do? - He’s a doctor.</em></li>
                <li>Hỏi nơi làm việc: <em>Where does he work? - At a hospital.</em></li>
                <li>Phát âm: Âm <strong>/tʃ/</strong> (teacher) và <strong>/dʒ/</strong> (job).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <h4 className="font-bold text-sm text-purple-900">Unit 13: Appearance</h4>
              </div>
              <ul className="text-xs text-purple-800 space-y-1 list-disc list-inside">
                <li>Dáng vóc: <em>He is tall / short / slim / big.</em></li>
                <li>Đặc điểm khuôn mặt: <em>She has a round face / long hair.</em></li>
                <li>Phát âm: Âm <strong>/l/</strong> (look) và <strong>/r/</strong> (round).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧹</span>
                <h4 className="font-bold text-sm text-amber-900">Unit 14: Daily activities</h4>
              </div>
              <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                <li>Thói quen: <em>What do you do in the morning / evening?</em></li>
                <li>Thời gian: <em>When do you watch TV? - In the afternoon.</em></li>
                <li>Phát âm: Âm <strong>/tʃ/</strong> (watch) và <strong>/ʃ/</strong> (wash).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎾</span>
                <h4 className="font-bold text-sm text-rose-900">Unit 15: My family’s weekends</h4>
              </div>
              <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                <li>Nơi chốn: <em>Where does he go on Saturdays? - To the cinema.</em></li>
                <li>Hoạt động: <em>What does she do on Sundays? - She swims.</em></li>
                <li>Phát âm: Ngữ điệu câu hỏi có từ để hỏi (Falling intonation).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <h4 className="font-bold text-sm text-sky-900">Bí Quyết Kèm Con Hiệu Quả</h4>
              </div>
              <p className="text-xs text-sky-800 leading-relaxed">
                Khuyến khích con nghe lại nhiều lần bằng nút tốc độ chậm (0.7x). Sử dụng bàn cờ trò chơi để vừa học vừa chơi thư giãn, không gây áp lực điểm số.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
