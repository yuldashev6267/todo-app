import {Component, OnInit} from '@angular/core';
import {colour} from "../../models/colour";
import {colours, convertColourKeyToValue} from "../../helpers/colours"
import {priority} from "../../models/priority";
import {convertPriorityLevelKeyToValue, priorities} from "../../helpers/priority-list";
import {editTodoModel, todoModel} from "../../models/todo"
import {ActivatedRoute, Router} from "@angular/router";
import {TodoServiceService} from "../../services/todo-service.service";
import {tag} from "../../models/tag";
import {TagService} from "../../services/tag.service";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})

export class AddTodoComponent implements OnInit {
  title: string = ""
  isEditable: boolean = false
  colours: colour[] = [...colours]
  priorities: priority[] = [...priorities]
  todoId: number = 0
  todoTitle: string = ''
  todoDescription: string = ''
  todoColour: string = colours[0].key
  todoPriority: string = priorities[0].key
  tag: string | null = null
  tags: string[] = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private todoService: TodoServiceService, private tagService: TagService) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(v => {
      const staticComponentData: any = []
      Object.values(v).map(d => staticComponentData.push(v))

      if (staticComponentData.length > 1) {
        this.isEditable = staticComponentData[1].isEditable
      }

      this.title = staticComponentData[0].title
    })

    if (history.state != null) {
      this.todoId = history.state.id
      this.todoTitle = history.state.title
      this.todoDescription = history.state.description
      this.todoColour = history.state.color
      this.todoPriority = history.state.priority_level
      if (history.state.tags.length > 0) {
        history.state.tags.map(((el:any)=>{this.tags.push(el.tag)}))
      }
    }
  }

  onSubmit() {
    const todoModel: todoModel = {
      title: this.todoTitle,
      description: this.todoDescription,
      colour: convertColourKeyToValue(this.todoColour),
      priority: convertPriorityLevelKeyToValue(this.todoPriority),
      tags: this.tags
    }

    if (this.isEditable) {
      const editTodoModel: editTodoModel = {
        id: this.todoId,
        title: this.todoTitle,
        description: this.todoDescription,
        colour: convertColourKeyToValue(this.todoColour),
        priority: convertPriorityLevelKeyToValue(this.todoPriority),
        tags:this.tags
      }

      this.todoService.editTodo(editTodoModel).subscribe()
    } else {
      this.todoService.insertTodo(todoModel).subscribe()
    }

    this.router.navigate(['/main-view'])
  }

  onPriorityChanged(value: any) {
    this.todoPriority = value
  }

  onColorChanged(value: any) {
    this.todoColour = value
  }

  addTag() {
    if (this.tag != null) {
      this.tags.push(this.tag)
      this.tag = null
    }
  }

  clearTag(tag: string) {
    this.tags= this.tags.filter(el=>el != tag)
  }
}
