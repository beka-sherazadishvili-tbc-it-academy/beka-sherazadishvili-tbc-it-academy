import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkNumbersNotExists(
  control: AbstractControl
): ValidationErrors | null {
  return /\d/.test(control.value) ? { numberNotAllowed: true } : null;
}
