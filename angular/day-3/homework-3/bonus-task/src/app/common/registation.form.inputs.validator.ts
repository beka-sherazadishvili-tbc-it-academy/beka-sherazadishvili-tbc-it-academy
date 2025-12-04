import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkNumbersNotExists(
  control: AbstractControl
): ValidationErrors | null {
  return /\d/.test(control.value) ? { numberNotAllowed: true } : null;
}

export const strongPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) return null;

  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(control.value)
    ? null
    : { weakPassword: true };
};

export const matchPasswordsValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  return group.get('password')?.value === group.get('confirmPassword')?.value
    ? null
    : { passwordMismatch: true };
};
