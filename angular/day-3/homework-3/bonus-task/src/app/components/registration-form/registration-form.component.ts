import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  checkNumbersNotExists,
  matchPasswordsValidator,
  strongPasswordValidator,
} from 'src/app/common/registation.form.inputs.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  strongPasswordValidator = strongPasswordValidator;
  public submited: boolean = false;

  public form: FormGroup = this.fb.group(
    {
      gender: ['', Validators.required],
      firstname: [
        '',
        [Validators.required, Validators.minLength(2), checkNumbersNotExists],
      ],
      lastname: [
        '',
        [Validators.required, Validators.minLength(2), checkNumbersNotExists],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', Validators.required],
    },
    { validators: matchPasswordsValidator }
  );

  constructor(private fb: FormBuilder) {}

  get password() {
    return this.form.get('password')?.value || '';
  }

  get passwordStrength(): 'Weak' | 'Medium' | 'Strong' {
    const value = this.password;
    if (!value) {
      return 'Weak';
    }
    if (value.length < 8) {
      return 'Weak';
    }

    if (
      /[A-Z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value)
    ) {
      return 'Strong';
    }

    return 'Medium';
  }

  public isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!((control?.touched || this.submited) && control?.invalid);
  }

  public onSubmit() {
    this.submited = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.reset();
    this.submited = false;
  }
}
