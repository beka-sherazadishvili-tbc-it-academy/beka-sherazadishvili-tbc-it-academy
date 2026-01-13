import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IUser } from "../../store/user/user.state";
import { toSignal } from "@angular/core/rxjs-interop";
import { canStartQuiz } from "../../store/user/user.selector";

export const quizGuard: CanActivateFn = () => {
  const userStore = inject(Store<IUser>);
  const router = inject(Router);
  const canStartSignal = toSignal(userStore.select(canStartQuiz));
  return !!canStartSignal() ? true : router.navigate(['/intro']);
}