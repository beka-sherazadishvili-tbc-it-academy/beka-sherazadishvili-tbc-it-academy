import { Component, input, output } from '@angular/core';
import { IQuizQuestion } from '../../../store/quiz/quiz.state';

@Component({
  selector: 'app-single-choice-question',
  imports: [],
  templateUrl: './single-choice-question.html',
  styleUrl: './single-choice-question.scss',
})
export class SingleChoiceQuestion {
  public question = input<IQuizQuestion | null | undefined>(undefined);
  public selected = input<number[] | null>([]);
  public answer = output<number[]>();

  public select(optionId: number) {
    this.answer.emit([optionId]);
  }
}
