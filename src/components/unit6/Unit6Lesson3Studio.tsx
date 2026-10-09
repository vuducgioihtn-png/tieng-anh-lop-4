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
  School,
  Building2,
  TreePine,
  Layers,
  Star
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit6Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit6Lesson3Studio: React.FC<Unit6Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: /z/ (s) vs /ɪz/ (es)
  const phonicsPairs = [
    {
      ending: 's',
      ipa: '/z/',
      name: 'Đuôi "s" phát âm là /z/',
      desc: 'Phát âm rung thanh quản nhẹ nhàng ở đầu lưỡi, như tiếng ong kêu "zzz". Xuất hiện sau các âm hữu thanh.',
      reading: 'Z (rung nhẹ)',
      color: 'blue',
      examples: [
        {
          word: 'mountains',
          vi: 'các ngọn núi / vùng núi',
          ipa: '/ˈmaʊn.tənz/',
          reading: 'MAO-tơn-z',
          sentence: 'My school is in the mountains.',
          sentenceVi: 'Trường của tớ ở vùng núi.',
          icon: '⛰️'
        },
        {
          word: 'gardens',
          vi: 'các khu vườn trường',
          ipa: '/ˈɡɑː.dənz/',
          reading: 'GA-dừn-z',
          sentence: 'There are two gardens at our school.',
          sentenceVi: 'Có hai khu vườn ở trường của chúng tớ.',
          icon: '🌷'
        }
      ]
    },
    {
      ending: 'es',
      ipa: '/ɪz/',
      name: 'Đuôi "es" phát âm là /ɪz/',
      desc: 'Phát âm thêm một âm tiết ngắn "iz". Xuất hiện sau các từ kết thúc bằng âm xuýt hoặc âm /dʒ/.',
      reading: 'ÍT-z (thêm 1 âm tiết)',
      color: 'emerald',
      examples: [
        {
          word: 'villages',
          vi: 'các ngôi làng / làng quê',
          ipa: '/ˈvɪl.ɪ.dʒɪz/',
          reading: 'VÍL-lịt-jiz',
          sentence: 'There are three villages near my school.',
          sentenceVi: 'Có ba ngôi làng ở gần trường của tớ.',
          icon: '🌾'
        },
        {
          word: 'houses',
          vi: 'những ngôi nhà',
          ipa: '/ˈhaʊ.zɪz/',
          reading: 'HAO-ziz',
          sentence: 'There are many houses in the town.',
          sentenceVi: 'Có rất nhiều ngôi nhà ở thị trấn.',
          icon: '🏡'
        }
      ]
    }
  ];

  // Activity 2: Listen and circle (Track 65)
  const [listenQuiz, setListenQuiz] = useState<
    Array<{
      id: number;
      audioTarget: string;
      sentence: string;
      options: Array<{ word: string; icon: string; endingType: string }>;
      userAnswer: string | null;
      correctWord: string;
    }>
  >([
    {
      id: 1,
      audioTarget: 'Our school is near two villages.',
      sentence: '1. Our school is near two ______.',
      options: [
        { word: 'towns', icon: '🏘️', endingType: '-s (/z/)' },
        { word: 'villages', icon: '🌾', endingType: '-es (/ɪz/)' },
        { word: 'mountains', icon: '⛰️', endingType: '-s (/z/)' }
      ],
      userAnswer: null,
      correctWord: 'villages'
    },
    {
      id: 2,
      audioTarget: 'There are two mountains not far from my school.',
      sentence: '2. There are two ______ not far from my school.',
      options: [
        { word: 'mountains', icon: '⛰️', endingType: '-s (/z/)' },
        { word: 'villages', icon: '🌾', endingType: '-es (/ɪz/)' },
        { word: 'towns', icon: '🏘️', endingType: '-s (/z/)' }
      ],
      userAnswer: null,
      correctWord: 'mountains'
    }
  ]);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  // Activity 3: Let's Chant (Track 66)
  const chantVerses = [
    {
      lineEn: 'Where’s your school?',
      lineVi: 'Trường của bạn ở đâu vậy?',
      highlight: 'Where’s'
    },
    {
      lineEn: 'It’s in the mountains.',
      lineVi: 'Trường ở vùng đồi núi.',
      highlight: 'mountains (/z/)'
    },
    {
      lineEn: 'It’s in the mountains.',
      lineVi: 'Trường ở vùng đồi núi.',
      highlight: 'mountains'
    },
    {
      lineEn: 'My school is in the mountains.',
      lineVi: 'Ngôi trường của tớ ở vùng núi cao.',
      highlight: 'in the mountains'
    },
    {
      lineEn: 'Where’s your school?',
      lineVi: 'Trường của bạn ở đâu vậy?',
      highlight: 'Where’s'
    },
    {
      lineEn: 'It’s in the village.',
      lineVi: 'Trường ở làng quê.',
      highlight: 'village'
    },
    {
      lineEn: 'It’s in the village.',
      lineVi: 'Trường ở làng quê.',
      highlight: 'village'
    },
    {
      lineEn: 'My school is in the village.',
      lineVi: 'Ngôi trường của tớ ở chốn làng quê.',
      highlight: 'in the village'
    }
  ];
  const [chantingLine, setChantingLine] = useState<number | null>(null);

  // Activity 4: Read and complete
  const readingPassage = `Our school is big. It is in the village. There are three buildings and a garden at our school. The garden has many trees and flowers. There is a big playground. We can play football, badminton and volleyball there.`;

  const readingQuestions = [
    {
      id: 1,
      prefix: '1. Our school is in the',
      correctAnswer: 'village',
      clue: 'It is in the village.',
      userAnswer: ''
    },
    {
      id: 2,
      prefix: '2. There are',
      suffix: 'buildings at our school.',
      correctAnswer: 'three',
      clue: 'There are three buildings and a garden at our school.',
      userAnswer: ''
    },
    {
      id: 3,
      prefix: '3. There is a',
      suffix: 'with many trees and flowers.',
      correctAnswer: 'garden',
      clue: 'The garden has many trees and flowers.',
      userAnswer: ''
    },
    {
      id: 4,
      prefix: '4. We can play sports in the',
      correctAnswer: 'playground',
      clue: 'There is a big playground. We can play football, badminton and volleyball there.',
      userAnswer: ''
    }
  ];
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [readingAnswers, setReadingAnswers] = useState<{ [key: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [readingChecked, setReadingChecked] = useState<boolean>(false);

  // Activity 5: Let's Write (School Presentation Studio)
  const [writerSchoolAdjective, setWriterSchoolAdjective] = useState<string>('big and beautiful');
  const [writerSchoolLocation, setWriterSchoolLocation] = useState<string>('in the city');
  const [writerBuildingsCount, setWriterBuildingsCount] = useState<string>('three buildings');
  const [writerFacilityItem, setWriterFacilityItem] = useState<string>('a green garden and a computer room');
  const [writerSport, setWriterSport] = useState<string>('football and badminton');

  // Activity 6: Project: Our School Canvas
  const [projectSchoolName, setProjectSchoolName] = useState<string>('Sao Mai Primary School');
  const [projectLocation, setProjectLocation] = useState<string>('in the mountains ⛰️');
  const [projectFacilities, setProjectFacilities] = useState<string[]>([
    '3 buildings 🏢',
    '1 big playground 🛝',
    '1 computer room 💻'
  ]);
  const [newFacilityInput, setNewFacilityInput] = useState('');

  const handleAddProjectFacility = () => {
    if (!newFacilityInput.trim()) return;
    setProjectFacilities([...projectFacilities, newFacilityInput.trim()]);
    setNewFacilityInput('');
    sound.playCorrect();
    onAddStar(1);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 6: Our School Facilities • Tiết 3 (Lesson 3)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-sky-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-sky-100 hover:text-white"
                >
                  ⬅️ Về Tiết 2
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Phonics -s & -es • Đọc Hiểu & Dự Án Trường Học</span>
              <span className="text-3xl">⛰️🌾🏫</span>
            </h1>
            <p className="text-sky-100 text-sm md:text-base font-medium mt-1">
              Luyện phát âm đuôi số nhiều chuẩn quốc tế /z/ & /ɪz/, hòa nhịp bài Chant vui nhộn, đọc hiểu về ngôi trường làng và tự tay thuyết trình dự án trường mơ ước!
            </p>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 48 - 49</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Ngữ Âm</span>
              <span className="text-sm font-black text-amber-300">Đuôi -s /z/ & -es /ɪz/</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Kỹ Năng</span>
              <span className="text-sm font-black text-emerald-300">Đọc & Viết Đoạn Văn</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-sky-200 block font-medium">Dự Án</span>
              <span className="text-sm font-black text-cyan-300">Project: Our School 🎨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Phòng Luyện Âm Phonics', icon: '🔬' },
          { num: 2, label: '2. Thử Tài Khoanh Âm', icon: '🎧' },
          { num: 3, label: '3. Bài Chant Vui Nhộn', icon: '🎵' },
          { num: 4, label: '4. Đọc Hiểu & Soi Manh Mối', icon: '📖' },
          { num: 5, label: '5. Viết Về Trường Của Em', icon: '✍️' },
          { num: 6, label: '6. Dự Án Bức Tranh Ngôi Trường', icon: '🎨' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveSection(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === tab.num
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PHONICS LAB (-s /z/ & -es /ɪz/) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                Phần 1 • SGK Trang 48
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and repeat (Track 64)</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 64
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khám phá quy tắc phát âm đuôi số nhiều: đuôi "-s" đọc là /z/ (mountains) và đuôi "-es" đọc là /ɪz/ (villages).
              </p>
            </div>

            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{showParentGuides ? 'Ẩn bí kíp luyện âm' : 'Xem bí kíp luyện âm'}</span>
            </button>
          </div>

          {/* Phonics Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map((pair, pIdx) => (
              <div
                key={pIdx}
                className={`p-6 rounded-3xl border-2 space-y-4 ${
                  pair.color === 'blue'
                    ? 'bg-sky-50/60 border-sky-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-slate-900 bg-white px-3 py-1 rounded-2xl shadow-sm border border-slate-100 font-mono">
                      {pair.ipa}
                    </span>
                    <div>
                      <span className="text-sm font-black text-slate-900 block">{pair.name}</span>
                      <span className="text-xs text-slate-500 font-semibold">Đọc: {pair.reading}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      speakWord(pair.ending === 's' ? 'mountains' : 'villages', speechRate);
                      sound.playClick();
                    }}
                    className="p-3 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl shadow-sm border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                    <span>Nghe âm</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-200">
                  💡 <strong>Khẩu hình chuẩn:</strong> {pair.desc}
                </p>

                {/* Example Words */}
                <div className="space-y-3 pt-1">
                  {pair.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{ex.icon}</span>
                          <div>
                            <span className="text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                              {ex.word}
                            </span>
                            <span className="text-xs text-slate-400 ml-2 font-mono">{ex.ipa}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              speakWord(ex.word, 0.7);
                              sound.playClick();
                            }}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600"
                            title="Nghe tốc độ chậm"
                          >
                            🐢 Chậm
                          </button>
                          <button
                            onClick={() => {
                              speakWord(ex.word, speechRate);
                              onAddStar(1);
                            }}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-black flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 font-medium">
                        Nghĩa: {ex.vi} • Đọc mẫu: <span className="font-bold text-slate-700">{ex.reading}</span>
                      </div>

                      {/* Example Sentence */}
                      <div
                        onClick={() => speakWord(ex.sentence, speechRate)}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs cursor-pointer hover:bg-indigo-50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-black text-slate-800 block">"{ex.sentence}"</span>
                          <span className="text-[11px] text-slate-500">{ex.sentenceVi}</span>
                        </div>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Parent & Teacher Guide */}
          {showParentGuides && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Bí Kíp Luyện Âm Số Nhiều Dành Cho Bé & Phụ Huynh</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li>
                  <strong>Với từ mountains:</strong> Từ này có 2 âm tiết (/ˈmaʊn.tənz/), âm đuôi "s" đọc là /z/ rung nhẹ đầu lưỡi ở hàm răng trên. Tránh đọc thành "mao-từn-s" xì gió mạnh.
                </li>
                <li>
                  <strong>Với từ villages:</strong> Khi thêm "s" vào từ kết thúc bằng "ge" (village), nó tạo thành 3 âm tiết (/ˈvɪl.ɪ.dʒɪz/). Hãy nhắc con đọc dứt khoát 3 nhịp: <em>VÍL - lịt - jiz</em>.
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN AND CIRCLE (TRACK 65) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                Phần 2 • SGK Trang 48
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and circle</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 65
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm loa nghe từng câu mẫu trong bài nghe Track 65 để khoanh tròn từ đúng (towns, villages hay mountains).
              </p>
            </div>

            <button
              onClick={() => {
                setListenQuiz(prev => prev.map(q => ({ ...q, userAnswer: null })));
                setQuizChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listenQuiz.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-700 uppercase">
                    Câu Hỏi #{item.id}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(item.audioTarget, speechRate);
                      sound.playClick();
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Băng #{item.id}</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm font-black text-slate-800">
                  {item.sentence}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {item.options.map(opt => (
                    <button
                      key={opt.word}
                      onClick={() => {
                        setListenQuiz(prev =>
                          prev.map(q =>
                            q.id === item.id ? { ...q, userAnswer: opt.word } : q
                          )
                        );
                        sound.playClick();
                      }}
                      className={`p-3 rounded-2xl border-2 font-black text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                        item.userAnswer === opt.word
                          ? 'border-indigo-600 bg-indigo-100 text-indigo-900 shadow-md scale-105'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span>{opt.word}</span>
                      <span className="text-[10px] text-indigo-600 font-mono">
                        {opt.endingType}
                      </span>
                    </button>
                  ))}
                </div>

                {quizChecked && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      item.userAnswer === item.correctWord
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.userAnswer === item.correctWord
                      ? `✅ Xuất sắc! Từ trong băng là "${item.correctWord}".`
                      : `❌ Chưa đúng rồi! Băng đọc: "${item.audioTarget}". Từ đúng là "${item.correctWord}".`}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setQuizChecked(true);
                const allCorrect = listenQuiz.every(q => q.userAnswer === q.correctWord);
                if (allCorrect) {
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(3);
                } else {
                  sound.playCorrect();
                }
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Kiểm Tra Đáp Án Nghe (Track 65)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S CHANT (TRACK 66) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                Phần 3 • SGK Trang 48
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Let's chant • Where’s your school?</span>
                <span className="text-2xl">🎵</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vỗ tay theo nhịp điệu rộn ràng, luyện phát âm núi non (mountains) và làng quê (village).
              </p>
            </div>

            <button
              onClick={() => {
                const fullChant = chantVerses.map(v => v.lineEn).join('. ');
                speakWord(fullChant, speechRate);
                confetti({ particleCount: 35, spread: 50 });
                onAddStar(2);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Chant Toàn Bộ Bài (Track 66)</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4 animate-bounce" />
                <span>Bấm vào từng câu để chant theo nhịp</span>
              </span>
              <span className="text-xs text-sky-200 font-mono">BPM: 110 • Rộn rã</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {chantVerses.map((verse, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setChantingLine(idx);
                    speakWord(verse.lineEn, speechRate);
                    onAddStar(1);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1 ${
                    chantingLine === idx
                      ? 'border-amber-400 bg-white/20 scale-[1.02] shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-sky-300">
                      Line #{idx + 1}
                    </span>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-amber-300 font-bold">
                      {verse.highlight}
                    </span>
                  </div>
                  <div className="text-base font-black text-white">{verse.lineEn}</div>
                  <div className="text-xs text-sky-200 font-medium">{verse.lineVi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: READ AND COMPLETE */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                Phần 4 • SGK Trang 49
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Read and complete (Đọc đoạn văn trường làng)</span>
                <span className="text-2xl">📖</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Đọc đoạn văn giới thiệu ngôi trường lớn ở làng quê và điền 4 từ còn thiếu vào chỗ trống.
              </p>
            </div>

            <button
              onClick={() => {
                speakWord(readingPassage, speechRate);
                sound.playClick();
              }}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bài Đọc</span>
            </button>
          </div>

          {/* Reading Box */}
          <div className="bg-sky-50/60 rounded-3xl p-6 border-2 border-sky-200 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-900 uppercase tracking-wide">
                📜 Đoạn Văn: Ngôi Trường Làng Quê Của Chúng Tớ
              </span>
              <span className="text-xs text-slate-500 italic">
                Chạm vào câu hỏi dưới để xem manh mối được tô vàng
              </span>
            </div>

            <div className="text-sm md:text-base leading-relaxed text-slate-800 font-medium space-y-2 bg-white p-5 rounded-2xl border border-sky-200 shadow-inner">
              <p>Our school is big.</p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('village')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                It is in the village.
              </p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('buildings')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                There are three buildings and a garden at our school.
              </p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('garden has')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                The garden has many trees and flowers.
              </p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('playground')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                There is a big playground. We can play football, badminton and volleyball there.
              </p>
            </div>
          </div>

          {/* Fill-in Questions */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-700 block uppercase">
              Điền các từ thích hợp vào chỗ trống:
            </span>

            <div className="space-y-3">
              {readingQuestions.map(q => (
                <div
                  key={q.id}
                  onMouseEnter={() => setActiveClue(q.clue)}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 flex-wrap text-sm font-bold text-slate-900">
                    <span>{q.prefix}</span>
                    <input
                      type="text"
                      value={readingAnswers[q.id]}
                      onChange={e =>
                        setReadingAnswers({ ...readingAnswers, [q.id]: e.target.value })
                      }
                      placeholder={q.correctAnswer}
                      className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-black text-indigo-700 w-36 bg-white focus:outline-indigo-500"
                    />
                    {q.suffix && <span>{q.suffix}</span>}
                  </div>

                  {readingChecked && (
                    <div className="text-xs font-bold">
                      {readingAnswers[q.id].trim().toLowerCase() === q.correctAnswer
                        ? '✅ Đúng!'
                        : `👉 Đáp án: ${q.correctAnswer}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setReadingChecked(true);
                const score = readingQuestions.filter(
                  q => readingAnswers[q.id].trim().toLowerCase() === q.correctAnswer
                ).length;
                if (score === readingQuestions.length) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(4);
                } else {
                  sound.playCorrect();
                }
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Chấm Điểm Bài Đọc</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LET'S WRITE (SCHOOL PROFILE STUDIO) */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
              Phần 5 • SGK Trang 49
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Let's write • Phòng viết bài giới thiệu trường học</span>
              <span className="text-2xl">✍️</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự tay điền thông tin về ngôi trường thực tế của em. Thẻ giới thiệu trường học sẽ tự động được tạo trực quan!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-200">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-wider block">
                Điền thông tin trường của em:
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Đặc điểm trường (Ví dụ: big / small / beautiful):
                  </label>
                  <input
                    type="text"
                    value={writerSchoolAdjective}
                    onChange={e => setWriterSchoolAdjective(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Vị trí (in the city / in the mountains / in the village / in the town):
                  </label>
                  <input
                    type="text"
                    value={writerSchoolLocation}
                    onChange={e => setWriterSchoolLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-indigo-700 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Số lượng tòa nhà (There are...):
                  </label>
                  <input
                    type="text"
                    value={writerBuildingsCount}
                    onChange={e => setWriterBuildingsCount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Cơ sở vật chất khác (There is...):
                  </label>
                  <input
                    type="text"
                    value={writerFacilityItem}
                    onChange={e => setWriterFacilityItem(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Môn thể thao em thường chơi ở sân trường (We can play...):
                  </label>
                  <input
                    type="text"
                    value={writerSport}
                    onChange={e => setWriterSport(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="bg-gradient-to-br from-indigo-500 via-sky-600 to-teal-500 p-1 rounded-3xl shadow-xl">
              <div className="bg-white rounded-[22px] p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Bài Viết Giới Thiệu Hoàn Chỉnh</span>
                    </span>
                    <span className="text-xl">🏫✨</span>
                  </div>

                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-slate-800">
                    <p>
                      My school is <strong className="text-indigo-700 underline">{writerSchoolAdjective || '...'}</strong>.{' '}
                      It is <strong className="text-emerald-700">{writerSchoolLocation || '...'}</strong>.
                    </p>
                    <p>
                      There are <strong className="text-sky-700">{writerBuildingsCount || '...'}</strong>.{' '}
                      There is <strong className="text-teal-700">{writerFacilityItem || '...'}</strong>.
                    </p>
                    <p>
                      My school has a playground. We can play{' '}
                      <strong className="text-amber-700">{writerSport || '...'}</strong> there.
                    </p>
                    <p className="text-base font-black text-rose-600 pt-1">
                      I love my school! ❤️
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <button
                    onClick={() => {
                      const text = `My school is ${writerSchoolAdjective}. It is ${writerSchoolLocation}. There are ${writerBuildingsCount}. There is ${writerFacilityItem}. My school has a playground. We can play ${writerSport} there. I love my school!`;
                      speakWord(text, speechRate);
                      sound.playVictory();
                      confetti({ particleCount: 40, spread: 60 });
                      onAddStar(3);
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Đọc Toàn Bộ Bài Viết</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: PROJECT: OUR SCHOOL CANVAS */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                Phần 6 • SGK Trang 49
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Project: Our school (Thuyết trình bức tranh ngôi trường)</span>
                <span className="text-2xl">🎨</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Thiết kế tấm áp phích giới thiệu trường học của em trước cả lớp: "Look at my school! It’s in the...".
              </p>
            </div>

            <button
              onClick={() => {
                confetti({ particleCount: 70, spread: 80 });
                sound.playVictory();
                onAddStar(3);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bắn Pháo Hoa Cổ Vũ! 🎉</span>
            </button>
          </div>

          {/* Project Board */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Áp phích thuyết trình trước lớp
                </span>
                <h4 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{projectSchoolName}</span>
                  <span className="text-sm font-normal text-sky-300">({projectLocation})</span>
                </h4>
              </div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-emerald-300 font-bold border border-white/10">
                ✨ Dự Án Hoàn Thành
              </span>
            </div>

            {/* Presentation speech bubble */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-sky-300 block uppercase">
                Lời thuyết trình mẫu:
              </span>
              <p className="text-base font-medium text-slate-100 italic leading-relaxed">
                "Hello everyone! Look at my school! It’s {projectLocation}. At my school, there are {projectFacilities.join(', ')}. We have so much fun studying here every day!"
              </p>
              <button
                onClick={() =>
                  speakWord(
                    `Hello everyone! Look at my school! It is ${projectLocation}. At my school, there are ${projectFacilities.join(', ')}.`,
                    speechRate
                  )
                }
                className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 pt-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc lời thuyết trình</span>
              </button>
            </div>

            {/* Facilities Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block uppercase">
                Các khu vực trong trường:
              </span>
              <div className="flex flex-wrap gap-2">
                {projectFacilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white/15 rounded-xl text-xs font-bold text-white border border-white/10"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick add facility input */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Thêm khu vực khác (ví dụ: 1 library 📚)..."
                value={newFacilityInput}
                onChange={e => setNewFacilityInput(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-white/10 text-white placeholder-slate-400 border border-white/20 flex-1 min-w-[200px] focus:outline-sky-400"
              />
              <button
                onClick={handleAddProjectFacility}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-black transition-all"
              >
                Thêm Vào Áp Phích +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
