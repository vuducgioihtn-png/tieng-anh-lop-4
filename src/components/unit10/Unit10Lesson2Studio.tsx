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
  Globe,
  Plane,
  Building2,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit10Lesson2StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson3?: () => void;
}

export const Unit10Lesson2Studio: React.FC<Unit10Lesson2StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson3
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // 4 Famous World Cities in Lesson 2
  const worldCities = [
    {
      id: 'london',
      city: 'London',
      country: 'Vương quốc Anh (UK)',
      landmark: 'Tháp đồng hồ Big Ben & Vòng quay London Eye',
      ipa: '/ˈlʌn.dən/',
      reading: 'Lăn-đần',
      icon: '🇬🇧',
      color: 'bg-red-50 border-red-300 text-red-800',
      badgeBg: 'bg-red-600',
      sentence: 'Where were you last summer? - I was in London.',
      desc: 'Thủ đô sầm uất với xe buýt hai tầng đỏ rực rỡ và sông Thames thơ mộng.'
    },
    {
      id: 'sydney',
      city: 'Sydney',
      country: 'Nước Úc (Australia)',
      landmark: 'Nhà hát Con Sò (Sydney Opera House) & Cầu Cảng',
      ipa: '/ˈsɪd.ni/',
      reading: 'Xít-ni',
      icon: '🇦🇺',
      color: 'bg-sky-50 border-sky-300 text-sky-800',
      badgeBg: 'bg-sky-600',
      sentence: 'Where were you last summer? - I was in Sydney.',
      desc: 'Thành phố cảng biển ngập tràn ánh nắng và kiến trúc cánh buồm trắng huyền thoại.'
    },
    {
      id: 'tokyo',
      city: 'Tokyo',
      country: 'Nhật Bản (Japan)',
      landmark: 'Tháp truyền hình Tokyo Tower & Cổng Torii',
      ipa: '/ˈtəʊ.kjoʊ/',
      reading: 'Tâu-ki-ô',
      icon: '🇯🇵',
      color: 'bg-rose-50 border-rose-300 text-rose-800',
      badgeBg: 'bg-rose-600',
      sentence: 'Where were you last summer? - I was in Tokyo.',
      desc: 'Thủ đô hiện đại bậc nhất thế giới với công nghệ tương lai và hoa anh đào nở rộ.'
    },
    {
      id: 'bangkok',
      city: 'Bangkok',
      country: 'Thái Lan (Thailand)',
      landmark: 'Cung điện Hoàng Gia Grand Palace & Chùa Vàng',
      ipa: '/bæŋˈkɒk/',
      reading: 'Băng-cốc',
      icon: '🇹🇭',
      color: 'bg-amber-50 border-amber-300 text-amber-800',
      badgeBg: 'bg-amber-600',
      sentence: 'Where were you last summer? - I was in Bangkok.',
      desc: 'Xứ sở chùa vàng với kiến trúc đền tháp nguy nga lấp lánh và ẩm thực đường phố phong phú.'
    }
  ];

  // Selected City for Let's Talk Section 3
  const [selectedCityTalk, setSelectedCityTalk] = useState<string>('Tokyo');

  // Activity 4: Listen and Match State (Mai, Ben, Lucy, Nam)
  const [matchedCities, setMatchedCities] = useState<{ [personId: number]: string }>({});
  const [matchChecked, setMatchChecked] = useState<boolean>(false);
  const correctCityMatches: { [personId: number]: string } = {
    1: 'b', // Mai ➔ London
    2: 'c', // Ben ➔ Bangkok
    3: 'a', // Lucy ➔ Tokyo
    4: 'd'  // Nam ➔ Sydney
  };

  // Activity 5: Look, complete and read state
  const [fillAnswers2, setFillAnswers2] = useState<{
    d1_a: string;
    d1_b: string;
    d2_a: string;
    d2_b: string;
    d2_c: string;
  }>({
    d1_a: '',
    d1_b: '',
    d2_a: '',
    d2_b: '',
    d2_c: ''
  });
  const [fillChecked2, setFillChecked2] = useState<boolean>(false);

  // Activity 6: Making Sentences Interactive Game
  const [scrambledWords, setScrambledWords] = useState<string[]>([
    'summer?', 'were', 'Where', 'last', 'you'
  ]);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [isSentenceRight, setIsSentenceRight] = useState<boolean | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Globe className="w-4 h-4 text-sky-200" />
              <span>Unit 10: Our summer holidays • Lesson 2 (Trang 70 - 71 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 2: Mùa Hè Vừa Qua Bạn Ở Đâu?
            </h1>
            <p className="text-sm sm:text-base text-sky-100 max-w-2xl font-medium">
              Chuyến du ngoạn khám phá 4 thành phố nổi tiếng thế giới (London, Sydney, Tokyo, Bangkok): <br className="hidden sm:inline" />
              <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded-lg inline-block mt-1">
                "Where were you last summer?" — "I was in London / Sydney / Tokyo / Bangkok."
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>⬅️ Quay Lại Tiết 1</span>
              </button>
            )}
            {onSwitchToLesson3 && (
              <button
                onClick={onSwitchToLesson3}
                className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Học Tiết 3 (Phonics)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Look, listen & repeat', icon: '🗼' },
          { id: 2, label: '2. Listen, point & say', icon: '✈️' },
          { id: 3, label: '3. Let’s talk (4 Thủ đô)', icon: '💬' },
          { id: 4, label: '4. Listen & match', icon: '🎧' },
          { id: 5, label: '5. Complete & read', icon: '✍️' },
          { id: 6, label: '6. Game: Making sentences', icon: '🧩' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white shadow-md scale-102 ring-2 ring-blue-400/30'
                : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: LOOK, LISTEN AND REPEAT (TRACK 101) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                🗼
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Look, listen and repeat (Track 101 SGK Trang 70)
                </h3>
                <p className="text-xs text-slate-500">
                  Cuộc trò chuyện giữa Nam và Mary trước sân trường về kỳ nghỉ hè năm ngoái
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Were you in London last summer, Mary? No, I wasn't. Where were you last summer? I was in Tokyo.", speechRate);
                onAddStar(1);
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Cả Đoạn</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tranh a */}
            <div className="bg-gradient-to-b from-blue-50/60 to-white rounded-2xl border-2 border-blue-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-black">
                  Tranh a
                </span>
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🇬🇧 Câu hỏi: London?
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700">Nam hỏi:</span>
                    <button
                      onClick={() => speakWord('Were you in London last summer, Mary?', speechRate)}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Were you in London last summer, Mary?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Mùa hè năm ngoái bạn có ở Luân Đôn không hả Mary?)
                  </p>
                  <p className="text-[11px] text-blue-600 font-mono">
                    🗣️ /wɜːr juː ɪn ˈlʌn.dən lɑːst ˈsʌm.ər, ˈmeə.ri/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-700">Mary đáp:</span>
                    <button
                      onClick={() => speakWord("No, I wasn't.", speechRate)}
                      className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "No, I wasn't."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Không, tớ không ở đó.)
                  </p>
                  <p className="text-[11px] text-indigo-600 font-mono">
                    🗣️ /nəʊ, aɪ ˈwɒz.ənt/
                  </p>
                </div>
              </div>
            </div>

            {/* Tranh b */}
            <div className="bg-gradient-to-b from-indigo-50/60 to-white rounded-2xl border-2 border-indigo-200/80 p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-black">
                  Tranh b
                </span>
                <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  🗼 Bong bóng suy nghĩ: Tokyo Tower
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700">Nam hỏi tiếp:</span>
                    <button
                      onClick={() => speakWord('Where were you last summer?', speechRate)}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "Where were you last summer?"
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Vậy mùa hè năm ngoái bạn đã ở đâu thế?)
                  </p>
                  <p className="text-[11px] text-blue-600 font-mono">
                    🗣️ /weər wɜːr juː lɑːst ˈsʌm.ər/
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-700">Mary hào hứng:</span>
                    <button
                      onClick={() => speakWord('I was in Tokyo.', speechRate)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe</span>
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    "I was in Tokyo."
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    (Tớ đã đi du lịch ở Tokyo, Nhật Bản.)
                  </p>
                  <p className="text-[11px] text-rose-600 font-mono">
                    🗣️ /aɪ wɒz ɪn ˈtəʊ.kjoʊ/
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN, POINT AND SAY (TRACK 102) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                ✈️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen, point and say (Track 102 SGK Trang 70)
                </h3>
                <p className="text-xs text-slate-500">
                  Khám phá 4 thành phố du lịch quốc tế: London, Sydney, Tokyo, Bangkok
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {worldCities.map(item => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border-2 ${item.color} space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className={`px-2.5 py-1 ${item.badgeBg} text-white rounded-lg text-xs font-black tracking-wide`}>
                      {item.country}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black">{item.city}</h4>
                    <p className="text-xs opacity-75 font-mono">{item.ipa} • Đọc là: "{item.reading}"</p>
                    <p className="text-xs font-medium text-slate-600 mt-1">🏛️ Biểu tượng: {item.landmark}</p>
                    <p className="text-xs text-slate-500 italic mt-0.5">{item.desc}</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-black/10 space-y-2 text-xs text-slate-800">
                    <div className="font-bold flex items-center justify-between">
                      <span>❓ Where were you last summer?</span>
                      <button
                        onClick={() => speakWord('Where were you last summer?', speechRate)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                      </button>
                    </div>
                    <div className="font-black text-blue-700 flex items-center justify-between">
                      <span>💬 I was in {item.city}.</span>
                      <button
                        onClick={() => speakWord(`I was in ${item.city}.`, speechRate)}
                        className="p-1 bg-blue-100 hover:bg-blue-200 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-blue-700" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[11px] text-slate-600">
                    Cấu trúc: <strong>in + Tên thành phố</strong>
                  </span>
                  <button
                    onClick={() => {
                      speakWord(item.sentence, speechRate);
                      onAddStar(1);
                    }}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg shadow-2xs border border-slate-200 flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 text-blue-600" />
                    <span>Luyện Đọc Cả Câu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S TALK ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                💬
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s talk (SGK Trang 70)
                </h3>
                <p className="text-xs text-slate-500">
                  Đóng vai bạn bè trò chuyện ở quán cafe ngoài trời về điểm đến mùa hè
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {worldCities.map(c => {
              const isSelected = selectedCityTalk === c.city;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCityTalk(c.city);
                    speakWord(c.city, speechRate);
                  }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md scale-103 font-black'
                      : 'border-slate-200 bg-white hover:bg-blue-50 text-slate-800'
                  }`}
                >
                  <span className="text-3xl block mb-1">{c.icon}</span>
                  <div className="font-black text-base">{c.city}</div>
                  <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>{c.country}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-900 uppercase">Đối Thoại Mẫu:</span>
              <button
                onClick={() => {
                  speakWord(`Where were you last summer? I was in ${selectedCityTalk}.`, speechRate);
                  onAddStar(1);
                }}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Mẫu Với {selectedCityTalk}</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-blue-200 text-sm space-y-2">
              <p className="font-bold text-slate-800">
                A: "Where were you last summer?"
              </p>
              <p className="font-black text-blue-700">
                B: "I was in {selectedCityTalk}."
              </p>
              <p className="text-xs text-slate-500 italic">
                (Mùa hè năm ngoái bạn ở đâu? - Tớ đã đi du lịch ở {selectedCityTalk}.)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: LISTEN AND MATCH (TRACK 103) ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                🎧
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Listen and match (Track 103 SGK Trang 71)
                </h3>
                <p className="text-xs text-slate-500">
                  Nghe đoạn audio và nối 4 bạn nhỏ: 1. Mai, 2. Ben, 3. Lucy, 4. Nam với thành phố tương ứng
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: Where were you last summer, Mai? I was in London. Number two: Where were you last summer, Ben? I was in Bangkok. Number three: Where were you last summer, Lucy? I was in Tokyo. Number four: Where were you last summer, Nam? I was in Sydney.", speechRate);
              }}
              className="px-3.5 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Track 103</span>
            </button>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, name: '1. Bạn Mai (Tóc buộc cao, áo hồng)', audio: 'Where were you last summer, Mai? - I was in London.' },
              { id: 2, name: '2. Bạn Ben (Tóc xoăn cam, áo xanh lá)', audio: 'Where were you last summer, Ben? - I was in Bangkok.' },
              { id: 3, name: '3. Bạn Lucy (Tóc vàng xoăn, váy đỏ)', audio: 'Where were you last summer, Lucy? - I was in Tokyo.' },
              { id: 4, name: '4. Bạn Nam (Áo vàng)', audio: 'Where were you last summer, Nam? - I was in Sydney.' }
            ].map(person => (
              <div
                key={person.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speakWord(person.audio, speechRate)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="font-black text-slate-900 text-sm">{person.name}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { key: 'a', label: 'a. Tokyo (🗼)', icon: '🇯🇵' },
                    { key: 'b', label: 'b. London (🕰️)', icon: '🇬🇧' },
                    { key: 'c', label: 'c. Bangkok (🏛️)', icon: '🇹🇭' },
                    { key: 'd', label: 'd. Sydney (⛵)', icon: '🇦🇺' }
                  ].map(cityOpt => {
                    const isChosen = matchedCities[person.id] === cityOpt.key;
                    const isCorrect = isChosen && correctCityMatches[person.id] === cityOpt.key;
                    const isWrong = isChosen && matchChecked && !isCorrect;

                    return (
                      <button
                        key={cityOpt.key}
                        onClick={() => {
                          sound.playClick();
                          setMatchedCities(prev => ({ ...prev, [person.id]: cityOpt.key }));
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isWrong
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : isCorrect && matchChecked
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-black'
                            : isChosen
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-black'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {cityOpt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setMatchChecked(true);
                const isAllRight = Object.keys(correctCityMatches).every(
                  k => matchedCities[parseInt(k, 10)] === correctCityMatches[parseInt(k, 10)]
                );
                if (isAllRight) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Nối Thành Phố</span>
            </button>

            <button
              onClick={() => {
                setMatchedCities({});
                setMatchChecked(false);
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
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Look, complete and read (SGK Trang 71)
                </h3>
                <p className="text-xs text-slate-500">
                  Nhìn ảnh chụp Mai (ở Big Ben) và Nam (ở Sydney Opera House) rồi hoàn thành câu
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Dialogue 1 */}
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200 space-y-3">
              <span className="text-xs font-black text-blue-900">1. Mai đứng trên cầu ngắm tháp Big Ben (London):</span>
              <div className="text-sm font-bold text-slate-800 space-y-2">
                <p>
                  A: Where were you last summer, Mai?
                  <br />
                  B: I was in{' '}
                  <input
                    type="text"
                    placeholder="London"
                    value={fillAnswers2.d1_a}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d1_a: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-24"
                  />
                  .
                  <br />
                  A: Is it a big city?
                  <br />
                  B:{' '}
                  <input
                    type="text"
                    placeholder="Yes"
                    value={fillAnswers2.d1_b}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d1_b: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-16"
                  />
                  , it is.
                </p>
              </div>
              {fillChecked2 && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án chuẩn: Ô 1 điền <strong>"London"</strong> • Ô 2 điền <strong>"Yes"</strong>
                </p>
              )}
            </div>

            {/* Dialogue 2 */}
            <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-200 space-y-3">
              <span className="text-xs font-black text-sky-900">2. Nam đứng trước Nhà hát Con Sò (Sydney):</span>
              <div className="text-sm font-bold text-slate-800 space-y-2">
                <p>
                  A:{' '}
                  <input
                    type="text"
                    placeholder="Where"
                    value={fillAnswers2.d2_a}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_a: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-20"
                  />{' '}
                  were you last summer, Nam?
                  <br />
                  B: I{' '}
                  <input
                    type="text"
                    placeholder="was"
                    value={fillAnswers2.d2_b}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_b: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-16"
                  />{' '}
                  in Sydney. Were you in Sydney, too?
                  <br />
                  A:{' '}
                  <input
                    type="text"
                    placeholder="No"
                    value={fillAnswers2.d2_c}
                    onChange={e => setFillAnswers2({ ...fillAnswers2, d2_c: e.target.value })}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-black w-16"
                  />
                  , I wasn't.
                </p>
              </div>
              {fillChecked2 && (
                <p className="text-xs font-bold text-emerald-700">
                  Đáp án chuẩn: Ô 1: <strong>"Where"</strong> • Ô 2: <strong>"was"</strong> • Ô 3: <strong>"No"</strong>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFillChecked2(true);
                const d1_aOk = fillAnswers2.d1_a.trim().toLowerCase() === 'london';
                const d1_bOk = fillAnswers2.d1_b.trim().toLowerCase() === 'yes';
                const d2_aOk = fillAnswers2.d2_a.trim().toLowerCase() === 'where';
                const d2_bOk = fillAnswers2.d2_b.trim().toLowerCase() === 'was';
                const d2_cOk = fillAnswers2.d2_c.trim().toLowerCase() === 'no';
                if (d1_aOk && d1_bOk && d2_aOk && d2_bOk && d2_cOk) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Bài Tập</span>
            </button>

            <button
              onClick={() => {
                setFillAnswers2({
                  d1_a: 'London',
                  d1_b: 'Yes',
                  d2_a: 'Where',
                  d2_b: 'was',
                  d2_c: 'No'
                });
                setFillChecked2(true);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-blue-700 hover:text-blue-900 font-bold"
            >
              Xem đáp án mẫu
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: GAME MAKING SENTENCES ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-blue-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-blue-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl text-xl font-black">
                🧩
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Let’s play — "Making sentences" (Xếp thẻ ghép câu · SGK Trang 71)
                </h3>
                <p className="text-xs text-slate-500">
                  Bấm lần lượt vào các thẻ chữ để tạo thành câu hỏi hoàn chỉnh: <em>"Where were you last summer?"</em>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 text-center space-y-5">
            {/* Built sentence area */}
            <div className="min-h-16 bg-white p-4 rounded-2xl border-2 border-dashed border-blue-300 flex items-center justify-center gap-2 flex-wrap shadow-inner">
              {builtWords.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium">Bấm chọn thẻ chữ ở dưới để ghép câu vào đây...</span>
              ) : (
                builtWords.map((w, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-sm font-black shadow-xs"
                  >
                    {w}
                  </span>
                ))
              )}
            </div>

            {/* Word choices */}
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              {scrambledWords.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setBuiltWords([...builtWords, w]);
                    setScrambledWords(scrambledWords.filter((_, i) => i !== idx));
                  }}
                  className="px-4 py-2.5 bg-white hover:bg-blue-100 text-slate-800 font-black rounded-xl border border-slate-300 shadow-xs hover:scale-105 transition-all text-sm"
                >
                  {w}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  const result = builtWords.join(' ');
                  if (result === 'Where were you last summer?') {
                    setIsSentenceRight(true);
                    sound.playVictory();
                    confetti({ particleCount: 50 });
                    onAddStar(5);
                  } else {
                    setIsSentenceRight(false);
                    sound.playWrong();
                  }
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Kiểm Tra Câu Đã Ghép</span>
              </button>

              <button
                onClick={() => {
                  setScrambledWords(['summer?', 'were', 'Where', 'last', 'you']);
                  setBuiltWords([]);
                  setIsSentenceRight(null);
                  sound.playClick();
                }}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                Xếp lại từ đầu
              </button>
            </div>

            {isSentenceRight === true && (
              <p className="text-sm font-black text-emerald-600">
                🎉 Xuất sắc! "Where were you last summer?" (Mùa hè năm ngoái bạn ở đâu?)
              </p>
            )}
            {isSentenceRight === false && (
              <p className="text-sm font-black text-rose-600">
                ❌ Chưa đúng rồi. Thứ tự chuẩn là: Where ➔ were ➔ you ➔ last ➔ summer?
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 rounded-3xl p-5 sm:p-6 border-2 border-blue-200 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 2 (Lesson 2)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-blue-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-blue-700">1. Cấu Trúc Điểm Đến Thế Giới:</span>
              <p>
                Hỏi: <em>"Where were you last summer?"</em>
                <br />
                Đáp: <em>"I was in [Tên thành phố]."</em> (in London, in Tokyo, in Bangkok, in Sydney).
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-blue-700">2. Mẹo Phân Biệt "Where" và "Were":</span>
              <p>
                • <strong>Where</strong> (/weər/): Có chữ "h", mang nghĩa "Ở đâu".
                <br />
                • <strong>were</strong> (/wɜːr/): Động từ To be thì quá khứ của "are".
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-blue-700">3. Mở Rộng Kiến Thức Địa Lý:</span>
              <p>
                Bố mẹ có thể mở Google Maps hoặc quả địa cầu chỉ cho con 4 thành phố này nằm ở các châu lục nào (châu Âu, châu Á, châu Úc).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
