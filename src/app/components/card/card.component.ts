import {Component, EventEmitter, Input, Output} from '@angular/core';
import {todo} from "../../models/todo";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input("todo") todo! : todo
  @Output() completedTodoEvent = new EventEmitter<todo>();
  @Output() deleteTodoEvent = new EventEmitter<todo>();
  completedTodo(todo : todo) {
    this.completedTodoEvent.emit(todo)
  }

  deleteTodo(todo:todo) {
    this.deleteTodoEvent.emit(todo)
  }
}
