import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.state';
import { resetUser, setUserInfo } from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(setUserInfo, (state, { name, email }) => ({
    ...state,
    name,
    email
  })),

  on(resetUser, () => initialUserState)
);
