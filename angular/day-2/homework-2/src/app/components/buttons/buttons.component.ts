import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnChanges {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' =
    'primary';
  @Input() state: 'normal' | 'hover' | 'active' | 'disabled' | 'loading' =
    'normal';
  @Input() size: 'small' | 'medium' | 'large' | 'extra_large' | 'initial' =
    'initial';
  @Input() type:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline'
    | 'icon' = 'primary';
  @Input() icon:
    | 'download'
    | 'confirm'
    | 'delete'
    | 'edit'
    | 'follow'
    | 'share'
    | 'rating'
    | 'cancel'
    | '' = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  ngOnChanges() {}

  onClick(event: MouseEvent) {
    if (!this.disabled && !(this.state === 'loading') && !(this.size === 'initial')) {
      this.clicked.emit(event);
      console.log('clicked');
    }
  }
}
