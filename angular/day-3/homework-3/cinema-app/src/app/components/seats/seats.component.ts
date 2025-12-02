import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISeat } from './seats';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  public rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  public columnNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  public seats: ISeat[] = [];
  public selectedSeats: Set<string> = new Set();
  @Output() selectedSeatsChanged = new EventEmitter<string[]>();

  constructor() {
    this.loadSeatsFromLocalStorage();
  }

  ngOnInit(): void {
    this.seats = [];

    for (let row of this.rows) {
      for (let column of this.columnNumbers) {
        this.seats.push({
          row: row,
          number: column,
          status: 'available',
        });
      }
    }

    this.saveToLocalStorage();
  }

  public saveToLocalStorage() {
    localStorage.setItem('seats', JSON.stringify(this.seats));
  }

  public loadSeatsFromLocalStorage() {
    const seatsLoaded = localStorage.getItem('seats');
    if (seatsLoaded) {
      this.seats = JSON.parse(seatsLoaded);
    }
  }

  public getSeatsByRow(row: string) {
    return this.seats.filter((r) => r.row === row);
  }

  public onSeatClick(row: string, column: number): void {
    const clickedSeat = this.getSeatOnClick(row, column);
    if (clickedSeat === undefined) {
      throw new Error('seat does not exists');
    }

    if (clickedSeat.status === 'reserved') {
      return;
    }

    if (clickedSeat.status === 'available') {
      clickedSeat.status = 'selected';
      this.selectedSeats.add(`${clickedSeat.row}${clickedSeat.number}`);
    } else if (clickedSeat.status === 'selected') {
      clickedSeat.status = 'available';
      this.selectedSeats.delete(`${clickedSeat.row}${clickedSeat.number}`);
    }

    this.saveToLocalStorage();
    this.emitSelectedSeats();
  }

  public getSeatOnClick(row: string, column: number): ISeat | undefined {
    return this.seats.find(
      (seat) => seat.row === row && seat.number === column
    );
  }

  private emitSelectedSeats() {
    this.selectedSeatsChanged.emit(Array.from(this.selectedSeats));
  }

  public reserveSeats(seatIds: string[]) {
    seatIds.forEach((id) => {
      const seat = this.seats.find((s) => `${s.row}${s.number}` === id);
      if (seat) {
        seat.status = 'reserved';
        this.selectedSeats.delete(id);
      }
    });
    this.saveToLocalStorage();
    this.emitSelectedSeats();
  }

  public saveSelectedSeats() {
    const seatsToReserve = Array.from(this.selectedSeats);
    this.reserveSeats(seatsToReserve);

    this.selectedSeats.clear();
    this.emitSelectedSeats();
  }
}
