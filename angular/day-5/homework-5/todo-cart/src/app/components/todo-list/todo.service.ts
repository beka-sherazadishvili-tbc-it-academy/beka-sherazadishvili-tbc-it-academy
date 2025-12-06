import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo, TodoFilter, TodoSort } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private masterList: ITodo[] = [];
  private todoList = new BehaviorSubject<ITodo[]>([]);
  public todos$ = this.todoList.asObservable();

  private currentFilter: TodoFilter = 'all';
  private currentSort: TodoSort | null = null;

  public get currentFilterValue(): TodoFilter {
    return this.currentFilter;
  }

  public addTodo(title: string): void {
    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    };

    this.masterList.push(newTodo);
    this.applyFilterAndSort();
  }

  public toggleTodo(id: string): void {
    this.masterList = this.masterList.map((item) => {
      if (item.id === id) {
        const completed = !item.completed;
        return {
          ...item,
          completed,
          completedAt: completed ? new Date() : null,
        };
      }
      return item;
    });

    this.applyFilterAndSort();
  }

  removeTodo(id: string): void {
    this.masterList = this.masterList.filter((item) => item.id !== id);
    this.applyFilterAndSort();
  }

  updateTodo(id: string, patch: Partial<ITodo>): void {
    this.masterList = this.masterList.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );

    this.applyFilterAndSort();
  }

  setFilter(filter: TodoFilter) {
    this.currentFilter = filter;
    this.applyFilterAndSort();
  }

  setSort(sort: TodoSort) {
    this.currentSort = sort;
    this.applyFilterAndSort();
  }

  private applyFilterAndSort() {
    let filteredTodos: ITodo[];

    switch (this.currentFilter) {
      case 'active':
        filteredTodos = this.masterList.filter((todo) => !todo.completed);
        break;
      case 'completed':
        filteredTodos = this.masterList.filter((todo) => todo.completed);
        break;
      case 'all':
      default:
        filteredTodos = [...this.masterList];
        break;
    }

    if (this.currentSort) {
      filteredTodos.sort((a, b) => {
        const dateA = a[this.currentSort!] ?? new Date(0);
        const dateB = b[this.currentSort!] ?? new Date(0);
        return dateA.getTime() - dateB.getTime();
      });
    }

    this.todoList.next(filteredTodos);
  }
}
