import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Quiz } from './quiz';
import * as fromSelectors from '../../store/quiz/quiz.selectors';
import { answerQuestion, nextQuestion, previousQuestion } from '../../store/quiz/quiz.actions';
import { IQuizQuestion } from '../../store/quiz/quiz.state';

describe('Quiz Component', () => {
  let component: Quiz;
  let fixture: ComponentFixture<Quiz>;
  let store: MockStore;
  let router: Router;

  const mockQuestion: IQuizQuestion = {
    id: 1,
    type: 'single',
    questionTitle: 'What is Angular?',
    options: [
      { id: 1, answerLabel: 'A framework', point: 10 },
      { id: 2, answerLabel: 'A library', point: 0 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quiz],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromSelectors.selectCurrentQuestion, value: mockQuestion },
            { selector: fromSelectors.selectCurrentQuestionAnswers, value: [] },
            { selector: fromSelectors.isFirstQuestion, value: true },
            { selector: fromSelectors.isLastQuestion, value: false },
            { selector: fromSelectors.selectProgress, value: 50 },
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
    fixture = TestBed.createComponent(Quiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch answerQuestion when answering', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.answer(mockQuestion, [1]);

    expect(dispatchSpy).toHaveBeenCalledWith(
      answerQuestion({ questionId: 1, optionIds: [1] })
    );
  });

  it('should not dispatch when question is null', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.answer(null, [1]);

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch nextQuestion on next()', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.next();

    expect(dispatchSpy).toHaveBeenCalledWith(nextQuestion());
  });

  it('should dispatch previousQuestion on previous()', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.previous();

    expect(dispatchSpy).toHaveBeenCalledWith(previousQuestion());
  });

  it('should navigate to intro when back() on first question', () => {
    component.back();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/intro');
  });
});
