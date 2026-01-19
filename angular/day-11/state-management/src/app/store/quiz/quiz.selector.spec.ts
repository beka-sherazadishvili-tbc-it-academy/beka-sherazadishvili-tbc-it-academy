import * as fromSelectors from './quiz.selectors';
import { QuizState, IQuizQuestion } from './quiz.state';

describe('Quiz Selectors', () => {
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

  const state: { quiz: QuizState } = {
    quiz: {
      questions: mockQuestions,
      currentIndex: 0,
      answers: { 1: [1] },
    },
  };

  it('should select questions', () => {
    const result = fromSelectors.selectQuestions.projector(state.quiz);
    expect(result).toEqual(mockQuestions);
  });

  it('should select current index', () => {
    const result = fromSelectors.selectCurrentIndex.projector(state.quiz);
    expect(result).toBe(0);
  });

  it('should select current question', () => {
    const result = fromSelectors.selectCurrentQuestion.projector(mockQuestions, 0);
    expect(result).toEqual(mockQuestions[0]);
  });

  it('should return null when no questions', () => {
    const result = fromSelectors.selectCurrentQuestion.projector([], 0);
    expect(result).toBeNull();
  });

  it('should check if first question', () => {
    expect(fromSelectors.isFirstQuestion.projector(0)).toBe(true);
    expect(fromSelectors.isFirstQuestion.projector(1)).toBe(false);
  });

  it('should check if last question', () => {
    expect(fromSelectors.isLastQuestion.projector(1, mockQuestions)).toBe(true);
    expect(fromSelectors.isLastQuestion.projector(0, mockQuestions)).toBe(false);
  });

  it('should calculate score correctly', () => {
    const answers = { 1: [1], 2: [2] };
    const result = fromSelectors.selectScore.projector(mockQuestions, answers);
    expect(result).toBe(15);
  });

  it('should select current question answers when question exists', () => {
    const question = mockQuestions[0];
    const answers = { 1: [1, 2] };
    const result = fromSelectors.selectCurrentQuestionAnswers.projector(question, answers);
    expect(result).toEqual([1, 2]);
  });

  it('should return empty array when question is null', () => {
    const answers = { 1: [1] };
    const result = fromSelectors.selectCurrentQuestionAnswers.projector(
      null as unknown as IQuizQuestion,
      answers
    );
    expect(result).toEqual([]);
  });

  it('should return empty array when question has no answers', () => {
    const question = mockQuestions[0];
    const answers = {};
    const result = fromSelectors.selectCurrentQuestionAnswers.projector(question, answers);
    expect(result).toEqual([]);
  });

  it('should return 0 progress when no questions', () => {
    const result = fromSelectors.selectProgress.projector(0, []);
    expect(result).toBe(0);
  });

  it('should calculate progress correctly', () => {
    const result = fromSelectors.selectProgress.projector(1, mockQuestions);
    expect(result).toBe(100); 
  });

});
