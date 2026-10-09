import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Play,
  RotateCcw,
  Check,
  Sparkles,
  Building2,
  Laptop,
  Flower2,
  TreePine,
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
  PlusCircle,
  Hash
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit6Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit6Lesson2Studio: React.FC<Unit6Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core School Facilities in Lesson 2
  const schoolFacilities = [
    {
      id: 'playgrounds',
      name: 'playgrounds',
      singular: 'playground',
      quantity: 1,
      verbType: 'singular' as const,
      vi: 'sân chơi / sân thể thao',
      ipa: '/ˈpleɪ.ɡraʊndz/',
      reading: 'p-LÂY-grao-n-dz',
      icon: '🛝',
      sampleSentence: 'How many playgrounds are there at your school? - There is one.',
      tip: 'Chỉ có 1 sân chơi dùng "There is one". Danh từ trong câu hỏi luôn ở dạng số nhiều (playgrounds).'
    },
    {
      id: 'computer_rooms',
      name: 'computer rooms',
      singular: 'computer room',
      quantity: 2,
      verbType: 'plural' as const,
      vi: 'phòng máy tính / phòng tin học',
      ipa: '/kəmˈpjuː.tər ruːmz/',
      reading: 'cơm-PIU-tờ rum-z',
      icon: '💻',
      sampleSentence: 'How many computer rooms are there at your school? - There are two.',
      tip: 'Từ 2 phòng trở lên dùng "There are two". Nhớ phát âm âm đuôi /z/ ở "rooms".'
    },
    {
      id: 'gardens',
      name: 'gardens',
      singular: 'garden',
      quantity: 1,
      verbType: 'singular' as const,
      vi: 'vườn trường / vườn cây hoa',
      ipa: '/ˈɡɑː.dənz/',
      reading: 'GA-dừn-z',
      icon: '🌷',
      sampleSentence: 'How many gardens are there at your school? - There is one.',
      tip: '1 vườn trường dùng "There is one". "There is" có thể viết tắt thành "There\'s".'
    },
    {
      id: 'buildings',
      name: 'buildings',
      singular: 'building',
      quantity: 3,
      verbType: 'plural' as const,
      vi: 'tòa nhà / dãy phòng học',
      ipa: '/ˈbɪl.dɪŋz/',
      reading: 'BÍL-đinh-z',
      icon: '🏢',
      sampleSentence: 'How many buildings are there at your school? - There are three.',
      tip: '3 tòa nhà dùng "There are three". Trọng âm rơi vào "build" (/bɪl/).'
    }
  ];

  // Activity 1: Dialogue Look, Listen & Repeat (Track 60)
  const [activeDialogueTab, setActiveDialogueTab] = useState<'a' | 'b'>('a');
  const [playingDialogueLine, setPlayingDialogueLine] = useState<number | null>(null);

  const dialogueScenes = {
    a: {
      title: 'Tình huống A: Bạn nữ hỏi Bill về vị trí trường học',
      context: 'Bạn nữ gặp Bill trên đường và hỏi thăm về vị trí ngôi trường của bạn.',
      badge: 'Track 60 - Part A',
      lines: [
        {
          speaker: 'Girl',
          avatar: '👧',
          en: 'Where’s your school, Bill?',
          vi: 'Trường của bạn ở đâu vậy Bill?',
          soundDesc: 'Bạn nữ hỏi với giọng thân thiện',
          focus: 'Where’s your school, Bill?'
        },
        {
          speaker: 'Bill',
          avatar: '👦',
          en: 'It’s in the town.',
          vi: 'Trường của tớ ở thị trấn.',
          soundDesc: 'Bill vui vẻ trả lời',
          focus: 'It’s in the town.'
        }
      ]
    },
    b: {
      title: 'Tình huống B: Bạn nữ hỏi số lượng tòa nhà trường Bill',
      context: 'Bạn nữ tò mò hỏi trường Bill có bao nhiêu tòa nhà. Bill giơ 3 ngón tay tươi cười giới thiệu.',
      badge: 'Track 60 - Part B',
      lines: [
        {
          speaker: 'Girl',
          avatar: '👧',
          en: 'How many buildings are there at your school?',
          vi: 'Trường bạn có bao nhiêu tòa nhà vậy?',
          soundDesc: 'Bạn nữ hỏi về số lượng cơ sở vật chất',
          focus: 'How many buildings are there at your school?'
        },
        {
          speaker: 'Bill',
          avatar: '👦',
          en: 'There are three.',
          vi: 'Có 3 tòa nhà.',
          soundDesc: 'Bill xòe 3 ngón tay trả lời dõng dạc',
          focus: 'There are three.'
        }
      ]
    }
  };

  // Activity 2: Interactive Facility Builder
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('playgrounds');

  // Activity 3: Let's talk Campus Explorer
  const [talkFacility, setTalkFacility] = useState<string>('buildings');
  const [talkQuantity, setTalkQuantity] = useState<number>(3);

  // Activity 4: Listen and tick (Track 62)
  interface ListenTickItem {
    id: number;
    audioText: string;
    questionVi: string;
    options: Array<{
      key: 'a' | 'b';
      label: string;
      icon: string;
      desc: string;
    }>;
    correctAnswer: 'a' | 'b';
    userChoice: 'a' | 'b' | null;
  }

  const [listenTicks, setListenTicks] = useState<ListenTickItem[]>([
    {
      id: 1,
      audioText: 'How many buildings are there at your school, Nam? - There are two.',
      questionVi: 'Câu 1: Trường Nam có bao nhiêu tòa nhà?',
      options: [
        { key: 'a', label: 'Two buildings (2 tòa nhà)', icon: '🏢🏢', desc: 'Có 2 dãy nhà màu cam mái xanh' },
        { key: 'b', label: 'One building (1 tòa nhà)', icon: '🏢', desc: 'Chỉ có 1 dãy nhà đơn lẻ' }
      ],
      correctAnswer: 'a',
      userChoice: null
    },
    {
      id: 2,
      audioText: 'How many computer rooms are there at your school, Mai? - There is one computer room.',
      questionVi: 'Câu 2: Trường Mai có phòng máy tính hay phòng học?',
      options: [
        { key: 'a', label: 'Classroom (Phòng học thường)', icon: '🏫', desc: 'Phòng học có bàn ghế bảng đen' },
        { key: 'b', label: 'Computer room (Phòng tin học)', icon: '💻', desc: 'Phòng học vi tính có nhiều màn hình máy tính' }
      ],
      correctAnswer: 'b',
      userChoice: null
    }
  ]);
  const [tickChecked, setTickChecked] = useState<boolean>(false);

  // Activity 5: Look, complete and read
  const [fillAnswers, setFillAnswers] = useState<{ [key: string]: string }>({
    q1_loc: '',
    q1_count: '',
    q2_howmany: '',
    q2_count: '',
    q2_arethere: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Sing Karaoke "Gardens and buildings at my school" (Track 63)
  const songLyrics = [
    {
      en: 'How many gardens are there at your school?',
      vi: 'Trường bạn có bao nhiêu khu vườn?',
      rhyme: 'gardens'
    },
    {
      en: 'There’s one. There’s one.',
      vi: 'Có một khu vườn. Có một khu vườn.',
      rhyme: 'one'
    },
    {
      en: 'There’s one garden at my school.',
      vi: 'Có một khu vườn tại trường của mình.',
      rhyme: 'garden'
    },
    {
      en: 'How many buildings are there at your school?',
      vi: 'Trường bạn có bao nhiêu dãy nhà học?',
      rhyme: 'buildings'
    },
    {
      en: 'There are three. There are three.',
      vi: 'Có ba dãy nhà. Có ba dãy nhà.',
      rhyme: 'three'
    },
    {
      en: 'There are three buildings at my school.',
      vi: 'Có ba dãy nhà tại trường của mình.',
      rhyme: 'buildings'
    }
  ];
  const [singingLine, setSingingLine] = useState<number | null>(null);

  const curFacility =
    schoolFacilities.find(f => f.id === selectedFacilityId) || schoolFacilities[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Quick Navigation */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Unit 6: Our School Facilities • Tiết 2 (Lesson 2)</span>
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
              <span>Hỏi Số Lượng Cơ Sở Vật Chất</span>
              <span className="text-3xl">🏢💻</span>
            </h1>
            <p className="text-emerald-100 text-sm md:text-base font-medium mt-1">
              Học cách hỏi và đếm số lượng các khu vực tại trường: "How many [facilities] are there at your school?" — "There is one. / There are three."
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Trang SGK</span>
              <span className="text-sm font-black text-white">Trang 46 - 47</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Mẫu Câu</span>
              <span className="text-sm font-black text-amber-300">How many... are there?</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Cơ Sở Vật Chất</span>
              <span className="text-sm font-black text-white">sân chơi, máy tính, vườn, dãy nhà</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-sm border border-white/10">
              <span className="text-[11px] text-emerald-200 block font-medium">Quy Tắc</span>
              <span className="text-sm font-black text-cyan-300">1: There is • 2+: There are</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Grammar Formula Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
              💡
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Bí Kíp Ngữ Pháp: Hỏi Số Lượng "How many... are there...?"
              </h2>
              <p className="text-xs text-slate-500">
                Lưu ý quan trọng: Danh từ theo sau "How many" luôn luôn ở dạng số nhiều (thêm -s hoặc -es)!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowParentGuides(!showParentGuides)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            {showParentGuides ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showParentGuides ? 'Thu gọn cẩm nang' : 'Mở cẩm nang phụ huynh'}</span>
          </button>
        </div>

        {/* Visual Formula Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Singular: 1 */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                1️⃣ Khi Chỉ Có 1 (Số Ít)
              </span>
              <span className="text-lg font-black">There is one</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-amber-700">There is one</span> (hoặc: <em>There's one</em>)
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: "How many gardens are there?" ➔ "<strong>There is one</strong>." (Chỉ có 1 khu vườn)
            </div>
          </div>

          {/* Plural: 2+ */}
          <div className="p-4 rounded-2xl bg-teal-50 border-2 border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-teal-800 uppercase tracking-wide">
                🔢 Khi Có Từ 2 Trở Lên (Số Nhiều)
              </span>
              <span className="text-lg font-black">There are two / three...</span>
            </div>
            <div className="text-sm font-black text-slate-800">
              <span className="text-teal-700">There are</span> + [số đếm: two, three, four...]
            </div>
            <div className="text-xs text-slate-600">
              Ví dụ: "How many buildings are there?" ➔ "<strong>There are three</strong>." (Có 3 tòa nhà)
            </div>
          </div>
        </div>

        {/* Parent Guide Expandable */}
        {showParentGuides && (
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Góc Hướng Dẫn Phụ Huynh & Thầy Cô (SGK Trang 46 - 47)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
              <li>
                <strong>Cạm bẫy danh từ sau "How many":</strong> Học sinh hay quên thêm "-s" vào danh từ khi hỏi (ví dụ: "How many building" - SAI; phải là "How many building<strong>s</strong>" - ĐÚNG). Hãy nhắc con: Đã hỏi How many thì luôn coi như có nhiều!
              </li>
              <li>
                <strong>Phân biệt There is vs There are:</strong> <em>There is</em> dùng cho 1, <em>There are</em> dùng cho 2 trở lên.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 6 Activity Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { num: 1, label: '1. Đối Thoại (Track 60)', icon: '💬' },
          { num: 2, label: '2. Chỉ Tranh & Đếm (Track 61)', icon: '🎙️' },
          { num: 3, label: '3. Phỏng Vấn Let’s Talk', icon: '🏫' },
          { num: 4, label: '4. Nghe & Tích Chọn (Track 62)', icon: '🎧' },
          { num: 5, label: '5. Hoàn Thiện Câu Hỏi', icon: '✍️' },
          { num: 6, label: '6. Hát Vui Bài Ca Trường (Track 63)', icon: '🎵' }
        ].map(tab => (
          <button
            key={tab.num}
            onClick={() => {
              setActiveSection(tab.num);
              sound.playClick();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
              activeSection === tab.num
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 60) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
                Phần 1 • SGK Trang 46
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Look, listen and repeat</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 60
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Quan sát đoạn đối thoại hỏi về vị trí và số lượng tòa nhà trường bạn Bill. Bấm vào từng câu để nghe giọng bản xứ.
              </p>
            </div>

            {/* Switch Situation A / B */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setActiveDialogueTab('a');
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'a'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh A: Trường Bill ở thị trấn 🏘️
              </button>
              <button
                onClick={() => {
                  setActiveDialogueTab('b');
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeDialogueTab === 'b'
                    ? 'bg-white text-cyan-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tranh B: Trường Bill có 3 tòa nhà 🏢
              </button>
            </div>
          </div>

          {/* Current Dialogue Scene Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{dialogueScenes[activeDialogueTab].title}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {dialogueScenes[activeDialogueTab].badge}
              </span>
            </div>

            <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200">
              📌 {dialogueScenes[activeDialogueTab].context}
            </p>

            {/* Interactive Lines */}
            <div className="space-y-3 pt-2">
              {dialogueScenes[activeDialogueTab].lines.map((line, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setPlayingDialogueLine(idx);
                    speakWord(line.en, speechRate);
                    onAddStar(1);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    playingDialogueLine === idx
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-sm scale-[1.01]'
                      : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="text-3xl p-2 bg-slate-100 rounded-2xl flex-shrink-0">
                    {line.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">
                        {line.speaker}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Bấm để nghe & đọc theo</span>
                      </span>
                    </div>
                    <div className="text-base font-black text-slate-800">
                      {line.en}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {line.vi}
                    </div>
                    <div className="text-[11px] text-emerald-700 pt-1 font-semibold flex items-center gap-1">
                      <span>🎯 Câu trọng tâm:</span>
                      <span className="bg-emerald-100 px-2 py-0.5 rounded-md font-black">
                        {line.focus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  const allText = dialogueScenes[activeDialogueTab].lines
                    .map(l => `${l.speaker} says: ${l.en}`)
                    .join('. ');
                  speakWord(allText, speechRate);
                  onAddStar(2);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Nghe Toàn Bộ Đoạn Thoại</span>
              </button>

              <button
                onClick={onOpenVoiceStudio}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Luyện Giọng AI Đoạn Này</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: LISTEN, POINT AND SAY (TRACK 61) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
              Phần 2 • SGK Trang 46
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Listen, point and say</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                Track 61
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn 1 trong 4 cơ sở vật chất (playgrounds, computer rooms, gardens, buildings) để hệ thống tự động ghép câu hỏi & câu trả lời tương ứng với số lượng.
            </p>
          </div>

          {/* 4 Facilities Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {schoolFacilities.map(fac => {
              const isSelected = selectedFacilityId === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => {
                    setSelectedFacilityId(fac.id);
                    sound.playClick();
                    speakWord(fac.sampleSentence, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{fac.icon}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {fac.quantity === 1 ? '1 nơi' : `${fac.quantity} nơi`}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-black text-slate-900 capitalize">
                      {fac.name}
                    </div>
                    <div className="text-xs text-slate-500">{fac.vi}</div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sentence Builder Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Mẫu Câu Hoàn Chỉnh Vừa Được Ghép</span>
              </span>
              <span className="text-3xl">{curFacility.icon}</span>
            </div>

            {/* Question Line */}
            <div className="p-3.5 rounded-xl bg-white border border-emerald-100 flex items-start gap-3 shadow-xs">
              <span className="text-xl">❓</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Hỏi:</span>
                <span className="text-base font-black text-slate-900">
                  "How many <span className="text-emerald-700 underline">{curFacility.name}</span> are there at your school?"
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  (Trường bạn có bao nhiêu {curFacility.vi} vậy?)
                </span>
              </div>
            </div>

            {/* Answer Line */}
            <div className="p-3.5 rounded-xl bg-white border border-emerald-100 flex items-start gap-3 shadow-xs">
              <span className="text-xl">🔢</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Câu Trả Lời:</span>
                <span className="text-base font-black text-emerald-800">
                  {curFacility.verbType === 'singular'
                    ? `"There is one."`
                    : `"There are ${curFacility.quantity === 2 ? 'two' : 'three'}."`}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  ({curFacility.quantity === 1 ? 'Có một.' : `Có ${curFacility.quantity}.`})
                </span>
              </div>
            </div>

            {/* Read Button */}
            <button
              onClick={() => {
                speakWord(curFacility.sampleSentence, speechRate);
                sound.playCorrect();
                onAddStar(2);
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Volume2 className="w-5 h-5" />
              <span>Phát Âm Cả Cặp Câu Này (Track 61)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LET'S TALK */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
              Phần 3 • SGK Trang 46
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Let's talk • Khám phá toàn cảnh khuôn viên trường</span>
              <span className="text-2xl">🏫</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quan sát toàn cảnh bức tranh trường học (3 tòa nhà, 1 sân chơi có lưới bóng, 1 vườn trường, phòng máy tính) và hỏi đáp tự do.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-700 uppercase block">
              Chọn cơ sở vật chất bạn muốn hỏi:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'buildings', name: 'buildings (tòa nhà)', count: 3, icon: '🏢' },
                { id: 'playgrounds', name: 'playgrounds (sân chơi)', count: 1, icon: '🛝' },
                { id: 'gardens', name: 'gardens (vườn trường)', count: 1, icon: '🌷' },
                { id: 'computer rooms', name: 'computer rooms (phòng tin học)', count: 2, icon: '💻' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTalkFacility(opt.id);
                    setTalkQuantity(opt.count);
                    sound.playClick();
                  }}
                  className={`p-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    talkFacility === opt.id
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>

            {/* Conversation Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-lg">
                  🙋
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn hỏi:</span>
                  <div className="text-lg font-black text-slate-900">
                    "How many {talkFacility} are there at your school?"
                  </div>
                  <button
                    onClick={() =>
                      speakWord(`How many ${talkFacility} are there at your school?`, speechRate)
                    }
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện phát âm câu hỏi</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 font-black text-lg">
                  👦
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-400">Bạn học trả lời:</span>
                  <div className="text-lg font-black text-emerald-800">
                    {talkQuantity === 1
                      ? '"There is one."'
                      : `"There are ${talkQuantity === 2 ? 'two' : 'three'}."`}
                  </div>
                  <button
                    onClick={() =>
                      speakWord(
                        talkQuantity === 1
                          ? 'There is one.'
                          : `There are ${talkQuantity === 2 ? 'two' : 'three'}.`,
                        speechRate
                      )
                    }
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Luyện phát âm câu trả lời</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: LISTEN AND TICK (TRACK 62) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
                Phần 4 • SGK Trang 47
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Listen and tick</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  Track 62
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nghe 2 đoạn hội thoại và tích chọn tranh đúng (a hoặc b).
              </p>
            </div>

            <button
              onClick={() => {
                setListenTicks(prev => prev.map(item => ({ ...item, userChoice: null })));
                setTickChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listenTicks.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 relative hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-700 uppercase">
                    Câu Hỏi #{item.id}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(item.audioText, speechRate);
                      sound.playClick();
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe Băng #{item.id}</span>
                  </button>
                </div>

                <div className="text-sm font-black text-slate-900">{item.questionVi}</div>

                {/* 2 Options A & B */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {item.options.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setListenTicks(prev =>
                          prev.map(q =>
                            q.id === item.id ? { ...q, userChoice: opt.key } : q
                          )
                        );
                        sound.playClick();
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        item.userChoice === opt.key
                          ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-sm scale-105'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase">Tranh ({opt.key})</span>
                        <span className="text-xl">{opt.icon}</span>
                      </div>
                      <div className="text-xs font-bold mt-1">{opt.label}</div>
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {tickChecked && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      item.userChoice === item.correctAnswer
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.userChoice === item.correctAnswer
                      ? `✅ Chính xác! Lời thoại: "${item.audioText}"`
                      : `❌ Chưa đúng rồi! Đáp án đúng là tranh (${item.correctAnswer}). Băng đọc: "${item.audioText}"`}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setTickChecked(true);
                const allRight = listenTicks.every(q => q.userChoice === q.correctAnswer);
                if (allRight) {
                  sound.playVictory();
                  confetti({ particleCount: 50, spread: 60 });
                  onAddStar(3);
                } else {
                  sound.playCorrect();
                }
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Chấm Điểm Bài Nghe (Track 62)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LOOK, COMPLETE AND READ */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
              Phần 5 • SGK Trang 47
            </span>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Look, complete and read</span>
              <span className="text-2xl">✍️</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quan sát tranh và hoàn thành 2 đoạn hội thoại hỏi đáp về vị trí và số lượng cơ sở vật chất.
            </p>
          </div>

          <div className="space-y-4">
            {/* Conversation 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700">Đoạn 1 • Trường của Nam (miền núi, 1 sân chơi)</span>
                <span className="text-2xl">⛰️🛝</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1.5">
                <div>A: Nice to meet you, Nam. Where’s your school?</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: It’s in the</span>
                  <input
                    type="text"
                    value={fillAnswers.q1_loc}
                    onChange={e => setFillAnswers({ ...fillAnswers, q1_loc: e.target.value })}
                    placeholder="mountains"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 w-36 bg-white focus:outline-emerald-500"
                  />
                  <span>.</span>
                </div>
                <div>A: How many playgrounds are there at your school?</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: There is</span>
                  <input
                    type="text"
                    value={fillAnswers.q1_count}
                    onChange={e => setFillAnswers({ ...fillAnswers, q1_count: e.target.value })}
                    placeholder="one"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 w-28 bg-white focus:outline-emerald-500"
                  />
                  <span>.</span>
                </div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q1_loc.trim().toLowerCase() === 'mountains' &&
                  fillAnswers.q1_count.trim().toLowerCase() === 'one'
                    ? '✅ Đoạn 1 hoàn toàn chính xác: mountains & one'
                    : '👉 Đáp án chuẩn: mountains / one'}
                </div>
              )}
            </div>

            {/* Conversation 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700">Đoạn 2 • Trường có 3 tòa nhà và 1 vườn trường</span>
                <span className="text-2xl">🏢🌷</span>
              </div>
              <div className="text-sm font-black text-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>A:</span>
                  <input
                    type="text"
                    value={fillAnswers.q2_howmany}
                    onChange={e => setFillAnswers({ ...fillAnswers, q2_howmany: e.target.value })}
                    placeholder="How many"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 w-32 bg-white focus:outline-emerald-500"
                  />
                  <span>buildings are there at your school?</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>B: There are</span>
                  <input
                    type="text"
                    value={fillAnswers.q2_count}
                    onChange={e => setFillAnswers({ ...fillAnswers, q2_count: e.target.value })}
                    placeholder="three"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 w-28 bg-white focus:outline-emerald-500"
                  />
                  <span>.</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span>A: How many gardens</span>
                  <input
                    type="text"
                    value={fillAnswers.q2_arethere}
                    onChange={e => setFillAnswers({ ...fillAnswers, q2_arethere: e.target.value })}
                    placeholder="are there"
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 w-32 bg-white focus:outline-emerald-500"
                  />
                  <span>at your school?</span>
                </div>
                <div>B: There is one.</div>
              </div>
              {fillChecked && (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                  {fillAnswers.q2_howmany.trim().toLowerCase() === 'how many' &&
                  fillAnswers.q2_count.trim().toLowerCase() === 'three' &&
                  fillAnswers.q2_arethere.trim().toLowerCase() === 'are there'
                    ? '✅ Đoạn 2 hoàn toàn chính xác: How many, three, are there'
                    : '👉 Đáp án chuẩn: How many / three / are there'}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setFillChecked(true);
                sound.playVictory();
                confetti({ particleCount: 40, spread: 60 });
                onAddStar(3);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-sm"
            >
              Kiểm Tra Đáp Án Điền
            </button>
            <button
              onClick={() => {
                setFillAnswers({
                  q1_loc: '',
                  q1_count: '',
                  q2_howmany: '',
                  q2_count: '',
                  q2_arethere: ''
                });
                setFillChecked(false);
                sound.playClick();
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              Điền Lại
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: LET'S SING (TRACK 63) */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
                Phần 6 • SGK Trang 47
              </span>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Let's sing • Gardens and buildings at my school</span>
                <span className="text-2xl">🎵</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bấm vào từng câu thơ hoặc bấm nút phát toàn bài để hát theo giai điệu rộn ràng của bài ca trường học!
              </p>
            </div>

            <button
              onClick={() => {
                const fullSong = songLyrics.map(l => l.en).join('. ');
                speakWord(fullSong, speechRate);
                confetti({ particleCount: 40, spread: 50 });
                onAddStar(3);
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Hát Toàn Bài (Track 63)</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Music className="w-4 h-4 animate-bounce" />
                <span>Bấm vào từng dòng để luyện hát từng câu</span>
              </span>
              <span className="text-xs text-emerald-200 font-mono">BPM: 115 • Tươi vui</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {songLyrics.map((verse, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSingingLine(idx);
                    speakWord(verse.en, speechRate);
                    onAddStar(1);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1 ${
                    singingLine === idx
                      ? 'border-amber-400 bg-white/20 scale-[1.02] shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-300">
                      Line #{idx + 1}
                    </span>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-amber-300 font-bold">
                      {verse.rhyme}
                    </span>
                  </div>
                  <div className="text-base font-black text-white">{verse.en}</div>
                  <div className="text-xs text-emerald-200 font-medium">{verse.vi}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
