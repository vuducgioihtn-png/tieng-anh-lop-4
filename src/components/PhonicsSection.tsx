import React, { useState } from 'react';
import { Volume2, Music, CheckCircle2, AlertCircle } from 'lucide-react';
import { PhonicsItem } from '../data/curriculum';
import { speakWord, sound } from '../utils/audio';

interface PhonicsSectionProps {
  phonics: PhonicsItem;
  speechRate: number;
  onAddStar: (count: number) => void;
}

export const PhonicsSection: React.FC<PhonicsSectionProps> = ({ phonics, speechRate, onAddStar }) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  const handlePlayWord = async (word: string) => {
    sound.playClick();
    setPlayingWord(word);
    await speakWord(word, speechRate);
    setPlayingWord(null);
  };

  const handlePlaySentence = async () => {
    sound.playClick();
    setPlayingWord('sentence');
    await speakWord(phonics.sentence, speechRate * 0.9);
    setPlayingWord(null);
    sound.playStar();
    onAddStar(2);
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Phonics & Ngữ Âm Chuẩn Bản Xứ</h2>
            <span className="text-xs bg-violet-100 text-violet-800 font-semibold px-2.5 py-0.5 rounded-full">
              Lesson 3 trong SGK
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Luyện tai nghe tinh tường và khẩu hình miệng chuẩn xác để không bao giờ bị nhầm lẫn âm gió hay trọng âm.
          </p>
        </div>
      </div>

      {/* Main Phonics Studio */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-violet-700 font-bold text-sm mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-ping" />
          <span>Trọng tâm bài học: {phonics.sound}</span>
        </div>

        {/* Word sound cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {phonics.words.map((w, index) => {
            const isPlaying = playingWord === w.word;
            return (
              <div
                key={index}
                onClick={() => handlePlayWord(w.word)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isPlaying
                    ? 'border-violet-500 bg-violet-50 shadow-md scale-[1.02]'
                    : 'border-slate-200 bg-slate-50/50 hover:border-violet-300 hover:bg-violet-50/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {w.word.split('').map((char, i) => {
                      const isHigh = w.highlight.toLowerCase().includes(char.toLowerCase());
                      return (
                        <span key={i} className={isHigh ? 'text-violet-600 underline font-extrabold' : ''}>
                          {char}
                        </span>
                      );
                    })}
                  </div>
                  {w.ipa && (
                    <div className="text-xs font-mono text-indigo-700 font-bold">
                      {w.ipa} (Anh - Anh)
                    </div>
                  )}
                  {w.reading && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded inline-block border border-amber-200">
                      🗣️ Gợi ý đọc: {w.reading}
                    </div>
                  )}
                  <div className="text-xs text-slate-600 font-medium">
                    {w.meaning}
                  </div>
                </div>

                <button
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isPlaying ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 border border-slate-200 shadow-sm'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Phonics Rule Instruction */}
        <div className="p-4 rounded-xl bg-violet-50 border border-violet-100 mb-6">
          <div className="text-xs font-bold text-violet-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-violet-600" /> Bí quyết phát âm đúng chuẩn:
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {phonics.ruleExplanation}
          </p>
        </div>

        {/* Let's Chant / Sentence in Context */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-pink-300">
                Luyện câu theo giai điệu (Let’s Chant)
              </span>
            </div>

            <button
              onClick={handlePlaySentence}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>{playingWord === 'sentence' ? 'Đang đọc...' : 'Nghe câu mẫu'}</span>
            </button>
          </div>

          <blockquote className="text-base sm:text-lg font-bold text-amber-300 italic mb-2">
            "{phonics.sentence}"
          </blockquote>
          {phonics.sentenceIpa && (
            <div className="text-xs font-mono text-pink-200 font-bold mb-1">
              {phonics.sentenceIpa} (Anh - Anh chuẩn RP)
            </div>
          )}
          {phonics.sentenceReading && (
            <div className="text-xs font-bold text-amber-300 bg-white/10 px-2.5 py-1 rounded-lg inline-block border border-white/10 mb-2">
              🗣️ Gợi ý đọc: {phonics.sentenceReading}
            </div>
          )}
          <p className="text-xs text-slate-300">
            Dịch nghĩa: {phonics.sentenceMeaning}
          </p>
        </div>
      </div>

      {/* Mini Phonics Test / Ear Training */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Thử Thách Tai Tinh Tường (Listen & Discriminate)</h3>
        <p className="text-xs text-slate-500 mb-4">
          Bấm nghe âm thanh bí ẩn và chọn từ bạn nghe thấy:
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => handlePlayWord(phonics.words[0].word)}
            className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-sky-600" />
            <span>Phát âm bí ẩn số 1</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {phonics.words.map((w, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuizAnswered(idx);
                  if (idx === 0) {
                    sound.playCorrect();
                    onAddStar(3);
                  } else {
                    sound.playWrong();
                  }
                }}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs transition-colors border ${
                  quizAnswered === idx
                    ? idx === 0
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                {w.word}
              </button>
            ))}
          </div>
        </div>

        {quizAnswered !== null && (
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
            {quizAnswered === 0 ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Chính xác tuyệt đối! Bé có đôi tai nghe tiếng Anh rất chuẩn!
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Chưa đúng rồi, hãy bấm nghe lại và chú ý âm đuôi nhé!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
