import { TestBed } from '@angular/core/testing';
import { DinoComponent } from './dino';
import { DinoGameService } from './dino.service';

describe('DinoComponent Integration Tests', () => {
  let component: DinoComponent;
  let gameService: DinoGameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinoComponent],
      providers: [DinoGameService],
    }).compileComponents();

    const fixture = TestBed.createComponent(DinoComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(DinoGameService);
  });

  afterEach(() => {
    gameService.restartGame();
  });

  describe('game start', () => {
    it('should start game and update service state when time is entered', () => {
      component.enteredTime.setValue(1);
      component.startGame();

      expect(gameService.gameStartState()).toBe(true);
      expect(gameService.totalTime()).toBe(60);
      expect(gameService.score()).toBe(0);
      expect(gameService.isGameOver()).toBe(false);
    });

    it('should not start game when entered time is 0', () => {
      component.enteredTime.setValue(0);
      component.startGame();

      expect(gameService.gameStartState()).toBe(false);
    });

    it('should reset enteredTime form control after starting game', () => {
      component.enteredTime.setValue(5);
      component.startGame();

      expect(component.enteredTime.value).toBe(0);
    });

    it('should set gameSpeed based on entered time', () => {
      component.enteredTime.setValue(5);
      component.startGame();

      expect(gameService.gameSpeed()).toBe(5);
    });

    it('should cap gameSpeed at minimum 2 for very short games', () => {
      component.enteredTime.setValue(1);
      component.startGame();

      expect(gameService.gameSpeed()).toBe(2);
    });

    it('should cap gameSpeed at 10 for long games', () => {
      component.enteredTime.setValue(15);
      component.startGame();

      expect(gameService.gameSpeed()).toBe(10);
    });
  });

  describe('pause and pesume', () => {
    beforeEach(() => {
      component.enteredTime.setValue(1);
      component.startGame();
    });

    it('should pause game when pressing p during gameplay', () => {
      expect(gameService.gameStartState()).toBe(true);

      const event = new KeyboardEvent('keydown', { key: 'p' });
      component.handleKeyDown(event);

      expect(gameService.gameStartState()).toBe(false);
    });

    it('should resume game when pressing p while paused', () => {
      gameService.pauseGame();
      expect(gameService.gameStartState()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'p' });
      component.handleKeyDown(event);

      expect(gameService.gameStartState()).toBe(true);
    });
  });

  describe('jump', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      component.enteredTime.setValue(1);
      component.startGame();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should set jumpState to true when jumping', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeyDown(event);

      expect(gameService.jumpState()).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(gameService.jumpState()).toBe(false);
    });

    it('should not allow double jump', () => {
      const jumpSpy = vi.spyOn(gameService, 'jump');

      const event1 = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeyDown(event1);
      expect(jumpSpy).toHaveBeenCalledTimes(1);

      const event2 = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeyDown(event2);
      expect(jumpSpy).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(1000);
    });
  });

  describe('duck', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      component.enteredTime.setValue(1);
      component.startGame();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should set duckState to true when ducking', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.handleKeyDown(event);

      expect(gameService.duckState()).toBe(true);

      vi.advanceTimersByTime(2000);
      expect(gameService.duckState()).toBe(false);
    });
  });

  describe('restart', () => {
    it('should reset all game state when restarting', () => {
      component.enteredTime.setValue(1);
      component.startGame();

      const event = new KeyboardEvent('keydown', { key: 'r' });
      component.handleKeyDown(event);

      expect(gameService.gameStartState()).toBe(false);
      expect(gameService.score()).toBe(0);
      expect(gameService.totalTime()).toBe(0);
      expect(gameService.isGameOver()).toBe(false);
      expect(gameService.obstacles()).toEqual([]);
    });
  });

  describe('score update', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should increment score over time', () => {
      component.enteredTime.setValue(1);
      component.startGame();

      expect(gameService.score()).toBe(0);

      vi.advanceTimersByTime(1000);
      expect(gameService.score()).toBe(1);

      vi.advanceTimersByTime(1000);
      expect(gameService.score()).toBe(2);

      gameService.restartGame();
    });
  });

  describe('gull game', () => {
    it('should complete full game', () => {
      component.enteredTime.setValue(1);
      component.startGame();
      expect(gameService.gameStartState()).toBe(true);
      component.handleKeyDown(new KeyboardEvent('keydown', { key: 'p' }));
      expect(gameService.gameStartState()).toBe(false);
      component.handleKeyDown(new KeyboardEvent('keydown', { key: 'p' }));
      expect(gameService.gameStartState()).toBe(true);
      component.handleKeyDown(new KeyboardEvent('keydown', { key: 'r' }));
      expect(gameService.gameStartState()).toBe(false);
      expect(gameService.score()).toBe(0);
    });
  });
});
