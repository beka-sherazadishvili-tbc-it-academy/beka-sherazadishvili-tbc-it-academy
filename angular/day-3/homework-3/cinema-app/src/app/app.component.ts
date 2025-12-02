import { Component, ViewChild } from '@angular/core';
import { SeatsComponent } from './components/seats/seats.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedSeats: string[] = [];

  @ViewChild('seatsComp') seatsComponent: SeatsComponent;

  onSaveGuests(guestData: any) {
    this.seatsComponent.saveSelectedSeats();
  }

  title = 'cinema-app';
}
