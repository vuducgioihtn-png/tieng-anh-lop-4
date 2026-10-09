/**
 * High quality Web Audio API sound effects and Resonant Female English Voice Engine
 */

class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Pleasant ascending chime
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
    osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

    osc2.frequency.setValueAtTime(523.25 / 2, now);
    osc2.frequency.exponentialRampToValueAtTime(1046.50 / 2, now + 0.3);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  playDice() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 200, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    }
  }

  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    });
  }

  playStar() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(783.99, now); // G5
    osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.25); // G6

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playFanfare() {
    this.playVictory();
  }

  playPop() {
    this.playClick();
  }

  playSuccess() {
    this.playCorrect();
  }

  playWarning() {
    this.playWrong();
  }

  playComplete() {
    this.playVictory();
  }
}

export const sound = new SoundEffects();

export interface VoicePersona {
  id: string;
  name: string;
  description: string;
  accent: string;
  tag: string;
  recommendedPitch: number;
  recommendedRate: number;
}

export const PRESET_VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'leda_resonant',
    name: 'Cô Leda (Vang Sáng & Ngân Vang · Mặc Định ⭐)',
    description: 'Chất giọng nữ vang ngân, ấm áp, cao độ bay bổng (Pitch ~1.18x) giúp học sinh nghe rõ từng nguyên âm, hào hứng lặp lại.',
    accent: 'Resonant Crystal Clear',
    tag: 'Mặc định tối ưu nhất cho học sinh',
    recommendedPitch: 1.18,
    recommendedRate: 0.88
  },
  {
    id: 'sonia_british',
    name: 'Cô Sonia (Chuẩn Anh - Anh Macmillan SGK 🇬🇧)',
    description: 'Ngữ điệu Anh - Anh (British RP) chuẩn chỉnh 100% theo sách giáo khoa Global Success của Macmillan / Bộ GD&ĐT.',
    accent: 'British (Anh - Anh chuẩn)',
    tag: 'Chuẩn SGK Tiếng Anh 4',
    recommendedPitch: 1.12,
    recommendedRate: 0.88
  },
  {
    id: 'samantha_clear',
    name: 'Cô Samantha (Trong Trẻo Tinh Khiết)',
    description: 'Phát âm rành mạch từng phụ âm cuối, cực kỳ thích hợp luyện Phonics và nghe chép chính tả.',
    accent: 'Clear Articulation',
    tag: 'Rõ từng âm đuôi',
    recommendedPitch: 1.12,
    recommendedRate: 0.85
  },
  {
    id: 'aria_studio',
    name: 'Cô Aria / Jenny (Phòng Thu Bản Xứ)',
    description: 'Ngữ điệu tự nhiên như người bản xứ giảng dạy tại các trường quốc tế.',
    accent: 'Natural Neural',
    tag: 'Chuẩn quốc tế',
    recommendedPitch: 1.08,
    recommendedRate: 0.90
  }
];

let selectedVoiceURI: string = '';
let currentCustomPitch: number = 1.18; // Default Leda Resonant Pitch

export function getActiveVoicePersona(): VoicePersona {
  if (typeof window !== 'undefined') {
    const savedId = localStorage.getItem('ta4_voice_persona');
    if (savedId) {
      const found = PRESET_VOICE_PERSONAS.find(p => p.id === savedId);
      if (found) return found;
    }
  }
  return PRESET_VOICE_PERSONAS[0]; // Cô Leda default
}

export function setActiveVoicePersona(id: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ta4_voice_persona', id);
  }
}

export function setSelectedVoiceURI(uri: string) {
  selectedVoiceURI = uri;
  if (typeof window !== 'undefined') {
    localStorage.setItem('ta4_voice_uri', uri);
  }
}

export function setGlobalPitch(pitch: number) {
  currentCustomPitch = pitch;
  if (typeof window !== 'undefined') {
    localStorage.setItem('ta4_voice_pitch', pitch.toString());
  }
}

