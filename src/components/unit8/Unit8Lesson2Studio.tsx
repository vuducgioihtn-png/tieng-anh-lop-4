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
  GraduationCap,
  Mic,
  Palette,
  Calculator,
  UserCheck
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit8Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit8Lesson2Studio: React.FC<Unit8Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Dream Career Connections in Lesson 2
  const careerConnections = [
    {
      id: 'english_teacher',
      subject: 'English',
      subjectVi: 'Tiếng Anh',
      job: 'an English teacher',
      jobVi: 'giáo viên dạy Tiếng Anh',
      article: 'an',
      icon: '🧑‍🏫',
      sentence: 'Why do you like English? - Because I want to be an English teacher.',
      reason: 'Dạy tiếng Anh cho các bạn nhỏ, giao lưu quốc tế và khám phá nền văn hóa thế giới.',
      tip: 'Vì "English" bắt đầu bằng nguyên âm E, ta dùng mạo từ "an": an English teacher.'
    },
    {
      id: 'singer',
      subject: 'music',
      subjectVi: 'Âm nhạc',
      job: 'a singer',
      jobVi: 'ca sĩ biểu diễn',
      article: 'a',
      icon: '🎤',
      sentence: 'Why do you like music? - Because I want to be a singer.',
      reason: 'Đứng trên sân khấu tỏa sáng, mang tiếng hát ngọt ngào và năng lượng tích cực đến mọi người.',
      tip: '"singer" bắt đầu bằng phụ âm S, ta dùng mạo từ "a": a singer.'
    },
    {
      id: 'painter',
      subject: 'art',
      subjectVi: 'Mĩ thuật',
      job: 'a painter',
      jobVi: 'họa sĩ vẽ tranh',
      article: 'a',
      icon: '🎨',
      sentence: 'Why do you like art? - Because I want to be a painter.',
      reason: 'Vẽ nên những bức tranh phong cảnh, chân dung đầy màu sắc và mở phòng triển lãm tranh nghệ thuật.',
      tip: '"painter" bắt đầu bằng phụ âm P, ta dùng mạo từ "a": a painter.'
    },
    {
      id: 'maths_teacher',
      subject: 'maths',
      subjectVi: 'Toán học',
      job: 'a maths teacher',
      jobVi: 'giáo viên dạy Toán',
      article: 'a',
      icon: '📐',
      sentence: 'Why do you like maths? - Because I want to be a maths teacher.',
      reason: 'Giúp học sinh giải các bài toán đố thông minh, rèn luyện tư duy logic và khoa học.',
      tip: '"maths teacher" bắt đầu bằng phụ âm M, ta dùng mạo từ "a": a maths teacher.'
    }
  ];

  // Activity 1: Dialogue (Track 81)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Mary hỏi Nam về môn học yêu thích',
      context: 'Mary và Nam ngồi trên ghế đá dưới gốc cây trường. Mary hỏi môn yêu thích của Nam.',
      badge: 'Track 81 - Part A',
      lines: [
        {
          speaker: 'Mary',
          avatar: '👧',
          en: 'What’s your favourite subject, Nam?',
          vi: 'Môn học yêu thích của bạn là gì hả Nam?',
          soundDesc: 'Mary vui vẻ hỏi bạn',
          focus: 'What’s your favourite subject...?'
        },
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'It’s English.',
          vi: 'Đó là môn Tiếng Anh.',
          soundDesc: 'Nam tự hào trả lời',
          focus: 'It’s English.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Mary hỏi lý do và Nam kể ước mơ nghề nghiệp',
      context: 'Mary tò mò hỏi lý do tại sao Nam thích Tiếng Anh. Nam hào hứng kể ước mơ làm thầy giáo.',
      badge: 'Track 81 - Part B',
      lines: [
        {
          speaker: 'Mary',
          avatar: '👧',
          en: 'Why do you like English?',
          vi: 'Tại sao bạn lại thích môn Tiếng Anh?',
          soundDesc: 'Mary hỏi lý do với từ Why',
          focus: 'Why do you like...?'
        },
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'Because I want to be an English teacher.',
          vi: 'Bởi vì mình muốn trở thành một giáo viên dạy tiếng Anh.',
          soundDesc: 'Nam mắt sáng lên nói về ước mơ',
          focus: 'Because I want to be...'
        }
      ]
    }
  };

  // Activity 2: Listen, point and say (Track 82)
  const [selectedCareerId, setSelectedCareerId] = useState<string>('english_teacher');

  // Activity 3: Let's talk
  const [talkReasonChoice, setTalkReasonChoice] = useState<string>('art');

  // Activity 4: Listen and number (Track 83)
  interface ListenNumberItem {
    id: number;
    jobName: string;
    jobTitleVi: string;
    audioText: string;
    speaker: string;
    correctOrder: number;
    userOrder: number | null;
    photoDesc: string;
    icon: string;
  }

  const [listenNumberQuiz, setListenNumberQuiz] = useState<ListenNumberItem[]>([
    {
      id: 1,
      jobName: 'a singer',
      jobTitleVi: 'Ca sĩ ôm đàn guitar hát',
      audioText: 'Why do you like music? - Because I want to be a singer.',
      speaker: '👦 Ben & Mary',
      correctOrder: 1,
      userOrder: null,
      photoDesc: 'Tranh A: Chàng trai cầm đàn guitar hát vào micro',
      icon: '🎸'
    },
    {
      id: 2,
      jobName: 'a painter',
      jobTitleVi: 'Nữ họa sĩ cầm bảng pha màu',
      audioText: 'Why do you like art? - Because I want to be a painter.',
      speaker: '👧 Linh & Nam',
      correctOrder: 2,
      userOrder: null,
      photoDesc: 'Tranh B: Cô gái mỉm cười vẽ tranh trong xưởng vẽ',
      icon: '🎨'
    },
    {
      id: 3,
      jobName: 'an English teacher',
      jobTitleVi: 'Cô giáo dạy tiếng Anh',
      audioText: 'Why do you like English? - Because I want to be an English teacher.',
      speaker: '👧 Mai & Phong',
      correctOrder: 3,
      userOrder: null,
      photoDesc: 'Tranh C: Cô giáo chỉ bảng từ vựng tiếng Anh',
      icon: '👩‍🏫'
    },
    {
      id: 4,
      jobName: 'a maths teacher',
      jobTitleVi: 'Thầy giáo dạy Toán',
      audioText: 'Why do you like maths? - Because I want to be a maths teacher.',
      speaker: '👦 Quân & Lucy',
      correctOrder: 4,
      userOrder: null,
      photoDesc: 'Tranh D: Thầy giáo vẽ hình học trên bảng đen',
      icon: '👨‍🏫'
    }
  ]);
  const [numberQuizChecked, setNumberQuizChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers2, setFillAnswers2] = useState<{ [key: string]: string }>({
    q1a: '',
    q1b: '',
    q2a: '',
    q2b: '',
    q2c: ''
  });
  const [fillChecked2, setFillChecked2] = useState<boolean>(false);

  // Activity 6: Sentence Making Game
  const [gameSubject, setGameSubject] = useState<string>('music');
  const [gameJob, setGameJob] = useState<string>('a singer');
  const [gameBuiltSentence, setGameBuiltSentence] = useState<string>('');

  const curCareer = careerConnections.find(c => c.id === selectedCareerId) || careerConnections[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              <span>Unit 8: My favourite subjects • Tiết 2 (Lesson 2)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-amber-100 hover:text-white"
                >
                  ⬅️ Về Tiết 1
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi Lý Do Yêu Thích & Ước Mơ Tương Lai</span>
              <span className="text-3xl">🌟</span>
            </h1>
            <p className="text-amber-100 text-sm md:text-base font-medium mt-1">
              Khám phá cấu trúc hỏi nguyên nhân: "Why do you like...?" — "Because I want to be a/an..." kết nối môn học với nghề nghiệp mơ ước!
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 58 - 59</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Cặp Hỏi - Đáp</span>
              <span className="text-sm font-black text-yellow-300">Why... / Because...</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Mạo Từ</span>
              <span className="text-sm font-black text-white">a singer / an English teacher</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-amber-200 block font-medium">Trò Chơi</span>
              <span className="text-sm font-black text-emerald-300">Sentence Making Game 🎲</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Bí Kíp Ngữ Pháp: Hỏi Lý Do (Why) & Trả Lời (Because I want to be...)
              </h2>
              <p className="text-xs text-slate-500">
                Hỏi nguyên nhân thích môn học và bày tỏ ước mơ trở thành ai trong tương lai.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                ❓ Câu Hỏi (Why do you like...?)
              </span>
              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                Why = Tại sao
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              Why do you like <span className="text-amber-700">[tên môn học]</span>?
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: <em>Why do you like English?</em> (Tại sao bạn thích môn Tiếng Anh?)
            </div>
            <div className="text-[11px] text-amber-700 bg-white/80 p-2 rounded-xl border border-amber-100">
              🧠 <strong>Mẹo nhớ:</strong> Hỏi "Why" luôn bắt đầu câu trả lời bằng <strong>"Because"</strong> (bởi vì)!
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-800 uppercase tracking-wide">
                💬 Câu Trả Lời (Because I want to be a/an...)
              </span>
              <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                want to be = muốn trở thành
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-indigo-700">Because I want to be</span> [a/an + nghề nghiệp].
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: <em>Because I want to be an English teacher.</em> / <em>Because I want to be a singer.</em>
            </div>
            <div className="text-[11px] text-indigo-700 bg-white/80 p-2 rounded-xl border border-indigo-100">
              ⭐ Lưu ý mạo từ: <strong>an</strong> English teacher / <strong>an</strong> IT teacher; <strong>a</strong> singer / <strong>a</strong> painter.
            </div>
          </div>
        </div>

        {showParentGuides && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs text-amber-900 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Cẩm Nang Đồng Hành Dành Cho Phụ Huynh:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Phát âm từ "Because":</strong> Đọc là /bɪˈkɒz/ (*bi-CÓZ*), trọng âm nhấn vào âm thứ 2 "cause".</li>
              <li><strong>Cụm từ "want to be":</strong> Đọc tự nhiên lướt nhẹ, mang nghĩa "muốn trở thành một nghề gì đó".</li>
              <li><strong>Khơi dậy ước mơ:</strong> Ba mẹ có thể kết hợp hỏi: <em>"Why do you like drawing? - Because I want to be a painter!"</em> giúp con hào hứng nuôi dưỡng ước mơ nghề nghiệp tương lai.</li>
            </ul>
          </div>
        )}
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 58 - 59) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 58 - Track 81' },
          { num: 2, label: '2. Listen, point & say', icon: '🧑‍🏫', desc: 'Trang 58 - Track 82' },
          { num: 3, label: '3. Let’s talk', icon: '🗣️', desc: 'Trang 58 - Ước mơ' },
          { num: 4, label: '4. Listen & number', icon: '✍️', desc: 'Trang 59 - Track 83' },
          { num: 5, label: '5. Look, complete & read', icon: '📝', desc: 'Trang 59 - Điền từ' },
          { num: 6, label: '6. Sentence Making Game', icon: '🎲', desc: 'Trang 59 - Trò chơi' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.num);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeSection === tab.num
                ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <div className="text-left">
              <div>{tab.label}</div>
              <div className={`text-[10px] ${activeSection === tab.num ? 'text-amber-200' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN & REPEAT (TRACK 81) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                Hoạt động 1 • Trang 58 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, listen and repeat • Mary hỏi Nam lý do thích Tiếng Anh
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('a');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'a'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh A (Môn Yêu Thích)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('b');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh B (Lý Do & Ước Mơ)
              </button>
            </div>
          </div>

          {/* Active Dialogue Scene */}
          {(() => {
            const scene = dialogueScenes[activeDialogueTab];
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                      {scene.badge}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{scene.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{scene.context}</p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      scene.lines.forEach((l, i) => {
                        setTimeout(() => {
                          setPlayingDialogueLine(i);
                          speakWord(l.en, speechRate);
                        }, i * 2800);
                      });
                      setTimeout(() => setPlayingDialogueLine(null), scene.lines.length * 2800 + 500);
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Nghe Cả Tình Huống</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {scene.lines.map((line, idx) => {
                    const isPlaying = playingDialogueLine === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPlaying
                            ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-300/30'
                            : 'bg-white border-slate-200 hover:border-amber-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl p-1 bg-slate-100 rounded-2xl shadow-xs">
                            {line.avatar}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900">
                                {line.speaker}
                              </span>
                              <span className="text-[11px] text-slate-400 italic">
                                {line.soundDesc}
                              </span>
                            </div>
                            <div className="text-base sm:text-lg font-black text-slate-900 mt-1">
                              {line.en}
                            </div>
                            <div className="text-xs font-medium text-amber-800 mt-0.5">
                              {line.vi}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              sound.playClick();
                              setPlayingDialogueLine(idx);
                              speakWord(line.en, speechRate * 0.75);
                              setTimeout(() => setPlayingDialogueLine(null), 2500);
                            }}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                          >
                            🐢 Chậm
                          </button>
                          <button
                            onClick={() => {
                              sound.playClick();
                              setPlayingDialogueLine(idx);
                              speakWord(line.en, speechRate);
                              onAddStar(1);
                              setTimeout(() => setPlayingDialogueLine(null), 2000);
                            }}
                            className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Nghe Chuẩn</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT & SAY (TRACK 82) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
              Hoạt động 2 • Trang 58 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen, point and say • Môn học & Nghề nghiệp tương lai
            </h3>
            <p className="text-xs text-slate-500">
              Bấm vào từng cặp môn học - nghề nghiệp để luyện hỏi lý do "Why do you like...?" và trả lời:
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerConnections.map(item => {
              const isSelected = selectedCareerId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCareerId(item.id);
                    speakWord(`Why do you like ${item.subject}? Because I want to be ${item.job}`, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-500/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[10px] font-black uppercase text-white bg-slate-900 px-2 py-0.5 rounded-full">
                        {item.subject}
                      </span>
                    </div>

                    <div>
                      <div className="text-base font-black text-slate-900 capitalize">
                        {item.job}
                      </div>
                      <div className="text-xs font-bold text-amber-700">
                        {item.jobVi}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Thích môn: <strong>{item.subjectVi}</strong>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-white/80 p-2 rounded-xl border border-slate-100">
                      {item.reason}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-700">
                      {isSelected ? '● Đang chọn' : 'Bấm chọn'}
                    </span>
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Live Dialogue Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                🌟 Thực Hành Mẫu Câu Phản Xạ:
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-xl font-bold text-slate-700 border border-slate-200 shadow-xs">
                Môn: {curCareer.subject} ➔ Ước mơ: {curCareer.job}
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Câu hỏi (Question):</span>
                  <span className="text-base font-black text-slate-900">
                    Why do you like <span className="text-amber-700">{curCareer.subject}</span>?
                  </span>
                  <span className="text-xs text-amber-700 block">Tại sao bạn thích môn {curCareer.subjectVi}?</span>
                </div>
                <button
                  onClick={() => speakWord(`Why do you like ${curCareer.subject}?`, speechRate)}
                  className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border-2 border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-600 block">Câu trả lời (Answer):</span>
                  <span className="text-base font-black text-amber-900">
                    Because I want to be <span className="underline decoration-amber-500 decoration-2">{curCareer.job}</span>.
                  </span>
                  <span className="text-xs text-slate-600 block">Vì tớ muốn trở thành một {curCareer.jobVi}.</span>
                </div>
                <button
                  onClick={() => {
                    speakWord(`Because I want to be ${curCareer.job}`, speechRate);
                    onAddStar(1);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Đọc Mẫu</span>
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs text-amber-900">
              💡 <strong>Lưu ý:</strong> {curCareer.tip}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
              Hoạt động 3 • Trang 58 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s talk • Hỏi đáp ước mơ cùng các bạn trong công viên
            </h3>
            <p className="text-xs text-slate-500">
              Chọn một môn học bên dưới để thực hành giải thích lý do tại sao em yêu thích:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'art', label: 'art ➔ a painter', icon: '🎨' },
              { id: 'music', label: 'music ➔ a singer', icon: '🎤' },
              { id: 'maths', label: 'maths ➔ a maths teacher', icon: '📐' },
              { id: 'English', label: 'English ➔ an English teacher', icon: '🧑‍🏫' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setTalkReasonChoice(item.id);
                }}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                  talkReasonChoice === item.id
                    ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-black text-slate-800">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Roleplay Dialogue Display */}
          {(() => {
            const item = careerConnections.find(c => c.subject.toLowerCase() === talkReasonChoice.toLowerCase()) || careerConnections[0];
            return (
              <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                    💬 Đoạn Đối Thoại Đang Luyện Tập:
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(`Why do you like ${item.subject}?`, speechRate);
                      setTimeout(() => {
                        speakWord(`Because I want to be ${item.job}.`, speechRate);
                      }, 2200);
                      onAddStar(2);
                    }}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-black flex items-center gap-1 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-900" />
                    <span>Nghe Toàn Bộ</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">Bạn hỏi:</span>
                      <div className="text-base font-black text-slate-900">
                        Why do you like {item.subject}?
                      </div>
                    </div>
                    <button
                      onClick={() => speakWord(`Why do you like ${item.subject}?`, speechRate)}
                      className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">Bạn đáp:</span>
                      <div className="text-base font-black text-amber-800">
                        Because I want to be <span className="underline">{item.job}</span>.
                      </div>
                    </div>
                    <button
                      onClick={() => speakWord(`Because I want to be ${item.job}`, speechRate)}
                      className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND NUMBER (TRACK 83) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                Hoạt động 4 • Trang 59 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and number • Nghe đoạn băng và đánh số thứ tự từ 1 đến 4
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setListenNumberQuiz(prev => prev.map(i => ({ ...i, userOrder: null })));
                setNumberQuizChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {listenNumberQuiz.map(item => {
              const isCorrect = item.userOrder === item.correctOrder;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-3xl border-2 transition-all space-y-3 flex flex-col justify-between ${
                    numberQuizChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(item.audioText, speechRate);
                        }}
                        className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    </div>

                    <div>
                      <div className="text-sm font-black text-slate-800 capitalize">
                        {item.jobName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.photoDesc}
                      </div>
                    </div>
                  </div>

                  {/* Number Selection: 1, 2, 3, 4 */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Thứ tự xuất hiện:
                    </span>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          disabled={numberQuizChecked}
                          onClick={() => {
                            sound.playClick();
                            setListenNumberQuiz(prev =>
                              prev.map(i => (i.id === item.id ? { ...i, userOrder: num } : i))
                            );
                          }}
                          className={`py-1.5 rounded-lg text-xs font-black transition-all border ${
                            item.userOrder === num
                              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    {numberQuizChecked && (
                      <div className={`text-[11px] p-1.5 rounded-lg font-bold text-center ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {isCorrect ? `✓ Đúng: số ${item.correctOrder}` : `✗ Đáp án: số ${item.correctOrder}`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setNumberQuizChecked(true);
                const correctCount = listenNumberQuiz.filter(i => i.userOrder === i.correctOrder).length;
                if (correctCount === 4) {
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(4);
                } else if (correctCount > 0) {
                  sound.playCorrect();
                  onAddStar(correctCount);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra Thứ Tự
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                Hoạt động 5 • Trang 59 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, complete and read • Quan sát tranh và hoàn thành bài đối thoại
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setFillAnswers2({ q1a: '', q1b: '', q2a: '', q2b: '', q2c: '' });
                setFillChecked2(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa Hết</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Item 1: art / painter */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-rose-800">
                1. Tranh 1: Triển lãm tranh Mĩ thuật & bạn nữ ước mơ làm họa sĩ 🎨
              </span>
              <div className="text-sm font-black text-slate-800">
                A: What's your favourite subject? ➔ B: It's art. I like it.
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A:</span>
                <input
                  type="text"
                  placeholder="từ hỏi..."
                  value={fillAnswers2.q1a}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q1a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-800 focus:outline-amber-600 w-28"
                />
                <span>do you like art?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: Because I want to be a</span>
                <input
                  type="text"
                  placeholder="tên nghề..."
                  value={fillAnswers2.q1b}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q1b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-800 focus:outline-amber-600 w-32"
                />
                <span>.</span>
                {fillChecked2 && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: Why / painter
                  </span>
                )}
              </div>
            </div>

            {/* Item 2: IT teacher & singer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-blue-800">
                2. Tranh 2: Bạn nam học vi tính (IT teacher) & bạn nữ hát (singer) 💻🎤
              </span>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A: I like IT. It's my favourite</span>
                <input
                  type="text"
                  placeholder="chữ còn thiếu..."
                  value={fillAnswers2.q2a}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q2a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-800 focus:outline-blue-600 w-32"
                />
                <span>.</span>
              </div>
              <div className="text-sm font-black text-slate-800">
                B: Why do you like it?
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A:</span>
                <input
                  type="text"
                  placeholder="từ bắt đầu..."
                  value={fillAnswers2.q2b}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q2b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-800 focus:outline-blue-600 w-32"
                />
                <span>I want to be an IT teacher. How about you?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: My favourite subject is</span>
                <input
                  type="text"
                  placeholder="tên môn..."
                  value={fillAnswers2.q2c}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q2c: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 w-32"
                />
                <span>. I want to be a singer.</span>
                {fillChecked2 && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: subject / Because / music
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setFillChecked2(true);
                sound.playCorrect();
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra & Nhận Sao
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: SENTENCE MAKING GAME ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
              Hoạt động 6 • Trang 59 SGK (Sentence making)
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s play: Sentence making • Trò chơi ghép câu lý do trước lớp
            </h3>
            <p className="text-xs text-slate-500">
              Cô giáo viết các môn học lên bảng: <em>music, maths, English, art</em>. Các bạn lần lượt ghép câu hoàn chỉnh:
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="text-xl">👩‍🏫</span>
                <span className="font-bold text-slate-200">Bảng Đen Lớp Học Của Cô Giáo</span>
              </span>
              <span className="text-amber-300 font-bold">Cú pháp: "I like [môn] because I want to be [nghề]"</span>
            </div>

            {/* Subject Selector on Blackboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { sub: 'music', job: 'a singer', label: 'music ➔ a singer 🎤' },
                { sub: 'maths', job: 'a maths teacher', label: 'maths ➔ a maths teacher 📐' },
                { sub: 'English', job: 'an English teacher', label: 'English ➔ an English teacher 🧑‍🏫' },
                { sub: 'art', job: 'a painter', label: 'art ➔ a painter 🎨' }
              ].map(opt => (
                <button
                  key={opt.sub}
                  onClick={() => {
                    sound.playClick();
                    setGameSubject(opt.sub);
                    setGameJob(opt.job);
                    const sent = `I like ${opt.sub} because I want to be ${opt.job}.`;
                    setGameBuiltSentence(sent);
                    speakWord(sent, speechRate);
                  }}
                  className={`p-3 rounded-2xl text-xs font-black transition-all border ${
                    gameSubject === opt.sub
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-[1.02]'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Live Student Speech Bubble */}
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-400 block">
                Học sinh giơ tay phát biểu:
              </span>
              <div className="text-lg font-black text-amber-300">
                "{gameBuiltSentence || `I like ${gameSubject} because I want to be ${gameJob}.`}"
              </div>
              <div className="text-xs text-slate-400">
                Nghĩa: <em>Tớ thích môn {gameSubject} bởi vì tớ muốn trở thành {gameJob}.</em>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(3);
                }}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hoàn Thành Ghép Câu & Nhận 3 Sao ⭐</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
