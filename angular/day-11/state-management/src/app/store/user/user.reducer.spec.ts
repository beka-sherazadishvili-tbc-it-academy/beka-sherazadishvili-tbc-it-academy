import { userReducer } from './user.reducer';
import { initialUserState } from './user.state';
import { setUserInfo, resetUser } from './user.actions';

describe('UserReducer', () => {
  it('should return initial state', () => {
    const result = userReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialUserState);
  });

  it('should handle set user info', () => {
    const result = userReducer(
      initialUserState,
      setUserInfo({ name: 'test', email: 'test@test.com' }),
    );

    expect(result.name).toBe('test');
    expect(result.email).toBe('test@test.com');
  });

  it('should handle resetUser', () => {
    const existingState = { name: 'John', email: 'john@test.com' };
    const result = userReducer(existingState, resetUser());

    expect(result).toEqual(initialUserState);
    expect(result.name).toBe('');
    expect(result.email).toBe('');
  });
});
