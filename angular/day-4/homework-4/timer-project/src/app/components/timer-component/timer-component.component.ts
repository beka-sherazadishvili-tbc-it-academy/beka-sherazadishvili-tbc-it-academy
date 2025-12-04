import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  EMPTY,
  combineLatest,
  interval,
  map,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.component.html',
  styleUrls: ['./timer-component.component.scss'],
})
export class TimerComponentComponent implements OnInit, OnDestroy {
  public timer: string = '00:00:00.000';
  public laps: string[] = [];
  public form: FormGroup;

  private time$ = new BehaviorSubject<number>(0);
  private isRuning$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      speed: [1],
      customSkip: [0],
    });

    this.initTimer();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initTimer() {
    combineLatest([
      this.isRuning$,
      this.form
        .get('speed')!
        .valueChanges.pipe(startWith(this.form.value.speed)),
    ])
      .pipe(
        switchMap(([running, speed]) => {
          if (!running) return EMPTY;
          return interval(100).pipe(map(() => Math.round(100 * speed)));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((addMs: number) => {
        const newTime = this.time$.value + addMs;
        this.time$.next(newTime);
        this.timer = this.formatTime(newTime);
      });
  }

  public start(): void {
    this.isRuning$.next(true);
  }

  public pause(): void {
    this.isRuning$.next(false);
  }

  public reset(): void {
    this.isRuning$.next(false);
    this.time$.next(0);
    this.timer = this.formatTime(0);
    this.laps = [];
  }

  public lap(): void {
    this.laps = [this.formatTime(this.time$.value), ...this.laps];
  }

  public skip(amount?: number) {
    if (amount === undefined) {
      amount = Number(this.form.value.customSkip);
    }
    amount = Math.max(-60, Math.min(60, amount));

    const msToAdd = amount * 1000;
    const newTime = Math.max(0, this.time$.value + msToAdd);

    this.time$.next(newTime);
    this.timer = this.formatTime(newTime);
  }

  public setSpeed(s: number) {
    this.form.get('speed')!.setValue(s);
  }

  private formatTime(ms: number): string {
    let hour = Math.floor(ms / 3600000);
    ms %= 3600000;

    let minute = Math.floor(ms / 60000);
    ms %= 60000;

    let second = Math.floor(ms / 1000);
    let msLeft = ms % 1000;

    const pad = (n: number, z: number = 2) => n.toString().padStart(z, '0');

    return `${pad(hour)}:${pad(minute)}:${pad(second)}.${pad(msLeft, 3)}`;
  }
}
