import { Component, inject, signal, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { canStartQuiz, selectEmail, selectName } from '../../store/user/user.selector';
import { setUserInfo } from '../../store/user/user.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { email, form, required, FormField } from '@angular/forms/signals';
import { IUser } from '../../store/user/user.state';
import { Router } from '@angular/router';
import { loadQuiz } from '../../store/quiz/quiz.actions';

@Component({
  selector: 'app-introduction',
  imports: [FormField],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  public nameSignal = toSignal(this.store.select(selectName));
  public emailSignal = toSignal(this.store.select(selectEmail));
  public canStartQuiz = toSignal(this.store.select(canStartQuiz));

  public quizModel = signal<IUser>({
    name: '',
    email: '',
  });

  public quizForm = form(this.quizModel, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Enter a valid email address' });
  });

  public setIntroInfo(nameValue: string, emailValue: string) {
    this.store.dispatch(setUserInfo({ name: nameValue, email: emailValue }));
  }

  public ngOnInit(): void {
    const name = this.nameSignal() ?? '';
    const email = this.emailSignal() ?? '';

    if (name !== '' || email !== '') {
      this.quizModel.set({ name, email });
    }
  }

  public startQuiz() {
    this.setIntroInfo(this.quizForm.name().value(), this.quizForm.email().value());

    this.store.dispatch(loadQuiz());

    this.router.navigateByUrl('/quiz');
  }
}
