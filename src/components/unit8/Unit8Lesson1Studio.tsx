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
  Palette,
  Music,
  Activity,
  Laptop,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit8Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit8Lesson1Studio: React.FC<Unit8Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Favourite Subjects in Lesson 1
  const favouriteSubjects = [
    {
      id: 'art',
      name: 'art',
      fullName: 'Art',
      bookTitle: 'Mĩ thuật 4',
      vi: 'Môn Mĩ thuật',
      action: 'drawing & painting (vẽ tranh)',
      ipa: '/ɑːt/',
      reading: 'A-t (kéo dài)',
      color: 'bg-rose-50 border-rose-300 text-rose-800',
      badgeBg: 'bg-rose-600',
      icon: '🎨',
      desc: 'Thỏa sức vẽ tranh, pha màu, sáng tạo các bức họa thiên nhiên và cá vàng rực rỡ.',
      tip: 'Chữ cái "r" cong lưỡi nhẹ, âm đuôi /t/ bật dứt khoát.'
    },
    {
      id: 'music',
      name: 'music',
      fullName: 'Music',
      bookTitle: 'Âm nhạc 4',
      vi: 'Môn Âm nhạc',
      action: 'singing & dancing (hát ca)',
      ipa: '/ˈmjuː.zɪk/',
      reading: 'MIU-zịch',
      color: 'bg-purple-50 border-purple-300 text-purple-800',
      badgeBg: 'bg-purple-600',
      icon: '🎵',
      desc: 'Hát những giai điệu vui tươi, chơi đàn và thưởng thức các nốt nhạc du dương.',
      tip: 'Âm giữa là âm rung /z/, âm đuôi /k/ bật gọn ở vòm họng.'
    },
    {
      id: 'pe',
      name: 'PE',
      fullName: 'Physical Education (PE)',
      bookTitle: 'Giáo dục thể chất 4',
      vi: 'Môn Giáo dục thể chất (Thể dục)',
      action: 'running & exercising (chạy bộ & tập thể thao)',
      ipa: '/ˌpiː ˈiː/',
      reading: 'PI - I',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      icon: '🏃',
      desc: 'Rèn luyện sức khỏe, tập thể dục buổi sáng, chạy bền và chơi bóng thể thao năng động.',
      tip: 'Viết tắt từ Physical Education, đọc to rõ 2 chữ cái: P /piː/ và E /iː/.'
    },
    {
      id: 'it',
      name: 'IT',
      fullName: 'Information Technology (IT)',
      bookTitle: 'Tin học 4',
      vi: 'Môn Tin học',
      action: 'learning computers (học máy tính & gõ phím)',
      ipa: '/ˌaɪ ˈtiː/',
      reading: 'AI - TI',
      color: 'bg-blue-50 border-blue-300 text-blue-800',
      badgeBg: 'bg-blue-600',
      icon: '💻',
      desc: 'Khám phá máy vi tính, học gõ phím 10 ngón, vẽ hình khối và lập trình cơ bản.',
      tip: 'Viết tắt từ Information Technology, đọc từng chữ cái: I /aɪ/ và T /tiː/.'
    }
  ];

  // Activity 1: Dialogue (Track 77)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Ben hỏi Linh về các môn học hôm nay',
      context: 'Ben và Linh gặp nhau ở sân trường trước cổng. Ben chào và hỏi thời khóa biểu hôm nay của Linh.',
      badge: 'Track 77 - Part A',
      lines: [
        {
          speaker: 'Ben',
          avatar: '👦',
          en: 'Hi, Linh. What subjects do you have today?',
          vi: 'Chào Linh. Hôm nay bạn có những môn học nào?',
          soundDesc: 'Ben tươi cười vẫy tay chào hỏi',
          focus: 'What subjects do you have today?'
        },
        {
          speaker: 'Linh',
          avatar: '👧',
          en: 'I have English, science and maths.',
          vi: 'Mình có môn Tiếng Anh, Khoa học và Toán.',
          soundDesc: 'Linh xòe ngón tay đếm 3 môn học',
          focus: 'I have English, science and maths.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Ben và Linh nói về môn học yêu thích',
      context: 'Ben và Linh ngồi trên băng ghế đá sân trường. Ben nói về môn vẽ và hỏi môn yêu thích của Linh.',
      badge: 'Track 77 - Part B',
      lines: [
        {
          speaker: 'Ben',
          avatar: '👦',
          en: 'I like art. What’s your favourite subject?',
          vi: 'Tớ thích môn Mĩ thuật. Môn học yêu thích của bạn là gì?',
          soundDesc: 'Ben chia sẻ sở thích và hỏi tiếp Linh',
          focus: 'What’s your favourite subject?'
        },
        {
          speaker: 'Linh',
          avatar: '👧',
          en: 'It’s PE.',
          vi: 'Đó là môn Thể dục.',
          soundDesc: 'Linh giơ ngón tay cái hào hứng trả lời',
          focus: 'It’s PE.'
        }
      ]
    }
  };

  // Activity 2: Listen, point and say (Track 78)
  const [selectedFavId, setSelectedFavId] = useState<string>('art');

  // Activity 3: Let's talk
  const [talkChoice, setTalkChoice] = useState<string>('IT');

  // Activity 4: Listen and tick or cross (Track 79)
  interface ListenTickCrossItem {
    id: number;
    subjectName: string;
    bookTitle: string;
    audioText: string;
    speaker: string;
    correctAnswer: 'tick' | 'cross';
    userAnswer: 'tick' | 'cross' | null;
    icon: string;
    desc: string;
  }

  const [tickCrossList, setTickCrossList] = useState<ListenTickCrossItem[]>([
    {
      id: 1,
      subjectName: 'IT',
      bookTitle: 'Sách Tin học 4',
      audioText: 'What is your favourite subject, Nam? - It is IT. I like computers.',
      speaker: '👦 Nam & Mary',
      correctAnswer: 'tick',
      userAnswer: null,
      icon: '💻',
      desc: 'Hình 1: Nam thích môn Tin học (IT) ➔ ĐÚNG (Tick ✓)'
    },
    {
      id: 2,
      subjectName: 'PE',
      bookTitle: 'Sách Giáo dục thể chất 4',
      audioText: 'What is your favourite subject, Mai? - It is art. I like painting.',
      speaker: '👧 Mai & Phong',
      correctAnswer: 'cross',
      userAnswer: null,
      icon: '🏃',
      desc: 'Hình 2: Tranh vẽ Thể dục (PE) nhưng Mai bảo thích Art ➔ SAI (Cross ✗)'
    },
    {
      id: 3,
      subjectName: 'music',
      bookTitle: 'Sách Âm nhạc 4',
      audioText: 'What is your favourite subject, Lucy? - It is music. I love singing.',
      speaker: '👧 Lucy & Ben',
      correctAnswer: 'tick',
      userAnswer: null,
      icon: '🎵',
      desc: 'Hình 3: Lucy thích môn Âm nhạc (music) ➔ ĐÚNG (Tick ✓)'
    },
    {
      id: 4,
      subjectName: 'art',
      bookTitle: 'Sách Mĩ thuật 4',
      audioText: 'What is your favourite subject, Bill? - It is PE. I love running.',
      speaker: '👦 Bill & Linh',
      correctAnswer: 'cross',
      userAnswer: null,
      icon: '🎨',
      desc: 'Hình 4: Tranh vẽ Mĩ thuật (art) nhưng Bill bảo thích PE ➔ SAI (Cross ✗)'
    }
  ]);
  const [tickCrossChecked, setTickCrossChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2a: '',
    q2b: '',
    q3: '',
    q4a: '',
    q4b: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Song "My favourite subject" (Track 80)
  const songVerses = [
    { action: 'I like drawing.', subject: 'My favourite subject is art.', icon: '🎨', color: 'text-rose-600' },
    { action: 'I like singing.', subject: 'My favourite subject is music.', icon: '🎵', color: 'text-purple-600' },
    { action: 'I like running.', subject: 'My favourite subject is PE.', icon: '🏃', color: 'text-amber-600' },
    { action: 'I like computers.', subject: 'My favourite subject is IT.', icon: '💻', color: 'text-blue-600' }
  ];
  const [activeSongVerse, setActiveSongVerse] = useState<number | null>(null);

  const curSub = favouriteSubjects.find(s => s.id === selectedFavId) || favouriteSubjects[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 8: My favourite subjects • Tiết 1 (Lesson 1)</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold transition-all text-rose-100 hover:text-white"
                >
                  Sang Tiết 3
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi & Nói Về Môn Học Yêu Thích</span>
              <span className="text-3xl">❤️</span>
            </h1>
            <p className="text-rose-100 text-sm md:text-base font-medium mt-1">
              Khám phá các môn học hào hứng: art, music, PE, IT và cấu trúc hỏi sở thích: "What’s your favourite subject?" — "It’s..."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 56 - 57</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Mẫu Câu</span>
              <span className="text-sm font-black text-amber-300">What’s your favourite subject?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Từ Vựng Tiết 1</span>
              <span className="text-sm font-black text-white">art, music, PE, IT</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-rose-200 block font-medium">Bài Hát Vui</span>
              <span className="text-sm font-black text-yellow-300">My favourite subject 🎵</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Bí Kíp Ngữ Pháp: Hỏi Môn Học Yêu Thích Của Bạn
              </h2>
              <p className="text-xs text-slate-500">
                Từ "favourite" nghĩa là "yêu thích nhất", kết hợp cùng "subject" để hỏi sở thích học tập.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-800 uppercase tracking-wide">
                ❓ Câu Hỏi (What's your favourite subject?)
              </span>
              <span className="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                What's = What is
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              What’s your <span className="text-rose-700">favourite subject</span>?
            </div>
            <div className="text-xs text-slate-600">
              Nghĩa: <em>Môn học yêu thích nhất của bạn là gì?</em>
            </div>
            <div className="text-[11px] text-rose-700 bg-white/80 p-2 rounded-xl border border-rose-100">
              🧠 <strong>Mẹo phát âm:</strong> Từ "favourite" đọc là /ˈfeɪ.vər.ɪt/ (*PHÂY-vơ-rịt*), nhấn âm đầu "fai/phây".
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-800 uppercase tracking-wide">
                💬 Câu Trả Lời (It's [tên môn])
              </span>
              <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                It's + môn học
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-indigo-700">It’s</span> [art / music / PE / IT].
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: <em>It’s art.</em> (Đó là môn Mĩ thuật.) / <em>It’s English.</em> (Đó là môn Tiếng Anh.)
            </div>
            <div className="text-[11px] text-indigo-700 bg-white/80 p-2 rounded-xl border border-indigo-100">
              ⭐ Ngoài ra, con cũng có thể nói: <em>"My favourite subject is PE"</em> (chuẩn đầy đủ)!
            </div>
          </div>
        </div>

        {showParentGuides && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs text-amber-900 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Ghi Chú Trọng Tâm Dành Cho Phụ Huynh:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Từ viết tắt PE và IT:</strong> Luôn viết hoa cả 2 chữ cái. PE là *Physical Education* (thể chất), IT là *Information Technology* (công nghệ thông tin).</li>
              <li><strong>Âm đuôi "It's":</strong> Nhắc con xì nhẹ âm /s/ ở chữ "It’s" (viết tắt của It is), không đọc thành "Ít" cụt lủn.</li>
              <li><strong>Trò chuyện gia đình:</strong> Ba mẹ hỏi con: <em>"What’s your favourite subject at school?"</em> để lắng nghe con hào hứng chia sẻ về môn học con say mê.</li>
            </ul>
          </div>
        )}
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 56 - 57) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 56 - Track 77' },
          { num: 2, label: '2. Listen, point & say', icon: '🎨', desc: 'Trang 56 - Track 78' },
          { num: 3, label: '3. Let’s talk', icon: '🗣️', desc: 'Trang 56 - Hỏi đáp' },
          { num: 4, label: '4. Listen & tick / cross', icon: '✍️', desc: 'Trang 57 - Track 79' },
          { num: 5, label: '5. Look, complete & read', icon: '📝', desc: 'Trang 57 - Điền từ' },
          { num: 6, label: '6. Let’s sing', icon: '🎵', desc: 'Trang 57 - Track 80' }
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

      {/* ================= SECTION 1: LOOK, LISTEN & REPEAT (TRACK 77) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 1 • Trang 56 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, listen and repeat • Ben và Linh trò chuyện về môn học yêu thích
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
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh A (Hôm Nay Học Gì)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('b');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh B (Môn Thích Nhất)
              </button>
            </div>
          </div>

          {/* Active Dialogue Scene */}
          {(() => {
            const scene = dialogueScenes[activeDialogueTab];
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-rose-800 uppercase tracking-wide">
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
                        }, i * 2600);
                      });
                      setTimeout(() => setPlayingDialogueLine(null), scene.lines.length * 2600 + 500);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
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
                            : 'bg-white border-slate-200 hover:border-rose-200'
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
                            <div className="text-xs font-medium text-rose-700 mt-0.5">
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
                            className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
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

      {/* ================= SECTION 2: LISTEN, POINT & SAY (TRACK 78) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
              Hoạt động 2 • Trang 56 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen, point and say • 4 Môn học yêu thích đầy hào hứng
            </h3>
            <p className="text-xs text-slate-500">
              Bấm vào từng môn học bên dưới để nghe câu hỏi và câu trả lời tương ứng:
            </p>
          </div>

          {/* 4 Subject Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favouriteSubjects.map(sub => {
              const isSelected = selectedFavId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFavId(sub.id);
                    speakWord(`What's your favourite subject? It's ${sub.name}`, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-rose-600 bg-rose-50 shadow-md ring-2 ring-rose-500/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{sub.icon}</span>
                      <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-full ${sub.badgeBg}`}>
                        {sub.bookTitle}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg font-black text-slate-900">
                        {sub.name}
                      </div>
                      <div className="text-xs font-bold text-rose-700">
                        {sub.vi}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {sub.ipa} • <span className="font-sans text-amber-700 font-bold">{sub.reading}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-100">
                      <strong>Hoạt động:</strong> {sub.action}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-700">
                      {isSelected ? '● Đang chọn' : 'Bấm chọn'}
                    </span>
                    <Volume2 className="w-4 h-4 text-rose-600" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Live Practice Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-indigo-50 border-2 border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-800 uppercase tracking-wide">
                🗣️ Thực Hành Mẫu Câu Tương Tác:
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-xl font-bold text-slate-700 border border-slate-200 shadow-xs">
                Môn: {curSub.name} ({curSub.vi})
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Câu hỏi (Question):</span>
                  <span className="text-base font-black text-slate-900">
                    What’s your favourite subject?
                  </span>
                  <span className="text-xs text-rose-700 block">Môn học yêu thích nhất của bạn là gì?</span>
                </div>
                <button
                  onClick={() => speakWord('What’s your favourite subject?', speechRate)}
                  className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border-2 border-rose-300 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-600 block">Câu trả lời (Answer):</span>
                  <span className="text-base font-black text-rose-900">
                    It’s <span className="underline decoration-rose-500 decoration-2">{curSub.name}</span>.
                  </span>
                  <span className="text-xs text-slate-600 block">Đó là môn {curSub.vi}.</span>
                </div>
                <button
                  onClick={() => {
                    speakWord(`It’s ${curSub.name}`, speechRate);
                    onAddStar(1);
                  }}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Đọc Mẫu</span>
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span><strong>Mẹo phát âm:</strong> {curSub.tip}</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
              Hoạt động 3 • Trang 56 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s talk • Luyện nói phản xạ: Chọn sách trên bàn học
            </h3>
            <p className="text-xs text-slate-500">
              Chọn một cuốn sách môn học mà em thích nhất trên bàn để thực hành đối thoại:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {favouriteSubjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  sound.playClick();
                  setTalkChoice(sub.name);
                }}
                className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                  talkChoice === sub.name
                    ? 'border-rose-600 bg-rose-50 shadow-md ring-2 ring-rose-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <span className="text-4xl">{sub.icon}</span>
                <span className="text-sm font-black text-slate-800">{sub.bookTitle}</span>
                <span className="text-xs font-bold text-rose-600">({sub.name})</span>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                💬 Đối Thoại Mẫu:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord('What’s your favourite subject?', speechRate);
                  setTimeout(() => speakWord(`It’s ${talkChoice}.`, speechRate), 2200);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-black flex items-center gap-1 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-slate-900" />
                <span>Nghe Mẫu Cả Đoạn</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Bạn nam hỏi:</span>
                  <div className="text-base font-black text-slate-900">
                    What’s your favourite subject?
                  </div>
                </div>
                <button
                  onClick={() => speakWord('What’s your favourite subject?', speechRate)}
                  className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Bạn nữ đáp:</span>
                  <div className="text-base font-black text-rose-700">
                    It’s <span className="underline">{talkChoice}</span>.
                  </div>
                </div>
                <button
                  onClick={() => speakWord(`It’s ${talkChoice}`, speechRate)}
                  className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND TICK OR CROSS (TRACK 79) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 4 • Trang 57 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 79 (Nghe & Chọn ✓ hoặc ✗)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and tick or cross • Nghe và tích dấu ✓ hoặc đánh dấu ✗
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setTickCrossList(prev => prev.map(i => ({ ...i, userAnswer: null })));
                setTickCrossChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tickCrossList.map(item => {
              const isCorrect = item.userAnswer === item.correctAnswer;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                    tickCrossChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                        {item.id}
                      </span>
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-black text-sm text-slate-800">{item.bookTitle}</div>
                        <div className="text-xs text-slate-500">{item.speaker}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(item.audioText, speechRate);
                      }}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Câu {item.id}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      disabled={tickCrossChecked}
                      onClick={() => {
                        sound.playClick();
                        setTickCrossList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userAnswer: 'tick' } : i))
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all border ${
                        item.userAnswer === 'tick'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 border-slate-200'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Tick (✓)</span>
                    </button>

                    <button
                      disabled={tickCrossChecked}
                      onClick={() => {
                        sound.playClick();
                        setTickCrossList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userAnswer: 'cross' } : i))
                        );
                      }}
                      className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all border ${
                        item.userAnswer === 'cross'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-rose-50 border-slate-200'
                      }`}
                    >
                      <span>✗</span>
                      <span>Cross (✗)</span>
                    </button>
                  </div>

                  {tickCrossChecked && (
                    <div className={`text-xs p-2 rounded-xl font-medium ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setTickCrossChecked(true);
                const correctCount = tickCrossList.filter(i => i.userAnswer === i.correctAnswer).length;
                if (correctCount === 4) {
                  sound.playVictory();
                  confetti({ particleCount: 60, spread: 70 });
                  onAddStar(4);
                } else if (correctCount > 0) {
                  sound.playCorrect();
                  onAddStar(correctCount);
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

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 5 • Trang 57 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, complete and read • Quan sát hành động và điền vào chỗ trống
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setFillAnswers({ q1: '', q2a: '', q2b: '', q3: '', q4a: '', q4b: '' });
                setFillChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa Hết</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Item 1: music */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-purple-800">
                1. Tranh 1: Bạn nữ đang đứng hát trước giá nhạc 🎵
              </span>
              <div className="text-sm font-black text-slate-800">
                A: What's your favourite subject?
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: It's</span>
                <input
                  type="text"
                  placeholder="điền môn học..."
                  value={fillAnswers.q1}
                  onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 w-36"
                />
                <span>.</span>
                {fillChecked && (
                  <span className={`text-xs font-bold ${fillAnswers.q1.trim().toLowerCase() === 'music' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {fillAnswers.q1.trim().toLowerCase() === 'music' ? '✓ Chính xác (music)' : '✗ Đáp án: music'}
                  </span>
                )}
              </div>
            </div>

            {/* Item 2: art */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-rose-800">
                2. Tranh 2: Bạn nữ đang vẽ tranh vào sổ vẽ 🎨
              </span>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A:</span>
                <input
                  type="text"
                  placeholder="từ hỏi..."
                  value={fillAnswers.q2a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-rose-800 focus:outline-rose-600 w-28"
                />
                <span>your favourite subject?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: It's</span>
                <input
                  type="text"
                  placeholder="điền môn..."
                  value={fillAnswers.q2b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-rose-800 focus:outline-rose-600 w-32"
                />
                <span>.</span>
                {fillChecked && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: What's / art
                  </span>
                )}
              </div>
            </div>

            {/* Item 3: IT */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-blue-800">
                3. Tranh 3: Bạn nam đang gõ bàn phím vi tính 💻
              </span>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A: What's your favourite</span>
                <input
                  type="text"
                  placeholder="chữ còn thiếu..."
                  value={fillAnswers.q3}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-blue-800 focus:outline-blue-600 w-32"
                />
                <span>?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: It's IT.</span>
                {fillChecked && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: subject
                  </span>
                )}
              </div>
            </div>

            {/* Item 4: PE */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-amber-800">
                4. Tranh 4: Hai bạn nam đang khởi động tập thể dục trên đường chạy 🏃
              </span>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A: What's your</span>
                <input
                  type="text"
                  placeholder="2 từ..."
                  value={fillAnswers.q4a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-800 focus:outline-amber-600 min-w-[180px]"
                />
                <span>?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: It's</span>
                <input
                  type="text"
                  placeholder="tên môn..."
                  value={fillAnswers.q4b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-amber-800 focus:outline-amber-600 w-28"
                />
                <span>.</span>
                {fillChecked && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: favourite subject / PE
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setFillChecked(true);
                sound.playCorrect();
                onAddStar(3);
                confetti({ particleCount: 40, spread: 60 });
              }}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra & Nhận Sao
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: LET'S SING (TRACK 80) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                Hoạt động 6 • Trang 57 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 80 (Bài hát SGK)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Let’s sing • Bài hát: "My favourite subject"
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                songVerses.forEach((verse, idx) => {
                  setTimeout(() => {
                    setActiveSongVerse(idx);
                    speakWord(`${verse.action} ${verse.subject}`, speechRate * 0.9);
                  }, idx * 2800);
                });
                setTimeout(() => {
                  setActiveSongVerse(null);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 70 });
                  onAddStar(3);
                }, songVerses.length * 2800 + 400);
              }}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Music className="w-4 h-4" />
              <span>Hát Toàn Bộ Bài 🎤</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {songVerses.map((verse, idx) => {
              const isActive = activeSongVerse === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveSongVerse(idx);
                    speakWord(`${verse.action} ${verse.subject}`, speechRate * 0.9);
                    setTimeout(() => setActiveSongVerse(null), 2600);
                  }}
                  className={`p-5 rounded-3xl cursor-pointer transition-all border-2 flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-400 border-amber-500 text-slate-950 font-black shadow-lg scale-[1.02]'
                      : 'bg-slate-50 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-3xl block">{verse.icon}</span>
                    <div className="text-base font-black">{verse.action}</div>
                    <div className={`text-sm font-bold ${isActive ? 'text-slate-900' : verse.color}`}>
                      {verse.subject}
                    </div>
                  </div>
                  <Volume2 className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
