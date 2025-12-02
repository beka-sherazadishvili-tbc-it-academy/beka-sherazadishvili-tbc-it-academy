import { FormControl } from "@angular/forms";

export interface ICinemaUsersForm {
  seatId: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  age: FormControl<number>;
}