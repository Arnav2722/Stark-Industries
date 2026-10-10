// Web Audio API Synthesizer for Stark Industries HUD sound effects
// Pure procedural synthesis - no external audio files required!

class StarkAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.3;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

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

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playChirp();
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  // Tactical click / hover blip
  public playClick(pitch: number = 800) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore audio failure
    }
  }

  // Futuristic Stark HUD Chirp / Target Lock
  public playChirp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      const now = ctx.currentTime;
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(2400, now + 0.08);

      osc2.frequency.setValueAtTime(1800, now);
      osc2.frequency.exponentialRampToValueAtTime(3600, now + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.08);
      osc2.stop(now + 0.08);
    } catch {
      // Ignore audio failure
    }
  }

  // Repulsor charge sound effect (Rising plasma whine)
  public playRepulsorCharge() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2000, now + 0.6);
      filter.Q.value = 4;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.35, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Ignore audio failure
    }
  }

  // Repulsor Blast sound effect (Concussive discharge)
  public playRepulsorBlast() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Low frequency sub-bass thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      oscGain.gain.setValueAtTime(this.volume * 0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

      // Noise burst for plasma blast
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
    } catch {
      // Ignore audio failure
    }
  }

  // Arc Reactor Pulse / Resonance
  public playArcPulse() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignore audio failure
    }
  }

  // System Protocol Confirmation (3-tone ascending chord)
  public playProtocolConfirm() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const frequencies = [587.33, 739.99, 880.00]; // D5, F#5, A5 (D major triad)
      frequencies.forEach((freq, idx) => {
        const now = ctx.currentTime + idx * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(this.volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Text-to-Speech JARVIS / FRIDAY voice synthesis
  public speak(text: string, voiceType: 'jarvis' | 'friday' | 'edith' = 'jarvis') {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Configure voice parameters to match Stark AI
      if (voiceType === 'jarvis') {
        utterance.rate = 1.05;
        utterance.pitch = 0.9; // Lower, polished British-like tone
      } else if (voiceType === 'friday') {
        utterance.rate = 1.1;
        utterance.pitch = 1.15; // Higher, clear tactical tone
      } else {
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
      }

      utterance.volume = this.volume;

      // Try to find a fitting voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (voiceType === 'jarvis') {
          const ukVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('George') || v.name.includes('Daniel'));
          if (ukVoice) utterance.voice = ukVoice;
        } else if (voiceType === 'friday') {
          const femaleVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Karen')) && v.lang.includes('en'));
          if (femaleVoice) utterance.voice = femaleVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis failure
    }
  }
}

export const starkAudio = new StarkAudioEngine();
