// src/utils/SoundManager.ts
export class SoundManager {
  private clickEl: HTMLAudioElement;
  private volume = 0;    // 0.0–1.0
  private muted = false;

  constructor() {
    // point to wherever your file lives
    this.clickEl = new Audio('/audio/click.mp3');
    this.clickEl.load();
    // initialize volume
    this.clickEl.volume = this.volume;
  }

  // no longer need AudioContext at all…

  // update volume
  public setVolume(v: number) {
    this.volume = v;
    if (!this.muted) {
      this.clickEl.volume = this.volume;
    }
  }

  // update mute
  public setMuted(m: boolean) {
    this.muted = m;
    this.clickEl.volume = m ? 0 : this.volume;
  }

  // play click sound
  public playClick = () => {
    // ensure the latest volume is applied
    this.clickEl.currentTime = 0;
    this.clickEl.play().catch(() => {});
  };
}

export const soundManager = new SoundManager();
