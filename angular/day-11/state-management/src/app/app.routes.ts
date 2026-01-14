import { Routes } from '@angular/router';
import { quizGuard } from './core/guards/quiz.guard';
import { resultsGuard } from './core/guards/results.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./feature/introduction/introduction').then((c) => c.Introduction),
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    loadComponent: () => import('./feature/quiz/quiz').then((c) => c.Quiz),
    pathMatch: 'full',
    canActivate: [quizGuard],
  },
  {
    path: 'results',
    loadComponent: () => import('./feature/results/results').then((c) => c.Results),
    pathMatch: 'full',
    canActivate: [resultsGuard],
  },
  {
    path: '**',
    redirectTo: 'intro',
  },
];
