import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { QuizState } from "../../store/quiz/quiz.state";
import { toSignal } from "@angular/core/rxjs-interop";
import { showResults } from "../../store/quiz/quiz.selectors";

export const resultsGuard: CanActivateFn = () => {
  const store = inject(Store<QuizState>);
  const router = inject(Router);
  const canShow = toSignal(store.select(showResults));
  return !!canShow() ? true : router.navigate(['/intro']);
};
