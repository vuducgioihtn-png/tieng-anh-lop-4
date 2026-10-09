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
  Music,
  PenTool,
  Copy,
  Table,
  ShoppingBag,
  ListOrdered,
  DollarSign,
  Store,
  Tag,
  CheckSquare,
  XSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit18Lesson3StudioProps {
  speechRate: number;
  onAddStar: (count: number) => void;
  onOpenVoiceStudio?: () => void;
  onSwitchToLesson1?: () => void;
  onSwitchToLesson2?: () => void;
}

export const Unit18Lesson3Studio: React.FC<Unit18Lesson3StudioProps> = ({
  speechRate,
  onAddStar,
  onOpenVoiceStudio,
  onSwitchToLesson1,
  onSwitchToLesson2
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);

  // =========================================================================
  // ACTIVITY 1: LISTEN AND REPEAT (TRACK 79) - WORD STRESS ON 2-SYLLABLE PREPOSITIONS
  // =========================================================================
  const phonicsItems = [
    {
      word: "be'hind",
      plainWord: 'behind',
      unstressedSyllable: 'be',
      stressedSyllable: 'HIND',
      ipa: "/bɪˈhaɪnd/",
      reading: "bi-HAIN-đ",
      sentenceEn: "The bakery is be'hind the bookshop.",
      sentenceVi: "Tiệm bánh mì nằm ở phía sau hiệu sách.",
      icon: "🔙",
      note: "Trọng âm rơi vào âm tiết thứ hai: 'HIND'. Âm 'be' đọc nhẹ, lướt nhanh /bɪ/."
    },
    {
      word: "be'tween",
      plainWord: 'between',
      unstressedSyllable: 'be',
      stressedSyllable: 'TWEEN',
      ipa: "/bɪˈtwiːn/",
      reading: "bi-TUYN",
      sentenceEn: "The bakery is be'tween the bookshop and the sports shop.",
      sentenceVi: "Tiệm bánh mì nằm ở giữa hiệu sách và cửa hàng đồ thể thao.",
      icon: "🥪",
      note: "Trọng âm rơi vào âm tiết thứ hai: 'TWEEN' (ngân dài âm /iː/). Âm 'be' đọc nhẹ /bɪ/."
    }
  ];

  // =========================================================================
  // ACTIVITY 2: LISTEN AND CIRCLE (TRACK 80)
  // =========================================================================
  interface CircleQuestion {
    id: number;
    sentenceStart: string;
    sentenceEnd: string;
    options: { key: 'a' | 'b' | 'c'; text: string; icon: string }[];
    correctKey: 'a' | 'b' | 'c';
    audioScript: string;
    explanation: string;
  }

  const circleQuestions: CircleQuestion[] = [
    {
      id: 1,
      sentenceStart: '1. The gift shop is',
      sentenceEnd: 'the bookshop and the bakery.',
      options: [
        { key: 'a', text: 'behind', icon: '🔙' },
        { key: 'b', text: 'between', icon: '🥪' },
        { key: 'c', text: 'opposite', icon: '↔️' }
      ],
      correctKey: 'b',
      audioScript: 'Where’s the gift shop? - The gift shop is between the bookshop and the bakery.',
      explanation: 'Trong băng nghe rõ: "between the bookshop and the bakery" (ở giữa) -> Chọn b (between).'
    },
    {
      id: 2,
      sentenceStart: '2. The shoe shop is',
      sentenceEnd: 'the bookshop.',
      options: [
        { key: 'a', text: 'between', icon: '🥪' },
        { key: 'b', text: 'opposite', icon: '↔️' },
        { key: 'c', text: 'behind', icon: '🔙' }
      ],
      correctKey: 'c',
      audioScript: 'Where is the shoe shop? - It is behind the bookshop.',
      explanation: 'Trong băng nghe rõ: "The shoe shop is behind the bookshop" (ở phía sau) -> Chọn c (behind).'
    }
  ];

  const [userCircles, setUserCircles] = useState<Record<number, 'a' | 'b' | 'c' | null>>({
    1: null,
    2: null
  });
  const [act2Submitted, setAct2Submitted] = useState<boolean>(false);

  const handleSelectCircle = (qId: number, key: 'a' | 'b' | 'c') => {
    sound.playClick();
    setUserCircles(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckAct2 = () => {
    const isCompleted = Object.values(userCircles).every(v => v !== null);
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct2Submitted(true);
    let correct = 0;
    circleQuestions.forEach(q => {
      if (userCircles[q.id] === q.correctKey) {
        correct++;
      }
    });

    if (correct === 2) {
      sound.playComplete();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playSuccess();
      onAddStar(correct * 2);
    }
  };

  const handleResetAct2 = () => {
    sound.playClick();
    setUserCircles({ 1: null, 2: null });
    setAct2Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 3: LET'S CHANT (TRACK 81)
  // =========================================================================
  const chantStanzas = [
    {
      title: 'Khổ 1 · Tiệm Bán Giày (Be\'hind) 👟🔙',
      lines: [
        'Where’s the shoe shop?',
        'Behind, behind, behind.',
        'It’s behind the bookshop.'
      ],
      meaningVi: 'Tiệm bán giày ở đâu thế? Ở phía sau, phía sau, phía sau. Nó nằm ở phía sau hiệu sách.'
    },
    {
      title: 'Khổ 2 · Tiệm Bánh Mì (Be\'tween) 🥐🥪',
      lines: [
        'Where’s the bakery?',
        'Between, between, between.',
        'It’s between the bookshop and the shoe shop.'
      ],
      meaningVi: 'Tiệm bánh mì ở đâu thế? Ở giữa, ở giữa, ở giữa. Nó nằm ở giữa hiệu sách và tiệm giày.'
    }
  ];

  const [activeChantStanza, setActiveChantStanza] = useState<number>(0);
  const [chantSpeed, setChantSpeed] = useState<number>(1.0);

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE (PAGE 57 SGK)
  // =========================================================================
  const readingText =
    'We are at the shopping centre. We can see many shops. The bookshop is opposite the shoe shop. The toy shop is behind the shoe shop. The bakery is between the bookshop and the gift shop. Mai wants to buy a book. It is 30,000 dong. Linh wants to buy a doll. It is 50,000 dong. I want to buy an ice cream. It is 10,000 dong.';

  const [tableInput1, setTableInput1] = useState('');
  const [tableInput2, setTableInput2] = useState('');
  const [tableInput3, setTableInput3] = useState('');
  const [tableInput4, setTableInput4] = useState('');
  const [act4Submitted, setAct4Submitted] = useState(false);

  const handleCheckAct4 = () => {
    setAct4Submitted(true);
    let score = 0;

    if (tableInput1.trim().toLowerCase() === 'book' || tableInput1.trim().toLowerCase() === 'a book') score++;
    if (tableInput2.trim().toLowerCase().includes('behind the shoe shop')) score++;
    if (tableInput3.trim().replace(/\D/g, '') === '50000') score++;
    if (tableInput4.trim().toLowerCase().includes('ice cream')) score++;

    if (score >= 3) {
      sound.playComplete();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70 });
    } else {
      sound.playSuccess();
      onAddStar(score);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setTableInput1('');
    setTableInput2('');
    setTableInput3('');
    setTableInput4('');
    setAct4Submitted(false);
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE (PAGE 57 SGK)
  // =========================================================================
  const sampleWriting =
    'My mother and I are at the shopping centre. The clothes shop is between the bakery and the gift shop. My mother wants to buy a skirt. It is 60,000 dong. The gift shop is opposite the clothes shop. I want to buy a pen. It is 30,000 dong. We have a wonderful time shopping together!';

  const [writingContent, setWritingContent] = useState<string>('');
  const [writingCopied, setWritingCopied] = useState<boolean>(false);

  const wordBankItems = [
    'clothes shop',
    'gift shop',
    'between the bakery and the gift shop',
    'opposite the clothes shop',
    'skirt',
    'pen',
    '60,000 dong',
    '30,000 dong'
  ];

  const handleInsertWord = (word: string) => {
    sound.playClick();
    setWritingContent(prev => (prev ? `${prev} ${word}` : word));
  };

  const handleAutoFillWriting = () => {
    sound.playClick();
    setWritingContent(sampleWriting);
  };

  const handleCopyWriting = () => {
    if (!writingContent) return;
    sound.playSuccess();
    navigator.clipboard.writeText(writingContent);
    setWritingCopied(true);
    setTimeout(() => setWritingCopied(false), 2000);
  };

  // =========================================================================
  // ACTIVITY 6: PROJECT - "AT THE SHOPPING CENTRE" (SHOPPING LIST PRESENTATION)
  // =========================================================================
  interface ShoppingItem {
    name: string;
    nameVi: string;
    price: number;
    icon: string;
  }

  const projectItems: ShoppingItem[] = [
    { name: 'doll', nameVi: 'búp bê xinh xắn', price: 40000, icon: '🪆' },
    { name: 'story book', nameVi: 'truyện tranh cổ tích', price: 30000, icon: '📖' },
    { name: 'hat', nameVi: 'mũ vành che nắng', price: 20000, icon: '👒' }
  ];

  const totalBudget = projectItems.reduce((acc, curr) => acc + curr.price, 0);

  const handlePlayPresentation = () => {
    sound.playFanfare();
    const speech = `At the shopping centre, I have a shopping list. The doll is forty thousand dong. The story book is thirty thousand dong. The hat is twenty thousand dong. The total price is ninety thousand dong. Thank you for listening!`;
    speakWord(speech, speechRate);
    onAddStar(3);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="space-y-8">
      {/* Sub-bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          {[1, 2, 3, 4, 5, 6].map(sec => (
            <button
              key={sec}
              onClick={() => {
                sound.playClick();
                setActiveSection(sec);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1 ${
                activeSection === sec
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>HĐ {sec}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onSwitchToLesson1 && (
            <button
              onClick={onSwitchToLesson1}
              className="px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold text-xs transition flex items-center gap-1 border border-pink-200"
            >
              <span>⬅️ Tiết 1</span>
            </button>
          )}
          {onSwitchToLesson2 && (
            <button
              onClick={onSwitchToLesson2}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs transition flex items-center gap-1 border border-rose-200"
            >
              <span>⬅️ Tiết 2</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVITY 1: LISTEN AND REPEAT (TRACK 79) */}
      {/* ========================================================================= */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Hoạt động 1 · SGK Trang 56 (Track 79)
              </span>
              <h3 className="text-2xl font-extrabold mt-2">
                Listen and repeat · Trọng âm của giới từ hai âm tiết (be'hind, be'tween)
              </h3>
              <p className="text-purple-100 text-sm mt-1 max-w-2xl">
                Quy tắc vàng: Với các giới từ 2 âm tiết có tiền tố <strong>be-</strong> như <strong>be'hind</strong> và <strong>be'tween</strong>,
                trọng âm luôn rơi vào <strong>âm tiết thứ hai</strong>! Âm 'be' đọc nhẹ và lướt nhanh, âm sau đọc to và nhấn mạnh nhé!
              </p>
            </div>
            <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
              🗣️
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phonicsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 border-purple-100 hover:border-purple-400 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-purple-50 rounded-2xl">{item.icon}</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-purple-800">
                          <span className="text-slate-400 font-bold">{item.unstressedSyllable}'</span>
                          <span className="underline decoration-purple-500 decoration-4 text-purple-700">
                            {item.stressedSyllable}
                          </span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{item.ipa}</span>
                      </div>
                      <span className="text-xs text-purple-600 font-semibold">Đọc: {item.reading}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(item.plainWord, speechRate);
                      onAddStar(1);
                    }}
                    className="p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-sm flex items-center gap-1.5 font-bold text-xs"
                    title="Nghe phát âm từ"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Nghe từ</span>
                  </button>
                </div>

                {/* Example sentence */}
                <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200/60 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-slate-800 font-bold text-base leading-snug">
                      "{item.sentenceEn}"
                    </p>
                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(item.sentenceEn.replace("'", ''), speechRate);
                        onAddStar(1);
                      }}
                      className="p-2 rounded-lg bg-white text-purple-600 hover:bg-purple-100 shadow-xs shrink-0"
                      title="Nghe cả câu"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 font-medium italic">
                    👉 {item.sentenceVi}
                  </p>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mẹo Nhớ */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-amber-900 flex items-start gap-4 shadow-xs">
            <span className="text-3xl">💡</span>
            <div className="space-y-1">
              <h4 className="font-bold text-base text-amber-900">Mẹo Nhớ Trọng Âm Của Bé:</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Khi gặp từ có đuôi nhấn <strong>be'HIND</strong> và <strong>be'TWEEN</strong>, bé hãy đọc âm đầu <em>"be-"</em> thấp giọng và nhẹ nhàng, rồi bật to, ngân vang âm thứ hai:
                <strong> bi-HAIND! bi-TWEEN!</strong> Giúp giọng nói tiếng Anh của bé tự nhiên và Tây chuẩn bản ngữ!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVITY 2: LISTEN AND CIRCLE (TRACK 80) */}
      {/* ========================================================================= */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 2 · SGK Trang 56 (Track 80)
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Listen and circle · Lắng nghe và khoanh tròn giới từ đúng</h3>
            <p className="text-purple-100 text-sm mt-1">
              Bé hãy bấm loa nghe từng câu thoại, chú ý giới từ vị trí trong bài rồi khoanh tròn vào đáp án a, b, c nhé!
            </p>
          </div>

          <div className="space-y-5">
            {circleQuestions.map(q => {
              const selected = userCircles[q.id];
              const isCorrect = selected === q.correctKey;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                        {q.id}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base">Câu {q.id}</h4>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        speakWord(q.audioScript, speechRate);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe băng mẫu (Track 80)</span>
                    </button>
                  </div>

                  {/* Sentence with blank */}
                  <div className="p-4 bg-slate-50 rounded-xl text-lg font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                    <span>{q.sentenceStart}</span>
                    <span className="px-4 py-1 border-b-2 border-dashed border-purple-600 text-purple-700 font-extrabold bg-purple-50 rounded">
                      {selected ? q.options.find(o => o.key === selected)?.text : '.......'}
                    </span>
                    <span>{q.sentenceEnd}</span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map(opt => {
                      const isOptionSelected = selected === opt.key;
                      let btnStyle = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 bg-white';

                      if (isOptionSelected) {
                        btnStyle = 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm ring-2 ring-purple-400';
                      }

                      if (act2Submitted) {
                        if (opt.key === q.correctKey) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400';
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectCircle(q.id, opt.key)}
                          className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between text-left ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs uppercase text-slate-700">
                              {opt.key}
                            </span>
                            <span className="text-xl">{opt.icon}</span>
                            <span className="font-bold text-sm text-slate-800">{opt.text}</span>
                          </div>
                          <span
                            onClick={e => {
                              e.stopPropagation();
                              sound.playClick();
                              speakWord(opt.text, speechRate);
                            }}
                            className="p-1 text-slate-400 hover:text-purple-600 rounded"
                          >
                            <Volume2 className="w-4 h-4" />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {act2Submitted && (
                    <div
                      className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : 'bg-rose-50 border border-rose-200 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold">{isCorrect ? 'Tuyệt vời!' : 'Chưa chính xác!'} </span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetAct2}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
            <button
              onClick={handleCheckAct2}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Kiểm tra kết quả</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVITY 3: LET'S CHANT (TRACK 81) */}
      {/* ========================================================================= */}
      {activeSection === 3 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Hoạt động 3 · SGK Trang 56 (Track 81)
              </span>
              <h3 className="text-2xl font-extrabold mt-2">Let’s Chant · Bài vè nhịp điệu Behind &amp; Between</h3>
              <p className="text-purple-100 text-sm mt-1 max-w-2xl">
                Cùng vỗ tay theo nhịp phách, ngân vang giai điệu vui tươi và luyện trọng âm của <strong>behind</strong> và <strong>between</strong> nào!
              </p>
            </div>
            <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
              🎶
            </div>
          </div>

          {/* Chant Player Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playSuccess();
                  const fullText = chantStanzas[activeChantStanza].lines.join('. ');
                  speakWord(fullText, chantSpeed);
                  onAddStar(2);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Music className="w-4 h-4" />
                <span>Đọc vè cả khổ ({chantSpeed}x)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  confetti({ particleCount: 30, spread: 50 });
                  onAddStar(1);
                }}
                className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>👏 Vỗ tay theo nhịp</span>
              </button>
            </div>

            {/* Speed Switcher */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Tốc độ:</span>
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => {
                    sound.playClick();
                    setChantSpeed(speed);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    chantSpeed === speed
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Stanza Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chantStanzas.map((stanza, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveChantStanza(idx);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  activeChantStanza === idx
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-300'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <span className="font-bold text-sm text-purple-900 block">{stanza.title}</span>
                <span className="text-xs text-slate-500 mt-1 block">Bấm để chọn và tập đọc khổ thơ này</span>
              </button>
            ))}
          </div>

          {/* Interactive Lines */}
          <div className="bg-gradient-to-br from-purple-50/60 via-indigo-50/60 to-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h4 className="font-extrabold text-purple-900 text-lg flex items-center gap-2">
                <span>🎤</span>
                <span>{chantStanzas[activeChantStanza].title}</span>
              </h4>
              <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                Chạm vào từng câu để nghe và tập đọc
              </span>
            </div>

            <div className="space-y-3">
              {chantStanzas[activeChantStanza].lines.map((line, lIdx) => (
                <div
                  key={lIdx}
                  onClick={() => {
                    sound.playClick();
                    speakWord(line, chantSpeed);
                    onAddStar(1);
                  }}
                  className="p-3.5 bg-white rounded-2xl border border-purple-100 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {lIdx + 1}
                    </span>
                    <span className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                      {line}
                    </span>
                  </div>

                  <span className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
                    <Volume2 className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-purple-100 text-xs text-slate-600 leading-relaxed italic">
              <strong>💡 Dịch nghĩa tiếng Việt:</strong> {chantStanzas[activeChantStanza].meaningVi}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVITY 4: READ AND COMPLETE (PAGE 57 SGK) */}
      {/* ========================================================================= */}
      {activeSection === 4 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 4 · SGK Trang 57
            </span>
            <h3 className="text-2xl font-extrabold mt-2">Read and complete · Đọc đoạn văn và hoàn thành bảng</h3>
            <p className="text-purple-100 text-sm mt-1">
              Đọc đoạn văn kể về chuyến đi chơi tại TTTM của Mai, Linh và bạn tác giả, sau đó điền thông tin còn thiếu vào bảng nhé!
            </p>
          </div>

          {/* Reading Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏬</span>
                <h4 className="font-bold text-slate-800 text-base">At the shopping centre (Tại trung tâm mua sắm)</h4>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  speakWord(readingText, speechRate);
                  onAddStar(2);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc toàn bài</span>
              </button>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-medium bg-purple-50/40 p-4 rounded-xl border border-purple-100">
              {readingText}
            </p>
          </div>

          {/* Information Table with Blanks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 overflow-x-auto">
            <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <Table className="w-5 h-5 text-purple-600" />
              <span>Bảng thông tin mua sắm (Shopping Information):</span>
            </h4>

            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-purple-50 text-purple-900 border-b border-purple-200">
                  <th className="p-3 font-extrabold rounded-tl-xl">Cửa hàng (Shop)</th>
                  <th className="p-3 font-extrabold">Ở đâu? (Where?)</th>
                  <th className="p-3 font-extrabold">Mua gì? (What?)</th>
                  <th className="p-3 font-extrabold rounded-tr-xl">Bao nhiêu tiền? (How much?)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Row 1: bookshop */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-800">bookshop</td>
                  <td className="p-3 text-slate-600">opposite the shoe shop</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-purple-600">(1)</span>
                      <input
                        type="text"
                        value={tableInput1}
                        onChange={e => setTableInput1(e.target.value)}
                        placeholder="book..."
                        className="px-2.5 py-1 rounded-lg border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-bold text-slate-700">30,000 dong</td>
                </tr>

                {/* Row 2: toy shop */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-800">toy shop</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-purple-600">(2)</span>
                      <input
                        type="text"
                        value={tableInput2}
                        onChange={e => setTableInput2(e.target.value)}
                        placeholder="behind the shoe shop..."
                        className="px-2.5 py-1 rounded-lg border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-48 bg-white"
                      />
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-bold">doll</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-purple-600">(3)</span>
                      <input
                        type="text"
                        value={tableInput3}
                        onChange={e => setTableInput3(e.target.value)}
                        placeholder="50,000..."
                        className="px-2.5 py-1 rounded-lg border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-24 bg-white"
                      />
                      <span className="text-xs">dong</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3: bakery */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-800">bakery</td>
                  <td className="p-3 text-slate-600">between the bookshop and the gift shop</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-purple-600">(4)</span>
                      <input
                        type="text"
                        value={tableInput4}
                        onChange={e => setTableInput4(e.target.value)}
                        placeholder="ice cream..."
                        className="px-2.5 py-1 rounded-lg border border-slate-300 focus:border-purple-500 outline-none text-xs font-bold w-28 bg-white"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-bold text-slate-700">10,000 dong</td>
                </tr>
              </tbody>
            </table>

            {act4Submitted && (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                <strong>Đáp án chuẩn SGK:</strong> (1) book · (2) behind the shoe shop · (3) 50,000 dong · (4) ice cream
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetAct4}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại</span>
            </button>
            <button
              onClick={handleCheckAct4}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Nộp bài &amp; Kiểm tra (+5 ⭐)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVITY 5: LET'S WRITE (PAGE 57 SGK) */}
      {/* ========================================================================= */}
      {activeSection === 5 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-purple-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 5 · SGK Trang 57
            </span>
            <h3 className="text-2xl font-extrabold mt-2">
              Let’s Write · Viết đoạn văn &quot;Shopping with my mum&quot;
            </h3>
            <p className="text-pink-100 text-sm mt-1">
              Hãy viết một đoạn văn ngắn kể về chuyến đi mua sắm cùng mẹ: vị trí cửa hàng quần áo, món đồ mẹ muốn mua, vị trí tiệm quà tặng và món đồ em muốn mua nhé!
            </p>
          </div>

          {/* Word Bank */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ngân Hàng Cụm Từ Gợi Ý (Chạm để chèn nhanh vào bài):
              </span>
              <button
                onClick={handleAutoFillWriting}
                className="text-xs font-bold text-pink-600 hover:text-pink-800 transition-colors"
              >
                + Điền mẫu bài viết chuẩn SGK
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {wordBankItems.map((word, wIdx) => (
                <button
                  key={wIdx}
                  onClick={() => handleInsertWord(word)}
                  className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-600 hover:text-white font-semibold text-xs transition-all border border-pink-200/60 shadow-xs flex items-center gap-1"
                >
                  <span>+</span>
                  <span>{word}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-pink-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-pink-600" />
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">Góc Viết Của Bé:</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">
                  {writingContent.trim().split(/\s+/).filter(Boolean).length} từ
                </span>
                {writingContent && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      speakWord(writingContent, speechRate);
                    }}
                    className="p-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100"
                    title="Nghe bài viết của mình"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleCopyWriting}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{writingCopied ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={writingContent}
              onChange={e => setWritingContent(e.target.value)}
              placeholder="Ví dụ: My mother and I are at the shopping centre. The clothes shop is between the bakery and the gift shop. My mother wants to buy a skirt..."
              rows={6}
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base leading-relaxed text-slate-800 placeholder:text-slate-400 font-sans resize-y"
            />

            {/* Model Sample Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  Bài Viết Mẫu Chuẩn Cho Bé Tham Khảo:
                </span>
                <button
                  onClick={() => {
                    sound.playClick();
                    speakWord(sampleWriting, speechRate);
                  }}
                  className="text-xs text-pink-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe bài mẫu</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &quot;{sampleWriting}&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACTIVITY 6: PROJECT - "AT THE SHOPPING CENTRE" */}
      {/* ========================================================================= */}
      {activeSection === 6 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 rounded-3xl p-6 text-white shadow-lg">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Hoạt động 6 · Project (SGK Trang 57)
            </span>
            <h3 className="text-2xl font-extrabold mt-2">
              Project · Danh Sách Mua Sắm Của Em (My Shopping List Presentation) 🛍️
            </h3>
            <p className="text-purple-100 text-sm mt-1">
              Thuyết trình danh sách món đồ cần mua tại trung tâm mua sắm và tính tổng chi phí thông minh!
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <span>Shopping list</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md">
                    Bảng Thuyết Trình
                  </span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Các món đồ bé sẽ mua kèm đơn giá chi tiết:
                </p>
              </div>

              <button
                onClick={handlePlayPresentation}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Thuyết trình toàn bài 🎤 (+3 ⭐)</span>
              </button>
            </div>

            {/* List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border-2 border-purple-100 bg-purple-50/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2 bg-white rounded-2xl shadow-2xs">{item.icon}</span>
                    <div>
                      <h5 className="font-extrabold text-base text-slate-800 capitalize">{item.name}</h5>
                      <span className="text-xs text-slate-500">{item.nameVi}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white text-purple-800 font-extrabold text-xs rounded-xl shadow-2xs border border-purple-200">
                    {item.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Total Budget Card */}
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 p-5 rounded-2xl border-2 border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💰</span>
                <div>
                  <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">
                    Tổng chi phí giỏ hàng mua sắm:
                  </span>
                  <h4 className="text-xl font-black text-purple-950">
                    {totalBudget.toLocaleString('vi-VN')} VNĐ (Ninety thousand dong)
                  </h4>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl text-xs text-slate-700 font-bold border border-purple-200">
                Mẫu nói: &ldquo;The doll is 40,000 dong. The story book is 30,000 dong. The hat is 20,000 dong.&rdquo;
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
