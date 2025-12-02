import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { checkNumbersNotExists } from 'src/app/commons/validators/validation';
import { ICinemaUsersForm } from './cinemaUserForm';

@Component({
  selector: 'app-guest-inputs',
  templateUrl: './guest-inputs.component.html',
})
export class GuestInputsComponent implements OnChanges {
  @Input() selectedSeats: string[] = [];
  @Output() saveGuests = new EventEmitter<any>();

  public guestForm: FormArray<FormGroup<ICinemaUsersForm>> = this.fb.array<
    FormGroup<ICinemaUsersForm>
  >([]);

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSeats']) {
      this.syncFormWithSeats();
    }
  }

  public syncFormWithSeats(): void {
    const seats = this.selectedSeats;

    for (let i = 0; i < this.guestForm.length; i++) {
      const seatId = this.guestForm.at(i).get('seatId')?.value;
      if(seatId === undefined) {
        return;
      }

      if (!seats.includes(seatId)) {
        this.guestForm.removeAt(i);
      }
    }

    seats.forEach((seat) => {
      const exists = this.guestForm.controls.some(
        (control) => control.get('seatId')?.value === seat
      );
      if (!exists) {
        this.guestForm.push(
          this.fb.group<ICinemaUsersForm>({
            seatId: this.fb.nonNullable.control(seat),
            firstname: this.fb.nonNullable.control('', {
              validators: [Validators.required, Validators.minLength(2), checkNumbersNotExists],
            }),
            lastname: this.fb.nonNullable.control('', {
              validators: [Validators.required, Validators.minLength(2), checkNumbersNotExists],
            }),
            age: this.fb.nonNullable.control(0, {
              validators: [Validators.required, Validators.min(5)],
            }),
          })
        );
      }
    });
  }

  public onSaveGuestDetails() {
    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      return;
    }

    const gusestObj = {
      seats: this.selectedSeats,
      guest: this.guestForm.value.map(form => ({
        firstname: form.firstname,
        lastname: form.lastname,
        age: form.age
      }))
    };

    console.log(gusestObj);
    this.saveGuests.emit(this.guestForm.value);
  }
}
