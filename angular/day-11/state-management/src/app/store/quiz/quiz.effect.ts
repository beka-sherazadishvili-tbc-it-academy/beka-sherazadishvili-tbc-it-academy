import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadQuiz, startQuizSuccess } from './quiz.actions';
import { map, Observable, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IQuizQuestion } from './quiz.state';

@Injectable()
export class QuizEffects {
  private http = inject(HttpClient);
  private actions$ = inject(Actions);
  public startQuiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuiz),
      switchMap(() =>
        this.getQuizQuestions().pipe(
          map((questions) => startQuizSuccess({ questions })),
          catchError((err) => {
            console.error('cant load quiz.json', err);
            return of(startQuizSuccess({ questions: [] }));
          })
        )
      )
    )
  );

  private getQuizQuestions(): Observable<IQuizQuestion[]> {
    return this.http.get<IQuizQuestion[]>('assets/quiz.json');
  }
}
