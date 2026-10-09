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
  Smile,
  Music,
  Edit3,
  Users,
  BarChart3,
  Save,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit8Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit8Lesson3Studio: React.FC<Unit8Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: 'ke' in like (/k/) vs 'te' in write (/t/)
  const phonicsPairs = [
    {
      ending: 'ke',
      ipa: '/k/',
      name: 'Đuôi "ke" phát âm là /k/',
      desc: 'Bật hơi khẽ ở cuống họng, vô thanh (không rung dây thanh quản). Xuất hiện ở chữ like, make, take.',
      reading: 'K (bật nhẹ ở họng)',
      color: 'rose',
      examples: [
        {
          word: 'like',
          vi: 'thích / yêu thích',
          ipa: '/laɪk/',
          reading: 'LAI-k',
          sentence: 'I like English.',
          sentenceVi: 'Tớ thích môn Tiếng Anh.',
          icon: '❤️'
        },
        {
          word: 'make',
          vi: 'làm / tạo ra',
          ipa: '/meɪk/',
          reading: 'MÂY-k',
          sentence: 'I can make a kite.',
          sentenceVi: 'Tớ có thể làm một cánh diều.',
          icon: '🪁'
        }
      ]
    },
    {
      ending: 'te',
      ipa: '/t/',
      name: 'Đuôi "te" phát âm là /t/',
      desc: 'Đầu lưỡi chạm nướu răng trên rồi bật dứt khoát luồng gió /t/. Xuất hiện ở chữ write, kite, white.',
      reading: 'T (bật đầu lưỡi)',
      color: 'amber',
      examples: [
        {
          word: 'write',
          vi: 'viết bài / viết chữ',
          ipa: '/raɪt/',
          reading: 'RAI-t',
          sentence: 'Let’s write.',
          sentenceVi: 'Chúng mình cùng viết nào.',
          icon: '✍️'
        },
        {
          word: 'white',
          vi: 'màu trắng',
          ipa: '/waɪt/',
          reading: 'OAI-t',
          sentence: 'It is white.',
          sentenceVi: 'Nó có màu trắng.',
          icon: '⚪'
        }
      ]
    }
  ];

  // Activity 2: Listen and circle (Track 85)
  interface ListenCircleItem {
    id: number;
    prompt: string;
    audioText: string;
    speaker: string;
    options: Array<{ key: 'a' | 'b' | 'c'; text: string }>;
    correctOption: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [listenCircleQuiz, setListenCircleQuiz] = useState<ListenCircleItem[]>([
    {
      id: 1,
      prompt: '1. Chọn câu nghe được trong băng:',
      audioText: 'I like music.',
      speaker: '👦 Ben',
      options: [
        { key: 'a', text: 'a. I like music.' },
        { key: 'b', text: 'b. I write a story.' },
        { key: 'c', text: 'c. I write a letter.' }
      ],
      correctOption: 'a',
      userChoice: null,
      explanation: 'Băng ghi âm đọc rõ: "I like music" ➔ Chọn a.'
    },
    {
      id: 2,
      prompt: '2. Chọn câu nghe được trong băng:',
      audioText: 'I write in English.',
      speaker: '👧 Linh',
      options: [
        { key: 'a', text: 'a. I like Vietnamese.' },
        { key: 'b', text: 'b. I like English.' },
        { key: 'c', text: 'c. I write in English.' }
      ],
      correctOption: 'c',
      userChoice: null,
      explanation: 'Băng ghi âm đọc: "I write in English" ➔ Chọn c.'
    }
  ]);
  const [circleQuizChecked, setCircleQuizChecked] = useState<boolean>(false);

  // Activity 3: Let's chant (Track 86)
  const chantVerses = [
    {
      title: 'Khổ 1: Môn Mĩ thuật (Art & Painter)',
      lines: [
        { en: 'Art, art.', vi: 'Mĩ thuật, môn Mĩ thuật.' },
        { en: 'My favourite subject is art.', vi: 'Môn học yêu thích của tớ là Mĩ thuật.' },
        { en: 'Why do you like it?', vi: 'Tại sao bạn lại thích môn này?' },
        { en: 'Because I want to be a painter.', vi: 'Vì tớ muốn trở thành một họa sĩ.' }
      ]
    },
    {
      title: 'Khổ 2: Môn Tiếng Anh (English & Teacher)',
      lines: [
        { en: 'English, English.', vi: 'Tiếng Anh, môn Tiếng Anh.' },
        { en: 'My favourite subject is English.', vi: 'Môn học yêu thích của tớ là Tiếng Anh.' },
        { en: 'Why do you like it?', vi: 'Tại sao bạn lại thích môn này?' },
        { en: 'Because I want to be an English teacher.', vi: 'Vì tớ muốn trở thành một giáo viên dạy tiếng Anh.' }
      ]
    }
  ];
  const [activeChantLine, setActiveChantLine] = useState<string | null>(null);

  // Activity 4: Read and tick True or False (Peter's Story)
  const peterPassage = `My name is Peter. It is Thursday today. I have English, PE, music, art and maths at school. My favourite subject is English. I like it because I want to be an English teacher. I also like music because I want to be a singer too. I do not like maths because I am not good at it.`;

  const [activePeterClue, setActivePeterClue] = useState<number | null>(null);
  const [peterAnswers, setPeterAnswers] = useState<{ [key: number]: boolean | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [peterChecked, setPeterChecked] = useState<boolean>(false);

  const readingQuestions = [
    {
      id: 1,
      q: '1. His name is Peter.',
      correct: true,
      clueSentence: 'My name is Peter.',
      explanation: 'Câu đầu tiên trong bài: "My name is Peter" ➔ ĐÚNG (True).'
    },
    {
      id: 2,
      q: '2. He has four subjects at school today.',
      correct: false,
      clueSentence: 'I have English, PE, music, art and maths at school.',
      explanation: 'Peter liệt kê 5 môn học (English, PE, music, art, maths), không phải 4 môn ➔ SAI (False).'
    },
    {
      id: 3,
      q: '3. His favourite subject is English.',
      correct: true,
      clueSentence: 'My favourite subject is English.',
      explanation: 'Câu trong bài: "My favourite subject is English" ➔ ĐÚNG (True).'
    },
    {
      id: 4,
      q: '4. Music is not his favourite subject.',
      correct: false,
      clueSentence: 'I also like music because I want to be a singer too.',
      explanation: 'Peter nói rõ: "I also like music because I want to be a singer too" (Peter cũng rất thích âm nhạc) ➔ Câu nhận định là SAI (False).'
    }
  ];

  // Activity 5: Let's write (Writing Studio)
  const [writerName, setWriterName] = useState<string>('Nam');
  const [writerTodaySubject, setWriterTodaySubject] = useState<string>('English');
  const [writerFavSubject, setWriterFavSubject] = useState<string>('music');
  const [writerDreamJob, setWriterDreamJob] = useState<string>('a singer');
  const [isWritingSaved, setIsWritingSaved] = useState<boolean>(false);

  // Activity 6: Project: A survey of favourite subjects
  interface SurveyRow {
    id: number;
    name: string;
    favSubject: string;
    reason: string;
  }

  const [surveyRows, setSurveyRows] = useState<SurveyRow[]>([
    { id: 1, name: 'Bill', favSubject: 'maths', reason: 'a maths teacher' },
    { id: 2, name: 'Lucy', favSubject: 'music', reason: 'a singer' },
    { id: 3, name: 'Minh', favSubject: 'art', reason: 'a painter' },
    { id: 4, name: 'Linh', favSubject: 'English', reason: 'an English teacher' }
  ]);
  const [newName, setNewName] = useState<string>('');
  const [newSub, setNewSub] = useState<string>('IT');
  const [newReason, setNewReason] = useState<string>('an IT teacher');

  const handleAddSurveyRow = () => {
    if (!newName.trim()) return;
    setSurveyRows([
      ...surveyRows,
      { id: Date.now(), name: newName.trim(), favSubject: newSub, reason: newReason }
    ]);
    setNewName('');
    sound.playCorrect();
    onAddStar(1);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 8: My favourite subjects • Tiết 3 (Lesson 3)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-rose-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-rose-100 hover:text-white"
                >
                  ⬅️ Về Tiết 2
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Ngữ Âm Phonics & Khảo Sát Môn Học Yêu Thích</span>
              <span className="text-3xl">📊</span>
            </h1>
            <p className="text-rose-100 text-sm md:text-base font-medium mt-1">
              Luyện phát âm đuôi "ke" (/k/) và "te" (/t/), đọc hiểu câu chuyện của Peter và thực hiện Dự án Khảo sát sở thích lớp học!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 60 - 61</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Phonics</span>
              <span className="text-sm font-black text-amber-300">"ke" /k/ & "te" /t/</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Đọc Hiểu</span>
              <span className="text-sm font-black text-white">Peter's Thursday Story</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Dự Án Lớp</span>
              <span className="text-sm font-black text-yellow-300">Classroom Survey 📋</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 60 - 61) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Phonics Lab (Track 84)', icon: '🗣️', desc: 'Trang 60 - Ngữ âm' },
          { num: 2, label: '2. Listen & circle (Track 85)', icon: '✍️', desc: 'Trang 60 - Khoanh tròn' },
          { num: 3, label: '3. Let’s chant (Track 86)', icon: '🎵', desc: 'Trang 60 - Vỗ nhịp' },
          { num: 4, label: '4. Read & tick True/False', icon: '📖', desc: 'Trang 61 - Đọc hiểu' },
          { num: 5, label: '5. Let’s write', icon: '📝', desc: 'Trang 61 - Viết bài' },
          { num: 6, label: '6. Project: Class Survey', icon: '🏆', desc: 'Trang 61 - Dự án' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.num);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeSection === tab.num
                ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <div className="text-left">
              <div>{tab.label}</div>
              <div className={`text-[10px] ${activeSection === tab.num ? 'text-rose-200' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: PHONICS LAB (TRACK 84) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
              Hoạt động 1 • Trang 60 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen and repeat • Phòng Thí Nghiệm Ngữ Âm Phonics: "ke" (/k/) & "te" (/t/)
            </h3>
            <p className="text-xs text-slate-500">
              Luyện phát âm chuẩn xác hai phụ âm bật hơi cuối từ:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map(p => (
              <div
                key={p.ending}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4 hover:border-rose-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-amber-300 font-mono text-base font-black">
                      {p.ending} ➔ {p.ipa}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{p.reading}</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(p.examples[0].word, speechRate);
                    }}
                    className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200">
                  {p.desc}
                </div>

                <div className="space-y-3">
                  {p.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{ex.icon}</span>
                          <div>
                            <div className="font-black text-base text-slate-900">
                              {ex.word}{' '}
                              <span className="text-xs font-normal font-mono text-slate-400">
                                {ex.ipa}
                              </span>
                            </div>
                            <div className="text-xs text-rose-700 font-medium">{ex.vi}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            sound.playClick();
                            speakWord(ex.word, speechRate);
                          }}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg text-xs font-bold"
                        >
                          Nghe từ
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-800">{ex.sentence}</div>
                          <div className="text-[11px] text-slate-500">{ex.sentenceVi}</div>
                        </div>
                        <button
                          onClick={() => {
                            sound.playClick();
                            speakWord(ex.sentence, speechRate);
                            onAddStar(1);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0 ml-2"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN AND CIRCLE (TRACK 85) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 2 • Trang 60 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and circle • Nghe và khoanh tròn câu chính xác
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setListenCircleQuiz(prev => prev.map(q => ({ ...q, userChoice: null })));
                setCircleQuizChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>

          <div className="space-y-4">
            {listenCircleQuiz.map(quiz => {
              const isCorrect = quiz.userChoice === quiz.correctOption;
              return (
                <div
                  key={quiz.id}
                  className={`p-5 rounded-3xl border-2 transition-all space-y-3 ${
                    circleQuizChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-slate-900">{quiz.prompt}</div>
                      <div className="text-xs text-slate-500">{quiz.speaker}</div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(quiz.audioText, speechRate);
                      }}
                      className="px-3.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Câu {quiz.id}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {quiz.options.map(opt => {
                      const isSelected = quiz.userChoice === opt.key;
                      return (
                        <button
                          key={opt.key}
                          disabled={circleQuizChecked}
                          onClick={() => {
                            sound.playClick();
                            setListenCircleQuiz(prev =>
                              prev.map(q => (q.id === quiz.id ? { ...q, userChoice: opt.key } : q))
                            );
                          }}
                          className={`p-3 rounded-2xl text-left font-bold text-xs transition-all border ${
                            isSelected
                              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  {circleQuizChecked && (
                    <div className={`text-xs p-2.5 rounded-xl font-medium ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {quiz.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setCircleQuizChecked(true);
                const correctCount = listenCircleQuiz.filter(q => q.userChoice === q.correctOption).length;
                if (correctCount === 2) {
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(3);
                } else if (correctCount > 0) {
                  sound.playCorrect();
                  onAddStar(1);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra Kết Quả
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S CHANT (TRACK 86) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 3 • Trang 60 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 86 (Bài Chant chính thức)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Let’s chant • Vỗ tay theo nhịp điệu Art & English
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                let currentDelay = 0;
                chantVerses.forEach(verse => {
                  verse.lines.forEach(l => {
                    setTimeout(() => {
                      setActiveChantLine(l.en);
                      speakWord(l.en, speechRate);
                    }, currentDelay);
                    currentDelay += 2200;
                  });
                });
                setTimeout(() => {
                  setActiveChantLine(null);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 70 });
                  onAddStar(3);
                }, currentDelay + 400);
              }}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Music className="w-4 h-4" />
              <span>Chant Toàn Bộ Bài 👏</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chantVerses.map((verse, vIdx) => (
              <div key={vIdx} className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-inner">
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                  {verse.title}
                </span>

                <div className="space-y-2 pt-1">
                  {verse.lines.map((l, lIdx) => {
                    const isActive = activeChantLine === l.en;
                    return (
                      <div
                        key={lIdx}
                        onClick={() => {
                          sound.playClick();
                          setActiveChantLine(l.en);
                          speakWord(l.en, speechRate);
                          setTimeout(() => setActiveChantLine(null), 2000);
                        }}
                        className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 font-black scale-[1.02] shadow-md'
                            : 'bg-slate-800/80 hover:bg-slate-800 text-slate-100'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">{l.en}</div>
                          <div className={`text-[11px] ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                            {l.vi}
                          </div>
                        </div>
                        <Volume2 className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: READ AND TICK TRUE OR FALSE ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
              Hoạt động 4 • Trang 61 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Read and tick True or False • Đọc câu chuyện của Peter và đánh dấu Đúng/Sai
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Passage Display */}
            <div className="lg:col-span-6 p-5 rounded-3xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-black text-amber-900 uppercase">
                  📖 Đoạn Văn (Peter's Story)
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(peterPassage, speechRate * 0.9);
                  }}
                  className="px-3 py-1 bg-white border border-amber-300 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Cả Bài</span>
                </button>
              </div>

              <div className="space-y-2 text-sm leading-relaxed text-slate-800">
                <p className={`p-1 rounded transition-colors ${activePeterClue === 1 ? 'bg-yellow-200 font-bold' : ''}`}>
                  My name is <strong>Peter</strong>. It is Thursday today.
                </p>
                <p className={`p-1 rounded transition-colors ${activePeterClue === 2 ? 'bg-yellow-200 font-bold' : ''}`}>
                  I have <strong>English, PE, music, art and maths</strong> at school.
                </p>
                <p className={`p-1 rounded transition-colors ${activePeterClue === 3 ? 'bg-yellow-200 font-bold' : ''}`}>
                  My favourite subject is <strong>English</strong>. I like it because I want to be an <strong>English teacher</strong>.
                </p>
                <p className={`p-1 rounded transition-colors ${activePeterClue === 4 ? 'bg-yellow-200 font-bold' : ''}`}>
                  I also like <strong>music</strong> because I want to be a <strong>singer</strong> too. I do not like maths because I am not good at it.
                </p>
              </div>

              <div className="pt-2 text-xs text-amber-800 italic">
                * Bấm nút "Soi Manh Mối 🔍" để xem dòng chữ chứng minh đáp án trong đoạn văn!
              </div>
            </div>

            {/* Questions Table */}
            <div className="lg:col-span-6 space-y-3">
              {readingQuestions.map(item => {
                const userVal = peterAnswers[item.id];
                const isCorrect = userVal === item.correct;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                      peterChecked
                        ? isCorrect
                          ? 'border-emerald-500 bg-emerald-50/40'
                          : 'border-rose-400 bg-rose-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm font-black text-slate-900">
                        {item.q}
                      </div>
                      <button
                        onClick={() => setActivePeterClue(item.id)}
                        className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg shrink-0 ml-2"
                      >
                        Soi Manh Mối 🔍
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        disabled={peterChecked}
                        onClick={() => {
                          sound.playClick();
                          setPeterAnswers({ ...peterAnswers, [item.id]: true });
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1 ${
                          userVal === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 border-slate-200'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>True (Đúng)</span>
                      </button>

                      <button
                        disabled={peterChecked}
                        onClick={() => {
                          sound.playClick();
                          setPeterAnswers({ ...peterAnswers, [item.id]: false });
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1 ${
                          userVal === false
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200'
                        }`}
                      >
                        <span>✗</span>
                        <span>False (Sai)</span>
                      </button>
                    </div>

                    {peterChecked && (
                      <div className={`text-xs p-2 rounded-xl font-medium ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setPeterChecked(true);
                    const correctCount = Object.keys(peterAnswers).filter(
                      k => peterAnswers[Number(k)] === readingQuestions.find(q => q.id === Number(k))?.correct
                    ).length;
                    if (correctCount === 4) {
                      sound.playVictory();
                      confetti({ particleCount: 50, spread: 60 });
                      onAddStar(4);
                    } else if (correctCount > 0) {
                      sound.playCorrect();
                      onAddStar(2);
                    } else {
                      sound.playWrong();
                    }
                  }}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
                >
                  Kiểm Tra Đáp Án
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LET'S WRITE ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
              Hoạt động 5 • Trang 61 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s write • Viết đoạn văn giới thiệu môn học yêu thích & ước mơ của em
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">
                ✍️ Nhập Thông Tin Bài Viết Của Em:
              </span>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">1. Tên của em (My name is...):</label>
                  <input
                    type="text"
                    value={writerName}
                    onChange={e => setWriterName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    placeholder="ví dụ: Nam, Mai, Linh..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">2. Môn học cùng với Toán hôm nay (I have... and maths today):</label>
                  <input
                    type="text"
                    value={writerTodaySubject}
                    onChange={e => setWriterTodaySubject(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    placeholder="ví dụ: English, science, Vietnamese..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">3. Môn học yêu thích nhất (My favourite subject is...):</label>
                  <input
                    type="text"
                    value={writerFavSubject}
                    onChange={e => setWriterFavSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    placeholder="ví dụ: art, music, PE, IT..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">4. Nghề nghiệp ước mơ (I want to be...):</label>
                  <input
                    type="text"
                    value={writerDreamJob}
                    onChange={e => setWriterDreamJob(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    placeholder="ví dụ: a singer, a painter, an English teacher..."
                  />
                </div>
              </div>
            </div>

            {/* Generated Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-indigo-50 border-2 border-rose-300 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-rose-800 tracking-wide">
                    📜 Thẻ Bài Viết Của Em:
                  </span>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full font-bold text-rose-700 border border-rose-200">
                    Tác giả: {writerName || 'bạn'}
                  </span>
                </div>

                <div className="p-4 bg-white/90 rounded-2xl border border-rose-200 text-sm leading-relaxed text-slate-800 space-y-2">
                  <p>
                    My name is <strong className="text-rose-700 underline">{writerName || '___'}</strong>. I have{' '}
                    <strong className="text-purple-700 underline">{writerTodaySubject || '___'}</strong> and maths today.
                  </p>
                  <p>
                    My favourite subject is{' '}
                    <strong className="text-amber-700 underline">{writerFavSubject || '___'}</strong>. I like it because I want to be{' '}
                    <strong className="text-indigo-700 underline">{writerDreamJob || '___'}</strong>.
                  </p>
                  <p className="font-bold text-rose-800">
                    What is your favourite subject?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    const text = `My name is ${writerName}. I have ${writerTodaySubject} and maths today. My favourite subject is ${writerFavSubject}. I like it because I want to be ${writerDreamJob}. What is your favourite subject?`;
                    speakWord(text, speechRate * 0.9);
                  }}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe Bài Viết</span>
                </button>

                <button
                  onClick={() => {
                    sound.playVictory();
                    setIsWritingSaved(true);
                    confetti({ particleCount: 50, spread: 60 });
                    onAddStar(3);
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{isWritingSaved ? 'Đã Lưu Bài Viết ✓' : 'Lưu & Nhận Sao'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: PROJECT: A SURVEY OF FAVOURITE SUBJECTS ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
              Hoạt động 6 • Trang 61 SGK (Project)
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Project: A survey of favourite subjects • Khảo sát môn học yêu thích của cả lớp
            </h3>
            <p className="text-xs text-slate-500">
              Bạn nữ đứng trước bảng báo cáo kết quả khảo sát: <em>"His favourite subject is maths. Because he wants to be a maths teacher."</em>
            </p>
          </div>

          {/* Add Friend Input */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-700">Thêm bạn mới vào bảng khảo sát:</span>
            <input
              type="text"
              placeholder="Tên bạn (ví dụ: Quan, Phong...)"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
            />
            <select
              value={newSub}
              onChange={e => setNewSub(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
            >
              <option value="maths">maths</option>
              <option value="English">English</option>
              <option value="music">music</option>
              <option value="art">art</option>
              <option value="PE">PE</option>
              <option value="IT">IT</option>
              <option value="science">science</option>
            </select>
            <input
              type="text"
              placeholder="Lý do (ví dụ: an IT teacher)"
              value={newReason}
              onChange={e => setNewReason(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
            />
            <button
              onClick={handleAddSurveyRow}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Vào Bảng</span>
            </button>
          </div>

          {/* Survey Report Table */}
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-black text-center">
                  <th className="p-3 border-r border-slate-800 w-16">STT</th>
                  <th className="p-3 border-r border-slate-800">Name (Tên bạn)</th>
                  <th className="p-3 border-r border-slate-800">Favourite subject (Môn yêu thích)</th>
                  <th className="p-3 border-r border-slate-800">Reason (Nghề nghiệp ước mơ)</th>
                  <th className="p-3">Thuyết trình</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {surveyRows.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-black text-center text-slate-500 bg-slate-100 border-r border-slate-200">
                      {idx + 1}
                    </td>
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200">
                      {row.name}
                    </td>
                    <td className="p-3 font-black text-rose-700 border-r border-slate-200 capitalize">
                      {row.favSubject}
                    </td>
                    <td className="p-3 font-medium text-slate-700 border-r border-slate-200">
                      {row.reason}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          sound.playClick();
                          const speech = `${row.name}’s favourite subject is ${row.favSubject}, because they want to be ${row.reason}.`;
                          speakWord(speech, speechRate);
                          onAddStar(1);
                        }}
                        className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl font-bold flex items-center gap-1 mx-auto"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Báo Cáo Mẫu</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                sound.playVictory();
                confetti({ particleCount: 60, spread: 70 });
                onAddStar(5);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Hoàn Thành Khảo Sát & Nhận 5 Sao ⭐</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
