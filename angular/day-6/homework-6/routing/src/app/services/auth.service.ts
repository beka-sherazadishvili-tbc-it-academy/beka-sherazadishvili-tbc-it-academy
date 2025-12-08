import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class authService {
  private isLoggedIn: boolean = false;

  public login(username: string, password: string): boolean {
    if (username === 'test' && password === 'test') {
      this.isLoggedIn = true;
      return true;
    }

    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }

  public userIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
