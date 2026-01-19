import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  templateUrl: './nx-welcome.html',
  styleUrl: './nx-welcome.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
