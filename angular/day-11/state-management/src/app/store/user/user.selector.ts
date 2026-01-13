import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from './user.state';

export const selectUserState = createFeatureSelector<IUser>('user');
export const selectName = createSelector(selectUserState, (state) => state.name);
export const selectEmail = createSelector(selectUserState, (state) => state.email);
export const isNameValid = createSelector(selectName, name => name.trim().length > 1)
export const isEmailValid = createSelector(selectEmail, email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
export const canStartQuiz = createSelector(isNameValid, isEmailValid, (name, email) => name && email)