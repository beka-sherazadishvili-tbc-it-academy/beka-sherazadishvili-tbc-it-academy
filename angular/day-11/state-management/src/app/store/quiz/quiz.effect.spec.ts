import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { QuizEffects } from './quiz.effect';
import { loadQuiz, startQuizSuccess } from './quiz.actions';
import { IQuizQuestion } from './quiz.state';

describe('QuizEffects', () => {
  let effects: QuizEffects;
  let actions$: Observable<any>;
  let httpMock: HttpTestingController;

  const mockQuestions: IQuizQuestion[] = [
    {
      id: 1,
      type: 'single',
      questionTitle: 'Q1',
      options: [{ id: 1, answerLabel: 'A', point: 10 }],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(QuizEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load quiz successfully', () => {
    actions$ = of(loadQuiz());

    effects.startQuiz$.subscribe((action) => {
      expect(action).toEqual(startQuizSuccess({ questions: mockQuestions }));
    });

    const req = httpMock.expectOne('assets/quiz.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
  });

});
