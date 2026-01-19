import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { quizReducer } from './quiz.reducer';
import * as fromSelectors from './quiz.selectors';
import * as fromActions from './quiz.actions';
import { IQuizQuestion } from './quiz.state';

describe('Quiz Store Integration', () => {
  let store: Store;

  const mockQuestions: IQuizQuestion[] = [
    {
      id: 1,
      type: 'single',
      questionTitle: 'What is Angular?',
      options: [
        { id: 1, answerLabel: 'A framework', point: 10 },
        { id: 2, answerLabel: 'A library', point: 0 },
      ],
    },
    {
      id: 2,
      type: 'multiple',
      questionTitle: 'Select all JS frameworks',
      options: [
        { id: 3, answerLabel: 'React', point: 5 },
        { id: 4, answerLabel: 'Vue', point: 5 },
        { id: 5, answerLabel: 'Python', point: -5 },
      ],
    },
    {
      id: 3,
      type: 'single',
      questionTitle: 'What is TypeScript?',
      options: [
        { id: 6, answerLabel: 'Typed JS', point: 10 },
        { id: 7, answerLabel: 'A database', point: 0 },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ quiz: quizReducer })],
    });

    store = TestBed.inject(Store);
  });

  it('should start with initial state', async () => {
    const questions = await firstValueFrom(store.select(fromSelectors.selectQuestions));
    expect(questions).toEqual([]);
  });

  it('should load questions on startQuizSuccess', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));

    const questions = await firstValueFrom(store.select(fromSelectors.selectQuestions));
    expect(questions.length).toBe(3);
    expect(questions[0].questionTitle).toBe('What is Angular?');
  });

  it('should navigate to next question', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));
    store.dispatch(fromActions.nextQuestion());

    const index = await firstValueFrom(store.select(fromSelectors.selectCurrentIndex));
    expect(index).toBe(1);
  });

  it('should select current question correctly', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));
    store.dispatch(fromActions.nextQuestion());

    const question = await firstValueFrom(store.select(fromSelectors.selectCurrentQuestion));
    expect(question?.id).toBe(2);
    expect(question?.type).toBe('multiple');
  });

  it('should store answers for questions', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));
    store.dispatch(fromActions.answerQuestion({ questionId: 1, optionIds: [1] }));
    store.dispatch(fromActions.answerQuestion({ questionId: 2, optionIds: [3, 4] }));

    const answers = await firstValueFrom(store.select(fromSelectors.selectAnswers));
    expect(answers[1]).toEqual([1]);
    expect(answers[2]).toEqual([3, 4]);
  });

  it('should calculate score based on answers', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));
    store.dispatch(fromActions.answerQuestion({ questionId: 1, optionIds: [1] }));
    store.dispatch(fromActions.answerQuestion({ questionId: 2, optionIds: [3, 4] }));

    const score = await firstValueFrom(store.select(fromSelectors.selectScore));
    expect(score).toBe(20);
  });

  it('should identify first question', async () => {
    store.dispatch(fromActions.startQuizSuccess({ questions: mockQuestions }));

    const isFirst = await firstValueFrom(store.select(fromSelectors.isFirstQuestion));
    expect(isFirst).toBe(true);
  });
});
