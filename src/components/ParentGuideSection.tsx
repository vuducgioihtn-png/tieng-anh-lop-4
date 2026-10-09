import React, { useState } from 'react';
import { Heart, Volume2, ShieldAlert, Award, Sparkles, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { ParentGuide } from '../data/curriculum';
import { speakWord, sound } from '../utils/audio';

interface ParentGuideSectionProps {
  guide: ParentGuide;
  unitTitle: string;
  speechRate: number;
}

export const ParentGuideSection: React.FC<ParentGuideSectionProps> = ({
  guide,
  unitTitle,
  speechRate
}) => {
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const handlePlayAudio = async (text: string, id: string) => {
    sound.playClick();
    setPlayingPhrase(id);
    await speakWord(text, speechRate);
    setPlayingPhrase(null);
  };

  return (
    <div className="space-y-6">
      {/* Warm Welcome Banner for Parents */}
      <div className="bg-gradient-to-br from-rose-500 via-amber-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Góc Đồng Hành Cùng Con Yêu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Cẩm Nang Dành Riêng Cho Phụ Huynh: {unitTitle}
          </h2>

          <p className="text-sm text-amber-50 mt-2 leading-relaxed">
            {guide.overview} Kể cả khi bố mẹ không thành thạo tiếng Anh, ứng dụng vẫn trang bị đầy đủ phát âm mẫu, phiên âm tiếng Việt và kịch bản hỏi đáp để bố mẹ tự tin dạy con tại nhà!
          </p>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 pointer-events-none blur-2xl" />
      </div>

      {/* Grid: Core Goals & Common Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Learning Goals */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Mục Tiêu Trọng Tâm Sau Bài Học</span>
          </div>
          <p className="text-xs text-slate-500">
            Bố mẹ có thể kiểm tra xem con đã đạt được những năng lực này chưa nhé:
          </p>

          <div className="space-y-2.5">
            {guide.coreGoals.map((goal, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800 leading-normal">
                  {goal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & How to Fix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Bẫy Sai Học Sinh Hay Mắc (Và Cách Giúp Con Chữa)</span>
          </div>
          <p className="text-xs text-slate-500">
            Các thầy cô chấm thi thường hay gài bẫy những lỗi này:
          </p>

          <div className="space-y-3">
            {guide.commonMistakes.map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="line-through text-xs font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-200">
                    ❌ {item.mistake}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    ✅ {item.correction}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Lý do & Cách giải thích cho con:</strong> {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-life Family Roleplay Dialogues */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-sky-600" />
              <span>Kịch Bản Hội Thoại Gia Đình (Bố Mẹ Hỏi - Con Đáp)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bố mẹ chỉ cần bấm nghe mẫu rồi đọc câu tiếng Anh, lắng nghe con phản xạ lại!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {guide.familyRoleplays.map((roleplay, index) => (
            <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              {/* Parent's line */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  👨‍👩‍👧
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">Bố / Mẹ đọc:</span>
                    <button
                      onClick={() => handlePlayAudio(roleplay.parentPrompt, `p-${index}`)}
                      className="p-1 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-white"
                      title="Nghe giọng chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    "{roleplay.parentPrompt}"
                  </div>
                  {roleplay.parentPromptIpa && (
                    <div className="text-[11px] font-mono text-indigo-700 mt-0.5">
                      {roleplay.parentPromptIpa}
                    </div>
                  )}
                  {roleplay.parentPromptReading && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                      🗣️ Gợi ý đọc: {roleplay.parentPromptReading}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    (Nghĩa: {roleplay.parentPromptVi})
                  </div>
                </div>
              </div>

              {/* Child's line */}
              <div className="flex items-start gap-3 pl-4 border-l-2 border-sky-400">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  🧒
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-900">Con sẽ hào hứng trả lời:</span>
                    <button
                      onClick={() => handlePlayAudio(roleplay.childResponse, `c-${index}`)}
                      className="p-1 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-white"
                      title="Nghe giọng chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-sky-950 mt-0.5">
                    "{roleplay.childResponse}"
                  </div>
                  {roleplay.childResponseIpa && (
                    <div className="text-[11px] font-mono text-indigo-700 mt-0.5">
                      {roleplay.childResponseIpa}
                    </div>
                  )}
                  {roleplay.childResponseReading && (
                    <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                      🗣️ Gợi ý đọc: {roleplay.childResponseReading}
                    </div>
                  )}
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    (Nghĩa: {roleplay.childResponseVi})
                  </div>
                </div>
              </div>

              {/* Coaching Tip */}
              <div className="bg-amber-100/70 p-2.5 rounded-xl text-xs text-amber-950 font-medium">
                💡 <strong>Mẹo nhỏ cho bố mẹ:</strong> {roleplay.coachingTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested 5-Minute Home Game */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-violet-900 font-bold text-base">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span>Hoạt Động Gia Đình 5 Phút: {guide.homeActivity.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-violet-700 font-semibold bg-violet-100 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.homeActivity.timeNeeded}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {guide.homeActivity.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold text-violet-900 bg-white/80 p-3 rounded-xl border border-violet-100">
          🌟 <strong>Lợi ích vượt trội:</strong> {guide.homeActivity.benefit}
        </div>
      </div>

      {/* Native Praise Bank for Parents */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
          <Award className="w-5 h-5 text-amber-600" />
          <span>Ngân Hàng Câu Khen Ngợi Tiếng Anh Bản Xứ (Dành Cho Bố Mẹ)</span>
        </div>
        <p className="text-xs text-slate-500">
          Mỗi lần con trả lời đúng hoặc tiến bộ, hãy bấm loa nghe rồi nói câu khen này với con nhé!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guide.praisePhrases.map((phrase, i) => (
            <div
              key={i}
              onClick={() => handlePlayAudio(phrase.en, `praise-${i}`)}
              className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-amber-800">
                  "{phrase.en}"
                </div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">
                  → {phrase.vi}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  [{phrase.phonetic}]
                </div>
              </div>

              <button className="w-9 h-9 rounded-xl bg-white text-amber-600 group-hover:bg-amber-500 group-hover:text-white border border-slate-200 shadow-sm flex items-center justify-center transition-colors shrink-0">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
