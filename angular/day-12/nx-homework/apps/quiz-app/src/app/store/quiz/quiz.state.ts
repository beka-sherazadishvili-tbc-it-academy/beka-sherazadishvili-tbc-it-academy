export interface IQuizQuestion {
    id: number;
    type: QuizType;
    questionTitle: string;
    options: IOptions[]
}

export interface IOptions {
    id: number;
    answerLabel: string;
    point: number
}

export type QuizType = 'single' | 'multiple';

export interface QuizState {
  questions: IQuizQuestion[];
  currentIndex: number;
  answers: Record<number, number[]>; 
}

export const initialQuizState: QuizState = {
  questions: [],
  currentIndex: 0,
  answers: {},
};