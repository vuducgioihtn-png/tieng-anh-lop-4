import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  TreePine,
  Building2,
  CheckCircle2,
  Compass,
  Lightbulb,
  Award
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review2ExtensionProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

export const Review2Extension: React.FC<Review2ExtensionProps> = ({
  speechRate,
  onAddStar
}) => {
  // Activity 1: Read and match (City vs Countryside)
  const [matchChoice1, setMatchChoice1] = useState<'a' | 'b' | null>(null);
  const [matchChoice2, setMatchChoice2] = useState<'a' | 'b' | null>(null);
  const [act1Submitted, setAct1Submitted] = useState<boolean>(false);

  // Activity 2: 8 items classify: 'a' for countryside or 'b' for city
  interface FeatureItem {
    id: number;
    text: string;
    textVi: string;
    icon: string;
    correct: 'a' | 'b';
    userChoice: 'a' | 'b' | null;
    explanation: string;
  }

  const [features, setFeatures] = useState<FeatureItem[]>([
    {
      id: 1,
      text: 'tall buildings',
      textVi: 'các tòa nhà cao tầng chọc trời',
      icon: '🏢',
      correct: 'b',
      userChoice: null,
      explanation: 'Thành phố lớn (city) có nhiều toà nhà cao ốc hiện đại.'
    },
    {
      id: 2,
      text: 'many people',
      textVi: 'rất nhiều người đông đúc',
      icon: '👥',
      correct: 'b',
      userChoice: null,
      explanation: 'Thành phố đông dân cư, người đi lại tấp nập.'
    },
    {
      id: 3,
      text: 'a lot of trees',
      textVi: 'nhiều cây xanh bóng mát',
      icon: '🌳',
      correct: 'a',
      userChoice: null,
      explanation: 'Miền quê (countryside) có nhiều rặng cây xanh, rừng và vườn tược.'
    },
    {
      id: 4,
      text: 'many fields',
      textVi: 'nhiều cánh đồng bạt ngàn',
      icon: '🌾',
      correct: 'a',
      userChoice: null,
      explanation: 'Cánh đồng lúa, đồi chè, vườn rau đặc trưng của miền quê.'
    },
    {
      id: 5,
      text: 'a lot of traffic',
      textVi: 'rất nhiều xe cộ đi lại',
      icon: '🚗',
      correct: 'b',
      userChoice: null,
      explanation: 'Nhiều xe cộ, ô tô, xe máy lưu thông trên đường phố là đặc điểm thành thị.'
    },
    {
      id: 6,
      text: 'busy',
      textVi: 'bận rộn, hối hả',
      icon: '🏃‍♂️',
      correct: 'b',
      userChoice: null,
      explanation: 'Nhịp sống ở thành phố luôn bận rộn, hối hả và sôi động.'
    },
    {
      id: 7,
      text: 'noisy',
      textVi: 'ồn ào náo nhiệt',
      icon: '📢',
      correct: 'b',
      userChoice: null,
      explanation: 'Tiếng còi xe, âm thanh phố phường làm cho thành phố khá ồn ào.'
    },
    {
      id: 8,
      text: 'quiet',
      textVi: 'yên tĩnh, thanh bình',
      icon: '🕊️',
      correct: 'a',
      userChoice: null,
      explanation: 'Không gian miền quê trong lành, yên ả, chỉ có tiếng chim hót.'
    }
  ]);
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleCheckAct1 = () => {
    if (!matchChoice1 || !matchChoice2) {
      alert('Em hãy chọn hình ảnh tương ứng cho cả 2 đoạn văn trước nhé!');
      return;
    }
    const isCorrect1 = matchChoice1 === 'b';
    const isCorrect2 = matchChoice2 === 'a';
    setAct1Submitted(true);
    if (isCorrect1 && isCorrect2) {
      sound.playFanfare();
      onAddStar(3);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
    }
  };

  const handleSelectFeature = (id: number, choice: 'a' | 'b') => {
    sound.playClick();
    setFeatures(prev => prev.map(f => (f.id === id ? { ...f, userChoice: choice } : f)));
  };

  const handleCheckAct2 = () => {
    const allFilled = features.every(f => f.userChoice !== null);
    if (!allFilled) {
      alert('Em hãy phân loại cho tất cả 8 đặc điểm nhé!');
      return;
    }
    const correctCount = features.filter(f => f.userChoice === f.correct).length;
    setAct2Submitted(true);
    if (correctCount === 8) {
      sound.playFanfare();
      onAddStar(5);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } else if (correctCount >= 5) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8">
      {/* Activity 1 Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 shadow-inner">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                  Hoạt Động Mở Rộng 1 · Trang 76
                </span>
                <span className="text-xs font-semibold text-slate-500">Read and match</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and match 🏞️ (Đọc đoạn văn và nối với Nông thôn / Thành thị)
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAct1}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra nối
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMatchChoice1(null);
                setMatchChoice2(null);
                setAct1Submitted(false);
              }}
              className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
              title="Làm lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2 Passages with Photo Choice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Passage 1 */}
          <div
            className={`p-6 rounded-2xl border-2 transition-all ${
              act1Submitted
                ? matchChoice1 === 'b'
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-rose-300 bg-rose-50/40'
                : 'border-slate-200 bg-slate-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                1
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'There is a lot of traffic. There are many people. It’s busy and noisy. Look at the tall buildings!',
                    speechRate
                  )
                }
                className="px-2.5 py-1 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe đọc
              </button>
            </div>

            <p className="font-medium text-slate-800 text-sm md:text-base leading-relaxed mb-2">
              &quot;There is a lot of traffic. There are many people. It&apos;s busy and noisy. Look at the tall buildings!&quot;
            </p>
            <p className="text-xs text-slate-500 italic mb-4">
              (Có rất nhiều xe cộ. Có nhiều người. Thật bận rộn và ồn ào. Hãy nhìn những toà nhà cao tầng kìa!)
            </p>

            <div className="pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-600 block mb-2">Chọn đáp án:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setMatchChoice1('a');
                  }}
                  className={`p-3 rounded-xl border-2 flex items-center gap-2 text-xs font-bold transition ${
                    matchChoice1 === 'a'
                      ? 'border-teal-500 bg-teal-100 text-teal-950 font-black'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <TreePine className="w-4 h-4 text-emerald-600" />
                  <span>a. countryside</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setMatchChoice1('b');
                  }}
                  className={`p-3 rounded-xl border-2 flex items-center gap-2 text-xs font-bold transition ${
                    matchChoice1 === 'b'
                      ? 'border-teal-500 bg-teal-100 text-teal-950 font-black'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>b. city</span>
                </button>
              </div>

              {act1Submitted && (
                <p className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đáp án đúng: b. city (Thành phố)
                </p>
              )}
            </div>
          </div>

          {/* Passage 2 */}
          <div
            className={`p-6 rounded-2xl border-2 transition-all ${
              act1Submitted
                ? matchChoice2 === 'a'
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-rose-300 bg-rose-50/40'
                : 'border-slate-200 bg-slate-50/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                2
              </span>
              <button
                onClick={() =>
                  speakWord(
                    'There are many trees and fields. There aren’t many people. It’s quiet here. Listen! I can hear birds singing.',
                    speechRate
                  )
                }
                className="px-2.5 py-1 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe đọc
              </button>
            </div>

            <p className="font-medium text-slate-800 text-sm md:text-base leading-relaxed mb-2">
              &quot;There are many trees and fields. There aren&apos;t many people. It&apos;s quiet here. Listen! I can hear birds singing.&quot;
            </p>
            <p className="text-xs text-slate-500 italic mb-4">
              (Có rất nhiều cây xanh và cánh đồng. Không có nhiều người. Nơi đây thật yên tĩnh. Nghe kìa! Tớ có thể nghe tiếng chim hót.)
            </p>

            <div className="pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-600 block mb-2">Chọn đáp án:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setMatchChoice2('a');
                  }}
                  className={`p-3 rounded-xl border-2 flex items-center gap-2 text-xs font-bold transition ${
                    matchChoice2 === 'a'
                      ? 'border-teal-500 bg-teal-100 text-teal-950 font-black'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <TreePine className="w-4 h-4 text-emerald-600" />
                  <span>a. countryside</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setMatchChoice2('b');
                  }}
                  className={`p-3 rounded-xl border-2 flex items-center gap-2 text-xs font-bold transition ${
                    matchChoice2 === 'b'
                      ? 'border-teal-500 bg-teal-100 text-teal-950 font-black'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>b. city</span>
                </button>
              </div>

              {act1Submitted && (
                <p className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đáp án đúng: a. countryside (Miền quê)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activity 2: 8 Items Classification */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
                Hoạt Động Mở Rộng 2 · Trang 76
              </span>
              <span className="text-xs font-semibold text-slate-500">Classification Quiz</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Write &apos;a&apos; for countryside or &apos;b&apos; for city 🏙️🌾
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Phân loại 8 cụm từ: Chọn <strong>a (countryside)</strong> hoặc <strong>b (city)</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAct2}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra 8 câu
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFeatures(prev => prev.map(f => ({ ...f, userChoice: null })));
                setAct2Submitted(false);
              }}
              className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
              title="Làm lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 8 Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {features.map((f, idx) => {
            const isCorrect = f.userChoice === f.correct;
            return (
              <div
                key={f.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  act2Submitted
                    ? isCorrect
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-rose-400 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/50 hover:border-teal-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-teal-600 text-white text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <button
                      onClick={() => speakWord(f.text, speechRate)}
                      className="p-1 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-md transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xl">{f.icon}</span>
                    <span className="font-extrabold text-slate-800 text-sm capitalize">
                      {f.text}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{f.textVi}</p>
                </div>

                {/* a vs b buttons */}
                <div>
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => handleSelectFeature(f.id, 'a')}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition ${
                        f.userChoice === 'a'
                          ? 'border-emerald-500 bg-emerald-200 text-emerald-950 font-black'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>🌾 a</span>
                    </button>

                    <button
                      onClick={() => handleSelectFeature(f.id, 'b')}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition ${
                        f.userChoice === 'b'
                          ? 'border-sky-500 bg-sky-200 text-sky-950 font-black'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>🏢 b</span>
                    </button>
                  </div>

                  {act2Submitted && (
                    <div className="mt-2 text-xs font-bold text-slate-700 flex items-start gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{f.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
