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
    id: 'google_us_english_gb',
    name: 'Google US English (Anh - Anh)',
    description: 'Giọng đọc Google US English chất lượng cao, ngữ âm chuẩn mực, phát âm tròn vành rõ chữ, trong sáng và cuốn hút nhất cho học sinh.',
    accent: 'Google US English • en-US',
    tag: 'Chất lượng cao',
    recommendedPitch: 1.15,
    recommendedRate: 0.88
  }
];

let selectedVoiceURI: string = '';
let currentCustomPitch: number = 1.15; // Optimal pitch for Google US English clarity

export function getActiveVoicePersona(): VoicePersona {
  return PRESET_VOICE_PERSONAS[0];
}

export function setActiveVoicePersona(_id: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ta4_voice_persona', 'google_us_english_gb');
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
 * Filter solely Google US English high-quality voice, discarding all other voices as requested
 */
export function getEnglishFemaleVoices(): SpeechSynthesisVoice[] {
  const all = getAllSystemVoices();
  if (all.length === 0) return [];

  // Filter exclusively Google US English
  const googleUS = all.filter(v =>
    v.name.toLowerCase().includes('google us english') ||
    (v.name.toLowerCase().includes('google') && v.lang === 'en-US')
  );

  if (googleUS.length > 0) return googleUS;

  // Fallback to any Google English voice
  const googleAny = all.filter(v =>
    v.name.toLowerCase().includes('google') && v.lang.startsWith('en')
  );
  if (googleAny.length > 0) return googleAny;

  // Fallback if system has no Google voice
  const enUS = all.filter(v => v.lang === 'en-US');
  if (enUS.length > 0) return enUS;

  return all.filter(v => v.lang.startsWith('en'));
}

export function resolveActiveVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Check user explicit choice if it matches Google
  if (selectedVoiceURI) {
    const found = voices.find(v => v.voiceURI === selectedVoiceURI || v.name === selectedVoiceURI);
    if (found) return found;
  }

  // 2. Exclusively prioritize Google US English
  const googleUSEnglish = voices.find(v =>
    v.name.toLowerCase().includes('google us english') ||
    (v.name.toLowerCase().includes('google') && v.lang === 'en-US')
  );
  if (googleUSEnglish) return googleUSEnglish;

  // 3. Any Google English voice
  const googleEnglish = voices.find(v =>
    v.name.toLowerCase().includes('google') && v.lang.startsWith('en')
  );
  if (googleEnglish) return googleEnglish;

  // 4. Default en-US or English
  const usVoice = voices.find(v => v.lang === 'en-US');
  if (usVoice) return usVoice;

  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

/**
 * Text-to-Speech locked to Google US English high quality voice
 */
export function speakWord(text: string, rate: number = 0.88): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[/_\\*]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voice = resolveActiveVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'en-US';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = rate;
    const pitch = getGlobalPitch();
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
