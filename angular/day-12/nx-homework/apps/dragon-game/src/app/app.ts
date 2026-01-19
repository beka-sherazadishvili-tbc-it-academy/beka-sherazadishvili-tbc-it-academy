import { Component, signal } from '@angular/core';
import { DinoComponent } from "./features/dino/dino";

@Component({
  selector: 'app-dragon-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
  imports: [DinoComponent]
})
export class App {
  protected readonly title = signal('Dino');
}
