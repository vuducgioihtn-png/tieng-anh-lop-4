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
  Send,
  MessageSquare
} from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Review2ReadWriteProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

interface MatchPair {
  id: number;
  question: string;
  questionVi: string;
  correctKey: 'a' | 'b' | 'c' | 'd';
  answerText: string;
  answerVi: string;
}

export const Review2ReadWrite: React.FC<Review2ReadWriteProps> = ({
  speechRate,
  onAddStar
}) => {
  // =========================================================================
  // ACTIVITY 3: READ AND MATCH (PAGE 75)
  // =========================================================================
  const matchQuestions: MatchPair[] = [
    {
      id: 1,
      question: '1. What subjects do you have today?',
      questionVi: 'Hôm nay bạn học những môn gì?',
      correctKey: 'b',
      answerText: 'b. I have English, maths and Vietnamese.',
      answerVi: 'Tớ học môn Tiếng Anh, Toán và Tiếng Việt.'
    },
    {
      id: 2,
      question: '2. When do you have art?',
      questionVi: 'Khi nào bạn có tiết Mỹ thuật?',
      correctKey: 'd',
      answerText: 'd. I have it on Wednesdays.',
      answerVi: 'Tớ có tiết Mỹ thuật vào các ngày thứ Tư.'
    },
    {
      id: 3,
      question: '3. Where were you last summer?',
      questionVi: 'Mùa hè vừa rồi bạn đã ở đâu?',
      correctKey: 'a',
      answerText: 'a. I was in Sydney.',
      answerVi: 'Tớ đã ở thành phố Sydney (nước Úc).'
    },
    {
      id: 4,
      question: '4. Is your sports day in April?',
      questionVi: 'Ngày hội thể thao của trường bạn có vào tháng Tư không?',
      correctKey: 'c',
      answerText: 'c. Yes, it is.',
      answerVi: 'Đúng rồi, đúng là vào tháng Tư.'
    }
  ];

  const matchOptions = [
    { key: 'a' as const, text: 'a. I was in Sydney.', vi: 'Tớ đã ở Sydney (nước Úc).' },
    { key: 'b' as const, text: 'b. I have English, maths and Vietnamese.', vi: 'Tớ học Tiếng Anh, Toán và Tiếng Việt.' },
    { key: 'c' as const, text: 'c. Yes, it is.', vi: 'Đúng vậy, chính xác.' },
    { key: 'd' as const, text: 'd. I have it on Wednesdays.', vi: 'Tớ có môn đó vào các ngày thứ Tư.' }
  ];

  const [userMatches, setUserMatches] = useState<{ [qId: number]: 'a' | 'b' | 'c' | 'd' | null }>({
    1: null,
    2: null,
    3: null,
    4: null
  });
  const [matchSubmitted, setMatchSubmitted] = useState<boolean>(false);

  const handleSelectMatch = (qId: number, key: 'a' | 'b' | 'c' | 'd') => {
    sound.playClick();
    setUserMatches(prev => ({ ...prev, [qId]: key }));
  };

  const handleCheckMatch = () => {
    const allDone = Object.values(userMatches).every(v => v !== null);
    if (!allDone) {
      alert('Em hãy chọn câu trả lời tương ứng cho cả 4 câu hỏi nhé!');
      return;
    }
    const correctCount = matchQuestions.filter(q => userMatches[q.id] === q.correctKey).length;
    setMatchSubmitted(true);
    if (correctCount === 4) {
      sound.playFanfare();
      onAddStar(4);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else if (correctCount >= 2) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 4: READ AND COMPLETE (PAGE 75)
  // Word bank: were, computer rooms, music, sing, village
  // =========================================================================
  const wordBank = ['were', 'computer rooms', 'music', 'sing', 'village'];
  const correctBlanks: { [key: number]: string } = {
    1: 'village',
    2: 'computer rooms',
    3: 'music',
    4: 'sing',
    5: 'were'
  };

  const [blankAnswers, setBlankAnswers] = useState<{ [key: number]: string }>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [blankSubmitted, setBlankSubmitted] = useState<boolean>(false);
  const [showVietnameseLetter, setShowVietnameseLetter] = useState<boolean>(false);

  const handleFillWord = (blankId: number, word: string) => {
    sound.playClick();
    setBlankAnswers(prev => ({ ...prev, [blankId]: word }));
  };

  const handleCheckBlank = () => {
    const filledCount = Object.values(blankAnswers).filter(v => v.trim() !== '').length;
    if (filledCount < 5) {
      alert('Em hãy điền đầy đủ cả 5 từ vào bức thư nhé!');
      return;
    }
    const correctCount = Object.keys(correctBlanks).filter(
      k => blankAnswers[Number(k)].trim().toLowerCase() === correctBlanks[Number(k)].toLowerCase()
    ).length;
    setBlankSubmitted(true);
    if (correctCount === 5) {
      sound.playFanfare();
      onAddStar(5);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } else if (correctCount >= 3) {
      sound.playCorrect();
      onAddStar(correctCount);
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // ACTIVITY 5: LET'S WRITE (PAGE 75)
  // Student writes reply to Joe
  // =========================================================================
  const [studentLocation, setStudentLocation] = useState<string>('the city');
  const [studentClassrooms, setStudentClassrooms] = useState<string>('twenty');
  const [studentSubject, setStudentSubject] = useState<string>('English');
  const [studentReason, setStudentReason] = useState<string>('can speak with foreign friends');
  const [studentSportsMonth, setStudentSportsMonth] = useState<string>('November');
  const [studentName, setStudentName] = useState<string>('Linh');
  const [letterCopied, setLetterCopied] = useState<boolean>(false);

  const fullGeneratedLetter = `Dear Joe,
My school is in ${studentLocation}. There are ${studentClassrooms} classrooms.
My favourite subject is ${studentSubject}. I like it because I ${studentReason}.
I love sports. Our last sports day was in ${studentSportsMonth}.
Bye!
${studentName}`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(fullGeneratedLetter);
    sound.playSuccess();
    setLetterCopied(true);
    onAddStar(2);
    setTimeout(() => setLetterCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Activity 3: Read and match */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-500 text-white">
                  Hoạt Động 3 · Trang 75
                </span>
                <span className="text-xs font-semibold text-slate-500">Reading Comprehension</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and match 🧩 (Đọc và ghép nối câu hỏi với câu trả lời)
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckMatch}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra nối
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setUserMatches({ 1: null, 2: null, 3: null, 4: null });
                setMatchSubmitted(false);
              }}
              className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-xl transition"
              title="Làm lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Match cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {matchQuestions.map(q => {
            const currentChoice = userMatches[q.id];
            const isCorrect = currentChoice === q.correctKey;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  matchSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-rose-300 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/40 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base">
                      {q.question}
                    </h4>
                    <p className="text-xs text-slate-500 italic mt-0.5">{q.questionVi}</p>
                  </div>
                  <button
                    onClick={() => speakWord(q.question, speechRate)}
                    className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-lg shrink-0 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Match selector dropdown or buttons */}
                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <div className="text-xs font-bold text-slate-600 mb-2">Chọn câu nối:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {matchOptions.map(opt => {
                      const isSelected = currentChoice === opt.key;
                      const isAnswerKey = q.correctKey === opt.key;

                      let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300';
                      if (isSelected && !matchSubmitted) {
                        btnStyle = 'border-indigo-500 bg-indigo-100 text-indigo-900 font-bold';
                      }
                      if (matchSubmitted) {
                        if (isAnswerKey) {
                          btnStyle = 'border-emerald-500 bg-emerald-200 text-emerald-950 font-black';
                        } else if (isSelected && !isAnswerKey) {
                          btnStyle = 'border-rose-500 bg-rose-100 text-rose-900 line-through';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectMatch(q.id, opt.key)}
                          className={`p-2 rounded-xl border text-xs text-left truncate transition ${btnStyle}`}
                        >
                          <span className="font-black mr-1">{opt.key.toUpperCase()}.</span>
                          <span>{opt.text.replace(/^[a-d]\.\s*/, '')}</span>
                        </button>
                      );
                    })}
                  </div>

                  {matchSubmitted && (
                    <div className="mt-2 text-xs flex items-center gap-1.5 font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Đáp án đúng: {q.answerText}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity 4: Read and complete */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                  Hoạt Động 4 · Trang 75
                </span>
                <span className="text-xs font-semibold text-slate-500">Joe&apos;s Letter to Linh</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                Read and complete ✉️ (Đọc bức thư của Joe và điền từ vào chỗ trống)
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVietnameseLetter(!showVietnameseLetter)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              {showVietnameseLetter ? 'Ẩn dịch nghĩa' : 'Dịch nghĩa tiếng Việt'}
            </button>
            <button
              onClick={handleCheckBlank}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition flex items-center gap-1.5 text-sm"
            >
              <Check className="w-4 h-4" /> Kiểm tra thư
            </button>
          </div>
        </div>

        {/* Word Bank */}
        <div className="my-5 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-black text-amber-800 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-600" /> Ngân Hàng Từ Vựng Gợi Ý (Bấm để điền nhanh)
          </div>
          <div className="flex flex-wrap gap-2">
            {wordBank.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-sm shadow-sm flex items-center gap-1"
              >
                <span>🏷️</span> {word}
              </span>
            ))}
          </div>
        </div>

        {/* Letter Container */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 border-2 border-dashed border-amber-200 font-serif leading-relaxed text-slate-800 text-base md:text-lg relative shadow-inner">
          <div className="absolute top-4 right-4 opacity-10 text-6xl pointer-events-none">📬</div>

          <p className="font-bold mb-4">Dear Linh,</p>

          <p className="mb-4">
            My school is in the (1){' '}
            <select
              value={blankAnswers[1]}
              onChange={e => handleFillWord(1, e.target.value)}
              className={`font-sans font-bold px-2 py-1 rounded-lg border-2 text-sm transition ${
                blankSubmitted
                  ? blankAnswers[1] === correctBlanks[1]
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                    : 'border-rose-500 bg-rose-100 text-rose-950'
                  : 'border-amber-300 bg-white text-slate-800'
              }`}
            >
              <option value="">-- [1] chọn từ --</option>
              {wordBank.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            . There are twenty classrooms, two (2){' '}
            <select
              value={blankAnswers[2]}
              onChange={e => handleFillWord(2, e.target.value)}
              className={`font-sans font-bold px-2 py-1 rounded-lg border-2 text-sm transition ${
                blankSubmitted
                  ? blankAnswers[2] === correctBlanks[2]
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                    : 'border-rose-500 bg-rose-100 text-rose-950'
                  : 'border-amber-300 bg-white text-slate-800'
              }`}
            >
              <option value="">-- [2] chọn từ --</option>
              {wordBank.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>{' '}
            and a beautiful garden.
          </p>

          <p className="mb-4">
            My favourite subject is (3){' '}
            <select
              value={blankAnswers[3]}
              onChange={e => handleFillWord(3, e.target.value)}
              className={`font-sans font-bold px-2 py-1 rounded-lg border-2 text-sm transition ${
                blankSubmitted
                  ? blankAnswers[3] === correctBlanks[3]
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                    : 'border-rose-500 bg-rose-100 text-rose-950'
                  : 'border-amber-300 bg-white text-slate-800'
              }`}
            >
              <option value="">-- [3] chọn từ --</option>
              {wordBank.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            . I can play the piano and (4){' '}
            <select
              value={blankAnswers[4]}
              onChange={e => handleFillWord(4, e.target.value)}
              className={`font-sans font-bold px-2 py-1 rounded-lg border-2 text-sm transition ${
                blankSubmitted
                  ? blankAnswers[4] === correctBlanks[4]
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                    : 'border-rose-500 bg-rose-100 text-rose-950'
                  : 'border-amber-300 bg-white text-slate-800'
              }`}
            >
              <option value="">-- [4] chọn từ --</option>
              {wordBank.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>{' '}
            with my friends.
          </p>

          <p className="mb-4">
            It was our sports day yesterday. The activities (5){' '}
            <select
              value={blankAnswers[5]}
              onChange={e => handleFillWord(5, e.target.value)}
              className={`font-sans font-bold px-2 py-1 rounded-lg border-2 text-sm transition ${
                blankSubmitted
                  ? blankAnswers[5] === correctBlanks[5]
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950'
                    : 'border-rose-500 bg-rose-100 text-rose-950'
                  : 'border-amber-300 bg-white text-slate-800'
              }`}
            >
              <option value="">-- [5] chọn từ --</option>
              {wordBank.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>{' '}
            fun there. It was great.
          </p>

          <p className="mb-2">Tell me about your school.</p>
          <p className="mb-1">Bye!</p>
          <p className="font-bold">Joe</p>

          {/* Full letter Audio Player */}
          <div className="mt-6 pt-4 border-t border-amber-200/70 flex items-center justify-between font-sans">
            <button
              onClick={() => {
                const fullText =
                  'Dear Linh, My school is in the village. There are twenty classrooms, two computer rooms and a beautiful garden. My favourite subject is music. I can play the piano and sing with my friends. It was our sports day yesterday. The activities were fun there. It was great. Tell me about your school. Bye! Joe';
                speakWord(fullText, speechRate);
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe đọc cả bức thư hoàn chỉnh
            </button>
            <span className="text-xs text-slate-500 italic">
              (1) village • (2) computer rooms • (3) music • (4) sing • (5) were
            </span>
          </div>

          {/* Vietnamese translation toggle */}
          {showVietnameseLetter && (
            <div className="mt-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs md:text-sm font-sans text-slate-700 space-y-1.5">
              <p className="font-bold text-slate-900">Bản dịch tiếng Việt:</p>
              <p>&quot;Linh thân mến, Trường của tớ ở một ngôi làng. Có hai mươi phòng học, hai phòng máy tính và một khu vườn xinh đẹp. Môn học yêu thích của tớ là Âm nhạc. Tớ có thể chơi đàn piano và ca hát cùng các bạn. Ngày hôm qua là ngày hội thể thao của trường tớ. Các hoạt động ở đó thật là vui. Mọi thứ thật tuyệt vời. Hãy kể cho tớ nghe về trường của bạn nhé. Tạm biệt! Joe&quot;</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity 5: Let's write */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white">
                Hoạt Động 5 · Trang 75
              </span>
              <span className="text-xs font-semibold text-slate-500">Guided Writing Workshop</span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              Let&apos;s write ✍️ (Viết thư hồi đáp cho bạn Joe)
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 mt-4">
          Hãy tùy chỉnh thông tin về trường của em hoặc gõ trực tiếp để tạo bức thư hoàn chỉnh gửi Joe:
        </p>

        {/* Input customizers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              1. Địa điểm trường (in...):
            </label>
            <input
              type="text"
              value={studentLocation}
              onChange={e => setStudentLocation(e.target.value)}
              placeholder="e.g. the city / the village"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              2. Số phòng học (There are...):
            </label>
            <input
              type="text"
              value={studentClassrooms}
              onChange={e => setStudentClassrooms(e.target.value)}
              placeholder="e.g. twenty / fifteen"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              3. Môn học yêu thích:
            </label>
            <input
              type="text"
              value={studentSubject}
              onChange={e => setStudentSubject(e.target.value)}
              placeholder="e.g. English / PE / art"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              4. Lý do em thích (because I...):
            </label>
            <input
              type="text"
              value={studentReason}
              onChange={e => setStudentReason(e.target.value)}
              placeholder="e.g. love singing / like sports"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              5. Tháng tổ chức hội thể thao:
            </label>
            <input
              type="text"
              value={studentSportsMonth}
              onChange={e => setStudentSportsMonth(e.target.value)}
              placeholder="e.g. November / October / May"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              6. Tên của em:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="e.g. Linh / Nam / Mai"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-bold"
            />
          </div>
        </div>

        {/* Live letter preview card */}
        <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 font-serif relative">
          <p className="font-bold text-slate-800 mb-2">Dear Joe,</p>
          <p className="text-slate-800 leading-relaxed mb-2">
            My school is in <span className="font-sans font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-sm">{studentLocation || '...'}</span>. There are <span className="font-sans font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-sm">{studentClassrooms || '...'}</span> classrooms.
          </p>
          <p className="text-slate-800 leading-relaxed mb-2">
            My favourite subject is <span className="font-sans font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-sm">{studentSubject || '...'}</span>. I like it because I <span className="font-sans font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-sm">{studentReason || '...'}</span>.
          </p>
          <p className="text-slate-800 leading-relaxed mb-2">
            I love sports. Our last sports day was in <span className="font-sans font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-sm">{studentSportsMonth || '...'}</span>.
          </p>
          <p className="text-slate-800 mb-1">Bye!</p>
          <p className="font-bold text-rose-700 font-sans">{studentName || 'Your Name'}</p>

          <div className="mt-6 pt-4 border-t border-rose-200 flex flex-wrap items-center gap-3 font-sans">
            <button
              onClick={() => speakWord(fullGeneratedLetter, speechRate)}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Volume2 className="w-4 h-4" /> Nghe phát âm bức thư
            </button>
            <button
              onClick={handleCopyLetter}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Copy className="w-4 h-4 text-slate-500" />
              {letterCopied ? 'Đã sao chép! ⭐️ +2 sao' : 'Sao chép văn bản'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
