import { quizReducer } from './quiz.reducer';
import { initialQuizState, IQuizQuestion } from './quiz.state';
import {
  startQuizSuccess,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  resetQuiz,
} from './quiz.actions';

describe('QuizReducer', () => {
  const mockQuestions: IQuizQuestion[] = [
    {
      id: 1,
      type: 'single',
      questionTitle: 'Q1',
      options: [{ id: 1, answerLabel: 'A', point: 10 }],
    },
    {
      id: 2,
      type: 'multiple',
      questionTitle: 'Q2',
      options: [{ id: 2, answerLabel: 'B', point: 5 }],
    },
  ];

  it('should return initial state', () => {
    const result = quizReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialQuizState);
  });

  it('should handle start quiz success', () => {
    const result = quizReducer(initialQuizState, startQuizSuccess({ questions: mockQuestions }));

    expect(result.questions).toEqual(mockQuestions);
    expect(result.currentIndex).toBe(0);
    expect(result.answers).toEqual({});
  });

  it('should handle answer questions', () => {
    const result = quizReducer(
      { ...initialQuizState, questions: mockQuestions },
      answerQuestion({ questionId: 1, optionIds: [1, 2] }),
    );

    expect(result.answers[1]).toEqual([1, 2]);
  });

  it('should handle next question', () => {
    const result = quizReducer(
      { ...initialQuizState, questions: mockQuestions, currentIndex: 0 },
      nextQuestion(),
    );

    expect(result.currentIndex).toBe(1);
  });

  it('should not exceed max index on next question', () => {
    const result = quizReducer(
      { ...initialQuizState, questions: mockQuestions, currentIndex: 1 },
      nextQuestion(),
    );

    expect(result.currentIndex).toBe(1);
  });

  it('should handle previous question', () => {
    const result = quizReducer(
      { ...initialQuizState, questions: mockQuestions, currentIndex: 1 },
      previousQuestion(),
    );

    expect(result.currentIndex).toBe(0);
  });
});
