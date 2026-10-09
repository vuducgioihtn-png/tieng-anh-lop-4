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
  Layers,
  Star,
  Printer,
  Download
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit5Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit5Lesson3Studio: React.FC<Unit5Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: /dr/ and /sw/
  const phonicsPairs = [
    {
      cluster: 'dr',
      ipa: '/dr/',
      name: 'Âm chùm "dr" /dr/',
      desc: 'Đầu lưỡi hơi cong lên vòm miệng chuẩn bị âm /d/, rồi trượt nhanh sang âm /r/, chu nhẹ môi.',
      reading: 'Đ-R (lướt nhanh)',
      color: 'blue',
      examples: [
        {
          word: 'draw',
          vi: 'vẽ tranh nghệ thuật',
          ipa: '/drɔː/',
          reading: 'Đ-RO',
          sentence: 'I can draw a cat.',
          sentenceVi: 'Tớ có thể vẽ một chú mèo con.',
          icon: '🎨'
        },
        {
          word: 'drink',
          vi: 'uống nước / đồ uống',
          ipa: '/drɪŋk/',
          reading: 'Đ-RINH-k',
          sentence: 'I drink water every day.',
          sentenceVi: 'Tớ uống nước mỗi ngày.',
          icon: '🥤'
        }
      ]
    },
    {
      cluster: 'sw',
      ipa: '/sw/',
      name: 'Âm chùm "sw" /sw/',
      desc: 'Xì nhẹ âm /s/ qua kẽ răng rồi lập tức chu tròn môi để phát âm /w/.',
      reading: 'X-UÔI (lướt nhanh)',
      color: 'emerald',
      examples: [
        {
          word: 'swim',
          vi: 'bơi lội dưới nước',
          ipa: '/swɪm/',
          reading: 'X-UÝM',
          sentence: 'Can you swim? - Yes, I can.',
          sentenceVi: 'Cậu biết bơi không? - Có, tớ biết bơi.',
          icon: '🏊'
        },
        {
          word: 'sweet',
          vi: 'ngọt ngào / viên kẹo',
          ipa: '/swiːt/',
          reading: 'X-UÝT-t',
          sentence: 'This apple is very sweet.',
          sentenceVi: 'Quả táo này rất ngọt ngào.',
          icon: '🍬'
        }
      ]
    }
  ];

  // Activity 2: Listen and circle / tick (Track 53)
  const [listenQuiz, setListenQuiz] = useState<
    Array<{
      id: number;
      audioTarget: string;
      sentence: string;
      options: Array<{ word: string; icon: string; cluster: string }>;
      userAnswer: string | null;
      correctWord: string;
    }>
  >([
    {
      id: 1,
      audioTarget: 'I can draw a house.',
      sentence: '1. I can ______ a house.',
      options: [
        { word: 'draw', icon: '🎨', cluster: '/dr/' },
        { word: 'drink', icon: '🥤', cluster: '/dr/' }
      ],
      userAnswer: null,
      correctWord: 'draw'
    },
    {
      id: 2,
      audioTarget: 'Can you swim in the lake?',
      sentence: '2. Can you ______ in the lake?',
      options: [
        { word: 'swim', icon: '🏊', cluster: '/sw/' },
        { word: 'sweet', icon: '🍬', cluster: '/sw/' }
      ],
      userAnswer: null,
      correctWord: 'swim'
    }
  ]);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  // Activity 3: Let's Chant (Track 54)
  const chantVerses = [
    {
      lineEn: 'Can you swim?',
      lineVi: 'Bạn có biết bơi không?',
      highlight: 'swim (/sw/)'
    },
    {
      lineEn: 'Yes, I can. Yes, I can.',
      lineVi: 'Có, mình biết bơi. Có, mình biết bơi.',
      highlight: 'I can'
    },
    {
      lineEn: 'Can you draw?',
      lineVi: 'Bạn có biết vẽ tranh không?',
      highlight: 'draw (/dr/)'
    },
    {
      lineEn: 'No, I can’t. No, I can’t.',
      lineVi: 'Không, mình chưa biết vẽ đâu.',
      highlight: "can't"
    },
    {
      lineEn: 'Can he swim? Yes, he can.',
      lineVi: 'Bạn nam ấy biết bơi không? Có, bạn ấy biết bơi.',
      highlight: 'he can'
    },
    {
      lineEn: 'Can she draw? No, she can’t.',
      lineVi: 'Bạn nữ ấy biết vẽ không? Không, bạn ấy chưa biết.',
      highlight: "she can't"
    }
  ];
  const [chantingLine, setChantingLine] = useState<number | null>(null);

  // Activity 4: Read and tick
  const readingPassage = `Hello, I am Lucy. I have many good friends.
Linh can swim and ride a bike, but she can't ride a horse.
Ben can play the guitar and roller skate, but he can't cook.
I can sing English songs and play the piano.
We often play together on Sundays.
What about you? What can you do?`;

  const readingQuestions = [
    {
      id: 1,
      name: 'Linh',
      action: 'swim and ride a bike',
      can: true,
      clue: 'Linh can swim and ride a bike',
      userAnswer: null as boolean | null
    },
    {
      id: 2,
      name: 'Linh',
      action: 'ride a horse',
      can: false,
      clue: "she can't ride a horse",
      userAnswer: null as boolean | null
    },
    {
      id: 3,
      name: 'Ben',
      action: 'play the guitar and roller skate',
      can: true,
      clue: 'Ben can play the guitar and roller skate',
      userAnswer: null as boolean | null
    },
    {
      id: 4,
      name: 'Ben',
      action: 'cook',
      can: false,
      clue: "he can't cook",
      userAnswer: null as boolean | null
    },
    {
      id: 5,
      name: 'Lucy',
      action: 'sing English songs and play the piano',
      can: true,
      clue: 'I can sing English songs and play the piano',
      userAnswer: null as boolean | null
    }
  ];
  const [activeClue, setActiveClue] = useState<string | null>(null);
  const [readingAnswers, setReadingAnswers] = useState<Array<boolean | null>>([
    null,
    null,
    null,
    null,
    null
  ]);
  const [readingSubmitted, setReadingSubmitted] = useState<boolean>(false);

  // Activity 5: Let's Write (Interactive Talent Authoring Studio)
  const [writerMyName, setWriterMyName] = useState<string>('Nam');
  const [writerMyCan1, setWriterMyCan1] = useState<string>('swim');
  const [writerMyCan2, setWriterMyCan2] = useState<string>('ride a bike');
  const [writerMyCant, setWriterMyCant] = useState<string>('ride a horse');

  const [writerFriendName, setWriterFriendName] = useState<string>('Mai');
  const [writerFriendGender, setWriterFriendGender] = useState<'he' | 'she'>('she');
  const [writerFriendCan, setWriterFriendCan] = useState<string>('play the piano');
  const [writerFriendCant, setWriterFriendCant] = useState<string>('roller skate');

  // Activity 6: Class Talent Show Project
  const [talentShowRoster, setTalentShowRoster] = useState([
    { name: 'Minh', talent: 'play the guitar 🎸', verified: true },
    { name: 'Lan', talent: 'draw beautiful pictures 🎨', verified: true },
    { name: 'Quân', talent: 'swim very fast 🏊', verified: true },
    { name: 'Thu', talent: 'cook delicious cakes 🍳', verified: true }
  ]);
  const [newRosterName, setNewRosterName] = useState('');
  const [newRosterTalent, setNewRosterTalent] = useState('roller skate 🛼');

  const handleAddTalentShowItem = () => {
    if (!newRosterName.trim()) return;
    setTalentShowRoster(prev => [
      ...prev,
      { name: newRosterName.trim(), talent: newRosterTalent, verified: true }
    ]);
    setNewRosterName('');
    sound.playCorrect();
    confetti({ particleCount: 40, spread: 50 });
    onAddStar(2);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 5: Things We Can Do • Tiết 3 (Lesson 3)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-purple-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-purple-100 hover:text-white"
                >
                  ⬅️ Về Tiết 2
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Phonics /dr/ & /sw/ • Đọc Hiểu & Dự Án</span>
              <span className="text-3xl">🎨🏊</span>
            </h1>
            <p className="text-purple-100 text-sm md:text-base font-medium mt-1">
              Khám phá bí mật phát âm 2 âm chùm phụ âm chuẩn bản xứ, hòa nhịp cùng bài Chant sôi động, đọc hiểu câu chuyện tài năng và tự tay thiết kế Thẻ Tài Năng cá nhân!
            </p>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 38 - 39</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Ngữ Âm</span>
              <span className="text-sm font-black text-amber-300">/dr/ & /sw/</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Kỹ Năng</span>
              <span className="text-sm font-black text-teal-300">Đọc & Viết Đoạn Văn</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Dự Án</span>
              <span className="text-sm font-black text-pink-300">Class Talent Show 🌟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Phòng Thu Âm Phonics', icon: '🔬' },
          { num: 2, label: '2. Thử Tài Phân Biệt Âm', icon: '🎧' },
          { num: 3, label: '3. Bài Chant Rộn Ràng', icon: '🎵' },
          { num: 4, label: '4. Đọc Hiểu & Soi Manh Mối', icon: '📖' },
          { num: 5, label: '5. Studio Viết Thẻ Tài Năng', icon: '✍️' },
          { num: 6, label: '6. Hội Chợ Tài Năng Lớp Học', icon: '🎪' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveSection(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === tab.num
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PHONICS LAB (/dr/ & /sw/) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Phần 1 • SGK Trang 38
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and repeat (Track 52)</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 52
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Luyện phát âm 2 âm chùm phụ âm quan trọng nhất của Lớp 4: /dr/ (như trong draw, drink) và /sw/ (như trong swim, sweet).
              </p>
            </div>

            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
            >
              {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{showParentGuides ? 'Ẩn mẹo luyện âm' : 'Xem mẹo luyện âm'}</span>
            </button>
          </div>

          {/* Phonics Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phonicsPairs.map((pair, pIdx) => (
              <div
                key={pIdx}
                className={`p-6 rounded-3xl border-2 space-y-4 ${
                  pair.color === 'blue'
                    ? 'bg-blue-50/60 border-blue-200'
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
                      speakWord(pair.cluster, speechRate);
                      sound.playClick();
                    }}
                    className="p-3 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl shadow-sm border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4 text-purple-600" />
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
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all space-y-2 group shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{ex.icon}</span>
                          <div>
                            <span className="text-base font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                              {ex.word}
                            </span>
                            <span className="text-xs text-slate-400 ml-2 font-mono">{ex.ipa}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Slow read */}
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
                          {/* Normal read */}
                          <button
                            onClick={() => {
                              speakWord(ex.word, speechRate);
                              onAddStar(1);
                            }}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-black flex items-center gap-1"
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
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs cursor-pointer hover:bg-purple-50 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-black text-slate-800 block">"{ex.sentence}"</span>
                          <span className="text-[11px] text-slate-500">{ex.sentenceVi}</span>
                        </div>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 flex-shrink-0 ml-2" />
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
                <span>Bí Kíp Luyện Âm Chuẩn Não Phải (Dành Cho Bé & Phụ Huynh)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li>
                  <strong>Với âm /dr/:</strong> Người Việt thường đọc thành "đr" nặng nề hoặc tách thành "đờ-rờ". Hãy hướng dẫn con: Đặt lưỡi như muốn nói chữ "Đ", nhưng miệng chu ra như chuẩn bị hôn gió để lướt mượt mà sang chữ "R": <em>"Đ-RO"</em> (draw), <em>"Đ-RINH-k"</em> (drink).
                </li>
                <li>
                  <strong>Với âm /sw/:</strong> Tuyệt đối không đọc là "xi-guym" hay "sờ-quim". Hãy xì nhẹ một tiếng gió /s/ rồi chu môi ngay sang /w/: <em>"X-UÝM"</em> (swim).
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN AND CIRCLE / TICK (TRACK 53) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Phần 2 • SGK Trang 38
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and circle</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 53
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm loa nghe câu mẫu, lắng nghe kỹ âm /dr/ hay /sw/ để chọn từ chính xác được phát âm trong băng.
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
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4 hover:border-purple-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-700 uppercase">
                    Câu Hỏi #{item.id}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(item.audioTarget, speechRate);
                      sound.playClick();
                    }}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Băng #{item.id}</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm font-black text-slate-800">
                  {item.sentence}
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      className={`p-3.5 rounded-2xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        item.userAnswer === opt.word
                          ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-md scale-105'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <span>{opt.word}</span>
                        <span className="text-[10px] text-purple-600 block font-mono">
                          {opt.cluster}
                        </span>
                      </div>
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
                      ? `✅ Xuất sắc! Từ được đọc trong băng là "${item.correctWord}".`
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
                  sound.playClick();
                }
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Kiểm Tra Đáp Án Nghe</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S CHANT (TRACK 54) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Phần 3 • SGK Trang 38
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Let's chant • Nhịp điệu tài năng</span>
                <span className="text-2xl">🎵</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vỗ tay theo nhịp điệu bài chant vui nhộn, bấm vào từng câu để luyện nói đúng ngữ điệu rộn ràng.
              </p>
            </div>

            <button
              onClick={() => {
                const fullChant = chantVerses.map(v => v.lineEn).join('. ');
                speakWord(fullChant, speechRate);
                confetti({ particleCount: 35, spread: 50 });
                onAddStar(2);
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Chant Toàn Bộ Bài (Track 54)</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4 animate-bounce" />
                <span>Bấm vào từng câu để hát vang theo giai điệu</span>
              </span>
              <span className="text-xs text-purple-200 font-mono">BPM: 110 • Rộn rã</span>
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
                    <span className="text-[11px] font-mono text-purple-300">
                      Verse #{idx + 1}
                    </span>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-amber-300 font-bold">
                      {verse.highlight}
                    </span>
                  </div>
                  <div className="text-lg font-black text-white">{verse.lineEn}</div>
                  <div className="text-xs text-purple-200 font-medium">{verse.lineVi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: READ AND TICK (PASSAGE & CLUE FINDER) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Phần 4 • SGK Trang 39
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Read and tick (Đọc hiểu & tìm manh mối)</span>
                <span className="text-2xl">📖</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Đọc bức thư của Lucy giới thiệu về các bạn Linh, Ben và bản thân, sau đó đánh dấu tích xem ai biết làm gì.
              </p>
            </div>

            <button
              onClick={() => {
                speakWord(readingPassage, speechRate);
                sound.playClick();
              }}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bài Đọc</span>
            </button>
          </div>

          {/* Reading Box */}
          <div className="bg-amber-50/60 rounded-3xl p-6 border-2 border-amber-200 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                📜 Bức Thư Của Bạn Lucy (SGK Trang 39)
              </span>
              <span className="text-xs text-slate-500 italic">
                Bấm vào câu hỏi dưới để xem dòng chứa bằng chứng được tô vàng
              </span>
            </div>

            <div className="text-sm md:text-base leading-relaxed text-slate-800 font-medium space-y-2 bg-white p-5 rounded-2xl border border-amber-200 shadow-inner">
              <p>Hello, I am Lucy. I have many good friends.</p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('Linh')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                Linh can swim and ride a bike, but she can't ride a horse.
              </p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('Ben')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                Ben can play the guitar and roller skate, but he can't cook.
              </p>
              <p
                className={`transition-all rounded-lg px-2 py-1 ${
                  activeClue?.includes('Lucy') || activeClue?.includes('sing')
                    ? 'bg-amber-200 font-bold text-amber-950 scale-[1.01]'
                    : ''
                }`}
              >
                I can sing English songs and play the piano.
              </p>
              <p>We often play together on Sundays.</p>
              <p className="italic text-slate-500">What about you? What can you do?</p>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-3">
            <span className="text-xs font-black text-slate-700 block uppercase">
              Bảng kiểm tra thông tin tài năng:
            </span>

            <div className="space-y-2.5">
              {readingQuestions.map((q, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveClue(q.clue)}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-purple-300 transition-all flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-purple-700">
                      #{idx + 1} • {q.name}
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      Can {q.name} {q.action}?
                    </div>
                  </div>

                  {/* Choice Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newAns = [...readingAnswers];
                        newAns[idx] = true;
                        setReadingAnswers(newAns);
                        sound.playClick();
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1 ${
                        readingAnswers[idx] === true
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Yes, can</span>
                    </button>

                    <button
                      onClick={() => {
                        const newAns = [...readingAnswers];
                        newAns[idx] = false;
                        setReadingAnswers(newAns);
                        sound.playClick();
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1 ${
                        readingAnswers[idx] === false
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      <span>❌ No, can't</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setReadingSubmitted(true);
                const score = readingQuestions.filter(
                  (q, i) => readingAnswers[i] === q.can
                ).length;
                if (score === readingQuestions.length) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(5);
                } else {
                  sound.playClick();
                }
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Chấm Điểm Bài Đọc</span>
            </button>

            {readingSubmitted && (
              <span className="text-sm font-black text-purple-700">
                Đúng:{' '}
                {
                  readingQuestions.filter((q, i) => readingAnswers[i] === q.can)
                    .length
                }{' '}
                / {readingQuestions.length} câu
              </span>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LET'S WRITE (TALENT AUTHORING STUDIO) */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
              Phần 5 • SGK Trang 39
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Let's write • Phòng viết Thẻ Tài Năng</span>
              <span className="text-2xl">✍️</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự tay điền thông tin về khả năng của em và một người bạn thân. Thẻ bài viết sẽ tự động cập nhật trực quan!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-200">
              <span className="text-xs font-black text-purple-700 uppercase tracking-wider block">
                1. Thông tin tài năng của bản thân (I / My talents):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Tên của em:</label>
                  <input
                    type="text"
                    value={writerMyName}
                    onChange={e => setWriterMyName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Việc em chưa biết làm:</label>
                  <input
                    type="text"
                    value={writerMyCant}
                    onChange={e => setWriterMyCant(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-rose-700 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Việc em biết làm #1:</label>
                  <input
                    type="text"
                    value={writerMyCan1}
                    onChange={e => setWriterMyCan1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-emerald-700 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Việc em biết làm #2:</label>
                  <input
                    type="text"
                    value={writerMyCan2}
                    onChange={e => setWriterMyCan2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-emerald-700 bg-white"
                  />
                </div>
              </div>

              <span className="text-xs font-black text-purple-700 uppercase tracking-wider block pt-2">
                2. Thông tin tài năng bạn thân (My friend's talents):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Tên bạn thân:</label>
                  <input
                    type="text"
                    value={writerFriendName}
                    onChange={e => setWriterFriendName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Giới tính:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWriterFriendGender('he')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-black border ${
                        writerFriendGender === 'he'
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'bg-white text-slate-700'
                      }`}
                    >
                      👦 He (Nam)
                    </button>
                    <button
                      onClick={() => setWriterFriendGender('she')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-black border ${
                        writerFriendGender === 'she'
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-white text-slate-700'
                      }`}
                    >
                      👧 She (Nữ)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Việc bạn ấy biết làm:</label>
                  <input
                    type="text"
                    value={writerFriendCan}
                    onChange={e => setWriterFriendCan(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-emerald-700 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Việc bạn ấy chưa thể làm:</label>
                  <input
                    type="text"
                    value={writerFriendCant}
                    onChange={e => setWriterFriendCant(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-rose-700 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-1 rounded-3xl shadow-xl">
              <div className="bg-white rounded-[22px] p-6 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-xs font-black text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Thẻ Bài Viết Mẫu Hoàn Thiện</span>
                    </span>
                    <span className="text-xl">🌟</span>
                  </div>

                  <div className="space-y-3 text-sm md:text-base leading-relaxed text-slate-800">
                    <p>
                      Hello! My name is <strong className="text-purple-700 underline">{writerMyName || '...'}</strong>.
                    </p>
                    <p>
                      I can <strong className="text-emerald-700">{writerMyCan1 || '...'}</strong> and{' '}
                      <strong className="text-emerald-700">{writerMyCan2 || '...'}</strong>, but I can’t{' '}
                      <strong className="text-rose-600">{writerMyCant || '...'}</strong>.
                    </p>
                    <p>
                      My friend is <strong className="text-blue-700">{writerFriendName || '...'}</strong>.{' '}
                      <span className="capitalize">{writerFriendGender}</span> can{' '}
                      <strong className="text-emerald-700">{writerFriendCan || '...'}</strong>, but{' '}
                      {writerFriendGender} can’t{' '}
                      <strong className="text-rose-600">{writerFriendCant || '...'}</strong>.
                    </p>
                    <p className="text-xs text-slate-500 italic pt-1">
                      We practice together every weekend!
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <button
                    onClick={() => {
                      const sampleText = `Hello! My name is ${writerMyName}. I can ${writerMyCan1} and ${writerMyCan2}, but I can't ${writerMyCant}. My friend is ${writerFriendName}. ${writerFriendGender} can ${writerFriendCan}, but ${writerFriendGender} can't ${writerFriendCant}.`;
                      speakWord(sampleText, speechRate);
                      sound.playCorrect();
                      confetti({ particleCount: 40, spread: 60 });
                      onAddStar(3);
                    }}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Đọc Thẻ Bài Của Em</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: CLASS TALENT SHOW PROJECT */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">
                Phần 6 • SGK Trang 39
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Project: Class Talent Show (Hội diễn tài năng lớp em)</span>
                <span className="text-2xl">🎪</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khảo sát tài năng các thành viên trong lớp học, ghi danh vào bảng vàng Siêu Sao Tài Năng và cùng nhau cổ vũ bạn bè!
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

          {/* Add Friend to Talent Roster */}
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 flex flex-wrap items-center gap-3">
            <span className="text-xs font-black text-purple-900 uppercase">
              Thêm bạn vào Bảng Vàng:
            </span>
            <input
              type="text"
              placeholder="Tên bạn học (ví dụ: Bảo Trâm)..."
              value={newRosterName}
              onChange={e => setNewRosterName(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-xl text-xs font-bold bg-white text-slate-800 flex-1 min-w-[160px] focus:outline-purple-500"
            />
            <select
              value={newRosterTalent}
              onChange={e => setNewRosterTalent(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-xl text-xs font-bold bg-white text-slate-800 focus:outline-purple-500"
            >
              <option value="play the guitar 🎸">play the guitar 🎸</option>
              <option value="roller skate 🛼">roller skate 🛼</option>
              <option value="cook delicious soup 🍳">cook delicious soup 🍳</option>
              <option value="draw beautiful pictures 🎨">draw beautiful pictures 🎨</option>
              <option value="swim very fast 🏊">swim very fast 🏊</option>
              <option value="ride a bike safely 🚲">ride a bike safely 🚲</option>
              <option value="sing English songs 🎤">sing English songs 🎤</option>
            </select>
            <button
              onClick={handleAddTalentShowItem}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
            >
              Ghi Danh +
            </button>
          </div>

          {/* Roster Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {talentShowRoster.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50 hover:bg-white hover:border-purple-300 transition-all space-y-3 text-center group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  ⭐
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 block">{item.name}</span>
                  <span className="text-xs font-bold text-purple-600 block mt-0.5">
                    {item.talent}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 py-1 px-2.5 rounded-full inline-block border border-emerald-200">
                  ✨ Verified Talent!
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
