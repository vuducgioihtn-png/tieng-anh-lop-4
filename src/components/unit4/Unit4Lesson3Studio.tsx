import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Music,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  HelpCircle,
  Mail,
  Edit3,
  Copy,
  Cake,
  Gift,
  ArrowRight,
  Smile,
  Flame
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit4Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit4Lesson3Studio: React.FC<Unit4Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);
  const [showPhoneticDetails, setShowPhoneticDetails] = useState<boolean>(true);
  const [showFullHandbook, setShowFullHandbook] = useState<boolean>(false);

  // Activity 2: Listen and circle (Track 44)
  // 1: "I want some jam." -> a
  // 2: "There is some water on the table." -> b
  const [act2Answers, setAct2Answers] = useState<{ [q: number]: string | null }>({
    1: null,
    2: null
  });
  const [act2Checked, setAct2Checked] = useState<boolean>(false);

  const act2Questions = [
    {
      q: 1,
      audioText: 'I want some jam.',
      correct: 'a',
      options: [
        { key: 'a', word: 'jam', ipa: '/dʒæm/', icon: '🍓' },
        { key: 'b', word: 'water', ipa: '/ˈwɔː.tər/', icon: '💧' },
        { key: 'c', word: 'juice', ipa: '/dʒuːs/', icon: '🧃' }
      ]
    },
    {
      q: 2,
      audioText: 'There is some water on the table.',
      correct: 'b',
      options: [
        { key: 'a', word: 'juice', ipa: '/dʒuːs/', icon: '🧃' },
        { key: 'b', word: 'water', ipa: '/ˈwɔː.tər/', icon: '💧' },
        { key: 'c', word: 'jam', ipa: '/dʒæm/', icon: '🍓' }
      ]
    }
  ];

  const handleCheckAct2 = () => {
    sound.playClick();
    setAct2Checked(true);
    if (act2Answers[1] === 'a' && act2Answers[2] === 'b') {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 3: Let's chant (Track 45)
  const [activeChantLine, setActiveChantLine] = useState<number | null>(null);
  const [isChanting, setIsChanting] = useState<boolean>(false);

  const chantLines = [
    { text: 'Jam, jam.', vi: 'Mứt, mứt thơm ngon.', highlight: 'jam' },
    { text: "There's jam on the table.", vi: 'Có mứt ở trên bàn.', highlight: 'jam' },
    { text: 'I want some jam.', vi: 'Tớ muốn một ít mứt.', highlight: 'jam' },
    { text: 'Water, water.', vi: 'Nước lọc, nước lọc trong lành.', highlight: 'water' },
    { text: "There's water on the table.", vi: 'Có nước ở trên bàn.', highlight: 'water' },
    { text: 'I want some water.', vi: 'Tớ muốn một cốc nước.', highlight: 'water' }
  ];

  const playFullChant = async () => {
    sound.playClick();
    setIsChanting(true);
    for (let i = 0; i < chantLines.length; i++) {
      setActiveChantLine(i);
      await speakWord(chantLines[i].text, speechRate * 0.95);
      await new Promise(r => setTimeout(r, 400));
    }
    setActiveChantLine(null);
    setIsChanting(false);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    onAddStar(3);
  };

  // Activity 4: Read and circle (Bill's letter)
  const [highlightedClue, setHighlightedClue] = useState<number | null>(null);
  const [act4Answers, setAct4Answers] = useState<{ [q: number]: string | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [act4Checked, setAct4Checked] = useState<boolean>(false);

  const act4Questions = [
    {
      q: 1,
      question: 'Bill is from _______.',
      questionVi: 'Bill đến từ quốc gia nào?',
      correct: 'b',
      options: [
        { key: 'a', text: 'America' },
        { key: 'b', text: 'Britain' },
        { key: 'c', text: 'Australia' }
      ],
      clueSentence: "I'm from Britain."
    },
    {
      q: 2,
      question: "His birthday's in _______.",
      questionVi: 'Sinh nhật của Bill vào tháng mấy?',
      correct: 'a',
      options: [
        { key: 'a', text: 'March' },
        { key: 'b', text: 'January' },
        { key: 'c', text: 'April' }
      ],
      clueSentence: "My birthday's in March."
    },
    {
      q: 3,
      question: 'He wants some _______.',
      questionVi: 'Cậu ấy muốn ăn gì trong tiệc sinh nhật?',
      correct: 'a',
      options: [
        { key: 'a', text: 'chips' },
        { key: 'b', text: 'grapes' },
        { key: 'c', text: 'jam' }
      ],
      clueSentence: 'I want some chips...'
    },
    {
      q: 4,
      question: 'He wants some _______.',
      questionVi: 'Cậu ấy muốn uống gì trong tiệc sinh nhật?',
      correct: 'b',
      options: [
        { key: 'a', text: 'milk' },
        { key: 'b', text: 'lemonade' },
        { key: 'c', text: 'water' }
      ],
      clueSentence: '...and some lemonade at my party.'
    }
  ];

  const handleCheckAct4 = () => {
    sound.playClick();
    setAct4Checked(true);
    let correctCount = 0;
    act4Questions.forEach(q => {
      if (act4Answers[q.q] === q.correct) correctCount++;
    });

    if (correctCount === 4) {
      sound.playCorrect();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      onAddStar(5);
    } else {
      sound.playWrong();
    }
  };

  // Activity 5: Let's write (Nhà Văn Nhí Studio)
  const [writerName, setWriterName] = useState<string>('Minh');
  const [writerCountry, setWriterCountry] = useState<string>('Vietnam');
  const [writerMonth, setWriterMonth] = useState<string>('May');
  const [writerWants, setWriterWants] = useState<string>('some chips and lemonade');
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  const fullLetterText = `My name is ${writerName}. I am from ${writerCountry}. My birthday is in ${writerMonth}. I want ${writerWants} at my party.`;

  const handleCopyLetter = () => {
    sound.playClick();
    navigator.clipboard.writeText(fullLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  // Activity 6: Project - A Birthday Party Invitation
  const [inviteTo, setInviteTo] = useState<string>('Katie');
  const [inviteDate, setInviteDate] = useState<string>('Thursday, 20 May');
  const [inviteTime, setInviteTime] = useState<string>('7:00 p.m.');
  const [invitePlace, setInvitePlace] = useState<string>('15 Hoa Mai Street');
  const [candleLit, setCandleLit] = useState<boolean>(true);

  const handleReadInvitation = async () => {
    sound.playClick();
    await speakWord(
      `Come to my birthday party! To: ${inviteTo}. Date: ${inviteDate}. Time: ${inviteTime}. Place: ${invitePlace}.`,
      speechRate * 0.9
    );
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    onAddStar(3);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO LESSON BANNER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
              <span>💌</span>
              <span>Trang 32 - 33 SGK Kết Nối Tri Thức</span>
            </div>

            <div className="flex items-center gap-2">
              {onSwitchToLesson1 && (
                <button
                  onClick={onSwitchToLesson1}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>⬅️ Tiết 1 (Trang 28)</span>
                </button>
              )}
              {onSwitchToLesson2 && (
                <button
                  onClick={onSwitchToLesson2}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <span>⬅️ Tiết 2 (Trang 30)</span>
                </button>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Unit 4: My birthday party — Lesson 3
          </h1>
          <p className="text-sm sm:text-base text-purple-100 font-medium leading-relaxed max-w-3xl">
            Làm chủ 2 âm cốt lõi: <strong>/dʒ/ (jam)</strong> và <strong>/w/ (water)</strong>, đọc hiểu bức thư kết bạn phương xa của bạn Bill, xưởng viết thư mini và dự án <strong>Thiết Kế Thiệp Mời Sinh Nhật</strong> tuyệt đẹp!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-white/90">
            <span className="bg-white/15 px-3 py-1 rounded-lg">🍓 Letter j: jam /dʒæm/</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">💧 Letter w: water /ˈwɔː.tər/</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🇬🇧 Bill's letter (Britain)</span>
            <span className="bg-white/15 px-3 py-1 rounded-lg">🎉 Birthday invitation card</span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPhoneticDetails(!showPhoneticDetails)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showPhoneticDetails
                  ? 'bg-amber-300 text-slate-950 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span>🇬🇧 Phiên âm Anh - Anh (RP)</span>
              <span>{showPhoneticDetails ? 'Đang bật' : 'Tắt'}</span>
            </button>

            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                showParentGuides
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Mẹo phụ huynh kèm con</span>
              <span>{showParentGuides ? 'Đang bật' : 'Tắt'}</span>
            </button>
          </div>

          <button
            onClick={() => setShowFullHandbook(!showFullHandbook)}
            className="px-4 py-1.5 bg-white text-slate-900 hover:bg-purple-50 rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>{showFullHandbook ? 'Thu gọn cẩm nang' : '📖 Cẩm nang ngữ âm & thiệp mời'}</span>
            {showFullHandbook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="absolute right-4 bottom-2 text-8xl opacity-15 pointer-events-none select-none">
          💌
        </div>
      </div>

      {/* ================= BÍ KÍP NGỮ ÂM J VÀ W ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-purple-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Bí Kíp Phát Âm Chuẩn Xác 2 Âm /dʒ/ và /w/</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>🧠 Letter "j" /dʒ/ ➔ jam, juice · Letter "w" /w/ ➔ water</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Âm <strong>/dʒ/</strong>: tròn môi, nâng đầu lưỡi chạm vòm miệng trên rồi bật rung thanh quản. Âm <strong>/w/</strong>: chu môi tròn như huýt sáo rồi mở nhẹ.
            </p>
          </div>

          <button
            onClick={async () => {
              sound.playClick();
              await speakWord('j, jam. I like jam. w, water. I want some water.', speechRate);
              onAddStar(2);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 text-white rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 fill-white" />
            <span>Nghe Cặp Âm SGK</span>
          </button>
        </div>

        {/* 2 Big Phonics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Sound /dʒ/ in jam */}
          <div
            onClick={() => {
              sound.playClick();
              speakWord('j, jam. I like jam.', speechRate);
            }}
            className="p-5 rounded-3xl bg-white/10 hover:bg-white/15 border-2 border-purple-400/40 hover:border-purple-400 cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-rose-400 font-mono">
                j /dʒ/
              </span>
              <span className="text-4xl">🍓</span>
            </div>
            <div>
              <div className="text-2xl font-black text-white group-hover:text-amber-300">
                jam <span className="text-sm font-mono font-normal text-slate-300">/dʒæm/</span>
              </div>
              <div className="text-sm text-slate-300 font-medium">mứt ngọt</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-sm font-bold text-amber-300">"I like jam."</div>
              <div className="text-xs text-slate-400">Tớ thích ăn mứt.</div>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span>Chạm vào để nghe đọc chuẩn bản ngữ</span>
            </div>
          </div>

          {/* Sound /w/ in water */}
          <div
            onClick={() => {
              sound.playClick();
              speakWord('w, water. I want some water.', speechRate);
            }}
            className="p-5 rounded-3xl bg-white/10 hover:bg-white/15 border-2 border-sky-400/40 hover:border-sky-400 cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-sky-400 font-mono">
                w /w/
              </span>
              <span className="text-4xl">💧</span>
            </div>
            <div>
              <div className="text-2xl font-black text-white group-hover:text-amber-300">
                water <span className="text-sm font-mono font-normal text-slate-300">/ˈwɔː.tər/</span>
              </div>
              <div className="text-sm text-slate-300 font-medium">nước uống</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="text-sm font-bold text-sky-300">"I want some water."</div>
              <div className="text-xs text-slate-400">Tớ muốn một cốc nước.</div>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span>Chạm vào để nghe đọc chuẩn bản ngữ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPREHENSIVE PARENT HANDBOOK ================= */}
      {showFullHandbook && (
        <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 sm:p-8 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-100">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>👨‍👩‍👧 Cẩm Nang Cho Phụ Huynh: Mẹo Luyện Âm & Viết Thiệp Mời</span>
            </h3>
            <button
              onClick={() => setShowFullHandbook(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
            >
              Thu gọn ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
              <div className="font-bold text-purple-950 text-sm">💡 1. Khẩu hình âm /dʒ/</div>
              <p>
                Tránh đọc từ <strong>jam</strong> như "dam" hay "dăm". Hướng dẫn con chu môi tròn một chút, nâng đầu lưỡi chạm vào phần gạc trên rồi bật hơi mạnh tạo âm /dʒ/.
              </p>
            </div>
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <div className="font-bold text-sky-950 text-sm">💡 2. Khẩu hình âm /w/</div>
              <p>
                Từ <strong>water</strong> bắt đầu bằng âm /w/ chu môi tròn như quả bóng nhỏ rồi mở nhẹ sang âm /ɔː/, không đọc là "goát-tơ" hay "qua-tơ".
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1">
              <div className="font-bold text-rose-950 text-sm">💡 3. Các thành phần thiệp mời</div>
              <p>
                Thiệp mời sinh nhật luôn gồm 4 mục cốt lõi: <strong>To</strong> (gửi ai), <strong>Date</strong> (ngày tháng), <strong>Time</strong> (giờ tổ chức) và <strong>Place</strong> (địa điểm tổ chức).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6 ACTIVITIES NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Listen & repeat', icon: '🗣️', desc: 'Trang 32' },
          { id: 2, label: '2. Listen & circle', icon: '⭕', desc: 'Trang 32' },
          { id: 3, label: "3. Let's chant", icon: '🎵', desc: 'Trang 32' },
          { id: 4, label: '4. Read & circle', icon: '📖', desc: 'Trang 33' },
          { id: 5, label: "5. Let's write", icon: '✍️', desc: 'Trang 33' },
          { id: 6, label: '6. Project (Thiệp mời)', icon: '💌', desc: 'Trang 33' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border-2 ${
              activeSection === tab.id
                ? 'bg-purple-600 text-white border-purple-600 shadow-md font-black'
                : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= ACTIVITY 1: LISTEN AND REPEAT ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Track 43 · Sách Giáo Khoa Trang 32</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 1: Listen and repeat (Nghe và nhắc lại chuẩn âm j & w)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Letter J */}
            <div className="p-6 rounded-3xl bg-purple-50 border-2 border-purple-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-black rounded-full">
                  Letter j ➔ /dʒ/
                </span>
                <span className="text-3xl">🍓</span>
              </div>

              <div className="space-y-2">
                <div
                  onClick={() => {
                    sound.playClick();
                    speakWord('j, jam. I like jam.', speechRate);
                  }}
                  className="p-4 rounded-2xl bg-white border border-purple-200 hover:border-purple-400 cursor-pointer transition-all space-y-1"
                >
                  <div className="text-2xl font-black text-purple-900">
                    <span className="text-rose-600 underline">j</span>am
                  </div>
                  <div className="text-base font-bold text-slate-800">
                    "I like <span className="text-rose-600 underline">j</span>am."
                  </div>
                  <div className="text-xs text-slate-500">Tớ thích mứt.</div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  speakWord('j, jam. I like jam.', speechRate);
                }}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Lại Toàn Bộ Câu j</span>
              </button>
            </div>

            {/* Letter W */}
            <div className="p-6 rounded-3xl bg-sky-50 border-2 border-sky-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-sky-600 text-white text-xs font-black rounded-full">
                  Letter w ➔ /w/
                </span>
                <span className="text-3xl">💧</span>
              </div>

              <div className="space-y-2">
                <div
                  onClick={() => {
                    sound.playClick();
                    speakWord('w, water. I want some water.', speechRate);
                  }}
                  className="p-4 rounded-2xl bg-white border border-sky-200 hover:border-sky-400 cursor-pointer transition-all space-y-1"
                >
                  <div className="text-2xl font-black text-sky-900">
                    <span className="text-rose-600 underline">w</span>ater
                  </div>
                  <div className="text-base font-bold text-slate-800">
                    "I want some <span className="text-rose-600 underline">w</span>ater."
                  </div>
                  <div className="text-xs text-slate-500">Tớ muốn một ít nước.</div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  speakWord('w, water. I want some water.', speechRate);
                }}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-black shadow flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe Lại Toàn Bộ Câu w</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 2: LISTEN AND CIRCLE ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 44 · Sách Giáo Khoa Trang 32</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 2: Listen and circle (Nghe và khoanh tròn đáp án đúng)
              </h3>
            </div>
            <button
              onClick={handleCheckAct2}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="space-y-6">
            {act2Questions.map(item => (
              <div
                key={item.q}
                className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                      {item.q}
                    </span>
                    <span>
                      {item.q === 1
                        ? '1. I want some _______.'
                        : '2. There is some _______ on the table.'}
                    </span>
                  </span>

                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.audioText, speechRate);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 text-xs font-bold text-purple-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe Băng Câu {item.q}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {item.options.map(opt => {
                    const isSelected = act2Answers[item.q] === opt.key;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => {
                          sound.playClick();
                          setAct2Answers({ ...act2Answers, [item.q]: opt.key });
                        }}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-200 shadow-md font-black'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                            {opt.key}
                          </span>
                          <span className="text-2xl">{opt.icon}</span>
                          <div>
                            <span className="text-sm font-black">{opt.word}</span>
                            <div className="text-[10px] font-mono text-slate-400">
                              {opt.ipa}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {act2Checked && (
                  <div className="text-xs font-bold pt-2 border-t border-slate-200">
                    {act2Answers[item.q] === item.correct ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Chính xác! ({item.audioText})
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        Chưa đúng. Băng đọc: "{item.audioText}" ➔ Đáp án đúng là{' '}
                        <strong>{item.correct}</strong>.
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 3: LET'S CHANT ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Track 45 · Sách Giáo Khoa Trang 32</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Activity 3: Let's chant — Bài vè nhịp điệu Jam & Water</span>
                <Music className="w-5 h-5 text-purple-500" />
              </h3>
            </div>
            <button
              onClick={playFullChant}
              disabled={isChanting}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white rounded-2xl font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isChanting ? 'Đang Đọc Theo Nhịp...' : 'Bật Toàn Bộ Bài Vè 🎵'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chant Lyrics Interactive Player */}
            <div className="space-y-2">
              {chantLines.map((line, idx) => {
                const isActive = activeChantLine === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveChantLine(idx);
                      speakWord(line.text, speechRate);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-700 shadow-md font-black scale-102'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800 font-bold'
                    }`}
                  >
                    <div>
                      <div className="text-base">{line.text}</div>
                      <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-slate-500'}`}>
                        {line.vi}
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                );
              })}
            </div>

            {/* Visual Chant Stage */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-amber-100 border-2 border-purple-200 flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex items-center gap-4 text-6xl">
                <span className="animate-bounce">🍓</span>
                <span className="animate-pulse">💧</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900">
                  👏 Vỗ tay theo nhịp Chant!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm">
                  Khổ 1 luyện âm <strong>j trong Jam</strong>. Khổ 2 luyện âm <strong>w trong Water</strong>. Vừa gõ nhịp bàn vừa đọc to nhé!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-xs pt-2">
                <div className="p-3 bg-white rounded-2xl border border-purple-200 text-center">
                  <div className="text-xs font-black text-purple-700">Khổ 1</div>
                  <div className="text-[11px] text-slate-500">🍓 Jam, jam.</div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-sky-200 text-center">
                  <div className="text-xs font-black text-sky-700">Khổ 2</div>
                  <div className="text-[11px] text-slate-500">💧 Water, water.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 4: READ AND CIRCLE ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Sách Giáo Khoa Trang 33</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Activity 4: Read and circle (Đọc thư của bạn Bill và khoanh tròn)
              </h3>
            </div>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bill's Pen Friend Letter Card */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-amber-50/50 border-2 border-amber-300 shadow-sm space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-black text-amber-800 uppercase flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span>Bức Thư Bạn Phương Xa (Pen Friend)</span>
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(
                      "Dear pen friend, My name's Bill. I'm from Britain. I'm nine years old. My birthday's in March. It's coming soon. I want some chips and some lemonade at my party. What about you? When's your birthday? What do you want to eat and drink at your party? Write to me soon. Bill",
                      speechRate
                    );
                  }}
                  className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-300 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Đọc Thư</span>
                </button>
              </div>

              {/* Letter Paragraphs with Clue Highlights */}
              <div className="text-sm text-slate-800 leading-relaxed font-sans space-y-2">
                <div className="font-bold text-slate-900 italic">Dear pen friend,</div>
                <p>
                  My name's Bill.{' '}
                  <span
                    className={`transition-colors rounded px-1 ${
                      highlightedClue === 1 ? 'bg-amber-300 font-black' : ''
                    }`}
                  >
                    I'm from Britain.
                  </span>{' '}
                  I'm nine years old.{' '}
                  <span
                    className={`transition-colors rounded px-1 ${
                      highlightedClue === 2 ? 'bg-amber-300 font-black' : ''
                    }`}
                  >
                    My birthday's in March.
                  </span>{' '}
                  It's coming soon.{' '}
                  <span
                    className={`transition-colors rounded px-1 ${
                      highlightedClue === 3 || highlightedClue === 4
                        ? 'bg-amber-300 font-black'
                        : ''
                    }`}
                  >
                    I want some chips and some lemonade at my party.
                  </span>{' '}
                  What about you? When's your birthday? What do you want to eat and drink at your party?
                </p>
                <div>Write to me soon.</div>
                <div className="font-bold text-slate-900">Bill</div>
              </div>

              <div className="text-[11px] text-amber-800 italic bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
                💡 Rà chuột hoặc bấm vào từng câu hỏi bên phải để làm sáng câu dẫn chứng trong bức thư!
              </div>
            </div>

            {/* 4 Questions Card */}
            <div className="lg:col-span-6 space-y-3">
              {act4Questions.map(item => (
                <div
                  key={item.q}
                  onMouseEnter={() => setHighlightedClue(item.q)}
                  onMouseLeave={() => setHighlightedClue(null)}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-800">
                      {item.q}. {item.question}
                    </span>
                    <span className="text-slate-500 font-normal">({item.questionVi})</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.options.map(opt => {
                      const isSelected = act4Answers[item.q] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => {
                            sound.playClick();
                            setAct4Answers({ ...act4Answers, [item.q]: opt.key });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-sm font-black'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                          }`}
                        >
                          <span>{opt.key}. </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {act4Checked && (
                    <div className="text-xs font-bold pt-1">
                      {act4Answers[item.q] === item.correct ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng ({item.clueSentence})
                        </span>
                      ) : (
                        <span className="text-rose-600">
                          Đáp án đúng là: <strong>{item.correct}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 5: LET'S WRITE ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
              <span>Sách Giáo Khoa Trang 33</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              Activity 5: Let's write (Nhà Văn Nhí — Viết thư hồi đáp bạn Bill)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Điền thông tin của chính bạn để tạo một đoạn văn tự giới thiệu ngày sinh và món ăn yêu thích:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4 p-6 rounded-3xl bg-slate-50 border-2 border-slate-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tên của bạn (Name):</label>
                <input
                  type="text"
                  value={writerName}
                  onChange={e => setWriterName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Đến từ đất nước nào (Country):</label>
                <div className="flex gap-2">
                  {['Vietnam', 'Britain', 'America'].map(c => (
                    <button
                      key={c}
                      onClick={() => setWriterCountry(c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        writerCountry === c
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tháng sinh nhật của bạn (Month):</label>
                <select
                  value={writerMonth}
                  onChange={e => setWriterMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Món ăn / thức uống bạn muốn trong tiệc:</label>
                <input
                  type="text"
                  value={writerWants}
                  onChange={e => setWriterWants(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'some chips and lemonade',
                    'some grapes and water',
                    'some cake and juice'
                  ].map(w => (
                    <button
                      key={w}
                      onClick={() => setWriterWants(w)}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-purple-50"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Letter Preview */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                  <span className="text-xs font-black text-purple-900 uppercase">
                    📄 Thư Hoàn Chỉnh Của Bạn
                  </span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(fullLetterText, speechRate);
                    }}
                    className="p-1.5 bg-white hover:bg-purple-100 rounded-xl text-purple-700 border border-purple-200 shadow-2xs"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2 text-sm text-slate-800 leading-relaxed font-sans">
                  <p>
                    My name is <strong className="text-purple-700 underline">{writerName}</strong>.{' '}
                    I am from <strong className="text-purple-700 underline">{writerCountry}</strong>.{' '}
                    My birthday is in <strong className="text-purple-700 underline">{writerMonth}</strong>.{' '}
                    I want <strong className="text-purple-700 underline">{writerWants}</strong> at my party.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyLetter}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLetter ? 'Đã Sao Chép Đoạn Văn! ✓' : 'Sao Chép Đoạn Văn Vào Vở'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVITY 6: PROJECT - BIRTHDAY INVITATION ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs tracking-wider uppercase">
                <span>Project · Sách Giáo Khoa Trang 33</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Activity 6: Project — A birthday party invitation</span>
                <span className="text-2xl">💌</span>
              </h3>
            </div>
            <button
              onClick={handleReadInvitation}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white rounded-2xl text-xs font-black shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4 fill-white" />
              <span>Đọc To Toàn Bộ Thiệp Mời 🎵</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Customizer Controls */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-4">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                🛠️ Tùy Chỉnh Thiệp Mời Sinh Nhật:
              </span>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Gửi bạn (To):</label>
                <input
                  type="text"
                  value={inviteTo}
                  onChange={e => setInviteTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ngày sinh nhật (Date):</label>
                <input
                  type="text"
                  value={inviteDate}
                  onChange={e => setInviteDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Giờ tổ chức (Time):</label>
                <input
                  type="text"
                  value={inviteTime}
                  onChange={e => setInviteTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Địa chỉ tiệc (Place):</label>
                <input
                  type="text"
                  value={invitePlace}
                  onChange={e => setInvitePlace(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setCandleLit(!candleLit);
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    candleLit
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>{candleLit ? 'Nến Đang Thắp Sáng 🔥 (Bấm để thổi)' : 'Thắp Sáng Lại Nến Sinh Nhật 🕯️'}</span>
                </button>
              </div>
            </div>

            {/* Birthday Invitation Card Display */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-200 via-yellow-100 to-rose-200 border-4 border-amber-400 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
              <div className="relative z-10 space-y-3">
                <div className="text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-black text-rose-600 font-serif tracking-tight block drop-shadow-xs">
                    🎉 Come to my birthday party! 🎉
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    Trân trọng kính mời bạn đến chung vui cùng gia đình tớ!
                  </span>
                </div>

                {/* Card Fields */}
                <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xs border-2 border-amber-300 shadow-sm space-y-2 text-sm text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-rose-600 w-16">To:</span>
                    <span className="font-bold text-base text-slate-900">{inviteTo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-700 w-16">Date:</span>
                    <span className="font-bold text-slate-900">{inviteDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-purple-700 w-16">Time:</span>
                    <span className="font-bold text-slate-900">{inviteTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-700 w-16">Place:</span>
                    <span className="font-bold text-slate-900">{invitePlace}</span>
                  </div>
                </div>
              </div>

              {/* Birthday Cake Art */}
              <div className="relative z-10 flex items-center justify-center gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-6xl">{candleLit ? '🎂' : '🍰'}</div>
                  <span className="text-[11px] font-bold text-amber-900 block">
                    {candleLit ? 'Happy Birthday! 🎉' : 'Ước một điều ước nào! ✨'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
