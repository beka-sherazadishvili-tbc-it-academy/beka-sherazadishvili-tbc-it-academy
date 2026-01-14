import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.state';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');
export const selectQuestions = createSelector(selectQuizState, (state) => state.questions);
export const selectCurrentIndex = createSelector(selectQuizState, (state) => state.currentIndex);
export const selectAnswers = createSelector(selectQuizState, (state) => state.answers);
export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentIndex,
  (questions, index) => questions[index] ?? null
);
export const selectCurrentQuestionAnswers = createSelector(
  selectCurrentQuestion,
  selectAnswers,
  (question, answers) => (question ? answers[question.id] ?? [] : [])
);
export const isFirstQuestion = createSelector(selectCurrentIndex, (index) => index === 0);
export const isLastQuestion = createSelector(
  selectCurrentIndex,
  selectQuestions,
  (index, questions) => index === questions.length - 1
);
export const selectProgress = createSelector(
  selectCurrentIndex,
  selectQuestions,
  (index, answers) => (answers.length === 0 ? 0 : Math.round(((index + 1) / answers.length) * 100))
);
export const selectScore = createSelector(selectQuestions, selectAnswers, (questions, answers) =>
  questions.reduce((total, question) => {
    const selected: number[] = answers[question.id] ?? [];
    const points = question.options
      .filter((option) => selected.includes(option.id))
      .reduce((sum, option) => sum + option.point, 0);

    return total + points;
  }, 0)
);

export const showResults = createSelector(isLastQuestion, (isLast) => isLast);
