import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { userReducer } from './user.reducer';
import * as fromSelectors from './user.selector';
import * as fromActions from './user.actions';

describe('User Store Integration', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ user: userReducer })],
    });

    store = TestBed.inject(Store);
  });

  it('should start with empty user state', async () => {
    const user = await firstValueFrom(store.select(fromSelectors.selectUserState));
    expect(user.name).toBe('');
    expect(user.email).toBe('');
  });

  it('should set user info correctly', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'John Doe', email: 'john@example.com' }));

    const name = await firstValueFrom(store.select(fromSelectors.selectName));
    const email = await firstValueFrom(store.select(fromSelectors.selectEmail));

    expect(name).toBe('John Doe');
    expect(email).toBe('john@example.com');
  });

  it('should validate name with more than 1 character', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'Jo', email: 'john@example.com' }));

    const isValid = await firstValueFrom(store.select(fromSelectors.isNameValid));
    expect(isValid).toBe(true);
  });

  it('should invalidate name with 1 or fewer characters', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'J', email: 'john@example.com' }));

    const isValid = await firstValueFrom(store.select(fromSelectors.isNameValid));
    expect(isValid).toBe(false);
  });

  it('should validate correct email format', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'John', email: 'valid@email.com' }));

    const isValid = await firstValueFrom(store.select(fromSelectors.isEmailValid));
    expect(isValid).toBe(true);
  });

  it('should invalidate incorrect email format', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'John', email: 'invalid-email' }));

    const isValid = await firstValueFrom(store.select(fromSelectors.isEmailValid));
    expect(isValid).toBe(false);
  });

  it('should allow starting quiz with valid name and email', async () => {
    store.dispatch(fromActions.setUserInfo({ name: 'John Doe', email: 'john@example.com' }));

    const canStart = await firstValueFrom(store.select(fromSelectors.canStartQuiz));
    expect(canStart).toBe(true);
  });
});
