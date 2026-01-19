import { Route } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '../store/user/user.reducer';
import { QuizEffects } from '../store/quiz/quiz.effect';
import { quizReducer } from '../store/quiz/quiz.reducer';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('quiz', quizReducer),
        EffectsModule.forFeature([QuizEffects])
      ),
    ],
    children: [
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full',
      },
      {
        path: 'intro',
        loadComponent: () =>
          import('../feature/introduction/introduction').then((c) => c.Introduction),
      },
      {
        path: 'quiz',
        loadComponent: () =>
          import('../feature/quiz/quiz').then((c) => c.Quiz),
      },
      {
        path: 'results',
        loadComponent: () =>
          import('../feature/results/results').then((c) => c.Results),
      },
    ],
  },
];
