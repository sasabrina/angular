import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(1000, style({opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(1000, style({opacity: 0, transform: 'transalateY(30px)'}))
      ])
    ])
  ]
})

export class TodoComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor() { }
  
  ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Comenzar covid-chellenge con angular',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Llevar a Rosa al veterinario',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'Sobrevivir a la cuarentena',
        'completed': false,
        'editing': false,
      }
    ]
  }

  addTodo(): void {
    if(this.todoTitle.trim().length === 0){
      return
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = ''
    this.idForTodo ++
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if(todo.title.trim().trim.length === 0) todo.title = this.beforeEditCache

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache
    todo.editing = false
  }

  deleteTodo(id:number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  remainingTodos():number {
    return this.todos.filter(todo => !todo.completed).length
  }

  atLeastOneTodoCompleted(): boolean {
    return this.todos.filter(todo => !todo.completed).length > 0
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  filteredTodos(): Todo[] {
    switch(this.filter){
      case "all":
        return this.todos;
      case "active":
        return this.todos.filter(todo => !todo.completed);
      case "completed":
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
}
