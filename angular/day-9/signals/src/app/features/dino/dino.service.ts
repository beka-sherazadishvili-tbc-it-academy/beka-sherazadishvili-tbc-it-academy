import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DinoGameService {
  public score = signal<number>(0);
  public totalTime = signal<number>(0);
  public gameSpeed = signal<number>(10);

  public gameStartState = signal<boolean>(false);
  public jumpState = signal<boolean>(false);
  public duckState = signal<boolean>(false);
  public isGameOver = signal<boolean>(false);

  public obstacles = signal<ActiveObstacle[]>([]);
  public obstacleIdCounterPsssed: number = 0;

  private interval: number | null = null;
  private spawnerTimeoutId: number | null = null;
  private collisionIntervalId?: number;
  private obstacleIdCounter: number = 0;

  constructor() {}

  public trackObstacle(index: number, obstacle: ActiveObstacle): number {
    return obstacle.id;
  }

  public startGame(enteredTime: FormControl<number>): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.collisionIntervalId) {
      clearInterval(this.collisionIntervalId);
    }

    if (this.spawnerTimeoutId) {
      clearTimeout(this.spawnerTimeoutId);
    }

    if (enteredTime.value > 0) {
      this.totalTime.set(enteredTime.value * 60);

      if (enteredTime.value < 10) {
        if (enteredTime.value < 2) {
          this.gameSpeed.set(2);
        } else {
          this.gameSpeed.set(enteredTime.value);
        }
      } else {
        this.gameSpeed.set(10);
      }

      enteredTime.setValue(0);
      this.obstacles.set([]);
    } else {
      return;
    }

    this.gameStartState.set(true);
    this.score.set(0);

    this.startObstacleSpawner();
    this.isGameOver.set(false);
    this.startCollisionDetection();

    this.interval = setInterval(() => {
      this.totalTime.update((curr) => curr - 1);
      this.score.update((s) => s + 1);

      if (this.gameSpeed() > 2) {
        this.gameSpeed.update((v) => v - 0.016);
      }

      if (this.totalTime() <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  public pauseGame(): void {
    if (this.gameStartState()) {
      this.gameStartState.set(false);
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }

  public resumeGame(): void {
    if (!this.gameStartState() && !this.isGameOver() && this.totalTime() > 0) {
      this.gameStartState.set(true);
      this.interval = setInterval(() => {
        this.totalTime.update((curr) => curr - 1);
        if (this.totalTime() <= 0) {
          this.pauseGame();
        }
      }, 1000);

      this.startObstacleSpawner();
    }
  }

  public restartGame(): void {
    this.pauseGame();
    this.isGameOver.set(false);
    this.score.set(0);
    this.obstacles.set([]);
    this.obstacleIdCounter = 0;
    this.totalTime.set(0);
  }

  public jump(): void {
    this.jumpState.set(true);
    setTimeout(() => {
      this.jumpState.set(false);
    }, 1000);
  }

  public duck(): void {
    this.duckState.set(true);
    setTimeout(() => {
      this.duckState.set(false);
    }, (this.gameSpeed() * 1000) / 7.5);
  }

  private startObstacleSpawner(): void {
    const spawn = () => {
      if (!this.gameStartState()) {
        return;
      }

      const type: 'cactus' | 'bird' = Math.random() > 0.5 ? 'cactus' : 'bird';
      const newObs = { id: this.obstacleIdCounter++, type };

      this.obstacles.update((obs) => [...obs, newObs]);

      setTimeout(() => {
        this.obstacles.update((obs) => obs.filter((o) => o.id !== newObs.id));
      }, this.gameSpeed() * 1000);

      this.spawnerTimeoutId = setTimeout(
        spawn,
        (Math.random() * 1500 + 1000) * (this.gameSpeed() / 3)
      );
    };

    spawn();
  }

  private startCollisionDetection(): void {
    this.collisionIntervalId = window.setInterval(() => {
      if (!this.gameStartState()) {
        return;
      }

      const dinoElement = document.querySelector('.dino');
      const obstacleElements = document.querySelectorAll('.cactus, .bird');
      if (!dinoElement) {
        return;
      }

      const dinoRect = dinoElement.getBoundingClientRect();

      obstacleElements.forEach((obsElement, index) => {
        const obsRect = obsElement.getBoundingClientRect();

        const horizontalOverlap =
          dinoRect.right - 15 > obsRect.left && dinoRect.left + 15 < obsRect.right;

        const verticalOverlap =
          dinoRect.bottom - 5 > obsRect.top && dinoRect.top + 5 < obsRect.bottom;

        if (horizontalOverlap && verticalOverlap) {
          this.gameOver();
          return;
        }

        if (obsRect.right < dinoRect.left) {
          const obstacleData = this.obstacles()[index];
          if (obstacleData && !obstacleData.passed) {
            this.obstacleIdCounterPsssed++;
            this.score.update((s) => s + 10);

            this.obstacles.update((obstacle) =>
              obstacle.map((obs) => (obs.id === obstacleData.id ? { ...obs, passed: true } : obs))
            );
          }
        }
      });
    }, 20);
  }

  private gameOver(): void {
    this.isGameOver.set(true);
    this.gameStartState.set(false);
    this.pauseGame();

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    if (this.spawnerTimeoutId) {
      clearTimeout(this.spawnerTimeoutId);
      this.spawnerTimeoutId = null;
    }

    if (this.collisionIntervalId) {
      clearInterval(this.collisionIntervalId);
      this.collisionIntervalId = 0 as any;
    }

    this.totalTime.set(0);
  }
}
