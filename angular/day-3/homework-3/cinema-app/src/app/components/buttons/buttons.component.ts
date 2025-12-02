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
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | '' =
    '';
  @Input() size: 'medium' | '' = '';

  @Input() icon: 'save' | 'available' | 'selected' | 'reserved' | '' = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  ngOnChanges() {}

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
