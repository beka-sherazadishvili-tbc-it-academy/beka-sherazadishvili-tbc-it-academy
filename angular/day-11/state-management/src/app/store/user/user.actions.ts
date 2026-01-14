import { createAction, props } from '@ngrx/store';

export const setUserInfo = createAction('[User] set name', props<{ name: string, email: string }>());
export const resetUser = createAction('[User] Reset')