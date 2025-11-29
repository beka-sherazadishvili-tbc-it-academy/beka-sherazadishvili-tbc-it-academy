import { Component } from '@angular/core';

@Component({
  selector: 'app-toasts-page',
  templateUrl: './toasts-page.component.html',
  styleUrls: ['./toasts-page.component.scss'],
})
export class ToastsPageComponent {
  toastsArr: {
    id: number;
    type: 'success' | 'warning' | 'error';
    message: string;
    duration: number;
  }[] = [];

  currentId = 0;

  showToast(
    type: 'success' | 'warning' | 'error',
    message: string,
    duration: number
  ) {
    const id = ++this.currentId;

    this.toastsArr = [...this.toastsArr, { id, type, message, duration }];
  }

  removeToast(id: number) {
    this.toastsArr = this.toastsArr.filter((toast) => toast.id !== id);
  }
}
