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
  Palmtree,
  Tent,
  Mountain,
  Waves,
  Music,
  CheckCircle,
  XCircle,
  Compass
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit10Lesson1StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson2?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit10Lesson1Studio: React.FC<Unit10Lesson1StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson2,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Core Practice Cards in Lesson 1 (Activity 2)
  const holidayPlaces = [
    {
      id: 'at_the_zoo_yes',
      place: 'at the zoo',
      placeVi: 'ở sở thú',
      ipa: '/æt ðə zuː/',
      reading: 'ét đờ zu',
      prep: 'at',
      type: 'yes',
      question: 'Were you at the zoo last weekend?',
      questionVi: 'Cuối tuần trước bạn có ở sở thú không?',
      answer: 'Yes, I was.',
      answerVi: 'Đúng vậy, tớ đã ở đó.',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-800',
      badgeBg: 'bg-emerald-600',
      icon: '🦒',
      desc: 'Cho hươu cao cổ ăn, ngắm voi và khỉ tinh nghịch'
    },
    {
      id: 'on_the_beach_no',
      place: 'on the beach',
      placeVi: 'ở bãi biển',
      ipa: '/ɒn ðə biːtʃ/',
      reading: 'on đờ bít-ch',
      prep: 'on',
      type: 'no',
      actualPlace: 'in the mountains',
      actualPlaceVi: 'ở vùng núi',
      question: 'Were you on the beach last weekend?',
      questionVi: 'Cuối tuần trước bạn có ở bãi biển không?',
      answer: "No, I wasn't. I was in the mountains.",
      answerVi: 'Không, tớ không ở đó. Tớ đã ở trên vùng núi.',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      icon: '🏖️',
      desc: 'Xây lâu đài cát, tắm biển và chơi bóng chuyền'
    },
    {
      id: 'at_the_campsite_yes',
      place: 'at the campsite',
      placeVi: 'ở khu cắm trại',
      ipa: '/æt ðə ˈkæmp.saɪt/',
      reading: 'ét đờ kem-xai-t',
      prep: 'at',
      type: 'yes',
      question: 'Were you at the campsite last weekend?',
      questionVi: 'Cuối tuần trước bạn có ở khu cắm trại không?',
      answer: 'Yes, I was.',
      answerVi: 'Có, tớ đã đi cắm trại.',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      icon: '⛺',
      desc: 'Dựng lều, đốt lửa trại và nướng kẹo dẻo'
    },
    {
      id: 'in_the_countryside_no',
      place: 'in the countryside',
      placeVi: 'ở vùng nông thôn / quê',
      ipa: '/ɪn ðə ˈkʌn.tri.saɪd/',
      reading: 'in đờ căn-tri-xai-đ',
      prep: 'in',
      type: 'no',
      actualPlace: 'at the zoo',
      actualPlaceVi: 'ở vườn bách thú',
      question: 'Were you in the countryside last weekend?',
      questionVi: 'Cuối tuần trước bạn có về vùng nông thôn không?',
      answer: "No, I wasn't. I was at the zoo.",
      answerVi: 'Không phải. Tớ đã ở sở thú.',
      color: 'bg-rose-50 border-rose-300 text-rose-800',
      badgeBg: 'bg-rose-600',
      icon: '🌾',
      desc: 'Cánh đồng lúa chín vàng, cối xay gió và đàn trâu thong dong'
    }
  ];

  // Selected Place for Let's Talk Section 3
  const [selectedTalkPlace, setSelectedTalkPlace] = useState<string>('at the campsite');

  // Activity 4: Listen and Tick State
  const [tickedOptions, setTickedOptions] = useState<{ [qId: number]: 'a' | 'b' | null }>({
    1: null,
    2: null
  });
  const [tickChecked, setTickChecked] = useState<boolean>(false);
  const correctTicks: { [qId: number]: 'a' | 'b' } = {
    1: 'b', // on the beach (volleyball)
    2: 'b'  // at the zoo (feeding giraffe)
  };

  // Activity 5: Look, complete and read state
  const [fillAnswers, setFillAnswers] = useState<{
    q1: string;
    q2: string;
    q3: string;
    q4a: string;
    q4b: string;
  }>({
    q1: '',
    q2: '',
    q3: '',
    q4a: '',
    q4b: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean>(false);

  // Activity 6: Karaoke Sing-Along State
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);
  const [karaokeLine, setKaraokeLine] = useState<number>(0);

  const songLyrics = [
    { en: 'Were you, were you,', vi: 'Bạn có, bạn có,' },
    { en: 'Were you on the beach?', vi: 'Bạn có ở trên bãi biển không?' },
    { en: 'Were you on the beach yesterday?', vi: 'Hôm qua bạn có ở bãi biển không?' },
    { en: 'Yes, I was. Yes, I was.', vi: 'Đúng vậy, đúng vậy.' },
    { en: 'I was on the beach yesterday.', vi: 'Hôm qua tớ đã ở bãi biển.' },
    { en: 'Were you, were you,', vi: 'Bạn có, bạn có,' },
    { en: 'Were you on the beach?', vi: 'Bạn có ở trên bãi biển không?' },
    { en: 'Were you on the beach yesterday?', vi: 'Hôm qua bạn có ở bãi biển không?' },
    { en: "No, I wasn't. No, I wasn't.", vi: 'Không, không phải đâu.' },
    { en: 'I was in the countryside yesterday.', vi: 'Hôm qua tớ đã ở vùng quê yên bình.' }
  ];

  const handlePlaySong = () => {
    setIsPlayingSong(true);
    sound.playClick();
    let current = 0;
    const interval = setInterval(() => {
      if (current < songLyrics.length) {
        setKaraokeLine(current);
        speakWord(songLyrics[current].en, speechRate);
        current++;
      } else {
        clearInterval(interval);
        setIsPlayingSong(false);
        sound.playVictory();
        confetti({ particleCount: 50 });
        onAddStar(3);
      }
    }, 2800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Palmtree className="w-4 h-4 text-emerald-200" />
              <span>Unit 10: Our summer holidays • Lesson 1 (Trang 68 - 69 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 1: Cuối Tuần Trước Bạn Ở Đâu?
            </h1>
            <p className="text-sm sm:text-base text-teal-50 max-w-2xl font-medium">
              Luyện hỏi - đáp xem cuối tuần vừa qua bạn có ở một địa điểm nào không (sở thú, bãi biển, khu cắm trại, miền quê): <br className="hidden sm:inline" />
              <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded-lg inline-block mt-1">
                "Were you in the countryside last weekend?" — "Yes, I was." / "No, I wasn't."
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowParentGuides(!showParentGuides)}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 border border-white/30"
            >
              <Lightbulb className="w-4 h-4 text-yellow-200" />
              <span>{showParentGuides ? 'Ẩn Cẩm Nang Bố Mẹ' : 'Hiện Cẩm Nang Bố Mẹ'}</span>
            </button>
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="px-4 py-2.5 bg-white text-teal-700 hover:bg-teal-50 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Học Tiết 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '💬' },
          { id: 2, label: '2. Listen, point & say', icon: '👉' },
          { id: 3, label: '3. Let’s talk (4 Địa điểm)', icon: '🗺️' },
          { id: 4, label: '4. Listen & tick', icon: '🎧' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: '6. Sing: On the beach', icon: '🎤' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-teal-600 text-white shadow-md scale-102 ring-2 ring-teal-400/30'
                : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 97) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                💬
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Look, listen and repeat (Track 97 SGK Trang 68)
                </h3>
                <p className="text-xs text-slate-500">
                  Quan sát hai bạn nhỏ ngồi trên ghế đá công viên chia sẻ về kỳ nghỉ cuối tuần đã qua
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("I was in the countryside last weekend. That's great! Were you in the countryside last weekend? No, I wasn't. I was in the mountains.", speechRate);
                onAddStar(1);
              }}
              className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Toàn Bộ Đoạn Văn</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Picture a */}
            <div className="bg-gradient-to-b from-teal-50/60 to-white rounded-2xl border-2 border-teal-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-teal-600 text-white rounded-lg text-xs font-black">
                  Tranh a
                </span>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🌾 Cánh đồng quê & cối xay gió
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-700">Bạn nam (tóc cam):</span>
                    <button
                      onClick={() => speakWord('I was in the countryside last weekend.', speechRate)}
                      className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "I was in the countryside last weekend."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Cuối tuần trước tớ đã ở miền quê.)
                  </p>
                  <p className="text-[11px] text-teal-600 font-mono">
                    🗣️ /aɪ wɒz ɪn ðə ˈkʌn.tri.saɪd lɑːst ˌwiːkˈend/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700">Bạn nữ (áo hồng):</span>
                    <button
                      onClick={() => speakWord("That's great!", speechRate)}
                      className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "That's great!"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Tuyệt vời quá!)
                  </p>
                  <p className="text-[11px] text-emerald-600 font-mono">
                    🗣️ /ðæts ɡreɪt/
                  </p>
                </div>
              </div>
            </div>

            {/* Picture b */}
            <div className="bg-gradient-to-b from-cyan-50/60 to-white rounded-2xl border-2 border-cyan-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-cyan-600 text-white rounded-lg text-xs font-black">
                  Tranh b
                </span>
                <span className="text-xs font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🏔️ Vùng núi cao mây trắng
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-cyan-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-700">Bạn nam hỏi:</span>
                    <button
                      onClick={() => speakWord('Were you in the countryside last weekend?', speechRate)}
                      className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Were you in the countryside last weekend?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Cuối tuần trước bạn cũng ở miền quê à?)
                  </p>
                  <p className="text-[11px] text-teal-600 font-mono">
                    🗣️ /wɜːr juː ɪn ðə ˈkʌn.tri.saɪd lɑːst ˌwiːkˈend/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cyan-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-700">Bạn nữ đáp:</span>
                    <button
                      onClick={() => speakWord("No, I wasn't. I was in the mountains.", speechRate)}
                      className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "No, I wasn't. I was in the mountains."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Không, tớ không ở đó. Tớ đã ở trên vùng núi cao.)
                  </p>
                  <p className="text-[11px] text-cyan-600 font-mono">
                    🗣️ /nəʊ, aɪ ˈwɒz.ənt. aɪ wɒz ɪn ðə ˈmaʊn.tɪnz/
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Flashcard Box */}
          <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-black text-teal-900 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-teal-600" /> Ngữ Pháp Quá Khứ Đơn (To Be: was / were)
              </span>
              <p className="text-xs text-teal-950">
                • Hỏi: <strong>Were you [ở đâu] last weekend?</strong> ➔ Đáp đúng: <strong>Yes, I was.</strong>
                <br />
                • Đáp sai: <strong>No, I wasn't. I was [ở địa điểm thực tế].</strong>
                <br />
                • <em>Ghi nhớ giới từ:</em> <strong>at</strong> the zoo / <strong>at</strong> the campsite; <strong>on</strong> the beach; <strong>in</strong> the countryside / <strong>in</strong> the mountains.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playVictory();
                onAddStar(2);
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shrink-0 self-start sm:self-auto shadow-sm"
            >
              ⭐ Nhận 2 Sao Ghi Nhớ
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT AND SAY (TRACK 98) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                👉
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen, point and say (Track 98 SGK Trang 68)
                </h3>
                <p className="text-xs text-slate-500">
                  Luyện tập 4 địa điểm nghỉ mát quen thuộc với giới từ đi kèm: at / on / in
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {holidayPlaces.map(item => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border-2 ${item.color} space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className={`px-2.5 py-1 ${item.badgeBg} text-white rounded-lg text-xs font-black tracking-wide`}>
                      Giới từ: "{item.prep}"
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black">{item.place} ({item.placeVi})</h4>
                    <p className="text-xs opacity-75 font-mono">{item.ipa} • Đọc là: "{item.reading}"</p>
                    <p className="text-xs text-slate-600 mt-1 italic">{item.desc}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-black/10 space-y-1.5 text-xs text-slate-800">
                    <div className="font-bold flex items-center justify-between">
                      <span>❓ {item.question}</span>
                      <button
                        onClick={() => speakWord(item.question, speechRate)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                      </button>
                    </div>
                    <div className="font-black text-teal-700 flex items-center justify-between">
                      <span>💬 {item.answer}</span>
                      <button
                        onClick={() => speakWord(item.answer, speechRate)}
                        className="p-1 bg-teal-100 hover:bg-teal-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">
                      Dịch: {item.answerVi}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[11px]">
                    {item.type === 'yes' ? '✅ Khẳng định (Yes, I was)' : '❌ Phủ định (No, I wasn\'t)'}
                  </span>
                  <button
                    onClick={() => {
                      speakWord(`${item.question} ${item.answer}`, speechRate);
                      onAddStar(1);
                    }}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg shadow-2xs border border-slate-200 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 text-teal-600" />
                    <span>Luyện Nghe Cặp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                🗺️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s talk — 4 Địa Điểm Nghỉ Dưỡng (SGK Trang 68)
                </h3>
                <p className="text-xs text-slate-500">
                  Chọn địa điểm và đóng vai bạn nam & bạn nữ cùng hỏi đáp về kỳ nghỉ cuối tuần
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'at the campsite', name: 'at the campsite', vi: 'khu cắm trại', icon: '⛺' },
              { id: 'on the beach', name: 'on the beach', vi: 'bãi biển', icon: '🏖️' },
              { id: 'at the zoo', name: 'at the zoo', vi: 'vườn thú', icon: '🦁' },
              { id: 'in the countryside', name: 'in the countryside', vi: 'vùng quê', icon: '🌾' }
            ].map(place => {
              const isSelected = selectedTalkPlace === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTalkPlace(place.id);
                    speakWord(place.id, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-600 text-white shadow-md scale-103 font-black'
                      : 'border-slate-200 bg-white hover:bg-teal-50 text-slate-800'
                  }`}
                >
                  <span className="text-2xl block mb-1">{place.icon}</span>
                  <div className="font-black text-sm">{place.name}</div>
                  <div className={`text-xs ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>{place.vi}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border-2 border-teal-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200 pb-3">
              <span className="text-xs font-black text-teal-900 uppercase tracking-wide flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-600" />
                Đang thực hành với: <strong>{selectedTalkPlace}</strong>
              </span>
              <button
                onClick={() => {
                  speakWord(`Were you ${selectedTalkPlace} last weekend? Yes, I was.`, speechRate);
                  onAddStar(1);
                }}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold self-start sm:self-auto flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Mẫu Đối Thoại</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-2xs space-y-2">
                <span className="text-xs font-black text-teal-700">Mẫu 1 (Có đi - Yes):</span>
                <p className="font-bold text-slate-900">
                  A: "Were you {selectedTalkPlace} last weekend?"
                </p>
                <p className="font-black text-emerald-600">
                  B: "Yes, I was."
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-2xs space-y-2">
                <span className="text-xs font-black text-cyan-700">Mẫu 2 (Không đi - No):</span>
                <p className="font-bold text-slate-900">
                  A: "Were you {selectedTalkPlace} last weekend?"
                </p>
                <p className="font-black text-rose-600">
                  B: "No, I wasn't. I was in the mountains."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND TICK (TRACK 99) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                🎧
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Listen and tick (Track 99 SGK Trang 69)
                </h3>
                <p className="text-xs text-slate-500">
                  Nghe đoạn audio Track 99 và tích chọn bức tranh đúng a hoặc b
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: Were you on the beach last weekend? Yes, I was. Number two: Were you at the zoo yesterday? Yes, I was.", speechRate);
              }}
              className="px-3.5 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Audio Track 99</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Câu 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 1:</span>
                <button
                  onClick={() => speakWord("Were you on the beach last weekend? Yes, I was.", speechRate)}
                  className="p-1.5 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 1</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'a' as const, label: 'a. Thả diều ở công viên', icon: '🪁' },
                  { key: 'b' as const, label: 'b. Bãi biển chơi bóng chuyền', icon: '🏐' }
                ].map(opt => {
                  const isSelected = tickedOptions[1] === opt.key;
                  const isCorrect = opt.key === correctTicks[1];
                  const showResult = tickChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setTickedOptions(prev => ({ ...prev, 1: opt.key }));
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{opt.icon}</span>
                      <span className="text-xs font-black">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Câu 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 2:</span>
                <button
                  onClick={() => speakWord("Were you at the zoo yesterday? Yes, I was.", speechRate)}
                  className="p-1.5 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe câu 2</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'a' as const, label: 'a. Picnic dã ngoại', icon: '🧺' },
                  { key: 'b' as const, label: 'b. Cho hươu ăn ở sở thú', icon: '🦒' }
                ].map(opt => {
                  const isSelected = tickedOptions[2] === opt.key;
                  const isCorrect = opt.key === correctTicks[2];
                  const showResult = tickChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setTickedOptions(prev => ({ ...prev, 2: opt.key }));
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800 font-black'
                          : isSelected
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{opt.icon}</span>
                      <span className="text-xs font-black">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setTickChecked(true);
                if (tickedOptions[1] === correctTicks[1] && tickedOptions[2] === correctTicks[2]) {
                  sound.playVictory();
                  confetti({ particleCount: 40 });
                  onAddStar(3);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án Nghe</span>
            </button>

            <button
              onClick={() => {
                setTickedOptions({ 1: null, 2: null });
                setTickChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LOOK, COMPLETE AND READ ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Look, complete and read (SGK Trang 69)
                </h3>
                <p className="text-xs text-slate-500">
                  Nhìn 4 bức ảnh chụp kỳ nghỉ và điền từ vào chỗ trống
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Câu 1 */}
            <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-black text-teal-800">1. Ảnh: Cậu bé ngồi trước lều trại</span>
              <p className="text-sm font-bold text-slate-800">
                1. I was at the{' '}
                <input
                  type="text"
                  placeholder="campsite"
                  value={fillAnswers.q1}
                  onChange={e => setFillAnswers({ ...fillAnswers, q1: e.target.value })}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-28"
                />{' '}
                yesterday.
              </p>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: <strong>"campsite"</strong>
                </p>
              )}
            </div>

            {/* Câu 2 */}
            <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-black text-teal-800">2. Ảnh: Cho hươu cao cổ ăn ở sở thú</span>
              <p className="text-sm font-bold text-slate-800">
                2. I was{' '}
                <input
                  type="text"
                  placeholder="at the zoo"
                  value={fillAnswers.q2}
                  onChange={e => setFillAnswers({ ...fillAnswers, q2: e.target.value })}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-32"
                />{' '}
                last weekend.
              </p>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: <strong>"at the zoo"</strong>
                </p>
              )}
            </div>

            {/* Câu 3 */}
            <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-black text-teal-800">3. Ảnh: Dắt trâu ở đồng cỏ nông thôn</span>
              <p className="text-sm font-bold text-slate-800">
                3. A: Were you in the mountains last weekend?
                <br />
                &nbsp;&nbsp;&nbsp;B: No, I wasn't. I was in{' '}
                <input
                  type="text"
                  placeholder="the countryside"
                  value={fillAnswers.q3}
                  onChange={e => setFillAnswers({ ...fillAnswers, q3: e.target.value })}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-36"
                />
                .
              </p>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: <strong>"the countryside"</strong>
                </p>
              )}
            </div>

            {/* Câu 4 */}
            <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-black text-teal-800">4. Ảnh: Cậu bé cầm bóng chơi trên bờ biển</span>
              <p className="text-sm font-bold text-slate-800">
                4. A:{' '}
                <input
                  type="text"
                  placeholder="Were"
                  value={fillAnswers.q4a}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4a: e.target.value })}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-18"
                />{' '}
                you on the beach yesterday?
                <br />
                &nbsp;&nbsp;&nbsp;B:{' '}
                <input
                  type="text"
                  placeholder="Yes"
                  value={fillAnswers.q4b}
                  onChange={e => setFillAnswers({ ...fillAnswers, q4b: e.target.value })}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-16"
                />
                , I was.
              </p>
              {fillChecked && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án: Ô 1: <strong>"Were"</strong> • Ô 2: <strong>"Yes"</strong>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFillChecked(true);
                const q1Ok = fillAnswers.q1.trim().toLowerCase().includes('campsite');
                const q2Ok = fillAnswers.q2.trim().toLowerCase().includes('zoo');
                const q3Ok = fillAnswers.q3.trim().toLowerCase().includes('countryside');
                const q4aOk = fillAnswers.q4a.trim().toLowerCase() === 'were';
                const q4bOk = fillAnswers.q4b.trim().toLowerCase() === 'yes';
                if (q1Ok && q2Ok && q3Ok && q4aOk && q4bOk) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Bài Tập</span>
            </button>

            <button
              onClick={() => {
                setFillAnswers({
                  q1: 'campsite',
                  q2: 'at the zoo',
                  q3: 'the countryside',
                  q4a: 'Were',
                  q4b: 'Yes'
                });
                setFillChecked(true);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-teal-700 hover:text-teal-900 font-bold"
            >
              Xem đáp án mẫu
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: LET'S SING (TRACK 100) ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl text-xl font-black">
                🎤
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Let’s sing — "Were you on the beach yesterday?" (Track 100 SGK Trang 69)
                </h3>
                <p className="text-xs text-slate-500">
                  Bài hát mùa hè sôi động về lâu đài cát, bãi biển và đồng quê thanh bình
                </p>
              </div>
            </div>
            <button
              onClick={handlePlaySong}
              disabled={isPlayingSong}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                isPlayingSong
                  ? 'bg-slate-200 text-slate-500'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>{isPlayingSong ? 'Đang Hát Theo Nhịp...' : 'Bật Hát Karaoke'}</span>
            </button>
          </div>

          <div className="bg-gradient-to-b from-teal-50 via-cyan-50 to-emerald-50 rounded-2xl p-6 border-2 border-teal-200 space-y-4 text-center">
            <div className="space-y-3 max-w-xl mx-auto">
              {songLyrics.map((line, idx) => {
                const isCurrent = isPlayingSong && karaokeLine === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-teal-600 text-white shadow-md scale-103 font-black text-base sm:text-lg ring-4 ring-teal-300'
                        : 'text-slate-700 text-sm font-bold'
                    }`}
                  >
                    <p>{line.en}</p>
                    <p className={`text-xs ${isCurrent ? 'text-teal-100' : 'text-slate-400 font-normal italic'}`}>
                      {line.vi}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-3xl p-5 sm:p-6 border-2 border-teal-200 space-y-4">
          <div className="flex items-center gap-2 text-teal-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-teal-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 1 (Lesson 1)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-teal-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-teal-700">1. Động Từ To Be Quá Khứ:</span>
              <p>
                • Với "you": dùng <strong>Were you...?</strong>
                <br />
                • Trả lời với "I": dùng <strong>Yes, I was.</strong> / <strong>No, I wasn't.</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-teal-700">2. Giới Từ Đi Kèm Nơi Chốn:</span>
              <p>
                • <strong>at</strong> the zoo / campsite (địa điểm cụ thể)
                <br />
                • <strong>on</strong> the beach (bề mặt bãi biển)
                <br />
                • <strong>in</strong> the countryside / mountains (không gian rộng lớn)
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-teal-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-teal-700">3. Thực Hành Thực Tế:</span>
              <p>
                Mỗi sáng thứ Hai, bố mẹ hãy hỏi con: <em>"Were you at the zoo last weekend?"</em> để con rèn phản xạ nói tiếng Anh tự nhiên.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
