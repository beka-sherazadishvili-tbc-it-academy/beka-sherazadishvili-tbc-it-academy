import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo, TodoFilter, TodoSort } from './todo.model';
import { TodoService } from './todo.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public todos$: Observable<ITodo[]> = this.todoService.todos$;
  public title: FormControl = this.fb.control('');

  constructor(public todoService: TodoService, private fb: FormBuilder) {}

  public addTodo() {
    const trimmedTitle = this.title.value?.trim();
    if (!trimmedTitle) {
      return;
    }

    this.todoService.addTodo(trimmedTitle);
    this.title.reset();
  }

  public toggleTodo(id: string) {
    this.todoService.toggleTodo(id);
  }

  public removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }

  public updateTitle(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.todoService.updateTodo(id, { title: input.value.trim() });
  }

  public setFilter(filter: TodoFilter) {
    this.todoService.setFilter(filter);
  }

  public setSort(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.todoService.setSort(select.value as TodoSort);
  }
}
