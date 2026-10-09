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
  category: 'us' | 'uk' | 'au' | 'ai';
  locale: string;
  tag: string;
  badgeColor: string;
  avatarBg: string;
  avatar: string;
  recommendedPitch: number;
  recommendedRate: number;
  matchPatterns: string[];
}

export const PRESET_VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'callirrhoe',
    name: 'Callirrhoe (Google AI Voice)',
    description: 'Giọng đọc Google AI cao cấp: trong trẻo, tự nhiên, truyền cảm, ngữ điệu chuẩn Mỹ cực kỳ lôi cuốn cho học sinh lớp 4.',
    accent: 'Anh - Mỹ (US AI)',
    category: 'ai',
    locale: 'en-US',
    tag: 'Khuyên Dùng • Ngữ Điệu Mỹ',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    avatarBg: 'from-rose-500 to-pink-600',
    avatar: 'CR',
    recommendedPitch: 1.12,
    recommendedRate: 0.88,
    matchPatterns: ['callirrhoe', 'google us english', 'google', 'en-us']
  },
  {
    id: 'aoede',
    name: 'Aoede (Google Studio)',
    description: 'Giọng nữ dịu dàng, êm ái, sâu lắng, phát âm chuẩn sư phạm tạo cảm giác ấm áp và gần gũi khi học từ vựng.',
    accent: 'Anh - Mỹ (US Studio)',
    category: 'ai',
    locale: 'en-US',
    tag: 'Dịu Dàng • Sư Phạm',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    avatarBg: 'from-purple-500 to-indigo-600',
    avatar: 'AO',
    recommendedPitch: 1.05,
    recommendedRate: 0.85,
    matchPatterns: ['aoede', 'google us english', 'en-us']
  },
  {
    id: 'jenny',
    name: 'Jenny (Natural English)',
    description: 'Giọng nữ rành mạch, nhấn nhá rõ từng âm đuôi (/t/, /d/, /s/, /z/), chuẩn bài thi quốc tế TOEFL Primary và Cambridge YLE.',
    accent: 'Anh - Mỹ (US Natural)',
    category: 'us',
    locale: 'en-US',
    tag: 'Rõ Âm Đuôi • Luyện Thi',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    avatarBg: 'from-emerald-500 to-teal-600',
    avatar: 'JN',
    recommendedPitch: 1.08,
    recommendedRate: 0.86,
    matchPatterns: ['jenny', 'aria', 'natural', 'zira', 'en-us']
  },
  {
    id: 'samantha',
    name: 'Samantha (Native American)',
    description: 'Giọng nữ bản xứ New York thanh lịch, chuẩn mực, ngữ điệu giao tiếp đời thường tự nhiên và trôi chảy.',
    accent: 'Anh - Mỹ (US Native)',
    category: 'us',
    locale: 'en-US',
    tag: 'Bản Xứ • Tự Nhiên',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    avatarBg: 'from-amber-500 to-orange-600',
    avatar: 'SM',
    recommendedPitch: 1.06,
    recommendedRate: 0.88,
    matchPatterns: ['samantha', 'allison', 'susan', 'en-us']
  },
  {
    id: 'victoria',
    name: 'Victoria (British English RP)',
    description: 'Giọng nữ Anh - Anh (UK) quý phái, chuẩn âm Oxford & Cambridge, phát âm nguyên âm rõ và tinh tế, cực tốt cho bài nghe SGK Bộ GD&ĐT.',
    accent: 'Anh - Anh (UK BBC)',
    category: 'uk',
    locale: 'en-GB',
    tag: 'Chuẩn BBC • Oxford RP',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    avatarBg: 'from-blue-600 to-indigo-700',
    avatar: 'VC',
    recommendedPitch: 1.10,
    recommendedRate: 0.86,
    matchPatterns: ['victoria', 'sonia', 'libby', 'hazel', 'google uk english female', 'en-gb']
  },
  {
    id: 'karen',
    name: 'Karen (Australian English)',
    description: 'Giọng nữ Anh - Úc tươi sáng, năng động, phát âm dứt khoát giúp rèn luyện khả năng phản xạ nghe ngữ điệu quốc tế.',
    accent: 'Anh - Úc (AU Accent)',
    category: 'au',
    locale: 'en-AU',
    tag: 'Tươi Sáng • Ngữ Điệu Úc',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    avatarBg: 'from-cyan-500 to-blue-600',
    avatar: 'KR',
    recommendedPitch: 1.08,
    recommendedRate: 0.88,
    matchPatterns: ['karen', 'catherine', 'natasha', 'en-au']
  },
  {
    id: 'google_us',
    name: 'Google US English (Neural)',
    description: 'Giọng đọc công nghệ cao của Google, rành mạch, tốc độ ổn định, âm sắc tròn trịa chuẩn mực cho các bài kiểm tra nghe.',
    accent: 'Anh - Mỹ (Google Neural)',
    category: 'us',
    locale: 'en-US',
    tag: 'Mượt Mà • Ổn Định',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
    avatarBg: 'from-pink-500 to-rose-600',
    avatar: 'GG',
    recommendedPitch: 1.14,
    recommendedRate: 0.88,
    matchPatterns: ['google us english', 'google english', 'google', 'en-us']
  }
];

