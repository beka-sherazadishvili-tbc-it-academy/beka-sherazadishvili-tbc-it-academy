import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { authService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  public loginForm: FormGroup;
  public error$: Observable<string>;
  private returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.error$ = this.loginForm.statusChanges.pipe(
      map(() => {
        if (this.loginForm.valid) return '';
        return 'incorrect Data';
      })
    );

    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  public submit() {
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;

    if (this.auth.login(username!, password!)) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.loginForm.setErrors({ wrong: true });
    }
  }
}
