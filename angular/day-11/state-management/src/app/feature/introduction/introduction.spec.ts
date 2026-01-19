import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Introduction } from './introduction';
import * as fromUserSelectors from '../../store/user/user.selector';
import { setUserInfo } from '../../store/user/user.actions';
import { loadQuiz } from '../../store/quiz/quiz.actions';

describe('Introduction Component', () => {
  let component: Introduction;
  let fixture: ComponentFixture<Introduction>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Introduction],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromUserSelectors.selectName, value: '' },
            { selector: fromUserSelectors.selectEmail, value: '' },
            { selector: fromUserSelectors.canStartQuiz, value: false },
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
    fixture = TestBed.createComponent(Introduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.quizModel().name).toBe('');
    expect(component.quizModel().email).toBe('');
  });

  it('should dispatch setUserInfo action', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.setIntroInfo('Test User', 'test@example.com');

    expect(dispatchSpy).toHaveBeenCalledWith(
      setUserInfo({ name: 'Test User', email: 'test@example.com' })
    );
  });

  it('should dispatch loadQuiz on startQuiz', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.quizModel.set({ name: 'Test', email: 'test@test.com' });
    component.startQuiz();

    expect(dispatchSpy).toHaveBeenCalledWith(loadQuiz());
  });

  it('should navigate to quiz on startQuiz', () => {
    component.quizModel.set({ name: 'Test', email: 'test@test.com' });
    component.startQuiz();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/quiz');
  });
});
