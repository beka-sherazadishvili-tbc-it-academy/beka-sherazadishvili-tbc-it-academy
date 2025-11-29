import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {
  @Input() id: number = 0;
  @Input() message: string = '';
  @Input() type: 'success' | 'warning' | 'error' = 'success';
  @Input() duration: number = 3000;

  @Output() closeEvent = new EventEmitter<number>();

  ngOnInit(): void {
    setTimeout(() => this.closeEvent.emit(this.id), this.duration);
  }

  closeToast() {
    this.closeEvent.emit(this.id);
  }
}
