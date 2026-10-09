import React, { useState } from 'react';
import { Volume2, Sparkles, Lightbulb, Compass, CheckCircle2 } from 'lucide-react';
import { sound, speakWord } from '../../utils/audio';

interface Unit1MemoryBoosterProps {
  speechRate: number;
  onAddStar: (count: number) => void;
}

export const Unit1MemoryBooster: React.FC<Unit1MemoryBoosterProps> = ({
  speechRate,
  onAddStar
}) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const memoryAnchors = [
    {
      id: 'britain',
      country: 'Britain',
      flag: '🇬🇧',
      icon: '🕰️',
      title: 'Nước Anh (Vương quốc Anh)',
      friend: 'Lucy (Tóc vàng)',
      ipa: '/ˈbrɪtn/',
      reading: 'BRIT-từn',
      accentWord: 'BRIT',
      mnemonic: 'Tháp Big Ben gõ boong boong ➔ Nhấn mạnh "BRIT", đuôi "từn" nhẹ.',
      sentence: "I'm from Britain.",
      sentenceIpa: "/aɪm frəm ˈbrɪtn/",
      sentenceReading: 'Ai-m ph-rơm BRIT-từn.',
      bgColor: 'from-blue-600 to-indigo-700',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      id: 'america',
      country: 'America',
      flag: '🇺🇸',
      icon: '🗽',
      title: 'Nước Mỹ (Hoa Kỳ)',
      friend: 'Mary (Thân thiện)',
      ipa: '/əˈmerɪkə/',
      reading: 'Ờ-ME-ri-kơ',
      accentWord: 'ME',
      mnemonic: 'Nữ thần Tự Do giơ cao ngọn đuốc ➔ Nhấn âm "ME" vút cao!',
      sentence: "I'm from America.",
      sentenceIpa: "/aɪm frəm əˈmerɪkə/",
      sentenceReading: 'Ai-m ph-rơm Ờ-ME-ri-kơ.',
      bgColor: 'from-rose-600 to-red-700',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      id: 'australia',
      country: 'Australia',
      flag: '🇦🇺',
      icon: '🦘',
      title: 'Nước Úc (Ô-xtrây-li-a)',
      friend: 'Ben (Tóc xoăn)',
      ipa: '/ɒˈstreɪliə/',
      reading: 'O-STREI-li-ơ',
      accentWord: 'STREI',
      mnemonic: 'Chú chuột túi Kangaroo bật nhảy ➔ Mở tròn "O" rồi bật mạnh "STREI"!',
      sentence: "I'm from Australia.",
      sentenceIpa: "/aɪm frəm ɒˈstreɪliə/",
      sentenceReading: 'Ai-m ph-rơm O-STREI-li-ơ.',
      bgColor: 'from-amber-600 to-yellow-700',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'vietnam',
      country: 'Viet Nam',
      flag: '🇻🇳',
      icon: '🪷',
      title: 'Việt Nam Thân Yêu',
      friend: 'Minh (Năng động)',
      ipa: '/ˌvjet ˈnæm/',
      reading: 'Vi-et NAM',
      accentWord: 'NAM',
      mnemonic: 'Hoa sen tỏa hương thơm ngát ➔ Nhấn âm "NAM" và khép môi /m/ nhẹ.',
      sentence: "I'm from Viet Nam.",
      sentenceIpa: "/aɪm frəm ˌvjet ˈnæm/",
      sentenceReading: 'Ai-m ph-rơm Vi-et NAM.',
      bgColor: 'from-emerald-600 to-teal-700',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    }
  ];

  const handlePlayCard = async (anchor: typeof memoryAnchors[0]) => {
    sound.playClick();
    setActiveCard(anchor.id);
    await speakWord(anchor.country, speechRate);
    await new Promise(r => setTimeout(r, 300));
    await speakWord(anchor.sentence, speechRate);
    setActiveCard(null);
    sound.playStar();
    onAddStar(1);
  };

  const handlePlayFormula = async () => {
    sound.playClick();
    await speakWord('Where are you from?', speechRate);
    await new Promise(r => setTimeout(r, 400));
    await speakWord("I'm from Viet Nam.", speechRate);
    onAddStar(2);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-500/20 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Phương Pháp Ghi Nhớ Đỉnh Cao · Não Phải Dễ Nhớ Lâu</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🧠 Bí Kíp 3 Giây Thuộc Ngay Bài 1</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Học sinh nhìn hình ảnh liên tưởng độc quyền — Phụ huynh nắm chắc 2 câu hỏi đáp cốt lõi chỉ sau 1 phút!
          </p>
        </div>

        <button
          onClick={handlePlayFormula}
          className="self-start md:self-auto px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
        >
          <Volume2 className="w-4 h-4 fill-slate-950" />
          <span>Nghe Mẫu Câu Chuẩn Cốt Lõi</span>
        </button>
      </div>

      {/* Core Question & Answer Formula Pill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/30 border border-sky-400/40 text-2xl flex items-center justify-center shrink-0">
            🌍
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
              Mẫu Câu Hỏi (Xuất phát điểm từ đâu?)
            </div>
            <div className="text-lg font-black text-white">
              Where are you from?
            </div>
            <div className="text-xs font-mono text-indigo-300">
              /weər ɑː juː frɒm/
            </div>
            <div className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 inline-block">
              🗣️ Nối âm tự nhiên: We-ơ r-a iu ph-rom?
            </div>
            <p className="text-[11px] text-slate-300">
              💡 Nghĩa: <em>"Bạn đến từ đâu?"</em>
            </p>
          </div>
        </div>

        {/* Answer Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 border border-emerald-400/40 text-2xl flex items-center justify-center shrink-0">
            🎯
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
              Mẫu Câu Trả Lời (Đến từ nước nào?)
            </div>
            <div className="text-lg font-black text-white">
              I'm from + [Tên Quốc Gia].
            </div>
            <div className="text-xs font-mono text-emerald-300">
              /aɪm frəm.../
            </div>
            <div className="text-xs font-bold text-emerald-200 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 inline-block">
              🗣️ Mẹo vàng: Khép môi ở chữ "I'm" (Ai-m ph-rơm...)
            </div>
            <p className="text-[11px] text-rose-300">
              ⚠️ Không nói cộc "I from...", phải có "I'm" đầy đủ!
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Memory Anchor Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>4 Quốc Gia SGK — Thẻ Trí Nhớ Bằng Hình Ảnh Liên Tưởng:</span>
          </div>
          <span className="text-[11px] text-slate-400">Bấm thẻ để nghe phát âm</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {memoryAnchors.map(anchor => {
            const isPlaying = activeCard === anchor.id;
            return (
              <button
                key={anchor.id}
                onClick={() => handlePlayCard(anchor)}
                className={`text-left p-4 rounded-2xl transition-all relative overflow-hidden group border ${
                  isPlaying
                    ? 'ring-2 ring-amber-400 shadow-xl bg-white/20 border-white/40 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/25'
                }`}
              >
                {/* Flag & Icon Row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl filter drop-shadow-sm">{anchor.flag}</span>
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                    {anchor.icon}
                  </div>
                </div>

                {/* Country Name & Pronunciation */}
                <div className="space-y-0.5">
                  <div className="text-lg font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    <span>{anchor.country}</span>
                    <Volume2 className={`w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 ${isPlaying ? 'animate-bounce text-amber-400' : ''}`} />
                  </div>
                  <div className="text-[11px] font-mono text-indigo-300">
                    {anchor.ipa}
                  </div>
                  <div className="text-xs font-bold text-amber-300">
                    Đọc: {anchor.reading}
                  </div>
                </div>

                {/* Mnemonic Hint */}
                <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-1">
                  <div className="text-[11px] text-slate-300 leading-snug">
                    {anchor.mnemonic}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Bạn {anchor.friend}
                  </div>
                </div>

                {/* Bottom Sentence Pill */}
                <div className="mt-2 text-[11px] font-semibold text-emerald-300 bg-white/5 px-2 py-1 rounded-lg">
                  "{anchor.sentence}"
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
