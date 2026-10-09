import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, Sliders, Music, Zap, X, Globe, Heart, Play } from 'lucide-react';
import {
  PRESET_VOICE_PERSONAS,
  VoicePersona,
  getEnglishFemaleVoices,
  setSelectedVoiceURI,
  setGlobalPitch,
  getGlobalPitch,
  getActiveVoicePersona,
  setActiveVoicePersona,
  speakWord,
  sound
} from '../utils/audio';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpeechRate: number;
  onUpdateSpeechRate: (rate: number) => void;
}

type FilterCategory = 'all' | 'us' | 'uk' | 'au' | 'ai';

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  currentSpeechRate,
  onUpdateSpeechRate
}) => {
  const [activePersona, setActivePersona] = useState<VoicePersona>(getActiveVoicePersona());
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [pitch, setLocalPitch] = useState<number>(1.12);
  const [testingText, setTestingText] = useState<string>("Hello! I'm Lucy. Where are you from? I'm from Britain.");
  const [auditioningId, setAuditioningId] = useState<string | null>(null);
  const [isSpeakingTest, setIsSpeakingTest] = useState<boolean>(false);
  const [detectedVoicesCount, setDetectedVoicesCount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    const currentP = getActiveVoicePersona();
    setActivePersona(currentP);
    setLocalPitch(getGlobalPitch() || currentP.recommendedPitch);

    const femaleVoices = getEnglishFemaleVoices();
    setDetectedVoicesCount(femaleVoices.length);

    const handleVoicesChanged = () => {
      const updated = getEnglishFemaleVoices();
      setDetectedVoicesCount(updated.length);
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPersona = (persona: VoicePersona) => {
    sound.playClick();
    setActivePersona(persona);
    setActiveVoicePersona(persona.id);
    setLocalPitch(persona.recommendedPitch);
  };

  const handlePitchChange = (newPitch: number) => {
    setLocalPitch(newPitch);
    setGlobalPitch(newPitch);
  };

  const playAudition = async (persona: VoicePersona, phrase?: string) => {
    const textToSpeak = phrase || (
      persona.id === 'victoria' ? "Where are you from? I'm from London, Britain." :
      persona.id === 'karen' ? "G'day! I'm from Sydney, Australia. Nice to meet you!" :
      persona.id === 'aoede' ? "Good morning, class! Let's learn English unit one together." :
      persona.id === 'jenny' ? "Look and listen! The red light says stop, and the green light says go." :
      persona.id === 'samantha' ? "Hi there! What's the weather like in New York today? It's sunny!" :
      "Hello! I am Callirrhoe. Welcome to Grade 4 English class!"
    );

    setAuditioningId(persona.id);
    try {
      await speakWord(textToSpeak, currentSpeechRate, persona.id);
    } finally {
      setAuditioningId(null);
    }
  };

  const playMainTest = async (phrase?: string) => {
    const textToSpeak = phrase || testingText;
    setIsSpeakingTest(true);
    try {
      await speakWord(textToSpeak, currentSpeechRate, activePersona.id);
    } finally {
      setIsSpeakingTest(false);
    }
  };

  const filteredPersonas = PRESET_VOICE_PERSONAS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.category === 'ai';
    if (filter === 'us') return p.category === 'us' || p.category === 'ai';
    if (filter === 'uk') return p.category === 'uk';
    if (filter === 'au') return p.category === 'au';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-rose-100 text-rose-600 shadow-2xs">
                <Music className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Bộ Sưu Tập Giọng Nữ Tiếng Anh Hay Nhất
                  <span className="text-xs bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                    Tuyển Chọn
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Chọn chất giọng nữ bản ngữ và Google AI phù hợp nhất với phong cách học tập của bạn.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span>1. Chọn chất giọng nữ bạn yêu thích:</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { sound.playClick(); setFilter('all'); }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({PRESET_VOICE_PERSONAS.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('ai'); }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'ai'
                  ? 'bg-rose-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✨ Google AI & Studio
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('us'); }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'us'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇺🇸 Anh - Mỹ (US)
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('uk'); }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'uk'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 Anh - Anh (UK)
            </button>
            <button
              onClick={() => { sound.playClick(); setFilter('au'); }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'au'
                  ? 'bg-cyan-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇦🇺 Anh - Úc (AU)
            </button>
          </div>
        </div>

        {/* Voices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredPersonas.map((persona) => {
            const isSelected = activePersona.id === persona.id;
            const isAuditioning = auditioningId === persona.id;

            return (
              <div
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-left select-none group ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-200 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
                }`}
              >
                {/* Top Row: Avatar + Name + Tag + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${persona.avatarBg} text-white font-black text-sm flex items-center justify-center shadow-2xs shrink-0`}
                    >
                      {persona.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                          {persona.name}
                        </span>
                        {persona.id === 'callirrhoe' && (
                          <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-md">
                            Yêu thích ⭐
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-bold text-slate-500">
                          {persona.accent}
                        </span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${persona.badgeColor}`}>
                          {persona.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selection Checkmark */}
                  <div className="shrink-0">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                  {persona.description}
                </p>

                {/* Card Action Footer: Quick Audition Button */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudition(persona);
                    }}
                    disabled={isAuditioning}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                      isAuditioning
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isSelected
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isAuditioning ? 'animate-bounce' : ''}`} />
                    <span>{isAuditioning ? 'Đang phát mẫu...' : '🔊 Nghe thử giọng'}</span>
                  </button>

                  <span className="text-[11px] font-bold text-slate-400 font-mono">
                    Pitch: {persona.recommendedPitch}x • Rate: {persona.recommendedRate}x
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Voice Fine-Tuning */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-rose-500" />
              <span>2. Tinh chỉnh âm sắc cho giọng "{activePersona.name}":</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                handlePitchChange(activePersona.recommendedPitch);
                onUpdateSpeechRate(activePersona.recommendedRate);
              }}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline"
            >
              Đặt lại mức tối ưu
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pitch slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Độ vang & cao độ (Pitch):</span>
                <span className="font-mono text-rose-700 font-bold">{pitch.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.9"
                max="1.35"
                step="0.02"
                value={pitch}
                onChange={e => handlePitchChange(parseFloat(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Trầm ấm (0.90x)</span>
                <span>Tự nhiên (1.10x)</span>
                <span>Trong trẻo (1.30x)</span>
              </div>
            </div>

            {/* Speed slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Tốc độ đọc (Speech Rate):</span>
                <span className="font-mono text-indigo-700 font-bold">{currentSpeechRate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.65"
                max="1.15"
                step="0.05"
                value={currentSpeechRate}
                onChange={e => onUpdateSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Rất chậm (0.65x)</span>
                <span>Vừa phải (0.88x)</span>
                <span>Bản xứ (1.0x)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Audio Test Area */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> 3. Phòng nghe thử với giọng "{activePersona.name}":
            </span>
            <button
              onClick={() => playMainTest()}
              disabled={isSpeakingTest}
              className="px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 text-xs font-extrabold rounded-xl shadow-sm transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Volume2 className={`w-4 h-4 ${isSpeakingTest ? 'animate-bounce' : ''}`} />
              <span>{isSpeakingTest ? 'Đang phát...' : 'Phát giọng kiểm tra'}</span>
            </button>
          </div>

          <div className="bg-white/15 p-3 rounded-xl backdrop-blur-sm text-xs sm:text-sm font-semibold italic text-amber-100 flex items-center justify-between gap-3">
            <span>"{testingText}"</span>
          </div>

          {/* Quick preset test buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              onClick={() => playMainTest("Where are you from? I'm from Britain.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              🏫 "Where are you from?"
            </button>
            <button
              onClick={() => playMainTest("What's the weather like in Ha Noi today? It's sunny and warm.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              ☀️ "What's the weather like?"
            </button>
            <button
              onClick={() => playMainTest("The traffic light is red. It says stop!")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              🚦 "The traffic light is red."
            </button>
            <button
              onClick={() => playMainTest("She is a very friendly English teacher.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              👩‍🏫 "She is a friendly teacher."
            </button>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 flex-wrap">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Đã kết nối giọng đọc: <strong className="text-slate-800">{activePersona.name}</strong></span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              sound.playVictory();
              onClose();
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Áp dụng giọng này để học</span>
          </button>
        </div>
      </div>
    </div>
  );
};
