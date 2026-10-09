import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Check, Sliders, Music, Zap, RefreshCw, X } from 'lucide-react';
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
  const [pitch, setLocalPitch] = useState<number>(1.18);
  const [activePersonaId, setActivePersonaId] = useState<string>('leda_resonant');
  const [testingText, setTestingText] = useState<string>("Hello! I'm Lucy. Where are you from? I'm from Britain.");
  const [isSpeakingTest, setIsSpeakingTest] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const voices = getEnglishFemaleVoices();
    setSystemVoices(voices);

    const savedURI = localStorage.getItem('ta4_voice_uri') || '';
    setLocalURI(savedURI);

    const currentP = getGlobalPitch();
    setLocalPitch(currentP);

    const active = getActiveVoicePersona();
    setActivePersonaId(active.id);

    const handleVoicesChanged = () => {
      setSystemVoices(getEnglishFemaleVoices());
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyPersona = async (persona: VoicePersona) => {
    sound.playClick();
    setActivePersonaId(persona.id);
    setActiveVoicePersona(persona.id);
    setLocalPitch(persona.recommendedPitch);
    setGlobalPitch(persona.recommendedPitch);
    onUpdateSpeechRate(persona.recommendedRate);

    // Find best match in system voices
    let matchedVoice: SpeechSynthesisVoice | undefined;
    if (persona.id === 'leda_resonant') {
      matchedVoice = systemVoices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Zira'));
    } else if (persona.id === 'samantha_clear') {
      matchedVoice = systemVoices.find(v => v.name.includes('Samantha') || v.name.includes('Victoria'));
    } else if (persona.id === 'aria_studio') {
      matchedVoice = systemVoices.find(v => v.name.includes('Aria') || v.name.includes('Jenny') || v.name.includes('Natural'));
    } else if (persona.id === 'sonia_british') {
      matchedVoice = systemVoices.find(v => v.lang.includes('GB') || v.name.includes('UK') || v.name.includes('Sonia'));
    }

    if (matchedVoice) {
      setLocalURI(matchedVoice.voiceURI);
      setSelectedVoiceURI(matchedVoice.voiceURI);
    }

    // Play test audio immediately with this persona
    await playPreview();
  };

  const handleSelectSystemVoice = async (uri: string) => {
    sound.playClick();
    setLocalURI(uri);
    setSelectedVoiceURI(uri);
    await playPreview();
  };

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
              <span className="p-2 rounded-xl bg-pink-100 text-pink-700">
                <Music className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Phòng Chọn Giọng Nữ Chuẩn Anh - Anh & Vang Sáng (British RP Studio)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tùy chỉnh chất giọng chuẩn sách giáo khoa Macmillan Tiếng Anh 4 (Bộ GD&ĐT), ngân vang và rành mạch.
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

        {/* 4 Curated Resonant Personas */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>1. Chọn phong cách giọng đọc tối ưu:</span>
            <span className="text-pink-600 font-semibold text-[11px]">Đã tinh chỉnh độ vang tự nhiên</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_VOICE_PERSONAS.map(persona => {
              const isSelected = activePersonaId === persona.id;
              return (
                <div
                  key={persona.id}
                  onClick={() => handleApplyPersona(persona)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50/60 shadow ring-2 ring-pink-200'
                      : 'border-slate-200 bg-slate-50/50 hover:border-pink-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        {persona.name}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-pink-700">
                      <span className="bg-pink-100 px-2 py-0.5 rounded-md">
                        {persona.accent}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-normal">{persona.tag}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {persona.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-pink-600">
                    <span>Bấm để nghe thử</span>
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
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
                <span className="font-mono text-pink-700 font-bold">{pitch.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.9"
                max="1.35"
                step="0.02"
                value={pitch}
                onChange={e => handlePitchChange(parseFloat(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Trầm ấm (0.9x)</span>
                <span>Vang sáng (1.18x)</span>
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
                <span>Dễ học (0.85x)</span>
                <span>Bản ngữ (1.0x)</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Voices Dropdown (If device has multiple female voices installed) */}
        {systemVoices.length > 0 && (
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              3. Bộ giọng tiếng Anh trên thiết bị của bạn ({systemVoices.length} giọng sẵn có):
            </label>
            <select
              value={selectedURI}
              onChange={e => handleSelectSystemVoice(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white text-slate-800 shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none"
            >
              <option value="">-- Mặc định giọng Nữ tối ưu (Leda / Google / Apple) --</option>
              {systemVoices.map((v, i) => (
                <option key={v.voiceURI || i} value={v.voiceURI || v.name}>
                  {v.name} ({v.lang}) {v.localService ? '· [Sẵn trong máy]' : '· [Chất lượng cao]'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Live Audio Test Area */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-2xl p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Nghe thử chất giọng ngay lập tức:
            </span>
            <button
              onClick={() => playPreview()}
              disabled={isSpeakingTest}
              className="px-4 py-2 bg-white text-pink-700 hover:bg-pink-50 text-xs font-extrabold rounded-xl shadow-sm transition-transform active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
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
              onClick={() => playPreview("Where are you from? I'm from Viet Nam.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "Where are you from?"
            </button>
            <button
              onClick={() => playPreview("Hello Lucy, I am Ben. I'm from Australia.")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "I'm from Australia"
            </button>
            <button
              onClick={() => playPreview("The light is red. It says stop!")}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-[11px] font-bold rounded-lg transition-colors"
            >
              "The light is red"
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
