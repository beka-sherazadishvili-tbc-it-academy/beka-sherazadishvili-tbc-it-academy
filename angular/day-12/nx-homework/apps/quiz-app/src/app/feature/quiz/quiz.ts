import { Component, inject } from '@angular/core';
import { SingleChoiceQuestion } from './single-choice-question/single-choice-question';
import { MultipleChoiceQuestion } from './multiple-choice-question/multiple-choice-question';
import { Store } from '@ngrx/store';
import {
  isFirstQuestion,
  isLastQuestion,
  selectCurrentQuestion,
  selectCurrentQuestionAnswers,
  selectProgress,
} from '../../store/quiz/quiz.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { answerQuestion, nextQuestion, previousQuestion } from '../../store/quiz/quiz.actions';
import { IQuizQuestion } from '../../store/quiz/quiz.state';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [SingleChoiceQuestion, MultipleChoiceQuestion, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public currentQuestion = toSignal(this.store.select(selectCurrentQuestion));
  public currentAnswers = toSignal(this.store.select(selectCurrentQuestionAnswers));
  public isFirst = toSignal(this.store.select(isFirstQuestion));
  public isLast = toSignal(this.store.select(isLastQuestion));
  public progress = toSignal(this.store.select(selectProgress));

  public answer(question: IQuizQuestion | null | undefined, optionIds: number[]) {
    if (!question) {
      return;
    }

    this.store.dispatch(
      answerQuestion({
        questionId: question.id,
        optionIds,
      })
    );
  }

  public next() {
    this.store.dispatch(nextQuestion());
  }

  public previous() {
    this.store.dispatch(previousQuestion());
  }

  public back() {
    if (this.isFirst()) {
      this.router.navigate(['../intro'], { relativeTo: this.route });
      return;
    }

    this.previous();
  }

  public seeDetails() {
    this.router.navigate(['../intro'], { relativeTo: this.route });
  }
}
