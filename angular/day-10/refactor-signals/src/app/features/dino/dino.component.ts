import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DinoGameService } from './dino.service';
import { CommonModule } from '@angular/common';
import { MinutePipes } from '../../core/pipes/timer.pipe';

@Component({
  selector: 'app-dino',
  templateUrl: './dino.component.html',
  styleUrls: ['./dino.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MinutePipes],
  standalone: true,
})
export class DinoComponent {
  public enteredTime: FormControl<number>;

  constructor(private fb: FormBuilder, public game: DinoGameService) {
    this.enteredTime = this.fb.nonNullable.control(0);
  }

  startGame() {
    this.game.startGame(this.enteredTime);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
      case ' ':
        if (!this.game.jumpState() && this.game.gameStartState()) this.game.jump();
        break;
      case 'ArrowDown':
        if (!this.game.duckState() && this.game.gameStartState()) this.game.duck();
        break;
      case 'p':
      case 'P':
        this.game.gameStartState() ? this.game.pauseGame() : this.game.resumeGame();
        break;
      case 'r':
      case 'R':
        this.game.restartGame();
        break;
    }
  }
}
