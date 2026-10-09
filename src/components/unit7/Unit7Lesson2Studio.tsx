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
  Calendar,
  Clock,
  Music,
  Palette,
  Compass,
  FileText
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit7Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit7Lesson2Studio: React.FC<Unit7Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Subjects & Days in Lesson 2
  const scheduleItems = [
    {
      id: 'art',
      name: 'art',
      vi: 'Môn Mĩ thuật',
      days: 'Mondays',
      daysVi: 'các ngày Thứ Hai',
      calendarIcon: '🎨',
      calendarBadge: '16 Monday',
      ipa: '/ɑːt/',
      reading: 'A-t (kéo dài)',
      color: 'bg-rose-50 border-rose-300 text-rose-800',
      badgeBg: 'bg-rose-600',
      sentence: 'When do you have art? - I have it on Mondays.',
      tip: 'Môn Mĩ thuật đọc âm /ɑː/ trầm sâu. Giới từ "on" luôn đi trước thứ trong tuần.'
    },
    {
      id: 'music',
      name: 'music',
      vi: 'Môn Âm nhạc',
      days: 'Wednesdays',
      daysVi: 'các ngày Thứ Tư',
      calendarIcon: '🎵',
      calendarBadge: '18 Wednesday',
      ipa: '/ˈmjuː.zɪk/',
      reading: 'MIU-zịch',
      color: 'bg-purple-50 border-purple-300 text-purple-800',
      badgeBg: 'bg-purple-600',
      sentence: 'When do you have music? - I have it on Wednesdays.',
      tip: 'Âm giữa là âm rung /z/, chữ cái "d" trong Wednesday bị câm (đọc là "WENZ-day").'
    },
    {
      id: 'history_geo',
      name: 'history and geography',
      vi: 'Môn Lịch sử và Địa lí',
      days: 'Tuesdays and Fridays',
      daysVi: 'các ngày Thứ Ba và Thứ Sáu',
      calendarIcon: '🏛️',
      calendarBadge: '17 Tue & 20 Fri',
      ipa: '/ˈhɪs.tər.i ænd dʒiˈɒɡ.rə.fi/',
      reading: 'HÍS-tơ-ri en ji-ÓG-rơ-fi',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      sentence: 'When do you have history and geography? - I have it on Tuesdays and Fridays.',
      tip: 'Tên môn học ghép hai phân môn: Lịch sử (history) và Địa lí (geography).'
    },
    {
      id: 'english_full',
      name: 'English',
      vi: 'Môn Tiếng Anh',
      days: 'Mondays, Tuesdays, Thursdays and Fridays',
      daysVi: 'Thứ Hai, Thứ Ba, Thứ Năm, Thứ Sáu',
      calendarIcon: '🇬🇧',
      calendarBadge: '16, 17, 19, 20',
      ipa: '/ˈɪŋ.ɡlɪʃ/',
      reading: 'ÍNH-glish',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      sentence: 'When do you have English? - I have it on Mondays, Tuesdays, Thursdays and Fridays.',
      tip: 'Học 4 buổi mỗi tuần, liệt kê nhiều thứ ngăn cách bởi dấu phẩy và từ "and" ở cuối.'
    }
  ];

  // Activity 1: Dialogue (Track 70)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Nam & Mary hỏi về môn học hôm nay',
      context: 'Nam và Mary gặp nhau tại sân trường trước giờ vào lớp.',
      badge: 'Track 70 - Part A',
      lines: [
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'What subjects do you have today?',
          vi: 'Hôm nay bạn có những môn học nào?',
          soundDesc: 'Nam hỏi thăm thời khóa biểu hôm nay',
          focus: 'What subjects do you have today?'
        },
        {
          speaker: 'Mary',
          avatar: '👧',
          en: 'I have Vietnamese and science.',
          vi: 'Mình có môn Tiếng Việt và Khoa học.',
          soundDesc: 'Mary vui vẻ kể tên 2 môn học',
          focus: 'I have Vietnamese and science.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Mary hỏi Nam lịch học môn Toán',
      context: 'Mary và Nam cùng đi dạo trên hành lang lớp học và hỏi về lịch học môn Toán.',
      badge: 'Track 70 - Part B',
      lines: [
        {
          speaker: 'Mary',
          avatar: '👧',
          en: 'When do you have maths?',
          vi: 'Khi nào thì bạn có môn Toán?',
          soundDesc: 'Mary hỏi về thứ trong tuần có môn Toán',
          focus: 'When do you have maths?'
        },
        {
          speaker: 'Nam',
          avatar: '👦',
          en: 'I have it on Mondays and Fridays.',
          vi: 'Mình có môn Toán vào các ngày Thứ Hai và Thứ Sáu.',
          soundDesc: 'Nam tươi cười trả lời cụ thể ngày học',
          focus: 'I have it on Mondays and Fridays.'
        }
      ]
    }
  };

  // Activity 2: Listen, point and say (Track 71)
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('art');

  // Activity 3: Interactive Timetable Matrix
  const weeklyTimetable = [
    { period: 1, mon: 'Vietnamese', tue: 'English', wed: 'science', thu: 'Vietnamese', fri: 'Vietnamese' },
    { period: 2, mon: 'maths', tue: 'music', wed: 'maths', thu: 'art', fri: 'English' },
    { period: 3, mon: 'science', tue: 'maths', wed: 'Vietnamese', thu: 'maths', fri: 'maths' },
    { period: 4, mon: 'English', tue: 'Vietnamese', wed: 'history and geography', thu: 'English', fri: 'history and geography' }
  ];
  const [selectedTimetableSubject, setSelectedTimetableSubject] = useState<string>('history and geography');

  // Activity 4: Listen and tick (Track 72)
  interface ListenTickItem {
    id: number;
    title: string;
    audioText: string;
    speaker: string;
    correctOption: 'a' | 'b';
    userOption: 'a' | 'b' | null;
    optionA: { label: string; tableDesc: string };
    optionB: { label: string; tableDesc: string };
    explanation: string;
  }

  const [listenTickList, setListenTickList] = useState<ListenTickItem[]>([
    {
      id: 1,
      title: 'Câu 1: Lịch học môn Âm Nhạc (Music)',
      audioText: 'When do you have music, Nam? - I have it on Wednesdays.',
      speaker: '👦 Nam & Mary',
      correctOption: 'b',
      userOption: null,
      optionA: { label: 'Bảng A: Tuesday (Thứ Ba)', tableDesc: 'Thứ Ba có môn music' },
      optionB: { label: 'Bảng B: Wednesday (Thứ Tư)', tableDesc: 'Thứ Tư có môn music' },
      explanation: 'Trong băng ghi âm Nam nói: "I have it on Wednesdays" (Thứ Tư) ➔ Chọn B.'
    },
    {
      id: 2,
      title: 'Câu 2: Lịch học môn Khoa Học (Science)',
      audioText: 'When do you have science? - I have it on Wednesdays and Fridays.',
      speaker: '👧 Mai & Phong',
      correctOption: 'b',
      userOption: null,
      optionA: { label: 'Bảng A: Wednesday & Thursday', tableDesc: 'Thứ Tư & Thứ Năm' },
      optionB: { label: 'Bảng B: Wednesday & Friday', tableDesc: 'Thứ Tư & Thứ Sáu' },
      explanation: 'Mai nói: "I have it on Wednesdays and Fridays" (Thứ Tư và Thứ Sáu) ➔ Chọn B.'
    }
  ]);
  const [tickQuizChecked, setTickQuizChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers2, setFillAnswers2] = useState<{ [key: string]: string }>({
    q1a: '',
    q1b: '',
    q2a: '',
    q2b: ''
  });
  const [fillChecked2, setFillChecked2] = useState<boolean>(false);

  // Activity 6: Let's sing (Track 73)
  const songLyrics = [
    { en: 'What subjects do you have today?', vi: 'Hôm nay bạn học những môn gì?' },
    { en: 'Vietnamese, maths and science.', vi: 'Tiếng Việt, Toán và Khoa học.' },
    { en: 'What subjects do you have today?', vi: 'Hôm nay bạn học những môn gì?' },
    { en: 'Vietnamese, science and maths.', vi: 'Tiếng Việt, Khoa học và Toán.' },
    { en: 'When do you have maths?', vi: 'Khi nào bạn có môn Toán?' },
    { en: 'I have maths every school day.', vi: 'Tớ có môn Toán vào mọi ngày đi học!' },
    { en: 'When do you have Vietnamese?', vi: 'Khi nào bạn có môn Tiếng Việt?' },
    { en: 'I have Vietnamese every school day.', vi: 'Tớ có môn Tiếng Việt vào mọi ngày đi học!' }
  ];
  const [activeSongLine, setActiveSongLine] = useState<number | null>(null);

  const curSched = scheduleItems.find(s => s.id === selectedScheduleId) || scheduleItems[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 7: Our timetables • Tiết 2 (Lesson 2)</span>
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
              {onSwitchToLesson3 && (
                <button
                  onClick={onSwitchToLesson3}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1"
                >
                  <span>Sang Tiết 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Hỏi Lịch Học Các Môn: "When do you have...?"</span>
              <span className="text-3xl">🗓️</span>
            </h1>
            <p className="text-purple-100 text-sm md:text-base font-medium mt-1">
              Luyện hỏi ngày học trong tuần: "When do you have maths / art / music...?" — "I have it on Mondays / Wednesdays..."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 52 - 53</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Mẫu Câu</span>
              <span className="text-sm font-black text-amber-300">When do you have...?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Giới Từ Cốt Lõi</span>
              <span className="text-sm font-black text-white">on + Thứ (có đuôi -s)</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-purple-200 block font-medium">Hoạt Động Vui</span>
              <span className="text-sm font-black text-yellow-300">Bài Hát Karaoke 🎤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Bí Kíp Ngữ Pháp: Hỏi Khi Nào Có Môn Học (When do you have...?)
              </h2>
              <p className="text-xs text-slate-500">
                Sử dụng từ để hỏi "When" (Khi nào) và giới từ "on" trước các thứ trong tuần.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-800 uppercase tracking-wide">
                ❓ Câu Hỏi (When do you have...?)
              </span>
              <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                When = Khi nào
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              When do you have <span className="text-purple-700">[tên môn học]</span>?
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: <em>When do you have maths?</em> (Khi nào bạn có môn Toán?)
            </div>
            <div className="text-[11px] text-purple-700 bg-white/80 p-2 rounded-xl border border-purple-100">
              🧠 <strong>Mẹo nhớ:</strong> Hỏi "What subjects" là hỏi môn gì; còn hỏi "When" là hỏi lịch ngày học!
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-800 uppercase tracking-wide">
                💬 Câu Trả Lời (I have it on...)
              </span>
              <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                on + ngày-s
              </span>
            </div>
            <div className="text-sm font-black text-slate-800">
              I have it <span className="text-indigo-700">on [Mondays / Wednesdays...]</span>.
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: <em>I have it on Mondays and Fridays.</em> (Vào Thứ Hai và Thứ Sáu)
            </div>
            <div className="text-[11px] text-indigo-700 bg-white/80 p-2 rounded-xl border border-indigo-100">
              ⭐ Chữ "it" thay thế cho môn học đã hỏi. Thứ có thêm <strong>-s</strong> vì lặp lại tuần nào cũng có!
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
              <li><strong>Giới từ "on":</strong> Luôn luôn dùng "on" trước các thứ: <em>on Monday, on Tuesday</em>. Không dùng "in" hay "at".</li>
              <li><strong>Cụm từ "every school day":</strong> Nghĩa là <em>mọi ngày đi học</em> (từ Thứ Hai đến Thứ Sáu), xuất hiện trong bài hát và bài đọc.</li>
              <li><strong>Môn học dài:</strong> <em>history and geography</em> có 5 âm tiết ở geography (/dʒiˈɒɡ.rə.fi/), ba mẹ khích lệ con đọc thong thả từng nhịp.</li>
            </ul>
          </div>
        )}
      </div>

      {/* ================= 6 HOẠT ĐỘNG CHUẨN SGK (PAGES 52 - 53) ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Look, listen & repeat', icon: '🎧', desc: 'Trang 52 - Track 70' },
          { num: 2, label: '2. Listen, point & say', icon: '📅', desc: 'Trang 52 - Track 71' },
          { num: 3, label: '3. Let’s talk', icon: '🗓️', desc: 'Trang 52 - Bảng TKB' },
          { num: 4, label: '4. Listen & tick', icon: '✍️', desc: 'Trang 53 - Track 72' },
          { num: 5, label: '5. Look, complete & read', icon: '📝', desc: 'Trang 53 - Lịch & môn' },
          { num: 6, label: '6. Let’s sing', icon: '🎤', desc: 'Trang 53 - Karaoke' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.num);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
              activeSection === tab.num
                ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <div className="text-left">
              <div>{tab.label}</div>
              <div className={`text-[10px] ${activeSection === tab.num ? 'text-purple-200' : 'text-slate-400'}`}>
                {tab.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN & REPEAT (TRACK 70) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                Hoạt động 1 • Trang 52 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, listen and repeat • Nam và Mary hỏi đáp thời khóa biểu
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
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh A (Môn Học Hôm Nay)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveDialogueTab('b');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tranh B (Lịch Học Môn Toán)
              </button>
            </div>
          </div>

          {/* Active Dialogue Scene */}
          {(() => {
            const scene = dialogueScenes[activeDialogueTab];
            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-purple-800 uppercase tracking-wide">
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
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
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
                            : 'bg-white border-slate-200 hover:border-purple-200'
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
                            <div className="text-xs font-medium text-purple-700 mt-0.5">
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
                            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
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

      {/* ================= SECTION 2: LISTEN, POINT & SAY (TRACK 71) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
              Hoạt động 2 • Trang 52 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Listen, point and say • Hỏi & đáp lịch học các môn
            </h3>
            <p className="text-xs text-slate-500">
              Bấm vào từng môn học bên dưới để nghe câu hỏi và câu trả lời tương ứng theo lịch trên tờ lịch:
            </p>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scheduleItems.map(item => {
              const isSelected = selectedScheduleId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedScheduleId(item.id);
                    speakWord(`When do you have ${item.name}? I have it on ${item.days}`, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-500/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.calendarIcon}</span>
                      <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                        {item.calendarBadge}
                      </span>
                    </div>

                    <div>
                      <div className="text-base font-black text-slate-900 capitalize">
                        {item.name}
                      </div>
                      <div className="text-xs font-bold text-purple-700">
                        {item.vi}
                      </div>
                      <div className="text-[11px] font-bold text-slate-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>on {item.days}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-slate-100">
                      <em>{item.daysVi}</em>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-700">
                      {isSelected ? '● Đang chọn' : 'Bấm nghe'}
                    </span>
                    <Volume2 className="w-4 h-4 text-purple-600" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Practice Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-800 uppercase tracking-wide">
                🗓️ Đoạn Hội Thoại Tương Tác:
              </span>
              <span className="text-xs bg-white px-2.5 py-1 rounded-xl font-bold text-slate-700 border border-slate-200 shadow-xs">
                Môn: {curSched.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Câu hỏi (Question):</span>
                  <span className="text-base font-black text-slate-900">
                    When do you have <span className="text-purple-700">{curSched.name}</span>?
                  </span>
                  <span className="text-xs text-purple-700 block">Khi nào bạn có môn {curSched.vi}?</span>
                </div>
                <button
                  onClick={() => speakWord(`When do you have ${curSched.name}?`, speechRate)}
                  className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border-2 border-purple-300 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-600 block">Câu trả lời (Answer):</span>
                  <span className="text-base font-black text-purple-900">
                    I have it on <span className="underline decoration-purple-500 decoration-2">{curSched.days}</span>.
                  </span>
                  <span className="text-xs text-slate-600 block">Tớ có môn này vào {curSched.daysVi}.</span>
                </div>
                <button
                  onClick={() => {
                    speakWord(`I have it on ${curSched.days}`, speechRate);
                    onAddStar(1);
                  }}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Đọc Mẫu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK (INTERACTIVE TIMETABLE) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
              Hoạt động 3 • Trang 52 SGK
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Let’s talk • Thời Khóa Biểu Tuần Học Toàn Diện
            </h3>
            <p className="text-xs text-slate-500">
              Bấm vào tên một môn học bên dưới bảng để tra cứu nhanh xem môn đó được học vào những thứ mấy trong tuần:
            </p>
          </div>

          {/* Subject Pills Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'maths', label: 'maths (Toán)', days: 'Mondays, Tuesdays, Wednesdays, Thursdays, Fridays (Mọi ngày)' },
              { id: 'Vietnamese', label: 'Vietnamese (Tiếng Việt)', days: 'Mondays, Tuesdays, Wednesdays, Thursdays, Fridays' },
              { id: 'English', label: 'English (Tiếng Anh)', days: 'Mondays, Tuesdays, Thursdays, Fridays' },
              { id: 'science', label: 'science (Khoa học)', days: 'Mondays and Wednesdays' },
              { id: 'art', label: 'art (Mĩ thuật)', days: 'Thursdays' },
              { id: 'music', label: 'music (Âm nhạc)', days: 'Tuesdays' },
              { id: 'history and geography', label: 'history and geography', days: 'Wednesdays and Fridays' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTimetableSubject(sub.id);
                  speakWord(`When do you have ${sub.id}? I have it on ${sub.days}`, speechRate);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedTimetableSubject === sub.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Full Visual Timetable Matrix */}
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-purple-600 text-white text-center font-black">
                  <th className="p-3 border-r border-purple-500 w-16">Tiết</th>
                  <th className="p-3 border-r border-purple-500">Monday (T2)</th>
                  <th className="p-3 border-r border-purple-500">Tuesday (T3)</th>
                  <th className="p-3 border-r border-purple-500">Wednesday (T4)</th>
                  <th className="p-3 border-r border-purple-500">Thursday (T5)</th>
                  <th className="p-3">Friday (T6)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {weeklyTimetable.map(row => (
                  <tr key={row.period} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-black text-center bg-slate-100 text-slate-700 border-r border-slate-200">
                      Tiết {row.period}
                    </td>
                    {['mon', 'tue', 'wed', 'thu', 'fri'].map(dayKey => {
                      const subjectName = (row as any)[dayKey];
                      const isHighlighted = subjectName.toLowerCase() === selectedTimetableSubject.toLowerCase();
                      return (
                        <td
                          key={dayKey}
                          onClick={() => {
                            sound.playClick();
                            setSelectedTimetableSubject(subjectName);
                            speakWord(subjectName, speechRate);
                          }}
                          className={`p-3 text-center border-r border-slate-200 font-bold cursor-pointer transition-all ${
                            isHighlighted
                              ? 'bg-amber-300 text-slate-900 font-black shadow-inner ring-2 ring-amber-400'
                              : 'text-slate-800 hover:bg-purple-50'
                          }`}
                        >
                          {subjectName}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Thực hành hỏi & đáp:</span>
              <div className="text-sm font-black text-purple-900">
                "When do you have {selectedTimetableSubject}?"
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                speakWord(`When do you have ${selectedTimetableSubject}?`, speechRate);
              }}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Mẫu</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND TICK (TRACK 72) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                Hoạt động 4 • Trang 53 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Listen and tick • Nghe đoạn băng và tích chọn bảng thời khóa biểu đúng
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setListenTickList(prev => prev.map(i => ({ ...i, userOption: null })));
                setTickQuizChecked(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại</span>
            </button>
          </div>

          <div className="space-y-4">
            {listenTickList.map(item => {
              const isCorrect = item.userOption === item.correctOption;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                    tickQuizChecked
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-sm text-slate-800">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.speaker}</div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(item.audioText, speechRate);
                      }}
                      className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe Đoạn Băng {item.id}</span>
                    </button>
                  </div>

                  {/* Options A & B */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      disabled={tickQuizChecked}
                      onClick={() => {
                        sound.playClick();
                        setListenTickList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userOption: 'a' } : i))
                        );
                      }}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        item.userOption === 'a'
                          ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-400/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-purple-700 block">Lựa chọn A:</span>
                        <div className="text-sm font-black text-slate-800">{item.optionA.label}</div>
                        <div className="text-xs text-slate-500">{item.optionA.tableDesc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.userOption === 'a' ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'}`}>
                        {item.userOption === 'a' && '✓'}
                      </div>
                    </button>

                    <button
                      disabled={tickQuizChecked}
                      onClick={() => {
                        sound.playClick();
                        setListenTickList(prev =>
                          prev.map(i => (i.id === item.id ? { ...i, userOption: 'b' } : i))
                        );
                      }}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        item.userOption === 'b'
                          ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-400/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-purple-700 block">Lựa chọn B:</span>
                        <div className="text-sm font-black text-slate-800">{item.optionB.label}</div>
                        <div className="text-xs text-slate-500">{item.optionB.tableDesc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.userOption === 'b' ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'}`}>
                        {item.userOption === 'b' && '✓'}
                      </div>
                    </button>
                  </div>

                  {tickQuizChecked && (
                    <div className={`text-xs p-2.5 rounded-xl font-medium ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setTickQuizChecked(true);
                const correctCount = listenTickList.filter(i => i.userOption === i.correctOption).length;
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
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra Đáp Án
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                Hoạt động 5 • Trang 53 SGK
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Look, complete and read • Quan sát tờ lịch và điền vào chỗ trống
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setFillAnswers2({ q1a: '', q1b: '', q2a: '', q2b: '' });
                setFillChecked2(false);
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa Hết</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Item 1: Tuesday 9, Tiếng Việt 4 & Toán 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-purple-800">
                1. Tranh 1: Tờ lịch Tuesday 9 • Sách Tiếng Việt 4 & Toán 4
              </span>
              <div className="text-sm font-black text-slate-800">
                A: What day is it today? ➔ B: It's Tuesday.
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A:</span>
                <input
                  type="text"
                  placeholder="từ hỏi..."
                  value={fillAnswers2.q1a}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q1a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 w-28"
                />
                <span>subjects do you have today?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I have</span>
                <input
                  type="text"
                  placeholder="2 môn học..."
                  value={fillAnswers2.q1b}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q1b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 min-w-[200px]"
                />
                <span>.</span>
                {fillChecked2 && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: What / Vietnamese and maths
                  </span>
                )}
              </div>
            </div>

            {/* Item 2: Thursday 11 & Friday 12 • Sách Khoa học 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-purple-800">
                2. Tranh 2: Tờ lịch Thu 11 & Fri 12 • Sách Khoa học 4
              </span>
              <div className="text-sm font-black text-slate-800">
                A: Do you have science today? ➔ B: No, I don't.
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>A: When do you have</span>
                <input
                  type="text"
                  placeholder="tên môn..."
                  value={fillAnswers2.q2a}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q2a: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 w-32"
                />
                <span>?</span>
              </div>
              <div className="text-sm font-black text-slate-800 flex flex-wrap items-center gap-2">
                <span>B: I have it on</span>
                <input
                  type="text"
                  placeholder="2 ngày học..."
                  value={fillAnswers2.q2b}
                  onChange={e => setFillAnswers2({ ...fillAnswers2, q2b: e.target.value })}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-sm font-bold text-purple-800 focus:outline-purple-600 min-w-[220px]"
                />
                <span>.</span>
                {fillChecked2 && (
                  <span className="text-xs font-bold text-emerald-600">
                    Đáp án: science / Thursdays and Fridays
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
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-sm shadow-md transition-all"
            >
              Kiểm Tra & Nhận Sao
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: LET'S SING (TRACK 73) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-black">
                Hoạt động 6 • Trang 53 SGK
              </span>
              <span className="text-xs text-slate-500 font-bold ml-2">Track 73 (Bài hát chính thức)</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Let’s sing • Bài hát: "What subjects do you have today?"
              </h3>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                songLyrics.forEach((line, idx) => {
                  setTimeout(() => {
                    setActiveSongLine(idx);
                    speakWord(line.en, speechRate * 0.9);
                  }, idx * 2200);
                });
                setTimeout(() => {
                  setActiveSongLine(null);
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 70 });
                  onAddStar(3);
                }, songLyrics.length * 2200 + 400);
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Music className="w-4 h-4" />
              <span>Hát Toàn Bộ Bài 🎤</span>
            </button>
          </div>

          {/* Karaoke Studio Lyrics */}
          <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-3 shadow-inner">
            <div className="text-center font-black text-base text-amber-300 pb-2 border-b border-slate-800">
              🎵 What subjects do you have today?
            </div>

            <div className="space-y-2 pt-2">
              {songLyrics.map((line, idx) => {
                const isActive = activeSongLine === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveSongLine(idx);
                      speakWord(line.en, speechRate * 0.85);
                      setTimeout(() => setActiveSongLine(null), 2200);
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-black shadow-lg scale-[1.02]'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm sm:text-base font-bold tracking-wide">
                        {line.en}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                        {line.vi}
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
