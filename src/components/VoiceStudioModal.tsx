import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, Sliders, Music, Zap, X } from 'lucide-react';
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

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  currentSpeechRate,
  onUpdateSpeechRate
}) => {
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setLocalURI] = useState<string>('');
  const [pitch, setLocalPitch] = useState<number>(1.15);
  const [testingText, setTestingText] = useState<string>("Hello! I'm Lucy. Where are you from? I'm from Britain.");
  const [isSpeakingTest, setIsSpeakingTest] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const voices = getEnglishFemaleVoices();
    setSystemVoices(voices);

    // Auto find Google US English
    const googleVoice = voices.find(v =>
      v.name.toLowerCase().includes('google us english') ||
      (v.name.toLowerCase().includes('google') && v.lang === 'en-US')
    ) || voices[0];

    if (googleVoice) {
      setLocalURI(googleVoice.voiceURI);
      setSelectedVoiceURI(googleVoice.voiceURI);
    }

    const currentP = getGlobalPitch();
    setLocalPitch(currentP);

    setActiveVoicePersona('google_us_english_gb');

    const handleVoicesChanged = () => {
      const updated = getEnglishFemaleVoices();
      setSystemVoices(updated);
      const matched = updated.find(v =>
        v.name.toLowerCase().includes('google us english') ||
        (v.name.toLowerCase().includes('google') && v.lang === 'en-US')
      ) || updated[0];
      if (matched) {
        setLocalURI(matched.voiceURI);
        setSelectedVoiceURI(matched.voiceURI);
      }
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePitchChange = (newPitch: number) => {
    setLocalPitch(newPitch);
    setGlobalPitch(newPitch);
  };

  const playPreview = async (customPhrase?: string) => {
    const textToSpeak = customPhrase || testingText;
    setIsSpeakingTest(true);
    await speakWord(textToSpeak, currentSpeechRate);
    setIsSpeakingTest(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <Music className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Cài Đặt Giọng Đọc Google US English (Anh - Anh)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đã khóa duy nhất giọng Google US English chất lượng cao cho toàn bộ ứng dụng Tiếng Anh 4.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Exclusive Selected Voice Card matching user image */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>1. Giọng phát âm kích hoạt:</span>
            <span className="text-rose-600 font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Duy nhất 1 giọng chuẩn cao cấp
            </span>
          </div>

          {/* Card exactly styled as the user's reference */}
          <div
            onClick={() => playPreview()}
            className="w-full px-5 py-4 rounded-2xl border-2 border-rose-400 bg-rose-50/70 shadow-xs flex items-center justify-between cursor-pointer hover:bg-rose-100/60 transition-all select-none group ring-2 ring-rose-200/50"
          >
            <div className="flex items-center gap-4">
              <span className="text-rose-900 font-black text-base sm:text-lg tracking-wide shrink-0">
                GB
              </span>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-rose-950 text-sm sm:text-base tracking-tight">
                    Google US English (Anh - Anh)
                  </span>
                  <span className="text-[11px] font-black text-rose-800 bg-rose-200/80 px-1.5 py-0.2 rounded">
                    GB
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-600 group-hover:text-rose-800 transition-colors mt-0.5">
                  Google US English • en-US
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-rose-600 hidden sm:inline">
                Chất lượng cao
              </span>
              <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 italic">
            * Toàn bộ bài học SGK, từ vựng, hội thoại và đề thi sẽ sử dụng trực tiếp chất giọng Google US English này.
          </p>
        </div>

        {/* Voice Parameters Tuning: Resonance/Pitch & Speed */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-slate-600" />
            <span>2. Tinh chỉnh độ vang & cao độ giọng:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Pitch slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Độ vang sáng (Cao độ pitch):</span>
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
                <span>Trầm ấm (0.9x)</span>
                <span>Vang sáng (1.15x)</span>
                <span>Trong vút (1.35x)</span>
              </div>
            </div>

            {/* Speed slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Tốc độ đọc:</span>
                <span className="font-mono text-indigo-700 font-bold">{currentSpeechRate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.65"
                max="1.1"
                step="0.05"
                value={currentSpeechRate}
                onChange={e => onUpdateSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Rất chậm (0.65x)</span>
                <span>Dễ học (0.88x)</span>
                <span>Bản ngữ (1.0x)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Verified device voice */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            3. Trạng thái kết nối giọng đọc trên thiết bị:
          </label>
          <div className="w-full p-3.5 rounded-xl border border-rose-300 text-xs sm:text-sm font-semibold bg-rose-50/50 text-rose-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Google US English (en-US) · [Chất lượng cao]</span>
            </div>
            <span className="text-xs text-rose-700 font-bold bg-white px-2.5 py-1 rounded-md border border-rose-200">
              Đang hoạt động 100%
            </span>
          </div>
        </div>

        {/* Live Audio Test Area */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Nghe thử chất giọng ngay lập tức:
            </span>
            <button
              onClick={() => playPreview()}
              disabled={isSpeakingTest}
              className="px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 text-xs font-extrabold rounded-xl shadow-sm transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Volume2 className={`w-4 h-4 ${isSpeakingTest ? 'animate-bounce' : ''}`} />
              <span>{isSpeakingTest ? 'Đang phát...' : 'Phát giọng thử nghiệm'}</span>
            </button>
          </div>

          <div className="bg-white/15 p-3 rounded-xl backdrop-blur-sm text-xs sm:text-sm font-semibold italic text-amber-100">
            "{testingText}"
          </div>

          {/* Quick preset test buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => playPreview("Where are you from? I'm from Britain.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "Where are you from? I'm from Britain."
            </button>
            <button
              onClick={() => playPreview("Hello Lucy, I am Ben. I'm from Australia.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "Hello Lucy, I am Ben."
            </button>
            <button
              onClick={() => playPreview("The light is red. It says stop!")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "The light is red. It says stop!"
            </button>
          </div>
        </div>

        {/* Modal Bottom Done */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              sound.playVictory();
              onClose();
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors"
          >
            Hoàn tất & Áp dụng giọng này
          </button>
        </div>
      </div>
    </div>
  );
};
