import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DinoGameService } from './dino.service';

describe('DinoGameService Unit Tests', () => {
  let service: DinoGameService;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [DinoGameService],
    });

    service = TestBed.inject(DinoGameService);
  });

  afterEach(() => {
    service.restartGame();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('should have initial score of 0', () => {
      expect(service.score()).toBe(0);
    });

    it('should have initial totalTime of 0', () => {
      expect(service.totalTime()).toBe(0);
    });

    it('should have initial gameSpeed of 10', () => {
      expect(service.gameSpeed()).toBe(10);
    });

    it('should have gameStartState as false', () => {
      expect(service.gameStartState()).toBe(false);
    });

    it('should have jumpState as false', () => {
      expect(service.jumpState()).toBe(false);
    });

    it('should have duckState as false', () => {
      expect(service.duckState()).toBe(false);
    });

    it('should have isGameOver as false', () => {
      expect(service.isGameOver()).toBe(false);
    });

    it('should have empty obstacles array', () => {
      expect(service.obstacles()).toEqual([]);
    });
  });

  describe('trackObstacle', () => {
    it('should return obstacle id', () => {
      const obstacle = { id: 5, type: 'cactus' as const };
      expect(service.trackObstacle(0, obstacle)).toBe(5);
    });
  });

  describe('startGame', () => {
    it('should not start game when enteredTime is 0', () => {
      const enteredTime = new FormControl(0, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameStartState()).toBe(false);
    });

    it('should start game when enteredTime > 0', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameStartState()).toBe(true);
    });

    it('should set totalTime to enteredTime * 60', () => {
      const enteredTime = new FormControl(2, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.totalTime()).toBe(120);
    });

    it('should reset enteredTime to 0 after starting', () => {
      const enteredTime = new FormControl(5, { nonNullable: true });
      service.startGame(enteredTime);

      expect(enteredTime.value).toBe(0);
    });

    it('should set score to 0', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.score()).toBe(0);
    });

    it('should set isGameOver to false', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.isGameOver()).toBe(false);
    });

    it('should clear obstacles array', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.obstacles().length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('gameSpeed calculation', () => {
    it('should set gameSpeed to 2 when enteredTime < 2', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameSpeed()).toBe(2);
    });

    it('should set gameSpeed to enteredTime when 2 <= enteredTime < 10', () => {
      const enteredTime = new FormControl(5, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameSpeed()).toBe(5);
    });

    it('should set gameSpeed to 10 when enteredTime >= 10', () => {
      const enteredTime = new FormControl(15, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameSpeed()).toBe(10);
    });
  });

  describe('pauseGame', () => {
    it('should set gameStartState to false when game is running', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      expect(service.gameStartState()).toBe(true);

      service.pauseGame();
      expect(service.gameStartState()).toBe(false);
    });

    it('should not change state when game is not running', () => {
      service.pauseGame();
      expect(service.gameStartState()).toBe(false);
    });
  });

  describe('resumeGame', () => {
    it('should resume game when paused and not game over', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      service.pauseGame();

      expect(service.gameStartState()).toBe(false);

      service.resumeGame();
      expect(service.gameStartState()).toBe(true);
    });

    it('should not resume when game is over', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      service.isGameOver.set(true);
      service.gameStartState.set(false);

      service.resumeGame();
      expect(service.gameStartState()).toBe(false);
    });

    it('should not resume when totalTime is 0', () => {
      service.totalTime.set(0);
      service.resumeGame();

      expect(service.gameStartState()).toBe(false);
    });
  });

  describe('restartGame', () => {
    it('should reset score to 0', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      service.score.set(100);

      service.restartGame();
      expect(service.score()).toBe(0);
    });

    it('should reset isGameOver to false', () => {
      service.isGameOver.set(true);
      service.restartGame();

      expect(service.isGameOver()).toBe(false);
    });

    it('should reset totalTime to 0', () => {
      service.totalTime.set(60);
      service.restartGame();

      expect(service.totalTime()).toBe(0);
    });

    it('should clear obstacles', () => {
      service.restartGame();
      expect(service.obstacles()).toEqual([]);
    });

    it('should set gameStartState to false', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      service.restartGame();
      expect(service.gameStartState()).toBe(false);
    });
  });

  describe('jump', () => {
    it('should set jumpState to true', () => {
      service.jump();
      expect(service.jumpState()).toBe(true);
    });

    it('should reset jumpState to false after 1 second', () => {
      service.jump();
      expect(service.jumpState()).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(service.jumpState()).toBe(false);
    });
  });

  describe('duck', () => {
    it('should set duckState to true', () => {
      service.duck();
      expect(service.duckState()).toBe(true);
    });

    it('should reset duckState to false after timeout', () => {
      service.duck();
      expect(service.duckState()).toBe(true);

      vi.advanceTimersByTime(1500);
      expect(service.duckState()).toBe(false);
    });
  });

  describe('game timer', () => {
    it('should decrement totalTime every second', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.totalTime()).toBe(60);

      vi.advanceTimersByTime(1000);
      expect(service.totalTime()).toBe(59);

      vi.advanceTimersByTime(1000);
      expect(service.totalTime()).toBe(58);
    });

    it('should increment score every second', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.score()).toBe(0);

      vi.advanceTimersByTime(1000);
      expect(service.score()).toBe(1);

      vi.advanceTimersByTime(1000);
      expect(service.score()).toBe(2);
    });

    it('should decrease gameSpeed over time when above 2', () => {
      const enteredTime = new FormControl(10, { nonNullable: true });
      service.startGame(enteredTime);

      const initialSpeed = service.gameSpeed();
      vi.advanceTimersByTime(1000);

      expect(service.gameSpeed()).toBeLessThan(initialSpeed);
    });
  });

  describe('clearing previous game state', () => {
    it('should clear previous interval when starting new game', () => {
      const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

      const enteredTime1 = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime1);

      const enteredTime2 = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime2);

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });

  describe('resumeGame timer behavior', () => {
    it('should pause game when totalTime reaches 0 during resume', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      service.pauseGame();

      service.totalTime.set(1);

      service.resumeGame();
      expect(service.gameStartState()).toBe(true);

      vi.advanceTimersByTime(1000);

      expect(service.totalTime()).toBe(0);
      expect(service.gameStartState()).toBe(false);
    });
  });
});
