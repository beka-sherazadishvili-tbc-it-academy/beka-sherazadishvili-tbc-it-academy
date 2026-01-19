import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcome,
  },
  {
    path: 'dragonGame',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.mjs',
        exposedModule: './Routes',
      }).then((m) => m.remoteRoutes),
  },
  {
    path: 'quizApp',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.mjs',
        exposedModule: './Routes',
      }).then((m) => m.remoteRoutes),
  },
];
