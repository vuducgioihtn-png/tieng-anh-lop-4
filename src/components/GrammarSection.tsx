import React, { useState } from 'react';
import { Volume2, HelpCircle, Lightbulb, Play, UserCheck } from 'lucide-react';
import { GrammarStructure } from '../data/curriculum';
import { speakWord, sound } from '../utils/audio';

interface GrammarSectionProps {
  grammarList: GrammarStructure[];
  speechRate: number;
  onAddStar: (count: number) => void;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({ grammarList, speechRate, onAddStar }) => {
  const [playingDialogId, setPlayingDialogId] = useState<string | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B' | null>(null);

  const handlePlayDialog = async (item: GrammarStructure) => {
    sound.playClick();
    setPlayingDialogId(item.id);

    // Speak Line A
    setActiveSpeaker('A');
    await speakWord(item.dialog.textA, speechRate);
    await new Promise(r => setTimeout(r, 400));

    // Speak Line B
    setActiveSpeaker('B');
    await speakWord(item.dialog.textB, speechRate);

    setActiveSpeaker(null);
    setPlayingDialogId(null);
    sound.playStar();
    onAddStar(2);
  };

  const handlePlaySingleLine = async (text: string) => {
    sound.playClick();
    await speakWord(text, speechRate);
  };

  return (
    <div className="space-y-6">
      {/* Overview intro */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Mẫu Câu Giao Tiếp & Bí Kíp Hiểu Sâu Bản Chất</h2>
        <p className="text-sm text-slate-500 mt-1">
          Học sinh lớp 4 không cần học ngữ pháp khô khan. Ứng dụng phân tích bản chất bằng sơ đồ màu sắc, hội thoại thực tế và mẹo thơ vần siêu dễ nhớ!
        </p>
      </div>

      {/* Grammar Cards */}
      <div className="grid grid-cols-1 gap-6">
        {grammarList.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header: Title & Structure badge */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <div className="text-xs bg-sky-500/20 text-sky-200 font-mono px-3 py-1 rounded-lg border border-sky-400/30">
                  {item.meaning}
                </div>
              </div>

              {/* Main Formula Display */}
              <div className="mt-4 p-3.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                <div className="font-mono text-sm sm:text-base text-amber-300 font-bold flex items-center justify-between gap-2">
                  <span>{item.structure}</span>
                  <button
                    onClick={() => handlePlaySingleLine(item.dialog.textA + '. ' + item.dialog.textB)}
                    className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 transition-colors text-xs flex items-center gap-1 font-sans font-medium"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Nghe mẫu</span>
                  </button>
                </div>
                {item.structureIpa && (
                  <div className="text-xs font-mono text-sky-200">
                    {item.structureIpa} (Anh - Anh)
                  </div>
                )}
                {item.parentReadingGuide && (
                  <div className="text-xs font-bold text-amber-200 bg-white/10 px-2.5 py-1 rounded-lg inline-block border border-white/10">
                    🗣️ Gợi ý đọc: {item.parentReadingGuide}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Interactive Dialogue Stage (Look, listen and repeat) */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    Hội thoại tương tác (Look, listen and repeat)
                  </div>
                  <button
                    onClick={() => handlePlayDialog(item)}
                    disabled={playingDialogId === item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{playingDialogId === item.id ? 'Đang đọc...' : 'Nghe cả đoạn'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Speaker A */}
                  <div
                    onClick={() => handlePlaySingleLine(item.dialog.textA)}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                      activeSpeaker === 'A'
                        ? 'bg-sky-100 border border-sky-300 shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-sky-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {item.dialog.speakerA[0]}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-900">{item.dialog.speakerA}</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-sky-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{item.dialog.textA}</p>
                      {item.dialog.textAIpa && (
                        <div className="text-[11px] font-mono text-indigo-700 font-bold">
                          {item.dialog.textAIpa} (Anh - Anh)
                        </div>
                      )}
                      {item.dialog.textAPhonetic && (
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                          🗣️ Gợi ý đọc: {item.dialog.textAPhonetic}
                        </div>
                      )}
                      <p className="text-xs text-slate-500 italic">→ {item.dialog.textAVi}</p>
                    </div>
                  </div>

                  {/* Speaker B */}
                  <div
                    onClick={() => handlePlaySingleLine(item.dialog.textB)}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                      activeSpeaker === 'B'
                        ? 'bg-emerald-100 border border-emerald-300 shadow-sm'
                        : 'bg-white border border-slate-200 hover:border-emerald-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {item.dialog.speakerB[0]}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900">{item.dialog.speakerB}</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{item.dialog.textB}</p>
                      {item.dialog.textBIpa && (
                        <div className="text-[11px] font-mono text-indigo-700 font-bold">
                          {item.dialog.textBIpa} (Anh - Anh)
                        </div>
                      )}
                      {item.dialog.textBPhonetic && (
                        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200/60">
                          🗣️ Gợi ý đọc: {item.dialog.textBPhonetic}
                        </div>
                      )}
                      <p className="text-xs text-slate-500 italic">→ {item.dialog.textBVi}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two-Column Breakdown: Deep Explanation & Memory Trick */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Deep Explanation */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Hiểu sâu bản chất (Tại sao lại vậy?)
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 font-medium">
                    {item.deepExplanation}
                  </p>
                </div>

                {/* Memory Trick */}
                <div className="bg-violet-50/70 border border-violet-200/80 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-violet-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <Lightbulb className="w-4 h-4 text-violet-600" />
                    Mẹo thơ vần nhớ nhanh
                  </div>
                  <p className="text-xs leading-relaxed text-violet-950 font-bold bg-white/70 p-2.5 rounded-xl border border-violet-200">
                    💡 "{item.memoryTrick}"
                  </p>
                </div>
              </div>

              {/* More Examples */}
              {item.examples.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Các câu ví dụ mở rộng trong đề thi:
                  </div>
                  <div className="space-y-1.5">
                    {item.examples.map((ex, i) => (
                      <div
                        key={i}
                        onClick={() => handlePlaySingleLine(ex)}
                        className="flex items-center justify-between text-xs font-medium text-slate-700 bg-slate-50 hover:bg-sky-50 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <span>• {ex}</span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 hover:text-sky-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
