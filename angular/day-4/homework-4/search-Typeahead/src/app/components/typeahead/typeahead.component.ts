import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { IMovies, MOVIES } from './movies';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent {
  public searchControl = this.fb.control('');
  public result$: Observable<IMovies[]>;

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.result$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      filter((input): input is string => typeof input === 'string'),
      filter((input) => input.length >= 2 || input.length === 0),
      map((input) => this.filterMovies(input || ''))
    );
  }

  private filterMovies(input: string): IMovies[] {
    input = input.toLowerCase();
    console.log(input);

    return MOVIES.filter(
      (movie) =>
        movie.title.toLowerCase().includes(input) ||
        movie.genre.toLowerCase().includes(input) ||
        movie.description.toLowerCase().includes(input)
    );
  }
}
