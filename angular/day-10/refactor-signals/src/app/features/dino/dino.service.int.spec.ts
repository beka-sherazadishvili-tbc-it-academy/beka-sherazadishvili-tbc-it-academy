import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DinoGameService } from './dino.service';

describe('DinoGameService Integration Tests', () => {
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

  describe('full game lifecycle', () => {
    it('should complete game', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
      expect(service.gameStartState()).toBe(true);
      expect(service.totalTime()).toBe(60);

      vi.advanceTimersByTime(3000);
      expect(service.score()).toBe(3);
      expect(service.totalTime()).toBe(57);

      service.pauseGame();
      expect(service.gameStartState()).toBe(false);
      const pausedScore = service.score();
      const pausedTime = service.totalTime();

      vi.advanceTimersByTime(2000);
      expect(service.score()).toBe(pausedScore);
      expect(service.totalTime()).toBe(pausedTime);

      service.resumeGame();
      expect(service.gameStartState()).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(service.totalTime()).toBe(pausedTime - 1);

      service.restartGame();
      expect(service.gameStartState()).toBe(false);
      expect(service.score()).toBe(0);
      expect(service.totalTime()).toBe(0);
    });
  });

  describe('game over by time', () => {
    it('should trigger game over when totalTime reaches 0', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      vi.advanceTimersByTime(60000);

      expect(service.isGameOver()).toBe(true);
      expect(service.gameStartState()).toBe(false);
      expect(service.totalTime()).toBe(0);
    });
  });

  describe('jump and duck during gameplay', () => {
    beforeEach(() => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);
    });

    it('should handle jump during active game', () => {
      service.jump();
      expect(service.jumpState()).toBe(true);

      vi.advanceTimersByTime(500);
      expect(service.jumpState()).toBe(true);

      vi.advanceTimersByTime(500);
      expect(service.jumpState()).toBe(false);
    });

    it('should handle duck during active game', () => {
      service.duck();
      expect(service.duckState()).toBe(true);

      vi.advanceTimersByTime(500);
      expect(service.duckState()).toBe(false);
    });

    it('should allow jump after previous jump completes', () => {
      service.jump();
      expect(service.jumpState()).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(service.jumpState()).toBe(false);

      service.jump();
      expect(service.jumpState()).toBe(true);
    });
  });

  describe('obstacle spawning', () => {
    it('should spawn obstacles during gameplay', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      vi.advanceTimersByTime(100);

      expect(service.obstacles().length).toBeGreaterThan(0);
    });

    it('should stop spawning when game is paused', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      service.pauseGame();
      const obstacleCount = service.obstacles().length;

      vi.advanceTimersByTime(5000);

      expect(service.obstacles().length).toBeLessThanOrEqual(obstacleCount);
    });

    it('should clear obstacles on restart', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      vi.advanceTimersByTime(100);
      expect(service.obstacles().length).toBeGreaterThan(0);

      service.restartGame();
      expect(service.obstacles()).toEqual([]);
    });
  });

  describe('multiple game sessions', () => {
    it('should handle starting a new game while one is running', () => {
      const enteredTime1 = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime1);

      vi.advanceTimersByTime(5000);
      expect(service.score()).toBe(5);

      const enteredTime2 = new FormControl(2, { nonNullable: true });
      service.startGame(enteredTime2);

      expect(service.score()).toBe(0);
      expect(service.totalTime()).toBe(120);
      expect(service.gameStartState()).toBe(true);
    });

    it('should properly clean up intervals when starting new game', () => {
      const enteredTime1 = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime1);

      vi.advanceTimersByTime(3000);
      const enteredTime2 = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime2);

      vi.advanceTimersByTime(1000);

      expect(service.score()).toBe(1);
    });
  });

  describe('gameSpeed changes', () => {
    it('should gradually decrease gameSpeed during gameplay', () => {
      const enteredTime = new FormControl(10, { nonNullable: true });
      service.startGame(enteredTime);

      const initialSpeed = service.gameSpeed();

      vi.advanceTimersByTime(10000);

      expect(service.gameSpeed()).toBeLessThan(initialSpeed);
    });

    it('should not decrease gameSpeed below 2', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      expect(service.gameSpeed()).toBe(2);

      vi.advanceTimersByTime(30000);

      expect(service.gameSpeed()).toBeGreaterThanOrEqual(2);
    });
  });

  describe('pause and resume edge cases', () => {
    it('should not resume if game is over', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      service.isGameOver.set(true);
      service.gameStartState.set(false);

      service.resumeGame();

      expect(service.gameStartState()).toBe(false);
    });

    it('should not resume if totalTime is 0', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      service.pauseGame();
      service.totalTime.set(0);

      service.resumeGame();

      expect(service.gameStartState()).toBe(false);
    });

    it('should handle rapid pause/resume', () => {
      const enteredTime = new FormControl(1, { nonNullable: true });
      service.startGame(enteredTime);

      service.pauseGame();
      service.resumeGame();
      service.pauseGame();
      service.resumeGame();

      expect(service.gameStartState()).toBe(true);
    });
  });
});