let selectedVoiceURI: string = '';
let currentCustomPitch: number = 1.12;

export function getActiveVoicePersona(): VoicePersona {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ta4_voice_persona');
    if (saved) {
      const found = PRESET_VOICE_PERSONAS.find(p => p.id === saved);
      if (found) return found;
    }
  }
  return PRESET_VOICE_PERSONAS[0];
}

export function setActiveVoicePersona(id: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ta4_voice_persona', id);
    const persona = PRESET_VOICE_PERSONAS.find(p => p.id === id);
    if (persona) {
      setGlobalPitch(persona.recommendedPitch);
    }
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('voice-persona-changed', { detail: { personaId: id } }));
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

/**
 * Filter female English voices available in the browser
 */
export function getEnglishFemaleVoices(): SpeechSynthesisVoice[] {
  const all = getAllSystemVoices();
  if (all.length === 0) return [];

  // Exclude male voice keywords
  const maleKeywords = ['male', 'david', 'mark', 'george', 'james', 'richard', 'guy', 'paul', 'daniel', 'stefan', 'reed'];

  const englishVoices = all.filter(v => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();
    if (!lang.startsWith('en')) return false;
    // Check if not explicitly male
    return !maleKeywords.some(mk => name.includes(mk));
  });

  return englishVoices.length > 0 ? englishVoices : all.filter(v => v.lang.startsWith('en'));
}

/**
 * Resolve the optimal SpeechSynthesisVoice for a given persona or the active persona
 */
export function resolveActiveVoice(customPersonaId?: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const personaId = customPersonaId || getActiveVoicePersona().id;
  const persona = PRESET_VOICE_PERSONAS.find(p => p.id === personaId) || PRESET_VOICE_PERSONAS[0];

  // 1. If explicit voiceURI was selected and matches
  if (!customPersonaId && selectedVoiceURI) {
    const directVoice = voices.find(v => v.voiceURI === selectedVoiceURI || v.name === selectedVoiceURI);
    if (directVoice) return directVoice;
  }

  // 2. Try matching by persona's specific match patterns
  for (const pattern of persona.matchPatterns) {
    const match = voices.find(v => v.name.toLowerCase().includes(pattern.toLowerCase()));
    if (match) return match;
  }

  // 3. Try matching by locale (e.g. en-GB for UK, en-AU for AU, en-US for US)
  const localeMatches = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(persona.locale.toLowerCase()));
  if (localeMatches.length > 0) {
    // Pick first female/non-male match
    const femaleMatch = localeMatches.find(v => {
      const name = v.name.toLowerCase();
      return !['david', 'mark', 'george', 'james', 'male'].some(m => name.includes(m));
    });
    return femaleMatch || localeMatches[0];
  }

  // 4. Fallback to Google US English if available
  const googleUSEnglish = voices.find(v =>
    v.name.toLowerCase().includes('google us english') ||
    (v.name.toLowerCase().includes('google') && v.lang.startsWith('en'))
  );
  if (googleUSEnglish) return googleUSEnglish;

  // 5. Default en-US or English
  const usVoice = voices.find(v => v.lang === 'en-US');
  if (usVoice) return usVoice;

  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

/**
 * Text-to-Speech speaking function with support for active persona or audition persona
 */
export function speakWord(text: string, rate: number = 0.88, overridePersonaId?: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[/_\\*]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const targetPersonaId = overridePersonaId || getActiveVoicePersona().id;
    const persona = PRESET_VOICE_PERSONAS.find(p => p.id === targetPersonaId) || PRESET_VOICE_PERSONAS[0];

    const voice = resolveActiveVoice(targetPersonaId);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || persona.locale;
    } else {
      utterance.lang = persona.locale;
    }

    utterance.rate = rate;
    const pitch = overridePersonaId ? persona.recommendedPitch : getGlobalPitch();
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
