import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectScore } from '../../store/quiz/quiz.selectors';
import { QuizState } from '../../store/quiz/quiz.state';
import { IUser } from '../../store/user/user.state';
import { selectEmail, selectName } from '../../store/user/user.selector';
import { Router } from '@angular/router';
import { resetQuiz, loadQuiz } from '../../store/quiz/quiz.actions';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  private quizStore = inject(Store<QuizState>);
  private userStore = inject(Store<IUser>);
  private router = inject(Router);
  public totalScore = toSignal(this.quizStore.select(selectScore));
  public name = toSignal(this.userStore.select(selectName));
  public email = toSignal(this.userStore.select(selectEmail));

  public restart() {
    this.quizStore.dispatch(resetQuiz());
    this.quizStore.dispatch(loadQuiz());

    this.router.navigateByUrl('/intro');
  }
}
