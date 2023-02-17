import {Component, EventEmitter, Output} from '@angular/core';
import {colour} from "../../models/colour";
import {priority} from "../../models/priority";
import {colours} from "../../helpers/colours"
import {priorities} from "../../helpers/priority-list";
import {todoFilter} from "../../models/filter"

@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.css']
})
export class FilterTodoComponent {
  colours: colour[] = [...colours]
  priorities: priority[] = [...priorities]
  desc: boolean = false
  tag: string | null = null
  priority: number | null = null
  colour: number | null = null

  @Output() filterTodoForm = new EventEmitter<todoFilter>()

  onSubmit() {
    const filterForm: todoFilter = {
      desc: this.desc,
      tag: this.tag,
      priority: this.priority,
      colour: this.colour
    }
    this.filterTodoForm.emit(filterForm)
  }

  onPriorityChanged(value: any) {
    this.priority = value
  }

  onColorChanged(value: any) {
    this.colour = value
  }

  onDescChanged() {
    this.desc = !this.desc
  }

  clear() {
    this.desc = false
    this.colour = null
    this.tag = null
    this.priority = null
  }

}
