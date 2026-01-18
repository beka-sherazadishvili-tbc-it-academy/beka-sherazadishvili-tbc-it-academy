import { signal } from '@angular/core';
import { DinoComponent } from './dino';
import { DinoGameService } from './dino.service';
import { TestBed } from '@angular/core/testing';

describe('DinoComponent', () => {
  let component: DinoComponent;
  let mockGameService: Partial<DinoGameService>;

  beforeEach(async () => {
    mockGameService = {
      jumpState: signal(false),
      duckState: signal(false),
      gameStartState: signal(false),
      isGameOver: signal(false),
      jump: vi.fn(),
      duck: vi.fn(),
      pauseGame: vi.fn(),
      resumeGame: vi.fn(),
      restartGame: vi.fn(),
      startGame: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [DinoComponent],
      providers: [{ provide: DinoGameService, useValue: mockGameService }],
    }).compileComponents();

    const fixture = TestBed.createComponent(DinoComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate formcotrol with time 0', () => {
    expect(component.enteredTime.value).toBe(0);
  });

  it('should call startgame()', () => {
    component.startGame();
    expect(mockGameService.startGame).toHaveBeenCalledWith(component.enteredTime);
  });

  describe('keyboard controls', () => {
    it('should call jump on arrow up when game is started and not jumping', () => {
      mockGameService.gameStartState!.set(true);
      mockGameService.jumpState!.set(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeyDown(event);

      expect(mockGameService.jump).toHaveBeenCalled();
    });

    it('should call jump on space when game is started', () => {
      mockGameService.gameStartState!.set(true);
      mockGameService.jumpState!.set(false);

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeyDown(event);

      expect(mockGameService.jump).toHaveBeenCalled();
    });

    it('should call pauseGame on "p" when game is running', () => {
      mockGameService.gameStartState!.set(true);

      const event = new KeyboardEvent('keydown', { key: 'p' });
      component.handleKeyDown(event);

      expect(mockGameService.pauseGame).toHaveBeenCalled();
    });

    it('should call resumeGame on "p" when game is paused', () => {
      mockGameService.gameStartState!.set(false);

      const event = new KeyboardEvent('keydown', { key: 'p' });
      component.handleKeyDown(event);

      expect(mockGameService.resumeGame).toHaveBeenCalled();
    });

    it('should call restartGame on "r"', () => {
      const event = new KeyboardEvent('keydown', { key: 'r' });
      component.handleKeyDown(event);

      expect(mockGameService.restartGame).toHaveBeenCalled();
    });

    it('should call restartGame on "R"', () => {
      const event = new KeyboardEvent('keydown', { key: 'R' });
      component.handleKeyDown(event);

      expect(mockGameService.restartGame).toHaveBeenCalled();
    });

    it('should not call duck when already ducking', () => {
      mockGameService.gameStartState!.set(true);
      mockGameService.duckState!.set(true);

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.handleKeyDown(event);

      expect(mockGameService.duck).not.toHaveBeenCalled();
    });

    it('should not call duck when game is not started', () => {
      mockGameService.gameStartState!.set(false);
      mockGameService.duckState!.set(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.handleKeyDown(event);

      expect(mockGameService.duck).not.toHaveBeenCalled();
    });

    it('should not call jump when game is not started', () => {
      mockGameService.gameStartState!.set(false);
      mockGameService.jumpState!.set(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.handleKeyDown(event);

      expect(mockGameService.jump).not.toHaveBeenCalled();
    });

    it('should call pauseGame on uppercase "P"', () => {
      mockGameService.gameStartState!.set(true);

      const event = new KeyboardEvent('keydown', { key: 'P' });
      component.handleKeyDown(event);

      expect(mockGameService.pauseGame).toHaveBeenCalled();
    });

    it('should call restartGame on uppercase "R"', () => {
      const event = new KeyboardEvent('keydown', { key: 'R' });
      component.handleKeyDown(event);

      expect(mockGameService.restartGame).toHaveBeenCalled();
    });

    it('should call preventDefault for ArrowUp', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.handleKeyDown(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not call preventDefault for other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'p' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      component.handleKeyDown(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });
});
