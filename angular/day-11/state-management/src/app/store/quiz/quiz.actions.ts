import { createAction, props } from '@ngrx/store';
import { IQuizQuestion } from './quiz.state';

export const loadQuiz = createAction('Load Quiz');
export const startQuizSuccess = createAction(
  'start quiz successfully',
  props<{ questions: IQuizQuestion[] }>()
);
export const answerQuestion = createAction(
  'answer quiz question',
  props<{ questionId: number; optionIds: number[] }>()
);
export const nextQuestion = createAction('next question');
export const previousQuestion = createAction('previous question');
export const resetQuiz = createAction('reset quiz');
