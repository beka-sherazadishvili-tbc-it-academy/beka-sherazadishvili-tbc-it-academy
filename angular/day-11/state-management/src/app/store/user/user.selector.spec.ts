import * as fromSelectors from './user.selector';
import { IUser } from './user.state';

describe('User Selectors', () => {
  const state: { user: IUser } = {
    user: {
      name: 'test',
      email: 'test@test.com',
    },
  };

  it('should select user state', () => {
    const result = fromSelectors.selectUserState.projector(state.user);
    expect(result).toEqual(state.user);
  });

  it('should select name', () => {
    const result = fromSelectors.selectName.projector(state.user);
    expect(result).toBe('test');
  });

  it('should select email', () => {
    const result = fromSelectors.selectEmail.projector(state.user);
    expect(result).toBe('test@test.com');
  });

  it('should validate name correctly', () => {
    expect(fromSelectors.isNameValid.projector('John')).toBe(true);
    expect(fromSelectors.isNameValid.projector('J')).toBe(false);
    expect(fromSelectors.isNameValid.projector('  ')).toBe(false);
    expect(fromSelectors.isNameValid.projector('')).toBe(false);
  });

  it('should validate email correctly', () => {
    expect(fromSelectors.isEmailValid.projector('test@test.com')).toBe(true);
    expect(fromSelectors.isEmailValid.projector('invalid')).toBe(false);
  });
});
