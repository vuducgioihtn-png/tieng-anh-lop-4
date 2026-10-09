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
  Star
} from 'lucide-react';
import { sound, speakWord } from '../utils/audio';
import { Review2ListenSpeak } from './review2/Review2ListenSpeak';
import { Review2ReadWrite } from './review2/Review2ReadWrite';
import { Review2Extension } from './review2/Review2Extension';
import { Review2BoardGame } from './review2/Review2BoardGame';

interface Review2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToUnit10?: () => void;
  onSwitchToWordlist?: () => void;
  onSwitchToUnit9?: () => void;
  onSwitchToReview1?: () => void;
  onSwitchToUnit1?: () => void;
  initialTab?: number;
}

export const Review2Studio: React.FC<Review2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToUnit10,
  onSwitchToWordlist,
  onSwitchToUnit9,
  onSwitchToReview1,
  onSwitchToUnit1,
  initialTab = 1
}) => {
  // Tabs:
  // 1: Page 74 (Listen & Tick Track 107 + Ask & Answer)
  // 2: Page 75 (Read & Match + Read & Complete Letter + Let's Write)
  // 3: Page 76 (Extension: Read & Match City/Countryside + Classification Quiz)
  // 4: Page 77 (Board Game: 12-tile interactive game with 3D dice)
  // 5: Grand Challenge (Units 6 - 10 Capstone Review)
  // 6: Parent Guide (Cẩm nang phụ huynh & giáo viên)
  const [activeTab, setActiveTab] = useState<number>(initialTab);

  const tabs = [
    {
      id: 1,
      title: 'Trang 74: Nghe & Nói',
      subtitle: 'Listen & Tick (Track 107) + Speaking',
      icon: '🎧',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Trang 75: Đọc & Viết',
      subtitle: 'Read & Match + Joe’s Letter + Let’s Write',
      icon: '✍️',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Trang 76: Mở Rộng',
      subtitle: 'City vs Countryside (Đọc hiểu & Phân loại)',
      icon: '🏞️',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'Trang 77: Cờ Tỷ Phú',
      subtitle: 'Board Game 12 Ô Lắc Xúc Xắc 3D',
      icon: '🎲',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 5,
      title: 'Đại Thử Thách Ôn Tập',
      subtitle: 'Tổng hợp Units 6, 7, 8, 9, 10',
      icon: '🏆',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 6,
      title: 'Góc Phụ Huynh',
      subtitle: 'Mục tiêu & Hướng dẫn kèm con học',
      icon: '❤️',
      color: 'from-sky-500 to-blue-600'
    }
  ];

  // Grand Challenge state
  const grandQuestions = [
    {
      id: 1,
      unit: 'Unit 6: Our school',
      q: 'Where’s your school?',
      options: ['It’s in the mountains.', 'It’s on Monday.', 'It’s yellow.'],
      answer: 'It’s in the mountains.',
      exp: 'Cấu trúc hỏi vị trí trường học: "Where’s your school? - It’s in the..."'
    },
    {
      id: 2,
      unit: 'Unit 6: Our school',
      q: 'How many classrooms are there in your school?',
      options: ['There are twenty.', 'I have twenty.', 'It’s twenty.'],
      answer: 'There are twenty.',
      exp: 'Hỏi số lượng có "There are [số lượng]"'
    },
    {
      id: 3,
      unit: 'Unit 7: Our timetables',
      q: 'What subjects do you have today?',
      options: [
        'I have maths, English and music.',
        'I have it on Tuesdays.',
        'My favourite subject is art.'
      ],
      answer: 'I have maths, English and music.',
      exp: 'Hỏi hôm nay học môn gì: "I have [danh sách các môn]."'
    },
    {
      id: 4,
      unit: 'Unit 7: Our timetables',
      q: 'When do you have art?',
      options: ['I have it on Wednesdays.', 'I like art.', 'Yes, I do.'],
      answer: 'I have it on Wednesdays.',
      exp: 'Hỏi thời gian có môn học: "I have it on [các thứ trong tuần thêm s]."'
    },
    {
      id: 5,
      unit: 'Unit 8: My favourite subjects',
      q: 'What’s your favourite subject?',
      options: ['It’s English.', 'I was at school.', 'On Mondays.'],
      answer: 'It’s English.',
      exp: 'Hỏi môn học yêu thích: "What’s your favourite subject? - It’s [môn học]."'
    },
    {
      id: 6,
      unit: 'Unit 8: My favourite subjects',
      q: 'Why do you like science?',
      options: [
        'Because I want to be a scientist.',
        'Because it’s on Thursday.',
        'Yes, I like it.'
      ],
      answer: 'Because I want to be a scientist.',
      exp: 'Hỏi lý do thích "Why do you like...?" trả lời bắt đầu bằng "Because..."'
    },
    {
      id: 7,
      unit: 'Unit 9: Our sports day',
      q: 'When is your sports day?',
      options: ['It’s in November.', 'It’s in the classroom.', 'I was in London.'],
      answer: 'It’s in November.',
      exp: 'Hỏi ngày hội thể thao vào tháng nào: "It’s in [tháng]."'
    },
    {
      id: 8,
      unit: 'Unit 9: Our sports day',
      q: 'Is your sports day in May?',
      options: ['Yes, it is.', 'Yes, I am.', 'No, they aren’t.'],
      answer: 'Yes, it is.',
      exp: 'Câu hỏi Yes/No với Is: "Yes, it is. / No, it isn’t."'
    },
    {
      id: 9,
      unit: 'Unit 10: Our summer holidays',
      q: 'Where were you last summer?',
      options: ['I was in Sydney.', 'I was at home tomorrow.', 'I am in London.'],
      answer: 'I was in Sydney.',
      exp: 'Quá khứ hỏi mùa hè năm ngoái ở đâu: "I was in [địa điểm]."'
    },
    {
      id: 10,
      unit: 'Unit 10: Our summer holidays',
      q: 'Were you on the beach last weekend?',
      options: ['Yes, I was.', 'Yes, I were.', 'Yes, I do.'],
      answer: 'Yes, I was.',
      exp: 'Chủ ngữ "I" trong câu trả lời quá khứ đi với "was": "Yes, I was."'
    }
  ];

  const [grandAnswers, setGrandAnswers] = useState<{ [qId: number]: string }>({});
  const [grandSubmitted, setGrandSubmitted] = useState<boolean>(false);

  const handleSelectGrand = (qId: number, opt: string) => {
    sound.playClick();
    setGrandAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const handleCheckGrand = () => {
    const answeredCount = Object.keys(grandAnswers).length;
    if (answeredCount < 10) {
      alert('Em hãy hoàn thành tất cả 10 câu trắc nghiệm của Đại thử thách nhé!');
      return;
    }
    const correctCount = grandQuestions.filter(q => grandAnswers[q.id] === q.answer).length;
    setGrandSubmitted(true);
    if (correctCount === 10) {
      sound.playFanfare();
      onAddStar(15);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    } else if (correctCount >= 7) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Master Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase border border-white/30 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                Ôn Tập Học Kỳ 1 · Trang 74 - 77 SGK
              </span>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
                Units 6 ➔ 10
              </span>
            </div>

            {/* Quick Unit Switcher Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {onSwitchToUnit10 && (
                <button
                  onClick={onSwitchToUnit10}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏖️ ⬅️ Unit 10</span>
                </button>
              )}
              {onSwitchToWordlist && (
                <button
                  onClick={onSwitchToWordlist}
                  className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 hover:bg-white/90 font-black text-xs transition flex items-center gap-1 shadow-sm"
                >
                  <span>📑 Wordlist SGK ➡️</span>
                </button>
              )}
              {onSwitchToUnit9 && (
                <button
                  onClick={onSwitchToUnit9}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🏆 Unit 9</span>
                </button>
              )}
              {onSwitchToReview1 && (
                <button
                  onClick={onSwitchToReview1}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1"
                >
                  <span>🥇 Review 1</span>
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
              REVIEW 2 &amp; EXTENSION ACTIVITIES 🏆
            </h1>
            <p className="text-amber-100 text-sm md:text-base max-w-3xl mt-1">
              Ôn tập toàn diện Học kỳ 1 qua 4 trang sách sinh động: Luyện nghe Track 107, Nói theo tranh, Đọc &amp; Viết thư hồi đáp cho Joe, Khám phá Thành thị &amp; Nông thôn, và Đấu trường Cờ Tỷ Phú 12 ô xúc xắc 3D!
            </p>
          </div>

          {/* Key Structures Quick Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-white/90">
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏫 Where’s your school?</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🗓️ When do you have...?</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🎨 What’s your favourite subject?</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏆 When’s your sports day?</span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">🏖️ Where were you last summer?</span>
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
                  ? 'border-amber-500 bg-white shadow-lg ring-2 ring-amber-400 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
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
        <Review2ListenSpeak speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 2 && (
        <Review2ReadWrite speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 3 && (
        <Review2Extension speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {activeTab === 4 && (
        <Review2BoardGame speechRate={speechRate} onAddStar={onAddStar} />
      )}

      {/* TAB 5: GRAND CHALLENGE */}
      {activeTab === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-yellow-500 text-white">
                  Đại Thử Thách
                </span>
                <span className="text-xs font-semibold text-slate-500">10 Câu Trắc Nghiệm Học Kỳ 1</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Grand Semester 1 Review Quiz (Units 6 - 10) 🥇
              </h3>
            </div>
            <button
              onClick={handleCheckGrand}
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Nộp bài &amp; Nhận cúp vàng
            </button>
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
                      : 'border-slate-200 bg-slate-50/50 hover:border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {q.unit}
                    </span>
                    <button
                      onClick={() => speakWord(q.q, speechRate)}
                      className="p-1 text-slate-500 hover:text-slate-800 transition"
                    >
                      <Headphones className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base mb-3">
                    Câu {idx + 1}: {q.q}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, i) => {
                      const isSelected = currentAnswer === opt;
                      let optStyle = 'border-slate-200 bg-white text-slate-700 hover:border-amber-300';
                      if (isSelected && !grandSubmitted) {
                        optStyle = 'border-amber-500 bg-amber-100 text-amber-950 font-bold';
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
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                  Dành Cho Phụ Huynh &amp; Thầy Cô
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Cẩm Nang Học Kỳ 1 (SGK Kết Nối Tri Thức)
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Hướng Dẫn Ôn Tập &amp; Trò Chơi Tương Tác Cùng Con Tại Nhà ❤️
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <h4 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
                <span>🎯</span> Mục tiêu trọng tâm của Review 2
              </h4>
              <ul className="text-xs md:text-sm text-amber-900 space-y-2 leading-relaxed">
                <li>
                  • <strong>Hỏi vị trí trường &amp; số lượng:</strong> Where’s your school? - It’s in the city / village. How many buildings are there? - There are three.
                </li>
                <li>
                  • <strong>Thời khóa biểu:</strong> What subjects do you have today? - I have maths, English... When do you have art? - I have it on Wednesdays.
                </li>
                <li>
                  • <strong>Môn học yêu thích &amp; lý do:</strong> What’s your favourite subject? - It’s music. Why do you like it? - Because I want to be a singer.
                </li>
                <li>
                  • <strong>Ngày hội thể thao:</strong> When’s your sports day? - It’s in November. Is it in May? - Yes, it is. / No, it isn’t.
                </li>
                <li>
                  • <strong>Kỳ nghỉ hè đã qua:</strong> Where were you last summer? - I was in Sydney / at the beach / at the zoo.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
              <h4 className="font-extrabold text-sky-950 text-base flex items-center gap-2">
                <span>🎲</span> Gợi ý hoạt động gia đình 10 phút
              </h4>
              <ul className="text-xs md:text-sm text-sky-900 space-y-2 leading-relaxed">
                <li>
                  • <strong>Chơi cờ tỷ phú xúc xắc 3D cùng con:</strong> Bật Tab &quot;Trang 77: Cờ Tỷ Phú&quot; và cùng con lắc xúc xắc, thay phiên nhau hỏi - đáp tiếng Anh khi đặt chân vào mỗi ô.
                </li>
                <li>
                  • <strong>Đố vui từ vựng nhanh:</strong> Bố/mẹ nói một đặc điểm (ví dụ: &quot;noisy&quot;, &quot;tall buildings&quot;), con nhanh trí trả lời &quot;city!&quot;; bố/mẹ nói &quot;quiet&quot;, &quot;many trees&quot;, con đáp &quot;countryside!&quot;.
                </li>
                <li>
                  • <strong>Luyện viết thư ngắn:</strong> Hướng dẫn con viết bức thư nhỏ gửi bạn Joe hoặc gửi cho người thân, kể về trường học và môn học con yêu thích nhất.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
