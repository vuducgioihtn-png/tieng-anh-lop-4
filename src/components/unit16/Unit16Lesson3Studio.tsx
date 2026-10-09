import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Music,
  PenTool,
  Copy,
  BarChart3,
  Calendar,
  CloudRain,
  Sun,
  Wind,
  Cloud,
  FileText
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit16Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit16Lesson3Studio: React.FC<Unit16Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 59) - WORD STRESS
  // =========================================================================
  const phonicsItems = [
    {
      word: 'sunny',
      stressedSyllable: 'SUN',
      unstressedSyllable: 'ny',
      stressMark: "'sunny",
      ipa: "/ˈsʌn.i/",
      reading: "SĂN-ni",
      sentenceEn: "It’s 'sunny today.",
      sentenceVi: "Hôm nay trời nắng đẹp.",
      icon: "☀️",
      note: "Trọng âm rơi vào âm tiết thứ nhất (nhấn giọng vào 'SUN')."
    },
    {
      word: 'rainy',
      stressedSyllable: 'RAIN',
      unstressedSyllable: 'y',
      stressMark: "'rainy",
      ipa: "/ˈreɪn.i/",
      reading: "RÂY-ni",
      sentenceEn: "I don’t like 'rainy weather.",
      sentenceVi: "Tớ không thích thời tiết mưa gió.",
      icon: "🌧️",
      note: "Trọng âm rơi vào âm tiết thứ nhất (nhấn giọng vào 'RAIN')."
    },
    {
      word: 'windy',
      stressedSyllable: 'WIND',
      unstressedSyllable: 'y',
      stressMark: "'windy",
      ipa: "/ˈwɪnd.i/",
      reading: "UYN-đi",
      sentenceEn: "It was 'windy yesterday.",
      sentenceVi: "Hôm qua trời nhiều gió.",
      icon: "🍃",
      note: "Tính từ 2 âm tiết có đuôi -y thường nhấn trọng âm âm tiết 1."
    },
    {
      word: 'cloudy',
      stressedSyllable: 'CLOUD',
      unstressedSyllable: 'y',
      stressMark: "'cloudy",
      ipa: "/ˈklaʊd.i/",
      reading: "CLAO-đi",
      sentenceEn: "It is 'cloudy this morning.",
      sentenceVi: "Sáng nay trời nhiều mây râm mát.",
      icon: "☁️",
      note: "Nhấn giọng cao hơn và ngân dài hơn ở âm 'CLOUD'."
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 60)
  // =========================================================================
  interface CircleQuestion {
    id: number;
    sentenceStart: string;
    sentenceEnd: string;
    options: { key: 'a' | 'b' | 'c'; text: string; icon: string }[];
    correctKey: 'a' | 'b' | 'c';
    audioScript: string;
  }

  const circleQuestions: CircleQuestion[] = [
    {
      id: 1,
      sentenceStart: '1. It’s',
      sentenceEnd: 'in Ho Chi Minh City.',
      options: [
        { key: 'a', text: 'windy', icon: '🍃' },
        { key: 'b', text: 'sunny', icon: '☀️' },
        { key: 'c', text: 'rainy', icon: '🌧️' }
      ],
      correctKey: 'b',
      audioScript: 'What is the weather like in Ho Chi Minh City? - It is sunny in Ho Chi Minh City.'
    },
    {
      id: 2,
      sentenceStart: '2. I like',
      sentenceEnd: 'weather.',
      options: [
        { key: 'a', text: 'sunny', icon: '☀️' },
        { key: 'b', text: 'cloudy', icon: '☁️' },
        { key: 'c', text: 'windy', icon: '🍃' }
      ],
      correctKey: 'c',
      audioScript: 'What weather do you like? - I like windy weather.'
    }
  ];

  const [userCircles, setUserCircles] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null
  });
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleSelectCircle = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setUserCircles(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct2 = () => {
    const isCompleted = Object.values(userCircles).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct2Submitted(true);
    let correct = 0;
    circleQuestions.forEach(q => {
      if (userCircles[q.id] === q.correctKey) {
        correct++;
      }
    });

    if (correct === 2) {
      sound.playComplete();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct * 2);
    }
  };

  const handleResetAct2 = () => {
    sound.playClick();
    setUserCircles({ 1: null, 2: null });
    setAct2Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 61)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1 · Ngày Nắng (Sunny) ☀️',
      lines: [
        'Sunny, sunny, sunny.',
        'I like sunny days.',
        'Cloudy, cloudy, cloudy.',
        'I don’t like cloudy days.'
      ],
      meaningVi: 'Nắng, nắng, ngày nắng. Tớ thích những ngày nắng. Mây, mây, ngày nhiều mây. Tớ không thích ngày nhiều mây.'
    },
    {
      title: 'Khổ 2 · Ngày Gió (Windy) 🍃',
      lines: [
        'Windy, windy, windy.',
        'I like windy days.',
        'Rainy, rainy, rainy.',
        'I don’t like rainy days.'
      ],
      meaningVi: 'Gió, gió, ngày lộng gió. Tớ thích những ngày nhiều gió. Mưa, mưa, ngày mưa rơi. Tớ không thích những ngày mưa ẩm ướt.'
    }
  ];

  // =========================================================================
  // ACTIVITY 4: READ AND CIRCLE
  // =========================================================================
  const readingPassage =
    'It was rainy yesterday. We were at home. It is sunny today. We are at the shopping centre. Kate is at the bookshop. She wants some books. Jim is at the food stall. He wants some chicken. I am at the bakery. I want some bread. We have a happy shopping day.';

  interface ReadQuiz {
    id: number;
    q: string;
    options: { key: 'a' | 'b' | 'c'; text: string }[];
    correctKey: 'a' | 'b' | 'c';
    exp: string;
  }

  const readQuizList: ReadQuiz[] = [
    {
      id: 1,
      q: '1. It was ______ yesterday.',
      options: [
        { key: 'a', text: 'cloudy' },
        { key: 'b', text: 'sunny' },
        { key: 'c', text: 'rainy' }
      ],
      correctKey: 'c',
      exp: 'Câu đầu đoạn văn: "It was rainy yesterday."'
    },
    {
      id: 2,
      q: '2. It is ______ today.',
      options: [
        { key: 'a', text: 'windy' },
        { key: 'b', text: 'rainy' },
        { key: 'c', text: 'sunny' }
      ],
      correctKey: 'c',
      exp: 'Câu thứ 3: "It is sunny today."'
    },
    {
      id: 3,
      q: '3. Kate is at the ______.',
      options: [
        { key: 'a', text: 'bookshop' },
        { key: 'b', text: 'bakery' },
        { key: 'c', text: 'food stall' }
      ],
      correctKey: 'a',
      exp: 'Câu thứ 5: "Kate is at the bookshop. She wants some books."'
    },
    {
      id: 4,
      q: '4. Jim is at the ______.',
      options: [
        { key: 'a', text: 'food stall' },
        { key: 'b', text: 'bookshop' },
        { key: 'c', text: 'bakery' }
      ],
      correctKey: 'a',
      exp: 'Câu thứ 7: "Jim is at the food stall. He wants some chicken."'
    }
  ];

  const [userReadingAnswers, setUserReadingAnswers] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [act4Submitted, setAct4Submitted] = useState<boolean>(false);

  const handleSelectReading = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setUserReadingAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct4 = () => {
    const isCompleted = Object.values(userReadingAnswers).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct4Submitted(true);
    let correct = 0;
    readQuizList.forEach(q => {
      if (userReadingAnswers[q.id] === q.correctKey) {
        correct++;
      }
    });

    if (correct === 4) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserReadingAnswers({ 1: null, 2: null, 3: null, 4: null });
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE
  // =========================================================================
  const sampleWriting =
    'The weather is lovely today. My family want to go to the supermarket. My parents want to buy some fruit and vegetables. I want to buy a new notebook and some chocolate. My brother wants to buy some ice cream. We have a wonderful weekend shopping together!';

  const [writingContent, setWritingContent] = useState<string>('');
  const [writingCopied, setWritingCopied] = useState<boolean>(false);

  const handleAutoFillWriting = () => {
    sound.playClick();
    setWritingContent(sampleWriting);
  };

  const handleCopyWriting = () => {
    if (!writingContent) return;
    sound.playSuccess();
    navigator.clipboard.writeText(writingContent);
    setWritingCopied(true);
    setTimeout(() => setWritingCopied(false), 2000);
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT - "MY WEATHER CHART"
  // =========================================================================
  interface CityWeather {
    city: string;
    lastWeekend: 'sunny' | 'rainy' | 'windy' | 'cloudy';
    today: 'sunny' | 'rainy' | 'windy' | 'cloudy';
  }

  const [chartData, setChartData] = useState<CityWeather[]>([
    { city: 'Ha Noi', lastWeekend: 'sunny', today: 'rainy' },
    { city: 'Da Nang', lastWeekend: 'sunny', today: 'cloudy' },
    { city: 'Can Tho', lastWeekend: 'cloudy', today: 'rainy' }
  ]);

  const weatherIcons: Record<string, string> = {
    sunny: '☀️',
    rainy: '🌧️',
    windy: '🍃',
    cloudy: '☁️'
  };

  const handleCycleWeather = (cityIdx: number, field: 'lastWeekend' | 'today') => {
    sound.playClick();
    const cycle: ('sunny' | 'rainy' | 'windy' | 'cloudy')[] = ['sunny', 'rainy', 'windy', 'cloudy'];
    setChartData(prev =>
      prev.map((c, i) => {
        if (i !== cityIdx) return c;
        const currentIdx = cycle.indexOf(c[field]);
        const nextVal = cycle[(currentIdx + 1) % cycle.length];
        return { ...c, [field]: nextVal };
      })
    );
  };

  const handleReportWeather = (c: CityWeather) => {
    const reportText = `It was ${c.lastWeekend} in ${c.city} last weekend. It is ${c.today} in ${c.city} today.`;
    speakWord(reportText, speechRate);
  };

  return (
    <div className="space-y-8">
      {/* Navigation Sub-bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          {[1, 2, 3, 4, 5, 6].map(sec => (
            <button
              key={sec}
              onClick={() => {
                sound.playClick();
                setActiveSection(sec);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                activeSection === sec
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>HĐ {sec}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onSwitchToLesson1 && (
            <button
              onClick={onSwitchToLesson1}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs transition flex items-center gap-1 border border-amber-200"
            >
              <span>⬅️ Tiết 1</span>
            </button>
          )}
          {onSwitchToLesson2 && (
            <button
              onClick={onSwitchToLesson2}
              className="px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition flex items-center gap-1 border border-orange-200"
            >
              <span>⬅️ Tiết 2</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 1: LISTEN AND REPEAT - WORD STRESS */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
              Trang 44 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 1 · Track 59 · Ngữ Âm</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-purple-600" />
            1. Listen and repeat (Quy tắc trọng âm từ 2 âm tiết &apos;sunny, &apos;rainy)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Các tính từ chỉ thời tiết 2 âm tiết có đuôi <strong>-y</strong> có trọng âm rơi vào <strong>âm tiết thứ nhất</strong>.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phonicsItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border-2 border-purple-100 bg-gradient-to-b from-purple-50/40 to-slate-50 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <button
                    onClick={() => speakWord(`${item.word}. ${item.sentenceEn}`, speechRate)}
                    className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 transition"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-purple-700">{item.stressedSyllable}</span>
                    <span className="text-xl font-bold text-slate-500">{item.unstressedSyllable}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 block">{item.ipa}</span>
                  <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md inline-block mt-1">
                    🗣️ Đọc bồi: {item.reading}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-100 space-y-1">
                <p className="font-bold text-xs text-slate-800">{item.sentenceEn}</p>
                <p className="text-[11px] text-slate-500 italic">{item.sentenceVi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 2: LISTEN AND CIRCLE (TRACK 60) */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                Trang 44 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 2 · Track 60</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              2. Listen and circle (Nghe và khoanh tròn đáp án đúng)
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Lắng nghe và chọn đáp án chính xác nhất để hoàn thành câu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct2}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct2}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra (+4 ⭐)
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {circleQuestions.map(q => {
            const userChoice = userCircles[q.id];
            const isCorrect = userChoice === q.correctKey;

            return (
              <div
                key={q.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm md:text-base text-slate-800">
                    {q.sentenceStart} _______ {q.sentenceEnd}
                  </h4>
                  <button
                    onClick={() => speakWord(q.audioScript, speechRate)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu {q.id} 🔊</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  {q.options.map(opt => {
                    const isSelected = userChoice === opt.key;
                    let optStyle = 'border-slate-200 bg-white hover:border-blue-400';

                    if (act2Submitted) {
                      if (opt.key === q.correctKey) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-400';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectCircle(q.id, opt.key)}
                        disabled={act2Submitted}
                        className={`p-3 rounded-2xl border-2 text-center transition flex items-center justify-center gap-2 font-bold text-xs md:text-sm ${optStyle}`}
                      >
                        <span className="uppercase text-slate-400 font-mono">{opt.key}.</span>
                        <span>{opt.icon}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {act2Submitted && (
                  <p className="text-xs font-bold pt-1">
                    {isCorrect ? (
                      <span className="text-emerald-700">✓ Hoan hô! Bé chọn rất chính xác!</span>
                    ) : (
                      <span className="text-rose-600">✕ Đáp án đúng là: {q.correctKey}.</span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 3: LET'S CHANT (TRACK 61) */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-6 md:p-8 text-white shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-white/20 border-b">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              Bài Vè Vần Điệu · Track 61
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-1 flex items-center gap-2">
              <Music className="w-7 h-7" />
              Let’s chant! 👏
            </h3>
            <p className="text-xs md:text-sm text-white/90 mt-0.5">
              Vỗ tay theo nhịp điệu rộn ràng và học thuộc 4 kiểu thời tiết: Sunny, Cloudy, Windy, Rainy!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playFanfare();
              speakWord(
                'Sunny, sunny, sunny. I like sunny days. Cloudy, cloudy, cloudy. I don’t like cloudy days. Windy, windy, windy. I like windy days. Rainy, rainy, rainy. I don’t like rainy days.',
                speechRate
              );
            }}
            className="px-6 py-3 rounded-2xl bg-white text-purple-700 font-black text-sm hover:bg-purple-50 shadow-md transition active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Nghe Toàn Bài Chant 🎤</span>
          </button>
        </div>

        {/* 2 Stanzas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chantStanzas.map((st, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3"
            >
              <h4 className="font-black text-base">{st.title}</h4>
              <div className="space-y-1.5 text-base font-bold">
                {st.lines.map((line, lIdx) => (
                  <p key={lIdx} className="leading-snug">{line}</p>
                ))}
              </div>
              <p className="text-xs text-purple-200 italic pt-2 border-t border-white/20">
                💡 Dịch nghĩa: {st.meaningVi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: READ AND CIRCLE */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 45 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Đọc Hiểu</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              4. Read and circle (Đọc đoạn văn và chọn đáp án đúng)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct4}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Nộp bài (+5 ⭐)
            </button>
          </div>
        </div>

        {/* Passage Box */}
        <div className="p-5 md:p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">
              Đoạn văn đọc hiểu (Reading Passage):
            </span>
            <button
              onClick={() => speakWord(readingPassage, speechRate)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe bài đọc 🔊</span>
            </button>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-slate-800 font-medium italic">
            &ldquo;{readingPassage}&rdquo;
          </p>
        </div>

        {/* 4 Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readQuizList.map(q => {
            const userChoice = userReadingAnswers[q.id];
            const isCorrect = userChoice === q.correctKey;

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl border-2 border-slate-200 bg-white space-y-2.5"
              >
                <h5 className="font-extrabold text-sm text-slate-800">{q.q}</h5>
                <div className="grid grid-cols-3 gap-2">
                  {q.options.map(opt => {
                    const isSelected = userChoice === opt.key;
                    let btnStyle = 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300';

                    if (act4Submitted) {
                      if (opt.key === q.correctKey) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-400 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectReading(q.id, opt.key)}
                        disabled={act4Submitted}
                        className={`py-2 px-3 rounded-xl border text-xs transition text-center ${btnStyle}`}
                      >
                        <span className="uppercase text-slate-400 font-mono mr-1">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {act4Submitted && (
                  <p className="text-xs text-slate-500 pt-1">
                    💡 <strong>Giải thích:</strong> {q.exp}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 5: LET'S WRITE */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                Trang 45 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Luyện Viết</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <PenTool className="w-6 h-6 text-rose-600" />
              5. Let’s write: My family go shopping
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Viết đoạn văn ngắn về chuyến đi mua sắm cùng gia đình trong một ngày thời tiết đẹp trời!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoFillWriting}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" /> Xem bài mẫu 10/10
            </button>
            <button
              onClick={handleCopyWriting}
              disabled={!writingContent}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Copy className="w-4 h-4" /> {writingCopied ? 'Đã sao chép!' : 'Sao chép bài'}
            </button>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>1. What is the weather like today? (Thời tiết hôm nay thế nào?)</div>
          <div>2. Where do your family go? (Cả nhà đi đâu?)</div>
          <div>3. What do your parents want to buy? (Bố mẹ muốn mua gì?)</div>
          <div>4. What do you want to buy? (Em muốn mua gì?)</div>
          <div>5. What does your brother/sister want to buy? (Anh/chị/em muốn mua gì?)</div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <textarea
            value={writingContent}
            onChange={e => setWritingContent(e.target.value)}
            rows={5}
            placeholder="The weather is lovely today. My family want to go to the supermarket. My parents want to buy... I want to buy... My brother wants to buy..."
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-slate-800 text-sm leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => speakWord(writingContent, speechRate)}
              disabled={!writingContent}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40"
            >
              <Volume2 className="w-4 h-4" />
              <span>Đọc bài của em 🔊</span>
            </button>
            <button
              onClick={() => {
                sound.playComplete();
                onAddStar(5);
                confetti({ particleCount: 70, spread: 60 });
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition active:scale-95 shadow-sm"
            >
              Nộp bài (+5 ⭐)
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 6: PROJECT - "MY WEATHER CHART" */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-600 text-white">
              Trang 45 SGK
            </span>
            <span className="text-xs font-semibold text-slate-500">Hoạt động 6 · Dự Án Thực Hành</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-600" />
            6. Project: My weather chart (Bảng theo dõi thời tiết các thành phố)
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Bấm vào biểu tượng thời tiết để thay đổi, sau đó bấm &quot;Báo Cáo Thời Tiết 🎤&quot; để phát âm câu thuyết trình!
          </p>
        </div>

        {/* Interactive Weather Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-teal-50 border-b-2 border-teal-200 text-teal-900 font-extrabold">
                <th className="p-4 rounded-tl-2xl">Thành phố (Places)</th>
                <th className="p-4">Cuối tuần trước (Last weekend)</th>
                <th className="p-4">Hôm nay (Today)</th>
                <th className="p-4 rounded-tr-2xl text-center">Thuyết trình</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chartData.map((row, idx) => (
                <tr key={row.city} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-black text-slate-800 text-base">{row.city}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleCycleWeather(idx, 'lastWeekend')}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center gap-2 transition"
                      title="Bấm để đổi thời tiết"
                    >
                      <span className="text-2xl">{weatherIcons[row.lastWeekend]}</span>
                      <span className="capitalize">{row.lastWeekend}</span>
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleCycleWeather(idx, 'today')}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-xs flex items-center gap-2 transition"
                      title="Bấm để đổi thời tiết"
                    >
                      <span className="text-2xl">{weatherIcons[row.today]}</span>
                      <span className="capitalize">{row.today}</span>
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleReportWeather(row)}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition active:scale-95 shadow-2xs"
                    >
                      Báo cáo 🔊
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
