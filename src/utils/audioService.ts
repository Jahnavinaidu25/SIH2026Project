/**
 * Audio service for Earth & Craft Humane System
 * Provides ambient acoustic tones, Web Audio sound synthesis,
 * and audio story narration.
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private currentOsc: OscillatorNode | null = null;
  private currentGain: GainNode | null = null;
  private isStoryPlaying = false;
  private currentStoryId: string | null = null;
  private onStoryProgressCb: ((progress: number, activeText: string) => void) | null = null;
  private storyTimer: any = null;

  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('craftbridge_sound_enabled');
      this.soundEnabled = stored !== 'false';
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('craftbridge_sound_enabled', enabled ? 'true' : 'false');
    }
  }

  public toggleSound(): boolean {
    this.setSoundEnabled(!this.soundEnabled);
    if (this.soundEnabled) {
      this.playTactileTap();
    }
    return this.soundEnabled;
  }

  /**
   * Global soft click sound for interactive buttons
   */
  public playClickSound() {
    if (!this.soundEnabled) return;
    this.playTactileTap();
  }

  private initContext() {
    if (!this.soundEnabled) return;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play a gentle clay/ceramic bowl resonant strike tone
   */
  public playCeramicChime(frequency = 260) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      // Pitch bend down slightly like a Tibetan singing bowl or clay vessel
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 1.85);
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  /**
   * Play tactile click / shuttle sound
   */
  public playTactileTap() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }

  /**
   * Play artisan voice story using speech synthesis with ambient background hum
   */
  public playAudioStory(
    storyId: string,
    transcript: string,
    artisanName: string,
    durationSeconds = 60,
    onProgress?: (progress: number, activeTranscript: string) => void,
    onComplete?: () => void
  ) {
    this.stopAudioStory();
    this.playCeramicChime(220);
    this.isStoryPlaying = true;
    this.currentStoryId = storyId;
    this.onStoryProgressCb = onProgress || null;

    let elapsed = 0;
    const intervalMs = 200;
    const totalMs = Math.min(durationSeconds * 1000, 25000); // 25s preview

    // Speech synthesis if supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = transcript.replace(/^"|"$/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.88; // deliberative, slow, respectful cadence
      utterance.pitch = 0.95;

      // Try selecting a warm voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Aria') || v.name.includes('Google')));
        if (naturalVoice) utterance.voice = naturalVoice;
      }

      utterance.onend = () => {
        this.stopAudioStory();
        if (onComplete) onComplete();
      };
      utterance.onerror = () => {
        // Continue visual playback
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback to purely visual timer
      }
    }

    this.storyTimer = setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.min(100, Math.round((elapsed / totalMs) * 100));
      if (this.onStoryProgressCb) {
        this.onStoryProgressCb(progress, transcript);
      }
      if (progress >= 100) {
        this.stopAudioStory();
        if (onComplete) onComplete();
      }
    }, intervalMs);
  }

  public stopAudioStory() {
    this.isStoryPlaying = false;
    this.currentStoryId = null;
    if (this.storyTimer) {
      clearInterval(this.storyTimer);
      this.storyTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  public getIsPlaying(storyId?: string) {
    if (storyId) return this.isStoryPlaying && this.currentStoryId === storyId;
    return this.isStoryPlaying;
  }
}

export const audioService = new AudioService();
