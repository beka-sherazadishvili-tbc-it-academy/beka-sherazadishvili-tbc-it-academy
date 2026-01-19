import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Results } from './results';
import * as fromQuizSelectors from '../../store/quiz/quiz.selectors';
import * as fromUserSelectors from '../../store/user/user.selector';
import { resetQuiz, loadQuiz } from '../../store/quiz/quiz.actions';

describe('Results Component', () => {
  let component: Results;
  let fixture: ComponentFixture<Results>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromQuizSelectors.selectScore, value: 85 },
            { selector: fromUserSelectors.selectName, value: 'John Doe' },
            { selector: fromUserSelectors.selectEmail, value: 'john@example.com' },
          ],
        }),
        {
          provide: Router,
          useValue: { navigateByUrl: vi.fn() },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have total score from store', () => {
    expect(component.totalScore()).toBe(85);
  });

  it('should have user name from store', () => {
    expect(component.name()).toBe('John Doe');
  });

  it('should dispatch resetQuiz and loadQuiz on restart', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.restart();

    expect(dispatchSpy).toHaveBeenCalledWith(resetQuiz());
    expect(dispatchSpy).toHaveBeenCalledWith(loadQuiz());
  });

  it('should navigate to intro on restart', () => {
    component.restart();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/intro');
  });
});
