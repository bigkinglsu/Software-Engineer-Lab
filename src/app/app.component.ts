import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

const COUNT_KEY = 'software-engineer-lab-completions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  stage = 0;
  powerOn = false;
  gateOpen = false;
  speed = 2;
  robotName = 'Byte';
  robotColor = '#8b7aff';
  message = 'Press RUN and see what happens.';
  messageKind: 'neutral' | 'bug' | 'success' = 'neutral';
  passed = false;
  running = false;
  completed = false;
  soundOn = false;
  completionCount = this.readCount();
  readonly confetti = Array.from({length: 30}, (_, index) => index);
  private timer?: ReturnType<typeof setTimeout>;

  get title(): string {
    return ['Wake up the robot', 'Open the gate', 'Reach the finish line'][this.stage];
  }

  get hint(): string {
    return [
      'The robot cannot move without power. Find the value that controls it.',
      'The path is blocked. Which value controls the gate?',
      'The finish line is far away. Try increasing the speed to at least 7.'
    ][this.stage];
  }

  get progress(): number { return this.completed ? 100 : this.stage * 33; }

  run(): void {
    if (this.running || this.passed || this.completed) return;
    this.playTone(240, .09);
    if (this.stage === 0 && !this.powerOn) {
      this.fail('No movement! The power is OFF. Can you fix that bug?');
      return;
    }
    if (this.stage === 1 && !this.gateOpen) {
      this.fail('Bonk! The gate is CLOSED. Can you open it?');
      return;
    }
    if (this.stage === 2 && this.speed < 7) {
      this.fail('Almost! The robot ran out of time. Increase its speed.');
      return;
    }

    this.running = true;
    this.message = `${this.robotName.trim() || 'Byte'} is running the program…`;
    this.messageKind = 'neutral';
    this.timer = setTimeout(() => {
      this.running = false;
      if (this.stage === 2) {
        this.completed = true;
        this.completionCount += 1;
        try { localStorage.setItem(COUNT_KEY, String(this.completionCount)); } catch { /* private browsing */ }
        this.message = 'You found the bugs and made it to the finish!';
        this.playTone(740, .16);
      } else {
        this.passed = true;
        this.message = this.stage === 0 ? 'Power restored! You fixed the first bug.' : 'Gate open! The path is clear.';
        this.playTone(560, .12);
      }
      this.messageKind = 'success';
    }, 950);
  }

  next(): void {
    if (!this.passed || this.stage >= 2) return;
    this.stage += 1;
    this.passed = false;
    this.messageKind = 'neutral';
    this.message = 'Press RUN and see what happens.';
  }

  reset(): void {
    if (this.timer) clearTimeout(this.timer);
    this.stage = 0;
    this.powerOn = false;
    this.gateOpen = false;
    this.speed = 2;
    this.robotName = 'Byte';
    this.robotColor = '#8b7aff';
    this.passed = false;
    this.running = false;
    this.completed = false;
    this.messageKind = 'neutral';
    this.message = 'Press RUN and see what happens.';
  }

  ngOnDestroy(): void { if (this.timer) clearTimeout(this.timer); }

  private fail(message: string): void {
    this.message = message;
    this.messageKind = 'bug';
    this.playTone(180, .13);
  }

  private readCount(): number {
    try { return Math.max(0, Number(localStorage.getItem(COUNT_KEY)) || 0); }
    catch { return 0; }
  }

  private playTone(frequency: number, duration: number): void {
    if (!this.soundOn) return;
    try {
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(.08, context.currentTime);
      volume.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
      oscillator.connect(volume).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
      oscillator.onended = () => void context.close();
    } catch { /* audio is optional */ }
  }
}
