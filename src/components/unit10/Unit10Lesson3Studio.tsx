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
  MapPin,
  Camera,
  Share2,
  Download,
  Presentation,
  CheckCircle,
  XCircle,
  Music
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit10Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit10Lesson3Studio: React.FC<Unit10Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showParentGuides, setShowParentGuides] = useState<boolean>(true);

  // Phonics Sounds: 'were' (/wɜːr/) vs 'where' (/weər/)
  const phonicsPairs = [
    {
      word: 'were',
      ipa: '/wɜːr/',
      reading: 'uơ (kéo dài, hơi cong lưỡi)',
      meaning: 'thì, là, ở (quá khứ của are)',
      sentence: 'Were you on the beach last summer?',
      sentenceVi: 'Mùa hè năm ngoái bạn có ở bãi biển không?',
      color: 'blue',
      tip: 'Chữ "were" không có chữ h, đọc ngắn và trầm hơn.'
    },
    {
      word: 'where',
      ipa: '/weər/',
      reading: 'u-e-ơ (mở rộng miệng)',
      meaning: 'ở đâu (từ để hỏi nơi chốn)',
      sentence: 'Where were you last weekend?',
      sentenceVi: 'Cuối tuần trước bạn đã ở đâu?',
      color: 'teal',
      tip: 'Chữ "where" có chữ "h", mang âm đôi /eə/ mở rộng khẩu hình.'
    }
  ];

  // Activity 2: Listen and Circle State
  const [selectedCircle, setSelectedCircle] = useState<{ [qId: number]: 'a' | 'b' | 'c' | null }>({
    1: null,
    2: null
  });
  const [circleChecked, setCircleChecked] = useState<boolean>(false);
  const correctCircles: { [qId: number]: 'a' | 'b' | 'c' } = {
    1: 'a', // Were you on the beach last weekend?
    2: 'a'  // Where were you last weekend?
  };

  // Activity 3: Chant State
  const [activeChantVerse, setActiveChantVerse] = useState<number>(0);
  const [isChanting, setIsChanting] = useState<boolean>(false);

  const chantVerses = [
    {
      title: 'Khổ 1: Campsite & Beach',
      lines: [
        'Were you at the campsite yesterday?',
        'Yes, I was. Yes, I was.',
        'Where were you last summer?',
        'I was on the beach.'
      ],
      linesVi: [
        'Hôm qua bạn có ở khu cắm trại không?',
        'Có, tớ có ở đó.',
        'Mùa hè năm ngoái bạn ở đâu?',
        'Tớ đã ở trên bãi biển.'
      ]
    },
    {
      title: 'Khổ 2: Beach & Countryside',
      lines: [
        'Were you on the beach yesterday?',
        "No, I wasn't. No, I wasn't.",
        'Where were you last summer?',
        'I was in the countryside.'
      ],
      linesVi: [
        'Hôm qua bạn có ở bãi biển không?',
        'Không, tớ không ở đó.',
        'Mùa hè năm ngoái bạn ở đâu?',
        'Tớ đã ở miền quê.'
      ]
    }
  ];

  const handlePlayChant = (vIdx: number) => {
    setActiveChantVerse(vIdx);
    setIsChanting(true);
    sound.playClick();
    const verse = chantVerses[vIdx];
    speakWord(verse.lines.join('. '), speechRate);
    setTimeout(() => {
      setIsChanting(false);
      sound.playVictory();
      onAddStar(2);
    }, 4500);
  };

  // Activity 4: Read and Complete State
  const [readAnswers, setReadAnswers] = useState<{
    q1: string;
    q2: string;
    q3: string;
    q4: string;
  }>({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  const [readChecked, setReadChecked] = useState<boolean>(false);

  // Activity 5: Let's Write State
  const [myName, setMyName] = useState<string>('Minh');
  const [myHolidayPlace, setMyHolidayPlace] = useState<string>('Da Nang');
  const [placeFeature, setPlaceFeature] = useState<string>('The beach');
  const [foodQuality, setFoodQuality] = useState<string>('delicious');
  const [peopleQuality, setPeopleQuality] = useState<string>('friendly and helpful');

  // Activity 6: Presentation Mindmap Project State
  const [projectDestination, setProjectDestination] = useState<string>('Nha Trang');
  const [projectFeature, setProjectFeature] = useState<string>('beautiful');
  const [projectFood, setProjectFood] = useState<string>('seafood was fresh');
  const [projectPeople, setProjectPeople] = useState<string>('friendly');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= HERO HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase">
              <Palmtree className="w-4 h-4 text-emerald-200" />
              <span>Unit 10: Our summer holidays • Lesson 3 (Trang 72 - 73 SGK)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
              Tiết 3: Ngữ Âm "ere", Đọc Hiểu & Dự Án Kỳ Nghỉ Hè
            </h1>
            <p className="text-sm sm:text-base text-teal-100 max-w-2xl font-medium">
              Luyện phát âm chuẩn cặp từ dễ nhầm "were" vs "where", đọc hiểu bài viết của Mai & Tony, tập viết và thuyết trình sơ đồ tư duy kỳ nghỉ hè của em!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {onSwitchToLesson1 && (
              <button
                onClick={onSwitchToLesson1}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>Tiết 1</span>
              </button>
            )}
            {onSwitchToLesson2 && (
              <button
                onClick={onSwitchToLesson2}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 border border-white/30"
              >
                <span>Tiết 2</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION TABS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 1, label: '1. Phonics "ere" (were / where)', icon: '🗣️' },
          { id: 2, label: '2. Listen & circle', icon: '⭕' },
          { id: 3, label: '3. Let’s chant', icon: '🎵' },
          { id: 4, label: '4. Read & complete', icon: '📖' },
          { id: 5, label: '5. Let’s write', icon: '✍️' },
          { id: 6, label: '6. Project: Mindmap Thuyết trình', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(tab.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-400/30'
                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECTION 1: PHONICS LAB (TRACK 104) ================= */}
      {activeSection === 1 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                🗣️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Listen and repeat — Phonics "ere" (Track 104 SGK Trang 72)
                </h3>
                <p className="text-xs text-slate-500">
                  Phân biệt sự khác nhau giữa động từ <strong>were</strong> (/wɜːr/) và từ để hỏi <strong>where</strong> (/weər/)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {phonicsPairs.map(p => (
              <div
                key={p.word}
                className={`p-6 rounded-3xl border-2 ${
                  p.color === 'blue'
                    ? 'border-blue-200 bg-blue-50/50'
                    : 'border-teal-200 bg-teal-50/50'
                } space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white ${
                      p.color === 'blue' ? 'bg-blue-600' : 'bg-teal-600'
                    }`}>
                      {p.word}
                    </span>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg">{p.word}</h4>
                      <p className="text-xs text-slate-500 font-mono">{p.ipa} • Đọc: "{p.reading}"</p>
                    </div>
                  </div>
                  <button
                    onClick={() => speakWord(p.sentence, speechRate)}
                    className="p-2 bg-white rounded-xl shadow-2xs hover:bg-slate-50"
                  >
                    <Volume2 className="w-4 h-4 text-slate-700" />
                  </button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">Nghĩa: {p.meaning}</span>
                  <p className="text-sm font-black text-slate-800">"{p.sentence}"</p>
                  <p className="text-xs text-slate-600 italic">Dịch: {p.sentenceVi}</p>
                </div>

                <div className="bg-white/70 p-3 rounded-xl border border-black/5 text-xs text-slate-700">
                  💡 <strong>Mẹo phân biệt:</strong> {p.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 2: LISTEN AND CIRCLE (TRACK 105) ================= */}
      {activeSection === 2 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                ⭕
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Listen and circle (Track 105 SGK Trang 72)
                </h3>
                <p className="text-xs text-slate-500">
                  Lắng nghe đoạn ghi âm và khoanh tròn câu được đọc chuẩn xác nhất
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                speakWord("Number one: Were you on the beach last weekend? Number two: Where were you last weekend?", speechRate);
              }}
              className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe Băng Track 105</span>
            </button>
          </div>

          <div className="space-y-5">
            {/* Câu 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 1:</span>
                <button
                  onClick={() => speakWord('Were you on the beach last weekend?', speechRate)}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nghe câu 1</span>
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'a' as const, text: 'a. Were you on the beach last weekend?' },
                  { key: 'b' as const, text: 'b. Where were you last summer?' },
                  { key: 'c' as const, text: 'c. Were you in the countryside last summer?' }
                ].map(opt => {
                  const isSelected = selectedCircle[1] === opt.key;
                  const isCorrect = opt.key === correctCircles[1];
                  const showResult = circleChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCircle(prev => ({ ...prev, 1: opt.key }));
                      }}
                      className={`w-full p-3.5 rounded-xl border-2 text-left transition-all text-sm font-bold ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Câu 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">Câu 2:</span>
                <button
                  onClick={() => speakWord('Where were you last weekend?', speechRate)}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nghe câu 2</span>
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'a' as const, text: 'a. Where were you last weekend?' },
                  { key: 'b' as const, text: 'b. Where were you yesterday?' },
                  { key: 'c' as const, text: 'c. Were you at the campsite yesterday?' }
                ].map(opt => {
                  const isSelected = selectedCircle[2] === opt.key;
                  const isCorrect = opt.key === correctCircles[2];
                  const showResult = circleChecked;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        sound.playClick();
                        setSelectedCircle(prev => ({ ...prev, 2: opt.key }));
                      }}
                      className={`w-full p-3.5 rounded-xl border-2 text-left transition-all text-sm font-bold ${
                        showResult && isSelected && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                          : showResult && isSelected && !isCorrect
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-black'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setCircleChecked(true);
                if (selectedCircle[1] === correctCircles[1] && selectedCircle[2] === correctCircles[2]) {
                  sound.playVictory();
                  confetti({ particleCount: 40 });
                  onAddStar(3);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm Tra Đáp Án Khoanh</span>
            </button>

            <button
              onClick={() => {
                setSelectedCircle({ 1: null, 2: null });
                setCircleChecked(false);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              Làm lại
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: LET'S CHANT (TRACK 106) ================= */}
      {activeSection === 3 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                🎵
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Let’s chant (Track 106 SGK Trang 72)
                </h3>
                <p className="text-xs text-slate-500">
                  Bài vè mùa hè vui tươi kết hợp các hoạt động: cắm trại bên bờ hồ, đá bóng bãi biển và chụp ảnh đồng quê
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {chantVerses.map((verse, vIdx) => (
              <div
                key={vIdx}
                className="bg-gradient-to-b from-teal-50/70 to-emerald-50/50 p-5 rounded-2xl border-2 border-teal-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                    <span className="font-black text-sm text-teal-900">{verse.title}</span>
                    <button
                      onClick={() => handlePlayChant(vIdx)}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Hát Khổ Này</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {verse.lines.map((line, lIdx) => (
                      <div key={lIdx} className="bg-white/80 p-2.5 rounded-xl border border-teal-100 text-xs">
                        <p className="font-black text-slate-800 text-sm">{line}</p>
                        <p className="text-slate-500 italic mt-0.5">{verse.linesVi[lIdx]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-200 text-xs font-bold text-teal-800 flex items-center justify-between">
                  <span>⛺ Campsite • 🏖️ Beach • 🌾 Countryside</span>
                  <span>⭐ +2 Sao</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: READ AND COMPLETE ================= */}
      {activeSection === 4 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                📖
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Read and complete (SGK Trang 73)
                </h3>
                <p className="text-xs text-slate-500">
                  Đọc hai đoạn văn miêu tả kỳ nghỉ của Mai (London) & Tony (Vịnh Hạ Long) rồi điền từ vào chỗ trống
                </p>
              </div>
            </div>
          </div>

          {/* Reading Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-b from-blue-50 to-white p-5 rounded-2xl border-2 border-blue-200 space-y-2">
              <span className="text-xs font-black text-blue-700 uppercase">Mai's Holiday (London):</span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                "I am Mai. Last summer, I was on holiday in <strong>London</strong>. The city was <strong>busy</strong>. The food was <strong>good</strong>. The people were <strong>helpful</strong>. My holiday was <strong>great</strong>!"
              </p>
            </div>

            <div className="bg-gradient-to-b from-emerald-50 to-white p-5 rounded-2xl border-2 border-emerald-200 space-y-2">
              <span className="text-xs font-black text-emerald-700 uppercase">Tony's Holiday (Ha Long Bay):</span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                "My name is Tony. I was on holiday in <strong>Ha Long Bay</strong> last summer. The bay was <strong>beautiful</strong>. The food was <strong>excellent</strong>. The people were <strong>friendly</strong>. My holiday was <strong>great</strong>!"
              </p>
            </div>
          </div>

          {/* 4 Completion Questions */}
          <div className="space-y-3">
            {[
              { id: 'q1', prompt: '1. Last summer, Mai was in London and Tony was in', expected: 'ha long bay', hint: 'Ha Long Bay' },
              { id: 'q2', prompt: '2. London was busy and Ha Long Bay was', expected: 'beautiful', hint: 'beautiful' },
              { id: 'q3', prompt: '3. The people in London were', expected: 'helpful', hint: 'helpful', after: 'and the people in Ha Long were friendly.' },
              { id: 'q4', prompt: '4. Their holidays were', expected: 'great', hint: 'great' }
            ].map(item => (
              <div
                key={item.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm font-bold text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span>
                  {item.prompt}{' '}
                  <input
                    type="text"
                    placeholder={`Điền (${item.hint})`}
                    value={readAnswers[item.id as keyof typeof readAnswers]}
                    onChange={e => setReadAnswers({ ...readAnswers, [item.id]: e.target.value })}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-black w-32 focus:outline-emerald-500"
                  />{' '}
                  {item.after || '.'}
                </span>
                {readChecked && (
                  <span className="text-xs text-emerald-700 font-black">
                    Đáp án: "{item.hint}"
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setReadChecked(true);
                const q1Ok = readAnswers.q1.trim().toLowerCase().includes('ha long');
                const q2Ok = readAnswers.q2.trim().toLowerCase() === 'beautiful';
                const q3Ok = readAnswers.q3.trim().toLowerCase() === 'helpful';
                const q4Ok = readAnswers.q4.trim().toLowerCase() === 'great';
                if (q1Ok && q2Ok && q3Ok && q4Ok) {
                  sound.playVictory();
                  confetti({ particleCount: 50 });
                  onAddStar(4);
                } else {
                  sound.playWrong();
                }
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Chấm Điểm Đọc Hiểu</span>
            </button>

            <button
              onClick={() => {
                setReadAnswers({
                  q1: 'Ha Long Bay',
                  q2: 'beautiful',
                  q3: 'helpful',
                  q4: 'great'
                });
                setReadChecked(true);
                sound.playClick();
              }}
              className="px-3 py-1.5 text-xs text-emerald-700 hover:text-emerald-900 font-bold"
            >
              Xem đáp án mẫu
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 5: LET'S WRITE ================= */}
      {activeSection === 5 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                ✍️
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  5. Let’s write (SGK Trang 73)
                </h3>
                <p className="text-xs text-slate-500">
                  Tập viết đoạn văn kể về kỳ nghỉ hè đáng nhớ của em cùng gia đình
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Tên của em:</label>
              <input
                type="text"
                value={myName}
                onChange={e => setMyName(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Điểm đến kỳ nghỉ:</label>
              <select
                value={myHolidayPlace}
                onChange={e => setMyHolidayPlace(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                {['Da Nang', 'Nha Trang', 'Phu Quoc', 'Ha Long Bay', 'Sa Pa', 'Hue'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Cảnh sắc đẹp:</label>
              <select
                value={placeFeature}
                onChange={e => setPlaceFeature(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
              >
                <option value="The beach">The beach (Bãi biển)</option>
                <option value="The city">The city (Thành phố)</option>
                <option value="The bay">The bay (Vịnh biển)</option>
                <option value="The mountain">The mountain (Vùng núi)</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Đoạn văn hoàn chỉnh của em:
              </span>
              <button
                onClick={() => {
                  const text = `I am ${myName}. Last summer, I was on holiday in ${myHolidayPlace} with my family. ${placeFeature} was beautiful. The food was ${foodQuality}. The people were ${peopleQuality}. My holiday was great!`;
                  speakWord(text, speechRate);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Đọc Đoạn Văn</span>
              </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-emerald-200 text-slate-800 text-sm sm:text-base leading-relaxed font-serif shadow-2xs">
              "I am <span className="font-black text-emerald-700 underline">{myName}</span>. Last summer, I was on holiday in <span className="font-black text-emerald-700 underline">{myHolidayPlace}</span> with my family. <span className="font-black text-emerald-700 underline">{placeFeature}</span> was beautiful. The food was <span className="font-black text-emerald-700 underline">{foodQuality}</span>. The people were <span className="font-black text-emerald-700 underline">{peopleQuality}</span>. My holiday was great!"
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: PROJECT MINDMAP PRESENTATION ================= */}
      {activeSection === 6 && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl text-xl font-black">
                📊
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  6. Project — "My last summer holiday" (Sơ Đồ Tư Duy Thuyết Trình · SGK Trang 73)
                </h3>
                <p className="text-xs text-slate-500">
                  Đóng vai bạn học sinh đứng trước bảng lớp thuyết trình về chuyến du lịch mùa hè
                </p>
              </div>
            </div>
          </div>

          {/* Blackboard Presentation Canvas */}
          <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-amber-800 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                ★ CHALKBOARD MINDMAP PRESENTATION ★
              </span>
              <span className="text-xs text-amber-300 font-mono">Lớp 4 • Tiếng Anh 4 Tập 1</span>
            </div>

            {/* Mindmap Node Tree */}
            <div className="flex flex-col items-center justify-center gap-6 py-4">
              {/* Central Destination Node */}
              <div className="px-6 py-3 bg-emerald-500 text-slate-900 font-black text-xl sm:text-2xl rounded-2xl shadow-lg ring-4 ring-emerald-300 transform -rotate-1">
                🏖️ {projectDestination}
              </div>

              {/* 3 Branches */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-1">
                  <span className="text-xs text-emerald-300 font-bold block">1. Cảnh sắc (Beach/City)</span>
                  <p className="text-sm font-black text-white">{projectFeature}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-1">
                  <span className="text-xs text-amber-300 font-bold block">2. Ẩm thực (Food)</span>
                  <p className="text-sm font-black text-white">{projectFood}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-1">
                  <span className="text-xs text-cyan-300 font-bold block">3. Con người (People)</span>
                  <p className="text-sm font-black text-white">{projectPeople}</p>
                </div>
              </div>
            </div>

            {/* Presentation speech bubble */}
            <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-yellow-300 uppercase">Lời thuyết trình mẫu trước lớp:</span>
                <button
                  onClick={() => {
                    const speech = `Last summer, I was on holiday in ${projectDestination}. The beach was ${projectFeature}. The food was delicious and the people were ${projectPeople}. My holiday was great!`;
                    speakWord(speech, speechRate);
                    onAddStar(3);
                  }}
                  className="px-3 py-1 bg-white text-emerald-900 rounded-lg text-xs font-black flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Bật Loa Thuyết Trình</span>
                </button>
              </div>
              <p className="text-sm font-bold text-white leading-relaxed">
                "Last summer, I was on holiday in {projectDestination}. The beach was {projectFeature}. The food was {projectFood}. The people were {projectPeople}. My holiday was great!"
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  sound.playVictory();
                  confetti({ particleCount: 60 });
                  onAddStar(5);
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black rounded-xl text-xs shadow-md flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Hoàn Thành Dự Án Cuối Tập 1 (+5 ⭐)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT GUIDE DRAWER ================= */}
      {showParentGuides && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase tracking-wide">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <span>Cẩm Nang Đồng Hành Cùng Con — Tiết 3 (Lesson 3)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-emerald-700">1. Ngữ Âm Chữ "ere":</span>
              <p>
                • <strong>were</strong> (/wɜːr/): Trợ từ thì quá khứ.
                <br />
                • <strong>where</strong> (/weər/): Từ hỏi "ở đâu".
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-emerald-700">2. Tính Từ Miêu Tả Kỳ Nghỉ:</span>
              <p>
                • <em>busy</em> (nhộn nhịp), <em>beautiful</em> (xinh đẹp), <em>helpful</em> (tận tình), <em>friendly</em> (thân thiện), <em>great / excellent</em> (tuyệt vời).
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 space-y-1.5 shadow-2xs">
              <span className="font-black text-emerald-700">3. Tổng Kết Tập 1:</span>
              <p>
                Unit 10 là bài học khép lại toàn bộ Tập 1 Tiếng Anh 4. Bố mẹ hãy cùng con nhìn lại hành trình 10 Units với tấm sơ đồ tư duy kỳ nghỉ hè rực rỡ!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
