import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  PenTool,
  CheckCircle2,
  Lightbulb,
  Copy,
  Download,
  HelpCircle,
  FileText
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review3ReadWriteProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface MatchPair {
  id: number;
  question: string;
  questionVi: string;
  correctKey: 'a' | 'b' | 'c' | 'd' | 'e';
  answerText: string;
  answerVi: string;
}

export const Review3ReadWrite: React.FC<Review3ReadWriteProps> = ({
  speechRate,
  onAddStar
}) => {
  // =========================================================================
  // ACTIVITY 3: READ AND MATCH (PAGE 37)
  // =========================================================================
  const matchQuestions: MatchPair[] = [
    {
      id: 1,
      question: '1. Where do you live?',
      questionVi: 'Bạn sống ở đâu vậy?',
      correctKey: 'c',
      answerText: 'c. I live in a quiet village in the countryside.',
      answerVi: 'Tớ sống ở một ngôi làng yên bình ở vùng nông thôn.'
    },
    {
      id: 2,
      question: '2. What does your mother do?',
      questionVi: 'Mẹ của bạn làm nghề gì?',
      correctKey: 'a',
      answerText: 'a. She is a nurse. She works in a city hospital.',
      answerVi: 'Mẹ tớ là y tá. Mẹ làm việc ở bệnh viện thành phố.'
    },
    {
      id: 3,
      question: '3. What does your brother look like?',
      questionVi: 'Anh trai của bạn trông như thế nào?',
      correctKey: 'e',
      answerText: 'e. He is tall and has short curly hair.',
      answerVi: 'Anh ấy cao ráo và có mái tóc xoăn ngắn.'
    },
    {
      id: 4,
      question: '4. What do you do in the morning?',
      questionVi: 'Bạn làm gì vào buổi sáng?',
      correctKey: 'b',
      answerText: 'b. I wash my face and do morning exercise.',
      answerVi: 'Tớ rửa mặt và tập thể dục buổi sáng.'
    },
    {
      id: 5,
      question: '5. Where does your sister go on Saturdays?',
      questionVi: 'Chị gái bạn đi đâu vào các ngày thứ Bảy?',
      correctKey: 'd',
      answerText: 'd. She goes to the cinema with her friends.',
      answerVi: 'Chị ấy đi xem phim ở rạp cùng các bạn.'
    }
  ];

  const answerOptions = [
    { key: 'a' as const, text: 'a. She is a nurse. She works in a city hospital.', vi: 'Mẹ tớ là y tá ở bệnh viện thành phố.', icon: '👩‍⚕️' },
    { key: 'b' as const, text: 'b. I wash my face and do morning exercise.', vi: 'Tớ rửa mặt và tập thể dục buổi sáng.', icon: '🏃' },
    { key: 'c' as const, text: 'c. I live in a quiet village in the countryside.', vi: 'Tớ sống ở ngôi làng yên bình tại vùng quê.', icon: '🏡' },
    { key: 'd' as const, text: 'd. She goes to the cinema with her friends.', vi: 'Chị ấy đi rạp chiếu phim với bạn bè.', icon: '🎬' },
    { key: 'e' as const, text: 'e. He is tall and has short curly hair.', vi: 'Anh ấy cao và có mái tóc xoăn ngắn.', icon: '👦' }
  ];

  const [userMatches, setUserMatches] = useState<Record<number, 'a' | 'b' | 'c' | 'd' | 'e' | ''>>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [act3Checked, setAct3Checked] = useState(false);

  const handleSelectMatch = (questionId: number, val: 'a' | 'b' | 'c' | 'd' | 'e') => {
    sound.playClick();
    setUserMatches(prev => ({ ...prev, [questionId]: val }));
  };

  const handleCheckAct3 = () => {
    const isCompleted = Object.values(userMatches).every(val => val !== '');
    if (!isCompleted) {
      sound.playWarning();
      return;
    }

    setAct3Checked(true);
    let correct = 0;
    matchQuestions.forEach(q => {
      if (userMatches[q.id] === q.correctKey) {
        correct++;
      }
    });

    if (correct === 5) {
      sound.playComplete();
      onAddStar(5);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sound.playSuccess();
      onAddStar(correct);
    }
  };

  const handleResetAct3 = () => {
    sound.playClick();
    setUserMatches({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    setAct3Checked(false);
  };

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE (PAGE 37)
  // =========================================================================
  const wordBank = ['live', 'doctor', 'tall', 'dishes', 'tennis', 'cinema'];
  const correctBlanks: Record<number, string> = {
    1: 'live',
    2: 'doctor',
    3: 'tall',
    4: 'dishes',
    5: 'tennis',
    6: 'cinema'
  };

  const [userBlanks, setUserBlanks] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: ''
  });
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [act4Checked, setAct4Checked] = useState(false);

  const handlePlaceWord = (blankId: number) => {
    if (!selectedWord) return;
    sound.playClick();
    setUserBlanks(prev => ({ ...prev, [blankId]: selectedWord }));
    setSelectedWord(null);
  };

  const handleRemoveBlank = (blankId: number) => {
    sound.playClick();
    setUserBlanks(prev => ({ ...prev, [blankId]: '' }));
  };

  const handleCheckAct4 = () => {
    const isAllFilled = Object.values(userBlanks).every(w => w !== '');
    if (!isAllFilled) {
      sound.playWarning();
      return;
    }

    setAct4Checked(true);
    let correctCount = 0;
    Object.keys(correctBlanks).forEach(key => {
      const bId = Number(key);
      if (userBlanks[bId] === correctBlanks[bId]) {
        correctCount++;
      }
    });

    if (correctCount === 6) {
      sound.playComplete();
      onAddStar(6);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      sound.playSuccess();
      onAddStar(correctCount);
    }
  };

  const handleResetAct4 = () => {
    sound.playClick();
    setUserBlanks({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });
    setSelectedWord(null);
    setAct4Checked(false);
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE (PAGE 37)
  // =========================================================================
  const [studentText, setStudentText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const samplePassage =
    'My name is Linh. I live in Flat 10, Lotus Tower in the city. My father is a doctor and my mother is a teacher. My father is tall and has short black hair. In the evening, I cook dinner and wash the dishes with my mum. On Saturdays, my family goes to the cinema. On Sundays, we go to the sports centre. I love my happy family!';

  const handleAutoFillSample = () => {
    sound.playClick();
    setStudentText(samplePassage);
  };

  const handleCopyText = () => {
    if (!studentText) return;
    sound.playSuccess();
    navigator.clipboard.writeText(studentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadStudentText = () => {
    if (!studentText) return;
    speakWord(studentText, speechRate);
  };

  const wordCount = studentText.trim() ? studentText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* ACTIVITY 3: READ AND MATCH */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-600 text-white">
                Trang 37 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 3 · Kỹ năng Đọc hiểu</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              3. Read and Match (Đọc và Nối Câu Hỏi - Trả Lời)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Đọc 5 câu hỏi bên trái và chọn đáp án tương ứng thích hợp nhất ở cột bên phải.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct3}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct3}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Kiểm tra đáp án
            </button>
          </div>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-3.5">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
              Cột A: Câu Hỏi (Questions 1 - 5)
            </h4>
            {matchQuestions.map(q => {
              const selectedKey = userMatches[q.id];
              const isCorrect = selectedKey === q.correctKey;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    act3Checked
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-50/30'
                        : 'border-rose-400 bg-rose-50/30'
                      : 'border-slate-200 bg-slate-50/50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm md:text-base">
                          {q.question}
                        </span>
                        <button
                          onClick={() => speakWord(q.question, speechRate)}
                          className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition"
                          title="Nghe câu hỏi"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 italic mt-0.5">{q.questionVi}</p>
                    </div>

                    {/* Selector */}
                    <div className="flex items-center gap-1">
                      {(['a', 'b', 'c', 'd', 'e'] as const).map(k => (
                        <button
                          key={k}
                          onClick={() => handleSelectMatch(q.id, k)}
                          disabled={act3Checked}
                          className={`w-8 h-8 rounded-xl font-black text-xs transition uppercase ${
                            selectedKey === k
                              ? act3Checked
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {act3Checked && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs flex items-center justify-between">
                      <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {isCorrect
                          ? '✓ Chính xác!'
                          : `✕ Đáp án đúng là: ${q.correctKey.toUpperCase()} (${q.answerText})`}
                      </span>
                      {isCorrect && <span className="text-emerald-700 font-black">⭐ +1</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answers Column */}
          <div className="lg:col-span-5 space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
              Cột B: Câu Trả Lời (Options a - e)
            </h4>
            {answerOptions.map(opt => (
              <div
                key={opt.key}
                className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-xl p-1 bg-slate-100 rounded-xl shrink-0">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-xs leading-snug">{opt.text}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 italic">{opt.vi}</p>
                  </div>
                  <button
                    onClick={() => speakWord(opt.text, speechRate)}
                    className="p-1 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition shrink-0"
                    title="Nghe câu"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 4: READ AND COMPLETE */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white">
                Trang 37 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 4 · Đọc &amp; Điền từ</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              4. Read and Complete (Đọc Đoạn Văn &amp; Điền Từ Vào Chỗ Trống)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Chọn một từ trong ngân hàng từ vựng rồi bấm vào ô trống tương ứng (1 - 6) trong bài văn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetAct4}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Làm lại
            </button>
            <button
              onClick={handleCheckAct4}
              className="px-5 py-2 text-xs md:text-sm font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Nộp bài
            </button>
          </div>
        </div>

        {/* Word Bank Chips */}
        <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
              Ngân hàng từ vựng (Word Bank):
            </span>
            <span className="text-xs text-slate-500">
              {selectedWord ? `Đang chọn từ: "${selectedWord}"` : 'Bấm chọn 1 từ rồi nhấp vào ô trống'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {wordBank.map(w => {
              const isSelected = selectedWord === w;
              const isUsed = Object.values(userBlanks).includes(w);

              return (
                <button
                  key={w}
                  onClick={() => {
                    sound.playClick();
                    setSelectedWord(isSelected ? null : w);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 active:scale-95 ${
                    isSelected
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md -translate-y-0.5'
                      : isUsed
                      ? 'bg-purple-100 text-purple-900 border border-purple-300 opacity-60'
                      : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 shadow-xs'
                  }`}
                >
                  <span>{w}</span>
                  <Volume2
                    className="w-3.5 h-3.5 text-slate-400 hover:text-purple-600"
                    onClick={e => {
                      e.stopPropagation();
                      speakWord(w, speechRate);
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Passage with blanks */}
        <div className="bg-slate-50/80 rounded-3xl p-6 md:p-8 border-2 border-slate-200 text-base md:text-lg leading-relaxed text-slate-800 space-y-4">
          <p>
            Hello! My name is Nam. I (1)&nbsp;
            <button
              onClick={() => (userBlanks[1] ? handleRemoveBlank(1) : handlePlaceWord(1))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[1]
                  ? act4Checked
                    ? userBlanks[1] === correctBlanks[1]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[1] || '(1) ___'}
            </button>
            &nbsp;in a busy street in Da Nang.
          </p>

          <p>
            My father is a (2)&nbsp;
            <button
              onClick={() => (userBlanks[2] ? handleRemoveBlank(2) : handlePlaceWord(2))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[2]
                  ? act4Checked
                    ? userBlanks[2] === correctBlanks[2]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[2] || '(2) ___'}
            </button>
            , he works in a hospital. He is (3)&nbsp;
            <button
              onClick={() => (userBlanks[3] ? handleRemoveBlank(3) : handlePlaceWord(3))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[3]
                  ? act4Checked
                    ? userBlanks[3] === correctBlanks[3]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[3] || '(3) ___'}
            </button>
            &nbsp;and has a round face.
          </p>

          <p>
            In the evening, my mother and I cook dinner and wash the (4)&nbsp;
            <button
              onClick={() => (userBlanks[4] ? handleRemoveBlank(4) : handlePlaceWord(4))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[4]
                  ? act4Checked
                    ? userBlanks[4] === correctBlanks[4]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[4] || '(4) ___'}
            </button>
            &nbsp;together.
          </p>

          <p>
            On Saturdays, my brother and I play (5)&nbsp;
            <button
              onClick={() => (userBlanks[5] ? handleRemoveBlank(5) : handlePlaceWord(5))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[5]
                  ? act4Checked
                    ? userBlanks[5] === correctBlanks[5]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[5] || '(5) ___'}
            </button>
            &nbsp;at the sports centre. On Sundays, my family goes to the (6)&nbsp;
            <button
              onClick={() => (userBlanks[6] ? handleRemoveBlank(6) : handlePlaceWord(6))}
              className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-xl font-bold text-sm border-2 transition ${
                userBlanks[6]
                  ? act4Checked
                    ? userBlanks[6] === correctBlanks[6]
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-rose-100 border-rose-400 text-rose-900'
                    : 'bg-purple-100 border-purple-400 text-purple-900'
                  : 'bg-white border-dashed border-slate-300 text-slate-400 hover:border-purple-400'
              }`}
            >
              {userBlanks[6] || '(6) ___'}
            </button>
            . We have lots of fun!
          </p>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() =>
                speakWord(
                  'Hello! My name is Nam. I live in a busy street in Da Nang. My father is a doctor, he works in a hospital. He is tall and has a round face. In the evening, my mother and I cook dinner and wash the dishes together. On Saturdays, my brother and I play tennis at the sports centre. On Sundays, my family goes to the cinema. We have lots of fun!',
                  speechRate
                )
              }
              className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-purple-700" />
              <span>Nghe toàn bộ bài văn 🔊</span>
            </button>
            {act4Checked && (
              <span className="text-xs font-bold text-emerald-700">
                ⭐ Bé đã tích luỹ được sao xuất sắc!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* ACTIVITY 5: LET'S WRITE */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-600 text-white">
                Trang 37 SGK
              </span>
              <span className="text-xs font-semibold text-slate-500">Hoạt động 5 · Luyện viết (Writing)</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
              <PenTool className="w-6 h-6 text-rose-600" />
              5. Let’s Write (Viết Về Gia Đình &amp; Cuối Tuần Của Em)
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Dựa vào các câu hỏi gợi ý, hãy viết một đoạn văn ngắn khoảng 4 - 6 câu tiếng Anh nhé!
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAutoFillSample}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" /> Xem bài mẫu 10/10
            </button>
            <button
              onClick={handleCopyText}
              disabled={!studentText}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 disabled:opacity-40"
            >
              <Copy className="w-4 h-4" /> {copied ? 'Đã sao chép!' : 'Sao chép bài'}
            </button>
          </div>
        </div>

        {/* Guiding Questions Card */}
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2">
          <p className="text-xs font-black uppercase text-rose-700 tracking-wider">
            Các câu hỏi gợi ý dàn bài:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            <div>1. Where do you live? (Bạn sống ở đâu?)</div>
            <div>2. What does your father/mother do? (Bố/Mẹ làm nghề gì?)</div>
            <div>3. What does he/she look like? (Ngoại hình trông như thế nào?)</div>
            <div>4. What do you do in the evening? (Buổi tối em làm việc gì?)</div>
            <div>5. Where do you go at the weekend? (Cuối tuần cả nhà đi đâu?)</div>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <textarea
            value={studentText}
            onChange={e => setStudentText(e.target.value)}
            rows={5}
            placeholder="My name is... I live in... My father is a... He is tall and... In the evening, I... At the weekend, my family goes to..."
            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-slate-800 text-sm leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Số từ: {wordCount} từ</span>
              {wordCount >= 25 && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                  ✓ Đạt độ dài tiêu chuẩn!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReadStudentText}
                disabled={!studentText}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 disabled:opacity-40"
              >
                <Volume2 className="w-4 h-4 text-rose-600" />
                <span>Đọc bài của em 🔊</span>
              </button>
              <button
                onClick={() => {
                  if (wordCount < 10) {
                    sound.playWarning();
                    return;
                  }
                  sound.playComplete();
                  onAddStar(5);
                  confetti({ particleCount: 70, spread: 60 });
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition active:scale-95 shadow-sm"
              >
                Nộp bài &amp; Nhận 5 ⭐
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
