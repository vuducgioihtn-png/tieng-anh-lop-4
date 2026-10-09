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
  Calendar,
  Grid,
  FileText,
  Star,
  Layers,
  Save,
  Printer
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit7Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit7Lesson3Studio: React.FC<Unit7Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: 'se' in Vietnamese (/z/) vs 'ce' in science (/s/)
  const phonicsPairs = [
    {
      ending: 'se',
      ipa: '/z/',
      name: 'Chữ cái "se" phát âm là /z/',
      desc: 'Phát âm rung nhẹ ở đầu lưỡi và dây thanh quản, giống tiếng ong vo ve "zzz". Xuất hiện ở đuôi từ Vietnamese.',
      reading: 'Z (rung nhẹ)',
      color: 'emerald',
      examples: [
        {
          word: 'Vietnamese',
          vi: 'tiếng Việt / môn Tiếng Việt',
          ipa: '/ˌvjet.nəˈmiːz/',
          reading: 'việt-nơ-MI-z',
          sentence: 'When do you have Vietnamese?',
          sentenceVi: 'Khi nào bạn có môn Tiếng Việt?',
          icon: '📘'
        },
        {
          word: 'Japanese',
          vi: 'tiếng Nhật / người Nhật',
          ipa: '/ˌdʒæp.ənˈiːz/',
          reading: 'dja-pơ-NI-z',
          sentence: 'He can speak Japanese.',
          sentenceVi: 'Bạn ấy có thể nói tiếng Nhật.',
          icon: '🇯🇵'
        }
      ]
    },
    {
      ending: 'ce',
      ipa: '/s/',
      name: 'Chữ cái "ce" phát âm là /s/',
      desc: 'Phát âm xì gió thanh thoát, không rung dây thanh quản (vô thanh), đẩy luồng hơi khẽ qua kẽ răng.',
      reading: 'S (xì gió khẽ)',
      color: 'teal',
      examples: [
        {
          word: 'science',
          vi: 'môn Khoa học',
          ipa: '/ˈsaɪ.əns/',
          reading: 'XAI-ừn-s',
          sentence: 'We have science today.',
          sentenceVi: 'Hôm nay chúng mình có môn Khoa học.',
          icon: '🔬'
        },
        {
          word: 'nice',
          vi: 'tốt bụng / đẹp đẽ',
          ipa: '/naɪs/',
          reading: 'NAI-s',
          sentence: 'Have a nice day!',
          sentenceVi: 'Chúc bạn một ngày tốt lành!',
          icon: '⭐'
        }
      ]
    }
  ];

  // Activity 2: Listen and circle (Track 75)
  interface ListenCircleItem {
    id: number;
    prompt: string;
    audioText: string;
    speaker: string;
    options: Array<{ key: 'a' | 'b' | 'c'; word: string; label: string }>;
    correctOption: 'a' | 'b' | 'c';
    userChoice: 'a' | 'b' | 'c' | null;
    explanation: string;
  }

  const [listenCircleQuiz, setListenCircleQuiz] = useState<ListenCircleItem[]>([
    {
      id: 1,
      prompt: '1. When do you have _____?',
      audioText: 'When do you have science? - I have it on Mondays.',
      speaker: '👧 Mai & Nam',
      options: [
        { key: 'a', word: 'science', label: 'a. science (/ˈsaɪ.əns/)' },
        { key: 'b', word: 'Vietnamese', label: 'b. Vietnamese (/ˌvjet.nəˈmiːz/)' },
        { key: 'c', word: 'maths', label: 'c. maths (/mæθs/)' }
      ],
      correctOption: 'a',
      userChoice: null,
      explanation: 'Trong đoạn băng bạn nhỏ hỏi rõ: "When do you have science?" ➔ Chọn a. science.'
    },
    {
      id: 2,
      prompt: '2. They have _____ today.',
      audioText: 'What subjects do they have today? - They have Vietnamese today.',
      speaker: '👦 Phong & Linda',
      options: [
        { key: 'a', word: 'maths', label: 'a. maths (/mæθs/)' },
        { key: 'b', word: 'science', label: 'b. science (/ˈsaɪ.əns/)' },
        { key: 'c', word: 'Vietnamese', label: 'c. Vietnamese (/ˌvjet.nəˈmiːz/)' }
      ],
      correctOption: 'c',
      userChoice: null,
      explanation: 'Bạn nhỏ trả lời: "They have Vietnamese today" ➔ Chọn c. Vietnamese.'
    }
  ]);
  const [circleQuizChecked, setCircleQuizChecked] = useState<boolean>(false);

  // Activity 3: Let's chant (Track 76)
  const chantVerses = [
    {
      title: 'Khổ 1: Môn Khoa Học (Science)',
      lines: [
        { en: 'Science, science.', vi: 'Khoa học, môn Khoa học.' },
        { en: 'When do you have science?', vi: 'Khi nào bạn có môn Khoa học?' },
        { en: 'I have science today.', vi: 'Hôm nay tớ có môn Khoa học nè.' },
        { en: 'I have science today.', vi: 'Hôm nay tớ có môn Khoa học nè.' }
      ]
    },
    {
      title: 'Khổ 2: Môn Tiếng Việt (Vietnamese)',
      lines: [
        { en: 'Vietnamese, Vietnamese.', vi: 'Tiếng Việt, môn Tiếng Việt.' },
        { en: 'When do you have Vietnamese?', vi: 'Khi nào các bạn có môn Tiếng Việt?' },
        { en: 'We have Vietnamese today.', vi: 'Hôm nay chúng mình có môn Tiếng Việt.' },
        { en: 'We have Vietnamese today.', vi: 'Hôm nay chúng mình có môn Tiếng Việt.' }
      ]
    }
  ];
  const [activeChantLine, setActiveChantLine] = useState<string | null>(null);

  // Activity 4: Read and circle (Minh's Profile)
  const minhPassage = `My name is Minh. I go to school from Mondays to Fridays.
I have Vietnamese and maths every school day.
I have English on Mondays, Thursdays and Fridays.
I have science on Wednesdays and Thursdays.
I have music on Tuesdays.
I like music very much.`;

  const [activeMinhClue, setActiveMinhClue] = useState<number | null>(null);
  const [minhAnswers, setMinhAnswers] = useState<{ [key: number]: 'a' | 'b' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [minhChecked, setMinhChecked] = useState<boolean>(false);

  const readingQuestions = [
    {
      id: 1,
      q: '1. Minh has _____ every school day.',
      options: [
        { key: 'a' as const, text: 'Vietnamese and English' },
        { key: 'b' as const, text: 'Vietnamese and maths' }
      ],
      correct: 'b' as const,
      clueSentence: 'I have Vietnamese and maths every school day.',
      explanation: 'Câu thứ 2 trong bài nêu rõ: Minh học Tiếng Việt và Toán mọi ngày đi học ➔ Chọn b.'
    },
    {
      id: 2,
      q: '2. He has English on Mondays, _____.',
      options: [
        { key: 'a' as const, text: 'Thursdays and Fridays' },
        { key: 'b' as const, text: 'Wednesdays and Fridays' }
      ],
      correct: 'a' as const,
      clueSentence: 'I have English on Mondays, Thursdays and Fridays.',
      explanation: 'Minh học Tiếng Anh vào Thứ Hai, Thứ Năm và Thứ Sáu ➔ Chọn a.'
    },
    {
      id: 3,
      q: '3. He has music on _____.',
      options: [
        { key: 'a' as const, text: 'Thursdays' },
        { key: 'b' as const, text: 'Tuesdays' }
      ],
      correct: 'b' as const,
      clueSentence: 'I have music on Tuesdays.',
      explanation: 'Minh có môn Âm nhạc vào Thứ Ba (Tuesdays) ➔ Chọn b.'
    },
    {
      id: 4,
      q: '4. He likes _____ very much.',
      options: [
        { key: 'a' as const, text: 'science' },
        { key: 'b' as const, text: 'music' }
      ],
      correct: 'b' as const,
      clueSentence: 'I like music very much.',
      explanation: 'Câu cuối bài: "I like music very much" (Minh rất thích môn Âm nhạc) ➔ Chọn b.'
    }
  ];

  // Activity 5: Let's write (Student Timetable Studio)
  const [studentName, setStudentName] = useState<string>('Linh');
  const [studentTodaySubjects, setStudentTodaySubjects] = useState<string>('English and maths');
  const [studentSchedule1, setStudentSchedule1] = useState<{ subject: string; day: string }>({
    subject: 'science',
    day: 'Wednesdays'
  });
  const [studentSchedule2, setStudentSchedule2] = useState<{ subject: string; day: string }>({
    subject: 'music',
    day: 'Tuesdays'
  });
  const [studentFavSubject, setStudentFavSubject] = useState<string>('English');
  const [isWritingSaved, setIsWritingSaved] = useState<boolean>(false);

  // Activity 6: Project: My Timetable Presenter
  const [projectPresentDay, setProjectPresentDay] = useState<string>('Monday');

  const customProjectTimetable: { [key: string]: string[] } = {
    Monday: ['Vietnamese', 'maths', 'science', 'English'],
    Tuesday: ['English', 'music', 'maths', 'Vietnamese'],
    Wednesday: ['science', 'maths', 'Vietnamese', 'history and geography'],
    Thursday: ['Vietnamese', 'art', 'maths', 'English'],
    Friday: ['Vietnamese', 'English', 'maths', 'history and geography']
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 7: Our timetables • Tiết 3 (Lesson 3)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-emerald-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-emerald-100 hover:text-white"
                >
                  ⬅️ Về Tiết 2
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Ngữ Âm Phonics & Thời Khóa Biểu Của Em</span>
              <span className="text-3xl">🎨</span>
            </h1>
            <p className="text-emerald-100 text-sm md:text-base font-medium mt-1">
              Phân biệt âm đuôi "se" (/z/) và "ce" (/s/), luyện đọc hiểu thời khóa biểu của Minh và hoàn thành Dự án Thời khóa biểu cá nhân!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 54 - 55</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Phonics</span>
              <span className="text-sm font-black text-amber-300">"se" /z/ & "ce" /s/</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Kỹ Năng</span>
              <span className="text-sm font-black text-white">Đọc Hiểu & Viết TKB</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Dự Án Lớp Học</span>
              <span className="text-sm font-black text-yellow-300">My Timetable Project 📋</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 54 - 55) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Phonics Lab (Track 74)', icon: '🗣️', desc: 'Trang 54 - Ngữ âm' },
          { num: 2, label: '2. Listen & circle (Track 75)', icon: '✍️', desc: 'Trang 54 - Khoanh tròn' },
          { num: 3, label: '3. Let’s chant (Track 76)', icon: '🎵', desc: 'Trang 54 - Vỗ nhịp' },
          { num: 4, label: '4. Read & circle', icon: '📖', desc: 'Trang 55 - Bài đọc Minh' },
          { num: 5, label: '5. Let’s write', icon: '📝', desc: 'Trang 55 - Viết bài' },
          { num: 6, label: '6. Project: My timetable', icon: '🏆', desc: 'Trang 55 - Dự án' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.num);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeSection === tab.num
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <div className="text-left">
              <div>{tab.label}</div>
              <div className={`text-[10px] ${activeSection === tab.num ? 'text-emerald-200' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: PHONICS LAB (TRACK 74) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
              Hoạt động 1 • Trang 54 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen and repeat • Phòng Thí Nghiệm Ngữ Âm Phonics
            </h3>
            <p className="text-xs text-slate-500">
              Phân biệt âm đuôi <strong>"se" (/z/)</strong> rung thanh quản và <strong>"ce" (/s/)</strong> xì hơi gió nhẹ:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map(p => (
              <div
                key={p.ending}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/50 space-y-4 hover:border-emerald-300 transition-all"
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
                    className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl"
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
                            <div className="text-xs text-emerald-700 font-medium">{ex.vi}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            sound.playClick();
                            speakWord(ex.word, speechRate);
                          }}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold"
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
                          title="Nghe câu mẫu"
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

      {/* ================= SECTION 2: LISTEN AND CIRCLE (TRACK 75) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
                Hoạt động 2 • Trang 54 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and circle • Nghe và khoanh tròn đáp án chính xác
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
                      className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1"
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
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {circleQuizChecked && (
                    <div
                      className={`text-xs p-2.5 rounded-xl font-medium ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
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
                const correctCount = listenCircleQuiz.filter(
                  q => q.userChoice === q.correctOption
                ).length;
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
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra Kết Quả
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S CHANT (TRACK 76) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
                Hoạt động 3 • Trang 54 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 76 (Bài Chant vui nhộn)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Let’s chant • Vỗ tay gõ nhịp cùng Science & Vietnamese
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
                    currentDelay += 2000;
                  });
                });
                setTimeout(() => {
                  setActiveChantLine(null);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 70 });
                  onAddStar(3);
                }, currentDelay + 400);
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 self-start sm:self-auto"
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

      {/* ================= SECTION 4: READ AND CIRCLE (MINH'S TIMETABLE) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
              Hoạt động 4 • Trang 55 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Read and circle • Đọc đoạn văn về bạn Minh và khoanh tròn đáp án
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Passage Display */}
            <div className="lg:col-span-6 p-5 rounded-3xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-black text-amber-900 uppercase">
                  📖 Đoạn Văn (Minh's School Week)
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(minhPassage, speechRate * 0.9);
                  }}
                  className="px-3 py-1 bg-white border border-amber-300 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Cả Bài</span>
                </button>
              </div>

              <div className="space-y-2 text-sm leading-relaxed text-slate-800">
                <p>
                  My name is <strong>Minh</strong>. I go to school from Mondays to Fridays.
                </p>
                <p
                  className={`p-1 rounded transition-colors ${
                    activeMinhClue === 1 ? 'bg-yellow-200 font-bold' : ''
                  }`}
                >
                  I have <strong>Vietnamese and maths</strong> every school day.
                </p>
                <p
                  className={`p-1 rounded transition-colors ${
                    activeMinhClue === 2 ? 'bg-yellow-200 font-bold' : ''
                  }`}
                >
                  I have <strong>English</strong> on Mondays, Thursdays and Fridays.
                </p>
                <p>
                  I have <strong>science</strong> on Wednesdays and Thursdays.
                </p>
                <p
                  className={`p-1 rounded transition-colors ${
                    activeMinhClue === 3 || activeMinhClue === 4 ? 'bg-yellow-200 font-bold' : ''
                  }`}
                >
                  I have <strong>music</strong> on Tuesdays. I like <strong>music</strong> very much.
                </p>
              </div>

              <div className="pt-2 text-xs text-amber-800 italic">
                * Bấm nút "Soi Manh Mối 🔍" ở từng câu để tô vàng dòng chữ chứa đáp án trong đoạn văn!
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-6 space-y-3">
              {readingQuestions.map(item => {
                const isCorrect = minhAnswers[item.id] === item.correct;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                      minhChecked
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
                        onClick={() => setActiveMinhClue(item.id)}
                        className="text-[11px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg shrink-0 ml-2"
                      >
                        Soi Manh Mối 🔍
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.options.map(opt => (
                        <button
                          key={opt.key}
                          disabled={minhChecked}
                          onClick={() => {
                            sound.playClick();
                            setMinhAnswers({ ...minhAnswers, [item.id]: opt.key });
                          }}
                          className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                            minhAnswers[item.id] === opt.key
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {opt.key}. {opt.text}
                        </button>
                      ))}
                    </div>

                    {minhChecked && (
                      <div
                        className={`text-xs p-2 rounded-xl font-medium ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setMinhChecked(true);
                    const correctCount = Object.keys(minhAnswers).filter(
                      k => minhAnswers[Number(k)] === readingQuestions.find(q => q.id === Number(k))?.correct
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
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
                >
                  Kiểm Tra Bài Đọc
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
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
              Hoạt động 5 • Trang 55 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s write • Viết đoạn văn giới thiệu thời khóa biểu của chính em
            </h3>
            <p className="text-xs text-slate-500">
              Nhập thông tin cá nhân và thời khóa biểu của em vào các ô để hệ thống tự động hoàn thiện bài thuyết trình:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 p-5 rounded-3xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">
                ✍️ Điền Thông Tin Của Em:
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">1. Tên của em (Name):</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-emerald-600"
                    placeholder="ví dụ: Linh, Nam, Mai..."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">2. Các môn học hôm nay (I have... today):</label>
                  <input
                    type="text"
                    value={studentTodaySubjects}
                    onChange={e => setStudentTodaySubjects(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-emerald-600"
                    placeholder="ví dụ: English and maths"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Môn 1:</label>
                    <input
                      type="text"
                      value={studentSchedule1.subject}
                      onChange={e => setStudentSchedule1({ ...studentSchedule1, subject: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vào ngày (on...):</label>
                    <input
                      type="text"
                      value={studentSchedule1.day}
                      onChange={e => setStudentSchedule1({ ...studentSchedule1, day: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Môn 2:</label>
                    <input
                      type="text"
                      value={studentSchedule2.subject}
                      onChange={e => setStudentSchedule2({ ...studentSchedule2, subject: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vào ngày (on...):</label>
                    <input
                      type="text"
                      value={studentSchedule2.day}
                      onChange={e => setStudentSchedule2({ ...studentSchedule2, day: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Môn học yêu thích nhất (I like... very much):</label>
                  <input
                    type="text"
                    value={studentFavSubject}
                    onChange={e => setStudentFavSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-emerald-600"
                    placeholder="ví dụ: English, music, art..."
                  />
                </div>
              </div>
            </div>

            {/* Live Generated Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-300 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-800 tracking-wide">
                    📜 Thẻ Bài Viết Hoàn Thiện
                  </span>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full font-bold text-emerald-700 border border-emerald-200">
                    Sản phẩm của {studentName || 'bạn'}
                  </span>
                </div>

                <div className="p-4 bg-white/90 rounded-2xl border border-emerald-200 text-sm leading-relaxed text-slate-800 space-y-2">
                  <p>
                    My name is <strong className="text-emerald-700 underline">{studentName || '___'}</strong>. I go to school from Mondays to Fridays.
                  </p>
                  <p>
                    I have <strong className="text-teal-700 underline">{studentTodaySubjects || '___'}</strong> today.
                  </p>
                  <p>
                    I have <strong className="text-purple-700 underline">{studentSchedule1.subject || '___'}</strong> on <strong className="text-purple-700 underline">{studentSchedule1.day || '___'}</strong>.
                  </p>
                  <p>
                    I have <strong className="text-indigo-700 underline">{studentSchedule2.subject || '___'}</strong> on <strong className="text-indigo-700 underline">{studentSchedule2.day || '___'}</strong>.
                  </p>
                  <p>
                    I like <strong className="text-rose-700 underline">{studentFavSubject || '___'}</strong> very much.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    const fullText = `My name is ${studentName}. I go to school from Mondays to Fridays. I have ${studentTodaySubjects} today. I have ${studentSchedule1.subject} on ${studentSchedule1.day}. I have ${studentSchedule2.subject} on ${studentSchedule2.day}. I like ${studentFavSubject} very much.`;
                    speakWord(fullText, speechRate * 0.9);
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
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{isWritingSaved ? 'Đã Lưu Bài Viết ✓' : 'Lưu & Nhận Thưởng'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: PROJECT: MY TIMETABLE ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
              Hoạt động 6 • Trang 55 SGK (Project)
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Project: My timetable • Thuyết trình thời khóa biểu trước lớp
            </h3>
            <p className="text-xs text-slate-500">
              Đóng vai bạn nhỏ cầm bảng thời khóa biểu thuyết trình: "On Mondays, I have..."
            </p>
          </div>

          {/* Presentation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <button
                key={day}
                onClick={() => {
                  sound.playClick();
                  setProjectPresentDay(day);
                  const subjects = customProjectTimetable[day].join(', ');
                  speakWord(`On ${day}s, I have ${subjects}`, speechRate);
                }}
                className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all border ${
                  projectPresentDay === day
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Presenter Classroom Stage */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-1.5">
                <span className="text-xl">👩‍🏫</span>
                <span className="font-bold text-slate-200">Sân Khấu Thuyết Trình Tiếng Anh 4</span>
              </span>
              <span className="text-amber-300 font-bold">Ngày đang chọn: {projectPresentDay}s</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase text-amber-400">
                  💬 Câu Thuyết Trình Mẫu Của Em:
                </span>
                <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-base sm:text-lg font-black text-emerald-300 leading-snug">
                  "On <span className="text-amber-300">{projectPresentDay}s</span>, I have{' '}
                  <span className="text-white">
                    {customProjectTimetable[projectPresentDay].slice(0, -1).join(', ')} and{' '}
                    {customProjectTimetable[projectPresentDay].slice(-1)}
                  </span>
                  ."
                </div>
                <div className="text-xs text-slate-400">
                  Nghĩa: <em>Vào các ngày {projectPresentDay}, tớ có các môn {customProjectTimetable[projectPresentDay].join(', ')}.</em>
                </div>
              </div>

              <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">4 Tiết Học Trong Ngày {projectPresentDay}:</span>
                <div className="space-y-1.5">
                  {customProjectTimetable[projectPresentDay].map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-700/60 rounded-xl text-xs font-bold flex items-center justify-between"
                    >
                      <span className="text-slate-300">Tiết {idx + 1}:</span>
                      <span className="text-amber-300">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                <span>Hoàn Thành Dự Án & Nhận 5 Sao ⭐</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
