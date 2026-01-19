import { Component, input, output } from '@angular/core';
import { IQuizQuestion } from '../../../store/quiz/quiz.state';

@Component({
  selector: 'app-multiple-choice-question',
  imports: [],
  templateUrl: './multiple-choice-question.html',
  styleUrl: './multiple-choice-question.scss',
})
export class MultipleChoiceQuestion {
  public question = input<IQuizQuestion | null | undefined>(undefined);
  public selected = input<number[] | null>([]);
  public answer = output<number[]>();

  public toggle(optionId: number) {
    const set = new Set<number>(this.selected() ?? []);
    set.has(optionId) ? set.delete(optionId) : set.add(optionId);
    this.answer.emit([...set]);
  }
}