export function getGlobalPitch(): number {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ta4_voice_pitch');
    if (saved) return parseFloat(saved);
  }
  return currentCustomPitch;
}

export function getAllSystemVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

export function getEnglishFemaleVoices(): SpeechSynthesisVoice[] {
  const all = getAllSystemVoices();
  const english = all.filter(v => v.lang.startsWith('en'));
  
  const maleNames = ['david', 'george', 'mark', 'james', 'richard', 'guy', 'male', 'daniel', 'oliver', 'rishi'];
  
  // Prioritize female-like voices
  const female = english.filter(v => {
    const nameLower = v.name.toLowerCase();
    const hasFemaleFlag = nameLower.includes('female') ||
      nameLower.includes('samantha') ||
      nameLower.includes('zira') ||
      nameLower.includes('jenny') ||
      nameLower.includes('aria') ||
      nameLower.includes('sonia') ||
      nameLower.includes('victoria') ||
      nameLower.includes('karen') ||
      nameLower.includes('moira') ||
      nameLower.includes('fiona') ||
      nameLower.includes('google us english') ||
      nameLower.includes('google uk english female') ||
      nameLower.includes('natural') ||
      nameLower.includes('wavenet') ||
      nameLower.includes('neural');
    
    const isMale = maleNames.some(m => nameLower.includes(m));
    return hasFemaleFlag || !isMale;
  });

  return female.length > 0 ? female : english;
}

function resolveActiveVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Check user explicit choice from localStorage
  const savedURI = selectedVoiceURI || (typeof window !== 'undefined' ? localStorage.getItem('ta4_voice_uri') : '');
  if (savedURI) {
    const found = voices.find(v => v.voiceURI === savedURI || v.name === savedURI);
    if (found) return found;
  }

  const activePersona = getActiveVoicePersona();

  // 2. Persona: Cô Leda (Vang Sáng & Ngân Vang Chuẩn Trực Quan)
  if (activePersona.id === 'leda_resonant') {
    const ledaPreferred = [
      'Google US English',        // Vang ngân, âm cao trong sáng
      'Samantha',                 // Apple Crystal Clear Female
      'Google UK English Female', // UK high-clarity
      'Jenny',                    // Neural Studio
      'Aria',                     // Neural Studio
      'Victoria',                 // macOS bright
      'Zira',                     // Windows bright female
      'Sonia',
      'Libby'
    ];
    for (const name of ledaPreferred) {
      const found = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes(name.toLowerCase()));
      if (found) return found;
    }
  } else if (activePersona.id === 'sonia_british') {
    const britishPreferred = [
      'Google UK English Female',
      'UK English Female',
      'en-GB',
      'Sonia',
      'Libby',
      'Hazel',
      'Serena',
      'Victoria'
    ];
    for (const name of britishPreferred) {
      const found = voices.find(v => (v.lang.includes('GB') || v.lang.startsWith('en')) && v.name.toLowerCase().includes(name.toLowerCase()));
      if (found) return found;
    }
  }

  // 3. Fallback: Any english non-male voice
  const femaleFallback = getEnglishFemaleVoices();
  if (femaleFallback.length > 0) return femaleFallback[0];

  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

/**
 * Text-to-Speech with British English (Anh - Anh) Priority & Resonant Audio Presence
 */
export function speakWord(text: string, rate: number = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[/_\\*]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    // Standard British English (en-GB) matching Vietnam MOET Macmillan textbook curriculum
    utterance.lang = 'en-GB';
    utterance.rate = rate;
    
    // Use resonant pitch (around 1.12 - 1.16 for bright, pleasant vocal clarity)
    const pitch = getGlobalPitch();
    utterance.pitch = pitch;
    utterance.volume = 1.0; // Full resonant projection

    const voice = resolveActiveVoice();
    if (voice) {
      utterance.voice = voice;
      if (voice.lang) {
        utterance.lang = voice.lang;
      }
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
