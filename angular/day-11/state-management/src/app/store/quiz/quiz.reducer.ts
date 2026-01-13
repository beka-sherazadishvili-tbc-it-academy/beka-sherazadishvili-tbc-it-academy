import { createReducer, on } from '@ngrx/store';
import { initialQuizState } from './quiz.state';
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  resetQuiz,
  startQuizSuccess,
} from './quiz.actions';

export const quizReducer = createReducer(
  initialQuizState,

  on(startQuizSuccess, (state, { questions }) => ({
    ...state,
    questions,
    currentIndex: 0,
    answers: {},
  })),

  on(answerQuestion, (state, { questionId, optionIds }) => ({
    ...state,
    answers: { ...state.answers, [questionId]: optionIds },
  })),

  on(nextQuestion, (state) => ({
    ...state,
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
  })),

  on(previousQuestion, (state) => ({
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0),
  })),

  on(resetQuiz, () => initialQuizState)
);
